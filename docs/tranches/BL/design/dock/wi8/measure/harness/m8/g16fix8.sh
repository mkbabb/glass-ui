#!/usr/bin/env bash
# g16fix8.sh <ref> <tree-dir> <tag> [plant]: MEASURE-8 H8 (RU-77 as amended, C7-M2, C7-5; and G-12 in a `git archive`
# tree, RULINGS-7 C7 "G-12's build"). The ref is archived into <tree-dir> (as m7/g16.sh does; a tree already at the ref is
# kept; node_modules linked to the main checkout's), the library built in it under the guard, and read:
#   - G-16's three library numbers: the entry dist/dock.js, its static closure, and the union closure of dock,
#     dock-trigger, menu (DropdownMenu's entry), select, popover and tooltip, each file counted once (gzip 6 and 9);
#   - the consumer fixture (m8/g16fix/) built with Vite against that dist: its total JS, raw and gzipped file by file;
#   - with tag `cand` (no plant): G-12 (g12.mjs over the worktree's src and this tree's dist/).
# plant (applied to the archive tree only, never the worktree's src; the tree's file restored from git after):
#   unused  an export added to the dock entry (src/components/dock/index.ts) of a module the fixture never imports
#   used    a module of known size imported by GlassDock.vue and used in its setup (the fixture mounts GlassDock)
# The dist and the fixture's output are deleted after the read. Output: one JSON line to logs/m8-g16-<tag>.json.
set -euo pipefail
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
REF="$1"; T="$2"; TAG="$3"; PLANT="${4:-}"
SHA=$(git -C "$W" rev-parse --short "$REF")
if [ ! -f "$T/.g16-ref" ] || [ "$(cat "$T/.g16-ref")" != "$SHA" ]; then
  rm -rf "$T"; mkdir -p "$T"
  # docs/ is left out of the archive (pathspec exclude), not extracted and then removed: the full tree is about 5 GB of
  # docs (the 2026-11-19 resume found a half-extracted 5.0 GB candidate tree), and the library build never reads it
  git -C "$W" archive "$REF" -- . ':(exclude)docs' | tar -x -C "$T"
  ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
  echo "$SHA" > "$T/.g16-ref"
  echo "$(date '+%F %T') g16fix8: archived $REF ($SHA) into $T, docs/ left out" >> "$L/m8-disk.log"
fi
restore() {
  rm -f "$T/src/components/dock/m8-plant-unused.ts" "$T/src/components/dock/m8-plant-used.ts"
  git -C "$W" show "$REF:src/components/dock/index.ts" > "$T/src/components/dock/index.ts"
  git -C "$W" show "$REF:src/components/dock/GlassDock.vue" > "$T/src/components/dock/GlassDock.vue"
}
trap restore EXIT
restore
case "$PLANT" in
  unused)
    node -e 'let s="";let x=1;for(let i=0;i<4096;i++){x=(x*1103515245+12345)%2147483648;s+=(x>>>8&255).toString(16).padStart(2,"0");}require("fs").writeFileSync(process.argv[1],`// MEASURE-8 g16 plant: an export no page imports\nexport function m8PlantUnused(): string {\n    return "${s}";\n}\n`)' "$T/src/components/dock/m8-plant-unused.ts"
    printf '\nexport { m8PlantUnused } from "./m8-plant-unused";\n' >> "$T/src/components/dock/index.ts";;
  used)
    node -e 'let s="";let x=7;for(let i=0;i<4096;i++){x=(x*1103515245+12345)%2147483648;s+=(x>>>8&255).toString(16).padStart(2,"0");}require("fs").writeFileSync(process.argv[1],`// MEASURE-8 g16 plant: a module GlassDock uses\nexport const m8PlantUsed = "${s}";\n`)' "$T/src/components/dock/m8-plant-used.ts"
    python3 - "$T/src/components/dock/GlassDock.vue" <<'PY'
import sys, re
p = sys.argv[1]; s = open(p).read()
i = s.index("<script setup lang=\"ts\">") + len("<script setup lang=\"ts\">")
s = s[:i] + '\nimport { m8PlantUsed } from "./m8-plant-used";\nif (typeof window !== "undefined") (window as unknown as Record<string, unknown>).__m8PlantUsed = m8PlantUsed;\n' + s[i:]
open(p, "w").write(s)
PY
    ;;
  "") ;;
  *) echo "unknown plant $PLANT" >&2; exit 2;;
esac
cd "$T"
$G --timeout 25 -- node node_modules/vite/bin/vite.js build --emptyOutDir > "$T/g16-build.log" 2>&1 || { echo "{\"tag\":\"$TAG\",\"error\":\"library build failed\"}" > "$L/m8-g16-$TAG.json"; tail -20 "$T/g16-build.log" >&2; exit 1; }
FIX="$T/fixture-dist"
(cd "$H/m8/g16fix" && GLASS_DIST="$T/dist" FIX_OUT="$FIX" $G --timeout 15 -- node /Users/mkbabb/Programming/glass-ui/node_modules/vite/bin/vite.js build --config vite.config.mjs > "$T/g16-fix.log" 2>&1) || { echo "{\"tag\":\"$TAG\",\"error\":\"fixture build failed\"}" > "$L/m8-g16-$TAG.json"; tail -20 "$T/g16-fix.log" >&2; exit 1; }
PLANTSIZE=""
[ -n "$PLANT" ] && PLANTSIZE=$(node -e 'const fs=require("fs"),z=require("zlib");const f=process.argv[1];const s=fs.readFileSync(f,"utf8");const m=s.match(/"([0-9a-f]+)"/);console.log(JSON.stringify({file:f.split("/").pop(),literalBytes:m[1].length,literalGzip9:z.gzipSync(Buffer.from(m[1]),{level:9}).length}))' "$T/src/components/dock/m8-plant-$PLANT.ts")
node -e '
const fs=require("fs"),z=require("zlib"),path=require("path");
const [dir,fix,tag,ref,sha,plant,plantSize]=process.argv.slice(1);
const gz=(b,l)=>z.gzipSync(b,{level:l}).length;
const closure=(entries)=>{const seen=new Set();const q=[...entries];while(q.length){const f=q.shift();if(seen.has(f))continue;seen.add(f);const s=fs.readFileSync(path.join(dir,f),"utf8");for(const m of s.matchAll(/(?:^|\n)\s*import\s*(?:[^"\x27;]*?from\s*)?["\x27](\.\/[^"\x27]+\.js)["\x27]/g))q.push(path.normalize(m[1]));}let raw=0,g6=0,g9=0;for(const f of seen){const b=fs.readFileSync(path.join(dir,f));raw+=b.length;g6+=gz(b,6);g9+=gz(b,9);}return{files:seen.size,bytes:raw,gzip6:g6,gzip9:g9};};
const e=fs.readFileSync(path.join(dir,"dock.js"));
const js=[];const walk=(d)=>{for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(p.endsWith(".js"))js.push(p);}};walk(fix);
let fr=0,f6=0,f9=0;for(const p of js){const b=fs.readFileSync(p);fr+=b.length;f6+=gz(b,6);f9+=gz(b,9);}
console.log(JSON.stringify({tag,ref,sha,plant:plant||null,plantSize:plantSize?JSON.parse(plantSize):null,fixture:{files:js.length,bytes:fr,gzip6:f6,gzip9:f9},entry:{bytes:e.length,gzip6:gz(e,6),gzip9:gz(e,9)},closure:closure(["dock.js"]),union:closure(["dock.js","dock-trigger.js","menu.js","select.js","popover.js","tooltip.js"])}));
' "$T/dist" "$FIX" "$TAG" "$REF" "$SHA" "$PLANT" "$PLANTSIZE" > "$L/m8-g16-$TAG.json"
cat "$L/m8-g16-$TAG.json"
if [ "$TAG" = cand ] && [ -z "$PLANT" ]; then
  node "$H/g12.mjs" "$T/dist" > "$L/m8-g12-archive.txt" 2>&1 || true
  echo "g12 over $REF ($SHA)'s archive dist: $(grep -c '^pass' "$L/m8-g12-archive.txt") pass, $(grep -c '^FAIL\|^fail' "$L/m8-g12-archive.txt") fail" >> "$L/m8-g12-archive.txt"
fi
rm -rf "$T/dist" "$FIX"
