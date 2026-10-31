#!/bin/zsh
# C-E10 gates in the seat's worktree, one heavy run at a time, each in its own guarded call: build, typecheck, demo:dist:build, vitest (--maxWorkers=2).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/C-E10
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p10/C-E10/wt; G=$HOME/.claude/guard/guarded; cd $WT
g() { local n=$1; shift; { echo "# $n · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } > $R/logs/gate-$n.log 2>&1; echo "$n: $(tail -1 $R/logs/gate-$n.log)"; }
g build $G --timeout 30 -- npm run build
g typecheck $G --light --timeout 20 -- npm run typecheck
g demo-dist $G --timeout 45 -- npm run demo:dist:build
g vitest $G --timeout 60 -- npx vitest run --maxWorkers=2
