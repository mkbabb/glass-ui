#!/usr/bin/env bash
# run10.sh <KIT dir> <built replayed tree> <scratch> <results dir> · critique-B pass 10 · written and hashed BEFORE
# reading pass-10/B-kit. One sequential process: this battery's four families, then every earlier critic's battery as
# regression, through pass 9's hashed run-battery.sh by path (which runs pass 9's families and, by path, pass 8's
# plants, the 381-row regression set that carries passes 4-7, and pass 8's tree-probes, which run pass 7's, 6's and 5's).
# Each family writes <results>/<name>.txt with its start/end load; the tree's code digest is appended to
# digest-after.txt after every family, so a battery that leaves a byte behind shows.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; R="$4"; mkdir -p "$S" "$R"; S="$(cd "$S" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."; P8="$ST/pass-8/critique-B"; P9="$ST/pass-9/critique-B"
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after.txt"; }
export CRIT_TMP="$S" KIT="$K"
echo "before: $(digest)" > "$R/digest-after.txt"
fam judges10 bash "$HERE/judges10.sh" "$K" "$T" "$S"
fam plants10 sh -c "node '$P8/battery/run-plants.mjs' --root '$T' --adapter '$P8/battery/adapter.mjs' --set '$HERE/plants10.mjs' --out '$R/plants10.json'; node '$HERE/judge-rows10.mjs' '$R/plants10.json'"
fam migration10 bash "$HERE/migration10.sh" "$T" "$S"
fam browser10 bash "$HERE/browser10.sh" "$K" "$T" "$S"
mkdir -p "$R/p9-regress"
fam p9-battery bash "$P9/battery/run-battery.sh" "$K" "$T" "$S/p9" "$R/p9-regress"
echo "battery end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after.txt"
