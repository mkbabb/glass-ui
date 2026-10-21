#!/bin/zsh
# H7 seat driver (D4 pass 7). One stage per call; every log's first and last line carry the wall clock and the 1/5/15-min
# load. Every build and browser run goes through the machine guard (browser runs never --light); every run that may start
# Playwright WebKit holds the machine-wide WebKit lock (guarded --exclusive webkit). Serial: one heavy run at a time.
#   run-h7.sh route <fv5|dp>          the worktree's src at HEAD + floor v5 (+ D′'s pass-6 patch). Q-13 is ruled D′ (INBOUND O-103):
#                                     pass 7 reads one route, and F's pass-7 directory is struck
#   run-h7.sh sheet <x>               SHEET (engine-free) on the worktree as it stands, with the pass-7 route dir for dp
#   run-h7.sh build <x>               <x>-src (route builds only: the pass-7 route dir), <x>-atk-src, <x>-atk-src-dev
#   run-h7.sh plant <x>               B-1's `crit-foreign-writer` (`.card > .toggle-group { --selection-tile: flush }` in
#                                     base.css's components layer) written into the worktree, SHEET read, the attack build
#                                     <x>-plant-atk-src made, base.css restored and the diff checked equal
#   run-h7.sh reads <x> <engine>      the new cells: FACT (attack src, src-dev; the plant build when it exists), REPORT
#                                     (route build)
#   run-h7.sh cure [v2]               the candidate cure (v2: h7-cure2.patch, the flush plate rule narrowed to the option,
#                                     O-1 (a), O-2, B-4; builds dp-cure2-*). v1 (h7-cure.patch: B-3's mobile-root reset and limit, O-1 (a)'s sentence,
#                                     O-2's D′ clause, B-4's fill) applied on floor v5 + D′: SHEET, builds dp-cure-atk-src and
#                                     dp-cure-atk-src-dev, then reverse-applied and the diff checked equal. A target for the
#                                     floor-v6 seat, not a floor
#   run-h7.sh selftest <engine> <tag> [--only ..] [--faults ..]   the self-test (or a part) under one hash
#   run-h7.sh probe <build> <engine>  probes/b3-mobile.mjs (info, not a witness) on one build
#   run-h7.sh wk <tag> <snippet>      one WebKit hold for several reads
# The worktree and bulky outputs live in .claude/worktrees/bl/D4/p7/h7; the logs H7.md cites live in logs/.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/h7
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P6=$T/pass-6; R7=$T/pass-7/H7/routes; L=$T/pass-7/H7/logs
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
glog() { # glog <name> [guard opts] -- <cmd>
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
patchOf() { echo $P6/D4-Dp.patch; }
routeOf() { echo $R7/D4-Dp; }
CURE=$T/pass-7/H7/h7-cure.patch
case $1 in
  route)
    F=$L/route-$2.log; stamp > $F
    { cd $WT
      git apply --check -R $CURE 2>/dev/null && git apply -R $CURE && echo "reverse-applied the cure"
      git apply --check -R $P6/D4-Dp.patch 2>/dev/null && git apply -R $P6/D4-Dp.patch && echo "reverse-applied dp"
      git apply --check -R $P6/floor-v5.patch 2>/dev/null && echo "floor v5 in place ($(shasum $P6/floor-v5.patch | cut -c1-8))" || { git apply $P6/floor-v5.patch && echo "applied floor v5 ($(shasum $P6/floor-v5.patch | cut -c1-8))"; }
      [[ $2 != fv5 ]] && git apply $(patchOf $2) && echo "applied $2 ($(shasum $(patchOf $2) | cut -c1-8))"
      echo "HEAD $(git rev-parse --short HEAD) · git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  sheet)
    x=$2; r=(); [[ $x == dp* ]] && r=(--route $(routeOf $x))
    glog sheet-$x --light --timeout 5 -- node $HN/sheet.mjs --wt $WT $r --out $O ;;
  build)
    x=$2
    [[ $x != fv5 ]] && glog build-$x-src --timeout 20 -- node $HN/build.mjs $WT --label $x-src --out $O --flavor src --route $(routeOf $x)
    for f in src src-dev; do glog build-$x-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label $x-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  plant)
    x=$2; BC=$WT/src/styles/utilities/base.css
    F=$L/plant-$x.log; stamp > $F
    D0=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12); cp $BC $W/base.css.orig
    printf '\n@layer components {\n    .card > .toggle-group {\n        --selection-tile: flush;\n    }\n}\n' >> $BC
    echo "plant crit-foreign-writer appended to base.css; git diff before $D0" >> $F; tail -6 $BC >> $F
    r=(); [[ $x == dp ]] && r=(--route $(routeOf $x))
    $G --rss-gb 8 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT $r --out $O >> $F 2>&1; echo "sheet exit $?" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label $x-plant-atk-src --out $O --flavor src --route $HN/attack-route >> $F 2>&1
    cp $W/base.css.orig $BC; D1=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    echo "base.css restored; git diff after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit $? · $(stamp)" >> $F ;;
  cure)
    # cure [v2]: v1 = h7-cure.patch (builds dp-cure-*), v2 = h7-cure2.patch (builds dp-cure2-*)
    v=${2:-v1}; CP=$CURE; tag=cure; [[ $v == v2 ]] && { CP=$T/pass-7/H7/h7-cure2.patch; tag=cure2; }
    F=$L/$tag.log; stamp > $F
    D0=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    { cd $WT && git apply $CP && echo "applied $(basename $CP) ($(shasum $CP | cut -c1-8)) on git diff $D0"; } >> $F 2>&1 || { echo "exit 1 · the cure did not apply · $(stamp)" >> $F; exit 1; }
    $G --rss-gb 8 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $(routeOf dp) --out $O >> $F 2>&1; echo "sheet exit $?" >> $F
    for f in src src-dev; do $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp-$tag-atk-$f --out $O --flavor $f --route $HN/attack-route >> $F 2>&1; echo "build dp-$tag-atk-$f exit $?" >> $F; done
    { cd $WT && git apply -R $CP; } >> $F 2>&1; D1=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    echo "cure reverse-applied; git diff after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  reads)
    # restored 2026-10-20: the 22:52 edit dropped this stage, which chain 2 calls. The commands are the ones
    # reads-{fv5,dp,dp-cure}-chromium.log record (FACT on each attack build present, the plant build, REPORT on the route build)
    x=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit); c=""
    for b in $x-atk-src $x-atk-src-dev $x-plant-atk-src; do [[ -d $B/$b ]] && c+="node $HN/fact-split.mjs --build $B/$b --out $O --engine $e; "; done
    [[ -d $B/$x-src ]] && c+="node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e; "
    glog reads-$x-$e $ex --timeout 60 -- zsh -c "set -x; $c true" ;;
  probe)
    b=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog probe-b3-$b-$e $ex --timeout 20 -- node $T/pass-7/H7/probes/b3-mobile.mjs --build $B/$b --out $O --engine $e ;;
  wk)
    tag=$2; shift 2
    glog wk-$tag --exclusive webkit --timeout 90 -- zsh -c "set -x; $*; true" ;;
  selftest)
    e=$2; tag=$3; shift 3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog selftest-$e-$tag $ex --timeout 90 -- node $HN/selftest.mjs --out $O/selftest --engines $e "$@" ;;
  xscript)
    glog xscript --light --timeout 10 -- node $HN/transcribe.mjs --selftest --out $O ;;
  sheetself)
    glog sheet-selftest --light --timeout 10 -- node $HN/sheet.mjs --selftest --out $O ;;
  unit)
    glog unit-selftest --light --timeout 30 -- node $HN/unit.mjs $WT --selftest --out $O ;;
  hash)
    F=$L/harness-files.sha1; (cd $HN && find . -type f \( -name '*.mjs' -o -name '*.json' -o -name '*.ts' \) | sort | xargs shasum) > $F
    node -e "import('$HN/lib.mjs').then(m=>console.log('harness', m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files, 'files'))" >> $F 2>&1 ;;
  *) echo "unknown stage $1"; exit 2 ;;
esac
