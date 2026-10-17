#!/bin/zsh
# D5 pass 3 · F5' (the floor): the H3 battery on HEAD and on HEAD + F5p.patch, both engines, then the gates.
# Every run through the machine guard; every Playwright WebKit run through `guarded --exclusive webkit` (the one
# WebKit lock machine-wide; it queues, never skipped). One heavy run at a time: the stages run in sequence.
# Each witness is its own guarded call (run.mjs --only <id>, so run.mjs's engine-close re-run still applies).
#   zsh run-f5p.sh <stage…>
#   stages: build-head build-f5p bat-<label>-<engine>[-<E-x,E-y>] gates
#   env: TAG=<suffix> (a second reading of a stage, its own log/json dir)
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/F5p
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/F5p/wt
O=$WT/.f5p-out
G=~/.claude/guard/guarded
mkdir -p $D/logs $D/json
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
gw() { local eng=$1; shift; if [[ $eng == webkit ]]; then $G --exclusive webkit --timeout 90 -- "$@"; else $G --timeout 90 -- "$@"; fi; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11)
for s in "$@"; do
  case $s in
    build-head|build-f5p)
      l=${s#build-}
      { stamp "build $l start"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
      print -- "$s: $(tail -3 $D/logs/build-$l.log | head -1)" ;;
    bat-*)
      parts=(${(s:-:)s#bat-}); l=$parts[1]; eng=$parts[2]
      ids=($ALL); [[ -n $parts[3] ]] && ids=(${(s:,:)${s#bat-$l-$eng-}})
      # HEAD's E-7 static arm reads the pristine checkout's src (HEAD's bytes); F5' reads the worktree
      wt=$WT; [[ $l == head ]] && wt=/Users/mkbabb/Programming/glass-ui
      for id in $ids; do
        log=$D/logs/$l${TAG}-$eng-$id.log
        { stamp "start $id $l $eng"; cd $H && gw $eng node run.mjs --build $O/builds/$l --wt $wt --engines $eng --only $id --out $D/json/$l${TAG} --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
        print -- "$s $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-220)"
      done ;;
    gates)
      { cd $WT; stamp "npm run build start"; $G --timeout 30 -- npm run build; print -- "# build exit $?"; stamp "build end"
        stamp "typecheck start"; $G --light --timeout 20 -- npm run typecheck; print -- "# typecheck exit $?"; stamp "typecheck end"
        stamp "demo:dist:build start"; $G --timeout 30 -- npm run demo:dist:build; print -- "# demo:dist:build exit $?"; stamp "demo:dist:build end"
        stamp "vitest start"; $G --timeout 60 -- npx vitest run --maxWorkers=2; print -- "# vitest exit $?"; stamp "vitest end"; } > $D/logs/gates${TAG}.log 2>&1
      print -- "gates: $(grep -E '^# (build|typecheck|demo:dist:build|vitest) exit' $D/logs/gates${TAG}.log | tr '\n' ' ')" ;;
  esac
done
print -- "# run-f5p done $(date '+%F %T')"
