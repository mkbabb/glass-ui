# BG-WS12 · Coherence · Congruence (the CAPSTONE) — SPEC pass-2 CONVERGED

> Status: SYNTHESIS pass-2 CONVERGED. **ADVANCES** the pass-1 CONVERGED spec
> (`SPEC-pass1-converged.md`) on the four-task frontier; it does NOT restart. Pass-1's §1
> GESTALT, §2.1–2.2 axes+canonical-source table, §3 census C1–C21, §4
> calibration-of-the-exceptional, §5 wave breakdown, §7 folds, and the R1 cap all STAND.
> Pass-2 hardens the four residuals with the prototype-validated mechanisms + the folded
> critique mustFix: (1) PERSIST + PROVE the gate scaffolds with a demonstrated born-RED
> differential AND the DRY/coverage/parser fixes, (2) the A5/§2.5 harmonization PAINT
> CORRECTED to fill+rim ONLY (the vibrancy `filter` DROPPED — it bled onto child text),
> (3) the A1 binding live-paint as the decoded PIXEL, (4) the §2.4 capture instrument with
> the FULL clip-chain neutralize + the entrance-only settle + a decoded-pixel coherence
> assertion. The binding congruence VERDICT still rides WS1–WS11 landing (R1 — `git diff
> master..HEAD -- src/ demo/` is EMPTY at HEAD `5ddb2e94`; HEAD src == BD-4.2.0 == the broken
> surface). Pass-2 delivers the INSTRUMENT + the corrected A5 paint + the gate persistence;
> the harmonized-whole capture remains post-integration.
>
> **HONEST CAP (the convergence gate, stated up front).** Of the five prototype tasks, A5's
> harmonization PAINT is a genuine REFINE (the vibrancy-filter approach is FALSIFIED; the
> corrected fill+rim form needs a fresh paint-confirm + a real `vite build` gate run before
> the C20 build lands), and ALL FIVE prototypes carry a `refine` verdict; the binding
> harmonized-whole capture rides WS1–WS11 landing (R1). So WS12 is **develop-ready but not
> 100% converged**: this spec is the build contract; the unconverged frontier is the A5
> filter-free re-paint + the scaffold persist-to-tree + the post-integration capture.

---

## 0 · CONVERGENCE DELTA over pass-2 (the folded critique mustFix, each prototype-grounded)

1. **A1 binding live-paint = the decoded PIXEL (UPHELD, prototype-decisive).** Task-3
   prototype proved across BOTH chromium AND webkit, both modes: `getComputedStyle(el)
   .backgroundColor` for an `oklch(from … max(c,0.11) …)` custom property returns the **raw
   authored `oklch` echoed VERBATIM** — it reveals NOTHING about paint. The ONLY paint
   authority is a rasterized **PIXEL** (paint a swatch with `--cartoon-ink`, screenshot,
   decode `pngRegionStats` → `oklabFromRgb`). The proxies per-channel-CLIP both arms to
   oxblood (light `rgb(49,0,0)`→h29.2/C0.081; dark `rgb(51,1,0)`→h30.2/C0.081), matching
   `proof-no-gray.mjs:195 relativeOklchFrom`'s assumed model. `getComputedStyle` is a
   SECONDARY witness (it proves the OOG literal was handed in), never the authority.

2. **The device-free INTENDED-CHROMA-OVER-FLOOR leg is the SOLE binding RED (UPHELD).** It
   reads the AUTHORED floor literal `0.11`, is engine-INDEPENDENT, and survives whichever
   gamut model an engine uses. The painted-clip hue (oxblood h29) + the gamut-clip hue-SHIFT
   are ADVISORY diagnostics (printed, NEVER a CI RED reason — a real engine MAY chroma-reduce
   and preserve hue ≈55°, so a clip-hue RED false-fails). The leaf's `inkBandVerdict` ALSO
   carries a device-free INTENDED-COOL-HUE RED leg (the authored `0.5 0.04 250` class — an
   engine-independent authored signal, distinct from the advisory painted-hue).

3. **A1 GREEN target = WS3's BAND `[0.02, 0.06]`, NOT the literal `max(c,0.03)`.** WS3's
   landed pin (`BG-WS3 SPEC-pass4:189`) is `oklch(from var(--foreground) clamp(0.28,l,0.34)
   clamp(0.030,c,0.050) h)` — a chroma RANGE `[0.030, 0.050]`. A hard `==max(c,0.03)` gate
   FALSE-REDs on the harmonized tree. The band `[0.02, 0.06]` (lower = `proof:no-gray`
   `STRONG_FLOOR` 0.02 so the ink never reads achromatic-gray; upper = WS3's 0.060 ceiling)
   greens BOTH `max(c,0.03)` AND `clamp(0.030,c,0.050)` by construction. `max(c,0.03)` is a
   self-test stand-in ONLY.

4. **A1 is the GENERIC over-correction catcher, NOT a 2-entry hardcode (folded — critique-1
   mustFix).** The pass-2 prototype hardcoded `INK_REGISTRY` to 2 cartoon-ink sites while the
   docstring claimed "auto-discover." RESOLUTION: the persist GENUINELY grep-walks
   `src/styles/**` for EVERY chroma-floored warm relative-color token — the pattern
   `--<name>:\s*oklch\(\s*from\s+var\(--<warm-base>\)\s+…(max\(\s*c|clamp\([^)]*,\s*c\s*,)…\)`
   (a `max(c,N)` OR `clamp(lo,c,hi)` chroma-channel floor over a warm base) — so a FUTURE
   over-floor on ANY relative-color token reds, not only the two cartoon-ink sites. At HEAD
   the walk yields exactly `--cartoon-ink` × 2 (`shadow.css:107` light `clamp(0.14,l,0.18)
   max(c,0.11) h` + `dark-arm.css:177` `clamp(0.20,calc(1-l),0.30) max(c,0.11) h` — note the
   dark site's `calc(1-l)` L-channel, the harder parse the `evalExpr` already handles). The
   `--paper-grain-tooth` SVG `feColorMatrix saturate` is STRUCTURALLY outside the
   relative-color domain (WS9's C4, not A1). The docstring is reconciled to the genuine walk.

5. **The DRY collision with WS3-M1 resolved — `hue-at-l.mjs` is the ONE shared leaf
   (UPHELD).** `scripts/lib/hue-at-l.mjs` adds the `clamp/calc/max(c,…)` evaluator + the
   `inkBandVerdict` (advisory-clip-hue) ONCE, reusing `oklabFromRgb` from
   `reflect-capture-verify.mjs`. BOTH `proof-hue-at-l` (WS12) AND `proof-coherence-census`'s
   A1 arm import it; WS3-M1's `proof:no-gray` `cartoon-ink-warm-in-gamut` witness re-points
   `proof-no-gray.mjs:195 relativeOklchFrom` onto the SAME leaf (the "two importers" the DRY
   names — completed at the WS3-M1 land). The leaf lands FIRST (R6); no third inline resolver.
   The prototype census (227-30) ALREADY imports `hslToRgb, resolveRelativeColor,
   inkBandVerdict` from the leaf + `SPRING_PRESETS` live — the inline OKLab/`predicateInkWarm`
   second A1 is GONE (the SPEC §6#6 DRY is met in the prototype; the persist preserves it).

6. **A2 reads the LIVE imported table; A9 value-checks the STALE allowlist (UPHELD +
   sharpened — critique-5 ground-truth).** The census A2 imports `SPRING_PRESETS` LIVE
   (`press {0.2,0.8}` at runtime, never the stale JSDoc `{0.25,0.7}`). The STABLE born-RED is
   `DECK_SPRING {0.5,0.85}` (off-table vs live smooth `{0.58,0.8}`) + `Card.vue:228 {0.28,…}`
   (off-table vs live press `{0.2,0.8}`). **The gate's OWN allowlist IS the doc-rot the A9
   arm kills** — `proof-motion-one-clock.mjs` `SPRING_DEFAULTS_ALLOWLIST` freezes THREE stale
   literals, each value-checked at HEAD: `useSpringPress[0.25,0.7]` vs live press `{0.2,0.8}`;
   `DOCK_SPRING[0.32,0.7]` vs live `springPreset("dock")` `{0.68,0.64}` (the constant now
   reads from the table — the literal is stale); `DRAWER_SNAP[0.4,0.82]` vs live constant
   `{0.5,0.74}` (`drawer/constants.ts:27`). A9 ALSO checks the NEW-found `scheme-spring.css`
   header comment stale on all 6 rows (the generated tokens are correct; the comment lies).

7. **A2 parser HARDENED to brace-balanced (folded — critique-1 mustFix).** The prototype's
   160-char proximity regex (`response:…{0,160}?dampingFraction:`) can mis-pair across a
   neighbouring object or miss a long-comment-separated pair. The persist replaces it with a
   **brace-balanced object-literal parse**: locate each `{ … }` block carrying both
   `response:` and `dampingFraction:` keys at the SAME brace depth, extract the pair from the
   ONE object — a capstone-grade gate cannot mis-pair. The `SANCTIONED_SPRING_FILES` by-file
   exemption (drawer/dock/blob-pointer/scroll-scene/`useSpring`) STAYS; the value-check
   against the live table is A9's job (the by-file exemption is for own-register CLOCK seams,
   the value-check is for the allowlist literals).

8. **A3/A4 coverage WIDENED + the claim scoped (folded — critique-1 mustFix).** The
   convergence-bar language ("no rogue spring/easing/blur survives") demands more than the
   prototype's narrow probes:
   - **A3 (blur).** Beyond the WS3 blur-PEER token assertion (the base-chrome tier
     `{quiet,resting,dock}` must be ONE radius; HEAD `8/10/9` = 3 dialects → RED; the elevated
     `{floating,overlay}` ONE radius), A3 ALSO scans `src/**/*.{vue,css}` for an INLINE raw
     `backdrop-filter: blur(Npx)` / `filter: blur(Npx)` literal NOT routed through a
     `--glass-blur-*` / `--glass-blur-deep` primitive — a raw-px plate off the ladder reds.
   - **A4 (easing).** Beyond the re-spell detector (a raw `cubic-bezier()` whose 4 control
     points MATCH an existing `--*-ease-*` token → RED, e.g. `HandMark.vue:87`), A4 ALSO flags
     a NOVEL raw `cubic-bezier()` / `steps()` / `linear()` in a `transition`/`animation`
     timing position that names NO `--ease-*`/`--spring-*` token (the curve-authoring
     `custom/easing/` primitive + `var(--x, cubic-bezier(…))` fallbacks stay EXCLUDED — their
     job is emitting literals). Where a probe's coverage is genuinely bounded (A2 is
     object-literal `{response,ζ}` pairs only; a `new SpringProgress(r, ζ)` positional form is
     a named-down-scope), the bound is RECORDED in `WS12-CENSUS.md` + the gate note, not
     silently claimed-complete.

9. **A5 harmonization CORRECTED — fill+rim ONLY, the vibrancy `filter` DROPPED (folded —
   critique-2 mustFix, the decisive revision).** The pass-2 prototype's
   `filter: saturate(1.08) brightness(1.04)` is FALSIFIED: `filter` on `.glass-capsule`
   filters the element's WHOLE SUBTREE, brightening/saturating the LABEL TEXT + ICONS of
   every content-wrapping capsule (Button `<slot/>`, SelectTrigger, IconChip glyph,
   DockIconButton glyph, TagsInputItem) — only the childless SegmentedTabs indicator escapes
   it. The prototype's OWN measurement discharges the residual without the filter: **fill+rim
   ALONE reads forward** (LEG-2: nested-pill composited L `+0.037`/`+0.044` over track ==
   HEAD's accepted "selected glass" read). So the corrected A5 harmonization is: **drop the
   nested 2nd `backdrop-filter`, keep the fill+rim forward-ness, NO vibrancy filter.** If a
   vibrancy lift is ever wanted it is scoped to the CHILDLESS indicator register ONLY and
   tokenized (`--glass-capsule-vibrancy`, no magic literal) — a separate booked decision, not
   this build.

10. **A5 SCOPE = the actual double-blur register, not a blanket `:where()` (folded —
    critique-2/R3).** The prototype's `:where(.glass-card,.glass-floating,…) .glass-capsule`
    set was both INCOMPLETE (missing `.glass-wash`/`.glass-deep`/`.glass-panel`/veil
    `[data-surface]`) AND OVER-BROAD (it strips the backdrop-filter from EVERY glass
    Button/SelectTrigger/IconChip nested in any glass surface — a standalone glass Button that
    happens to sit inside a glass Card would lose its own sampling). RESOLUTION: scope to the
    register that ACTUALLY double-blurs by construction — **`.glass-capsule-track
    .glass-capsule`** (the tabs-pill-in-track, the BD.W-TAB-IOS-CAPSULE register where the
    pill samples the track's already-blurred plate; confirmed at HEAD: `glass-capsule.css:64`
    `backdrop-filter: var(--glass-blur-floating)` nested over `:85` track
    `var(--glass-blur-quiet)`). The **dock active-control register is a SEPARATE named
    decision** (critique-2): `--dock-control-active-bg: var(--glass-bg-floating)` is ALREADY
    fill-only (no 2nd backdrop-filter — the W-REGISTER-IOS model), so the dock is NOT in the
    A5 scope and needs NO edit; A5's source arm asserts the dock active register stays
    fill-only (the allowlist MODEL), it does not strip it. Specificity-0 `:where()` so a
    consumer override always out-weighs.

11. **The capture instrument: the FULL clip-chain + entrance-only settle (folded —
    critique-4 mustFix).** The §2.4 `.demo-main-scroller{overflow:visible}`-ONLY neutralize is
    INSUFFICIENT — `AppShell.vue:370` is `<div class="relative flex h-screen overflow-hidden">`
    wrapping the inner `.demo-main-scroller` (`:383` `overflow-y-auto`), so the document stays
    pinned to 100vh until the WHOLE chain (`html/body/#app` → the `h-screen overflow-hidden`
    shell root → the `flex min-h-0 flex-col` wrapper → `.demo-main-scroller`) releases its
    height+overflow. The prototype (227-33) ALREADY neutralizes the full chain. ALSO: the
    `animation:none` neutralize is SCOPED to ENTRANCE timelines (`animation-timeline:none` +
    snap-to-terminal on `view()`/`scroll()`-driven `.scroll-cascade > *`/`[data-scroll-reveal]`
    /`.scroll-build`), NOT a blanket `animation:none` that would also kill the steady-state
    design-language motion under audit (metal-shimmer-sweep, handmark boil, living-line). The
    settle replaces the fixed 2-rAF flush with `waitForFunction(() => stuckCascadeCount()===0)`
    (robust under machine load; `stuck>0` clip-only / `stuck==0` settled is the trap bite). A
    flatten-faithfulness check is REQUIRED: decode the SAME glass-over-backdrop surface
    flattened-vs-scrolled; if sticky scroll-shrink headers / `.scroll-pin` stages / fixed
    full-bleed StoryHero backdrops corrupt the flatten, the instrument falls back to
    per-viewport-segment scroll-and-stitch (NOT a flatten that unsticks sticky / tiles fixed).

12. **The capture instrument binds a DECODED-PIXEL coherence assertion (folded —
    critique-4 mustFix).** The spec.ts adds ≥1 end-to-end coherence assertion that binds a
    real DECODED-PIXEL differential between two surfaces on the same route (e.g. two glass
    tiers' composited L, or the cartoon-ink cast region vs a body-ink region) — NOT a
    `getComputedStyle` (the §0#1 demoted authority). Region-variance decode alone is a capture
    harness, not a π. surface-hash freshness rides `scripts/lib/surface-closure.mjs`
    `deriveSurfaceClosure` (it EXISTS untracked on the tree — wireable NOW). Playwright-webkit
    is ACQUIRABILITY-ONLY (it reports `startViewTransition`/`backdrop-filter:url()`/
    `animation-timeline` ALL `true` while real Safari drops them — a green webkit run is ZERO
    cross-engine-fidelity evidence; the binding C19/SVG-lens/`-webkit-backdrop-filter` verdict
    needs real Safari.app on AS-Tahoe).

---

## 1 · GESTALT GOAL (unchanged — see pass-1 §1)

WS12 is the capstone that harmonizes WS1–WS11 into ONE warm/weighty/liquid iOS-27 system. Its
governing principle: **visual regression detects change from a baseline; it does NOT detect
deviation from the SYSTEM SPEC.** The per-surface π specs + `proof:ba-gestalt` cannot see a
stray spring/blur/easing/tint/hue that coheres LOCALLY but breaks the SYSTEM. WS12 builds the
cross-SURFACE system-spec comparison and runs it BESIDE the regression π. It is
**HARMONIZATION, not MINT** — its un-owned BUILDS are the gate scaffolds, the clock-fence
discharge, the anti-stacking rule, the hue-at-L predicate, the demo-backdrop congruence;
everything else is VERIFY routed to its owning WS (the §3 routing table stands).

---

## 2 · THE PASS-2 FRONTIER — four hardening tasks (MECHANISM · FILES · π bar)

### TASK 1 — PERSIST + PROVE the 4 scaffolds (born-RED differential IN THIS CHECKOUT)

**MECHANISM.** The 4 scaffolds live ONLY in throwaway worktrees (`.claude/worktrees/
wf_ca1b0f4b-227-10/11/30/33`); `git status` on `tranche/BG` shows NONE on the tree. Persist
them onto `tranche/BG` with the DRY/coverage/parser fixes, wire into `gates.mjs` +
`package.json`, and DEMONSTRATE the differential at THIS checkout (a gate GREEN on 4.2.0 is
disqualified — the F1–F5 headless-green trap, shipped 3×). The "PERSISTED + proven RED" claim
is FALSE until the files land on `tranche/BG` AND `proof:gate-manifest-sound`'s CLEAN-TREE
clause clears — record this as Task 1 of 4 (the gate's GREEN-on-corrected is NOT system
convergence).

The shared color leaf `scripts/lib/hue-at-l.mjs` is the ONLY new color code (it reuses
`oklabFromRgb` from `reflect-capture-verify.mjs`). It exports `resolveRelativeColor` (computes
BOTH `clip` and `css` gamut-map results) + the `clamp/calc/max(c,…)` channel `evalExpr` (the
genuinely-new piece; it handles the dark site's `calc(1-l)` L-channel) + the verdict:

```js
// scripts/lib/hue-at-l.mjs — inkBandVerdict (the pass-2 verdict; prototype 227-30 is the base)
// THE ONLY device-free RED is the AUTHORED signal (engine-independent): INTENDED chroma in
// [cLo,cHi] (floor catches grey, CEILING catches the max(c,0.11) maroon) AND INTENDED hue in
// the warm-amber band (catches an authored cool hue — the 0.5 0.04 250 class). The painted
// (worst-case-clip) hue band + the gamut-clip hue-SHIFT are ADVISORY (printed, NEVER a fail):
// a real engine MAY chroma-reduce and preserve hue ~55°, so a clip-hue RED false-fails.
export function inkBandVerdict(resolved, band) {
    const reasons = [], advisories = [];        // reasons = binding RED; advisories = printed
    const { intended, painted } = resolved;
    const [cLo, cHi] = band.chroma;             // [0.02, 0.06] — no-gray STRONG_FLOOR .. WS3 ceiling
    if (!(intended.C >= cLo && intended.C <= cHi))
        reasons.push(`INTENDED chroma ${intended.C.toFixed(4)} not in [${cLo},${cHi}] `
            + `(above=over-floor oxblood; below=achromatic-gray — the root cause)`);
    const [hLo, hHi] = band.warmHue;            // [45, 88]
    if (!(intended.h >= hLo && intended.h <= hHi))
        reasons.push(`INTENDED hue ${intended.h.toFixed(1)} not in warm-amber [${hLo},${hHi}] `
            + `(an authored cool/wrong hue — engine-independent)`);
    if (!(painted.h >= hLo && painted.h <= hHi))
        advisories.push(`ADVISORY painted(clip) hue ${painted.h.toFixed(1)} — diagnostic only`);
    let dh = Math.abs(painted.h - intended.h); if (dh > 180) dh = 360 - dh;
    if (!(dh <= band.hueShiftTol)) advisories.push(`ADVISORY gamut-clip hue SHIFT ${dh.toFixed(1)} — the oxblood drift`);
    return { pass: reasons.length === 0, reasons, advisories };
}
```

The census A1 arm GENUINELY grep-walks `src/styles/**` for chroma-floored warm relative-color
tokens (folded §0#4) and imports the leaf:

```js
import { resolveRelativeColor, inkBandVerdict } from "./lib/hue-at-l.mjs";
const INK_BAND = { chroma: [0.02, 0.06], warmHue: [45, 88], hueShiftTol: 12 };
// auto-discover: every `--x: oklch(from var(--<warm-base>) … (max(c,N)|clamp(lo,c,hi)) …)`
for (const t of discoverChromaFlooredInk("src/styles")) {      // HEAD: --cartoon-ink × 2
    const v = inkBandVerdict(resolveRelativeColor({ ...t, map: "clip" }), INK_BAND);
    if (!v.pass) fail("A1", `${t.name} — ${v.reasons.join("; ")}`);
    for (const a of v.advisories) note(`A1 ${a}`);
}
```

**Born-RED self-test bites** (device-free, ride the gate's self-test):
- HEAD `--cartoon-ink` light (`max(c,0.11)`) + dark (`max(c,0.11)` with `calc(1-l)` L) → RED.
- corrected `max(c,0.03)` → GREEN; WS3's `clamp(0.030,c,0.050)` → GREEN (band-checked).
- synthetic over-floor (`0.5 0.20 56`) → RED; synthetic achromatic (`0.5 0.005 56`) → RED;
  synthetic authored-cool (`0.5 0.04 250`) → RED via the INTENDED-hue leg (distinct from the
  advisory painted-hue).

**A2/A3/A4 born-RED** (lean on existing machinery, fold the coverage widen §0#7–#8):
- **A2** brace-balanced parse over `{response,ζ}` objects; imports `SPRING_PRESETS` live →
  `DECK_SPRING {0.5,0.85}` reds vs smooth `{0.58,0.8}`; `Card.vue:228 {0.28,…}` reds vs the
  LIVE press `{0.2,0.8}`. `SANCTIONED_SPRING_FILES` by-file exemptions STAY.
- **A3** the WS3 blur-PEER token assertion → base-chrome `{quiet8,resting10,dock9}` = 3 distinct
  → RED; PLUS the inline raw-`blur(Npx)` off-the-primitive scan.
- **A4** `HandMark.vue:87 cubic-bezier(.16,1,.3,1)` re-spells `--ease-out-expo` → RED; PLUS
  the novel-off-token raw-bezier/steps/linear scan (easing/ + var()-fallback excluded).
- **A9** value-checks `SPRING_DEFAULTS_ALLOWLIST` (`useSpringPress[0.25,0.7]`,
  `DOCK_SPRING[0.32,0.7]`, `DRAWER_SNAP[0.4,0.82]`) against the LIVE source → all 3 stale →
  RED; the `scheme-spring.css` header comment stale on all 6 rows.

**COORDINATION (folded — critique-1/R6).** Land `lib/hue-at-l.mjs` FIRST; the hard-coded
judgment calls are coordinated with their owning WS BEFORE they harmonize, or the arm
false-red/greens on a different reconcile: A1 band `[0.02,0.06]` ↔ WS3-M1 (the shared leaf,
the no-gray STRONG_FLOOR); A2 `SANCTIONED_SPRING_FILES` + the DECK_SPRING/Card-press
disposition ↔ WS-ANIMATION-CONGRUENCE; A3 tier membership ↔ WS3 (the blur-peer collapse);
the 3 layer-group clock-fence legs ↔ WS2.

**FILES.** New on tree: `scripts/lib/hue-at-l.mjs`, `scripts/proof-hue-at-l.mjs`,
`scripts/proof-coherence-census.mjs` (DRY-fixed, generic-walk A1, brace-balanced A2,
widened A3/A4). Edited: `scripts/gates.mjs` + `package.json` (register
`proof:coherence-census` `[ci]` + `proof:hue-at-l`); `scripts/proof-motion-one-clock.mjs`
(A9 value-check the live table + the `scheme-spring.css` stale header).

**π BAR.** `node scripts/proof-coherence-census.mjs` exits NON-ZERO on HEAD with RED on all 4
defects + each self-test bite firing; exits ZERO on the synthetic corrected tree. The 3
scaffolds + the spec.ts EXIST on `tranche/BG` (`proof:gate-manifest-sound` CLEAN-TREE clears).
A GREEN on HEAD disqualifies. `vue-tsc --noEmit` exit 0 (the `.mjs` leaves are outside the TS
project). Device-free — runnable NOW.

### TASK 2 — the A5/§2.5 harmonization PAINT, CORRECTED to fill+rim (the C20 build precondition)

**MECHANISM (REVISED per critique-2 — the vibrancy filter DROPPED).** The harmonization is:
drop the NESTED `.glass-capsule` second `backdrop-filter` and read the selected pill forward
as **fill + rim** over the track's ONE sampled backdrop — **NO vibrancy `filter`** (it tints
child text/icons). Scoped to the register that ACTUALLY double-blurs (the tabs-pill-in-track),
NOT a blanket descendant set:

```css
/* src/styles/glass/glass-capsule.css — the A5 harmonization (CORRECTED, fill+rim only) */
/* The nested selected pill samples the parent TRACK's already-blurred plate (glass cannot
   sample glass — Apple GlassEffectContainer: members share ONE sampling region). Drop the
   2nd backdrop-filter; the forward-ness is the FILL (0.84/0.91 vs track 0.50) + the rim —
   NOT the blur (prototype LEG-2: fill+rim alone == HEAD's accepted +0.037/+0.044 read).
   NO `filter:` — it would tint the pill's child label/glyph. Specificity 0. */
.glass-capsule-track .glass-capsule {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    /* fill + rim + lift carry the forward-ness — unchanged, the file's own comment. */
}
```

The dock active-control register (`--dock-control-active-bg: var(--glass-bg-floating)`) is
ALREADY fill-only — it is the allowlist MODEL, NOT in this scope (no edit; A5's source arm
asserts it stays fill-only). The A5 device-free SOURCE arm scans for a `.glass-capsule`
mounting its OWN `backdrop-filter` STATICALLY nested inside `.glass-capsule-track` WITHOUT the
override (born-RED on HEAD: the override is absent, the double-blur live). It EXTENDS/sits-beside
`proof:nested-backdrop-budget` (dropping the nested blur REDUCES depth → net perf win), never
re-forks the nested-backdrop detector. The live-π walk STOPS at the first backdrop-root
(`contain:paint|layout`, `isolation`, `filter`, `opacity<1`, `transform`) — glass surfaces
carry `contain:layout style paint`, so the walk must stop or mis-attribute what the inner
element samples; the double-stack perceptual threshold DERIVES from `--glass-blur-wash-radius`
(not a magic 4px) so the WS3 peer-collapse cannot silently invalidate it.

**The paint proof (the binding residual — the REFINE that caps A5).** In a worktree, apply the
CORRECTED (filter-free) override, **`vite build` `/styles`** (no `!important` injection), build
`/navigation/tabs` (the warm paper-grain tabs route) + a busy-field aurora route, capture
chromium + webkit both modes ACROSS the dark→bright backdrop envelope (the W55 bright-bucket
darkens the plate — measure the selected pill does NOT over-brighten into a too-hot read),
decode the pill region vs the track region — the pill must measure a real FORWARD differential
(brighter fill + rim) with NO second blur AND **the pill's child label/glyph must NOT be
tinted** (the filter-bleed falsification), AND a standalone glass Button on a separate route
must be byte-untouched (its backdrop-filter intact). The gate battery MUST be GREEN on the
real in-file edit: `proof:nested-backdrop-budget` depth DROPS, `proof:touch-target`,
`proof:glass-cohesion`, `proof:no-gray` GREEN, and a real `vite build` of `/styles` succeeds.
If the fill+rim reads FLAT, the standalone button flattens, or a child glyph tints, the §2.5
harmonization is falsified and the C20 build re-opens. Paint-verify in real Safari (the
`-webkit-backdrop-filter:none` reset is engine-identical, but "engine-identical by
construction" is NOT a paint — R4).

**FILES.** Edited (the C20 build, post-paint-confirm): `src/styles/glass/glass-capsule.css`
(the scoped, filter-free override). Verified-untouched: every standalone `.glass-capsule`
consumer (Button/Badge/Chip), the dock active-control register.

**π BAR.** `tests-visual/coherence-congruence.spec.ts`'s A5 arm: nested pill measures
forward-of-track (real L/rim differential) on BOTH engines BOTH modes with zero second
backdrop-filter AND zero child-glyph tint, across the dark→bright envelope; standalone capsule
backdrop-filter intact; `proof:nested-backdrop-budget` depth DROPS (net-positive); 44px touch
floor preserved.

### TASK 3 — SHIP the A1 binding live-paint confirmation (the PIXEL, not getComputedStyle)

**MECHANISM (UPHELD — Task-3 prototype decisive).** The binding live-paint is a decoded swatch
PIXEL:

```js
// tests-visual/coherence-congruence.spec.ts — the A1 cast arm (per engine, per mode)
await page.addStyleTag({ content:
  `#__cartoon_cast{position:fixed;left:0;top:0;width:64px;height:64px;background:var(--cartoon-ink)}` });
await page.evaluate(() => document.body.insertAdjacentHTML("beforeend", '<div id="__cartoon_cast"></div>'));
const buf = await page.locator("#__cartoon_cast").screenshot();  // a real rasterized swatch
const png = path.join(OUT, `cartoon-cast-${project}-${mode}.png`);
fs.writeFileSync(png, buf);                                       // pngRegionStats is PATH-only
const stats = pngRegionStats(png, { x:0, y:0, w:64, h:64 });     // {meanL, meanChroma, meanHue}
// RECORD (diagnostic, device/local-tagged — NEVER a CI RED): the engine's gamut-mapped cast.
// getComputedStyle is a SECONDARY witness that the authored OOG literal was handed in:
const authored = await page.evaluate(() =>
  getComputedStyle(document.getElementById("__cartoon_cast")).backgroundColor);  // raw oklch echoed
```

The device-free INTENDED-chroma-over-floor leg (Task 1) is the SOLE RED authority; this arm
RECORDS the painted reality (whether the proxy clips to oxblood h29 or maps to warm-brown h56)
into the DELTA artifact as evidence. The PROTOTYPE TARGET for settling the on-device gamut
question is a real-Chrome.app + real-Safari.app cast capture (the CI proxies clip; real devices
MAY chroma-reduce) — out of Playwright's reach, NAMED for the post-integration paint.

**FILES.** `tests-visual/coherence-congruence.spec.ts` (the A1 cast arm), the DELTA artifact
`docs/tranches/BG/audit/coherence/W-CARTOON-INK-CAST-DELTA.md`.

**π BAR.** The cast swatch decodes to a recorded `{meanL, meanChroma, meanHue}` per engine per
mode; the artifact states whether the proxy clipped (oxblood h29) or mapped (warm-brown h56)
and that the device-free leg is the binding RED regardless. Local-tagged.

### TASK 4 — WIRE the §2.4 capture instrument end-to-end (the deterministic-settle build)

**MECHANISM (HARDENED per critique-4).** `tests-visual/coherence-congruence.spec.ts` over the
EXISTING `playwright.config.ts` — NO standalone `.mjs` re-fork, NO `bt.launch`. The build closes
the five under-specified seams:

1. **Webkit enrollment (1-line).** Append `"coherence-congruence.spec.ts"` to the `webkit`
   project `testMatch` (`playwright.config.ts:119`).
2. **Hard-load + the FULL clip-chain neutralize (folded §0#11).** Per route: `page.goto(route,
   { waitUntil: "load" })` (corpse-free fresh document) → `waitForSelector(expectedSurface)` →
   the SETTLE injects a capture stylesheet that releases the WHOLE app-shell clip chain (NOT
   the scroller alone — `AppShell.vue:370` `h-screen overflow-hidden` pins the doc to 100vh)
   AND snaps every ENTRANCE timeline to its terminal keyframe (NOT a blanket `animation:none`
   that kills steady-state design-language motion):

   ```js
   await page.addStyleTag({ content: `
     html, body, #app, #app > div, #app > div > div, .demo-main-scroller {
        height: auto !important; max-height: none !important; overflow: visible !important; }
     /* the inner scroller's scroll-timeline is now dead — snap every view()/scroll()-driven
        ENTRANCE to its TERMINAL keyframe (NOT metal-shimmer/handmark-boil steady-state) */
     .scroll-cascade > *, [data-scroll-reveal], .scroll-build {
        animation-timeline: none !important; animation: none !important;
        transform: none !important; opacity: 1 !important; }` });
   await page.waitForFunction(() => {                        // robust settle, not a fixed rAF
     const stuck = [...document.querySelectorAll('.scroll-cascade > *')]
       .filter(e => getComputedStyle(e).opacity !== '1').length;
     return stuck === 0;
   });
   ```
   A FLATTEN-FAITHFULNESS check precedes trust: decode the SAME glass-over-backdrop surface
   flattened-vs-scrolled; if sticky scroll-shrink headers / `.scroll-pin` stages / fixed
   full-bleed StoryHero backdrops corrupt the flatten, fall back to per-viewport-segment
   scroll-and-stitch.
3. **Real decode, freshness-bound, + a DECODED-PIXEL coherence assertion (folded §0#12).**
   Write the `fullPage:true` Buffer to disk, then `isRealPng` + `pngDimensions` +
   `pngRegionStats` (real per-region L/chroma stddev) + assert a per-route below-the-fold
   expected-surface selector decodes (NOT the mount-root corpse). Bind ≥1 end-to-end coherence
   assertion on a DECODED-PIXEL differential between two surfaces on the route (two glass
   tiers' composited L, or the cast-region vs a body-ink region) — NOT a `getComputedStyle`.
   Surface-hash freshness rides `scripts/lib/surface-closure.mjs` `deriveSurfaceClosure` (it
   EXISTS untracked — wireable NOW).
4. **A1 cast arm (Task 3) + A5 nested-vs-standalone arm (Task 2) + both modes.** The spec.ts
   reaches its full §3 role: the A1 cast PIXEL, the A5 nested-pill-vs-standalone-button decode,
   over `{light, dark}` (toggle `.dark` via `emulateMedia`/`addStyleTag`), in
   `{chromium-headless-new, webkit}`.
5. **Budget + scope cap, stated.** The binding run is the LIVE **120** `s()` routes × 2
   engines × 2 modes = **480 fullPage captures** + real decode, `workers:1
   fullyParallel:false`, ~20-40min serial, **`local`-tagged** (real browser + demo + GPU
   subset), NEVER a CI default. Playwright-webkit acquires **ACQUIRABILITY ONLY** — it reports
   `startViewTransition`/`backdrop-filter:url()`/`animation-timeline` ALL `true` while real
   Safari no-ops/drops them, so a GREEN webkit run is ZERO cross-engine-fidelity evidence; the
   binding C19/SVG-lens/`-webkit-backdrop-filter` verdicts need **real Safari.app on
   AS-Tahoe** (the WS8 C-SAFARI chronic), out of reach — the deliverable says so.

**FILES.** New: `tests-visual/coherence-congruence.spec.ts`. Edited:
`tests-visual/playwright.config.ts:119` (testMatch widen).

**π BAR.** The instrument captures a NAMED below-the-fold surface on a real `:5199` route in
both engines both modes; the scroll-cascade routes capture SETTLED (no stuck entry keyframe,
no killed steady-state motion); `pngRegionStats` decodes real variance; the decoded-pixel
coherence assertion binds; surface-hash binds. The full-matrix run is the post-integration
binding capture (R1); pass-2 proves the instrument MECHANISM on the broken HEAD (it captures,
decodes, settles deterministically, reaches below-the-fold, binds a pixel differential).

---

## 3 · FILES TOUCHED (pass-2 delta over pass-1 §4)

**New on tree (the persist):**
- `scripts/lib/hue-at-l.mjs` — the shared `clamp/calc/max(c,…)` relative-color evaluator +
  `inkBandVerdict` (advisory-clip-hue, INTENDED-cool-hue RED leg); reuses `oklabFromRgb`.
  Imported by BOTH `proof-hue-at-l` (WS12) AND `proof-no-gray`'s `cartoon-ink-warm-in-gamut`
  witness (WS3-M1) — lands FIRST.
- `scripts/proof-hue-at-l.mjs` — the standalone A1 gate (RED on HEAD, GREEN on the band, the
  self-test bites; clip-hue advisory).
- `scripts/proof-coherence-census.mjs` — the A1–A9 system-spec gate, DRY-fixed (imports the
  leaf), generic-walk A1, brace-balanced A2, widened A3/A4, A2 reads the live `SPRING_PRESETS`.
- `tests-visual/coherence-congruence.spec.ts` — the per-page dual-engine both-modes π (the A1
  cast arm + the A5 nested-vs-standalone arm + the §2.4 full-matrix capture + the decoded-pixel
  coherence assertion).
- `docs/tranches/BG/audit/coherence/W-CARTOON-INK-CAST-DELTA.md` — the A1 painted-cast record.

**Edited (pass-2):**
- `scripts/gates.mjs` + `package.json` — register `proof:coherence-census` `[ci]` +
  `proof:hue-at-l`.
- `tests-visual/playwright.config.ts:119` — widen the `webkit` `testMatch`.
- `src/styles/glass/glass-capsule.css` — the SCOPED, FILTER-FREE A5 override (the Task-2
  build; lands as the C20 build post-paint-confirm).
- `scripts/proof-motion-one-clock.mjs` — A9 value-checks the live table (the 3 stale allowlist
  literals + the `scheme-spring.css` stale header; pass-1 already widens M3(a) + drains the
  fence).

**All pass-1 §4 edits (the clock-fence discharge, the off-table spring/easing swaps, the
demo-backdrop harmonizations, the CLAUDE.md reconciles) STAND** — pass-2 does not re-scope
them; it hardens the gate + instrument that LOCK them.

---

## 4 · WAVE BREAKDOWN (pass-2 — the same BG.W-* waves, advanced on the frontier)

The five pass-1 waves stand. Pass-2 sharpens their born-RED/persist obligations:

- **BG.W-COHERENCE-CENSUS** (zero-pixel) — unchanged; produces `WS12-CENSUS.md` (records the 4
  HEAD defects + the A2/A3/A4 coverage bounds + the §4 calibration).
- **BG.W-COHERENCE-GATE** — PERSIST the 4 scaffolds (Task 1) with the DRY fix, the generic
  A1-walk, the brace-balanced A2, the widened A3/A4, the clip-hue-advisory decision, the
  `[0.02,0.06]` band, the live-table A2, and the A9 stale-allowlist value-check. PROVE born-RED
  on HEAD (the 4 defects + the self-test bites) IN THIS CHECKOUT before trust. Land the shared
  `hue-at-l.mjs` leaf FIRST (R6); coordinate with WS3-M1 (one leaf, two importers). Enroll the
  per-page verdict into WS7's `proof:ba-gestalt` roster (necessary-not-sufficient).
- **BG.W-DESIGN-LANGUAGE-UNIFY** — the A5/§2.5 C20 BUILD, CORRECTED to fill+rim ONLY (Task 2,
  the vibrancy filter DROPPED), scoped to `.glass-capsule-track .glass-capsule` + reconciled
  with `proof:nested-backdrop-budget`. The paint-confirm (fill+rim reads as selected glass;
  child glyph un-tinted; standalone untouched; dark→bright envelope; real `vite build`) is the
  binding REFINE residual; the build lands post-confirm.
- **BG.W-ANIMATION-CONGRUENCE** — unchanged (the 8-leg discharge, the off-table swaps, the
  alias re-time); A2/A9 value-check the live source. R5: coordinate the 3 layer-group legs
  with WS2 (discharge under WS2 or record no-op).
- **BG.W-GLASS-PAPER-CONGRUENCE** — unchanged (Regular/Clear map, key-light spine, concentric
  radius).
- **BG.W-PAGE-COMPONENT-AUDIT** — the §2.4 instrument WIRED end-to-end (Task 4) with the
  full-clip-chain neutralize + the entrance-only settle + the `waitForFunction` settle + the
  decoded-pixel coherence assertion + the A1 cast arm (Task 3); the full-matrix paint run is
  post-integration.

**Sequencing (hard):** Task 1 (persist+prove) + Task 4 (wire instrument) + Task 3 (cast arm)
run NOW on broken HEAD; Task 2 (A5 paint) is the prototype-then-build refine. The
harmonized-whole capture rides WS1→WS4→WS3/WS8→WS9 landing, THEN the PAGE-COMPONENT-AUDIT paint
run.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR (pass-2)

1. **`proof:coherence-census` born-RED on 4.2.0** — RED on the 4 live defects (cartoon-ink
   `max(c,0.11)` via the intended-chroma-over-floor leg; blur `resting10/floating13/dock9`;
   `DECK_SPRING {0.5,0.85}` via the live-imported table; `HandMark cubic-bezier`) + every
   self-test bite firing; GREEN on the synthetic corrected tree. A GREEN on HEAD disqualifies.
   The scaffolds EXIST on `tranche/BG` (CLEAN-TREE clears), DRY-fixed (one A1 leaf,
   generic-walk, brace-balanced A2), proven RED before trust.
2. **A1** RED via INTENDED-chroma-over-floor (`0.11 ∉ [0.02,0.06]`) AND INTENDED-cool-hue;
   clip-hue + hue-shift ADVISORY-printed; GREEN on the BAND (`max(c,0.03)` AND WS3's
   `clamp(0.030,c,0.050)` both green — band-checked, not literal). The binding live-paint is
   the decoded swatch PIXEL (recorded per engine per mode); `getComputedStyle` is a secondary
   diagnostic only.
3. **A5** source arm RED on HEAD (the scoped, filter-free override absent; the
   `.glass-capsule-track .glass-capsule` double-blur live); the paint prototype confirms the
   nested pill reads forward (fill+rim) with NO second backdrop-filter AND NO child-glyph tint
   AND the standalone capsule byte-untouched, both engines both modes across the dark→bright
   envelope; `proof:nested-backdrop-budget` depth DROPS; the gate battery
   (`proof:touch-target`/`glass-cohesion`/`no-gray`) GREEN on the real in-file `vite build`.
4. **The §2.4 instrument** captures a NAMED below-the-fold surface on real `:5199` routes,
   both engines both modes, with scroll-cascade routes SETTLED (the FULL clip chain released;
   the entrance timelines snapped to terminal; the steady-state design-language motion NOT
   killed), real `pngRegionStats` decode + a decoded-pixel coherence assertion + surface-hash
   freshness. The full-matrix dual-engine both-modes capture (the binding congruence verdict)
   rides post-integration; webkit = acquirability-only; the SVG lens is a Chrome-only
   enhancement (Safari reads as one system on the `@supports` blur+tint+rim FLOOR).
5. **No regression** — `proof:no-layout-animation`, `proof:glass-cohesion`,
   `proof:nested-backdrop-budget`, `proof:touch-target`, `proof:no-gray`, `proof:safari-webgl`
   GREEN after every WS12 swap; bundle budget re-bases BEFORE growth.

---

## 6 · FOLDED DEFERRED + PASS-2 RECONCILES (no silent drop)

- **The vibrancy `filter` FALSIFIED** — the A5 harmonization is fill+rim ONLY (critique-2);
  the optional indicator-only `--glass-capsule-vibrancy` is a SEPARATE booked decision, not
  this build.
- **A5 scope = `.glass-capsule-track .glass-capsule`** (the actual double-blur register), NOT
  a blanket `:where()` over all glass parents; the dock active-control is a separate named
  fill-only decision (already correct, no edit).
- **A1 is the GENERIC over-correction catcher** — grep-walked over `src/styles` (critique-1),
  not a 2-entry hardcode; the docstring is reconciled.
- **A2 brace-balanced parse** (critique-1) over the 160-char proximity regex.
- **A3/A4 coverage widened** (critique-1) — A3 the inline raw-blur scan; A4 the novel-off-token
  bezier/steps/linear scan; the genuine bounds RECORDED in `WS12-CENSUS.md`.
- **A9 value-checks the STALE allowlist** (critique-5) — `useSpringPress[0.25,0.7]`/
  `DOCK_SPRING[0.32,0.7]`/`DRAWER_SNAP[0.4,0.82]` all stale vs live `{0.2,0.8}`/`{0.68,0.64}`/
  `{0.5,0.74}`; the `scheme-spring.css` header stale on all 6 rows.
- **The full clip-chain neutralize** (critique-4) — `html/body/#app` + the `h-screen` shell
  root + the flex-column wrapper + the scroller, not the scroller alone.
- **The entrance-only settle** (critique-4) — `animation:none` SCOPED to view()/scroll()-driven
  entrances, NOT a blanket that kills metal-shimmer/handmark-boil steady-state motion.
- **The decoded-pixel coherence assertion** (critique-4) — ≥1 end-to-end π binds a real
  two-surface decoded-L differential, not getComputedStyle.
- **The pass-1 spec's own stale press pair `{0.25,0.7}`** — RECONCILED to the live
  `springPresets.ts` row `{0.2,0.8}`.
- **All pass-1 §7 folds STAND** (the BF 32-row deferred-census fold-ledger, the
  CLOCK_FENCE_PENDING discharge, the CATEGORY_DEFAULT_BG decision, the ℱ-slot/scroll-hairline
  verify, the CLAUDE.md ratchet-∅/DRAWER_SNAP reconciles).

---

## 7 · OPEN RISKS (pass-2)

- **R1 · No evidence surface at HEAD (highest, unchanged).** The binding congruence capture
  depends on WS1–WS11 LANDING (empty diff). Pass-2 delivers the persisted gate + the corrected
  A5 paint prototype + the instrument wiring + the cast record; the harmonized-whole verdict
  is post-integration. Do NOT self-report congruence on faith.
- **R2 · The on-device gamut question is genuinely OPEN.** The runnable proxies per-channel-
  clip `oklch(0.18 0.11 56)` to oxblood; real Chrome.app/Safari.app MAY chroma-reduce. The
  device-free intended-chroma-over-floor leg sidesteps it (the binding RED); a painted-pixel
  RED would FALSE-RED on a chroma-reducing engine, so it is diagnostic/device-tagged ONLY.
- **R3 · A5 is a REFINE, not converged (the cap).** The vibrancy-filter approach is falsified;
  the corrected fill+rim form needs a fresh paint-confirm (forward differential + child-glyph
  un-tint + standalone-untouched + dark→bright envelope) + a real `vite build` gate run BEFORE
  the C20 build lands. The scope `.glass-capsule-track .glass-capsule` must be re-verified
  complete (no other static double-blur register survives).
- **R4 · Playwright-webkit is a FALSE Safari proxy** (reports all the broken features as
  supported). Acquirability only; C19/SVG-lens/`-webkit-backdrop-filter` fidelity needs real
  Safari.app on AS-Tahoe — stated, not hidden.
- **R5 · Clock-fence ↔ WS2 dock-engine collision.** The 3 layer-group legs are WS2's box-morph
  register; discharge under WS2's reconcile or record a no-op (never a conflicting edit).
- **R6 · The DRY-coordination race with WS3-M1.** Both land "NOW" born-RED on `--cartoon-ink`
  sharing `hue-at-l.mjs`. The leaf lands FIRST; both gates import it (no second resolver).
- **R7 · The scaffolds are NOT yet on the tree.** They live only in worktrees
  (`wf_ca1b0f4b-227-*`); `git status` on `tranche/BG` shows none. The "persisted + proven RED"
  claim is FALSE until the develop-out lands them + `proof:gate-manifest-sound` CLEAN-TREE
  clears. This is Task 1 of 4 — the gate's GREEN-on-corrected is NOT system convergence.

---

*Pass-2 CONVERGED synthesis. The four-task frontier is hardened with the folded critique
mustFix: the scaffolds persist with the DRY fix + the generic A1-walk + the brace-balanced A2
+ the widened A3/A4 + the live-table A2/A9; the A5 harmonization is CORRECTED to fill+rim only
(the vibrancy filter falsified) and scoped to the actual double-blur register; the A1 binding
paint is the decoded PIXEL; the capture instrument closes the full-clip-chain + entrance-only
settle + decoded-pixel coherence seams. The binding congruence verdict rides WS1–WS11 landing
(R1); A5's paint is a genuine REFINE (R3). The honest cap is the spec.*
