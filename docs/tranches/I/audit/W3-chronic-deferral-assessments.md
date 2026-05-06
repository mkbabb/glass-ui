# I.W3 — Chronic-deferral Assessments (formal-deferral entries)

**Date**: 2026-05-05
**HEAD before W3.α**: `35773c4` (post-W1+W2 close)
**Author**: Lane α (substrate-tier hierarchy + story-fidelity policy + axis ownership + chronic-deferral assessments)
**Status**: closed.

## Purpose

Per I.md invariant 1 ("no silent deferrals — planned work lands, is formally retired, or moves to a named destination") + invariant 2 ("each chronic item closes via wire / retire / refactor; or formally retired with named replacement; or carries an explicit permanent deferral with binding rationale; no fourth option"), the items below are formally retired as **permanent deferrals** with binding rationale.

Each row names the binding rationale. Soft language ("future tranche may revisit", "consider re-opening if…") is forbidden — permanent deferral is binary.

---

## 1. R4 `<HarmonicLevelGrid>` / Filmstrip primitive — PERMANENT consumer-territory deferral

**Chronic span**: 2 tranches (G FINAL → I.W3).

**Source state at HEAD**: not present in `src/`. Never landed in glass-ui.

**Disposition**: PERMANENT consumer-territory deferral. Never returning to library.

**Binding rationale**: `<HarmonicLevelGrid>` (and the related Filmstrip primitive) is a single-consumer artefact (the `fourier-analysis` consumer). It fails the ≥ 2-call-site bar that governs library inclusion. The consumer owns the primitive in its own tree. Adding it to glass-ui would be overfitting per the no-overfitting precept (`docs/precepts/instructions/README.md` Edicts).

**Restoration trigger**: none. If a second named consumer requires the primitive, that consumer's tranche opens a new wave to upstream the primitive — but the deferral does not reopen automatically. The 2-tranche chronic carry ends here.

---

## 2. R5 Blob Web Worker — PERMANENT deferral until lower-end runtime evidence forces reassessment

**Chronic span**: 2 tranches (G/blob/SPEC.md §11.4 trigger encoded → I.W3).

**Source state at HEAD**: trigger condition encoded in `src/composables/blob/SPEC.md §11.4` ("8+ multi-instance specimens → migrate to Web Worker"). H W5 stress baseline captured **FPS 119.62 / 0 KB-per-instance at 8 multi-instance specimens on M4 Max**. The 8+-instance trigger condition is unreachable on the current development hardware: at 8 instances the system is already at full vsync with zero allocation pressure.

**Disposition**: PERMANENT deferral. The trigger condition stays encoded in SPEC.md as documentation; no Web Worker implementation lands.

**Binding rationale**: the SPEC's named threshold (8+ multi-instance) is observed-met-without-issue at HEAD on M4 Max. The Worker migration was framed as a backstop against runtime regression beyond a specific FPS / allocation threshold; the threshold is currently unfindable. Implementing the Worker without an observable performance budget violation would be substrate-without-consumer (per `docs/precepts/instructions/README.md`'s "Substrate with consumer" precept) — landing a parallel WebGL-in-Worker codepath with no consumer evidence and no benchmark requiring it.

**Restoration trigger**: lower-end runtime evidence — a named consumer running on hardware where the 8-instance baseline drops below the SPEC §9 budget (0.5 ms / 0.3 ms per-component). Until that evidence surfaces, the trigger is "encoded but unreachable on current dev hardware" and the deferral binds.

---

## 3. Plugin extraction (Tailwind plugin) — PERMANENT deferral with binding rationale

**Chronic span**: 4 tranches (E aspirational → F deferred → G deferred → H deferred → I.W3).

**Source state at HEAD**: no `src/plugin/` directory; no Tailwind plugin entry in `vite.library.ts`; no plugin-shape exports in `src/index.ts`. Aspirational across 4 tranches without a named consumer or a named timeline.

**Disposition**: PERMANENT deferral. Plugin extraction is consumer-territory; the library does not ship a Tailwind plugin layer.

**Binding rationale**:
1. **No named consumer outside speedtest.** The plugin-extraction aspiration originated in E/F as "consumers might want a Tailwind preset that exports the @theme block + custom utilities". Across four tranches no consumer has emerged that requires the packaging boundary; the speedtest consumer ingests glass-ui via `npm install` and `@import "@mkbabb/glass-ui/styles"` without needing a plugin shape.
2. **A consumer-grade plugin would replicate per-consumer the existing flow.** The `@theme` block + `@utility` declarations already export through `src/styles/index.css`; a Tailwind plugin layer would re-emit the same primitives with no enabled-by-plugin use case.
3. **Adding a plugin would re-introduce the substrate-with-consumer concern at the plugin layer.** A plugin abstraction with no plugin-shaped consumer is the same overfitting pattern the precept forbids — moved one layer down.

**Restoration trigger**: a future consumer emerges that explicitly requires plugin extraction (e.g., the consumer's tooling cannot ingest CSS imports and needs a JS-shaped Tailwind preset). At that point, a new tranche opens with the named consumer as the substrate-with-consumer evidence. The deferral does not reopen automatically.

---

## 4. Reduced-motion + a11y deeper sweep — POSTURE STATEMENT lands; deeper consumer-grade sweep PERMANENTLY deferred

**Chronic span**: 5 tranches (C FINAL "future-tranche seeds" → D / E / F / G / H dormant → I.W3).

**Source state at HEAD**: many components have `prefers-reduced-motion` guards (sample sites: `src/styles/animations.css` overrides for sparkle-sweep / rainbow-drift / idle-bob; `src/composables/blob/useBlob.ts` PRM gate; component-local `@media` queries). No project-level a11y posture statement existed at HEAD.

**Disposition**: a brief `## Accessibility Posture` section LANDS in DESIGN.md naming what the library guarantees; deeper consumer-grade sweep (WCAG AA contrast against arbitrary themes, screen-reader copy, session-level a11y testing) is PERMANENTLY deferred as consumer territory.

**Binding rationale**:
- Library tier provides primitives; consumers compose final compliance.
- The library's posture is binary: (a) `prefers-reduced-motion` honored throughout via component-local `@media` queries; (b) keyboard nav delegated to reka-ui upstream; (c) ARIA attributes delegated to reka-ui upstream; (d) `prefers-contrast: more` and `prefers-reduced-transparency: reduce` honored on substrate primitives; (e) focus contract via `.focus-ring` utility consumed by every interactive primitive.
- Consumer-grade compliance (WCAG AA color contrast against arbitrary consumer themes, session-level axe / pa11y / Lighthouse runs, locale-specific screen-reader copy, keyboard shortcut conflict resolution against the consumer's surrounding shell) is binary out-of-scope: it depends on the consumer's theme tokens, locale, shell, and compliance bar.

**Restoration trigger**: a named consumer requires library-tier WCAG AA testing as part of upstream a11y certification. At that point a new tranche opens with the named consumer's compliance bar as the substrate-with-consumer evidence. The deferral does not reopen automatically.

DESIGN.md `## Accessibility Posture` section is the canonical reference.

---

## 5. C-8 — `<Blob>` instance double-rAF — PERMANENT internal deferral

**Chronic span**: H deep-audit δ C-8 → I.W3.

**Source state at HEAD**: `<Blob>` instance runs two simultaneous rAF subscriptions:
- `src/composables/blob/useBlob.ts:135` registers a `useRAFLoop` driver.
- `src/composables/blob/_internal/useBlobPointer.ts:113-120` hand-rolls a separate `requestAnimationFrame` integrator with its own start/stop machinery.

The `_internal/` boundary is enforced via `src/composables/blob/index.ts` (only `useBlob` + `useWatercolorBlob` facades exported; no `useBlobPointer` public surface).

**Disposition**: PERMANENT internal deferral. The `_internal/` boundary holds; no public API affected; no observable cost.

**Binding rationale**: the architectural duplication is real but non-blocking:
1. **`_internal/` boundary holds.** Consumer code cannot reach the duplication; the public API surfaces (`useBlob`, `useWatercolorBlob`) are stable.
2. **No observable cost.** H W5 stress baseline showed FPS 119.62 / 0 KB-per-instance at 8 multi-instance specimens — both rAF subscriptions running simultaneously, no FPS drop, no allocation pressure.
3. **Refactor is welcome but not gated.** Future tranches may consume `useRAFLoop` inside `useBlobPointer` to share the scheduler; the consolidation is non-load-bearing.

**Restoration trigger**: blob runtime regresses below the H W5 baseline (FPS < 60 at 8 instances on M4 Max OR SPEC §9 budget violation observed) OR `useBlobPointer` ever needs to ship as public API. Either condition forces a refactor to single rAF scheduler. Until then, the duplication stays and the `_internal/` boundary is the binding rationale.

---

## Self-check

- 5 formal-deferral entries: R4, R5, plugin extraction, a11y deeper sweep, C-8 blob double-rAF.
- Each entry has a binding rationale (no soft language).
- Each entry names a restoration trigger (concrete, observable) — not "consider re-opening" or "future tranche may revisit".
- Each entry is binary: PERMANENT or PERMANENT-WITH-NAMED-TRIGGER. None hold the conditional shape that turned C / D / E / F / G / H tranches into chronic carriers.
- The a11y row also lands a posture statement in `DESIGN.md ## Accessibility Posture` per I.md cross-tranche-debt §2.

## Authority

Per I.md invariant 1 ("no silent deferrals") + invariant 2 ("no fourth option"). Each chronic carry that I.md cross-tranche-debt section flagged for I.W3 disposition is now closed: R4 retired as consumer territory; R5 retired with trigger encoded but unreachable; plugin extraction retired as consumer territory with three-clause rationale; a11y posture lands a brief statement in DESIGN.md and the deeper sweep retires as consumer territory; C-8 retires as internal `_internal/`-boundary deferral with named restoration triggers. No item carries to I W4 or beyond.
