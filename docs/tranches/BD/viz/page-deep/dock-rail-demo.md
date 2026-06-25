# Pass-E META-STORYBOOK deep audit — `dock/rail`

- **Page**: `dock/rail` · import `@mkbabb/glass-ui/dock`
- **SFC**: `demo/stories/dock/rail.vue` (262 lines)
- **Live**: http://localhost:5173/dock/rail (audited at 1440×806, Chrome DevTools MCP)
- **North star**: DESIGN.md (iOS-26/27 six-layer optical composite · 7 tiers · spring physics) · design-idioms / motion-canon / affordance-map · the dock contextual-switching/morph/silhouette + `DockStack` rail APIs
- **Shots**: `_shots/dock-rail-full.png`

---

## Snapshot of what ships

FOUR `<StorySection>` demos in a flat `<StoryPage>`, NO `<DockStage>`, NO per-section card:

1. **Vertical dock** (`rail.vue:64-117`) — `<GlassDock orientation="vertical" always-expanded>`, home-left `#persistent` + `<DockSeparator>` + 8 nav `DockIconButton`s with `Tooltip` + `:aria-pressed`/`:aria-current` active state. The ONLY section with a live `<Aurora>` behind it (`:opacity-ceiling="0.4"`, `DEFAULT_AURORA_CONFIG`).
2. **Rounded shape** (`rail.vue:119-151`) — same dock with `shape="rounded"`, 4 nav buttons. NO aurora — bare page background.
3. **Collapsible vertical dock — it morphs its height** (`rail.vue:153-190`) — `:start-collapsed` + `#collapsed` slot, the height-morph. NO aurora.
4. **Stack rail — the macOS hover-expand stack** (`rail.vue:192-259`) — `<DockStack v-model:selected>` in the `#rail` slot of a collapsible dock, bound to a `<DockLayerGroup v-model:active>` (one registry). NO aurora.

Console (live): CLEAN of page-specific errors. Two GLOBAL warnings only — the routine `<Transition>` non-element-root warn (TooltipProvider) + the aurora `onInitError` advisory; neither is this page's defect.

Live structure probe: `auroraCanvases:1` (section 1 only) · `dockCount:6` · DockStack wired (`dock-stack vertical at-end mode-stack`, core + 3 members) · `.glass-dock-frame` escape + `.dock-hairline-slot` present · readout `active layer = assets`.

---

## (1) DEMO CONGRUENCE — component at its BEST + FULL API?

**Partial — good morph/active coverage, but the page's OWN headline API (`DockStack` facets) is under-demoed.**

- **GOOD** — the four cases cover the dock's core: orientation=vertical, shape, the height-MORPH (collapsible vertical), the active-item glass-tier register (`:aria-pressed`, no hand-rolled class), tooltips, and the `DockStack` rail in the `#rail` `.glass-dock-frame` escape bound one-registry to a `DockLayerGroup`. The active-state mechanism is verified live (the iOS selected-as-glass tier reads off `aria-pressed`).
- **MISS — `DockStack mode="facets"` is never shown.** `DockStack` ships TWO render modes (`DockStack.vue:15-25`): `"stack"` (the macOS glyph fan, DEFAULT) and `"facets"` (the BE.W-DOCK-RAIL-REALIZE context carousel — per-facet `--glass-accent` chromatic-rim hues, the active facet lifting onto the selected-as-glass tier). The page uses ONLY the default `mode="stack"` (`rail.vue:250-255`, no `mode` prop). For a page whose whole subject is the dock RAIL, the facets carousel — the one demo that shows the per-instance `--glass-accent` six-layer-composite RIM in action — is the most on-topic API and it's absent. This is the single biggest congruence gap.
- **MISS — `visibleCount` / the N-stack scroll path** (`DockStack.vue:34-35` `visibleCount` default 3 → `<FadingScroll>` overflow) is claimed in the blurb ("3 visible at rest; a longer stack scrolls", `rail.vue:206`) but the demo passes exactly 3 `railLayers`, so the scroll-through is never exercised (the same dead-claim class flagged on `dock/layers` vertical-overflow).
- **MISS — `DockSection`** (the declarative tripartite `DockSectionDescriptor[]` chassis) is demoed on `sections.vue`, not here — acceptable (no duplication), but a rail page is a natural home for the contextual-switch (route→facet) the rail drives.
- **The fan-out animation is LIVE, not dead** — the members exist (`opacity:0` at rest, the core `aria-expanded:false`); synthetic pointer events don't trip the `HOVER_INTENT_MS` dwell gate (a deliberate intent guard, not a bug). The structure (core + 3 members + frame escape) is correctly wired.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin for a flagship page.** The page composes the dock family + `Tooltip` + raw lucide icons — and nothing else. NO `<Card>`, NO `<SegmentedTabs>`, NO library `<Button>`, NO procedural viz beyond the single staging aurora (which appears in 1 of 4 sections). The in-pane content is just `<DockIconButton>` + glyphs. Contrast `overview.vue`, which weaves `Slider`/`HoverPopover`/`Select`/`DropdownMenu`/`DockBackgroundToggle` — this page is materially thinner and does not "deftly use a series of glass-ui components (docks/cards/tabs/buttons/procedural-anims)" as the audit asks.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field? PAPER where apt?

**The headline glass miss: 3 of 4 specimens have NO live field behind them.** Live probe is unambiguous — `auroraCanvases:1`, and the single Aurora sits under "Vertical dock" ONLY (`canvasUnderHeading:"Vertical dock"`). Sections 2 (Rounded), 3 (Collapsible-morph), and 4 (Stack-rail — the headline section!) render their glass docks over the BARE cream page background. The morphism (backdrop blur+saturate · surface tint · edge rim chroma) cannot read over a flat substrate — there is nothing behind to refract. The section blurb in §1 even names the rule ("the dock is glass — stage a low-intensity contained Aurora wash behind the specimen so the dock reads as glass against a backdrop … the empty-cream frame defeated the headline primitive", `rail.vue:75-78`) — but applies it to ONLY the first dock.

Even the ONE field that ships is the flat warm-cream `DEFAULT_AURORA_CONFIG` at `opacityCeiling:0.4` — a near-monochrome peach wash (full shot). The north star is "glass demos over COLORFUL aurora"; the field is one flat tone, so the surface-TINT + edge-rim CHROMA layers are under-demonstrated even where a field exists.

**Paper: absent.** GLASS-only; no paper-morphism register anywhere — acceptable for a pure chrome page, but the rail/separator structural mark is exactly where `.paper-ink-mark` could read.

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**This is the binding structural miss, mapping 1:1 onto the user asks.** Live: every section body is `backgroundColor: rgba(0,0,0,0)`, `backdropFilter: none`, `borderRadius: 0px` — the four sub-sections are flat `heading + prose + tile` units stacked directly on the page, NOT discrete glassy cards. They run together as one continuous column.

- **"each sub-section in its OWN glassy card"** — UNMET. Wrap each `<StorySection>` body in a `<Card surface="glass" tier>` (glass-quiet/floating) so each demo reads as its own plate. Today there is no card surface at all — only the per-tile `border/40` hairline.
- **"the main card area BIGGER (more screen space)"** — UNMET. Each dock specimen is a lone ~60-264px pill centred (`justify-start`, actually left-aligned) in a vast 1086px-wide tile (`p-6`/`p-10`). The specimen area carries no real content — no live preview the active layer/facet drives, no composed scene. The rail section especially (`min-h-[20rem] p-10`) is mostly empty gutter. Give the main area real content: a preview pane the `railLayer` selection drives (Assets/Layers/Libraries → a live card swap), which simultaneously fixes #1 (a card), #2 (bigger, content-bearing), and #2-congruence (shows the rail's contextual switching paying off).

## (5) PATH-LABEL standardization

**Visible chip CORRECT; in-SFC import NOT.** The header chip renders `@mkbabb/glass-ui/dock` (`manifest.ts:279`, verified live). BUT the SFC imports the relative deep path (`rail.vue:23 from "../../../src/components/custom/dock"`, `:24 .../ui/tooltip`, `:25-26 .../custom/aurora`). Consistent with every dock sibling (shared relative-import idiom), but does not match the canonical label the audit standardizes on. If the standard is the published subpath in source, `rail.vue:23-26` should read `@mkbabb/glass-ui/dock` / `/tooltip` / `/aurora`. Minor nit: lines 25-26 import `Aurora` and `DEFAULT_AURORA_CONFIG` as TWO separate statements from the same module — collapse to one.

## (6) LANGUAGE — superfluous prose to tighten

The blurbs over-explain with internal-mechanics / gate-vocabulary asides that belong in CLAUDE.md, not the demo:
- `rail.vue:192-207` (Stack rail) — a single 16-line paragraph carrying "rendered in the `#rail` slot OUTSIDE the clipped morph aperture", "the box is INVIOLATE", "it clears `<main>` by topology", "(one registry, no parallel state)" — implementation lore. The reader needs "hover the core and its members fan out beside the dock; clicking one switches the active layer; it persists when the dock collapses."
- `rail.vue:47-59` (script comment) — a 13-line essay on `BC.W-DOCK-STACK-RAIL` / one-registry binding; correct as code provenance but verbose.
- `rail.vue:64-74` (Vertical dock) — "There is ONE way to express orientation … no hand-rolled active class" is doctrine; tighten to the user-facing behavior.
- The `<code>` density is high (every blurb is 4-6 inline code spans); a demo reads better with prose + one or two key tokens, not a spec transcription.

## (7) BUGS

- **No runtime bug.** Drill/active-state, the collapsible height-morph, the DockStack structure, and the readout all function; console clean of page-specific errors.
- **Dead CLAIM (not a crash):** "3 visible at rest; a longer stack scrolls" (`rail.vue:206`) — only 3 items ship, so the `<FadingScroll>` overflow path is never demonstrated.
- **Glass-suffusion defect (the binding visual one):** 3 of 4 dock specimens have no field behind them (§3) — the glassmorphism does not read on those three.

---

## Priority fixes (for BD execution)

1. **Wrap each sub-section in its own glassy `<Card>`** (user ask #1) — discrete plates, not one running column. STRUCTURAL, highest impact.
2. **Stage a LIVE colorful aurora behind EVERY dock specimen** (user ask + §3) — share ONE offscreen-paused field via `<DockStage>` (the `dock/layers`+`overview` precedent), and swap the flat `DEFAULT_AURORA_CONFIG` for a higher-chroma / multi-hue preset so the surface-tint + edge-rim chroma read. Today only 1 of 4 has a field, and it's monochrome.
3. **Demo `DockStack mode="facets"`** (the page's own headline API gap, §1) — the per-facet `--glass-accent` context carousel is the most on-topic rail demo and is entirely absent.
4. **Bigger, content-bearing main area** (user ask #2) — give the rail/layer specimen a live preview pane the `railLayer` selection drives (Assets/Layers/Libraries → a `<Card>` swap), so the contextual switching pays off visibly instead of a lone left-aligned pill in empty gutter.
5. **Compose a richer component series** (§2) — add `<Card>`/`<SegmentedTabs>`/`<Button>` + a procedural viz tile; retire the raw-glyph thinness.
6. **Exercise the N-stack scroll** — pass >`visibleCount` items so the `<FadingScroll>` overflow path is real (kills the dead claim).
7. **Standardize the in-SFC import to `@mkbabb/glass-ui/dock`** + collapse the split aurora import.
8. **Tighten the gate-vocabulary asides** out of the blurbs (esp. the 16-line Stack-rail paragraph).
