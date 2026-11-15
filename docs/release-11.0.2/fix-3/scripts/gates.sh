#!/bin/bash
# Fix seat 3: the gates on the committed tip, one guarded run at a time.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/fix-3/logs; O=$L/chain.out; G=~/.claude/guard/guarded
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
cd $W
say "gates at $(git rev-parse --short HEAD); dirty: $(git status --porcelain -- src tests tests-visual package.json .bundle-ratchet CHANGELOG.md | wc -l | tr -d ' ')"
$G --light --timeout 15 -- npm run typecheck > $L/typecheck.log 2>&1; say "typecheck rc=$?"
$G --timeout 20 -- npm run build > $L/build.log 2>&1; say "build rc=$?"
$G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; say "demo:dist:build rc=$?"
CI=true $G --timeout 40 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; say "vitest (CI=true) rc=$? $(grep -E '^\s+(Test Files|Tests) ' $L/vitest.log | tr -s ' ' | tr '\n' ' ')"
$G --timeout 15 -- npm run test:browser > $L/test-browser.log 2>&1; say "test:browser rc=$? $(grep -E '^\s+(Test Files|Tests) ' $L/test-browser.log | tr -s ' ' | tr '\n' ' ')"
$G --light --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; say "verify:package rc=$?"
say gates-done
