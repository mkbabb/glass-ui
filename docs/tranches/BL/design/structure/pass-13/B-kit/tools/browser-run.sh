#!/usr/bin/env bash
# browser-run.sh <base tree> <route tree> <browser dir> — the browser bar's procedure after the base
# run (LAW §13, pass 8). Reads from <browser dir> the committed selection (moved.json, changed.txt,
# specs.txt; tools/browser-select.mjs) and the base run's report (base.json, run by
#   node <base>/scripts/structure/browser.mjs --root <base> --specs "$(paste -sd, base-specs.txt)" --out base.json
# with base-specs.txt from tools/base-specs.mjs). Then, in order:
#   1. rekey   tools/rekey.mjs base.json <route tree> base-rekeyed.json (P6-F2)
#   2. route   the route tree's own seat over the graph's bands (--moved, every --changed) and every
#              spec the chain moves, creates or edits by name (--specs, P7-G3), against the re-keyed
#              base (--base-report): route.json, route.log
#   3. reruns  tools/flake-reruns.sh (P7-R2: each spec holding a key the full runs leave unheld,
#              alone, alternating base then route, three times per tree): reruns/
#   4. tally   tools/browser-tally.mjs over the full runs and every rerun: tally.txt (exit 0 GREEN,
#              1 a base-green key not held)
# Every step's time and load go to runs.txt.
set -u
BASE="$1"; ROUTE="$2"; D="$3"
HERE="$(cd "$(dirname "$0")" && pwd)"
log() { echo "$*" >> "$D/runs.txt"; }
stamp() { echo "$(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"; }
[ -f "$D/base.json" ] || { echo "browser-run: no base report at $D/base.json" >&2; exit 2; }

log "rekey start $(stamp)"
node "$HERE/rekey.mjs" "$D/base.json" "$ROUTE" "$D/base-rekeyed.json" > "$D/rekey.log" 2>&1 || { log "rekey exit $? (no verdict)"; exit 2; }
log "rekey done $(stamp): $(tail -1 "$D/rekey.log")"

CH=(); while IFS= read -r c; do [ -n "$c" ] && CH+=(--changed "$c"); done < "$D/changed.txt"
log "route start $(stamp)"
t0=$(date +%s)
(cd "$ROUTE" && node scripts/structure/browser.mjs --root "$ROUTE" --moved "$D/moved.json" "${CH[@]}" \
    --specs "$(paste -sd, "$D/specs.txt")" --base-report "$D/base-rekeyed.json" --out "$D/route.json" --wait 14400 > "$D/route.log" 2>&1)
log "route exit $? $(( $(date +%s) - t0 )) s end $(stamp)"
[ -f "$D/route.json" ] || { log "route: no machine report (no verdict)"; exit 2; }

log "reruns start $(stamp)"
bash "$HERE/flake-reruns.sh" "$BASE" "$ROUTE" "$D" > "$D/reruns.log" 2>&1
log "reruns exit $? end $(stamp)"

RR=()
for f in "$D"/reruns/base-*-*.rekeyed.json; do [ -f "$f" ] && RR+=(--base-rerun "$f"); done
for f in "$D"/reruns/route-*-*.json; do [ -f "$f" ] && RR+=(--route-rerun "$f"); done
node "$HERE/browser-tally.mjs" --base "$D/base-rekeyed.json" --route "$D/route.json" "${RR[@]}" > "$D/tally.txt" 2>&1
rc=$?
log "tally exit $rc ($(( ${#RR[@]} / 2 )) rerun reports) $(stamp): $(grep '^verdict' "$D/tally.txt")"
exit $rc
