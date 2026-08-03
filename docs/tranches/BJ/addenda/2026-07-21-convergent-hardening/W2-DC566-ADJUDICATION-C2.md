# MATERIAL W2 `dc566e34` + `7de2ece1` — third-pass Sol adjudication C2

**Seat:** independent third-pass Sol x-high adjudicator  
**Date:** 2026-07-22 (America/New_York)  
**Formation scope:** this report only; no product, test, evidence, package, gate, or prior-report edit  
**Primary target:** `dc566e34e7eee612695e099ddc31818cef231b99` / tree
`c76c9f092c0b026f001b0814ebf94740140778a1`  
**Companion target:** `7de2ece1b9ed7b4512db1c2e4432699167ba1c1b` / tree
`e2956699c6b58050fb96879100a694f48cbd291c`  
**Inputs:** contract critic SHA-256
`45aca28af4c3c14468a156a475bdfb97e8be766d1d4b3c820dfe6ab43e1f1cd3`; visual/material
critic SHA-256 `777d7632c904c974ffb2474342470eccd903c8c2889e4d21426a0346d74eb480`  
**Binding verdict:** **DEFECT / BANKED PARTIAL SOURCE CANDIDATE / MATERIAL W2 + FREEZE RED**

## Executive adjudication

Both critics are substantially right: `dc566e34` makes the off-ladder scrim choice searchable and
keeps its blur radius off the per-frame `--stage-t` clock, while `7de2ece1` repairs the omitted
companion pin. Neither commit establishes the material it describes. The current four-file mechanics
slice is **4 files passed / 18 tests passed / 1 expected-fail**, but the scrim still bypasses the
library's shared `--glass-level` clarity/accessibility axis; the six-rung prose misstates the actual
model; the 2dppx branch has no perceptual or performance warrant; the light-arm saturation values have
no retained material-taste proof; public guidance contradicts emitted values; and the same new bytes
still build and pack as the already-used immutable identity `@mkbabb/glass-ui@7.0.0`.

This pass closes the critics' remaining decision forks rather than forwarding them again:

| Axis | Binding Sol disposition |
|---|---|
| ontology | **Five calm semantic role recipes, three standard-density blur magnitudes, one separate opt-in deep continuum.** Strike “six blur rungs” and “one material per role.” |
| immersive scrim | **Private stage-effect role, fixed 14px at `--glass-level:1`; must multiply by the existing `--glass-level`; no `--stage-t` radius ramp and no saturation term.** It is not the deep surface endpoint. |
| 2dppx overlay | **KILL.** Remove the 17px media arm and its positive pin; overlay remains 11px at every DPR. Reintroduction is a later born-RED proposal, not a W2 defer. |
| light saturation 1.4/1.6 | **KEEP AS PROVISIONAL CURRENT VALUES, not ratified identity.** Do not repaint blindly in the bounded redress; strike evidence-false identity prose and keep W2 RED until structured-substrate comparison proves or retunes them. |
| receivers | **Dialog is the sole production-demonstrated immersive receiver. Drawer is a public/tested but story-undemonstrated receiver. CommandDialog is not a receiver and cannot currently request the stage.** |
| docs/package | **One v8 clean cut.** True source comments, repo canon, packed README, and 8.0 migration together; build one unique `8.0.0` artifact, install it as a package, and repin Atlas to its exact integrity. No mutable 7.0.0 credit. |
| `R-COMPOSITED-SIGNAL` | **Mandatory parallel arm of the same W2 release candidate.** It may land as its own reviewable Luna source cut, but W2/freeze/package/Atlas acceptance is atomic across both arms. No second opacity axis. |

The resulting implementation is smaller than either critic's still-open comparison fork: restore the
last published 14px stage depth, reconnect it to the already-owned clarity scalar, delete the
unsupported device branch, and leave saturation bytes alone until paint can honestly rule them.

## 1. Pin, movement fence, and reproducibility

The immutable commit relation is:

```text
dc566e34e7eee612695e099ddc31818cef231b99
tree c76c9f092c0b026f001b0814ebf94740140778a1
parent 31c01d2ab941597abfe283261ce05c042e1b7d25
feat(glass): land BJ MATERIAL W2 — blur-ladder precept, DPI-arm ruling, immersive-scrim repoint

7de2ece1b9ed7b4512db1c2e4432699167ba1c1b
tree e2956699c6b58050fb96879100a694f48cbd291c
parent dc566e34e7eee612695e099ddc31818cef231b99
fix(token-hygiene): shrink companion pin for MATERIAL W2 drawer blur repoint
```

`git diff-tree --no-commit-id --numstat -r dc566e34` reproduced:

```text
91  3  docs/tranches/BJ/waves/BAND-MATERIAL.md
5   4  src/components/drawer/styles.css
58  6  src/styles/tokens/glass.css
```

`7de2ece1` changes only `tests/gates/token-hygiene.test.ts` (`5/5`). Both commit-range
`git diff --check` runs were clean.

At 2026-07-22 02:12:47 EDT the moving checkout still pointed to `7de2ece1`, but carried 98 porcelain
entries; the sorted porcelain SHA-256 was
`da2cdb3f240ca4a1ae9695fc6540aa29764deb78cb81590e26583c17375d882b`. The W2 token, drawer-style,
README, canon, migration, package, and package-lock files were clean relative to that HEAD. Dirty
`DialogContent.vue`/description/Command style edits were inspected: they alter focus handoff, text
roles, close color, and caps tracking, not stage ownership or backdrop composition. Every source
finding below is therefore pinned to `git show 7de2ece1:<path>` or the isolated archive, not inferred
from unrelated dirty bytes.

Platform used for the fresh commands:

```text
macOS 26.4.1 (25E253), arm64
Node v26.0.0
npm 11.12.1
Vitest 4.1.10
```

### Fresh current mechanics result

```sh
npx vitest run \
  tests/styles/glass-subtlety.test.ts \
  tests/components/ui/dialog/dialog-stage-ownership.test.ts \
  tests/components/custom/drawer/Drawer.motion-lifecycle.test.ts \
  tests/gates/token-hygiene.test.ts
```

```text
Test Files  4 passed (4)
Tests       18 passed | 1 expected fail (19)
Duration    1.92s
```

This supersedes the contract critic's **current** gate-failure remainder only. Its statement about
exact `dc566e34` remains correct: the source set shrank while the companion set did not. The current
expected-fail is legitimately retained for the two MATERIAL W1 SegmentedTabs radius residues.

### Isolated `7de2ece1` build/package result

An exact `git archive 7de2ece1` was extracted at
`/tmp/w2-adjudication-head.qDSkyS`, with only the repository dependency tree linked. Archive hashes:

```text
package.json                         39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb
README.md                            26a777755b032af4638645faa89d6224678a3ba2e9839ae51b97ad79e6648bbc
MIGRATION.md                         623665fa69ed574f8b5f1401ee5768e4c4ee202c4d0d32832e7143ac01ea9005
docs/canon/consumer-wiring.md         ceb56f78d1195b8e47bec3af77f9a5a559c64ca1539e6fd5bacae1ba4180676c
docs/canon/glass-system.md            d2303d6cb863ee841ff2e22339fcfef501af77f668dee19d29d2f3b50f0d3a91
src/styles/tokens/glass.css           85b631675c59315c2392c638f40400fe29697f6e741874d5821f2daef70523a3
src/components/drawer/styles.css      5fa59bbe7e055f442a34d31314b14be01f45e14de70d4653c0195dfdfccc1b84
tests/gates/token-hygiene.test.ts      b276e09519050393e4d4134089297bf0632e7691b5a63a636ac5c31d6fcadf96
```

`npm run build` was GREEN (`726 modules`; `dist/glass-ui.css` 69.29kB / 12.14kB gzip;
67 projected declaration entries). `npm run verify:package` was GREEN:

```text
Package artifact valid: 205 targets, 483 declarations, 111 CSS files, 67 strict consumer imports.
```

The isolated dry-run package was mechanically valid but release-invalid:

```json
{
  "id": "@mkbabb/glass-ui@7.0.0",
  "filename": "mkbabb-glass-ui-7.0.0.tgz",
  "size": 905900,
  "unpackedSize": 2642774,
  "files": 887,
  "integrity": "sha512-WWVuIfM8kce54uGce0zQ8sYoWcMN9oNKAmCuafcswBq5Z9T+XNn2ikwM792ccrx2sfpuCZTwpduuMsSKDFaupw==",
  "README": true,
  "MIGRATION": false,
  "canon": false
}
```

Emitted exact-file SHA-256 values were:

```text
dist/glass-ui.css          c5ef8e5b33cb12eb6a1c3b5621d5b7a3622f301056ba62919df07cbfe1847bc4
dist/styles/glass.css      5b4b1fc527924a5ace92a76f73fb10b57327c37c2f5d50039f89b02ff925073a
dist/styles/components.css 49f0909297c51ff045cf6bc703fd11aee38dfee7223b7ff54e3dd93836c6ea0d
```

The `v7.0.0` annotated tag resolves to commit
`4ab121286bd54543ba2431e4f54a1617c3c9cf8d`, whose package is also `7.0.0`. `git diff
v7.0.0..7de2ece1` changes current emitted-material sources and package surface without changing the
version. A second integrity behind the same name/version is not an immutable release candidate.

## 2. What the two critics got right — and what this pass corrects

### Accepted from both critics

1. `dc566e34`'s `14px → var(--glass-blur-deep-radius)` is a real `14→16` repaint, not a
   byte-identical tokenization.
2. A direct `blur(var(--glass-blur-deep-radius))` reads neither `--glass-level` nor the deep
   composition. Reduced transparency and forced colors can set the shared level to zero while this
   selector continues to request 16px.
3. The deep system is a graded decoration whose shipped grades resolve about 12.75/14.5/16px and
   1.67/1.74/1.8, not a flat sixth calm rung.
4. The 17px ≥2dppx claim is unsupported. More device pixels do not by themselves prove lower blur
   cost; in CSS pixels the filter covers a larger device-pixel footprint.
5. Current docs and source prose disagree with current values, and the package still reuses 7.0.0.
6. `R-COMPOSITED-SIGNAL` remains mandatory; `626540ad` is useful partial source progress, not the
   ordered/source-intent/provider/package/Atlas close.

### Corrections and sharpenings

1. **The gate failure is historical, not current.** `dc566e34` is exactly RED on its omitted
   companion. `7de2ece1` repairs that narrow defect; the current 18+1 result must be credited without
   laundering the target commit.
2. **`proof:glass-legibility` is not literally nonexistent.** It exists as
   `tests-visual/glass-legibility.spec.ts` and is referenced by the gate corpus, although there is no
   package-script key of that exact name. The decisive problem is relevance: it reads resolved
   backgrounds, alpha, warmth, and text contrast; it does not read `backdrop-filter` saturation or
   distinguish contextual frost from shiny/plastic transmission. It cannot ratify 1.4/1.6.
3. **The count needs two dimensions.** The values 1/7/11/16 are four numeric endpoints only if the
   separate deep ceiling is mixed into the calm set. The honest calm count is three distinct
   magnitudes across five role recipes. Deep is a continuum/decorative family above it.
4. **Drawer is not yet a production-demonstrated receiver.** Its public API and unit fixtures support
   `stage="immersive"`, but `demo/stories/containers/drawer.vue` has no immersive mount. The current
   visual demo receiver is Dialog only.
5. **The adjudicator need not defer every value to another open comparison.** The prior 14px scrim is
   the last published subtlety result and matches the owner's uniform pull; the unsupported 17px arm
   has no right to persist by inertia. This pass selects 14 and kills 17, while retaining final paint
   proof as acceptance rather than as permission to begin the bounded repair.

## 3. Binding material ontology

The source canon must describe separate concepts rather than call every name a rung:

| family | semantic roles | distinct standard magnitudes | composition truth |
|---|---|---:|---|
| calm | `wash`, `quiet`, `resting`, `floating`, `overlay` | `1px`, `7px`, `11px` | Five role recipes. Equal-radius aliases may differ through brightness, dark-arm recipe, alpha, or component context; those differences do not mint new blur magnitudes. |
| deep | opt-in `.glass-deep` decoration on a base role | continuum `11→16px` | Three named grade defaults resolve ~12.75, 14.5, and 16px; saturation interpolates `1.6→1.8`. It is not the calm ladder's sixth rung. |
| stage effect | flat immersive Dialog/Drawer scrim | fixed `14px` at level 1 | A dimming/spatial-separation sample, not a glass surface recipe; intentionally blur-only and fixed over stage motion. |

Therefore:

- retain all five calm semantic names; aliasing at the radius axis is legitimate;
- describe `quiet`/`resting` as sharing a 7px **radius leg**, not one material;
- describe `floating`/`overlay` as sharing an 11px light/standard-DPR blur recipe while their broader
  roles diverge contextually;
- describe the Dock's local composition as a component specialization, not proof that every 7px
  consumer is identical;
- move deep out of the calm table and document its three grades/continuum separately; and
- never call the stage scrim an “immersive Command” or a deep-surface material.

The existing “ONE MATERIAL PER ROLE” sentence is doubly false: some equal-radius roles have different
recipes, while the newly repointed scrim consumes a primitive rather than the claimed composed role.
Replace it with the narrower invariant: **one intended backdrop sample per visual body; every blur
choice is a named role input and every accessibility-bearing recipe reads the shared clarity axis.**

## 4. Binding immersive-scrim role and value

### Decision

Select a private `stage-immersive` scrim role at **14px when `--glass-level:1`**. It must remain
constant with respect to `--stage-t`, but it must multiply by the existing global clarity scalar:

```css
/* Normative shape, not an instruction to copy names blindly. */
[data-stage-scrim] {
    --stage-immersive-blur-radius: 14px;
    --stage-immersive-blur:
        blur(calc(var(--stage-immersive-blur-radius) * var(--glass-level)));
}

[data-stage-scrim][data-stage-immersive]:not([data-backdrop="graded"]) {
    backdrop-filter: var(--stage-immersive-blur);
}
```

The exact private token seat is Luna's implementation detail, but these properties are binding:

- 14px at level 1; 4.2px at level 0.3; 0px at level 0;
- no dependency on per-frame `--stage-t`;
- no saturation/brightness term—the scrim is a scene-separation effect, not a content-bearing glass
  plate;
- no new public calm/deep rung and no second opacity/attenuation axis;
- the graded-backdrop branch remains mutually exclusive; and
- PRM keeps the existing behavioral ruling: Dialog and Drawer degrade immersive travel to `dim`, so
  the immersive attribute and fixed sample are absent under reduced motion.

Why 14, not 11 or 16: 14 is the last published/reviewed immersive value in `MIGRATION.md:169-175`,
preserves the user's “slightly subtler across the complete census” decision, and avoids silently
turning a stage effect into the maximal deep endpoint. Eleven collapses the immersive distinction
into ordinary overlay; sixteen reverses the published pull. Fourteen is a bounded stage role, not a
new calm rung.

This is a Sol implementation ruling, not terminal visual credit. The immutable candidate must still
show that 14 preserves recognizable contextual regions and text contrast without a hard seam in
current Chromium and Safari. If that exact evidence fails, the value reopens through a named Sol
re-ruling; Luna does not improvise a fourth number.

## 5. Binding 2dppx ruling — KILL

Delete the `@media (min-resolution:2dppx)` writer that changes overlay from 11 to 17px. The standard
overlay role remains 11px across DPR.

Reasons:

1. It violates the owner's uniform-subtlety direction by increasing the same semantic role 54.5%
   solely by device density.
2. It inverts the documented hierarchy: a calm overlay becomes larger than the 16px deep ceiling.
3. The claimed “amortization” is unsupported and physically incomplete; a CSS blur radius maps over
   more device pixels at higher DPR.
4. The retained `nested-backdrop-budget.spec.ts` does not vary DPR or 11↔17, mounts a synthetic flat
   stack rather than the real receiver, and its WebKit project does not run that spec.
5. Deleting the branch is the KISS/device-consistent default. Keeping special behavior requires
   evidence; absence of evidence does not entitle the exception to persist.

The positive `glass-subtlety.test.ts:84-87` pin must be removed or inverted into a relationship gate
that proves there is no DPR-specific overlay-radius writer. A mutation restoring the 17px branch must
RED.

Reintroduction threshold, outside this W2 cut: a new explicit proposal must demonstrate a visible
role benefit over the same structured/moving substrate and actual overlay receiver in current
Chromium and Safari at DPR 1 and 2, with 11↔candidate mutation, fixed-coordinate transmission and edge
retention, frame-time distribution/long frames, no nested-sample growth, and no hierarchy inversion.
Until that new evidence exists, the answer is KILL—not PARK.

## 6. Saturation 1.4/1.6 — provisional bytes, acceptance still RED

Do not blindly change the light-arm 1.4/1.6 values in Luna's bounded repair. Also do not call them
“material identity” or T42-complete.

The critics' conclusion is correct, with one evidentiary correction: the visual legibility spec
exists, but it measures background alpha/warmth/contrast rather than filter saturation. Meanwhile
`tests-visual/glass-depth.spec.ts:45-47,172-184` still asserts the obsolete calm baseline 13px/1.18,
and current source comments/canon variously name 1.05, 1.18, and deep 1.5. No retained exact-candidate
artifact compares contextual transmission at current 1.4/1.6 against a lower-saturation alternative
or an intentionally plastic falsifier.

The current light values may remain **provisional inputs** because changing them without paint would
repeat the same error. W2 remains RED until one exact candidate proves or retunes them over production
SegmentedTabs and Slider:

- direct and once-nested in a real Glass plate;
- one structured warm/chromatic substrate, with fixed geometry/alpha/rim;
- rest, hover, keyboard focus, coarse onset, drag, and settle;
- 390 and 1440, light/dark, DPR 1/2, PRM;
- current Chromium and Safari;
- current 1.4/1.6 versus one bounded lower-saturation arm and one opaque/plastic falsifier;
- measured region/boundary retention, high-frequency attenuation, label/value contrast, hard seams,
  idle shine, and nested double-sampling.

GREEN means the chosen values preserve recognizable backdrop regions and quiet frost at rest, add a
bounded engagement delta, and do not produce F4-like shine or F5-like plastic. If current 1.4/1.6 wins,
Sol may then call it identity. If it loses, Sol selects the replacement and Luna applies only that
bounded retune. Source provenance or an old numeric pin cannot decide taste.

## 7. Exact immersive receiver truth

| receiver | current truth at `7de2ece1` | disposition |
|---|---|---|
| Dialog | `demo/stories/containers/dialog.vue:361-379` mounts `DialogContent stage="immersive"`; `DialogContentProps` exposes the stage; ownership tests exercise it. | Real production-demonstrated receiver; mandatory paint fixture. |
| Drawer | `DrawerStage` and `Drawer.vue` expose `immersive`; `Drawer.motion-lifecycle.test.ts` mounts it, but the production Drawer story contains no immersive mount. | Supported/tested receiver, visually undemonstrated; add one real story state and use it in acceptance. |
| CommandDialog | `CommandDialogProps extends DialogProps`, not `DialogContentProps`; `CommandDialog.vue` delegates props to `<Dialog>` and instantiates `<DialogContent>` without `stage`; the Command story passes no stage. | Not a receiver. Strike “immersive Command scrim/spotlight.” Do not add a stage API merely to save prose. |

The CSS selector is shared by Dialog and Drawer staging infrastructure, so both actual mounts must
pass computed and composited-pixel acceptance. Command is excluded unless a future product wave
explicitly designs and forwards a stage axis.

## 8. Public canon, migration, and immutable package cut

Current contradictions are release-bearing:

- source says 7px while `README.md:54-60` and `docs/canon/consumer-wiring.md:14-20` teach 8px;
- `docs/canon/glass-system.md:34-36` teaches deep saturation 1.5 while source is 1.8;
- source comments still say quiet 1.05, dark light-arm 1.05, and calm deep floor 1.18;
- current W2 prose calls a five-role/three-magnitude calm system six rungs and sends prospective
  judgment to retired Fable authority;
- the 7.0 migration correctly records immersive 14px, while current emitted source paints 16px;
- the packed artifact includes README but excludes `MIGRATION.md` and `docs/canon`, so the stale 8px
  example is the consumer-visible package guidance; and
- the exact new source still packs as `@mkbabb/glass-ui@7.0.0` although the immutable `v7.0.0` tag
  resolves to older bytes.

One bounded truth-up must reconcile current source comments, `docs/canon/glass-system.md`,
`docs/canon/consumer-wiring.md`, packed `README.md`, and a new 8.0 migration row. Historical sections
remain historical and are corrected only when they falsely claim to describe current behavior.
Prospective ownership is Sol x-high; historical Opus/modelId provenance stays historical.

Release acceptance requires:

1. version and lock root become one unique `8.0.0` identity after all W2 arms converge;
2. `npm pack` produces a retained tarball and SHA-512 integrity from a clean exact candidate;
3. an isolated consumer installs that tarball—no workspace alias, HMR source, or mutable file link;
4. installed CSS/readback proves calm 1/7/11, no DPR overlay fork, stage 14×level, and the selected
   saturation state;
5. installed README teaches the same 7px primitive and role ontology;
6. source/archive/package CSS hashes are reconciled; and
7. Atlas's real lock is repinned to that exact artifact and its real receiver is captured.

A different local tarball named 7.0.0, or source/demo evidence that bypasses the installed artifact,
is RED.

## 9. Relationship to unified `R-COMPOSITED-SIGNAL`

The blur-ladder/scrim repair and the composited backdrop signal are distinct source mechanisms but
one material-release acceptance surface.

Current `626540ad` progress is insufficient. At `7de2ece1`, the sampled-underlay source hashes are:

```text
src/composables/glass/backdropLuminanceSample.ts  1ca7cf5761b00e8bb70863ddee916ac9d0f2ac6ee1a032d8c86bd1d45d4fa354
src/composables/glass/backdropSampleMath.ts        bd968a785742b03495e5574eb441bfd4dbce59777e42b3514953782f56d700ce
src/components/dock/GlassDock.vue                 5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a
tests/composables/glass/backdropLuminanceSample.test.ts
                                                   48d37f627f7d1cf67a18c1765da25304d23d5e88a38a547ab6c105e90d180c2f
```

The current sampler reduces the stack to the first background color with alpha ≥0.5, drops that
alpha, omits ordered lower-layer/gradient contribution, and falls back to white. `GlassDock.vue`
still manufactures a getter and collapses omitted/explicit-null/late-null source intent while
stripping the public selector-string form. The one-field/one-opaque-underlay test does not represent
Atlas's CSS placeholder + transparent/armed shader canvas + cross-fade/group opacity + page stack.

Binding structure:

- Luna may implement the scrim/DPI/canon repair and the ordered provider/source-intent repair as two
  small, separately reviewable source commits;
- neither arm may call itself W2 GREEN, Candidate-2 freeze input, or releasable alone;
- one immutable 8.0 package must contain both;
- one installed-package Atlas repin must prove the real CSS-default and shader paths;
- the signal must continue to drive only the existing luma→tint axis; no new dock opacity,
  attenuation, or consumer marker shim; and
- dropping alpha, gradient, order, selector/source form, late-getter semantics, or package identity
  must independently RED.

This is atomic acceptance, not a demand for an oversized undifferentiated code commit.

## 10. Bounded Luna x-high redress

Luna's implementation seat is deliberately constrained:

1. **Scrim:** restore 14px as a private `stage-immersive` role and compose it with
   `--glass-level`; keep radius independent of `--stage-t`; preserve graded exclusion and PRM
   degradation.
2. **DPI:** delete the 17px media writer and its positive test/prose; add a negative relationship
   assertion that any restored DPR writer REDs.
3. **Canon:** replace six-rung/one-material prose with the ontology in §3; strike Command receiver
   claims; add one immersive Drawer story state; replace prospective Fable routing with Sol.
4. **Truth-up:** fix current 7/11/14/16/1.8 and role statements across source comments, current canon,
   README, migration, and stale visual assertions. Do **not** change 1.4/1.6 in this cut; label them
   provisional pending retained paint.
5. **Gates:** add actual Dialog+Drawer scrim level 1/0.3/0 and accessibility-mode assertions; preserve
   the current token-hygiene latch until MATERIAL W1 removes its own two residues.
6. **Signal arm:** land the already-specified ordered/already-composited provider and honest source
   intent as its own bounded cut; prove the real Atlas placeholder/shader composition; no second
   opacity axis.
7. **Package:** after both arms and material evidence converge, cut one unique 8.0 artifact and
   installed Atlas repin. Append exact receipt; do not mutate the existing 7.0.0 identity.

Out of scope for Luna without a new Sol ruling: inventing a new public glass family; changing calm or
deep saturation values; reintroducing device-specific blur; adding a Command stage API; or weakening
the ordered composited-signal contract.

## 11. Born-RED acceptance and mutations

The final exact candidate must make each mutation fail for the causal reason named:

| arm | GREEN proof | required RED mutation |
|---|---|---|
| stage role/value | actual Dialog and Drawer computed filter is 14px at level 1, 4.2px at .3, 0 at 0; pixels retain context/contrast in Chromium+Safari | restore direct deep-radius use; change 14→16 or 11; remove `--glass-level`; tie radius to `--stage-t` |
| a11y | reduced-transparency and forced-colors flatten the actual scrim; high contrast reaches the .3 state; PRM removes immersive staging | bypass level; keep immersive marker under PRM; restore full blur at level 0 |
| DPR | installed overlay remains 11px at DPR 1 and 2 | restore any `min-resolution` overlay-radius writer or old positive 17px pin |
| ontology/docs | source, canon, README, migration, and installed values agree on five calm roles/three magnitudes/deep continuum/stage role | restore “six rungs,” “one material,” 8px resting, 1.5 deep, 1.18 current calm, or immersive Command claim |
| receivers | production Dialog and added Drawer story both exercise the role; Command fixture absent | delete Drawer story while retaining support claim; make a prose-only Command receiver |
| saturation | retained direct+nested Tabs/Slider matrix distinguishes contextual frost from lower-saturation and plastic mutations | force an opaque/plastic plate or a materially different saturation while the test remains green |
| package | exact 8.0 tarball install, source/archive/package hashes, README, computed CSS, Atlas lock/integrity all agree | reuse 7.0.0; resolve source via workspace/HMR; alter tarball without lock/integrity failure |
| composited signal | ordered alpha+gradient+source-intent/provider fixtures and real Atlas CSS/shader paths yield truthful signal | restore white/opaque-triple reduction; reorder/drop a layer or alpha/gradient; wrap null; strip selector; sample transparent canvas; add opacity shim |

After Luna's complete redress and retained evidence, run **two fresh independent Sol x-high exact-byte
critics**:

1. a contract/package/a11y critic covering source graph, mutations, public docs, installed 8.0
   identity, and Atlas lock; and
2. a visual/material/consumer critic covering the actual Dialog/Drawer scrim, Tabs/Slider saturation,
   structured substrates, dual engine/DPR, direct+nested sampling, state/motion/PRM, and hard seams.

Neither current critic pre-approves those new bytes. Any source, test, documentation, evidence,
package, or consumer change after their pin invalidates terminal credit and requires a fresh digest.

## Terminal ruling

**Reject `dc566e34` and `7de2ece1` as MATERIAL W2 completion, completed DPI judgment, honest blur
canon, T42 closure, immutable package input, `R-COMPOSITED-SIGNAL` closure, or Candidate-2 freeze
input.** Bank the raw-literal removal, fixed-over-stage-motion intent, collision inventory, successful
build/package mechanics, and repaired token-hygiene companion as partial source progress.

The binding path is now closed enough to implement: **five calm roles / three magnitudes; deep kept
separate; immersive scrim 14px × `--glass-level`; 2dppx 17px killed; 1.4/1.6 held provisional pending
paint; Dialog real, Drawer to be demonstrated, Command excluded; one truthful 8.0 package with the
unified ordered composited signal and Atlas repin; then two fresh Sol critics.**
