#!/usr/bin/env bash
# browser11.sh <KIT dir> <replayed tree> <scratch> · critique-B pass 11 · written and hashed BEFORE reading
# pass-11/B-kit. The browser bar from committed reports (§P10-6.2 step 4: "no src file moves in either arm; the
# committed reports stand and the tally is re-run through the cured judges"; §P10-6.4 "428/428 base-green held through
# the cured tally"; S-12's hold "every base-green key accounted for through the cured tally").
#   BW1  the kit's (cured) tally over the committed pair and every committed rerun: exit 0                PASS
#   BW2  tally11.mjs (independent reader with its own kind check) over the same inputs: exit 0, and base-green, held
#        and flaky equal to the kit tally's printed counts                                                 PASS
#   BW3  ACCOUNTED: base-green = held + failed + absent                                                    PASS
#   BW4  base-green >= 428 and held = base-green                                                           PASS
#   BW5  the touched-spec pair (when committed) added as one more rerun per tree: both readers, same bar     PASS
#   BW6  the selection re-derived by the kit's browser-select on the replayed tree: specs.txt equals pass 10's
#        committed selection (no src file moves in pass 11), 0 new specs, 0 left                            PASS
#   BW7  every report the kit commits for pass 11 is byte-identical to pass 10's of the same name: INFO
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/bw11"; X="$(cd "$S/bw11" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."; P=0; F=0
ok() { if [ "$2" = 1 ]; then P=$((P+1)); echo "BW $1 PASS :: $3"; else F=$((F+1)); echo "BW $1 FAIL :: $3"; fi; }
BR="${BR:-$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' 2>/dev/null | sort | tail -1)")}"
P10BR="$ST/pass-10/B-kit/results/p10/browser"; [ -f "$BR/route.json" ] || BR="$P10BR"
echo "BW committed reports: ${BR#$ST/}"
args=(--base "$BR/base-rekeyed.json" --route "$BR/route.json")
for f in $(ls "$BR/reruns" 2>/dev/null | sort); do case "$f" in base-*.rekeyed.json) args+=(--base-rerun "$BR/reruns/$f");; route-*.json) args+=(--route-rerun "$BR/reruns/$f");; esac; done
echo "BW inputs: ${#args[@]} arguments"
cnt() { grep -E '^base-green' "$1" | grep -oE "$2[^0-9]*[0-9]+" | head -1 | grep -oE '[0-9]+$'; }
pair() { local tag="$1"; shift
  node "$K/tools/browser-tally.mjs" "$@" > "$X/kit-$tag.txt" 2>&1; local krc=$?
  node "$HERE/tally11.mjs" "$@" > "$X/mine-$tag.txt" 2>&1; local mrc=$?
  grep -E '^(base-green|verdict)' "$X/kit-$tag.txt" | sed "s/^/BW   kit[$tag]: /"; grep -E '^(base-green|ACCOUNTED)' "$X/mine-$tag.txt" | sed "s/^/BW   mine[$tag]: /"
  grep -E '^no verdict|tally11: no verdict' "$X/mine-$tag.txt" "$X/kit-$tag.txt" | head -2 | sed "s/^/BW   /"
  echo "$krc $mrc $(cnt "$X/kit-$tag.txt" 'base-green ') $(cnt "$X/kit-$tag.txt" 'held ') $(cnt "$X/kit-$tag.txt" 'flaky') $(cnt "$X/mine-$tag.txt" 'base-green ') $(cnt "$X/mine-$tag.txt" 'held ') $(cnt "$X/mine-$tag.txt" 'flaky ')"; }
read krc mrc kg kh kf mg mh mf < <(pair full "${args[@]}" | tee /dev/stderr | tail -1) 2>&1
ok BW1 "$([ "$krc" = 0 ] && echo 1 || echo 0)" "kit tally rc=$krc"
ok BW2 "$([ "$mrc" = 0 ] && [ "$kg" = "$mg" ] && [ "$kh" = "$mh" ] && [ "${kf:-x}" = "${mf:-y}" ] && echo 1 || echo 0)" "mine rc=$mrc; base-green kit $kg / mine $mg; held $kh / $mh; flaky ${kf:-?} / ${mf:-?}"
ok BW3 "$(grep -q 'ACCOUNTED.*: yes' "$X/mine-full.txt" && echo 1 || echo 0)" "$(grep ACCOUNTED "$X/mine-full.txt")"
ok BW4 "$([ "${mg:-0}" -ge 428 ] && [ "$mg" = "$mh" ] && echo 1 || echo 0)" "base-green $mg, held $mh (bar 428)"
STEPS=$(ls -d "$BR"/p1*-steps 2>/dev/null | sort)
if [ -n "$STEPS" ]; then a2=("${args[@]}"); for s in $STEPS; do a2+=(--base-rerun "$s/base.rekeyed.json" --route-rerun "$s/route.json"); done
  read krc mrc kg kh kf mg mh mf < <(pair steps "${a2[@]}" | tail -1)
  ok BW5 "$([ "$krc" = 0 ] && [ "$mrc" = 0 ] && [ "$kg" = "$mg" ] && [ "$mg" -ge 428 ] && [ "$mg" = "$mh" ] && echo 1 || echo 0)" "with $(echo $STEPS | wc -w | tr -d ' ') touched-spec pair(s): kit rc=$krc $kg/$kh, mine rc=$mrc $mg/$mh, flaky ${kf:-?}/${mf:-?}"
else echo "BW BW5 INFO no touched-spec pair committed"; fi
node "$K/tools/browser-select.mjs" --root "$T" --out "$X/sel" > "$X/select.txt" 2>&1; src=$?
echo "BW   select rc=$src :: $(tail -1 "$X/select.txt" | cut -c1-200)"
REF=$(ls "$P10BR/../browser-select/specs.txt" "$BR/specs.txt" "$P10BR/specs.txt" 2>/dev/null | head -1)
[ -z "$REF" ] && REF=$(find "$ST/pass-10/B-kit/results" -name specs.txt | sort | tail -1)
if [ -n "$REF" ] && [ -f "$X/sel/specs.txt" ]; then
  nn=$(comm -13 <(sort "$REF") <(sort "$X/sel/specs.txt") | wc -l | tr -d ' '); nl=$(comm -23 <(sort "$REF") <(sort "$X/sel/specs.txt") | wc -l | tr -d ' ')
  ok BW6 "$([ "$src" = 0 ] && [ "$nn" = 0 ] && [ "$nl" = 0 ] && echo 1 || echo 0)" "re-derived $(wc -l < "$X/sel/specs.txt" | tr -d ' ') specs vs ${REF#$ST/}: new $nn, left $nl; captures excluded $(wc -l < "$X/sel/captures.txt" 2>/dev/null | tr -d ' ')"
else ok BW6 0 "no reference specs.txt (${REF:-none}) or no selection written (rc=$src)"; fi
if [ "$BR" != "$P10BR" ]; then for f in base.json base-rekeyed.json route.json $(ls "$BR/reruns" 2>/dev/null | grep json); do
  a="$BR/$f"; [ -f "$a" ] || a="$BR/reruns/$f"; b="$P10BR/$f"; [ -f "$b" ] || b="$P10BR/reruns/$f"
  if [ -f "$b" ]; then cmp -s "$a" "$b" && echo "BW7 INFO $f identical to pass 10's" || echo "BW7 INFO $f DIFFERS from pass 10's"; else echo "BW7 INFO $f has no pass-10 copy"; fi; done
else echo "BW7 INFO the kit commits no pass-11 browser reports; the committed pass-10 reports are read"; fi
echo "BW SUMMARY pass=$P fail=$F"
