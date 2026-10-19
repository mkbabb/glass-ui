#!/bin/zsh
# H6 seat driver (D4 pass 6). One stage per call; every log's first and last line carry the wall clock and the 1/5/15-min
# load. Every build and browser run goes through the machine guard (browser runs never --light); every run that may start
# Playwright WebKit holds the machine-wide WebKit lock (guarded --exclusive webkit). Serial: one heavy run at a time.
#   run-h6.sh route <dp|f>            the worktree's src at HEAD + floor v4 + that route's pass-5 patch (reverse-applies the other)
#   run-h6.sh build <dp|f>            <x>-src (the pass-6 route dir) and <x>-atk-src, <x>-atk-src-dev (the attack route)
#   run-h6.sh reads <dp|f> <engine>   the changed cells on the library: FACT (src, src-dev), ATTACK (src-dev), CORNER, REPORT
#                                     (route build), and the battery's migrated arms (T-1..T-7, W-B, W-E) on the route build
#   run-h6.sh stub <dp|f> <engine>    harness validity only, NOT floor v5: FV5-2's strip reset + the pin's limit appended to
#                                     the worktree's sheets, the attack builds, FACT, then the sheets restored and checked
#   run-h6.sh selftest <engine> <part> [--only ..]   the self-test (or a part) under one hash
#   run-h6.sh xscript | unit          the engine-free checks
#   run-h6.sh wk <tag> <snippet>      one WebKit hold for several reads (chain2.sh)
# The worktree and bulky outputs live in .claude/worktrees/bl/D4/p6/h6; the logs H6.md cites live in logs/.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/h6
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P5=$T/pass-5; R6=$T/pass-6/H6/routes; L=$T/pass-6/H6/logs
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
routeOf() { [[ $1 == dp ]] && echo $R6/D4-Dp || echo $R6/D4-F; }
case $1 in
  route)
    F=$L/route-$2.log; stamp > $F
    { cd $WT
      for x in dp f; do git apply --check -R $(patchOf $x) 2>/dev/null && git apply -R $(patchOf $x) && echo "reverse-applied $x"; done
      git apply --check -R $P5/floor-v4.patch 2>/dev/null && echo "floor v4 in place ($(shasum $P5/floor-v4.patch | cut -c1-8))" || { git apply $P5/floor-v4.patch && echo "applied floor v4"; }
      git apply $(patchOf $2) && echo "applied $2 ($(shasum $(patchOf $2) | cut -c1-8))"
      echo "git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  build)
    glog build-$2-src --timeout 20 -- node $HN/build.mjs $WT --label $2-src --out $O --flavor src --route $(routeOf $2)
    for f in src src-dev; do glog build-$2-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label $2-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  reads)
    x=$2; e=$3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog reads-$x-$e $ex --timeout 90 -- zsh -c "
      set -x
      node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
      node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
      node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
      node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
      node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
      true"
    glog battery-$x-$e $ex --timeout 90 -- zsh -c "
      for w in t1-corner-stops t2-one-line-stadium t3-selected-separates t4-ring-whole t5-one-of-n-keys t6-engagement t7-no-consumer-paint wb-choice-card we-one-line; do
        node $HN/\$w.mjs --build $B/$x-src --out $O --engine $e | grep -E '^[A-Z]-?[0-9A-Z]* (PASS|FAIL) ·|HARNESS ERROR|^  (FAIL|UNMEASURED) +\\[migrated\\]|load .* at start'
      done; true" ;;
  stub)
    x=$2; e=${3:-chromium}; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    SH=$WT/src/components/toggle-group/styles.css; ST=$WT/src/components/tabs/styles/segmented.css
    F=$L/stub-$x-$e.log; stamp > $F
    D0=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12); cp $SH $W/styles.css.orig; cp $ST $W/segmented.css.orig
    sed -i '' 's/@scope (.toggle-group__item) to (.toggle-group) {/@scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {/' $SH
    printf '\n@layer components {\n    .segmented-tabs {\n        --selection-tile: none;\n    }\n}\n' >> $ST
    echo "stub: the pin's limit and the strip reset; git diff before $D0" >> $F; grep -n "@scope" $SH >> $F; tail -5 $ST >> $F
    for f in src src-dev; do $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label $x-stub-atk-$f --out $O --flavor $f --route $HN/attack-route >> $F 2>&1; done
    cp $W/styles.css.orig $SH; cp $W/segmented.css.orig $ST; D1=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    echo "sheets restored; git diff after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    $G --rss-gb 8 $ex --timeout 60 -- zsh -c "echo admitted \$(date '+%F %T') load \$(sysctl -n vm.loadavg); node $HN/fact-split.mjs --build $B/$x-stub-atk-src --out $O/stub --engine $e; node $HN/fact-split.mjs --build $B/$x-stub-atk-src-dev --out $O/stub --engine $e; true" >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  stubreads)
    # the stub's attack builds (made by `stub`, static), read again: FACT on src and src-dev, both routes
    e=$2; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog stubreads-$e $ex --timeout 60 -- zsh -c "for x in dp f; do for f in src src-dev; do node $HN/fact-split.mjs --build $B/\$x-stub-atk-\$f --out $O/stub --engine $e; done; done; true" ;;
  wk)
    # wk <tag> <zsh snippet>: ONE --exclusive webkit hold for several WebKit reads (chain2.sh), so the seat queues for the
    # machine-wide WebKit lock as few times as it can; each hold stays under the guard's 90-min cap
    tag=$2; shift 2
    glog wk-$tag --exclusive webkit --timeout 90 -- zsh -c "set -x; $*; true" ;;
  selftest)
    e=$2; tag=$3; shift 3; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    glog selftest-$e-$tag $ex --timeout 90 -- node $HN/selftest.mjs --out $O/selftest --engines $e "$@" ;;
  xscript)
    F=$L/xscript.log; stamp > $F
    { node $HN/transcribe.mjs --selftest --out $O; echo "--- pass-6 route dirs"; node $HN/transcribe.mjs --routes $R6/D4-Dp,$R6/D4-F --out $O; echo "exit $?"
      echo "--- pass-5 route dirs (H5/routes)"; node $HN/transcribe.mjs --routes $P5/H5/routes/D4-Dp,$P5/H5/routes/D4-F --out $O; echo "exit $?"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  unit)
    glog unit-selftest --light --timeout 30 -- node $HN/unit.mjs $WT --selftest --out $O ;;
esac
