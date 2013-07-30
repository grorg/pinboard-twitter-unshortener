Pinboard Link Unshortener
=================================

I originally called this the "pinboard twitter link de-crappifier". When I save links to pinboard
from Tweetbot, it saves the shortened (and tracked) t.co style URLs. This script will
go through your pinboard links and expand any such URLs into their redirected and original result.

Supported:

- t.co
- bit.ly


Setup
----

You need node.js.

Then install [node-pinboard](https://github.com/frozzare/node-pinboard):

    npm install pinboard

and [async](https://github.com/caolan/async) (we don't want to bombard pinboard's servers):

    npm install async

Configure
-----

You'll need a JSON file in your home directory with your Pinboard username and password, or API
token: ~/.pinboard.json.

For example:

    { "token": "blah:123456789ABCEDF" }

or

    { "username": "blah", "password": "ABCDEF" }

Note that you can only use the token once my [pull request](https://github.com/frozzare/node-pinboard/pull/2) to node-pinboard gets accepted.

Run
---

Then just run the script by itself. It will look at the most recent 50 links on your pinboard, find any
that match the shortening services, and then try to expand them to full urls.
