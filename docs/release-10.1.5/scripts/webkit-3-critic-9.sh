#!/bin/zsh
# 10.1.5 critic round 9, third WebKit lock: c9f (a layered dock's first expand, repeated) on three arms.
set -u
S=${0:A:h}
zsh $S/arms-critic-9.sh wk "c9f" c9f
echo "$(date +%H:%M) webkit-3 done"
