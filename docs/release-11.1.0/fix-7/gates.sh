#!/usr/bin/env bash
# Fix 7: the committed-tree gates, one guarded heavy run.
set -u
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.0
D=$R/docs/release-11.1.0/fix-7/gates/${1:-merge}
mkdir -p "$D"
cd "$R"
echo "HEAD $(git rev-parse --short HEAD) dirty-src $(git status --short -- src package.json tests CHANGELOG.md .bundle-ratchet | wc -l | tr -d ' ')" > "$D/chain.log"
"$HOME/.claude/guard/guarded" --timeout 80 -- bash -c '
  D='"$D"'
  run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; }
  run build npm run build
  run typecheck npm run typecheck
  run demo-dist-build npm run demo:dist:build
  run vitest npx vitest run --maxWorkers=2
  run verify-package npm run verify:package'
echo "guarded exit $?" >> "$D/chain.log"
