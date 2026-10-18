#!/bin/zsh
# P-E3: every Playwright WebKit stage inside ONE `guarded --exclusive webkit` acquisition (P-A3's lesson: per-stage
# queueing lost the lock between stages). Run as:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh wk-batch.sh <part>
# GUARD_ALLOW_LONG is not used: the batch is split into parts that each fit 90 min. Inside, each witness, probe and
# capture is its own node process: a fresh WebKit per process, which lib.mjs's Engine also relaunches every 60
# navigations (H3-1). Strictly sequential: one browser at a time.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/E3
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/E3/wt
O=$WT/.e3-out/builds
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
bat() { local l=$1 id=$2; local log=$D/logs/$l${TAG}-webkit-$id.log
  { stamp "start $id $l webkit (wk-batch)"; cd $H && node run.mjs --build $O/$l --wt $WT --engines webkit --only $id --out $D/json/$l${TAG} --verbose; print -- "# exit $?"; stamp "end $id $l webkit"; } > $log 2>&1
  print -- "bat $l${TAG} webkit $id: $(grep -E '^E-[0-9]+ +webkit +exit' $log | tail -1 | cut -c1-220)"; }
probe() { local l=$1; local log=$D/logs/probe-$l${TAG}-webkit.log
  { stamp "probe $l webkit start (wk-batch)"; cd $D/probe && node e3-probe.mjs --build $O/probe-$l --engine webkit --label $l${TAG} --shots $D/shots; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
  print -- "probe $l${TAG} webkit: $(grep '^e3-probe' $log | tail -1)"; }
cap() { local l=$1 sc=$2; local log=$D/logs/cap-$l-webkit.log
  { stamp "capture $l webkit start (wk-batch)"; cd $H && node capture.mjs --build $O/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine webkit ${sc:+--scenes $sc}; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
  print -- "cap $l webkit: $(tail -4 $log | head -2 | tr '\n' ' ' | cut -c1-240)"; }
film() { local how=$1; local log=$D/logs/handoff-film-veil-webkit-$how.log
  { stamp "handoff-film veil webkit $how (wk-batch)"; cd $D/probe && node handoff-film.mjs --build $O/probe-veil --engine webkit --label veil --how $how; print -- "# exit $?"; } > $log 2>&1
  print -- "film veil webkit $how: $(grep -c 'dt ' $log) step frames"; }
stamp "wk-batch $1 admitted"
case $1 in
  ab) for id in E-3 E-10 E-11; do bat veil $id; done; probe veil; for id in E-3 E-10 E-11; do bat noveil $id; done; probe noveil; for id in E-1 E-2 E-4 E-5 E-6 E-7 E-8 E-9; do bat veil $id; done ;;
  a) for id in E-3 E-10 E-11; do bat veil $id; done; probe veil; for id in E-3 E-10 E-11; do bat noveil $id; done; probe noveil ;;
  b) for id in E-1 E-2 E-4 E-5 E-6 E-7 E-8 E-9; do bat veil $id; done ;;
  c) film fwd; film rev
     cap veil; cap noveil slider ;;
esac
stamp "wk-batch $1 done"
