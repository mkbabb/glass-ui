#!/bin/zsh
# fix round 3 reveal probe (the spec and config are scratch files, removed after the run).
set -u
cd ${0:A:h:h:h:h}
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5247}
if [[ $1 == webkit ]]; then CFG=(-c tests-visual/zz-probe-fix3.config.ts --project=webkit)
else CFG=(-c tests-visual/zz-probe-fix3.config.ts --project=chromium-headless-new); fi
npx playwright test $CFG --workers=1 --reporter=line
