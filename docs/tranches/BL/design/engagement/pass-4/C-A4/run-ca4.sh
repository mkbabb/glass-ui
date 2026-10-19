#!/bin/zsh
# C-A4 (D5 pass 4 critic of route A): H4's battery, unedited, on three builds of the harness's own app
# (light = P-A4-light, the default; geom = P-A4-geom; plant = light + plant.sh), P-A4's and P-A3's probes, the CK-25
# capture, both engines. Chromium: one `guarded` call per witness or probe. WebKit: every stage inside ONE
# `guarded --exclusive webkit` admission (`wk-inner`; the caller wraps it). One heavy run at a time.
#   zsh run-ca4.sh chromium | wk-inner | <single stage>
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/C-A4
PA=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/A4/probe
P3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3/probe
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/C-A4
O=$W/out/builds
G=~/.claude/guard/guarded
TAG=${TAG:-}
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
GEOM=(E-1 E-2 E-5 E-9 E-12)
PLANT=(E-1 E-2 E-5 E-7 E-8 E-9 E-12)
wtof() { case $1 in geom) print $W/wt-geom ;; plant) print $W/wt-plant ;; *) print $W/wt ;; esac; }
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
probe() { # <dir> <name> <label> <engine> [args…]
  local pd=$1 n=$2 l=$3 eng=$4; shift 4; local log=$D/logs/$n-$l${TAG}-$eng.log
  { stamp "start $n $l $eng"; cd $pd && ${=GW} node $n.mjs --build $O/$l --engine $eng "$@"; print -- "# exit $?"; stamp "end $n $l $eng"; } > $log 2>&1
  print -- "probe $n $l${TAG} $eng: $(grep -cE '^\s+PASS' $log) P $(grep -cE '^\s+FAIL' $log) F, $(grep '^# exit' $log)"
}
cap() { local l=$1 eng=$2; local log=$D/logs/cap-$l-$eng.log
  { stamp "start capture $l $eng"; cd $H && ${=GW} node capture.mjs --build $O/$l --label ca4-$l --frames $D/glance/frames --sheets $D/glance --engine $eng; print -- "# exit $?"; stamp "end capture $l $eng"; } > $log 2>&1
  print -- "cap $l $eng: $(grep -E 'PASS · |FAIL · ' $log | tail -1 | cut -c1-200)"; }
stages() { # <engine>
  local e=$1
  bat light $e "" $ALL
  TAG=-r2 bat light $e "" E-5 E-4
  bat geom $e "" $GEOM
  bat geom $e -arms E-2 -- --commit-arms i,ii,iii
  if [[ $e == chromium ]]; then bat plant $e "" $PLANT
  else # WebKit: the plant cells only (one acquisition, inside the 90 min clamp)
    bat plant $e "" E-1 E-7 E-12
    bat plant $e -n E-2 -- --scenes checkbox,button,radio
    bat plant $e -n E-5 -- --scenes toggle
    bat plant $e -n E-8 -- --scenes chip
    bat plant $e -n E-9 -- --scenes tabs
  fi
  probe $P3 a3-probe light $e --only ck21,ck14,ck13,ck20
  probe $PA facefilm light $e --scenes radio,checkbox,switch,accordion,toggle
  TAG=-prm probe $PA facefilm light $e --scenes radio,checkbox,switch,accordion,toggle,tabs --prm
  probe $PA facefilm plant $e --scenes radio
  probe $PA pressfilm light $e --scenes toggle,accordion,switch,tabs
  probe $PA pressfilm plant $e --scenes toggle
  probe $D/probe ca4-probe light $e
  probe $D/probe ca4-probe nodelay $e --only rebound
  probe $D/probe ca4-ladder light $e
  cap light $e
}
for s in "$@"; do
  case $s in
    chromium) GW="$G --timeout 90 --"; stages chromium ;;
    wk-inner) GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission.log
              stages webkit
              print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission.log ;;
    *) GW="$G --timeout 90 --"; eval "$s" ;;
  esac
done
print -- "# run-ca4 done $(date '+%F %T')"
