#!/usr/bin/env bash
# FV6-run.sh · D3 pass 7, floor v6 (REGISTRY P6-6.2 step 2): every command this seat ran, by phase.
# floor v6 = pass-6/floor-v5.patch + R-15 (five comment sentences: dock/README.md:20, dock-search.vue:197-198,
# glass-material.vue:4-7, overlay-plate.css:271-272, auth-shell.vue:209-210), written whole as pass-7/floor-v6.patch.
# One worktree (.claude/worktrees/bl/D3/p7/floor6/wt); floor v6 is applied by default, and a phase that needs floor v5,
# the minor v4 or HEAD swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-fv6. Records land in pass-7/FV6-records/.
#   bash FV6-run.sh declare|static|build|bytes|same|demo-cr|m3|toolchain|tsc-test2|demo-cr2|check|battery-cr|witnesses|readings|plants-read|rerun-cr|teardown
#   ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash FV6-run.sh wk-battery
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p7/floor6
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P7=$M/pass-7
REC=$P7/FV6-records
FV5=$M/pass-6/floor-v5.patch
FV6=$P7/floor-v6.patch
MS4=$M/pass-6/minor-split-v4.patch
GL=(~/.claude/guard/guarded --light --timeout 15 --)
GH=(~/.claude/guard/guarded --timeout 60 --)
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
declare)
  # R-15 (iii): the declaration built from floor-v6.patch's removed lines, the hand concepts, and this seat's exact rulings
  # (floor-v6-exact.json, each read in context: del-fv6-noexact.log is DEL with none).
  cd "$H"
  "${GL[@]}" node declare-removed.mjs --patch "$FV6" --root "$W" --concepts deletes-floor.json --out "$REC/declare-floor-v6-raw.json"
  "${GL[@]}" node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v6-raw.json" > "$REC/del-fv6-noexact.log" 2>&1; echo "DEL fv6, no exact rulings, exit $?"
  "${GL[@]}" node declare-removed.mjs --patch "$FV6" --root "$W" --concepts deletes-floor.json --exact "$P7/floor-v6-exact.json" --out "$REC/declare-floor-v6.json" | tee "$REC/declare-floor-v6.log"
  ;;
static)
  # DEL under H7-2 (fixture floor v6, plant floor v5 under the same declaration), LAW, HOV, LIT, the census (with its
  # 10.1.0 bite read by the census on HEAD's src/styles), the ladder diff against the minor v4 (bite: HEAD).
  is "$FV6" || exit 3
  cd "$H"
  { echo "-- DEL floor v6 under its declaration (fixture)"; "${GL[@]}" node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v6.json" > "$REC/del-fv6.log" 2>&1; echo "DEL fv6 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-fv6.log")"
    echo "-- DEL floor v6 under deletes-floor.json alone"; "${GL[@]}" node deleted-mechanisms.mjs --root "$W" --declare deletes-floor.json > "$REC/del-floor-fv6.log" 2>&1; echo "exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-floor-fv6.log")"
    echo "-- LAW"; "${GL[@]}" node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    "${GL[@]}" node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv6.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv6.log")"
    "${GL[@]}" node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv6.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv6.log" | tail -1)"
    "${GL[@]}" node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv6.log" 2>&1; echo "census fv6 exit $?: $(tail -1 "$REC/census-fv6.log")"
    radii > "$REC/radii-fv6.txt"
    swap "$FV6" "$FV5"
    echo "-- DEL floor v5 under the floor v6 declaration (plant)"; "${GL[@]}" node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v6.json" > "$REC/del-fv5-plant.log" 2>&1; echo "DEL fv5 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-fv5-plant.log")"
    radii > "$REC/radii-fv5.txt"
    swap "$FV5" "$MS4"; radii > "$REC/radii-minor4.txt"
    to_head "$MS4"; radii > "$REC/radii-head.txt"
    "${GL[@]}" node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source) exit $?: $(tail -1 "$REC/census-head.log")"
    from_head "$FV6"
    echo "-- LADDER diff radii-fv6 radii-minor4 (fixture: prints nothing)"; diff "$REC/radii-fv6.txt" "$REC/radii-minor4.txt"; echo "LADDER fv6 exit $?"
    echo "-- LADDER diff radii-fv5 radii-fv6"; diff "$REC/radii-fv5.txt" "$REC/radii-fv6.txt"; echo "LADDER fv5-fv6 exit $?"
    echo "-- LADDER diff radii-head radii-minor4 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-minor4.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
build)
  # Floor v6's and floor v5's specimens and dist-demo (harness build.mjs --demo), one guarded run each. Floor v6 left applied.
  is "$FV6" || exit 3
  "${GH[@]}" node "$H/build.mjs" "$W" --label fv6 --demo 2>&1 | tail -2; echo "fv6 built $(ts)"
  swap "$FV6" "$FV5"
  "${GH[@]}" node "$H/build.mjs" "$W" --label fv5 --demo 2>&1 | tail -2; echo "fv5 built $(ts)"
  swap "$FV5" "$FV6"
  ;;
bytes)
  # The byte-identity proof: every file of the specimen dist and the dist-demo, build.json (paths, timings) excluded.
  O=$D3_OUT/builds
  for k in dist demo; do
    (cd "$O/fv6/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/bytes-fv6-$k.sha256"
    (cd "$O/fv5/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/bytes-fv5-$k.sha256"
    echo "$k: fv6 $(wc -l < "$REC/bytes-fv6-$k.sha256" | tr -d ' ') files, fv5 $(wc -l < "$REC/bytes-fv5-$k.sha256" | tr -d ' ') files"
    diff "$REC/bytes-fv5-$k.sha256" "$REC/bytes-fv6-$k.sha256"; echo "diff $k exit $?"
    diff -rq -x build.json "$O/fv5/$k" "$O/fv6/$k"; echo "diff -rq $k exit $?"
  done 2>&1 | tee "$REC/bytes.log"
  for l in fv5 fv6; do for c in "$O/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B"; done; done | tee -a "$REC/bytes.log"
  ;;
same)
  # The `bytes` phase found the specimen JS differing only in two `//#region` comments that carry the build label's path,
  # and the dist-demo differing in hashed chunk names. So both trees are rebuilt under ONE label ("same"), each output
  # moved aside, then compared byte for byte (dist and demo), and the demo again with Vite's 8-character chunk hashes and
  # Vue's scoped ids (`data-v-<8 hex>`, which @vitejs/plugin-vue hashes from the SFC's source in production) normalised.
  is "$FV6" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  "${GH[@]}" node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv6"; echo "fv6 built as 'same' $(ts)"
  swap "$FV6" "$FV5"
  "${GH[@]}" node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv5"; echo "fv5 built as 'same' $(ts)"
  swap "$FV5" "$FV6"
  "${GH[@]}" node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv6b"; echo "fv6 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json -x .vite -x .vite-demo -x app "$S/fv5/$k" "$S/fv6/$k" > "$REC/same-$k-fv5-fv6.txt"; echo "$k fv5 vs fv6: diff -rq exit $?, $(wc -l < "$REC/same-$k-fv5-fv6.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/fv6/$k" "$S/fv6b/$k" > /dev/null; echo "$k fv6 vs fv6 rebuilt: diff -rq exit $?"
      (cd "$S/fv6/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv6-$k.sha256"
      (cd "$S/fv5/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv5-$k.sha256"
    done
    for l in fv5 fv6; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    python3 -I - "$S" <<'EOF'
import os, re, sys, hashlib
S = sys.argv[1]
HASH = rb'-[A-Za-z0-9_-]{8}\.(js|css|woff2?|svg|png|json|wasm|html)'
def norm(root, scoped):
    out = {}
    for dp, _, fs in os.walk(root):
        for f in fs:
            if f == "build.json": continue
            p = os.path.join(dp, f); b = open(p, "rb").read()
            b = re.sub(HASH, rb'-H.\1', b)
            if scoped: b = re.sub(rb'data-v-[0-9a-f]{8}', b'data-v-S', b)
            k = re.sub(r'-[A-Za-z0-9_-]{8}\.', '-H.', os.path.relpath(p, root))
            out.setdefault(k, []).append(hashlib.sha256(b).hexdigest())
    return out
for scoped in (False, True):
    a, b = norm(f"{S}/fv5/demo", scoped), norm(f"{S}/fv6/demo", scoped)
    d = [k for k in sorted(set(a) | set(b)) if sorted(a.get(k, [])) != sorted(b.get(k, []))]
    print(f"demo, chunk hashes normalised{', scoped ids normalised' if scoped else ''}: {len(a)} files · {len(b)} files · differ {len(d)} {d}")
EOF
  } 2>&1 | tee "$REC/same.log"
  ;;
demo-cr)
  # The dist-demo is not byte-identical (same.log: the scoped ids of auth-shell and dock-search). The battery reads only
  # the specimen dist; the demo's paint readings are R-12's two probes on /dock/dock-search, so both re-read on floor v6's
  # own demo (and on floor v5's same-label demo beside it), Chromium, each one guarded run with one browser.
  S=$D3_OUT/same; F=$REC/frames; mkdir -p "$F"
  for l in fv6 fv5; do
    "${GH[@]}" node "$M/pass-6/FV5-demo-probe.mjs" "$S/$l/demo" --label $l --engines chromium --shots "$F" --out "$REC/demo-$l-chromium.json" > "$REC/demo-$l-chromium.log" 2>&1; echo "demo-probe $l chromium exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-$l-chromium.log"
    "${GH[@]}" node "$M/pass-6/crit-demo-probe.mjs" "$S/$l/demo" --label $l --engines chromium --shots "$F" --out "$REC/critdemo-$l-chromium.json" > "$REC/critdemo-$l-chromium.log" 2>&1; echo "crit-demo $l chromium exit $? $(ts)"; grep -E '^CRIT' "$REC/critdemo-$l-chromium.log"
  done 2>&1 | tee "$REC/demo-cr.log"
  ;;
wk-inner)
  # Under ONE `guarded --timeout 90 --exclusive webkit` admission, queued after every Chromium phase: R-12's probe on
  # floor v6's demo in Playwright WebKit (the record; H-14's crash class expected, FV5 §3.2).
  echo "admitted $(ts)"
  node "$M/pass-6/FV5-demo-probe.mjs" "$D3_OUT/same/fv6/demo" --label fv6 --engines webkit --out "$REC/demo-fv6-webkit.json" > "$REC/demo-fv6-webkit.log" 2>&1; echo "demo-probe fv6 webkit exit $? $(ts)"; grep -E '^DEMO|crash' "$REC/demo-fv6-webkit.log" | head -4
  ;;
toolchain)
  # Typecheck (src, tests), library build, dist-demo (before the units: the boot-graph rows read it), vitest --maxWorkers=2.
  is "$FV6" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv6/vite" };\n' > vite.fv6.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv6/vitest" };\n' > vitest.fv6.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fv6/vite-demo" };\n' > vite.fv6demo.config.ts
  { "${GH[@]}" npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    "${GH[@]}" npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    "${GH[@]}" npx vite build --config vite.fv6.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    "${GH[@]}" npx vite build --config vite.fv6demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    "${GH[@]}" npx vitest run --config vitest.fv6.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"; } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv6.config.ts vitest.fv6.config.ts vite.fv6demo.config.ts
  ;;
m3)
  # H7-1's M-3 re-read on floor v6's own pixels: the dialog scene (the Close ring's), Chromium, both themes, every ground,
  # captured fresh and read by the live m3-non-text.mjs (H7-1's ringFallbackRead) with --verbose. Chromium only: the
  # banked WebKit rings have no full-coverage column (H7 §3), so H7-1 moves no WebKit verdict.
  is "$FV6" || exit 3
  N=${M3_RUN:-1}
  "${GH[@]}" node "$H/capture.mjs" "$D3_OUT/builds/fv6/dist" --out "$D3_OUT/caps/fv6-m3-$N" --engines chromium --themes light,dark --scenes dialog > "$REC/m3-capture-$N.log" 2>&1; echo "capture $N exit $? $(ts)"
  "${GL[@]}" node "$H/m3-non-text.mjs" "$D3_OUT/caps/fv6-m3-$N" --gate chromium --verbose --cells "dialog$" > "$REC/m3-fv6-$N.txt" 2>&1; echo "M-3 $N exit $?: $(tail -1 "$REC/m3-fv6-$N.txt")"
  ;;
tsc-test2)
  # The toolchain phase ran the test typecheck before the library build; its 2 errors are the package self-import
  # `@mkbabb/glass-ui/fourier-math` (FourierField.smoke.test.ts:18-19), which resolves through dist/. Re-run after it.
  is "$FV6" || exit 3
  cd "$W"; "${GH[@]}" npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test-2.log" 2>&1; echo "typecheck tests (after the library build) exit $? $(ts)" | tee -a "$REC/toolchain.log"
  ;;
demo-cr2)
  # The dark crit frame's crop differed in height between fv5 and fv6 (frames-pixdiff.log). Re-run the crit probe on
  # both demos once more, to read whether the crop height varies run to run.
  S=$D3_OUT/same; F=$REC/frames-run2; mkdir -p "$F"
  for l in fv6 fv5; do
    "${GH[@]}" node "$M/pass-6/crit-demo-probe.mjs" "$S/$l/demo" --label $l --engines chromium --shots "$F" --out "$REC/critdemo-$l-chromium-2.json" > "$REC/critdemo-$l-chromium-2.log" 2>&1; echo "crit-demo $l run 2 exit $? $(ts)"; grep -E '^CRIT-DEMO' "$REC/critdemo-$l-chromium-2.log"
  done 2>&1 | tee "$REC/demo-cr2.log"
  for f in "$REC"/frames/crit-*.png "$F"/crit-*.png; do echo "$(basename "$(dirname "$f")")/$(basename "$f") $(file "$f" | grep -o '[0-9]* x [0-9]*')"; done | tee -a "$REC/demo-cr2.log"
  ;;
check)
  # git apply --check of floor-v6.patch at HEAD, in the worktree returned to HEAD; then floor v6 re-applied.
  to_head "$FV6"; git -C "$W" apply --check "$FV6" 2>/dev/null; echo "git apply --check floor-v6.patch at $(git -C "$W" rev-parse --short=9 HEAD) exit $?"; from_head "$FV6"
  # R-15's delta (floor v5 → floor v6), the five files, written as floor-v6-R15.diff
  D=$B/r15; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  FILES="src/components/dock/README.md demo/stories/dock/dock-search.vue demo/stories/substrates/glass-material.vue src/styles/glass/overlay-plate.css demo/stories/compositions/auth-shell.vue"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$FV6" "$FV5"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done; swap "$FV5" "$FV6"
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P7/floor-v6-R15.diff"
  echo "floor-v6-R15.diff: $(grep -c '^diff --git' "$P7/floor-v6-R15.diff") files, +$(grep -c '^+[^+]' "$P7/floor-v6-R15.diff")/-$(grep -c '^-[^-]' "$P7/floor-v6-R15.diff")"
  # composition: floor v5 + R15 = floor v6, byte for byte
  swap "$FV6" "$FV5"; git -C "$W" apply "$P7/floor-v6-R15.diff" && git -C "$W" diff HEAD --binary | cmp - "$FV6" && echo "floor-v5.patch + floor-v6-R15.diff = floor-v6.patch (cmp)"
  is "$FV6" || exit 3
  echo "floor-v6.patch: $(grep -c '^diff --git' "$FV6") files, sha1 $(shasum "$FV6" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
  ;;
battery-cr)
  # P6-6.2 step 2's literal rule (re-seat, 2026-10-17 22:xx): the dist-demo is not byte-identical (same.log: two Vue scoped
  # ids), so the full battery runs in both engines, as pass 6 did (FV5-run.sh battery-cr / wk-inner / witnesses / baseline /
  # readings / plants-read). Chromium half: the headless shell; the cited field windows take CHROMIUM_FIELD_ARGS (lib.mjs
  # GPU-WITNESS). Reads floor v6's specimen dist at $D3_OUT/builds/fv6/dist.
  is "$FV6" || exit 3
  touch "$B/cr-busy"
  "${GH[@]}" node "$H/run.mjs" "$W" --label fv6 --skip-build --engines chromium 2>&1 | tee "$REC/fv6-run-chromium.log" | tail -4
  rm -f "$B/cr-busy"
  ;;
wk-battery)
  # Every Playwright WebKit item under ONE admission, queued after the Chromium half:
  #   ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash FV6-run.sh wk-battery
  # (1) the battery's WebKit half; (2) the R plants, the owner variants and the floor plants over floor v6 (FV3-plants,
  # FV2-plants; both engines, diag-held-noveil Chromium only), as FV5 ran them; (3) R-12's demo probe in Playwright WebKit
  # on floor v6's own demo.
  echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"
  while [ -e "$B/cr-busy" ]; do sleep 15; done; echo "clear of Chromium phases $(ts)" | tee -a "$REC/wk-admission.log"
  is "$FV6" || exit 3
  { node "$H/run.mjs" "$W" --label fv6 --skip-build --engines webkit > "$REC/fv6-run-webkit.log" 2>&1; echo "battery-wk exit $? $(ts)"; tail -3 "$REC/fv6-run-webkit.log"
    node "$M/pass-4/FV3-plants.mjs" "$D3_OUT/builds/fv6/dist" "$W" --out "$D3_OUT/plants" --only "${PLANTS:-plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom}" > "$REC/plants.log" 2>&1; echo "FV3-plants exit $? $(ts)"
    node "$M/pass-3/FV2-plants.mjs" "$D3_OUT/builds/fv6/dist" "$W" --out "$D3_OUT/flplants" --only "${FLPLANTS:-plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,risk-opaque-ancestor,diag-held-noveil}" > "$REC/floor-plants.log" 2>&1; echo "FV2-plants exit $? $(ts)"
    node "$M/pass-6/FV5-demo-probe.mjs" "$D3_OUT/same/fv6/demo" --label fv6 --engines webkit --out "$REC/demo-fv6-webkit.json" > "$REC/demo-fv6-webkit.log" 2>&1; echo "demo-probe fv6 webkit exit $? $(ts)"; grep -E '^DEMO|crash' "$REC/demo-fv6-webkit.log" | head -4
    echo "done $(ts)"; } 2>&1 | tee -a "$REC/wk-admission.log"
  ;;
witnesses)
  # Every witness over both engines' captures (no capture), the verbose rows, the baseline and its diff against FV5's.
  is "$FV6" || exit 3
  "${GL[@]}" node "$H/run.mjs" "$W" --label fv6 --skip-build --skip-capture > "$REC/fv6-witnesses.log" 2>&1; tail -30 "$REC/fv6-witnesses.log"
  mkdir -p "$REC/fv6-results" "$REC/verbose"; cp "$D3_OUT"/caps/fv6/results/*.log "$REC/fv6-results/"
  for w in m2-text-contrast:m2 m3-non-text:m3 m2-held-window:m2h m8-chrome-calm:m8 t-transmission:t m6-separable-ladder:m6; do
    "${GL[@]}" node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv6" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-fv6.txt" 2>&1; done
  "${GL[@]}" node "$H/baseline.mjs" "$D3_OUT/caps/fv6" --out "$REC/baseline-fv6.json" > "$REC/baseline-fv6.md"
  diff "$M/pass-6/FV5-records/baseline-fv5.md" "$REC/baseline-fv6.md" > "$REC/baseline-diff-fv5-fv6.txt"; echo "baseline diff fv5 fv6 exit $? ($(wc -l < "$REC/baseline-diff-fv5-fv6.txt" | tr -d ' ') lines)"
  ;;
readings)
  for e in chromium webkit; do
    for q in a c; do "${GL[@]}" node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv6" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    "${GL[@]}" node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv6" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    "${GL[@]}" node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv6" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    "${GL[@]}" node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv6" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done 2>&1 | tee "$REC/readings.log"
  ;;
plants-read)
  # Every plant read by the witness its ruling names, both engines (FV5-run.sh plants-read, on floor v6).
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local d=$1 id=$2 w=$3 tag=$4; shift 4; for e in ${RD_ENGINES:-chromium webkit}; do
      "${GL[@]}" node "$H/$w.mjs" "$D3_OUT/$d/$id" --gate $e "$@" > "$PR/$id-$tag-$e.log" 2>&1
      echo "$id | $tag | $e | $(tail -1 "$PR/$id-$tag-$e.log")" | tee -a "$PR/readings.log"; done; }
  rd plants plant-R1 m4-dock-register M-4 --cells dark
  rd plants plant-R2 m9-state-registers M-9 --cells dark
  rd plants probe-R2-35 m9-state-registers M-9 --cells dark
  rd plants plant-R3 o66-field-row O-66 --cells .
  rd plants plant-R4 o66-field-row O-66 --cells .
  rd plants plant-q1c-noroom m6-separable-ladder M-6-q1c --cells dark --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1c --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1a --q1 a
  rd plants var-q11b m1x-off-paper M-1x-q11b --q11 b
  rd plants var-q11b wa-no-signal W-A-q11b --q11 b
  rd plants var-q11b wa-no-signal W-A-a
  rd plants var-q11b m1-no-grey M-1
  rd flplants plant-bound m2-text-contrast M-2 --cells '(ladder|dialog)$'
  rd flplants plant-heldfloor m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-carrierveil m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-darkperim m3-non-text M-3 --cells dark
  rd flplants plant-noisolation m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-noisolation stack-host STACK --cells 'held$'
  rd flplants risk-opaque-ancestor m2-text-contrast M-2 --cells 'held$'
  RD_ENGINES=chromium rd flplants diag-held-noveil m2-held-window M-2h --cells . --verbose
  echo "end $(ts)" >> "$PR/readings.log"
  diff <(sed 1d "$M/pass-6/FV5-records/plants/readings.log" | grep -v '^end') <(sed 1d "$PR/readings.log" | grep -v '^end') > "$REC/plants-diff-fv5-fv6.txt"; echo "plant readings diff fv5 fv6 exit $?"
  ;;
rerun-cr)
  # Every Chromium red cell's scenes re-captured twice and re-read (RERUN_* pick them).
  for n in 1 2; do
    "${GH[@]}" node "$H/capture.mjs" "$D3_OUT/builds/fv6/dist" --out "$D3_OUT/caps/rerun-chromium$n" --engines chromium --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-chromium$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m3-non-text m6-separable-ladder}; do "${GL[@]}" node "$H/$w.mjs" "$D3_OUT/caps/rerun-chromium$n" --gate chromium --verbose > "$REC/rerun-chromium$n-$w.log" 2>&1; echo "rerun chromium $n $w $(ts): $(tail -1 "$REC/rerun-chromium$n-$w.log")"; done
  done 2>&1 | tee -a "$REC/rerun-cr.log"
  ;;
rerun-wk)
  # The Playwright WebKit battery's one row red on floor v6 (M-3 light checker ladder: floating·well, overlay·well, straight-run
  # rings) re-captured twice under ONE admission and re-read:
  #   ~/.claude/guard/guarded --timeout 30 --exclusive webkit -- bash FV6-run.sh rerun-wk
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/fv6/dist" --out "$D3_OUT/caps/rerun-webkit$n" --engines webkit --themes light --scenes ladder --grounds checker > "$REC/rerun-webkit$n-capture.log" 2>&1
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/rerun-webkit$n" --gate webkit --verbose --cells 'light checker ladder$' > "$REC/rerun-webkit$n-m3-non-text.log" 2>&1; echo "rerun webkit $n m3 $(ts): $(tail -1 "$REC/rerun-webkit$n-m3-non-text.log")"; grep -E 'ring:well|under 3.0' "$REC/rerun-webkit$n-m3-non-text.log" | head -4
  done 2>&1 | tee -a "$REC/rerun-wk.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; ls "$R/.claude/worktrees/bl/D3/p7/" 2>&1
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
