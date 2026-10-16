#!/usr/bin/env bash
# phase1.sh <fresh HEAD worktree> <results dir> · critique-B pass 10 · written and hashed BEFORE reading pass-10/B-kit.
# One worktree (the task's fence), so the floor base is measured first and the chain then replays on it:
#  (1) the HEAD tree's code digest against the chain's recorded base; (2) the floor rows (S1's own script,
#  floor/rows/apply.mjs, from the worktree's committed bytes); (3) the floor-base digest against S1's recorded digest;
#  (4) MIGRATION.md on the floor base against HEAD's (the migration10.sh reference); (5) the floor base built, its cascade
#  snapshot (compared byte for byte with the kit's committed baseline) and its peer report (compared with the kit's
#  committed peer-closure-base.json, root field aside); (6) dist removed; (7) the worktree's committed kit replay.mjs
#  from S1 to the end; (8) the replay re-run (must be a no-op); (9) the final digest against the chain's last step.
# Every line carries the load (sysctl vm.loadavg, 1/5/15 min).
set -u
W="$(cd "$1" && pwd)"; R="$2"; mkdir -p "$R/cascade" "$R/logs"; R="$(cd "$R" && pwd)"
K="$W/docs/tranches/BL/design/structure/pass-10/B-kit"; FL="$W/docs/tranches/BL/design/structure/floor/rows/apply.mjs"
load() { sysctl -n vm.loadavg; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$W"; }
sq() { node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));const f=new Function("s","return "+process.argv[2]);console.log(f(s))' "$K/frozen/SEQUENCE.json" "$1"; }
O="$R/phase1.txt"; echo "phase1 start $(date -u +%FT%TZ) load $(load)" > "$O"
echo "HEAD $(git -C "$W" rev-parse HEAD)" >> "$O"
echo "chain base digest $(sq 's.base?.digest ?? JSON.stringify(s.base).slice(0,160)')" >> "$O"
echo "S1 recorded digest $(sq 's.steps[0].id+" "+s.steps[0].digest')" >> "$O"
echo "final recorded digest $(sq 's.steps.at(-1).id+" "+s.steps.at(-1).digest')" >> "$O"
echo "steps $(sq 's.steps.length')" >> "$O"
echo "HEAD tree code digest $(dg)" >> "$O"
t0=$(date +%s); node "$FL" --root "$W" > "$R/logs/floor-rows.log" 2>&1; echo "floor rows exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"
echo "floor base code digest $(dg)" >> "$O"
cmp -s "$W/MIGRATION.md" <(git -C "$W" show HEAD:MIGRATION.md) && echo "floor-base MIGRATION.md identical to HEAD's" >> "$O" || echo "floor-base MIGRATION.md DIFFERS from HEAD's" >> "$O"
t0=$(date +%s); (cd "$W" && npx vite build) > "$R/logs/base-build.log" 2>&1; echo "base vite build exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"
(cd "$W" && node scripts/structure/cascade.mjs snapshot --root "$W" --dist "$W/dist" --out "$R/cascade/base-snap" --sha floor-S1) > "$R/logs/base-snap.log" 2>&1; echo "base cascade snapshot exit $? load $(load)" >> "$O"
KB=$(find "$K/results" -type d -name baseline -path '*cascade*' | sort | tail -1)
if [ -n "$KB" ]; then for f in $(ls "$KB" | grep '\.seq$'); do cmp -s "$KB/$f" "$R/cascade/base-snap/$f" && echo "baseline $f: identical to the kit's committed baseline (${KB#$K/})" >> "$O" || echo "baseline $f: DIFFERS from the kit's committed baseline (${KB#$K/})" >> "$O"; done; else echo "no committed cascade baseline in the kit" >> "$O"; fi
(cd "$W" && node "$K/tools/peer-closure.mjs" --root "$W" --floor-base --table src/index.ts --json "$R/peer-base.json") > "$R/peer-base.txt" 2>&1; echo "base peer probe exit $? load $(load)" >> "$O"
KPB=$(find "$K/results" -name 'peer-closure-base.json' | sort | tail -1)
cmp -s <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));delete j.root;console.log(JSON.stringify(j))' "$R/peer-base.json") <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));delete j.root;console.log(JSON.stringify(j))' "$KPB") && echo "peer-base.json equals the kit's committed ${KPB#$K/} (root field aside)" >> "$O" || echo "peer-base.json DIFFERS from the kit's committed ${KPB#$K/}" >> "$O"
rm -rf "$W/dist"; echo "dist removed; code digest $(dg)" >> "$O"
t0=$(date +%s); l0=$(load); node "$K/replay.mjs" --root "$W" > "$R/replay.txt" 2>&1; rc=$?; echo "replay exit $rc $(( $(date +%s)-t0 )) s load $l0 -> $(load)" >> "$O"; tail -3 "$R/replay.txt" >> "$O"
t0=$(date +%s); node "$K/replay.mjs" --root "$W" > "$R/replay-rerun.txt" 2>&1; echo "replay rerun exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"; tail -2 "$R/replay-rerun.txt" >> "$O"
echo "final code digest $(dg)" >> "$O"
echo "phase1 end $(date -u +%FT%TZ) load $(load)" >> "$O"
