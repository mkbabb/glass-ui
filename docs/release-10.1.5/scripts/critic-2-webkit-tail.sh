#!/bin/zsh
# critic round 2: the WebKit 2287 tail — the v10.1.4 copy arm of the critic-2 probes, then
# the g6 release specs. Run from tests-visual under guarded --exclusive webkit.
set -u
L=../docs/release-10.1.5/critic-2
CRITIC_ARM=v1014 npx playwright test -c release-10-1-5-critic-2.config.ts --project=webkit release-10-1-5-critic-2.spec.ts --grep "postures (fine|coarse) (320|390)|overflow|ring|vertical" --workers=1 > $L/run-webkit-v1014.log 2>&1; echo "v1014 exit=$?" >> $L/run-webkit-v1014.log
npx playwright test -c release-10-1-5-critic-2.config.ts --project=webkit release-10-1-5.spec.ts release-10-1-4.spec.ts release-10-1-3.spec.ts --workers=1 > $L/g6-webkit.log 2>&1; echo "g6 exit=$?" >> $L/g6-webkit.log
