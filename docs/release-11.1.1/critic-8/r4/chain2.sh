#!/bin/bash
# Critic 8, fourth sitting, second chain: takes over from chain.sh after its last frost run
# (v11.1.0, WebKit 1440), reordered so the short WebKit readings come first:
#   1. raf-cured.mjs: the film's sequence with the cure defect 2 asks for, WebKit then Chromium;
#   2. the Sheet bottom's reduced-motion fade ten times in WebKit 390, at a load under 16;
#   3. WebKit 390's parts D and A whole on the tip.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-8
R=$D/r4
G=~/.claude/guard/guarded
log() { echo "$(date +%T) $*" >> $R/runs.out; }
sum() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$1" 2>/dev/null | tr -s ' ' | tr '\n' ' '; }
cells() { # cells <project> <tag> <grep> [args]   (tip only, port 5355)
  local project=$1 tag=$2 grep=$3; shift 3; local l0=$(sysctl -n vm.loadavg) s=$(date +%s)
  (cd $W/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5355 GLASS_UI_DEMO_URL=http://localhost:5355 PI_REPORT=$R/$tag.json \
    $G --exclusive webkit --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$project --workers=1 -g "$grep" "$@" > $R/$tag.log 2>&1)
  log "$tag tip $project exit $? $(( $(date +%s) - s ))s load-at-start=$l0 load-end=$(sysctl -n vm.loadavg) $(sum $R/$tag.log)"
}
calm() { local n=0; while (( n < $1 * 2 )); do l=$(sysctl -n vm.loadavg | awk '{print $2}'); awk "BEGIN{exit !($l < 16)}" && return 0; sleep 30; n=$((n+1)); done; log "calm wait passed $1 min (load $l)"; return 0; }
prev=${1:-}
if [ -n "$prev" ]; then
  while kill -0 $prev 2>/dev/null; do sleep 15; done
  rm -rf $W/.cache/red-v11.1.0/tree/tests-visual/critic8-probe
  log "frost-red-webkit-desktop red webkit-desktop (chain.sh's run, ended under chain2) $(sum $R/frost-red-webkit-desktop.log)"
fi
log "CHAIN2-START head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)"
for e in webkit chromium; do
  case $e in webkit) EX=(--exclusive webkit) ;; *) EX=() ;; esac
  l0=$(sysctl -n vm.loadavg)
  (cd $W/tests-visual && $G "${EX[@]}" --timeout 10 -- node $R/raf-cured.mjs $e > $R/raf-cured-$e.json 2> $R/raf-cured-$e.err)
  log "raf-cured-$e exit $? load-at-start=$l0 $(head -c 400 $R/raf-cured-$e.json)"
done
calm 40; cells webkit-phone wp-fade-x10 "fade · a Sheet bottom appears" --repeat-each=10
cells webkit-phone wp-D "(site|fade|fold|mark|press|still) · "
cells webkit-phone wp-A "(form|glass|exit|routes|round|weight|lift|sheet) · "
log "CHAIN2-DONE load $(sysctl -n vm.loadavg)"
