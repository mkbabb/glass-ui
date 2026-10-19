#!/bin/zsh
# FLOOR-V5 seat driver (D4 pass 6). One stage per call; every log's first and last line carry the wall clock and the
# 1/5/15-min load. Every build, typecheck, unit run, probe and browser run goes through the machine guard; browser runs
# never take --light; every run that may start Playwright WebKit also holds `guarded --exclusive webkit`. Serial: one
# heavy run at a time. The worktree and bulky outputs live in .claude/worktrees/bl/D4/p6/floor5 (scratch); the logs
# FLOOR-V5.md cites live in logs/ beside this file.
#   run-fv5.sh patch                  write ../floor-v5.patch from the worktree (state fv5 only; mkpatch.py, no git write)
#   run-fv5.sh rebase <dp|f>          from state fv5: apply pass 5's route patch, write ../D4-<Dp|F>.patch as what it adds
#                                     over floor v5, then reverse it and check the tree is floor v5 again
#   run-fv5.sh check                  from state fv5: reverse floor v5 to HEAD (diff empty?), `git apply --check` floor v5
#                                     on HEAD, re-apply, `git apply --check` each rebased route on HEAD + floor v5
#   run-fv5.sh state <fv5|dp|f>       the worktree at HEAD + floor v5 [+ the rebased route]
#   run-fv5.sh tsc <tag> | unit <tag> | libbuild <tag> | unit-plants
#   run-fv5.sh build <tag>            <tag>-src (pass 6's route dir for dp/f), <tag>-atk-src, <tag>-atk-src-dev
#   run-fv5.sh reads <tag> <engine>   CANON (clean + 9; routes only), FACT (src, src-dev), ATTACK, CORNER, REPORT (routes),
#                                     T-2, T-3
#   run-fv5.sh battery <tag> <engine> T-1, T-4, T-5, T-6, T-7, W-B, W-E on <tag>-src (T-2, T-3 are in `reads`)
#   run-fv5.sh probe <engine>         probes/scope-bound.mjs, every form
#   run-fv5.sh wk <tag> <stage args…> ONE --exclusive webkit hold running several inner stages (reads-inner, battery-inner,
#                                     probe-inner), each to its own log
#   run-fv5.sh xscript                XSCRIPT on pass 6's route dirs (engine-free; floor v5 does not touch them)
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/floor5
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P5=$T/pass-5; P6=$T/pass-6; FV=$P6/floor-v5; L=$FV/logs; R6=$P6/H6/routes
FV5=$P6/floor-v5.patch
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
p5Of() { [[ $1 == dp ]] && echo $P5/D4-Dp.patch || echo $P5/D4-F.patch; }
p6Of() { [[ $1 == dp ]] && echo $P6/D4-Dp.patch || echo $P6/D4-F.patch; }
routeOf() { [[ $1 == dp ]] && echo $R6/D4-Dp || echo $R6/D4-F; }
dh() { (cd $WT && git diff HEAD --binary | shasum | cut -c1-12); }

case $1 in
  patch)
    plog patch zsh -c "cd $WT; python3 $FV/mkpatch.py head $WT $FV5; shasum $FV5; git apply --numstat $FV5 | awk '{a+=\$1; d+=\$2; n++} END {print n\" files, +\"a\" / -\"d}'" ;;
  rebase)
    x=$2; plog rebase-$x zsh -c "
      cd $WT; set -x
      D0=\$(git diff HEAD --binary | shasum | cut -c1-12)
      python3 $FV/mkpatch.py snap $WT $(p5Of $x) $W/snap-$x
      git apply --check -v $(p5Of $x) && git apply -v $(p5Of $x)
      python3 $FV/mkpatch.py since $WT $W/snap-$x $(p6Of $x)
      shasum $(p5Of $x) $(p6Of $x); git apply --numstat $(p6Of $x) | awk '{a+=\$1; d+=\$2; n++} END {print n\" files, +\"a\" / -\"d}'
      git apply -R --check $(p6Of $x) && git apply -R $(p6Of $x)
      D1=\$(git diff HEAD --binary | shasum | cut -c1-12); echo \"floor v5 tree before \$D0 after reverse \$D1 (\$([[ \$D0 == \$D1 ]] && echo equal || echo DIFFERS))\"
      echo \"untracked: \$(git status --porcelain | grep '^??' | grep -v node_modules | tr '\\n' ' ')\"
      " ;;
  check)
    plog check zsh -c "
      cd $WT; set -x
      git apply -R --check $FV5 && git apply -R $FV5
      echo \"HEAD tree: git diff HEAD \$(git diff HEAD --binary | wc -c | tr -d ' ') bytes; untracked \$(git status --porcelain | grep -v node_modules | wc -l | tr -d ' ')\"
      git apply --check $FV5 && echo 'floor-v5.patch: apply --check clean on HEAD' && git apply $FV5
      git apply --check $(p6Of dp) && echo 'D4-Dp.patch: apply --check clean on HEAD + floor v5'
      git apply --check $(p6Of f) && echo 'D4-F.patch: apply --check clean on HEAD + floor v5'
      git apply --check $(p5Of dp) && echo 'pass-5 D4-Dp.patch also applies (offsets only)'
      git apply --check $(p5Of f) && echo 'pass-5 D4-F.patch also applies (offsets only)'
      shasum $FV5 $(p6Of dp) $(p6Of f)" ;;
  state)
    plog state-$2 zsh -c "
      cd $WT
      git apply --check -R $(p6Of dp) 2>/dev/null && git apply -R $(p6Of dp) && echo 'reverse-applied dp'
      git apply --check -R $(p6Of f) 2>/dev/null && git apply -R $(p6Of f) && echo 'reverse-applied f'
      git apply --check -R $FV5 && echo \"floor v5 in place (\$(shasum $FV5 | cut -c1-8))\" || exit 3
      [[ $2 != fv5 ]] && git apply --check $(p6Of $2) && git apply $(p6Of $2) && echo \"applied $2 (\$(shasum $(p6Of $2) | cut -c1-8))\"
      echo \"git diff HEAD \$(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths \$(git status --porcelain -- src | wc -l | tr -d ' ')\"" ;;
  tsc)
    glog tsc-$2 --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  unit)
    glog unit-$2 --timeout 45 -- node $HN/unit.mjs $WT --label fv5-$2 --out $O ;;
  unit-plants)
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; SH=src/components/toggle-group/styles.css; ST=src/components/tabs/styles/segmented.css
    P() { local n=$1; shift; glog unit-plant-$n --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean -t "the sheet" $TG
    P strip-reset-gone --sub "$ST|        --selection-tile: none;
        position: relative;|        position: relative;" -t "the sheet" $TG
    P limit-group-only --sub "$SH|    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {|    @scope (.toggle-group__item) to (.toggle-group) {" -t "the sheet" $TG
    P pin-unbounded --sub "$SH|    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {|    @scope (.toggle-group__item) {" -t "the sheet" $TG
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|" -t "the sheet" $TG ;;
  libbuild)
    glog libbuild-$2 --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  build)
    x=$2; rt=(); [[ $x != fv5 ]] && rt=(--route $(routeOf $x))
    glog build-$x-src --timeout 20 -- node $HN/build.mjs $WT --label $x-src --out $O --flavor src $rt
    for f in src src-dev; do glog build-$x-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label $x-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  reads-inner) # $2 tag, $3 engine
    x=$2; e=$3; set -x
    if [[ $x != fv5 ]]; then
      node $HN/canon.mjs --build $B/$x-src --out $O --engine $e
      for p in a s h layer foreign unlayered cq lowlayer cqoff; do node $HN/canon.mjs --build $B/$x-src --out $O/plant-$p --engine $e --plant $p; done
    fi
    node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
    node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
    [[ $x != fv5 ]] && node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
    node $HN/t2-one-line-stadium.mjs --build $B/$x-src --out $O --engine $e
    node $HN/t3-selected-separates.mjs --build $B/$x-src --out $O --engine $e
    true ;;
  battery-inner) # $2 tag, $3 engine: full output, every cell
    x=$2; e=$3; set -x
    for w in t1-corner-stops t4-ring-whole t5-one-of-n-keys t6-engagement t7-no-consumer-paint wb-choice-card we-one-line; do
      node $HN/$w.mjs --build $B/$x-src --out $O --engine $e
    done; true ;;
  probe-inner)
    node $FV/probes/scope-bound.mjs --engine $2 --form all ;;
  reads)
    x=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog reads-$x-$e $ex --timeout 90 -- zsh $0 reads-inner $x $e ;;
  battery)
    x=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog battery-$x-$e $ex --timeout 90 -- zsh $0 battery-inner $x $e ;;
  probe)
    e=$2; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog probe-scope-bound-$e $ex --timeout 10 -- zsh $0 probe-inner $e ;;
  wk-inner) # $2 hold tag, then "stage:tag" items
    shift 2
    for it in "$@"; do st=${it%%:*}; tg=${it#*:}
      if [[ $st == probe ]]; then nm=probe-scope-bound-webkit; else nm=$st-$tg-webkit; fi
      F=$L/$nm.log; stamp > $F; echo "in one --exclusive webkit hold" >> $F
      if [[ $st == probe ]]; then zsh $0 probe-inner webkit >> $F 2>&1; else zsh $0 $st-inner $tg webkit >> $F 2>&1; fi
      echo "exit $? · $(stamp)" >> $F
    done ;;
  wk)
    tag=$2; shift 2
    stamp > $L/wk-$tag.log; echo "items: $*" >> $L/wk-$tag.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 wk-inner $tag "$@" >> $L/wk-$tag.log 2>&1
    echo "exit $? · $(stamp)" >> $L/wk-$tag.log ;;
  xscript)
    plog xscript zsh -c "node $HN/transcribe.mjs --routes $R6/D4-Dp,$R6/D4-F --out $O; echo \"exit \$?\"" ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
