# MATERIAL W2 `626540ad` — exact receiver, integration, and evidence critic

**Critic seat:** second independent Sol x-high judgment seat  
**Mode:** receiver/integration/evidence falsification; no product, test, package, Atlas, receipt, band,
or other formation-document edit  
**Companion boundary:** `W2-626-CRIT-MECHANISM-C2.md` owns the sampler-mechanism analysis; this report
tests whether the candidate can cross the public Dock boundary, represent the real receiver, ship in
an exact package, and produce replayable Atlas evidence  
**Verdict:** **DEFECT / RECEIVER-RED / PACKAGE-CONSUMER-RED / UNIFIED
R-COMPOSITED-SIGNAL RED / FREEZE RED**

The narrow arithmetic change builds. It does not reach the real receiver. The default `GlassDock`
still turns an omitted source into a configured getter returning null; it also discards the public
selector form before the source resolver can see it. Pinned Atlas supplies no source or marker and
uses Aurora's CSS placeholder as its default visible field, while the exposed canvas is transparent.
The packed public Dock contract can carry only a canvas/getter/selector, not an already-composited
sample or ordered layer description. Finally, live Atlas is locked to the already-published `7.0.0`
tarball whose `dist/dock.js` still contains the literal-white loop. Exact `626540ad` can build a
different package also named `7.0.0`, but no package/repin/consumer evidence installs those bytes.

Those are integration defects, not missing polish. They prevent the accepted signal from being
expressed, transported, installed, or observed on the real Atlas path.

## 0. Reproducibility pins

The shared Glass worktree was dirty and the addenda were moving. Product, test, band, and package
claims were therefore read from commit objects or an isolated `git archive`, never inferred from
unrelated working-tree changes. At **2026-07-22 01:11:43 EDT**, the live Glass pin was:

- commit: `626540adbe10fd84f47b8365977925a7fbd2e17a`
- tree: `c96ac03d4afb06455cc35096933410b14df2966f`
- parent: `f0d32d6915790ea97df383a4a486e3296f2b43d5`
- subject: `fix(glass): land BJ MATERIAL W2 — composite the live field over the REAL page underlay`
- accepted pre-commit ordered-diff SHA-256:
  `1f00437a77eaf047eef349d97aa95c176ebf94d9ec4bba2c633a0df0568d8e63`

Moving formation bytes were re-pinned after the receiver audit:

| Formation input | SHA-256 |
| --- | --- |
| `IMPLEMENTATION-ASKS-C2.md` | `f790e3e00bc435aa6a3799bbed0d5ee3c8426932b0b40c653e2328704b71ed55` |
| `REGISTRY.md` | `1f8b32db102d61df116fc496aed50886c518d3ee2a8ef870b2bbee23223bd16d` |
| `GATES.md` | `f609372b58ecd133ec0238f5f8b3ec98e726e58557dbba3d04ed05ed0c6ad6b7` |
| `COORDINATION.md` | `0e842c360ff44e7b512b89fe3e8203721700dcd2ac700452af85edd7d692aad2` |
| `CHALLENGES.md` | `9750a27f9e690d6e2a9f44c2bb1858d696adac7fcdd35bcd4e622c7da9c4efa6` |
| `IMPLEMENTATION-RECONCILIATION.md` | `ddf65734024f36d80abe54694653b9dc78e68d29927c2723e260e68797ccfc26` |
| `W2-626-CRIT-MECHANISM-C2.md` | `dd4ba2a4292033f1bc290bbeb3070cfa575fff3337b0d4ff7da7bff84d63c1b0` |

The receiver-facing Glass artifacts audited from exact commit objects were:

| Exact `626540ad` artifact | SHA-256 |
| --- | --- |
| `src/components/dock/GlassDock.vue` | `5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a` |
| `src/components/dock/composables/useDockShellProps.ts` | `bd657faa78d950107776a0c16a01eb476a7c7bc03ad06031786b0c64c9057070` |
| `src/composables/glass/useGlassBackdropLuminance.ts` | `5678f359691b21528408f9af14df8bcd4660eb5af3f25d747bef434a194d58ad` |
| `src/composables/glass/backdropLuminanceSample.ts` | `1ca7cf5761b00e7bb70863ddee916ac9d0f2ac6ee1a032d8c86bd1d45d4fa354` |
| `src/components/aurora/Aurora.vue` | `13bd9e29a0503a8eb36dc044a16b229f8695eccf4d4124eb507fa6e3a5c9c070` |
| `tests/components/custom/dock/GlassDock.backdrop-mode.test.ts` | `49c67ec17d710f71fdcd5cd1a3dbd924875de21b99510c74c5987a5cc8321646` |
| `tests/composables/glass/backdropLuminanceSample.test.ts` | `48d37f627f7d1cf67a18c1765da25304d23d5e88a38a547ab6c105e90d180c2f` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `a6006b5615cc7677a76fa3125b915b9c49277d5324af6bd9e6f1dae245c1d8bd` |
| `package.json` | `39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb` |

The real Atlas receiver was read from the accepted dirty-worktree-safe commit authority
`a040f88c75201d9294909e93631fcc132fb2ce97`. Its pinned artifacts were:

| Exact Atlas artifact | SHA-256 |
| --- | --- |
| `src/platform/chrome/dock/Dock.vue` | `5d56cf4424d75961aa076c9e4ff4ce4768e814f365efe07ef60608ff728a4c48` |
| `src/platform/chrome/background/Aurora.vue` | `7078164de4e0592b73a85ea6660893f6c11a9e1570727758873132cbf08dbc19` |
| `src/platform/chrome/background/Atmosphere.vue` | `862b00e8ecbebd1d9c1082d413522a0f098829f05f4388b303d3c7743970fecf` |
| `package.json` | `901d775b496f86d262ca118d87eed2c3ccf525017eeb4776389d98491222e0d5` |
| `package-lock.json` | `965612e0a15b40eb4bf1468eea6cbc6b7196e00ca11e093c51d21bb154103997` |

### Read-only checks

1. `npx vitest run tests/composables/glass/backdropLuminanceSample.test.ts
   tests/components/custom/dock/GlassDock.backdrop-mode.test.ts --reporter=verbose` — **5/5 PASS**.
2. An exact-source census found no test that calls `resolveSourceCanvas`, `resolveBackdropRgba`,
   `resolveUnderlayRgb`, or `sampleStatic`; no test that distinguishes omitted, explicit-null,
   selector, discovered-marker, and configured-getter-null sources; and no Atlas sample-state test.
3. An isolated archive build of `626540ad` completed. `verify-export-types` reported **205 targets,
   483 declarations, 111 CSS files, and 67 strict consumer imports**. Candidate emitted hashes were:
   `dist/dock.js` `44bb926903b33d1586af6cedae6a089d30700afe3186df320b3b20a034df5ee7`
   and `dist/dock.d.ts` `85e1e87e21fd62dbc5fd6ff9df8a7a826b378232a69bb35aa690a7624e75ed5f`.
4. An isolated pack dry-run contained 887 files and identified the candidate as the still-versioned
   `@mkbabb/glass-ui@7.0.0`, SHA-1 `252509099b9b6ccf616bc965ae1f0030f789cfc9`, integrity
   `sha512-n8nVY81o5CTDCiOUx8+O1xdekDQxopryuUso6CY4KKmyE//dMY/hLo5C7V80cbYSxj2CswmdMQ/6li8+aohExQ==`.
5. Pinned Atlas locks a different, already-published `@mkbabb/glass-ui@7.0.0` tarball with integrity
   `sha512-iK2DaPNbnEOkcI6deSyYZ1mCbDyHCY+IGFeKtsKb800WzApX0uL/Pq6FA9EomqCcBWWDrPSa7iydk7kg9sH2ww==`.
   Its installed `dist/dock.js` SHA-256 is
   `5780afd5aae1557583135748e1bf576a5ef3772983b2e055604b3b29cb0dcb7c` and still contains
   `channel * alpha + 255 * (1 - alpha)`. Its `dist/dock.d.ts` hash is the same
   `85e1e87e…` as the candidate because the receiver contract did not change.

The archive build is real credit. It proves buildability and import reach only. It does not prove
that Atlas installs the candidate, can express the accepted stack, or gets a sampled value.

## 1. Receiver/integration verdict matrix

| ID | Status | Independent receiver finding | Consequence |
| --- | --- | --- | --- |
| W2-I-01 | **PASS, narrow** | Exact `626540ad` builds and emits the arithmetic change through the `/dock` chunk. The package verifier and 67 strict imports pass. | Bank buildability; do not call it consumer proof. |
| W2-I-02 | **DEFECT** | Omitted `GlassDock.backgroundCanvas` is wrapped as a configured function. The function returns null, so live intent is forced and marker discovery/static fallback are unreachable. | Default Atlas-like docks deterministically report `source-unavailable`. |
| W2-I-03 | **DEFECT, additional public-contract break** | `DockProps` publicly accepts a CSS selector string, and `resolveSourceCanvas` knows how to resolve it, but `GlassDock.vue`'s wrapper accepts only a function or `HTMLCanvasElement`; a string becomes null before the resolver sees it. | A documented source form is dead at the public component boundary. |
| W2-I-04 | **DEFECT** | Explicit `null`, omitted `undefined`, and a configured getter currently returning null are collapsed by the wrapper into the same configured function. | Source intent cannot be observed or tested truthfully. |
| W2-I-05 | **DEFECT** | Atlas `Dock.vue` passes no source; Atlas Aurora has no marker; its default `renderMode` is `css`. | The real receiver is a current negative witness, not an acceptance witness. |
| W2-I-06 | **DEFECT** | Marking or plumbing Atlas's exposed canvas alone would still be wrong: on the default CSS substrate the placeholder is the visible field while the canvas is unarmed/transparent. | A marker-only redress can remain unavailable or sample the non-painted source. |
| W2-I-07 | **DEFECT / unrepresentable public path** | The packed Dock prop can carry only a canvas/getter/selector. Neither `/dock` nor Aurora exposes an already-composited sample provider or ordered placeholder/canvas/group/page descriptor. | The accepted minimum stack cannot cross the current package boundary. |
| W2-I-08 | **DEFECT** | `backdropMode="static"` mounts no observer, while default live mode forces configured-null. The composable's static reducer exists, but no real default Dock receiver can reach it. | Static/discovery/live parity is neither receiver-reachable nor proven. |
| W2-I-09 | **DEFECT / false-green oracle** | The Dock test mocks the observer and checks only call count. It never examines the option object or invokes its getter, so the exact null-manufacturing defect is asserted GREEN. | The nearest integration oracle blesses the broken seam. |
| W2-I-10 | **DEFECT / package-consumer** | Atlas installs the old registry tarball. The candidate dry-run uses the same immutable name/version with different bytes, and no Atlas lock/commit consumes it. | There is no exact shipped-artifact or downstream-consumer proof. |
| W2-I-11 | **DEFECT / evidence** | No retained manifest, probe, browser frame/video, sample-state log, palette/intensity mutation, exact candidate package identity, or Atlas repin demonstrates a successful real write. | Atmosphere/dock opacity measurements cannot substitute for the missing signal. |
| W2-I-12 | **DEFECT / process** | The commit and band explicitly defer the source-plumbing half and declare the subset GREEN; no Luna x-high implementation launch is attached. | The unified row and model/no-deferral laws remain violated. |
| W2-I-13 | **HOLD, future bytes only** | This is the second exact `626540ad` Sol x-high critic, complementary to the mechanism critic. A redress changes Glass/package/Atlas bytes. | Both present critics reject `626540ad`; neither pre-approves a future candidate. |

## 2. The public source-intent seam destroys information before sampling

The receiver contract advertises four source forms in `DockProps`:

```ts
backgroundCanvas?:
    | HTMLCanvasElement
    | (() => HTMLCanvasElement | null)
    | string
    | null;
```

Its own documentation says absence means the painted static page is stack-walked. The lower-level
resolver also has a distinct selector arm and an auto-discovery marker. `GlassDock.vue:92-109`
overwrites those distinctions with one unconditional function:

```ts
backgroundCanvas: () => {
    const bc = props.backgroundCanvas;
    return typeof bc === "function"
        ? bc()
        : bc instanceof HTMLCanvasElement
          ? bc
          : null;
}
```

The exact resulting matrix is:

| Public input | What the composable receives | Actual mode/result |
| --- | --- | --- |
| prop omitted (`undefined`) | configured function → null | live / `source-unavailable`; discovery and static bypassed |
| explicit `null` | configured function → null | same live/unavailable result, despite lower-level null being “no source” |
| getter temporarily returning null | configured function → null | live/unavailable, which is correct for this one case |
| canvas element | configured function → canvas | live canvas path |
| selector string | configured function → null | selector is discarded; live/unavailable |
| no prop + valid marker | configured function → null | marker is never queried |

This is more than an undefined/null edge. The wrapper erases a valid public selector and prevents the
lower-level resolver from determining whether it should discover, remain live through a transient
null, or reduce a static painted stack. The intent must remain discriminated until the owner that
selects mode. A configured getter returning null must remain live; an omitted source must not be
manufactured into that case. Explicit `null` needs one published meaning consistent with the
lower-level contract and a test; it cannot inherit meaning accidentally from a wrapper function.

The current Dock test is structurally unable to catch this. Its mocked `useGlassBackdropLuminance`
asserts only “called once” for live and “not called” for static. A mutation that changes the wrapper
to `backgroundCanvas: () => null` unconditionally, deletes selector support, or deletes discovery
leaves both tests GREEN. The test is therefore not neutral missing coverage; it positively certifies
the broken configuration as the default live behavior.

## 3. Pinned Atlas has no truthful source to transport

At Atlas `a040f88` the production dock mounts `GlassDock` at `Dock.vue:228-242` with posture, shape,
density, and accessibility props only. It passes no `backgroundCanvas`, provider, selector, or marker.
The current runtime chain is consequently exact:

```text
Atlas Dock omits source
  -> GlassDock manufactures configured function
  -> function resolves null
  -> wantsLiveLoop() selects live
  -> resolveSourceCanvas(function) returns null
  -> source-unavailable
  -> no --glass-backdrop-luma / sampled witness
```

Atlas Aurora does not supply an easy canvas fix. `Aurora.vue:86-95` defines `shader = false` and
therefore `renderMode = "css"` by default. The Glass Aurora component renders a palette-derived
placeholder `backgroundImage`/`backgroundColor` as the permanent CSS substrate and leaves the canvas
layer unarmed. Although the component exposes `canvasRef` to its immediate owner, Atlas exposes only
pause/resume use through its local ref; it does not route the ref across `Atmosphere` to `Dock`.
More importantly, routing it would point at a transparent non-source on the default path. The
animated sampler's alpha floor would correctly reject that readback as unavailable.

Atlas's actual ordered scene also matters. Glass Aurora applies `opacityCeiling` once around the
placeholder/canvas group. The canvas arm cross-fades over the placeholder, and Atmosphere places the
field below its page-wide paper layer and content. At minimum, the accepted G3 model requires the
page underlay, the spatial placeholder, the canvas pixel plus its presentation/cross-fade alpha, and
the outer group opacity. A lone backing canvas cannot encode that composition. If an
already-composited provider intentionally includes or excludes the paper layer, the receiver
evidence must state that boundary; a claim of “painted Atlas backdrop” cannot silently ignore a
painted layer.

Therefore these superficially plausible receiver edits are false cures:

- add `data-glass-field-canvas` to the CSS-default canvas;
- pass `auroraRef.canvasRef` directly to the dock;
- pass a selector naming that canvas;
- tune Atlas `dockOpacity` or `--glass-opacity-dock` until the plate looks acceptable;
- prove only that the observer says `live`, without proving `sampled` and a correct value.

The first three select the wrong source on the real default route. The opacity tune bypasses the
producer and violates the one-output-axis law. The mode label proves intent only, not availability or
signal correctness.

## 4. The accepted ordered signal is not representable through the packed contract

The exact candidate package builds `/dock`, but its public input remains only
`backgroundCanvas: canvas | getter | selector | null`. That form can provide raw canvas pixels. It
cannot provide:

- a resolved sample from the CSS placeholder at the dock's spatial coordinates;
- canvas CSS presentation alpha or the arm cross-fade;
- the shared Aurora outer opacity;
- an ordered page-underlay composition;
- an already-composited RGB/luma provider with provenance;
- an ordered-layer description that keeps each alpha and paint order.

Glass Aurora internally knows the placeholder image/color, config, canvas, arm state, and root
opacity. Its exposed component surface provides config, `canvasRef`, cursor controls, render/pause,
arm state, and renderer status—not a composited sample or ordered source. The lower-level sampler is
shipped as an internal declaration file but has no public package export that Atlas may consume.
Deep-file presence inside `dist` is not a supported package contract.

This means Atlas cannot satisfy I-7 by “using the existing prop correctly.” One existing Glass owner
must first add a truthful representational seam: either a consumer-provided already-composited sample
provider or an explicit ordered-layer sampler/descriptor. Then Atlas must adopt that seam at the
actual `Atmosphere`/`Dock` composition boundary. The source commit, public package, and receiver
commit are all necessary exact bytes. None exists in `626540ad`/`a040f88`.

An independent analytical fixture for the public seam should make the representation concrete. For
example, with an opaque page `[20,20,20]`, opaque placeholder `[40,100,220]`, canvas pixel
`[240,80,40]` at backing alpha `0.5` and presentation/cross-fade alpha `0.6`, and group opacity
`0.4`, the effective canvas alpha is `0.3`; the group color is `[100,94,166]`; and the final page
composition is `[52,49.6,78.4]`. A provider/ordered sampler must return that result independently of
the production helper. Treating the canvas pixel as opaque, dropping either alpha, skipping the
placeholder, or applying the group opacity only to the canvas produces a different answer and must
fail.

## 5. Static/live parity is not a real Dock path today

There are three different things currently called static:

1. `GlassDock backdropMode="static"` does not mount the observer at all and uses the solid material
   posture.
2. `useGlassBackdropLuminance` can choose its `sampleStatic()` reducer when no live intent or marker
   exists.
3. Atlas's default Aurora uses a **CSS** render substrate, but its dock remains a default **live**
   dock.

The real receiver needs case 3 to obtain a truthful sample of the spatial placeholder over its page.
Current wiring instead forces live canvas intent and becomes unavailable. The passing Dock test
proves only case 1's observer absence. The new sampler tests call `sampleAnimated()` directly with
synthetic inputs. No test establishes that the same painted field is reduced equivalently when
represented by the CSS/static provider and by the armed canvas/live provider.

Reduced motion does not rescue the path. Parking the rAF loop does not change source intent; the
initial/default sample still targets the unavailable configured source. Parity acceptance must cover
ordinary motion and PRM, CSS-default and armed shader routes, and late canvas availability without
remounting. “Both modes have functions” is not parity.

## 6. Package and consumer evidence are absent despite a valid build

The isolated exact archive proves `626540ad` is capable of emitting its changed math in
`dist/dock.js`. It also reveals why that is not a ship proof:

- Atlas's lockfile selects the npm registry tarball, not the Glass source checkout.
- The locked tarball's emitted JS still has the original literal-white arithmetic.
- The source candidate and registry artifact both claim `7.0.0` but have different integrities.
- A published npm version is immutable; a later consumer cannot repin “7.0.0” to different bytes.
- No new package version/integrity, packed-tar consumer fixture, Atlas lock update, or Atlas candidate
  commit exists.
- The identical candidate/installed `dock.d.ts` hash confirms that no new representational provider
  crosses the package boundary.

The package verifier checks that declared targets and types import. It does not mount the emitted
component, distinguish source intent, or prove an Atlas write. A correct close needs two forms of
consumer evidence:

1. an isolated installed-package fixture that imports `/dock`, mounts the emitted component, and
   runs the source-intent/ordered-provider matrix without source aliases; and
2. the real Atlas candidate locked to that exact immutable artifact, exercising both its CSS-default
   and shader-capable paths.

The real proof must retain exact package version/integrity, Glass and Atlas commits/trees, clean
status or dirty digest, probe source, browser/OS/engine versions, route/viewport/theme/PRM matrix,
sample-state and value logs, and frames/video. A screenshot of acceptable tint without a sampled
witness is favorable appearance, not composited-signal evidence.

## 7. Exact born-RED acceptance and mutation suite

These arms belong in existing Glass package/Dock/sampler owners plus the real Atlas consumer owner.
They do not authorize a new wave, consumer opacity shim, second attenuation register, or synthetic
Atlas replacement.

| Arm | Born-RED fixture at current bytes | Independent GREEN oracle | Mutations that must RED |
| --- | --- | --- | --- |
| **A — omitted source** | Mount the exact packed `GlassDock` with live default, no source, no marker. Spy the observer option: current bytes have an own `backgroundCanvas` function returning null and report live/unavailable. | The option preserves omission; discovery runs; without a live source the defined static/provider path samples rather than manufacturing live intent. | Restore the unconditional wrapper; add `() => null`; force `live: true`; bypass static/discovery. |
| **B — configured late getter** | Mount with a getter returning null, then make it return a canvas/provider without remount. | It remains live and initially reports source-unavailable, then samples on a later tick from the same configured source. | Coalesce configured-null to static; capture the initial null by value; stop re-resolving. |
| **C — selector transport** | Mount with `backgroundCanvas: "#g3-source"` pointing at a known canvas. Current wrapper discards the string. | The packed component forwards the selector intact and resolves exactly that canvas; invalid selector remains explicit unavailable. | Delete the selector arm; wrap it into null; fall back to a favorable marker. |
| **D — explicit null** | Mount with explicit null and compare with omitted and configured-getter-null cases. Current wrapper makes all three the same configured function. | Freeze and document the explicit-null meaning at the public boundary; it must never become a configured getter accidentally, and configured getter-null remains distinguishable. | Collapse null/undefined/configured-null into one function; change meaning without contract/test. |
| **E — discovery/static parity** | No prop plus a valid marker currently cannot discover; no prop plus no marker cannot reach the composable static reducer. | Marker present selects the declared live source. Marker absent samples the static/provider representation. For the same deterministic painted stack, live and static luma/hue agree within a pinned tolerance in ordinary motion and PRM. | Remove marker lookup; restore null wrapping; make transparent body black in only one mode; park PRM before its one truthful sample. |
| **F — ordered composition** | Deterministic page/placeholder/canvas/presentation/group fixture from §4. Current public contract cannot express it. | Fixed independent expected RGB `[52,49.6,78.4]` and derived luma, without calling production `compositeOver`. A swapped-order fixture yields a distinct pinned value. | Drop backing alpha; drop presentation alpha; ignore placeholder; apply group opacity to only one child; swap order; select first half-opaque color. |
| **G — spatial placeholder** | Two dock positions over a deterministic two-region gradient/image. Current stack walk reads only `backgroundColor`. | Provider/ordered sampler returns the independently expected value at each dock rect and changes when the gradient is mutated. | Replace image with fallback color; sample one global mean; omit coordinates; redirect to transparent canvas. |
| **H — real Atlas CSS default** | Pinned Atlas production mount: `shader=false`, no source/marker, visible placeholder, transparent canvas. Current state is unavailable. | On a repinned exact Atlas candidate, the actual `/sci` or named production route reports sampled state from the visible CSS field; palette/intensity/theme/position mutations change the value in the expected direction; PRM preserves state/value truth. | Remove Atlas declaration; pass/mark the transparent canvas; hardcode a favorable sample; substitute a synthetic dock/Aurora mount. |
| **I — real Atlas shader path** | Opt-in shader/canvas route with placeholder-to-canvas arm and outer opacity. | Before arm, during deterministic settle, and after arm, the provider represents the visible composite without a discontinuous source swap; late canvas availability needs no remount. | Ignore arm cross-fade; sample backing canvas as fully opaque; drop outer opacity; favorable-delay capture until only one layer remains. |
| **J — one output axis** | Current governance already rejects Atlas dock-opacity retune as proof. | Layer changes alter the existing `--glass-backdrop-luma`/ambient input and existing luma→tint result; consumer dock opacity remains fixed by its independent atmosphere contract. | Add/retune `--glass-opacity-dock`, a second attenuation variable, or a fixed consumer color to mask the bad signal. |
| **K — packed consumer** | Atlas lock points at old integrity and old white-loop JS. | Unique immutable Glass version/tar integrity; isolated pack consumer passes A–G; Atlas lock points to the same integrity; emitted `/dock` contains the accepted implementation and public provider type. | Reuse mutable/same version; consume source alias/workspace instead of tar; leave lock on old bytes; test only importability. |
| **L — oracle independence** | Fixed-white test compares a production-derived value to itself; sample expectations reuse production helper; Dock test checks call count only. | Closed-form numeric fixtures and option-shape assertions are literal independent expectations. Deliberate mutations in A–K each produce a failing test/evidence arm. | Compute expected through production helper; accept mere inequality; label a tautology born-RED; inspect mode without state/value. |
| **M — retained receiver evidence** | No replayable Atlas G3 artifact exists for `626540ad`. | Manifest pins commits/trees, package integrity, probe hash, route, field mode, palette/intensity, sample states/values, browser/OS, viewport/theme/PRM, frames/video, and mutation results. | Omit raw probe/log; cite atmosphere↔dock opacity; use HMR/source alias; recapture only a favorable end state. |
| **N — process/no deferral** | Commit/band call the partial arm GREEN and route source intent out of scope; implementation launch lacks Luna x-high declaration. | One bounded Luna x-high redress lands the complete unified Glass/package/Atlas contract, truths status without history rewrite, and receives two fresh exact-byte Sol x-high critics. | Defer any mandatory half; keep W2/G3 GREEN before receiver proof; relabel historical model provenance; reuse these pre-redress critics as close. |

## 8. Smallest integrated redress

1. **Keep the useful arithmetic leaf.** Preserve the literal-white removal and one independently
   tested source-over primitive if it survives the full ordered model.
2. **Repair the public Dock source-intent boundary.** Forward canvas, getter, and selector without
   erasing their form; omit the option when the prop is absent; freeze explicit-null semantics; keep
   configured getter-null live and re-resolvable.
3. **Add one representational seam in the existing sampler/Dock owner.** Accept either an
   already-composited spatial provider or an explicit ordered-layer description capable of page,
   placeholder, canvas backing/presentation/cross-fade, and group opacity. Do not mint a second
   output opacity axis.
4. **Make CSS/static and armed/live representations agree.** Use independent numeric oracles and
   cover discovery, absent source, late source, CSS default, shader arm, and PRM.
5. **Publish exact bytes under a new immutable artifact identity.** Build, verify, pack, and run the
   emitted-package consumer matrix. Source aliases and the already-published `7.0.0` tarball cannot
   be the proof.
6. **Land the real Atlas declaration/adoption.** Bind the provider at the actual
   `Atmosphere`/`Dock` composition, not the transparent default canvas, and repin the lockfile to the
   exact package integrity.
7. **Retain real evidence and true the ledger.** Prove actual sampled writes and mutation bites on
   current Safari and Chromium as applicable, retain the raw corpus, withdraw the partial GREEN/no-
   scope claim in a subsequent commit, declare Luna x-high for the bounded implementation, and run
   two new Sol x-high critics on all amended exact bytes.

## 9. Candidate-2 freeze ruling

**BLOCK candidate-2 W2/G3 acceptance at
`626540adbe10fd84f47b8365977925a7fbd2e17a`.** The commit earns narrow arithmetic and isolated-build
credit only. It is not a receiver-integrated composited signal.

The exact default component still destroys source intent and public selector transport. The real
Atlas route supplies no source and paints a CSS placeholder while its canvas is transparent. The
packed API cannot represent the accepted ordered stack. Static/live parity is not receiver-reachable.
The tests certify call counts and production-derived arithmetic rather than the integration seam.
Atlas installs different old `7.0.0` bytes, and no immutable candidate package, receiver repin,
sample log, or replayable visual corpus exists. The band/commit's mandatory-half deferral and missing
implementation-seat declaration independently prevent close.

Together with the companion exact-byte mechanism critic, this is the required second independent Sol
x-high rejection of `626540ad`. Preserve the commit in honest history; do not count it as W2 GREEN,
G3 produced, real Atlas source proof, package-consumer proof, or candidate-2 freeze input. Any
Glass/package/Atlas redress changes the candidate and owes its own two fresh Sol x-high critics.
