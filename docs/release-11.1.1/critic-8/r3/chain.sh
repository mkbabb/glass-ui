#!/bin/bash
# Critic 8, third sitting (2026-11-21): what the earlier sittings' logs leave open, one
# heavy run at a time, each through the run guard, WebKit under --exclusive webkit.
#   1. the three WebKit 390 cells that failed on the tip in the gate's parts, ten times each;
#   2. the v11.1.0 cells whose RED was the film's fault, not the claim's, read again;
#   3. release-11-0-1-critic-1's capsule titles in WebKit, v11.1.0 and the tip interleaved.
# tip is the worktree at HEAD on port 5351; red is the v11.1.0 git-archive tree with HEAD's
# 11.1.1 specs (critic-8/redspecs.sh) on port 5352.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
R=$W/docs/release-11.1.1/critic-8/r3
RED=$W/.cache/red-v11.1.0/tree
G=~/.claude/guard/guarded
log() { echo "$(date +%T) $*" >> $R/runs.out; }
sum() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$1" 2>/dev/null | tr -s ' ' | tr '\n' ' '; }
cells() { # cells <tip|red> <project> <tag> <grep> [args]
  local tree=$1 project=$2 tag=$3 grep=$4; shift 4
  case $tree in tip) T=$W; P=5351 ;; red) T=$RED; P=5352 ;; esac
  case $project in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
  local l0=$(sysctl -n vm.loadavg) s=$(date +%s)
  (cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$R/$tag.json \
    $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$project --workers=1 -g "$grep" "$@" > $R/$tag.log 2>&1)
  log "$tag $tree $project exit $? $(( $(date +%s) - s ))s load-at-start=$l0 load-end=$(sysctl -n vm.loadavg) $(sum $R/$tag.log)"
}
c1() { # c1 <tip|red> <tag>
  local tree=$1 tag=$2
  case $tree in tip) T=$W; P=5353 ;; red) T=$RED; P=5354 ;; esac
  local l0=$(sysctl -n vm.loadavg) s=$(date +%s)
  (cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P CRITIC_OUT=$R/out/c1-$tag PI_REPORT=$R/$tag.json \
    $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit \
    release-11-0-1-critic-1.spec.ts --workers=1 -g "capsule in paint" > $R/$tag.log 2>&1)
  log "$tag $tree c1-capsule webkit exit $? $(( $(date +%s) - s ))s load-at-start=$l0 load-end=$(sysctl -n vm.loadavg) $(sum $R/$tag.log)"
}
from=${1:-1}
log "CHAIN-START from $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)"
if (( from <= 1 )); then
  cells tip webkit-phone wp-tip-x10 "exit · Sheet bottom leaves|fade · a Toast appears|fade · a Sheet bottom appears" --repeat-each=10
fi
if (( from <= 2 )); then
  bash $W/docs/release-11.1.1/critic-8/redspecs.sh || { log "redspecs differ"; exit 1; }
  cells red webkit-phone wp-red-x5 "exit · Sheet bottom leaves" --repeat-each=5
  cells red webkit-desktop wd-red-x3 "exit · Tooltip leaves on the exit curve|exit · Sheet right leaves" --repeat-each=3
fi
if (( from <= 3 )); then
  mkdir -p $R/out
  for i in 1 2; do c1 red c1-red-$i; c1 tip c1-tip-$i; done
fi
log "CHAIN-DONE load $(sysctl -n vm.loadavg)"
