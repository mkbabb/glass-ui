#!/bin/zsh
# H8 Chromium driver, part 3: the feather bound moved 1.25 → 1.10 after cand-e10's first read; the feather cells re-read
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
until grep -q 'driver end' logs/driver-c2.log; do sleep 30; done
while [[ -f logs/wk-running ]]; do sleep 30; done
$G --timeout 90 -- ./chain.sh chromium 'fx-E-10:--scenes+clipstale+--part+feather' 'st-E-10:--faults+e10-rectclip-feather' cand-e10 > logs/chain-c10.log 2>&1; echo "c10 exit $? $(date '+%T')" >> logs/driver-c3.log
echo "driver end $(date '+%T')" >> logs/driver-c3.log
