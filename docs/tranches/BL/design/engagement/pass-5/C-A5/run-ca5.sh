#!/bin/zsh
# C-A5 (D5 pass 5, the fresh critic of the candidate A+E): H5's battery, unedited, on three builds of the harness's own
# app (cand = P-E5-noveil-coarse, the candidate; geom = P-A5-geom, Q-5 arm ii; plant = cand + plant.sh), this seat's
# probe and C-A4's probe, the CK-25 capture, both engines. Chromium: one `guarded` call per witness, probe or capture.
# WebKit: every stage inside ONE `guarded --exclusive webkit` admission (`wk-inner`; the caller wraps it).
#   zsh run-ca5.sh builds | gates | chromium | wk-inner | <single stage>
# Second version (swapped in by `mv` while the chain's Chromium phase ran, so the running process kept the first): the
# wk-inner admission also runs `extra` (the capsule probe in both engines and a second Chromium read of ca5-probe).
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/C-A5
PC=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/C-A4/probe
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/C-A5
O=$R/out/builds
G=~/.claude/guard/guarded
TAG=${TAG:-}
mkdir -p $D/logs $D/json
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
wtof() { case $1 in geom) print $R/wt-geom ;; plant) print $R/wt-plant ;; *) print $R/wt ;; esac; }
GW=""
bat() { # <label> <engine> <tag> <ids…> [-- extra]
  local l=$1 eng=$2 tg=$3; shift 3; local ids=() extra=()
  while (( $# )); do [[ $1 == -- ]] && { shift; extra=("$@"); break; }; ids+=$1; shift; done
  for id in $ids; do
    local log=$D/logs/$l$tg${TAG}-$eng-$id.log
    { stamp "start $id $l$tg $eng"; cd $H && ${=GW} node run.mjs --build $O/$l --wt $(wtof $l) --engines $eng --only $id --out $D/json/$l$tg${TAG} --verbose $extra; print -- "# exit $?"; stamp "end $id $l$tg $eng"; } > $log 2>&1
    print -- "bat $l$tg${TAG} $eng $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-200)"
  done
}
one() { # <label> <engine> <witness-file> <tag> [args]: one witness module directly
  local l=$1 eng=$2 w=$3 tg=$4; shift 4; local log=$D/logs/$l-$tg${TAG}-$eng-${w%.mjs}.log
  { stamp "start $w $l $eng $*"; cd $H && ${=GW} node $w --build $O/$l --wt $(wtof $l) --engine $eng --out $D/json/$l-$tg${TAG} "$@"; print -- "# exit $?"; stamp "end $w $l $eng"; } > $log 2>&1
  print -- "one $l-$tg $eng $w: $(grep -E ' (PASS|FAIL|UNMEASURED) · [0-9]+ pass' $log | tail -1 | cut -c1-200)"
}
probe() { # <dir> <name> <label> <engine> [args…]
  local pd=$1 n=$2 l=$3 eng=$4; shift 4; local log=$D/logs/$n-$l${TAG}-$eng.log
  { stamp "start $n $l $eng"; cd $pd && ${=GW} node $n.mjs --build $O/$l --engine $eng "$@"; print -- "# exit $?"; stamp "end $n $l $eng"; } > $log 2>&1
  print -- "probe $n $l${TAG} $eng: $(grep -cE '^\s+PASS' $log) P $(grep -cE '^\s+FAIL' $log) F, $(grep '^# exit' $log)"
}
cap() { # <label> <engine> [args…]
  local l=$1 eng=$2; shift 2; local log=$D/logs/cap-$l${TAG}-$eng.log
  { stamp "start capture $l $eng"; cd $H && ${=GW} node capture.mjs --build $O/$l --label ca5-$l --frames $D/glance/frames --sheets $D/glance --engine $eng "$@"; print -- "# exit $?"; stamp "end capture $l $eng"; } > $log 2>&1
  print -- "cap $l${TAG} $eng: $(grep -E 'ladder|PASS · |FAIL · ' $log | tail -3 | cut -c1-200 | tr '\n' '|')"
}
build() { local l=$1; local log=$D/logs/build-$l.log
  { stamp "build $l"; ${=GW} node $H/build.mjs $(wtof $l) --label $l --out $R/out; print -- "# exit $?"; stamp "end build $l"; } > $log 2>&1; print -- "build $l: $(tail -3 $log | tr '\n' ' ')"; }
buildapp() { local l=$1; local log=$D/logs/build-ca5app-$l.log
  { stamp "build ca5app-$l"; ${=GW} node $H/build.mjs $(wtof $l) --label ca5app-$l --out $R/out --app $D/probe/ca5-App.vue; print -- "# exit $?"; stamp "end build ca5app-$l"; } > $log 2>&1; print -- "build ca5app-$l: $(tail -3 $log | tr '\n' ' ')"; }
gates() { local log=$D/logs/gates-cand.log
  { stamp "gates cand"; ${=GW} zsh /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/A5/gates.sh $R/wt; stamp "end gates"; } > $log 2>&1; grep -E "^exit|Tests |Test Files" $log; }
stages() { # <engine>
  local e=$1
  bat cand $e "" $ALL
  bat geom $e "" E-2 E-5 E-9 E-10
  bat geom $e -arms E-2 -- --commit-arms i,ii,iii
  bat plant $e "" E-1 E-7 E-12
  bat plant $e -n E-2 -- --scenes checkbox,button
  bat plant $e -n E-8 -- --scenes chip
  bat plant $e -n E-9 -- --scenes tabs
  bat plant $e -n E-10 -- --scenes switch,checkbox
  cap plant $e --scenes accordion
  probe $D/probe ca5-probe cand $e
  probe $PC ca4-probe cand $e --only rebound,cardpress
  cap cand $e
}
extra() { # written after the chain launched (C-A5.md §1): the capsule probe both engines, a second Chromium ca5-probe read
  buildapp cand
  probe $D/probe ca5-capsule ca5app-cand chromium
  probe $D/probe ca5-capsule ca5app-cand webkit
  TAG=-r2 probe $D/probe ca5-probe cand chromium
}
for s in "$@"; do
  case $s in
    builds) GW="$G --timeout 20 --"; build cand; build geom; build plant ;;
    gates) GW="$G --timeout 60 --"; gates ;;
    chromium) GW="$G --timeout 90 --"; stages chromium
              TAG=-gpu one cand chromium e1-census.mjs gpu --scenes ambient --gpu metal ;;
    wk-inner) GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission.log
              stages webkit
              extra
              print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission.log ;;
    *) GW="$G --timeout 90 --"; eval "$s" ;;
  esac
done
print -- "# run-ca5 done $(date '+%F %T')"
