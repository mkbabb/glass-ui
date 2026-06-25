# Pass-E META-STORYBOOK DEMO audit — `motion/split-chars`

- **Route:** http://localhost:5173/motion/split-chars
- **SFC:** `demo/stories/motion/split-chars.vue` (64 lines)
- **Component:** `src/components/custom/split-chars/SplitChars.vue` + `src/composables/motion/useCharStagger.ts`
- **Import label (this page):** `@mkbabb/glass-ui/motion-core`
- **Live-verified:** yes (Chrome DevTools, full-page screenshot + DOM probes)

## Verdict at a glance

A THIN, FLAT demo. Three static `<SplitChars>` instances + one Replay button stacked inside a single `StorySection`, over a near-invisible monochrome **constellation** field (not the colorful aurora the user's bar names). It is among the weakest motion pages: no live API controls, no per-sub-section cards, no series of glass-ui components, and the glass morphism does not read because the backdrop has no color. The path label and a11y are correct; almost everything else needs the BD treatment.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise its FULL API?

**Partial. The API is shown but NOT exercised — and not contextually.**

- The `by` axis (`char` | `word` | `grapheme`) IS shown, but as THREE separate hardcoded instances (`split-chars.vue:37`, `:46`, `:54`) — there is **no live control** to flip a single word between split units. The richest fact of the component (one engine, three segmentation strategies, `Intl.Segmenter` grapheme safety) is presented as a static list, not a tunable demo. Contrast the sibling `typewriter.vue` (`:126`–`:159`) which exposes speed/error/cursor/blink as live `Slider`/`Switch` controls.
- `useCharStagger` exposes `preserveWhitespace`, `writeTotal`, and a live `count` (`useCharStagger.ts:42`, `:47`, `:56`) — **none surfaced** in the demo. The `--char-total` custom (written on every instance, confirmed live: totals `7`/`3`/`3`) is advertised by the composable for "length-proportional / center-out / reverse stagger" (`useCharStagger.ts:44`–`47`) but the demo only ever shows the one linear `index * 30ms` recipe.
- **Latent gap (component, not demo):** the only shipped `.char-stagger` CSS recipe (`src/styles/typography/utilities.css:155`–`159`) is a single linear `fade-in`; the `--char-total`-driven center-out/reverse staggers the composable doc promises have **no CSS recipe**. The demo cannot show them because they don't exist. A BD wave should either ship the recipes + a demo selector, or the demo should at least vary `animation-delay` direction via a per-instance class to prove `--char-total` is load-bearing.
- **Contextual switching / dock APIs:** none. The page is the right place to show `<SplitChars>` driving a kinetic hero that re-splits when a dock/tab context changes (e.g. a `<SegmentedTabs>` or `<DockLayerGroup>` selecting char/word/grapheme and the same word re-animating) — exactly the "deftly uses the dock APIs" bar. Absent.
- **Replay** works (remount via `:key="playKey"`, `split-chars.vue:19`–22, `:32`) but is the ONLY interaction.

## (2) COMPONENT ABILITY — deft series of glass-ui components, or thin/flat?

**Thin/flat.** The demo composes exactly TWO library components: `<SplitChars>` and one `<Button variant="secondary">` (`split-chars.vue:14`–15, `:57`). No cards, no tabs, no dock, no procedural-anim, no configurator. DOM probe confirms the only glass surfaces on the page are the **nav dock chrome** (33 `glass-*` nodes, all `glass-dock-frame`/`glass-dock`/`glass-specular-track`) — zero content-level glass cards. The user's bar ("each page deftly uses a series of glass-ui components — docks/procedural-anims/cards/tabs/buttons") is missed wholesale.

Opportunity: split-chars is a TYPOGRAPHY-forward component — it belongs on the audacious √φ ladder over a live field, with a `<SegmentedTabs>` mode-switcher, glass cards per register, and a procedural backdrop. The raw material is ideal; the composition is barely started.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**Flat / fails the bar.** Background resolves to `constellation` (`manifest.ts:191` `CATEGORY_DEFAULT_BG.motion`; no per-row override). Live probe: the body card IS a real glass tier (`bg oklab(.887 …/0.328)`, `backdrop-filter: blur(1px) saturate(1.05)` — a `quiet`/`wash` rung), but the constellation canvas samples as fully transparent (`[0,0,0,0]`) — a faint gray star-map on cream. **The six-layer optical composite cannot read with no color behind it**: tint, rim, and catch-light are invisible in the screenshot.

- The user's explicit bar is "glass demos over COLORFUL aurora backgrounds." `aurora` is a first-class option with a colorful palette (`StoryHero.vue:17`, `:128`–`134` `heroAuroraConfig`). Fix is one of: per-row `background: "aurora"` on the `s("motion","split-chars",…)` call, or flip `CATEGORY_DEFAULT_BG.motion` to `aurora` (note that also re-skins the other motion pages — decide at tranche scope).
- **Paper morphism:** absent. The kinetic-type register would also read beautifully on a `paper-grain-overlay` panel (the `typewriter.vue:60` `.paper-grain-overlay` precedent) for a GLASS-vs-PAPER contrast within the page. Neither is present.

## (4) STRUCTURE — own glassy card per sub-section + BIG main area?

**Fails both.** DOM probe: `.story-sections` has exactly **ONE child** (a single `<section.flex>`), so all three SplitChars registers + the Replay button live in ONE flat StorySection — not "each sub-section in its OWN glassy card." There are three natural sub-sections (per-char hero / per-word headline / grapheme safety) that each want their own glass card.

- **Main card area is NOT big** — it is sparse: a tall mostly-empty `quiet`-tier card holding three short text rows (the screenshot shows ~60% empty card). "Bigger / more screen space" should mean the card area FILLS with content (per-register cards + a live mode-switcher + a stagger-direction gallery), not a larger empty box.
- The outer StoryHero card is present and correct; the deficiency is the FLAT single-section interior.

## (5) PATH-LABEL standardization

**Correct.** `manifest.ts:320` `"motion/split-chars": "@mkbabb/glass-ui/motion-core"`, rendered live as the Fira-Code chip `@mkbabb/glass-ui/motion-core` (screenshot confirms). Matches the canonical import. (Note: the `motion` category-LANDING subpath at `manifest.ts:347` is `@mkbabb/glass-ui/motion` — that's the section landing, not this page; no action.)

## (6) LANGUAGE — superfluous prose to tighten

- `split-chars.vue:30` blurb is long and re-explains the a11y mechanism twice ("stays accessible … hears the word ONCE … never the per-glyph spell-out"). Tighten to one clause.
- `manifest.ts:1127` story blurb duplicates the same a11y sentence AGAIN ("accessible by construction (the aria-label keeps the word ONE accessible name; the glyphs are aria-hidden)") — the live page shows BOTH the manifest blurb (top) and the section blurb (in-card), so the reader sees the aria-label explanation three times across the page. Collapse to one canonical sentence; let the section blurb carry the demo-specific note only.
- In-SFC comments (`split-chars.vue:2`–10, `:33`–36, `:44`–45) are fine as code docs but the user-facing blurbs are where the redundancy bites.

## (7) BUGS

- **Grapheme emoji renders broken (visual).** `text="a 👨‍👩‍👧 b"` (`split-chars.vue:54`) shows a tofu/placeholder box live (the system font lacks the ZWJ family glyph). The grapheme-safety point is REAL (the composable keeps the ZWJ cluster as one `.char`, confirmed total `3`), but the chosen emoji doesn't render the point — it reads as a bug. Pick a single-codepoint-but-multi-scalar grapheme that renders reliably (e.g. a flag, or a combining-mark sequence like `é` composed) OR a widely-supported emoji, so the "ONE glyph, never torn" claim is VISIBLE rather than a box.
- No dead demo / no broken animation otherwise — Replay remount works, stagger plays on mount, aria-labels intact.

---

## Recommended BD shape (gestalt, not patch)

1. **Background → `aurora`** (colorful) so the glass morphism reads; keep a `paper`-grain sibling panel for the GLASS-vs-PAPER contrast.
2. **Three glassy sub-section cards**: (a) per-CHAR audacious hero on the √φ ladder; (b) per-WORD headline; (c) grapheme-safety card with a RENDERABLE grapheme.
3. **Live mode-switcher via a dock/tabs API** — a `<SegmentedTabs>` or `<DockLayerGroup>` selecting `char`/`word`/`grapheme`, the SAME word re-splitting + re-animating on switch (exercises contextual switching + the full `by` API in one surface).
4. **Stagger-direction gallery** — surface `--char-total` (forward / reverse / center-out) once the CSS recipes exist; expose `count` as a live readout.
5. **Fill the main card** so "bigger area" is content, not empty box.
6. **Tighten** the triple-stated a11y blurb to one canonical sentence.
