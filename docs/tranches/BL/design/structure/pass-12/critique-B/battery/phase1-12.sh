#!/usr/bin/env bash
# phase1-12.sh <fresh HEAD worktree> <results dir> <floor-base clone path> <unbuilt replayed clone path>
# critique-B pass 12 · written and hashed BEFORE reading pass-12/B-kit or pass-12/B-proto.md.
# One worktree (the task's fence). The two clone paths are APFS clones (cp -c) made inside this seat's
# .claude/worktrees/bl/D1/p12/crit-B/ area, for the route battery's three-tree signature (§P11-6.4); removed by the caller.
#  (0) pre-S1: the floor plant (pass 11's hashed floor11.mjs, by path) on the docs engine KEPT, and with the docs engine
#      put back to 16e907cb3's pre-cure text LOST (it must discriminate), restored by sha256
#  (1) the HEAD tree's code digest against the chain's recorded base
#  (2) the floor rows by S1's own script (floor/rows/apply.mjs) from the worktree's committed bytes
#  (3) FB1 the floor base digest = S1's recorded digest; FB2 = the re-cut floor base 6773b4ec… (§P11-6.4 bar);
#      FB3 one engine (landed lib/move.mjs = docs floor lib/move.mjs); FB5 the re-cut is one line (the landed engine put
#      back to the pre-cure text reads pass 10's 5b14c6c7…), restored by sha256
#  (4) the floor plant with the landed engine KEPT
#  (5) MIGRATION.md on the floor base against HEAD's
#  (6) the floor base built; its cascade snapshot against the kit's committed baseline; its peer report against the kit's
#      committed peer-closure-base.json (root aside)
#  (7) the floor base (built) cloned to <floor-base clone>; dist removed
#  (8) the worktree's committed kit replay.mjs; FIN the final digest = the chain's last recorded digest AND = 6fdd4ec7…
#      (§P11-6.4: "6fdd4ec7… replayed"); the rerun a no-op
#  (9) the unbuilt replayed tree cloned to <unbuilt clone>
# Every line carries the load (sysctl vm.loadavg).
set -u
W="$(cd "$1" && pwd)"; R="$2"; FBC="$3"; UBC="$4"; mkdir -p "$R/cascade" "$R/logs"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"
ST="$W/docs/tranches/BL/design/structure"; K="$ST/pass-12/B-kit"; FL="$ST/floor/rows/apply.mjs"; FLOOR="$ST/floor"
F11="$ST/pass-11/critique-B/battery/floor11.mjs"
WANT_FB="6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb"
WANT_FIN="6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf"
P10FB="5b14c6c7"; PRE=16e907cb3
load() { sysctl -n vm.loadavg; }
dg() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$W"; }
sq() { node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1]));const f=new Function("s","return "+process.argv[2]);console.log(f(s))' "$K/frozen/SEQUENCE.json" "$1"; }
sha() { shasum -a 256 "$1" | cut -c1-64; }
O="$R/phase1.txt"; echo "phase1 start $(date -u +%FT%TZ) load $(load)" > "$O"
echo "HEAD $(git -C "$W" rev-parse HEAD)" >> "$O"
[ -d "$K" ] || { echo "FATAL no pass-12/B-kit in the worktree" >> "$O"; exit 2; }
echo "chain base digest $(sq 's.base?.digest ?? JSON.stringify(s.base).slice(0,160)')" >> "$O"
echo "S1 recorded digest $(sq 's.steps[0].id+" "+s.steps[0].digest')" >> "$O"
echo "final recorded digest $(sq 's.steps.at(-1).id+" "+s.steps.at(-1).digest')" >> "$O"
echo "steps $(sq 's.steps.length'); ids containing S74c: $(sq 's.steps.filter(x=>/S74c/.test(x.id)).map(x=>x.id).join(",")||"none"')" >> "$O"
echo "HEAD tree code digest $(dg)" >> "$O"
# (0) pre-S1 floor plant on the docs engine, cured and pre-cure
DM="$FLOOR/lib/move.mjs"
git -C "$W" show "$PRE:docs/tranches/BL/design/structure/floor/lib/move.mjs" > "$R/logs/move.pre.mjs"
node "$F11" --root "$W" --cli "$FLOOR/move.mjs" --label docs-engine-preS1 --expect kept > "$R/floor-plant-docs-preS1.txt" 2>&1; echo "FP0 docs engine (pre-S1) exit $? :: $(tail -1 "$R/floor-plant-docs-preS1.txt") load $(load)" >> "$O"
h=$(sha "$DM"); cp "$DM" "$R/logs/move.docs.mjs"; cp "$R/logs/move.pre.mjs" "$DM"
node "$F11" --root "$W" --cli "$FLOOR/move.mjs" --label pre-cure-engine-preS1 --expect lost > "$R/floor-plant-precure-preS1.txt" 2>&1; echo "FP0 pre-cure docs engine (pre-S1) exit $? :: $(tail -1 "$R/floor-plant-precure-preS1.txt")" >> "$O"
cp "$R/logs/move.docs.mjs" "$DM"; [ "$(sha "$DM")" = "$h" ] && echo "FP0 docs engine restored" >> "$O" || echo "FP0 RESTORE-FAIL docs engine" >> "$O"
[ -z "$(git -C "$W" status --porcelain --untracked-files=no)" ] && echo "FP0 tracked tree clean after the plant" >> "$O" || echo "FP0 TRACKED TREE DIRTY after the plant" >> "$O"
# (2) floor rows
t0=$(date +%s); node "$FL" --root "$W" > "$R/logs/floor-rows.log" 2>&1; echo "floor rows exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"
FB=$(dg); echo "floor base code digest $FB" >> "$O"
S1D=$(sq 's.steps[0].digest'); case "$FB" in "$S1D"*) echo "FB1 PASS floor base = S1's recorded digest" >> "$O";; *) echo "FB1 FAIL floor base $FB != S1 recorded $S1D" >> "$O";; esac
case "$FB" in "$WANT_FB"*) echo "FB2 PASS floor base = the re-cut base ${WANT_FB:0:16}…" >> "$O";; *) echo "FB2 FAIL floor base is not ${WANT_FB:0:16}…" >> "$O";; esac
LM="$W/scripts/structure/lib/move.mjs"
if [ -f "$LM" ]; then
  [ "$(sha "$LM")" = "$(sha "$DM")" ] && echo "FB3 PASS one engine: landed = docs floor lib/move.mjs ($(sha "$LM" | cut -c1-16))" >> "$O" || echo "FB3 FAIL landed lib/move.mjs differs from the docs floor's" >> "$O"
  diff "$R/logs/move.pre.mjs" "$DM" > "$R/logs/move.cure.diff"; echo "FB4 docs engine diff vs $PRE: $(grep -c '^[<>]' "$R/logs/move.cure.diff") lines (expect 2)" >> "$O"
  h=$(sha "$LM"); cp "$LM" "$R/logs/move.landed.mjs"; cp "$R/logs/move.pre.mjs" "$LM"
  OLD=$(dg); case "$OLD" in "${P10FB}"*) echo "FB5 PASS the landed engine at the pre-cure text reads pass 10's floor base: $OLD" >> "$O";; *) echo "FB5 FAIL with the pre-cure engine the digest is $OLD, not pass 10's ${P10FB}…" >> "$O";; esac
  cp "$R/logs/move.landed.mjs" "$LM"; [ "$(sha "$LM")" = "$h" ] && echo "FB5 restored" >> "$O" || echo "FB5 RESTORE-FAIL" >> "$O"
else echo "FB3 FAIL no landed scripts/structure/lib/move.mjs on the floor base" >> "$O"; fi
# (4) landed engine plant
LCLI=$(ls "$W/scripts/structure/move.mjs" 2>/dev/null | head -1)
if [ -n "$LCLI" ]; then node "$F11" --root "$W" --cli "$LCLI" --label landed-engine --expect kept > "$R/floor-plant-landed.txt" 2>&1; echo "FP landed engine exit $? :: $(tail -1 "$R/floor-plant-landed.txt")" >> "$O"
else echo "FP landed engine INFO no scripts/structure/move.mjs CLI on the floor base" >> "$O"; fi
echo "floor base digest after the plant $(dg)" >> "$O"
cmp -s "$W/MIGRATION.md" <(git -C "$W" show HEAD:MIGRATION.md) && echo "floor-base MIGRATION.md identical to HEAD's" >> "$O" || echo "floor-base MIGRATION.md DIFFERS from HEAD's" >> "$O"
# (6) build, snapshot, peer
t0=$(date +%s); (cd "$W" && npx vite build) > "$R/logs/base-build.log" 2>&1; echo "base vite build exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"
(cd "$W" && node scripts/structure/cascade.mjs snapshot --root "$W" --dist "$W/dist" --out "$R/cascade/base-snap" --sha floor-S1) > "$R/logs/base-snap.log" 2>&1; echo "base cascade snapshot exit $? load $(load)" >> "$O"
KB=$(find "$K/results" -type d -name baseline -path '*cascade*' | sort | tail -1)
if [ -n "$KB" ]; then for f in $(ls "$KB" | grep '\.seq$'); do cmp -s "$KB/$f" "$R/cascade/base-snap/$f" && echo "baseline $f: identical to the kit's committed baseline (${KB#$K/})" >> "$O" || echo "baseline $f: DIFFERS from the kit's committed baseline (${KB#$K/})" >> "$O"; done; else echo "no committed cascade baseline in the kit" >> "$O"; fi
(cd "$W" && node "$K/tools/peer-closure.mjs" --root "$W" --floor-base --table src/index.ts --json "$R/peer-base.json") > "$R/peer-base.txt" 2>&1; echo "base peer probe exit $? load $(load)" >> "$O"
KPB=$(find "$K/results" -name 'peer-closure-base.json' | sort | tail -1)
if [ -n "$KPB" ]; then cmp -s <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));delete j.root;console.log(JSON.stringify(j))' "$R/peer-base.json") <(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));delete j.root;console.log(JSON.stringify(j))' "$KPB") && echo "peer-base.json equals the kit's committed ${KPB#$K/} (root aside)" >> "$O" || echo "peer-base.json DIFFERS from the kit's committed ${KPB#$K/}" >> "$O"; else echo "no committed peer-closure-base.json in the kit" >> "$O"; fi
# (7) clone the built floor base
rm -rf "$FBC"; cp -c -R "$W" "$FBC" 2>"$R/logs/clone-fb.err" || cp -R "$W" "$FBC"; echo "floor base cloned to $(basename "$FBC"): $([ -d "$FBC/dist" ] && echo with dist || echo NO dist)" >> "$O"
rm -rf "$W/dist"; echo "dist removed; code digest $(dg)" >> "$O"
# (8) replay
t0=$(date +%s); l0=$(load); node "$K/replay.mjs" --root "$W" > "$R/replay.txt" 2>&1; rc=$?; echo "replay exit $rc $(( $(date +%s)-t0 )) s load $l0 -> $(load)" >> "$O"; tail -3 "$R/replay.txt" >> "$O"
t0=$(date +%s); node "$K/replay.mjs" --root "$W" > "$R/replay-rerun.txt" 2>&1; echo "replay rerun exit $? $(( $(date +%s)-t0 )) s load $(load)" >> "$O"; tail -2 "$R/replay-rerun.txt" >> "$O"
FD=$(dg); echo "final code digest $FD" >> "$O"
LD=$(sq 's.steps.at(-1).digest'); case "$FD" in "$LD"*) echo "FIN PASS final digest = the chain's last recorded digest" >> "$O";; *) echo "FIN FAIL final $FD != recorded $LD" >> "$O";; esac
case "$FD" in "$WANT_FIN"*) echo "FIN2 PASS final digest = ${WANT_FIN:0:16}… (§P11-6.4)" >> "$O";; *) echo "FIN2 FAIL final digest is not ${WANT_FIN:0:16}…" >> "$O";; esac
# (9) clone the unbuilt replayed tree
rm -rf "$UBC"; cp -c -R "$W" "$UBC" 2>"$R/logs/clone-ub.err" || cp -R "$W" "$UBC"; echo "unbuilt replayed tree cloned to $(basename "$UBC")" >> "$O"
echo "phase1 end $(date -u +%FT%TZ) load $(load)" >> "$O"
