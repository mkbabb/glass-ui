# Changelog

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
