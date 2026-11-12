#!/bin/zsh
# 10.1.5 fix round 10, pre-commit try in one engine: the D-1 zoom cell x$2 (default 8), then p1/p2/n1/r1/g4/q1.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 60 -- zsh docs/release-10.1.5/scripts/try-fix-10.sh chromium|webkit [n]
set -u
ENGINE=$1; N=${2:-8}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-10/try
mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5291}
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/release-10-1-5-fix-10.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
npx playwright test $CFG release-10-1-3.spec.ts --grep "bottom-anchored · ancestor zoom" --repeat-each=$N --workers=1 > $L/d1-$ENGINE.log 2>&1
echo "d1 exit=$?"
npx playwright test $CFG release-10-1-5.spec.ts --grep " p1 | p2 | n1 | r1 | g4 | q1 " --workers=1 > $L/try-$ENGINE.log 2>&1
echo "try exit=$?"
