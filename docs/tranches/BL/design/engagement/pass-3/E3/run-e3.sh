#!/bin/zsh
# D5 pass 3 · P-E3: the H3 battery on HEAD + P-E3-{veil,noveil}.patch (each contains F5' + P-A3-light), both engines,
# the probe, the capture, the gates. Every run through the machine guard; Chromium stages here; every Playwright WebKit
# stage runs inside ONE `guarded --exclusive webkit` acquisition (wk-batch.sh), queued, never skipped.
#   zsh run-e3.sh <stage…>
#   stages: arm-<veil|noveil> (sets KEYBOARD_VEIL in the worktree, the one line the two patches differ in)
#           build-<label> buildprobe-<label> bat-<label>-chromium[-<E-x,E-y>] probe-<label>-chromium
#           cap-<label>-chromium[-<scenes>] gates
#   env: TAG=<suffix> (a second reading), ARGS="<extra witness args>"
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/E3
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/E3/wt
O=$WT/.e3-out
G=~/.claude/guard/guarded
mkdir -p $D/logs $D/json
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11)
for s in "$@"; do
  case $s in
    arm-*)
      a=${s#arm-}; v=true; [[ $a == noveil ]] && v=false
      sed -i '' "s/^export const KEYBOARD_VEIL = .*;/export const KEYBOARD_VEIL = $v;/" $WT/src/composables/motion/engage/stage.ts
      print -- "$s: $(grep -n '^export const KEYBOARD_VEIL' $WT/src/composables/motion/engage/stage.ts)" ;;
    buildprobe-*)
      l=${s#buildprobe-}
      { stamp "build probe-$l start ($WT) KEYBOARD_VEIL: $(grep -n 'export const KEYBOARD_VEIL' $WT/src/composables/motion/engage/stage.ts)"; cd $H && $G --timeout 20 -- node build.mjs $WT --label probe-$l --out $O --app $D/probe/App.vue; print -- "# exit $?"; stamp "build probe-$l end"; } > $D/logs/build-probe-$l.log 2>&1
      print -- "$s: $(tail -3 $D/logs/build-probe-$l.log | head -1)" ;;
    build-*)
      l=${s#build-}
      { stamp "build $l start ($WT) KEYBOARD_VEIL: $(grep -n 'export const KEYBOARD_VEIL' $WT/src/composables/motion/engage/stage.ts)"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
      print -- "$s: $(tail -3 $D/logs/build-$l.log | head -1)" ;;
    bat-*)
      parts=(${(s:-:)s#bat-}); l=$parts[1]; eng=$parts[2]
      ids=($ALL); [[ -n $parts[3] ]] && ids=(${(s:,:)${s#bat-$l-$eng-}})
      for id in $ids; do
        log=$D/logs/$l${TAG}-$eng-$id.log
        { stamp "start $id $l $eng"; cd $H && $G --timeout 90 -- node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l${TAG} --verbose ${=ARGS}; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
        print -- "$s $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-220)"
      done ;;
    probe-*)
      parts=(${(s:-:)s#probe-}); l=$parts[1]; eng=$parts[2]
      log=$D/logs/probe-$l${TAG}-$eng.log
      { stamp "probe $l $eng start"; cd $D/probe && $G --timeout 60 -- node e3-probe.mjs --build $O/builds/probe-$l --engine $eng --label $l${TAG} --shots $D/shots; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
      print -- "$s: $(grep '^e3-probe' $log | tail -1)" ;;
    cap-*)
      parts=(${(s:-:)s#cap-}); l=$parts[1]; eng=$parts[2]; sc=$parts[3]
      log=$D/logs/cap-$l-$eng.log
      { stamp "capture $l $eng start"; cd $H && $G --timeout 90 -- node capture.mjs --build $O/builds/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine $eng ${sc:+--scenes $sc}; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
      print -- "$s: $(tail -4 $log | head -2 | tr '\n' ' ' | cut -c1-240)" ;;
    gates)
      { cd $WT; stamp "npm run build start"; $G --timeout 30 -- npm run build; print -- "# build exit $?"; stamp "build end"
        stamp "typecheck start"; $G --light --timeout 20 -- npm run typecheck; print -- "# typecheck exit $?"; stamp "typecheck end"
        stamp "demo:dist:build start"; $G --timeout 30 -- npm run demo:dist:build; print -- "# demo:dist:build exit $?"; stamp "demo:dist:build end"
        stamp "vitest start"; $G --timeout 60 -- npx vitest run --maxWorkers=2; print -- "# vitest exit $?"; stamp "vitest end"; } > $D/logs/gates${TAG}.log 2>&1
      print -- "gates: $(grep -E '^# (build|typecheck|demo:dist:build|vitest) exit' $D/logs/gates${TAG}.log | tr '\n' ' ')" ;;
  esac
done
print -- "# run-e3 done $(date '+%F %T')"
