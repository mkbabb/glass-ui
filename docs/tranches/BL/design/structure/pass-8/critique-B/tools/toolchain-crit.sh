#!/usr/bin/env bash
# toolchain-crit.sh <replayed tree> <floor-base tree> <results dir> · critique-B pass 8 · written after the battery
# hash. The kit's toolchain steps, with the cascade verified against THIS seat's own floor-base snapshot (not the
# kit's committed baseline, which is compared byte for byte), and vitest bounded to 2 workers. Every step logs
# exit, wall seconds and load.
set -u
T="$1"; BASE="$2"; R="$3"; KIT="$(cd "$(dirname "$0")/../../B-kit" && pwd)"
O="$R/toolchain.txt"; L="$R/logs"; mkdir -p "$L" "$R/cascade"
load() { sysctl -n vm.loadavg; }
step() { local name="$1" log="$2" cwd="$3"; shift 3; local l0; l0=$(load); local t0; t0=$(date +%s)
  (cd "$cwd" && "$@") > "$log" 2>&1; local rc=$?; echo "$name | exit $rc | $(( $(date +%s) - t0 )) s | load $l0 -> $(load)" >> "$O"; return $rc; }
echo "toolchain (critic) $(date -u +%FT%TZ); node $(node -v)" > "$O"
step "peer probe, unbuilt tree (expect 2)" "$R/peer-unbuilt.txt" "$T" node "$KIT/tools/peer-closure.mjs" --root "$T" --base "$KIT/results/p8/peer-closure-base.json"
step "base vite build" "$L/base-build.log" "$BASE" npx vite build
step "base cascade snapshot" "$L/base-snap.log" "$BASE" node scripts/structure/cascade.mjs snapshot --root "$BASE" --dist "$BASE/dist" --out "$R/cascade/base-snap" --sha floor-S1-5b14c6c7
for f in styles.seq styles_css.seq styles_fonts.seq styles_theme.seq; do cmp -s "$KIT/results/p8/cascade/baseline/$f" "$R/cascade/base-snap/$f" && echo "baseline $f: identical to the kit's committed baseline" >> "$O" || echo "baseline $f: DIFFERS from the kit's committed baseline" >> "$O"; done
step "base peer probe (floor base)" "$R/peer-base.txt" "$BASE" node "$KIT/tools/peer-closure.mjs" --root "$BASE" --floor-base --table src/index.ts --json "$R/peer-base.json"
step "vite build" "$L/build.log" "$T" npx vite build
step "verify:package" "$L/verify-package.log" "$T" npm run verify:package
grep -oE '"ratchet":\{[^}]*\}' "$L/verify-package.log" | head -1 >> "$O"
step "vue-tsc" "$L/vue-tsc.log" "$T" npx vue-tsc --noEmit
step "vue-tsc tests" "$L/vue-tsc-test.log" "$T" npx vue-tsc --noEmit -p tsconfig.test.json
step "demo:dist:build" "$L/demo-dist.log" "$T" npm run demo:dist:build
step "cascade verify vs this seat's floor-base snapshot, kit listing" "$R/cascade/verify-listed.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/base-snap" --root "$T" --dist "$T/dist" --reorders "$KIT/authored/p6-listed-reorders.json"
echo '{}' > "$R/cascade/empty.json"
step "cascade verify, no listing (expect RED)" "$R/cascade/verify-nolisting.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/base-snap" --root "$T" --dist "$T/dist" --reorders "$R/cascade/empty.json"
step "peer probe (built)" "$R/peer-built.txt" "$T" node "$KIT/tools/peer-closure.mjs" --root "$T" --base "$KIT/results/p8/peer-closure-base.json" --json "$R/peer-built.json"
step "peer probe (built) vs this seat's base report" "$R/peer-built-ownbase.txt" "$T" node "$KIT/tools/peer-closure.mjs" --root "$T" --base "$R/peer-base.json"
step "seal.test.ts" "$L/seal-test.log" "$T" npx vitest run tests/gates/seal.test.ts --maxWorkers=2
grep -hE "Test Files|Tests " "$L/seal-test.log" >> "$O"
step "vitest full" "$L/vitest.log" "$T" npx vitest run --maxWorkers=2
grep -hE "Test Files|Tests " "$L/vitest.log" >> "$O"
echo "toolchain end $(date -u +%FT%TZ) load $(load)" >> "$O"
