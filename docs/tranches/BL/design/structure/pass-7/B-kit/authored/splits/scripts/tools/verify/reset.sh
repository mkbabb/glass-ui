#!/bin/sh
# reset.sh <before snapshot> <worktree> — put the files a zone-scripts split touches back to the
# snapshot taken before any split (scripts/ with --delete, tests/, vite.style-assets.ts,
# package.json). The snapshot is `rsync -a --exclude node_modules scripts tests
# vite.style-assets.ts package.json <snapshot>/`, run in the worktree before the first derive.
set -e
B=$1; W=$2
rsync -a --delete --exclude node_modules "$B/scripts/" "$W/scripts/"
rsync -a --exclude node_modules "$B/tests/" "$W/tests/"
cp "$B/vite.style-assets.ts" "$B/package.json" "$W/"
