# AY.W-FF2 — Fourier-field: LAND the W43 intensity model + 3-substrate parity + delete `evalFourier`

**Tranche** AY (glass-ui) · **Band** A (perfect the landed visual substrates) · **Kind** impl ·
**State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **HEAD** `at-dock-convergence`
**Spec inputs** `docs/tranches/AY/audit/W-FF1-fourier-rebase.md` (the predecessor REBASE + the recorded
math-leaf DECISION — branch (a) PROMOTE, the PINNED resting-paint alpha, the AX→AY dependency rebase),
`audit/hardening/H-fourier.md`, `audit/hardening/H-overfitting.md`, `audit/hardening/H-cardinal.md`,
`audit/inventory/W43-fourier-field-SOTA.md` (the executed SOTA research),
`docs/tranches/AX/waves/AX.W43-fourier-field-first-class.md` (the born-RED-but-stopped predecessor spec).

---

## Goal criterion

The shipped, exported, live-consumed `FourierField` READS. Today it is visibly broken — every preset paints
at a hardcoded `OUTLINE_PEAK_ALPHA = 0.24` with a QUADRATIC body decay, so the `final` preset (epicycles off,
trail-only) renders as a tiny corner comet stub and the `hero` preset is a barely-visible whisper. W-FF2 LANDS
the W43 SOTA intensity model the predecessor spec authored but never landed: the per-variant paint BUNDLE
replacing the single constant, the 3-pass phosphor-comet render with the dark/light blend fork, the
amplitude-descending draw sort, the zero-alloc per-frame color hoist, and an `intensity?: number` outer-envelope
prop in the Aurora `opacityCeiling` shape. With the prop in place, `StoryHero.vue` threads `:intensity` into the
fourier hero so it recesses at parity with the aurora hero (the P7/Q9 three-substrate parity the hardening lane
named broken). The dead `evalFourier` export is removed (clean break). Success looks like: both presets legibly
distinct as a family at the pinned resting alpha, light AND dark, captured on a paired-π DELTA — the
visible-invisibility chronic that has crossed AX→AY without landing is CLOSED at the root.

## Completion criterion

The five hard-gate clauses below all verify (the §"Hard Gate" checklist): the deleted-constant grep returns 0;
the new static gate `proof:fourier-field-intensity` is born-RED at the pre-edit HEAD and GREEN after; the new
device gate `proof:fourier-field-visibility-live` reads the painted canvas back over BOTH presets and BOTH
modes; the `evalFourier` deletion is proven by grep + `verify-export-types` green without it; and the cardinal
gate `proof:live-verified-ledger` (AY-pathed) is GREEN against a `W-FF2-DELTA.md` that references own-surface
PNGs at ≥2 viewports × {light,dark}. Both goal AND completion must hold for a clean close.

---

## 1. The verified defect (file:line, against HEAD `at-dock-convergence`)

W43 was authored fully born-RED (`docs/tranches/AX/waves/AX.W43-fourier-field-first-class.md`, two gates) but
STOPPED before landing. Every deliverable is ABSENT in live source. Hard evidence:

| # | Defect | Evidence (file:line) |
|---|---|---|
| D1 | `OUTLINE_PEAK_ALPHA = 0.24` survives — the single flat ceiling for every layer of both presets | `FourierField.vue:103`; `grep -c OUTLINE_PEAK_ALPHA src/` → **5** (all in `FourierField.vue`: `:103,:237,:242,:282,:294`) |
| D2 | The trail body decays QUADRATICALLY (`age*age`) — a quadratic kills the body, so the oldest ~80% of the trail is sub-perceptible; the `final` preset (epicycles off) draws ONLY this trail → renders as a faint corner stub | `FourierField.vue:282` `c.globalAlpha = OUTLINE_PEAK_ALPHA * age * age;` |
| D3 | The epicycle arms paint at `0.24*0.6*0.5 ≈ 0.072` (circle) and `0.24*0.6 ≈ 0.144` (arm) — sub-perceptible scaffolding | `FourierField.vue:237,242` |
| D4 | The head glow shares `OUTLINE_PEAK_ALPHA` — it is NOT the strongest layer (W43 §2.2 wants `headGlowAlpha > peakAlpha`, head-forward) | `FourierField.vue:294` `c.globalAlpha = OUTLINE_PEAK_ALPHA;` |
| D5 | NO `intensity` prop on `defineProps` — the field has no loudness knob; `StoryHero.vue` cannot recess it | `FourierField.vue:40-57` (props: `variant`/`color`/`colorResolver`/`seed`/`freeze` only) |
| D6 | NO per-variant bundle fields in `VariantPreset` — no `peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor` | `FourierField.vue:59-99` (`VariantPreset` + `PRESETS`) |
| D7 | The per-frame color resolve re-runs `colorResolver` + `cssToOklch` + `deriveHue` + `oklchToGammaRgb` EVERY frame (60×/s) for a value that changes only on a color/dark toggle — no zero-alloc hoist | `FourierField.vue:212-222` (inside `render()`) |
| D8 | NO amplitude-descending sort — `makeEllipticSpectrum` emits `[+1,−1,+2,−2,…]` emission order; the draw pass never sorts largest-first (R1) | `math.ts:125-139` (emission order); `FourierField.vue:228-247` (draw, unsorted) |
| D9 | The render is a flat single-pass `globalAlpha` stroke + one `shadowBlur=14` head pass — no additive `lighter`-on-ink / `source-over`-on-cream blend fork, no per-variant `headGlowBlur`, no `trailFloor` | `FourierField.vue:276-302` |
| D10 | `evalFourier` is a DEAD export on the published `/fourier-field` subpath — exported at `index.ts:4`, defined at `math.ts:39`; `rg "evalFourier" src/ demo/ ../slides/src ../fourier-analysis/web/src ../speedtest/src` → only the definition + the re-export + a jsdoc `{@link evalFourier}`; **zero call sites anywhere** (`FourierField.vue` uses `positionsAt` + `makeEllipticSpectrum`, never `evalFourier`) | `index.ts:4`, `math.ts:39-56` |
| D11 | The three hero substrates are NOT sibling-parity — `StoryHero.vue:112` threads `:opacity-ceiling` into Aurora and `:116-123` Constellation carries its tuned focal alpha, but the fourier block `:124-132` has NO loudness knob; the `auth-shell` hero paints at the un-recessable hardcoded 0.24 (breaks P7/Q9) | `demo/stories/StoryHero.vue:124-132` |

**Captured visual truth** (the cardinal DELTA, both modes, the live render in the demo storybook):
`docs/tranches/AX/audit/visual/W18-fourier-field-desktop-light.png` +
`docs/tranches/AX/audit/visual/W18-fourier-field-desktop-dark.png`. Both show the `final` preset as a tiny faint
red comet stub in the corner — the curve is effectively invisible. This is the binding pre-edit witness.

**Chronic-miss flag (H-fourier §8):** the W43 intensity model has crossed TWO tranches (AX.W43 authored-but-
stopped → AY.W-FF inherited) without landing. The risk is re-producing "a path-forward doc" (the doc exists
twice — the W43 spec + the SOTA research) instead of LANDING the fix. The gate is the LIVE capture + the
deleted-constant grep, not another research artefact.

---

## 2. Objective (the LAND, gestalt — no workaround, root-not-consumer)

Replace the single `OUTLINE_PEAK_ALPHA` ceiling with the W43 per-variant intensity BUNDLE and the SOTA render
recipe, in `FourierField.vue` + `math.ts`, with NO compat alias (clean break per the no-backwards-compat
precept). Add the `intensity?: number` prop (the Aurora `opacityCeiling` shape) and thread it from
`StoryHero.vue` so the three hero substrates reach parity. Delete the dead `evalFourier` export. Every magnitude
becomes a per-variant bundle field scaled by the ONE outer `intensity` — never a magic constant in the render
body (the token-first / variant-IS-the-bundle precept).

The SOTA recipe is fully specified in `audit/inventory/W43-fourier-field-SOTA.md` §2; this spec PINS the exact
edit-sites and the single unambiguous resting target the visibility gate measures.

### 2.1 The per-variant bundle (replaces `OUTLINE_PEAK_ALPHA`)

Extend `VariantPreset` (`FourierField.vue:59-76`) with six fields; populate both `PRESETS` entries
(`:78-99`) with the SOTA-grounded defaults (W43 §2.2, anchored against the `fourier-analysis` in-repo render
ratios). **One unambiguous resting target, intensity = 1** (resolves the W43 §5 0.55-vs-0.35 hedge — the gate
measures the head-segment paint alpha at the default intensity):

| Field | Type | Role | hero | final |
|-------|------|------|------|------|
| `peakAlpha` | `number` | comet-trail peak (head segment); replaces `OUTLINE_PEAK_ALPHA` | **0.55** | **0.45** |
| `headGlowAlpha` | `number` | head-glow alpha — the STRONGEST layer (`> peakAlpha`) | **0.62** | **0.50** |
| `headGlowBlur` | `number` (px) | head-glow `shadowBlur` radius | **16** | **14** |
| `epicycleRatios` | `{ circle: number; arm: number }` | scaffolding alpha ÷ peak (hero only) | `{ circle: 0.18, arm: 0.30 }` | `{ circle: 0, arm: 0 }` |
| `trailFadeExp` | `number` | trail persistence exponent — SOFT, never quadratic | **1.4** | **1.5** |
| `trailFloor` | `number` | min trail alpha ÷ peak — the body survives, never dies to 0 | **0.10** | **0.08** |

### 2.2 The `intensity` prop (the Aurora `opacityCeiling` shape)

Add to `defineProps` (`FourierField.vue:40-57`):

```ts
/** Outer loudness envelope (the Aurora opacityCeiling shape). Scales the resolved
 *  peakAlpha / headGlowAlpha at the paint layer. Default 1; clamped [0, 2]. */
intensity?: number;
```

Default `1` (byte-identical loudness to the bundle defaults — the resting target the gate measures). Clamp
`Math.max(0, Math.min(2, intensity))` (Aurora clamps `opacityCeiling` to `[0,1]`; the field's `~2` upper bound
lets a hero push brighter than the recessed default without runaway, per W43 §2.3). It scales at the PAINT layer
(`globalAlpha` multiply), NOT a CSS `opacity`, because the field's loudness is per-LAYER (head vs trail vs
scaffolding), not a uniform element opacity:

```
peak     = preset.peakAlpha     * intensityClamped
headGlow  = preset.headGlowAlpha * intensityClamped
```

### 2.3 The 3-pass phosphor-comet render (replaces `FourierField.vue:224-303`)

Replace the flat stroke. Every pass reads the bundle + the clamped intensity (W43 §2.1):

- **Pass 0 — epicycle scaffolding (hero only, `preset.epicycleRatios.arm > 0`).** Sorted-descending spectrum
  (R1, §2.4). `source-over` (scaffolding does not bloom). Circle stroke `globalAlpha = peak * epicycleRatios.circle`,
  arm stroke `globalAlpha = peak * epicycleRatios.arm`.
- **Pass 1 — the comet TRAIL body.** `c.globalCompositeOperation = isDark.value ? "lighter" : "source-over"`
  (the Safari-safe Canvas2D 2D-context op — NOT a CSS `mix-blend-mode`; no `@supports` gate, no fallback rung,
  per W43 §2.1 "the 2D-context `lighter` is the device-free-safe path"). Per segment `age = i/(len-1)` (0 oldest
  … 1 head): `a = peak * Math.pow(age, preset.trailFadeExp)`; then `a = Math.max(a, peak * preset.trailFloor)`
  (the body survives — the direct D2 fix). Stroke `lineWidth 1.6`, round cap/join.
- **Pass 2 — the HEAD GLOW (the strongest layer).** `c.shadowColor = outlineRgb`;
  `c.shadowBlur = preset.headGlowBlur`; `c.globalAlpha = headGlow` (`> peak`, head-forward — the D4 fix);
  `lineWidth 2`; stroke the last ~4 trail points. Then RESET: `c.shadowBlur = 0`,
  `c.globalCompositeOperation = "source-over"`, `c.globalAlpha = 1`.

### 2.4 The amplitude-descending draw sort (R1, the D8 fix)

After `buildSpectrum` (`FourierField.vue:155`), create a sorted-for-draw copy
(`[...spectrum].sort((a, b) => b.amplitude - a.amplitude)`) used by the epicycle/curve DRAW pass; KEEP the
reconstruction-order `spectrum` for `positionsAt` correctness (the inverse-DFT SUM is order-independent, so the
sort is a pure draw-pass refinement — do NOT reorder the array `positionsAt` reads, since the epicycle chain's
tip-to-tail geometry depends on emission order). The cleanest implementation is the one-line sort applied to the
chain returned by `positionsAt`'s scaffolding read only; the curve-head read is unaffected. Document the
order-independence inline.

### 2.5 The zero-alloc color hoist (the D7 fix)

Move the color resolve block (`FourierField.vue:212-222`: `colorResolver(...)` + `cssToOklch` + `deriveHue` +
`oklchToGammaRgb`) OUT of the per-frame `render()` body into the EXISTING color/dark watch
(`FourierField.vue:311-322`, which already fires on the exact two triggers — `color` change + `isDark` flip).
Cache the resolved `outlineRgb` + `epicycleRgb` strings in refs; `render()` reads the cached strings. Zero color
allocation per frame; the `useGlobalDark` `isDark` ref is read in the watch, not the rAF body. The
`resolvedColor` ref already exists (`:115`); add `outlineRgb` + `epicycleRgb` refs alongside it.

### 2.6 Delete the dead `evalFourier` export (the D10 fix, clean break)

Remove `evalFourier` from `index.ts:4` (the re-export) AND from `math.ts:39-56` (the function), plus the jsdoc
`{@link evalFourier}` reference in `math.ts` (it points at a deleted symbol). `evalFourier` has zero call sites
across all four repos and is not used by `FourierField.vue` (which composes `positionsAt`). `comp` /
`positionsAt` / `makeEllipticSpectrum` / `BasisComponent` / `EllipticSpectrumOptions` STAY — they are
internal-multi-site (`comp` at `math.ts:126-138`, `positionsAt` at `FourierField.vue:165,229,252,264`). No
compat alias (no-backwards-compat precept; L invariant 4).

### 2.7 Thread `:intensity` from StoryHero (the D11 parity fix)

In `demo/stories/StoryHero.vue` add `:intensity="opacityCeiling"` to the `<FourierField>` block
(`:124-132`), exactly mirroring the Aurora block's `:opacity-ceiling="opacityCeiling"` (`:112`). The
`opacityCeiling` computed (`:64-70`) already resolves hero=0.6 / page=0.4 / a declared `intensity`; threading it
recesses the fourier hero at PARITY with the aurora hero — the P7/Q9 three-substrate parity. (Note: the
hardening seed cites `StoryHero.vue:124`; the file lives at `demo/stories/StoryHero.vue` and the FourierField
element opens at line 124.)

### 2.8 Citizenship (the substrate-with-consumer / overfitting bar)

- **api seat** — export the props/variant type on `src/api/index.ts` (today `:299` mentions FourierField in
  prose only, no exported type). Add the `FourierFieldVariant` / `FourierFieldProps` type seat alongside the
  other substrate types so the public surface carries the `intensity` knob.
- **README** — author `src/components/custom/fourier-field/README.md` (ABSENT today), research-backed by
  `W43-fourier-field-SOTA.md` (the intensity model, the bundle table, the DC-suppression-free generative-model
  note, the foreground-rainbow divergence note from §5).
- **smoke test** — author `tests/components/custom/fourier-field/FourierField.smoke.test.ts` (mirrors `src/`
  per the AV.W14 test-tree rule; ABSENT today) — a mount-smoke that asserts the component mounts with a
  resolver, accepts `intensity`, and the spectrum builds. **It imports `positionsAt` (and the spectrum
  generators) from `@mkbabb/glass-ui/fourier-math`, NOT the relative `./math`** — so it doubles as the
  glass-ui-side `/fourier-math` consumer-#1 that clears the new subpath's overfitting bar at mint time
  (§2.9). (The mirrored-test-tree relative-import rule still applies for the COMPONENT mount — `../…/src`;
  only the math leaf is imported via the published subpath, exercising the real publish surface.)

### 2.9 Mint the `/fourier-math` shared leaf (the W-FF1 PROMOTE disposition, branch a)

The cross-repo math-leaf duplication was DECIDED by the predecessor **W-FF1**
(`docs/tranches/AY/audit/W-FF1-fourier-rebase.md §4`): branch **(a) PROMOTE**. The deciding evidence —
`fourier-analysis/web/package.json:14` already pins `@mkbabb/glass-ui: ^3.1.0`, and its
`lib/evaluators.ts:9-26` `evaluateFourier` + `lib/bases.ts:27-46` `fourierPositionsAt` are byte-equivalent
(modulo `let re = 0, im = 0` comma-vs-newline whitespace) to glass-ui's `math.ts` `evalFourier`/`positionsAt`,
with a structurally-identical `BasisComponent` (`types.ts:1-6` == `math.ts:14-19`). This is the
slides-`constellation.ts`-class bespoke-copy-in-consumer the AY headline exists to close.

W-FF2 mints the glass-ui-side half of the promotion:

- **NEW `src/subpaths/fourier-math.ts`** — `export * from "../components/custom/fourier-field/math"` (the
  AV.W5.A trivial one-line mirror; `math.ts` is already Vue-free + DOM-free by construction, `math.ts:1-7`).
  This isolates the pure math leaf so the sibling imports it WITHOUT dragging `FourierField.vue` + the
  elliptic-spectrum generators (the substrate-isolation concern — `/fourier-field` would pull the component
  into a math-only consumer's bundle).
- **`package.json`** — add the `./fourier-math` export (`{ types: "./dist/fourier-math.d.ts", import:
  "./dist/fourier-math.js" }`, the contract-v2 subpath shape) + the `typesVersions["*"]` `fourier-math`
  entry. The glob `src/subpaths/*.ts` in `vite.library.ts` batch-resolves the new mirror; `flatten-subpath-types.mjs`
  keeps `dist/fourier-math.d.ts` flat — no hand-add beyond the `package.json` export pair.
- The leaf carries `positionsAt` / `comp` / `makeEllipticSpectrum` / `BasisComponent` /
  `EllipticSpectrumOptions` (the symbols the sibling's fourier arm needs). `evalFourier` is DELETED (§2.6),
  so it does NOT ride the new surface — the promoted leaf and the dead-export delete reconcile in one pass.
- **The ≥2-consumer bar — HONEST at mint time (the overfitting-bar nuance).** The math IS already consumed
  ≥2× INSIDE glass-ui (`FourierField.vue` composes `positionsAt`/`makeEllipticSpectrum` from
  `./math`; the demo story mounts it) — so the LEAF is not orphan code. BUT the NEW `/fourier-math`
  SUBPATH has ZERO direct importers at glass-ui AY-close: the demo/slides consume `/fourier-field` (the
  component subpath), and the sibling fourier-analysis re-point that consumes `/fourier-math` is BOOKED
  to the sibling's own tranche (out of W-FF2 scope). Minting a published subpath whose only intended
  importer arrives in a FUTURE tranche is the speculative-subpath-without-consumer the overfitting audit
  forbids (the same "ship the seam when the consumer arrives, not in anticipation" bar H-blob F4 applies
  to the blob DI). **To clear the bar HONESTLY, W-FF2 establishes a glass-ui-side `/fourier-math`
  importer AT MINT TIME:** the new `tests/components/custom/fourier-field/FourierField.smoke.test.ts`
  (§2.8) imports `positionsAt` from `@mkbabb/glass-ui/fourier-math` (NOT the relative `./math`) so the
  subpath has a real glass-ui-internal consumer the moment it lands, AND a `docs/consumer-evidence/fourier-math.md`
  records the consumer map (importer #1 = the smoke test; importer #2 = the booked sibling re-point with
  its trigger). If the orchestrator prefers NOT to mint until the sibling re-point is concurrent, the
  W-FF1 §4.4 fallback (book-with-the-dependency-bump-trigger, NO subpath minted now) is the pre-recorded
  alternative — the subpath is minted WITH a live consumer or not at all.

**Out of W-FF2 scope (booked successor):** the **fourier-analysis-repo re-point** (delete its
`evaluateFourier` + `fourierPositionsAt`, re-point to `@mkbabb/glass-ui/fourier-math`; keep the polynomial
`evaluateChebyshev`/`evaluateLegendre` + `evaluateBasis` dispatch + its local
`BasisComponent`/`BasisDecomposition`/`EpicycleData` types) is a fourier-analysis-repo edit booked to ITS own
tranche — glass-ui writes NO sibling source (the hardened cross-repo clause). The pre-recorded **fallback**
(W-FF1 §4.4) FIRES only if the mint reveals a type-incompatibility the structural-identity check missed:
book-with-the-dependency-bump-trigger ("when fourier-analysis next bumps past `^3.1.0`, replace its fourier
arm with the import"), with the incompatibility recorded as the reason the root fix could not land cleanly.

---

## 3. Edit-sites (the exact write scope)

| File | Sites | Edit |
|---|---|---|
| `src/components/custom/fourier-field/FourierField.vue` | `:59-76` | extend `VariantPreset` with the six bundle fields (§2.1) |
| | `:78-99` | populate both `PRESETS` with the hero/final defaults |
| | `:40-57` | add `intensity?: number` prop + clamp (§2.2) |
| | `:103` | DELETE `OUTLINE_PEAK_ALPHA` (no alias) |
| | `:115` + `:311-322` | add `outlineRgb`/`epicycleRgb` refs; hoist the resolve into the watch (§2.5) |
| | `:155` | sorted-for-draw spectrum copy (§2.4) |
| | `:212-222` | remove the per-frame resolve (moved to watch) |
| | `:224-303` | replace with the 3-pass phosphor-comet render (§2.3) |
| `src/components/custom/fourier-field/math.ts` | `:39-56` | DELETE `evalFourier`; remove its `{@link evalFourier}` jsdoc ref (§2.6) |
| `src/components/custom/fourier-field/index.ts` | `:4` | remove `evalFourier` from the re-export (§2.6) |
| `src/subpaths/fourier-math.ts` | NEW | `export * from "../components/custom/fourier-field/math"` — the `/fourier-math` shared-leaf mirror (§2.9) |
| `package.json` | exports + `typesVersions` | add the `./fourier-math` export pair + the `typesVersions` entry (§2.9) |
| `src/components/custom/fourier-field/README.md` | NEW | research-backed README (§2.8) |
| `src/api/index.ts` | `:299` area | add the `FourierFieldVariant`/`FourierFieldProps` type seat (§2.8) |
| `tests/components/custom/fourier-field/FourierField.smoke.test.ts` | NEW | mount-smoke + imports the math leaf via `@mkbabb/glass-ui/fourier-math` (the `/fourier-math` consumer-#1 — §2.8, §2.9) |
| `docs/consumer-evidence/fourier-math.md` | NEW | the `/fourier-math` consumer map (importer #1 = the smoke test; importer #2 = the booked sibling re-point + trigger) — the overfitting-bar evidence doc (§2.9) |
| `demo/stories/StoryHero.vue` | `:124-132` | add `:intensity="opacityCeiling"` to `<FourierField>` (§2.7) |
| `scripts/proof-fourier-field-intensity.mjs` | NEW | the static gate (clause G2) |
| `scripts/proof-fourier-field-visibility-live.mjs` | NEW | the device gate DRIVER (clause G3) |
| `tests-visual/fourier-field-visibility.spec.ts` | NEW | the π readback spec the device driver invokes (clause G3) |
| `package.json` | `proof:*` block + `scripts/gates.mjs` `GATES` registry | wire both new gates (see the SHARED-WRITE note below) |
| `docs/tranches/AY/audit/visual/W-FF2-DELTA.md` + the captured PNGs | NEW | the cardinal DELTA (clause G5) |

**SHARED-WRITE NOTE (`scripts/gates.mjs` + `package.json` proof block).** Both new gates
(`proof:fourier-field-intensity` + `proof:fourier-field-visibility-live`) are wired into the
`package.json` `proof:*` block AND **appended** to the `scripts/gates.mjs` `GATES` array (the local
`proof:all` driver — a gate wired only into `package.json` but absent from `GATES` never runs under
`proof:all`; the static gate carries `tags: ["local"]`, the device gate `tags: ["local"]` per the
LIVE-VERIFICATION-gates-are-local-only architecture at `gates.mjs:30`). This `GATES` array is a
SHARED-WRITE surface across the AY waves (W-BLOB2 appends `proof:blob-config-atoms`, W-GOD1
CI-promotes `proof:no-god-module`, W-CLOSE1/W-LIVE1/W-COLOCATE touch the registry). The edit is
**append-only to the `GATES` array** (two new object literals at the tail of the fourier cluster),
never a re-order — so the integrating orchestrator merges the parallel additions cleanly. W-FF2's
append is independent of W-BLOB2's (distinct gate ids); no serialization beyond append-only.

Out of scope (named successors): the cross-repo math-leaf DECISION (W-FF1 — DECIDED branch (a) PROMOTE; W-FF2
mints the glass-ui-side `/fourier-math` leaf per §2.9, the fourier-analysis re-point is booked to its own
tranche); the AY-pathing of
`proof:live-verified-ledger` (W-LIVE1 extends the gate to read `docs/tranches/AY/PROGRESS.md` +
`docs/tranches/AY/audit/visual/` per H-cardinal §8 — W-FF2 CONSUMES that path by writing its DELTA there and
NAMING the gate, but the gate's tranche-parameterization is W-LIVE1's edit).

---

## 4. Hard Gate (evidence-backed; the completion criterion)

A grep alone is INSUFFICIENT for a runtime feature (per `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`). The gate is
five clauses: a deletion grep + a static source gate + a DEVICE π-readback gate + an export-types deletion proof
+ the cardinal captured DELTA. ALL must hold.

### Clause G1 — `OUTLINE_PEAK_ALPHA` deleted (clean break)

```
grep -c OUTLINE_PEAK_ALPHA src/   →   0
```

No alias, no re-export. (Today: 5, all in `FourierField.vue`.)

### Clause G2 — `proof:fourier-field-intensity` (STATIC source gate) authored + GREEN

`scripts/proof-fourier-field-intensity.mjs` — born-RED at the pre-edit HEAD, GREEN after the land. Asserts (each
clause a RED-witness inverse, the constellation-warp gate pattern):

1. `OUTLINE_PEAK_ALPHA` absent from `FourierField.vue` (the G1 source assert).
2. `VariantPreset` carries all six bundle fields (`peakAlpha`, `headGlowAlpha`, `headGlowBlur`,
   `epicycleRatios`, `trailFadeExp`, `trailFloor`); BOTH `PRESETS` entries populate them.
3. `headGlowAlpha > peakAlpha` for both presets (head-forward — the D4 invariant).
4. `trailFadeExp >= 1 && trailFadeExp < 2` for both presets (soft, never quadratic — the D2 invariant); a
   `trailFloor > 0` clause (the body survives).
5. The render reads a CACHED color triple, not a per-frame `colorResolver(`/`cssToOklch(`/`oklchToGammaRgb(`
   call inside the `render(` body (the D7 zero-alloc hoist — a regex that the resolve block sits in the watch,
   not the rAF body).
6. The `intensity` prop is on `defineProps` with a `[0, 2]` clamp.
7. The render carries the dark/light blend fork (`globalCompositeOperation` set from `isDark`) and the
   amplitude-descending sort (`.sort((` keyed on `.amplitude`).
8. `evalFourier` is absent from `index.ts` AND `math.ts` (the G4 source assert).
9. SELF-PROVING: a synthetic pre-edit snapshot string (the `OUTLINE_PEAK_ALPHA * age * age` line) is evaluated
   every run; if the detector fails to flag it, the gate REDs (the bite is demonstrated each invocation).

Wired into `package.json` `proof:*` + `scripts/gates.mjs` local registry.

### Clause G3 — `proof:fourier-field-visibility-live` (DEVICE π-readback gate) authored + GREEN

`scripts/proof-fourier-field-visibility-live.mjs` — the fail-closed DRIVER (the `proof-constellation-warp-live`
shape: resolve Playwright across the hoisted + workspace layouts, invoke the spec, parse the JSON report, emit a
byte-stable gate artefact; fail-CLOSED when Playwright is present — a non-reading field exits NON-ZERO, NEVER
SKIP-with-exit-0; the befitting-silent SKIP stays only for genuine device-absence on a zero-dep runner).

The interaction truth lives in `tests-visual/fourier-field-visibility.spec.ts`: it mounts the REAL
`<FourierField>` for BOTH `variant="hero"` AND `variant="final"` over a known ground (synthetic dark + synthetic
light), under `freeze` for a deterministic frame, and READS BACK the painted canvas pixels (`getImageData`) — a
runtime observation, NOT a grep. Born-RED at HEAD (the 0.24-quadratic `final` preset fails the visibility floor).
Asserts:

1. **`final` preset is NOT a corner stub.** The painted (non-transparent, non-near-background) pixels span a
   bounding box ≥ a minimum fraction of the canvas (e.g. ≥ 25% of width AND ≥ 25% of height) — a trail-only
   curve that fills a corner stub fails this; a curve that traverses the frame passes. The direct D2 binding
   truth.
2. **The trail body reads.** The mean painted-pixel alpha over the curve's bounding box clears a perceptibility
   floor (the `peak * trailFloor` survival — the body is no longer killed by the quadratic).
3. **Both modes.** The assertions run for `isDark = true` (additive `lighter` bloom on ink) AND `isDark = false`
   (`source-over` on cream) — the blend-fork legibility.
4. **`intensity` recesses, monotonically.** `intensity = 0.4` paints strictly fewer/dimmer painted pixels than
   `intensity = 1` for the same preset/seed (the loudness knob is load-bearing, not a no-op).
5. **The two presets are a DISTINCT family** — `hero` (epicycles on, scaffolding present) paints measurably more
   structure than `final` (trail-only) at the same intensity.

### Clause G4 — `evalFourier` removed + `/fourier-math` minted (deletion proof + export-types green)

```
rg "evalFourier" src/ demo/ ../slides/src ../fourier-analysis/web/src ../speedtest/src   →   only-removed (0 hits in glass-ui src/index/math; the sibling's own LOCAL copy is unaffected — it is a separate file, not glass-ui's export)
node -e 'import("@mkbabb/glass-ui/fourier-math")'   →   resolves (the new shared leaf, §2.9)
npm run verify-export-types   →   green; the /fourier-field AND /fourier-math subpath dts publish (WITHOUT evalFourier on either)
rg "@mkbabb/glass-ui/fourier-math" tests/   →   ≥1 hit (the smoke test imports the leaf via the subpath — the glass-ui-side consumer-#1 that clears the new subpath's overfitting bar at mint time)
```

The `/fourier-math` leaf carries `positionsAt`/`comp`/`makeEllipticSpectrum`/`BasisComponent`/`EllipticSpectrumOptions`
(the W-FF1 §4.3 PROMOTE shape) — the pure math the sibling imports without `FourierField.vue`. The
**overfitting bar is cleared HONESTLY** (§2.9): the new subpath has a real glass-ui-side importer at mint
time (the smoke test imports it via `@mkbabb/glass-ui/fourier-math`), and `docs/consumer-evidence/fourier-math.md`
records the consumer map (importer #1 = the smoke test; importer #2 = the booked sibling re-point). The
fourier-analysis-repo re-point is the booked successor (its own tranche; glass-ui writes no sibling source).
If the orchestrator declines to mint a subpath whose external importer is a future-tranche edit, the W-FF1
§4.4 book-with-trigger fallback fires (NO subpath minted now) — the subpath lands WITH a live consumer or not at all.

### Clause G5 — the cardinal captured DELTA (the H-cardinal binding)

`docs/tranches/AY/audit/visual/W-FF2-DELTA.md` exists and references ≥1 real on-disk own-surface PNG per the
CAPTURE-PROTOCOL depth: ≥2 viewports × {light, dark} of the `/substrates/fourier-field` story (and/or the
`auth-shell` hero) showing BOTH presets legibly distinct — the `final` preset is NO LONGER a corner stub. The
before/after pairs the captured pre-edit witness
(`docs/tranches/AX/audit/visual/W18-fourier-field-desktop-{light,dark}.png`) against the post-land capture.
`proof:live-verified-ledger` (the AY-pathed gate per W-LIVE1) is GREEN against the W-FF2 PROGRESS row — the
`live-verified` flip is UN-MINTABLE without this on-disk DELTA. **Names `proof:live-verified-ledger`** as the
machine gate (not a prose "capture") — closing the chronic-miss the H-cardinal lane named for AY.

---

## 5. Convergence + named successors

W-FF2 converges when G1–G5 all verify. The cross-repo math-leaf duplication was DECIDED by the predecessor
**W-FF1** (`docs/tranches/AY/audit/W-FF1-fourier-rebase.md §4`): branch **(a) PROMOTE** — W-FF2 mints the
glass-ui-side `/fourier-math` shared leaf (§2.9), and the fourier-analysis-repo re-point is the booked
successor (its own tranche; glass-ui writes no sibling source). The pre-recorded W-FF1 §4.4 fallback (book
with the dependency-bump trigger) FIRES only if the mint reveals a type-incompatibility the structural-identity
check missed. The `proof:live-verified-ledger` AY-pathing (reading `docs/tranches/AY/PROGRESS.md` +
`AY/audit/visual/`, the `complete`-row extension, the filename-match) is the named successor **W-LIVE1**
(H-cardinal §8); W-FF2 writes its DELTA into the AY visual dir and names the gate so W-LIVE1's parameterization
lands it green. The orphan component RETIRE verdicts (header-ribbon/glass-panel/useTokenColor) are **W-SB1** —
out of scope here.

If the device gate (G3) cannot run a real browser at close, the row is `live-pending (DELTA owed)`, NOT
`complete` — the honest holdout the cardinal gate forces (the W56 precedent). It does not close `complete`
without the captured DELTA.
