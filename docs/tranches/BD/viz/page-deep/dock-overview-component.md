# Pass-E · dock/overview — COMPONENT deep audit

**Page:** `demo/stories/dock/overview.vue` (`import @mkbabb/glass-ui/dock`)
**Real component(s) audited:** `src/components/custom/dock/GlassDock.vue` (452L) + the control family (`DockIconButton`/`DockSelectTrigger`/`DockDropdownTrigger`/`DockSeparator`/`DockBackgroundToggle`) + the morph engine (`composables/dockMorphContext.ts` 498L, `dockMorphMeasure.ts` 354L, `useDockState.ts`, `useDockClickIntegrity.ts`) + the CSS (`src/styles/dock/{morph,layers,shell}.css`, `src/styles/dock-controls/icon-button.css`). The page's decorative aurora is `src/components/custom/aurora` via `DockStage.vue`.

Lens: ANIMATION affordance · procedural-viz spec · performance · Safari · idiomatic/no-legacy · the glass six-layer composite. Mapped to FOLD/MODIFY/AUGMENT/PRUNE on the existing BD tranche.

---

## 1 · ANIMATION — four-state + spring + entrance/exit (per motion-canon)

**Strong.** The dock has genuinely HIGH animation affordance, and it is the rare case where the affordance is *architecturally* right, not bolted on:

- **Four-state contract is complete on every control** (`dock-controls/icon-button.css`): rest (muted glyph) · `:hover` (glass-translucent `--dock-control-hover-bg` fill + `scale: var(--scale-hover-dock)`) · `:active` (the AZ.W-REGISTER-IOS *darken-plus-shrink* — `--dock-control-press-bg` a tier below resting + `scale: var(--scale-press-dock)`) · selected (`[data-active]`/`aria-pressed` → `--dock-control-active-bg` = `--glass-bg-floating`, the "selected reads as glass" tier, never a brand hue). The press transition is transform-scoped on `--dock-press-spring` (spring) while the surface legs stay on the flat `--dock-motion-fast` ease — exactly the motion-canon P1 SPATIAL/EFFECTS split.
- **Spring physics, one clock.** The collapse↔expand + every nested pane-swap ride ONE `SpringProgress` (`DOCK_SPRING`) writing ONE inheriting `--dock-morph-t` scalar (`dockMorphContext.ts`). Interruptible by construction — a re-toggle mid-flight `reset(0, inheritedVelocity)` re-bases the fresh spring carrying prior velocity (the iOS interruptible-physics contract; the BC.W-DOCK-GLIDE idempotent-target-snap fix is correct and load-bearing). The hover-to-expand pill-scale settles on the SAME `--spring-dock` vocabulary, so the demo's "hover reads as one continuous spring" claim holds.
- **Entrance/exit + stagger.** Child controls cascade outer→inward via the `--dock-expand-t` directional scalar (1→0 on collapse), and the collapsed-pill `--dock-reveal` `filter: blur()` settle keys off the same scalar. No dead/janky/missing animation found in the control or morph surface.
- **PRM is honest.** `prefersReducedMotion()` seats the geometry SYNCHRONOUSLY via a `nextTick` post-flush measure (`seatTargetSync`) — no rAF morph window, no collapsed-sliver flash; the state still toggles. CSS `:active`/`:focus` carve is the no-JS floor.

**No animation findings.** The four-state + spring + entrance/exit bar is MET.

## 2 · PROCEDURAL VIZ — the decorative aurora (DockStage)

The dock itself ships no viz. The page's backdrop is `<Aurora>` via `DockStage.vue` — **spec-compliant**: ONE shared GL context for the whole demo column (the one-GL-per-route budget), offscreen-paused BY CONSTRUCTION (`useIntersectionPause` + `content-visibility: auto` inside `<Aurora>`), and the pause-toggle section wires a second *functional* aurora the `DockBackgroundToggle` genuinely parks (`bgAuroraRef.pause()/resume()` — WCAG 2.2.2). GPU-only/Safari bar is the aurora's own (audited elsewhere). No dock-side viz finding.

## 3 · PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

**One genuine finding — the ROOT box is a per-frame layout animation (the dual-path).**

The INNER `.dock-layers` morph is correctly compositor-only: it reserves the settled `to` footprint and composites `transform: scaleX/scaleY(var(--dock-morph-scale))` over it (`layers.css` — BB.W-DOCK-MORPH-FAMILY, `will-change: transform`, `overflow: clip` aperture). The CDP Layout track stays flat for the inner box.

**But the ROOT `.glass-dock[data-morphing]` animates `inline-size`/`block-size` per-frame** via a live-scalar `calc(from + (to−from) * var(--dock-morph-t))` (`layers.css:105-118`, BC.W-DOCK-ROOT-MORPH). The wave's own comment is candid: it is "NOT a `transition: width` (proof:no-layout-animation stays GREEN; a `calc()` over the scalar is not a transition)" — but a spring writing `--dock-morph-t` once per frame into a `calc()` that resolves `inline-size` IS a per-frame relayout of the root box AND its page reflow (the comment admits "the gate + the page reflow both read the ROOT box"). This is a **gate-evasion seam**: the `proof:no-layout-animation` floor passes by the letter (no `transition`/`@keyframes` on a layout prop) while a spring-driven layout animation runs in fact. It contradicts the BB.W-DOCK-MORPH-FAMILY headline ("the CDP Layout track stays FLAT through the morph"). The correct transpose is to drive the root the SAME reserved-footprint + `scaleX/scaleY`-over-`to` way the inner already uses (the root reserves `to`, composites the inverse scale, and the inner cancels the double-scale) — a real architectural fold, not a knob.

Offscreen-pause: N/A to the dock (no rAF of its own — `SpringProgress` parks on settle via `disposeSpring()`/`maybeSettleRoot()`; no idle loop). `useGlassBackdropLuminance` (auto-wired ON for the dock) is rAF-throttled ≤4Hz + IntersectionObserver-gated + parks on hidden — clean.

## 4 · SAFARI compatibility

**Clean.** The morph is `transform`/`scale`/`@property --dock-morph-t` (registered) + `filter: blur()` on the surface's own pixels (NOT `backdrop-filter` — `shell.css:70` explicitly avoids the WebKit nested-`backdrop-filter` clobber). The `.glass-dock-frame` non-clipping escape avoids the backdrop-stacking-context trap. No `backdrop-filter: url()` anywhere (the BD hallmark Safari floor). `inert` + `aria-pressed`/`role` are baseline. No Safari finding on the dock; the only Safari-adjacent risk is the ROOT layout-animation above (a relayout, not a WebKit incompat).

## 5 · IDIOMATIC / no-legacy

- **The root-box dual-path (above)** is the one non-idiomatic seam: two morph mechanisms (compositor-scale inner, layout-calc root) where one (reserved-footprint scale) should serve both. Architectural-transposition candidate.
- **Demo-side (not the component):** the page imports via raw `../../../src/components/custom/dock` relative paths (the path-label standardization ask — should read `@mkbabb/glass-ui/dock`), and there is a stale commented `import` at `overview.vue:170`. The sub-sections are `.dock-stage-tile` transparent slots, NOT their own glassy cards (the structure ask: each sub-section in its own glassy card, main card BIGGER). These are demo findings, folded to the demo/synthesis lens.
- The component code is otherwise idiomatic: typed-key DI (`provideDockContext`), the carved measure helpers (`dockMorphMeasure`), `inheritAttrs:false` + explicit `$attrs` for the frame transparency. No dead code in the component.

## 6 · The glass six-layer composite

**Present and complete on the dock shell** (`shell.css`): (1) backdrop blur+saturate `backdrop-filter: var(--dock-surface-blur)` · (2) surface tint `--glass-bg-dock` element-level oklab tint (W55 seam) · (3) edge rim `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom)` · (4) inner catch-light the moving `::before` specular (`vSpecular` auto-arm on every control — ONE light per surface, the AX.W09 double-light excise) · (5) drop shadow `--shadow-dock` · (6) grain the `.glass-dock::after` `--paper-clean-texture`. Adaptive legibility (`useGlassBackdropLuminance` + the `--glass-backdrop` bucket) refines it over the live aurora. **Not present: the deep-glass tier on the dock** — the BD hallmark (§1) wants the protagonist pill as `.glass-deep` (16px) vs floating satellites (13px), a material depth step the current single-plate dock lacks.

---

## Tranche actions (FOLD / MODIFY / AUGMENT / PRUNE)

- **MODIFY `BD.W-DEEP-GLASS-20PX`** — extend its scope to fold the dock ROOT-box morph onto the reserved-footprint + `scaleX/scaleY`-over-`to` mechanism the inner `.dock-layers` already uses (kill the BC.W-DOCK-ROOT-MORPH live-scalar `inline-size`/`block-size` `calc()` at `layers.css:105-118`); pairs naturally with the deep-glass plate work since both touch the shell box. The `proof:no-layout-animation` gate should be HARDENED to flag a live-`var(--dock-morph-t)`-in-a-layout-`calc()` (the by-the-letter evasion), not only `transition`/`@keyframes`.
- **FOLD into `BD.W-DOCK-CONSTELLATION` (hallmark §1)** — the missing deep-vs-floating material step (protagonist pill `.glass-deep`, satellites floating) + the recessed-home `--glass-level` recession. The shell composite is otherwise hallmark-ready; the depth hierarchy is the gap.
- **AUGMENT the demo (demo/synthesis lens, not src):** standardize the import path label to `@mkbabb/glass-ui/dock`; delete the stale `overview.vue:170` comment; wrap each sub-section in its own glassy card and enlarge the main card (the user's structure ask) — these are `BD.W-PAGE-HEADER-FOLD`/`BD.W-DATA-BAND-GLASS`-class demo moves, not component changes.
- **PRUNE:** none in the component — no dead code, no orphan dual-path beyond the root-morph one (which is MODIFY, not delete).

---

## VERDICT (5 lines)

1. The GlassDock COMPONENT is flagship-grade on animation: complete four-state contract, ONE interruptible `DOCK_SPRING` clock, honest PRM synchronous-seat, motion-canon SPATIAL/EFFECTS split — no dead/janky/missing animation.
2. The glass six-layer composite is fully present on the shell (blur+saturate · tint · rim · moving-specular catch-light · drop shadow · grain) + adaptive luminance; Safari-clean (no `backdrop-filter:url()`, transform/`@property`-driven morph).
3. ONE real performance/idiom finding: the ROOT box (`.glass-dock[data-morphing]`) animates `inline-size`/`block-size` per-frame via a live-`--dock-morph-t` `calc()` — a layout-thrash dual-path that passes `proof:no-layout-animation` by the letter while contradicting the "CDP Layout flat" headline; transpose it onto the inner's reserved-footprint `scaleX/scaleY` mechanism.
4. The hallmark depth hierarchy is missing: no deep-vs-floating glass step (protagonist pill `.glass-deep` vs floating satellites) and no `--glass-level`-recessed home — fold to `W-DOCK-CONSTELLATION`/`W-DEEP-GLASS-20PX`.
5. Demo-only: raw `src/` relative imports (standardize to `@mkbabb/glass-ui/dock`), a stale `:170` comment, and transparent `.dock-stage-tile` slots instead of per-section glassy cards + a bigger main card (the user's structure ask) — demo-lens AUGMENT.
