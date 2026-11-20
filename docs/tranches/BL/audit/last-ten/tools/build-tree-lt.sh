#!/usr/bin/env bash
# build-tree-lt.sh <tree-dir>
# The harness's build-tree.sh, with one difference: the demo entry survives the build.
# The package declares "sideEffects": ["*.css"], so the bare `import("./main.demo")` in the
# harness wrapper is dropped as side-effect free (the 11.0.2-tip build ships a 71-byte
# main.demo chunk; that is why the first audit's demo routes mounted nothing). This
# script gives main.demo.ts one export and reads it in the wrapper, so `/<route>` boots
# the real demo shell (dock and aurora live) and `/?c=<name>` the audit page.
# Run under the guard:  ~/.claude/guard/guarded --timeout 20 -- ./build-tree-lt.sh <tree>
set -euo pipefail
HARNESS="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness"
TREE="$(cd "$HARNESS/$1" 2>/dev/null || cd "$1"; pwd)"
[ -f "$TREE/package.json" ] || { echo "not a tree: $TREE" >&2; exit 2; }
[ -d "$TREE/node_modules" ] || { echo "run npm ci in $TREE first" >&2; exit 2; }

rm -rf "$TREE/demo/__anim" "$TREE/demo/vite.lastten.config.ts"
mkdir -p "$TREE/demo/__anim"
cp -R "$HARNESS/app/." "$TREE/demo/__anim/"
# The dock recorder's second page (layers, drill, crossfade, run, menu docks): ?c=dock-full.
cp "$HARNESS/../record/dock/mount/dock-full.vue" "$TREE/demo/__anim/mounts/dock-full.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-full": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
grep -q '"dock-full"' "$TREE/demo/__anim/registry.ts" || { echo "registry patch failed" >&2; exit 3; }

if [ ! -f "$TREE/demo/main.demo.ts" ]; then
    mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"
fi
if ! grep -q "__demoEntry" "$TREE/demo/main.demo.ts"; then
    printf '\n// last-ten: one export keeps this entry in the build (package sideEffects).\nexport const __demoEntry = 1;\n' >> "$TREE/demo/main.demo.ts"
fi
cat > "$TREE/demo/main.ts" <<'EOF'
// Audit wrapper (last-ten/tools/build-tree-lt.sh). ?c=<name> boots the audit page;
// every other URL boots the demo (main.demo.ts).
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else
    void import("./main.demo").then((m) => {
        (window as unknown as Record<string, unknown>).__demoEntry = m.__demoEntry;
    });
EOF

cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts
M=$(ls dist-demo/assets/main.demo-*.js | head -1)
echo "main.demo chunk: $M $(wc -c < "$M") bytes"
echo "built: $TREE/dist-demo"
