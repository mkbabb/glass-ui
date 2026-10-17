#!/bin/bash
# H5-all.sh (entry 2): after the self-test, the four trees (H5-build.sh: build, F7, PR) and the baseline (H5-chain.sh).
#   bash H5-all.sh <worktree>        outputs under <worktree>/.h5out (removed with the worktree; records copied here)
set -u
WT=$1; P=$(cd "$(dirname "$0")" && pwd); OUT=$WT/.h5out
until [ -f "$P/H5-records/selftest-rest-done.txt" ]; do sleep 30; done
bash "$P/H5-build.sh" "$WT" "$OUT" head fv3 bp g
bash "$P/H5-chain.sh" "$OUT" head fv3 bp g
echo "ALL-DONE $(date)" >> "$P/H5-records/all-done.txt"
