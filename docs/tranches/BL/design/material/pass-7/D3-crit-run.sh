#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 7, the fresh critic: every command this seat ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p7/crit/wt, removed at the end). Floor v6 is applied by default; a phase that
# needs floor v5, the minor v5, the minor v4 or HEAD swaps the patch and swaps it back, each swap checked with cmp (or a
# clean git status at HEAD). Builds, captures and caches live in $W/.d3out and $W/.cache-crit. Records land in
# pass-7/crit-records/.
#   bash D3-crit-run.sh inner-c <phase>...   one guarded admission (heavy, Chromium or builds), phases in order
#   bash D3-crit-run.sh inner-w <phase>...   one guarded --exclusive webkit admission
#   bash D3-crit-run.sh inner-l <phase>...   one guarded --light admission (static reads, PNG reads, no browser)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p7/crit
W=$B/wt
S=$B/trees
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P5=$M/pass-5
P6=$M/pass-6
P7=$M/pass-7
REC=$P7/crit-records
FV5=$P6/floor-v5.patch
FV6=$P7/floor-v6.patch
MS4=$P6/minor-split-v4.patch
MS5=$P7/minor-split-v5.patch
V5=$P5/MS3-variants
V6=$P6/MS4-variants
CV=$P7/crit-variants
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
cur() { for p in "$FV6" "$FV5" "$MS5" "$MS4"; do is "$p" >/dev/null && { echo "$p"; return; }; done; test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo HEAD; }
to() { local c; c=$(cur); [ "$c" = "$1" ] && return 0; [ -z "$c" ] && exit 3; [ "$c" != HEAD ] && git -C "$W" apply -R "$c"; [ "$1" != HEAD ] && git -C "$W" apply "$1"
  if [ "$1" = HEAD ]; then test -z "$(git -C "$W" status --porcelain -- src demo tests)" || exit 3; else is "$1" >/dev/null || exit 3; fi; echo "swapped to $(basename "$1")"; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }

if [ "${1:-}" = inner-c ] || [ "${1:-}" = inner-w ] || [ "${1:-}" = inner-l ]; then
  case $1 in inner-w) EX="--timeout ${CRIT_TIMEOUT:-90} --exclusive webkit";; inner-l) EX="--light --timeout 30";; *) EX="--timeout ${CRIT_TIMEOUT:-90}";; esac
  shift; echo "queued $(ts) [$EX] for: $*" | tee -a "$REC/admissions.log"
  exec "$HOME/.claude/guard/guarded" $EX -- bash -c '
    echo "admitted $(date +%T) load $(sysctl -n vm.loadavg) for: $*" >> "'"$REC"'/admissions.log"
    for p in "$@"; do bash "$0" "$p" 2>&1 | tee -a "'"$REC"'/phase-$p.log"; done
    echo "ended $(date +%T) load $(sysctl -n vm.loadavg) for: $*" >> "'"$REC"'/admissions.log"' "$P7/D3-crit-run.sh" "$@"
fi

phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  [ -d "$R/tests-visual/node_modules" ] && ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  echo "HEAD $(git -C "$W" rev-parse --short=9 HEAD)"
  git -C "$R" diff --stat a75b708e9 HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster; echo "(source diff a75b708e9..HEAD above; empty = none)"
  for p in "$FV5" "$FV6" "$MS4" "$MS5" "$P7/floor-v6-R15.diff" "$P7/minor-split-v5-R16.diff"; do echo "sha1 $(shasum "$p" | cut -c1-8) $(basename "$p")"; done
  for p in "$FV6" "$MS5"; do git -C "$W" apply --check "$p" && echo "apply --check clean at HEAD: $(basename "$p")"; done
  # Composition: floor v5 + R15 = floor v6; minor v4 + R16 = minor v5 (byte for byte, cmp).
  git -C "$W" apply "$FV5" && git -C "$W" apply "$P7/floor-v6-R15.diff" && is "$FV6" && echo "composition: floor-v5.patch + floor-v6-R15.diff = floor-v6.patch (cmp)"
  git -C "$W" apply -R "$FV6"; test -z "$(git -C "$W" status --porcelain -- src demo tests)" || exit 3
  git -C "$W" apply "$MS4" && git -C "$W" apply "$P7/minor-split-v5-R16.diff" && is "$MS5" && echo "composition: minor-split-v4.patch + minor-split-v5-R16.diff = minor-split-v5.patch (cmp)"
  git -C "$W" apply -R "$MS5"; git -C "$W" apply "$MS4"; python3 -I "$P7/MS5-r16-edits.py" "$W" > /dev/null && is "$MS5" && echo "MS5-r16-edits.py over minor v4 = minor-split-v5.patch (cmp)"
  to "$FV6"
  for p in "$FV6" "$MS5"; do echo "$(basename "$p"): $(git -C "$R" apply --numstat "$p" | wc -l | tr -d ' ') files"; done
  ;;
trees)
  rm -rf "$S"; mkdir -p "$S"
  for t in fv6:"$FV6" fv5:"$FV5" minor5:"$MS5" minor4:"$MS4" head:HEAD; do n=${t%%:*}; p=${t#*:}; to "$p"; mkdir -p "$S/$n"; cp -R "$W/src" "$W/demo" "$W/tests" "$S/$n/"; done
  to "$FV6"
  mkdir -p "$S/v1010"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$S/v1010"
  ;;
static)
  node "$H/launch-law.mjs" > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
  # DEL under H7-2: floor v6 with the seat's declaration (fixture), floor v5 under it (plant); my own declaration rebuilt
  # from the patch with no exact rulings and with the seat's (to diff the seat's JSON).
  node "$H/declare-removed.mjs" --patch "$FV6" --root "$S/fv6" --concepts "$H/deletes-floor.json" --exact "$P7/floor-v6-exact.json" --out "$REC/declare-crit-fv6.json" > "$REC/declare-crit-fv6.log" 2>&1; echo "declare (crit, seat's exact) exit $?: $(tail -2 "$REC/declare-crit-fv6.log" | tr '\n' ' ')"
  node "$H/declare-removed.mjs" --patch "$FV6" --root "$S/fv6" --concepts "$H/deletes-floor.json" --out "$REC/declare-crit-fv6-noexact.json" > "$REC/declare-crit-fv6-noexact.log" 2>&1; echo "declare (crit, no exact) exit $?"
  for t in fv6 fv5; do node "$H/deleted-mechanisms.mjs" --root "$S/$t" --declare "$P7/FV6-records/declare-floor-v6.json" > "$REC/del-$t-seatdecl.log" 2>&1; echo "DEL $t (seat decl) exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-$t-seatdecl.log")"; done
  for t in fv6 fv5; do node "$H/deleted-mechanisms.mjs" --root "$S/$t" --declare "$REC/declare-crit-fv6.json" > "$REC/del-$t-critdecl.log" 2>&1; echo "DEL $t (crit decl) exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-$t-critdecl.log")"; done
  node "$H/deleted-mechanisms.mjs" --root "$S/fv6" --declare "$REC/declare-crit-fv6-noexact.json" > "$REC/del-fv6-noexact.log" 2>&1; echo "DEL fv6 (no exact) exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-fv6-noexact.log")"
  for t in minor5 minor4; do node "$H/deleted-mechanisms.mjs" --root "$S/$t" --declare "$H/deletes-minor.json" > "$REC/del-minor-$t.log" 2>&1; echo "DEL minor decl $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-minor-$t.log")"; done
  for t in fv6 minor5 v1010; do node "$P4/lighting-census.mjs" "$S/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
  for t in fv6 minor5; do node "$H/hover-fill-selected.mjs" --root "$S/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"; done
  for t in fv6 minor5; do node "$H/lighting-literals.mjs" --root "$S/$t" > "$REC/LIT-$t.log" 2>&1; echo "LIT $t exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-$t.log" | tail -1)"; done
  for t in fv6 fv5 minor5 minor4 head; do grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$S/$t/src/styles/tokens/glass.css" | sed 's/^ *//' > "$REC/radii-$t.txt"; done
  diff "$REC/radii-fv6.txt" "$REC/radii-minor5.txt"; echo "LADDER fv6 vs minor5 exit $?"
  diff "$REC/radii-head.txt" "$REC/radii-minor5.txt" > /dev/null; echo "LADDER head vs minor5 exit $? (bite)"
  for t in minor5 minor4; do echo "FL-14 static $t: $(sed -n '/^@utility glass-plate/,/^}/p' "$S/$t/src/styles/glass/veil.css" | grep -c 'isolation: isolate')"; done
  ;;
declcheck)
  # R-15 (iii), read independently: my own extraction of every identifier on floor-v6.patch's removed src/demo lines,
  # checked against the seat's declaration (declared + present), and every declared name's word form searched in
  # floor v6 by my own matcher (not deleted-mechanisms.mjs).
  python3 -I "$P7/crit-declcheck.py" "$FV6" "$S/fv6" "$P7/FV6-records/declare-floor-v6.json" > "$REC/declcheck.log" 2>&1; echo "declcheck exit $?"; tail -12 "$REC/declcheck.log"
  python3 -I "$P7/crit-declcheck.py" "$FV6" "$S/fv5" "$P7/FV6-records/declare-floor-v6.json" --plant > "$REC/declcheck-fv5-plant.log" 2>&1; echo "declcheck fv5 plant exit $?"; tail -4 "$REC/declcheck-fv5-plant.log"
  ;;
sweep)
  # Prose the minor seat handed on (MS5 §2.4) and the floor v6 sentences, printed whole for reading by hand.
  grep -rniE "darken" "$S/minor5/src" "$S/minor5/demo/stories" | sed "s#$S/minor5/##" > "$REC/sweep-minor5-darken.txt"; wc -l < "$REC/sweep-minor5-darken.txt"
  grep -rniE "tint axis|TINT seam|adaptive tint|adaptive-tint" "$S/minor5/src" | sed "s#$S/minor5/##" > "$REC/sweep-minor5-tint.txt"; wc -l < "$REC/sweep-minor5-tint.txt"
  grep -rniE "backdrop.?mode|adaptive.?tint|backdrop bucket|backdropLuminance|backdrop.?luma|earned darken|select-plate-alpha" "$S/fv6/src" "$S/fv6/demo" "$S/fv6/tests" | sed "s#$S/fv6/##" > "$REC/sweep-fv6-mech.txt"; wc -l < "$REC/sweep-fv6-mech.txt"
  ;;
builds)
  to "$FV6"; node "$H/build.mjs" "$W" --label fv6 --demo 2>&1 | tail -1; echo "fv6 built $(ts)"
  to "$MS5"; node "$H/build.mjs" "$W" --label minor5 --demo 2>&1 | tail -1; echo "minor5 built $(ts)"
  to HEAD; node "$H/build.mjs" "$W" --label head 2>&1 | tail -1; echo "head built $(ts)"
  to "$FV6"
  ;;
same)
  # Byte identity, built under ONE label in this worktree, each output moved aside: fv6, fv5, fv6 again; minor5, minor4.
  O=$D3_OUT/builds; SM=$D3_OUT/same; rm -rf "$SM"; mkdir -p "$SM"
  for t in fv6:"$FV6" fv5:"$FV5" fv6b:"$FV6" minor5:"$MS5" minor4:"$MS4"; do n=${t%%:*}; p=${t#*:}; to "$p"
    rm -rf "$W/.d3out/cache" "$W/node_modules/.vite" 2>/dev/null
    node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$SM/$n"; echo "$n built as 'same' $(ts)"; done
  to "$FV6"
  for k in dist demo; do
    diff -rq -x build.json "$SM/fv5/$k" "$SM/fv6/$k" > "$REC/same-$k-fv5-fv6.txt"; echo "$k fv5 vs fv6: exit $?, $(wc -l < "$REC/same-$k-fv5-fv6.txt" | tr -d ' ') lines"
    diff -rq -x build.json "$SM/fv6/$k" "$SM/fv6b/$k" > /dev/null; echo "$k fv6 vs fv6 rebuilt: exit $?"
    diff -rq -x build.json "$SM/minor4/$k" "$SM/minor5/$k" > "$REC/same-$k-minor4-minor5.txt"; echo "$k minor4 vs minor5: exit $?, $(wc -l < "$REC/same-$k-minor4-minor5.txt" | tr -d ' ') lines"
  done
  for l in fv5 fv6 minor4 minor5; do for c in "$SM/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; echo "$l demo files $(find "$SM/$l/demo" -type f ! -name build.json | wc -l | tr -d ' ')"; done
  python3 -I "$P7/crit-demo-norm.py" "$SM/fv5/demo" "$SM/fv6/demo"
  ;;
battery-c|battery-w)
  to "$FV6"; e=chromium; [ $phase = battery-w ] && e=webkit
  node "$H/run.mjs" "$W" --label fv6 --skip-build --engines $e > "$REC/fv6-run-$e.log" 2>&1; echo "exit $? $(ts)"; tail -3 "$REC/fv6-run-$e.log"
  ;;
witnesses)
  to "$FV6"; node "$H/run.mjs" "$W" --label fv6 --skip-build --skip-capture > "$REC/fv6-witnesses.log" 2>&1; tail -30 "$REC/fv6-witnesses.log"
  mkdir -p "$REC/fv6-results"; cp "$D3_OUT"/caps/fv6/results/*.log "$REC/fv6-results/" 2>/dev/null
  for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m2-held-window:m2h m1-no-grey:m1; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv6" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-fv6.txt" 2>&1; done
  node "$H/baseline.mjs" "$D3_OUT/caps/fv6" --out "$REC/baseline-fv6.json" > "$REC/baseline-fv6.md"
  echo "diff seat baseline-fv6.md vs critic:"; diff "$P7/FV6-records/baseline-fv6.md" "$REC/baseline-fv6.md" && echo "(identical)"
  echo "diff FV5 baseline-fv5.md vs critic fv6:"; diff "$P6/FV5-records/baseline-fv5.md" "$REC/baseline-fv6.md"
  ;;
readings)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv6" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "fv6 M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv6" --gate $e > "$REC/M-1x-a-$e.log" 2>&1; echo "fv6 M-1x (a) $e: $(tail -1 "$REC/M-1x-a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv6" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "fv6 M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv6" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "fv6 M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done
  ;;
plants-w)
  # Every R plant, owner variant and floor plant over the critic's floor v6 build; each variant pins its engines (both,
  # unless named), so this phase runs inside the one --exclusive webkit admission.
  to "$FV6"
  node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv6/dist" "$W" --out "$D3_OUT/plants" --only "plant-R1,plant-R2,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom" > "$REC/plants.log" 2>&1; echo "FV3-plants exit $? $(ts)"
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/fv6/dist" "$W" --out "$D3_OUT/flplants" --only "plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation" > "$REC/floor-plants.log" 2>&1; echo "FV2-plants exit $? $(ts)"
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local d=$1 id=$2 w=$3 tag=$4; shift 4; for e in chromium webkit; do
      node "$H/$w.mjs" "$D3_OUT/$d/$id" --gate $e "$@" > "$PR/$id-$tag-$e.log" 2>&1
      echo "$id | $tag | $e | $(tail -1 "$PR/$id-$tag-$e.log")" | tee -a "$PR/readings.log"; done; }
  rd plants plant-R1 m4-dock-register M-4 --cells dark
  rd plants plant-R2 m9-state-registers M-9 --cells dark
  rd plants plant-R3 o66-field-row O-66 --cells .
  rd plants plant-R4 o66-field-row O-66 --cells .
  rd plants plant-q1c-noroom m6-separable-ladder M-6-q1c --cells dark --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1c --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1a --q1 a
  rd plants var-q11b m1x-off-paper M-1x-q11b --q11 b
  rd plants var-q11b wa-no-signal W-A-q11b --q11 b
  rd flplants plant-bound m2-text-contrast M-2 --cells '(ladder|dialog)$'
  rd flplants plant-heldfloor m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-carrierveil m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-darkperim m3-non-text M-3 --cells dark
  rd flplants plant-noisolation m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-noisolation stack-host STACK --cells 'held$'
  echo "end $(ts)" >> "$PR/readings.log"
  ;;
ring-c)
  # R-14 on raw PNGs: the dialog scene of the minor v5 and HEAD (floor v6's is in the battery capture), and the two
  # real-paint plants over floor v6's build: the ring ink at alpha 0.40, and a 1 px outline (crit-variants/*.css).
  e=${ENG:-chromium}
  node "$H/capture.mjs" "$D3_OUT/builds/minor5/dist" --out "$D3_OUT/caps/minor5-dlg-$e" --engines $e --themes light,dark --scenes dialog > "$REC/cap-minor5-dlg-$e.log" 2>&1; echo "minor5 dialog $e exit $? $(ts)"
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head-dlg-$e" --engines $e --themes light,dark --scenes dialog > "$REC/cap-head-dlg-$e.log" 2>&1; echo "head dialog $e exit $? $(ts)"
  for v in ring040 ring1px; do node "$H/capture.mjs" "$D3_OUT/builds/fv6/dist" --out "$D3_OUT/caps/fv6-$v-$e" --engines $e --themes light --scenes dialog --variant $v --inject "$CV/$v.css" > "$REC/cap-fv6-$v-$e.log" 2>&1; echo "fv6 $v $e exit $? $(ts)"; done
  ;;
ring-read)
  e=${ENG:-chromium}; [ -d "$D3_OUT/caps/fv6-dlg-$e" ] || ln -sfn "$D3_OUT/caps/fv6" "$D3_OUT/caps/fv6-dlg-$e"
  for c in fv6-dlg minor5-dlg head-dlg fv6-ring040 fv6-ring1px; do
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/$c-$e" --gate $e --verbose --cells "dialog$" > "$REC/verbose/m3-$c-$e.txt" 2>&1; echo "M-3 $c $e: $(tail -1 "$REC/verbose/m3-$c-$e.txt")"
    node "$P7/crit-ringpx.mjs" "$D3_OUT/caps/$c-$e" --engine $e > "$REC/ringpx-$c-$e.log" 2>&1; echo "ringpx $c $e exit $?"; grep -E "^SUM" "$REC/ringpx-$c-$e.log"
  done
  ;;
fl14-c)
  # FL-14's dark-composite movement (P6-5, owed): the minor v5 with FL-14 taken back out (MS4-variants/nofl14.css) and
  # the minor v5 as built, the same scenes, light and dark, Chromium; read by M-6 composites and by a whole-PNG diff.
  node "$H/capture.mjs" "$D3_OUT/builds/minor5/dist" --out "$D3_OUT/caps/minor5-fl" --engines chromium --themes light,dark --scenes ladder,dialog,held,hostile,halo,state > "$REC/cap-minor5-fl.log" 2>&1; echo "minor5 fl exit $? $(ts)"
  node "$H/capture.mjs" "$D3_OUT/builds/minor5/dist" --out "$D3_OUT/caps/minor5-nofl14" --engines chromium --themes light,dark --scenes ladder,dialog,held,hostile,halo,state --inject "$V6/nofl14.css" > "$REC/cap-minor5-nofl14.log" 2>&1; echo "minor5 nofl14 exit $? $(ts)"
  ;;
fl14-read)
  for l in minor5-fl minor5-nofl14; do for w in m6-separable-ladder:m6 m2-text-contrast:m2 m3-non-text:m3 stack-host:stack; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1; echo "$l ${w##*:}: $(tail -1 "$REC/verbose/${w##*:}-$l.txt")"; done; done
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-minor5-nofl14.txt" "$REC/verbose/m6-minor5-fl.txt" > "$REC/fl14-dark-move.txt"; echo "fl14 dark (M-6 composites): $(tail -1 "$REC/fl14-dark-move.txt")"
  node "$P7/crit-pxdiff.mjs" "$D3_OUT/caps/minor5-nofl14" "$D3_OUT/caps/minor5-fl" > "$REC/fl14-pxdiff.log" 2>&1; echo "fl14 pxdiff exit $?"; tail -6 "$REC/fl14-pxdiff.log"
  ;;
toolchain)
  t=${T:-fv6}; [ $t = minor5 ] && to "$MS5"; [ $t = fv6 ] && to "$FV6"; cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.crit-demo.config.ts
  npx vue-tsc --noEmit > "$REC/tsc-app-$t.log" 2>&1; echo "typecheck app $t exit $? $(ts)"
  npx vite build --config vite.crit.config.ts > "$REC/libbuild-$t.log" 2>&1; echo "library build $t exit $? $(ts)"
  npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test-$t.log" 2>&1; echo "typecheck tests $t exit $? $(ts)"
  npx vite build --config vite.crit-demo.config.ts > "$REC/dist-demo-$t.log" 2>&1; echo "dist-demo $t exit $? $(ts)"
  npx vitest run --config vitest.crit.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units-$t.log" 2>&1; echo "vitest $t exit $? $(ts)"
  grep -E "Test Files|Tests  " "$REC/units-$t.log"
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.crit-demo.config.ts
  cd "$R"; to "$FV6"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p7" 2>/dev/null; ls -la "$R/.claude/worktrees/bl/D3/"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
