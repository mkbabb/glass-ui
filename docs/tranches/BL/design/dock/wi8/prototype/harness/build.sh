#!/usr/bin/env bash
# build.sh <tree-dir> <out-dir-name>
# Copies the animation audit's page app and this seat's page (dock-wi8.vue, ?c=dock-wi8)
# into <tree>/demo/__anim/, wraps the demo entry as the audit's build-tree.sh does, and
# builds the demo into <tree>/<out-dir-name>. The library is read from src/ through the
# demo's @glass alias. Run under the guard:
#   ~/.claude/guard/guarded --timeout 20 -- ./build.sh <tree> dist-wi8
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
TREE="$(cd "$1" && pwd)"
OUT="$2"
rm -rf "$TREE/demo/__anim"
mkdir -p "$TREE/demo/__anim"
cp -R "$APP/." "$TREE/demo/__anim/"
cp "$HERE/dock-wi8.vue" "$TREE/demo/__anim/mounts/dock-wi8.vue"
grep -q '"dock-wi8"' "$TREE/demo/__anim/registry.ts" ||
    sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
grep -q '"dock-wi8"' "$TREE/demo/__anim/registry.ts" || { echo "registry patch failed" >&2; exit 3; }
if [ ! -f "$TREE/demo/main.demo.ts" ]; then mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"; fi
cat > "$TREE/demo/main.ts" <<'EOT'
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else void import("./main.demo");
EOT
cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts --outDir "$OUT" --emptyOutDir
echo "built: $TREE/$OUT"
