#!/bin/bash
# Fix seat 13: the package as npm packs it from the worktree's dist (built by d.sh's green leg
# from the committed source), unpacked into its own directory, its unpacked byte total for the
# ratchet, and every entry's import closure gzipped against the published 11.0.2 and 11.1.0
# (critic 6's sizes.py, as fix seat 12 read them).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-13/logs; P=$W/.cache/critic6-pub; T=$W/.cache/fix13-pub
cd $W
echo "$(date +%T) sizes HEAD $(git rev-parse --short HEAD) dirty-tracked=[$(git status --short | grep -v '^??' | tr '\n' ' ')] dist built $(stat -f '%Sm' -t '%F %T' dist/glass-ui.js) last src commit $(git log -1 --format='%h %ci' -- src package.json)" >> $L/sizes.out
rm -rf $T && mkdir -p $T/tgz
npm pack --ignore-scripts --json --pack-destination $T/tgz > $L/pack-tip.json 2> $L/pack-tip.err
tar -xzf $T/tgz/*.tgz -C $T
python3 $W/docs/release-11.1.1/critic-6/sizes.py $P/v11.0.2/package $P/v11.1.0/package $T/package > $L/sizes.txt
echo "$(date +%T) unpacked $(python3 -c "import json;print(json.load(open('$L/pack-tip.json'))[0]['unpackedSize'])") ratchet $(cat $W/.bundle-ratchet)" >> $L/sizes.out
