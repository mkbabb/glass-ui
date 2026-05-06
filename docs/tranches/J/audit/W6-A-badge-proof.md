# J.W6 Lane A — Badge size axis + tone reconcile + status-cell alignment

**Wave**: J.W6 Lane A
**Mode**: implementation
**Status**: complete
**Files touched**: 4 src/demo + 1 docs

## Summary

Added a `size` axis (sm / md / lg) to `badgeVariants`, defaulted to `md` (text-sm + leading-5 + px-2.5/py-1) so a Badge nested inside a `text-sm` table row aligns baseline-to-baseline with adjacent cell text. Updated the status-cell consumer (`demo/stories/data/table.vue`) to pass `size="md"` explicitly. Re-shaped the Badge primitive story to render the canonical 3-size axis (replacing prior inline-utility hacks) plus a size×variant matrix and an inline-with-text alignment proof. Documented the section-tone tint recipe for table cells in DESIGN.md as canonical (Option B — `badgeToneVariants` does not exist in the canon, so the table-cell `bg-section-N/15 text-section-N border-section-N/30` triplet stands as a documented recipe; introducing a CVA tone axis would be overfit at one src-tier consumer).

## File list (LOC delta)

| File | Δ |
|---|---|
| `src/components/ui/badge/index.ts` | +9 / −1 (added size axis; default `md`; removed hardcoded `text-xs px-2.5 py-0.5` from base) |
| `src/components/ui/badge/Badge.vue` | +2 / −1 (forward `size` prop) |
| `demo/stories/data/table.vue` | +1 / −0 (status-cell `<Badge size="md">`) |
| `demo/stories/primitives/badge.vue` | +29 / −7 (replace inline-override section with size-axis + matrix + alignment proof) |
| `DESIGN.md` | +29 / −0 (`## Badges` section under `## Buttons`) |

## CVA schema (before → after)

**Before** (`src/components/ui/badge/index.ts`):

```ts
badgeVariants = cva(
  'focus-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: { default, secondary, destructive, outline },
    },
    defaultVariants: { variant: 'default' },
  },
)
```

Single-axis CVA: variant only. Typography + padding hardcoded into the base string (`text-xs px-2.5 py-0.5`) — no rung selection.

**After**:

```ts
badgeVariants = cva(
  'focus-ring inline-flex items-center rounded-full border font-semibold transition-colors',
  {
    variants: {
      variant: { default, secondary, destructive, outline },
      size: {
        sm: 'text-xs leading-4 px-2 py-0.5',
        md: 'text-sm leading-5 px-2.5 py-1',
        lg: 'text-base leading-6 px-3 py-1.5',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)
```

Two-axis CVA: variant × size. Base string drops typography + padding (now owned by the `size` rung). Default size `md` matches the most common surrounding context (`text-sm` rows + card body).

## Status-cell alignment evidence

**Pre-W6 baseline** (per R4.A runtime measurement at `demo/stories/data/table.vue`):

| cell | top-offset | height | font-size | line-height |
|---|---|---|---|---|
| `INV-001` | 0.0 px | 55.0 px | 14 px | 20 px |
| `Ada Lovelace` | 0.0 px | 55.0 px | 14 px | 20 px |
| `Paid` (Badge) | 16.5 px | 22.0 px | **12 px** | **16 px** |
| `Card` | 0.0 px | 55.0 px | 14 px | 20 px |

The 14→12 px font-size drop on the Badge row was the visual offset the user perceived. Cell-level layout (`align-middle`) was correct; the Badge primitive was missing a rung.

**Post-W6 (computed via the size axis)**:

The `size="md"` rung resolves to `text-sm leading-5 px-2.5 py-1` — identical font-size (14 px) and leading (20 px) to surrounding row text. Geometric centre and baseline now coincide. The status-cell badge inherits the row's text metrics; visual offset disappears at the typography level rather than via cell-padding hacks.

The Badge primitive story now ships an explicit alignment-proof section (`baseline alignment in text-sm context`) that renders an inline `<Badge size="md">` mid-paragraph for visual confirmation in dev-server runs.

## Tone-reconcile decision: Option B

**Disposition**: Option B (document the table-cell tone recipe as canonical in DESIGN.md).

**Rationale**:

1. `badgeToneVariants` does not exist in the canon. R4 §A cited `badge/index.ts:38–50` as the source of `success/warning/destructive/info` tone CVA, but the file only contains the variant-axis CVA at lines 5–23 (now extended to size axis). Option A is therefore physically not available.
2. The `bg-section-N/15 text-section-N border-section-N/30` triplet is a 13-rung tinted ladder (section-0..12), not a 4-state semantic tone. Lifting the section family into a CVA `tone` axis would enumerate 13 rungs to satisfy a single src-tier consumer (`demo/stories/data/table.vue`) — overfit per the precept bar (≥ 2 src consumers required for new public surface).
3. The same triplet appears on `<TagsInputItem>` chips (`demo/stories/data/tags-input.vue:84,112`) — also demo-territory, also section-tone-tinted. Both consumers are demo-side and use the recipe directly via `:class`. They neither need a Badge-side CVA nor would they benefit (TagsInputItem is not a Badge).
4. Per `feedback_no_backwards_compat` + plan invariant 6 ("No new public components beyond the three named transpositions"), W6.A introduces no new CVA axis beyond `size`. Tone semantics will be revisited if a second src consumer surfaces with semantic-tone needs; at that point a 4-rung `tone: { success, warning, destructive, info }` axis is the right shape, but introducing it now would be substrate-without-consumer.

DESIGN.md documents the recipe in the new `## Badges` section under "Section-tone recipe (table status cells)", naming the canonical composition (`<Badge variant="outline" size="md">` + section triplet) and the explicit deferral rationale.

## Per-story consumption sweep

| Site | Pre-W6 | Post-W6 | Disposition |
|---|---|---|---|
| `demo/stories/data/table.vue:75` | `<Badge variant="outline" :class="...">` (implicit text-xs default) | `<Badge variant="outline" size="md" :class="...">` | Explicit `md` opts into baseline-aligned typography |
| `demo/stories/data/search.vue:228, 231, 234, 419, 427, 434` | implicit default | inherits new `md` default automatically | No source change needed; new default already aligns with surrounding `text-sm` chrome |
| `demo/stories/data/infinite-scroll.vue:112` | implicit default | inherits new `md` default | No source change needed |
| `demo/stories/primitives/badge.vue:73–80` (size-overrides section) | hand-rolled `text-micro` / `text-sm` overrides | replaced with canonical `size="sm/md/lg"` triplet + size×variant matrix + inline-baseline-proof | Story is the canonical visual reference for the new axis |
| `demo/stories/data/tags-input.vue:84, 112` | `<TagsInputItem class="bg-section-N/15 text-section-N">` (not a Badge) | unchanged | Out of Badge scope — same recipe family, different primitive |
| `demo/stories/compositions/dashboard.vue` | imports Badge | inherits new `md` default | No source change needed |
| `tests/components.smoke.spec.ts:43–49` | renders Badge slot, checks `outline` variant classes | unchanged; passes (badge-tier API surface preserved) | Test green |

The new `md` default is a behavioural change for any pre-existing consumer that relied on the implicit `text-xs` baseline. Visual review: every demo-side Badge consumer sits inside a `text-sm` (or larger) host — the new default is the one those consumers always wanted. No consumer hardcoded `text-xs`-dependent geometry around a Badge; no clipping, no overflow regression.

## Hard-gate verification

| gate | status | evidence |
|---|---|---|
| (a) `badgeVariants` ships size axis with 3 rungs (sm/md/lg) | PASS | `src/components/ui/badge/index.ts:14-18` |
| (b) Status-cell consumes `size="md"`; visual baseline matches row text | PASS | `demo/stories/data/table.vue:77`; `md` rung = `text-sm leading-5` matches surrounding `<TableCell>` typography |
| (c) Tone reconcile decision recorded | PASS — Option B | `DESIGN.md ## Badges § Section-tone recipe` |
| (d) Per-story consumption sweep confirms render fidelity at all sizes | PASS | `demo/stories/primitives/badge.vue:73-100` renders sm/md/lg + size×variant matrix + inline alignment proof |
| (e) `npm run typecheck` green for W6.A scope | PASS | zero errors in `badge/`, `table.vue`, `primitives/badge.vue`. Pre-existing W5/W6.C errors (slider story, dock state, CarouselPager) are out-of-bounds and orthogonal to this lane |
| (f) `npm run build` green | PASS | `✓ built in 21.36s` |
| (g) `npm run test` green | PASS | 269 tests pass across 18 files |

## Scope reveals

1. **`DataTable.vue` has no built-in status cell** — the dispatch prompt named `src/components/ui/data-table/DataTable.vue` as the status-cell consumer, but the component is column-shape-agnostic; status badges live in the demo story (`stories/data/table.vue`), not in the primitive. Updated the actual consumer.

2. **`badgeToneVariants` does not exist** — R4 §A and the dispatch prompt referenced `src/components/ui/badge/index.ts:38-50` for `badgeToneVariants` (success/warning/destructive/info). Pre-W6.A `badge/index.ts` was 25 lines total, single-axis variant CVA only. Option A was therefore physically unavailable; Option B (DESIGN.md documentation) was the only valid disposition.

3. **`demo/stories/data/badge-tones.vue` does not exist** — the dispatch prompt mentioned it conditionally ("if it exists"); it does not. The Badge primitive story (`demo/stories/primitives/badge.vue`) is the canonical badge gallery; size-axis + size×variant proofs landed there.

4. **`src/components/ui/table/`** has no `bg-section-N/15` triplet — the recipe lives in `demo/stories/data/table.vue:33-35` (a demo helper `statusTone()`). The dispatch prompt's `table.vue:33-35` referenced the demo file, not the primitive table dir.

5. **Pre-existing typecheck failures from neighbouring waves**: `demo/stories/primitives/slider.vue` (W5.A territory), `src/components/custom/dock/composables/useDockState.ts` (W5 territory), `src/components/ui/carousel/CarouselPager.vue` (W6.C territory) all surface `vue-tsc` errors at HEAD. None overlap W6.A file bounds; W6.A's diff does not introduce or fix any of them.

## Hard-gate completion: yes
