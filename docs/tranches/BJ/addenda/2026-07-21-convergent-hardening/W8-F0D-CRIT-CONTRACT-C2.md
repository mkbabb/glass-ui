# MATERIAL W8 `f0d32d69` post-redress contract critic — candidate 2

**Verdict:** **RED · NARROW RECEIVER CURE / CONTRACT REJECTED / ACCEPTANCE-RED**  
**Critic seat:** Sol x-high, exact-byte post-redress formation audit only  
**Audited commit / HEAD:** `f0d32d6915790ea97df383a4a486e3296f2b43d5`  
**Parent:** `bb33810cb26debe77436c59df231814693b6fe65`  
**Commit tree:** `fdd332f76bc19a8302f923f2911137f62b517450`  
**Audit date:** 2026-07-22 EDT

`f0d32d69` fixes one concrete symptom: a mounted shipped `SegmentedTabs` now invokes the existing
refraction installer, so its pill indicator can set the Chromium latch without a consumer edit. That
is a real, narrow cure and the WebKit blur floor remains worth keeping.

It is not an acceptable replacement for the already-selected once-per-application bootstrap. The
call is unconditional at `SegmentedTabs.vue:156`, including the underline material and responsive
Select-only branch that render no `.glass-lens`. It mutates `document.documentElement`, thereby
changing every lens in every application on the page according to whether this particular component
happened to mount. The package now has two installation contracts—hidden component installation for
some shipped surfaces and explicit root installation for custom surfaces—and the hidden path masks
the fact that live SCI has not adopted the application-root contract.

The redress changes only four files and adds no test or evidence bytes. Its comments correctly admit
that the standing gate cannot see the armed path, then accept one-time live-π as the substitute. That
cannot discharge the candidate-2 requirements for false-positive ON, lifecycle/stale/throw,
collision, recapture honesty, or observable garnish. The unchanged real module still reproduces the
stale-root and thrown-`CSS.supports` failures deterministically.

## 1. Exact byte pin

The shared worktree contained foreign A11Y/demo/formation changes. This critic audits the committed
tree, not those moving bytes. Before this report was written:

- porcelain-status digest: `f2bd95f4991df3463a42e29b73733407d95544d6e743b5e9d6a984f932526b79`;
- tracked dirty-patch digest: `30754124dbbafdc1bcf371c5fdf8906e103612dddc317f118e336188449f3cc7`;
- untracked-path digest: `5e15bd39ba4f4898f1812671949e8b398575dae7631f788da79de2e81f911e98`.

`git diff-tree` reports exactly four committed modifications:

1. `MIGRATION.md`;
2. `docs/tranches/BJ/waves/BAND-MATERIAL.md`;
3. `src/components/tabs/SegmentedTabs.vue`;
4. `src/composables/glass/supportsBackdropRefract.ts`.

| Exact `f0d32d69` artifact | SHA-256 |
| --- | --- |
| `MIGRATION.md` | `623665fa69ed574f8b5f1401ee5768e4c4ee202c4d0d32832e7143ac01ea9005` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `62a397b9b03a4653733c305fca0311b45101023a6985f010e928c5a083486842` |
| `src/components/tabs/SegmentedTabs.vue` | `7827869c8b06821332a6b16656e5a43db5826e41e454f4e74587e3b8cb3d3b6e` |
| `src/composables/glass/supportsBackdropRefract.ts` | `421c0023251d4830a7c0d879535bd24d8a0dcbebfa445ceb2da37c83812c5a71` |
| `src/composables/glass/index.ts` | `6a7fb10985394ce798888bb7bf65fc5be3320b9bf50ae7173ffa572696ac8eff` |
| `src/index.ts` | `ec908e10ed4c460d650ff42748e1e35db09b5d0bb938a7f42c3750fb2bfe3e73` |
| `package.json` | `39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb` |
| `demo/main.ts` | `6e738bbce8ac3a8136996e53d3204cf62932baf53387e830d80e77dd952d9be9` |
| `tests/components/custom/tabs/segmented-tabs.test.ts` | `040c3839acb8921bc8c07e33c8e722c586c16b1ab65189f529d7b304bff34d3f` |
| `tests-visual/refract-lens-never-sharper.spec.ts` | `4e529b81bd14a05d77626d414ad2717e705500570b900730c89dcdf4f60e9851` |

## 2. Independent bounded checks

### Source and existing component tests

- `npx vue-tsc --noEmit --project tsconfig.src.json` — **PASS**.
- `npx vitest run tests/components/custom/tabs/segmented-tabs.test.ts` — **13/13 PASS** in 916 ms.
  An initial attempt named a reporter this Vitest version does not provide and failed before test
  collection; the default-reporter rerun above is the product result.
- The 13 tests contain no `armGlassRefract`, `data-glass-refract`, positive/negative probe, root
  mutation, or variant-specific installation assertion. Their pass proves that the new mounted hook
  does not break the existing tabs interactions in the test DOM; it does not prove the new contract.

### Exact-archive package build and tree-shaking shape

An isolated `git archive f0d32d69` with the installed dependency tree completed `npm run build`.
The emitted root entry still exports both `armGlassRefract` and `supportsBackdropRefract`. The
`/tabs` entry changed in the material way the package metadata comment says should remain explicit:

- parent `bb33810c` `dist/tabs.js`: 9,718 bytes, SHA-256
  `2d8b99268e192cfff81a45374a0dfdb809ed77663561cc5abf795670fbabbc21`, with no refraction-probe
  import;
- `f0d32d69` `dist/tabs.js`: 9,785 bytes, SHA-256
  `800eab8d6aebf678878c421098e5b4f41a6729893616007626879605bb88713a`, statically importing
  `supportsBackdropRefract-B_U6gWtC.js`;
- that shared probe chunk is 1.57 kB raw / 0.74 kB gzip in this build and contains the fixed
  `gl-refract-probe`, DOM mount, Canvas2D readback, root-attribute write, and DOM-ready listener.

`sideEffects: ["*.css"]` does not prune this path because the function is a live dependency passed to
Vue's `onMounted`; nor does merely importing `/tabs` mutate the document. The precise contract is a
hidden **mount-time** global side effect, not an import-time one. Every consumer of `/tabs` now loads
the support chunk whether it renders pill glass, underline paper, or only the responsive Select.

### Real-module lifecycle trace

A cache-busted Node 26 import of the exact TypeScript module used bounded fake DOM/CSS seams without
editing source. The inherited defects are unchanged:

```json
{"case":"stale-negative","threw":false,"attr":"on"}
{"case":"supports-throw","first":"forced supports failure","second":null,"attr":"on"}
```

On honest rejection, a pre-existing `data-glass-refract="on"` remains. When `CSS.supports` throws,
the first call escapes, `armed` was already set, the second call becomes a no-op, and stale `on`
remains. The comment-only edit to `supportsBackdropRefract.ts` cannot change either result.

### Real receiver census

At live SCI `34c8d8e734d015d757edb60d8f7b176ce744c0df`:

- `dashboards/home/gallery/GalleryView.vue:20,167-194` imports and mounts pill `SegmentedTabs` from
  `@mkbabb/glass-ui/tabs`;
- `dashboards/vft-germination/story/points/03-the-conditions/Point.vue:14,91-98` is the second pill
  receiver;
- `dashboards/main.ts:1-120` owns the application bootstrap and has no `armGlassRefract` call;
- `dashboards/package.json` remains pinned to Glass `7.0.0` during this audit.

Thus the redress would make those two receivers arm after their component mount when SCI eventually
repins, but it does not prove or install the selected root contract. It makes a missing root adoption
harder to detect: a gallery visit can globally enable unrelated custom lenses, while an application
path with no shipped SegmentedTabs leaves the same lenses blur-only. Atlas itself has no current
SegmentedTabs consumer in the inspected source and remains on its own older Glass pin; it supplies no
independent root witness.

## 3. Verdict ledger

| ID | Status | Exact finding | Smallest existing-owner redress |
| --- | --- | --- | --- |
| F0D-01 | **PASS** | The original safe-floor source repair remains intact. The un-gated blur base is outside `:root[data-glass-refract="on"]`, so rejecting the detector still leaves the intended floor. | Keep the W8 CSS repair; do not restore the lying `@supports` gate. |
| F0D-02 | **PASS** | The package-root export at `src/index.ts:163` survives an exact-archive build. The demo still contains a legitimate once-per-root source witness at `demo/main.ts:6-13`. | Keep the public root export and the demo root call. |
| F0D-03 | **PASS, narrow** | A mounted pill `SegmentedTabs` now calls the installer, curing the immediate shipped-pill blur-only symptom in a positive engine without requiring that receiver to know the API. | Bank this only as proof that the missing-caller mechanism was understood. It does not select the caller's architectural owner. |
| F0D-04 | **DEFECT** | `onMounted(armGlassRefract)` is unconditional. `SegmentedTabs.vue:160` resolves underline, `:311-338` can render only a responsive Select, and `:374-389` renders `.glass-lens` only for the pill; all three shapes still arm the document root. A component that paints no lens therefore changes every lens in the page. | Remove the component import/hook and its auto-arm comments. Preserve one explicit application-root owner. Born-RED: restoring a component→root-installer edge fails the source/dependency census, and emitted `/tabs` must not import the probe chunk. |
| F0D-05 | **DEFECT** | The redress creates order-dependent ambient behavior. Custom `.glass-lens` surfaces are blur-only until some shipped SegmentedTabs mounts; afterward they change globally. Two apps or asynchronously mounted routes on one document therefore receive behavior based on unrelated mount order rather than their own bootstrap. Unmount does not reverse the session latch. | Installed-consumer tests call the public root installer before application mount and prove the same result with no SegmentedTabs present. Remove the app-root call mutation: the integration gate must RED even if a later tab mount would have hidden it. |
| F0D-06 | **HOLD / timing** | Vue normally runs `onMounted` in the mount task, but the tranche retains no first-painted-frame proof for client mount, lazy route mount, or hydrated server markup. The component hook cannot guarantee that the lens was armed before an earlier custom/SSR surface painted. | Root-bootstrap fixture records installer completion, first application mount, root-attr state, and first painted lens frame. Do not award pre-paint behavior from hook timing prose. |
| F0D-07 | **DEFECT** | The `sideEffects:["*.css"]` rationale is internally split. It correctly rejects a hidden module-load installer, but the redress hides the same document-global decision behind a live component mount. Exact output proves `/tabs` now statically loads the probe chunk even for non-lens variants. | Keep installation explicit at the application root. Prove a built installed consumer retains the called root export under tree-shaking; keep `/tabs` free of installer ownership. |
| F0D-08 | **DEFECT** | The new migration text defines two contracts: shipped components “need no action,” while custom lenses require bootstrap. A page containing both changes custom-lens behavior merely by adding/removing a tabs component. That is not one supported material contract. | MIGRATION/README state one once-per-application bootstrap for all lens-bearing applications, with the no-bootstrap state explicitly blur-only. Update the known first-party roots before repin. |
| F0D-09 | **DEFECT** | Live SCI has the two exact pill receivers but no application-root call. The component hook makes those receivers appear integrated after repin while leaving the root adoption absent. Demo adoption and component self-installation are not real-consumer integration proof. | Add the one public call to SCI's owning bootstrap, then prove both real pill receivers ON in Chromium and at the blur floor in current WebKit. Re-run the frozen consumer census; no Atlas or Q shim. |
| F0D-10 | **DEFECT** | Stale-root and thrown-`CSS.supports` behavior is byte-unchanged and independently reproduced. `armed=true` still precedes the decision, and a negative/exception never removes stale `on`. Component mounting merely invokes the defective lifecycle more often. | In the existing installer, make the full decision total and reconcile the attr: positive sets exactly `on`; every negative or exception removes it; repeated calls are stable. Retain direct SSR/readiness/repeat/stale/throw tests. |
| F0D-11 | **DEFECT** | The fixed document-global `#gl-refract-probe` remains. No collision test or source change landed; a foreign same-id filter can still steer the proxy. | Generate a collision-proof per-invocation id, clean it on every path, and bite preseeded identity/force-red collisions. |
| F0D-12 | **DEFECT** | The standing visual test still never arms (`refract-lens-never-sharper.spec.ts:399-405`). A deleted hook/export, detector false-negative, latched-selector deletion, or detector false-positive on an accept-and-drop engine can all escape its OFF-only verdict. | Retain OFF, real functional ON, and forced false-positive ON arms on the same shipped CSS. Installer/export removal and proxy/backdrop divergence must turn the standing suite RED. |
| F0D-13 | **DEFECT** | The updated comments and band close explicitly reduce armed correctness to one-time live-π. A comment is not a detector, the retained JSON is not a replayable mutation, and one tested engine pair cannot police a future proxy/backdrop divergence. | Treat the old live-π as formation evidence. Retain the generating script, raw pixels/energies, browser builds, commands, tree digest, and the standing armed mutation arms. |
| F0D-14 | **DEFECT** | Recapture logic is untouched: a painted scene with a sharp twin still returns `null` at visual-spec line 312 and can be retried at lines 326-334 until a favorable paint appears. No delayed/omitted-filter mutation landed. | Retry only when the bare scene never painted. Once it paints, a sharp twin is product RED on the first such capture. Retain every attempt and threshold distribution. |
| F0D-15 | **DEFECT** | No new paint evidence landed. The prior Chromium ON corpus still lacks a phase-matched quantified displacement/rim delta; computed `url(...)` and a root attr do not prove observable garnish. | Quantify OFF→ON garnish on identical phase-aligned substrate while retaining the blur floor. Withdraw the garnish claim if the delta is not stable and observable. |
| F0D-16 | **HOLD** | Source typecheck, existing tabs tests, and exact package build are green. None assert the new component side effect, variant scoping, lifecycle, package-consumer root call, or real receiver paint. | Add contract tests in the existing W8 owners. Current green tests may be retained but cannot close the redress. |
| F0D-17 | **PASS / governance form** | The broad commit has a substantive WHY/WHAT/EVIDENCE/ROUTED REMAINDER body and truthfully admits that armed-path standing coverage remains deferred. It does not hide its compromise in a bodyless status stamp. | Preserve the historical commit and its truthful remainder; do not rewrite it. |
| F0D-18 | **DEFECT / model law** | `BAND-MATERIAL.md:929` records `model claude-opus-4-8`. That is honest history but postdates the prospective Sol/Luna supersession: bounded mechanical redress required Luna x-high. The wave also remains marked `§CLOSE — LANDED` while mandatory armed/lifecycle/integration proof is open. | Retain the real Opus label as a violation, execute the next bounded redress with Luna x-high, reopen acceptance truth, and run two fresh Sol x-high critics on the new exact bytes. |

## 4. Born-RED closure matrix

| Contract arm | Mutation that must bite | Acceptance proof |
| --- | --- | --- |
| application ownership | restore `onMounted(armGlassRefract)` in SegmentedTabs or any component | component-source/dependency census RED; exact emitted `/tabs` contains no installer/probe dependency; installed app calls root export once before mount |
| receiver adoption | remove the SCI root call while leaving both pill receivers | integration RED even if visiting Gallery would later mount tabs; no component warm-up may satisfy the root assertion |
| variant independence | mount only underline or responsive Select | no detector call/root mutation occurs from the component; application bootstrap alone controls the latch |
| OFF floor | restore lying `@supports` or place blur inside the latch | current WebKit video reads sharper than the blur twin |
| functional ON | omit the root installer, force detector false, or delete the latched selector | Chromium fails root state and phase-matched observable garnish while retaining the blur-floor assertion |
| false-positive ON | force proxy positive while real backdrop composite drops | the standing paint invariant REDs; it may not stay unarmed or rely on one-time prose |
| lifecycle | preseed `on`, reject or throw on either supports/probe arm | no exception escapes, attr is absent, repeat call stays stable, and blur-only paint remains |
| collision | preseed the old probe id with identity and force-red filters | neither foreign filter steers the result; no probe node leaks |
| capture honesty | paint the bare scene but delay/omit the twin's backdrop filter | first painted sharp-twin attempt REDs; no favorable recapture |
| garnish | delete displacement/rim contribution while leaving computed `url(...)` | quantified phase-matched OFF→ON delta REDs |

## 5. Smallest redress in existing owners

No new wave, material path, consumer shim, engine skin, or component-local fallback is warranted.

1. Keep the W8 CSS floor, conservative private probe shape, root export, and demo bootstrap.
2. Remove the `SegmentedTabs` import/hook and the “shipped components need no action” split contract.
3. Make `armGlassRefract()` total, stale-clearing, collision-safe, idempotent, and directly tested.
4. Publish one once-per-application root contract and adopt it at each known first-party root,
   including live SCI before its package repin. Prove the installed package/tree-shaken consumer.
5. Close OFF, functional ON, and false-positive ON paint arms; make the first painted sharp twin RED;
   quantify the Chromium garnish or withdraw that claim.
6. Update the receipt with exact commits/tree/dirty state and replayable evidence. Preserve the Opus
   history as a violation; use Luna x-high for bounded redress and two fresh Sol x-high critics after
   those bytes land.

## 6. Candidate-2 freeze ruling

**BLOCK candidate-2 freeze that treats `f0d32d69` as W8 acceptance, integration, gate closure, or an
approved auto-install contract.**

Candidate 2 may retain `f0d32d69` only as superseded implementation history and may retain the
underlying W8 blur-floor repair as source-green. Its normative bytes must explicitly reject the
component-local root mutation, require application-root adoption, and keep the inherited three-arm,
lifecycle, collision, recapture, garnish, receipt, and model obligations RED. Because the next
redress changes source and normative bytes, this critic cannot count as a post-redress approval of
that future candidate.
