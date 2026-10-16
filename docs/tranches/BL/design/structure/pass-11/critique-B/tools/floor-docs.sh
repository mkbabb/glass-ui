#!/usr/bin/env bash
# floor-docs.sh <fresh HEAD worktree, pre-S1> <results dir> · critique-B pass 11 · written AFTER the battery hash (glue),
# disclosed in critique-B.md §7. phase1-11.sh ran floor11.mjs against the docs floor's engine AFTER S1, but S1's
# fd11-land moves the floor runtime to scripts/structure/, so the docs path no longer held an engine there (the module
# was not found and the rows read SETUP-FAIL). The docs engine is run here where it lives, on a fresh HEAD tree before
# S1, exactly as the hashed floor11.mjs states: cured (HEAD's committed bytes) expect KEPT, then with line 168 put back
# to 16e907cb3's text expect LOST (DISCRIMINATES), restored by sha256. Expectations unchanged.
set -u
W="$(cd "$1" && pwd)"; R="$(cd "$2" && pwd)"; HERE="$(cd "$(dirname "$0")/../battery" && pwd)"
FLOOR="$W/docs/tranches/BL/design/structure/floor"; DM="$FLOOR/lib/move.mjs"; O="$R/floor-plant-docs-preS1.txt"
load() { sysctl -n vm.loadavg; }; sha() { shasum -a 256 "$1" | cut -c1-64; }
echo "floor-docs start $(date -u +%FT%TZ) load $(load); HEAD $(git -C "$W" rev-parse HEAD); docs engine sha $(sha "$DM" | cut -c1-16)" > "$O"
node "$HERE/floor11.mjs" --root "$W" --cli "$FLOOR/move.mjs" --label docs-engine-preS1 --expect kept >> "$O" 2>&1; echo "docs engine (cured) exit $?" >> "$O"
h=$(sha "$DM"); cp "$DM" "$R/logs/move.docs-head.mjs"; git -C "$W" show 16e907cb3:docs/tranches/BL/design/structure/floor/lib/move.mjs > "$DM"
diff "$R/logs/move.docs-head.mjs" "$DM" | sed 's/^/swap /' >> "$O"
node "$HERE/floor11.mjs" --root "$W" --cli "$FLOOR/move.mjs" --label pre-cure-docs-engine-preS1 --expect lost >> "$O" 2>&1; echo "pre-cure docs engine exit $?" >> "$O"
cp "$R/logs/move.docs-head.mjs" "$DM"; [ "$(sha "$DM")" = "$h" ] && echo "docs engine restored" >> "$O" || echo "RESTORE-FAIL" >> "$O"
echo "git status after: $(git -C "$W" status --porcelain | wc -l | tr -d ' ') lines (expect 1: the node_modules symlink)" >> "$O"
echo "floor-docs end $(date -u +%FT%TZ) load $(load)" >> "$O"
