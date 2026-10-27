#!/bin/bash
# final.sh (D2 pass 7, B′ prototype): after one comment-only edit (useDockScene.ts header: the slot "keeps pace", not
# "never empty"), F7 and PR re-run on the final tree, the boot graph re-read, and the patch re-made from the final tree.
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; O=$B/out; R=$O/rec; WT=$B/wt
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; GD=$HOME/.claude/guard/guarded
mkdir -p $R/F7-final $R/PR-final
(uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $O/f7final; echo "exit $?"; uptime) > $R/F7-final/F7.log 2>&1
find $O/f7final -name F7.json -exec cp {} $R/F7-final/F7.json \;
(cd $WT && node $O/scripts/bg.mjs dist-demo) > $R/F7-final/boot-graph.txt 2>&1
(uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $O/prfinal; echo "exit $?"; uptime) > $R/PR-final/PR.log 2>&1
find $O/prfinal -name PR.json -exec cp {} $R/PR-final/PR.json \;
cd $O && bash scripts/mkpatch.sh $WT $B/ref $O/D2-Bp-proto.patch > $R/patch-final.txt 2>&1
echo FINAL-DONE >> $R/final.txt
