# W-PAGER — DELTA (the unified pager-dots register in a glass ring)

The captured own-surface truth (BA gestalt bar, inv-4): the source gate
`proof:pager-ring` proves the structure; THIS DELTA records the painted RENDER on
the live `/navigation/carousel` route, BOTH modes — the binding truth.

## Freshness headers

- **surface-paths**:
  - `src/components/custom/pager-dots/PagerDots.vue` (the dots primitive + scoped CSS)
  - `src/components/custom/pager-dots/index.ts` · `README.md`
  - `src/styles/glass/surfaces.css` (the `.glass-pager-ring` recipe)
  - `src/components/ui/carousel/CarouselPager.vue` (the counter re-register)
  - `src/components/ui/carousel/CarouselDots.vue` (DELETED — retired onto PagerDots)
  - `src/components/ui/carousel/index.ts` · `src/carousel.ts` · `src/index.ts` (barrel re-cut)
  - `src/subpaths/pager-dots.ts` · `src/api/index.ts` (subpath + types)
  - `demo/stories/navigation/carousel.vue` (the canonical chassis composition)
- **surface-hash** (the impacted SOURCE files; recompute on drift):

```
SOURCE-HASH (sha256, head 12)
PagerDots.vue            f1d… (see `git hash-object` at HEAD on adopt)
surfaces.css (.glass-pager-ring block)   the BA.W-PAGER recipe
CarouselPager.vue (counter)              .glass-pager-ring text-mono-caption tabular-nums
```

(The frozen hashes are recomputed by the orchestrator at integration — the agent
git clause forbids staging; the DELTA records the surface set + the live readback,
which is the binding evidence.)

## Before → after (the R10-1 + R10-3 fold)

| axis | HEAD (before) | W-PAGER (after) |
|---|---|---|
| the DOTS row | bare `CarouselDots` flex row — bg/border/shadow/radius all none/0 (live: `rgba(0,0,0,0)`) | `<PagerDots>` in `.glass-pager-ring` — a translucent glass-floating pill |
| the COUNTER ring | opaque `rounded-pill border border-border bg-card` — DARK = `rgb(28,25,23)` near-black slab | `.glass-pager-ring` — the SAME glass pill the dots read (off bg-card) |
| the register | TWO implementations (CarouselDots + the slides DeckPager) | ONE `<PagerDots>` primitive + ONE `.glass-pager-ring` recipe |
| the subpath | none | `@mkbabb/glass-ui/pager-dots` |

## π readback — the painted RENDER (live `/navigation/carousel`, getComputedStyle)

| readback | LIGHT | DARK |
|---|---|---|
| dots host bg | `color(srgb 0.9844 0.97288 0.9556 / 0.8)` (α 0.80 — translucent) | `oklab(0.281 0.004 0.006 / 0.880)` (α 0.88 — translucent, NOT the opaque slab) |
| dots host backdrop-filter | `blur(13px) saturate(1.18)` | `blur(13px) saturate(1.28) brightness(1.1)` |
| dots host radius | `9999px` (pill) | `9999px` (pill) |
| counter bg | `color(srgb 0.9844 0.97288 0.9556 / 0.8)` | `oklab(0.281 0.004 0.006 / 0.880)` |
| counter text | `rgb(28,25,23)` warm-ink | `rgb(232,231,227)` light-ink |
| **dots bg === counter bg** | **YES (one register)** | **YES (one register)** |
| active dot ::before width | `24px` (elongated pip) | `24px` (elongated pip) |

The dark counter bg α=0.88 is the proof the `rgb(28,25,23)` opaque slab is dead — it
reads the substrate through the glass-floating plate. The dots host and the counter
resolve the IDENTICAL background in both modes: the ONE `.glass-pager-ring` recipe,
two consumers (the R10-1 "encapsulated in a ring like the other").

## π verdict (tests-visual/pager-ring.spec.ts) — 9/9 PASS

- (a) dots ringed: translucent (0.05 < α < 0.95) + backdrop-filter non-none + pill radius — BOTH modes × 2 viewports.
- (b) counter off bg-card: translucent (α < 0.95) — BOTH modes.
- (c) one register: counter bg === dots host bg.
- (d) counter text clears the legibility floor (≥ 3:1 over the translucent plate) — the ring-material-failure trigger NOT fired.
- DELTA capture: `W-PAGER-ring-light.png` + `W-PAGER-ring-dark.png` (this dir).

## Gate

`proof:pager-ring` — GREEN (born-RED: 10 violations on the pre-wave tree). W1 ring
recipe (floating-bg/blur/pill) + dist render (`var(--glass-bg-floating)`) · W2 counter
off bg-card · W3 one register (CarouselDots gone, PagerDots exists, 2 ring consumers,
`--pager-dot-*` tokens, the anti-evasion no-survivor scan) · W4 subpath + api row +
adopt-book + MIGRATION rows.

`proof:carousel-glass-atoms` (AX.W23, RE-POINTED to PagerDots/.pager-dot) — GREEN: the
dot-paint contrast survived the rename (inactive 52% = 4.788 dark / 3.525 light, ≥3:1
both; real `.pager-dot[data-active]::before` width morph emitted).

## The ≥2-consumer bar (met by construction)

Consumer #1: the carousel (`<PagerDots>` in `carousel.vue`, both sections). Consumer
#2: the slides DeckPager (adopts at the BA cut — `docs/tranches/BA/audit/W-PAGER-adopt-book.md`
names the path: `--pager-dot-active: var(--ncsu-red)` preset + `windowFit` from
`--deck-pager-fit` + `ring="false"` flush-on-dock; the slides edit is the slides
session's, inv-10).
