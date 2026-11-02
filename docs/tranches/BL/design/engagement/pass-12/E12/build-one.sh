#!/bin/zsh
# P-E12: one plant build as a chain stage (run-e12.sh `build-<plant>`, inside the chain's own guarded call, so no build overlaps a
# browser stage): the edit, the harness's build.mjs, the sources restored and the src tree read back.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-12/E12
WT=$G/.claude/worktrees/bl/D5/p12/E12/wt; O=$WT/.e12out; x=$1; cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
C=$(th); SRC=(src/composables/motion/engage/stage.ts src/composables/motion/engage/settle.ts)
for f in $SRC; do mkdir -p $O/save/${f:h}; cp $f $O/save/$f; done
python3 -I $R/plants.py $WT $x && node $H/build.mjs $WT --label plant-$x --out $O > $R/logs/build-plant-$x.log 2>&1; echo "plant-$x build exit $? · src tree $(th)"
for f in $SRC; do cp $O/save/$f $f; done
echo "after: src tree $(th) (expect $C)"
