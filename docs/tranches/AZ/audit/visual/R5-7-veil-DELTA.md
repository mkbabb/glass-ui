# AZ.R5-7 — the VEIL plate becomes a first-class Card surface (`surface="veil"`) · DELTA

<!-- surface-paths: src/styles/cards.css, src/styles/tokens/glass.css, src/components/ui/card/Card.vue, src/api/index.ts, scripts/proof-card-veil.mjs, docs/tranches/AZ/audit/R5-7-veil-consumers.json, demo/stories/display/card.vue, tests/components/ui/card/Card.test.ts -->
<!-- surface-hash: 99f938591d800febc9d26656f93050631f24683ac0c983d44c50e20eab12360b -->
<!-- AZ.W-GATES (D6) content-hash freshness: fresh IFF the eight surface-paths' bytes are
     byte-identical to capture time (sha256 of the "\n"-joined bytes, surfaceHash). Stamped
     at the own-surface capture against the current AZ-tree bytes — the veil section was shot
     on :5199 (demo truth surface) with the wave's source edits in place, via
     tests-visual/_veil-capture.spec.ts under the ANGLE backend. -->

The consumer-ratified VEIL plate (R5-7, three slides sites at birth) is promoted from a
deck-local recipe to a first-class Card decoration register: `surface="veil"`. It is the
text-legibility PLATE — the wash/quiet glass fill + blur with the BOXED look STRIPPED
(border + rim/highlight), conceptually the W55 adaptive-legibility tint applied as a LOCAL
plate over a busy/bright backdrop.

## Captured DELTA (demo truth surface — /display/card on :5199)

| file | dims | what it shows |
|---|---|---|
| `R5-7-veil-feather-off-1042x650.png` | 1042×650 (dpr 2) | the two veil plates over the Aurora field — hero (`tier=quiet`) + closer lede (`tier=wash`), borderless/rimless, the glass darkened toward ink so text clears AA, NO box |
| `R5-7-veil-feather-on-1042x650.png` | 1042×650 (dpr 2) | the same two plates with `--veil-feather` engaged — the radial mask dissolves the plate edges into the field (the soft-edged "bleed into the page" look) |

## Live computed-style readback (the borderless+rimless+fill truth, hero plate 672×213)

```
borderTopWidth : 0px            ← BORDERLESS (the dividing-line strip)
borderStyle    : none
boxShadow      : none           ← RIMLESS (the rim/highlight strip)
backdropFilter : blur(10px) saturate(1.05) brightness(1.02)   ← the quiet-tier blur on the --glass-level knob
background     : oklab(0.729 0.0011 0.0026 / 0.6)             ← the quiet rung's fill, DARKENED toward ink by the W55 self-engage (the local-legibility move)
maskImage      : none           ← feather OFF by default (clean rectangle)
maskImage (ON) : radial-gradient(100% 100% …)                 ← feather opt-in paints the radial edge fade
```

## The implementation (idiomatic, at the root)

- **The home** — `@utility veil-surface` in `src/styles/cards.css`, the `cartoon-surface`
  decoration sibling. It routes the glass MATERIAL through the `--glass-*` ladder (`--veil-bg`
  defaults to `color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source)
  var(--glass-tint-strength))`, `--veil-blur` to `var(--glass-blur-quiet)`), so the
  glass-cohesion model reads a SANCTIONED glass register (the `--glass-level` knob scales the
  blur; the W55 bright-bucket darkens the fill via the same inheriting tint axis the rung
  already reads — ZERO new compositing seam). On top of the rung it carries the THREE veil
  deltas, each a `--veil-*` knob: `--veil-border: none`, `--veil-shadow: none`, and the
  OPTIONAL `--veil-feather: none` (painted via `mask-image: var(--veil-feather)`).
- **The feather token** — `--veil-feather-radial` (a ready-made 70%→100% ellipse mask) minted
  in `src/styles/tokens/glass.css §glass`; a consumer points `--veil-feather` at it (or any
  `mask-image`) to opt into the edge fade. Default stays `none`.
- **The prop** — `CardSurface = "glass" | "cartoon" | "veil"` (Card.vue); the template routes
  `surface === 'veil' && 'veil-surface'` onto the resolved tier. The moving-specular is NOT
  armed on veil (it strips the rim by design). `api/index.ts` re-syncs (`CardSurface` is
  already re-exported — the union extension auto-propagates).

## Consumers (≥2 at birth — J-inv-10)

1. `demo/stories/display/card.vue` — two `<Card surface="veil">` sites over the shared Aurora
   field (hero plate + closer lede) + the `--veil-feather` toggle + the documenting prose.
2. `tests/components/ui/card/Card.test.ts` — veil-surface composition + tier-orthogonality +
   specular-not-armed asserts.

The slides trio (cover subtitle / standfirst / closer lede) re-points to `surface="veil"` on
the release bump (the no-backwards-compat clean break retires the deck-local recipe).

## Gate (born-RED via synthetic)

`scripts/proof-card-veil.mjs` (`proof:card-veil`): the SOURCE witness — veil-surface is
borderless + rimless + fill-present-on-the-ladder, the feather axis optional — plus the
≥2-consumer muster (mirrors `proof:card-cartoon-consumers`). The synthetic boxed fixture
(`self-proof/synthetic-boxed-fixture-flags`) demonstrates the bite every run. RED at HEAD
before the wave (empty `veilBody`, no Card wiring, no tally); GREEN 11/11 after.
