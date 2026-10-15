#!/usr/bin/env bash
# run-battery.sh <replayed tree> <scratch> <results dir> · critique-B pass 8 · written after the battery hash: it only
# invokes the hashed battery files with the route's commands (the environment pass 6/7 named) and writes their output.
set -u
T="$1"; S="$2"; R="$3"; HERE="$(cd "$(dirname "$0")" && pwd)"; B="$HERE/../battery"; KIT="$(cd "$HERE/../../B-kit" && pwd)"
load() { sysctl -n vm.loadavg; }
export CRIT_TMP="$S" KIT
export SEAL="node scripts/structure/seal/seal.mjs --root ."
export CASCADE_SNAP='node scripts/structure/cascade.mjs snapshot --root . --dist dist --out "$SNAP"'
export CASCADE_VERIFY='node scripts/structure/cascade.mjs verify --root . --dist dist --baseline "$SNAP" --reorders "$LIST"'
export LISTING="$KIT/authored/p6-listed-reorders.json" BUILD="npx vite build"
{ echo "tree-probes start $(date -u +%FT%TZ) load $(load)"; bash "$B/tree-probes.sh" "$T" "$S/tp"; echo "tree-probes end $(date -u +%FT%TZ) load $(load)"; } > "$R/tree-probes.txt" 2>&1
(cd "$T" && npx vite build > /dev/null 2>&1)
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$T"; }
echo "after tree-probes: $(digest)" > "$R/digest-after.txt"
for set in plants:"$B/plants.mjs":"" extra-plants:"$HERE/extra-plants.mjs":"" regress:"$B/regress.mjs":"--group"; do
  name="${set%%:*}"; rest="${set#*:}"; file="${rest%%:*}"; flag="${rest#*:}"
  { echo "$name start $(date -u +%FT%TZ) load $(load)"; node "$B/run-plants.mjs" --root "$T" --adapter "$B/adapter.mjs" --set "$file" --out "$R/$name.json" $flag; echo "$name end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1
  echo "after $name: $(digest)" >> "$R/digest-after.txt"
done
