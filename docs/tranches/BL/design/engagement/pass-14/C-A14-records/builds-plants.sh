#!/bin/zsh
# C-A14 plant builds: PE14-records/plants14.py's 13 plants (read, not changed), each cand14 + one edit set, in this seat's worktree only.
# The worktree is at cand14 (builds.sh leaves it there); the three files a plant edits are kept and restored after each build, and the
# tree is read back to cand14 each time.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-14/C-A14-records
WT=$G/.claude/worktrees/bl/D5/p14/C-A14/wt; O=$WT/.ca14out; PL=$P/pass-14/PE14-records/plants14.py
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
E=src/composables/motion/engage; Y=src/styles/utilities
C=$(th); echo "# $(date '+%F %T') plant builds · plants14.py $(shasum $PL | cut -c1-12) · start tree $C (cand14 971802d6034f)"
[[ $C == 971802d6034f ]] || { echo "NOT AT cand14"; exit 3; }
mkdir -p $O/keep; cp $E/stage.ts $E/settle.ts $Y/engage.css $O/keep/
for x in "$@"; do
  python3 -I $PL $WT $x && echo "plant $x src tree $(th)" && { node $H/build.mjs $WT --label plant-$x --out $O > $R/logs/build-plant-$x.log 2>&1; echo "  plant-$x build exit $? · $(tail -1 $R/logs/build-plant-$x.log | cut -c1-120)"; }
  cp $O/keep/stage.ts $O/keep/settle.ts $E/; cp $O/keep/engage.css $Y/
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "# $(date '+%F %T') plant builds end · tree $(th)"
