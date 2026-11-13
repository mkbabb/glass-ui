#!/bin/bash
# O-270 radius and O-282 hover readings: Chromium, branch and v11.0.1.
S=$(dirname $0)
while pgrep -f build-C-chain2.sh >/dev/null; do sleep 30; done
$S/build-C-sync.sh
TIMEOUT=25 $S/build-C-chromium.sh branch o270-o282-branch-chromium "radius ·|hover ·"
TIMEOUT=25 $S/build-C-chromium.sh v1101 o270-o282-v1101-chromium "radius ·|hover ·"
