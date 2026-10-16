#!/bin/zsh
# C-A2 queue 3: the coarse-dark E-2 re-reads on P-A2's own scene app (switch, checkbox), twice; after queue 2.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-A2
until [ -f $D/logs/queue2.done ]; do sleep 20; done
$D/run-ca2.sh light-a wt e2cd1 --engines chromium --only E-2 --scenes switch,checkbox
$D/run-ca2.sh light-a wt e2cd2 --engines chromium --only E-2 --scenes switch,checkbox
echo "queue3 done $(date '+%T')" > $D/logs/queue3.done
