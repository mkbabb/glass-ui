#!/usr/bin/env bash
# Fix 4, after the witness: the committed-tree gates as one guarded heavy run, then the
# touched e2e specs on the branch, Chromium, then WebKit 2287 under --exclusive webkit.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded
LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
cd "$ROOT"
df -h /System/Volumes/Data | tail -1 | sed 's/^/disk /' >> "$LOG"
mkdir -p "$HERE/gates" "$HERE/e2e"
say "gates on committed tree $(git rev-parse --short HEAD), dirty src: $(git status --short -- src package.json tests | wc -l | tr -d ' ')"
$G --timeout 80 -- bash -c '
  D='"$HERE/gates"'
  run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; }
  run build npm run build
  run typecheck npm run typecheck
  run demo-dist-build npm run demo:dist:build
  run vitest npx vitest run --maxWorkers=2
  run verify-package npm run verify:package'
say "gates guarded exit $?: $(tr '\n' ';' < "$HERE/gates/chain.log")"
[ "${STAGES:-all}" = gates ] && { say "CHAIN-DONE (gates only)"; exit 0; }
SPECS="disclosure-rotate.spec.ts SegmentedTabs.glide.spec.ts tabs-std.spec.ts a11y-slider.spec.ts aria-orientation.spec.ts"
PI_REPORT=$HERE/e2e/chromium-branch.json GLASS_UI_DEMO_PORT=8783 $G --timeout 45 -- \
  npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $SPECS > "$HERE/e2e/chromium-branch.log" 2>&1
say "e2e chromium branch exit $?"
F2_ROOT=$ROOT PI_REPORT=$HERE/e2e/webkit-branch.json GLASS_UI_DEMO_PORT=8784 $G --exclusive webkit --timeout 45 -- \
  npx playwright test -c docs/release-11.1.0/fix-3/e2e-webkit.config.ts --workers=1 > "$HERE/e2e/webkit-branch.log" 2>&1
say "e2e webkit branch exit $?"
say "CHAIN-DONE"
