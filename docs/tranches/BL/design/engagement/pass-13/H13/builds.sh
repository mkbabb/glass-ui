#!/bin/zsh
# H13 builds (D5 pass 13), each in its own guarded call, in this seat's worktree only (the harness's build.mjs, its own app). The worktree
# holds HEAD. head = HEAD; cand12 = HEAD + pass-12/P-E12.patch; cand11 = HEAD + pass-11/P-E11.patch; plant-allkinds = cand12 + C-A12's
# ca12-plants.py `allkinds`, run unchanged. The sources are restored after each and the src tree read back.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/H13
WT=$G/.claude/worktrees/bl/D5/p13/H13/wt; O=$WT/.h13out; GD=$HOME/.claude/guard/guarded
E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; CA=$P/pass-12/C-A12/scripts/ca12-plants.py
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-100)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E12.patch $(shasum $E12P | cut -c1-12) · P-E11.patch $(shasum $E11P | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "HEAD src tree $C"
for x in "$@"; do
  case $x in
    head) b head ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th)" && b cand11; git apply -R $E11P ;;
    allkinds) ST=src/composables/motion/engage/stage.ts; git apply $E12P && cp $ST $O/stage.ts && python3 -I $CA $WT allkinds && echo "allkinds src tree $(th)" && b plant-allkinds; cp $O/stage.ts $ST; git apply -R $E12P ;;
    *) echo "unknown build $x"; exit 2 ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
