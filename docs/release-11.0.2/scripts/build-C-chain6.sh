#!/bin/bash
# WebKit 2287 for build C's cells, branch then v11.0.1, one guarded --exclusive webkit run at a time.
S=$(dirname $0)
$S/build-C-sync.sh
TIMEOUT=40 $S/build-C-webkit.sh branch c-cells-branch-webkit "pager ·|wheel ·|rail ·|rows ·|radius ·|hover ·"
TIMEOUT=40 $S/build-C-webkit.sh v1101 c-cells-v1101-webkit "rail ·|rows ·|radius ·|hover ·"
