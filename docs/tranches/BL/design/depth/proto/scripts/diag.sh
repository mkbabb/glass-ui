#!/bin/sh
B=http://localhost:5467/demo/depth/index.html
node diag.mjs "$B?theme=dark&paused=1" dark
node diag.mjs "$B?theme=dark&blob=default" dark
node diag.mjs "$B?theme=dark&still=1" dark
node diag.mjs "$B?theme=dark" light
node diag.mjs "$B?paused=1" dark
node diag.mjs "$B?theme=dark" dark nodepth
node diag.mjs "http://localhost:5467/?theme=dark" dark
