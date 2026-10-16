#!/bin/zsh
# chain.sh <engine>: C-CP's replay on one engine, every step through the guard (WebKit: the exclusive WebKit slot).
#   independent probe (probe/cc.mjs) on css, waapi, css-prm, plus its plants; CP's own probe for cell 2;
#   CP's fail-loud probe; the H2 battery narrowed to the CP members on both builds (E-7 reads a snapshot src per build).
E=$1
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-CP
CP=$C/../CP; H=$C/../../harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-CP/wt; B=$WT/.cpc-out/builds
G=~/.claude/guard/guarded; XW=""; [[ $E == webkit ]] && XW="--exclusive webkit"
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
run() { local tag=$1; shift; stamp "$tag start"; $G ${=XW} --light --timeout ${TMO:-20} -- "$@"; stamp "$tag end exit $?"; }
cd $C/probe
for b in css waapi; do run "cc $b" node cc.mjs --build $B/$b --label $b --engine $E --reps ${REPS:-3} --out $C/json/cc; done
run "cc css-prm" node cc.mjs --build $B/css-prm --label css-prm --engine $E --reps 2 --cells c4 --out $C/json/cc
run "plant cut css" node cc.mjs --build $B/css --label css --engine $E --themes dark --cells c1 --plant cut --out $C/json/cc
run "plant strip css" node cc.mjs --build $B/css --label css --engine $E --cells c3 --plant strip --out $C/json/cc
for b in css waapi; do run "cp c2 $b" node $CP/probe/cp.mjs --build $B/$b --label $b --engine $E --cells c2 --out $C/json/cp-c2; done
for b in css waapi; do run "failloud $b" node $CP/probe/failloud.mjs --build $B/$b --label $b --engine $E --out $C/json/failloud; done
typeset -A SC
SC=(E-1 switch,accordion,button,slider E-2 switch,accordion,button E-3 slider E-4 slider E-5 press_switch,accordion,button E-6 s6 E-7 modal,slider E-8 switch,accordion,button E-9 switch,accordion,button,slider E-10 slider,slider2 E-11 switch,slider)
cd $H
for b in css waapi; do for w in ${=WITS:-E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11}; do
  TMO=30 run "battery $w $b" node run.mjs --build $B/$b --wt $WT/.trees/$b --only $w --engines $E --scenes $SC[$w] --out $C/json/battery-$b-$E --verbose
done; done
echo CHAIN-$E-DONE
