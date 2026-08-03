# W8 cross-repository bootstrap adjudication C4

Date: 2026-07-22  
Scope: downstream ownership correction to C3 W8 item 8 and mutations S20/S28/S32  
Disposition: **three-pass correction accepted; producer state-machine design retained; consumer adoption remains RED**

## Authority and correction boundary

The frozen C3 producer packet remains
`W8-LUNA-STATE-MACHINE-DESIGN-C3.md`
(`60047f9ccc4aa50ad2e26b9e4fe2d69473b51bb3a68eec5cd7bfead93b1dc076`). Its root-pure detector,
per-Document state, probe, verdict, cleanup, disposal and package laws are unchanged. This C4 overlay
corrects only C3 item 8, the synthesis adoption sentence, and the downstream interpretation of S20,
S28 and S32. Do not back-edit or silently relabel the C3 bytes.

The correction survived three independent reads: the live cross-repository census, a Sol x-high
application-owner audit, and a separate Sol x-high mutation/HMR challenge. All were read-only. No source,
test, package, lock or receiver was changed.

## Frozen moving-tree census

| repository | pin and exact witness | actual role | current W8 state |
| --- | --- | --- | --- |
| Glass | `0371836dfeeb3b7982250d612f93b5347a1d29d4`; `demo/main.ts` `6e738bbc…`; dirty detector `8295afbc…` | library plus Vite demo | demo calls old void API from leaf alias at lines 6–13; no retained disposer or accepted-HMR proof |
| value.js | `c654824e0b252cda7f8490b67f182a48c48cc0ed`; `demo/color-picker/index.html` `a0c0e076…`; package `5be878cd…` | Glass-free library plus one browser color-picker demo and a separate Node API | real browser root is inline module lines 205–213; no arm/disposer; dependency is `^7.0.0` |
| keyframes.js | `a59d3a22da080a8ed224e8d675112bb3bb0135b0`; `demo/app/main.ts` `6f0c148b…`; package `57b33882…` | Glass-free library plus Vite demo | no live `.glass-lens`; installed Glass 7.0.0 is extraneous because the manifest declares no Glass edge |
| Atlas | `8246863f9852508847f1f44e3b414fad688b993f`; package `901d775b…` | 16-entry published rendering library; no app HTML/main/createApp root | invalid Document-owner target; peer is `^7.0.0`, dev pin is `7.0.0` |
| SCI | `3d8d65729594229141a4747eda322186f3380fb8`; `dashboards/main.ts` `6c612a31…`; dashboards package `74716c31…` | Connectivity Atlas browser application and Cloudflare Pages root | real root is lines 84–120; no arm/disposer; exact runtime pin is `7.0.0` |

`npm ls @mkbabb/glass-ui --depth=0 --json` confirms declared 7.0.0 artifacts in value.js and Atlas,
SCI's dashboards dependency through its workspace, and an explicitly `extraneous` 7.0.0 artifact in
keyframes. These are discovery identities, not candidate acceptance.

## Correct ownership topology

There are three current positive browser roots:

1. **Glass demo** — `demo/main.ts`, before `createApp`. It has literal `.glass-lens` receivers. Consume
   the source public root barrel rather than the leaf `@glass/composables/glass` path; the separate
   installed fixture proves the package-name root. Do not make development serve stale `dist` merely to
   spell the package name.
2. **value.js color-picker demo** — the inline module in `demo/color-picker/index.html:205-213`, before
   `createApp`. Never place the arm in `src/` or the Node/Hono `api/src/main.ts` root.
3. **SCI dashboards** — `dashboards/main.ts`, before `createApp`. One root owner reaches both current
   pill receivers: Gallery `GalleryView.vue:167-194` (`5714cfde…`) and VFT conditions
   `Point.vue:91-98` (`82bb5cd8…`). Neither component or route may arm locally.

There are two negative controls:

- **Atlas gets no call.** It owns no Document. A barrel, Vite preset or component-side arm would mutate
  whichever host imports a library declared JS-side-effect-free. Atlas receives only Glass-8 peer/dev,
  lock, build and installed-consumer compatibility work.
- **keyframes remains unarmed for this cut.** Its demo presently has no live `.glass-lens`; its local
  `KfPillTabs` is not receiver proof. W4 still requires a declared exact demo/tooling Glass edge and
  clean install because the demo imports Glass elsewhere. When a live lens receiver is added, the
  positive-root manifest and bootstrap must change atomically; pre-arming an unused feature is not
  fleet-completeness credit.

This is why the C3 five-repository call list is unsafe. Atlas and SCI would share one Document; repeated
installer calls intentionally return the same disposer. If both registered it, disposal by library/HMR
code could tear down SCI's canonical lifetime. A repository name, package repin or receiver component is
not an application root.

## HMR law: a disposer is not a boundary

The producer's returned-disposer model remains required. Vite's official HMR contract says `hot.dispose`
records cleanup for a module that is self-accepted or expected to be accepted; it does not itself create
an accepted boundary. Ordinary entry updates may full-reload and replace the entire Document, in which
case same-Document disposer execution is neither assumed nor claimed.

For every positive root:

- retain exactly one returned disposer in the owning bootstrap module;
- register it under `if (import.meta.hot) { ... }` only where the real update topology makes that module
  an accepted same-Document generation; do not add `hot.accept()` to a Vue application entry if doing so
  would self-accept app creation without an app-unmount/recreate contract;
- otherwise record the observed full-reload/new-Document path and grant no same-Document HMR credit.

The producer HMR fixture must be genuinely self-accepted and prove generation A dispose → generation B
fresh import → one B probe/latch; calling stale disposer A again cannot remove B; B disposal removes all
current latch/probe/state. A cache reset or `hot.dispose` registration without an accepted update is not
evidence.

## Corrected born-RED mutations

| id | corrected mutation | required failure |
| --- | --- | --- |
| S20 | remove the root call from one installed functional-positive application fixture while `/tabs` remains side-effect-free | named root is unarmed before mount and natural receiver paint; no component hook may rescue it |
| S28 | in a real accepted same-Document HMR fixture omit/no-op/misdirect A's disposer, import B, then call stale A and dispose B | cleanup order, one-fresh-probe, stale-disposer isolation or terminal cleanup fails |
| S32a | delete Glass-demo, Value-demo or SCI adoption one at a time or change its exact candidate import/lock | receiver-derived positive-root manifest names the omission |
| S32b | inject an arm into Glass/value/keyframes/Atlas library source, Value API, Atlas Vite preset, SCI receiver or any second module | negative ownership/chunk-purity/one-owner gate fails |
| S32c | add a live keyframes lens receiver without atomically adding its exact root adoption and package edge | unclassified receiver-owning root fails closed |

The positive-root oracle is external to the mutated application files. It freezes exact application
roots and exact live receiver evidence; it is not a self-authored list beside the calls it validates.

## Corrected downstream transaction

After Luna lands the C3 producer state machine and one unique immutable Glass 8 artifact passes
source→build→pack→install→serve equality:

1. prove the package root export and recursive `/tabs` detector/probe purity;
2. adopt exactly the three positive roots above from the same immutable identity;
3. make value.js exact, add the exact keyframes demo/tooling dependency without polluting its published
   library graph, update Atlas peer/dev compatibility without an arm, and exact-lock SCI;
4. prove SCI's single owner reaches both Gallery and VFT OFF, real-ON, forced-false-positive and
   first-sharp cells, while keyframes and Atlas remain negative controls;
5. prove the real HMR/full-reload topology honestly; and
6. obtain current Chromium, actual Safari/VoiceOver and two unchanged-byte Sol x-high critics.

No component arm, library side effect, unused keyframes arm, second framework lease, server-root call,
source link, mutable 7.0 repin or HMR-by-registration claim is authorized.
