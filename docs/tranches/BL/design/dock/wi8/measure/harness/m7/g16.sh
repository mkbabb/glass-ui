#!/usr/bin/env bash
# g16.sh <ref> <tree-dir> [keep]: MEASURE-7, G-16 (RU-63): the dock entry gzipped, on a `git archive` build. The ref is
# archived into <tree-dir> (emptied first; node_modules linked to the main checkout's), the library built once (it writes dist/ by its own swap) under the
# guard, and dist/dock.js read: its bytes and its gzip (zlib, level 6 and level 9), and the same for the entry with
# every chunk it imports statically, transitively (each file gzipped alone, summed). The dist is deleted after the read;
# the tree too unless `keep` (v11.0.2's tree stays for G-15's baseline page). Output: one JSON line on stdout.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
REF="$1"; T="$2"; KEEP="${3:-}"
SHA=$(git -C "$W" rev-parse --short "$REF")
if [ ! -f "$T/.g16-ref" ] || [ "$(cat "$T/.g16-ref")" != "$SHA" ]; then
  rm -rf "$T"; mkdir -p "$T"
  git -C "$W" archive "$REF" | tar -x -C "$T"
  ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
  echo "$SHA" > "$T/.g16-ref"
fi
cd "$T"
$G --timeout 20 -- node node_modules/vite/bin/vite.js build --emptyOutDir > "$T/g16-build.log" 2>&1 || { echo "{\"ref\":\"$REF\",\"error\":\"build failed\"}"; tail -20 "$T/g16-build.log" >&2; exit 1; }
node -e '
const fs=require("fs"),z=require("zlib"),path=require("path");
const dir=process.argv[1], ref=process.argv[2], sha=process.argv[3];
const gz=(b,l)=>z.gzipSync(b,{level:l}).length;
const seen=new Set(); const q=["dock.js"];
while(q.length){const f=q.shift(); if(seen.has(f))continue; seen.add(f); const s=fs.readFileSync(path.join(dir,f),"utf8"); for(const m of s.matchAll(/(?:^|\n)\s*import\s*(?:[^"\x27;]*?from\s*)?["\x27](\.\/[^"\x27]+\.js)["\x27]/g)) q.push(path.normalize(m[1]));}
const e=fs.readFileSync(path.join(dir,"dock.js"));
let raw=0,g6=0,g9=0; for(const f of seen){const b=fs.readFileSync(path.join(dir,f)); raw+=b.length; g6+=gz(b,6); g9+=gz(b,9);}
console.log(JSON.stringify({ref,sha,entry:{bytes:e.length,gzip6:gz(e,6),gzip9:gz(e,9)},closure:{files:seen.size,bytes:raw,gzip6:g6,gzip9:g9}}));
' "$T/dist" "$REF" "$SHA"
rm -rf "$T/dist"
[ "$KEEP" = keep ] || { cd /; rm -rf "$T"; }
