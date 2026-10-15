#!/bin/zsh
# H2 (D5 pass 2), fourth session (2026-10-14): the reading of record on the final harness (after the third session's
# key dwell and starved-film re-read), one uninterrupted sequence with no harness edit in between: the self-test in
# both engines, then the HEAD baseline.
#   run-rec3.sh <build-root> <stage...>   stages: st-chromium st-webkit baseline
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/H2
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/H2/wt
B=$1; shift
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
mkdir -p $D/logs $D/rec3/selftest-json $D/rec3/baseline
for s in "$@"; do
  case $s in
    st-chromium) { stamp "selftest chromium start"; node selftest.mjs --engines chromium --out $D/rec3/selftest-json; stamp "selftest chromium end exit $?"; } > $D/logs/rec3-selftest-chromium.log 2>&1 ;;
    st-webkit) { stamp "selftest webkit start"; node selftest.mjs --engines webkit --out $D/rec3/selftest-json; stamp "selftest webkit end exit $?"; } > $D/logs/rec3-selftest-webkit.log 2>&1 ;;
    baseline) { stamp "baseline head start"; node run.mjs --build $B/builds/head --wt $WT --out $D/rec3/baseline --verbose; stamp "baseline head end exit $?"; } > $D/logs/rec3-baseline-head.log 2>&1 ;;
  esac
done
echo "run-rec3 done $(date '+%F %T')"
