#!/bin/bash
# critique-4 WebKit 2287, one exclusive lock: the release specs, then the probe chain.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-10.1.4
D=$W/docs/release-10.1.4/critique-4
cd "$W/tests-visual"
GLASS_UI_DEMO_PORT=5396 PLAYWRIGHT_JSON_OUTPUT_NAME=$D/branch/release-webkit.json \
  npx playwright test -c webkit-2287.config.ts release-10-1-3.spec.ts release-10-1-4.spec.ts --project=webkit --workers=1 --reporter=list,json \
  > "$D/branch/release-webkit.log" 2>&1
echo "release-webkit rc=$?"
"$D/webkit-chain.sh"
