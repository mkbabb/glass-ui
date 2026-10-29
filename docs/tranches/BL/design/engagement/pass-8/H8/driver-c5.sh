#!/bin/zsh
# H8 Chromium driver, part 5: the clean fixture for the witnesses H8 did not change (c8 was killed with its caller)
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
until grep -q 'driver end' logs/driver-c4.log; do sleep 30; done
while [[ -f logs/wk-running ]] || pgrep -f 'chain.sh chromium' >/dev/null; do sleep 30; done
$G --timeout 90 -- ./chain.sh chromium clean > logs/chain-c11.log 2>&1; echo "c11 exit $? $(date '+%T')" >> logs/driver-c5.log
echo "driver end $(date '+%T')" >> logs/driver-c5.log
