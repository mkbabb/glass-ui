# J.R3 — Form primitives deep audit

## Preamble

**Scope.** Three user findings from `docs/tranches/J/findings.md` §Form primitives:
- §12 `/primitives/slider` — refined; padding standardized.
- §13 Number Field — refined and rounded.
- §14 `Slider · Glass Track` — greatly enhanced and refined.

**Targets read in full.**
- `src/components/ui/slider/{Slider.vue, index.ts}`
- `src/components/ui/number-field/{NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, index}.ts(.vue)`
- `demo/stories/primitives/{slider, slider-glass-track, number-field}.vue`
- `src/styles/tokens.css` §1–§14 (radii lines 110–126; φ-spacing lines 432–435)
- `docs/tranches/I/audit/W3-cartoon-hoist.md` (NumberField provide/inject context)
- `docs/tranches/I/audit/W3-dock-easing-slider.md` (sliderVariants CVA + glass-track context)

**Runtime probes (Playwright, viewport 1440×900).**
- `/primitives/slider` — rendered; computed-style probes captured.
- `/primitives/slider-glass-track` — rendered; visual sample saved.
- `/primitives/number-field` — rendered; input + button computed styles captured.

**Glass-ui revision.** HEAD `c5f196c` (post-I close, working tree clean per branch `o-w2_7-instrument-chassis`).

---

## Findings by axis (1–7)

### Axis 1 — Token alignment

| # | Finding | Cite | Severity |
|---|---|---|---|
| 1 | `--space-phi-5` and `--space-phi-6` are referenced **but not defined**. `tokens.css:432–435` only defines `--space-phi-{1..4}`. Eight call sites use `p-[var(--space-phi-5)]` with **no fallback**, so they computed to `0px` at runtime. Three sites use `p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]` with inline fallbacks (`audacious-hero.vue:16`, `slider-glass-track.vue:54`, `blob.vue:211`). | `tokens.css:432-435`; `slider.vue:64`, `slider-glass-track.vue:130,226`, `number-field.vue` (no use here, but pattern recurs across primitives stories) | **P0 — runtime visual bug** |
| 2 | Stories use `rounded-2xl` (the primitive) where the canonical alias is `rounded-card` (semantic, defined at `tokens.css:120` as `var(--radius-2xl)`). 15 sites under `demo/stories/`. Same value, but the semantic alias is what Card itself stops short of using (`Card.vue:46` uses `rounded-xl`). | `slider.vue:64`, `slider-glass-track.vue:130,226`, `number-field.vue` (no chassis here — gap surfaced in §A); 12 other stories | P1 — drift |
| 3 | NumberField input chrome **diverges from the canonical input chassis radius**. `numberFieldInputVariants` uses `rounded-md` (`--radius-md: 6px`); `Input` default uses `.input-pill` → `--radius-pill` (`glass.css:187`). NumberField is the *only* input-bearing primitive that doesn't inherit the pill identity, with no design rationale recorded in `W3-cartoon-hoist.md`. `--radius-input` is defined (`tokens.css:123` = `0.625rem`/10px) and is also unused — neither the pill nor the input semantic alias is consumed. | `number-field/index.ts:37,39`; `glass.css:183-216`; `tokens.css:123` | **P0 — visual identity break (finding §13)** |
| 4 | Slider's `.slider-track` reads `--radius-pill` directly (`Slider.vue:96`) — correct — but the variant CVA branch has no track-radius override mechanism documented. The design intent is "glass-track is **always** pill-rounded." This is a token-doc gap, not drift. | `Slider.vue:96` | P3 — doc |
| 5 | `--shadow-cartoon-accent` is consumed only by `Slider.vue:206` inside ui/. The thumb depth on the glass-track variant lifts to `--shadow-cartoon-accent` on press (`Slider.vue:200-204`), which is correct. But the variant has *no rest-state shadow vocabulary* — only a press-state lift. Compare cartoon-surface (`utilities.css:12`), which carries a rest shadow + hover/active depth. | `Slider.vue:188-204` | P1 — gap (axis 4) |

### Axis 2 — Utility & `@apply` hygiene

| # | Finding | Cite | Severity |
|---|---|---|---|
| 6 | The story-page chassis pattern `rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon` repeats **15 times** across `demo/stories/`. Strong custom-component candidate (`<StoryPage>` already exists; missing is `<StoryChassis>` or `<StorySection>`). | `slider.vue:64`, `slider-glass-track.vue:130,226`, plus `flourishes.vue:156`, `golden-ratio.vue:113,176`, `typography.vue:84,194`, `blob.vue:279,543,575,651`, `blob-stress.vue:147,170,203` | **P0 — gap (finding §A, §E)** |
| 7 | `numberFieldInputVariants` re-asserts `flex h-10 w-full py-2 text-sm text-center placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50` (`number-field/index.ts:32`) — five of those tokens are exactly the input-pill chassis (`glass.css:183–216`). The cartoon recipe `cartoon-surface rounded-md focus-visible:shadow-[var(--shadow-cartoon-md)]` (`number-field/index.ts:38–39`) does compose `cartoon-surface` (good, post-I.W3.β) — but the **default** branch hand-rolls `border border-input bg-background` instead of consuming `.input-pill` or a sibling `.input-default` recipe. | `number-field/index.ts:32-44` | P1 — drift |

### Axis 3 — Interactive consistency

| # | Finding | Cite | Severity |
|---|---|---|---|
| 8 | `NumberFieldDecrement.vue:20` and `NumberFieldIncrement.vue:20` render bare `<button>` elements with `absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20`. Computed runtime: `border-radius: 0px; background: transparent; no focus-visible ring; no hover state; no press scale`. Compare canonical interactive vocabulary `<Button variant="ghost" size="icon">` (`buttonVariants` in `button/index.ts`) — it ships hover/press/disabled/focus chrome via the four-state Button contract (`CLAUDE.md:185`). | `NumberFieldDecrement.vue:20`, `NumberFieldIncrement.vue:20`; runtime probe confirms `radius: 0px, bg: rgba(0,0,0,0)` | **P0 — interactive consistency break (finding §F)** |
| 9 | The `+`/`-` glyph (`Plus`, `Minus` from `lucide-vue-next`) is rendered at `h-4 w-4` directly inline. Glass-ui's icon vocabulary has `--icon-{xs..xl}` (tokens.css). Bespoke `h-4 w-4` is the same value as `--icon-sm` but not via the token. | `NumberFieldIncrement.vue:22`, `NumberFieldDecrement.vue:22` | P2 — drift |
| 10 | The slider thumb `:active`/`[data-state="active"]` rule (`Slider.vue:200-204`) uses `transform: scale(var(--scale-press))` — correct. But the *track* itself has no active-drag affordance: hover lifts the rail from 4px→6px (`Slider.vue:178-181`) but pressing/dragging does not change the track. The user's "greatly enhanced" remark (finding §14) maps directly to this — the track has only one hover state and one fixed press-thumb-shadow, no graduated tactile feedback. | `Slider.vue:170-204` | **P0 — finding §14 root cause** |

### Axis 4 — Variant orthogonality and rooting

| # | Finding | Cite | Severity |
|---|---|---|---|
| 11 | `sliderVariants` (`slider/index.ts:19-34`) has 4 variants (`standard`, `spectrum`, `timeline`, `glass-track`) but no shape × tier orthogonality. The glass-track variant is **shape-only**; there's no `glass-track-cartoon` or `glass-track-pill` sibling, and no scale axis (`size: sm | md | lg`). Compare `buttonVariants` (variant × size), `toggleVariants` (variant × size). The glass-track refinement vocabulary needs more named recipes — see §C. | `slider/index.ts:19-34`; `Slider.vue:170-204` | **P0 — finding §14 surface** |
| 12 | NumberField root CVA collapses to bare `grid gap-1.5` (`number-field/index.ts:13`) post-I.W3.β. This is correct for the provide/inject pattern but means every story-page consumer composes a bespoke wrapper layout. There is no canonical `<NumberFieldContent>` chrome — `NumberFieldContent.vue:11` is purely a layout-aware padding shim (`[&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5`). The `Content` wrapper has no border, radius, or surface — only positioning. Increment/decrement buttons sit *inside* the input visually, but the visible "rounded chrome" the user perceives is the input's own border-radius (rounded-md). Refining radius means refining `numberFieldInputVariants`'s default branch. | `NumberFieldContent.vue:11`; `number-field/index.ts:13,32-44` | P1 — context for §B |

### Axis 5 — Overlay and motion vocabulary

| # | Finding | Cite | Severity |
|---|---|---|---|
| 13 | `Slider.vue:174-176` uses `transition: height ... background ...` with token easing — correct. But `:hover` track-bg upgrade `var(--glass-bg-medium)` (`Slider.vue:180`) and `:active` thumb shadow (`Slider.vue:203`) have **no transitions on the active state** (only thumb has `transform`/`box-shadow` transition, line 195–197). Press-out feels abrupt. | `Slider.vue:170-204` | P2 — drift |
| 14 | The dock-keep-open round-trip (`Slider.vue:49-58, 60-66`) has zero **visual** affordance during a drag-keep-open cycle. The dock holds (state contract verified by `useDockState.ts:209-226`); there is no ambient feedback in the dock. See §D. | `Slider.vue:49-66`; `useDockState.ts:209-226` | **P0 — finding §10/4 surface** |

### Axis 6 — Typographic and structural hierarchy

| # | Finding | Cite | Severity |
|---|---|---|---|
| 15 | Slider story value-readout `text-mono-caption text-muted-foreground tabular-nums` is correct semantic vocabulary (`slider.vue:70,82,103,156`). NumberField story uses `text-mono-caption text-muted-foreground` for caption rows (`number-field.vue:77,97,110,123`) — also correct. No drift here. | — | clean |
| 16 | The NumberField hero (`number-field.vue:48`) uses `size="display-3" variation="wonk"` while the slider hero uses `size="display-mega" variation="wonk"` (`slider.vue:43`). The two primitives sharing the same chassis pattern diverge in display rung — a sibling-page consistency issue. The glass-track hero matches slider (`display-mega` — `slider-glass-track.vue:83`), so number-field is the outlier. | `slider.vue:43` vs `number-field.vue:48` | P3 — doc |

### Axis 7 — Accessibility resilience

| # | Finding | Cite | Severity |
|---|---|---|---|
| 17 | NumberField increment/decrement buttons (`NumberFieldIncrement.vue:20`, `NumberFieldDecrement.vue:20`) **have no `:focus-visible` style**. Keyboard users get no focus indication. Canonical Button + `--focus-ring-shadow` (`tokens.css:412`) is the prescribed remedy. | `NumberFieldIncrement.vue:20`, `NumberFieldDecrement.vue:20`; `tokens.css:409-412` | **P0 — a11y resilience** |
| 18 | Slider `.slider-thumb:focus-visible { outline: none }` (`Slider.vue:119-121`) — focus-outline is removed but no `:focus-visible` ring substitute is rendered. Keyboard users lose the focus indicator on the thumb. | `Slider.vue:119-121` | **P0 — a11y regression** |
| 19 | Glass-track variant has no `prefers-reduced-transparency` fallback. `--glass-bg-subtle` and `--glass-bg-medium` (`Slider.vue:172,180`) presume the consumer's environment supports the glass tier. | `Slider.vue:170-204` | P2 — drift |

---

## Slider page padding standardization (A)

The user's complaint "padding standardized" maps to **3 distinct issues** in `slider.vue`:

### A.1 — `--space-phi-5` is undefined → body card has zero padding

`slider.vue:64`:
```html
<div class="grid gap-[var(--space-phi-4)] rounded-2xl border-2 border-border bg-card p-[var(--space-phi-5)] shadow-cartoon">
```
Runtime computed style (Playwright probe): `padding: 0px`. The five inner `<section>` sliders have **no breathing room** against the card edge. The hero card looks proportional because `<CreamSurface>` carries its own padding internally; the body card looks crushed because the φ-5 token is missing.

### A.2 — Inconsistent fallback usage in sibling stories

| Site | Form | Resolves to |
|---|---|---|
| `slider.vue:64` | `p-[var(--space-phi-5)]` | `0px` (token missing, no fallback) |
| `slider-glass-track.vue:54` | `p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]` | `4rem` / `6rem` (inline fallbacks) |
| `slider-glass-track.vue:130,226` | `p-[var(--space-phi-5)]` | `0px` |
| `audacious-hero.vue:16` | `p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]` | `4rem` / `6rem` |
| `blob.vue:211` | `p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]` | `4rem` / `6rem` |
| `blob.vue:279,543,575,651` | `p-[var(--space-phi-5)]` | `0px` |
| `blob-stress.vue:203,221` | `p-[var(--space-phi-5)]` | `0px` |

Three sites correctly fallback; eight sites fail silently.

### A.3 — Border weight diverges between sibling stories

`slider.vue:64` uses `border-2 border-border`; `slider-glass-track.vue:130,226` and `number-field.vue` (no chassis) use `border border-border` (1px). The W4.A2 wrapper pattern has no convention here. **`border` (1px) is the de-facto majority** (14 of 15 chassis sites); the `border-2` on slider.vue is the outlier.

### Proposal — story-page padding canon

Defer to §E for the gap-level proposal. Mechanical resolution:

1. **Add `--space-phi-5` and `--space-phi-6` to `tokens.css` §13/§14 (or §1 sizing).** Canonical golden-ratio extension: `--space-phi-5: 4.236rem` (φ⁴), `--space-phi-6: 6.854rem` (φ⁵). This is a pure substrate add; consumers either use the fallbacks (status quo) or the new tokens (post-add behavior is the fallback's intent).
2. **Migrate all 15 chassis sites onto a single `<StoryChassis>` (or utility class).** Eliminates per-site padding/border/radius drift.
3. **Body section gap inside the chassis: `gap-[var(--space-phi-3)]` (1.618rem)** is the W4-canonical rung; `gap-[var(--space-phi-4)]` (`slider.vue:64`) is too generous for inline form primitives — the slider rows want closer vertical proximity.

---

## Number Field rounding diagnosis (B)

The user's "refined and rounded" maps to **two distinct radius decisions**:

### B.1 — The input chrome is under-rounded

Current state: `numberFieldInputVariants.default` (`number-field/index.ts:37`):
```ts
default: 'rounded-md border border-input bg-background focus-visible:shadow-[var(--focus-ring-shadow)]'
```

`rounded-md` = `--radius-md: 6px` (`tokens.css:113`).

The canonical `Input.default` uses `.input-pill` (`glass.css:183`) with `border-radius: var(--radius-pill)` (line 187) — full pill (9999px). Every other input-bearing primitive is pill-shaped. NumberField is the outlier.

There is also `--radius-input: 0.625rem` (`tokens.css:123`) — the *semantic* input radius — and it's defined but **unconsumed anywhere in src/**. The token exists for nothing.

**Decision matrix:**

| Option | Radius | Rationale |
|---|---|---|
| **A. Pill (`--radius-pill`)** | 9999px | Matches `.input-pill` identity. Every input is a pill. NumberField "refined and rounded" reads literally. Strong identity rejoin. |
| **B. Semantic input (`--radius-input`)** | 10px | Activates the unused token. Closer to current `rounded-md` (6px) so visual delta is small. But still leaves Input + NumberField visually divergent. |
| **C. Card-like (`--radius-2xl`/`--radius-card`)** | 16px | Most rounded short of pill. Reads as a "soft container". Reasonable for the cream-warm cartoon variant; aggressive for the default chassis. |

**Recommended canon: A (pill).** The user's directive "refined and rounded" reads as "make it match the pill input chassis." This is the **gestalt** answer — sibling-primitive identity over per-primitive divergence. The cartoon variant (`number-field/index.ts:38-39`) currently uses `rounded-md` too; it should also unify, but to `--radius-md` or `--radius-2xl` is a separate question (cartoon-surface itself is radius-agnostic per `W3-cartoon-hoist.md` line 40).

**Sub-decision for cartoon variant:** the cartoon recipe inherits its "soft maximalist" identity from the design-language axis (`CLAUDE.md ## Design Axes — Design language`). Cartoon Input uses `rounded-md` (`input/index.ts:17`). NumberField cartoon should mirror Input cartoon — `rounded-md` (current state) **is correct for cartoon**; only the **default** branch is broken. If the user's "refined and rounded" is interpreted as "the default chassis," option A applies; if "the cartoon variant," current state holds.

### B.2 — Increment/decrement buttons have no chrome

Per axis-3 finding 8: the buttons are bare `<button>` elements with `radius: 0px, bg: transparent, no hover, no press, no focus-visible`. The visible "+/-" glyphs sit on bare squares overlapping the input's rounded corners. Even if B.1 ships pill-radius, the button corners will *still* render as 0px squares overflowing the pill's curvature. **B.2 is dependent on B.1** — they must land together.

See §F for the button design-language proposal.

---

## Slider Glass Track refinement vocabulary (C)

The user's "greatly enhanced and refined" indicates the current state is too neutral. Visual probe (Playwright screenshot at `/Users/mkbabb/Programming/glass-ui/slider-glass-track.png`) confirms: thin gray rail, small disc thumb, no graduated depth. Compared to the glass-tier identity (`.glass-{subtle..elevated}`), this barely reads as glass.

### C.1 — What's weak (diagnosis by element)

| Element | Current | Weakness |
|---|---|---|
| Track at rest | 4px `--glass-bg-subtle` (`Slider.vue:171-176`) | Too thin to convey glass tier. Reads as a raw `border-bottom`. No grain, no highlight. |
| Track on hover | 6px `--glass-bg-medium` (`Slider.vue:178-181`) | Better, but still no depth shadow. The lift is height-only, not visual elevation. |
| Range fill | `color-mix(--foreground 18%)` (`Slider.vue:184`) | Flat opacity overlay. No gradient, no accent inheritance, no progress glow. |
| Thumb at rest | 1rem disc, `--background` bg, 2px `--foreground` border, `--shadow-sm` (`Slider.vue:188-198`) | Reads as a circle on the rail, not a tactile control. No catch-light, no edge highlight, no inset. |
| Thumb on press | `scale(--scale-press) + --shadow-cartoon-accent` (`Slider.vue:200-204`) | Cartoon-accent on press is correct in spirit but isolated — there's no rest-state cartoon shadow to lift *from*. |

### C.2 — Refinement vocabulary (proposed)

The recipe should introduce **three new variants** alongside the existing `glass-track`, expressing the orthogonal tier × intent dimension:

| Variant | Tier | Intent | Recipe sketch |
|---|---|---|---|
| **`glass-track`** (refined, current name preserved) | Glass-medium | Canon scrub | Track: 6px → 8px on hover, `--glass-bg-medium` rest / `--glass-bg-elevated` hover, `--glass-blur-subtle` backdrop, inner inset highlight at top edge. Thumb: 1.125rem disc, `--background` bg, gradient border (`linear-gradient(180deg, --foreground 70%, --foreground 40%)` mimicking the catch-light), rest shadow `--shadow-sm`, press shadow `--shadow-cartoon-accent`. Range: `linear-gradient(to right, color-mix(--foreground 12%), color-mix(--foreground 22%))` for progress fade. |
| **`glass-pill`** (new) | Glass-elevated | Featured / primary control | Track: 10px tall, `--radius-pill`, `--glass-bg-elevated` + 1.5px highlight border. Thumb: 1.5rem, gradient bg (`linear-gradient(180deg, --background, --secondary)`) + 2.5px `--foreground` border + `--shadow-md` rest, scales to 1.625rem on press with `--shadow-cartoon-accent`. The "tactile primary scrub." |
| **`glass-cartoon`** (new) | Cartoon | Editorial / cream-substrate | Track: 8px, `--cream-edge` border, 2px `--foreground` outer border (mirrors `cartoon-surface`), `--shadow-cartoon-sm` rest depth. Thumb: 1.25rem, cream-warm bg, 2px `--foreground` border, `--shadow-cartoon` rest, lifts to `--shadow-cartoon-md` on hover, depresses with `translate(2px, 2px)` + `--shadow-cartoon-sm` on press (mirrors button cartoon press contract). The "design-language primary scrub." |
| **`spectrum`** (existing, unchanged) | — | Full-rail gradient | Tall bar thumb. (No refinement requested.) |
| **`timeline`** (existing, unchanged) | — | Scrub head | Disc thumb in glass scrub. (No refinement requested.) |

### C.3 — Sizing axis (orthogonal to variant)

Add `size: 'sm' | 'md' | 'lg'` to `sliderVariants`:

| Size | `--slider-track-height` | `--slider-thumb-size` |
|---|---|---|
| `sm` | 2px / 3px on hover | 0.75rem |
| `md` (default) | 4px / 6px on hover | 1rem |
| `lg` | 8px / 10px on hover | 1.5rem |

This composes with variant cleanly because all sizes go through CSS-property-fallback contracts (`--slider-track-height`, `--slider-thumb-size`) per `W3-dock-easing-slider.md` lines 122–128. The sizing axis is just a class-name modifier setting these tokens.

### C.4 — Sub-tokens to externalize

Per the `W3-dock-easing-slider.md` custom-property fallback contract, the refined recipe needs more knobs:

```css
--slider-track-bg, --slider-track-bg-hover, --slider-track-bg-active
--slider-track-height, --slider-track-height-hover
--slider-track-border, --slider-track-blur
--slider-range-bg-from, --slider-range-bg-to (or single --slider-range-bg)
--slider-thumb-size, --slider-thumb-size-press
--slider-thumb-bg, --slider-thumb-bg-press
--slider-thumb-border-color, --slider-thumb-border-width
--slider-thumb-shadow, --slider-thumb-shadow-hover, --slider-thumb-shadow-press
```

Existing tokens (`Slider.vue:96-117,170-204`): `--slider-track-bg`, `--slider-track-height`, `--slider-thumb-size`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-border-width`, `--slider-thumb-shadow`, `--slider-range-bg`. The proposed adds: `*-hover`, `*-press` siblings + `--slider-track-blur`. ~7 token primitives net.

---

## Drag-keep-open visual affordance (D)

### D.1 — The current contract has zero visual signal

`Slider.vue:49-58` calls `dockSink.acquire()` on pointerdown, `dockSink.release(token)` on pointerup. `useDockState.ts:209-226` increments `keepOpenCount` and clears the collapse timer. The dock **stays open** — but there's no signal to the user that the dock is *being held* by anything.

This is the user finding §10 / §4 (carried into J): "Drag a slider — the dock holds; this section needs to be refined." The dock visually behaves identically to a casual hover; the user has no way to verify the keep-open state from the screen alone.

### D.2 — Proposed feedback vocabulary

**Three layered signals** (each independently composable):

1. **Tier-shade shift on hold.** When `keepOpenCount > 0`, the dock substrate's tier color steps up one rung — `--glass-bg-default` → `--glass-bg-medium`. The substrate already supports this via the four-tier ladder (`CLAUDE.md ## Glass tier`). Implementation: `useDockState` exposes `isHeld: ComputedRef<boolean>` (`keepOpenCount.value > 0`); `<GlassDock>` reads it and applies a `data-held` attribute; `dock.css` keys the substrate transition off the attr.
2. **Active-thumb halo.** On `:active`, the slider thumb already lifts to `--shadow-cartoon-accent` (`Slider.vue:203`). Add a coordinating *outer* halo — `box-shadow: --shadow-cartoon-accent, 0 0 0 8px color-mix(--cartoon-accent-color 8%, transparent)` — that ripples outward from the thumb during the entire drag. The halo is the "I am holding the dock open" gesture mirrored at the gesture origin.
3. **Dock-edge breathing.** While held, the dock's `border` (or `box-shadow`) slowly pulses a subtle `--accent-color` tint (1.2s `ease-in-out`, infinite). The pulse is a spec-compliant "active state, not idle" signal. Driven by an `@keyframes dock-held-pulse` keyed off `data-held`. Bracket with `prefers-reduced-motion`.

Signal 1 is the canonical answer — it costs no animation, surfaces through the existing tier vocabulary, and reads at a glance. Signals 2 and 3 are layered for cases where the dock is far from the gesture origin (vertical rail with slider mid-page).

### D.3 — Public surface (composable hook)

`useDockState` already counts holds (`useDockState.ts:209-226`). The new public read is `isHeld` (or `keepOpenActive`). Provide it via the same key path as the sink consumer:

```ts
// In useDockState
const isHeld = computed(() => keepOpenCount > 0);
// Provide via existing inject key path or a new one
```

This is a non-breaking add — pure read-derived state.

---

## Story-page padding canon (E) — glass-ui gap

### E.1 — The pattern repeats 15 times

The chassis pattern `rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon` (with minor variants of `border-2`, `gap-[var(--space-phi-{2,3,4})]`) appears at:

- `demo/stories/_internal/blob-stress.vue:147,170,203,221`
- `demo/stories/foundations/flourishes.vue:156`
- `demo/stories/foundations/golden-ratio.vue:113,176`
- `demo/stories/foundations/typography.vue:84,109,194`
- `demo/stories/primitives/slider.vue:64`
- `demo/stories/primitives/slider-glass-track.vue:130,226`
- `demo/stories/primitives/blob.vue:279,543,575,651`

Plus the hero pattern `<CreamSurface tone="warm" class="relative overflow-hidden" :class="'p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]'">` repeats 3 times (`audacious-hero.vue:16`, `blob.vue:211`, `slider-glass-track.vue:54`).

### E.2 — Proposal: `<StoryChassis>` + `<StoryHero>` (or utility classes)

**Path A — custom components** (preferred per "substrate-with-consumer" precept):

```vue
<!-- demo/stories/_internal/StoryChassis.vue -->
<template>
  <div class="grid gap-[var(--space-phi-3)] rounded-card border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon">
    <slot />
  </div>
</template>
```

```vue
<!-- demo/stories/_internal/StoryHero.vue -->
<template>
  <CreamSurface :tone="tone" class="relative overflow-hidden" :class="'p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]'">
    <slot />
  </CreamSurface>
</template>
```

**Path B — utility classes** (in `demo/demo.css` or a new `story-chassis.css`):

```css
@utility story-chassis {
  display: grid;
  gap: var(--space-phi-3);
  border-radius: var(--radius-card);
  border: 1px solid var(--border);
  background: var(--card);
  padding: var(--space-phi-5);
  box-shadow: var(--shadow-cartoon);
}

@utility story-hero {
  position: relative;
  overflow: hidden;
  padding: var(--space-phi-5, 4rem);
}
@media (min-width: 768px) {
  .story-hero { padding: var(--space-phi-6, 6rem); }
}
```

Path A is preferred because it co-locates the layout intent (gap, sizing) with the surface intent (border, shadow). Path B is valid for storybook-internal-only scope but loses the typed Vue prop surface. Either resolution satisfies the user's "padding standardized" finding.

### E.3 — Dependency on token gap

Both paths require `--space-phi-5` and `--space-phi-6` defined. **This is a hard precondition.** Adding `--space-phi-5: 4.236rem` (φ⁴ = 1.618² × 1.618) and `--space-phi-6: 6.854rem` (φ⁵) to `tokens.css` §1 sizing region completes the φ ladder. Per `feedback_no_backwards_compat`: clean addition, no aliases.

---

## NumberField buttons design-language audit (F)

### F.1 — Current state is bare HTML, no design language

```vue
<!-- NumberFieldDecrement.vue:20 -->
<NumberFieldDecrement data-slot="decrement" v-bind="forwarded"
  :class="cn('absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20', props.class)">
```

This bypasses every interactive vocabulary — `<Button>`, `.btn-pill`, `.glass-btn`, `.interactive-item`, `.focus-ring`, `.active-scale`. Computed runtime confirms `radius: 0px, bg: transparent, no hover, no press, no focus-visible`.

### F.2 — Proposal: thread through `<Button variant="ghost" size="icon">`

`buttonVariants` (`button/index.ts`) exposes `variant: 'ghost'` + `size: 'icon'` — exactly the icon-button geometry needed. Replace the bare button:

```vue
<!-- NumberFieldDecrement.vue (proposed) -->
<NumberFieldDecrement data-slot="decrement" v-bind="forwarded" as-child>
  <Button variant="ghost" size="icon"
    :class="cn('absolute top-1/2 -translate-y-1/2 left-1', props.class)">
    <slot><Minus class="h-4 w-4" /></slot>
  </Button>
</NumberFieldDecrement>
```

`as-child` is the reka-ui pattern for slot-forwarding on primitives — `NumberFieldDecrement` from `reka-ui` supports it. The `<Button>` then carries:
- `--radius-button` rest radius
- `--scale-press-btn` press
- `--focus-ring-shadow` focus-visible
- `--opacity-disabled` disabled
- `--scale-hover-dock` (or equivalent) hover

### F.3 — Glyph rendering

Currently `<Plus class="h-4 w-4" />` and `<Minus class="h-4 w-4" />`. `--icon-sm` is also `1rem`/16px (per the `--icon-{xs..xl}` ladder). The Tailwind `h-4 w-4` resolves to the same value — but the *token* should be consumed for consistency. Pass `<Plus :size="14" />` or use the canonical `<IconStamp>` wrapper if a decorated treatment is wanted.

For NumberField specifically, **plain Lucide via `--icon-sm`** is correct — these are functional buttons, not decorative stamps. The sole change is from `class="h-4 w-4"` to `class="size-[var(--icon-sm)]"` or pass the icon size via `:size` prop.

### F.4 — Why not bespoke

The user's "refined and rounded" implicitly demands a design-language match. The +/- buttons are the most-touched element in the field; rendering them as bare `<button>`s breaks the four-state Button contract everywhere else in the system. There is **no reason to keep them bespoke** — the Button primitive composes correctly via `as-child`.

---

## Glass-ui gaps surfaced

| # | Gap | Sites | Proposed placement |
|---|---|---|---|
| **G-1** | `--space-phi-5`, `--space-phi-6` undefined while consumed at 11 sites (3 with fallback, 8 without). | `demo/stories/_internal/blob-stress.vue:203,221`, `slider.vue:64`, `slider-glass-track.vue:130,226`, `blob.vue:279,543,575,651` (+ 3 with fallback) | `tokens.css` §1 sizing — `--space-phi-5: 4.236rem`, `--space-phi-6: 6.854rem`. |
| **G-2** | Story-chassis pattern repeats 15× across `demo/stories/`. | `slider.vue:64`, `slider-glass-track.vue:130,226`, `flourishes.vue:156`, `golden-ratio.vue:113,176`, `typography.vue:84,109,194`, `blob.vue:279,543,575,651`, `blob-stress.vue:147,170,203,221` | Demo-internal `<StoryChassis>` component or `@utility story-chassis` class. |
| **G-3** | Story-hero pattern repeats 3× with fallback inline at every site. | `audacious-hero.vue:16`, `blob.vue:211`, `slider-glass-track.vue:54` | Demo-internal `<StoryHero tone="warm">` component or `@utility story-hero` class. |
| **G-4** | Slider variant axis is 1-D (variant only). Sibling primitives have `variant × size`. | `slider/index.ts:19-34` | Add `size: 'sm' | 'md' | 'lg'` to `sliderVariants`; thread through CSS-property-fallback contracts. |
| **G-5** | Slider glass-track variant family is single-tier — no `glass-pill`, `glass-cartoon`. | `slider/index.ts:19-34`; `Slider.vue:170-204` | Add 2 new variant blocks; ~50 lines scoped CSS each. See §C.2. |
| **G-6** | Dock keep-open state has no public readback signal for visual feedback. | `useDockState.ts:209-226`; `Slider.vue:49-66` | Add `isHeld: ComputedRef<boolean>` to `useDockState` return; `<GlassDock>` applies `data-held` attribute; `dock.css` keys substrate transition off attr. |
| **G-7** | NumberField increment/decrement buttons bypass canonical Button vocabulary (no `--radius-button`, `--focus-ring-shadow`, `--scale-press-btn`, hover state). | `NumberFieldIncrement.vue:20`, `NumberFieldDecrement.vue:20` | Migrate to `<Button variant="ghost" size="icon">` via `as-child`. See §F.2. |
| **G-8** | NumberField input default branch uses `rounded-md` while sibling Input.default uses `--radius-pill`. The semantic `--radius-input` token (10px) is defined but unused. | `number-field/index.ts:37`; `glass.css:187`; `tokens.css:123` | Migrate NumberField default to `--radius-pill` (matches input-pill identity); revisit `--radius-input` token use case (consider deletion if no consumer surfaces). |
| **G-9** | Slider thumb `:focus-visible` sets `outline: none` with no replacement focus indicator. | `Slider.vue:119-121` | Add `box-shadow: var(--focus-ring-shadow)` for `:focus-visible` on the thumb. |
| **G-10** | Slider glass-track variant has no `prefers-reduced-transparency` fallback. | `Slider.vue:170-204` | Add `@media (prefers-reduced-transparency: reduce)` block falling back to `--secondary` track bg (no glass blur). |
| **G-11** | The `--shadow-cartoon-accent` pulse / halo vocabulary needs externalization for the keep-open feedback. | (proposed, §D) | Add `--shadow-cartoon-halo` token (`color-mix(--cartoon-accent-color 8%) 0 0 0 8px`) or composable. |

---

## Union candidates

| # | Pattern | Both forms | Canonical |
|---|---|---|---|
| **U-1** | "Section chassis" surface | `rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon` (15× in demo/stories) vs `Card variant="default"` (`rounded-xl glass-default shadow-card`) (uses internal Card system) | `<StoryChassis>` extends Card with the cartoon recipe; OR add a `cartoon` Card variant that ships padding (Card's variant CVA is variant-only, no padding — leaves layout to the consumer). The 15-site pattern proves consumers want bundled padding + radius + shadow. |
| **U-2** | "Soft-rounded form chassis" | NumberField default (`rounded-md`) vs Input default (`--radius-pill`) vs cartoon-surface (radius unset) | All form-bearing primitives unify on `--radius-pill` for default and `--radius-md` for cartoon (per `W3-cartoon-hoist.md` line 40). NumberField default is the outlier — migrate to pill. |
| **U-3** | "Icon-button glyph" | `<button class="...p-3"><Plus class="h-4 w-4" /></button>` (NumberField) vs `<Button variant="ghost" size="icon"><Plus /></Button>` (canonical) | `<Button variant="ghost" size="icon">` is canonical; thread NumberField through `as-child`. |
| **U-4** | "Slider thumb depth" | Default variant: `--shadow-sm` rest, no press lift (`Slider.vue:115`) vs glass-track: `--shadow-sm` rest, `--shadow-cartoon-accent` press (`Slider.vue:194,203`) vs spectrum/timeline: no shadow at all | All slider variants ship rest depth + press lift. Press lift → `--shadow-cartoon-accent` (existing). Rest depth → `--shadow-sm` baseline; glass-cartoon variant uses `--shadow-cartoon-sm`. |
| **U-5** | "Story φ-spacing usage" | `p-[var(--space-phi-5,4rem)]` (3 sites with fallback) vs `p-[var(--space-phi-5)]` (8 sites without — silent zero) | Define the token. After definition, all 11 sites read identically; story-chassis component eliminates the per-site repetition. |

---

## Proposed J wave shape

The R3 scope decomposes into **three coherent waves** with distinct ownership. The token gap (G-1) is a precondition for the chassis wave; the slider refinement (G-4, G-5, G-9, G-10) is independent of the NumberField refinement (G-7, G-8); the dock keep-open feedback (G-6, G-11) overlaps with R1's findings 4/10 and should be co-owned.

### J.W-FORM (form primitives wave)

| Lane | Owner-bound | Closes on |
|---|---|---|
| **α — token / gap precondition** | `src/styles/tokens.css` §1 | `--space-phi-5`, `--space-phi-6` defined; runtime probe of any chassis site shows non-zero padding |
| **β — story-chassis substrate** | `demo/stories/_internal/StoryChassis.vue` (new), `demo/stories/_internal/StoryHero.vue` (new), 15 chassis-site migrations + 3 hero-site migrations | All 15+3 sites consume the new component; grep proves `p-[var(--space-phi-5)]` count = 0 outside the new components |
| **γ — slider glass-track refinement** | `src/components/ui/slider/{index.ts, Slider.vue}`, `demo/stories/primitives/slider-glass-track.vue` | `sliderVariants` carries `glass-track`, `glass-pill`, `glass-cartoon` + `size` axis; story showcases all 3 + 3 sizes; runtime probe of glass-track shows graduated rest/hover/press depth |
| **δ — NumberField rounding + button design-language** | `src/components/ui/number-field/{index.ts, NumberFieldIncrement.vue, NumberFieldDecrement.vue}` | NumberField default uses `--radius-pill`; +/- buttons consume `<Button variant="ghost" size="icon">` via `as-child`; runtime probe shows non-zero radius + `--focus-ring-shadow` on focus-visible |
| **ε — drag-keep-open feedback** | `src/components/custom/dock/composables/useDockState.ts`, `src/components/custom/dock/GlassDock.vue`, `src/styles/dock.css` | `useDockState` exposes `isHeld`; `<GlassDock>` ships `data-held`; tier-shade transition keys off attr; visual probe during slider drag confirms the substrate shifts |

**Brittleness window:** none. All five lanes are additive (new variants, new components, new tokens, new readbacks). The NumberField CVA migration is a single-property change with no shape break.

**Cross-wave dependencies:**
- α blocks β (token must exist before chassis component consumes it).
- δ.B.1 (pill radius) and δ.F (Button-via-as-child) must land together — see §B.2.
- ε overlaps with R1 finding §10 (top dock collapsed state) — the *same* `useDockState` is touched. Coordinate the dispatch with R1 owner; either co-locate in one wave or sequence.

### J.W-FORM lane-count: 5

Matches the small-team default per `SPEC.md` "smallest agent count that preserves disjoint ownership."

### Hard gates

1. `--space-phi-5`, `--space-phi-6` defined; `rg "p-\[var\(--space-phi-5\)\]" src/ demo/` returns 0 hits outside the new chassis component.
2. `<StoryChassis>` consumed by all 15 chassis sites.
3. `sliderVariants` exports 6 variants (3 glass + 3 existing) × 3 sizes; type signature compiles.
4. NumberField default branch reads `border-radius: 9999px` at runtime; +/- buttons reach `--focus-ring-shadow` on Tab.
5. Dock substrate `data-held="true"` during slider drag (Playwright probe).
6. `npm run build` + `npm run typecheck` + smoke tests green.
7. Visual-runtime lane: Playwright captures of `/primitives/slider`, `/primitives/slider-glass-track`, `/primitives/number-field` show: non-zero body padding; refined glass-track depth; pill-rounded NumberField with focus-visible chrome.

---

## Closing tally

- **3 user findings → 7 root causes** identified (1 token gap, 2 chassis pattern repeats, 1 slider-shape-only variant, 1 NumberField radius break, 1 button bypass, 1 dock-feedback gap).
- **11 glass-ui gaps surfaced** (G-1 through G-11).
- **5 union candidates** (U-1 through U-5).
- **5 proposed lanes** under J.W-FORM, all additive, no brittleness window.
- **2 P0 a11y findings** (NumberField buttons no focus-visible; Slider thumb outline removed without substitute).
- **2 P0 visual bugs** (φ-5 silent zero; NumberField under-rounded).
- **1 ε-lane cross-tranche overlap** (dock keep-open feedback couples with R1).
