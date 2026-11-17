#!/usr/bin/env bash
# build8.sh <tree-dir> <out-dir-name> [base]: MEASURE-8, m7/build7.sh with MEASURE-8's pages: m8/dock-comp.vue (the grid,
# field, flat and daraksha grounds) under ?c=dock-comp with m6/comp, m7/comp and m8/comp (later ones win: StoryStage with
# its ceiling, the pill, the fission, the wash row), and this seat's page (dock-wi8.vue, ?c=dock-wi8) unless `base`
# (v11.0.2's tree, which has neither ControlsDock nor DockOutlet). Run under the guard; `--sourcemap` so a trace resolves.
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TREE="$(cd "$1" && pwd)"
"$HERE/m8/pages8.sh" "$TREE" "${3:-}"
cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts --outDir "$2" --emptyOutDir --sourcemap
echo "built: $TREE/$2"
