# BG.W-PAGE-COMPONENT-AUDIT (17.6) — the 480-capture cross-page harmonized-whole DELTA

> ## POST-DELTA UPDATE (2026-07-10, audit triumvirate) — the ROOT CAUSE named; every OBSERVATION in this DELTA CONFIRMED
> The audit triumvirate re-derived this FAIL against the tree. **No claim in this DELTA is falsified** — all its
> observations are accurate (this is a correct-but-SHALLOW DELTA, unlike the concentric one whose content-visibility
> root cause was empirically wrong). This block adds the precise MECHANISM the DELTA stopped short of, so no future
> agent re-chases at symptom level. Full write-up: `docs/tranches/BG/audit/W-PAGE-COMPONENT-AUDIT-COMPLETION-AUDIT.md`.
>
> **The named root cause (nav/tabs + motion/scroll — the "0 GL canvases" this DELTA observed):** the warm-cream field
> is NOT the base page (`--background = --neutral-0 = hsl(40 30% 98%)`, L98 → ≈0.005 OKLab chroma, imperceptible);
> it is the global SHELL `<Aurora>` (`AppShell.vue:320-328`, warm-projected `[25,95]`), mounted IFF `shellFieldActive`.
> `shellFieldActive = !to.meta.focal` (`router.ts:107`); `focal = isFocalRoute(routeId, bg)` (`focal.ts:62-68`) returns
> true when `bg.kind ∈ GL_BG_KINDS`. `navigation → aurora` / `motion → constellation` (`manifest.ts:202,206`) mark both
> routes FOCAL by their GL kind → the shell aurora is SUPPRESSED. **But `StoryPage.vue:217` mounts `StoryHero` (which
> actually renders the field) ONLY on `variant === "hero"`, and both routes are page-variant (no `hero` flag).** So the
> focal flag removes the warm shell field while the page never mounts the GL field it assumed → ZERO GL contexts → the
> probe reads the neutral near-white/near-black base. It is a genuine defect in `focal.ts`: the predicate assumes a GL
> background-kind implies the page mounts that field, which only holds for HERO pages.
>
> **Framing correction (the ONE thing to not mislead on):** this DELTA's mustFix for navigation says "0 GL canvases
> mounted — the aurora is not compositing." Read literally that suggests an Aurora RENDER bug. The truth: the aurora is
> deliberately SUPPRESSED by the focal predicate and never re-mounted, so **zero auroras are ever instantiated** —
> nothing fails to composite; nothing is asked to. Do NOT chase an Aurora rendering defect.
>
> **`/compositions/hero` is a DIFFERENT mechanism (this DELTA has it right):** it IS a hero (`manifest.ts:1245-1254`),
> so StoryHero mounts the constellation correctly-as-designed — but a constellation is achromatic grey line-art over
> the near-white/near-black base → warmFraction=0 (light), a dead near-black void (dark). The field mounts; it carries
> no warm identity.
>
> **Fix (precise):** thread the story `hero` flag through `isFocalRoute` — `focal = (kind ∈ GL_BG_KINDS && isHeroPage)
> || SELF_STAGES_GL.has(routeId)` (`focal.ts`), and pass `story.hero` at the two `router.ts` call sites (`:52`, `:74`).
> Then nav/motion CONTENT pages become non-focal → the shell warm aurora composites behind them exactly as it already
> does for the CONVERGED forms/data/containers content pages. compositions/hero takes a warm underpaint/aurora/base
> plate (SECONDARY fix). This corrects the record with the named mechanism; the DELTA's observations stand verbatim.

**Class:** [P] paint-gated capstone close · **Device-free gate:** `proof:warm-identity` (cross-page arm) · **Instrument:** `tests-visual/coherence-congruence.spec.ts` · **Roster:** `docs/tranches/BG/audit/reflect/bg-page-audit-roster.md`

This is the NON-AUTHORING paint judge's input scaffold — the building agent does NOT fill the verdicts (the non-authoring fence). The device-free arm is GREEN (the convergence STRUCTURE landed); the operative all-converged verdict is a born-RED baseline the LOCAL late-sweep + the judge flip.

## What the device-free arm proves (GREEN on-edit)

- The cross-page per-category convergence roster is present + column-schema-sound.
- The 7 un-converged Pass-E categories (display · containers · data · feedback · navigation · compositions · motion) each carry a convergence row (GA-10 / F7.4).
- The 4 C2-SENTINEL routes (forms/inputs · compositions/math-paper · containers/sheet · data/metric-stack) are enrolled (COHERENCE FOLD G7 L8).
- Every `/cat/story` route resolves to `demo/stories/<cat>/<story>.vue` on disk (routeSeeds HARD-RED).
- The 480-capture instrument `coherence-congruence.spec.ts` is on disk + excluded-with-rationale from `--run pi` (the local late-sweep, not a 480-to-ci promotion).
- ANTI-EVASION armed: a CONVERGED roster row over a missing/not-warm/cerulean composite REDs the close.

## The pass-bar (the non-authoring judge)

Run `coherence-congruence.spec.ts` over the BUILT `:5200` bytes on a real GPU, BOTH modes, BOTH engines (Chrome ANGLE-Metal + real Safari/WebKit). For each enrolled route the composited FIELD region reads WARM (dominant-hue warm, not gray/cerulean/metallic). A row flips FAIL → CONVERGED IFF the fresh dual-engine capture passes the warm-identity band. Gesture rows carry a FRAME-SERIES (route-page-build ≥8 painted entrance frames; motion fps+gap-histogram+BUTTERY verdict). The 17.3 busy-aurora forward criterion rides the `compositions` row (the calm-light capsule over the busy aurora reads legible, the child-glyph un-tinted).

## Paint targets

| category | route | verdict |
|---|---|---|
| display | /display/atoms | PENDING |
| containers | /containers/dialog | PENDING |
| data | /data/metrics | PENDING |
| feedback | /feedback/toast | PENDING |
| navigation | /navigation/tabs | PENDING |
| compositions | /compositions/hero (+ 17.3 busy-aurora criterion) | PENDING |
| motion | /motion/scroll (frame-series) | PENDING |
| sentinel | /forms/inputs | PENDING |
| sentinel | /compositions/math-paper | PENDING |
| sentinel | /containers/sheet | PENDING |
| sentinel | /data/metric-stack | PENDING |

Captures land in `docs/tranches/BG/audit/visual/BG.W-PAGE-COMPONENT-AUDIT-paint/` (`<cat>-<story>-<engine>-<mode>-desktop-full.png`) + `aggregate-manifest.json`.

---

# NON-AUTHORING PAINT JUDGE — dual-engine late-sweep (2026-07-10)

**Role:** NON-AUTHORING PAINT JUDGE (did not build; verify the PAINTED truth, never the builder's claim). **Engine/GPU:** Chrome 150 real Metal (`ANGLE Metal Renderer: Apple M5 Max`) + system WebKit (off-screen WKWebView, Apple GPU). **Bytes:** BUILT `dist-demo/` served on `:5200` (NOT `:5199` dev). **Method:** the proven C18 `?capture=<route>&mode=<m>` dual-engine harness (poll `data-capture-ready`).

## VERDICT: **FAIL → PENDING** (fix owed)

- **44/44 capture PNGs RESOLVE ON DISK** (11 routes × {Chromium,WebKit} × {light,dark}), all real dimension-correct PNGs (Chromium 1440×900 @1x, WebKit 2880×1800 @2x), in-pixel engine badge on every one (Chromium magenta≈2604, WebKit≈6432 — provenance distinguishable), body σ(lum) 15–61 (non-blank; the C-SAFARI blank-WebKit chronic does NOT reproduce), corner L 0.153–0.17 (no rounded-clip notch).
- **Convergence: 8/11 routes read WARM dual-engine BOTH modes; 3/11 do NOT.** Operative read = `warmIdentityVerdict` (the EXACT kernel `proof:warm-identity`'s cross-page anti-evasion applies: hueBand[dominant warm ∧ warmFraction≥0.55] · chromaCeiling≤0.30 · edgeCast≤0.16 · cornerClip≥0.04 · routeNavigates) at the roster's declared probe box per route.
- **`proof:warm-identity` device-free arm GREEN** (status PASS, 15 self-test bites, route-resolution 15 tokens GREEN); **cross-page baseline born-RED 0/11 CONVERGED** — roster rows stay FAIL (the non-authoring judge does NOT flip a row whose composite does not read warm; the 3 not-warm routes forbid an all-11 flip). No `src/`/`demo/`/`styles/`/`scripts/` edited.

The wave's deliverable is a **per-category convergence pass over the 7 un-converged Pass-E categories**. Three anchors — **navigation · compositions · motion** — do NOT converge (neutral/achromatic in their probe regions). The **GESTURE FRAME-SERIES** requirement is also unmet (settled stills only). → the wave stays owed a fix.

## The 44-PNG evidence (dominant-hue kernel at the roster probe box)

| route | eng/mode | dims | domFamily | warmFrac | meanL | meanChroma | edgeΔE | cornerL | bodyσ | warm? |
|---|---|---|---|---|---|---|---|---|---|---|---|
| /display/atoms | chr/L | 1440×900 | warm | 1 | 0.902 | 0.0263 | 0.013 | 0.153 | 18.7 | **WARM** |
| /display/atoms | chr/D | 1440×900 | warm | 1 | 0.305 | 0.0229 | 0.022 | 0.153 | 22.4 | **WARM** |
| /display/atoms | wk/L | 2880×1800 | warm | 1 | 0.919 | 0.0207 | 0.012 | 0.17 | 16.8 | **WARM** |
| /display/atoms | wk/D | 2880×1800 | warm | 1 | 0.287 | 0.0239 | 0.017 | 0.17 | 20.5 | **WARM** |
| /containers/dialog | chr/L | 1440×900 | warm | 1 | 0.914 | 0.0313 | 0.017 | 0.153 | 22.4 | **WARM** |
| /containers/dialog | chr/D | 1440×900 | warm | 1 | 0.226 | 0.0278 | 0.042 | 0.153 | 24.9 | **WARM** |
| /containers/dialog | wk/L | 2880×1800 | warm | 1 | 0.953 | 0.0254 | 0.019 | 0.17 | 22.3 | **WARM** |
| /containers/dialog | wk/D | 2880×1800 | warm | 1 | 0.19 | 0.0311 | 0.046 | 0.17 | 24.9 | **WARM** |
| /data/metrics | chr/L | 1440×900 | warm | 0.999 | 0.894 | 0.0289 | 0.034 | 0.153 | 28.1 | **WARM** |
| /data/metrics | chr/D | 1440×900 | warm | 0.999 | 0.265 | 0.0289 | 0.056 | 0.153 | 33.7 | **WARM** |
| /data/metrics | wk/L | 2880×1800 | warm | 0.998 | 0.928 | 0.0226 | 0.038 | 0.17 | 28.2 | **WARM** |
| /data/metrics | wk/D | 2880×1800 | warm | 0.999 | 0.233 | 0.0306 | 0.058 | 0.17 | 31.3 | **WARM** |
| /feedback/toast | chr/L | 1440×900 | warm | 1 | 0.873 | 0.0387 | 0.055 | 0.153 | 25.8 | **WARM** |
| /feedback/toast | chr/D | 1440×900 | warm | 1 | 0.275 | 0.0379 | 0.057 | 0.153 | 29.7 | **WARM** |
| /feedback/toast | wk/L | 2880×1800 | warm | 1 | 0.906 | 0.0368 | 0.047 | 0.17 | 26.8 | **WARM** |
| /feedback/toast | wk/D | 2880×1800 | warm | 1 | 0.25 | 0.0437 | 0.045 | 0.17 | 29.3 | **WARM** |
| **/navigation/tabs** | chr/L | 1440×900 | **neutral** | 1 | 0.958 | **0.0053** | 0.03 | 0.153 | 30.2 | **NOT-WARM** |
| **/navigation/tabs** | chr/D | 1440×900 | **neutral** | 1 | 0.219 | **0.006** | 0.041 | 0.153 | 36 | **NOT-WARM** |
| **/navigation/tabs** | wk/L | 2880×1800 | **neutral** | 1 | 0.95 | **0.0067** | 0.022 | 0.17 | 27.5 | **NOT-WARM** |
| /navigation/tabs | wk/D | 2880×1800 | warm | 1 | 0.249 | 0.0084 | 0.027 | 0.17 | 33.9 | WARM (barely) |
| **/compositions/hero** | chr/L | 1440×900 | **neutral** | **0** | 0.831 | **0.0034** | **0.147** | 0.153 | 60.5 | **NOT-WARM** |
| **/compositions/hero** | chr/D | 1440×900 | **neutral** | 1 | 0.303 | **0.0036** | **0.151** | 0.153 | 60.9 | **NOT-WARM** |
| **/compositions/hero** | wk/L | 2880×1800 | **neutral** | **0** | 0.861 | **0.0035** | 0.08 | 0.17 | 55.2 | **NOT-WARM** |
| **/compositions/hero** | wk/D | 2880×1800 | **neutral** | **0** | 0.272 | **0.0038** | 0.082 | 0.17 | 54.9 | **NOT-WARM** |
| **/motion/scroll** | chr/L | 1440×900 | **neutral** | 0.975 | 0.964 | **0.0043** | 0.028 | 0.153 | 34.4 | **NOT-WARM** |
| **/motion/scroll** | chr/D | 1440×900 | **neutral** | 0.972 | 0.175 | **0.0037** | 0.038 | 0.153 | 37.8 | **NOT-WARM** |
| **/motion/scroll** | wk/L | 2880×1800 | **neutral** | 0.982 | 0.958 | **0.0051** | 0.017 | 0.17 | 33.2 | **NOT-WARM** |
| **/motion/scroll** | wk/D | 2880×1800 | **neutral** | 0.978 | 0.18 | **0.0041** | 0.021 | 0.17 | 35.4 | **NOT-WARM** |
| /forms/inputs | chr/L | 1440×900 | warm | 1 | 0.916 | 0.0274 | 0.01 | 0.153 | 18.3 | **WARM** |
| /forms/inputs | chr/D | 1440×900 | warm | 1 | 0.222 | 0.0284 | 0.039 | 0.153 | 23.3 | **WARM** |
| /forms/inputs | wk/L | 2880×1800 | warm | 1 | 0.955 | 0.0217 | 0.011 | 0.17 | 15 | **WARM** |
| /forms/inputs | wk/D | 2880×1800 | warm | 1 | 0.189 | 0.0315 | 0.035 | 0.17 | 20.4 | **WARM** |
| /compositions/math-paper | chr/L | 1440×900 | warm | 0.998 | 0.865 | 0.0242 | 0.041 | 0.153 | 39.9 | **WARM** |
| /compositions/math-paper | chr/D | 1440×900 | warm | 0.997 | 0.359 | 0.0225 | 0.073 | 0.153 | 45.1 | **WARM** |
| /compositions/math-paper | wk/L | 2880×1800 | warm | 0.998 | 0.882 | 0.0234 | 0.047 | 0.17 | 39.5 | **WARM** |
| /compositions/math-paper | wk/D | 2880×1800 | warm | 0.998 | 0.338 | 0.0269 | 0.074 | 0.17 | 41.6 | **WARM** |
| /containers/sheet | chr/L | 1440×900 | warm | 1 | 0.911 | 0.0311 | 0.021 | 0.153 | 19.3 | **WARM** |
| /containers/sheet | chr/D | 1440×900 | warm | 1 | 0.234 | 0.0275 | 0.047 | 0.153 | 23.9 | **WARM** |
| /containers/sheet | wk/L | 2880×1800 | warm | 1 | 0.949 | 0.025 | 0.022 | 0.17 | 17.9 | **WARM** |
| /containers/sheet | wk/D | 2880×1800 | warm | 1 | 0.199 | 0.0305 | 0.044 | 0.17 | 20.7 | **WARM** |
| /data/metric-stack | chr/L | 1440×900 | warm | 1 | 0.906 | 0.0278 | 0.024 | 0.153 | 18.2 | **WARM** |
| /data/metric-stack | chr/D | 1440×900 | warm | 1 | 0.299 | 0.0221 | 0.061 | 0.153 | 24.8 | **WARM** |
| /data/metric-stack | wk/L | 2880×1800 | warm | 1 | 0.929 | 0.024 | 0.031 | 0.17 | 16 | **WARM** |
| /data/metric-stack | wk/D | 2880×1800 | warm | 1 | 0.272 | 0.0259 | 0.076 | 0.17 | 21.9 | **WARM** |

Every capture carried a decoded engine badge (magenta fiducial >20 ∧ ink >200). Full per-capture JSON: `BG.W-PAGE-COMPONENT-AUDIT-paint/validate-out.json`.

## Convergence tally — **8 / 11 CONVERGED · 3 / 11 NOT**

| category | route | converged? | note |
|---|---|---|---|
| display | /display/atoms | ✅ CONVERGED | warm both engines both modes |
| containers | /containers/dialog | ✅ CONVERGED | overlay band glass, warm field |
| data | /data/metrics | ✅ CONVERGED | mega/audacious metric tier; dark = luminous-warm-dark |
| feedback | /feedback/toast | ✅ CONVERGED | warm peach section field (--section-color-8) |
| **navigation** | /navigation/tabs | ❌ **NOT CONVERGED** | 3/4 captures neutral (meanChroma 0.005–0.007) |
| **compositions** | /compositions/hero | ❌ **NOT CONVERGED** | 4/4 neutral; light warmFraction=0; dark a dead near-black void |
| **motion** | /motion/scroll | ❌ **NOT CONVERGED** | 4/4 neutral (meanChroma 0.004–0.005) |
| sentinel | /forms/inputs | ✅ CONVERGED | control-rest tier one warm material |
| sentinel | /compositions/math-paper | ✅ CONVERGED | strong warm-cream paper field (the reference) |
| sentinel | /containers/sheet | ✅ CONVERGED | side-drawer glass over warm field |
| sentinel | /data/metric-stack | ✅ CONVERGED | MetricStack rows warm |

## Dark-register note (why the 8 warm routes' dark meanL<0.30 is NOT a defect)

The 8 warm routes' DARK captures read meanL≈0.19–0.36, BELOW the roster `expect` cell's documented `meanL=0.30..0.99`. That band is the LIGHT-oriented documentation floor; the OPERATIVE gate criterion (`warmIdentityVerdict`, what the anti-evasion enforces) carries **NO meanL floor**. Every dark warm-route capture reads `dominantFamily=warm`, `warmFraction≈1.0`, meanChroma within bounds → `warmIdentityVerdict` PASSES. Visually confirmed on `/data/metrics` dark: a luminous warm-brown transmissive field with warm-glass metric cards (correct W-DARK-MATERIAL register), NOT a dead void. So the 8 routes converge in BOTH modes.

## defectLocalization

1. **/compositions/hero — NOT converged in ANY of the 4 captures (Pass-E `compositions` anchor + 17.3 busy-aurora criterion).**
   - **Light** (both engines): near-WHITE field (meanL 0.83–0.86, meanChroma 0.0034–0.0035, **warmFraction = 0** — ZERO warm among coloured pixels). Backdrop is a grey constellation over a near-white wash; warm-cream identity does NOT read. edgeΔE 0.147 (Chromium) — constellation-over-white edge cast, at the 0.16 ceiling.
   - **Dark** (both engines): near-BLACK dead void (meanL 0.27–0.30, meanChroma 0.0036–0.0038, neutral) — precisely the **"charcoal slab on a dead void"** CLAUDE.md §W-DARK-MATERIAL forbids; the luminous-warm-dark material is absent.
   - The **17.3 forward criterion is unverifiable/unmet**: there is no busy aurora (a faint grey constellation), so "the calm-light capsule over the busy aurora reads legible + child-glyph un-tinted" cannot be judged on the painted surface.
2. **/navigation/tabs — NOT converged (Pass-E `navigation` anchor).** 3/4 captures `dominantFamily=neutral` (meanChroma 0.005–0.007); WebKit/dark barely warm (0.0084). The route mounted **0 GL canvases** (Chrome DOM probe) though BA.W-STAGE assigns `navigation→aurora`; the probe region is a warm-but-very-pale near-white editorial field below the warm floor.
3. **/motion/scroll — NOT converged (Pass-E `motion` anchor).** All 4 captures neutral (meanChroma 0.004–0.005). Mounted **0 GL canvases** though `motion→constellation` per the category map; field near-white (light) / near-black (dark). Also owes a FRAME-SERIES read (§4).
4. **GESTURE FRAME-SERIES entirely unmet (IOS27-MOTION-TRUTH clause).** Every capture is a SETTLED STILL (`getAnimations().running = 0` at `data-capture-ready`). Absent: route-page-build ≥8 painted entrance frames across ≥3 route pairs; shell-vh-morph BOTH legs ≥12 travel frames (W-SHELL-MORPH-PAINT-REPAIR); drawer-snap-drag live-gesture series (W-DRAWER-PAINT-BIND); the dock facilities re-read at §4.1/§4.5 with fps+gap-histogram+verdict per motion row.

## mustFix[]

- **[compositions/hero]** Restore the warm field both modes: LIGHT carries the warm-cream identity in the hero region (the 17.3 busy-aurora forward criterion — a busy aurora with the calm-light capsule legible, child-glyph un-tinted; meanChroma ≥ ~0.020 / dominantFamily=warm at probe `x=0.20,y=0.25,w=0.60,h=0.40`); DARK is the luminous-warm-dark transmissive material (W-DARK-MATERIAL), not a near-black void.
- **[navigation/tabs]** Restore a warm field (the `navigation→aurora` backdrop or a warm wash lifted to readable strength) so probe `x=0.20,y=0.35,w=0.55,h=0.30` reads warm ≥ floor both modes both engines (0 GL canvases mounted — the aurora is not compositing).
- **[motion/scroll]** Restore a warm field (`motion→constellation`/warm wash) so the probe reads warm ≥ floor; AND supply the scroll-choreography FRAME-SERIES (≥8 painted entrance frames + fps/gap histogram) the `motion` row requires.
- **[gesture frame-series]** The paint close needs a frame-series capture instrument for the motion/dock/drawer rows (route-page-build, shell-vh-morph both legs, drawer-snap-drag, dock facilities at §4.1/§4.5) — the settled-still C18 harness cannot verify the IOS27-MOTION-TRUTH gesture criterion. Re-judge once the field + frame-series land.

## Fences honored

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. Wrote PNGs + this DELTA under `docs/tranches/BG/audit/visual/BG.W-PAGE-COMPONENT-AUDIT{,-paint}/` + one cursor line in `EXECUTION-PROGRESS.md`. NEVER `/tmp` (throwaway Chrome profile + `wkshot-live` binary under the repo audit dir). No `src/`/`demo/`/`styles/`/`scripts/` edited to "fix" a defect — defects RECORDED here for the build-fix agent (its STEP 0.4). The roster is NOT edited (outside the judge's allowed set; its rows stay born-RED FAIL, correct given the 3 not-warm routes). `verify-siblings-intact --quiet` exit 0 before AND after; `demo:dist:serve` + throwaway Chrome killed on completion.

## Reproduce

- Chrome leg: `BG.W-PAGE-COMPONENT-AUDIT-paint/chrome-cap.mjs` (playwright `connectOverCDP` :9334, 11 routes × 2 modes).
- WebKit leg: `.wkshot-live "http://localhost:5200/?capture=<route>&mode=<m>" <out> <m> 15000` (off-screen WKWebView, compiled from `docs/tranches/BG/audit/wkshot-live.m`).
- Validate: `BG.W-PAGE-COMPONENT-AUDIT-paint/validate.mjs` (reuses `scripts/reflect-capture-verify.mjs` + `scripts/lib/paint-arm.mjs warmIdentityVerdict` — gate-parity read at the roster probe boxes) → `validate-out.json`.
