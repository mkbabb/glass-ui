# MIGRATION—v0.9.x → v1.0 → v2.0

> **BA.W-TABS — the tab family standardized on ONE engine, TWO materials. Clean
> break, no alias ("No legacy code").** `SegmentedTabs` is now ONE engine with TWO
> MATERIALS (`variant: "pill" | "underline"`) and ONE orientation axis
> (`orientation: "horizontal" | "vertical"`). Four retirements:
>
> 1. **`variant="segmented"` → `variant="pill"` (the DEFAULT now).** Segmented and
>    pill were one register; the user kept "pill" by name. `pill` is the glass
>    material — a glass-quiet track + the selected-reads-as-glass (`--glass-bg-floating`)
>    indicator, no gray. MIGRATE: drop the `variant="segmented"` prop (it re-defaults
>    to `pill`) or rename it to `variant="pill"`. A `<SegmentedTabs>` with no `variant`
>    now paints the glass pill.
> 2. **`overflow="scroll" / "auto"` axis RETIRED.** Overflow is `<FadingScroll>`'s job
>    (`@mkbabb/glass-ui/fading-scroll`) at the consumer's own level, not an in-tabs
>    scroller. MIGRATE: wrap the strip in `<FadingScroll>` or apply `useFadingScroll`
>    where a genuinely-overflowing tab row needs an edge fade (the common ≤4-tab case
>    needs none).
> 3. **`:multi-select` RE-HOMED to `<ToggleGroup>`.** A multi-pressed strip (N
>    independent toggles on one surface, `role="group"`) IS a ToggleGroup, not a tab
>    family member. MIGRATE: `<SegmentedTabs :multi-select>` →
>    `<ToggleGroup type="multiple">` (the IG-B2 glass-track register). The single-select
>    string model replaces the prior `string | string[]` union.
> 4. **`ui/Tabs` (the reka wrapper family: `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`/`TabsIndicator`)
>    LEFT the public surface.** It is no longer re-exported from `@mkbabb/glass-ui` or
>    `@mkbabb/glass-ui/<ui-tabs>`. The standardized family is `SegmentedTabs`
>    (`@mkbabb/glass-ui/tabs`). MIGRATE a hand-rolled `ui/Tabs` recipe to the matching
>    `<SegmentedTabs variant="…">` material. (The reka substrate files remain INTERNAL
>    solely for the dock-rail consumer `DockLayerGroup` — they are not a consumer
>    surface.) The `indicator`/`surface` default-ON baked-plate that painted the R10-2
>    oval blob dies with the public surface.
>
> **External migration re-issue (the AY W-CONSUMER ledger, re-stamped at this SHA).**
> The 5 DEFERRED external rows (fourier-analysis/web 3× `UnderlineTabs`, words/frontend
> 2× `BouncyToggle`) re-target the standardized API: `UnderlineTabs` →
> `<SegmentedTabs variant="underline">` (the paper material, panel-nav `role="tablist"`);
> `BouncyToggle` → `<SegmentedTabs>` (the default pill material — the named-good glass
> register). The receiver contract is PRESERVED — `:options` / `:model-value` /
> `@update:model-value` + `variant` are unchanged across the standardization, so the
> drop-in swap the ledger promises still holds; the `proof:consumer-staleness` allowlist
> re-stamps (those rows carry their `{receiver-wave, close-gate}` terminals in the
> consumer's own tranche). The `proof:tabs-unified` gate retired-with-re-point onto
> `proof:tabs-std`.

> **AZ.W-RAIL3 — `<DockRail>` evolved from a single end-icon into the floating-carousel
> chip STRIP.** The new `items?: readonly DockRailItem[]` prop (`DockRailItem = { id,
> label, icon? }`, exported from `@mkbabb/glass-ui/dock`) drives the visible facet chips
> riding the connective hairline OUTSIDE the dock box (the dock box is INVIOLATE — the
> strip renders via the `.glass-dock-frame` escape and never changes the dock's
> width/height). The prior `entries?: readonly string[]` prop is **REMOVED** (clean
> break, no alias — zero consumers passed it at the cut; every consumer passes `items`).
> `v-model:context` + `@advance` are unchanged; `icon` is now the fallback chevron for
> chips without their own glyph. The facets-as-in-dock-`<DockLayerGroup>` pattern on the
> demo shell docks is replaced by the rail strip (demo-only; no library API there).

> **AZ.W-REGISTER-IOS — the dock interactive register is DE-RED'd to the iOS
> luminance-lift.** No consumer API rename — this is a TOKEN-knob + demo-preset
> change. The dock SELECTED/hover/active/pressed register at the library ROOT is
> now the iOS-26/27 glass luminance-lift, not a brand-red accent (R3-6). Two NEW
> retint knobs for downstream retinters: `--dock-selected-accent` (the SINGLE knob
> for the selected affordance — defaults to `color-mix(in oklab, var(--foreground)
> 14%, transparent)`, a translucent foreground luminance-lift that auto-flips with
> `--foreground`; consumed by the rail leading-edge accent BAR), and
> `--dock-control-press-bg` (the iOS press-darken — `--glass-bg-resting` mixed ~7%
> toward `--foreground`, read on every dock control `:active`). The rail active
> GLYPH + BAR no longer fall back to `var(--dock-rail-active-accent, var(--primary))`;
> the glyph stays warm-ink `--foreground`, the bar paints `--dock-selected-accent`.
> A consumer that previously re-tinted the selected register to a brand hue via
> `--dock-rail-active-accent` should instead set `--dock-selected-accent` (the
> luminance-lift knob) — `--dock-rail-active-accent` is no longer read on the rail
> glyph/bar default. The demo's `--demo-nav-accent: var(--viz-fourier)` NCSU-red
> preset is RETIRED (the demo consumes the neutral root register; presets live in
> the consumer, the library's default is the de-red'd iOS register). Brand red
> survives only as static ink (the ℱ wordmark / data-viz strokes / gold-CTA family).
> Guarded by `proof:register-ios` (a negative predicate that REDs a brand-red
> re-introduction on any interactive selector).

> **The published cut is v3.13.0 — there is no 3.11/3.12 entry on the registry.** The
> AZ tranche's breaks (the dock taxonomy + the metric `amount`→`value` rename + the
> constellation generalization + the Card `veil` addition) ALL ship together in the
> published **3.13.0**. The interim `3.11.0/.1/.2 + 3.12.0` registry publishes were
> STALE-LINEAGE out-of-band publishes from a pre-prune tree (they carry the four
> since-retired subpaths and lack `/underline`); the AZ cut SKIPPED them and published
> 3.13.0 from master via release.yml provenance so `latest` resolves the true close (AZ
> FINAL §5). A consumer pins **3.13.0** and reads every break below as landing on that one
> release — the number-skip is intentional, the 3.11/3.12 lineage is not the close.
>
> **v3.13.0** — the dock taxonomy clean break (AZ.W-DOCK-TAXONOMY, H2 arm-a):
> `<GlassDock variant="rail">` → `<GlassDock orientation="vertical">` (the `variant`
> discriminant is removed; a vertical dock is now COLLAPSIBLE by default — it morphs its
> `height`; a static nav column adds `always-expanded`). `<GlassDock variant="instrument-strip">`
> is removed (zero live consumers) — compose `<InstrumentChassis>` directly; the speedtest
> `SurveyResultDock` cockpit re-pins on the 3.13.0 adopt.

> **v3.10.0 (AY, NARROWED at AZ.W-PRUNE2)**—two zero-consumer subpaths RETIRED outright (no
> aliases, per the no-backwards-compat invariant): `@mkbabb/glass-ui/deck-progress` +
> `/instrument-rail` (0 production consumers at the census,
> `docs/tranches/AY/audit/PRUNE-LEDGER.md`). `/header-ribbon` + `/glass-panel` were retired
> by the same census and RESTORED at AZ.W-PRUNE2 — the census missed their live keyframes.js
> binary consumer (`docs/consumer-evidence/{header-ribbon,glass-panel}.md`); both ship again.
> A consumer that referenced one composes the equivalent from the surviving
> primitives (`Progress`, `Section`, the `.glass-*` ladder, `InstrumentChassis`).
> NEW subpath: `@mkbabb/glass-ui/underline` (`<GlassUnderline>`) — RETIRED at the BA cut
> onto `<HandMark shape="underline">` (see the BA.W-HANDMARK row above; it never reached
> a real consumer, the 3.11/3.12 publishes were stale-lineage).
> BREAKING (3.13.0): `<MetricBadge>` / `<MetricPill>` — the primary prop `amount` is renamed
> `value` (the Metric value-core convergence; a valid `0` now renders `0`, never the placeholder).
> Clean break, no alias — speedtest re-points on the bump (`/metric-cell` + `/metric-stack`
> surfaces unchanged).
> ADDITIVE (3.13.0): the `/constellation` subpath gains optional default-OFF generalization
> props/exports (pinnedIndex/pinNode, accentEdges, the palette accent/edgeFloor/edgeAccentAlpha,
> stepPinnedDrift, warpAutoRelease + warpSettled) — the protected quintet is byte-compatible.
> ADDITIVE (3.13.0): the Card `surface` union gains `"veil"` — the borderless/rimless
> wash-fill text-legibility plate (`--veil-*` knobs, the optional `--veil-feather` mask). No break.
> ADDITIVE (4.1.0): `@mkbabb/glass-ui/border-progress` — `<BorderProgress>`, the masked-conic
> border-ring primitive (progress IS the element's border; BB.W-BORDER-PROGRESS). A net-new public
> subpath (off the root barrel); no retirement, no break. The speedtest AW.W7 consumer binds it on `^4.1.0`.
> ADDITIVE (4.1.0): `--instrument-dial-min-block-size-desktop` (BB.W-DESKTOP-RESERVE) — the wide-axis
> (desktop) chassis dial reserve now ships in the library (`@container chassis (min-width: 45rem)` on
> `.instrument-dial`, default `var(--chassis-max-block-size)`). A consumer that authored a local wide-axis
> reserve interim (e.g. speedtest's `.instrument-dial { min-block-size: var(--chassis-max-block-size) }`,
> AW.W4.1) DELETES it on consume — byte-equivalent at the default; retune via the token if the meter block-size differs.

> **CALLER HAZARD (next cut, BA.W-DEMO-AFFORDANCES) — never stack `.glass-btn` + `.btn-pill`.**
> The two button size registers are MUTUALLY EXCLUSIVE: `.glass-btn` is the
> FIXED-square icon primitive (`width/height: var(--size-icon-btn)` + `contain:paint`),
> `.btn-pill` is the CONTENT-WIDTH text pill. Stacked on one element the fixed square
> wins and `contain:paint` clips a wrapped text label into a ~40px blob (the R8-17
> defect). A text-bearing `.glass-btn` (an icon button carrying a text child) collapses
> the same way even without `.btn-pill`. MIGRATE: for a play/replay or text-bearing
> affordance reach for a real `<Button>` with a leading Lucide glyph (the content-width
> pill), never an icon-button primitive carrying text. No library recipe changes — the
> `.glass-btn`/`.btn-pill` recipes are untouched; this is a caller-side hazard the new
> `proof:demo-affordances` gate machine-locks (W1: no class co-occurrence, no text-bearing
> icon button across `demo/**` + the `src/styles/**` recipes).
>
> **CLEAN BREAK (next cut, BA.W-SURFACE-AXIS) — Dialog `variant` → the shared `surface` axis.**
> `<DialogContent variant="glass|opaque">` is RETIRED onto the ONE shared
> `{glass·veil·opaque}` surface-decoration axis: `<DialogContent surface="glass|veil|opaque">`
> (no alias — the prior `variant` was Dialog-local and never matched the Card grammar). Migrate
> per call site: `variant="glass"` → `surface="glass"` (also the new default), `variant="opaque"`
> → `surface="opaque"`; the `veil` rung is gained for free. The painted output for the `glass`
> and `opaque` rungs is byte-identical (the same `glass-floating` / `.glass-opaque` material,
> now reached through the shared resolver).
>
> ADDITIVE (next cut, BA.W-SURFACE-AXIS): the shared `Surface = "glass" | "veil" | "opaque"` axis
> (published on `@mkbabb/glass-ui/api`) reaches the whole content/floating band — `GlassPanel`,
> `Sheet`, `Popover`, `Command`, `Drawer`, and `ExpandableContainer` each gain a `surface` prop
> (default `"glass"`, byte-compatible). `<Skeleton>` gains a `surface?: "glass" | "opaque"` prop
> (default `"opaque"`, byte-identical to today's `bg-muted`); `surface="glass"` is the NEW
> over-glass register (a translucent `--skeleton-glass-bg` block that lets a frosted plate read
> through). The `ExpandableContainer` fullscreen overlay now un-walls onto the overlay glass tier
> by default (`surface="opaque"` restores the prior solid wall). No break for any of these.
>
> ADDITIVE (4.1.0, BB.W-SURFACE-AXIS-COMPLETE): the shared `Surface = "glass" | "veil" | "opaque"`
> axis reaches the last two surfaces R8-12 named verbatim — `<Toast>` and `<Button>` each gain a
> `surface` prop (the Card-`surface`-gains-`veil` precedent). `<Toast surface="glass">` (the default,
> byte-identical to today's `glass-floating` plate) composes WITH the `variant` tone arm — the
> feedback-tone tint rides ON the resolved surface, orthogonal to the {glass·veil·opaque} decoration.
> `<Button surface=…>` defaults UNSET (the `variant` axis owns Button's default); `surface="opaque"`
> and the `solid` variant are the same `--glass-level:0` endpoint reached from two axes (NOT
> duplicated recipes). No break for either.

> **ADDITIVE (4.1.0, BB.W-ON-GLASS-FG) — the surface-aware FOREGROUND register (the dark-theme
> whisper collapse closed).** glass-ui mints a THREE-RUNG on-glass foreground family whose
> contrast TARGET is the COMPOSITED content-tier glass FILL, not the canvas: `--on-glass-muted`
> (+ `--on-glass-muted-strong`), `--input-on-glass`, and `--progress-track-on-glass`. The
> glass-first MAXIMAL default (AX.W54) makes a caption/well/track over a TRANSLUCENT glass plate
> the common case, where the canvas-calibrated `--muted-foreground` (= `--neutral-5`, "AA vs
> page") COLLAPSED on its own surface (1.15-3.29:1 measured in dark theme). The calm-light content
> tiers (`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) now re-point
> `--muted-foreground` → `--on-glass-muted` (+ the `-strong` twin) BESIDE the BA adaptive-glass
> seam (the THIRD state — between page-muted and the bright-bucket full ink; legible-AND-subordinate),
> so every `text-muted-foreground` caption + CardDescription inherits the on-glass rung with ZERO
> per-site edit. Input/Textarea wells read `--input-on-glass`; the Progress default/gradient track
> reads `--progress-track-on-glass`. No break, no rename — the page-muted register
> (`--muted-foreground: var(--neutral-5)`) is UNTOUCHED for the opaque-canvas case.
>
> CONSUMER-INTERIM DELETION (the ≥2-consumer law closed): a consumer that hand-re-declared
> `--muted-foreground` over glass — the slides `deck.css §1` `--muted-foreground`/`-strong`
> override, the speedtest WG (secondary-text + value-plate) + WV1 (survey-seat) interims — DELETES
> its override on the `^4.1.0` re-pin and INHERITS the library on-glass register. The override that
> PROVED the fix retires onto the root.

> **RENDERED-BEHAVIOUR (next cut, BA.W-EMISSION) — the Select bound + the Slider size axis
> now actually PAINT in every consumer.** No API rename — these are EMISSION fixes (the
> structural utilities ship as precompiled CSS instead of dead arbitrary-bracket classes a
> consumer's content-scan never reached). Three rendered changes a consumer SEES on the bump:
> (1) `<SelectContent>` now BOUNDS its content to `min(24rem, 60dvh)` tightened by
> `--reka-popper-available-height` with inner `overflow-y: auto` — a tall (16-item-class)
> dropdown that previously overflowed the viewport now bottoms INSIDE it and scrolls within
> (override the cap via `--select-content-max-h` on any ancestor). (2) `<Slider size="md">`
> (and `sm`/`lg`) now renders its REAL track geometry (`md` ≈ 20px / 1.25rem) — the `size`
> prop was previously INERT in consumers (fell back to the 6px track); a consumer relying on
> that broken 6px-regardless behaviour will now see the correct sized track. (3) glass-ui's
> own `@source` directive (for a consumer re-importing the `/styles` cascade) re-points
> `"../components"` → `"../*.js"` so it reaches the compiled `dist/*.js` chunks — a consumer
> that copied glass-ui's `@source` line verbatim should ensure THEIR `@source` points at the
> installed `dist` (per the consumer-wiring section), unchanged guidance.

> ADDITIVE (next cut, BA.W-EMISSION): `<WatercolorDot>` gains a `variant?: "solid" | "ghost"`
> prop (default `"solid"`, byte-compatible). `variant="ghost"` renders the SAME seeded blob
> silhouette as a STROKE (a `color` border over a low-alpha fill) — the empty-palette-slot
> affordance, NOT a CSS dashed rectangle. No break.

> **BA.W-PAGER — `CarouselDots` RETIRED onto `<PagerDots>` + the counter re-registers
> off `bg-card`. Clean break, no alias ("No legacy code").** The carousel dots and the
> slides deck `DeckPager` were ALREADY one register; BA.W-PAGER harvests that into ONE
> primitive — `<PagerDots>` (`@mkbabb/glass-ui/pager-dots`), encapsulated in a glass pager
> pill. Two breaks:
>
> 1. **`CarouselDots` → `<PagerDots>` (clean break).** `CarouselDots` is GONE from the
>    `/carousel` barrel (it auto-wired the embla API via `useCarousel()` inject).
>    `<PagerDots>` is standalone — wire `:count`, `:active` (`v-model:active`), and
>    `@select`/`scrollTo` to the embla API explicitly. MIGRATE: `<CarouselDots />` →
>    `<PagerDots :count="api.scrollSnapList().length" :active="api.selectedScrollSnap()"
>    @select="(i) => api.scrollTo(i)" />`. The pip anatomy (24px hit-box, 6px pip,
>    elongate-on-active, the `--foreground` 52%/72%/full register) is IDENTICAL — the dots
>    look the same; they now read a `--pager-dot-*` token set (retint the active fill via
>    `--pager-dot-active`) and sit in the `.glass-pager-ring` chassis by default
>    (`ring="false"` for a flush-on-an-ambient-glass-host deck). `windowFit?` generalizes
>    the DeckPager dock-gutter windowing (off by default).
> 2. **The `<CarouselPager>` counter is off the opaque `bg-card` ring.** The counter
>    `<span>` now composes `.glass-pager-ring` (the glass-floating pill) instead of
>    `rounded-pill border border-border bg-card` — the dark `rgb(28,25,23)` slab dies.
>    No consumer change (the counter is internal to `<CarouselPager>`); a consumer that
>    hand-overrode the counter's `bg-card` re-points to the glass ring.

> **BA.W-HANDMARK — `GlassUnderline` + the `/underline` subpath RETIRED onto
> `<HandMark shape="underline">`. Clean break, no alias (DEC-8 outcome 1).** The d6
> hand-voice family re-landed on `@mkbabb/glass-ui/handmark` (`<HandMark>` / `<InkMark>`
> + the flat `BRUSHES` continuum + the pure L1–L3 stages), and the editorial underline
> is now ONE shape of that ONE hand voice — not a parallel component. Two breaks:
>
> 1. **`@mkbabb/glass-ui/underline` (`<GlassUnderline>`) is GONE.** The `/underline`
>    subpath + the `GlassUnderline*` types are removed from the surface (no alias, per
>    the no-backwards-compat invariant). MIGRATE: `import { GlassUnderline } from
>    "@mkbabb/glass-ui/underline"` → `import { HandMark } from
>    "@mkbabb/glass-ui/handmark"`; `<GlassUnderline>word</GlassUnderline>` →
>    `<HandMark shape="underline">word</HandMark>`. The editorial draw-on underline is
>    `<HandMark shape="underline" animation="draw-on">`; the natural pencil-boil
>    morphology (scale-relative amplitude, irregular seeded periods) is the `boil`
>    brush (`<HandMark brush="boil" shape="underline">`). The default `pen` brush is a
>    clean wobbled line, `grain:0`, no extra dep.
> 2. **New optional peers (vendored/peer split).** `<HandMark>` adds two OPTIONAL peers:
>    `@mkbabb/pencil-boil ^0.4.1` (the L1 wobble geometry — imported only when a wobble
>    paints) and `perfect-freehand ^1.2.3` (the variable-width hull body — VENDORED into
>    `freehand.ts`, declared as an optional peer for provenance, touched only by the
>    `ribbon:"hull"` highlighter). Both are tree-shaken when unused; a `pen`-only
>    consumer pulls neither. The `/handmark` chunk is ≈7.6 KiB-gzip (the `profile:budget`
>    rebaseline records it + the engaged pf hull body).
>
> **This row is for any FUTURE external `/underline` consumer — NOT slides.** The
> 2026-06-15 slides ground-truth (BINDING) confirms slides imports ZERO
> `@mkbabb/glass-ui/underline` / `GlassUnderline`: its `SlideIntro`/`SlideCloser` red
> pen-underlines are deck-LOCAL CSS/SVG `::after` glyphs, never the library component.
> The phantom "slides adopt-book break" was the AZ-H6-fold assumption the slides session
> disproved at HEAD `c943a49`; there is no slides edit on this fold.

> **BB.W-METAL-SHIMMER — the `@keyframes gold-shimmer-slide` RETIRED onto the
> metal-PARAMETERIZED `@keyframes metal-shimmer-sweep`. Clean break, no alias ("No
> legacy code").** The gold-only shimmer keyframe generalized into ONE metal-agnostic
> position sweep (reading a `--metal-shimmer-color` channel + the `--metal-stop-*`
> slots the recipe binds per-metal), so the bronze quad (the third brand metal) + the
> gold + silver registers all share ONE keyframe. Two notes:
>
> 1. **`@keyframes gold-shimmer-slide` is GONE** — the keyframe NAME is removed (no
>    alias). The `.gold-shimmer` CLASS is PRESERVED (it re-points onto
>    `metal-shimmer-sweep` with `--metal-shimmer-color: gold`; the gold gradient stops +
>    `background-size`/`background-clip` + the PRM bracket are byte-identical — the gold
>    READ is UNCHANGED). The `--animate-gold-shimmer` token is PRESERVED (re-pointed onto
>    `metal-shimmer-sweep`). MIGRATE only if a consumer referenced `gold-shimmer-slide`
>    BY NAME in a hand-rolled `animation:` rule → `animation: metal-shimmer-sweep …`.
>    No consumer that composed the `.gold-shimmer` class or read `--animate-gold-shimmer`
>    changes.
> 2. **NEW additive surface (no break).** The bronze quad (`--bronze`/`-light`/`-dark`/
>    `-deep` + `--color-bronze*`, the third brand metal on the W-NO-GRAY exception), the
>    `--duration-metal: 6s` slow clock, and the `.metal-{gold,silver,bronze}` /
>    `.metal-*-border` / `.metal-rainbow-rim` utilities are all ADDITIVE — a consumer
>    opts in by composing a `.metal-*` class. The `.metal-rainbow-rim` composes
>    W-GLASS-ACCENT's `--glass-accent` rim seam.

> **v2.0.0 (AI.W1 R3)**—the motion composables move off the root barrel to
> the new `@mkbabb/glass-ui/motion` flat subpath, closing the
> AI-CARRY-GLASS-UI-KEYFRAMES-EDGE 4-tranche chronic. See the **v2.0.0**
> section below for the full symbol list + codemod hints. Same SCC-trap
> closure shape as L.W1 Lane C — different heavy peer
> (`@mkbabb/keyframes.js` instead of `@vueuse/core`).

v1.0 is the L-tranche cohort release. It freezes the public API and lands four
architectural transpositions that BREAK v0.9.x consumer shapes:

1. **Root-barrel Phase 2**—vueuse-bearing symbols leave the root barrel; they
   live on explicit subpaths so bundlers can tree-shake them.
2. **`src/api/` discovery layer**—pure types + constants surface for "where
   do I import the type from?" discovery.
3. **Subpath flatten**—`composables/dark` + `composables/keyboard` collapse
   to flat `/dark` + `/keyboard`; new `/carousel` subpath added.
4. **Second-consumer fidelity**—substrate without ≥ 2 consumers either wires
   a real second consumer or retires (per L invariant 8).

Per L invariant 4 (no backwards-compat shims), v1.0 ships no legacy aliases.
Every break is documented below. v0.9.4 remains available indefinitely as a
patch-stream tag; v1.0 adoption is opt-in.

---

## At a glance

- Vueuse-bearing symbols (`Input`, `Textarea`, `Combobox*`, `Carousel*`,
  `useCarousel`, `useGlobalDark`, `useKeyboardShortcuts`, `registerShortcut`,
  ...) NO LONGER on the root barrel—use the named subpath.
- Nested `composables/dark` + `composables/keyboard` subpaths RETIRED—flat
  `/dark` + `/keyboard`.
- NEW `@mkbabb/glass-ui/carousel` subpath for `useCarousel` + `CarouselApi`.
- NEW `@mkbabb/glass-ui/api` subpath for canonical types + constants
  discovery (32 symbols).
- RETIRED composables: `useOffsetPagination`, `useVirtualSectionWindow`,
  `useWindowedStore`, `virtualSectionLayout` helpers. `/pagination` +
  `/virtual` subpaths gone.
- RETIRED primitive: demo-private `<DockShowcaseFrame>` (was never public
  surface).
- `src/composables/` restructured into coherent sub-trees
  (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`,
  `sidebar/`, `sortable/`)—affects deep relative imports only.
- Production demo build NOT shipped—`npm run build` is library-mode only.

Worked example: speedtest re-link commit `98f88325` migrated 15 src/ files
to the v1.0 subpath surface in ~30 minutes. Entry-chunk gz dropped 32.5 KB.

---

## Before you migrate

1. **Pin to v0.9.4 first** if you are on v0.9.0–v0.9.3. v0.9.4 patches the
   K.WS subpath-typing-publication gap and lets you adopt subpath imports
   incrementally BEFORE the breaking v1.0 cut.
2. **Run your tests + typecheck** at v0.9.4. Establish a green baseline.
3. **Inventory your imports**—`rg 'from "@mkbabb/glass-ui"' src/` lists
   every root-barrel call site. Save the output; you will sweep it twice.
4. **Plan the cut as one commit per repo**—v1.0 is intentionally
   atomic. Mixing v0.9.x and v1.0 import shapes across files in the same
   commit makes review noisier than necessary.
5. **Read the Cohabitation note** below if you intend to stay on v0.9.4
   indefinitely. That path is supported.

---

## Breaking changes

### 1. Root-barrel curation (Phase 2 SCC trap closure)

The root barrel is now vueuse-free. Re-exporting these symbols from
`@mkbabb/glass-ui` forced every consumer to walk the vueuse SCC at
tree-shake time, regressing entry-chunk gzip by ~2 KB (speedtest's X.W3.c
re-probe was the canonical evidence). Phase 2 carves them onto subpaths.

#### 1.1—Form primitives → `/forms`

```ts
// Before
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui";

// After
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui/forms";
```

The `/forms` subpath was added at v0.9.3 (K.WS Phase 1) and is preserved
verbatim at v1.0. Affected symbols: `Input`, `Textarea`, `Combobox`,
`ComboboxAnchor`, `ComboboxCancel`, `ComboboxEmpty`, `ComboboxGroup`,
`ComboboxInput`, `ComboboxItem`, `ComboboxItemIndicator`, `ComboboxList`,
`ComboboxSeparator`, `ComboboxTrigger`, `ComboboxViewport`.

Rationale: `Input` + `Textarea` import `useVModel` from `@vueuse/core`;
the `Combobox*` family imports `reactiveOmit`. Each is a vueuse-bearing
leaf; isolating them on `/forms` keeps the root barrel walk-free.

#### 1.2—Carousel → `/carousel`

```ts
// Before
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui";
import type { CarouselApi } from "@mkbabb/glass-ui";

// After
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui/carousel";
import type { CarouselApi } from "@mkbabb/glass-ui/carousel";
```

Affected symbols: `Carousel`, `CarouselContent`, `CarouselDots`,
`CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`,
`GlassCarouselPager`, `useCarousel`, type `CarouselApi`.

Rationale: `useCarousel` imports `createInjectionState` from
`@vueuse/core`. The composable transitively taints every `Carousel*.vue`
in the package because they `inject` it. The whole family moves together.

The `/carousel` subpath is NEW at v1.0—v0.9.x consumers reached
`useCarousel` only via the root barrel.

#### 1.3—Dark-mode singleton → `/dark`

```ts
// Before
import { useGlobalDark } from "@mkbabb/glass-ui";

// After
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

Rationale: `useGlobalDark` composes `createGlobalState`, `useDark`,
`useToggle` from `@vueuse/core`. The `/dark` subpath is flat at v1.0
(the v0.9.4 nested form `composables/dark` is RETIRED—see §2).

#### 1.4—Keyboard registry → `/keyboard`

```ts
// Before
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui";

// After
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui/keyboard";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui/keyboard";
```

Rationale: keyboard-shortcuts registry composes `createGlobalState` +
`useEventListener` from `@vueuse/core`. Same flatten as `/dark`.

#### 1.5—Codemod hints

Find every root-barrel call site that references a moved symbol:

```bash
# Inventory: which files import from the root barrel?
rg -l 'from "@mkbabb/glass-ui"' src/

# Of those, which import a moved symbol?
rg -l 'from "@mkbabb/glass-ui"' src/ \
  | xargs rg -l '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
```

The mechanical rewrite is a per-symbol regex (run inside your editor or
via `sed -i`). Pattern shape:

```
# 1. Find imports that ONLY pull moved symbols → rewrite source
#    import { Input, Textarea } from "@mkbabb/glass-ui"
#    → import { Input, Textarea } from "@mkbabb/glass-ui/forms"

# 2. Find mixed imports → split the import statement
#    import { Button, Input } from "@mkbabb/glass-ui"
#    → import { Button } from "@mkbabb/glass-ui"
#      import { Input } from "@mkbabb/glass-ui/forms"
```

Speedtest's `98f88325` migration commit hand-rewrote 15 files in ~30
minutes without a scripted codemod—the breaks are mechanical enough
that an editor multi-cursor pass is the canonical workflow.

---

### 2. Subpath flatten (v0.9.4 transitional shapes retired)

v0.9.4 introduced nested `composables/dark` + `composables/keyboard`
subpaths as a transitional shape for the K.WS dts-publication-gap fix.
v1.0 flattens them to match every other public subpath
(`/forms`, `/dock`, `/configurator`, ...).

#### 2.1—`/composables/dark` → `/dark`

```ts
// Before (v0.9.4 only)
import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark";

// After (v1.0)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

#### 2.2—`/composables/keyboard` → `/keyboard`

```ts
// Before (v0.9.4 only)
import { registerShortcut } from "@mkbabb/glass-ui/composables/keyboard";

// After (v1.0)
import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
```

Codemod:

```bash
rg -l '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/ \
  | xargs sed -i '' 's|@mkbabb/glass-ui/composables/dark|@mkbabb/glass-ui/dark|g; s|@mkbabb/glass-ui/composables/keyboard|@mkbabb/glass-ui/keyboard|g'
```

Trying the retired subpath at v1.0 fails with Node's standard package
exports gate:

```
$ node -e "import('@mkbabb/glass-ui/composables/dark')"
Error: ERR_PACKAGE_PATH_NOT_EXPORTED
```

That hard fail is intentional. Per L invariant 4, no alias re-routes the
nested form to the flat one.

---

### 3. Composable retirements (substrate-without-consumer binary)

L.W3 Lane A's audit ran the substrate-without-consumer check across six
composables. Three were WIRED via cross-repo speedtest consumption; three
retired with rationale.

#### 3.1—`useOffsetPagination`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers (no `src/` site; no speedtest site).
  Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/pagination` (entry removed from
  `package.json` exports + typesVersions and from `vite.library.ts`).
- **Migration**: roll your own with `ref()` + a `fetchFn`-driven loader.
  The v0.9.3 reference at
  `src/composables/pagination/useOffsetPagination.ts` was 60 LOC and had
  no glass-ui-private substrate dependency. Copy from v0.9.3 source if
  you want the exact shape; or adopt an external library
  (`@tanstack/vue-query` if you need server-state coordination,
  `@vueuse/core`'s `useOffsetPagination` if you want a thin wrapper).

#### 3.2—`useVirtualSectionWindow`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (the entire subpath
  retires; it housed `useVirtualSectionWindow` + `useWindowedStore`).
- **Migration**: production-grade virtualization belongs to
  `@tanstack/vue-virtual`. Consumers with light sectioned-list needs
  can hand-roll an `IntersectionObserver`-based windower in ~80 LOC.

#### 3.3—`useWindowedStore`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (shared with
  `useVirtualSectionWindow`).
- **Migration**: a sliding-window resident store is a `ref<T[]>` plus
  an eviction policy. Copy the v0.9.3 file if you need the exact LRU
  shape.

#### 3.4—`virtualSectionLayout` helpers—REMOVED

- **Status**: REMOVED in v1.0.
- **Affected exports**: `buildSectionLayout`, `findSectionOffset`,
  `resolveActiveSection`, `resolveSectionWindow`, plus the
  `FlatSection`, `SectionLayout`, `SectionWindowRange`, and
  `ForcedSectionWindowRange` types.
- **Reason**: support substrate for `useVirtualSectionWindow`. Retires
  with its parent.
- **Migration**: the helpers were pure functions with no glass-ui-private
  dependencies—copy the v0.9.3 file
  (`src/composables/virtual/virtualSectionLayout.ts`) as-is if
  cumulative section-offset math is genuinely needed.

#### Composables KEPT (cross-repo wired)

The substrate-without-consumer audit retained three motion composables
because speedtest consumes them in production:

| Composable | Speedtest consumer | Disposition |
|---|---|---|
| `useRAFLoop` | `src/components/speedtest/composables/useMeterRenderer.ts` (canvas render loop) | WIRED |
| `useIntersectionPause` | `src/composables/useAuroraPolicy.ts` (reduced-motion + visibility gating) | WIRED |
| `useDarkModeSync` | `src/components/speedtest/SpeedtestMeter.vue` + `src/components/dashboard/composables/useEChartsTheme.ts` | WIRED |

All three remain on `@mkbabb/glass-ui` (vueuse-free) via
`src/composables/motion/`. Each has a demo story under
`demo/stories/composables/`. No consumer-side migration required.

---

### 4. Primitive retirements

#### 4.1—`<DockShowcaseFrame>`—REMOVED

- **Status**: REMOVED in v1.0 (demo file deleted).
- **Reason**: demo-private chassis introduced at V.W4 with ZERO non-self
  consumers at L.W3 open (`rg "DockShowcaseFrame" demo/` returned only
  the definition file).
- **Public-surface impact**: NONE. The component was never on the
  library public surface—it was a demo-private chassis primitive.
  No `src/` source / barrel / package.json export changes.
- **Migration**: dock-tier demos compose `<ShowcaseFrame>` (canonical
  demo chassis) directly, OR raw chassis recipes:

  ```vue
  <div class="rounded-[var(--radius-card)] border border-border/40 bg-card/40 shadow-cartoon">
      <!-- dock content -->
  </div>
  ```

#### Primitives KEPT (2nd consumer wired)

L.W3 Lane B wired second consumers for three primitives that reached
the wave at 1 consumer:

- **`<DiscoGlyph>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (chart-token
  facet-swatch row).
- **`<DockGroup>`**—2nd consumer at
  `demo/stories/compositions/dashboard.vue` (KPI pill-row shelf).
- **`<InstrumentChassis>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (live
  mini-chassis below the chassis-tier-tokens ladder).

No consumer-side change. All three remain exported via the root barrel
(`@mkbabb/glass-ui`) AND their per-package subpaths.

---

### 5. Composables restructure (internal re-org)

L.W2 Lane A restructured `src/composables/` into coherent sub-trees.
**This affects you ONLY if you import directly from a deep relative
path** (e.g., `@mkbabb/glass-ui/src/composables/useTimer`). The public
surface (`@mkbabb/glass-ui` root barrel + named subpaths) is unchanged
for KEPT composables.

| v0.9.x relative path | v1.0 relative path |
|---|---|
| `composables/useGlobalDark` | `composables/dark` |
| `composables/useKeyboardShortcuts` | `composables/keyboard` |
| `composables/useInterval` | `composables/reactive/useInterval` |
| `composables/useTimer` | `composables/reactive/useTimer` |
| `composables/useResizeObserver` | `composables/dom/useResizeObserver` |
| `composables/useTouchGate` | `composables/dom/useTouchGate` |
| `composables/useTokenColor` | `composables/dom/useTokenColor` |
| `composables/useStagger` | `composables/motion/useStagger` |
| `composables/useStoryDemo` | (moved to `demo/composables/useStoryDemo`—demo-private) |

Resulting tree:

```
src/composables/
├── dark/         useGlobalDark
├── keyboard/     useKeyboardShortcuts + family
├── reactive/     useInterval, useTimer
├── dom/          useResizeObserver, useTouchGate, useTokenColor
├── motion/       useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│                 useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│                 useRAFLoop, useIntersectionPause, useStagger
├── glass/        useGlassRenderer + webgl/ + webgpu/
├── sidebar/      useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
├── sortable/     useSortable
└── index.ts      (sub-tree re-exports)
```

Recommended: stop reaching for deep relative paths; the public surface
(`@mkbabb/glass-ui` root barrel + the dedicated subpaths) is the
canonical import shape.

---

## New surfaces in v1.0

### `@mkbabb/glass-ui/api`—type + constant discovery layer

32 canonical public symbols (28 types + 4 runtime constants) re-exported
from their existing homes. Recommended for consumer-side type discovery
without coupling to a specific component's runtime entry point:

```ts
import type {
    AuroraConfig, AuroraNucleus, AuroraFlow, AuroraInstance,
    AuroraRuntimeOptions, AuroraRuntimeMode,
    FlowPattern, OklchStop, StrokeMode, WarpMode,
    ConfiguratorPreset, ConfiguratorState, ConfiguratorStateOptions,
    ConfiguratorScrollMode,
    CardTier, InstrumentChassisPhase, ToastVariant,
    AlertVariants, AvatarVariants, BadgeVariants, ButtonVariants,
    SheetVariants, SliderVariants, ToggleVariants, ToggleChipVariants,
} from "@mkbabb/glass-ui/api";

import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI, MAX_STOPS,
} from "@mkbabb/glass-ui/api";
```

The `/api` subpath has zero JS payload for types-only consumers—all 28
type aliases erase at build, leaving only the 4 constants in the runtime
chunk. Use it freely for prop-forwarding wrappers, fixture typings, and
union narrowing.

### `@mkbabb/glass-ui/carousel`

New at v1.0. See §1.2 above.

### `useConfiguratorState` gained `cloneMode` option

`useConfiguratorState<T>(options)` accepts a new `cloneMode?: "commit-on-write" | "per-preset"` option (default `"commit-on-write"`—unchanged behaviour for existing consumers).

```ts
import {
    useConfiguratorState,
    type ConfiguratorCloneMode,
} from "@mkbabb/glass-ui/configurator";

// per-preset: edits persist per-slot across preset switches.
const studio = useConfiguratorState<MyConfig>({
    presets,
    initialPreset: "default",
    cloneMode: "per-preset",
});
```

The L W7 Lane B Option-A unification (Rε §A.8) routed aurora's per-preset clone semantics through the canonical primitive; `useAuroraStudio` was demo-private and retired. `cyclePreset` also accepts an optional `direction?: 1 | -1` (default `1`) so consumers can map `ArrowLeft` / `ArrowRight` keyboard handlers cleanly. Purely additive—no consumer migration required.

---

## v2.0.0—Motion subpath surgery (AI.W1 R3)

v2.0.0 closes the **AI-CARRY-GLASS-UI-KEYFRAMES-EDGE** chronic (4-tranche
deferral from AI). The root barrel statically reached `@mkbabb/keyframes.js`
through `composables/motion`, which forced every consumer's entry chunk to
carry the ~102 KB raw / ~34 KB gz `keyframes-*.js` chunk even when the
consumer only imported `<Card>` or `<Button>`. The motion composables now
live on the `@mkbabb/glass-ui/motion` flat subpath. The root barrel is
keyframes.js-free.

The shape mirrors the L.W1 Lane C SCC-trap closure that carved `/dark`,
`/keyboard`, and `/carousel` off the root barrel for the vueuse-bearing
surface. Same precedent, different heavy peer.

### Symbols moved—root barrel → `/motion`

```ts
// Before (≤ v1.9.x)
import {
    Card,
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui";

// After (≥ v2.0.0)—split the import statement
import { Card } from "@mkbabb/glass-ui";
import {
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";
```

### Symbols inventory

The following 11 runtime exports + 2 type exports move from root → `/motion`:

| Symbol | Kind |
|---|---|
| `useSpringOrchestrator` | composable (keyframes.js `NumericAnimation`) |
| `useAnimatedNumber` | composable (keyframes.js `SmoothProgress`) |
| `useAnimatedNumberMap` | composable (depends on `useAnimatedNumber`) |
| `useStagger` | composable (timer-driven; no keyframes reach but rides the same barrel) |
| `useStaggerReveal` | composable (IO-driven; same) |
| `useScrollProgress` | composable (scroll-driven; same) |
| `useRAFLoop` | composable (rAF wrapper; same) |
| `useIntersectionPause` | composable (IO + animation pause; same) |
| `installDarkModeSync` | composable (motion engine ↔ dark-mode bridge) |
| `DAMPING` | constant |
| `SNAP_THRESHOLD` | constant |
| `RAFLoopTiming` | type |
| `PausableRuntime` | type |
| `AnimatedNumber` | type (also reachable via `/api`) |
| `UseAnimatedNumberOptions` | type (also reachable via `/api`) |
| `SpringSnapshot` | type (also reachable via `/api`) |

### Why the entire motion barrel moves (not just the keyframes-touching subset)

Only `useSpringOrchestrator` + `useAnimatedNumber` (and `useAnimatedNumberMap`
transitively) statically reach `@mkbabb/keyframes.js`. The rest of the motion
sub-tree (`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`,
`useIntersectionPause`, `installDarkModeSync`) is keyframes-free. Conceptually
the keyframes-free composables could stay on the root barrel.

In practice the sub-tree's `index.ts` rolls up every leaf with `export *`, so
Rollup walks the entire sub-tree as one SCC at root-barrel build time. Either
the whole sub-tree moves or none of it does — splitting it would require a
second internal sub-barrel (`motion-keyframes/` vs `motion-pure/`), which is
the wrong shape. The motion subpath is the canonical home for every kinetic
composable; consumers reach `/motion` for any kinetic primitive regardless of
whether that specific primitive happens to touch the engine today.

### Codemod hints

```bash
# Find every site that needs migration:
rg 'from "@mkbabb/glass-ui"' src/ | rg 'useStagger|useAnimatedNumber|useSpringOrchestrator|useStaggerReveal|useScrollProgress|useRAFLoop|useIntersectionPause|installDarkModeSync|DAMPING|SNAP_THRESHOLD|RAFLoopTiming|PausableRuntime'
```

For mixed imports (e.g. `import { Card, useAnimatedNumber } from "@mkbabb/glass-ui"`),
split into two import statements: `Card` stays on root, the motion symbols
move to `/motion`. There is no auto-codemod shipped — the diffs are mechanical
1-line edits per site and easier to apply by hand than to write a robust
transform for (the import-statement-splitting case requires AST awareness).

### Verification

After the migration, `dist/glass-ui.js` must NOT contain a static import of
`@mkbabb/keyframes.js`. Verify with:

```bash
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/glass-ui.js
# Expected: 0
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (NumericAnimation + SmoothProgress reach)
```

Consumer bundle graphs should show the `keyframes-*.js` chunk dropping off
routes that don't use motion composables. The carry retires per route.

### No back-compat shim

Per precept 1 (NO workarounds) + precept 2 (NO legacy code) + L invariant 4
(no backwards-compat shims), v2.0.0 ships no root-barrel alias for the moved
symbols. Pinning to `^1.9.3` remains supported on the v1.x patch stream if a
consumer cannot migrate immediately.

---

## v3.0.0—`/motion-core` engine-free carve (AP.W3 R0G-7)

v2.0.0 moved the whole motion sub-tree onto `/motion` on the theory that "the
bundler walks the sub-tree's `export *` chain as one SCC anyway" — so splitting
keyframes-touching from keyframes-adjacent leaves "would be a fictitious
distinction" (the v2.0.0 §"Why the entire motion barrel moves" rationale above).
**That premise is overturned by consumer measurement.** A cheap path touching
ZERO keyframes (e.g. importing only `useIntersectionPause`) still dragged the
~125 KB `@mkbabb/keyframes.js` engine onto the eager graph, because the joined
barrel is what makes the SCC, not the leaves — the leaves split cleanly.

v3.0.0 breaks the barrel. The keyframes-BEARING leaves stay on `/motion`; the
keyframes-FREE leaves carve out to a new flat sibling `@mkbabb/glass-ui/motion-core`
(keyframes-free AND vueuse-free); the keyframes-free-but-vueuse-bearing
`installDarkModeSync` relocates to `@mkbabb/glass-ui/dark` (it reads
`useGlobalDark`, so it is topically a dark-mode leaf). `dist/motion-core.js`
reaches neither heavy peer; `dist/motion.js` keeps the engine.

### Rename table (no alias — inv 47)

| Symbol | Old path | New path |
|---|---|---|
| `useStaggerReveal` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useScrollProgress` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useRAFLoop`, `RAFLoopTiming` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useIntersectionPause`, `PausableRuntime` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useStagger` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `DAMPING`, `SNAP_THRESHOLD` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` (also still on `/motion`) |
| `installDarkModeSync` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/dark` |
| `useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`, `useAnimatedNumber`, `useAnimatedNumberMap` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion` (unchanged) |

`DAMPING` + `SNAP_THRESHOLD` resolve identically from either path (the same
pure-data `constants` module is duplicate-exported on both barrels because the
bearing leaves read them). `RAFLoopTiming` + `PausableRuntime` are type-only
relocations — no bearing leaf references them, so they move with their leaves to
`/motion-core` and drop from `/motion`'s type surface.

### Example

```ts
// Before (v2.0.0–v2.x)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    installDarkModeSync,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";

// After (≥ v3.0.0)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion-core";
import { installDarkModeSync } from "@mkbabb/glass-ui/dark";
```

The keyframes-bearing imports (`useSpring*`, `useNumericTransition`,
`useAnimatedNumber*`) stay on `@mkbabb/glass-ui/motion` unchanged.

### Verification

```bash
grep -c "@mkbabb/keyframes\|@vueuse/core" node_modules/@mkbabb/glass-ui/dist/motion-core.js
# Expected: 0 (both heavy peers absent — engine-free + vueuse-free)
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (the engine still resolves on /motion)
```

### No back-compat shim

Per inv 47 (no back-compat alias on `/motion` for the relocated leaves) +
precept 1/2 + L invariant 4, `/motion` ships no alias for the carved symbols.
Consumers rename per call site (the diffs are mechanical 1-line edits).

---

## v1.2.1—Aurora init fail-explicit (O.W1 Lane A)

Per O invariant 24 (library-internal contract violations throw; browser-API
degradation paths remain befitting silent fallbacks), `<Aurora>` init failure
is now **fail-explicit**.

### Before (≤ v1.2.0)

```ts
// useAurora's onMounted try/catch:
try {
    inst = createAurora(canvas, getCfg(), runtimeOptions);
} catch (err) {
    console.warn("[Aurora]", err);   // silent—surface renders nothing
    return;
}
```

A `createAurora` failure (WebGL2 unavailable, shader compile/link failure)
logged a warning to the console and rendered an empty `<canvas>`. The
consumer received no surface signal beyond the dev-console warn.

### After (≥ v1.2.1)

`createAurora` is glass-ui-internal; its failure is an internal contract
violation. The composable now rethrows by default so the failure surfaces to
the consumer's error boundary (or dev console as an uncaught exception). To
opt back into the prior silent-warn behaviour, pass `onInitError`:

```vue
<template>
    <Aurora
        :config="auroraConfig"
        :on-init-error="(err) => console.warn('[Aurora]', err)"
    />
</template>
```

The callback is invoked with the caught `Error`; the canvas stays unmounted
(matching the prior silent-fallback shape). The prop is also threadable via
`runtimeOptions.onInitError` for consumers passing a fully-composed
`AuroraRuntimeOptions` object (e.g. thumbnail-baking pipelines):

```ts
import type { AuroraRuntimeOptions } from "@mkbabb/glass-ui/api";

const runtimeOptions: AuroraRuntimeOptions = {
    mode: "capture",
    preserveDrawingBuffer: true,
    onInitError: (err) => myErrorBus.report("aurora-init", err),
};
```

The top-level prop wins when both are set.

### Why the change

Per Rα FAIL-EXPLICITLY F1 (`docs/tranches/O/research/Ralpha-legacy-code.md:85`)
and O invariant 24:

- Library-internal contract (shader compile / factory init / WebGL2 unavailable)
  → throw.
- Browser-API degradation (pointer-capture failure / reduced-motion preference)
  → silent fallback with rationale.

Silent-warn concealed bugs in shader edits, masked WebGL2-context-cap
exhaustion (Chromium ~8/page), and left consumers debugging "why is my canvas
blank" without a signal. The throw forces the bug to the surface where the
consumer can decide how to handle it.

### Migration cost

`grep` your codebase for `<Aurora` and `useAurora(`:

- If you depend on the prior render-nothing-and-warn behaviour, add
  `onInitError={(err) => console.warn("[Aurora]", err)}` to your `<Aurora>`
  call site.
- If you have an error boundary upstream and want the failure to surface
  there, no change needed.
- Speedtest's single `<Aurora>` call site (`src/App.vue:5`) inherits the
  fail-explicit default—the consumer-side disposition is coordinated at
  the cross-repo cohort wave (O.W6).

---

## v1.3.0—`avatarVariant` → `avatarVariants` (O.W4 Lane C)

Renamed for consistency with every other CVA variants const in the library
(`buttonVariants`, `toggleVariants`, `badgeVariants`, `sliderVariants`,
`menuItemVariants`, ...). The singular `avatarVariant` was the only
non-pluralized CVA constant in the codebase. One-line consumer migration:

```ts
// Before
import { avatarVariant } from "@mkbabb/glass-ui";
// After
import { avatarVariants } from "@mkbabb/glass-ui";
```

The `AvatarVariants` type alias is unchanged. Cross-repo audit
(`words`, `fourier-analysis`, `bbnf-buddy`, `keyframes.js`, `value.js`,
`speedtest`) found one passthrough re-export site
(`value.js/demo/@/components/ui/avatar/index.ts`); coordinated at O.W6
cross-repo cohort wave. No other production call sites use the symbol
across the constellation.

---

## v1.3.0—`useDarkModeSync` → `installDarkModeSync` (O.W4 Lane B)

Renamed because the composable doesn't follow the canonical `useFoo`
contract—it returns `void` after installing a `watch` side-effect.
The new name names the side-effect plainly (it installs a sync between
two darkness sources; it does not return a reactive handle). One-line
consumer migration:

```ts
// Before
import { useDarkModeSync } from "@mkbabb/glass-ui";
useDarkModeSync(localIsDark);
// After
import { installDarkModeSync } from "@mkbabb/glass-ui";
installDarkModeSync(localIsDark);
```

Cross-repo audit found 3 references in speedtest
(`src/components/speedtest/SpeedtestMeter.vue`,
`src/components/dashboard/composables/useEChartsTheme.ts`); coordinated
at O.W6 cross-repo cohort. No other constellation references.

---

## `@mkbabb/glass-ui/metric-cell` + `@mkbabb/glass-ui/metric-stack` subpaths — KEPT (speedtest-consumed)

Both subpaths SHIP. The `metric-cell/` (`MetricCell`) and `metric-stack/`
(`MetricStack` + `MetricRow`) component dirs, their `src/subpaths/metric-cell.ts`
/ `src/subpaths/metric-stack.ts` barrels, the `./metric-cell` / `./metric-stack`
`package.json` `exports` entries + `typesVersions` rows, the
`@mkbabb/glass-ui/api` re-exports (`MetricCellAppearance`, `MetricCellProps`,
`MetricStackProps`, `MetricRowProps`), and the `--metric-row-*` value-clamp token
family (tokens.css §17) are all LIVE.

**Speedtest is the binding consumer.** The metric families clear the ≥2-consumer
substrate bar (J inv 10) through the speedtest dashboard, which composes
`<MetricCell>`/`<MetricStack>`/`<MetricRow>` over the `/metric-cell` +
`/metric-stack` subpaths. They are the library's identity surface for compact
metric cards + vertical metric grouping; no migration action is required.

Import them via their flat subpath:

```ts
import { MetricCell } from "@mkbabb/glass-ui/metric-cell";
import { MetricStack, MetricRow } from "@mkbabb/glass-ui/metric-stack";
```

---

## Recommended new surfaces (best-practice, not strict migration)

Even where a root-barrel import still works at v1.0, prefer per-package
subpaths for better tree-shake granularity:

```ts
// Works at v1.0, but is broad—pulls the whole glass-ui root chunk.
import { GlassDock, Configurator } from "@mkbabb/glass-ui";

// Better—pulls only what you need.
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
```

Speedtest's re-link did NOT make this best-practice rewrite (it kept
root-barrel imports for non-vueuse-bearing symbols) and still saw the
-32.5 KB entry-chunk gz drop. Per-package subpath imports are an
incremental polish above that baseline.

### Adaptive glass over light — the self-engage default + the sampled observer (AZ.W-ADAPTIVE-AUTO)

Glass surfaces (the dock + the `.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`
content tiers + the overlay band) now **self-darken over light backdrops by default** —
the W54 glass-first MAXIMAL register made legible over the common bright-content case, no
consumer opt-in. The dock additionally wires the iOS-27 **sampled-luminance observer** ON
by default (`useGlassBackdropLuminance`), which dynamically tracks a live/animated backdrop
and writes `--glass-backdrop-luma` + the `--glass-backdrop` bucket on the dock root.

This is additive (no break). A **dark-substrate consumer** whose backdrop is already dark
(so the warm-ink darken is unwanted) opts out per-surface:

```css
/* The pristine un-tinted plate on a known-dark surface (the documented opt-out). */
.my-dark-surface .glass-card { --glass-tint-strength: 0%; }
```

```vue
<!-- The dock over a known-dark substrate — disable the sampled observer + the darken. -->
<GlassDock :auto-luminance="false" style="--glass-tint-strength: 0%" />
```

The observer is DEMO-PRIVATE (not on the public glass barrel) — it is wired internally for
the dock; a downstream surface that needs the same dynamic sampling triggers the public
barrel promotion (`docs/consumer-evidence/use-glass-backdrop-luminance.md`).

---

### The luminous-dark transmissive material + the calm-light recalibration (BA.W-DARK-MATERIAL)

The DARK register was rebuilt as a luminous transmissive material, and the LIGHT
content-tier self-engage was recalibrated. Both are **token-identity evolutions, NOT
breaking aliases** (the lib's own default tokens evolve as the lib's identity changes —
presets-in-consumers; no clean-break migration, no codemod).

**1 — The calm-light recalibration (the slides gray-slab fix).** The content tiers
(`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) no longer apply the full 20%
AA darken UNCONDITIONALLY — over a plain LIGHT page they self-engage only a sub-perceptual
`--glass-tint-strength-floor` (4%), so a calm-light card stays a translucent WARM cream
(was: a flat gray slab). The FULL AA darken on a content tier now engages only under the
declared/sampled BRIGHT signal (`--glass-backdrop: light` / the observer). A consumer whose
light-page card was relying on the unconditional 20% darken (rare) declares the bright
signal on an ancestor; a consumer who wants a content card flat opts out as before:

```css
/* A calm light page where the card should stay warm needs NOTHING (the new default).
   To FORCE the full darken on a content card over a known-bright surface: */
.my-bright-region { --glass-backdrop: light; }

/* The pristine un-tinted plate (unchanged opt-out). */
.my-surface .glass-card { --glass-tint-strength: 0%; }
```

**2 — Dark `--primary` is now chromatic.** The dark-mode `--primary` evolved off the
achromatic cream `hsl(48 10% 90%)` onto the brand legendre-violet `oklch(0.739 0.134 318.1)`
(a library-identity hue). Every filled/active/selected control reading `--primary` in dark
(Slider range, Badge `default`, Switch checked, Checkbox accent) now carries the brand
chroma instead of a flat pale-grey slab. The dark `--primary-foreground` is unchanged
(`hsl(24 10% 10%)`, clears 7.15:1 over the new accent). A consumer who OVERRODE the dark
`--primary` (presets-in-consumers) re-pins their own value in `:root`/`.dark` — no action
otherwise.

**3 — The `--surface-tint-*` family gained a dark arm.** In dark the family now mixes
toward a light ink (`hsl(48 12% 96%)`) so chip backplates / hairlines / the dock-rail
divider / the timeline dot read against the near-black card (was: invisible — collapsed
into the plate). The light arm + the in-srgb interpolation are UNCHANGED (the AW.W26
fence). Every `--surface-tint-*` consumer re-resolves automatically — no per-site edit.

### The warm-chroma floor — the neutral ladder + glass plate off gray (BA.W-NO-GRAY)

The `--neutral-*` ladder + the `--card` glass plate were re-saturated onto the warm
identity (R10-5 "No gray."). This is a **token-identity evolution, NOT a breaking alias**
(the lib's own default tokens evolve as its identity changes — presets-in-consumers; no
clean-break migration, no codemod). The ladder was SPECIFIED warm (hue 48) but RESOLVED
achromatic — at the library's low saturation it painted a yellow-green gray (OKLab hue ~95°,
chroma below the perceptual floor). The values evolve, both modes in lockstep:

| token | was (hsl) | now (hsl) |
|---|---|---|
| `--neutral-0` (page) | `48 12% 98%` / dark `24 9% 4%` | `40 30% 98%` / dark `24 9% 4%` (KEEP) |
| `--neutral-1` | `48 10% 95%` / dark `24 6% 11%` | `38 26% 95%` / dark `28 12% 11%` |
| `--neutral-2`/`--secondary` | `48 9% 90%` / dark `24 5% 16%` | `34 28% 90%` / dark `28 14% 16%` |
| `--neutral-3`/`--accent` | `48 8% 82%` / dark `24 5% 22%` | `33 30% 82%` / dark `30 18% 22%` |
| `--neutral-4`/`--border`/`--input` | `48 7% 70%` / dark `24 5% 34%` | `32 26% 70%` / dark `30 16% 34%` |
| `--neutral-5`/`--muted-foreground` | `48 6% 40%` / dark `48 5% 62%` | `30 22% 40%` / dark `34 14% 62%` |
| `--neutral-6` (strong-muted) | `48 7% 30%` / dark `48 6% 72%` | `28 24% 30%` / dark `36 14% 72%` |
| `--card` (glass plate) | `var(--neutral-0)` / dark `24 8% 16%` | `36 48% 97%` / dark `24 8% 16%` (KEEP) |
| `--glass-border-*` rim α | wash 8% → overlay 18% | wash 11% → overlay 22% (warmer rim) |

The moves are **chroma-only at constant L** — the L (and therefore every AA contrast ratio)
is preserved to within ±0.005 of HEAD (the gate re-ratifies). **`--card` now decouples from
`--neutral-0`** (a glass plate reads warm-cream over a flat backdrop, the page stays calm
surface). A consumer who OVERRODE any `--neutral-*` rung or `--card` (presets-in-consumers)
RE-PINS their own value in `:root`/`.dark` — those overrides win as before; no action
otherwise (every semantic alias `--secondary`/`--accent`/`--border`/`--muted-foreground`
still tracks the ladder, so a consumer reading those gets the warm value automatically). The
`--surface-tint-*` in-srgb family + the KEEP-NEUTRAL registers (`--warning-foreground`,
`--overlay-scrim-ink`, the shadow ink) are UNCHANGED.

```css
/* A consumer who hand-tuned a neutral re-pins their value (it still wins): */
:root { --neutral-4: hsl(30 6% 72%); }   /* your border override, unchanged behaviour */
/* A consumer who wants the prior achromatic plate re-pins --card: */
:root { --card: var(--neutral-0); }       /* opt back to the page-tracking plate */
```

---

### The scroll-state edge fade — `.scroll-fade-*` → `<FadingScroll>` + `--mask-fade-width` → `--fade-scroll-width` (BA.W-FADING-SCROLL)

The scroll-BLIND static `.scroll-fade-mask` / `.scroll-fade-y` / `.scroll-fade-top` /
`.scroll-fade-bottom` mask utilities are SUPERSEDED by the scroll-state-driven
`<FadingScroll>` primitive (`@mkbabb/glass-ui/fading-scroll`, axis `x`|`y`). The static
masks feathered BOTH edges unconditionally with no scroll knowledge — so the first card's
chrome was half-erased at `scroll = 0` (the R8-08 "Shy" defect). `<FadingScroll>` feathers
the start edge ONLY past `scroll > 0` and the end edge ONLY while trailing overflow remains.
This is a **CLEAN BREAK — no alias** (the static utilities + the `--mask-fade-width` token
were RETIRED at the 4.1.0 cut — BB.W-SCROLL-FADE-RETIRE — after every consumer migrated).

| was | now |
|---|---|
| `<div class="… overflow-x-auto scroll-fade-mask">` | `<FadingScroll axis="x" class="…">` (root is the scroll port) |
| `<div class="… overflow-y-auto scroll-fade-y">` | `<FadingScroll axis="y" class="…">` |
| `.scroll-fade-top` / `.scroll-fade-bottom` (one-sided V) | `<FadingScroll axis="y" :fade-start="false">` / `:fade-end="false"` |
| `--mask-fade-width: 1rem` (token) | `--fade-scroll-width: 1rem` (token — same default, inheriting) |

```vue
<!-- before -->
<div class="flex gap-2 overflow-x-auto scroll-fade-mask scrollbar-hidden">…</div>
<!-- after -->
<FadingScroll axis="x" class="flex gap-2 scrollbar-hidden">…</FadingScroll>
```

When wrapping the scroll port in a `<FadingScroll>` node would re-parent a load-bearing
anchor (e.g. a `position-anchor` indicator on the scroll container root), call the composable
form on the existing element instead — no extra DOM node:

```ts
import { useFadingScroll } from "@mkbabb/glass-ui/fading-scroll";
useFadingScroll(containerRef, { axis: "x" });   // writes --fade-start/--fade-end on the root
// + the container carries `fading-scroll fading-scroll--x` + the data-fade-* attrs
```

A consumer who overrode `--mask-fade-width` (`:root { --mask-fade-width: 0.5rem }`) re-pins
`--fade-scroll-width` instead. The native `scroll(self)` timeline is the primary path
(zero JS on a supporting engine); the `useFadingScroll` JS fallback covers older engines
automatically. The fade does NOT vanish under `prefers-reduced-motion: reduce` (it is a
legibility cue, not motion — it stops interpolating, the discrete edge presence stays).

---

### The disco CTA register retired — `btn-audacious` / `btn-audacious-gold` GONE (BA.W-GLASS-CAL, hinge H2a)

The user removed the "disco effect" wholesale. The `@utility btn-audacious` + `@utility btn-audacious-gold`
recipes (the sparkle `✦` glyph, the disco-grain hover, the gold-sweep shimmer, the typed press-ripple)
and their `@keyframes sparkle-sweep` / `btn-gold-bg-sweep` + the `--duration-sparkle` /
`--glass-grain-opacity-disco` / `--ripple-radius-max` / `--motion-duration-ripple` knobs are **DELETED —
clean break, no alias** (house no-backwards-compat). The `primary-audacious` / `gold-audacious` Button
**variant keys are KEPT and re-pointed** onto the calm glass-first register (hinge H2 arm a — *gold
survives CALM*), so a `<Button variant="primary-audacious">` / `variant="gold-audacious">` call site needs
**no change** — it inherits the new register automatically. Only a consumer that applied the `btn-audacious`
*utility class directly* (not via the variant) must migrate.

| was | now |
|---|---|
| `class="btn-audacious"` (the disco utility, applied directly) | the calm glass register — `class="glass-wash btn-glass text-foreground"` (the `--glass-specular` edge gleam + the §6 hover/press) |
| `class="btn-audacious btn-audacious-gold"` (the gold sweep) | `<Button variant="gold-audacious">` (the calm glass + STATIC `--color-gold` tint + specular, no animated sweep) — or a hand-authored `class="glass-wash btn-glass"` + a static `bg-[linear-gradient(135deg,color-mix(in srgb,var(--color-gold) 10%,transparent),…)]` tint |
| `<Button variant="primary-audacious">` | **unchanged** — the variant key re-points to the calm glass CTA |
| `<Button variant="gold-audacious">` | **unchanged** — the variant key re-points to the calm gold-glass CTA |
| `@keyframes sparkle-sweep` / `btn-gold-bg-sweep`, `--duration-sparkle`, `--glass-grain-opacity-disco`, `--ripple-radius-max`, `--motion-duration-ripple`, `@property --ripple-radius` | RETIRED (no surviving consumer) |

The dock-tab PRIMARY tier (`<DockTabButton data-tier="primary">`) no longer auto-attaches `btn-audacious` or
paints the phase-grain hover/halo — it reads the plain de-red'd dock-control glass hover register. The
`data-tier="primary"` styling hook is **unchanged** (the taller/wider structural shell stays); only the disco
accents drop. **Speedtest + slides:** any direct `btn-audacious` class binding migrates to the calm glass
register per the table; the `gold-audacious` / `primary-audacious` *variant* consumers are untouched. This is
a **breaking change for direct-utility consumers** (an input to the 4.0.0-vs-3.14.0 version call at W-CLOSE).

### Per-spring duration clock minted — `--spring-<name>-duration` (BA.W-GLASS-CAL Unit 3)

ADDITIVE — no migration required. `--spring-<name>-duration` (generated from the `(response, ζ)` SPRING_PRESETS
table: smooth 0.36s / snappy 0.34s / bouncy 0.69s / gentle 0.44s / dock 0.28s) is the spring's OWN settle clock.
A `transition` that pairs `--spring-<name>` with a generic `--duration-*` now re-points to the matching
`--spring-<name>-duration` so the spring plays at its physical settle (the prior generic clock dragged a dead
sub-pixel tail). A consumer reading `var(--spring-snappy)` directly gains the option of `var(--spring-snappy-duration)`
for the matched clock; the existing generic-clock pairings still work.

### The section-color pop primitive — `<IconChip>` + the `@mkbabb/glass-ui/icon-chip` subpath (BA.W-ICON-CHIP, additive)

ADDITIVE — no breaking change, a NET-NEW primitive + subpath. `<IconChip :icon :section>` (or
`:tone="var(--chart-download)"`) is the library's single section-color POP vehicle — the
`color-mix(… 25%, transparent)` backplate + full-chroma glyph the demo previously hand-rolled as an
inline `:style` paste. It enforces the chip≤glyph proportion IN the component (the
`--icon-chip-glyph-ratio` floor, default 2.18 — a consumer cannot collapse the plate under the glyph)
and ships three opt-in axes (`:duotone` filled-tonal fill / `:bloom` smooth-glass hover / `:reveal`
entrance, all PRM-gated, disco-FREE). A consumer wanting a proportioned section-color pop reaches for
`<IconChip>` instead of re-pasting the recipe. Reachable on the root barrel AND
`@mkbabb/glass-ui/icon-chip`; the types ride `@mkbabb/glass-ui/api` (`IconChipProps`,
`IconChipSection`, `IconChipTone`). `MetricCell`'s `iconColor` prop is unchanged (it now reconciles
internally onto `<IconChip bare :tone>` — the value/unit ink stays neutral; no consumer change).

---

## Cohabitation note—v0.9.4 stays supported

v0.9.4 remains available indefinitely as a v0.9.x patch-stream tag.
v1.0 adoption is opt-in. If you cannot migrate immediately:

- Pin to `^0.9.4` in `package.json`.
- The K.WS subpath typing-publication gap is patched at v0.9.4—you can
  adopt subpath imports incrementally (`@mkbabb/glass-ui/forms`,
  `@mkbabb/glass-ui/composables/dark`, etc.) without breaking your
  existing root-barrel calls.
- When you DO migrate to v1.0, the v0.9.4 subpath adopters have fewer
  call sites to rewrite—only the nested `composables/{dark,keyboard}`
  → flat `/dark` + `/keyboard` shape changes.

There is no scheduled v0.9.4 EOL. The patch line is frozen but not
retired.

---

## Worked example—speedtest re-link

Speedtest re-linked from v0.9.3 (root-barrel imports) directly to v1.0
in commit `98f88325` (`feat(deps): adopt glass-ui v1.0`). The diff
touched 15 src/ files:

| Pattern | Sites | Time to rewrite |
|---|---|---|
| `Input` + `Textarea` → `/forms` | 10 sites | ~10 min (multi-cursor pass) |
| `useGlobalDark` → `/dark` | 2 sites | ~2 min |
| `registerShortcut` → `/keyboard` | 2 sites (incl. 1 test mock) | ~2 min |
| Build + typecheck + lighthouse re-probe |—| ~15 min |

Cross-repo observed deltas (from
`docs/tranches/L/coordination/speedtest-Y.md`):

| Indicator | Pre-v1.0 | Post-v1.0 | Delta |
|---|---|---|---|
| `dist/index.html` modulepreload directives | 1 | 0 | canonical SCC closure |
| Entry chunk gz (speedtest) | ~204 KB (X close) | 171.5 KB | -32.5 KB |
| Glass-ui `dist/glass-ui.js` gz | 33.6 KB (K close) | 22.4 KB | -11.2 KB |
| Glass-ui `dist/glass-ui.js` raw | 189 KB (K close) | 124.8 KB | -65 KB |
| Subpath dts publication (`/dark`, `/keyboard`, `/api`, `/carousel`) | broken (K.WS regression) | self-contained | gap closed |

Speedtest build PASS in 9.83s. Consumer-side vue-tsc resolution clean.

---

## Production demo build—formal retire (per L.W5 Lane B Option B)

`npm run build` is library-mode only—it produces the `dist/glass-ui.{js,css,d.ts}`
bundle plus the per-subpath dist artefacts. There is NO `vite.demo.config.ts`
that produces a static demo build artefact.

**Disposition at L.W5**: option B—formally retire the demo as a production
deploy target. Rationale:

- The demo storybook is dev-mode-only—the canonical workflow is `npm run dev`
  → Vite dev server.
- Lighthouse audits run against the dev server with the documented dev-mode
  caveat. The K.W4 + L.W6 Lighthouse passes used this workflow.
- Consumer-deploy concerns (CloudFlare Pages, Vercel, GitHub Pages hosting,
  cache-TTL, etc.) are out of glass-ui scope—they belong to consumer repos
  (speedtest is the canonical reference for demo build chains).
- Shipping a `vite.demo.config.ts` would create a second build target this
  library does not need to maintain.

If you need a static demo for offline review, the path is: clone the repo,
`npm run dev`, navigate, screenshot. The demo storybook is an internal
authoring substrate, not a published artefact.

---

## Verification checklist

After migrating to v1.0:

```bash
# 1. Build clean
npm run build

# 2. Typecheck clean (vue-tsc or vue-tsc-bundled)
npx vue-tsc --noEmit

# 3. No retired-symbol root-barrel imports remain
rg 'from "@mkbabb/glass-ui"' src/ \
  | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
# (expected: zero hits)

# 4. No retired nested subpath imports remain
rg '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/
# (expected: zero hits)

# 5. No retired composable imports remain
rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow)\b' src/
# (expected: zero hits)

# 6. No retired subpath imports remain
rg '"@mkbabb/glass-ui/(pagination|virtual)"' src/
# (expected: zero hits)

# 7. Bundle re-probe (consumer-specific; speedtest observed -32.5 KB entry-chunk gz)
```

---

## reka-ui 2.x — Combobox `searchTerm` → `ComboboxInput` v-model (AW.W26)

> Downstream-consumer note. glass-ui's own `Combobox*` wrappers are ALREADY on
> the canonical 2.x shape — this note is for consumers who hand-wired the reka
> Combobox primitive directly and still bind the pre-2.x `v-model:search-term`
> on `ComboboxRoot`.

reka-ui 2.x moved the search/filter term OFF `ComboboxRoot` and ONTO
`ComboboxInput`'s `v-model`. The pre-2.x `<ComboboxRoot v-model:search-term>`
binding **silently no-ops** on 2.x (the prop no longer exists on the root) — and
because a stale reka model binding is a no-op, neither `vue-tsc` nor a unit test
catches it; only a render-effect probe does (the standing binding-verification
note + glass-ui's own `proof:reka-binding-idiom` render guard).

```vue
<!-- BEFORE (pre-2.x) — the filter term on the root -->
<ComboboxRoot v-model:search-term="query">
  <ComboboxInput />
</ComboboxRoot>

<!-- AFTER (reka 2.x) — the filter term on the input -->
<ComboboxRoot>
  <ComboboxInput v-model="query" />
</ComboboxRoot>
```

glass-ui's `<Combobox>` / `<ComboboxInput>` already forward the 2.x shape (the
wrapper passes `ComboboxRootProps`; the search term rides `ComboboxInput`), so a
consumer on glass-ui's wrappers needs no change — this is only for hand-rolled
reka usage. Sweep on every reka major bump.

---

## Reference

- **CHANGELOG**: full v1.0 entry at the top of `CHANGELOG.md`.
- **Tranche plan**: `docs/tranches/L/L.md` (invariants, hard gates).
- **HEADLINE wave proof**: `docs/tranches/L/audit/W1-{A,B,C}-*.md`
  (root-barrel curation, api/ discovery, subpath flatten).
- **Wire-or-retire proofs**: `docs/tranches/L/audit/W3-{A,B}-*.md`
  (composables + primitives).
- **Cross-repo verification**: `docs/tranches/L/coordination/speedtest-Y.md`
  (re-link ledger, before/after deltas).
- **Research basis**: `docs/tranches/L/research/Rε-architectural-transpositions.md`
  (HEADLINE rationale).
- **Speedtest re-link diff**: speedtest commit `98f88325`
  (`feat(deps): adopt glass-ui v1.0`).

## 3.13.0 — the constellation kVis floor (R5-8, additive)

The constellation gains a visual-size draw-scale FLOOR: `kVis = max(k, kFloor)` applied by
`drawNodes`/`drawEdges`/`drawPointerWeb`/`drawRipples` to SIZES (dot radii, line widths, the
cursor dot, the ripple ring) while TRUE `k` keeps positions and reach. On a 390px canvas
(k≈0.30) the dots stop crushing sub-pixel; at/above `0.72·BASE_WIDTH ≈ 922px` (including the
1280 export frame) `kVis === k` exactly — byte-identical by construction. New exports on
`/constellation`: `DEFAULT_K_FLOOR` (0.72) + `kVisOf(field)` (for `drawOverlay` skins to floor
their own marks); new optional `ConstellationField.kFloor` member, tokenable per instance via
`--constellation-k-floor` (read by `<Constellation>` from the canvas). No API changes to the
existing exports; the slides deck-side `K_VIS_FLOOR` interim arm retires on this release.

## BA — the d6-lineage A/B reconciliation (the Connectivity Atlas fold)

The Connectivity Atlas consumed the d6 fork lineage (the registry 3.11.x/3.12.0 publishes)
and moves to mainline. BA.W-ATLAS-RECONCILE folds the d6 A/B registers need-shaped. Per the
atlas letter: zero legacy shims, zero compat re-exports — where an idiom was superseded, the
new shape is below and the consumer migrates. The full old→new table is in
`docs/tranches/BA/audit/W-ATLAS-RECONCILE-cut-notes.md`.

### A-1 — the post-flip settle seam (ADDITIVE, no migration)

`useGlobalDark().onFlipSettled(cb)` returns to mainline ADOPTED VERBATIM from the d6 fork —
register ONE post-flip post-paint callback (`(isDark: boolean) => void`) that batches N
expensive re-theme ops (palette memo + chart retint + aurora re-derivation) into a single
coalesced `requestAnimationFrame` beat per flip. On `/dark` + `/api`
(`DarkFlipSettledCallback`). No call-site change vs the fork — byte-identical seam.

### A-4a — `PAPER_WASH_GROUND` (ADDITIVE, no migration)

The library-canon recessive-ground crayon calibration partial returns ADOPTED VERBATIM. On
the `/aurora` barrel + `/api`. Spread it over a consumer's pole-derived pigment:
`const cfg = { ...consumerBase, ...PAPER_WASH_GROUND }`.

### A-4b — the route transition: `navigate` over the ONE VT substrate (ONE-LINE RENAME)

The d6 `useRouteTransition()` standalone wrapper is SUPERSEDED — there is NO parallel route
wrapper. `navigate` is a thin convenience over the ONE `useViewTransition` substrate
(`startViewTransition` gained an async update + a JS-level reduced-motion instant-path).

```ts
// OLD (d6 fork)
const { navigate } = useRouteTransition();
await navigate(() => router.push(`/${slug}`));

// NEW (mainline) — `navigate` is a DIRECT named import (root barrel or /motion-core)
import { navigate } from "@mkbabb/glass-ui";
await navigate(() => router.push(`/${slug}`), { types: ["forward"] }).finished;
```

`supportsRouteTransitions()` mirrors `supportsViewTransitions()`. Under reduced motion (or an
unsupported engine) the navigation runs instantly, unanimated — information parity absolute.

### C-3 — the silver structure quad + `variant="structure"` (NEW, additive)

The silver structure metal (`--silver`/`-light`/`-dark`/`-deep` + `--color-silver*` aliases,
gold's cool mirror) + the `<InstrumentChassis variant="structure">` register (the cool
milled-metal housing). The atlas's structure surface adopts `variant="structure"` (or reads
the `--color-silver*` tokens) for the precision-instrument register.

### A-5 — `MetricBadge` `amount`→`value` (ONE-LINE RENAME; already shipped at AZ)

`<MetricBadge :amount="…">` → `<MetricBadge :value="…">`. The atlas acknowledged this is
intentional; see the AZ.W-METRIC-UNIFY row above (`MIGRATION.md` §3.x amount→value).

## BA → 4.0.0 — the dark-register-rebuilt cut (the clean breaks)

The 4.0.0 major collects the BA tranche's clean breaks (no aliases, no compat shims — the
no-backwards-compat house rule: a clean break IS a major). H4 SETTLED to **4.0.0** on the
atlas register-D two grounds (§the d6 reconciliation above): the A-list is a
removal+re-add for a live 3.12.0 fork consumer, AND BA carries its own breaks below. Each row
names the wave, the break, and the consumer re-pin action. **The value.js-impacting rows
(tabs, Dialog, menu-row, Select, Slider) are flagged `[value.js]` by name** — value.js is the
live 3.13.0 registry consumer owed the named cut-notes (the atlas register-D discipline — by
name, never silently; the full value.js adopt is `docs/tranches/BA/audit/valuejs-adopt-book.md`).

### The disco retirement (W-GLASS-CAL / H2a) — gold survives CALM

The audacious disco-grain recipe family RETIRES (clean break, no alias): the `@utility
btn-audacious` / `btn-audacious-gold` recipes, the `@keyframes sparkle-sweep` /
`btn-gold-bg-sweep`, and the disco-grain knobs (`--duration-sparkle`,
`--glass-grain-opacity-disco`) are GONE. Gold survives in the CALM register per H2a arm (a):
the static `.gold-shimmer` text gradient + the `--glass-specular` edge catch-light registers
STAY (the FENCE held — only the ANIMATED sweeps die). The dock-tab primary tier collapses onto
the plain glass hover register (no grain / `--phase-color` radial halo). **Consumer re-pin:**
drop any `<Button variant="primary-audacious">` / `gold-audacious` binding (the variant rides
the retired recipe) or accept the calm register — the slides `DeckGate.vue:70`
`variant="primary-audacious"` is the named live break site (see the slides adopt book).

### The tone-on-glass recompose (W-FEEDBACK-TONE)

Toast / Notification / Alert tone variants render TINTED-GLASS over the floating rung (ONE
`.feedback-tone` `color-mix` recipe, α < 0.92 both modes), NOT an opaque saturated slab. The
three independent tone maps collapsed onto the ONE recipe. **Consumer re-pin:** a consumer that
hardcoded a tone-slab color re-points to the house tone token; the slab look is gone.

### The static scroll-fade retirement (W-FADING-SCROLL)

The static `.scroll-fade-*` utilities RETIRE (clean break). **Consumer re-pin:** migrate to the
`<FadingScroll>` primitive (`@mkbabb/glass-ui/fading-scroll`) — a native `scroll(self)`-driven
edge-fade with a JS fallback. A consumer's local FadingScroll prototype (slides had one) deletes
on the bump.

### PresetEditorField retires onto the Configurator chassis (W-CONFIG-CHASSIS)

The gear PresetEditor recomposes on the Configurator chassis; `PresetEditorField` is REMOVED
(clean break). **Consumer re-pin:** the migration is the `<ConfiguratorRow>` composition shape
(label + control row; `DarkModeToggle` on the live `useGlobalDark` seam). The section divider
COLOR moved off the inline `border-border/30` alpha to the dark-adaptive
`--configurator-divider` token, keyed by the `data-dividers` attribute (the `border-t` WIDTH
arm stays).

### The shared `surface` axis (W-SURFACE-AXIS) — incl. the Dialog break `[value.js]`

The shared `{glass · veil · opaque}` `surface` axis is adopted across
Card / GlassPanel / Dialog / Sheet / Drawer / Popover / Command / ExpandableContainer / Skeleton
(`surface-axis.css` + `useSurfaceAxis`). It is ADDITIVE where it extends a union, but two breaks
a consumer re-pins:
- **The Dialog `variant`→`surface` move `[value.js]`** — Dialog's prior `variant` discriminant
  is the `surface` axis now. A consumer setting `<Dialog variant="…">` re-points to `surface="…"`.
  (value.js DeckGate sets no `variant` on its Dialog → a NO-OP for slides specifically; the
  value.js consumer of `/dialog` re-pins.)
- **The GlassPanel↔Card axis reconciliation** — the two surfaces share the ONE `surface` axis;
  a consumer relying on the prior divergent prop shape re-pins to the unified `surface` prop.
- **`<Skeleton surface="glass">`** is the named downstream register for value.js's bespoke
  `PaletteCardSkeleton.vue` (`bg-foreground/[0.04]` over `bg-card` — the "too black" composite)
  re-author at the pin.

### The tabs taxonomy cut (W-TABS) `[value.js]`

ONE tab engine: `<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`, pill-glass + underline-paper on
`.paper-ink-mark`). The clean breaks (no alias):
- **`ui/Tabs` LEFT the public root barrel** — the reka `Tabs`/`TabsList`/`TabsTrigger`/
  `TabsContent` wrapper family is OFF `@mkbabb/glass-ui` (the reka substrate stays INTERNAL
  solely for the dock-rail consumer). Canonical panel-nav is `<SegmentedTabs variant="underline">`.
- **`segmented`→`pill` `[value.js]`** — the SegmentedTabs `segmented` variant folds onto `pill`;
  value.js's `PaneSegmentedControl.vue` (consumes `@mkbabb/glass-ui/tabs`) re-points the variant.
- **`multi-select` → `<ToggleGroup>`** — the multi-select tabs arm retires onto ToggleGroup
  (the independent-toggles surface; Tabs is panel-nav only).
- **`overflow` responsive-collapse** retired (the prior `:responsive` collapse arm).
The indicator paints ONE elastic register (the oval-blob default-ON `TabsIndicator` plate is dead).
`proof:tabs-unified` re-pointed to `proof:tabs-std`.

### The menu-row glass default flip (W-MENU-GLASS) `[value.js]`

The `.glass-menu-row` register is minted on the shared `menuItemVariants` CVA — DropdownMenuItem /
ContextMenuItem / Select / Combobox / Command items inherit the element-level oklab-tint hover/
highlight by DEFAULT. The base flat-fill (`hover:bg-accent` / `focus:bg-accent` /
`data-[highlighted]:bg-accent` / `data-[state=open]:bg-accent`) is DROPPED — `accent` is now the
explicit opt-out ESCAPE, not the base. **Consumer re-pin:** a consumer relying on the flat
`bg-accent` highlight re-points; the `.glass-menu-section` mono-caption/hairline recipe is the
section register. `[value.js]` — the dropdown/context-menu glass register.

### The `/underline`→`/handmark` DEC-8 fold (W-HANDMARK)

The d6 hand-voice family RE-LANDS on `@mkbabb/glass-ui/handmark` (`HandMark`/`InkMark`/`BRUSHES`).
The prior `GlassUnderline` + `custom/underline/` + the `/underline` subpath RETIRE (clean break,
grep-negative survivor). **Consumer re-pin:** a consumer importing `@mkbabb/glass-ui/underline` /
`GlassUnderline` re-points to `/handmark` (`<HandMark>`). (slides imports ZERO `/underline` — the
red pen-underlines on its intro/closer slides are deck-LOCAL CSS/SVG glyphs, never the library
component; a NO-OP for slides — see the slides adopt book.)

### The `CarouselDots`→`PagerDots` retirement (W-PAGER)

`CarouselDots` RETIRES onto the unified `<PagerDots>` + `.glass-pager-ring` register
(`@mkbabb/glass-ui/pager`) — the carousel counter off the dark `bg-card` slab. The dots and the
slides `DeckPager` were ALREADY one recipe (≥2 consumers by construction). **Consumer re-pin:**
a `CarouselDots` consumer re-points to `<PagerDots>`.

### Dark-material token-identity NOTEs (W-DARK-MATERIAL — token re-points, not API breaks)

The dark register is rebuilt on the EXISTING `--glass-tint-*` seam (no new compositing seam):
the page→card L-point split (page L6→L4, card L10→L16), the transmissive dark `saturate`/
`brightness` arm + edge α 0.22, the dark tint LIFT 12%, and the `--primary` →
legendre-violet (`oklch(0.739 0.134 318.1)`, fg 7.15:1). These are TOKEN re-resolutions on the
inheriting axis — a consumer overriding a `--glass-*` / `--primary` token re-checks its value
against the rebuilt register, but there is no API/prop break (the W-DARK-MATERIAL scope-7
self-engage conditionalization REMOVES the gray-slab self-engage a calm-light content card
composited — a consumer's content card un-grays at the bump with ZERO consumer edit).

### Warm-chroma-floor NOTEs (W-NO-GRAY — token re-saturation, not API breaks)

The neutral ladder + light glass plates + borders are re-saturated onto the warm identity (the
achromatic-48 ladder lifted above the C 0.020 chroma floor). TOKEN re-resolution; no API break.
A consumer overriding a neutral token re-checks its chroma.

### The `--glass-blur-*` dial-back (W-GLASS-CAL B1 — token re-point, not API break)

The six `--glass-blur-*-radius` primitives dialed back ~15-20% within the 8-15px band
(`10/12/16/15/11` → `8/10/13/13/9`; wash unchanged at 1px; the dock radius 11px→9px). TOKEN
re-resolution; no API break. The per-spring `--spring-<name>-duration` vocabulary is MINTED (the
analytic 2%-band settle envelope, GENERATED from `SPRING_PRESETS`) — a consumer that rode a
`--spring-*` easing on a generic `--duration-*` clock gains the matched per-spring duration.

### The `@source` re-point (W-EMISSION — consumer-wiring fix, not an API break)

The dead `@source` in `index.css` re-points to the real `dist/` surface so glass-ui's compiled
utilities reach a consumer's Tailwind content-scan again. The Select collision-bound + inner-
scroll ship as PRECOMPILED CSS; the Slider `size` axis now renders REAL track geometry in every
consumer (no rename, but the rendered behaviour changes — a consumer relying on the silently-6px
track now gets the real `size` track) `[value.js — the A-3 Slider size axis]`. The
`SelectTrigger` `size` gained a font-rung prop writing `--dropdown-text` `[value.js — WO-3]`.

### `MetricBadge` `amount`→`value` (already shipped at AZ; re-flagged here for the BA consumer set)

Carried verbatim from AZ.W-METRIC-UNIFY (above) — a ONE-LINE `amount=`→`value=` rename per call
site. Named here so a consumer adopting the 4.0.0 cut sees it in the BA break list.

### `Drawer*` moves to the `/drawer` subpath (BB.W-DRAWER-ABROGATE — clean break, no alias)

The Drawer family is re-built on reka `DialogRoot` + the house `useDrawerSnap` engine (a
`@mkbabb/keyframes.js` `SpringProgress` consumer), abrogating vaul-vue (the lone `@vueuse/core
^10.8` dual → full `@vueuse ^14` convergence). Because the rebuilt Drawer now bears the optional
`@mkbabb/keyframes.js` peer, it CANNOT inline that peer into the vueuse-free root bundle, so it
ships via a dedicated subpath like dock/aurora:

```ts
// before (v4.0.0)
import { Drawer, DrawerContent, DrawerTrigger } from "@mkbabb/glass-ui";
// after (v4.1.0) — one-line rename per call site
import { Drawer, DrawerContent, DrawerTrigger } from "@mkbabb/glass-ui/drawer";
```

The `mode` / `surface` / `showOverlay` props + the `[data-surface]` axis are PRESERVED byte-for-byte;
the `[data-vaul-*]` state-attribute LOOK keys re-pointed to `[data-glass-drawer-*]` (a consumer that
hand-styled `[data-vaul-snap-points]` re-points to `[data-glass-drawer-snap-points]`). The
direction-aware default snap ladder is now native (`resolveDefaultSnapPoints(direction)` — no more
`:snap-points="[]"` workaround for a full-slide left/right drawer).

### `.glass-refract` → `.glass-lens` (BB.W-LENSING — clean break, no alias)

The refractive-glass opt-in class is renamed `.glass-refract` → `.glass-lens` (the iOS-26
edge-lensing vocabulary). The class now composes the EVOLVED squircle bevel-profile displacement
filter (the crude AW.W23 uniform-radial map is RETIRED) + the typed inheriting `--glass-refract`
magnitude axis (the `:active` lens-swell). The `--glass-refract*` AXIS/token names are KEPT (only the
opt-in CLASS renames). One-line rename per call site:

```html
<!-- before (v4.0.0) -->
<div class="glass-floating glass-refract">…</div>
<!-- after (v4.1.0) -->
<div class="glass-floating glass-lens">…</div>
```

`<Button :liquid>` re-points internally (no consumer change). Off-Chromium the lens still degrades to
the un-gated blur+tint base (the `@supports (backdrop-filter: url(#…))` floor, PRESERVED).

### `popover-animate` / `slide-in-from-side` → `.glass-reveal` (BB.W-LIQUID-REVEAL — clean break, no alias)

The reka-overlay enter `@utility popover-animate` (the fixed-bezier `zoom-in-95` + `fade-in-0`) AND
`@utility slide-in-from-side` are RETIRED, replaced by the spring-clocked LIQUID-ENTER recipe
`.glass-reveal` (the iOS-27 bloom: scale + fade + `filter` blur-settle on `--spring-snappy` +
`--spring-snappy-duration`, exit `--ease-out` no-overshoot, PRM-snap). The ≥9 enrolled overlays
(Dialog/Popover/Sheet/Tooltip/HoverCard/DropdownMenu/ContextMenu/Combobox/Select + HoverPopover)
re-point INTERNALLY — **no public-prop break; the default enter upgrades to liquid glass.** The
Dialog `spring` opt-in (`useSpringMount` drag-dismiss) is UNCHANGED.

A consumer who hand-composed `popover-animate` / `slide-in-from-side` directly on a CUSTOM portal
surface re-points to `glass-reveal` (the directional `slide-in-from-side` folds onto `.glass-reveal`'s
`data-side` compositor `translate` leg):

```html
<!-- before (v4.0.0) -->
<div class="glass-floating popover-animate slide-in-from-side">…</div>
<!-- after (v4.1.0) -->
<div class="glass-floating glass-reveal">…</div>
```

NEW: `useLiquidReveal(surfaceRef, { trigger, preset })` (`@mkbabb/glass-ui/motion`) — the source-rect
bloom JS leaf (the dialog-from-button / dock-from-pill case), composing the kf `ElementMorph` +
`springTimingFunction`. The CSS `.glass-reveal` recipe is the zero-JS everywhere floor; the JS leaf is
the source-rect refinement.
