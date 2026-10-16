#!/usr/bin/env bash
# judges12.sh <KIT dir (the worktree's copy)> <built replayed tree> <scratch> · critique-B pass 12 · written and hashed
# BEFORE reading pass-12/B-kit or pass-12/B-proto.md. Expectations are fixed from REGISTRY §P11-6.4's battery list,
# §P11-6.3 (the coverage cure), P11-R1 (a), S-14's hold (§P11-7) and P6-R3/P8-R2 (0 GREEN, 1 RED, 2 no verdict):
#   "for browser-tally's four slots and rekey's base: every committed browser-seat/2 report, full and partial: the full
#    base raw and re-keyed, each base rerun raw and re-keyed, each touched-spec base raw and re-keyed (p10, p11), the full
#    route, each route rerun, each touched-spec route; each one the slot refuses exits 2, and no report other than the
#    right full base reads 0 in --base against the full route";
#   "F6 through every row above, never 0; F7's ten rows (cB11-R/f7.txt), each 2";
#   "the touched-spec pairs judged on their own (p10, p11): a verdict, not a throw, and F6's analogue on each pair RED";
#   "a re-keyed base with one base-origin spec's results deleted, against the full route: 2".
#
# The report set is DISCOVERED, not listed: every *.json under the kit's committed browser dir whose $schema is
# browser-seat/2, named by its path under that dir. Each is classed by its own fields (a seat-written class, printed):
#   rk  re-keyed base (rekeyedFrom present)          raw  base run not re-keyed (no rekeyedFrom, testDir != ".")
#   rt  route run or rerun (no rekeyedFrom, testDir ".")
# and by extent: FULL (base.json, base-rekeyed.json, route.json at the browser dir's top) or PARTIAL (every other).
#
# Expectations per slot (route = the full route, RB = every committed rerun in its slot, as the kit's bar passes them):
#   tally --base X --route ROUTE [RB]    X = base-rekeyed.json: 0 with RB, a verdict (0|1) without (P7-R2: the flaky key
#                                         needs the reruns); EVERY other report: 2, with and without RB
#   tally --base BASE --route X RB       X = route.json: 0; other rt (partial routes): never 0; rk, raw: 2
#   tally --base BASE --route ROUTE RB --base-rerun X
#                                        rk PARTIAL (base reruns, touched-spec re-keyed bases): 0 (P7-R2; §P11-6.3
#                                         "the touched-spec pairs pass … when added as reruns"); rk FULL: INFO;
#                                         raw, rt: 2
#   tally --base BASE --route ROUTE RB --route-rerun X
#                                        rt PARTIAL: 0; rt FULL: INFO; rk, raw: 2
#   rekey X <tree> <out>                 raw (full, reruns, touched-spec): 0; rk, rt: 2
#   F6 (FR = the full route with one base-green, non-flaky key flipped to "unexpected"; the key's spec is held by no
#       committed rerun or touched-spec report, so no other report supplies its status):
#     --base X --route FR [RB]           X = base-rekeyed.json: 1; every other report: never 0
#     --base BASE --route FR --base-rerun X        every report: never 0
#     --base BASE --route FR RB --route-rerun X    every report: never 0
#     rekey X → out; when rekey writes, --base out --route FR and --base BASE --route FR --base-rerun out: never 0
#   F7 (cB11-R/f7.txt's ten rows): --base each re-keyed base rerun and each touched-spec re-keyed base, --route FR, with
#       and without RB: each exactly 2
#   PAIR (each touched-spec dir pN-steps): --base pN/base.rekeyed.json --route pN/route.json: a verdict (0|1), not 2;
#       PAIR-F6: that route with one of its base-green keys flipped: 1
#   DEL (the full re-keyed base with every result of ONE base-origin spec deleted, against the full route, with RB): 2;
#       the same against FR: never 0. Specs deleted: F6's spec; a spec whose re-keyed path differs from its raw path (a
#       moved spec); the flaky key's spec; the first spec of each touched-spec pair
#   MAP (S-14, the coverage map is an input): frozen/SEQUENCE.json replaced by {}, [], a missing file, and non-JSON,
#       restored by sha256; under each: --base a re-keyed base rerun --route FR: never 0; the full pair with RB: INFO
#   INFO (adversarial extents the plan does not name; judged in critique-B.md, not scored here):
#       X-KEY   the full base with only F6's KEY deleted (its spec kept), against FR
#       X-SKIP  the full base with F6's spec's results all set to "skipped", against FR
#       X-NEW   the full route with one base-origin spec renamed to a path no base report holds, against the full base
#       X-DUPR  the full route with its results doubled (every key twice), against the full base, with RB
#       X-ORIG  the full base with rekeyedFrom.report pointed at a missing file, against the full route, with RB
# Prints `J12 <id> <PASS|FAIL|INFO> rc=<n> expect=<…> :: <last line>` and `J12 SUMMARY pass=<n> fail=<n>`.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/j12"; X="$(cd "$S/j12" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."
TALLY="$K/tools/browser-tally.mjs"; REKEY="$K/tools/rekey.mjs"
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' 2>/dev/null | sort | tail -1)")}"
[ -f "$BR/route.json" ] || { echo "J12 FATAL no committed browser dir with route.json under ${K#$ST/}/results"; echo "J12 SUMMARY pass=0 fail=1"; exit 0; }
echo "J12 start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg); browser dir ${BR#$ST/}"
P=0; F=0
run() { (cd "$X" && timeout 600 "$@") >"$X/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$X/o.log" | grep -E 'verdict|no verdict|base-green|Error|error' | tail -1 | cut -c1-240; }
say() { local id="$1" rc="$2" exp="$3"
  case "$exp" in
    info) echo "J12 $id INFO rc=$rc :: $(last)";;
    never0) if [ "$rc" != 0 ]; then P=$((P+1)); echo "J12 $id PASS rc=$rc expect=never-0 :: $(last)"; else F=$((F+1)); echo "J12 $id FAIL rc=$rc expect=never-0 :: $(last)"; fi;;
    verdict) if [ "$rc" = 0 ] || [ "$rc" = 1 ]; then P=$((P+1)); echo "J12 $id PASS rc=$rc expect=verdict(0|1) :: $(last)"; else F=$((F+1)); echo "J12 $id FAIL rc=$rc expect=verdict(0|1) :: $(last)"; fi;;
    *) if [ "$rc" = "$exp" ]; then P=$((P+1)); echo "J12 $id PASS rc=$rc expect=$exp :: $(last)"; else F=$((F+1)); echo "J12 $id FAIL rc=$rc expect=$exp :: $(last)"; fi;;
  esac; }
sha() { shasum -a 256 "$1" | cut -c1-64; }
# ---- the reports
declare -a REP=()   # "name|class|extent|path"
while IFS= read -r f; do
  c=$(node -e 'try{const j=JSON.parse(require("fs").readFileSync(process.argv[1]));if(j.$schema!=="browser-seat/2"){console.log("-");process.exit(0)}const rk=j.rekeyedFrom!==undefined&&j.rekeyedFrom!==null;console.log(rk?"rk":j.testDir==="."?"rt":"raw")}catch(e){console.log("-")}' "$f")
  [ "$c" = "-" ] && continue
  n="${f#$BR/}"; case "$n" in base.json|base-rekeyed.json|route.json) e=FULL;; *) e=PARTIAL;; esac
  REP+=("$n|$c|$e|$f")
  echo "J12 report $n class=$c extent=$e :: $(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log("testDir "+j.testDir+" results "+j.results?.length+" specs "+new Set((j.results||[]).map(x=>x.spec)).size+" baseReport "+(j.baseReport===null?"null":j.baseReport?"set":"absent"))' "$f")"
done < <(find "$BR" -name '*.json' | sort)
echo "J12 reports discovered: ${#REP[@]}"
BASE="$BR/base-rekeyed.json"; ROUTE="$BR/route.json"
RB=(); for f in $(ls "$BR/reruns" 2>/dev/null | sort); do case "$f" in base-*.rekeyed.json) RB+=(--base-rerun "$BR/reruns/$f");; route-*.json) RB+=(--route-rerun "$BR/reruns/$f");; esac; done
echo "J12 committed reruns in the bar: $(( ${#RB[@]} / 2 ))"
say CTL-full "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}")" 0
say CTL-full-noRB "$(run node "$TALLY" --base "$BASE" --route "$ROUTE")" verdict
# ---- F6's failing route: a base-green, non-flaky key whose spec no rerun or touched-spec report holds
node -e 'const fs=require("fs");const [br,o]=process.argv.slice(1);const rd=f=>JSON.parse(fs.readFileSync(f));
const B=rd(br+"/base-rekeyed.json"),R=rd(br+"/route.json");
const others=[];const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=d+"/"+e.name;if(e.isDirectory())walk(p);else if(p.endsWith(".json")&&!/\/(base|base-rekeyed|route)\.json$/.test(p.replace(br,""))){try{const j=rd(p);if(j.$schema==="browser-seat/2")others.push(j)}catch{}}}};walk(br);
const busy=new Set(others.flatMap(j=>j.results.map(x=>x.spec)));
const green=new Set(B.results.filter(x=>x.status==="expected").map(x=>x.spec+" :: "+x.title));
const i=R.results.findIndex(x=>x.status==="expected"&&green.has(x.spec+" :: "+x.title)&&!busy.has(x.spec));
if(i<0){console.log("J12 F6 NO-KEY");process.exit(0)}
R.results[i].status="unexpected";fs.writeFileSync(o+"/route-fail.json",JSON.stringify(R));
fs.writeFileSync(o+"/f6.json",JSON.stringify({spec:R.results[i].spec,title:R.results[i].title}));
console.log("J12 F6 flipped: "+R.results[i].spec+" :: "+R.results[i].title.slice(0,80)+" (specs held by reruns/pairs: "+busy.size+")");' "$BR" "$X"
FR="$X/route-fail.json"
say F6-ctl "$(run node "$TALLY" --base "$BASE" --route "$FR")" 1
say F6-ctl-RB "$(run node "$TALLY" --base "$BASE" --route "$FR" "${RB[@]}")" 1
# ---- KIND x EXTENT matrix, F6 through every row
Z0=0  # reports other than the right full base that read 0 in --base against the full route
for r in "${REP[@]}"; do IFS='|' read -r n c e f <<< "$r"; id="${n//\//:}"
  # --base
  if [ "$n" = base-rekeyed.json ]; then say "KM-base-$id-RB" "$(run node "$TALLY" --base "$f" --route "$ROUTE" "${RB[@]}")" 0; say "KM-base-$id" "$(run node "$TALLY" --base "$f" --route "$ROUTE")" verdict
    say "F6-base-$id" "$(run node "$TALLY" --base "$f" --route "$FR")" 1; say "F6-base-$id-RB" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" 1
  else rc=$(run node "$TALLY" --base "$f" --route "$ROUTE"); [ "$rc" = 0 ] && Z0=$((Z0+1)); say "KM-base-$id" "$rc" 2
    rc=$(run node "$TALLY" --base "$f" --route "$ROUTE" "${RB[@]}"); [ "$rc" = 0 ] && Z0=$((Z0+1)); say "KM-base-$id-RB" "$rc" 2
    say "F6-base-$id" "$(run node "$TALLY" --base "$f" --route "$FR")" never0; say "F6-base-$id-RB" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" never0; fi
  # --route
  if [ "$n" = route.json ]; then say "KM-route-$id" "$(run node "$TALLY" --base "$BASE" --route "$f" "${RB[@]}")" 0
  elif [ "$c" = rt ]; then say "KM-route-$id" "$(run node "$TALLY" --base "$BASE" --route "$f" "${RB[@]}")" never0
  else say "KM-route-$id" "$(run node "$TALLY" --base "$BASE" --route "$f" "${RB[@]}")" 2; fi
  # --base-rerun
  if [ "$c" = rk ] && [ "$e" = PARTIAL ]; then exp=0; elif [ "$c" = rk ]; then exp=info; else exp=2; fi
  say "KM-baserr-$id" "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}" --base-rerun "$f")" "$exp"
  say "F6-baserr-$id" "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$f")" never0
  # --route-rerun
  if [ "$c" = rt ] && [ "$e" = PARTIAL ]; then exp=0; elif [ "$c" = rt ]; then exp=info; else exp=2; fi
  say "KM-routerr-$id" "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}" --route-rerun "$f")" "$exp"
  say "F6-routerr-$id" "$(run node "$TALLY" --base "$BASE" --route "$FR" "${RB[@]}" --route-rerun "$f")" never0
  # rekey
  [ "$c" = raw ] && exp=0 || exp=2
  rc=$(run node "$REKEY" "$f" "$T" "$X/rk-$id.json"); say "KM-rekey-$id" "$rc" "$exp"
  if [ "$rc" = 0 ] && [ -f "$X/rk-$id.json" ]; then
    if [ "$n" = base.json ]; then say "F6-rekeyed-$id-as-base" "$(run node "$TALLY" --base "$X/rk-$id.json" --route "$FR" "${RB[@]}")" 1
      cmp -s <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(JSON.stringify(j.results))' "$X/rk-$id.json") <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(JSON.stringify(j.results))' "$BASE") && echo "J12 REKEY-EQ INFO the seat's re-key of base.json holds the committed base-rekeyed.json's results byte for byte" || echo "J12 REKEY-EQ INFO the seat's re-key of base.json DIFFERS in results from the committed base-rekeyed.json"
    else say "F6-rekeyed-$id-as-base" "$(run node "$TALLY" --base "$X/rk-$id.json" --route "$FR")" never0; fi
    say "F6-rekeyed-$id-as-baserr" "$(run node "$TALLY" --base "$BASE" --route "$FR" --base-rerun "$X/rk-$id.json")" never0; fi
done
[ "$Z0" = 0 ] && { P=$((P+1)); echo "J12 ZERO PASS no report other than base-rekeyed.json read 0 in --base against the full route"; } || { F=$((F+1)); echo "J12 ZERO FAIL $Z0 rows other than base-rekeyed.json read 0 in --base against the full route"; }
# ---- F7's ten rows
for f in $(ls "$BR/reruns" 2>/dev/null | grep -E '^base-.*\.rekeyed\.json$' | sort | sed "s#^#$BR/reruns/#") $(ls -d "$BR"/p1*-steps 2>/dev/null | sort | sed 's#$#/base.rekeyed.json#'); do
  [ -f "$f" ] || continue; n="${f#$BR/}"
  say "F7-${n//\//:}" "$(run node "$TALLY" --base "$f" --route "$FR")" 2
  say "F7-${n//\//:}-RB" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" 2; done
# ---- PAIR: the touched-spec pairs on their own, and F6's analogue on each
for d in $(ls -d "$BR"/p1*-steps 2>/dev/null | sort); do n=$(basename "$d")
  say "PAIR-$n" "$(run node "$TALLY" --base "$d/base.rekeyed.json" --route "$d/route.json")" verdict
  node -e 'const fs=require("fs");const [b,r,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(b));const g=new Set(B.results.filter(x=>x.status==="expected").map(x=>x.spec+" :: "+x.title));const R=JSON.parse(fs.readFileSync(r));const i=R.results.findIndex(x=>x.status==="expected"&&g.has(x.spec+" :: "+x.title));if(i<0){console.log("none");process.exit(0)}R.results[i].status="unexpected";fs.writeFileSync(o,JSON.stringify(R));console.log(R.results[i].spec+" :: "+R.results[i].title.slice(0,60))' "$d/base.rekeyed.json" "$d/route.json" "$X/pair-$n-fail.json" > "$X/pair.txt"
  echo "J12 PAIR-F6-$n flipped: $(cat "$X/pair.txt")"
  [ -f "$X/pair-$n-fail.json" ] && say "PAIR-F6-$n" "$(run node "$TALLY" --base "$d/base.rekeyed.json" --route "$X/pair-$n-fail.json")" 1 || { F=$((F+1)); echo "J12 PAIR-F6-$n FAIL no base-green key in the pair"; }
done
# ---- DEL: one base-origin spec's results deleted from the full re-keyed base
node -e 'const fs=require("fs");const [br,x]=process.argv.slice(1);const rd=f=>JSON.parse(fs.readFileSync(f));const B=rd(br+"/base-rekeyed.json"),RAW=rd(br+"/base.json");
const f6=rd(x+"/f6.json");const specs=[...new Set(B.results.map(r=>r.spec))];const raw=new Set(RAW.results.map(r=>r.spec));
const pick={f6:f6.spec};
pick.moved=specs.find(s=>!raw.has(s)&&!raw.has(s.replace(/^tests-visual\//,""))&&s!==f6.spec);
const R=rd(br+"/route.json");const route=new Set(R.results.map(r=>r.spec));
let flakySpec=null;try{for(const f of fs.readdirSync(br+"/reruns").filter(f=>/^base-.*\.rekeyed\.json$/.test(f))){const j=rd(br+"/reruns/"+f);flakySpec=j.results[0]?.spec;break}}catch{}
if(flakySpec)pick.rerun=flakySpec;
for(const d of fs.readdirSync(br).filter(d=>/^p1.*-steps$/.test(d))){try{pick[d]=rd(br+"/"+d+"/base.rekeyed.json").results[0].spec}catch{}}
for(const [k,s] of Object.entries(pick)){if(!s){console.log("DELPICK "+k+" none");continue}const o=structuredClone(B);o.results=o.results.filter(r=>r.spec!==s);fs.writeFileSync(x+"/del-"+k+".json",JSON.stringify(o));console.log("DELPICK "+k+" "+s+" removed "+(B.results.length-o.results.length)+" results; in route: "+route.has(s))}' "$BR" "$X" > "$X/delpick.txt"
sed 's/^/J12 /' "$X/delpick.txt"
for f in $(ls "$X"/del-*.json 2>/dev/null | sort); do n=$(basename "$f" .json)
  say "DEL-$n-RB" "$(run node "$TALLY" --base "$f" --route "$ROUTE" "${RB[@]}")" 2
  say "DEL-$n" "$(run node "$TALLY" --base "$f" --route "$ROUTE")" 2
  say "DEL-$n-F6" "$(run node "$TALLY" --base "$f" --route "$FR" "${RB[@]}")" never0; done
# ---- MAP: the coverage map as an input, degenerate
SEQ="$K/frozen/SEQUENCE.json"; BRR=$(ls "$BR"/reruns/base-*.rekeyed.json 2>/dev/null | sort | head -1)
if [ -f "$SEQ" ]; then h=$(sha "$SEQ"); cp "$SEQ" "$X/seq.keep"
  for form in obj arr missing notjson; do
    case "$form" in obj) echo '{}' > "$SEQ";; arr) echo '[]' > "$SEQ";; missing) rm -f "$SEQ";; notjson) echo 'not json' > "$SEQ";; esac
    [ -n "$BRR" ] && say "MAP-$form-partial-base-F6" "$(run node "$TALLY" --base "$BRR" --route "$FR")" never0
    say "MAP-$form-full-F6" "$(run node "$TALLY" --base "$BASE" --route "$FR" "${RB[@]}")" never0
    say "MAP-$form-full-INFO" "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}")" info
    cp "$X/seq.keep" "$SEQ"; [ "$(sha "$SEQ")" = "$h" ] || { F=$((F+1)); echo "J12 MAP RESTORE-FAIL"; }; done
  say MAP-restored-ctl "$(run node "$TALLY" --base "$BASE" --route "$ROUTE" "${RB[@]}")" 0
else F=$((F+1)); echo "J12 MAP FAIL no frozen/SEQUENCE.json in the kit"; fi
# ---- INFO extents
node -e 'const fs=require("fs");const [br,x]=process.argv.slice(1);const rd=f=>JSON.parse(fs.readFileSync(f));const B=rd(br+"/base-rekeyed.json"),R=rd(br+"/route.json"),f6=rd(x+"/f6.json");
let o=structuredClone(B);let gone=false;o.results=o.results.filter(r=>{if(!gone&&r.spec===f6.spec&&r.title===f6.title){gone=true;return false}return true});fs.writeFileSync(x+"/x-key.json",JSON.stringify(o));
o=structuredClone(B);for(const r of o.results)if(r.spec===f6.spec)r.status="skipped";fs.writeFileSync(x+"/x-skip.json",JSON.stringify(o));
o=structuredClone(R);const s=o.results.find(r=>r.spec!==f6.spec).spec;for(const r of o.results)if(r.spec===s)r.spec=s.replace(/(\.[a-z]+\.ts)$/,"-renamed$1");fs.writeFileSync(x+"/x-new.json",JSON.stringify(o));
o=structuredClone(R);o.results=[...o.results,...o.results];fs.writeFileSync(x+"/x-dupr.json",JSON.stringify(o));
o=structuredClone(B);o.rekeyedFrom={...o.rekeyedFrom,report:"/nonexistent/base.json"};fs.writeFileSync(x+"/x-orig.json",JSON.stringify(o));' "$BR" "$X"
say X-KEY-F6-INFO "$(run node "$TALLY" --base "$X/x-key.json" --route "$FR" "${RB[@]}")" info
say X-SKIP-F6-INFO "$(run node "$TALLY" --base "$X/x-skip.json" --route "$FR" "${RB[@]}")" info
say X-NEW-INFO "$(run node "$TALLY" --base "$BASE" --route "$X/x-new.json" "${RB[@]}")" info
say X-DUPR-INFO "$(run node "$TALLY" --base "$BASE" --route "$X/x-dupr.json" "${RB[@]}")" info
say X-ORIG-INFO "$(run node "$TALLY" --base "$X/x-orig.json" --route "$ROUTE" "${RB[@]}")" info
echo "J12 end $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
echo "J12 SUMMARY pass=$P fail=$F"
