#!/usr/bin/env bash
# Critic round 1 gates on the committed tree, as ONE guarded heavy run, after the witness
# chain (one heavy run per seat). No rebind: a critic reads the ratchet, it never moves it.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
cd "$HERE/../../.."
until grep -q CRITIC-CHAIN-DONE "$HERE/chain.log" 2>/dev/null; do sleep 30; done
D=$HERE/gates; mkdir -p "$D"
echo "--- committed tree $(git rev-parse --short HEAD), $(date '+%F %T'), status: $(git status --porcelain -- src package.json .bundle-ratchet | wc -l | tr -d ' ') changed src files" >> "$D/chain.log"
~/.claude/guard/guarded --timeout 80 -- bash -c '
  D='"$D"'
  run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; return $rc; }
  run build npm run build
  run typecheck npm run typecheck
  run demo-dist-build npm run demo:dist:build
  run vitest npx vitest run --maxWorkers=2
  run verify-package npm run verify:package'
echo "$(date +%T) gates exit $?" >> "$D/chain.log"
echo GATES-DONE >> "$D/chain.log"
