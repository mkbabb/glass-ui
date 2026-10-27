#!/bin/bash
# post.sh (D2 pass 7, B′ prototype): after the battery chain, one heavy run at a time: F7 on the seat tree, PR, the
# display-frame slot probe (slotink.mjs; diagnosis, enters no row) on bp and on pass-6's B′ (bp6) per engine and theme,
# then the cost arm (cost.sh, load <= 15 gate).
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; O=$B/out; R=$O/rec; WT=$B/wt
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
GD=$HOME/.claude/guard/guarded; mkdir -p $R/F7-bp $R/PR-bp $R/si
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $R/post.log; }
if [ ! -d $O/builds/bp6 ]; then rm -rf $B/ref6; cp -R $B/ref $B/ref6; (cd $B/ref6 && GIT_CEILING_DIRECTORIES=$B git apply $D/pass-6/D2-Bp-proto.patch); mkdir -p $B/ref6/node_modules; for e in /Users/mkbabb/Programming/glass-ui/node_modules/* /Users/mkbabb/Programming/glass-ui/node_modules/.bin; do ln -s "$e" $B/ref6/node_modules/; done
  L "build bp6"; (uptime; $GD --timeout 30 -- node $H/build.mjs $B/ref6 --out $O --label bp6 --no-demo; echo "build exit $?"; uptime) > $R/build-bp6.log 2>&1; fi
L "start F7"; (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $O/f7; echo "exit $?"; uptime) > $R/F7-bp/F7.log 2>&1
find $O/f7 -name F7.json -exec cp {} $R/F7-bp/F7.json \;
(cd $WT && node $O/scripts/bg.mjs dist-demo) > $R/F7-bp/boot-graph.txt 2>&1; L "end F7"
L "start PR"; (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $O/pr; echo "exit $?"; uptime) > $R/PR-bp/PR.log 2>&1
find $O/pr -name PR.json -exec cp {} $R/PR-bp/PR.json \; ; L "end PR"
for t in light dark; do
  L "start si chromium $t"; (uptime; $GD --timeout 30 -- bash -c "for b in bp bp6; do node $O/scripts/slotink.mjs --build $O/builds/\$b --adapter $AD --engine chromium --runs 3 --json $R/si/\$b-chromium-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $?"; uptime) > $R/si/si-chromium-$t.log 2>&1
done
for t in light dark; do
  L "queue si webkit $t"; (echo "queued $(date) $(uptime)"; $GD --exclusive webkit --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for b in bp bp6; do node $O/scripts/slotink.mjs --build $O/builds/\$b --adapter $AD --engine webkit --runs 3 --json $R/si/\$b-webkit-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $? $(date) $(uptime)") > $R/si/si-webkit-$t.log 2>&1; L "end si webkit $t"
done
L "start cost"; bash $O/scripts/cost.sh 3; L "POST-DONE"
