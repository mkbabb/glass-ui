# BA fleet lane: dark-register

The cross-cutting R8 cluster: the demo's DARK register reads flat, near-black, and
glass-invisible relative to the light register (R8-11 black-bg-hides-glass, R8-12
toasts-not-glassy, R8-13b notification-not-glassy, R8-15 every-page-needs-a-background,
R8-16 awful-scrolling-item, R8-19 glass-blur-too-much). This lane diagnoses WHY dark loses
the glass and proposes the gestalt dark-register direction — not per-page patches.

Live-probed on :5199, both modes, computed-style readback + composited-luminance math.
Evidence pngs beside this file. Token source root-caused to file:line.

---

## The mechanical root cause (one number kills it)

In dark mode the page surface and the card plate are BOTH near-black, separated by ~4 L
points, and every glass rung is `color-mix(--card, transparent)` at increasing α. So all
five rungs composite into a 7-RGB-point near-black band.

Measured live on :5199 (DARK, computed + composited over the page bg):

| token | value | resolved sRGB | rel-luma |
|---|---|---|---|
| `--neutral-0` (page) | `hsl(24 8% 6%)` | `rgb(17,15,14)` | **0.00493** |
| `--card` (plate base) | `hsl(24 8% 10%)` | `rgb(28,25,23)` | **0.01004** |

Each rung's `--glass-bg-*` = `--card` @ {0.38, 0.58, 0.72, 0.88, 0.96} composited over the
L6 page:

| rung | α | effective sRGB | effective luma |
|---|---|---|---|
| glass-wash | 0.38 | rgb(21,19,17) | 0.00662 |
| glass-quiet | 0.58 | rgb(23,21,19) | 0.00763 |
| glass-resting | 0.72 | rgb(25,22,20) | 0.00839 |
| glass-floating | 0.88 | rgb(27,24,22) | 0.00931 |
| glass-overlay | 0.96 | rgb(28,25,23) | 0.00979 |

**The entire five-rung ladder spans a relative-luminance band of 0.00317** (wash→overlay),
sitting on a page at 0.00493. Five tiers occupy a ~7-step RGB window of near-black — they
are mathematically and perceptually indistinguishable. This IS R8-11
(`ground/R8-11-black-bg-hides-glass.png`): the five labelled rungs read as one charcoal
slab. The only differentiation visible there is the faint box-shadow bloom on the floating/
overlay rungs.

Source of the collapse:
- page = `--neutral-0: hsl(24 8% 6%)` — `src/styles/tokens/dark-arm.css:32` (and the
  `light-dark()` arm `src/styles/tokens/light-dark.css:70`).
- plate = `--card: hsl(24 8% 10%)` — `dark-arm.css:51` / `light-dark.css:80`.
- the rung opacities lift only `~+0.08` over light — `dark-arm.css:160-164` — but that lift
  is meaningless when the BASE color (`--card`) and the PAGE are both near-black; opacity
  modulates between two near-identical near-blacks.
- the rung bg recipe itself: `src/styles/tokens/glass.css:127-131`
  (`--glass-bg-{wash..overlay}`), painted at `src/styles/glass/ladder.css:36-113`.

## Why the glass DISappears (the deeper structural truth)

Glass is a TRANSMISSIVE material: it reads as glass only when there is a luminance/chroma
DIFFERENCE behind it for the plate + blur to modulate. The dark register fails on BOTH
inputs:

1. **No backdrop luminance variation.** The page background is a flat near-black
   (`htmlBg: rgb(17,15,14)`, confirmed on `/feedback/alert`, `/substrates/glass-panel`,
   `/feedback/*`). `body`/`main` are transparent, so the html L6 shows through. A blur over a
   flat field produces a flat field — there is literally nothing for `backdrop-filter:
   blur()` to diffuse. The R8-19 "glass blur is too much" complaint and this lane are the
   SAME defect seen from two sides: when there's nothing behind the glass, the only thing the
   blur does is wash, and over near-black it just deadens.

2. **The plates are near-opaque near-black.** Even where a route DOES carry a rich
   background (the `/substrates/glass-material` aurora staging — see
   `dark-register-glass-material-DARK.png`), the rungs still read as opaque dark slabs: at
   α 0.72-0.96 over the page they OCCLUDE the aurora rather than TRANSMIT it. The glass
   doesn't refract the colour behind it; it covers it. So even the rich-background case loses
   the glass in dark.

The light register hides the problem rather than solving it: light `--card` and
light `--neutral-0` are the SAME cream `rgb(251,250,249)`, so glass-over-flat-page in light
ALSO has a 0.0 luma span (measured). Light reads "clean/neutral" and dark reads "dead" — but
the underlying flat-substrate failure is universal. What rescues light is (a) the cream is
bright enough that plate edges, hairline rims, and cartoon shadows still read, and (b) the
per-page aurora/grid backgrounds give the few decorated routes something to modulate. Dark
has neither margin: near-black eats the rims, the shadows (which are also near-black), AND
the un-backgrounded pages.

## The W55/AZ adaptive-glass machinery does NOT help dark — and slightly hurts

The `:where(.glass-floating, .glass-overlay, .glass-card, .glass-resting, .glass-quiet,
.glass-wash)` self-engage block (`src/styles/glass/ladder.css:185-196`) unconditionally
re-points `--glass-tint-source → --glass-tint-ink` at `--glass-tint-strength: 20%`. This was
designed for the LIGHT over-bright-backdrop case (darken the plate toward warm ink so text
clears AA over a white page). In DARK, `--glass-tint-ink` = `--foreground` =
`hsl(48 10% 90%)` (light cream), so the self-engage mixes the near-black plate 20% TOWARD
light cream. That is the wrong direction for a dark plate's silhouette (it slightly washes the
plate lighter, reducing the already-tiny contrast against the L6 page rather than carving the
plate out of the page). The mechanism is dark-mode-inert at best, mildly counterproductive at
worst — the adaptive axis has NO dark-substrate arm. The probe doc names the bucket as a
light-backdrop concern (`glass.css:233-239`), so dark was never in scope; this lane flags
that the dark register needs its OWN legibility/separation axis, not a reuse of the
light tint.

## Per-component dark consequences (the R8-12/13b corroboration)

- **Toast** (`src/components/ui/toast/Toast.vue:55`) DOES compose `glass-floating` for the
  default variant — correct intent. But in dark, `glass-floating` = `--card`@0.88 over
  near-black = an opaque dark slab (luma 0.0093). R8-12 (`ground/R8-12-toasts-not-glassy.png`)
  is the direct render: a glass-tier surface that cannot read as glass because the tier itself
  collapses to opaque-dark. NOT a toast bug — a dark-register bug surfacing on the toast.
- **Notification** (R8-13b, `ground/R8-13-not-glassy-b.png`) is a separate per-component
  variant-coverage gap (`bg-success` is a fully-opaque semantic fill, no glass at all) — that
  is the toast/notification census lane's finding, NOT mine; I note it only because the user
  read both as "not glassy" in the same dark frame.
- **Curve-gallery underline strip** (R8-16, `ground/R8-16-awful-scrolling-item.png`) reads as a
  flat grey band on near-black: the `--secondary`/`--neutral-2` (L16) inactive-tab fill over
  the L6 page has the same micro-contrast collapse — no glass depth, no separation.

## Most content pages have NO background at all

Only 22 of ~100+ story manifest rows declare a `background:` (counted in
`demo/stories/manifest.ts`): 7 grid, 4 constellation, 3 aurora, 3 paper, 1 fourier, 1 blob.
Every other route falls through to the flat html near-black in dark (e.g. `/feedback/alert`:
`htmlBg rgb(17,15,14)`, 0 canvas, no aurora/constellation/fourier/paper-grain element). This
is R8-15 live: "EVERY core page should have an interesting background… No blank or boring
black/white backgrounds." The StoryHero substrate system (`demo/stories/StoryHero.vue`) is
the right chassis, but it is opt-in per-row and under-applied; the default is dead black.

---

## The gestalt dark-register direction (the fix, not patches)

The dark register needs to STOP being "the light tokens with a near-black page" and BECOME a
deliberate luminous-dark material system. Four coordinated axes, all token-family edits at the
cascade root (`tokens/dark-arm.css` + `tokens/light-dark.css` dark arms + the glass-bg seam) —
NEVER per-page or per-component:

1. **Lift the dark plate OFF the dark page — widen the page↔plate luminance gap.** The L6 page
   / L10 card 4-point gap is the whole disease. The direction is a deeper, slightly-chromatic
   page floor (a true near-black with a hint of the warm-24 or a cool-blue cast for depth) and
   a CLEARLY lifted card/plate ladder (think the iOS-dark elevation model: each glass rung sits
   at a visibly higher L than the one below — an elevation ladder in luminance, not just in
   α). Target a perceptible ΔL between each rung (the light register survives on edges; dark
   must survive on luminance steps because near-black eats edges). This is the single
   highest-leverage edit: re-tune `--card` + the per-rung dark opacities so the composited rung
   band spans a REAL luminance range, not 0.003.

2. **Make the dark glass TRANSMISSIVE, not occlusive.** The dark rungs are too opaque to read
   as glass over a background. The direction is the iOS-dark "dark glass" model — a translucent
   dark plate with a genuine luminosity lift from the blur (`saturate`/`brightness` companions
   that LIFT the backdrop through the plate, the way real dark glass glows where light passes),
   plus a stronger rim/edge catch-light calibrated for dark (the current `--glass-edge-light-dark`
   at α 0.10 and `--glass-highlight` at 0.08 are below the reading threshold over near-black —
   they need to be the PRIMARY silhouette device in dark, since the fill barely separates).
   Net: in dark the EDGE and the TRANSMITTED glow carry the glass-ness; in light the fill +
   shadow carry it. Two registers, one design language.

3. **Give the dark register its own legibility/separation axis — do not reuse the W55 light
   tint.** The adaptive self-engage (`ladder.css:185-196`) is a light-backdrop darken; it is
   inert/wrong in dark. The direction is a parallel dark arm: over a dark page a glass plate
   should LIFT (toward a luminous translucent dark), the mirror of the light "darken over
   bright." Same `--glass-tint-*` seam, a dark-mode-aware `--glass-tint-ink`/strength that
   resolves to a LIFT in dark rather than a wash-toward-cream. This reconciles the dark arm into
   the EXISTING adaptive machinery (no third fork) while flipping its direction by mode.

4. **Every core page gets a dark-aware procedural background.** Promote the StoryHero substrate
   from opt-in-22-rows to a default: every route declares (or inherits a category default) one
   of aurora / constellation / fourier / grid / paper, and each of those substrates must have a
   real DARK arm (a dark aurora palette, a constellation that reads on the deep canvas — the
   `--constellation-*` dark arm at `dark-arm.css:136-155` already exists and is the model —, a
   dark blueprint-grid/paper-grain lifted to readable strength on the deep floor). This both
   satisfies R8-15 AND gives the dark glass something to transmit, closing axis 2's other half.
   Co-calibrate the R8-19 blur dial-back here: once there's a real background behind the glass,
   the blur reads correctly and the global `--glass-blur-*` reduction should be tuned against a
   REAL backdrop, not the current flat-field-over-deadens situation.

The acceptance bar (binding-truth direction): a dark-mode π readback of the composited rung
luminance band must span a perceptible range (the current 0.003 → a real ΔL ladder), and the
glass-material story in dark must show the five rungs as five DISTINCT elevations that each let
the aurora behind them read through — the mirror of the light register's richness, not a
near-black collapse.

---

## Evidence files (beside this report)

- `dark-register-glass-material-DARK.png` — the rungs as flat dark slabs even over a rich
  aurora staging (occlusion, not transmission).
- `dark-register-glass-material-LIGHT.png` — light register for contrast.
- `ground/R8-11-black-bg-hides-glass.png` — the five-rung ladder collapsing to one charcoal
  slab on near-black (the headline capture).
- `ground/R8-12-toasts-not-glassy.png`, `ground/R8-13-not-glassy-b.png`,
  `ground/R8-16-awful-scrolling-item.png` — the per-surface consequences.
