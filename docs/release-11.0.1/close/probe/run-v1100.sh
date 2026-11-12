#!/bin/zsh
# The same probe on the v11.0.0 tree (.cache/close/v1100, git archive v11.0.0 without docs).
#   ~/.claude/guard/guarded --timeout 15 -- zsh docs/release-11.0.1/close/probe/run-v1100.sh
set -u
P=${0:A:h}; T=${P:h:h:h:h}/.cache/close/v1100; cd $T
export GLASS_UI_DEMO_PORT=5338 GLASS_UI_DEMO_URL=http://localhost:5338
npx playwright test -c close-probe/probe.config.ts --workers=1 > $P/probe-v1100.log 2>&1
echo "probe rc=$?" >> $P/probe-v1100.log
cp close-probe/*.png $P/ 2>/dev/null; for f in close-probe/*.png(N); do mv $P/${f:t} $P/v1100-${f:t}; done
