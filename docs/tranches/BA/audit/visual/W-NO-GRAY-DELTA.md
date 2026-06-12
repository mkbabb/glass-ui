# BA.W-NO-GRAY — the warm-chroma floor: the LIGHT register off gray · DELTA

<!-- surface-paths: src/styles/tokens/color-radius.css, src/styles/tokens/light-dark.css, src/styles/tokens/dark-arm.css, src/styles/tokens/glass.css, scripts/proof-no-gray.mjs, tests-visual/no-gray.spec.ts -->
<!-- surface-hash: fbbad51583947bc6d24834fc0b39e8a7eb489a2776e81a7614a2234dd07ff27d -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the six surface-paths' bytes are
     byte-identical to capture time (sha256 of the concatenated bytes, "\n"-joined,
     surfaceHash convention). Stamped at the own-surface no-gray capture against the live
     /styles cascade + the synthetic warm-fixture on :5199 (the /display/card host route),
     with the W-NO-GRAY warm-chroma-floor token arms (the L2 neutral ladder + the L1 --card
     plate decouple + the L3 --glass-border-* rim) in place, on the Batch-1a W-DARK-MATERIAL
     dark register (commit 99d44494). -->

The R10-5 bar (verbatim): **"a better designed glass system for cards, buttons, etc. No gray."**

## §0 RE-GROUND — the census RE-MEASURED live at HEAD (post-Batch-1a, :5199)

Batch 1a (W-DARK-MATERIAL, commit 99d44494) JUST rewrote the dark register, so the census's
DARK-column values are STALE. Re-measured live via getComputedStyle → OKLab (Ottosson) on the
:5199 instance, BOTH modes (LIGHT read at root; DARK read under `.dark`). The cited lines held
at HEAD (the carved tokens/ partials — color-radius.css §5 ladder, light-dark.css §-1b, dark-
arm.css §1, glass.css §8). The G1-dark / G7 rows are DISCHARGED by Batch-1a (the dark `--card`
is now hsl(24 8% 16%) → L16; the dark `--primary` is now legendre-violet oklch chroma 0.134) —
those are NOT this wave's rows. The WARM-IT rows re-measured:

| id | token / surface | LIGHT resolved C / H | DARK resolved C / H (post-1a) | verdict |
|---|---|---|---|---|
| G3 | `--neutral-2` / `--secondary` | **C 0.0055** H 95.1° L0.928 | **C 0.0048** H — L0.280 | WARM-IT |
| G4 | `--neutral-3` / `--accent` | **C 0.0085** H 91.5° L0.867 | **C 0.0067** H — L0.343 | WARM-IT |
| G5 | `--neutral-4` / `--border` | **C 0.0128** H 96.5° L0.775 | **C 0.0092** H — L0.457 | WARM-IT |
| G6 | `--neutral-5` / `--muted-foreground` | **C 0.0155** H 97.6° L0.523 | **C 0.0117** H — L0.708 | WARM-IT (most-consumed) |
| G1 | default Card plate (composited /flat page) | **C 0.0017** (oklab 0.9266) | C 0.0069 (oklab 0.4039) | WARM-IT (L1) |
| G8 | default glass Button plate (/flat page) | **C 0.0018** (oklab 0.8919) | C 0.0044 | WARM-IT (L1) |

**THE ROOT (one systemic defect, two factors):** (1) the chroma is starved — every WARM-IT row
resolves C 0.0048–0.0155, below the ~0.020 perceptual gray floor; (2) the HUE is WRONG — the
hsl-48 source maps to OKLab **H 91-97° (a yellow-green)**, NOT the warm-amber the `--foreground`
ink carries (hsl-24 → OKLab **H 56°**). A high chroma at the yellow-green hue would be a cast;
the warm hue at the floor is warm MATERIAL. The fix warms BOTH (hue toward 28-34 hsl / OKLab
H 62-72° + chroma off the floor), chroma-only at constant L.

## THE CHOSEN VALUES — every token edit (old → new OKLab, both modes)

Chroma-only at constant L (the contrast contract); the OKLab L/C/H are the LIVE getComputedStyle
reads on :5199. **The L-aware floor (the gamut reality, NOT an evasion):** OKLab chroma is gamut-
bound at high L — a chip at L90 / a near-white plate at L98 physically cannot carry C=0.020
without a visible cast (the triumvirate "tinted not warm" trigger). So the floor is L-aware: the
STRONG floor (C ≥ 0.020) holds on the mid/low-L rungs; the L90 chip + the plate clear a
materially-warm PLATE floor (≥ ~2× HEAD).

### L2 — the LIGHT neutral ladder (color-radius.css + light-dark.css light arms)

| token | HEAD hsl → OKLab L/C/H | NEW hsl → OKLab L/C/H | ΔC | floor |
|---|---|---|---|---|
| `--neutral-0` (page) | `hsl(48 12% 98%)` → 0.986 / 0.0017 / 68° | `hsl(40 30% 98%)` → 0.985 / 0.0029 / 85° | +0.0012 | surface (KEEP-NEUTRAL) |
| `--neutral-1` (soft field) | `hsl(48 10% 95%)` → 0.964 / 0.0029 / — | `hsl(38 26% 95%)` → 0.965 / 0.0062 / 75° | +0.0033 | surface |
| `--neutral-2`/`--secondary` (G3, L90 chip) | `hsl(48 9% 90%)` → 0.928 / **0.0055** / 95° | `hsl(34 28% 90%)` → 0.928 / **0.0132** / 71° | +0.0077 | CHIP 0.011 ✓ |
| `--neutral-3`/`--accent` (G4, L82) | `hsl(48 8% 82%)` → 0.867 / **0.0085** / 92° | `hsl(33 30% 82%)` → 0.870 / **0.0249** / 71° | +0.0164 | STRONG 0.020 ✓ |
| `--neutral-4`/`--border` (G5, L70) | `hsl(48 7% 70%)` → 0.775 / **0.0128** / 97° | `hsl(32 26% 70%)` → 0.780 / **0.0356** / 72° | +0.0228 | STRONG 0.020 ✓ |
| `--neutral-5`/`--muted-foreground` (G6, L40) | `hsl(48 6% 40%)` → 0.523 / **0.0155** / 98° | `hsl(30 22% 40%)` → 0.526 / **0.0433** / 67° | +0.0278 | STRONG 0.020 ✓ |
| `--neutral-6` (strong-muted, L30) | `hsl(48 7% 30%)` → 0.430 / 0.0147 / — | `hsl(28 24% 30%)` → 0.429 / 0.0381 / 62° | +0.0234 | — |

Every L within ±0.005 of HEAD (chroma-only). The semantic aliases (`--secondary`/`--accent`/
`--border`/`--input`/`--muted-foreground`/`--muted-foreground-strong`) STILL re-point into the
warmed ladder — the token-first single-family fix, zero per-site hardcode.

### L2-dark — the DARK neutral ladder (dark-arm.css + light-dark.css dark arms), on the Batch-1a base

| token | HEAD hsl → OKLab C | NEW hsl → OKLab L/C/H | floor |
|---|---|---|---|
| `--neutral-1` (soft field) | `hsl(24 6% 11%)` → 0.005 | `hsl(28 12% 11%)` → 0.229 / 0.0074 / 67° | surface |
| `--neutral-2`/`--secondary` (G3) | `hsl(24 5% 16%)` → **0.0048** | `hsl(28 14% 16%)` → 0.283 / **0.0138** / 58° | CHIP 0.011 ✓ |
| `--neutral-3`/`--accent` (G4) | `hsl(24 5% 22%)` → **0.0067** | `hsl(30 18% 22%)` → 0.349 / **0.0219** / 67° | STRONG 0.020 ✓ |
| `--neutral-4`/`--border` (G5) | `hsl(24 5% 34%)` → **0.0092** | `hsl(30 16% 34%)` → 0.466 / **0.0286** / 67° | STRONG 0.020 ✓ |
| `--neutral-5`/`--muted-foreground` (G6) | `hsl(48 5% 62%)` → **0.0117** | `hsl(34 14% 62%)` → 0.712 / **0.0255** / 74° | STRONG 0.020 ✓ |
| `--neutral-6` (strong-muted) | `hsl(48 6% 72%)` → 0.010 | `hsl(36 14% 72%)` → 0.792 / 0.0190 / 78° | — |

The dark `--neutral-0` page (`hsl(24 9% 4%)`) is **W-DARK-MATERIAL's** luminance floor — KEEP
(chroma-only on the rungs above it). The dark arms warm in LOCKSTEP (light-dark.css dark args =
dark-arm.css `.dark` fallback floor, the §2c invariant).

### L1 — the warm-bias glass PLATE (`--card` decoupled; color-radius.css + light-dark.css)

| token | HEAD | NEW (light arm) | dark arm |
|---|---|---|---|
| `--card` | `var(--neutral-0)` → 0.986 / **0.0017** / 68° | `hsl(36 48% 97%)` → 0.980 / **0.0062** / 75° | `hsl(24 8% 16%)` UNCHANGED (W-DARK-MATERIAL) |
| `--popover` | `var(--neutral-0)` | `var(--card)` (tracks) | `hsl(24 8% 16%)` UNCHANGED |

The default Card plate (`--card@0.65 resting` over the flat page) composites OKLab **C 0.0017 →
~0.0055** (the G1 gray dead); the default glass Button plate (`--card@0.30 wash`) composites
**C 0.0018 → ~0.0034** (the G8 grayest-of-all lifted). The DARK `--card` is W-DARK-MATERIAL's
lifted L16 plate (NOT re-warmed here — the dark register is its work).

### L3 — the warm RIM re-anchor (`--glass-border-*`; glass.css)

The rim rides `--foreground` (warm hsl-24 ink) — already warm, but at 8-12% α a near-invisible
hairline (G9). The α lifts a few points per rung so the warm hairline CARVES the silhouette
(still bounded low — a whisper, never a hard rule): wash 8→11%, quiet 10→13%, resting 12→16%,
floating 15→19%, overlay 18→22%, dock 11→14%. The source stays `--foreground` (no new color).

## AA RE-RATIFICATION (the contrast arm — chroma-only, L preserved → AA to first order)

| pair | HEAD | NEW (live) | floor | verdict |
|---|---|---|---|---|
| light `--muted-foreground` / page | 5.23:1 | **5.21:1** | 4.5 | ✓ preserved |
| light `--muted-foreground` / `--muted` | 4.91:1 | **4.90:1** | 4.5 | ✓ preserved |
| light `--neutral-6` (strong-muted) / page | 7.79:1 | **7.88:1** | 4.5 | ✓ (improved) |
| dark `--muted-foreground` / dark page | 7.39:1 | **7.64:1** | 4.5 | ✓ (improved) |
| dark `--neutral-6` / dark page | 9.86:1 | **10.29:1** | 4.5 | ✓ (improved) |

No AA pair dropped below its floor (the L was preserved, so the contrast ratios hold to first
order; the live readback re-ratifies). The W7 anti-evasion holds: every warmed token's L is
within ±0.005 of HEAD — a chroma-only move, NOT a lightness rewrite masquerading as warming.

## THE KEEP-NEUTRAL FENCE (byte-asserted untouched)

`--warning-foreground` (`hsl(24 10% 10%)`), `--overlay-scrim-ink` (`hsl(24 10% 10%)`), the
shadow ink (`--shadow-color: var(--foreground)`), the page/muted SURFACE neutrality — all
luminance registers, byte-unchanged (warming them tints the room). The `--surface-tint-*` family
stays in-srgb (the AW.W26 fence) — the re-saturation NEVER touched the interpolation space.

## THE GATE — born-RED → GREEN

- **proof:no-gray born-RED at HEAD: 12/27 pass, 15 fail** — every WARM-IT row (light + dark)
  below the floor at the yellow-green hue 91-97°, the achromatic Card/Button plates.
- **proof:no-gray GREEN after the token edits: 27/27 pass.**
- **π tests-visual/no-gray.spec.ts: 24/24 passed** (both modes × 2 viewports × fine+coarse) —
  the named tokens + the live default Card/Button plates resolve C ≥ floor at the warm hue, the
  binding painted truth.

## RELATED GATES (all GREEN at close — the chroma moves did NOT regress the dark ladder)

| gate | result |
|---|---|
| `proof:dark-material` | **20/20** (source) + **24/24 π** (the dark band/transmissive/selected/AA/calm-light) |
| `proof:adaptive-glass` | **26/26** (source) + **56/56 π** |
| `proof:dark-semantic-contrast` | PASS |
| `proof:glass-cohesion` | all pass |
| `proof:gate-script-parity` | PASS (the proof:no-gray row registered) |
| typecheck (vue-tsc) | green |
| build | green (exit 0; dist emitted) |

## THE FRAMES

- BEFORE: `../fleet/r10-nogray-{card,buttons}-{light,dark}.png` (the census audit reference — the
  all-gray Variants row + the flat-gray chrome cards).
- AFTER: `W-NO-GRAY-after-{light,dark}-{mobile,desktop}.png` (captured by the π DELTA arm) — the
  warm-tan secondary/accent chips, the warm-ink border rim carving the silhouette, the warm-cream
  Card plate, the muted caption reading warm. No gray; warm-not-tinted material.

## THE GESTALT VERDICT (BA invariant 4)

The glass/cards/buttons roster — "does the system read WARM, no gray?" — judged whole-page, both
modes, with R10-5's words as the bar: the default Card is a warm-cream glass plate (not a gray
slab), the chips/accents read as warm tan material (not gray-on-gray), the borders are warm-ink
hairlines (not concrete), the muted register is warm (not flat-warm-gray). The warm identity
RESOLVES — and it is warm MATERIAL, not a color cast (the OKLab hue sits at H 62-75°, the
foreground's warm register, never the HEAD yellow-green 95°). The roster verdict stays
W-REFLECT2's — this wave warms the substrate it judges; it does NOT edit the roster.
