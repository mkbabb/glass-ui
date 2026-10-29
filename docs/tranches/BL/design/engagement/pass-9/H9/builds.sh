#!/bin/zsh
# H9 (D5 pass 9) builds, each in its own guarded call, in the H9 worktree only (harness build.mjs, the harness's own app
# after H9's scene edit: the presented Dialog's `&slider=1` Slider):
#   head       the base (HEAD; src = v10.1.0)
#   cand8      HEAD + pass-8/P-E8.patch (5dc4d930: the pass-8 candidate, the promoted construction; the plant of record for
#              H9's new cells under O-103f, which makes it the probe of pass 9)
#   probe      cand8 + pass-8/P-E8-inplace-loupe.patch (fdccd7f4: in place under every modality, no per-frame read)
#   probeloop  probe + pass-8/E8/probe-loop-variant.patch (a6060049: the in-place construction with the per-frame read kept,
#              O-103f's candidate shape for P-E9)
# The tree is cut back to HEAD after the last build and its diff checked empty.
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
H=$P/harness; R=$P/pass-9/H9
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p9/H9/wt
OUT=$WT/.h9out; G=$HOME/.claude/guard/guarded
CAND=$P/pass-8/P-E8.patch; PROBE=$P/pass-8/P-E8-inplace-loupe.patch; LOOP=$P/pass-8/E8/probe-loop-variant.patch
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $G --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-140)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · scene app $(shasum $H/scenes/App.vue | cut -c1-12)"
echo "# patches: cand $(shasum $CAND | cut -c1-12) probe $(shasum $PROBE | cut -c1-12) loop $(shasum $LOOP | cut -c1-12)"
b head
git apply $CAND || exit 3; b cand8
git apply $PROBE || exit 4; b probe
git apply $LOOP || exit 5; b probeloop
git apply -R $LOOP && git apply -R $PROBE && git apply -R $CAND || exit 6
echo "after revert: src tree $(th) · git diff HEAD lines $(git diff HEAD | wc -l | tr -d ' ')"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
