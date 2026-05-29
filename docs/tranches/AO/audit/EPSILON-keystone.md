# Tranche AO — Audit Lane EPSILON — Next-Keystone Analysis

**Scope: AN closed against a clean ledger (0 unaddressed, 0 survivors, H surfaces no glass-ui gap). AO is NOT consumer-gap-driven. This lane determines what AO's headline SHOULD be — and whether AO is a full tranche or a hygiene-close.**

Read-only on source/git. No source mutated, no git mutation. Builds on sibling findings (ALPHA clean-ledger, BETA deferral/legacy inventory, GAMMA empirical state).

---

## §0 — Headline recommendation (read this first)

**AO's headline is the CSS-architecture pass — candidate 2 — with the architectural-hygiene close (candidate 1) folded in as the same tranche's second lane.**

The recommendation rests on one load-bearing empirical fact GAMMA measured: **glass-ui.css sits at 90.2% of its gzip budget (7805 / 8650, ~845 B headroom).** This is not a passing alert — it is the *binding constraint on every future visual tranche*. AN already noted it (P.W6 ε flagged thin headroom); AN added 0 CSS and so deferred it; it is now the single number that gates AO and everything after AO. A library that ships visual canon cannot operate at 90% of its own ceiling — the next glass rung, token block, or utility recipe breaks the gate, and the only escape is ad-hoc CSS deletion under deadline pressure. That is the failure mode a principled pass pre-empts.

So AO's headline is: **make the CSS budget load-bearing infrastructure, not a near-breach.** Concretely a CSS-architecture gestalt — cascade-consolidation sweep (dedupe across the 18 `styles/` files), a re-based ceiling justified by the consolidated payload, and a per-rung budget knob so the *next* visual addition is measured against its own sub-budget rather than the single aggregate. This buys the library headroom for the next N tranches and converts "90.2%, watch it" into "here is the slack and here is what each block costs."

The architectural-hygiene work (candidate 1) is **not a competing headline — it is the same tranche's second lane**, and it materially *funds* the CSS pass: deleting dead weight (the inv-47 shim, the stale 8 GB heap prefix) and resyncing CLAUDE.md is the natural companion to a "leave the library pristine, measured, and honest" close. Hygiene alone is too thin to be a headline (it writes ~1 file deletion + 1 script edit + doc resyncs). The CSS pass alone is real but lonely. Together they are a coherent **"internal-correctness + visual-headroom" tranche** — the keystone is the CSS budget; hygiene rides the same close.

**No ≥2-consumer primitive-promotion candidate clears the binary substrate gate** (full analysis §3). The strongest signal — inline click-to-edit — has two consumers but two *divergent* shapes (numeric button↔input swap vs rich-text contenteditable); promoting it would mean inventing a union the consumers don't share. Candidate 3 does NOT supply AO's headline. It supplies a *watched condition*, identical in kind to AN's two ARCHIVED items.

---

## §1 — Ranked candidate list

| Rank | Candidate | Verdict | Why |
|---|---|---|---|
| **1** | **CSS-budget as organizing theme** (cascade consolidation + per-rung gate + re-based ceiling) | **HEADLINE** | The 90.2% gzip near-breach is the empirically-binding constraint on ALL future visual work (GAMMA Headline 1). Principled, forward-looking, load-bearing for N tranches. Not invented — the number is real and persistent. |
| **2** | **Architectural-hygiene close** (delete inv-47 shim · retire 8 GB heap prefix · resync CLAUDE.md §Build · reclaim CSS) | **FOLD INTO #1 (second lane)** | Each item is real debt (BETA item 1, GAMMA DRIFT-1). But alone it is housekeeping — too thin to headline. It funds and accompanies the CSS pass; the two share a "pristine + measured" close. |
| **3** | **Forward-looking primitive** (≥2-consumer promotion) | **NO HEADLINE — watched condition only** | No pattern clears the binary substrate gate at HEAD. Inline click-to-edit has 2 consumers but 2 divergent shapes; StatsCards is single-consumer; MetricCell already absorbed the speedtest 4-card shape at AC.W8e. See §3. |
| **4** | **Build/release-process maturity** (first real changeset-release) | **NOT a keystone — OMEGA's process lane** | Changesets is wired (`.changeset/config.json` present), CI authored (`ci.yml` + `release.yml`). The first changeset-release is a process milestone, not design canon. It rides AO's version bump (the inv-47 delete forces a SemVer-major signal anyway) but does not organize the tranche. |

---

## §2 — Headline rationale (candidate 1 + 2 fused)

### §2.1 — Why the CSS budget is the keystone

GAMMA's two most-important facts for AO planning:

1. **CSS headroom is ~845 B gzip (90.2% of cap).** AO is CSS-bound: any new visual canon must be CSS-neutral or pay its own way by deleting equivalent CSS.
2. **JS has ~10 KiB gzip slack (25.6% of cap).** JS additions are cheap; the constraint is entirely on the CSS side.

A design system whose *identity is visual* cannot run at 90% of its own CSS ceiling indefinitely. Every future tranche that touches `glass.css`, `tokens.css`, `utilities.css`, or adds a component-CSS file collides with the gate. The library has 18 `styles/` files imported in cascade order (`src/styles/index.css`); some predate the v1.0 consolidation and almost certainly carry duplicated declarations, dead rungs, and overlapping utilities. A consolidation sweep is the gestalt-redesign answer (per the architectural-approach precept) rather than the incremental "delete a rule when the gate trips" patch.

The headline work, concretely:

- **Cascade-consolidation sweep** — read all 18 `styles/` files in full, find duplicated/dead declarations, collapse overlapping utilities, retire any orphaned rungs (the kind BETA found dormant: e.g. the single-slot metric-badge robustness note, `-webkit-` emission asides — confirm each is live before touching). Goal: reclaim raw + gzip CSS payload.
- **Re-based ceiling** — once the payload is consolidated, set the budget cap to the new measured size + a justified slack margin, so the cap reflects the *intended* size, not a historical accident. Document the rebaseline rationale in the FINAL.
- **Per-rung / per-file sub-budget knob** — extend `profile:budget` so a future addition is measured against the block it lands in (glass ladder, tokens, utilities), not just the single aggregate. This is what converts "watch the 90%" into "here is what each block costs." This is the forward-looking infrastructure that earns the keystone label.

This is principled, measurable, and gives the library headroom for the next N tranches — exactly the "make the headline load-bearing" bar the directive sets.

### §2.2 — Why hygiene folds in (and funds the headline)

BETA's one live inv-47 / L-inv-4 violation and GAMMA's one substantive drift are both real, both small, and both belong in the same close:

- **DELETE the inv-47 shim** (`src/composables/motion/useSpringOrchestrator.ts`) — a live `@deprecated` back-compat alias, exactly what L invariant 4 / inv 47 forbid. Its JSDoc defers retirement to "v3.0"; the directive says fold that deferral forward. **Confirmed: zero external consumers** — a constellation-wide grep (`bbnf-buddy`, `speedtest`, `fourier-analysis`, `words`, `bbnf-lang`) returns nothing; only 3 demo-private stories + 2 shim test cases reference it. Clean break, no replacement alias. This is a SemVer-major-visible removal (it forces AO to be a major bump, which in turn is the natural moment to fire the first real changeset-release — candidate 4 rides here, it does not lead).
- **Retire the 8 GB heap prefix + resync CLAUDE.md §Build** (GAMMA DRIFT-1) — `vite-plugin-dts` + `api-extractor` are GONE from the toolchain; dts is emitted out-of-band by `vue-tsc`, peaking <1 GB, in ~7 s. The `NODE_OPTIONS=--max-old-space-size=8192` prefix is dead weight and the CLAUDE.md §Build paragraph (api-extractor / 6.7 GB / 8 GB-required / "~2½min") is stale fiction. `vite.config.ts:148-155` already documents the truth; CLAUDE.md was never resynced. Drop the prefix, rewrite the paragraph to describe the real `vue-tsc` emit.
- **CSS reclaim** is the seam where hygiene meets the headline — the consolidation sweep IS the reclaim, so the two lanes are not parallel busywork, they are one body of work viewed twice.

The CARRY items (no AO work) per BETA: the dts-build cost is now a non-issue once the dead prefix is dropped (it was latent-debt only while the 8 GB rationale stood; GAMMA shows the rationale is stale, so it downgrades from "carry" to "delete the dead prefix"). The 2 ARCHIVED AN items + vaul-vue re-snap + `@source` contract + `"scoring"`/`"ping"` are all terminal, no AO wave.

---

## §3 — ≥2-consumer primitive-promotion check (candidate 3)

The inverse substrate gate: a pattern ≥2 consumers reimplement is a glass-ui primitive candidate. Surveyed `bbnf-buddy`, `speedtest`, `fourier-analysis`, `words` component dirs. Findings:

### §3.1 — Inline click-to-edit (strongest signal, but DOES NOT clear the gate)

Two consumers ship a click/dblclick-to-edit, display↔edit-swap control:

- **bbnf-buddy** `EditableNumber.vue` + `EditableSlider.vue` — a *numeric* atomic cell: button (read) ↔ input (edit) DOM swap, zero layout shift, parses via `@mkbabb/value.js` `parseCSSValueUnit`, caller-controlled formatter. `EditableSlider` composes it over a glass-ui `<Slider>` plus an inline-editable value cell.
- **words** `EditableField.vue` (`.../definition/components/editing/`) — a *rich-text* field: `contenteditable` span, dblclick-to-edit, gated by an `editMode`, hover action buttons (edit / regenerate), multiline support, slot-driven display.

**Verdict: NOT promotable as a single primitive.** The two share a *gestalt* (in-place editable swap) but diverge on every material axis — numeric vs rich-text, controlled `<input>` vs `contenteditable`, formatter-driven vs slot-driven, always-editable vs edit-mode-gated, no-actions vs hover-action-buttons. Promoting one primitive would mean inventing a union neither consumer actually shares — the overfitting trap the substrate gate exists to prevent. This is a **watched condition** (same class as AN's 2 ARCHIVED items): it lands if/when ≥2 consumers converge on the *same* shape (e.g. two numeric-editable-cell consumers, or two rich-text-editable consumers). At HEAD they are two different primitives that happen to rhyme.

### §3.2 — Labeled slider with inline numeric readout (single-consumer-equivalent)

- **fourier** `SliderControl.vue` — label + inline numeric input + glass-scrubber `<Slider>`.
- **bbnf-buddy** `EditableSlider.vue` — label + glass-ui `<Slider>` + editable value cell.

glass-ui already ships `LabeledSlider` (`custom/labeled-field/`) but it has **no numeric-readout cell** — it is label + bare slider only. So both consumers add a readout the library omits. This *looks* like a ≥2-consumer gap, BUT: fourier's readout is a plain numeric `<input>` while bbnf-buddy's is the full `EditableNumber` (value.js parsing, CSS-unit coercion). The shared minimum is "show the current value next to the slider" — which is a thin, cosmetic addition, not a primitive. If AO wants a small additive win it could add an optional `:show-value` / readout slot to `LabeledSlider`, but this is a minor enhancement, not a keystone, and it is CSS-bound (see the 90.2% constraint — even a small readout style must fit the budget, which reinforces why the CSS pass comes first). **Disposition: candidate minor-additive, gated behind the CSS headroom the headline reclaims; not a keystone.**

### §3.3 — Metric / stats card (already absorbed; remaining shape is single-consumer)

- glass-ui **already ships** `MetricCell` (custom/metric-cell/) + `MetricBadge` + `MetricStack` + `MetricPill` — and `MetricCell` was *itself* promoted from speedtest's `ResultDetailSheet` 4-card grid at AC.W8e (the inverse-gate working as designed in a prior tranche).
- speedtest **`StatsCards.vue`** is a *different* shape — label-on-top (no icon), color-tint via `--metric-color`, 4-up responsive grid, unit-line height-equalization. It is a single consumer of this exact variant. Not promotable (1 consumer).

**Verdict: metric-display family is mature; no new ≥2-consumer metric shape.** The one outstanding shape (StatsCards) is single-consumer and correctly stays bespoke.

### §3.4 — Collapsible section, glass surfaces, dock/nav

- fourier `CollapsibleSection.vue` wraps glass-ui `Collapsible` + adds scroll-into-view-on-open. Single consumer; the scroll behavior is app-specific. Not promotable.
- Glass surfaces (`Card tier="wash"`, `glass-*` rungs) are consumed directly across all repos — no reimplementation, the primitive is doing its job.
- Dock: speedtest `Dock.vue` / `SurveyResultDock.vue` consume glass-ui's dock family directly. No bespoke reimplementation. (AN already confirmed the dock panel-host stays ARCHIVED — no 2nd consumer.)

### §3.5 — Primitive-promotion summary

**No ≥2-consumer pattern clears the binary substrate gate at HEAD.** The inline-edit gestalt is the only multi-consumer signal and it fails on shape-divergence (would be overfit). glass-ui's metric, slider, dock, collapsible, and glass-surface primitives are all consumed directly or already-promoted. **Candidate 3 yields one watched condition (inline-edit convergence) and one minor-additive option (`LabeledSlider` readout), neither of which is a headline.** The library's substrate is, by this survey, well-matched to its consumers — which is itself why AO is NOT consumer-gap-driven.

---

## §4 — Full-tranche-vs-hygiene-close verdict

**AO is a FULL TRANCHE — narrowly, and only because the CSS-budget pass gives it a load-bearing keystone.** Honest assessment:

- **If AO were ONLY the hygiene items** (delete the shim, drop the dead heap prefix, resync CLAUDE.md), it would be a **hygiene-close, not a tranche** — ~1 file deletion, 1 script edit, 2 doc paragraph rewrites, 5 demo/test call-site migrations. Real, correct, worth doing, but below the threshold for a lettered tranche with waves and a FINAL. It would more honestly be a single commit ("AO: retire inv-47 shim + stale dts heap prefix + doc resync") than a tranche folder.

- **The CSS-architecture pass is what earns the full-tranche designation.** A cascade-consolidation sweep across 18 style files + a re-based ceiling + a per-rung budget gate is genuine architectural work with measurement, a gestalt (consolidation over patch), and forward-looking infrastructure (the per-rung knob serves every future tranche). It clears the keystone bar.

- **Verdict: full tranche, CSS-budget-keyed, hygiene-funded.** AO = one keystone lane (CSS architecture + reclaim) + one hygiene lane (inv-47 delete + heap-prefix retire + CLAUDE.md resync) + one process beat (first changeset-release, riding the forced SemVer-major from the shim delete) + two carried watched-conditions (inline-edit convergence; the 2 standing AN ARCHIVED items). It is wanted (the user asked to refine the glass-ui tranche), and its headline is load-bearing rather than invented because the 90.2% number is a real, persistent, binding constraint that no prior tranche has discharged.

- **Risk if AO ships as hygiene-only:** the 90.2% CSS near-breach persists into AP/AQ and detonates under the next visual addition, forcing an unplanned emergency reclaim mid-feature. AO is the right moment to discharge it precisely *because* there is no consumer-gap pressure — a clean ledger is the ideal window for internal-architecture work.

---

## §5 — Authority / evidence

- Sibling lanes: `ALPHA-prompt-precept-recap.md` (clean ledger; H surfaces no gap), `BETA-deferrals-legacy.md` (inv-47 shim DELETE; carries), `GAMMA-empirical-state.md` (90.2% CSS gzip; 8 GB prefix dead; CLAUDE.md §Build stale).
- CSS budget: `npm run profile:budget -- --enforce` (GAMMA Headline 1); cap in the profile script; cascade source `src/styles/index.css` + 18 `styles/*.css`.
- inv-47 shim: `src/composables/motion/useSpringOrchestrator.ts` (whole file); barrel `src/composables/motion/index.ts:14`; comment refs `src/motion.ts`, `src/index.ts`. Zero external consumers (constellation-wide grep, this lane).
- dts toolchain truth: `vite.config.ts:148-155`; `package.json` `build` + `emit-types` scripts; CLAUDE.md §Build (stale).
- Primitive-promotion survey (this lane): bbnf-buddy `EditableNumber.vue`/`EditableSlider.vue`; words `.../definition/components/editing/EditableField.vue`; fourier `web/src/components/ui/SliderControl.vue`/`CollapsibleSection.vue`; speedtest `dashboard/StatsCards.vue`; glass-ui `custom/labeled-field/LabeledSlider.vue`, `custom/metric-cell/MetricCell.vue` (AC.W8e promotion provenance).
- Standing invariants: J inv 10 / L inv 8 (binary substrate), L inv 4 / inv 47 (no back-compat alias), P inv 28 (zero deferral).
- changesets/CI: `.changeset/config.json` (wired), `.github/workflows/{ci,release}.yml` (authored).
