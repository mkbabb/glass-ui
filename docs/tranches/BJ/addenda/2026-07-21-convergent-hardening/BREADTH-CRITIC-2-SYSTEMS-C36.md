# Breadth cohort critic 2: systems, ontology, KISS, and package closure — C36

**Date:** 2026-07-22  
**Phase:** formation / Browser-evidence criticism only  
**Role:** independent failure-assuming Sol x-high systems critic  
**Scope:** Tabs, Slider, Alert, and Card  
**Verdict:** **DEFECT / DETECTOR PARTIAL / SYSTEMS + ONTOLOGY RED /
PACKAGE RED / ACCEPTANCE RED / EXISTING OWNERS SUFFICIENT / NO NEW ROW**

No product, test, gate, generated output, package, lock, consumer, or repin byte
was edited for this criticism. No test result, source import, or served demo state
is promoted to immutable-package acceptance.

## Frozen inputs and review envelope

The unchanged Browser packet under criticism is:

- `BREADTH-COHORT-TABS-SLIDER-ALERT-C35.md`, SHA-256
  `1c9985788b2a79767db7ac491f191c4f794d58a8ca644c15e620869080b339b6`.

The governing convergence cursor is:

- `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`, SHA-256
  `67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553`.

Source was reviewed at committed Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
`97b386172a899ef43b686ffbe43263395b3a7744`. The packet's retained mobile
and desktop Tabs, Slider, Alert, and Card frames were inspected as discovery
evidence. In particular, the true-mobile Tabs specimen is visibly compressed,
the Slider's visible track has no corresponding visible semantic-thumb box,
and Alert is materially sharper than Card. Those visual observations are
consistent with the source mechanisms below.

The review does **not** retroactively establish which built JavaScript and CSS
the Browser loaded. C35 records a separate Browser tab and interaction sequence,
but not exact source-to-build-to-serve identity, Browser engine/build identity,
or installed-package identity. Two separate Browser episodes are useful assay
independence; they are not package or engine independence.

One reviewed test is already foreign-dirty and must remain so:

- `tests/components/slider.contract.test.ts` current SHA-256
  `a08fe7dbcde06b293a025379f536b1afc89ccf4549debfd5e9c880d5f54ad436`;
- committed content SHA-256
  `82860b589b36719de2cdf3e8007c3214785532efd30a3392adf18b4805961cc3`.

The dirty delta only binds a pre-existing multi-thumb ARIA test to the foreign
governance helper. It earns no cohort acceptance and was not edited here.

## Exact source identities

### Alert and Card

- `src/components/alert/Alert.vue`
  `883b5829a1d864671c53ce5827b53fa8e2c4a7a076705512039088f3739931c1`
- `src/components/alert/index.ts`
  `18c353b73e5b29d7cd3067ad42a0ce0b608e3a1e5d96efb91b2f67a65bf97979`
- `src/components/card/Card.vue`
  `4855b4ef43db7ea4cdb302a788de351687970c3ac5de18dcb919bf724caff2f3`
- `src/components/card/styles.css`
  `ffd3280f901f39ad4487bbdfb6f8218aed204ca697229cd2d2e2ef638940e617`
- `tests/components/ui/alert/Alert.test.ts`
  `3111482bf89d45237e58b016113aeaacd83e22695fcc71070704642eb4c4ef32`
- `tests/components/ui/card/Card.test.ts`
  `78903a0096babd7b0bcd67957b320de244d4a9b0ee7012c72686c43dedba180c`
- `demo/stories/feedback/alert.vue`
  `04f8b94835b80c810c31c483136ffcc06398216dd18a43f93683831a05ab9b37e`
- `demo/stories/display/card.vue`
  `310606e10839ca4528b67a6c8c51f2089fd0c4dc6bfb7f3b6bd2cc763c44909a`

### Slider

- `src/components/slider/Slider.vue`
  `fec904b6134d13fd7487ecb0cec6f510819cf7ee30d4aa09f923732771d21a51`
- `src/components/slider/types.ts`
  `44333fe6612cb34ae379f5b68e014cfecb0b8f4c27ba838a1f52c8331778ba47`
- `src/components/slider/index.ts`
  `887ec0a1c52ecf4131101228f57ef7b729056c3d6a472cf9c883a30ea23fb933`
- `tests/components/ui/slider/Slider.marks.test.ts`
  `c5fe9611e71f4e6432a279dac2e4f6e41ed6fe31a01d109591992c11c2cff7fb`
- `demo/stories/forms/slider.vue`
  `0d4affcd82a23d732f4aa8d7e5f314a4b9efdb3553f43e21fd6d3e21684dc2f6`

### Tabs and shared motion

- `src/components/tabs/SegmentedTabs.vue`
  `28bc80dbfea63f9857ed90f38c8ec29270acd6717b552a2862645b6e69368578`
- `src/components/tabs/composables/useTabDragMorph.ts`
  `7503e821180a8d9feffdd7d56347c50208f91f06ce153ee8fe9cca1ad4d9c7bc`
- `src/components/tabs/composables/useTabResponsive.ts`
  `da86a04f96f95c16d059b202e6e1d821855185578d709e36b99203defee81d23`
- `src/components/tabs/composables/useTabRovingFocus.ts`
  `6fd821c738a6f0c20653d069c99040ebd66fc3d02f7f6aabaef9a5b815585272`
- `src/components/tabs/styles/segmented.css`
  `93e2e15916a9d5ff7b77c03aff2a7719dd8cbfbc03897d15dc62c2d9794f4f7a`
- `src/components/tabs/styles/drag.css`
  `52bb917d9cef9d20a0acf376546f344b825ab2339b74eff2aed93fcc021b1b77`
- `src/components/tabs/README.md`
  `1c2b366a8c6c82f67743159a902d572ff779fa02870f8d974ce853b82c74eaac`
- `src/components/tabs/constants.ts`
  `23cc30534b07e890c459ac6d2f4c66087065b4c518597ca015c1a17ba4eb141d`
- `src/components/tabs/index.ts`
  `ec9ebbaa0ec8b291d988cfcbaaed56a7c8eb0e2d08da65f4a1b9ebd55d0c97aa`
- `src/composables/motion/morph/useSelectionIndicator.ts`
  `205de9d54cc178f86ef5e4190ceb10f242da6ae26eb5da59c651f388ed5a3b69`
- `src/composables/motion/morph/useDragMorph.ts`
  `211da5d1d0870340a3b624cf89de1583f5881e950d05197d050bb22c6bc8c48f`
- `src/components/_shared/useMotionAxis.ts`
  `85af1d1939d2212930095501b366153d7f210a0c016f5f7a8300c1412e6a68bc`
- `tests/components/custom/tabs/segmented-tabs.test.ts`
  `040c3839acb8921bc8c07e33c8e722c586c16b1ab65189f529d7b304bff34d3f`
- `demo/stories/navigation/tabs.vue`
  `c199ee7f6348239a1337c6dffcaf6df10ad259b03338e7048baac85d0fa00596`

### Cross-cutting public styles and package policy

- `src/styles/glass/glass-capsule.css`
  `c23704686bcec0f749ec18300792b75ab615650bea4a14f0873b480453936f09`
- `src/styles/glass/track-well.css`
  `e7f6e835cc4aefbc9ecf8f6d1a09baf9a73852393bc66522e7842d4ef5e2596d`
- `src/styles/glass/liquid-fill.css`
  `9b7a9a8a64ed7a189ede6b7bb86bba56b166bc146e71826fb13238f337c9ff02`
- `src/styles/utilities/a11y-overrides.css`
  `50897fb7c5b57938f50f9b12c39416c1377886a9a03ad41e3d62f8ab80671205`
- `src/styles/utilities/responsive.css`
  `079d1c4886ee90214214ff009f5d27640f8d024011e6e6b264b0127413892009`
- `src/styles/theme/radius.css`
  `3131c7daed2e1ac7aeffdaa6aeb7e0fa642bc1da7d92423fe009ef5c3651336e`
- `scripts/lib/subpath-policy.mjs`
  `fb3ae494423d21e567f790c0e1d6d46996158148ea98f9059ee33f7c9ba19809`
- `src/index.ts`
  `ec908e10ed4c460d650ff42748e1e35db09b5d0bb938a7f42c3750fb2bfe3e73`
- `package.json`
  `44de86637c98b7b6310cd6614fa77f59b2517b42097945295806b00f88a5b914`
- `tests/public-surface.spec.ts`
  `41b3ab1f302731960c8c0cde5d19a2bbca99524c31ea19d25196cc1e4ef5a73f`

## Finding 1 — Alert has two coupled systems defects, not only a radius mismatch

### 1A. The live radius discrepancy is source-true

`alert/index.ts:7-18` owns the Alert recipe and uses raw `rounded-lg`, whose
current role resolves to 10px. Card composes `rounded-card`, resolving to 16px.
This explains the C35 10px-versus-16px computed-style witness.

The owner correction does not justify immediately inventing `--radius-alert` or
another Alert renderer. The smallest coherent ontology is the existing semantic
radius-role system: Alert should share the Card-equivalent role unless the later
proportional adjudication proves a stable, named reason for a larger radius.
That preserves KISS and a clean break rather than accumulating component-local
exceptions.

Radius is not the whole Alert defect. Existing `BJ.W-ALERT-IDIOM` also owns its
wash-level blur, law-3 rim, tone material, and typography. A radius-only change
would leave the component technically rounder but still non-idiomatic relative
to the Glass material canon.

### 1B. Alert contains a live runtime self-barrel cycle

`Alert.vue:4` imports `alertVariants` from `./`, while `alert/index.ts:3`
re-exports `Alert.vue`. That is a direct component-to-barrel-to-component value
cycle. It contradicts colocation/test-isomorphism and makes the defining recipe
depend on the public collection that includes its consumer.

This routes to existing `R-DAG-TRUEUP` / `BJ.W-COLO-3`. The KISS repair is a
defining leaf import or moving the recipe to a defining leaf; it is not another
barrel or registry. A value-edge Tarjan mutation must turn RED when the
self-barrel import is restored.

### 1C. Current tests are paint-false-green

The Alert test checks announcement semantics. The Card test checks source class
presence including `rounded-card`. Neither installs the package, loads public
CSS, or asserts computed radius/material/rim. Card is therefore a useful source
reference, not packaged/browser GREEN.

**Born-RED mutations**

1. Restore `rounded-lg` after the semantic-role correction: live computed Alert
   radius diverges from the adjudicated Card-equivalent-or-greater role.
2. Restore the `Alert.vue -> ./ -> Alert.vue` self-barrel: the value graph gains
   the Alert SCC.
3. Remove the selected Glass blur/rim/tone role while preserving radius: the
   material detector must still fail.
4. Omit Alert paint CSS from either public style entry: installed fixtures and
   Browser computed paint fail despite source tests remaining green.

## Finding 2 — Slider proves ownership ambiguity, not yet terminal action failure

`Slider.vue:227-236` mounts each semantic `SliderThumb` with
`slider-thumb glass-specular-track`; it does **not** apply `touch-hit-area`.
The standard-thumb CSS at `342-380` nevertheless claims a 44px
`.touch-hit-area::before` halo, while the actual thumb is width 0, height equal
to the approximately 20px track, and opacity 0. Source prose, composition, and
runtime geometry therefore disagree.

C35's eight-point `elementFromPoint` assay is an exact RED detector for semantic
hit ownership: none of the proposed 44px envelope belongs to the `role=slider`
lineage. It is not yet a complete proof that those points cannot perform a
Slider action. Reka's root/track may accept or translate pointer interaction,
and C35 explicitly did not retain the full trusted event path and resulting
value mutation. The correct conclusion is:

- semantic thumb geometry and proposed action ownership are RED;
- keyboard handler wiring is not inert (`42 -> 43` after focus and ArrowRight);
- actual coarse action at center/corners/edge midpoints remains unproved, not
  conclusively failed.

Reapplying `touch-hit-area` alone is not sufficient. A pseudo-element with
`pointer-events:none` centered on a zero-width sibling can satisfy a computed
size check while owning no action. Conversely, the root's coarse
`data-control-target` floor does not prove that the semantic thumb owns the
target. The producer must decide which element is the public action owner, then
prove it with actual actions, composed paths, and neighbor isolation.

The focus contract is separately RED. Standard Slider uses
`:focus-within .slider-track`, so pointer focus can paint the same ribbon as
keyboard focus. C35 used programmatic focus, not natural Tab reach, and thus
does not settle focus-visible modality.

The demo itself violates the outright-consume law:
`demo/stories/forms/slider.vue:80-85` reaches into `.slider-track` and
`.slider-range` with private descendant selectors. That should be retired in
favor of a documented typed public prop/token seam; the existing
`--slider-range-bg` use demonstrates that such a public direction is possible.
Do not preserve the private selectors as a compatibility API.

**Born-RED mutations**

1. Restore the zero-width semantic owner without an actionable floor: true
   coarse pointer actions at the center, four corners, and four edge midpoints
   fail ownership or the intended value change.
2. Add a 44px pseudo readback that has no action owner: computed geometry alone
   must not satisfy the gate.
3. Allow a neighboring Slider or page control to receive an envelope point:
   isolation fails.
4. Change pointer focus to paint the keyboard-only ribbon: focus-visible modality
   fails after natural pointer then natural Tab sequences.
5. Restore the demo's private descendant styling after public migration: the
   idiomatic-consumer census fails.
6. Remove track-well, liquid-fill, or marks CSS from one packaged style entry:
   the immutable installed receiver loses default geometry/paint.

This routes to existing A11Y linkage W2-E/W2-F and DOC-TRUTH T31/T32; material
and package work route to `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK` and the
existing Slider/iOS-final material owner. It does not justify a new primitive.

## Finding 3 — Tabs currently has two geometry owners and unconditional drag cost

The public story says “one engine,” but the implementation does not satisfy
that ontology:

- pill selection uses a real indicator element plus `useSelectionIndicator`;
- underline selection uses an anchor-positioned `::before` with a fallback
  border;
- `useTabDragMorph` explicitly disables drag for underline.

README/constants/comments also name stale or nonexistent ownership, including
`useTabIndicator.ts`. The result is one public component with two selected-
geometry authorities, style-dependent drag semantics, and documentation that
does not identify the runtime truth. Existing `R-TABS` / iOS FINAL W5 already
owns one truthful selected-geometry authority across pill and underline.

The KISS defect extends below Tabs. `useTabDragMorph` invokes shared
`useDragMorph`, and `useDragMorph:354-380` installs `window` pointerup and
pointercancel listeners at setup time. This happens even when underline makes
drag impossible, responsive Select replaces the strip, motion disables the
gesture, or no indicator is actionable. The capability must own its listener
lifetime; one shared helper is still preferable, but it must be lazily/scopely
activated rather than globally paying for an impossible gesture.

The same static path imports keyframes-bearing motion code into `/tabs`, while
package policy describes Keyframes as optional. That is an unresolved package
contract, not proof of a current import crash. An installed fixture must either:

- prove `/tabs` can load and run its no-drag shapes without the optional peer; or
- declare Keyframes required for `/tabs` and fail clearly when absent.

Silent static reach plus “optional” prose is not a stable public API.

### Responsive state is split-brain

`useTabResponsive.ts:73-84` creates `stripValue`: when the model is absent from
`desktopOptions`, the desktop strip visually selects the first enabled desktop
option without updating the model. The colocated test codifies a case where the
model remains `three` while the desktop strip reports `two` selected. A consumer
panel driven by the model can therefore display Three while Tabs exposes Two as
selected. That is an ontology failure, not merely a breakpoint cosmetic.

The mobile Select transformation further changes semantics and ignores
`option.controls`; panel association, selected identity, focus order/return,
label-width displacement, and breakpoint transition must be proved together.
The public contract must either preserve model/visual/panel identity or perform
an explicit transactional reset. A private silent visual fallback is rejected.

### Renderer and width topology are duplicated or under-specified

`SegmentedTabs.vue` duplicates the button renderer across tooltip and plain
branches. Existing G5 `R-TABS-ADORN` requires both paths to share one stable
adornment cell. Adding the cell twice without first sharing the renderer would
preserve branch drift.

The strip's inline-grid, `1fr` auto columns, and nowrap labels expose a combined
min-content floor with no selected/focused reveal policy. The mobile frames show
material compression, but the packet does not retain exact control rectangles;
visual smallness alone cannot close coarse target/action proof. Nor should
`minmax(0,1fr)` be prescribed blindly: it may exchange overflow for clipping or
overlap. The selected policy must prove reachable labels, selected-indicator
congruence, focus reveal, and constrained-width behavior.

Tabs correctly no longer auto-arms refraction from component mount. Preserve
that GREEN invariant: application-root bootstrap remains application-owned.

**Born-RED mutations**

1. Restore separate pill-element and underline-pseudo geometry authorities:
   selected coordinates diverge under resize, scroll, RTL, DPR, or interruption.
2. Restore underline drag disablement after the shared geometry/gesture contract:
   style changes behavior without an explicit public capability decision.
3. Attach window listeners when drag is impossible or after unmount: listener
   lifetime/capability mutation fails.
4. Enter desktop with a mobile-only selected value: model, selected ARIA state,
   visible indicator, and controlled panel disagree.
5. Restore duplicated tooltip/plain render paths after unification: adornment or
   interaction mutations affect only one branch.
6. Constrain the strip so selected/focused content clips, overlaps, or becomes
   unreachable; “no document overflow” must not pass.
7. Remove the optional motion peer in an installed `/tabs` fixture: package
   behavior must match the declared peer contract.
8. Reintroduce component-side refract auto-arm: root-bootstrap ownership fails.

Current Tabs tests are valuable for DOM semantics, roving/manual/RTL behavior,
synthetic geometry, and one responsive fallback. They omit natural drag/pointer
capture/cancel, runtime resize/scroll/DPR, true-mobile target ownership,
constrained layout, installed package behavior, and actual Browser interruption.

## Finding 4 — Public-surface classifications are coherent but unproved in package

The present source policy intentionally differs by family:

- Alert: root export, internal folder classification, no Alert subpath;
- Card: root and published subpath;
- Slider: root and published subpath;
- Tabs: published subpath, not a root component export.

That split is not itself a defect. Preserve it unless an explicit clean-break
decision changes the public taxonomy. Alert's `alertVariants` is currently root
public and must not disappear accidentally while breaking the barrel cycle.

The CSS/runtime closure differs substantially:

- Alert depends on generated utility classes and theme/material variables;
- Card depends on its colocated style partial plus shared Glass/theme styles;
- Slider depends on scoped SFC CSS plus track-well, liquid-fill, value marks,
  responsive/a11y and theme layers;
- Tabs depends on component JavaScript, segmented/drag/capsule styles, motion
  code, and the once-per-Document application refract bootstrap.

`tests/public-surface.spec.ts` verifies source aliases, not packed and installed
artifacts. Current mutable `dist`, the 7.0.0 package version, and the live source
demo cannot prove the future immutable-8 closure. Both public style entries,
`./styles` and `./styles.css`, must carry their declared defaults after build,
pack, install, and serve.

**Required package mutations**

1. Delete a required CSS partial from either public style entry while source
   imports remain green: installed computed paint must fail.
2. Omit one root/subpath export or declaration file: the exact consumer fixture
   fails import/type resolution.
3. Serve source-linked Glass while claiming installed-package equality: artifact
   identity fails closed.
4. Change the optional-peer state while leaving prose unchanged: positive and
   negative installed fixtures disagree with package policy.
5. Restore private story selectors/copies after public-seam migration: the
   internal-reach census fails even if pixels happen to match.

This routes to existing public-8, `R-CSS-PUBLISHED-REACH`, MATERIAL W4/W8, and
`R-TRACK-PUBLIC-BREAK` authorities. It creates no consumer repin permission.

## Preserved GREEN invariants

These directions survive the failure-assuming review:

1. C35 is a truthful, useful Browser discovery packet and does not claim product
   or immutable-package acceptance.
2. Alert announcement behavior remains a valid semantic source invariant.
3. Card's semantic radius role is a legitimate reference direction; its package
   paint is simply not yet proven.
4. Slider keeps native semantic thumbs mounted and keyboard ArrowRight changes
   value; the handler is not inert.
5. Slider's shared track-well, liquid-fill, marks, and typed background/token
   direction are preferable to copied receiver paint.
6. Tabs retains roving/manual/RTL semantic coverage and component-side refract
   auto-arm is absent.
7. One shared selection/motion substrate remains the correct KISS direction;
   the defect is its current dual authority and unconditional lifetime, not a
   need for a second motion engine.
8. No new tranche row is required. All mechanisms route to existing owners.

## Existing-owner routing

| Mechanism | Existing owner | Binding correction |
|---|---|---|
| Alert radius/material/type | `BJ.W-ALERT-IDIOM`, MATERIAL W1/W2, A11Y W3 | Treat radius as one role in full idiomatic material; do not mint a local token by default. |
| Alert self-barrel SCC | `R-DAG-TRUEUP` / `BJ.W-COLO-3` | Move/import the defining recipe from a leaf; preserve public `alertVariants`. |
| Slider coarse owner and focus | A11Y linkage W2-E/W2-F; DOC-TRUTH T31/T32 | Prove real action ownership and natural focus modality; computed halo size is insufficient. |
| Slider track/material/package | `BJ.W-TRACK-DRY`, `R-TRACK-PUBLIC-BREAK`, Slider/iOS-final material owner | Preserve public typed seams, remove private story selectors, prove both CSS entries installed. |
| Tabs one geometry/drag system | `R-TABS`, iOS FINAL W5, Glass UX apotheosis | One selected-geometry authority, capability-scoped listeners, responsive transactional identity. |
| Tabs adornment branches | G5 / `R-TABS-ADORN` | Share one renderer and one stable adornment cell before consumer adoption. |
| Tabs refraction | MATERIAL W8 | Preserve no component auto-arm; prove one per-Document root installer later. |
| Public package closure | public-8 ledger, `R-CSS-PUBLISHED-REACH`, MATERIAL W4/W8 | Immutable source -> build -> pack -> install -> serve with exact root/subpath/style fixtures. |

## Missing evidence before adjudication can close this cohort

1. Exact source, built, packed, installed, and served artifact identities for one
   immutable candidate, not current mutable source/dist equivalence.
2. Exact Browser engine/version plus Chromium and actual Safari/VoiceOver cells.
3. Tabs true-coarse control rectangles and trusted target/action sequences;
   constrained-width, responsive transition, drag/cancel/reversal, scroll, RTL,
   DPR, focus reveal, PRM, and panel-identity proof.
4. Slider trusted pointer event paths and resulting value mutations at center,
   four corners, and four edge midpoints; neighbor isolation; natural Tab versus
   pointer focus-visible proof; multi-thumb and orientation/RTL/inversion parity.
5. Alert/Card computed paint from both installed public style entries, including
   radius, blur, rim, tone, typography, contrast, and theme parity.
6. Positive/negative optional-peer fixtures for `/tabs` and exact root/subpath
   import/type fixtures for all four public classifications.
7. A clean unchanged test/source envelope after the foreign governance edit is
   independently reconciled; no current passing suite may impersonate that.

## Final disposition

C35 correctly detects three important visual truths: Alert is too sharp relative
to Card; Slider's semantic thumb does not own the proposed 44px envelope; and
Tabs is not credibly usable at the retained true-mobile posture. Its directional
conclusions should be retained.

The systems verdict remains RED because:

- Alert also contains a live self-barrel SCC and its idiomaticity debt is wider
  than radius;
- Slider's detector proves semantic ownership ambiguity but not yet terminal
  pointer-action failure;
- Tabs has two selected-geometry authorities, unconditional shared drag lifetime,
  responsive model/ARIA split-brain, duplicated render paths, and an unresolved
  optional-peer contract;
- source aliases and a source-served demo cannot prove public package closure.

No clean chain, package cut, consumer repin, or acceptance follows. The cohort
should proceed to its third unchanged-byte challenge and separate adjudication,
agglomerating these corrections into the existing owners above.
