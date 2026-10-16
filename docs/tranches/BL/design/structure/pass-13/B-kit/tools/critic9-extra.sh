#!/usr/bin/env bash
# critic9-extra.sh — pass 10: the pass-9 critic's post-hash tools/extra9.sh, byte-identical but for two lines: its
# HERE resolves to that critic's tools/ dir, and the probe base is this kit's results/p13/peer-closure-base.json.
# extra9.sh <KIT> <built tree> <scratch> <results> · critique-B pass 9 · written AFTER the battery hash. Re-runs the
# battery's three self-defective cases with corrected glue (expectations unchanged), then probes the kit judges past the
# hashed set. Disclosed in critique-B.md §7.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; R="$4"; mkdir -p "$S/x9"; X="$(cd "$S/x9" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")/../../../pass-9/critique-B/tools" && pwd)"; B="$HERE/../battery"; P8="$HERE/../../../pass-8/critique-B"
load() { sysctl -n vm.loadavg; }; export CRIT_TMP="$S"
sha() { shasum -a 256 "$1" | cut -c1-16; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
PB="$K/results/p13/peer-closure-base.json"
echo "extra9 start $(date -u +%FT%TZ) load $(load)"
echo "== XR (P8-R3) with the whitespace-table locator"
node "$P8/battery/run-plants.mjs" --root "$T" --adapter "$P8/battery/adapter.mjs" --set "$HERE/xr9.mjs" --out "$R/xr9.json" | cut -c1-300
node "$B/judge-rows.mjs" "$R/xr9.json"
echo "== BI3: the motion-core row's peer cell removed (a row with no peer), expect 2"
cd "$T"; h=$(sha src/README.md); cp src/README.md "$X/readme"
node -e 'const fs=require("fs");const L=fs.readFileSync("src/README.md","utf8").split("\n");const i=L.findIndex(l=>/@mkbabb\/glass-ui\/motion-core\s+\(none/.test(l));L[i]=L[i].replace(/\(none.*$/,"");fs.writeFileSync("src/README.md",L.join("\n"));console.log("row now: "+L[i].trim());'
node scripts/structure/seal/seal.mjs --root . > "$X/o.log" 2>&1; rc=$?; echo "B18IN BI3-fixed $([ $rc = 2 ] && echo PASS || echo FAIL) rc=$rc expect=2 :: $(grep -m1 -iE 'no verdict|FAIL' "$X/o.log" | cut -c1-220)"
node -e 'const fs=require("fs");const L=fs.readFileSync("src/README.md","utf8").split("\n");const i=L.findIndex(l=>/@mkbabb\/glass-ui\/motion-core\s+\(none/.test(l));L[i]=L[i].replace("@mkbabb/glass-ui/motion-core","@mkbabb/glass-ui/zq9-no-such-entry");fs.writeFileSync("src/README.md",L.join("\n"));' 2>/dev/null
cp "$X/readme" src/README.md; node -e 'const fs=require("fs");const L=fs.readFileSync("src/README.md","utf8").split("\n");const i=L.findIndex(l=>/@mkbabb\/glass-ui\/motion-core\s+\(none/.test(l));L[i]=L[i].replace("@mkbabb/glass-ui/motion-core","@mkbabb/glass-ui/zq9-unpublished");fs.writeFileSync("src/README.md",L.join("\n"));'
node scripts/structure/seal/seal.mjs --root . > "$X/o.log" 2>&1; rc=$?; echo "B18IN BI5-row-names-unpublished-entry $([ $rc = 2 ] && echo PASS || echo FAIL) rc=$rc expect=2 (LAW §5: a declared entry the record does not publish stays a throw) :: $(grep -m1 -iE 'no verdict|FAIL' "$X/o.log" | cut -c1-220)"
cp "$X/readme" src/README.md; [ "$(sha src/README.md)" = "$h" ] && echo "README restored" || echo "README RESTORE-FAIL"
echo "== flake (P7-R2) with testDir \".\" added to pass-8's fixtures"
node "$P8/battery/flake-cases.mjs" --out "$X/flake" > /dev/null
for f in "$X"/flake/*.json; do case "$f" in *EXPECT.json) continue;; esac; node -e 'const fs=require("fs");const f=process.argv[1];const j=JSON.parse(fs.readFileSync(f));j.testDir=".";fs.writeFileSync(f,JSON.stringify(j));' "$f"; done
F="$X/flake"; node "$K/tools/browser-tally.mjs" --base "$F/base.json" --route "$F/route.json" --base-rerun "$F/rerun-base-1.json" --base-rerun "$F/rerun-base-2.json" --base-rerun "$F/rerun-base-3.json" --route-rerun "$F/rerun-route-1.json" --route-rerun "$F/rerun-route-2.json" --route-rerun "$F/rerun-route-3.json" > "$F/tally.txt" 2>&1; echo "flake tally rc=$?"
grep -E 'F[1-8]' "$P8/results/flake.txt" | grep -E '^(NEW|ABSENT|FLAKY)' | sed -E 's#^(\w+) [^ ]*zq8/flake.spec.ts#\1 S#' > "$F/ref.txt"
grep -E '^(NEW|ABSENT|FLAKY)' "$F/tally.txt" | sed -E 's#^(\w+) [^ ]*zq8/flake.spec.ts#\1 S#' > "$F/mine.txt"
cat "$F/mine.txt"; diff "$F/ref.txt" "$F/mine.txt" > /dev/null && echo "FLAKE SAME case lines as pass-8's flake.txt ($(wc -l < "$F/mine.txt" | tr -d ' '))" || { echo "FLAKE DIFFERS"; diff "$F/ref.txt" "$F/mine.txt"; }
grep -E '^(base-green|verdict)' "$F/tally.txt"
echo "== peer-unbuilt U0-U5 with the probe's --base (the pass-8 critic's invocation)"
cd "$T"; KIT="$K" PEER_CMD="node $K/tools/peer-closure.mjs --base $PB --root {ROOT" bash "$P8/battery/peer-unbuilt.sh" "$T"
echo "== probe past the hashed set"
run() { "$@" > "$X/p.log" 2>&1; echo $?; }
js=dist/glass-ui.js; h=$(sha $js); cp $js "$X/root.js"; : > $js; rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$PB"); cp "$X/root.js" $js; [ "$(sha $js)" = "$h" ] || echo RESTORE-FAIL
echo "PX empty-root-entry dist/glass-ui.js rc=$rc expect=2 :: $(grep -m1 'no verdict' "$X/p.log" | cut -c1-200)"
echo '{}' > "$X/obj.json"; rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$X/obj.json"); echo "PX base-{} rc=$rc (LAW §14: a report of another schema is a throw) :: $(tail -1 "$X/p.log")"
echo '{"entries":{}}' > "$X/obj2.json"; rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$X/obj2.json"); echo "PX base-entries-{} rc=$rc :: $(tail -1 "$X/p.log")"
echo '[]' > "$X/arr.json"; rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$X/arr.json"); echo "PX base-[] rc=$rc :: $(tail -1 "$X/p.log")"
rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$K/results/p13/browser/route.json"); echo "PX base=a-browser-report rc=$rc :: $(tail -1 "$X/p.log")"
# wrong-kind base: a report of the planted (leaking) tree itself, passed as the base
raf=$(find src -name useRAFLoop.ts -not -path '*/__tests__/*' | head -1); h=$(sha "$raf"); cp "$raf" "$X/raf"
printf 'import * as zq9L from "@mkbabb/keyframes.js";\nvoid zq9L;\n' | cat - "$X/raf" > "$raf"
rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$PB" --json "$X/leak.json"); echo "PX leak vs floor base rc=$rc :: $(grep -m1 'motion-core' "$X/p.log" | cut -c1-200)"
rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$X/leak.json"); echo "PX leak vs its own report as --base (floorBase:false) rc=$rc :: $(tail -1 "$X/p.log") :: $(grep -m1 'motion-core' "$X/p.log" | cut -c1-200)"
rc=$(run node scripts/structure/seal/seal.mjs --root "$T"); echo "PX leak, the gate rc=$rc :: $(grep -E '^FAIL' "$X/p.log" | tr '\n' ' ' | cut -c1-200)"
cp "$X/raf" "$raf"; [ "$(sha "$raf")" = "$h" ] && echo "raf restored" || echo "raf RESTORE-FAIL"
# a module the probe loads by a computed path, after its guard
P6P="$K/authored/p6-publish.mjs"; h=$(sha "$P6P"); cp "$P6P" "$X/p6p"; printf 'throw new Error("zq9 throw in p6-publish");\n' | cat - "$X/p6p" > "$P6P"
rc=$(run node "$K/tools/peer-closure.mjs" --root "$T" --base "$PB"); cp "$X/p6p" "$P6P"; [ "$(sha "$P6P")" = "$h" ] || echo RESTORE-FAIL
echo "PX throw in authored/p6-publish.mjs (computed dynamic import) rc=$rc expect=2 :: $(grep -m1 'no verdict' "$X/p.log" | cut -c1-200)"
echo "after extra9: $(dg)"
echo "extra9 end $(date -u +%FT%TZ) load $(load)"
