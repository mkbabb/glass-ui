#!/usr/bin/env bash
# run11.sh <KIT dir> <built replayed tree> <scratch> <results dir> · critique-B pass 11 · written and hashed BEFORE
# reading pass-11/B-kit. One sequential process. This battery's families, then every earlier critic's battery as
# regression, by path from committed bytes (never copied):
#   judges11      the kind matrix, F6, the flag matrix (judges11.sh)
#   floor-landed  the floor plant on the REPLAYED tree's own move CLI (the chain must carry the cure: S74c gone)
#   browser11     the browser bar through the cured tally and this seat's reader (browser11.sh, tally11.mjs)
#   p10-battery   pass 10's hashed run10.sh (7b7b5303…): judges10, plants10, migration10, browser10, and through it pass
#                 9's run-battery.sh (748826fb…), which carries pass 8's plants, the 402-row set (passes 4-7), crash8,
#                 pass 8's tree-probes (passes 5-7)
#   p10-post      pass 10's post-hash corrections, by path: plants10b.mjs (P9-R1 PD-* plants) through pass 8's runner
#                 and adapter; fix10b.sh (P9-R2 MIGRATION plants by W-C.2's own appendices, with the ENOBUFS/ENOENT
#                 glue); pass 6's fd4-probe with S74d's moved import re-pointed (pass 10's F4 line, printed by diff)
#   route-batt    the kit's own committed battery runner, when it ships one (tools/batteries.sh), read as INFO: its
#                 claims are the route's, judged in critique-B.md against its output
# Each family writes <results>/<name>.txt with start/end load; the tree's code digest is appended to digest-after.txt
# after every family, so a battery that leaves a byte behind shows.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; R="$4"; mkdir -p "$S" "$R"; S="$(cd "$S" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."; P8="$ST/pass-8/critique-B"; P10="$ST/pass-10/critique-B"
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after.txt"; }
export CRIT_TMP="$S" KIT="$K"
echo "before: $(digest)" > "$R/digest-after.txt"
fam judges11 bash "$HERE/judges11.sh" "$K" "$T" "$S"
LCLI=$(grep -lE 'usage: move\.mjs' $(find "$T/scripts/structure" -maxdepth 2 -name 'move.mjs' 2>/dev/null) /dev/null 2>/dev/null | head -1)
fam floor-landed sh -c "echo 'landed CLI: ${LCLI#$T/}'; grep -rnE 'const lead = ' '$T/scripts/structure' | sed 's#$T/##'; [ -n '$LCLI' ] && node '$HERE/floor11.mjs' --root '$T' --cli '$LCLI' --label replayed-tree-engine --expect kept"
fam browser11 bash "$HERE/browser11.sh" "$K" "$T" "$S"
mkdir -p "$R/p10-regress"
fam p10-battery bash "$P10/battery/run10.sh" "$K" "$T" "$S/p10" "$R/p10-regress"
p10post() {
  echo "== plants10b (P9-R1 PD-*)"
  node "$P8/battery/run-plants.mjs" --root "$T" --adapter "$P8/battery/adapter.mjs" --set "$P10/tools/plants10b.mjs" --out "$R/plants10b.json" | cut -c1-300
  node -e 'const d=require(process.argv[1]);let p=0,f=0;for(const r of d.rows){const ok=r.id.startsWith("PD-val")?r.verdict==="CAUGHT"&&JSON.stringify(r.lines.B4??[]).includes("module grain"):r.id.startsWith("PD-type")?r.verdict==="CLEAN":false;ok?p++:f++;console.log(`ROW ${r.id} ${ok?"PASS":"FAIL"} verdict=${r.verdict} B4=${JSON.stringify(r.lines.B4??[]).slice(0,200)}`)}console.log(`PD ROWS pass ${p} fail ${f}`)' "$R/plants10b.json"
  echo "== fix10b (P9-R2 MIGRATION, W-C.2 appendices)"
  bash "$P10/tools/fix10b.sh" "$K" "$T" "$S/p10post"
  echo "== fd4-probe re-pointed (S74d)"
  mkdir -p "$S/p10post"; sed 's#S("lib/tree.mjs")#S("lib/tree/tree.mjs")#' "$ST/pass-6/critique-B/battery/fd4-probe.mjs" > "$S/p10post/fd4-probe.mjs"
  diff "$ST/pass-6/critique-B/battery/fd4-probe.mjs" "$S/p10post/fd4-probe.mjs"
  (cd "$T" && node "$S/p10post/fd4-probe.mjs" --root "$T") 2>&1 | grep -E 'FD4|PASS|FAIL' | cut -c1-200
  echo "== every earlier critic battery file naming a path S74d moved (lib/{tree,symbols,placement,...}.mjs directly under scripts/structure/lib)"
  grep -rnE 'structure/lib/(tree|symbols|placement|classify|entries)\.mjs|S\("lib/(tree|symbols|placement|classify|entries)\.mjs"\)' "$ST"/pass-*/critique-B/battery 2>/dev/null | sed "s#$ST/##" | cut -c1-200
}
fam p10-post p10post
if [ -f "$K/tools/batteries.sh" ]; then fam route-batt-INFO bash "$K/tools/batteries.sh" "$K" "$T" "$S/rb"; else echo "no tools/batteries.sh in the kit" > "$R/route-batt-INFO.txt"; fi
echo "battery end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after.txt"
