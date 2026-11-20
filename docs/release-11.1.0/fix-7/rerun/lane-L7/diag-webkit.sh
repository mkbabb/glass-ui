#!/usr/bin/env bash
# Lane L7 WebKit diagnostic: a 400 ms task on both trees in one lock hold, to tell whether
# WebKit's screencast can capture while the main thread is blocked at all.
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
export L7_TASK_MS=400
bash "$HERE/runprobe.sh" "$ROOT" 7995 webkit diag400 green underline,circle; echo "green exit $?"
bash "$HERE/runprobe.sh" "$ROOT/.cache/l5-v1100" 7996 webkit diag400red red underline; echo "red exit $?"
