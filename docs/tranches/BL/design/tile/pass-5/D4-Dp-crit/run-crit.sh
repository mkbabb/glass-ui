#!/bin/zsh
# D4-D′ pass-5 CRITIC seat driver. Own worktree at HEAD + floor-v4.patch + D4-Dp.patch (pass-5), own logs. The pass-4
# critic's driver (../../pass-4/D4-Dp-crit/run-crit.sh) re-pointed onto floor v4, H5 and the H5 pass-5 route dir, plus:
# FV4-1's sheet plants, the F route's H5 cells (FACT matrix, CANON + nine plants, ATTACK, CORNER, REPORT) on a state
# switch, XSCRIPT, and this seat's probes (probes/). One stage per call; every log's first and last line carry the
# wall clock and the 1/5/15-min load.
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8. Browser
# runs never take --light; only the typecheck, the engine-free XSCRIPT and the unit runs do. Every run that may start
# Playwright WebKit sits inside a `--exclusive webkit` hold (two holds: wk-a the battery, wk-b the H5 cells and probes).
# Serial: one heavy run at a time.
#   run-crit.sh tsc | libbuild | build | unit | unit-plants | bundle | pop0-build | state <dp|f> | build-f
#               chromium-battery | chromium-reads | webkit-a | webkit-b | xscript
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/D4-Dp-crit
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P5=$T/pass-5; S=$P5/D4-Dp-crit; L=$S/logs
R=$P5/H5/routes/D4-Dp; RF=$P5/H5/routes/D4-F
P3=$T/pass-3; P4=$T/pass-4; F3=$P4/floor-v3; SP4=$P4/D4-Dp-spec; C4=$P4/D4-Dp-crit; FV=$P5/floor-v4
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
glog() { # glog <name> [guard opts] -- <cmd>
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; stamp > $F
  $G --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
ilog() { local F=$L/$1.log; shift; stamp > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; } # inside a hold
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line)
PLANTS=(a s h layer foreign unlayered cq lowlayer cqoff)

case $1 in
  tsc)
    glog tsc --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  libbuild)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  build) # the scene apps: route (H5 pass-5 dir) src, src-dev, dist, dist-dev; attack src, src-dev, dist
    for f in src src-dev dist dist-dev; do glog build-dp-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-dp-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  unit)
    glog unit-all --light --timeout 45 -- node $HN/unit.mjs $WT --label dp-all --out $O ;;
  unit-plants) # every route-owned and FV4-1 unit case against the mutation it exists to catch; every plant must exit 1
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RC=tests/styles/radius-role-canon.test.ts
    SH=src/components/toggle-group/styles.css; TGV=src/components/toggle-group/ToggleGroup.vue
    ROUTE='    .toggle-group[data-shape="cell"] {
        --selection-tile: flush;
    }'
    P() { local n=$1; shift; glog unit-plant-$n --light --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean $TG $RC
    P canon-a --sub "$SH|$ROUTE|$ROUTE

    :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: 12px;
    }" -t "tile corner is one declaration" $RC
    P canon-s --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-size=\"sm\"] :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: var(--radius-panel);
    }" -t "tile corner is one declaration" $RC
    P canon-h --sub "$SH|$ROUTE|$ROUTE

    .toggle-group__item:has(> * + *) {
        border-radius: 12px;
    }" -t "tile corner is one declaration" $RC
    P canon-i --sub "$SH|            border-radius: var(--radius-field) !important;
            flex-direction: column;|            border-radius: var(--radius-field);
            flex-direction: column;" -t "tile corner is one declaration" $RC
    P split --sub "$SH|$ROUTE|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;

        & .toggle-group__item {
            border-radius: var(--radius-field) !important;
        }
    }" -t "tile corner is one declaration|nothing else" $TG $RC
    P no-writer --sub "$SH|        --selection-tile: flush;
    }|        --selection-tile: none;
    }" -t "tile corner is one declaration" $RC
    P guard-gone --sub "$TGV|watchEffect(() => refuseUnknown(\"ToggleGroup\", \"shape\", props.shape, TOGGLE_GROUP_SHAPES));|" -t "shape stamps" $TG
    P stamp-gone --sub "$TGV|        :data-shape=\"props.shape\"
|" -t "shape stamps" $TG
    # FV4-1 (floor v4's sheet case), re-run on the route state
    P pin-unbounded --sub "$SH|    @scope (.toggle-group__item) to (.toggle-group) {|    @scope (.toggle-group__item) {" -t "the sheet" $TG
    P pin-option-only --sub "$SH|        :scope,
        :scope * {|        :scope {" -t "the sheet" $TG
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|" -t "the sheet" $TG
    # CRITIC: the amended R-10 unit collects only tile values. A second writer of `none` at sm is a second spelling of
    # the fact; does any unit see it? (want: the canon case's facts48 fails)
    P crit-sm-none --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"sm\"] {
        --selection-tile: none;
    }" $TG $RC
    # CRITIC: a second tile writer of `plated` on a size (the amended R-10 writer list must catch it)
    P crit-lg-plated --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"lg\"] {
        --selection-tile: plated;
    }" -t "nothing else" $TG ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v4 + D′ pass-5" ;;
  pop0-build) # R-3's plant: the kick deleted, a scene build, restored and checked by cmp
    SH=$WT/src/components/toggle-group/styles.css; cp $SH $W/styles.kick
    sed -i '' 's/animation: toggle-group-commit 450ms/animation: none 450ms/' $SH
    glog build-dp-pop0-src --timeout 15 -- zsh -c "grep -c 'animation: none 450ms' $SH; node $HN/build.mjs $WT --label dp-pop0-src --out $O --flavor src --route $R"
    cp $W/styles.kick $SH; cmp -s $SH $W/styles.kick && echo "restored kick · $(stamp)" >> $L/build-dp-pop0-src.log ;;
  state) # the worktree at HEAD + floor v4 + the named route
    F=$L/state-$2.log; stamp > $F
    { cd $WT
      for x in $P5/D4-Dp.patch $P5/D4-F.patch; do git apply --check -R $x 2>/dev/null && git apply -R $x && echo "reverse-applied ${x:t}"; done
      git apply --check -R $P5/floor-v4.patch && echo "floor v4 in place ($(shasum $P5/floor-v4.patch | cut -c1-8))"
      [[ $2 == dp ]] && P=$P5/D4-Dp.patch || P=$P5/D4-F.patch
      git apply --check $P && git apply $P && echo "applied ${P:t} ($(shasum $P | cut -c1-8))"
      echo "git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  build-f)
    glog build-f-src --timeout 15 -- node $HN/build.mjs $WT --label f-src --out $O --flavor src --route $RF
    for f in src src-dev; do glog build-f-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label f-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  h5-inner) # $2 route tag (dp|f), $3 engine: H5's cells on the route: CANON clean + nine plants, FACT matrix src + src-dev, ATTACK src-dev, CORNER, REPORT
    x=$2; e=$3
    ilog h5-$x-canon-$e node $HN/canon.mjs --build $B/$x-src --out $O --engine $e
    for p in $PLANTS; do ilog h5-$x-canon-$p-$e node $HN/canon.mjs --build $B/$x-src --out $O/plant-$p --engine $e --plant $p; done
    ilog h5-$x-fact-src-$e node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
    ilog h5-$x-fact-srcdev-$e node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    ilog h5-$x-attack-srcdev-$e node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    ilog h5-$x-corner-$e node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
    ilog h5-$x-report-$e node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
    [[ $x == dp ]] && { ilog h5-dp-report-attack-$e node $HN/report-h46.mjs --build $B/dp-atk-src --out $O --engine $e
      ilog h5-dp-fact-dist-$e node $HN/fact-split.mjs --build $B/dp-atk-dist --out $O --engine $e
      ilog h5-dp-attack-dist-$e node $HN/attack.mjs --build $B/dp-atk-dist --out $O --engine $e
      ilog h5-dp-corner-dist-$e node $HN/corner-refusal.mjs --build $B/dp-atk-dist --out $O --engine $e; }
    true ;;
  probes-inner) # $2 engine: the carried probes and instruments, re-read on THIS build, plus this seat's probes
    e=$2; PS=$P3/D4-Dp-spec/probes
    ilog probe-canon-fact-$e node $SP4/probes/canon-fact.mjs --build $B/dp-src --engine $e --out $O
    for pl in a s h; do ilog probe-canon-fact-plant-$pl-$e node $SP4/probes/canon-fact.mjs --build $B/dp-src --engine $e --plant $pl --out $O; done
    ilog probe-fact-write-$e node $SP4/probes/fact-write.mjs --build $B/dp-atk-src --engine $e --out $O
    ilog probe-corner-gap-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/dp-src --engines $e
    ilog probe-tile-geometry-$e node $F3/probes/tile-geometry.mjs --build $B/dp-src --engine $e --corner
    ilog probe-pill-row-$e node $F3/probes/pill-row.mjs --build $B/dp-src --engine $e
    ilog probe-unmigrated-dist-$e node $P3/floor-v2/probes/unmigrated.mjs --build $B/dp-dist --engines $e
    ilog probe-scope-bound-$e node $FV/probes/scope-bound.mjs --engine $e --form all
    for part in states hover ink a11y; do ilog carried-states-$part-$e node $PS/states.mjs --build $B/dp-src --part $part --engines $e; done
    ilog carried-states-hover-f1-$e node $PS/states.mjs --build $B/dp-src --part hover --sites f1-migrated --engines $e
    for part in x3 x6 tone; do ilog carried-crit-$part-$e node $PS/crit.mjs --build $B/dp-src --part $part --engines $e; done
    ilog carried-crit-desc-$e node $PS/crit.mjs --build $B/dp-src-dev --part desc --engines $e
    for b in dp-src dp-src-dev dp-dist; do ilog crit-level-$b-$e node $C4/probes/crit-level.mjs --build $B/$b --engine $e --out $O; done
    ilog crit-p5-src-$e node $S/probes/crit-p5.mjs --build $B/dp-atk-src --engine $e --out $O
    ilog crit-p5-srcdev-$e node $S/probes/crit-p5.mjs --build $B/dp-atk-src-dev --engine $e --out $O
    ilog crit-ink-$e node $S/probes/crit-ink.mjs --build $B/dp-src --engine $e --out $O
    [[ -d $B/dp-pop0-src ]] && ilog t6-pop0-$e node $HN/t6-engagement.mjs --build $B/dp-pop0-src --out $O/plant-pop0 --engine $e
    true ;;
  chromium-battery) # T-1..T-7, W-A..W-E on the route src build; T-2, T-5, W-E on dist
    glog battery-src-chromium --timeout 90 -- node $HN/run.mjs --build $B/dp-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog dist-$w-chromium --timeout 30 -- node $HN/$w.mjs --build $B/dp-dist --out $O --engine chromium; done ;;
  chromium-reads) # H5 cells on D′ (and F when built), the probes
    glog h5-dp-chromium --timeout 60 -- zsh $0 h5-inner dp chromium
    [[ -d $B/f-src ]] && glog h5-f-chromium --timeout 60 -- zsh $0 h5-inner f chromium
    glog probes-chromium --timeout 90 -- zsh $0 probes-inner chromium ;;
  webkit-a-inner)
    for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp-src --out $O --engine webkit; done
    ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp-src --out $O
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-webkit node $HN/$w.mjs --build $B/dp-dist --out $O --engine webkit; done ;;
  webkit-b-inner)
    zsh $0 h5-inner dp webkit
    [[ -d $B/f-src ]] && zsh $0 h5-inner f webkit
    zsh $0 probes-inner webkit ;;
  webkit-a|webkit-b)
    stamp > $L/$1.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 $1-inner >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  xscript) # engine-free: the two pass-5 route dirs' K2 equal once the declaration is removed, no consumer paint
    glog xscript --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$RF --out $O ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
