#!/bin/zsh
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D5/p1/rB
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-1/R-B
cd $S
run() { local lbl=$1 eng=$2 w=$3; shift 3; echo "### $lbl $eng $w $* · load $(sysctl -n vm.loadavg)"; node $H/$w --build $S/out/builds/$lbl --wt $S/wt --engine $eng --out $S/runs2/$lbl-$eng "$@" 2>&1; echo "### exit $? · load $(sysctl -n vm.loadavg)"; }
for eng in chromium webkit; do
  run rb4 $eng e7-one-writer.mjs
  run rb4 $eng e2-commit.mjs --scenes switch,accordion
  run rb4 $eng e4-momentum.mjs --scenes slider,sortable
  run head $eng e4-momentum.mjs --scenes sortable
  run rb4 $eng e5-touch.mjs --scenes accordion,press_switch
  run rb4 $eng e9-prm.mjs --scenes switch,accordion,slider
  run rb4 $eng e8-clock.mjs --scenes switch,accordion
  run rb4 $eng e3-slider.mjs
  run rb4 $eng e6-idle.mjs
  run rb4 $eng e1-census.mjs
  echo "### probe rb4 $eng · load $(sysctl -n vm.loadavg)"; node $R/rb-probe.mjs --build $S/out/builds/rb4 --engine $eng --label rb4 --shots $R/captures --deadline 1500 2>&1; echo "### exit $?"
  echo "### probe head $eng · load $(sysctl -n vm.loadavg)"; node $R/rb-probe.mjs --build $S/out/builds/head --engine $eng --label head --only veil,commits,census --deadline 900 2>&1; echo "### exit $?"
done
