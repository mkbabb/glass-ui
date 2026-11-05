#!/bin/bash
# critique-3 WebKit 2287 chain: probe on the branch, then probe on a v10.1.3 source swap
# (useResizeObserver.ts and capture.css; restored in a trap).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-10.1.4
D=$W/docs/release-10.1.4/critique-3
SRC=(src/composables/dom/useResizeObserver.ts src/components/deck/styles/capture.css)
restore() { cd "$W" && git checkout HEAD -- "${SRC[@]}"; }
trap restore EXIT
export GLASS_UI_DEMO_PORT=5394
cd "$W/tests-visual"
PROBE_OUT=$D/branch PI_REPORT=$D/branch/webkit.json \
  npx playwright test -c ../docs/release-10.1.4/critique-3/critique.config.ts --project=webkit --workers=1 \
  > "$D/branch/probe-webkit.log" 2>&1
echo "probe-branch rc=$?"
cd "$W"
for f in "${SRC[@]}"; do git show "v10.1.3:$f" > "$f"; done
cd "$W/tests-visual"
PROBE_OUT=$D/v1013 PI_REPORT=$D/v1013/webkit.json \
  npx playwright test -c ../docs/release-10.1.4/critique-3/critique.config.ts --project=webkit --workers=1 \
  > "$D/v1013/probe-webkit.log" 2>&1
echo "probe-v1013 rc=$?"
