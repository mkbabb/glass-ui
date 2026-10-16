#!/bin/zsh
# Sequential driver: every scenario, two runs, each its own guarded heavy run (one browser at a time).
cd "$(dirname "$0")/.."
for run in r1 r2; do
  for sc in intro-jump intro-wheel trigger autoplay click retarget hover pause idle drag resize reduced dark; do
    w=1440; [[ $sc == drag ]] && w=390
    [[ -f data/$sc-$run-$w.json ]] && continue
    echo "== $sc $run $(sysctl -n vm.loadavg)"
    ~/.claude/guard/guarded --light --rss-gb 4 --timeout 3 -- node tools/probe.mjs $sc $run 2>&1 | tail -2
  done
done
# a 390 intro pair for P-02 geometry
for run in r1 r2; do [[ -f data/intro-jump-$run-390.json ]] || ~/.claude/guard/guarded --light --rss-gb 4 --timeout 3 -- node tools/probe.mjs intro-jump $run 390 844 2>&1 | tail -2; done
echo ALLDONE
