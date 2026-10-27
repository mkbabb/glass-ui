#!/bin/zsh
# D4 pass-9 critic (completion seat): crit9-c1-diag.mjs on the A9 builds, after chain.sh's CHAIN-DONE.
# Chromium under guarded; Playwright WebKit under guarded --exclusive webkit (queued, never cancelled for the wait).
#   diag.sh chromium | webkit
S=${0:A:h}; L=$S/logs; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p9/crit9; B=$W/out/builds; G=~/.claude/guard/guarded
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
e=$1; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
for b in a9-src a9-dist; do
  F=$L/crit9-c1-diag-$b-$e.log; stamp > $F
  $G --rss-gb 8 $ex --timeout 30 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ \
    node $S/probes/crit9-c1-diag.mjs --build $B/$b --out $W/out --engine $e >> $F 2>&1
  echo "exit $? · $(stamp)" >> $F
done
