#!/bin/bash
# Critic 5, chain 4 (after chain 3): the same probe, ten repeats interleaved in WebKit at
# 390, on v11.1.0 (the probe and the 11.1.1 harnesses copied into that tree at the same
# relative paths, so the server and the source are v11.1.0's).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-5
RED=$W/.cache/red-v11.1.0/tree
L=$D/logs
until grep -q CHAIN3-DONE $L/runs.out; do sleep 30; done
mkdir -p $RED/docs/release-11.1.1/critic-5/probe $RED/tests-visual/release-11-1-1
cp $D/probe/stall5.probe.ts $D/probe/probe.config.ts $RED/docs/release-11.1.1/critic-5/probe/
cp $W/tests-visual/release-11-1-1*.ts $RED/tests-visual/
cp $W/tests-visual/release-11-1-1/* $RED/tests-visual/release-11-1-1/
cd $RED && GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354 PI_REPORT=$L/stall5-red-webkit-phone.json \
  ~/.claude/guard/guarded --exclusive webkit --timeout 40 -- npx playwright test -c docs/release-11.1.1/critic-5/probe/probe.config.ts --project=webkit-phone --workers=1 -g "reverse · a (Accordion|Collapsible)" --repeat-each=10 > $L/stall5-red-webkit-phone.log 2>&1
echo "$(date +%T) stall5-red-webkit-phone exit $? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/stall5-red-webkit-phone.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
echo "CHAIN4-DONE $(date +%T)" >> $L/runs.out
