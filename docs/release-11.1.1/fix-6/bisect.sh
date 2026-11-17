#!/bin/bash
# Fix seat 6: critic 5's stall probe on a tree that is v11.1.0 with `src` as it stands at
# one commit of the branch.
#   bisect.sh <commit> <log name> [repeats, default 6] [patch]
# The tree (.cache/fix6-bisect/tree) is the v11.1.0 git-archive tree with node_modules
# linked; its src is replaced by `git archive <commit> src`, and the 11.1.1 specs,
# harnesses and the probe are copied in at the same relative paths. A patch (paths from
# the tree's root) is applied to that src before the run.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
B=$W/.cache/fix6-bisect/tree
D=$W/docs/release-11.1.1/fix-6
L=$D/logs
rm -rf $B/src && git -C $W archive "$1" src | tar -x -C $B
if [[ -n "${4:-}" ]]; then patch -s -p1 -d $B < "$4" || { echo "$(date +%T) $2 patch $4 did not apply" >> $L/runs.out; exit 1; }; fi
mkdir -p $B/docs/release-11.1.1/fix-6/probe $B/tests-visual/release-11-1-1
rm -f $B/docs/release-11.1.1/fix-6/probe/*.probe.ts
cp $W/docs/release-11.1.1/critic-5/probe/stall5.probe.ts $W/docs/release-11.1.1/critic-5/probe/probe.config.ts $B/docs/release-11.1.1/fix-6/probe/
cp $W/tests-visual/release-11-1-1*.ts $B/tests-visual/
cp $W/tests-visual/release-11-1-1/* $B/tests-visual/release-11-1-1/
cd $B && GLASS_UI_DEMO_PORT=5355 GLASS_UI_DEMO_URL=http://localhost:5355 PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded --exclusive webkit --timeout 40 -- npx playwright test -c docs/release-11.1.1/fix-6/probe/probe.config.ts \
  --project=webkit-phone --workers=1 -g "reverse · a (Accordion|Collapsible)" --repeat-each=${3:-6} > $L/$2.log 2>&1
rc=$?
st=$(python3 $D/stalls.py $L/$2.json 2>/dev/null)
echo "$(date +%T) $2 src@$1${4:+ + $(basename $4)} exit $rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$2.log | tr -s ' ' | tr '\n' ' ') stall: $st" >> $L/runs.out
