#!/bin/zsh
# FLOOR-V3 seat driver (D4 pass 4). One stage per call; every log's first and last line carry the wall clock and the load.
# Every build, unit run and browser run goes through the machine guard; every run that may start Playwright WebKit also
# holds the machine-wide WebKit lock (guarded --exclusive webkit). One heavy run at a time, serial.
#   run-fv3.sh tsc | build | unit | unit-plants | battery-chromium | battery-webkit | dist <chromium|webkit> | bundle | probe <name> <engine>
# The worktree (HEAD + floor v3) and bulky outputs live in .claude/worktrees/bl/D4/p4/floor3; the logs FLOOR-V3.md
# cites live beside this file (logs/).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p4/floor3
WT=$W/wt; O=$W/out; B=$O/builds
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
F3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/floor-v3
L=$F3/logs
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
# glog <name> [guard opts] -- <cmd>: every run takes --light --rss-gb 8 (the heavy queue held the H4 seat 30 min this
# pass, pass-4/H4/logs/HELD; the machine law allows the light path then). The log's first and last lines carry the load.
glog() {
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --light --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line CANON:canon)
ATK_W=(FACT:fact-split ATTACK:attack CORNER:corner-refusal REPORT:report-h46)

case $1 in
  tsc)
    glog tsc-app --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit"
    glog tsc-test --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json" ;;
  build) # the library dist, then the scene apps (H4: src, src-dev, dist, dist-dev, and the attack builds)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT
    for f in src src-dev dist dist-dev; do glog build-fv3-$f --timeout 15 -- node $HN/build.mjs $WT --label fv3-$f --out $O --flavor $f; done
    for f in src src-dev dist; do glog build-fv3-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label fv3-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  unit) # the whole suite through the one unit driver (H4-3), two workers; then the driver's own self-test
    glog unit-all --timeout 40 -- node $HN/unit.mjs $WT --label fv3-all --out $O
    glog unit-selftest --timeout 20 -- node $HN/unit.mjs $WT --selftest --out $O ;;
  unit-plants) # each new case against the mutation it exists to catch: every plant must exit 1 (FAIL), then clean again
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; IA=tests/components/ui/toggle-group/item-attrs.test.ts; FS=tests/components/fading-scroll.contract.test.ts
    SH=src/components/toggle-group/styles.css; IT=src/components/toggle-group/ToggleGroupItem.vue; FV=src/components/fading-scroll/FadingScroll.vue
    P() { local n=$1; shift; glog unit-plant-$n --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean-targets $TG $IA $FS
    P attrs-engine-first --sub "$IT|    ...group?.itemAttrs(props.value),
}));|}));" $IA
    P attrs-owned-kept --sub "$IT|.filter(([k]) => !ENGINE_OWNED.includes(k))|.filter(() => true)" $IA
    P attrs-unnamed --sub "$IT|        if (owned.length)|        if (false)" $IA
    P stacked-unnamed --sub "$IT|textRows(b) > 1)|textRows(b) > 99)" -t "stacked inside the rung" $TG
    P geometry-off-fact --sub "$SH|            border-radius: var(--radius-field) !important;
            flex-direction: column;|            flex-direction: column;" -t "the sheet" $TG
    P lg-trap --sub "$SH|        --toggle-group-item-pad: 1.25rem;|        --toggle-group-item-pad: 1.25rem;
        padding-inline: 1.25rem;" -t "the sheet" $TG
    P port-always-stop --sub "$FV|:tabindex=\"holdsTabStop ? undefined : 0\"|tabindex=\"0\"" -t "tab stop only while" $FS
    P parked-counts-as-a-stop --sub "$FV|:not([disabled], [tabindex=\"-1\"])|" -t "tab stop only while" $FS ;;
  battery-chromium) # the battery minus T-8 through run.mjs, the attack set on the attack build
    glog battery-src-chromium --timeout 240 -- node $HN/run.mjs --build $B/fv3-src --attack $B/fv3-atk-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E,CANON,FACT,ATTACK,CORNER,REPORT ;;
  battery-webkit-inner) # inside one WebKit-lock hold: each witness on its own, then T-8 (both engines)
    log() { local F=$L/$1.log; shift; stamp > $F; echo "in one WebKit-lock hold" >> $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
    for w in $SRC_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/fv3-src --out $O --engine webkit; done
    for w in $ATK_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/fv3-atk-src --out $O --engine webkit; done
    log src-T-8-both node $HN/t8-both-engines.mjs --build $B/fv3-src --out $O ;;
  webkit-all-inner) # every Playwright WebKit read in ONE lock hold: the battery, the dist cells, the stubs, the probes
    zsh $0 battery-webkit-inner
    log() { local F=$L/$1.log; shift; stamp > $F; echo "in one WebKit-lock hold" >> $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do log dist-$w-webkit node $HN/$w.mjs --build $B/fv3-dist --out $O --engine webkit; done
    for w in fact-split attack corner-refusal; do log atkdist-$w-webkit node $HN/$w.mjs --build $B/fv3-atk-dist --out $O --engine webkit; done
    log atkdev-attack-webkit node $HN/attack.mjs --build $B/fv3-atk-src-dev --out $O --engine webkit
    for st in dstub fstub; do for w in fact-split attack corner-refusal; do log stub-$st-$w-webkit node $HN/$w.mjs --build $B/fv3-$st-atk-src --out $O --engine webkit; done; done
    zsh $0 probes-inner webkit ;;
  webkit-all)
    stamp > $L/webkit-all.log
    $G --light --rss-gb 8 --exclusive webkit --timeout 240 -- zsh $0 webkit-all-inner >> $L/webkit-all.log 2>&1
    echo "exit $? · $(stamp)" >> $L/webkit-all.log ;;
  battery-webkit)
    stamp > $L/battery-webkit.log
    $G --light --rss-gb 8 --exclusive webkit --timeout 240 -- zsh $0 battery-webkit-inner >> $L/battery-webkit.log 2>&1
    echo "exit $? · $(stamp)" >> $L/battery-webkit.log ;;
  dist) # $2 engine: T-2, T-5, W-E on dist; the attack set on the attack dist; ATTACK on the attack src-dev
    e=$2; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog dist-$w-$e $ex --timeout 60 -- node $HN/$w.mjs --build $B/fv3-dist --out $O --engine $e; done
    for w in fact-split attack corner-refusal; do glog atkdist-$w-$e $ex --timeout 60 -- node $HN/$w.mjs --build $B/fv3-atk-dist --out $O --engine $e; done
    glog atkdev-attack-$e $ex --timeout 60 -- node $HN/attack.mjs --build $B/fv3-atk-src-dev --out $O --engine $e ;;
  build-probes) # the FV3-2 probe route on floor v3 (production and development flavours)
    for f in src src-dev; do glog build-fv3-multi-$f --timeout 15 -- node $HN/build.mjs $WT --label fv3-multi-$f --out $O --flavor $f --route $F3/probes/route-multi; done ;;
  build-stubs) # measurement only, never in the patch: each route's one-rule writer of the fact on floor v3 (stubs/),
    # applied to the worktree for its builds and reverted after; the attack build for both, D′'s own route for corner-gap
    P3=$F3/../../pass-3
    glog build-stub-dprime --timeout 20 -- zsh -c "cd $WT && git apply $F3/stubs/dprime-writer.patch && echo 'D′ writer stub applied' && node $HN/build.mjs $WT --label fv3-dstub-atk-src --out $O --flavor src --route $HN/attack-route && node $HN/build.mjs $WT --label fv3-dstub-dp-src --out $O --flavor src --route $P3/D4-Dp-proto/route; rc=\$?; git apply -R $F3/stubs/dprime-writer.patch && echo 'D′ writer stub reverted'; exit \$rc"
    glog build-stub-f --timeout 20 -- zsh -c "cd $WT && git apply $F3/stubs/f-writer.patch && echo 'F writer stub applied' && node $HN/build.mjs $WT --label fv3-fstub-atk-src --out $O --flavor src --route $HN/attack-route; rc=\$?; git apply -R $F3/stubs/f-writer.patch && echo 'F writer stub reverted'; exit \$rc" ;;
  build-f2) # the comparison: a second worktree at HEAD + floor v2, its scene builds (src, and the FV3-2 probe route)
    glog build-f2 --timeout 20 -- zsh -c "cd /Users/mkbabb/Programming/glass-ui && git worktree add --detach $W/wt-f2 HEAD >/dev/null 2>&1; cd $W/wt-f2 && git apply $F3/../../pass-3/floor-v2.patch && echo \"floor v2 applied: \$(git status --porcelain -- src | wc -l) src paths\" && ln -sf /Users/mkbabb/Programming/glass-ui/node_modules node_modules && node $HN/build.mjs $W/wt-f2 --label f2-src --out $O --flavor src && node $HN/build.mjs $W/wt-f2 --label f2-multi-src --out $O --flavor src --route $F3/probes/route-multi" ;;
  probes-inner) # $2 engine. Every FV3 probe, each with its own log (first and last line: wall clock and load)
    e=$2; P3=$F3/../../pass-3
    log() { local F=$L/$1.log; shift; stamp > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
    log probe-multi-role-fv3-$e node $F3/probes/multi-role.mjs --build $B/fv3-multi-src --engine $e
    log probe-multi-role-fv3dev-$e node $F3/probes/multi-role.mjs --build $B/fv3-multi-src-dev --engine $e
    log probe-multi-role-f2-$e node $F3/probes/multi-role.mjs --build $B/f2-multi-src --engine $e
    log probe-tile-geometry-fv3-$e node $F3/probes/tile-geometry.mjs --build $B/fv3-src --engine $e --corner
    log probe-tile-geometry-fv3-plated-$e node $F3/probes/tile-geometry.mjs --build $B/fv3-src --engine $e --arm plated
    log probe-tile-geometry-f2-naive-$e node $F3/probes/tile-geometry.mjs --build $B/f2-src --engine $e --naive
    log probe-tile-geometry-fv3-naive-$e node $F3/probes/tile-geometry.mjs --build $B/fv3-src --engine $e --naive
    log probe-pill-row-fv3-$e node $F3/probes/pill-row.mjs --build $B/fv3-src --engine $e
    log probe-pill-row-fv3dev-$e node $F3/probes/pill-row.mjs --build $B/fv3-src-dev --engine $e
    log probe-pill-row-f2-$e node $F3/probes/pill-row.mjs --build $B/f2-src --engine $e
    log probe-corner-gap-dstub-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/fv3-dstub-dp-src --engines $e
    log probe-corner-gap-dstub-plant-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/fv3-dstub-dp-src --engines $e --plant
    log stub-dstub-dp-T-3-$e node $HN/t3-selected-separates.mjs --build $B/fv3-dstub-dp-src --out $O --engine $e ;;
  probes) # $2 engine; one guard hold (WebKit: one lock hold)
    ex=(); [[ $2 == webkit ]] && ex=(--exclusive webkit)
    stamp > $L/probes-$2.log
    $G --light --rss-gb 8 $ex --timeout 90 -- zsh $0 probes-inner $2 >> $L/probes-$2.log 2>&1
    echo "exit $? · $(stamp)" >> $L/probes-$2.log ;;
  stubs) # $2 engine: the shared attack set (FACT, ATTACK, CORNER) on floor v3 under each route's one-rule writer stub
    e=$2; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    for st in dstub fstub; do for w in fact-split attack corner-refusal; do glog stub-$st-$w-$e $ex --timeout 30 -- node $HN/$w.mjs --build $B/fv3-$st-atk-src --out $O --engine $e; done; done ;;
  bundle)
    glog bundle --timeout 20 -- zsh $F3/../../pass-3/floor-v2/probes/bundle.sh $WT "HEAD + floor v3" ;;
  probe) # $2 probe file under probes/, $3.. its args (WebKit runs hold the lock)
    n=$2; shift 2; ex=(); [[ "$*" == *webkit* ]] && ex=(--exclusive webkit)
    glog probe-$n-${(j:-:)${@//\//_}} $ex --timeout 30 -- node $F3/probes/$n.mjs "$@" ;;
  *) echo "usage: see the header"; exit 2 ;;
esac
