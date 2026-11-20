#!/usr/bin/env bash
# stop.sh <port>...: stops this audit's preview servers by PID.
HERE="$(cd "$(dirname "$0")" && pwd)"
for P in "$@"; do F="$HERE/../logs/.serve-$P.pid"; [ -f "$F" ] && { kill "$(cat "$F")" 2>/dev/null && echo "stopped $P"; rm -f "$F"; }; done
