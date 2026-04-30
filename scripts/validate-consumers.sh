#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
PARENT="$(dirname "$ROOT")"
CONSUMERS=(
    "fourier-analysis/web"
    "words/frontend"
    "bbnf-lang/playground"
)

echo "Consumer build validation"
echo "========================="

status=0
for consumer in "${CONSUMERS[@]}"; do
    consumer_dir="$PARENT/$consumer"

    echo
    echo "[$consumer] npm run build"
    echo "path: $consumer_dir"

    if [[ ! -d "$consumer_dir" ]]; then
        echo "[$consumer] FAIL: missing consumer directory"
        status=1
        continue
    fi

    if (cd "$consumer_dir" && time npm run build); then
        echo "[$consumer] PASS"
    else
        rc=$?
        echo "[$consumer] FAIL: npm run build exited $rc"
        status=1
    fi
done

exit "$status"
