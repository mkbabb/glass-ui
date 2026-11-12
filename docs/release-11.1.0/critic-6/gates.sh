#!/usr/bin/env bash
# Fix 2 build-side gates on the COMMITTED tree, as ONE guarded heavy run: build,
# typecheck, demo:dist:build (the boot-graph test reads dist-demo), vitest,
# verify:package (the bundle ratchet included). No automatic ratchet rebind: a rise is
# read and recorded by hand. Exit codes in gates/chain.log.
set -u
cd "$(dirname "$0")/../../.."
D=docs/release-11.1.0/critic-6/gates
G=~/.claude/guard/guarded
mkdir -p "$D"
echo "--- committed-tree chain at $(git rev-parse --short HEAD), $(date '+%F %T'), dirty src: $(git status --short -- src package.json tests | wc -l | tr -d ' ')" >> "$D/chain.log"
$G --timeout 80 -- bash -c '
  D='"$D"'
  run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; return $rc; }
  run build npm run build
  run typecheck npm run typecheck
  run demo-dist-build npm run demo:dist:build
  run vitest npx vitest run --maxWorkers=2
  run verify-package npm run verify:package'
echo "$(date +%T) gates chain exit $?" >> "$D/chain.log"
