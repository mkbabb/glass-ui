#!/bin/zsh
# P-E2 (D5 pass 2, route E on F5 + A's table): builds and the H2 battery, every stage through the guard.
#   run-e2.sh <stage...>   stages: app-<label>  papp-<label>  bat-<label>  cap-<label>  probe-<label>
#   papp-/probe- build and read P-E2's own probe app (probe/App.vue), which grades nothing in the battery
#   labels: veil (wt, KEYBOARD_VEIL = true), noveil (wtn, KEYBOARD_VEIL = false)
# The scene app is the harness's own (scenes/App.vue), unmodified: this seat does not edit what grades it.
# WebKit runs hold the machine-wide lock (guarded --exclusive webkit). One battery at a time.
# Builds are --light; probes, batteries and captures are HEAVY runs (no --light): the guard's
# 13M refusal is never routed around (FORMATION-PROGRESS 2026-10-15 machine notice).
#   env: ONLY=E-2,E-5  ENGINES=chromium  TAG=<suffix>  CAPARGS=<capture.mjs args>
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/E2
O=$B/out
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
only() { [ -n "$ONLY" ] && echo "--only $ONLY"; }
wtof() { [ $1 = noveil ] && echo $B/wtn || echo $B/wt; }
mkdir -p $D/logs $D/json $O
cd $H
for s in "$@"; do
  l=${s#*-}; W=$(wtof $l)
  case $s in
    app-*) { stamp "scene app $l start"; $GUARD --light --timeout 15 -- node build.mjs $W --label $l --out $O; stamp "scene app $l end exit $?"; } > $D/logs/app-$l.log 2>&1 ;;
    papp-*) { stamp "probe app $l start"; $GUARD --light --timeout 15 -- node build.mjs $W --label $l-probe --out $O --app $D/probe/App.vue; stamp "probe app $l end exit $?"; } > $D/logs/papp-$l.log 2>&1 ;;
    probe-*) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "probe $l $e start"; $GUARD $X --timeout 30 -- node $D/probe/probe.mjs --build $O/builds/$l-probe --label $l --engine $e --shots $D/shots; stamp "probe $l $e end exit $?"; } > $D/logs/probe-$l${TAG}-$e.log 2>&1; done ;;
    bat-*) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "battery $l $e start"; $GUARD $X --timeout 150 -- node run.mjs --build $O/builds/$l --wt $W --engines $e ${=$(only)} --out $D/json/$l${TAG} --verbose; stamp "battery $l $e end exit $?"; } > $D/logs/battery-$l${TAG}-$e.log 2>&1; done ;;
    cap-*) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "capture $l $e start"; $GUARD $X --timeout 90 -- node capture.mjs --build $O/builds/$l --label $l --engines $e --frames $D/glance/frames --sheets $D/glance ${=CAPARGS}; stamp "capture $l $e end exit $?"; } > $D/logs/capture-$l${TAG}-$e.log 2>&1; done ;;
  esac
done
echo "run-e2 done $(date '+%F %T')"
