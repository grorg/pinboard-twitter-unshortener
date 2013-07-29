#!/usr/bin/env node

const NUM_RECENT = 50;
const SHORTENERS = ["t.co", "bit.ly"];

var http = require("http");
var pinboard = require("pinboard");
var async = require("async");

function isShortenedURL(url) {
    for (var i = 0; i < SHORTENERS.length; i++) {
        var re = new RegExp("^https?:\/\/" + SHORTENERS[i] + "\/");
        if (url.search(re) != -1) {
            return true;
        }
    }
    return false;
}

function unShorten(url, callback) {
    var hostname = url.match(/^https?:\/\/([^\/]+)/)[1];
    var path = url.match(/^https?:\/\/[^\/]+(\/.*)$/)[1];
    var options = {
        hostname: hostname,
        method: "HEAD",
        path: path
    };
    var request = http.request(options, function(result) {
        // Annoyingly, many shortened links point to other shortened links.
        if (isShortenedURL(result.headers.location)) {
            unShorten(result.headers.location, callback);
        } else {
            callback(result.headers.location);
        }
    });
    request.end();
}

function testAndUpdatePosts(posts) {
    async.eachSeries(posts, function (post, isDone) {
        if (isShortenedURL(post.href)) {
            unShorten(post.href, function(newUrl) {
                // Add a new bookmark that is the same as the old bookmark.
                var oldUrl = post.href;
                delete post.href;
                post.url = newUrl;
                post.dt = post.time; // No idea why input != output
                delete post.time;
                pinboard.add(post, function () {
                    // Now delete the old bookmark.
                    pinboard.destroy(oldUrl, function (result) {
                        console.log(oldUrl + " --> " + newUrl);
                        isDone();
                    });
                });
            });
        } else {
            isDone();
        }
    }, function (error) {
        if (error) {
            console.log("Error: " + error);
        }
    });
}

pinboard.config({
    username: "xxxxx",
    password: "xxxxx"
});

pinboard.get("posts/recent", { count: NUM_RECENT }, function (data) {
    if (data && data.posts && data.posts.length > 0) {
        testAndUpdatePosts(data.posts);
    }
});

