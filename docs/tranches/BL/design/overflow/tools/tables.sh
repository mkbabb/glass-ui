#!/usr/bin/env bash
# tables.sh <family-prefixes>: the witness rows for SWEEP.md, WebKit first then Chromium,
# the latest build of each (a later file replaces an earlier row).
HERE="$(cd "$(dirname "$0")" && pwd)"
I="$HERE/../record/inspect"
files=()
for f in witness2.webkit witness3-wk.webkit witness3.chromium witness3-dialog.chromium witness4.webkit witness4c.webkit witness4.chromium witness4b.chromium witness4c.chromium; do
    [ -f "$I/$f.json" ] && files+=("$I/$f.json")
done
node "$HERE/witness-table.mjs" --only "$1" "${files[@]}"
