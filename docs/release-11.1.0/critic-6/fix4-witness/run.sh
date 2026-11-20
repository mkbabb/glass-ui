#!/usr/bin/env bash
# One guarded browser run per engine: for each <label>=<tree>, copy the witness into the
# tree, serve it (a warm pass settles the shared Vite optimize cache, then a fresh server),
# run witness.mjs, stop the server.   run.sh <engine> <port> <label>=<tree> ...
set -u
ENGINE=$1; PORT=$2; shift 2
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out; mkdir -p "$OUT"
P=/docs/release-11.1.0/fix-4/witness/harness
up() { for i in $(seq 1 90); do curl -sf "http://127.0.0.1:$PORT$P/index.html" > /dev/null && return 0; kill -0 $1 2>/dev/null || return 1; sleep 2; done; return 1; }
RC=0
for spec in "$@"; do
  LABEL=${spec%%=*}; TREE=${spec#*=}
  SRC=$(cd "$HERE/../.." && pwd)/fix-4/witness/harness
  if [ ! -d "$TREE/docs/release-11.1.0/fix-4/witness/harness" ]; then
    mkdir -p "$TREE/docs/release-11.1.0/fix-4/witness"; cp -R "$SRC" "$TREE/docs/release-11.1.0/fix-4/witness/"
  fi
  ( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$LABEL-$ENGINE-warm.log" 2>&1 &
  S=$!
  up $S && { curl -sf "http://127.0.0.1:$PORT$P/harness.ts" > /dev/null; sleep 20; curl -sf "http://127.0.0.1:$PORT$P/harness.ts" > /dev/null; }
  kill $S 2>/dev/null; wait $S 2>/dev/null
  ( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$LABEL-$ENGINE-server.log" 2>&1 &
  S=$!
  if up $S; then node "$HERE/witness.mjs" "$ENGINE" "http://127.0.0.1:$PORT" "$OUT" "$LABEL" > "$OUT/$LABEL-$ENGINE.log" 2>&1; rc=$?; else rc=3; fi
  kill $S 2>/dev/null; wait $S 2>/dev/null
  echo "$(date +%T) $LABEL $ENGINE exit $rc :: $(tail -1 "$OUT/$LABEL-$ENGINE.log" 2>/dev/null)" | tee -a "$OUT/chain.log"
  [ $rc = 0 ] || RC=1
done
exit $RC
