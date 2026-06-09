# B2-ff — adversarial hardening of AY.W-FF2 (fourier-field W43 intensity model)

**Lane** B2-ff · **Wave** AY.W-FF2 · **Verdict** GAPS-FOUND · **Date** 2026-06-09
**Scope** the AS-BUILT fourier-field intensity land at tranche/AY HEAD — RED-TEAM only, no edits.

## TL;DR

The W43 intensity model **DID land at the source level** — `OUTLINE_PEAK_ALPHA` is gone (grep=0),
the six-field per-variant bundle is populated, the `intensity` prop + `[0,2]` clamp ship, the
zero-alloc color hoist moved into the watch, the amplitude sort + dark/light blend fork are present,
`evalFourier` is deleted, `/fourier-math` is minted with a live smoke-test importer, and BOTH static
(`proof:fourier-field-intensity`) + device (`proof:fourier-field-visibility-live`, 2/2 GREEN) gates
genuinely pass (I re-ran both — PASS, exit 0). The structural land is real and faithful to the SOTA
recipe.

**BUT the field is gate-passing, not perfected.** The captured DELTA shows the `final` preset as a
**thin diagonal arc** — NOT the "full-frame phosphor comet" / "signature mark" the DELTA prose and
SOTA research demand. The gate's 25% bbox-span floor is a weak proxy that a single thin corner-to-corner
stroke clears trivially (≈4% pixel coverage at spanW=spanH=100%). The light-mode trail floor is
sub-perceptible on cream, and under StoryHero's intensity=0.4 recession the field goes invisible —
an unverified visual state. The cross-repo math-dup is DEFERRED (sibling still byte-duplicates), and
`/fourier-math` is a published public API whose only consumer is a self-written test.

## What genuinely landed (the wins — confirmed)

- **G1 — `OUTLINE_PEAK_ALPHA` deleted.** `grep -rc OUTLINE_PEAK_ALPHA src/` → 0. Clean break, no alias.
- **The six-field bundle** is on `VariantPreset` (`FourierField.vue:92-103`) and populated for both
  presets (`:106-139`). `headGlowAlpha > peakAlpha` holds (0.62>0.55 hero, 0.50>0.45 final).
  `trailFadeExp` ∈ [1,2) (1.4/1.5 — soft, not quadratic). `trailFloor` > 0.
- **The `intensity` prop** + clamp `Math.max(0, Math.min(2, intensity))` (`:69`), scales at the paint
  layer (`peak = preset.peakAlpha * intensityClamped`, `:284-285`).
- **The zero-alloc hoist** — color resolve moved into `refreshResolvedColor()` fired only on the
  color/dark watch (`:175-190, :391-402`); `render()` reads cached `outlineRgb.value`/`epicycleRgb.value`.
- **The blend fork** — `c.globalCompositeOperation = isDark.value ? "lighter" : "source-over"` (`:347`).
- **The amplitude sort** — `[...spectrum].sort((a, b) => b.amplitude - a.amplitude)` (`:225`), correctly
  kept SEPARATE from the emission-order `spectrum` the `positionsAt` head read uses (order-independence
  documented inline `:217-224`).
- **`evalFourier` deleted** from both `math.ts` + `index.ts`; `/fourier-math` subpath minted
  (`src/subpaths/fourier-math.ts`, `package.json` exports + typesVersions); smoke test imports via the
  published subpath (`tests/.../FourierField.smoke.test.ts:19-23`) and passes (4/4); consumer-evidence
  doc present. README present. api/ type seat present (`FourierFieldVariant`/`FourierFieldProps` in
  `index.ts`). StoryHero threads `:intensity="opacityCeiling"` (`StoryHero.vue:129`).
- **Both gates in the `scripts/gates.mjs` registry** (`:740, :746`) and `package.json` proof block.
- Static gate re-run: PASS (self-test bite-proof OK). Device gate artefact: `specsPassed: 2, specsFailed: 0`.

## Findings (what is STILL wrong / not perfected)

### F1 — [SEVERITY: HIGH] The `final` preset reads as a THIN ARC, not the "signature phosphor comet" — the DELTA prose overstates the as-built
The DELTA doc (`W-FF2-DELTA.md:28-29, 79-80`) claims the `final` preset "READS as a full-frame phosphor
comet" and "its comet trail traverses the frame." Viewing all 4 captured PNGs
(`W-FF2-fourier-field-{desktop,mobile}-{light,dark}.png`) — and a 2× zoom-crop of the dark/light final
panels — the `final` preset is a **single thin diagonal red stroke** with a small bright head. Measured
on the captured desktop-dark final panel: 8,917 painted px over a ~225k-px panel = **≈4% coverage** at
spanW=spanH=100%. It is BETTER than the AX 0.24-whisper corner stub (the head now glows, the body is
brighter), but it is NOT the "oscilloscope/CRT-vector signature mark" the SOTA research (§0.2, §R2) and
the wave Goal ("a signature mark," "stunning") demand. The bbox-span being 100% is a metric artefact
(a thin diagonal line spans the bbox), not visual fullness.

### F2 — [SEVERITY: MEDIUM] The visibility gate's 25% bbox-span floor is a WEAK proxy that any thin diagonal stroke clears
`tests-visual/fourier-field-visibility.spec.ts:50` sets `BBOX_SPAN_MIN = 0.25`. A comet trail covers
only **~16% of the curve period by design** (computed: hero trailLength=170 frames ≈ 17.7% of the 16s
period; final trailLength=200 ≈ 15.9% of the 21s period), so the painted figure is ALWAYS a partial arc,
never a closed traverse. Because the head sweeps the bbox over the period, a single thin arc clears
spanW≥25% trivially — the gate cannot distinguish "thin arc" from "full comet." The DELTA's "spanW/spanH
= 1.0 (full traverse)" is true of the BBOX but false of the visual. The gate certifies presence, not the
stunning bar; it is born-RED→GREEN correctly but under-constrains the result.

### F3 — [SEVERITY: MEDIUM] Light-mode trail body is sub-perceptible — the "body survives" claim is dark-mode-only
The trailFloor survival floor over CREAM (source-over, no additive accumulation): final = peak·floor =
0.45·0.08 = **0.036 effective alpha**, hero = 0.55·0.10 = 0.055. A 0.036-alpha warm-red stroke on the
cream ground is sub-perceptible — the light-mode captures corroborate (`final-light` zoom: the arc fades
to invisible at the tail). The D2 "the body survives" fix is real in DARK mode (the `lighter` additive
op accumulates), but in LIGHT mode the floor does not survive visibly. The gate's `BODY_MEAN_MIN = 0.08`
is a normalized painted-delta over the whole canvas, not the per-pixel alpha, so it passes while the
light tail is gone. `FourierField.vue:354-355`, `:138` (final trailFloor 0.08).

### F4 — [SEVERITY: MEDIUM] StoryHero intensity=0.4 recession is UNVERIFIED and likely invisible in light mode
StoryHero threads `:intensity="opacityCeiling"` (hero=0.6, page=0.4). At intensity=0.4, the final
light-mode trail floor = 0.45·0.08·0.4 = **0.0144** — invisible. The visibility gate measures
intensity=1 ONLY; the recession monotonicity (G3 clause 4) is delegated to a smoke-test MATH assert
(`peak = peakAlpha * intensityClamped`), NOT a visual floor at the recessed intensity. So the actual
P7/Q9 three-substrate-parity state (the fourier hero recessed at 0.4–0.6) is never visually verified —
the parity may land the fourier hero below perceptibility while the gate stays green. No captured DELTA
of the StoryHero/auth-shell hero at the recessed intensity exists (the captures are the demo storybook
at intensity=1).

### F5 — [SEVERITY: MEDIUM] Cross-repo math-dup is DEFERRED, not resolved — the AY headline is unmet for fourier
The sibling `../fourier-analysis/web/src/lib/{bases,evaluators}.ts` STILL contains its own
`fourierPositionsAt`/`evaluateFourier` byte-copies and does NOT import `@mkbabb/glass-ui/fourier-math`
(grep: 0 hits). The glass-ui half of the PROMOTE is minted, but the consumer half is booked to the
sibling's own tranche. This is correct cross-repo hygiene (glass-ui writes no sibling source), but the
AY headline — "close the bespoke-copy-in-consumer the constellation.ts-class duplication" — is NOT
achieved for the fourier leaf. The duplication persists in the wild; only a future sibling-tranche edit
closes it.

### F6 — [SEVERITY: LOW] `/fourier-math` is a published public API surface whose ONLY consumer is a self-written test (thin overfitting)
The consumer-evidence doc is honest, but importer #1 is `FourierField.smoke.test.ts` — a test authored
specifically to be the importer that clears the overfitting bar at mint time. The only REAL external
consumer (fourier-analysis) is "BOOKED" to a future tranche. The W-FF1 §4.4 fallback (do NOT mint until
the sibling re-point is concurrent) was explicitly available and declined. A published `exports` entry
in `package.json` with zero binary consumers, justified by a test-that-exists-to-justify-it, sits right
at the speculative-subpath line the overfitting audit forbids. Defensible (pre-acknowledged in §2.9) but
thin.

### F7 — [SEVERITY: LOW] dist `.d.ts` for the new subpaths is ABSENT on-disk — the G4 dts-publish clause is unverified at HEAD
`dist/fourier-math.d.ts` and `dist/fourier-field.d.ts` do not exist (only the `.js` chunks; dist has 10
`.d.ts` total vs 60+ subpaths — a partial/stale build). The G4 clause `npm run verify-export-types →
green; the /fourier-field AND /fourier-math subpath dts publish (WITHOUT evalFourier)` cannot be
confirmed from the current tree — it needs a fresh full `npm run build`. The `.js` is clean of
`evalFourier`; the dts-emission half of G4 is unproven on-disk.

## Deferred / out-of-scope (correctly booked, recorded)

- The fourier-analysis-repo re-point (delete its math dup, import `/fourier-math`) — booked to the
  sibling's own tranche (F5). Correct cross-repo discipline.
- The WebGPU render axis — SOTA §3 records it as a future additive enhancement, not a blocker. Correct.

## Gestalt

Is the fourier-field PERFECTED end-to-end? **No — it is correctly LANDED but not stunning.** The chronic
AX→AY visible-invisibility is fixed at the MECHANISM level (the 0.24-quadratic is gone, the bundle +
intensity + blend fork + hoist all ship and gate-green), and the dark-mode head glow now reads. But the
acceptance bar is "stunning/perfect components, not just green," and the as-built `final` preset is a
thin ~4%-coverage diagonal arc that clears a 25% bbox proxy — not the signature phosphor comet the SOTA
research and the DELTA prose claim. Three real residual visual gaps stack: (F1) the comet is thin/partial
by the trailLength budget, (F3) the light-mode body floor is sub-perceptible on cream, and (F4) the
StoryHero intensity=0.4 recession — the very parity the wave exists to deliver — is unverified and
likely below perceptibility in light mode. The structural land deserves a PASS; the VISUAL gestalt does
not yet meet the bar. A perfecting pass would: lengthen/brighten the trail toward a true signature stroke
(or raise the light-mode floor with a non-additive legibility lift), tighten the visibility gate beyond a
bbox proxy (coverage-fraction or a perceptual-arc-length metric), and capture the recessed-intensity hero
DELTA so the three-substrate parity is shown, not asserted.
