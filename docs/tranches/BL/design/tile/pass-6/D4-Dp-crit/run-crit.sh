#!/bin/zsh
# D4-D′ pass-6 CRITIC seat driver. Own worktree at HEAD + floor-v5.patch (de018966) + D4-Dp.patch (0046d3a6), own logs.
# The pass-5 critic's driver (../../pass-5/D4-Dp-crit/run-crit.sh) re-pointed onto floor v5, H6 and pass 6's route
# dirs (../H6/routes/), plus: FV5-2's sheet plants and this seat's unit plants; H6's cells (FACT with td/pd/`none!`)
# on `dist` as well as `src`/`src-dev`; F's route cells on a state switch; XSCRIPT; this seat's probe (probes/crit-p6.mjs
# on the route dir crit-route/). The retired pass-4 canon-fact.mjs fork is not run (REGISTRY §P5-4).
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8. Browser
# runs never take --light; only the typecheck, the engine-free XSCRIPT and the unit-plant runs do. Every run that may
# start Playwright WebKit sits inside a `--exclusive webkit` hold. Serial: one heavy run at a time.
#   run-crit.sh state <dp|f> | libbuild | tsc | build | build-f | unit | unit-plants | bundle | pop0-build | xscript
#               chromium-battery | chromium-reads | webkit-a | webkit-b
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/D4-Dp-crit
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P3=$T/pass-3; P4=$T/pass-4; P5=$T/pass-5; P6=$T/pass-6; S=$P6/D4-Dp-crit; L=$S/logs
R=$P6/H6/routes/D4-Dp; RF=$P6/H6/routes/D4-F; RC=$S/crit-route
FV5=$P6/floor-v5.patch; DP=$P6/D4-Dp.patch; DF=$P6/D4-F.patch
F3=$P4/floor-v3; SP4=$P4/D4-Dp-spec; C4=$P4/D4-Dp-crit; C5=$P5/D4-Dp-crit
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
  state) # the worktree at HEAD + floor v5 + the named route
    F=$L/state-$2.log; stamp > $F
    { cd $WT
      for x in $DP $DF; do git apply --check -R $x 2>/dev/null && git apply -R $x && echo "reverse-applied ${x:t}"; done
      git apply --check -R $FV5 && echo "floor v5 in place ($(shasum $FV5 | cut -c1-8))"
      [[ $2 == dp ]] && P=$DP || P=$DF
      git apply --check $P && git apply $P && echo "applied ${P:t} ($(shasum $P | cut -c1-8))"
      echo "git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ') · HEAD $(git rev-parse --short HEAD)"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  libbuild)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  tsc)
    glog tsc --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  build) # route (pass-6 dir) src, src-dev, dist, dist-dev; attack src, src-dev, dist; this seat's route src, dist
    for f in src src-dev dist dist-dev; do glog build-dp-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-dp-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-atk-$f --out $O --flavor $f --route $HN/attack-route; done
    for f in src dist; do glog build-dp-crit-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-crit-$f --out $O --flavor $f --route $RC; done ;;
  build-f)
    glog build-f-src --timeout 15 -- node $HN/build.mjs $WT --label f-src --out $O --flavor src --route $RF
    for f in src src-dev; do glog build-f-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label f-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  unit)
    glog unit-all --timeout 45 -- node $HN/unit.mjs $WT --label dp-all --out $O ;;
  unit-plants) # every route-owned, FV4-1 and FV5-2 unit case against the mutation it exists to catch; every plant must exit 1
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RCT=tests/styles/radius-role-canon.test.ts
    SH=src/components/toggle-group/styles.css; TGV=src/components/toggle-group/ToggleGroup.vue
    ST=src/components/tabs/styles/segmented.css; BS=src/styles/utilities/base.css
    LIM='    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {'
    ROUTE='    .toggle-group[data-shape="cell"] {
        --selection-tile: flush;
    }'
    P() { local n=$1; shift; glog unit-plant-$n --light --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean $TG $RCT
    P canon-a --sub "$SH|$ROUTE|$ROUTE

    :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: 12px;
    }" -t "tile corner is one declaration" $RCT
    P canon-s --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-size=\"sm\"] :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: var(--radius-panel);
    }" -t "tile corner is one declaration" $RCT
    P canon-h --sub "$SH|$ROUTE|$ROUTE

    .toggle-group__item:has(> * + *) {
        border-radius: 12px;
    }" -t "tile corner is one declaration" $RCT
    P canon-i --sub "$SH|            border-radius: var(--radius-field) !important;
            flex-direction: column;|            border-radius: var(--radius-field);
            flex-direction: column;" -t "tile corner is one declaration" $RCT
    P split --sub "$SH|$ROUTE|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;

        & .toggle-group__item {
            border-radius: var(--radius-field) !important;
        }
    }" -t "tile corner is one declaration|nothing else" $TG $RCT
    P no-writer --sub "$SH|        --selection-tile: flush;
    }|        --selection-tile: none;
    }" -t "tile corner is one declaration" $RCT
    P guard-gone --sub "$TGV|watchEffect(() => refuseUnknown(\"ToggleGroup\", \"shape\", props.shape, TOGGLE_GROUP_SHAPES));|" -t "shape stamps" $TG
    P stamp-gone --sub "$TGV|        :data-shape=\"props.shape\"
|" -t "shape stamps" $TG
    # the floor's sheet case (FV4-1 + FV5-2), on the route state
    P pin-unbounded --sub "$SH|$LIM|    @scope (.toggle-group__item) {" -t "the sheet" $TG
    P pin-option-only --sub "$SH|        :scope,
        :scope * {|        :scope {" -t "the sheet" $TG
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|" -t "the sheet" $TG
    P strip-reset-gone --sub "$ST|        --selection-tile: none;
        position: relative;|        position: relative;" -t "the sheet" $TG
    P limit-group-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.toggle-group) {" -t "the sheet" $TG
    # the pass-5 critic's second writers, kept
    P crit-sm-none --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"sm\"] {
        --selection-tile: none;
    }" $TG $RCT
    P crit-lg-plated --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"lg\"] {
        --selection-tile: plated;
    }" -t "nothing else" $TG
    # THIS SEAT: the strip writes a tile value instead of resetting (want: the sheet case fails)
    P crit-strip-flush --sub "$ST|        --selection-tile: none;
        position: relative;|        --selection-tile: flush;
        position: relative;" $TG $RCT
    # THIS SEAT: the limit loses the group, keeps the strip (want: the sheet case fails)
    P crit-limit-strip-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.segmented-tabs) {" $TG $RCT
    # THIS SEAT: a second writer of the tile fact in ANOTHER sheet (base.css, unlayered), outside the lane sheet D′'s R-10
    # case reads and outside the canon twins' ancestry. Every unit that names --selection-tile runs (only these two
    # files do: rg over tests/). Want: a unit fails. Exit 0 here is a coverage hole, not a paint defect
    P crit-foreign-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: flush;
}

@property --selection-tile {" $TG $RCT ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v5 + D′ pass-6" ;;
  pop0-build) # R-3's plant: the kick deleted, a scene build, restored and checked by cmp
    SH=$WT/src/components/toggle-group/styles.css; cp $SH $W/styles.kick
    sed -i '' 's/animation: toggle-group-commit 450ms/animation: none 450ms/' $SH
    glog build-dp-pop0-src --timeout 15 -- zsh -c "grep -c 'animation: none 450ms' $SH; node $HN/build.mjs $WT --label dp-pop0-src --out $O --flavor src --route $R"
    cp $W/styles.kick $SH; cmp -s $SH $W/styles.kick && echo "restored kick · $(stamp)" >> $L/build-dp-pop0-src.log ;;
  xscript) # engine-free: pass 6's route dirs (19 cells), and the pass-5 pair for the record
    glog xscript --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$RF --out $O
    glog xscript-p5pair --light --timeout 5 -- node $HN/transcribe.mjs --routes $P5/H5/routes/D4-Dp,$P5/H5/routes/D4-F --out $O ;;
  h-inner) # $2 route tag (dp|f), $3 engine: CANON clean + nine plants, FACT src + src-dev (+ dist on dp), ATTACK, CORNER, REPORT
    x=$2; e=$3
    ilog h-$x-canon-$e node $HN/canon.mjs --build $B/$x-src --out $O --engine $e
    for p in $PLANTS; do ilog h-$x-canon-$p-$e node $HN/canon.mjs --build $B/$x-src --out $O/plant-$p --engine $e --plant $p; done
    ilog h-$x-fact-src-$e node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
    ilog h-$x-fact-srcdev-$e node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    ilog h-$x-attack-srcdev-$e node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    ilog h-$x-corner-$e node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
    ilog h-$x-report-$e node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
    [[ $x == dp ]] && { ilog h-dp-report-attack-$e node $HN/report-h46.mjs --build $B/dp-atk-src --out $O --engine $e
      ilog h-dp-fact-dist-$e node $HN/fact-split.mjs --build $B/dp-atk-dist --out $O --engine $e
      ilog h-dp-attack-dist-$e node $HN/attack.mjs --build $B/dp-atk-dist --out $O --engine $e
      ilog h-dp-corner-dist-$e node $HN/corner-refusal.mjs --build $B/dp-atk-dist --out $O --engine $e; }
    true ;;
  probes-inner) # $2 engine: the carried probes and instruments, re-read on THIS build, plus this seat's probe
    e=$2; PS=$P3/D4-Dp-spec/probes
    ilog probe-fact-write-$e node $SP4/probes/fact-write.mjs --build $B/dp-atk-src --engine $e --out $O
    ilog probe-corner-gap-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/dp-src --engines $e
    ilog probe-tile-geometry-$e node $F3/probes/tile-geometry.mjs --build $B/dp-src --engine $e --corner
    ilog probe-pill-row-$e node $F3/probes/pill-row.mjs --build $B/dp-src --engine $e
    ilog probe-unmigrated-dist-$e node $P3/floor-v2/probes/unmigrated.mjs --build $B/dp-dist --engines $e
    ilog probe-scope-bound-$e node $P6/floor-v5/probes/scope-bound.mjs --engine $e --form all
    for part in states hover ink a11y; do ilog carried-states-$part-$e node $PS/states.mjs --build $B/dp-src --part $part --engines $e; done
    ilog carried-states-hover-f1-$e node $PS/states.mjs --build $B/dp-src --part hover --sites f1-migrated --engines $e
    for part in x3 x6 tone; do ilog carried-crit-$part-$e node $PS/crit.mjs --build $B/dp-src --part $part --engines $e; done
    ilog carried-crit-desc-$e node $PS/crit.mjs --build $B/dp-src-dev --part desc --engines $e
    for b in dp-src dp-src-dev dp-dist; do ilog crit-level-$b-$e node $C4/probes/crit-level.mjs --build $B/$b --engine $e --out $O; done
    ilog crit-p5-src-$e node $C5/probes/crit-p5.mjs --build $B/dp-atk-src --engine $e --out $O
    ilog crit-p5-srcdev-$e node $C5/probes/crit-p5.mjs --build $B/dp-atk-src-dev --engine $e --out $O
    ilog crit-ink-$e node $C5/probes/crit-ink.mjs --build $B/dp-src --engine $e --out $O
    ilog crit-name-lift-$e node $C5/probes/crit-name-lift.mjs --build $B/dp-src --engine $e --out $O
    for b in dp-crit-src dp-crit-dist; do ilog crit-p6-$b-$e node $S/probes/crit-p6.mjs --build $B/$b --engine $e --out $O; done
    [[ -d $B/dp-pop0-src ]] && ilog t6-pop0-$e node $HN/t6-engagement.mjs --build $B/dp-pop0-src --out $O/plant-pop0 --engine $e
    true ;;
  chromium-battery) # T-1..T-7, W-A..W-E on the route src build; T-2, T-5, W-E on dist
    glog battery-src-chromium --timeout 90 -- node $HN/run.mjs --build $B/dp-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog dist-$w-chromium --timeout 30 -- node $HN/$w.mjs --build $B/dp-dist --out $O --engine chromium; done ;;
  chromium-reads)
    glog h-dp-chromium --timeout 60 -- zsh $0 h-inner dp chromium
    [[ -d $B/f-src ]] && glog h-f-chromium --timeout 60 -- zsh $0 h-inner f chromium
    glog probes-chromium --timeout 90 -- zsh $0 probes-inner chromium ;;
  webkit-a-inner)
    for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp-src --out $O --engine webkit; done
    ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp-src --out $O
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-webkit node $HN/$w.mjs --build $B/dp-dist --out $O --engine webkit; done ;;
  webkit-b-inner)
    zsh $0 h-inner dp webkit
    [[ -d $B/f-src ]] && zsh $0 h-inner f webkit
    zsh $0 probes-inner webkit ;;
  webkit-a|webkit-b)
    stamp > $L/$1.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 $1-inner >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
