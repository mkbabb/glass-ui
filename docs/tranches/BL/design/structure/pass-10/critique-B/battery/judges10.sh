#!/usr/bin/env bash
# judges10.sh <KIT dir> <built replayed tree> <scratch> · critique-B pass 10 · written and hashed BEFORE reading
# pass-10/B-kit or pass-10/B-proto.md. Every expectation is fixed from REGISTRY §P9-6.4 ("for every input argument of
# every kit judge: missing, non-JSON, wrong-schema ({}, [], an object of another report kind), and a report of the
# right schema but the wrong kind (a non-floor report as --base): each exits 2"; "a leak in ./motion-core with each
# degenerate --base: never 0"), the S-14 hold (§P9-7: "no judge reads a malformed input as an all-clear"), P8-R2 and
# P6-R3 (0 GREEN, 1 RED, 2 no verdict). CLIs are the pass-9 kit's (headers of tools/*.mjs); a CLI that changed in
# pass 10 shows on the control lines (expect 0), never silently.
#
# Judges and their input arguments:
#   browser-tally  --base --route --base-rerun --route-rerun      (browser-seat/2 reports)
#   rekey          <base report> <tree> <out>
#   browser-select --root --out, and the kit inputs it reads: frozen/SEQUENCE.json and each step file
#   peer-closure   --root --base --overlay --table (--json is an output: INFO)
# Forms per JSON input: absent file, non-JSON, `{}`, `[]`, `null`, another report kind, an empty report (degenerate),
# and the right schema of the wrong kind. Each expects 2. Controls expect 0 (tally, select, rekey, probe on the clean
# tree with the floor-base report) or 1 (the leak against the floor-base report).
# Wrong-kind fixtures (right schema, wrong kind):
#   tally --base   the route report (no rekeyedFrom) and the raw base (testDir tests-visual, not re-keyed)
#   tally --route  the re-keyed base (rekeyedFrom set: base read against itself) and the raw base
#   tally --base-rerun  a route rerun;  --route-rerun  a re-keyed base rerun
#   rekey base     an already re-keyed report, and the route report
#   probe --base   the probe's own report of the CLEAN tree (floorBase false), of the LEAKING tree, and the floor-base
#                  report with floorBase false/absent/"true", entries [] / {} / one declared entry dropped
# Leak family: src/**/useRAFLoop.ts (./motion-core) gains a keyframes.js value import; the probe runs against every
# degenerate --base above: expect 2, and the line LEAK-NEVER-0 fails on any 0.
# Every edit is restored byte for byte and checked by sha256.
# Prints `J10 <id> <PASS|FAIL|INFO> rc=<n> expect=<n> :: <last line>` and `J10 SUMMARY pass=<n> fail=<n>`.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/j10"; X="$(cd "$S/j10" && pwd)"
TALLY="$K/tools/browser-tally.mjs"; SELECT="$K/tools/browser-select.mjs"; REKEY="$K/tools/rekey.mjs"; PEER="$K/tools/peer-closure.mjs"
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' 2>/dev/null | sort | tail -1)")}"
BASE="$BR/base-rekeyed.json"; ROUTE="$BR/route.json"; RAW="$BR/base.json"; RR="$BR/reruns"
PB="${PEER_BASE:-$(find "$K/results" -name 'peer-closure-base.json' 2>/dev/null | sort | tail -1)}"
echo "J10 fixtures: browser $BR; peer base $PB"
P=0; F=0
run() { timeout 600 "$@" >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | tail -1 | cut -c1-220; }
say() { local id="$1" rc="$2" exp="$3"; if [ "$exp" = info ]; then echo "J10 $id INFO rc=$rc :: $(last)";
  elif [ "$rc" = "$exp" ]; then P=$((P+1)); echo "J10 $id PASS rc=$rc expect=$exp :: $(last)"; else F=$((F+1)); echo "J10 $id FAIL rc=$rc expect=$exp :: $(last)"; fi; }
sha() { shasum -a 256 "$1" | cut -c1-16; }
restore() { cp "$2" "$1"; [ "$(sha "$1")" = "$3" ] || { echo "J10 RESTORE-FAIL $1"; F=$((F+1)); }; }
# ---- generic malformed fixtures
printf '{"$schema": "browser-seat/2", "results": [' > "$X/notjson.json"
echo '{}' > "$X/obj.json"; echo '[]' > "$X/arr.json"; echo 'null' > "$X/null.json"; echo '5' > "$X/num.json"; mkdir -p "$X/emptydir" "$X/adir.json"
[ -f "$PB" ] && cp "$PB" "$X/peer-report.json"
node -e 'const fs=require("fs");const [r,b,raw,o]=process.argv.slice(1);const R=JSON.parse(fs.readFileSync(r));const B=JSON.parse(fs.readFileSync(b));const W=JSON.parse(fs.readFileSync(raw));
const w=(n,j)=>fs.writeFileSync(o+"/"+n,JSON.stringify(j));
w("schema1.json",{...R,$schema:"browser-seat/1"}); w("noresults.json",{$schema:"browser-seat/2",testDir:R.testDir});
w("route-empty.json",{...R,results:[]}); w("base-empty.json",{...B,results:[]}); w("raw-empty.json",{...W,results:[]});
const nt={...R}; delete nt.testDir; w("notestdir.json",nt); w("raw-schema1.json",{...W,$schema:"browser-seat/1"});' "$ROUTE" "$BASE" "$RAW" "$X"
RB=(); RRT=(); BR1=""; RR1=""
for f in $(ls "$RR" 2>/dev/null | sort); do case "$f" in
  base-*.rekeyed.json) RB+=(--base-rerun "$RR/$f"); [ -z "$BR1" ] && BR1="$RR/$f";;
  route-*.json) RRT+=(--route-rerun "$RR/$f"); [ -z "$RR1" ] && RR1="$RR/$f";; esac; done
echo "J10 reruns: base ${#RB[@]}/2 route ${#RRT[@]}/2"
# ---- browser-tally: every input argument
say T-ctl "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}" "${RRT[@]}")" 0
echo "J10 T-ctl line: $(grep -iE 'base-green|verdict' "$X/o.log" | tr '\n' ' ' | cut -c1-300)"
say T-noargs "$(run node "$TALLY")" 2
for a in base route; do
  other=$([ $a = base ] && echo "--route $ROUTE" || echo "--base $BASE")
  for form in missing:"$X/nope.json" notjson:"$X/notjson.json" obj:"$X/obj.json" arr:"$X/arr.json" null:"$X/null.json" num:"$X/num.json" dir:"$X/adir.json" peer-report:"$X/peer-report.json" schema1:"$X/schema1.json" noresults:"$X/noresults.json" notestdir:"$X/notestdir.json" empty:"$X/route-empty.json"; do
    n="${form%%:*}"; f="${form#*:}"; say "T-$a-$n" "$(run node "$TALLY" $other --$a "$f")" 2; done
  say "T-$a-novalue" "$(run node "$TALLY" $other --$a)" 2
done
# right schema, wrong kind
say T-base-is-route "$(run node "$TALLY" --base "$ROUTE" --route "$ROUTE")" 2
say T-base-is-raw "$(run node "$TALLY" --base "$RAW" --route "$ROUTE")" 2
say T-route-is-rekeyed-base "$(run node "$TALLY" --base "$BASE" --route "$BASE")" 2
say T-route-is-raw "$(run node "$TALLY" --base "$BASE" --route "$RAW")" 2
for a in base-rerun route-rerun; do
  for form in missing:"$X/nope.json" notjson:"$X/notjson.json" obj:"$X/obj.json" arr:"$X/arr.json" null:"$X/null.json" peer-report:"$X/peer-report.json" schema1:"$X/schema1.json" noresults:"$X/noresults.json" empty:"$X/route-empty.json"; do
    n="${form%%:*}"; f="${form#*:}"; say "T-$a-$n" "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}" "${RRT[@]}" --$a "$f")" 2; done
done
[ -n "$RR1" ] && say T-base-rerun-is-route-rerun "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --base-rerun "$RR1")" 2
[ -n "$BR1" ] && say T-route-rerun-is-base-rerun "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --route-rerun "$BR1")" 2
# ---- rekey: <base> <tree> <out>
say R-ctl "$(run node "$REKEY" "$RAW" "$T" "$X/rk.json")" 0
say R-noargs "$(run node "$REKEY")" 2
say R-no-out "$(run node "$REKEY" "$RAW" "$T")" 2
for form in missing:"$X/nope.json" notjson:"$X/notjson.json" obj:"$X/obj.json" arr:"$X/arr.json" null:"$X/null.json" dir:"$X/adir.json" peer-report:"$X/peer-report.json" schema1:"$X/raw-schema1.json" empty:"$X/raw-empty.json"; do
  n="${form%%:*}"; f="${form#*:}"; say "R-base-$n" "$(run node "$REKEY" "$f" "$T" "$X/rk-$n.json")" 2; done
say R-base-is-rekeyed "$(run node "$REKEY" "$BASE" "$T" "$X/rk-w1.json")" 2
say R-base-is-route "$(run node "$REKEY" "$ROUTE" "$T" "$X/rk-w2.json")" 2
say R-tree-missing "$(run node "$REKEY" "$RAW" "$X/no-such-tree" "$X/rk-t1.json")" 2
say R-tree-emptydir "$(run node "$REKEY" "$RAW" "$X/emptydir" "$X/rk-t2.json")" 2
say R-tree-is-file "$(run node "$REKEY" "$RAW" "$T/package.json" "$X/rk-t3.json")" 2
say R-out-unwritable "$(run node "$REKEY" "$RAW" "$T" "$X/no-such-dir/rk.json")" 2
# ---- browser-select: --root --out, SEQUENCE.json, a step file
say S-ctl "$(run node "$SELECT" --root "$T" --out "$X/sel")" 0
say S-noargs "$(run node "$SELECT")" 2
say S-root-novalue "$(run node "$SELECT" --out "$X/sel1" --root)" 2
say S-root-missing "$(run node "$SELECT" --root "$X/no-such-tree" --out "$X/sel2")" 2
say S-root-emptydir "$(run node "$SELECT" --root "$X/emptydir" --out "$X/sel3")" 2
say S-root-is-file "$(run node "$SELECT" --root "$T/package.json" --out "$X/sel3b")" 2
say S-out-is-file "$(run node "$SELECT" --root "$T" --out "$X/notjson.json")" 2
SEQ="$K/frozen/SEQUENCE.json"
if [ -f "$SEQ" ]; then h=$(sha "$SEQ"); cp "$SEQ" "$X/seq"
  for form in notjson obj arr null nosteps; do
    case $form in notjson) printf '{"steps": [' > "$SEQ";; obj) echo '{}' > "$SEQ";; arr) echo '[]' > "$SEQ";; null) echo 'null' > "$SEQ";;
      nosteps) node -e 'const fs=require("fs");const j=JSON.parse(fs.readFileSync(process.argv[1]));j.steps=[];fs.writeFileSync(process.argv[2],JSON.stringify(j));' "$X/seq" "$SEQ";; esac
    say "S-seq-$form" "$(run node "$SELECT" --root "$T" --out "$X/sel-$form")" 2; restore "$SEQ" "$X/seq" "$h"; done
  STEPF=$(node -e 'const fs=require("fs"),p=require("path");const s=JSON.parse(fs.readFileSync(process.argv[1]));for(const x of s.steps){if(!x.file)continue;const f=p.join(process.argv[2],x.file);try{const j=JSON.parse(fs.readFileSync(f));if(j.moves){console.log(f);break}}catch{}}' "$SEQ" "$K")
  if [ -n "$STEPF" ]; then h=$(sha "$STEPF"); cp "$STEPF" "$X/stepf"; echo "J10 S-step file: ${STEPF#$K/}"
    for form in notjson obj arr null; do
      case $form in notjson) printf '{"moves": [' > "$STEPF";; obj) echo '{}' > "$STEPF";; arr) echo '[]' > "$STEPF";; null) echo 'null' > "$STEPF";; esac
      say "S-step-$form" "$(run node "$SELECT" --root "$T" --out "$X/selst-$form")" 2; restore "$STEPF" "$X/stepf" "$h"; done
  else echo "J10 S-step INFO no step file with moves found"; fi
else F=$((F+1)); echo "J10 S-seq FAIL no frozen/SEQUENCE.json in the kit"; fi
# ---- peer-closure: --root --base --overlay --table
[ -d "$T/dist" ] || { F=$((F+1)); echo "J10 P-SETUP FAIL the tree is not built"; }
say P-ctl "$(run node "$PEER" --root "$T" --base "$PB" --json "$X/peer-clean.json")" 0
say P-noargs "$(run node "$PEER")" 2
say P-root-novalue "$(run node "$PEER" --base "$PB" --root)" 2
say P-root-missing "$(run node "$PEER" --root "$X/no-such-tree" --base "$PB")" 2
say P-root-emptydir "$(run node "$PEER" --root "$X/emptydir" --base "$PB")" 2
say P-root-is-file "$(run node "$PEER" --root "$T/package.json" --base "$PB")" 2
# degenerate --base fixtures (each is also run against the leak below)
node -e 'const fs=require("fs");const [pb,clean,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(pb));const w=(n,j)=>fs.writeFileSync(o+"/"+n,JSON.stringify(j));
const del=(k)=>{const j=JSON.parse(JSON.stringify(B));delete j[k];return j;};
w("pb-floorBase-false.json",{...B,floorBase:false}); w("pb-floorBase-absent.json",del("floorBase")); w("pb-floorBase-string.json",{...B,floorBase:"true"});
w("pb-entries-arr.json",{...B,entries:[]}); w("pb-entries-obj.json",{...B,entries:{}}); w("pb-entries-absent.json",del("entries"));
const ks=Object.keys(B.entries??{}); const drop=ks.includes("./motion-core")?"./motion-core":ks[0]; const e={...B.entries}; delete e[drop]; w("pb-entry-dropped.json",{...B,entries:e});
const e2={...B.entries}; if(e2["./motion-core"]) e2["./motion-core"]={}; w("pb-entry-hollow.json",{...B,entries:e2});
console.log("J10 peer base keys: "+Object.keys(B).join(",")+" entries "+ks.length+" dropped "+drop);' "$PB" "$X/peer-clean.json" "$X"
BASES=(missing:"$X/nope.json" notjson:"$X/notjson.json" obj:"$X/obj.json" arr:"$X/arr.json" null:"$X/null.json" num:"$X/num.json" dir:"$X/adir.json"
  entries-obj:"$X/pb-entries-obj.json" entries-arr:"$X/pb-entries-arr.json" entries-absent:"$X/pb-entries-absent.json" entry-dropped:"$X/pb-entry-dropped.json" entry-hollow:"$X/pb-entry-hollow.json"
  floorBase-false:"$X/pb-floorBase-false.json" floorBase-absent:"$X/pb-floorBase-absent.json" floorBase-string:"$X/pb-floorBase-string.json"
  browser-route:"$ROUTE" browser-base:"$BASE" own-clean-report:"$X/peer-clean.json")
for form in "${BASES[@]}"; do n="${form%%:*}"; f="${form#*:}"; say "P-base-$n" "$(run node "$PEER" --root "$T" --base "$f")" 2; done
say P-base-novalue "$(run node "$PEER" --root "$T" --base)" 2
# --overlay ({} is the declared default overlay: INFO)
for form in missing:"$X/nope.json" notjson:"$X/notjson.json" arr:"$X/arr.json" null:"$X/null.json" num:"$X/num.json" browser-route:"$ROUTE" peer-report:"$X/peer-clean.json"; do
  n="${form%%:*}"; f="${form#*:}"; say "P-overlay-$n" "$(run node "$PEER" --root "$T" --base "$PB" --overlay "$f")" 2; done
say P-overlay-obj "$(run node "$PEER" --root "$T" --base "$PB" --overlay "$X/obj.json")" info
# --table
echo "" > "$X/empty.txt"
for form in missing:"$X/nope.md" empty:"$X/empty.txt" no-table:package.json dir:src; do
  n="${form%%:*}"; f="${form#*:}"; say "P-table-$n" "$(run node "$PEER" --root "$T" --base "$PB" --table "$f")" 2; done
say P-table-novalue "$(run node "$PEER" --root "$T" --base "$PB" --table)" 2
say P-json-unwritable "$(run node "$PEER" --root "$T" --base "$PB" --json "$X/no-such-dir/o.json")" info
# ---- the leak: ./motion-core gains a keyframes.js value import, against every --base form
raf=$(cd "$T" && find src -name useRAFLoop.ts -not -path '*/__tests__/*' | head -1)
if [ -z "$raf" ]; then F=$((F+1)); echo "J10 LEAK FAIL no useRAFLoop.ts on the tree"; else
  h=$(sha "$T/$raf"); cp "$T/$raf" "$X/raf"; printf 'import * as zq10L from "@mkbabb/keyframes.js";\nvoid zq10L;\n' | cat - "$X/raf" > "$T/$raf"
  echo "J10 LEAK planted in $raf"
  say L-ctl-floor-base "$(run node "$PEER" --root "$T" --base "$PB" --json "$X/peer-leak.json")" 1
  echo "J10 L-ctl line: $(grep -m1 'motion-core' "$X/o.log" | cut -c1-200)"
  zero=0
  for form in "${BASES[@]}" own-leak-report:"$X/peer-leak.json"; do n="${form%%:*}"; f="${form#*:}"
    rc=$(run node "$PEER" --root "$T" --base "$f"); [ "$rc" = 0 ] && zero=$((zero+1)); say "L-base-$n" "$rc" 2; done
  rc=$(run node "$PEER" --root "$T"); say L-no-base-INFO "$rc" info; [ "$rc" = 0 ] && zero=$((zero+1))
  if [ $zero = 0 ]; then P=$((P+1)); echo "J10 LEAK-NEVER-0 PASS no degenerate --base read the leak GREEN"; else F=$((F+1)); echo "J10 LEAK-NEVER-0 FAIL $zero runs read the leak GREEN (exit 0)"; fi
  restore "$T/$raf" "$X/raf" "$h"
fi
say P-ctl-again "$(run node "$PEER" --root "$T" --base "$PB")" 0
echo "J10 SUMMARY pass=$P fail=$F"
