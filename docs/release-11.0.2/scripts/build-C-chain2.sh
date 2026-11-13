#!/bin/bash
# O-262 rail cells and the O-271 rows reading: Chromium, branch, v11.0.1 and v11.0.0.
S=$(dirname $0)
while pgrep -f build-C-chain1.sh >/dev/null; do sleep 30; done
TIMEOUT=20 $S/build-C-chromium.sh branch o262-o271-branch-chromium "rail ·|rows ·"
TIMEOUT=20 $S/build-C-chromium.sh v1101 o262-o271-v1101-chromium "rail ·|rows ·"
TIMEOUT=20 $S/build-C-chromium.sh v1100 o271-v1100-chromium "rows ·"
