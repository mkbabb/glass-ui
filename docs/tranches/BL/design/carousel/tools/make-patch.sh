#!/usr/bin/env bash
# make-patch.sh <base-tree> <cured-tree> <file>...
# Writes to stdout a git-style patch of each named file, from the base tree to the cured
# tree (a file missing from the base is a new file). The study's patches are made this
# way from trees built out of `git archive`, so nothing in glass's checkout is touched.
set -euo pipefail
BASE="$1"; CURE="$2"; shift 2
for f in "$@"; do
    if [ -f "$BASE/$f" ]; then
        if ! cmp -s "$BASE/$f" "$CURE/$f"; then
            echo "diff --git a/$f b/$f"
            diff -u --label "a/$f" --label "b/$f" "$BASE/$f" "$CURE/$f" || true
        fi
    else
        echo "diff --git a/$f b/$f"
        echo "new file mode 100644"
        diff -u --label /dev/null --label "b/$f" /dev/null "$CURE/$f" || true
    fi
done
