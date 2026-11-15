#!/bin/bash
# Build seat B's Chromium cells (chromium-headless-new and coarse-touch), one guarded call each.
#   build-B-chromium.sh <tree: branch|v1101|v1100> <log-name> <grep> [spec]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/logs
case $1 in branch) D=$W; P=5341;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5342;; v1100) D=$W/.cache/red-v11.0.0/tree; P=5343;; esac
cd "$D" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded --timeout ${TIMEOUT:-20} -- npx playwright test -c tests-visual/playwright.config.ts ${4:-release-11-0-2.spec.ts} --project=chromium-headless-new --project=coarse-touch --workers=1 -g "$3" > $L/$2.log 2>&1; rc=$?
echo "$(date +%H:%M:%S) $2 exit $rc" >> $L/chromium-chain-B.out
