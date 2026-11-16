#!/usr/bin/env bash
# build7.sh <tree-dir> <out-dir-name> [base]: m6/build6.sh with MEASURE-7's pages: the ten compositions (m6/comp/) and
# the loose cell (m7/comp/loose.stage.vue) under ?c=dock-comp, and this seat's page (dock-wi8.vue, ?c=dock-wi8) unless
# `base` (v11.0.2's tree, built only for G-15's baseline readings: it has neither ControlsDock nor DockOutlet). Run
# under the guard; the build is `--sourcemap` so a trace's stack resolves to source.
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TREE="$(cd "$1" && pwd)"
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
rm -rf "$TREE/demo/__anim"; mkdir -p "$TREE/demo/__anim"; cp -R "$APP/." "$TREE/demo/__anim/"
mkdir -p "$TREE/demo/__anim/mounts/comp"
cp "$HERE/m6/comp/"*.vue "$TREE/demo/__anim/mounts/comp/"
cp "$HERE/m7/comp/"*.vue "$TREE/demo/__anim/mounts/comp/"
cp "$HERE/m6/dock-comp.vue" "$TREE/demo/__anim/mounts/dock-comp.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-comp": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
grep -q '"dock-comp"' "$TREE/demo/__anim/registry.ts" || { echo "registry patch failed" >&2; exit 3; }
if [ "${3:-}" != base ]; then
  cp "$HERE/dock-wi8.vue" "$TREE/demo/__anim/mounts/dock-wi8.vue"
  sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
fi
if [ ! -f "$TREE/demo/main.demo.ts" ]; then mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"; fi
cat > "$TREE/demo/main.ts" <<'EOT'
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else void import("./main.demo");
EOT
cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts --outDir "$2" --emptyOutDir --sourcemap
echo "built: $TREE/$2"
