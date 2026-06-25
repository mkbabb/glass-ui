# Pass-E Deep Audit — foundations/paper-texture

- **Route:** `/foundations/paper-texture`
- **SFC:** `demo/stories/foundations/paper-texture.vue`
- **Import label:** `@mkbabb/glass-ui/paper-backdrop`
- **Component:** `<PaperBackdrop>` (`src/components/custom/paper-backdrop/PaperBackdrop.vue`)
- **Backdrop register (manifest):** `paper` (static — `CATEGORY_DEFAULT_BG.foundations`, manifest.ts:182)
- **Verdict:** SEVERELY BROKEN — three dead demos + an architectural component mismatch. Among the worst-condition pages.

---

## SUMMARY

The page is a flat documentary spec-sheet that demonstrates the component **at its worst, not its best**, and three of its five sections render essentially or entirely DEAD. The root cause is an architectural mismatch: `<PaperBackdrop>` paints `.paper-underpaint`, which is hard-coded `position: fixed; inset: 0` — the **app-root fullscreen** underpaint meant to mount ONCE at the app shell — but the demo mounts EIGHT of them inside bounded cards expecting each to fill its host. They escape their cards and stack as full-viewport fixed layers at z-index -1. Combined with a 0.025 grain opacity, the entire page is visually inert.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**NO.** The component's full API is `{ opacity, frequency, class }` plus the cascade tokens. The demo touches all of them on paper but most are dead in render:

- **`frequency="clean"` vs `"aged"` (lines 24-43):** Two side-by-side panels. At the live grain opacity of **0.025** (`--glass-grain-opacity`, confirmed via getComputedStyle), the turbulence is imperceptible — the two panels are visually IDENTICAL. A "clean vs aged" comparison where the user cannot see ANY grain, let alone the difference, demonstrates nothing. (`PaperBackdrop.vue:31-33` swaps `backgroundImage: var(--paper-aged-texture)` inline, but `.paper-underpaint`'s base SVG is a SEPARATE 60px tile from the 200px `--paper-clean/aged-texture` tokens — so even "clean" is not the texture the docs describe.)

- **`--paper-* cascade retint` (lines 46-70) — 100% DEAD.** Warm/cool/bone panels set `--paper-underpaint-color` (#f4ebd6 / #e6edf4 / #f6f1e8) on the scope. **`--paper-underpaint-color` is NEVER defined or read anywhere in `src/`** (grep: zero hits in src/styles). `.paper-underpaint` paints only the SVG turbulence image — its `background-color` computes to `rgba(0,0,0,0)` (confirmed live). All three panels render IDENTICALLY. This section demos a token the library does not consume — a phantom-token demo.

- **`opacity` knob (lines 101-112):** The one genuinely live control. A native `<input type="range">` drives `:opacity`. But because the backdrop is `position: fixed` full-viewport (see §7), dragging the slider dims a viewport-wide layer behind the WHOLE page, not the card the slider sits in — so the affordance reads as "nothing happens here."

- **`layered composition` (lines 114-128):** A heading + paragraph over a backdrop. Same fixed-position escape — the grain is not bounded to the card.

**Contextual switching / animation / dock APIs:** ZERO. PaperBackdrop is a static texture, so no animation is expected of IT — but the page itself has no entrance choreography beyond the chassis `.scroll-build`, no tabs, no dock composition, no procedural anim. The user's "HIGH animation affordance for EVERY component" bar is unmet.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**THIN/FLAT.** The page composes only `StoryPage` + `StorySection` + `ShowcaseFrame` (demo chassis) + `PaperBackdrop` + a raw native `<input>`. No `<Card>`, no `<SegmentedTabs>`, no `<Button>`, no `<GlassDock>`, no procedural viz. The "texture-system cascade" section (lines 72-99) is a bare `<ul>` of `<code>` chips — a spec-sheet, not a demo. This is the antithesis of the "each page deftly uses a SERIES of glass-ui components" mandate.

## (3) GLASS SUFFUSION — live colorful field? PAPER morphism present?

**NO GLASS, NO LIVE FIELD.** Manifest assigns `paper` (static) background; zero `<canvas>`, zero `<Aurora>` on the page (confirmed live: `canvasCount:0, auroraCount:0`). The whole surface is pale cream-on-cream. PAPER morphism is the apt register here (it IS the paper page) — but the grain is 2.5%-opacity invisible, so even the paper morphism does not READ. There is no GLASS demoed at all — yet this is the foundations page where the paper-vs-glass contrast SHOULD be staged (its sibling `foundations/paper-glass` exists; this page could stage paper grain UNDER a glass card over a colorful field to show all three layers compositing).

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**PARTIAL / NO.** The chassis wraps the whole body in ONE glass card (`storySections:1`); the five `<StorySection>`s are delimited by hairlines INSIDE that single card, NOT each in its own glassy card (the user's explicit "each sub-section in its OWN glassy card" bar — UNMET). The clean/aged and retint specimens sit in `<ShowcaseFrame>` sub-cards, but the prose sections (texture-system, opacity, layered) are bare. Main card width is **1152px of a 1440px viewport (80%)** — the user's "main card area BIGGER (more screen space)" bar is unmet; ~288px of right gutter is dead space.

## (5) PATH-LABEL standardization

**CORRECT.** The chip renders `@mkbabb/glass-ui/paper-backdrop` (manifest.ts:217, live-confirmed in the chip). Standardized. ✓

## (6) LANGUAGE — superfluous prose to tighten?

Several:
- SFC header comment (lines 2-8) re-states the component JSDoc verbatim — redundant.
- `texture-system cascade` blurb (line 74): "The promotion canonicalises the texture-system at the library tier" — jargon ("promotion canonicalises") with no demo payload; tighten or cut.
- The `<ul>` spec chips (lines 77-97) duplicate the prop table from the component's own JSDoc — a doc dump, not a demo.
- `layered composition` blurb (line 116) and `opacity knob` blurb (line 103) are accurate but the demos beneath them are dead, so the prose over-promises.

## (7) BUGS

- **B1 (CRITICAL — architectural):** `<PaperBackdrop>` → `.paper-underpaint` is `position: fixed; inset: 0; z-index: -1` (`src/styles/paper.css:12-22`) — the app-root fullscreen underpaint. Mounting it inside a bounded card does NOT bound it; it paints full-viewport. 8 instances stack on the viewport (live: `paperBackdropCount:8`, all `position:fixed`). The component is being used outside its contract. Either PaperBackdrop needs a bounded mode (`position: absolute` + host `position: relative`/`contain`) or the demo must not pretend it scopes to a card.
- **B2 (CRITICAL — dead demo):** `--paper-underpaint-color` is a phantom token (zero `src/` definitions/readers). The entire warm/cool/bone cascade-retint section paints identically. Live: all three `.paper-underpaint` `backgroundColor: rgba(0,0,0,0)`.
- **B3 (HIGH — invisible grain):** `--glass-grain-opacity: 0.025` makes the clean/aged comparison — the page's headline demo — imperceptible. The clean and aged panels are indistinguishable to the eye.
- **B4 (MED):** Native unstyled `<input type="range">` (line 109) on a design-system showcase page — should be `<Slider>`.

---

## RECOMMENDED REDESIGN (gestalt, per the BD north star)

1. **Give PaperBackdrop a bounded mode** (or use `paper-grain-overlay` ::after — which IS `position: absolute; inset: 0; border-radius: inherit` and correctly scopes to a host) so each demo card actually carries its own grain.
2. **Stage the three layers over a LIVE field:** put a glass `<Card>` over a colorful `<Aurora>`, with paper grain on the card — show paper morphism AND glass morphism AND the field compositing, which is the actual lesson (paper-grain texture vs glass-blur texture).
3. **Each sub-section in its OWN glassy card** over the aurora; widen the main column toward the viewport.
4. **Make the grain VISIBLE** for the comparison — a temporary demo-local `--glass-grain-opacity` lift on the specimen panels (presets-in-consumers) so clean vs aged actually reads, or a magnified inset.
5. **Kill the phantom-token retint section** OR wire `--paper-underpaint-color` into the library as a real read; demo only live tokens.
6. **Compose a SERIES:** SegmentedTabs to switch clean/aged/custom frequency, a Slider for opacity, a Button to toggle the grain — exercise the platform.
7. **Tighten prose:** cut the JSDoc-dup header and the spec-chip `<ul>`; let the live demo carry the API.
