# BD page-audit — SUBSTRATES category (11 pages + VizStudio chassis)

Branch `prototype/liquid-dock`. PLANNING audit — no src edits. Live spot-checks on
`:5173` (chrome-devtools-mcp), code read in full.

Pages: aurora · blob · concentric · constellation · dot-flow-field · dot-matrix ·
fourier-field · glass-material · glass-panel · goo-dot · paper-grid.

---

## 0. Headline — the KISS/DRY lever is HALF-BUILT

The shared chassis (`StoryPage`/`StoryHero`/`StoryHeader`/`StorySection`/`ShowcaseFrame`)
exists, AND a dedicated viz-studio chassis `VizStudio.vue` exists — but **only `aurora`
composes `VizStudio`**. The grep matrix (VizStudio / StoryPage / ShowcaseFrame /
Configurator usage per page):

| page | VizStudio | StoryPage | Configurator | studio shape |
|---|---|---|---|---|
| aurora | ✅ | (via VizStudio) | useConfiguratorState | **chassis** |
| blob | ❌ | ✅ | 62 refs | hand-rolled |
| concentric | ❌ | ✅ | 35 refs | hand-rolled |
| fourier-field | ❌ | ✅ | 37 refs | hand-rolled |
| paper-grid | ❌ | ✅ | 43 refs | hand-rolled |
| constellation | ❌ | ✅ | 0 | hand-rolled ShowcaseFrame walk |
| glass-material | ❌ | ✅ | 0 | hand-rolled ShowcaseFrame walk |
| dot-flow-field | ❌ | ✅ | 0 | hand-rolled ShowcaseFrame |
| dot-matrix | ❌ | ✅ | 0 | hand-rolled ShowcaseFrame |
| goo-dot | ❌ | ✅ | 0 | hand-rolled ShowcaseFrame |
| glass-panel | ❌ | ✅ | 0 | self-staged ladder |

So the configurator-RIGHT + rounded-studio + preset-gallery shape lives ONCE (aurora)
but the 4 other configurator pages (blob/concentric/fourier-field/paper-grid) each
RE-FORK their own studio layout instead of `<VizStudio>`. This is the anti-pattern the
addendum names. **The chassis-once fix is to route all 5 configurator pages through
`VizStudio`** (W-CONFIG-GALLERY-DOCK), then the gallery-dock + enlarged-config + preset
facility lands ONCE.

---

## 1. HEADER 2x TOO LARGE — chassis-once, every page (W-HEADER-SCALE)

**LIVE-CONFIRMED, every substrate page.** Every substrate row is `hero: true` +
`heroScale: "hero"` (manifest.ts:552, 569, 581, 599, 610, 668, 682, 696, 710…), which
resolves to `text-display-hero`. Live getComputedStyle:

- `/substrates/aurora` → `h1` **fontSize 244.8px** (viewport 900px tall).
- `/substrates/dot-flow-field` → `h1` **fontSize 244.8px**, "Dot Flow Field" WRAPS TO
  TWO LINES and fills the ENTIRE first viewport — the actual viz canvas sits at
  `top: 1224px`, two full scrolls below the fold.

`heroScale: "hero"` is the largest demo rung (`StoryHero.heroScale` → `text-display-${rung}`,
StoryHero.vue:76, 92). The library √φ display ladder is correct as an IDENTITY; the DEMO
header rung is over-scaled. **ONE chassis fix**: halve the storybook hero rung
(StoryHero.vue `heroClass`, StoryHeader, story-hero.css `.story-hero-title`) OR drop the
substrate manifest rows from `"hero"` to `"4"`/`"5"`. ALL 11 pages propagate. → **W-HEADER-SCALE** (one-chassis).

Note: this is the SINGLE biggest defect on every viz page — the title eats the whole
viewport and buries the viz the page exists to show.

---

## 2. NO DIVIDING LINE below the header (W-PAGE-CHASSIS, ask #3)

**CONFIRMED — `--story-header-rule` does NOT exist.** Grep finds NO header-rule token /
`border-block-end` on `.story-header-cluster`/`.story-hero-card`. story-hero.css HAS an
inter-SECTION delimiter (`.story-sections--delimited > * + *` → `border-top: 1px
var(--configurator-divider)`, story-hero.css:428-435) and it renders (visible on
`/foundations/shadows`, `/display/separator`), BUT there is **no hairline separating the
HEADER from the body**. The header floats; the body card begins with no seam. → fold into
**W-PAGE-CHASSIS** (`--story-header-rule` hairline below StoryHeader, ONE chassis edit →
118 pages). ONE-chassis-fix.

---

## 3. STICKY TITLE OCCLUDES (W-STICKY-TITLE-CONDENSE, ask #1)

**Mechanism present, OCCLUSION bug present.** `.story-hero-shrink` (story-hero.css:227)
is `position: sticky; top: 0; z-index: 2` with a `scroll()`-timeline scale(1→0.5) shrink
(gated under `@supports (animation-timeline: scroll())` + PRM). The shrink-not-occlude
INTENT is there, BUT:
- The sticky cluster has **NO background plate** — it is transparent text at `z-index: 2`.
  As the body scrolls up, content slides UNDER the still-visible large/shrinking title =
  the "titles persist + occlude the whole page" defect. A condense register needs an
  opaque/glass backing bar behind the shrunk title (a slim sticky header BAR the page
  scrolls FROM), not bare floating text.
- The shrink range is `0 → 240px` but the title is 244.8px tall — it barely starts
  condensing before the viewport is already full of title.
- subpath chip persists but the title+subtitle SUBSUME mechanic (ask #1: one subsumes the
  other) is not built — both eyebrow+title+blurb just scale together.

→ **W-STICKY-TITLE-CONDENSE** (add the slim sticky BAR backing + the title↔subtitle
subsume + tighten the range; folds W-SCROLL-FLUIDITY). ONE-chassis-fix (rides
`.story-hero-shrink`). DEPENDS on W-HEADER-SCALE (the 244px title makes condense moot).

---

## 4. THE PRESET-RENDER BUG — blank previews (W-PRESET-RENDER, ask #5) [BUG]

**LIVE-CONFIRMED on aurora: `document.querySelectorAll('img').length === 0`** — zero
data-URL thumbnails in the whole preset row. The preset cards render (name + sub) but the
`<img v-if="thumbs[key]">` never resolves, so every card shows the `<Skeleton>` shimmer
(blank) forever — exactly the user's screenshot (Sky/Dawn show name, blank preview).

**Trace of the render path:**
1. `aurora.vue:68` `usePresetThumbnails({ widthCss: 320, heightCss: 200 })`.
2. `usePresetThumbnails.ts:61` `bake()` creates an offscreen canvas, calls
   `createAurora(shared, …, { mode: "capture" })`, `await aurora.armAsync()`, then loops
   `update + renderAt(1) + toDataURL("image/webp")` per preset (lines 74-97).
3. The fix-comment at line 84-90 says the AWAIT-`armAsync`-before-`renderAt` already
   closed the "dead dark thumbnail" class — BUT the live page still has ZERO imgs.

**Why it's STILL blank (the live evidence + the likely cause):**
- The bake canvas runs `createAurora(…, { mode: "capture" })` → WebGPU backend (aurora is
  WebGPU-first; `/substrates/aurora` live stage canvas is webgpu, `navigator.gpu` present).
- `toDataURL` on a WebGPU/WebGL canvas requires `preserveDrawingBuffer` (or a same-task
  read after `renderAt`). The capture path does `renderAt(1.0)` then `toDataURL` across an
  `await setTimeout(0)` yield (line 96) — on WebGPU the swap-chain texture is gone by the
  next task, so `toDataURL` reads an EMPTY buffer → "" or a blank webp. The `armAsync`
  fix addressed the *async device* race; it did NOT address the WebGPU
  `toDataURL`-after-yield read-back race.
- Additionally the studio uses `mode="capture"` which forces eager arm, but the per-preset
  `setTimeout(0)` yield (line 96) BETWEEN `renderAt` and the NEXT `toDataURL` breaks the
  same-frame readback contract on WebGPU.
- Net: 0 imgs resolve → all Skeletons → blank previews. **BUG, born-RED.**

→ **W-PRESET-RENDER**: the readback must be a synchronous same-task
`renderAt → toDataURL` (no yield between) on a `preserveDrawingBuffer`/capture-configured
context, OR force the capture bake onto the WebGL2 fallback (which has the synchronous
`readPixels`/`toDataURL` path the comment at runtime.ts:253 names). This is a SHARED
facility (every configurator's preset gallery uses the same bake pattern — aurora's
`usePresetThumbnails` is the model; blob/fourier-field/concentric/paper-grid need the SAME
working thumbnail facility once they route through VizStudio). ONE-facility-fix, NOT
per-page.

---

## 5. dot-flow-field BROKEN (W-DOTFLOW-REBUILD, ask #6) [BUG]

**LIVE-CONFIRMED dead.** Canvas `data-testid="dot-flow-field-canvas"` is 2066×920 real
pixels, WebGPU context, `navigator.gpu` present, NOT paused — and a `drawImage`→
`getImageData` sample returns **`meanLum: 0, maxLum: 0, litFrac: 0`**: the canvas paints
ZERO lit pixels. No console error. Two compounding failures:

**(a) The render is dead under WebGPU.** The field self-stages WebGPU-first
(`useDotFlowField.ts:175` `setupWGPU: createFlowWGPUSetup`); the canvas is `webgpu` ctx but
draws nothing. Either the compute→render two-pass produces no output, or (like the preset
bug) the WebGPU swap-chain output is not landing on the visible canvas. The WebGL2
fragment fallback (`setupGL`) is only reached when WebGPU is ABSENT — it never runs here.

**(b) Invisible-by-DESIGN even if it painted (the D0 defect).** `DEFAULT_FLOW_CONFIG`
(constants.ts:101) is warm-cream dots (`WARM_IDENTITY_PALETTE` L:0.92 C:0.03) over
`background: "transparent"`, `globeMask: false`, `dotSize: 2.0`, `contrast: 0.6`. The demo
page (`dot-flow-field.vue:79`) mounts it in a `<ShowcaseFrame tier="field">` over the
manifest `background: "grid"` (a LIGHT-GREY page wash). **Warm-cream dots over a light-grey
page = near-zero contrast** — even a working field would be near-invisible. The MONO-on-
near-black REFERENCE preset (the look the spec wants — `FLOW_PRESET_MONO_REFERENCE`,
presets.ts:44, near-black ground + mono-warm-white dots) is OFF by default (the Switch
defaults `useReference: false`, dot-flow-field.vue:22). So the page leads with the
contrast-dead warm-cream variant on a contrast-dead light stage.

**Spec gap:** the README/blurb describe "a LARGE wave washes over an anchored dot-matrix /
arbitrary image tessellation" (W-DOT-IMAGE), but the page renders nothing and the default
config isn't on the contrasting stage the dots need to read.

→ **W-DOTFLOW-REBUILD** (folds W-DOT-IMAGE + W-VIZ-PRESENCE): (1) fix the WebGPU render so
the canvas paints; (2) put it on a CONTRASTING stage (near-black ground by default in the
demo, OR lead with the mono-reference preset) so it is VISIBLE; (3) the "wave washes
over / image tessellation" spec. NOT a one-chassis fix — this is a per-viz BUG + a
substrate-render fix. The render-readback half MAY share root cause with W-PRESET-RENDER
(both WebGPU canvas-output-not-landing).

---

## 6. NO ENGAGING BACKGROUND on the non-self-staging pages (W-PAGE-BACKGROUND, ask #7)

The live-GL viz pages (aurora/blob/constellation/glass-material) get a live field as the
StoryHero background (manifest `background: "aurora"`/`"constellation"`/`"paper"`). BUT:
- **The self-staging viz pages declare `background: "grid"`** (dot-flow-field, concentric,
  paper-grid, dot-matrix, goo-dot — manifest.ts:684, 698, 712…) — a STATIC light-grey
  blueprint-grid wash, "to honor one-GL-per-route" since the viz IS its own context. The
  RESULT: the page chrome (the 244px title band, the prose) sits on a dead grey wash, and
  the viz is a small framed card far below. A viz page should BE its own background — the
  viz should be the full-bleed page field (it's already a GL context; mount it full-bleed
  behind the chrome like aurora does), not a small `ShowcaseFrame` card on grey.
- **dot-flow-field**: `background:"grid"` static + the broken viz below the fold = the
  page has NO engaging background at all (dead grey + invisible card).

→ **W-PAGE-BACKGROUND**: the self-staging viz pages mount their OWN field full-bleed as the
page background (the field IS the page — one-GL budget HONORED since it's the same single
context, just promoted from a card to the bleed). Glass demos (glass-material/glass-panel)
already float glass over a live field — keep. ONE-chassis-fix for the self-staging set
(promote `ShowcaseFrame` card → `.story-hero-bg--bleed` mount), per-page for the precise viz.

---

## 7. PAPER MORPHISM absent (W-PAPER-MORPHISM, ask #8)

Substrates is the GL band, so paper morphism is mostly out-of-band HERE — but `paper-grid`
IS the paper pillar and the `paper`-backed substrate rows (blob, fourier-field declare
`background: "paper"`) DO route through StoryHero's `paper` kind → `.story-bg-paper
paper-grain-overlay` (StoryHero.vue:313). So paper-grain DOES surface on the paper-backed
substrate pages. The broader "no grain anywhere" defect is a cross-category concern (the
foundations/display bands); for substrates the paper pillar reads on the `paper`-kind
pages. → mostly out-of-substrates-scope; flag `paper-grid.vue` for the W-PAPER-MORPHISM
fleet (its own viz IS the grid; the grain register should compose).

---

## 8. CONFIGURATOR too small / gallery not a glass dock (W-CONFIG-GALLERY-DOCK, ask #4)

**CONFIRMED — no dock-collapse facility exists.** `Configurator.vue` has `scrollMode`
(`auto`/`always`/`never`) + `asideSide` (`right`/`left`) only — it is a STATIC
`glass-floating rounded-panel` two-column inspector (Configurator.vue:131). There is NO
GlassDock, NO collapse, NO "gallery up top scrollable collapsing into a dock":
- aurora uses `scroll-mode="never"` (aurora.vue:114) so the WHOLE config grows to content
  height inline-below — no scroll, no dock.
- The preset gallery (`PresetPickerRow`) is a small horizontal `<FadingScroll axis="x">`
  strip of 200px cards INSIDE the config, NOT a larger up-top gallery.
- The configurator pane is the RIGHT column of the studio at `h-[min(78vh,720px)]`
  (VizStudio default) — but only aurora gets it; the other 4 config pages hand-roll.

→ **W-CONFIG-GALLERY-DOCK** (folds W-VIZ-CONFIGURATOR): (1) route all 5 config pages
through `VizStudio` (the chassis-once lever); (2) enlarge the gallery + move it up top,
`<FadingScroll>`-scrollable; (3) collapse the configurator into a `<GlassDock>` (the D9
dock-as-hub consumer). The dock-collapse is a NEW facility on the Configurator/VizStudio
chassis — ONE-chassis-build, but a real new mechanism (not a token tweak).

---

## 9. Other per-page notes

- **Triple-header redundancy on aurora (live).** The page renders the title "Aurora" ~3×:
  (a) StoryHeader cluster h1 "Aurora" + eyebrow + blurb; (b) StorySection "Aurora"
  subheading + a SECOND full blurb (VizStudio passes `heading`/`label`/`blurb` to
  StorySection, aurora.vue:110-112); (c) the masthead "Aurora Studio" violet display
  (aurora.vue:120-130). Three focal title moments + two full blurbs stacked. The
  VizStudio `heading`/`blurb` DUPLICATES the StoryPage hero (the manifest already carries
  title+blurb). → fold into W-HEADER-SCALE / W-PAGE-CHASSIS (suppress the duplicate
  in-body section header when the page hero already carries it).
- **constellation/glass-material/glass-panel** hand-roll ShowcaseFrame walks (no
  configurator) — fine as galleries, but inherit the 244px header + no-rule defects.
- **dot-matrix / goo-dot** mirror dot-flow-field structurally (ShowcaseFrame + Switch
  toggle, no configurator) — verify they paint (likely the SAME WebGPU-blank class as
  dot-flow; both are WebGPU-first self-staging). Flag for the W-DOTFLOW/W-VIZ-PRESENCE
  render-readback fix.

---

## Mapping summary (defect → wave → one-chassis?)

| defect | wave | one-chassis-fix? |
|---|---|---|
| header 244px on every page | W-HEADER-SCALE | ✅ ONE (rung halve / manifest) |
| no header dividing line | W-PAGE-CHASSIS | ✅ ONE (`--story-header-rule`) |
| sticky title occludes (no backing bar) | W-STICKY-TITLE-CONDENSE | ✅ ONE (`.story-hero-shrink`) |
| only aurora uses VizStudio | W-CONFIG-GALLERY-DOCK | ✅ ONE (route 5 pages through it) |
| preset previews BLANK (WebGPU readback) | W-PRESET-RENDER [BUG] | ◑ shared facility, NOT per-page |
| dot-flow paints nothing + invisible default | W-DOTFLOW-REBUILD [BUG] | ✗ per-viz (render + stage) |
| self-staging viz on dead grey wash | W-PAGE-BACKGROUND | ◑ chassis-promote + per-viz field |
| config too small / no gallery-dock | W-CONFIG-GALLERY-DOCK | ✅ ONE (new chassis facility) |
| triple-header redundancy (aurora) | W-PAGE-CHASSIS | ✅ ONE (suppress dup section header) |
