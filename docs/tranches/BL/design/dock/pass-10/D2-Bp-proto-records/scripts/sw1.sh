#!/bin/bash
# sw1.sh <build> <engine> <theme> <dir> <runs> <step>: one sweep slot under the guard + seat lock.
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-build; D=$G/docs/tranches/BL/design/dock; REC=$D/pass-10/D2-Bp-proto-records; S=$REC/scripts; AD=$D/pass-3/adapter-floor-v2.mjs
TH=""; [ "$3" = dark ] && TH="--theme dark"; mkdir -p $REC/$4
$S/seatlock.sh $HOME/.claude/guard/guarded --timeout 40 -- node $S/sweep.mjs --build $B/out/builds/$1 --adapter $AD --engine $2 $TH --from 40 --to 200 --step $6 --runs $5 --json $REC/$4/$1-$2-$3.json > $REC/$4/$1-$2-$3.log 2>&1
grep -c . $REC/$4/$1-$2-$3.log; grep -h "splice [1-9]\|sliver [1-9]\|BLANK\|stub false\|ERROR" $REC/$4/$1-$2-$3.log | cut -c1-110
