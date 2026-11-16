#!/bin/bash
# Critic 1: the witness spec and the earlier release specs, on the tip and on a git-archive
# tree of v11.1.0. One guarded run at a time; WebKit under --exclusive webkit.
#   chain.sh <phase>...   phases: probe wch wwk rch rwk
set -u
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
RED=$W/.cache/red-v11.1.0/tree
C=$W/docs/release-11.1.1/critic-1
L=$C/logs
G=~/.claude/guard/guarded
say() { echo "$(date +%T) $*" >> $L/chain.txt; }
sum() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$1" 2>/dev/null | tr -s ' ' | tr '\n' ' '; }
refused() { grep -l '\[guarded\] REFUSED' $L/*.log 2>/dev/null | grep -q . && { say "STOP guarded REFUSED: $(grep -h '\[guarded\] REFUSED' $L/*.log | head -1)"; stop_all; exit 75; }; }
start() { # tree port
  if curl -s -o /dev/null http://localhost:$2/; then return; fi
  (cd $1 && exec $G --timeout 90 -- npm run dev -- --host localhost --port $2 --strictPort >> $L/serve-$2.log 2>&1) &
  echo $! > $L/srv-$2.pid
  for i in $(seq 1 90); do curl -s -o /dev/null http://localhost:$2/ && { say "server $2 up pid $(cat $L/srv-$2.pid)"; return; }; sleep 2; done
  say "server $2 DID NOT START"
}
stop() { [ -f $L/srv-$1.pid ] && { kill $(cat $L/srv-$1.pid) 2>/dev/null; rm -f $L/srv-$1.pid; say "server $1 stopped"; }; }
stop_all() { stop 5351; stop 5352; }
ex() { case $1 in webkit*|wk) echo "--exclusive webkit";; esac; }
wit() { # tree(branch|red) project
  local T P tag=wit-$1-$2
  case $1 in
    branch) T=$W; P=5351;;
    red) T=$RED; P=5352
      mkdir -p $T/tests-visual/release-11-1-1
      cp $W/tests-visual/release-11-1-1.spec.ts $W/tests-visual/release-11-1-1.config.ts $T/tests-visual/
      cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/;;
  esac
  start $T $P
  (cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
    $G $(ex $2) --timeout 40 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=$2 --workers=1 ${3:+-g "$3"} > $L/$tag${4:-}.log 2>&1)
  say "$tag${4:-} exit $? load=$(uptime | sed 's/.*averages: //') $(sum $L/$tag${4:-}.log)"; refused
}
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
reg1() { # tree-label engine step
  local T P E=$2 n=$3 tag=reg-$1-$3-$2 rc
  case $1 in branch) T=$W; P=5351;; red) T=$RED; P=5352;; esac
  start $T $P
  local CFG X
  if [ $E = wk ]; then CFG="-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit"; else CFG="-c tests-visual/playwright.config.ts --project=chromium-headless-new"; fi
  local ENVS="GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json OWNER_OUT=$L/out/owner-$1-$E FIX2_OUT=$L/out/fix2-$1-$E CRITIC_OUT=$L/out/c2-$1-$E"
  case $n in
    partA) X="$CFG release-10-1-5.spec.ts --grep-invert";;
    partB) X="$CFG release-10-1-5.spec.ts --grep";;
    owner) X="$CFG release-11-0-1.spec.ts";;
    fix2) X="$CFG release-11-0-1-fix-2.spec.ts";;
    c2) X="$CFG release-11-0-1-critic-2.spec.ts";;
    r1102) if [ $E = wk ]; then X="-c tests-visual/release-11-0-2.config.ts --project=webkit release-11-0-2.spec.ts slider-forced-colors.spec.ts"; else X="$CFG release-11-0-2.spec.ts slider-forced-colors.spec.ts"; fi;;
    r1102b) if [ $E = wk ]; then X="-c tests-visual/release-11-0-2.config.ts --project=webkit-2311 release-11-0-2.spec.ts"; else X="-c tests-visual/playwright.config.ts --project=coarse-touch release-11-0-2.spec.ts"; fi;;
    roloop) if [ $E = wk ]; then X="-c tests-visual/ro-loop.config.ts --project=webkit ro-loop.spec.ts"; ENVS="$ENVS RO_LOOP_WEBKIT=1"; else X="$CFG ro-loop.spec.ts"; fi;;
  esac
  case $n in
    partA|partB) (cd $T && env $ENVS $G $(ex $E) --timeout 40 -- npx playwright test $X "$HALF" --workers=1 > $L/$tag.log 2>&1); rc=$?;;
    *) (cd $T && env $ENVS $G $(ex $E) --timeout 40 -- npx playwright test $X --workers=1 > $L/$tag.log 2>&1); rc=$?;;
  esac
  say "$tag exit $rc load=$(uptime | sed 's/.*averages: //') $(sum $L/$tag.log)"; refused
  return $rc
}
reg() { # engine
  for s in partA partB owner fix2 c2 r1102 r1102b roloop; do
    reg1 branch $1 $s || { say "branch failed $s $1: reading v11.1.0"; reg1 red $1 $s; }
  done
}
mkdir -p $L/out
for P in "$@"; do
  case $P in
    wch) for p in chromium-phone chromium-desktop; do wit branch $p; wit red $p; done;;
    wwk) for p in webkit-phone webkit-desktop; do wit branch $p; wit red $p; done;;
    probe) start $W 5351
      (cd $W && $G --timeout 10 -- node $C/probe/shadow.mjs http://localhost:5351 > $L/probe-shadow.log 2>&1); say "probe-shadow exit $?"; refused;;
    rch) reg ch;;
    rwk) reg wk;;
  esac
  say "PHASE-$P-DONE"
done
stop_all
say "CHAIN-DONE $*"
