#!/usr/bin/env bash
# Fix 4 — gates on the committed tree. Each run its own guarded call, one at a time;
# every WebKit run under --exclusive webkit.
cd "$(dirname "$0")/../../.."
D=docs/release-11.0.0/fix-4
G=~/.claude/guard/guarded
SMOKE_OUT="${SMOKE_OUT:?}"
run() { local name=$1; shift; "$@" > "$D/$name.log" 2>&1; echo "$name exit $? $(date +%T)" >> "$D/chain.log"; }
: > "$D/chain.log"
echo "HEAD $(git rev-parse --short HEAD)" >> "$D/chain.log"
run build $G --timeout 20 -- npm run build
run typecheck $G --timeout 20 -- npm run typecheck
run demo-dist-build $G --timeout 20 -- npm run demo:dist:build
run vitest $G --timeout 40 -- npx vitest run --maxWorkers=2
run verify-package $G --timeout 30 -- npm run verify:package
run atlas-smoke $G --timeout 20 -- bash docs/release-11.0.0/atlas-smoke/smoke.sh "$SMOKE_OUT"
PI_REPORT=$PWD/$D/shell-identity-chromium.json GLASS_UI_DEMO_PORT=7981 run shell-identity-chromium $G --timeout 20 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 shell-identity
PI_REPORT=$PWD/$D/shell-identity-webkit.json GLASS_UI_DEMO_PORT=7982 run shell-identity-webkit $G --exclusive webkit --timeout 20 -- npx playwright test -c $D/shell-identity-webkit.config.ts --workers=1
echo ALLDONE >> "$D/chain.log"
