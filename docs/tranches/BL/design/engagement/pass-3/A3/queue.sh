#!/bin/zsh
# P-A3's queue after the light Chromium battery: one heavy run at a time, every WebKit run through
# `guarded --exclusive webkit` (queued, never skipped). Stages are named so a re-run can pick any.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/A3/wt/.a3-out/builds
G=~/.claude/guard/guarded
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
gw() { local eng=$1; shift; if [[ $eng == webkit ]]; then $G --exclusive webkit --timeout 90 -- "$@"; else $G --timeout 90 -- "$@"; fi; }
cd $D
for s in "$@"; do
  case $s in
    probe-*)  # probe-<label>-<engine>[-<only>]
      parts=(${(s:-:)s#probe-}); l=$parts[1]; eng=$parts[2]; only=${parts[3]:-ck21,ck14,ck13,ck20}
      log=$D/logs/probe-$l-$eng.log
      { stamp "probe $l $eng start"; cd $D/probe && gw $eng node a3-probe.mjs --build $O/$l --engine $eng --label $l --only $only; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
      print -- "$s: $(grep '^a3-probe' $log | tail -1)" ;;
    cap-*)    # cap-<label>-<engine>
      parts=(${(s:-:)s#cap-}); l=$parts[1]; eng=$parts[2]
      log=$D/logs/cap-$l-$eng.log; mkdir -p $D/glance/frames
      { stamp "capture $l $eng start"; cd $H && gw $eng node capture.mjs --build $O/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine $eng; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
      print -- "$s: $(tail -4 $log | head -2 | tr '\n' ' ' | cut -c1-260)" ;;
    *) zsh $D/run-a3.sh $s ;;
  esac
done
print -- "# queue done $(date '+%F %T')"
