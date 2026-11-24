#!/bin/zsh
# The 11.1.1 second close: the red tree, a full `git archive HEAD` tree (docs included) whose src/ is
# v11.1.0's (`git archive v11.1.0 -- src`), so it differs from the head tree in the library alone:
# v11.1.0's source under the tip's demo, specs and harnesses. At .cache/close-full/red/tree.
#   zsh redtree.sh
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; T=$WT/.cache/close-full/red/tree
zsh $C/scripts/fulltree.sh red HEAD
rm -rf $T/src; git -C $WT archive v11.1.0 -- src | tar -x -C $T
a=$(cd $T && find src -type f | wc -l | tr -d ' '); b=$(git -C $WT ls-tree -r --name-only v11.1.0 -- src | wc -l | tr -d ' ')
d=$(cd $T && git -C $WT ls-tree -r v11.1.0 -- src | while read m t h p; do [[ $(git hash-object $p) = $h ]] || echo $p; done | wc -l | tr -d ' ')
echo "$(date '+%F %T') red tree: src files $a (v11.1.0 has $b), blobs differing from v11.1.0's $d" | tee -a $C/suite/trees.txt
