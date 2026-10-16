#!/bin/zsh
# Follow-up scenarios added after the first pass (fine trigger, late retarget, exit/replay, the extended drag legs).
cd "$(dirname "$0")/.."
G=(~/.claude/guard/guarded --light --rss-gb 4 --timeout 3 --)
for a in "trigger-fine r1" "trigger-fine r2" "retarget-late r1" "retarget-late r2" "exit r1" "exit r2" "drag r3" "trigger-fine r1 390 844" "trigger-fine r2 390 844" "intro-touch r1" "intro-touch r2" "trigger-touch r1" "trigger-touch r2" "retarget-after r1" "retarget-after r2" "slides r1" "slides r2" "reduced-click r1" "reduced-click r2" "ended r1" "ended r2" "resize2 r1" "resize2 r2"; do
  set -- ${=a}
  w=${3:-1440}; [[ $1 == drag || $1 == intro-touch || $1 == trigger-touch ]] && w=390
  [[ -f data/$1-$2-$w.json ]] && continue
  echo "== $a $(sysctl -n vm.loadavg)"
  $G node tools/probe.mjs $@ 2>&1 | tail -2
done
echo EXTRADONE
