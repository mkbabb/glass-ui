# BH PASS-1 RESEARCH — LENS: BAND-DAG COHERENCE

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `e550f1b0` (BG coherence audit fully folded)
**Agent:** band-dag-coherence research, PASS 1 (the FIRST BH coherence pass — baseline)
**Scope:** Verify `docs/tranches/BH/PLAN.md §4` (the band+wave table) for: (1) no cycles in the B0-B7 DAG;
(2) every BH `[WSn]`/`[WS12]` sequencing tag references a BG wave/WS that ACTUALLY EXISTS in the
CURRENT post-coherence-audit BG plan; (3) no stale BH reference to a pre-fold BG wave name/position
(esp. the G1 re-sequence of `BG.W-CLOSEFIX-9SITE` 12.0→0.7 + the renamed/clarified wave IDs).

**Sources read in full:** `BH/audit/RESPEC-COHERENCE/SEED-CONTEXT.md` · `BH/PLAN.md` ·
`BG/audit/RESPEC-COHERENCE/COHERENCE.md` (the folded BG coherence master) ·
`BG/execution/bg-build-map.md` (1381L — the actual post-fold BG wave IDs + seq) ·
`BG/execution/bh-interleave-map.md` (the BG-side projection of BH §3) ·
`BG/execution/EXECUTION-PROGRESS.md` (the authoritative live cursor) · `BG/FINAL.md` (build-order lock).
**On-disk spot-checks:** `package.json` peers · `vite.library.ts` · `useDragMorph.ts` ·
`src/styles/glass/ladder.css`/`dock/shell.css` line counts · `src/subpaths/`/`src/api/` ·
`proof:peer-conformance` RAN · `git log` (landed BH waves). `verify-siblings-intact --quiet` = exit 0 (before+after).

---

## 0. VERDICT

**The BH band-DAG is STRUCTURALLY SOUND — acyclic, and every WS-number reference resolves to a real,
position-unchanged BG WS.** The BG build order (`WS1→WS3→WS2→WS5→WS6→WS4→WS7→WS8→WS9→WS10→WS11→WS12`)
is KEEP across the coherence fold (BG `FINAL.md:467`, `bg-build-map.md:10`), and BH references BG ONLY by
WS-NUMBER (never by individual BG wave-ID), so the G1 re-sequence of `BG.W-CLOSEFIX-9SITE` (12.0→0.7) and the
WS2 dock-wave renames did NOT invalidate any BH `[WSn]` tag. The DAG is a forest rooted on the linear BG
WS-chain; the only intra-post-WS12 edges (`B5c→B4f`, `{B2.6,B4e}→B4f`, `B2.1-mech→B2.1-swap`, `B2.2→B7`,
`B5b→B5c`) form a clean partial order with `B4f` as the unique sink. **No cycle.**

The coherence DEFECTS are NOT in the graph topology — they are **3 cross-tranche REFERENCE / OBLIGATION
drifts** where the BG fold changed an obligation that the BH side (PLAN.md + the executable cursor) does
NOT yet reflect, plus **2 plan-vs-disk staleness items** (expected, since the [C] band has executed). The
single load-bearing one is the SEED's first concrete test: **the kf-peer bump is owned-on-the-BG-side but
absent-on-the-BH-side**, leaving a LIVE broken-gesture defect with no executable home in BH's own spec.

---

## 1. THE VERIFIED DAG (BH bands × the BG WS-chain)

### 1a. BG gating axis (the post-fold linear order — UNCHANGED)
```
[STAGE-0 ground-freeze] → BG.W-CLOSEFIX-9SITE (re-homed seq 0.7, after 3.6, before WS1 integration)
 → WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7  (core)
 → WS8 → WS9 → WS10 → WS11  (deep-morphism)
 → WS12  (coherence capstone, LAST)
 → BH[WS12] restructure tail → BG.W-CUT (tag, LAST) → BH.B4f (rm CLAUDE.md, absolute-last)
```
Verified: `bg-build-map.md:10`, `FINAL.md:45/467`, `EXECUTION-PROGRESS.md` PHASE 18/19. The
`BG.W-CLOSEFIX-9SITE` re-sequence is internal to the BG STAGE-0/WS7-Band-0.5 frontier; it does NOT shift any
WS-number, so BH's "full close = WS12" anchor is intact.

### 1b. BH band → unblock-edge (every band, tagged; cross-checked PLAN §4 vs bh-interleave §1 vs EXEC-PROGRESS)
| BH band/wave | Class | Gating WS | BG WS EXISTS? | Disk status (EXEC-PROGRESS) |
|---|:---:|:---:|:---:|---|
| B0 W0-scratch-sweep | [C] | — | n/a | **DONE** 7a138008 (row 1.1) |
| B1-W1 external-payload | [C] | (file-coord WS6) | WS6 ✓ | **DONE** 7813a695 + budget arm 141e4de7 (row 1.2) |
| B1-W2 value-destraddle | [C] | — | n/a | **DONE** 0d6b9f8a (row 1.3) — landed `^1.0.0` |
| B1-W3 dragmorph-snap-excise | [C] | — | n/a | **DONE** ba23c086 (row 1.4) |
| B2.0 alias-codemod | [C] | — | n/a | **DONE** ca988a76 (row 1.5) |
| B2.1-mech regen-mechanism | [C] | — | n/a | **DONE** c98ac8c8 (row 1.6) |
| B2.4a bh-carves | [C] | (gooBarbell arm WS4) | WS4 ✓ | **DONE** 6daf7ef3 paint-pending (row 1.7) |
| B2.5 dock-leaf-verify | [WS2] | WS2 ✓ | WS2 ✓ (DOCK-DECOMPOSE/FISSION carves) | PENDING (row 5.1) |
| B4c-extraction (precept) | [WS2] | WS2 ✓ | WS2 ✓ (DOCK_SPRING 0.32/0.7→0.68/0.64) | PENDING (row 5.2) |
| B2.4b leaf-verify-ws4 | [WS4] | WS4 ✓ | WS4 ✓ (CANVAS-LIFECYCLE-LEAVES/TABS-KEYBOARD) | PENDING (row 11.1) |
| B3 δ1-δ6 (6 waves) | [WS4] | WS4 ✓ | WS4 ✓ (DEMO-CHASSIS/MANIFEST-COLOCATE) | PENDING (rows 11.2-11.6) |
| B2.4c leaf-verify-ws5 | [WS5] | WS5 ✓ | WS5 ✓ (BLOB-KINEMATICS/GOODOT-SETUP) | PENDING (row 7.1) |
| B5a-deps-currency | [WS3] | WS3 ✓ | WS3 ✓ (SAFARI-BLUR-LITERAL @:559) | PENDING (row 9.1) |
| B2.1-swap / B2.2 / B2.3 / B2.6 | [WS12] | WS12 ✓ | WS12 ✓ | PENDING (rows 18.1-18.4) |
| B4b-content / B4c-repoints / B4d-reg / B4e | [WS12] | WS12 ✓ | WS12 ✓ | PENDING (rows 18.5-18.8) |
| B5b / B5c | [WS12] | WS12 ✓ | WS12 ✓ | PENDING (rows 18.9-18.10) |
| B7 api-ask-roster | [WS12] | WS12 ✓ | WS12 ✓ (+WS5 viz-disposition) | PENDING (row 18.11) |
| B4f-claude-delete | [WS12]+B5c, LAST | WS12 ✓ | WS12 ✓ | PENDING (row 19.2, after BG.W-CUT) |

**Every WS-number reference resolves.** No BH `[WSn]` tag points at a non-existent or re-numbered WS.

### 1c. Intra-DAG edges (the post-WS12 cluster) — acyclicity proof
```
B2.1-mech ──► B2.1-swap        (data: the regen mechanism feeds the swap)
B2.2 ──► B7                     (data: /api fold defines the 203-row ask map)
B5b ──► B5c                     (data: gate-manifest extract before rehome)
B5c ──► B4f                     (the 16 readers re-home before the rm)
{B2.6, B4e} ──► B4f             (dual-doc/style path-literals re-point before the rm)
B4b-content ──► B4f             (silent-loss fence: contracts redistribute before the rm)
```
`B4f` is the unique SINK (no out-edges). `B2.1-mech`, `B2.2`, `B5b`, `B2.6`, `B4e`, `B4b-content` are the
SOURCES within the post-WS12 cluster. No back-edge exists → **ACYCLIC** (confirmed against
PLAN.md:48 + bh-interleave-map.md:119-136, which agree byte-for-concept). The whole BH DAG = (the linear BG
WS-chain) ⨁ (this post-WS12 forest) — acyclic by construction.

---

## 2. COHERENCE VIOLATIONS (ranked, most-severe first)

### V1 [HIGH — the SEED's first concrete cross-tranche test, CONFIRMED] — the kf-peer bump is BG-owned but BH-absent; a LIVE broken-gesture defect with no executable home in BH's own plan/cursor

**The defect (on disk, VERIFIED):** `package.json:1078` `peerDependencies."@mkbabb/keyframes.js": "^5.0.0"`.
`useDragMorph.ts` now USES `snap:` (the B1-W3 snap-excise LANDED, ba23c086 — `commitSnapOnRelease` gone,
`snap: snapTargets.map(t => t.center)` wired at `:20-25`), but `DragOptions.snap` FIRST ships kf 5.1.0. The
published peer floor `^5.0.0` admits kf 5.0.0, where `.snap` does not exist → **a kf-5.0.0 consumer's drag
NEVER snaps to a detent.** glass-ui's OWN `devDependencies:1116` pin is `^5.1.0`, which MASKS the defect in
glass-ui's build/tests (proof:drag-morph GREEN locally).

**The gate is GREEN over the broken floor (RAN):** `node scripts/proof-peer-conformance.mjs` → PASS. It
checks only "`^5.0.0` admits latest 5.1.0? YES", NOT "floor ≥ first-`snap`-version 5.1.0 when `useDragMorph`
references `snap:`". This is the headless-green/live-broken disease at the dependency axis.

**The BG fold OWNS the fix and names BH as the owner** (`bg-build-map.md:720` + `:1190-1196` §G4):
> "the kf peer BUMP `^5.0.0 → ^5.1.0` itself is the `BH-B2.1-swap` deliverable per §G4" + the floor-vs-API
> gate-hardening on `proof:peer-conformance` via `BG.W-GATE-FIELD-AURORA` (born-RED on `^5.0.0` when
> `useDragMorph.ts` references `snap:`).

**THE DRIFT — BH's own side does NOT carry it (grep-confirmed, `BH/**` has ZERO `^5.0.0 → ^5.1.0` obligation):**
- BH PLAN.md B2.1-swap (line 68): subpaths-delete + regen + flatten + spec-rewrite ONLY. **No kf bump.**
- bh-interleave-map.md B2.1-swap (line 40): same set. **No kf bump.**
- EXECUTION-PROGRESS row 18.1 (B2.1-swap) gate cell: "proof:subpath-enumeration (landed surface)". **No kf bump.**
- EXECUTION-PROGRESS row 19.1 (BG.W-CUT) DOES list mechanical CONSUMEs, but only "kf 5.1.0 `DragOptions.snap`"
  (the SNAP API consume) and the VALUE floor `^1.0.0`→`^1.1.1` — NOT the kf PEER-FLOOR bump `^5.0.0→^5.1.0`.

**Net:** the kf peer-floor bump is named on the BG side (build-map §G4 + the field-aurora gate-hardening) but
has NO executable home on the BH side (no PLAN row, no cursor gate cell carries it). Since BH made the bump's
PREREQUISITE (the snap-excise), the bump is BH's obligation — and the SEED's exact question
("does BH's OWN plan still need an amendment — a follow-up wave that lands the retarget/peer-bump, since BH
made the bump?") resolves **YES**. **AMENDMENT OWED:** BH PLAN.md B2.1-swap (line 68) + the EXEC-PROGRESS row
18.1 gate cell must ADD the `package.json:1078` peer `^5.0.0 → ^5.1.0` bump + name `proof:peer-conformance`'s
floor-vs-API clause (the BG-side gate-hardening) as the lock, so the two sides AGREE.

### V2 [MED] — BH PLAN B1-W2 value-destraddle target is STALE: says `^1.2.0`, executed `^1.0.0`, BG-corrected to `^1.1.1`

BH PLAN.md:62 + bh-interleave-map.md:28 both say the destraddle target is **`^1.2.0`** ("keyframes 5.1.0
transitively deps value `^1.2.0`"). Three contradictions:
- **Executed reality (0d6b9f8a, on disk):** `package.json:1080` peer + `:1118` dev are BOTH `^1.0.0`, NOT `^1.2.0`.
- **BG correction (COHERENCE.md §2.C2 = MOOT/DROPPED; corrections-applied §):** `^1.2.0` would EXCLUDE
  npm-latest (1.1.1) and RED `proof:peer-conformance`'s "admits latest" clause + force value.js to publish
  1.2.0 first. The BG-canonical CUT-time floor is **`^1.1.1`** (admits latest AND contains kf's `^1.2.0` ⊆ `^1.1.1`).
- **The executed `^1.0.0` is GREEN today** (proof:peer-conformance RAN PASS — `wcagContrastRatio` has zero
  in-tree callers, so the floor is currently un-binding; BG defers the `^1.0.0→^1.1.1` lift to BG.W-CUT row 19.1).

**Net:** the B1-W2 wave-spec target (`^1.2.0`) is wrong THREE ways — it never matched the executed value, it is
the BG-condemned form, and it is not the BG-canonical CUT floor. The wave LANDED correctly (the executor used
`^1.0.0`), so this is a **plan-text-vs-reality drift**, not a live defect — but it would mislead any future
re-read. **AMENDMENT OWED:** reconcile PLAN.md:62 (+ §1-#4 prose "the value.js `^0.13.0 || ^1.0.0` straddle")
+ bh-interleave-map.md:28 to record "executed `^1.0.0`; CUT-time lift to `^1.1.1` per BG row 19.1; NOT `^1.2.0`."

### V3 [LOW-MED] — BH PLAN B1 (the binding question §1-#4) describes the lucide payload bug as UNFIXED; it is LANDED on disk

`vite.library.ts:72-84` (committed 7813a695, "BH.B1-W1") already lists `@lucide/vue` and the dead
`lucide-vue-next`/`vaul-vue` strings are REMOVED (the comment at :62-71 documents the bug HISTORICALLY +
names the lock `proof:external-payload`, which EXISTS and is GREEN). But:
- PLAN.md §1-#4 (line 17) still states it as a present-tense "One real payload bug — `@lucide/vue` is bundled
  into `dist` because `libraryExternal` lists the dead ... instead of the live `@lucide/vue`."
- PLAN.md B1 (line 61) + bh-interleave-map.md:27 still describe W1-external-payload as an UNLANDED `[C]` wave to do.

This is EXPECTED drift (B1-W1 is a [C] band authorized to run concurrently, and it DID run — EXEC-PROGRESS row
1.2 is the authoritative DONE record). The risk is purely a stale-narrative read; the binding cursor is correct.
**Disposition:** plan-text refresh (low priority — the cursor already reflects truth; flagging for the fold so
the binding-question §1 doesn't read as if the bug is open).

### V4 [LOW — plan-vs-disk staleness, EXPECTED] — PLAN §9 "execution awaits greenlight" + §3 "[C] bands run now" are stale; the entire [C] band has EXECUTED

EXEC-PROGRESS rows 1.1-1.12 are ALL DONE (B0, B1×3, B2.0, B2.1-mech, B2.4a, B4a, B4b-skeleton,
B4c-files, B4d-files, B6 — 12 [C] arms landed). PLAN.md §9 (line 158) + §3 (line 44) still frame these as
"to run now." This is the inherent plan-vs-cursor lag of an interleaved tranche mid-flight, NOT a coherence
defect — but PASS-2/3 should note the PLAN is now a HISTORICAL spec for the landed [C] band and a LIVE spec
only for the [WSn]/[WS12] tail. (The EXEC-PROGRESS cursor is the authoritative source; no graph edge is wrong.)

### V5 [LOW] — stale `package.json` line-number anchors in BH PLAN B1/B2 (file has shifted since the 4.2.0 snapshot)

PLAN.md:62 cites value at `package.json:1058` (deps) / `:1096` (peerDeps); the live file has value-peer at
`:1080` and value-dev at `:1118` (deps block was reshaped by the destraddle commit). PLAN.md:69 cites
`api/index.ts:500` ControlSize prose, PLAN.md:71 `useBloomUp.ts` (relocated by B2.4a, now `bloomUpField`).
These are line-number anchors that drift with edits — a known class (BG COHERENCE.md §2.L2 HEAD-numeral drift).
**Disposition:** cosmetic; re-anchor at the fold. No graph/sequence impact.

---

## 3. WHAT IS COHERENT (the negative findings — the audit must not flag these)

- **No stale BG wave-NAME reference in BH.** BH references BG exclusively by WS-NUMBER (`WS1..WS12`), and the
  WS structure is position-unchanged across the fold, so the `BG.W-CLOSEFIX-9SITE` 12.0→0.7 re-sequence + the
  WS2 dock-wave renames (DOCK-MORPH-UNIFY/DECOMPOSE/FISSION-WIRE/SHELL-DOCK-DRY/STORY-MODULARIZE) + the WS5
  viz-wave set are all INSULATED from BH's tags. The ONE BG-wave-specific value BH cites — DOCK_SPRING
  `0.32/0.7→0.68/0.64` (PLAN.md:90, the B4c-extraction "else stale" gate) — MATCHES BG's WS2 spec
  (`bg-build-map.md:260` "F13 three-place DOCK_SPRING `0.68/0.64` fix"). Coherent.
- **BG→BH references all resolve.** BG's bg-build-map names `BH-B2.1-swap` (`:720,:1190,:1292`), `BH-B5c`/`B4f`
  (`:1100,:1352`), `BH-B4b-content` (`:1126`), `BH-B0` (`:636`), `BH[WS12]` (`:16`) — every one EXISTS in BH
  PLAN.md §4. No dangling BG→BH pointer.
- **The B0→G3 commit-msg EXTEND edge is satisfied.** `.githooks/commit-msg` is env-driven
  (`GLASS_UI_ACTIVE_TRANCHE`, landed 7a138008) — the prerequisite for BG.W-CLOSE-SWEEP's sweep-fast arm append
  (BG COHERENCE §3d/§4-corrections). Coherent.
- **The collision-file ownership matrix is correct.** WS10 owns de-shadcn (the B2.4a carousel-arm × WS10
  graze, `bg-build-map.md:498`); WS6 adds the siri subpath ENTRIES to `vite.library.ts` (different lines than
  B1-W1's `libraryExternal` block — "coordinate file not lines" is the right protocol); WS2 owns the dock
  god-modules; WS3/WS5/WS8 own the substrate god-modules. All match bh-interleave §2.
- **On-disk frontier is consistent with "BG main waves UNRUN."** `ladder.css`=527L, `shell.css`=510L (still
  >500 → the R1-R4 close-reds are LIVE; `BG.W-CLOSEFIX-9SITE` hasn't carved them yet). `src/subpaths/`=79
  files, `src/api/`={index.ts,types-extra.ts} (both present → B2.1-swap/B2.2 unrun). The carve hosts from
  B2.4a are ≤500 (381/433/449 per EXEC-PROGRESS row 1.7). All consistent — no premature/orphaned state.

---

## 4. THE FRICTION-CLASS MATCH (for the synthesis taxonomy)

The single load-bearing finding (V1) is the **SEED-named "a wave lands the surface change but not the
consumer-side adaptation"** class — the SAME shape as BG's G2 near-miss (WS8-M7 would have stripped a live
grounding) and G5 (the WS5 parallax protector didn't exist on disk). Here: B1-W3 landed the surface change
(useDragMorph uses `snap:`) but NOT the consumer-side adaptation (the peer floor that makes `snap:` reachable
by a published consumer). The BG fold caught HALF of it (named the bump owner + the gate-hardening on the BG
side) but the obligation never propagated to BH's own executable spec — so it is STILL a live incomplete-pairing
at HEAD. This is BG friction-class **L** (reka/kf binding silent no-op) crossed with **S** (dependency-floor),
recurring one cross-tranche-handoff level up from where BG fixed it.

V2/V3/V5 are BG friction-class **B** (orphaned-wave-claim) / plan-vs-disk drift — low-severity, expected for an
interleaved mid-flight tranche, but they collectively show the **BH PLAN.md is now a partially-historical
document** (the [C] band executed, the targets drifted) that PASS-2/3 should reconcile against EXEC-PROGRESS.

---

## 5. AMENDMENTS OWED (the fold-input list, for PASS-2/3 → develop)

1. **[V1, HIGH] Home the kf peer-floor bump on BH's side.** Add to BH PLAN.md B2.1-swap (line 68) + EXEC-PROGRESS
   row 18.1 gate cell: `package.json:1078` peer `@mkbabb/keyframes.js` `^5.0.0 → ^5.1.0`, locked by
   `proof:peer-conformance`'s floor-vs-API clause (the `BG.W-GATE-FIELD-AURORA` gate-hardening). Make the BH
   side AGREE with `bg-build-map.md §G4`. (Confirm the gate-hardening assertion is itself on a BG wave that lands
   before BH-B2.1-swap — it is: `BG.W-GATE-FIELD-AURORA` is WS7, B2.1-swap is post-WS12.)
2. **[V2, MED] Correct the value-destraddle target.** PLAN.md:62 + §1-#4 + bh-interleave:28 → record executed
   `^1.0.0`; CUT-time lift to `^1.1.1` (BG row 19.1), NOT `^1.2.0`.
3. **[V3, LOW-MED] Refresh PLAN §1-#4 lucide prose** to past-tense / LANDED (the bug is fixed, locked by
   `proof:external-payload`).
4. **[V4, LOW] Re-frame PLAN §9/§3** to acknowledge the [C] band has executed (EXEC-PROGRESS is authoritative).
5. **[V5, LOW] Re-anchor stale `package.json`/file line-numbers** at the fold (cosmetic).

**None of these is a DAG-topology fix** — the graph is sound. They are cross-tranche reference/obligation
reconciliations, with V1 the only live-defect-bearing one.

---

## 6. CONVERGENCE / CONFIDENCE

- **DAG acyclicity + WS-reference resolution: 100% confident** (every edge + every WS-number cross-checked
  against the post-fold bg-build-map + FINAL.md + EXEC-PROGRESS; all three agree).
- **V1 (kf-peer): 100% confident, on-disk verified** (peer `^5.0.0` + useDragMorph `snap:` + proof:peer-conformance
  GREEN-over-broken RAN + the BG-side ownership grep + the BH-side absence grep).
- **V2-V5: high confidence** (each spot-verified on disk / in the live cursor).
- **Residual (for PASS-2):** confirm the floor-vs-API gate-hardening (the `proof:peer-conformance` clause the BG
  fold names on `BG.W-GATE-FIELD-AURORA`) is itself UNLANDED at HEAD (it should be — that gate is a WS7 build),
  so that V1's amendment doesn't double-own an already-built assertion. Quick check owed in PASS-2.
