# BG RE-SPEC COHERENCE — LIVING MASTER

**Status:** PASS 1 baseline + proto/crit (re-anchored to HEAD) · **Updated:** 2026-06-30 · **Branch:** `tranche/BG`
**HEAD:** `6c1f5386` (the prior master ran at `4c761b64`; tree moved +3 — build now 44 DONE / 7 PAINT-PENDING / 130 PENDING)
**Overall convergence:** **68%** · **readyToDevelop:** NO
**Owns:** the friction taxonomy + repeat-risk verdicts · every coherence issue (the `pass-1-spec.md §2.X` set) +
resolution status · the page-coverage delta · the re-verified DAG / gate / interleave / consumer tables.

This file is the durable index. The narrative lives in `pass-1-synthesis.md`; the per-issue corrected specs +
critiques live in `pass-1-proto-PT-*.md` / `pass-1-crit-PT-*.md` / `crit-PT-{4,5}-pass1*.md`.

> **Re-anchor note.** The prior pass used a C1–C14 issue numbering at `4c761b64`. This pass adopts the
> `pass-1-spec.md §2.X` numbering (8 HIGH / 16 MED / 15 LOW @ `6c1f5386`) and re-ran the proto/crit set at the new
> baseline. Three resolutions materially changed because the frontier MOVED and two named owner-waves LANDED.

---

## 0. CONVERGENCE LEDGER (per pass)

| Pass | HEAD | Conv | What moved |
|---|---|---|---|
| 1 (research → `pass-1-spec.md`) @ 4c761b64 | 4c761b64 | 58% | 20 friction classes, 14 coherence issues, HIGH claims vs `src/` |
| 1 (proto/crit → prior master) @ 4c761b64 | 4c761b64 | 66% | 6 resolutions feasibility-confirmed + critiqued |
| **1 (re-anchored research → `pass-1-spec.md`)** | **6c1f5386** | **64%** | re-verified @ moved tree; 39 issues (8H/16M/15L); §2.X numbering |
| **1 (re-anchored proto/crit → THIS)** | **6c1f5386** | **68%** | 6 re-run at new baseline; 2 over-stated headlines corrected (D3-deadlock, C1-benign); PT-6 lead legs re-grounded; PT-2 G8 re-green PROVEN |

**readyToDevelop becomes true** only when conv ≈100% AND every HIGH coherence issue (§2.A1/A2/D1/D2/D3/G1/G2/T2/T4/I1)
is resolved or explicitly accepted-residual.

---

## 1. COHERENCE ISSUES — status board (the §2.X set)

`Conv` = the critique's number for the resolving PT (or `—` if un-prototyped). Severity from `pass-1-spec.md`.

### HIGH (8) — all owe an amend-ready spec before a resumed execution is safe

| # | Issue (one line) | PT | Conv | Status / lead open |
|---|---|---|---|---|
| **§2.A1** | decoupled-paint engine re-creates the cured BB terminal-reflect chokepoint | PT-2 | 70% | ADJUDICATED keep-decoupled-with-guards (per-wave non-authoring ≠ BB single terminal); residual = cadence (interleave) + cut-gate (union) + null-guards |
| **§2.A2** | `bg-paint.wf.js` session-limit null-crash (Class Q, LIVE) | PT-3 | 82% | guards CONFIRMED solid at all 4 sites (L40/43/51/54); mirror bg-bh-execute — apply (write-fence held) |
| **§2.D1** | G4 mis-positioned: declared LANDS-FIRST, seq-LAST, precond-unbound | PT-1 | 70% | re-seq 12.0→0.7 + precond edges; **O4** the loader seq-pin is the SOLE source (LLM dep) — make dry-run `seq===0.7` a hard pre-pick gate |
| **§2.D2** | WS3 3.6 shipped G4's `--dock-surface-blur`, staling G4's spec | PT-1 | 70% | REFRAME: 3.6 is G4's PREREQUISITE (orphans the chain), not its victim; retire arm = dist byte-neutral (0 dist readers) |
| **§2.D3** | PAINT-PENDING ≠ DONE build-ordering | PT-1 | 70% | `doneBuilding={DONE,PAINT-PENDING}` widen + split cutReady; **O2** NOT deadlocked now (Part A3 is a prereq for Part B's edge); **O1** paint-FAIL recovery UNDEFINED across 3 artifacts (ping-pong) |
| **§2.G1** | `proof:ba-gestalt` G8 forbids "rides W-REFLECT3" (2 live, blast radius 61) | PT-2 | 70% | PROVEN: re-home flips G8 GREEN; **H1** lockstep across EXEC-PROG + build-map; **H2** "W-REFLECT3" is a phantom proving-wave (semantic reconcile, not find-replace) |
| **§2.G2** | WS8 `.glass-lens` retire breaks surviving gates; 3 of 24 readers named | PT-3 | 82% | CONFIRMED: proof:button-glass `[release]` + visual-reconcile red on delete; 3 build/published breaks absent from *Files*; **H4** route survivors THROUGH glass-refract-fence roster (no per-gate re-scatter) |
| **§2.T2** | C-SAFARI ship op = `chromatic_aberration @ 0.003` (NOT `uChromatic @ 0.0045`); WGSL unfenced | PT-5 | 74% | CONFIRMED dual-stack drift + §2.M4 box-shadow→float collision; fix amend-ready bar the M6 single-vs-multi-panel self-recursion |
| **§2.T4** | `--glass-key-*` dual source + banned-angle + WS8←WS9 DAG inversion | PT-4 | 55% | spine sound (DAG-edge strike is the high-value fix) but spec read SUPERSEDED passes — 3 amendments would REGRESS §0E-1 |
| **§2.I1** | G3 canon-home `BG/canon/` split from realized `docs/canon/` + resolver | — | — | DIAGNOSED, routed (G-6); reconcile to `docs/canon/` + register G3→B4b edge |

### MEDIUM (16) — §2.C1/C2/T1/T3/T5/T6/T7/P1/P3/P5/L1/G3/M1/M2/G4/U1

| # | Issue (one line) | PT / gap | Conv | Status / lead open |
|---|---|---|---|---|
| **§2.C1** | kf peer `^5.0.0` vs the shipped 5.1.0 `DragOptions.snap` binding | PT-6 | 45% | **RE-GROUND**: B1-W2 LANDED → C1 is a LIVE broken-gesture defect (drag never snaps on `^5.0.0`); re-home the peer bump onto an UNRUN wave |
| **§2.C2** | BH B1-W2 value `^1.2.0` vs audit `^1.1.1` | PT-6 | 45% | **MOOT @ HEAD**: executed peer is `^1.0.0`, peer-conformance GREEN, `wcagContrastRatio` zero in-tree callers → `^1.1.1` floor unjustified; DROP |
| **§2.T1** | dead-knob discipline absent for `--siri-island-t`/`--glass-depth`/`--glass-key-direction` | G-2 / PT-4 | partial | each new `@property` owes the substitution-trap note + a live-π-under-scope check; `--glass-key-direction` absorbed by PT-4 (F is plain-custom, no de-reg risk) |
| **§2.T3** | GLASS-TINT-UNIFY rename names 2 of 5 carriers (@property de-reg risk) | G-2 | — | re-enumerate the 5 carriers; @property registration moves with the rename; prior pass verified TARGET not SOURCE |
| **§2.T5** | D-2 demo-warm grain double-warms under WS9 GRAIN-REAL | G-5 | — | WS9 owns the D-2 hand-off (no retire owner today) |
| **§2.T6** | D-3 `--dock-expand-t` read in the orchestrator WS2 rewrites; WS2 gate blind | G-5 | — | add `proof:dock-engine` `[local,ci,release]` to WS2's per-wave gate set (one-line known fix) |
| **§2.T7** | D-1 constellation parallax-default in a file WS5 rewrites; ZERO standing gate | G-5 | — | WS5 preservation note + a one-assert parallax-default gate |
| **§2.P1** | liquid-morph.css whole-file rehome double-owned (3.11 vs 12.1) | G-7 | — | pick one owner |
| **§2.P3** | WS5 6.3+6.7 "ONE atomic gate edit" transient-RED under the file-disjoint batcher | G-7 | — | merge the waves OR precond-sequence with no-transient-red authoring |
| **§2.P5** | goo-morph worm carve had a live undefined-props near-miss; paint deferred to WS11/12 | G-7 | — | binding-presence assert on the carve's prop surface; don't defer the paint to the very end |
| **§2.L1** | no dedicated reka/kf binding-verification sweep on the bumps | G-7 | — | a binding-verification sweep step at the bump waves + the cut |
| **§2.G3** | `proof:glass-idiom-factor` in registry, MISSING from emitted ci.yml | PT-6 | 45% | CONFIRMED: `--emit-ci` adds exactly it; build-map:451 OVER-claims category-card-warm ([local]-tagged, can't be emitted to ci) |
| **§2.M1** | ladder/shell carve→WS9-grain re-point; WS9 *Files* names pre-carve paths; no post-WS9 re-carve owner | G-7 | — | re-point WS9 *Files* to the carved leaves + assign a post-WS9 re-carve owner (R1/R2 re-open risk) |
| **§2.M2** | 5 phantom dock owner-waves (incl. ★★ dock-gallery directive) | G-7 | — | reconcile each phantom owner-name to a real wave OR declare a genuine orphan |
| **§2.G4** | 3 stale AZ freshness hashes red gate-manifest-sound; no re-stamp owner | PT-6 | 45% | CONFIRMED EXACT: gate `[local]` exit 1 reds `--run full`; discharge = RETIRED-SUPERSEDED banner gated AFTER WS2∧WS5 |
| **§2.U1** | bbnf-buddy `--glass-blur-dock` external override silent no-op | G-7 | — | owe a B7 migration row + an exact-name deep-grep (the inv-11/`--ring` blind spot run again) |

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

## 4. THE 6 RESOLUTIONS — convergence + lead opens (re-anchored)

| PT | Issue(s) | Mode | Conv | Lead open (mustResolve) |
|---|---|---|---|---|
| 1 | §2.D1/D2/D3 DAG/paint-decouple keystone | spec | 70% | **O1** paint-FAIL recovery UNDEFINED (ping-pong) — A5 needs a FAIL branch; **O2** not deadlocked now; dry-run `seq===0.7` hard pre-pick |
| 2 | §2.G1/A1 W-REFLECT3 re-home + adjudication | impl | 70% | **H1** lockstep re-home across EXEC-PROG + build-map; **H2** "W-REFLECT3" phantom proving-wave (semantic reconcile); **H3** WS12 disambiguation; **H4** mint ONE phrase |
| 3 | §2.G2/A2 glass-lens fan-out + bg-paint guards | impl | 82% | **H1** scope atomic unit to WS8.4; **H2** pin grep scope; **H4** route survivors THROUGH glass-refract-fence roster; **H5** add the WS8.4 *Gate* set |
| 4 | §2.T4/T1 `--glass-key-*` single-source + DAG edge | spec | 55% | **FAIL-1** drop phantom liquid-morph thread; **FAIL-2** replace sign-coherence with §0E-1 shared-SOURCING; **FAIL-3** drop fabricated bevel-reads-R |
| 5 | §2.T2/M4 uChromatic dual-stack | spec | 74% | M6 single-vs-multi-panel self-recursion (author MULTI-panel); pin `execution/bg-build-map.md` path; `--glass-chromatic-strength` initial-value 0/provisional |
| 6 | §2.C1/C2/G3/G4/L15 cut-time checklist | spec | 45% | **C1** RE-GROUND (B1-W2 landed → live broken-gesture; re-home bump to UNRUN wave); **C2** MOOT (executed `^1.0.0` GREEN); CT-2 self-contradiction |

**Average HIGH (PT-1..5): ~70%. PT-6 (MED-at-tag): 45%.**

---

## 5. PASS 2 FOCUS (priority order by residual + blast radius)

1. **PT-6 / §2.C1+C2** — re-ground against HEAD (B1-W2/B1-W3 landed); re-home the kf-peer bump onto an UNRUN wave
   (C1 = live broken gesture); DROP the moot `^1.1.1` floor; re-scope CT-2 off the KEEP'd `PINNED_KEYFRAMES_VALUE_DEP`;
   keep the mechanism + G3/G4/L15 + the gate-hardening fold.
2. **PT-4 / §2.T4** — DROP the phantom liquid-morph thread; REPLACE sign-coherence with §0E-1 shared-SOURCING; DROP
   §3.A's fabricated wiring; re-target ALL WS12 edits to `SPEC-pass4-converged §0E-1`; KEEP the DAG-edge deletion +
   anchor corrections + KEEP-BOTH + substitution-trap; resolve the `crit-PT-4-pass1.md` filing collision.
3. **PT-1 / §2.D1+D2+D3** — A5 explicit paint-FAIL branch + reconcile engine-design.md (soften "correct either way");
   re-state NOT-deadlocked-now; dry-run `seq===0.7` hard pre-pick; reconcile §0 "already violated" vs §1 ordering;
   flip the over-broad "before WS1" prose.
4. **PT-2 / §2.G1** — lockstep the re-home (EXEC-PROG + build-map D-G2/:544); semantically reconcile the 7 build-map
   W-REFLECT3 refs (phantom proving-wave); disambiguate WS12 + reconcile D-G2 to guard(b); mint ONE canonical phrase;
   reconcile the proto filename slot.
5. **PT-5 / §2.T2** — author the WGSL twin MULTI-panel (`array<vec4f,8>`) so it doesn't red M6; pin
   `execution/bg-build-map.md`; mark `--glass-chromatic-strength` initial-value 0/provisional; KEEP the dual-stack
   name-map + CHROMATIC_SCALE + F3a-d + the §2.M4 scalar/box-shadow split.
6. **PT-3 / §2.G2** — re-scope the atomic unit to WS8.4; pin the DEFINITION-ABSENT grep scope; ONE canonical reader
   roster (fold gates.mjs); route survivors THROUGH `proof:glass-refract-fence`'s roster; add the WS8.4 *Gate* set.

**Plus prototype/direct-edit the un-prototyped:** G-5 (the 3 live-fix protectors — PASS-2 DIRECT-EDIT: §2.T6
proof:dock-engine into WS2, §2.T7 D-1 parallax gate + WS5 note, §2.T5 D-2→WS9 hand-off), G-6 (§2.I1 canon-home →
`docs/canon/`, §2.L12/L13/L14 interleave reconciles), G-7 (§2.M1/M2/U1/P1/P3/P5/L1/L7/L8 reconciles).

---

## 6. ARTIFACT INDEX

| File | Content |
|---|---|
| `pass-1-spec.md` | the re-anchored research baseline (friction A–U, §2.X issues, ground truth @ 6c1f5386) |
| `pass-1-synthesis.md` | the proto/crit agglomeration narrative (re-anchored) |
| `COHERENCE.md` | this living master |
| `pass-1-proto-PT-{1,4,5,6}.md` + `pass-1-proto-PT-2-reflect3-rehome.md` (worktree) + `PT-3-...md` (worktree) | the 6 corrected-approach specs / spikes |
| `pass-1-crit-PT-{1,2,5,6}.md` · `crit-PT-{4,5}-pass1*.md` · `pass-1-critique-PT-2.md` · `pass-1-crit-PT-6-corrected-approach.md` | the 6 critiques |
| `pass-1-research-*.md` (8) | the source lenses |

**Filing-slot reconciles owed PASS-2:** `pass-1-proto-PT-2.md` holds stale prior-pass G4 content (PT-2 lives in
`*-reflect3-rehome.md`); `crit-PT-4-pass1.md` holds the mis-filed uChromatic/PT-5 crit (the real PT-4 crit is
`crit-PT-4-pass1-glass-key.md`).
