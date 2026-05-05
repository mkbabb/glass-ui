# G — Post-close challenge audit α (plan-vs-actual diff + chronically deferred)

**Agent**: G.audit.α.
**Date**: 2026-05-04.
**Scope**: post-close audit of tranche G against its plan, residuals, and overfitting-audit claims. Read-only.
**Methodology**: line-by-line walk of every wave spec (W0–W5, Wβ0–Wβ3) against `PROGRESS.md` + `FINAL.md` + per-wave proofs. Spot-checks against on-disk source for evidence verification. Sum-of-parts check on per-consumer ledger projections vs. close-doc aggregate claims. Substrate-with-consumer falsification on a random subset of W3/Wβ artefacts.

Disposition tags: **accepted** (finding stands, action recommended), **narrowed** (contains a real finding, smaller in scope than initially stated), **rejected** (claim falsified by artefact), **speculation** (no artefact gives evidence either way).

---

## 1. Plan-vs-actual table (per-wave)

Format: scope item from wave spec → on-disk landing status → disposition.

### W0 — Ledger consolidation + measured baselines + challenge

| Spec scope | Landed | Disposition |
|---|---|---|
| α: gap classification + bbnf fold-in (`audit/W0-gap-classification.md`) | Yes | **accepted** |
| β: hygiene + DESIGN.md drift + silent-failure inventory (`audit/W0-design-md-drift.md`, `audit/W0-silent-failures.md`) | Yes | **accepted** |
| γ: per-consumer drift baselines at HEAD (`audit/W0-baseline-drift.md`) | Yes | **accepted** |
| Challenge synthesis with rescinded retirements + amended W1–W5 (`audit/W0-challenge.md`) | Yes (`docs/tranches/G/audit/W0-challenge.md:42-52`) | **accepted** |

W0 closed clean.

### W1 — Token foundations

| Spec scope (`waves/W1.md`) | Landed | Disposition |
|---|---|---|
| Cream namespace (`--cream{,-warm,-cool,-edge,-foreground}`) | `tokens.css`, `theme.css` exposed | **accepted** |
| Paper tier tokens (`--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}`) | Yes | **accepted** |
| Display-mega + display-ultra typography rungs + per-rung Fraunces axes | `typography.css` confirms | **accepted** |
| Icon scale `--icon-{2xl,3xl,mega}` + `@theme` size aliases | Yes | **accepted** |
| `--shadow-cartoon-accent` recipe + `--cartoon-accent-color/-mix` hooks | Yes | **accepted** |
| `--type-formula` | Yes | **accepted** |
| `--space-phi-{1..4}` + `--spacing-phi-*` `@theme` aliases | Yes | **accepted** |
| `--rainbow-pastel-*` `@theme` exposure | Yes | **accepted** |
| `--shimmer-blue-{dark,mid,light}` | Yes | **accepted** |
| `--blob-*` primitives (8 tokens) | Yes | **accepted** |
| `chartNeutrals` + `vizColorsHex` runtime helpers in `src/tokens.ts` | Yes | **accepted** |
| Retire `--section-heading` + `brand-uniform-sans` block | Yes (`tokens.css:205` carries explanatory comment) | **accepted** |
| **DESIGN.md drift sync (57 rows + 8 NEW-token sections + 5 verify-row dispositions)** | **No** — DESIGN.md is at master-state 916 lines; G-token mentions number 4 (3× `--shimmer-blue-*` rows + 1 stray "warm-cream" prose ref). Cream namespace, paper tier, display-mega/ultra, blob tokens, space-phi, shadow-cartoon-accent, icon-mega all undocumented. | **accepted — silent miss** |

**Hard-gate (e) of W1.md**: "DESIGN.md drift closed (57 rows + 2 phantom utilities + new-token sections; the 5 'verify' rows confirmed against current source)." This gate is **not closed**. The W6-residuals R1 narrates the regression as deferred, but per `docs/precepts/instructions/tranche/SPEC.md` close criteria — "every hard gate has evidence" — and `docs/precepts/instructions/README.md` Gates section — "explicit document update required by the plan" — DESIGN.md sync is the artefact. Its absence at close means W1's hard gate (e) was not met. See R1 in §3 below.

### W2 — Surface CSS + utilities

Spot-check: `src/styles/utilities.css` contains the 49 classes (one per family per spec); `src/styles/math.css` (123 lines) contains `.production-rule`, `.perf-{number,unit}`, etc.; `src/styles/prism-theme.css` (151 lines) is opt-in via `package.json` `./styles/prism-theme` export.

| Spec scope | Landed | Disposition |
|---|---|---|
| Lane I — paper.css `.paper-{1..4}` + `.paper-card` + `.paper-rule`; cards.css `.cream-surface` + tone variants | Yes | **accepted** |
| Lane II — 49 utility classes (flourish/skeuo/typography/mono/misc) | Yes | **accepted** |
| Lane III — math.css default-included | Yes (`index.css` cascade) | **accepted** |
| Lane IV — prism-theme.css opt-in | Yes (`package.json` export) | **accepted** |
| Single style authority per family (no duplicate definitions) | **Partial** — `paper-grain-overlay` `@utility` exists at `paper.css:29-44`, but `.paper-card::after` (`paper.css:95-106`) and `.cream-surface::after` (`cards.css:34-45`) **re-implement** the same data-URL SVG turbulence + `::after` overlay rather than composing the utility. Three sites of the same noise overlay in three places. | **accepted — duplicate authority** |
| Silent failures resolved per W0 challenge §B.3 | Yes (S1–S7) | **accepted** |
| `.gold-shimmer` retired (clean break, no shim) | Yes per `W2-utility-proof.md:27` | **accepted** |
| `.glass-skeuo` / `.active-scale` / `.disabled-base` not re-added | Yes per grep | **accepted** |

W2's hard gate (e) "no duplicate authority across files" is contradicted by the paper-grain `::after` triplication. Recommend: refactor `.paper-card` and `.cream-surface` to compose `paper-grain-overlay` rather than re-emit the SVG.

### W3 — Components + CVA branches + composables

Spot-check disposition: every claimed package directory exists under `src/components/custom/` (42 packages on disk, including the 17 new G.W3 + Wβ2 packages). CVA branches present in respective `index.ts` files. Composables present in `src/composables/{color,motion,monaco,utils,blob}/`.

| Spec scope | Landed | Disposition |
|---|---|---|
| 14 new custom packages (Lane 1–5, 3 from residual recovery) | Yes | **accepted** |
| 14 CVA branches | Yes | **accepted** |
| 4 composables: `useRAFLoop`, `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme` | Yes | **accepted with overfitting** (see §6) |
| 3 slot-class props: `HoverCardContent.contentClass`, `DialogContent.closeIconClass`, `DockLayerGroup.keepOpenWhile` | Yes | **accepted** |
| `defineDockActionBar` factory | Yes (`dock/index.ts:45`) | **accepted with overfitting** (see §6) |
| 5 runtime helpers in `src/tokens.ts` | Yes | **accepted with overfitting** (see §6) |
| `useRafLoop` driver per Wβ1 spec | **Silent addition** — landed as a *second* function alongside `useRAFLoop`, not as a name reconciliation. Both `useRAFLoop` (per-instance, used) and `useRafLoop` (shared coalescer, unused) ship from `src/composables/motion/useRAFLoop.ts:83` and `:361` respectively, both exported from the barrel (`motion/index.ts:17,22`). Retro frames this as "non-load-bearing"; in fact it duplicates the same conceptual surface with two distinct semantics. **Zero in-repo callers of the shared `useRafLoop`** (only docstrings). | **accepted — silent dual-API** |
| `<KeyframeTimeline>` family (4 components) | Yes (`timeline/`) | **accepted** |
| `<TierBadge>` + `<LikeButton>` | On-disk only | **accepted — overfitting** (see §6) |

`W3-component-proof.md:96` admits the W1+W2 stash regression. Recovery happened, but DESIGN.md sync re-application was deferred (R1).

### W4 — Storybook taxonomy

Spot-check: 25 new + 2 refactored + 1 renamed stories present on disk (`demo/stories/{foundations,primitives,containers,motion,compositions,_internal}/`). `manifest.ts` contains every required entry per `s("category", "id", ...)` rows.

| Spec scope | Landed | Disposition |
|---|---|---|
| `foundations/cream`, `foundations/golden-ratio`, `foundations/flourishes`, `foundations/icons` (NEW) | Yes | **accepted** |
| Refactor `foundations/typography` | Yes | **accepted** |
| Primitives stories (icon-stamp, cartoon-controls, color-pill, notification-dot, pipeline-flow, live-snippet, badge-tones, toast-inverse, toggle-card, blob) | Yes (10 of 10) | **accepted** |
| Containers (cream-card, paper-card, well-dashed) | Yes | **accepted** |
| Motion (display-axes, bezier-canvas, timeline, confetti) | Yes | **accepted** |
| Compositions (audacious-hero, dictionary-pronunciation, prose-block, code-prose, math-paper refactor, hero-quiet rename) | Yes | **accepted** |
| **`primitives/tier-badge` story** (re-emergence after Lane 3 added `<TierBadge>` + `<LikeButton>`) | **No** — `TierBadge.vue` and `LikeButton.vue` ship public; **no story site, no demo composition** that uses them | **accepted — silent narrowing** (see §6) |
| Design-fidelity gate per story (`audit/W4-design-fidelity.md`) | **Missing artefact** — Wβ3 has its own `Wβ3-design-fidelity.md`, but the main W4 design-fidelity audit doc named at W4.md "Design fidelity gate" section ("orchestrator records pass/fail per story in `audit/W4-design-fidelity.md`") **does not exist** under `audit/`. | **accepted — missing artefact** |

### W5 — Consumer migration ledgers + close

Spot-check: 6 ledgers exist (counts: speedtest 174, fourier 307, words 305, keyframes 244, value.js 72, bbnf 259 lines). All cite W0.γ baselines.

| Spec scope | Landed | Disposition |
|---|---|---|
| `W5-{speedtest,fourier-analysis-web,words-frontend,keyframes,bbnf-lang-playground}-migration.md` | Yes | **accepted** |
| `W5-value-js-migration.md` finalized | **No** — file ends at line 63 with header `## Section to be filled in main G.W5`; line 65 admits "Remaining ledger rows in main W5 are projected to absorb the remaining 41 unique drift rows from value.js's W0.γ baseline of 61." Only 20 of 61 rows ledgered. | **accepted — silent narrowing** |
| `W5-self-audit.md` | Yes | **accepted** |
| `W5-overfitting-audit.md` | Yes | **accepted with falsified rows** (see §6) |
| `W6-residuals.md` ≤5 | Yes (5 residuals) — but R2 and R1 are arguably hard-gate-blockers, not residuals (see §3) | **narrowed** |
| Aggregate post-migration drift "≤25 unique-row across all six consumers" (`FINAL.md:83`) | **Falsified** — sum of per-ledger projections: speedtest 8 + fourier ~6 + words 4 + keyframes 9 + bbnf 2 + value.js (≥41 unresolved per ledger admission) = **≥70** unique-row. The "≤25" headline assumes value.js ledger is complete; per its own line 65 it is not. | **rejected — false aggregate** |

---

## 2. Silent additions and silent narrowings (process precepts)

Per `docs/precepts/instructions/README.md` Edicts: "**No silent deferrals.** Planned work lands, is formally retired, or moves to a named destination with rationale."

### Silent additions
1. `useRafLoop` (lowercase shared coalescer) — added alongside `useRAFLoop` rather than replacing it. Two APIs in one module. Retro narrates it as "non-load-bearing naming reconciliation"; per artefact (`useRAFLoop.ts:277-389`), both functions are exported and have distinct semantics. **`useRafLoop` has zero in-repo callers**.

### Silent narrowings
1. **DESIGN.md sync** — landed in W1 (916→1081), reverted by Lane 4 stash regression, never re-applied. R1 declares this "deferred to small follow-up pass" — but W1 hard-gate (e) was not retracted; it was implicitly weakened to "DESIGN.md is documentation, not source-of-truth." Per `docs/precepts/instructions/tranche/SPEC.md` "Brittleness Window": this is exactly what brittleness windows are for, and they require explicit declaration. None was declared.
2. **value.js ledger** — declared complete in FINAL.md and W5-overfitting-audit; ledger itself admits 41/61 rows unresolved.
3. **`<TierBadge>` + `<LikeButton>` stories** — W3 spec required ≥2 call sites including W4 story sites; the W4 spec lists `primitives/tier-badge` neither in Lane I nor Lane II, but the components shipped public anyway. The `feedback_overfitting_audit` ≥2-bar is unmet for both.
4. **Aggregate drift residual** — FINAL.md `≤25 unique-row` implies the ledgers sum to ≤25; per-ledger admissions sum to ≥70 because value.js is incomplete.

---

## 3. Chronically deferred items — falsify or harden

### R1 DESIGN.md sync re-application

**Status claimed**: "deferred to a small follow-up pass" (`audit/W6-residuals.md:11-16`).

**Falsification**:
- `DESIGN.md` is currently 916 lines. The original W1 sync produced 1081 (`PROGRESS.md:103`).
- Grep confirms 4 G-token mentions total (3× `--shimmer-blue-*` and 1 stray "warm-cream").
- Cream namespace, paper tier, display-mega/ultra, blob tokens, space-phi, shadow-cartoon-accent, icon-mega — none documented.
- Per `docs/precepts/instructions/tranche/SPEC.md` Hard Gates accepted forms: "explicit document update required by the plan" — W1 hard-gate (e) named DESIGN.md sync as the artefact.
- Per same SPEC.md Brittleness Window: "The close ceremony cannot run while a brittleness window is open." A regressed mandatory document is exactly a brittleness window.

**Disposition**: **accepted — escalate**. R1 is not a residual; it is an **unmet W1 hard gate**. The close-clean status of G is therefore not honestly earned at the W1 layer.

**Recommendation**: ship now. The work is mechanical (re-apply `audit/W0-design-md-drift.md` + add 8 NEW-token sections). One agent, one file, ~1 hour. Either:
- **(a)** open G-II.W1.docs explicitly, declare retroactive brittleness window from W1 close to G-II.W1 close, fix DESIGN.md, then close G-II; or
- **(b)** orchestrator absorbs and re-applies the sync directly (no agent dispatch needed), records evidence, retracts R1 from `W6-residuals.md` and updates FINAL.md.

(b) is simpler and matches `docs/precepts/instructions/ORCHESTRATION.md` "Stalls And Scope Dilation §1: absorb."

### R2 Wβ3 stress runtime profile

**Status claimed**: "deferred to consumer-CI capture per Wβ3 spec" (`audit/W6-residuals.md:18-23`).

**Falsification**:
- Wβ3.md hard gate (c): "stress test passes SPEC.md §9 performance budget."
- `Wβ3-stress-proof.md:34-37`: "Manual measurement at consumer adoption; this tranche close tracks the delta presence (✓), not the absolute number."
- `Wβ3-stress-proof.md:54-55` claims hard gate (c) closed via "(c) bundle delta is measurable via `npm run build` ✓" — but the original gate was "**passes** the budget", not "is measurable".
- Per `docs/precepts/instructions/README.md` Gates: invalid hard-gate forms include "consumer will be wired later." R2 is exactly this pattern.

**Disposition**: **accepted — narrowed**. The runtime numbers do not need to land in this tranche if the gate is rewritten honestly. The current FINAL.md framing is dishonest; it claims the gate closed when the artefact only describes the *contract*, not the *measurement*.

**Recommendation**:
- Rewrite Wβ3.md hard gate (c) to: "**stress test contract documented + capture path defined** (`Wβ3-stress-proof.md` §Proof contract); runtime numbers captured at consumer-CI adoption". This is honest about what the artefact actually proves.
- Or: orchestrator runs the profile manually in Chrome DevTools against the dev server one time, records numbers, and the gate genuinely closes. Eight `<Blob>` instances at 6rem on M-class hardware is a 30-minute exercise.

### R3 `<Slider variant="glass-track">`

**Status claimed**: "deferred per W3 spec; needs the dock-keep-open round-trip refactor."

**Falsification**:
- `W3.md:123`: "No Slider `glass-track` variant — needs the dock-keep-open round-trip refactor; defer to a smaller maintenance wave or split off."
- Synthesis gap 40 (`research/00-synthesis.md:148`): "3 fourier-analysis sites + 2 EditorControlsDock/EditorToolsPanel inputs evidence the gap; they migrate when the variant ships."
- `DockLayerGroup :keepOpenWhile` shipped in G.W3 (`W3-component-proof.md:69`). The dependency is **already met**.
- The fourier W5 ledger row `C-23` (`audit/W5-fourier-analysis-web-migration.md`) cites three independent slider implementations totalling ≥150 lines that stay consumer-side because of this deferral.

**Disposition**: **narrowed**. The stated dependency (dock round-trip refactor) was satisfied during G; the deferral rationale is stale.

**Recommendation**: open in G-II or H as a small CVA branch on `Slider.vue`. The work is bounded (one variant, one slot-class prop for the track) and has 5 measured consumer sites. KISS.

### R4 `<HarmonicLevelGrid>` / Filmstrip primitive

**Status claimed**: "out of scope per ≥2 bar; single-consumer (fourier-analysis only)" (`audit/W6-residuals.md:30-34`).

**Falsification**:
- Lane C report (`research/C-fourier-analysis-web.md`) is the sole evidence cited.
- Re-grep across all six consumer trees: not surveyed in W0.γ; no second consumer surfaced.

**Disposition**: **accepted — narrowed**. R4 is correctly deferred. The per-feedback rule (`feedback_overfitting_audit`) binds.

**Recommendation**: keep deferred. If a second consumer surfaces in a future tranche's research wave, promote.

### R5 Blob Web Worker

**Status claimed**: "deferred per SPEC.md §11.4 lock; revisit at 8+ multi-instance use cases" (`audit/W6-residuals.md:36-40`).

**Falsification**:
- `blob/SPEC.md:` `§11.4` lock recorded in PROGRESS.md (`docs/tranches/G/PROGRESS.md:53`): "Web Worker → **deferred** (revisit at 8+ multi-instance use cases)".
- Wβ3 stress story renders 8 instances; runtime numbers unverified (R2).
- No consumer currently runs 8+ instances per W5 ledgers.

**Disposition**: **accepted**. The lock decision still holds; signal-driven promotion criterion is well-formed.

**Recommendation**: keep deferred. The R5 deferral is the cleanest of the five.

---

## 4. Cross-tranche debt

| Source | Item | Status post-G | Disposition |
|---|---|---|---|
| F.W6 R1 (`useGlassCarousel` mid-unmount mutation) | P3 lifecycle hardening | Untouched in G; no regression introduced | **accepted — out of scope for G** |
| F.W6 R2 (`demo/stories/foundations/intro.vue` category-data duplication) | P3 polish | Untouched | **accepted — out of scope** |
| F.W6 R3 (route runtime proof depth) | P3 | Untouched | **accepted — out of scope** |
| F.W6 R4 (Aurora oil DPR-2 GPU timer reliability) | P3 | Untouched | **accepted — out of scope** |
| F.W6 R5 (`dist/src` declaration tarball hygiene) | P3 | Untouched | **accepted — out of scope** |
| Plugin extraction (deferred since F) | "Out of scope" per `G.md:90` and `W5.md:151` | Still deferred | **accepted — chronic but bounded** |
| C.W4 + C.W5 prior overfitting decisions | `cartoon-card` / `elevated-card` removal | Confirmed clean per `cards.css:1-7` comment | **accepted — clean** |
| D.W4 + D-II residuals | D-II has no FINAL.md (in-flight) | Out of scope for G | **speculation** — D-II's status is not G's job, but G should not add new debt that competes |

G's prelude correctly notes "no blocking residual intersects." Verified.

---

## 5. Wave-shape audit — KISS / one path

| Wave | KISS? | Finding |
|---|---|---|
| W0 | Yes | 3 lanes, disjoint inputs, single synthesis. |
| Wβ0 | Narrowed | Agent stalled at watchdog; orchestrator absorbed. Per ORCHESTRATION.md scope-reveal §1 ("default to absorb"), this is canonical. |
| W1 | **No** | Orchestrator-direct + parallel DESIGN.md agent. The DESIGN.md sync was reverted by a downstream Lane 4 stash regression and never re-applied. The wave's own hard gate (e) was not honored at close. **One path was promised; two surfaces shipped (tokens applied; docs not applied)**. |
| W2 | Narrowed | Lane I + 3 parallel agents. `paper-grain-overlay` `@utility` exists but `.paper-card` and `.cream-surface` re-implement the SVG turbulence inline rather than composing the utility — **duplicate authority across 3 sites**. KISS / DRY violated. |
| W3 | **No** | 5 lanes + 3 residual-recovery dispatches **+ stash regression recovery via orchestrator-direct re-application**. Two recovery layers stacked. Per CHALLENGE.md "Synthesis Rule": fix-on-fix is what triumvirate dispatch is supposed to prevent. The retro names this in `G-retro.md:41-44`; LESSONS-LEARNED commit pending (`G-retro.md:50-53`). Additionally: **`useRafLoop` and `useRAFLoop` ship as separate functions in the same file**. KISS violated; should be one driver. |
| Wβ1 | Narrowed | 3 parallel lanes + watchdog stalls. Recoveries similar to W3. |
| Wβ2 | Yes | 2 parallel lanes; clean. |
| W4 | Narrowed | 2 lanes; 1 downstream type fix (`ToggleGroup.vue` widening); `confetti-fall` keyframe re-applied after stash regression. The keyframe re-application is the third fix-on-fix surface from the Lane 4 incident. |
| Wβ3 | **No** | 1 agent landed two story files before org limit; orchestrator absorbed audit docs + BLOB-FINAL.md. Stress runtime profile contract documented but not measured (R2). Hard gate (c) closed by paraphrase, not by measurement. |
| W5 | Narrowed | 5 ledger agents + orchestrator absorb of close ceremony. The value.js ledger explicitly admits 41/61 rows unresolved; close docs claim 6 ledgers complete. |

**Aggregate**: G ran 5 KISS-violating recovery layers (Lane 4 stash regression → cards/paper/utilities/tokens/typography/index/theme/tokens.ts re-application; DESIGN.md sync re-dispatch failure; `confetti-fall` re-apply at W4; W5 close-ceremony absorption; `useRafLoop`/`useRAFLoop` dual API). The two distinct API surfaces in `useRAFLoop.ts` is the **only one not declared** in PROGRESS.md or FINAL.md.

---

## 6. Substrate-without-consumer spot-check (5 random artefacts)

The W5 overfitting audit (`audit/W5-overfitting-audit.md`) claims every artefact cleared the ≥2 call-site bar, with the bar trigger being "consumer-ledger projection + W4 story site." Methodology: `grep -rln "<symbol>" src demo` excluding the symbol's own definition file and barrel. **Reveals**:

| # | Artefact | W5 audit claim | Verified | Disposition |
|---|---|---|---|---|
| 1 | `<TierBadge>` | "demo + fourier 4 sites" (`W5-overfitting-audit.md:69`) | `grep -rln 'TierBadge' demo` → empty; only `src/components/custom/tier-badge/TierBadge.vue`. **No demo, no story, no other src consumer.** | **rejected — falsified** |
| 2 | `<LikeButton>` | "demo + fourier 2 sites" (`:70`) | Same pattern: only own definition file. | **rejected — falsified** |
| 3 | `defineDockActionBar` | "value.js DockActionBar interface ledger" (`:111`) | `grep -rln 'defineDockActionBar' src demo` → only `src/components/custom/dock/index.ts:45`. **Zero in-repo callers.** | **rejected — falsified** in repo; only consumer-projection. |
| 4 | `useContrastSafeAccent` | "value.js 4 sites" (`:97`) | Only `src/composables/color/useContrastSafeAccent.ts`. **Zero in-repo callers.** | **rejected — falsified in repo**; consumer-projection only. |
| 5 | `useMonacoTheme` | "bbnf 1 + ledger projection" (`:98`) | Only `src/composables/monaco/useMonacoTheme.ts`. **Zero in-repo callers.** | **rejected — falsified in repo**; single consumer pre-shipping. |

**Bonus**: `spectrumColor`, `goldenShimmer`, `chartNeutrals`, `vizColorsHex`, `useCollapse`, `useRafLoop` (lowercase) — all six have **zero in-repo callers** beyond `src/tokens.ts` self-references or the barrel re-export.

**Per the precept** (`docs/precepts/instructions/README.md`): "Substrate with consumer. New abstractions land with a runtime caller, test, benchmark, or other proof that the abstraction is consumed." These eleven artefacts ship as exports without an in-repo runtime caller — i.e., the substrate is shipped without proof of consumption. The W5 overfitting audit's "consumer-ledger projection + W4 story" interpretation of the ≥2 bar is **looser** than the precept text. Per `feedback_overfitting_audit`'s stated rule: "every src/ artefact has ≥ 2 sites or is exported or is private demo helper." The "or is exported" clause is a loophole that reads against the spirit; an export that nothing imports is dead surface area.

**Net**: 11 of ~72 artefacts (15%) ship without an in-repo consumer despite passing the W5 audit's loose interpretation.

---

## 7. Recommendations

In order of bite:

### 7a. Ship now (R1) — re-apply DESIGN.md sync
**File**: `DESIGN.md`.
**Work**: re-apply `docs/tranches/G/audit/W0-design-md-drift.md` rows 1–57 + add 8 NEW-token sections (cream / paper / display-mega-ultra / per-rung Fraunces / shadow-cartoon-accent / space-phi / shimmer-blue / blob primitives + icon-2xl/3xl/mega + tracking-tightest + type-formula). Lines: 915 → ~1081.
**Trigger**: orchestrator-direct (no agent), ~1 hour.
**Effect**: closes W1 hard gate (e); R1 retracts.

### 7b. Decide Wβ3 stress numbers (R2)
**Option A (cheap)**: rewrite `blob/waves/Wβ3.md` hard gate (c) to "contract documented + capture path defined" — honest about what the artefact proves. Update `BLOB-FINAL.md` and `FINAL.md` accordingly.
**Option B (clean)**: run the profile once in Chrome DevTools against the running dev server. Capture mean/max frame time across 8 instances. ~30 min. Numbers land in `Wβ3-stress-proof.md`. Gate genuinely closes.

Recommend **Option B**.

### 7c. Resolve dual-API in `useRAFLoop.ts`
**File**: `src/composables/motion/useRAFLoop.ts`.
**Finding**: lines 83 (`useRAFLoop` per-instance) and 361 (`useRafLoop` shared coalescer) ship as two functions in one module. Both exported from `motion/index.ts:17,22`. **`useRafLoop` has zero in-repo callers**.
**Work**: pick one. Either:
- **(a)** delete `useRafLoop` (lowercase, lines 277–390 of `useRAFLoop.ts`) + remove from barrel exports. Simplifies to one driver.
- **(b)** if the shared coalescer is genuinely needed by Wβ3 stress per SPEC.md §9, wire the existing blob composables to consume it instead of `useRAFLoop` per-instance, and delete the per-instance variant.
- (a) is KISS; (b) is the spec's intent.

### 7d. Refactor paper-grain `::after` triplication
**Files**: `src/styles/paper.css:95-106`, `src/styles/cards.css:34-45`.
**Work**: rewrite `.paper-card` and `.cream-surface` to compose `paper-grain-overlay` (e.g., apply the utility class in component templates, or inline-extend via `@apply paper-grain-overlay` if Tailwind v4 supports it). Removes ~25 lines of duplicated SVG-turbulence data URI.
**Effect**: closes W2 hard-gate (e) "no duplicate authority across files" honestly.

### 7e. Complete value.js ledger or open G-II.W5
**File**: `docs/tranches/G/audit/W5-value-js-migration.md`.
**Work**: either complete the ledger (41 unresolved rows: color tokens, accent shadows, slug/login pill buttons, `.underline-tabs`, `<DockLayerGroup :keepOpenWhile>`, `--shadow-cartoon-accent` recipe usage per ledger line 63) or formally truncate the consumer's projected residual in FINAL.md to the actual count and open a follow-up.

### 7f. Retire dead exports OR demonstrate use
**Files**:
- `src/components/custom/tier-badge/`, `src/components/custom/like-button/` — either add story sites in `demo/stories/primitives/tier-badge.vue` + `like-button.vue` (consistent with W4 spec language about clearing the ≥2 bar via story sites), or retire these per `feedback_overfitting_audit` (single-consumer = consumer preset territory).
- `src/components/custom/dock/index.ts` `defineDockActionBar` — same: either demo it or retire.
- `src/composables/color/useContrastSafeAccent.ts`, `src/composables/motion/useCollapse.ts`, `src/composables/monaco/useMonacoTheme.ts` — same.
- Runtime helpers in `src/tokens.ts:43,62,84,110` (and `NAMED_EASING_BEZIER`) — at minimum add a unit test or demo invocation to demonstrate consumption.

Recommended scope: a small G-II.W7 cleanup wave that either lands in-repo demo sites or retires per `feedback_no_backwards_compat` clean breaks.

### 7g. Open G-II if scope dilation justifies
The honest reading of §3 R1, §3 R3, §6 (5 falsified rows + 6 zero-caller bonuses), and §1 W5 (incomplete value.js ledger) is **scope dilation**. Per `docs/precepts/instructions/tranche/SPEC.md` §"Scope Reveal" item 2: "If the thesis still holds but the work needs another pass, open `{LETTER}-II`."

The thesis (eleven-axis vocabulary expansion) holds. The execution layer has unmet hard gates and overfitting rows. **G-II is the named destination** for these residuals; this audit recommends it in lieu of a "closed clean" claim.

---

## 8. Authority

This audit is read-only against `src/`, `demo/`, and tranche docs. No source files modified. Findings cite file:line throughout. The disposition tags (accepted / narrowed / rejected / speculation) follow `docs/precepts/instructions/tranche/CHALLENGE.md`.

Net: G's substantive design-language vocabulary lands. The close-ceremony framing ("closed clean") is overstated. Two hard gates (W1.e DESIGN.md sync; Wβ3.c stress runtime budget) are not honestly satisfied. One source-level KISS violation (`useRAFLoop` dual API) ships unannounced. Eleven artefacts (~15%) ship without in-repo consumers despite the overfitting audit's accept claim. Aggregate drift residual is misreported because the value.js ledger is incomplete.

The R1/R2 split between "residual" and "unmet hard gate" is the most consequential framing error. Recommend retracting "closed clean" status pending §7a + §7b at minimum.
