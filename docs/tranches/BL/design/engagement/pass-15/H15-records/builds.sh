#!/bin/zsh
# H15 builds (D5 pass 15, wave 2): H14-records/builds.sh's method in this seat's worktree only, the whole set in ONE guarded call (the caller
# wraps it). Sources restored after each build and the src tree read back (th(), the tree form every pass-13..15 seat reads).
#   head = HEAD; cand14 = HEAD + pass-14/P-E14.patch; cand13 = HEAD + pass-13/P-E13.patch; cand12 = + pass-12/P-E12.patch; cand11 = + pass-11/P-E11.patch
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-15/H15-records
WT=$G/.claude/worktrees/bl/D5/p15/H15/wt; O=$WT/.h15out
E14P=$P/pass-14/P-E14.patch; E13P=$P/pass-13/P-E13.patch; E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1${BTAG}.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1${BTAG}.log | cut -c1-100)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E14 $(shasum $E14P | cut -c1-12) · P-E13 $(shasum $E13P | cut -c1-12) · P-E12 $(shasum $E12P | cut -c1-12) · P-E11 $(shasum $E11P | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "HEAD src tree $C"
for x in "$@"; do
  case $x in
    head)   b head ;;
    cand14) git apply $E14P && echo "cand14 src tree $(th) (expect 971802d6034f)" && b cand14; git apply -R $E14P ;;
    cand13) git apply $E13P && echo "cand13 src tree $(th)" && b cand13; git apply -R $E13P ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th)" && b cand11; git apply -R $E11P ;;
    *) echo "unknown build $x"; exit 2 ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; git status --short | head; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
