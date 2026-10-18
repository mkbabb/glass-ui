#!/bin/zsh
# D5 pass 4 · F5″ (the floor): the H4 battery on HEAD and on HEAD + F5pp.patch, both engines, the F-11 probe, the gates.
# Every build, test and browser run through the machine guard; the Chromium stages one guarded call per witness; every
# WebKit stage inside ONE `guarded --exclusive webkit` admission (`wk`, the caller wraps it), queued, never skipped.
# One heavy run at a time: the stages run in sequence.
#   zsh run-f5pp.sh <stage…>
#   stages: build-f5pp build-head-archive gates bat-<label>-chromium[-E-x,E-y] probe-<label>-chromium wk-inner
#   env: TAG=<suffix> (a second reading, its own log/json dir)
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/F5pp
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/F5pp.patch
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/F5pp/wt
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/F5pp/out
G=~/.claude/guard/guarded
TAG=${TAG:-}
mkdir -p $D/logs $D/json
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
# HEAD's E-7 static arm reads the pristine checkout's src (HEAD's bytes, read only); F5″ reads the worktree
wtof() { [[ $1 == head ]] && print /Users/mkbabb/Programming/glass-ui || print $WT; }
bat() { # <label> <engine> <ids…>; the caller supplies the guard (Chromium: one per witness; WebKit: the admission)
  local l=$1 eng=$2; shift 2
  for id in "$@"; do
    local log=$D/logs/$l${TAG}-$eng-$id.log
    { stamp "start $id $l $eng"; cd $H && ${=GW} node run.mjs --build $O/builds/$l --wt $(wtof $l) --engines $eng --only $id --out $D/json/$l${TAG} --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
    print -- "bat $l $eng $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-200)"
  done
}
probe() { # <label> <engine>
  local log=$D/logs/probe-$1${TAG}-$2.log
  { stamp "start probe $1 $2"; ${=GW} node $D/probe/hold-probe.mjs --build $O/builds/$1 --engine $2 --out $D/json/$1${TAG}; print -- "# exit $?"; stamp "end probe $1 $2"; } > $log 2>&1
  print -- "probe $1 $2: $(grep -E '^F-11 ' $log | tail -1)"
}
for s in "$@"; do
  case $s in
    build-f5pp)
      { stamp "build f5pp start"; cd $H && $G --timeout 20 -- node build.mjs $WT --label f5pp --out $O; print -- "# exit $?"; stamp "build f5pp end"; } > $D/logs/build-f5pp.log 2>&1
      print -- "$s: $(grep -E 'builds/|# exit' $D/logs/build-f5pp.log | tr '\n' ' ')" ;;
    build-head-archive)
      # HEAD's bytes from `git archive HEAD src` (read only) into the seat's out dir. Supersedes `build-head`, whose
      # reversed tree lacked `dock/composables/useDockHold.ts` (its log: `git diff HEAD --stat` 1 file, 167 deletions)
      { stamp "build head (archive) start"; R=$O/head-src; rm -rf $R; mkdir -p $R
        git -C /Users/mkbabb/Programming/glass-ui archive HEAD src | tar -x -C $R && ln -s /Users/mkbabb/Programming/glass-ui/node_modules $R/node_modules
        print -- "# archive: $(find $R/src -type f | wc -l | tr -d ' ') files; useDockHold.ts $(test -f $R/src/components/dock/composables/useDockHold.ts && print present || print ABSENT); hold.ts $(test -f $R/src/composables/motion/engage/hold.ts && print PRESENT || print absent)"
        cd $H && $G --timeout 20 -- node build.mjs $R --label head --out $O; print -- "# exit $?"; stamp "build head end"; } > $D/logs/build-head-archive.log 2>&1
      print -- "$s: $(grep -E 'builds/|# ' $D/logs/build-head-archive.log | tr '\n' ' ' | cut -c1-400)" ;;
    gates)
      { cd $WT; stamp "npm run build start"; $G --timeout 30 -- npm run build; print -- "# build exit $?"; stamp "build end"
        stamp "typecheck start"; $G --light --timeout 20 -- npm run typecheck; print -- "# typecheck exit $?"; stamp "typecheck end"
        stamp "demo:dist:build start"; $G --timeout 30 -- npm run demo:dist:build; print -- "# demo:dist:build exit $?"; stamp "demo:dist:build end"
        stamp "vitest start"; $G --timeout 60 -- npx vitest run --maxWorkers=2; print -- "# vitest exit $?"; stamp "vitest end"; } > $D/logs/gates${TAG}.log 2>&1
      print -- "gates: $(grep -E '^# (build|typecheck|demo:dist:build|vitest) exit' $D/logs/gates${TAG}.log | tr '\n' ' ')" ;;
    bat-*-chromium*)
      rest=${s#bat-}; l=${rest%%-chromium*}; ids=($ALL); [[ $rest == *-chromium-* ]] && ids=(${(s:,:)${rest#*-chromium-}})
      GW="$G --timeout 90 --"; bat $l chromium $ids ;;
    probe-*-chromium)
      l=${${s#probe-}%-chromium}; GW="$G --timeout 20 --"; probe $l chromium ;;
    wk-inner)
      # inside the one `guarded --exclusive webkit` admission: no nested guard
      GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log
      probe f5pp webkit; probe head webkit
      bat f5pp webkit ${=WK_IDS:-$ALL}
      bat head webkit ${=WK_HEAD_IDS:-$ALL}
      print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log ;;
  esac
done
print -- "# run-f5pp done $(date '+%F %T')"
