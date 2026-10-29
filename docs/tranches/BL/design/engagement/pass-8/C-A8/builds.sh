#!/bin/zsh
# C-A8 builds (D5 pass 8, the fresh critic), each in its own guarded call, in C-A8's worktree only (harness build.mjs).
#   cand8          HEAD + pass-8/P-E8.patch (the candidate; the worktree's resting tree)
#   probe          cand8 + pass-8/P-E8-inplace-loupe.patch (the measured probe, not scored)
#   plant-cand7    HEAD + pass-7/P-E7.patch (the pass-7 construction: CK-20's and CK-25's plant)
#   plant-loupe6   cand8 + E8/plants.py loupe6 (E-13 k max's plant)
#   plant-chipfaint cand8 + C-A7/plants.py chipfaint (CK-27: the chip cell must read paint)
#   plant-crest    cand8 + A7/plants.py crest (CK-12: the pass-6 crest figures)
#   plant-prmY     cand8 + A7/plants.py prmY (P-1/CK-10: the one reduce mechanism removed)
#   plant-nomask   cand8 with writePaint's masks not written (C-A8's own: the feather cell must see the candidate's mask)
#   dlg-cand8, dlg-probe   the same bytes with C-A8's probe fork of the scene app (a Slider inside the presented Dialog)
# The tree is cut back to cand8 after each and its patch hash compared.
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
C=$P/pass-8/C-A8; H=$P/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/C-A8/wt
OUT=$WT/.ca8out; G=$HOME/.claude/guard/guarded
CAND=$P/pass-8/P-E8.patch; PROBE=$P/pass-8/P-E8-inplace-loupe.patch
cd $WT || exit 1
th() { { git diff --binary HEAD; for u in $(git ls-files --others --exclude-standard | grep -v -E '^(\.ca8out|\.e8plant|\.c7plant|\.a7plant|node_modules|tests-visual/node_modules)(/|$)' | LC_ALL=C sort); do echo "$u"; cat "$u"; done; } | shasum | cut -c1-12; }
b() { $G --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT ${@:2} > $C/logs/build-$1.log 2>&1; echo "$1 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $C/logs/build-$1.log | cut -c1-160)"; }
chk() { local T=$(th); echo "after $1 revert: tree $T $([[ $T == $T0 ]] && echo '= cand8' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · cand $(shasum $CAND | cut -c1-12) probe $(shasum $PROBE | cut -c1-12) · HEAD $(git rev-parse --short HEAD)"
T0=$(th); echo "cand8 tree (git diff HEAD) $T0"
b cand8
b dlg-cand8 --app $C/probe/App-dlg.vue
git apply $PROBE || exit 3
b probe
b dlg-probe --app $C/probe/App-dlg.vue
git apply -R $PROBE || exit 4; chk probe
for spec in "loupe6:$P/pass-8/E8/plants.py:.e8plant" "chipfaint:$P/pass-7/C-A7/plants.py:.c7plant" "crest:$P/pass-7/A7/plants.py:.a7plant" "prmY:$P/pass-7/A7/plants.py:.a7plant"; do
  n=${spec%%:*}; rest=${spec#*:}; py=${rest%%:*}; keep=${rest#*:}
  python3 -I $py $n apply $WT || exit 5
  b plant-$n
  python3 -I $py $n revert $WT; rm -rf $WT/$keep
  chk $n
done
# nomask: writePaint computes the masks and writes none (a byte copy restores it; no git write)
cp $WT/src/composables/motion/engage/stage.ts $OUT/stage.ts.keep
python3 -I - $WT <<'EOF' || exit 6
import sys; p=sys.argv[1]+"/src/composables/motion/engage/stage.ts"; s=open(p).read()
a="    const mask: [string, string][] = masks.length\n"; assert s.count(a)==1
open(p,"w").write(s.replace(a,"    const mask: [string, string][] = masks.length && false // PLANT nomask\n"))
EOF
b plant-nomask
cp $OUT/stage.ts.keep $WT/src/composables/motion/engage/stage.ts; chk nomask
git apply -R $CAND || exit 7
git apply $P/pass-7/P-E7.patch || exit 8
b plant-cand7
git apply -R $P/pass-7/P-E7.patch && git apply $CAND || exit 10
chk cand7
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
