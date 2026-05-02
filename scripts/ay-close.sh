#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "ay-close proof ceremony for tranche close"
echo "========================================="

echo
echo "[1/9] Clean dist and Vite cache"
rm -rf dist node_modules/.vite

echo
echo "[2/9] Full typecheck"
time npm run typecheck

echo
echo "[3/9] Full build"
time npm run build

echo
echo "[4/9] Export type proof"
time npm run verify-export-types

echo
echo "[5/9] Iter test"
time npm run iter-test

echo
echo "[6/9] Package fixture proof"
time npm run proof:package

echo
echo "[7/9] Consumer static policy"
time npm run proof:consumers:static

echo
echo "[8/9] Consumer builds"
time npm run proof:consumers:build

echo
echo "[9/9] Runtime and bundle artifacts"
time npm run proof:runtime
time npm run profile:bundle

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
