#!/bin/zsh
# H12 builds (D5 pass 12), each in its own guarded call, in this seat's worktree only (harness build.mjs, the harness's own app).
# The worktree holds HEAD + pass-11/P-E11.patch (cand11). head = HEAD (the patch reversed for one build); cand11; the controls and
# plants, each one edit (or two) to cand11 from the critics' own scripts, run unchanged: C-E11's ce11-plants.py (waapicure, unitcure,
# roomframe, hostzoom) and C-A11's ca11-plants.py (glideframe, flowone, roomnoframe, listcure). bothcure = waapicure + unitcure (the
# whole CK-21 family's measured shapes on one build). The sources are restored after each and the src tree read back.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-12/H12
WT=$G/.claude/worktrees/bl/D5/p12/H12/wt; O=$WT/.h12out; GD=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts; SE=src/composables/motion/engage/settle.ts
CE=$P/pass-11/C-E11/scripts/ce11-plants.py; CA=$P/pass-11/C-A11/r2/scripts/ca11-plants.py; E11P=$P/pass-11/P-E11.patch
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-100)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E11.patch $(shasum $E11P | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "candidate src tree $C (P-E11 records 6317ad295579)"
for x in "$@"; do
  case $x in
    head) git apply -R $E11P && echo "head src tree $(th)" && b head; git apply $E11P ;;
    cand11) b cand11 ;;
    waapicure|unitcure|roomframe|hostzoom) cp $ST $O/stage.ts; cp $SE $O/settle.ts; python3 -I $CE $WT $x && b plant-$x; cp $O/stage.ts $ST; cp $O/settle.ts $SE ;;
    glideframe|flowone|roomnoframe|listcure) cp $ST $O/stage.ts; python3 -I $CA $WT $x && b plant-$x; cp $O/stage.ts $ST ;;
    bothcure) cp $ST $O/stage.ts; cp $SE $O/settle.ts; python3 -I $CE $WT waapicure && python3 -I $CE $WT unitcure && b plant-bothcure; cp $O/stage.ts $ST; cp $O/settle.ts $SE ;;
    *) echo "unknown build $x"; exit 2 ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
