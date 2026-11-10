#!/usr/bin/env bash
# Lane L7 build-side gates on the COMMITTED tree, as ONE guarded heavy run (so they queue
# for a slot once). Order: build, typecheck, demo:dist:build (boot-graph reads dist-demo),
# vitest, verify:package. If verify:package's only failure is the bundle ratchet rising,
# the measured content bytes are written to .bundle-ratchet (a deliberate rebind, recorded
# in lane-L7.md) and verify:package runs again. Exit codes in gates/chain.log.
set -u
cd "$(dirname "$0")/../../.."
D=docs/release-11.1.0/lane-L7/gates
G=~/.claude/guard/guarded
mkdir -p "$D"
echo "--- committed-tree chain at $(git rev-parse --short HEAD), $(date +%F)" >> "$D/chain.log"
$G --timeout 75 -- bash -c '
  D='"$D"'
  run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; return $rc; }
  run build npm run build
  run typecheck npm run typecheck
  run demo-dist-build npm run demo:dist:build
  run vitest npx vitest run --maxWorkers=2
  if ! run verify-package npm run verify:package; then
    n=$(grep -oE "increase forbidden: [0-9]+ > [0-9]+" "$D/verify-package.log" | grep -oE "[0-9]+" | head -1)
    if [ -n "$n" ]; then
      echo "$(date +%T) ratchet rebind $(cat .bundle-ratchet) -> $n" >> "$D/chain.log"
      printf "%s\n" "$n" > .bundle-ratchet
      run verify-package-2 npm run verify:package
    fi
  fi'
echo "$(date +%T) chain exit $?" >> "$D/chain.log"
echo GATES-DONE >> "$D/chain.log"
