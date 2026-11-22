#!/usr/bin/env bash
# pages9.sh <tree-dir> [base]: MEASURE-9 part H. m8/pages8.sh with m9/dock-wi8.vue (mkpage9.py's page) in the root
# page's place: the audit harness app, the compositions (m6/comp, m7/comp, m8/comp; later ones win), the composition
# page (m8/dock-comp.vue), the measure page unless `base`, and demo/main.ts wrapped (?c= boots the harness).
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
  cp "$HERE/m9/dock-wi8.vue" "$TREE/demo/__anim/mounts/dock-wi8.vue"
  sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
fi
if [ ! -f "$TREE/demo/main.demo.ts" ]; then mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"; fi
cat > "$TREE/demo/main.ts" <<'EOT'
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else void import("./main.demo");
EOT
