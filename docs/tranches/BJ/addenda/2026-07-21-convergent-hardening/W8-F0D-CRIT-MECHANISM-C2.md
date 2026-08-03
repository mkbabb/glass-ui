# W8 `f0d32d6` — exact post-redress mechanism critic (candidate 2)

**Critic:** independent Sol x-high mechanism seat  
**Mode:** formation-only; no product, test, evidence, commit, receipt, or band-authority edit  
**Verdict:** **DEFECT / FREEZE RED**  
**Question:** does the post-redress W8 runtime latch fail closed through its full lifecycle, and can its standing proof falsify OFF, real-ON, and false-positive-ON failures?

## 0. Exact authority and reproducibility pin

The audited commit is:

- commit: `f0d32d6915790ea97df383a4a486e3296f2b43d5`
- tree: `fdd332f76bc19a8302f923f2911137f62b517450`
- subject: `fix(glass): auto-arm .glass-lens refraction so shipped SegmentedTabs never regresses`

The working tree was dirty and moving. The relevant source and standing-test files were byte-identical to the commit while this pass ran; the already-dirty `BAND-MATERIAL.md` was read from the commit object with `git show`, not from the worktree. Audited blob SHA-256 values:

| Artifact | SHA-256 |
|---|---|
| `src/composables/glass/supportsBackdropRefract.ts` | `421c0023251d4830a7c0d879535bd24d8a0dcbebfa445ceb2da37c83812c5a71` |
| `src/components/tabs/SegmentedTabs.vue` | `7827869c8b06821332a6b16656e5a43db5826e41e454f4e74587e3b8cb3d3b6e` |
| `src/styles/glass-refract.css` | `24bd8523ce91cfd89fec33a45dfabda9c7c54d7743c030114a8c0025fb1ee720` |
| `tests-visual/refract-lens-never-sharper.spec.ts` | `4e529b81bd14a05d77626d414ad2717e705500570b900730c89dcdf4f60e9851` |
| `evidence/W-REFRACT-LATCH/latch-discrimination.json` | `c925da832aea0fcb4af89fbc4ca81479f8879ecbfc021073a2102e7a5f84b4dd` |
| `evidence/W-REFRACT-LATCH/latch-on-chromium.png` | `8076f6b563c58ae8bd22fca605d7e4e36b1ba670d46f2a3dbf9b50d33413df8e` |
| `MIGRATION.md` | `623665fa69ed574f8b5f1401ee5768e4c4ee202c4d0d32832e7143ac01ea9005` |
| `BAND-MATERIAL.md` at the commit | `62a397b9b03a4653733c305fca0311b45101023a6985f010e928c5a083486842` |

Read-only checks run against those relevant bytes:

1. `pnpm exec vitest run tests/components/custom/tabs/segmented-tabs.test.ts --reporter=verbose` → **13/13 PASS**.
2. `playwright test tests-visual/refract-lens-never-sharper.spec.ts` on `chromium-headless-new` + `webkit` → **4/4 PASS**.
3. A fresh-module Chromium trace through Vite exercised the exported detector and arm without changing repository files. Its exact result was:

   ```json
   {
     "cleanSupport": true,
     "collisionSupport": false,
     "staleAttr": "on",
     "firstThrow": "Error: forced supports throw",
     "calls": 1,
     "throwLockedAttr": null
   }
   ```

The green counts are real but narrow. The 13 tab tests never assert the detector, root attribute, or mount side effect. The four visual tests intentionally never arm the latch and therefore prove only the OFF floor.

## 1. Disposition matrix

| ID | Disposition | Finding | Freeze consequence |
|---|---|---|---|
| M-01 | **PASS, narrow** | The CSS repair removes the WebKit-lying `@supports` selector and keeps the refraction composite behind `:root[data-glass-refract="on"]`; with no attr, the blur base survives. | Preserve. |
| M-02 | **PASS, narrow** | The functional raster probe removes its temporary SVG in `finally`, catches failures inside the canvas arm, and returns false on no 2D context/readback failure. | Preserve, but it does not cover failures before the canvas call. |
| M-03 | **PASS, OFF only** | The video-path gate has a painted-scene floor, a blur-twin honesty floor, a planted filterless bite, worst-of-three samples, and a loud four-attempt terminal failure. The exact two-engine rerun passed. | Preserve as the standing OFF arm. Do not relabel it full-latch coverage. |
| M-04 | **DEFECT** | `SegmentedTabs` now owns a document-global capability side effect in `onMounted`, contradicting the once-per-app bootstrap boundary and making a leaf/component mount decide every `.glass-lens` in the document. | Reject the component-side arm before freeze. |
| M-05 | **DEFECT** | `armGlassRefract()` commits module-global `armed = true` before a fallible detector completes, does not catch `CSS.supports` exceptions, and does not clear a stale `data-glass-refract="on"` on false/error. | A stale or failed first call can leave the whole session falsely ON or irrecoverably OFF. |
| M-06 | **DEFECT** | The probe uses the fixed document-global ID `gl-refract-probe`. A pre-existing same-ID filter changed Chromium's result from true to false in the exact trace. The inverse collision can counterfeit red and false-arm. | Mint an invocation-unique owned ID and test collisions. |
| M-07 | **HOLD / mechanism gap** | The proxy proves `canvas` fragment-URL filtering, while the shipped path is a CSS `backdrop-filter` using an inline data-URI SVG with nested data URIs. The two differ in property, compositor, URL form, CSP exposure, and paint pipeline. | Keep the proxy fail-closed, but it cannot be the sole ON proof. |
| M-08 | **DEFECT / unwired proof** | No standing test invokes the public arm through OFF, real-ON, or forced-false-positive-ON arms; there are no direct lifecycle tests for stale attr, throw, DOM-ready, idempotency, or mount order. | Candidate acceptance is not falsifiable at the changed seam. |
| M-09 | **HOLD / unproven visual claim** | The committed Chromium ON witness establishes attr + computed `url(...)`, not a quantified visible garnish. There is no same-position attr-OFF/real-ON pixel delta or planted no-garnish bite. | Do not claim reified refraction from computed style alone. |
| M-10 | **HOLD / recapture mutation debt** | The OFF gate's recapture rule is defensible for a provably blind capture, but no delayed-arm/delayed-filter mutation proves a new armed-path harness cannot obtain a favorable later capture after discarding the failing onset. | Add a time-ordered mutation bite when the ON arm is added. |

## 2. DEFECT M-04 — a leaf mount became the app-global installer

At `SegmentedTabs.vue:30-36`, the component imports `armGlassRefract()`; at `:154-156`, every mount invokes it in `onMounted`. This is broader than the component's rendered need:

- the `underline` variant has no `.glass-lens` indicator and still arms the root;
- the responsive Select posture may omit the pill strip and still arms the root;
- mounting one tab component changes the material of every self-authored `.glass-lens` elsewhere in the document;
- a lens that exists before the first `SegmentedTabs` can change later merely because an unrelated tab component mounted;
- the root capability decision is now sensitive to component presence and mount order rather than app installation order.

The same commit's prose is internally split. `MIGRATION.md` says shipped tabs auto-arm while self-authored lenses use once-per-app bootstrap. `src/composables/glass/index.ts:32-37` still says consuming apps arm once at bootstrap. The post-redress source therefore does not have one owner: app root and component leaf both purport to own the same root mutation.

This is also not validated by the 13/13 tab run. Those tests pass because they assert tab semantics and geometry; none asserts how many times the detector runs, whether the attr is set or absent, whether underline/mobile mounts arm, or whether the first rendered lens uses the intended posture.

**Smallest existing-owner redress:** preserve `armGlassRefract()` as the already-published bootstrap installer; remove the `SegmentedTabs` import and `onMounted` call; land one intentional app-root call in each actual consumer root that uses the shipped or self-authored lens. Prove the two named SCI/Atlas receivers after their roots adopt it. Do not add another component-local or CSS-selector shim.

If ownership instead changes to component auto-arm, that is a new product ruling and must replace—not coexist with—the root-bootstrap law, define which component is the installer, and prove no material pop or cross-component ordering effect. The current mixed contract cannot freeze.

## 3. DEFECT M-05 — stale ON and thrown first call violate the advertised `iff`

The docstring at `supportsBackdropRefract.ts:119-123` says the root attr is set **iff** support is proven and that the installer is idempotent/fail-safe. The implementation does this at `:125-140`:

1. returns if module-global `armed` is true;
2. inside `set`, assigns `armed = true`;
3. calls `supportsBackdropRefract()`;
4. sets `data-glass-refract="on"` only on true;
5. never removes an existing attr on false or exception.

Two exact falsifiers follow.

### 3.1 Stale-attribute falsifier

Start Chromium with `data-glass-refract="on"`, force the honest first `CSS.supports` check to return false, then call the exported arm from a fresh module. Result: `staleAttr: "on"`. A WebKit page restored from markup/cache, a previous bundle, a host mutation, or a test fixture can therefore keep the broken armed selector even though this installer rejects support. That is false-ON, not a conservative degrade.

### 3.2 Throw-and-lock falsifier

Force `CSS.supports` to throw once, call the arm, restore the real function, then call the same module's arm again. Result: the first exception escapes, `calls: 1`, and the second call never probes or arms (`throwLockedAttr: null`) because the first call already committed `armed = true`.

The canvas body has a `try/catch`; the two `CSS.supports` calls at `:112-114` do not. Thus the file-level claim that failures resolve to OFF is true only for `probeCanvasFilterRaster()`, not for the exported detector/installer.

**Smallest existing-owner redress:** make the detector wholly fail-closed (including both `CSS.supports` calls); compute the verdict before committing terminal state; normalize/remove the installer-owned attr on false/error; then record completion per `Document`, not merely per module, or explicitly prove the single-document invariant. A thrown/transient attempt must either remain retryable or settle to a documented OFF state without escaping and without preserving stale ON.

Required born-RED lifecycle matrix:

| Arm | Expected result |
|---|---|
| no `document` | no throw, no state commit that poisons a later browser call |
| body absent, then `DOMContentLoaded` | exactly one probe after a mount exists |
| two calls before DOM ready | one effective probe, no duplicate active probe nodes |
| repeated calls after true | one probe; attr remains ON |
| repeated calls after honest false | documented terminal/retry behavior; attr absent |
| stale ON + honest false | attr removed |
| `CSS.supports` throws | no escape, attr absent, retry contract proved |
| `getContext`/readback throws | attr absent, retry contract proved |
| document replacement/second document | no stale module-global decision applied to the wrong document |

## 4. DEFECT M-06 — the fixed probe ID is externally corruptible

`probeCanvasFilterRaster()` hard-codes `const id = "gl-refract-probe"` at `:68`, appends a new filter with that ID, and assigns `ctx.filter = url("#gl-refract-probe")` at `:89`. ID lookup is document-global; appending a second duplicate does not guarantee the new node is the referenced filter.

The read-only Chromium falsifier prepended an identity filter with that ID, then called the exact exported detector from a fresh module:

- clean document: `supportsBackdropRefract() === true`;
- same document with the pre-existing duplicate ID: `supportsBackdropRefract() === false`.

An existing red-forcing filter can produce the converse class: the readback can turn red because the colliding node did so, not because the probe's owned graph ran. The current ID therefore permits both false-negative and false-positive corruption.

**Smallest existing-owner redress:** allocate an invocation-unique ID from an owned monotonic suffix or collision-checked nonce, set it on the temporary filter, and remove the exact owned SVG in `finally`. Add mutations for pre-existing identity and red-forcing filters under the old fixed ID; neither may affect the new result.

## 5. HOLD M-07 + DEFECT M-08 — the proxy is not the shipped compositor, and no ON gate closes the gap

The detector exercises:

```text
CanvasRenderingContext2D.filter = url("#temporary-document-filter")
```

The shipped material exercises:

```text
CSS backdrop-filter = blur(...) url("data:image/svg+xml,...#glass-refract")
```

The first is useful as a conservative signal; it is not observational identity. It does not test:

- the `backdrop-filter` compositor;
- the shipped inline data-URI and nested data-URI parsing;
- the consumer's CSP treatment of `data:` filter resources;
- the exact SVG graph used by `--glass-refract-filter`;
- whether computed retention results in visible paint.

The source now admits the proxy and the standing gate's limitation, which is truthful. But truthfully documenting the hole does not satisfy acceptance. The current visual gate's harness deliberately never calls `armGlassRefract()` (`refract-lens-never-sharper.spec.ts:399-405`), so an implementation that always returns true, always leaves the root ON, or paints an armed lens sharp can still pass its four tests as long as the isolated gate document omits the attr.

**Smallest existing-owner redress:** extend the existing W8 gate family rather than minting a parallel mechanism:

1. **OFF arm (retain current):** no installer, attr absent, blur twin honest, planted filterless lens bites, lens never sharper than blur base.
2. **Real-ON arm:** call the public installer through the same application bootstrap seam. Chromium must arm and show a bounded, spatially localized garnish/refraction delta while remaining no sharper than the blur floor; WebKit must remain unarmed and at the blur floor. Assert detector verdict, attr, computed property, and pixels together.
3. **Forced-false-positive-ON arm:** force the old proxy-positive/backdrop-drop posture (or equivalently force the root attr ON on the known accept-and-drop engine) and prove the armed-side invariant turns RED. Programmatic attr/computed-style evidence alone is not the verdict.
4. **Mutations:** restore stale ON after an honest rejection; restore the fixed-ID collision; make `CSS.supports` throw; make the detector always true; remove/neutralize the shipped garnish while retaining a syntactically present `url(...)`; make the armed lens filterless/sharp. Each mutation must bite the arm intended to catch it.

## 6. HOLD M-09 — “computed `url(...)`” is not measurable garnish

The banked `latch-discrimination.json` records two engine rows, attr state, and a truncated computed filter. It has no pixel metric. The Chromium PNG is a valid screenshot, but its two chips are not accompanied by an OFF/ON same-position delta, threshold, spatial mask, or planted no-garnish comparator.

A bounded read-only diagnostic on the committed PNG found:

- aligned 220×160 inner-chip RGB MAE: **0.0606 / 255**;
- full 260×200 aligned-chip RGB MAE: **1.8775 / 255**, concentrated at edge pixels;
- the chips sit at different backdrop phases, so even that edge delta is not causally attributable to refraction.

These numbers are not proposed as product thresholds. They show why the current witness cannot carry the claim by itself: it lacks a matched attr-OFF capture and a born-RED no-garnish mutation. The acceptance metric should use the same chip at the same coordinates/background phase, separate rim and interior masks, retain the blur-floor ceiling, and require a bounded rim-localized delta that disappears under the no-garnish mutation. “More difference” globally is not acceptable; it could reward sharpness or hue pollution.

## 7. HOLD M-10 — recapture is sound for OFF blindness but unchallenged for a delayed ON mutation

The current gate rejects a capture only when the scene did not paint or the blur-only twin remains near the bare scene, tries at most four captures, and fails loudly if all four are blind. It also uses the worst of three accepted samples. That is a sound narrow response to the known screenshot/video blindness and passed the exact rerun.

However, the ON arm will introduce the state transition the current harness avoids. The source comments explain that post-load stylesheet injection raced paint (`refract-lens-never-sharper.spec.ts:111-116`), while the runtime arm itself mutates the root attr after a mount point exists. There is no mutation that holds the armed lens bad during its initial visible interval and then makes it good before a later recapture. Without that bite, a future harness can accidentally treat onset failure as instrument blindness and retain only a favorable settled attempt.

The redress need not ban recapture. It must distinguish capture blindness from product state:

- record attr state, detector completion, computed filter, and frame timestamp in each attempt;
- accept an ON verdict only from frames after the same attempt's arm completion;
- never discard a frame merely because the lens is sharp; only the independent bare-scene/twin instrument predicates may authorize recapture;
- add a delayed-filter mutation whose bad armed interval is long enough to be observed and require it to RED;
- retain the all-attempts-blind loud failure.

## 8. Freeze ruling and exact minimum redress

`f0d32d6915790ea97df383a4a486e3296f2b43d5` is **not a candidate-2 freeze byte**. The CSS floor and OFF gate are good, but the changed consume edge is owned at the wrong layer, the latch can preserve stale ON, a thrown first call can poison the session, the detector is ID-collision-sensitive, and the standing suite cannot falsify the armed path it now ships.

The minimum in-scope redress is:

1. remove/reject `SegmentedTabs`' component-side `onMounted(armGlassRefract)` and restore one documented app-root/bootstrap owner;
2. make detector + installer entirely fail-closed and state-commit only after the verdict; normalize stale attr and define retry/per-document behavior;
3. make the temporary filter ID invocation-unique;
4. add direct lifecycle tests for the matrix in §3 and fixed-ID mutations in §4;
5. extend the existing visual gate into OFF, real-ON, and forced-false-positive-ON arms with a no-garnish mutation and a spatially bounded Chrome delta;
6. add the delayed-arm/filter mutation so recapture cannot launder a bad onset;
7. rerun the actual SCI/Atlas `SegmentedTabs` receivers only after their app roots adopt the installer; no consumer private selector, fixed-width shim, or component-local arm.

**Freeze rule:** refreeze only after the above lands in one exact candidate, the new mutations are shown born-RED against the superseded bytes, both engines are rerun on the exact candidate, and an independent critic reads the machine reports rather than the command exit alone.

