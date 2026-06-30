# PASS 1 — RESEARCH — LENS: WAVE-DAG COHERENCE

**Agent:** DAG-COHERENCE researcher (Pass 1, baseline) · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD:** `4c761b64` (the re-spec FOLD) · **Siblings:** intact (`verify-siblings-intact --quiet` exit 0, before AND after).
**Scope:** all 150 wave rows in `EXECUTION-PROGRESS.md` (347L) + `bg-build-map.md` (1020L) + the live engine `bg-bh-execute.wf.js` (22KB) + `bg-paint.wf.js`, cross-checked against the on-disk tree (`src/styles/`, `git log`) + the `AMENDED-WAVE-PLAN.md` / `SEED-CONTEXT.md`.

> This pass rebuilds the dependency graph from scratch, verifies acyclicity + edge-correctness, positions the 7 folded gap-waves (G1–G7), and hunts forward-reference breaks. It **confirms and tightens** the prior-run finding (commit `6c1f5386`) on G4, and surfaces one finding the prior run under-rated to MEDIUM that is actually **HIGH and currently LIVE** (the PAINT-PENDING≠DONE stall).

---

## 0. THE STRUCTURAL FACT THAT FRAMES EVERYTHING — there is NO static DAG

`bg-bh-execute.wf.js` encodes **zero static edges.** It spawns a **DAG-LOADER agent** (`:134`) that READS the three prose docs (`bg-build-map.md` + `bh-interleave-map.md` + `EXECUTION-PROGRESS.md`) and RETURNS a `preconds:[]` array per wave **inferred from the prose.** The frontier then fires on exactly three rules:

- `ready(w)` (`:98`) = `status==='PENDING'` ∧ `preconds.every(p ⇒ map[p].status==='DONE')` ∧ `interleaveReady(w)`.
- `interleaveReady` (`:89`) returns **`true` UNCONDITIONALLY for every BG wave** (`:90` `if (w.tranche === 'BG') return true`). → **BG fire-order is enforced ENTIRELY by the per-wave `preconds` array — never by `ws`, never by `seq`.**
- `composeBatch` (`:105`) uses `seq` ONLY as a tiebreaker (`:106` `sort((x,y)=>x.seq-y.seq)`, "prefer LOWER seq"), file-disjoint, ≤1 per hot-file, ≤3 per batch.

**Consequence (the meta-risk).** The DAG's correctness == the correctness of the prose preconds an LLM re-parses every boot. The seed's named friction class **"hand-authored maps that drift"** applies to the DAG itself — and the DAG-LOADER is told `seq` is "the build-order ordinal" (`:136`), so where prose preconds are silent, the LOADER's only ordering signal is the seq ordinal. That is the exact hinge the G4 defect turns on (§2).

**Acyclicity: VERIFIED.** No cycles across the 12 WS + BH tail. The one bidirectional-looking pair — WS2 `4.1`→WS6 (`useDockSpring` produced by 4.1, consumed by SIRI) and WS6→WS2 `4.3` (DOCK-CUT "after WS6 coordination") — resolves through **DISTINCT** WS2 nodes (`4.1 ≠ 4.3`); `4.1` does not depend on `4.3`, so `4.1→WS6→4.3` is a forward chain, not a cycle. No duplicate seq ordinals (shell check clean). Every wave appears exactly once.

---

## 1. THE VERIFIED DAG — seq IS consistent with the build order EXCEPT G4

The declared build order is `WS1→WS3→WS2→WS5→WS6→WS4→WS7 → WS8→WS9→WS10→WS11→WS12 → BH[WS12] → CUT`. The seq ordinals encode it faithfully (this is a positive finding — the scheme is sound):

| seq band | workstream | build-order phase | consistent? |
|---|---|---|---|
| 0.x | STAGE-0 (WS7 ground-freeze) | first | ✓ |
| 2.x | WS1 shell/routing/field | 1 | ✓ |
| 3.x | WS3 glass standardization | 2 | ✓ |
| 4.x | WS2 dock convergence | 3 | ✓ |
| 5.x / 7.x / 9.x / 11.x | BH[WS2/WS5/WS3/WS4] interleave | after each WS | ✓ |
| 6.x | WS5 viz | 4 | ✓ |
| 8.x | WS6 siri | 5 | ✓ |
| 10.x | WS4 components | 6 | ✓ |
| 12.x | WS7 close machine | 7 | ✓ |
| 13–17.x | WS8/9/10/11/12 deep + capstone | 8–12 | ✓ |
| 18.x / 19.x | BH[WS12] tail / CUT + B4f | last | ✓ |
| **12.0** | **G4 `BG.W-CLOSEFIX-9SITE`** | **declared FIRST (pre-WS1)** | **✗ — homed at 12.0, orders LAST** |

**G4 is the SOLE seq-vs-build-order violation.** Every other wave's seq matches its phase. That is what makes the defect both isolated AND load-bearing.

---

## 2. ★ HIGH — G4 "LANDS FIRST" IS UNENFORCED, ALREADY VIOLATED ON LIVE DISK, AND THE "ENCODED IN THE DAG" CLAIM IS FALSE

`BG.W-CLOSEFIX-9SITE` (G4) is AMENDED-WAVE-PLAN amendment 1: **"LANDS FIRST … post-STAGE-0, BEFORE WS1."** Its binding rationale — it carves `ladder.css` 527→470 + `dock/shell.css` 510→459, **"the EXACT files WS3 re-edits, so the carve lands BEFORE WS3 builds on the carved leaves."** Four independent facts show this is broken:

**(a) seq orders it LAST.** G4 = `seq 12.0`. Every WS1 wave is `2.x`, every WS3 wave `3.x`. `composeBatch` prefers LOWER seq → among ready waves the engine fires `2.1` before `12.0`. The seq mechanism orders G4 **opposite** to its requirement.

**(b) No WS1/WS3 wave names G4 as a precond.** `BG.W-ROUTE-TRANSITION`'s precond is *"Stage-0 ground-freeze"* (build-map WS1 #1). `BG.W-GLASS-BLUR-PEER`'s precond is *"token-collapse Phase-1-adjacent; saturate paint WS1-FIELD-GATED."* Neither (nor any other WS1/WS3 wave) lists `BG.W-CLOSEFIX-9SITE`. Since `interleaveReady` is unconditionally `true` for BG, **the ONLY thing that could order G4 first is the DAG-LOADER inferring a `G4→{all WS1/WS3}` edge from prose — and a "predecessor" edge only exists if the SUCCESSOR lists it. The successors don't.** The LOADER has no signal.

**(c) The "encoded in the DAG" claim is FALSE.** EXECUTION-PROGRESS `12.0` note (`:219-222`) states *"the DAG (in `bg-bh-execute.wf.js`) encodes it as a predecessor of WS1."* **`bg-bh-execute.wf.js` encodes NO static edges** (§0). There is no `predecessor-of-WS1` encoding anywhere in the `.wf.js`. The note is a documentation lie that masks the defect.

**(d) The violation is ALREADY REALIZED in committed history.** On live disk RIGHT NOW (verified this pass):
- `ladder.css` = **527L**, `dock/shell.css` = **510L** (R1/R2 close-reds still LIVE).
- carve targets `glass/grain-overlay.css` + `dock/shell-regions.css` **do not exist**.
- `--glass-blur-dock` still present in `glass.css`/`dark-arm.css`/`bridges.css` (R2 not retired).
- `git log`: `CLOSEFIX-9SITE`/`grain-overlay`/`shell-regions` in **ZERO** commits.
- meanwhile WS1 (`2.1–2.7` all DONE), WS3 `3.1`/`3.6`/`3.7`, WS4 `10.25`, and the 3 live-fixes ALL landed (commits ancestors of HEAD). **The pre-fold execution ran `WS1 → partial-WS3 → … (G4 still PENDING)` — the EXACT inversion the amendment forbids.** The fold (`4c761b64`) did NOT fix the ordering: G4 is still `seq 12.0`, still precond-unbound. A resumed execution will repeat the violation.

**The fix the plan owes:** make G4 an EXPLICIT precond of every `ladder.css`/`shell.css`-touching WS3 wave (and ideally WS1's first integration wave), OR re-seq it to `0.7` so the tiebreaker fires it post-STAGE-0. Prose-only "lands first" is not load-bearing under this engine.

---

## 3. ★ HIGH (forward-reference INVERSION) — WS3 `3.6` PRE-EMPTED G4's OWN DELIVERABLE; G4's atomic-diff spec is now STALE

G4's spec frames the dock-blur re-point as ITS work: *"the dock still paints blur via `--dock-surface-blur: var(--glass-blur-resting)` (8px peer, **verified 0 orphan readers**)."* But `BG.W-GLASS-BLUR-PEER` (`3.6`, committed `cd9ce46`, PAINT-PENDING) **already shipped exactly that** — verified on disk:

```
src/styles/dock/shell.css:29   --dock-surface-blur: var(--glass-blur-resting);
src/styles/dock/shell.css:159  backdrop-filter: var(--dock-surface-blur);
```

This is a forward-reference **inversion**: the wave declared FIRST (`12.0`) is pre-empted by a wave declared LATER (`3.6`) that already executed. Consequences G4's spec does not account for:
- **The "9 sites, not 6" enumeration is computed against 4.2.0 HEAD.** `3.6` already removed the dock consumer of `--glass-blur-dock`, so G4's site landscape (sites 5–8: `dock-shrink-blur` S3 · `theme-style .blur-dock` · `InstrumentChassis.spine-variant` unit · `glass-cal` EXPECT_RADII) may differ — some may already be partially neutralized by `3.6`'s commit + the `353eac5d` `glass-cal.spec` EXPECT_RADII 10→8 sync.
- **The "dist `glass-ui.css` BYTE-IDENTICAL to HEAD" invariant is now ambiguous.** HEAD has moved (`3.1` cartoon-ink, `3.6` blur-peer, `3.7` idiom-factor, WS1, `10.25` category-card-warm all changed compiled CSS since 4.2.0). "Byte-identical to HEAD" must be re-defined against the CURRENT frontier, not 4.2.0.

**G4 owes a re-derivation against the live frontier before it runs** — the atomic-diff spec as written is stale.

---

## 4. ★ HIGH (under-rated by the prior run; currently LIVE) — PAINT-PENDING ≠ DONE is a SYSTEMIC build-frontier STALL

Paint is decoupled: `bg-bh-execute.wf.js:204` sets `paintWaves = []` (the in-cycle judge is dead); `[P]` waves land `PAINT-PENDING` and the SEPARATE `bg-paint.wf.js` flips them DONE out-of-band (W-REFLECT3 / late sweep). The DAG-LOADER instruction (`:136`) says a PAINT-PENDING row *"is DONE-building and MUST NOT re-enter the build frontier"* and **STAYS PAINT-PENDING.** But every gating predicate checks the literal string `'DONE'`:
- `ready()` `:100` — `preconds.every(p ⇒ map[p].status === 'DONE')`.
- `allDone(ws)` `:87` — `.every(w => w.status === 'DONE')` (gates BH[WSn] interleave).
- `cutReady` `:243` — `every(w => w.status === 'DONE')` (gates the tag).

**`PAINT-PENDING !== 'DONE'`, so a wave whose precond is a still-PAINT-PENDING `[P]` wave is NOT ready — it stalls until the out-of-band paint workflow catches up.** The intent ("done-building") and the gate ("DONE only") contradict, and there is NO code path that treats PAINT-PENDING as satisfying a precond. This is not hypothetical — it is **LIVE on the current cursor**:

- `3.1 CARTOON-INK-GAMUT` + `3.6 GLASS-BLUR-PEER` are **PAINT-PENDING right now.**
- `3.6` is the named precond of `BG.W-DOCK-MORPH-UNIFY` (`4.1`, *"Precond: WS3 blur peer"*) — so **the entire WS2 dock convergence (11 waves) cannot build until `3.6`'s paint verdict lands**, and `3.6`'s paint rides W-REFLECT3 (very late). The build engine never triggers `bg-paint.wf.js`; nothing flips `3.6`→DONE in the build loop.
- `allDone(WS3)` is FALSE while `3.1`/`3.6` sit PAINT-PENDING → `BH.B5a-deps-currency` (`9.1`, *"after allDone(WS3)"*) never fires.
- The same pattern fans out to **every** BH interleave gate: BH[WS2] (`5.x`), BH[WS5] (`7.x`), BH[WS4] (`11.x`) each require `allDone(WSn)` — a single PAINT-PENDING `[P]` wave in that WS blocks the whole interleave band. WS5 has **seven `[P]` waves**; WS2 has six.

**This is the cardinal headless/paint-decoupling disease re-expressed as a DAG deadlock.** The plan must either (a) wire `bg-paint.wf.js` to run interleaved and flip `[P]`→DONE in lockstep with the build frontier, or (b) make `ready`/`allDone`/`cutReady` treat PAINT-PENDING as DONE-for-build-ordering (cut still requires real DONE). Neither is wired today. The prior run rated this "structural"; on the LIVE cursor it is an active stall on WS2 + BH[WS3].

---

## 5. MEDIUM — `liquid-morph.css` (850L) is DOUBLE-OWNED by two waves in different phases

Two waves both claim the WHOLE-file rehome of `src/styles/glass/liquid-morph.css` (850L on disk, verified):
- `3.11 BG.W-DEMO-STYLE-REHOME` (WS3, *"SEQUENCE LAST"*) — *"WHOLE-rehome `glass/liquid-morph.css` (850L) to `demo/`."*
- `12.1 BG.W-SPIKE-DELETE` (WS7) — *"… `liquid-morph.css` (850L) demo-rehome."*

WS3 (`3.x`) runs **before** WS7 (`12.x`). If `3.11` rehomes the file, `12.1`'s rehome is a stale no-op (the file is already under `demo/`); if the LOADER gives both the same `files:[liquid-morph.css]` write-set, `composeBatch`'s file-disjoint guard (`:111`) prevents them from co-batching but does NOT detect the redundant cross-phase ownership. Compounding: `3.5 BG.W-GLASS-TINT-UNIFY` edits `liquid-morph.css:104` (the M5a substitution) — so the file is touched by `3.5` (edit) → `3.11` (move) → `12.1` (move again). **One owner must be picked** (almost certainly `3.11`, since it is the WS3-local rehome and `12.1` is a no-legacy cut whose rehome line is a leftover from before the WS3 wave was added). The prior run flagged this PLAUSIBLE; this pass CONFIRMS both rows name it.

---

## 6. MEDIUM — the WS5 "ONE atomic gate edit" (`6.3`+`6.7`) is UNENFORCEABLE under the file-disjoint batcher

build-map WS5 header (`:265`): *"Wave 7 co-edits `proof-gpu-substrate-single.mjs:177-181` with Wave 3 — land as ONE atomic gate edit."* And `6.7`'s spec: *"`proof:gpu-substrate-single` co-revert **atomic** with DEMIGRATE (#3)."* But:
- `composeBatch` is **file-disjoint** (`:111`): if both `6.3` and `6.7` list `proof-gpu-substrate-single.mjs` in their write-set, the second is dropped from the batch → they land in **separate commits**, NOT atomically.
- The integrator commits one-per-wave (`:186`) and re-runs each wave's gate on the integrated tree (`:187` step 3). Between the `6.3` and `6.7` commits, `proof:gpu-substrate-single` would be **half-edited** → it can RED on `6.3`'s commit (the co-revert hasn't landed), failing the integrator's own gate-re-run and reverting `6.3`.

**The "atomic" requirement collides with the engine's batching model.** Resolution: either `6.7` must list `6.3` as a precond AND the gate edit must be authored so `6.3` alone leaves `proof:gpu-substrate-single` green (no transient red), or the two waves must be MERGED into one wave that owns the single gate edit. As specced ("atomic") it cannot be honored by this engine. Both are `[P]` too, so they compound §4's stall onto WS4's `AFTER WS5` carves (`10.12`, `10.18`).

---

## 7. LOW–MEDIUM — acknowledged backward edges (the WS-phase headers are NOT the fire order)

These are real cross-phase edges that work via preconds but contradict the "WS = a contiguous build phase" reading:

- **WS2 `4.3 DOCK-CUT` depends on WS6 (phase 8).** *"delete `useDockContextSilhouette` AFTER WS6 confirms unwanted (R7) · Precond: WS6 coordination."* `4.3` sits in WS2 (phase 4) but cannot close until a WS6 node is DONE — it fires in/after phase 8. Not a cycle (WS6 SIRI does not depend on `4.3`). The "WS2 11-wave order" prose implies `4.3` lands within WS2; it can't. **MEDIUM.**
- **WS7 `12.8 SAFARI-PARITY-GATE` depends on WS8 `13.2` (phase 13).** The gate is homed in the WS7 close machine but closes after WS8 — same "homed-for-organizational-clarity" pattern as G4, but here the precond IS in the prose, so it's safe. **LOW–MEDIUM** (confirms WS-phase headers ≠ fire order).
- **`BH.B4f` (rm CLAUDE.md) is NOT gated on `BG.W-CUT`.** Engine `:137` requires B4f's preconds to include *"every WS12 wave id + B5c + B2.6 + B4e + B4b-content"* — **`BG.W-CUT` is absent.** The "rm is the absolute-last act AFTER the tag" guarantee rests on `interleaveClass==='WS12-LAST'` → `interleaveReady` returns `false` **unconditionally** (`:93`, so B4f never auto-fires) + `cutReady` (`:243`) + the user gate. The comment at `:93` promises *"released only by the explicit precond gate below"* — **there is no such gate; B4f is intentionally human-only.** Safe by the manual-gate design, but the ordering is NOT encoded as a `CUT→B4f` edge, and the comment is misleading. **LOW** (record so a future refactor that makes WS12-LAST auto-fire doesn't delete CLAUDE.md pre-tag).

---

## 8. THE 7 GAP-WAVE POSITIONS — 6/7 CORRECT, only G4 wrong (verified each)

| Gap | wave(s) | declared position | verified? |
|---|---|---|---|
| **G4** | `12.0 CLOSEFIX-9SITE` | FIRST (pre-WS1) | **✗ — mis-seq'd 12.0, precond-unbound, already violated (§2/§3)** |
| **G2** | `12.4a GESTALT-CURSOR-PARITY` | WS7, precond STAGE-0 roster + WS1 routeSeeds | ✓ (STAGE-0 + WS1 DONE) |
| **G3** | `12.4b CLOSE-SWEEP` | WS7, precond `12.0` (HARD P-CLOSE→P-SWEEP) | ✓ ordered AFTER G4 — correctly blocked while G4 PENDING |
| **G6** | `12.5 GATE-FIELD-AURORA` + `3.12 EYEBROW-LIGHT-POLISH` | WS7 + WS3 Phase 3; `12.5`'s EYEBROW resolvedBy=`3.12` | ✓ WS3(`3.12`) precedes WS7(`12.5`) |
| **G1** | `13.2`/`13.3` (WS8) + `12.8` (WS7) | WS8 build + WS7 gate (precond `13.2`) | ✓ (backward edge §7, precond-bound) |
| **G7** | `6.3`/`6.7` (WS5) + `18.11` (BH-B7) | WS5 clause + BH[WS12] roster | ✓ |
| **G5** | `18.10 B5c` + `19.2 B4f` | BH[WS12] tail; rm is absolute-last | ✓ (caveat §7: B4f not gated on CUT) |

**Only G4's position is wrong.** G2/G3/G6/G1/G7/G5 are coherently ordered — G3's precond on `12.0` is itself the strongest internal evidence the planners KNEW G4 must precede the sweep, which makes G4's own missing back-binding to WS1/WS3 the anomaly.

---

## 9. FORWARD-REFERENCE SWEEP — one inversion (§3); the delete/absent chains are otherwise coherent

Checked every "DEFINITION-ABSENT"/delete/rename wave against earlier referencers:
- **`--glass-blur-dock`** — G4 retires (declared first) but `3.6` already removed the dock consumer (declared later, ran first) → **INVERSION (§3, HIGH).**
- **`useVizChoreography`** — `6.4` (WS5) makes it DEFINITION-ABSENT; `10.5` (WS4, precond *"useVizChoreography WS5-first"*) asserts absent. WS5(phase 6) < WS4(phase 10). `BH.B1 W3` (`1.4`, DONE) already cleared its stale comments. **Coherent.**
- **`useDockContextSilhouette`** — `4.3` (WS2) deletes (precond WS6→effective phase ~8); `10.5` (WS4, phase 10) asserts absent. 8 < 10 — coherent but tight; `4.3` deletes, `10.5` verifies (coordinated, not conflicting). **Coherent.**
- **`liquid-enter.css`** — `2.1` (DONE) edits it + deletes the dead `.scroll-build` recipe; `3.11` notes its delete is *"BLOCKED (live @import)"*; `10.10` (WS4) WIREs it live onto mount surfaces. `3.11` (phase 3) keeps it (delete blocked), `10.10` (phase 10) makes it more live — no break, a permanent "kept" acknowledgment. **Coherent (LOW note).**
- **`useGlassBackdropLuminance.ts`** — `2.4` (DONE, exports warm-projection + SHELL_FIELD_CANVAS_SELECTOR) → `3.5` (`:448` edit, *"the SAME fn WS1 rewires — ONE coordinated WS1+WS3 diff"*) → `10.13` (WS4 carve, *"after WS3-M5 rewire"*). The `2.4→3.5→10.13` order is in the prose and phase-consistent. **Coherent**, but `3.5` inherits the §4 stall risk if its precond resolves to a PAINT-PENDING `[P]` row.

No NEW forward-reference break beyond the G4/`--glass-blur-dock` inversion.

---

## 10. POSITIVELY VERIFIED (the plan is right here)

- **Acyclic** across all 12 WS + BH tail (§0).
- **seq is consistent with the declared build order for ALL waves except G4** (§1) — the ordinal scheme itself is sound.
- **No duplicate seq ordinals; every wave appears once.**
- **The G2 fence-widen is real + necessary + still PENDING.** `bg-paint.wf.js:22` FENCE admits ONLY `EXECUTION-PROGRESS.md` + `docs/tranches/BG/audit/visual/` — it does NOT admit `audit/reflect/`, which G2's keystone must write. The planned widen is genuine.
- **The live-fix DONE rows (LX.1–3 / D-1/D-2/D-3)** are real commits (`07c6e6ec`/`e40e5095`/`8947288a`), git-confirmed, genuinely outside the wave DAG (direct-to-branch) — consistent with the seed.
- **G3's precond-on-G4 edge** is in the prose (the only gap-wave back-binding that is correctly encoded).

---

## 11. VERDICT

The DAG is **acyclic and mostly coherent in its declared edges**, but it is **not statically enforced** — it is re-derived each boot by an LLM from prose, with `seq` as the only tiebreaker, so its correctness is the correctness of the prose preconds (the seed's own "hand-authored maps that drift" class applies to the DAG itself). Findings, by severity:

- **HIGH — G4 `BG.W-CLOSEFIX-9SITE`** (§2): declared "LANDS FIRST" but seq-ordered LAST, precond-unbound on its WS1/WS3 successors, and **already violated in committed history** (WS1 + partial-WS3 landed, G4 never ran). The "encoded in the DAG" note is false. Fix: encode G4 as an explicit precond of every `ladder.css`/`shell.css`-touching WS3 wave, or re-seq to `0.7`.
- **HIGH — G4 spec staleness** (§3): `3.6` pre-empted G4's `--dock-surface-blur` deliverable (forward-reference inversion); G4's "9-site / byte-identical-to-HEAD" atomic-diff spec is stale against the moved frontier and owes a re-derivation.
- **HIGH — PAINT-PENDING≠DONE systemic stall** (§4, currently LIVE): `ready`/`allDone`/`cutReady` all check literal `'DONE'`; PAINT-PENDING preconds stall their build-successors. `3.1`/`3.6` PAINT-PENDING **right now** block all of WS2 (via `4.1`) + BH[WS3] (via `allDone(WS3)`). Wire `bg-paint.wf.js` interleaved OR treat PAINT-PENDING as DONE-for-build-ordering.
- **MEDIUM — `liquid-morph.css` double-ownership** (§5): `3.11` and `12.1` both claim the 850L whole-file rehome; pick one owner.
- **MEDIUM — WS5 `6.3`+`6.7` "atomic gate edit"** (§6): unenforceable under the file-disjoint batcher; merge the waves or precond-sequence with a no-transient-red gate authoring.
- **LOW–MEDIUM — acknowledged backward edges** (§7): WS2 `4.3`→WS6, WS7 `12.8`→WS8, and B4f's "after-the-tag" rests on code-shape (`WS12-LAST` returns false) + the user gate, NOT an encoded `CUT→B4f` edge (misleading `:93` comment).

None breaks acyclicity. The dominant, executable fix is **binding G4's ordering as a precond** + **resolving the PAINT-PENDING≠DONE contradiction** (the two HIGH items the amended plan must encode before a resumed execution repeats the realized G4 violation and stalls WS2 on `3.6`'s decoupled paint).

---

### OPEN ITEMS FOR PASS 2 (cross-read with the other lenses)

- **Gate-composition lens:** does `proof:close-sweep` (G3, `12.4b`) actually red while G4 (`12.0`) is PENDING, and will the integrator's per-wave gate-re-run (`:187`) catch the §6 transient `proof:gpu-substrate-single` red?
- **BH-interleave lens:** confirm the LOADER encodes `allDone(WSn)` correctly when a WS holds PAINT-PENDING `[P]` waves (§4) — the BH interleave bands may all be silently un-fireable on the live cursor.
- **Whether the DAG-LOADER reliably parses "WS6 coordination" / "after WS5" prose into the correct SPECIFIC wave-id preconds** (the §0 meta-risk) — verify against a sample LOADER run if one exists in the run-log.
- **Re-derivation owed for G4** against the current frontier (§3) — the page-wave-coverage lens should confirm which of G4's 9 sites `3.6` already neutralized.
