#!/bin/bash
# w3try.sh <build> <engine> <theme> <tag> [cells regex]: one W3 read, under the guard and the seat lock (diagnosis; enters no row).
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-build; D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-10/D2-Bp-proto-records; S=$REC/scripts; AD=$D/pass-3/adapter-floor-v2.mjs; OUT=$B/out
b=$1; e=$2; t=$3; tag=$4; cells=${5:-}
GF=""; [ $e = webkit ] && GF="--exclusive webkit"
TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"
C=""; [ -n "$cells" ] && C="--cells $cells"
F=""; [ -z "$cells" ] && F="--no-faces"
mkdir -p $REC/try
$S/seatlock.sh $HOME/.claude/guard/guarded $GF --timeout 30 -- $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $e $F $C --out $OUT/try/$b-$e-$t-$tag > $REC/try/$b-W3-$e-$t-$tag.log 2>&1
echo "$b $e $t $tag exit $?"; grep -E "^FAIL  W3  [A-Z]" $REC/try/$b-W3-$e-$t-$tag.log | sed -E 's/^(FAIL  W3  [A-Za-z ]+  [^ ]+).*(FAILED: .*)$/\1 \2/' | cut -c1-170
