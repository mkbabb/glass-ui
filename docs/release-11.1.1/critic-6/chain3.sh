#!/bin/bash
# Critic 6, chain 3 (after chain 2): critic 5's stall probe (its four disclosure reversal
# cells verbatim, with a second recorder) on the tip, ten repeats interleaved, WebKit 390.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-6
L=$D/logs; G=~/.claude/guard/guarded
until grep -q CHAIN2-DONE $L/runs.out; do sleep 30; done
cd $W && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5355 GLASS_UI_DEMO_URL=http://localhost:5355 PI_REPORT=$L/stall-tip-webkit-phone.json \
  $G --exclusive webkit --timeout 40 -- npx playwright test -c docs/release-11.1.1/critic-5/probe/probe.config.ts --project=webkit-phone --workers=1 \
  -g "reverse · a (Accordion|Collapsible)" --repeat-each=10 > $L/stall-tip-webkit-phone.log 2>&1
rc=$?
echo "$(date +%T) stall-tip-webkit-phone probe exit $rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/stall-tip-webkit-phone.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
echo "CHAIN3-DONE $(date +%T)" >> $L/runs.out
