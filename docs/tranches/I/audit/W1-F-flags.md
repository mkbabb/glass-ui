# I.W1 Lane F — Architectural-tension flags for I.W3

**Date**: 2026-05-05
**HEAD**: `c3bf0a2`
**Status**: documentation-only; no source changes.
**Author**: Lane F (chronic-deferral substrate flagger).

## Purpose

Per `docs/tranches/I/waves/W1.md` Lane F: flag the architectural-tension items that I.W3 owns; do not absorb. Source for each row: H deep-audit δ (C-1, C-5…C-11) + W0 reconciliation §1 (chronic rows 6, 7, 8, 19; conditional rows 2, 11, 13) + W0 reconciliation §4 (δ disposition table). Every citation re-verified at HEAD `c3bf0a2` via `rg -n`.

W1 absorb test: each item below was checked for "is this a 1-line orchestrator-absorb fix or a multi-file refactor?". All 7 W3-bound items require multi-file refactors and/or binding doc decisions; none are orchestrator-absorbable. The 3 conditional dispositions (rows 2, 11, 13) require a binary policy decision; not absorbable. C-8 (blob double-rAF) is a permanent-deferral entry the W3 close-doc must record.

---

## Items handed to I.W3 (7 items)

### C-1 — dock keep-open dual-authority (W0 §1 row 19; W0 §4 row C-1; W0 §6 Σ-2)

| field | value |
|---|---|
| chronic finding | `<DockPopover>` consumes raw function-keys `inject('dockKeepOpen')` / `inject('dockRelease')`; `<Slider>` consumes the symbol-keyed sink `inject(DOCK_KEEP_OPEN_SINK_KEY)`; `<DockLayerGroup>` provides both. Two consumer paths to one provider; `'dockKeepOpen'` is a public string injection key with no `_internal/` enforcement; both consumers live in the same `src/components/custom/dock/` package, so the "layered API" framing fails the layer-boundary test. Per W0 §6 Σ-2: source confirms deep-audit δ correct; H FINAL §δ "resolved-by-redefinition" is overridden via I.md invariant 1 ("no silent deferrals"). |
| HEAD citations (`c3bf0a2`) | `src/components/custom/dock/DockPopover.vue:38-39,45-46` (raw function-key inject + watcher); `src/components/ui/slider/Slider.vue:7,44` (sink import + inject); `src/components/custom/dock/DockLayerGroup.vue:24,104-105,129` (sink key export + parent function-key inject + provide) |
| W3 disposition path | **collapse-to-canonical**: pick one authority binary. Recommended path A (per H δ C-1 §9 P0 + W0 §4): `DockPopover` migrates onto `dockSink.acquire()` (the more general primitive with leak-resilience); `'dockKeepOpen'` / `'dockRelease'` injection keys move under `_internal/` of the dock package OR convert to symbols. Alternative path B: sink dissolves and `Slider` calls function-keys directly (Slider only ever holds one token, so the `Set<symbol>` wrapping is non-load-bearing for the Slider call site). I.W3 picks one, not both. |
| expected W3 file-bounds | `src/components/custom/dock/DockPopover.vue` (rewrite inject + watcher); `src/components/custom/dock/DockLayerGroup.vue` (drop function-key provide if path A; reshape the sink if path B); `src/components/custom/dock/composables/useDockState.ts` (verify provider key shape — function-keys may move to private symbols); `src/components/ui/slider/Slider.vue` (only if path B is picked); `src/components/custom/dock/index.ts` (export update if any symbol gets renamed). Optional: a tiny `_internal/dockKeepOpenKeys.ts` if path A creates one. |
| 1-line absorb? | **no — multi-file refactor**, ≈ 20 lines across 3 files (per H δ C-1 §9 estimate). Binary policy choice required (path A vs path B). |

### C-5 — Cartoon-surface recipe duplicated 4× across CVAs (W0 §1 row 6; W0 §4 row C-5)

| field | value |
|---|---|
| chronic finding | The cartoon-surface recipe (cream substrate + 2px foreground border + cartoon-accent shadow + hover/active geometry) is re-asserted four times across four ui/ CVAs with a 2-way colour divergence: Button + Select consume `--cream`; Input + NumberField consume `--cream-warm`. The recipe is shape-duplicate and colour-divergent; drift is currently invisible at the recipe level. No `@utility cartoon-surface` exists to composite. |
| HEAD citations (`c3bf0a2`) | `src/components/ui/button/index.ts:36-37` (cream); `src/components/ui/select/index.ts:24-25` (cream); `src/components/ui/input/index.ts:13-14` (cream-warm); `src/components/ui/number-field/index.ts:18-19` (cream-warm, descendant push) |
| W3 disposition path | **collapse-to-canonical**: hoist into one `@utility cartoon-surface { ... }` in `src/styles/utilities.css`; the four CVAs composite `'cartoon-surface'` instead of re-asserting six tokens. Reconcile the cream / cream-warm divergence at the same time — pick one canonical token (`--cream-warm` is the field-input warmer rung; `--cream` is the press-surface). Document the chosen colour rule in a comment on the new utility OR amend the recipe to accept a custom property override (`var(--cartoon-surface-bg, var(--cream))`). |
| expected W3 file-bounds | `src/styles/utilities.css` (new `@utility cartoon-surface`); `src/components/ui/button/index.ts`, `src/components/ui/select/index.ts`, `src/components/ui/input/index.ts`, `src/components/ui/number-field/index.ts` (CVA branches collapse to composite `'cartoon-surface'`). Optional: `src/styles/tokens.css` if cream/cream-warm consolidation requires a token decision. |
| 1-line absorb? | **no — multi-file refactor**, ≈ 15 lines per H δ C-5 §9 P1 estimate; colour-divergence resolution requires a substrate decision. |

### C-6 — `--easing-accent` doing 8+ jobs (W0 §4 row C-6)

| field | value |
|---|---|
| chronic finding | The `--easing-accent` token (defined in `src/styles/tokens.css:218`) is consumed for 8+ unrelated semantic roles: NotificationDot bg, MathFormula left-rule border, PipelineFlow node accent, Blob colour fallback, TimelineMarker colour, TimelinePlayhead colour, prism-theme syntax colour, BezierCanvas stroke. The token name no longer describes most of its uses. |
| HEAD citations (`c3bf0a2`) | def: `src/styles/tokens.css:218`, `src/styles/tokens.css:497` (`--blob-color: var(--easing-accent)`); consumers (9 files): `src/components/custom/notification-dot/NotificationDot.vue:20,48`; `src/components/custom/timeline/TimelineMarker.vue:22,54`; `src/components/custom/timeline/TimelinePlayhead.vue:16,37,60`; `src/components/custom/blob/Blob.vue:206`; `src/components/custom/math-formula/MathFormula.vue:33,64,98`; `src/components/custom/pipeline-flow/PipelineFlow.vue:112,157`; `src/components/custom/bezier-canvas/BezierCurveCanvas.vue:33,79`; `src/styles/prism-theme.css:18,98,139` |
| W3 disposition path | **collapse-to-canonical**: rename to a substrate-neutral identity name. Recommended: `--accent-vivid` (per H δ §9 P1 #9). Alternative path: split per substrate (`--blob-accent`, `--timeline-accent`, …) — but that multiplies tokens; collapse-to-one-rename is the gestalt choice. Per `feedback_no_backwards_compat`: clean break, no alias. |
| expected W3 file-bounds | `src/styles/tokens.css` (rename def); plus the 9 consumer files listed above (≈ 1 site each, mechanical replace). Total ≈ 40 lines across ≈ 10 files. Demo updates may be required if any demo story references the old name (verify via `rg -l 'easing-accent' demo/` at W3 dispatch). |
| 1-line absorb? | **no — multi-file refactor** spanning 10 files; the rename is mechanical but the binding is a binary choice (rename vs split). |

### C-7 — Slider scoped-CSS variants instead of CVA (W0 §4 row C-7)

| field | value |
|---|---|
| chronic finding | Slider has 4 variants (`'standard' | 'spectrum' | 'timeline' | 'glass-track'`) but no CVA. Variant differences are encoded as scoped CSS keyed on `glass-slider--${v}`. CLAUDE.md states "All `ui/` components follow the shadcn-vue pattern… CVA variants are co-exported from each component's `index.ts`." Slider is the only ui/ family that doesn't co-export a CVA from its `index.ts` — inconsistent with the documented project convention. |
| HEAD citations (`c3bf0a2`) | `src/components/ui/slider/Slider.vue:71` (modifier-class binding); `src/components/ui/slider/Slider.vue:132,141,150,162,173,181,186,191,203` (scoped-CSS variant rules); `rg "cva\(" src/components/ui/slider/` returns zero hits (no CVA at HEAD); CLAUDE.md (this repo) documents the CVA convention as the project pattern. |
| W3 disposition path | **W3 picks** between (a) **collapse-to-canonical**: introduce `sliderVariants` CVA whose values are the modifier class names (`'glass-slider--standard'`, `'glass-slider--spectrum'`, …); the CVA fragment selects one scoped-CSS modifier; OR (b) **document-named-hierarchy**: amend CLAUDE.md `## Component architecture` to allow scoped-CSS variants for ui/ components when variant differences are structural-CSS not Tailwind-class deltas. Either choice closes the inconsistency. Path (b) is the lighter touch and reflects the actual mechanical truth (Slider's variant differences ARE structural CSS — track height, thumb shape — that don't reduce to Tailwind class deltas). |
| expected W3 file-bounds | path (a): `src/components/ui/slider/index.ts` (new CVA + named export `sliderVariants` + type); `src/components/ui/slider/Slider.vue` (consume CVA on the modifier-class binding). path (b): `CLAUDE.md` (amend `## Component architecture` section to name the scoped-CSS-variant exception); `docs/tranches/I/audit/W3-axis-ownership.md` (record the convention amendment as part of W3 close). |
| 1-line absorb? | **no — multi-file or doc-amendment decision**. Even path (b) requires a CLAUDE.md edit + W3 audit-doc record. Binary policy choice. |

### C-9 — `<Card variant="cream">` vs `<CreamSurface>` duplicate authority (W0 §1 row 8; W0 §4 row C-9)

| field | value |
|---|---|
| chronic finding | Two paths to the warm-cream substrate: `<Card variant="cream">` applies `.cream-surface` via CVA; `<CreamSurface>` is a dedicated component that applies `.cream-surface` + `data-tone`. Both have demo consumers; both compose the same underlying utility class (`src/styles/cards.css:22-66`). Per W0 §1 row 8: this is one of the three substrate-tier hierarchy violations I invariant 7 binds. |
| HEAD citations (`c3bf0a2`) | `src/components/ui/card/index.ts:28` (`cream: "cream-surface"` CVA branch); `src/components/custom/cream-surface/CreamSurface.vue` + `src/components/custom/cream-surface/index.ts:1-2` (component + type); `src/styles/cards.css:22,33,46,51,55,60,66` (the `.cream-surface` recipe + `[data-tone="warm|cool"]` variants the component owns) |
| W3 disposition path | **collapse-to-canonical** OR **document-named-hierarchy** (W3 picks per `waves/W3.md` Lane I recommendation). Recommended (per `waves/W3.md`): keep `<CreamSurface>` as the substrate component (owns `data-tone`); retire `<Card variant="cream">` (consumers compose `<CreamSurface>` inside `<Card>` instead — less special-casing). Alternative: keep both and write a `DESIGN.md ## Substrate Hierarchy` section that names the canonical primitive + the role of each surviving alternate. |
| expected W3 file-bounds | collapse path: `src/components/ui/card/index.ts` (drop `cream` CVA branch); `DESIGN.md` (new `## Substrate Hierarchy` section naming `<CreamSurface>` as canonical); demo migration if any demo story uses `<Card variant="cream">` (verify via `rg -n 'variant="cream"' demo/` at W3 dispatch). hierarchy-document path: `DESIGN.md` only. |
| 1-line absorb? | **no — multi-file refactor or DESIGN.md authoring decision**. Tied to C-10 (paper tier) — both resolve as a single substrate-tier-hierarchy decision per I invariant 7 + `waves/W3.md` Lane I. |

### C-10 — `<Card variant="paper">` + `.paper-card` + `.paper-{1..4}` three paths (W0 §1 row 8; W0 §4 row C-10)

| field | value |
|---|---|
| chronic finding | Three paths to the paper substrate: `<Card variant="paper">` applies `.paper-card` via CVA; `.paper-card` is a raw utility (lined paper card recipe); `.paper-{1..4}` is a 4-rung tier ladder of un-chromed lined-paper utilities. There is no `<PaperSurface>` component to mirror `<CreamSurface>` — the paper tier is asymmetric vs cream. Per W0 §1 row 8: paired with C-9 as the substrate-tier hierarchy violation. |
| HEAD citations (`c3bf0a2`) | `src/components/ui/card/index.ts:29` (`paper: "paper-card"` CVA branch); `src/styles/paper.css:59-83` (`.paper-1`…`.paper-4` tier classes); `src/styles/paper.css:110-151` (`.paper-card` raw utility); no `<PaperSurface>` component at `src/components/custom/`; `<PaperBackdrop>` exists at `src/components/custom/paper-backdrop/` but is library-orphan per W0 §2.1 row 5. |
| W3 disposition path | **document-named-hierarchy** (per `waves/W3.md` Lane I recommendation): keep `<Card variant="paper">` as the chrome-aware entry; keep `.paper-N` as the un-chromed lined-paper utility (4-rung ladder); retire `<PaperBackdrop>` (low usage; β flagged orphan — already disposed in I.W1 Lane A). The two surviving paths serve distinct purposes: `<Card variant="paper">` = card semantics; `.paper-N` = composition-area lined paper. Document in `DESIGN.md ## Substrate Hierarchy`. Alternative collapse path: introduce `<PaperSurface tier="1|2|3|4">` to mirror `<CreamSurface>` and retire `<Card variant="paper">` + raw `.paper-card` — but that's net-add of a public component, which I invariant 10 forbids. |
| expected W3 file-bounds | document-hierarchy path (recommended): `DESIGN.md` (add `## Substrate Hierarchy` section — same edit absorbs C-9). collapse path is forbidden by I invariant 10. PaperBackdrop retire is owned by I.W1 Lane A; W3 only confirms the disposition lands. |
| 1-line absorb? | **no — DESIGN.md authoring decision** paired with C-9. Same DESIGN.md section resolves both. |

### C-11 — NumberField cartoon descendant-attr-selector outlier (W0 §1 row 7; W0 §4 row C-11)

| field | value |
|---|---|
| chronic finding | NumberField's `cartoon` CVA branch pushes the cream-warm + 2px border + cartoon-accent shadow recipe through `[&_[data-slot=input]]:` descendant-attr selectors onto the descendant input — the only ui/ family that uses this shape. Tabs's `provide('glassTabs', ...)` + leaf `inject` template (delivered at G pass-2) and Toggle's single-CVA-on-host-element template both exist as exemplars. NumberField uses neither. |
| HEAD citations (`c3bf0a2`) | `src/components/ui/number-field/index.ts:18-19` (cartoon CVA branch with `[&_[data-slot=input]]:` descendant selectors); `src/components/ui/number-field/NumberFieldInput.vue` (no `inject('glassNumberField')` at HEAD); `src/components/ui/tabs/Tabs.vue:13` (canonical `provide('glassTabs', { variant: computed(...) })` exemplar to mirror) |
| W3 disposition path | **collapse-to-canonical**: refactor to provide/inject template per Tabs precedent. `<NumberField variant="cartoon">` provides a `'glassNumberField'` ctx exposing the variant; `NumberFieldInput.vue` injects and applies the matching slice of one shared CVA on its host element. Drop the `[&_[data-slot=input]]:` descendant push. Per H δ C-11 §9 P1 estimate: ≈ 25 lines across 3 files. |
| expected W3 file-bounds | `src/components/ui/number-field/index.ts` (new `numberFieldInputVariants` CVA OR shared variant slice; drop descendant push from root CVA); `src/components/ui/number-field/NumberField.vue` (add `provide('glassNumberField', { variant })`); `src/components/ui/number-field/NumberFieldInput.vue` (add `inject('glassNumberField')` + apply variant CVA on host). |
| 1-line absorb? | **no — multi-file refactor**, ≈ 25 lines across 3 files; preserves the existing public `variant="cartoon"` API but rewires the implementation from descendant-push to provide/inject. |

---

## Conditional dispositions (W3 picks)

Per W0 §1 conditional rows: 3 chronic items whose disposition depends on a binary W3 policy choice (WIRE-or-DEFER / reassess-or-retire). Each requires evidence + a binding rationale to close per I invariant 1 ("no silent deferrals") + I invariant 2 ("each chronic item resolves via wire / retire / refactor; or formally retired with named replacement; or carries an explicit permanent deferral with binding rationale").

### Row 2 — R5 Blob Web Worker reassess-or-retire-as-unreachable (W0 §1 row 2; I invariant 12)

| field | value |
|---|---|
| chronic finding | The Blob Web Worker primitive has a 8+-multi-instance trigger condition encoded in `src/composables/blob/SPEC.md §11.4`. H W5 stress baseline captured FPS 119.62 / 0 KB-per-instance at 8 multi-instance specimens on M4 Max (per W0 §6 Σ-6); the trigger may already be unreachable on this class of hardware. |
| HEAD citations (`c3bf0a2`) | trigger encoding: `src/composables/blob/SPEC.md` §11.4 (file present at HEAD; not re-read in this audit — load-bearing input from W0 §1 row 2); H W5 stress baseline cited in `docs/tranches/H/audit/H-deep-audit-ε-performance.md` §4 + W0 §6 Σ-6; `demo/stories/_internal/blob-stress.vue` already exercises 8 multi-instance specimens at HEAD per `waves/W1.md` Lane D recovery-diary list. |
| W3 disposition path | **W3 picks** between (a) **reassess** the trigger condition: re-encode at a different threshold reachable on lower-end runtime (e.g., 16+ instances OR 240Hz panel target OR mobile-tier device profile); record evidence in `docs/tranches/I/audit/W3-chronic-deferral-assessments.md`. OR (b) **retire-as-unreachable**: formally retire the trigger as "encoded but unreachable on M4 Max baseline; permanent deferral until lower-end runtime evidence forces it"; document the binding rationale in W3 close-doc. |
| expected W3 file-bounds | reassess: `src/composables/blob/SPEC.md` §11.4 (re-encode threshold); `docs/tranches/I/audit/W3-chronic-deferral-assessments.md` (record decision). retire: `src/composables/blob/SPEC.md` §11.4 (retire the encoded trigger OR rewrite as "permanent deferral pending lower-end evidence"); `docs/tranches/I/audit/W3-chronic-deferral-assessments.md` (binding rationale entry). No source-component edits; this is a SPEC.md + audit-doc decision. |
| 1-line absorb? | **no — binary policy decision** requiring evidence + rationale. Not orchestrator-absorbable. |

### Row 11 — Plugin extraction WIRE-or-formal-DEFER (W0 §1 row 11; I.md cross-tranche-debt §1)

| field | value |
|---|---|
| chronic finding | Plugin extraction (Tailwind plugin packaging) has been an aspirational deferral across 4 tranches (E + F + G + H); never picked up; never formally retired. Per W0 §1 row 11: "most chronic aspiration in corpus". No corresponding artefact at HEAD (`rg -l 'plugin' src/` returns no plugin-extraction artefact). I.md cross-tranche-debt §1 frames the binary: "If primitives have stabilized post-H trim, plugin extraction may finally be ready; if not, formally retire as 'permanent deferral with documented rationale' rather than continuing to defer." |
| HEAD citations (`c3bf0a2`) | absence-of-artefact: no `src/plugin/` directory; no Tailwind plugin entry in `vite.library.ts`; no plugin-shape exports in `src/index.ts`. Aspiration trail: E + F + G + H wave specs / FINAL.md mention plugin extraction as deferred (load-bearing input from W0 §1 row 11; cite at W3 dispatch via `rg -n 'plugin' docs/tranches/{E,F,G,H}/`). |
| W3 disposition path | **W3 picks** between (a) **WIRE**: name a current named consumer + scope (e.g., the speedtest consumer would benefit from `@mkbabb/glass-ui/plugin` Tailwind preset that exports the @theme block + custom utilities); land a minimal plugin-extraction substrate; OR (b) **formal DEFER**: retire as "permanent deferral, consumer-territory; plugin packaging is downstream of @theme + @utility maturity which has now stabilized but no named consumer requires the packaging boundary". Default per W0 §1 row 11: DEFER (4-tranche aspiration with no current named consumer or named timeline). |
| expected W3 file-bounds | WIRE path: new `src/plugin/index.ts` + `vite.library.ts` entry + `package.json` exports map + `docs/consumer-evidence/plugin.md`. forbidden if no named consumer surfaces at W3 dispatch (substrate-with-consumer precept). DEFER path: `docs/tranches/I/audit/W3-chronic-deferral-assessments.md` (binding rationale entry); update `I FINAL.md` close-doc with the formal-deferral row. |
| 1-line absorb? | **no — binary policy decision** requiring named-consumer evidence (WIRE) or binding rationale (DEFER). Default DEFER is the lighter path; either way, not orchestrator-absorbable. |

### Row 13 — Reduced-motion + a11y posture WIRE-or-DEFER (W0 §1 row 13; I.md cross-tranche-debt §2)

| field | value |
|---|---|
| chronic finding | Reduced-motion + a11y deeper sweep has been a deferral across 5 tranches (dormant since C). Many components have `prefers-reduced-motion` guards at HEAD; no project-level a11y posture statement exists. Per W0 §1 row 13: "lands a one-pass a11y audit + posture statement OR formally names 'consumer-grade a11y posture' as out-of-scope with binding rationale." |
| HEAD citations (`c3bf0a2`) | reduced-motion guards (sample sites): `src/styles/animations.css:166,181,195` (PRM overrides for sparkle-sweep / rainbow-drift / idle-bob); `src/composables/blob/useBlob.ts:135` (`useRAFLoop({ respectReducedMotion: true })`); `src/composables/motion/useRAFLoop.ts` (guard implementation). a11y posture absence: no `DESIGN.md ## Accessibility Posture` section at HEAD; no `docs/a11y.md` artefact. |
| W3 disposition path | **W3 picks** between (a) **WIRE**: land a one-pass a11y audit + write `DESIGN.md ## Accessibility Posture` naming the library's a11y commitments (PRM honoured throughout, ARIA primitives delegated to reka-ui, focus-visible rings via `.focus-ring` utility, contrast tier ≥ AA target, …); OR (b) **formal DEFER**: name "consumer-grade a11y posture is out-of-scope for the library tier; consumers own end-product a11y compliance" with binding rationale (e.g., the library is composable primitives, not finished interfaces; per-consumer audits beat a generic library statement). |
| expected W3 file-bounds | WIRE path: `DESIGN.md` (new `## Accessibility Posture` section); `docs/tranches/I/audit/W3-chronic-deferral-assessments.md` (record audit findings + posture). DEFER path: `docs/tranches/I/audit/W3-chronic-deferral-assessments.md` (binding rationale); optional `DESIGN.md` line referencing the deferral. |
| 1-line absorb? | **no — binary policy decision**; WIRE path requires a one-pass audit (multi-hour read) + posture authoring. Not orchestrator-absorbable. |

---

## Permanent deferrals to record at W3 close-doc

### C-8 — `<Blob>` instance double-rAF (W0 §4 row C-8)

| field | value |
|---|---|
| chronic finding | `<Blob>` instance runs two simultaneous rAF subscriptions: `useBlob.ts` registers a `useRAFLoop` driver; `_internal/useBlobPointer.ts` hand-rolls a separate `requestAnimationFrame` integrator with its own start/stop machinery. Two rAF subs per Blob instance, no shared scheduler. The `_internal/` boundary keeps it out of public API; H W5 stress baseline shows FPS 119.62 / 0 KB-per-instance — no observable cost. |
| HEAD citations (`c3bf0a2`) | `src/composables/blob/useBlob.ts:135` (`useRAFLoop` driver); `src/composables/blob/_internal/useBlobPointer.ts:113,118-120` (hand-rolled `requestAnimationFrame` + start/stop). The `_internal/` boundary is enforced via `src/composables/blob/index.ts` (only `useBlob` + `useWatercolorBlob` facades exported; no `useBlobPointer` public surface). |
| W3 disposition (per W0 §4 row C-8) | **permanent deferral, internal — `_internal/` boundary holds**. The architectural duplication is real but non-blocking: no public API affected; FPS baseline shows zero observable cost; consumer code cannot reach the duplication. Future refactor (consume `useRAFLoop` inside `useBlobPointer` to share scheduler) is welcome but not gated. |
| W3 close-doc record | `docs/tranches/I/audit/W3-chronic-deferral-assessments.md` records the formal-deferral entry with: (1) the citation pair above; (2) the `_internal/` boundary as binding rationale; (3) the named restoration trigger ("if blob runtime regresses below H W5 baseline OR if `useBlobPointer` ever needs to ship as public API, refactor to single rAF scheduler"). |

---

## Self-check

- 7 W3-bound items: C-1, C-5, C-6, C-7, C-9, C-10, C-11 — all citations re-verified at HEAD `c3bf0a2`; none are orchestrator-absorbable (each requires multi-file refactor or binding doc decision).
- 3 conditional dispositions: rows 2, 11, 13 — each requires a binary policy decision (reassess-or-retire / WIRE-or-DEFER / WIRE-or-DEFER); not orchestrator-absorbable.
- 1 permanent deferral: C-8 — W3 close-doc records the formal entry; no source action.
- File bounds for W3 are disjoint from W1 lane bounds (no W1 lane edits any of: dock package internals beyond DockPopover.vue, NumberField package, slider CVA shape, easing-accent rename consumers, DESIGN.md substrate-hierarchy section, CLAUDE.md component-architecture amendment).
- Per `waves/W1.md` file bounds: this doc is the only artefact Lane F may CREATE.

## Authority

Documentation-only; no source files modified during this lane. All chronic findings cite HEAD `c3bf0a2` source artefacts (`file:line`) re-verified via `rg -n` during authoring. Every disposition pairs with: (a) the exact W0 reconciliation row that disposes it; (b) the wave that owns the W3-side action (I.W3); (c) the expected file-bounds the W3 lane will edit. No new abstractions proposed; W3 picks per H δ §9 + I.md invariants 1, 2, 7, 10, 12.
