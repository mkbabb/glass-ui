#!/usr/bin/env bash
# serve-pair.sh: sourced by the fourth round's batches. Starts `vite preview` of
# .claude/worktrees/ps4-plain on 5361 and ps4-cure on 5362 as children of the batch (so
# the guard that runs the batch owns them), waits for both ports, and stops both by PID
# when the batch exits.
W="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../.." && pwd)/.claude/worktrees"
./serve.sh "$W/ps4-plain" 5361 > logs/r4/serve-5361.log 2>&1 &
SERVE_PLAIN=$!
./serve.sh "$W/ps4-cure" 5362 > logs/r4/serve-5362.log 2>&1 &
SERVE_CURE=$!
trap 'kill $SERVE_PLAIN $SERVE_CURE 2>/dev/null; wait $SERVE_PLAIN $SERVE_CURE 2>/dev/null; rmdir "$SEAT" 2>/dev/null' EXIT
for port in 5361 5362; do
    for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$port/" && break; sleep 1; done
done
