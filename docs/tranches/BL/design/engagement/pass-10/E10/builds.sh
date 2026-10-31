#!/bin/zsh
# P-E10 builds, each in its own guarded call (build1.sh), in the seat's worktree only: cand10, then every plant (plants.py), the sources restored after each; the tree read back at the end.
G=/Users/mkbabb/Programming/glass-ui; R=$G/docs/tranches/BL/design/engagement/pass-10/E10; WT=$G/.claude/worktrees/bl/D5/p10/E10/wt; cd $WT
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · base $(git rev-parse --short HEAD)"
C=$(th); echo "candidate src tree $C"
$R/build1.sh cand10
mkdir -p .e10out; cp $ST .e10out/stage.ts; cp $CSS .e10out/styles.css
for p in "$@"; do
  python3 $R/plants.py $WT $p && $R/build1.sh plant-$p
  cp .e10out/stage.ts $ST; cp .e10out/styles.css $CSS
done
echo "after plants: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
