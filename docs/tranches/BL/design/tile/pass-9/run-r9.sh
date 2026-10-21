#!/bin/zsh
# D4 pass 9 · RE-MEASURE seat driver (confirmation, REGISTRY §P8-6). The same build as pass 8: HEAD + floor-v6.patch
# (09e74243) + ../pass-8/D4-Dp8.patch (b5f4ae22), git diff HEAD 5d08df87ebbe, read under harness H8 4159e027cdcf UNEDITED.
# This file is ../pass-8/run-b8.sh with only its paths re-pointed: the worktree is p9/remeasure9, the logs go to
# pass-9/logs, and the route, probes and patch are read from pass-8 unchanged. Every stage, plant, cell and flag is pass 8's.
# MACHINE LAW: every build, unit run, probe and browser run goes through ~/.claude/guard/guarded --rss-gb 8; browser runs
# never take --light; every run that may start Playwright WebKit sits inside a `--exclusive webkit` hold, queued and
# never cancelled for the wait. Serial: the chain runs one stage after another.
#   run-r9.sh state | patch | sheet | sheet-plants | libbuild | tsc | build | plant-builds | unit | unit-plants | bundle
#             xscript | chromium-battery | chromium-reads | webkit-a | webkit-b
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p9/remeasure9
WT=$W/wt; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; P7=$T/pass-7; P8=$T/pass-8; S=$T/pass-9; L=$S/logs
R=$P8/routes/D4-Dp8; RL3=$P8/routes/L3; RL3P=$P8/routes/L3-plant-on-item
FV6=$P7/floor-v6.patch; DP8=$P8/D4-Dp8.patch
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
PIN=$'            --selection-paint: inherit !important;\n'
plant() { # plant <name>: mutate the worktree (restore with unplant)
  cd $WT; mkdir -p $W/restore; cp $BS $TGV $SHP $SH $W/restore/
  case $1 in
    foreign) printf '%s' "$FOREIGN" >> $BS ;;
    var) printf '%s' "$VARW" >> $BS ;;
    static) SUB $TGV '        :data-size="props.size"' $'        :data-size="props.size"\n        style="--selection-tile: plated"' ;;
    ts) printf '%s' "$TSW" >> $SHP ;;
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
      echo "── every --selection-tile / --selection-paint line in src (comments included)"
      rg -n -- '--selection-(tile|paint)' src ; } >> $F 2>&1
    echo "exit 0 · $(stamp)" >> $F ;;
  patch) # the patch is clean on HEAD + floor v6: reverse it out of the worktree, check the tree equals floor v6, re-apply
    F=$L/patch-check.log; stamp > $F
    { cd $WT; D0=$(dsum)
      git apply -R --check $DP8 && git apply -R $DP8 && echo "reversed D4-Dp8.patch"
      for d in src tests demo MIGRATION.md; do diff -rq $W/base-fv6/$d $WT/$d > /dev/null && echo "$d equals HEAD + floor v6" || echo "$d DIFFERS from HEAD + floor v6"; done
      git apply --check $DP8 && echo "git apply --check D4-Dp8.patch on HEAD + floor v6: clean" && git apply $DP8
      D1=$(dsum); echo "worktree diff before $D0 after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))"; } >> $F 2>&1
    echo "exit 0 · $(stamp)" >> $F ;;
  sheet)
    glog sheet-selftest --light --timeout 5 -- node $HN/sheet.mjs --selftest --out $O
    glog sheet --light --timeout 5 -- node $HN/sheet.mjs --wt $WT --route $R --out $O ;;
  sheet-plants) # SHEET on the four writer plants (pass 7's critic's spellings), each restored and the tree checked equal
    F=$L/sheet-plants.log; stamp > $F; D0=$(dsum)
    for p in foreign var static ts; do
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
  build) # route src, src-dev, dist, dist-dev; attack src, src-dev, dist; L-3 fixture (src, dist) and its planted composition
    for f in src src-dev dist dist-dev; do glog build-dp8-$f --timeout 20 -- node $HN/build.mjs $WT --label dp8-$f --out $O --flavor $f --route $R; done
    for f in src src-dev dist; do glog build-dp8-atk-$f --timeout 20 -- node $HN/build.mjs $WT --label dp8-atk-$f --out $O --flavor $f --route $HN/attack-route; done
    for f in src dist; do glog build-l3-$f --timeout 20 -- node $HN/build.mjs $WT --label l3-$f --out $O --flavor $f --route $RL3; done
    glog build-l3-plant-on-item --timeout 20 -- node $HN/build.mjs $WT --label l3-plant-on-item-src --out $O --flavor src --route $RL3P ;;
  plant-builds) # B-1's two CSS writers as paint builds (FACT `foreign-ancestor`); L-3's unpinned library (L3BARE item-write)
    F=$L/plant-builds.log; stamp > $F; D0=$(dsum)
    for p in foreign var; do plant $p; echo "── plant $p" >> $F; tail -6 $WT/$BS >> $F
      $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label dp8-plant-$p-atk-src --out $O --flavor src --route $HN/attack-route >> $F 2>&1; echo "build exit $?" >> $F
      unplant; done
    plant unpinned; echo "── plant unpinned (the pin's --selection-paint line removed): $(grep -c -- '--selection-paint: inherit' $WT/$SH) left" >> $F
    $G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label l3-unpinned-src --out $O --flavor src --route $RL3 >> $F 2>&1; echo "build exit $?" >> $F
    unplant
    D1=$(dsum); echo "restored: before $D0 after $D1 ($([[ $D0 == $D1 ]] && echo equal || echo DIFFERS))" >> $F
    echo "exit 0 · $(stamp)" >> $F ;;
  unit)
    glog unit-all --timeout 45 -- node $HN/unit.mjs $WT --label dp8-all --out $O ;;
  unit-plants)
    glog unit-plants-hold --timeout 60 -- zsh $0 unit-plants-inner ;;
  unit-plants-inner)
    TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RCT=tests/styles/radius-role-canon.test.ts
    P() { local n=$1; shift; ilog unit-plant-$n node $HN/unit.mjs $WT --label plant-$n --out $O "$@"; }
    P clean $TG $RCT
    # L-1: pass 7's critic's three spellings and its foreign writer, verbatim. Want FAIL on floor v6's sheet-wide case
    P crit-var-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: var(--card-tile, flush);
}

@property --selection-tile {" -t "floor v6" $TG
    P crit-static-style --sub "$TGV|        :data-size=\"props.size\"|        :data-size=\"props.size\"
        style=\"--selection-tile: plated\"" -t "floor v6" $TG
    P crit-ts-ternary --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
export const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty(\"--selection-tile\", on ? \"flush\" : \"none\");" -t "floor v6" $TG
    P crit-foreign-writer --sub "$BS|@property --selection-tile {|.card > .toggle-group {
    --selection-tile: flush;
}

@property --selection-tile {" -t "floor v6" $TG
    # L-1 control: reads and a `none` write in script are no writer. Want PASS
    P ctl-reads --sub "$SHP|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];|export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];
// --selection-tile: flush is the lane sheet's
export const readTile = (el: HTMLElement) => getComputedStyle(el).getPropertyValue(\"--selection-tile\").trim();
export const resetTile = (el: HTMLElement) => el.style.setProperty(\"--selection-tile\", \"none\");" -t "floor v6" $TG
    # L-3: the unit's four mutations. Want FAIL
    P l3-pin-gone --sub "$SH|$PIN|" -t "L-3" $TG
    P l3-reset-gone --sub "$SH|        --selection-paint: auto;
|" -t "L-3" $TG
    P l3-tint-loose --sub "$SH|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */
    @container not style(--selection-paint: bare) {|    /* the tint, which a \`bare\` option leaves to the consumer (O-94 R-2) */
    @container not style(--selection-tile: plated) {" -t "L-3" $TG
    P l3-library-writer --sub "$BS|@property --selection-tile {|@layer components { .card > .toggle-group { --selection-paint: bare; } }
@property --selection-tile {" -t "L-3" $TG ;;
  bundle)
    glog bundle --light --timeout 20 -- zsh $T/pass-3/floor-v2/probes/bundle.sh $WT "HEAD + floor v6 + D′ v8" ;;
  xscript) # engine-free. The one route against itself (site paint, shared ink) and against pass 7's D′ route (site equal)
    glog xscript-self --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$R --out $O
    glog xscript-pair --light --timeout 5 -- node $HN/transcribe.mjs --routes $R,$P7/H7/routes/D4-Dp --out $O ;;
  reads-inner) # $2 engine: CANON clean + nine plants, FACT (src, src-dev, dist, two plants), ATTACK, CORNER, REPORT, probes
    e=$2
    ilog h-canon-$e node $HN/canon.mjs --build $B/dp8-src --out $O --engine $e
    for p in $PLANTS; do ilog h-canon-$p-$e node $HN/canon.mjs --build $B/dp8-src --out $O/plant-$p --engine $e --plant $p; done
    for f in src src-dev dist; do ilog h-fact-$f-$e node $HN/fact-split.mjs --build $B/dp8-atk-$f --out $O --engine $e; done
    for p in foreign var; do ilog h-fact-plant-$p-$e node $HN/fact-split.mjs --build $B/dp8-plant-$p-atk-src --out $O --engine $e; done
    ilog h-attack-srcdev-$e node $HN/attack.mjs --build $B/dp8-atk-src-dev --out $O --engine $e
    ilog h-attack-dist-$e node $HN/attack.mjs --build $B/dp8-atk-dist --out $O --engine $e
    ilog h-corner-$e node $HN/corner-refusal.mjs --build $B/dp8-atk-src --out $O --engine $e
    ilog h-corner-dist-$e node $HN/corner-refusal.mjs --build $B/dp8-atk-dist --out $O --engine $e
    ilog h-report-$e node $HN/report-h46.mjs --build $B/dp8-src --out $O --engine $e
    ilog probe-b3-$e node $P7/H7/probes/b3-mobile.mjs --build $B/dp8-atk-src --out $O --engine $e
    for b in dp8-src dp8-dist; do ilog c1box-$b-$e node $P8/probes/c1-box.mjs --build $B/$b --out $O --engine $e; done
    for b in l3-src l3-dist l3-plant-on-item-src l3-unpinned-src; do ilog l3bare-$b-$e node $P8/probes/l3-bare.mjs --build $B/$b --out $O --engine $e; done
    true ;;
  battery-inner) # $2 engine: T-1..T-7, W-A..W-E on the route src build; T-2, T-5, W-E on dist; T-2, W-E on dist-dev
    e=$2
    if [[ $e == chromium ]]; then ilog battery-src-chromium node $HN/run.mjs --build $B/dp8-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E
    else for w in $SRC_W; do ilog src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/dp8-src --out $O --engine webkit; done
         ilog src-T-8-both node $HN/t8-both-engines.mjs --build $B/dp8-src --out $O; fi
    for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do ilog dist-$w-$e node $HN/$w.mjs --build $B/dp8-dist --out $O --engine $e; done
    for w in t2-one-line-stadium we-one-line; do ilog distdev-$w-$e node $HN/$w.mjs --build $B/dp8-dist-dev --out $O --engine $e; done ;;
  chromium-battery)
    glog battery-hold-chromium --timeout 90 -- zsh $0 battery-inner chromium ;;
  chromium-reads)
    glog reads-hold-chromium --timeout 90 -- zsh $0 reads-inner chromium ;;
  webkit-a|webkit-b)
    stamp > $L/$1.log
    local inner=$([[ $1 == webkit-a ]] && echo battery-inner || echo reads-inner)
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 $inner webkit >> $L/$1.log 2>&1
    echo "exit $? · $(stamp)" >> $L/$1.log ;;
  *) echo "stages: see the header"; exit 2 ;;
esac
