#!/bin/bash
# The Slider geometry cure: Chromium (both projects) then WebKit 2287, branch and v11.0.1;
# the forced-colors Slider spec on the branch in both engines.
S=$(dirname $0)
$S/build-C-sync.sh
TIMEOUT=20 $S/build-C-chromium.sh branch geo-branch-chromium "geometry ·"
TIMEOUT=20 $S/build-C-chromium.sh v1101 geo-v1101-chromium "geometry ·"
TIMEOUT=15 $S/build-C-chromium.sh branch geo-fc-branch-chromium "." slider-forced-colors.spec.ts
TIMEOUT=25 $S/build-C-webkit.sh branch geo-branch-webkit "geometry ·"
TIMEOUT=25 $S/build-C-webkit.sh v1101 geo-v1101-webkit "geometry ·"
TIMEOUT=15 $S/build-C-webkit.sh branch geo-fc-branch-webkit "." slider-forced-colors.spec.ts
