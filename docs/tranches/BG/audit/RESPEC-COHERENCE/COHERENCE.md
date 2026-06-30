# BG RE-SPEC COHERENCE — LIVING MASTER

**Status:** PASS 1 baseline + proto/crit · **Updated:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64`
**Overall convergence:** **66%** · **readyToDevelop:** NO
**Owns:** the friction taxonomy + repeat-risk verdicts · every coherence issue (C1–C14) + resolution status · the
page-coverage delta · the re-verified DAG / gate / interleave / consumer tables.

This file is the durable index. The narrative lives in `pass-1-synthesis.md`; the per-issue corrected specs +
critiques live in `pass-1-proto-PT-*.md` / `pass-1-crit-PT-*.md` / `crit-PT-4-pass1.md`.

---

## 0. CONVERGENCE LEDGER (per pass)

| Pass | Conv | What moved |
|---|---|---|
| 1 (research → `pass-1-spec.md`) | 58% | 20 friction classes, 14 coherence issues, all HIGH claims verified vs `src/` |
| 1 (proto/crit → this) | **66%** | 6 highest-severity resolutions feasibility-confirmed + critiqued; 3 carry do-not-land/false-headline/wrong-anchor |

**readyToDevelop becomes true** only when conv ≈100% AND every HIGH coherence issue (C1/C2/C4/C6/C8) is resolved
or explicitly accepted-residual.

---

## 1. COHERENCE ISSUES — status board (C1–C14)

| # | Sev | Issue (one line) | Resolution | Conv | Status |
|---|---|---|---|---|---|
| **C1** | HIGH | abolished `rides W-REFLECT3` re-introduced by the fold; G8 bans it; keystone tag can't green | PT-1 (re-home to per-wave self-close) | 82% | FEASIBLE, opens: durable-path re-rank, gate-bound KEEP exemption, content-anchored edits |
| **C2** | HIGH | G4 "LANDS FIRST" unenforced + already violated + stale vs moved frontier | PT-2 (re-baseline + precond encoding) | 73% | FEASIBLE, **2 CRITICAL opens**: LLM-loader precond-wiring, CLOSEFIX-9SITE↔GLASS-BLUR-PEER deadlock |
| **C3** | MOD-HIGH | class-K substitution/dead-knob rides 8+ new-token waves, NO catching gate | PT-5 (discipline + `proof:token-discipline`) | 68% | FEASIBLE, opens: tree-wide @property scan (not property-regs-only), structuralize maps |
| **C4** | HIGH | shader-fence keyed to `uChromatic` (converge-only); Tier-2 WGSL unreconciled+unfenced; F2 box-shadow collision | PT-4 (re-point to ship op + scalar + dual-stack) | 62% | FEASIBLE, **class-U recursion**: mis-anchored WGSL target; operator-shape parity; un-amended docs |
| **C5** | MED | device-free CI battery can't pass mid-tranche; CLAUDE.md says ba-gestalt [local]-only | PT-6 (green-signal narrowing) | 56% | FEASIBLE-direction, **headline FALSE at HEAD** (trio not exhaustive) |
| **C6** | HIGH | G3 canon-home `BG/canon/` split from realized `docs/canon/` + resolver | (un-prototyped) | — | DIAGNOSED, routed; reconcile G3 to `docs/canon/`, register G3→B4b edge |
| **C7** | MED | foreign-tree deny-belt gitignored + literal-prefix-narrow | (accepted-residual) | — | DIAGNOSED; durable fence = prose + tracked tripwire; belt is defense-in-depth |
| **C8** | HIGH | (a) bg-paint un-guarded derefs; (b) decoupled-paint re-concentration; (c) PAINT-PENDING≠DONE stall | PT-3 (a) + PT-6 (b/c) | 62/56% | (a) FEASIBLE but **spike must not land verbatim**; (b/c) adjudication open |
| **C9** | MED | live-fix collisions: D-2 grain double-warm under WS9; D-3 dock read under WS2 wrong gate | (un-prototyped) | — | DIAGNOSED; D-2 needs reconcile/retire owner, D-3 needs E4 gate-binding |
| **C10** | MED | clean-break deletes: no standing retired-token×sibling-grep; bbnf `--glass-blur-dock`, speedtest `.glass-refract` | (un-prototyped) | — | DIAGNOSED; make inv-11 probe real for TOKENS |
| **C11** | MED | ladder/shell carve→re-grow chain, no post-WS9 re-carve owner; WS9 grain file-target stale | PT-2 (partial) | 73% | PARTIAL; owner-assignment + `ladder.css`→`grain-overlay.css` re-point remain |
| **C12** | MED | BG↔BH drift: claude-deletable absent B4f; value `^1.2.0` stale in B1-W2; doc-override undersold; commit-msg shared | (un-prototyped) | — | DIAGNOSED; value floor reconcile BEFORE B1 runs |
| **C13** | LOW | HEAD numeral `6369ad6e`≠`4c761b64` in plan header | (Band-0 ledger wave) | — | DIAGNOSED; cosmetic, assign to a claim-reconcile wave |
| **C14** | LOW | unowned goo-morph-pager directive; SiriIsland export math; 3 dock pages no roster; D-G2 conflation; Firefox-146 | (un-prototyped) | — | DIAGNOSED; low residue |

**HIGH-severity still-open:** C1, C2, C4, C5/C8b, C6. **MOD-HIGH:** C3. None is a feasibility blocker.

---

## 2. FRICTION TAXONOMY — repeat-risk verdict (A–U)

| Class | Name | Recurs | Verdict + live BG vector |
|---|---|---|---|
| A | headless-green over visually-broken (cardinal) | yes | CURED generally; LIVE residual = C-SAFARI ★★★ + decoupled-paint chokepoint (C1/C8) |
| B | orphaned-wave-claim | yes | `proof:no-orphaned-wave-claim` landed; live = HEAD numeral drift in plan header (C13) |
| C | clean-break rename misses a consumer | yes | `tsconfig.test.json`+`consumer-staleness`+`DELETION_SWEEP_ROOTS`; BG-era delete wiring not re-asserted (C10) |
| D | budget-rebaseline ratchet | yes | `budget-gate-present`+down-ratchet landed; WS8 GL chunks add, WS5 re-pins; defended |
| E | ci.yml↔manifest drift | **no** | `--emit-ci` codegen makes drift impossible; symptom R3 the 9-site fix clears |
| F | BOOK/ARCHIVE re-label | **no** | `disposition-live`+NDA-DECIDE+DISPOSITION-RESTAMP+Band-0 ledger; well-defended |
| G | structural / god-module | yes | R1/R2 LIVE (ladder 527, shell 510); carve→re-grow chain no post-WS9 owner (C11) |
| H | close-never-runs / provenance | **no** | most-hardened; `--run full` siblings-absent + ship-attestation; residual = C-SAFARI + paint-stall (C8) |
| I | user-directive contradicts spec | yes | confirm goo-morph-pager/deck directive owner (C14a) |
| J | capability-without-adoption (overfit) | yes | SIRI-ISLAND/-WAVEFORM, GLASS-REFRACT-WEBGL, useDockSpring; ≥2 bar must be PRODUCTION |
| K | substitution-vs-inheritance / dead-knob | yes | **3rd–4th recurrence, NO single gate**; rides --siri-island-t/--glass-depth/--glass-key-direction/--dock-surface-blur (C3) |
| L | reka-ui binding silent no-op | yes | kf 5.1.0 ambient renames + value bumps; Sheet/Select/Switch/Slider re-wires; **no bump-sweep gate** (C4-binding) |
| M | live-π oklab paint-arm | **no** | tooling fixed; G6 uses chroma-sensitive `pngMedianRgbStddev` |
| N | light-dark inset / hsl-wrap / scoped-:global / :slotted-vs-:deep | yes | canonized idioms; WS8/WS9/WS4 scoped SFC CSS watch surfaces; dual-engine paint catches |
| P | rate wall (parallel>3→429) | **no** | CLEAN — `composeBatch` caps at 3, bg-paint caps at 2 |
| Q | session-limit null-crash | yes | bg-bh-execute hardened; **bg-paint.wf.js NOT** (4 `agent(`, 0 `.catch`) (C8a) |
| R | foreign-tree catastrophe | yes | prose fence + tracked tripwire DURABLE; gitignored literal-narrow deny-belt lose-able (C7) |
| S | dependency-floor miscalc | **no** | corrected: value `^1.1.1`, kf `^5.1.0` published; CAVEAT BH B1-W2 still `^1.2.0` (C12) |
| T | submodule canon-home | split | G3/G5 moved OUT of submodule but G3 homed `BG/canon/` ≠ realized `docs/canon/` (C6) |
| U | wrong-uniform / wrong-anchor | yes | WIDE; fence keyed `uChromatic` (converge-only); ship op = `chromatic_aberration` (C4) |

**Concentration:** (1) C-SAFARI on-device-Metal, (2) orchestration session-limit gap, (3) glass-ui-specific token/binding traps.

---

## 3. RE-VERIFIED TABLES

### 3a. DAG (wave-ordering) — structural facts

- **No static machine-checkable DAG.** `bg-bh-execute.wf.js:134` spawns a **DAG-LOADER agent** that INFERS
  `preconds[]` per wave from the PROSE of build-map + interleave-map + EXEC-PROGRESS. Correctness = the loader's
  prose-parse fidelity. `ready(w)` = `PENDING ∧ preconds.every(DONE) ∧ interleaveReady`; **`interleaveReady` returns
  `true` unconditionally for every BG wave** (L90) → BG order is enforced ENTIRELY by preconds; `seq` is only a
  `composeBatch` tiebreaker (prefer-lower).
- **Acyclic** — verified (no cycles across all 12 WS + BH tail).
- **G4 defect (C2):** declared "LANDS FIRST before WS1" but homed `seq 12.0` (orders it LAST), named as a precond
  by ZERO WS1/WS3 wave, **already violated** (WS1 all DONE, WS3 3.1/3.6/3.7 landed, G4 never ran). WS3 3.6
  pre-empted G4's own dock-blur deliverable. PT-2 H2: the carve work is TITLED `BG.W-GLASS-BLUR-PEER` in the
  spike+commit but the carve wave id is `BG.W-CLOSEFIX-9SITE` → loader-conflation = **deadlock risk**.
- **PAINT-PENDING ≠ DONE stall (C8c):** `ready()` requires precond `status==='DONE'`; the loader treats
  PAINT-PENDING as "done-building"; 3.1/3.6 are PAINT-PENDING now → any successor with a precond on them stalls.
  Fix = `BUILT={DONE,PAINT-PENDING}` widen in `ready()`+`allDone` (PT-6 §2).
- **Cross-phase edges:** WS2 `4.3 DOCK-CUT` depends on WS6 (built later — can't close in its WS2 slot); WS7
  `12.8 SAFARI-PARITY-GATE` depends on WS8 (acknowledged, precond in prose); `BH.B4f` (rm CLAUDE.md) NOT gated on
  `BG.W-CUT` — safe by `WS12-LAST`+human-gate code-shape, NOT an encoded edge (record for future refactor).

### 3b. PAGE↔WAVE COVERAGE

- **Corpus = 120 routed pages** (`s()` in `manifest.ts`); the seed's "156/38-newer" is a miscount (36 of the 38 are
  chassis/sub-components). **Real delta vs BD PASS-E = +2** (`dock/dock-gallery`, `dock/liquid-playground`), both
  WS2-covered, **no renames**.
- **Zero strict orphans** — WS12 `BG.W-PAGE-COMPONENT-AUDIT` is a manifest-DERIVED **480-capture** (120×2 engines×2
  modes) all-page net (gate-vacuity-safe).
- **Enforcement is two-tier:** 14 roster-pinned pages carry a ci/release ba-gestalt verdict; **106 pages rely ONLY
  on the `local`-tagged WS12 late sweep** (the most quota-vulnerable wave — headless-green/visually-broken exposure
  for ~88% of pages).
- **3 dock attention-gaps:** `dock-gallery`+`liquid-playground`+`morph-showcase` not roster-pinned; only
  `BG.W-DOCK-STORY-MODULARIZE` touches them and it is `[H]`/DEFERRABLE (C14c).
- **Carve conflicts:** `ladder.css` (527L) edited by 4 waves; LAST editor is WS9 (after the WS3 budget-tracker
  closes) → no post-WS9 re-carve owner (C11). WS9 GRAIN-REAL `Files:` names `ladder.css`/`shell.css` but G4 carves
  grain OUT to `grain-overlay.css`/`shell-regions.css` → WS9 grain re-point target potentially stale (C11/C2).
- **D-G2 doc conflation:** the deferral says "WS12 = 10 roster surfaces" but WS12 is the all-120-page 480-capture (two instruments, two page sets).

### 3c. GATE COMPOSITION

- **`proof:ba-gestalt`** `[local,ci,release]`, born-RED (0/10 roster), the keystone tag-enabler. G8 clause scans
  recursive `/PROGRESS.*\.md$/` + bans un-quoted/un-RETIRE `rides W-REFLECT3`; exit=1, 2 live hits (EXEC-PROGRESS:38,113).
  CLAUDE.md still documents it as `[local]`-only — contradicted by the live tagging (C5).
- **Born-RED-by-design trio** poisons `--run ci`/`--run full` mid-tranche: ba-gestalt, `proof:ship-attestation`
  `[ci,release]`, planned `proof:close-sweep` `[local]`. PT-6 re-tags to `[release]` (the ay-final/az-reflect/
  ba-final/peer-conformance precedent in `proof-tag-parity.mjs`). **BUT `--run ci` is ALSO red from `proof:tag-parity`
  (category-card-warm) + `proof:consumer-staleness` (72 un-ledgered) — the trio re-tag does not green CI** (PT-6 §A).
- **ci.yml drift (C5/E):** `proof:glass-idiom-factor` in the registry (`[local,ci,release]`, landed 6ec81deb) but
  MISSING from emitted ci.yml → `proof:gen-ci-fresh` RED; CLOSEFIX-9SITE R3 re-emits it.
- **Narrowed per-wave green signal** is unspecified — the engine must run a narrowed set excluding the born-RED trio or deadlock (PT-6).

### 3d. BG↔BH INTERLEAVE

- BG+BH cut **jointly as 5.0.0** (BH B4f hard-deletes CLAUDE.md, no replacement, absolute-last act).
- **C6 canon split:** G3 homed `docs/tranches/BG/canon/` vs realized `docs/canon/` scaffold + `canon-doc.mjs`. Reconcile + register `G3(WS7)→B4b-content(WS12)` shared-write edge.
- **C12 drifts:** `proof:claude-deletable` absent from B4f; value floor `^1.2.0` stale in `[C]`-early B1-W2 (reds
  peer-conformance — reconcile BEFORE B1 runs); `B5c proof:doc-override-idiom→README` undersold; `.githooks/commit-msg` a shared B0×G3 writer (G3 must EXTEND not clobber).
- **C14b:** SiriIsland adds `api/index.ts` symbols + `/siri-island` key → BH B7 frozen "203 symbols/96 keys" export-math drifts (self-correcting via derive-from-source).

### 3e. CONSUMER CONSTELLATION (read-only sibling sweep)

- **bbnf-buddy** `preset.css:230` overrides `--glass-blur-dock: var(--glass-blur-cartoon)` (blur(22px)) — a
  DELIBERATE live dock-cartoon override. G4's "0 orphan readers" is glass-ui-INTERNAL only → asymmetric silent
  partial no-op (3 of 4 bbnf dock tokens survive; blur reverts 22px→8px). Owed a by-name B7 migration ask
  (foreign-tree fence: record, NEVER edit bbnf) (C10).
- **speedtest** `CompleteBadge.vue:16` `.glass-refract` is a 4.1.0-stale no-op (renamed `.glass-lens` at BB); G1
  `BG.W-GLASS-SOTA-LADDER` finalizes by deleting `glass-refract.css` → omitted from the roster (C10).
- **No standing retired-token × sibling-grep gate** — the constellation roster was a one-time scout; make the
  inv-11 probe real for TOKENS, not just exports.
- **Method:** sibling-greps MUST use arrays + `--exclude-dir` for consumer `dist`/`test-results`/`trace` (nearly produced a false-clean).

---

## 4. THE 6 RESOLUTIONS — convergence + lead opens

| PT | Issue | Mode | Conv | Lead open (mustResolve) |
|---|---|---|---|---|
| 1 | C1 W-REFLECT3 re-home | spec | 82% | fold into Band-0 WS7 ledger wave (PRIMARY); bind KEEP exemption to gate `RETIRE_RE`; content-anchored edits |
| 2 | C2 G4 re-baseline | spec | 73% | **CRITICAL** boot-assert the EXACT `BG.W-CLOSEFIX-9SITE` precond id (deadlock); LLM-loader precond-wiring |
| 3 | C8a bg-paint guards | implement | 62% | **do NOT land spike verbatim**: id-preserving FAIL-default on batched judge; synth reconcile full id set |
| 4 | C4 shader-fence | spec | 62% | **re-anchor to `audit/glassShader-tier2.wgsl`**; operator-SHAPE transcription for F6; sweep un-amended docs |
| 5 | C3 token-discipline | spec | 68% | tree-wide @property scan (not property-regs-only); structuralize dead-knob/peer maps; §4.1↔§4.4 reconcile |
| 6 | C8b/C5 paint adjudication | spec | 56% | **headline FALSE at HEAD** (trio not exhaustive); re-order so re-tag gates on per-band HALT; catcher false-positive |

---

## 5. PASS 2 FOCUS (priority order)

1. **PT-6** — full `--run ci` red enumeration; re-order §2→§1-A→§3 (re-tag gates on a non-skippable per-band HALT); scope catcher off visual-runner; re-home CLAUDE.md intent → BH B4b.
2. **PT-4** — re-anchor to `audit/glassShader-tier2.wgsl`; operator-shape transcription; sweep AMENDED + SPEC-pass4; `.glass-chromatic` name-collision.
3. **PT-3** — id-preserving FAIL-default; synth id-set reconcile; REAL-harness validation.
4. **PT-2** — pin EXACT precond id + boot assert (deadlock); binding DAG dry-run; shell.css headroom.
5. **PT-5** — tree-wide TD-CLOSE-A; structuralize maps; §4.1↔§4.4 seed reconcile.
6. **PT-1** — Band-0 fold PRIMARY; gate-`RETIRE_RE`-bound KEEP exemption; content-anchored; protocol-canon idiom home.

**Plus prototype the un-prototyped lower-severity:** C6 (canon-home → `docs/canon/`), C9 (D-2 reconcile owner + D-3
E4 gate-binding), C10 (standing retired-token × sibling-grep gate), C12 (value `^1.2.0`→`^1.1.1` BEFORE B1).

---

## 6. ARTIFACT INDEX

| File | Content |
|---|---|
| `pass-1-spec.md` | the 58% research baseline (friction A–U, C1–C14, ground truth) |
| `pass-1-synthesis.md` | the proto/crit agglomeration narrative |
| `COHERENCE.md` | this living master |
| `pass-1-proto-PT-{1,2,4,5,6}.md` + `PT-3-...spike.md` | the 6 corrected-approach specs / spike |
| `pass-1-crit-PT-{2,5,6}.md` · `crit-PT-4-pass1.md` · (PT-1/PT-3 crit inline) | the 6 critiques |
| `pass-1-research-*.md` (8) | the source lenses |
