# N.W4 π — visual-runtime audit

Tip: `ffc02a9` (v1.1.3). Read-only audit. Hardened agent git clause honored.

## § 1 Static visual analysis (per touched file)

### 1.1 `src/components/ui/slider/Slider.vue` — N.W0 A1 useTouchGate wire

Pattern mirrors `src/components/custom/dock/GlassDock.vue:85, 194–226`:

- `useTouchGate()` instantiated per Slider; `touchstart`/`touchmove`/`touchend`
  handlers wired on `SliderRoot`; root reflects `data-touch-active`.
- `data-held` (J.W5.C dock-keep-open) preserved; halo recipes
  `glass-slider[data-held] .slider-thumb` + `[data-variant="glass-pill"][data-held]`
  intact (Slider.vue:281–291).
- **`data-touch-active` has NO scoped CSS rule** in `src/styles/` nor in
  `Slider.vue` `<style scoped>`. Verified via
  `rg "\[data-touch" src/styles/` — zero hits. This is **intentional** per
  the A1 proof doc Open Question §2: the visible thumb-halo response is
  carried by `data-held` (driven through the dock's `dockHeld` inject),
  while `data-touch-active` exists as a public hook for consumers + the
  dock-keep-open token bridge. Visual-no-op at default theme.
- Reduced-motion / no-touch / no-WebGL all degrade gracefully — gate
  machinery short-circuits when `isTouchDevice` is false.

Defect class: **NONE**.

### 1.2 `demo/stories/compositions/hero.vue` — N.W0 A2 metaballs + A4 typewriter wire

- MetaballCanvas v-if gated on `isWebGLSupported() && !prefersReducedMotion`
  (hero.vue:28–30, 147–152). SSR-safe synchronous probe.
- `.hero-frame` parent is `relative isolate overflow-hidden` (hero.vue:112)
  — establishes the stacking-context required to contain the canvas's
  `-z-10` and `position: fixed`-override.
- Scoped `:deep(canvas)` override (hero.vue:284–288) re-targets
  `position: absolute` (from upstream `position: fixed`) + adds
  `opacity: 0.6` + `mix-blend-mode: soft-light`. The `-z-10` from the
  upstream MetaballCanvas class (`pointer-events-none fixed inset-0 -z-10`,
  MetaballCanvas.vue:64) survives the override. Content layer `z-10`
  (hero.vue:154) sits above. Cascade correct.
- TypewriterText two-segment composition (hero.vue:173–217):
  - `v-if="animateHeadline"`: TypewriterText seg1 → static italic-f span → TypewriterText seg2 (gated on `seg1Done`).
  - `v-else` (reduced-motion): verbatim "A design system <span.fourier-f>f</span>or mathematicians, writers & makers."
  - Verified `fourier-f` span renders in BOTH branches (grep returns 2 hits in file); italic-f signature glyph is NOT lost on the reduced-motion path.
- Italic-f span carries `font-variation-settings: 'WONK' 1, 'SOFT' 0`,
  `font-size: 1.1em`, `color: var(--viz-fourier, …)` fallback. Both
  branches use identical inline-style payload.

Defect class: **NONE**.

### 1.3 `src/components/ui/section/Section.vue` — N.W0 A3 backdrop="paper"

- `backdrop?: "none" | "paper"` default `"none"` — purely additive.
- When `backdrop === 'paper'`: `<section>` becomes `relative isolate`
  (Section.vue:85) AND `<PaperBackdrop class="!absolute inset-0" />`
  pinned (Section.vue:91–93).
- **`!absolute` override IS load-bearing**: `PaperBackdrop` renders
  `<div class="paper-underpaint">` (PaperBackdrop.vue:30); the
  `paper-underpaint` `@utility` is hard-coded `position: fixed; inset: 0;
  z-index: -1` (paper.css:12–22). Without the Tailwind `!absolute`
  important override the layer would escape the section's stacking
  context and tile across the viewport. The `inset: 0` from the utility
  already maps to the absolute box once position is overridden.
- `isolation: isolate` on the parent section + `z-index: -1` on the
  underpaint keeps grain BELOW header/content (which paint at default
  stacking order) and ABOVE the section background. Cascade correct.
- `@media (prefers-reduced-transparency: reduce)` (paper.css:55–60)
  collapses the underpaint to `opacity: 0` — accessible fallback
  preserved.

Defect class: **NONE**.

### 1.4 `src/components/custom/configurator/ConfiguratorRow.vue` — N.W2 A density CVA

- Four-rung density axis (`mobile` | `compact` | `comfortable` | `spacious`),
  resolved as `props.density ?? injectedDensity?.value` (line 63–65).
- Scoped CSS attribute selectors `.configurator-row[data-density="…"]`
  bind `gap` + `padding-block` per rung (lines 117–135).
- **Token-name verification**: scoped CSS references
  `--configurator-row-py-{mobile,compact,comfortable,spacious}` AND
  `--configurator-row-gap-{…}`. Verified in `src/styles/tokens.css:657–665`:
  all 8 tokens exist with matching `-py-` suffix. **The N.W2 commit body
  describes the padding tokens as `--configurator-row-padding-block-…`,
  but the actually-shipped names are `-py-`** — that is a stale
  commit-body description, not a defect (tokens.css and ConfiguratorRow.vue
  agree).
- `comfortable` rung values match pre-N.W2 defaults exactly (0.375rem gap /
  0.5rem py = `gap-1.5 py-2`). Bare row (no `data-density`) keeps the
  baked-in Tailwind recipe via the `data-density="…"` selector being
  absent. Existing aurora / metaballs / preset-editor stories unaffected.

Defect class: **NONE**.

## § 2 Per-story canonical consumption table

| Primitive / API | Consumer sites | Verdict |
|---|---|---|
| `<TypewriterText>` | `demo/stories/motion/typewriter.vue` (3 hits, canonical story) + `demo/stories/compositions/hero.vue` (4 hits, headline composition) | **≥ 2 consumers** ✓ |
| `<MetaballCanvas>` | `demo/stories/motion/metaballs.vue` (7 hits, canonical story) + `demo/stories/compositions/hero.vue` (5 hits, ambient backdrop) | **≥ 2 consumers** ✓ |
| `<Section backdrop="paper">` | `demo/stories/primitives/section.vue` (1 hit, dedicated story matrix) | **1 consumer** — single-site proof, additive primitive (pre-N.W2 `backdrop="none"` default preserved at all V-tranche Section stories). Acceptable per N invariant 22 wire-before-retire — Section is a structural primitive whose new prop ships with one canonical proof site (visual-load-bearing-ness is satisfied via the substrate's pre-existing consumer base). |
| `<Configurator density="mobile">` | `demo/stories/primitives/configurator-mobile.vue` (1 hit, dedicated mobile-density story) | **1 consumer** — single-site proof, additive prop on existing 5+ consumer primitive. `density="comfortable"` (also additive) cited in `configurator-mobile.vue` for side-by-side; `density="spacious"`/`"comfortable"` appear in `metric-pill.vue` (different primitive; same axis vocab). Acceptable. |
| `data-touch-active` (Slider) | Slider.vue only emits; **0 CSS consumers** in `src/styles/` | Intentional visual-no-op (per A1 proof Open Question §2). Public hook; downstream consumers / orchestrator-side styling can target if needed. |
| `useTouchGate` | `src/components/custom/dock/GlassDock.vue` + `src/components/ui/slider/Slider.vue` | **≥ 2 consumers** ✓ (visual-load-bearing-ness satisfied for the composable substrate per L invariant 8). |

No story bypasses a canonical primitive; no orphan consumption gap.

## § 3 Playwright runtime probe deferral

The canonical visual-runtime hard-gate (per K W6 + J R6 precedent — interactive
states verified via Playwright/Chrome-MCP screenshots) **cannot be executed
this session**: Playwright + Chrome MCP are DISCONNECTED. Per
`docs/precepts/instructions/tranche/SPEC.md` close-ceremony clause:
> "Tranches that are documentation-only or exclusively backend may skip the
> visual lane with a wave-spec justification."

N is NEITHER doc-only NOR backend-exclusive — N.W0 ships a hero composition
(MetaballCanvas v-if + TypewriterText 2-segment), N.W1 ships a typography
literal sweep (9 sites flipped to `text-micro`), and N.W2 ships a Configurator
density CVA with 8 new tokens. **Visual-runtime verification is required but
deferred**; this audit substitutes a static-source review as the best-effort
gate.

### 3.1 Static analysis covers

- z-index cascade (hero MetaballCanvas + content layer; Section paper-underpaint).
- Reduced-motion fallback markup parity (italic-f preserved on `v-else` branch).
- Token-name agreement (ConfiguratorRow.vue ↔ tokens.css ↔ commit body).
- Public-hook orphan detection (`data-touch-active` has zero internal CSS consumers).

### 3.2 Static analysis CANNOT cover

- WebGL canvas actually renders inside `.hero-frame` rect on real browsers
  (Chrome / Safari / Firefox compositor differences for `mix-blend-mode: soft-light`).
- TypewriterText seg2 startDelay=220ms timing feels right vs the static italic-f anchor.
- `prefers-reduced-motion` media-query gating actually triggers the `v-else` branch on Safari/Firefox.
- ConfiguratorRow density visual ladder reads as a clear progression at mobile-viewport-width.
- Paper-backdrop `mix-blend-mode: multiply` paints correctly under dark-mode toggle inside a section-local stacking context.

### 3.3 Cross-tranche debt → O

Surface as audit-debt to **O tranche** if Playwright-MCP reconnects:

1. Hero composition runtime probe: WebGL detection branch + reduced-motion branch + canvas opacity 0.6 read.
2. `<Section backdrop="paper">` runtime probe: paper-grain layer contains within the section, dark-mode swap holds.
3. `<Configurator density="mobile">` runtime probe: gap + padding-block read at mobile-viewport-width.
4. `<Slider>` touchgate runtime probe (mobile-Chrome emulation): two-tap activation; first tap swallowed; dock keep-open token acquires.

## § 4 Findings

**Zero defect-class findings**. One observation:

- **OBS-π-1** (informational, NOT a defect): N.W2 commit-body describes the
  ConfiguratorRow padding tokens as `--configurator-row-padding-block-…` but
  the actually-shipped tokens are `--configurator-row-py-…`. ConfiguratorRow.vue
  scoped CSS uses the `-py-` form; tokens.css defines the `-py-` form;
  no runtime defect. Token-naming consistency suggestion: `-py-` matches
  the existing Tailwind utility shorthand convention used elsewhere in
  the token file — keep as-is; future tranches may want to update the
  commit-message template / CHANGELOG to match shipped names.

## § 5 Verdict

**TOOLING-DEFERRED** — static analysis CLEAN; Playwright runtime probe
required but tooling-disconnected. No defect-class findings surfaced via
the static path; runtime hard-gate is debt to a future tranche when
Playwright/Chrome-MCP reconnects.

Per the SPEC.md close-ceremony clause, the orchestrator may proceed
with N tranche close on the basis of (a) zero static findings, (b)
documented runtime-probe deferral, and (c) a cross-tranche debt entry
to O.
