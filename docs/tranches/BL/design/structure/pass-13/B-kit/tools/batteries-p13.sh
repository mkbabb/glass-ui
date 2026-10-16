#!/usr/bin/env bash
# batteries-p13.sh <built replayed tree> <unbuilt replayed tree> <floor-base tree, built> <scratch> — pass 13's plant
# batteries in one sequential run (REGISTRY §P12-6.4), so the seat holds one queue slot. The same four-argument
# signature as pass 12's batteries-p12.sh (cB12 I-3); pass 13 adds no route battery (the kit is frozen), so every family
# is a regression:
#   plants-p12  tools/plants-p12.mjs (SLOT, F6/F7, PAIR, DEL, ORIGIN), planted reports under results/p13/plants/
#   f7          the pass-11 critic's post-hash f7.sh, by path, over this kit (its ten rows must each exit 2). f7.sh reads
#               <KIT>/results/p11/browser, so it is handed a shim kit in <scratch> whose tools/, lib/ and frozen/ are this
#               kit's and whose results/p11/browser is this kit's results/p13/browser (symlinks; node runs the real files)
#   plants-p11..p6  the route's earlier batteries
#   critic12    the pass-12 critic's hashed battery (pass-12/critique-B/battery/run12.sh, c6fdf555…, by path), which runs
#               judges12, browser12, pass 11's hashed run11.sh (317fd849…; through it pass 10's run10.sh, 7b7b5303…, and
#               pass 9's run-battery.sh, 748826fb…; then plants10b, fix10b and the re-pointed fd4 probe) and f7.sh
#   fix10       the pass-10 critic's post-hash fix10.sh (re-pointed copy, its results path at results/p13)
#   critic9x    the pass-9 critic's post-hash extra9.sh (tools/critic9-extra.sh, re-pointed at results/p13)
#   fd4         pass 6's fd4-probe, re-pointed at lib/tree/tree.mjs (tools/repointed/pass-6-fd4-probe.mjs)
#   floor       P10-R1 (a)'s floor plant on the floor base's landed engine (pass-11/plants/p11-floor-plant.mjs): KEPT
#   floor-lost  the same plant with the landed engine's cured line (scripts/structure/lib/move.mjs, the `./` lead) put
#               back to its pre-cure text: LOST; the file restored by bytes and its sha256 and the tree digest re-read
# Each battery's output goes to results/p13/<name>.txt (and .json), with its start/end load; the tree's code digest is
# printed after each battery, so one that leaves a byte behind shows.
set -u
T="$1"; U="$2"; BASE="$3"; S="$4"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"; R="$KIT/results/p13"; B="$R/browser"; ST="$KIT/../.."
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$1"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest "$T")" >> "$R/digest-after-batteries.txt"; }
echo "before: $(digest "$T")" > "$R/digest-after-batteries.txt"
fam plants-p12 node "$HERE/plants-p12.mjs" --root "$T" --reports "$B" --plants "$R/plants" --out "$R/plants-p12.json"
mkdir -p "$S/f7kit/results/p11"; for d in tools lib frozen; do ln -sfn "$KIT/$d" "$S/f7kit/$d"; done; ln -sfn "$B" "$S/f7kit/results/p11/browser"
fam f7 bash "$ST/pass-11/critique-B/tools/f7.sh" "$S/f7kit" "$T" "$S/f7"
fam plants-p11 node "$HERE/plants-p11.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --probe-base "$R/peer-closure-base.json" --out "$R/plants-p11.json"
fam plants-p10 node "$HERE/plants-p10.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --out "$R/plants-p10.json"
fam plants-p9 node "$HERE/plants-p9.mjs" --root "$T" --reports "$B" --out "$R/plants-p9.json"
fam plants-p8 node "$HERE/plants-p8.mjs" --root "$T" --unbuilt "$U" --reports "$B" --out "$R/plants-p8.json"
fam plants-p7 node "$HERE/plants-p7.mjs" "$T" "$R/plants-p7.json"
fam plants-p6 node "$HERE/plants-p6.mjs" "$T" "$R/plants-p6.json"
mkdir -p "$R/critic12"
fam critic12 bash "$ST/pass-12/critique-B/battery/run12.sh" "$KIT" "$T" "$U" "$BASE" "$S/critic12" "$R/critic12"
fam fix10 bash "$HERE/repointed/pass-10-fix10.sh" "$KIT" "$T" "$S/fix10" "$R/critic12/p11-regress/p10-regress"
mkdir -p "$R/critic9x"; fam critic9x bash "$HERE/critic9-extra.sh" "$KIT" "$T" "$S/critic9x" "$R/critic9x"
fam fd4 sh -c "cd '$T' && node '$HERE/repointed/pass-6-fd4-probe.mjs' --root '$T'"
fam floor node "$ST/pass-11/plants/p11-floor-plant.mjs" --root "$BASE"
floorlost() {
  local E="$BASE/scripts/structure/lib/move.mjs" h0 h1
  h0=$(shasum -a 256 "$E" | cut -c1-64); cp -p "$E" "$S/move.mjs.landed"
  echo "landed engine sha256 $h0; base $(digest "$BASE")"
  node -e 'const fs=require("fs");const f=process.argv[1];const s=fs.readFileSync(f,"utf8");const cure="bare.match(/^(?:\\.\\/|(?:\\.\\.\\/)*)/)",pre="bare.match(/^(\\.\\.\\/)*/)";const n=s.split(cure).length-1;if(n!==1)throw new Error("the cured text occurs "+n+" times");fs.writeFileSync(f,s.replace(cure,pre));const i=s.split("\n").findIndex((l)=>l.includes(cure));console.log("reverted line "+(i+1)+" to the pre-cure text: "+pre)' "$E" || return 2
  node "$ST/pass-11/plants/p11-floor-plant.mjs" --root "$BASE"; local rc=$?
  echo "plant on the pre-cure landed engine rc=$rc (expect 1, LOST)"
  cp -p "$S/move.mjs.landed" "$E"; h1=$(shasum -a 256 "$E" | cut -c1-64)
  [ "$h0" = "$h1" ] && echo "engine restored: sha256 equal" || echo "engine NOT restored: $h1"
  echo "base after restore: $(digest "$BASE")"
}
fam floor-lost floorlost
echo "batteries end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after-batteries.txt"
