#!/usr/bin/env bash

set -euo pipefail

VERSION="${1:-}"
if [[ ! "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Usage: $0 v<major>.<minor>.<patch>" >&2
    exit 1
fi

PACKAGE_VERSION=$(node -p "require('./package.json').version")
if [[ "${VERSION#v}" != "$PACKAGE_VERSION" ]]; then
    echo "ERROR: tag $VERSION does not match package version $PACKAGE_VERSION" >&2
    exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
    echo "ERROR: working tree must be clean before release" >&2
    git status --short >&2
    exit 1
fi

# Human pre-tag paint review — once per candidate, never automated here:
# - confirm the routed demo boots and paints;
# - run the existing visual suite once, including its WebKit/Safari project;
# - record the Fable gestalt and consolidation/flattening sweep;
# - inspect real-Safari var()-blur plus CARTOON-INK 3857b33,
#   GLASS-BLUR-PEER cd9ce46, FIELD-AURORA b3d65eec, and
#   BACKDROP-BLUR-ENGAGE 20b09bc7;
# - revisit W-DOCK1/W-DOCK2/W-CON1 and the D8/D24/D25,
#   GOO-SPLIT-PERF, and VIZ-PARITY-METAL device rows;
# - confirm the built ./fonts/* and ./styles/fonts export targets resolve.

npm run prepublishOnly
npm run verify:package

# The AURORA pixel floor runs HERE, on real hardware, not in CI. On the software
# rasterizer the aurora never arms (measured: 180s timeout on SwiftShader vs 22.8s
# green on Metal), so a CI job would gate on the runner's GPU rather than on our
# paint; CI carries the blob floor, which does run there. Both arms are required:
# the real render must be GREEN and the planted defect must be RED, or the floor is
# not biting. The paired machine reports are the captured DELTA — bank them with the
# candidate.
echo "== aurora pixel floor (real GPU) =="
npm -w tests-visual run gate:pixel-floor
npm -w tests-visual run gate:pixel-floor:planted

if [[ ! -f dist/index.d.ts ]]; then
    echo "ERROR: build did not leave dist/index.d.ts" >&2
    exit 1
fi

git tag -a "$VERSION" -m "glass-ui $VERSION"

echo "Created annotated tag $VERSION."
echo "Publish with: npm publish"
echo "Push with: git push origin HEAD $VERSION"
