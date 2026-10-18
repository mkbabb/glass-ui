#!/bin/zsh
# D5 pass 3 · C-A3 (critic of route A): replay of the H3 battery on HEAD + P-A3-{light,geom}.patch in the critic's own
# worktree, on the harness's own app. Every run through the machine guard; WebKit through `guarded --exclusive webkit`
# (queued, never skipped). One heavy run at a time.
#   zsh run-ca3.sh <stage…>   stages: build-<label> bat-<label>-<engine>[-<E-x,E-y>]
#   env: TAG=<suffix>, ARGS="<extra witness args>"
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-A3
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-A3/wt
O=$WT/.ca3-out
G=~/.claude/guard/guarded
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
gw() { local eng=$1; shift; if [[ $eng == webkit ]]; then $G --exclusive webkit --timeout 90 -- "$@"; else $G --timeout 90 -- "$@"; fi; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11)
for s in "$@"; do
  case $s in
    build-*) l=${s#build-}
      { stamp "build $l start"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
      print -- "$s: $(grep '# exit' $D/logs/build-$l.log)" ;;
    bat-*) parts=(${(s:-:)s#bat-}); l=$parts[1]; eng=$parts[2]
      ids=($ALL); [[ -n $parts[3] ]] && ids=(${(s:,:)${s#bat-$l-$eng-}})
      if [[ $eng == webkit ]]; then
        # one exclusive acquisition for the whole stage; one node process (one WebKit) per witness
        log=$D/logs/$l${TAG}-webkit-stage.log
        { stamp "queue webkit $l ${ids}"; $G --exclusive webkit --timeout 90 -- zsh -c "cd $H; for id in ${ids}; do print -- \"# start \$id \$(date '+%F %T') load \$(sysctl -n vm.loadavg)\"; node run.mjs --build $O/builds/$l --wt $WT --engines webkit --only \$id --out $D/json/$l${TAG} --verbose ${ARGS}; print -- \"# end \$id exit \$? \$(date '+%F %T') load \$(sysctl -n vm.loadavg)\"; done"; print -- "# guarded exit $?"; stamp "stage end"; } > $log 2>&1
        print -- "$s: $(grep -E '^E-[0-9]+ +webkit +exit' $log | cut -c1-200 | tr '\n' '|')"
      else
        for id in $ids; do log=$D/logs/$l${TAG}-$eng-$id.log
          { stamp "start $id $l $eng"; cd $H && gw $eng node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l${TAG} --verbose ${=ARGS}; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
          print -- "$s $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-200)"
        done
      fi ;;
  esac
done
print -- "# run-ca3 done $(date '+%F %T')"
