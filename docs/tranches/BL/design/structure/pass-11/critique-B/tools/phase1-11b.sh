#!/usr/bin/env bash
# phase1-11.sh <fresh HEAD worktree> <results dir> · critique-B pass 11 · written and hashed BEFORE reading
# pass-11/B-kit, pass-11/B-proto.md or pass-11/plants/. One worktree (the task's fence):
#  (1) the HEAD tree's code digest against the chain's recorded base; (2) the floor rows by S1's own script
#      (floor/rows/apply.mjs) from the worktree's committed bytes; (3) the floor-base digest against S1's recorded digest
#      AND against pass 10's floor base (5b14c6c7…705402f, which P10-R1 (a) re-cuts: they must DIFFER); (4) ONE ENGINE:
#      the landed scripts/structure/lib/move.mjs byte-equal to the docs floor's floor/lib/move.mjs, and both carrying
#      the cured lead; (5) the re-cut is that one line: with the landed line put back to the pre-cure text the digest
#      reads pass 10's floor base exactly (then restored by sha256); (6) the floor plant (floor11.mjs) on the floor base:
#      the docs engine and the landed engine KEPT, the pre-cure docs engine (from git, 16e907cb3) LOST; (7) MIGRATION.md
#      on the floor base against HEAD's; (8) the floor base built, its cascade snapshot compared with the kit's committed
#      baseline and its peer report with the kit's committed peer-closure-base.json (root aside); (9) dist removed;
#      (10) the worktree's committed kit replay.mjs; (11) the rerun (no-op); (12) the final digest against the chain's
#      last step. Every line carries the load (sysctl vm.loadavg).
set -u
W="$(cd "$1" && pwd)"; R="$2"; mkdir -p "$R/cascade" "$R/logs"; R="$(cd "$R" && pwd)"; HERE="$(cd "$(dirname "$0")/../battery" && pwd)"
ST="$W/docs/tranches/BL/design/structure"; K="$ST/pass-11/B-kit"; FL="$ST/floor/rows/apply.mjs"; FLOOR="$ST/floor"
P10FB="5b14c6c7"; PRE=16e907cb3
load() { sysctl -n vm.loadavg; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$W"; }
sq() { node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));const f=new Function("s","return "+process.argv[2]);console.log(f(s))' "$K/frozen/SEQUENCE.json" "$1"; }
sha() { shasum -a 256 "$1" | cut -c1-64; }
O="$R/phase1.txt"; echo "phase1 start $(date -u +%FT%TZ) load $(load)" > "$O"
echo "HEAD $(git -C "$W" rev-parse HEAD)" >> "$O"
echo "chain base digest $(sq 's.base?.digest ?? JSON.stringify(s.base).slice(0,160)')" >> "$O"
echo "S1 recorded digest $(sq 's.steps[0].id+" "+s.steps[0].digest')" >> "$O"
echo "final recorded digest $(sq 's.steps.at(-1).id+" "+s.steps.at(-1).digest')" >> "$O"
echo "steps $(sq 's.steps.length'); step ids containing S74c: $(sq 's.steps.filter(x=>/S74c/.test(x.id)).map(x=>x.id).join(",")||"none"')" >> "$O"
echo "HEAD tree code digest $(dg)" >> "$O"
t0=$(date +%s); node "$FL" --root "$W" > "$R/logs/floor-rows.log" 2>&1; echo "floor rows exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"
FB=$(dg); echo "floor base code digest $FB" >> "$O"
S1D=$(sq 's.steps[0].digest'); case "$FB" in "$S1D"*) echo "FB1 PASS floor base = S1's recorded digest" >> "$O";; *) echo "FB1 FAIL floor base $FB != S1 recorded $S1D" >> "$O";; esac
case "$FB" in "$P10FB"*) echo "FB2 FAIL the floor base still reads pass 10's ${P10FB}…: no re-cut" >> "$O";; *) echo "FB2 PASS the floor base differs from pass 10's ${P10FB}… (re-cut)" >> "$O";; esac
LM="$W/scripts/structure/lib/move.mjs"; DM="$FLOOR/lib/move.mjs"
if [ -f "$LM" ]; then
  [ "$(sha "$LM")" = "$(sha "$DM")" ] && echo "FB3 PASS one engine: landed lib/move.mjs = docs floor lib/move.mjs ($(sha "$LM" | cut -c1-16))" >> "$O" || echo "FB3 FAIL landed lib/move.mjs differs from the docs floor's" >> "$O"
  grep -nE 'const lead = ' "$LM" | sed 's/^/FB3   landed: /' >> "$O"
  git -C "$W" show "$PRE:docs/tranches/BL/design/structure/floor/lib/move.mjs" > "$R/logs/move.pre.mjs"
  diff "$R/logs/move.pre.mjs" "$DM" > "$R/logs/move.cure.diff"; echo "FB4 docs engine diff vs $PRE: $(grep -c '^[<>]' "$R/logs/move.cure.diff") lines (expect 2, one line each side)" >> "$O"; sed 's/^/FB4   /' "$R/logs/move.cure.diff" >> "$O"
  h=$(sha "$LM"); cp "$LM" "$R/logs/move.landed.mjs"; cp "$R/logs/move.pre.mjs" "$LM"
  OLD=$(dg); case "$OLD" in "$P10FB"*) echo "FB5 PASS with the landed engine put back to the pre-cure text the digest is pass 10's floor base: $OLD" >> "$O";; *) echo "FB5 FAIL with the pre-cure engine the digest is $OLD, not pass 10's ${P10FB}… (the re-cut moved more than the one line)" >> "$O";; esac
  cp "$R/logs/move.landed.mjs" "$LM"; [ "$(sha "$LM")" = "$h" ] && echo "FB5 restored" >> "$O" || echo "FB5 RESTORE-FAIL" >> "$O"
else echo "FB3 FAIL no landed scripts/structure/lib/move.mjs on the floor base" >> "$O"; fi
# (6) the floor plant
LCLI=$(ls "$W/scripts/structure/move.mjs" 2>/dev/null | head -1)
node "$HERE/floor11.mjs" --root "$W" --cli "$FLOOR/move.mjs" --label docs-engine --expect kept > "$R/floor-plant-docs.txt" 2>&1; echo "FP docs engine exit $? :: $(tail -1 "$R/floor-plant-docs.txt") load $(load)" >> "$O"
if [ -n "$LCLI" ]; then node "$HERE/floor11.mjs" --root "$W" --cli "$LCLI" --label landed-engine --expect kept > "$R/floor-plant-landed.txt" 2>&1; echo "FP landed engine exit $? :: $(tail -1 "$R/floor-plant-landed.txt")" >> "$O"
else echo "FP landed engine INFO no scripts/structure/move.mjs CLI on the floor base" >> "$O"; fi
h=$(sha "$DM"); cp "$DM" "$R/logs/move.docs.mjs"; cp "$R/logs/move.pre.mjs" "$DM"
node "$HERE/floor11.mjs" --root "$W" --cli "$FLOOR/move.mjs" --label pre-cure-engine --expect lost > "$R/floor-plant-precure.txt" 2>&1; echo "FP pre-cure engine exit $? :: $(tail -1 "$R/floor-plant-precure.txt")" >> "$O"
cp "$R/logs/move.docs.mjs" "$DM"; [ "$(sha "$DM")" = "$h" ] && echo "FP docs engine restored" >> "$O" || echo "FP RESTORE-FAIL docs engine" >> "$O"
echo "floor base digest after the plant $(dg)" >> "$O"
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
FD=$(dg); echo "final code digest $FD" >> "$O"
LD=$(sq 's.steps.at(-1).digest'); case "$FD" in "$LD"*) echo "FIN PASS final digest = the chain's last recorded digest" >> "$O";; *) echo "FIN FAIL final $FD != recorded $LD" >> "$O";; esac
echo "phase1 end $(date -u +%FT%TZ) load $(load)" >> "$O"
