#!/bin/zsh
# P-E14 part B builds (D5 pass 14, wave 3): H14/builds.sh's method in this seat's worktree only, the whole set in ONE guarded call.
# The worktree starts at cand14 (HEAD + pass-14/P-E14.patch) and is reversed to HEAD first; each build applies its patch, builds, reads the
# src tree back and reverses. cand14 = HEAD + P-E14.patch; cand13/12/11/8 = HEAD + pass-13/12/11/8's patch; plant-<p> = cand14 + plants14.py <p>.
# At the end the worktree is put back at cand14.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-14/PE14-records
WT=$G/.claude/worktrees/bl/D5/p14/PE14/wt; O=$WT/.pe14out
E14P=$P/pass-14/P-E14.patch; E13P=$P/pass-13/P-E13.patch; E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; E8P=$P/pass-8/P-E8.patch; PL=$R/plants14.py
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-110)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E14 $(shasum $E14P | cut -c1-12) · P-E13 $(shasum $E13P | cut -c1-12) · P-E12 $(shasum $E12P | cut -c1-12) · P-E11 $(shasum $E11P | cut -c1-12) · P-E8 $(shasum $E8P | cut -c1-12) · plants14.py $(shasum $PL | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
echo "cand14 as left: src tree $(th)"
git apply -R $E14P || { echo "REVERSE FAILED"; exit 3; }
C=$(th); echo "HEAD src tree $C"
E=src/composables/motion/engage; Y=src/styles/utilities
for x in "$@"; do
  case $x in
    cand14) git apply $E14P && echo "cand14 src tree $(th)" && b cand14; git apply -R $E14P ;;
    cand13) git apply $E13P && echo "cand13 src tree $(th)" && b cand13; git apply -R $E13P ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th)" && b cand11; git apply -R $E11P ;;
    cand8)  git apply $E8P && echo "cand8 src tree $(th)" && b cand8; git apply -R $E8P ;;
    *) git apply $E14P && mkdir -p $O/keep && cp $E/stage.ts $E/settle.ts $Y/engage.css $O/keep/ && python3 -I $PL $WT $x && echo "plant $x src tree $(th)" && b plant-$x
       cp $O/keep/stage.ts $O/keep/settle.ts $E/; cp $O/keep/engage.css $Y/; echo "  restored to cand14: $(th)"; git apply -R $E14P ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; git status --short | head; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
git apply $E14P && echo "worktree back at cand14: src tree $(th)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
