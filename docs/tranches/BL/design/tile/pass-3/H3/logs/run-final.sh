#!/bin/zsh
# H3 final-hash driver: the self-test of every witness that reads rows() (lib.mjs changed only there), then the whole
# HEAD baseline (head-src in both engines; head-dist for the dist-gated T-5 and W-E cells)
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p3/h3/out; cd /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/H3/logs
for id in T-1 T-2 T-8 W-A W-B W-D W-E; do
  L=selftest-$id.log
  echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
  node $H/selftest.mjs --out $O/st --only $id >> $L 2>&1
  echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
done
L=baseline-head-src.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
node $H/run.mjs --build $O/builds/head-src --out $O/bl2 --webkit >> $L 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
for e in chromium webkit; do for w in we-one-line t5-one-of-n-keys; do
  L=baseline-head-dist-$w-$e.log
  echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
  node $H/$w.mjs --build $O/builds/head-dist --out $O/bl2 --engine $e >> $L 2>&1
  echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
done; done
echo done > final.done
