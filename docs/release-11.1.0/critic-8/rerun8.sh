#!/usr/bin/env bash
# Critic 8 reruns, WebKit, one guarded run at a time: the critic-2 pixel reader three times,
# lane L2 and lane L7 on the branch once more (first passes kept in out-first/).
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
mkdir -p "$HERE/release-rerun"
cd "$ROOT"
export GLASS_UI_DEMO_PORT=5492 GLASS_UI_DEMO_URL=http://localhost:5492
for i in 1 2 3; do
  CRITIC_OUT=$HERE/release-rerun/c2-shots-$i PI_REPORT=$HERE/release-rerun/c2-wk-$i.json $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit release-11-0-1-critic-2.spec.ts --workers=1 > "$HERE/release-rerun/c2-wk-$i.log" 2>&1
  say "release-11-0-1-critic-2 webkit rerun $i exit $?: load $(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' "$HERE/release-rerun/c2-wk-$i.log" | tr -s ' ' | tr '\n' ' ')"
done
"$HERE/rerun/lane-L2/witness.sh" "$ROOT" 8821 green green webkit
say "lane L2 webkit rerun: $(grep -v '^\s*$' "$HERE/rerun/lane-L2/out/green-webkit.log" | tail -1 | cut -c1-300)"
"$HERE/rerun/lane-L7/witness.sh" "$ROOT" 8871 green green webkit
say "lane L7 webkit rerun: $(grep -v '^\s*$' "$HERE/rerun/lane-L7/out/green-webkit.log" | tail -1 | cut -c1-200)"
say "RERUN8-DONE"
