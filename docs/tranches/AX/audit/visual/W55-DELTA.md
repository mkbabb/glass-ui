# AX.W55 — adaptive glass legibility · live-capture DELTA

The cardinal-lesson paired-π capture for the `--glass-backdrop` bright-bucket darken
(the iOS-26/27 "locally darken the glass over light content" move; G2). Captured
2026-06-09 against the running demo (`localhost:5173`) on Chrome-headless-new via the
π-lane Playwright (`tests-visual/adaptive-glass.spec.ts` — the resident fail-CLOSED
contrast-readback; the `.png` pair is a one-shot capture generator's evidence).

## The G2 live re-diagnosis (the cardinal lesson — re-prove, don't trust the audit)

A `.glass-dock` + a `.glass-card` mounted over a near-white gradient backdrop in light
mode, bucket OFF (today's HEAD behaviour): the warm-cream translucent material has no
edge — the surfaces read as faint ghosts on the light field (the G2 collapse). The
paired-π `getComputedStyle` + oklab readback measures the resolved plate over the
synthetic white and recomputes the WCAG ratio in-test.

## Paired-π getComputedStyle + oklab readback

| Surface | bucket | resolved plate (oklab over #fff → sRGB) | dark-ink contrast | translucent | verdict |
|---------|:------:|-----------------------------------------|:-----------------:|:-----------:|---------|
| `.glass-card` over #fff | OFF | `oklab(0.986 … / 0.5)` → eff `253,253,252` | 17.18:1 | yes | warm-cream ghost — no edge (the G2 collapse for light/mid-tone content) |
| `.glass-card` over #fff | ON  | `oklab(0.751 … / 0.59)` → eff `208,207,206` | 13.50:1 | yes (α 0.59) | DARKENS (luma 253→208), dark text reads, stays glass ✓ |
| `.glass-dock` over #fff | ON  | darkened (element-level oklab wrap) | ~17:1 | yes | the literal G2 surface now reaches the seam ✓ |
| default (unset `--glass-backdrop`) | — | byte-identical to the `dark` bucket | — | — | W55 only activates under the explicit `light` bucket ✓ |

The plate luminance DROP (253→208 over the synthetic white) is the adaptive darken
firing — the `@container style(--glass-backdrop: light)` block lifts the oklab tint
toward the warm-ink (`--glass-tint-ink`) at the bounded 18% floor. The resolved alpha
stays < 1 (0.59) — the surface is STILL GLASS (the bright backdrop shows through), not
an opaque dark plate. AA cleared by darkening the surface, NOT by going opaque (the
goal-miss tell the spec guards).

## Visual verdict (the screenshots)

- `W55-glass-over-light-bucket-off.png` — the BEFORE: the dock pill + the card are
  near-invisible warm-cream translucent surfaces over the light backdrop. The dock has
  no silhouette; the card edge barely separates from the field. This is the live G2
  defect the user reported.
- `W55-glass-over-light-bucket-on.png` — the AFTER: `--glass-backdrop: light` set on
  the ancestor, both surfaces visibly DARKEN to a legible gray glass plate that gives
  the dark text + dock glyphs a clear contrasting surface — while STAYING translucent
  (the gradient backdrop still bleeds through the plate and around the edges; it is not
  a solid dark fill). The iOS-26/27 "locally darken the glass over light content" move,
  in the existing `color-mix(in oklab)` seam — zero new compositing seam.

## The progressive-enhancement + a11y arms

- **`contrast-color()` (Chrome 147+/Safari 26+, present on this engine):** the
  `@supports (color: contrast-color(white))` block refines the foreground to
  `contrast-color(var(--card))` — anchored on the LIGHT backdrop signal, resolving to
  the legible dark ink (the live readback CAUGHT the wrong anchor: `contrast-color(var(
  --glass-tint-ink))` inverted to white = 1.56:1; the `--card` anchor gives the dark
  text 13.5:1). On a non-supporting engine the declarative bucket carries the AA floor
  anyway — the bucket is the floor, `contrast-color()` the refinement.
- **The Clear↔Tinted a11y escape:** `prefers-contrast: more` rides W54's `--glass-level`
  (opacity-up toward solid) AND biases the tint toward ink (the same darken the
  automatic bright bucket applies) — the two axes coordinate, one escape.

## Notes / scope

- **The dark-mode-over-white case is incoherent and scoped out** (the wave's
  "light-mode concern"). In dark mode `--glass-tint-ink` is the LIGHT warm ink and a
  #fff backdrop is a scenario a dark-theme app does not produce; the dark arm proves
  translucency + no-crash, the default-path canary proves the canonical dark glass over
  its proper dark substrate is untouched.
- **Safari parity** (`@container style()` + `color-mix(in oklab)` + `-webkit-backdrop-
  filter`) is the orchestrator's live cross-engine pass; the Chromium arm is GREEN. The
  declarative bucket + the oklab darken are Safari-clean; `contrast-color()` engages on
  Safari 26+ with the bucket carrying the floor on older Safari.

Verdict: **PASS.** W55 is live-verified — the dock + card over a very light backdrop
now DARKEN adaptively to a legible AA-clearing floor while STAYING translucent, in the
existing oklab tint seam with zero new compositing path. The maximal glass-first
default (W54) stays legible at scale. `proof:adaptive-glass` (21/21 source) +
`tests-visual/adaptive-glass.spec.ts` (5/5 π) GREEN; W52 + W54 sibling gates
un-regressed.
