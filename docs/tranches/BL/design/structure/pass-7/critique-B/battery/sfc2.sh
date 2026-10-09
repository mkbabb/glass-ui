#!/usr/bin/env bash
# sfc2.sh <replayed tree> <scratch dir> · critique-B pass 7 · FP6-4: an SFC split into two children, judged by the
# tree's cascade verifier against a snapshot of the same tree's own dist. Written and hashed BEFORE reading
# pass-7/B-kit. Procedure is the floor's (FLOOR-P6 §4.2, as pass-6's tools/sfc-relist.sh ran it): verify with scopes
# only, transcribe the UNLISTED rules with pass-6/tools/listing.mjs, verify with the full listing.
# CASCADE_REL overrides the verifier path if the route moved it (disclosed if used).
# Prints `SFC2 <id> <PASS|FAIL> rc=<n> :: <verdict lines>`.
set -u
T="$1"; S="$2"; mkdir -p "$S"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."
CAS="${CASCADE_REL:-scripts/structure/cascade.mjs}"
V() { node "$CAS" verify --root . --baseline "$S/snap" --dist dist "$@"; }
vd() { grep -hoE '"verdict": "[^"]*"' "$1" | sort | uniq -c | tr -s ' ' | tr '\n' ';' | cut -c1-260; }
ok() { local id="$1" want="$2" rc="$3" log="$4"; if { [ "$want" = 0 ] && [ "$rc" = 0 ]; } || { [ "$want" = 1 ] && [ "$rc" != 0 ]; }; then echo "SFC2 $id PASS rc=$rc :: $(vd "$log")"; else echo "SFC2 $id FAIL rc=$rc :: $(vd "$log")"; fi; }
npx vite build > "$S/b0.log" 2>&1 || { echo "SFC2 BASE FAIL build"; exit 1; }
node "$CAS" snapshot --root . --dist dist --out "$S/snap" > "$S/snap.log" 2>&1 || { echo "SFC2 SNAP FAIL"; exit 1; }
node "$HERE/sfc-split2.mjs" --root . --mode keep > "$S/split-keep.txt" || { echo "SFC2 NO-CANDIDATE"; cat "$S/split-keep.txt"; exit 1; }
cat "$S/split-keep.txt" | grep -E '^SPLIT2'
grep '^SCOPES ' "$S/split-keep.txt" | sed 's/^SCOPES //' > "$S/scopes.json"
grep '^SCOPES-ONE ' "$S/split-keep.txt" | sed 's/^SCOPES-ONE //' > "$S/scopes-one.json"
npx vite build > "$S/b-keep.log" 2>&1; echo "SFC2 build-keep rc=$?"
V > "$S/v-none.log" 2>&1; ok none 1 $? "$S/v-none.log"
V --reorders "$S/scopes.json" > "$S/v-scopes.log" 2>&1; ok scopes-only 1 $? "$S/v-scopes.log"
grep -E '^(SCOPE|UNLISTED)' "$S/v-scopes.log" | head -8 | sed 's/^/   /'
node "$ST/pass-6/tools/listing.mjs" "$S/v-scopes.log" "$S/scopes.json" "$S/listing.json" "critic plant: SFC split into two children" | sed 's/^/   /'
V --reorders "$S/listing.json" > "$S/v-listed.log" 2>&1; ok listed 0 $? "$S/v-listed.log"
grep -E '^(SCOPE|SCOPE-REFUSED|RISK)' "$S/v-listed.log" | head -6 | sed 's/^/   /'
node -e 'const fs=require("fs");const [l,o,w]=process.argv.slice(1);const d=JSON.parse(fs.readFileSync(l,"utf8"));d.scopes=JSON.parse(fs.readFileSync(o,"utf8")).scopes;fs.writeFileSync(w,JSON.stringify(d,null,1));' "$S/listing.json" "$S/scopes-one.json" "$S/listing-one.json"
V --reorders "$S/listing-one.json" > "$S/v-one.log" 2>&1; ok one-scope-listed 1 $? "$S/v-one.log"
node "$HERE/sfc-split2.mjs" --root . --undo .crit-sfc2-undo.json > /dev/null; rm -f .crit-sfc2-undo.json
node "$HERE/sfc-split2.mjs" --root . --mode value > "$S/split-value.txt"; grep -E '^(SPLIT2|VALUE)' "$S/split-value.txt"
npx vite build > "$S/b-value.log" 2>&1
V --reorders "$S/listing.json" > "$S/v-value.log" 2>&1; rc=$?
if [ $rc -ne 0 ] && grep -q 'content changed' "$S/v-value.log"; then echo "SFC2 value-listed PASS rc=$rc :: $(vd "$S/v-value.log")"; else echo "SFC2 value-listed FAIL rc=$rc :: $(vd "$S/v-value.log")"; fi
node "$HERE/sfc-split2.mjs" --root . --undo .crit-sfc2-undo.json > /dev/null; rm -f .crit-sfc2-undo.json
npx vite build > "$S/b-restore.log" 2>&1; echo '{}' > "$S/empty.json"
V --reorders "$S/empty.json" > "$S/v-restore.log" 2>&1; ok restore 0 $? "$S/v-restore.log"
