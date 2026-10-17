#!/bin/zsh
# D4-F pass-4 SPEC seat driver. One stage per call; every log's first and last line carry the wall clock and the load.
# Every build, unit run and browser run goes through the machine guard (--light --rss-gb 8, as the H4 and floor-v3 seats
# ran); every run that may start Playwright WebKit also holds `--exclusive webkit`. One heavy run at a time, serial.
#   run-f4.sh tsc | build | build-variants | unit | unit-plants | chromium | webkit | bundle
# The worktree (HEAD + floor v3 + the route) and bulky outputs live in .claude/worktrees/bl/D4/p4/D4-F-spec; the logs
# D4-F-spec.md cites live beside this file (logs/).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p4/D4-F-spec
WT=$W/wt; O=$W/out; B=$O/builds
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/D4-F-spec
L=$S/logs; R=$S/route; RA=$HN/attack-route; RF=$S/probes/route-f4
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
glog() {
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --light --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
log() { local F=$L/$1.log; shift; stamp > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line CANON:canon)
ATK_W=(FACT:fact-split ATTACK:attack CORNER:corner-refusal REPORT:report-h46)
SH=src/components/toggle-group/styles.css; IT=src/components/toggle-group/ToggleGroupItem.vue
TG=tests/components/ui/toggle-group/ToggleGroup.test.ts
# a variant: one text substitution in the worktree for its builds, restored after (measurement only, never in the patch)
variant() { # variant <name> <file> <old-file> <new-file> <builds...>
  local n=$1 f=$2 old=$3 new=$4; shift 4
  glog build-variant-$n --timeout 20 -- zsh -c "cd $WT && cp $f $f.orig && python3 -c 'import sys;p,o,n=sys.argv[1:];s=open(p).read();o=open(o).read();n=open(n).read();assert s.count(o)==1,\"anchor\";open(p,\"w\").write(s.replace(o,n))' $f $old $new && echo 'variant $n applied' && $* ; rc=\$?; mv $f.orig $f && echo 'variant $n restored'; exit \$rc"
}

case $1 in
  tsc)
    glog tsc-app --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit"
    glog tsc-test --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json" ;;
  build)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT
    for f in src src-dev dist dist-dev; do glog build-f4-$f --timeout 15 -- node $HN/build.mjs $WT --label f4-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-f4-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label f4-atk-$f --out $O --flavor $f --route $RA; done
    for f in src src-dev dist; do glog build-f4-own-$f --timeout 15 -- node $HN/build.mjs $WT --label f4-own-$f --out $O --flavor $f --route $RF; done ;;
  build-variants) # the evidence for two of the route's choices, each against the form it replaces
    variant nopin $SH $S/probes/variants/pin.old $S/probes/variants/pin.new \
      "node $HN/build.mjs $WT --label f4v-nopin-own-src-dev --out $O --flavor src-dev --route $RF"
    variant childwriter $SH $S/probes/variants/writer.old $S/probes/variants/writer.child \
      "node $HN/build.mjs $WT --label f4v-child-own-src --out $O --flavor src --route $RF && node $HN/build.mjs $WT --label f4v-child-src --out $O --flavor src --route $R" ;;
  unit) # the whole suite through the one unit driver (H4-3), two workers; then the driver's own self-test
    glog unit-all --timeout 40 -- node $HN/unit.mjs $WT --label f4-all --out $O
    glog unit-selftest --timeout 20 -- node $HN/unit.mjs $WT --selftest --out $O ;;
  unit-plants) # each new case against the mutation it exists to catch: every plant must exit 1, then clean again
    P() { local n=$1; shift; glog unit-plant-$n --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean-targets $TG
    P rows-on-slot-function --sub "$IT|v-if=\"yields(\$slots.meta?.())\"|v-if=\"\$slots.meta\"" -t "a row renders only when" $TG
    P second-writer --sub "$SH|    :where(.toggle-group__item, .toggle-group__item *) {|    .toggle-group:has(.toggle-group__item > .toggle-group__meta) { --selection-tile: plated; }
    :where(.toggle-group__item, .toggle-group__item *) {" -t "one rule writes the tile fact" $TG
    P pin-not-important --sub "$SH|        --selection-tile: inherit !important;|        --selection-tile: inherit;" -t "one rule writes the tile fact" $TG
    P mark-off-fact --sub "$SH|            /* D4-F: the mark (below) */
            --toggle-group-marked: 1;|            /* D4-F: the mark (below) */" -t "one rule writes the tile fact" $TG
    P clean-after $TG ;;
  chromium) # the battery minus T-8 (route build, attack build), the dist cells, the route's own probe and the variants
    glog battery-src-chromium --timeout 240 -- node $HN/run.mjs --build $B/f4-src --attack $B/f4-atk-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E,CANON,FACT,ATTACK,CORNER,REPORT
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog dist-$w-chromium --timeout 60 -- node $HN/$w.mjs --build $B/f4-dist --out $O --engine chromium; done
    for w in fact-split attack corner-refusal; do glog atkdist-$w-chromium --timeout 60 -- node $HN/$w.mjs --build $B/f4-atk-dist --out $O --engine chromium; done
    glog atkdev-attack-chromium --timeout 60 -- node $HN/attack.mjs --build $B/f4-atk-src-dev --out $O --engine chromium
    for f in src src-dev dist; do glog own-$f-chromium --timeout 30 -- node $S/probes/f4-attack.mjs --build $B/f4-own-$f --out $O --engine chromium; done
    glog own-nopin-src-dev-chromium --timeout 30 -- node $S/probes/f4-attack.mjs --build $B/f4v-nopin-own-src-dev --out $O --engine chromium
    glog own-child-src-chromium --timeout 30 -- node $S/probes/f4-attack.mjs --build $B/f4v-child-own-src --out $O --engine chromium
    for w in t1-corner-stops t3-selected-separates; do glog child-$w-chromium --timeout 60 -- node $HN/$w.mjs --build $B/f4v-child-src --out $O --engine chromium; done
    glog canon-fact-chromium --timeout 30 -- node $S/probes/canon-fact.mjs --build $B/f4-src --out $O --engine chromium
    for p in a s h; do glog canon-fact-plant-$p-chromium --timeout 30 -- node $S/probes/canon-fact.mjs --build $B/f4-src --out $O --engine chromium --plant $p; done ;;
  webkit-inner) # every Playwright WebKit read in ONE lock hold
    for w in $SRC_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/f4-src --out $O --engine webkit; done
    for w in $ATK_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/f4-atk-src --out $O --engine webkit; done
    log src-T-8-both node $HN/t8-both-engines.mjs --build $B/f4-src --out $O
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do log dist-$w-webkit node $HN/$w.mjs --build $B/f4-dist --out $O --engine webkit; done
    for w in fact-split attack corner-refusal; do log atkdist-$w-webkit node $HN/$w.mjs --build $B/f4-atk-dist --out $O --engine webkit; done
    log atkdev-attack-webkit node $HN/attack.mjs --build $B/f4-atk-src-dev --out $O --engine webkit
    for f in src src-dev dist; do log own-$f-webkit node $S/probes/f4-attack.mjs --build $B/f4-own-$f --out $O --engine webkit; done
    log own-nopin-src-dev-webkit node $S/probes/f4-attack.mjs --build $B/f4v-nopin-own-src-dev --out $O --engine webkit
    log own-child-src-webkit node $S/probes/f4-attack.mjs --build $B/f4v-child-own-src --out $O --engine webkit
    log canon-fact-webkit node $S/probes/canon-fact.mjs --build $B/f4-src --out $O --engine webkit
    for p in a s h; do log canon-fact-plant-$p-webkit node $S/probes/canon-fact.mjs --build $B/f4-src --out $O --engine webkit --plant $p; done ;;
  webkit-core-inner) # the route's own cells first, then the writer-sensitive battery witnesses (the full stage waited
    # 84 min in the machine-wide lock queue and was stopped before it started; logs/webkit-all.log)
    for f in src src-dev dist; do log own-$f-webkit node $S/probes/f4-attack.mjs --build $B/f4-own-$f --out $O --engine webkit; done
    log own-nopin-src-dev-webkit node $S/probes/f4-attack.mjs --build $B/f4v-nopin-own-src-dev --out $O --engine webkit
    log own-child-src-webkit node $S/probes/f4-attack.mjs --build $B/f4v-child-own-src --out $O --engine webkit
    for w in $ATK_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/f4-atk-src --out $O --engine webkit; done
    log canon-fact-webkit node $S/probes/canon-fact.mjs --build $B/f4-src --out $O --engine webkit
    for p in a s h; do log canon-fact-plant-$p-webkit node $S/probes/canon-fact.mjs --build $B/f4-src --out $O --engine webkit --plant $p; done
    for w in T-2:t2-one-line-stadium T-1:t1-corner-stops T-3:t3-selected-separates T-7:t7-no-consumer-paint T-5:t5-one-of-n-keys; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/f4-src --out $O --engine webkit; done
    log src-T-8-both node $HN/t8-both-engines.mjs --build $B/f4-src --out $O
    for w in t2-one-line-stadium; do log dist-$w-webkit node $HN/$w.mjs --build $B/f4-dist --out $O --engine webkit; done ;;
  webkit-core)
    stamp > $L/webkit-core.log
    $G --light --rss-gb 8 --exclusive webkit --timeout 90 -- zsh $0 webkit-core-inner >> $L/webkit-core.log 2>&1
    echo "exit $? · $(stamp)" >> $L/webkit-core.log ;;
  webkit)
    stamp > $L/webkit-all.log
    $G --light --rss-gb 8 --exclusive webkit --timeout 240 -- zsh $0 webkit-inner >> $L/webkit-all.log 2>&1
    echo "exit $? · $(stamp)" >> $L/webkit-all.log ;;
  bundle)
    glog bundle --timeout 20 -- zsh $S/../../pass-3/floor-v2/probes/bundle.sh $WT "HEAD + floor v3 + D4-F" ;;
  *) echo "usage: see the header"; exit 2 ;;
esac
