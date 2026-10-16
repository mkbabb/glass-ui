#!/usr/bin/env bash
# route-batt.sh <KIT (worktree copy)> <built tree> <unbuilt tree> <floor-base tree> <scratch> <results>
# critique-B pass 12 · written AFTER the battery hash, disclosed in critique-B.md §7. The hashed run12.sh looked for the
# route's runner at tools/batteries.sh (pass 11's name); the pass-12 kit names it tools/batteries-p12.sh. This runs the
# route's own families of batteries-p12.sh line for line (plants-p12..p6, fix10, critic9x, fd4, floor), skipping only
# `critic11` (the pass-11 critic's run11.sh, which run12.sh's p11-battery already ran by path on the same tree), and
# compares each family's summary line with the route's committed one. Outputs go to <results>/route-batt/, planted
# reports to <scratch>; the worktree's kit results are untouched except where a route tool writes there by design.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; U="$(cd "$3" && pwd)"; FB="$(cd "$4" && pwd)"; S="$5"; O="$6/route-batt"
mkdir -p "$S/rb" "$O"; S="$(cd "$S/rb" && pwd)"; H="$K/tools"; B="$K/results/p12/browser"; ST="$K/../.."; CR="$(cd "$(dirname "$0")/../../.." && pwd)/pass-12/B-kit/results/p12"
load() { sysctl -n vm.loadavg; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
fam() { local n="$1"; shift; { echo "$n start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$n rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$O/$n.txt" 2>&1; echo "after $n: $(dg)" >> "$O/digest-after.txt"; }
echo "before: $(dg)" > "$O/digest-after.txt"
fam plants-p12 node "$H/plants-p12.mjs" --root "$T" --reports "$B" --plants "$S/plants" --out "$S/plants-p12.json"
fam plants-p11 node "$H/plants-p11.mjs" --root "$T" --floor-base "$FB" --reports "$B" --probe-base "$K/results/p12/peer-closure-base.json" --out "$S/plants-p11.json"
fam plants-p10 node "$H/plants-p10.mjs" --root "$T" --floor-base "$FB" --reports "$B" --out "$S/plants-p10.json"
fam plants-p9 node "$H/plants-p9.mjs" --root "$T" --reports "$B" --out "$S/plants-p9.json"
fam plants-p8 node "$H/plants-p8.mjs" --root "$T" --unbuilt "$U" --reports "$B" --out "$S/plants-p8.json"
fam plants-p7 node "$H/plants-p7.mjs" "$T" "$S/plants-p7.json"
fam plants-p6 node "$H/plants-p6.mjs" "$T" "$S/plants-p6.json"
mkdir -p "$S/fix10out"; fam fix10 bash "$H/repointed/pass-10-fix10.sh" "$K" "$T" "$S/fix10" "$S/fix10out"
mkdir -p "$S/c9x"; fam critic9x bash "$H/critic9-extra.sh" "$K" "$T" "$S/critic9x" "$S/c9x"
fam fd4 sh -c "cd '$T' && node '$H/repointed/pass-6-fd4-probe.mjs' --root '$T'"
fam floor node "$ST/pass-11/plants/p11-floor-plant.mjs" --root "$FB"
{ for n in plants-p12 plants-p11 plants-p10 plants-p9 plants-p8 plants-p7 plants-p6 fix10 critic9x fd4 floor; do
    mine=$(grep -vE ' (start|rc=[0-9]+ end) ' "$O/$n.txt" | grep -E 'SUMMARY|plants-p[0-9]+:|PASS|FAIL|KEPT|LOST|ROWS' | sed -E 's/load \{[^}]*\}//g' | tail -1 | cut -c1-200)
    theirs=$(grep -vE ' (start|rc=[0-9]+ end) ' "$CR/$n.txt" 2>/dev/null | grep -E 'SUMMARY|plants-p[0-9]+:|PASS|FAIL|KEPT|LOST|ROWS' | sed -E 's/load \{[^}]*\}//g' | tail -1 | cut -c1-200)
    [ "$mine" = "$theirs" ] && echo "RB $n SAME :: $mine" || echo "RB $n DIFF :: mine [$mine] route [$theirs]"
    echo "RB $n rc mine $(grep -oE "^$n rc=[0-9]+" "$O/$n.txt") route $(grep -oE "^$n rc=[0-9]+" "$CR/$n.txt" 2>/dev/null)"; done; } > "$O/compare.txt"
cat "$O/compare.txt"
