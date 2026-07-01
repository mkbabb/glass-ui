# KS-PAPER — CORPUS grounding (disk-true state + every prior paper decision)

**Lane:** KS-A · PAPER · CORPUS researcher. **Date:** 2026-07-01 · **HEAD:** `fa6ed40a` (tranche/BG).
**Waves this feeds:** 14.1 `W-PAPER-TEXTURE-UNIFY` / `-GRAIN-REAL` (raster tooth PRIMARY) · 14.3-adjacent
congruence · 17.5 `W-GLASS-PAPER-CONGRUENCE` · the LX.2 no-double-warm CEILING (owned by 14.1).
**Fence honored:** corpus grounding + disk-true state ONLY; ZERO src/demo/scripts edits; siblings read-only;
every corpus claim cites file:line. **Sibling of** `research/PAPER-sota.md` (the SOTA half — this is the
DISK/HISTORY half; they compose, they do not duplicate). Its §7 golden path + §8 gate shape are the SOTA
synthesis; this file gives the KS author the *exact current bytes* + *every prior decision* so the spec
BUILDS on disk and never re-attempts the two rejected mechanisms.

---

## 0 · The one-paragraph orientation (read this first)

The paper register has been DESIGNED three times and REJECTED (the SVG-noise path) twice. On disk RIGHT NOW
the register is a **coarse grey saturate=0 feTurbulence speckle** (`paper.css:44`) composited
`multiply`(light)/`screen`(dark) at α `0.21`/`0.16` — the GOLDEN's *blend law* landed but its *dual-band
warm* did not, and WS9's *warm feDiffuseLighting* never landed at all. The warmth is designed to come from
the SUBSTRATE behind the grey tooth (the "LIBRARY FENCE" — `paper.css:35`). That fence broke live when
`BG.W-PAPER-GRAIN-OPTIN` (`3f200f1d`) + `BG.W-FIELD-AURORA` (`274a2a6e`) removed the universal warm plane,
leaving grey tooth over a bare recessive aurora → **metallic-gray** (the D-2 defect, fixed demo-side at
`e40e5095`). The LIVE PLAN (row 14.1) INVERTS the WS9 priority: a **committed warm RASTER tooth-tile is now
PRIMARY** (engine-stable by construction), `feDiffuseLighting` demoted to an `@supports` enhancement. GU-1
`--glass-key-direction` (the single-light spine the azimuth derives from) is **NOT on disk yet** — it is a
14.1 §0 precondition. The KS author's job: perfect row 14.1 as *warm raster tooth PRIMARY + one-light spine
+ register fence + no-double-warm ceiling*, building on the exact bytes below.

---

## 1 · DISK-TRUE current state (the exact bytes the build edits — cite these)

### 1.1 · The token sources

| token | file:line | current value (disk) | role |
|---|---|---|---|
| `--paper-grain-tooth` | `paper.css:44` | `feTurbulence bf='0.04 0.09' 2-oct seed=7 stitch` → `feColorMatrix saturate=0` (GREY) → `feComponentTransfer` slope-1.8/intercept-(-0.4) contrast-stretch + `feFuncA slope=0 intercept=1` (FULL-OPAQUE alpha) → rect. `color-interpolation-filters='sRGB'` PINNED. 140px tile. | THE loud PAPER tooth. **Grey by construction** (saturate=0). |
| `--paper-grain-tile` | `paper.css:45` | `140px` | tooth tile period |
| `--paper-clean-texture` | `scale-paper.css:131` | `feTurbulence bf='0.65' 4-oct stitch` → `saturate=0`, `opacity='0.04'` baked on rect. 200px. | the FINE neutral whisper — **the A2 rename target → `--glass-grain-fine`** |
| `--paper-aged-texture` | `scale-paper.css:132` | `feTurbulence bf='0.5' 5-oct stitch` → `saturate=0`, `opacity='0.06'` baked. 200px. | coarser aged-stock rung — **atlas LIVE by-name consume; KEEP, re-author, never rename** |
| `--paper-grain-opacity` | LIGHT `glass-fx.css:31` = `0.21` · DARK `dark-arm.css:247` = `0.16` | the paper alpha (light nudged 0.22→0.21 sub-JND at `BG.W-PAPER-GRAIN-OPTIN`) | paper-register alpha ONLY |
| `--glass-grain-opacity` | LIGHT `glass-fx.css:17` = `0.025` · DARK `dark-arm.css:241` = `0.045` | **the LIBRARY FENCE — byte-untouched** | glass whisper alpha |
| `--paper-texture-size` | `offsets.css:142` | `200px 200px` | `.paper-texture`/glass-`::after` tile |
| `--paper-grid-opacity` | `scale-paper.css:175` | `0.08` | the GEOMETRIC grid sibling (orthogonal register) |

> **NOTE — a doc/disk drift the KS author must not propagate:** `paper.css:31` comment says light `0.22`;
> the LIVE token (`glass-fx.css:31`) is `0.21` (the `BG.W-PAPER-GRAIN-OPTIN` sub-JND nudge, `3f200f1d`).
> The SOTA sibling (`PAPER-sota.md:24,199`) also cites `0.21` correctly. Bind the DISK value `0.21`/`0.16`
> as the *starting anchor*, expected to move once alpha scales a baked (not contrast-stretched) tile
> (`SPEC-pass2.md:69` M5; `PAPER-sota.md:199-201`).

### 1.2 · The utilities + recipes (where the tokens are consumed)

- **`paper.css:48-59` `@utility paper-underpaint`** — `position:fixed inset:0 z-index:-1`, `background-image:
  var(--paper-grain-tooth)`, `background-size: var(--paper-grain-tile)`, `opacity: var(--paper-grain-opacity,
  var(--glass-grain-opacity))`, `mix-blend-mode: multiply`. Dark arm `paper.css:61-66` → `screen`.
- **`paper.css:68-92` `@utility paper-grain-overlay`** — `isolation:isolate` + `::after` tooth overlay
  (`border-radius:inherit`, same tooth token/size/opacity, `multiply`). Dark `::after` `paper.css:88-92` →
  `screen`.
- **`cards.css:126-135` `.paper-texture`** — `background-image: var(--paper-clean-texture)`,
  `background-size: var(--paper-texture-size)`, `background-blend-mode: multiply` (dark → `screen`
  `:133-135`). **⚠ this is a PAPER surface reading the FINE CLEAN token, not the tooth** — the WS9 re-point
  map (`SPEC-pass2.md:88`) redirects it to `--paper-grain-tooth`.
- **`glass/ladder.css:472-495` `.glass-{wash,quiet,resting,floating,overlay}::after`** — the GLASS whisper:
  `background-image: var(--paper-clean-texture)`, `opacity: var(--glass-grain-opacity)`, `mix-blend-mode:
  overlay`, + the `--glass-grain-engage-duration` opacity cross-fade (the LIQUIDHOVER anti-pop, `ladder.css:
  462-495`; design-idioms §12 `:398-440`). **The A2 re-point target → `--glass-grain-fine`.**
- **`dock/shell.css:267` `.glass-dock::after`** — `background: var(--paper-clean-texture)` (dock whisper).
  **A2 re-point target → `--glass-grain-fine`.**
- **`cards.css:180-204` `.paper-grid`** — the GEOMETRIC two-frequency engineering-grid card interior
  (`--paper-grid-texture`, `--grid-pitch`), `multiply`/`screen`. **A SIBLING register, NOT this family** —
  it composes WITH the organic grain, never collides (the `::before`/`::after`/host-bg-image pseudo-budget
  seam, `cards.css:159-179`). Do NOT fold it into the tooth.

### 1.3 · The a11y carve (disk)

- `paper.css:111-120` — `@media (prefers-reduced-transparency: reduce)` zeros `.paper-underpaint` +
  `.paper-grain-overlay::after` opacity. `paper.css:122-128` — PRM guards `animation:none` (the underpaint
  is a still texture; the guard is for a future drift).
- `glass/a11y-fallback.css:15,64` — zeros `--glass-grain-opacity` (glass whisper). **`--paper-grain-opacity`
  is NOT in a11y-fallback.css** — the reduced-transparency zero lives only in `paper.css` per-utility. The
  GOLDEN §6 (`:302`) + `PAPER-sota.md:342-344` (challenge/2 R4) flag this as genuinely-absent: the KS spec
  should ADD `--paper-grain-opacity: 0` to `a11y-fallback.css` so a token-level consumer inherits the zero
  (not only the two named utilities).

### 1.4 · The `.paper-ink-mark` register (the THREE-underline fence — DO NOT touch)

`glass/surface-axis.css:93-106` mints `.paper-ink-mark` — a bare 2px `--foreground` ink hairline on paper
(NO plate/blur/glass), knob `--paper-ink-mark-weight` (2px) + `--paper-ink-mark-color`. Consumed by the
SegmentedTabs underline indicator (`segmented-tabs.css:307-382`) + the math-paper section rail. **This is a
STRAIGHT structural mark, never wobbled** (the three-underline fence: `.paper-ink-mark` structural ·
`HandMark shape="underline"` hand-voice wobble — `SPEC-pass2.md:27`; design-idioms §"three-underline-register
fence"). The KS-PAPER spec must NOT fold the ink-mark into the grain family.

### 1.5 · GU-1 `--glass-key-direction` is NOT on disk (14.1 §0 precondition)

grep confirms: disk carries `--glass-key` (the upper-right edge-SELECT px pair `--glass-key-{lit,shade}-x/y`,
consumed by rim/shadow/cards across ~10 files) but **NO `--glass-key-direction`**. The GU-1 mint
(`--glass-key-direction: -0.375` = tan 20.56° down-left soft FILL → key from upper-right at azimuth
`atan2(-1, 0.375) ≈ 290.56°`) is a 14.1 §0 value-only precondition (`SPEC-pass2.md:35-45`;
`GU-1-glass-key-fill.md`). The paper tooth's baked emboss direction AND the `@supports` azimuth literal both
derive from this token. **14.1 lands GU-1 FIRST** (mint + derive 3 under-shadow X via `calc(Npx *
--glass-key-direction)` + re-point `dock/overflow.css:143` + re-approve 7 under-shadow baselines).

---

## 2 · THE TWICE-REJECTED HISTORY (binding — SEED line 54; the build must not repeat it)

The user rejected the SVG-noise paper register **TWICE**, verbatim **"disgusting metallic."** This is the
load-bearing fence. The two rejections + the mechanism that produces the metal read:

1. **The first register** (pre-BD): a `feTurbulence bf=0.65 4-oct` fine cloud + `feBlend multiply
   in2=SourceGraphic` — a self-cancelling no-op (fine cloud averages to grey on hiDPI; `overlay`/`soft-light`
   collapse to IDENTITY on the L≈0.98 cream / near-black ink poles). Measured std **0.02–0.86** = invisible
   by math (`paper.css:9-14`; GOLDEN §0 `:17-46`). The user: *"I don't see any paper grain or grit anywhere"*
   (GOLDEN epigraph `:3`). This is the *invisible* failure.
2. **The metallic rejection** (the "disgusting metallic" one, `DEV-A2:241`): any attempt to make the SVG
   relief WARM + LIT via `feDiffuseLighting` reads as **anisotropic brushed-metal sheen**. The mechanism
   (MDN-confirmed, `PAPER-sota.md:143-145`): `feDiffuseLighting` *"lights an image using the alpha channel as
   a bump map"* — a single distant key over noise computes surface normals that read as METAL at any
   non-trivial `surfaceScale` (WS9 M4: *"specular IS the metal"*, `SPEC-pass2.md:68`). **The one thing the
   user rejected is exactly what the primitive is built to produce.**

**Two structural amplifiers of the metal read (both cross-engine, both silent):**
- **`color-interpolation-filters` defaults to `linearRGB`, not sRGB** (`PAPER-sota.md:132-140`). challenge/2
  R1 MEASURED a **51% std swing (3.65→5.54) + 6-point mean-darken** purely from this one attribute
  (`challenge/2.md:56-72`). The disk tooth PINS `sRGB` (`paper.css:44`) — the KS spec must KEEP that pin on
  any `@supports` enhancement (`SPEC-pass2.md:52`; `PAPER-sota.md:361`).
- **`lighting-color` `oklch()` in a data-URI is unproven in Safari** → falls back to white → metallic IN
  SAFARI ONLY (a silent one-engine regression; WS9 M2 `SPEC-pass2.md:66`). The enhancement must ship a warm
  HEX ecru, never oklch — and be captured on REAL Safari (`wkshot.m`, not bundled Playwright,
  `SPEC-pass2.md:167,200`).

**The pre-decided escape → now the DEFAULT.** WS9 pass-2 pre-wired *"a committed warm RASTER paper tile … a
scanned tooth cannot read metallic"* as the falsifier escape (`SPEC-pass2.md:74,186`). The RESPEC-GESTALT
amendment (GC-FC7 / `DEV-A2:241-247`) INVERTED the priority: **the raster is PRIMARY, feDiffuseLighting is
the `@supports` enhancement.** *"A transposition, not a third procedural attempt at the exact mechanism the
eye rejected"* (`DEV-A2:246`). The SOTA sibling confirms raster-primary is the SOTA-correct decision on FIVE
independent grounds (`PAPER-sota.md:182-185`). **The KS author must frame 14.1 as raster-PRIMARY and treat
any framing where the SVG enhancement is load-bearing for the close as the 3×-shipped trap
(`SPEC-pass2.md:20`).**

---

## 3 · THE D-2 LIVE-FIX (the metallic recurred AGAIN — the third data point; e40e5095)

The metallic gray recurred LIVE during BG execution — the third instance of the class, and the direct
evidence the KS spec must design against. `e40e5095` (`D2-paper-grain-DELTA.md`):

- **Root cause (CONFIRMED):** `3f200f1d` (`BG.W-PAPER-GRAIN-OPTIN`) demoted the universal `<PaperBackdrop>`
  grain plane → per-surface opt-in; `274a2a6e` (`BG.W-FIELD-AURORA`) retired the warm `.paper-field` CSS
  plane onto a recessive `<Aurora>` (`vividness:0`, `opacity-ceiling:0.5`). **The grey saturate=0 tooth gets
  its warmth from the substrate behind it — with the universal warm plane gone, a `paper-grain-overlay`
  surface over the bare recessive aurora had NO warm substrate → the grey multiply tooth desaturated the
  surface below the `BA.W-NO-GRAY` warm-chroma floor (C 0.02) → metallic-gray** (`DELTA.md:11-19`).
- **Measured before/after (both modes, dual-engine Chrome M5 Max + REAL Safari/WebKit 26):**

  | surface | before C | after C (light) | verdict |
  |---|---|---|---|
  | `/foundations/paper-glass` glass-wash tile | 0.0093 | **0.0449** | gray→warm |
  | glass-quiet | 0.0102 | **0.0339** | gray→warm |
  | glass-resting | 0.0107 | **0.0253** | gray→warm |
  | glass-floating | 0.0116 | **0.0197** (gamut-bound near-white L0.75) | gray→at-floor |
  | `/foundations/paper-texture` whole page | full-viewport GRAY noise wash | warm-cream, grain contained per-panel | gray→warm |

- **The fix was DEMO-SIDE (`e40e5095`, 4 files — 3 demo + 1 gate-allowlist):** a recessive WARM CSS radial
  behind the tier tiles (`paper-glass.vue`), `contain:paint` per `<PaperBackdrop>` + `--paper-underpaint-color`
  wired to panel bg (`paper-texture.vue`), and `--story-paper-wash` LIGHT `transparent → color-mix(in srgb,
  var(--card) 70%, transparent)` (`story-hero.css` — the never-landed GOLDEN leg-2 finally applied,
  `DELTA.md:52-54`). **The library grain utility was BYTE-UNTOUCHED** (`DELTA.md:62-64`) — the demo got the
  warm substrate the removed universal plane used to provide.

**The KS lesson (load-bearing for 14.1):** the substrate-warmth-fence is FRAGILE — a grey tooth is one
plane-removal away from metallic every time. **The warm RASTER tooth carries warmth AT SOURCE** (chroma
≥0.020 baked into the tile, `PAPER-sota.md:220-223`), so the tooth reads warm *even over a bare/dark
substrate* — this is the deeper reason raster-primary is correct: it makes the D-2 class STRUCTURALLY
impossible, not just fixed on the current routes. **Two residuals NOT fixed by D-2** (flagged for the KS
spec / other lanes, `DELTA.md:105-111`): (a) the StoryHero WASH-CARD over the recessive shell aurora reads
gray-cream (a shell/field-recessiveness concern, not a grain surface); (b) `/foundations/intro`
category-card header zones read gray on the bespoke colorful hero.

---

## 4 · THE BIFURCATED `--paper-clean-texture` (pass-1 B5 — the A2 register split, disk-confirmed)

WS9 A2 (`SPEC-pass2.md:10,84`) resolves the register split: the glass whisper is a SEPARATE NEUTRAL source,
`--paper-clean-texture` clean-break renamed to its true home `--glass-grain-fine`. On disk RIGHT NOW the
token has **THREE live `var()` consumers spanning BOTH registers** (the bifurcation the split must resolve):

| consumer | file:line | register | WS9 re-point disposition (`SPEC-pass2.md:88-92`) |
|---|---|---|---|
| `.paper-texture` bg-image | `cards.css:127` | **PAPER** | → `--paper-grain-tooth` (the warm-lit source) |
| `.glass-*::after` bg-image | `glass/ladder.css:485` | GLASS whisper | → `--glass-grain-fine` (renamed neutral) @ byte-untouched `--glass-grain-opacity` |
| `.glass-dock::after` bg | `dock/shell.css:267` | GLASS whisper | → `--glass-grain-fine`, same |

Plus **3 DEAD-PROSE mentions** (comments, no `var()` — scrub in the rename edit): `tab-button.css:100`,
`btn.css:101`, `ladder.css:467`.

**The gate re-point (the silent-de-fang trap, `SPEC-pass2.md:94-97`):** the renamed token's named reads in
GATES must re-point in lockstep onto `--glass-grain-fine` or they green vacuously:
`proof-glass-cohesion.mjs` (the grain-always-present POSITIVE clause + the `.grain-x`/`.grain-y` none→image-swap
fixtures), `proof-glass-cal.mjs` (the D3 disco-grain NEGATIVE detector — if it keeps grepping the DELETED old
name it can never appear → the assert goes VACUOUSLY TRUE and stops biting), `proof-paper-grid.mjs`
(comment-only reconcile). **`--paper-aged-texture` is the OPPOSITE — NEVER rename** (atlas LIVE by-name
consume, `atlas/src/platform/design/recipes.css:511` + `PaperBackdrop.vue:32`); KEEP + re-author its VALUE
warm-lit, and FLAG the value-change on the asks ledger (it propagates silently on `npm update`,
`SPEC-pass2.md:26,131`).

---

## 5 · THE PERCEPTUAL NUMBERS (measured across the corpus — the calibration anchors)

The build calibration numbers, cited to the measurement source (the SOTA sibling §4 synthesizes these; this
is the raw corpus provenance so the author can trace each):

| number | value | source | note |
|---|---|---|---|
| JND floor (std-dev, content-free patch) | **std 3.0** | GOLDEN §8 `:347` | the bare "do I see grit" floor |
| **no-squint floor (light)** | **std ≥ 4.5** | challenge/3 R2 `:83` | the ACCEPTANCE bar (the epigraph forbids squinting; std 3.66 IS the squint floor) |
| GOLDEN spike measured (linearRGB default) | light **3.65** / dark **3.86** @ α 0.22/0.16 | GOLDEN §8 table `:372-377`; challenge/3 R1 `:196` (independently reproduced 3.66/3.83) | the anchor, captured under the linearRGB default |
| sRGB-pinned re-measure | std **5.54**, mean **236.3** @ SAME 0.22 | challenge/2 R1 `:56-62` | **sRGB bites ~51% harder → the alpha steps DOWN under the pin** |
| dirt ceiling (mean-L drift) | **< ~5%** from un-grained plate | GOLDEN §2.3 `:156` (247→242 = 3%); letterpress law (Alphabet Press, `PAPER-sota.md:206`) | ink coverage < half printable area → grain modulates AROUND the mean |
| warm-hue floor (SOURCE) | **C ≥ 0.020** OKLab, **2-3× margin at bake (~0.04-0.05)** | `BA.W-NO-GRAY`; WS9 M2 `:66`; row 14.1 | assert on SOURCE hex/tile, NOT the diluted composite (the headless-green trap) |
| LX.2 landed tile range | **C 0.02-0.045** | `EXECUTION-PROGRESS:188`; D-2 after-table §3 | the ceiling anchor for no-double-warm |
| metal boundary | high `surfaceScale` + high anisotropy at fine bf | WS9 M4 `:68` (sweep {1.0,1.4,1.7}, pick LOW) | a RASTER non-issue (matte tile has no specular term); a constraint on the SVG enhancement ONLY |

**The TARGET for the build (SOTA §4 verdict, `PAPER-sota.md:200,226`):** re-measure std on the ACTUAL raster
over the WASHED plate → **std ∈ [4.5, ~7]** light (no-squint but not dirt); mean-L drift **< ~5%**; SOURCE
chroma **≥ 0.020**. The disk 0.21/0.16 is the STARTING anchor, expected to move (a baked tile is not a
contrast-stretched turbulence — its std is baked, the alpha scales it).

---

## 6 · THE SINGLE-LIGHT SPINE (17.5 · the paper+glass congruence · one key)

17.5 `W-GLASS-PAPER-CONGRUENCE` owns the `--glass-key-*` SPINE that ties glass specular/bevel + the
under-shadow FILL + the paper tooth relief to ONE light source (`AMENDED-GESTALT-PLAN:169` KEEP, distinct
capture axis; `SPEC-pass2.md:18`). The mechanism:

- **ONE light, azimuth 290.56°** (key from upper-right). `--glass-key-direction: -0.375` = tan 20.56°
  down-left soft FILL → `azimuth = atan2(-1, -(-0.375))·180/π mod 360 ≈ 290.56°` (`GU-1-glass-key-fill.md:23`;
  `SPEC-pass2.md:45`). The 24° gap to the loud 315° cel key is DELIBERATE — the grain is a SOFT diffuse
  relief that leans the soft FILL, not the loud cast (`SPEC-pass2.md:9`).
- **"One key" = HEMISPHERE-coherence, not angle-identity.** The gate asserts `azimuth == atan2(token) ±1°`
  + a hemisphere-coherence clause (`--glass-key-lit-x/-y` sign, `--glass-key-direction` sign, and the azimuth
  all agree upper-right) — the ONLY guard against silent one-key drift (`SPEC-pass2.md:45`).
- **A data-URI cannot read `var()`** — so the azimuth ships as a HARDCODED literal `290.56` gate-locked
  `|literal − 290.56| < 1°`. **The raster-primary decision does NOT dissolve the spine** — the raster tile is
  BAKED with a directional relief leaning the same hemisphere, and the `@supports` enhancement carries the
  azimuth literal (`PAPER-sota.md:52-53,328`). SOTA §5 elevates 17.5 as the SOTA-differentiated cohesion
  mechanism: Apple's is per-surface runtime adaptation; glass-ui's is a gate-locked single-source-of-light
  TOKEN spine (`PAPER-sota.md:247-254`).

---

## 7 · THE REGISTER FENCE + THE LX.2 NO-DOUBLE-WARM CEILING (owned by 14.1)

**The register fence (A2, BD P2 cardinal — the load-bearing cohabitation rule):**
- Warm tooth = PAPER only (`--paper-grain-tooth`). Neutral whisper = GLASS only (`--glass-grain-fine`, the
  A2 rename of `--paper-clean-texture`). `--glass-grain-opacity` (0.025 light / 0.045 dark) **BYTE-UNTOUCHED**
  — per-mode fence π, NOT a flat `== 0.025` (DELTA-ASSAY §3.7; `SPEC-pass2.md:25`).
- **NO warm tooth ever touches a glass surface** — WS9 A2 proved re-pointing the glass whisper onto the
  warm-lit tooth is a no-win (imperceptible@0.025 = churn, OR perceptible = the directional sheen LEAKS into
  the chrome, `SPEC-pass2.md:10`). *Paper is loud+warm, glass is a whisper+neutral — that separation IS the
  design* (GOLDEN §1 `:68`). The materials COHERE through the SHARED LIGHT (17.5), not a shared texture.

**The LX.2 ceiling (owned by 14.1 — `EXECUTION-PROGRESS:188`, `AMENDED-GESTALT-PLAN:98`):** the tooth is
warm ONCE — the TILE carries the warmth; the WASH (`--story-paper-wash`) carries a SEPARATE small warm tint.
They must NOT COMPOUND into a brassy over-warm plate. The DELTA-ASSAY warm-floor gate (chroma ≥ floor) is the
FLOOR; **LX.2 adds the CEILING** — the composite chroma bounded from ABOVE so warm-substrate + warm-tooth ≤
the identity ceiling, not double-counted. Measured on the LX.2 landed range (C 0.02-0.045) as the ceiling
anchor (`PAPER-sota.md:334-336,403`). **Both gates bound the composite** — a source ≥0.020 floor AND a
composite ≤ ceiling. This is the D-2 lesson made into a two-sided gate: too little warmth = metallic gray
(the floor); too much compounding = brassy over-warm (the ceiling).

---

## 8 · THE BD GREENFIELD CORPUS (brainstorm → GOLDEN → challenge → DELTA — what to build on)

The greenfield loop for paper (`docs/tranches/BD/greenfield/paper-morphism/`):

- **`GOLDEN.md`** — the canonical synthesis. The BOLDEST MOVE (§7 `:315-323`): retire the self-cancelling
  overlay/soft-light + muddy single fine-noise; replace with a TWO-BAND grey-speckle (coarse anisotropic
  TOOTH `bf 0.16 0.21` + fine FIBER `bf 0.62`, a golden octave apart so they never beat) composited
  `multiply`(light)/`screen`(dark). **What LANDED on disk vs the GOLDEN:** the BLEND LAW landed
  (`multiply`/`screen`), the coarse-tooth thesis PARTIALLY (disk `bf 0.04 0.09` is between the old fine 0.65
  and the GOLDEN 0.16 0.21 — coarser than the invisible cloud, but NOT the dual-band); the SECOND fiber band
  did NOT land; the tooth stayed GREY (saturate=0). So the GOLDEN's *"visible"* half landed, its *"warm"*
  half did not — which is precisely the D-2 gap.
- **`challenge/2.md`** — the sRGB-pin refutation (R1, the 51% std swing measurement) + the premultiply/blend
  cross-engine deltas. **The disk tooth already pins sRGB** (`paper.css:44`) — this challenge is honored.
- **`challenge/3.md`** — the no-squint floor (R2 `:83`: raise the gate std 3.0 → ≥4.5 light; the spike sat
  at the SQUINT floor 3.66, mismatched to the acceptance bar) + the through-glass spike ask (R5 `:164` — the
  LEAST-proven §5 application, a build precondition + gate arm) + the a11y-fallback absence (R4 — add
  `--paper-grain-opacity` to `a11y-fallback.css`).
- **`DELTA-ASSAY.md` / `WAVE-AMENDMENT.md`** — augment (never fork) the paper wave with the texture+blend
  redesign; the π rewritten to the std-dev gate both modes both engines. **The KS author builds on the GOLDEN
  DIRECTION but re-bases it onto RASTER-PRIMARY** (the RESPEC-GESTALT inversion supersedes the GOLDEN's
  SVG-dual-band texture — the GOLDEN is a WARM SVG relief, which is exactly the metallic-prone path; the
  raster carries the same *warm-tooth-on-a-washed-plate* percept engine-stably).

---

## 9 · THE MATH-PAPER GOLD STANDARD + COVERAGE (grain as MATERIAL, not buried backdrop)

The reference calm-paper surface is `demo/stories/compositions/math-paper.vue` — a `border-l-[3px]`
section-accent rail + mono section-label + fira-code math block on a `paper-grain-overlay` (CLAUDE.md
§"calm content idiom" gold standard). **The headline COVERAGE miss** (GOLDEN §3 `:188-220`; DELTA-ASSAY §2):
grain is a BURIED backdrop today; the user wants it "VISIBLE everywhere paper morphism is claimed." The
GOLDEN puts grain where the eye rests via already-shipping props (KISS, no new mechanism):
- `ShowcaseFrame :grain` on `foundations/typography.vue` — **the paper HOME wears ZERO grain today, the worst
  miss** (`:203`). Wire the prop.
- `Card :grain` / `surface="paper"` on math-paper's worksheet card + paper-glass's opaque specimens (`:198`).
- The "paper felt through glass" through-glass composite (§3.4, challenge/3 R5) — the least-proven; a build
  precondition + `proof:ba-gestalt` paper-band arm (`PAPER-sota.md:263-268,345-347`).

**The print vocabulary (complete, anti-kitsch):** warm wash (load-bearing paper-white substrate) + the
DEBOSS rider (free static ink-into-tooth on the shared 290.56° azimuth, `SPEC-pass2.md:72`) + grain-on-
headline `@supports (background-clip:text)` clipping the tooth into DISPLAY letterforms (headline-only,
solid-ink fallback, `SPEC-pass2.md:99`). **The deckle (torn-paper px-amplitude) is FENCED** — FORBIDDEN
skeuomorphic excess (atlas FD1/DL2 §P4, `SPEC-pass2.md:29`; `PAPER-sota.md:298-301`). Grain + deboss + wash
is the complete print vocabulary; anything more is kitsch.

---

## 10 · WAVE-BINDING SUMMARY (what each fed wave OWNS, per the disk + the plan)

| wave (cursor id) | owns | disk anchors | binding decision |
|---|---|---|---|
| **14.1 `W-PAPER-TEXTURE-UNIFY`/`-GRAIN-REAL`** | GU-1 §0 mint FIRST · warm RASTER tooth PRIMARY (retire the grey `feTurbulence` cloud at `paper.css:44`) · `feDiffuseLighting` `@supports` enhancement SECOND · migrate 6 consumers (§4) · the A2 rename → `--glass-grain-fine` · LX.2 no-double-warm CEILING | `paper.css:44` (tooth) · `scale-paper.css:131` (rename) · `:132` (aged re-author, atlas) · `glass-fx.css:31`/`dark-arm.css:247` (alpha) | raster PRIMARY (D-2 class killed at source); floor C≥0.020 SOURCE + LX.2 ceiling ≤ landed range; azimuth==atan2(token) ±1° |
| **14.3 `W-HANDMARK-PERFECT`** (14.3-adjacent congruence for this lane) | HandMark hand-voice + pencil-boil clause (14.4) · the three-underline fence held (`.paper-ink-mark` STRAIGHT, HandMark wobbles) | `glass/surface-axis.css:93` (ink-mark, DO NOT touch) · HandMark dir | ONE pencil-boil engine under every wobble; graphite-in-tooth §1/§2-gated |
| **17.5 `W-GLASS-PAPER-CONGRUENCE`** | the `--glass-key-*` SPINE (one light) born-RED→ci; distinct capture axis | GU-1 token (14.0 precond) · the 290.56° azimuth literal in the raster emboss + `@supports` arm | one key = hemisphere-coherence, gate-locked; raster-primary does NOT dissolve the spine |
| **LX.2 CEILING** (owned by 14.1, DONE floor at `e40e5095`) | the no-double-warm composite-chroma UPPER bound | LX.2 landed C 0.02-0.045 as ceiling anchor | warm ONCE (tile warm + wash warm ≤ ceiling, not compounded) |

---

## 11 · GAPS / OPEN FRONTIER the KS author must resolve (disk-grounded)

1. **The GOLDEN texture is SVG-dual-band; the LIVE plan is raster-primary — the KS spec must re-base the
   GOLDEN §2.1 texture onto a COMMITTED warm raster tile** (512px seamless-mirror, warm-ecru matte,
   directionally embossed leaning 290.56°, base64 in the SAME `--paper-grain-tooth` token, hash-gated). The
   SOTA sibling §7 gives the recipe; the eye picks the exact tile at P1.
2. **GU-1 is not on disk** — 14.1 lands it FIRST (value-only §0, 7 baseline re-approvals). Do not assume the
   spine token exists.
3. **The bifurcated `--paper-clean-texture` (3 live consumers, 3 dead-prose) + the lockstep gate re-point** —
   the rename is not one edit; it is a rename + 3 consumer re-points + ~5 gate-read re-points + 3 prose
   scrubs, or the split greens vacuously (§4).
4. **`a11y-fallback.css` genuinely lacks `--paper-grain-opacity: 0`** — add it (challenge/3 R4; §1.3).
5. **The through-glass "paper felt through glass" spike is the least-proven** — a build precondition +
   `proof:ba-gestalt` paper-band arm, both modes, over a saturated field (challenge/3 R5; §9).
6. **The `@supports` enhancement accept/reject is a LIVE-capture decision** — if feDiffuseLighting adds
   nothing perceptible over the raster on supporting engines, DROP it per KISS (the raster-primary already
   closes the wave; `PAPER-sota.md:406-408`). Do not make the enhancement load-bearing.
7. **The D-2 residuals** (StoryHero wash-card gray, `/foundations/intro` header gray) are OTHER lanes' —
   note the cross-reference, do not fold them into the grain spec (`DELTA.md:105-111`).

---

## 12 · SOURCES (corpus — file:line)

- `src/styles/paper.css` (:9-14 invisible-history, :35 library-fence, :44 tooth, :48-92 utilities, :111-128 a11y)
- `src/styles/tokens/scale-paper.css:131` (clean→rename), `:132` (aged, atlas), `:175` (grid-opacity)
- `src/styles/tokens/glass-fx.css:17` (glass-grain 0.025), `:31` (paper-grain 0.21)
- `src/styles/tokens/dark-arm.css:241` (glass-grain 0.045 dark), `:247` (paper-grain 0.16 dark)
- `src/styles/cards.css:126-135` (.paper-texture — PAPER surface on clean token), `:180-204` (.paper-grid sibling)
- `src/styles/glass/ladder.css:462-495` (glass whisper `::after` on clean token, LIQUIDHOVER anti-pop)
- `src/styles/dock/shell.css:267` (.glass-dock `::after` whisper)
- `src/styles/glass/surface-axis.css:93-106` (.paper-ink-mark register — three-underline fence)
- `src/styles/glass/a11y-fallback.css:15,64` (glass-grain zero; paper-grain ABSENT)
- `src/styles/offsets.css:142` (paper-texture-size 200px)
- `docs/tranches/BG/converge/BG-WS9-paper-deep/SPEC-pass2.md` (THE primary paper mechanism spec; A1-A4; M1-M6; §0 GU-1; §2 A2 split; the raster escape)
- `docs/tranches/BG/audit/visual/live-fixes/D2-paper-grain-DELTA.md` (the third metallic recurrence + fix + measurements)
- `docs/tranches/BD/greenfield/paper-morphism/GOLDEN.md` (the two-band GOLDEN + the std-dev gate + spike measurements)
- `docs/tranches/BD/greenfield/paper-morphism/challenge/{2,3}.md` (sRGB 51% swing; no-squint ≥4.5; through-glass; a11y-absence)
- `docs/tranches/BG/audit/RESPEC-GESTALT/AMENDED-GESTALT-PLAN.md:94-101,169` (rows 14.1/14.3/17.5)
- `docs/tranches/BG/audit/RESPEC-GESTALT/pass-2/DEV-A2-restructure-rows-10-19.md:241-247` (the raster-primary inversion ruling)
- `docs/tranches/BG/execution/EXECUTION-PROGRESS.md:81,82,127,181,188` (row status; LX.2 DONE + ceiling ownership)
- `docs/precepts/design-idioms.md:93-111,398-440` (paper register homes; ink-mark; the grain pop-kill §12)
- commits: `e40e5095` (D-2 fix), `3f200f1d` (grain-optin, 0.22→0.21), `274a2a6e` (field-aurora retire .paper-field), `9e13965d`/`b69ec598` (W-CATEGORY-CARD-WARM metallic bento fix)
- sibling: `research/PAPER-sota.md` (the SOTA half — §7 golden path, §8 gate shape, §4 numbers)
