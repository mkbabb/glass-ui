#!/bin/bash
# Critic 1, second chain: the earlier release specs (one guarded call per engine and
# tree), then the backdrop paint probe in both engines on both trees.
#   chain2.sh <phase>...   phases: rch rwk paint leave
set -u
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
RED=$W/.cache/red-v11.1.0/tree
C=$W/docs/release-11.1.1/critic-1
L=$C/logs
G=~/.claude/guard/guarded
say() { echo "$(date +%T) $*" >> $L/chain.txt; }
refused() { grep -l '\[guarded\] REFUSED' $L/*.log $L/*.out 2>/dev/null | grep -q . && { say "STOP guarded REFUSED: $(grep -h '\[guarded\] REFUSED' $L/*.log $L/*.out | head -1)"; exit 75; }; }
start() { # tree port
  if curl -s -o /dev/null http://localhost:$2/; then return; fi
  (cd $1 && exec $G --timeout 90 -- npm run dev -- --host localhost --port $2 --strictPort >> $L/serve-$2.log 2>&1) &
  echo $! >> $L/srv-$2.pid
  for i in $(seq 1 300); do curl -s -o /dev/null http://localhost:$2/ && { say "server $2 up"; return; }; sleep 2; done
  say "server $2 DID NOT START"
}
stop() { [ -f $L/srv-$1.pid ] && { for p in $(cat $L/srv-$1.pid); do kill $p 2>/dev/null; done; rm -f $L/srv-$1.pid; say "server $1 stopped"; }; }
fresh() { # tree port
  stop $2; pid=$(lsof -nP -t -iTCP:$2 -sTCP:LISTEN 2>/dev/null); [ -n "$pid" ] && kill $pid 2>/dev/null
  for i in $(seq 1 30); do lsof -nP -iTCP:$2 -sTCP:LISTEN >/dev/null 2>&1 || break; sleep 1; done
  start $1 $2
}
STEPS="partA partB owner fix2 c2 r1102 r1102b roloop"
reg() { # ch|wk
  local E=$1 X=""; [ $E = wk ] && X="--exclusive webkit"
  rm -f $L/reg-failed-branch-$E.txt $L/reg-failed-red-$E.txt
  # A fresh server for each engine's pass, so its 90-minute guard cannot end mid-pass.
  fresh $W 5351
  $G $X --timeout 80 -- bash $C/reg-inner.sh branch $E $STEPS > $L/reg-branch-$E.out 2>&1
  say "reg branch $E exit $?"; refused
  if [ -s $L/reg-failed-branch-$E.txt ]; then
    fresh $RED 5352
    $G $X --timeout 80 -- bash $C/reg-inner.sh red $E $(tr '\n' ' ' < $L/reg-failed-branch-$E.txt) > $L/reg-red-$E.out 2>&1
    say "reg red $E exit $?"; refused
  fi
}
paint() {
  start $W 5351; start $RED 5352
  for e in chromium webkit; do
    local X=""; [ $e = webkit ] && X="--exclusive webkit"
    (cd $W && $G $X --timeout 15 -- node $C/probe/paint.mjs $e http://localhost:5351 tip $C/shots > $L/paint-tip-$e.json 2> $L/paint-tip-$e.log); say "paint tip $e exit $?"; refused
    (cd $W && $G $X --timeout 15 -- node $C/probe/paint.mjs $e http://localhost:5352 v1110 $C/shots > $L/paint-v1110-$e.json 2> $L/paint-v1110-$e.log); say "paint v1110 $e exit $?"; refused
  done
}
for P in "$@"; do
  case $P in rch) reg ch;; rwk) reg wk;; paint) paint;;
    resheet) start $W 5351
      for i in 1 2 3; do
        (cd $W && GLASS_UI_DEMO_PORT=5351 GLASS_UI_DEMO_URL=http://localhost:5351 PI_REPORT=$L/resheet-webkit-phone-$i.json $G --exclusive webkit --timeout 15 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=webkit-phone --workers=1 -g "exit · Sheet" > $L/resheet-webkit-phone-$i.log 2>&1)
        say "resheet-webkit-phone-$i exit $? $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $L/resheet-webkit-phone-$i.log | tr -s ' ' | tr '\n' ' ')"; refused
      done
      for i in 1 2 3; do
        (cd $W && GLASS_UI_DEMO_PORT=5351 GLASS_UI_DEMO_URL=http://localhost:5351 PI_REPORT=$L/recell-webkit-desktop-$i.json $G --exclusive webkit --timeout 15 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=webkit-desktop --workers=1 -g "standing · Sheet bottom" > $L/recell-webkit-desktop-$i.log 2>&1)
        say "recell-webkit-desktop-$i exit $? $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $L/recell-webkit-desktop-$i.log | tr -s ' ' | tr '\n' ' ')"; refused
      done;;
    leave) start $W 5351
      (cd $W && $G --timeout 10 -- node $C/probe/shadow.mjs http://localhost:5351 chromium > $L/probe-leave-chromium.log 2>&1); say "probe-leave chromium exit $?"; refused
      (cd $W && $G --exclusive webkit --timeout 10 -- node $C/probe/shadow.mjs http://localhost:5351 webkit > $L/probe-leave-webkit.log 2>&1); say "probe-leave webkit exit $?"; refused;;
  esac
  say "PHASE2-$P-DONE"
done
stop 5351; stop 5352
say "CHAIN2-DONE $*"
