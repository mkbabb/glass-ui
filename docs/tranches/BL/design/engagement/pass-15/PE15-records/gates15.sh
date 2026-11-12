#!/bin/zsh
# P-E15 part B gates, in the seat's worktree only: build, typecheck, demo:dist:build, vitest --maxWorkers=2; each step's exit and seconds.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p15/PE15/wt; R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-15/PE15-records; T=${1:-gates}
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
echo "# $T $(date '+%F %T') · src tree $(th) · load $(sysctl -n vm.loadavg) · df $(df -h /System/Volumes/Data | tail -1 | awk '{print $4}')"
for s in "build:npm run build" "typecheck:npm run typecheck" "demo:npm run demo:dist:build" "vitest:npx vitest run --maxWorkers=2"; do
  n=${s%%:*}; c=${s#*:}; t0=$(date +%s); eval $c > $R/logs/$T-$n.log 2>&1; x=$?
  echo "$n exit $x ($(( $(date +%s) - t0 )) s) · load $(sysctl -n vm.loadavg) · $(grep -E 'Tests +[0-9]|Test Files' $R/logs/$T-$n.log | tr '\n' ' ' | cut -c1-160)"
done
echo "# $T end $(date '+%F %T')"
