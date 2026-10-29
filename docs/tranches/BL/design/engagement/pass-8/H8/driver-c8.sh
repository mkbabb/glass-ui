#!/bin/zsh
# H8 Chromium driver, part 8: the film and rectclip cells on the final code now (one short chain, so the WebKit gate of w3
# finds its gap within 20 min), then after w3 the clean fixture for the unchanged witnesses and E-4, E-11 and E-12's
# self-tests on the final fixtures.mjs (their first Chromium runs preceded the 05:30 crestLevel fix)
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
run() { local tag=$1; shift; while [[ -f logs/wk-running ]] || pgrep -f '^/bin/zsh ./chain.sh' >/dev/null; do sleep 30; done; $G --timeout 90 -- ./chain.sh chromium "$@" > logs/chain-$tag.log 2>&1; echo "$tag exit $? $(date '+%T')" >> logs/driver-c8.log; }
run c14 'fx-E-10:--scenes+clipstale+--part+film' 'st-E-10:--faults+e10-rectclip-feather,e10-rectclip-radius,e10-rectclip-scale,e10-rectclip-film' 'cand-e10:--part+film' head-e10
until grep -q 'w3 guarded exit' logs/wk-queue.log; do sleep 30; done
run c11 clean
run c12 st-E-11 st-E-12
run c13 st-E-4
echo "driver end $(date '+%T')" >> logs/driver-c8.log
