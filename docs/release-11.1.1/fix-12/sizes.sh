#!/bin/bash
# Fix seat 12: a fresh build of the committed source, the package as npm packs it, unpacked
# into its own directory, its unpacked byte total for the ratchet, and every entry's import
# closure gzipped against the published 11.0.2 and 11.1.0 (critic 6's sizes.py and closure.mjs).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-12/logs; P=$W/.cache/critic6-pub; T=$W/.cache/fix12-pub
cd $W
echo "SIZES-START $(date +%T) $(git rev-parse --short HEAD) dirty-tracked=$(git status --short | grep -v '^??' | tr '\n' ' ')" >> $L/runs.out
~/.claude/guard/guarded --timeout 20 -- npm run build > $L/sizes-build.log 2>&1
echo "$(date +%T) sizes-build exit $? $(git rev-parse --short HEAD)" >> $L/runs.out
rm -rf $T && mkdir -p $T/tgz
npm pack --ignore-scripts --json --pack-destination $T/tgz > $L/pack-tip.json 2> $L/pack-tip.err
tar -xzf $T/tgz/*.tgz -C $T
python3 $W/docs/release-11.1.1/critic-6/sizes.py $P/v11.0.2/package $P/v11.1.0/package $T/package > $L/sizes.txt
echo "$(date +%T) sizes $(git rev-parse --short HEAD) unpacked $(python3 -c "import json;print(json.load(open('$L/pack-tip.json'))[0]['unpackedSize'])") content $(tar -xOzf $T/tgz/*.tgz | wc -c | tr -d ' ') ratchet $(cat $W/.bundle-ratchet)" >> $L/runs.out
