#!/usr/bin/env bash
# item.sh <item> [engines]: one S item's reads, each engine one guarded browser run (WebKit under --exclusive webkit), the
# item's tree served by s9/dev9.sh inside the guard. Log: logs/s9-<item>-run.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; G=~/.claude/guard/guarded; I="$1"; ENG="${2:-chromium webkit}"; LOG="$H/../logs/s9-$I-run.log"
cd "$H"
for e in $ENG; do
  F=""; [ "$e" = webkit ] && F="--exclusive webkit"
  echo "== $I $e start $(date '+%F %T') (load $(sysctl -n vm.loadavg))" >> "$LOG"
  $G $F --timeout 88 -- s9/dev9.sh 5454 "sh s9/$I.sh $e" >> "$LOG" 2>&1
  echo "== $I $e rc=$? end $(date '+%F %T') (load $(sysctl -n vm.loadavg))" >> "$LOG"
  ls "$H/../../.." >/dev/null; [ -d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s9-cand/.s9-orig ] && [ -n "$(ls /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s9-cand/.s9-orig)" ] && echo "PLANT LEFT APPLIED" >> "$LOG"
done
echo "== $I ALL DONE $(date '+%F %T')" >> "$LOG"
