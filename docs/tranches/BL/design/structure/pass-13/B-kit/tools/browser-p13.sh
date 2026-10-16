#!/usr/bin/env bash
# browser-p13.sh <route tree (the chain's final)> <browser dir> — pass 13's browser bar (REGISTRY §P12-6.2 step 2): no
# src file moves and no code line changes in pass 13 (the kit is frozen; only its results dir is new), so no spec is touched and the committed
# /2 reports stand. In order, each light:
#   1. select  tools/browser-select.mjs on the route tree into <browser dir>/select-p13/, compared byte for byte with
#              the committed selection (specs.txt, captures.txt, changed.txt, moved.json)
#   2. rekey   the cured rekey over the committed full base run (base.json) onto the route tree, compared with the
#              committed base-rekeyed.json's results; then written as base-rekeyed.json (its rekeyedFrom names this kit)
#   3. tally   the cured browser-tally (the extent) over the committed full pair, the six P7-R2 reruns and the p10 and
#              p11 touched-spec pairs as reruns: tally.txt (exit 0 GREEN, 1 RED, 2 no verdict); and each touched-spec
#              pair on its own: tally-p10-pair.txt, tally-p11-pair.txt
set -u
T="$1"; D="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"
stamp() { echo "$(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"; }
{
echo "select start $(stamp)"
node "$HERE/browser-select.mjs" --root "$T" --out "$D/select-p13"; echo "select rc=$?"
for f in specs.txt captures.txt changed.txt moved.json; do cmp -s "$D/$f" "$D/select-p13/$f" && echo "$f identical to the committed (pass 8..12) selection" || echo "$f DIFFERS from the committed selection"; done
echo "rekey start $(stamp)"
node "$HERE/rekey.mjs" "$D/base.json" "$T" "$D/select-p13/base-rekeyed.json"; echo "rekey rc=$?"
node -e 'const fs=require("fs");const a=JSON.parse(fs.readFileSync(process.argv[1])),b=JSON.parse(fs.readFileSync(process.argv[2]));console.log("re-keyed results identical to the committed base-rekeyed.json: "+(JSON.stringify(a.results)===JSON.stringify(b.results))+"; results "+a.results.length+", testDir "+a.testDir+", rekeyedFrom.testDir "+a.rekeyedFrom.testDir)' "$D/select-p13/base-rekeyed.json" "$D/base-rekeyed.json"
mv "$D/select-p13/base-rekeyed.json" "$D/base-rekeyed.json"
echo "tally start $(stamp)"
} > "$D/browser-p13.log" 2>&1
RR=()
for f in "$D"/reruns/base-*-*.rekeyed.json; do RR+=(--base-rerun "$f"); done
for f in "$D"/reruns/route-*-*.json; do RR+=(--route-rerun "$f"); done
for s in p10-steps p11-steps; do RR+=(--base-rerun "$D/$s/base.rekeyed.json" --route-rerun "$D/$s/route.json"); done
node "$HERE/browser-tally.mjs" --base "$D/base-rekeyed.json" --route "$D/route.json" "${RR[@]}" > "$D/tally.txt" 2>&1; rc=$?
echo "tally rc=$rc $(stamp): $(grep '^verdict' "$D/tally.txt")" >> "$D/browser-p13.log"
for s in p10 p11; do node "$HERE/browser-tally.mjs" --base "$D/$s-steps/base.rekeyed.json" --route "$D/$s-steps/route.json" > "$D/tally-$s-pair.txt" 2>&1; echo "$s pair on its own rc=$?: $(grep '^verdict' "$D/tally-$s-pair.txt")" >> "$D/browser-p13.log"; done
exit $rc
