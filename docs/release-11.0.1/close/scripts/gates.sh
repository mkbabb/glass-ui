#!/bin/zsh
# 11.0.1 release close: the checks of .github/workflows/release.yml in its order, with
# demo:dist:build before the vitest it feeds, and vitest at --maxWorkers=2 (the machine law's
# form of `npm test`). TREE is the worktree or a `git archive HEAD` tree under .cache/close/
# (CI's fresh checkout; `prepare` is the build npm ci runs). Together with the worktree run this
# covers release.sh's prepublishOnly (typecheck && build && test) and verify:package.
#   ~/.claude/guard/guarded --timeout 40 -- zsh docs/release-11.0.1/close/scripts/gates.sh <label> <tree>
set -u
WT=${0:A:h:h:h:h:h}
LABEL=$1; TREE=${2:A}
L=$WT/docs/release-11.0.1/close/logs/gates-$LABEL
mkdir -p $L; : > $L/gates.txt
cd $TREE
echo "tree $TREE head $(git -C $WT rev-parse --short HEAD) $(date '+%F %T') load=$(uptime | sed 's/.*averages: //')" | tee -a $L/gates.txt
gate() { local n=$1; shift; "$@" > $L/$n.log 2>&1; echo "$n exit=$? $(date +%T)" | tee -a $L/gates.txt; }
gate version zsh -c 'test "$(node -p "require(\"./package.json\").version")" = 11.0.1'
gate prepare npm run build
gate typecheck npm run typecheck
gate build npm run build
gate dist-index-dts test -f dist/index.d.ts
gate verify-package npm run verify:package
gate demo-dist npm run demo:dist:build
gate vitest npx vitest run --maxWorkers=2
grep -E "Test Files|Tests " $L/vitest.log | tee -a $L/gates.txt
grep -iE "ratchet|CLEAN" $L/verify-package.log | tail -5 | tee -a $L/gates.txt
echo "gates done $(date '+%F %T')" | tee -a $L/gates.txt
