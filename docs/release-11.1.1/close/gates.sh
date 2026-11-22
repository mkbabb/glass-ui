#!/usr/bin/env bash
# The 11.1.1 close: scripts/release.sh's browser half on the worktree at HEAD, in its order.
#   gates.sh browser   one guarded browser run, release.sh's order: prepublishOnly (typecheck, build,
#                      npm test), verify:package, npm run test:browser, then the three pixel floors
#   gates.sh exits     npm -w tests-visual run gate:exits (gate.sh guards each of its sixteen runs)
set -u
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$R/docs/release-11.1.1/close/gates
mkdir -p "$D"
cd "$R"
G="$HOME/.claude/guard/guarded"
case ${1:-browser} in
  browser)
    echo "$(date +%T) browser HEAD $(git rev-parse --short HEAD) dirty-tracked $(git status --porcelain | grep -vc '^??') load $(sysctl -n vm.loadavg)" >> "$D/chain.log"
    "$G" --timeout 60 -- bash -c '
      D='"$D"'
      run() { local n=$1; shift; local s=$(date +%s); "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc $(( $(date +%s) - s ))s" >> "$D/chain.log"; }
      export GLASS_UI_DEMO_PORT=5351 GLASS_UI_DEMO_URL=http://localhost:5351
      run typecheck npm run typecheck
      run build npm run build
      run test-ci env CI=true npm test -- --maxWorkers=2
      run verify-package npm run verify:package
      run test-browser npm run test:browser -- --maxWorkers=2
      run pixel-floor npm -w tests-visual run gate:pixel-floor
      run pixel-floor-planted npm -w tests-visual run gate:pixel-floor:planted
      run pixel-floor-planted-flood npm -w tests-visual run gate:pixel-floor:planted:flood'
    echo "$(date +%T) browser guarded exit $?" >> "$D/chain.log";;
  exits)
    echo "$(date +%T) exits HEAD $(git rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> "$D/chain.log"
    s=$(date +%s)
    GLASS_UI_DEMO_PORT=5352 npm -w tests-visual run gate:exits > "$D/exits.log" 2>&1
    rc=$?
    echo "$(date +%T) exits exit $rc $(( $(date +%s) - s ))s load $(sysctl -n vm.loadavg)" >> "$D/chain.log";;
esac
