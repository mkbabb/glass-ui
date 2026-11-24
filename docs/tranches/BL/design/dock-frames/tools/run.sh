#!/usr/bin/env bash
# run.sh <engine> <target>[,<target>...]
# Runs the probe for each target, both pointers (fine 1440 light+dark, coarse 390
# light+dark), in one process sequence: one browser per probe call, a context per cell.
# Starts the two preview servers (5371 = v11.1.0, 5372 = wi8) when a local target is
# named and stops them by PID on exit. Rows land in trees/raw/.
# Chromium:  ~/.claude/guard/guarded --timeout 60 -- tools/run.sh chromium fourier,repro,hand,glass,keyframes,color,daraksha
# WebKit:    ~/.claude/guard/guarded --exclusive webkit --timeout 40 -- tools/run.sh webkit fourier,repro,hand,glass,keyframes,color,daraksha
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
ENGINE="$1"; TARGETS="$2"; shift 2
EXTRA=("$@")
RAW="$ROOT/trees/raw"; mkdir -p "$RAW"
PIDS=()
cleanup() { for p in "${PIDS[@]:-}"; do [ -n "$p" ] && kill "$p" 2>/dev/null; done; }
trap cleanup EXIT INT TERM
needs_local=0
for t in ${TARGETS//,/ }; do case "$t" in repro|hand) needs_local=1;; esac; done
if [ "$needs_local" = 1 ]; then
    for pair in "v11.1.0 5371" "wi8 5372"; do
        set -- $pair
        ( cd "$ROOT/trees/$1" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --host 127.0.0.1 --port "$2" --strictPort ) > "$ROOT/trees/serve-$2.log" 2>&1 &
        PIDS+=($!)
    done
    for port in 5371 5372; do
        for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$port/" && break; sleep 0.5; done
    done
fi
for t in ${TARGETS//,/ }; do
    for p in fine coarse; do
        S="$HERE/scenarios/$t-$p.json"
        case "$t" in
            repro) runs=("v11.1.0 fourier-dock" "wi8 fourier-dock");;
            hand) runs=("v11.1.0 dock" "wi8 dock");;
            *) runs=("live $t");;
        esac
        for r in "${runs[@]}"; do
            set -- $r
            echo "== $(date +%T) $ENGINE $t $p $1"
            node "$HERE/probe.mjs" "$1" "$2" "$S" --engine "$ENGINE" --out "$RAW" --no-strip ${EXTRA[@]+"${EXTRA[@]}"} 2>&1 | cut -c1-400
        done
    done
done
echo "== done $(date +%T)"
