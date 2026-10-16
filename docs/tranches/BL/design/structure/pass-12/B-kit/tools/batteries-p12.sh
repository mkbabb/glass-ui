#!/usr/bin/env bash
# batteries-p12.sh <built replayed tree> <unbuilt replayed tree> <floor-base tree, built> <scratch> — pass 12's plant
# batteries in one sequential run (REGISTRY §P11-6.4), so the seat holds one queue slot:
#   plants-p12  tools/plants-p12.mjs (SLOT, F6/F7, PAIR, DEL, ORIGIN), planted reports under results/p12/plants/
#   f7          the pass-11 critic's post-hash f7.sh, by path, over this kit (its ten rows must each exit 2). f7.sh reads
#               <KIT>/results/p11/browser, so it is handed a shim kit in <scratch> whose tools/, lib/ and frozen/ are this
#               kit's and whose results/p11/browser is this kit's results/p12/browser (symlinks; node runs the real files)
#   plants-p11..p6  the route's earlier batteries, regressions (plants-p11's KIND rows that took a partial re-keyed base
#               in --base now read 2 by design: the extent, P11-R1 (a))
#   critic11    the pass-11 critic's hashed battery (pass-11/critique-B/battery/run11.sh, 317fd849…, by path), which runs
#               pass 10's hashed run10.sh (and through it pass 9's), plants10b, fix10b and the re-pointed fd4 probe
#   fix10       the pass-10 critic's post-hash fix10.sh (re-pointed copy, its results path at results/p12)
#   critic9x    the pass-9 critic's post-hash extra9.sh (tools/critic9-extra.sh, re-pointed at results/p12)
#   fd4         pass 6's fd4-probe, re-pointed at lib/tree/tree.mjs (tools/repointed/pass-6-fd4-probe.mjs)
#   floor       P10-R1 (a)'s floor plant on the floor base's landed engine (pass-11/plants/p11-floor-plant.mjs)
# Each battery's output goes to results/p12/<name>.txt (and .json), with its start/end load; the tree's code digest is
# printed after each battery, so one that leaves a byte behind shows.
set -u
T="$1"; U="$2"; BASE="$3"; S="$4"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"; R="$KIT/results/p12"; B="$R/browser"; ST="$KIT/../.."
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after-batteries.txt"; }
echo "before: $(digest)" > "$R/digest-after-batteries.txt"
fam plants-p12 node "$HERE/plants-p12.mjs" --root "$T" --reports "$B" --plants "$R/plants" --out "$R/plants-p12.json"
mkdir -p "$S/f7kit/results/p11"; for d in tools lib frozen; do ln -sfn "$KIT/$d" "$S/f7kit/$d"; done; ln -sfn "$B" "$S/f7kit/results/p11/browser"
fam f7 bash "$ST/pass-11/critique-B/tools/f7.sh" "$S/f7kit" "$T" "$S/f7"
fam plants-p11 node "$HERE/plants-p11.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --probe-base "$R/peer-closure-base.json" --out "$R/plants-p11.json"
fam plants-p10 node "$HERE/plants-p10.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --out "$R/plants-p10.json"
fam plants-p9 node "$HERE/plants-p9.mjs" --root "$T" --reports "$B" --out "$R/plants-p9.json"
fam plants-p8 node "$HERE/plants-p8.mjs" --root "$T" --unbuilt "$U" --reports "$B" --out "$R/plants-p8.json"
fam plants-p7 node "$HERE/plants-p7.mjs" "$T" "$R/plants-p7.json"
fam plants-p6 node "$HERE/plants-p6.mjs" "$T" "$R/plants-p6.json"
mkdir -p "$R/critic11"
fam critic11 bash "$ST/pass-11/critique-B/battery/run11.sh" "$KIT" "$T" "$S/critic11" "$R/critic11"
fam fix10 bash "$HERE/repointed/pass-10-fix10.sh" "$KIT" "$T" "$S/fix10" "$R/critic11/p10-regress"
mkdir -p "$R/critic9x"; fam critic9x bash "$HERE/critic9-extra.sh" "$KIT" "$T" "$S/critic9x" "$R/critic9x"
fam fd4 sh -c "cd '$T' && node '$HERE/repointed/pass-6-fd4-probe.mjs' --root '$T'"
fam floor node "$ST/pass-11/plants/p11-floor-plant.mjs" --root "$BASE"
echo "batteries end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after-batteries.txt"
