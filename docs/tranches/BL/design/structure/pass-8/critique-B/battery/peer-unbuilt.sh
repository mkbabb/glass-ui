#!/usr/bin/env bash
# peer-unbuilt.sh <built tree> · critique-B pass 8 · REGISTRY §P7-6.4 "the peer probe on an unbuilt tree, which exits
# 2" and P7-G4 / S-14 "no judge passes on a missing input". Written and hashed BEFORE reading pass-8/B-kit.
# PEER_CMD is the route's probe with {ROOT} for the tree (default: the pass-8 kit's tools/peer-closure.mjs --root).
# The tree must be built (dist/ present). Each case moves dist aside or edits it and restores it.
#   U0 built, unchanged                  expect 0 (control)
#   U1 dist/ absent                      expect 2
#   U2 dist/ present, empty              expect 2
#   U3 dist/ present, the motion-core entry file(s) removed (dist/motion-core.*)   expect 2
#   U4 dist/ present, the motion-core entry file emptied (0 bytes)               RECORD (an empty build output)
# Prints `PEERU <id> <PASS|FAIL|INFO> rc=<n> expect=<n> :: <last output line>`.
set -u
T="$1"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"
KIT="${KIT:-$HERE/../../B-kit}"
CMD="${PEER_CMD:-node $KIT/tools/peer-closure.mjs --root {ROOT}}"; CMD="${CMD//\{ROOT\}/$T}"
TMP="${CRIT_TMP:-/tmp}/peeru8.$$"; mkdir -p "$TMP"
[ -d dist ] || { echo "PEERU SETUP FAIL the tree is not built (no dist/)"; exit 1; }
run() { eval "$CMD" >"$TMP/o.log" 2>&1; echo $?; }
last() { grep -v '^\s*$' "$TMP/o.log" | tail -1 | cut -c1-220; }
say() { if [ "$4" = info ]; then echo "PEERU $1 INFO rc=$2 :: $(last)"; elif [ "$2" = "$3" ]; then echo "PEERU $1 PASS rc=$2 expect=$3 :: $(last)"; else echo "PEERU $1 FAIL rc=$2 expect=$3 :: $(last)"; fi; }
say U0-built "$(run)" 0 ""
mv dist "$TMP/dist"; say U1-no-dist "$(run)" 2 ""
mkdir dist; say U2-empty-dist "$(run)" 2 ""; rmdir dist
mv "$TMP/dist" dist
mkdir -p "$TMP/mc"; mc=$(ls dist | grep -E '^motion-core\.' || true)
for f in $mc; do mv "dist/$f" "$TMP/mc/"; done
say U3-no-motion-core "$(run)" 2 ""; for f in $mc; do mv "$TMP/mc/$f" dist/; done
js=$(ls dist | grep -E '^motion-core\.(m?js)$' | head -1)
if [ -n "$js" ]; then cp "dist/$js" "$TMP/mcjs"; : > "dist/$js"; say U4-empty-entry "$(run)" - info; cp "$TMP/mcjs" "dist/$js"; fi
say U5-built-again "$(run)" 0 ""
rm -rf "$TMP"
