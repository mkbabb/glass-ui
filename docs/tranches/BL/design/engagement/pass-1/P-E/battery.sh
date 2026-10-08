#!/bin/zsh
# P-E's battery: every witness on the prototype build (pe = P-B.patch + the stage), paired P-B controls (pb) where the
# stage changes a reading (E-3, E-4 slider, E-7), then the P-E probe, the after-drag read and the owner-glance set.
# Usage: battery.sh <scratch dir holding out/builds/{pe,pb} and out/glance/{pe,pb}, wt> <engine>
S=$1; eng=$2
E=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1/P-E
cd $S
run() { local lbl=$1 w=$2; shift 2; echo "### $lbl $eng $w $* · load $(sysctl -n vm.loadavg) · $(date +%T)"; node $H/$w --build $S/out/builds/$lbl --wt $S/wt --engine $eng --out $P/json/$lbl-$eng "$@" 2>&1; echo "### exit $? · load $(sysctl -n vm.loadavg) · $(date +%T)"; }
run pe e7-one-writer.mjs
run pe e3-slider.mjs
run pb e3-slider.mjs
run pe e4-momentum.mjs --scenes slider,sortable
run pb e4-momentum.mjs --scenes slider
run pe e2-commit.mjs --scenes switch,accordion,button
run pe e5-touch.mjs --scenes accordion,press_switch,button
run pe e9-prm.mjs --scenes switch,accordion,slider,button
run pe e8-clock.mjs --scenes switch,accordion,button,slider
run pe e6-idle.mjs
run pe e1-census.mjs
for lbl in pe pb; do echo "### probe $lbl $eng · load $(sysctl -n vm.loadavg) · $(date +%T)"; node $P/pe-probe.mjs --build $S/out/builds/$lbl --engine $eng --label $lbl --shots $P/shots 2>&1; echo "### exit $?"; done
echo "### afterdrag pe $eng · load $(sysctl -n vm.loadavg)"; node $E/pass-1/syn/afterdrag.mjs --build $S/out/builds/pe --engine $eng 2>&1
echo "### battery done $eng · load $(sysctl -n vm.loadavg) · $(date +%T)"
