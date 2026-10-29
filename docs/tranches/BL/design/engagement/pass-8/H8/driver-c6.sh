#!/bin/zsh
# H8 Chromium driver, part 6: E-4, E-11 and E-12's self-tests again on the final fixtures.mjs (their first Chromium runs
# preceded the crestLevel regex fix of 05:30)
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
until grep -q 'driver end' logs/driver-c5.log; do sleep 30; done
run() { local tag=$1; shift; while [[ -f logs/wk-running ]] || pgrep -f '^/bin/zsh ./chain.sh chromium' >/dev/null; do sleep 30; done; $G --timeout 90 -- ./chain.sh chromium "$@" > logs/chain-$tag.log 2>&1; echo "$tag exit $? $(date '+%T')" >> logs/driver-c6.log; }
run c12 st-E-11 st-E-12
run c13 st-E-4
echo "driver end $(date '+%T')" >> logs/driver-c6.log
