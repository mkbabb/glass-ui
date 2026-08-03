# W8 current-head root-bootstrap audit C2

Date: 2026-07-22  
Existing owner: MATERIAL W8 `BJ.W-REFRACT-LATCH`  
Disposition: **SOURCE-GREEN / ROOT-EXPORT-GREEN / INTEGRATION-RED / ACCEPTANCE-RED**

## Exact inspected slice

The W8 slice is byte-identical between `620f0d37` and current HEAD `0169e935`; the intervening commit
changes only `tests/gates/orphan-css-partial.test.ts`.

| path | SHA-256 |
| --- | --- |
| `src/composables/glass/supportsBackdropRefract.ts` | `421c0023251d4830a7c0d879535bd24d8a0dcbebfa445ceb2da37c83812c5a71` |
| `src/components/tabs/SegmentedTabs.vue` | `7827869c8b06821332a6b16656e5a43db5826e41e454f4e74587e3b8cb3d3b6e` |
| `src/styles/glass-refract.css` | `24bd8523ce91cfd89fec33a45dfabda9c7c54d7743c030114a8c0025fb1ee720` |
| `src/composables/glass/index.ts` | `6a7fb10985394ce798888bb7bf65fc5be3320b9bf50ae7173ffa572696ac8eff` |
| `src/index.ts` | `ec908e10ed4c460d650ff42748e1e35db09b5d0bb938a7f42c3750fb2bfe3e73` |
| `demo/main.ts` | `6e738bbce8ac3a8136996e53d3204cf62932baf53387e830d80e77dd952d9be9` |
| `package.json` | `39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb` |
| `tests/components/custom/tabs/segmented-tabs.test.ts` | `040c3839acb8921bc8c07e33c8e722c586c16b1ab65189f529d7b304bff34d3f` |
| `tests-visual/refract-lens-never-sharper.spec.ts` | `4e529b81bd14a05d77626d414ad2717e705500570b900730c89dcdf4f60e9851` |

## Banked truth

- The CSS safe floor from `44621bb4` remains present.
- `armGlassRefract` is publicly reachable from the package root through the glass composable barrel.
- `demo/main.ts` demonstrates the intended once-per-app root call.
- No additional `/glass` package subpath is needed or authorized.

## Current integration defect

`SegmentedTabs.vue` still imports `armGlassRefract` and calls it from `onMounted`. That component-side
arm is not root adoption. It hides missing first-party bootstrap, makes every tabs instance a document
side-effect owner, and loads the detector even for responsive Select and non-lens underline variants;
only the pill path owns `.glass-lens` paint. The current package build therefore still carries the
premature `f0d32d69` architecture Q rejected.

The installer itself remains non-total:

- module-global `armed` is not scoped per `Document`;
- a fixed proxy id can collide with existing content;
- `CSS.supports` can throw and is not contained;
- `armed = true` is committed before the detector succeeds;
- stale `data-glass-refract="on"` state is never removed when a later probe is false;
- DOM-ready listener paths can duplicate work; and
- cleanup covers only part of the failure space.

## Why current tests do not close W8

The unit and visual surfaces do not bite:

1. omitted root adoption in a real first-party app;
2. retained component auto-arm;
3. lens-free `/tabs` dependency on the detector;
4. stale `on` state after a false result;
5. `CSS.supports` throwing;
6. fixed-id collision;
7. first-painted sharp-twin recapture;
8. a real runtime ON arm; or
9. a forced false-positive engine path.

The local dist copy likewise retains the component probe, so source/build presence is not integration
acceptance. No immutable installed consumer, current Safari/WebKit discrimination or SCI/Atlas root
adoption is proved by these bytes.

## Binding continuation

A bounded forward Luna x-high redress keeps the public root API and safe CSS floor while:

1. removing the `SegmentedTabs.onMounted` arm and its misleading prose;
2. making the installer per-document, total, id-collision-safe and reversible across true/false/throw;
3. adding direct mutation tests for component-arm retention, omitted root install, stale state, throw,
   collision and lens-free variants;
4. adding one build/package ownership gate proving the detector is reached only through the public root
   API; and
5. explicitly adopting that root call once in every first-party app, including SCI/Atlas consumers.

Terminal proof retains OFF, real ON and forced-false-positive paint arms, fails the first painted sharp
twin immediately, records exact immutable package/served identity, and runs Chromium plus actual
Safari. Q then proves Gallery and VFT natural receivers. No component auto-arm, duplicate detector,
engine-specific skin, consumer shim or source-only close follows. Two fresh unchanged-byte Sol x-high
critics remain required.
