#!/bin/bash
# rerun.sh: the A/B reds of bp12, each re-run twice (W·l: retarget·40 and retarget·120 [stub] in the R2 A/B r1, content-remove
# [trajectory] in the content-remove A/B r8), W3 as landed, Playwright WebKit light, each read started at load <= 11 (wait <= 60 s).
for k in 1 2; do
  t0=$SECONDS; while [ "$(echo "$(sysctl -n vm.loadavg | awk '{print $2}') > 11" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt 60 ]; do sleep 10; done
  (uptime; node /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/w3-morph.mjs --build /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p12/Bp-build/out/builds/bp12 --adapter /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-3/adapter-floor-v2.mjs --engine webkit --cells '^(retarget·(40|120)|content-remove)$' --out /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p12/Bp-build/out/rerun/webkit-light-bp12-r$k; echo "exit $?"; uptime) > /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-12/D2-Bp-build-records/rerun/w3-webkit-light-bp12-rerun$k.log 2>&1
  j=$(find /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p12/Bp-build/out/rerun/webkit-light-bp12-r$k -name W3.json | head -1); [ -n "$j" ] && cp $j /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-12/D2-Bp-build-records/rerun/w3-webkit-light-bp12-rerun$k.json
done
