#!/bin/bash
# Fix seat 7: the committed tree's package as npm packs it (after the build gate's fresh
# dist), unpacked into its own directory, every entry's import closure gzipped against the
# published 11.0.2 and 11.1.0 (critic 6's sizes.py and closure.mjs).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-7/logs; P=$W/.cache/critic6-pub; T=$W/.cache/fix7-pub
rm -rf $T && mkdir -p $T/tgz
cd $W && npm pack --ignore-scripts --json --pack-destination $T/tgz > $L/pack-tip.json 2> $L/pack-tip.err
tar -xzf $T/tgz/*.tgz -C $T
python3 $W/docs/release-11.1.1/critic-6/sizes.py $P/v11.0.2/package $P/v11.1.0/package $T/package > $L/sizes.txt
echo "$(date +%T) sizes $(git -C $W rev-parse --short HEAD)" >> $L/gates.out
