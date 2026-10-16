#!/usr/bin/env bash
# b18-inputs.sh <replayed tree> <scratch> · critique-B pass 9 · P8-R3 (b): "B18 throws on a missing table, file or
# peer; LAW §5 says so". Written and hashed BEFORE reading pass-9/B-kit. Each case edits src/README.md, runs the tree's
# gate, restores byte for byte (sha256 checked). Expect 2 for each input case; 0 for the controls.
#   B0 control 0 · BI1 src/README.md missing 2 · BI2 the "Heavy-peer exclusions" heading renamed 2 ·
#   BI3 the ./motion-core row's peer cell naming no package (emptied) 2 · BI4 src/README.md empty 2 · B9 control again 0
set -u
T="$1"; S="$2"; mkdir -p "$S/b18"; X="$(cd "$S/b18" && pwd)"; cd "$T" || exit 9
SEAL="${SEAL_REL:-scripts/structure/seal/seal.mjs}"; R=src/README.md; P=0; F=0
run() { node "$SEAL" --root . --json "$X/v.json" >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | grep -iE 'no verdict|error|throw|B18|PASS|FAIL' | head -1 | cut -c1-220; }
say() { if [ "$2" = "$3" ]; then P=$((P+1)); echo "B18IN $1 PASS rc=$2 expect=$3 :: $(last)"; else F=$((F+1)); echo "B18IN $1 FAIL rc=$2 expect=$3 :: $(last)"; fi; }
h=$(shasum -a 256 "$R" | cut -c1-16); cp "$R" "$X/readme"
back() { cp "$X/readme" "$R"; [ "$(shasum -a 256 "$R" | cut -c1-16)" = "$h" ] || echo "B18IN RESTORE-FAIL"; }
say B0-ctl "$(run)" 0
rm "$R"; say BI1-readme-missing "$(run)" 2; back
sed -i '' 's/Heavy-peer exclusions/Heavy-peer zq9renamed/' "$R"; if cmp -s "$R" "$X/readme"; then echo "B18IN BI2 INFO no 'Heavy-peer exclusions' heading to rename"; else say BI2-heading-renamed "$(run)" 2; fi; back
node -e 'const fs=require("fs");const L=fs.readFileSync("src/README.md","utf8").split("\n");const i=L.findIndex(l=>/glass-ui\/motion-core\b/.test(l)&&/\|/.test(l));if(i<0){console.log("none");process.exit(0)}
const c=L[i].split("|");c[c.length-2]=" ";L[i]=c.join("|");fs.writeFileSync("src/README.md",L.join("\n"));console.log(L[i]);' > "$X/row.txt"
echo "B18IN BI3 row now: $(cat "$X/row.txt" | cut -c1-200)"; say BI3-row-names-no-peer "$(run)" 2; back
: > "$R"; say BI4-readme-empty "$(run)" 2; back
say B9-ctl-again "$(run)" 0
echo "B18IN SUMMARY pass=$P fail=$F"
