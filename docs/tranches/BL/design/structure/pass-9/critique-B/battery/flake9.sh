#!/usr/bin/env bash
# flake9.sh <KIT dir> <scratch> · critique-B pass 9 · P7-R2 regression: pass-8's hashed flake-cases.mjs fixtures through
# the pass-9 tally, flags as LAW §13 (pass 8) names them. Written and hashed BEFORE reading pass-9/B-kit. The output is
# compared line for line (paths normalised) with the pass-8 critic's committed results/flake.txt tally lines.
set -u
K="$(cd "$1" && pwd)"; S="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"; P8="$HERE/../../../pass-8/critique-B"
node "$P8/battery/flake-cases.mjs" --out "$S/flake" > /dev/null; F="$(cd "$S/flake" && pwd)"
node "$K/tools/browser-tally.mjs" --base "$F/base.json" --route "$F/route.json" \
  --base-rerun "$F/rerun-base-1.json" --base-rerun "$F/rerun-base-2.json" --base-rerun "$F/rerun-base-3.json" \
  --route-rerun "$F/rerun-route-1.json" --route-rerun "$F/rerun-route-2.json" --route-rerun "$F/rerun-route-3.json" > "$F/tally.txt" 2>&1
echo "FLAKE9 tally rc=$?"; sed "s#$F#<F>#g" "$F/tally.txt"
grep -E 'F[1-8]' "$P8/results/flake.txt" | sed -E 's#/[^ ]*/flake#<F>#g' > "$F/ref.txt"
grep -E 'F[1-8]' "$F/tally.txt" | sed "s#$F#<F>#g" > "$F/mine.txt"
if diff "$F/ref.txt" "$F/mine.txt" > "$F/diff.txt"; then echo "FLAKE9 SAME as pass-8's committed flake.txt case lines ($(wc -l < "$F/mine.txt" | tr -d ' ') lines)"; else echo "FLAKE9 DIFFERS from pass-8's case lines:"; cat "$F/diff.txt"; fi
