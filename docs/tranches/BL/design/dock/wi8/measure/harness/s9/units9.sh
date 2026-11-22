#!/usr/bin/env bash
# units9.sh <tag>: the ninth pass's source seat, after each item. RU-121's tree of the item (s9/cand9.sh units), its
# library dist built, the dock's vitest files (m9/items9.py h4b's list, --maxWorkers=2), then the types on the src and test
# configs; the dist and the tree deleted after. Each step under the guard (a build and a unit run are heavy; the types light).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; U=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s9-units; G=~/.claude/guard/guarded; TAG="$1"
TESTS="tests/components/custom/dock tests/components/dock tests/components/dialog tests/components/sheet tests/components/select tests/components/custom/menu tests/components/popover.contract.test.ts tests/components/select.contract.test.ts tests/components/custom/scroll-progress-rim tests/components/ui/slider tests/components/a11y/native-title.test.ts tests/demo/sidebar-nav-landmark.a11y.test.ts tests/design/drive-tokens.test.ts tests/gates/overfit-structure.test.ts tests/styles"
"$H/s9/cand9.sh" "$U" units > "$L/s9-$TAG-units-tree.txt" 2>&1
$G --timeout 25 -- sh -c "cd $U && node node_modules/vite/bin/vite.js build --emptyOutDir > $L/s9-$TAG-units-build.log 2>&1; echo rc=\$? >> $L/s9-$TAG-units-build.log"
$G --timeout 40 -- sh -c "cd $U && node_modules/.bin/vitest run $TESTS --maxWorkers=2 > $L/s9-$TAG-units.log 2>&1; echo rc=\$? >> $L/s9-$TAG-units.log"
$G --light --timeout 20 -- sh -c "cd $U && { node_modules/.bin/vue-tsc --noEmit -p tsconfig.src.json; echo src rc=\$?; node_modules/.bin/vue-tsc --noEmit -p tsconfig.test.json; echo test rc=\$?; } > $L/s9-$TAG-types.log 2>&1"
rm -rf "$U"; echo "$(date '+%F %T') units9: removed $U with its dist ($TAG)" >> "$L/s9-disk.log"
grep -E 'Test Files|Tests ' "$L/s9-$TAG-units.log"; grep -E 'FAIL ' "$L/s9-$TAG-units.log" | sort -u; grep -E 'rc=|error' "$L/s9-$TAG-types.log"
