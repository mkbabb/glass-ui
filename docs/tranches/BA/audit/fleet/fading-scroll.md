# BA fleet — lane: fading-scroll (R8-8)

The preset-strip edge-fade bug + the library abstraction candidate.

## 1. Root cause — the at-rest edge fade (R8-08)

### The mechanism

The R8-08 capture ("Shy" fades at the right edge; the user: "we should NOT have
faded elements when we're not scrolled… at the edges of the list") is the **blob
(goo) studio mood preset row**, not the aurora `PresetPickerRow`. It composes the
library's STATIC mask utility:

- **`demo/stories/substrates/blob.vue:404`** —
  `class="flex gap-2 overflow-x-auto scroll-fade-mask scrollbar-hidden"`.

The class resolves to **`src/styles/utilities/base.css:271-273`**:

```css
.scroll-fade-mask {
    mask-image: linear-gradient(to right, transparent, black var(--mask-fade-width), black calc(100% - var(--mask-fade-width)), transparent);
}
```

This gradient feathers BOTH edges **unconditionally** — it has zero knowledge of
scroll position or overflow direction. So:

- At `scrollLeft = 0` (rest), the **left** edge is feathered (`transparent → black 16px`)
  even though there is nothing to scroll back to — the first card ("Calm") loses its
  left chrome.
- The **right** edge is feathered even when the row fits with no trailing overflow,
  or when fully scrolled-right with nothing left to reveal.

### Live confirmation (π readback, `:5199/substrates/blob`, dark)

The mood row computes at rest: `scrollLeft: 0`, `scrollWidth 416 / clientWidth 335`
(overflows right by 81px) — yet `maskImage` resolves to the full two-sided gradient
`transparent, black 16px, … calc(100% - 16px), transparent`. The **left** 16px is
masked at `scrollLeft 0` with no back-scroll available. This is the R8-08 defect,
confirmed mechanically.

The SAME defect exists on the **vertical** axis: the Configurator controls column
(`.configurator-controls.scroll-fade-y`, `scrollTop 0`, overflows down by 799px)
feathers its **top** edge at rest where nothing is scrolled-off-top. The static
`.scroll-fade-y` (`base.css:283`) is two-sided and scroll-state-blind too.

### Why it is "not scroll-state-driven"

`.scroll-fade-mask` / `.scroll-fade-y` / `-top` / `-bottom` are PURE CSS utilities
(`base.css:271-285`) — no `@scroll` handler, no scroll-timeline, no `@property`
interpolation. The ONLY scroll-state-aware edge-fade in the repo is the bespoke,
hand-rolled JS in **`demo/stories/aurora/PresetPickerRow.vue:25-48`** (a `measure()`
that reads `scrollLeft`/`scrollWidth`/`clientWidth`, a `ResizeObserver`, an `@scroll`
listener, and `fadeLeft`/`fadeRight` refs that toggle `--mask-l`/`--mask-r` between
`var(--mask-fade-width)` and `0px`). That bespoke logic is exactly the abstraction
the user is asking for — it lives in ONE demo file, is binary (present/absent, not a
progressive feather), and every OTHER scroll strip in the repo reaches for the broken
static utility instead.

## 2. Census — every horizontal/vertical scroll strip that wants this pattern

| # | site (file:line) | axis | current mechanism | scroll-state-aware? | defect at rest |
|---|---|---|---|---|---|
| C1 | `demo/stories/substrates/blob.vue:404` (mood/blob presets) | H | `.scroll-fade-mask` (static) | NO | left edge fades at rest — the R8-08 capture |
| C2 | `src/components/custom/configurator/Configurator.vue:232` (default preset row) | H | `.scroll-fade-mask` (static) | NO | both edges fade regardless of overflow |
| C3 | `src/components/custom/configurator/Configurator.vue:187,192` (controls column `scrollMode` auto/always) | V | `.scroll-fade-y` (static) | NO | top edge fades at `scrollTop 0` |
| C4 | `demo/stories/aurora/AuroraConfigDock.vue:229` (aurora controls column) | V | `.scroll-fade-y` (static) | NO | top edge fades at rest |
| C5 | `src/components/custom/tabs/SegmentedTabs.vue:344` (`variant="underline"`/`scroll`/`auto` overflow strip) | H | `.scroll-fade-mask` (static) + `.segmented-tabs--scroll` | NO | both edges fade; this IS the R8-16 curve-gallery picker surface (12-family underline strip) |
| C6 | `demo/stories/aurora/PresetPickerRow.vue:78` (aurora preset thumbnails) | H | bespoke JS (`--mask-l`/`--mask-r` + ResizeObserver + `@scroll`) | YES (binary only) | none — but it is the un-abstracted prototype; should fold ONTO the new primitive |
| C7 | dock `overflow="scroll"` (`src/styles/dock/overflow.css:29-54`) | H + V | `overflow:hidden`/`auto` + the pill's ROUNDED clip masks the edge | N/A | DISTINCT mechanism (rounded pill edge, not a linear mask) — NOT a consumer; noted to avoid double-claiming |

The token already exists: `--mask-fade-width: 1rem` (`src/styles/tokens/offsets-sizing.css:15`),
also locally overridden to `0.5rem` on `.segmented-tabs--scroll`
(`src/styles/segmented-tabs.css:268`).

**Adjacent-but-distinct (not consumers):** `ScrollingText.vue:78-94` masks on an
**overflow-detection** signal (`[data-overflows]` from a `useResizeObserver` measure),
NOT scroll position — it is the marquee-clip case, a different concern. Dock
`overflow="scroll"` (C7) uses the rounded-pill clip, not a linear edge mask.

**≥2-consumer bar: PASSES decisively.** Binary library consumers alone: C2, C3
(Configurator — shipped) + C5 (SegmentedTabs — shipped). Demo consumers C1, C4, C6
migrate onto it. Six real surfaces want the scroll-state-driven behaviour; only one
(C6) currently has it, hand-rolled.

## 3. Design — the library `FadingScroll` component direction

### The gestalt diagnosis

The library ships a STATIC edge-fade (cosmetically right when overflow exists in
both directions, wrong at the scroll extremes) and ONE bespoke scroll-aware
prototype trapped in a demo. The correct shape is a single library primitive that
owns the scroll-state→edge-feather mapping on BOTH axes, PRM-clean, with the JS
measure loop as the feature-detected fallback to a native scroll-driven path.

### Name + placement

- **Name:** `<FadingScroll>` (the user's own coinage: "a fading scroll list"). A
  thin scroll-container wrapper, default-slotted.
- **Placement:** `src/components/custom/fading-scroll/` (feature-dir colocation per
  AY.W-COLOCATE — `FadingScroll.vue` at root, the scroll-state composable under
  `composables/`, a `README.md`). Subpath `@mkbabb/glass-ui/fading-scroll`. The CSS
  half folds into `src/styles/utilities/base.css` (extending the existing
  `.scroll-fade-*` family, which it SUPERSEDES — clean break, no static-utility
  alias kept; the per-no-overflow-edge bug means the static class is itself the
  defect and should retire).

### The mechanism (dual-path, single writer — mirror `scroll-driven.css`)

1. **Native primary (compositor):** drive the per-edge mask stops off a
   `scroll(self inline)` / `scroll(self block)` timeline via registered `@property`
   `<length-percentage>` mask-width customs (so they interpolate). `animation-range`
   feathers the start-edge stop from `0` only once `scrollLeft/Top > 0`, and the
   end-edge stop only while trailing overflow remains. This is the natural extension
   of the existing `@supports (animation-timeline: scroll())` block — the edge-fade
   becomes a `scroll()`-timelined mask rather than a `scaleX` bar. ZERO JS on
   supporting engines (Baseline Newly Available, the same bar scroll-driven.css
   already cleared).
2. **JS fallback (≤20 LOC, feature-detected):** the `PresetPickerRow` logic,
   promoted to a `useFadingScroll(el)` composable — `scrollLeft/Top`,
   `scrollWidth/Height − clientWidth/Height`, a `ResizeObserver` + rAF-coalesced
   `@scroll`, writing the same `@property` mask-width customs. Reuses the repo's
   `useResizeObserver` + `useRAFLoop` substrates (no hand-rolled rAF). Gated OFF when
   the engine supports the scroll-timeline (single-writer discipline).
3. **PRM-clean:** under `prefers-reduced-motion: reduce` the edge-fade is STATIC
   (the mask either present or absent per the discrete overflow flags, no animated
   feather) — the mask is a legibility affordance, not motion, so unlike
   scroll-driven.css it does NOT vanish under PRM; it just stops interpolating. The
   discrete overflow-edge presence stays correct.

### Contract (props)

- `axis?: "x" | "y"` (default `"x"`) — the scroll + fade axis (covers the user's
  "compatible with vertical scrolling, too").
- `fadeStart?: boolean` / `fadeEnd?: boolean` (default both `true`) — per-edge opt-out.
- the default slot is the scrolled content; the root is the scroll port.

### Token surface

- `--fade-scroll-width` (rename/supersede `--mask-fade-width`; default `1rem`,
  per-site overridable — SegmentedTabs already wants `0.5rem`). ONE knob, inheriting,
  retunable on any ancestor.
- The registered `@property` interpolation customs (`--fade-start`, `--fade-end`,
  `<length-percentage>`, `inherits: false`) are internal, not a public token.

### What it closes

R8-08 (the at-rest no-overflow fade) becomes structurally impossible — the start
edge only feathers past `scroll > 0`, the end edge only while trailing overflow
remains, on both axes, on the compositor where supported. The six census surfaces
(C1–C6) collapse onto ONE primitive; the bespoke `PresetPickerRow` JS (C6) and the
two-sided static `.scroll-fade-*` utilities retire.

## 4. Evidence

The binding visual is banked at `ground/R8-08-fading-scroll-list.png` (the mood row
with "Shy" feathered). The π readbacks above (mask-image two-sided at `scrollLeft 0`
/ `scrollTop 0` on both the H mood row and the V configurator column) are the
mechanical confirmation captured live on `:5199/substrates/blob` in dark mode.
