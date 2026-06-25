# Pass-E META-STORYBOOK DEMO audit — `motion/scroll-choreography`

- **Import path:** `/motion/scroll-choreography`
- **SFC:** `demo/stories/motion/scroll-choreography.vue` (155 lines)
- **Live:** http://localhost:5173/motion/scroll-choreography
- **Manifest row:** `demo/stories/manifest.ts:1072` — no `opts`, so background inherits `motion → "constellation"` (`manifest.ts:191`), `variant="page"` (contained, not hero).
- **Audited live:** desktop 1440×900 light. Console clean (0 err, 1 benign warn).

This page demos the **scroll-choreography register** (`.scroll-build` page-build · `.scroll-cascade` section cascade · `.scroll-pin` pinned-stage), the SOTA native scroll-driven CSS. The register itself is real and the pin mechanism is wired — but the DEMO is one of the thinnest in the storybook: a single contained `wash` card holding flat prose + a 6-cell grid + a gray-slab pinned stage, over an essentially-invisible constellation. It does NOT meet the user's north-star bars (own glassy cards per sub-section · bigger main area · leverage dock APIs · series of glass-ui components · glass over COLORFUL aurora).

---

## (1) DEMO CONGRUENCE — does it show the register at its BEST + full API?

**Partial. The register's three recipes are present but under-demonstrated, and the marquee feature reads as broken.**

- `.scroll-build` (page-build): rides the StoryPage `<article>` mount automatically (`StoryPage.vue:86`). Fires on nav — correct, but invisible on a deep-link/refresh (you arrive at the terminal state). The demo has NO way to **replay** it (no "rebuild" button), so the headline recipe is un-exercisable on the page that exists to teach it.
- `.scroll-cascade` (section cascade): rides the StoryPage `<section>` wrap (`StoryPage.vue:167`). The 6-cell grid (`scroll-choreography.vue:100-117`) is the only visible cascade subject, and the cells are identical placeholder stubs ("Cascade {{n}} / Builds in on its own view() timeline") — a spec-sheet, not a designed specimen.
- `.scroll-pin` (the marquee): **wired but visually dead.** Live-confirmed `position: sticky; top: 0` on `.scroll-pin-stage` (the sticky IS working), but the pinned card renders as a flat **gray slab** (`oklab(0.725 … / 0.6)` glass-card) on a near-white page with the constellation receded to ~6 invisible dots (see `sc-pin.png`). The "fixed-stage-advances-time" read does not land because (a) there is no visible field to advance against, and (b) the phase-2 text is bare prose, not a second staged surface. The pin container is **2880px tall** for a single reveal+settle — an enormous dead-scroll tax for one gray card.
- **The new dock APIs (contextual-switching / morph / silhouette) are ENTIRELY ABSENT** — and this is a `motion` page where a dock advancing its own internal phase on the pin timeline would be the single most on-brand demonstration of "scroll advances time inside a scene." Live: `0` docks on the page.
- The capability badges (`scroll()`/`view()`/`timeline-scope` supported/fallback) are a genuinely good touch (`scroll-choreography.vue:58-90`) — the one piece doing real API-introspection work.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat. This is the headline defect.** Live DOM census of the page article:
- `.glass-dock` on page: **0**
- `[role="tablist"]` (SegmentedTabs): **0**
- `<button>` (Button): **0**
- procedural-anim (Aurora/GooBlob/etc. as a demo surface): **0** (the constellation is only the StoryHero backdrop, not a composed demo element)
- The entire "component" inventory is **7 raw `glass-card` divs + 10 `.rounded-pill` text spans + 1 StoryHero card.** The pills are hand-rolled `<span class="text-admin-label rounded-pill border">` (`scroll-choreography.vue:59-89`), NOT the `Badge` / `StatusDot` component.

The page composes **zero** interactive glass-ui components. The user's bar — "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" — is unmet by a wide margin. Compare: this register is a perfect host for a `<SegmentedTabs>` switching between the three recipes' live previews, `<Button>`s to replay `.scroll-build`, and a `<GlassDock>` whose layers advance on the `.scroll-pin` timeline.

## (3) GLASS SUFFUSION — glass over a LIVE COLORFUL field, or flat?

**Flat / wrong field.**
- Background is `constellation` (the muted violet-ink drift), NOT a **colorful aurora**. The user's bar is explicit: "glass demos over COLORFUL aurora backgrounds." Constellation at the contained-page `opacityCeiling` (0.4 light) reads as ~6 faint dots — live-confirmed near-invisible behind the wash card.
- The field is **BOXED, not full-bleed.** `variant="page"` ⇒ `.story-hero-bg` is `position: absolute` (live-confirmed) starting at y≈324 behind the single card — it is not the whole-page substrate. So even the muted constellation only lives behind the card, and the chrome header + page margins sit on dead `--background`.
- **Glass-cannot-sample-glass violation in spirit:** the 6 cascade cards + the pinned card are `glass-card` nested INSIDE the `wash` StoryHero card (`scroll-choreography.vue:104,136` inside `StoryHero` Card) — glass plates stacked on a glass plate over a near-dead field. The DESIGN.md six-layer optical composite cannot read; the result is the gray-slab look in `sc-pin.png`.
- **PAPER morphism: absent.** No `paper-grain-overlay` / blueprint-grid / fira-code-math specimen, despite `fira-code` being used only for inline `<code>` (`scroll-choreography.vue:49-126`). A scroll register is a natural place for a paper-vs-glass split (paper sections that build in, glass sections that pin).

## (4) STRUCTURE — own glassy card per sub-section? main area BIG enough?

**Both bars FAILED.**
- **Sub-sections are NOT in their own glassy cards.** The three `<StorySection>`s ("The register" · "Section cascade" · "Scroll-pinned showcase") are flat label+body stacks inside the ONE StoryHero `wash` card, separated only by the `--configurator-divider` hairline (`StoryPage.vue:171`). They are NOT individually carded. The user's bar — "each sub-section in its OWN glassy card" — is unmet: it's one big card with three flat regions. (The 6 cascade cells + the pinned card are cards, but they are content WITHIN a section, not the sections themselves.)
- **Main card area is NOT bigger — it is CONSTRAINED.** Live: `.story-page-article` `max-inline-size: 1152px` on a 1440px viewport ⇒ **288px of unused horizontal space** (the `--story-page-max-inline` token, `StoryPage.vue:87`). The user explicitly asks for "the main card area BIGGER (more screen space)." This is a tokenized cap applied storybook-wide, so widening it is a chassis decision — but for a scroll-CHOREOGRAPHY page (which wants room to breathe and stage), the narrow column is especially costly.
- The `.scroll-pin` container is 2880px tall for one gray card — that's the OPPOSITE problem (vertical bloat, horizontal starvation).

## (5) PATH-LABEL standardization

**OK / minor.** The subpath chip resolves to `/motion/scroll-choreography` via the chassis (`StoryHero.vue:70`, `manifest.ts` SUBPATHS fallback). It renders in the chrome header (visible in `sc-top.png` top-left as `.fira-code` text). Standard form is consistent with the storybook. No defect — the chip is present and correctly formed. (Note: the manifest category subpath is `@mkbabb/glass-ui/motion` (`manifest.ts:347`); this register ships as CSS recipes in `@mkbabb/glass-ui/styles`, not a JS symbol — the chip names the route, not an importable, which is the storybook convention and fine.)

## (6) LANGUAGE — superfluous prose to tighten?

**Yes — both the SFC comment header and the on-page prose are over-written (house writing-style flag: "no grandiloquence, no over-punctuation").**
- SFC header comment (`scroll-choreography.vue:2-17`) is 16 lines of dense prose restating the register; reads like a tranche spec, not a demo header. Tighten to ~4 lines.
- On-page prose leans on ALL-CAPS emphasis + em-dash pile-ups: "NO setTimeout cascade" (`:97`), "it advances time inside it" (`:122`), "the implicit stagger, NO setTimeout cascade" (`:96-97`). The three body `<p>`s each cram the mechanism + the caveat into one breath. The register is interesting; let the live demo carry the proof and cut the prose to one clean sentence per section.
- The phase captions ("Phase 1 — the reveal (0–45% of the container scroll)") expose internal implementation percentages to the demo viewer — fine as a teaching label, but the "(45–90%)" / "The scene is fixed; scroll advances its time" doubling (`:144-149`) is redundant with the section blurb above it.

## (7) BUGS

- **No hard JS bug** — console clean, sticky works, capability badges resolve.
- **VISUAL BUG (severe):** the marquee `.scroll-pin` stage reads as a dead gray slab with no visible field to advance against (`sc-pin.png`). The register's whole point ("scroll advances time inside a fixed scene") does not land. This is the close-class "source-green / visually-broken" gap the gestalt bar exists to catch.
- **DEAD-DEMO risk:** `.scroll-build` fires only on route-nav; on refresh/deep-link the headline recipe never plays and there is no replay affordance — a viewer landing here cold sees a static page and never witnesses the page-build at all.
- **Cascade cells are placeholder stubs** ("Cascade 1..6 / Builds in on its own view() timeline") — they teach nothing about WHAT cascades; they're scaffolding left in.

---

## Recommended redesign (gestalt, north-star aligned)

1. **Background → COLORFUL aurora, full-bleed.** Switch this row to an aurora hero (or at minimum override `background` to an aurora palette) so the glass actually reads over a live colorful field. Constellation-on-a-contained-page is the wrong substrate for a glass-suffusion demo.
2. **Each sub-section in its OWN glass card** (`<Card tier="quiet">` per register), floating over the live aurora — the three recipes become three carded specimens.
3. **Compose the component series:** a `<SegmentedTabs>` over the three recipes; `<Button>`s to **replay** `.scroll-build` / step the cascade; and — the on-brand move — a `<GlassDock>` (or `<DockStack>`/`DockLayerGroup`) whose **active layer advances on the `.scroll-pin` timeline** (contextual switching driven by scroll = the literal "scroll advances time inside a scene"). This is the single highest-value change: it uses the new dock APIs AND makes the pin demo finally read.
4. **Pin stage:** put a real staged surface inside (a procedural-anim or a morphing dock), not a gray text card; shrink the 2880px container to a sane reveal+settle length.
5. **Widen the main area** (chassis token `--story-page-max-inline`) or let this page opt to a wider rung — reclaim the 288px.
6. **Tighten prose** (SFC header → 4 lines; one clean sentence per section; drop the ALL-CAPS/em-dash pile-ups; replace placeholder cascade stubs with real content).
