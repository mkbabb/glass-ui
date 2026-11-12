#!/bin/zsh
# 10.1.5 critic round 11: c11c/c11d re-run in WebKit 2287 with Option+Tab (the first WebKit pass used Tab, which
# WebKit gives to text fields only, so no button took focus). Both arms. Under guarded --exclusive webkit.
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-11
export GLASS_UI_DEMO_PORT=5324
for arm in "" v1014; do
  tag=c11w${arm:+-$arm}-wk
  CRITIC_ARM=$arm PI_REPORT=$WT/$L/$tag.json npx playwright test -c tests-visual/release-10-1-5-critic-11.config.ts --project=webkit release-10-1-5-critic-11.spec.ts --grep "c11c|c11d" --workers=1 > $L/$tag.log 2>&1
  echo "$(date +%H:%M) $tag rc=$? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed)' $L/$tag.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
done
