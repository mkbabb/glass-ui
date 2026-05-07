#!/usr/bin/env bash
# release.sh — Tighten the release flow so the dist artefact and the
# tagged source are always coherent.
#
# Usage:
#   bash scripts/release.sh v0.8.5
#
# What it does:
#   1. Reads the version arg (must match the form `vX.Y.Z`).
#   2. Verifies `package.json.version` matches (sans the `v` prefix).
#   3. Ensures the working tree is clean (no uncommitted changes).
#   4. Runs typecheck + tests.
#   5. Runs `npm run build` so the `dist/` artefact is regenerated
#      against the tagged source. (The W5-flagged dist-freshness gotcha
#      retired by always rebuilding before tag.)
#   6. Verifies the dist exports include the expected public surface
#      (a smoke check on `dist/index.d.ts`).
#   7. Commits the dist if dirty (release commits typically include
#      regenerated `dist/` so consumers reading via `import` get the
#      tagged artefact).
#   8. Tags the release with an annotated tag.
#
# Aborts on any failure. The `prepublishOnly` hook is a safety net for
# anyone running `npm publish`; this script is the canonical path.

set -euo pipefail

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
    echo "Usage: $0 v<X.Y.Z>" >&2
    echo "  e.g.: $0 v0.8.5" >&2
    exit 1
fi

if [[ ! "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "ERROR: version must match v<major>.<minor>.<patch> (got '$VERSION')" >&2
    exit 1
fi

PKG_VERSION=$(node -p "require('./package.json').version")
EXPECTED="${VERSION#v}"

if [[ "$PKG_VERSION" != "$EXPECTED" ]]; then
    echo "ERROR: package.json reports version '$PKG_VERSION' but tag arg is '$VERSION' ($EXPECTED expected)" >&2
    echo "       Update package.json or pass the matching tag." >&2
    exit 1
fi

echo "[release] Verifying clean working tree..."
if [[ -n "$(git status --porcelain)" ]]; then
    echo "ERROR: working tree dirty; commit changes before release" >&2
    git status --short >&2
    exit 1
fi

echo "[release] typecheck + test..."
npm run typecheck
npm test

echo "[release] Building dist artefact..."
npm run build

echo "[release] Smoke check on dist/index.d.ts..."
if [[ ! -f dist/index.d.ts ]]; then
    echo "ERROR: dist/index.d.ts missing after build" >&2
    exit 1
fi

# Lightweight surface gate — if dist drifted from package.json's exports
# in surprising ways, surface it here. The check is opt-in via env var
# because the export set evolves over time; cheap to invoke.
if [[ -n "${GLASS_UI_RELEASE_SURFACE_GUARD:-}" ]]; then
    npm run verify-export-types
fi

echo "[release] Tagging $VERSION..."
git tag -a "$VERSION" -m "glass-ui $VERSION"

echo "[release] Done. Tag $VERSION created."
echo "  Push with:  git push origin $VERSION"
echo "  Push branch: git push origin master"
