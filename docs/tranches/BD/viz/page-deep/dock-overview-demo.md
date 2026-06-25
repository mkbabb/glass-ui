# Pass-E META-STORYBOOK deep audit — `dock/overview`

- **Page**: `dock/overview`
- **Import label (page-chrome chip)**: `@mkbabb/glass-ui/dock` (rendered correct, manifest.ts:277)
- **SFC**: `demo/stories/dock/overview.vue`
- **Live**: `http://localhost:5174/dock/overview` (5174 — 5173 was a sibling audit instance)
- **Viewport audited**: 1440×900 desktop, full-page capture
- **Console**: clean of errors. 2 benign warns — a `<Transition>` non-element-root warn from `TooltipProvider`, and `useAurora: deferred init armed with no onInitError handler` (×2, demo wiring, not a defect).

---

## VERDICT SUMMARY (severity-ordered)

| # | Severity | Axis | Finding |
|---|----------|------|---------|
| A | **MAJOR** | (4) Structure | NOT one-card-per-section. All 11 sections share ONE `.dock-stage` aurora card; sub-sections are transparent, card-less, hairline-delimited. Directly contradicts the user ask. |
| B | **MAJOR** | (3) Glass suffusion | The aurora field is a flat, near-uniform warm-salmon wash — NOT a colorful/varied field. The glass morphism barely reads (beige plates on beige). |
| C | **MAJOR** | (1)(2) API breadth | Demos GlassDock + control primitives only. Exercises ZERO of the headline NEW dock APIs: `DockStack` (contextual facet carousel/stack), `DockSection` (declarative tripartite chassis), `DockLayerGroup`/`DockLayer` (contextual switching), `useDockOrientationMorph` (V↔H morph), the `cockpit` preset. The contextual-switching/morph story is the dock's marquee feature and it is entirely ABSENT here. |
| D | MINOR | (4) Structure | Main card width 1086px of a 1440px viewport (~75%). Could claim more screen space; the hero copy column is unbounded but the stage is inset. |
| E | MINOR | (5) Path label | Page chip is standardized; but inline comment overview.vue:170 hand-writes the raw relative path as a doc-comment (`from "../../../src/components/custom/dock"`) — inconsistent with the published `@mkbabb/glass-ui/dock` label. |
| F | MINOR | (6) Language | Several blurbs are over-long/internal-jargon-laden (D9 break, items-lag harness, "identity-scoped pass-through"). Tighten for a demo audience. |
| G | NIT | (7) Bug | `dock-search`/`liquid-playground`/`dock-gallery` siblings already use the richer `DockExampleTile` per-example glass-field chassis; overview is on the older flat `DockStage`. Architectural drift, not a break. |

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**Partial. The control surface is well-covered; the dock's signature capabilities are missing.**

WHAT IS exercised (good breadth on the basics):
- Collapse↔expand morph on `--spring-dock` (overview.vue:124, `#persistent` slot).
- `always-expanded` media transport (142).
- `DockSelectTrigger` + `DockDropdownTrigger` with live readouts (171-235).
- `HoverPopover keep-dock-open` (252, 284, 318).
- `Slider`-in-dock keep-open hold + `data-held` (377-397).
- Click-integrity / tap-where-you-aimed (431).
- `overflow="wrap"` reflow at two caps (499, 530).
- `shape="card" layout="grid"` big dock (559).
- `DockBackgroundToggle` wired to a real `pause()`/`resume()` Aurora (591-608) — the one genuinely live, state-bearing demo.

WHAT IS NOT exercised — the dock's *marquee* APIs (all shipped, all in the `/dock` barrel — `src/components/custom/dock/index.ts`):
- **`DockStack` (mode `stack`|`facets`)** — the contextual accent-facet carousel / macOS hover-stack. THE iOS-27 contextual-switching headline. Absent (overview grep: 0).
- **`DockSection`** — the declarative tripartite `rail-core | section | nav` chassis (the "docks COMPLETELY lack sections" mandate). Absent.
- **`DockLayerGroup` / `DockLayer`** — multi-layer contextual switching + crossfade. Absent (lives only in `dock/layers.vue`).
- **`useDockOrientationMorph`** — the V↔H morph (lives only in `dock/morph-showcase.vue`).
- **The `cockpit` / density presets** (`data-preset`, `data-density`) — not shown.

The user ask is explicit: *"leverage the dock APIs (contextual switching/animating)."* An "overview" page is the natural home for a one-glance tour of these, yet they are siloed across 4 sibling pages and never appear on the overview. The page reads as a *control-primitive* walkthrough, not a *dock-capability* walkthrough.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Moderately thin.** The page composes GlassDock + DockIconButton + DockSelectTrigger + DockDropdownTrigger + DockSeparator + HoverPopover + Slider + Select + DropdownMenu — a respectable *control* series. But it composes NO cards (every section is a bare transparent tile), NO tabs, NO procedural-anim beyond the single decorative aurora backdrop, NO BorderProgress/MetricCell/CompletionSeal/etc. The user ask wants each page to "deftly use a SERIES of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" — here it is docks-and-only-docks on a flat field. No `<Card>`/`<SegmentedTabs>`/`<Button>` composition frames the demos.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FAIL on "colorful".** Architecturally correct (the `DockStage` design intent — overview.vue:104-110, DockStage.vue — is "ONE shared offscreen-paused live aurora field, glass floats DIRECTLY over it, no opaque plate"). BUT the rendered field is a **flat near-uniform warm-salmon wash** (`DEFAULT_AURORA_CONFIG` at `opacityCeiling: 0.42`). The full-page capture shows essentially one peach tone top-to-bottom. Over a monochrome field the six-layer glass composite (backdrop blur+saturate · tint · rim · catch-light) has almost nothing to refract — the docks read as **beige pills on a beige plate**, not liquid glass. The DESIGN north star binds "glass demos over COLORFUL aurora backgrounds." This needs a livelier, multi-hue aurora preset (or per-section color variation) so the morphism is legible.

**Paper morphism**: absent. The user wants "GLASS + PAPER morphism both." No paper-tier surface appears on this page (a `paper-grain`/`paper-ink-mark` rail beside the glass would carry the dual-material story).

## (4) STRUCTURE — each sub-section in its OWN glassy card? main card BIG enough?

**FAIL — the headline structural ask.** Live DOM probe:
```
.dock-stage              → 1 card, 1086×3471px, holds the whole page
.dock-stage-column       → 11 direct children (the 11 StorySections)
section bg/border/radius → transparent / 1px hairline / 0px radius   (NOT a card)
.dock-stage-tile bg      → rgba(0,0,0,0) ×6                            (transparent)
```
There is exactly ONE glassy/backdrop surface (the shared aurora stage). Every sub-section is a **transparent, card-less, zero-radius** block separated only by the `story-sections--delimited` hairline rule. The user ask is verbatim: *"each sub-section in its OWN glassy card."* The current model is the inverse — one mega-field, no per-section cards.

**Main card area**: `.dock-stage` is 1086px wide in a 1440px viewport (~75%), inset from the unbounded hero copy above it. The user wants "the main card area BIGGER (more screen space)" — there is headroom to widen the stage and/or give each per-section card more breathing room.

The architectural fix (gestalt, not a patch): replace the single `DockStage` mega-field with per-section **glassy cards**, each over its OWN slice of a *colorful* aurora (or each card carrying a tinted glass tier), the main stage widened. The `DockExampleTile` chassis (used by `dock-gallery`) is the existing in-repo pattern to transpose — it already does per-example glass-field staging.

## (5) PATH-LABEL standardization

**Page chip: PASS** — `@mkbabb/glass-ui/dock` (manifest.ts:277, rendered correct top-left).
**Inline drift: overview.vue:170** — a doc-comment hand-writes `import { DockSelectTrigger, DockDropdownTrigger } from "../../../src/components/custom/dock";` (the raw relative path). Should read the published `@mkbabb/glass-ui/dock`. Also all real imports (line 28, 45-46) use the relative `../../../src/...` form — fine for an in-repo demo, but the *displayed* label in the comment should match the standardized public path.

## (6) LANGUAGE — superfluous prose to tighten

The section blurbs leak internal tranche vocabulary into the demo surface:
- overview.vue:366-376 — the `dock-capture`/`items-lag harness`/`--dock-morph-t spring`/`:collapse-delay` comment block is implementation lore, fine as a comment but the *visible* slider blurb (351-361) is 7 lines ending in "it lives on the API surface, not the recipe" — internal framing.
- overview.vue:454-479 — the "Menus inside a dock teleport out" section is TWO dense paragraphs citing "the keyframes D9 break," "no-glass-on-glass rule made structural," "its own sampling region" — and renders NO live demo (text-only). Either give it a live mis-wire/correct-wire toggle or cut it to 2 lines.
- overview.vue:408-416 — "identity-scoped pass-through … never on whatever the layer swap moves under the pointer" — tighten to the user-facing claim ("a tap lands where you aimed, even mid-morph").

## (7) BUGS / dead demos

- **No functional break.** All docks render and are interactive; hover-expand morph and the background pause toggle work; console is error-free.
- **overview.vue:454 "Menus teleport out" is a TEXT-ONLY section** — two paragraphs, zero live component. It documents a contract but demonstrates nothing (a "dead" demo by intent). Should either show the contract live (a correctly-wired vs mis-wired dropdown side-by-side) or be folded into the Notes list.
- The first collapsible dock rendered `expanded` at rest in the capture (216×55, all 4 icons visible) rather than collapsed — acceptable (hover-to-expand still demonstrable), but the section heading "Collapsible (hover to expand)" implies a collapsed rest state the static page does not show.

---

## RECOMMENDED ARCHITECTURAL TRANSPOSITION (gestalt, no patch)

1. **Per-section glassy cards** over a **colorful** multi-hue aurora — retire the single flat `DockStage` mega-field; transpose the `DockExampleTile` per-example-glass-field pattern. Widen the main stage.
2. **Add the marquee dock APIs to the overview**: a `DockStack mode="facets"` contextual-carousel card, a `DockSection` tripartite-nav card, a `DockLayerGroup` contextual-switch card, and a compact `useDockOrientationMorph` V↔H teaser — so the overview actually overviews the dock's signature capabilities.
3. **Liven the aurora** (multi-hue preset / per-card hue) so the six-layer glass composite reads.
4. **Add a paper-morphism surface** (a paper-tier rail beside one glass card) for the dual-material story.
5. **Tighten the blurbs** to user-facing claims; make the text-only "teleport out" section live or cut it.
6. **Standardize the inline import comment** (overview.vue:170) to `@mkbabb/glass-ui/dock`.
