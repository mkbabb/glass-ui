#!/bin/zsh
# D4-D′ pass-4 SPEC seat driver. One stage per call; every log's first and last line carry the wall clock and the load.
# Every build, unit run and browser run goes through the machine guard (--light --rss-gb 8, the path every pass-4 seat
# took after the heavy queue held the H4 seat 30 min); every run that may start Playwright WebKit also holds the
# machine-wide WebKit lock (--exclusive webkit). One heavy run at a time, serial.
#   run-dp4.sh patch | tsc | build | unit | unit-plants | battery-chromium | dist chromium | webkit-all | probes <engine> | bundle
# The worktree (HEAD + floor v3 + route.patch) and bulky outputs live in .claude/worktrees/bl/D4/p4/D4-Dp-spec;
# the logs D4-Dp-spec.md cites live beside this file (logs/).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p4/D4-Dp-spec
WT=$W/wt; O=$W/out; B=$O/builds
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/D4-Dp-spec
F3=$S/../floor-v3
P3=$S/../../pass-3
R=$S/route
L=$S/logs
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
glog() {
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --light --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line CANON:canon)
ATK_W=(FACT:fact-split ATTACK:attack CORNER:corner-refusal REPORT:report-h46)

case $1 in
  patch) # route.patch: each touched file diffed against its HEAD + floor v3 copy (base/), never against the checkout
    out=$S/route.patch; : > $out
    for f in $(cd $W/base && find . -type f | sed 's|^\./||' | sort); do
      diff -u --label a/$f --label b/$f $W/base/$f $WT/$f >> $out
    done
    for f in src/components/toggle-group/shape.ts; do diff -u --label /dev/null --label b/$f /dev/null $WT/$f >> $out; done
    shasum $out; (cd $W && rm -rf chk && git -C /Users/mkbabb/Programming/glass-ui worktree list >/dev/null) ;;
  tsc)
    glog tsc-app --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit"
    glog tsc-test --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json" ;;
  build) # the library dist, the scene apps (route: src, src-dev, dist, dist-dev; attack: src, src-dev, dist)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT
    for f in src src-dev dist dist-dev; do glog build-dp-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-dp-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  unit)
    glog unit-all --timeout 40 -- node $HN/unit.mjs $WT --label dp-all --out $O ;;
  unit-plants) # each route-owned unit case against the mutation it exists to catch; every plant must exit 1
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RC=tests/styles/radius-role-canon.test.ts
    SH=src/components/toggle-group/styles.css; TGV=src/components/toggle-group/ToggleGroup.vue
    P() { local n=$1; shift; glog unit-plant-$n --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean $TG $RC
    # R-7: the canon unit's plants A, S, H (harness canon.mjs's three, on D′'s spelling), and I (the corner not refused)
    P canon-a --sub "$SH|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }

    :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: 12px;
    }" -t "tile corner is one declaration" $RC
    P canon-s --sub "$SH|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }

    .toggle-group[data-size=\"sm\"] :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: var(--radius-panel);
    }" -t "tile corner is one declaration" $RC
    P canon-h --sub "$SH|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }

    .toggle-group__item:has(> * + *) {
        border-radius: 12px;
    }" -t "tile corner is one declaration" $RC
    P canon-i --sub "$SH|            border-radius: var(--radius-field) !important;
            flex-direction: column;|            border-radius: var(--radius-field);
            flex-direction: column;" -t "tile corner is one declaration" $RC
    # R-10: the pass-3 split, re-planted: the declaration also writes the corner by a descendant rule
    P split --sub "$SH|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;
    }|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;

        & .toggle-group__item {
            border-radius: var(--radius-field) !important;
        }
    }" -t "tile corner is one declaration|nothing else" $TG $RC
    # the fact evaluator: the writer gone, so no twin is a tile (the law must fail, not pass vacuously)
    P no-writer --sub "$SH|        --selection-tile: flush;
    }|        --selection-tile: none;
    }" -t "tile corner is one declaration" $RC
    # FV-10 on shape: the guard deleted; the stamp deleted
    P guard-gone --sub "$TGV|watchEffect(() => refuseUnknown(\"ToggleGroup\", \"shape\", props.shape, TOGGLE_GROUP_SHAPES));|" -t "shape stamps" $TG
    P stamp-gone --sub "$TGV|        :data-shape=\"props.shape\"
|" -t "shape stamps" $TG ;;
  battery-chromium)
    glog battery-src-chromium --timeout 240 -- node $HN/run.mjs --build $B/dp-src --attack $B/dp-atk-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E,CANON,FACT,ATTACK,CORNER,REPORT ;;
  rechrome) # T-1..T-3 again in Chromium: commit 10c89b18c moved the harness hash mid-battery (e40bfd88 -> a26206b6)
    for w in T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates; do
      glog rechrome-${w%%:*} --timeout 30 -- node $HN/${w#*:}.mjs --build $B/dp-src --out $O --engine chromium; done ;;
  dist) # $2 engine: T-2, T-5, W-E on dist; the attack set on the attack dist; ATTACK on the attack src-dev
    e=$2; ex=(); [[ $e == webkit ]] && ex=(--exclusive webkit)
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog dist-$w-$e $ex --timeout 60 -- node $HN/$w.mjs --build $B/dp-dist --out $O --engine $e; done
    for w in fact-split attack corner-refusal; do glog atkdist-$w-$e $ex --timeout 60 -- node $HN/$w.mjs --build $B/dp-atk-dist --out $O --engine $e; done
    glog atkdev-attack-$e $ex --timeout 60 -- node $HN/attack.mjs --build $B/dp-atk-src-dev --out $O --engine $e ;;
  probes-inner) # $2 engine: the seat's probes, each with its own log
    e=$2
    log() { local F=$L/$1.log; shift; stamp > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
    log probe-canon-fact-$e node $S/probes/canon-fact.mjs --build $B/dp-src --engine $e --out $O
    for pl in a s h; do log probe-canon-fact-plant-$pl-$e node $S/probes/canon-fact.mjs --build $B/dp-src --engine $e --plant $pl --out $O; done
    log probe-fact-write-$e node $S/probes/fact-write.mjs --build $B/dp-atk-src --engine $e --out $O
    log probe-corner-gap-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/dp-src --engines $e
    log probe-tile-geometry-$e node $F3/probes/tile-geometry.mjs --build $B/dp-src --engine $e --corner
    log probe-pill-row-$e node $F3/probes/pill-row.mjs --build $B/dp-src --engine $e
    log probe-unmigrated-dist-$e node $P3/floor-v2/probes/unmigrated.mjs --build $B/dp-dist --engines $e ;;
  probes)
    ex=(); [[ $2 == webkit ]] && ex=(--exclusive webkit)
    stamp > $L/probes-$2.log
    $G --light --rss-gb 8 $ex --timeout 90 -- zsh $0 probes-inner $2 >> $L/probes-$2.log 2>&1
    echo "exit $? · $(stamp)" >> $L/probes-$2.log ;;
  webkit-inner) # every Playwright WebKit read in ONE lock hold: the battery, T-8, the dist cells, the probes
    log() { local F=$L/$1.log; shift; stamp > $F; echo "in one WebKit-lock hold" >> $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
    for w in $SRC_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp-src --out $O --engine webkit; done
    for w in $ATK_W; do log src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp-atk-src --out $O --engine webkit; done
    log src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp-src --out $O
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do log dist-$w-webkit node $HN/$w.mjs --build $B/dp-dist --out $O --engine webkit; done
    for w in fact-split attack corner-refusal; do log atkdist-$w-webkit node $HN/$w.mjs --build $B/dp-atk-dist --out $O --engine webkit; done
    log atkdev-attack-webkit node $HN/attack.mjs --build $B/dp-atk-src-dev --out $O --engine webkit
    zsh $0 probes-inner webkit ;;
  webkit-all)
    stamp > $L/webkit-all.log
    $G --light --rss-gb 8 --exclusive webkit --timeout 240 -- zsh $0 webkit-inner >> $L/webkit-all.log 2>&1
    echo "exit $? · $(stamp)" >> $L/webkit-all.log ;;
  bundle)
    glog bundle --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v3 + D′ pass-4" ;;
  *) echo "usage: see the header"; exit 2 ;;
esac
