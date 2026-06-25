# Pass-E META-STORYBOOK DEMO audit — foundations/css-utilities

- **Route**: `/foundations/css-utilities`
- **SFC**: `demo/stories/foundations/css-utilities.vue`
- **Live**: http://localhost:5173/foundations/css-utilities (captured :5173, full-page + getComputedStyle probes)
- **Manifest row**: `manifest.ts:533-537` (label "CSS Utilities", blurb "The scale-on-hover utility over the scale-hover token — a per-scope override cascade.")
- **Path-label**: `manifest.ts:218` → `"foundations/css-utilities": "/foundations/css-utilities"`
- **Background resolved**: `foundations → paper` (`manifest.ts:182` CATEGORY_DEFAULT_BG, no row override). Live: `story-bg-paper paper-grain-overlay` over `paper-underpaint bg-background` — a near-white gray field, NO live colorful substrate (`auroraCount: 0`).

---

## Verdict summary

This is one of the thinnest pages in the storybook. It demos a SINGLE CSS token (`--scale-hover`) over a SINGLE utility (`.scale-on-hover`) across three near-identical sections of inert chips. It composes essentially ZERO glass-ui components (only the demo-side `ShowcaseFrame` chassis + bare `<button>`s) — no Card, Tabs, Button, dock, or procedural-anim. The glass morphism does not read (flat paper field, no aurora). It badly underperforms the user's North Star.

---

## (1) DEMO CONGRUENCE — does the demo show the component at its BEST + full API?

**Weak.** The utility IS exercised at its API edges (default 1.08 + four scope overrides 1.04/1.08/1.15/1.25 via `:style`-free scoped classes, `css-utilities.vue:102-115`), and the live hover does animate (transform scale on `--duration-fast`/`--ease-standard`). But:

- **No contextual switching / no animation affordance beyond a passive hover.** There is no tabs/dock-driven mode switch, no play/reset harness, no `<StoryPlayButton>`. The whole "animation" surface is a mouse-hover scale on a dead chip.
- **Section 2 is redundant with Section 1** — both are "hover a thing, it scales." The override cascade (Section 2) is the only genuinely distinct idea; Section 1's four-glyph row adds nothing the override grid doesn't already show.
- **Section 3 is a pure spec-sheet `<ul>`** (`css-utilities.vue:82-97`) — a flat bullet list of token names, the exact "flat spec-sheet" anti-pattern BB.W-DEMO-DESIGN condemns for the CORE panes. No specimen, no live demo.
- **The sibling token `--scale-hover-dock` (1.1)** is mentioned in prose (`:93`) but never DEMONSTRATED — a dock control hover-scale specimen beside the chip would close the "hover ladder homogenous across substrates" claim live.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat — the worst on this axis.** The page composes:
- `StoryPage` / `StorySection` / `ShowcaseFrame` (demo chassis, not library components)
- bare `<button>` + `<code>`/`<ul>` (raw HTML)
- four `@lucide/vue` glyphs

ZERO real glass-ui library components are mounted (`glassCards: 32` is all the StoryPage/dock chrome, not page content; the page's own content is raw buttons). The user's bar — "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" — is essentially unmet. A token-utility page COULD still compose: `<Button class="scale-on-hover">` rows, a `<SegmentedTabs>` to switch scope presets, `<Card :pressable>` tiles showing the lift on a real surface, a `<DockIconButton>` showing `--scale-hover-dock`.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**Fails the binding ask.** `auroraCount: 0`. The outer body card has REAL glass (`backdrop: blur(10px) saturate(1.05)`, translucent `oklab(.934/.664)`), and PAPER morphism IS present (`story-bg-paper paper-grain-overlay`), but the field behind is near-white gray, so the glass translucency barely reads — there is nothing colorful to refract. The user's "glass demos over COLORFUL aurora backgrounds" is not satisfied; foundations defaults to `paper`, and this page takes no `aurora` override. Inner ShowcaseFrames are OPAQUE plates (`bg-card` rgb(251,248,244) / `bg-card/40`, `backdrop: none`) — no glass inside the card at all.

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

- **Main card**: ONE big glass card wrapping all 3 sections (1152×914px in a 1440×806 viewport). It is reasonably wide but the page is so sparse the card is mostly empty whitespace — "more screen space" is moot when there's little to fill it.
- **Per-sub-section card**: **NOT met as the user asks.** Sections are NOT each in their own glassy card; they are `StorySection` blocks separated by hairline delimiters inside the one card, and their inner `ShowcaseFrame`s are OPAQUE (`backdrop: none`), not glassy. The Section-2 override grid IS four small `tier="quiet"` frames (translucent-ish `/40` but still no backdrop blur), the closest thing to per-card structure.

## (5) PATH-LABEL standardization

**OK.** `/foundations/css-utilities` is the canonical relative-path form (`manifest.ts:218`), rendered in the Fira-Code subpath chip (visible live under the eyebrow). Consistent with sibling foundations rows that ship a relative path. No change needed.

## (6) LANGUAGE — superfluous prose to tighten

- `css-utilities.vue:2-7` header comment recites the cross-repo consumer counts ("13 sites in keyframes.js demo + 9 in words/frontend") — superfluous for a demo SFC; tighten to the one-line recipe.
- `css-utilities.vue:18` blurb is verbose and embeds the implementation (`transform: scale(var(--scale-hover))` plus a transition-transform shorthand) — the implementation belongs in Section 3, not the section blurb.
- `css-utilities.vue:22-25` the BC.W-STORYBOOK-META comment about "WTF is this blue" is editorializing dev-chatter; strip.
- Section-3 prose `:93-95` "keep the hover ladder visually homogenous across substrates" — fine, but the claim should be SHOWN not told.

## (7) BUGS / defects

- **BUG (off-brand color, contradicts its own comment)**: `css-utilities.vue:30` the Star glyph binds `--section-color-2`, which resolves to `oklch(0.484 0.163 265.5)` — a **blue** (live glyph color confirmed `oklch(0.484 0.163 265.5)`). The `:22-25` comment claims it fixed "the stray-blue idiom-adherence sweep — the 'WTF is this blue' close", but section-color-2 IS the blue ramp stop, so the page still ships a blue glyph. Either the comment is stale or the wrong ramp index was chosen.
- **No functional bug** otherwise — hover scale animates, the four override scopes resolve distinct values, the page mounts clean (no console errors observed).
- **Dead-weight**: the four `<button>`s in Section 1 and Section 2 are non-interactive (no role/label, empty), pure decoration — an a11y/affordance smell on a page that is ostensibly about an interactive utility.

---

## Recommended redesign (architectural, not patch)

1. Give the page a **live colorful field** — override the manifest row to `background: "aurora"` (or constellation) so the glass card reads as liquid glass.
2. Compose **real library components**: a `<SegmentedTabs>` switching the scope preset (subtle/default/boomed/audacious) drives ONE specimen row of `<Button class="scale-on-hover">` + a `<DockIconButton>` (showing `--scale-hover-dock`) + a `<Card :pressable>` — so the utility is shown on the actual surfaces consumers use, with contextual switching.
3. Put **each specimen in its own glassy card** (`tier="field"` ShowcaseFrame over the aurora, or a real glass tier) so the morphism reads per-card.
4. Collapse Sections 1+2 (redundant) and turn Section 3's spec `<ul>` into a live `<TokenLadder>`-style specimen.
5. Fix the blue-glyph contradiction; tighten the header comment + blurb.
