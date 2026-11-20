#!/bin/sh
# The whole W-B.19 matrix for one engine, run inside one guarded call. Each node
# process is one browser; cells are new contexts.
E=$1
set -x
node measure.mjs $E 1440x900,1440x900:dark,390x844:coarse,390x844:coarse:dark --strips
node measure.mjs $E 1440x900:reduce,1440x900:dark:reduce,390x844:coarse:reduce,390x844:coarse:dark:reduce --strips
node measure.mjs $E 1440x900:mask,390x844:coarse:mask
node measure.mjs $E 360x780,768x1024,1024x768,1920x1080,360x780:dark,1920x1080:dark
node measure.mjs $E 1440x900 --query still=1 --tag still --strips
node measure.mjs $E 1440x900 --query lag=0.0625 --tag lag16 --strips
node measure.mjs $E 390x844:coarse --query still=1 --tag still
node measure.mjs $E 1440x900 --bite blob-2x --query paused=0
for b in transform-heading travel-20lvb range-contain second-copy last-scene second-lag; do node measure.mjs $E 1440x900 --bite $b; done
node measure.mjs $E 1440x900 --bite caption-off-plate --query lap=spec
node measure.mjs $E 1440x900:reduce --bite outside-gate
node cost.mjs $E 1440x900
node cost.mjs $E 390x844:coarse
