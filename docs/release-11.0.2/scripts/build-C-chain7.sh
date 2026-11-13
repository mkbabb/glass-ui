#!/bin/bash
# O-282 hover with the tooltip dwell, the toggle, the popover trigger and daraksha's pair:
# Chromium then WebKit 2287, branch and v11.0.1.
S=$(dirname $0)
while pgrep -f build-C-chain6.sh >/dev/null; do sleep 20; done
$S/build-C-sync.sh
TIMEOUT=30 $S/build-C-chromium.sh branch o282b-branch-chromium "hover ·"
TIMEOUT=30 $S/build-C-chromium.sh v1101 o282b-v1101-chromium "hover ·"
TIMEOUT=30 $S/build-C-webkit.sh branch o282b-branch-webkit "hover ·"
TIMEOUT=30 $S/build-C-webkit.sh v1101 o282b-v1101-webkit "hover ·"
