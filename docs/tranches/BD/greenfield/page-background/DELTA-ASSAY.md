# PAGE-BACKGROUND — DELTA-ASSAY (golden vs current · the UNION path)

> The golden-vs-current delta + the deft integration path. ORCH-LIVE-VERIFIED
> (Chrome, both modes, `localhost:5173`). The three challenges are UNANIMOUS and
> reproduced here pixel-for-pixel: the warm-cel **mechanism is fit** (clears the §3
> floor, warm, no teal) but the golden's **proof apparatus is fraudulent** and its
> **base primitive + two tokens are genuinely unbuilt in `src/`**. The honest core
> survives → **REFINE the design, RE-INVENT the proof, BUILD the (mislabeled-as-adopt)
> primitive as a co-mint.** No fork, no second plane, no legacy, no dual path.

---

## 0 — WHAT I MEASURED LIVE (the binding evidence — every number reproduced)

| probe | route / artefact | reading | verdict |
|---|---|---|---|
| **flat page pixel (light)** | `/forms/select`, `.paper-underpaint` bg `rgb(251,250,248)` | **C 0.0029 @ L 0.985 H 84.6** | §0 reproduced EXACTLY — 15× below the 0.045 floor |
| **flat page pixel (dark)** | `/forms/select` dark, page bg `rgb(11,10,9)` | **C 0.0028 @ L 0.146 H 68.6** | gray-charcoal, NOT warm-luminous — §0 reproduced |
| **field / glass / canvas count** | `/forms/select` | **0 paper-field · 24 glass · 0 canvas** | the keystone is unbuilt; the glass has nothing to bend |
| **the three tokens** | `:root` live | `--field-h` **UNSET** · `--glass-key` **UNSET** · `--ease-cartoon-punch` **UNSET** | all three GOLDEN dependencies are fiction in `src/` |
| **the spike's OWN panel** | `golden/spike.html`, `--field-h:62` (warm amber), VIVID | **`field meanC: 0.1164 · field meanH: 265.3 ⚠ TEAL · VERDICT: RED — pale or cool`** | the cited de-risk artefact REFUTES every claim it is cited to support |
| **HONEST composite raster** (mine) | `golden/spike.html` field, foreignObject→canvas, 16,000 px, chroma-weighted H | **meanC 0.0727 · meanL 0.900 · meanH 71.3° WARM · tealFrac 0.000** | the MECHANISM WORKS — warm, vivid, clears the floor |
| **the A/B control** | `golden/spike.html` (eye + `orch-spike-light.png`) | both "field-warm" + "flat-plate control" pills sit over the SAME `#field` plane — visually identical | the transmit-delta (user's #1 complaint) is tested by a thing-vs-itself; INVALID |

Captures: `orch-spike-light.png` (the vivid warm cel renders + the invalid A/B, both visible).

**The unanimous read:** born-RED is REAL (light C 0.0029, dark C 0.0028, 0 fields, 3 unset
tokens). The warm-cel field paints WARM + VIVID + no-teal (raster 0.073 @ h71). The spike that
"proves" it computes RED/TEAL on that same warm field (a stop-string averager, not a raster) and
its A/B is self-comparison. The GOLDEN's §2d "binding numbers" (0.066/0.073/0.077/0.062/0.081)
match neither the spike (0.116) nor my raster (0.073) — they are fabricated constants.

---

## 1 — THE DELTA (golden vs current — survival of the fittest)

### KEEP (fit — adopt verbatim)
- **The core IDEA: ONE warm per-route field behind glass, CSS-mesh GROUND + `<Aurora field>`
  HERO, mounted universally on the existing `<PaperBackdrop>` at `AppShell.vue:251`.** DRY, the
  right union shape, the correct non-fork architecture. All three challenges grant this intact.
- **The one-number color-script `--field-h`** as the per-route identity primitive (one var, the
  field derives its analogous warm triad) — genuinely DRY-er than a 4-stop spine or a triad object.
- **The two-renderers-one-script reconcile** — CSS mesh = universal floor (rung 0, 0-JS,
  compositor-only); `<Aurora field>` = opt-in amplifier (rung 1) reading the SAME hue. This
  correctly COLLAPSES the ~9 viz §3 deltas + `BD.W-GLASS-FIELD` + `BD.W-AUR-VIVIDNESS` onto ONE
  primitive — no per-viz fork. The single highest-leverage move in the whole tranche.
- **The compositor-only path** (radial+conic+oklch+transform, NO `backdrop-filter:url`, NO SVG
  goo in the field path) — the right cross-engine choice (§L7).
- **`--neutral-0` DECOUPLED + KEPT** as the L0 opaque legibility floor under the warm stops (the
  BA.W-NO-GRAY warm floor; the reduced-transparency fallback). Never deleted.
- **The mount seam is real** — `<PaperBackdrop>` @ `AppShell.vue:251` is the ONE fixed element the
  chassis already mounts; `CATEGORY_DEFAULT_BG` @ `manifest.ts:181`, `heroAuroraConfig`,
  `useGlassBackdropLuminance`, `useIntersectionPause` all EXIST (live-confirmed integration targets).

### REFINE (weak — evolve, with the challenge folds baked in)
1. **The base primitive is NET-NEW, mislabeled "adopt verbatim."** `grep paper-field src/ demo/`
   = **ZERO** (live). `src/styles/paper.css` has only `paper-underpaint` + `paper-grain-overlay`.
   `paper-field` exists ONLY as a proposal in the also-unbuilt glass-material GOLDEN. → **CO-MINT
   it here** (drop the "byte-untouched / re-point a shipped seam" framing). Re-count net-new
   artefacts HONESTLY: **6, not 3** (`@utility paper-field` itself + its dark arm + the
   `@property --field-h/--field-drift` regs + the `::before` drift/keyframes + `field-script` +
   the `<PaperBackdrop palette>` prop).
2. **`FIELD_SCRIPT` is a DRY-violating THIRD per-category registry.** `categoryHue(id)`
   (`category-hero.ts:159`) is documented as the ONE color source — *"never a hand-rolled
   SECTION_HUE duplicate"*; `CATEGORY_PALETTE_HUES` (`aurora-hero.ts:110`) is a second. The
   GOLDEN's `FIELD_SCRIPT` (warm degrees) is exactly the forbidden duplicate AND it CONFLICTS:
   the existing registries are COOL where the GOLDEN is warm (`forms: 2 indigo / substrates: 3
   teal / feedback: 8 ruby` — live-read), so "two renderers, one script" is a LIE unless the hero
   Aurora and the CSS field read the SAME source. → **DERIVE `--field-h` from the EXISTING
   `categoryHue(id)` via ONE `warmFieldHue()` adapter** (index 1-12 → warm-clamped degree ∈
   [25,95]). One source of category color. The hero Aurora's warm-recolor is owned in the SAME
   adapter (the existing `CATEGORY_PALETTE_HUES` indigo/teal must be re-warmed or routed through
   the adapter, or the §1.4 "same color event" claim stays false — own it explicitly).
3. **The warm-clamp is a TS convention, not a paint invariant.** `@property{syntax:"<number>"}`
   cannot range-clamp; an inline `--field-h:210` paints teal (challenge#3 R4 proved it live). →
   **clamp in the CSS calc** (`--field-h: clamp(25, var(--field-h-raw), 95)`) so paint is
   hard-bounded regardless of writer — OR downgrade the prose to "registry convention enforced by
   runtime assert + gate," never "type invariant."
4. **The §2d numbers are fabricated + measured at the WRONG (vivid) rung.** The spike loads at
   `--field-intensity:1` (VIVID, hero); the field mounts UNIVERSALLY at the GROUND rung (§1 says
   0.6, §2b says 0.85 — the GOLDEN contradicts itself on its single load-bearing scalar). The
   floor must clear at GROUND. → **pick ONE ground intensity, re-derive ALL numbers from the
   HONEST raster at THAT rung, both modes.** The honest binding number is the raster's (~0.073 @
   h62 vivid; ground re-measured at build-time). Strike "canvas-raster readout / measured on real
   painted pixels / the spike's binding numbers" — they are false.
5. **The grain/bg-background host composite is unverified.** `AppShell.vue:251` is
   `<PaperBackdrop class="fixed inset-0 -z-10 bg-background" />` — the SAME host carries
   `bg-background` (opaque `--neutral-0`) AND the grain `::after` (`mix-blend-mode:multiply`). A
   multiply grain over the warm stops DARKENS them unpredictably; opaque `bg-background` can
   occlude the field layers. → **live-verify the 3-layer host composite post-mount** (field +
   bg-background + multiply grain) clears the floor — OR move `bg-background` off the host so
   `--neutral-0` lives only inside the `paper-field` stack (as the spike does).

### RE-INVENT (broken — replace)
- **The spike's `sampleField()` measurement.** It does `getComputedStyle(field).backgroundImage`
  → regex-extract `oklch(...)` stops → alpha-weight the STOP CORES — the EXACT anti-evasion path
  §0 forbids ("NEVER getComputedStyle of stops, sample the COMPOSITED pixel"). It reads TEAL/RED
  on a warm field. → **DELETE it. Replace with the working `foreignObject→canvas→getImageData`
  raster (mine, untainted) for the spike, and the Playwright `page.screenshot → getImageData` of
  the field region for the binding gate.** Re-derive every number. Make G9 BITE the stop-string
  method (a computed-stop-average input must FAIL the gate).
- **The A/B transmit-delta control.** `.flat-plate{background:--neutral-0}` changes only glassB's
  OWN surface; both pills still sit over the same `#field` plane, so the blur samples the warm
  field for BOTH (eye-confirmed identical). → **the A/B must place two real glass controls over
  two real BACKGROUNDS — one over the field, one over an opaque `--neutral-0` PATCH that masks the
  field BEHIND the glass** (so the blur samples cream). Measure the delta on a raster. This is the
  user's #1 complaint (gray glass) — it MUST be the de-risked move, not an invalid self-compare.

---

## 2 — THE UNION PATH (deft integration — KISS, reuse, no fork, no legacy)

The field is **not** a new fixed plane, **not** a per-viz fork, **not** a parallel engine. It is
ONE new `@utility paper-field` co-minted in `src/styles/paper.css` (the file that already hosts
`paper-underpaint`), driven by ONE per-route warm number derived from the EXISTING category-hue
source, mounted on the EXISTING `<PaperBackdrop>`, amplified by the EXISTING `<Aurora>` engine.

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the field primitive | **CO-MINT** `@utility paper-field` in `src/styles/paper.css` (sibling to `paper-underpaint`); honest net-new, not "adopt" | second field engine / second CSS file |
| the per-route hue | **`warmFieldHue(categoryHue(id))`** — ONE adapter over the EXISTING `categoryHue` source (presets-in-consumers) | third registry (`FIELD_SCRIPT` — DROPPED) |
| the warm-clamp | `clamp(25, …, 95)` in the CSS calc — paint-hard-bounded | a TS-only "type invariant" |
| the mount | `<PaperBackdrop>` @ `AppShell.vue:251` — compose `paper-field` on the SAME fixed element via a `palette` prop; live-verify the grain+bg-background composite | second fixed plane |
| the hero field | `<Aurora field>` + `heroAuroraConfig` reading the SAME `--field-h` | parallel field engine |
| the cel key-light | `--glass-key` — **co-minted with glass-material `BD.W-GLASS-KEY-EDGE`** (stated hard dependency); FORBID the `-58deg` literal fallback in shipped CSS (a missing shared token must FAIL G7) | new shadow/light token authored twice |
| the drift easing | `--ease-cartoon-punch` — **DEPEND on `BD.W-CARTOON-PUNCH`** (motion-spring sibling, already books it); no literal-cubic duplicate | a baked springy literal masquerading as the spring |
| the warm floor | `--neutral-0` DECOUPLED + untouched (L0 under the stops) | new floor token |
| offscreen-pause / PRM | `useIntersectionPause` + `content-visibility` — extended to the drift `::before`, not only the Aurora rung | new perf seam |
| the amplifier selector | `CATEGORY_DEFAULT_BG` (`manifest.ts:181`) → "amplified vs plain", never "live vs dead" | new routing map |

**The ordering dependency (stated, not hidden):** `paper-field` + `--glass-key` are co-minted by
this band reconciled with glass-material's `BD.W-GLASS-FIELD` / `BD.W-GLASS-KEY-EDGE`. Whichever
lands the `@utility paper-field` + `--glass-key` mint FIRST, the other ADOPTS. They are the SAME
primitive — the glass-material delta already booked "warm the MOUNTED PaperBackdrop AppShell:251,
decouple --neutral-0, NOT a 2nd plane"; THIS amendment hardens it to the §3 FIELD floor (0.045)
and per-routes it. No second mint, no dual path.

**The dup-kill (the highest-leverage move):** glass-material `BD.W-GLASS-FIELD`, all viz §3 deltas
(dot-matrix, fourier, concentric, paper-grid, goo-dot, dot-flow already route their "colourful
ground" here per the ledger), and `BD.W-AUR-VIVIDNESS` collapse onto ONE color-script (`--field-h`)
consumed by TWO renderers. A viz is a sibling layer at the same `z`, lit by the same ground.

---

## 3 — CONVERGENCE

**Union verdict: REFINE (design survives, hardened) + RE-INVENT (the proof apparatus only).**
**~70% converged.** The design direction is fit and triply live-verified (warm raster 0.073 @ h71,
no teal, born-RED real both modes). The remaining 30% is build-time + the six folded hardenings:
(1) co-mint `paper-field`+`--glass-key` honestly, reconciled with glass-material; (2) the
`warmFieldHue(categoryHue)` adapter replacing `FIELD_SCRIPT`; (3) the CSS `clamp()` warm-bound;
(4) re-derive ALL numbers from a REAL raster at the GROUND rung, both modes; (5) the 3-layer host
composite live-verify; (6) the RE-INVENTED spike (raster not stop-string) + the valid A/B + the
WebKit paired-engine capture (the spike was never run in Safari; the gradient interp space
unpinned). All build-time, user-gated.
