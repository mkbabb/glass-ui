#!/bin/bash
# O-270 radius: Chromium, branch then v11.0.1.
S=$(dirname $0)
while pgrep -f build-C-chain4.sh >/dev/null; do sleep 20; done
$S/build-C-sync.sh
TIMEOUT=15 $S/build-C-chromium.sh branch o270-branch-chromium "radius ·"
TIMEOUT=15 $S/build-C-chromium.sh v1101 o270-v1101-chromium "radius ·"
