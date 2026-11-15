#!/bin/bash
# Critic 3: the whole pixel-reader file (nine cells, file order, as the sweep ran it)
# five times over in WebKit 2287 on the tip and on v11.0.1, to read whether the vertical
# dock's squashed first expand frame is the branch's or 11.0.1's.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-3; L=$C/logs; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
run() { # <tree dir> <port> <tag>
  cd "$1" && CRITIC_OUT=$C/capture/$3 GLASS_UI_DEMO_PORT=$2 GLASS_UI_DEMO_URL=http://localhost:$2 PI_REPORT=$L/$3.json \
    $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts release-11-0-1-critic-2.spec.ts --project=webkit --workers=1 --repeat-each=5 > $L/$3.log 2>&1; rc=$?
  echo "$(date +%H:%M:%S) $3 rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $O
}
run $W 5341 c2file-tip-wk
run $R 5342 c2file-v1101-wk
run $W 5341 c2file-tip-wk-2
run $R 5342 c2file-v1101-wk-2
echo "$(date +%H:%M:%S) done4" >> $O
