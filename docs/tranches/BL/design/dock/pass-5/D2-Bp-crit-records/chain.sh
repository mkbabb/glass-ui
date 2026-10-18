#!/bin/bash
# chain.sh (D2-B′ critic, pass 5): the H5 battery on bp, both engines, both themes, through the prototype's
# battery-part.sh (harness/battery.sh + a `part` stage), each witness group in its own guarded slot so the
# 90 min clamp never cuts a stage (WebKit under --exclusive webkit inside battery-part.sh). Stage names and the
# witness sets equal battery.sh's main/rest/dark/darkrest, split into groups. Then PR + adapter law (extra).
#   bash chain.sh <out> <worktree>
set -u
OUT=$1; WT=$2
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; BPART=$D/pass-5/D2-Bp-proto-records/battery-part.sh
REC=$D/pass-5/D2-Bp-crit-records/battery; mkdir -p $REC
grp() { # engine stage theme witnesses
  echo "$(date) start bp $1 $2 [$4] · $(uptime)" >> $REC/chain.log
  if [ $3 = dark ]; then PT=dark; else PT=; fi
  BUILD=bp ENG=$1 REC=$REC TMIN=90 PSTAGE=$2 PTHEME=$PT PWIT="$4" bash $BPART $OUT part >> $REC/chain-bp-$1.log 2>&1
  echo "$(date) end bp $1 $2 [$4] exit $? · $(uptime)" >> $REC/chain.log
}
for e in ${ENGS:-chromium webkit}; do
  grp $e main light "W3"
  grp $e main light "ST R5 CF"
  grp $e main light "L1 FM W2 CASES"
  grp $e rest light "W1 W4 W5"
  grp $e rest light "W6 W7 W8 R6"
  grp $e dark dark "ST FM W1"
  grp $e dark dark "W3"
  grp $e dark dark "W2 R5 CF"
  grp $e darkrest dark "W4 W5 W6 W7 W8 R6"
done
[ -z "${NOEXTRA:-}" ] && BUILD=bp ENG=chromium REC=$REC WT=$WT bash $D/harness/battery.sh $OUT extra
echo "CHAIN-DONE $(date)" >> $REC/chain.log
