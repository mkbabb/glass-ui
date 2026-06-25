# Pass-E META-STORYBOOK DEEP AUDIT — dock/sections

- **Page**: `dock/sections`
- **Import**: `@mkbabb/glass-ui/dock`
- **SFC**: `demo/stories/dock/sections.vue` (107 lines)
- **Component**: `<DockSection>` (`src/components/custom/dock/DockSection.vue`) + `DockSectionDescriptor`
- **Live**: http://localhost:5173/dock/sections (spot-checked, real Chrome)
- **Verdict tier**: NEEDS REWORK — the component is correct + ships; the DEMO is the thinnest dock story in the band, under-composes the dock APIs, under-suffuses the glass, and leaves the card area tiny.

---

## Live spot-check (facts)

The component itself renders correctly (`browser_evaluate` over the specimen dock inside `.dock-stage-tile`):

- Specimen dock: horizontal, **495×55px**, NOT collapsed (`always-expanded` honored).
- Zones: `["rail-core","section","section","section","nav"]` — the 5-descriptor array drives 5 zones (the S1 descriptor-driven contract holds; not a hardcoded literal).
- Separators: **4** between zones; **9** icon buttons.
- Glass: `backdrop-filter: blur(9px)`, `background-color: srgb(0.895 0.883 0.867 / 0.443)` — the translucent glass plate paints.
- Aurora canvas present (1086×543), `.dock-stage-field` opacity 1.
- Console: **0 errors**, 2 benign warnings.

So: NO BUG. The chassis works, the dividers seat, the glass is real. Every finding below is DESIGN/COMPOSITION, not breakage.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**WEAK.** `<DockSection>` is the *declarative contextual-grouping* chassis (its own docstring: "abstract this into a re-usable component for layering"; the descriptor carries a `layers` facets field for contextual switching). The demo exercises ONLY the static skeleton:

- `sections.vue:36-42` — the descriptor array sets **zero `layers` facets** on any section (the comment at `:34-35` even flags it: "here the focus is the section grammar itself, so the sections carry no facets"). So the page's headline API affordance — section facets feeding the seam rail OUTSIDE the box, the contextual-switching story — is **never shown**.
- No `anchorId` override is demonstrated (`DockSection.vue:53` prop) — the caption at `sections.vue:100-103` *describes* it in prose but the demo never toggles it, so the reader cannot SEE the anchor seam move.
- `always-expanded` (`sections.vue:68`) freezes the dock — so the **collapse↔expand morph** (the dock band's headline animation, every other dock story shows it) is absent. A sections dock that never morphs cannot show how sections behave through the morph.
- **Zero interaction/animation**: no `ref` state, no active-section, no click handler, no `v-model`. Contrast `rail.vue:45,54` (two live `ref`s + `DockStack v-model:selected` + `DockLayerGroup v-model:active` one-registry) and `overview.vue` (645 lines, full morph + density + nav-pattern). This is the only dock story with **no live state at all**.

The "HIGH animation affordance for EVERY component" north star is unmet: this demo has none.

## (2) COMPONENT ABILITY — deft series of glass-ui components, or thin/flat?

**THIN/FLAT.** The page composes exactly **three** library pieces: `GlassDock` + `DockSection` + `DockIconButton` (`sections.vue:16-20`). Compare the band:

| story | lines | components composed |
|---|---|---|
| `overview.vue` | 645 | dock + layers + density + nav-pattern + morph |
| `rail.vue` | 261 | GlassDock + DockLayerGroup + DockLayer + DockSeparator + **DockStack** + Tooltip + Aurora + live refs |
| `layers.vue` | 286 | dock + layer-group + DockStage |
| **`sections.vue`** | **107** | **dock + DockSection + DockIconButton** |

It is the shortest dock SFC by ~2.4× and composes no tabs, no buttons, no procedural-anim beyond the shared stage, no Tooltip, no layer group, no DockStack. The user ask — "each page deftly uses a SERIES of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" — is the most under-met here of any dock page.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**PRESENT BUT WEAK.** `<DockStage>` is wired (`sections.vue:52`, `DockStage.vue`) and the aurora canvas paints, AND the dock threads `:background-canvas="backgroundCanvas"` (`sections.vue:68`) so the luminance observer is connected — good. BUT:

- `opacityCeiling` defaults to **0.42** (`DockStage.vue:29`) and the field uses `DEFAULT_AURORA_CONFIG` (the calm wash). In the full-page capture the backdrop reads as a **flat warm peach band**, not a COLORFUL aurora — there is no hue travel, no procedural movement legible behind the dock. The user ask is explicit: "glass demos over COLORFUL aurora backgrounds." This is a pale single-tone wash, not colorful.
- Live `--glass-backdrop-luma` read **0** on the shell dock (the observer over the demo shell), suggesting the dynamic-darkening sample is not landing a real field luma in the staged context — worth a re-check, though the specimen plate alpha (0.44) looks correct.
- **NO PAPER morphism** anywhere, despite the band's GLASS+PAPER mandate. A "System" / "Assets" section grouping is a natural place for a paper-grain panel or a `.paper-ink-mark` section rail behind the glass dock — none present.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main card BIG enough?

**FAILS BOTH.** The user ask is verbatim: "each sub-section in its OWN glassy card; the main card area BIGGER (more screen space)."

- There is **ONE** `<StorySection>` and **ONE** tile (`sections.vue:53,65-67`) — `stageTileCount: 1` live. The page is a single flat panel, not a series of glassy cards. The prose paragraph (`:54-64`), the dock tile, and the caption (`:100-103`) all sit in one undivided column. The DockSection demo, the anchor-override demo, and a facets/contextual demo SHOULD each be their own glassy card.
- The dock tile is `p-8` (`sections.vue:66`) holding a 495×55 dock — the dock occupies a sliver of a low, wide band; the full-page capture shows enormous dead space above and below. The "main card area BIGGER / more screen space" ask is unmet — the specimen is small in a thin letterbox.
- The tile uses `border-border/30` + `rounded-[var(--radius-card)]` (`sections.vue:66`) — a hairline frame, NOT a glassy card (no glass tier, no blur, no rim). It is a transparent `.dock-stage-tile` by design (so the dock glass reads over the field), but the *page sub-sections* around it are not carded at all.

## (5) PATH-LABEL standardization

**Manifest label correct** (`manifest.ts:281` → `@mkbabb/glass-ui/dock`). BUT the SFC imports from the **deep relative path** `../../../src/components/custom/dock` (`sections.vue:20`), same as the sibling stories — consistent within the repo's demo convention (stories import `src/` directly), so this is acceptable for the demo. No in-page `@mkbabb/glass-ui/...` label string is rendered to standardize; the StoryPage chrome shows `@mkbabb/glass-ui/dock` (visible top-left in capture). **OK** — no action beyond noting the convention is uniform.

## (6) LANGUAGE — superfluous prose to tighten?

**YES, heavy.** The SFC carries ~30 lines of comment exposition (`sections.vue:23-35`, `:45-51`) restating the docstring verbatim. In the RENDERED prose:

- `sections.vue:54-64` — a dense 5-`<code>`-token paragraph ("rail-core | divided sections | nav", "display: contents", "shrink-wraps exactly as it would without it (no inflation)") leaks **implementation internals** (`display: contents`, "no inflation") into user-facing copy. The reader does not need the no-inflation contract; that's a gate concern. Tighten to the WHAT (one descriptor array → three zones), drop the HOW.
- `:100-103` — "The nav-separator seam is the rail's default anchor (the `anchorId` prop overrides it)" describes a feature the demo never demonstrates — either show it or cut it.
- The block comments `:23-35` + `:45-51` duplicate `DockSection.vue:6-38` — redundant; trim to a one-line pointer.

## (7) BUGS

**None functional.** 0 console errors; dock + sections + dividers + glass all paint. One soft concern: the shell-dock `--glass-backdrop-luma: 0` read (dynamic darkening may not be sampling the staged field) — re-verify the observer over `.dock-stage-field`, but the specimen plate alpha is healthy so this is not user-visible breakage.

---

## Concrete recommendations (architectural, no workarounds)

1. **Split into ≥3 glassy cards** (own `<StorySection>` + a real glass-tier card each): (a) the tripartite grammar, (b) the **facets/contextual-switching** demo with `descriptor.layers` populated + a live `ref` driving a seam `<DockRail>`/`<DockStack>`, (c) the `anchorId`-override demo with a toggle the reader can flip.
2. **Show the morph** — drop `always-expanded` on at least one specimen so the collapse↔expand reads, OR add a collapse toggle button (composes a `<Button>` — also satisfies the component-series ask).
3. **Make the field colorful** — lift `opacityCeiling` and pass a vivid multi-hue `AuroraConfig` preset (presets-in-consumers) so the glass morphism actually reads; consider a PAPER-grain section behind one card for the GLASS+PAPER mandate.
4. **Enlarge the specimen** — give the dock tile real height/breathing room; the dock should be the focal mass, not a sliver in a letterbox.
5. **Add contextual switching** — a live `ref` + section facets so the page demonstrates the dock's actual headline (sections AS the layering/contextual-switch substrate the docstring promises).
6. **Tighten prose** — cut implementation internals from rendered copy; trim duplicated block comments; remove the orphan `anchorId` caption or back it with a live demo.
