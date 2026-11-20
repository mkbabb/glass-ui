#!/bin/bash
# O-261 and O-263 cells: Chromium (both projects) then WebKit 2287, branch and v11.0.1.
S=$(dirname $0)
TIMEOUT=20 $S/build-C-chromium.sh branch o261-o263-branch-chromium "pager ·|wheel ·"
TIMEOUT=20 $S/build-C-chromium.sh v1101 o261-o263-v1101-chromium "pager ·|wheel ·"
TIMEOUT=20 $S/build-C-webkit.sh branch o261-o263-branch-webkit "pager ·|wheel ·"
TIMEOUT=20 $S/build-C-webkit.sh v1101 o261-o263-v1101-webkit "pager ·|wheel ·"
