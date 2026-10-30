#!/bin/zsh
# H10 (D5 pass 10) builds, each in its own guarded call, in the H10 worktree only (harness build.mjs, the harness's own app):
#   head          the base (HEAD; src = v10.1.0)
#   cand9         HEAD + pass-9/P-E9.patch (0cbe2b6d: the candidate of pass 9, the plant of record for every new cell)
#   plant-cause   cand9 with the correction in the `translate` property (C-E9's plant-cause: the shape P-E10 is asked to read
#                 in both engines; here it only shows E-13's clock cell can pass on library bytes)
#   plant-noread  cand9 with the per-frame read deleted (pass-9/E9/plants.py noread: the stale-place cells' plant, for the
#                 two pointer·reveal cells' cause, REGISTRY §P9-7 item 8)
# The tree is cut back to HEAD after the last build and its diff checked empty.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-10/H10
WT=$G/.claude/worktrees/bl/D5/p10/H10/wt; OUT=$WT/.h10out; GD=$HOME/.claude/guard/guarded
CSS=$(cd $WT && git ls-files 'src/components/*slider/styles.css' | head -1)
ST=src/composables/motion/engage/stage.ts
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12) · P-E9 $(shasum $P/pass-9/P-E9.patch | cut -c1-12)"
b head
git apply $P/pass-9/P-E9.patch || exit 2
C9=$(th); echo "candidate src tree $C9 (P-E9 recorded 82c3f35a7110)"
b cand9
cp $ST $OUT/stage.cand9.ts; cp $CSS $OUT/styles.cand9.css
python3 - "$CSS" <<'PY' || exit 3
import sys
p = sys.argv[1]; s = open(p).read()
old_t = "    translate: -50% 0;\n    scale: 0.13;\n    transform: translate(var(--lens-dx, 0px), var(--lens-dy, 0px)) scale(var(--lens-sx, 1), var(--lens-sy, 1));\n"
new_t = "    translate: calc(-50% + var(--lens-dx, 0px)) var(--lens-dy, 0px);\n    scale: 0.13;\n    transform: scale(var(--lens-sx, 1), var(--lens-sy, 1));\n"
assert s.count(old_t) == 1
open(p, "w").write(s.replace(old_t, new_t)); print("plant cause")
PY
b plant-cause
cp $OUT/styles.cand9.css $CSS
python3 $P/pass-9/E9/plants.py $WT noread && b plant-noread; cp $OUT/stage.cand9.ts $ST
echo "after plants: src tree $(th) (expect $C9)"
git apply -R $P/pass-9/P-E9.patch || exit 4
echo "at HEAD: diff lines $(git diff HEAD | wc -l | tr -d ' ') untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
