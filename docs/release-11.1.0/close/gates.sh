#!/usr/bin/env bash
# The 11.1.0 close: release.yml's checks and scripts/release.sh's local legs, in their order.
#   gates.sh lib       one guarded heavy run: typecheck, build, verify:package, demo:dist:build,
#                      npm test with CI=true (release.yml's test step; prepublishOnly's three)
#   gates.sh browser   one guarded browser run: npm run test:browser, then the three pixel floors
set -u
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.0
D=$R/docs/release-11.1.0/close/gates
mkdir -p "$D"
cd "$R"
G="$HOME/.claude/guard/guarded"
case ${1:-lib} in
  lib)
    echo "$(date +%T) lib HEAD $(git rev-parse --short HEAD) dirty-src $(git status --short -- src package.json tests tests-visual CHANGELOG.md .bundle-ratchet .github scripts | wc -l | tr -d ' ')" >> "$D/chain.log"
    "$G" --timeout 80 -- bash -c '
      D='"$D"'
      run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; }
      run dist-tag node scripts/dist-tag.mjs 11.1.0 11.0.2
      run typecheck npm run typecheck
      run build npm run build
      run verify-package npm run verify:package
      run demo-dist-build npm run demo:dist:build
      run test-ci env CI=true npm test -- --maxWorkers=2'
    echo "$(date +%T) lib guarded exit $?" >> "$D/chain.log";;
  browser)
    echo "$(date +%T) browser HEAD $(git rev-parse --short HEAD)" >> "$D/chain.log"
    "$G" --timeout 60 -- bash -c '
      D='"$D"'
      run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; }
      export GLASS_UI_DEMO_PORT=5743 GLASS_UI_DEMO_URL=http://localhost:5743
      run test-browser npm run test:browser -- --maxWorkers=2
      run pixel-floor npm -w tests-visual run gate:pixel-floor
      run pixel-floor-planted npm -w tests-visual run gate:pixel-floor:planted
      run pixel-floor-planted-flood npm -w tests-visual run gate:pixel-floor:planted:flood'
    echo "$(date +%T) browser guarded exit $?" >> "$D/chain.log";;
esac
