#!/usr/bin/env bash
# stop.sh <port>...: stops the preview servers serve.sh started, by PID.
HERE="$(cd "$(dirname "$0")" && pwd)"
for PORT in "$@"; do
    F="$HERE/../trees/.serve-$PORT.pid"
    [ -f "$F" ] && { kill "$(cat "$F")" 2>/dev/null && echo "stopped $PORT"; rm -f "$F"; }
done
