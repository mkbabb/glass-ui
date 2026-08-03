# MATERIAL W4 TRACK-DRY — third-pass binding adjudication (candidate 2)

**Seat:** third independent Sol x-high adjudicator, reconciling the cross-package and
geometry/cascade/visual critics
**Date:** 2026-07-22 (America/New_York)
**Scope:** formation-only; one new report; no product, test, retained-evidence, workflow,
existing-formation, or consumer-repository edit
**Authority:** exact Glass commit `f9b9d16eed092e65b5aee7959141adad8e787ae9`
**Binding verdict:** **DEFECT — BANK THE TWO-REGISTER STRUCTURAL FOLD; REJECT THESE BYTES AS A
PUBLIC, INSTALLED, VISUAL, OR FREEZE CLOSE; MATERIAL W4 REMAINS RED**

This adjudication accepts the shared track-well and shared value-mark mechanics, not the public
contract chosen by the commit. The final v8 contract is now ruled rather than left as an option:

- keep `@mkbabb/glass-ui/styles.css` as a supported **component-only** entry and make it complete for
  the W4 structural dependencies; no removal, narrowing, or silent “SFC-only but incomplete” meaning;
- retain `.glass-track-well`, rename the generic mark family exactly to
  `.glass-value-marks` / `.glass-value-mark`, and emit no generic `.value-mark*` selectors;
- remove the candidate-only generic `--track-bg` entirely;
- replace the two retired public inputs with two Glass-owned, component-typed v8 inputs:
  `--glass-slider-track-background` for Slider's CSS `background` grammar and
  `--glass-progress-track-color` for Progress's CSS `<color>` grammar;
- do not mint a third shared background custom property, a track-height axis, a Progress inversion
  axis, a compatibility alias, or a second mark primitive; and
- publish and install one immutable `8.0.0` artifact, migrate the exact Glass/value.js/keyframes
  writers, repin SCI and Atlas, prove the real geometry/cascade/pixel matrix, append the receipt, and
  obtain two fresh exact-byte Sol x-high critics.

The current commit is useful source history. Its `32/32` units prove value-domain and emitted-DOM
plumbing only. They do not rescue the broken public CSS entry, the wrong property grammar, the global
selector collision, the missing consumer migration, or the absent Browser evidence.

---

## 0. Authority, critic receipts, and moving-tree fence

### 0.1 Exact adjudicated object

| Field | Exact identity |
| --- | --- |
| commit | `f9b9d16eed092e65b5aee7959141adad8e787ae9` |
| tree | `227a3625cbde0115255a7c1b3bc71a3bc8b175c3` |
| parent | `7de2ece1b9ed7b4512db1c2e4432699167ba1c1b` |
| authored / committed | `2026-07-22T02:21:35-04:00` |
| subject | `refactor(track): land BJ MATERIAL W4 — DRY the slider/progress track-well + value-marks` |
| parent-to-commit binary diff SHA-256 | `50ec4ad8ef1356002523cedaf23b134334b778a4f5498a64665238b372dac919` |
| selected eleven-file content-manifest SHA-256 | `8dedd0e497dd41d9f50bc83dd565082fb800eb1dda7b5038b211302c0d620925` |

The selected manifest was independently reproduced from `git show f9b9d16e:<path>` bytes, sorted by
path, and contains exactly the eleven commit paths. No later checkout byte is adjudicated as W4.

| Exact W4 path | SHA-256 | Third-pass ruling |
| --- | --- | --- |
| `src/components/slider/Slider.vue` | `85b254b8f8cd3f6a080ebe2f1f659719753d5f64ed1df5d9f9b052a8283ca75a` | bank composition and axis forwarding; reject generic mark classes and every `--track-bg` read |
| `src/components/progress/Progress.vue` | `c58e5ba32df0c6a4bcc2aedec837898e017f0076c79ba09c6fe44feb1be3bad9` | bank composition/value behavior; reject generic classes, masked inheritance, and color/background type overload |
| `src/styles/glass.css` | `1cf7e9c4da819a3d8bb8b7db2baaceb01c784c565777b2112768a521e4a574b4` | bank the two import rungs for canonical `/styles`; it does not close `/styles.css` |
| `src/styles/glass/track-well.css` | `0dc542962a2dac1008cdf942ee2605c01f54b3ef8728e531e113a31ca3c6bd31` | bank `position` / clip / pill structure; reject the “ONE colour knob” and `--track-bg` declaration |
| `src/styles/glass/value-marks.css` | `336775f46b097051067868641ce6dd7ece4f29dbdfc5de42abf89207a2677464` | bank the zero-line geometry subject to live proof; reject generic selectors and unproved pixel-identity prose |
| `tests/components/ui/progress/Progress.test.ts` | `4516e5c61594da58b593982659c4c9889fd86489acde66c536f135a0f007a654` | bank numeric/ARIA/lifecycle assertions; reject as CSS, vertical-geometry, or pixel proof |
| `tests/components/ui/slider/Slider.marks.test.ts` | `7b86ea996329384b5ad2a6b26ed02a42fbd11ef9fe5cc0f69a20c5c7212c6021` | bank mark-domain and thumb behavior; reject selector renaming as paint proof |
| `tests/styles/track-well-fold.test.ts` | `fc086e6d68565e4bdca6b02a0653e77a7c9facf77ad7a3c4a41a09a28685c46d` | bank two-register composition intent; reject its paint-parity comment and insufficient closure predicate |
| `demo/stories/forms/slider.vue` | `a10a5ef0de9d7857f773434c3336b33b57c245e2e374c7bceb7117f0122e403b` | preserve the gradient value exactly; reject the `--track-bg` writer |
| `demo/stories/substrates/aurora/OklchStopRow.vue` | `85007d76f520ab02d885449dcb6fa59e043047fdd15648103a7df7828517caa5` | preserve all three OKLCh gradients exactly; reject the `--track-bg` writers |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `bae62db562bbd81d67a0d7d98d8c30d2575dba62572f55d559a901cb6458a093` | retain as historical workflow prose; reject “LANDED,” generic-one-knob, and pixel-identical closure claims |

“Bank” above is deliberately narrow. A selector or property rename means the enclosing file cannot be
accepted byte-for-byte. The banked object is the stated mechanic or unchanged right-hand paint value,
not a license to freeze the full SHA.

### 0.2 Exact reports reconciled

| Critic | SHA-256 | Disposition |
| --- | --- | --- |
| `W4-TRACK-CROSS-PACKAGE-CRIT-C2.md` | `94a3bc890ca0103176f9a2399adba25d4b16f3303a77368affc08269dbbc6569` | findings retained; its one-shared-property recommendation is narrowed by the type ruling below |
| `W4-TRACK-GEOMETRY-VISUAL-CRIT-C2.md` | `e8fb2a68f8b849072ccf92c89ed58342b2be1361a1ed8f6dc8444b45e814471d` | findings retained; its export either/or is resolved here in favor of complete retention |

Both reports independently prove the `/styles.css` defect, generic-selector defect, generic-property
defect, stale public docs, mutable `7.0.0`, missing live paint, and unit-proof overclaim. The apparent
disagreements are now closed:

1. **Export:** preserve and complete `./styles.css`; do not remove or narrow it.
2. **Property:** do not use one shared public property because Slider and Progress have incompatible
   value grammars; use the two exact typed names in §3.
3. **Selectors:** use the exact Glass-owned class family in §2, not a generic class or a new data-slot
   axis.

### 0.3 Descendant checkout is fenced, not silently rebased

At the inspection fence (`2026-07-22T02:43:25-04:00`):

| Moving witness | Value |
| --- | --- |
| descendant HEAD | `abf46592642fdf04f4210865a61914db8bb58b9f` |
| descendant tree | `af39714c2fb999d6d8514fca7a7c29d2ba50bb39` |
| descendant commit time | `2026-07-22T02:33:32-04:00` |
| `f9b9d16e` is ancestor | yes |
| sorted porcelain-v1 `-uall` SHA-256 | `11df7c4e035fff103f2d04cce128d45174401a1c55b2e95234fa93678387faa6` |
| unstaged binary-diff SHA-256 | `b4bdc82a8fbe2593ae2becf971147c0464bc25cb82fe11aad93fe5c34a4b7e6f` |
| staged binary-diff SHA-256 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| sorted untracked-path manifest SHA-256 | `5596217a95044c0cd41f55b746c96b84787a10865f5761ec6ee02195127ca778` |

The staged-diff value is the SHA-256 of an empty stream. This report will also record its final close
fence in the handoff digest; any later HEAD or worktree motion remains outside the adjudicated object.

No existing dirty or untracked path is adopted, normalized, or credited by this report.

---

## 1. Binding disposition of the landed mechanics

### 1.1 Banked structural result

The following result survives Luna redress:

- one `.glass-track-well` structural register owns `position: relative`, `overflow: hidden`, and
  `border-radius: var(--radius-pill)`;
- one shared mark register owns the zero-thickness line plus centered `::before` dot mechanic;
- Slider and Progress compose both registers without merging their value drivers, sizing, fill,
  interaction, or lifecycle behavior;
- Slider forwards vertical and inverted state to the mark layer; Progress forwards vertical state;
- `resolveValueMarks`, `--value-mark-position`, `--value-mark-size`, and `--value-mark-color` remain the
  one value/paint vocabulary;
- `glass.css` imports both shared partials adjacent to `liquid-fill.css`; and
- ContinuousRail/ScrubberTimeline remain routed to `BJ.W-REDUCE-TIMELINE`. W4 neither adopts them nor
  invents a third consumer to justify itself.

The ideal ordinary-`horizontal-tb` center equations are also banked as a source derivation, not pixel
acceptance. Slider horizontal normal/RTL/inverted/RTL+inverted and vertical normal/inverted, plus
Progress horizontal LTR/RTL and vertical LTR/RTL, resolve to the same intended centers as the parent.
That algebra does not waive generated-box, fractional rounding, WebKit, clipping, or raster proof.

### 1.2 Rejected exact result

The following bytes or claims must not survive into v8:

- `.value-marks` and `.value-mark` as global selectors;
- `--track-bg` in source, built CSS, runtime DOM style, docs, demos, fixtures, or consumers;
- one background variable serving both Slider gradients and Progress `color-mix()` operands;
- `.progress-rail { --track-bg: ... }`, which masks an inherited consumer override;
- the claim that `32/32` units establish mark pixels, Progress vertical geometry, or CSS-export
  closure;
- the claim that `dist/styles/glass/{track-well,value-marks}.css` being packed makes
  `dist/glass-ui.css` complete;
- current DESIGN/MIGRATION instructions using retired names;
- current synthetic `tests-visual/on-glass-fg.spec.ts` use of `--progress-track` in place of a real
  installed Progress receiver;
- any release/freeze credit for bytes still identified as `@mkbabb/glass-ui@7.0.0`; and
- “LIVE-π deferred” as a close condition. Pixel parity is terminal for this refactor.

The commit itself remains in history. Redress follows it; history is not rewritten.

---

## 2. Binding DOM and selector contract

### 2.1 Final emitted selector family

The final exact shared hooks are:

| Role | Final selector | Ruling |
| --- | --- | --- |
| recessed structural well | `.glass-track-well` | retained |
| decorative mark layer | `.glass-value-marks` | selected replacement |
| decorative mark | `.glass-value-mark` | selected replacement |
| Slider owner hook | `.slider-track` | retained for Slider sizing/state/background |
| Progress owner hook | `.progress-rail` | retained for Progress sizing/state/background |

Use classes, not a new `data-glass-slot` or arbitrary public slot axis. The existing mark-layer data
attributes are sufficient:

- `data-orientation="vertical"` only when vertical;
- `data-inverted="true"` only on Slider's inverted mark layer; and
- no Progress `data-inverted`, because Progress has no inverted API.

### 2.2 v7-to-v8 DOM ledger

The 8.0 migration ledger must state all of the following even if component DOM classes are documented
as unsupported implementation hooks:

| Classification | Exact DOM surface |
| --- | --- |
| removed from Slider | `.slider-marks`, `.slider-mark` |
| removed from Progress | `.progress-value-marks`, `.progress-value-mark` |
| rejected candidate-only; absent from v8 | `.value-marks`, `.value-mark` |
| added to both wells | `.glass-track-well` |
| added mark family | `.glass-value-marks`, `.glass-value-mark` |
| added layer state | vertical `data-orientation`; Slider-only truthy `data-inverted` |
| retained owner hooks | `.glass-slider`, `.slider-track`, `.slider-range`, `.progress-rail`, `.progress-value-fill` |

No old class remains as an alias. No comma group includes old and new selectors. A source/dist census
may find retired strings only inside the 8.0 migration ledger, historical tranche evidence, and
negative fixtures; it must find zero live selectors or emitted classes.

---

## 3. Binding typed custom-property contract

### 3.1 Generic `--track-bg` is rejected absolutely

`--track-bg` must be absent from final source, dist, public docs, first-party live writers, and all four
consumer trees. It is collision-prone because it inherits, and it is semantically incoherent because a
Slider background image is not a Progress color. It is not retained as a private bridge and it is not
renamed to a single public `--glass-track-well-bg`.

The shared `.glass-track-well` register may keep a muted fallback declaration, but customization stays
with the component owner. A direct future track-well consumer can author its own `background`; W4 does
not mint a shared public paint axis for a hypothetical Timeline.

### 3.2 Exact v8 public properties

| Component | Exact public property | Accepted grammar | Default and consumption |
| --- | --- | --- | --- |
| Slider | `--glass-slider-track-background` | a valid CSS `background` value, including color, `transparent`, a gradient, or comma-layered gradient/checkerboard | standard falls back to `--muted-medium`; spectrum falls back to `--secondary`; consumed by `.slider-track` |
| Progress | `--glass-progress-track-color` | a valid CSS `<color>` only | falls back to `--progress-track-on-glass`; consumed for determinate rail background and every indeterminate `color-mix()` stop |

Both properties intentionally inherit so a wrapper can style a component population. The namespace
limits that inheritance to the matching Glass component family. An inline/component-root declaration
wins normally; an ancestor declaration must reach the descendant consumption point.

Progress must not assign `--glass-progress-track-color` on `.progress-rail`. It reads
`var(--glass-progress-track-color, var(--progress-track-on-glass))` wherever the resolved color is
needed. That preserves inherited customization and keeps the warm channel as a fallback rather than a
mask. Slider likewise reads its public property; no internal `--glass-track-well-*` bridge is added.

The smallest source shape is therefore component-owned background consumption over shared structure:

```css
@layer components {
    .glass-track-well {
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-pill);
        background: var(--muted-medium);
    }
}

.slider-track {
    background: var(--glass-slider-track-background, var(--muted-medium));
}

.glass-slider[data-variant="spectrum"] .slider-track {
    background: var(--glass-slider-track-background, var(--secondary));
}

.progress-rail {
    background: var(--glass-progress-track-color, var(--progress-track-on-glass));
}
```

The indeterminate rules repeat the same Progress fallback at their `color-mix()` inputs; they do not
read the Slider property or a background-typed intermediary. This necessary semantic split is not
forbidden duplication. It is two typed public inputs driving one shared structural primitive.

### 3.3 v8 CSS-property ledger

| Classification | Exact property surface |
| --- | --- |
| removed at 8.0 | `--slider-track-bg`, `--progress-track` |
| rejected candidate-only; never published as v8 API | `--track-bg` |
| added at 8.0 | `--glass-slider-track-background`, `--glass-progress-track-color` |
| retained | `--progress-track-on-glass`, `--progress-fill`, `--progress-size`, `--progress-vertical-size` |
| retained | `--slider-track-height`, `--slider-thumb-*`, `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow` |
| retained | `--value-mark-position`, `--value-mark-size`, `--value-mark-color` |

No v7 alias is permitted. The migration guide gives one-line substitutions but also states the type
split: old Slider writers move to the background property; old Progress writers move to the color
property. A mutation placing a gradient into the Progress property must fail the first-party
writer/type census instead of being accepted because `background` happens to accept it in one state.

---

## 4. Binding public CSS export and package ledger

### 4.1 `./styles.css` is retained and completed

Removal or narrowing would add a new public break unrelated to the DRY fold and contradict the exact
canon that exposes a cascade-free component entry. The chosen contract is:

| Export key | Final target | Meaning |
| --- | --- | --- |
| `./styles` | `./dist/styles/index.css` | complete token/global/component cascade; unchanged key and target |
| `./styles.css` | `./dist/component-styles.css` | component-only entry: W4 required shared structure followed by the raw SFC bundle |
| `./slider` | existing `types` + `./dist/slider.js` | unchanged JS/type export |
| `./progress` | existing `types` + `./dist/progress.js` | unchanged JS/type export |

`dist/component-styles.css` is a generated packed manifest with this exact order:

```css
@import "./styles/glass/track-well.css";
@import "./styles/glass/value-marks.css";
@import "./glass-ui.css";
```

The canonical `/styles` build continues to reach both partials through `styles/glass.css` and folds
the raw `../glass-ui.css` SFC bundle once. It does **not** import the new component manifest, so the
full cascade has no duplicate W4 definition. The component-only export imports each required W4
partial once before the unlayered SFC rules. A consumer must not need both public style entries.

The rejected f9 pack already proves that canonical `/styles` is structurally complete:
`dist/styles/index.css` SHA-256
`c64e1d3e0c62066664d5e1bc2a13cc27c1be44736393d3c40a8fef5359a902b9` imports
`dist/styles/glass.css` SHA-256
`7396f5a5d2f182d6e071bc2819ef746d2709ce7494835826e860e12aaa03a4d8`, which imports the packed
track-well SHA-256 `99d2e589ee365230f284ed5e654b1379f38eded7c540e44db76bb3f7c28cab0c`
and value-marks SHA-256 `939314583aa6290bc4da951b59965f13ac6884e10c0bbfd7c695d33f50b58aca`.
Only `./styles.css -> dist/glass-ui.css` SHA-256
`ec99e5dd1ee66bf85d1c9bdc7564596abcda323d048b3b5eb55d039588deae92` has zero definitions for
those emitted shared classes. Therefore the binding repair is confined to the alternate entry and
its generation/verification ledger; it must not perturb canonical `/styles` order.

`scripts/lib/subpath-policy.mjs`, `package.json`, build generation, package verification, the export
canon, DESIGN, and MIGRATION must agree on this target and meaning. The current target
`./dist/glass-ui.css` is rejected because it contains zero definitions for the classes emitted by the
W4 Slider and Progress render functions.

### 4.2 Installed-entry acceptance

An isolated consumer must install the actual candidate tarball and run two separate builds:

1. import only `@mkbabb/glass-ui/styles`; mount production Slider and Progress; and
2. import only `@mkbabb/glass-ui/styles.css`; provide the documented component variables; mount the
   same production receivers.

Each build proves selector definition count/order, computed position/overflow/radius/background,
mark `::before` paint, component scoped sizing/fill, and no duplicate W4 rules. Reading source paths or
the local `dist/` without installation earns no package credit.

### 4.3 Unique package identity

The exact dry-run witness for the rejected bytes was still `@mkbabb/glass-ui@7.0.0`, package shasum
`8c7d8222b9c6f6ba8d72e357dcd7720aaf057c77`, integrity
`sha512-hKxxotod7jr/ill4bOVIYUOg4OX432ozV4pLL5gMxcEPP1/AFnfrwqK/qzBE7n9mihNoRxDi52FItITD0uMCYA==`.
That identity is not reusable.

Acceptance requires one real `@mkbabb/glass-ui@8.0.0` tarball. The receipt records:

- archive filename and SHA-256;
- npm `shasum` and `integrity`;
- unpacked sorted path/content manifest SHA-256;
- package/version/lock SHA-256;
- both public CSS target bytes and every imported W4 partial SHA-256; and
- the exact installed directory manifest in every fixture and consumer.

Changing any candidate byte changes the artifact digest and invalidates every consumer proof and
critic. A local directory, dry-run metadata, mutable `7.0.0`, registry version label alone, or
different bytes behind the same lock receives zero credit.

---

## 5. Binding cross-repository migration and repin

The consumer work lands in each owning repository. This formation lane and the Glass Luna builder do
not edit those repositories.

### 5.1 Glass-owned writers and canon

Migrate the exact Glass writers to `--glass-slider-track-background` while preserving their complete
right-hand values:

- `demo/stories/forms/slider.vue` — one three-color gradient;
- `demo/stories/substrates/aurora/OklchStopRow.vue` — L, C, and h OKLCh gradients.

Update DESIGN with the two typed properties and inheritance rules. Add the complete 8.0 property,
DOM, and export tables from §§2–4 to MIGRATION/current canon. Update the real Progress visual fixture;
the synthetic `on-glass-fg` div may remain only as token arithmetic evidence and must use the current
Progress color contract if retained. Historical tranche prose may keep old strings as archaeology.

### 5.2 value.js — exact four source receivers

Authority pin: `c654824e0b252cda7f8490b67f182a48c48cc0ed`.

| Exact file | Pinned SHA-256 | Required preservation |
| --- | --- | --- |
| `demo/picker/controls/ComponentSliders/ComponentSliders.vue` | `a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327` | perceptual ramp; alpha remains `${ramp}, var(--alpha-checker)` rather than a flattened color |
| `demo/scenes/ConfigSliderPane.vue` | `e4ae64e6a5b1e30082cde67d7313cdc7be2da01b0357aab62b517933d8d58b2d` | ancestor-fed certified `--ink-muted` population override still inherits into every Slider |
| `demo/workbenches/extract/ExtractControls.vue` | `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` | transparent K rail continues to expose its gradient underlay; kC retains contrast-certified `trackInk` |
| `demo/workbenches/generate/GenerateControls.vue` | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` | transparent count rail continues to expose its gradient underlay |

Every live writer changes only the property name unless its owner separately rules a visual change.
value.js installs the exact 8.0 artifact, pins the resolved integrity in its lock, builds from a clean
install, and captures these four receivers. A source migration tested against an old installed v7
package is failure.

### 5.3 keyframes.js — PlaybackRibbon and dependency truth

Authority commit: `a59d3a22da080a8ed224e8d675112bb3bb0135b0`; exact inspected dirty
`demo/components/playback/PlaybackRibbon.vue` SHA-256
`509f7596453e2ea5b64b92d24ec345f63cdd40bbd2bfa8f93a907edbd3a7ce39`.

PlaybackRibbon migrates its neutral
`color-mix(in srgb, var(--color-slider-track) 22%, transparent)` writer to
`--glass-slider-track-background` without changing the value, track height, range tint, or motion
color. Because its demo imports `Button`, `Slider`, `useTouchGate`, and Tooltip family members from
Glass, keyframes adds the exact candidate as a development dependency and lock entry. `npm ls
@mkbabb/glass-ui --depth=0` must be non-extraneous after a clean install, and the demo build must use
the receipted artifact. A transitive or ambient local install is not dependency proof.

### 5.4 SCI and Atlas — exact repins, default-paint receivers

SCI authority pin: `895c3757357bf4a8037aa7814d23e3f22cbc7b9e`. It has no old/new property writer and
no live Progress receiver, but `dashboards/package.json` directly pins Glass and five live default
Slider receivers exist:

- DemandFilter: `filter-fy-slider`;
- EcfFilter: `filter-cost-slider` and `filter-peradm-slider`;
- SciFilter: `filter-enroll-slider`; and
- UsfFilter: `filter-pop-slider`.

SCI repins the exact Glass artifact in its dashboard manifest and root lock, clean-installs, builds,
and proves those default receivers. Its actual style chain is
`dashboards/main.ts -> @mkbabb/atlas/styles -> Atlas src/design/index.css -> @mkbabb/glass-ui/styles`;
that canonical-entry chain is required evidence and cannot substitute for the separate installed
`/styles.css` fixture. Its transitive Atlas edge must resolve to a package whose Glass peer accepts
the same exact major; duplicated or mismatched Glass installations fail.

Atlas authority pin: `f23554ccabdb6ab1c7763715920e27ca93c31c0f`. Exact pin bytes are used even
though the adjudication checkout later showed unrelated dirt in `src/charts/frame/VizPlate.vue`,
`src/filter/ui/FilterPanel.vue`, and `src/filter/ui/UnifiedFilterPanel.vue`. Its sixth default Slider
family, `dim-dial-slider`, is rendered by `src/filter/ui/PercentileRangeSlider.vue`, which has SHA-256
`fcafd73d13ee6ae374a65e2b01d82c69c9b44d8bb86f8bb1cb087e1bb345da8a` and deliberately writes no
track property. Atlas updates its Glass peer range to v8, exact development pin, and lock integrity;
then its immutable package and SCI's consuming lock must resolve the same Glass artifact. The
PercentileRangeSlider range, marks (when supplied by a fixture), focus, RTL, and default groove are
the regression witness.

### 5.5 Current installed-byte evidence is rejection evidence only

At adjudication, value.js, SCI, and Atlas installed v7 `dist/glass-ui.css` SHA-256
`cb2b509214ad8b3a2f1c0f4f6fc1a72428225726eec1f50c6a47d468ec706e66` and
`dist/styles/index.css` SHA-256
`ac8343a8ae47ccdedad3dca602033e6f8b2ac406281f8399587e1f197a0cfe29`. Keyframes reported the same
version but different bytes: `dist/glass-ui.css`
`263721c318202e3f81470f388332a15b7ee6fa9440de0d9edfd5da6fa02500b1` and
`dist/styles/index.css` `2eba6d1dbff8fcb1eaf70f7de1f431b327f00b0f82943c6ab5d4aaf2b1923071`.
Those installed artifacts are older registry v7 bytes and are non-probative for f9 pixels or final
v8 acceptance. Their divergence is rejection evidence only: it proves why version labels and local
source greps cannot close this row.

---

## 6. Real geometry, cascade, interaction, and pixel matrix

### 6.1 Fixture and environment pins

Use the parent v7 installed artifact and the final v8 tarball in otherwise identical isolated apps.
Mount production Slider and Progress, not synthetic divs. For every retained CSS export, run:

- current stable Chromium and current Safari/WebKit on macOS;
- 390×844 and 1440×900 viewports;
- light and dark;
- DPR 1 and 2;
- normal motion and `prefers-reduced-motion: reduce`; and
- Windows Chromium `forced-colors: active` for the terminal forced-color arm. Safari forced-colors is
  N/A and must be recorded as such, not silently skipped or emulated under another name.

In addition to natural real-route geometry, the lab uses a `257.5px` horizontal rail and a `193.5px`
vertical rail with marks at 25%, 33.3%, 50%, and 75%. Add near-edge interior marks at 0.5% and 99.5%
for clipping. These fractional dimensions run at both DPRs to expose rounding-stage differences.

### 6.2 Required component postures

| Receiver | Required posture/state cells |
| --- | --- |
| Slider standard | single and range; horizontal LTR, RTL, inverted, RTL+inverted; vertical in LTR/RTL containers, normal and inverted; sm/md/lg; rest, hover, focus-visible, pointer onset, drag-mid, release settle, disabled, invalid |
| Slider spectrum | the Glass gradients plus all four value.js receiver families; horizontal and vertical; LTR/RTL/inverted where supported; rest, hover, focus, drag-mid, settle; transparent underlay and checkerboard composition |
| Progress determinate | default/gradient/liquid; 0, 25, 33.3, 40, 50, 75, 100%; horizontal LTR/RTL and vertical LTR/RTL; default/error and loading/progressing/complete states |
| Progress indeterminate | horizontal and vertical; LTR/RTL containers; default and custom valid track color; normal motion and PRM static frame |
| cascade sentinels | unrelated `.value-marks`/`.value-mark`; unrelated ancestor `--track-bg: hotpink`; approved direct and ancestor Slider background; approved direct and ancestor Progress color; nested Slider/Progress populations |
| package entries | installed `/styles` only and installed `/styles.css` only, separately |

There is no Progress inverted cell because no such public axis exists. Adding one to satisfy a matrix
would be scope growth and fails parsimony.

### 6.3 Geometry and paint predicates

For a rail of physical CSS size `W × H`, fraction `p`, and dot diameter `s`, record the rail rect,
mark line rect, `::before` computed style, and raster alpha bounds. Expected centers in ordinary
`horizontal-tb` are:

| Posture | Expected physical center |
| --- | --- |
| horizontal LTR / RTL+inverted Slider, horizontal LTR Progress | `(pW, H/2)` |
| horizontal RTL / LTR-inverted Slider, horizontal RTL Progress | `(W-pW, H/2)` |
| vertical normal Slider/Progress | `(W/2, H-pH)` |
| vertical inverted Slider | `(W/2, pH)` |

Direction and inversion must also share the value origin with the fill. Each measured center must be
within `0.5` **device pixel** of its equation and within `0.5` device pixel of the parent artifact.
Painted dot bounds must retain the parent width/height and clipping side. Outside the one-device-pixel
antialias fringe, no pixel may differ. Within that fringe, only pixels whose parent or candidate alpha
is strictly between transparent and opaque may differ; any hard-core color change, moved bound, or
more than four differing fringe pixels per dot at DPR1 / eight at DPR2 is RED. A needed tolerance
change is a separate Sol ruling, never a harness edit made after seeing the result.

At determinate value 40%, marks at 25% and 33.3% remain under the fill while 50% and 75% remain ahead
of it, matching the parent. Near-edge dots clip to the same visible alpha mask at the pill. Removing
overflow, radius, the fill's z-order, or the pseudo transform must visibly and geometrically fail.

The full component crop must also preserve track height, radius, background, fill, focus/invalid ring,
spectrum thumb/range stack, and surrounding layout. W4 authorizes no brightness, hue, height, radius,
or motion retune. Any non-antialias visual delta is a separately named defect or separately ruled
change, not “close enough” DRY parity.

### 6.4 Cascade/type predicates

- `--track-bg: hotpink` on an unrelated ancestor changes neither component.
- ordinary `.value-mark` and `.value-marks` sentinels retain normal flow and paint no pseudo-dot.
- `--glass-slider-track-background` works directly and by ancestor inheritance for colors,
  transparent underlays, gradients, and comma-layered checkerboard composition.
- `--glass-progress-track-color` works directly and by ancestor inheritance in determinate and
  indeterminate states. No component-local declaration masks it.
- a first-party Progress writer with a gradient is rejected by the typed writer census; the
  indeterminate declaration may never silently become invalid.
- each public style entry supplies exactly one W4 structural definition and produces the same
  geometry/paint after its documented prerequisite variables are present.

### 6.5 PRM and forced-colors ruling

Under PRM, Slider marks remain fixed through onset/mid/settle, Slider loses smear/overshoot according
to its existing contract, determinate Progress has no fill transition, and indeterminate Progress
shows its one informative static frame. State/value/ARIA stay identical.

Marks are `aria-hidden` decorative paint. Under forced colors they may be suppressed by the platform
or an explicit terminal rule without failing semantics, but the behavior must be consistent between
v7 and v8 and between the two public CSS entries. The track/fill distinction, current value, invalid
state, and Slider focus indicator must remain perceivable in system colors. If marks remain painted,
their centers and clipping still obey §6.3. Hiding the marks cannot hide the fill, focus, or entire
track. This explicit ruling avoids inventing a new semantic mark channel merely for forced colors.

---

## 7. Born-RED and mutation-proof gate battery

The replacement gates first run against the `f9b9d16e` candidate or an equivalent isolated fixture
and show the present defects RED. After Luna repair, each mutation below is applied independently and
must turn its owning detector RED while the unmutated candidate is GREEN.

1. **Component-only closure:** import only `/styles.css`; current missing well/mark definitions RED.
   After repair, delete either manifest import and geometry/mark paint RED.
2. **Full-cascade closure/order:** omit either partial from `/styles`, duplicate it, or move SFC rules
   before shared structure; definition/order detector RED.
3. **Generic property collision:** restore `--track-bg` and wrap Slider in
   `--track-bg:hotpink`; sentinel repaint RED.
4. **Typed split:** route both components through one property or feed a gradient to the Progress
   color arm; writer/type and indeterminate computed-background detectors RED.
5. **Progress inheritance:** restore a local assignment of the public Progress color; ancestor
   customization detector RED.
6. **Generic DOM collision:** restore `.value-mark*`; unrelated ordinary DOM is positioned/painted and
   sentinel detector RED.
7. **Old surface resurrection:** restore either retired property read, any old emitted mark class, or
   an unledgered old writer outside a historical/negative fixture; v8 clean-break census RED.
8. **Value.js migration:** leave any of the four writers old, flatten alpha checker/ramp, replace a
   transparent underlay with a fallback, or lose certified `trackInk`; its installed receiver RED.
9. **PlaybackRibbon dependency:** remove Glass from keyframes dev manifest/lock or restore the old
   writer; clean install / `npm ls` / demo build / paint RED.
10. **SCI/Atlas repin:** resolve old/different Glass bytes, a duplicate major, or a lock integrity not
    equal to the receipt; installed-artifact gate RED.
11. **Pseudo centering:** change `left` or `top` from 50%, remove one `translate(-50%)`, or shift by
    1 CSS/device pixel; geometry and pixel gates RED in each engine/DPR.
12. **RTL:** replace logical inline placement with physical `left`, or restore the old wrong transform
    sign; horizontal Slider and Progress RTL RED independently.
13. **Slider inversion:** remove horizontal or vertical `data-inverted` forwarding/selector;
    mark-versus-fill origin RED. No Progress inversion mutation is invented.
14. **Progress vertical:** remove mark-layer `data-orientation`, change block-end to block-start, or
    leave the unit assertion at node-count only; production vertical geometry RED.
15. **Clipping/stack:** remove `overflow:hidden`, pill radius, or Progress fill `z-index`; near-edge and
    fill-over-mark masks RED.
16. **Fractional/DPR:** round 33.3% to an integer, use an even-only rail, or skip DPR2/Safari;
    manifest completeness or measured-center detector RED.
17. **PRM:** restore a sweep/transition or move marks between rest and settle; PRM state detector RED.
18. **Forced colors:** suppress the whole track/fill/focus structure, or omit the Windows Chromium
    arm without an explicit N/A reason; accessibility matrix RED.
19. **Artifact mutation:** change any packed byte while retaining artifact identity or a consumer lock;
    archive/directory digest gate RED.
20. **False proof posture:** replace production components with synthetic divs, run only JSDOM, omit
    either CSS entry, or cite source equations as pixels; evidence-schema gate RED.

Cheap contract/census/export/dependency predicates belong in standing tests. Engine pixels and
cross-repository captures may remain retained evidence, but their harness and manifests must be
replayable and their mutations must bite.

---

## 8. Bounded Luna x-high redress

Luna is authorized only for the following mechanical cut after this Sol ruling:

1. keep the two register files and `.glass-track-well` structural composition;
2. rename the shared mark selectors and emitted classes exactly to
   `.glass-value-marks` / `.glass-value-mark`;
3. remove `--track-bg`; add the two exact typed properties and component-owned consumption from §3;
4. preserve `--progress-track-on-glass` as the Progress fallback and preserve all fill, size, thumb,
   value, motion, focus, invalid, status, and orientation behavior;
5. generate `dist/component-styles.css`, repoint `./styles.css`, and add installed fixtures for both
   public style entries;
6. add the gates and production Browser fixture for §§6–7;
7. update version/lock, DESIGN, MIGRATION, export canon/policy, current visual fixture, and the exact
   8.0 property/DOM/export ledgers;
8. coordinate—but do not perform from Glass—the value.js, keyframes, Atlas, and SCI owner commits and
   exact locks; and
9. append the complete receipt before critics launch.

The redress may be split into reviewable mechanical commits, but W4/package/freeze acceptance is
atomic across Glass, artifact, consumers, evidence, and critics. No compatibility alias, private
consumer selector, second background bridge, shared height, Progress inversion, Timeline adoption,
material retune, test-only shim, downstream patch, or history rewrite is authorized.

---

## 9. Receipt and fresh exact-byte critics

### 9.1 Required implementation receipt

Append to the existing Claude/Luna implementation receipt rather than creating a competing workflow
ledger. Record:

- declared Luna x-high model/seat, timestamps, repository/branch;
- every Glass commit/tree/parent and sorted changed-path manifest;
- pre/post status, unstaged/staged/untracked digests without adopting unrelated work;
- per-file SHA-256, ordered binary patch SHA-256, and exact routed remainder;
- version/package/lock/export-map and generated component-manifest bytes;
- real tarball SHA-256, npm shasum/integrity, unpacked manifest, and installed directory digest;
- Node/npm/Vite/Vue/Vitest, OS, Chromium, Safari/WebKit, and DPR identities;
- exact commands and full results for typecheck, units, build, package verification, clean installs,
  both CSS-entry fixtures, and every mutation;
- value.js/keyframes/Atlas/SCI commit, manifest, lock, installed-integrity, clean/dirty, and receiver
  pins;
- capture route, component props, CSS entry, viewport, theme, direction, orientation, inversion,
  value/marks, PRM/forced-colors mode, readiness hook, image/video SHA, geometry JSON SHA, thresholds,
  and per-cell result; and
- the two final critic paths and SHA-256 values.

No arbitrary sleep, scratch image, missing file, conclusion-only JSON, source-only grep, `npm pack
--dry-run`, or self-authored commit prose substitutes for retained evidence.

### 9.2 Two fresh Sol x-high critics

After the receipt is complete and all consumer locks point at the same immutable tarball, launch two
fresh critics against the **same exact final bytes**:

1. **Package/API/cross-repository critic:** independently verifies the property/DOM/export ledger,
   both installed CSS entries and order, absence of old/generic surfaces, tar/directory identity,
   exact value.js x4 migration, keyframes PlaybackRibbon + declared dependency, SCI/Atlas repins, and
   all contract/dependency mutations.
2. **Geometry/material/cascade critic:** independently reruns the complete §6 matrix in Chromium and
   Safari, including Progress vertical, Slider RTL/inverted, Progress RTL, fractional rails, DPR1/2,
   clipping/fill overlap, direct-dot-to-pseudo parity, real consumer paint, PRM, forced colors, and all
   geometry/pixel mutations.

Neither report may reuse either pre-redress critic as acceptance, omit its exact manifest/tar digest,
or inspect different bytes. Any material finding keeps W4 RED and routes only the smallest bounded
Luna correction; any normative or candidate-byte change invalidates both reports and restarts them.

---

## 10. Compact binding verdict

| Question | Binding answer |
| --- | --- |
| Is the two-register DRY direction retained? | **Yes.** |
| Are the exact `f9b9d16e` bytes accepted? | **No; banked partial source only.** |
| Is generic `--track-bg` allowed publicly or privately? | **No. Remove it completely.** |
| Is one shared background property allowed? | **No. Slider background and Progress color are different grammars.** |
| What are the exact public replacements? | `--glass-slider-track-background`; `--glass-progress-track-color`. |
| What are the exact shared mark selectors? | `.glass-value-marks`; `.glass-value-mark`. |
| Is `./styles.css` removed or narrowed? | **No. Retain it and make it component-complete through `dist/component-styles.css`.** |
| Does `32/32` prove pixels or Progress vertical? | **No. DOM/value evidence only.** |
| Does the current `7.0.0` pack/install receive credit? | **No. Rejected mutable identity.** |
| Must value.js x4 and PlaybackRibbon migrate? | **Yes, in their owning repositories, against the exact v8 artifact.** |
| Must SCI and Atlas repin even without old writers? | **Yes; they are default-paint installed receivers.** |
| Is real Chromium/Safari/DPR/PRM/forced-colors evidence terminal? | **Yes.** |
| Can W4 be called DONE/GREEN/frozen now? | **No. MATERIAL W4 remains RED.** |

The row may close only when the bounded Luna redress, unique installed v8 artifact, exact consumer
migrations/repins, mutation-proved matrix, complete receipt, and two fresh exact-byte Sol critics all
converge without an intervening byte or normative change.
