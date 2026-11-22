#!/bin/bash
# Critic 12 (critics 9, 8 and 6 before it): the earlier release specs on one tree in one engine, one Playwright process
# per step, the whole list inside the caller's one guarded call.
#   reg-inner.sh <branch|red> <ch|wk> step...
#   steps: partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013
set -u
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
RED=$W/.cache/critic12-v11.1.0/tree
L=$W/docs/release-11.1.1/critic-12/logs
label=$1; E=$2; shift 2
case $label in branch) T=$W; P=5353;; red) T=$RED; P=5354;; esac
cd $T
export GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P
export OWNER_OUT=$L/out/owner-$label-$E FIX2_OUT=$L/out/fix2-$label-$E CRITIC_OUT=$L/out/c2-$label-$E
if [ $E = wk ]; then CFG=(-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit); else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
sum() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$1" 2>/dev/null | tr -s ' ' | tr '\n' ' '; }
for n in "$@"; do
  tag=reg-$label-$n-$E; export PI_REPORT=$L/$tag.json
  case $n in
    partA) npx playwright test "${CFG[@]}" release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partB) npx playwright test "${CFG[@]}" release-10-1-5.spec.ts --grep "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    owner) npx playwright test "${CFG[@]}" release-11-0-1.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    daraksha) npx playwright test "${CFG[@]}" release-11-0-1-daraksha.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    fix2) npx playwright test "${CFG[@]}" release-11-0-1-fix-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    c2) npx playwright test "${CFG[@]}" release-11-0-1-critic-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    c1) npx playwright test "${CFG[@]}" release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    r1102) if [ $E = wk ]; then X=(-c tests-visual/release-11-0-2.config.ts --project=webkit); else X=("${CFG[@]}"); fi
      npx playwright test "${X[@]}" release-11-0-2.spec.ts slider-forced-colors.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    r1102b) if [ $E = wk ]; then X=(-c tests-visual/release-11-0-2.config.ts --project=webkit-2311); else X=(-c tests-visual/playwright.config.ts --project=coarse-touch); fi
      npx playwright test "${X[@]}" release-11-0-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    roloop) if [ $E = wk ]; then RO_LOOP_WEBKIT=1 npx playwright test -c tests-visual/ro-loop.config.ts --project=webkit ro-loop.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?
      else npx playwright test "${CFG[@]}" ro-loop.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; fi;;
    radius) npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --project=coarse-touch radius-scale.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    r1013) if [ $E = wk ]; then X=(-c tests-visual/webkit-2287.config.ts --project=webkit); else X=("${CFG[@]}"); fi
      npx playwright test "${X[@]}" release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
  esac
  echo "$(date +%T) $tag exit $rc load=$(uptime | sed 's/.*averages: //') $(sum $L/$tag.log)" >> $L/chain.txt
  [ $rc -ne 0 ] && echo $n >> $L/reg-failed-$label-$E.txt
done
exit 0
