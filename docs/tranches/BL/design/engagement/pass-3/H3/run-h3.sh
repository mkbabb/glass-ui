#!/bin/zsh
# D5 pass 3 · H3: the harness self-test in both engines, then the HEAD re-reads of the changed witnesses.
# Every run through the machine guard; every Playwright WebKit run through `guarded --exclusive webkit` (the one WebKit
# lock machine-wide; it queues). One heavy run at a time. Logs and JSON under this directory.
#   zsh run-h3.sh <phase…>   phases: st-chromium st-webkit head-chromium head-webkit cap-head a2-e1
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/H3
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/H3/wt/.h3/out/builds
G=~/.claude/guard/guarded
mkdir -p $D/logs $D/json
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
gw() { local eng=$1; shift; if [[ $eng == webkit ]]; then $G --exclusive webkit --timeout 90 -- "$@"; else $G --timeout 90 -- "$@"; fi; }
for phase in "$@"; do
  case $phase in
    st-chromium|st-webkit)
      eng=${phase#st-}
      for id in E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 CAP; do
        log=$D/logs/selftest-$eng-$id.log
        { stamp "start $id $eng"; cd $H && gw $eng node selftest.mjs --only $id --engines $eng --out $D/json/selftest; print -- "# exit $?"; stamp "end $id $eng"; } > $log 2>&1
        print -- "$phase $id: $(grep -E '^selftest:' $log | tail -1)"
      done ;;
    rerun-*)
      # rerun-<engine>-<id>[-<id>…]: a witness's self-test re-run (a cure or a not-reproduced read), its own log
      parts=(${(s:-:)phase#rerun-}); eng=$parts[1]; shift parts
      ids=(); i=1; while (( i <= $#parts )); do if [[ $parts[i] == E ]]; then ids+=("$parts[i]-$parts[i+1]"); (( i += 2 )); else ids+=("$parts[i]"); (( i += 1 )); fi; done
      for id in $ids; do
        n=1; while [[ -e $D/logs/selftest-$eng-$id-r$n.log ]]; do (( n++ )); done
        log=$D/logs/selftest-$eng-$id-r$n.log
        { stamp "start $id $eng r$n"; cd $H && gw $eng node selftest.mjs --only $id --engines $eng --out $D/json/selftest; print -- "# exit $?"; stamp "end $id $eng r$n"; } > $log 2>&1
        print -- "$phase $id r$n: $(grep -E '^selftest:' $log | tail -1)"
      done ;;
    head-chromium|head-webkit)
      eng=${phase#head-}
      for w in e1-census e2-commit e8-clock e9-prm e10-continuity; do
        log=$D/logs/head-$eng-$w.log
        { stamp "start $w $eng"; cd $H && gw $eng node $w.mjs --build $B/head --engine $eng --out $D/json/head; print -- "# exit $?"; stamp "end $w $eng"; } > $log 2>&1
        print -- "$phase $w: $(grep -E '^E-[0-9]+ (chromium|webkit) ' $log | tail -1)"
      done ;;
    cap-head)
      for eng in chromium webkit; do
        log=$D/logs/head-$eng-capture-coarse.log
        { stamp "start capture $eng"; cd $H && gw $eng node capture.mjs --build $B/head --label head --engine $eng --pointers coarse --scenes switch,accordion,button --frames $D/capture/frames --sheets $D/capture; print -- "# exit $?"; stamp "end capture $eng"; } > $log 2>&1
        print -- "$phase $eng: $(grep -E '^CAP ' $log | tail -1)"
      done ;;
    e2-e10)
      # E-10's position grading on pass 2's E composition (F5 + A2-light + P-E2-veil.patch), where C-E2 filmed the 68 px
      # hand-off teleport that the pass-2 E-10 passed
      for eng in chromium webkit; do
        log=$D/logs/e2veil-$eng-e10-continuity.log
        { stamp "start e10 e2veil $eng"; cd $H && gw $eng node e10-continuity.mjs --build $B/e2veil --engine $eng --out $D/json/e2veil; print -- "# exit $?"; stamp "end e10 e2veil $eng"; } > $log 2>&1
        print -- "$phase $eng: $(grep -E '^E-10 ' $log | tail -1)"
      done ;;
    a2-e1)
      for eng in chromium webkit; do
        log=$D/logs/a2light-$eng-e1-census.log
        { stamp "start e1 a2light $eng"; cd $H && gw $eng node e1-census.mjs --build $B/a2light --engine $eng --out $D/json/a2light; print -- "# exit $?"; stamp "end e1 a2light $eng"; } > $log 2>&1
        print -- "$phase $eng: $(grep -E '^E-1 ' $log | tail -1)"
      done ;;
  esac
done
print -- "# all phases done $(date '+%F %T')"
