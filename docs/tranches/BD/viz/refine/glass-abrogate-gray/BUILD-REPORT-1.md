# BUILD-REPORT-1 — BD.W-GLASS-ABROGATE-GRAY

**Directive:** abrogate dark-gray glass. Warm-cream LUMINOUS TRANSMISSIVE glass everywhere
(Select dropdown panel · glass Cards · toggle/glass Buttons), real warm chroma, NEVER a
dark-gray cast, readable text, in BOTH light AND dark mode (iOS-27 Liquid Glass / Maps-card
transmissive read).

**Verdict: BUILT + LIVE-VERIFIED.** The defect is gone in both modes, measured live on
`localhost:5173`. Token-first, zero recipe edit, zero new class, compositor-only, PRM/AA/Safari
preserved. The chroma-starved source tokens were lifted; the gates that certified the gray plate
were fixed.

---

## 1 — WHAT BUILT (token-first, no re-fork)

The root cause (BUILD-SPEC §0, re-measured live): the compose recipe / tint seam / dark arm all
work as authored — the SOURCE color tokens were chroma-starved. Light `--card` resolved OKLab
**C 0.0062** (live), the floating-rung composite **C 0.0066** — a third of the ~0.012–0.020
warm-material threshold → a flat gray slab. Fix = lift the named chroma INPUTS the recipe already
reads. ZERO recipe/class edit.

### FIX-A — warm the light `--card` plate-fill source (keystone)

The hue-drift escape: lower hsl hue (36→30) as saturation rises, so OKLab H stays ≤ 78° (never
the yellow-green 85–95° cast `WARM_HUE_HI` forbids).

| # | file:line | HEAD | NEW |
|---|---|---|---|
| A1 | `src/styles/tokens/color-radius.css:72` | `--card: hsl(36 48% 97%);` | `--card: hsl(30 85% 96%);` |
| A2 | `src/styles/tokens/light-dark.css:101` (`--card` + `--popover`) | `light-dark(hsl(36 48% 97%), hsl(24 8% 16%))` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` |

`--popover` (the Select/Dropdown/Popover fill source — the literal screenshot defect) tracks
`--card`: `color-radius.css:74` is `--popover: var(--card)` (no edit needed there), and the
`light-dark.css:102` literal `--popover` pair moved in lockstep with `--card`.

### FIX-C — warm the DARK `--card` (the dark "too gray" half)

W-DARK-MATERIAL lifted the dark plate's *lightness* (L10→L16) but left *saturation* at 8% → C
0.0075 charcoal. Lift the hsl-saturation onto the warm identity; the dark blur arm's existing
`saturate()/brightness()` companions then make it GLOW.

| # | file:line | HEAD | NEW |
|---|---|---|---|
| C1 | `src/styles/tokens/dark-arm.css:74` (`--card` + `--popover`) | `hsl(24 8% 16%)` | `hsl(26 22% 17%)` |
| C2 | `src/styles/tokens/light-dark.css:101` dark arg | `hsl(24 8% 16%)` | `hsl(26 22% 17%)` (same edit as A2's dark arg — §2c lockstep) |

### FIX-D — the light warm-LUMINOSITY companion (transmission term)

Lift the light content/floating/overlay `saturate()` toward the apple.com nav-glass SOTA so the
warm backdrop pulls THROUGH the glass (the Maps-card transmissive read). The radius axis +
`--glass-level` are byte-untouched (calm-vs-deep fence below).

| # | file:line | HEAD | NEW |
|---|---|---|---|
| D1 | `src/styles/tokens/glass.css:113-115` | `--glass-saturate-{wash,quiet,resting}: 1.05;` | `1.4;` |
| D2 | `src/styles/tokens/glass.css:116` | `--glass-saturate-floating: 1.18;` | `1.6;` |
| D3 | `src/styles/tokens/glass.css:117` | `--glass-saturate-overlay: 1.2;` | `1.6;` |

### FIX-D-LOCKSTEP — preserve the deep-tier hierarchy (spec correction, gestalt)

**The BUILD-SPEC §3 claim that `proof:glass-cal`/the deep fence stayed green "by construction"
was WRONG** — `proof:glass-cal` B3 + `proof:glass-depth` D2/D3 byte-assert the saturate
defaults, AND the live deep saturate default is **1.5** (not the 1.8 ceiling the spec assumed).
FIX-D's floating/overlay 1.6 would make the content/overlay tiers RICHER than the deep tier's
1.5 endpoint — inverting the two-register hierarchy and breaking acceptance #5 ("the deep tier
stays the richest"). Resolved in lockstep (the spec's own §3 "fix the gate that lied" discipline,
applied to the deep fence):

| # | file:line | HEAD | NEW | why |
|---|---|---|---|---|
| L1 | `src/styles/tokens/glass-deep.css:58` | `--glass-saturate-deep: 1.5;` | `1.8;` | the deep tier must clear the lifted floating 1.6 and stay the richest; == the baked `--glass-saturate-deep-ceiling` (1.8, never over-shot — `proof:glass-legibility` L4 holds) |
| L2 | `src/styles/tokens/glass-deep.css:86-89` (`--glass-saturate-deep-active` LERP) | depth-0 endpoint hardcoded `1.18` | `var(--glass-saturate-floating)` | the deep LERP now starts at the LIVE calm-floating value, so deep ≥ floating across the whole `--glass-depth` range AND tracks future floating retunes (more idiomatic than the dead literal) |

### Gate extension — `proof:no-gray` (extended in place, no new gate, no new KEY)

| # | file | change |
|---|---|---|
| G1 | `scripts/proof-no-gray.mjs:217` | `const WARM_PLATE_FLOOR = 0.01;` (the perceptual warm-material plate floor, ~2.8× the old `PLATE_FLOOR`); added to `facts.floors`. `PLATE_FLOOR = 0.0035` KEPT as the thin Button-wash floor. |
| G2 | proof-no-gray.mjs | `card-plate-warm-light` re-pointed `>= PLATE_FLOOR` → `>= WARM_PLATE_FLOOR` (born-RED on HEAD 0.0053, GREEN after FIX-A 0.0107) |
| G3 | proof-no-gray.mjs | NEW `floating-plate-warm-light` — composite the 0.80 floating rung (the literal Select panel) C ≥ WARM_PLATE_FLOOR (HEAD 0.0059 → 0.0130) |
| G4 | proof-no-gray.mjs | NEW `plate-warm-hue-light` — the composited floating-plate hue ∈ [45,85] (71.3°) |
| G5 | proof-no-gray.mjs | NEW `dark-card-warm-not-charcoal` — dark `--card`@0.80 over the dark page C ≥ WARM_PLATE_FLOOR at warm hue (HEAD 0.0066 → 0.0186 @ 59.8°) |
| G6 | `tests-visual/no-gray.spec.ts` | NEW `(f)` arm — opens the LIVE `/forms/select` panel, composites `getComputedStyle(panel).bg` over the page → OKLab, asserts C ≥ WARM_PLATE_FLOOR warm in BOTH modes (the binding paint, 1:1 with `before-select-light.png`) + WARM_PLATE_FLOOR const mirror |

Gate-fence updates required by FIX-D (recorded, not silent — the byte-asserts moved to the BD
values with rationale, the load-bearing SHAPE asserts unchanged):

- `scripts/proof-glass-cal.mjs` B3 — `satDefault` witnesses 1.05/1.18/1.2 → 1.4/1.6/1.6; the
  composed-recipe-shape assert (radius × level × named-saturate, brightness companions) UNCHANGED.
  Added an explicit **calm-vs-deep fence**: every lifted content tier (resting/floating/overlay)
  is asserted STRICTLY BELOW `--glass-saturate-deep` (1.8).
- `scripts/proof-glass-depth.mjs` — `CALM_FLOATING_SATURATE` 1.18→1.6, `DEEP_SATURATE_FLOOR`
  1.5→1.6, D3 named-saturate regex `1.18`→`1.6`. D2 (deep strictly > floating) + D3 anti-bleed
  (calm composite reads the FLOATING radius, not the deep radius) UNCHANGED + GREEN.

**Files touched (8):** `src/styles/tokens/{color-radius,light-dark,dark-arm,glass,glass-deep}.css`
· `scripts/{proof-no-gray,proof-glass-cal,proof-glass-depth}.mjs` · `tests-visual/no-gray.spec.ts`.
(`glass-fx.css`/`property-regs.css` show as `M` in git status but are pre-existing branch
working-tree changes — NOT touched by this wave.) No demo/ edit needed (the fix is library tokens;
every demo surface inherits).

---

## 2 — BEFORE / AFTER COMPUTED VALUES (live, getComputedStyle → OKLab)

### Light mode

| surface | HEAD (live) | AFTER (live) | reading |
|---|---|---|---|
| `--card` resolved | L 0.980 · **C 0.0062** · H 75.4 | L 0.974 · **C 0.0147** · H 70.9 | warm-amber, 2.4× HEAD, still luminous |
| **LIVE Select dropdown panel** (composited over page) | **C 0.0066** (gray) | **C 0.0124 · H 59.5** | **warm-cream luminous glass** |
| `.glass-floating` card (composited) | C 0.0059 | **C 0.0124 · H 59.5** | warm, text contrast **9.24:1** |
| glass-wash Button (composited) | C ≈ 0.0018 | **C 0.0052 · H 67.8** | warm hue (thin 0.33-α, gamut-bound; never gray) |
| panel `backdrop-filter` | `blur(13px) saturate(1.18)` | `blur(13px) saturate(1.6)` | transmission term lifted (FIX-D) |
| fg / muted-fg over warm floating plate | — | **14.84:1 / 4.6:1** | AA re-ratified (both ≥ 4.5:1) |

### Dark mode

| surface | HEAD (live) | AFTER (live) | reading |
|---|---|---|---|
| dark `--card` resolved | C 0.0075 (charcoal) | **C 0.0216 · H 57.8** | warm-luminous dark glass, elevation preserved |
| **LIVE Select dropdown panel** (composited) | ≈ C 0.0066 (charcoal slab) | **C 0.0173 · H 60.1** | warm-luminous, not charcoal |
| `.glass-floating` card (composited) | ≈ C 0.0066 | **C 0.0173 · H 60.1** | text contrast **8.92:1** |
| panel `backdrop-filter` (dark companions) | `... saturate(1.28) brightness(1.1)` | UNCHANGED | the W-DARK-MATERIAL glow arm untouched (re-resolves over warmer plate) |

---

## 3 — GATES (all GREEN)

| gate | result |
|---|---|
| `proof:no-gray` | **36/36 PASS** — `card-plate-warm-light` 0.0107, `floating-plate-warm-light` 0.0130, `plate-warm-hue-light` 71.3°, `dark-card-warm-not-charcoal` 0.0186 @ 59.8°. Born-RED on HEAD → GREEN after fix. AA arms re-ratify (chroma-only at near-constant L). |
| `proof:glass-cal` | **PASS** — radius axis byte-frozen; saturate defaults at the BD warm-luminosity bake; calm-vs-deep fence asserted (content < 1.8). |
| `proof:glass-depth` | **PASS** — deep strictly > floating (1.8 > 1.6), deep ≤ ceiling, anti-bleed intact, D5 opt-in. |
| `proof:glass-legibility` | **PASS** — L7 per-rung ladder `wash 1.4 → quiet 1.4 → resting 1.4 → floating 1.6 → overlay 1.6 (≤ 1.8)`. |
| `proof:card-tier-alpha` | PASS (alpha ladder untouched) |
| `proof:adaptive-glass` · `proof:dark-material` · `proof:glass-cohesion` | PASS (exit 0) — tint seam / dark arm / cohesion allowlist re-resolve over the warmer plate, no regression |
| `proof:glass-accent` | PASS |

**Pre-existing (NOT this wave):** `proof:on-glass-fg` W4 fails on `claude=false` — its clause greps
CLAUDE.md for token names, and **CLAUDE.md is DELETED in this branch's working tree** (`D CLAUDE.md`
in git status, file absent on disk). Unrelated to these edits (no on-glass-fg token touched); the
on-glass-fg family's AA over the new warmer plate was live-verified GREEN (muted 4.6:1, fg 14.84:1).

---

## 4 — TYPECHECK / SIBLINGS / MOTION / A11Y / SAFARI

- **Typecheck:** `npx vue-tsc --noEmit -p tsconfig.json` → **no new `error TS`** (clean).
- **Siblings:** `node scripts/verify-siblings-intact.mjs --quiet` → **OK** (no `~/Programming`
  tree touched; edits confined to glass-ui `src/` + `scripts/` + `tests-visual/`).
- **Motion (liquid-weight, verify-only per §4):** the Select panel className carries
  `glass-reveal origin-(--reka-select-content-transform-origin) ... glass-floating` — the
  BB.W-LIQUID-REVEAL bloom (scale + fade + `filter: blur(4px)→0` on `--spring-snappy` + per-spring
  duration clock) is WIRED. No spring minted, no motion token touched (the fix is static color).
  Compositor-only, PRM carves intact.
- **A11Y:** AA re-ratified after every L move — light fg/plate 14.84:1, muted 4.6:1; dark fg/plate
  8.92:1. FIX-A/C are chroma-first (L holds within ±0.006). on-glass-fg family clears 4.5:1.
- **PRM:** no animated channel added (static token values). `prefers-reduced-transparency: reduce`
  → `--glass-level: 0` collapses to the now-warmer solid `--card` (warm-cream, not gray).
- **SAFARI:** the warmth rides the cross-engine base — `--card` source color +
  `backdrop-filter: blur() saturate()` (both WebKit-supported since 9/14). FIX-D's `saturate()` is
  the cross-engine transmission term (NOT the Chrome-only `.glass-lens` SVG filter). The reveal
  blur-settle rides `filter` on the surface's own pixels, never `backdrop-filter`.

---

## 5 — ACCEPTANCE (§5, BOTH modes, fresh live capture)

1. **NO-GRAY** ✓ — every enrolled glass surface composites C ≥ 0.010 warm (H ∈ [57,71]) over its
   real backdrop, both modes (Select panel light 0.0124 / dark 0.0173; cards 0.0124/0.0173).
2. **LUMINOUS + TRANSMISSIVE** ✓ — `saturate(1.6)` on the floating/overlay tiers pulls the warm
   backdrop through; the plate is translucent (α 0.808), not an opaque slab.
3. **READABLE TEXT** ✓ — light 14.84:1 / dark 8.92:1 fg, muted 4.6:1 — all ≥ 4.5:1.
4. **BUTTONS WARM, NOT GRAY** ✓ — glass-wash Button composites at warm H 67.8° (no gray cast); the
   thin-α wash is the calm register, hue-warm, lifted ~3× off HEAD.
5. **TIER SEPARATION PRESERVED** ✓ — alpha ladder monotonic (untouched); deep tier stays the
   richest (saturate 1.8 > content 1.4–1.6); calm-vs-deep fence gate-asserted.
6. **BOTH MODES** ✓ — light warm-cream-luminous, dark warm-luminous-glow (neither gray/charcoal).
7. **LIQUID-WEIGHT un-regressed** ✓ — `.glass-reveal` bloom wired, compositor-only, PRM-carved.
8. **IDIOMATIC / NO-LEGACY** ✓ — token-first (lifted named chroma/saturate inputs), clean break no
   alias, in-srgb `--surface-tint-*` fence untouched, the gates that certified gray RAISED to a
   perceptual bar.

**The captured DELTA** (the close artifact): `before-select-light-open.png` (cold flat gray) vs
`after-select-light-open.png` (warm-cream luminous) — the gestalt difference is visible, not just
numeric.

---

## 6 — SCREENSHOTS (docs/tranches/BD/viz/refine/glass-abrogate-gray/)

| before | after |
|---|---|
| `before-select-light.png` (closed trigger) | — |
| `before-select-light-open.png` (gray panel) | `after-select-light-open.png` (warm panel) |
| — | `after-select-dark-open.png` (warm-dark panel) |
| `before-cards-light.png` | `after-cards-light.png` |
| `before-cards-dark.png` | `after-cards-dark.png` |
| — | `after-buttons-light.png` · `after-toggle-light.png` · `after-paper-glass-light.png` |
