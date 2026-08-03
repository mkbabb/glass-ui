# MATERIAL W4 TRACK-DRY — cross-package contract critic (candidate 2)

**Critic:** independent Sol x-high, cross-package contract / installed-artifact lane  
**Observed:** 2026-07-22T02:20:57-0400 through 2026-07-22T02:26:51-0400  
**Scope:** formation-only review; no product, test, evidence, workflow, or consumer-repository edits  
**Verdict:** **DEFECT — bank the DRY source direction, reject W4 closure; package and paint acceptance remain RED**

The source factoring is intelligible and useful: Slider and Progress now compose one recessed-well
recipe and one mark-paint recipe. That mechanical result is not the release contract. The exact bundle
silently removes two externally consumed CSS properties, renames the emitted mark DOM, introduces an
unnecessarily generic inheriting property and global class family, breaks the exported component-only
stylesheet entry, leaves first-party package consumers on the retired property, and offers no browser
paint proof. The 32 green tests establish value normalization and class/attribute emission only. They
cannot establish the claimed direct-dot-to-pseudo pixel identity.

Two historical workflow critics returned zero material findings because their closure was repository-
local. The full package census falsifies that closure. W4 is therefore a **banked partial source
candidate**, not DONE, not GREEN, and not freeze-eligible.

---

## 1. Exact candidate identity and moving-tree fence

### 1.1 Original moving bundle, pinned before the workflow commit

At `2026-07-22T02:20:57-0400`:

- Glass HEAD: `7de2ece1b9ed7b4512db1c2e4432699167ba1c1b`
- branch: `master`
- repository status: 98 modified/untracked paths
- combined `git status --short` + HEAD SHA-256:
  `359dbf9415a0330758d3ef97bbfd80a8a3fd8ce55b864822c200546a3fc1dc6c`
- selected eleven-file W4 content-manifest SHA-256:
  `8dedd0e497dd41d9f50bc83dd565082fb800eb1dda7b5038b211302c0d620925`
- selected tracked-plus-untracked W4 patch SHA-256:
  `03bd7e31d6b7d0d75c68c16f0f69302909ff0d2ebbaa0e11afaf4d02d464d2b5`

The selected files and bytes were:

| Path | SHA-256 |
|---|---|
| `src/components/slider/Slider.vue` | `85b254b8f8cd3f6a080ebe2f1f659719753d5f64ed1df5d9f9b052a8283ca75a` |
| `src/components/progress/Progress.vue` | `c58e5ba32df0c6a4bcc2aedec837898e017f0076c79ba09c6fe44feb1be3bad9` |
| `src/styles/glass.css` | `1cf7e9c4da819a3d8bb8b7db2baaceb01c784c565777b2112768a521e4a574b4` |
| `src/styles/glass/track-well.css` | `0dc542962a2dac1008cdf942ee2605c01f54b3ef8728e531e113a31ca3c6bd31` |
| `src/styles/glass/value-marks.css` | `336775f46b097051067868641ce6dd7ece4f29dbdfc5de42abf89207a2677464` |
| `tests/components/ui/progress/Progress.test.ts` | `4516e5c61594da58b593982659c4c9889fd86489acde66c536f135a0f007a654` |
| `tests/components/ui/slider/Slider.marks.test.ts` | `7b86ea996329384b5ad2a6b26ed02a42fbd11ef9fe5cc0f69a20c5c7212c6021` |
| `tests/styles/track-well-fold.test.ts` | `fc086e6d68565e4bdca6b02a0653e77a7c9facf77ad7a3c4a41a09a28685c46d` |
| `demo/stories/forms/slider.vue` | `a10a5ef0de9d7857f773434c3336b33b57c245e2e374c7bceb7117f0122e403b` |
| `demo/stories/substrates/aurora/OklchStopRow.vue` | `85007d76f520ab02d885449dcb6fa59e043047fdd15648103a7df7828517caa5` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `bae62db562bbd81d67a0d7d98d8c30d2575dba62572f55d559a901cb6458a093` |

### 1.2 Later workflow commit — same bytes, not a silent rebase

While this critic was running, the historical workflow committed the bundle as:

- commit: `f9b9d16eed092e65b5aee7959141adad8e787ae9`
- timestamp: `2026-07-22T02:21:35-04:00`
- subject: `refactor(track): land BJ MATERIAL W4 — DRY the slider/progress track-well + value-marks`
- parent-to-commit binary-diff SHA-256:
  `50ec4ad8ef1356002523cedaf23b134334b778a4f5498a64665238b372dac919`
- committed footprint: the same eleven paths, `293` insertions / `122` deletions
- selected content-manifest SHA-256 after commit:
  `8dedd0e497dd41d9f50bc83dd565082fb800eb1dda7b5038b211302c0d620925`

The identical content-manifest proves that this report reviews the pinned moving bytes, while also
applying exactly to `f9b9d16e`. At `2026-07-22T02:26:51-0400`, HEAD remained `f9b9d16e`; unrelated
shared-tree work left 87 modified/untracked paths and the combined status+HEAD digest had moved to
`424a7927dcc58cbfccf37624222fd26e8a3af5a84df340dbefd28c6fff3a9e0c`.
No conclusion here credits or rebases over those unrelated moving bytes.

### 1.3 Reproduction of the pin

```sh
files=(
  demo/stories/forms/slider.vue
  demo/stories/substrates/aurora/OklchStopRow.vue
  docs/tranches/BJ/waves/BAND-MATERIAL.md
  src/components/progress/Progress.vue
  src/components/slider/Slider.vue
  src/styles/glass.css
  src/styles/glass/track-well.css
  src/styles/glass/value-marks.css
  tests/components/ui/progress/Progress.test.ts
  tests/components/ui/slider/Slider.marks.test.ts
  tests/styles/track-well-fold.test.ts
)
for f in $files; do shasum -a 256 "$f"; done | LC_ALL=C sort | shasum -a 256
```

The initial patch digest was produced before the commit from the tracked diff plus three `/dev/null`
diffs for the then-untracked files. The committed diff digest is independently reproducible:

```sh
git diff --binary \
  7de2ece1b9ed7b4512db1c2e4432699167ba1c1b..\
  f9b9d16eed092e65b5aee7959141adad8e787ae9 | shasum -a 256
```

---

## 2. Cross-package census, with exact receiver pins

The workflow's `src/ demo/ dist/` search was not a package-consumer census.

| Repository | HEAD / state pin | Live W4 receiver truth |
|---|---|---|
| Glass | `f9b9d16e`; shared tree dirty | two local writers migrated; package still declares `7.0.0` |
| value.js | `c654824e0b252cda7f8490b67f182a48c48cc0ed`; status digest `98776c7f08368281d5cf1f675201efb4cf675fd221297b00111bae5b2601375c` | four clean live components still write `--slider-track-bg`; package declares `@mkbabb/glass-ui:^7.0.0` and installs `7.0.0` |
| keyframes.js | `a59d3a22da080a8ed224e8d675112bb3bb0135b0`; dirty status digest `58ae708cfbb5443b8fabd3de406859d9e71ec765d0cc9695d114d6b97d42acbb` | dirty `PlaybackRibbon.vue` still writes `--slider-track-bg`; source imports Glass, package declares no Glass dependency; `npm ls` reports Glass 7 extraneous |
| live SCI | `895c3757357bf4a8037aa7814d23e3f22cbc7b9e`; dirty status digest `37bace49dac9425101797b089e8b8a00a9a0c8e5cad7953ed0eb14e8612ece4c` | no old/new track-property writer found; consumes Glass 7 transitively through dashboards |
| live Atlas | clean `f23554ccabdb6ab1c7763715920e27ca93c31c0f`; empty-status digest `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `PercentileRangeSlider.vue` consumes Slider without a local track property; it is a default-paint regression receiver, not a migration writer |

### 2.1 Exact live Slider writers omitted by the workflow

| Consumer | SHA-256 | Meaning of the retired property |
|---|---|---|
| value.js `demo/picker/controls/ComponentSliders/ComponentSliders.vue` | `a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327` | perceptual ramp; alpha row stacks the ramp over `--alpha-checker` |
| value.js `demo/scenes/ConfigSliderPane.vue` | `e4ae64e6a5b1e30082cde67d7313cdc7be2da01b0357aab62b517933d8d58b2d` | ancestor-fed certified contrast ink for the whole config-console slider population |
| value.js `demo/workbenches/extract/ExtractControls.vue` | `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` | transparent K rail above a gradient underlay plus a contrast-certified kC rail |
| value.js `demo/workbenches/generate/GenerateControls.vue` | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` | transparent count rail above a gradient underlay |
| keyframes `demo/components/playback/PlaybackRibbon.vue` | `509f7596453e2ea5b64b92d24ec345f63cdd40bbd2bfa8f93a907edbd3a7ce39` | neutral timeline groove keyed to `--color-slider-track` |

Atlas's no-override Slider receiver is
`src/filter/ui/PercentileRangeSlider.vue`, SHA-256
`fcafd73d13ee6ae374a65e2b01d82c69c9b44d8bb86f8bb1cb087e1bb345da8a`.

The failure is not cosmetic fallback variance:

- the alpha picker loses its checkerboard-composited ramp;
- the two underlay-backed sliders stop being transparent and cover their gradients;
- the certified muted/contrast tracks fall back to the Glass default;
- PlaybackRibbon loses its product-specific neutral groove;
- a source-only `grep` can remain green while every installed v7 consumer is wrong.

### 2.2 Dependency truth

At the pin:

```text
value.js     npm ls @mkbabb/glass-ui --depth=0 -> @mkbabb/glass-ui@7.0.0
Atlas        npm ls @mkbabb/glass-ui --depth=0 -> @mkbabb/glass-ui@7.0.0
keyframes.js npm ls @mkbabb/glass-ui --depth=0 -> @mkbabb/glass-ui@7.0.0 extraneous
```

Keyframes' dirty package cut removes its prior optional Glass dependency while its demo still imports
`Button`, `Slider`, `useTouchGate`, and Tooltip family members from Glass. Because the Glass imports are
demo/build inputs rather than keyframes-library runtime inputs, the honest minimum is a declared and
locked development dependency compatible with the candidate being tested. An extraneous local install
is not a release fixture.

### 2.3 Reproducible census commands

```sh
for repo in \
  /Users/mkbabb/Programming/glass-ui \
  /Users/mkbabb/Programming/value.js \
  /Users/mkbabb/Programming/keyframes.js \
  /Users/mkbabb/Programming/.p-totality/sci \
  /Users/mkbabb/Programming/.p-totality/atlas; do
  rg -n --hidden \
    --glob '!node_modules/**' --glob '!dist/**' --glob '!coverage/**' \
    -- '(--slider-track-bg|--progress-track|--track-bg|slider-mark|progress-value-mark|value-marks|value-mark)' \
    "$repo"
done

(cd /Users/mkbabb/Programming/value.js && npm ls @mkbabb/glass-ui --depth=0)
(cd /Users/mkbabb/Programming/keyframes.js && npm ls @mkbabb/glass-ui --depth=0)
(cd /Users/mkbabb/Programming/.p-totality/atlas && npm ls @mkbabb/glass-ui --depth=0)
```

---

## 3. Material findings

### F1 — P0: the clean break is not co-landed; live package consumers render the wrong track

`Slider.vue` no longer reads `--slider-track-bg`; `Progress.vue` no longer reads
`--progress-track`. Only the two Glass demo source files were migrated. The five external live writers
above were neither migrated nor made release-blocking fixtures. No v7-to-v8 consumer test exists.

This directly contradicts the commit body's “retired-knob grep = 0” closure: that statement is true only
inside the searched repository slice. It is false for the product family.

**Disposition:** retain the no-alias major-version direction, but keep W4 RED until all consumer-owned
migrations and installed-package proofs co-land. Do not put an alias back into v8 merely to hide the
missed census, and do not mutate an already-published 7.0.0 artifact.

### F2 — P0: W4 breaks the exported component-only CSS entry

This is a concrete package regression independent of the old-property migration.

`package.json` exports:

```json
"./styles": "./dist/styles/index.css",
"./styles.css": "./dist/glass-ui.css"
```

The source canon explicitly calls `./styles.css` the “transparent SFC-only entry ... for a
cascade-free consumer.” Before W4, the required Slider and Progress well/mark rules lived in their SFCs
and therefore shipped inside `dist/glass-ui.css`. After W4:

- the SFC markup emits `.glass-track-well`, `.value-marks`, and `.value-mark`;
- `dist/glass-ui.css` contains **zero** definitions of those selectors;
- the definitions exist only in `dist/styles/glass/{track-well,value-marks}.css`, reachable through the
  full `@mkbabb/glass-ui/styles` cascade;
- a consumer importing the supported component-only `@mkbabb/glass-ui/styles.css` entry receives the
  Slider/Progress scoped size/fill rules but not the required position, overflow, pill radius,
  background, mark positioning, or mark pseudo paint.

The full `/styles` order is coherent: `glass.css` precedes the unlayered SFC bundle. That does not rescue
the separately exported component-only entry.

Current built-byte witnesses:

| File | SHA-256 |
|---|---|
| `dist/glass-ui.css` | `ec99e5dd1ee66bf85d1c9bdc7564596abcda323d048b3b5eb55d039588deae92` |
| `dist/styles/index.css` | `c64e1d3e0c62066664d5e1bc2a13cc27c1be44736393d3c40a8fef5359a902b9` |
| `dist/styles/glass.css` | `7396f5a5d2f182d6e071bc2819ef746d2709ce7494835826e860e12aaa03a4d8` |
| `dist/styles/glass/track-well.css` | `99d2e589ee365230f284ed5e654b1379f38eded7c540e44db76bb3f7c28cab0c` |
| `dist/styles/glass/value-marks.css` | `939314583aa6290bc4da951b59965f13ac6884e10c0bbfd7c695d33f50b58aca` |

**Disposition:** v8 must preserve an honest component-only entry. A bounded shape is a generated
component stylesheet that imports the two shared structural partials and the SFC bundle, while the full
`/styles` entry retains its complete cascade. The exact assembly can vary, but both public style entries
must be installed-package fixtures and each must render Slider/Progress deliberately, not accidentally.

### F3 — P1: `--track-bg` is generic, inheriting, and has no defensible public owner

The five-repository source census found no unrelated live declaration of `--track-bg` today. That is not
a namespace or ownership proof. CSS custom properties inherit, and Slider's documented customization
pattern deliberately sets the property on the `<Slider>` root or an ancestor so it can reach the nested
track. `ConfigSliderPane.vue` already demonstrates population-level ancestor writing. A generic
`--track-bg` set for an unrelated timeline, chart, native range skin, or local component will silently
retint every descendant Glass Slider.

The fold needs one shared name, not one globally ambiguous name. The bounded replacement is
`--glass-track-well-bg` (or an equivalently Glass-owned, role-specific name selected by Sol). It keeps
the one-register intent while making inheritance deliberate and searchable. No second color axis is
needed.

The same namespace problem exists in the new global `.value-marks` / `.value-mark` selectors. No current
first-party collision was found, but these selectors target generic class names in consumer DOM. Since
the wave is already making a major-version DOM clean break, use a Glass-owned class family such as
`.glass-value-marks` / `.glass-value-mark`, or an equally collision-resistant data-slot contract.

### F4 — P1: public CSS and DOM removals have no v8 ledger or immutable package identity

The exact W4 commit changes the public/observable surface:

- remove `--slider-track-bg`;
- remove `--progress-track`;
- add the shared track-well background property;
- remove `.slider-marks` / `.slider-mark`;
- remove `.progress-value-marks` / `.progress-value-mark`;
- add the shared well and mark class family;
- change the required style-entry closure.

Yet `package.json` and `package-lock.json` remain version `7.0.0` (current hashes
`39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb` and
`e6216e2188ea7d08fff572745be168dbf368df3d30baa10c2caa837bc817581f`).
`DESIGN.md:1117-1122` still teaches `--slider-track-bg`; `MIGRATION.md:130-135` still teaches
`--progress-track`. There is no 8.0 removal/addition ledger and no installed old-to-new fixture.

The mutable-version problem is observable locally: value.js/Atlas and keyframes all report Glass
`7.0.0`, but their installed `dist/glass-ui.css` hashes differ
(`cb2b5092…` versus `263721c3…`). A version label is therefore not sufficient artifact identity.

**Disposition:** W4 is blocked on one unique immutable v8 package candidate, exact tar/directory digest,
updated DESIGN/MIGRATION/export canon, installed v7-before / v8-after fixtures, and exact consumer lock
repins. DOM classes may be documented as unsupported implementation hooks, but their removal still
belongs in the major migration truth because emitted DOM and existing selector probes change.

### F5 — P1: 32 green tests do not prove direct-dot-to-pseudo paint parity

The targeted test run is reproducibly green:

```text
Test Files  3 passed (3)
Tests       32 passed (32)
```

Command:

```sh
npm exec vitest run -- \
  tests/styles/track-well-fold.test.ts \
  tests/components/ui/slider/Slider.marks.test.ts \
  tests/components/ui/progress/Progress.test.ts
```

The assertions prove:

- computed value fractions are emitted as inline percentages;
- the new classes exist;
- Slider forwards `data-orientation` and `data-inverted`;
- Progress/Slider ARIA and value behavior remain mounted.

They do **not** load and evaluate browser layout for the shared CSS, inspect pseudo-elements, compare
old/new pixels, or prove:

- horizontal LTR/RTL centering;
- horizontal inverted and RTL+inverted centering;
- vertical and vertical-inverted centering;
- Progress's old direct-sized dot versus the new zero-line `::before` dot;
- clipping at the pill edges;
- z-order and overlap with the value fill;
- spectrum gradient/checkerboard/transparent treatments;
- focus, drag-mid, settle, disabled, indeterminate, or error paint;
- reduced-motion parity;
- the `/styles.css` installed entry.

Selector-renaming the old tests was sufficient to make them green. For example, moving
`.value-mark::before` from `left:50%; top:50%` to `left:40%; top:40%`, deleting the vertical inverted
leg, or removing the shared CSS import leaves these mount assertions green while visibly moving or
removing every dot.

The analytic zero-thickness-line construction is plausible. The tranche explicitly requires
pixel-identical Safari + Chromium evidence; plausibility is not that evidence.

### F6 — P1: the internal critics' zero-finding closure is falsified by their search boundary

The workflow journal records:

- build seat `a1743e5ed3fa520f3`;
- correctness critic `a296a05ea42c87657`, zero material findings;
- scope/parsimony critic `a31988a2b2fcfcebe`, zero material findings;
- closer `ab0997ea52497ef0c`, GREEN / zero material findings.

The scope critic explicitly says `grep` found zero collisions and no outside consumer, while the closer
credits a retired-knob search of `src/+demo/`. Those statements omit the four value.js writer files,
the keyframes writer, the extraneous dependency, the component-only style export, and the old public
docs. The critics did correctly keep LIVE-π open; the closer nonetheless marked the wave closed.

This is exactly why the research → harden → addenda discipline requires a package graph, not a local
source grep. Their reports remain historical evidence; they do not override this wider census.

### F7 — acceptance has no Browser paint witness

The current tool roster exposes the Node REPL bridge but no in-app Browser control tool. No supported
Browser page was attached to this critic, so no interactive webpage or Safari/Chromium visual result is
claimed here. The workflow commit itself records LIVE-π as deferred.

Therefore this report awards **zero visual acceptance credit**. It relies on exact source, package,
installed-byte, and test evidence to keep the row RED. Browser availability must be restored for the
real dual-engine rest/interaction/mid/settle capture; a standalone substitute must not be relabeled as
the requested Browser witness.

---

## 4. Born-RED mutation battery required before W4 can close

Each mutation must independently turn the replacement gate RED. Several survive the current 32-test
battery.

1. **Unmigrated v7 writer.** Install the v8 candidate over a fixture that still writes
   `--slider-track-bg`; its gradient/checker/transparent assertion must fail. After the documented
   migration it must pass.
2. **Progress old writer.** A fixture setting `--progress-track` must fail under v8, and its migrated
   shared-name form must pass for determinate and indeterminate Progress.
3. **Generic inheritance collision.** Wrap a default Slider in an unrelated ancestor declaring
   `--track-bg: hotpink`. The final namespaced implementation must ignore it. Restoring the generic name
   must repaint the Slider and turn the detector RED.
4. **Component-only style entry.** Import only `@mkbabb/glass-ui/styles.css`. Removing the shared
   well/mark closure must produce missing background/overflow/radius/pseudo paint and RED the fixture.
5. **Full style entry order.** Import only `@mkbabb/glass-ui/styles`; swap the shared partials after an
   incompatible override or omit either partial. Computed paint and the package-order detector must RED.
6. **Pseudo centering.** Change `left/top:50%` or delete `translate(-50%,-50%)`. Current units remain
   green; pixel/computed-geometry proof must RED in both axes.
7. **RTL.** Restore an incorrect transform sign or swap logical start/end. Horizontal Slider and
   Progress RTL must RED independently.
8. **Inversion.** Delete horizontal or vertical `[data-inverted]` legs. Both mutations must RED without
   relying on the emitted data-attribute assertion.
9. **Clipping/fill overlap.** Raise mark diameter at the first/last interior marks, change fill z-order,
   or remove pill overflow. The dot center, visible area, and intended fill-over-dot relationship must
   RED when changed.
10. **DOM namespace.** Reintroduce generic `.value-mark` and place an unrelated consumer element with
    that class beside a Slider. Any Glass paint leakage must RED.
11. **Old v8 surface resurrection.** Restore either retired property or any retired mark class in v8
    source/dist. The clean-break gate must RED even if the new classes also remain.
12. **Missing dependency.** Remove Glass from the keyframes development manifest/lock while retaining
    its demo imports. `npm ls` / clean-install / demo-build must RED; an extraneous install is failure.
13. **Artifact mutation.** Change candidate bytes without changing the package identity/digest. The
    immutable-package fixture and all consumer lock witnesses must RED.
14. **PRM and interaction.** Restore a motionful transition under PRM or move a mark between rest,
    drag-mid, and settle. The route capture must RED even though the value percentage is unchanged.

---

## 5. Bounded Luna x-high redress

This is a bounded correction to the landed fold, not permission for a redesign.

1. **Keep the two-register architecture.** Retain one track well and one marks mechanic; do not merge
   Slider and Progress behavior or touch fraction drivers.
2. **Rename the public track property collision-resistently.** Sol's recommended shape is
   `--glass-track-well-bg`; choose an equivalently specific name only with an explicit ruling. Remove
   generic `--track-bg`.
3. **Namespace the global marks selectors.** Use `.glass-value-marks` / `.glass-value-mark` or a
   collision-resistant data-slot equivalent. Keep component-specific `.slider-track` and
   `.progress-rail` hooks only where they still own component sizing/state.
4. **Repair both package style entries.** Preserve a component-only CSS export that contains every
   structural selector on which the emitted Slider/Progress DOM depends. Prove both `./styles` and
   `./styles.css` from an installed package, including exact definition order.
5. **Publish the major clean break once.** Update package/version/lock, DESIGN, MIGRATION, exports canon,
   CSS-property removal/addition ledger, and DOM-class change ledger under one unique immutable v8
   artifact. No aliases and no mutable 7.0.0 credit.
6. **Coordinate consumer-owned migrations.** Glass owns its demos and package contract. value.js owns
   its four source writers, executable probes, lock, and ramp/checker/transparent/contrast pixels.
   keyframes owns PlaybackRibbon plus an honest Glass development dependency and lock. SCI/Atlas own
   installed repins and default-Slider regression proof. Do not make Glass write those repositories from
   this formation lane.
7. **Add executable contract gates.** Cover old/new property and class census, both style entries,
   installed v7-to-v8 migration, dependency truth, and every mutation in §4.
8. **Capture the actual paint matrix.** At minimum: Slider standard + spectrum and Progress determinate
   + indeterminate; horizontal/vertical; LTR/RTL; inverted where supported; rest/focus/drag-mid/settle;
   marks before/inside/after fill; 390 + 1440; PRM; current Chromium + Safari. Preserve the warm Glass
   language and do not use the DRY wave to smuggle in a new brightness, radius, or track-height design.
9. **Append an exact receipt.** Commit/tree/model/status, selected patch and file manifest, package tar
   digest, installed artifact digest, consumer pins, commands, screenshots, and routed remainder.

The expected redress is small in product code. Most of the work is contract truth and evidence that the
historical closer prematurely omitted.

---

## 6. Required fresh Sol x-high critics after Luna redress

Two fresh critics must inspect the final exact bytes; neither may reuse this report as acceptance.

### Critic A — package/API/cross-repository contract

Must pin the unique v8 tar/directory digest and independently verify:

- both retired properties and all retired DOM classes are absent from v8 source and dist;
- the selected shared names are collision-resistant and documented;
- both style exports are complete for their stated contract and have correct order;
- value.js, keyframes, SCI, and Atlas manifests/locks install the exact artifact intended;
- every live value.js/keyframes writer migrated without flattening gradient, checkerboard,
  transparency, contrast ink, or timeline color;
- keyframes has no extraneous Glass dependency;
- the v7-before/v8-after fixture and all clean-break/dependency mutations bite.

### Critic B — material/pixel/interaction parity

Must independently run the dual-engine matrix and compare the old installed v7 artifact to the final v8
artifact. It must measure dot centers and visible bounds, not merely inspect class names. It must cover
horizontal/vertical/RTL/inverted mark geometry, clipping, fill z-order, spectrum/alpha composition,
focus/drag/settle, indeterminate Progress, PRM, and both public style entries. Every deliberate visual
difference is a separate ruled delta; W4 itself remains pixel-parity.

After both reports, a third Sol adjudication may mark the row accepted or return a narrower redress.
Until then, `f9b9d16e` is a useful source commit with a **release-blocking cross-package contract defect**.

---

## 7. Compact adjudication

| Question | Ruling |
|---|---|
| Is the Slider/Progress DRY extraction direction sound? | **Yes; bank it.** |
| Did the commit preserve the public package contract? | **No.** |
| Are `--slider-track-bg` and `--progress-track` safely removed today? | **No; live writers and docs remain.** |
| Is generic `--track-bg` accepted? | **No; use a Glass-owned track-well name.** |
| Are generic `.value-mark(s)` selectors accepted? | **No; namespace the shared global paint hook.** |
| Does `@mkbabb/glass-ui/styles.css` remain complete for emitted component DOM? | **No; it omits both new shared partials.** |
| Do 32 unit tests prove pixel parity? | **No; they prove DOM/value plumbing only.** |
| Is Browser/Safari/Chromium π complete? | **No; zero acceptance credit.** |
| May W4 be called GREEN/DONE/frozen? | **No. Banked partial source candidate, acceptance RED.** |

