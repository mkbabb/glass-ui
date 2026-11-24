#!/usr/bin/env bash
# build-tree.sh <tree-dir> <out-dir-name>
# Builds the tree's demo (demo/vite.demo-dist.config.ts, the static SPA the paint judge
# serves) into <tree>/<out-dir-name>, plus the study's stress page as a second HTML
# entry, /ovf.html (tools/app/, copied to <tree>/demo/__ovf/). The demo's own entry
# (demo/main.ts) is not touched: a wrapped entry that imports it lazily leaves the
# shell unmounted. The second entry rides tools/app/vite.ovf.config.ts, which merges
# one rollup input into the demo config and changes nothing else.
#
# The tree must be its own git root (git init + one commit): Tailwind's scanner honours
# the .gitignore files of the enclosing repository, and trees/.gitignore ignores `*`,
# so in a tree without its own .git every @source glob finds no file and the build
# silently drops every utility only the library's components use (truncate,
# overflow-hidden, py-2, items-baseline, ...).
#
# The tree is a git archive of release/11.1.1 with `npm ci --ignore-scripts` run in
# it (the demo builds from src/ through the @glass alias). Library source is never
# touched here; the cure is applied with `git apply`. A build takes about ten seconds,
# so it runs under the guard as a light run:
#   ~/.claude/guard/guarded --light --timeout 5 -- tools/build-tree.sh trees/v11.1.1 dist-base
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
OUTDIR="$2"
[ -d "$TREE/node_modules" ] || { echo "npm ci in $TREE first" >&2; exit 2; }
[ -d "$TREE/.git" ] || { echo "$TREE is not its own git root: Tailwind would scan nothing" >&2; exit 2; }
# an earlier wrapper, undone
if [ -f "$TREE/demo/main.demo.ts" ]; then mv "$TREE/demo/main.demo.ts" "$TREE/demo/main.ts"; fi
mkdir -p "$TREE/demo/__ovf"
cp "$HERE/app/main.ts" "$HERE/app/Stress.vue" "$TREE/demo/__ovf/"
rm -f "$TREE/demo/__ovf/entry.ts"
cp "$HERE/app/ovf.html" "$TREE/ovf.html"
cp "$HERE/app/vite.ovf.config.ts" "$TREE/vite.ovf.config.ts"
cd "$TREE"
node node_modules/vite/bin/vite.js build --config vite.ovf.config.ts --outDir "$OUTDIR" --emptyOutDir
echo "built: $TREE/$OUTDIR"
