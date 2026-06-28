<!-- DEFECT-LOCALIZATION-MAP — BG.W-PAINT-IS-THE-GATE.

  The human ledger that mirrors `scripts/proof-ba-gestalt.mjs`'s `DEFECT_LOCALIZATION`
  map. When the gate REDs a roster surface, the failing region + defect class are NAMED
  in the violation message (`D5-TOP-BAR @ top-bar`, `D2-METALLIC @ field`, …) so a RED
  reads "the FAILING REGION is <region>, the defect is <D#>" — not "the surface broke."
  The gate is the source of truth; this doc is the human-readable rationale. The two
  cannot drift: every key/region/note pair below is the gate's `DEFECT_LOCALIZATION`
  entry verbatim.
-->

# BG defect-localization map

The Stage-0 ground-freeze (`BG.W-PAINT-IS-THE-GATE`) extends `proof:ba-gestalt`'s pixel
decoder so a RED names the failing **region**, not just the surface. This map records
which expect-band predicate localizes which 4.2.0-line defect, and which wave wires its
fix. The defect IDs are the FINAL.md `D1-D14` set.

## The decoder primitives (in `scripts/reflect-capture-verify.mjs`)

- **`pngRegionStats(png, region) → {meanL, meanChroma, meanAlpha, meanA, meanB}`** — the
  per-region OKLab stats. `meanA`/`meanB` are the warm-amber hue axes (the prerequisite
  the ground-freeze adds: a chroma-MAGNITUDE-only read cannot tell a warm field from a
  cold-metallic one at equal chroma).
- **`regionStatsDelta(a, b) → {dL, dChroma, dE}`** — the PURE OKLab ΔE between two region
  stats (`dE = √(ΔL² + Δa² + Δb²)`). PURE so the gate self-test exercises it with no
  on-disk fixture.
- **`pngRegionDelta(png, regionA, regionB)`** — the on-disk wrapper (two `pngRegionStats`
  reads + `regionStatsDelta`), the SINGLE decoder. The gate feeds `dE` into the expect
  band as the `topDelta` axis.

## The probe schema extension

The roster `probe` cell declares the **FIELD** probe (`x=,y=,w=,h=`) — the glass plate /
aurora backdrop, declared **away from content** (so a high-chroma content rainbow is
never read against the field chroma-ceiling). It MAY declare a second **TOP-BAR** probe
(`tx=,ty=,tw=,th=`) — the D5 localization region. The `expect` cell carries the band:
`meanL=lo..hi;meanChroma>=floor;meanChroma<=ceiling;topDelta<=max`.

## The map

| Defect | Predicate (key + direction) | Region | What it catches | Fix wave |
|---|---|---|---|---|
| **D2-METALLIC** | `meanChroma <= <ceiling>` | field | The field over-saturates past the warm-aurora ceiling — the gray→metallic over-correction. The backdrop must read warm-translucent AURORA glass, not a metallic sheen. | WS1 `BG.W-FIELD-AURORA` + WS7 `BG.W-GATE-FIELD-AURORA` |
| **D2-COLD-HUE** | `meanA` / `meanB` band | field | The warm-amber a/b channel collapsed/inverted — a cold metallic/blue cast, not the warm-amber identity. The hue axis the meanA/meanB exposure unlocks. | WS1 `BG.W-FIELD-AURORA` |
| **D5-TOP-BAR** | `topDelta <= <max>` | top-bar | The top region reads as a distinct slab divergent from the field (the aberrant full-width top bar) — it must compose INTO the field, not stack as a separate band. Localized by `dE(top-bar, field)`. | WS1 `BG.W-SCROLL-PROGRESS-RAIL` + WS7 `BG.W-PAINT-IS-THE-GATE` (topDelta) |
| **D-GREY** | `meanChroma >= <floor>` | field | The field drops below the warm-chroma floor (the `oklab(0.695)` grey slab) — it reads neutral grey, not warm-cream glass. Grey separates from warm by CHROMA, not L. | WS3 chromatic-glass band |
| **D-LUMA** | `meanL = lo..hi` band | field | The field luminance is outside the mode's expect band (a too-dark void or a blown-out plate). The band spans BOTH modes (light cream + the W-DARK-MATERIAL luminous-dark plate). | per-band paint waves |

## How a RED reads

`evalBand` appends the localized tag to every failed predicate, so a violation message
carries it inline. Example (synthetic):

```
[G5-PIXEL] surface "aurora" capture-light reads meanChroma 0.301 not <= 0.18
  [D2-METALLIC @ field], topDelta 0.295 not <= 0.10 [D5-TOP-BAR @ top-bar]
  — OUTSIDE the warm-translucent expect band …
```

— the field is metallic AND the top bar is a divergent slab, each NAMED.

## The born-RED ground + the non-authoring fence

The gate is born-RED by construction: the BG roster + the 4.2.0 Metal ground-freeze
captures (every verdict FAIL, anchored to a real Metal reproduction the building agent
did NOT author) land via the **non-authoring capture agent** (real-paint-protocol §3).
The `<ceiling>`/`<max>`/`<floor>` **measured numbers** are the capture agent's — read off
the real 4.2.0 Metal field (the metallic chroma the ceiling sits just below; the top-bar
ΔE the max sits just below). This wave ships the MECHANISM (the topDelta axis, the
chroma-ceiling localization, the meanA/meanB hue axis, the defect-localization tags) +
the device-free self-test bites that prove each clause fires on synthetic metallic/
top-bar stats. A surface's row flips FAIL→PASS ONLY when a paint wave lands warm-cream
over a fresh source AND a non-authoring agent re-captures + pixel-reads inside the band.
