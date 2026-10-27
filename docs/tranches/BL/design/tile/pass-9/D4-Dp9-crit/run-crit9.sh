#!/bin/zsh
# D4-D′ pass-9 CRITIC seat driver (fresh seat; REGISTRY §P8-6 seat 2). It is the pass-8 critic's driver
# (../../pass-8/D4-Dp8-crit/run-crit8.sh) re-pointed to this seat's worktree and logs, running pass 8's two critic probes
# from where they sit (crit-c1-states.mjs AS FIXED: supportedEntryTypes asked first), plus this seat's attacks:
#   crit9-c1           O-103c's condition sub-pixel, inside the option (label, count, line count), held press included,
#                      on C1, C1 with a ladder of long labels at 192 px, and C1 under L-3's bare (route ./routes/A9)
#   apply              (this run) a CSS-file writer that is no declaration: `@apply [--selection-tile:flush]` on the
#                      card's group in base.css. Both static readers walk declarations only in .css; FACT reads paint
#   concat, esc        two more writer spellings against SHEET and the unit twin: the name built by concatenation in
#                      .ts, and the name CSS-escaped in a sheet (`--selection\-tile`, the same ident to the engine);
#                      esc is also built and read by FACT (paint)
# H8 4159e027cdcf is read unedited. Same build: HEAD + floor-v6.patch (09e74243) + D4-Dp8.patch (b5f4ae22) = 5d08df87ebbe.
# --- the pass-8 header follows ---
# D4-D′ pass-8 CRITIC seat driver. Own worktree at HEAD + floor-v6.patch (09e74243) + D4-Dp8.patch (b5f4ae22), own logs.
# Re-pointed from the pass-8 BUILD driver (../run-b8.sh) and the pass-7 critic's (../../pass-7/D4-Dp-crit/run-crit.sh):
# the battery, H8/H7/H6 cells, H5's FACT matrix, SHEET, CANON, REPORT, the carried instruments, every unit plant (the
# pass-7 critic's full set with no -t filter, the L-1 four, the L-3 four), plus this seat's attacks:
#   crit-const-name   a fifth writer spelling (the property name held in a constant) against SHEET and the unit twin
#   crit-c1-states    O-103c's condition by real input (click, hover, press, focus, keys) at 390 and 1440
#   crit-l3           L-3: only the fill and the corner, the 3:1 carrier kept, five modes
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8. Browser
# runs never take --light. Every run that may start Playwright WebKit sits inside a `--exclusive webkit` hold, queued,
# never cancelled for the wait. Serial: the chain runs one stage after another.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p9/crit9
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P3=$T/pass-3; P4=$T/pass-4; P5=$T/pass-5; P6=$T/pass-6; P7=$T/pass-7; S8=$T/pass-8; S8C=$S8/D4-Dp8-crit; S=$T/pass-9/D4-Dp9-crit; L=$S/logs; RA9=$S/routes/A9
R=$S8/routes/D4-Dp8; RL3=$S8/routes/L3; RL3P=$S8/routes/L3-plant-on-item
FV6=$P7/floor-v6.patch; DP8=$S8/D4-Dp8.patch
F3=$P4/floor-v3; SP4=$P4/D4-Dp-spec; C4=$P4/D4-Dp-crit; C5=$P5/D4-Dp-crit
G=~/.claude/guard/guarded
export TILE_HARNESS_OUT=$O
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
if t.count(o)!=1: sys.exit("anchor not unique in "+p)
open(p,"w").write(t.replace(o,n,1))' "$@"; }
dsum() { (cd $WT && git diff HEAD --binary | shasum | cut -c1-12); }
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line)
PLANTS=(a s h layer foreign unlayered cq lowlayer cqoff)
BS=src/styles/utilities/base.css; TGV=src/components/toggle-group/ToggleGroup.vue; SHP=src/components/toggle-group/shape.ts
SH=src/components/toggle-group/styles.css
FOREIGN=$'\n@layer components {\n    .card > .toggle-group {\n        --selection-tile: flush;\n    }\n}\n'
VARW=$'\n@layer components {\n    .card > .toggle-group {\n        --selection-tile: var(--card-tile, flush);\n    }\n}\n'
TSW=$'\n/** a helper a later wave might add: write the tile fact from script */\nexport const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty("--selection-tile", on ? "flush" : "none");\n'
CONSTW=$'\n/** the property name held once, as a later wave might spell it */\nexport const TILE_FACT = "--selection-tile";\nexport const writeTile = (el: HTMLElement) => el.style.setProperty(TILE_FACT, "flush");\n'
CONCATW=$'\n/** the name built from parts, as a later wave might spell it */\nexport const writeTile = (el: HTMLElement) => el.style.setProperty("--selection-" + "tile", "flush");\n'
APPLYW=$'\n.card > .toggle-group {\n    @apply [--selection-tile:flush];\n}\n'
ESCW=$'\n@layer components {\n    .card > .toggle-group {\n        --selection\\-tile: flush;\n    }\n}\n'
PIN=$'            --selection-paint: inherit !important;\n'
plant() { # plant <name>: mutate the worktree (restore with unplant)
  cd $WT; mkdir -p $W/restore; cp $BS $TGV $SHP $SH $W/restore/
  case $1 in
    foreign) printf '%s' "$FOREIGN" >> $BS ;;
    var) printf '%s' "$VARW" >> $BS ;;
    static) SUB $TGV '        :data-size="props.size"' $'        :data-size="props.size"\n        style="--selection-tile: plated"' ;;
    ts) printf '%s' "$TSW" >> $SHP ;;
    const) printf '%s' "$CONSTW" >> $SHP ;;
    concat) printf '%s' "$CONCATW" >> $SHP ;;
    esc) printf '%s' "$ESCW" >> $BS ;;
    apply) printf '%s' "$APPLYW" >> $BS ;;
    unpinned) SUB $SH "$PIN" "" ;;
  esac; }
unplant() { cd $WT; cp $W/restore/base.css $BS; cp $W/restore/ToggleGroup.vue $TGV; cp $W/restore/shape.ts $SHP; cp $W/restore/styles.css $SH; rm -rf $W/restore; }

case $1 in
  state)
    F=$L/state.log; stamp > $F
    { cd $WT
      echo "HEAD $(git rev-parse --short HEAD) · floor-v6.patch $(shasum $FV6 | cut -c1-8) · D4-Dp8.patch $(shasum $DP8 | cut -c1-8)"
      git apply --numstat $FV6 | awk '{a+=$1; d+=$2; n++} END {print "floor v6: "n" files, +"a" / -"d}'
      git apply --numstat $DP8 | awk '{a+=$1; d+=$2; n++} END {print "D4-Dp8: "n" files, +"a" / -"d}'
      echo "git diff HEAD $(dsum) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"
      echo "── harness"; node -e 'import("'$HN'/lib.mjs").then(m=>console.log(JSON.stringify(m.HARNESS)))'
      echo "── every --selection-tile / --selection-paint line in src (comments included)"
      rg -n -- '--selection-(tile|paint)' src
      echo "── L-3 alias census: any other name, attribute or prop for the paint fact in src (want none)"
      rg -n -i -- 'selection-paint|data-paint|paint=|"bare"|bare:' src | rg -v -- '--selection-paint' || echo "(none)"
      echo "── ToggleGroup props"; rg -n 'shape\??:|paint\??:|bare' src/components/toggle-group/ToggleGroup.vue src/components/toggle-group/index.ts src/components/toggle-group/shape.ts
      echo "── the nesting rule's statements (L-2): 'nested' near pills in src and MIGRATION"
      rg -n -i 'nested' src/components/toggle-group/styles.css src/styles/utilities/base.css MIGRATION.md
      echo "── writer spellings no static reader sees, in src (want none): @apply of the fact, a CSS-escaped name, a built name"
      rg -n -- '@apply[^;]*--selection|--selection\\|"--selection-"\s*\+|selection-"\s*\+' src || echo "(none)"
      echo "── sites.mjs c1 (the transcription of record)"; rg -n 'c1 ' $HN/sites.mjs | head -3 ; } >> $F 2>&1
    echo "exit 0 · $(stamp)" >> $F ;;
  sheet)
    glog sheet-selftest --light --timeout 5 -- node $HN/sheet.mjs --selftest --out $O
    glog sheet --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --out $O ;;
  sheet-plants) # SHEET on the four L-1 plants and this seat's fifth spelling, each restored and the tree checked equal
    F=$L/sheet-plants.log; stamp > $F; D0=$(dsum)
    for p in foreign var static ts const concat esc apply; do
      plant $p; echo "── plant $p; git diff $(dsum)" >> $F
      $G --rss-gb 8 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --out $O >> $F 2>&1; echo "sheet exit $?" >> $F
      unplant
    done
    D1=$(dsum); echo "restored: before $D0 after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  libbuild)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  tsc)
    glog tsc --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  build)
    glog build-hold --timeout 60 -- zsh $0 build-inner ;;
  build-inner)
    for f in src src-dev dist dist-dev; do ilog build-dp8-$f node $HN/build.mjs $WT --label dp8-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do ilog build-dp8-atk-$f node $HN/build.mjs $WT --label dp8-atk-$f --out $O --flavor $f --route $HN/attack-route; done
    for f in src dist; do ilog build-l3-$f node $HN/build.mjs $WT --label l3-$f --out $O --flavor $f --route $RL3; done
    ilog build-l3-plant-on-item node $HN/build.mjs $WT --label l3-plant-on-item-src --out $O --flavor src --route $RL3P
    for f in src dist; do ilog build-a9-$f node $HN/build.mjs $WT --label a9-$f --out $O --flavor $f --route $RA9; done ;;
  plant-builds) # B-1's two CSS writers (FACT `foreign-ancestor`); L-3's unpinned library; R-3's kick deleted (pop0)
    F=$L/plant-builds.log; stamp > $F; D0=$(dsum)
    for p in foreign var esc apply; do plant $p; echo "── plant $p" >> $F; tail -6 $WT/$BS >> $F
      $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp8-plant-$p-atk-src --out $O --flavor src --route $HN/attack-route >> $F 2>&1; echo "build exit $?" >> $F
      unplant; done
    plant unpinned; echo "── plant unpinned: $(grep -c -- '--selection-paint: inherit' $WT/$SH) paint pin line(s) left" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label l3-unpinned-src --out $O --flavor src --route $RL3 >> $F 2>&1; echo "build exit $?" >> $F
    unplant
    cp $WT/$SH $W/styles.kick; sed -i '' 's/animation: toggle-group-commit 450ms/animation: none 450ms/' $WT/$SH
    echo "── plant pop0: $(grep -c 'animation: none 450ms' $WT/$SH) kick line(s) deleted" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp8-pop0-src --out $O --flavor src --route $R >> $F 2>&1; echo "build exit $?" >> $F
    cp $W/styles.kick $WT/$SH; rm -f $W/styles.kick
    D1=$(dsum); echo "restored: before $D0 after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  unit)
    glog unit-all --timeout 45 -- node $HN/unit.mjs $WT --label dp8-all --out $O ;;
  unit-plants)
    glog unit-plants-hold --timeout 60 -- zsh $0 unit-plants-inner ;;
  unit-plants-inner) # every route-owned and floor unit case against the mutation it exists to catch; no -t filter
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RCT=tests/styles/radius-role-canon.test.ts
    ST=src/components/tabs/styles/segmented.css; CS=src/styles/glass/control-surfaces.css
    LIM='    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {'
    ROUTE='    .toggle-group[data-shape="cell"] {
        --selection-tile: flush;
    }'
    P() { local n=$1; shift; ilog unit-plant-$n node $HN/unit.mjs $WT --label plant-$n --out $O "$@" $TG $RCT; }
    P clean
    P canon-a --sub "$SH|$ROUTE|$ROUTE

    :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: 12px;
    }"
    P canon-s --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-size=\"sm\"] :is(.toggle-group[data-shape=\"cell\"] .toggle-group__item) {
        border-radius: var(--radius-panel);
    }"
    P canon-h --sub "$SH|$ROUTE|$ROUTE

    .toggle-group__item:has(> * + *) {
        border-radius: 12px;
    }"
    P canon-i --sub "$SH|            border-radius: var(--radius-field) !important;
            flex-direction: column;|            border-radius: var(--radius-field);
            flex-direction: column;"
    P split --sub "$SH|$ROUTE|    .toggle-group[data-shape=\"cell\"] {
        --selection-tile: flush;

        & .toggle-group__item {
            border-radius: var(--radius-field) !important;
        }
    }"
    P no-writer --sub "$SH|        --selection-tile: flush;
    }|        --selection-tile: none;
    }"
    P guard-gone --sub "$TGV|watchEffect(() => refuseUnknown(\"ToggleGroup\", \"shape\", props.shape, TOGGLE_GROUP_SHAPES));|"
    P stamp-gone --sub "$TGV|        :data-shape=\"props.shape\"
|"
    P pin-unbounded --sub "$SH|$LIM|    @scope (.toggle-group__item) {"
    P pin-option-only --sub "$SH|        :scope,
        :scope * {|        :scope {"
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|"
    P strip-reset-gone --sub "$ST|        --selection-tile: none;
        position: relative;|        position: relative;"
    P limit-group-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.toggle-group) {"
    P crit-sm-none --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"sm\"] {
        --selection-tile: none;
    }"
    P crit-lg-plated --sub "$SH|$ROUTE|$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"lg\"] {
        --selection-tile: plated;
    }"
    P crit-strip-flush --sub "$ST|        --selection-tile: none;
        position: relative;|        --selection-tile: flush;
        position: relative;"
    P crit-limit-strip-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.segmented-tabs) {"
    P fv6-foreign-writer --sub "$BS|@property --selection-tile {|@layer components { .card > .toggle-group { --selection-tile: flush; } }
@property --selection-tile {"
    P fv6-markup-writer --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        :style=\"{ '--selection-tile': 'plated' }\""
    P fv6-second-lane-writer --sub "$SH|    @scope (.toggle-group__item) to|    .toggle-group[data-plated] { --selection-tile: plated; }
    @scope (.toggle-group__item) to"
    P fv6-flush-rule-wide --sub "$CS|        .control-surface[data-state]:where(.toggle-group__item) {|        .control-surface[data-state] {"
    # L-1: pass 6's foreign writer and pass 7's three spellings, verbatim. Want FAIL
    P crit-foreign-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: flush;
}

@property --selection-tile {"
    P crit-var-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: var(--card-tile, flush);
}

@property --selection-tile {"
    P crit-static-style --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        style=\"--selection-tile: plated\""
    P crit-ts-ternary --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
export const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty(\"--selection-tile\", on ? \"flush\" : \"none\");"
    # THIS SEAT: a fifth spelling, the name in a constant. A real write. Want FAIL (reported either way)
    P crit-const-name --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
export const TILE_FACT = \"--selection-tile\";
export const writeTile = (el: HTMLElement) => el.style.setProperty(TILE_FACT, \"flush\");"
    # PASS-9 SEAT: two more spellings. Want FAIL (reported either way)
    P crit9-concat --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
export const writeTile = (el: HTMLElement) => el.style.setProperty(\"--selection-\" + \"tile\", \"flush\");"
    P crit9-css-escape --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection\\-tile: flush;
}

@property --selection-tile {"
    # THIS RUN: a Tailwind @apply of the fact in a .css file (no declaration for postcss to walk). Want FAIL
    P crit9-apply --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    @apply [--selection-tile:flush];
}

@property --selection-tile {"
    # control: reads and a none write in script. Want PASS
    P ctl-reads --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
// --selection-tile: flush is the lane sheet's
export const readTile = (el: HTMLElement) => getComputedStyle(el).getPropertyValue(\"--selection-tile\").trim();
export const resetTile = (el: HTMLElement) => el.style.setProperty(\"--selection-tile\", \"none\");"
    # L-3: the BUILD seat's four mutations. Want FAIL
    P l3-pin-gone --sub "$SH|$PIN|"
    P l3-reset-gone --sub "$SH|        --selection-paint: auto;
|"
    P l3-tint-loose --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */
    @container not style(--selection-paint: bare) {|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */
    @container not style(--selection-tile: plated) {"
    P l3-library-writer --sub "$BS|@property --selection-tile {|@layer components { .card > .toggle-group { --selection-paint: bare; } }
@property --selection-tile {"
    # THIS SEAT, L-3: an alias (a second name for the opt-out on the group) and a third rule under the query. Want FAIL
    P crit-l3-alias --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */|    @container style(--toggle-group-bare: 1) {
        .toggle-group__item[data-state=\"on\"] { background-color: transparent; border-radius: 0; }
    }

    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */"
    P crit-l3-third-rule --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */|    @container not style(--selection-paint: bare) {
        .toggle-group__item[data-state=\"on\"] { font-weight: 600; }
    }

    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */" ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v6 + D′ v8 (critic)" ;;
  xscript)
    glog xscript-self --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$R --out $O
    glog xscript-pair --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$P7/H7/routes/D4-Dp --out $O ;;
  h-inner) # $2 engine: CANON clean + nine plants, FACT (src, src-dev, dist, two plants), ATTACK, CORNER, REPORT, probes
    e=$2
    ilog h-canon-$e node $HN/canon.mjs --build $B/dp8-src --out $O --engine $e
    for p in $PLANTS; do ilog h-canon-$p-$e node $HN/canon.mjs --build $B/dp8-src --out $O/plant-$p --engine $e --plant $p; done
    for f in src src-dev dist; do ilog h-fact-$f-$e node $HN/fact-split.mjs --build $B/dp8-atk-$f --out $O --engine $e; done
    for p in foreign var esc apply; do ilog h-fact-plant-$p-$e node $HN/fact-split.mjs --build $B/dp8-plant-$p-atk-src --out $O --engine $e; done
    ilog h-attack-srcdev-$e node $HN/attack.mjs --build $B/dp8-atk-src-dev --out $O --engine $e
    ilog h-attack-dist-$e node $HN/attack.mjs --build $B/dp8-atk-dist --out $O --engine $e
    ilog h-corner-$e node $HN/corner-refusal.mjs --build $B/dp8-atk-src --out $O --engine $e
    ilog h-corner-dist-$e node $HN/corner-refusal.mjs --build $B/dp8-atk-dist --out $O --engine $e
    ilog h-report-$e node $HN/report-h46.mjs --build $B/dp8-src --out $O --engine $e
    ilog probe-b3-$e node $P7/H7/probes/b3-mobile.mjs --build $B/dp8-atk-src --out $O --engine $e
    true ;;
  probes-inner) # $2 engine: carried instruments; the BUILD seat's two probes; this seat's two; the R-3 plant
    e=$2; PS=$P3/D4-Dp-spec/probes
    ilog probe-fact-write-$e node $SP4/probes/fact-write.mjs --build $B/dp8-atk-src --engine $e --out $O
    ilog probe-corner-gap-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/dp8-src --engines $e
    ilog probe-tile-geometry-$e node $F3/probes/tile-geometry.mjs --build $B/dp8-src --engine $e --corner
    ilog probe-pill-row-$e node $F3/probes/pill-row.mjs --build $B/dp8-src --engine $e
    ilog probe-unmigrated-dist-$e node $P3/floor-v2/probes/unmigrated.mjs --build $B/dp8-dist --engines $e
    ilog probe-scope-bound-$e node $P6/floor-v5/probes/scope-bound.mjs --engine $e --form all
    for part in states hover ink a11y; do ilog carried-states-$part-$e node $PS/states.mjs --build $B/dp8-src --part $part --engines $e; done
    ilog carried-states-hover-f1-$e node $PS/states.mjs --build $B/dp8-src --part hover --sites f1-migrated --engines $e
    for part in x3 x6 tone; do ilog carried-crit-$part-$e node $PS/crit.mjs --build $B/dp8-src --part $part --engines $e; done
    ilog carried-crit-desc-$e node $PS/crit.mjs --build $B/dp8-src-dev --part desc --engines $e
    for b in dp8-src dp8-src-dev dp8-dist; do ilog crit-level-$b-$e node $C4/probes/crit-level.mjs --build $B/$b --engine $e --out $O; done
    ilog crit-p5-src-$e node $C5/probes/crit-p5.mjs --build $B/dp8-atk-src --engine $e --out $O
    ilog crit-ink-$e node $C5/probes/crit-ink.mjs --build $B/dp8-src --engine $e --out $O
    for b in dp8-src dp8-dist; do ilog c1box-$b-$e node $S8/probes/c1-box.mjs --build $B/$b --out $O --engine $e; done
    for b in l3-src l3-dist l3-plant-on-item-src l3-unpinned-src; do ilog l3bare-$b-$e node $S8/probes/l3-bare.mjs --build $B/$b --out $O --engine $e; done
    for b in dp8-src dp8-dist; do ilog crit-c1-$b-$e node $S8C/probes/crit-c1-states.mjs --build $B/$b --out $O --engine $e; done
    for b in l3-src l3-dist l3-plant-on-item-src l3-unpinned-src; do ilog crit-l3-$b-$e node $S8C/probes/crit-l3.mjs --build $B/$b --out $O --engine $e; done
    for b in a9-src a9-dist; do ilog crit9-c1-$b-$e node $S/probes/crit9-c1.mjs --build $B/$b --out $O --engine $e; done
    [[ -d $B/dp8-pop0-src ]] && ilog t6-pop0-$e node $HN/t6-engagement.mjs --build $B/dp8-pop0-src --out $O/plant-pop0 --engine $e
    true ;;
  battery-inner) # $2 engine
    e=$2
    if [[ $e == chromium ]]; then ilog battery-src-chromium node $HN/run.mjs --build $B/dp8-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    else for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp8-src --out $O --engine webkit; done
         ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp8-src --out $O; fi
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-$e node $HN/$w.mjs --build $B/dp8-dist --out $O --engine $e; done
    for w in t2-one-line-stadium we-one-line; do ilog distdev-$w-$e node $HN/$w.mjs --build $B/dp8-dist-dev --out $O --engine $e; done ;;
  chromium-battery)
    glog battery-hold-chromium --timeout 90 -- zsh $0 battery-inner chromium ;;
  chromium-reads)
    glog reads-hold-chromium --timeout 90 -- zsh -c "zsh $0 h-inner chromium; zsh $0 probes-inner chromium" ;;
  webkit-a|webkit-b)
    stamp > $L/$1.log
    local inner=$([[ $1 == webkit-a ]] && echo "battery-inner webkit" || echo "reads-webkit-inner")
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 ${=inner} >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  reads-webkit-inner)
    zsh $0 h-inner webkit; zsh $0 probes-inner webkit; zsh $0 film-inner webkit ;;
  chromium-film) # G's glance pair on D′ v8: C1 (now a cell) and the preset, light and dark, fine pointer
    glog film-hold-chromium --timeout 30 -- zsh $0 film-inner chromium ;;
  film-inner)
    e=$2
    for site in c1 preset; do ilog film-$site-$e node $HN/film.mjs --pair --arms flush=$B/dp8-src --site $site --modes light,dark --pointers fine --engines $e --dest $S/frames --scratch $O/film; done ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
