# Pass-E Deep Audit — motion/animated-digit

- **Page**: `motion/animated-digit`
- **Import**: `@mkbabb/glass-ui/animated-digit`
- **SFC**: `demo/stories/motion/animated-digit.vue` (63 lines)
- **Component**: `src/components/custom/animated-digit/AnimatedDigit.vue`
- **Live**: http://localhost:5173/motion/animated-digit
- **Manifest row**: `demo/stories/manifest.ts:319` (subpath) + `1119` (story `s("motion","animated-digit",…)`)
- **Background**: inherits `motion → constellation` (`manifest.ts:191` `CATEGORY_DEFAULT_BG.motion`); NO per-row override.

Verdict at a glance: **thin + flat**. The demo is two bare sub-sections in ONE shared glass card over a monochrome constellation field. It exercises the value-tween + null-placeholder paths but NONE of the component's richer API, composes almost no other glass-ui components, and is not demoed over a colorful aurora.

---

## (1) DEMO CONGRUENCE — exercises only ~40% of the API

`AnimatedDigitProps` (AnimatedDigit.vue:39–63) exposes: `value`, `format`, `placeholder`, `digitCount`, `mode` (`"absolute"|"progress"`), `damping`, `class`.

The demo exercises:
- `value` (reactive ref, animated-digit.vue:32,41) — ✓
- `format` (line 34 `(v)=>v.toFixed(1)`) — ✓
- `placeholder` (line 58 `"—"`) — ✓

The demo NEVER exercises:
- **`mode="progress"`** — the progress-tag pass-through to `useAnimatedNumber`. Zero demo of the progress register (a percent/0..1 ramp), which is the OTHER half of the component's reason to exist.
- **`damping`** — the spring-stiffness knob. No comparative reel (e.g. a stiff vs. slack tween side-by-side) to SHOW the smoothing the component sells. The blurb claims "tweens … so it never snaps" but there is no visible demonstration that a DIFFERENT damping changes the feel.
- **`digitCount` / the `--digit-count` CSS custom property** — the width-clamp single-source-of-truth seam (AnimatedDigit.vue:51–60 doc). This is the component's signature width-reservation contract (a metric cell that does not reflow as digits widen) and it is completely undemoed — yet the page literally shows the no-reservation problem live: at `248.6` → resample to a 3-digit-then-1-digit value the hero number jumps width with no clamp.
- **`data-is-animating`** — the live animation-state attribute (AnimatedDigit.vue template). Confirmed present + toggling on the live page (`digitAnimAttr` readback), but the demo surfaces no visual hook off it (no "animating" pulse / catch-light), so the affordance is invisible.

CONTEXTUAL SWITCHING / DOCK APIS: **none**. There is no dock-driven mode switch, no tabs to flip absolute↔progress, no contextual-switching demonstration — the North-Star "leverage the dock APIs" and "HIGH animation affordance for EVERY component" bars are unmet. The single `Resample` button is the only interaction.

## (2) COMPONENT ABILITY — flat, near-zero composition

The page composes exactly TWO glass-ui surfaces:
- `AnimatedDigit` (the subject) — animated-digit.vue:5
- `Button variant="outline"` (the Resample trigger) — animated-digit.vue:6,47

That is it. No `Card`, no `SegmentedTabs`, no procedural-anim, no dock, no `MetricCell`/`MetricStack` (the speedtest hero-number siblings this component was LIFTED from — see AnimatedDigit.vue:22 "promoted from speedtest's hand-wired" — the natural composition partner). The "deftly composes a SERIES of glass-ui components" bar is not met; this is among the thinnest motion pages.

The accent bar is a raw inline div (`<span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />`, animated-digit.vue:30,39) rather than any shipped primitive — fine as the W-SUFFUSE2 one-color-event, but it underlines how hand-rolled the surface is.

## (3) GLASS SUFFUSION — flat, monochrome field

- The body host is a SINGLE `glass-wash` card (`story-hero-card--live`), live-confirmed `backdrop-filter: blur(1px) saturate(1.05)`, `bg oklab(0.887 … / 0.328)`.
- The field behind it is `constellation-canvas` — the monochrome ink-dot constellation (the `motion` category default), NOT a colorful aurora. The glass morphism barely reads: a `blur(1px)` wash over a near-white page with faint grey dots gives almost nothing for the glass to refract. Live screenshot shows the card as an almost-invisible pale rectangle.
- The North-Star ask "glass demos over COLORFUL aurora backgrounds (so the morphism reads)" is **unmet**. A vivid aurora (or at least a richer field) behind a thicker glass tier would make the six-layer optical composite actually visible.
- PAPER morphism: none. Apt? Marginal — the editorial hero number could sit on a paper-grain register, but the stronger fix is glass-over-aurora per the ask.

## (4) STRUCTURE — sub-sections NOT in their own cards; main area under-sized

- Live DOM: `.story-sections` has 2 children, both bare `flex flex-col gap-3` (no `glass-`/`rounded-card`/`shadow-card`) — confirmed via `ownCard:false` for both. **The user's bar "each sub-section in its OWN glassy card" is NOT met** — both sections share the one outer wash card, separated only by the chassis hairline delimiter.
- Main card area: `1088 × 666` in a `1440`-wide viewport — generous height (the hero number forces it) but the user's "main card area BIGGER / more screen space" intent is about giving the DEMO room; here the height is incidental (a giant number), not a deliberate large stage. The two sections are vertically stacked in a tall single column with lots of dead horizontal space beside the latency figure.

## (5) PATH-LABEL — already standardized ✓

`manifest.ts:319` → `"motion/animated-digit": "@mkbabb/glass-ui/animated-digit"`. The live chip renders `@mkbabb/glass-ui/animated-digit` (screenshot confirms). No action needed — this page is already on the canonical subpath form.

## (6) LANGUAGE — minor superfluity

- Manifest blurb (manifest.ts:1122): *"Single-figure smoothed reel over useAnimatedNumber — tweens a metric toward its bound value so it never snaps; null reads the placeholder."* — acceptable but "Single-figure smoothed reel over useAnimatedNumber" leaks the impl composable into the headline; could tighten to "Smoothed numeric reel — tweens a metric toward its target so it never snaps; null reads the placeholder."
- Section blurb (animated-digit.vue:23): *"A null/undefined value paints the placeholder; a numeric value tweens toward it on the useAnimatedNumber spring."* — restates the manifest blurb almost verbatim AND re-leaks `useAnimatedNumber`. Redundant against the page blurb directly above it. Tighten or drop.
- The SFC top comment (animated-digit.vue:8–9) is fine (dev-facing).

## (7) BUGS

- **No hard bug** in the SFC. The component animates correctly: live readback showed `digits:["248.6","14","—"]` and `data-is-animating` toggles; the spring tween fires on value change.
- **HMR instability (env, not page)**: across rapid live evals the :5173 dev server transiently swapped the route's rendered content (showed a `deck`/motion-overview tree mid-eval). This is a dev-server HMR artifact, not a defect in this SFC — on a clean stable load the correct two-section content renders.
- **Latent width-jump (design, not crash)**: because `digitCount`/`--digit-count` is not wired, resampling between values of different digit-width visibly reflows the hero figure horizontally — the exact problem the component's width-clamp seam exists to solve, left undemoed.

---

## Recommendations (for the BD rebuild)

1. **Each sub-section → its own glass card** (Card/`<ShowcaseFrame tier="field">`), per the user bar.
2. **Demo over a COLORFUL aurora** (override the row `background: "aurora"` or stage with `<DockStage>`/`<Aurora>`), thicker glass tier, so the morphism reads.
3. **Exercise the full API**: add a `mode="progress"` reel; a `damping` comparison (stiff vs slack side-by-side); a `digitCount`-clamped metric cell showing the no-reflow contract; a live "animating" catch-light off `data-is-animating`.
4. **Compose a SERIES**: seat the digits in `MetricCell`/`MetricStack`, add `SegmentedTabs` to flip absolute↔progress, and use a **dock** (contextual-switching) to drive the resample / mode — meeting the dock-API + animation-affordance bars.
5. **Tighten language**: drop the duplicated section blurb; de-leak `useAnimatedNumber` from the headline.
