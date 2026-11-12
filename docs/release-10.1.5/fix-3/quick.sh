#!/bin/zsh
# fix round 3 quick WebKit arm: the e3/e4 cells, then 10.1.3 D-1 three times (the g6 frame-step cell).
set -u
cd ${0:A:h:h:h:h}
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5247}
CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
PI_REPORT=$PWD/docs/release-10.1.5/fix-3/quick2-webkit.json npx playwright test $CFG release-10-1-5.spec.ts --grep " e[34] " --workers=1 > docs/release-10.1.5/fix-3/quick2-webkit.log 2>&1
PI_REPORT=$PWD/docs/release-10.1.5/fix-3/quick-d1-webkit.json npx playwright test $CFG release-10-1-3.spec.ts --grep "ancestor zoom 1.25 .*D-1" --repeat-each=3 --workers=1 > docs/release-10.1.5/fix-3/quick-d1-webkit.log 2>&1
echo quick done
