#!/bin/zsh
# P-E10: one harness build of the worktree as it stands, `build1.sh <label>`, printing the src tree hash.
G=/Users/mkbabb/Programming/glass-ui; H=$G/docs/tranches/BL/design/engagement/harness; R=$G/docs/tranches/BL/design/engagement/pass-10/E10
WT=$G/.claude/worktrees/bl/D5/p10/E10/wt; cd $WT
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
$HOME/.claude/guard/guarded --timeout 30 -- node $H/build.mjs $WT --label $1 --out $WT/.e10out > $R/logs/build-$1.log 2>&1
echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"
