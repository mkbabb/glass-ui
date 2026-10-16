#!/usr/bin/env bash
# toolchain10.sh <KIT dir> <replayed tree> <results dir> · critique-B pass 10 · written and hashed BEFORE reading
# pass-10/B-kit. The bar's toolchain (§P9-6.4 = §P8-6.4 re-met): build, verify:package and the ratchet datum (S70's one
# rebind under P9-R2 (a)), both vue-tsc programs, demo:dist:build, the cascade verified against THIS seat's floor-base
# snapshot (phase1.sh: listing GREEN, empty listing RED), the peer probe against the kit's committed floor-base report
# and against this seat's, the tree's gate, seal.test.ts, and full vitest at 2 workers. Plus W-D.1's measure tool when
# the kit carries one (INFO, formation input). Every step logs exit, wall seconds and the load before and after.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; R="$3"; mkdir -p "$R/logs" "$R/cascade"; R="$(cd "$R" && pwd)"
O="$R/toolchain.txt"; L="$R/logs"
LISTING="${LISTING:-$(find "$K/authored" -name '*listed-reorders*.json' | sort | tail -1)}"
PB="${PEER_BASE:-$(find "$K/results" -name 'peer-closure-base.json' | sort | tail -1)}"
load() { sysctl -n vm.loadavg; }
step() { local name="$1" log="$2" cwd="$3"; shift 3; local l0 t0; l0=$(load); t0=$(date +%s)
  (cd "$cwd" && "$@") > "$log" 2>&1; local rc=$?; echo "$name | exit $rc | $(( $(date +%s) - t0 )) s | load $l0 -> $(load)" >> "$O"; return $rc; }
echo "toolchain (critic, pass 10) $(date -u +%FT%TZ); node $(node -v); listing ${LISTING#$K/}; peer base ${PB#$K/}" > "$O"
step "vite build" "$L/build.log" "$T" npx vite build
step "verify:package" "$L/verify-package.log" "$T" npm run verify:package
grep -oE '"ratchet":\{[^}]*\}' "$L/verify-package.log" | head -1 >> "$O"
grep -iE 'CLEAN|datum|unpacked' "$L/verify-package.log" | head -5 >> "$O"
echo ".bundle-ratchet: $(cat "$T/.bundle-ratchet" 2>/dev/null | head -c 300)" >> "$O"
step "vue-tsc" "$L/vue-tsc.log" "$T" npx vue-tsc --noEmit
step "vue-tsc tests" "$L/vue-tsc-test.log" "$T" npx vue-tsc --noEmit -p tsconfig.test.json
step "demo:dist:build" "$L/demo-dist.log" "$T" npm run demo:dist:build
step "cascade verify vs own floor-base snapshot, kit listing (expect 0)" "$R/cascade/verify-listed.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/base-snap" --root "$T" --dist "$T/dist" --reorders "$LISTING"
echo '{}' > "$R/cascade/empty.json"
step "cascade verify, empty listing (expect RED)" "$R/cascade/verify-nolisting.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/base-snap" --root "$T" --dist "$T/dist" --reorders "$R/cascade/empty.json"
step "peer probe (built) vs kit base report" "$R/peer-built.txt" "$T" node "$K/tools/peer-closure.mjs" --root "$T" --base "$PB" --json "$R/peer-built.json"
step "peer probe (built) vs this seat's base report" "$R/peer-built-ownbase.txt" "$T" node "$K/tools/peer-closure.mjs" --root "$T" --base "$R/peer-base.json"
grep -E 'motion-core' "$R/peer-built.txt" | head -2 >> "$O"
step "seal (tree's gate)" "$R/seal-wt.txt" "$T" node scripts/structure/seal/seal.mjs --root "$T" --json "$R/seal-wt.json"
grep -vE '^\s*$' "$R/seal-wt.txt" | tail -4 >> "$O"
step "seal.test.ts" "$L/seal-test.log" "$T" npx vitest run tests/gates/seal.test.ts --maxWorkers=2
grep -hE "Test Files|Tests " "$L/seal-test.log" >> "$O"
step "vitest full" "$L/vitest.log" "$T" npx vitest run --maxWorkers=2
grep -hE "Test Files|Tests " "$L/vitest.log" >> "$O"
WD=$(find "$K/tools" -path '*wd1*' -name 'measure.mjs' | head -1)
if [ -n "$WD" ]; then step "W-D.1 measure (INFO)" "$R/wd1-measure.txt" "$T" node "$WD" --root "$T"; fi
echo "toolchain end $(date -u +%FT%TZ) load $(load)" >> "$O"
