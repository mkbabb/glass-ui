#!/usr/bin/env bash
# chain8.sh: MEASURE-8's queues in order, one run at a time: A (the build and v11.0.2's page), B (the plants on the dev
# server), C (G-16's fixture and G-12 on archive builds). Log: logs/m8-chain.log (each queue's own log beside it).
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"
cd "$H"
for q in ha hb hc; do
  echo "$(date '+%F %T') queue $q start (load $(sysctl -n vm.loadavg))" >> "$L/m8-chain.log"
  python3 m8/runq.py m8/q/$q.q "$L/m8-q-$q.log"
  echo "$(date '+%F %T') queue $q done rc=$?" >> "$L/m8-chain.log"
done
