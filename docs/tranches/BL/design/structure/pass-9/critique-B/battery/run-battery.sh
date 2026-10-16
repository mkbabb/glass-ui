#!/usr/bin/env bash
# run-battery.sh <KIT dir> <built replayed tree> <scratch> <results dir> · critique-B pass 9 · written and hashed BEFORE
# reading pass-9/B-kit. Runs every battery file in order, one sequential process, and writes each output under the
# results dir with its start/end load. The route's commands come in through the environment pass 6-8 named; LISTING
# defaults to the kit's authored/p6-listed-reorders.json. The digest (KIT/lib/digest.mjs codeDigest) is printed after
# every family that edits the tree, so a battery that leaves a byte behind shows.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; R="$4"; mkdir -p "$S" "$R"; S="$(cd "$S" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; P8="$HERE/../../../pass-8/critique-B"
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after.txt"; }
export CRIT_TMP="$S" KIT="$K"
export SEAL="node scripts/structure/seal/seal.mjs --root ."
export CASCADE_SNAP='node scripts/structure/cascade.mjs snapshot --root . --dist dist --out "$SNAP"'
export CASCADE_VERIFY='node scripts/structure/cascade.mjs verify --root . --dist dist --baseline "$SNAP" --reorders "$LIST"'
export LISTING="${LISTING:-$K/authored/p6-listed-reorders.json}" BUILD="npx vite build"
echo "before: $(digest)" > "$R/digest-after.txt"
fam judge-throws bash "$HERE/judge-throws.sh" "$K" "$T" "$S"
fam b18-inputs bash "$HERE/b18-inputs.sh" "$T" "$S"
fam select-capture bash "$HERE/select-capture.sh" "$K" "$T" "$S"
fam flake9 bash "$HERE/flake9.sh" "$K" "$S"
fam browser-plants env TALLY="$K/tools/browser-tally.mjs" RERUN_DIR="$HERE/../../../pass-8/B-kit/results/p8/browser/reruns" \
  node "$P8/battery/browser-plants.mjs" --dir "$HERE/../../../pass-8/B-kit/results/p8/browser" --tally "$HERE/tally-shim.mjs" --out "$R/browser-plants.json"
fam plants9 sh -c "node '$P8/battery/run-plants.mjs' --root '$T' --adapter '$P8/battery/adapter.mjs' --set '$HERE/plants9.mjs' --out '$R/plants9.json' && node '$HERE/judge-rows.mjs' '$R/plants9.json'"
fam p8-plants sh -c "node '$P8/battery/run-plants.mjs' --root '$T' --adapter '$P8/battery/adapter.mjs' --set '$P8/battery/plants.mjs' --out '$R/p8-plants.json'; node '$HERE/compare.mjs' '$R/p8-plants.json' '$P8/results/plants.json'"
fam regress sh -c "node '$P8/battery/run-plants.mjs' --root '$T' --adapter '$P8/battery/adapter.mjs' --set '$HERE/regress9.mjs' --out '$R/regress.json' --group; node '$HERE/compare.mjs' '$R/regress.json' '$P8/results/regress.json'"
fam tree-probes bash "$P8/battery/tree-probes.sh" "$T" "$S/tp"
echo "battery end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after.txt"
