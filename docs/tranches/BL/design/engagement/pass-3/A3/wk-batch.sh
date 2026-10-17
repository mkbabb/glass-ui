#!/bin/zsh
# P-A3: every remaining Playwright WebKit stage in ONE `guarded --exclusive webkit` acquisition (the per-stage queue lost
# the lock to other seats between stages: E-7 waited 58 min). Run as:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh wk-batch.sh
# Inside, each witness is its own node process (a fresh WebKit per witness, well under H3-1's 60-load restart).
# Strictly sequential: one browser at a time.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/A3/wt
O=$WT/.a3-out/builds
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
bat() { local l=$1 tag=$2 id=$3; shift 3; local log=$D/logs/$l$tag-webkit-$id.log
  { stamp "start $id $l webkit (wk-batch)"; cd $H && node run.mjs --build $O/$l --wt $WT --engines webkit --only $id --out $D/json/$l$tag --verbose "$@"; print -- "# exit $?"; stamp "end $id $l webkit"; } > $log 2>&1
  print -- "bat $l$tag webkit $id: $(grep -E '^E-[0-9]+ +webkit +exit' $log | tail -1 | cut -c1-220)"; }
probe() { local l=$1 only=$2; local log=$D/logs/probe-$l-webkit.log
  { stamp "probe $l webkit start (wk-batch)"; cd $D/probe && node a3-probe.mjs --build $O/$l --engine webkit --label $l --only $only; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
  print -- "probe $l webkit: $(grep '^a3-probe' $log | tail -1)"; }
cap() { local l=$1; local log=$D/logs/cap-$l-webkit.log
  { stamp "capture $l webkit start (wk-batch)"; cd $H && node capture.mjs --build $O/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine webkit; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
  print -- "cap $l webkit: $(tail -4 $log | head -2 | tr '\n' ' ' | cut -c1-240)"; }
stamp "wk-batch admitted"
for id in E-8 E-9 E-10 E-11; do bat light "" $id; done
probe light ck21,ck14,ck13,ck20
for id in E-1 E-2 E-8 E-9; do bat geom "" $id; done
bat geom -arms E-2 --commit-arms i,ii,iii
probe geom ck20,ck14
cap light
cap geom
stamp "wk-batch done"
