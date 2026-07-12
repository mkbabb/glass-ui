# BI.W-BADGE-ALIGN — the badge leading tracks the scaled font (GEO-8)

Band B1 (geometry grammar). The optical-centering refine.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-A6** — "Doesn't seem to be aligned properly" (ss-12; the "rose" badge glyph baseline sits low in the
  pill; optical centering off).
- **FAM-4** "Badge baseline (UF-A6)" (fold into the radius-grammar band) · **GEO-8** (alignment; badge sizes
  hardcode fixed px line-heights `leading-4/5/6` that don't track the `--ui-scale`-scaled font).

## §Design

Decided mechanism — GEO-8 disposition (ROUND-1). The badge `size` rungs pin a FIXED px line-height
(`leading-4/5/6`=16/20/24px) while the font-size tracks `--ui-scale` (`--control-text`=16.58px at rest,
~21.8px at coarse 1.5×) — so the glyph (14px `--ui-glyph-sm`) is smaller than the text, drifts at rest, and at
coarse scale the font overflows the fixed line-box entirely. No design loop; a decidable calibration.

- **Replace the fixed `leading-N` with a relative/scaled line-height** so the line-box tracks the scaled font.
  The cleanest form is `leading-none` + explicit symmetric padding (the box then reads the font's own cap
  metrics + a scaled pad), OR a relative `leading-[1.1]`-class that scales with the font — measured to the
  optical-center delta, not guessed.
- The glyph and text share ONE optical center at rest AND at `--ui-scale: 1.5` (coarse pointer).

## §Work

- `src/components/ui/badge/index.ts:56-58` — the `sm`/`md`/`lg` size rungs: drop `leading-4`/`leading-5`/
  `leading-6`; use a scaled/relative line-height (or `leading-none` + a scaled `py-*` that tracks the font) so
  the box tracks `--control-text-sm`/`--control-text`/`--type-body×--ui-scale`.
- `src/components/ui/badge/index.ts:18` — verify the base `items-center` + `[&_svg]:size-(--ui-glyph-sm)` glyph
  sizing centers against the re-based line-box (the glyph tracks the font, not a fixed box).

## §Acceptance

Gate: **`proof:badge-align`** (born-RED) — a device-free source assert: no fixed `leading-N` px on the badge
size rungs (the line-height reads a scaled/relative token) + a self-test bite (a planted `leading-5` flags).
Born-RED at HEAD: `leading-4/5/6` fixed px on the three rungs.

## §π/DELTA

`tests-visual/badge-align.spec.ts` — the binding baseline probe:
- glyph-center vs text-cap-center delta ≤ ~1px on a `.badge-atom` bearing an svg + text, per size rung, at
  rest AND at emulated coarse pointer (`--ui-scale: 1.5`) — the font no longer overflows the line-box;
- the "rose" badge (ss-12 surface) reads centered;
- Chromium + real WebKit, BOTH modes. LOCAL-only.

## §Obligations

- No cross-repo ask (a CVA class-string calibration; no API surface change).

## §Dispositions

- None chronic. Liveness probe: a fixed `leading-N` px re-introduced on a badge rung REDs.
