#!/usr/bin/env bash
# round3.sh <engine> <out-name> <dist:port>... [-- <name:port[:css]>...]
# One guarded run: a vite preview of each dist of trees/v11.1.1 (or OVF_TREE) on its port, then
# round3.mjs over the named builds. The previews are this script's children and stop
# with it.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
TREE="$ROOT/trees/${OVF_TREE:-v11.1.1}"
ENGINE="$1"; NAME="$2"; shift 2
SRVS=""
trap 'for p in $SRVS; do kill "$p" 2>/dev/null; done' EXIT
PORTS=""
while [ $# -gt 0 ] && [ "$1" != "--" ]; do
    dir="${1%%:*}"; port="${1#*:}"; shift
    ( cd "$TREE" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$dir" --host 127.0.0.1 --port "$port" --strictPort ) > "$ROOT/trees/serve-$port.log" 2>&1 &
    SRVS="$SRVS $!"; PORTS="$PORTS $port"
done
[ "${1:-}" = "--" ] && shift
for port in $PORTS; do for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$port/ovf.html" && break; sleep 1; done; done
REC="${R3_REC:-$ROOT/record}"
mkdir -p "$REC/inspect" "$REC/shots"
node "$HERE/round3.mjs" "$ENGINE" "$REC/inspect/$NAME.$ENGINE.json" "$REC/shots" "$@" > "$ROOT/trees/$NAME.$ENGINE.log" 2>&1
echo "probe exit $?"
