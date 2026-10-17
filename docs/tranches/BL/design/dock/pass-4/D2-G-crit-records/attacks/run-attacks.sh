#!/bin/bash
# run-attacks.sh (D2-G pass-4 CRITIC): the critic's own arms, one engine per guarded slot.
#   bash run-attacks.sh chromium|webkit
e=$1; R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-4/D2-G-crit-records; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p4/G-crit/wt/.critout/builds; D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock
AG=$D/pass-3/adapter-G-p3.mjs; AF=$D/pass-3/adapter-floor-v2.mjs
for b in g fv3; do A=$AG; [ $b = fv3 ] && A=$AF
  (uptime; node $R/probes/crit-corner.mjs --build $O/$b --adapter $A --engine $e --out $R/attacks/corner-$b-$e.json; echo "exit $?"; uptime) > $R/attacks/corner-$b-$e.log 2>&1
  (uptime; node $R/probes/crit-prm.mjs --build $O/$b --adapter $A --engine $e --out $R/attacks/prm-$b-$e.json; echo "exit $?"; uptime) > $R/attacks/prm-$b-$e.log 2>&1
done
if [ $e = chromium ]; then for b in g fv3; do A=$AG; [ $b = fv3 ] && A=$AF
  (uptime; CTX_EXPOSE_GC=1 node $D/pass-4/D2-G-proto-records/ctx/ctx-diag.mjs --build $O/$b --adapter $A --out $R/attacks/ctx-$b-gc.json; echo "exit $?"; uptime) > $R/attacks/ctx-$b-gc.log 2>&1; done
else
  (uptime; node $D/pass-4/D2-Bp-proto-records/probes/cases.mjs --build $O/g --adapter $AG --engine webkit --out $R/attacks/cases-rot --cells '^case·rotated'; echo "exit $?"; uptime) > $R/attacks/cases-rotated-with-control-webkit-1.log 2>&1
  (uptime; node $D/pass-4/D2-Bp-proto-records/probes/cases.mjs --build $O/g --adapter $AG --engine webkit --out $R/attacks/cases-rot2 --cells '^case·rotated'; echo "exit $?"; uptime) > $R/attacks/cases-rotated-with-control-webkit-2.log 2>&1
fi
