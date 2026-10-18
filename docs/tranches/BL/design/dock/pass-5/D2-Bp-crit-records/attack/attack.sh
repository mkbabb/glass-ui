#!/bin/bash
# attack.sh (D2-B′ critic, pass 5): the critic's own arm on the prototype's one open stub cell (§6.2 of
# D2-Bp-proto.md: W3 content-add, dark, Chromium, red 2 of 3). Five independent W3 runs of content-add (and its
# neighbours content-remove, swap-long, swap-short), dark, Chromium, in ONE guarded slot; then the same light.
#   bash attack.sh <out>
set -u
OUT=$1; H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness; D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock
A=$D/pass-5/D2-Bp-crit-records/attack; B=$OUT/builds/bp; AD=$D/pass-3/adapter-floor-v2.mjs
export H B AD OUT A
~/.claude/guard/guarded --timeout 60 -- bash -c '
for th in dark light; do for k in 1 2 3 4 5; do
  log=$A/stub-$th-$k.log; uptime > $log
  DOCK_HARNESS_THEME=$th node $H/w3-morph.mjs --build $B --adapter $AD --out $OUT/attack/$th-$k --engine chromium --no-faces --cells "^(content-add|content-remove|swap-long|swap-short)$" >> $log 2>&1
  (echo "exit $?"; uptime) >> $log
done; done'
