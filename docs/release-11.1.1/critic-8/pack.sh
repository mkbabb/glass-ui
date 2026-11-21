#!/bin/bash
# Critic 8: the tip's package as npm packs it from the build gate's fresh dist, unpacked
# into its own empty directory, read against the published 11.1.0 and 11.0.2 tarballs.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-8; L=$D/logs; T=$D/tools; P=$W/.cache/critic8-pub
rm -rf $P/tip && mkdir -p $P/tip/tgz
cd $W && npm pack --ignore-scripts --json --pack-destination $P/tip/tgz > $L/pack-tip.json 2> $L/pack-tip.err
tar -xzf $P/tip/tgz/*.tgz -C $P/tip
python3 $T/cmp.py $P/v11.1.0/package $P/tip/package > $L/pack-vs-11.1.0.txt
python3 $T/dts.py $P/v11.1.0/package $P/tip/package > $L/dts-vs-11.1.0.txt
python3 $T/names.py $P/v11.1.0/package $P/tip/package > $L/names-vs-11.1.0.txt
python3 $T/classes.py $P/v11.1.0/package $P/tip/package > $L/classes-vs-11.1.0.txt
python3 $T/vals.py $P/v11.1.0/package/dist $P/tip/package/dist > $L/moved-values-vs-11.1.0.txt
python3 $T/sizes.py $P/v11.0.2/package $P/v11.1.0/package $P/tip/package > $L/sizes.txt
echo "PACK-DONE $(date +%T) $(git -C $W rev-parse --short HEAD)"
