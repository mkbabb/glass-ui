# Pass-E dock GESTALT (orchestrator-synthesized — the synth/gestalt agents rate-walled; 18 context docs + the live probe folded)

## The verdict: the COMPONENTS are mostly right; the DEMOS are broken/spec-sheets — plus 3 real component bugs.
The dock band's engines are architecturally sound (one `SpringProgress`/`DOCK_SPRING` clock, one `--dock-morph-t` scalar, honest PRM seat, the pane-swap, the four-state leaf). The failures cluster in (a) the DEMOS (dead bindings, spec-sheet staging, frozen docks) and (b) THREE component bugs.

## The 3 COMPONENT bugs (real, src — aggressive-prototype targets)
1. **`cta-receive` P0 — DEAD at runtime.** `useDockCtaReceive` `setPending()`/`receive()` THROW (`target.setAttribute is not a function`, `el.getBoundingClientRect is not a function`): `options.dockControl.value` is the COMPONENT INSTANCE, not the HTMLElement (`useDockCtaReceive.ts:184-185,222,280`). The composable must resolve the real element (`instance.$el` / unref + element-guard). → FIX the composable's element-resolution + the demo's ref binding. (the [glass-ui binding verification] stale-binding class.)
2. **`morph-showcase` — orientation-morph REFLOW (P5 violation, collapses to 0×0).** `useDockOrientationMorph.writeScalar` drives `useLiquidFlex.sizeStyle` (per-frame `width`/`height`) — a reflow storm; when the measure returns 0 the box collapses (live-confirmed pane→0×0). The PRODUCTION `dockMorphContext` does it right (reserve footprint once + `transform: scaleX/scaleY`). → transpose that discipline; bind `transform`, never `sizeStyle`, as the live channel.
3. **`rail` — the fan clock is `--duration-normal` not `--spring-dock-duration`** (`stack-rail.css:198-201`) + the `.dock-stack-core` anchor has no entrance. → re-point the clock; add the core entrance.

## The SYSTEMIC demo failures (the W-STORY-PAGE-STANDARD + Band-16 work)
- **Glass not over a colorful field** — every dock page's aurora is a calm wash (faint ghost pill); dark mode = muddy brown void. The lens has nothing to refract. → W-PAGE-BACKGROUND must make the field colorful + bright (the user's core ask).
- **Subsections NOT each in a glassy card; the main area SMALLER not bigger** (1152px cap on 1440 = ~290px dead margin) — every page. → W-STORY-PAGE-STANDARD (the demo sub-type chassis: glassy sub-cards + a bigger stage).
- **Spec-sheet aesthetic, no protagonist** — overview (11 same-weight sections), layers (5 sibling pills), rail (4 identical), sections/morph-showcase (dead-at-rest). → stage ONE protagonist demo at 2× scale + a poster-rung anchor; demote the feature-checklist.
- **The contextual-switching/animating APIs not exercised** — sections (always-expanded freezes it), morph-showcase (only the flip), rail (DockStack invisible at rest). → the demos must DRIVE the dock APIs live (auto-play a contextual switch, fan the stack at rest, etc).
- **Dead demos:** layers vertical-overflow doesn't scroll; overview "menus teleport" is text-only; cta-receive throws.
- **Import-label split:** the visible chip is `@mkbabb/glass-ui/dock` but SFCs import relative deep paths (`rail.vue:23`) → standardize.

## Prototyping order (aggressive, this branch — prototype/liquid-dock)
1. **cta-receive P0** (clearest runtime bug — fix the element-resolution). ← STARTING.
2. **orientation-morph reflow** (transpose the scale() discipline).
3. **rail fan clock + core entrance.**
4. **The systemic demo chassis** (W-STORY-PAGE-STANDARD glassy-cards + bigger-stage + colorful-field + protagonist-staging + drive-the-APIs) — the big refactor, after the component bugs.

## Convergence
The dock needs SEVERAL loops: loop 1 = the 3 component bugs (prototype now); loop 2 = the systemic demo chassis; loop 3 = the protagonist staging + the colorful field + re-audit. Per-page: overview 40% (component good, demo spec-sheet) · layers 45% · rail 40% · morph-showcase 35% (the reflow + teardrop) · sections 25% (frozen, dead) · cta-receive 20% (DEAD) · dock-search un-audited. Category ~35% → target HIGH convergence over the loops.
