# forms/number-field — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/forms/number-field.vue` · live `http://localhost:5173/forms/number-field`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon, affordance-map).
**Captured**: 1440×900 light + dark, full body, computed-style probes (`_cap-forms-number-field-{light,dark}.png`).

This is the **stepper page** — the canonical statement of "this is what a glass-ui numeric control IS." Today it reads as a **clean seven-cell spec-sheet**: a faint full-width header band, then two transparent grids (2-up demo matrix + 3-up label-binding matrix) of `label · stepper · mono-caption`, repeated down a flat cream wash. The `NumberField` component is correct and lovely in isolation — but the *page* spends almost none of the library's identity. It is the same systemic under-spend as the forms/inputs sibling: no card-per-section, no aurora, no dock leverage, no animation life, dead horizontal margin.

---

## 1. The verdict up front

Seven real stepper states (integer · percent · stepped · disabled · the three a11y label-binding channels) are demonstrated honestly. But they're demonstrated as **two static grids on a transparent wash, not a designed surface**. The frontend-design failures are systemic and map 1:1 to the brief's explicit asks:

- **No card-per-section.** Probed: every `section` is `bg: rgba(0,0,0,0)`, `radius: 0px`. The two demo grids are bare transparent containers; the only faint plate on the page is the StoryHeader region. The user's "each sub-section in its OWN glassy card" is **entirely unmet** — zero glassy sub-cards. The only real glass on the page is the fixed dock chrome (`blur(9px) saturate(1.3)`, probed) and the stepper wells themselves.
- **The main area is NOT bigger.** The body caps at **1086px on a 1440px viewport** (~354px dead margin, `x: 219`). The 2-up grid runs `523px 523px` columns; the steppers are `max-w` straitjacketed so the value floats in a wide empty channel between the −/+ caps (dark-mode capture makes this glaring — `3` sits dead-center on a near-empty bar). The page is mostly void; the user asked for MORE screen space deployed.
- **No aurora, no colorful field.** Probed: `canvas` count = **0**, `body background = transparent`. The brief's "glass demos over COLORFUL aurora backgrounds" is the whole reason glass exists, and it's unmet — these wells sit over a flat `oklab(~0.94)` cream wash with nothing to refract (§L1 — "surfaces are lensing layers, not blur swatches"; the lens has nothing behind it). In dark mode the field collapses to a near-black void; the steppers read as recessed slots, not lensing glass.
- **No dock-API leverage.** The page that should "leverage the dock APIs (contextual switching/animating)" has zero contextual dock. The seven stepper states are an ideal contextual-switch set — a `DockStack mode="facets"` / `DockLayerGroup` that swaps the protagonist stepper (integer → percent → stepped → disabled) with a live crossfade. Instead they're a static grid the user scrolls past.
- **Animation affordance is component-only.** The stepper carries its focus ring and the `.input-pill`-family destructive register; the page mounts in `.scroll-cascade` — but nothing visibly *arrives*. Seven static cells. At the iOS-27 bar (motion-canon "the page assembles itself"; affordance-map "every interactive element answers the pointer the same liquid way"), a stepper page should be the MOST kinetic forms page — the value is a NUMBER that should reel/spring on every increment, and the press should feel liquid.

---

## 2. VISUAL HIERARCHY — the eye lands on the title, then flattens

**What works.** The `Number Field` H1 resolves to **86.1px Plus Jakarta Sans / 600** (`--type-display` rung) — the audacious √φ ladder IS used for the hero, and it lands. The eyebrow (`FORMS · NUMBER FIELD`) + the Fira-Code subpath chip (`@mkbabb/glass-ui/number-field`) is the correct StoryHeader cluster. Section labels resolve to a consistent rung. The typographic *scaffolding* is correct.

**What fails.** After the title the page is **seven identical-weight cells** — every stepper the same `523px`/`335px` width, the same mono caption, the same grey label. There is no focal stepper, no protagonist, no "look here." Worse than forms/inputs: a stepper's whole identity is the VALUE, and the value here renders at body size, floating in the middle of the bar — the most type-forward moment on the page (the live number) is the LEAST typographic. DESIGN.md's "TYPOGRAPHY-forward / kinetically typographic" identity demands the opposite: a stepper page should let a `text-display-mega` / `text-display-audacious` value (the 177–352px poster rungs the library ships for exactly this — the metric-surface activation register) anchor a HERO stepper, the number reeling on each press via `useAnimatedNumber` / `AnimatedDigit`.

**Move**: stage ONE protagonist stepper (the integer counter, or a "servings" hero) at poster scale — the value rendered at `text-display-mega`+ with `<AnimatedDigit>` reel on each increment — and demote the other six states to a tight supporting matrix. The number IS the protagonist; make it audacious.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract

This is the **single highest-leverage failure**, shared with every forms page and the dock flagship. DESIGN.md §L1 is unambiguous: glass *bends and concentrates light*; the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) only reads as iOS-26-liquid **over content worth refracting**. The stepper well composes a genuine glass `--input-on-glass` register — but it sits over a **flat single-hue wash**, so the blur has nothing structured to smear, the `saturate()` channel has no chroma to concentrate, and the well reads as a recessed cream slot instead of glass.

- **Light mode:** warm-cream wells over a near-identical cream wash — low-contrast, the well barely separating from its background. Glass doing nothing because there's nothing behind it.
- **Dark mode:** the wells read as recessed (good `--input-on-glass` dark-material contrast — BB.W-ON-GLASS-FG IS working), but the "colorful aurora" is gone entirely; a black void.

The brief's directive — **"glass demos over COLORFUL aurora backgrounds"** — is the fix, exactly as on the dock flagship. Run a **multi-nuclei aurora preset** behind the protagonist stepper card (offscreen-paused by construction, one GL context per route, budget-safe) so the focal glass actually *lenses* a varied field — warm-to-cool nuclei drifting behind the well, the blur smearing real color structure, the `saturate()` concentrating it. THIS is what makes a stepper read as Apple-grade Liquid Glass vs. a div with a border. Keep the supporting-matrix steppers on the calm wash so the page doesn't over-spend (the §L1 tier-selection-rule — reach for the lowest tier that meets the floor; save the spend for the hero).

---

## 4. CARD-PER-SECTION + LAYOUT — two flat grids, not a composition

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER.** Probed today:

| Treatment | Cells | Reads as |
|---|---|---|
| bare transparent `section.grid` (2-up + 3-up) | all 7 (integer · percent · stepped · disabled · 3× label-binding) | a label + bar + caption, gridded |

ONE container treatment — flat transparent grids. There are no cards. This is the **generic-AI grid tell** the frontend-design skill warns against: "I gridded each block." It's *correct* that an opaque `bg-card` plate would occlude an aurora — but the page didn't choose the harder, better path (a permeable veil card); it chose no card at all.

**The resolution is a `surface="veil"` glass tier card per section, NOT opaque and NOT bare.** DESIGN.md ships exactly the right primitive: the **Wash/Quiet/veil tiers admit the backdrop through** (§L1 tier table — "permeable veil over a kinetic backdrop"; the library factored `surface="veil"` at BA.W-SURFACE-AXIS precisely for this). A `.glass-wash`/veil card frames each demo as a *real glassy card* (rim + catch-light + grain), AND the backdrop reads through it onto the well — satisfying "own glassy card" AND "glass over the live field" at once, with no occlusion. **This is the architectural transposition**: stop choosing between "opaque plate (occludes)" and "bare grid (no card)" — use the veil tier the library already ships. The glass-cannot-sample-glass rule (§L1) is honored as long as the veil card and the well share the page's single composition container (they do — monotone Z-stack).

**The width + the dead value-channel**: lift the 1086px body cap toward a generous width, and — critically — kill the wide empty channel inside each stepper. The value floating dead-center between the −/+ caps (visible in both captures, screaming in dark mode) is the worst micro-detail on the page: a number control should pin its value tight to the input, the steppers flush, not strand it on a 300px-wide empty bar. Either tighten the stepper to its content, or make the hero stepper genuinely wide WITH a poster-scale value that fills the space (§2).

---

## 5. ANIMATION AFFORDANCE — component-alive, page-dead, NUMBER-dead

Per affordance-map + motion-canon, every element should answer the pointer the same liquid way, the page should *arrive*, and — uniquely for a stepper — **the value should reel.**

**Alive (good):** the well carries the focus-ring floor; the disabled field dims via the opacity contract; the increment/decrement caps are real four-state buttons. The component-level contract is honored. The page mounts inside `.scroll-cascade` (the wrapper is present).

**Dead (the gap):**
- **No entrance.** The `.scroll-cascade` wrapper is present but the seven cells do not visibly *build in* — no per-cell gravity-rise, no staggered arrival. A foundational forms page should assemble itself (each cell blooming on its own `--spring-snappy-duration` beat — the W-HIERARCHY2 gravity cluster generalized to the body).
- **THE big miss — the value does not reel.** A stepper's value is a NUMBER; incrementing it is the single most kinetic moment in the entire forms band. The library ships `useAnimatedNumber`, `AnimatedDigit` (the single-glyph reel), and `useCountup` for EXACTLY this — yet here the value snaps instantly on each press. At the iOS-27 bar the digit should reel/spring (the odometer roll), the value landing with the snappy overshoot. This is the page's signature affordance and it's absent.
- **No liquid press.** The −/+ caps and the well are inert on press. At the iOS-27 bar the press should be a liquid event — the well swell/brighten (the `useSpringPress` + `--press-t` brightness-settle vocabulary the library ships at W-PRESS-UNIFY), the cap squishing on the spring's own clock.
- **No hold-to-repeat life.** A stepper held down should accelerate the count with a visible ramp (the classic iOS stepper); shown here as discrete single steps.

**Move**: (a) wire `.scroll-cascade` gravity-entrance to land on each cell (per-cell `--spring-snappy-duration` stagger); (b) **make the value reel** — `<AnimatedDigit>`/`useAnimatedNumber` on every stepper, poster-scale on the hero; (c) make the press liquid (well swell+brighten on `--press-t`, cap squish); (d) demonstrate hold-to-repeat acceleration.

---

## 6. POLISH / DISTINCTIVENESS — competent, not bespoke

The page avoids the worst generic-AI sins (real tokens, real components, the warm-cream well, the audacious H1, an honest a11y label-binding demo). But it does not yet read **bespoke + premium**:

- **Repetition without rhythm.** Two uniform grids of `label · bar · caption` is a *spreadsheet*, not a composition. No asymmetry, no bento, no scale contrast — the frontend-design "distinctive layout" bar wants a protagonist/satellite or hero+matrix arrangement.
- **The captions are spec-sheet voice.** `Integer · 0..99` · `Percent · 0..100%` · `Step 5 · 0..100` · `Locked` are range-annotations, not showcase copy. They're tight (good, per MEMORY: tighten superfluous language) but mechanism-voice. A stepper page should state the *value of the control*, not its bounds. The header blurb — "Numeric steppers with min/max — the section identity is the ONE color event" — is **internal design-system meta leaking into the product surface**: a reader does not care that the IconChip is "the ONE color event"; that's our suffusion-rule note, not showcase copy. Cut it to a product line about precise numeric entry.
- **The hairline dividers** between sections (probed, the `::after` rules under the header) are the most generic element on the page — a faint horizontal rule is the AI-template default. Veil-glass cards (§4) replace them.
- **The internal-changelog SFC header comment** (`BC.W-SUFFUSE-reconcile … PH3-safe (inline borderLeft, not the … double-header shape)`) is commit-message noise in the source header of a showcase page — belongs in git history, not the file.

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the *vertical* rhythm is fine and tokenized (`gap-10` between grid cells, the golden-ratio section cadence). The failures are **horizontal** (the 1086px cap + the wide dead value-channel inside each bar) and **micro** (the value floating un-pinned). The golden-ratio discipline (DESIGN.md √φ ladder, the W-CARD-PAD sqrt-φ block-over-inline) lives in the type scale but is absent from the page layout and from the stepper's internal proportion.

**Color suffusion**: **correctly restrained but inert**. The one-color-event rule (AZ.W-SUFFUSE) is honored — the IconChip resolves the `--section-color-3` teal (probed `color(srgb 0.42 0.76 0.86 / 0.25)` backplate, the cool forms-band stop), the eyebrow is the tinted teal (`oklch(0.767 0.091 219.9)`), and the controls stay ink. That's the right *proportion*. But with the aurora absent and the cards absent, the ONE teal event is the only color on a vast grey field — so the proportion reads as *inert*, not *calm*. The fix is NOT more color events (the teal discipline is right); it's giving the teal something to sit against — the aurora field (§3) + veil cards (§4) supply the depth and color structure that make the single teal event read as a deliberate accent rather than a lonely dot. Optionally, the protagonist well's focus carries a `--glass-accent` teal chromatic rim (BB.W-GLASS-ACCENT, the per-instance axis) — one color event, on the focal element, the band's own hue.

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label**: the rendered subpath chip is correct and should read `@mkbabb/glass-ui/number-field` — standardize it as the ONE canonical label. The SFC imports via local relative paths (`../../../src/components/ui/number-field`); that's the build reality, but the in-page chip is the consumer-facing truth and must be the only path dialect shown. No third dialect appears in this SFC's prose (unlike forms/inputs) — keep it that way.
- **Superfluous language**: cut the design-system meta from the header blurb (the "ONE color event" note → a product line). Compress each caption to one showcase line stating the control's *value* (precise entry, percent formatting, stepped granularity, locked state) not its *bounds*. Delete the internal-changelog SFC header comment.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Veil-glass card per section + a protagonist stepper.** Replace the two flat transparent grids with ONE `surface="veil"` (`.glass-wash` tier) card per demo — a real glassy card whose backdrop reads through onto the well (§L1 permeable veil, BA.W-SURFACE-AXIS). Promote ONE stepper to a HERO card at ~1.5–2× scale with a poster-rung value; demote the other six to a tight supporting matrix. Satisfies "own glassy card" + "main area bigger" + "protagonist hierarchy" at once, no occlusion.
2. **Make the VALUE reel — the page's signature affordance.** Wire `<AnimatedDigit>` / `useAnimatedNumber` so every stepper's value odometer-reels on increment, poster-scale on the hero, the digit landing with the snappy overshoot. This is the most type-forward, most kinetic moment a stepper page owns and it's currently absent — it is the single move that makes this page read as *the* number-field statement.
3. **Colorful aurora behind the protagonist.** Run a vivid multi-nuclei aurora preset behind the hero stepper card (offscreen-paused, one GL context, budget-safe) so the focal glass actually lenses varied color (§L1). The highest-leverage fidelity fix — the well reads as Liquid Glass, not a cream slot. Verify dark-mode chroma survives (don't collapse to black). Keep the supporting matrix on the calm wash.
4. **Leverage the dock APIs — contextual state switching.** Wire a `DockStack mode="facets"` (or `DockLayerGroup`) that swaps the protagonist stepper across its states (integer → percent → stepped → disabled) with a live crossfade, so the page SHOWS the dock *switching context/animating* — the brief's named capability the page wholly lacks. The stepper states are ideal contextual-switch content.
5. **Tighten + standardize + live.** Pin the value flush to the input (kill the floating-value dead-channel — the worst micro-detail); lift the 1086px body cap; make the press liquid (well swell+brighten on `--press-t`, cap squish) and demonstrate hold-to-repeat acceleration; standardize the chip to `@mkbabb/glass-ui/number-field`; cut the design-meta header blurb + the internal-changelog SFC comment; compress captions to showcase-value lines.
