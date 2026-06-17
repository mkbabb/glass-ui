#!/usr/bin/env bash
# release.sh — Tighten the release flow so the dist artefact and the
# tagged source are always coherent.
#
# Usage:
#   bash scripts/release.sh v0.8.5
#
# What it does (post O.W5 Lane B + Lane D consolidation):
#   1. Reads the version arg (must match the form `vX.Y.Z`).
#   2. Verifies `package.json.version` matches (sans the `v` prefix).
#   3. Ensures the working tree is clean (no uncommitted changes).
#   4. Runs the upstream gate matrix:
#        a) typecheck                — fail-fast on type errors
#        b) build                    — produces dist/ for gates below
#        c) verify-export-types      — subpath publication binary gate
#                                      (L.W0 Lane III; supersedes the
#                                      former env-gated bash probe loop)
#        d) profile:budget --enforce — bundle-budget gate
#   5. Performs a post-build smoke check on `dist/index.d.ts`.
#   6. Tags the release with an annotated tag.
#
# Aborts on any failure.
#
# Single-source-of-truth split (O.W5 Lane D):
#   release.sh       → typecheck + build + verify-export-types + profile:budget
#   prepublishOnly   → build + test
#
# `prepublishOnly` re-runs the build defensively so that `npm publish`
# invoked directly (without release.sh) still produces a fresh dist.
# `npm test` runs exactly once, owned by `prepublishOnly`. The previous
# script ran typecheck + test + build all inline AND prepublishOnly
# re-ran build + test, producing 3 redundant invocations. The new shape
# eliminates the test duplication (was 2x → now 1x) and keeps the
# defensive build redundancy with documented rationale.

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

# Upstream gate matrix — release-only gates. `prepublishOnly` owns
# test (and re-runs build defensively at publish time). The legacy
# 7-subpath hardcoded bash probe loop was retired at O.W5 Lane B;
# `verify-export-types` enumerates every subpath from package.json
# and subsumes the loop's coverage.

# AS.W2 inv-θ — the release gate set is the manifest's filter, NOT a
# hand-curated inline list. Before AS.W2 release.sh ran 4 gates and ZERO
# proof:*, so VT-name / surface / phantom-class drift between the last CI run
# and the tag shipped unguarded.
#
# BB.W-CLOSE-BATTERY — the tag now re-runs `--run full` (the DEDUPED union
# local ∪ ci ∪ release), NOT `--run release` alone. BA's close claimed
# `--run local` green while `ci ⊂ local` carried 18 reds AND never ran the union
# siblings-absent; `--run full` makes that close-class lie impossible (the runner
# is siblings-absent by construction, siblings skip-by-policy, so the clean-runner
# union IS the CI-accurate battery). `proof:close-battery-parity` locks this path.
echo "[release] running the manifest 'full' gate set (local ∪ ci ∪ release)..."
node scripts/gates.mjs --run full

echo "[release] Smoke check on dist/index.d.ts..."
if [[ ! -f dist/index.d.ts ]]; then
    echo "ERROR: dist/index.d.ts missing after build" >&2
    exit 1
fi

echo "[release] Tagging $VERSION..."
git tag -a "$VERSION" -m "glass-ui $VERSION"

echo "[release] Done. Tag $VERSION created."
echo "  Publish with: npm publish    # prepublishOnly = build + test (defensive)"
echo "  Push tag:     git push origin $VERSION"
echo "  Push branch:  git push origin master"
