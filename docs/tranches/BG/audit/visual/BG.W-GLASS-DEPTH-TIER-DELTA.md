# BG.W-GLASS-DEPTH-TIER — dual-engine paint judge — **FAIL**

**Non-authoring paint judge, 2026-07-05.** Verdict: **FAIL — dual-engine (Chrome/Metal + WebKit/Metal),
both modes.** The tier-depth grade scalar resolves correctly per tier (menu 1 · popover 0.7 · content 0.35),
BUT the scalar is a **DEAD KNOB on the painted blur/saturate**: every deep surface paints the FULL 16px /
saturate 1.8 ceiling regardless of its tier grade. The wave's central claim — *content ~14px < popover ~15px
< menu 16px, menu > popover > button thickness BY CONSTRUCTION* — **does NOT paint**. By construction, all
deep surfaces are maximally thick (16px) — the exact "a deep button read as thick as a deep menu" defect the
wave claims to fix is STILL present.

The gate `proof:glass` DT4 ("deep-recipe-reads-depth / grade load-bearing, not a dead knob") is GREEN because
it asserts the SOURCE calc textually contains `var(--glass-depth)` — which it does — but it does not EVALUATE
that the calc is frozen at `:root` by registered-`@property` eager substitution. Classic device-free-green /
live-paint-false gap; caught here on the painted bytes.

## Method (proven C18 dual-engine harness — re-run on all 3 routes × 2 modes)

- Siblings tripwire: `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- BUILT bytes: `npm run demo:dist:build` (exit 0) → `npm run demo:dist:serve` (vite preview :5200).
- Chrome leg: real Chrome.app (149) + CDP :9477 → `?capture=<route>&mode=<m>`, poll `data-capture-ready`,
  record `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (real Metal, NOT SwiftShader),
  `page.screenshot` @1440×900 dsf 2 → 2880×1800. Plus an in-page **computed-DOM probe** reading the REAL
  engine's resolution of the REAL shipped stylesheet (the painted truth for a CSS-token wave).
- Safari/WebKit leg: off-screen `wkshot-live` WKWebView (system WebKit/Metal, no TCC) → 2880×1800 PNGs; +
  a `playwright-webkit` computed-DOM probe (WebKit CSS engine cross-check of the LERP freeze).
- Validation: `scripts/reflect-capture-verify.mjs` (isRealPng + IHDR dims + per-engine badge fiducial/ink +
  body variance) over all 12 route PNGs.

## Capture artifacts — all 12 route PNGs on disk, 2880×1800, real content, per-engine badge

`docs/tranches/BG/audit/visual/pipeline-depth-tier/`

| PNG | engine | GPU | mode | dims | isRealPng | badge magenta | body σ(L) |
|---|---|---|---|---|---|---|---|
| `depth-tier-chrome-buttons-light.png`  | CHROME | ANGLE Metal Apple M5 Max | LIGHT | 2880×1800 | ✓ | 10424 | 30.7 |
| `depth-tier-chrome-buttons-dark.png`   | CHROME | ANGLE Metal Apple M5 Max | DARK  | 2880×1800 | ✓ | 10424 | 57.3 |
| `depth-tier-chrome-popover-light.png`  | CHROME | ANGLE Metal Apple M5 Max | LIGHT | 2880×1800 | ✓ | 10424 | 13.4 |
| `depth-tier-chrome-popover-dark.png`   | CHROME | ANGLE Metal Apple M5 Max | DARK  | 2880×1800 | ✓ | 10424 | 17.8 |
| `depth-tier-chrome-dropdown-light.png` | CHROME | ANGLE Metal Apple M5 Max | LIGHT | 2880×1800 | ✓ | 10424 | 11.4 |
| `depth-tier-chrome-dropdown-dark.png`  | CHROME | ANGLE Metal Apple M5 Max | DARK  | 2880×1800 | ✓ | 10424 | 15.5 |
| `depth-tier-safari-buttons-light.png`  | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 6432 | 33.2 |
| `depth-tier-safari-buttons-dark.png`   | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 6432 | 49.1 |
| `depth-tier-safari-popover-light.png`  | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 6432 | 14.1 |
| `depth-tier-safari-popover-dark.png`   | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 6432 | 17.8 |
| `depth-tier-safari-dropdown-light.png` | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 6432 | 12.7 |
| `depth-tier-safari-dropdown-dark.png`  | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 6432 | 16.7 |

All routes render fully in both engines/modes (eye-verified: the `/display/buttons` "Launch the sequence" CTA
over the blue live field + the glass/glass-wash chips + dock; the popover/dropdown trigger surfaces). Route-
level pixel criteria PASS — recessive field (no conic banding / oversaturation), calm grain, hero fits its
envelope, warm-cream light identity + luminous-dark identity honored.

## The dispositive computational readback (the painted truth)

Synthetic tier probes mounted into the live route DOM read the REAL engine's resolution of the shipped
stylesheet. Values identical Chrome ⇄ WebKit, identical light ⇄ dark (the defect is mode-invariant).

**Grade tokens (`:root`) — CORRECT (monotone, in-range):** `--glass-depth-content 0.35 < --glass-depth-popover 0.7 < --glass-depth-menu 1`.

**Tier map scalar (`glass/deep.css` `:where()` rules) — CORRECT:**
`.glass-overlay → --glass-depth: 1` · `.glass-floating → 0.7` · `.glass-{card,resting,quiet,wash} → 0.35`.

**Deep LERP → the painted blur/saturate — FLAT 16px / 1.8 at EVERY grade (the DEFECT):**

| probe (`.glass-floating.glass-deep`, `--glass-depth` forced) | expected blur | Chrome blur | WebKit blur | expected sat | got sat |
|---|---|---|---|---|---|
| depth 0 (floor)   | 13px    | **16px** | **16px** | 1.6  | **1.8** |
| depth 0.35 (content) | ~14.05px | **16px** | **16px** | ~1.67 | **1.8** |
| depth 0.7 (popover)  | ~15.1px  | **16px** | **16px** | ~1.74 | **1.8** |
| depth 1 (menu)       | 16px    | 16px  | 16px  | 1.8  | 1.8  |

The resolved intermediate on EVERY element (Chrome + WebKit): `--glass-blur-deep-active-radius =
calc(( 13px + (16px - 13px) * 1 ) * 1)` and `--glass-saturate-deep-active = calc(1.6 + (1.8 - 1.6) * 1)` —
the `var(--glass-depth)` (and `var(--glass-level)`) were substituted with **1**, NOT the element's actual
`--glass-depth`. **The LERP is frozen at the depth=1 endpoint.**

**LIVE on-route confirmation:** the one deep surface on `/display/buttons` (the `primary-audacious` CTA,
`glass-wash btn-glass glass-deep`) resolves `--glass-depth: 0.35` (content grade, correct) yet paints
**backdrop-filter blur 16px** — the full menu-ceiling thickness, not the criteria's ~14px content thickness.

## Fences that DID hold (structural — recorded for completeness)

- **Calm content default BYTE-UNCHANGED — PASS.** Non-deep tiers paint the calm ladder untouched
  (`.glass-floating` 13px · `.glass-overlay` 20px · `.glass-card` 8px · `.glass-wash` 1px). The tier map sets
  only the `--glass-depth` scalar, never a `--glass-blur-*` token, so a non-deep surface never reads the deep
  family. `proof:glass-cal` stays GREEN by construction.
- **`--glass-blur-*` NOT re-pointed by the tier map — PASS (structurally).** The `glass/deep.css` tier rules
  set only `--glass-depth`. (But — because the scalar is a dead knob — "SCALAR default only" yields ZERO
  thickness differentiation, defeating the fence's own purpose.)
- **One-deep-refractive-per-route budget — PASS.** `.glass-deep` count: buttons 1 · popover 0 · dropdown 0;
  `.glass-lens`/`.glass-refract` 0 on all routes. `main.children.length = 2` on all routes.

## defectLocalization

- **`src/styles/tokens/glass-deep.css`** (blob `8bf3c4a2eed32cf79cec960b45b4782783877866`) — the LERP
  intermediates `--glass-blur-deep-active-radius` and `--glass-saturate-deep-active` are declared at **`:root`**
  and reference `var(--glass-depth)`.
- **`src/styles/tokens/property-regs.css` §18** — `--glass-depth` is a REGISTERED `@property <number>` with
  `inherits: true; initial-value: 1`.
- **ROOT CAUSE (CSS Properties & Values API — registered-@property eager substitution).** A `var()` reference
  to a REGISTERED custom property inside another custom property is substituted with the referenced property's
  **computed value at the declaring element**. The LERP intermediates are declared ONLY at `:root`, where
  `--glass-depth`'s computed value is its `initial-value` `1`. So `var(--glass-depth)` (and `var(--glass-level)`)
  are baked to `1` into the inherited computed calc string. Descendants that set `--glass-depth` to their tier
  grade (0.35 / 0.7) inherit the FROZEN `calc(… * 1)` and never re-drive it → every deep surface paints the
  depth=1 endpoint (16px / saturate 1.8). Confirmed byte-identical on Chrome/Metal AND WebKit/Metal (spec
  behavior, not an engine quirk). The `glass/deep.css` tier map (blob
  `ec048808cd34f9d2a19acea715de66448684a992`) is CORRECT — it sets the scalar per tier — but the scalar is
  inert because the consuming LERP is frozen upstream.

## mustFix[]

1. **Re-evaluate the deep LERP at the CONSUMING element, not `:root`.** Relocate the
   `--glass-blur-deep-active-radius` / `--glass-saturate-deep-active` / `--glass-blur-deep` composition OUT of
   the `:root` block and INTO the `.glass-deep` rule (`src/styles/glass/deep.css`) — i.e. compute the LERP
   where `--glass-depth` carries its tier grade — so `var(--glass-depth)` resolves per-element. (Equivalent:
   any element-scoped re-declaration below the tier-grade site works; the invariant is "the calc that reads a
   registered `@property` must be declared at/below the element where that property varies from its
   `initial-value`.") Do NOT un-register `--glass-depth` (that sacrifices the smooth `@property` animation the
   scalar exists for).
2. **Re-verify BOTH engines paint the ladder:** `.glass-floating.glass-deep` at content grade → ~14px /
   ~1.67, popover grade → ~15px / ~1.74, menu grade → 16px / 1.8 — a strict monotone thickness ladder, on
   Chrome/Metal AND WebKit/Metal, both modes. The live CTA on `/display/buttons` (content grade) must paint
   ~14px, not 16px.
3. **Harden the gate:** `proof:glass` DT4 must assert the RESOLVED per-grade blur differs (not just that the
   source calc mentions `var(--glass-depth)`) — a device-free evaluator that computes the LERP at the three
   grades and fails on a flat result, so the freeze cannot re-land green.

**src SHAs preserved (no src edited by this judge):** `glass-deep.css` `8bf3c4a2` · `glass/deep.css`
`ec048808` · landed in `841f3768`. Fix owed → routes to a build-FIX agent (its STEP 0.4).
