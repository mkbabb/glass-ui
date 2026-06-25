# handmark — the hand-voice mark family

`@mkbabb/glass-ui/handmark` — the platform's ONE hand voice. `HandMark` (alias
`InkMark`) lays a hand-drawn mark — an underline, a circle around a datum, a strike,
a highlight band, a box, a bracket, or an arbitrary path — in any medium (pen
default · pencil · crayon · marker · highlighter · ring · boil), any CSS color,
deterministic per `seed`, optionally animated. The slotted word stays REAL selectable
text; the mark is an `aria-hidden` SVG overlay.

```vue
<HandMark>who pays in</HandMark>                          <!-- pen underline -->
<HandMark brush="boil" shape="underline">the future</HandMark>  <!-- natural morphology -->
<HandMark brush="highlighter" shape="highlight">emphasis</HandMark>
<HandMark brush="crayon" shape="circle" :box="{ x:30, y:12, w:40, h:16 }" />
<HandMark shape="underline" animation="draw-on">draws itself</HandMark>
```

## The four-layer hybrid (SPEC §1)

| Layer | Home | Role |
|---|---|---|
| L1 GEOMETRY | `@mkbabb/pencil-boil` (optional peer) | wobble + `ellipsePoints` ring |
| L2 BODY | `ink.ts` — `ribbon:'stroke'` (pen/pencil/ring clean) \| `'hull'` (vendored pf — boil/crayon/marker/highlighter, the curvature-coupled variable-width body) | the stroke/fill body |
| L3 GRAIN | `texture.ts` — feTurbulence graph, STATIC + SEEDED (rasters once) | the paper-tooth/wax grain |
| L4 ANIMATION | `composables/useHandMark.ts` — draw-on (dashoffset \| clip-path wipe) + boil | the reveal/living-line clock |
| L5 SURFACE | `HandMark.vue` — anchor/measure, mount the namespaced filter, a11y | the SFC |

## The colocation layout (AY.W-COLOCATE)

```
handmark/
├── HandMark.vue          # L5 SFC
├── brush.ts              # the flat Brush data model (the keystone; SPEC §2)
├── geometry.ts           # semantic shape → centerlines (L1; the natural morphology)
├── ink.ts                # the brush stage: centerline + Brush → SVG fragment (L2)
├── texture.ts            # the L3 grain filter
├── freehand.ts           # the VENDORED perfect-freehand geometry core (MIT)
├── constants.ts          # the marking-space geometry constants (the home)
├── types.ts              # the public prop surface (SPEC §6)
├── composables/
│   └── useHandMark.ts    # the headless reactive core (L2/L3/L4)
├── index.ts              # the ./handmark barrel
└── README.md
```

## The three-underline-register fence (BA.W-HANDMARK §0.6 — load-bearing)

Three distinct underline/ink registers exist; they are NOT the same family and the
fence is binding in BOTH directions:

1. **`.paper-ink-mark`** (W-SURFACE-AXIS mints, W-TABS consumes) — the STRAIGHT
   structural 2px `--foreground` ink hairline: the tab underline indicator + the
   math-paper section rail. NEVER wobbled, NOT this family.
2. **`HandMark shape="underline"`** (this family) — the hand-voice wobble. The
   editorial draw-on underline + the masthead procedural `boil` morphology.

ONE pencil-boil engine under every wobble; ZERO wobble under the structural mark.
`GlassUnderline`/the `/underline` subpath RETIRED onto `HandMark shape="underline"`
(DEC-8 outcome 1; clean break, no alias).

## Seed discipline (the AV.W14 single-source)

The family seeds via the HOUSE prng leaf (`src/utils/prng.ts` — `mulberry32` +
`hashString`) and FEEDS pencil-boil a house-derived integer seed. glass-ui code
imports ZERO `mulberry32` from pencil-boil; its internal `mulberry32` stays inside
its OWN perturb math. ONE seed leaf, the house identity.

## Optional peers

- `@mkbabb/pencil-boil ^0.4.1` — the L1 wobble geometry (the `ellipsePoints` ring +
  the per-pass perturb + the default underline wobble). The `boil` voice is the HOUSE
  φ-incommensurate value-noise morphology (`geometry.ts`), not a pencil-boil line.
- `perfect-freehand` — VENDORED into `freehand.ts` (MIT, tldraw). The `ribbon:'hull'`
  variable-width body (boil/crayon/marker/highlighter) is the consumer; the clean
  `ribbon:'stroke'` voices (pen/pencil/ring) treeshake it away.
