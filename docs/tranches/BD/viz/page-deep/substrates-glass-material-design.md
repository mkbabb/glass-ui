# substrates/glass-material — FRONTEND-DESIGN deep critique (Pass-E)

Page: `demo/stories/substrates/glass-material.vue` → `<StoryPage>` (full-bleed `background: aurora` hero) + 9 `<StorySection>` blocks, each a single `<ShowcaseFrame pad="lg" tier="field">` holding a `flex flex-wrap gap-6` row of bare `glass-<rung>` plates.
Live: `http://localhost:5173/substrates/glass-material`. Captured 1440×900 desktop, live hero aurora running.
Lens: the frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) applied to glass-ui's OWN language — DESIGN.md (§L1 six-layer Liquid Glass + the 7 tiers + glass-cannot-sample-glass + §L2 spring physics + §L3 tap choreography), motion-canon.md, design-idioms.md, PROCEDURAL-SUITE.md, the dock APIs.

---

## Verdict in one breath

This is the library's single most important showcase — the page where the SIX-LAYER composite, the 7-tier ladder, and the four SOTA folds (refraction, squircle, chromatic fringe, accent rim) are supposed to SING — and it is currently a **spec-sheet of small gray chips that the giant page title physically crashes into.** Three defects are disqualifying: (1) the 244px "Glass Material" hero is `position: sticky; z-index: 2` and **bleeds OVER the first three matrix sections as you scroll** — the demo is literally unreadable through its own title; (2) the hero aurora `<canvas>` is **300×150 internal buffer stretched to 1152×4386** — a ~4×/29× upscale that smears the "high-frequency painterly field" into a flat pink→peach wash, so the glass has nothing high-frequency to refract and every plate reads as a flat gray pill (the exact W54 "blur is imperceptible over a flat substrate" failure, in production, on the page whose entire thesis is glass-over-color); (3) the page leverages **zero dock APIs, zero tabs, zero procedural-anim component, and zero glassy sub-cards** — it is one flat `tier="field"` frame per section, the opposite of the user's "each sub-section in its OWN glassy card / deftly use a series of glass-ui components." The accent-rim axis (rose/amber/teal/violet) genuinely works and is the one distinctive moment. Everything else reads as a Tailwind audit table.

---

## 1. VISUAL HIERARCHY — the title crashes the content; the matrix has no focal point

**The sticky-title collision (P0, disqualifying).** `.story-header-cluster` carries `position: sticky; z-index: 2`. The 244px black `text-display-hero` "Glass Material" therefore PINS to the top-left and floats over the matrix rows beneath it — captured live, the words "Glass" and "Material" sit ON TOP of the "dynamic backdrop luminance" and "glass-accent" sections, occluding their labels and plates. This is not a hierarchy nuance; it is a broken layout. On a full-bleed hero page the audacious `<h1>` must either scroll away cleanly (drop the `sticky`) or — the iOS-27 move — **collapse to a thin chrome lockup and let the live field BE the masthead** (content-forward, chrome-quiet, the W-HIERARCHY2 reading-order cluster doctrine). Right now the typography-forward ladder is being used as a wrecking ball.

**No focal plate in the matrix.** Within each section the plates are nine identical `h-28 w-44` (112×176px) chips at `text-sm font-medium` — every cell the same size, same weight, same gray. The eye lands NOWHERE. DESIGN.md's §L1 "tier selection rule" says the ladder is *monotone in visual weight* — but a SHOWCASE of that ladder must STAGE the difference: the `overlay` rung should be visibly the heaviest plate, `wash` the lightest, arranged as a descending elevation staircase, not a uniform flex-wrap grid where wash and overlay are the same 112px box. The audacious √φ ladder (`text-display-2..hero`) appears exactly ONCE on the whole page (the metal triad "Au/Ag/Bz") — the most typography-forward library in the corpus spends its display ladder on two-letter labels and renders every actual demo at 14px body. Typography-forward is absent below the hero.

**Where hierarchy is RIGHT:** the section `label` resolves the canonical `--type-subheading` 20.4px/600 eyebrow rung, the mono `--glass-accent` / `LUMA 1.000 · LIGHT` sub-labels are the correct tertiary `text-mono-caption` register, and the on/off contrast devices (rim ON/OFF, accent ON/OFF, deep/calm) are a genuinely good pedagogical pattern. The skeleton is sound; the staging is flat.

## 2. AFFORDANCE — the page reads as documentation, not as a touchable surface

- **The plates look inert.** A 112×176 gray chip labeled `glass-wash` gives no cue that it is hover-live. The headline section IS pointer-tracked (the `useSpecularTracking` catch-light follows the cursor — a real, shipped, distinctive seam) but there is **zero affordance telling the user to move their pointer over it.** The blurb says "Hover any plate" but the plate itself offers no rest-state shimmer, no cursor change, no edge glint at rest. A discoverable affordance (a faint resting specular, a `cursor: crosshair`, a one-time "✦ hover me" pulse) would make the page's single best interaction findable.
- **The accent swatches are the one clear win** — rose/amber/teal/violet rims are visibly distinct and read as data-keyed surfaces; this is the §F1 one-line accent seam doing exactly what it should.
- **The tint `<Button variant="glass" :aria-pressed>` segmented control** is the only "real component" affordance and it is correct (pressed state, three samples). It's also the page's only `<Button>` — under-leveraged.
- **`.glass-lens` / squircle / chromatic sections are Chromium-gated** and on a non-supporting engine paint the blur base with NO visible difference and NO label saying "your engine doesn't show this" — the on/off device is right but the degraded case is mute.

## 3. ANIMATION AFFORDANCE — one live seam; everything else is dead static

At the iOS-27 bar EVERY element is alive — entrance, hover, press, state. Audit:
- **ALIVE:** the headline catch-light (pointer-tracked `::before`, the genuine moving-specular seam) and the metal triad's 6s patina sweep. That's it.
- **DEAD STATIC:** the matrix plates have **no entrance** (they just exist — no `.scroll-cascade`/`.scroll-build` build-in, though the library SHIPS both registers, W-SCROLL-MOTION); **no hover lift** on the non-headline sections (the accent swatches, deep/calm, squircle plates don't move, scale, or glint on hover); **no press** (nothing is pressable — `useSpringPress`/`useLiquidPress` exist and are unused). The deep-vs-calm device should *animate the `--glass-depth` scalar* on a toggle so you SEE the blur deepen (the scalar is a registered `@property` built to interpolate — W-DEEP-GLASS — and the demo shows two static states instead of the morph). The tint sample switch is an instant swap, not a `--spring-smooth` cross-fade of the `color-mix`. Net: the page narrates "this surface has spring physics and liquid life" in prose while presenting a wall of motionless gray rectangles. That is the single widest gap between what the library IS and what this page SHOWS.

## 4. POLISH + DISTINCTIVENESS — generic-AI-template, save one moment

This page reads like a **Tailwind component-gallery scaffold**: stacked label + blurb + a flex-wrap of equal gray cards, a mono caption under each. Nothing about the composition says "the world's most carefully-built liquid-glass system" — it says "auto-generated docs." The frontend-design skill's prime directive (avoid generic-AI aesthetics, look bespoke + premium) is failed by the LAYOUT even though the underlying material is world-class. The distinctive moments that DO exist — the moving catch-light, the four-hue accent rims, the metal patina — are buried in identical frames at identical scale. A world-class designer would **stage the hero composite as a single large interactive specimen** (one big `glass-overlay` card you drag/hover to see all six layers light up) and relegate the matrix to a supporting strip, not present eight equal-weight flex-wrap rows.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **§L1 six-layer composite — the page's whole reason — fails to READ** because the backdrop is a flat upscaled wash. Backdrop blur+saturate has nothing high-frequency to refract; the inner catch-light only reads on the one tracked section; the drop shadow is invisible on the `tier="field"` transparent frames; the grain is sub-perceptual at this plate size. You can SHOW six layers only over a backdrop with real spatial frequency — and the 300×150 canvas guarantees there isn't one. **Fixing the canvas sizing is the prerequisite to the page's thesis.**
- **§L1 glass-cannot-sample-glass** is respected (bare `glass-<rung>` plates over one fixed aurora, no nested glass-over-glass). Good — but the page never DEMONSTRATES this precept, which is one of the most distinctive things the system knows.
- **The 7-tier ladder is present but not STAGED as a ladder** (see §1). The `overlay`/`floating`/`resting`/`quiet`/`wash` chips should be an elevation staircase, the canonical DESIGN.md table made physical.
- **PAPER morphism is entirely absent.** The brief wants GLASS + PAPER both. This is the natural page to contrast them — a paper-grain `.scroll-cascade` notes band, the `--glass-tint-*` vs `--surface-tint-*` (oklab vs srgb) distinction made visible, a math-paper-style rail. Zero paper here.
- **§L2 spring / §L3 tap choreography** — narrated, never shown (see §3).

## 6. SPACING / RHYTHM — uniform, not golden

- Every plate is `h-28 w-44`, every gap is `gap-6`, every frame is `pad="lg"`. There is no φ-derived rhythm, no W-CARD-PAD sqrt-φ block ladder, no size hierarchy. The golden-ratio spacing the library owns is unused — the layout is a uniform grid, the most generic possible rhythm.
- The sections are separated by the chassis `--configurator-divider` hairlines (`:delimited` default) — fine, but the user's bar is "each sub-section in its OWN glassy card OR hr lines." Cards would be far stronger here: nine `glass-quiet` tiles floating over the aurora, each holding one fold, is the Control-Center idiom and would convert the spec-sheet into an instrument stack.
- The hero→matrix gap is a full void of empty wash (the 244px title + blurb fill screen one; the matrix starts below the fold and then the sticky title rides down OVER it).

## 7. COLOR — palette discipline correct, backdrop reach + frequency broken

- **One-color-event discipline holds** in the chrome (warm-neutral ink, the accent hues confined to the rim/glint, the metal triad as the sanctioned brand-metal exception). No second competing hue. The W-SUFFUSE proportion is respected.
- **The accent-rim axis is the page's distinctive color win** — four genuinely distinct OKLab data hues at the silhouette, the unset plate staying byte-identical warm-cream beside them. This is exactly the §F1 data-keyed seam and it's the one thing on the page that looks bespoke.
- **The miss is backdrop FREQUENCY, not palette.** The aurora is gorgeous on `/substrates/aurora` (captured: vivid pink/orange/violet with nucleus rings) but on THIS page it's a flat upscaled smear. The page's thesis — "glass demos over COLORFUL aurora backgrounds" — is defeated at the canvas-sizing layer before color is even a question.

---

## TOP DESIGN MOVES (ranked)

1. **Kill the sticky-title collision + size the canvas (P0, prerequisite).** Drop `position: sticky` on the hero cluster for this full-bleed page (or collapse the hero to a thin lockup so the field is the masthead). Fix the aurora canvas to render at its display resolution (DPR-aware) so the §L1 composite has real spatial frequency to refract. Until both land, the page cannot demonstrate its own subject.

2. **Each fold → its OWN `glass-quiet` card, staged over the live aurora (the user's explicit ask + the Control-Center idiom).** Convert the nine flat `tier="field"` frames into a stack/grid of discrete `glass-quiet` instrument tiles floating over the aurora wash — the DESIGN.md 7-tier elevation move (frame floats `floating`, tiles rest `quiet`), distinctive and on-brand. This single move converts the spec-sheet into a liquid-glass instrument stack.

3. **Make every plate ALIVE — entrance + hover + press + state morph (the iOS-27 bar).** Build the matrix in on `.scroll-cascade` (the register ships, W-SCROLL-MOTION); give the swatches a `--spring-smooth` hover lift + resting glint; make the deep/calm device a TOGGLE that animates `--glass-depth` so you watch the blur deepen; cross-fade the tint `color-mix` on switch. The library's spring physics (§L2) and tap choreography (§L3) must be SHOWN, not narrated.

4. **Stage ONE hero specimen + lead with the dock APIs.** Promote a single large `glass-overlay` interactive card (drag/hover to light all six layers, the §L1 composite made legible) as the focal lead; demote the matrix to a supporting strip. Use a `<SegmentedTabs>` or `<DockStack mode="facets">` to switch between the fold demos (refract / squircle / accent / deep / metal) — the "deftly use a series of glass-ui components" + "leverage the dock APIs" bar. Right now the page composes zero of the library's own showcase components.

5. **Introduce PAPER + the audacious ladder below the hero.** Close the page with a paper-grain `.scroll-cascade` notes band contrasting the oklab glass-tint vs srgb surface-tint axes (the math-paper gold standard), and let at least one demo headline ride the `text-display` ladder so the typography-forward identity reaches below the title.

### Smaller fixes
- **Tighten the SFC's superfluous language.** The script-block comments are 60+ lines of gate-lineage prose ("W-PRUNE2 E4-3 own-story exclusion", "the W23 ≤30% house ceiling") that belong in the gate, not the demo. The section blurbs are dense and over-qualified ("deliberately sub-perceptual 0.75px 18%-α white inset ring — subtle by design") — cut to the one-line read.
- **Standardize the import-path label.** The page's manifest subpath chip reads `/substrates/glass-material` (a local route) while exported-component pages read `@mkbabb/glass-ui/<subpath>`. glass-material demos no single exported component (it's a material matrix), so the local-route convention is defensible — but the convention must be DECIDED and applied uniformly across the substrates band (per Pass-E cross-cutting: 28 local vs 90 `@mkbabb`).
- **The degraded `@supports` cases need a label** (squircle/lens/chromatic on non-Chromium) so a Safari viewer knows the plate is showing the fallback, not a bug.
