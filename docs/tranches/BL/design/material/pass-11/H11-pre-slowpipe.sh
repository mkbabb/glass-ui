#!/usr/bin/env bash
# H11-pre-slowpipe.sh · D3 pass 11, H11-1's "before": the HEAD harness (the worktree's own copy, before H11) and the H11
# harness, each running prose-sweep.mjs on the minor v7 under MS7-rulings.json through a pipe whose reader sleeps 1 s
# before it reads, three runs each. Prints exit, bytes and the last line. Run under ~/.claude/guard/guarded --light.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p11/H11
M=$R/docs/tranches/BL/design/material
echo "load $(sysctl -n vm.loadavg)"
for which in "HEAD:$B/wt/docs/tranches/BL/design/material/harness" "H11:$M/harness"; do
  H=${which#*:}
  for k in 1 2 3; do
    out=$(bash -c 'node "$@" | (sleep 1; cat); exit ${PIPESTATUS[0]}' pipe "$H/prose-sweep.mjs" --root "$B/trees/minor7" --patch "$M/pass-9/minor-split-v7.patch" --declare "$M/harness/deletes-minor.json" --rulings "$M/pass-9/MS7-rulings.json"); st=$?
    echo "${which%%:*} run $k exit $st bytes $(printf '%s\n' "$out" | wc -c | tr -d ' ') last: $(printf '%s\n' "$out" | tail -1 | cut -c1-60)"
  done
done
