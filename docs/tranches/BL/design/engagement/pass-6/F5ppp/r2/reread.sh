#!/bin/zsh
# F5‴ r2: the Sheet cells re-read twice in Chromium (the seat's rule: a defect seen under load is NOT-REPRODUCED until
# re-run twice). E-1 (`runtime presented (sheet)`, normal and PRM) and E-4 (`sheet repeat landing`), scene sheet only,
# on f5ppp, and the same on f5pp as the before. One guarded call per run, in sequence, after the WebKit acquisition.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/F5ppp
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/F5ppp/out
G=~/.claude/guard/guarded
for k in 1 2; do for l in f5ppp f5pp; do for id in E-1 E-4; do
  src=$O/src-$l; [[ $l == f5ppp ]] && src=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/F5ppp/wt
  log=$S/r2/logs/reread$k-$l-chromium-$id.log
  { print -- "# start $(date '+%F %T') load $(sysctl -n vm.loadavg)"; cd $H && $G --timeout 30 -- node run.mjs --build $O/builds/$l --wt $src --engines chromium --only $id --scenes sheet --out $S/r2/json/reread$k-$l --verbose; print -- "# exit $?"; print -- "# end $(date '+%F %T') load $(sysctl -n vm.loadavg)"; } > $log 2>&1
  print -- "reread$k $l $id: $(grep -E 'sheet' $log | grep -E 'PASS|FAIL|UNMEAS' | sed -E 's/^ +//' | cut -c1-200 | tr '\n' ';')"
done; done; done
