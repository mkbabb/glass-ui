#!/bin/zsh
# D4-D′ pass-7 CRITIC seat driver. Own worktree at HEAD + floor-v6.patch (09e74243) + D4-Dp.patch (714cd3c0), own logs.
# The pass-6 critic's driver (../../pass-6/D4-Dp-crit/run-crit.sh) and the floor-v6 seat's (../floor-v6/run-fv6.sh)
# re-pointed onto floor v6, H7 (6d6184295110) and pass 7's one route dir (../H7/routes/D4-Dp; Q-13 ruled D′, O-103).
# Added here: SHEET on the route and on four writer plants; FV6-1/FV6-3's unit cases under every pass-6 plant plus
# FV6's four and this seat's three; the B-1 plants as paint builds (FACT `foreign-ancestor`); H7's probe; Q-10 (b)'s
# one D′ answer measured (crit-route/: C1 declares `shape="cell"`); the G glance pair (film.mjs --pair).
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8. Browser
# runs never take --light. Every run that may start Playwright WebKit sits inside a `--exclusive webkit` hold, queued,
# never cancelled for the wait. Serial: one heavy run at a time (the chain runs stages one after another).
#   run-crit.sh state | sheet | sheet-plants | libbuild | tsc | build | plant-builds | unit | unit-plants | bundle
#               pop0-build | xscript | chromium-battery | chromium-reads | chromium-film | webkit-a | webkit-b
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/D4-Dp-crit
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P3=$T/pass-3; P4=$T/pass-4; P5=$T/pass-5; P6=$T/pass-6; P7=$T/pass-7; S=$P7/D4-Dp-crit; L=$S/logs
R=$P7/H7/routes/D4-Dp; RC=$S/crit-route; RF6=$P6/H6/routes/D4-F
FV6=$P7/floor-v6.patch; DP=$P7/D4-Dp.patch
F3=$P4/floor-v3; SP4=$P4/D4-Dp-spec; C4=$P4/D4-Dp-crit; C5=$P5/D4-Dp-crit; C6=$P6/D4-Dp-crit
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
SUB() { python3 -I -c 'import sys
p,o,n=sys.argv[1:]; t=open(p).read()
if o not in t: sys.exit("anchor missing in "+p)
open(p,"w").write(t.replace(o,n,1))' "$@"; }
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line)
C1_W=(T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-7:t7-no-consumer-paint)
PLANTS=(a s h layer foreign unlayered cq lowlayer cqoff)
BS=src/styles/utilities/base.css; TGV=src/components/toggle-group/ToggleGroup.vue; SHP=src/components/toggle-group/shape.ts
FOREIGN=$'\n@layer components {\n    .card > .toggle-group {\n        --selection-tile: flush;\n    }\n}\n'
VARW=$'\n@layer components {\n    .card > .toggle-group {\n        --selection-tile: var(--card-tile, flush);\n    }\n}\n'
TSW=$'\n/** a helper a later wave might add: write the tile fact from script */\nexport const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty("--selection-tile", on ? "flush" : "none");\n'
plant() { # plant <name>: mutate the worktree (restore with unplant)
  cd $WT; mkdir -p $W/restore; cp $BS $TGV $SHP $W/restore/
  case $1 in
    foreign) printf '%s' "$FOREIGN" >> $BS ;;
    var) printf '%s' "$VARW" >> $BS ;;
    static) SUB $TGV '        :data-size="props.size"' $'        :data-size="props.size"\n        style="--selection-tile: plated"' ;;
    ts) printf '%s' "$TSW" >> $SHP ;;
  esac; }
unplant() { cd $WT; cp $W/restore/base.css $BS; cp $W/restore/ToggleGroup.vue $TGV; cp $W/restore/shape.ts $SHP; rm -rf $W/restore; }

case $1 in
  state)
    F=$L/state.log; stamp > $F
    { cd $WT; set -x
      git apply --check $FV6 && git apply $FV6 && echo "applied floor-v6.patch ($(shasum $FV6 | cut -c1-8))"
      git apply --check $DP && git apply $DP && echo "applied D4-Dp.patch ($(shasum $DP | cut -c1-8))"
      git apply --numstat $FV6 | awk '{a+=$1; d+=$2; n++} END {print "floor v6: "n" files, +"a" / -"d}'
      git apply --numstat $DP | awk '{a+=$1; d+=$2; n++} END {print "D4-Dp: "n" files, +"a" / -"d}'
      echo "HEAD $(git rev-parse --short HEAD) · git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"
      rg -n -- '--selection-tile' src | rg -v '^\S+:\s*\d+:\s*(\*|//|/\*)' ; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  sheet)
    glog sheet --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --out $O ;;
  sheet-plants) # SHEET on four writer plants, each restored and the tree checked equal (engine-free)
    F=$L/sheet-plants.log; stamp > $F
    D0=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    for p in foreign var static ts; do
      plant $p; echo "── plant $p; git diff $(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)" >> $F
      $G --rss-gb 8 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --out $O >> $F 2>&1; echo "sheet exit $?" >> $F
      unplant
    done
    D1=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12); echo "restored: before $D0 after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  libbuild)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  tsc)
    glog tsc --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  build) # route src, src-dev, dist, dist-dev; attack src, src-dev, dist; the C1 crit route src
    for f in src src-dev dist dist-dev; do glog build-dp-$f --timeout 20 -- node $HN/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-dp-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label dp-atk-$f --out $O --flavor $f --route $HN/attack-route; done
    glog build-dp-c1-src --timeout 20 -- node $HN/build.mjs $WT --label dp-c1-src --out $O --flavor src --route $RC ;;
  plant-builds) # B-1's two CSS writers as paint builds (FACT reads `foreign-ancestor`), restored and checked
    F=$L/plant-builds.log; stamp > $F; D0=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12)
    for p in foreign var; do plant $p; echo "── plant $p" >> $F; tail -6 $WT/$BS >> $F
      $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp-plant-$p-atk-src --out $O --flavor src --route $HN/attack-route >> $F 2>&1; echo "build exit $?" >> $F
      unplant; done
    D1=$(cd $WT && git diff HEAD --binary | shasum | cut -c1-12); echo "restored: before $D0 after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  unit)
    glog unit-all --timeout 45 -- node $HN/unit.mjs $WT --label dp-all --out $O ;;
  unit-plants) # one guarded hold (the guard's per-call admission wait was 3-7 min at load 14-29); each plant its own log
    glog unit-plants-hold --timeout 60 -- zsh $0 unit-plants-inner ;;
  unit-plants-inner) # every route-owned, floor v4-v6 unit case against the mutation it exists to catch
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RCT=tests/styles/radius-role-canon.test.ts
    SH=src/components/toggle-group/styles.css; ST=src/components/tabs/styles/segmented.css; CS=src/styles/glass/control-surfaces.css
    LIM='    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {'
    ROUTE='    .toggle-group[data-shape="cell"] {
        --selection-tile: flush;
    }'
    P() { local n=$1; shift; ilog unit-plant-$n node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
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
    P pin-unbounded --sub "$SH|$LIM|    @scope (.toggle-group__item) {" -t "the sheet" $TG
    P pin-option-only --sub "$SH|        :scope,
        :scope * {|        :scope {" -t "the sheet" $TG
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|" -t "the sheet" $TG
    P strip-reset-gone --sub "$ST|        --selection-tile: none;
        position: relative;|        position: relative;" -t "the sheet" $TG
    P limit-group-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.toggle-group) {" -t "the sheet" $TG
    P crit-sm-none --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"sm\"] {
        --selection-tile: none;
    }" $TG $RCT
    P crit-lg-plated --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"lg\"] {
        --selection-tile: plated;
    }" -t "nothing else" $TG
    P crit-strip-flush --sub "$ST|        --selection-tile: none;
        position: relative;|        --selection-tile: flush;
        position: relative;" $TG $RCT
    P crit-limit-strip-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.segmented-tabs) {" $TG $RCT
    # pass 6's crit-foreign-writer, verbatim (unlayered, before @property): the case B-1 found every unit passing. Want FAIL now
    P crit-foreign-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: flush;
}

@property --selection-tile {" $TG $RCT
    # floor v6's own four (FLOOR-V6 §3), re-run
    P fv6-foreign-writer --sub "$BS|@property --selection-tile {|@layer components { .card > .toggle-group { --selection-tile: flush; } }
@property --selection-tile {" -t "floor v6" $TG
    P fv6-markup-writer --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        :style=\"{ '--selection-tile': 'plated' }\"" -t "floor v6" $TG
    P fv6-second-lane-writer --sub "$SH|    @scope (.toggle-group__item) to|    .toggle-group[data-plated] { --selection-tile: plated; }
    @scope (.toggle-group__item) to" -t "floor v6" $TG
    P fv6-flush-rule-wide --sub "$CS|        .control-surface[data-state]:where(.toggle-group__item) {|        .control-surface[data-state] {" -t "floor v6" $TG
    # THIS SEAT: three more spellings of a second writer, each a real write the engine honours. Every unit runs
    P crit-var-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: var(--card-tile, flush);
}

@property --selection-tile {" $TG $RCT
    P crit-static-style --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        style=\"--selection-tile: plated\"" $TG $RCT
    P crit-ts-ternary --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
export const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty(\"--selection-tile\", on ? \"flush\" : \"none\");" $TG $RCT ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v6 + D′ pass-7" ;;
  pop0-build) # R-3's plant: the kick deleted, a scene build, restored and checked by cmp
    SH=$WT/src/components/toggle-group/styles.css; cp $SH $W/styles.kick
    sed -i '' 's/animation: toggle-group-commit 450ms/animation: none 450ms/' $SH
    glog build-dp-pop0-src --timeout 20 -- zsh -c "grep -c 'animation: none 450ms' $SH; node $HN/build.mjs $WT --label dp-pop0-src --out $O --flavor src --route $R"
    cp $W/styles.kick $SH; cmp -s $SH $W/styles.kick && echo "restored kick · $(stamp)" >> $L/build-dp-pop0-src.log ;;
  xscript) # engine-free. The one route against itself (site paint, shared ink), and against pass 6's F dir (site equal)
    glog xscript-self --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$R --out $O
    glog xscript-pair --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$RF6 --out $O ;;
  h-inner) # $2 engine: CANON clean + nine plants, FACT (src, src-dev, dist, two plants), ATTACK, CORNER, REPORT, probe
    e=$2
    ilog h-canon-$e node $HN/canon.mjs --build $B/dp-src --out $O --engine $e
    for p in $PLANTS; do ilog h-canon-$p-$e node $HN/canon.mjs --build $B/dp-src --out $O/plant-$p --engine $e --plant $p; done
    for f in src src-dev dist; do ilog h-fact-$f-$e node $HN/fact-split.mjs --build $B/dp-atk-$f --out $O --engine $e; done
    for p in foreign var; do ilog h-fact-plant-$p-$e node $HN/fact-split.mjs --build $B/dp-plant-$p-atk-src --out $O --engine $e; done
    ilog h-attack-srcdev-$e node $HN/attack.mjs --build $B/dp-atk-src-dev --out $O --engine $e
    ilog h-attack-dist-$e node $HN/attack.mjs --build $B/dp-atk-dist --out $O --engine $e
    ilog h-corner-$e node $HN/corner-refusal.mjs --build $B/dp-atk-src --out $O --engine $e
    ilog h-corner-dist-$e node $HN/corner-refusal.mjs --build $B/dp-atk-dist --out $O --engine $e
    ilog h-report-$e node $HN/report-h46.mjs --build $B/dp-src --out $O --engine $e
    ilog h-report-attack-$e node $HN/report-h46.mjs --build $B/dp-atk-src --out $O --engine $e
    ilog probe-b3-$e node $P7/H7/probes/b3-mobile.mjs --build $B/dp-atk-src --out $O --engine $e
    true ;;
  probes-inner) # $2 engine: carried instruments re-read on this build, the C1 answer, the R-3 plant
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
    ilog crit-ink-$e node $C5/probes/crit-ink.mjs --build $B/dp-src --engine $e --out $O
    for w in $C1_W; do ilog c1cell-${w%%:*}-$e node $HN/${w#*:}.mjs --build $B/dp-c1-src --out $O/c1cell --engine $e; done
    [[ -d $B/dp-pop0-src ]] && ilog t6-pop0-$e node $HN/t6-engagement.mjs --build $B/dp-pop0-src --out $O/plant-pop0 --engine $e
    true ;;
  chromium-battery) # one guarded hold
    glog battery-hold-chromium --timeout 90 -- zsh $0 chromium-battery-inner ;;
  chromium-battery-inner) # T-1..T-7, W-A..W-E on the route src build; T-2, T-5, W-E on dist; W-E, T-2 on dist-dev
    ilog battery-src-chromium node $HN/run.mjs --build $B/dp-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-chromium node $HN/$w.mjs --build $B/dp-dist --out $O --engine chromium; done
    for w in t2-one-line-stadium we-one-line; do ilog distdev-$w-chromium node $HN/$w.mjs --build $B/dp-dist-dev --out $O --engine chromium; done ;;
  chromium-reads) # one guarded hold
    glog reads-hold-chromium --timeout 90 -- zsh -c "zsh $0 h-inner chromium; zsh $0 probes-inner chromium" ;;
  chromium-film) # G's glance pair (Q-2 (b) flush, Q-3 (a) as ruled): selected and focused-selected, light and dark, fine and coarse
    glog film-hold-chromium --timeout 30 -- zsh $0 film-inner ;;
  film-inner)
    for site in preset specimen; do ilog film-$site-chromium node $HN/film.mjs --pair --arms flush=$B/dp-src --site $site --modes light,dark --pointers fine,coarse --engines chromium --dest $S/frames --scratch $O/film; done ;;
  webkit-a-inner)
    for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp-src --out $O --engine webkit; done
    ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp-src --out $O
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-webkit node $HN/$w.mjs --build $B/dp-dist --out $O --engine webkit; done
    for w in t2-one-line-stadium we-one-line; do ilog distdev-$w-webkit node $HN/$w.mjs --build $B/dp-dist-dev --out $O --engine webkit; done ;;
  webkit-b-inner)
    zsh $0 h-inner webkit
    zsh $0 probes-inner webkit
    for site in preset specimen; do ilog film-$site-webkit node $HN/film.mjs --pair --arms flush=$B/dp-src --site $site --modes light,dark --pointers fine,coarse --engines webkit --dest $S/frames --scratch $O/film; done ;;
  webkit-a|webkit-b)
    stamp > $L/$1.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 $1-inner >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
