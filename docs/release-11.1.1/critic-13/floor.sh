#!/bin/bash
# Critic 13: the pixel floor's three legs as release.sh runs them, on the worktree, each through
# its own guarded call, on its own server (5354). Each leg's log and report land in logs/floor-<leg>.*
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-13/logs
G=~/.claude/guard/guarded
P=5354
for leg in green planted flood; do
  case $leg in
    green) script=gate:pixel-floor; report=pi-report-green.json ;;
    planted) script=gate:pixel-floor:planted; report=pi-report-planted.json ;;
    flood) script=gate:pixel-floor:planted:flood; report=pi-report-flood.json ;;
  esac
  s=$(date +%s); l0=$(sysctl -n vm.loadavg)
  (cd $W && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P $G --timeout 30 -- npm -w tests-visual run "$script") > $L/floor-$leg.log 2>&1
  rc=$?
  cp $W/tests-visual/.cache/$report $L/floor-$leg.json 2>/dev/null
  echo "$(date +%T) floor-$leg exit $rc $(( $(date +%s) - s ))s load $l0 -> $(sysctl -n vm.loadavg)" >> $L/runs.out
done
