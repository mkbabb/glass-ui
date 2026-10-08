#!/bin/zsh
# C-B's re-run of P-B's battery (P-B/battery.sh's sequence, unchanged witnesses), outputs under C-B/.
# Usage: battery.sh <scratch dir holding out/builds/{pb,head,pbs,heads} and wt/> <engine>
S=$1; eng=$2
E=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1/P-B; C=$E/pass-1/C-B
cd $S
run() { local lbl=$1 w=$2; shift 2; echo "### $lbl $eng $w $* · load $(sysctl -n vm.loadavg) · $(date +%T)"; node $H/$w --build $S/out/builds/$lbl --wt $S/wt --engine $eng --out $C/json/$lbl-$eng "$@" 2>&1; echo "### exit $? · load $(sysctl -n vm.loadavg) · $(date +%T)"; }
run pb e7-one-writer.mjs
run pb e2-commit.mjs --scenes switch,accordion,button
run head e2-commit.mjs --scenes button
run pb e4-momentum.mjs --scenes slider,sortable
run pbs e4-momentum.mjs --scenes sheet
run heads e4-momentum.mjs --scenes sheet
run pb e5-touch.mjs --scenes accordion,press_switch,button
run pb e9-prm.mjs --scenes switch,accordion,slider,button
run pb e8-clock.mjs --scenes switch,accordion,button
run pb e3-slider.mjs
run pb e6-idle.mjs
run pb e1-census.mjs
echo "### probe pb $eng · load $(sysctl -n vm.loadavg) · $(date +%T)"; node $P/pb-probe.mjs --build $S/out/builds/pb --engine $eng --label pb --only census,commits,crest,modality 2>&1; echo "### exit $?"
echo "### afterdrag pb $eng · load $(sysctl -n vm.loadavg)"; node $E/pass-1/syn/afterdrag.mjs --build $S/out/builds/pb --engine $eng 2>&1
echo "### battery done $eng · load $(sysctl -n vm.loadavg) · $(date +%T)"
