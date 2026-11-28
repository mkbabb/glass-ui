#!/usr/bin/env bash
# mkpatch.sh <base-tree> <cure-tree> <out.patch>: the src/ and tests/ difference as a git patch,
# made in a throwaway repository under $TMPDIR (removed on exit). cure.patch was made with it.
set -euo pipefail
B="$1"; C="$2"; OUT="$3"
W="$(mktemp -d "${TMPDIR:-/tmp}/mkpatch.XXXXXX")"
trap 'rm -rf "$W"' EXIT
cd "$W"
git init -q .
git config user.email p@p; git config user.name p
mkdir src tests
(cd "$B" && tar cf - src tests) | tar xf -
git add -A >/dev/null; git commit -qm base
rm -rf src tests
(cd "$C" && tar cf - src tests) | tar xf -
git add -A >/dev/null
git diff --cached --no-color --no-ext-diff -M > "$OUT"
