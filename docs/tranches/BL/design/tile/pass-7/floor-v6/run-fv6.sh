#!/bin/zsh
# FLOOR-V6 seat driver (D4 pass 7). One stage per call; every log's first and last line carry the wall clock and the
# 1/5/15-min load. Every build, typecheck, unit run, probe and browser run goes through the machine guard; browser runs
# never take --light; every run that may start Playwright WebKit also holds `guarded --exclusive webkit`. Serial: one
# heavy run at a time. The worktree and bulky outputs live in .claude/worktrees/bl/D4/p7/floor6 (scratch, removed at the
# seat's close); the logs FLOOR-V6.md cites live in logs/ beside this file. Q-13 is ruled D′ (INBOUND O-103): one route.
#   run-fv6.sh patch                  write ../floor-v6.patch from the worktree (state fv6 only; pass 6's mkpatch.py, no git write)
#   run-fv6.sh check                  from any state: reverse to HEAD (diff empty?), `git apply --check` floor v6 on HEAD,
#                                     apply, `git apply --check` ../D4-Dp.patch on HEAD + floor v6, then back to state dp
#   run-fv6.sh state <fv6|dp>         the worktree at HEAD + floor v6 [+ the rebased D′]
#   run-fv6.sh sheet <x>              SHEET (H7-1 writers, H7-4 wrap; engine-free) on the worktree as it stands
#   run-fv6.sh tsc <x> | unit <x> | libbuild <x> | unit-plants
#   run-fv6.sh build <x>              <x>-src (dp: the pass-7 route dir), <x>-atk-src, <x>-atk-src-dev; dp also <x>-dist,
#                                     <x>-dist-dev (after libbuild)
#   run-fv6.sh plant <x>              B-1's foreign writer appended to base.css: SHEET, the attack build <x>-plant-atk-src,
#                                     restored, diff checked equal (H7's `plant` stage)
#   run-fv6.sh reads <x> <engine>     CANON (clean + 9; dp), FACT (src, src-dev, the plant build), ATTACK, CORNER, REPORT (dp),
#                                     T-2, T-3
#   run-fv6.sh battery <x> <engine>   T-1, T-4, T-5, T-6, T-7, W-B, W-E on <x>-src; W-E and ATTACK on dist and dist-dev (Q-5)
#   run-fv6.sh probe <x> <engine>     H7's probes/b3-mobile.mjs on <x>-atk-src (the trigger's inner layout; info)
#   run-fv6.sh wk <tag> <stage:x …>   ONE --exclusive webkit hold running several inner stages, each to its own log
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/floor6
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P6=$T/pass-6; P7=$T/pass-7; FD=$P7/floor-v6; L=$FD/logs; R7=$P7/H7/routes/D4-Dp
FV6=$P7/floor-v6.patch; DP=$P7/D4-Dp.patch; MK=$P6/floor-v5/mkpatch.py
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
glog() { # glog <name> [guard opts] -- <cmd>
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
plog() { local F=$L/$1.log; shift; stamp > $F; { "$@" } >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc; }
routeArgs() { [[ $1 == dp ]] && echo "--route $R7"; }

case $1 in
  patch)
    plog patch zsh -c "cd $WT; python3 $MK head $WT $FV6; shasum $FV6; git apply --numstat $FV6 | awk '{a+=\$1; d+=\$2; n++} END {print n\" files, +\"a\" / -\"d}'" ;;
  check)
    plog check zsh -c "
      cd $WT; set -x
      git apply -R --check $DP 2>/dev/null && git apply -R $DP
      git apply -R --check $FV6 && git apply -R $FV6
      echo \"HEAD $(git -C $WT rev-parse --short HEAD) tree: git diff HEAD \$(git diff HEAD --binary | wc -c | tr -d ' ') bytes; untracked \$(git status --porcelain | wc -l | tr -d ' ')\"
      git apply --check $FV6 && echo 'floor-v6.patch: apply --check clean on HEAD' && git apply $FV6
      git apply --check $DP && echo 'D4-Dp.patch (pass 7): apply --check clean on HEAD + floor v6' && git apply $DP
      git apply --check -R $P6/D4-Dp.patch 2>&1 | tail -1; true
      shasum $FV6 $DP $P6/floor-v5.patch $P6/D4-Dp.patch
      git apply --numstat $FV6 | awk '{a+=\$1; d+=\$2; n++} END {print \"floor v6: \"n\" files, +\"a\" / -\"d}'
      git apply --numstat $DP | awk '{a+=\$1; d+=\$2; n++} END {print \"D4-Dp: \"n\" files, +\"a\" / -\"d}'
      echo \"state dp · git diff HEAD \$(git diff HEAD --binary | shasum | cut -c1-12)\"" ;;
  state)
    plog state-$2 zsh -c "
      cd $WT
      git apply --check -R $DP 2>/dev/null && git apply -R $DP && echo 'reverse-applied dp'
      git apply --check -R $FV6 && echo \"floor v6 in place (\$(shasum $FV6 | cut -c1-8))\" || exit 3
      [[ $2 == dp ]] && git apply --check $DP && git apply $DP && echo \"applied dp (\$(shasum $DP | cut -c1-8))\"
      echo \"HEAD \$(git rev-parse --short HEAD) · git diff HEAD \$(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths \$(git status --porcelain -- src | wc -l | tr -d ' ')\"" ;;
  sheet)
    glog sheet-$2 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT $(routeArgs $2) --out $O ;;
  tsc)
    glog tsc-$2 --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  unit)
    glog unit-$2 --timeout 45 -- node $HN/unit.mjs $WT --label fv6-$2 --out $O ;;
  unit-plants)
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts
    P() { local n=$1; shift; glog unit-plant-$n --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean -t "floor v6" $TG
    P foreign-writer --sub "src/styles/utilities/base.css|@property --selection-tile {|@layer components { .card > .toggle-group { --selection-tile: flush; } }
@property --selection-tile {" -t "floor v6" $TG
    P markup-writer --sub "src/components/toggle-group/ToggleGroup.vue|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        :style=\"{ '--selection-tile': 'plated' }\"" -t "floor v6" $TG
    P second-lane-writer --sub "src/components/toggle-group/styles.css|    @scope (.toggle-group__item) to|    .toggle-group[data-plated] { --selection-tile: plated; }
    @scope (.toggle-group__item) to" -t "floor v6" $TG
    P flush-rule-wide --sub "src/styles/glass/control-surfaces.css|        .control-surface[data-state]:where(.toggle-group__item) {|        .control-surface[data-state] {" -t "floor v6" $TG ;;
  libbuild)
    glog libbuild-$2 --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  build)
    x=$2
    glog build-$x-src --timeout 20 -- node $HN/build.mjs $WT --label $x-src --out $O --flavor src $(routeArgs $x)
    for f in src src-dev; do glog build-$x-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label $x-atk-$f --out $O --flavor $f --route $HN/attack-route; done
    if [[ $x == dp ]]; then for f in dist dist-dev; do glog build-$x-$f --timeout 20 -- node $HN/build.mjs $WT --label $x-$f --out $O --flavor $f --route $R7; done; fi ;;
  plant)
    x=$2; BC=$WT/src/styles/utilities/base.css
    F=$L/plant-$x.log; stamp > $F
    D0=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12); cp $BC $W/base.css.orig
    printf '\n@layer components {\n    .card > .toggle-group {\n        --selection-tile: flush;\n    }\n}\n' >> $BC
    echo "plant crit-foreign-writer appended to base.css; git diff before $D0" >> $F; tail -6 $BC >> $F
    $G --rss-gb 8 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT $(routeArgs $x) --out $O >> $F 2>&1; echo "sheet exit $?" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label $x-plant-atk-src --out $O --flavor src --route $HN/attack-route >> $F 2>&1; echo "build exit $?" >> $F
    cp $W/base.css.orig $BC; rm -f $W/base.css.orig; D1=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    echo "base.css restored; git diff after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  reads-inner) # $2 tag, $3 engine
    x=$2; e=$3; set -x
    if [[ $x == dp ]]; then
      node $HN/canon.mjs --build $B/$x-src --out $O --engine $e
      for p in a s h layer foreign unlayered cq lowlayer cqoff; do node $HN/canon.mjs --build $B/$x-src --out $O/plant-$p --engine $e --plant $p; done
    fi
    node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
    node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    [[ -d $B/$x-plant-atk-src ]] && node $HN/fact-split.mjs --build $B/$x-plant-atk-src --out $O --engine $e
    node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
    [[ $x == dp ]] && node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
    node $HN/t2-one-line-stadium.mjs --build $B/$x-src --out $O --engine $e
    node $HN/t3-selected-separates.mjs --build $B/$x-src --out $O --engine $e
    true ;;
  battery-inner) # $2 tag, $3 engine
    x=$2; e=$3; set -x
    for w in t1-corner-stops t4-ring-whole t5-one-of-n-keys t6-engagement t7-no-consumer-paint wb-choice-card we-one-line; do
      node $HN/$w.mjs --build $B/$x-src --out $O --engine $e
    done
    for f in dist dist-dev; do [[ -d $B/$x-$f ]] && { node $HN/we-one-line.mjs --build $B/$x-$f --out $O --engine $e; node $HN/t2-one-line-stadium.mjs --build $B/$x-$f --out $O --engine $e; }; done
    true ;;
  probe-inner)
    node $P7/H7/probes/b3-mobile.mjs --build $B/$2-atk-src --out $O --engine $3 ;;
  reads|battery|probe)
    st=$1; x=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    nm=$st-$x-$e; [[ $st == probe ]] && nm=probe-b3-$x-$e
    glog $nm $ex --timeout 90 -- zsh $0 $st-inner $x $e ;;
  wk-inner) # $2 hold tag, then "stage:tag" items
    shift 2
    for it in "$@"; do st=${it%%:*}; tg=${it#*:}
      nm=$st-$tg-webkit; [[ $st == probe ]] && nm=probe-b3-$tg-webkit
      F=$L/$nm.log; stamp > $F; echo "in one --exclusive webkit hold" >> $F
      zsh $0 $st-inner $tg webkit >> $F 2>&1
      echo "exit $? · $(stamp)" >> $F
    done ;;
  wk)
    tag=$2; shift 2
    stamp > $L/wk-$tag.log; echo "items: $*" >> $L/wk-$tag.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 wk-inner $tag "$@" >> $L/wk-$tag.log 2>&1
    echo "exit $? · $(stamp)" >> $L/wk-$tag.log ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
