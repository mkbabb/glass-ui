#!/bin/sh
B=http://localhost:5467/demo/depth/index.html
node diag.mjs "$B?paused=1" light
node diag.mjs "data:text/html,<p>hi</p>" dark
node diag.mjs "$B?paused=1" light nodepth
node diag.mjs "$B?paused=1" dark nodepth
