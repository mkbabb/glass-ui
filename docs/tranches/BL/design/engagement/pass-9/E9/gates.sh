#!/bin/zsh
# P-E9 gates in the seat's worktree, one heavy run at a time, each in its own guarded call:
# build, typecheck, demo:dist:build, vitest (--maxWorkers=2). `gates.sh <tag>` writes logs/gate-<step>-<tag>.log.
E9=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/E9
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p9/E9/wt
G=$HOME/.claude/guard/guarded; T=$1
cd $WT
g() { local n=$1; shift; { echo "# $n · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } > $E9/logs/gate-$n-$T.log 2>&1; echo "$n: $(tail -1 $E9/logs/gate-$n-$T.log)"; }
g build $G --timeout 30 -- npm run build
g typecheck $G --light --timeout 20 -- npm run typecheck
g demo-dist $G --timeout 45 -- npm run demo:dist:build
g vitest $G --timeout 60 -- npx vitest run --maxWorkers=2
