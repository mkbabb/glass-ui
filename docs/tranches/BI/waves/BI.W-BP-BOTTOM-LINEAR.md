# BI.W-BP-BOTTOM-LINEAR — BorderProgress bottom-edge reads a linear fill (GEO-4)

Band B1 (geometry grammar). The dual-path fix: the bottom-edge register inherits the base conic paint its own
sibling was fixed off.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-J4** — "this progress bar looks awful" (ss-22; the BorderProgress bottom-edge demo on /data reads as a
  full-width thin hollow outlined rounded rect — the fill does not progress along the edge).
- **FAM-4** "BorderProgress bottom-edge hollow rect (UF-J4)" · **GEO-4** (dual-path; the bottom-edge keeps the
  perimeter conic while the sibling inline-end-edge was fixed to a linear paint).

## §Design

Decided mechanism — GEO-4 disposition (ROUND-1). The `[data-coverage="bottom-edge"]` rule overrides ONLY the
mask (`border-progress.css:81-92`), inheriting the base CONIC `background` (`:49-56`) — so the bottom band's
fill maps nonlinearly through the corner angles and reads as a hollow outlined rect. The sibling
`[data-coverage="inline-end-edge"]` (`:102-108`) ALREADY swaps `background` to a LINEAR gradient with the exact
in-file rationale ("a conic maps a single edge nonlinearly through the corner angles"). The identical reasoning
binds the bottom edge. No design loop; a decidable one-line paint swap.

- **The bottom-edge overrides `background` to a LINEAR gradient** (`to right`, spectrum → `transparent
  var(--border-progress-fill)` → transparent) mirroring the inline-end-edge, so the value maps LINEARLY along
  the block axis. ONE shared linear-paint expression for both edge registers (the dock-orientation `dim`-idiom
  discipline — no third fork; the perimeter `full-ring` keeps its conic).

## §Work

- `src/styles/border-progress.css:81-92` — the `[data-coverage="bottom-edge"] .border-progress__ring` rule adds a
  `background: linear-gradient(to right, var(--border-progress-spectrum, var(--section-color-7)), transparent
  var(--border-progress-fill, 0%), transparent 100%)` override (mirroring the inline-end-edge at `:102-108`,
  `to bottom` → `to right` for the horizontal band). The mask stack is UNTOUCHED (the band-scope + radius cut-out
  already correct).

## §Acceptance

Gate: **`proof:border-progress`** (extended, no 2nd gate — the house discipline).
Born-RED at HEAD: the `bottom-edge` rule overrides mask only, inheriting the base conic `background` (the
sibling inline-end-edge overrides background; the bottom-edge does not — the dual-path asymmetry).
- Clause: both edge registers (`bottom-edge` + `inline-end-edge`) override `background` to a LINEAR gradient
  reading `--border-progress-fill`; neither inherits the perimeter conic.
- Self-test: a bottom-edge inheriting the base conic flags; a linear-paint override passes.

## §π/DELTA

`tests-visual/border-progress.spec.ts` (extend) — the /data bottom-edge readback:
- the bottom band's fill PROGRESSES linearly along the edge as `--border-progress-fill` sweeps (a per-x
  luminance scan shows the filled prefix + the transparent tail, NOT a uniform hollow outline);
- the `full-ring` perimeter conic is un-regressed;
- Chromium + real WebKit, BOTH modes. LOCAL-only, rides the reflect wave.

## §Obligations

- No cross-repo ask (an internal CSS paint swap; the BorderProgress prop/coverage surface is unchanged).

## §Dispositions

- **completion-seal + border-progress "born ≥2" watch** (CHRONIC §6.4 / OFIT-2/3) — the `/border-progress`
  subpath retire-until-speedtest-adoption decision is a SEPARATE ledger row (owned by the prune band / the
  metrics-relocate cluster), NOT this wave. This wave FIXES the paint on the shipped surface; the
  ship-vs-retire disposition is elsewhere. Recorded, no re-book here.
- Liveness probe: a `bottom-edge` register inheriting the perimeter conic REDs.
