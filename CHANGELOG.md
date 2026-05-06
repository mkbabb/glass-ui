# Changelog

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
