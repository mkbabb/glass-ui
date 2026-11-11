#!/bin/zsh
# 10.1.5 release close: the CI checks of .github/workflows/release.yml, in its order, with
# demo:dist:build before the vitest (vitest --maxWorkers=2 is `npm test` under the machine law),
# run in TREE (the worktree, or a `git archive HEAD` tree under .cache/close/ that stands for
# CI's fresh checkout; `prepare` is the build npm ci runs). Covers prepublishOnly (typecheck && build && test) and verify:package.
#   ~/.claude/guard/guarded --timeout 60 -- zsh docs/release-10.1.5/scripts/close-gates.sh <label> <tree>
set -u
WT=${0:A:h:h:h:h}
LABEL=$1; TREE=${2:A}
L=$WT/docs/release-10.1.5/close/logs/gates-$LABEL
mkdir -p $L
: > $L/gates.txt
cd $TREE
echo "tree $TREE head $(git -C $WT rev-parse --short HEAD) $(date '+%F %T')" | tee -a $L/gates.txt
gate() { # name cmd...
  local n=$1; shift
  "$@" > $L/$n.log 2>&1
  echo "$n exit=$?" | tee -a $L/gates.txt
}
gate version zsh -c 'test "$(node -p "require(\"./package.json\").version")" = 10.1.5'
gate prepare npm run build
gate typecheck npm run typecheck
gate build npm run build
gate verify-package npm run verify:package
gate demo-dist npm run demo:dist:build
gate vitest npx vitest run --maxWorkers=2
grep -E "Test Files|Tests " $L/vitest.log | tee -a $L/gates.txt
echo "gates done $(date '+%F %T')" | tee -a $L/gates.txt
