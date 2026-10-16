#!/usr/bin/env bash
# fix10b.sh <KIT> <replayed tree> <scratch> · critique-B pass 10 · written AFTER the battery hash (glue), disclosed in
# critique-B.md §7. F2 again: appendix A lists files by `git ls-files`, which on an uncommitted migrated tree names the
# paths the chain moved away (ENOENT on the first). Two patches to the extracted copy, both printed by diff: maxBuffer,
# and the tracked list filtered to files that exist. MIGRATION.md is tracked and exists, so the section read is the
# detector's own grammar over the chain's text. Expectations unchanged (migration10.sh header).
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/fxb"; X="$(cd "$S/fxb" && pwd)"
W="$T/docs/tranches/BL/waves/W-C.2.md"; M="$T/MIGRATION.md"
awk '/^## Appendix A/{f=1} f&&/^```js/{g=1;next} g&&/^```/{exit} g' "$W" > "$X/orig.mjs"
sed -e 's/{ cwd: root, encoding: "utf8" }/{ cwd: root, encoding: "utf8", maxBuffer: 1 << 28 }/' \
    -e 's/^let files = tracked.filter(inScope);/let files = tracked.filter(inScope).filter((f) => fs.existsSync(path.join(root, f)));/' "$X/orig.mjs" > "$X/no-meta.mjs"
diff "$X/orig.mjs" "$X/no-meta.mjs" | sed 's/^/F2b patch /'
h=$(shasum -a 256 "$M" | cut -c1-16); cp "$M" "$X/mig"
restore() { cp "$X/mig" "$M"; [ "$(shasum -a 256 "$M" | cut -c1-16)" = "$h" ] || echo "F2b RESTORE-FAIL"; }
read s e < <(node -e 'const L=require("fs").readFileSync(process.argv[1],"utf8").split("\n");const s=L.findIndex(l=>/^## 11\.0\.0\b/.test(l));let e=L.findIndex((l,i)=>i>s&&/^## /.test(l));if(e<0)e=L.length;console.log((s+1)+" "+e)' "$M")
inS() { grep -E '^MIGRATION\.md:[0-9]+ ' "$1" | awk -F'[: ]' -v s="$2" -v e="$3" '$2>=s && $2<=e' | wc -l | tr -d ' '; }
nm() { (cd "$T" && node "$X/no-meta.mjs" . --list) > "$1" 2>&1; echo "rc=$?"; }
echo "F2b section $s..$e; route $(nm "$X/nm-route.txt") :: $(head -1 "$X/nm-route.txt" | cut -c1-220)"
echo "F2b MG1 C2-G1 hits in the section: $(inS "$X/nm-route.txt" "$s" "$e") (expect 0)"
grep -E '^MIGRATION\.md:' "$X/nm-route.txt" | awk -F'[: ]' -v s="$s" -v e="$e" '$2>=s && $2<=e' | head -5 | sed 's/^/F2b   /'
cR=$(grep -cE '^MIGRATION\.md:' "$X/nm-route.txt"); git -C "$T" show HEAD:MIGRATION.md > "$M"; echo "F2b HEAD text $(nm "$X/nm-head.txt")"; cH=$(grep -cE '^MIGRATION\.md:' "$X/nm-head.txt"); restore
echo "F2b MG4 META hits in MIGRATION.md: route $cR, HEAD $cH, delta $((cR-cH)) (expect <= 0)"
for pl in "row-ref|The structure cut lands as BL #10." "wave-id|Carried by BL.W3." "wave-id2|Carried by W-STRUCTURE-CUT." "dated|[2026-10-16 · structure cut]" "bl-bare|The structure cut (BL)." "tranche-word|This tranche moves files."; do
  id="${pl%%|*}"; t="${pl#*|}"
  node -e 'const fs=require("fs");const [m,s,t]=process.argv.slice(1);const L=fs.readFileSync(m,"utf8").split("\n");L.splice(Number(s),0,"",t);fs.writeFileSync(m,L.join("\n"));' "$M" "$s" "$t"
  nm "$X/nm-$id.txt" > /dev/null; c=$(inS "$X/nm-$id.txt" "$s" "$((e+2))"); restore
  echo "F2b MGP-$id '$t' → C2-G1 hits in the section: $c"; done
echo "after fix10b: $(node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T")"
