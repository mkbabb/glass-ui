# Changelog

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
