#!/bin/bash
# Critic 8, fourth sitting (2026-11-21): the frost note's witness on the tip and on v11.1.0 in
# the four projects, then WebKit 390's parts A and D whole on the tip, then the Sheet bottom
# fade ten times in WebKit 390 at a load under 16. One heavy run at a time, each through the
# run guard, WebKit under --exclusive webkit. Ports: tip 5355, red 5356.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-8
R=$D/r4
RED=$W/.cache/red-v11.1.0/tree
G=~/.claude/guard/guarded
log() { echo "$(date +%T) $*" >> $R/runs.out; }
sum() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$1" 2>/dev/null | tr -s ' ' | tr '\n' ' '; }
tree() { case $1 in tip) T=$W; P=5355 ;; red) T=$RED; P=5356 ;; esac; }
ex() { case $1 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac; }
probe() { # probe <tip|red> <project> <tag>
  tree $1; ex $2; local l0=$(sysctl -n vm.loadavg) s=$(date +%s)
  mkdir -p $T/tests-visual/critic8-probe && cp $D/probe/frost.probe.ts $D/probe/probe.config.ts $T/tests-visual/critic8-probe/
  (cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$R/$3.json \
    $G "${EX[@]}" --timeout 30 -- npx playwright test -c critic8-probe/probe.config.ts --project=$2 --workers=1 frost.probe.ts > $R/$3.log 2>&1)
  local rc=$?; rm -rf $T/tests-visual/critic8-probe
  log "$3 $1 $2 exit $rc $(( $(date +%s) - s ))s load-at-start=$l0 load-end=$(sysctl -n vm.loadavg) $(sum $R/$3.log)"
}
cells() { # cells <tip|red> <project> <tag> <grep> [args]
  tree $1; ex $2; local tag=$3 grep=$4; shift 4; local l0=$(sysctl -n vm.loadavg) s=$(date +%s)
  (cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$R/$tag.json \
    $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$grep" "$@" > $R/$tag.log 2>&1)
  log "$tag $1 $2 exit $? $(( $(date +%s) - s ))s load-at-start=$l0 load-end=$(sysctl -n vm.loadavg) $(sum $R/$tag.log)"
}
calm() { # wait up to $1 minutes for a 1-minute load under 16
  local n=0; while (( n < $1 * 2 )); do l=$(sysctl -n vm.loadavg | awk '{print $2}'); awk "BEGIN{exit !($l < 16)}" && return 0; sleep 30; n=$((n+1)); done; log "calm wait passed $1 min (load $l)"; return 0; }
from=${1:-1}
log "CHAIN-START from $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)"
if (( from <= 1 )); then
  for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do probe tip $p frost-tip-$p; probe red $p frost-red-$p; done
fi
if (( from <= 2 )); then
  cells tip webkit-phone wp-A "(form|glass|exit|routes|round|weight|lift|sheet) · "
  cells tip webkit-phone wp-D "(site|fade|fold|mark|press|still) · "
fi
if (( from <= 3 )); then
  calm 40; cells tip webkit-phone wp-fade-x10 "fade · a Sheet bottom appears" --repeat-each=10
fi
log "CHAIN-DONE load $(sysctl -n vm.loadavg)"
