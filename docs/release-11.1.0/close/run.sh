#!/usr/bin/env bash
# The 11.1.0 close battery, end to end, one guarded run at a time: the witness and release-spec
# chain (chain.sh), then the visual suite (scripts/queue.sh). Stops at the first guarded REFUSED.
#   run.sh [chain phases...] -- [queue steps...]
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
CH=(); Q=(); side=ch
for a in "$@"; do if [ "$a" = -- ]; then side=q; elif [ $side = ch ]; then CH+=("$a"); else Q+=("$a"); fi; done
echo "$(date '+%F %T') RUN start chain=[${CH[*]:-}] queue=[${Q[*]:-}]" >> "$HERE/run.log"
if [ ${#CH[@]} -gt 0 ]; then bash "$HERE/chain.sh" "${CH[@]}"; rc=$?; echo "$(date '+%F %T') chain exit $rc" >> "$HERE/run.log"; [ $rc -ne 0 ] && { echo "$(date '+%F %T') RUN STOP" >> "$HERE/run.log"; exit $rc; }; fi
if [ ${#Q[@]} -gt 0 ]; then zsh "$HERE/scripts/queue.sh" "${Q[@]}"; rc=$?; echo "$(date '+%F %T') queue exit $rc" >> "$HERE/run.log"; [ $rc -ne 0 ] && { echo "$(date '+%F %T') RUN STOP" >> "$HERE/run.log"; exit $rc; }; fi
echo "$(date '+%F %T') RUN DONE" >> "$HERE/run.log"
