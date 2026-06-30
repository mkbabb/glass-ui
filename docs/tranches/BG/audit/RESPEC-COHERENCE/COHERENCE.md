# BG RE-SPEC COHERENCE — LIVING MASTER

**Status:** PASS 3 RESOLVED + critiqued + DEVELOPED (fold-ready) · **Updated:** 2026-06-30 · **Branch:** `tranche/BG`
**HEAD:** `31b128aa` (the master ran PASS 1/2 at `6c1f5386`; the PASS-3 spec resolves at `6c1f5386`/`998136bb`, the tree moved +N — the develop pass re-verified every load-bearing anchor at HEAD)
**Overall convergence:** **84%** (critique-weighted) · **readyToDevelop:** **YES** → the developed plan is `AMENDED-COHERENCE-PLAN.md`
**Owns:** the friction taxonomy + repeat-risk verdicts · every coherence issue (the `pass-1-spec.md §2.X` set) +
resolution status · the page-coverage delta · the re-verified DAG / gate / interleave / consumer tables.

This file is the durable index. The narrative lives in `pass-1-synthesis.md` / `pass-2-synthesis.md`; the per-cluster
PASS-3 corrected specs live in `pass-3-proto-PT-1.md` (G1, worktree) / `pass-3-resolve-G2-token-spine-sourcing.md`
(worktree) / `pass-3-resolve-{G3,G4,G6,G7}.md` / the G5 worktree build-map; **the DEVELOPED fold-ready plan is
`AMENDED-COHERENCE-PLAN.md`** (the exact build-map/cursor/gate edits per cluster, critique mustResolve folded in place).

> **Re-anchor note.** PASS 1 used a C1–C14 numbering at `4c761b64`. PASS 1-re-anchor adopted the `pass-1-spec.md §2.X`
> numbering (8 HIGH / 16 MED / 15 LOW @ `6c1f5386`). PASS 2 ran the 6-PT proto/crit + the G-5/6/7 direct-edits to
> ~68% feasibility-confirmed. **PASS 3 resolved all 7 clusters (G1-G7), critiqued each, and DEVELOPED the fold-ready
> plan — every critique mustResolve item folded in place (incl. the 2 BLOCKING/recursion findings: G2's C6-regression,
> G7's A10-mistarget).** The develop pass re-verified the load-bearing anchors at HEAD `31b128aa`.

---

## 0. CONVERGENCE LEDGER (per pass)

| Pass | HEAD | Conv | What moved |
|---|---|---|---|
| 1 (research → `pass-1-spec.md`) @ 4c761b64 | 4c761b64 | 58% | 20 friction classes, 14 coherence issues, HIGH claims vs `src/` |
| 1 (proto/crit → prior master) @ 4c761b64 | 4c761b64 | 66% | 6 resolutions feasibility-confirmed + critiqued |
| 1 (re-anchored research → `pass-1-spec.md`) | 6c1f5386 | 64% | re-verified @ moved tree; 39 issues (8H/16M/15L); §2.X numbering |
| 1 (re-anchored proto/crit) | 6c1f5386 | 68% | 6 re-run at new baseline; 2 over-stated headlines corrected; PT-6 re-grounded; PT-2 G8 re-green PROVEN |
| 2 (synthesis + G-5/6/7 direct-edits) | 6c1f5386 | 68% | the lower-severity buckets routed; the decoupled-paint adjudication; the cluster set formed (G1-G7) |
| **3 (resolve + critique → 7 clusters)** | **6c1f5386 / 998136bb** | **84%** | all 7 clusters resolved + critiqued; the 2 BLOCKING/recursion findings surfaced |
| **3 (DEVELOP → `AMENDED-COHERENCE-PLAN.md`)** | **31b128aa** | **84%** | every critique mustResolve FOLDED in place; exact build-map/cursor/gate edits per cluster; fold-ready |

**readyToDevelop is TRUE** — conv 84% (critique-weighted), every HIGH coherence issue (§2.A1/A2/D1/D2/D3/G1/G2/T2/T4/I1)
RESOLVED or explicitly accepted-residual with a named owner (`AMENDED-COHERENCE-PLAN.md §10`). The first-audit bar
(RESPEC/AMENDED-WAVE-PLAN.md closed develop-ready at 86% with named build-phase deferrals) is met.

---

## 1. COHERENCE ISSUES — status board (the §2.X set)

`Cluster` = the PASS-3 resolving cluster (G1-G7). `Conv` = the critique's number. **All RESOLVED + DEVELOPED** — the
exact fold edits are in `AMENDED-COHERENCE-PLAN.md` (the §-references below point to its cluster sections).

### HIGH (10) — all RESOLVED, critique mustResolve folded into the developed plan

| # | Issue (one line) | Cluster | Conv | Status (PASS-3 LOCKED) |
|---|---|---|---|---|
| **§2.A1** | decoupled-paint engine re-creates the cured BB terminal-reflect chokepoint | G1 | 82% | LOCKED keep-decoupled-with-guards; the FAIL-PAINT→FIX-AGENT→re-judge recovery DEFINED (the missing guard); plan §2 |
| **§2.A2** | `bg-paint.wf.js` session-limit null-crash (Class Q, LIVE) | G3/G1 | 90% | the 4 null-guards specified; co-applied at execution (G1 MR-3 + G3 §4); plan §2.2/§4.3 |
| **§2.D1** | G4 mis-positioned: declared LANDS-FIRST, seq-LAST | G1 | 82% | re-seq 12.0→0.7 + precond edges on all 3 derivation sources (loader-prompt carve-edge closes O4); plan §2.3 |
| **§2.D2** | WS3 3.6 shipped G4's `--dock-surface-blur` | G1 | 82% | REFRAME LOCKED: 3.6 is G4's PREREQUISITE; precond `[STAGE-0, BG.W-GLASS-BLUR-PEER]`; plan §2.1 |
| **§2.D3** | PAINT-PENDING ≠ DONE build-ordering | G1 | 82% | `doneBuilding` widen + cutReady split; the paint-FAIL recovery is ONE terminating mechanism; plan §2.1 |
| **§2.G1** | `proof:ba-gestalt` G8 forbids "rides W-REFLECT3" (2 live) | G1 | 82% | re-home both G8a hits + their build-map twins; **MR-1 folds the D-G4-table row contradiction** (plan §2.2) |
| **§2.G2** | WS8 `.glass-lens` retire breaks surviving gates; 4 of 24 named | G3 | 90% | full 28-file fan-out + 3 hard breaks + the TYPED `REFRACTION_READERS` roster route; plan §4 |
| **§2.T2** | C-SAFARI dual-stack drift; WGSL unfenced | G2 | 76% | re-anchored onto `glassShader-tier2.wgsl`; `CHROMATIC_SCALE=0.0045` + `--glass-chromatic-strength`; plan §3 |
| **§2.T4** | `--glass-key-*` dual source + WS8←WS9 DAG inversion | G2 | 76% | KEEP-BOTH bound by §0E-1 shared-sourcing + DAG-edge strike; **MR-1 BLOCKING: re-ground M7 onto C6** (plan §3.2) |
| **§2.I1** | G3 canon-home `BG/canon/` split from realized `docs/canon/` | G6 | 79% | home at `docs/canon/build-and-gates.md` + the G3→B4b APPEND-not-clobber edge; plan §7 |

### MEDIUM (16) — all RESOLVED into G2/G4/G5/G6/G7

| # | Issue (one line) | Cluster | Conv | Status (PASS-3 LOCKED) |
|---|---|---|---|---|
| **§2.C1** | kf peer `^5.0.0` vs the shipped 5.1.0 `DragOptions.snap` | G4 | 88% | LIVE defect; bump `^5.0.0→^5.1.0` re-homed onto `BH-B2.1-swap` + floor-vs-API gate-hardening; plan §5 |
| **§2.C2** | BH B1-W2 value `^1.2.0` vs audit `^1.1.1` | G4 | n/a | **MOOT/DROPPED** — executed `^1.0.0` GREEN, `wcagContrastRatio` zero callers; recorded closed (plan §5) |
| **§2.T1** | dead-knob discipline absent for the new `@property` set | G2 | 76% | the F substitution-trap note (F plain-custom, no de-reg risk); folded into G2 WS9 §0; plan §3 |
| **§2.T3** | GLASS-TINT-UNIFY rename names 2 of 5 carriers | G2 | 76% | absorbed by the §0E-1 shared-sourcing spine (the carriers re-derive from one spine); plan §3 |
| **§2.T5** | D-2 demo-warm grain double-warms under WS9 GRAIN-REAL | G5 | 90% | WS9 owns the D-2 hand-off (retire-or-keep + warm-hue floor + named ba-gestalt paper-band verdict); plan §6 |
| **§2.T6** | D-3 `--dock-expand-t` read in WS2 rewrites; gate blind | G5 | 90% | `proof:dock-engine` (E4 IS the protector) added to WS2 gate set; plan §6 |
| **§2.T7** | D-1 constellation parallax-default in a WS5-rewritten file | G5 | 90% | WS5 note + `DEFAULT_PARALLAX===0` on `proof:constellation-gen` + **a born-RED clause (MR-1)**; plan §6 |
| **§2.P1** | liquid-morph.css whole-file rehome double-owned (3.11 vs 12.1) | G7 | 85% | 12.1 `BG.W-SPIKE-DELETE` owns the move; 3.11 keeps the in-place token close; precond 3.11<12.1; plan §8 |
| **§2.P3** | WS5 6.3+6.7 "ONE atomic gate edit" transient-RED | G7 | 85% | REFINE: gate edit ENTIRELY into 6.7, precond named explicitly (MR-4); plan §8 |
| **§2.P5** | goo-morph worm carve undefined-props near-miss | G7 | 85% | carve DONE+repaired; `proof:colocation` WORM-BINDING assert + paint un-defer to WS11; plan §8 |
| **§2.L1** | no dedicated reka/kf binding-verification sweep | G7 | 85% | MINT `proof:binding-sweep` wired into the bump wave + DESHADCN + the cut; plan §8 |
| **§2.G3** | `proof:glass-idiom-factor` MISSING from emitted ci.yml | G4 | 88% | intra-wave ORDERING FLIP (R4-before-R3) so emit adds both gates in one pass; plan §5 |
| **§2.M1** | ladder/shell carve→WS9-grain re-point; no post-WS9 re-carve owner | G7 | 85% | GLASS-vs-PAPER grain DISJOINT; WS9 *Files* re-point (MR-5) + WS12-CENSUS re-carve owner; plan §8 |
| **§2.M2** | 5 phantom dock owner-waves (incl. ★★ dock-gallery) | G7 | 85% | 5 FOLD / 3 DEFER + the ★★ A10 clause **SPLIT (MR-1: dock-gallery has 0 GlassDock, liquid-playground owns it)**; plan §8 |
| **§2.G4** | 3 stale AZ freshness hashes red gate-manifest-sound | G4 | 88% | RETIRED-SUPERSEDED banner gated AFTER WS2∧WS5 + **the mechanical resolve-check rule (MR-1/MR-2)**; plan §5 |
| **§2.U1** | bbnf-buddy `--glass-blur-dock` external override silent no-op | G7 | 85% | B7 migration row + `proof:retired-token-consumers` **re-architected CI-safe (MR-2)**; plan §8 |

### LOW (15) — §2.L2-L16 (+ §2.M4 absorbed into PT-5)

`§2.M4` (the `--glass-edge-dispersion` box-shadow→float-uniform type collision) is folded into PT-5 (74%) — mint the
scalar `--glass-chromatic-strength` separate from the Tier-0 box-shadow. `§2.L2` HEAD-numeral drift · `§2.L3`
foreign-tree deny-belt gitignored · `§2.L4` B4f not gated on W-CUT (safe by WS12-LAST + user gate) · `§2.L5` AppShell
double-edit WS1↔WS2 · `§2.L6` D-G2 conflation · `§2.L7` PaletteLayer.vue dead file · `§2.L8` 106/120 pages
late-local-only paint · `§2.L9` WS3 squircle-strengthen then WS8 retire · `§2.L10` BH B7 frozen symbol/key count vs
SiriIsland · `§2.L11` speedtest `.glass-refract` 4.1.0-stale binding · `§2.L12` `.githooks/commit-msg` shared writer ·
`§2.L13` B4f grep scope ≠ B5c · `§2.L14` `proof:claude-deletable` absent from B4f · `§2.L15` budget net-lift-as-one-number
(PT-6, CONFIRMED — BUDGETS walks 6, siri/refract absent) · `§2.L16` contrast-color() doc omits Firefox 146.

**HIGH-severity still-open (all 10):** §2.A1, A2, D1, D2, D3, G1, G2, T2, T4, I1. None is a feasibility blocker.

---

## 2. FRICTION TAXONOMY — repeat-risk verdict (A–U)

| Class | Name | Recurs | Verdict + live BG vector @ 6c1f5386 |
|---|---|---|---|
| A | headless-green over visually-broken (cardinal) | yes | CURED generally (ba-gestalt reads pixels, tag coupled 0/10); LIVE residual = C-SAFARI ★★★ + the decoupled-paint chokepoint (§2.A1) |
| B | orphaned-wave-claim | yes | `proof:no-orphaned-wave-claim` landed; live = HEAD numeral drift `6369ad6e`≠`6c1f5386` (§2.L2) |
| C | clean-break rename misses a consumer | yes | **MOD-HIGH**; delete-dense; TINT-UNIFY names 2/5 (§2.T3), WS8 `.glass-lens` names 3/24 (§2.G2) |
| D | budget-rebaseline ratchet | yes | MOD; WS8 refract + WS6 siri ADD, WS5 re-pins DOWN; net-lift un-tracked-as-one-number (§2.L15) |
| E | ci.yml↔manifest drift | **no** | `--emit-ci` codegen makes drift impossible-not-detected; symptom = `glass-idiom-factor` un-emit R3 clears (§2.G3) |
| F | BOOK/ARCHIVE re-label | **no** | disposition-live + NDA-DECIDE + DISPOSITION-RESTAMP + Band-0 ledger; well-defended |
| G | structural / god-module | yes | R1/R2 LIVE (ladder 527, shell 510); carve→re-grow chain no post-WS9 owner (§2.M1) |
| H | close-never-runs / provenance | **no** | most-hardened; `--run full` siblings-absent + ship-attestation; residual reaches it via the Class-A paint chokepoint |
| I | user-directive contradicts spec | yes | MOD; 12-LAWS routes the broad liquid-weight directive to ONE wave; goo-morph worm owner RESOLVED, near-miss carve (§2.P5) |
| J | capability-without-adoption (overfit) | yes | MOD; SIRI-ISLAND/-WAVEFORM, GLASS-REFRACT-WEBGL, useDockSpring, useFlip; ≥2 bar must be PRODUCTION |
| K | substitution-vs-inheritance / dead-knob | yes | **MOD-HIGH (biggest glass-specific)**; `--dock-surface-blur`=the `--glass-bg-dock` AZ shape; no single gate (§2.T1) |
| L | reka/kf binding silent no-op | yes | **MOD-HIGH**; kf 5.1.0 + value bumps + heavy reka re-wires; no bump-sweep gate; PLUS the kf-peer↔snap crossover (§2.C1) |
| M | live-π oklab paint-arm | **no** | reflect-capture-verify parses oklab; G6 chroma-sensitive; re-opens only on an L-only regression |
| N | light-dark / hsl / scoped-:global / :slotted | yes | MOD; WS8 glass-deep dark + WS9 paper light-dark; SFC-CSS WS4/9/11 scoped `:global()` drop risk; dual-engine paint catches |
| P | rate wall (parallel>3→429) | **no** | CLEAN — all workflows batch ≤3 build / ≤2 paint |
| Q | session-limit null-crash | yes | **HIGH (LIVE)**; bg-paint.wf.js 4 un-guarded `agent(`, 0 `.catch` (§2.A2) — the longest workflow is the un-hardened one |
| R | foreign-tree catastrophe | yes | LOW-MOD; prose fence + tracked `verify-siblings-intact.mjs` DURABLE; gitignored literal-narrow deny-belt lose-able |
| S | dependency-floor miscalc | **no** | registry-CONFIRMED (kf 5.1.0, value 1.1.1, peers admit latest); live crossover = the kf-peer bump OWNER re-home (§2.C1), not a floor miscalc |
| T | submodule canon-home | split | `docs/precepts` IS a submodule; G3/G5 moved OUT; G3 homed `BG/canon/` ≠ realized `docs/canon/` (§2.I1) |
| U | wrong-uniform / wrong-anchor | yes | **MOD-HIGH**; fence keyed `uChromatic` (converge-only); ship op = `chromatic_aberration @ 0.003` (§2.T2); the class G1 claimed FIXED, recurring one level up |

**Concentration:** (1) the decoupled-paint engine (cadence + FAIL-recovery + null-guards), (2) the glass-ui-specific
token/binding traps (C/K/L/U on WS3/6/8/9), (3) C-SAFARI on-device-Metal.

---

## 3. RE-VERIFIED TABLES

### 3a. DAG (wave-ordering) — structural facts

- **No static machine-checkable DAG.** `bg-bh-execute.wf.js:134` spawns a **DAG-LOADER agent** that INFERS
  `preconds[]` per wave from the PROSE of build-map + interleave-map + EXEC-PROGRESS. Correctness = the loader's
  prose-parse fidelity. `ready(w)` = `PENDING ∧ preconds.every(DONE) ∧ interleaveReady`; `interleaveReady` returns
  `true` unconditionally for every BG wave → order is enforced ENTIRELY by preconds; `seq` is only the `composeBatch`
  tiebreaker (prefer-lower), derived from STRUCTURAL map position (not the EXEC-PROGRESS cell).
- **Acyclic** — verified (no cycles across 12 WS + BH tail).
- **§2.D1/D2/D3 (PT-1, conv 70%):** G4 declared "LANDS FIRST" but homed `seq 12.0`, named as a precond by ZERO
  WS1/WS3 wave. **REFRAME (verified):** WS3 3.6 (cd9ce46) is G4's PREREQUISITE — `shell.css:29` reads
  `--dock-surface-blur: var(--glass-blur-resting)`, ORPHANING the `--glass-blur-dock` chain G4 retires. So G4 lands
  AFTER 3.6, BEFORE 3.5/WS6/WS9. The "before WS1" prose is over-broad (WS1 file-disjoint + landed). The disk state is
  CONSISTENT under the corrected ordering (G4 just not-yet-run), NOT "already violated."
- **PAINT-PENDING ≠ DONE (§2.D3):** `allDone`(L87) / `ready`(L100) / `cutReady`(L241-247) test literal `=== 'DONE'`
  while the loader prose treats PAINT-PENDING as done-building. Fix = `doneBuilding(w)={DONE,PAINT-PENDING}` widen +
  split `cutReady` into buildComplete ∧ paintComplete. **NOT deadlocked NOW** (44 DONE; no wave preconds on the [P]
  set) — but Part A3 is a PREREQUISITE for Part B's new `G4→3.6(PAINT-PENDING)` edge (would deadlock under old code).
- **Paint-FAIL recovery UNDEFINED (PT-1 O1, the dominant open):** bg-bh-execute's in-cycle fix loop is DEAD
  (`paintWaves=[]`, L205-233 unreachable); bg-paint leaves FAILs PAINT-PENDING; engine-design.md documents a live
  fixLoop → infinite build-complete↔run-bg-paint ping-pong on any FAIL. A5's terminal log needs an explicit FAIL branch.

### 3b. PAGE↔WAVE COVERAGE

- **Corpus = 120 routed pages** (`s()` in `manifest.ts`); real Δ vs BD PASS-E = **+2** (`dock/dock-gallery`,
  `dock/liquid-playground`), both WS2-covered, no renames.
- **Zero strict orphans** — WS12 `BG.W-PAGE-COMPONENT-AUDIT` is a manifest-DERIVED 480-capture (120×2 engines×2 modes).
- **Two-tier enforcement:** 14 roster-pinned pages carry a ci/release ba-gestalt verdict; **106 pages rely ONLY on
  the `local`-tagged WS12 late sweep** (the headless-green/visually-broken exposure for ~88% of pages — §2.L8).
- **WS12 disambiguation owed (PT-2 H3):** the 480-capture is a POST-INTEGRATION audit (precond WS1–WS11 ALL LANDED) —
  must be declared a final whole-congruence audit ON TOP of per-wave paint, NOT a roster-paint backlog-drain (the BB
  disease). D-G2 "WS12 = 10 roster surfaces" conflates two instruments (§2.L6).
- **5 phantom dock owner-waves (§2.M2)** incl. the ★★ dock-gallery directive — the project's own all-prompts matrix
  cannot be trusted as a coverage source.
- **Carve conflicts (§2.M1):** `ladder.css` (527L) edited by 4 waves; LAST is WS9 GRAIN-REAL whose *Files* names the
  PRE-carve `ladder.css`/`shell.css` (G4 carves grain OUT to `grain-overlay.css`/`shell-regions.css`) → no post-WS9
  re-carve owner.

### 3c. GATE COMPOSITION

- **`proof:ba-gestalt`** `[local,ci,release]`, born-RED (0/10 roster), the keystone tag-enabler. G8 scans recursive
  `BG/waves/*.md`(absent) + `**/PROGRESS*.md`; **2 live G8a DEFERRAL HITS** (`EXECUTION-PROGRESS.md:38,113`); self-test
  16 checks OK. Live verdict: 2 hits + operative born-RED (0 PASS / 10 FAIL, expected). PT-2 PROVES the re-home flips
  the G8a arm GREEN (the operative born-RED is separate, flips only on a non-authoring re-capture).
- **`proof:glass-idiom-factor` (§2.G3):** in `gates.mjs` (2 refs, ci-tagged @1503), **0** in `.github/workflows/ci.yml`
  → `proof:gen-ci-fresh` reds `--run release/full`; CLOSEFIX-9SITE R3 re-emits it. build-map:451 OVER-claims R3 also
  adds `proof:category-card-warm` (it's `[local]`-tagged, cannot be emitted to the ci set).
- **`proof:button-glass`** `[local,ci,release]` + **`proof:visual-reconcile`** `[local,ci]` — both read Button.vue
  source for `.glass-lens`/`glass-refract`, both RED on the naive WS8.4 delete, both ABSENT from the build-map (§2.G2).
- **`proof:gate-manifest-sound` FRESHNESS arm (§2.G4):** 3 stale AZ hashes (W-DOCK1/W-DOCK2/W-CON1) recompute stale;
  gate `[local]` exit 1 → reds `--run full` (the cut battery). Discharge = the RETIRED-SUPERSEDED banner (WS2 redesigns
  the dock, WS5 rewrites constellation → the AZ surfaces are superseded), gated AFTER WS2∧WS5.

### 3d. BG↔BH INTERLEAVE

- BG+BH cut **jointly as 5.0.0** (BH B4f hard-deletes CLAUDE.md, no replacement, absolute-last act).
- **§2.I1 canon split:** G3 homed `docs/tranches/BG/canon/` vs realized `docs/canon/` + `canon-doc.mjs`. Reconcile +
  register the `G3(WS7)→B4b-content(WS12)` shared-write edge.
- **B1-W2 + B1-W3 ALREADY in HEAD** (`0d6b9f8a` destraddle, `ba23c086` snap-excise) — re-grounds §2.C1/C2:
  - §2.C1 — the kf peer is still `^5.0.0` and `useDragMorph.ts:26` owns NO retarget re-roll → on a kf-5.0.0 consumer
    the drag NEVER snaps to a detent (a LIVE broken-gesture defect). The bump must re-home onto an UNRUN wave (B1-W2
    is closed).
  - §2.C2 — the executed value peer is `^1.0.0` (NOT `^1.2.0`); peer-conformance GREEN; `wcagContrastRatio` zero
    in-tree callers → the `^1.1.1` floor is MOOT/unjustified.
- **§2.L12/L13/L14:** `.githooks/commit-msg` shared B0→G3 writer (G3 EXTENDS, doesn't clobber); B4f grep scope ≠ B5c
  hard-reader cleanup; `proof:claude-deletable` absent from both B4f wave specs.

### 3e. CONSUMER CONSTELLATION (read-only sibling sweep)

- **bbnf-buddy** `preset.css:230` overrides `--glass-blur-dock` (blur(22px) saturate(1.6)) — a DELIBERATE live
  dock-cartoon override. G4's "0 orphan readers" is glass-ui-INTERNAL only → an asymmetric silent partial no-op (3 of
  4 bbnf dock tokens survive; blur reverts 22px→8px). Owed a by-name B7 migration ask (foreign-tree fence: record,
  NEVER edit bbnf) + an exact-name deep-grep (§2.U1).
- **speedtest** `CompleteBadge.vue:16` `.glass-refract` is a 4.1.0-stale no-op (renamed `.glass-lens` at BB); G1
  `BG.W-GLASS-SOTA-LADDER` finalizes by deleting `glass-refract.css` → omitted from the roster (§2.L11).
- **No standing retired-token × sibling-grep gate** — make the inv-11 probe real for TOKENS, not just exports.
- **Method:** sibling-greps MUST use arrays + `--exclude-dir` for consumer `dist`/`test-results`/`trace` (nearly
  produced a false-clean). Verify every "owner wave" against `git log` (two PT-6 legs analyzed a landed wave).

---

## 4. THE 7 CLUSTER RESOLUTIONS — PASS-3 LOCKED + critiqued + DEVELOPED

| Cluster | Issue(s) | Mode | Resolve | Critique | Disposition (the fold is in `AMENDED-COHERENCE-PLAN.md`) |
|---|---|---|---|---|---|
| **G1** | §2.D1/D2/D3 + G1-lockstep + A1-recovery | impl (spike) | 88% | **82%** | LOCKED; 2 MR folded (D-G4-table contradiction, dual-row ambiguity) |
| **G2** | §2.T4/T1 + T2/M4 | impl (spike) | 90% | **76%** | LOCKED; 5 MR folded — **MR-1 BLOCKING (re-ground M7 onto WS8 pass-4 C6)** |
| **G3** | §2.G2/A2 | spec | 91% | **90%** | LOCKED; 5 MR folded (TYPED roster shape, class-pattern grep, ROSTER-EXPORT precond) |
| **G4** | §2.C1/G3/G4/L15 (C2 dropped) | spec | 93% | **88%** | LOCKED; 4 MR folded (mechanical banner-vs-reshoot resolve-check, aux-exclusion) |
| **G5** | §2.T5/T6/T7 | impl (build-map) | 93% | **90%** | LOCKED; 4 MR folded — **MR-1: a born-RED clause forces the WS5 parallax arm to land** |
| **G6** | §2.I1/L12/L13/L14 | spec | 94% | **79%** | LOCKED; 5 MR folded — **MR-1: the census is 16 not 15** (the de-blinded receiver) |
| **G7** | §2.M2/L7/L8/U1/M1/P1/P3/P5/L1 | spec | 91% | **85%** | LOCKED; 5 MR folded — **MR-1: A10 mistargets (dock-gallery has 0 GlassDock); MR-2: retired-token CI-blind** |

**Critique-weighted mean: 84%.** The 2 BLOCKING/recursion findings (G2 C6, G7 A10 + retired-token) are folded with
exact edits + on-disk verification at HEAD. The decoupled-paint adjudication is LOCKED keep-decoupled-with-guards.

---

## 5. THE DEVELOPED PLAN (PASS 3 close)

**`AMENDED-COHERENCE-PLAN.md`** is the developed fold-ready plan — the exact build-map/cursor/gate edits per cluster
with every critique mustResolve folded in place. Per-cluster sections: §2 (G1), §3 (G2), §4 (G3), §5 (G4), §6 (G5),
§7 (G6), §8 (G7). The accepted residuals (build-phase / executor-judgement, each named + owned) are §10; the
develop-ready verdict §11.

**The fold-agent applies** each cluster's "EXACT edits" table, **re-anchored against HEAD `31b128aa`** before applying
(the spec resolves ran at `6c1f5386`/`998136bb`; the line numbers drift — a mechanical re-anchor pass, plan §10 R-8).

**nextFocus: FOLD INTO THE TRANCHE SET.**

---

## 6. ARTIFACT INDEX

| File | Content |
|---|---|
| **`AMENDED-COHERENCE-PLAN.md`** | **the DEVELOPED fold-ready plan — exact build-map/cursor/gate edits per cluster, critique mustResolve folded** |
| `COHERENCE.md` | this living master (the durable index) |
| `pass-3-proto-PT-1.md` (worktree `wf_…-1`) | G1 dag-paint-keystone spike (NOT merged) |
| `pass-3-resolve-G2-token-spine-sourcing.md` (worktree `wf_…-2`) | G2 token-spine spike (NOT merged) |
| `pass-3-resolve-G3.md` | G3 ws8-reader-fanout resolve |
| `pass-3-resolve-G4.md` | G4 cuttime-gate-blind resolve |
| (G5 worktree `wf_…-8` `bg-build-map.md`) | G5 livefix-protectors build-map spike (NOT merged) |
| `pass-3-resolve-G6.md` | G6 canonhome-interleave resolve |
| `pass-3-resolve-G7.md` | G7 coverage-deadfile-carve resolve |
| `pass-2-synthesis.md` / `pass-1-synthesis.md` / `pass-1-spec.md` | the PASS-1/2 narrative + research baseline |
| `pass-1-research-*.md` (8) | the source lenses |

**The G1/G2/G5 spikes are worktree-isolated, NOT merged** — the develop phase folds their plan edits into the
shared-checkout build-map/cursor/wf.js (+ lands the G2 `--glass-chromatic-strength` mint in src/). The two real
src/wf.js seeds (the G2 property-regs mint, the G1 wf.js control-flow) are recorded in `AMENDED-COHERENCE-PLAN.md` as
build-phase deliverables.
