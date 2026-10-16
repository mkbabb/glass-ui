#!/usr/bin/env bash
# extent13.sh <KIT dir (the worktree's copy)> <built replayed tree> <unbuilt replayed clone> <built floor-base clone>
#             <scratch> · critique-B pass 13 · written and hashed BEFORE reading pass-13/B-kit or pass-13/B-proto.md.
# REGISTRY §P12-6.4 "the extent sweep's other rows, which pass 12's critic reached only through regressions", each per
# Bp12 §1's stated reading (pass-12/B-proto.md §1, read before the hash; it is pass 12's record, and §P12-6.2 step 2 says
# K13's code is byte-identical to K12's):
#   rekey: <tree> code digest = the chain's final, else throw (2); every base spec the chain carries lands on a file of
#          the tree, else throw (2)
#   browser-select: --root at the chain's final digest, else throw (2); every step's frozen file holds a move list or a
#          row (floor rows excepted), else throw (2)
#   peer-closure --base: every declared-free entry, each with three `broken` lists, else throw (2)
#   peer-closure --floor-base: the tree at S1's digest, else throw (2); a --base beside it, throw (2)
#   all four: frozen/SEQUENCE.json present, else throw (2)
# Every plant that edits a file restores it and checks the restore by sha256; every edited tree is re-digested after.
# Prints `E13 <id> <PASS|FAIL|INFO> rc=<n> expect=<…> :: <last line>` and `E13 SUMMARY pass=<n> fail=<n>`.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; U="$(cd "$3" && pwd)"; FBT="$(cd "$4" && pwd)"; S="$5"
mkdir -p "$S/e13"; X="$(cd "$S/e13" && pwd)"
TALLY="$K/tools/browser-tally.mjs"; REKEY="$K/tools/rekey.mjs"; SEL="$K/tools/browser-select.mjs"; PEER="$K/tools/peer-closure.mjs"
BR="$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' 2>/dev/null | sort | tail -1)")"
PB="$(find "$K/results" -name 'peer-closure-base.json' | sort | tail -1)"
SEQ="$K/frozen/SEQUENCE.json"
echo "E13 start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg); browser ${BR#$K/}; peer base ${PB#$K/}"
P=0; F=0
run() { (cd "$X" && timeout 900 "$@") >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | tail -1 | cut -c1-240; }
say() { local id="$1" rc="$2" exp="$3"
  case "$exp" in
    info) echo "E13 $id INFO rc=$rc :: $(last)";;
    verdict) if [ "$rc" = 0 ] || [ "$rc" = 1 ]; then P=$((P+1)); echo "E13 $id PASS rc=$rc expect=verdict :: $(last)"; else F=$((F+1)); echo "E13 $id FAIL rc=$rc expect=verdict :: $(last)"; fi;;
    *) if [ "$rc" = "$exp" ]; then P=$((P+1)); echo "E13 $id PASS rc=$rc expect=$exp :: $(last)"; else F=$((F+1)); echo "E13 $id FAIL rc=$rc expect=$exp :: $(last)"; fi;;
  esac; }
sha() { shasum -a 256 "$1" | cut -c1-64; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(d.digest); })' "$K/lib/digest.mjs" "$1"; }
FINAL=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1])).steps.at(-1).digest)' "$SEQ")
S1D=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1])).steps[0].digest)' "$SEQ")
echo "E13 chain final ${FINAL:0:16}… S1 ${S1D:0:16}…; T $(dg "$T" | cut -c1-16)… U $(dg "$U" | cut -c1-16)… FBT $(dg "$FBT" | cut -c1-16)…"
# byte plant: one comment line appended to src/index.ts of a tree, restored by sha256
bytein() { cp "$1/src/index.ts" "$X/index.keep"; BH=$(sha "$1/src/index.ts"); printf '\n// critic13 byte\n' >> "$1/src/index.ts"; }
byteout() { cp "$X/index.keep" "$1/src/index.ts"; [ "$(sha "$1/src/index.ts")" = "$BH" ] && echo "E13 restore $(basename "$1") src/index.ts ok" || { F=$((F+1)); echo "E13 RESTORE-FAIL $1/src/index.ts"; }; }
# ---------------- rekey
say RK-CTL-U "$(run node "$REKEY" "$BR/base.json" "$U" "$X/rk-ctl.json")" 0
say RK-OFF-floorbase "$(run node "$REKEY" "$BR/base.json" "$FBT" "$X/rk-x.json")" 2
bytein "$U"; echo "E13 U with the byte plant at $(dg "$U" | cut -c1-16)…"
say RK-OFF-byte "$(run node "$REKEY" "$BR/base.json" "$U" "$X/rk-x.json")" 2
byteout "$U"
node -e 'const fs=require("fs");const [b,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(b));const r0=B.results[0];
const a=structuredClone(B);a.results.push({...structuredClone(r0),spec:r0.spec.replace(/[^/]+$/,"zz-critic13-unlanded.spec.ts"),title:"critic13 unlanded"});fs.writeFileSync(o+"/base-unlanded-new.json",JSON.stringify(a));
const b2=structuredClone(B);for(const r of b2.results)if(r.spec===r0.spec)r.spec=r0.spec.replace(/\.spec\.ts$/,"-critic13.spec.ts");fs.writeFileSync(o+"/base-unlanded-renamed.json",JSON.stringify(b2));
console.log("E13 unlanded plants from "+r0.spec)' "$BR/base.json" "$X"
say RK-UNLANDED-added "$(run node "$REKEY" "$X/base-unlanded-new.json" "$T" "$X/rk-x.json")" 2
say RK-UNLANDED-renamed "$(run node "$REKEY" "$X/base-unlanded-renamed.json" "$T" "$X/rk-x.json")" 2
# ---------------- browser-select
say BS-CTL "$(run node "$SEL" --root "$T" --out "$X/sel-ctl")" 0
say BS-OFF-floorbase "$(run node "$SEL" --root "$FBT" --out "$X/sel-x")" 2
bytein "$U"; say BS-OFF-byte "$(run node "$SEL" --root "$U" --out "$X/sel-x")" 2; byteout "$U"
say BS-CTL-U "$(run node "$SEL" --root "$U" --out "$X/sel-ctl-u")" 0
# a frozen step file with neither move list nor row: first moves step, first row step, each degenerate form
MV=$(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.steps.find(x=>x.kind==="moves"&&x.file).file)' "$SEQ")
RW=$(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.steps.find(x=>x.kind==="row"&&x.file).file)' "$SEQ")
LMV=$(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.steps.filter(x=>x.kind==="moves"&&x.file).at(-1).file)' "$SEQ")
LRW=$(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.steps.filter(x=>x.kind==="row"&&x.file).at(-1).file)' "$SEQ")
echo "E13 step files planted: first moves $MV, last moves $LMV, first row $RW, last row $LRW"
for sf in "$MV" "$LMV" "$RW" "$LRW"; do f="$K/$sf"; [ -f "$f" ] || { F=$((F+1)); echo "E13 FAIL step file $sf missing"; continue; }
  h=$(sha "$f"); cp "$f" "$X/step.keep"; id=$(basename "$sf" .json)
  for form in obj arr nulls missing; do
    case "$form" in obj) echo '{}' > "$f";; arr) echo '[]' > "$f";; nulls) echo '{"moves":null,"files":null}' > "$f";; missing) rm -f "$f";; esac
    say "BS-STEP-$id-$form" "$(run node "$SEL" --root "$T" --out "$X/sel-x")" 2
    cp "$X/step.keep" "$f"; [ "$(sha "$f")" = "$h" ] || { F=$((F+1)); echo "E13 RESTORE-FAIL $sf"; }; done; done
# a non-floor step naming no file, in SEQUENCE.json
h=$(sha "$SEQ"); cp "$SEQ" "$X/seq.keep"
node -e 'const fs=require("fs");const f=process.argv[1];const s=JSON.parse(fs.readFileSync(f));const i=s.steps.findIndex(x=>x.kind==="moves"&&x.file);s.steps[i].file=null;fs.writeFileSync(f,JSON.stringify(s,null,1))' "$SEQ"
say BS-SEQ-nofile "$(run node "$SEL" --root "$T" --out "$X/sel-x")" 2
cp "$X/seq.keep" "$SEQ"
node -e 'const fs=require("fs");const f=process.argv[1];const s=JSON.parse(fs.readFileSync(f));const i=s.steps.findIndex(x=>x.kind==="row"&&x.file);s.steps[i].kind="critic13-kind";fs.writeFileSync(f,JSON.stringify(s,null,1))' "$SEQ"
say BS-SEQ-unknownkind "$(run node "$SEL" --root "$T" --out "$X/sel-x")" 2
cp "$X/seq.keep" "$SEQ"; [ "$(sha "$SEQ")" = "$h" ] || { F=$((F+1)); echo "E13 RESTORE-FAIL SEQUENCE.json"; }
say BS-CTL-after "$(run node "$SEL" --root "$T" --out "$X/sel-ctl2")" 0
cmp -s "$X/sel-ctl/specs.txt" "$X/sel-ctl2/specs.txt" && echo "E13 BS selection identical before and after the plants ($(wc -l < "$X/sel-ctl/specs.txt") specs)" || { F=$((F+1)); echo "E13 BS FAIL selection differs after the plants"; }
# ---------------- peer-closure --base
if [ -d "$T/dist" ] && [ -n "$PB" ]; then
  say PC-CTL "$(run node "$PEER" --root "$T" --base "$PB")" 0
  ENTRIES=$(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(Object.keys(j.entries).join(" "))' "$PB")
  echo "E13 base entries: $ENTRIES"
  for e in $ENTRIES; do eid="${e//\//_}"
    node -e 'const fs=require("fs");const [b,e,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b));delete j.entries[e];fs.writeFileSync(o,JSON.stringify(j))' "$PB" "$e" "$X/pb.json"
    say "PC-DEL-entry-$eid" "$(run node "$PEER" --root "$T" --base "$X/pb.json")" 2
    for arm in names dist files; do
      node -e 'const fs=require("fs");const [b,e,a,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b));delete j.entries[e].broken[a];fs.writeFileSync(o,JSON.stringify(j))' "$PB" "$e" "$arm" "$X/pb.json"
      say "PC-DEL-broken-$eid-$arm" "$(run node "$PEER" --root "$T" --base "$X/pb.json")" 2
      node -e 'const fs=require("fs");const [b,e,a,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b));j.entries[e].broken[a]="none";fs.writeFileSync(o,JSON.stringify(j))' "$PB" "$e" "$arm" "$X/pb.json"
      say "PC-STR-broken-$eid-$arm" "$(run node "$PEER" --root "$T" --base "$X/pb.json")" 2; done
    node -e 'const fs=require("fs");const [b,e,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b));j.entries[e].broken=null;fs.writeFileSync(o,JSON.stringify(j))' "$PB" "$e" "$X/pb.json"
    say "PC-NULL-broken-$eid" "$(run node "$PEER" --root "$T" --base "$X/pb.json")" 2
  done
  node -e 'const fs=require("fs");const [b,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b));j.entries={};fs.writeFileSync(o,JSON.stringify(j))' "$PB" "$X/pb.json"
  say PC-EMPTY-entries "$(run node "$PEER" --root "$T" --base "$X/pb.json")" 2
else F=$((F+1)); echo "E13 PC FAIL the built tree has no dist or the kit commits no peer-closure-base.json"; fi
# ---------------- peer-closure --floor-base
say PC-FB-CTL "$(run node "$PEER" --root "$FBT" --floor-base --table src/index.ts --json "$X/pfb.json")" verdict
say PC-FB-OFF-final "$(run node "$PEER" --root "$T" --floor-base --table src/index.ts)" 2
bytein "$FBT"; say PC-FB-OFF-byte "$(run node "$PEER" --root "$FBT" --floor-base --table src/index.ts)" 2; byteout "$FBT"
[ -n "$PB" ] && say PC-FB-with-base "$(run node "$PEER" --root "$FBT" --floor-base --table src/index.ts --base "$PB")" 2
# ---------------- SEQUENCE.json absent, every judge that reads it
h=$(sha "$SEQ"); cp "$SEQ" "$X/seq.keep"; rm -f "$SEQ"
say SEQ-missing-rekey "$(run node "$REKEY" "$BR/base.json" "$T" "$X/rk-x.json")" 2
say SEQ-missing-select "$(run node "$SEL" --root "$T" --out "$X/sel-x")" 2
[ -n "$PB" ] && say SEQ-missing-peer "$(run node "$PEER" --root "$T" --base "$PB")" 2
say SEQ-missing-peer-fb "$(run node "$PEER" --root "$FBT" --floor-base --table src/index.ts)" 2
say SEQ-missing-tally "$(run node "$TALLY" --base "$BR/base-rekeyed.json" --route "$BR/route.json")" 2
cp "$X/seq.keep" "$SEQ"; [ "$(sha "$SEQ")" = "$h" ] && echo "E13 SEQUENCE.json restored" || { F=$((F+1)); echo "E13 RESTORE-FAIL SEQUENCE.json"; }
echo "E13 digests after: T $(dg "$T" | cut -c1-16)… U $(dg "$U" | cut -c1-16)… FBT $(dg "$FBT" | cut -c1-16)…"
[ "$(dg "$T")" = "$FINAL" ] && [ "$(dg "$U")" = "$FINAL" ] && [ "$(dg "$FBT")" = "$S1D" ] && echo "E13 trees unchanged" || { F=$((F+1)); echo "E13 FAIL a tree digest moved"; }
echo "E13 end $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
echo "E13 SUMMARY pass=$P fail=$F"
