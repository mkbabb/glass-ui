#!/bin/zsh
# C-A13-complete gates on cand13 in this seat's worktree (left at cand13 by builds.sh), inside ONE guarded call (the caller wraps it).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-A13c; WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p13c/C-A13c/wt; cd $WT
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
echo "# gates on src tree $(th) (expect 30f51077c3ec)"
g() { local n=$1; shift; { echo "# $n · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } > $R/logs/gate-$n.log 2>&1; echo "$n: $(tail -1 $R/logs/gate-$n.log)"; }
g build npm run build
g typecheck npm run typecheck
g demo-dist npm run demo:dist:build
g vitest npx vitest run --maxWorkers=2
