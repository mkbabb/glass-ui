#!/bin/zsh
# D5 pass 4 · P-A4: the H4 battery on route A's two builds (light = Q-5 (a), geom = arm ii with a reduce light leg),
# the forced-colours plant, the probes and the CK-25 capture, both engines.
# Every build, test and browser run goes through the machine guard. Chromium: one `guarded` call per witness or probe.
# WebKit: every stage inside ONE `guarded --exclusive webkit` admission (`wk-inner`, the caller wraps it), queued and
# never skipped. One heavy run at a time: stages run in sequence.
#   zsh run-a4.sh <stage…>
#   stages: chromium (every Chromium stage) | wk-inner (inside the admission) | bat-<label>-<engine>[-E-x,E-y] |
#           probes-<engine> | cap-<label>-<engine>
#   env: TAG=<suffix> (a re-read, its own log/json dir)
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/A4
A=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/A4
O=$A/out/builds
G=~/.claude/guard/guarded
TAG=${TAG:-}
mkdir -p $D/logs $D/json $D/glance/frames
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
GEOM=(E-1 E-2 E-5 E-9 E-12)
wtof() { case $1 in geom) print $A/wt-geom ;; *) print $A/wt ;; esac; }
GW=""
bat() { # <label> <engine> <tag> <ids…> [-- extra args]; the caller supplies the guard ($GW)
  local l=$1 eng=$2 tg=$3; shift 3
  local ids=() extra=()
  while (( $# )); do [[ $1 == -- ]] && { shift; extra=("$@"); break; }; ids+=$1; shift; done
  for id in $ids; do
    local log=$D/logs/$l$tg${TAG}-$eng-$id.log
    { stamp "start $id $l$tg $eng"; cd $H && ${=GW} node run.mjs --build $O/$l --wt $(wtof $l) --engines $eng --only $id --out $D/json/$l$tg${TAG} --verbose $extra; print -- "# exit $?"; stamp "end $id $l$tg $eng"; } > $log 2>&1
    print -- "bat $l$tg $eng $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-220)"
  done
}
probe() { # <name> <label> <engine> [args…]
  local n=$1 l=$2 eng=$3; shift 3; local log=$D/logs/$n-$l${TAG}-$eng.log
  { stamp "start $n $l $eng"; cd $D/probe && ${=GW} node $n.mjs --build $O/$l --engine $eng "$@"; print -- "# exit $?"; stamp "end $n $l $eng"; } > $log 2>&1
  print -- "probe $n $l $eng: $(grep -c REPORT $log) REPORT lines, $(grep '^# exit' $log)"
}
cap() { # <label> <engine>
  local l=$1 eng=$2; local log=$D/logs/cap-$l${TAG}-$eng.log
  { stamp "start capture $l $eng"; cd $H && ${=GW} node capture.mjs --build $O/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine $eng; print -- "# exit $?"; stamp "end capture $l $eng"; } > $log 2>&1
  print -- "cap $l $eng: $(grep -E '^CAP|capture done|verdict|PASS · |FAIL · ' $log | tail -2 | tr '\n' ' ' | cut -c1-220)"
}
for s in "$@"; do
  case $s in
    chromium)
      GW="$G --timeout 90 --"
      bat light chromium "" $ALL
      bat geom chromium "" $GEOM
      bat geom chromium -arms E-2 -- --commit-arms i,ii,iii
      bat plant-fc chromium "" E-12
      TAG=-r2 bat light chromium "" E-5; TAG=-r3 bat light chromium "" E-5
      GW="$G --timeout 20 --"
      probe facefilm base chromium --scenes radio,checkbox,switch,accordion,toggle
      probe facefilm light chromium --scenes radio,checkbox,switch,accordion,toggle
      TAG=-prm probe facefilm geom chromium --scenes radio,checkbox,switch --prm
      TAG=-prm probe facefilm light chromium --scenes radio,checkbox,switch,tabs --prm
      probe pressfilm light chromium --scenes toggle,accordion,switch,tabs
      GW="$G --timeout 30 --"
      cap light chromium; cap geom chromium ;;
    wk-inner)
      # inside the one `guarded --exclusive webkit` admission: no nested guard
      GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log
      bat light webkit "" $ALL
      bat geom webkit "" $GEOM
      bat geom webkit -arms E-2 -- --commit-arms i,ii,iii
      bat plant-fc webkit "" E-12
      TAG=-r2 bat light webkit "" E-5
      probe facefilm base webkit --scenes radio,checkbox,switch,accordion,toggle
      probe facefilm light webkit --scenes radio,checkbox,switch,accordion,toggle
      TAG=-prm probe facefilm geom webkit --scenes radio,checkbox,switch --prm
      TAG=-prm probe facefilm light webkit --scenes radio,checkbox,switch,tabs --prm
      probe pressfilm base webkit --scenes toggle,accordion
      probe pressfilm light webkit --scenes toggle,accordion,switch,tabs
      cap light webkit; cap geom webkit
      print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log ;;
    bat-*)
      rest=${s#bat-}; l=${rest%%-*}; r2=${rest#*-}; eng=${r2%%-*}; ids=($ALL); [[ $r2 == *-* ]] && ids=(${(s:,:)${r2#*-}})
      [[ $eng == chromium ]] && GW="$G --timeout 90 --" || GW=""
      bat $l $eng "" $ids ;;
    cap-*)
      rest=${s#cap-}; l=${rest%%-*}; eng=${rest#*-}; [[ $eng == chromium ]] && GW="$G --timeout 30 --" || GW=""; cap $l $eng ;;
  esac
done
print -- "# run-a4 done $(date '+%F %T')"
