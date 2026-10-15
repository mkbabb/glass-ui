#!/bin/zsh
# H2 (D5 pass 2), fifth session (2026-10-15): E-11 on its final code (the envelope rule and the e11-noise control the
# fourth session landed after rec3's self-test), self-tested in both engines, then HEAD's E-11 read twice. Every other
# witness's record is rec3's: their files are byte-identical to rec3-harness.sha1 (H2.md §2).
#   run-rec4.sh <build-root> <stage...>   stages: st-e11 base-e11
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/H2
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/H2/wt
GUARD=~/.claude/guard/guarded
B=$1; shift
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
mkdir -p $D/logs $D/rec4/selftest-json $D/rec4/baseline-e11-1 $D/rec4/baseline-e11-2
for s in "$@"; do
  case $s in
    st-e11) { stamp "selftest E-11 start"; $GUARD --timeout 40 -- node selftest.mjs --only E-11 --out $D/rec4/selftest-json; stamp "selftest E-11 end exit $?"; } > $D/logs/rec4-selftest-e11.log 2>&1 ;;
    base-e11) { for i in 1 2; do stamp "HEAD E-11 run $i start"; $GUARD --timeout 20 -- node run.mjs --build $B/builds/head --wt $WT --only E-11 --out $D/rec4/baseline-e11-$i --verbose; stamp "HEAD E-11 run $i end exit $?"; done; } > $D/logs/rec4-baseline-e11.log 2>&1 ;;
    # the two HEAD cells rec3 read near their bound or flipping run to run, read twice more at this session's load
    base-flaky) { for i in ${=RUNS:-1 2}; do mkdir -p $D/rec4/baseline-flaky-$i; [ -n "$E9ONLY" ] || { stamp "HEAD E-4 run $i start"; $GUARD --light --timeout 10 -- node run.mjs --build $B/builds/${HEADLABEL:-head} --wt $WT --only E-4 --out $D/rec4/baseline-flaky-$i --verbose; stamp "HEAD E-4 run $i end exit $?"; };
        for e in chromium webkit; do stamp "HEAD E-9 button $e run $i start"; $GUARD --light --timeout 5 -- node e9-prm.mjs --build $B/builds/head --engine $e --scenes button --out $D/rec4/baseline-flaky-$i; stamp "HEAD E-9 button $e run $i end exit $?"; done; done; } > $D/logs/rec4-baseline-flaky.log 2>&1 ;;
    # E-1 on P-A (pass-1/P-A.patch's src hunks applied in the worktree after every HEAD read that walks the tree)
    pa-e1) { stamp "E-1 on P-A start"; for e in ${=PA_ENGINES:-chromium webkit}; do $GUARD --light --timeout 5 -- node e1-census.mjs --build $B/builds/pa --engine $e --out $D/rec4/pa-e1; done; stamp "E-1 on P-A end"; } >> $D/logs/rec4-pa-e1.log 2>&1 ;;
    capture) { rm -rf $D/glance/frames; mkdir -p $D/glance/frames; stamp "capture head start"; $GUARD --timeout 40 -- node capture.mjs --build $B/builds/head --label head --frames $D/glance/frames --sheets $D/glance; stamp "capture head end exit $?"; } > $D/logs/rec4-capture-head.log 2>&1 ;;
  esac
done
echo "run-rec4 done $(date '+%F %T')"
