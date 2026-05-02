#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

export GLASS_UI_CONSUMERS_STATIC_ARTIFACT="${GLASS_UI_CONSUMERS_STATIC_ARTIFACT:-docs/tranches/F/audit/W6-consumers-static.json}"
export GLASS_UI_CONSUMERS_BUILD_ARTIFACT="${GLASS_UI_CONSUMERS_BUILD_ARTIFACT:-$ROOT/docs/tranches/F/audit/W6-consumers-build.json}"

npm run proof:consumers:static
npm run proof:consumers:build
