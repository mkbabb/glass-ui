#!/usr/bin/env bash
# batch.sh "<args>" ["<args>" ...]: runs exits.mjs once per arg set, one after another (one browser at a time).
#   ~/.claude/guard/guarded --timeout 90 -- ./batch.sh "11.0.2 chromium phone" "tip chromium phone"
#   WebKit: ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- ./batch.sh "11.0.2 webkit phone"
cd "$(dirname "$0")"
for A in "$@"; do
  L="../logs/run-$(echo $A | tr ' ' '_').log"
  echo "== $A $(date +%T)"; node exits.mjs $A > "$L" 2>&1; echo "   exit $? $(date +%T)"
done
