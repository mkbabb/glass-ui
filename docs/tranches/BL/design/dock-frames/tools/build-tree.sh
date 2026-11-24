#!/usr/bin/env bash
# build-tree.sh <tree-dir>
# The animation harness's build-tree.sh (docs/tranches/BL/audit/animation/harness/), plus
# this study's mounts: copies the harness app/ into <tree>/demo/__anim/, adds
# tools/mounts/*.vue as hand mounts (registry rows appended), wraps the demo entry so
# /?c=<name> boots the audit page, and builds the demo into <tree>/dist-demo/.
# Library source (src/) is never touched. Run under the guard:
#   ~/.claude/guard/guarded --timeout 20 -- tools/build-tree.sh trees/v11.1.0
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
HARNESS="$HERE/../../../audit/animation/harness"
TREE="$(cd "$1" && pwd)"
[ -f "$TREE/package.json" ] || { echo "not a tree: $TREE" >&2; exit 2; }
[ -d "$TREE/node_modules" ] || { echo "npm ci in $TREE first" >&2; exit 2; }

rm -rf "$TREE/demo/__anim"
mkdir -p "$TREE/demo/__anim"
cp -R "$HARNESS/app/." "$TREE/demo/__anim/"
for m in "$HERE"/mounts/*.vue; do
    name="$(basename "$m" .vue)"
    cp "$m" "$TREE/demo/__anim/mounts/$name.vue"
    # one hand-mount row per study mount, appended inside the REGISTRY literal
    python3 - "$TREE/demo/__anim/registry.ts" "$name" <<'PY'
import sys
p, name = sys.argv[1], sys.argv[2]
s = open(p).read()
row = f'    "{name}": {{ mount: "hand" }},\n'
if row not in s:
    i = s.rindex("};")
    s = s[:i] + row + s[i:]
open(p, "w").write(s)
PY
done

if [ ! -f "$TREE/demo/main.demo.ts" ]; then
    mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"
fi
cat > "$TREE/demo/main.ts" <<'EOF'
// Audit wrapper (docs/tranches/BL/design/dock-frames/tools/build-tree.sh). The demo's own
// entry is main.demo.ts, unchanged; ?c=<name> boots the audit page instead.
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else void import("./main.demo");
EOF

cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts
echo "built: $TREE/dist-demo"
