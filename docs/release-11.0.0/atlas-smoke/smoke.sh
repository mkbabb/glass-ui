#!/usr/bin/env bash
# The atlas pack-and-import smoke for glass-ui 11.0.0. Packs the worktree, installs the
# tarball with its declared peers into a throwaway consumer ($1, outside the repo), then:
#  1. imports every value atlas 1d933b8 imports, per subpath, in Node (.css -> empty);
#  2. type-checks atlas's value and type imports plus the four props atlas binds
#     (GlassDock anchor / expandOn / collapsedLabel, Card backdropMode);
#  3. reads the shipped token sheet for --radius-circle and --radius-bar.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../../.." && pwd)"
OUT="$1"
rm -rf "$OUT" && mkdir -p "$OUT"
TGZ="$(cd "$REPO" && npm pack --ignore-scripts --silent --pack-destination "$OUT")"
cd "$OUT"
node -e '
const peers = require(process.argv[1]).peerDependencies;
delete peers["@mkbabb/value.js"];
const pkg = { name: "atlas-smoke", private: true, type: "module",
  dependencies: { "@mkbabb/glass-ui": "file:./" + process.argv[2], ...peers, typescript: "^5.9.0" } };
require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
' "$REPO/package.json" "$TGZ"
npm install --no-audit --no-fund --silent
cp "$HERE/imports.json" "$HERE/runtime.mjs" "$HERE/types.ts" "$HERE/tsconfig.json" .
node runtime.mjs
npx tsc -p tsconfig.json
node -e '
const fs = require("fs"), path = require("path");
const dir = "node_modules/@mkbabb/glass-ui/dist/styles";
const all = fs.readdirSync(dir, { recursive: true }).filter((f) => f.endsWith(".css"))
  .map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
for (const t of ["--radius-circle", "--radius-bar"]) {
  const m = all.match(new RegExp(t + "\\s*:\\s*([^;]+);"));
  if (!m) { console.error("MISSING token " + t); process.exit(1); }
  console.log("token " + t + ": " + m[1].trim());
}
'
echo "ATLAS SMOKE GREEN"
