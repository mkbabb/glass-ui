#!/bin/zsh
# Critic 2: D-1 (release-10-1-3.spec.ts) as an A/B, this tree against a git-archive tree of
# v11.0.0 at ./v1100, alternating, N rounds, Chromium headless. One guarded call:
#   guarded --timeout 40 -- zsh critic-2-d1-ab.sh N
set -u
WT=${0:A:h:h:h:h}
L=$WT/docs/release-11.0.1/critic-2/runs/d1-ab
mkdir -p $L
N=${1:-3}
for i in $(seq 1 $N); do
  for T in merged v1100; do
    if [[ $T == v1100 ]]; then cd $WT/v1100; export GLASS_UI_DEMO_PORT=5415; else cd $WT; export GLASS_UI_DEMO_PORT=5411; fi
    npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new release-10-1-3.spec.ts -g "D-1" --workers=1 > $L/$T-$i.log 2>&1; rc=$?
    echo "$(date +%H:%M) $T round $i rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed)' $L/$T-$i.log | tr -s ' ' | tr '\n' ' ') $(grep -E 'Received:' $L/$T-$i.log | tr -s ' ' | tr '\n' ' ')" >> $L/ab.txt
  done
done
echo "ab done" >> $L/ab.txt
