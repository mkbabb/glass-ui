#!/bin/bash
# Critic 6: the tip's package as npm would pack it (after the build gate's fresh dist),
# unpacked into its own empty directory, read against the published 11.1.0 and 11.0.2.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-6; L=$D/logs; P=$W/.cache/critic6-pub
rm -rf $P/tip && mkdir -p $P/tip/tgz
cd $W && npm pack --ignore-scripts --json --pack-destination $P/tip/tgz > $L/pack-tip.json 2> $L/pack-tip.err
tar -xzf $P/tip/tgz/*.tgz -C $P/tip
python3 $D/cmp.py $P/v11.1.0/package $P/tip/package > $L/package-vs-11.1.0.txt
python3 $D/dts.py $P/v11.1.0/package $P/tip/package > $L/dts-vs-11.1.0.txt
python3 $D/names.py $P/v11.1.0/package $P/tip/package > $L/names-vs-11.1.0.txt
python3 $D/classes.py $P/v11.1.0/package $P/tip/package > $L/classes-vs-11.1.0.txt
python3 $D/sizes.py $P/v11.0.2/package $P/v11.1.0/package $P/tip/package > $L/sizes.txt
echo "PACK-DONE $(date +%T)" >> $L/runs.out
