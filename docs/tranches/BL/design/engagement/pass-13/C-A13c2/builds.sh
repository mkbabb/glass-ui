#!/bin/zsh
# C-A13-complete builds (D5 pass 13, wave c3), the whole set in ONE guarded call (the caller wraps it), in this seat's worktree only, by
# the harness's build.mjs on its own scene app. The sources are restored after each build and the src tree read back (H13c/E13c method).
#   head = HEAD; cand13 = HEAD + pass-13/P-E13.patch; cand12 / cand11 / cand8 = HEAD + pass-12/P-E12 / pass-11/P-E11 / pass-8/P-E8;
#   plant-<p> = cand13 + E13/plants.py <p>, unchanged (level child stale noown typedom reachzero).
# At the end the worktree is left at cand13 (P-E13 applied) so E-7's static arm and every --wt read the candidate's own source.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/C-A13c2
WT=$G/.claude/worktrees/bl/D5/p14/C-A13c2/wt; O=$WT/.ca13out
E13P=$P/pass-13/P-E13.patch; E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; E8P=$P/pass-8/P-E8.patch; PL=$P/pass-13/E13/plants.py
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-90)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E13 $(shasum $E13P | cut -c1-12) · P-E12 $(shasum $E12P | cut -c1-12) · P-E11 $(shasum $E11P | cut -c1-12) · P-E8 $(shasum $E8P | cut -c1-12) · plants.py $(shasum $PL | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "HEAD src tree $C"
E=src/composables/motion/engage
for x in "$@"; do
  case $x in
    head)   b head ;;
    cand13) git apply $E13P && echo "cand13 src tree $(th)" && b cand13; git apply -R $E13P ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th)" && b cand11; git apply -R $E11P ;;
    cand8)  git apply $E8P && echo "cand8 src tree $(th)" && b cand8; git apply -R $E8P ;;
    level|child|stale|noown|typedom|reachzero)
      git apply $E13P && mkdir -p $O/keep && cp $E/stage.ts $E/own.ts $E/settle.ts $O/keep/ && python3 -I $PL $WT $x && echo "plant $x src tree $(th)" && b plant-$x
      cp $O/keep/stage.ts $O/keep/own.ts $O/keep/settle.ts $E/; echo "  restored to cand13: $(th)"; git apply -R $E13P ;;
    *) echo "unknown build $x"; exit 2 ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; git status --short | head; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
git apply $E13P && echo "worktree left at cand13: src tree $(th) (expect 30f51077c3ec)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
