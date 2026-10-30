#!/bin/zsh
# D4 pass 12 · CRITIC driver (fresh seat; REGISTRY §P11-5 (2)), derived from the pass-11 critic's driver
# (../../pass-11/D4-Dp11-crit/run-crit11.sh): every stage, re-pointed at this seat's worktree, logs and frames; the carried
# probes (crit11-geom, crit11-c1) and route A11 are read from pass 11 unchanged; the sweep and every crit11 read pass
# `--deadline 4800`; the duplicate A11 --attack read in attack-geom-inner is dropped (attack-media-inner reads it). This
# seat adds: a11-dist (A11 on the dist flavour) read by --attack in both engines; the plant `forced-pair` (the selected
# rule's forced pair, background: Highlight + color: HighlightText, removed from the lane sheet), built on the route;
# and the ONE NAMED ATTACK, ./probes/crit12-states.mjs (--part a11y through matchMedia; --part forced, the pair and the
# fill), on dp10-src and on the plant, both engines (stages forced-chromium, webkit-g).
# Pass-11 header follows.
# D4 pass 11 · CRITIC driver (fresh seat; REGISTRY §P10-6 (2)). D′ v9 = HEAD + floor-v6.patch (09e74243) +
# pass-10/D4-Dp10.patch (538b034c), built in this seat's own worktree (.claude/worktrees/bl/D4/p12/crit12/wt), read under
# H9 (932637d53662, unedited). Derived from the pass-10 critic's driver (../../pass-10/D4-Dp10-crit/run-crit10.sh): its
# every stage, re-pointed at this worktree and at this seat's logs and frames (./logs, ./frames), minus the two
# RESUME-only stages, and with these changes:
#   - the attack reads use this seat's probes: ./probes/crit11-geom.mjs (crit10-geom, rest read after a first scroll,
#     plus a pseudo-element diff; --attack and --media plans) and ./probes/crit11-c1.mjs (crit10-c1, rest after a first
#     scroll); crit10-carrier, crit10-prt-tint and crit10-k2-diag are run from pass 10 unchanged;
#   - this seat's own route A11 (./routes/A11: A10 plus c1rtl, c1sm, c1lg, c1rich, c1multi), built on D′ v9, on the
#     planted weight-step library, and on a planted a11y library (`a11y-unexempt`: the item's exemption from
#     accessibility.css's 2 px selected border under prefers-contrast: more removed), which the --media read must FAIL;
#   - pass 10's chain2 stages (crit-css-plants, crit-l5-*) are not re-run: their findings (L-6, L-6b, L-7) are routed to
#     the landing (§P10-4) and read code src does not hold.
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8; browser runs
# never take --light; every run that may start Playwright WebKit sits inside a `--exclusive webkit` hold, queued and
# never cancelled for the wait. Serial: the chain runs one stage after another. This file is never edited while a chain
# that reads it runs (D′c10 §6); a later change is a new file.
#   run-crit11.sh <stage>   (stages: see ./chain.sh)
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p12/crit12
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P3=$T/pass-3; P7=$T/pass-7; S8=$T/pass-8; S8C=$S8/D4-Dp8-crit; S=$T/pass-10; C10=$S/D4-Dp10-crit; C=$T/pass-12/D4-Dp12-crit; L=$C/logs; A10=$C10/routes/A10; C11=$T/pass-11/D4-Dp11-crit; A11=$C11/routes/A11
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
  crit-scan) # CRITIC, engine-free: every rule in src keyed on a selected state that writes a layout-affecting property,
    # and every selected-state font, spacing, padding or border write (want: none on .toggle-group__item but the
    # perimeter ::before's opacity and the tint/ink; accessibility.css's arm exempts the item)
    F=$L/crit-scan.log; echo "$(stamp) · harness $(hn)" > $F
    { cd $WT; echo "$(pst)"
      echo "── toggle-group/styles.css: every rule whose selector names a selected state, with its declarations"
      node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8").replace(/\/\*[\s\S]*?\*\//g,"");const re=/([^{}]+)\{([^{}]*)\}/g;let m;while((m=re.exec(t))){const sel=m[1].trim().split("\n").pop().trim();if(/data-state|aria-checked|aria-pressed|data-commit/.test(sel))console.log(sel+" { "+m[2].trim().replace(/\s+/g," ")+" }")}' src/components/toggle-group/styles.css
      echo "── src: selected-state selectors that also write font-, letter-/word-spacing, padding, margin, border-width, gap, width/height (want none reaching .toggle-group__item)"
      rg -n -U --multiline-dotall '(data-state="?on|aria-checked="?true|aria-pressed="?true)[^{]*\{[^}]*(font-(weight|size|family|variation)|letter-spacing|word-spacing|padding|margin|border-width|gap:|inline-size|block-size|[^-]width:|[^-]height:)' src -g '*.css' -g '*.vue' | head -40 || echo "(none)"
      echo "── accessibility.css arms: the item's exemption"; rg -n 'not\(\.toggle-group__item\)' src/styles/accessibility.css
      echo "── ToggleGroupItem.vue: what selection stamps (attributes, classes)"; rg -n 'data-commit|data-state|:class|aria-' src/components/toggle-group/ToggleGroupItem.vue | head -20
    } >> $F 2>&1
    echo "exit 0 · $(stamp)" >> $F ;;
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
    for f in src src-dev dist; do ilog build-dp10-atk-$f node $HN/build.mjs $WT --label dp10-atk-$f --out $O --flavor $f --route $HN/attack-route; done
    for f in src dist; do ilog build-a10-$f node $HN/build.mjs $WT --label a10-$f --out $O --flavor $f --route $A10; done
    ilog build-a11-src node $HN/build.mjs $WT --label a11-src --out $O --flavor src --route $A11
    ilog build-a11-dist node $HN/build.mjs $WT --label a11-dist --out $O --flavor dist --route $A11 ;;
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
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label a10-ws-src --out $O --flavor src --route $A10 >> $F 2>&1; echo "a10 weight-step build exit $?" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label a11-ws-src --out $O --flavor src --route $A11 >> $F 2>&1; echo "a11 weight-step build exit $?" >> $F
    node $HN/plants.mjs $WT restore >> $F 2>&1; echo "restore exit $?" >> $F
    # CRITIC plant a11y-unexempt: accessibility.css's selected 2 px border under prefers-contrast: more reaches the item
    # (its `:not(.toggle-group__item)` exemption removed from the contrast arm only). Applied by text, restored by copy,
    # checked by plants.mjs state. The --media read must FAIL the contrast cells on this build
    AX=$WT/src/styles/accessibility.css; s0=$(pst); command cp $AX $O/ax-restore
    node -e 'const fs=require("fs"),[f,o,n]=process.argv.slice(1),t=fs.readFileSync(f,"utf8");if(t.split(o).length!==2){console.error("anchor not unique");process.exit(2)}fs.writeFileSync(f,t.replace(o,n))' $AX '):not(.toggle-group__item) {
            border-color: currentColor !important;' ') {
            border-color: currentColor !important;' >> $F 2>&1; echo "plant a11y-unexempt applied exit $?" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label a11-ax-src --out $O --flavor src --route $A11 >> $F 2>&1; echo "a11 a11y-unexempt build exit $?" >> $F
    command cp $O/ax-restore $AX; s1=$(pst); echo "a11y-unexempt restore: $([[ $s0 == $s1 ]] && echo equal || echo DIFFERS) · $s1" >> $F
    # CRITIC (pass 12) plant forced-pair: the selected rule's forced pair (background: Highlight; color: HighlightText)
    # removed from the lane sheet's forced-colours arm; applied by text, restored by copy, checked by plants.mjs state.
    # crit12-states --part forced must FAIL pair and fill on this build
    FP=$WT/$SH; s0=$(pst); command cp $FP $O/fp-restore
    node -e 'const fs=require("fs"),[f,o,n]=process.argv.slice(1),t=fs.readFileSync(f,"utf8");if(t.split(o).length!==2){console.error("anchor not unique");process.exit(2)}fs.writeFileSync(f,t.replace(o,n))' $FP '            border-color: Highlight;
            background: Highlight;
            color: HighlightText;' '            border-color: Highlight;' >> $F 2>&1; echo "plant forced-pair applied exit $?" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp10-plant-forced-pair-src --out $O --flavor src --route $R >> $F 2>&1; echo "forced-pair build exit $?" >> $F
    command cp $O/fp-restore $FP; s1=$(pst); echo "forced-pair restore: $([[ $s0 == $s1 ]] && echo equal || echo DIFFERS) · $s1" >> $F
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
    ilog film-pill-$e node $HN/film.mjs --pair --arms d9=$B/dp10-src@single,w600=$B/dp10-plant-weight-step-src@single --site single --modes light,dark --pointers fine,coarse --engines $e --dest $C/frames --scratch $O/film
    for site in c1 preset; do ilog film-$site-$e node $HN/film.mjs --pair --arms d9=$B/dp10-src --site $site --modes light,dark --pointers fine --engines $e --dest $C/frames --scratch $O/film; done
    # CRITIC: G on a second pill anatomy (a label and a badge), and PRT, where the level-0 plate hides the tint (CRIT10-PRT-TINT)
    ilog film-pillbadge-$e node $HN/film.mjs --pair --arms d9=$B/dp10-src@pill-badge,w600=$B/dp10-plant-weight-step-src@pill-badge --site pill-badge --modes light,dark,prt --pointers fine --engines $e --dest $C/frames --scratch $O/film
    ilog film-pill-prt-$e node $HN/film.mjs --pair --arms d9=$B/dp10-src@single,w600=$B/dp10-plant-weight-step-src@single --site single --modes prt --pointers fine --engines $e --dest $C/frames --scratch $O/film ;;
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
    zsh $0 probes-inner webkit; zsh $0 film-inner webkit; zsh $0 states-inner webkit ;;
  attack-geom-inner) # $2 engine: CRIT11-GEOM, pass 10's sweep re-run (rest after a first scroll) on D′ v9 (src, the sweep;
    # dist, quick) and on the planted weight-step (teeth); this seat's --attack (A11) on D′ v9 and on the weight-step plant
    e=$2; P11=$C11/probes
    ilog crit11-geom-a10-src-$e node $P11/crit11-geom.mjs --build $B/a10-src --out $O --engine $e --deadline 4800
    ilog crit11-geom-a10-ws-src-$e node $P11/crit11-geom.mjs --build $B/a10-ws-src --out $O/plant-ws --engine $e --quick
    ilog crit11-geom-a10-dist-$e node $P11/crit11-geom.mjs --build $B/a10-dist --out $O/dist --engine $e --quick
    true ;;
  attack-media-inner) # $2 engine: this seat's attack. CRIT11-GEOM --attack (A11) on D′ v9 and, quick, on the weight-step plant
    # (teeth); --media on D′ v9 (A11) and, on the two contrast conditions, on the a11y-unexempt plant (teeth)
    e=$2; P11=$C11/probes
    ilog crit11-geom-attack-a11-src-$e node $P11/crit11-geom.mjs --build $B/a11-src --out $O/a11 --engine $e --attack
    ilog crit11-geom-attack-a11-ws-src-$e node $P11/crit11-geom.mjs --build $B/a11-ws-src --out $O/a11-ws --engine $e --attack --quick
    ilog crit11-geom-media-a11-src-$e node $P11/crit11-geom.mjs --build $B/a11-src --out $O/a11m --engine $e --media
    ilog crit11-geom-media-a11-ax-src-$e node $P11/crit11-geom.mjs --build $B/a11-ax-src --out $O/a11m-ax --engine $e --media --conds contrast,contrast-dark
    true ;;
  attack-rest-inner) # $2 engine: CRIT11-C1 (crit10-c1, rest after a first scroll) on A10 and on A11's compositions;
    # CRIT10-CARRIER on D′ v9 and the plant; the PRT diagnostic; the K2 diagnostic (pass 10's, unchanged)
    e=$2; P11=$C11/probes
    ilog crit11-c1-a10-src-$e node $P11/crit11-c1.mjs --build $B/a10-src --out $O --engine $e --deadline 4800
    ilog crit11-c1-a11-src-$e node $P11/crit11-c1.mjs --build $B/a11-src --out $O/a11c --engine $e --scenes c1rtl-migrated,c1sm-migrated,c1lg-migrated,c1rich-migrated,c1multi-migrated
    for b in a10-src a10-ws-src; do ilog crit10-carrier-$b-$e node $C10/probes/crit10-carrier.mjs --build $B/$b --out $O/carrier-$b --engine $e; done
    ilog crit10-prt-tint-$e node $C10/probes/crit10-prt-tint.mjs --build $B/a10-src --out $O --engine $e
    ilog crit10-k2-diag-$e node $C10/probes/crit10-k2-diag.mjs --build $B/a10-src --out $O --engine $e
    true ;;
  chromium-attack)
    glog attack-geom-hold-chromium --timeout 90 -- zsh $0 attack-geom-inner chromium
    glog attack-media-hold-chromium --timeout 90 -- zsh $0 attack-media-inner chromium
    glog attack-rest-hold-chromium --timeout 90 -- zsh $0 attack-rest-inner chromium ;;
  webkit-d|webkit-e|webkit-f)
    echo "$(stamp) · harness $(hn)" > $L/$1.log
    local inner=$([[ $1 == webkit-d ]] && echo attack-geom-inner || { [[ $1 == webkit-e ]] && echo attack-rest-inner || echo attack-media-inner; })
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 $inner webkit >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  states-inner) # $2 engine: the carried `states` probe (X-1 sibling and the conditions, R-4 hover, Q-9 a11y) on dp10-src
    e=$2; PS=$P3/D4-Dp-spec/probes
    for part in states hover a11y; do ilog carried-states-$part-$e node $PS/states.mjs --build $B/dp10-src --part $part --engines $e; done ;;
  states-chromium)
    glog states-hold-chromium --timeout 60 -- zsh $0 states-inner chromium ;;
  states-webkit)
    echo "$(stamp) · harness $(hn)" > $L/$1.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 states-inner webkit >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  forced-inner) # $2 engine: THE NAMED ATTACK (crit12-states) on D′ v9 and on the forced-pair plant; this seat's A11 --attack on dist
    e=$2; C12=$C/probes
    ilog crit12-states-a11y-dp10-src-$e node $C12/crit12-states.mjs --build $B/dp10-src --part a11y --engines $e
    ilog crit12-states-forced-dp10-src-$e node $C12/crit12-states.mjs --build $B/dp10-src --part forced --engines $e
    ilog crit12-states-forced-plant-forced-pair-$e node $C12/crit12-states.mjs --build $B/dp10-plant-forced-pair-src --part forced --engines $e
    ilog crit12-states-a11y-plant-forced-pair-$e node $C12/crit12-states.mjs --build $B/dp10-plant-forced-pair-src --part a11y --engines $e
    ilog crit11-geom-attack-a11-dist-$e node $C11/probes/crit11-geom.mjs --build $B/a11-dist --out $O/a11d --engine $e --attack --deadline 4800
    true ;;
  forced-chromium)
    glog forced-hold-chromium --timeout 90 -- zsh $0 forced-inner chromium ;;
  webkit-g)
    echo "$(stamp) · harness $(hn)" > $L/$1.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 forced-inner webkit >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  *) echo "stages: see ./chain.sh"; exit 2 ;;
esac
