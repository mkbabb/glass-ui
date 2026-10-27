#!/bin/zsh
# D5 pass 6 · F5‴ (the floor; REGISTRY §P5-8.2): builds, gates, F-13's carry probe and the H6 battery (E-1..E-12) on
# HEAD's scene app, both engines. Every build, test and browser run goes through the machine guard. Chromium stages take
# one guarded call each; every WebKit stage runs inside ONE `guarded --exclusive webkit` admission (`wk-inner`, the
# caller wraps it), queued and never skipped. One heavy run at a time: the stages run in sequence.
#   zsh run-f5ppp.sh <stage…>
#   stages: src-<label> build-<label> gates probe-<label>-chromium bat-<label>-chromium[-E-x,E-y] wk-inner
#   labels: f5ppp (the worktree: F5″ + F-12 + F-13), f5pp12 (F5″ + F-12: F-13's before), f5pp (F5″ alone: F-12's before)
#   env: TAG=<suffix> (a second reading, its own log and json dir); READS (probe reads per arm, default 10)
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/F5ppp/${SIT:-r2}
PD=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/F5ppp
F5PP=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/F5pp.patch
ROOT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/F5ppp
WT=$ROOT/wt
O=$ROOT/out
G=~/.claude/guard/guarded
TAG=${TAG:-}
READS=${READS:-10}
mkdir -p $D/logs $D/json
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
srcof() { [[ $1 == f5ppp ]] && print $WT || print $O/src-$1; }
# E-7's static arm reads a tree's src: each build reads its own
bat() { # <label> <engine> <ids…>; the caller supplies the guard (Chromium: one per witness; WebKit: the admission)
  local l=$1 eng=$2; shift 2
  for id in "$@"; do
    local log=$D/logs/bat-$l${TAG}-$eng-$id.log
    { stamp "start $id $l $eng"; cd $H && ${=GW} node run.mjs --build $O/builds/$l --wt $(srcof $l) --engines $eng --only $id --out $D/json/$l${TAG} --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
    print -- "bat $l $eng $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-220)"
  done
}
probe() { # <label> <engine> <arms>
  local log=$D/logs/carry-$1${TAG}-$2.log
  { stamp "start carry probe $1 $2"; ${=GW} node $PD/probe/carry-probe.mjs --build $O/builds/$1 --engine $2 --reads $READS --arms $3 --out $D/json/$1${TAG}; print -- "# exit $?"; stamp "end carry probe $1 $2"; } > $log 2>&1
  print -- "probe $1 $2: $(grep -E 'distribution' $log | sed -E 's/ · [0-9]+ reads, sorted: \[[^]]*\]//' | cut -c1-200 | tr '\n' ';')"
}
for s in "$@"; do
  case $s in
    src-f5pp|src-f5pp12)
      # HEAD's src from `git archive HEAD src` (a read), then F5″'s src hunks (and for f5pp12 F-12's two files) applied
      l=${s#src-}; R=$O/src-$l
      { stamp "src $l start"; rm -rf $R; mkdir -p $R
        git -C /Users/mkbabb/Programming/glass-ui archive HEAD src | tar -x -C $R && ln -s /Users/mkbabb/Programming/glass-ui/node_modules $R/node_modules
        # $R sits inside the glass-ui checkout: without a ceiling, `git apply` finds that repository and silently
        # skips every path outside its cwd (the 14:07 trees were HEAD's bytes). The ceiling makes it a plain apply.
        (cd $R && GIT_CEILING_DIRECTORIES=$O git apply --include='src/*' $F5PP; print -- "# F5″ src applied: exit $?")
        [[ $l == f5pp12 ]] && (cd $R && GIT_CEILING_DIRECTORIES=$O git apply $ROOT/f12.diff; print -- "# F-12 applied: exit $?")
        print -- "# $(find $R/src -type f | wc -l | tr -d ' ') files; useEngage.ts carry: $(grep -c 'composite: \"add\"' $R/src/composables/motion/engage/useEngage.ts) add-composite; SheetContent fixed: $(grep -c 'cn(\"fixed\"' $R/src/components/sheet/SheetContent.vue)"
        stamp "src $l end"; } > $D/logs/src-$l.log 2>&1
      print -- "$s: $(grep '^# ' $D/logs/src-$l.log | tr '\n' ' ' | cut -c1-400)" ;;
    build-*)
      l=${s#build-}
      { stamp "build $l start"; cd $H && $G --timeout 20 -- node build.mjs $(srcof $l) --label $l --out $O; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
      print -- "$s: $(grep -E 'builds/|# exit' $D/logs/build-$l.log | tr '\n' ' ' | cut -c1-300)" ;;
    gates)
      { cd $WT; stamp "npm run build start"; $G --timeout 30 -- npm run build; print -- "# build exit $?"; stamp "build end"
        stamp "typecheck start"; $G --light --timeout 20 -- npm run typecheck; print -- "# typecheck exit $?"; stamp "typecheck end"
        stamp "demo:dist:build start"; $G --timeout 30 -- npm run demo:dist:build; print -- "# demo:dist:build exit $?"; stamp "demo:dist:build end"
        stamp "vitest start"; $G --timeout 60 -- npx vitest run --maxWorkers=2; print -- "# vitest exit $?"; stamp "vitest end"; } > $D/logs/gates${TAG}.log 2>&1
      print -- "gates: $(grep -E '^# (build|typecheck|demo:dist:build|vitest) exit' $D/logs/gates${TAG}.log | tr '\n' ' ')" ;;
    probe-*-chromium)
      l=${${s#probe-}%-chromium}; GW="$G --timeout 40 --"; probe $l chromium default,preframe,carry0 ;;
    bat-*-chromium*)
      rest=${s#bat-}; l=${rest%%-chromium*}; ids=($ALL); [[ $rest == *-chromium-* ]] && ids=(${(s:,:)${rest#*-chromium-}})
      GW="$G --timeout 90 --"; bat $l chromium $ids ;;
    wk-inner)
      # inside the one `guarded --exclusive webkit` admission: no nested guard
      GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log
      for st in ${=WK_STAGES}; do
        case $st in
          probe:*) probe ${st#probe:} webkit default,preframe,carry0 ;;
          bat:*) x=${st#bat:}; l=${x%%:*}; ids=(${(s:,:)${x#*:}}); [[ $x != *:* ]] && ids=($ALL); bat $l webkit $ids ;;
        esac
        print -- "stage $st done $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log
      done
      print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission${TAG}.log ;;
  esac
done
print -- "# run-f5ppp done $(date '+%F %T')"
