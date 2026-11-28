#!/usr/bin/env bash
# run-round.sh <base-tree> <cure-tree> <data-dir> <log-dir> [cells]
# Builds both trees, serves them on 5371 (base) and 5372 (cure), runs probe.mjs on each in
# Chromium and then in WebKit (under the machine's exclusive WebKit lock), and stops the
# servers on exit. Every step runs under the guard, one at a time. A step the guard stops
# or refuses is logged and the chain goes on to the next; nothing is retried.
# SKIP_BUILD=1 serves the trees' existing dist-demo.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
BASE="$(cd "$1"; pwd)"; CURE="$(cd "$2"; pwd)"
DATA="$(mkdir -p "$3"; cd "$3"; pwd)"; LOGS="$(mkdir -p "$4"; cd "$4"; pwd)"
CELLS="${5:-}"
G=~/.claude/guard/guarded
stamp() { date "+%H:%M:%S"; }

if [ "${SKIP_BUILD:-}" != 1 ]; then
    echo "$(stamp) build base"; "$G" --timeout 20 -- "$HERE/build-tree.sh" "$BASE" > "$LOGS/build-base.log" 2>&1; echo "$(stamp) build base rc=$?"
    echo "$(stamp) build cure"; "$G" --timeout 20 -- "$HERE/build-tree.sh" "$CURE" > "$LOGS/build-cure.log" 2>&1; echo "$(stamp) build cure rc=$?"
fi

"$G" --light --timeout 80 -- "$HERE/serve.sh" "$BASE" 5371 > "$LOGS/serve-base.log" 2>&1 &
SB=$!
"$G" --light --timeout 80 -- "$HERE/serve.sh" "$CURE" 5372 > "$LOGS/serve-cure.log" 2>&1 &
SC=$!
trap 'kill $SB $SC 2>/dev/null; wait $SB $SC 2>/dev/null; echo "$(stamp) servers stopped"' EXIT
for port in 5371 5372; do
    for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$port/" && break; sleep 1; done
done

cd "$HERE"
for engine in chromium webkit; do
    for build in base cure; do
        port=5371; [ "$build" = cure ] && port=5372
        ex=""; [ "$engine" = webkit ] && ex="--exclusive webkit"
        echo "$(stamp) probe $engine $build"
        # shellcheck disable=SC2086
        "$G" $ex --timeout 30 -- node probe.mjs "$engine" "$port" "$DATA/$engine-$build.json" $CELLS > "$LOGS/probe-$engine-$build.log" 2>&1
        echo "$(stamp) probe $engine $build rc=$?"
    done
done
