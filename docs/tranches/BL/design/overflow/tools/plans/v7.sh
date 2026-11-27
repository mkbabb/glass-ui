#!/usr/bin/env bash
# v7.sh <engine> <out-name> <dist:port>... [-- <name:port>...]
# One guarded run: a vite preview of each dist of the round-3 tree (OVF_TREE, default
# trees/r3b) on its port, then v7.mjs over the named builds. A name after `--` reads a
# port already served under another build name with the rule v7.mjs injects for it
# (`v7-nohdr`). The previews are this script's children and stop with it.
#   ~/.claude/guard/guarded --timeout 30 -- tools/plans/v7.sh chromium v7 dist-base:5391 dist-cure6:5392 dist-cure7:5393 -- v7-nohdr:5393
#   ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- tools/plans/v7.sh webkit v7 dist-base:5394 dist-cure6:5395 dist-cure7:5396
# V7_PROBE=v7-side.mjs reads /ovf.html?v7side instead (the side sheet's header):
#   V7_PROBE=v7-side.mjs ~/.claude/guard/guarded --timeout 30 -- tools/plans/v7.sh chromium v7-side dist-base:5391 dist-cure6:5392 dist-cure7tb:5393 dist-cure7:5394
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
TREE="$ROOT/trees/${OVF_TREE:-r3b}"
ENGINE="$1"; NAME="$2"; shift 2
SRVS=""
trap 'for p in $SRVS; do kill "$p" 2>/dev/null; done' EXIT
ARGS=()
PORTS=""
while [ $# -gt 0 ] && [ "$1" != "--" ]; do
    spec="$1"; shift
    dir="${spec%%:*}"; port="${spec#*:}"
    # A port another lane serves would be read as this build: refuse it.
    if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$port/"; then echo "port $port is already served"; exit 2; fi
    ( cd "$TREE" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$dir" --host 127.0.0.1 --port "$port" --strictPort ) > "$ROOT/trees/serve-$port.log" 2>&1 &
    SRVS="$SRVS $!"; PORTS="$PORTS $port"
    name="${dir#dist-}"; name="${name/cure/v}"
    ARGS+=("$name:$port")
done
[ "${1:-}" = "--" ] && shift
ARGS+=("$@")
for port in $PORTS; do for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$port/ovf.html" && break; sleep 1; done; done
mkdir -p "$ROOT/record/inspect"
OVF_TREE="${OVF_TREE:-r3b}" node "$HERE/${V7_PROBE:-v7.mjs}" "$ENGINE" "$ROOT/record/inspect/$NAME.$ENGINE.json" "${ARGS[@]}" > "$ROOT/trees/$NAME.$ENGINE.log" 2>&1
echo "probe exit $?"
