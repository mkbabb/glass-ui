#!/usr/bin/env bash
# flake-reruns.sh <base tree> <route tree> <browser dir> — P7-R2's rerun protocol (LAW §13).
# Reads the plan from the two committed full runs (browser-tally.mjs --plan: every spec holding a
# key the full runs leave unheld), then runs each spec alone, alternating base then route, three
# times per tree, through each tree's own browser seat. Every base rerun is re-keyed onto the
# route program (rekey.mjs). Writes, under <browser dir>/reruns/:
#   plan.json; base-<i>-<n>.json (and .log), base-<i>-<n>.rekeyed.json, route-<i>-<n>.json (and .log)
# for spec i (1-based, in plan order) and run n = 1..3; runs.txt with each run's time and load.
set -eu
BASE="$1"; ROUTE="$2"; D="$3"
HERE="$(cd "$(dirname "$0")" && pwd)"
O="$D/reruns"; mkdir -p "$O"
node "$HERE/browser-tally.mjs" --base "$D/base-rekeyed.json" --route "$D/route.json" --plan > "$O/plan.json"
SPECS=$(node -e 'console.log(require(process.argv[1]).rerun.join("\n"))' "$O/plan.json")
[ -z "$SPECS" ] && { echo "no spec to rerun" | tee "$O/runs.txt"; exit 0; }
# the base key of a route key: base.json and base-rekeyed.json align result for result when the
# rekey dropped nothing (refused otherwise)
node -e 'const r = require(process.argv[1]); if ((r.unmapped ?? []).length) { console.error("rekey dropped specs; the base key cannot be read by index"); process.exit(2); }' "$D/base-rekeyed.json"
BASE_TD=$(node -e 'console.log(require(process.argv[1]).testDir)' "$D/base.json")
i=0
for s in $SPECS; do
    i=$((i + 1))
    # the base key: the base report's spec whose re-keyed path is s
    bs=$(node -e 'const [b, r, s] = process.argv.slice(1); const B = require(b), R = require(r); const i = R.results.findIndex((x) => x.spec === s); console.log(i < 0 ? "" : B.results[i].spec)' "$D/base.json" "$D/base-rekeyed.json" "$s")
    for n in 1 2 3; do
        if [ -n "$bs" ]; then
            l0=$(sysctl -n vm.loadavg); t0=$(date +%s)
            (cd "$BASE" && node scripts/structure/browser.mjs --root "$BASE" --specs "$bs" --out "$O/base-$i-$n.json" --wait 7200 > "$O/base-$i-$n.log" 2>&1) || true
            node "$HERE/rekey.mjs" "$O/base-$i-$n.json" "$ROUTE" "$O/base-$i-$n.rekeyed.json" > /dev/null
            echo "spec $i ($s) base run $n: $(( $(date +%s) - t0 )) s, load $l0 -> $(sysctl -n vm.loadavg)" >> "$O/runs.txt"
        fi
        l0=$(sysctl -n vm.loadavg); t0=$(date +%s)
        (cd "$ROUTE" && node scripts/structure/browser.mjs --root "$ROUTE" --specs "$s" --out "$O/route-$i-$n.json" --wait 7200 > "$O/route-$i-$n.log" 2>&1) || true
        echo "spec $i ($s) route run $n: $(( $(date +%s) - t0 )) s, load $l0 -> $(sysctl -n vm.loadavg)" >> "$O/runs.txt"
    done
done
echo "base testDir $BASE_TD; $i spec(s) rerun" >> "$O/runs.txt"
