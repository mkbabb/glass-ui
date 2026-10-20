#!/bin/bash
# H6-after-selftest.sh (entry 2 of the H6 seat): waits for the entry-2 self-test to finish (one heavy run at a time),
# then runs the H6 baseline (H6-chain.sh: fv4 and bp, Chromium then Playwright WebKit, one slot per theme, H6-10).
#   bash H6-after-selftest.sh <out>
set -u
OUT=$1; P=$(cd "$(dirname "$0")" && pwd)
until [ -s "$P/H6-records/selftest-entry2-done.txt" ]; do sleep 60; done
# the WebKit W1+W2 slot reached the 90-min clamp at load 121-155 (cardlerp alone 2,302 s); W2's last seven faults run
# in their own --exclusive webkit slot before the baseline
bash "$P/H6-selftest.sh" "$OUT/../st" webkit "W2:foldtail,notab,noname,cwidth,depthscroll,nestgrow,arrowclamp"
echo "$(date) baseline start · $(uptime)" >> "$P/H6-records/after-selftest.log"
bash "$P/H6-chain.sh" "$OUT" fv4 bp
echo "$(date) baseline end · $(uptime)" >> "$P/H6-records/after-selftest.log"
