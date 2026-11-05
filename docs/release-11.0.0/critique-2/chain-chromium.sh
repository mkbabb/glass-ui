#!/usr/bin/env bash
# Critique 2 — the Chromium chain. Each run its own guarded call, one at a time.
cd "$(dirname "$0")/../../.."
D=docs/release-11.0.0/critique-2
G=~/.claude/guard/guarded
SMOKE_OUT="${SMOKE_OUT:?}"
run() { local name=$1; shift; "$@" > "$D/$name.log" 2>&1; echo "$name exit $?" >> "$D/chain-chromium.log"; }
: > "$D/chain-chromium.log"
run build $G --timeout 20 -- npm run build
run atlas-smoke $G --timeout 20 -- bash docs/release-11.0.0/atlas-smoke/smoke.sh "$SMOKE_OUT"
PI_REPORT=$PWD/$D/release-chromium.json GLASS_UI_DEMO_PORT=7931 run release-chromium $G --timeout 40 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 release-10-1-3 release-10-1-4
PI_REPORT=$PWD/$D/u-b7-chromium.json GLASS_UI_DEMO_PORT=7932 run u-b7-chromium $G --timeout 30 -- npx playwright test -c tests-visual/u-b7/playwright.config.ts --project=chromium-desk --project=chromium-coarse --workers=1
PI_REPORT=$PWD/$D/b7-shape-chromium.json GLASS_UI_DEMO_PORT=7933 run b7-shape-chromium $G --timeout 30 -- npx playwright test -c tests-visual/b7-shape.config.ts --project=chromium --workers=1
echo ALLDONE >> "$D/chain-chromium.log"
