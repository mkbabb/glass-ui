# BG-WS12 · Coherence · Congruence (the CAPSTONE) — SPEC pass-2

> Status: SYNTHESIS pass-2. **ADVANCES** the pass-1 CONVERGED spec
> (`SPEC-pass1-converged.md`) on the unconverged frontier — it does NOT restart. Pass-1's
> §1 GESTALT, §2.1–2.2 axes+canonical-source table, §3 census C1–C21, §4
> calibration-of-the-exceptional, §5 wave breakdown, §7 folds, and the R1 cap all STAND.
> Pass-2 hardens the four residuals the convergence bar named: (1) PERSIST + PROVE the gate
> scaffolds on the tree with a demonstrated born-RED differential, (2) PROTOTYPE the A5/§2.5
> harmonization PAINT, (3) SHIP the A1 binding live-paint confirmation, (4) WIRE the §2.4
> capture instrument end-to-end. The binding congruence VERDICT still rides WS1–WS11 landing
> (R1 — `git diff master..HEAD -- src/ demo/` is EMPTY at HEAD `5ddb2e94`; HEAD src ==
> BD-4.2.0 == the broken surface). Pass-2 delivers the INSTRUMENT + the A5 paint + the gate
> persistence; the harmonized-whole capture remains post-integration.

---

## 0 · CONVERGENCE DELTA over pass-1 (the pass-2 advances, each prototype-grounded)

1. **A1 binding live-paint REFRAMED from `getComputedStyle` → the decoded PIXEL.** Pass-1
   §2.3 made the live-paint authority "a one-shot `getComputedStyle` in real Chrome AND
   Safari." The risk-lane prototype FALSIFIED that as an instrument: `getComputedStyle(el)
   .backgroundColor` for an `oklch(from … max(c,0.11) …)` custom property returns the **raw
   authored `oklch` echoed back VERBATIM** in BOTH Chromium AND WebKit — it does NOT
   gamut-map at computed-value time, and for a custom property it returns the substituted-
   but-unused value. It reveals NOTHING about what paints. The ONLY authority on what paints
   is a rasterized **PIXEL** (paint a swatch with `--cartoon-ink`, screenshot, decode via
   `pngRegionStats` → `oklabFromRgb`). `getComputedStyle` is demoted to a SECONDARY
   diagnostic that PROVES the out-of-gamut authored value (a "this is the literal the engine
   was handed" witness), never "the authority."

2. **The empirical clip-vs-gamut-map contradiction RESOLVED by NOT betting the gate on
   either model.** Pass-1 delta #1 asserted "modern Chrome+Safari gamut-MAP via CSS Color 4
   chroma-reduction which PRESERVES hue ≈55°." The risk-lane prototype CONTRADICTS this on
   the runnable proxies: rendering `oklch(0.18 0.11 56)` and decoding the pixel, BOTH
   Playwright Chromium AND WebKit **per-channel-clamp** to `rgb(49,0,0)` → `oklch(0.197
   0.081 29.2)` (oxblood, hue dragged to h29, chroma 0.081 > the 0.05 ceiling) — exactly the
   model `proof-no-gray.mjs:195 relativeOklchFrom` already assumes. Real Chrome.app/Safari
   .app on-device MAY chroma-reduce (CSS Color 4 rollout is gradual) — that question is
   genuinely open and device-dependent. The pass-2 resolution: **the device-free
   INTENDED-CHROMA-OVER-FLOOR leg is the SOLE binding RED authority** — it reads the AUTHORED
   floor literal `0.11`, is engine-INDEPENDENT, and survives WHICHEVER gamut model is
   correct. The painted hue (oxblood-clip vs warm-brown-map) is recorded as a **device/local-
   tagged DIAGNOSTIC**, NEVER a CI RED reason.

3. **The clip-hue verdict DECIDED: advisory, not RED.** The worktree prototype
   `proof-hue-at-l.mjs:71` currently calls `hueAtLBand(clip, band)`, which makes the
   worst-case-clip painted-hue band AND the `hueShiftTol(12°)` RED reasons (conservative-
   across-engines). Per the SPEC (the authority) §6#1 + the leaf's own @196-209 note: **the
   only device-free RED is INTENDED-chroma-over-floor; the painted-clip-hue band + the
   hue-shift legs DOWNGRADE to advisory prints** (Chrome/Safari MAY chroma-reduce and
   preserve hue ≈55° — a RED on the clip-hue false-fails on a gamut-mapping engine). Both
   verdicts still yield born-RED on HEAD (the chroma-over-floor leg alone reds `max(c,0.11)`).

4. **A1 GREEN target = WS3's BAND, not the literal `max(c,0.03)`.** WS3's ACTUAL landed pin
   (`BG-WS3 SPEC-pass4:189`) is `oklch(from var(--foreground) clamp(0.28,l,0.34)
   clamp(0.030,c,0.050) h)` (light) + a DRY-collapse that DELETES the dark re-declaration —
   a chroma RANGE `[0.030, 0.050]` at L 0.28-0.34, NOT a `max(c,0.03)` floor at L 0.14-0.18.
   A hard-coded "GREEN iff literal == `max(c,0.03)`" FALSE-REDs on the harmonized tree. The
   gate GREENs on the intended-chroma **BAND `[0.02, 0.06]`** (lower bound = `proof:no-gray`
   `STRONG_FLOOR` 0.02 so the ink stays warm-near-neutral and never reads achromatic-gray —
   the no-gray defect INVERTED; upper bound = WS3's verified 0.060 ceiling). `max(c,0.03)` is
   a self-test stand-in ONLY; WS3's `clamp(0.030,c,0.050)` greens by construction.

5. **The DRY collision with WS3-M1 resolved — `hue-at-l.mjs` is the ONE shared leaf.** Both
   WS3-M1 (`proof:no-gray`'s new `cartoon-ink-warm-in-gamut` witness — `clamp(lo,c,hi)`/
   `max(c,N)` chroma-aware parser) AND WS12-A1 (`proof-hue-at-l.mjs`) build the SAME
   clamp/calc/max relative-color evaluator over the SAME 2 sites. `proof-no-gray.mjs:195`
   ALREADY has `relativeOklchFrom` (the naive-clip model) but parses only the bare `<L> c h`
   form. The pass-2 mandate: `scripts/lib/hue-at-l.mjs` is the ONE leaf that adds the
   `clamp/calc/max(c,…)` parser; **both `proof-hue-at-l` (WS12) and `proof-no-gray`'s witness
   (WS3) import it** — never a third inline resolver. WS12 owns the generalized
   over-correction PREDICATE; WS3 owns the FIX + its no-gray witness. They land "NOW" born-RED
   on the same `--cartoon-ink` token, sharing the leaf (R-coord with WS3).

6. **The census DRY gap fixed at persist.** The worktree census `proof-coherence-census.mjs`
   re-vendors its OWN `hslToRgb`/`rgbToOklch`/`oklchOf` (lines 62-88) + a SIMPLER inline A1
   `predicateInkWarm` (chroma-ceiling only, `INK_CHROMA_MAX=0.06`) — a SECOND A1
   implementation that violates SPEC §6#6. The persist MUST: delete the inline OKLab plumbing
   + `predicateInkWarm`, `import { resolveRelativeColor, hueAtLBand } from "./lib/hue-at-l
   .mjs"`, and reconcile the ONE chroma band to `[0.02, 0.06]` across the census + the leaf +
   `proof-hue-at-l`. (The census correctly ALREADY imports `SPRING_PRESETS` live at line 36 —
   keep that.)

7. **A2/A9 value-check against the LIVE imported table — the spec's own pairs are STALE.**
   Pass-1 §2.3 compares Card `{0.28,0.78}` against "press register `{0.25,0.7}`" — but the
   LIVE `springPresets.ts:107-109` press row is `{response: 0.2, dampingFraction: 0.8}`
   (BD.W-ANIM-IOS27-TUNE). The `{0.25,0.7}` is the stale JSDoc the A9 arm is meant to KILL —
   WS12's own A2 carried the disease. **A2 reads the live `springPresets.ts` row at runtime,
   never a spec-frozen pair.** The STABLE born-RED example is `DECK_SPRING {0.5,0.85}` vs
   smooth `{0.58,0.8}` (off-table regardless of which press value is canonical); Card
   `{0.28,0.78}` is off-table against the live press too. A9 value-checks `SPRING_DEFAULTS_
   ALLOWLIST`, `useSpringPress` JSDoc, DRAWER_SNAP, AND the NEW-found `scheme-spring.css:26-27`
   stale header (`smooth 0.50/0.86, snappy 0.42/0.78` vs source-of-truth `0.58/0.8, 0.48/0.74`
   — the generated tokens are correct, only the comment lies).

8. **A3 blur target corrected + A5 context-scoped + reconciled with the existing gate.** A3
   reds on the FULL HEAD ladder `quiet8/resting10/floating13/overlay13/dock9` (overlay is 13
   too); the WS3 peer target collapses the RESTING register to `quiet8/resting8/floating10/
   overlay10/dock8` (dock retired→resting peer; floating/overlay one-tier-up). A5's
   harmonization is **CONTEXT-SCOPED**, not an unconditional `backdrop-filter` delete (the
   standalone `.glass-capsule` on a glass Button/Badge NEEDS its backdrop-filter — it IS the
   chrome that samples the field), and A5 EXTENDS/sits-beside the EXISTING
   `proof:nested-backdrop-budget` (AY.W-A11Y-PERF G4 — depth/frame/`contain:paint`), never
   re-forks a nested-backdrop detector.

9. **The capture instrument: the scroll-timeline settle trap fixed.** Pass-1 §2.4 specified
   `.demo-main-scroller{overflow:visible}` neutralization for fullPage — but the risk-lane
   prototype found that DESTROYS the `scroll-timeline-name: --demo-main-progress` container,
   so the `.scroll-cascade` children (per-child `view()` timeline) STICK at their entry
   keyframe (translated/faded). The deterministic settle MUST ALSO force every
   `animation-timeline`-driven element to its terminal keyframe (the capture stylesheet
   neutralizes `animation-timeline` + snaps `.scroll-cascade > *` to `transform:none;
   opacity:1`), not just count rAFs. Plus: `pngRegionStats` is PATH-only (write the screenshot
   Buffer to disk first), the route count is the LIVE **120** `s()` rows (not 131),
   surface-hash freshness rides the NEW `scripts/lib/surface-closure.mjs` DERIVED paint-graph,
   and Playwright-webkit reports `startViewTransition`/`backdrop-filter:url()`/
   `animation-timeline` ALL `true` — a FALSE Safari proxy (acquirability only; C19/R4 fidelity
   needs real Safari.app on AS-Tahoe).

---

## 1 · GESTALT GOAL (unchanged — see pass-1 §1)

WS12 is the capstone that harmonizes WS1–WS11 into ONE warm/weighty/liquid iOS-27 system.
Its governing principle: **visual regression detects change from a baseline; it does NOT
detect deviation from the SYSTEM SPEC.** The per-surface π specs + `proof:ba-gestalt` cannot
see a stray spring/blur/easing/tint/hue that coheres LOCALLY but breaks the SYSTEM. WS12
builds the cross-SURFACE system-spec comparison and runs it BESIDE the regression π. It is
**HARMONIZATION, not MINT** — its un-owned BUILDS are the gate scaffolds, the clock-fence
discharge, the anti-stacking rule, the hue-at-L predicate, the demo-backdrop congruence;
everything else is VERIFY routed to its owning WS (the §3 routing table stands).

---

## 2 · THE PASS-2 FRONTIER — four hardening tasks (MECHANISM · FILES · π bar)

### TASK 1 — PERSIST + PROVE the 4 scaffolds (born-RED differential IN THIS CHECKOUT)

**MECHANISM.** The 4 scaffolds live ONLY in throwaway worktrees (`.claude/worktrees/
wf_ca1b0f4b-227-10/11`) and `coherence-congruence.spec.ts` is unwritten. Persist them onto
`tranche/BG` with the DRY/decision fixes, wire into `gates.mjs` + `package.json`, and
DEMONSTRATE the differential at THIS checkout (a gate GREEN on 4.2.0 is disqualified — the
F1–F5 headless-green trap, shipped 3×).

The shared color leaf `scripts/lib/hue-at-l.mjs` is the ONLY new color code (it reuses
`oklabFromRgb` from `reflect-capture-verify.mjs` — DRY). Its `resolveRelativeColor` already
computes BOTH the `clip` and `css` (gamut-map) painted results; the genuinely-new piece is
the `clamp/calc/max(c,…)` channel-keyword `evalExpr`. The pass-2 DECISION rewrites the verdict
so the clip-hue is advisory:

```js
// scripts/lib/hue-at-l.mjs — the verdict (pass-2 rewrite of hueAtLBand)
// THE ONLY device-free RED is INTENDED-CHROMA-OVER-FLOOR (engine-independent: it reads the
// authored floor literal, surviving whichever gamut model an engine uses). The painted-hue
// band + the gamut-clip hue-SHIFT are ADVISORY diagnostics (printed, NEVER a RED reason):
// a real engine MAY chroma-reduce and preserve hue ~55°, so a clip-hue RED false-fails.
export function inkBandVerdict(resolved, band) {
    const reasons = [];                       // RED reasons (binding)
    const advisories = [];                    // printed-only (never fail)
    const { intended, painted } = resolved;
    const [cLo, cHi] = band.chroma;           // [0.02, 0.06] — no-gray STRONG_FLOOR .. WS3 ceiling
    if (!(intended.C >= cLo && intended.C <= cHi))
        reasons.push(`INTENDED chroma ${intended.C.toFixed(4)} not in [${cLo}, ${cHi}] `
            + `(over-floor saturate/oxblood above, achromatic-gray below — the root cause)`);
    const [hLo, hHi] = band.warmHue;
    if (!(painted.h >= hLo && painted.h <= hHi))
        advisories.push(`ADVISORY painted(worst-case-clip) hue ${painted.h.toFixed(1)} `
            + `not in warm-amber [${hLo}, ${hHi}] — diagnostic only (engine MAY chroma-reduce)`);
    let dh = Math.abs(painted.h - intended.h); if (dh > 180) dh = 360 - dh;
    if (!(dh <= band.hueShiftTol))
        advisories.push(`ADVISORY gamut-clip hue SHIFT ${dh.toFixed(1)} deg — the oxblood drift`);
    return { pass: reasons.length === 0, reasons, advisories };
}
```

The census A1 arm (`proof-coherence-census.mjs`) DELETES its inline `hslToRgb`/`rgbToOklch`/
`oklchOf`/`predicateInkWarm` and imports the leaf:

```js
import { resolveRelativeColor, inkBandVerdict } from "./lib/hue-at-l.mjs";
const INK_BAND = { chroma: [0.02, 0.06], warmHue: [45, 88], hueShiftTol: 12 };
for (const t of INK_REGISTRY) {                         // auto-discovered: --cartoon-ink × 2 sites
    const v = inkBandVerdict(resolveRelativeColor({ ...t, map: "clip" }), INK_BAND);
    // v.reasons → RED (intended-chroma-over-floor); v.advisories → printed
}
```

**Born-RED self-test bites** (device-free, ride the gate's `--self-test`):
- HEAD `--cartoon-ink` light (`max(c,0.11)`) + dark (`max(c,0.11)`) → RED (intended C 0.11 ∉ band).
- corrected `max(c,0.03)` → GREEN; WS3's `clamp(0.030,c,0.050)` → GREEN (band-checked, not literal).
- synthetic over-floor (`0.5 0.20 56`) → RED; synthetic achromatic (`0.5 0.005 56`) → RED (below 0.02);
  synthetic authored-cool (`0.5 0.04 250`) → RED only via the **separate** warm-hue INTENDED
  check (add an intended-hue band assert as a RED leg — distinct from the advisory painted-hue).

**A2/A3/A4 born-RED** (lean on existing machinery, do NOT rebuild):
- **A2** imports `SPRING_PRESETS` live → `DECK_SPRING {0.5,0.85}` reds vs smooth `{0.58,0.8}`;
  `Card.vue:228 {0.28,0.78}` reds vs the LIVE press row `{0.2,0.8}` (read at runtime, never
  the stale `{0.25,0.7}`). Exemptions by-file for the sanctioned drivers (dock/drawer/
  blob-pointer/scroll-scene/`useSpring`) STAY.
- **A3** reads `glass.css:76-92` → `resting10/floating13/overlay13/dock9` red vs the WS3 peer
  target; the base-chrome tier `{quiet8, resting10, dock9}` = 3 distinct → RED.
- **A4** scans `scheme-spring.css` ease tokens → `HandMark.vue:87 cubic-bezier(.16,1,.3,1)`
  reds (the `--ease-out-expo` re-spell).

**FILES.** New on tree: `scripts/lib/hue-at-l.mjs`, `scripts/proof-hue-at-l.mjs`,
`scripts/proof-coherence-census.mjs` (DRY-fixed). Edited: `scripts/gates.mjs` +
`package.json` (register `proof:coherence-census` `[ci]` + `proof:hue-at-l`).

**π BAR.** `node scripts/proof-coherence-census.mjs` exits NON-ZERO on HEAD with RED on all
4 defects + each self-test bite firing; exits ZERO on the synthetic corrected tree. A GREEN
on HEAD disqualifies. `vue-tsc --noEmit` exit 0 (the `.mjs` leaves are outside the TS
project). This is device-free — runnable NOW.

### TASK 2 — PROTOTYPE the A5/§2.5 harmonization PAINT (context-scoped fill+vibrancy)

**MECHANISM.** The residual that capped A5 at `build=false`: confirm that dropping the
NESTED `.glass-capsule` second `backdrop-filter` and reading the selected pill as
**fill+vibrancy** over the track's ONE sampled backdrop still reads as "selected glass," both
engines both modes. The harmonization is **context-scoped** — the standalone `.glass-capsule`
(glass Button/Badge/Chip, the chrome that samples the page) KEEPS its backdrop-filter; ONLY
the DOM-nested-in-glass case drops it:

```css
/* src/styles/glass/glass-capsule.css — the A5 harmonization (context-scoped) */
/* The nested selected pill samples the parent track's ALREADY-blurred plate (glass cannot
   sample glass — Apple GlassEffectContainer: members share ONE sampling region). Drop the
   2nd backdrop-filter; read forward as fill + vibrancy + rim, the --dock-control-active-bg
   fill-only model. The :where() set must be COMPLETE (every glass-parent class) or the
   nested case leaks; specificity 0 so it never out-weighs a consumer override. */
:where(.glass-capsule-track, .glass-card, .glass-floating, .glass-resting, .glass-quiet,
       .glass-overlay, .glass-dock) .glass-capsule {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    /* vibrancy compensation for the dropped saturate(1.6): a small brightness/saturate on
       the surface's OWN pixels (filter, NOT backdrop-filter — never re-samples) + the rim. */
    filter: saturate(1.08) brightness(1.04);
    /* fill + rim + lift are the FORWARD-ness (the file's own comment says so) — unchanged. */
}
```

This EXTENDS `proof:nested-backdrop-budget` (it REDUCES depth → net perf win; the
`contain:paint` walk-stop the budget gate already measures is what makes the double-blur
real). The A5 device-free SOURCE arm scans for `.glass-capsule` mounting its own
`backdrop-filter` WITHOUT the context-scoped override (born-RED on HEAD: the override is
absent). The live-π walk STOPS at the first backdrop-root (`contain:paint|layout`,
`isolation`, `filter`, `opacity<1`, `transform`) — glass surfaces carry `contain:layout
style paint`, so the walk must stop or it mis-attributes what the inner element samples; the
double-stack perceptual threshold DERIVES from `--glass-blur-wash-radius` (not a magic 4px)
so the WS3 peer-collapse cannot silently invalidate it.

**The paint proof (the binding residual):** in a worktree, apply the override, build the
`/navigation/tabs` + a busy-field route (the warm paper-grain tabs route + an aurora route),
capture chromium + webkit both modes, decode the pill region vs the track region — the pill's
composited L/chroma must measure a real FORWARD differential (brighter fill + rim) with NO
second blur, AND a standalone glass Button on a separate route must be byte-untouched (its
backdrop-filter intact). If the fill+vibrancy reads FLAT (no forward differential) or the
standalone button flattens, the §2.5 harmonization is falsified and the C20 build re-opens.

**FILES.** Edited (prototype): `src/styles/glass/glass-capsule.css` (the context-scoped
override). Verified-untouched: every standalone `.glass-capsule` consumer (Button/Badge/Chip).

**π BAR.** `tests-visual/coherence-congruence.spec.ts`'s A5 arm: nested pill measures
forward-of-track (real L/chroma differential) on BOTH engines BOTH modes with zero second
backdrop-filter; standalone capsule backdrop-filter intact; `proof:nested-backdrop-budget`
depth DROPS (net-positive); 44px touch floor preserved (`proof:touch-target` GREEN).

### TASK 3 — SHIP the A1 binding live-paint confirmation (the PIXEL, not getComputedStyle)

**MECHANISM.** Reframed per §0 delta #1–#2. The binding live-paint is a **decoded swatch
PIXEL**, not `getComputedStyle`:

```js
// tests-visual/coherence-congruence.spec.ts — the A1 live-paint cast arm (per engine, per mode)
await page.addStyleTag({ content:
  `#__cartoon_cast{position:fixed;left:0;top:0;width:64px;height:64px;background:var(--cartoon-ink)}` });
await page.evaluate(() => document.body.insertAdjacentHTML("beforeend", '<div id="__cartoon_cast"></div>'));
const buf = await page.locator("#__cartoon_cast").screenshot();   // a real rasterized swatch
const png = path.join(OUT, `cartoon-cast-${project}-${mode}.png`);
fs.writeFileSync(png, buf);                                        // pngRegionStats is PATH-only
const stats = pngRegionStats(png, { x:0, y:0, w:64, h:64 });      // {meanL, meanChroma, meanAlpha}
const ok = oklabFromRgb(...sampleCenterPixel(png));               // the engine's ACTUAL painted hue/chroma
// RECORD (diagnostic, device/local-tagged — NEVER a CI RED): the engine's gamut-mapped cast.
// getComputedStyle is a SECONDARY witness that proves the authored OOG value was handed in:
const authored = await page.evaluate(() =>
  getComputedStyle(document.getElementById("__cartoon_cast")).backgroundColor);  // raw oklch echoed
```

The device-free INTENDED-chroma-over-floor leg (Task 1) is the SOLE RED authority; this arm
RECORDS the painted reality (whether the proxy clips to oxblood or maps to warm-brown) into
the DELTA artifact as evidence. The PROTOTYPE TARGET for settling the on-device gamut
question is a real-Chrome.app + real-Safari.app cast capture (the CI proxies clip; real
devices MAY chroma-reduce) — out of Playwright's reach, named for the post-integration paint.

**FILES.** `tests-visual/coherence-congruence.spec.ts` (the A1 cast arm), the DELTA artifact
`docs/tranches/BG/audit/coherence/W-CARTOON-INK-CAST-DELTA.md`.

**π BAR.** The cast swatch decodes to a recorded `{meanL, meanChroma, meanHue}` per engine
per mode; the artifact states whether the proxy clipped (oxblood h29) or mapped (warm-brown
h56) and that the device-free leg is the binding RED regardless. Local-tagged.

### TASK 4 — WIRE the §2.4 capture instrument end-to-end (the deterministic-settle build)

**MECHANISM.** `tests-visual/coherence-congruence.spec.ts` over the EXISTING
`playwright.config.ts` — NO standalone `.mjs` re-fork, NO `bt.launch`. The pass-2 build closes
the four under-specified seams:

1. **Webkit enrollment (1-line).** Append `"coherence-congruence.spec.ts"` to the `webkit`
   project `testMatch` array (`playwright.config.ts:119-121`).
2. **Hard-load + the scroll-timeline-aware deterministic settle.** Per route:
   `page.goto(route, { waitUntil: "load" })` (corpse-free fresh document) → `waitForSelector
   (expectedSurface)` → the SETTLE injects a capture stylesheet that neutralizes BOTH the
   inner scroller AND the scroll-timeline animations (the pass-2 fix — a fixed rAF count alone
   leaves `.scroll-cascade` children stuck at their `view()` entry keyframe):

   ```js
   await page.addStyleTag({ content: `
     .demo-main-scroller { height: auto !important; overflow: visible !important; }
     /* the scroll-timeline is now dead (no scroll container) — force every view()/scroll()-
        timed entrance to its TERMINAL keyframe so the fullPage frame is the SETTLED read */
     .scroll-cascade > *, [data-scroll-reveal], .scroll-build {
        animation-timeline: none !important; animation: none !important;
        transform: none !important; opacity: 1 !important; }` });
   await page.evaluate(() => new Promise(r =>
     requestAnimationFrame(() => requestAnimationFrame(r))));   // a fixed 2-rAF flush
   ```
3. **Real decode, freshness-bound.** Write the `fullPage:true` screenshot Buffer to disk,
   then `isRealPng` + `pngDimensions` + `pngRegionStats` (real per-region L/chroma stddev) +
   assert a per-route below-the-fold expected-surface selector decodes (NOT the mount-root
   corpse selector). Surface-hash freshness rides the NEW `scripts/lib/surface-closure.mjs`
   `deriveSurfaceClosure` (the DERIVED demo→css paint-graph closure, not hand-declared roots).
4. **Budget + scope cap, stated.** The binding run is the LIVE **120** `s()` routes × 2
   engines (chromium-headless-new + webkit) × 2 modes = **480 fullPage captures** + real
   decode, `workers:1 fullyParallel:false`, ~20-40min serial, **`local`-tagged** (real
   browser + demo + GPU subset), NEVER a CI default. Playwright-webkit acquires
   **ACQUIRABILITY ONLY** — it reports `startViewTransition`/`backdrop-filter:url()`/
   `animation-timeline` ALL `true` while real Safari no-ops/drops them, so a GREEN webkit run
   is ZERO evidence of cross-engine fidelity; the binding C19/SVG-lens/`-webkit-backdrop-
   filter`-value verdicts need **real Safari.app on AS-Tahoe** (the WS8 C-SAFARI chronic),
   out of reach — the deliverable says so.

**FILES.** New: `tests-visual/coherence-congruence.spec.ts`. Edited:
`tests-visual/playwright.config.ts:119` (testMatch widen).

**π BAR.** The instrument captures a NAMED below-the-fold surface on a real `:5199` route in
both engines both modes; the scroll-cascade routes capture SETTLED (no stuck entry keyframe);
`pngRegionStats` decodes real variance; surface-hash binds. The full-matrix run is the
post-integration binding capture (R1); pass-2 proves the instrument MECHANISM on the broken
HEAD (it captures, decodes, settles deterministically, reaches below-the-fold).

---

## 3 · FILES TOUCHED (pass-2 delta over pass-1 §4)

**New on tree (the persist):**
- `scripts/lib/hue-at-l.mjs` — the shared `clamp/calc/max(c,…)` relative-color evaluator +
  `inkBandVerdict` (advisory-clip-hue rewrite); reuses `oklabFromRgb`. Imported by BOTH
  `proof-hue-at-l` (WS12) AND `proof-no-gray`'s `cartoon-ink-warm-in-gamut` witness (WS3).
- `scripts/proof-hue-at-l.mjs` — the standalone A1 gate (RED on HEAD, GREEN on the band, the
  self-test bites; clip-hue advisory).
- `scripts/proof-coherence-census.mjs` — the A1–A9 system-spec gate, DRY-fixed (imports the
  leaf, deletes the inline OKLab + `predicateInkWarm`), A2 reads the live `SPRING_PRESETS`.
- `tests-visual/coherence-congruence.spec.ts` — the per-page dual-engine both-modes π (the
  A1 cast arm + the A5 nested-vs-standalone arm + the §2.4 full-matrix capture).
- `docs/tranches/BG/audit/coherence/W-CARTOON-INK-CAST-DELTA.md` — the A1 painted-cast record.

**Edited (pass-2):**
- `scripts/gates.mjs` + `package.json` — register `proof:coherence-census` `[ci]` +
  `proof:hue-at-l`.
- `tests-visual/playwright.config.ts:119` — widen the `webkit` `testMatch`.
- `src/styles/glass/glass-capsule.css` — the context-scoped A5 fill+vibrancy override (the
  Task-2 prototype; lands as the C20 build post-paint-confirm).
- `scripts/proof-motion-one-clock.mjs` — A9 value-checks the live table + the new
  `scheme-spring.css:26-27` stale-header pair (pass-1 already widens M3(a) + drains the fence).

**All pass-1 §4 edits (the clock-fence discharge, the off-table spring/easing swaps, the
demo-backdrop harmonizations, the CLAUDE.md reconciles) STAND** — pass-2 does not re-scope
them; it hardens the gate + instrument that LOCK them.

---

## 4 · WAVE BREAKDOWN (pass-2 — the same BG.W-* waves, advanced on the frontier)

The five pass-1 waves stand. Pass-2 sharpens their born-RED/persist obligations:

- **BG.W-COHERENCE-CENSUS** (zero-pixel) — unchanged; produces `WS12-CENSUS.md`.
- **BG.W-COHERENCE-GATE** — PERSIST the 4 scaffolds (Task 1) with the DRY fix, the
  clip-hue-advisory decision, the `[0.02,0.06]` band, and the live-table A2. PROVE born-RED
  on HEAD (the 4 defects + the self-test bites) IN THIS CHECKOUT before trust. Coordinate the
  shared `hue-at-l.mjs` leaf with WS3-M1 (one leaf, two importers). Enroll the per-page
  verdict into WS7's `proof:ba-gestalt` roster (necessary-not-sufficient).
- **BG.W-DESIGN-LANGUAGE-UNIFY** — the A5/§2.5 C20 BUILD, now context-scoped (Task 2) +
  reconciled with `proof:nested-backdrop-budget`. The paint-confirm (fill+vibrancy reads as
  selected glass; standalone untouched) is the binding residual; the build lands post-confirm.
- **BG.W-ANIMATION-CONGRUENCE** — unchanged (the 8-leg discharge, the off-table swaps, the
  alias re-time); A2/A9 value-check the live source (delta #7). R5: coordinate the 3
  layer-group legs with WS2 (discharge under WS2 or record no-op).
- **BG.W-GLASS-PAPER-CONGRUENCE** — unchanged (Regular/Clear map, key-light spine, concentric
  radius).
- **BG.W-PAGE-COMPONENT-AUDIT** — the §2.4 instrument WIRED end-to-end (Task 4) with the
  scroll-timeline settle fix + the A1 cast arm (Task 3); the full-matrix paint run is
  post-integration.

**Sequencing (hard):** Task 1 (persist+prove) + Task 4 (wire instrument) + Task 2/3
prototypes run NOW on broken HEAD. The harmonized-whole capture rides WS1→WS4→WS3/WS8→WS9
landing, THEN the PAGE-COMPONENT-AUDIT paint run.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR (pass-2)

1. **`proof:coherence-census` born-RED on 4.2.0** — RED on the 4 live defects (cartoon-ink
   `max(c,0.11)` via the intended-chroma-over-floor leg; blur `resting10/floating13/dock9`;
   `DECK_SPRING {0.5,0.85}` via the live-imported table; `HandMark cubic-bezier`) + every
   self-test bite firing; GREEN on the synthetic corrected tree. A GREEN on HEAD disqualifies.
   The scaffolds EXIST on tree, DRY-fixed (one A1 leaf), proven RED before trust.
2. **A1** RED via INTENDED-chroma-over-floor (`0.11 ∉ [0.02,0.06]`) ONLY; clip-hue + hue-shift
   ADVISORY-printed; GREEN on the BAND (`max(c,0.03)` AND WS3's `clamp(0.030,c,0.050)` both
   green — band-checked, not literal). The binding live-paint is the decoded swatch PIXEL
   (recorded per engine per mode); `getComputedStyle` is a secondary diagnostic only.
3. **A5** source arm RED on HEAD (the context-scoped override absent); the paint prototype
   confirms the nested pill reads forward (fill+vibrancy) with NO second backdrop-filter AND
   the standalone capsule byte-untouched, both engines both modes; `proof:nested-backdrop-
   budget` depth DROPS.
4. **The §2.4 instrument** captures a NAMED below-the-fold surface on real `:5199` routes,
   both engines both modes, with scroll-cascade routes SETTLED (no stuck `view()` keyframe),
   real `pngRegionStats` decode + surface-hash freshness. The full-matrix dual-engine
   both-modes capture (the binding congruence verdict) rides post-integration; webkit =
   acquirability-only; the SVG lens is a Chrome-only enhancement (Safari reads as one system
   on the `@supports` blur+tint+rim FLOOR).
5. **No regression** — `proof:no-layout-animation`, `proof:glass-cohesion`,
   `proof:nested-backdrop-budget`, `proof:touch-target`, `proof:no-gray`,
   `proof:safari-webgl` GREEN after every WS12 swap; bundle budget re-bases BEFORE growth.

---

## 6 · FOLDED DEFERRED + PASS-2 RECONCILES (no silent drop)

- **The pass-1 spec's own stale press pair `{0.25,0.7}`** — RECONCILED to the live
  `springPresets.ts` row `{0.2,0.8}` (A2 imports the table; the spec no longer carries the
  A9 disease it kills).
- **WS3's actual GREEN pin `clamp(0.030,c,0.050)` + the dark DRY-collapse** — A1's GREEN is
  band `[0.02,0.06]`, not the literal `max(c,0.03)` (a literal-equals gate false-REDs on the
  harmonized tree).
- **The shared `hue-at-l.mjs` leaf** — one leaf, two importers (WS12 `proof-hue-at-l` + WS3
  `proof-no-gray` witness); the census deletes its inline second A1 (SPEC §6#6 DRY).
- **The `scheme-spring.css:26-27` stale header** (`smooth 0.50/0.86, snappy 0.42/0.78`) —
  ADDED to A9's value-checked documentary pairs (generated tokens correct, comment lies).
- **The scroll-timeline settle trap** — the capture stylesheet neutralizes `animation-timeline`
  to terminal (not just rAF), so `.scroll-cascade` routes capture settled.
- **All pass-1 §7 folds STAND** (the BF 32-row deferred-census fold-ledger, the
  CLOCK_FENCE_PENDING discharge, the CATEGORY_DEFAULT_BG decision, the ℱ-slot/scroll-hairline
  verify, the CLAUDE.md ratchet-∅/DRAWER_SNAP reconciles).

---

## 7 · OPEN RISKS (pass-2)

- **R1 · No evidence surface at HEAD (highest, unchanged).** The binding congruence capture
  depends on WS1–WS11 LANDING (empty diff). Pass-2 delivers the persisted gate + the A5 paint
  prototype + the instrument wiring + the cast record; the harmonized-whole verdict is
  post-integration. Do NOT self-report congruence on faith.
- **R2 · The on-device gamut question is genuinely OPEN.** The runnable proxies per-channel-
  clip `oklch(0.18 0.11 56)` to oxblood; real Chrome.app/Safari.app MAY chroma-reduce. The
  device-free intended-chroma-over-floor leg sidesteps it (the binding RED); a painted-pixel
  RED would FALSE-RED on a chroma-reducing engine, so it is diagnostic/device-tagged ONLY.
- **R3 · A5 context-scope completeness.** The `:where()` glass-parent set must be COMPLETE or
  the nested case leaks; an over-broad set could touch a standalone capsule inside a non-glass
  card. The source arm + the paint prototype (standalone-untouched assert) guard it.
- **R4 · Playwright-webkit is a FALSE Safari proxy** (reports all the broken features as
  supported). Acquirability only; C19/SVG-lens/`-webkit-backdrop-filter` fidelity needs real
  Safari.app on AS-Tahoe — stated, not hidden.
- **R5 · Clock-fence ↔ WS2 dock-engine collision.** The 3 layer-group legs are WS2's
  box-morph register; discharge under WS2's reconcile or record a no-op (never a conflicting
  edit).
- **R6 · The DRY-coordination race with WS3-M1.** Both land "NOW" born-RED on `--cartoon-ink`
  sharing `hue-at-l.mjs`. If the persist order is wrong (one wave mints a second resolver),
  the SPEC §6#6 DRY is violated. The leaf lands FIRST; both gates import it.

---

*Pass-2 ADVANCES pass-1 on the four-task frontier: the scaffolds persist with the DRY fix +
the clip-hue-advisory decision + the WS3 GREEN band + the live-table A2; the A5 harmonization
is context-scoped + paint-prototyped; the A1 binding paint is the decoded PIXEL (not
getComputedStyle); the capture instrument closes the scroll-timeline settle trap. The binding
congruence verdict rides WS1–WS11 landing (R1). The honest cap is the spec.*
