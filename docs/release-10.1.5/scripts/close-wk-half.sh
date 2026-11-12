#!/bin/zsh
# 10.1.5 release close: release-10-1-5.spec.ts in WebKit 2287 as two processes split by title
# (critique 16's HALF), so neither browser reaches the navigation count at which q2's page.goto hangs.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/close-wk-half.sh A|B
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=$WT/docs/release-10.1.5/close/suite
H=$1; TAG=branch-wk-$H
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
export GLASS_UI_DEMO_PORT=5313 GLASS_UI_DEMO_URL=http://localhost:5313 PI_REPORT=$L/$TAG.json
if [[ $H == A ]]; then SEL=(--grep-invert "$HALF"); else SEL=(--grep "$HALF"); fi
echo "$(date '+%F %T') $TAG start load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 tests-visual/release-10-1-5.spec.ts $SEL > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
