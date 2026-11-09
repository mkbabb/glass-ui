#!/bin/zsh
# C-E14 gates (critic reproduction), in the seat's worktree only: build, typecheck, demo:dist:build, vitest --maxWorkers=2. One guarded call wraps this.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p14/C-E14/wt; R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-E14-records
tag=${1:-gates}; cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
echo "# $tag · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · src tree $(th)"
for g in "npm run build" "npm run typecheck" "npm run demo:dist:build" "npx vitest run --maxWorkers=2"; do
  t0=$(date +%s); ${=g} > $R/logs/$tag-${${g// /_}//:/_}.log 2>&1; x=$?
  echo "  $g · exit $x · $(( $(date +%s) - t0 )) s · $(date '+%T') load $(sysctl -n vm.loadavg) · $(grep -E 'Tests |Test Files|error TS|built in|✓ built' $R/logs/$tag-${${g// /_}//:/_}.log | tail -2 | tr '\n' ' ' | cut -c1-200)"
done
echo "# $tag end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · src tree $(th)"
