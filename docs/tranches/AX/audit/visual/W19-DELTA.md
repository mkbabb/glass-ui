# AX.W19 — primitive prune A (header-ribbon/glyph-face/disco-glyph) · retire-DELTA

**Retire-DELTA exemption.** W19 is a primitive-RETIRE wave — its owed artefact is
a DELETION-PROOF (the orphan primitives gone from the public surface + the dist
chunks no longer emit), NOT a painting-surface π. A retired primitive has no
pixel; the proof is its ABSENCE. Recorded here as the exemption in the DELTA
header (per AY.W-DELTA0 §3 / `proof-live-verified-ledger`'s retire-DELTA clause).

## Deletion-proof captures (the public surface AFTER the prune)

The retire-DELTA's pixel is the ABSENCE — the demo navigation surface no longer
serves a header-ribbon route (the public surface after the W19 prune):

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W19-deletion-proof-desktop-light.png` | `W19-deletion-proof-desktop-dark.png` |

(The header-ribbon root-retire's own-surface page captures are W-SB1's —
`docs/tranches/AY/audit/visual/W-SB1-intro-frontdoor-*.png` + the G3 deletion-proof.)

## The deletion-proof (public-surface absence + build-diff)

The three W19 primitives are GONE from the public surface (verified at HEAD,
2026-06-10):

| primitive | dir under `src/` | `package.json` exports | `src/api/index.ts` | `src/index.ts` | dist chunk |
|-----------|------------------|------------------------|--------------------|-----------------|------------|
| `glyph-face` | absent | absent | absent | absent | none emits |
| `disco-glyph` | absent | absent | absent | absent | none emits |
| `header-ribbon` | absent | absent (0 hits) | absent (0 hits) | absent (0 hits) | none emits |

- `grep -rc "GlyphFace\|DiscoGlyph\|glyph-face\|disco-glyph" src/` → 0 (excised at AX.W19).
- `grep -c "header-ribbon" package.json` → 0; `grep -c "HeaderRibbon" src/api/index.ts` → 0;
  `src/subpaths/header-ribbon.ts` absent; `src/index.ts` 0 hits.
- `ls dist/ | grep -iE "header-ribbon|glyph|disco"` → none (no chunk emits for the
  retired families — the build-diff proof).

## Named-successor routing (the live retirement truth)

`header-ribbon` was the one W19 primitive whose retirement landed at the ROOT
under **AY.W-SB1** (its G3 component-deep retire — `header-ribbon` failed the
≥2-consumer bar: 0 src + 0 external consumers, only its own demo story). The
deletion-proof for the header-ribbon retire is `W-SB1`'s own-surface DELTA
(`docs/tranches/AY/audit/visual/W-SB1-DELTA.md`, G3 — live-verified PASS, the dir +
`/header-ribbon` subpath + `package.json` exports + `src/api` types all removed,
`proof:component-orphan` born-RED→GREEN). `glyph-face`/`disco-glyph` were excised
at AX.W19 directly. This DELTA flips the W19 PROGRESS row to `live-verified`
against the combined deletion-proof above + W-SB1's G3 artefact.

## Verdict

**PASS (retire).** Every W19 primitive is absent from the public surface and the
dist; no chunk emits for the retired families. The retirement is the proof — there
is no pixel to paint. Routed to W-SB1's deletion-proof DELTA for the header-ribbon
root-retire.
