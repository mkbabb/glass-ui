#!/bin/sh
# AMEND-7, K-3: no gate change. Runs amend6/tools/dtgate.mjs (v6) UNCHANGED on HEAD's src and on every plant
# (amend5, critique5, amend6, and CRITIQUE-6's c01-c06 re-labelled EXPECT RESIDUAL, the complement of v6's catch list).
# The c-plants are byte copies of critique6/plants/* except line 1, which this script rewrites; their sources' sha256
# are written to amend7/data/plants7.sha256 so the copy is checkable.
# usage (from anywhere): sh amend7/tools/run7.sh <glass-ui root>
set -eu
ROOT=$(cd "${1:?glass-ui root}" && pwd)
D=$(cd "$(dirname "$0")/../.." && pwd)   # apple-homeview/
cd "$D"
: > amend7/data/plants7.sha256
for src in critique6/plants/c0*.ts critique6/plants/frameClockGlobal.ts; do
  b=$(basename "$src")
  shasum -a 256 "$src" >> amend7/data/plants7.sha256
  if [ "$b" = frameClockGlobal.ts ]; then cp "$src" "amend7/plants/$b"; continue; fi
  why=$(head -1 "$src" | sed 's#^// EXPECT FAIL: ##')
  { printf '%s\n' "// EXPECT RESIDUAL: $why [complement of v6's catch list, GAP M-08 A7; CRITIQUE-6 plant, line 1 relabelled]"; tail -n +2 "$src"; } > "amend7/plants/$b"
done
shasum -a 256 amend6/tools/dtgate.mjs amend7/plants/*.ts >> amend7/data/plants7.sha256
DTGATE_OUT=amend7/data/dtgate7.json node amend6/tools/dtgate.mjs "$ROOT" \
  amend5/plants/*.ts critique5/plants/*.ts amend6/plants/*.ts amend7/plants/*.ts > amend7/data/dtgate7.stdout
