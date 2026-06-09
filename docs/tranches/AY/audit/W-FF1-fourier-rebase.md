# W-FF1 — Fourier-field research-rebase: the decision record

**Wave** `AY.W-FF1` · **Kind** research-rebase (writes the rebased wave-spec material into `AY.W-FF2.md`
+ this recorded decision; writes NO `src/`) · **Repo** glass-ui · **HEAD** `fba6262` on
`at-dock-convergence` · **Un-blocks** `AY.W-FF2` (the impl wave that lands the fix)

This record carries the four items the wave's HARD GATE verifies: (1) the five born-RED witnesses
re-confirmed at HEAD with the exact grep counts; (2) the AX→AY dependency-graph rebase; (3) the PINNED
single-number resting-paint alpha bundle with the 0.55-vs-0.35 hedge retired; (4) the cross-repo
math-leaf DECISION with a named branch, trigger, and successor. The inputs are the born-RED
`AX.W43-fourier-field-first-class.md` spec + the EXECUTED `W43-fourier-field-SOTA.md` research + the
live sibling `fourier-analysis/web/src/lib/{evaluators,bases,types}.ts` — all read in full.

---

## 1. The five born-RED witnesses, re-confirmed at HEAD `fba6262` (re-run, not copied)

The AX.W43 spec is **stale-anchored, not stale-content**: it was authored born-RED against the AX line
`cdcf331` but never landed, so every witness it names is STILL TRUE at the AY HEAD. Re-run here:

| # | Witness | Command | Result at `fba6262` |
|---|---------|---------|---------------------|
| 1 | `OUTLINE_PEAK_ALPHA` still ceilings every layer | `grep -rn "OUTLINE_PEAK_ALPHA" src/ \| wc -l` | **5** (not 0) — `FourierField.vue:103` decl; consumed `:237` (`*0.6*0.5`), `:242` (`*0.6`), `:282` (the quadratic trail `* age * age`), `:294` (the head glow — NOT the strongest layer) |
| 2 | No api-seat type — prose only | `grep -c -i "fourier" src/api/index.ts` | **1** (a prose comment at `:299`; NO exported `FourierFieldProps`/`FourierFieldVariant`/intensity type) |
| 3 | No README (siblings all have one) | `ls src/components/custom/fourier-field/README.md` | **absent** (verified `aurora/README.md`, `constellation/README.md`, `goo-blob/README.md` present) |
| 4 | No mount-smoke under the mirrored tree | `ls tests/components/custom/fourier-field/` | **absent** |
| 5 | No `proof:fourier-*` gate | `ls scripts/*fourier*` + `grep fourier package.json` | **no script**; only the `/fourier-field` subpath export (`package.json:296-298`) + the `typesVersions:58-59` entry resolve |

**Rendered consequence (the captured truth).** The `final` preset has `epicycles: false`
(`FourierField.vue:96`), so the comet trail is the ONLY thing it draws; the `0.24 * age * age` quadratic
fade renders the WHOLE preset as a corner stub. The pre-edit witness PNGs exist on-disk and show the
near-invisible whisper:
`docs/tranches/AX/audit/visual/W18-fourier-field-desktop-{light,dark}.png` (both present, dated). These
are the BEFORE half of the W-FF2 paired-π DELTA.

**Disposition.** AY.W-FF1's job is to REBASE the spec to the AY HEAD + dependency graph and RECORD the
math-leaf decision — NOT re-research (the path forward exists TWICE: the AX.W43 spec + the
`W43-fourier-field-SOTA.md` research), NOT re-author the born-RED narrative that re-litigates the
W00/W07/W14 dependency chain.

---

## 2. The AX → AY dependency-graph rebase

The AX.W43 spec dependsOn `AX.W00/W07/W14/W18/W37`. At the AY HEAD these are SETTLED or DISSOLVED:

| AX blocker | Was | Disposition at AY HEAD |
|---|---|---|
| **W07** (WebGPU `var<storage,read>` dynamic-index + f32-cast unblock) | the GPU substrate the mid-tranche research's "WebGPU-vs-Canvas2D" decision was to land ON | **DISSOLVED.** `W43-fourier-field-SOTA.md §4` RESOLVED that Canvas2D is the correct render at this scale (≤64 phasors, ≤200-point trail — two orders of magnitude below even the Canvas2D bottleneck, three orders below the WebGPU-worth-it line). WebGPU is recorded as a future additive enhancement behind the Canvas2D parity-floor, NOT a now-blocker. The deferral that this dependency motivated (AX.W43 §7) is gone. |
| **W14** (WebGPU painterly-parity / `WEBGPU_PARITY`) | the GPU primitive band the research reused | **DISSOLVED** with W07 — same Canvas2D verdict. fourier-field composes `useCanvas2D`, not a GPU path. |
| **W00** (the π visual-runtime lane) | the close-criterion machinery the visibility audit runs inside | **LANDED at AX.** W-FF2 carries the device gate `proof:fourier-field-visibility-live` in the established `tests-visual/` workspace; the cardinal-DELTA protocol is W-CARDINAL-INFRA / W-LIVE1's AY-pathing, which W-FF2 consumes. |
| **W18** (the storybook IA seat) | the Substrates-band seat | **LANDED at AX.** `demo/stories/substrates/fourier-field.vue` + `manifest.ts:141` EXIST (per `H-fourier.md §1`). |
| **W37** (`useCanvas2D` substrate + `resolveCanvasColor`) | the Canvas2D substrate + color resolver | **LANDED.** `FourierField.vue:3` composes `useCanvas2D`; `:108-126` carries the inline `var()`/`light-dark()` resolve (the GooBlob-mirrored seam). |

**The rebased AY dependency set reduces to:** `AY.W-FF1` (this rebase + decision) → `AY.W-FF2` (the
impl). No GPU-band wait, no IA-seat wait. W-FF2 lands NOW on the Canvas2D parity-floor.

**The render half W-FF2 folds (the EXECUTED SOTA recipe).** The `W43-fourier-field-SOTA.md` recipe is
the concrete W-FF2 paint recipe: the 3-pass phosphor-comet (§2.1), the per-variant bundle (§2.2), the
`intensity` prop (§2.3), the zero-alloc hoist (§3), the R1 amplitude-descending draw sort (§1.3). The
load-bearing blend fork: `ctx.globalCompositeOperation = isDark ? "lighter" : "source-over"` — the
Canvas2D 2D-context `lighter` op (universally supported, NO `@supports` gate, distinct from W52's CSS
`mix-blend-mode` path) on the ink ground; plain alpha on cream (additive over cream blows the trail to
white).

---

## 3. The PINNED resting-paint alpha bundle (the 0.55-vs-0.35 hedge RETIRED)

`W43-fourier-field-SOTA.md §2.2`'s table values are the anchors; this pin DECIDES the disputed
`headGlowAlpha`/`peakAlpha`/trail-head relationship into ONE defined number per field, measured at
`intensity = 1` (the resting paint, NO ride):

| Field | hero | final | The pin (what the W-FF2 gate measures) |
|-------|------|-------|----------------------------------------|
| `peakAlpha` (comet-trail head segment, `intensity=1`) | **0.55** | **0.45** | the youngest trail segment paints at `peakAlpha · 1.0` |
| `headGlowAlpha` (head-glow layer — the STRONGEST) | **0.62** | **0.50** | `headGlowAlpha > peakAlpha` by construction (head-forward) |
| `headGlowBlur` (px) | **16** | **14** | `shadowBlur` bloom radius |
| `epicycleRatios.{circle, arm}` (÷ peak, hero only) | `{0.18, 0.30}` | `{0, 0}` | scaffolding BELOW the outline |
| `trailFadeExp` (soft, not quadratic) | **1.4** | **1.5** | `pow(age, trailFadeExp)`, NOT `age * age` |
| `trailFloor` (÷ peak — body survives) | **0.10** | **0.08** | `max(a, peak · trailFloor)` |

**The binding pin (for W-FF2's `proof:fourier-field-visibility-live`):** the hero head-glow paints at
**0.62** (the strongest layer), the hero comet head at **0.55**, both at `intensity = 1`.

**The 0.35 reading is RETIRED.** `W43-fourier-field-SOTA.md:175-179` instructed "record BOTH readings
(0.55 and 0.35) … so the gate measures the right one." That two-reading hedge is the defect: the 0.35
"trail head" is reconciled only by "the value AFTER the `intensity` default ride at a recessed hero
loudness" — which is CIRCULAR, since `intensity` defaults to `1` (no ride) and the §2.2 table is itself
the resting bundle. A two-reading hedge is an unbindable threshold ("measure 0.55 OR 0.35" can never
fail). **The 0.35 reading is NOT the resting target and W-FF2's gate does NOT measure it.** ONE number,
resting, `intensity = 1`.

**The visibility-floor the gate asserts:** hero head-glow peak readback **≥ 0.45** — a band below the
0.62 paint target to absorb canvas anti-aliasing + sampling + the `lighter`-blend accumulation, while
sitting far ABOVE the 0.24 build's whisper (the 0.24-ceiling render reads BELOW this floor — the
born-RED witness). hero vs final must be MEASURABLY distinct (a per-variant coverage/peak delta ≥ a
stated minimum the gate names; W-FF2 §4.2 names it).

---

## 4. The cross-repo math-leaf DECISION

### 4.1 The deciding evidence (verified at HEAD)

| Evidence | Verified |
|---|---|
| The sibling ALREADY depends on glass-ui | `fourier-analysis/web/package.json:14` → `"@mkbabb/glass-ui": "^3.1.0"` (the consumer relationship is established, not hypothetical) |
| `evaluateFourier` is byte-equivalent to glass-ui's `evalFourier` | `fourier-analysis/web/src/lib/evaluators.ts:9-26` vs `math.ts:39-56` — the loop bodies are character-identical; the ONLY difference is `let re = 0, im = 0` (comma form, sibling) vs `let re = 0;\nlet im = 0;` (glass-ui) |
| `fourierPositionsAt` is byte-equivalent to glass-ui's `positionsAt` | `fourier-analysis/web/src/lib/bases.ts:27-46` vs `math.ts:64-83` — loop bodies character-identical, modulo the same `let cx = 0, cy = 0` comma-vs-newline whitespace |
| The sibling's `BasisComponent` is structurally identical | `fourier-analysis/web/src/lib/types.ts:1-6` `{index, coefficient:[number,number], amplitude, phase}` == `math.ts:14-19` — a promotion is type-feasible |

This is the slides-`constellation.ts`-class **bespoke-copy-in-consumer** the AY HEADLINE exists to KILL
("consumers compose fully-abstracted glass-ui components with NO bespoke copies", `AY.md:16-17`). The
research doc's "keep-book, fine at 2 repos" disposition (`W43-fourier-field-SOTA.md §5`) was written
BEFORE the live `^3.1.0` dependency was checked — it is STALE.

### 4.2 The bounding nuance (why this is a real spec input, not a glib "promote it")

The shared leaf is **fourier-only** — the sibling carries MORE than glass-ui ships, and the extra arms
stay sibling-local:

- The sibling's `lib/bases.ts:10` `evaluateBasis` is a dispatch over `fourier | chebyshev | legendre`;
  the polynomial arms (`evaluators.ts:29` `evaluateChebyshev`, `:61` `evaluateLegendre`, Clenshaw
  recurrence) are sibling-LOCAL. glass-ui correctly ships ONLY the fourier arm (the ambient field is
  fourier-only).
- The sibling's `BasisComponent` type (`types.ts:1-6`) is SHARED across the fourier arm, the polynomial
  bases, the SVG pipeline (`svg-fourier.ts`), and `BasisDecomposition`/`EpicycleData` — so it must stay
  available sibling-side regardless.

So the shared leaf is the fourier-only `{evalFourier, positionsAt, comp, BasisComponent}` core; the
sibling's polynomial bases + SVG pipeline + its own `BasisDecomposition`/`EpicycleData` types stay
sibling-local. A promotion is feasible because glass-ui's `BasisComponent` is structurally identical to
the sibling's — the sibling would import glass-ui's `evalFourier`/`positionsAt`/`BasisComponent` for the
fourier arm and keep its polynomial evaluators + decomposition types (which structurally reference the
same `BasisComponent` shape).

### 4.3 The DECISION — branch (a): PROMOTE the fourier-math leaf

**The wave picks branch (a) PROMOTE**, grounded in the headline ("consumers compose abstracted glass-ui
with NO bespoke copies") + the live `^3.1.0` dependency as the deciding evidence. The promotion is the
ROOT fix the AY headline demands.

**The promotion shape (recorded for W-FF2 to mint):**

- glass-ui already EXPORTS `evalFourier`/`positionsAt`/`comp`/`BasisComponent` via the `/fourier-field`
  subpath (`index.ts:2-9`) — so the sibling COULD `import { fourierPositionsAt as positionsAt, ... }
  from "@mkbabb/glass-ui/fourier-field"` TODAY (the `^3.1.0` dependency already resolves it). BUT
  `/fourier-field` drags the `FourierField.vue` component + the elliptic-spectrum generators into the
  sibling's bundle for a math-only consumer — the substrate-isolation concern.
- So the promotion shape is to mint a **`/fourier-math`** flat subpath: `src/subpaths/fourier-math.ts` →
  `export * from "../components/custom/fourier-field/math"` (the AV.W5.A trivial-mirror pattern; the
  `math.ts` leaf is already Vue-free + DOM-free by construction, `math.ts:1-7`) so the sibling imports
  the pure math without the component.
- W-FF2 also DELETES the dead `evalFourier` export from glass-ui (`index.ts:4` re-export + `math.ts:39`
  definition + the `{@link evalFourier}` jsdoc) per `H-overfitting.md` Finding 2 — `evalFourier` has
  ZERO call sites across all four repos (`FourierField.vue` composes `positionsAt`, never `evalFourier`).
  **Reconciliation:** the `/fourier-math` mirror re-exports the `math.ts` barrel, so `evalFourier`
  vanishes from the shared surface together with its `index.ts`/`math.ts` deletion — the promoted leaf
  carries `positionsAt`/`comp`/`makeEllipticSpectrum`/`BasisComponent`/`EllipticSpectrumOptions`, the
  symbols the sibling's fourier arm actually needs (the sibling re-points `fourierPositionsAt` →
  `positionsAt`; its `evaluateFourier` body is byte-equivalent to the deleted `evalFourier`, so it
  re-points to `positionsAt`'s tip-read or keeps a local one-liner — the fourier-analysis arm decides at
  its own re-point).

**The split of the work across edit-sites + repos:**

- **glass-ui-side `/fourier-math` mint** (`src/subpaths/fourier-math.ts` + the `package.json`
  `./fourier-math` export + `typesVersions` entry) is an **`AY.W-FF2` edit-site** — the substrate lands
  WITH its W-FF2 consumer wiring (the ≥2-consumer bar is met: the live `^3.1.0` sibling consumer + the
  demo/slides fourier-field consumers). This wave RECORDS the shape; it does NOT mint the subpath.
- **The fourier-analysis-repo re-point** (delete `lib/evaluators.ts` `evaluateFourier` + `lib/bases.ts`
  `fourierPositionsAt`, re-point to `@mkbabb/glass-ui/fourier-math`; keep the polynomial
  `evaluateChebyshev`/`evaluateLegendre` + `evaluateBasis` dispatch + the local `BasisComponent`/
  `BasisDecomposition`/`EpicycleData` types) is a **fourier-analysis-repo edit booked to ITS own
  tranche** — glass-ui writes NO sibling source (the hardened cross-repo clause). This wave RECORDS the
  booked successor.

### 4.4 The named successor (the pre-recorded fallback — branch b)

**If the W-FF2 `/fourier-math` mint reveals a type-incompatibility** the §4.1 structural-identity check
missed (glass-ui's `BasisComponent` and the sibling's `types.ts:1-6` diverge under the actual mint —
e.g. the sibling's `coefficient` widens, or `BasisDecomposition` needs a shape glass-ui does not carry):
branch **(b) BOOK with a CONCRETE dependency-bump trigger** FIRES, with the incompatibility recorded as
the reason the root fix could not land cleanly. The trigger (a NAMED successor with an exact edit-site +
an exact firing condition, NOT a "keep-book" hand-wave):

> **"When fourier-analysis next bumps `@mkbabb/glass-ui` past its `^3.1.0` pin, replace its
> `lib/evaluators.ts` `evaluateFourier` + `lib/bases.ts` `fourierPositionsAt` bodies with
> `import { positionsAt } from '@mkbabb/glass-ui/fourier-math'` (minting the subpath glass-ui-side at
> that point), keeping its polynomial `evaluateChebyshev`/`evaluateLegendre` + `evaluateBasis` dispatch
> + its `BasisComponent`/`BasisDecomposition`/`EpicycleData` types local."**

The book-branch mints NO speculative zero-consumer subpath glass-ui-side until the firing condition is
met (the ≥2-consumer bar / substrate-without-consumer invariant); the duplication is BOOKED with an
exact trigger, never papered over.

---

## 5. House-keep guards honored

- **No re-research of landed-twice material** (`H-fourier.md §8`): this record REBASES + DECIDES; it
  produces NO third research doc, NO new sweep. The two existing authored docs (the AX.W43 spec + the
  SOTA research) are cited as audit INPUTS, not re-litigated.
- **Root-not-consumer** (`H-overfitting.md` headline + MEMORY): the math-leaf decision DEFAULTS to the
  root fix (promote the leaf the sibling imports); the consumer's verbatim copy is the divergence AY
  exists to close. The book-fallback carries a CONCRETE trigger + named successor.
- **≥2-consumer bar:** the `/fourier-math` promotion is justified by the live `^3.1.0` sibling consumer
  + the demo/slides fourier-field consumers — NOT a speculative subpath. If branch (b) fires, NO subpath
  is minted until the trigger.
- **Greenfield-no-meta** (MEMORY): the rebased `AY.W-FF2.md` carries NO "deferred to mid-tranche" / "the
  I-session lifted" / "born-RED at `cdcf331`" version-history language; it is a forward impl spec
  anchored at the AY HEAD `fba6262`. This decision record MAY cite the AX.W43 spec + the SOTA research as
  INPUTS (audit artefacts).
- **The pin is ONE number** (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`): §3 is a single defined target per
  field at `intensity=1`; the "record both readings" hedge is RETIRED so W-FF2's visibility gate measures
  a defined number, not an un-falsifiable OR.

---

## 6. Hand-off to W-FF2

`AY.W-FF2.md` is the populated current impl spec this wave un-blocks. It carries: the rebased
intensity-model scope (the §3 per-variant bundle + the `intensity` prop), the EXECUTED SOTA render recipe
(the 3-pass phosphor-comet + the `lighter`/`source-over` dark/light fork + R1 sort + zero-alloc hoist),
the exact `FourierField.vue` edit-sites (`:103` DELETE `OUTLINE_PEAK_ALPHA`; `:237/:242/:282/:294`
re-point; `:59-99` `VariantPreset` extend; `:212-222` hoist), the citizenship set (README + api seat +
mount-smoke + the two `proof:*` gates), the `StoryHero.vue` `:intensity="opacityCeiling"` thread (the
three-substrate parity), the dead `evalFourier` deletion, and **the §4.3 PROMOTE disposition** (mint
`/fourier-math` glass-ui-side; book the sibling re-point to fourier-analysis's own tranche with the §4.4
trigger as the fallback acceptance bar). W-FF2 either mints-and-promotes or books — it does NOT
re-research and does NOT re-litigate the retired AX dependency chain.
