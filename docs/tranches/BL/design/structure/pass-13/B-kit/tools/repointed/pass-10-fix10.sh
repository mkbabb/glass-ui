#!/usr/bin/env bash
# fix10.sh <KIT> <built replayed tree> <scratch> <results> · critique-B pass 10 · written AFTER the battery hash (glue),
# disclosed in critique-B.md §7. Re-runs the hashed battery's self-defective cases with corrected glue, expectations
# unchanged, and probes the two tally/rekey findings past the hashed set.
#  F1 plants10b.mjs (the PC-type correction) through pass 8's runner and adapter
#  F2 migration10's detectors: appendix A's execFileSync given maxBuffer (it died ENOBUFS on `git ls-files` over this
#     repo: a 1 MB default), appendix B called without `--list` in its published-list slot (argv[3])
#  F3 BW6 recounted (the hashed grep read the "6" in its own BW6MISS marker)
#  F4 pass 6's fd4-probe with its one moved import re-pointed (lib/tree.mjs → lib/tree/tree.mjs, S74d)
#  F5 the tally over the committed pair, the reruns AND the pass-10 touched-spec pair (the route's claim), kit + tally10
#  F6 wrong-kind masking, concretely: a route report in which one base-green key FAILS. With the re-keyed base as
#     --base the tally reads RED; with that same failing route report as --base (right schema, wrong kind) it reads
#     GREEN. And rekey fed the failing route report writes a "re-keyed base" that the tally then reads GREEN.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; R="$4"; mkdir -p "$S/fx"; X="$(cd "$S/fx" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")/../../../../pass-10/critique-B/tools" && pwd)"; ST="$HERE/../../.."; P8="$ST/pass-8/critique-B/battery"; B="$HERE/../battery"
load() { sysctl -n vm.loadavg; }; export CRIT_TMP="$S"
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
echo "fix10 start $(date -u +%FT%TZ) load $(load)"
echo "== F1 plants10b"
node "$P8/run-plants.mjs" --root "$T" --adapter "$P8/adapter.mjs" --set "$HERE/plants10b.mjs" --out "$R/plants10b.json" | cut -c1-400
node -e 'const d=require(process.argv[1]);let p=0,f=0;for(const r of d.rows){const ok=r.id.startsWith("PD-val")?r.verdict==="CAUGHT"&&JSON.stringify(r.lines.B4??[]).includes("module grain"):r.id.startsWith("PD-type")?r.verdict==="CLEAN":false;ok?p++:f++;console.log(`ROW ${r.id} ${ok?"PASS":"FAIL"} verdict=${r.verdict} B4=${JSON.stringify(r.lines.B4??[]).slice(0,200)}`)}console.log(`F1 ROWS pass ${p} fail ${f}`)' "$R/plants10b.json"
echo "== F2 migration detectors, corrected"
W="$T/docs/tranches/BL/waves/W-C.2.md"; M="$T/MIGRATION.md"
awk '/^## Appendix A/{f=1} f&&/^```js/{g=1;next} g&&/^```/{exit} g' "$W" | sed 's/{ cwd: root, encoding: "utf8" }/{ cwd: root, encoding: "utf8", maxBuffer: 1 << 28 }/' > "$X/no-meta.mjs"
awk '/^## Appendix B/{f=1} f&&/^```js/{g=1;next} g&&/^```/{exit} g' "$W" > "$X/migration-shape.mjs"
grep -c 'maxBuffer' "$X/no-meta.mjs" | sed 's/^/F2 maxBuffer lines patched: /'
h=$(shasum -a 256 "$M" | cut -c1-16); cp "$M" "$X/mig"
restore() { cp "$X/mig" "$M"; [ "$(shasum -a 256 "$M" | cut -c1-16)" = "$h" ] || echo "F2 RESTORE-FAIL"; }
read s e < <(node -e 'const L=require("fs").readFileSync(process.argv[1],"utf8").split("\n");const s=L.findIndex(l=>/^## 11\.0\.0\b/.test(l));let e=L.findIndex((l,i)=>i>s&&/^## /.test(l));if(e<0)e=L.length;console.log((s+1)+" "+e)' "$M")
inS() { grep -E '^MIGRATION\.md:[0-9]+ ' "$1" | awk -F'[: ]' -v s="$2" -v e="$3" '$2>=s && $2<=e' | wc -l | tr -d ' '; }
nm() { (cd "$T" && node "$X/no-meta.mjs" . --list) > "$1" 2>&1; echo "rc=$?"; }
echo "F2 section $s..$e; route: $(nm "$X/nm-route.txt") $(head -1 "$X/nm-route.txt" | cut -c1-200)"
echo "F2 MG1 C2-G1 hits in the section: $(inS "$X/nm-route.txt" "$s" "$e") (expect 0)"
cR=$(grep -cE '^MIGRATION\.md:' "$X/nm-route.txt"); git -C "$T" show HEAD:MIGRATION.md > "$M"; nm "$X/nm-head.txt" > /dev/null; cH=$(grep -cE '^MIGRATION\.md:' "$X/nm-head.txt"); restore
echo "F2 MG4 META hits in MIGRATION.md: route $cR, HEAD $cH, delta $((cR-cH)) (expect <= 0)"
for pl in "row-ref|The structure cut lands as BL #10." "wave-id|Carried by BL.W3." "wave-id2|Carried by W-STRUCTURE-CUT." "dated|[2026-10-16 · structure cut]" "bl-bare|The structure cut (BL)." "tranche-word|This tranche moves files."; do
  id="${pl%%|*}"; t="${pl#*|}"
  node -e 'const fs=require("fs");const [m,s,t]=process.argv.slice(1);const L=fs.readFileSync(m,"utf8").split("\n");L.splice(Number(s),0,"",t);fs.writeFileSync(m,L.join("\n"));' "$M" "$s" "$t"
  nm "$X/nm-$id.txt" > /dev/null; c=$(inS "$X/nm-$id.txt" "$s" "$((e+2))"); restore
  echo "F2 MGP-$id '$t' → C2-G1 hits in the section: $c"; done
sed -n "${s},${e}p" "$M" > "$X/section.md"; sed '1s/^## 11\.0\.0.*$/## 11.0.0 — the structure cut (BL)/' "$X/section.md" > "$X/section-h.md"
(cd "$T" && node "$X/migration-shape.mjs" "$X/section.md" "" --list) 2>&1 | sed 's/^/F2 MG3 /'; echo "F2 MG3 rc=${PIPESTATUS[0]}"
(cd "$T" && node "$X/migration-shape.mjs" "$X/section-h.md" "" --list) 2>&1 | sed 's/^/F2 MGP-heading /'
echo "== F3 BW6 recount"
P9S="$ST/pass-9/B-kit/results/p9/browser/specs.txt"; BR="$K/results/p13/browser"
node "$K/tools/browser-select.mjs" --root "$T" --out "$X/sel" > /dev/null 2>&1
echo "F3 specs selected now and not by pass 9: $(comm -13 <(sort "$P9S") <(sort "$X/sel/specs.txt") | wc -l | tr -d ' '); left: $(comm -23 <(sort "$P9S") <(sort "$X/sel/specs.txt") | wc -l | tr -d ' ')"
echo "== F4 fd4-probe re-pointed"
sed 's#S("lib/tree.mjs")#S("lib/tree/tree.mjs")#' "$ST/pass-6/critique-B/battery/fd4-probe.mjs" > "$X/fd4-probe.mjs"; diff "$ST/pass-6/critique-B/battery/fd4-probe.mjs" "$X/fd4-probe.mjs"
(cd "$T" && node "$X/fd4-probe.mjs" --root "$T") 2>&1 | grep -E 'FD4|PASS|FAIL' | cut -c1-200
echo "== F5 tally with the pass-10 touched-spec pair"
A=(--base "$BR/base-rekeyed.json" --route "$BR/route.json")
for f in $(ls "$BR/reruns" | sort); do case "$f" in base-*.rekeyed.json) A+=(--base-rerun "$BR/reruns/$f");; route-*.json) A+=(--route-rerun "$BR/reruns/$f");; esac; done
A+=(--base-rerun "$BR/p10-steps/base.rekeyed.json" --route-rerun "$BR/p10-steps/route.json")
node "$K/tools/browser-tally.mjs" "${A[@]}" 2>&1 | grep -E '^(base keys|base-green|verdict)'; echo "F5 kit rc=${PIPESTATUS[0]}"
node "$B/tally10.mjs" "${A[@]}" 2>&1 | grep -E '^(reports|base-green|ACCOUNTED)'; echo "F5 tally10 rc=${PIPESTATUS[0]}"
echo "== F6 wrong-kind masking"
node -e 'const fs=require("fs");const [b,r,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(b)),R=JSON.parse(fs.readFileSync(r));
const k=new Map();for(const x of B.results){const kk=x.spec+" :: "+x.title;if(x.status==="expected"&&!k.has(kk))k.set(kk,1)}
const i=R.results.findIndex(x=>x.status==="expected"&&k.has(x.spec+" :: "+x.title));const F=JSON.parse(JSON.stringify(R));F.results[i].status="unexpected";
fs.writeFileSync(o,JSON.stringify(F));console.log("F6 flipped: "+F.results[i].spec+" :: "+F.results[i].title.slice(0,80));' "$BR/base-rekeyed.json" "$BR/route.json" "$X/route-fail.json"
node "$K/tools/browser-tally.mjs" --base "$BR/base-rekeyed.json" --route "$X/route-fail.json" > "$X/t1.txt" 2>&1; echo "F6 right base, failing route: rc=$? :: $(grep verdict "$X/t1.txt")"
node "$K/tools/browser-tally.mjs" --base "$X/route-fail.json" --route "$X/route-fail.json" > "$X/t2.txt" 2>&1; echo "F6 the failing route report as --base: rc=$? :: $(grep verdict "$X/t2.txt")"
node "$K/tools/rekey.mjs" "$X/route-fail.json" "$T" "$X/rk-route.json" > "$X/rk.txt" 2>&1; echo "F6 rekey fed the failing route report: rc=$? :: $(tail -1 "$X/rk.txt" | cut -c1-120)"
node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log("F6 its output: testDir "+j.testDir+", rekeyedFrom "+JSON.stringify(j.rekeyedFrom).slice(-60)+", baseReport "+(j.baseReport?"set":"null"))' "$X/rk-route.json"
node "$K/tools/browser-tally.mjs" --base "$X/rk-route.json" --route "$X/route-fail.json" > "$X/t3.txt" 2>&1; echo "F6 that output as --base, the failing route as --route: rc=$? :: $(grep verdict "$X/t3.txt")"
echo "after fix10: $(dg)"
echo "fix10 end $(date -u +%FT%TZ) load $(load)"
