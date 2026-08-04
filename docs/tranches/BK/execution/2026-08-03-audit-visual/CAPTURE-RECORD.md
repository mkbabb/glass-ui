# VISUAL DELTA RECORD — 2026-08-03 (driver's serialized browser seat)

Chromium (chrome-devtools MCP), demo dev server on **:5401**, the CURED tree at `dcc041cb`.
Pre-cure baseline cells (dirty tree, late morning): `dock-overview-expanded` ·
`dock-overview-light` · `drawer-snap-open` · `music-staff` · `tabs-post-refract-delete`.

## Row-6 seal-precondition cells (cured tree, midday)

| cell | file | truth |
|---|---|---|
| dark rest | `row6-cured-dark-rest.jpeg` | dock capsules, story card, rail all paint; no dead specular layer |
| mid-morph | `row6-cured-midmorph{,-2}.jpeg` + this note | **frame-freeze is not capturable over the MCP round-trip** (~300-500 ms vs the ~300 ms spring); the spring is proven NUMERICALLY instead: width 56 → **86.4 @ t≈130 ms** → 221 settled, monotone, no snap; both banked frames show the settled post-morph paint COHERENT (no crossfade sag, no plate tear, no double rim) |
| specular hover | `row6-cured-specular-hover.jpeg` (dark) + visible again in the light cell | the one-pair specular collapse (`cfc4dffa`) PAINTS: hover plate + gleam ring live on the hovered control — the "resurrected specular never seen" concern is discharged |
| light rest | `row6-cured-light-rest.jpeg` | warm rose story card, cream rail, docks legible; adaptive legibility holds |

Known standing visual defects (pass-1 register, unchanged, owned by their rows): category-card
empty preview voids + duplicated titles (demo shell) · music-staff engraving (clef geometry,
ledger-line runaway — row #91's perfection wave).

## Row-6 owed-evidence discharge (2026-08-03, post-cure driver window, Chromium :5401)

| cell | file | truth |
|---|---|---|
| mid-morph t≈0.5 | `row6-cured-midmorph-t05-PINNED.jpeg` | captured with `--dock-expand-t` PINNED to 0.5 + `data-morphing` (the spring outruns the MCP round-trip; the pin freezes the exact paint law under test). NUMERIC PROOF alongside: plate background alpha 0.38 → **0.44** → 0.50 at t=0/0.5/1 — the midpoint EXACT (the two-layer a+b−ab law gave 0.3625, the −9.375% sag); border alpha 0.05/0.065/0.08 likewise exact; chroma identical at all three points. The sag defect is DEAD in paint. |
| accent-invariant specular | `row6-cured-accent-hue-hover.jpeg` + computed-style probe | at `--glass-accent: oklch(0.65 0.22 25)` / strength 60%, the gleam hue moves 84.4° → 27.0° (accent channel LIVE) while stop alphas hold EXACTLY 0.55/0.50 (`alphaInvariant: true` at strength extremes). The ordered alpha law is byte-and-paint true. |

## ⊕¹⁹ owner-defect post-cure delta (same window, `2026-08-03-owner-defects/`)

`hero-ellipsoid-CURED.jpeg` — ornament absent in DOM (`ornamentPresent: false`) and paint;
`transition-flash-CURED-midframe.jpeg` — 12s-slowed crossfade holds constant dark luminance:
no brightened double-exposure, no letterbox edge leak, no vertical misalignment. Flash DEAD.

~~REMAINING OWED (owner-gated): one real-Safari cell covering the oklab 0-alpha veils + the
`oklch(from <color-mix var>)` specular form — needs safaridriver enablement (the GUI checkbox);
Playwright-webkit is NOT admissible for it (engine ≠ shipping app).~~

## [2026-08-03 ~23:45 ET] The real-Safari cell — COMPUTED HALF DISCHARGED (driver seat)

**The gate was already open** — Remote Automation was enabled; a stale pairing (dead driver on
:4285, Safari pid 85308 holding it) was masking it, exactly the recorded trap. Cure: kill stale
drivers, graceful Safari quit, fresh `safaridriver -p 4999` session (Safari **26.4 shipping
app**, sessionId `40D7C005…`, dev server :5400 at HEAD `690bf937`, mode dark-MOUNTED via
`vueuse-color-scheme` + asserted in-probe; session closed + driver stopped afterward so no new
stale pairing).

Engine-computed truths, measured on live elements and probes:

- **oklab 0-alpha veil form:** computes to `oklab(0.3 0.01 -0.02 / 0)` — honest zero-alpha, not
  opaque-black, not invalid.
- **`oklch(from color-mix(in oklab, var(--acc) 60%, white) l c h / 0.55)` specular form:**
  computes to `oklch(0.79 0.132 25 / 0.55)` — the relative-color-over-color-mix chain RESOLVES
  with exact alpha.
- **The live control plate** composes `linear-gradient(oklab(0.9 … / 0.12))` veils over
  `color(srgb … / 0.5)` — the layered form live in the shipping app.
- **Pinned-t plate lerp, Safari arm:** background alpha **0.38 → 0.44 → 0.50** at t=0/0.5/1 with
  chroma frozen — the midpoint EXACT, byte-identical to the Chromium proof. The a+b−ab sag is
  dead on BOTH engines.
- **π-5 rider (row #10):** `var()` inside `backdrop-filter` RESOLVES (literal `blur(5px)` ✓,
  var-composed `blur(9px) saturate(1.3)` ✓, live dock-plate token-calc chain
  `blur(7px) saturate(1.3) brightness(1.14)` ✓).

**PAINT half still owed, ENVIRONMENT-blocked not engine-blocked:** WebDriver screenshots
returned all-black frames in both modes — the machine's display is locked/asleep at this hour
and the window does not composite; `caffeinate -u` did not clear it. The two black PNGs were
DELETED, never banked (a black frame is a compositing artifact, not a Safari paint verdict —
and per the context-steal lesson, no getContext probing was attempted). The paint pair re-runs
in any awake-display window; every claim above stands on computed evidence independent of
compositing.

