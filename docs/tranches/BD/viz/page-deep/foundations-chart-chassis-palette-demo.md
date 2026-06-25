# Pass-E deep audit — foundations/chart-chassis-palette

- Import path: `/foundations/chart-chassis-palette`
- SFC: `demo/stories/foundations/chart-chassis-palette.vue` (113 lines)
- Live: http://localhost:5173/foundations/chart-chassis-palette (verified on :5173; :5199 down)
- Category default background: `foundations → paper` (manifest.ts:182) — page passes NO `background` override, inherits paper
- Live spot-check: 5 sections, 0 `<canvas>`, chassis present, card width 1086px of 1440px viewport (~75%), all 5 sections share ONE flex stack (`.story-sections > *` all `flex flex-col gap-3`)

## VERDICT SUMMARY

This is a **flat token spec-sheet wearing a demo's clothes**, not a designed demo. It is the canonical anti-pattern the BD north star condemns: swatch ladders + mono captions stacked in one shared card, zero live colorful field, zero glass morphism, a near-dead `InstrumentChassis` showing only region-label text, and a final section that is pure internal-refactor prose with NO demo content. Of the 7 user mandates it satisfies ~1.5 (path-label OK; main card is borderline-narrow). It fails congruence, component-series composition, glass-over-aurora suffusion, and per-subsection carding.

---

## (1) DEMO CONGRUENCE — does it show components at their BEST + full API?

**FAIL — thin and flat.** This is a *token* page (chart aliases + chassis opacities), so the natural protagonists are (a) the chart palette **on a real chart/viz** and (b) the `InstrumentChassis` **running its phase bus**. Neither happens.

- **Chart palette shown as dead swatches only.** Sections 1+2 (chart-chassis-palette.vue:39–72) paint the four `--chart-*` hues as `size-12` static tiles — TWICE (the `TokenLadder` stacked rows at :44, then again as bare `:style="{ background }"` tiles at :64). This is a duplicate swatch grid. The chart palette's REASON TO EXIST is data-viz; the page never paints a single chart, sparkline, progress bar, or procedural-suite viz that *consumes* the palette. The `<Progress variant="sectioned">` phase-bus (which literally renders these `--chart-*` hues as a live blended fill) is the obvious protagonist and is absent.
- **`InstrumentChassis` is near-dead.** chart-chassis-palette.vue:93 mounts `<InstrumentChassis phase="ready">` with three text-only slots (`strip region` / `dial region` / `control region`, :95–102). The chassis ships a SIX-member phase union (`ready | ping | download | upload | jitter | complete`, CLAUDE.md §InstrumentChassis phase canon) with a live `--phase-color` bus, the `--phase-complete-color` earned-gold seam, twin-line region dividers, engraved bezel, and a curvature overlay. NONE of the phase API is exercised — no phase switcher, no live meter `<canvas>`, no `complete`-gold reveal. The blurb (:90) *describes* the bezel/dividers/curvature but the demo doesn't animate or switch anything. This is the exact "demo describes, doesn't show" gap.
- **Contextual switching / animation: entirely absent.** No tabs, no dock contextual-switch, no phase cycling, no procedural anim. The page has ZERO interactive affordance.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components?

**FAIL — one component (`InstrumentChassis`, statically) + one demo-chassis primitive (`TokenLadder`).** The SFC imports exactly: `StoryPage`, `StorySection`, `ShowcaseFrame`, `TokenLadder`, `InstrumentChassis` (chart-chassis-palette.vue:8–13). Of these only `InstrumentChassis` is a real library component, and it's inert. There are NO docks, NO tabs, NO buttons, NO cards (beyond the demo `ShowcaseFrame`), NO procedural-anims. The BD bar — "each page deftly uses a series of glass-ui components" — is unmet. Candidate compositions left on the table:
  - `<Progress variant="sectioned">` rendering the chart palette as a live phase bus (the single best fit).
  - A `<SegmentedTabs>` / dock contextual-switch to flip the chassis through `ready → ping → … → complete`, animating the `--phase-color` bus + the `complete` gold seal (`<CompletionSeal>`).
  - `<BorderProgress>` walking the `--chart-*` brand spectrum as a card border.
  - `<MetricCell>` / `<MetricStack>` reading `iconColor` off the chart tokens (the real consumer shape).

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL — flat paper-default, no aurora, glass morphism does not read.** 0 `<canvas>` live. The page inherits `foundations → paper` (manifest.ts:182) and never declares an aurora background, so the swatches + chassis sit on a flat near-white (light) / near-black (dark) field. The six-layer Liquid-Glass optical composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) has nothing behind it to refract — the glass reads as gray plates (light) / charcoal slabs (dark), exactly the BG-2 black-plate defect. `ShowcaseFrame` is used at the **default `resting` tier** (opaque `bg-card` plate) at every site (:43, :57, :78, :92) — never `tier="field"`, so even if an aurora were added the opaque plate would occlude it. For a page demoing the **chart + chassis color identity**, a live aurora/constellation field tinted with those very `--chart-*`/`--viz-*` hues is the obvious suffusion. PAPER morphism: the page is nominally paper-default but no `paper-grain-overlay` / blueprint-grid / `border-l-[3px]` accent rail is composed — paper morphism is unexpressed too.

## (4) STRUCTURE — each subsection in its OWN glassy card? main card BIG enough?

**FAIL on carding; BORDERLINE on size.**
- **One shared card, not per-subsection.** All 5 `StorySection`s flow inside ONE `StoryHero` glass card (StoryPage.vue:128–178; live: 5 sections in one `.story-sections` stack, divided only by the `--configurator-divider` hairline). The user mandate "each sub-section in its OWN glassy card" is NOT met — sections are hairline-delimited rows in a single plate. Each of the 5 sections should be its own glass card (ideally `tier="field"` glass over the live field).
- **Main card ~75% width.** Live card width 1086px / 1440px viewport. The `--story-page-max-inline` bound caps it. The user asks for the main card area BIGGER / more screen space — the current ~75% with large left/right gutters (and a very large empty top hero band) leaves real estate unused. The audacious `text-display` title eats the top third; the actual demo content (4 tiny swatch grids + 1 dead chassis) is sparse, so the card reads mostly empty.

## (5) PATH-LABEL standardization

**PASS.** The Fira-Code chip renders `/foundations/chart-chassis-palette` (live-confirmed; sourced from `SUBPATHS` map manifest.ts:216 → StoryPage.vue:102 `:subpath`). Matches the standard. No action.

## (6) LANGUAGE — superfluous prose to tighten?

**Several.**
- **Section 5 "resolved drift" is pure internal-refactor prose with NO demo (chart-chassis-palette.vue:107–110).** "Pre-V the storybook referenced --viz-topology and --viz-recursion — neither token exists in the canon. This page replaces those references…" — this is a changelog note leaking into a user-facing demo. DELETE the section entirely (it has no content slot, renders as an empty labeled paragraph).
- **SFC header comment (chart-chassis-palette.vue:1–7)** restates the obvious; trim.
- **Blurbs are over-long & meta.** :41 "Consumers paint with the semantic alias; the basis can shift without touching call sites." and :55 "one place to verify the chart palette reads at swatch scale" and :90 "Slot content is intentionally minimal so the chrome reads" — these editorialize about *why the demo is built this way* rather than describing the component. Tighten to one crisp line each; drop the self-referential meta ("intentionally minimal so the chrome reads").
- Sections 1 and 2 blurbs describe the SAME palette as swatches — the duplication should collapse into one section, freeing the prose.

## (7) BUGS / dead demos

- **Dead section (no content):** Section 5 `resolved drift` (chart-chassis-palette.vue:107) renders a label + blurb and NOTHING else — a labeled empty block. Visible live as a bare caption+paragraph at page bottom. Should be removed.
- **Duplicate swatch grid:** Sections 1 (`TokenLadder` stacked) and 2 (bare `:style` tiles) paint the identical four `--chart-*` hues at `size-12` — redundant. Not a crash, but a content bug (two views of one thing).
- **Inert chassis:** `phase="ready"` with text-only slots — no live meter, no phase motion. Reads as a static framed box, not the InstrumentChassis at its best. Not broken, but functionally dead as a demo.
- No console errors / broken animations observed in the static render.

---

## RECOMMENDED REBUILD SHAPE (for the BD page-fix wave)

1. Declare a **live aurora background** tinted with the `--chart-*`/`--viz-*` palette (the page's own subject), so the glass + chassis read over a colorful field.
2. **Per-subsection glass cards** (`ShowcaseFrame tier="field"` or real `<Card>` glass tiers), each floating over the aurora.
3. **Chart palette as a LIVE consumer:** one `<Progress variant="sectioned">` phase bus + optionally `<BorderProgress>` walking the spectrum — collapse the two dead swatch sections into ONE compact reference strip beside the live demo.
4. **Chassis at its BEST:** a `<SegmentedTabs>` or dock contextual-switch cycling `ready → ping → download → upload → jitter → complete`, animating `--phase-color` + firing `<CompletionSeal>` gold on `complete`.
5. **Delete** the `resolved drift` section.
6. Widen/fill the main card; tighten all blurbs to one component-describing line each.
