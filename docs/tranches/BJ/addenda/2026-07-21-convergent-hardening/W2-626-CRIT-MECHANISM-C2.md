# MATERIAL W2 `626540ad` — exact post-landing composited-signal mechanism critic

**Critic seat:** independent Sol x-high mechanism/judgment seat  
**Mode:** formation-only; no product, test, evidence, commit, receipt, or band-authority edit  
**Verdict:** **DEFECT / UNIFIED R-COMPOSITED-SIGNAL RED / FREEZE RED**  
**Question:** does the first `backgroundColor` whose alpha is at least `0.5`, dropped to an opaque
triple and placed under the field pixel, represent the painted canvas-opacity + placeholder-gradient
+ page-underlay stack while preserving source intent, static/discovery parity, and the real Atlas
receiver?

## 0. Exact authority and reproducibility pin

The audited Glass commit is:

- commit: `626540adbe10fd84f47b8365977925a7fbd2e17a`
- tree: `c96ac03d4afb06455cc35096933410b14df2966f`
- parent: `f0d32d6915790ea97df383a4a486e3296f2b43d5`
- subject: `fix(glass): land BJ MATERIAL W2 — composite the live field over the REAL page underlay`
- ordered moving-bundle digest accepted for this landing:
  `1f00437a77eaf047eef349d97aa95c176ebf94d9ec4bba2c633a0df0568d8e63`
- superseded moving-bundle digest:
  `16cbd563c7ded8b01dd9a42824ea07d6fa500f34f71164c7d61d19d10cf72294`

The corrected Q formation relay governing this critic pins:

- Q `REGISTRY`: `c3fc4ce9816307cdbea47915d6563aa74812d3e1760a9a76adc8bb198914244a`
- Q `GLASS-OUTBOX`: `571d2bfb771fd8fa0b4c256da857e1db3493c250a12b5828292449dc2de71941`

Those bytes retain one unified `R-COMPOSITED-SIGNAL`: ordered alpha + gradient + source intent +
real Atlas witness, with no mandatory half deferred and no second attenuation/opacity axis.

The shared Glass worktree was dirty and moving. All product/test/band claims below were therefore read
from the commit object with `git show`, not inferred from dirty working-tree copies. Audited commit
blob SHA-256 values:

| Exact `626540ad` artifact | SHA-256 |
| --- | --- |
| `src/composables/glass/backdropLuminanceSample.ts` | `1ca7cf5761b00e7bb70863ddee916ac9d0f2ac6ee1a032d8c86bd1d45d4fa354` |
| `src/composables/glass/backdropSampleMath.ts` | `bd968a785742b03495e5574eb441bfd4dbce59777e42b3514953782f56d700ce` |
| `src/composables/glass/useGlassBackdropLuminance.ts` | `5678f359691b21528408f9af14df8bcd4660eb5af3f25d747bef434a194d58ad` |
| `src/components/dock/GlassDock.vue` | `5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a` |
| `tests/composables/glass/backdropLuminanceSample.test.ts` | `48d37f627f7d1cf67a18c1765da25304d23d5e88a38a547ab6c105e90d180c2f` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `a6006b5615cc7677a76fa3125b915b9c49277d5324af6bd9e6f1dae245c1d8bd` |

The real receiver was read at the accepted Atlas authority
`a040f88c75201d9294909e93631fcc132fb2ce97`. Its relevant blob SHA-256 values are:

| Exact Atlas artifact | SHA-256 |
| --- | --- |
| `src/platform/chrome/dock/Dock.vue` | `5d56cf4424d75961aa076c9e4ff4ce4768e814f365efe07ef60608ff728a4c48` |
| `src/platform/chrome/background/Aurora.vue` | `7078164de4e0592b73a85ea6660893f6c11a9e1570727758873132cbf08dbc19` |
| `src/platform/chrome/background/Atmosphere.vue` | `862b00e8ecbebd1d9c1082d413522a0f098829f05f4388b303d3c7743970fecf` |

Bounded read-only checks:

1. `npx vitest run tests/composables/glass/backdropLuminanceSample.test.ts
   tests/components/custom/dock/GlassDock.backdrop-mode.test.ts` — **5/5 PASS**.
2. An exact-commit test census found no test of `resolveSourceCanvas`, `resolveBackdropRgba`,
   `resolveUnderlayRgb`, `sampleStatic`, the field marker, configured-getter-to-null behavior, an
   ordered translucent stack, a background image, or a real Atlas mount.
3. A non-mutating analytical trace used the landed `source-over` equation for this stack, top to
   bottom: 50% field `[200,200,200]`, 50% upper color `[240,80,40]`, 50% lower color
   `[40,100,220]`, opaque page `[20,20,20]`. Correct ordered composition yields underlay
   `[135,70,80]`, final pixel `[167.5,135,140]`, luma `0.2749145`. The landed resolver selects the
   upper layer, discards its `0.5` alpha, and yields underlay `[240,80,40]`, final pixel
   `[220,140,120]`, luma `0.3532788` — a `+0.0783643` error before any spatial gradient is
   considered.

The green test count is real. It proves a narrower literal-white arithmetic change, not the accepted
composited-signal contract.

## 1. PASS / HOLD / DEFECT matrix

| ID | Status | Exact finding | Freeze consequence |
| --- | --- | --- | --- |
| W2-M-01 | **PASS, narrow** | `sampleAnimated()` no longer contains hardcoded `255 * (1 - a)` arithmetic. It calls one pure `compositeOver()` leaf with a supplied underlay. | Keep the leaf and the removal of literal white. |
| W2-M-02 | **PASS** | The patch feeds the existing luma/hue write path. It does not add a second consumer attenuation/opacity axis. | Preserve the one luma-to-tint output axis. Sampling painted opacity is input truth, not a new output axis. |
| W2-M-03 | **DEFECT** | `resolveBackdropRgba()` stops at the first `backgroundColor` with alpha `>= 0.5`; `resolveUnderlayRgb()` then discards that alpha. A half-transparent layer is treated as fully opaque and every lower layer is erased. | This is not ordered source-over and cannot freeze as “REAL underlay.” |
| W2-M-04 | **DEFECT** | The walk reads only `backgroundColor`. It does not read `backgroundImage`, the Aurora placeholder raster/gradient, element or ancestor opacity, canvas presentation opacity, or the cross-fade/group order. | The required canvas opacity + placeholder gradient + page stack remains unrepresentable. |
| W2-M-05 | **DEFECT** | `GlassDock.vue` is byte-unchanged and always passes a function. An absent prop therefore becomes configured-live intent whose getter resolves null; discovery and static sampling are bypassed and the observer writes `unavailable`. | The source-intent half of the unified producer remains RED. |
| W2-M-06 | **DEFECT** | Static and animated paths share a resolver name, not equivalent painted semantics. Static reduction ignores returned alpha; a transparent body reduces to black luma while the animated underlay resolver substitutes CSS-initial white. No mode matrix tests this. | Discovery/static parity is neither implemented nor proven. |
| W2-M-07 | **DEFECT / weak mutation** | The named fixed-white test compares `analyticalLuma(WHITE)` to itself. The real dark/light assertion bites only a loop that ignores the supplied underlay; its expected values call the same production `compositeOver()` helper as the code under test. | The suite cannot falsify stacked-alpha, order, gradient, source-intent, static, or many wrong-alpha mutations. |
| W2-M-08 | **DEFECT** | At pinned Atlas, the real dock passes no source or marker. Atlas defaults Aurora to the CSS placeholder substrate under an outer opacity ceiling, while the canvas layer is unarmed/transparent. The patch has no real receiver test or declaration. | The required Atlas witness is absent; a synthetic canvas triple cannot substitute. |
| W2-M-09 | **DEFECT / governance** | The band calls the narrow arm GREEN and calls the addendum “freeze input,” while both band and commit body route the configured-null half as sibling/deferred/out of scope. | The accepted unified row cannot be split or deferred; candidate-2 W2 stays RED. |
| W2-M-10 | **DEFECT / model law** | No Luna x-high implementation-seat declaration is attached to this post-supersession bounded mechanical landing. The old file-level `verified-model: claude-fable-5` provenance is not a launch record for this commit. | Preserve honest history, record the violation, and use Luna x-high for bounded redress. |
| W2-M-11 | **HOLD / exact-byte close** | This report is one Sol x-high post-landing critic. A future source/test/band amendment changes the candidate bytes, and the two-fresh-critic law then applies to that redress. | This critic rejects `626540ad` acceptance; it cannot pre-approve future bytes. |

## 2. The landed resolver is a first-color selector, not an ordered compositing model

At `backdropLuminanceSample.ts:231-256`, `resolveBackdropRgba()` walks
`document.elementsFromPoint()` from front to back. For each element it reads only
`getComputedStyle(node).backgroundColor`; alpha below `0.5` is skipped and alpha at or above `0.5`
returns immediately. At `:271-277`, `resolveUnderlayRgb()` drops the selected alpha to an RGB
triple. This creates a discontinuity with no paint analogue:

- alpha `0.499` contributes nothing;
- alpha `0.500` replaces every layer below it at full strength;
- two or more translucent layers can never both contribute;
- order below the first accepted layer is unobservable;
- a gradient/image can never contribute, even when it is the only visible color variation;
- CSS `opacity` on that layer or an ancestor is absent from the returned value.

Moving white from the pixel loop to `CSS_INITIAL_UNDERLAY` is useful cleanup. It does not make the
intermediate RGB triple “the real opaque page underlay.” A real opaque result must be obtained by
source-over composition in paint order until the page canvas is reached, or supplied by a provider
that has already performed that composition.

The numeric trace in §0 is a direct falsifier. Restoring either lower translucent layer, changing
their order, or changing the upper layer from alpha `0.5` to `1` produces different correct pixels;
the current resolver returns the same opaque upper triple in all three cases. That is exactly the
flattened-generic-opacity mutation the accepted gate requires to RED.

### Canvas and group opacity are also missing

`sampleAnimated()` reads canvas backing pixels with `drawImage()`. CSS presentation opacity is not
baked into that readback. Glass Aurora independently applies:

- shader pigment alpha to `canvas.style.opacity` in `runtime.ts:209-212`;
- the canvas-layer arm cross-fade (`opacity: 0` to `1`) in `Aurora.vue:283-298`;
- `opacityCeiling` once around the placeholder + canvas group at `Aurora.vue:195-214`.

The landed sample uses only `data[i + 3] / 255`. An opaque backing pixel painted through a `0.3`
outer ceiling is therefore treated as alpha `1`, erasing both placeholder and page. Conversely, the
CSS-substrate's visible placeholder can be fully painted while the canvas readback is transparent.
Accounting for these authored opacities inside the one composited luma input is required source
truth; it does **not** authorize the rejected second dock-opacity output axis.

### Static parity is internally inconsistent

`sampleStatic()` calls `staticResult(rgba)`, which computes luminance from RGB and ignores alpha.
`resolveUnderlayRgb()` uses the same returned tuple but replaces alpha below `0.5` with white. Thus a
default transparent body such as `[0,0,0,0]` reduces to luma `0` in static mode, while the same page
becomes `[255,255,255]` under an animated sample. “One stack-walk of record” is not parity when the
two reducers assign opposite painted meanings to its alpha.

The fallback comment also says body/root while the code's explicit fallback reads only
`document.body`. The final implementation must establish the actual page-canvas result, not merely
rename a raw CSS declaration as an opaque underlay.

## 3. Source intent remains broken at the existing GlassDock owner

The accepted source contract distinguishes an absent source from a configured live source whose
value happens to be null during mount:

1. **absent / undefined:** attempt the declared auto-discovery marker; if no live source exists, use
   the static painted-stack path;
2. **configured canvas/getter/selector:** live intent remains live; a transient null is reported
   unavailable rather than silently relabeled static;
3. **explicit static dock:** retain the existing no-live-observer posture;
4. **explicit `null`:** define and test its public meaning, but never conflate absent `undefined`
   with a manufactured configured getter.

At `GlassDock.vue:92-109`, every live dock instead passes this option:

```ts
backgroundCanvas: () => {
    const bc = props.backgroundCanvas;
    return /* canvas/getter or */ null;
}
```

At `useGlassBackdropLuminance.ts:215-223`, any non-null option object value — including that function
— is configured live intent. At sample time, `resolveSourceCanvas(function)` calls it and returns
null. Its auto-discovery branch runs only when the option itself is nullish, so it never runs here;
static sampling is likewise forbidden after mode has become live. The result is deterministically
`source-unavailable` for a default live dock with no consumer source.

Commit `626540ad` does not touch this seam and adds no test for it. Calling it a sibling or deferred
half does not change the runtime and conflicts with the one accepted producer row: the best underlay
math cannot be observed if the source is discarded before sampling.

## 4. The test suite proves literal-white removal, not formula or stack correctness

The three new tests have different evidentiary value:

1. The analytical dark/light ordering test proves that the production helper makes two supplied
   opaque triples produce different values. It does not use an independent numeric oracle.
2. The named born-RED fixed-white test is tautological:
   `expect(analyticalLuma(WHITE)).toBeCloseTo(analyticalLuma(WHITE), 10)`. It passes if
   `compositeOver()` is correct, wrong, constant, reordered, or replaced, as long as the same call is
   deterministic.
3. The `sampleAnimated()` dark/light test is a useful literal-white mutation arm: ignoring the
   `underlay` argument makes its two results equal and fails the assertion. But its “formula-correct”
   expected values call the same exported `compositeOver()` helper used inside the sampler. Mutating
   that helper to a different monotone blend can leave all three tests green.

No test calls the new resolver. No test paints a second translucent layer, a gradient/image, CSS
canvas opacity, group opacity, transparent body/root, a discovered marker, an absent option, a
configured getter returning null, a static fallback, or Atlas. Therefore the suite cannot carry the
committed band claim that acceptance is GREEN.

The smallest mutation-complete matrix in the existing gate owner must include:

| Contract arm | Mutation that must bite |
| --- | --- |
| ordered alpha | drop the first accepted layer's alpha; swap upper/lower order; delete the lower translucent layer |
| placeholder gradient | replace the spatial gradient with its `backgroundColor` or omit it |
| canvas presentation | flatten canvas/root CSS opacity to one opaque triple or ignore the arm cross-fade |
| source intent | restore GlassDock's absent-prop to configured-null getter conversion |
| discovery/static | remove the marker/source declaration, collapse discovered and static modes, or restore transparent-body black vs white divergence |
| formula | mutate source-over coefficients in the production helper while an independent closed-form oracle remains fixed |
| real receiver | remove Atlas's actual provider/marker or force its CSS-default field through the transparent canvas |
| output axis | add or retune a second dock attenuation/opacity axis instead of repairing the producer signal |

## 5. The pinned Atlas receiver is a live counterexample, not a witness

At Atlas `a040f88c75201d9294909e93631fcc132fb2ce97`:

- `src/platform/chrome/dock/Dock.vue:228-242` mounts the real `GlassDock` without
  `backgroundCanvas`, `background-canvas`, or a declarative field marker;
- `src/platform/chrome/background/Aurora.vue:77-95` states that no route opts into `shader` and
  selects `renderMode = "css"` by default;
- `Aurora.vue:161-166` passes the authored `opacityCeiling` to Glass Aurora;
- `Atmosphere.vue:148-166` orders the field below the paper layer;
- exact Glass `Aurora.vue:195-233` paints the CSS placeholder `backgroundImage` +
  `backgroundColor` under the canvas and applies the outer opacity to their shared root;
- exact Glass `Aurora.vue:283-298` keeps the canvas layer at opacity `0` until armed. Under the CSS
  substrate it remains the non-source while the placeholder is the permanent visible field.

Therefore the current real path is:

```text
Atlas Dock: no source
  -> GlassDock manufactures configured getter
  -> getter resolves null
  -> live mode, discovery bypassed
  -> source-unavailable
```

Even if the getter defect alone were fixed, Atlas supplies no marker, and the static selector cannot
represent the placeholder background image, its outer opacity, or the page beneath it. Merely marking
the existing canvas would be wrong on Atlas's default CSS substrate: that canvas is not the visible
field.

A real Atlas acceptance witness must mount this actual declarative route and declare either:

- an already-composited sample provider for the visible placeholder/canvas group over its page; or
- an ordered-layer description/sampler that includes placeholder gradient, canvas presentation
  alpha, group opacity, and page underlay.

It must then prove the luma/hue write changes when those real layers mutate and turns RED when the
declaration is removed or redirected to the transparent canvas. A synthetic 32x32 field with an
opaque RGB tuple is not that witness.

## 6. Governance and freeze truth

`BAND-MATERIAL.md:1036-1065` labels the amendment a convergent-hardening “freeze,” calls the narrow
test GREEN, and says the GlassDock null-getter half stays sibling/deferred. The commit body repeats
that the configured-null half and W3 judgment are out of scope.

That scope split is rejected by the corrected Q formation pins in §0. The two failures compose:

- without correct source intent, the field never reaches the sampler;
- without ordered composition, a reached field still produces the wrong painted signal.

Neither half can make the existing luma-to-tint axis truthful alone. “Useful source subset” is the
maximum warranted status. “Freeze input,” W2 GREEN, G3 produced, and deferred mandatory remainder are
not warranted statuses.

The model law is also prospective and explicit. This critic declares Sol x-high as required for
judgment. The bounded mechanical landing does not declare a Luna x-high seat; the historical
`verified-model: claude-fable-5` header belongs to the earlier band-verification provenance and does
not identify the implementation launch. Do not rewrite that history or invent a compliant label.
Record the violation, use Luna x-high for the bounded redress, and run two fresh Sol x-high critics on
the amended exact bytes. This file is one critic of `626540ad`; it is not one critic of bytes that do
not yet exist.

## 7. Smallest redress in existing owners

No new wave, Q shim, consumer fixed color/opacity pair, or second attenuation axis is warranted.

1. **Keep the useful leaf.** Retain one independently tested source-over helper and removal of the
   literal white from `sampleAnimated()`.
2. **Repair source intent in `GlassDock.vue` / `useGlassBackdropLuminance`.** Do not manufacture a
   configured getter for an absent prop. Preserve a genuinely configured getter as live intent even
   while it transiently returns null. Prove the full undefined/configured/discovered/static matrix.
3. **Represent the painted stack in the existing backdrop-sampler owner.** Either accept a
   consumer-provided already-composited sample provider or composite ordered layers. For Aurora, the
   minimum order is page underlay at the base, placeholder gradient/raster, canvas with its live CSS
   presentation alpha/cross-fade, then the shared outer opacity applied to that group over the page.
   Do not collapse those values to the first half-opaque `backgroundColor`.
4. **Make static and live page semantics agree.** Resolve transparent body/root to the same page
   canvas truth and retain alpha through composition rather than discarding it before reduction.
5. **Replace the tautology and decouple the oracle.** Use fixed independent closed-form expected
   numbers for multiple stacked-alpha/order cases, plus gradient and opacity mutations. Restoring
   first-color selection, alpha drop, hardcoded white, or null-getter conversion must RED.
6. **Land the real Atlas declaration and witness with its existing consumer owner.** Exercise the
   actual CSS-default placeholder path, not only a synthetic or hidden canvas. Removing the
   declaration must RED the receiver proof.
7. **True the band/status without deferral.** Preserve `626540ad` as useful history, withdraw its W2
   GREEN/freeze claim in a subsequent bounded amendment, and close the whole unified row on one exact
   candidate. Use Luna x-high for mechanical work and two fresh Sol x-high critics after landing.

## 8. Candidate-2 freeze ruling

**BLOCK any candidate-2 freeze that counts
`626540adbe10fd84f47b8365977925a7fbd2e17a` as MATERIAL W2 acceptance, G3 produced, a real-underlay
implementation, or unified `R-COMPOSITED-SIGNAL` GREEN.**

The commit may remain in history and its pure literal-white repair should be retained if it survives
the complete stack model. Its current first-half-opaque selector, alpha drop, background-image and
CSS-opacity blindness, configured-null source bypass, static divergence, weak mutation suite, absent
Atlas source, unauthorized deferral, and undeclared implementation seat make the accepted contract
**DEFECT** rather than HOLD-for-evidence.

Refreeze only after the smallest existing-owner redress in §7 lands on one exact candidate; all
ordered-alpha/gradient/source-intent/static/Atlas mutations bite; the existing luma-to-tint axis is
the sole output axis; and two fresh Sol x-high critics audit those amended bytes. This report cannot
pre-approve that future candidate.
