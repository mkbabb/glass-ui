#!/bin/zsh
# C-A9 builds (D5 pass 9, the fresh critic), each harness build.mjs in its own guarded call, in C-A9's worktree only.
#   cand9   HEAD + pass-9/P-E9.patch (the candidate; the worktree's resting tree)
#   plant-<x>  cand9 + scripts/plants.py <x>, for x in noread ancscale nobelow loop glidepx crest prmY
#   probe9  HEAD + pass-9/P-E9-probe.patch (the promoted construction (c) + the shared loupe items; read, not scored)
# The tree is checked back to cand9 after each plant (hash of `git diff HEAD` + untracked src).
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement; C=$P/pass-9/C-A9; H=$P/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p9/C-A9/wt; OUT=$WT/.ca9out; G=$HOME/.claude/guard/guarded
CAND=$P/pass-9/P-E9.patch; PROBE=$P/pass-9/P-E9-probe.patch
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $G --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $C/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $C/logs/build-$1.log | cut -c1-140)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · cand $(shasum $CAND | cut -c1-12) probe $(shasum $PROBE | cut -c1-12) · scene app $(shasum $H/scenes/App.vue | cut -c1-12)"
T0=$(th); echo "cand9 src tree $T0 (P-E9 recorded 82c3f35a7110)"
b cand9
for x in noread ancscale nobelow loop glidepx crest prmY; do
  python3 -I $C/scripts/plants.py $x apply $WT || exit 5
  b plant-$x
  python3 -I $C/scripts/plants.py $x revert $WT; rmdir $WT/.ca9plant 2>/dev/null
  T=$(th); echo "after $x revert: $T $([[ $T == $T0 ]] && echo '= cand9' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9
done
git apply -R $CAND || exit 3
echo "at HEAD: git diff lines $(git diff HEAD | wc -l | tr -d ' ') · untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
git apply $PROBE || exit 4
b probe9
git apply -R $PROBE || exit 6
git apply $CAND || exit 7
T=$(th); echo "back at the candidate: $T $([[ $T == $T0 ]] && echo '= cand9' || echo DIFFERS)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
