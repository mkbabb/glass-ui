# Pass-E deep audit — `substrates/blob` (GooBlob demo)

- **Import:** `@mkbabb/glass-ui/goo-blob`
- **SFC:** `demo/stories/substrates/blob.vue` (871 lines)
- **Live:** http://localhost:5173/substrates/blob (spot-checked 1440×900, dev server up)
- **North star:** DESIGN.md (iOS-26/27 six-layer composite · 7 tiers · glass-cannot-sample-glass · spring physics) · design-idioms / motion-canon / affordance-map · PROCEDURAL-SUITE.md · the dock system APIs
- **Sibling reference:** `substrates/aurora.vue` — already migrated to the shared `VizStudio` chassis (configurator-RIGHT, rounded `viz-studio` frame, hero-subpath chip, shrink-on-scroll). **blob.vue was NOT migrated** — it is the un-converted twin.

---

## VERDICT SUMMARY (severity-ranked)

| # | Severity | Finding |
|---|----------|---------|
| F1 | **BUG / P0** | Sticky shrink-on-scroll hero does NOT shrink + has no opaque backplate → the giant translucent "GooBlob" `<h1>` overlaps & bleeds through every scrolled-under section (ghost row, pause seam). |
| F2 | **P0** | Double display-header: page-chassis hero (`GooBlob` + eyebrow + blurb) is immediately followed by a SECOND `<header>` masthead (`Blob Studio`, violet `text-display-3`). Two competing display titles stacked. |
| F3 | **P0** | Background is flat `paper` (manifest `background:"paper"`) — the glass studio is NOT over a colorful aurora field. Violates the binding ask "glass demos over COLORFUL aurora backgrounds." Aurora's page is over `aurora`; blob's is dead warm-grey. |
| F4 | **P1** | Does NOT compose the shared `VizStudio` chassis (`hasVizStudio:false`). Hand-rolls a bare `<Configurator>` → loses the standardized rounded frame, the hero-subpath integration, the masthead handling (root cause of F1/F2), and the single-writer chassis discipline. |
| F5 | **P1** | Dock APIs essentially unused. Only `DockBackgroundToggle` (a pause button) is present — ZERO contextual-switching / morph / `DockStack` / `DockLayer` / `DockSection`. User explicitly asked to "leverage the dock APIs (contextual switching/animating)." No `SegmentedTabs`/`ToggleGroup` either. |
| F6 | **P2** | 4 lower sections are thin flat single-specimen cards (plain blob, watercolor grid, ghost grid, pause seam) — not a deft *series* of composed glass-ui components. |
| F7 | **P2** | a11y: 16 unlabeled form fields + 9 incorrect `<label for>` (the studio sliders/selects use `hide-label` without a wired accessible name). |
| F8 | **P3** | Verbose visible blurbs — superfluous prose to tighten across all 5 `StorySection` blurbs. |

---

## (1) DEMO CONGRUENCE — does it show GooBlob at its BEST + exercise the FULL API?

**Strong on API breadth, weak on presentation.** The studio (`blob.vue:459-758`) is genuinely comprehensive: it drives `useConfiguratorState<BlobStudioCfg>` with `cloneMode:"per-preset"` (line 242), 3 presets (calm/excited/shy, the attraction-sign showcase), and surfaces ~15 live axes across 4 `ConfiguratorLayer` sections — Interaction (attraction/clickImpulse/responsiveness), Mood+palette (mood/seed/harmony/stops), Surface STAGE-2 (lit/shadow/softness), Geometry/Satellites (count/orbit/radius/ecc/smoothK/merge). It exposes `setMood()`, `pulse()` (the Poke button, line 549), and `v-model:paused`. This is a real exercise of the full atom surface.

BUT the *contextual switching / animation* the user wants is absent at the page level:
- No mood→mood *animated arc transition* demo (the `{valence,arousal}` model is dialed but never shown as a live morph between moods).
- No dock contextual switch (F5) — the page could host a `<DockLayerGroup>`/`<DockStack>` to switch *between* the studio / plain / static registers as morphing layers instead of stacked flat sections.
- The stage canvas reads as a flat gray slab in situ (`canvasSize 300×150` default-buffer at capture; rendering but POP-less) — the metaball orbit→merge show the comments promise (`blob.vue:680-688`) is not visually arresting over the dead background (F3).

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Mixed.** The studio section deftly composes `Configurator` + `ConfiguratorLayer` + `ConfiguratorRow` + `LabeledSlider`/`LabeledSelect`/`LabeledSwitch` + `FadingScroll` (preset row, `:477`) + `WatercolorDot` (palette stops) + `GooBlob`. That is a strong cluster.

The other 4 sections are flat (F6): each is a single `<ShowcaseFrame>` wrapping ONE specimen or a `grid` of `WatercolorDot`s. No `Card`/`SegmentedTabs`/`Button`/dock composition. The page front-loads everything into one studio and lets the rest decay to spec-sheet rows — the opposite of "each page deftly uses a SERIES of glass-ui components."

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FLAT — the headline defect (F3).** `manifest.ts:565` sets `background:"paper"` for the blob row with the rationale "a GooBlob is a CONTAINED creature, not a page-field." That rationale is sound for *not making the blob full-bleed*, but it threw out the colorful field entirely. The user's binding ask is glass over COLORFUL aurora. The studio's glass chrome (`glass-quiet` preset chips, the `ShowcaseFrame tier="quiet"`) has nothing colorful behind it, so the six-layer optical composite (backdrop blur+saturate, the "concentrated light" saturation channel — DESIGN.md §L1) reads as near-zero: there is no chroma to refract. **PAPER morphism is also absent** despite `background:"paper"` — there is no visible paper-grain/blueprint treatment, just a flat warm-grey wash.

Compare aurora.vue (`manifest substrates default → "aurora"`, the stage is `<AuroraStage>` live GL) — its glass inspector reads as liquid glass over a live field. blob.vue should put the studio + plain/static specimens over a contained-but-colorful aurora wash (the DockStage pattern: ONE shared offscreen-paused `<Aurora>` behind the demo column, respecting the one-GL-per-route budget alongside the blob's own context).

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

- **Per-section card: partial.** Each `StorySection` wraps a `ShowcaseFrame` (a card), so sub-sections ARE in cards — but they are flat `bg-card`/`bg-card/40` plates (`tier="quiet"`/default), not glassy-over-a-field, so the "glassy card" reading is lost (F3).
- **Main card BIG: borderline.** The studio Configurator is `class="h-[min(70vh,560px)]"` (`blob.vue:461`). Aurora's VizStudio default is `h-[min(78vh,720px)]`. The blob studio is the smaller envelope. The user asks the main card area BIGGER / more screen space — adopt the 78vh/720px envelope (and the rounded `viz-studio` frame).
- **Layout: configurator-RIGHT is correct** (`data-aside-side:"right"`, grid `622px 360px` measured) — but only because the bare `<Configurator>` default happens to be right; it is not the recorded VizStudio contract (F4).

## (5) PATH-LABEL standardization

**PASS at the chassis level.** `manifest.ts:221` `"substrates/blob": "@mkbabb/glass-ui/goo-blob"`; StoryPage renders the Fira-Code chip from the manifest (live chip reads `@mkbabb/glass-ui/goo-blob`, screenshot-confirmed). No in-SFC hard-coded path label to standardize. The SFC imports from deep relative `../../../src/components/custom/goo-blob` (correct for demo-internal). **One nit:** the blurbs say "Shipped /goo-blob + /watercolor-dot" (`manifest:561`, and section blurbs) — the bare-slash short form diverges from the full `@mkbabb/glass-ui/goo-blob` chip form; standardize to the full subpath in prose.

## (6) LANGUAGE — superfluous prose to tighten

The visible blurbs are over-written (the MEMORY writing-style: no grandiloquence). Examples:
- `blob.vue:452` studio blurb: 95 words, repeats "the same studio shell Aurora composes" + a full mechanics dump. Tighten to ~30 words.
- `blob.vue:764` plain-blob blurb: "the 'it renders, it meatballs, it works on Safari' floor that proves the field is alive before STAGE 2 dresses it" — internal-process prose, cut.
- `blob.vue:786` / `:807` watercolor + ghost blurbs are mechanics paragraphs (turbulence filter, stroke-dasharray internals) — demote internals to a tooltip; the blurb should state the *register*, not the implementation.
- The double "DEMOTED below the hero" / "the SUPPORTING register below the living hero above" repetition across sections — say it once.

(Source-comment verbosity `blob.vue:1-11, 41-51, 59-179, 426-436, 467-475, …` is enormous but source-only; lower priority — though it signals the un-converted hand-rolled state vs aurora's clean VizStudio compose.)

## (7) BUGS

- **F1 (P0):** `story-hero-shrink` cluster is `position:sticky` (confirmed via computed style) and pins at top while body scrolls under it, but it does NOT shrink and has no opaque backplate → the 129px-tall translucent "GooBlob" `<h1>` overlaps the ghost-register row and the pause-seam section (screenshot-confirmed: hero text bleeding over body content at scroll-bottom). Root cause: blob.vue renders a SECOND `<header>` masthead (F2) outside the StoryHeader cluster, and doesn't ride the VizStudio/StoryPage chassis that owns the shrink + backplate (F4).
- **F7 (P0 a11y):** console issues — "No label associated with a form field (count 16)", "Incorrect use of `<label for=FORM_ELEMENT>` (count 9)". The `hide-label` LabeledSlider/Select rows don't wire an accessible name to the inner control.
- Vue warn (P3): `<TooltipProvider>` non-element root inside `<Transition>` — benign but logged.

---

## RECOMMENDED FIX (architectural, gestalt — not patches)

1. **Migrate blob.vue onto `VizStudio`** (the aurora.vue shape): `<VizStudio heading="Blob" subpath-chip … height-class="h-[min(78vh,720px)]" scroll-mode="never">` with `#masthead` / `#stage` / `#controls` / `#presets` slots. This auto-fixes F1 (chassis owns shrink+backplate), F2 (one masthead via `#masthead`), and the BIG-frame ask (F4 + structure §4). Delete the duplicate `<header>Blob Studio</header>`.
2. **Put the studio + specimens over a CONTAINED colorful aurora** (F3): flip the manifest blob row to a colorful background OR adopt the DockStage pattern — ONE offscreen-paused `<Aurora>` wash behind the demo column, the blob's glass chrome refracting it. Keep the blob CONTAINED (don't go full-bleed). Add the paper-grain treatment where the paper register is wanted.
3. **Leverage the dock APIs** (F5): host the studio/plain/static registers as a `<DockLayerGroup>` or `<DockStack>` contextual switch with morph animation between layers, instead of 4 stacked flat sections (F6). The page should *demonstrate* the contextual-switching dock system it has access to.
4. **Tighten every visible blurb** to ~30 words, register-not-implementation (F8); standardize "Shipped /goo-blob" → `@mkbabb/glass-ui/goo-blob`.
5. **Wire accessible names** on the `hide-label` control rows (F7).
