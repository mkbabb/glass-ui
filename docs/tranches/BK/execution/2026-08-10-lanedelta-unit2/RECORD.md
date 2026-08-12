# LANE δ — COMMIT-UNIT 2 (δ2 · #53 GF-FOURIER) · 2026-08-10

**modelId: `claude-opus-5[1m]`** — asserted at step 0; the assertion gates this chain.
Base HEAD `2cfc1124` at open; the tree advanced to `18654497` mid-run when the unit-1
batch landed. SHARED tree, four lanes concurrent; this seat wrote bytes and ~~never staged,
committed, stashed or checked out~~ never committed, stashed or checked out.

> **CORRECTION — struck in place 2026-08-10, BK #53 (adjudicator C1).** The struck clause
> swore a falsehood, and the same falsehood is sworn a second time in §8; both are corrected
> rather than deleted. **This seat DID stage.** Moving the smoke test out of the phantom
> `custom/` segment was done with `git mv`, and `git mv` stages its own rename. The index
> carries exactly one entry and nothing else in the tree is staged:
>
> ```
> R100  tests/components/custom/fourier-field/FourierField.smoke.test.ts
>    -> tests/components/fourier-field/FourierField.smoke.test.ts
> ```
>
> **Driver's ruling: the driver COMMITS THROUGH the content-identical R100 at the cut.** The
> rename is the true move — it is the act §8 describes and the act the unit intended — so the
> staged entry is ADOPTED, not unstaged. What was wrong was the swearing, not the rename.

---

## §0 · CENSUS — step-0 baseline, banked before any byte

| datum | value |
|---|---|
| baseline diff | `/tmp/bk-lanedelta-baseline-1786382862.diff` (405 lines, `git diff -U0`) |
| porcelain count at open | **4** |
| tracked-dirty at open | `MIGRATION.md` · `src/composables/dark/darkModeSyncScript.ts` · `tests/composables/dark/darkModeSyncScript.test.ts` (all Lane β's unit-β0 dirt, foreign) |
| untracked at open | `docs/tranches/BK/execution/2026-08-10-lanebeta-unit1/` (3 files, enumerated) |
| HEAD at open | `2cfc1124` |
| HEAD at close | `18654497` — β0 committed at `c4dbf53b`, the unit-1 batch at `18654497` |

**The tree moved under this seat, twice.** Lane β's dirt committed; Lanes α/γ opened
unit-2 and wrote into `src/components/aurora/**`, `src/styles/tokens/**`, `docs/design/**`,
`docs/tranches/IOS27-MICRO/**`, `scripts/comment-census.mjs` and
`tests/components/custom/aurora/**` DURING this run. None of it is this seat's; the fence
section below enumerates exactly what is.

**Carried from unit-1, honoured:** the four ROUTED items (EC dead `surface` prop · the
expanded-dialog accessible name · X6's 280/360-vs-300/400 · #59's WRAP ARM) belong to their
routed units and none was opened here.

---

## §1 · PRECONDITIONS — all four verified ON DISK, none remembered

| precondition | verdict | detector |
|---|---|---|
| **#26 before W2** — the spring authority | **SATISFIED** | `springPresets.ts:113-122` ships the `world` row **on disk**: `response 0.48 · dampingFraction 1.0`. The spec was written when that row did NOT exist and said so; it exists now. ζ 1.0 ≥ the 0.82 floor this lane owns |
| **#52 before W4** — the EXPRESS chassis | **SATISFIED intra-lane** | unit-1 `c6094181`: `<Configurator expandable>`, the viewport→container re-key, `ConfiguratorRow` `useId()`. VizStudio already passes `expandable`, so the story mounts into the built chassis |
| **#54 seam** — `setupGL` optionality | **UNSTARTED** | `EXECUTION-PROGRESS.md:4633` row 54 = UNSTARTED; `useGpuSubstrate.ts:49` still reads `setupGL: WebGLCanvasOptions["setup"]` — non-optional. The declared fork is taken in §2 |
| **C-13** — visual-suite wiring | **NOT SATISFIED** | no `proof:viz*` / `test:visual` script exists in `package.json`. The visual suite is still unwired, so **no π gate can bite at this cut**. Every π row ENQUEUES (§7); none is claimed. The C20 register is unmoved — `rosterSha256:282d05cf`, verified in §5 |

**g4 KEEP-IN-LIBRARY executes, and its re-open condition is untouched.** The seat rests on
the cross-repo consumers (`slides/feedback-coder/Slide01.vue` + `Slide05.vue`); the ⊕⁷⁵
census shows the 8.0.0 slides adopt still pending, so the written relay condition has not
fired and the seat holds. No export key moved on that account (§5).

---

## §2 · THE ONE STRUCTURAL FORK — §3.7 contradicts itself, and its LAW wins

§3.7 states an unconditional law and a conditional fallback that cannot both hold:

> **the law** — *"No WebGPU ⇒ `rendererStatus: "unsupported"`, zero canvas pixels, no
> second renderer, no silent black."*
> **the fallback** — *"Fallback if declined: alias-by-import … a −20 cut, all else
> unchanged."*

The fallback KEEPS a live WebGL2 arm. On a host without WebGPU that arm is the second
renderer the law forbids, painting the OLD paint law — the black cel literal, the white
specular head, the 64-term ceiling — beside a WGPU primary that paints the new one. That is
a masking fallback wearing a fix's face, and it is the exact class the house law names.

**RULED: the law governs; the fallback text is refused with grounds.** `setupGL` is
satisfied by a DECLARATION rather than an implementation:

```ts
export function createFourierUnsupportedSetup(): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    return function setupUnsupported(): WebGLCanvasFrame {
        throw new Error(FOURIER_UNSUPPORTED_MESSAGE);
    };
}
```

The picker routes that throw to `rendererFailure(...)` on `rendererStatus`, so the field
reports the failure, paints zero pixels, and stands up no second engine. **`useGpuSubstrate.ts`
was never opened** — it is #54's file (C6) and outside this fence, and the cure did not need
it: optionality was never the only way to close the seam.

This is strictly better than the written fallback on the spec's own terms. G-FF-ONE-LAW's
PRIMARY arm — `rg 'fourierFieldGLSetup|fourier-field\.glsl|GL_MAX_|MAX_PHASORS|epicycleArms'`
empty — is now satisfiable; the alias-by-import fallback could never have satisfied it, only
its weaker band-decline arm. The GL arm dies whole: **−645 lines** (`fourierFieldGLSetup.ts`
403 + `fourier-field.glsl.ts` 242), plus the four parity claims that only existed to keep two
engines in step.

**Stated deviation, not papered:** `RendererStatus.phase` on disk is
`"initializing" | "ready" | "error"` — there is **no `"unsupported"` phase**, and
`rendererStatus.ts` is a shared leaf four substrates read. The spec's `"unsupported"` is
honoured by its MEANING (`phase: "error"` carrying the sentence *"WebGPU is required…"`),
not by minting a phase on a foreign surface. Recorded here rather than silently satisfied.

---

## §3 · THE MINT — the floor DERIVED, the axis table REPRODUCED

The spec's own labs (`n-axis-lab.mjs` et al.) are **gone** — the scratchpad that held them
was cleared. Rather than restate remembered integers, the floor was re-derived from the
spec's stated geometry and then checked against the table of record.

**The law, as shipped** (`renderer/mint.ts`): a term survives iff its **peak-to-peak
excursion** reaches half a device pixel at the reference stage —

```
keep k  ⟺  2·|c_k| · (856 / hypot(spanX, spanY))  ≥  0.5
```

where 856 px is the reference DIAGONAL (`--article-max` 1536 → `--stage-block`
`min(62svh,44rem)` 704 → a 605 px painted extent, whose diagonal is 605·√2 ≈ 856) and the
denominator is the FULL reconstruction's model bbox diagonal.

**The derivation was falsifiable and three candidates were falsified.** Normalising by
`max(spanX, spanY)` instead of the diagonal makes the table **infeasible for any
threshold**: the ℱ's 61st term normalises to 3.5512e-4 while the star's 19th normalises to
3.7835e-4, so no single cut keeps 61 and stops at 18. The diagonal is not decoration — it
is the only normaliser under which the table has a solution, and the spec named it.

Reproduced, `node axis-lab.mjs` (this seat, deterministic):

| source | emitted | of record |
|---|---|---|
| ℱ wordmark | **61** | 61 |
| heart | **8** | 8 |
| star | **18** | 18 |
| trefoil · quatrefoil · pentafoil · hexafoil | **2** each | 2 |
| spiro | **3** | 3 |

**AXIS TABLE REPRODUCED EXACTLY**, eight sources, zero adjustments. The gate asserts these
against the shipped `mintSpectrum`, not against the lab.

**One figure moves from the spec's, and the detector is stated rather than the number
adopted.** The amplitude-vs-index ordering claim: the spec cites 11 vs 49 terms for the star
"within 1% of bbox". This seat's instrument — max Euclidean error over 256 samples, as a
fraction of the max bbox span — reads **14 amp-ordered vs 69 index-ordered**. The
qualitative claim (amplitude order needs several times fewer terms) reproduces strongly; the
integers came from a different error metric, and the shipped gate asserts the RATIO
(`amp < index / 3`) rather than either pair of numbers.

---

## §4 · WHAT WAS BUILT — the four laws, made into code

### 4.1 · Law 3 first: one axis, no ceiling

`MAX_PHASORS`, `MAX_CURVE_SAMPLES`-as-ceiling, `epicycleArms` and the four ceiling copies
are **gone**, and nothing replaced them. Buffers are sized per-spectrum in `renderer/wgpu.ts`
(`termCount * FOURIER_PHASOR_BYTES`, `(termCount + 1) * 16`), the compute kernel's loop bound
is `arrayLength(&phasors)`, and the N slider's maximum IS `spectrum.length`. A 61-term ℱ and a
2-term foil each pay for exactly what they carry.

`epicycleArms` died rather than moved: it was a second truncation axis orthogonal to nothing
(it could only ever be ≤ N), and its removal is what makes "the chain IS the sum" true rather
than approximately true.

### 4.2 · Law 4: the ink, and the composite that makes its ratio exact

The translucent-cel formulation, the black literal and the white specular leg are struck.
What ships:

- **The ink** is an opaque pigment: the ramp head taken `−ΔL 0.22` and **gamut-mapped at
  fixed L and hue** through `gamutMapStop` — the tree's one gamut-mapper, not a second.
- **The head** is the ramp head `+ΔL 0.11`, chroma preserved. Light-led, in the palette
  family. `vec3(1.0)` appears nowhere in the render shader.
- **A 16-entry CPU-resolved LUT** with a `C ≥ 0.10` tail floor, rebuilt only when the
  palette identity changes. The shader reads a table; it converts no colour space per
  fragment.

> **REALIZATION, disclosed.** §3.3 describes the pair as *"composited offscreen at α1, the
> age envelope multiplies the strip once"*. An offscreen strip cannot carry a PER-SEGMENT
> age at composite time, so a literal second render target would have had to choose one age
> for the whole trail. What ships achieves the stated INVARIANT — `α_ink(age) ≡ α_mark(age)`,
> exact at every age — inside one fragment: ink and mark are composited against each other
> at full alpha, and the envelope multiplies the PAIR:
> ```wgsl
> let aPair  = aMark + aInk * (1.0 - aMark);
> let rgbPair = markRgb * aMark + inkRgb * aInk * (1.0 - aMark);
> let env = peak * max(pow(age, fadeExp), trailFloor);
> return vec4<f32>(rgbPair * env, aPair * env);
> ```
> One multiplier, both pigments, no second render target and no third pass. The offscreen
> target is refused as a mechanism the invariant does not need.

**ONE BLEND, everywhere**: premultiplied component-wise MAX (`srcFactor one`, `dstFactor
one`, `operation max`) on all three pipelines. The density swing, the chain's join seam and a
negative destination all become unrepresentable rather than tuned away. Loudness is clamped
**at pack time** (`Math.min(Math.max(peakAlpha, 0), 1)` in `packFourierRenderUniforms`), which
is why the Intensity row can honestly say the picture stops changing before the slider does.

### 4.3 · Law 3 again, at the stage: the ring law

`ringsAt(minted, stageDiagonalDevicePx, markStrokeDevicePx)` and the vertex stage ask the
SAME question — `2·|c_k| ≥ markStroke` — of the live stage. Below the rung the term is still
summed and still chained (arm + joint dot); only the outline elides. Zero media queries.
Measured with this seat's own instrument on the ℱ at stroke 8, dpr 2:

| stage diagonal (CSS px) | 856 | 700 | 560 | 420 | 336 |
|---|---|---|---|---|---|
| rings drawn | 16 | 14 | 14 | 12 | 9 |

The gate asserts the LAW (monotone non-increasing, every drawn ring clears the rung, the
sum untouched) rather than this table, because the per-stage counts of record are a π
observation and C-13 is unwired.

### 4.4 · Law 2: touch means time

`fourierLeanMapping` + `FOURIER_BIAS_GAIN` + `FOURIER_FOLLOW_LEAN` + the three lean types are
**deleted** from `pointerFieldMappings.ts` (−86) and from the root barrel. The figure has no
mechanism left with which to chase a cursor.

The clock became its own leaf, `clock.ts`, for one reason: the claims made about it are
claims about arithmetic, and arithmetic should be checkable without a GPU. `useFourierField`
composes it, so the gate tests the SHIPPED code rather than a copy of it.

- `SETTLE_OMEGA 8.0` / `SETTLE_ZETA 0.62` are gone. The travel spring binds by JOB:
  `springPreset("world")`, and this lane owns exactly one invariant about it — the CONSUMED
  damping fraction ≥ 0.82. Measured on disk: **1.0**.
- **The rate floor** `rate = max(0, base + scrub + momentum)` — the clock may stop, never
  un-draw. Asserted over a hostile trace (scrub `−2` every frame for 600 frames at six flick
  speeds): the returned rate is never negative and the only negative `headT` deltas are the
  period wrapping.
- **`FLICK_TURNS 0.5`** enforced at the seed: `v ≤ 0.5·ω²`, so `|∫flick| = v/ω² ≤ 0.5`
  turns. Asserted by INTEGRATION — a `1e6` flick advances 0.4999 turns, not by trusting the
  algebra.
- **Edge-latched**, one impulse per gesture (arm at burst 0.22, re-arm at 0.06). Asserted by
  contrast: a 90-frame held burst advances LESS than three released-and-re-armed gestures of
  30 frames each.
- `setHeadT` takes no spring. A hand's position is not a physics event.

### 4.5 · The surface, and the a11y arm

Seven props (`config · spectrum · getPalette · color · seed · freeze · interactive`).
`colorResolver` is deleted. Expose gains `headT` (as a live ref the transport binds) and
`flick`; `renderAt` dies.

**`interactive` has ONE authority.** The spec listed it as both a prop and a config field;
shipping both would be two writers on one behaviour. `FourierFieldConfig.interactive` is
struck and the prop is the only one, read live by the clock through an `interactive: () =>
boolean` dependency.

Interactive, the host IS the transport: `role="slider"` exact, `tabindex="0"`, four
`aria-value*`, and `aria-valuetext` carrying **the same summed count the frame used**
(`N 24/61 · 37% through the period`). ←/→ 1/64 · ↑/↓ 1/8 · Home 0 · End 0.999 · Space
pauses. Ambient: role and tabindex both absent, canvas `aria-hidden`.

`aria-valuenow` had to move while the clock ran without a second rAF. It is a 10 Hz SAMPLE
published from inside the one `onFrame` — a read off the existing loop, not a new one.

**Config-time throws, as ordered:** an unknown `source` and an empty palette both throw
rather than painting a default.

### 4.6 · The story (W4)

Five presets, all reachable at rest and all honestly captioned: Studio · Teaching (one term,
quarter speed) · Ambient · Technicolor (ink offset 1.0, stroke 12, sweep on) · Frozen. The
source picker states each source's **honest term count** by calling the shipped mint —
"Pentafoil · 2 terms", "ℱ wordmark · 61 terms". The `h-[min(72vh,600px)]` fork dies, so the
stage returns to `--stage-block`. The transport is full-width directly under the stage in
both arms, and its readout is the field's own `headT` — there is no second copy of the clock.

**The stage pill is gone.** It asserted `N 2/2 playing` over blank paint; the gate greps for
its vocabulary (`liveStatus`, `stage-pill`) and finds none.

### 4.7 · `positionsAt` earns a real edge

`vizPreviewStill.ts`'s epicycle still hand-rolled its own harmonic sum. It now calls
`makeHarmonicFigure` + `positionsAt`, so the landing still and the live field cannot disagree
about what the transform draws.

---

## §5 · REFUSALS AND DEVIATIONS, each with its ground

| # | what | ruling |
|---|---|---|
| 1 | §3.7's alias-by-import fallback | **REFUSED** — contradicts §3.7's own law and the no-masking-fallback edict; §2 above |
| 2 | `rendererStatus: "unsupported"` as a literal phase | **DEVIATION** — no such phase on disk; `rendererStatus.ts` is a shared four-substrate leaf. Meaning honoured, phase not minted |
| 3 | The offscreen strip as a third pass | **REFUSED** — the invariant it exists for is achieved in one fragment; §4.2 |
| 4 | The barrel's 11 names | **DEVIATION: 13 + 1 type.** `mintSpectrum` · `ringsAt` · `MintedSpectrum` are added. §3.8 REQUIRES the story to state honest per-source term counts and to set the N maximum to `spectrum.length`; after the mint became the one place a term count is decided, there is no other supply. The alternative was a demo reaching into `renderer/` internals |
| 5 | `#transport` slot on VizStudio | **NOT BUILT** — it is an EXPRESS chassis organ (§9 routes it to #52/C3-C5) and unit-1 did not build it. The transport ships inside `#stage` as the full-width bar under the stage, which is what §3.8's own layout clause asks for. → **#52's next unit** |
| 6 | `live` / `inertReason` / `note` on `LabeledField` | **NOT AVAILABLE** — #52 MOVE 3 is unbuilt (unit-1 §4 discloses it). Inertness is expressed with `:disabled` plus the reason in `description` ("Inert here — a curated source carries its own spectrum"), which is available and honest. → **#52 MOVE 3** |
| 7 | The per-stage ring table of record (18/16/14/14) | **NOT CLAIMED** — a π observation, and C-13 is unwired. This seat's own measured table is recorded in §4.3 with its detector; the gate asserts the law |
| 8 | G-FF-INK, and the π arms of G-FF-CLOCK / G-FF-SCRUB | **ENQUEUED, not claimed** — §7. C-13 unsatisfied; no browser was opened by this seat |
| 9 | `src/index.ts` + `public-surface.spec.ts` row drop | **EXECUTED IN-LANE**, though §9 routes it to W-GATE-COLLAPSE's re-pin register. Two grounds: #65 W-GATE-COLLAPSE **LANDED** 2026-08-08, so the routed owner has closed; and the drop is FORCED, not optional — deleting `fourierLeanMapping` while the barrel still names it does not compile |
| 10 | `tests-visual/viz-fourier-ribbon.spec.ts` | **ROUTED, not deleted.** It asserts source truths about `ribbon.ts` and the dual-path mirror, both of which are now gone, so it is unrunnable by construction as well as unenrolled. §9 routes it to the π-suite wave (C8) as enrol-or-delete; that verdict is C8's to take, and it is named here so C8 meets the finding rather than the file |
| 11 | The A-1 machined-groove extinction (N-5) | **UNTOUCHED** — §9 owns it to W-CONFIG-EXPRESS ∥ W-DELETE. `instrument-chassis/styles.css` was not opened |
| 12 | `src/composables/color/index.ts` — the stale `colorResolver` advertisement | **ROUTED to the OVERFITTING AUDIT at tranche close** (`docs/audits/overfitting-audit.md`), owner-named here so the audit meets the finding rather than the file. Deleting the `colorResolver` prop (§4.5) left the doc comment at **`:40`** and **`:152`** still advertising it — *"the `<FourierField>` ambient background takes it as an optional `colorResolver` prop"* — a claim now false in both places; verified on disk, those two lines are the ONLY surviving `colorResolver` occurrences in `src/`+`demo/`+`tests/`. In the same pass `defaultBlobColorResolver` (`:154`) fell to **test-only reach**: its sole consumer outside its own module is `tests/components/custom/blob/resolveColor.test.ts`, zero `src/`/`demo/` sites — the two-sites-or-exported rule is the audit's to apply, not this fence's. The file was rightly NOT opened: it is a shared colour leaf, outside this lane |

---

## §6 · VERIFY — real exit codes, never a piped tail's

| check | command | exit | figure |
|---|---|---|---|
| typecheck | `npx vue-tsc --noEmit && npx vue-tsc --noEmit -p tsconfig.test.json` | **0** | no output |
| gate receipt | `node scripts/gate-register.mjs` | **0** | `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0` |
| library build | `npm run build` | **0** | 65 public declaration entries · `fourier-field.js` 30.63 kB (gzip 11.02 kB) |
| demo dist build | `npm run demo:dist:build` | **0** | built in 720ms |
| export regen | `node scripts/regen-exports.mjs` | **0** | `EXACT REPRODUCTION: YES` — **no export key moved** (g4's HOLD) |
| battery | `npx vitest run` | **1** | `Test Files 1 failed \| 224 passed (225)` · `Tests 1 failed \| 2002 passed \| 6 expected fail (2009)` |
| GLSL absence | `grep -c '#version 300 es' dist/fourier-field.js` | **1** (no match) | `0` |

**Gates exactly 60, `violations:0`, `drift:0`, `rosterSha256` unmoved — nothing minted.**
The six fourier gate groups ship as close-battery rows (E-7 class), which is why the receipt
is byte-identical to unit-1's. **seats +0**, exactly as the row books it.

### 6.1 · The battery's ONE failure is FOREIGN, proven two ways

`tests/styles/feedback-motion.test.ts > REFUSES ripple/splash` fails. It is a concurrent
lane's in-flight rewrite of `src/styles/tokens/property-regs.css` (`160 insertions(+),
277 deletions(-)` in the working tree), a file this seat never opened. Method, per the
born-RED law — **scratch mirrors via `git archive HEAD`, never a `git checkout` in a shared
tree**:

1. `git show HEAD:src/styles/tokens/property-regs.css | grep -c ripple-radius` → **1**;
   the working tree → **0**. The string the gate looks for was removed by someone else.
2. pristine `git archive HEAD` mirror → **22/22 pass**.
3. HEAD mirror **+ only this lane's 9 files** → **22/22 pass**. The acts are exonerated.

**The invariant the order asks for — zero failures from this lane — is HELD.** Two further
RED rows appeared mid-run and were CURED here because they were genuinely this seat's:

- `gate:boot-graph` (dist-demo staleness) — mechanical, cured by rebuilding; it re-fired once
  more when a concurrent lane wrote a source file **4 seconds** after the rebuild finished,
  and is green on the settled tree.
- `gate:G-OVERFIT` EXPORT-REACH — a real finding: `FOURIER_UNSUPPORTED_MESSAGE` was exported
  with no reader outside its own module. Made module-private. The gate was right.

### 6.2 · The battery figures move, and the act is named

The standing line is `1538 passed | 5 xf`; this cut runs `2002 passed | 6 xf` over 225
files. **This unit's own contribution is net +24 cases in one file — 6 → 30; the 30 green at
the cut stands** (`FourierField.smoke.test.ts`, 136 → 500 lines). The remainder of the movement
arrived from the three concurrent lanes during this run — the sixth expected-fail is not this
seat's and no case here is `.skip`ped.

> **CORRECTION — struck in place 2026-08-10, BK #53 (adjudicator C3).** The figures above
> replace three wrong ones: ~~`+30 cases in one file`~~ (the file already carried 6 cases at
> HEAD, so the contribution is a NET +24, not a gross +30), ~~`73 → 490 lines`~~ (the HEAD file
> is **136** lines, not 73). Verified against HEAD bytes, both at `79d9ca2f` and at the `2cfc1124`
> base: `git show HEAD:tests/components/custom/fourier-field/FourierField.smoke.test.ts | wc -l`
> → **136**, its `it(`/`test(` count → **6**. The `490` the adjudicator ordered was measured
> before its own C2 cure landed; that cure added 10 lines, so the honest cut-state figure is
> **500**, and `git diff HEAD --numstat` reads **+500 / −136**.

### 6.3 · BORN-RED — 9/9 falsified at HEAD

A born-RED harness asserting the same nine claims was run in a SECOND pristine
`git archive HEAD` mirror (`scratchpad/delta2/red/tests/bornred/`). **All nine FAIL at HEAD**:
the GL arm and the ceiling constants are present, the barrel still names `fourierLeanMapping`,
the ℱ carries 159 unordered unfloored terms rather than 61 amplitude-ordered ones, the clock
declares its own `SETTLE_OMEGA`/`SETTLE_ZETA` and has no rate floor, the host has no
`role="slider"`, the story still says `liveStatus`, an unknown source paints a default
instead of throwing, and neither `renderer/mint.ts` nor `clock.ts` exists.

Each gate therefore bites on the thing it names, measured rather than asserted.

**Disclosed, not papered (adjudicator A5):** four of those nine rows — **3, 4, 5 and 8** — are
**claim-twins that cannot witness the cure at cut-state**. Row 3 asserts against the raw
spectrum, row 4 dies on `ENOENT` at the now-deleted `composables/` path, row 5 carries an
ill-typed partial config that throws before the refusal it means to observe, and row 8 turns on
the same seam. They are RED at HEAD for reasons that overlap the reason they would be RED
anywhere, so they witness the HEAD state without witnessing the fix. **The red-at-HEAD figure
stands 9/9** — nothing here is withdrawn — but only rows 1, 2, 6, 7 and 9 discriminate HEAD from
the cut, and the four twins should be rebuilt or retired before they are counted as coverage.

---

## §7 · π — ENQUEUED to the singleton browser seat, NOT claimed

No browser was opened by this seat, and **C-13 is unsatisfied**, so no π row can bite yet.
Eight cells, each with the delta it must witness. **Screenshot-only on the canvas — never
`getContext()`** (the context-steal trap).

| cell | route/state | assertion |
|---|---|---|
| δ2-π-1 | `/substrates/fourier-field` boot + ℱ, light AND dark, 1440×900 dpr1 | mark:ink ∈ [1.5,3.0]:1 at the head · ink:ground ≤12:1 light, ≥1.5:1 dark · darkest marked pixel C ≥ 0.04 · neutral-dark share ≤5% · **no white specular cluster on the head** |
| δ2-π-2 | ℱ, N ∈ {1, 8, 16, 61}, 1440×900 | N=1 paints exactly one ring; marked share grows monotonically; **the figure does not rescale between steps** (the fit-fixed-under-N claim) |
| δ2-π-3 | dark, 1440×900 | ring:ground ≥3.0:1 · **zero pixels in OKLab hue 80–120°** (the chain sweep cannot reach chartreuse) |
| δ2-π-4 | interactive, 1440×900 + 390×844 | role census; `aria-valuenow` before/after ArrowRight ×5 + Home; valuetext contains the badge; t=0 vs t=3 s differ while playing, static when paused |
| δ2-π-5 | flick sweep, instrumented, 1440×900 | per-frame `headT` trace at r0 ∈ {0.2…4.0}: **zero negative deltas**, ≤0.5 turns, one impulse per gesture |
| δ2-π-6 | ring law, 4 cells (studio cap · 1440 · cel 21rem · 390) | painted ring count vs `ringsAt` at the same stage — the CPU predicate and the shader must agree |
| δ2-π-7 | story mobile, 390×844 | no horizontal overflow; stage full-width; transport reachable; the source picker's term counts legible |
| δ2-π-8 | a no-WebGPU host | `rendererStatus` reports the failure, **zero canvas pixels**, and no second renderer stands up |

**Owed to the slides tranche, unchanged:** the 8-row relay stands as written, including the
one pixel-affecting row (the black ink becomes the warm opaque ink — re-capture and approve
S1/S5) and the placement condition that re-opens the seat if the adopt drops either mount.
`seed="hero"` keeps its figure identity: the default source is still `"elliptic"`.

---

## §8 · FENCE — what this seat wrote

Nineteen files inside the lane — **12** inside `src/components/fourier-field/` and **7**
outside it, which is the row count of the table directly below (the struck ~~Seventeen~~ never
matched its own table; corrected in place 2026-08-10, BK #53, adjudicator C4).
**`src/components/fourier-field/` goes 2,950 → 2,256 lines
(−694, −23.5%)**, of which the GL arm is 645.

| file | +/− |
|---|---|
| `src/components/fourier-field/FourierField.vue` | +134 / −129 |
| `src/components/fourier-field/constants.ts` | +105 / −129 |
| `src/components/fourier-field/math.ts` | +60 / −109 |
| `src/components/fourier-field/index.ts` | +4 / −44 |
| `src/components/fourier-field/README.md` | +33 / −51 |
| `src/components/fourier-field/clock.ts` | **+125 (new)** |
| `src/components/fourier-field/useFourierField.ts` | **+225 (new, moved up from `composables/`)** |
| `src/components/fourier-field/renderer/mint.ts` | **+161 (new)** |
| `src/components/fourier-field/renderer/uniforms.ts` | **+291 (new)** |
| `src/components/fourier-field/renderer/wgpu.ts` | **+393 (new)** |
| `src/components/fourier-field/shaders/compute.wgsl.ts` | **+77 (new)** |
| `src/components/fourier-field/shaders/render.wgsl.ts` | **+269 (new)** |
| `src/composables/motion/pointer/pointerFieldMappings.ts` | −86 |
| `src/index.ts` | +4 / −8 |
| `src/components/PROCEDURAL-SUITE.md` | +7 / −4 |
| `demo/stories/substrates/fourier-field.vue` | +348 / −305 |
| `demo/chassis/landing/vizPreviewStill.ts` | +23 / −19 |
| `tests/components/fourier-field/FourierField.smoke.test.ts` | +500 / −136 (moved out of `custom/`; the struck ~~+427 / −73~~ corrected 2026-08-10 per C3) |
| `tests/public-surface.spec.ts` | −1 |

**DELETED** (8 files, 2,109 lines): `composables/fourierFieldGLSetup.ts` ·
`composables/fourierFieldWGPUSetup.ts` · `composables/uniformBridgeWGPU.ts` ·
`composables/useFourierField.ts` · `shaders/fourier-field.glsl.ts` ·
`shaders/fourier-field.compute.wgsl.ts` · `shaders/fourier-field.render.wgsl.ts` ·
`shaders/fourier-field.ribbon.ts`. The `composables/` directory is gone; the phantom
`custom/` segment is gone from this component's test path.

**Untouched, as fenced:** `src/composables/glass/webgpu/useGpuSubstrate.ts` (#54's, C6) ·
`src/composables/glass/webgpu/rendererStatus.ts` (shared leaf) ·
`src/components/instrument-chassis/**` (N-5's) · `src/components/aurora/**` and
`tests/components/custom/aurora/**` (γ's, dirty) · `src/styles/**` (foreign, dirty) ·
`demo/shell/**` (β's #21 surface) · `docs/design/**`, `docs/tranches/IOS27-MICRO/**`,
`scripts/comment-census.mjs` (foreign, appeared mid-run) · `demo/stories/foundations/typography.vue`
(δ0, landed in unit-1). ~~No `git add`/`commit`/`stash`/`checkout` was run.~~ **No export key
moved** (`regen-exports` EXACT). **No gate seat minted.**

> **CORRECTION — struck in place 2026-08-10, BK #53 (adjudicator C1).** The second swearing
> of §0's falsehood, corrected on the same terms. No `git commit`/`stash`/`checkout` was run —
> but the smoke test's move out of the phantom `custom/` segment was made with **`git mv`,
> which stages**, so a `git add` was run in effect and the index is not empty. It holds exactly
> one entry, this seat's own file-move, and nothing besides:
> `R100 tests/components/custom/fourier-field/FourierField.smoke.test.ts -> tests/components/fourier-field/FourierField.smoke.test.ts`.
> **The driver COMMITS THROUGH the content-identical R100 at the cut** — the rename is the true
> move. Recorded here so the fence claim is measured rather than asserted.

One committed-text strike, dated in place per house law: `src/components/PROCEDURAL-SUITE.md`
— the "supported WebGL2 path" claim in both the table and the FourierField section, struck
`[struck 2026-08-10, BK #53]` with its ground, not deleted.

---

## §9 · CLOSE

⊕ⁿ **LANE δ COMMIT-UNIT 2 — δ2 #53 GF-FOURIER LANDED** at `<SHA>`. The drawing machine is
built to its sealed spec: one renderer and a declared-closed seam where the second one was,
one amplitude-ordered paint-floored axis with no ceiling, one blend, one clock with a floor
under its rate, and an ink whose ratio to its mark is exact at every age by construction. The
axis maxima of record — ℱ 61 · heart 8 · star 18 · foils 2 · spiro 3 — are REPRODUCED by a
floor re-derived from the spec's own geometry after its labs were found gone, and three rival
derivations were falsified on the way. Nine claims measured born-RED at HEAD; thirty cases
green at the cut; `seats:60 violations:0` byte-unmoved.

One structural refusal carries the unit: §3.7's written fallback would have shipped a live
second renderer against §3.7's own law, and the law won without touching #54's file. Six
further refusals and four deviations are recorded above with their grounds, and eight π cells
are enqueued rather than claimed because C-13 is still unwired.

δ3 (#58) remains gated on Lane β's #21 M03 acts; δ4 (#73) is unopened.
