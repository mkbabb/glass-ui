#!/bin/zsh
# C-E13-complete builds (D5 pass 13, wave c3): E13c/builds.sh's method in this seat's worktree only, the whole set in ONE guarded call
# (the caller wraps it; REGISTRY §P12-7 item 11). Sources restored after each build and the src tree read back.
#   cand13 = HEAD + pass-13/P-E13.patch; cand12 = + pass-12/P-E12.patch; cand11 = + pass-11/P-E11.patch; cand8 = + pass-8/P-E8.patch;
#   plant-<p> = cand13 + E13/plants.py <p> (level child stale noown typedom reachzero), unchanged; plant-loop = cand13 + plants13c.py loop.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/C-E13c2
WT=$G/.claude/worktrees/bl/D5/p14/C-E13c2/wt; O=$WT/.ce13out
E13P=$P/pass-13/P-E13.patch; E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; E8P=$P/pass-8/P-E8.patch; PL=$P/pass-13/E13/plants.py; PL2=$R/plants13c.py
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-100)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E13 $(shasum $E13P | cut -c1-12) · P-E12 $(shasum $E12P | cut -c1-12) · P-E11 $(shasum $E11P | cut -c1-12) · P-E8 $(shasum $E8P | cut -c1-12) · plants.py $(shasum $PL | cut -c1-12) · plants13c.py $(shasum $PL2 | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "HEAD src tree $C"
E=src/composables/motion/engage
for x in "$@"; do
  case $x in
    cand13) git apply $E13P && echo "cand13 src tree $(th)" && b cand13; git apply -R $E13P ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th)" && b cand11; git apply -R $E11P ;;
    cand8)  git apply $E8P && echo "cand8 src tree $(th)" && b cand8; git apply -R $E8P ;;
    level|child|stale|noown|typedom|reachzero|loop)
      S=$PL; [[ $x == loop ]] && S=$PL2
      git apply $E13P && mkdir -p $O/keep && cp $E/stage.ts $E/own.ts $E/settle.ts $O/keep/ && python3 -I $S $WT $x && echo "plant $x src tree $(th)" && b plant-$x
      cp $O/keep/stage.ts $O/keep/own.ts $O/keep/settle.ts $E/; echo "  restored to cand13: $(th)"; git apply -R $E13P ;;
    *) echo "unknown build $x"; exit 2 ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; git status --short | head; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
