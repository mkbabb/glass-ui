#!/bin/bash
S=$(dirname $0)
for k in 1 2 3 4; do for b in bp8 c2; do $S/w3try.sh $b chromium light t$k; done; done
