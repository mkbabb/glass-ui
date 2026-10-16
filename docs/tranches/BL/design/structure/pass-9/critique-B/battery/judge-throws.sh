#!/usr/bin/env bash
# judge-throws.sh <KIT dir> <built replayed tree> <scratch> · critique-B pass 9 · P8-R2 (a) / S-14 hold text:
# "every kit judge (browser-tally, browser-select, rekey, peer-closure) exits 0/1/2 with the seal.mjs guard, and a
# degenerate input (an empty dist entry, an empty report) throws". Written and hashed BEFORE reading pass-9/B-kit or
# pass-9/B-proto.md, so every expectation below is fixed from REGISTRY §P8-6.4 and RULINGS P8-R2 alone.
#
# Fixtures: the committed pass-8 browser reports (P8B, default pass-8/B-kit/results/p8/browser), which §P8-6.2 (4)
# names as the reports pass 9's tally re-reads. The four tools' CLIs are taken from their pass-8 headers:
#   browser-tally --base B --route R [--base-rerun r]… [--route-rerun r]…   rekey <base> <root> <out>
#   browser-select --root T --out D                                          peer-closure --root T [--base b] [--overlay o]
# A CLI that changed in pass 9 shows as FAIL on the control lines, never silently: every family has a control (expect 0).
#
# Families (expect 2 unless stated):
#   no arguments; a missing input; a non-JSON input; a wrong-schema input (browser-seat/1; a /2 report with no results;
#   `{}` for the peer base); degenerate: an empty route report, an empty base report, an emptied dist/motion-core.js,
#   an emptied dist/index.js; a module-scope throw planted in EVERY kit module each judge loads (relative closure by
#   pass-8 gate-modules.mjs), plus an unhandled rejection in the first module after the tool; the tool's own file
#   planted before its first line is INFO (that is the guard's own file).
#   INFO: an empty rerun report; any OTHER tools/*.mjs whose header declares an exit 2, run with no arguments.
# Every edit is restored byte for byte and checked by sha256. Prints `JT <id> <PASS|FAIL|INFO> rc=<n> expect=<n> :: <line>`.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/jt"; X="$(cd "$S/jt" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"
P8B="${P8B:-$HERE/../../../pass-8/B-kit/results/p8/browser}"
GM="$HERE/../../../pass-8/critique-B/battery/gate-modules.mjs"
TALLY="$K/tools/browser-tally.mjs"; SELECT="$K/tools/browser-select.mjs"; REKEY="$K/tools/rekey.mjs"; PEER="$K/tools/peer-closure.mjs"
BASE="$P8B/base-rekeyed.json"; ROUTE="$P8B/route.json"; RAW="$P8B/base.json"
PEER_BASE="${PEER_BASE:-$(find "$K/results" -name 'peer-closure-base.json' 2>/dev/null | sort | tail -1)}"
P=0; F=0
run() { timeout 600 "$@" >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | tail -1 | cut -c1-220; }
say() { local id="$1" rc="$2" exp="$3"; if [ "$exp" = info ]; then echo "JT $id INFO rc=$rc :: $(last)";
  elif [ "$rc" = "$exp" ]; then P=$((P+1)); echo "JT $id PASS rc=$rc expect=$exp :: $(last)"; else F=$((F+1)); echo "JT $id FAIL rc=$rc expect=$exp :: $(last)"; fi; }
sha() { shasum -a 256 "$1" | cut -c1-16; }
restore() { cp "$2" "$1"; [ "$(sha "$1")" = "$3" ] || { echo "JT RESTORE-FAIL $1"; F=$((F+1)); }; }
# ---- fixtures
printf '{"$schema": "browser-seat/2", "results": [' > "$X/notjson.json"
node -e 'const fs=require("fs");const [r,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(r,"utf8"));
fs.writeFileSync(o+"/schema1.json",JSON.stringify({...j,$schema:"browser-seat/1"}));
fs.writeFileSync(o+"/noresults.json",JSON.stringify({$schema:"browser-seat/2",testDir:j.testDir}));
fs.writeFileSync(o+"/route-empty.json",JSON.stringify({...j,results:[]}));' "$ROUTE" "$X"
node -e 'const fs=require("fs");const [b,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b,"utf8"));
fs.writeFileSync(o+"/base-empty.json",JSON.stringify({...j,results:[]}));' "$BASE" "$X"
node -e 'const fs=require("fs");const [b,o]=process.argv.slice(1);const j=JSON.parse(fs.readFileSync(b,"utf8"));
fs.writeFileSync(o+"/raw-empty.json",JSON.stringify({...j,results:[]}));fs.writeFileSync(o+"/raw-schema1.json",JSON.stringify({...j,$schema:"browser-seat/1"}));' "$RAW" "$X"
echo '{}' > "$X/obj.json"; mkdir -p "$X/emptydir"
RERUNS=(); for f in $(ls "$P8B/reruns" 2>/dev/null | sort); do
  case "$f" in base-*.rekeyed.json) RERUNS+=(--base-rerun "$P8B/reruns/$f");; route-*.json) RERUNS+=(--route-rerun "$P8B/reruns/$f");; esac; done
# ---- browser-tally
say T-ctl "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RERUNS[@]}")" 0
say T-noargs "$(run node "$TALLY")" 2
say T-base-missing "$(run node "$TALLY" --base "$X/nope.json" --route "$ROUTE")" 2
say T-route-missing "$(run node "$TALLY" --base "$BASE" --route "$X/nope.json")" 2
say T-base-notjson "$(run node "$TALLY" --base "$X/notjson.json" --route "$ROUTE")" 2
say T-route-notjson "$(run node "$TALLY" --base "$BASE" --route "$X/notjson.json")" 2
say T-route-schema1 "$(run node "$TALLY" --base "$BASE" --route "$X/schema1.json")" 2
say T-route-noresults "$(run node "$TALLY" --base "$BASE" --route "$X/noresults.json")" 2
say T-route-empty "$(run node "$TALLY" --base "$BASE" --route "$X/route-empty.json")" 2
say T-base-empty "$(run node "$TALLY" --base "$X/base-empty.json" --route "$ROUTE")" 2
say T-rerun-missing "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --route-rerun "$X/nope.json")" 2
say T-rerun-notjson "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --route-rerun "$X/notjson.json")" 2
say T-rerun-empty "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RERUNS[@]}" --route-rerun "$X/route-empty.json")" info
# ---- rekey
say R-ctl "$(run node "$REKEY" "$RAW" "$T" "$X/rekeyed.json")" 0
if [ -f "$X/rekeyed.json" ]; then node -e 'const fs=require("fs");const a=JSON.parse(fs.readFileSync(process.argv[1]));const b=JSON.parse(fs.readFileSync(process.argv[2]));
const k=(r)=>r.results.map(x=>x.spec+" :: "+x.title+" :: "+x.status).sort().join("\n");console.log("JT R-ctl-equals-committed "+(k(a)===k(b)?"INFO same (spec,title,status) multiset as the committed base-rekeyed.json":"INFO DIFFERS from the committed base-rekeyed.json")+" results "+a.results.length+"/"+b.results.length);' "$X/rekeyed.json" "$BASE"; fi
say R-noargs "$(run node "$REKEY")" 2
say R-base-missing "$(run node "$REKEY" "$X/nope.json" "$T" "$X/r1.json")" 2
say R-base-notjson "$(run node "$REKEY" "$X/notjson.json" "$T" "$X/r2.json")" 2
say R-base-schema1 "$(run node "$REKEY" "$X/raw-schema1.json" "$T" "$X/r3.json")" 2
say R-base-empty "$(run node "$REKEY" "$X/raw-empty.json" "$T" "$X/r4.json")" 2
say R-root-missing "$(run node "$REKEY" "$RAW" "$X/no-such-tree" "$X/r5.json")" 2
# ---- browser-select
say S-ctl "$(run node "$SELECT" --root "$T" --out "$X/sel")" 0
say S-noargs "$(run node "$SELECT")" 2
say S-root-missing "$(run node "$SELECT" --root "$X/no-such-tree" --out "$X/sel2")" 2
say S-root-not-a-tree "$(run node "$SELECT" --root "$X/emptydir" --out "$X/sel3")" 2
SEQ=$(find "$K" -name SEQUENCE.json -not -path '*/results/*' | head -1)
if [ -n "$SEQ" ]; then h=$(sha "$SEQ"); cp "$SEQ" "$X/seq"; printf '{"steps": [' > "$SEQ"
  say S-seq-notjson "$(run node "$SELECT" --root "$T" --out "$X/sel4")" 2; restore "$SEQ" "$X/seq" "$h"
  echo '{}' > "$SEQ"; say S-seq-schema "$(run node "$SELECT" --root "$T" --out "$X/sel5")" 2; restore "$SEQ" "$X/seq" "$h"
else echo "JT S-seq INFO no SEQUENCE.json in the kit"; fi
# ---- peer-closure (the tree must be built)
PB=(); [ -n "$PEER_BASE" ] && PB=(--base "$PEER_BASE")
[ -d "$T/dist" ] || echo "JT P-SETUP FAIL the tree is not built"
say P-ctl "$(run node "$PEER" --root "$T" "${PB[@]}")" 0
say P-noargs "$(run node "$PEER")" 2
say P-root-missing "$(run node "$PEER" --root "$X/no-such-tree")" 2
say P-base-missing "$(run node "$PEER" --root "$T" --base "$X/nope.json")" 2
say P-base-notjson "$(run node "$PEER" --root "$T" --base "$X/notjson.json")" 2
say P-base-schema "$(run node "$PEER" --root "$T" --base "$X/obj.json")" 2
say P-overlay-notjson "$(run node "$PEER" --root "$T" "${PB[@]}" --overlay "$X/notjson.json")" 2
for e in motion-core index; do
  js=$(ls "$T/dist" 2>/dev/null | grep -E "^$e\.(m?js)$" | head -1)
  if [ -n "$js" ]; then h=$(sha "$T/dist/$js"); cp "$T/dist/$js" "$X/entry"; : > "$T/dist/$js"
    say "P-empty-entry:$js" "$(run node "$PEER" --root "$T" "${PB[@]}")" 2; restore "$T/dist/$js" "$X/entry" "$h"
  else echo "JT P-empty-entry:$e INFO no dist/$e.js"; fi
done
say P-ctl-again "$(run node "$PEER" --root "$T" "${PB[@]}")" 0
# ---- module-scope throws in every kit module each judge loads
ctl_args() { case "$1" in
  browser-tally) echo "--base $BASE --route $ROUTE";; rekey) echo "$RAW $T $X/rk.json";;
  browser-select) echo "--root $T --out $X/selm";; peer-closure) echo "--root $T ${PB[*]}";; esac; }
for tool in browser-tally browser-select rekey peer-closure; do
  i=0; mods=$(node "$GM" "$K" "tools/$tool.mjs")
  for m in $mods; do i=$((i+1)); f="$K/$m"; hm=$(sha "$f"); cp "$f" "$X/mod"
    node -e 'const fs=require("fs");const f=process.argv[1];let t=fs.readFileSync(f,"utf8");let sb="";if(t.startsWith("#!")){const n=t.indexOf("\n");sb=t.slice(0,n+1);t=t.slice(n+1);}fs.writeFileSync(f,sb+"throw new Error(\"zq9 module-scope throw in "+f+"\");\n"+t);' "$f"
    if [ "$m" = "tools/$tool.mjs" ]; then say "M-$tool.$i:$m" "$(run node "$K/tools/$tool.mjs" $(ctl_args $tool))" info
    else say "M-$tool.$i:$m" "$(run node "$K/tools/$tool.mjs" $(ctl_args $tool))" 2; fi
    restore "$f" "$X/mod" "$hm"
  done
  echo "JT M-$tool modules planted: $i"
  m2=$(echo "$mods" | sed -n 2p)
  if [ -n "$m2" ]; then f="$K/$m2"; hm=$(sha "$f"); cp "$f" "$X/mod2"
    node -e 'const fs=require("fs");const f=process.argv[1];fs.writeFileSync(f,fs.readFileSync(f,"utf8")+"\nPromise.reject(new Error(\"zq9 unhandled rejection in "+f+"\"));\n");' "$f"
    say "MR-$tool:$m2" "$(run node "$K/tools/$tool.mjs" $(ctl_args $tool))" 2; restore "$f" "$X/mod2" "$hm"; fi
done
# ---- every other kit tool declaring exit 2 in its header, run with no arguments (INFO)
for f in $(ls "$K/tools"/*.mjs | sort); do b=$(basename "$f" .mjs)
  case "$b" in browser-tally|browser-select|rekey|peer-closure) continue;; esac
  head -40 "$f" | grep -qiE 'exit.*\b2\b' || continue
  say "OTHER-noargs:$b" "$(run node "$f")" info
done
echo "JT SUMMARY pass=$P fail=$F"
