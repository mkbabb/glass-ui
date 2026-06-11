# AZ.W-MOTION2 — the curve gallery REDRESS (R7): thick strokes, vivid register, the rebuilt picker, the 1:1 keyframes isomorphism · DELTA

<!-- surface-paths: demo/stories/motion/curve-gallery.vue, demo/stories/motion/curve-families.ts, demo/stories/motion/BezierEditor.vue, demo/stories/manifest.ts -->
<!-- surface-hash: 6887adbbc3c713de576fe04f06f662883d0d2eacf8a4a1b8f07274e922a35c48 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the four surface-paths' bytes
     are byte-identical to capture time (sha256 of the "\n"-joined bytes, the
     surfaceHash convention exported by scripts/proof-live-verified-ledger.mjs).
     Stamped at the own-surface capture against the live demo on :5199 with the
     W-MOTION2 redress in place. -->

This wave is the REDRESS of the W-MOTION-SUITE all-families gallery the user found
(USER-AUDIT-2026-06-11-R7) still grey-on-grey, hairline-stroked, cramped-picker, and
NOT 1:1 to the keyframes easing inventory. The four R7 rows — register / stroke /
picker / isomorphism — closed at the surface + machine-witnessed (the data-table gate
the predecessor shipped witnessed the table, not the painted register; the new
`proof:motion2` NO-DEAD-TINT negative-predicate + the π STROKE-THICK / PICKER-NOT-
CRAMPED / SUBSTRATE-PRESENT readbacks are the durable kills the data-table gate could
not carry — the "canon-on-paper / muddy-in-render" gap closed).

## Before / after (own-surface, light + dark, 1440×1000 ≥1280px)

| | before | after (light) | after (dark) |
|---|---|---|---|
| headline | `ground/R7-curve-gallery-before.png` | `W-MOTION2-curve-gallery-after-light.png` | `W-MOTION2-curve-gallery-after-dark.png` |
| picker close-up | — | `W-MOTION2-picker-after-light.png` | `W-MOTION2-picker-after-dark.png` |
| bezier editor (Custom) | — | `W-MOTION2-bezier-editor-light.png` | `W-MOTION2-bezier-editor-dark.png` |

The before capture (`ground/R7-curve-gallery-before.png`) confirms every R7 read: a
grey pane (no substrate, flat grey cards), the cramped 11-pill picker row, hairline
violet strokes, the 5 springs misgrouped under "Standard", camel-cased rows. The
after pair is a confident vivid register — thick violet curves over a real 0/1 frame,
the underline panel-nav picker at the section rung, the calm grid substrate behind the
glass, and the 12-family canon 1:1 with keyframes.

## The π readback (the BINDING painted truth — `tests-visual/motion2.spec.ts`)

`getComputedStyle` + `boundingBox` readback off the live :5199 DOM, light + dark
(paired-π: `W-MOTION2-stroke-readback.json`), 11/11 π tests GREEN:

| axis | light | dark | verdict |
|---|---|---|---|
| plot stroke (painted) | 3px non-scaling | 3px non-scaling | **THICK** (R7 hairline was 1.75px, no non-scaling) |
| stroke color | `oklch(0.532 0.18 317.5)` | `oklch(0.739 0.134 318.1)` | the violet `--motion-accent`, one color event |
| `--motion-accent` hue | 317.4° | 318.3° | **violet** (290–350° band; not warm-red 20–40°) |
| family tab height | 44.6px | 44.6px | **at-scale** (R7 cramped pill was 26–28px; floor ≥36px) |
| substrate behind glass | grid wash painted | grid wash painted | **present** (R7 was bare `rgba(0,0,0,0)`) |

## The four R7 rows, closed

### R7-2 — THE STROKE (the curves read THICK)
The thumbnail plot is re-expressed in the keyframes stroke idiom: a unit-`0..1`
viewBox with `OVERSHOOT=0.32` band, the polyline `stroke-width="3"` +
`vector-effect="non-scaling-stroke"` (pinned device px regardless of the render box) +
`stroke-linecap="round"` + `stroke-linejoin="round"`. The vertical-flatness secondary
is fixed: the curve uses the FULL `0..1` range (no `PLOT_H-20` cramp), against a real
coordinate frame (the t-baseline + the unit-top + 0.25/0.5/0.75 gridlines in the
`--border` hairline — IDIOM-7). The driven dot stays `--motion-accent` at presence.

### R7-1 — THE REGISTER (vivid, not grey-on-grey)
Three root causes, three fixes:
- **D1 (the BUG):** every dead `--surface-tint-1/-2` read (the ladder STARTS at `-4`;
  `-1`/`-2` paint nothing → transparent) re-pointed to a DEFINED rung — the kind-pill
  `KIND_TINT` (spring/step → `-12` presence, bezier/analytic → `-8`), the dot-rail bg
  (`-8`), the doctrine header (`-10`), and the BezierEditor copy-hover (`-8`). NO dead
  read survives — machine-locked by `proof:motion2` NO-DEAD-TINT (negative-predicate).
- **D2 (grey-on-grey):** the `curve-gallery` manifest row now declares
  `background: "grid"` — a calm blueprint wash (NOT another GL context; the one-GL-per-
  route fence holds — springs already spends the constellation budget in the band). The
  glass POPs against the wash.
- **D3 (muted ink):** the load-bearing row metadata (`jsName`/`note`), the kind-pill
  text, and the doctrine easing cells lifted off `--muted-foreground` to `--foreground`
  / `--foreground/80`. The family blurb caption stays muted (genuine chrome).

### R7-3 — THE PICKER (the underline panel-nav register at scale)
`variant="pill"` → `variant="underline"` (the canonical `role="tablist"` panel-nav
register — picking a family swaps the visible curve set, exactly the mutually-exclusive
PANEL case). `:responsive="{ breakpoint: '768px', … }"` collapses the 12-way strip to a
`<Select>` below 768px. The tabs read at the section rung (`text-subheading` 20.4px/600
via a demo-scoped `:deep(.segmented-tab)` padding lift → 44.6px tall), the active family
name at the `text-subheading` heading rung with the blurb at body rung beneath — the
families are the PRIMARY IA (W-HIERARCHY three-register cascade), not a chip afterthought.

### R7-4 — THE ISOMORPHISM (1:1 to keyframes.js)
`curve-families.ts` now carries the dossier §1 canon in the keyframes-demo presentation
register. The census in `proof:motion2` reads the LIVE `keyframes.js/demo/easing/
easingGroups.ts` `EASING_GROUPS` authority (READ-ONLY) — 34 items, every one present in
the gallery, 1:1. The ADDS + MOVES + RENAMES:
- **ADD G1** — the 4 CSS Standard keyword rows (`ease`/`ease-in`/`ease-out`/
  `ease-in-out`) via `CSSCubicBezier(...bezierPresets["ease*"])` in the `Standard`
  family (the keyframes-canon Standard = `linear` + the 4 CSS keywords).
- **ADD G2** — `smooth-step-3`, the value.js Hermite `smoothStep3`, grouped under Cubic.
- **ADD G3** — the `linear()` multi-stop row (`Linear()` family), driven by the SHIPPED
  value.js `cssLinear` twin (the §3a scope-reveal: a direct shipped twin, NOT a
  hand-rolled piecewise sampler — `cssLinear` IS directly importable; no W-MOTION3
  deferral needed). The stops are a representative overshoot envelope — the form
  `springTimingFunction` emits + `getTimingFunction` re-parses.
- **MOVE G4** — the 5 springs OUT of `Standard` into a dedicated `Springs` family,
  DISPLAY-NAMED by feel (`smooth`/`snappy`/`bouncy`/`gentle`/`dock`) with the glass-ui
  token (`--spring-smooth`) in the `jsName` sublabel.
- **RENAME G6+G8** — every analytic row's `name` is the canon HYPHEN register
  (`ease-in-sine`/`ease-out-quad`/`ease-in-bounce`); the camel source (`easeInSine`)
  stays in `jsName`.
- **G7 disposition** — Steps keeps `steps(4, end)` + `step-start` + `step-end`; the
  live-parameterized `steppedEase(n, term)` generator (n + the 7 jump-terms) is the
  **W-MOTION3 named successor** (it exceeds a thumbnail row).

**Resulting taxonomy (the gate's `REQUIRED_FAMILIES`):** `Standard` · `Sine` · `Quad`
· `Cubic` (+`smooth-step-3`) · `Expo` · `Circ` · `Back` · `Bounce` · `Steps` ·
`Linear()` · `Springs` · `Custom`.

## The `--motion-ease-*` house-cores disposition (NOT a drop)
The glass-ui house Material cores (`--motion-ease-standard`/`-out`/`-in`) are the
LIBRARY's own motion tokens, distinct from the keyframes-canon CSS keywords. They are
NOT silently deleted — they fold into a named aside beneath the §6 easing-doctrine
legend (a `House Material cores` table), clearly distinguished from the keyframes-canon
Standard family (the §3.4 in-wave resolution, not a successor).

## Hard fences held
- `--motion-accent` (= `--viz-legendre` violet) stays DEMO-LOCAL (`demo/demo.css`);
  ppmycota does NOT appear in `src/styles/` (PURPLE-PRESERVED bite GREEN). The redress
  lifts muted→foreground for presence but adds NO second hue — the one-color-event rule
  holds (body ink untinted, the purple is the ONE event, the thick stroke in it IS the
  point).
- Tailwind-first: the thick-stroke + underline-picker + register redress is Tailwind
  utilities + the `--motion-accent` / `--surface-tint-*` / `--border` token vars + ONE
  demo-scoped `:deep` padding lift; no raw pasted keyframes CSS.
- PRM-gated: the `play`/`playAll` rAF + the dot travel honor `prefers-reduced-motion`
  (the dot snaps to its settled position, no motion frames).
- keyframes.js untouched (READ-ONLY isomorphism authority); `springPresets.ts`/
  `curves.ts` VALUES untouched (CONSUMED, not re-sourced).

## Gates
- `proof:motion2` (the device-free source arm) — 14/14 GREEN: stroke-thick,
  no-dead-tint, picker-underline, canon-css-keywords, canon-smooth-step-3,
  canon-springs-own-family, canon-hyphen-names, canon-linear-multistop,
  canon-keyframes-census (vs 34 live EASING_GROUPS items), muted-lifted,
  substrate-declared, purple-preserved, parity-preserved-motion-demo, pi-spec-exists.
- `tests-visual/motion2.spec.ts` (the π painted-truth arm) — 11/11 GREEN.
- `proof:motion-demo` (the W-MOTION-SUITE predecessor) stays GREEN — the redress
  refines, never regresses, the all-families buildout (PARITY-PRESERVED bite).
- `npm run typecheck` — clean (exit 0).
