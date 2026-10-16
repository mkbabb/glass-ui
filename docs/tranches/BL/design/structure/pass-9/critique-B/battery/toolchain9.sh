#!/usr/bin/env bash
# toolchain9.sh <KIT dir> <replayed tree> <floor-base tree> <results dir> · critique-B pass 9 · written and hashed BEFORE
# reading pass-9/B-kit. The bar's toolchain (REGISTRY §P8-6.4 / §P7-6.4): builds, both vue-tsc programs, verify:package
# and the ratchet datum, demo:dist:build, the cascade verified against THIS seat's own floor-base snapshot (listing GREEN,
# empty listing RED), the peer probe on both trees, seal.test.ts, and full vitest at 2 workers. CASCADE_BASELINE (the
# kit's committed baseline dir) and PEER_BASE (the kit's committed floor-base peer report) are compared/used when set.
# Every step logs exit, wall seconds and the load before and after.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; BASE="$(cd "$3" && pwd)"; R="$4"; mkdir -p "$R/logs" "$R/cascade"; R="$(cd "$R" && pwd)"
O="$R/toolchain.txt"; L="$R/logs"; LISTING="${LISTING:-$K/authored/p6-listed-reorders.json}"
load() { sysctl -n vm.loadavg; }
step() { local name="$1" log="$2" cwd="$3"; shift 3; local l0 t0; l0=$(load); t0=$(date +%s)
  (cd "$cwd" && "$@") > "$log" 2>&1; local rc=$?; echo "$name | exit $rc | $(( $(date +%s) - t0 )) s | load $l0 -> $(load)" >> "$O"; return $rc; }
echo "toolchain (critic, pass 9) $(date -u +%FT%TZ); node $(node -v)" > "$O"
step "base vite build" "$L/base-build.log" "$BASE" npx vite build
step "base cascade snapshot" "$L/base-snap.log" "$BASE" node scripts/structure/cascade.mjs snapshot --root "$BASE" --dist "$BASE/dist" --out "$R/cascade/base-snap" --sha floor-S1
if [ -n "${CASCADE_BASELINE:-}" ]; then for f in $(ls "$CASCADE_BASELINE" | grep '\.seq$'); do cmp -s "$CASCADE_BASELINE/$f" "$R/cascade/base-snap/$f" && echo "baseline $f: identical to the kit's committed baseline" >> "$O" || echo "baseline $f: DIFFERS from the kit's committed baseline" >> "$O"; done; fi
step "base peer probe (floor base)" "$R/peer-base.txt" "$BASE" node "$K/tools/peer-closure.mjs" --root "$BASE" --floor-base --table src/index.ts --json "$R/peer-base.json"
step "vite build" "$L/build.log" "$T" npx vite build
step "verify:package" "$L/verify-package.log" "$T" npm run verify:package
grep -oE '"ratchet":\{[^}]*\}' "$L/verify-package.log" | head -1 >> "$O"
grep -iE 'CLEAN|datum|unpacked' "$L/verify-package.log" | head -5 >> "$O"
step "vue-tsc" "$L/vue-tsc.log" "$T" npx vue-tsc --noEmit
step "vue-tsc tests" "$L/vue-tsc-test.log" "$T" npx vue-tsc --noEmit -p tsconfig.test.json
step "demo:dist:build" "$L/demo-dist.log" "$T" npm run demo:dist:build
step "cascade verify vs own floor-base snapshot, kit listing (expect 0)" "$R/cascade/verify-listed.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/base-snap" --root "$T" --dist "$T/dist" --reorders "$LISTING"
echo '{}' > "$R/cascade/empty.json"
step "cascade verify, empty listing (expect RED)" "$R/cascade/verify-nolisting.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/base-snap" --root "$T" --dist "$T/dist" --reorders "$R/cascade/empty.json"
if [ -n "${PEER_BASE:-}" ]; then step "peer probe (built) vs kit base report" "$R/peer-built.txt" "$T" node "$K/tools/peer-closure.mjs" --root "$T" --base "$PEER_BASE" --json "$R/peer-built.json"; fi
step "peer probe (built) vs this seat's base report" "$R/peer-built-ownbase.txt" "$T" node "$K/tools/peer-closure.mjs" --root "$T" --base "$R/peer-base.json"
step "seal (tree's gate)" "$R/seal-wt.txt" "$T" node scripts/structure/seal/seal.mjs --root "$T" --json "$R/seal-wt.json"
step "seal.test.ts" "$L/seal-test.log" "$T" npx vitest run tests/gates/seal.test.ts --maxWorkers=2
grep -hE "Test Files|Tests " "$L/seal-test.log" >> "$O"
step "vitest full" "$L/vitest.log" "$T" npx vitest run --maxWorkers=2
grep -hE "Test Files|Tests " "$L/vitest.log" >> "$O"
echo "toolchain end $(date -u +%FT%TZ) load $(load)" >> "$O"
