#!/bin/bash
# O-271 rows on the cure, O-282 hover readings: Chromium, branch then v11.0.1.
S=$(dirname $0)
$S/build-C-sync.sh
TIMEOUT=25 $S/build-C-chromium.sh branch o271-o282-branch-chromium "rows ·|hover ·"
TIMEOUT=25 $S/build-C-chromium.sh v1101 o282-v1101-chromium "hover ·"
