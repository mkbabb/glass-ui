#!/usr/bin/env bash
# judges13.sh <KIT dir (the worktree's copy)> <built replayed tree> <scratch> · critique-B pass 13 · written and hashed
# BEFORE reading pass-13/B-kit or pass-13/B-proto.md. Expectations are fixed from REGISTRY §P12-6.4's battery list (the
# floor), S-14's hold (§P12-7), P11-R1 (a), P7-R2 and P6-R3/P8-R2 (0 GREEN, 1 RED, 2 no verdict). This seat's own plants;
# pass 12's judges12.sh runs separately by path as a regression. Where judges12 chose the FIRST eligible key or spec,
# this file chooses the LAST (and DEL deletes EVERY base-origin spec, one at a time), so the two batteries do not share
# a plant.
#   KIND x SLOT: every committed browser-seat/2 report, DISCOVERED under the kit's committed browser dir, in --base,
#     --route, --base-rerun, --route-rerun and rekey's <base>:
#       --base X --route ROUTE RB      base-rekeyed.json 0; every other report 2 (and 2 without RB)
#       --base BASE --route X RB       route.json 0; other route-kind reports never 0; rk/raw 2
#       --base-rerun X                 rk PARTIAL 0; rk FULL info; raw/rt 2
#       --route-rerun X                rt PARTIAL 0; rt FULL info; rk/raw 2
#       rekey X <tree> <out>           raw 0; rk/rt 2
#   F6' (FR = the full route with the LAST base-green key whose spec no other report holds flipped to "unexpected"):
#       through every row above, never 0; base-rekeyed.json in --base reads 1; the seat's re-key of base.json reads 1
#   F7: every committed re-keyed base rerun and every touched-spec re-keyed base in --base against FR, with and
#       without RB: 2
#   PAIR: each touched-spec pair on its own a verdict (0|1); F6' analogue (LAST base-green key of the pair) 1
#   DELALL: the full re-keyed base with EVERY result of one base-origin spec deleted, one spec at a time over EVERY spec
#       of base-rekeyed.json, against the full route with RB: 2 each (P11-R1 (a): spec grain is a throw)
# Prints `J13 <id> <PASS|FAIL|INFO> rc=<n> expect=<…> :: <last line>` and `J13 SUMMARY pass=<n> fail=<n>`.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/j13"; X="$(cd "$S/j13" && pwd)"
TALLY="$K/tools/browser-tally.mjs"; REKEY="$K/tools/rekey.mjs"
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' 2>/dev/null | sort | tail -1)")}"
[ -f "$BR/route.json" ] || { echo "J13 FATAL no committed browser dir with route.json under the kit's results"; echo "J13 SUMMARY pass=0 fail=1"; exit 0; }
echo "J13 start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg); browser dir ${BR#$K/}"
P=0; F=0
run() { (cd "$X" && timeout 600 "$@") >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | grep -E 'verdict|no verdict|base-green|Error|error' | tail -1 | cut -c1-220; }
say() { local id="$1" rc="$2" exp="$3"
  case "$exp" in
    info) echo "J13 $id INFO rc=$rc :: $(last)";;
    never0) if [ "$rc" != 0 ]; then P=$((P+1)); echo "J13 $id PASS rc=$rc expect=never-0 :: $(last)"; else F=$((F+1)); echo "J13 $id FAIL rc=$rc expect=never-0 :: $(last)"; fi;;
    verdict) if [ "$rc" = 0 ] || [ "$rc" = 1 ]; then P=$((P+1)); echo "J13 $id PASS rc=$rc expect=verdict :: $(last)"; else F=$((F+1)); echo "J13 $id FAIL rc=$rc expect=verdict :: $(last)"; fi;;
    *) if [ "$rc" = "$exp" ]; then P=$((P+1)); echo "J13 $id PASS rc=$rc expect=$exp :: $(last)"; else F=$((F+1)); echo "J13 $id FAIL rc=$rc expect=$exp :: $(last)"; fi;;
  esac; }
declare -a REP=()
while IFS= read -r f; do
  c=$(node -e 'try{const j=JSON.parse(require("fs").readFileSync(process.argv[1]));if(j.$schema!=="browser-seat/2"){console.log("-");process.exit(0)}const rk=j.rekeyedFrom!==undefined&&j.rekeyedFrom!==null;console.log(rk?"rk":j.testDir==="."?"rt":"raw")}catch(e){console.log("-")}' "$f")
  [ "$c" = "-" ] && continue
  n="${f#$BR/}"; case "$n" in base.json|base-rekeyed.json|route.json) e=FULL;; *) e=PARTIAL;; esac
  REP+=("$n|$c|$e|$f"); echo "J13 report $n class=$c extent=$e"
done < <(find "$BR" -name '*.json' | sort)
echo "J13 reports discovered: ${#REP[@]}"
BASE="$BR/base-rekeyed.json"; ROUTE="$BR/route.json"
RB=(); for f in $(ls "$BR/reruns" 2>/dev/null | sort); do case "$f" in base-*.rekeyed.json) RB+=(--base-rerun "$BR/reruns/$f");; route-*.json) RB+=(--route-rerun "$BR/reruns/$f");; esac; done
echo "J13 committed reruns in the bar: $(( ${#RB[@]} / 2 ))"
say CTL "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}")" 0
# F6': the LAST eligible key
node -e 'const fs=require("fs");const [br,o]=process.argv.slice(1);const rd=f=>JSON.parse(fs.readFileSync(f));
const B=rd(br+"/base-rekeyed.json"),R=rd(br+"/route.json");const others=[];
const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=d+"/"+e.name;if(e.isDirectory())walk(p);else if(p.endsWith(".json")&&!/^\/(base|base-rekeyed|route)\.json$/.test(p.slice(br.length))){try{const j=rd(p);if(j.$schema==="browser-seat/2")others.push(j)}catch{}}}};walk(br);
const busy=new Set(others.flatMap(j=>j.results.map(x=>x.spec)));const green=new Set(B.results.filter(x=>x.status==="expected").map(x=>x.spec+" :: "+x.title));
let i=-1;for(let k=R.results.length-1;k>=0;k--){const x=R.results[k];if(x.status==="expected"&&green.has(x.spec+" :: "+x.title)&&!busy.has(x.spec)){i=k;break}}
if(i<0){console.log("J13 F6 NO-KEY");process.exit(0)}R.results[i].status="unexpected";fs.writeFileSync(o+"/route-fail.json",JSON.stringify(R));
fs.writeFileSync(o+"/f6.json",JSON.stringify({spec:R.results[i].spec,title:R.results[i].title}));console.log("J13 F6 flipped (last eligible): "+R.results[i].spec+" :: "+R.results[i].title.slice(0,80))' "$BR" "$X"
FR="$X/route-fail.json"
say F6-ctl "$(run node "$TALLY" --base "$BASE" --route "$FR")" 1
say F6-ctl-RB "$(run node "$TALLY" --base "$BASE" --route "$FR" "${RB[@]}")" 1
Z0=0
for r in "${REP[@]}"; do IFS='|' read -r n c e f <<< "$r"; id="${n//\//:}"
  if [ "$n" = base-rekeyed.json ]; then say "KM-base-$id-RB" "$(run node "$TALLY" --base "$f" --route "$ROUTE" "${RB[@]}")" 0
    say "F6-base-$id-RB" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" 1
  else rc=$(run node "$TALLY" --base "$f" --route "$ROUTE"); [ "$rc" = 0 ] && Z0=$((Z0+1)); say "KM-base-$id" "$rc" 2
    rc=$(run node "$TALLY" --base "$f" --route "$ROUTE" "${RB[@]}"); [ "$rc" = 0 ] && Z0=$((Z0+1)); say "KM-base-$id-RB" "$rc" 2
    say "F6-base-$id" "$(run node "$TALLY" --base "$f" --route "$FR")" never0
    say "F6-base-$id-RB" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" never0; fi
  if [ "$n" = route.json ]; then say "KM-route-$id" "$(run node "$TALLY" --base "$BASE" --route "$f" "${RB[@]}")" 0
  elif [ "$c" = rt ]; then say "KM-route-$id" "$(run node "$TALLY" --base "$BASE" --route "$f" "${RB[@]}")" never0
  else say "KM-route-$id" "$(run node "$TALLY" --base "$BASE" --route "$f" "${RB[@]}")" 2; fi
  if [ "$c" = rk ] && [ "$e" = PARTIAL ]; then exp=0; elif [ "$c" = rk ]; then exp=info; else exp=2; fi
  say "KM-baserr-$id" "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}" --base-rerun "$f")" "$exp"
  say "F6-baserr-$id" "$(run node "$TALLY" --base "$BASE" --route "$FR" "${RB[@]}" --base-rerun "$f")" never0
  if [ "$c" = rt ] && [ "$e" = PARTIAL ]; then exp=0; elif [ "$c" = rt ]; then exp=info; else exp=2; fi
  say "KM-routerr-$id" "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}" --route-rerun "$f")" "$exp"
  say "F6-routerr-$id" "$(run node "$TALLY" --base "$BASE" --route "$FR" --route-rerun "$f")" never0
  [ "$c" = raw ] && exp=0 || exp=2
  rm -f "$X/rk.json"; rc=$(run node "$REKEY" "$f" "$T" "$X/rk.json"); say "KM-rekey-$id" "$rc" "$exp"
  if [ "$rc" = 0 ] && [ -f "$X/rk.json" ]; then
    if [ "$n" = base.json ]; then say "F6-rekeyed-$id-as-base" "$(run node "$TALLY" --base "$X/rk.json" --route "$FR" "${RB[@]}")" 1
    else say "F6-rekeyed-$id-as-base" "$(run node "$TALLY" --base "$X/rk.json" --route "$FR" "${RB[@]}")" never0; fi
    say "F6-rekeyed-$id-as-baserr" "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$X/rk.json")" never0; fi
done
[ "$Z0" = 0 ] && { P=$((P+1)); echo "J13 ZERO PASS no report other than base-rekeyed.json read 0 in --base"; } || { F=$((F+1)); echo "J13 ZERO FAIL $Z0 rows read 0 in --base"; }
for f in $(ls "$BR/reruns" 2>/dev/null | grep -E '^base-.*\.rekeyed\.json$' | sort | sed "s#^#$BR/reruns/#") $(ls -d "$BR"/p1*-steps 2>/dev/null | sort | sed 's#$#/base.rekeyed.json#'); do
  [ -f "$f" ] || continue; n="${f#$BR/}"
  say "F7-${n//\//:}" "$(run node "$TALLY" --base "$f" --route "$FR")" 2
  say "F7-${n//\//:}-RB" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" 2; done
for d in $(ls -d "$BR"/p1*-steps 2>/dev/null | sort); do n=$(basename "$d")
  say "PAIR-$n" "$(run node "$TALLY" --base "$d/base.rekeyed.json" --route "$d/route.json")" verdict
  node -e 'const fs=require("fs");const [b,r,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(b));const g=new Set(B.results.filter(x=>x.status==="expected").map(x=>x.spec+" :: "+x.title));const R=JSON.parse(fs.readFileSync(r));let i=-1;for(let k=R.results.length-1;k>=0;k--){const x=R.results[k];if(x.status==="expected"&&g.has(x.spec+" :: "+x.title)){i=k;break}}if(i<0){console.log("none");process.exit(0)}R.results[i].status="unexpected";fs.writeFileSync(o,JSON.stringify(R));console.log(R.results[i].spec+" :: "+R.results[i].title.slice(0,60))' "$d/base.rekeyed.json" "$d/route.json" "$X/pair-$n-fail.json" > "$X/pair.txt"
  echo "J13 PAIR-F6-$n flipped (last): $(cat "$X/pair.txt")"
  [ -f "$X/pair-$n-fail.json" ] && say "PAIR-F6-$n" "$(run node "$TALLY" --base "$d/base.rekeyed.json" --route "$X/pair-$n-fail.json")" 1 || { F=$((F+1)); echo "J13 PAIR-F6-$n FAIL no base-green key"; }
done
# DELALL: every spec of the full re-keyed base, one at a time
node -e 'const fs=require("fs");const [br,x]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(br+"/base-rekeyed.json"));const specs=[...new Set(B.results.map(r=>r.spec))].sort();fs.mkdirSync(x+"/del",{recursive:true});specs.forEach((s,i)=>{const o=structuredClone(B);o.results=o.results.filter(r=>r.spec!==s);fs.writeFileSync(x+"/del/"+String(i).padStart(3,"0")+".json",JSON.stringify(o));fs.appendFileSync(x+"/del/INDEX.txt",String(i).padStart(3,"0")+"\t"+s+"\n")});console.log("J13 DELALL specs in base-rekeyed.json: "+specs.length)' "$BR" "$X"
D2=0; DN=0
for f in $(ls "$X"/del/*.json | sort); do DN=$((DN+1)); i=$(basename "$f" .json); rc=$(run node "$TALLY" --base "$f" --route "$ROUTE" "${RB[@]}")
  if [ "$rc" = 2 ]; then D2=$((D2+1)); else echo "J13 DELALL-$i FAIL rc=$rc spec=$(grep "^$i" "$X/del/INDEX.txt" | cut -f2) :: $(last)"; fi; done
[ "$D2" = "$DN" ] && { P=$((P+1)); echo "J13 DELALL PASS $D2/$DN one-spec-deleted bases exit 2"; } || { F=$((F+1)); echo "J13 DELALL FAIL $D2/$DN exit 2"; }
echo "J13 end $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
echo "J13 SUMMARY pass=$P fail=$F"
