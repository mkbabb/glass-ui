# Pass-E COMPONENT deep-audit — `dock/rail` → `<DockStack>` (the rail engine)

**Page:** `demo/stories/dock/rail.vue` · **Import:** `@mkbabb/glass-ui/dock`
**Components under audit (the REAL src this page demos):**
- `src/components/custom/dock/DockStack.vue` — the rail engine (the `#rail` protagonist)
- `src/components/custom/dock/composables/railProjection.ts` — the pure φ-tier facet projection
- `src/styles/dock/stack-rail.css` — the fan-out + facet recipe
- `src/components/custom/dock/DockIconButton.vue` — the member/core base (4-state contract)
- `GlassDock.vue` `#rail` wiring + `.glass-dock-frame` non-clipping escape
- secondary: `DockLayerGroup` (the one-registry partner), `DockSeparator`

The page also demos plain `<GlassDock orientation="vertical">` (collapse-morph) in 3 sections, but the rail SECTION (the page protagonist, §4) is `<DockStack>` — the focus here.

---

## 1 — ANIMATION (four-state contract · spring physics · entrance/exit per motion-canon)

**HIGH affordance, mostly idiomatic — with two real gaps.**

- **Fan-out (the hero animation): GOOD.** The hover-expand is compositor-only — `opacity`/`scale`/`translate`/`filter(blur)` only, NO animated `width`/`height`/`inset` (stack-rail.css:187-206, the `proof:no-layout-animation` floor honored). It is staggered by `--dock-stack-stagger * var(--i)` (28ms/member, reading order). The SPATIAL legs (`scale`/`translate`) ride `--spring-dock` (the iOS overshoot linear() with ~+4.6% peak, scheme-motion.css:240); the EFFECTS legs (`opacity`/`filter`) ride `--ease-out` no-overshoot. **This is the motion-canon P1 (spring-iff-spatial / bezier-iff-effect) split done correctly** — the one place in the dock band it's textbook.
- **GAP-A · the fan-out clock is `--duration-normal`, NOT `--spring-dock-duration`.** stack-rail.css:198-201 pairs `--spring-dock` with the GENERIC `var(--duration-normal)` (0.3s) instead of the spring's OWN settle clock `--spring-dock-duration` (0.28s, scheme-motion.css:263). This is the EXACT W-GLASS-CAL Unit-3 defect the per-spring-clock doctrine kills ("pairing a normalized spring curve with a generic `--duration-*` re-times every spring to one wall clock → a dead sub-pixel tail"). The dock's own resize already migrated (`--dock-motion-resize: var(--spring-dock-duration) …`, dock.css:141) — the stack fan was missed. **MOTION-CANON P4 VIOLATION.**
- **GAP-B · PRM carve is INCOMPLETE — the facet-chip tier never snaps.** The `@media (prefers-reduced-motion: reduce)` block (stack-rail.css:328-338) zeroes `scale`/`translate`/`filter` for `.dock-stack-member` but NOT for `.dock-facet-chip` — yet `.dock-stack.is-expanded .dock-facet-chip { scale: var(--dock-facet-tier-scale) }` (line 304) re-applies a recession scale that the PRM rule (which targets `.dock-stack-member`, a DIFFERENT selector — chips don't carry `.dock-stack-member`) cannot reach. Under reduce, a facets-mode carousel STILL animates/holds the tier transform. **MOTION-CANON P6 VIOLATION (facets mode).** (Not exercised on rail.vue, which is stack-mode, but it's a component defect.)
- **The CORE anchor has NO entrance.** The `.dock-stack-core` (the always-visible dock(1) glyph) gets the `DockIconButton` 4-state register (hover/press via `.dock-icon-button` base) but no mount/reveal entrance — it just appears. The fan members reveal on hover; the core is static. For a TYPOGRAPHY-forward/high-affordance bar a one-shot bloom-in of the rail core on dock-mount would complete the affordance (the `useLiquidReveal`/`vReveal` precedent). MISSING, not broken.
- **Four-state contract (member + core): PRESENT.** Both compose `DockIconButton` → `.dock-icon-button` (hover bg→`--glass-bg-resting`, `:active` press→`--scale-press-dock` no-overshoot spring, the `v-specular` pointer gleam auto-arms, disabled via base). The member adds `:hover`/`.is-active` glass-tier lifts (stack-rail.css:231-243). Solid.

## 2 — PROCEDURAL VIZ

**N/A for `<DockStack>` itself** — it paints no GPU field. BUT the page stages it against Aurora, and BUG-D2 (page-audit §2) is live: rail.vue mounts `<Aurora>` in ONLY 1 of 4 sections — the stack-rail section (the protagonist) reads against a FLAT cream `glass-resting` card (the BG-2 invisible-glass-over-flat-substrate defect). The macOS hover-stack — the page headline — does not read as glass. This is a DEMO-side miss but it directly defeats the component's whole point (it IS glass chrome). Cross-ref the existing `page-audit/dock.md` BUG-D2.

## 3 — PERFORMANCE

- **Compositor-only: YES** (fan-out + facet tier are scale/opacity/translate/filter; box-INVIOLATE `deltaW=deltaH=0` — the rail feeds no size into the dock box, GlassDock.vue:144 sibling render).
- **Offscreen-pause: N/A** (no rAF loop — it's a pure CSS-transition fan; `railProjection.projectFacets` is a STATELESS per-render function, no spring loop, no measure).
- **Layout-thrash: NONE in the rail.** `onFocusOut` reads `relatedTarget`/`contains` (cheap, no geometry). No `getBoundingClientRect`. The hover-hysteresis is REUSED (`HOVER_INTENT_MS`, not re-forked — AZ.W-DOCK-FLICKER). Clean.
- **`FadingScroll` overflow port:** only feathers when `members.length > visibleCount` (`scrolls` computed gates it) — inert at rest for the 3-item rail. Good.

## 4 — SAFARI COMPATIBILITY

- `-webkit-backdrop-filter` IS paired with `backdrop-filter` on the member (stack-rail.css:179-180). Good.
- `scale:`/`translate:` individual-transform longhands (lines 193, 209-213) — Safari 14.1+ / iOS 14.5+, fine for the iOS-26/27 target.
- `color-mix(in oklab, …)` (facet rim, lines 274-296) — Safari 16.4+, within bar.
- **No `:has()` in the rail recipe; no container-query** — Safari-safe by construction.
- The non-clipping `.glass-dock-frame[data-has-rail]` escape relies on `display:contents`→`inline-flex` toggle — Safari handles both. OK.

## 5 — IDIOMATIC / NO-LEGACY

- **STRONG.** The clean-break discipline held: `useLiquidRail.ts` (the spring re-fork) + `.liquid-rail.css` are DEFINITION-ABSENT; only the PURE `railProjection.ts` math was harvested (W-PRUNE-CONSOLIDATE no-dual-path). ONE rail engine, two render modes on ONE component (no `DockRail.vue`/`DockFacetRail.vue` fork). One-registry `v-model:selected` (no internal selection shadow). The `#rail` non-clipping escape is architectural, not a workaround.
- **MINOR-A · the active member carries `aria-pressed` but the stack has no group role.** Members are independent `aria-pressed` buttons; for a single-select facet carousel (`mode="facets"`, where exactly one is active) the strip should arguably be `role="radiogroup"`/`role="radio"` (the W-CONTROL-TOKENS ToggleGroup-single discipline) — but stack mode is genuinely N-launch (no single-select), so `aria-pressed` is defensible for stack and the gap is facets-only. Low.
- **MINOR-B · `--dock-stack-fold` (0.4) is a magic resting scale** declared as a `:root` token (stack-rail.css:43) — fine, it's tokenized. No legacy.

## 6 — GLASS SIX-LAYER COMPOSITE (per member)

Present, but PARTIAL vs DESIGN.md's six layers:
1. backdrop blur+saturate — ✓ `backdrop-filter: var(--glass-blur-floating)` (carries the saturate companion)
2. surface tint — ✓ `var(--glass-bg-floating)`
3. edge rim — ✓ `var(--glass-edge-light)` (+ `-dark` arm)
4. inner catch-light — ✓ `var(--glass-specular)` + the `v-specular` pointer gleam on the base
5. drop shadow — ✓ `0 2px 6px -2px …`
6. grain — ✗ **MISSING.** The member has no grain `::after` layer (the `.glass-material::after` paper-clean-texture the tier-root carries). A stack member is a bare 5-layer plate, not the full 6. For the iOS-26/27 six-layer bar this is the one missing optical layer.

---

## FINDINGS → BD-tranche disposition

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| GAP-A | fan-out clock = `--duration-normal`, not `--spring-dock-duration` (P4) | **MODIFY** | `BD.W-BLOB-MOTION-TUNE` is blob-only → file under a dock-motion arm; nearest is **`BD.W-BC-COMPONENT-CANON`** (component motion-canon conformance). Re-point lines 198-201 to `--spring-dock-duration`. |
| GAP-B | PRM carve misses `.dock-facet-chip` tier (P6) | **MODIFY** | **`BD.W-ARIA-ORIENTATION-GUARD`** sibling, or fold into `BD.W-BC-COMPONENT-CANON` — add `.dock-facet-chip` to the reduce block (`scale:1; opacity:1`). |
| ANIM-core | rail core has no mount entrance | **AUGMENT** | new arm on **`BD.W-BC-COMPONENT-CANON`** — a one-shot `vReveal`/spring bloom on dock-mount (compositor-only, PRM-static). |
| VIZ/BUG-D2 | rail.vue stages glass over FLAT card (3/4 sections) | **MODIFY (demo)** | already logged `page-audit/dock.md` BUG-D2 → fold into **`BD.W-DATA-BAND-GLASS`** sibling (a "stage-over-DockStage" demo fix) or a dock-demo-stage wave; wrap rail.vue in `<DockStage>`. |
| GLASS-6 | member is 5-layer (no grain `::after`) | **AUGMENT** | **`BD.W-DEEP-GLASS-20PX`** / glass-composite arm — add the grain layer to `.dock-stack-member` (or compose `.glass-material`). |
| A11Y | facets mode = independent `aria-pressed`, not radiogroup | **AUGMENT** | **`BD.W-ARIA-ORIENTATION-GUARD`** — single-select facets → `role="radio"`. |

No PRUNE (the component is clean — no dead path, the spike was already deleted). No FOLD (the rail is the canonical single engine).

---

## 5-LINE VERDICT
1. `<DockStack>` is the canonical, clean-break rail engine — ONE engine/two modes, box-INVIOLATE non-clipping escape, one-registry `v-model`, pure stateless facet projection; no legacy, no dual-path, no thrash, Safari-safe.
2. ANIMATION is HIGH-affordance and the ONE textbook motion-canon-P1 (spring-spatial/bezier-effect) split in the dock band — but GAP-A (fan rides the generic `--duration-normal`, not `--spring-dock-duration`, a P4 violation) and GAP-B (PRM carve misses `.dock-facet-chip`, a P6 violation in facets mode) are real → **MODIFY on `BD.W-BC-COMPONENT-CANON`**.
3. GLASS composite is 5-of-6 layers — the grain `::after` is MISSING on the member → **AUGMENT** (glass-composite arm); the rail core also has no mount entrance → **AUGMENT**.
4. PERFORMANCE is clean (compositor-only, no rAF, no layout read) and PROCEDURAL-VIZ is N/A for the component — but the DEMO defeats the glass (rail.vue stages 3/4 sections over a FLAT cream card, BUG-D2) so the headline hover-stack reads invisible → **MODIFY (demo)**: wrap in `<DockStage>`.
5. Net: the component needs ~4 small surgical edits (spring clock · PRM chip carve · grain layer · core entrance) + the demo-staging fix — all MODIFY/AUGMENT on existing BD waves, ZERO new component, ZERO prune.
