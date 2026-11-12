#!/bin/zsh
# P-E15 part B builds (D5 pass 15, wave 3): H15/builds.sh's method in this seat's worktree only, the whole set in ONE guarded call.
# The worktree starts at cand15 (base eb845639f + pass-15/P-E15.patch, as mkpatch.sh writes it) and is reversed to the base first; each
# build applies its patch, builds, reads the src tree back (th(), the tree form every pass-13..15 seat reads) and reverses.
#   cand15 = base + P-E15.patch; cand14/13/12/11/8 = base + pass-14/13/12/11/8's patch; plant-<p> = cand15 + plants15.py <p>.
# At the end the worktree is put back at cand15. Build logs are named build-<label>${BTAG}.log under this seat's own logs/ (class 2).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-15/PE15-records
WT=$G/.claude/worktrees/bl/D5/p15/PE15/wt; O=$WT/.pe15out
E15P=$P/pass-15/P-E15.patch; E14P=$P/pass-14/P-E14.patch; E13P=$P/pass-13/P-E13.patch; E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; E8P=$P/pass-8/P-E8.patch; PL=$R/plants15.py
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1${BTAG}.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1${BTAG}.log | cut -c1-110)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E15 $(shasum $E15P | cut -c1-12) · P-E14 $(shasum $E14P | cut -c1-12) · P-E13 $(shasum $E13P | cut -c1-12) · P-E12 $(shasum $E12P | cut -c1-12) · P-E11 $(shasum $E11P | cut -c1-12) · P-E8 $(shasum $E8P | cut -c1-12) · plants15.py $(shasum $PL | cut -c1-12) · df $(df -h /System/Volumes/Data | tail -1 | awk '{print $4}')"
echo "cand15 as left: src tree $(th)"
git apply -R $E15P || { echo "REVERSE FAILED"; exit 3; }
C=$(th); echo "base src tree $C (expect da39a3ee5e6b)"
E=src/composables/motion/engage; Y=src/styles/utilities
for x in "$@"; do
  case $x in
    cand15) git apply $E15P && echo "cand15 src tree $(th)" && b cand15; git apply -R $E15P ;;
    cand14) git apply $E14P && echo "cand14 src tree $(th) (expect 971802d6034f)" && b cand14; git apply -R $E14P ;;
    cand13) git apply $E13P && echo "cand13 src tree $(th) (expect 30f51077c3ec)" && b cand13; git apply -R $E13P ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th) (expect 61f7b80ac552)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th) (expect 6317ad295579)" && b cand11; git apply -R $E11P ;;
    cand8)  git apply $E8P && echo "cand8 src tree $(th) (expect 92f38f424df2)" && b cand8; git apply -R $E8P ;;
    *) git apply $E15P && mkdir -p $O/keep && cp $E/stage.ts $E/settle.ts $Y/engage.css $O/keep/ && python3 -I $PL $WT $x && echo "plant $x src tree $(th)" && b plant-$x
       cp $O/keep/stage.ts $O/keep/settle.ts $E/; cp $O/keep/engage.css $Y/; echo "  restored to cand15: $(th)"; git apply -R $E15P ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; git status --short | head; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
git apply $E15P && echo "worktree back at cand15: src tree $(th)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
