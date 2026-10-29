#!/bin/zsh
# H8 Chromium driver, part 4: the remaining Chromium chains, each short (≤ 15 min) so this seat's WebKit gate finds a gap;
# a chain never starts while the WebKit acquisition runs (logs/wk-running) or while another chain of this seat runs
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
G=$HOME/.claude/guard/guarded
run() { local tag=$1; shift; while [[ -f logs/wk-running ]] || pgrep -f 'chain.sh chromium' >/dev/null; do sleep 30; done; $G --timeout 90 -- ./chain.sh chromium "$@" > logs/chain-$tag.log 2>&1; echo "$tag exit $? $(date '+%T')" >> logs/driver-c4.log; }
run c9a st-E-10:--faults+e10-snap,e10-veildip,e10-escsnap,e10-rerender,e10-teleport
run c9b st-E-10:--faults+e10-teleportin,e10-twoengaged,e10-relayout,e10-stale,e10-staleresize
run c9c st-E-10:--faults+e10-ratio1,e10-clipratio,e10-noref,e10-clipratioptr,e10-prmrebound
run c10 'fx-E-10:--scenes+clipstale+--part+feather' 'st-E-10:--faults+e10-rectclip-feather' cand-e10
echo "driver end $(date '+%T')" >> logs/driver-c4.log
