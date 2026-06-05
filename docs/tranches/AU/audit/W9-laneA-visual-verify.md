# AU.W9.A — A-2 paired-π visual verify (ConfiguratorLayer / ConfiguratorRow titles)

A-2 lifts the hard-coded `text-sm` pane/row titles onto the semantic typography
ladder. The chosen rung is **`text-small`** (`src/styles/typography.css:328`) —
the ladder rung whose `font-size` (`--type-small: 0.875rem` = 14px) is byte-
identical to the prior raw `text-sm`, so the restyle is a **ladder re-anchor with
no size jump**. The emphatic weight stays as the orthogonal Tailwind weight
utility (`font-semibold` on the layer label, `font-medium` on the row label —
matching the base `Label.vue:32` `text-small font-medium` register).

`text-subheading` (20.4px) was rejected: it would balloon the compact pane header
two ladder rungs; the dock-label precedent likewise keeps the compact register.
`text-small` is the established compact-label rung already consumed by
`Label.vue`, `ResponsiveTabs.vue`, and `MetricBadge.vue`.

## Evidence form: getComputedStyle readings (prose, fallback per spec)

The size axis is invariant; the only computed deltas are line-height (negligible)
and an explicit (vs inherited) `font-family` binding. Both labels previously
inherited `--font-serif` from `body`, so the family value is unchanged in paint —
the binding is now explicit on the element.

### ConfiguratorLayer label `<span>` (`ConfiguratorLayer.vue`)

| axis | BEFORE `text-sm font-semibold text-foreground` | AFTER `text-small font-semibold text-foreground` | delta |
|---|---|---|---|
| font-size | 0.875rem (14px) | `var(--type-small)` = 0.875rem (14px) | none |
| line-height | `text-sm` pairs `1.25rem` (≈1.4286, 20px) | `var(--type-leading-small)` = 1.4 (19.6px) | −0.4px |
| font-weight | 600 | 600 | none |
| font-family | inherited `var(--font-serif)` | explicit `var(--font-serif)` | none (paint) |
| color | `var(--foreground)` | `var(--foreground)` | none |

### ConfiguratorRow `<Label>` (`ConfiguratorRow.vue`)

| axis | BEFORE `text-sm font-medium text-foreground` | AFTER `text-small font-medium text-foreground` | delta |
|---|---|---|---|
| font-size | 0.875rem (14px) | `var(--type-small)` = 0.875rem (14px) | none |
| line-height | ≈20px | 1.4 (19.6px) | −0.4px |
| font-weight | 500 | 500 | none |
| font-family | inherited `var(--font-serif)` | explicit `var(--font-serif)` | none (paint) |

### `sub` / `name` token reference — UNCHANGED

`<span v-if="sub">` (layer) and `<span v-if="name">` (row) keep
`truncate text-micro font-mono text-muted-foreground/70` — already a ladder rung
(`text-micro` `--type-micro: 0.6875rem` = 11px). No edit; per spec.

## Net visual effect

Pane and row titles are pixel-stable (14px); the −0.4px line-height nudge is sub-
perceptual at a single-line label. The win is structural: every pane title now
reads off the `--type-small` ladder token, so a consumer retuning the ladder rung
restyles all configurator titles in lockstep — no per-consumer `text-sm` override.

## A-1 divider opt-in (no visual change unless `dividers` set)

`dividers?: boolean` (default `false`) renders an inter-row hairline via the
conditional Tailwind arm `[&>*+*]:border-t [&>*+*]:border-border/30 [&>*+*]:pt-2`
on `.configurator-layer-body`. Zero new CSS rung minted (the budget precondition
dissolves — see PROGRESS / Return). Default mounts are byte-identical (gap-only).
