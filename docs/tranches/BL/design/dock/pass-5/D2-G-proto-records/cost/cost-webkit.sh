#!/bin/bash
# cost-webkit.sh: the pcost and plead arms on g and fv4 in Playwright WebKit, one browser run per build, inside one
# guarded --exclusive webkit slot (cost-webkit-guard.log). Chromium's runs are cost-<build>-chromium.log.
for b in g fv4; do
  case $b in g) AD=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-3/adapter-G-p3.mjs;; fv4) AD=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-3/adapter-floor-v2.mjs;; esac
  (uptime; node /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-2/D2-Bp-probes.mjs --build /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p5/G-proto/wt/.gout3/builds/$b --adapter $AD --arm pcost,plead --engine webkit --out /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-5/D2-G-proto-records/cost/cost-$b-webkit.json; echo "exit $?"; uptime) > /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-5/D2-G-proto-records/cost/cost-$b-webkit.log 2>&1
done
