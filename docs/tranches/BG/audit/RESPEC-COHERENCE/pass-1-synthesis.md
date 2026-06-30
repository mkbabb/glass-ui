# BG Coherence Re-Spec — PASS 1 SYNTHESIS (research + proto/crit agglomeration)

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD (verified):** `4c761b64` · **Pass:** 1 of N
**Author:** agglomeration agent · **Scope:** READ-MOSTLY; findings only (no src/demo/scripts/CLAUDE.md edits)
**Inputs:** the 8 research lenses → `pass-1-spec.md` (58%) + the 6 prototype/critique pairs (PT-1…PT-6)
**Siblings:** verified intact (exit 0) before + after. No path outside glass-ui touched.

---

## 0. WHAT THIS PASS DID

PASS-1 ran in two halves. The **research half** (8 lenses → `pass-1-spec.md`) established the coherence
baseline at **58%**: 20 friction classes catalogued (A–U), 14 cross-wave coherence issues (C1–C14), every
highest-severity claim re-verified directly against `src/`. The **proto/crit half** took the 6 highest-severity
issues, drafted a corrected-approach spec (or a worktree spike) for each, and ran an adversarial critique over
each. This synthesis agglomerates both.

**The single load-bearing result:** every one of the 6 resolutions is **FEASIBLE in direction** (all 6 critiques
confirm the diagnosis and the fix-path), but **none is develop-ready as written** — every critique surfaced
material `mustResolve` opens, and three carry a "do not land as-is" verdict:

- **PT-3** (bg-paint null-guards): the spiked diff **must NOT land verbatim** — its batched-judge guard
  `.catch(()=>null)` + `.filter(Boolean)` DROPS a crashed wave, converting a loud crash into a silent over-green
  `allPass:true` — re-seeding the exact missing-item disease the audit exists to kill.
- **PT-4** (shader-fence): a **class-U recursion** — the spec mis-anchored the WGSL reconciliation target onto the
  pre-WS8 pilot, not the `audit/glassShader-tier2.wgsl` that WS8 §2 actually lands. The same wrong-anchor friction
  it exists to close, one layer down.
- **PT-6** (decoupled-paint adjudication): the **headline feasibility claim is FALSE at HEAD** — `--run ci` is
  red from `proof:tag-parity` (category-card-warm mis-tag) + `proof:consumer-staleness` (72 un-ledgered) wholly
  independent of the trio re-tag the fix proposes; the trio is not exhaustive.

The diagnosis converged strongly (independent lenses cross-confirm C1/C2/C4); the resolutions are now
feasibility-confirmed and one critique-round deep, with concrete next steps. **Overall aggregate: 66%.**

---

## 1. GROUND TRUTH — re-verified against source this pass

| Fact | Verified value | Where |
|---|---|---|
| HEAD (live tip) | `4c761b64` | `git rev-parse HEAD` |
| HEAD declared in plan | `6369ad6e` (2 behind) | AMENDED §10 / FINAL §10 — class-B drift (C13) |
| `ladder.css` | **527L** (>500 → R1 close-red LIVE) | `wc -l` |
| `dock/shell.css` | **510L** (>500 → R2 close-red LIVE) | `wc -l` |
| `--glass-blur-dock` chain | still present (`glass.css:103,135,166-168`, `dark-arm.css:285-286`, `bridges.css:334`) | grep |
| `dock/shell.css:29` | already reads `--dock-surface-blur: var(--glass-blur-resting)` | WS3 3.6 (cd9ce46) **pre-empted G4** |
| `proof:ba-gestalt` G8 scan | recursive `BG/waves/*.md`(absent) + `/PROGRESS.*\.md$/` (case-sensitive); exit=1, **2 live DEFERRAL hits** | `proof-ba-gestalt.mjs:340-396` — both in `EXECUTION-PROGRESS.md:38,113` (`rides W-REFLECT3`) |
| `rides/W-REFLECT` total mentions | EXEC-PROGRESS 10, build-map 7, AMENDED 8, FINAL 4 (≈29 — TOTAL, not all gate-reds) | grep |
| `uChromatic` in `src/` | **ABSENT** (converge-prototype JSON only) | grep |
| shipped Tier-2 WGSL operator | `chromatic_aberration` + `refraction_strength` (≠ uChromatic) | `glassShader.wgsl` |
| WS8 §2 lands | `audit/glassShader-tier2.wgsl` (chromatic `*0.004`, squircle-prof rim, 60%-mix) — a THIRD operator set | `SPEC-pass4-converged.md:161,189` |
| `--glass-edge-dispersion` | a CSS **box-shadow** value (`glass-fx.css:305-307`) → `parseFloat()`→NaN | F2 token-type collision |
| `bg-paint.wf.js` | **4** `await agent(` calls, **0** `.catch` | (PT-3 corrects the spec's "3") |
| `bg-bh-execute.wf.js` | 5 `.catch(()=>null)` guards + `paintWaves=[]` (L204) | decoupled-paint |
| `verify-siblings-intact.mjs` | **tracked** (durable tripwire) | git ls-files |
| `.claude/settings.local.json` | **gitignored** (lose-able deny belt) | git check-ignore |
| routed-page corpus | **120** (`s()` routes), Δ vs BD PASS-E = **+2** (`dock/dock-gallery`, `dock/liquid-playground`) | manifest.ts |

---

## 2. FRICTION TAXONOMY — repeat-risk verdict (carried from the spec, unchanged)

20 classes (A–U); 14 flagged `recurs=true`. The cardinal classes the GOLDEN-chronic-fold institutionally fixed
(A/B/E/F/H) are well-defended. Repeat-risk concentrates in **three under-reached surfaces**:

1. **C-SAFARI ★★★** (class A/U) — on-device-Metal-bound; the plan's honest #1. DE-RISKED by Safari 26.2/26.5, not removed.
2. **The orchestration session-limit gap** (class Q) — `bg-paint.wf.js` un-guarded derefs, compounded by the
   decoupled-paint engine re-creating a paint-concentration point structurally adjacent to the cured BB
   single-terminal-reflect disease.
3. **The glass-ui-specific token/binding traps** (class K substitution/dead-knob, MOD-HIGH, no single gate;
   class L reka-binding-no-op on the kf 5.1.0 / value bumps with only the decoupled paint-π as backstop).

CLEAN (no repeat-risk): **P** (rate-wall — `composeBatch` caps at 3), **E** (ci-codegen makes drift impossible),
**F** (disposition-live), **M** (oklab paint-arm tooling), **S** (dep-floor corrected, value `^1.1.1`/kf `^5.1.0`).

Full per-class table: see `COHERENCE.md §2`.

---

## 3. THE 6 RESOLUTIONS — state after proto + critique

Each resolution is FEASIBLE; each carries open `mustResolve` items. Sorted by remaining residual (lowest convergence = most open).

### PT-1 — W-REFLECT3 deferral re-home (C1 [HIGH]) — **conv 82%**
**Verdict:** FEASIBLE; the core fix is sound. The blocking gate-red dies on **2 byte-precise edits**
(`EXECUTION-PROGRESS.md:38,113`); an in-memory G8 re-run drives the arm to 0 hits. All six re-home targets are
**real waves** (not invented) — the bucket-C swap-one-phantom-for-another risk is REFUTED. The per-wave own-close
model the re-home points at is real and global (`real-paint-protocol.md:89-91` + `EXECUTION-PLAN.md:103`).
**Open (mustResolve):**
- The headline under-budgets the proposed STAGE-0 `BG.W-REFLECT3-REHOME` wave (zero presence in any ledger row
  today → needs a build-map id row, a cardinal-ledger-shaped EXEC-PROGRESS row, a DAG edge before WS1, Band-0
  enrollment — the SAME "new entity must be fully wired" friction it fixes). **Make "fold into the existing
  Band-0 WS7 ledger wave" PRIMARY**, the new wave a fallback.
- Bind the KEEP-narration exemption to the **gate's exact `RETIRE_RE`** (`proof-ba-gestalt.mjs:360`, has NO
  `SCRUBBED`/`no W-REFLECT wave`), not a superset guard; the proposed FINAL §346 string must retain `abolished`.
- **Content-anchored edits, not line numbers** — the §5.2 legend insertion shifts every subsequent line, voiding the §4.1 anchors.
- Home the binding paint-cell idiom in `real-paint-protocol §3`; the EXEC-PROGRESS legend POINTS to it (the G8
  scope is recursive over ANY `/PROGRESS.*\.md$/` — a future per-band PROGRESS file would not inherit a file-local note).

### PT-2 — G4 CLOSEFIX-9SITE re-baseline + precond encoding (C2/C11 [HIGH]) — **conv 73%**
**Verdict:** FEASIBLE; the 9-site carve is already proven on disk by spike `c0f6e1ee` (worktree-only, 527→470 +
510→459, 20 files, all affected device-free gates flip). The corrections are plan-doc edits + one gate-binding.
**Open (mustResolve) — two CRITICAL:**
- **H1: the DAG loader is an LLM agent** (`bg-bh-execute.wf.js:134-138`) that INFERS preconds from prose, not a
  parser. The fix's correctness = the loader faithfully translating amended prose into a `preconds[]` entry whose
  string EXACTLY equals G4's node id. **Re-creates PT-2's own disease one layer up.** Elevate the dry-run
  (load DAG → assert `BG.W-CLOSEFIX-9SITE ∈ preconds` of 3.5/WS8.1/14.1) to a BINDING boot-step assertion.
- **H2: naming entanglement → DEADLOCK risk.** Spike `c0f6e1ee` + WS3 3.6 (cd9ce46) both TITLE the 9-site work
  `BG.W-GLASS-BLUR-PEER`, but the carve wave id is `BG.W-CLOSEFIX-9SITE`. If the loader conflates them or emits
  any other id, `ready()`'s `map[p] && …` short-circuits FALSE → the 3 editors **block forever**. Pin the precond
  token = the EXACT node id + a boot assert that `map['BG.W-CLOSEFIX-9SITE']` is DEFINED.
- shell.css→459 (41-line headroom) takes TWO pending editors; pre-name `shell-regions.css` as the standing
  append-target. The dist byte-neutrality grep is build-time (dist absent in tree) — build-then-grep per §2's own-baseline. The chain-site list is wider than §1 prose (saturate at glass.css:135/168 + dark-arm:285) — diff against spike `c0f6e1ee` as authoritative.

### PT-3 — bg-paint.wf.js null-guard hardening (C8a [HIGH]) — **conv 62%** — IMPLEMENT spike
**Verdict:** class real, feasible, 3/4 guards correct; **the spiked diff must NOT land verbatim.**
**Open (mustResolve):**
- **LOAD-BEARING: the batched-judge guard.** Do NOT use `.catch(()=>null)` + `.filter(Boolean)` (DROPS a
  crashed/session-limited wave → synth's `allPass` greens over survivors while the dropped wave stays
  PAINT-PENDING — a silent over-green on the close-decision surface). **Mirror `bg-bh-execute.wf.js:212`'s
  id-preserving FAIL-default** so a crash counts as a FAIL and surfaces in `failed[]`. The "mirrors bg-bh-execute
  exactly" claim is FALSE on this call.
- **Synth reconciliation:** hand the synth the FULL expected id set (`pp.waves.map(w=>w.id)`); assert verdicts
  cover every expected wave (the synth currently receives only survivors and cannot detect a short count).
- Confirm `develop-execution-plan.wf.js` (7 un-guarded `agent(`, same dir) is truly retired; validate the patch
  through the REAL `Workflow()` harness (the two NEW early-returns), not the hand-rolled async-fn-wrap proxy.
- No standing gate covers the `.wf.js` engine surface — the null-guard hardening is discipline-only (an
  ungated residual). Correct the count: **4** un-guarded `agent(`, not 3.

### PT-4 — shader-fence to the SHIP operator + F2 scalar + dual-stack parity (C4 [HIGH]) — **conv 62%**
**Verdict:** structural skeleton sound (dual-stack hole real, F2 box-shadow collision real, the `--glass-chromatic-strength`
mint is the verbatim §18 convention); **but the spec recursed the class-U friction it exists to kill.**
**Open (mustResolve) — DOMINANT first:**
- **DOMINANT (class-U recursion): re-anchor.** The §1 delta table + §2c parity numbers analyze the pre-WS8 pilot
  `src/composables/glass/webgpu/glassShader.wgsl` (chromatic `*0.003`). But WS8 §2 lands
  `audit/glassShader-tier2.wgsl` (chromatic `*0.004`, squircle-prof rim, 60%-mix — a THIRD operator set per
  `SPEC-pass4-converged.md:161,189`). The fix corrected the GLSL anchor but anchored the WGSL on the
  soon-to-be-overwritten pilot. Re-anchor to `audit/glassShader-tier2.wgsl`.
- **F6 mean≤2.0 requires operator-SHAPE parity** (rim metric + compositing + magnitude), not magnitude alignment.
  WS8 §2 must mandate the WGSL chromatic+refraction operators are **line-for-line TRANSCRIBED** from
  `glass-refract.glsl.ts` (the aurora.wgsl↔aurora.frag discipline on the SHADER, not just the CPU-capture producer)
  — the §2c † must say "operator transcribed", not "constant aligned".
- **Blast radius:** add the un-amended authoritative docs — `AMENDED-WAVE-PLAN.md` (lines 59,70,160,163,167,169,226
  carry the type-collision + prototype anchor) and `SPEC-pass4-converged.md` (still carries `uDispersion` Δ5 +
  the wrong `src/glassShader.wgsl` path). Resolve the NEW name-collision: `--glass-chromatic-strength` scalar vs
  the existing `.glass-chromatic` box-shadow CLASS (`surfaces.css:416`). Name the glass-refract uniform-WRITE
  bridge home (the aurora bridges are aurora-PRIVATE; glass-refract needs its own colocated leaf).

### PT-5 — new-token substitution/dead-knob discipline + a catching gate (C3 [MOD-HIGH]) — **conv 68%**
**Verdict:** feasible + directionally right; every ground-truth claim verified TRUE; the per-wave discipline-record
amendments are sound (only `--siri-island-t` owes a fresh registration). **But the closure has scoping holes that
leave the gate catching mostly the hand-enrolled subset.**
**Open (mustResolve):**
- **KILLER: TD-CLOSE-A scope hole.** The closure scans only `property-regs.css`, but `@property` lives across
  ≥10 files (63 total, ~26 external) — including the gate's OWN R5-1 exemplar `--dock-scale`/`--dock-local-scale`
  (registered in `dock.css`, override-scope in `dock/overflow.css`). **Widen TD-CLOSE-A to the whole
  `src/styles` @property corpus**; the seed manifest must enumerate the full existing set or the gate is
  born-RED-and-stuck and blind to its headline case.
- **Dead-knob + peer closure still rests on hand-authored maps** (`DERIVED_PEERS`/`KNOWN_KNOB_INPUTS`/
  `INERT_INPUT_ALLOWLIST` — the drift it claims to kill). Derive `KNOWN_KNOB_INPUTS` from the manifest; compute
  TD-A2 override-scopes STRUCTURALLY (scan every rule declaring a knob, assert the peer is re-declared there).
- Resolve the §4.1-vs-§4.4 contradiction (`--siri-island-t`/`--glass-key-direction` listed as SEED rows but they
  don't exist until WS6/WS9 → a seed row reds at landing). Reconcile the ledger gap (no arm for recurrence #1, the
  AX.W55 `@container`-self-match) — scope the claim or add the arm. Record-only: `--glass-key-direction` is a raw
  CONSTANT input (mis-archetyped C); the "lands after G4" rationale is factually wrong (token exists at HEAD).

### PT-6 — decoupled-paint adjudication + green-signal narrowing (C8b/C5 [HIGH/MED]) — **conv 56%**
**Verdict:** directionally correct + source-grounded on its 3 mechanisms; **the HEADLINE feasibility claim is FALSE at HEAD.**
**Open (mustResolve) — A is the central crack:**
- **A: `--run ci` is NOT green-able after the trio re-tag.** `proof:tag-parity` is RED (category-card-warm mis-tag)
  AND `proof:consumer-staleness` is RED (72 un-ledgered stale imports) — both ci-tagged, both independent of the
  trio, both hard-exit `--run ci`. **The trio (ba-gestalt/ship-attestation/close-sweep) is not exhaustive.**
  Either classify+fold every structural mid-dev red, or DOWNGRADE the §3 verdict to "the trio's close-oracle
  poison removed; residual reds are a separate enumeration this fix does not close."
- **B/C: disease re-introduction.** Re-tagging ba-gestalt OUT of the mid-tranche sets BEFORE a non-skippable
  per-band signal exists is **strictly worse than HEAD** for disease detection. Re-order so §3 (re-tag) **GATES on
  §1-A (per-band HALT) landing as hard engine logic** — and the §2 BUILT-widen deletes the natural paint
  backpressure, so the band-boundary HALT predicate is NEW engine logic that does not fall out of `ready()`.
  The three legs are a **dependency chain (§2→§1-A→§3)**, not the independent edits §4 claims.
- **E: the recommended catcher false-positives** on `proof:visual-runner` (carries `['local','ci']`, note matches
  `/BORN-RED/`, but is exit-0 reported-in-facts = legitimately ci). Distinguish hard-exit-poison from
  exit-0-reporting born-RED — else the catcher recreates the static-classifier false-positive it unwinds.
- **F: wrong doc-home.** §3 routes the CLAUDE.md:20 tag-intent reconcile to a file **BH B4f hard-deletes** (no
  replacement; BG+BH cut jointly as 5.0.0). Target the BH B4b redistribution home, or the edit is lost at the delete.
- The stall fix is sound (3.1/3.6 PAINT-PENDING now; `BUILT={DONE,PAINT-PENDING}` widen correctly placed) — but
  §2 is a build-on-landed-source TRADEOFF (a PAINT-FAIL re-implements the [P] wave at root → successors built on
  paint-pending source may need rebase), not a pure win.

---

## 4. THE LOWER-SEVERITY ISSUES (C6–C14) — diagnosed, routed, NOT yet prototyped

These were not in the 6-PT set; PASS 2 owes them a resolution prototype. Status from the spec, unchanged:

- **C6 [HIGH] BG↔BH canon-home split** — G3 homed at `docs/tranches/BG/canon/` while the realized BH scaffold +
  `canon-doc.mjs` resolver home all cross-cutting canon at `docs/canon/` (no close-sweep key). Reconcile G3 to
  `docs/canon/`; register the `G3(WS7)→B4b-content(WS12)` shared-write edge.
- **C7 [MED] foreign-tree deny-belt** gitignored + literal-prefix-narrow. Durable protection = prose fence +
  tracked `verify-siblings-intact.mjs`; the belt is defense-in-depth, not the fence.
- **C9 [MED] live-fix collisions** — D-2 demo-warm grain double-warms under WS9 GRAIN-REAL (no reconcile/retire
  wave); D-3 directional `--dock-expand-t` read sits in WS2's orchestrator rewrite gated by the WRONG proof
  (`dock-orchestrator-single`, not the D-3-protecting `dock-engine E4`).
- **C10 [MED] no standing retired-token × sibling-grep gate** — bbnf-buddy reads `--glass-blur-dock` as a live
  override (`preset.css:230`) → G4's "0 orphan readers" is internal-only; speedtest's `.glass-refract` is a
  4.1.0-stale no-op G1 finalizes by deleting `glass-refract.css`. Make the inv-11 probe real for TOKENS.
- **C11 [MED] carve→re-grow chain has no post-WS9 re-carve owner** (folded into PT-2 partially; the owner
  assignment + the WS9 grain file-target re-point `ladder.css`→`grain-overlay.css` remain).
- **C12 [MED] BG↔BH drift** — `proof:claude-deletable` absent from B4f; value floor `^1.2.0` stale in `[C]`-early
  B1-W2 (reds peer-conformance — reconcile BEFORE B1 runs); doc-override re-home undersold; `commit-msg` shared writer.
- **C13 [LOW] HEAD numeral drift** — `6369ad6e`≠`4c761b64` in the plan header (assign to a Band-0 ledger wave).
- **C14 [LOW] unowned-directive + doc residue** — goo-morph-pager/deck directive owner; SiriIsland export-count
  softening; 3-dock-page roster decision; D-G2 conflation (10-roster vs all-120); Firefox-146 `contrast-color()` doc-freshen.

---

## 5. CONVERGENCE — honest aggregate

| Component | Conv | Note |
|---|---|---|
| Diagnosis (C1–C14, friction A–U) | ~85% | independent lenses cross-confirm C1/C2/C4; verified against `src/` |
| HIGH/MOD-HIGH resolutions (PT-1…PT-6) | ~67% avg | (82+73+62+62+68+56)/6; 3 carry do-not-land/false-headline/wrong-anchor |
| Lower-severity resolutions (C6–C14) | ~50% | diagnosed + routed, NOT prototyped |
| **Overall aggregate** | **66%** | up from the 58% PASS-1 baseline — proto+crit confirmed feasibility and sharpened all 6, but every one has material opens |

**readyToDevelop = FALSE.** Four HIGH coherence resolutions still carry unresolved material opens; PT-6's headline
is false at HEAD; PT-3's spiked diff must not land verbatim; PT-4 mis-anchored. The lower-severity resolutions are
not yet prototyped.

---

## 6. PASS 2 FOCUS (the handoff)

Re-spec each of the 6 resolutions with the crit `mustResolve` items folded in, **priority order by residual + blast radius**:

1. **PT-6 / C8b+C5** — enumerate the FULL `--run ci` red set (the trio is not exhaustive: tag-parity +
   consumer-staleness independently red); re-order so the ba-gestalt re-tag GATES on a non-skippable per-band HALT
   (the §2→§1-A→§3 chain); scope the catcher off the visual-runner false-positive; re-home the CLAUDE.md tag-intent into BH B4b.
2. **PT-4 / C4** — re-anchor to `audit/glassShader-tier2.wgsl`; mandate operator-SHAPE transcription (not magnitude
   alignment) for F6 mean≤2.0; sweep the un-amended AMENDED + SPEC-pass4 docs; resolve the `.glass-chromatic` name-collision.
3. **PT-3 / C8a** — id-preserving FAIL-default on the batched judge (do NOT land the spike's `.catch(()=>null)`);
   synth reconciliation over the full expected id set; REAL-harness validation.
4. **PT-2 / C2** — pin the precond token = the EXACT `BG.W-CLOSEFIX-9SITE` node id + a boot assert it is DEFINED
   (the deadlock risk); elevate the DAG dry-run to a binding boot assertion; quantify the shell.css re-grow headroom.
5. **PT-5 / C3** — widen TD-CLOSE-A tree-wide; structuralize the dead-knob/peer detection (no hand-authored maps);
   reconcile the §4.1-vs-§4.4 seed contradiction.
6. **PT-1 / C1** — re-rank the durable path (fold into the Band-0 WS7 ledger wave PRIMARY); bind the KEEP exemption
   to the gate's exact `RETIRE_RE`; content-anchored edits; home the idiom in the protocol canon.

**Plus prototype the un-prototyped lower-severity resolutions:** C6 (canon-home reconcile to `docs/canon/`), C9
(live-fix collisions — D-2 reconcile/retire owner, D-3 E4 gate-binding), C10 (the standing retired-token ×
sibling-grep gate — make inv-11 real for tokens), C12 (the value `^1.2.0`→`^1.1.1` reconcile BEFORE B1 runs).

**Method note:** sibling-greps use arrays + `--exclude-dir` for consumer `dist`/`test-results`/`trace` from the
start. Verify shader-fence uniforms + WGSL targets against `src/` AND the file WS8 §2 actually lands
(`audit/glassShader-tier2.wgsl`), never the converge-prototype JSON.

---

## 7. VERDICT

PASS-1 is complete: the coherence baseline (58%) is established and the 6 highest-severity resolutions are
feasibility-confirmed + one critique-round deep, lifting the aggregate to **66%**. The BG plan remains the most
friction-aware tranche in the corpus; **no coherence issue is a feasibility blocker** — all are addressable
plan-amendments. The work that remains is to fold the critique `mustResolve` items into a second-pass re-spec of
each resolution (PT-6's false-headline and PT-4's wrong-anchor are the two that re-bit the friction classes they
target, so they lead), and to prototype the lower-severity resolutions C6/C9/C10/C12 that PASS 1 routed but did not draft.

Living master: `COHERENCE.md`. Baseline + proto/crit established for PASS 2.
