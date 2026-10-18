#!/bin/bash
# chain2.sh (D2-B′ critic, pass 5): the rest of chain.sh's Playwright WebKit groups, merged into two
# --exclusive webkit slots so the lock is queued twice, not seven times (the lock waits were ~70 min each and
# each WebKit group ran in minutes). Each slot runs battery-part.sh's `part` stage with NOGUARD=1 under one
# guarded slot (90 min clamp). Same witnesses, same stage names, same re-run rule. Then PR + adapter law.
#   bash chain2.sh <out> <worktree> <pid to wait for>
set -u
OUT=$1; WT=$2; WAIT=${3:-}
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; BPART=$D/pass-5/D2-Bp-proto-records/battery-part.sh
REC=$D/pass-5/D2-Bp-crit-records/battery
[ -n "$WAIT" ] && while kill -0 $WAIT 2>/dev/null; do sleep 15; done
echo "$(date) chain.sh stopped after its [ST R5 CF] group; chain2 continues · $(uptime)" >> $REC/chain.log
export BPART OUT REC
slot() { # name, then a list of "stage|theme|witnesses"
  local name=$1; shift
  echo "$(date) start bp webkit $name [$*] · $(uptime)" >> $REC/chain.log
  ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- bash -c '
    for g in "$@"; do IFS="|" read -r st th w <<< "$g"; PT=; [ "$th" = dark ] && PT=dark
      echo "$(date) · group $st [$w] · $(uptime)" >> $REC/chain.log
      NOGUARD=1 BUILD=bp ENG=webkit REC=$REC PSTAGE=$st PTHEME=$PT PWIT="$w" bash $BPART $OUT part
    done' _ "$@" >> $REC/chain-bp-webkit.log 2>&1
  echo "$(date) end bp webkit $name exit $? · $(uptime)" >> $REC/chain.log
}
slot light "main|light|L1 FM W2 CASES" "rest|light|W1 W4 W5 W6 W7 W8 R6"
slot dark "dark|dark|ST FM W1 W3 W2 R5 CF" "darkrest|dark|W4 W5 W6 W7 W8 R6"
BUILD=bp ENG=chromium REC=$REC WT=$WT bash $D/harness/battery.sh $OUT extra
echo "CHAIN-DONE $(date)" >> $REC/chain.log
