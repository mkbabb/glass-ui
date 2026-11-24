#!/usr/bin/env bash
# seat.sh <cmd...>: runs one command while holding the lock directory logs/r2/.seat that the
# second round's batches share, so this seat runs one heavy job at a time.
# Under the guard: guarded --timeout N -- ./seat.sh <cmd...>
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
until mkdir "$HERE/logs/r2/.seat" 2>/dev/null; do sleep 5; done
trap 'rmdir "$HERE/logs/r2/.seat"' EXIT
"$@"
