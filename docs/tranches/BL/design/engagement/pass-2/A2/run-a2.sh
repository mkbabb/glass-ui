#!/bin/zsh
# P-A2 (D5 pass 2, route A on F5): the H2 battery on the two commit-arm builds, every stage through the guard.
#   run-a2.sh <stage...>   stages: app-light app-geom bat-light bat-geom-e2 cap-light cap-geom
# WebKit runs hold the machine-wide lock (guarded --exclusive webkit). One battery at a time for this seat.
#   env: ONLY=E-2,E-5 (narrow a battery stage), ENGINES=chromium, TAG=<suffix> (a second reading)
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/A2
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/A2/wt
WTG=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/A2/wtg   # the geometric arm's build
O=$WT/.a2-out
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
only() { [ -n "$ONLY" ] && echo "--only $ONLY"; }
mkdir -p $D/logs $D/json
cd $H
for s in "$@"; do
  case $s in
    app-light|app-geom) l=${s#app-}; S=$WT; [ $l = geom ] && S=$WTG; { stamp "scene app $l start"; $GUARD --light --timeout 15 -- node build.mjs $S --label $l --out $O --app $D/scenes/App.vue; stamp "scene app $l end exit $?"; } > $D/logs/app-$l.log 2>&1 ;;
    bat-light) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "light battery $e start"; $GUARD --light $X --timeout 120 -- node run.mjs --build $O/builds/light --wt $WT --engines $e ${=$(only)} --out $D/json/light${TAG} --verbose; stamp "light battery $e end exit $?"; } > $D/logs/battery-light${TAG}-$e.log 2>&1; done ;;
    bat-geom-e2) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "geom E-2 $e start"; $GUARD --light $X --timeout 60 -- node run.mjs --build $O/builds/geom --wt $WTG --engines $e --only E-2 --commit-arms i,ii,iii --out $D/json/geom${TAG} --verbose; stamp "geom E-2 $e end exit $?"; } > $D/logs/battery-geom${TAG}-$e.log 2>&1; done ;;
    cap-light|cap-geom) l=${s#cap-}; for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "capture $l $e start"; $GUARD --light $X --timeout 60 -- node capture.mjs --build $O/builds/$l --label $l --engines $e --frames $D/glance/frames --sheets $D/glance ${=CAPARGS}; stamp "capture $l $e end exit $?"; } > $D/logs/capture-$l${TAG}-$e.log 2>&1; done ;;
  esac
done
echo "run-a2 done $(date '+%F %T')"
