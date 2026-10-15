#!/usr/bin/env bash
# toolchain.sh <replayed tree> <floor-base tree> <results dir> <tag> — the static bar on a replayed
# tree (pass 8): the gate, the unbuilt probe, the build, verify:package, both vue-tsc programs,
# the demo build, seal.test.ts, the full vitest run, cascade verify against the floor base, the
# peer probe and the pack diff. Every step's exit, time and load go to <results dir>/toolchain-<tag>.txt;
# logs to <results dir>/logs/<tag>-*.log. The floor base is built here too (its dist is the
# cascade baseline's and the base probe's input); the base snapshot is re-taken beside the
# committed one (cascade/baseline-<tag>) so the two can be compared.
# A vitest file that fails in the full run is re-run alone on the replayed tree, and the same
# tests (tools/base-paths.mjs) on the floor base.
set -u
T="$1"; BASE="$2"; R="$3"; TAG="$4"
HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"
O="$R/toolchain-$TAG.txt"; L="$R/logs"; mkdir -p "$L" "$R/cascade" "$R/pack"
load() { sysctl -n vm.loadavg; }
step() { # step <name> <log> <cwd> <cmd…>
    local name="$1" log="$2" cwd="$3"; shift 3
    local l0; l0=$(load); local t0; t0=$(date +%s)
    (cd "$cwd" && "$@") > "$log" 2>&1; local rc=$?
    echo "$name | exit $rc | $(( $(date +%s) - t0 )) s | load $l0 -> $(load)" >> "$O"
    return $rc
}
echo "toolchain on $TAG ($T) $(date -u +%FT%TZ); node $(node -v), $(cd "$T" && npx vite --version), vue-tsc $(cd "$T" && npx vue-tsc --version), $(cd "$T" && npx vitest --version), typescript $(cd "$T" && npx tsc --version), playwright $(cd "$T" && npx playwright --version), macOS $(sw_vers -productVersion)" > "$O"
node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`code digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$T" >> "$O"

step "seal (unbuilt)" "$R/seal-$TAG.txt" "$T" node scripts/structure/seal/seal.mjs --root "$T" --json "$R/seal-$TAG.json"
step "peer probe on the unbuilt tree (expect 2)" "$R/peer-closure-unbuilt-$TAG.txt" "$T" node "$HERE/peer-closure.mjs" --root "$T" --base "$R/peer-closure-base.json"

step "base vite-build" "$L/$TAG-base-vite-build.log" "$BASE" npx vite build
step "base cascade snapshot" "$R/cascade/snapshot-$TAG.log" "$BASE" node scripts/structure/cascade.mjs snapshot --root "$BASE" --dist "$BASE/dist" --out "$R/cascade/baseline-$TAG" --sha floor-S1-5b14c6c7
for f in styles.seq styles_css.seq styles_fonts.seq styles_theme.seq; do
    cmp -s "$R/cascade/baseline/$f" "$R/cascade/baseline-$TAG/$f" && echo "baseline $f: identical to the committed baseline" >> "$O" || echo "baseline $f: DIFFERS from the committed baseline" >> "$O"
done
step "base peer probe (expect 1: the root is broken at the base)" "$R/peer-closure-base-$TAG.txt" "$BASE" node "$HERE/peer-closure.mjs" --root "$BASE" --floor-base --table src/index.ts --json "$R/peer-closure-base-$TAG.json"
step "base pack list" "$L/$TAG-pack-floor.log" "$BASE" node "$HERE/pack-diff.mjs" list "$BASE" "$R/pack/pack-floor-$TAG.json"

step "vite-build" "$L/$TAG-vite-build.log" "$T" npx vite build
step "verify-package" "$L/$TAG-verify-package.log" "$T" npm run verify:package
node -e 'const j = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8").split("\n").find((l) => l.startsWith("{\"schema\":\"glass-ui-package-verification"))); const r = j.ratchet; console.log(`verify-package: terminal ${j.terminal}; claims ${j.claims}, declarations ${j.declarations}, css ${j.css}; ratchet ${JSON.stringify({ status: r.status, mode: r.mode, datum: r.datum, unpackedBytes: r.unpackedBytes, equal: r.equal, increase: r.increase })} (the full record: logs/${process.argv[2]}-verify-package.log)`)' "$L/$TAG-verify-package.log" "$TAG" >> "$O"
step "vue-tsc" "$L/$TAG-vue-tsc.log" "$T" npx vue-tsc --noEmit
step "vue-tsc-test" "$L/$TAG-vue-tsc-test.log" "$T" npx vue-tsc --noEmit -p tsconfig.test.json
step "demo-dist-build" "$L/$TAG-demo-dist-build.log" "$T" npm run demo:dist:build
step "cascade verify against the floor base" "$R/cascade/verify-$TAG.txt" "$T" node scripts/structure/cascade.mjs verify --baseline "$R/cascade/baseline" --root "$T" --dist "$T/dist" --reorders "$KIT/authored/p6-listed-reorders.json"
step "peer probe (built)" "$R/peer-closure-$TAG.txt" "$T" node "$HERE/peer-closure.mjs" --root "$T" --base "$R/peer-closure-base.json" --json "$R/peer-closure-$TAG.json"
step "pack list" "$L/$TAG-pack-route.log" "$T" node "$HERE/pack-diff.mjs" list "$T" "$R/pack/pack-route-$TAG.json"
(cd "$T" && node "$HERE/pack-diff.mjs" diff "$R/pack/pack-floor-$TAG.json" "$R/pack/pack-route-$TAG.json") > "$R/pack/pack-diff-$TAG.json" 2>&1; echo "pack diff exit $?" >> "$O"
step "seal-test" "$L/$TAG-seal-test.log" "$T" npx vitest run tests/gates/seal.test.ts
grep -hE "Test Files|Tests " "$L/$TAG-seal-test.log" >> "$O"
step "vitest-full" "$L/$TAG-vitest-full.log" "$T" npx vitest run --reporter=default --reporter=json --outputFile="$L/$TAG-vitest-full.json"
grep -hE "Test Files|Tests " "$L/$TAG-vitest-full.log" >> "$O"
FAILED=$(node -e 'const r = require(process.argv[1]); const root = process.argv[2]; console.log(r.testResults.filter((t) => t.status !== "passed").map((t) => t.name.replace(root + "/", "")).join(" "))' "$L/$TAG-vitest-full.json" "$T")
if [ -n "$FAILED" ]; then
    echo "failed files: $FAILED" >> "$O"
    # shellcheck disable=SC2086
    step "vitest-failed-alone" "$L/$TAG-vitest-failed-alone.log" "$T" npx vitest run $FAILED
    grep -hE "Test Files|Tests " "$L/$TAG-vitest-failed-alone.log" >> "$O"
    # shellcheck disable=SC2086
    BP=$(node "$HERE/base-paths.mjs" --base "$BASE" $FAILED 2> "$L/$TAG-vitest-base-paths.err")
    echo "the same tests on the floor base: $(echo $BP | tr '\n' ' ') $(cat "$L/$TAG-vitest-base-paths.err" | tr '\n' ' ')" >> "$O"
    # shellcheck disable=SC2086
    step "vitest-failed-base" "$L/$TAG-vitest-failed-base.log" "$BASE" npx vitest run $BP
    grep -hE "Test Files|Tests " "$L/$TAG-vitest-failed-base.log" >> "$O"
fi
echo "toolchain end $(date -u +%FT%TZ) load $(load)" >> "$O"
