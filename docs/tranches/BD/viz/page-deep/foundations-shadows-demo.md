# Pass-E META-STORYBOOK deep audit — `foundations/shadows`

- **Route:** `/foundations/shadows`
- **SFC:** `demo/stories/foundations/shadows.vue` (98 lines)
- **Live:** http://localhost:5173/foundations/shadows (spot-checked 1440×900, light)
- **Manifest row:** `manifest.ts:485` — `s("foundations", "shadows", "Shadows", "Cartoon offset, elevated, modal.")` — NO `background` override → inherits `CATEGORY_DEFAULT_BG.foundations = "paper"` (manifest.ts:182). Subpath chip `/foundations/shadows` (manifest.ts:210).

## Verdict snapshot

The page is a **flat two-section spec-sheet**: a static 11-cell shadow-swatch grid + one CSS-hover "cartoon lift" card. It composes **ZERO** glass-ui components beyond the `StoryPage`/`StorySection` chassis (verified: 0 occurrences of `ShowcaseFrame`, `Tabs`, `GlassDock`, `Aurora`, `DockStage`, `Button`, `Card`, `IconChip`). It is the antithesis of the user's bar — no own-card-per-section, a cramped main area, a flat cream wash (no aurora), no dock APIs, no procedural anim, no component series.

---

## (1) DEMO CONGRUENCE — does it show shadows at their BEST + full API?

**Partial / weak.** The grid enumerates the shadow token ladder (`shadows.vue:11-23`) — `xs…2xl` + `cartoon`, `cartoon-hover`, `modal`, `soft`, `elevated` — which IS the token surface. But:

- **The cartoon shadow is glass-ui's SIGNATURE identity** (CLAUDE.md §Cartoon-shadow override contract — the Memphis offset-stamp + the token-adaptive `.dark` re-tint + the `cartoon-surface` `@utility`). The demo shows it as a static swatch and a single 1px-translate hover (`shadows.vue:59-80`). It NEVER demos: the `<Card surface="cartoon">` composition (the real consumer), the `:root { --shadow-cartoon-lg: … }` retint contract (the headline override axis), or the dark re-tint (the page is light-only at HEAD; the `.shadow-stage` dark perception-correction at `:88-96` exists but is invisible in light and unexercised here).
- **`cartoon-hover` is rendered as an ALWAYS-ON static swatch** (`shadows.vue:19`) — a "hover" shadow with no hover, beside a real hover card lower down. Confusing duplication; the swatch teaches nothing the live card doesn't.
- **No contextual/animation affordance.** The only motion is the `.scroll-cascade` rung stagger (chassis-supplied) + the one CSS hover. No spring physics, no dock contextual-switching, no live demonstration of elevation as a *spatial* property (e.g. a stack that lifts on interaction, a modal that casts its `shadow-modal` over a real backdrop).

## (2) COMPONENT ABILITY — deft series of glass-ui components, or thin/flat?

**Thin/flat — the worst on this axis.** Zero component composition. The shadow swatches are raw `<div class="… bg-card border …">` (`shadows.vue:43-50`); the hover card is a raw `<button class="glass-card …">` (`:61-73`). The page does not compose `<Card>`, `<Button>`, tabs, or any dock — the very surfaces that *carry* these shadows in real use. A shadows page should be a parade of glass-ui surfaces AT different elevations (a `shadow-modal` Dialog, a `shadow-elevated` floating panel, a `cartoon` Card, a dock at `shadow-floating`) — not abstract rectangles.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**Absent.** Background resolves to `"paper"` (flat cream grain, no GL). Live screenshot confirms a uniform off-white page — no aurora, no color. The morphism cannot read: shadow swatches are opaque `bg-card` rectangles on a near-same cream, so even the *shadows* read faintly. PAPER morphism is nominally present (the paper wash) but is not *demonstrated* — it's just the default backdrop. The user's "glass demos over COLORFUL aurora backgrounds" bar is unmet; shadows specifically WANT a contrasting/colorful stage so the cast reads (the SFC's own `.shadow-stage` comment at `:28-33` admits the dark-page invisibility problem — the right fix is a colorful aurora stage, not a flat grey backing).

## (4) STRUCTURE — own glassy card per sub-section? main area BIG enough?

**Both fail.**
- **One shared card, not per-section.** Both `<StorySection>` blocks (`shadows.vue:34`, `:59`) flow inside the SINGLE `StoryHero` `<Card>` (StoryHero.vue:367), separated only by the chassis hairline divider (`story-sections--delimited`, StoryPage.vue:171). Live screenshot confirms: ONE outer plate, a `<hr>`-style rule between Elevation and Cartoon-lift. The user's "each sub-section in its OWN glassy card" is NOT met — there is no nested `<Card>`/`<ShowcaseFrame>` per section.
- **Main area is SMALL.** Live: full page height = 1134px, of which the article max-width is `--story-page-max-inline` and the content is sparse. The 11-cell grid + one hover card leave large dead margins (right-side whitespace in the screenshot; the grid tops out at `lg:grid-cols-6` so on a 1440 viewport the cells are small with big gutters). The card does NOT claim "more screen space" — it's a low-density spec sheet inside a generous-whitespace frame.

## (5) PATH-LABEL standardization

**OK / present but inconsistent vs import-surface pages.** The chip renders `/foundations/shadows` (route-path form, manifest.ts:210) since shadows is a token page with no package export — correct per the SUBPATHS rule (manifest.ts:204 comment). But note: sibling import-surface pages render `@mkbabb/glass-ui/<sp>` (e.g. `foundations/icons` → `@mkbabb/glass-ui/icon-chip`). The label IS standardized by the chassis (`StoryHeader` Fira-Code chip) — no SFC-local divergence. No action needed beyond the cross-page consistency the meta-gate already enforces.

## (6) LANGUAGE — superfluous prose to tighten

- **`shadows.vue:74-78`** blurb: *"…gives cards a paper-on-paper personality without any real depth. It's the library's signature surface affordance."* — the second sentence editorializes ("signature surface affordance"); tighten to the mechanic + the override knob.
- **Section heading `"Cartoon lift · hover the card"`** (`:59`) embeds an instruction in the heading. Headings should name the register; the "hover the card" cue belongs in the body/caption.
- **Heavy SFC comments** (`:1-6`, `:28-33`, `:85-96`) are wave-archaeology (`BB.W-DEMO-DESIGN`, `BA.W-STAGE scope 7`) — fine for src provenance but the user's "tighten superfluous language" applies to RENDERED copy; rendered copy is the two items above.

## (7) BUGS / dead demos

- **`cartoon-hover` swatch is a dead "hover" affordance** (`shadows.vue:19,52`) — labelled `cartoon-hover` but it's a static always-on shadow swatch with no interaction; semantically misleading beside the real hover card.
- **`.shadow-stage` dark backing is unexercised in light** (`:89-96`) — not a bug, but the perception-correction it implements (shadows invisible on near-same backdrop) is *live in light too*: the cream swatches on the cream wash have very low shadow contrast (visible in the screenshot — the `xs`/`sm` cells read almost shadowless). The real fix is a colorful/contrasting stage, which the page lacks.
- No JS errors observed; the `.scroll-cascade` entrance and the one hover work.

---

## Recommended redesign (gestalt, BD-tier)

1. **Per-section glassy cards** over a **live colorful aurora** (`background: "aurora"` on the manifest row, or a `<DockStage>`-style shared offscreen-paused aurora) so the shadows + glass morphism BOTH read.
2. **Compose the component series the shadows actually carry:** a `<Card surface="cartoon">`, a `shadow-elevated` `<GlassPanel>`, a `shadow-modal` Dialog opened over the field, a dock at `shadow-floating` — each tile a REAL glass-ui surface at its elevation, not a rectangle.
3. **Bigger main area** — denser, larger tiles; let the elevation ladder breathe across more screen.
4. **Animation affordance** — spring-press the cartoon card (the `useSpringPress`/`.glass-press` register), animate a modal casting `shadow-modal`, demonstrate the `:root { --shadow-cartoon-lg }` retint LIVE via a toggle/configurator.
5. **Tighten rendered copy** per (6).
