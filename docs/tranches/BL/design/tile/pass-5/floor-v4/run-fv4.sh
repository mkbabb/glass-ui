#!/bin/zsh
# FLOOR-V4 seat driver (D4 pass 5). One stage per call; every log's first and last line carry the wall clock and the
# 1/5/15-min load. Every build, typecheck, unit run, probe and browser run goes through the machine guard; browser runs
# never take --light; every run that may start Playwright WebKit also holds `guarded --exclusive webkit` (one hold for
# the whole WebKit stage). Serial: one heavy run at a time. The worktree and bulky outputs live in
# .claude/worktrees/bl/D4/p5/floor4 (scratch); the logs FLOOR-V4.md cites live in logs/ beside this file.
#   run-fv4.sh state <fv4|dp|f>         the worktree's tree at HEAD + floor v4 [+ the rebased route patch]
#   run-fv4.sh tsc <tag>                vue-tsc, app and test projects, on the current state
#   run-fv4.sh unit <tag>               the whole suite through H5's unit.mjs (one driver per worktree, maxWorkers 2)
#   run-fv4.sh unit-plants              FV4-1's sheet case against its mutations (floor v4 state only)
#   run-fv4.sh libbuild <tag>           the library's own vite build
#   run-fv4.sh build <tag>              <tag>-src (the H5 pass-5 route dir for dp/f), <tag>-atk-src, <tag>-atk-src-dev
#   run-fv4.sh reads <tag> <engine>     CANON (clean + 9), FACT (src, src-dev), ATTACK, CORNER, REPORT (routes), T-2, T-3
#   run-fv4.sh webkit-all               every Playwright WebKit read (reads fv4/dp/f + the scope probe) in ONE hold
#   run-fv4.sh probe <engine>           probes/scope-bound.mjs, every form
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/floor4
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P5=$T/pass-5; FV=$P5/floor-v4; L=$FV/logs; R5=$P5/H5/routes
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
glog() { # glog <name> [guard opts] -- <cmd>
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
patchOf() { [[ $1 == dp ]] && echo $P5/D4-Dp.patch || echo $P5/D4-F.patch; }
routeOf() { [[ $1 == dp ]] && echo $R5/D4-Dp || echo $R5/D4-F; }

case $1 in
  state)
    F=$L/state-$2.log; stamp > $F
    { cd $WT
      for x in dp f; do git apply --check -R $(patchOf $x) 2>/dev/null && git apply -R $(patchOf $x) && echo "reverse-applied $x"; done
      git apply --check -R $P5/floor-v4.patch && echo "floor v4 in place ($(shasum $P5/floor-v4.patch | cut -c1-8))"
      [[ $2 != fv4 ]] && git apply --check $(patchOf $2) && git apply $(patchOf $2) && echo "applied $2 ($(shasum $(patchOf $2) | cut -c1-8))"
      echo "git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  tsc)
    glog tsc-$2 --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  unit)
    glog unit-$2 --timeout 45 -- node $HN/unit.mjs $WT --label fv4-$2 --out $O ;;
  unit-plants)
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; SH=src/components/toggle-group/styles.css
    P() { local n=$1; shift; glog unit-plant-$n --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean -t "the sheet" $TG
    P pin-unbounded --sub "$SH|    @scope (.toggle-group__item) to (.toggle-group) {|    @scope (.toggle-group__item) {" -t "the sheet" $TG
    P pin-option-only --sub "$SH|        :scope,
        :scope * {|        :scope {" -t "the sheet" $TG
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|" -t "the sheet" $TG ;;
  libbuild)
    glog libbuild-$2 --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  build)
    x=$2; rt=(); [[ $x != fv4 ]] && rt=(--route $(routeOf $x))
    glog build-$x-src --timeout 20 -- node $HN/build.mjs $WT --label $x-src --out $O --flavor src $rt
    for f in src src-dev; do glog build-$x-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label $x-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  reads-inner) # $2 tag, $3 engine: the reads, serial, one process at a time
    x=$2; e=$3; set -x
    node $HN/canon.mjs --build $B/$x-src --out $O --engine $e
    for p in a s h layer foreign unlayered cq lowlayer cqoff; do node $HN/canon.mjs --build $B/$x-src --out $O/plant-$p --engine $e --plant $p; done
    node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
    node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
    [[ $x != fv4 ]] && node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
    node $HN/t2-one-line-stadium.mjs --build $B/$x-src --out $O --engine $e
    node $HN/t3-selected-separates.mjs --build $B/$x-src --out $O --engine $e
    true ;;
  reads)
    x=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog reads-$x-$e $ex --timeout 90 -- zsh $0 reads-inner $x $e ;;
  probe)
    e=$2; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog probe-scope-bound-$e $ex --timeout 10 -- node $FV/probes/scope-bound.mjs --engine $e --form all ;;
  webkit-all-inner)
    log() { local F=$L/$1.log; shift; stamp > $F; echo "in one --exclusive webkit hold" >> $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
    log probe-scope-bound-webkit node $FV/probes/scope-bound.mjs --engine webkit --form all
    for x in fv4 dp f; do log reads-$x-webkit zsh $0 reads-inner $x webkit; done ;;
  webkit-all)
    stamp > $L/webkit-all.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 webkit-all-inner >> $L/webkit-all.log 2>&1
    echo "exit $? · $(stamp)" >> $L/webkit-all.log ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
