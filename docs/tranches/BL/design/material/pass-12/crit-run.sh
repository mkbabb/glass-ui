#!/usr/bin/env bash
# crit-run.sh · D3 pass 12, the CRITIC (REGISTRY P11-6.3 step 5): every command the critic ran, by phase.
# Base: HEAD of master at launch; release/10.1.1 is NOT merged during pass 12 (P11-5).
# One worktree (.claude/worktrees/bl/D3/p12/crit/wt) cut at HEAD, node_modules symlinked; floor v11 applied by default,
# floor v11a / HEAD / the minor v10 reached by cmp-checked swaps. Builds, captures and caches live in $W/.d3out.
# Records land in pass-12/crit-records/.
# Launch law: every phase is `~/.claude/guard/guarded ... -- bash crit-run.sh <phase>`:
#   --light                          setup, compose, static, selftest, offspot, units, teardown (no browser)
#   --timeout 30/60 (heavy)          same (builds), cr (Chromium thin capture, the headless shell with no arguments)
#   --exclusive webkit --timeout 60  wk (one Playwright WebKit capture group, one admission)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p12/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P11=$M/pass-11
P12=$M/pass-12
REC=$P12/crit-records
FV11A=$P12/floor-v11a.patch
FV11=$P12/floor-v11.patch
R32=$P12/FV11-r32.diff
MIN10=$P12/minor-split-v10.patch
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
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1 not merged, P11-5)"
    echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    for p in "$FV11A" "$FV11" "$MIN10"; do git -C "$W" apply --check "$p"; echo "git apply --check $(basename "$p") at HEAD: exit $? sha1 $(shasum "$p" | cut -c1-8) files $(grep -c '^diff --git' "$p")"; done
    clean && git -C "$W" apply "$FV11"; is "$FV11" || exit 3
  } 2>&1 | tee "$REC/setup.log"
  ;;
compose)
  # The compositions, re-proved: floor v11a + FV11-r32.diff = floor v11; minor v9 + both pass-11 deltas = minor v10;
  # FV11-r32.diff touches only the 4 files it names; the patch-of-patches minor v9 -> v10 is comment-only.
  is "$FV11" || exit 3
  { git -C "$W" apply -R "$FV11" && clean && git -C "$W" apply "$FV11A" && git -C "$W" apply "$R32" && git -C "$W" diff HEAD --binary | cmp - "$FV11" && echo "floor-v11a + FV11-r32.diff = floor-v11.patch (cmp exit 0)"
    is "$FV11" || exit 3
    echo "FV11-r32.diff files: $(grep '^diff --git' "$R32" | awk '{print $3}' | tr '\n' ' ')"
    git -C "$W" apply -R "$FV11" && clean && git -C "$W" apply "$P11/minor-split-v9.patch" && git -C "$W" apply "$P11/MS9-seat-proposed.diff" && git -C "$W" apply "$P11/crit-minor-proposed.diff" && git -C "$W" diff HEAD --binary | cmp - "$MIN10" && echo "minor v9 + MS9-seat-proposed + crit-minor-proposed = minor-split-v10.patch (cmp exit 0)"
    swap "$MIN10" "$FV11"
    echo "-- patch-of-patches minor v9 -> minor v10 (changed +/- lines only)"
    diff "$P11/minor-split-v9.patch" "$MIN10" | grep -E '^[<>] [+-]'
    echo "-- patch-of-patches floor v11a -> floor v11, added/removed lines that are not inside the 4 R-32 files: (none expected)"
    python3 -I - "$FV11A" "$FV11" <<'PY'
import sys,re
def files(p):
    out={}; cur=None
    for l in open(p,encoding="utf-8",errors="replace"):
        if l.startswith("diff --git"): cur=l.split()[2][2:]; out[cur]=[]
        elif cur: out[cur].append(l)
    return out
a,b=files(sys.argv[1]),files(sys.argv[2])
moved=[f for f in sorted(set(a)|set(b)) if a.get(f)!=b.get(f)]
print("files whose patch hunk differs:",moved)
PY
  } 2>&1 | tee "$REC/compose.log"
  ;;
static)
  # The static half on floor v11 (re-read, not trusted): the list under FV11-rulings.json and its plant, DEL, census,
  # the neighbourhood print of R-32's re-valued token, and every consumer/prose grep R-36 names.
  is "$FV11" || exit 3
  cd "$H"
  { node prose-sweep.mjs --root "$W" --patch "$FV11" --declare "$P12/FV11-records/declare-floor-v11.json" --rulings "$P12/FV11-rulings.json" > "$REC/sweep-fv11.log" 2>&1; echo "SWEEP fv11 under FV11-rulings.json exit $?: $(tail -1 "$REC/sweep-fv11.log")"
    node deleted-mechanisms.mjs --root "$W" --declare "$P12/FV11-records/declare-floor-v11.json" --patch "$FV11" > "$REC/del-fv11.log" 2>&1; echo "DEL fv11 exit $?: $(tail -1 "$REC/del-fv11.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv11.log" 2>&1; echo "census fv11 exit $?: $(tail -1 "$REC/census-fv11.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv11.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv11.log")"
    node neighbourhood.mjs --root "$W" --patch "$R32" > "$REC/neighbourhood-r32.log" 2>&1; echo "NEIGHBOURHOOD (FV11-r32.diff) exit $?: $(tail -1 "$REC/neighbourhood-r32.log")"
    echo "-- every reader of the focus veil and its tokens (src demo tests docs/canon DESIGN.md README CHANGELOG)"
    cd "$W"; grep -rnE "glass-focus-veil|focus-veil-(dim|tone)" src demo tests docs/canon DESIGN.md README.md CHANGELOG.md 2>/dev/null | grep -v '^tests/styles/focus-veil.test.ts' | cut -c1-220
    echo "-- prose naming the dark veil's black / 40% / darkening (R-36), floor v11"
    grep -rniE "focus.veil.{0,80}(black|40 ?%|brown|darken)|(black|40 ?%).{0,60}focus.veil|veil-dim.{0,60}(black|#000)" src demo tests docs/canon DESIGN.md README.md CHANGELOG.md 2>/dev/null | cut -c1-240
    echo "-- @supports / fallback arms that read backdrop-filter near the veil"
    grep -rnE "@supports.*backdrop|backdrop-filter" src/styles/glass/focus-veil.css src/components/dialog/ModalOverlay.vue src/components/slider/Slider.vue 2>/dev/null
  } 2>&1 | tee "$REC/static.log"
  ;;
same)
  # floor v11a, floor v11 and the minor v10 built (specimen CSS hashes against the banks), the light proof re-run on
  # this session's CSS. Heavy (vite), no browser.
  is "$FV11" || exit 3
  { node "$H/build.mjs" "$W" --label fv11 2>&1 | tail -1; echo "fv11 built $(ts)"
    swap "$FV11" "$FV11A"; node "$H/build.mjs" "$W" --label fv11a 2>&1 | tail -1; echo "fv11a built $(ts)"
    swap "$FV11A" "$MIN10"; node "$H/build.mjs" "$W" --label minor10 2>&1 | tail -1; echo "minor10 built $(ts)"
    swap "$MIN10" "$FV11"
    for l in fv11 fv11a minor10; do for c in "$D3_OUT/builds/$l/dist"/assets/*.css; do echo "$l specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    mkdir -p "$B/css"; cp "$D3_OUT/builds/fv11a/dist"/assets/*.css "$B/css/fv11a.css"; cp "$D3_OUT/builds/fv11/dist"/assets/*.css "$B/css/fv11.css"
    python3 -I "$P12/FV11-lightproof.py" "$B/css/fv11a.css" "$B/css/fv11.css" > "$REC/lightproof.log" 2>&1; echo "LIGHTPROOF exit $?: $(tail -1 "$REC/lightproof.log")"
    grep -n "focus-veil" "$B/css/fv11.css" | cut -c1-300 > "$REC/fv11-css-focus-veil-lines.txt"; echo "fv11 css lines naming focus-veil: $(wc -l < "$REC/fv11-css-focus-veil-lines.txt" | tr -d ' ')"
  } 2>&1 | tee "$REC/same.log"
  ;;
cr|wk)
  # The critic's thin capture: the state scene over aurora and paper, both themes, floor v11a and floor v11, one engine
  # per admission (one browser per run, fresh context per cell: capture.mjs). Read by M-9 --r32.
  e=chromium; [ "$phase" = wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  N=${CRIT_RUN:-1}
  for l in fv11a fv11; do
    c=$D3_OUT/caps/crit-$l-$e-$N; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/$l/dist" --out "$c" --engines $e --themes light,dark --scenes state --grounds aurora,paper > "$REC/cap-$l-$e-$N.log" 2>&1; echo "capture $l $e $N exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 > "$REC/M-9-r32-$l-$e-$N.log" 2>&1; echo "M-9 --r32 $l $e $N: $(tail -1 "$REC/M-9-r32-$l-$e-$N.log")"
  done 2>&1 | tee -a "$REC/capture.log"
  ;;
offspot)
  # The critic's own reading (no browser): over the whole veiled field, not the 60 x 40 probe, per pixel, raw -> veiled
  # OKLCH, R-2 (floor v11a) and R-32 (floor v11), with the specimens' boxes masked out; and light-cell pixel identity
  # floor v11a vs floor v11.
  for e in ${OFFSPOT_ENGINES:-chromium}; do
    node "$P12/crit-offspot.mjs" "$D3_OUT/caps/crit-fv11a-$e-${CRIT_RUN:-1}" "$D3_OUT/caps/crit-fv11-$e-${CRIT_RUN:-1}" $e > "$REC/offspot-$e.log" 2>&1; echo "offspot $e exit $?"; tail -40 "$REC/offspot-$e.log"
  done 2>&1 | tee -a "$REC/offspot.log"
  ;;
selftest)
  cd "$H"; node selftest.mjs --only H12-1 > "$REC/selftest-h12.log" 2>&1; echo "selftest H12-1 exit $? $(ts): $(tail -1 "$REC/selftest-h12.log")" | tee -a "$REC/selftest.log"
  ;;
units)
  # One jsdom unit file on floor v11 (no browser): the arm's assertions.
  is "$FV11" || exit 3; cd "$W"
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  npx vitest run --config vitest.crit.config.ts --maxWorkers=2 tests/styles/focus-veil.test.ts > "$REC/units-focus-veil.log" 2>&1; echo "vitest focus-veil.test.ts exit $? $(ts): $(grep -E 'Tests  ' "$REC/units-focus-veil.log")" | tee "$REC/units.log"
  rm -f vitest.crit.config.ts
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p12" 2>/dev/null
    echo "worktrees naming D3/p12/crit: $(git -C "$R" worktree list | grep -c 'D3/p12/crit')"; ls "$R/.claude/worktrees/bl/D3/" 2>&1
  } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
