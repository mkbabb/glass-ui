#!/usr/bin/env bash
# select-capture.sh <KIT dir> <replayed tree> <scratch> · critique-B pass 9 · P8-R1 (a): "LAW §13 names the exclusion
# and its reason (a capture spec writes into docs/ and asserts no product behaviour); browser-select.mjs prints the
# excluded moved specs". Written and hashed BEFORE reading pass-9/B-kit. Independent expectation: the capture specs
# are the tests-visual/**/_*.spec.ts files on the final tree that the chain's moves touch (pass 8 measured 14).
#   SC1 browser-select exits 0 · SC2 specs.txt carries no capture spec · SC3 every touched capture spec is NAMED in the
#   tool's stdout/stderr or in an out-dir file other than specs.txt · SC4 LAW.md has a line naming the `_` capture
#   exclusion and docs/ (printed; the reading of "names its reason" is the critic's, from the printed lines)
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/sc"; X="$(cd "$S/sc" && pwd)"; rm -rf "$X/out"
node "$K/tools/browser-select.mjs" --root "$T" --out "$X/out" > "$X/stdout.txt" 2>&1; rc=$?
echo "SC1 $([ $rc = 0 ] && echo PASS || echo FAIL) rc=$rc :: $(tail -1 "$X/stdout.txt" | cut -c1-200)"
caps=$(cd "$T" && find tests-visual -name '_*.spec.ts' -not -path '*/node_modules/*' | sort)
touched=$(node -e 'const fs=require("fs");const m=JSON.parse(fs.readFileSync(process.argv[1],"utf8")).moves??[];const t=new Set(m.flatMap(x=>[x.from,x.to]));for(const c of process.argv[2].split("\n").filter(Boolean))if(t.has(c))console.log(c);' "$X/out/moved.json" "$caps" 2>/dev/null)
nt=$(echo "$touched" | grep -c . ); nc=$(echo "$caps" | grep -c .)
echo "SC capture specs on the tree $nc; touched by the chain's moves $nt"
inspecs=$(grep -E '(^|/)_[^/]*\.spec\.ts$' "$X/out/specs.txt" 2>/dev/null | wc -l | tr -d ' ')
echo "SC2 $([ "$inspecs" = 0 ] && echo PASS || echo FAIL) capture specs in specs.txt: $inspecs; specs.txt lines $(wc -l < "$X/out/specs.txt" 2>/dev/null | tr -d ' ')"
others=$(ls "$X/out" | grep -vE '^(specs.txt|moved.json|changed.txt)$'); miss=0
for c in $touched; do b=$(basename "$c"); hit=0; grep -q -- "$b" "$X/stdout.txt" && hit=1
  for o in $others; do grep -q -- "$b" "$X/out/$o" && hit=1; done
  [ $hit = 1 ] || { miss=$((miss+1)); echo "SC3 NOT-NAMED $c"; }; done
echo "SC3 $([ $miss = 0 ] && [ "$nt" -gt 0 ] && echo PASS || echo FAIL) touched capture specs not named as excluded: $miss of $nt"
echo "SC4 LAW lines naming the capture exclusion:"; grep -nE '_\*|capture' "$K/LAW.md" | grep -iE 'captur' | cut -c1-400 | sed 's/^/SC4   /'
