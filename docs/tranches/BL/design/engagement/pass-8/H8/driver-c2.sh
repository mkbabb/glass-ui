#!/bin/zsh
# H8 Chromium driver, part 2 (after the WebKit acquisition w1): each chain its own guarded call, one after another; a chain
# never starts while this seat's WebKit acquisition runs (logs/wk-running), so the seat holds one heavy run at a time
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
run() { local tag=$1; shift; while [[ -f logs/wk-running ]]; do sleep 30; done; $G --timeout 90 -- ./chain.sh chromium "$@" > logs/chain-$tag.log 2>&1; echo "$tag exit $? $(date '+%T')" >> logs/driver-c2.log; }
run c5 fx-E-11 fx-E-10 st-E-10:--faults+e10-clipvanish,e10-clipouter,e10-rectclip-feather,e10-rectclip-radius,e10-rectclip-scale,e10-rectclip-film,e10-layoutplace
run c6 cand-e10 cand-e13 cand-e12 plant-clipOnly-e10 plant-chipfaint-e12 plant-loupe6-e13 cand-e11 cand-e4
run c7 head-e10 head-e13 head-e12 head-e11 head-e4
run c8 clean
run c9 st-E-10:--faults+e10-snap,e10-veildip,e10-escsnap,e10-rerender,e10-teleport,e10-teleportin,e10-twoengaged,e10-relayout,e10-stale,e10-staleresize,e10-ratio1,e10-clipratio,e10-noref,e10-clipratioptr,e10-prmrebound
echo "driver end $(date '+%T')" >> logs/driver-c2.log
