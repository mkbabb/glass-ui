#!/usr/bin/env bash
# Critic 10: contact sheets of lane L6's captures for one engine.  sheets.sh <chromium|webkit>
cd "$(dirname "$0")"; E=$1; P=rerun/lane-L6/out/png/green-$E
for W in 390 1440; do F=""
  for s in open-h open-h-persist col-square col-two col-wide col-persist col-persist-both open-v col-v col-v-persist morph; do F="$F $P-o199-$s-$W-light.png $P-o199-$s-$W-dark.png"; done
  node sheet.mjs sheets/l6-$E-postures-$W.png 4 $F
done
F=""; for k in lead trail both; do for s in 390-fine-rest 390-fine-hover-open 390-coarse-rest 390-coarse-long-press-open 1440-fine-rest 1440-coarse-long-press-cdp-open; do [ -f $P-o194-$k-$s.png ] && F="$F $P-o194-$k-$s.png"; done; done
node sheet.mjs sheets/l6-$E-face.png 6 $F
