#!/bin/zsh
# P-A6 Chromium phase: one guarded call per witness, probe or capture (never --light: each starts a browser).
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/A6
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/A6/wt
B=$WT/.a6out/builds/a6
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor)
W=(${@}); (( ${#W} )) || W=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
for w in $W; do
  extra=(); [[ $w == E-2 ]] && extra=(--commit-arms i,ii)
  $A/run.sh bat-a6-chromium-$w --timeout 60 -- node $H/${F[$w]}.mjs --build $B --wt $WT --engine chromium --out $A/json/a6 $extra
  echo "$w chromium exit $? · $(tail -2 $A/logs/bat-a6-chromium-$w.log | head -1 | cut -c1-200)"
done
