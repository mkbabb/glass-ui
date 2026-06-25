# Pass-E — substrates/goo-dot demo deep audit

- **Page**: `substrates/goo-dot`
- **Import**: `@mkbabb/glass-ui/goo-dot-matrix`
- **SFC**: `demo/stories/substrates/goo-dot.vue`
- **Live**: http://localhost:5173/substrates/goo-dot (verified on Chrome 5173)
- **Component**: `src/components/custom/goo-dot-matrix/` (GooDotMatrix.vue + constants.ts `GooDotConfig`)
- **Manifest row**: `demo/stories/manifest.ts:230` (subpath) + `:702-704` (blurb)

## Verdict at a glance

The page is a **thin, flat single-card demo** — the bottom tier of the substrates band alongside its
two clones `dot-flow-field.vue` and `dot-matrix.vue`. It is structurally a generation behind the
rich VizStudio siblings (`aurora`/`blob`/`concentric`/`fourier-field`/`paper-grid`). It exposes a
small fraction of `GooDotConfig`, composes ZERO glass-ui components beyond two bare `<Switch>` +
raw `<button>`s, demos the glass over a FLAT CREAM page (no live aurora field), uses ONE undersized
460px card, and ships a 1182-char blurb that triggers a live sticky-title overlap defect on scroll.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**No. It exposes ~30% of the API and none of the rich axes.** `GooDotConfig`
(`src/components/custom/goo-dot-matrix/constants.ts`) carries:

- `variant` — exposed (4 buttons) ✓
- `interactive` — exposed (switch) ✓
- `paused` (v-model) — exposed (switch) ✓
- `dotPixelSize` — **NOT exposed** (the headline "coarser/finer dots" knob)
- `dotMin` / `dotMax` — **NOT exposed** (the rim→core dot-size envelope — the literal "dense+big vs sparse+small" axis the blurb sells)
- `fieldFloor` — **NOT exposed**
- `dotBrightFloor` — **NOT exposed** (the "dim at the rim" axis)
- `cols` / `flowAmt` — **NOT exposed** (the Register-B lattice fan-out — the `dot-lattice` variant's defining axis paints with no control)
- `pointerMode` (`repel`|`attract`) — **NOT exposed** (a whole interaction direction hidden)
- `pointerRadius` — **NOT exposed**
- the entire nested `field: BlobConfig` (metaball geometry, satellites, smin membrane) — **NOT exposed**
- `palette` / `background` — only switched wholesale via the reference toggle, never tunable

The interaction story (field-lean / dot-swell / flick-bloom / repel↔attract) is the component's
showpiece and is reachable ONLY by a single boolean — the user cannot poke the `pointerMode` flip,
the `pointerRadius`, or fire a deterministic bloom. The `dot-lattice`/`dot-sphere` variants render
with their `cols`/`flowAmt` defining axes frozen, so two of the four registers demo at a single
arbitrary point. Compare `concentric.vue` (full ring-family count, base-wavelength, beat-detune,
axis-ratio sliders) and `blob.vue` (Attraction / Click-impulse / Responsiveness sliders + Mood
select + Seed + Poke + live status readout). This page is congruent with the COMPONENT NAME, not
the component's ABILITY.

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**No — it is the thinnest substrates page in the band.** Composition-reference count
(grep of `StorySection|ShowcaseFrame|GlassDock|SegmentedTabs|Configurator`):

| page | refs | shape |
|------|------|-------|
| blob.vue | 84 | VizStudio-class: Configurator + layers + sliders + select + preset chips |
| paper-grid.vue | 46 | Configurator + LabeledSlider/Select/Switch |
| fourier-field.vue | 43 | Configurator + rich controls |
| concentric.vue | 38 | Configurator + LabeledSlider/Select/Switch |
| **goo-dot.vue** | **6** | **1 StorySection + 1 ShowcaseFrame + raw buttons + 3 bare Switch** |
| dot-flow-field.vue | 6 | (same thin clone) |
| dot-matrix.vue | 6 | (same thin clone) |

The page composes NO `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow`, NO `LabeledSlider`/
`LabeledSelect`/`LabeledSwitch`, NO `SegmentedTabs` (the 4 variant buttons are a hand-rolled
`<button v-for>` row at `goo-dot.vue:65-74` — a textbook `SegmentedTabs variant="pill"` case),
NO dock APIs (no `GlassDock`/`DockStack`/contextual-switching — despite the prompt's explicit
"leverage the dock APIs" mandate; `VizStudio.vue` is the chassis that would carry them). The two
`<Switch>` toggles and the raw button row ARE glass-ui-adjacent but represent the floor, not deft
composition. **The fix is mechanical and already designed**: adopt `VizStudio.vue` (the shared
configurator-right chassis) the way `aurora.vue` does, expose the numeric axes as `ConfiguratorRow`
sliders, and the variant row becomes `<SegmentedTabs variant="pill">`.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**No. The viz floats over a FLAT CREAM PAPER page — no aurora behind it.** Verified live: the page
background is the static cream paper wash (manifest `substrates` default would be `aurora`, but this
SFC bypasses the page-substrate path entirely by mounting the viz in a bare `ShowcaseFrame
tier="field"` 460px box with no backdrop layer). The blurb sells "drag the cursor — the dot-cloud
leans" and "glass card shows through to a transparent ground", but with nothing colorful behind the
transparent ground, the morphism does not read — the dots sit on cream. This is the BG-2 class the
band is supposed to have killed: the ShowcaseFrame `tier="field"` correctly drops the opaque plate,
but the PAGE itself declares no live colorful field, so "field" reveals only flat paper. The prompt's
"glass demos over COLORFUL aurora backgrounds" is unmet. PAPER morphism is also absent (no
paper-grain / blueprint-grid register engaged where it would suit a calm dot-field).

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**No on both counts.**
- **Single card, not per-section.** The whole page is ONE `StorySection` → ONE `ShowcaseFrame`
  (`goo-dot.vue:96-104`). The controls (variant row + 3 switches) sit BARE above the frame
  (`:63-94`), not in their own glassy card. The trailing prose (`:106-114`) is a bare `<p>`. There
  is no "each sub-section in its own glassy card" structure — there are no sub-sections at all.
- **Main card too small.** The stage is `h-[460px]` (`goo-dot.vue:97`) — a fixed 460px box. The
  canonical VizStudio envelope is `h-[min(78vh,720px)]` (`VizStudio.vue:81`) — the blob/aurora
  studios get ~720px and the full content width with a controls column beside. goo-dot's 460px box
  with a 1182-char blurb above it means the viz is far below the fold and gets a fraction of the
  screen. The user's "main card area BIGGER (more screen space)" is unmet.

## (5) PATH-LABEL standardization

**Correct.** The hero subpath chip renders `@mkbabb/glass-ui/goo-dot-matrix` (verified live, from
manifest `:230`) via the StoryPage chassis — the standardized Fira-Code chip ON the card. The
in-body prose chip at `goo-dot.vue:107` (`@mkbabb/glass-ui/goo-dot-matrix`) and the manifest blurb's
closing `Shipped /goo-dot-matrix.` are consistent. No drift. ✓

## (6) LANGUAGE — superfluous prose to tighten?

**Heavily overwritten — the worst offender in the band.** The blurb (`goo-dot.vue:61`) is **1182
characters / 155px tall** at the live width — among the longest in the suite, and it caused the
live overlap defect (see §7). It restates the same idea three times (FIELD-OF-DOTS → tixy.land →
"the gooey form drawn entirely in dots"), narrates the implementation ("re-uses two SOTA primitives…
the byte-untouched sceneDistG… joined by ONE new idea: the dot-grid OUTPUT stage… v =
thickness(sceneDistG(cellCenter))"), and the trailing `<p>` (`:106-114`) repeats the SAME
`v = thickness(...)` formula and the SAME "dense+big+bright inside / sparse+small+dim at the rim"
sentence verbatim. Cut to ~2 sentences. The heading/eyebrow are ALSO redundant: the giant display
`<h1>` "Goo Dot-Matrix" + the `<h2>` "Goo dot-matrix" + the `.section-label` eyebrow
"Metaball SDF field · rendered as a dot matrix · the goo+dot HYBRID" form a TRIPLE near-identical
heading stack. Collapse to one display title + one short tag.

## (7) BUGS

- **BUG-1 (live, severe) — sticky-title × blurb overlap on scroll.** The `.story-hero-shrink`
  sticky large-title collapse register slides the giant display `<h1>` OVER the StorySection blurb
  during scroll, producing an illegible stack of overlapping text (captured: the giant "Matrix"/
  "Dot-Matrix" glyphs collide with the 155px blurb + a ghosted second copy of the descriptor). At
  rest (scrollTop 0) the h1 and blurb do NOT overlap (`h1_blurb_overlap_at_rest:false`), so it is a
  scroll-transient defect aggravated by this page's oversized 1182-char blurb. Reproduces on `blob`
  too (chassis-wide), but goo-dot's blurb length makes it acute. Tightening the blurb (§6) mitigates;
  the real fix is the sticky-register z/stacking in the chassis.
- **BUG-2 (env-conditional) — viz buffer stuck at 300×150.** The `goo-dot-matrix-canvas` is
  CSS-sized 1020×460 but its WebGL2 drawing buffer never resizes off the default 300×150 (verified:
  context not lost, PRM off, survives 30 rAF frames + scroll-into-view + a window resize event;
  `toDataURL` returns a 2118-char near-blank, f1==f2 across 600ms → not visibly animating in this
  env). The SAME 300×150 affects `blob.vue` canvases, so this is a **substrate-wide
  ResizeObserver/DPR-resize condition in this headless dev Chrome**, not a goo-dot-specific bug — but
  it means the live viz could NOT be confirmed painting/animating here. Needs a re-check on a real
  GPU/headed browser. If it reproduces headed, the viz is effectively dead.
- **NIT — Vue warn** (chassis-wide): `<Transition> renders non-element root node that cannot be
  animated` (TooltipProvider under StoryPage) — benign, present on every story.

---

## Recommended fix (architectural, no workaround)

Re-home `goo-dot.vue` (and its two clones) onto `VizStudio.vue` exactly as `aurora.vue` does:
the BIG `h-[min(78vh,720px)]` stage on the left, a full `Configurator` on the RIGHT exposing
`dotPixelSize`/`dotMin`/`dotMax`/`fieldFloor`/`dotBrightFloor`/`cols`/`flowAmt`/`pointerMode`/
`pointerRadius` as `ConfiguratorRow` sliders + select, the variant row as `<SegmentedTabs
variant="pill">`, a Poke/flick affordance + live status readout (blob's pattern), the preset toggle
as a preset chip row, and the page declaring a live colorful aurora substrate so the transparent
dot-ground reads as glass-over-field. Tighten the blurb to ~2 sentences and drop the duplicate
trailing `<p>`. Optionally fold a dock contextual-switcher to flip variant registers (the prompt's
dock-API mandate). This collapses the band's three thin clones onto the one rich chassis.
