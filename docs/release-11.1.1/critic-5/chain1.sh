#!/bin/bash
# Critic 5, chain 1: the library gates on the committed tree; the exits gate's four parts
# on the tip in every project (the gate's own greps, each with its own report); the three
# witness parts on v11.1.0; part B three more times in WebKit at 390, as the gate runs it.
# One guarded run at a time.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-5
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$D/logs; G=~/.claude/guard/guarded
PA='(form|glass|exit|routes|round|weight|lift) · '
PB='(reverse|tooltip|expand|leave) · '
PC='standing · '
PD='(site|fade|fold|mark|press|still) · '
echo "head $(git -C $W rev-parse --short HEAD) $(date +%T)" >> $L/runs.out
git -C $W status --porcelain --untracked-files=no >> $L/runs.out
cd $W
$G --timeout 20 -- npm run typecheck > $L/typecheck.log 2>&1; echo "typecheck exit $?" >> $L/runs.out
$G --timeout 20 -- npm run build > $L/build.log 2>&1; echo "build exit $?" >> $L/runs.out
$G --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; echo "verify:package exit $?" >> $L/runs.out
$G --timeout 30 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; echo "demo:dist:build exit $?" >> $L/runs.out
CI=true $G --timeout 45 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; echo "vitest exit $?" >> $L/runs.out
(npm pack --dry-run --json --ignore-scripts > $L/pack-tip.json 2> $L/pack-tip.err); echo "pack exit $?" >> $L/runs.out
echo "PHASE-GATES-DONE $(date +%T)" >> $L/runs.out
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  bash $D/run.sh branch $p tipA-$p "$PA"; bash $D/run.sh branch $p tipB-$p "$PB"
  bash $D/run.sh branch $p tipC-$p "$PC"; bash $D/run.sh branch $p tipD-$p "$PD"
done
echo "PHASE-TIP-DONE $(date +%T)" >> $L/runs.out
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  bash $D/run.sh red $p redA-$p "$PA"; bash $D/run.sh red $p redB-$p "$PB"; bash $D/run.sh red $p redD-$p "$PD"
done
echo "PHASE-RED-DONE $(date +%T)" >> $L/runs.out
for i in 2 3 4; do bash $D/run.sh branch webkit-phone tipB$i-webkit-phone "$PB"; done
echo "PHASE-B-REPEAT-DONE $(date +%T)" >> $L/runs.out
echo "CHAIN1-DONE $(date +%T)" >> $L/runs.out
