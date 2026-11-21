#!/bin/bash
# Fix seat 9, chain 2: item 1's probe at 200 films in WebKit with d0f85bd29's film module and
# the branch's, margins counted; then critic 8's raf.mjs (the old wait) and raf-cured.mjs
# (the cured wait) in WebKit 2287, sixty films per form each.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
F=$W/docs/release-11.1.1/fix-9
R=$W/docs/release-11.1.1/critic-8
G=~/.claude/guard/guarded
for p in webkit-phone webkit-desktop; do
  FILMS=200 $F/probe/run.sh d0f85bd29 $p ff200-d0-$p
  FILMS=200 $F/probe/run.sh branch $p ff200-branch-$p
done
for s in r3/raf r4/raf-cured; do
  n=$(basename $s)
  (cd $W/tests-visual && $G --exclusive webkit --timeout 10 -- node $R/$s.mjs webkit > $F/logs/$n-webkit.json 2> $F/logs/$n-webkit.err)
  echo "$(date +%T) $n-webkit exit $? $(head -c 300 $F/logs/$n-webkit.json)" >> $F/logs/runs.out
done
echo "$(date +%T) chain2 done" >> $F/logs/runs.out
