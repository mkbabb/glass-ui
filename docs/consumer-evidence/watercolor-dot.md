# WatercolorDot

## Artefact path

`src/components/custom/watercolor-dot/` (the published subpath `@mkbabb/glass-ui/watercolor-dot`).

## Verdict

`keep-current` — **booked DEMO-ONLY** (a showcase primitive retained with this rationale, the
overfitting-audit `keep-current` path), mirroring the `goo-blob` booking, with a named ≥2-consumer
trigger. `WatercolorDot` is the CSS/SVG-blob companion to the WebGL `GooBlob`: an internalized
per-instance filter + seeded PRNG (the shared `src/utils/prng.ts` leaf), the zero-GL ambient/static
register of the blob substrate.

## Consumer proof (re-runnable)

**External consumers — 0.** WatercolorDot has the same demo-only profile as its WebGL sibling — no
sibling repo composes it:

```bash
# value.js — color/value/math lib, no decorative blob:
grep -rln 'WatercolorDot|watercolor-dot' ~/Programming/value.js/src   # → NONE
# speedtest — meter/aurora identity, no watercolor blob:
grep -rln 'WatercolorDot|watercolor-dot' ~/Programming/speedtest/src  # → NONE
# slides — constellation/fourier-field/aurora identity, no watercolor blob:
grep -rln 'WatercolorDot|watercolor-dot' ~/Programming/slides/src     # → NONE
# sci-report — no watercolor blob:
grep -rln 'WatercolorDot|watercolor-dot' ~/Programming/sci-report/src # → NONE
```

**Internal consumers — 1 demo (the showcase story, NOT its own `<pkg>.vue` route).** WatercolorDot
is composed INSIDE the blob substrate story as the zero-GL ambient/static companion to the WebGL
goo-blob (the two share ONE stage; ambient/decorative thumbnails route to WatercolorDot, the
interactive/lit hero to GooBlob):

```bash
grep -rn '<WatercolorDot' demo/   # → demo/stories/substrates/blob.vue:215 (static register)
#                                      demo/stories/substrates/blob.vue:326 (ambient thumbnail)
```

The blob story is a live, user-iterated showcase (the W-BLOB-REBUILD lane); WatercolorDot is its
CSS/SVG companion register, sharing the `prng.ts` leaf with goo-blob.

## The named ≥2-consumer TRIGGER (ship when the second consumer arrives, not before)

The same trigger as `goo-blob`: if a FUTURE tranche lands a real consumer of the blob substrate — a
value.js repatriation that ships, a speedtest hero, or a slides slide — WatercolorDot is the zero-GL
companion that ships alongside it. Re-grade to a real ≥2-consumer KEEP at THAT point; this is the
demo-only book until then, not a speculative export.

## Re-audit proof

This document satisfies the overfitting-audit / `proof:component-orphan` `keep-current` verdict for
`WatercolorDot` while the external-consumer greps stay empty AND the demo mount stays present. The
gate accepts `watercolor-dot` on THIS evidence doc (a demo-only book with a named trigger, mirroring
`goo-blob`), NOT a false `keep`. If the demo mount is removed with no external consumer, the verdict
returns to `library-orphan` (formally retire the subpath + export).

## Cross-references

- `docs/consumer-evidence/goo-blob.md` (the WebGL sibling's identical demo-only booking).
- `src/utils/prng.ts` (the shared `mulberry32` + `hashString` leaf both blobs import).
- `demo/stories/substrates/blob.vue` (the showcase story — WatercolorDot is the zero-GL register).
