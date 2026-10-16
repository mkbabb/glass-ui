#!/usr/bin/env bash
# heavy-p12.sh <seat dir> — pass 12's one heavy guard run after the replays: the toolchain on r1 (tools/toolchain.sh, with
# the floor base built there) and then every battery (tools/batteries-p12.sh), sequentially, so the seat holds one slot.
# <seat dir> holds the worktrees wt (r1, built here), wt2 (r2, unbuilt) and base (the floor base); scratch under it.
set -u
SP="$1"; HERE="$(cd "$(dirname "$0")" && pwd)"; R="$(dirname "$HERE")/results/p12"
echo "heavy start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
bash "$HERE/toolchain.sh" "$SP/wt" "$SP/base" "$R" r1; echo "toolchain rc=$? $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
bash "$HERE/batteries-p12.sh" "$SP/wt" "$SP/wt2" "$SP/base" "$SP/scratch"; echo "batteries rc=$? $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
