# Pass-E · dock/layers — COMPONENT deep audit

**Page:** `demo/stories/dock/layers.vue` (`import @mkbabb/glass-ui/dock`)
**Real component(s) audited:** `src/components/custom/dock/DockLayerGroup.vue` (417L) + `DockLayer.vue` (82L) + the layer-transition engine `composables/useLayerTransition.ts` (385L, standalone path) + the orchestrator group-registration `composables/dockMorphContext.ts` (`onSwap`/`registerGroup`/`addTarget`) + the drag-to-switch `composables/useDragMorph.ts` (consumer #2) + the CSS `src/styles/dock/{layers,layer-group}.css`. Host shell + the shared morph engine are the `dock-overview-component.md` audit's subject (GlassDock.vue/dockMorphMeasure/useDockState); this page's PROTAGONIST is the **layer-group** — the drill-in / switcher-rail / nested-collapsible / vertical-overflow surface. The page backdrop is the shared `<Aurora>` via `DockStage.vue`.

Lens: ANIMATION affordance · procedural-viz spec · performance · Safari · idiomatic/no-legacy · the glass six-layer composite. Mapped to FOLD/MODIFY/AUGMENT/PRUNE on the existing BD tranche.

---

## 1 · ANIMATION — four-state + spring + entrance/exit (per motion-canon)

**Strong, and architecturally right.** The layer-group is the dock's morph surface and it carries the affordance the way the canon wants:

- **The pane-swap is ONE spring, ONE scalar, transparently nested.** A `<DockLayerGroup>` inside a `<GlassDock>` DEFERS its pane-swap to the dock's single orchestrator via `registerGroup` (`dockMorphContext.ts:466`) — it registers as a SECOND morph target on the dock's ONE `SpringProgress`/`--dock-morph-t` clock, so a simultaneous collapse + pane-swap is co-driven with no second engine. Standalone (the demo's flagship cases) it self-orchestrates via `useLayerTransition` — the SAME FLIP-pin-measure-arm dance, same `DOCK_SPRING` register (response 0.32 / ζ 0.7). The deferral is transparent to `<DockLayer>` (`currentLayer`/`leavingLayer` are read-only either way).
- **Crossfade is on the SAME scalar (no second timer).** The leaving pane fades `opacity: calc(1 - var(--dock-morph-t))` gated on `[data-morphing]` (`layers.css`) — a pure FUNCTION of the box clock, so an interrupted/retargeted switch carries the crossfade WITH it. The prior `opacity var(--dock-motion-resize)` SECOND clock (the "laggy/delayed" ghost the user read) is gone. The entering pane is revealed by the clip aperture, never faded-in (the AW.W2 clip-reveal contract).
- **Child stagger off the one scalar.** The active pane's children cascade in on the `--dock-expand-t` inheriting alias (per-child `nth-child` onset off the ONE `--dock-stagger-step` token; the hand-typed 0.08/.../0.4 ladder retired) — symmetric expand/collapse, interrupt-safe, PRM-collapses to zero stagger frames.
- **Drag-to-switch is velocity-continuous (consumer #2).** `draggable` wires the rail to `useDragMorph` — pull along the rail axis, fling-to-nearest writes the consumer-owned `activeLayer` model (one-registry, no shadow state); reka roving tabindex + Arrow keys stay. The snap centers re-resolve in client space.
- **PRM is honest.** `seatSync` (`useLayerTransition`) + `seatTargetSync` (orchestrator) seat the geometry SYNCHRONOUSLY via a `nextTick` post-flush measure under reduce — no rAF morph window, no collapsed-`from` sliver flash, state still toggles.

**No dead/janky/missing animation in the swap, crossfade, stagger, or drag.** One indicator-timing finding is in §3.

## 2 · PROCEDURAL VIZ — none in the component

The layer-group ships no viz. The page backdrop is the shared `<Aurora>` via `DockStage` — spec-compliant (one GL context for the column, offscreen-paused by construction), audited in the aurora pass. No layer-side viz finding.

## 3 · PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

**Two layout-animation findings — one INHERITED from the shell, one LOCAL to the rail.**

1. **(Inherited) the ROOT box per-frame layout `calc()`.** The inner `.dock-layers`/`.dock-layer-stack` morph is correctly compositor-only — it reserves the settled `to` footprint (`inline-size: max(--dock-morph-to, --dock-morph-min)`) and composites `transform: scaleX/scaleY(var(--dock-morph-scale))` over it (BB.W-DOCK-MORPH-FAMILY, `will-change: transform`). **But the ROOT `.glass-dock[data-morphing]` animates `inline-size`/`block-size` per-frame** via `calc(from + (to−from) * var(--dock-morph-t))` (`layers.css`, BC.W-DOCK-ROOT-MORPH). The wave comment is candid that "the gate + the page reflow both read the ROOT box" — a spring writing the scalar once per frame into a layout `calc()` IS a per-frame relayout, passing `proof:no-layout-animation` by the LETTER (no `transition`/`@keyframes` on a layout prop) while a spring-driven layout animation runs in fact. This contradicts the BB.W-DOCK-MORPH-FAMILY "CDP Layout track stays FLAT" headline. The drill-in + nested-collapsible demos exercise it directly. Same finding as `dock-overview-component.md` §3 — confirmed on this page; the transpose is to drive the root the SAME reserved-footprint + inverse-scale way the inner already uses.

2. **(LOCAL) the rail indicator transitions `width`/`height` (layout props on the spring curve).** The switcher-rail travelling indicator (`layer-group.css:269-272`) is:
   ```css
   transition:
       width var(--duration-fast) var(--spring-snappy),
       height var(--duration-fast) var(--spring-snappy),
       transform var(--duration-fast) var(--spring-snappy);
   ```
   `transform` is the correct compositor leg (the travel), but `width`/`height` are LAYOUT properties being transitioned on every tab-size change — a per-frame relayout of the indicator backplate during the glide. Because all rail tabs are equal-size (`--dock-layer-tab-size` fixed), the `width`/`height` legs are NO-OPS at rest in the demo's uniform rails — but they are a latent layout-animation seam (a heterogeneous-tab rail would thrash), and the gate doesn't catch a `transition: width` paired with a spring TIMING FUNCTION on a `--reka-tabs-indicator-size` box. The idiomatic transpose is the SegmentedTabs indicator pattern: drive the size via `scale` (the indicator's own `useTabIndicator`/`useLiquidFlex` reciprocal-stretch) so only `transform` animates — the size becomes a one-time reserve, never a transitioned layout prop.

**Offscreen-pause:** N/A — the group owns no rAF (`SpringProgress` parks on settle via `disposeSpring`; `useDragMorph` is pointer-event driven). `measurePeak` is `useResizeObserver`-gated + watch-gated (register/unregister + layer-count), monotonic-widen-only — no idle loop, no thrash.

## 4 · SAFARI compatibility

**Clean.** The swap is `transform`/`scale`/`@property --dock-morph-t` (registered) + scalar-`calc` opacity; the rail indicator is `transform: translateX/Y(var(--reka-tabs-indicator-position))`. No `backdrop-filter: url()`, no `:has()`-gated morph, no WebKit nested-`backdrop-filter` reliance in the group. `inert`/`aria-hidden`/`tabindex` post-swap focus routing (`DockLayer.vue:54`) is baseline. The `view-transition-name` is `@supports`-gated (`startViewTransition in document`) so the FLIP fallback keeps a plain box on WebKit (Safari shipped VT but the spring FLIP is the universal authority — no capability fork). **The one Safari-adjacent risk is the ROOT layout `calc()` (§3.1)** — a relayout, not an incompat. No WebKit finding on the layer-group itself.

## 5 · IDIOMATIC / no-legacy

- **The root-box layout-`calc()` dual-path (§3.1)** is the one non-idiomatic seam in the shared morph (two morph mechanisms — compositor-scale inner, layout-calc root — where reserved-footprint scale should serve both). Architectural-transposition candidate, shared with the overview audit.
- **The rail-indicator `width`/`height` transition (§3.2)** is a latent layout-animation that should ride the SegmentedTabs `scale`-reserve idiom — the library already OWNS that pattern, so this is a transpose-onto-existing, not a new mechanism.
- **`useLayerTransition` is a self-documented near-duplicate** of the orchestrator's FLIP dance, BOOKED to AY.W-GOD1 (the FLIP-engine fold) and DRIFT-GUARDED by `proof:dock-orchestrator-single` until then. This is a KNOWN, gated, deliberate hold (folding now breaks the public `/dock` `useLayerTransition` re-export) — not unaudited dead code, but it IS a standing dual-engine the BD close should re-confirm or land.
- Otherwise idiomatic: typed-key DI (`provideDockLayerGroupContext`), `isComponent` accepts the lucide-v1 FUNCTIONAL form (the AY.W-DOCK-NAV B6 first-letter-fallback fix), `:indicator="false"` + `<TabsIndicator :surface="false">` kills the double-indicator + the baked near-white plate (AY.W-DOCK2 D5 / AZ.W-DOCK-RAIL), the rail is a hairline register (transparent bg + single divider), monotonic peak-reserve on the group's OWN root (box-inviolate). No dead code in the group.

## 6 · The glass six-layer composite

**Present on the host shell** (inherited from GlassDock — blur+saturate · `--glass-bg-dock` tint · rim · moving-specular catch-light · drop shadow · grain), so the layer panes render INSIDE the full composite. **But the layer-group's OWN surfaces under-use it:** the switcher-rail is a deliberate HAIRLINE (transparent `--dock-layer-rail-bg` + one divider — correct for a rail), and the travelling indicator reads `--dock-layer-rail-active` = `--glass-bg-floating` (the "selected reads as glass" tier — tint only, no rim/catch-light/depth-step). The BD hallmark depth hierarchy (protagonist `.glass-deep` 16px vs floating-satellite 13px) is ABSENT on the layer panes — the same gap the overview audit flags. The drill-in active pane is the protagonist and could read the deep tier; the rail tabs are the floating satellites.

---

## Tranche actions (FOLD / MODIFY / AUGMENT / PRUNE)

- **MODIFY `BD.W-DEEP-GLASS-20PX`** — extend its root-box scope (already named in `dock-overview-component.md`) to cover BOTH the inherited ROOT-box layout-`calc()` (`layers.css` BC.W-DOCK-ROOT-MORPH) AND the LOCAL rail-indicator `width`/`height` transition (`layer-group.css:269-272`): transpose both onto the reserved-footprint + `scale`-over-`to` mechanism (the inner `.dock-layers` for the root; the SegmentedTabs `useTabIndicator` `scale`-reserve for the rail indicator). HARDEN `proof:no-layout-animation` to flag (a) a live-`var(--dock-morph-t)`-in-a-layout-`calc()` and (b) a `transition: width/height …` paired with a `--spring-*` timing function — the two by-the-letter evasions.
- **FOLD into `BD.W-DOCK-CONSTELLATION` (hallmark §1)** — give the drill-in/switcher active PANE the deep-glass tier (protagonist) vs the rail tabs as floating satellites; the missing depth step is the layer-group's six-layer gap.
- **MODIFY / re-confirm `BD.W-WEAK-KEEP-REGRADE` or the close discipline** — re-confirm the `useLayerTransition`↔orchestrator dual-engine BOOKED to AY.W-GOD1: either LAND the fold in BD or re-stamp the drift-guarded hold with a BD-named successor (it currently rides a cross-tranche book; the disposition register should DECIDE it, not re-book).
- **AUGMENT the demo (demo/synthesis lens, not src):** standardize the import path label `../../../src/components/custom/dock` → `@mkbabb/glass-ui/dock`; wrap each `<StorySection>` in its OWN glassy card + enlarge the main card area (the user structure ask — currently transparent `.dock-stage-tile` slots); the demos already deftly compose dock APIs (drill-in / switcher-rail / draggable pull / vertical-overflow / nested-collapsible) over the colorful aurora — keep that, tighten the verbose `<p>`/`<ol>` mechanics copy. These are `BD.W-DATA-BAND-GLASS`/`BD.W-PAGE-HEADER-FOLD`-class moves.
- **PRUNE:** none in the component — no dead code, no orphan path beyond the two MODIFY layout-animation seams and the gated dual-engine.

---

## VERDICT (5 lines)

1. The DockLayerGroup layer-swap is flagship-grade: ONE `DOCK_SPRING` scalar drives box + crossfade (`calc(1 - t)`) + child stagger in lockstep, transparently nested onto the dock orchestrator (`registerGroup`) or self-orchestrated standalone, velocity-continuous + honest synchronous-PRM-seat + drag-to-switch consumer #2 — no dead/janky/missing animation in swap, fade, stagger, or pull.
2. TWO layout-animation findings: (a) the INHERITED ROOT box `.glass-dock[data-morphing]` `inline-size`/`block-size` per-frame `calc(--dock-morph-t)` (passes `proof:no-layout-animation` by the letter, contradicts the "CDP Layout flat" headline), and (b) the LOCAL rail indicator transitioning `width`/`height` on a `--spring-snappy` timing function — latent layout-thrash that should ride the SegmentedTabs `scale`-reserve idiom.
3. Safari-clean (transform/`@property`/scalar-calc swap, `@supports`-gated VT, baseline `inert`/focus-routing, no `backdrop-filter:url()`); the only Safari-adjacent risk is the ROOT layout-`calc()` relayout, not a WebKit incompat.
4. The glass six-layer composite reaches the panes via the host shell, but the layer-group's own surfaces lack the BD hallmark depth step — no deep-vs-floating glass (protagonist drill-in pane `.glass-deep` vs floating rail satellites); fold to `W-DOCK-CONSTELLATION`/`W-DEEP-GLASS-20PX`.
5. One gated dual-engine to DECIDE (`useLayerTransition`↔orchestrator FLIP, BOOKED to AY.W-GOD1, drift-guarded) + demo-only AUGMENT (standardize import label, per-section glassy cards + bigger main area, tighten mechanics copy) — the demos already deftly compose drill-in/switcher/draggable/overflow/nested dock APIs over the colorful aurora.
