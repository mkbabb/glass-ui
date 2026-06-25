# display/badge — META-STORYBOOK DEMO audit

**Route** `/display/badge` · **Import** `@mkbabb/glass-ui/badge` · **SFC** `demo/stories/display/badge.vue` (185 L) · **Component** `src/components/ui/badge/{Badge.vue,index.ts}`
**Live** http://localhost:5173/display/badge (1440×900, paint-verified)

Badge is an intentionally-opaque atom — it sits on the AX.W54 glass-first legibility allowlist (loud saturated pills are exempt from the glass tier). So this page is NOT a glass-suffusion showcase of the badge itself. But it IS the storybook demo surface, and the BD north star (each sub-section its OWN glassy card · BIGGER main area · leverage dock APIs · series of glass-ui components · glass over a COLORFUL aurora) applies to the PAGE chassis around the atom. Against that bar the page is thin, flat, and over a dead paper wash.

---

## Verdict matrix

| Axis | State | Evidence |
|---|---|---|
| 1 DEMO CONGRUENCE | PARTIAL | Full variant/size/semantic matrix shown; zero animation affordance, no contextual switching |
| 2 COMPONENT ABILITY | FAIL (thin) | 9 flat `<StorySection>` blocks of bare `<Badge>` rows; zero docks/tabs/buttons/procedural composition |
| 3 GLASS SUFFUSION | FAIL | 0 canvas on route — paper wash, not aurora; outer card glasses over a FLAT substrate (nothing to refract) |
| 4 STRUCTURE | FAIL | Sections are transparent flat blocks (`bg rgba(0,0,0,0)`), NOT own cards; main area capped 1152px |
| 5 PATH-LABEL | PASS (w/ dup) | Chassis chip renders `@mkbabb/glass-ui/badge`; but SFC hand-rolls a SECOND redundant header |
| 6 LANGUAGE | FAIL | Editorializing blurbs + stale version tags + meta-commentary section labels |
| 7 BUGS | 1 minor | Duplicate header (chassis + SFC-local), no functional break |

---

## 1 · DEMO CONGRUENCE — partial

The API coverage is genuinely complete and that is the page's one real strength:
- core variants (`default`/`secondary`/`destructive`/`outline`) — badge.vue:24-29, :82-92
- semantic tones (`success`/`warning`/`info`) + dot composition — :31-35, :150-174
- the `size` axis (`sm`/`md`/`lg`) and `size × variant` matrix — :127-148 (good — exercises the AX.W51 D18 comfort-axis font rungs in index.ts:55-66)
- section-color tone fills, viz-basis fills, leading-dot status, baseline alignment — :66-104, :176-182

**What is MISSING vs the API + north star:**
- **Zero animation affordance.** DESIGN.md demands HIGH animation affordance for EVERY component. Every badge here is static. Badge ships `transition-control` in its base (index.ts:32) — a hover state that re-tints border/shadow/transform — yet the demo never invites a hover, and there is no entrance/stagger on the pill rows (the suite-wide `.scroll-cascade` carries them in, but the badges themselves never pop/morph). A status badge that pulses (compose `<StatusDot>`/`<Pulse>`, which the v0.8.6 blurb literally names at :152 but never shows) is the obvious living-chrome demo.
- **No contextual switching.** The whole BD thesis is dock-driven contextual switching. A badge gallery is the textbook case for a `<DockStack mode="facets">` or `<SegmentedTabs>` rail that switches the displayed register (core ↔ semantic ↔ section-tone ↔ viz). None present.

## 2 · COMPONENT ABILITY — FAIL (thin/flat)

Live DOM proof: `bodyDock:false · bodyTabs:false · bodyCanvas:0` inside `.story-sections`. The page composes exactly ONE glass-ui primitive in its body — `<Badge>` — plus an `<IconChip>` in the hand-rolled header (:54). That is the definition of thin. The BD bar ("each page deftly uses a SERIES of glass-ui components — docks/procedural-anims/cards/tabs/buttons") is unmet:
- no `<SegmentedTabs>` to switch registers
- no `<DockStack>`/`<GlassDock>` contextual rail (the page is a perfect fit for a facet carousel)
- no `<Card>`/`<ShowcaseFrame tier="field">` per-section hosting
- no procedural backdrop the pills float over
- no `<Button>` interplay

It is a flat spec-sheet of 9 `gap`-stacked rows — precisely the "flat label/sample table" anti-pattern BB.W-DEMO-DESIGN retired for typography/colors/buttons, here un-migrated.

## 3 · GLASS SUFFUSION — FAIL

`hasCanvas:false · canvasCount:0`. The manifest row `s("display","badge","Badge")` (manifest.ts:770) passes no `background`, so it inherits `CATEGORY_DEFAULT_BG.display = "paper"` (manifest.ts:185) — a static paper wash, NOT a colorful aurora. The outer StoryHero body plate DOES paint real glass (chain[1]: `backdrop-filter: blur(10px) saturate(1.4)`, `oklab(… / 0.664)`) — but it refracts a flat cream paper field, so the iOS-26 six-layer optical composite has nothing behind it to bend. The morphism reads dead.

North star: "glass demos over COLORFUL aurora backgrounds." Even though the badge atom is opaque, the page CARD and any composed glass surfaces (dock/tabs) should sit over a live field. The display band was deliberately routed to the FREE static wash for GL-budget reasons (BA.W-STAGE — one GL context per route, display is a dense band), so a straight `background: "aurora"` flip must respect that budget — the right move is a single shared offscreen-paused `<Aurora>` or `<DockStage>`-style staged field, not N contexts.

PAPER morphism: the inherited paper wash IS the paper register, but it is invisible behind the 0.664-alpha card and reads as a neutral void rather than a deliberate paper specimen.

## 4 · STRUCTURE — FAIL

- **Sections are NOT own cards.** Live: every `.story-sections > *` has `backgroundColor: rgba(0,0,0,0)` and `backdrop-filter: none`. They are transparent flat blocks separated only by the `story-sections--delimited` hairline. The BD mandate "each sub-section in its OWN glassy card" is unmet — the page is the old single-outer-card gap-stack.
- **Main area too small.** `story-page-article` maxInlineSize `1152px` (`--story-page-max-inline`) on a 1440 viewport — the audit's "main card area BIGGER / more screen space" bar wants the badge gallery to breathe wider, especially once sections become individual cards in a grid.
- The hand-rolled header (:46-64) is a second flat block above the body card, not integrated into the glass.

## 5 · PATH-LABEL — PASS (with a duplication bug)

The chassis renders the standardized subpath chip `@mkbabb/glass-ui/badge` (manifest.ts:247 → StoryPage StoryHeader). **Verified live: `subpathChip:"@mkbabb/glass-ui/badge"`.** Standardization is correct at the chassis level.

BUT the SFC hand-rolls its OWN header (:46-64) duplicating the eyebrow ("Display · Badge", verified live as `.section-label--tinted` text) + a blurb — redundant with the chassis StoryHeader cluster (eyebrow → subpath chip → title → blurb). This is the pre-W-HIERARCHY2 double-header shape the chassis was built to kill. The SFC header should be DELETED; the descriptor belongs on the manifest row's blurb (currently empty — the `s("display","badge","Badge")` call passes none).

## 6 · LANGUAGE — FAIL (superfluous prose)

- **:60-62** "Loud-pill status badges — the section identity is the ONE color event; the loud pills carry their own register." — internal-canon meta-commentary ("the ONE color event", "their own register") leaking into a user-facing blurb. Tighten to a plain descriptor.
- **:68** "the 13-stop jewel-tone ramp as a saturated-pill teaching axis" — editorializing ("teaching axis").
- **:151** label `"semantic tones (v0.8.6)"` — a STALE version tag in a section label. Drop it.
- **:152** "Pair with status-dot for richer pulse compositions." — names a composition the demo never shows (a promise, not a demo).
- **:67** label "section-color tone axis" + **:94** "viz-basis via inline fill" — jargon labels; fine internally but read obtuse on a user-facing gallery.
- Source comments :9-15, :15-16 carry tranche-archaeology ("BC.W-SUFFUSE-reconcile", "PH3-safe") — acceptable in source, but the prose they gate (the blurbs) inherited the register.

## 7 · BUGS

- **Duplicate header** (minor, structural): chassis StoryHeader + SFC-local `<header>` (:46-64) both render an eyebrow+blurb. No functional break; visual redundancy + reading-order noise. Fix = delete SFC header, move descriptor to manifest blurb.
- No dead demos, no broken animation, no console errors (0 errors / 1 benign warning live).

---

## Recommended redesign (gestalt, BD north star)

1. **Delete the SFC-local `<header>`** (:46-64); add a tightened blurb to the manifest row `s("display","badge","Badge","Saturated status pills — variant · size · semantic tone · section-color fill.")`.
2. **Stage over a live field**: give the route a SHARED offscreen-paused aurora (DockStage pattern, budget-respecting) so the body card + any composed dock/tabs glass over a colorful substrate.
3. **Each register in its OWN glassy card** via `<ShowcaseFrame>` / `<Card>`: core-variants card · semantic-tones card · size-matrix card · section-tone card — in a wider grid; widen `--story-page-max-inline` for this gallery.
4. **Add contextual switching**: a `<SegmentedTabs>` or `<DockStack mode="facets">` rail to switch register (core ↔ semantic ↔ section-tone ↔ viz), demonstrating the dock contextual-switch API the band owns.
5. **Add animation affordance**: hover-tint live (it already ships), entrance pop on the pill rows, and a `<Badge>` + `<StatusDot>`/`<Pulse>` living-status composition (fulfilling the :152 promise instead of just naming it).
6. **Tighten all blurbs** to plain descriptors; drop the `(v0.8.6)` tag and the canon-jargon.
