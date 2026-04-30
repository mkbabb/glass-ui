#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "ay-close proof ceremony for tranche close"
echo "========================================="

echo
echo "[1/5] Clean dist and Vite cache"
rm -rf dist node_modules/.vite

echo
echo "[2/5] Full typecheck"
time npm run typecheck

echo
echo "[3/5] Full build"
time npm run build

echo
echo "[4/5] Iter test"
time npm run iter-test

echo
echo "[5/5] Consumer validation"
time npm run validate-consumers

echo
echo "Dist sizes"
dist_entries=(dist/*)
if [[ ! -d dist || ${#dist_entries[@]} -eq 0 ]]; then
    echo "FAIL: dist is missing or empty"
    exit 1
fi

du -sh dist "${dist_entries[@]}"

echo
echo "ay-close complete"
