#!/bin/zsh
# H3 HEAD baseline driver (after the self-test): the battery on head-src in both engines, then the dist-gated cells
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p3/h3/out; cd /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/H3/logs
until [ -f selftest.done ]; do sleep 20; done
L=baseline-head-src.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
node $H/run.mjs --build $O/builds/head-src --out $O/bl --webkit >> $L 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
for e in chromium webkit; do for w in we-one-line t5-one-of-n-keys; do
  L=baseline-head-dist-$w-$e.log
  echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
  node $H/$w.mjs --build $O/builds/head-dist --out $O/bl --engine $e >> $L 2>&1
  echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
done; done
L=film-pair-selftest.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
echo "== fixture PASS (both engines, light, fine)" >> $L
node $H/film.mjs --pair --arms plated=fixture,second=fixture --dest $O/pair-fixture --scratch $O/pair-scratch --modes light --pointers fine >> $L 2>&1
echo "exit $?" >> $L
echo "== planted FAIL: fixture:t5-stop on specimen (Tab from the sentinel lands on the port, not the checked item)" >> $L
node $H/film.mjs --pair --arms plated=fixture,planted=fixture:t5-stop@specimen --dest $O/pair-plant --scratch $O/pair-scratch --modes light --pointers fine >> $L 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
L=film-pair-head.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
node $H/film.mjs --pair --arms head-library=$O/builds/head-src@preset,head-shipped-K1=$O/builds/head-src@preset-verbatim --dest /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/H3/pair-head --scratch $O/pair-scratch >> $L 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
L=appsso-probe.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
node $H/appsso-probe.mjs --n 5 >> $L 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
echo done > baseline.done
