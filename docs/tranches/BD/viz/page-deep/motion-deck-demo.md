# Pass-E page-deep audit — `motion/deck`

- **Page**: `motion/deck` · import `@mkbabb/glass-ui/deck`
- **SFC**: `demo/stories/motion/deck.vue` (136 lines)
- **Live**: http://localhost:5173/motion/deck (1440×806 spot-check)
- **Component (`/deck`)**: `src/components/custom/deck/` — `useDeck` · `useDeckKeyboard` · `installDeckSpring` · `<DeckPager>`
- **Verdict**: WORKS but THIN + FLAT. The deck functions (Next advances, pager has 6 dots, keyboard paged), but the page is a single small gray slab over a near-invisible field — it neither shows the component at its presentational BEST nor composes the glass-ui series the north star demands.

---

## 1. DEMO CONGRUENCE — does it show `/deck` at its BEST + exercise the FULL API?

**Partial.** The deck core IS exercised and is live-correct:

- `useDeck(6, { label })` — headless index/progress/liveMessage ✓ (`deck.vue:31`)
- `useDeckKeyboard(deck)` — Arrow/Space/digit ✓ (`deck.vue:34`)
- `installDeckSpring()` — lazy keyframes count-up easing ✓ (`deck.vue:35`)
- `<DeckPager :window-fit="6">` — windowed dots ✓ (`deck.vue:80`, 6 dots live-confirmed)
- aria-live announcer `sr-only` ✓ (`deck.vue:91`)
- Next/Prev live-verified: clicking Next moved `Welcome → Keyboard-paged` ✓

**Gaps against the component's OWN stated identity:**

- The README (`deck/README.md:3`) calls this the **"full-viewport"** presentation register. The demo renders it as a **224px-tall `min-block-size` box** (`deck.vue:102`; live `rectH:224`) — the antithesis of full-viewport. The single feature that distinguishes `/deck` from `/carousel` (whole-slide, full-bleed paging) is the one the demo does not show.
- **`deck.progress` is never demonstrated.** `useDeck` ships a `progress` computed (1-based % for a bar — `useDeck.ts:18,44`) that the demo computes but never renders. The obvious affordance — a `<BorderProgress>` ring or a `<Progress>` bar driven by `deck.progress` — is absent. This is a first-class API member shown nowhere.
- **`window-fit` is a no-op here.** `:window-fit="6"` on a 6-slide deck windows nothing (the window equals the total). The windowing oracle — the whole point of `<DeckPager>` over a flat dot row — is invisible. A 12–15-slide deck (or `:window-fit="5"`) would actually demonstrate the windowed dots + the focus-survival-across-recompute the README sells (`DeckPager.vue:11-14`).
- **`onChange` / hash-sync** (a marquee README usage, `README.md:45`) is not wired — fine for a demo, but combined with the above the page demonstrates ~half the surface.

## 2. COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**No — it is thin.** Live component census (`deck.vue`):

| Component | count |
|---|---|
| `<StorySection>` | 1 |
| `<DeckPager>` | 3 (one real + the v-model author) |
| `<Button>` | 3 (Prev / Next / one in-slide) |
| glassy cards in body | **1** (the single `glass-quiet` stage) |

Sibling motion pages set the bar far higher — `motion/curve-gallery.vue` composes `4×Configurator + 6×EasingPicker + 4×FadingScroll + 3×StorySection + Button`. The deck page composes a `<section v-for>` of plain `<div>`s and 3 buttons. **Zero** dock, tabs, card-family, or procedural-anim composition. The north-star ask ("each page deftly uses a series of glass-ui components: docks/procedural-anims/cards/tabs/buttons") is unmet.

**The dock-API leverage (explicitly requested) is absent.** A presentation deck is the canonical home for the dock's contextual-switching/morph APIs — a `<GlassDock>` transport bar (Prev/Next/play + a `<DockStack mode="facets">` chapter switcher per slide-group, `<DockSection>` zones) would replace the bare 3-button row AND demonstrate the contextual-switching the brief names. The demo hand-rolls a flat flex row of ghost buttons instead (`deck.vue:76-88`).

## 3. GLASS SUFFUSION — is the glass over a LIVE colorful field?

**Effectively flat.** The page DOES sit over a live constellation canvas (`constellation-canvas`, 1152×621, the `motion → constellation` category default — `manifest.ts:191`), and the deck stage IS real glass (`deck.vue:53` `glass-quiet`; live `oklab(0.72 / 0.6)`, `backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)`). But the gestalt reads as a **gray slab**, not liquid glass:

- The constellation field is a faint monochrome dot-web at low opacity (StoryHero wash tier, `blur(1px)` — live `oklab(.887 / 0.328)`); behind a *second* glass plate (the stage), there is almost no color or structure left to refract. The screenshot shows a flat warm-gray rectangle.
- The brief is explicit: **"glass demos over COLORFUL aurora backgrounds."** Constellation is monochrome by nature; the deck stage wants an **`<Aurora>`** field (or `<DockStage>`'s shared offscreen-paused aurora) so the six-layer optical composite actually reads. As-is, the glass-cannot-sample-glass stacking (StoryHero glass card → glass-quiet stage) doubly-mutes the field.
- **PAPER morphism**: absent and not obviously apt here — acceptable.

## 4. STRUCTURE — own glassy card per sub-section? main card BIG enough?

**Fails both explicit asks.**

- **Not one-card-per-sub-section.** All 6 slides live in ONE `glass-quiet` stage (`deck.vue:53-73`); the Prev/pager/Next controls and the announcer sit *outside* any card, bare on the page. `distinctGlassCards` in the body = **1** (live). The brief wants each sub-section (the stage, the nav/pager cluster, an API/legend panel) in its own glassy card.
- **Main card is SMALL.** The stage is `min-block-size: 14rem` → 224px tall, 1022px wide (live) inside an 806px viewport — it occupies a thin band, not the screen. The brief: "main card area BIGGER (more screen space)." A `/deck` demo above all others should claim a large stage (a `min-block-size: clamp(...)` or `60dvh`) so the whole-slide presentation register reads.

## 5. PATH-LABEL standardization

**Standardized ✓.** The subpath chip renders `@mkbabb/glass-ui/deck` (live screenshot; `manifest.ts:316`). One nit: the in-file import is the deep relative `../../../src/components/custom/deck` (`deck.vue:19`) — correct for the in-repo exerciser (matches every sibling), and the user-facing label is the canonical subpath. No change needed for the label itself.

## 6. LANGUAGE — superfluous prose to tighten

- **`deck.vue:48` blurb** restates `useDeck`/`useDeckKeyboard`/`<DeckPager>`/`--spring-deck` verbatim — it duplicates the StorySection heading AND the page-hero blurb (which says the same thing again, `manifest.ts:1100`). The page shows the same paragraph THREE times (hero blurb → section blurb → README echo). Tighten the section blurb to ONE distinguishing line; let the hero carry the overview.
- **SHOUTY caps**: "DISTINCT", "PRESENTATION", "ONE oracle" appear in both the hero blurb and the section blurb. Drop the caps-for-emphasis (house writing-style: no over-punctuation/editorializing).
- **`manifest.ts:1100`** blurb is a comma-spliced run-on ("…+ … + … + …") — split or trim.

## 7. BUGS

- No functional bug — Next/Prev/pager/keyboard all live-verified working; no console errors observed; transition is compositor-only + PRM-carved (`deck.vue:116-134`) ✓.
- **Latent UX defect**: the in-slide `<Button variant="default">` (`deck.vue:69`) demonstrating focus-guarding is only on slide 3 and is a bare `default` glass button on a gray plate — the focus-guard story ("Tab then Space activates, never pages") is told in prose but not made obviously demonstrable (no visible focus-state callout / no live "paged vs activated" indicator).
- **Minor**: `:window-fit="6"` on a 6-item deck is a dead parameter (see §1) — not a crash, but a demo that silently shows nothing for the feature it names.

---

## Recommended redesign (gestalt, north-star-aligned)

1. **Aurora field**: swap the implicit constellation for a live `<Aurora>` (or `<DockStage>`'s shared aurora) so the glass refraction reads colorful.
2. **Big stage**: lift the stage to `min-block-size: clamp(20rem, 55dvh, 36rem)` — the whole-slide register the README sells.
3. **Card-per-section**: stage in its own `glass-floating` card; a second `glass-quiet` card for an API/progress panel (render `deck.progress` as a `<BorderProgress coverage="bottom-edge">` ring on the stage card — a first-class component pairing).
4. **Dock transport**: replace the bare button row with a `<GlassDock>` transport (Prev/Next/first/last + a `<DockStack mode="facets">` chapter switcher) — leverages the contextual-switching/morph dock APIs the brief names, and `<DeckPager>` rides inside it.
5. **Real windowing**: bump to 12–15 slides (or `:window-fit="5"`) so the windowed dots + focus-survival actually demonstrate.
6. **Tighten prose**: one distinguishing section blurb; drop the triplicated overview + the shouty caps.
