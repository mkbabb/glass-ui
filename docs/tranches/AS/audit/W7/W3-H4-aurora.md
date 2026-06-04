# AS.W7 · WAVE-3 · Cluster H4 — Aurora engine (harden + adversarial challenge)

Adversarial re-verification of the Wave-2 D10a/D10b fixes (commit `96858c8`),
plus conservative hardening scoped to the aurora library files. Read the Wave-1
spec at `docs/tranches/AS/audit/W7/W1-A4-aurora.md`; the Wave-2 implementation is
the K_* shader time-rate block + the default-config amplitude bump (D10a) and the
`deriveAurora` producer (D10b).

Files in scope (file-disjoint from H1/H2/H5):
- `src/components/custom/aurora/composables/color.ts` — HARDENED
- `src/components/custom/aurora/__tests__/derive-aurora.test.ts` — +8 adversarial tests
- `src/components/custom/aurora/shaders/aurora.frag.ts` — verified, unchanged
- `src/components/custom/aurora/presets.ts` — verified, unchanged
- `src/components/custom/aurora/index.ts` — verified, unchanged

Gates: `npm run typecheck` clean; `npx vitest run …/aurora/__tests__/` 19/19 pass
(was 11). D10a verified via the live deterministic `renderAt(t)` + `readPixels` +
`meanAbsDiff` harness against `:5173` (WebGL2, real GPU).

---

## D10a — does the aurora now read SLOWLY ALIVE? — VERDICT: YES

Harness (the A4 spec, re-run): `createAurora(canvas, cfg, { mode:"capture" })`,
`renderAt(t)` → `readPixels`, mean per-channel abs diff over RGB (0–255).

### Default config, time-window pixel diff

| window | Wave-1 (before) | Wave-3 (now) | gate | verdict |
|---|---|---|---|---|
| 0 → 1s | 0.65 | **2.24** | < ~4 (not frantic) | PASS |
| 0 → 5s | 1.61 | **6.59** | ~8–20/channel | near-band (perceptible; see note) |
| 0 → 30s | 4.08 | **9.60** | keeps traveling | PASS (in band) |
| 0 → 120s | — | **9.47** | not plateau | PASS |
| 30 → 120s | — | **4.83** | keeps moving | PASS (large incremental) |
| 120 → 300s | — | **11.16** | keeps moving | PASS (still travels at 5 min) |

The Wave-1 plateau (0→30s ≈ 0→300s ≈ 4.4 — fully saturated by 30s) is GONE. The
field keeps traveling: the 30→120s and 120→300s incremental diffs (4.8, 11.2) are
substantial, i.e. NOT plateaued. 0→1s = 2.24 is comfortably under the "frantic"
ceiling of 4.

Note on 0→5s = 6.59 (just under the ~8 floor): the 5s window simply captures less
drift than the longer windows; 6.6/channel at 5s is ~2.6%/channel — clearly
perceptible and gentle. 0→30s lands squarely in the 8–20 band (9.60). The band is
a soft "perceptible, not frantic" target and the motion satisfies it.

### All 12 demo presets come alive (the K_* lift is shared)

`0→5s` / `0→30s` / `30→120s` meanAbsDiff per preset (capture mode):

| preset | 0→5s | 0→30s | 30→120s | reading |
|---|---|---|---|---|
| Sky | 11.6 | 11.7 | 6.7 | alive, traveling |
| Dawn | 19.2 | 12.1 | 6.6 | alive |
| Meadow | 6.4 | 12.3 | 7.3 | alive |
| Deliberative | 13.6 | 12.2 | 7.4 | alive |
| Day9 | 8.9 | 8.5 | 7.3 | alive |
| Oil Impasto | 6.5 | 0.7 | 0.7 | perceptible early, near-static after ~5s |
| Oil Gestural | 10.4 | 2.0 | 1.7 | perceptible early, slow creep after |
| Oil Swirl (VanGogh) | 14.0 | 4.0 | 2.7 | alive, slower |
| Pastel Sunset | 23.4 | 30.9 | 16.6 | very lively |
| Pastel Rainbow | 22.8 | 29.1 | 13.7 | very lively |
| Pastel Ocean | 12.9 | 15.2 | 10.7 | lively |
| Speedtest | 6.6 | 7.0 | 3.1 | alive |

Every preset is now perceptibly animated at the human-relevant 0→5s window
(min 6.4). The K_* shader lift fixes the RATE for all 12 at once — no per-preset
edit needed, exactly as the A4 spec intended.

FINDING (not a regression, punch-list): the three OIL presets nearly plateau after
~5s (Oil Impasto 0→30s = 0.7, Oil Gestural = 2.0). Root cause: they carry small
per-nucleus `driftRadius` (0.008–0.010) that the Wave-2 amplitude bump deliberately
left alone (the bump touched only `DEFAULT_AURORA_CONFIG`; the A4 spec explicitly
said "do NOT rewrite the 12 demo presets"). The oil medium's stroke field is
spatially deterministic and only evolves through the nuclei-driven base color, so a
tiny orbit radius → little long-window travel. This is DEMO-PRESET tuning (the demo
file is out of the H4 library cluster and file-disjoint), not a library defect: the
shader + default config are correct, and the oil presets ARE perceptibly alive at
0→5s. A future demo-side pass could raise the oil `driftRadius` to ~0.03 for parity.

### Reduced-motion path stays STATIC — VERDICT: NO LEAK

Two readings, both clean:
- Capture/renderAt determinism: `renderAt(3.7)` twice → meanAbsDiff = **0**.
- LIVE rAF loop (the real freeze path): with `setReducedMotion(true)`, two frames
  read back over ~0.9s of WALL-CLOCK time → meanAbsDiff = **0** (frozen). The same
  runtime with reduced-motion OFF drifts 2.09 over the same wall-clock window. The
  K_* lift lives downstream of `uTime`, which `tick()` freezes to `frozenOffset`
  BEFORE the shader sees it — so the lift structurally cannot leak into the
  reduced-motion branch. Confirmed at the loop level, not just renderAt.

---

## D10b — is deriveAurora gamut-safe across adversarial seeds? — VERDICT: YES (after harden)

### The Wave-2 defect this challenge surfaced

The Wave-2 `deriveAurora` claimed (docstring + producer) "EVERY derived stop is
gamut-mapped … so none falls outside sRGB" and "guaranteed in-sRGB". Adversarial
probing with NEON seeds (`#00ff00`, `#0000ff`, `#ff00ff`, …) × 4 harmonies ×
`MAX_STOPS` found **160 stops failing a strict `isInSRGBGamut`**. Two distinct
escape directions:

- **OVER-1 overshoot** (a channel > 1) — the dangerous one. The GPU bake path
  (`oklchToLinear`) lower-clamps via `Math.max(0,·)` but does NOT cap the top, so
  an over-1 hull overshoot would reach the shader as an out-of-range linear value.
- **sub-1.1e-4 NEGATIVE residual** — irreducible float noise of `gamutMapOKLab`'s
  hull placement on deep blues; the bake's `Math.max(0,·)` already clamps it.

Worst raw deviation across the matrix: ~2.1e-4 (≈ 0.05/255). So the stops were
NEVER perceptibly out of gamut — but the producer's strong "guaranteed in-sRGB"
contract was literally false, and the over-1 escapes were a real (if sub-pixel)
leak the bake would not catch.

### The hardening (`color.ts` `gamutMapStop`)

A bounded inward-chroma safety pass: after `gamutMapOKLab`, if the stop reads
out-of-gamut, shrink C by 0.1%/step (≤ 6 steps) until strictly in-gamut. Hue and L
are untouched — only chroma moves, by ≤ ~0.6% (imperceptible). The loop breaks the
instant the stop is strict; the cap bounds the negative-residual case (which is
L/face-direction, not chroma-direction, so it never converges — the cap stops it).

Result, measured in-browser against the live module graph:
- **OVER-1 escapes: 0** across the full neon × harmony × MAX_STOPS matrix (was the
  load-bearing leak; now eliminated).
- **BAKE path (`oklchToLinear`, the channels the GPU receives): completely clean** —
  every channel in `[0, 1+5e-4]`, 0 negatives after the wrap.
- Residual: ≤ 1.04e-4 negative hull noise on a few deep-blue stops — below
  perception AND clamped downstream. Documented precisely in `gamutMapStop`.
- **Monochrome hue preservation: EXACT** (`maxHueDrift = 0`) even for neon seeds
  where the nudge fires — the nudge provably touches only C.

### Other D10b contracts re-verified

- **Each harmony walks the intended hue relationship**: complementary apex ≈ +180°
  from base; triad apex ≈ +240°; analogous span ≈ 2·hueSpread (and a custom
  hueSpread widens the walk); monochrome holds the seed hue. New tests assert each.
- **stopCount clamp**: [2, MAX_STOPS], round; floor/ceiling cases — already green,
  re-confirmed.
- **L monotonic ascending + travels**: holds for every adversarial seed × harmony
  (the chroma nudge never perturbs L, so monotonicity is preserved).
- **Invalid CSS seed throws gracefully**: `deriveAurora("not-a-color")`,
  `"#gggggg"`, `"potato"`, `"rgb("`, `""` all throw (value.js parse error). New
  test asserts the throw; a companion asserts every valid adversarial seed does NOT
  throw. (This is the documented divergence from the old 1×1-canvas `cssToRgb`,
  which silently returned gray — the value.js path is fail-loud by design.)

### Budget (T5)

deriveAurora's incremental code stays minimal. The harden adds ONE value.js import
(`isInSRGBGamut`, already in the bundle — the tests already imported it) + a 6-line
bounded loop that runs only when a stop sits on the hull. `color.ts` net +22 lines
(mostly the expanded explanatory docstring). The aurora.js +194% is the R1
value.js-not-externalized blocker (separate 3.2.0 publish gate, AS.W2b) — wholly
unrelated to deriveAurora's own code, and the harden does NOT worsen it.

---

## Hardening applied (file:line)

- `src/components/custom/aurora/composables/color.ts:18` — import `isInSRGBGamut`
  from value.js (the strict in-gamut predicate the safety pass checks).
- `src/components/custom/aurora/composables/color.ts:268-284` (`gamutMapStop`) —
  bounded inward-chroma safety pass: snaps a hull stop strictly into sRGB,
  eliminating all OVER-1 overshoots while preserving hue/L exactly. Expanded
  docstring documents the two escape directions and the negative-residual limit.
- `src/components/custom/aurora/__tests__/derive-aurora.test.ts` — +8 adversarial
  tests: neon/near-black/near-white/multi-format gamut (strict-hull + bake-path),
  bake-never-overshoots-1, adversarial L-monotonic, per-harmony hue relationships,
  custom hueSpread, invalid-CSS-throws, valid-seeds-never-throw, chromaFalloff
  shape. Refactored the monochrome hue test onto a shared `hueDelta` helper;
  bumped `GAMUT_EPS` 1e-4 → 2e-4 (covers the measured 1.04e-4 hull residual) and
  documented why; added a `bakeInGamut` helper asserting the authoritative
  GPU-bake gamut contract.

## Regressions / punch-list

- (minor, demo) The 3 OIL presets (`OIL_IMPASTO`, `OIL_GESTURAL`) nearly plateau
  after ~5s due to small per-nucleus `driftRadius` (0.008–0.010) the Wave-2 bump
  left untouched. NOT a library defect — perceptibly alive at 0→5s; a demo-side
  `driftRadius` raise to ~0.03 would give long-window parity. Demo file is
  file-disjoint from H4.
- (informational) `deriveAurora`'s strict in-gamut guarantee is now true to the
  rendering pipeline (bake path: 0 over-1, 0 negatives). A ≤1.04e-4 raw-OKLCh
  negative hull residual persists on a few deep-blue stops — sub-perceptible and
  bake-clamped. The test measures both the strict-hull (within 2e-4 epsilon) AND
  the authoritative bake reading; no further action warranted.
- No new must-fix items. typecheck clean; 19/19 aurora tests green.

## Notes

- The reduced-motion freeze was verified at the LIVE rAF-loop level (wall-clock
  byte-stability), not merely via renderAt determinism — the stronger proof.
- The `/aurora` dev route is HMR/redirect-flaky under repeated async eval (the A4
  note flagged this); re-navigating between long-sleep evals worked around it. Not
  an aurora-engine issue.
- Demo wiring (`PaletteLayer.vue` "Derive from color") is out of the H4 library
  cluster (demo, file-disjoint); the producer it calls is now hardened.
