# BG tranche — the forensic audit brief (the SHARED context for the audit fleet)

**This is TRANCHE DEVELOPMENT, not implementation.** Every agent AUDITS + SPECS. No agent
edits `src/` behavior. Deliverables are AUDIT findings + WAVE specs written to disk.

## The mission

glass-ui **4.2.0 shipped to npm** (the BD greenfield "warm/weighty/liquid" redesign), but LIVE
validation on the demo storybook (`localhost:5173`) reveals **most pages and most core
functionality are broken** — the recurring *headless-green / visually-broken* gap (the gates were
green; the UX is not). The user has commissioned a deep, first-principles re-interrogation: audit
every change made, the original plan + its waves, the whole component/dock/motion/viz surface for
KISS/DRY/encapsulation, recap ALL historical requests for coverage, and devise a gestalt path
forward as the **BG tranche**.

**Cardinal laws (binding on every wave spec you write):**
- **NO quick solutions, NO workarounds.** Idiomatic, gestalt, first-principles approaches only.
  Architectural transpositions in service of elegance, simplicity, and performance are *desired*.
- **NO legacy code.** Clean breaks, no aliases, no migration shims, no dual paths. (memory: no-backwards-compat)
- **KISS + DRY + DEFT integration.** A union, never a bolt-on/fork. Colocate composables with their
  components. Break >500-line components into sub-component dirs (components/ composables/ constants/
  skeletons/, recursively if warranted) WITHOUT contrivance or over-engineering.
- **Presets in consumers** — the library's own default tokens are its identity and evolve in
  `src/styles/`; named themed presets live in consumer repos.
- **Warm/weighty/liquid identity** — every motion carries inertia/weight/bounce/liquid-glass.
  iOS-27 fidelity · cartoon-technicolor flow & punch · aristotelian √φ proportion · the 12 laws of
  animation applied universally · perfected glass+paper morphism. (see DESIGN.md / design.md)
- **Chrome AND Safari** — metaballing + liquid must be perfect in both.
- **Foreign-tree fence ABSOLUTE** — edit ONLY glass-ui; never touch sibling repos.

## The CONFIRMED live defects (orchestrator-verified, 2026-06-25)

The orchestrator reproduced/root-caused these directly. Your job is to DEEPEN + SPEC the gestalt fix,
not re-confirm them.

1. **ROUTING FREEZE (linchpin, confirmed live).** Clicking a nav link changes the URL but NOT the
   rendered page — the old page stays until a hard reload. Reproduced: `/foundations/intro` →
   `/substrates`, URL changed but heading stayed stale and `<main>` childCount went 2→3 (the LEAVING
   page never unmounted; old+new coexist). Root cause: the `.scroll-build` mount `animation` on the
   page root COLLIDES with the `<Transition name="fade-slide">` `transition` in `AppShell.vue` →
   Vue's auto transition-type detection mis-fires → the leave hook never resolves. Compounded by the
   `useBloomUp` "find first non-skeleton child" hack (AppShell L279-303) + TWO no-op
   `startViewTransition` watchers (category-switch L212-228 + morph). The entire route-transition
   layer is over-contrived and must be re-thought from first principles (ONE coherent, idiomatic
   route transition; remove the bloom-find-child hack and the no-op VT watchers).
2. **Metallic background everywhere.** `src/styles/paper.css` `.paper-field` paints a
   `conic-gradient` cel-sheen (iridescent purple/blue sweep) + 4 high-chroma radial-gradients +
   the `--paper-grain-tooth` feTurbulence speckle @ ~0.22 opacity = a "disgusting" brown woven
   metallic wash on every page. USER DIRECTIVE: **every page should have an AURORA, not the paper
   wash.** (Reconcile with the one-GL-context-per-route budget + offscreen-pause discipline.)
3. **Red/maroon shadow-cast aliasing** bleeding around docks (a `.cartoon-cast` / `--glass-key`
   warm cast mis-tuned to an intense red drop-shadow). Visible as a red halo on the left/bottom of
   docks. Also: **card corners do not clip** (rectangular aliasing at card top corners) and a
   **strange aliasing in the bottom-left corner of docks**.
4. **Titles no longer scroll-and-shrink** (the ScrollCard / scroll-shrink-header register is dead).
5. **An aberrative bar at the top of every page** (a stray gradient/metallic bar).
6. **None of the /substrates previews work** (the procedural viz previews are broken).
7. **Configurator drawer does not work** (the gear → Sheet/PresetEditor is broken).
8. **The persistent ℱ brand section** atop BOTH the vertical and horizontal dock is useless → REMOVE.
9. **Page transitions are totally broken** (see #1).
10. **`/compositions/hero` is broken, headers WAY too large** (the √φ display clamp over-scales).
11. **Category cards waste enormous space** — a tiny icon + a huge empty thumbnail. USER DIRECTIVE:
    **live previews of REAL components, not icons.**
12. **Dock scrolling does not work.**
13. **The V↔H morph is a modal demo and esc doesn't work.** USER DIRECTIVE: remove the
    crossfade/View-Transition variant (only the liquid teardrop works); make the morph **a BUTTON IN
    THE DOCK** that morphs the vertical dock into the horizontal (and back) IN PLACE — not a demo,
    not a modal.

## The Siri references (for the new-capability triumvirate — separate workflow)

Two iOS screen recordings (frames at `scratchpad/evidence/frames-2144/` + `frames-2207/`):
- The **Siri glass island** — a floating glass pill that descends/morphs over content and answers
  ("2 plus 2 is 4." in an island with a warm under-glow), plus the home "Search or Ask" pill +
  Dynamic Island. Must **deftly augment + integrate with the existing GlassDock system**.
- The **Siri waveform** — a warm luminous (amber/orange/pink) waveform that pulses under/within the
  island when listening/responding.

## Structural inventory (HEAD)

- `src/`: 859 files. Components >500 lines: `dock/GlassDock.vue` (711),
  `glass/webgl/createCanvasLifecycle.ts` (695), `webgpu/useWebGPUCanvas.ts` (606),
  `dock/composables/useDockFission.ts` (604), `carousel/CarouselContent.vue` (577),
  `dock/composables/useDockContextSilhouette.ts` (551), `glass/useGlassBackdropLuminance.ts` (542),
  `goo-blob/composables/useBlobSatellites.ts` (533), `tabs/SegmentedTabs.vue` (512),
  `pager-dots/PagerDots.vue` (509), `goo-dot-matrix/composables/useGooDotMatrix.ts` (508),
  `motion/useBloomUp.ts` (507), `api/index.ts` (505).
- The **dock dir is 33 files** (12 components + 18 composables + constants + README) — a primary
  KISS/DRY/encapsulation target. Composables: dockContext, dockLayerContext, dockMorphContext,
  dockMorphMeasure, isTeleportedTarget, railProjection, useDockClickIntegrity,
  useDockContextSilhouette, useDockFission, useDockHold, useDockItemDrag, useDockMorphWindow,
  useDockOrientationMorph, useDockSearch, useDockShellProps, useDockState, useLayerTransition.
- demo >400 lines: `manifest.ts` (1236), `dock/liquid-playground.vue` (930), `AppShell.vue` (860),
  `substrates/blob.vue` (870), `substrates/constellation.vue` (759), `dock/overview.vue` (680),
  `display/card.vue` (562), `SidebarDock.vue` (498), `substrates/fourier-field.vue` (490),
  `data/search.vue` (488), `BottomDock.vue` (482), `motion/curve-gallery.vue` (480),
  `motion/deck.vue` (460), `StoryHero.vue` (432).

## Key file map

- Routing/shell: `demo/router.ts`, `demo/layout/AppShell.vue`, `demo/layout/{SidebarDock,BottomDock}.vue`,
  `demo/stories/manifest.ts`, `demo/stories/SectionLanding.vue`, `demo/stories/StoryHero.vue`,
  `demo/composables/{useStoryNavigation,useContextualDockLayers}.ts`.
- The field: `src/styles/paper.css`, `src/components/custom/paper-backdrop/PaperBackdrop.vue`,
  `demo/stories/warm-field.ts`.
- Glass system: `src/styles/glass/*.css` (glass-capsule.css, ladder.css, surfaces.css, deep.css,
  adaptive-legibility.css, rim.css, reveal.css, material.css), `src/styles/tokens/*.css`.
- Motion: `src/styles/motion/morph-field.css`, `src/styles/scroll-choreography.css`,
  `src/composables/motion/{useMorphField,useBloomUp,useLiquidReveal}.ts`.
- Cards: `src/components/ui/card/*`, `src/styles/cards.css`.
- The original BD plan: `docs/tranches/BD/GREENFIELD-HARDENING-PLAN.md`,
  `docs/tranches/BD/IMPLEMENTATION-PROGRESS.md`, `docs/tranches/BD/greenfield/{slug}/WAVE-AMENDMENT.md`.
- Design principles: `DESIGN.md`, `docs/precepts/design.md`, `docs/precepts/motion-canon.md`,
  `docs/precepts/design-idioms.md`. Tranche history: `docs/tranches/{AT..BF}/`.

## Output contract (every audit agent)

1. Read this CONTEXT.md fully first.
2. Do your assigned audit by reading the real source (Read/Grep/Glob/Bash — verify against HEAD,
   never assume).
3. Write your findings to the exact path your prompt names (`docs/tranches/BG/audit/<file>.md`),
   structured as: **FINDINGS** (what is actually true at HEAD, with file:line evidence) →
   **ROOT CAUSES** (gestalt, first-principles) → **PROPOSED WAVES** (each: a `BG.W-<NAME>` id, a
   one-line intent, the idiomatic gestalt approach, the files touched, the acceptance/π bar, and
   any chronic/deferred item it folds in). Be concrete and specific; cite real symbols.
4. Return (as your final message) a compact structured summary: the wave ids you propose + a
   one-line each + the single highest-severity finding. Keep it under ~400 words — the detail lives
   in your file.

Idiomatic > clever. Gestalt > patch. When you find a contrivance, name the SIMPLER thing that
replaces it. Default-broken skepticism: assume the shipped 4.2.0 code is broken until the source
proves otherwise.
