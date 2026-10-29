#!/bin/zsh
# H8 Chromium driver: each chain its own guarded call, one after another (one heavy run of this seat at a time)
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
$G --timeout 90 -- ./chain.sh chromium st-E-13 st-E-11:--faults+e11-crestsilent fx-E-11 st-E-10 clean > logs/chain-c2.log 2>&1; echo "c2 exit $?" >> logs/driver-c.log
$G --timeout 90 -- ./chain.sh chromium cand-e10 cand-e13 cand-e12 cand-e11 plant-clipOnly-e10 plant-chipfaint-e12 plant-loupe6-e13 > logs/chain-c3.log 2>&1; echo "c3 exit $?" >> logs/driver-c.log
$G --timeout 90 -- ./chain.sh chromium cand-e4 head-e10 head-e13 head-e12 head-e11 head-e4 > logs/chain-c4.log 2>&1; echo "c4 exit $?" >> logs/driver-c.log
echo "driver end $(date '+%T')" >> logs/driver-c.log
