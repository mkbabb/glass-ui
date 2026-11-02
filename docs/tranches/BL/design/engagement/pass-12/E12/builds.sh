#!/bin/zsh
# P-E12 builds (D5 pass 12), each in its own guarded call, in this seat's worktree only (the harness's build.mjs, its own app).
# The worktree holds HEAD + pass-12/P-E12.patch (cand12). Plants: one edit each to cand12 (plants.py), the sources restored after each
# and the src tree read back. cand11 = HEAD + pass-11/P-E11.patch and cand8 = HEAD + pass-8/P-E8.patch (the cost bar), built by
# reversing P-E12 and applying the other patch, then restoring P-E12; the tree is read back after each.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-12/E12
WT=$G/.claude/worktrees/bl/D5/p12/E12/wt; O=$WT/.e12out; GD=$HOME/.claude/guard/guarded
E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; E8P=$P/pass-8/P-E8.patch
cd $WT || exit 1; mkdir -p $O/save $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-100)"; }
SRC=(src/composables/motion/engage/stage.ts src/composables/motion/engage/settle.ts src/composables/motion/engage/useEngage.ts src/styles/glass/engage-stage.css)
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E12.patch $(shasum $E12P | cut -c1-12)"
C=$(th); echo "candidate src tree $C"
for x in "$@"; do
  case $x in
    cand12) b cand12 ;;
    cand11|cand8) Q=$E11P; [[ $x == cand8 ]] && Q=$E8P
      git apply -R $E12P && git apply $Q && echo "$x src tree $(th)" && b $x; git apply -R $Q && git apply $E12P ;;
    *) for f in $SRC; do mkdir -p $O/save/${f:h}; cp $f $O/save/$f; done
       python3 -I $R/plants.py $WT $x && b plant-$x
       for f in $SRC; do cp $O/save/$f $f; done ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
