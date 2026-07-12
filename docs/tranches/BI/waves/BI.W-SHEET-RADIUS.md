# BI.W-SHEET-RADIUS — the Sheet reads rounded (the dead squircle rule made live)

Band B1 (geometry grammar). Rounds the Sheet primitive — the parent context W-CONFIG-IN-SHEET's concentric
reader derives from.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-A3** (rounding half) — "The drawer is not rounded" (ss-23; the gear Configurator sheet renders
  square-cornered at the screen edge). *The "fade in/out animation needs perfecting" half of UF-A3 is UF-G10 /
  the motion band (B7) — see §Obligations; NOT this wave.*
- **FAM-4** "Sheet fully square (UF-A3); squircle rule dead on 0-radius box" · **GEO-2** (vacuous-gate; the
  squircle/sheet gate greens over a 0-radius box).

## §Design

Decided mechanism — D-GLASS PASS-1 §4 Law 2 (a multi-row section/sheet wears a card radius) + the shipped
squircle coupling. The Sheet's `sheetVariants` sets `border-l`/`border-r` per side but NO `border-radius` → the
panel is fully square; the `.glass-floating.sheet-animate` `corner-shape` @supports rule (`squircle.css:47`) is
DEAD on a 0-radius box (superellipse needs a base radius).

- **Per-side INNER radii on the sheet.** A right-side sheet rounds its INNER (left) corners; a left-side sheet
  rounds its inner (right) corners; top/bottom sheets round the inner edge. The edge flush against the viewport
  stays square (it meets the screen edge). The rung is the dialog/card family (`--radius-dialog`/`--radius-card`).
- The sheet's radius is the **parent `--radius-ctx`** the gear-sheet-nested configurator sections derive from
  (W-CONFIG-IN-SHEET, Law-1 site #3) — the sheet publishes `--radius-ctx` + `--radius-inset`.
- With a real radius, the shipped `.glass-floating.sheet-animate` squircle `@supports` block becomes LIVE (the
  superellipse now reads).

## §Work

- `src/components/ui/sheet/index.ts:36-46` — `sheetVariants` `side` arms gain per-side inner `rounded-*` classes
  (right→`rounded-l-dialog`, left→`rounded-r-dialog`, top→`rounded-b-dialog`, bottom→`rounded-t-dialog`); the
  viewport-flush edge stays square.
- `src/components/ui/sheet/SheetContent.vue` — publish `--radius-ctx` (the resolved sheet radius) + `--radius-inset`
  (the content pad) on the content root so nested sections derive concentric (the Law-1 relay parent site).
- `src/styles/glass/squircle.css:47` — verify the `.glass-floating.sheet-animate` `corner-shape` rule now reads
  (the radius is non-zero); no edit if it already couples — the fix is upstream (the radius).
- `scripts/proof-<sheet-radius>` / fold into `proof:geometry-grammar` Law-2 or a dedicated `proof:sheet-radius`
  arm — assert `sheetVariants` carries a non-zero inner radius per side + the squircle rule is not vacuous
  (a 0-radius squircle host REDs).

## §Acceptance

Gate: **`proof:sheet-radius`** (born-RED) — OR fold into `proof:geometry-grammar` as a Law-2 sheet clause.
Born-RED at HEAD: `sheetVariants` carries NO radius (fully square) + the squircle rule is vacuous on the
0-radius box.
- Clause: every `side` arm carries a non-zero inner radius (born-RED: none; GREEN here).
- Clause: the squircle `@supports` host resolves a non-zero `border-radius` (kills the vacuous-gate GEO-2).
- Self-test: a 0-radius sheet variant flags; a rounded per-side variant passes; a viewport-flush square edge is
  allowed.

## §π/DELTA

`tests-visual/sheet-radius.spec.ts`:
- the gear Configurator sheet reads ROUNDED (getComputedStyle inner corners ≈ `--radius-dialog`; the
  viewport-flush edge square);
- the squircle `corner-shape` reads on Chrome/Safari (superellipse curve within the radius box);
- Chromium + real WebKit, BOTH modes. LOCAL-only.

## §Obligations

- **Cross-band note (NOT an orphan):** the "fade in/out animation needs perfecting" half of UF-A3 (+ UF-G10, +
  ruling 12 `--stage-t` sheet-root scoping) is owned by the MOTION band (B7 / D-MOTION), NOT B1. This wave
  discharges ONLY the rounding half of ss-23.
- No cross-repo ask (additive per-side radius classes; visual-only).

## §Dispositions

- None chronic. Liveness probe: a 0-radius sheet variant OR a vacuous squircle host REDs (GEO-2 cannot return).
