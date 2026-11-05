#!/bin/bash
# critique-4 chromium chain: probe on the branch, then on a v10.1.3 source swap of the four
# cured files (restored in a trap).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-10.1.4
D=$W/docs/release-10.1.4/critique-4
SRC=(src/composables/dom/useResizeObserver.ts src/components/deck/styles/capture.css src/components/data-table/DataTable.vue src/components/data-table/composables/useDataTableResponsive.ts)
restore() { cd "$W" && git checkout HEAD -- "${SRC[@]}"; }
trap restore EXIT
export GLASS_UI_DEMO_PORT=5395
cd "$W/tests-visual"
PROBE_OUT=$D/branch PI_REPORT=$D/branch/chromium.json \
  npx playwright test -c ../docs/release-10.1.4/critique-4/critique.config.ts --project=chromium-headless-new --workers=1 \
  > "$D/branch/probe-chromium.log" 2>&1
echo "probe-branch rc=$?"
cd "$W"
for f in "${SRC[@]}"; do git show "v10.1.3:$f" > "$f"; done
cd "$W/tests-visual"
PROBE_OUT=$D/v1013 PI_REPORT=$D/v1013/chromium.json \
  npx playwright test -c ../docs/release-10.1.4/critique-4/critique.config.ts --project=chromium-headless-new --workers=1 \
  > "$D/v1013/probe-chromium.log" 2>&1
echo "probe-v1013 rc=$?"
