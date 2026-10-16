#!/usr/bin/env bash
# migration10.sh <replayed tree> <scratch> · critique-B pass 10 · written and hashed BEFORE reading pass-10/B-kit.
# P9-R2 (a): "The MIGRATION row writes `## 11.0.0` in W-C.2's form with no tranche id, and the 9 `BL`/"tranche" lines
# go in the same row". §P9-6.3: "W-C.2's C2-G1 and C2-G4 run over the route tree's MIGRATION.md and read 0". §P9-6.4:
# "a tranche id written into the chain's MIGRATION text read RED by C2-G1".
# The detectors are W-C.2's appendix A (C2-G1, no-meta.mjs) and appendix B (C2-G4, migration-shape.mjs), extracted
# byte for byte from the tree's committed docs/tranches/BL/waves/W-C.2.md at run time (sha printed). The chain's text is
# the `## 11.0.0` section of the tree's MIGRATION.md (heading to the next `## `). MIGRATION.md is edited only on the
# replayed tree and restored by sha256.
#   MG0  the section exists, its heading is exactly `## 11.0.0`                         PASS
#   MG1  C2-G1 META hits inside the section: 0                                           PASS
#   MG2  lines in the section naming `BL` (word) or "tranche": 0                         PASS
#   MG3  C2-G4 over the section alone (no published list): 0 misses, exit 0              PASS
#   MG4  C2-G1 META hits in the whole MIGRATION.md, route minus HEAD: <= 0              PASS (INFO the numbers)
#   MGP-* a tranche id written into the section (one per META class a tranche id takes: row ref `BL #10`, wave id
#         `BL.W3`, wave id `W-STRUCTURE-CUT`, dated bracket `[2026-10-16`) read by C2-G1 inside the section: >= 1  PASS
#   MGP-heading  the heading written `## 11.0.0 — the structure cut (BL)`: C2-G4 exit 1                         PASS
#   MGI-*  INFO: a bare `(BL)` and the word "tranche" written into the section, read by C2-G1 (its grammar's reach)
set -u
T="$(cd "$1" && pwd)"; S="$2"; mkdir -p "$S/mg"; X="$(cd "$S/mg" && pwd)"; M="$T/MIGRATION.md"; P=0; F=0
ok() { if [ "$2" = 1 ]; then P=$((P+1)); echo "MG $1 PASS :: $3"; else F=$((F+1)); echo "MG $1 FAIL :: $3"; fi; }
W="$T/docs/tranches/BL/waves/W-C.2.md"; echo "MG W-C.2.md sha256 $(shasum -a 256 "$W" | cut -c1-16)"
awk '/^## Appendix A/{f=1} f&&/^```js/{g=1;next} g&&/^```/{exit} g' "$W" > "$X/no-meta.mjs"
awk '/^## Appendix B/{f=1} f&&/^```js/{g=1;next} g&&/^```/{exit} g' "$W" > "$X/migration-shape.mjs"
echo "MG detectors: no-meta.mjs $(wc -l < "$X/no-meta.mjs" | tr -d ' ') lines, migration-shape.mjs $(wc -l < "$X/migration-shape.mjs" | tr -d ' ') lines"
h=$(shasum -a 256 "$M" | cut -c1-16); cp "$M" "$X/MIGRATION.route.md"
restore() { cp "$X/MIGRATION.route.md" "$M"; [ "$(shasum -a 256 "$M" | cut -c1-16)" = "$h" ] || { F=$((F+1)); echo "MG RESTORE-FAIL"; }; }
range() { node -e 'const L=require("fs").readFileSync(process.argv[1],"utf8").split("\n");const s=L.findIndex(l=>/^## 11\.0\.0\b/.test(l));if(s<0){console.log("-1 -1");process.exit(0)}let e=L.findIndex((l,i)=>i>s&&/^## /.test(l));if(e<0)e=L.length;console.log((s+1)+" "+e)' "$1"; }
inSection() { # <no-meta --list output> <start> <end> → META hits on MIGRATION.md lines start..end
  grep -E '^MIGRATION\.md:[0-9]+ ' "$1" | awk -F'[: ]' -v s="$2" -v e="$3" '$2>=s && $2<=e' | wc -l | tr -d ' '; }
nm() { (cd "$T" && node "$X/no-meta.mjs" . --list) > "$1" 2>&1; }
read s e < <(range "$M")
if [ "$s" = -1 ]; then ok MG0 0 "no '## 11.0.0' heading in MIGRATION.md (headings: $(grep -m3 '^## ' "$M" | tr '\n' '|'))"; echo "MG SUMMARY pass=$P fail=$F"; exit 1; fi
ok MG0 "$([ "$(sed -n "${s}p" "$M")" = "## 11.0.0" ] && echo 1 || echo 0)" "line $s: '$(sed -n "${s}p" "$M")'; section lines $s..$e"
sed -n "${s},${e}p" "$M" > "$X/section.md"
nm "$X/nm-route.txt"; c=$(inSection "$X/nm-route.txt" "$s" "$e"); ok MG1 "$([ "$c" = 0 ] && echo 1 || echo 0)" "C2-G1 META hits in the section: $c ($(head -1 "$X/nm-route.txt" | cut -c1-160))"
grep -nE '\bBL\b|tranche' "$X/section.md" | head -5 | sed 's/^/MG2   /'; c=$(grep -cE '\bBL\b|tranche' "$X/section.md"); ok MG2 "$([ "$c" = 0 ] && echo 1 || echo 0)" "lines naming BL or tranche: $c"
(cd "$T" && node "$X/migration-shape.mjs" "$X/section.md" --list) > "$X/shape.txt" 2>&1; rc=$?
ok MG3 "$([ $rc = 0 ] && echo 1 || echo 0)" "C2-G4 over the section: rc=$rc $(head -1 "$X/shape.txt")"
cR=$(grep -cE '^MIGRATION\.md:[0-9]+ ' "$X/nm-route.txt")
git -C "$T" show HEAD:MIGRATION.md > "$M"; nm "$X/nm-head.txt"; cH=$(grep -cE '^MIGRATION\.md:[0-9]+ ' "$X/nm-head.txt"); restore
ok MG4 "$([ "$cR" -le "$cH" ] && echo 1 || echo 0)" "META hits in MIGRATION.md: route $cR, HEAD $cH, delta $((cR-cH))"
plant() { # <id> <text inserted after the heading line> → META hits in the (shifted) section
  node -e 'const fs=require("fs");const [m,s,t]=process.argv.slice(1);const L=fs.readFileSync(m,"utf8").split("\n");L.splice(Number(s),0,"",t);fs.writeFileSync(m,L.join("\n"));' "$M" "$s" "$2"
  nm "$X/nm-$1.txt"; local c; c=$(inSection "$X/nm-$1.txt" "$s" "$((e+2))"); restore; echo "$c"; }
for pl in "row-ref|The structure cut lands as BL #10." "wave-id|Carried by BL.W3." "wave-id2|Carried by W-STRUCTURE-CUT." "dated|[2026-10-16 · structure cut]"; do
  id="${pl%%|*}"; txt="${pl#*|}"; c=$(plant "$id" "$txt"); ok "MGP-$id" "$([ "$c" -ge 1 ] && echo 1 || echo 0)" "'$txt' → C2-G1 hits in the section: $c"; done
for pl in "bl-bare|The structure cut (BL)." "tranche-word|This tranche moves files."; do
  id="${pl%%|*}"; txt="${pl#*|}"; c=$(plant "$id" "$txt"); echo "MG MGI-$id INFO :: '$txt' → C2-G1 hits in the section: $c"; done
sed '1s/^## 11\.0\.0.*$/## 11.0.0 — the structure cut (BL)/' "$X/section.md" > "$X/section-h.md"
(cd "$T" && node "$X/migration-shape.mjs" "$X/section-h.md") > "$X/shape-h.txt" 2>&1; rc=$?
ok MGP-heading "$([ $rc = 1 ] && echo 1 || echo 0)" "C2-G4 over the planted heading: rc=$rc $(head -1 "$X/shape-h.txt")"
echo "MG SUMMARY pass=$P fail=$F"
