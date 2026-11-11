#!/usr/bin/env bash
# Last verdict line of every witness log under critic-3, per tree and engine.
cd "$(dirname "$0")"
for d in fix3-witness fix2-witness c2-probe probe rerun/lane-L1 rerun/lane-L2 rerun/lane-L3 rerun/lane-L4 rerun/lane-L5 rerun/lane-L6 rerun/lane-L7; do
  for E in chromium webkit; do for T in green pre red; do
    f=$d/out/$T-$E.log; [ -f "$f" ] || continue
    echo "$d $T $E: $(grep -v '^\s*$' "$f" | grep -vi 'guard' | tail -1 | cut -c1-420)"
  done; done
done
for E in chromium webkit; do [ -f fix3-witness/out/judge-$E.log ] && tr '\n' ';' < fix3-witness/out/judge-$E.log && echo; done
grep -E " exit | lane L" chain.log | sed -E 's/tree=[^ ]*//g; s/pkg=[^ ]*//g' | cut -c1-200
