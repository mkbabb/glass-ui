#!/bin/bash
# mkpatch.sh (D2-G pass 4): the route-only patch, the seat worktree against its post-floor-v3 snapshot (.gbase),
# over src/, tests/, demo/ and docs/design/, then `git apply --check` on a HEAD + floor-v3 checkout.
#   bash mkpatch.sh <worktree> <head+fv3 checkout> <out.patch>
set -u
WT=$1; FV=$2; OUT=$(cd "$(dirname "$3")" && pwd)/$(basename "$3"); B=$WT/.gbase; REC=$(cd "$(dirname "$0")" && pwd)
: > "$OUT"
for pair in "src:src" "tests:tests" "demo:demo" "docs-design:docs/design"; do
  b=${pair%%:*}; w=${pair#*:}
  (cd "$WT" && git diff --no-index --no-renames --no-color --binary ".gbase/$b" "$w") \
    | sed -E -e "/^(diff --git|--- |\+\+\+ )/s#\.gbase/$b/#$w/#g" >> "$OUT"
done
n=$(grep -cE '\.shipped|\.rej|\.orig|\.gbase|\.gout' "$OUT"); echo "stray paths: $n"
echo "files: $(grep -c '^diff --git' "$OUT")  lines: $(wc -l < "$OUT")"
(cd "$FV" && git apply --check --verbose "$OUT" > /dev/null 2>"$REC/patch-apply-check.log"; echo "git apply --check exit $?")
shasum -a 256 "$OUT"
