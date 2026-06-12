# BA fleet lane — toast-glass

Lane scope: R8-12 + R8-13b — the Toast/Toaster + Notification surfaces paint as
opaque slabs (the flat dark toast, the flat green deploy notification), against the
glass-first canon (AX.W54: glass is the DEFAULT register for EVERY band). Root-cause
to file:line, explain the gate blind-spot, propose the glass+veil+tone anatomy.

Evidence: ground captures `ground/R8-12-toasts-not-glassy.png` (the dark opaque toast
pair) + `ground/R8-13-not-glassy-b.png` (the flat green Notification). Live π readback
(synthetic computed-style probe on :5199, dark) + the `/feedback/toast` live capture at
`fleet/toast-glass-tone-slabs-dark.png` (the Destructive trigger reads as a solid red
slab — the same opaque-tone class in a sibling host).

---

## The mechanical root-cause

### F-1 (S1) — the Toast TONE variants paint a SOLID opaque token plate that defeats the glass substrate

`src/components/ui/toast/Toast.vue:55-62`. The base class string composes
`glass-floating` (the shared overlay-band glass tier — correct), but the variant map
then layers a SOLID token background ON TOP:

```
'bg-destructive text-destructive-foreground border-destructive': variant === 'destructive',
'bg-success     text-success-foreground     border-success':     variant === 'success',
'bg-warning     text-warning-foreground     border-warning':     variant === 'warning',
'bg-info        text-info-foreground        border-info':        variant === 'info',
```

`--success`/`--warning`/`--info`/`--destructive` are COMPLETE, FULLY-OPAQUE colors
(`tokens/color-radius.css:246-248` + `tokens/dark-arm.css:108-110` — e.g. dark
`--success: oklch(0.805 0.186 151.6)`, no alpha channel). The π readback proves the
override is total:

| variant | computed `background-color` (dark) | `backdrop-filter` |
|---|---|---|
| `default`     | `oklab(0.373 … / 0.904)` (the floating rung — translucent, but α 0.904) | `blur(16px) saturate(1.18)` |
| `success`     | `oklch(0.805 0.186 151.6)` — **100% opaque** | `blur(16px)` (present, pointless) |
| `warning`     | `oklch(0.809 0.15 76.6)` — **100% opaque** | `blur(16px)` (pointless) |
| `info`        | `oklch(0.713 0.138 259.5)` — **100% opaque** | `blur(16px)` (pointless) |
| `destructive` | `rgb(235, 71, 71)` — **100% opaque** | `blur(16px)` (pointless) |

The `backdrop-filter` track is still attached on every tone, but it is INERT — a fully
opaque plate has nothing behind it to blur. The tone is a solid color slab. This is the
direct cause of R8-13b (the flat green deploy slab) and the colored-slab reads.

### F-2 (S2) — even the DEFAULT (glass-routed) toast reads near-opaque in DARK mode

`src/styles/glass/ladder.css:83-102` + `src/styles/tokens/dark-arm.css`. The floating
rung's opacity recipe resolves (dark): `--glass-bg-floating = color-mix(in srgb,
hsl(24 8% 10%) calc((1-(1-0.88)*1)*100%), transparent)` → **α 0.88** (the π readback
shows the rendered toast at α 0.904 with rounding). At 88% opacity over a near-black
demo backdrop, the floating glass plate has almost nothing showing through — the blur
is real but imperceptible, so the surface reads as a flat dark slab. This is R8-12 (the
two opaque dark toasts). The floating tier is the heaviest non-overlay rung (chosen so
modal chrome stays legible over a busy page) — but a toast floats over arbitrary,
frequently DARK app content, and at α 0.88 dark it loses all glassiness. The legibility
ladder's `--glass-tint-*` adaptive seam targets BRIGHT backdrops; there is no
DARK-backdrop register that pulls the floating toast plate translucent enough to read as
glass over dark content.

### F-3 (S1) — the Notification tones are an OFF-MODEL parallel slab path

`src/components/ui/notification/Notification.vue:57-62`. The per-type class map paints
`bg-success/90` / `bg-destructive/90` / `bg-warning/90` / `bg-info/90` over the
`glass-floating` base (line 10). The `/90` knocks the token to 90% opacity — still a
flat tone slab (π readback: `notif_success` → `oklab(0.805 … / 0.9)`). This is the SAME
opaque-tone defect as F-1 but via a SEPARATE, hand-rolled per-type map (a literal Tailwind
color shorthand `bg-emerald-500`/`bg-amber-500` swatch in the demo `notification.vue:48-53`,
and the `--success`-family tones in the component). It is the flat green slab in R8-13b.
The Notification has NO `variant`/`tone` type contract that routes through the glass model
— it is a standalone `<div>`-list with a baked tone map, not on the Toast tone seam.

### F-4 (S3) — the destructive token is the lone hsl/legacy tone; tones aren't a unified ramp

The four tone families are declared in two places with mixed color spaces
(`destructive` is `hsl(...)`/`rgb(...)`, the success/warning/info trio is `oklch(...)`),
and consumed as raw solid plates. There is no single "feedback-tone glass tint" knob —
each surface re-derives the tone independently (Toast variant map, Notification type map,
demo swatch map), so a tone calibration has to be made in 3+ places. This is the
substitution-vs-re-declaration anti-pattern CLAUDE.md warns about, surfacing on the
feedback band.

---

## Why proof:glass-cohesion did not catch them

`scripts/proof-glass-cohesion.mjs` IS inventory-complete and DOES enumerate Toast +
Notification as glass surfaces (both match the `GLASS_MARKER` via `glass-floating`). But
its forbidden-set has a tone-shaped hole:

1. **The `RAW_OPAQUE_SURFACE` bite only matches the NEUTRAL plates** (`scripts/proof-glass-cohesion.mjs:72-73`):
   `/background(-color)?:\s*var\(--(background|card)\)\s*;/`. It looks for a CSS
   `background: var(--background|--card)` rule body — the Drawer/Slider D1/D2 class. It
   does NOT match the Tailwind utility classes `bg-success`/`bg-warning`/`bg-info`/
   `bg-destructive` (those compile to `background-color: var(--success)` etc. — a DIFFERENT
   token, and emitted from the compiled CSS, not the SFC source the gate strips+greps).

2. **The gate EXPLICITLY exempts Tailwind class-variant escapes** (`scripts/proof-glass-cohesion.mjs:70-71`):
   "Tailwind class-variant escapes (the `solid`/`outline` Button variants, a translucent
   `bg-card/40` preset chip) are NOT in this set — the bite is the DEFINITION-level opaque
   plate". The toast TONE is exactly such a class-variant — and it is an OPAQUE one, not a
   translucent `bg-card/40`. The exemption was written for legitimate translucent escapes;
   the opaque-tone case slipped through the same door.

3. **The Notification arm only checks tier + shadow** (`scripts/proof-glass-cohesion.mjs:239-250`):
   `notification-floating-tier` asserts it composes `glass-floating`; `notification-no-off-ladder-shadow`
   asserts no `shadow-elevated`. NEITHER asserts the per-type TONE plate is translucent.
   The gate greens on `bg-success/90` because the base IS `glass-floating` and the shadow
   is on-ladder — the opaque tone overlay is invisible to it.

4. **No opacity/translucency assertion at all.** The gate proves a surface ROUTES a
   `--glass-*` tier marker; it never asserts the FINAL composited `background-color` is
   translucent (alpha < ~0.92). A glass-routed base + an opaque tone overlay passes every
   check while painting a solid slab. The π spec `tests-visual/glass-cohesion.spec.ts`
   reads Drawer/Slider/Notification DEFAULT but does not exercise the TONE variants over a
   busy backdrop — so the render-side arm misses them too.

Net: the gate locks the BASE onto the model but has no teeth on the opaque-tone OVERLAY,
and no final-alpha assertion. The tone slabs are a structural blind-spot, not a regression.

---

## Proposed anatomy (gestalt direction — no implementation)

The house ALREADY ships the right primitive: `veil-surface` (`src/styles/cards.css:78-101`)
— a borderless, rimless glass plate that routes its material through the `--glass-*`
ladder (`--veil-bg` = the quiet-rung adaptive-tint mix, `--veil-blur` = `--glass-blur-quiet`)
with three overridable `--veil-*` deltas. `<Card surface="veil">` consumes it. The feedback
band should adopt the SAME "glass material + a thin tinted tone wash, never a solid slab"
model the rest of the library already speaks.

**A. The tone is a TINT on the glass, not a replacement OF the glass.** Reframe the four
tones as a translucent `color-mix(in oklab, <glass rung bg>, var(--<tone>) <tone-strength>)`
over the floating/overlay rung — the EXACT recipe the `--glass-tint-source`/`--glass-tint-strength`
seam already runs for the bright-backdrop legibility lift, and the `--veil-bg` mix. The
glass blur + translucency survive; the tone reads as a colored GLASS, not a colored slab.
ONE `--feedback-tone-strength` knob (a bounded mix %, ≈12-22%) tints all four tones at once;
the glyph + a hairline tone-keyed border/under-rim carry the SEMANTIC weight (the colored
icon + tinted edge), not a full-bleed fill. This is the iOS/Material "tinted glass toast"
register and the one-color-event rule (AZ.W-SUFFUSE) applied: ONE tone event per toast (a
tinted glass wash + full-chroma glyph), not a saturated full-fill.

**B. Mint the tone register ONCE, consume everywhere.** Define a single feedback-tone
anatomy (the `{glass, veil, tone}` axes) on the Toast surface, then have Notification
CONSUME the same seam rather than its parallel hand-rolled `bg-<tone>/90` map. Collapse
the three independent tone maps (Toast variant, Notification type, demo swatch) onto ONE
source — the substitution-over-re-declaration discipline. Notification gains the `tone`/
`variant` type contract it currently lacks (or is folded onto the Toast surface as its
non-portal sibling).

**C. Resolve the dark-backdrop near-opacity (F-2).** The feedback surfaces float over
arbitrary, often-dark content, so the floating rung's α 0.88-dark is too heavy to read as
glass. Direction: give the feedback band a translucency register tuned for floating-over-
arbitrary (a `--feedback-glass-level` < 1, or routing the toast plate to a lighter rung +
the tone tint for legibility) so the DEFAULT toast reads as glass on a dark page — without
touching the modal-chrome floating rung the rest of the band relies on. This is the
DARK-backdrop twin of the W55 bright-backdrop adaptive seam, which is currently bright-only.

**D. The veil/feather option for legibility over busy backdrops.** Expose the `veil-surface`
`--veil-feather` radial-mask axis on the feedback band so a toast over a busy aurora/blob
backdrop can feather its plate edges — the text-legibility plate the house already ships,
now reachable on the floating feedback surfaces.

**E. Close the gate hole.** The remedy must come with a teeth-bearing assertion: a
FINAL-COMPOSITED-ALPHA check (the painted `background-color` of every feedback tone resolves
translucent, α < ~0.92) on the render-side π arm, exercising ALL tone variants over a busy
backdrop — so an opaque-tone overlay reds the gate the way an opaque BASE already does.
The source arm's tone-class blind-spot (`bg-<tone>` opaque utilities) is closed by reading
the COMPILED tone color, not just the SFC source.

This is a feedback-band wave: ONE tone-tint anatomy minted on Toast, consumed by
Notification, a dark-backdrop translucency register, the veil/feather option, and the
gate's final-alpha teeth — all on the existing `--glass-*`/`--veil-*`/tint seams, zero new
compositing path.
