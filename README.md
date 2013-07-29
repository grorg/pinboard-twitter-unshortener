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

Tweak
-----

Edit the file to include your username and password. Then run with a number of recent links to examine.




