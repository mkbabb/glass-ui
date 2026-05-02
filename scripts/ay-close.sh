#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

export GLASS_UI_PACKAGE_ARTIFACT="${GLASS_UI_PACKAGE_ARTIFACT:-docs/tranches/F/audit/W6-package-proof.json}"
export GLASS_UI_CONSUMERS_STATIC_ARTIFACT="${GLASS_UI_CONSUMERS_STATIC_ARTIFACT:-docs/tranches/F/audit/W6-consumers-static.json}"
export GLASS_UI_CONSUMERS_BUILD_ARTIFACT="${GLASS_UI_CONSUMERS_BUILD_ARTIFACT:-$ROOT/docs/tranches/F/audit/W6-consumers-build.json}"
export GLASS_UI_THEME_ARTIFACT="${GLASS_UI_THEME_ARTIFACT:-docs/tranches/F/audit/W6-tailwind-theme-proof.json}"
export GLASS_UI_RUNTIME_ARTIFACT="${GLASS_UI_RUNTIME_ARTIFACT:-docs/tranches/F/audit/W6-runtime-smoke.json}"
export GLASS_UI_RUNTIME_SCREENSHOT_DIR="${GLASS_UI_RUNTIME_SCREENSHOT_DIR:-docs/tranches/F/audit/screenshots/W6/runtime}"
export GLASS_UI_BUNDLE_ARTIFACT="${GLASS_UI_BUNDLE_ARTIFACT:-docs/tranches/F/audit/W6-bundle-profile.json}"
export GLASS_UI_AURORA_PROFILE_ARTIFACT="${GLASS_UI_AURORA_PROFILE_ARTIFACT:-docs/tranches/F/audit/W6-aurora-profile.json}"

echo "ay-close proof ceremony for tranche close"
echo "========================================="

echo
echo "[1/11] Clean dist and Vite cache"
rm -rf dist node_modules/.vite

echo
echo "[2/11] Full typecheck"
time npm run typecheck

echo
echo "[3/11] Full build"
time npm run build

echo
echo "[4/11] Export type proof"
time npm run verify-export-types

echo
echo "[5/11] Iter test"
time npm run iter-test

echo
echo "[6/11] Package fixture proof"
time npm run proof:package

echo
echo "[7/11] Consumer static policy"
time npm run proof:consumers:static

echo
echo "[8/11] Consumer builds"
time npm run proof:consumers:build

echo
echo "[9/11] Theme/style proof"
time npm run proof:theme

echo
echo "[10/11] Runtime and bundle artifacts"
time npm run proof:runtime
time npm run profile:bundle

echo
echo "[11/11] Aurora profile"
time npm run profile:aurora

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
