#!/bin/bash
# B2's red (the hole read from paint): FM re-run twice per theme in one engine slot
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p6/Bp-crit; E=$1
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness; AD=$H/../pass-3/adapter-floor-v2.mjs
for t in light dark; do for k in 1 2; do
  o=$B/out/fmre/$E-$t-r$k; mkdir -p $o
  (uptime; env DOCK_HARNESS_THEME=$t node $H/film.mjs --build $B/out/builds/bp --adapter $AD --engine $E --out $o --cells '^film·(first-expand|warm-expand|warm-collapse|content-add)$'; echo "exit $?"; uptime) > $B/rec/fmre-$E-$t-r$k.log 2>&1
done; done
