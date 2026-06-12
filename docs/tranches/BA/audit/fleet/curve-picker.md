# BA fleet lane — curve-picker (R8-16)

> The R8-16 read: the curve-gallery 12-family picker "looks awful" on dark — "should be
> a better scrolling item, perhaps another dock." Live-probed `/motion/curve-gallery` on
> :5199, dark register (the demo shell is dark-pinned this session — the captures ARE the
> flagged register). Mechanical root-cause + design diagnosis + a single recommended
> direction below.

## Surface under audit

- Story: `demo/stories/motion/curve-gallery.vue` (the picker is the `<SegmentedTabs variant="underline">` at L165–172, demo-local re-tuned by `.curve-family-picker` `:deep()` at L293–299).
- Component: `src/components/custom/tabs/SegmentedTabs.vue` + `src/styles/segmented-tabs.css` (the `--underline` variant, L201–262 of the CSS).
- Route: `/motion/curve-gallery`, manifest `background: "grid"` (`demo/stories/manifest.ts:514`).
- The 12 families ARE the W-MOTION2 isomorphism IA (Standard·Sine·Quad·Cubic·Expo·Circ·Back·Bounce·Steps·Linear()·Springs·Custom): `grep -c "family:" curve-families.ts` = 12. **Any remedy MUST preserve all 12 as the primary IA** — this is a presentation swap, not an IA change.

## Evidence (banked beside this report)

- `curve-picker-dark-strip.png` — element-clipped: the flat olive-grey band, all 12 labels white, the active underline barely visible.
- `curve-picker-dark-context.png` / `curve-picker-dark-full.png` — the strip in page context over the grid substrate.
- `docs/tranches/BA/audit/ground/R8-16-awful-scrolling-item.png` — the user's original capture (matches).

## The mechanical root cause (TWO live-proven defects)

### Defect A — the selected/unselected hierarchy is INVERTED (the headline)

Live getComputedStyle on the strip (dark):

| item | resolved `color` | luminance |
|---|---|---|
| **active** "Standard" (`var(--foreground)`) | `rgb(232, 231, 227)` | L≈90 (off-white) |
| **inactive** "Sine"…"Custom" (`var(--muted-foreground)`) | `rgb(255, 255, 255)` | L=100 (pure white) |

The selected family is the **dimmest** label on the strip; the eleven unselected labels are at MAXIMUM luminance. The only "selected" signal is the 2px underline pseudo (`::before`, `background: var(--foreground)` = the same `rgb(232,231,227)` off-white) which is near-invisible against the grid wash. There is effectively NO read of which family is active.

Root cause is a `contrast-color()` interaction, traced live up the cascade: the SegmentedTabs base rule `.segmented-tab { color: var(--muted-foreground) }` (`segmented-tabs.css:~205`) is the ONLY color rule matching the inactive tabs (confirmed: 1 matched rule). But the story-hero glass CARD (`.rounded-card.text-card-foreground`, the `story-hero-card` from `StoryHero.vue`) re-points `--muted-foreground` → **`contrast-color(hsl(24 8% 10%))`** on every descendant inside the card. This is the W55/AZ adaptive-glass `@supports (color: contrast-color(...))` progressive-enhancement layer (CLAUDE.md "Adaptive glass legibility … the `contrast-color()` flip"). `contrast-color()` of the dark warm ink returns pure WHITE — so EVERY `--muted-foreground` consumer inside the card (the inactive tabs among them) computes to `rgb(255,255,255)`, while the active tab reads `--foreground` directly (NOT re-pointed) and stays the off-white L90.

So: the muted register is lifted to max-white by the card's contrast-color refinement, but the active register is NOT, leaving active < inactive. Root cause = `demo/stories/StoryHero.vue` (the `story-hero-card`'s adaptive `--muted-foreground` contrast-color re-point) × `src/styles/segmented-tabs.css` (the underline variant signalling active ONLY via the low-contrast underline + a `--foreground` that the card's refinement does not lift in lockstep). This is the cross-cutting "dark register flat" cluster (R8-11/12/13/15/19) surfacing on the picker.

### Defect B — the "flat grey band" is the card plate + a backdrop-filter on a transparent strip

The picker's own `background` is `none` (the underline variant zeroes it). The grey band the user sees is (1) the `story-hero-card` plate (`oklab(0.498 … / 0.504)` — a mid-grey at 50% α) reading over the dark grid, PLUS (2) the picker carries `backdrop-filter: blur(1px) saturate(1.05)` (the `--glass-blur-wash` W19 value) even though it paints no surface — so it washes the grid behind it into an undifferentiated rectangle with no frame, no rounding, no edge. A transparent strip with a backdrop-filter but no surface is the worst of both: it dims the background without ever reading as a control.

## The DESIGN diagnosis (why the user is right beyond the bug)

Even with Defect A fixed, the underline strip is the wrong register for THIS surface:

1. **Twelve equal-width text labels with a hairline underline is a weak, low-affordance control** for a primary IA over a busy GL/grid substrate — it reads as running text, not a pickable rack. The user's instinct ("another dock") is correct: this is a *rack of selectable chips*, the same gestalt as the macOS dock / the DockRail chip register the house already owns.
2. **The underline variant is panel-nav semantics applied to what is really a gallery selector.** The families don't reveal separate "panels" in the tablist sense; each selects a content set in one region. It functions as a segmented selector, and the underline's single-hairline affordance is the thinnest possible signal — exactly the register that collapses on dark.
3. **It does not scroll or fan** — at 12 fixed labels it's a static strip; on narrow widths it only collapses to a `<Select>` (the `:responsive` 768px breakpoint). There's no in-house "scrolling rack" read the user is asking for.

## The three alternatives assessed

- **(a) Dock-like floating chip strip (DockRail chip register).** Each family a glass chip in a rack, the selected chip the iOS luminance-lift "selected reads as glass" tier (`--dock-control-active-bg` = `var(--glass-bg-floating)`, a tier ABOVE the hover fill), the glyph/label staying warm-ink `--foreground`, NOT a saturated hue (the W-REGISTER-IOS de-RED'd register). This gives a real silhouette per item, a forward-of-track selected read that survives dark, and the macOS-dock gestalt the user named — WITHOUT the contrast-color inversion (the selected register is a glass-tier surface lift, not a fragile fg/muted-fg luminance delta).
- **(b) Fading-scroll strip (coordinate with lane fading-scroll, R8-08).** SegmentedTabs ALREADY ships `overflow="scroll"` → a flex row with intrinsic-width tracks + `scroll-fade-mask` edge fades that never clips (`segmented-tabs.css:264-271`). This is the in-house fading-scroll seam. Good for the *overflow* problem, but it does NOT fix the flat-on-dark register (the underline chrome is unchanged) and 12 short labels don't overflow at desktop width, so the scroll affordance is dormant — it solves a problem this strip doesn't have while leaving the one it does.
- **(c) Refined underline + glass register.** Drop the dead `backdrop-filter` on the transparent strip, give the active tab the BRIGHT register (active = `--foreground`, inactive = a genuinely dimmer muted that the card's contrast-color refinement lifts in LOCKSTEP so active still dominates), thicken/brighten the underline. Cheapest, but it keeps the weak underline gestalt the user explicitly rejected ("should be a better scrolling item") — it fixes legibility without answering the design ask.

## Recommendation — (a) the dock-like glass chip rack, with (b) folded in as the overflow behavior

Re-conceive the family picker as a **horizontal glass chip rack** in the iOS-selected-reads-as-glass register (the DockRail/`--dock-control-active-bg` model the house already owns and gates), NOT a parallel new component:

- Each family is a glass chip; the **selected** chip lifts to the `var(--glass-bg-floating)` tier (forward of the track), hover lifts to `var(--glass-bg-resting)` — the same three-leg glass register the dock controls use, so "which is active" reads as a real surface, immune to the fg/muted-fg contrast-color inversion (Defect A) because the active signal is a *plate*, not a luminance delta.
- The rack is a flex row with the EXISTING `overflow="scroll"` + `scroll-fade-mask` edge-fade (alternative (b) folded in) so it degrades to a true scrolling rack on narrow widths — keep the `:responsive` `<Select>` only as the extreme-narrow floor. Coordinate the edge-fade with the **fading-scroll lane (R8-08)**: if that lane abstracts a library `<FadingScroll>` (h+v), the rack composes it rather than re-rolling the mask.
- Kill the dead `backdrop-filter` on the transparent strip (Defect B) — the chip surfaces carry the glass, not the empty container.
- Preserve all 12 families as the IA (the W-MOTION2 isomorphism) — this is presentation only.

Rationale for (a) over (b)/(c): the user named "another dock," the defect is fundamentally a *which-item-is-selected* read that a glass-tier selected-plate solves structurally (no contrast-color luminance race), and the house already owns the exact register (DockRail / `--dock-control-active-bg` / `proof:register-ios`) — so this is composition of an existing idiom, not a new substrate (visual-load-bearing / no-new-component discipline). (b) alone leaves the dark register flat; (c) keeps the rejected underline gestalt.

### Cross-lane coordination

- **fading-scroll (R8-08):** the rack's edge-fade should consume that lane's `<FadingScroll>` abstraction if it lands; otherwise the SegmentedTabs `overflow="scroll"` mask. Do not mint a second edge-fade mechanism.
- **dark-register cluster (R8-11/12/13/15/19):** Defect A (the `contrast-color()` muted→white inside a glass card lifting muted ABOVE the un-lifted active `--foreground`) is almost certainly NOT unique to this strip — any `--muted-foreground` consumer paired with a `--foreground` active state inside a `story-hero-card` inverts the same way. Flag for the synthesis as a candidate systemic adaptive-glass finding, not a curve-picker one-off.
- **glass-blur-cal (R8-19):** the dead `blur(1px) saturate(1.05)` on the transparent picker is one instance of the global blur over-application; folding the rack onto real glass chips removes this orphan blur as a side effect.
