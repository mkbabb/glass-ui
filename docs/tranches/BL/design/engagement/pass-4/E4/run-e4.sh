#!/bin/zsh
# D5 pass 4 · P-E4: route E on F5'' + P-A4-light, four arm builds (KEYBOARD_VEIL veil|noveil × POINTER_STAGE every|coarse),
# the H4 battery, the forked probe, the CK-25 capture, the gates. Every build, test and browser run through the machine
# guard. Chromium: one `guarded` per witness, probe or capture. WebKit: every stage inside ONE
# `guarded --exclusive webkit` admission (`wk-inner`; the caller wraps it), queued, never skipped. Strictly sequential.
#   zsh run-e4.sh <stage…>
#   stages: arm-<veil|noveil>-<every|coarse> | build-<label> | buildprobe-<label> | patch-<label> | gates |
#           chromium | wk-inner | bat-<label>-<engine>[-E-x,E-y] | probe-<label>-<engine> | cap-<label>-<engine>[-<scenes>]
#   env: TAG=<suffix> (a re-read: its own log/json names)
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/E4
P4=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/E4/wt
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/E4/out
S=$WT/src/composables/motion/engage/stage.ts
G=~/.claude/guard/guarded
TAG=${TAG:-}
mkdir -p $D/logs $D/json $D/glance/frames $D/shots
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
STAGE=(E-1 E-3 E-4 E-7 E-8 E-9 E-10 E-11 E-12)   # every witness that reads the slider, the stage or its veil
ARMDEP=(E-3 E-4 E-10 E-11 E-12)                   # the cells the two arm constants can move
consts() { grep -E '^export const (KEYBOARD_VEIL|POINTER_STAGE)' $S | tr '\n' ' '; }
GW=""
bat() { # <label> <engine> <ids…>
  local l=$1 eng=$2; shift 2
  for id in "$@"; do
    local log=$D/logs/$l${TAG}-$eng-$id.log
    { stamp "start $id $l $eng"; cd $H && ${=GW} node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l${TAG} --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
    print -- "bat $l${TAG} $eng $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-220)"
  done
}
probe() { # <label> <engine>
  local l=$1 eng=$2; local log=$D/logs/probe-$l${TAG}-$eng.log
  { stamp "probe $l $eng start"; cd $D/probe && ${=GW} node e4-probe.mjs --build $O/builds/probe-$l --engine $eng --label $l${TAG} --shots $D/shots; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
  print -- "probe $l${TAG} $eng: $(grep '^e4-probe' $log | tail -1)"
}
film() { # <label> <engine> <how>
  local l=$1 eng=$2 how=$3; local log=$D/logs/handoff-film-$l-$eng-$how.log
  { stamp "handoff-film $l $eng $how"; cd $D/probe && ${=GW} node handoff-film.mjs --build $O/builds/probe-$l --engine $eng --label $l --how $how; print -- "# exit $?"; } > $log 2>&1
  print -- "film $l $eng $how: $(grep -c ' dt ' $log) step frames"
}
cap() { # <label> <engine> [scenes]
  local l=$1 eng=$2 sc=${3:-}; local log=$D/logs/cap-$l${sc:+-$sc}-$eng.log
  { stamp "capture $l $eng start"; cd $H && ${=GW} node capture.mjs --build $O/builds/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine $eng ${sc:+--scenes $sc}; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
  print -- "cap $l $eng ${sc}: $(grep -E 'verdict|^CAP .*(PASS|FAIL) ·' $log | tail -1 | cut -c1-200)"
}
for s in "$@"; do
  case $s in
    arm-*)
      a=${s#arm-}; kv=true; [[ ${a%%-*} == noveil ]] && kv=false; ps=${a#*-}
      sed -i '' "s/^export const KEYBOARD_VEIL = .*;/export const KEYBOARD_VEIL = $kv;/; s/^export const POINTER_STAGE: \"every\" | \"coarse\" = .*;/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$ps\";/" $S
      print -- "$s: $(consts)" ;;
    buildprobe-*)
      l=${s#buildprobe-}
      { stamp "build probe-$l start · $(consts)"; cd $H && $G --timeout 20 -- node build.mjs $WT --label probe-$l --out $O --app $D/probe/App.vue; print -- "# exit $?"; stamp "build probe-$l end"; } > $D/logs/build-probe-$l.log 2>&1
      print -- "$s: $(grep '^# exit' $D/logs/build-probe-$l.log) · $(consts)" ;;
    build-*)
      l=${s#build-}
      { stamp "build $l start · $(consts)"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
      print -- "$s: $(grep '^# exit' $D/logs/build-$l.log) · $(consts)" ;;
    patch-*)
      l=${s#patch-}
      (cd $WT && git diff --binary HEAD) > $P4/P-E4-$l.patch
      print -- "$s: $(wc -l < $P4/P-E4-$l.patch) lines · $(shasum $P4/P-E4-$l.patch | cut -c1-40) · $(grep -c '^+export const KEYBOARD_VEIL\|^+export const POINTER_STAGE' $P4/P-E4-$l.patch) const lines · $(consts)" ;;
    gates)
      { cd $WT; print -- "# arms: $(consts)"; stamp "npm run build start"; $G --timeout 30 -- npm run build; print -- "# build exit $?"; stamp "build end"
        stamp "typecheck start"; $G --light --timeout 20 -- npm run typecheck; print -- "# typecheck exit $?"; stamp "typecheck end"
        stamp "demo:dist:build start"; $G --timeout 30 -- npm run demo:dist:build; print -- "# demo:dist:build exit $?"; stamp "demo:dist:build end"
        stamp "vitest start"; $G --timeout 60 -- npx vitest run --maxWorkers=2; print -- "# vitest exit $?"; stamp "vitest end"; } > $D/logs/gates${TAG}.log 2>&1
      print -- "gates: $(grep -E '^# (build|typecheck|demo:dist:build|vitest) exit' $D/logs/gates${TAG}.log | tr '\n' ' ')" ;;
    chromium)
      GW="$G --timeout 90 --"
      bat noveil-coarse chromium $ALL
      bat veil-every chromium $STAGE
      bat veil-coarse chromium $ARMDEP
      bat noveil-every chromium $ARMDEP
      GW="$G --timeout 30 --"
      for l in noveil-coarse veil-every veil-coarse noveil-every; do probe $l chromium; done
      film noveil-coarse chromium fwd; film noveil-coarse chromium rev
      cap noveil-coarse chromium; cap veil-every chromium
      cap veil-coarse chromium slider; cap noveil-every chromium slider ;;
    wk-inner)
      GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log
      bat noveil-coarse webkit $ALL
      bat veil-every webkit $STAGE
      bat veil-coarse webkit $ARMDEP
      bat noveil-every webkit $ARMDEP
      for l in noveil-coarse veil-every veil-coarse noveil-every; do probe $l webkit; done
      film noveil-coarse webkit fwd; film noveil-coarse webkit rev
      cap noveil-coarse webkit; cap veil-every webkit
      cap veil-coarse webkit slider; cap noveil-every webkit slider
      print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log ;;
    bat-*)
      rest=${s#bat-}; parts=(${(s:-:)rest}); l=$parts[1]-$parts[2]; eng=$parts[3]; ids=($ALL); [[ ${#parts} -gt 3 ]] && ids=(${(s:,:)${rest#$l-$eng-}})
      [[ $eng == chromium ]] && GW="$G --timeout 90 --" || GW=""
      bat $l $eng $ids ;;
    probe-*)
      rest=${s#probe-}; parts=(${(s:-:)rest}); [[ $parts[3] == chromium ]] && GW="$G --timeout 30 --" || GW=""
      probe $parts[1]-$parts[2] $parts[3] ;;
    cap-*)
      rest=${s#cap-}; parts=(${(s:-:)rest}); [[ $parts[3] == chromium ]] && GW="$G --timeout 30 --" || GW=""
      cap $parts[1]-$parts[2] $parts[3] ${parts[4]:-} ;;
  esac
done
print -- "# run-e4 done $(date '+%F %T')"
