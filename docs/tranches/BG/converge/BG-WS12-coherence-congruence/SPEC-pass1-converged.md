# BG-WS12 · Coherence · Congruence (the CAPSTONE) — SPEC pass-1 CONVERGED

> Status: SYNTHESIS pass-1 CONVERGED. WS12 is the LAST workstream. Its binding bar — *a
> fresh dual-engine (Chrome+Safari) both-modes capture of EVERY page reads as ONE coherent
> iOS-27 system* — is **structurally unobtainable at HEAD** (`5ddb2e94`): the whole BG
> tranche is spec-only, `git diff master..HEAD -- src/ demo/` is EMPTY, and HEAD src ==
> BD-shipped 4.2.0 == the broken surface every BG audit condemns. The pass-1 deliverable
> is therefore (a) the cross-cutting incoherence **CENSUS** against HEAD, (b) the
> **coherence-GATE born-RED on 4.2.0**, and (c) the harmonizing-wave SPECS. The binding
> congruence **capture** rides the post-integration tree (WS1–WS11 LANDED). This honest
> cap is stated up front, not discovered at close — every other WS carries the identical
> cap (R1, the highest-severity open risk).
>
> **CONVERGENCE DELTA over pass-1** (the folded critique mustFix, prototype-validated):
> 1. **A1 (hue-at-L) split into a device-free RED leg + an advisory diagnostic + a BINDING
>    real-paint confirmation.** The device-free RED is the engine-independent
>    *intended-chroma-over-floor* leg ONLY; the worst-case-clip painted hue (→h29.2) is an
>    advisory diagnostic, NEVER a RED reason (modern Chrome+Safari gamut-MAP via CSS Color
>    4 OKLCh chroma-reduction which PRESERVES hue ≈55°, they do not per-channel clip). The
>    only authority on what PAINTS is a one-shot live `getComputedStyle` in real Chrome AND
>    Safari, both modes — shipped WITH the prototype, not deferred (§2.3 A1).
> 2. **A1 registry auto-discovered + scoped down.** `grep 'oklch(from … max(c,…)'` over
>    `src/styles/` yields ONLY `--cartoon-ink` (2 sites: `shadow.css:107` light +
>    `dark-arm.css:177` dark). `--paper-grain-tooth` (an SVG `feColorMatrix saturate=0`,
>    `paper.css:44`) and the dark surface-tint ink (bare unfloored `c`) are STRUCTURALLY
>    outside A1's relative-color domain → routed to WS9 / dropped. The "one hole produced
>    BOTH maroon AND metallic" framing is corrected: A1 catches the maroon; the paper
>    metallic is a separate WS9 SVG-saturate defect (C4).
> 3. **A1 chroma-lift corrected.** Base `--foreground` resolves to oklch C≈0.0061 (light) /
>    C≈0.0063 (dark), so `max(c, 0.11)` is an **~18× lift** (not the "5.5×" of pass-1 C2),
>    and `oklch(0.18 0.11 56)` is genuinely out-of-gamut.
> 4. **A5 (anti-stacking) RESOLVED + given a device-free SOURCE arm.** The punted design
>    question is DECIDED (§2.5): the "selected-reads-as-glass" register is a SANCTIONED
>    iOS pattern, BUT the nested overlay must read as **fill+vibrancy** (a tint/opacity
>    lift over the chrome's ONE sampled backdrop), NOT a SECOND `backdrop-filter` (glass
>    cannot sample glass — Apple's own rule). The dock-control active register
>    (`--dock-control-active-bg: var(--glass-bg-floating)`, already fill-only) is the
>    MODEL/allowlist; a `.glass-capsule` that mounts its OWN nested `backdrop-filter` is
>    the harmonization target. A5 gains a **device-free static-nesting SOURCE arm** (the
>    born-RED authority) WITH the live-π as a render-correctness SUPPLEMENT — reconciling
>    the prototype's live-π-only build against §2.3/§6 #1.
> 5. **The capture instrument re-grounded on the existing config + decoder.** Rebuilt as
>    `tests-visual/coherence-congruence.spec.ts` over the EXISTING
>    `tests-visual/playwright.config.ts` (its `webkit` + `chromium-headless-new` projects,
>    :5199 `webServer`, `reuseExistingServer`, `baseURL`) — no standalone `.mjs` re-fork,
>    no manual `bt.launch()`, no symlink hack. Captures the INNER scroller (fullPage over
>    a neutralized `.demo-main-scroller`), decodes via the real `pngRegionStats`, wires
>    `surface-hash` freshness, settles DETERMINISTICALLY (waitForSelector + fixed rAF, not
>    `networkidle`+timeout), and states EXPLICITLY that Playwright-webkit acquires
>    ACQUIRABILITY only — the binding C19/R4 fidelity verdicts need real Safari.app.
> 6. **DRY.** A1/A5 reuse the shared `oklabFromRgb` (`paint-arm.mjs` re-export) +
>    `pngRegionStats` (`reflect-capture-verify.mjs`); only the clamp/calc/max
>    relative-color expr-evaluator is a NEW small shared leaf (`scripts/lib/hue-at-l.mjs`).

---

## 1 · GESTALT GOAL

WS1–WS11 each converged ONE domain in isolation. WS12 is the capstone that makes them
cohere into **ONE warm/weighty/liquid iOS-27 system** — glass + the glass/paper morphism,
the SAME register at the right tier on every surface, ONE spring family, ONE motion
language, congruent √φ type / color / proportion / suffusion — with **NO
per-component/per-page drift**.

The capstone has ONE governing principle (the SOTA design-system finding): **visual
regression detects change from a baseline; it does NOT detect deviation from the SYSTEM
SPEC.** glass-ui's ~156 per-surface π specs are regression; `proof:ba-gestalt` is a
per-surface VERDICT; **neither can see a stray spring / blur / easing / tint / hue that
coheres LOCALLY but breaks the SYSTEM.** WS12 builds the cross-SURFACE system-spec
comparison the per-surface gates structurally cannot see, and runs it BESIDE the
regression π (the SOTA "you need BOTH").

WS12 is **HARMONIZATION, not MINT** (the cardinal capstone law). It must NOT re-derive
WS1–WS11's mechanisms. Its waves are: **CENSUS** (find residual cross-cutting drift the
isolated per-WS convergence missed) + **VERIFY-THE-RECONCILE-HOLDS** (each domain register
reads consistently surface-to-surface) + **GATE** (lock no-drift) + a small set of
genuinely-un-owned cross-cutting BUILDS (the clock-fence discharge, the glass-on-glass
anti-stacking rule, the Regular/Clear variant map, the hue-at-L root-cause predicate, the
demo-backdrop congruence). Any incoherence WS12 finds that IS owned by a WS1–WS11 wave is a
cross-seam VERIFY, never a re-own; re-minting a primitive here violates the capstone role
and fails the convergence bar.

The artifact shape is the **AY FDR2-SYNTHESIS precedent** (`docs/tranches/AY/audit/
design-r2/FDR2-SYNTHESIS.md`) — a proven full-surface review: a per-surface × axis
scorecard, a §3 cross-surface incongruence list, a §4 calibration-of-the-exceptional, a §5
feed-forward-to-owning-wave. We adopt it 1:1; we do not invent a census format.

---

## 2 · MECHANISM (idiomatic, concrete)

### 2.1 The three coherence axes (the rubric every page+component is scored against)

1. **Design-language coherence** — every surface reads the SAME glass register at the
   RIGHT tier (WS3 unified blur-peer + WS8 iOS-27 bevel/SOTA ladder), the SAME WS9
   warm-lit paper tooth + handmark voice, the SAME warm-near-neutral cartoon ink (WS3
   cast-declip). A component pulled from one page to another resolves byte-identical
   blur/tint/rim/bevel/ink.
2. **Animation congruence** — every motion speaks the motion-canon P1–P7 + the Disney-12
   vocabulary (staging/stagger · squash&stretch · follow-through/overlapping ·
   slow-in/slow-out) + ONE spring family (the 6-row `SPRING_PRESETS` after WS4's tidy) +
   liquid-weight; NO fork, NO flat-where-spring-belongs, NO jank-tail, NO rogue
   `SpringProgress`/easing/blur, ONE clock per register.
3. **Whole-system congruence** — √φ type at the right call-site rung, the section/viz color
   ramp threaded consistently, φ-proportion, the eyebrow/icon/suffusion one-color-event
   rule, ONE backdrop per context.

### 2.2 The CANONICAL SOURCES the census measures against (single source per axis)

| Axis-token | Canonical source (the ONE table) | Rogue = anything off it |
|---|---|---|
| Spring (response,ζ) | `src/composables/motion/springPresets.ts` `SPRING_PRESETS` (→6 rows post-WS4-tidy; 9 at HEAD incl. the 3 `timeline-*` rows) | a `new SpringProgress({r,ζ})` whose pair is NOT a row AND not a sanctioned-driver/`SPRING_DEFAULTS_ALLOWLIST` value-checked entry |
| Spring clock | `--spring-<name>-duration` (scheme-spring.css, generated) | a `--spring-<name>` curve leg paired with a generic `--duration-*` |
| Blur radius | the `--glass-blur-*-radius` calm ladder (target peer post-WS3: quiet8/resting8/floating10/overlay10/dock8; HEAD: quiet8/**resting10**/**floating13**/**dock9**) + opt-in `--glass-blur-deep` [14,20] | a raw `blur(Npx)`/`backdrop-filter` literal off the primitives |
| Easing | the §6 `--ease-*` table (scheme-motion.css) | a raw `cubic-bezier()` in a transition/animation not routed through a token |
| Tint | the 2-pair canon post-WS3 (plate `--glass-tint-*` in oklab + rim `--glass-accent-*`) | a 3rd chromatic `color-mix(in oklab, plate, hue strength)` axis |
| Cast ink | `--cartoon-ink` = warm-near-neutral (intended chroma in [0, ~0.05], the doc's "near-black ink stamp") | the `max(c, 0.11)` ~18× floor → oxblood `oklch(0.18 0.11 56)` |
| Backdrop | ONE warm field per context (iOS reference: ONE backdrop per context) | the 4-register `CATEGORY_DEFAULT_BG` map + a cool preset (DockStage OPENAI_SKY) on a warm page |
| Radius nesting | concentric — a nested radius DERIVES from its container's | an independent magic radius on a nested surface |
| Glass layering | the 3-layer iOS hierarchy (content=no-glass / chrome=glass / overlay=**fills+vibrancy on glass**, no 2nd backdrop-filter) | a glass-tier surface mounting its OWN `backdrop-filter` nested inside another glass-tier surface (glass cannot sample glass) |

### 2.3 The GATE design — a SYSTEM-spec comparison, NOT a 4th per-surface regression

`proof:coherence-census` (`scripts/proof-coherence-census.mjs`, `[ci]` device-free) is the
cross-surface drift lock. It is **born-RED on 4.2.0** (the F1–F5 trap inverted: a coherence
gate GREEN on the broken HEAD is disqualified). The scaffold MUST exist on the tree and
demonstrably go RED on HEAD before the spec is trusted (the prototype's scaffolds were
ABSENT at HEAD — the born-RED claim is unreproducible until persisted; the FIRST build task
is to persist + prove RED). Arms:

- **A1 hue-at-L root-cause predicate** (the chronic's single hole — ~10 gates assert chroma
  ≥ floor, ZERO assert hue-at-L). The registry is **AUTO-DISCOVERED** by
  `grep 'oklch(from … max(c,…)'` over `src/styles/` → exactly `--cartoon-ink` (2 sites:
  `shadow.css:107` light, `dark-arm.css:177` dark). For each, evaluate the relative-color
  expression against the live `--foreground` (light `hsl(24 10% 10%)` → oklch C≈0.0061/h56;
  dark `hsl(30 14% 90%)` → C≈0.0063/h75.4) through the clamp/calc/max chain:
  - **The device-free RED leg (the ONLY born-RED authority): INTENDED-CHROMA-OVER-FLOOR.**
    The `max(c, 0.11)` clamps the resulting chroma to **0.11**, an ~18× lift off the
    near-neutral base, ∉ the cartoon-ink intended band `[0, ~0.05]`. This signal is
    engine-INDEPENDENT (it reads the AUTHORED floor literal, not any gamut map) → it is the
    RED reason. GREEN on the corrected `max(c, 0.03)`.
  - **The advisory DIAGNOSTIC leg (NEVER a RED reason): worst-case-clip hue.** A naive
    per-channel sRGB clip of `oklch(0.18 0.11 56)` lands at h29.2 (oxblood) — but modern
    Chrome AND Safari gamut-MAP out-of-gamut oklch via CSS Color 4 OKLCh chroma-reduction,
    which PRESERVES hue ≈54.8° while reducing C to ≈0.045. So the clip-hue is a worst-case
    diagnostic printed for context, NOT a gate-failing assertion.
  - **The BINDING real-paint confirmation (shipped WITH the prototype, not deferred):** a
    one-shot live `getComputedStyle` on the rendered `--cartoon-ink` cast in real Chrome
    AND real Safari, both modes, recording the engine's actual gamut-mapped
    `color(srgb …)` / `oklab()` form (`paint-arm.mjs parseResolvedColor`/`parseOklabLike`
    already parse both). The live painted hue+chroma is the only authority on what paints;
    it rides `tests-visual/coherence-congruence.spec.ts` (§2.4).
  - **DRY:** the rgb→oklch decompose reuses `oklabFromRgb` (re-exported by
    `scripts/lib/paint-arm.mjs` from `reflect-capture-verify.mjs`); the proof-no-gray
    `oklch(from …)` resolver is the second reference. The genuinely-new piece — the
    clamp/calc/`max(c, …)` relative-color expression evaluator — is factored as a small
    shared leaf `scripts/lib/hue-at-l.mjs` (NOT a third inline `oklabToOklch` copy).
  - **The metallic self-test is a SYNTHETIC relative-color stand-in** (a synthetic
    over-saturate + an authored-cool hue, born-RED) — stated explicitly: A1 does NOT catch
    the REAL paper metallic (C4 is an SVG `feColorMatrix saturate`, structurally outside
    A1's relative-color domain; it is WS9's `W-PAPER-GRAIN-REAL`).
  - **Persist + prove:** `scripts/lib/hue-at-l.mjs` + `scripts/proof-hue-at-l.mjs` land on
    the tree; the gate goes RED on HEAD `--cartoon-ink` (both modes) and GREEN on the
    corrected `max(c, 0.03)` in THIS checkout, with a self-test bite (a synthetic
    over-floor + a synthetic cool hue both flag).
- **A2 rogue-spring** — import `SPRING_PRESETS`; every `new SpringProgress`/
  `springTimingFunction` driver in `src/` resolves a NAMED row OR a sanctioned driver
  (`usePointerVelocityField`, `useDragMorph`, the named viz fences) OR a value-checked
  `SPRING_DEFAULTS_ALLOWLIST` entry. Born-RED on DECK_SPRING `{0.5,0.85}` (stale vs smooth
  `{0.58,0.8}`), Card.vue:228 press `{0.28,0.78}` (≠ `useSpringPress` press default
  `{0.25,0.7}`), the loose response literals.
- **A3 rogue-blur** — every `backdrop-filter`/`filter: blur()` plate resolves a
  `--glass-blur-*-radius` primitive or the deep family; a raw `blur(Npx)` off both reds.
  Born-RED on the dock9/resting10/floating13 divergence (the WS3 peer-collapse target).
- **A4 rogue-easing** — every transition/animation timing-function names a `--ease-*`/
  `--spring-*` token; born-RED on `HandMark.vue:87` `cubic-bezier(.16,1,.3,1)` (the
  `--ease-out-expo` re-spelled).
- **A5 anti-stacking** (the NEW Apple census class — **device-free SOURCE arm + live-π
  supplement**; see §2.5 for the resolved design decision). The SOURCE arm scans for a
  glass surface that mounts its OWN `backdrop-filter`/`--glass-blur-*` STATICALLY nested
  inside another `.glass-*` class context (a class composition, source-detectable — the
  born-RED authority). The live-π (`coherence-congruence.spec.ts`) walks the rendered DOM
  for the same nesting and confirms render-correctness (the necessary SUPPLEMENT, NOT a
  replacement). The sanctioned register (selected-reads-as-glass as fill+vibrancy) is a
  NAMED positive allowlist (§2.5); the harmonization target (a 2nd nested backdrop-filter)
  reds.
- **A6 concentric-radius** — a nested rounded surface's radius derives from its container
  (`containerConcentric` analogue), not an independent literal.
- **A7 clock-fence DRAINED** — `CLOCK_FENCE_PENDING == []` (WS12 discharges it; see
  W-ANIMATION-CONGRUENCE), and `proof:motion-one-clock` M3(a) is WIDENED to scan
  `animation:`/`--animate-*` shorthands (the gap that let the 4 entrance aliases drift).
- **A8 cross-engine fences** — ZERO `!!(window).chrome`/userAgent sniffing; every
  `backdrop-filter:url()` lens inside `@supports(backdrop-filter:url(...))`; ZERO
  inset-shadow fragment inside `light-dark()`; ZERO `:global(.dark)` in scoped blocks;
  `-webkit-backdrop-filter` present (and value-correct, not a `blur(0px)` literal) on every
  glass surface; every `light-dark()`/`oklch`/`contrast-color()`/`animation-timeline`
  behind `@supports` with an un-gated floor.
- **A9 value-check the documentary pairs** — `SPRING_DEFAULTS_ALLOWLIST` pairs and the
  `useSpringPress` JSDoc are value-checked against live source (the rot that hid
  DECK_SPRING/Card-press going stale). Includes the DRAWER_SNAP doc↔code reconcile
  (allowlist `[0.4,0.82]` vs the CLAUDE.md/code drift named in §7).

The gate is **necessary-not-sufficient**: the BINDING artifact is the paint. WS12 does NOT
fork a second close gate — it **ENROLLS** per-page coherence verdicts into WS7's
`proof:ba-gestalt` roster (`bg-gestalt-roster.md`) and rides WS7's `W-PAINT-IS-THE-GATE`
tag-block. The device-free census is the cross-cutting lock; the per-surface verdict is the
regression; the close runs BOTH (the SOTA "you need both").

### 2.4 The CAPTURE instrument (how WS12 obtains its evidence pre/post integration)

The binding capture is a **dual-engine both-modes** capture of EVERY page, motion-ON, full
field live. It is built as **`tests-visual/coherence-congruence.spec.ts` over the EXISTING
`tests-visual/playwright.config.ts`** — NO standalone `.mjs` re-fork, NO manual
`bt.launch()`/server-spawn, NO `node_modules` symlink hack (the prototype's re-fork is
deleted). Concrete shape:

- **Project reuse.** It runs over the config's `chromium-headless-new` (Chrome) and
  `webkit` (acquirability-only Safari proxy) projects on the :5199 `webServer`
  (`reuseExistingServer`), `baseURL`. The `webkit` project's `testMatch` allowlist (config
  line 118) is WIDENED to enroll this spec.
- **Hard-load per route.** Because client-nav is FROZEN at HEAD (WS1's `<Transition>` ⊥
  `animation` collision stacks page corpses — `main.children` 2→3 persists), each capture
  is a `page.goto(route, { waitUntil: 'load' })` HARD document load — structurally
  corpse-free (a client-nav `<Transition>`⊥`animation` artifact cannot occur on a fresh
  document). This is the acquirable instrument until WS1 lands. (Prototype-validated:
  client-nav `main=3/scrollBuild=2` vs hard-load `main=2/scrollBuild=1`.)
- **Capture the INNER scroller, not the viewport.** At capture time, neutralize the demo
  scroller (`page.addStyleTag({ content: '.demo-main-scroller{height:auto!important;
  overflow:visible!important}' })`) so `fullPage:true` reaches the WHOLE document — then
  assert a below-the-fold expected-surface selector appears in the decode before trusting
  any capture (the dim-floor is near-vacuous when every capture is viewport-width).
- **Deterministic settle (cross-engine-comparable frames).** Replace `networkidle` +
  arbitrary `waitForTimeout(600)` with `waitUntil:'load'` + an explicit
  `waitForSelector(expectedSurface)` + a DETERMINISTIC settle (await entrance completion via
  a fixed rAF count / a settled-class signal) so Chrome and webkit compare the SAME
  animation phase — a coherence cross-engine comparison MUST compare settled, identical
  frames.
- **Real decode, freshness-bound.** Folds onto the EXISTING `reflect-capture-verify.mjs`
  decoder: `isRealPng` + `pngDimensions` + **`pngRegionStats`** (real per-region L/chroma
  stddev — NOT a hand-rolled variance sampler; file-size and NaN-lucky variance are not
  evidence) + **`surface-hash`** (the captured PNG is freshness-bound, named in acceptance
  §6.4). The "real paint" assertion is a NON-circular signal — `pngRegionStats` variance
  over a content region OR a per-route expected-surface selector distinct from the mount
  root (NO re-checking the corpse selector `article.scroll-build` — the prototype's vacuous
  `hasSurf` is dropped).
- **Full matrix + budget.** The binding run is all enrolled BG routes (the full 131-route
  storybook, NOT a 12-route sample) × 2 engines × 2 modes, fullPage scroll-capture + real
  decode. This is `local`-tagged (a real browser + demo + GPU subset, like the rest of the
  webkit cross-engine set), NOT a CI default — the time/tag budget is stated, not hidden.
- **EXPLICIT scope cap.** Playwright-webkit acquires **ACQUIRABILITY only.** The binding
  C19/R4 FIDELITY verdicts — `startViewTransition` no-op, SVG-`backdrop-filter:url()` lens
  divergence, `-webkit-backdrop-filter` value-correctness — require **real Safari.app on
  AS-Tahoe** (the WS8 C-SAFARI chronic) and are OUT of this instrument's reach. A green
  webkit run does NOT imply cross-engine fidelity congruence; the deliverable says so.

### 2.5 The RESOLVED anti-stacking decision (A5 / C20 — the punted question DECIDED)

**The question:** is the active `.glass-capsule` (a "selected-reads-as-glass" register —
BD.W-TAB-IOS-CAPSULE — nested inside a glass track/dock/card) a SANCTIONED iOS exception or
a systemic anti-stacking defect?

**The decision (per Apple's own rule, cited in §2.2 glass-layering):** the
*selected-reads-as-glass* PATTERN is sanctioned (it is iOS's own tab-bar/dock selected
pill), BUT the correct iOS implementation is the nested overlay reads as **fill + vibrancy**
— a tint/opacity lift + rim over the chrome's ONE already-sampled backdrop — and does NOT
mount a SECOND `backdrop-filter` (glass cannot sample glass; a 2nd nested blur double-blurs
and is what Apple forbids). Therefore:

- **MODEL / allowlist (already correct, fill-only):** the dock-control active register
  `--dock-control-active-bg: var(--glass-bg-floating)` is an opacity-tier FILL (no 2nd
  backdrop-filter) — it is the reference form, allowlisted. The tabs-pill-in-track that
  reads `--glass-bg-floating` as a fill is likewise sanctioned.
- **HARMONIZATION TARGET (the defect):** a `.glass-capsule` (or any selected/overlay
  register) that mounts its OWN `backdrop-filter`/`--glass-blur-*` while DOM-nested inside
  another `.glass-*` surface → drop the nested backdrop-filter; read as the fill+vibrancy
  lift over the parent's single sampled backdrop. This is the C20 BUILD (W-DESIGN-LANGUAGE-
  UNIFY), the device-free A5 RED authority.
- **Scope is SYSTEMIC, not per-route.** `.glass-capsule` is composed by ~17 families; the
  stack count is `(.glass-capsule consumers) × (glass containers)`, NOT "2 stacks on the
  landing route." A5's source arm censuses across all 11 categories (or derives the scope
  from source), not a single route.
- **The walk-stop fix (NOW, not v2).** The live-π nearest-blurred-ancestor walk STOPS at
  the first backdrop-root-forming element (`contain: paint`/`layout`, `isolation`,
  `filter`, `opacity < 1`, `transform`) — glass surfaces carry `contain: layout style
  paint`, so an intervening non-glass backdrop-root must not mis-attribute what the inner
  element samples.
- **Perceptual threshold DERIVED, not magic.** The live-π double-stack perceptual threshold
  derives from the resolved wash-radius primitive (`--glass-blur-wash-radius`), NOT a magic
  `4px`, so the WS3 blur-peer collapse (resting 10→8, floating 13→10) does not silently
  invalidate it.
- **Allowlist hygiene.** DROP the near-vacuous `.glass-overlay <- .glass-dock` seed (a case
  that does not fire dilutes the anti-evasion bar). Seed ONLY cases that actually fire and
  are genuinely sanctioned (the dock-control + tabs-pill fill registers, post-decision).

---

## 3 · THE CROSS-CUTTING INCOHERENCE CENSUS (FDR2 §3 shape — LIVE at HEAD `5ddb2e94`)

Each row: the drift · the canonical register it must thread · the OWNING wave (route, do
not re-own). Verified live at HEAD.

| # | Cross-cutting drift (verified) | Canonical register | Owner (route) |
|---|---|---|---|
| C1 | Blur dialects: dock 9 ≠ resting 10 ≠ button/floating 13 (the "dock must be a peer" defect) | `--glass-blur-*-radius` peer ladder | **WS3** W-GLASS-BLUR-PEER · WS12 VERIFY + A3 |
| C2 | Maroon cast: `--cartoon-ink` `oklch(from fg .14..18 max(c,0.11) h)` (shadow.css:107 + dark-arm.css:177) → out-of-gamut `oklch(0.18 0.11 56)` (an **~18× chroma lift** off the near-neutral base, not 5.5×) on EVERY cartoon-surface + both docks; contradicts DESIGN.md:398 "near-black ink stamp" | `--cartoon-ink` warm-near-neutral intended C ≤ ~0.05 | **WS3** C-CAST-CLIP · WS12 VERIFY + A1 predicate |
| C3 | Tint sprawl: 5–7 disjoint chromatic axes (`--glass-tint-*`/`-accent-*`/`-fill-*`/`-ambient-*`/`--accent-fill-*`/`--feedback-tone-*`/`--selection-accent-*`) | the 2-pair canon (plate + rim) | **WS3** tint-collapse · WS12 VERIFY |
| C4 | Paper metallic: `--paper-grain-tooth` (`paper.css:44`) `feColorMatrix saturate=0` over anisotropic `feTurbulence baseFrequency .04 .09` → "disgusting metallic" speckle. **Structurally OUTSIDE A1** (an SVG saturate, not a relative-color floor) | warm-lit `feDiffuseLighting` tooth | **WS9** W-PAPER-GRAIN-REAL · WS12 VERIFY (NOT A1) |
| C5 | Clock-fence: 8 `CLOCK_FENCE_PENDING` legs — ONE `--spring-smooth` runs at 0.2s/0.3s/0.45s (three durations, one register), deferred across 5 BC waves that never executed | `--spring-<name>-duration` | **WS12** W-ANIMATION-CONGRUENCE (single owner; WS2-coord on dock legs) |
| C6 | `animation:`/`--animate-*` blind spot: the 4 entrance aliases (theme/literals.css:18-21) pair a spring linear() with a generic wall clock, UNCAUGHT by M3(a) | `--spring-<name>-duration` | **WS12** W-ANIMATION-CONGRUENCE + gate widen (A7) |
| C7 | Off-table springs: DECK_SPRING `{0.5,0.85}` STALE (smooth retuned 0.58/0.8), Card.vue:228 press `{0.28,0.78}` ≠ press register `{0.25,0.7}` | `springPreset()`-derived | **WS12** W-ANIMATION-CONGRUENCE (un-owned) + A2 |
| C8 | Off-token easing: HandMark.vue:87 `cubic-bezier(.16,1,.3,1)` = `--ease-out-expo` re-spelled | `var(--ease-out-expo)` | **WS12** W-ANIMATION-CONGRUENCE (un-owned) + WS9-(f) coord + A4 |
| C9 | Easing-on-wrong-job: `--card-shrink-ease` rides `--ease-cartoon-punch` (anticipation dip + 1.22 overshoot) on a SCROLL SCRUB (non-monotonic) | no-overshoot on scroll-scrub | **WS4** W-12-LAWS-UNIVERSAL · WS12 VERIFY |
| C10 | 4-morph-engine vs ONE-engine-prose LIE: useLiquidMorph (462L, 0 consumers, own dead spring), useMorphField() (0 callsites, sold as "the ONE WELD"), the real WELD is `useLiquidFlex` | ONE morph engine | **WS4** W-DEAD-COMPOSABLE-CUT · WS12 VERIFY |
| C11 | FLIP-trio duplication: useLiquidReveal/useBloomUp/useDockCtaReceive hand-roll identical ElementMorph+rAF ×3; kf `flipShared` imported NEVER used | ONE `useFlip` runner | **WS4** W-FLIP-ONE · WS12 VERIFY |
| C12 | Backdrop incoherence: `CATEGORY_DEFAULT_BG` 4-register map (paper/aurora/grid/constellation) + `DockStage` OPENAI_SKY cool-cerulean preset on warm pages → blue-box-in-warm-page rectangular seam; warm-cream glass reads as a pale lozenge on a flat blue plate | ONE warm field per context | **WS12** W-PAGE-COMPONENT-AUDIT (demo-side; WS1-field-coord) |
| C13 | Goo re-fork: AppShell.vue:625 hand-rolls `<filter id="shell-dock-morph-goo">` byte-near GooFilter's unified graph | `<GooFilter id>` single mount | **WS12** W-PAGE-COMPONENT-AUDIT (WS1-coord on AppShell) |
| C14 | Scroll-reader dual-path: useScrollProgress hand-rolls its OWN `addEventListener("scroll")` (the second listener scrollReader.ts forbids), 1 consumer | `createScrollReader` ONE core | **WS12** W-ANIMATION-CONGRUENCE (un-owned DRY) |
| C15 | Mislocated demo surface: liquid-morph.css (850L, demo-only) lives in `src/styles/glass/`, inflating the lib god-module gate + polluting the identity tree | demo tree | **WS4** encapsulation (WS12-fallback) |
| C16 | God-module: api/index.ts re-grew 483→505 past the BB.W-CARVE5 floor; CLAUDE.md "ratchet ∅" claim STALE; 13 reducible >500-line files | ≤500-line colocated | **WS4** encapsulation · WS12 census-route |
| C17 | Hero over-scale: compositions/hero.vue:98 renders card H1 at `text-display-hero` (245-287px) — a poster/metric-peg rung on a card title | nearest φ-ladder token | **WS1**/§L6 · WS12 VERIFY (call-site, not systemic) |
| C18 | V↔H mode contradiction: morph-showcase declares crossfade DEAD while AppShell ships VT-crossfade DEFAULT | teardrop-everywhere | **WS2** W-VH-MORPH-IN-DOCK · WS12 VERIFY |
| C19 | VT Chrome-only: `startViewTransition` no-ops on Safari → page-transition/shell-morph/category-switch language structurally DIFFERENT across engines (a congruence break by construction) | a shared CSS-driven transition congruent on both engines | **WS1**-coord · WS12 cross-engine VERIFY (real Safari.app, OUT of the Playwright-webkit reach) |
| C20 | Anti-stacking UN-GATED: a glass-tier surface mounting its OWN backdrop-filter nested in another (glass capsule on glass track, glass menu-row on glass card) | 3-layer iOS hierarchy (fill+vibrancy when nested) | **WS12** W-DESIGN-LANGUAGE-UNIFY (NEW build · §2.5 resolved) |
| C21 | Regular/Clear un-mapped: no canon for which surface picks Regular (legibility-adaptive) vs Clear (high-transparency + required dimming) | the variant map | **WS12** W-GLASS-PAPER-CONGRUENCE (NEW codify) |

**§4 calibration-of-the-exceptional (do NOT "harmonize" these — they are CORRECT):**
- The WS8 chrome(`uMetalFidelity` 1.0 full-drapery) ≠ content(≤0.6 sheen / opaque-fall)
  fidelity rungs are a SANCTIONED material divergence (a11y necessity: content over a
  refracting ridge FAILS 4.5 dark — 4.10/4.04 body, 2.11/2.08 muted). WS12 records
  chrome-glass ≠ content-glass as INTENDED, reads it as one system at two tiers.
- `--surface-tint-*` is `in srgb` (brand-overlay); the glass-tint axis is `in oklab`
  (perceptual) — TWO correct paths (design-idioms §9). `cn` over tailwind-merge;
  `.focus-ring` over inline ring; ConfiguratorRow ≠ LabeledField. A sweep that "fixes"
  these to one form is a documented anti-pattern — cited so the prototype fleet never
  proposes it.
- The motion bounce ceiling stays congruent with Apple's ≤0.4 "may feel too exaggerated"
  cap (bouncy ζ0.6 ≈ bounce 0.30 is the loudest, correctly under). The "quick" read is the
  spring's EARLY arrival (~100-120ms 90%-travel), NOT the 2%-settle clock — do NOT truncate
  snappy (re-introduces W-GLASS-CAL tail-jank).
- The selected-reads-as-glass register (§2.5) at FILL+VIBRANCY (the dock-control active
  tier) is the SANCTIONED nesting; only a 2nd nested backdrop-filter is the defect.

---

## 4 · FILES TOUCHED

**New (WS12-owned):**
- `scripts/proof-coherence-census.mjs` — the system-spec gate (§2.3 A1–A9), `[ci]`,
  born-RED on 4.2.0. MUST be persisted + proven RED on HEAD before trust.
- `scripts/lib/hue-at-l.mjs` — the shared clamp/calc/`max(c,…)` relative-color expression
  evaluator (the ONLY new color leaf; reuses `oklabFromRgb` for the decompose).
- `scripts/proof-hue-at-l.mjs` — the standalone A1 gate (RED on HEAD cartoon-ink, GREEN on
  `max(c,0.03)`, self-test bite).
- `docs/tranches/BG/audit/coherence/WS12-CENSUS.md` — the FDR2-shape artifact (scorecard +
  §3 incongruence list + §4 calibration + §5 feed-forward routing table).
- `docs/tranches/BG/audit/coherence/regular-clear-map.md` — the Regular/Clear variant map +
  the 3-layer glass hierarchy + the §2.5 anti-stacking decision + the (de-vacuoused)
  allowlist.
- `tests-visual/coherence-congruence.spec.ts` — the per-page dual-engine both-modes
  coherence π (over the EXISTING playwright.config; enrolled into the `proof:ba-gestalt`
  roster, not a parallel gate; the A1 live-paint confirmation + the A5 live-DOM walk ride
  here).

**Edited (WS12 cross-cutting discharge — one-token swaps + de-forks):**
- `src/styles/menu.css`, `src/styles/utilities/base.css` (.tap-squish scale),
  `src/styles/cards.css`, `src/components/custom/configurator/ConfiguratorLayer.vue`,
  `src/components/ui/slider/Slider.vue`, `src/styles/dock/layer-group.css` (×3 legs,
  WS2-coord) — the 8 `CLOCK_FENCE_PENDING` legs: `--duration-{fast,normal}` →
  `--spring-<name>-duration`.
- `src/styles/theme/literals.css:18-21` — the 4 `--animate-*` entrance aliases:
  `--duration-{normal,panel}` → `--spring-{smooth,snappy}-duration`.
- `src/components/custom/deck/constants.ts:12` — DECK_SPRING → `springPreset('smooth')`
  (kills the CSS↔JS 0.5/0.85-vs-0.58/0.8 divergence + the stale comment).
- `src/components/ui/card/Card.vue:228-229` — drop the response/ζ override; keep ONLY
  shrinkDepth/maxStretch (the legit per-surface knobs) → Card+Button share the `press`
  register `{0.25,0.7}`.
- `src/components/custom/handmark/HandMark.vue:87` — `cubic-bezier(.16,1,.3,1)` →
  `var(--ease-out-expo)` (WS9-(f) coord).
- `src/composables/motion/useScrollProgress.ts` — internals onto `createScrollReader` (keep
  the `/motion-core` public API) OR fold the single useAurora consumer onto
  `useScrollTrigger` + delete the 111L leaf.
- `src/styles/glass/*` / the harmonized `.glass-capsule` selected register — drop the
  nested 2nd `backdrop-filter`; read as the fill+vibrancy lift (§2.5 C20 build).
- `demo/layout/AppShell.vue:625` — `<filter id="shell-dock-morph-goo">` → `<GooFilter
  id="shell-dock-morph-goo">` (WS1-coord).
- `demo/stories/dock/DockStage.vue:30` — OPENAI_SKY cool default → the warm Dawn/
  warm-vibrant identity (demo-side, WS1-field-coord).
- `demo/stories/manifest.ts:181` — the `CATEGORY_DEFAULT_BG` 4-register decision (collapse
  to ONE warm identity, reconciling the one-GL-per-route budget via the shared armed
  canvas; WS1-field-coord).
- `scripts/proof-motion-one-clock.mjs` — widen M3(a) to scan `animation:`/`--animate-*`;
  drain `CLOCK_FENCE_PENDING`; value-check `SPRING_DEFAULTS_ALLOWLIST` (incl. DRAWER_SNAP).
- `tests-visual/playwright.config.ts:118` — widen the `webkit` project's `testMatch` to
  enroll `coherence-congruence.spec.ts`.
- `scripts/proof-ba-gestalt.mjs` (WS7-coord) — enroll the per-page coherence verdict rows;
  the `REQUIRED_SURFACES` BG-route re-derivation is WS7's.
- `src/composables/motion/useSpringPress.ts` — refresh the stale JSDoc.
- `CLAUDE.md` — strike the stale "ratchet ∅ (BB.W-CARVE5)" claim; add the §Shadows
  one-line cartoon-ink chroma fence + the anti-stacking (§2.5) + Regular/Clear notes;
  reconcile the DRAWER_SNAP doc↔code pair.

**Routed to owning waves (WS12 VERIFY only, NO edit):** WS3 (blur/cast/tint), WS4
(morph/FLIP/spring-table/12-laws/god-module/liquid-morph.css), WS8 (bevel/Safari/
fidelity-rungs), WS9 (paper tooth/GU-1 key-light/handmark easing coord), WS1
(routing/field/AppShell), WS2 (dock-engine/V↔H), WS7 (close oracle/roster).

---

## 5 · THE BG.W-* WAVE BREAKDOWN

All waves carry the cardinal laws (no-legacy clean breaks, KISS/DRY/DEFT, foreign-tree
fence ABSOLUTE, the substitution-vs-inheritance re-declare-at-scope discipline, the
@layer-loses-to-unlayered cascade-trap, plain `.dark .x` not `:global()`, compositor-only
motion under the universal PRM carve, the one-GL-per-route + offscreen-pause budget).

### BG.W-COHERENCE-CENSUS (FIRST · zero-pixel · the seed of the gate)
The FDR2-shape cross-cutting inventory (§3 above), born documenting the broken 4.2.0
baseline so the post-WS1–WS11 census MEASURES the convergence. Produces `WS12-CENSUS.md`
(scorecard per surface×axis + the §3 incongruence list C1–C21 + §4 calibration + §5
feed-forward routing table). Records the POSITIVE design-language finding (the glass-blur
register is structurally coherent at the token layer — zero raw-px backdrop-filter, single
`--glass-level` source, uniform `--glass-edge-light` bevel) so the WS12 glass-coherence
pass focuses on LIVE-PAINT register-at-the-right-tier JUDGEMENT, not token drift. Zero src
edits. **Validated mechanism:** the 4 HEAD defects are independently verified at this
checkout (cartoon-ink `max(c,0.11)` × 2 sites · DECK_SPRING `{0.5,0.85}` · Card.vue
`{0.28,0.78}` · blur dock9/resting10/floating13 · HandMark `cubic-bezier`).
**Real-paint-π bar:** none (zero-pixel); its output is the binding INPUT to the gate.

### BG.W-COHERENCE-GATE (the structural lock · born-RED on 4.2.0)
`proof:coherence-census.mjs` (§2.3 A1–A9). The load-bearing arm is **A1 (hue-at-L)** — the
over-correction-class catcher the chronic root-cause lacked; its device-free RED is the
INTENDED-chroma-over-floor leg ONLY (the worst-case-clip hue is advisory; the live painted
hue is the binding authority on the spec). Widen `proof:motion-one-clock` M3(a) to
`animation:`/`--animate-*` (A7) + value-check the allowlist (A9). ENROLL the per-page
coherence verdict into WS7's `proof:ba-gestalt` roster (necessary-not-sufficient; the paint
is binding). **Validated mechanism:** A1 device-free pipeline runs born-RED on live 4.2.0
cartoon-ink (both modes, read FROM source), GREEN on `max(c,0.03)`, RED on a synthetic
metallic over-saturate + an authored-cool hue; vue-tsc exit 0 (the `.mjs` leaves are
outside the TS project, zero src touch). **Real-paint-π bar (acceptance §6.1–6.2):** the
gate MUST go RED on the 4 live HEAD defects; a GREEN on HEAD is disqualified (the F1–F5
trap). The scaffolds must EXIST on the tree and demonstrably go RED before the spec is
trusted. Runs as a tag PRECONDITION (rides WS7's `--run full`), never local-only.

### BG.W-DESIGN-LANGUAGE-UNIFY (axis 1 · VERIFY + the new anti-stacking BUILD)
VERIFY the WS3 blur-peer (dock==card==button==menu==resting), the WS3 tint-collapse to
plate+rim, the WS3/WS8 maroon→warm ink, the WS8 iOS-27 bevel SUFFUSE-UNIVERSAL, the WS9
warm-lit paper tooth all LANDED and read as ONE register at the right tier. BUILD the
anti-glass-stacking rule (C20, §2.5 RESOLVED): a nested selected/overlay register drops its
OWN backdrop-filter and reads as fill+vibrancy over the parent's ONE sampled backdrop; the
dock-control active register is the already-correct MODEL/allowlist. Record the WS8
chrome(full-drapery)≠content(sheen/opaque) fidelity rungs as a SANCTIONED divergence (§4),
not drift. **Real-paint-π bar:** a glass surface pulled page-to-page resolves byte-identical
blur/tint/rim/bevel (acceptance §6.4); the A5 source arm born-RED on the systemic
nested-backdrop-filter stack, the live-π walk (walk-stopped at the first backdrop-root)
confirms render-correctness.

### BG.W-ANIMATION-CONGRUENCE (axis 2 · the cross-page residual the source-gates can't see)
DISCHARGE all 8 `CLOCK_FENCE_PENDING` legs (C5 — the single owner the distributed 5-wave
deferral waited for): menu.css(translate/smooth) · ConfiguratorLayer.vue(transform/snappy)
· cards.css(translate/smooth) · layer-group.css ×3(width/height/transform/snappy,
**WS2-coord**) · utilities/base.css(.tap-squish scale/smooth) · Slider.vue(transform/
smooth) — each `--duration-*` → `--spring-<name>-duration`. Re-time the 4 `--animate-*`
entrance aliases (C6). Re-derive the off-table springs: DECK_SPRING → `springPreset('smooth')`,
Card press → drop the override (C7). Fold HandMark easing → `--ease-out-expo` (C8). Close
the scroll-reader dual-path (C14). VERIFY WS4's morph-engine-one/FLIP-one/spring-table-tidy
landed (≤6 rows, ONE morph engine via `useLiquidFlex`, ONE `useFlip` runner) and
`--card-shrink-ease` no-overshoot (C9, C10, C11). CODIFY the system motion-rule (the
Disney-12 rubric: every motion reads as ONE of staging/stagger · squash&stretch ·
follow-through/overlapping · slow-in/slow-out; a motion fitting none is a fork to
harmonize) + the proportion fence (cartoon-punch on STATE-CHANGE beats ONLY: topology flip
/ celebration / dock open, NEVER a scroll scrub / every hover — liquid-weight-universal is
the light-bending fade everywhere, NOT everywhere-gel). **Validated mechanism:** the swap
is the simplest idiomatic thing and fully works; born-RED proven cleanly (with the animation
arm in but aliases un-re-timed, the gate shows EXACTLY 4 forks on literals.css:18-21, zero
false positives on the 7 existing own-clock `animation:` shorthands in scroll-choreography/
completion-seal). **Real-paint-π bar (acceptance §6.3, §6.5):** `CLOCK_FENCE_PENDING == []`
+ `proof:motion-one-clock` GREEN with M3(a) widened; ONE `--spring-smooth` resolves ONE
duration everywhere; compositor-only + PRM-carve re-verified after each swap
(`proof:no-layout-animation` stays GREEN); the menu-row/`.tap-squish`/dock-morph/entrance
motion π reads identical settle Chrome+Safari both modes.

### BG.W-GLASS-PAPER-CONGRUENCE (the morphism spine)
BIND the Liquid-Glass content-fence (glass on CHROME only / paper+material on CONTENT — the
four-layer canon, Apple HIG "content is a nav/floating material"). CODIFY the Regular-vs-
Clear variant map (C21): **Regular** (legibility-adaptive, the W55 luminosity-adjust) for
text-bearing/content/chrome; **Clear** (high-transparency + REQUIRED dimming layer) ONLY for
the dock/overlay-over-live-aurora case — a Clear glass over an un-dimmed busy backdrop is
the legibility drift. VERIFY the ONE-key-light spine (WS9 GU-1 `--glass-key-direction`
unifies glass specular + under-shadow fill + paper tooth-shadow azimuth — one light source
governs all three). VERIFY the WS3↔WS8 ambient seam (the bloom 4th-channel writer
`useBloomUp.ts:340` and WS3's plate-pair re-point are coherent — no double-write/clobber;
AGREE keep-or-re-point, never delete). Own the concentric-radius derivation (A6 — a nested
radius derives from its container, the discipline glass-ui's W-CARD-PAD √φ ladder applies to
padding). **Real-paint-π bar:** the Regular/Clear map resolves the right variant per surface
class; the key-light azimuth is ONE value across glass specular + paper tooth in a
side-by-side capture; nested radii are concentric.

### BG.W-PAGE-COMPONENT-AUDIT (the iterated capstone sweep · post-integration paint)
The per-page (11 categories) + per-component wave-by-wave sweep against all 3 axes on a
fresh DUAL-ENGINE both-modes capture of EVERY page (the §2.4 instrument: hard-loaded routes,
inner-scroller fullPage, real `pngRegionStats` decode, deterministic settle, surface-hash
freshness; webkit = acquirability-only, real Safari.app for fidelity). Owns the demo-side
congruence harmonizations: re-point DockStage OPENAI_SKY → warm (C12), decide the
`CATEGORY_DEFAULT_BG` 4-register map (C12, WS1-field-coord), de-fork the AppShell goo filter
→ `<GooFilter>` + the census clause (C13), move liquid-morph.css → demo (C15, WS4-fallback).
Each pass sweeps a band for residual drift and specs the harmonization; loops to congruence
(the AI-tool audit cadence = every batch). **Validated mechanism:** Playwright `page.goto`
is a hard document load, so per-route goto structurally bypasses the WS1 corpse-stacking
with zero SPA workaround (48/48 prototype PASS on the gestalt; the re-grounding fixes are the
inner-scroller capture + the real decoder + the deterministic settle). **Real-paint-π bar
(acceptance §6.4):** the post-integration dual-engine capture laid side-by-side reads as ONE
warm system; no glass surface reads as a pale lozenge on a flat plate; no cartoon cast is
red/maroon; any component pulled across pages carries its identity unchanged — with the
EXPLICIT cap that the SVG lens is a Chrome-only ENHANCEMENT (Safari reads as ONE system on
the `@supports` blur+tint+rim FLOOR alone).

**Sequencing (hard):** routing(WS1) → motion-spine(WS4) → glass-unify(WS3/WS8) → paper(WS9)
→ **THEN** WS12 captures the harmonized whole. CENSUS + GATE run NOW (born-RED);
DESIGN-LANGUAGE-UNIFY/ANIMATION-CONGRUENCE/GLASS-PAPER-CONGRUENCE VERIFY-arms + the
PAGE-COMPONENT-AUDIT paint run POST-LAND.

---

## 6 · ACCEPTANCE / REAL-PAINT-π BAR

1. **`proof:coherence-census` born-RED on 4.2.0, GREEN post-harmonization** — RED on the 4
   live HEAD defects (oxblood cast device-free via A1's intended-chroma-over-floor leg, blur
   divergence dock9/resting10/floating13, a glass-on-glass nested-backdrop-filter stack, an
   off-table spring). A GREEN on HEAD disqualifies the gate (the headless-green trap,
   shipped 3×). The scaffold exists on the tree + is proven RED before trust.
2. **A1 hue-at-L** RED on cartoon-ink via the INTENDED-chroma-over-floor leg (`max(c,0.11)`
   = ~18× lift ∉ [0, ~0.05]) AND a synthetic metallic-saturate; GREEN on the corrected
   `max(c, 0.03)`; the worst-case-clip hue is advisory ONLY; the BINDING live-paint
   `getComputedStyle` in real Chrome AND Safari, both modes, ships with the prototype (the
   only authority on what paints).
3. **`CLOCK_FENCE_PENDING == []`** + `proof:motion-one-clock` GREEN with M3(a) widened to
   `animation:`/`--animate-*` (the 4 entrance aliases now caught + re-timed); ONE
   `--spring-smooth` resolves ONE duration everywhere. `proof:no-layout-animation` GREEN
   after every swap.
4. **The per-page dual-engine both-modes capture** (the §2.4 instrument: over the existing
   playwright.config, inner-scroller fullPage, `isRealPng` + `pngDimensions` +
   `pngRegionStats` + `surface-hash`, deterministic settle; enrolled into
   `proof:ba-gestalt`) reads as ONE coherent iOS-27 system across EVERY page on BOTH Chrome
   AND Safari — with the EXPLICIT bar that the SVG lens is a Chrome-only ENHANCEMENT (Safari
   silently drops SVG-backdrop-filter → flat blur), so the Safari capture reads as ONE
   system on the `@supports` blur+tint+rim FLOOR alone, AND that Playwright-webkit acquires
   ACQUIRABILITY only (the binding fidelity verdict needs real Safari.app on AS-Tahoe). A
   component pulled across pages resolves byte-identical blur/tint/rim/bevel/ink.
5. **The motion congruence π** — menu-row hover, `.tap-squish` press, dock layer-group
   morph, and the fade/scale/slide/dock-in entrances captured Chrome+Safari both-modes read
   identical smooth/snappy settle across surfaces (the binding "one motion language" the
   headless gate cannot prove).
6. **No regression** — `proof:no-layout-animation`, `proof:glass-cohesion`,
   `proof:animation-coherence`, `proof:surface-axis`, `proof:no-gray`, `proof:safari-webgl`
   all stay GREEN after every WS12 swap; the bundle budget re-bases BEFORE any growth lands
   (index.css gzip 140k / aurora.js gzip 54k ceilings).

---

## 7 · FOLDED DEFERRED ITEMS (no silent drop — the chronic compounded twice already)

- **BF 32-row DEFERRED-CENSUS + BE/BF un-executed waves** — every row folds to a WS1–WS12
  wave OR an explicit RETIRE-with-rationale; the missing `proof:be-fold-ledger` floor gate
  is built (a capstone that converges inheriting 32 un-decided deferrals repeats the
  disease). WS12's CENSUS carries the fold ledger; WS7's close runs it.
- **The chronic ROOT-CAUSE gate** (the hue-at-L hole WS3 §6 surfaced to "WS7
  probe-vocabulary widen") — OWNED here as A1, the archetypal coherence-gate predicate, with
  the corrected device-free/painted split + the ~18× lift + the cartoon-ink-only scope.
- **The CLOCK_FENCE_PENDING set** (deferred across BC.W-AFFORDANCE-MAP / W-CONTROL-SMOOTH /
  W-DOCK-ENGINE / W-CONFIG-RIGHT / W-SELECTION-CARD — none executed) — DISCHARGED here (the
  single owner; the 8 legs enumerated in C5/§4).
- **The `CATEGORY_DEFAULT_BG` 4-register decision** + the DockStage cool-preset re-point —
  DECIDED here (demo-side, WS1-field-coord), not left as "a deferred WS decision."
- **The ℱ persistent brand slot** (P-design F7 "REMOVE") + the top scroll-progress hairline
  (verify it is the WS11 glassy rail, not the F6 stray bar) + the substrates "Aurora Studio"
  purple-h2 second-hue glance — verified-and-closed in the page audit.
- **CLAUDE.md reconcile** — strike the stale "ratchet ∅" claim; the GooFilter.vue:11 stale
  header (references deleted GlassGooFilter/DockGooFilter); the useSpringPress JSDoc; the
  DRAWER_SNAP doc↔code drift (CLAUDE.md says 0.4/0.82, the allowlist says 0.4/0.82, §7 audit
  found code 0.5/0.74 — A9 value-checks the live source and reconciles).

---

## 8 · OPEN RISKS

- **R1 · No evidence surface at HEAD (highest severity).** The binding capture depends on
  WS1–WS11 LANDING (empty diff at HEAD). WS12 pass-1 delivers CENSUS + born-RED GATE + specs
  ONLY; the congruence VERDICT rides the post-integration tree. Stated honestly — do not
  self-report convergence on faith.
- **R2 · The gate must be born-RED, full-page, multi-region, both-modes, motion-ON,
  dual-engine.** If it greens on the broken HEAD it is the F1–F5 vacuous-gate trap. The
  scaffolds (`proof-coherence-census.mjs`, `lib/hue-at-l.mjs`, `proof-hue-at-l.mjs`,
  `coherence-congruence.spec.ts`) are ABSENT at HEAD — the FIRST build task is to persist
  them and prove RED on the 4 defects before the spec is trusted.
- **R3 · Predecessor specs are "verification frontiers," not buildable-converged** — WS3
  self-states its cross-engine PAINT is NOT bound; WS12's congruence can collide with
  mechanisms that still CHANGE when they actually build. The VERIFY-arms re-run after each
  domain lands (the iterated loop).
- **R4 · Safari risk is real but mis-located** — backdrop-filter url()+blur WORK on WebKit
  26.4; the actual breaks are `startViewTransition` no-op (C19, a structural cross-engine
  transition-language divergence), a possible silent goo-filter no-apply, and
  `-webkit-backdrop-filter` literal VALUE-correctness (a `blur(0px)` literal ships flat).
  The dual-engine capture + A8 fences own these; Playwright-webkit acquires ACQUIRABILITY
  only — the binding fidelity verdict needs real Safari.app (§2.4 explicit cap).
- **R5 · Clock-fence discharge collides with WS2's dock-engine rebuild** — the 3 layer-group
  legs are WS2's box-morph register; WS12 discharges the clock UNDER WS2's reconcile by
  coordination, never a conflicting edit. If WS2 re-times the legs itself, WS12's discharge
  is a recorded no-op there.
- **R6 · The substitution-vs-inheritance dead-knob trap (≥3rd recurrence) + an unowned paint
  delta** — every token re-thread re-declares the COMPOSED token at the scope (never
  :root-only); every flat-utility→token swap drops the flat utility + `@import` after. The
  blur-peer collapse is NOT byte-identical (drops brightness(1.02), saturate 1.6→1.4 on
  glass buttons) — that delta is WS3's to own; WS12 VERIFIES it is intended, never claims
  byte-identity.
- **R7 · Anti-stacking — RESOLVED (§2.5), with a residual.** The design question is decided
  (selected-reads-as-glass at fill+vibrancy is sanctioned; a 2nd nested backdrop-filter is
  the defect) and a device-free SOURCE arm + a walk-stopped live-π exist. The residual: the
  §2.5 harmonization (dropping the nested backdrop-filter to fill+vibrancy) itself needs a
  next-pass prototype to confirm the fill+vibrancy lift reads as "selected glass" without
  the second blur — the decision is specced, the harmonization's PAINT is not yet bound.

---

*Pass-1 CONVERGED synthesis. The capstone is real at HEAD only as CENSUS + born-RED GATE +
specs; the congruence verdict is a POST-INTEGRATION instrument. The five prototype
mechanisms are folded with their critique mustFix; A5's design question is RESOLVED; the
binding paint rides WS1–WS11 landing. This honest cap is the spec.*
