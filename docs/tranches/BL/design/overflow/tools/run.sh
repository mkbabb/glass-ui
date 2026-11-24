#!/usr/bin/env bash
# run.sh <tag> <engine> <port> <cell:passes>... [-- probe args]
# One guarded probe run per cell, in sequence (one heavy run at a time). Rows land in
# record/raw/. WebKit cells run under guarded --exclusive webkit.
#   tools/run.sh base chromium 5391 390t-light:base,opens,variants,stress 1440-light:base,opens
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
TAG="$1"; ENGINE="$2"; PORT="$3"; shift 3
CELLS=(); EXTRA=()
while [ $# -gt 0 ]; do
    if [ "$1" = "--" ]; then shift; EXTRA=("$@"); break; fi
    CELLS+=("$1"); shift
done
EXCL=()
if [ "$ENGINE" = webkit ]; then EXCL=(--exclusive webkit); fi
for c in "${CELLS[@]}"; do
    cell="${c%%:*}"; passes="${c#*:}"
    echo "== $(date +%T) $TAG $ENGINE $cell $passes"
    # no pipe: a reader that dies must not take the probe with it (SIGPIPE)
    ~/.claude/guard/guarded ${EXCL[@]+"${EXCL[@]}"} --timeout 85 -- node "$HERE/probe.mjs" --engine "$ENGINE" --port "$PORT" --tag "$TAG" --cell "$cell" --passes "$passes" --out "$ROOT/record/raw" --resume ${EXTRA[@]+"${EXTRA[@]}"} >> "$ROOT/trees/probe-$TAG-$ENGINE-$cell.log" 2>&1
    echo "== $(date +%T) exit $?"
done
