#!/usr/bin/env bash
# phase1.sh <wt> <results> · critique-B pass 9 · written AFTER the battery hash (glue). One worktree only (the task's
# fence), so the floor base is taken first and the replay then runs on: (1) the HEAD tree's code digest against the
# chain's base digest; (2) the floor rows (S1's own script, floor/rows/apply.mjs from the worktree's committed kit);
# (3) the floor-base digest; (4) the floor base built, its cascade snapshot and its peer probe report (the commands of
# battery/toolchain9.sh's base steps); (5) dist removed and the digest re-read; (6) replay.mjs (the worktree's
# committed kit) from S1's digest to the end; (7) the replay re-run (no-op). Every line carries the load.
set -u
W="$(cd "$1" && pwd)"; R="$2"; mkdir -p "$R/cascade" "$R/logs"; R="$(cd "$R" && pwd)"
K="$W/docs/tranches/BL/design/structure/pass-9/B-kit"; FL="$W/docs/tranches/BL/design/structure/floor/rows/apply.mjs"
load() { sysctl -n vm.loadavg; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$W"; }
O="$R/phase1.txt"; echo "phase1 start $(date -u +%FT%TZ) load $(load)" > "$O"
echo "HEAD $(git -C "$W" rev-parse HEAD)" >> "$O"
echo "chain base digest $(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.base?.digest ?? JSON.stringify(s.base).slice(0,120))' "$K/frozen/SEQUENCE.json")" >> "$O"
echo "S1 recorded digest $(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.steps[0].digest)' "$K/frozen/SEQUENCE.json")" >> "$O"
echo "final recorded digest $(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));console.log(s.steps.at(-1).id, s.steps.at(-1).digest)' "$K/frozen/SEQUENCE.json")" >> "$O"
echo "HEAD tree code digest $(dg)" >> "$O"
t0=$(date +%s); node "$FL" --root "$W" > "$R/logs/floor-rows.log" 2>&1; echo "floor rows exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"
echo "floor base code digest $(dg)" >> "$O"
(cd "$W" && npx vite build) > "$R/logs/base-build.log" 2>&1; echo "base vite build exit $? load $(load)" >> "$O"
(cd "$W" && node scripts/structure/cascade.mjs snapshot --root "$W" --dist "$W/dist" --out "$R/cascade/base-snap" --sha floor-S1) > "$R/logs/base-snap.log" 2>&1; echo "base cascade snapshot exit $? load $(load)" >> "$O"
for f in $(ls "$K/results/p9/cascade/baseline" | grep '\.seq$'); do cmp -s "$K/results/p9/cascade/baseline/$f" "$R/cascade/base-snap/$f" && echo "baseline $f: identical to the kit's committed baseline" >> "$O" || echo "baseline $f: DIFFERS from the kit's committed baseline" >> "$O"; done
(cd "$W" && node "$K/tools/peer-closure.mjs" --root "$W" --floor-base --table src/index.ts --json "$R/peer-base.json") > "$R/peer-base.txt" 2>&1; echo "base peer probe exit $? (P7-G5: the root is broken at the base) load $(load)" >> "$O"
cmp -s <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));delete j.root;console.log(JSON.stringify(j))' "$R/peer-base.json") <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));delete j.root;console.log(JSON.stringify(j))' "$K/results/p9/peer-closure-base.json") && echo "peer-base.json equals the kit's committed peer-closure-base.json (root field aside)" >> "$O" || echo "peer-base.json DIFFERS from the kit's committed peer-closure-base.json" >> "$O"
rm -rf "$W/dist"; echo "dist removed; code digest $(dg)" >> "$O"
t0=$(date +%s); l0=$(load); node "$K/replay.mjs" --root "$W" > "$R/replay.txt" 2>&1; rc=$?; echo "replay exit $rc $(( $(date +%s)-t0 )) s load $l0 -> $(load)" >> "$O"; tail -3 "$R/replay.txt" >> "$O"
t0=$(date +%s); node "$K/replay.mjs" --root "$W" > "$R/replay-rerun.txt" 2>&1; echo "replay rerun exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"; tail -2 "$R/replay-rerun.txt" >> "$O"
echo "final code digest $(dg)" >> "$O"
echo "phase1 end $(date -u +%FT%TZ) load $(load)" >> "$O"
