# Pass-E META-STORYBOOK deep audit — `dock/layers`

- **Page**: `dock/layers` · import `@mkbabb/glass-ui/dock`
- **SFC**: `demo/stories/dock/layers.vue`
- **Live**: http://localhost:5173/dock/layers (audited at 1440×900, Chrome DevTools MCP)
- **North star**: DESIGN.md (iOS-26/27 six-layer optical composite · 7 tiers · spring physics) · design-idioms / motion-canon / affordance-map · the dock contextual-switching/morph/silhouette APIs
- **Shots**: `_shots/dock-layers-{full,mid,low}.png`

---

## Snapshot of what ships

Six `<StorySection>` demos + a "Mechanics" note, all wrapped in ONE shared `<DockStage>` (one
offscreen-paused aurora field, height 2161px, `overflow:hidden`):

1. **Drill-in navigation** — `DockLayerGroup` root pane → three drill-in panes (`always-expanded fit-content`). VERIFIED LIVE: click `Assets` → readout flips `root`→`assets`, dock resizes in place.
2. **Switcher rail — pull-to-switch** — `show-rail` (default) + `draggable` (`useDragMorph` consumer #2). Rail renders 3 tabs (verified).
3. **Rail-hosted layer stack** — `orientation="vertical"` group, hand-rolled `DockIconButton` switcher.
4. **Collapse while switching layers** — collapsible dock + `#collapsed` slot.
5. **Vertical overflow — a tall pane scrolls cleanly** — 8-row pane in a vertical group.
6. **Mechanics** — a 5-step ordered-list of the FLIP measure algorithm.

Console: clean (only the routine page-level `<Transition>` non-element-root warn + the aurora `onInitError` advisory — both global, neither this page's).

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**Partial.** The DRILL-IN + SWITCHER-RAIL + COLLAPSE cases are genuinely good and exercise the
contextual-switching heart (`DockLayerGroup` v-model, `show-rail`, `draggable`/`useDragMorph`,
`#collapsed`). But the page's own subject — *layering / contextual switching* — has a real API gap and a dead demo:

- **MISS — the declarative layering chassis is absent.** `DockSection` (`DockSectionDescriptor[]` — the "reusable layering abstraction" the dock band built for exactly this) and `DockStack` (the contextual carousel, `mode="facets"` per-facet `--glass-accent`) are the two APIs most on-topic for a "layers" page, yet neither appears here (`layers.vue:6` imports only `GlassDock, DockIconButton, DockLayerGroup, DockLayer, DockSeparator`). They ARE demoed on sibling pages (`sections.vue` heading "Declarative tripartite sections"; `rail.vue` uses `DockStack`), so no duplication is needed — but the layers page would be the natural place to show the contextual rail context-SWITCHING (route→facet) that `useContextualDockLayers`/`railContext` drive, which no dock story currently shows in-context.
- **BUG / DEAD DEMO — "Vertical overflow … scrolls cleanly" does NOT scroll** (`layers.vue:224-266`). The host measures 249px tall and CONTAINS all 8 rows; live probe: no element under `dock-vertical-overflow-group` has `scrollHeight > clientHeight` (`overflowHasScroll:false`). The blurb claims "more rows than the resting height — it scrolls its own block axis cleanly without fighting `max-height`," but the dock grows to fit, so the scroll path is never demonstrated. Either the resting height must be capped (`max-block-size` / a fixed host height) so the 8 rows genuinely overflow, or the demo is misleading. As-is it shows a tall static pane, not a scroll.
- **Thin "Rail-hosted layer stack" (3) vs "Switcher rail" (2)** — section 3 hand-rolls a `DockIconButton`-per-layer switcher with `:aria-pressed`/`@click`, which is just a manual version of the `show-rail` the page already demos in section 2. It reads as a near-duplicate; its stated point (vertical group inherits orientation) is real but under-sold — it could instead show `DockSection`/`DockStack` for genuine API breadth.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin for a flagship page.** The page composes only the dock family + bare `<button>`s + raw lucide
icons. It does NOT weave the broader series the audit asks for (cards/tabs/buttons/procedural-anims):
no `<Card>`, no `<SegmentedTabs>`, no library `<Button>`, no procedural viz beyond the staging aurora.
The drill-in panes use raw `<button class="… hover:bg-muted">` (`layers.vue:80-90`) instead of the
library's own glass `DockIconButton`/`<Button>` register, so even the in-pane affordances are flat
Tailwind, not the glass-first surface the band ships. Contrast `overview.vue`, which deftly composes
`Slider`, `HoverPopover`, `Select`, `DropdownMenu`, `DockBackgroundToggle` — this page is materially
thinner.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field? PAPER where apt?

**Glass: present but MONOCHROME.** Each tile IS transparent over the shared `<DockStage>` aurora
(`.dock-stage-tile { background: transparent }`), so the dock glass floats over a live field — the
morphism reads (the docks show backdrop blur + rim). GOOD. BUT the field is the DEFAULT warm-cream
`DEFAULT_AURORA_CONFIG` at `opacityCeiling: 0.42` — a near-monochrome peach wash (see all three shots).
The audit's north star is "glass demos over COLORFUL aurora" — the field here is one flat warm tone,
so the six-layer composite (esp. the surface TINT + edge rim chroma) is under-demonstrated. A
multi-hue / higher-chroma aurora preset (or per-tile accent via `--glass-accent`) would make the
glassmorphism POP as intended.

**Paper: absent.** The page is GLASS-only; no paper-morphism register (`.paper-ink-mark`,
`paper-grain-overlay`, blueprint grid) anywhere, though the "Mechanics" ordered-list step block
(`layers.vue:268-276`) is exactly the kind of editorial content that the math-paper idiom would
elevate. Apt opportunity, unused.

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**This is the headline structural miss.** The six sub-sections are NOT in their own glassy cards. They
are flat `heading + prose + transparent-tile` units stacked on ONE continuous aurora wash inside ONE
clipped `.dock-stage` (height 2161px, `overflow:hidden`). Live: there is no per-section card surface —
only a faint `border-border/30` hairline around each tile, and the section heading/prose sit DIRECTLY
on the aurora field (mid/low shots). The sections "run together"; the gestalt is a single long peach
panel, not a sequence of discrete glassy cards.

The user's explicit asks map directly onto fixes here:
- **"each sub-section in its OWN glassy card"** — wrap each `<StorySection>` body in a `<Card>` (a
  `glass-quiet`/`glass-floating` tier) so each demo reads as its own plate. Today the only "card" is
  the page-spanning DockStage container.
- **"the main card area BIGGER (more screen space)"** — the demo column is `clamp(1.25rem,3vw,2.5rem)`
  padded inside an 1086px-wide stage, but each dock specimen sits in a `p-10` tile centred in a vast
  empty field (full shot: the drill-in dock is a 264px pill alone in a 1086px-wide expanse). The
  specimen ITSELF could be larger / the tile could host more (a live preview pane the active layer
  drives), giving the "main card area" real content rather than a lone centred pill.

## (5) PATH-LABEL standardization

**Visible chip CORRECT, in-SFC import NOT.** The header chip renders `@mkbabb/glass-ui/dock`
(manifest `manifest.ts:278 "dock/layers": "@mkbabb/glass-ui/dock"`, surfaced by StoryPage) — verified
live. BUT the SFC import is the relative deep path `layers.vue:6 import { … } from "../../../src/components/custom/dock"`. Every dock story shares this relative-import idiom, so it is consistent
within the repo, but it does NOT match the canonical label the audit standardizes on. If the standard
is the published subpath in source, `layers.vue:6` (and siblings) should read `@mkbabb/glass-ui/dock`.
(`overview.vue:170` even carries a stray `<!-- import { … } from "../../../src/components/custom/dock"; -->`
comment that duplicates the relative path as a pseudo-label — the inconsistent register the audit flags.)

## (6) LANGUAGE — superfluous prose to tighten

Several blurbs over-explain with internal-mechanics asides that belong in CLAUDE.md, not the demo:
- `layers.vue:119-126` (Switcher rail) — "(the `useDragMorph` consumer #2; the reka Arrow-key roving stays)" is internal bookkeeping; tighten to the user-facing behavior.
- `layers.vue:190-196` (Collapse) — "ONE spring (one `--dock-morph-t` clock) — no second engine, no double-animated pixels" is implementation lore; the reader needs "the dock box and pane stack morph on one spring," not the gate-vocabulary.
- `layers.vue:12-31` (script comments) — three multi-line essays on `root`-ref scoping / B6 break; correct as code comments but verbose.
- The "Mechanics" list (`268-276`) is fine but reads as a spec excerpt; a demo could SHOW the FLIP rather than enumerate it.

## (7) BUGS

- **Vertical-overflow demo does not overflow/scroll** (see §1) — the binding defect. `overflowHasScroll:false` live; host fits all 8 rows.
- No other runtime bug; drill-in + rail + collapse all function; console clean of page-specific errors.

---

## Priority fixes (for BD execution)

1. **Wrap each sub-section in its own glassy `<Card>`** (user ask #1) — discrete plates, not one running wash. STRUCTURAL, highest impact.
2. **Fix the dead vertical-overflow demo** — cap the host height so it genuinely scrolls (BUG).
3. **Bigger / richer main specimen area** (user ask #2) — give each tile real content (a live preview the active layer drives) instead of a lone centred pill.
4. **Colorful aurora** — swap the flat warm-cream field for a higher-chroma / multi-hue preset (or per-tile `--glass-accent`) so the six-layer glass composite reads.
5. **Compose a richer component series** — add `<Card>`/`<SegmentedTabs>`/`<Button>` + on-topic `DockSection`/contextual-rail switching; retire the near-duplicate hand-rolled section 3.
6. **Standardize the in-SFC import to `@mkbabb/glass-ui/dock`** + drop the stray relative-path comment idiom.
7. **Tighten the gate-vocabulary asides** out of the demo blurbs.
8. **Add a paper-morphism register** to the Mechanics block where apt.
