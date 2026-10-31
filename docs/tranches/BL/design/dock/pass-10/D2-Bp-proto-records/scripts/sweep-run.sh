#!/bin/bash
# sweep-run.sh <build> <engines> <runs> <step> [extra sweep args]: the phase sweep, both themes per engine, in one guarded slot per engine.
set -u
b=$1; engs=$2; runs=$3; step=$4; shift 4
G=/Users/mkbabb/Programming/glass-ui; OUT=$G/.claude/worktrees/bl/D2/p10/Bp-build/out; D=$G/docs/tranches/BL/design/dock
REC=$D/pass-10/D2-Bp-proto-records; S=$REC/scripts; AD=$D/pass-3/adapter-floor-v2.mjs; X=$REC/${SWEEPDIR:-sweep}; mkdir -p $X
for e in $engs; do
  GF=""; [ $e = webkit ] && GF="--exclusive webkit"
  ~/.claude/guard/guarded $GF --timeout 85 -- bash -c '
    e='$e'; b='$b'; echo "admitted $(date) $(uptime)"
    for t in light dark; do TH=""; [ $t = dark ] && TH="--theme dark"
      '$S'/seatlock.sh node '$S'/sweep.mjs --build '$OUT'/builds/$b --adapter '$AD' --engine $e $TH --from 40 --to 200 --step '$step' --runs '$runs' --json '$X'/$b-$e-$t.json '"$*"' > '$X'/$b-$e-$t.log 2>&1
      echo "$t exit $? $(date) $(uptime)"
    done' > $X/slot-$b-$e.log 2>&1
done
