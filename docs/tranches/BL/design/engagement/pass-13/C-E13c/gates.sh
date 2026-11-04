#!/bin/zsh
# C-E13-complete gates on cand13 in this seat's worktree (HEAD + P-E13.patch applied for the run, reversed after, the src tree read back):
# build, typecheck, demo:dist:build, vitest --maxWorkers=2. ONE guarded call wraps the whole script (the caller); one heavy run at a time.
G=/Users/mkbabb/Programming/glass-ui; R=$G/docs/tranches/BL/design/engagement/pass-13/C-E13c; E13P=$G/docs/tranches/BL/design/engagement/pass-13/P-E13.patch
WT=$G/.claude/worktrees/bl/D5/p13c/C-E13c/wt; cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
git apply $E13P || exit 4
echo "gates on src tree $(th) · P-E13 $(shasum $E13P | cut -c1-12) · HEAD $(git rev-parse --short HEAD)"
g() { local n=$1; shift; { echo "# $n · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } > $R/logs/gate-$n.log 2>&1; echo "$n: $(tail -1 $R/logs/gate-$n.log)"; }
g build npm run build
g typecheck npm run typecheck
g demo-dist npm run demo:dist:build
g vitest npx vitest run --maxWorkers=2
git apply -R $E13P; echo "after gates src tree $(th) (expect da39a3ee5e6b)"
