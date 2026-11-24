#!/bin/zsh
# The 11.1.1 second close, resumed: after queue4 ends, the exits gate's sixteen parts (exits.sh).
set -u
C=${0:A:h:h}
until grep -q "queue4 exit" $C/run.log; do sleep 30; done
echo "$(date '+%F %T') queue5 (the exits gate) starts" >> $C/run.log
zsh $C/scripts/exits.sh
echo "$(date '+%F %T') queue5 exit $?" >> $C/run.log
