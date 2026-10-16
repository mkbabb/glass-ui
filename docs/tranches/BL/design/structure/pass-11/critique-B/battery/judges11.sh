#!/usr/bin/env bash
# judges11.sh <KIT dir> <built replayed tree> <scratch> · critique-B pass 11 · written and hashed BEFORE reading
# pass-11/B-kit or pass-11/B-proto.md. Expectations are fixed from REGISTRY §P10-6.4's battery list:
#   "for every input argument of every kit judge: missing, non-JSON, wrong-schema, and every committed report kind in
#    every slot: the base run, a re-keyed base, a route run, a base rerun (raw and re-keyed), a route rerun (with
#    baseReport: null), a probe report; each wrong one exits 2";
#   "F6 as a hashed row: a route with one base-green test failing, read through every wrong-kind --base, --base-rerun
#    and rekey path, never 0";
#   "every value-taking flag of every judge present with no value, and followed by another flag: each exits 2";
# and S-14's hold (§P10-7): "no judge reads a malformed input as an all-clear"; P6-R3/P8-R2: 0 GREEN, 1 RED, 2 no verdict.
# Pass 10's critic's judges10.sh (missing, non-JSON, {}, [], schema forms, the leak) runs by path in run11.sh; this file
# adds the KIND MATRIX, F6, the FLAG matrix and duplicates.
#
# Kinds (the committed browser reports, pass 11's when the kit commits its own, else pass 10's; every kind is listed
# with the file it came from):
#   raw-base (testDir tests-visual), rekeyed-base (rekeyedFrom), route (route run), raw-base-rerun, rekeyed-base-rerun,
#   route-rerun (baseReport null), steps-raw-base / steps-rekeyed-base / steps-route (the touched-spec pair, when
#   committed), probe-floor (peer-closure floor-base report), probe-clean (the probe's own report on the clean tree),
#   selection, moved, plan (other committed browser-seat JSON), seal (the tree gate's --json report), sequence (the kit's
#   frozen/SEQUENCE.json).
# Right kinds per slot (everything else in the slot expects 2):
#   tally --base           rekeyed-base           (INFO alternates: rekeyed-base-rerun, steps-rekeyed-base)
#   tally --route          route                  (INFO alternates: route-rerun, steps-route)
#   tally --base-rerun     rekeyed-base-rerun     (INFO alternates: rekeyed-base, steps-rekeyed-base)
#   tally --route-rerun    route-rerun            (INFO alternates: route, steps-route)
#   rekey <base>           raw-base               (INFO alternates: raw-base-rerun, steps-raw-base)
#   peer --base            probe-floor
#   peer --overlay         none of these kinds (an overlay is a plant file, not a report)
#   select's SEQUENCE.json none of these kinds (replaced in place, restored by sha256)
# Prints `J11 <id> <PASS|FAIL|INFO> rc=<n> expect=<n> :: <last line>` and `J11 SUMMARY pass=<n> fail=<n>`.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/j11"; X="$(cd "$S/j11" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."
TALLY="$K/tools/browser-tally.mjs"; SELECT="$K/tools/browser-select.mjs"; REKEY="$K/tools/rekey.mjs"; PEER="$K/tools/peer-closure.mjs"
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' 2>/dev/null | sort | tail -1)")}"
[ -f "$BR/route.json" ] || BR="$ST/pass-10/B-kit/results/p10/browser"
PB="${PEER_BASE:-$(find "$K/results" -name 'peer-closure-base.json' 2>/dev/null | sort | tail -1)}"
STEPS=$(ls -d "$BR"/p1*-steps 2>/dev/null | sort | tail -1)
echo "J11 fixtures: browser ${BR#$ST/}; steps ${STEPS#$ST/}; peer base ${PB#$ST/}"
P=0; F=0
run() { (cd "$X" && timeout 600 "$@") >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | tail -1 | cut -c1-220; }
say() { local id="$1" rc="$2" exp="$3"; if [ "$exp" = info ]; then echo "J11 $id INFO rc=$rc :: $(last)";
  elif [ "$exp" = never0 ]; then if [ "$rc" != 0 ]; then P=$((P+1)); echo "J11 $id PASS rc=$rc expect=never-0 :: $(last)"; else F=$((F+1)); echo "J11 $id FAIL rc=$rc expect=never-0 :: $(last)"; fi
  elif [ "$rc" = "$exp" ]; then P=$((P+1)); echo "J11 $id PASS rc=$rc expect=$exp :: $(last)"; else F=$((F+1)); echo "J11 $id FAIL rc=$rc expect=$exp :: $(last)"; fi; }
sha() { shasum -a 256 "$1" | cut -c1-16; }
restore() { cp "$2" "$1"; [ "$(sha "$1")" = "$3" ] || { echo "J11 RESTORE-FAIL $1"; F=$((F+1)); }; }
first() { ls "$BR/reruns" 2>/dev/null | sort | grep -E "$1" | head -1 | sed "s#^#$BR/reruns/#"; }
# ---- the kinds
declare -a KINDS=()
addk() { if [ -n "$2" ] && [ -f "$2" ]; then KINDS+=("$1:$2"); echo "J11 kind $1 = ${2#$ST/} :: $(node -e 'try{const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log("schema "+(j.$schema??"-")+" testDir "+(j.testDir??"-")+" rekeyedFrom "+(j.rekeyedFrom?"yes":"no")+" baseReport "+(j.baseReport===null?"null":j.baseReport?"set":"absent")+" results "+(Array.isArray(j.results)?j.results.length:"-"))}catch(e){console.log("not JSON")}' "$2")"; else echo "J11 kind $1 INFO not committed"; fi; }
addk raw-base "$BR/base.json"; addk rekeyed-base "$BR/base-rekeyed.json"; addk route "$BR/route.json"
addk raw-base-rerun "$(first '^base-[0-9-]+\.json$')"; addk rekeyed-base-rerun "$(first '^base-.*\.rekeyed\.json$')"; addk route-rerun "$(first '^route-.*\.json$')"
[ -n "$STEPS" ] && { addk steps-raw-base "$STEPS/base.json"; addk steps-rekeyed-base "$STEPS/base.rekeyed.json"; addk steps-route "$STEPS/route.json"; }
addk probe-floor "$PB"
(cd "$X" && node "$PEER" --root "$T" --base "$PB" --json "$X/probe-clean.json") > /dev/null 2>&1; addk probe-clean "$X/probe-clean.json"
addk selection "$BR/selection.json"; addk moved "$BR/moved.json"; addk plan "$BR/reruns/plan.json"
(cd "$T" && node scripts/structure/seal/seal.mjs --root "$T" --json "$X/seal.json") > /dev/null 2>&1; addk seal "$X/seal.json"
cp "$K/frozen/SEQUENCE.json" "$X/sequence.json" 2>/dev/null; addk sequence "$X/sequence.json"
kp() { for k in "${KINDS[@]}"; do [ "${k%%:*}" = "$1" ] && { echo "${k#*:}"; return; }; done; echo ""; }
BASE=$(kp rekeyed-base); ROUTE=$(kp route); RAW=$(kp raw-base); BRR=$(kp rekeyed-base-rerun); RRR=$(kp route-rerun); RAWR=$(kp raw-base-rerun)
# the full rerun argument set, as the kit's browser bar reads it
RB=(); for f in $(ls "$BR/reruns" 2>/dev/null | sort); do case "$f" in base-*.rekeyed.json) RB+=(--base-rerun "$BR/reruns/$f");; route-*.json) RB+=(--route-rerun "$BR/reruns/$f");; esac; done
say T-ctl "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}")" 0
say T-ctl-min "$(run node "$TALLY" --base "$BASE" --route "$ROUTE")" 0
# ---- KIND MATRIX
slot() { # <slot id> <right kind> <info alternates, comma list> <command prefix…> -- the fixture goes last
  local id="$1" right="$2" alts=",$3,"; shift 3
  for k in "${KINDS[@]}"; do local n="${k%%:*}" f="${k#*:}"
    if [ "$n" = "$right" ]; then say "KM-$id-$n" "$(run "$@" "$f")" 0
    elif [[ "$alts" == *",$n,"* ]]; then say "KM-$id-$n" "$(run "$@" "$f")" info
    else say "KM-$id-$n" "$(run "$@" "$f")" 2; fi; done; }
slot tally-base rekeyed-base "rekeyed-base-rerun,steps-rekeyed-base" node "$TALLY" --route "$ROUTE" --base
slot tally-route route "route-rerun,steps-route" node "$TALLY" --base "$BASE" --route
slot tally-base-rerun rekeyed-base-rerun "rekeyed-base,steps-rekeyed-base" node "$TALLY" --base "$BASE" --route "$ROUTE" --base-rerun
slot tally-route-rerun route-rerun "route,steps-route" node "$TALLY" --base "$BASE" --route "$ROUTE" --route-rerun
for k in "${KINDS[@]}"; do n="${k%%:*}"; f="${k#*:}"
  case "$n" in raw-base) e=0;; raw-base-rerun|steps-raw-base) e=info;; *) e=2;; esac
  say "KM-rekey-base-$n" "$(run node "$REKEY" "$f" "$T" "$X/rk-$n.json")" "$e"; done
for k in "${KINDS[@]}"; do n="${k%%:*}"; f="${k#*:}"; e=2; [ "$n" = probe-floor ] && e=0
  say "KM-peer-base-$n" "$(run node "$PEER" --root "$T" --base "$f")" "$e"; done
for k in "${KINDS[@]}"; do n="${k%%:*}"; f="${k#*:}"; say "KM-peer-overlay-$n" "$(run node "$PEER" --root "$T" --base "$PB" --overlay "$f")" 2; done
SEQ="$K/frozen/SEQUENCE.json"; if [ -f "$SEQ" ]; then h=$(sha "$SEQ"); cp "$SEQ" "$X/seq.keep"
  for k in "${KINDS[@]}"; do n="${k%%:*}"; f="${k#*:}"; [ "$n" = sequence ] && continue; cp "$f" "$SEQ"
    say "KM-select-seq-$n" "$(run node "$SELECT" --root "$T" --out "$X/sel-$n")" 2; restore "$SEQ" "$X/seq.keep" "$h"; done
  say KM-select-ctl "$(run node "$SELECT" --root "$T" --out "$X/sel-ctl")" 0
else F=$((F+1)); echo "J11 KM-select FAIL no frozen/SEQUENCE.json"; fi
# ---- F6: a route with one base-green key failing, through every wrong-kind path; never 0
node -e 'const fs=require("fs");const [b,r,rr,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(b));
const green=new Set(B.results.filter(x=>x.status==="expected").map(x=>x.spec+" :: "+x.title));
const flip=(f,out)=>{if(!f)return "none";const R=JSON.parse(fs.readFileSync(f));const i=R.results.findIndex(x=>x.status==="expected"&&green.has(x.spec+" :: "+x.title));if(i<0)return "no base-green key";R.results[i].status="unexpected";fs.writeFileSync(out,JSON.stringify(R));return R.results[i].spec+" :: "+R.results[i].title.slice(0,70);};
console.log("J11 F6 route flipped: "+flip(r,o+"/route-fail.json"));console.log("J11 F6 route rerun flipped: "+flip(rr,o+"/route-rerun-fail.json"));' "$BASE" "$ROUTE" "$RRR" "$X"
FR="$X/route-fail.json"; FRR="$X/route-rerun-fail.json"
say F6-ctl "$(run node "$TALLY" --base "$BASE" --route "$FR")" 1
say F6-ctl-rr "$(run node "$TALLY" --base "$BASE" --route "$FR" "${RB[@]}")" 1
say F6-base-is-failroute "$(run node "$TALLY" --base "$FR" --route "$FR")" never0
say F6-base-is-route "$(run node "$TALLY" --base "$ROUTE" --route "$FR")" never0
say F6-base-is-route-rerun "$(run node "$TALLY" --base "$RRR" --route "$FR")" never0
say F6-base-is-raw "$(run node "$TALLY" --base "$RAW" --route "$FR")" never0
[ -n "$STEPS" ] && say F6-base-is-steps-route "$(run node "$TALLY" --base "$STEPS/route.json" --route "$FR")" never0
say F6-baserr-is-failroute "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$FR")" never0
say F6-baserr-is-route "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$ROUTE")" never0
say F6-baserr-is-route-rerun "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$RRR")" never0
[ -f "$FRR" ] && say F6-baserr-is-failrouterr "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$FRR")" never0
say F6-baserr-is-raw-rerun "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$RAWR")" never0
say F6-routerr-is-base "$(run node "$TALLY" --base "$BASE" --route "$FR" --route-rerun "$BASE")" never0
say F6-routerr-is-base-rerun "$(run node "$TALLY" --base "$BASE" --route "$FR" --route-rerun "$BRR")" never0
for src in failroute:"$FR" route:"$ROUTE" route-rerun:"$RRR" failrouterr:"$FRR" rekeyed-base:"$BASE"; do n="${src%%:*}"; f="${src#*:}"; [ -f "$f" ] || continue
  rc=$(run node "$REKEY" "$f" "$T" "$X/rk-f6-$n.json"); say "F6-rekey-$n" "$rc" 2
  if [ "$rc" = 0 ]; then say "F6-rekeyed-$n-as-base" "$(run node "$TALLY" --base "$X/rk-f6-$n.json" --route "$FR")" never0
    say "F6-rekeyed-$n-as-baserr" "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$X/rk-f6-$n.json")" never0; fi; done
# duplicates of a single-valued flag: the second value must not silently win or lose
say F6-dup-route-fail-last "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --route "$FR")" never0
say F6-dup-route-fail-first "$(run node "$TALLY" --base "$BASE" --route "$FR" --route "$ROUTE")" never0
say F6-dup-base "$(run node "$TALLY" --base "$FR" --base "$BASE" --route "$FR")" never0
say DUP-route-INFO "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --route "$FR")" info
say DUP-peer-base-INFO "$(run node "$PEER" --root "$T" --base "$PB" --base "$X/probe-clean.json")" info
# ---- FLAG MATRIX: every value-taking flag, last on the line and followed by another flag
say FL-tally-base-last "$(run node "$TALLY" --route "$ROUTE" --base)" 2
say FL-tally-base-flag "$(run node "$TALLY" --base --route "$ROUTE")" 2
say FL-tally-route-last "$(run node "$TALLY" --base "$BASE" --route)" 2
say FL-tally-route-flag "$(run node "$TALLY" --route --base "$BASE")" 2
say FL-tally-baserr-last "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --base-rerun)" 2
say FL-tally-baserr-flag "$(run node "$TALLY" --base "$BASE" --base-rerun --route "$ROUTE")" 2
say FL-tally-routerr-last "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" --route-rerun)" 2
say FL-tally-routerr-flag "$(run node "$TALLY" --base "$BASE" --route-rerun --route "$ROUTE")" 2
say FL-tally-baserr-flag-fail "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun --route-rerun "$RRR")" 2
say FL-select-root-last "$(run node "$SELECT" --out "$X/fs1" --root)" 2
say FL-select-root-flag "$(run node "$SELECT" --root --out "$X/fs2")" 2
say FL-select-out-last "$(run node "$SELECT" --root "$T" --out)" 2
say FL-select-out-flag "$(run node "$SELECT" --out --root "$T")" 2
say FL-peer-root-last "$(run node "$PEER" --base "$PB" --root)" 2
say FL-peer-root-flag "$(run node "$PEER" --root --base "$PB")" 2
say FL-peer-base-last "$(run node "$PEER" --root "$T" --base)" 2
say FL-peer-base-flag "$(run node "$PEER" --root "$T" --base --json "$X/fp1.json")" 2
say FL-peer-overlay-last "$(run node "$PEER" --root "$T" --base "$PB" --overlay)" 2
say FL-peer-overlay-flag "$(run node "$PEER" --root "$T" --overlay --base "$PB")" 2
say FL-peer-table-last "$(run node "$PEER" --root "$T" --base "$PB" --table)" 2
say FL-peer-table-flag "$(run node "$PEER" --root "$T" --table --base "$PB")" 2
say FL-peer-json-last "$(run node "$PEER" --root "$T" --base "$PB" --json)" 2
say FL-peer-json-flag "$(run node "$PEER" --root "$T" --json --base "$PB")" 2
[ -e "$X/--base" ] && { F=$((F+1)); echo "J11 FL-peer-json-flag FAIL a file named --base was written"; }
# every other flag a judge source names (INFO: a boolean flag is legitimately bare; adjudicated against the route's list)
for tool in "$TALLY" "$SELECT" "$REKEY" "$PEER"; do tn=$(basename "$tool" .mjs)
  for fl in $(grep -oE '"--[a-z][a-z-]*"' "$tool" | tr -d '"' | sort -u); do
    case "$tn:$fl" in browser-tally:--base|browser-tally:--route|browser-tally:--base-rerun|browser-tally:--route-rerun|browser-select:--root|browser-select:--out|peer-closure:--root|peer-closure:--base|peer-closure:--overlay|peer-closure:--table|peer-closure:--json) continue;; esac
    case "$tn" in browser-tally) c=(node "$TALLY" --base "$BASE" --route "$ROUTE");; browser-select) c=(node "$SELECT" --root "$T" --out "$X/fx-$fl");; rekey) c=(node "$REKEY" "$RAW" "$T" "$X/rk-fx.json");; peer-closure) c=(node "$PEER" --root "$T" --base "$PB");; esac
    say "FLX-$tn$fl-last-INFO" "$(run "${c[@]}" "$fl")" info; done; done
echo "J11 SUMMARY pass=$P fail=$F"
