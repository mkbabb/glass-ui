# BA fleet lane — fd-foundations-substrates

FRONTEND-DESIGN AUDIT, panes 1/4: the **Foundations** (13 stories) + **Substrates**
(6 stories) categories, both modes, desktop (1440×900) + mobile (390×844). Live-probed
on :5199 at master HEAD (v3.13.0). Evidence pngs in
`docs/tranches/BA/audit/fleet/evidence-fd-foundations/`.

Judged at the frontend-design bar: distinctive · intentional · no generic slop.
Typography hierarchy, spatial composition, color intentionality, motion moments,
background atmosphere, wow factor.

---

## Tooling note (a real DEFECT surfaced, not a probe artefact)

The demo shell **auto-navigates the route away from any landed page within ~0.5-1s of
load** — repeatedly drifting to /dock/overview, /motion/curve-gallery, /navigation/tabs,
/data/table, /containers/dialog. Root cause: the SidebarDock/BottomDock `railContext`
writable-computed (`demo/layout/SidebarDock.vue:114-130`, `BottomDock.vue:79-94`) is bound
to a `DockRail`/facet-chip `v-model:context`; on a page whose current story is NOT inside
the active facet, the `get` falls back to `contextLayers.value[0]` and the chip control
echoes that back through `set`, firing `router.push('/<cat>/<first-story>')`. This makes the
storybook **unable to hold a page** — a severe UX defect a real visitor hits the instant they
stop interacting. It is a SHELL/dock-lane concern (out of my lane's ownership) but it is
load-bearing: I had to inject a `history.pushState` route-freeze to capture any page.
Flagging it here because it degrades EVERY page in the demo. (Cross-references R8-1/R8-9
dock-rail findings.)

---

## The cross-cutting headline: the DARK register is structurally broken for token/material demos

The R8 audit flagged the dark register as a flat, near-black, glass-invisible weakness
(R8-11/12/13/15/19). My sweep confirms it is the dominant cross-cutting failure of this
lane, and it is **mechanical, not cosmetic**: the demo's foundation/substrate stories
demonstrate their tokens as they are USED in production (a 2px tint border, a same-tone
swatch fill, a `bg-card` showcase frame), and in dark mode `--card`/`--background`/
`--muted` all resolve to near-black `rgb(17,15,14)`, so every "show the token" surface
collapses into the plate behind it. The pages convey their INFORMATION via labels but
demonstrate ZERO of the visual the token names.

Worst-affected (dark): surface-tints, overlays-scrims, paper-backdrop-texture-system,
shadows, glass-material, colors (core swatches). Reference-quality (works in dark BECAUSE it
puts the sample over a vivid field): glass-panel, constellation, icons-POPS, chart-chassis.

The single best diagnostic is glass-panel vs glass-material — same library, same glass
tiers, one demos them over a teal gradient strip (reads perfectly) and one over a `bg-card`
black box (reads as nothing). The fix is a demo-chassis pattern, not a token edit.

---

## FOUNDATIONS — per-page verdicts

**intro** (aurora bg, hero) — STRONG. `intro-light-full.png`, `intro-dark-vp.png`,
`intro-mobile-dark.png`. The rose-indigo-amber aurora + `text-display` "Glass, paper, and
the golden ratio." is the model hero; works in both modes + mobile. Top 3 lifts: (1) body
copy is muted gray over the busy aurora — lift contrast / add a faint scrim under the text
column; (2) the bottom dock occludes the last copy lines + the Tokens/Type/Material pills;
(3) the redundant pill cluster (see substrates note).

**colors** — MIXED → dark-degraded. `colors-dark.png`, `colors-mobile-dark.png`. The 13-stop
RAINBOW + VIZ-BASIS cards are gorgeous (the colorful pops the user celebrates). But the CORE
swatches (background/muted/popover/secondary/accent/card) are near-black-on-near-black in
dark — indistinguishable. Lifts: (1) give the dark core swatches a hairline rim or a
checkerboard backing so each reads as a distinct value; (2) the swatch→label dead-space is
wide — tighten; (3) tonal monotony of the core block undersells a palette page.

**typography** — STRONG. `typography-dark.png`. The √φ display ladder ("Golden / Audacious /
Ornament") is the most audacious, intentional page in the lane; hairline row dividers clean.
Lift: the container is a flat dark plate (no atmosphere); the dock overlaps the lower rungs.

**radii** — WEAK (information-only). `radii-dark2.png`. Every swatch is the same near-black
tile; the page is a wall of identical dark squares whose only signal is the corner radius
silhouette (barely visible in dark). Reads flat and uninteresting. Lifts: (1) fill swatches
with a tint/gradient so the rounding reads against a contrasting edge; (2) the layout is
sparse — a vast page for 7+7 tiny tiles.

**shadows** — BROKEN IN DARK. `shadows-dark.png` vs `shadows-light.png`. In LIGHT the
XS→2XL elevation + cartoon/modal/soft variants read clearly (white cards, soft shadows). In
DARK the cards are near-black on a dark plate and the foreground-tinted shadows are
imperceptible — every elevation looks identical, the cartoon offset stamp vanishes. The
entire teaching purpose fails in dark. Lift: the shadow swatches need a lighter card body +
a contrasting plate in dark so the cast reads (or invert to a light "stage" tile in dark).

**motion** (constellation bg) — adequate but static. `motion-dark2.png` (captured before
freeze; content correct). Easing doctrine table + transition demos read; the constellation
bg is a nice touch. Static screenshots can't show the spring curves — the page's value is
motion, undersold at rest. Lift: stronger at-rest visual hook for the curve gallery.

**paper-glass** (paper bg, hero) — dark-degraded. `paper-glass-dark.png`. "Paper & Glass"
hero is good; the 5 glass-tier cards are very subtly differentiated dark plates (the
glass-ness doesn't show with a flat dark backdrop behind them). The "GLASS TIERS OVER
COLOUR — against something" section is the RIGHT idea (glass over a colored field). Lift:
the paper grain is invisible in dark; the top tier-ladder owes a vivid backing like its own
lower section.

**icons** — REFERENCE / BEST. `icons-dark2.png`. The Lucide grid is clean+monochrome (correct
per one-color-event), and the POPS row (13-stop `color-mix(…25%,transparent)` backplate under
full-chroma glyphs) is exactly the colorful-pops idiom the user wants MORE of. This is the
model to propagate.

**surface-tints** — BROKEN IN BOTH MODES (worst page). `surface-tints-dark.png`,
`surface-tints-light.png`. The 9-rung tint scale renders as EMPTY bordered boxes — zero
visible gradation, "lightest"→"strongest" conveys nothing. Root cause:
`demo/stories/foundations/surface-tints.vue:11-19` demos each tint only as a 2px
`border-[var(--surface-tint-N)]` on a `bg-card` fill (`sample-class="…border-2 bg-card"`) —
a translucent `color-mix(…transparent)` hairline over a same-tone plate is imperceptible.
The page documents a saturation curve it never shows. Plus the layout is one-rung-per-
full-width-row with huge swatch→label dead-space — wasteful + low-density.

**overlays-scrims** — BROKEN IN DARK (same class). `overlays-scrims-dark.png`. The three
scrim-weight swatches are invisible empty boxes; the motion/lift offsets render as identical
bare dots. A token-tour page that demonstrates NOTHING visually — all labels, no swatch
signal. Same TokenLadder/ToneSwatch root cause + same wasteful row layout.

**chart-chassis-palette** — WORKS. `chart-chassis-dark.png`. The chart aliases (blue/red/
amber/purple for ping/download/upload/jitter) are vivid and read in dark BECAUSE they're
OPAQUE saturated fills — the proof that the swatch infra CAN render color; the broken pages
just use translucent tints/same-tone fills. Lift: still has the swatch→label dead-space.

**paper-backdrop-texture-system** — BROKEN IN DARK. `paper-backdrop-dark.png`. "clean" vs
"aged" turbulence panels look IDENTICAL (texture invisible on dark), and the WARM/COOL/BONE
underpaint cards are indistinguishable near-black plates — the entire warm-vs-cool-vs-bone
demonstration conveys nothing. Paper texture is inherently a cream-substrate feature; demoing
it on a flat dark plate strips all signal.

**css-utilities** — WORKS. `css-utilities-dark.png`. The 4 colored chips deliver pops; the
scale-override cards (1.04→1.25 SUBTLE→AUDACIOUS) read. Value is interactive (hover-scale),
so static reads as boxes-with-numbers — acceptable.

---

## SUBSTRATES — per-page verdicts

**aurora** (aurora bg, hero, studio) — HIGH-VALUE, PARTLY BROKEN. `aurora-dark-vp.png`. The
PRESETS strip (Sky/Dawn/Meadow/Deliberate/Day 9/Oil Impasto) is gorgeous, vivid, painterly —
peak wow. BUT (a) the LIVE field (Sky preset) is a pale washed-out blue, far less interesting
than its own thumbnail — the live hero undersells the presets above it; (b) R8-4 confirmed —
the "DERIVE FROM COLOR" chip row clips TRIAD/TETRAD at the card edge, studio sections run
together with weak hierarchy; (c) the redundant Fields/Creatures pills (top-left float +
bottom dock). [studio configurator defects = configurator lane]

**blob** (paper bg, hero, studio) — STUDIO BROKEN. `blob-dark-vp.png`, `blob-dark-scrolled.png`.
The amber lit GooBlob droplet + the WatercolorDot 4-color register read well. BUT R8-7
confirmed: the Interaction rows (Attraction/Click impulse/Responsiveness) render LABELS WITH
NO VISIBLE SLIDERS; the satellite/blobbing-merge feature is not demonstrated (single droplet,
no satellites); the mood preset row clips "Shy" (R8-8). The stage is a vast empty dark void
with the creature shoved behind the dock — poor composition. [studio = configurator lane;
stage composition is mine]

**constellation** (constellation bg, hero) — REFERENCE / BEST IN LANE. `constellation-dark-vp.png`,
`constellation-mobile-dark.png`. The page-level drifting star lattice + `--primary` ringed
focal node + bold hero + contained stage is exactly R8-15's ask (interesting procedural bg,
subtle, in-idiom). Dark SUITS it. Holds on mobile. The propagation model for "every page
gets a background." Only nit: the redundant Fields/Creatures pills.

**fourier-field** (fourier bg, hero) — UNDERWHELMING (R8-10). `fourier-dark-vp.png`. "Fourier
Field" hero good; the two preset stages render the epicycle reconstruction, but SPARSE vs the
~/Programming/fourier-analysis web reference — 2-3 faint epicycle circles + one thin red
thread on the left, a bare comet trail on the right. No configurator, no harmonic-count /
epicycle options, no dense summed-harmonics register. Reads as two thin line-drawings, not
the beautiful procedural Fourier animation the user references. Direct R8-10 confirmation.

**glass-material** (aurora bg, hero) — THE R8-11 PAGE, dark-broken. `glass-material-dark-vp.png`
vs `glass-material-light-vp.png`. The page HAS the aurora behind it (good), but the glass
rungs (glass-wash…overlay + glass-card) sit inside a `ShowcaseFrame pad="lg"` whose default
is opaque `bg-card` (`demo/stories/ShowcaseFrame.vue:53-54`) — in dark that is the near-black
inner box the user calls "pointless," and it BLOCKS the page aurora from reaching the glass,
so there is nothing for the glass to refract/blur. In LIGHT the frame is a light plate and it
reads acceptably (still subtle). The header blurb is also low-contrast gray over the aurora.

**glass-panel** — REFERENCE (the correct glass demo). `glass-panel-dark-vp.png`. The 5-rung
ladder is placed over a vivid teal/cream gradient strip, so the translucency progression
(wash transparent → overlay opaque) is plainly VISIBLE in dark. This is precisely what
glass-material should do. The contrast between these two pages IS the R8-11 root-cause proof.

---

## The gestalt remedies (DIRECTION only — seeds for wave specs)

1. **A dark-legible material-demo chassis.** Surface-tints, overlays-scrims, shadows,
   paper-backdrop, glass-material, colors-core all fail because they demo a token over a
   same-tone/opaque plate. Mint ONE demo primitive that backs every token/material swatch
   with a CONTRASTING reference field (checkerboard for translucency, a vivid gradient or the
   page's own procedural field for glass, a light "stage" tile in dark for shadows). glass-panel
   + icons-POPS + chart-chassis already prove the pattern — generalize it; retire the
   border-only / bare-dot / `bg-card`-frame swatch idioms.

2. **Backgrounds everywhere (R8-15), constellation as the model.** The token pages (radii,
   shadows, surface-tints, overlays-scrims) are flat dark voids. Give each core page a subtle
   procedural background (paper-grid, a different aurora, a constellation, a fourier field)
   within the one-GL-context budget — constellation/intro are the in-idiom proof.

3. **Live-hero parity + density.** The aurora live field must be as vivid as its own preset
   thumbnails (the live Sky is anemic); the fourier-field needs the dense epicycle/summed-
   harmonics register + a configurator (R8-10); the blob stage needs the satellite-merge
   demonstrated and the creature centered, not voided behind the dock.

4. **Spatial discipline on token tours.** Kill the one-rung-per-full-width-row dead-space on
   surface-tints/overlays-scrims/chart-chassis (huge swatch→label gaps); a tighter grid reads
   denser + more intentional. And resolve the bottom-dock occluding page content/pills on
   nearly every page.
