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

node scripts/verify.mjs --state auto --profile release --require-terminal

if [[ ! -f dist/index.d.ts ]]; then
    echo "ERROR: terminal verification did not leave dist/index.d.ts" >&2
    exit 1
fi

git tag -a "$VERSION" -m "glass-ui $VERSION"

echo "Created annotated tag $VERSION."
echo "Publish with: npm publish"
echo "Push with: git push origin HEAD $VERSION"
