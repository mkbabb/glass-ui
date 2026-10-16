#!/usr/bin/env bash
# batteries.sh <built replayed tree> <unbuilt replayed tree> <floor-base tree, built> <scratch> — pass 11's plant
# batteries in one sequential run (REGISTRY §P10-6.4), so the seat holds one queue slot, not several:
#   p11       tools/plants-p11.mjs (KIND, F6, FLAG, TREE, FLOOR)
#   p10..p6   the route's earlier batteries (tools/plants-p10.mjs … -p6), regressions
#   critic10  the pass-10 critic's hashed battery (pass-10/critique-B/battery/run10.sh, unmodified, run by path), which
#             runs pass 9's hashed battery by path (pass 8's plants, the 402-row regression set, crash8 and the earlier
#             tree probes)
#   fix10     the pass-10 critic's post-hash corrections: fix10.sh (tools/repointed/pass-10-fix10.sh, its results path
#             re-pointed) and fix10b.sh (by path)
#   critic9x  the pass-9 critic's post-hash extra9.sh (tools/critic9-extra.sh, its results path re-pointed)
#   fd4       pass 6's fd4-probe, re-pointed at lib/tree/tree.mjs (tools/repointed/pass-6-fd4-probe.mjs, P10-G4)
# Each battery's output goes to results/p11/<name>.txt (and .json), with its start/end load; the tree's code digest is
# printed after each battery, so one that leaves a byte behind shows.
set -u
T="$1"; U="$2"; BASE="$3"; S="$4"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"; R="$KIT/results/p11"; B="$R/browser"; ST="$KIT/../.."
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after-batteries.txt"; }
echo "before: $(digest)" > "$R/digest-after-batteries.txt"
fam plants-p11 node "$HERE/plants-p11.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --probe-base "$R/peer-closure-base.json" --out "$R/plants-p11.json"
fam plants-p10 node "$HERE/plants-p10.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --out "$R/plants-p10.json"
fam plants-p9 node "$HERE/plants-p9.mjs" --root "$T" --reports "$B" --out "$R/plants-p9.json"
fam plants-p8 node "$HERE/plants-p8.mjs" --root "$T" --unbuilt "$U" --reports "$B" --out "$R/plants-p8.json"
fam plants-p7 node "$HERE/plants-p7.mjs" "$T" "$R/plants-p7.json"
fam plants-p6 node "$HERE/plants-p6.mjs" "$T" "$R/plants-p6.json"
mkdir -p "$R/critic10"
fam critic10 bash "$ST/pass-10/critique-B/battery/run10.sh" "$KIT" "$T" "$S/critic10" "$R/critic10"
fam fix10 bash "$HERE/repointed/pass-10-fix10.sh" "$KIT" "$T" "$S/fix10" "$R/critic10"
fam fix10b bash "$ST/pass-10/critique-B/tools/fix10b.sh" "$KIT" "$T" "$S/fix10b"
mkdir -p "$R/critic9x"; fam critic9x bash "$HERE/critic9-extra.sh" "$KIT" "$T" "$S/critic9x" "$R/critic9x"
fam fd4 sh -c "cd '$T' && node '$HERE/repointed/pass-6-fd4-probe.mjs' --root '$T'"
echo "batteries end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after-batteries.txt"
