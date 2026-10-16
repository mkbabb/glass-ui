#!/usr/bin/env bash
# toolchain-route.sh <KIT dir> <replayed tree> <results dir> · critique-B pass 9 · written AFTER the battery hash (glue).
# battery/toolchain9.sh's route-side steps verbatim; its base-side steps (build, cascade snapshot, base peer probe) ran
# in tools/phase1.sh on the floor base BEFORE the replay, because the task fences this seat to one worktree. The
# cascade is verified against that snapshot (results/cascade/base-snap) and the probe against results/peer-base.json.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; R="$3"; mkdir -p "$R/logs" "$R/cascade"; R="$(cd "$R" && pwd)"
O="$R/toolchain.txt"; L="$R/logs"; LISTING="${LISTING:-$K/authored/p6-listed-reorders.json}"; PEER_BASE="${PEER_BASE:-$K/results/p9/peer-closure-base.json}"
load() { sysctl -n vm.loadavg; }
step() { local name="$1" log="$2" cwd="$3"; shift 3; local l0 t0; l0=$(load); t0=$(date +%s)
  (cd "$cwd" && "$@") > "$log" 2>&1; local rc=$?; echo "$name | exit $rc | $(( $(date +%s) - t0 )) s | load $l0 -> $(load)" >> "$O"; return $rc; }
echo "toolchain (critic, pass 9, route side) $(date -u +%FT%TZ); node $(node -v)" > "$O"
step "seal on the unbuilt tree" "$R/seal-wt.txt" "$T" node scripts/structure/seal/seal.mjs --root "$T" --json "$R/seal-wt.json"
step "peer probe, unbuilt tree (expect 2)" "$R/peer-unbuilt.txt" "$T" node "$K/tools/peer-closure.mjs" --root "$T" --base "$PEER_BASE"
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
step "seal.test.ts" "$L/seal-test.log" "$T" npx vitest run tests/gates/seal.test.ts --maxWorkers=2
grep -hE "Test Files|Tests " "$L/seal-test.log" >> "$O"
step "vitest full" "$L/vitest.log" "$T" npx vitest run --maxWorkers=2
grep -hE "Test Files|Tests " "$L/vitest.log" >> "$O"
echo "toolchain end $(date -u +%FT%TZ) load $(load)" >> "$O"
