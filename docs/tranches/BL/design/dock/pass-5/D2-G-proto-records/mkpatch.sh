#!/bin/bash
# mkpatch.sh: the route patch = diff(HEAD + floor-v4.patch, the seat worktree) over src demo tests docs/design.
#   bash mkpatch.sh <worktree> <ref-dir: git archive HEAD + floor-v4 applied> <out.patch>
set -u
WT=$1; REF=$2; OUT=$3
T=$(mktemp -d "${TMPDIR:-/tmp}/mkpatch.XXXX"); mkdir -p "$T/a" "$T/b"
for d in src demo tests docs/design; do
  rsync -a "$REF/$d/" "$T/a/$d/"; rsync -a --exclude node_modules "$WT/$d/" "$T/b/$d/"
done
(cd "$T" && git diff --no-index --no-color --full-index -- a b) | sed -E -e 's#^diff --git a/[ab]/([^ ]+) b/[ab]/#diff --git a/\1 b/#' -e 's#^--- a/[ab]/#--- a/#' -e 's#^\+\+\+ b/[ab]/#+++ b/#' > "$OUT"
rm -rf "$T"
shasum -a 256 "$OUT"
