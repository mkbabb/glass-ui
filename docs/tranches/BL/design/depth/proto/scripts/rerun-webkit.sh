#!/bin/sh
# The WebKit cells that crashed in batch.sh, one browser (one node process) per cell.
for c in 1440x900:dark 390x844:coarse 390x844:coarse:dark 1440x900:dark:reduce 390x844:coarse:reduce 390x844:coarse:dark:reduce; do
  echo "== $c"; node measure.mjs webkit $c --strips || echo "CRASH $c"
done
for c in 1440x900:mask 390x844:coarse:mask 360x780:dark 1920x1080:dark; do
  echo "== $c"; node measure.mjs webkit $c || echo "CRASH $c"
done
echo "== bite caption-off-plate"; node measure.mjs webkit 1440x900 --bite caption-off-plate --query lap=spec || echo "CRASH caption-off-plate"
