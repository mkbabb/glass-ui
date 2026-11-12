#!/bin/zsh
# 10.1.5 critic round 9: every WebKit 2287 run under ONE exclusive lock: the chain (branch, g6, critic-9 cells,
# the critic-8 and round-7 cells), then c9e on three arms, then the D-1 A/B against v10.1.4.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/webkit-all-critic-9.sh
set -u
S=${0:A:h}
zsh $S/chain-critic-9.sh wk branch g6-4 g6-3 probe9 probe8 r7
zsh $S/c9e-arms-critic-9.sh wk
zsh $S/d1-ab-critic-9.sh webkit 8
echo "$(date +%H:%M) webkit-all done"
