#!/usr/bin/env bash
# Critic 8: the critic-2 pixel reader (WebKit 2287) on the pre-fix-8 tree and on v11.0.1,
# to place the dark-390c vertical miss. One guarded run at a time.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
export GLASS_UI_DEMO_PORT=5495 GLASS_UI_DEMO_URL=http://localhost:5495
for spec in pre-1=f8-pre v1101-1=f7-v1101 pre-2=f8-pre v1101-2=f7-v1101; do
  L=${spec%%=*}; T=$ROOT/.cache/${spec#*=}
  ( cd "$T" && CRITIC_OUT=$HERE/release-rerun/c2-shots-$L PI_REPORT=$HERE/release-rerun/c2-wk-$L.json $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit release-11-0-1-critic-2.spec.ts --workers=1 ) > "$HERE/release-rerun/c2-wk-$L.log" 2>&1
  say "release-11-0-1-critic-2 webkit on $L (${spec#*=}) exit $?: load $(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' "$HERE/release-rerun/c2-wk-$L.log" | tr -s ' ' | tr '\n' ' ')"
  grep -q 'REFUSED' "$HERE/release-rerun/c2-wk-$L.log" && { say "STOP: guarded REFUSED"; exit 75; }
done
say "RERUN8B-DONE"
