#!/bin/zsh
# C-E2 queue 3 (after queue 2): the E-5 accordion/toggle sustain re-reads, Chromium, twice.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-E2
until grep -q "queue2 done" $D/logs/queue2.out; do sleep 10; done
$D/run-ce2.sh veil e5r1 chromium --only E-5 --scenes accordion,toggle
$D/run-ce2.sh veil e5r2 chromium --only E-5 --scenes accordion,toggle
echo "queue3 done $(date '+%F %T')"
