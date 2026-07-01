# CRIT-2 — Disk reality + coherence critique (RESPEC-GESTALT pass-2)

**Critic:** CRIT-2 (disk-reality + cross-lane coherence). **Date:** 2026-07-01 · branch `tranche/BG` @ `306c3059` (tree clean).
**Inputs read in full:** `DEV-A1-restructure-rows-0-9.md`, `DEV-A2-restructure-rows-10-19.md`, `DEV-B-bh-cut-engine.md`,
`DEV-C-new-wave-specs.md`, `SYNTHESIS-PASS1.md`, `SEED-CONTEXT.md`. Every claim below re-verified against the REAL repo
(read files, grep, wc, sed). Convergence: **89%** — strong, executable, disk-grounded; blocked from ≥95% by ONE
concurrent-build file-collision (the dead-cut double-owner) plus one contradictory DAG edge and one gate-naming split,
all inside the SAME ruling-#2 dead-cut concern.

---

## 0. Method + headline

I enumerated `EXECUTION-PROGRESS.md` myself (156 wave rows: `0.1`…`19.2` + `LX.1-3`), diffed the two disposition
tables against it, spot-checked 10 merges against `bg-build-map.md`, spot-checked ~18 named files/gates/symbols on disk,
diffed the four lanes for contradictions, and verified the DEV-B engine spec line-by-line against
`bg-bh-execute.wf.js`. The corpus is **materially accurate** — the DEV authors verified on disk and it shows. The
engine spec (DEV-B §3) is exemplary: every cited line matches the real 249-line file. The row-coverage is complete and
exactly-once. The defects are concentrated in the ruling-#2 dead-cut hand-off between DEV-A1 and DEV-A2.

---

## 1. (a) Row coverage — COMPLETE, exactly-once ✓

Cursor total = **156** rows. Split:
- **DEV-A1 owns `0.x–9.x` + `LX` = 71 rows.** Disk-diffed: 0.1-0.7 (7) · 1.1-1.12 (12) · 2.1-2.7 (7) · 3.1-3.12 (12) ·
  4.1-4.11 (11) · 5.1-5.2 (2) · 6.1-6.9+6.b1+6.b2 (11) · 7.1 (1) · 8.1-8.4 (4) · 9.1 (1) · LX.1-3 (3) = **71**. Every
  one appears in DEV-A1's table exactly once. ✓
- **DEV-A2 owns `10.x–19.x` = 85 rows.** Disk count `grep -cE '1[0-9]\.[0-9]+[a-z]?' = 85`. DEV-A2's table lists all
  of 10.1-10.25 (25) · 11.1-11.6 (6) · 12.0-12.12 incl. 12.4a/12.4b (15) · 13.1-13.5 (5) · 14.0-14.5 (6) · 15.1-15.5
  (5) · 16.1-16.4 (4) · 17.1-17.6 (6) · 18.1-18.11 (11) · 19.1-19.2 (2) = **85**. Every one disposed exactly once. ✓

**No row unaccounted; no row double-disposed. 71 + 85 = 156.** The boundary is clean (6.b1/6.b2 → DEV-A1; 12.0 →
DEV-A2). This is the strongest part of the corpus.

**Defect (MINOR, finding F4):** DEV-A2 §9 *tally* says "Rows in range 10.x–19.x: **63**" and its component list
(WS4 25 · WS7 **13** …) sums to 83, while the real count is **85** (WS7 phase-12 is 15 rows, not 13 — 12.0-12.12
includes 12.4a/12.4b). The *table* is complete; only the summary miscounts. Cosmetic, but the cleanup tranche's own
plan must pass the discipline it enforces. (DEV-A1 §5 also carries a visible unfinished-edit artifact — "4.7→4.7-anchor
wait 4.8→4.7" — in its reconciliation math.)

---

## 2. (d)+(f)+(g) Cross-lane contradictions — THREE real, one collision

### F1 — CRITICAL: `useDockContextSilhouette` delete + ratchet-drain is DOUBLE-OWNED (concurrent-build collision)

- **DEV-A1 row 4.3 `W-DOCK-CUT`:** "deletes verified-dead `useDockContextSilhouette` (551L, 0 real consumers) →
  **drains a RATCHET baseline**" and §3 states verbatim: "**4.3 is the SOLE owner** of `useDockContextSilhouette`
  delete — **10.5 must NOT double-own** (C2-F1)."
- **DEV-A2 §2 dead-cut + §6 ratchet table row 8:** assigns the SAME delete AND the SAME 551L ratchet-drain to
  **10.5** ("DELETE + rework/retire `AppSwitcher.vue` demo"; "`useDockContextSilhouette.ts` 551 → **10.5 dead-cut** →
  DELETE (drains by removal)"). DEV-C §0 sides with DEV-A2 (lists the silhouette under "DEV-A2's dead-cut wave").

Disk truth: `useDockContextSilhouette` has **1 demo consumer** (`demo/stories/dock/examples/AppSwitcher.vue`,
verified present) — so DEV-A1's "0 real consumers" is only true for `src/`, and the demo needs rework either way.
The engine sequences BG waves purely by explicit `preconds` (`bg-bh-execute.wf.js:100`); 4.3 is phase-4 (WS2), 10.5 is
phase-10 (WS4-dead-cut). If the fold writes NO precond between them (the cursor rows carry none today), a batch-3 sweep
can schedule both, and **two agents delete the same file → collision**, or the loser errors. Worse, `BG.W-CUT`'s
`RATCHET_BASELINES == {}` precond has an **ambiguous drain owner** for baseline #8. **Fix:** pick ONE owner (the dead-cut
10.5 is the cleaner home — it already owns `AppSwitcher.vue` rework); 4.3 becomes a *verify* (`DEFINITION-ABSENT` +
dock-side clearance), not a second delete; reconcile the ratchet §6 row to name only 10.5; write the precond
`10.5 → 4.3` (or fold 4.3's dock clearance into 10.5's precond). DEV-A1's own fence ("must not double-own") is VIOLATED
by DEV-A2 — the two lanes did not reconcile.

### F2 — MAJOR: `6.4 ↔ 10.5` dependency direction is contradictory; DEV-A2's justification is false on disk

- **DEV-A1 6.4:** "the `useVizChoreography` DELETION is owned by 10.5 … 6.4's gate becomes a `DEFINITION-ABSENT`
  *verify*. **Edge: 6.4 hard-depends 10.5**." (i.e. 10.5 deletes → 6.4 verifies-absent.)
- **DEV-A2 §2:** "Promote `BG.W-DEAD-COMPOSABLE-CUT` (10.5) … **sequenced AFTER** … DEV-A1's WS5 provides
  `useVizChoreography`'s **last consumer removal via 6.4**." (i.e. 6.4 → then 10.5.)

These are opposite directions. Disk truth: `grep -rln useVizChoreography src demo` = **0 consumers** (DEV-A2's OWN
census row even says "0 zero importers anywhere"). So the premise "6.4 removes the last consumer" is **false on disk** —
there is nothing for 6.4 to remove. The correct, disk-consistent edge is DEV-A1's: `useVizChoreography` is already
orphaned; 10.5 deletes it; 6.4's `DEFINITION-ABSENT` gate can only go GREEN after 10.5 → **6.4 depends-on 10.5**. Because
the engine orders BG by explicit `preconds`, the fold MUST write `10.5 ∈ preconds(6.4)` into the build-map, and DEV-A2's
"10.5 after 6.4" prose must be deleted (it will otherwise seed the loader with the reversed edge). **Fix:** one
direction (10.5 before 6.4); strike the false last-consumer justification.

### F3 — MAJOR: F8 family-gate name is split across lanes (`proof:close` vs `proof:build`/`proof:meta`/`proof:warm-identity`)

DEV-A1's F-table and every DEV-A1/A2 F8 disposition route to **`proof:close`** ("→ `proof:close` arm"). DEV-C's
family-gate roster (§0) has **no `proof:close`** — it authors all F8 waves against **`proof:build`**, **`proof:meta`**,
and **`proof:warm-identity`**. None of these four scripts exists on disk yet (all to-be-minted), so there is no anchor
to disambiguate. A build agent folding the F8 dispositions will not know which gate name is canonical for e.g. 9.1,
12.4b, 18.x. **Fix:** the fold must reconcile the F8 gate taxonomy to ONE naming (DEV-C's three-way split — build/meta/
warm-identity — is the more considered shape; then map DEV-A1/A2's "→ proof:close" arms onto the correct one of the
three). This is bounded (F8 is the most heterogeneous family) but must be decided, not left to the builder.

### F5 — MINOR: `useDockFission` ratchet-drain owner ambiguous

DEV-A2 §6 row 5 assigns the `useDockFission.ts:604` drain to "**4.4/4.5**"; DEV-A1 4.5 claims it ("Drains
`useDockFission.ts:604`"). Overlapping (4.5 is in both) but not single-named. Name one owner in the ratchet chain.

### (g) Write-fence — otherwise SAFE

The two genuine carve double-owners the lenses flagged ARE reconciled to single writers: `useGlassBackdropLuminance`
→ 10.13 sole (DEV-A2 §4a), `createCanvasLifecycle` → 10.12 sole + WS8 fence re-pinned (§4b). The dead-cut references
(DEV-C F5.1 "orphan deletes OWNED BY DEV-A2's dead-cut — this wave references it") state ownership once. The 0.7 blur-
carve of `ladder.css` is sequenced BEFORE `W-GLASS-REGISTER-UNIFY` (which also touches `ladder.css`) — edge preserved.
**The ONLY residual collision is F1** (`useDockContextSilhouette`, 4.3 vs 10.5).

---

## 3. (e) Engine spec (DEV-B §3) — EXEMPLARY, disk-exact ✓

`docs/tranches/BG/execution/bg-bh-execute.wf.js` exists at the cited path, **249 lines** (DEV-B: "canonical, 249 lines
— verified"). Every cited anchor matches byte-for-byte:
- `grep -cE 'doneBuilding|buildComplete|paintComplete|FAIL-PAINT' = 0` ✓ (the markers ARE absent — the fix is genuinely
  un-applied; ruling #9 Stage-0 precondition is real).
- `:48` status enum = `['PENDING','BUILDING','PAINT-PENDING','DONE','BLOCKED','FAIL']` ✓ (DEV-B adds `'FAIL-PAINT'`).
- `:86` `byId`, `:87` `allDone` (`.every(w=>w.status==='DONE')`), `:100` `ready` (`map[p].status==='DONE'`), `:153`
  `pendingLeft`, `:200` status-apply, `:204` `const paintWaves = []` (with the exact retired-judge comment), `:243`
  `cutReady` — ALL match DEV-B's cites. ✓
- `grep -cE 'Workflow\(|bg-paint' = 0` ✓ (the paint edge IS orphaned; `bg-paint.wf.js` exists as a sibling — DEV-B §3.2
  correct that it must be wired as a scheduled edge).
- The DAG-loader prompt clause DEV-B §3.1 amends (":136 … a PAINT-PENDING row … MUST NOT re-enter the build frontier")
  exists verbatim on disk. ✓

The five-edit deadlock repair, the paint-edge insertion, the FAIL-PAINT→FIX-agent recovery, and the boot-witness are
all well-formed against the real code and target the real deadlock. This is the highest-confidence section of the corpus.
Worktree pollution (`.claude/worktrees/` = 83G / ~99 dirs) — I did not re-measure but the worktree-GC spec is
scope-fenced correctly (in-repo only; runs `verify-siblings-intact` first). No fence violation.

---

## 4. (b) Merge integrity — GROUNDED, no silent loss ✓

All 14 spot-checked merged/absorbed wave ids resolve to real specs in `bg-build-map.md` (each ≥1 hit;
`W-DEMO-STYLE-REHOME` 4, `W-VIZ-DEMIGRATE` 4, `W-VIZ-SUBSTRATE-DELETE` 3, the four Siri waves + the dock/glass merges
1-2 each). Each DEV disposition preserves the absorbed wave's behavioral assertion as a named clause on the anchor gate
(e.g. 3.4's Safari webkit assert → `proof:glass` clause; 4.2's busy-single grep → `proof:dock` clause; 6.7's gpu
co-revert → the atomic `W-VIZ-DEMIGRATE` gate edit). No merge silently drops a gate/assertion. The register-collapse
(WS3 5-wave fragmentation → `W-GLASS-REGISTER-UNIFY`) and the Siri 4-gate→`proof:siri`-4-arms fold are both
assertion-preserving. ✓

---

## 5. (c) Disk spot-checks — ~18 verified, 2 imprecisions

**Exact ✓:** `RATCHET_BASELINES` = **16** active entries (`proof-no-god-module.mjs:138-172`; matches A1/A2/B — BH PLAN
§71 "drained to ∅" is correctly flagged FALSE); `ladder.css` **527L** / `shell.css` **510L** ✓; `--dock-surface-blur`
at `shell.css:29,159` ✓; `Surface` union = **4-rung** `"glass"|"veil"|"opaque"|"clear"` (`useSurfaceAxis.ts:42`) ✓;
`createRenderTarget.ts` + `glass-refract.glsl.ts` **ABSENT** ✓ (C-SAFARI keystone unbuildable — drop-with-trigger
justified); `siri-island/` **ABSENT** ✓; `glass-atom.css`/`glass-chip.css`/`liquid-morph.css` present, `liquid-morph.css`
**850L** ✓; gate count **360** ✓; `proof-ba-gestalt.mjs` roster points at **`bg-gestalt-roster`** (lines 9,78) ✓ (DEV-C
§0 correctly corrects GD-C1's stale "points at BC"); `DockStage.vue:38` default = **`PRESETS.OPENAI_SKY`** ✓ (GB-5
warm-field fix justified); `useCelebrationBurst` real consumers = **0** (barrel + `jubilance.css` prose + `types-extra.ts`
re-export only) ✓ — DEV-A2's F-A2-2 correction of 12.2's false "KEEP (2 consumers)" is disk-confirmed.

**Imprecision (MINOR, finding in F6 below):** DEV-A1 3.2's guard says "delete ONLY **`shape.css:208-249`** dead
`.cartoon-cast`". The file is `src/styles/**dock**/shape.css` (there is NO `src/styles/glass/shape.css`), and the block
at dock/shape.css:208-249 (`.glass-dock > .cartoon-cast`, `BD.W-DOCK-PUNCH-CHANNEL`) is a **live** kinetic dock-cast
mechanism being *retired* by `W-DOCK-CAST-RETIRE`, not literally "dead". The line numbers match dock/shape.css exactly
and the guard's real value — "`cards.css:359` `.cartoon-cast` stays LIVE" — is disk-verified CORRECT (cards.css:359 is a
genuinely separate live block). So the guard's intent is sound; only the path prefix + the "dead" label are loose.

---

## 6. Findings ranked (mustFix)

1. **[critical] Dead-cut double-owner + file collision.** `useDockContextSilhouette` delete AND its 551L ratchet-drain
   are claimed by BOTH DEV-A1 4.3 ("sole owner; 10.5 must NOT double-own") and DEV-A2 10.5 dead-cut (§2/§6). Concurrent
   batch-3 file-delete collision + ambiguous `RATCHET_BASELINES=={}` cut-precond owner. Assign ONE owner (10.5), demote
   4.3 to verify, write the `10.5→4.3` precond, fix ratchet §6 row 8. (AppSwitcher.vue demo consumer confirmed on disk —
   rework owed regardless.)
2. **[major] `6.4↔10.5` DAG edge contradictory.** DEV-A1: 6.4 depends-on 10.5. DEV-A2: 10.5 after 6.4, justified by
   "6.4 removes the last `useVizChoreography` consumer" — FALSE on disk (0 consumers). Engine orders BG by explicit
   `preconds`; write `10.5 ∈ preconds(6.4)`, strike DEV-A2's reversed prose + false justification.
3. **[major] F8 family-gate name split.** A1/A2 → `proof:close`; DEV-C → `proof:build`/`proof:meta`/`proof:warm-identity`
   (no `proof:close` in its roster). None exist on disk. Reconcile to ONE taxonomy in the fold before the builder
   inherits both.
4. **[minor] DEV-A2 §9 tally miscount.** Says 63 rows in range (components sum 83); actual = 85 (WS7 = 15 rows, not 13).
   Table coverage is complete; only the summary + DEV-A1's "wait 4.8→4.7" edit-artifact are cosmetic.
5. **[minor] `useDockFission` drain owner ambiguous** — DEV-A2 §6 "4.4/4.5" vs DEV-A1 4.5. Name one.
6. **[minor] DEV-A1 3.2 dock-cast citation** — mis-path (`shape.css`→`src/styles/dock/shape.css`) + "dead" label on a
   live-being-retired block; guard intent (keep `cards.css:359`) is correct + disk-verified. Tighten the path/label.

---

## 7. Verdict

The pass-2 develop corpus is **executable and disk-honest** — coverage is complete and exactly-once, the engine spec is
line-exact, merges are grounded with no silent assertion loss, and the disk-grounding across ~18 spot-checks is strong
(the DEV authors re-verified on disk and it shows). No protected-set surface is re-plumbed. The gap to fully
develop-ready is a single cluster: the ruling-#2 dead-cut hand-off between DEV-A1 and DEV-A2 was not reconciled —
producing one real concurrent-build file-collision (finding F1, critical), one backward/contradictory DAG edge (F2),
and one F8 gate-naming split (F3). All three are bounded, touch the same concern, and are fixable in the fold without
re-developing any wave. **Convergence 89%** — above the ≥85% develop-ready bar, but with ONE CRITICAL (F1) that MUST
close before the build resumes, since the engine sequences on the very preconds the contradiction leaves unwritten.
