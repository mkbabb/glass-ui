#!/usr/bin/env bash
# Critique 4 — the full gate chain on the committed tree. Each run its own guarded call,
# one at a time; every WebKit run under --exclusive webkit.
cd "$(dirname "$0")/../../.."
D=docs/release-11.0.0/critique-4
C2=docs/release-11.0.0/critique-2
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
PI_REPORT=$PWD/$D/release-chromium.json GLASS_UI_DEMO_PORT=7981 run release-chromium $G --timeout 40 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 release-10-1-3 release-10-1-4
PI_REPORT=$PWD/$D/u-b7-chromium.json GLASS_UI_DEMO_PORT=7982 run u-b7-chromium $G --timeout 30 -- npx playwright test -c tests-visual/u-b7/playwright.config.ts --project=chromium-desk --project=chromium-coarse --workers=1
PI_REPORT=$PWD/$D/b7-shape-chromium.json GLASS_UI_DEMO_PORT=7983 run b7-shape-chromium $G --timeout 30 -- npx playwright test -c tests-visual/b7-shape.config.ts --project=chromium --workers=1
PI_REPORT=$PWD/$D/posture-chromium.json GLASS_UI_DEMO_PORT=7984 run posture-chromium $G --timeout 20 -- npx playwright test -c $C2/posture.config.ts --project=chromium-1440-fine --project=chromium-390-coarse --workers=1
PI_REPORT=$PWD/$D/release-webkit.json GLASS_UI_DEMO_PORT=7985 run release-webkit $G --exclusive webkit --timeout 40 -- npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 release-10-1-3 release-10-1-4
PI_REPORT=$PWD/$D/u-line-webkit.json GLASS_UI_DEMO_PORT=7986 run u-line-webkit $G --exclusive webkit --timeout 45 -- npx playwright test -c docs/release-11.0.0/u-line-webkit.config.ts --workers=1
PI_REPORT=$PWD/$D/posture-webkit.json GLASS_UI_DEMO_PORT=7987 run posture-webkit $G --exclusive webkit --timeout 20 -- npx playwright test -c $C2/posture.config.ts --project=webkit-1440-fine --project=webkit-390-coarse --workers=1
echo ALLDONE >> "$D/chain.log"
