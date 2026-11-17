#!/usr/bin/env bash
# pages8.sh <tree-dir> [base]: copies MEASURE-8's pages into <tree>/demo/__anim (the audit harness app, the compositions,
# the composition page, and dock-wi8.vue unless `base`) and wraps demo/main.ts (?c= boots the harness, else the demo).
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TREE="$(cd "$1" && pwd)"
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
rm -rf "$TREE/demo/__anim"; mkdir -p "$TREE/demo/__anim"; cp -R "$APP/." "$TREE/demo/__anim/"
mkdir -p "$TREE/demo/__anim/mounts/comp"
cp "$HERE/m6/comp/"*.vue "$TREE/demo/__anim/mounts/comp/"
cp "$HERE/m7/comp/"*.vue "$TREE/demo/__anim/mounts/comp/"
cp "$HERE/m8/comp/"*.vue "$TREE/demo/__anim/mounts/comp/"
cp "$HERE/m8/dock-comp.vue" "$TREE/demo/__anim/mounts/dock-comp.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-comp": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
grep -q '"dock-comp"' "$TREE/demo/__anim/registry.ts" || { echo "registry patch failed" >&2; exit 3; }
if [ "${2:-}" != base ]; then
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
