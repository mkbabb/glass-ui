#!/usr/bin/env bash
# browser12.sh <KIT dir> <replayed tree> <floor-base tree> <scratch> · critique-B pass 12 · written and hashed BEFORE
# reading pass-12/B-kit. The browser bar from committed reports (§P11-6.2 step 2: "no src file moves and no code line
# changes; the committed reports stand and the tally is re-run through the cured judge"; §P11-6.4 "428/428 base-green
# held through the cured tally"; S-12's hold "every base-green key accounted for through the cured tally").
#   BW1  the kit's cured tally over the committed full pair and every committed rerun: exit 0
#   BW2  tally12.mjs (independent: own kind AND extent check) over the same inputs: exit 0; base-green, held and flaky
#        equal to the kit tally's printed counts
#   BW3  ACCOUNTED: base-green = held + failed + absent (tally12)
#   BW4  base-green >= 428 and held = base-green
#   BW5  every touched-spec pair added as one more rerun per tree: both readers, the same bar
#   BW6  the selection re-derived by the kit's browser-select on the replayed tree equals the kit's committed specs.txt
#        and pass 10's and pass 11's committed selections: 0 new, 0 left; captures printed
#   BW7  NEW: the route specs the full base lacks (derived here, printed) are absent from the floor-base tree at their
#        route path AND from the raw base report's spec list; each must not exist on the floor base (else the base program
#        skipped a spec the floor base holds, and the 428 bar is short)
#   BW8  INFO: every report the kit commits for pass 12 against pass 11's of the same name (byte-identical or not)
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; FBT="$3"; S="$4"; mkdir -p "$S/bw12"; X="$(cd "$S/bw12" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."; P=0; F=0
ok() { if [ "$2" = 1 ]; then P=$((P+1)); echo "BW $1 PASS :: $3"; else F=$((F+1)); echo "BW $1 FAIL :: $3"; fi; }
echo "BW start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' 2>/dev/null | sort | tail -1)")}"
P11BR="$ST/pass-11/B-kit/results/p11/browser"; P10BR="$ST/pass-10/B-kit/results/p10/browser"
[ -f "$BR/route.json" ] || { ok BW0 0 "no committed browser dir in the kit"; echo "BW SUMMARY pass=$P fail=$F"; exit 0; }
echo "BW committed reports: ${BR#$ST/}"
# BW7 first: the new specs
node -e 'const fs=require("fs");const [br]=process.argv.slice(1);const rd=f=>JSON.parse(fs.readFileSync(f));const B=new Set(rd(br+"/base-rekeyed.json").results.map(x=>x.spec));
for(const s of new Set(rd(br+"/route.json").results.map(x=>x.spec)))if(!B.has(s))console.log(s)' "$BR" > "$X/new.txt"
RAWSPECS=$(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log([...new Set(j.results.map(x=>x.spec))].join("\n"))' "$BR/base.json")
nb=0; while IFS= read -r s; do [ -z "$s" ] && continue; rel="${s#tests-visual/}"
  onfb=no; [ -e "$FBT/$s" ] && onfb=yes; inraw=no; printf '%s\n' "$RAWSPECS" | grep -qxF -e "$s" -e "$rel" && inraw=yes
  echo "BW   NEW $s :: on the floor base at this path: $onfb; in the raw base report: $inraw"; [ "$onfb" = yes ] || [ "$inraw" = yes ] && nb=$((nb+1)); done < "$X/new.txt"
ok BW7 "$([ "$nb" = 0 ] && echo 1 || echo 0)" "$(wc -l < "$X/new.txt" | tr -d ' ') route spec(s) the full base lacks; $nb of them exist on the floor base or in the raw base"
args=(--base "$BR/base-rekeyed.json" --route "$BR/route.json")
for f in $(ls "$BR/reruns" 2>/dev/null | sort); do case "$f" in base-*.rekeyed.json) args+=(--base-rerun "$BR/reruns/$f");; route-*.json) args+=(--route-rerun "$BR/reruns/$f");; esac; done
echo "BW inputs: ${#args[@]} arguments"
cnt() { grep -E "$2" "$1" | head -1 | grep -oE "$3 [0-9]+" | head -1 | grep -oE '[0-9]+$'; }
pair() { local tag="$1"; shift
  node "$K/tools/browser-tally.mjs" "$@" > "$X/kit-$tag.txt" 2>&1; local krc=$?
  node "$HERE/tally12.mjs" "$@" --new "$X/new.txt" > "$X/mine-$tag.txt" 2>&1; local mrc=$?
  grep -E '^(base-green|verdict)' "$X/kit-$tag.txt" | sed "s/^/BW   kit[$tag]: /"; grep -E '^(base-green|ACCOUNTED|BYDIR)' "$X/mine-$tag.txt" | sed "s/^/BW   mine[$tag]: /"
  grep -hE 'no verdict' "$X/mine-$tag.txt" "$X/kit-$tag.txt" | head -2 | sed "s/^/BW   /"
  echo "$krc $mrc $(cnt "$X/kit-$tag.txt" '^base-green' 'base-green') $(cnt "$X/kit-$tag.txt" '^base-green' 'held') $(cnt "$X/kit-$tag.txt" '^base-green' 'flaky \(out of the bar\)') $(cnt "$X/mine-$tag.txt" '^base-green' 'base-green') $(cnt "$X/mine-$tag.txt" '^base-green' 'held') $(cnt "$X/mine-$tag.txt" '^base-green' 'flaky')"; }
read krc mrc kg kh kf mg mh mf < <(pair full "${args[@]}" | tee "$X/pair-full.txt" | tail -1); grep -v '^[0-9]' "$X/pair-full.txt"
[ -z "${kf:-}" ] && kf=$(grep -oE 'flaky[^0-9]*[0-9]+' "$X/kit-full.txt" | head -1 | grep -oE '[0-9]+$')
ok BW1 "$([ "$krc" = 0 ] && echo 1 || echo 0)" "kit tally rc=$krc"
ok BW2 "$([ "$mrc" = 0 ] && [ "$kg" = "$mg" ] && [ "$kh" = "$mh" ] && [ "${kf:-x}" = "${mf:-y}" ] && echo 1 || echo 0)" "mine rc=$mrc; base-green kit $kg / mine $mg; held $kh / $mh; flaky ${kf:-?} / ${mf:-?}"
ok BW3 "$(grep -q 'ACCOUNTED.*: yes' "$X/mine-full.txt" && echo 1 || echo 0)" "$(grep ACCOUNTED "$X/mine-full.txt")"
ok BW4 "$([ "${mg:-0}" -ge 428 ] && [ "$mg" = "$mh" ] && echo 1 || echo 0)" "base-green $mg, held $mh (bar 428)"
STEPS=$(ls -d "$BR"/p1*-steps 2>/dev/null | sort)
if [ -n "$STEPS" ]; then a2=("${args[@]}"); for s in $STEPS; do a2+=(--base-rerun "$s/base.rekeyed.json" --route-rerun "$s/route.json"); done
  read krc mrc kg kh kf mg mh mf < <(pair steps "${a2[@]}" | tee "$X/pair-steps.txt" | tail -1); grep -v '^[0-9]' "$X/pair-steps.txt"
  ok BW5 "$([ "$krc" = 0 ] && [ "$mrc" = 0 ] && [ "$kg" = "$mg" ] && [ "${mg:-0}" -ge 428 ] && [ "$mg" = "$mh" ] && echo 1 || echo 0)" "with $(echo $STEPS | wc -w | tr -d ' ') touched-spec pair(s): kit rc=$krc $kg/$kh, mine rc=$mrc $mg/$mh"
else echo "BW BW5 INFO no touched-spec pair committed"; fi
node "$K/tools/browser-select.mjs" --root "$T" --out "$X/sel" > "$X/select.txt" 2>&1; src=$?
echo "BW   select rc=$src :: $(tail -1 "$X/select.txt" | cut -c1-200)"
bw6=1; msg="re-derived $(wc -l < "$X/sel/specs.txt" 2>/dev/null | tr -d ' ') specs, captures excluded $(wc -l < "$X/sel/captures.txt" 2>/dev/null | tr -d ' ')"
for REF in "$BR/specs.txt" "$P11BR/specs.txt" "$P10BR/specs.txt"; do
  if [ -f "$REF" ] && [ -f "$X/sel/specs.txt" ]; then nn=$(comm -13 <(sort "$REF") <(sort "$X/sel/specs.txt") | wc -l | tr -d ' '); nl=$(comm -23 <(sort "$REF") <(sort "$X/sel/specs.txt") | wc -l | tr -d ' ')
    msg="$msg; vs ${REF#$ST/}: new $nn left $nl"; [ "$nn" = 0 ] && [ "$nl" = 0 ] || bw6=0; else msg="$msg; ${REF#$ST/} missing"; [ "$REF" = "$BR/specs.txt" ] && bw6=0; fi; done
[ "$src" = 0 ] || bw6=0
ok BW6 "$bw6" "$msg"
for f in $(cd "$BR" && find . -name '*.json' -o -name '*.txt' | sed 's#^\./##' | sort); do
  b="$P11BR/$f"; if [ -f "$b" ]; then cmp -s "$BR/$f" "$b" && echo "BW8 INFO $f identical to pass 11's" || echo "BW8 INFO $f DIFFERS from pass 11's"; else echo "BW8 INFO $f has no pass-11 copy"; fi; done
echo "BW end $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
echo "BW SUMMARY pass=$P fail=$F"
