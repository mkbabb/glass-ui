#!/bin/zsh
# H2 (D5 pass 2), third session (2026-10-13): the reading of record on the final harness, one uninterrupted
# sequence with no harness edit in between: the self-test in both engines, then the HEAD baseline.
#   run-rec.sh <build-root> <stage...>   stages: st-chromium st-webkit baseline
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/H2
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/H2/wt
B=$1; shift
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
mkdir -p $D/logs $D/rec/selftest-json $D/rec/baseline
for s in "$@"; do
  case $s in
    st-chromium) { stamp "selftest chromium start"; node selftest.mjs --engines chromium --out $D/rec/selftest-json; stamp "selftest chromium end exit $?"; } > $D/logs/rec-selftest-chromium.log 2>&1 ;;
    st-webkit) { stamp "selftest webkit start"; node selftest.mjs --engines webkit --out $D/rec/selftest-json; stamp "selftest webkit end exit $?"; } > $D/logs/rec-selftest-webkit.log 2>&1 ;;
    baseline) { stamp "baseline head start"; node run.mjs --build $B/builds/head --wt $WT --out $D/rec/baseline --verbose; stamp "baseline head end exit $?"; } > $D/logs/rec-baseline-head.log 2>&1 ;;
  esac
done
echo "run-rec done $(date '+%F %T')"
