#!/bin/zsh
# C-A2 queue 1: waits for the light-h full battery, then the rest, serialized.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-A2
until grep -q "end exit" $D/logs/light-h-full-wk.log 2>/dev/null; do sleep 20; done
$D/run-ca2.sh light-a wt e1e2 --engines chromium --only E-1,E-2
$D/run-ca2.sh light-a wt e1e2-wk --engines webkit --only E-1,E-2
$D/run-ca2.sh plant01 wtp e1 --engines chromium --only E-1
$D/run-ca2.sh plant01 wtp e1-wk --engines webkit --only E-1
$D/run-ca2.sh geom-h wtg e2def --engines chromium --only E-2
$D/run-ca2.sh geom-h wtg e2all --engines chromium --only E-2 --commit-arms i,ii,iii
$D/run-ca2.sh geom-h wtg e9 --engines chromium,webkit --only E-9
$D/run-ca2.sh geom-h wtg e2all-wk --engines webkit --only E-2 --commit-arms i,ii,iii
echo "queue1 done $(date '+%T')" > $D/logs/queue1.done
