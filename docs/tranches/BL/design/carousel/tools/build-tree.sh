#!/usr/bin/env bash
# build-tree.sh <tree-dir>
# The carousel study's build. Like the animation harness's build-tree.sh, it copies the
# harness audit page (harness/app/) into <tree>/demo/__anim/ and wraps the demo entry so
# /?c=<name> boots the audit page; it adds this study's own mount (app-extra/mounts/,
# page c=carousel-hero) and its registry row, writes the eight 2880x1800 test WebPs into
# demo/__anim/carousel-img/ (make-images.sh), and builds the demo into <tree>/dist-demo/.
# Library source (src/) is never touched. Run under the guard:
#   ~/.claude/guard/guarded --timeout 20 -- ./build-tree.sh ../trees/red
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
HARNESS="$(cd "$HERE/../../../audit/animation/harness" && pwd)"
TREE="$(cd "$1" && pwd)"
[ -f "$TREE/package.json" ] || { echo "not a tree: $TREE" >&2; exit 2; }
[ -d "$TREE/node_modules" ] || { echo "run npm ci in $TREE first" >&2; exit 2; }

rm -rf "$TREE/demo/__anim"
mkdir -p "$TREE/demo/__anim"
cp -R "$HARNESS/app/." "$TREE/demo/__anim/"
cp -R "$HERE/app-extra/mounts/." "$TREE/demo/__anim/mounts/"
# the study's row, appended to the harness registry
python3 -I - "$TREE/demo/__anim/registry.ts" <<'EOF'
import sys
p = sys.argv[1]
s = open(p).read()
row = '    "carousel-hero": { mount: "hand" },\n'
if row not in s:
    i = s.rindex("};")
    s = s[:i] + row + s[i:]
open(p, "w").write(s)
EOF
# the pictures are made once per study and kept beside the trees (gitignored)
CACHE="$HERE/../trees/.img"
mkdir -p "$TREE/demo/__anim/carousel-img"
if [ -d "$CACHE" ]; then cp "$CACHE/"*.webp "$TREE/demo/__anim/carousel-img/"; fi
"$HERE/make-images.sh" "$TREE/demo/__anim/carousel-img"
mkdir -p "$CACHE" && cp "$TREE/demo/__anim/carousel-img/"*.webp "$CACHE/"

if [ ! -f "$TREE/demo/main.demo.ts" ]; then
    mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"
fi
cat > "$TREE/demo/main.ts" <<'EOF'
// Audit wrapper (docs/tranches/BL/design/carousel/tools/build-tree.sh). The demo's own
// entry is main.demo.ts, unchanged; ?c=<name> boots the audit page instead.
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else void import("./main.demo");
EOF

cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts
echo "built: $TREE/dist-demo"
