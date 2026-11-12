#!/bin/zsh
# ~/.claude/guard/guarded --timeout 15 -- zsh docs/release-11.0.1/close/probe/run.sh
set -u
P=${0:A:h}; cd ${P:h:h:h:h}
export GLASS_UI_DEMO_PORT=5337 GLASS_UI_DEMO_URL=http://localhost:5337
npx playwright test -c docs/release-11.0.1/close/probe/probe.config.ts --workers=1 > $P/probe.log 2>&1
echo "probe rc=$?" >> $P/probe.log
