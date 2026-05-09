# K.W3 Lane B — Demo vocabulary residue migration

**Wave**: K.W3
**Lane**: B — demo/ vocabulary residue
**Mode**: implementation
**Baseline**: HEAD `c5f196c` (post-W6 close)
**Closes against**: K.W3 hard gate (b), partial (c), and (e) per the W3 wave-spec REVISION 2026-05-08.

## Scope (per dispatch)

Lane B's bounds were reduced by the 2026-05-08 reconciliation: speedtest W2.T10 owns the StorySection sweep across `demo/stories/data/**` (the 13 raw `rounded-card border bg-card shadow-cartoon` triplets are EXCLUDED). Lane B handles four discrete residue classes:

1. 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` raw shadow assemblies → `.focus-ring` utility.
2. 2 demo `color-mix(in srgb, var(--foreground) N%, transparent)` bypasses → `--surface-tint-N` rungs.
3. 4 demo `transition-all` survivors (3 V-introduced composable stories + `motion/stagger.vue:59`) → named property list.
4. `demo/stories/navigation/carousel.vue` carousel-dots story canonicalization.

## Pre-migration `rg` sweeps

```
$ rg -n "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" demo/
demo/stories/foundations/shadows.vue:61:                            'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]'
demo/stories/primitives/combobox.vue:48:                            class="glass-wash focus-visible:shadow-[var(--focus-ring-shadow)] flex h-10 w-full items-center justify-between rounded-full px-3 py-2 text-sm outline-none"
demo/stories/foundations/intro.vue:69:                            'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]',
demo/layout/CategoryRail.vue:33:                class="mb-1 flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]"
demo/stories/navigation/dock-layers.vue:49:                                class="inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]"
```
5 hits.

```
$ rg -n "color-mix.*--foreground" demo/
demo/stories/aurora/NucleiOverlay.vue:68:                    'radial-gradient(ellipse, transparent 60%, color-mix(in srgb, var(--foreground) 22%, transparent) 85%, transparent 100%)',
demo/stories/foundations/paper-glass.vue:198:                    style="background-image: linear-gradient(90deg, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px); background-size: 34px 34px;"
```
2 hits.

```
$ rg -n "transition-all" demo/stories/composables/ demo/stories/motion/
demo/stories/motion/stagger.vue:59:                        'transition-all duration-normal ease-out',
demo/stories/composables/use-story-demo.vue:43:                            class="flex aspect-square items-center justify-center rounded-md border border-border bg-card transition-all duration-300"
demo/stories/composables/use-stagger.vue:45:                    class="flex aspect-square flex-col items-center justify-center rounded-panel border border-border bg-card transition-all duration-normal ease-out"
demo/stories/composables/use-stagger-reveal.vue:27:                                class="rounded-md border border-border bg-background p-6 transition-all duration-500"
```
4 hits.

## Step 1 — `.focus-ring` migrations (5 sites)

The canonical utility lives at `src/styles/utilities.css:80-85`:

```css
.focus-ring:focus-visible {
    outline: none;
    border-radius: var(--radius-pill);
    box-shadow: var(--focus-ring-shadow);
}
```

`.focus-ring` is intent-equivalent to `focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]`; it composes the same box-shadow recipe and outline reset behind `:focus-visible`. Confirmed: ≥ 25 src/ + demo/ sites already consume `.focus-ring` in mixed-radius contexts (`rounded-card`, `rounded-sm`, `rounded-button`, `rounded-pill`).

| File:line | Before | After |
|---|---|---|
| `demo/stories/foundations/shadows.vue:61` | `'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]'` (separate cn slot) | `focus-ring` folded into the leading slot `'glass-card focus-ring flex h-32 w-56 ...'` |
| `demo/stories/primitives/combobox.vue:48` | `class="glass-wash focus-visible:shadow-[var(--focus-ring-shadow)] flex h-10 w-full ... outline-none"` | `class="glass-wash focus-ring flex h-10 w-full ... outline-none"` |
| `demo/stories/foundations/intro.vue:69` | `'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]'` (separate cn slot) | `focus-ring` folded into leading slot `'group relative focus-ring flex flex-col ...'` |
| `demo/layout/CategoryRail.vue:33` | `class="mb-1 flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]"` | `class="focus-ring mb-1 flex h-10 w-10 items-center justify-center rounded-full"` |
| `demo/stories/navigation/dock-layers.vue:49` | `class="inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2 py-1 ... focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]"` | `class="focus-ring inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2 py-1 ..."` |

## Step 2 — `--surface-tint-N` migrations (2 sites)

`src/styles/tokens.css:189-197` defines the rung family `{4, 6, 8, 10, 12, 15, 18, 22, 25}`. Both demo bypasses target rungs already canonical — no residual rung-gap.

| File:line | Pre-rung | Post-rung | Rung mapping |
|---|---|---|---|
| `demo/stories/aurora/NucleiOverlay.vue:68` | `color-mix(in srgb, var(--foreground) 22%, transparent)` | `var(--surface-tint-22)` | exact match — `--surface-tint-22` |
| `demo/stories/foundations/paper-glass.vue:198` (2 occurrences in the same `style=`) | `color-mix(in srgb, var(--foreground) 8%, transparent)` ×2 | `var(--surface-tint-8)` ×2 | exact match — `--surface-tint-8` |

No residual P1 rung gaps emerged from these two sites.

## Step 3 — `transition-all` decompositions (4 sites)

All four sites animate exactly `transform` (translate-y) + `opacity` via the bound `:class` (translate-y-0/4/2 ↔ translate-y-0/0/0 + opacity-100/20/30/0 ↔ opacity-0/etc). The decomposition uses Tailwind's arbitrary-value `transition-[transform,opacity]` syntax — idiomatic for two named properties.

| File:line | Before | After |
|---|---|---|
| `demo/stories/motion/stagger.vue:59` | `'transition-all duration-normal ease-out'` | `'transition-[transform,opacity] duration-normal ease-out'` |
| `demo/stories/composables/use-stagger.vue:45` | `... bg-card transition-all duration-normal ease-out` | `... bg-card transition-[transform,opacity] duration-normal ease-out` |
| `demo/stories/composables/use-stagger-reveal.vue:27` | `... bg-background p-6 transition-all duration-500` | `... bg-background p-6 transition-[transform,opacity] duration-500` |
| `demo/stories/composables/use-story-demo.vue:43` | `... bg-card transition-all duration-300` | `... bg-card transition-[transform,opacity] duration-300` |

## Step 4 — Carousel-dots story canonicalization

**Decision**: NO-OP — the hand-rolled dot-strip described by the K-reconciliation 2026-05-08 audit (Gate (e), PARTIAL) is **already absent** from `demo/stories/navigation/carousel.vue` at HEAD `c5f196c`.

Verification:
- Section 1 (lines 56–72): consumes `<CarouselDots />` + `<CarouselPager />` only.
- Section 2 (lines 83–115): consumes `<CarouselDots class="absolute inset-x-0 -bottom-6 justify-center" />` + `<CarouselPager />` only.
- `rg "rounded-full|rounded-pill|h-2|h-1\.5|w-2|w-1\.5|bg-foreground" demo/stories/navigation/carousel.vue` — 0 hits (no inline dot geometry).
- `rg "dot" demo/stories/navigation/carousel.vue` — only documentation/code-comment references.

The K-reconciliation audit's PARTIAL disposition was based on the indirect evidence that `CarouselDots.vue:62` still carried a `transition-all` survivor (Lane A scope, not Lane B). The carousel.vue **story** is canonical: it consumes `<CarouselDots>` exclusively, with no hand-rolled duplicate. No edit required.

## Post-migration `rg` sweeps

```
$ rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" demo/
(0 hits)

$ rg "color-mix.*--foreground" demo/
(0 hits)

$ rg "transition-all" demo/stories/composables/ demo/stories/motion/
(0 hits)
```

All three Lane B sweeps return 0 hits. No documented residuals required.

## Typecheck

```
$ npm run typecheck

> @mkbabb/glass-ui@0.9.2 typecheck
> vue-tsc --noEmit
```

Green (no errors).

## Build

```
$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
...
[vite:dts] Declaration files built in 29578ms.
✓ built in 30.44s
```

Green.

## Files modified

- `demo/stories/foundations/shadows.vue` (focus-ring)
- `demo/stories/primitives/combobox.vue` (focus-ring)
- `demo/stories/foundations/intro.vue` (focus-ring)
- `demo/layout/CategoryRail.vue` (focus-ring)
- `demo/stories/navigation/dock-layers.vue` (focus-ring)
- `demo/stories/aurora/NucleiOverlay.vue` (--surface-tint-22)
- `demo/stories/foundations/paper-glass.vue` (--surface-tint-8 ×2)
- `demo/stories/motion/stagger.vue` (transition-[transform,opacity])
- `demo/stories/composables/use-stagger.vue` (transition-[transform,opacity])
- `demo/stories/composables/use-stagger-reveal.vue` (transition-[transform,opacity])
- `demo/stories/composables/use-story-demo.vue` (transition-[transform,opacity])

11 demo files touched (5 + 2 + 4 + carousel.vue NO-OP). No `src/` mutation; no `docs/` mutation other than this proof doc; no `demo/stories/data/**` touched (speedtest W2.T10 territory preserved).

## Hard gate satisfaction (Lane B portion)

- (b) `rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" demo/` returns 0 hits — **SATISFIED**.
- (c) demo `transition-all` survivors decomposed (4/4) — **SATISFIED for demo scope**; `CarouselDots.vue:62` (src/) is Lane A territory.
- (e) `npm run typecheck` + `npm run build` green — **SATISFIED**.
- demo `color-mix(--foreground) N%` migration: 2/2 sites migrated — **SATISFIED**.
- carousel-dots story canonical — **SATISFIED** (no-op; already canonical at HEAD).

Lane A's parallel deliverables (`src/` 19 surface-tint sites, `cssVar()` retire-or-wire, `.overlay-scrim` formal-delete, `CarouselDots.vue:62` transition-all, the proof doc `W3-A-src-vocab-residue-proof.md`) are out of scope for this lane.

## Git status

Read-only git use only per the K W0 hardened-agent-git clause. No `add`, `commit`, `stash`, `checkout`, `reset`, or `restore` invocations. Orchestrator owns the index for the W3 close commit.
