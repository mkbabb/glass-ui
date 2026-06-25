# Pass-E deep audit — substrates/paper-grid

- **Route**: `http://localhost:5173/substrates/paper-grid`
- **Import**: `@mkbabb/glass-ui/paper-grid`
- **SFC**: `demo/stories/substrates/paper-grid.vue`
- **Component**: `src/components/custom/paper-grid/PaperGrid.vue` (+ `usePaperGrid` / `createGpuSubstrate`)
- **Manifest row**: `demo/stories/manifest.ts:670` — `background: "grid"`, `hero: true`, `heroScale: "hero"`
- **Live inspected**: desktop 1440×900 (DPR 2) + narrow 500px; console; canvas backing-store + paint sampling.

---

## VERDICT SUMMARY

The page is a **thin single-card configurator studio** whose live specimen is **near-invisible and rendering at the wrong resolution**, with a **hero-title-over-stage z-collision**, demoed over a **flat near-white page (no live aurora)**. It does NOT compose a series of glass-ui components, does NOT use the shared `VizStudio` chassis its siblings (aurora) adopt, and the blurb is heavily over-written. The path label is correct. Multiple BUGS.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**WEAK + BUG.** The full `PaperGridConfig` API surface IS exercised via 4 `ConfiguratorLayer`s (Grid / Liquid / Pointer bulge / Presets) — cellSize, majorEvery, minor/major alpha, lineWidth, wave amplitude/scale/speed, fieldAlpha, interactive, bulge strength/radius/mode, + 3 presets (warm/suffuse/bold). API coverage is genuinely complete. BUT the component is **not shown at its best**:

- **BUG-1 (PRIMARY) — the grid is near-INVISIBLE.** The warm-cream `--foreground`-ink-over-transparent default (`PaperGrid.vue:60-74`, `presets.ts:98` `PAPER_GRID_PRESET_WARM`) draws warm ink over the **flat near-white page substrate** (`background:"grid"` static wash). Warm ink on near-white ≈ no contrast. Live: the left stage reads as a blank near-white panel — the "evenly-spaced LARGER lines that morph + wave" the blurb promises do not visibly read. The whole *point* of the viz (liquid curl-warp grid) is lost. The default lead preset must demo over a ground that makes the ink read (a darker/aurora field, or a bolder default alpha).
- **BUG-2 — canvas backing-store stuck at 300×150.** Live: `canvas.getBoundingClientRect()` = **673×627** CSS px but `canvas.width/height` = **300×150** (the default unsized HTML canvas). DPR 2 → should be ~1346×1254. The `createGpuSubstrate` resize path never sized the backing store, so the field is upscaled from a 300px buffer — the "one device-pixel crisp at any DPR (Ben Golus AA)" claim is **falsified live**. NOTE: this reproduces on the sibling `dot-flow-field` too (CSS 1033×460, backing 300×150) → it is a **shared `useGpuSubstrate` WebGPU-path sizing regression**, not paper-grid-local — but it lands ON this page as a low-res near-invisible grid. Fix belongs in the substrate; the page is the witness.
- The "contextual switching / animation / new dock APIs" the audit asks for: **absent.** The page uses NO dock-morph / contextual-switching API. The only dock touch is a single `<DockBackgroundToggle>` pin (`paper-grid.vue:141`) for pause/play — a correct WCAG-2.2.2 affordance but not a "deftly leverage the dock APIs" composition.

## (2) COMPONENT ABILITY — does it compose a SERIES of glass-ui components?

**THIN.** The page composes exactly: `StoryPage` + `StorySection` + ONE `Configurator` (with `ConfiguratorLayer`/`ConfiguratorRow`/`LabeledSlider`/`LabeledSwitch`) + `PaperGrid` + one `DockBackgroundToggle`. No **Tabs**, no **Buttons** (the configurator presets are Switches, not the audacious button register), no **Cards** beyond the single configurator shell, no second **procedural-anim**, no **dock contextual-switching**. It is a single-instrument inspector, not the "series of glass-ui components" deftly-composed page the mandate names. Compare `VizStudio.vue` (BC.W-VIZ-CONFIGURATOR-SUITE) — the ONE shared chassis aurora adopts; **paper-grid hand-rolls `<Configurator>` directly and skips VizStudio** (so does concentric/blob/fourier-field — a fleet-wide inconsistency, but this page is in scope).

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL (flat).** The configurator card IS real glass (`glass-floating`, live `backdrop-filter: blur(13px) saturate(1.18)`, `oklab(...) / 0.84` tint — verified live). BUT it floats over a **flat near-white page** (`background:"grid"` is a static CSS wash, no `<Aurora>`). The six-layer Liquid-Glass optical composite cannot read — there is nothing colorful behind the blur to refract. The user mandate "glass demos over COLORFUL aurora backgrounds" is unmet. PAPER morphism: the page is literally a paper-grid viz, so paper is the subject — but it is demoed in a glass card over white, so neither morphism reads richly. (Manifest comment at `:666` claims the static `grid` wash is deliberate for the one-GL-per-route budget — but the viz self-stages its own GL anyway, so a live aurora *behind the card* would not break that budget and would make the glass + the grid both read.)

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**PARTIAL + BUG.**
- **Sub-sections in own cards: NO.** All 4 logical groups (Grid / Liquid / Pointer bulge / Presets) live INSIDE one `Configurator` as `ConfiguratorLayer` dividers (`paper-grid.vue:148-315`) — hairline-divided rows in ONE card, not "each sub-section in its OWN glassy card." `.story-sections > *` count = 1 (one StorySection).
- **Main card BIG enough: borderline.** `Configurator class="h-[min(78vh,720px)]"` → live stage 673×627. The stage is roughly half the card width (controls take 359px). The user asks for "the main card area BIGGER (more screen space)." The hero title eats the entire first viewport (244.8px font), pushing the card below the fold — the live specimen never gets a full-screen presence.
- **BUG-3 — hero title z-collision over the stage.** Live: `.story-hero-title` is `position:sticky; top:0; z-index:2; font-size:244.8px` and **overlaps the configurator stage** (`heroTitleOverlapsStage: true`; title rect y65→322, stage top 90). The iOS-27 "large-title shrink-on-scroll" (`story-hero-shrink`) does **not** shrink here — the 244px "Paper Grid" slides over the left stage region, colliding with the grid canvas. A real visual defect on every scroll.

## (5) PATH-LABEL standardization

**PASS.** `paper-grid.vue:127-129` renders `<code>@mkbabb/glass-ui/paper-grid</code>`; the StoryPage chassis ALSO renders the Fira-Code subpath chip from `manifest.ts:228` (`"substrates/paper-grid": "@mkbabb/glass-ui/paper-grid"`). Both correct + consistent. NOTE: the in-body `<p><code>` label (`:127`) DUPLICATES the chassis chip — the chassis already shows `@mkbabb/glass-ui/paper-grid` above the card, so the in-body repeat is redundant and should be dropped (W-HIERARCHY2 puts the chip ON the chrome header, not IN the card).

## (6) LANGUAGE — superfluous prose to tighten

**FAIL — heavily over-written.** Three offenders:
- `paper-grid.vue:125` (`StorySection blurb`) — a **single ~140-word sentence** packing Ben Golus / Iñigo Quílez / Bridson / divergence-free curl / device-pixel / WebGPU-first / WebGL2-fallback / cursor-bulge / repel-attract / warm-cream-transparent. Reads as implementation notes, not a demo descriptor. Tighten to ~2 short sentences; move the citations to the README.
- `paper-grid.vue:320-333` (trailing `<p>`) — restates `g(uv) = uv + curlWarp + cursorBulge`, the IQ domain-warp, Golus AA, PRM-freeze, the suffusion `fieldAlpha ≈ 0.12`. Pure dev-prose under the card. Cut or compress to one line.
- The SFC header comment (`:1-7`) and `presets.ts:85-122` carry the same grandiloquent §E / "felt MORE" / "blurry-mess fix" register. Per the writing-style memory (no grandiloquence, no editorializing) — tighten the tooltips too (`"the GLOBAL subtlety knob (suffusion → tiny)"`, `"felt, not loud"`).

## (7) BUGS (collected)

- **BUG-1**: grid near-invisible — warm ink over flat near-white, no contrast (lead default + flat ground).
- **BUG-2**: canvas backing-store stuck at 300×150 vs 673×627 CSS (DPR2) → low-res upscale; shared `useGpuSubstrate` WebGPU-path resize regression (also repros on dot-flow-field).
- **BUG-3**: `.story-hero-title` (244.8px, sticky, z-2) overlaps the configurator stage on scroll — shrink-on-scroll not firing.
- **MINOR**: console `[Vue warn] Component inside <Transition> renders non-element root node that cannot be animated` (TooltipProvider/StoryPage root) — benign but recurring.
- **MINOR**: in-body path `<code>` (`:127`) duplicates the chassis subpath chip.

---

## RECOMMENDED FIXES (architectural, no workarounds)

1. **Mount a live `<Aurora>` (or a colorful field) behind the configurator card** so the glass + the warm-ink grid both read (manifest `background` → a live colorful substrate, or a stage-local field), and lift the lead default's contrast so the grid is visible at rest.
2. **Adopt `VizStudio` (BC.W-VIZ-CONFIGURATOR-SUITE)** like aurora — the single-writer configurator-right + rounded + hero-subpath chassis — instead of hand-rolling `<Configurator>`; gives a bigger, consistent stage + drops the duplicated chip + the trailing dev-`<p>`.
3. **Fix the substrate canvas-resize** (`createGpuSubstrate` WebGPU path) so the backing store tracks `cssSize * DPR` — this restores the Golus device-pixel-crisp claim across the whole viz suite.
4. **Fix the hero-title shrink-on-scroll** so the 244px title collapses to a slim sticky header and clears the stage (z-collision).
5. **Compose a real series** — add a Tabs/Buttons preset-switcher (the audacious button register over the Switch chips), and leverage a dock contextual-switch API to swap between the warm/suffuse/bold registers as a "deft" composition.
6. **Tighten prose** — the blurb to ~2 sentences, drop the trailing `g(uv)` `<p>`, de-grandiloquize tooltips + comments.
