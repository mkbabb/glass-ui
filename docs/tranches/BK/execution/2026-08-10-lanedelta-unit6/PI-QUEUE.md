# LANE δ — UNIT 6 · π QUEUE · ONE RE-CAPTURE CELL

**Enqueued, not discharged.** This unit changes paint and this seat has observed **none of
it**. Every figure in `RECORD.md §2` is COMPUTED from the arm table (sRGB→OKLab on the emitted
`hsla`), never read off a pixel. The cell below is a **DELTA against pixels already banked**
in `docs/tranches/BK/execution/2026-08-25-pi-band/delta-config-fourier-scroll-story/`, so the
re-capture compares like with like rather than forming a fresh opinion. The adjudicated
predecessor verdict is that directory's
`PI-BATTERY-delta-config-fourier-scroll-story.md` §"Defects routed" → **D6**.

**Standing law for this cell.** ENQUEUE to the singleton browser seat; no seat opens its own
browser. Screenshot + `getComputedStyle` only — **`getContext()` is never called on any
canvas** (the context-steal trap). Colour read from the captured PNG in Node (`pngjs` + the
one colour-math source `scripts/lib/paint-arm.mjs` re-exports); a token that resolves to
`oklab()`/`oklch()` in `getComputedStyle` is parsed, never string-compared. Port and
build-freshness cited in the cell. **The predecessor artifact is the control; a cell that
cannot show its predecessor is not a delta.**

**Theme must be verified in-page.** The predecessor battery's O1 records five frames labelled
`light` that RENDER DARK. This cell's entire subject is a light/dark difference, so a
mislabelled frame does not merely weaken it — it inverts it. Bank
`documentElement.classList.contains("dark")` beside **every** frame.

**Build freshness is load-bearing here.** The still is rastered by
`dist-demo/assets/storyTile-*.js`. This seat rebuilt `dist-demo/` at the cut and verified the
arm table in the emitted bundle by grep:
`light:{sat:48,ground:E,mark:D,specular:.5},dark:{sat:62,ground:15,mark:68,specular:.3}`.
If the capture runs against a dev server instead, say so — but a capture against a **stale**
`dist-demo/` measures the uncured raster and is worthless.

---

## π-RERUN-D6 — the frozen stills carry a dark arm

**Cure:** `demo/chassis/landing/vizPreviewStill.ts` — `STILL_ARMS` + `stillColor(arm, …)`;
`vizPreviewStill(route, theme)` memoized per `` `${theme}|${route}` ``; the three front doors
resolve through a reactive `stillTheme`.
**Routes:** `/display` and `/substrates` @1440, **dark**, plus the scrolled-stills arm — the
exact arms δ3-π-5 used.
**Predecessor verdict:** δ3-π-5 **OWED-TO-BROWSER-SEAT**, discharged with 44 `pi-d3p5-*`
artifacts; **D6 routed** out of its Half A table. Evidence frame of record:
`pi-d3p5-LANDING-substrates-1440-dark.png`; the clearest single frame is
`pi-d3p5-STILLS-scrolled-substrates-1440-dark.png`.

### THE ONE ARM THAT DECIDES, first and cheapest

The predecessor's own detector was **`uniqueRgb` equality across themes**. Take it before any
photometry:

| still | control (banked) — light vs dark | the cure's claim |
|---|---|---|
| `/substrates/aurora` | uniq **628** vs **628** — identical | the two differ |
| `/substrates/fourier-field` | uniq **477** vs **477** — identical | the two differ |
| `/substrates/blob` | 917 vs 924 | differ by far more than 7 |
| `/substrates/constellation` | 1171 vs 903 | — |
| `/substrates/glass-material` (scrolled) | 843 vs 844 | — |
| `/substrates/glass-panel` (scrolled) | 1451 vs 1452 | — |

The aurora and fourier-field rows are the cleanest: **byte-identical** in the control. If
either is still identical after the cure, the dark arm is not reaching the raster and nothing
below is worth taking — re-route against the **build**, not against the arm table.

### Then, the photometry the defect was actually stated in

| arm | control (banked) | claim |
|---|---|---|
| still-image mean OKLab **L**, `/substrates` @1440 **dark**, per still | ≈ **0.93** (the cream slab; the light and dark rasters are the same bytes) | **0.36 – 0.50** — the ground gradient's computed band. Predicted per route: aurora 0.41→0.48 · blob 0.36→0.40 · constellation 0.40→0.44 · fourier-field 0.39→0.43 · glass-material 0.41→0.49 · glass-panel 0.40→0.50 |
| still **L** vs the PAGE GROUND it sits on, dark | slab at 0.93 over a ground the seat measured at **L 0.34–0.57** — the still is the brightest thing on the page | the still sits **inside** the ground's band, not above it. `|L_still − L_ground|` collapses from ≈0.45 to ≲0.15 |
| still **C max**, dark | aurora **0.06739** (identical to light — the tell) | chroma **KEPT**, not collapsed: C max ≥ 0.06 in dark. A dark arm that greys out is the charcoal-slab failure and REDs this row even if L is in band |
| the **light** arm, `/substrates` @1440 light | uniq 628 / 917 / 1171 / 477 / 843 / 1451, aurora C max 0.06739 | **BYTE-IDENTICAL — every figure unchanged.** This is the control that says the cure did not touch light. Gated deterministically too (`d6 · keeps the LIGHT arm an exact identity`), so a disagreement here convicts the *capture*, not the cure |
| `/display` @1440 dark — the authored-tile landing | uniq 432 · L 0.305 · C max 0.039 | **unchanged.** `/display` previews an *authored* `.tile.vue`, not a still; the theme argument reaches the `still` rung only. A move here means the arm leaked into the authored path |
| the well beneath the image | `color-mix(in srgb, var(--card) 68%, transparent)` — already theme-aware, and covered | **unchanged**; and it must still be COVERED, not revealed. A cure that shrank the image to show the well is not this cure |
| `ladderCanvases` / GL context census, both arms | `ladderCanvases: 0`; `webgl2 ×2, webgpu ×1, requestAdapter ×1` per landing | **unchanged.** The arm doubles the number of `2d` rasters (≤12 app-wide, from ≤6) and adds **zero** GL. The `2d` tally may rise; `webgl2`/`webgpu` may not |

### The FLIP arm — not in the predecessor, and the half a paired raster cannot prove

The gate proves the two arms exist and that all three front doors *read* the flag. Only a
browser can show the swap happening on a live page.

| arm | claim |
|---|---|
| load `/substrates` @1440 **light**, capture; toggle the theme control **in-page**; re-capture without navigating | the six stills' `uniqueRgb` change at the toggle. A still that keeps its light bytes after the flip is the memo serving the wrong arm |
| the same, flipped **back** | the original light figures return exactly — the per-arm memo is a cache, not a one-way door |
| `documentElement.classList` beside each of the three frames | `""` → `"dark"` → `""`, so the toggle is the thing that moved |

### Artifacts to re-bank

Same names, `-cured` suffix, beside their controls:
`pi-d3p5-LANDING-substrates-1440-{light,dark}.{json,png}` ·
`pi-d3p5-LANDING-display-1440-{light,dark}.{json,png}` ·
`pi-d3p5-TILEPAINT-{substrates,display}-1440-{light,dark}.json` ·
`pi-d3p5-STILLS-scrolled-substrates-1440.json` + `-{light,dark}.png`
(`scrollTop 810` on `.demo-main-scroller`, ≥500 ms settle after the write — the predecessor's
own recipe; at 1440×900 `glass-material` and `glass-panel` sit below the fold at rest at
preview-box y ≈ 1214, so the at-rest arm cannot speak for them and the union of the two arms
is what measures all six) · **new:** `pi-d6-FLIP-substrates-1440-{light,dark,relight}.png` +
`.json`.

### KILL

- If the six stills' `uniqueRgb` still match across themes, the raster is uncured **in the
  artifact under test** — check the `dist-demo/` build stamp before touching the arm table.
- If dark **L** lands in band but **C max** collapses below 0.04, the polarity transfer is
  right and the **saturation** lever is wrong; re-open against `STILL_ARMS.dark.sat`, not
  against the ramp.
- If the stills now read as *holes* — darker than the page ground rather than seated in it —
  `dark.ground` is too low; the lever is that one number and the light arm is provably
  untouched by moving it.
- If the metaball's L 82 spot or the glass plate's L 96 rim read as **artefacts** rather than
  as recessive detail (the one judgement `RECORD.md §5` carries forward and explicitly does
  not settle), the blanket polarity inversion is wrong for the *off-ground* paints and the
  class re-opens as a two-band arm (ground inverts, lifts stay lifts) — **not** as a nudge to
  the endpoints.

---

## NOT ENQUEUED HERE, AND WHY

| cell | grounds |
|---|---|
| D4 (`0 GL contexts on any landing` is false at HEAD) | a **claim correction**, not a code fix; owner is the δ3 order's record + the BK driver. This unit adds zero GL contexts and does not touch it |
| D5 (the software-renderer probe runs twice per landing) | **owner: the aurora runtime (#49)**. Untouched here |
| δ3-π-5's other Half A/Half B rows | CAPTURED-GREEN and not reached by this cure, except as the explicit *controls* named above |
| the `{authored 2, none 4}` vs "four authored tiles" reconciliation | the browser seat's own adjudication, per unit-5's queue. Unchanged by this unit — the ladder's *counts* are untouched; only the still's paint moved |
