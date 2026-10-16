#!/usr/bin/env bash
# browser10.sh <KIT dir> <replayed tree> <scratch> · critique-B pass 10 · written and hashed BEFORE reading
# pass-10/B-kit. The browser bar from committed reports (§P9-6.2 step 4, §P9-6.4 "428/428 base-green held", S-12's hold
# "every base-green key accounted for").
#   BW1  the kit's tally over the committed pair and every committed rerun: exit 0                       PASS
#   BW2  tally10.mjs (this battery's independent reader) over the same inputs: exit 0, and every count
#        (base-green, held, failed, absent, flaky) equal to the kit tally's printed counts                  PASS
#   BW3  ACCOUNTED: base-green = held + failed + absent                                                    PASS
#   BW4  base-green >= 428 (the pass-9 bar) and held = base-green                                         PASS
#   BW5  the selection re-derived by the kit's browser-select on the replayed tree equals the committed
#        specs.txt (when one is committed)                                                                 PASS
#   BW6  every spec the re-derived selection names that the pass-9 selection did not (the specs the pass-10
#        chain newly touches) is reported by the committed pass-10 route run or a route rerun                PASS
#   BW7  every committed report file is byte-identical to pass 9's copy of the same name: INFO (a moved file
#        means the route re-ran; an identical one means the committed reports stand)
# Then pass 8's hashed browser-plants.mjs by path through this battery's shim (pass 9's tally-shim.mjs by path).
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/bw"; X="$(cd "$S/bw" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."; P=0; F=0
ok() { if [ "$2" = 1 ]; then P=$((P+1)); echo "BW $1 PASS :: $3"; else F=$((F+1)); echo "BW $1 FAIL :: $3"; fi; }
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' 2>/dev/null | sort | tail -1)")}"
P9BR="$ST/pass-9/B-kit/results/p9/browser"
echo "BW committed reports: ${BR#$ST/}"
args=(--base "$BR/base-rekeyed.json" --route "$BR/route.json")
for f in $(ls "$BR/reruns" 2>/dev/null | sort); do case "$f" in base-*.rekeyed.json) args+=(--base-rerun "$BR/reruns/$f");; route-*.json) args+=(--route-rerun "$BR/reruns/$f");; esac; done
echo "BW inputs: ${#args[@]} arguments"
node "$K/tools/browser-tally.mjs" "${args[@]}" > "$X/kit-tally.txt" 2>&1; krc=$?
grep -E '^(base-green|verdict)' "$X/kit-tally.txt" | sed 's/^/BW   kit: /'
ok BW1 "$([ $krc = 0 ] && echo 1 || echo 0)" "kit tally rc=$krc"
node "$HERE/tally10.mjs" "${args[@]}" > "$X/tally10.txt" 2>&1; mrc=$?
grep -E '^(reports|base keys|base-green|ACCOUNTED|FLAKY|FAILED|ABSENT)' "$X/tally10.txt" | head -20 | sed 's/^/BW   mine: /'
num() { grep -oE "$2 [0-9]+" "$1" | head -1 | grep -oE '[0-9]+'; }
kg=$(grep -E '^base-green' "$X/kit-tally.txt" | grep -oE 'base-green [0-9]+' | grep -oE '[0-9]+'); kh=$(grep -E '^base-green' "$X/kit-tally.txt" | grep -oE 'held [0-9]+' | head -1 | grep -oE '[0-9]+')
kf=$(grep -E '^base-green' "$X/kit-tally.txt" | grep -oE 'flaky[^0-9]*[0-9]+' | grep -oE '[0-9]+' | head -1)
mg=$(grep -E '^base-green' "$X/tally10.txt" | grep -oE 'base-green [0-9]+' | grep -oE '[0-9]+'); mh=$(grep -E '^base-green' "$X/tally10.txt" | grep -oE 'held [0-9]+' | grep -oE '[0-9]+')
mfl=$(grep -E '^base-green' "$X/tally10.txt" | grep -oE 'flaky [0-9]+' | grep -oE '[0-9]+')
ok BW2 "$([ $mrc = 0 ] && [ "$kg" = "$mg" ] && [ "$kh" = "$mh" ] && [ "${kf:-x}" = "${mfl:-y}" ] && echo 1 || echo 0)" "mine rc=$mrc; base-green kit $kg / mine $mg; held kit $kh / mine $mh; flaky kit ${kf:-?} / mine ${mfl:-?}"
ok BW3 "$(grep -q 'ACCOUNTED.*: yes' "$X/tally10.txt" && echo 1 || echo 0)" "$(grep ACCOUNTED "$X/tally10.txt")"
ok BW4 "$([ "${mg:-0}" -ge 428 ] && [ "$mg" = "$mh" ] && echo 1 || echo 0)" "base-green $mg, held $mh (pass-9 bar 428)"
node "$K/tools/browser-select.mjs" --root "$T" --out "$X/sel" > "$X/select.txt" 2>&1; src=$?
echo "BW   select rc=$src :: $(tail -1 "$X/select.txt" | cut -c1-200)"
if [ -f "$BR/specs.txt" ]; then
  if cmp -s <(sort "$BR/specs.txt") <(sort "$X/sel/specs.txt"); then ok BW5 1 "re-derived specs.txt equals the committed one ($(wc -l < "$X/sel/specs.txt" | tr -d ' ') specs)"
  else ok BW5 0 "re-derived specs.txt differs from the committed one: $(diff <(sort "$BR/specs.txt") <(sort "$X/sel/specs.txt") | grep -c '^[<>]') lines"; diff <(sort "$BR/specs.txt") <(sort "$X/sel/specs.txt") | head -10 | sed 's/^/BW5   /'; fi
else echo "BW BW5 INFO no committed specs.txt beside the reports"; fi
if [ -f "$P9BR/specs.txt" ]; then
  comm -13 <(sort "$P9BR/specs.txt") <(sort "$X/sel/specs.txt") > "$X/new-specs.txt"; n=$(wc -l < "$X/new-specs.txt" | tr -d ' ')
  node -e 'const fs=require("fs");const [nf,...reps]=process.argv.slice(1);const have=new Set();for(const r of reps){try{for(const x of JSON.parse(fs.readFileSync(r)).results)have.add(x.spec)}catch{}}
const n=fs.readFileSync(nf,"utf8").split("\n").filter(Boolean);const miss=n.filter(s=>!have.has(s));for(const s of n)console.log((have.has(s)?"BW6   run   ":"BW6   UNRUN ")+s);console.log("BW6MISS "+miss.length);' "$X/new-specs.txt" "$BR/route.json" $(ls "$BR"/reruns/route-*.json 2>/dev/null) > "$X/bw6.txt"
  grep -v BW6MISS "$X/bw6.txt" | head -40; m=$(grep BW6MISS "$X/bw6.txt" | grep -oE '[0-9]+')
  ok BW6 "$([ "$m" = 0 ] && echo 1 || echo 0)" "$n specs selected now and not in pass 9's selection; unrun by the committed route reports: $m"
  comm -23 <(sort "$P9BR/specs.txt") <(sort "$X/sel/specs.txt") | head -10 | sed 's/^/BW6   left the selection: /'
else echo "BW BW6 INFO no pass-9 specs.txt at ${P9BR#$ST/}"; fi
for f in base.json base-rekeyed.json route.json $(ls "$BR/reruns" 2>/dev/null | grep json); do
  a="$BR/$f"; [ -f "$a" ] || a="$BR/reruns/$f"; b="$P9BR/$f"; [ -f "$b" ] || b="$P9BR/reruns/$f"
  if [ -f "$b" ]; then cmp -s "$a" "$b" && echo "BW7 INFO $f identical to pass 9's" || echo "BW7 INFO $f DIFFERS from pass 9's"; else echo "BW7 INFO $f has no pass-9 copy"; fi; done
echo "== pass-8 browser-plants through the pass-10 tally (RD, T0-T5)"
TALLY="$K/tools/browser-tally.mjs" RERUN_DIR="$BR/reruns" node "$ST/pass-8/critique-B/battery/browser-plants.mjs" --dir "$BR" --tally "$ST/pass-9/critique-B/battery/tally-shim.mjs" --out "$X/browser-plants.json" 2>&1 | tail -30
echo "BW SUMMARY pass=$P fail=$F"
