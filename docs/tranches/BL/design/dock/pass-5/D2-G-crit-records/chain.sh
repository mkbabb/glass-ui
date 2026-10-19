#!/bin/bash
# chain.sh (D2-G critic, pass 5): the H5 battery on g, both engines, both themes, through the G prototype's
# battery-part.sh (harness/battery.sh + a `part` stage). Chromium: one guarded slot per witness group. Playwright
# WebKit: two --exclusive webkit slots (light, dark), each running its groups with NOGUARD=1 inside the one slot, so
# the machine-wide lock is queued twice. Same witnesses, stage names and re-run rule as battery.sh's stages.
#   ENGS="chromium webkit" bash chain.sh <out>
set -u
OUT=$1
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; BPART=$D/pass-5/D2-G-proto-records/battery-part.sh
REC=$D/pass-5/D2-G-crit-records/battery; mkdir -p $REC
export BPART OUT REC
grp() { # stage theme witnesses (chromium)
  echo "$(date) start g chromium $1 [$3] · $(uptime)" >> $REC/chain.log
  PT=; [ $2 = dark ] && PT=dark
  BUILD=g ENG=chromium REC=$REC TMIN=90 PSTAGE=$1 PTHEME=$PT PWIT="$3" bash $BPART $OUT part >> $REC/chain-g-chromium.log 2>&1
  echo "$(date) end g chromium $1 [$3] exit $? · $(uptime)" >> $REC/chain.log
}
slot() { # name, then "stage|theme|witnesses" ... (webkit)
  local name=$1; shift
  echo "$(date) queue g webkit $name [$*] · $(uptime)" >> $REC/chain.log
  ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- bash -c '
    for g in "$@"; do IFS="|" read -r st th w <<< "$g"; PT=; [ "$th" = dark ] && PT=dark
      echo "$(date) · webkit group $st [$w] · $(uptime)" >> $REC/chain.log
      NOGUARD=1 BUILD=g ENG=webkit REC=$REC PSTAGE=$st PTHEME=$PT PWIT="$w" bash $BPART $OUT part
    done' _ "$@" >> $REC/chain-g-webkit.log 2>&1
  echo "$(date) end g webkit $name exit $? · $(uptime)" >> $REC/chain.log
}
for e in ${ENGS:-chromium webkit}; do
  if [ $e = chromium ]; then
    grp main light "W3"; grp main light "ST R5 CF"; grp main light "L1 FM W2 CASES"
    grp rest light "W1 W4 W5 W6 W7 W8 R6"
    grp dark dark "ST FM W1"; grp dark dark "W3"; grp dark dark "W2 R5 CF"
    grp darkrest dark "W4 W5 W6 W7 W8 R6"
  else
    slot light "main|light|W3 ST R5 CF" "main|light|L1 FM W2 CASES" "rest|light|W1 W4 W5 W6 W7 W8 R6"
    slot dark "dark|dark|ST FM W1 W3 W2 R5 CF" "darkrest|dark|W4 W5 W6 W7 W8 R6"
  fi
done
echo "CHAIN-DONE $ENGS $(date)" >> $REC/chain.log
