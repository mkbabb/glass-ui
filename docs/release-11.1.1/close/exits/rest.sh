#!/bin/bash
# The 11.1.1 close: the exits gate's parts on the merged tip, carrying on past a failure, with the
# CommandDialog cells left out (they wait 60 s for a button master's demo no longer has; read
# on their own in logs/cmd-*). chromium-phone's part 0 ran whole in the gate (gates/exits.log).
D=$(cd "$(dirname "$0")" && pwd)
for n in 1 2 3; do bash $D/part.sh tip chromium-phone $n tip-chromium-phone-$n --grep-invert CommandDialog; done
for project in chromium-desktop webkit-phone webkit-desktop; do
  for n in 0 1 2 3; do bash $D/part.sh tip $project $n tip-$project-$n --grep-invert CommandDialog; done
done
echo "$(date +%T) rest done" >> $D/logs/runs.out
