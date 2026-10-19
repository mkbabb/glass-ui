#!/bin/zsh
# D4-F pass-6 CRITIC seat driver. Own worktree at HEAD + floor-v5.patch (de018966) + D4-F.patch (f931fada), own logs.
# The pass-5 F critic's driver (../../pass-5/D4-F-crit/run-crit.sh) re-pointed onto floor v5, H6 and pass 6's route dirs
# (../H6/routes/), plus: FV5-2's sheet plants on the F state; H6's cells (FACT with td/pd/`none!`) on `dist` as well as
# `src`/`src-dev`; D′'s H cells on a state switch; XSCRIPT on both pairs; the pass-5 F critic's probe (crit-f5) and
# the pass-6 D′ critic's unit plant `crit-foreign-writer` re-read on F; this seat's probe (probes/crit-f6.mjs on the route
# dir crit-route/). The retired pass-4 canon-fact.mjs forks are not run (REGISTRY §P5-4, H6 §1.5).
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8. Browser
# runs never take --light; only the typecheck, the engine-free XSCRIPT, the bundle read and the unit-plant runs do.
# Every run that may start Playwright WebKit sits inside a `--exclusive webkit` hold. Serial: one heavy run at a time.
#   run-crit.sh state <f|dp> | libbuild | tsc | build | build-extra | build-dp | unit | unit-plants | bundle | xscript
#               chromium-battery | chromium-reads | webkit-a | webkit-b
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/D4-F-crit
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P3=$T/pass-3; P4=$T/pass-4; P5=$T/pass-5; P6=$T/pass-6; S=$P6/D4-F-crit; L=$S/logs
R=$P6/H6/routes/D4-F; RD=$P6/H6/routes/D4-Dp; RA=$HN/attack-route; RC6=$S/crit-route
FV5=$P6/floor-v5.patch; DP=$P6/D4-Dp.patch; DF=$P6/D4-F.patch
F3=$P4/floor-v3; SP=$P4/D4-F-spec; FPR=$P4/D4-F-proto; C4=$P4/D4-F-crit; C5=$P5/D4-F-crit
RF4=$SP/probes/route-f4; RC4=$C4/probes/route-crit; RC5=$C5/probes/route-crit5
DPC4=$P4/D4-Dp-crit/probes; DPC5=$P5/D4-Dp-crit/probes; PS=$P3/D4-Dp-spec/probes; FP3=$P3/D4-F-proto/probes
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
SH=src/components/toggle-group/styles.css
IT=src/components/toggle-group/ToggleGroupItem.vue
ST=src/components/tabs/styles/segmented.css
BS=src/styles/utilities/base.css
TG=tests/components/ui/toggle-group/ToggleGroup.test.ts
RC_T=tests/styles/radius-role-canon.test.ts
CU=tests/components/ui/toggle-group/__crit_f.test.ts
LIM='    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {'
# a measurement-only variant: one exact, unique substitution in $WT/$2, the builds, then the original back (cmp-checked)
variant() { # variant <name> <file> <old> <new> <cmd>
  local n=$1 f=$WT/$2 old=$3 new=$4 cmd=$5
  printf '%s' "$old" > $O/$n.old; printf '%s' "$new" > $O/$n.new; cp $f $O/$n.orig
  glog build-variant-$n --timeout 30 -- zsh -c "python3 -I -c 'import sys;p,o,n=sys.argv[1:];s=open(p).read();o=open(o).read();n=open(n).read();assert s.count(o)==1,\"anchor\";open(p,\"w\").write(s.replace(o,n))' $f $O/$n.old $O/$n.new && echo 'variant $n applied' && $cmd"
  cp $O/$n.orig $f; cmp -s $f $O/$n.orig && echo "variant $n restored (cmp clean) · $(stamp)" >> $L/build-variant-$n.log
}

case $1 in
  state) # the worktree at HEAD + floor v5 + the named route
    F=$L/state-$2.log; stamp > $F
    { cd $WT
      for x in $DP $DF; do git apply --check -R $x 2>/dev/null && git apply -R $x && echo "reverse-applied ${x:t}"; done
      git apply --check -R $FV5 && echo "floor v5 in place ($(shasum $FV5 | cut -c1-8))"
      [[ $2 == dp ]] && P=$DP || P=$DF
      git apply --check $P && git apply $P && echo "applied ${P:t} ($(shasum $P | cut -c1-8))"
      echo "HEAD $(git rev-parse --short HEAD) · git diff HEAD $(git diff HEAD --binary | shasum | cut -c1-12) · src dirty paths $(git status --porcelain -- src | wc -l | tr -d ' ')"; } >> $F 2>&1
    echo "exit $? · $(stamp)" >> $F ;;
  libbuild)
    glog libbuild --timeout 20 -- node $HN/libbuild.mjs $WT ;;
  tsc)
    glog tsc --light --timeout 20 -- zsh -c "cd $WT && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit && echo 'app: 0 errors' && node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.test.json && echo 'test: 0 errors'" ;;
  build) # F: the route (pass-6 dir), the attack set, the pass-4 spec's own route, the pass-4 and pass-5 critics', this seat's
    for f in src src-dev dist dist-dev; do glog build-f-$f --timeout 15 -- node $HN/build.mjs $WT --label f-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-f-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label f-atk-$f --out $O --flavor $f --route $RA; done
    for f in src src-dev dist; do glog build-f-own-$f --timeout 15 -- node $HN/build.mjs $WT --label f-own-$f --out $O --flavor $f --route $RF4; done
    for f in src src-dev dist; do glog build-f-crit-$f --timeout 15 -- node $HN/build.mjs $WT --label f-crit-$f --out $O --flavor $f --route $RC4; done
    for f in src src-dev; do glog build-f-crit5-$f --timeout 15 -- node $HN/build.mjs $WT --label f-crit5-$f --out $O --flavor $f --route $RC5; done
    for f in src dist; do glog build-f-crit6-$f --timeout 15 -- node $HN/build.mjs $WT --label f-crit6-$f --out $O --flavor $f --route $RC6; done ;;
  build-extra) # measurement-only: the strip reset struck (noreset: H6-3's plant on F's own compositions), the kick deleted (pop0)
    variant noreset $ST "        --selection-tile: none;
" "" "node $HN/build.mjs $WT --label f-noreset-crit5-src --out $O --flavor src --route $RC5 && node $HN/build.mjs $WT --label f-noreset-crit6-src --out $O --flavor src --route $RC6"
    variant pop0 $SH "animation: toggle-group-commit 450ms" "animation: none 450ms" "node $HN/build.mjs $WT --label f-pop0-src --out $O --flavor src --route $R" ;;
  build-dp) # D′ (state dp): the route build and the attack set, for D′'s H cells
    glog build-dp-src --timeout 15 -- node $HN/build.mjs $WT --label dp-src --out $O --flavor src --route $RD
    for f in src src-dev; do glog build-dp-atk-$f --timeout 15 -- node $HN/build.mjs $WT --label dp-atk-$f --out $O --flavor $f --route $RA; done ;;
  unit)
    glog unit-all --timeout 45 -- node $HN/unit.mjs $WT --label f-all --out $O ;;
  unit-plants) # every route-owned, FV4-1 and FV5-2 unit case against the mutation it exists to catch
    P() { local n=$1; shift; glog unit-plant-$n --light --timeout 15 -- node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    WR="        --selection-tile: flush;
    }"
    SEL=".toggle-group:has(.toggle-group__item > :is(.toggle-group__media, .toggle-group__meta)) .toggle-group__item"
    TAIL="            background: HighlightText;
        }
    }
}"
    ARM2="    .toggle-group
        .toggle-group:has(
            .toggle-group__item
                > :is(.toggle-group__media, .toggle-group__meta):not(
                    .toggle-group .toggle-group .toggle-group *
                )
        ) {"
    P clean $TG $RC_T
    P rows-on-slot-function --sub "$IT|v-if=\"yields(\$slots.meta?.())\"|v-if=\"\$slots.meta\"" -t "a row renders only when" $TG
    P second-writer --sub "$SH|$WR|$WR

    .toggle-group:has(.toggle-group__item > .toggle-group__meta) {
        --selection-tile: plated;
    }" -t "one rule writes the tile fact" $TG
    P mark-off-fact --sub "$SH|            /* D4-F: the mark (below) */
            --toggle-group-marked: 1;|            /* D4-F: the mark (below) */" -t "one rule writes the tile fact" $TG
    P canon-a --sub "$SH|$WR|$WR

    :is($SEL) {
        border-radius: 12px;
    }" $TG $RC_T
    P canon-s --sub "$SH|$WR|$WR

    .toggle-group[data-size=\"sm\"] :is($SEL) {
        border-radius: var(--radius-panel);
    }" $TG $RC_T
    P canon-h --sub "$SH|$WR|$WR

    .toggle-group__item:has(> * + *) {
        border-radius: 12px;
    }" $TG $RC_T
    P layer --sub "$SH|$TAIL|$TAIL
.toggle-group { --selection-tile: none; }" $TG $RC_T
    P foreign --sub "$SH|$WR|$WR

    .pill-row.control-surface {
        border-radius: 12px;
    }" $TG $RC_T
    # the floor's sheet case (FV4-1 + FV5-2), on the F state
    P pin-unbounded --sub "$SH|$LIM|    @scope (.toggle-group__item) {" -t "the sheet" $TG
    P pin-option-only --sub "$SH|        :scope,
        :scope * {|        :scope {" -t "the sheet" $TG
    P pin-gone --sub "$SH|            --selection-tile: inherit !important;|" -t "the sheet" $TG
    P strip-reset-gone --sub "$ST|        --selection-tile: none;
        position: relative;|        position: relative;" -t "the sheet" $TG
    P limit-group-only --sub "$SH|$LIM|    @scope (.toggle-group__item) to (.toggle-group) {" -t "the sheet" $TG
    # the pass-5 F critic's plants, kept
    P crit-one-arm --sub "$SH|,
$ARM2| {" -t "one rule writes the tile fact" $TG
    P crit-blank-yields --sub "$IT|? String(n.children).trim() !== \"\"|? true" -t "a row renders only when" $TG
    P crit-room-off --sub "$SH|max(0px, (100% - 3.5 * var(--toggle-group-mark-size)) * 9999)|var(--toggle-group-mark-size)" $TG $RC_T
    # the pass-6 D′ critic's plant, re-read on F: a second writer of the fact in ANOTHER sheet (base.css, unlayered)
    P crit-foreign-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: flush;
}

@property --selection-tile {" $TG $RC_T
    # THIS SEAT: F's anatomy writer reaches a strip: the writer's subject gains `.segmented-tabs:has(...)`, so a strip
    # whose tab holds a #meta row writes a tile value over its own reset (want: the sheet or the one-writer case fails)
    P crit-strip-writer --sub "$SH|    .toggle-group:has(
            .toggle-group__item
                > :is(.toggle-group__media, .toggle-group__meta):not(.toggle-group .toggle-group *)
        ),|    .segmented-tabs:has(.toggle-group__meta),
    .toggle-group:has(
            .toggle-group__item
                > :is(.toggle-group__media, .toggle-group__meta):not(.toggle-group .toggle-group *)
        )," $TG $RC_T
    P clean-after $TG $RC_T
    # the pass-4 F critic's unit cases: copied in, run, removed
    cp $C4/probes/crit-units.test.ts $WT/$CU
    P crit-cases $CU
    rm -f $WT/$CU ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $P3/floor-v2/probes/bundle.sh $WT "HEAD + floor v5 + D4-F pass-6 (critic)" ;;
  xscript) # engine-free: pass 6's route dirs (19 cells), and the pass-5 pair for the record
    glog xscript --light --timeout 5 -- node $HN/transcribe.mjs --routes $RD,$R --out $O
    glog xscript-p5pair --light --timeout 5 -- node $HN/transcribe.mjs --routes $P5/H5/routes/D4-Dp,$P5/H5/routes/D4-F --out $O ;;
  h-inner) # $2 route tag (f|dp), $3 engine: CANON clean + nine plants, FACT, ATTACK, CORNER, REPORT
    x=$2; e=$3
    ilog h-$x-canon-$e node $HN/canon.mjs --build $B/$x-src --out $O --engine $e
    for p in $PLANTS; do ilog h-$x-canon-$p-$e node $HN/canon.mjs --build $B/$x-src --out $O/plant-$p --engine $e --plant $p; done
    ilog h-$x-fact-src-$e node $HN/fact-split.mjs --build $B/$x-atk-src --out $O --engine $e
    ilog h-$x-fact-srcdev-$e node $HN/fact-split.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    ilog h-$x-attack-srcdev-$e node $HN/attack.mjs --build $B/$x-atk-src-dev --out $O --engine $e
    ilog h-$x-corner-$e node $HN/corner-refusal.mjs --build $B/$x-atk-src --out $O --engine $e
    ilog h-$x-report-$e node $HN/report-h46.mjs --build $B/$x-src --out $O --engine $e
    [[ $x == f ]] && { ilog h-f-report-attack-$e node $HN/report-h46.mjs --build $B/f-atk-src --out $O --engine $e
      ilog h-f-fact-dist-$e node $HN/fact-split.mjs --build $B/f-atk-dist --out $O --engine $e
      ilog h-f-attack-dist-$e node $HN/attack.mjs --build $B/f-atk-dist --out $O --engine $e
      ilog h-f-corner-dist-$e node $HN/corner-refusal.mjs --build $B/f-atk-dist --out $O --engine $e; }
    true ;;
  probes-inner) # $2 engine: the carried probes and instruments on THIS route's builds, plus this seat's
    e=$2
    for f in src src-dev dist; do ilog own-$f-$e node $SP/probes/f4-attack.mjs --build $B/f-own-$f --out $O --engine $e; done
    ilog selector-forms-$e node $SP/probes/selector-forms.mjs $e
    for f in src src-dev dist; do ilog critf-$f-$e node $C4/probes/crit-f.mjs --build $B/f-crit-$f --out $O --engine $e; done
    for b in f-src f-src-dev f-dist; do ilog crit-level-$b-$e node $DPC4/crit-level.mjs --build $B/$b --engine $e --out $O; done
    for b in f-src f-src-dev f-dist; do ilog anatomy-flip-$b-$e node $FPR/probes/anatomy-flip.mjs --build $B/$b --engine $e --out $O; done
    ilog probe-scope-bound-$e node $P6/floor-v5/probes/scope-bound.mjs --engine $e --form all
    for part in states hover ink a11y; do ilog carried-states-$part-$e node $PS/states.mjs --build $B/f-src --part $part --engines $e; done
    ilog carried-states-hover-f1-$e node $PS/states.mjs --build $B/f-src --part hover --sites f1-migrated --engines $e
    for part in x3 x6 tone; do ilog carried-crit-$part-$e node $PS/crit.mjs --build $B/f-src --part $part --engines $e; done
    ilog carried-crit-desc-$e node $PS/crit.mjs --build $B/f-src-dev --part desc --engines $e
    ilog probe-tile-geometry-$e node $F3/probes/tile-geometry.mjs --build $B/f-src --engine $e --corner
    ilog probe-pill-row-$e node $F3/probes/pill-row.mjs --build $B/f-src --engine $e
    ilog probe-corner-gap-$e node $P3/D4-Dp-proto/probes/corner-gap.mjs --build $B/f-src --engines $e
    ilog probe-unmigrated-dist-$e node $P3/floor-v2/probes/unmigrated.mjs --build $B/f-dist --engines $e
    ilog p3-forced-cost-$e node $FP3/p3.mjs --build $B/f-src --engines $e --only forced,cost
    ilog crit-p5-src-$e node $DPC5/crit-p5.mjs --build $B/f-atk-src --engine $e --out $O
    ilog crit-p5-srcdev-$e node $DPC5/crit-p5.mjs --build $B/f-atk-src-dev --engine $e --out $O
    ilog crit-ink-$e node $DPC5/crit-ink.mjs --build $B/f-src --engine $e --out $O
    ilog crit-name-lift-$e node $DPC5/crit-name-lift.mjs --build $B/f-src --engine $e --out $O
    [[ $e == chromium ]] && ilog crit-name-trace-chromium node $DPC5/crit-name-trace.mjs --build $B/f-src --out $O
    # the pass-5 F critic's probe, on floor v5 (ST should now pass) and on the strip-reset-struck variant (the plant)
    for f in src src-dev; do ilog critf5-nest-$f-$e node $C5/probes/crit-f5.mjs --build $B/f-crit5-$f --part nest --engine $e --out $O; done
    ilog critf5-nest-noreset-$e node $C5/probes/crit-f5.mjs --build $B/f-noreset-crit5-src --part nest --engine $e --out $O/plant-noreset
    ilog critf5-mark-$e node $C5/probes/crit-f5.mjs --build $B/f-src --part mark --engine $e --out $O
    # this seat's
    for f in src dist; do ilog critf6-strip-$f-$e node $S/probes/crit-f6.mjs --build $B/f-crit6-$f --part strip --engine $e --out $O; done
    ilog critf6-strip-noreset-$e node $S/probes/crit-f6.mjs --build $B/f-noreset-crit6-src --part strip --engine $e --out $O/plant-noreset
    for f in src dist; do ilog critf6-ink-$f-$e node $S/probes/crit-f6.mjs --build $B/f-$f --part ink --engine $e --out $O; done
    ilog critf6-ink-dp-$e node $S/probes/crit-f6.mjs --build $B/dp-src --part ink --engine $e --out $O
    ilog t6-pop0-$e node $HN/t6-engagement.mjs --build $B/f-pop0-src --out $O/plant-pop0 --engine $e
    true ;;
  chromium-battery) # T-1..T-7, W-A..W-E on the route src build; T-2, T-5, W-E on dist
    glog battery-src-chromium --timeout 90 -- node $HN/run.mjs --build $B/f-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog dist-$w-chromium --timeout 30 -- node $HN/$w.mjs --build $B/f-dist --out $O --engine chromium; done ;;
  chromium-reads)
    glog h-f-chromium --timeout 60 -- zsh $0 h-inner f chromium
    glog h-dp-chromium --timeout 60 -- zsh $0 h-inner dp chromium
    glog probes-chromium --timeout 90 -- zsh $0 probes-inner chromium ;;
  webkit-a-inner)
    for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/f-src --out $O --engine webkit; done
    ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/f-src --out $O
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-webkit node $HN/$w.mjs --build $B/f-dist --out $O --engine webkit; done ;;
  webkit-b-inner)
    zsh $0 h-inner f webkit
    zsh $0 h-inner dp webkit
    zsh $0 probes-inner webkit ;;
  webkit-a|webkit-b)
    stamp > $L/$1.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 $1-inner >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
