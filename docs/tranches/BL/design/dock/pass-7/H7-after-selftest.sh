#!/bin/bash
# H7 · after the self-test: the one red self-test cell (Chromium W3 fixture `pass`, retarget·120 [splice], load 11.4) re-run
# twice in its own guarded slot, then the baseline chain (H7-chain.sh).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/H7; D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-7/H7-records
for k in 1 2; do
  (uptime; $HOME/.claude/guard/guarded --timeout 20 -- node $H/w3-morph.mjs --fixture pass --engine chromium --cells '^retarget·120$' --out $B/out/w3re$k; echo "exit $?"; uptime) > $REC/selftest-chromium-W3-pass-retarget120-rerun$k.log 2>&1
done
bash $D/pass-7/H7-chain.sh
