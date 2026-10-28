#!/bin/zsh
# D4 pass 11 · RE-MEASURE seat driver (REGISTRY §P10-6). This file is pass-10's run-b10.sh with three lines changed and
# nothing else: W (this seat's scratch, .claude/worktrees/bl/D4/p11/remeasure11), L (logs in pass-11/logs) and the
# film's --dest (pass-11/frames). Every stage, plant text, probe, route (pass-10/routes/D4-Dp10) and the harness (H9
# 932637d53662, unedited) are pass 10's. `diff ../pass-10/run-b10.sh run-r11.sh` shows exactly this header and those lines.
# The resume-only stage `rebuild-verify` is not in this seat's chain (no earlier copy of this seat's builds exists).
# D4 pass 10 · BUILD seat driver (REGISTRY §P9-6). D′ v9 = HEAD + floor-v6.patch (09e74243) + pass-10/D4-Dp10.patch, built
# in the seat's own worktree, read under harness H9 (H8 + T-4's L-5 cell, SHEET on the built sheet and the script literal
# reader, FACT's reached-script plant and the `l3-bare` fold, L-4 in sites.mjs, plants.mjs). Re-pointed from the pass-9
# critic's driver (../pass-9/D4-Dp9-crit/run-crit9.sh): its stages, plus the L-5 pair, the SHEET plants on built sheets,
# FACT's new plants, and the five re-reads (a)-(e). Library plants come from harness/plants.mjs, whose restore checks
# the patches' new untracked files by content (the pass-9 driver's blind spot).
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8; browser runs
# never take --light; every run that may start Playwright WebKit sits inside a `--exclusive webkit` hold, queued and
# never cancelled for the wait. Serial: the chain runs one stage after another.
#   run-b10.sh state | patch | sheet | libbuild | tsc | build | plant-builds | sheet-plants | unit | unit-plants | bundle
#              xscript | chromium-battery | chromium-reads | chromium-film | webkit-a | webkit-b
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p11/remeasure11
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P3=$T/pass-3; P7=$T/pass-7; S8=$T/pass-8; S8C=$S8/D4-Dp8-crit; S=$T/pass-10; S11=$T/pass-11; L=$S11/logs
R=$S/routes/D4-Dp10; FV6=$P7/floor-v6.patch; DP10=$S/D4-Dp10.patch
G=~/.claude/guard/guarded
export TILE_HARNESS_OUT=$O
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
hn() { node -e 'import("'$HN'/lib.mjs").then(m=>console.log(m.HARNESS.rev+" "+m.HARNESS.hash+" ("+m.HARNESS.files+" files)"))'; }
glog() { # glog <name> [guard opts] -- <cmd>
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  local F=$L/$name.log; echo "$(stamp) · harness $(hn)" > $F
  $G --rss-gb 8 $gopts -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}
ilog() { local F=$L/$1.log; shift; echo "$(stamp) · harness $(hn)" > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; } # inside a hold
pst() { node $HN/plants.mjs $WT state; }
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line)
PLANTS=(a s h layer foreign unlayered cq lowlayer cqoff)
BS=src/styles/utilities/base.css; TGV=src/components/toggle-group/ToggleGroup.vue; SHP=src/components/toggle-group/shape.ts
SH=src/components/toggle-group/styles.css
FACT_PLANTS=(foreign var esc apply concat unpinned)   # attack builds, read by FACT (and by SHEET: each is a fresh build)
SHEET_ONLY=(static ts const)                          # script plants: an attack build each, so SHEET's built sheet is not stale

case $1 in
  state)
    F=$L/state.log; echo "$(stamp) · harness $(hn)" > $F
    { cd $WT
      echo "HEAD $(git rev-parse --short HEAD) · floor-v6.patch $(shasum $FV6 | cut -c1-8) · D4-Dp10.patch $(shasum $DP10 | cut -c1-8)"
      git apply --numstat $FV6 | awk '{a+=$1; d+=$2; n++} END {print "floor v6: "n" files, +"a" / -"d}'
      git apply --numstat $DP10 | awk '{a+=$1; d+=$2; n++} END {print "D4-Dp10: "n" files, +"a" / -"d}'
      echo "$(pst) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"
      echo "── every --selection-tile / --selection-paint line in src (comments included)"
      rg -n -- '--selection-(tile|paint)' src
      echo "── every font-weight in the lane sheet (want the item's rest 500 only)"
      rg -n 'font-weight' $SH
      echo "── every 'weight' in the lane sheet, the L-3 unit comment and MIGRATION's selection bullets (records, E-3)"
      rg -n -i 'weight' $SH | rg -v 'motion-weight|rest weight \(1/φ\)'
      rg -n -i -B1 -A1 'rest weight \(it was 600\)|selected ink, and a$' MIGRATION.md
      echo "── writer spellings no static reader sees, in src (want none): @apply of the fact, a CSS-escaped name, a built name"
      rg -n -- '@apply[^;]*--selection|--selection\\|"--selection-"\s*\+|selection-"\s*\+' src || echo "(none)"
      echo "── sites.mjs c1 (the transcription of record, L-4)"; rg -n 'aria-label="Status"' $HN/sites.mjs ; } >> $F 2>&1
    echo "exit 0 · $(stamp)" >> $F ;;
  patch) # D4-Dp10.patch is clean on HEAD + floor v6: reverse it out, check the tree equals floor v6, re-apply
    F=$L/patch-check.log; echo "$(stamp) · harness $(hn)" > $F
    { cd $WT; D0=$(pst)
      echo "D4-Dp10.patch sha1 $(shasum $DP10 | cut -d' ' -f1)"
      git apply -R --check $DP10 && git apply -R $DP10 && echo "reversed D4-Dp10.patch"
      for d in src tests demo MIGRATION.md; do diff -rq $W/base-fv6/$d $WT/$d > /dev/null && echo "$d equals HEAD + floor v6" || echo "$d DIFFERS from HEAD + floor v6"; done
      git apply --check $DP10 && echo "git apply --check D4-Dp10.patch on HEAD + floor v6: clean" && git apply $DP10
      D1=$(pst); echo "before: $D0"; echo "after:  $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))"
      echo "post-apply git diff HEAD --binary | shasum: $(git diff HEAD --binary | shasum)"
      echo "shape.ts $(shasum $SHP) · guard.ts $(shasum src/components/_shared/guard.ts)"; } >> $F 2>&1
    echo "exit 0 · $(stamp)" >> $F ;;
  rebuild-verify) # RESUME (2026-10-27): the worktree was re-created at the new HEAD; rebuild three builds of record
    # under fresh labels and compare their served bytes with the builds the first chain read (only build.json may differ)
    glog rebuild-verify --timeout 30 -- zsh $0 rebuild-verify-inner ;;
  rebuild-verify-inner)
    node $HN/libbuild.mjs $WT
    for spec in src:$R dist:$R src:$HN/attack-route; do f=${spec%%:*}; rt=${spec#*:}; a=$([[ $rt == $R ]] && echo dp10 || echo dp10-atk)
      node $HN/build.mjs $WT --label ${a}v-$f --out $O --flavor $f --route $rt > /dev/null
      # the label is written into the JS chunk's `//#region <build dir>` comments (and so its content-hashed filename);
      # the comparison strips it: CSS byte for byte, JS with the label normalised, app/ byte for byte
      css0=$(cat $B/$a-$f/dist/assets/*.css | shasum | cut -c1-12); css1=$(cat $B/${a}v-$f/dist/assets/*.css | shasum | cut -c1-12)
      js0=$(cat $B/$a-$f/dist/assets/*.js | sed "s#/builds/$a-$f/#/builds/LABEL/#g" | shasum | cut -c1-12)
      js1=$(cat $B/${a}v-$f/dist/assets/*.js | sed "s#/builds/${a}v-$f/#/builds/LABEL/#g" | shasum | cut -c1-12)
      diff -r $B/$a-$f/app $B/${a}v-$f/app > /dev/null && app=equal || app=DIFFERS
      [[ $css0 == $css1 && $js0 == $js1 && $app == equal ]] && v=EQUAL || v=DIFFERS
      echo "$a-$f vs its rebuild at $(git -C $WT rev-parse --short HEAD): $v · css $css0 / $css1 · js (label stripped) $js0 / $js1 · app/ $app"
    done ;;
  sheet-lane-plants) # RESUME: the three unit-only plants whose CSS-arm failure the dropped twin arm no longer reads
    # (crit-lg-plated, crit-strip-flush, fv6-second-lane-writer), applied with the unit stage's exact text, built, read
    # by SHEET on the built sheet, restored and checked by plants.mjs's state line. Want SHEET FAIL on each
    glog sheet-lane-plants --timeout 20 -- zsh $0 sheet-lane-plants-inner ;;
  sheet-lane-plants-inner)
    ST=src/components/tabs/styles/segmented.css
    ROUTE='    .toggle-group[data-shape="cell"] {
        --selection-tile: flush;
    }'
    LIM='    @scope (.toggle-group__item) to'
    sp() { # sp <name> <file> <old> <new>
      local n=$1 f=$WT/$2; local s0=$(pst); cp $f $O/lane-restore
      node -e 'const fs=require("fs"),[f,o,n]=process.argv.slice(1),t=fs.readFileSync(f,"utf8");if(t.split(o).length!==2){console.error("anchor not unique: "+o.slice(0,60));process.exit(2)}fs.writeFileSync(f,t.replace(o,n))' $f "$3" "$4" || return
      node $HN/build.mjs $WT --label dp10-lane-$n --out $O --flavor src --route $R > /dev/null; echo "── $n: build exit $?"
      node $HN/sheet.mjs --wt $WT --route $R --built $B/dp10-lane-$n --out $O | grep -E "writers|^SHEET"
      cp $O/lane-restore $f; local s1=$(pst); echo "restore: $([[ $s0 == $s1 ]] && echo equal || echo DIFFERS) · $s1"
    }
    sp crit-lg-plated src/components/toggle-group/styles.css "$ROUTE" "$ROUTE

    .toggle-group[data-shape=\"cell\"][data-size=\"lg\"] {
        --selection-tile: plated;
    }"
    sp crit-strip-flush $ST "        --selection-tile: none;
        position: relative;" "        --selection-tile: flush;
        position: relative;"
    sp fv6-second-lane-writer src/components/toggle-group/styles.css "$LIM" "    .toggle-group[data-plated] { --selection-tile: plated; }
$LIM" ;;
  sheet) # the self-test is engine-free; the reads need the clean builds (stage build)
    glog sheet-selftest --light --timeout 5 -- node $HN/sheet.mjs --selftest --out $O ;;
  sheet-clean)
    for b in dp10-src dp10-atk-src; do glog sheet-$b --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --built $B/$b --out $O; done ;;
  libbuild)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  tsc)
    glog tsc --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  build)
    glog build-hold --timeout 60 -- zsh $0 build-inner ;;
  build-inner)
    for f in src src-dev dist dist-dev; do ilog build-dp10-$f node $HN/build.mjs $WT --label dp10-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do ilog build-dp10-atk-$f node $HN/build.mjs $WT --label dp10-atk-$f --out $O --flavor $f --route $HN/attack-route; done ;;
  plant-builds) # every library plant, applied by plants.mjs, built, restored and checked (diff, status, new files)
    F=$L/plant-builds.log; echo "$(stamp) · harness $(hn)" > $F; echo "clean: $(pst)" >> $F
    for p in $FACT_PLANTS $SHEET_ONLY; do
      node $HN/plants.mjs $WT apply $p >> $F 2>&1 || { echo "PLANT $p NOT APPLIED" >> $F; continue; }
      $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp10-plant-$p-atk-src --out $O --flavor src --route $HN/attack-route >> $F 2>&1; echo "build exit $?" >> $F
      # SHEET reads this plant's built sheet while the worktree still holds the plant (its script half reads src)
      echo "── SHEET on plant $p" >> $F
      $G --rss-gb 8 --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --built $B/dp10-plant-$p-atk-src --out $O >> $F 2>&1; echo "sheet exit $?" >> $F
      node $HN/plants.mjs $WT restore >> $F 2>&1; echo "restore exit $?" >> $F
    done
    node $HN/plants.mjs $WT apply weight-step >> $F 2>&1
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp10-plant-weight-step-src --out $O --flavor src --route $R >> $F 2>&1; echo "build exit $?" >> $F
    node $HN/plants.mjs $WT restore >> $F 2>&1; echo "restore exit $?" >> $F
    echo "after: $(pst)" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  unit)
    glog unit-all --timeout 45 -- node $HN/unit.mjs $WT --label dp10-all --out $O ;;
  unit-plants)
    glog unit-plants-hold --timeout 75 -- zsh $0 unit-plants-inner ;;
  unit-plants-inner) # every route-owned and floor unit case against the mutation it exists to catch; no -t filter
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RCT=tests/styles/radius-role-canon.test.ts
    ST=src/components/tabs/styles/segmented.css; CS=src/styles/glass/control-surfaces.css
    LIM='    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {'
    ROUTE='    .toggle-group[data-shape="cell"] {
        --selection-tile: flush;
    }'
    PIN=$'            --selection-paint: inherit !important;\n'
    SHAPE_END='export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];'
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
    P fv6-markup-writer --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        :style=\"{ '--selection-tile': 'plated' }\""
    P fv6-second-lane-writer --sub "$SH|    @scope (.toggle-group__item) to|    .toggle-group[data-plated] { --selection-tile: plated; }
    @scope (.toggle-group__item) to"
    P fv6-flush-rule-wide --sub "$CS|        .control-surface[data-state]:where(.toggle-group__item) {|        .control-surface[data-state] {"
    # the script spellings the twin reads (L-1, L-1a). Want FAIL
    P crit-static-style --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        style=\"--selection-tile: plated\""
    P crit-ts-ternary --sub "$SHP|$SHAPE_END|$SHAPE_END
export const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty(\"--selection-tile\", on ? \"flush\" : \"none\");"
    P crit-const-name --sub "$SHP|$SHAPE_END|$SHAPE_END
export const TILE_FACT = \"--selection-tile\";
export const writeTile = (el: HTMLElement) => el.style.setProperty(TILE_FACT, \"flush\");"
    # the CSS spellings: the twin's CSS arm is dropped (one CSS reader of record: SHEET on the built sheet). Want PASS
    # here (the twin does not read CSS), FAIL on SHEET (stage plant-builds)
    P crit-foreign-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: flush;
}

@property --selection-tile {"
    P crit-var-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: var(--card-tile, flush);
}

@property --selection-tile {"
    P crit9-css-escape --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection\\-tile: flush;
}

@property --selection-tile {"
    P crit9-apply --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    @apply [--selection-tile:flush];
}

@property --selection-tile {"
    # a run-time name: no static reader resolves it (want PASS here: FACT reads it when reached, plants.mjs concat)
    P crit9-concat --sub "$SHP|$SHAPE_END|$SHAPE_END
export const writeTile = (el: HTMLElement) => el.style.setProperty(\"--selection-\" + \"tile\", \"flush\");"
    # control: reads and a none write in script. Want PASS
    P ctl-reads --sub "$SHP|$SHAPE_END|$SHAPE_END
// --selection-tile: flush is the lane sheet's
export const readTile = (el: HTMLElement) => getComputedStyle(el).getPropertyValue(\"--selection-tile\").trim();
export const resetTile = (el: HTMLElement) => el.style.setProperty(\"--selection-tile\", \"none\");"
    # L-5 (O-103e): the selected weight restored. Want FAIL (the weight case)
    P weight-step --sub "$SH|        --selection-ink: var(--selection-edge);
    }|        --selection-ink: var(--selection-edge);
        font-weight: 600;
    }"
    # L-3: the BUILD seat's four mutations and the pass-8 critic's two. Want FAIL
    P l3-pin-gone --sub "$SH|$PIN|"
    P l3-reset-gone --sub "$SH|        --selection-paint: auto;
|"
    P l3-tint-loose --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */
    @container not style(--selection-paint: bare) {|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */
    @container not style(--selection-tile: plated) {"
    P l3-library-writer --sub "$BS|@property --selection-tile {|@layer components { .card > .toggle-group { --selection-paint: bare; } }
@property --selection-tile {"
    P crit-l3-alias --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */|    @container style(--toggle-group-bare: 1) {
        .toggle-group__item[data-state=\"on\"] { background-color: transparent; border-radius: 0; }
    }

    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */"
    P crit-l3-third-rule --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */|    @container not style(--selection-paint: bare) {
        .toggle-group__item[data-state=\"on\"] { font-weight: 600; }
    }

    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */" ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v6 + D′ v9" ;;
  xscript) # engine-free. Self; the pair with pass 8's route (its C1 override now a no-op on H9's sites) and pass 7's
    glog xscript-self --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$R --out $O
    glog xscript-pair-p8 --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$S8/routes/D4-Dp8 --out $O
    glog xscript-pair-p7 --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$P7/H7/routes/D4-Dp --out $O ;;
  h-inner) # $2 engine: CANON clean + nine plants; FACT clean ×3, plants ×6, the planted L-3 composition; ATTACK, CORNER, REPORT
    e=$2
    ilog h-canon-$e node $HN/canon.mjs --build $B/dp10-src --out $O --engine $e
    for p in $PLANTS; do ilog h-canon-$p-$e node $HN/canon.mjs --build $B/dp10-src --out $O/plant-$p --engine $e --plant $p; done
    for f in src src-dev dist; do ilog h-fact-$f-$e node $HN/fact-split.mjs --build $B/dp10-atk-$f --out $O --engine $e; done
    for p in $FACT_PLANTS; do ilog h-fact-plant-$p-$e node $HN/fact-split.mjs --build $B/dp10-plant-$p-atk-src --out $O/plant-$p --engine $e; done
    ilog h-fact-l3-on-item-$e node $HN/fact-split.mjs --build $B/dp10-atk-src --out $O/plant-l3-on-item --engine $e --l3 on-item
    ilog h-attack-srcdev-$e node $HN/attack.mjs --build $B/dp10-atk-src-dev --out $O --engine $e
    ilog h-attack-dist-$e node $HN/attack.mjs --build $B/dp10-atk-dist --out $O --engine $e
    ilog h-corner-$e node $HN/corner-refusal.mjs --build $B/dp10-atk-src --out $O --engine $e
    ilog h-corner-dist-$e node $HN/corner-refusal.mjs --build $B/dp10-atk-dist --out $O --engine $e
    ilog h-report-$e node $HN/report-h46.mjs --build $B/dp10-src --out $O --engine $e
    # the fixture self-test of the two witnesses H9 changed (T-4, FACT): clean PASS, every planted fault FAIL on its cell
    ilog selftest-t4-fact-$e node $HN/selftest.mjs --out $O/selftest --only T-4,FACT --engines $e
    true ;;
  probes-inner) # $2 engine: C1BOX, CRIT-C1, the L-5 pair on the planted library, the re-reads (b), (d)
    e=$2; PS=$P3/D4-Dp-spec/probes
    for b in dp10-src dp10-dist; do ilog c1box-$b-$e node $S8/probes/c1-box.mjs --build $B/$b --out $O --engine $e; done
    for b in dp10-src dp10-dist; do ilog crit-c1-$b-$e node $S8C/probes/crit-c1-states.mjs --build $B/$b --out $O --engine $e; done
    ilog t4-weight-step-$e node $HN/t4-ring-whole.mjs --build $B/dp10-plant-weight-step-src --out $O/plant-weight-step --engine $e
    for b in dp10-src dp10-plant-weight-step-src; do ilog pill-width-$b-$e node $S/probes/pill-width.mjs --build $B/$b --out $O --engine $e; done
    ilog carried-crit-tone-$e node $PS/crit.mjs --build $B/dp10-src --part tone --engines $e
    ilog carried-states-ink-$e node $PS/states.mjs --build $B/dp10-src --part ink --engines $e
    true ;;
  battery-inner) # $2 engine: T-1..T-7, W-A..W-E on the route src build; T-2, T-4, T-5, W-E on dist; T-2, W-E on dist-dev
    e=$2
    if [[ $e == chromium ]]; then ilog battery-src-chromium node $HN/run.mjs --build $B/dp10-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    else for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp10-src --out $O --engine webkit; done
         ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp10-src --out $O; fi
    for w in t2-one-line-stadium t4-ring-whole t5-one-of-n-keys we-one-line; do ilog dist-$w-$e node $HN/$w.mjs --build $B/dp10-dist --out $O --engine $e; done
    for w in t2-one-line-stadium we-one-line; do ilog distdev-$w-$e node $HN/$w.mjs --build $B/dp10-dist-dev --out $O --engine $e; done ;;
  film-inner) # $2 engine: re-read (a), G on a pill row: D′ v9 against the planted 600, light and dark, fine and coarse; C1 and the preset on D′ v9
    e=$2
    ilog film-pill-$e node $HN/film.mjs --pair --arms d9=$B/dp10-src@single,w600=$B/dp10-plant-weight-step-src@single --site single --modes light,dark --pointers fine,coarse --engines $e --dest $S11/frames --scratch $O/film
    for site in c1 preset; do ilog film-$site-$e node $HN/film.mjs --pair --arms d9=$B/dp10-src --site $site --modes light,dark --pointers fine --engines $e --dest $S11/frames --scratch $O/film; done ;;
  chromium-battery)
    glog battery-hold-chromium --timeout 90 -- zsh $0 battery-inner chromium ;;
  chromium-reads)
    glog reads-hold-chromium --timeout 90 -- zsh -c "zsh $0 h-inner chromium; zsh $0 probes-inner chromium" ;;
  chromium-film)
    glog film-hold-chromium --timeout 30 -- zsh $0 film-inner chromium ;;
  webkit-a|webkit-b|webkit-c)
    echo "$(stamp) · harness $(hn)" > $L/$1.log
    local inner=$([[ $1 == webkit-a ]] && echo "battery-inner webkit" || { [[ $1 == webkit-b ]] && echo "h-inner webkit" || echo "probes-film-webkit"; })
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 ${=inner} >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  probes-film-webkit)
    zsh $0 probes-inner webkit; zsh $0 film-inner webkit ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
