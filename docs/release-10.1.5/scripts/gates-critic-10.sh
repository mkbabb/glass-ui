#!/bin/zsh
# 10.1.5 critic round 10, g7 on the committed tip: typecheck, build, demo:dist:build, vitest (after the build), verify:package.
# Usage (worktree root, under guarded): zsh docs/release-10.1.5/scripts/gates-critic-10.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-10/g7
mkdir -p $L
: > $L/gates.txt
gate() { local n=$1; shift; "$@" > $L/$n.log 2>&1; echo "$(date +%H:%M) $n exit=$?" | tee -a $L/gates.txt; }
gate typecheck npm run typecheck
gate build npm run build
gate demo-dist npm run demo:dist:build
gate vitest npx vitest run --maxWorkers=2
grep -E "Test Files|Tests " $L/vitest.log | tee -a $L/gates.txt
gate verify-package npm run verify:package
echo "gates done" | tee -a $L/gates.txt
