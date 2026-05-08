# Changelog

## v0.9.2 — 2026-05-08

W.W3.b.2 patch — two library-internal fixes that unblock the speedtest
W3 perf push: a browser-safety repair on the root barrel and an A5 §3
Split 6 swap of `tailwind-merge` for a hand-rolled deduplicator.

### FIX

- **Root barrel no longer re-exports `./freshness`** (the build-blocker).
  `src/freshness.ts` imports `node:fs` / `node:path` / `node:url`; Vite's
  browser bundler externalises these as `__vite-browser-external` and
  fails when a consumer's worker pulls anything off `@mkbabb/glass-ui`'s
  root export. The speedtest worker at `src/utils/speedtest/index.ts:1`
  was hitting this path: the symptom was
  `"existsSync" is not exported by "__vite-browser-external"` during
  `npm run build`. The fix removes line 19's `export * from "./freshness"`
  from `src/index.ts` and leaves the helper reachable at the subpath
  `@mkbabb/glass-ui/freshness` (`exports["./freshness"]` was minted in
  v0.9.1). The library-external list in `vite.library.ts` keeps the
  Node-builtin externals so the subpath still bundles correctly.

### PERF

- **`cn()` swaps `tailwind-merge` for `clsx` + a hand-rolled deduplicator**
  per A5 §3 Split 6 and `feedback_library_gaps.md`. `tailwind-merge`
  ships ~22 KB gzipped of full Tailwind config tables to resolve every
  conflict pair across the framework; glass-ui exercises a small,
  enumerable subset. The replacement walks the joined class string
  left-to-right, computes each token's bucket via a ~30-rule regex
  table (font-size, font-weight, padding axes, margin axes, gap, sizing,
  bg-color, text-color, border-color, border-width, ring, rounded,
  display, position, overflow, flex, items, justify, opacity, z-index,
  cursor, shadow), and keeps the last-write per `(prefix-scope|bucket)`
  pair. Variant prefixes (`hover:`, `md:`, `dark:`) scope the bucket so
  `text-sm md:text-lg` keeps both tokens. Estimated consumer-side delta:
  −10 to −18 KB gzipped on the speedtest entry chunk after re-link
  (A5 §3 Split 6).

### TEST

- **18 new `cn.test.ts` cases** (5 variadic + clsx normalisation,
  13 conflict-pair last-wins) at `src/utils/__tests__/cn.test.ts`.
  Suite total moves from 322/322 (W2 close) to 340/340.

### CHORE

- `package.json`: `tailwind-merge` removed from `peerDependencies` +
  `devDependencies`; `clsx` retained.
- `vite.library.ts`: `tailwind-merge` removed from `libraryExternal`.

## v0.9.1 — 2026-05-08

W.W2 patch — ScrollingText lift + freshness-gate substrate + Section
storybook + opportunistic StorySection migration sweep. Six glass-ui
commits + two cross-repo commits (keyframes.js + value.js) close the
post-V drift surfaced by audit A3.

### NEW

- **`<ScrollingText>` overflow-marquee primitive** lifted from the
  speedtest consumer per A3 §3.1. Subpath: `@mkbabb/glass-ui/scrolling-text`.
  Mirrors the typewriter / pulse / status-dot custom-composite shape.
  Test coverage: 3 vitest cases against the `data-overflows` boolean
  threshold (delta > 1 px).
- **`<Section>` storybook entry** at `demo/stories/primitives/section.vue`
  closes the V.W3.T7 unification primitive's missing demo (A3 §5.1).
  Exercises tone (heading · title · subheading · label) × gap (tight ·
  regular · loose) plus the custom header slot.
- **`<ScrollingText>` storybook entry** at `demo/stories/data/scrolling-text.vue`
  shows the overflow threshold across narrow / mid / wide hosts using
  long IPv6 + org-name samples.

### INFRASTRUCTURE

- **`scripts/freshness-gate.mjs` + `prebuild` hook** close the V.W8
  stale-dist drift class per A3 §4.3 / V.FINAL.md:104-106. Strict-mode
  invocation (CI / hard-gate) exits 1 when newest src mtime exceeds
  `dist/glass-ui.js` or `dist/index.d.ts`. `--pre` permissive mode warns
  and exits 0 so the upcoming `vite build` can rebuild without the gate
  blocking it.
- **`prepare: test -f dist/glass-ui.js || npm run build`** lifecycle hook
  (npm-canonical build-on-install path).
- **`assertDistFresh()` helper** exported from `@mkbabb/glass-ui/freshness`
  for downstream `vite.config.ts` consumer wiring (W3 wires speedtest;
  W2 ships the helper alone). 1 vitest sanity case in
  `scripts/__tests__/freshness-gate.test.ts`.
- **`@types/node` + tsconfig `types: ["vite/client", "node"]`** added so
  the freshness module typechecks. `node:fs` / `node:path` / `node:url`
  added to vite's `libraryExternal` list (Node-only consumer helper —
  must not be bundled into the browser ESM output).
- **Cross-repo prebuild gate** mirrors land at `keyframes.js@<HEAD>`
  (branch `w.w2.1-keyframes-prebuild`, scripts/freshness-gate.mjs +
  `prebuild` script — `prepare` already present) and `value.js@<HEAD>`
  (branch `w.w2.1-value-js-prebuild`, scripts/freshness-gate.mjs +
  `prebuild` + `prepare`). Per A3 §4.4 same-bug-class. Version bumps +
  publish ceremonies are owned by W5.T1 (value.js) / W5.T2 (keyframes.js).

### MIGRATIONS

- **StorySection sweep** — opportunistic mechanical migration of 16
  `<section class="flex flex-col gap-3"><p class="section-label">…</p>`
  pairs onto `<StorySection :label="…">` across 5 stories:
  `feedback/progress.vue` (4 sites), `feedback/skeleton.vue` (3),
  `primitives/pulse.vue` (4), `primitives/status-dot.vue` (2),
  `primitives/separator.vue` (4 top-level; nested label-paragraphs
  inside the 4th section's sub-divs left as-is — those are inner-row
  labels, not section heads). Bound by W2.md §Format budget; further
  sites roll forward to the next opportunistic touch.

### CONSUMER MIGRATION (speedtest)

- `src/components/AppSettingsButton.vue:81` rewrites
  `import ScrollingText from "@src/components/ScrollingText.vue"` →
  `import { ScrollingText } from "@mkbabb/glass-ui"` (named import —
  ScrollingText now ships from the root barrel + `/scrolling-text`
  subpath). Deletes `src/components/ScrollingText.vue` (115 LOC).
  Five template-level call-sites unchanged.

## v0.9.0 — 2026-05-08

The V-tranche bundled release — V.W2 foundation polish + V.W3 structural
unions + V.W4 storybook + composables expansion. Consolidates twenty-plus
load-bearing patches surfaced by the 14-agent W0 audit cohort and the
R-tranche refining synthesis.

### Foundation polish (V.W2)

- **Icon-size tokens minted** — `--icon-2xl: 2rem`, `--icon-3xl: 2.5rem`,
  `--icon-hero: 3.5rem` complete the icon-size rung set; `theme.css`
  bridges the new tokens through `@theme` so consumers compose
  `size-icon-2xl`, `size-icon-3xl`, `size-icon-hero` Tailwind utilities.
- **`--z-behind: -10`** — Aurora background-tier z-index for elements
  that intentionally render below the document flow.
- **Notification + Slider canonical glass-blur** — both primitives adopt
  the canonical per-tier glass-blur tokens.
- **Notification + Toast canonical tier shadows** — retire literal
  `shadow-lg` overrides in favour of the canonical tier-shadow tokens.
- **Card + Label titles** → typography ladder (admin-label / display-N).
- **Avatar / Badge / Button / Toggle radius sweep** — remaining raw
  radius literals migrate onto the `--radius-*` token rungs.
- **Resource hints + .browserslistrc floor** — `<link rel="preconnect">`
  for `api.fontshare.com` lands in the demo shell; `.browserslistrc`
  declares the canonical baseline.
- **`.gold-shimmer` PRM bracket** — wraps the slide animation in a
  `prefers-reduced-motion: no-preference` bracket per R1 §3 + R4 §5.1.

### Structural unions (V.W3)

- **`<ModalOverlay>` collapses 3 scrim declarations onto a shared SFC** —
  AlertDialogOverlay + DialogOverlay + SheetOverlay compose the new
  primitive reading `--overlay-scrim` (with `tier='strong'` for the
  destructive variant).
- **`menuItemVariants` CVA collapses 9 primitives** — DropdownMenuItem,
  ContextMenuItem, SelectItem, ComboboxItem, CommandItem and their
  Sub variants share a single CVA recipe with `data-[disabled]`,
  `data-[highlighted]`, and `data-[state=checked]` branches.
- **`.popover-content` utility** — collapses 2 W1-survivor popover hosts
  onto a single shared utility.
- **`<LabeledField>` parent SFC + `.labeled-field-label` utility** —
  the four labeled-field wrappers (Input / Select / Slider / Switch)
  now compose a single parent that owns the IconTooltip + label
  layer; the four wrappers stay as 3-line forwarders for back-compat.
- **`<Section>` sectioning primitive over the typography ladder** —
  semantic sectioning host that paints the canonical
  `text-display-N`/`text-title`/`text-prose` typography pairings.
- **Active-state vocabulary canon** — BouncyToggle + UnderlineTabs adopt
  `aria-pressed` / `data-active` per R4 §2.4 reconcile.
- **Density-rail unification** — GlassDock + DockGroup + MetricPill
  unify on `data-density` attribute + a CVA-driven density token set
  (StackedIconGroup intentionally excluded per B5 §2.1 — size-axis only).
- **Popover-animation grammar** — `popover-animate` + `slide-in-from-side`
  standardised on `@utility`; HoverPopover + the floating-panel host
  unify on the canon.
- **Surface-tint tier aliases** — `--surface-tint-quiet/floating/modal`
  bridge the 9-rung numeric scale into named tiers consumed by
  component-level styles.

### Storybook + composables expansion (V.W4)

- **5 chassis primitives** — `<StorySection>`, `<ShowcaseFrame>`,
  `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>` collapse the
  ~233-site demo-host duplication. `<ShowcaseFrame>` carries a 5-rung
  `pad` knob (xs=p-3 / sm=p-4 / md=p-5 / lg=p-6 / xl=p-10) including
  the p-4 most-frequent close-variant.
- **`useStoryDemo` composable** — canonical play / reset / status
  harness for storybook demos. Mirrors `useStagger`'s timer-set
  discipline: cleanup callbacks registered inside the play handler
  fire on `reset()` AND `onScopeDispose`. Async-aware. Generic over
  the live-state shape.
- **9 missing primitive entries** — configurator, controls/DarkModeToggle,
  expandable-container, icon-tooltip, labeled-field, paper-backdrop,
  stacked-icons, toggle-chip, glass-panel.
- **Toaster.vue story** — the `ui/toast/Toaster.vue` drop-in primitive
  that consumers (the speedtest, the demo itself) compose at the layout
  root. Per B4 §3.3 — A4 missed `ui/`-orphan primitives.
- **Badge `success | warning | info` variants demo** — the v0.8.6 CVA
  branches gain a dedicated `semantic tones` row in the badge story.
- **23 composable storybook entries** — useGlobalDark (with singleton
  invariant demo per B4 §3.5), useKeyboardShortcuts (registerShortcut
  + useRegisteredShortcuts pair), useResizeObserver, useGlassRenderer,
  useAnimatedNumber, useDarkModeSync, useIntersectionPause, useRAFLoop,
  useScrollProgress, useSpringOrchestrator, useStaggerReveal,
  useOffsetPagination, useVirtualSectionWindow, useWindowedStore,
  useSortable, useScrollTracker, useSidebarFollow, useSidebarState,
  useTreeIndex, useTouchGate, useTimer, useInterval, useInfiniteScroll,
  plus the new useStoryDemo entry. Per R4 §4.3 — all 23 are publicly
  exported (no internal-only composables in the cohort).
- **3 token-tour foundation pages** — Surface Tints (9-rung tint scale +
  V.W3 tier aliases), Overlays & Scrims (three scrim weights + motion
  + lift offsets), Chart & Chassis Palette (chart aliases + chassis-tier
  opacities + specular tokens; resolves the pre-V `--viz-topology` /
  `--viz-recursion` non-existent token references).
- **Toast story tone migration** — retires raw `bg-emerald-*` /
  `bg-amber-*` / `bg-red-*` Tailwind ladders for the canonical
  `--success` / `--warning` / `--destructive` token plates.
- **Storybook smoke gate** — `tests/stories.smoke.spec.ts` asserts every
  manifest entry resolves to a valid component (no MissingStory
  placeholder), catching manifest-vs-file drift in the existing test
  suite.

### Test surface

- 24 test files / 311 tests pass (was 22 / 301 at v0.8.6 baseline).
- New: `useStoryDemo.spec.ts` (6 tests covering cleanup-on-reset,
  cleanup-on-unmount, state-resets-to-initial, sync-status-cycle,
  async-status-cycle, no-op-without-handler).
- New: `stories.smoke.spec.ts` (4 tests over the manifest).

### Migration notes

- Consumers of `<DialogOverlay>` / `<SheetOverlay>` / `<AlertDialogOverlay>`
  see no API changes — these primitives now compose the new
  `<ModalOverlay>` internally.
- `<LabeledInput|Select|Slider|Switch>` consumers see no API changes —
  the four wrappers now forward to the new `<LabeledField>` parent.
- Demo-side authors should compose the new `<StorySection>` and
  `<ShowcaseFrame>` primitives in new stories; existing stories will
  migrate progressively in a future cleanup pass.

## v0.8.6 — 2026-05-07

The U-tranche W1 cohort — fifteen load-bearing patches surfaced by the
14-agent W0 audit (cohorts A through C). Drives the speedtest progress
overflow fix, retires the last v0.7-vocab custom citizen, and lifts
several primitives onto the canon they advertise.

### Composable repairs

- **`useAnimatedNumber` — progress mode no longer overshoots backward
  through the rail.** Audit U.W0.A5 §1 isolated the smoking gun at line
  87: `clamp: false` for progress mode let `SmoothProgress.currentValue`
  hold a stale 100 across phase boundaries, then damp 100 → 0 when the
  consumer's target dropped to the next phase's first-tick value. The
  composable now keeps the underlying smoother in `[0, 1]` and scales
  at the consumer-facing boundary, so the smoother's internal clamp is
  the exact mirror of the `[0, 100]` external contract.
- **`useStagger` — `prefers-reduced-motion` short-circuit.** Per audit
  A5 §"library gaps", the timer cascade ran unconditionally. The
  composable now defaults to honouring `prefers-reduced-motion: reduce`
  with a synchronous flush of every reveal slot. Opt out via
  `respectReducedMotion: false`.

### Primitive repairs

- **`GlassPanel` — retired-tier migration (v0.7 → v0.8 5-rung ladder).**
  Audit C-b axis 4 #21. The last custom citizen still shipping
  `default | medium | elevated` migrates to
  `wash | quiet | resting | floating | overlay`. Default is now `resting`
  (matches the prior `default → glass-resting` resolution exactly).
  Scoped fallback CSS adopts canonical `--glass-bg-{wash,floating}` and
  `--glass-border-floating` handles instead of raw `color-mix(--card N%, ...)`.
- **Popover-class `shadow-md` retire (7 components).** Audit C-a §1 +
  §5.2 / U10. PopoverContent, SelectContent, ComboboxList,
  ContextMenu{,Sub}Content, DialogContent (`shadow-xl`), CommandDialog
  (`shadow-lg`) all double-stacked Tailwind shadow utilities atop
  `.glass-floating`, clobbering the canonical `--glass-shadow-floating`.
  The literal shadow drops; the canon paints.
- **`ContextMenu*Content` — drop opaque `bg-popover` over glass-floating.**
  Audit C-a §2.2 / §gap.10. The opaque `bg-popover` declaration negated
  the `glass-floating` translucent background.
- **Notification — status-color foreground tokens.** Audit C-a §1.4 /
  §7.2 / §gap.5 (and U11). The four-row variant map now consumes
  `text-{success,warning,info,destructive}-foreground` instead of
  baking `text-white` (which misread against the luminous amber plate
  particularly).
- **`Button.glass` — canonical `.glass-wash` composition.** Audit C-a
  §2.1. The variant re-implemented `.glass-wash` inline AND mixed tiers
  (bg-wash + border-quiet — self-contradictory). Compresses onto the
  canonical class.
- **`Sheet` — canonical `.sheet-animate` adoption.** Audit C-a §2.3 /
  §7. The `sheet-animate` utility was authored explicitly for Sheet
  but bypassed via raw `data-[state]:duration-300/-500`.
- **`Badge` — `success | warning | info` variants.** Audit B-b
  §"glass-ui gaps". The semantic-colour CVA branches now compose the
  canonical `--success / --warning / --info` plates with their
  `--*-foreground` glyph counterparts.
- **`DarkModeToggle` — focus-visible affordance.** Audit C-b axis 3
  #16. Composes `focus-ring` so keyboard navigation paints
  `--focus-ring-shadow` over the pill geometry.

### Foundation repairs

- **Typography ladder dedup — `--type-leading-*` / `--type-tracking-*`
  canonical.** Audit C-c §1.1 / Union 2 (and U13). `typography.css`
  declared duplicate `--leading-*` / `--tracking-*` tokens with the
  same numeric values as the canonical `--type-*` rungs. Retires the
  duplicates and migrates every in-file `@utility text-*` consumer to
  the `--type-*` form. theme.css continues to bridge the
  `--leading-*` / `--tracking-*` Tailwind utilities through the canon.
- **Cartoon-shadow dual-system collapse.** Audit C-c §1.3 / Union 1
  (and U14). The token-driven `--shadow-cartoon-{sm,md,lg}` rungs
  (auto-darking via `--shadow-color`) were silently shadowed at every
  consumer site by the `utilities.css` `.shadow-cartoon-*` class set
  reading raw `--shadow-cartoon-color{,-soft}` literals (pure
  black/white). The utility-class shadows now consume the token rungs;
  the bezel border + translateY stamp geometry stays.
- **`metric-badge` + `input-bar` adopt the canonical glass tier.**
  Audit C-c §7.2. Both utilities painted raw
  `color-mix(--card N%, transparent)` plates with hand-rolled
  `backdrop-filter` — bypassing the 5-tier ladder and silently
  no-op'ing the PRT / no-backdrop-filter fallbacks. metric-badge now
  composes `--glass-bg-quiet` (rest) → `--glass-bg-resting` (hover);
  input-bar composes `--glass-bg-floating` + `--glass-blur-floating`.
- **`--opacity-disabled` Tailwind bridge + sweep.** Audit C-a §1.2 /
  §gap.4 / U12. theme.css adds the `--opacity-disabled` (0.5) and
  `--opacity-icon-muted` (0.8) bridges so consumers compose
  `disabled:opacity-disabled` instead of literal `disabled:opacity-50`.
  The 11 ui/ + custom/ sites that hardcoded the literal — plus the
  Button base composing the arbitrary `disabled:opacity-[var(--opacity-disabled)]`
  form — sweep onto the canonical utility.

### Demo

- **`foundations/paper-glass.vue` — 5-tier completion + retired-vocab
  fix.** Audit C-d §4.2 / §1.1. Adds the missing `overlay` tier to the
  ladder enumeration; migrates the embedded `GlassPanelVariant` type
  to the v0.8 vocabulary; swaps the invalid `--viz-topology` /
  `--viz-recursion` accents for declared `--viz-{chebyshev,fourier}`.

### Verification

- `npm run typecheck` exit 0
- `npm run build` exit 0
- `npm test` 291/291 (was 288/288; +3 regression tests across
  `useAnimatedNumber` and `useStagger`)
- `dist/index.d.ts` re-exported with the v0.8.6 surface

## v0.8.5 — 2026-05-07

### Fix — backdrop-filter Lightning CSS dedup

The W2-W6 stacked surface ladder authored both unprefixed `backdrop-filter` and the legacy `-webkit-backdrop-filter` declaration on every glass-tier rule. Lightning CSS in the consumer's Tailwind v4 pipeline deduped the pair and kept the **prefixed** form only — modern Chromium then dropped that legacy alias from the CSSOM, leaving every `.glass-{wash,quiet,resting,floating,overlay}` rule **without** an applied `backdrop-filter` at runtime.

Live evidence captured at `https://speedtest.friday.institute/`:
- `.glass-resting` rule shipped with `-webkit-backdrop-filter: var(--glass-blur-resting)`
- `getComputedStyle(card).backdropFilter === "none"` and `.webkitBackdropFilter === "none"`
- The translucent fill survived (still consuming `--glass-bg-resting`); only the 12px blur was missing

Fix: drop the manual `-webkit-backdrop-filter` from every glass-tier rule in `src/styles/{glass,floating-panel,dock,hover-popover,instrument-chassis,dock-group,utilities}.css`. Single-source-of-truth authoring lets Lightning CSS / autoprefixer emit the legacy form when browserslist requires it.

The `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` feature-detection check at `glass.css:267` keeps both form names in its parenthesised support-query (a feature-name reference, not a declaration; safe).

Files swept:
- `src/styles/glass.css` (8 paired declarations across the 5-rung ladder + `.glass-card` + `.glass-cartoon`)
- `src/styles/floating-panel.css`
- `src/styles/dock.css`
- `src/styles/hover-popover.css`
- `src/styles/instrument-chassis.css`
- `src/styles/dock-group.css`
- `src/styles/utilities.css`


## v0.8.4 — 2026-05-07

Composable promotion — three patterns the speedtest consumer carried inline now land in the library so any consumer reaches them through one import. Tranche T audit F-architectural-gestalt §"Library gaps" wave W6.

### `useTokenColor`

- New composable at `src/composables/useTokenColor.ts`. Reads a CSS custom property as a reactive `Ref<string>` and re-resolves on dark-mode transitions via `useGlobalDark`. Replaces the ad-hoc `getComputedStyle(html).getPropertyValue("--xxx")` reads scattered across canvas + Aurora consumers (the `useMeterRenderer.ts:84-85` pattern).
- Accepts a `MaybeRefOrGetter<string>` token name (so consumers can swap `--accent-warm` ↔ `--accent-cool` reactively), an optional element-scoped resolve target, and a fallback for SSR / unset properties.
- The reactive seam lives at the cascade root: CSS custom properties don't fire change events on the platform, so the composable tracks `useGlobalDark`'s ref + exposes a `refresh()` knob for manual cascade mutations.

### `useStagger`

- New composable at `src/composables/useStagger.ts`. One-shot staggered reveal-flag array — `revealed.value[i]` flips true at `initialDelayMs + i * delayMs`. Replaces hand-rolled `setTimeout` cascades (the climax row-tint sweep at speedtest's `SpeedtestResults.vue:251-267` is the source pattern).
- Distinct from the existing `useStaggerReveal`: that one gates on IntersectionObserver thresholds for entrance choreography; this one fires on a pure timer for unconditional cascades. The two compose.
- Each timeout handle is tracked in a `Set<TimeoutHandle>`; both `reset()` and the `onScopeDispose` hook drain the set so no orphan callbacks fire after dispose.

### `useAnimatedNumberMap`

- New composable at `src/composables/motion/useAnimatedNumberMap.ts`. Wraps `useAnimatedNumber` per key into a single `Record<K, ComputedRef<number | null>>`. Replaces the static N-up fan-out where consumers declare four `useAnimatedNumber` instances side by side (the `MetricPillCluster.vue:125-134` pattern, post-W4 internalised inside `useMetricResult`).
- The library gap: `useAnimatedNumber` cannot run inside a `v-for` because the surrounding reactive scope is the wrong owner. The fan-out had to be static. This composable lifts that fan-out behind one call.
- Null propagation is preserved: when a source resolves to null, the corresponding ref returns null rather than freezing on the last smoothed sample.

### Storybook

- New "Composables" category in the demo manifest with three entries: `use-token-color`, `use-stagger`, `use-animated-number-map`. Each shows the composable's contract with a live interaction.

### Verification

- `npm run typecheck` exit 0
- `npm run build` exit 0
- `npm test` 288/288 (was 276/276; +12 new tests across the three composables)
- `dist/index.d.ts` carries `useTokenColor`, `useStagger`, `useAnimatedNumberMap` exports

## v0.8.3 — 2026-05-06

The library uplift the speedtest stacked-pill directive needs. Three additions land together: a container-query host knob on `<GlassDock>`, a 2-row refinement of `<MetricBadge labelPosition="stacked">`, and a new `<MetricPill>` primitive that bakes the stacked-pill defaults into a thin composition over MetricBadge. Tranche T audit B-dock-pill-cluster wave W2.

### `<GlassDock>` containerName prop

- New optional `containerName?: string`. When set, the dock root emits inline `container-type: inline-size; container-name: <value>; overflow: visible` plus a `data-container-name` structural marker.
- The base `overflow: hidden` shell gates on `:not([data-container-name])` so non-host docks keep the default clip — a backward-compatible extension. Consumers query the named container via `@container <value> (...)` rules without wrapping the dock in a sibling subject.
- Lifts the container subject onto the primitive (the audit-B §1.3 gestalt move). CSS Containment L3 §3.2: a container subject must be a peer or ancestor of the dock, never an interior descendant whose intrinsic size the dock relies on.

### `<MetricBadge labelPosition="stacked">` 2-row refinement

- Template wraps `<span class="metric-badge__amount">` + `<span class="metric-badge__unit">` in a single `<span class="metric-badge__row">` when stacked. Layout becomes 2 rows: row 1 label/abbreviation, row 2 amount + unit baseline-aligned via `display: inline-flex; align-items: baseline; gap: 0.25rem`.
- The pre-T 3-row layout (label / amount / unit on three separate rows) was the bug, not the contract — users reasonably expect the value+unit pair to read together as a single quantity. The inline branch keeps the flat sibling order so the single-row baseline reads unbroken.
- Two new tokens land in `tokens.css`: `--metric-badge-min-height-stacked: 2.625rem` and `--metric-badge-padding-block-stacked: 0.375rem`. The stacked variant consumes both so the taller register has breathing room above the baseline pair.
- Existing consumers are zero — the refinement is safe.

### New `<MetricPill>` primitive

- Lives at `src/components/ui/metric-pill/MetricPill.vue`. Composition-only over `<MetricBadge>` with `labelPosition="stacked"` + `density="spacious"` + `size="lg"` baked in. Same prop surface (label, abbreviation, amount, unit, color, size, density, placeholder, class), but stacked-pill defaults pre-applied.
- The `density` prop is the dock-tier knob lifted onto the pill: `spacious` (default) widens block padding for chassis-strip rhythm; `comfortable` keeps the tighter compact register where pills nest in a denser dock. The CSS modifier (`.metric-pill--density-{value}`) adjusts the local metric-badge padding tokens; the underlying badge stays unchanged.
- Storybook entry at `demo/stories/primitives/metric-pill.vue` shows the size ladder, density toggle, the GlassDock containerName-host cluster composition, and empty/placeholder rendering.

### Verification

- `npm run typecheck` exit 0
- `npm run build` exit 0
- `npm test` 276/276 (was 269/269; +7 new tests across the three additions)

## v0.8.2 — 2026-05-06

The v0.8.1 dev-pipeline pivot (`development` exports condition + `preserveSymlinks` retire on the speedtest consumer side) exposed glass-ui's source-level alias coupling: `src/` files import via `@utils` and `@/`, and the consumer's vite resolver doesn't know about glass-ui's per-package aliases. Workspace-source consumption requires the source to be self-contained.

### Internal alias sweep

- Every `import … from "@utils"` (~132 lines) and `import … from "@/X"` (3 sites) under `src/` rewritten to the corresponding relative path. Quote style and trailing punctuation preserved per file.
- `tests/` and `demo/` swept the same way (105 files) so the demo dev server and the vitest suite stop depending on alias substitution.
- `vite.library.ts` retires `libraryAliases()`; `vite.config.ts` and `vite.iter.config.ts` drop their `resolve.alias` blocks. `vitest.config.ts` drops its `@`/`@utils` aliases.
- `tsconfig.json` `paths` cleared of `@/*`, `@utils`, `@utils/*`.

Glass-ui source now compiles standalone for any consumer (workspace symlink under `development`, `node_modules` `dist` under `import`, future SSR runtime). The speedtest consumer's 210/210 client-test baseline is preserved through the workspace symlink without any speedtest-side resolver shim.

### Verification

- `grep -c '@utils\|from "@/' src/` → 0
- `npm run build` exit 0
- `npm test` 269/269 green
- speedtest `npm run test:run:client` 210/210 green

## v0.8.1 — 2026-05-06

Bundles the `862c1e7` MetricBadge dual-slot back-compat fix (adjacent-sibling selector that hides `--abbr` only when paired with `--full`) and corrects the v0.8.0 release-commit oversight: the `package.json` version bump 0.7.3 → 0.8.0 was lost between `git add` and `git commit` at v0.8.0's release commit `28b79b3`, so the workspace symlink continued resolving to v0.7.3 even though every artefact downstream claimed 0.8.0. v0.8.1 ships the bump as 0.7.3 → 0.8.1 (the v0.8.0 tag stays archival).

### Workspace dev-pipeline

- `exports.<subpath>.development = "./src/<entry>.ts"` added across all 33 object-shaped entries. Dev-mode consumers reading the workspace symlink resolve directly to source, so HMR and symbol changes surface without a manual `dist` rebuild. The `import` condition keeps pointing at the production-built `dist/<entry>.js`, so package-published consumers are unaffected.

### Bundled

- Every commit between `28b79b3` (v0.8.0) and the v0.8.1 release commit, including the `862c1e7` adjacent-sibling MetricBadge fix and the tranche-J library work that landed in the interim (`tranche-j/w0` through `tranche-j/w7`).

## v0.8.0 — 2026-05-06

The bundled glass-tier ladder rename + Card API redesign + dual-slot MetricBadge + canon retire. One breaking-change release per `feedback_architectural_approach.md`'s "no quick fixes, no parallel codepaths" edict; speedtest is the live consumer driving the lift.

### Breaking changes

- **Glass-tier ladder renamed** — the four-rung `subtle / default / medium / elevated` ladder retires in favour of the five-rung `wash / quiet / resting / floating / overlay` canon. `quiet` is a new mid-low rung; `overlay` is a new modal-over-modal rung. Mapping for upstream migrations:

  | Pre-v0.8 | Post-v0.8 | Note |
  |---|---|---|
  | `glass-subtle`   | `glass-wash`     | lightest |
  | `glass-default`  | `glass-resting`  | (no direct prior — `default` was the canonical tier) |
  | `glass-medium`   | `glass-resting`  | collision into the canonical tier |
  | `glass-elevated` | `glass-floating` | popover-class surfaces |
  | _(none)_         | `glass-overlay`  | NEW — modal-over-modal |

  Same renames apply to `--glass-{bg,blur,border,shadow}-{tier}` token families and to the Tailwind v4 `--{shadow,blur}-glass-{tier}` bridges in `theme.css`. **No legacy aliases ship.**

- **`<Card>` API redesigned**. The `variant="subtle | default | pane | cartoon"` enum retires. The new shape:

  ```ts
  interface CardProps {
    tier?: 'wash' | 'quiet' | 'resting' | 'floating' | 'overlay'  // default 'resting'
    shadow?: boolean       // default true
    grain?: boolean        // default true
    as?: string            // default 'div' — polymorphic root via reka-ui Primitive
    asChild?: boolean
    class?: HTMLAttributes['class']
  }
  ```

  Migration codemod for callers:

  ```vue
  <!-- v0.7 -->                                      <!-- v0.8 -->
  <Card variant="default">                          → <Card>
  <Card variant="medium">                           → <Card tier="resting">
  <Card variant="elevated">                         → <Card tier="floating">
  <Card variant="subtle">                           → <Card tier="wash">
  <Card variant="pane" class="overflow-hidden">    → <ScrollPane class="overflow-hidden">
  <Card variant="cartoon">                          → <CartoonCard>
  ```

- **`<ScrollPane>` and `<CartoonCard>` sibling primitives** ship at `src/components/ui/scroll-pane/` and `src/components/ui/cartoon-card/`. They lift the `pane` and `cartoon` register out of `Card`'s variant ladder. `<ScrollPane>` is `glass-wash` + `overflow:auto` + `scrollbar-hidden` + grain disabled. `<CartoonCard>` resolves through `.glass-cartoon`.

- **Library popover family migrated**. `TooltipContent`, `HoverCardContent`, `DropdownMenuContent`, `DropdownMenuSubContent`, `DialogContent`, `ContextMenuContent`, `ContextMenuSubContent`, `PopoverContent`, `SelectContent`, `SheetContent`, `GlassPanel` — every popover-class surface that hard-coded `glass-elevated` now hard-codes `glass-floating`. Consumer-side tier overrides fall through.

- **`Button` `glass-subtle` variant renamed to `glass-wash`**. Same surface, new name to align with the canon.

- **`--shadow-card` canon** routed to `var(--shadow-md)` (soft-Gaussian drop). The cartoon offset stamp lives only at `--shadow-cartoon` and is consumed by `.glass-cartoon` + `<CartoonCard>`.

### Additions

- **Dual-slot `<MetricBadge>`** — passing `label` AND `abbreviation` together renders both as sibling spans (`metric-badge__label--full` + `metric-badge__label--abbr`). Default visibility shows `--full`; the consumer toggles via container query (the speedtest consumer in S.W3 does this with `@container pill-cluster (max-width: 600px)`). Single-slot use stays back-compat.

- **`.metric-badge__label` letter-spacing canon**: 0.18em on md/lg/xl tiers, 0.10em on sm tier (was 0.05em / 0.025em).

- **`<DockTabButton>` density-keyed height tokens** — new `--dock-tab-h-{compact|comfortable|audacious}` token family analogous to `<DockIconButton>`'s height token. Compact value 32 px.

- **`--dock-label-size` mobile carve** — density-audacious mobile media-query introduces `--dock-label-size` (16 px at <480, 14 px at 480–719) consumed by dock label spans.

- **Storybook stories** — new `demo/stories/primitives/{card,scroll-pane,cartoon-card}.vue` walk the redesigned API; `demo/stories/primitives/metric-badge.vue` extended with a dual-slot example. Legacy `demo/stories/containers/card.vue` retired.

### Internal

- The reka-ui `Primitive` import lands on `<Card>`, `<ScrollPane>`, `<CartoonCard>` — polymorphic-root + slot-binding contracts come standard.
- `cn(tierClass, props.class)` is the single class-merge seam on `<Card>`. No JS-side ladder duplicating the CSS-side ladder.

### Migration impact

Speedtest (the live consumer) migrates in S.W4 (this same wave). One workspace package; one same-wave bump; no feature flag.
