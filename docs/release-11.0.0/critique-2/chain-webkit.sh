#!/usr/bin/env bash
# Critique 2 — the posture probe in Chromium, then the WebKit chain (each run guarded,
# WebKit under --exclusive webkit), then the non-browser gates. One run at a time.
cd "$(dirname "$0")/../../.."
D=docs/release-11.0.0/critique-2
G=~/.claude/guard/guarded
run() { local name=$1; shift; "$@" > "$D/$name.log" 2>&1; echo "$name exit $?" >> "$D/chain-webkit.log"; }
: > "$D/chain-webkit.log"
PI_REPORT=$PWD/$D/posture-chromium.json GLASS_UI_DEMO_PORT=7951 run posture-chromium $G --timeout 20 -- npx playwright test -c $D/posture.config.ts --project=chromium-1440-fine --project=chromium-390-coarse --workers=1
PI_REPORT=$PWD/$D/posture-webkit.json GLASS_UI_DEMO_PORT=7952 run posture-webkit $G --exclusive webkit --timeout 20 -- npx playwright test -c $D/posture.config.ts --project=webkit-1440-fine --project=webkit-390-coarse --workers=1
PI_REPORT=$PWD/$D/release-webkit.json GLASS_UI_DEMO_PORT=7953 run release-webkit $G --exclusive webkit --timeout 40 -- npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 release-10-1-3 release-10-1-4
PI_REPORT=$PWD/$D/u-line-webkit.json GLASS_UI_DEMO_PORT=7954 run u-line-webkit $G --exclusive webkit --timeout 45 -- npx playwright test -c docs/release-11.0.0/u-line-webkit.config.ts --workers=1
run typecheck $G --timeout 20 -- npm run typecheck
run verify-package $G --timeout 30 -- npm run verify:package
echo ALLDONE >> "$D/chain-webkit.log"
