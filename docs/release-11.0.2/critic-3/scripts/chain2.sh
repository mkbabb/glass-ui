#!/bin/bash
# Critic 3, after the first chain: the three WebKit cells that failed in the tip sweep,
# read alone and repeated, the pixel reader's vertical cells on v11.0.1 for comparison,
# and the --glass-border-floating probe on both trees.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-3; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
until grep -q "^[0-9:]* done$" $O; do sleep 30; done
pwv() { # <tree dir> <port> <tag> <repeat> <config> <grep> <spec>
  cd "$1" && CRITIC_OUT=$C/capture/$3 GLASS_UI_DEMO_PORT=$2 GLASS_UI_DEMO_URL=http://localhost:$2 PI_REPORT=$L/$3.json \
    $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/$5 $7 --project=webkit --workers=1 --repeat-each=$4 -g "$6" > $L/$3.log 2>&1; rc=$?
  echo "$(date +%H:%M:%S) $3 rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $O
}
pwv $W 5341 v-tip-wk 10 release-11-0-1-critic-2.config.ts "v (light-1440f|dark-390c): a vertical dock" release-11-0-1-critic-2.spec.ts
pwv $R 5342 v-v1101-wk 10 release-11-0-1-critic-2.config.ts "v (light-1440f|dark-390c): a vertical dock" release-11-0-1-critic-2.spec.ts
pwv $W 5341 hover-tip-wk 5 release-11-0-2.config.ts "hover · a vertical rounded dock, collapsed" release-11-0-2.spec.ts
for t in tip v1101; do
  case $t in tip) P=5343;; v1101) P=5344;; esac
  $G --timeout 10 -- $S/serve-probe.sh $t $P $C/floating-probe.mjs > $L/floating-$t.log 2>&1; echo "$(date +%H:%M:%S) floating-$t rc=$?" >> $O
done
echo "$(date +%H:%M:%S) done2" >> $O
