#!/bin/bash
# Fix seat 2: the release gates on the committed tree, one guarded run at a time.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/fix-2/logs; O=$L/chain.out; G=~/.claude/guard/guarded
cd $W
echo "$(date +%H:%M:%S) chain3 at $(git rev-parse --short HEAD)" >> $O
$G --light --timeout 15 -- npm run typecheck > $L/typecheck.log 2>&1; echo "$(date +%H:%M:%S) typecheck rc=$?" >> $O
$G --timeout 20 -- npm run build > $L/build.log 2>&1; echo "$(date +%H:%M:%S) build rc=$?" >> $O
$G --light --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; echo "$(date +%H:%M:%S) verify:package rc=$?" >> $O
echo done3 >> $O
