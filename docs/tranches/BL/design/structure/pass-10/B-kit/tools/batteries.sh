#!/usr/bin/env bash
# batteries.sh <built replayed tree> <unbuilt replayed tree> <floor-base tree> <scratch> — pass 10's plant
# batteries in one sequential run (REGISTRY §P9-6.4), so the seat holds one heavy-queue slot, not six:
#   p10     tools/plants-p10.mjs (INPUT, LEAK, ROW, CYCLE, GATE, MIGR)
#   p9..p6  the route's earlier batteries (tools/plants-p9.mjs, -p8, -p7, -p6), regressions
#   critic9 the pass-9 critic's hashed battery (pass-9/critique-B/battery/run-battery.sh, unmodified, run by
#           path), which carries the pass-8 critic's 402 rows (regress9.mjs), crash8 (tree-probes.sh), its
#           plants9, judge-throws and b18-inputs families
# Each battery's output goes to results/p10/<name>.txt (and .json), with its start/end load; the tree's code
# digest is printed after each battery, so one that leaves a byte behind shows.
set -u
T="$1"; U="$2"; BASE="$3"; S="$4"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"; R="$KIT/results/p10"; B="$R/browser"
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after-batteries.txt"; }
echo "before: $(digest)" > "$R/digest-after-batteries.txt"
fam plants-p10 node "$HERE/plants-p10.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --out "$R/plants-p10.json"
fam plants-p9 node "$HERE/plants-p9.mjs" --root "$T" --reports "$B" --out "$R/plants-p9.json"
fam plants-p8 node "$HERE/plants-p8.mjs" --root "$T" --unbuilt "$U" --reports "$B" --out "$R/plants-p8.json"
fam plants-p7 node "$HERE/plants-p7.mjs" "$T" "$R/plants-p7.json"
fam plants-p6 node "$HERE/plants-p6.mjs" "$T" "$R/plants-p6.json"
fam critic9 bash "$KIT/../../pass-9/critique-B/battery/run-battery.sh" "$KIT" "$T" "$S/critic9" "$R/critic9"
echo "batteries end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after-batteries.txt"
