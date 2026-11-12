#!/bin/zsh
# 10.1.5 critic round 9, second WebKit lock: c9b and c9c on three arms (the WebKit scroll after a port shrink),
# then the D-1 A/B at 16 repeats per arm.
set -u
S=${0:A:h}
zsh $S/arms-critic-9.sh wk "c9b|c9c" c9bc
zsh $S/d1-ab-critic-9.sh webkit 16
echo "$(date +%H:%M) webkit-2 done"
