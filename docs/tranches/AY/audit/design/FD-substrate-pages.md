# FD-substrate-pages — the substrate showcase pages as designed pages

**Lane:** FD-substrate-pages (frontend-design audit, AY)
**Surfaces:** `/substrates/aurora` · `/substrates/blob` · `/substrates/constellation` · `/substrates/fourier-field`, judged as PAGES (staging, composition, hierarchy) — substrate render quality belongs to the reality audit.
**Verdict: DESIGN-DEFECTS.** Not one of the four pages stages its own substrate. Three are walls of boxed canvases on flat cream; one (aurora) is a good studio wearing no page at all. The library's most arresting pixels are framed like fixtures in a QA bench. Several concrete page-level defects ride along (native range inputs on the blob page, near-empty first-paint wells on fourier, illegible dark dock labels over the bright aurora stage, no header on aurora).

**Captures:** 27 PNGs in this directory, `FD-substrate-*.png` (fold = 1440×900 viewport; full = stitched full-height; scrollN = honest mid-scroll stops on the unmodified page). Light + dark for every page, plus `FD-substrate-REF-staged-hero-*` — the `compositions/hero` staged-model reference.

---

## 0. The structural finding — the manifest asymmetry

Every story page declares its background substrate ONCE on its manifest row (`demo/stories/manifest.ts`); the `StoryPage` → `StoryHero` chassis then floats the body in a glass card over it. The rows that USE this are:

- `foundations/intro` — `background: aurora`, `hero: true`
- `compositions/hero` — `background: constellation`, `hero: true`
- `compositions/auth-shell` — `background: fourier`, `hero: true`

The four SUBSTRATE rows (`manifest.ts` ~138–141) declare **no background and no hero**. So the storybook's live substrates each get a full-bleed product-page staging — on somebody else's page. Aurora stages the intro, constellation stages the hero composition, fourier stages the auth shell; their OWN pages are flat cream + `ShowcaseFrame` boxes. The W60 model exists, is wired, is one manifest line away, and is applied everywhere except where it would be self-demonstrating. That is the whole gap, in one sentence.

## 1. Aurora (`FD-substrate-aurora-{fold,full}-{light,dark}.png`)

**As a studio: STRONG. As a page: missing.**

What's good — and genuinely distinctive: the preset picker row (baked WebGL thumbnails in cartoon-shadow cards with mono sub-captions — `Sky / SMOOTH · 4 NUCLEI`, `Oil Impasto / OIL · PALETTE-KNIFE`) is the most characterful strip in the whole storybook; the stage + config-dock split is a real instrument layout with clear affordance (Atoms/Advanced tabs, labeled mono section rules). Nobody would call this AI slop.

Page defects:

- **No page.** aurora.vue skips the `StoryPage` chassis entirely — the ONLY substrate page with no eyebrow / no `<h1>` / no blurb. You are dropped into a tool with a tiny `PRESETS` micro-label as the page's first line (fold captures). Every sibling page opens `SUBSTRATES · X` + display title; aurora opens with a scroll row. The category's headline act has no headline.
- **The pastel bloom is dead weight.** The hand-authored radial-gradient wash behind the frame (`aurora.vue` ~line 133, `opacity-60 blur-2xl`) is imperceptible in both themes at 1440px (fold + full captures: flat cream / flat near-black around the frame). The one staging gesture the page attempts does not paint. The live field itself should be the bleed, not three frozen pastel ellipses.
- **The hint prose is an afterthought.** Three muted plain paragraphs under the frame ("Drag inside the stage… alt-click… Arrow keys cycle presets") — the page's interaction model (its best content!) typeset as a footnote, with no `<kbd>` chrome despite the demo shell shipping a kbd recipe in its shortcut dialog.
- **Dark mode: the bottom dock goes illegible over the stage** (`FD-substrate-aurora-full-dark.png`): the viewport-anchored BottomDock floats over the bright blue stage; inactive tab labels are dark-on-dark-glass-over-bright-backdrop and effectively vanish. This is the W55 G2 case (glass over VERY LIGHT backdrop) live on the demo shell — the `--glass-backdrop: light` bucket exists for exactly this and the shell doesn't set it.
- At 900px viewport height the floating dock permanently overlaps the stage's bottom-center (light fold) — on this nearly-no-scroll page there's no scroll position that clears it.

**Staging move (W-SB1):** give aurora a page: the StoryPage hero register with the LIVE field as its own full-bleed background (`background: {kind:"aurora"}` is one manifest line) — headline + blurb floating in glass over the real thing, the studio below. Kill the dead pastel bloom; let the active preset's field bleed past the frame instead (the studio's own canvas as the page's atmosphere). Promote the interaction hints into the dock or a kbd-chip strip.

## 2. GooBlob (`FD-substrate-blob-*.png`)

**COMPETENT-NOT-DISTINCTIVE as a page; the substrate underneath is charming and the page muffles it.**

The mood section is the page's delight peak (`FD-substrate-blob-scroll2-light.png`): the vivid red droplet + mood pills (idle · happy · curious · sleepy · excited) + live derived-palette watercolor dots — color story, levity, interactivity all in one section. That is the page's true hero and it is buried third.

Page defects:

- **The first note is a black ink splat.** Section 1's swatch row leads with `var(--primary)` — which in this system is near-black warm ink — so the page's first visual is a heavy BLACK blob (light fold capture), under a blurb that says "pastel swatch." Wrong first note for a page about a luminous droplet; the black dot reads like a rendering error, not a register.
- **The heroes are stamps in empty frames.** Both GL heroes are `w-56` (224px) squares centered in full-width cream cards — at 1440px that's ~80% dead cream per hero card (full-light capture). The negative space reads as unfinished, not intentional; the lit cream droplet on a cream card is additionally near-invisible at rest (scroll1).
- **Native `<input type="range">` on the design system's own showcase** (blob.vue ~162–195; scroll1 capture shows the raw browser gray tracks). The library ships `Slider`/`LabeledSlider`; its flagship interactive page tunes its hero with unstyled OS controls. Pure dogfooding miss, instantly visible.
- **Test-harness furniture in the prose register:** "clicks: 0" tabular counter, "Poke (impulse)" as a bare pill, a `data-testid` pause strip as the page's closing section. The page ends on the QA seam, not on the substrate.

**Staging move:** open with the mood hero — big (≥ 480px), overlapping the card edge sticker-style (the cartoon-shadow language already supports the overlap), over a soft live wash so the glass card has something to be glass against. Recolor the static-register row to actual pastels (or the seed-derived stops), demote the black-primary swatch. Swap native ranges for `LabeledSlider`. Fold the pause seam into the hero's corner as a DockBackgroundToggle chip rather than a closing section.

## 3. Constellation (`FD-substrate-constellation-*.png`)

**The most thorough page and the most monotonous — six identical 420px cream panels stacked single-file.**

The dark theme is quietly the best substrate-page read of the four (`fold-dark`): warm-black field, white hairline lattice, red accent focal — committed and atmospheric. Light mode is far weaker: the lattice runs at hairline-on-cream alpha tuned for a DECORATIVE background, so each showcase panel reads ~80% empty at arm's length (scroll2/scroll3 captures — the panels are present but whisper).

Page defects:

- **Wall-of-boxes composition.** Six same-width, same-height (420px), same-chrome panels in a column — uniform grid of boxes, the exact anti-pattern the design lens names. No rhythm variation, no hierarchy between "the lattice" (the identity moment) and "the resize re-fit" (an engineering proof).
- **The π lane leaks into the page voice.** Section blurbs address the test harness in product prose: "The π lane resizes this surface programmatically (via __constellationRefit.resizeTo) and reads the node bbox + focalIndex per frame," "the π egg-live spec drives it via the exposed holdWellAt/releaseWell." A first-time user is being read the CI runbook. (The W-CON waves' meta-language scrub stopped at dock.vue; this page needs the same GREEN pass.)
- **The interaction affordances are caption pills doing a button's job.** "click to warp the focal node" / "hold to pull the field in" / "double-tap to detonate (demo-only)" — tiny bottom-left pills on near-empty panels; the page's three best toys are whispered. The supernova is a genuine easter egg and the page label outs it as "(DEMO-ONLY — not an engine prop)" — spec language where playfulness belongs.

**Staging move:** the `compositions/hero` page already proves constellation as a full-bleed hero — give the constellation page the same opening (header floating in glass over its OWN live lattice, hot-alpha variant). Then break the six-panel column into a composed spread: the pointer/warp/well trio as a 2+1 asymmetric band, refit + freeze as one compact "engineering" strip with mono captions, supernova as a discoverable (no spoiler label). Run showcase panels at a louder `--constellation-*` alpha than the decorative default — a showcase may shout where a background must whisper.

## 4. Fourier Field (`FD-substrate-fourier-field-*.png`)

**BROKEN-adjacent as a first impression; the weakest page of the four.**

The substrate is the most poetic thing the library ships — a seeded inverse-DFT curve drawing itself through nested epicycles. The page shows almost none of it:

- **Every well is a near-empty cream box at first paint.** The curve materializes over tens of seconds; the epicycle hairlines are sub-perceptual at page alpha. Fold-light: two large bordered boxes, one faint circle + a 40px red arc between them. scroll1: the injected-color well is a ~1300×500 blank with one thin phasor arm. A visitor's first three screens of this page are empty rectangles with mono captions.
- **The closing "freeze — the capture lever" section paints a giant blank box with a single red dash** (`scroll2`). The blurb promises "ONE static deterministic best-frame… for a thumbnail, a print, or a poster"; the painted best-frame is a 60px squiggle in 7,800 px² of cream. Whether that's a bug or a mis-tuned best-frame phase is the reality audit's call — as a PAGE, the final section reads as a glitch.
- **Letterboxed geometry:** `aspect-[16/6]` wells for a roughly-circular figure guarantee dead margins even when fully drawn.
- No hero moment anywhere — three sections, all boxed, on flat cream. Meanwhile `compositions/auth-shell` stages fourier as a full-bleed hero background today.

**Staging move:** (a) warm-start every showcase well (seed the phase so the curve enters mid-reconstruction — the engine's `renderAt`-style lever exists; no first view should be an empty box); (b) full-bleed fourier hero behind the page header (`background: {kind:"fourier"}, hero: true` — auth-shell proves it); (c) square-ish wells sized to the figure; (d) make the freeze section show an actual poster-worthy frame or cut it down to a caption + thumbnail pair.

## 5. The calibration twist — even the staged model under-delivers

`FD-substrate-REF-staged-hero-{full,fold}-{light,dark}.png` (`compositions/hero`, the W60 shape these pages should adopt): the typography is the system at its best — the display headline with the italic-f signature glyph mid-word is a genuinely distinctive front door. But **the live constellation it declares is invisible in both themes.** The glass card fills 100% of the StoryHero container (`story-hero-card > * { width: 100% }`; the card is the container's only child), so the substrate paints entirely BEHIND a `tier="floating"` plate — 80% opaque light / 88% dark (`tokens.css` §glass) — over a same-hue page background. 7%-alpha hairlines through an 80–88% opaque same-color plate ≈ zero. The "content floating in glass over a live substrate" promise renders as a flat cream (or flat charcoal) card.

Consequence for W-SB1/W60: re-staging the substrate pages onto StoryHero as-is would inherit the same occlusion. The staging fix has TWO halves — adopt the hero register AND let the substrate actually show: inset/asymmetric card placement so the field bleeds at the edges, a lower-opacity hero rung (or a `--glass-level` < 1 bracket for hero cards), or partial-coverage composition. A hero whose backdrop cannot be perceived is indistinguishable from no backdrop.

## 6. What is already exceptional (calibration — name the good)

- The aurora preset picker row: live-baked thumbnails, cartoon shadows, mono sub-captions — distinctive, informative, brand-true. The best single strip in the storybook.
- The mood-blob section's color story (seed → harmony → derived OKLCh stops previewed as watercolor dots, fed live to the hero) — delight with a real pipeline behind it.
- Constellation in dark mode — committed atmosphere, would pass for a product page hero tomorrow.
- The page-header type ladder everywhere it's used (mono small-caps eyebrow → display title → measured muted blurb): characterful and hierarchical. Aurora is the one page denied it.

## 7. Capture method notes (so nobody mis-reads the artefacts)

- Headless Chromium default (SwiftShader) WEDGES the renderer on the aurora WebGL2 shaders — screenshots and even navigation time out. All captures here ran `--use-gl=angle --use-angle=metal` per `tests-visual/playwright.config.ts` (the repo already knows: "software GL crashes the aurora WebGL2 shaders").
- The `-full-` stitched captures required neutralizing the AppShell's fixed `h-screen` scroll frame (`<main>` owns scroll, so `fullPage` sees only the viewport). Side-effects in those files only: the BottomDock prints mid-page, and BELOW-FOLD canvases show EMPTY because the offscreen-park seam (correctly) never spun them up before the reflow. The `-scrollN-` captures are the honest mid-scroll truth on the unmodified pages — lattices/wells DO paint when scrolled into view (faint, per §3/§4).
- Dark mode driven via the vueuse `vueuse-color-scheme` localStorage key + `colorScheme: dark`, pre-load.

## 8. Gap list → W-SB1/W60 (one line each)

| Page | The staging move |
|---|---|
| all four | manifest rows gain `background: <own substrate>, hero: true` — self-demonstration via the EXISTING chassis |
| StoryHero | fix the occlusion: inset/asymmetric hero card or lower-opacity hero rung so the declared substrate is perceivable (today: 80–88% opaque card covers 100% of it) |
| aurora | adopt StoryPage (header restored); kill the dead pastel bloom — the live field is the bleed; hints → kbd chips; demo shell sets `--glass-backdrop: light` under the dock over bright stages (W55) |
| blob | open on the mood hero, big + edge-overlapping; pastel-ize the static row (drop black-primary lead); `LabeledSlider` replaces native ranges; pause seam → hero corner chip |
| constellation | full-bleed lattice hero; break the six-box column into a composed 2+1 band + compact engineering strip; louder showcase alpha; scrub π-lane prose from blurbs; unlabel the supernova egg |
| fourier | warm-start every well (no empty first paint); square wells; full-bleed fourier hero; freeze section must show a poster-frame (today: a 60px dash in a blank box) |
