#!/usr/bin/env bash
# browser-touched.sh <base tree> <route tree> <browser dir> — pass 11's browser procedure (LAW §13 "A step
# that moves a src file"; REGISTRY §P9-6.2 step 4). Reads <browser dir>/p11-steps/{touched.txt,base-specs.txt}
# (the specs pass 11's own changes touch, by the graph and by the route they open) and the committed full runs
# (<browser dir>/{base.json,route.json,reruns/}). In order:
#   1. base   the floor base's own seat over the touched specs' base keys: p11-steps/base.json
#   2. rekey  tools/rekey.mjs onto the route tree: p11-steps/base.rekeyed.json
#   3. route  the route tree's own seat over the touched specs, against the re-keyed base:
#             p11-steps/route.json
#   4. tally  tools/browser-tally.mjs over the committed full runs, the committed P7-R2 reruns, pass 10's
#             touched-spec pair, and the two new runs, each pair one more rerun per tree: p11-steps/tally.txt (exit 0 GREEN, 1 a base-green key
#             not held, 2 no verdict)
# Each seat run is the tree's own browser.mjs (its own vite server, Playwright's config: workers 1,
# chromium-headless-new). The caller runs this under ~/.claude/guard/guarded. Every step's time and load
# go to p11-steps/runs.txt.
set -u
BASE="$1"; ROUTE="$2"; D="$3"; S="$D/p11-steps"
HERE="$(cd "$(dirname "$0")" && pwd)"
log() { echo "$*" >> "$S/runs.txt"; }
stamp() { echo "$(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"; }
for f in "$S/touched.txt" "$S/base-specs.txt" "$D/base.json" "$D/route.json" "$D/base-rekeyed.json"; do
    [ -s "$f" ] || { echo "browser-touched: $f is missing or empty" >&2; exit 2; }
done

log "base start $(stamp)"; t0=$(date +%s)
(cd "$BASE" && node scripts/structure/browser.mjs --root "$BASE" --specs "$(paste -sd, "$S/base-specs.txt")" --out "$S/base.json" --wait 7200 > "$S/base.log" 2>&1)
log "base exit $? $(( $(date +%s) - t0 )) s end $(stamp)"
[ -f "$S/base.json" ] || { log "base: no machine report (no verdict)"; exit 2; }

node "$HERE/rekey.mjs" "$S/base.json" "$ROUTE" "$S/base.rekeyed.json" > "$S/rekey.log" 2>&1 || { log "rekey exit $? (no verdict)"; exit 2; }
log "rekey done $(stamp): $(tail -1 "$S/rekey.log" | cut -c1-300)"

log "route start $(stamp)"; t0=$(date +%s)
(cd "$ROUTE" && node scripts/structure/browser.mjs --root "$ROUTE" --specs "$(paste -sd, "$S/touched.txt")" --base-report "$S/base.rekeyed.json" --out "$S/route.json" --wait 7200 > "$S/route.log" 2>&1)
log "route exit $? $(( $(date +%s) - t0 )) s end $(stamp)"
[ -f "$S/route.json" ] || { log "route: no machine report (no verdict)"; exit 2; }

RR=()
for f in "$D"/reruns/base-*-*.rekeyed.json; do [ -f "$f" ] && RR+=(--base-rerun "$f"); done
for f in "$D"/reruns/route-*-*.json; do [ -f "$f" ] && RR+=(--route-rerun "$f"); done
node "$HERE/browser-tally.mjs" --base "$D/base-rekeyed.json" --route "$D/route.json" "${RR[@]}" --base-rerun "$D/p10-steps/base.rekeyed.json" --route-rerun "$D/p10-steps/route.json" --base-rerun "$S/base.rekeyed.json" --route-rerun "$S/route.json" > "$S/tally.txt" 2>&1
rc=$?
log "tally exit $rc ($(( ${#RR[@]} / 2 + 4 )) rerun reports, the pass-10 and pass-11 pairs included) $(stamp): $(grep '^verdict' "$S/tally.txt")"
exit $rc
