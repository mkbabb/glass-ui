#!/bin/bash
# H4-chain-d.sh: entry 5's chain, batched. With every seat on the machine routing runs through the guard, a single
# guarded run waited 55 min for a slot (base-W3-fv2's first re-run, 12:23-13:18 Oct 15, load 11-15), so a witness
# run per admission would not finish. Each stage here is ONE guarded run (one heavy run for this seat, the guard's
# slot, RSS cap and reaping) that runs its witnesses one at a time, bare (GUARD=""), main run then two re-runs of
# its red cells, as H4-chain-c.sh would have.
#   bash H4-chain-d.sh <out> <stage>      stage: main | rest1 | rest2 | dark
set -u
OUT=$1; STAGE=$2
P=$(cd "$(dirname "$0")" && pwd); REC=$P/H4-records
G="$HOME/.claude/guard/guarded --timeout ${TMIN:-170} --"
case $STAGE in
main)  $G env GUARD= bash -c "bash '$P/H4-baseline.sh' '$OUT' W3 'fv2 bp g head'; bash '$P/H4-baseline.sh' '$OUT' ST fv2; bash '$P/H4-baseline.sh' '$OUT' FM head" ;;
rest1) $G env GUARD= SUB=rest bash "$P/H4-baseline-rest.sh" "$OUT" "W1 W2 W4" "fv2 bp g head" ;;
rest2) $G env GUARD= SUB=rest bash "$P/H4-baseline-rest.sh" "$OUT" "W5 W6 W7 W8 R6" "fv2 bp g head" ;;
dark)  $G env GUARD= SUB=dark THEME=dark bash "$P/H4-baseline-rest.sh" "$OUT" "ST FM W1 W3" "fv2 bp g" ;;
esac
echo "exit $? · $(date) $(uptime)" > "$REC/chaind-$STAGE.txt"
# the witness JSON of every run, kept beside the logs (the <out> dies with the seat worktree)
(cd "$OUT" && find . -name '[A-Z]*.json' -path '*runs*' | while read -r f; do mkdir -p "$REC/json/$(dirname "$f")"; cp "$f" "$REC/json/$f"; done)
