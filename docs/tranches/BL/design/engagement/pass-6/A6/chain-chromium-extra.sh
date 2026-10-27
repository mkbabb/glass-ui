#!/bin/zsh
# P-A6 Chromium probe and capture, one guarded call each.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/A6
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/A6/wt/.a6out/builds/a6
W=(${@}); (( ${#W} )) || W=(probe capture)
for s in $W; do
  case $s in
    probe) $A/run.sh probe-a6-chromium --timeout 60 -- node $A/probe/a6-probe.mjs --build $B --engine chromium --out $A/json/probe; echo "probe exit $?" ;;
    capture) $A/run.sh cap-a6-chromium --timeout 90 -- node $H/capture.mjs --build $B --label a6 --engine chromium --frames $A/glance/frames --sheets $A/glance; echo "capture exit $?" ;;
    gpu) $A/run.sh gpu-a6-chromium-E-1 --timeout 30 -- node $H/e1-census.mjs --build $B --engine chromium --gpu metal --scenes ambient --out $A/json/a6-gpu; echo "gpu exit $?" ;;
  esac
done
