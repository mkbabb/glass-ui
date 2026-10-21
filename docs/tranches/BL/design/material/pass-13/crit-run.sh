#!/usr/bin/env bash
# crit-run.sh · D3 pass 13, the CRITIC (REGISTRY P12-6.3 step 4): every command the critic ran, by phase.
# Base: HEAD of master at launch (P12-6.2 (a)); release/10.1.1 and release/10.1.2 are NOT merged during pass 13.
# One worktree (.claude/worktrees/bl/D3/p13/crit/wt) cut at HEAD, node_modules symlinked; floor v11 applied by default,
# floor v11a and the minor v10 reached by cmp-checked swaps. Builds, captures and caches live in $W/.d3out.
# Records land in pass-13/crit-records/.
# Launch law: every phase is `~/.claude/guard/guarded ... -- bash crit-run.sh <phase>`:
#   --light                          setup, compose, static, selftest, offspot, teardown (no browser)
#   --timeout 45 (heavy)             same (vite builds, no browser), cr (Chromium headless shell, no launch arguments)
#   --exclusive webkit --timeout 60  wk (one Playwright WebKit capture group, one admission)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p13/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P11=$M/pass-11
P12=$M/pass-12
P13=$M/pass-13
REC=$P13/crit-records
FV11A=$P12/floor-v11a.patch
FV11=$P12/floor-v11.patch
R32=$P12/FV11-r32.diff
MIN10=$P12/minor-split-v10.patch
D11=$P12/FV11-records/declare-floor-v11.json
PLANT37=$P13/crit-plant-r37-1pct.css
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && clean && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1, release/10.1.2 not merged, P12-6.2 (a))"
    echo "base diff 1da7eb17b..HEAD -- src demo tests package.json (empty = base (a)): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json | tail -1)]"
    echo "wider list: [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    for br in release/10.1.1 release/10.1.2; do git -C "$R" merge-base --is-ancestor "$br" HEAD 2>/dev/null; echo "$br ancestor of HEAD: exit $? (1 = not merged)"; done
    for p in "$FV11A" "$FV11" "$MIN10"; do git -C "$W" apply --check "$p"; echo "git apply --check $(basename "$p") at HEAD: exit $? sha1 $(shasum "$p" | cut -c1-8) files $(grep -c '^diff --git' "$p")"; done
    clean && git -C "$W" apply "$FV11"; is "$FV11" || exit 3
  } 2>&1 | tee "$REC/setup.log"
  ;;
compose)
  is "$FV11" || exit 3
  { git -C "$W" apply -R "$FV11" && clean && git -C "$W" apply "$FV11A" && git -C "$W" apply "$R32" && git -C "$W" diff HEAD --binary | cmp - "$FV11" && echo "floor-v11a + FV11-r32.diff = floor-v11.patch (cmp exit 0)"
    is "$FV11" || exit 3
    echo "FV11-r32.diff files: $(grep '^diff --git' "$R32" | awk '{print $3}' | tr '\n' ' ')"
    git -C "$W" apply -R "$FV11" && clean && git -C "$W" apply "$P11/minor-split-v9.patch" && git -C "$W" apply "$P11/MS9-seat-proposed.diff" && git -C "$W" apply "$P11/crit-minor-proposed.diff" && git -C "$W" diff HEAD --binary | cmp - "$MIN10" && echo "minor v9 + MS9-seat-proposed + crit-minor-proposed = minor-split-v10.patch (cmp exit 0)"
    swap "$MIN10" "$FV11"
  } 2>&1 | tee "$REC/compose.log"
  ;;
static)
  is "$FV11" || exit 3
  cd "$H"
  { node prose-sweep.mjs --root "$W" --patch "$FV11" --declare "$D11" --rulings "$P12/FV11-rulings.json" > "$REC/sweep-fv11.log" 2>&1; echo "SWEEP fv11 under FV11-rulings.json exit $?: $(tail -1 "$REC/sweep-fv11.log")"
    node deleted-mechanisms.mjs --root "$W" --declare "$D11" --patch "$FV11" > "$REC/del-fv11.log" 2>&1; echo "DEL fv11 exit $?: $(tail -1 "$REC/del-fv11.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv11.log" 2>&1; echo "census fv11 exit $?: $(tail -1 "$REC/census-fv11.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv11.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv11.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    echo "-- O-87 on the veil: every backdrop-filter / blur / box-shadow / ::before / ::after in focus-veil.css (floor v11)"
    grep -nE "backdrop-filter|blur\(|box-shadow|::before|::after|filter:" "$W/src/styles/glass/focus-veil.css"
    echo "-- the tone token, every writer (src)"; cd "$W"; grep -rnE "\-\-glass-focus-veil-(tone|dim)\s*:" src | cut -c1-220
    echo "-- every composer of .glass-focus-veil (src demo)"; grep -rnE "glass-focus-veil\b" src demo --include=*.vue --include=*.ts | grep -v "^src/styles" | cut -c1-200
    swap "$FV11" "$MIN10"
    node "$H/prose-sweep.mjs" --root "$W" --patch "$MIN10" --declare "$H/deletes-minor.json" --rulings "$P11/crit-ms9-rulings.json" > "$REC/sweep-minor10.log" 2>&1; echo "SWEEP minor10 under crit-ms9-rulings.json exit $?: $(tail -1 "$REC/sweep-minor10.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-minor10.log" 2>&1; echo "census minor10 exit $?: $(tail -1 "$REC/census-minor10.log")"
    swap "$MIN10" "$FV11"
  } 2>&1 | tee "$REC/static.log"
  ;;
selftest)
  cd "$H"; D3_OUT=$W/.d3out/st node selftest.mjs --only H12-1,H13-1,H13-2,H13-3,H13-4 > "$REC/selftest-h12-h13.log" 2>&1; echo "selftest H12-1,H13-1..4 exit $? $(ts): $(tail -1 "$REC/selftest-h12-h13.log")" | tee -a "$REC/selftest.log"
  ;;
same)
  is "$FV11" || exit 3
  { node "$H/build.mjs" "$W" --label fv11 2>&1 | tail -1; echo "fv11 built $(ts)"
    swap "$FV11" "$FV11A"; node "$H/build.mjs" "$W" --label fv11a 2>&1 | tail -1; echo "fv11a built $(ts)"
    swap "$FV11A" "$MIN10"; node "$H/build.mjs" "$W" --label minor10 2>&1 | tail -1; echo "minor10 built $(ts)"
    swap "$MIN10" "$FV11"
    for l in fv11 fv11a minor10; do for c in "$D3_OUT/builds/$l/dist"/assets/*.css; do echo "$l specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    mkdir -p "$B/css"; cp "$D3_OUT/builds/fv11a/dist"/assets/*.css "$B/css/fv11a.css"; cp "$D3_OUT/builds/fv11/dist"/assets/*.css "$B/css/fv11.css"
    python3 -I "$P12/FV11-lightproof.py" "$B/css/fv11a.css" "$B/css/fv11.css" > "$REC/lightproof.log" 2>&1; echo "LIGHTPROOF exit $?: $(tail -1 "$REC/lightproof.log")"
  } 2>&1 | tee "$REC/same.log"
  ;;
cr|wk)
  # One engine per admission: the thin state capture (fv11a, fv11) read by M-9 --r32; the tone plant (H13-2) and the
  # critic's R-37 guard plant (1 % dark veil background) over fv11; the engine witness; in Chromium also the hues cell.
  e=chromium; [ "$phase" = wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  N=${CRIT_RUN:-1}
  { for l in fv11a fv11; do
      c=$D3_OUT/caps/crit-$l-$e-$N; rm -rf "$c"
      node "$H/capture.mjs" "$D3_OUT/builds/$l/dist" --out "$c" --engines $e --themes light,dark --scenes state --grounds aurora,paper > "$REC/cap-$l-$e-$N.log" 2>&1; echo "capture $l $e $N exit $? $(ts)"
      node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 > "$REC/M-9-r32-$l-$e-$N.log" 2>&1; echo "M-9 --r32 $l $e $N: $(tail -1 "$REC/M-9-r32-$l-$e-$N.log")"
    done
    c=$D3_OUT/caps/crit-plant37-$e-$N; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines $e --themes dark --scenes state --grounds aurora,paper --variant base --inject "$PLANT37" > "$REC/cap-plant37-$e-$N.log" 2>&1; echo "capture plant37 $e $N exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 > "$REC/M-9-r32-plant37-$e-$N.log" 2>&1; echo "M-9 --r32 plant37 $e $N: $(tail -1 "$REC/M-9-r32-plant37-$e-$N.log")"
    c=$D3_OUT/caps/crit-notone-$e-$N; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines $e --themes dark --scenes state --grounds aurora,paper --variant base --inject "$P12/BV11-plant-r32-notone.css" > "$REC/cap-notone-$e-$N.log" 2>&1; echo "capture notone $e $N exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 > "$REC/M-9-r32-notone-$e-$N.log" 2>&1; echo "M-9 --r32 notone $e $N: $(tail -1 "$REC/M-9-r32-notone-$e-$N.log")"
    if [ $e = chromium ] && [ "$N" = 1 ]; then
      c=$D3_OUT/caps/crit-hues-chromium; rm -rf "$c"
      node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines chromium --themes dark --scenes state --grounds paper --variant veil-hues --inject "$H/veil-hues.css" --worktree "$W" > "$REC/cap-hues-chromium.log" 2>&1; echo "capture hues chromium exit $? $(ts)"
      node "$H/field-reader.mjs" "$D3_OUT/caps/crit-fv11-chromium-1" --engines chromium --hues "$c" > "$REC/field-chromium.log" 2>&1; echo "FIELD chromium exit $?: $(tail -1 "$REC/field-chromium.log")"
    fi
    if [ "$N" = 1 ]; then node "$P13/crit-engine-witness.mjs" $e "$B/css/fv11.css" "$REC/engine-witness-$e.json" > "$REC/engine-witness-$e.log" 2>&1; echo "engine witness $e exit $?: $(cut -c1-900 "$REC/engine-witness-$e.log")"; fi
  } 2>&1 | tee -a "$REC/capture-$e.log"
  ;;
offspot)
  for e in chromium webkit; do
    node "$P12/crit-offspot.mjs" "$D3_OUT/caps/crit-fv11a-$e-1" "$D3_OUT/caps/crit-fv11-$e-1" $e > "$REC/offspot-$e.log" 2>&1; echo "offspot $e exit $?"; grep -E "^light |identity|PASS|FAIL" "$REC/offspot-$e.log" | head -12
  done 2>&1 | tee "$REC/offspot.log"
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p13" 2>/dev/null
    echo "worktrees naming D3/p13/crit: $(git -C "$R" worktree list | grep -c 'D3/p13/crit')"; ls "$R/.claude/worktrees/bl/D3/" 2>&1
  } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
