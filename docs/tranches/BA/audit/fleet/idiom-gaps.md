# BA fleet — lane: idiom-gaps

The gestalt idiom census (SD-7's "what glass-ui idioms might we adopt — what
items, if totally befitting, might we smoothen, refine, hone, and abstract out…
Look for gaps"). Audited master @ HEAD (v3.13.0), live-probed :5199 (light + dark),
source read across `src/components/{ui,custom}/`, `src/styles/`, `demo/`.

Scope discipline — sibling lanes own these, this lane CROSS-REFERENCES (does NOT
re-derive): the `FadingScroll` primitive is fully developed by `fading-scroll.md`
(R8-8); the {glass,veil,tone} feedback-variant axis by `toast-glass.md` +
`glass-variant-census.md` (R8-12/13); the play-control register by
`demo-affordances.md` (R8-17); the dock-section/rail-seat geometry by
`dock-rail-seat.md` + `fd-nav-dock-data.md` (R8-1/9). Where this lane TOUCHES one
it is to name the LIBRARY-ABSTRACTION verdict those lanes leave open, not to
re-litigate their root-cause.

The census is in three buckets per the lane charter: (a) demo-private patterns that
earned library promotion · (b) library components wanting refinement · (c) MISSING
idioms a glassmorphic system of this ambition should have. Each carries its
≥2-consumer evidence or an honest single-consumer book.

---

## BUCKET A — demo-private patterns that earned library promotion

### A1 (S2) — the deck PAGE-TURN primitive (R5-9, UNADDRESSED on the slides bank)

**The pattern.** The slides repo (`~/Programming/slides`, `src/styles/deck.css` +
the M-tranche W-R13 record) refined an editorial 3D page-lift: incoming page
`rotateY 6deg` off the leading edge on the spring clock + travel; the leaving page
dips to `scale 0.985` under a scrim; the gutter is the lifted page's CAST SHADOW (a
dual-edge gradient INSIDE the page box, mode-adaptive — warm-ink cast on cream
flipping to a cream SHEEN on ink). It was verified Chrome+Firefox+WebKit, light+dark,
with FULL suppression (freeze/export/print/PRM → identity matrix + zero pseudo
paint).

**Evidence / consumer count.** Single binary consumer at slides HEAD (DeckView), but
booked "lift WHOLESALE on wave cadence" in AZ FINAL §6 and re-confirmed UNADDRESSED by
`prompts-recap-2.md:96`. It is the pure-CSS stacked-slide COMPLEMENT to the library's
existing `useViewTransition` (`src/composables/motion/`, AQ.W5) — VT crossfades the
compositor (captures cannot fully suppress its transition); the page-turn is the
`[data-state]{active|prev|next}`-driven CSS path captures CAN freeze to identity. The
two are a matched pair; the library ships one half and the slides repo trapped the
other. Honest book: ONE binary consumer today, but the substrate-without-consumer bar
is met by the library/consumer split — glass-ui owns the `useViewTransition` half, so
the page-turn belongs beside it on the same `/motion`-core seam rather than living in a
downstream `deck.css`.

**Gestalt remedy DIRECTION.** Lift the `[data-state]{active|prev|next}` contract + the
documented `--turn-*` token surface (travel/dur/fade/lift/perspective/dip-scale/
gutter-hue/strength[-dk]/width/scrim) + the suppression contract into glass-ui as the
stacked-slide editorial-transition primitive (a `.glass-page-turn` recipe + the token
table, the CSS half on the existing animation/transitions cascade; an optional thin
`useViewTransition`-adjacent helper for the state machine). BINDING discipline carried
from the slides record: the composed tokens (gradient / cast ink) must declare ON THE
SLIDE from PLAIN-VALUE inputs, never a `:root`-composed gradient — the substitution
trap (a `:root`-composed gradient freezes the dark flip + the responsive retune) bit
twice in slides and is the same substitution-vs-inheritance class CLAUDE.md warns about
on the dock-scale + glass-tint seams.

### A2 (S2) — the glass MENU-ROW + PANEL-SECTION recipes (R5-10, UNADDRESSED)

**The pattern.** The slides gear menu (`DeckSettings.vue`, ~120 lines of CSS) had to
hand-build two recipes the library lacks: (1) a "menu item as a full-width
`.glass-quiet` hover-lift plate" — 44px touch floor, leading-glyph / label /
trailing-glyph, `translateY` lift on hover + `data-highlighted` parity, PRM-gated; and
(2) a "mono section-label + hairline over a row group" section recipe. The roomier
panel-padding rung that R5-10 also names DID land (= R5-4).

**Evidence / mechanical confirmation.** The library's `DropdownMenuContent` /
`ContextMenuContent` are correctly `glass-floating rounded-panel` plates, BUT the shared
`menuItemVariants` CVA (`src/components/ui/_shared/menuItemVariants.ts:32-56` — the
canonical CVA for **9 menu-family + picker-family primitives**) paints its hover/focus/
highlight triad as a FLAT `hover:bg-accent` / `focus:bg-accent` /
`data-[highlighted]:bg-accent` accent FILL, with NO glass-plate, NO `translateY` lift,
and NO leading/trailing-glyph slot grammar beyond the `indicator` gutter variant. So
every menu item in the library — across DropdownMenu, ContextMenu, Command, Select,
Combobox — reads as a flat-accent row, and a glassy menu-row consumer has to bypass the
CVA. ≥2-consumer bar: PASSES decisively — the CVA already fans to 9 primitives; the
menu-row register would re-tint all of them in ONE edit, and the slides `DeckSettings` is
the named first downstream consumer.

**Gestalt remedy DIRECTION.** Mint the glass-menu-row register ONCE on the existing
shared `menuItemVariants` CVA (not a parallel class) — a `surface` axis (default the
current flat-accent for back-compat-by-design, OR flip the default to the glass-quiet
hover-lift register since glass is the MAXIMAL default per AX.W54) that swaps the flat
`bg-accent` for a `.glass-quiet`-tier hover plate + the PRM-gated `translateY` lift, on
the SAME `--ease`/`--spring` doctrine the rest of the library speaks (§6: surface props
→ `--ease-standard`, the lift transform → `--spring-smooth`). The companion
`.glass-menu-section` recipe (mono caption + hairline + row group) folds onto the
existing section/eyebrow vocabulary (`typography.css` `.section-label` +
`--border-hairline`). Because it rides the shared CVA, every menu/picker primitive
inherits the glassy row with zero per-SFC edits — the substitution-over-redeclaration
discipline. This is also the SEED of R8-12's "all components glassy" census on the
menu/dropdown band (`glass-variant-census.md` flags Dropdown/Context/Command content as
glass-by-default but the ITEMS as flat-accent).

### A3 (S2) — the route→layer-menu abstraction (R8-9: "abstract this into a re-usable component for layering")

**The pattern.** The demo shell binds the dock's layer registry to the active route via
`demo/composables/useContextualDockLayers.ts` (66 lines — a route-keyed
`CONTEXT_LAYER_MAP[categoryId]` lookup) + `demo/stories/dock-layer-contexts.ts` (358
lines — the per-category layer descriptor map). R8-9 reads as TWO asks the dock lanes
split: the GEOMETRY (rail core + sections + nav arrows — owned by `dock-rail-seat.md` /
`fd-nav-dock-data.md`) AND "abstract this into a re-usable component for layering and
such within the demo" — the LAYER-MENU abstraction, which NO sibling lane develops as a
promotion verdict.

**Evidence / consumer count.** `useContextualDockLayers` is GENERAL and route-indexed
(reads `route.meta.categoryId` only, never a per-route branch), and is consumed by BOTH
shell docks (BottomDock + SidebarDock) — already ≥2 binary consumers in the demo. The
`DockLayerGroup` + `DockLayer` registry it drives IS library; the route→layer SEAM and
the descriptor-map shape are demo-private. The honest read: the route-keyed seam is
demo-coupled (it reads a router meta the library cannot own), so the PROMOTION is NOT the
route lookup — it is the DECLARATIVE layer-SET descriptor + the menu shape (the section
model R8-9 names: a `DockLayerGroup` that renders rail-core + grouped sections + nav
arrows from a plain descriptor array).

**Gestalt remedy DIRECTION.** Two-part. (1) The route-binding stays demo-private (it is
correctly thin and router-coupled — the AY.W-DOCK-CONTEXT verdict holds). (2) BUT the
"menus — abstract this into a re-usable component for layering" half is a library gap:
`DockLayerGroup` today renders a flat switcher rail; the R8-9 section model (a CORE rail
region + named SECTIONS + nav arrows) wants a declarative section-descriptor contract on
`DockLayerGroup` (or a sibling `DockSection` — the dock band has `DockLayerGroup` /
`DockSeparator` / `DockRail` but NO `DockSection`), so a consumer declares
`[{ kind: 'rail-core' | 'section' | 'nav', layers: […] }]` and the group renders the
sectioned switcher. This is the reusable layering component R8-9 asks for; it composes
the EXISTING registry + `DockSeparator` rather than a parallel layer machine. Cross-ref:
the GEOMETRY/seat of these sections is `dock-rail-seat.md`'s lane.

### A4 (S2) — the demo play-control register (R8-17) — LIBRARY verdict, not just demo-chassis

`demo-affordances.md` owns R8-17's root-cause (the `.btn-pill.glass-btn` composition
collapse, `curve-gallery.vue:189`) and proposes a `<StoryPlayButton>` DEMO-CHASSIS
primitive. This lane adds the LIBRARY-side idiom verdict it leaves implicit: the
collapse is a CALLER HAZARD in the LIBRARY surface — `.glass-btn`
(`src/styles/glass/surfaces.css:46-64`, a fixed `--size-icon-btn` square + `contain:
paint`) and `.btn-pill` (content-width text pill) are mutually-exclusive size registers
the library lets a caller stack silently. The idiom gap is a missing GUARD (a
negative-predicate proof: no element composes both `.glass-btn` and `.btn-pill`, or no
text-bearing `.glass-btn`) — the same "silent no-op / stale-binding" trap class the house
already gates elsewhere. The demo-chassis `<StoryPlayButton>` is the demo half; the
library half is the composition guard. Cross-ref `demo-affordances.md` for the full
survey.

---

## BUCKET B — library components wanting refinement (rough edges, not duplicated)

> NOTE — the following do NOT duplicate the sibling defect lanes. R8-14
> (ProgressSectioned) is `progress-sectioned.md`'s; R8-12/13 (Toast/Notification tone)
> is `toast-glass.md`'s; R8-4 (configurator occlusion) is `configurator-occlusion.md`'s;
> R8-19 (glass blur) is `glass-blur-cal.md`'s. The items below are idiom rough-edges no
> defect lane claims.

### B1 (S2) — NO shared `surface` decoration axis (glass · veil · opaque) across the content/floating bands

The single highest-leverage idiom gap, cross-confirmed by `glass-variant-census.md`
finding 2. The library HAS the material — the 5-rung `--glass-*` ladder, the
`--glass-level` opacity knob (AX.W54), the `.glass-opaque` escape, AND a `veil-surface`
utility (`src/styles/cards.css:78-101`) — but it minted `--glass-level` as a SHARED knob
while leaving the SURFACE-VARIANT vocabulary un-factored. `veil` exists in EXACTLY ONE
place: `<Card surface="glass|cartoon|veil">`. Dialog has `glass|opaque`; Sheet / Drawer /
Popover / DropdownMenu / Tooltip / HoverCard expose NO surface axis at all (so a
`<Sheet surface="opaque">` or `<Tooltip surface="veil">` is unspeakable). The idiom gap
is that the house speaks ONE material vocabulary but THREE surface-axis dialects (Card's
full axis, Dialog's binary, everyone else's none).

**Gestalt remedy DIRECTION.** Factor a single `surface` decoration axis (`glass` default
· `veil` · `opaque`) into a shared mixin/prop — the way `--glass-level` was factored —
adopted uniformly across the content + floating + feedback bands, so every surface speaks
ONE grammar. The `veil` rung becomes a library-wide register, not a Card one-off; this is
the substrate the feedback-tone wave (`toast-glass.md`) and the menu-row wave (A2) both
consume. ≥2-consumer bar: the entire content + floating band (~12 primitives).

### B2 (S2) — `<ToggleGroup>` is a bare flex, not a glass SEGMENTED-CONTROL container

`src/components/ui/toggle-group/ToggleGroup.vue:28` — the root is
`cn('flex items-center justify-center gap-1')`, a bare flex with NO container plate. The
custom `<SegmentedTabs variant="segmented">` (AX.W53) DOES ship the glass segmented track
+ the one elastic spring indicator, but it is a TABS/toggle family on its own engine —
the `ui/` `<ToggleGroup>` (the canonical multi-toggle, the documented "independent-or-
single-select toggles that mutate one surface" register per CLAUDE.md "Tabs vs
ToggleGroup") has none of that material. So a consumer reaching for the SEMANTICALLY-
correct `<ToggleGroup>` (e.g. a view-mode switcher) gets a flat gap-1 row of loose
toggles, while the segmented glass plate lives only on the panel-nav `<SegmentedTabs>`.
This is an idiom inconsistency: the two surfaces the house tells you to pick BETWEEN have
divergent material richness.

**Gestalt remedy DIRECTION.** Give `<ToggleGroup>` an optional `variant="segmented"` glass
container register that reuses the SegmentedTabs track + indicator material (the
`useTabIndicator` squish composable + the `--glass-bg-quiet` track) rather than a third
implementation — so the two semantically-paired surfaces share ONE material vocabulary and
the choice between them is purely about role (panel-nav vs surface-toggle), never about
which one happens to look glassy. Honest single-consumer-today caveat: the segmented
ToggleGroup has no current binary consumer, so the book is "promote the SegmentedTabs
material to a shared register both consume" rather than "ship a net-new container".

### B3 (S3) — `<Sheet>` exposes no surface variant while its sibling `<Dialog>` does

`glass-variant-census.md` flags this in passing; naming it as a discrete refinement:
`SheetContent` (`sheetVariants`, `index.ts:18`) varies ONLY on `side` — no `glass|opaque`
axis — while its modal sibling `<Dialog>` ships `variant: glass|opaque`. Two members of
the same modal-chrome family diverge. Folds into B1's shared-axis remedy (the fix is NOT a
Sheet-local variant, it is the shared `surface` axis reaching Sheet).

### B4 (S3) — `<GlassPanel>` (custom) and `<Card>` (ui) have divergent tier/surface axes

`<Card>` exposes `tier` (5-rung) + `surface` (glass|cartoon|veil); `<GlassPanel>` exposes
`tier` only (no `surface`). Both are the house's "glass plate container" primitive, split
across the ui/custom bands with different axes. The idiom rough-edge: a consumer cannot
predict which container speaks which axis. Folds into B1 (the shared `surface` axis reaches
GlassPanel too) — recorded so the shared-axis wave knows GlassPanel is in scope.

### B5 (S3) — `ExpandableContainer` fullscreen state is a solid `bg-background` wall

`src/components/custom/expandable-container/ExpandableContainer.vue:20` — the trigger is
glassy (`bg-card/70` + blur) but the EXPANDED fullscreen overlay is `fixed inset-0
bg-background`, an opaque off-allowlist plate (also flagged by `glass-variant-census.md`
finding 3). The idiom gap: a "lightbox/expand" overlay in a glass-first system should
expand to a frosted-over-content plate, not a solid wall that erases the page behind. The
gestalt direction: route the expanded plate through the floating/overlay glass tier (it is
already a modal-class overlay — the material exists), so the expand reads as the surface
LIFTING off the page rather than replacing it.

---

## BUCKET C — MISSING idioms a glassmorphic system of this ambition should have

### C1 (S2) — a glass SEGMENTED METER (the R8-14 `ProgressSectioned` is the seed, but as a glass register)

`progress-sectioned.md` owns the R8-14 DEFECT (hard per-segment cells + a dead notch).
The idiom-gap framing this lane adds: the library has NO glass segmented-meter register at
all. `<Progress>` (`Progress.vue`) is a token-tinted OPAQUE rail (`bg-[var(--progress-
track)]`) — defensibly thin, but it means a glassmorphic system that ships aurora/blob/
constellation substrates has no frosted meter that reads OVER them. The segmented variant
(`ProgressSectioned.vue`) is the natural home for a glass register: a continuous blended
gradient fill (the R8-14 design target) behind a frosted track, with segment boundaries as
hairline ticks rather than hard color cells. ≥2-consumer evidence: the speedtest consumer
(metric-cell/metric-stack already ship for it) + the demo data/metric pages both want a
meter that reads over a rich background. Gestalt direction: a `surface="glass"` register on
Progress/ProgressSectioned routing the track through `--glass-bg-quiet` + a continuous
`--progress-fill` gradient, segment boundaries as `--border-hairline` ticks — folds onto
the R8-14 remedy + the B1 shared-axis.

### C2 (S2) — skeleton-OVER-glass (the loading state breaks the glass read)

`src/components/ui/skeleton/Skeleton.vue` is `rounded-input bg-muted` (sanctioned-opaque,
on the cohesion allowlist) with three temporal registers (pulse/shimmer/breath — a nicely
honed axis). BUT in a glass-first system the common case is a skeleton loading INSIDE a
glass card over a rich substrate — and an opaque `bg-muted` block punches a flat hole in
the frosted plate (the same "opaque slab kills the glass read" class as R8-11/12, here on
the loading state). There is no glass-aware skeleton register. Gestalt direction: a
`surface="glass"` / over-glass register where the skeleton block is a translucent
`color-mix(--muted N%, transparent)` shimmer that lets the glass plate read through (the
shimmer sweep already composites correctly; only the base block opacity needs the glass
register). ≥2 consumers: every card/list/metric loading state over the demo's rich
backgrounds. Honest book: defensible single-register today, but the glass-first canon
(AX.W54) makes the over-glass case the COMMON one, so the gap is real.

### C3 (S3) — a glass CHIP-GROUP / filter-bar container

The house has `<Badge>` (loud-pill, sanctioned-opaque), `<ToggleChip>`, and the
DERIVE-FROM-COLOR chip rows in the configurators, but NO chip-GROUP container idiom — a
frosted track that holds a wrapping/scrolling set of filter chips with one coherent plate
(the iOS "filter bar" register). The demo hand-rolls chip rows in ≥4 places
(`display/badge.vue`, `data/search.vue`, `data/table.vue`, the configurator
DERIVE-FROM-COLOR row that R8-4 clips at the card edge). The R8-4 chip-row clipping is
PARTLY this gap: a chip-group container that owns its own overflow (wrap or the new
`FadingScroll`) would not clip at the card edge. Gestalt direction: a `<ChipGroup>` (or a
`.glass-chip-group` recipe) — a frosted wrapping/scrolling track composing the existing
Badge/ToggleChip atoms + the `FadingScroll` primitive (A-bucket cross-ref) for the
horizontal-overflow case. ≥2-consumer evidence: the 4 demo sites + the configurator
DERIVE-FROM-COLOR row (R8-4). Single honest caveat: the atoms exist; the GROUP container is
the genuinely-missing piece.

### C4 (S3) — command-palette glass treatment is DONE; the gap is the scrim/feather, not the plate

Recorded to CLOSE a presumed gap: `<Command>` (`Command.vue:30`) IS `glass-floating`
(retired the flat `bg-popover`), and `<CommandDialog>` wraps it in a `DialogContent`
(glass). So the "command-palette glass treatment" missing-idiom is ALREADY shipped — no
new work. The residual idiom nicety (S3, low priority): the command palette over a busy
substrate would benefit from the `veil-surface` `--veil-feather` radial-mask for
text-legibility (the same feather `toast-glass.md` proposes for floating feedback). Noted
as a CONSUMER of the B1 shared-axis + the feather option, not a standalone gap.

### C5 (S3) — frosted side-panels are MOSTLY shipped; the gap is a unified surface axis

Recorded to scope the "frosted side-panels" missing-idiom honestly: the house DOES ship
frosted side surfaces — `<Sheet>` (glass-floating side drawer), `<Drawer>` (glass-drawer
bottom sheet), `<GlassPanel>` (5-rung tier), and the `/sidebar` subpath. So the panel
MATERIAL is not missing. The genuine gap is the SURFACE-AXIS inconsistency across them (B1
/ B3 / B4) — they are frosted but speak different variant dialects. No net-new panel
component is warranted; the work is the shared `surface` axis reaching the existing panels.

---

## Synthesis — the ONE unifying idiom-gap

Across all three buckets, the dominant pattern is a **factored material vocabulary that
was never factored into a SHARED SURFACE AXIS**. The house minted `--glass-level` as a
single shared opacity knob (AX.W54) and `--glass-tint-*` as a single shared legibility
seam (AX.W55) — but the {glass · veil · opaque} SURFACE-DECORATION choice stayed a
per-component one-off (Card has it, Dialog has a binary slice, everyone else has nothing).
EVERY bucket-B/C finding (B1/B3/B4/B5, C1/C2/C3/C4/C5) and the A2 menu-row are downstream
of this ONE gap: there is rich glass MATERIAL but no shared surface GRAMMAR to apply it
uniformly. The highest-leverage BA wave is to mint that shared `surface` axis once (the
`--glass-level` playbook), then the menu-row (A2), the feedback tones (toast-glass lane),
the segmented meter (C1), the over-glass skeleton (C2), the chip-group (C3), and the panel
unification (B3/B4/C5) all become CONSUMERS of one vocabulary rather than independent
component edits.

The two clean library-promotion lifts (A1 page-turn, A2 menu-row) are independent of the
surface-axis wave and ride their own slides-bank reference implementations — both
UNADDRESSED, both with a documented downstream consumer.

## Evidence

Live-probed :5199 (dev up), source-read at HEAD. Source anchors cited inline
(`menuItemVariants.ts:32-56`, `ToggleGroup.vue:28`, `Skeleton.vue`, `Command.vue:30`,
`ExpandableContainer.vue:20`, `sheetVariants` `index.ts:18`,
`useContextualDockLayers.ts`). The slides-bank references (page-turn `deck.css` + M.W-R13;
menu-row `DeckSettings.vue`) are named per `prompts-recap-2.md:96-97`. The ground captures
that visually seed bucket-C are banked under `audit/ground/` (R8-08 fading strip → the
chip-group overflow case; R8-11 black-bg → the over-glass legibility class; R8-14 →
the segmented-meter seed).
