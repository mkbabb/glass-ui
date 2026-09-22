# Lane DA—RECORD (O-23/O-32 cure wave, dom-a11y)

Datum: master `e5ac97f2` (the 10.0.0 tree). Model: claude-opus-5-5[1m]. Rulings of record:
`../RULINGS.md` §A (dom-a11y), §B, §C row DA. Evidence: `../seats/investigate__dom-a11y.json` +
`../seats/verify__dom-a11y.json` (the verifier's A-2 split and L-6 `:63` site adopted).

Status: §3.2, §3.3, §3.4, L-6 CURED. **A-2 persistent arm STOPPED**—the ruled live check measured
the opposite of its precondition (a persistent control DOES come under a stationary pointer during
the hover morph, and the cured guard then passes an unaimed click). The cure and its witness are
banked below verbatim; `useDockClickIntegrity.ts` is left at HEAD bytes. §3.1 and L-7 are ANSWER rows
(untouched). [2026-09-22 · A-2 re-ruled (a) LAND AS IS at b13a792e: the banked arm and witness are restored to the tree, RED→GREEN re-run recorded under A-2; the measured geometry stays as the known bound—a press within 4 px of a persistent control's inline edge during the morph activates the control it visibly hovers.]

Gates stay 60: every witness is a test row in the ordinary `npm test` tree (§B-2); nothing under
`tests/gates`, no roster/receipt change. Roster delta: none (no export added, renamed or removed).

## §3.2—aria-modal on Dialog + Sheet (CURED)

- `src/components/dialog/DialogContent.vue:197` (new, after the `v-bind` spread at :196):
  `:aria-modal="dialogRoot.modal.value ? 'true' : undefined"`
- `src/components/sheet/SheetContent.vue:299` (new, after the spread at :298): the same binding
  (`dialogRoot` already injected at :109). CommandDialog composes DialogContent and inherits it.
- Witnesses: `tests/components/dialog/dialog-attrs.test.ts` (new describe "DialogContent—aria-modal
  follows the root's modal flag", 2 its) and `tests/components/sheet/sheet-attrs.test.ts` (new file,
  the Sheet pair, 2 its). The `:modal="false"` its are guards (pass at HEAD: absent); the modal its
  are the born-RED arms.

RED (HEAD source):
```
 FAIL  tests/components/dialog/dialog-attrs.test.ts > DialogContent — aria-modal follows the root's modal flag > stamps aria-modal="true" on a modal dialog (the default)
AssertionError: expected null to be 'true' // Object.is equality
 ❯ tests/components/dialog/dialog-attrs.test.ts:113:52
 FAIL  tests/components/sheet/sheet-attrs.test.ts > SheetContent — aria-modal follows the root's modal flag > stamps aria-modal="true" on a modal sheet (the default)
AssertionError: expected null to be 'true' // Object.is equality
 ❯ tests/components/sheet/sheet-attrs.test.ts:40:52
      Tests  2 failed | 5 passed (7)
```
GREEN (cured):
```
 Test Files  2 passed (2)
      Tests  7 passed (7)
```

## §3.3 BREAKING—useSidebarFollow exemption attribute (CURED)

- `src/composables/sidebar/useSidebarFollow.ts:156` before
  `if (target?.closest("[data-toc-id], .sidebar-top-btn")) return;` → `:160` after
  `if (target?.closest("[data-toc-id], [data-sidebar-follow-exempt]")) return;`—the class match is
  deleted, no dual selector.
- Docblock `:7-10` (new, dated bracket under the "Manual override" bullet): names both attributes and
  states no class name is matched.
- `grep -rn sidebar-top-btn src demo tests` → only the witness's negative case.
- Witness: `tests/composables/sidebar/useSidebarFollow.test.ts` (new, happy-dom; nav
  clientHeight 100 / scrollHeight 2000, target offsetTop 1000 stubbed; pointerdown, then activeId →
  "far", 8 frames). Four its: exempt attribute follows, `[data-toc-id]` follows, unmarked button
  suspends, `.sidebar-top-btn` suspends.

RED (HEAD source):
```
 FAIL  tests/composables/sidebar/useSidebarFollow.test.ts > useSidebarFollow — the manual-override exemption > keeps following after a press on a [data-sidebar-follow-exempt] control
AssertionError: expected 0 to be greater than 0
 ❯ tests/composables/sidebar/useSidebarFollow.test.ts:69:27
 FAIL  tests/composables/sidebar/useSidebarFollow.test.ts > useSidebarFollow — the manual-override exemption > matches no consumer class name — a .sidebar-top-btn press suspends
AssertionError: expected 828.469020414419 to be +0 // Object.is equality
 ❯ tests/composables/sidebar/useSidebarFollow.test.ts:92:27
      Tests  2 failed | 2 passed (4)
```
GREEN (cured):
```
 Test Files  1 passed (1)
      Tests  4 passed (4)
```

## §3.4 BREAKING—parentId is the direct parent (CURED)

- `src/composables/sidebar/useTreeIndex.ts:43` before `parentId: depth === 0 ? node.id : parentId,`
  → after `parentId,`; `:48-54` before the recursion passed `depth === 0 ? node.id : parentId` →
  `:48` after `walk(children, depth + 1, node.id, rid, ri);`. `rootId` unchanged.
- `src/composables/sidebar/useScrollTracker.ts:43` before `…get(activeId.value)?.parentId ?? null`
  → after `…?.rootId ?? null`.
- `src/composables/sidebar/types.ts:19` before `/** Direct parent ID (self.id for root nodes). */` →
  `:19-23` after "Direct parent ID (null for root nodes)." + dated bracket naming the old shape and
  pointing at `rootId`.
- `tests/composables/sidebar/useScrollTo.test.ts:32` fixture `parentId: id` → `parentId: null`
  (fixture honesty, not a witness).
- `isInActiveChain` (both the composable's and the pure export) unchanged; its answers are
  witnessed unchanged on the 4-level fixture.
- In-tree census after the cure: `grep -rn parentId src demo tests`—the demo's
  `virtual-section.vue:27`, `dock-search.vue:78` and `tests/demo/virtual-section-layout.test.ts:22`
  already author null for roots; `tests/demo/virtual-section-layout.test.ts` green.

Witness 1, `tests/composables/sidebar/useTreeIndex.test.ts` (new describe, 4-level fixture
root>child>grandchild>great, root>sibling, other): RED (HEAD source):
```
 FAIL  tests/composables/sidebar/useTreeIndex.test.ts > sidebar tree index — parentId is the direct parent > names each entry's direct parent, null at the roots
AssertionError: expected 'root' to be null
 ❯ tests/composables/sidebar/useTreeIndex.test.ts:58:45
      Tests  1 failed | 8 passed (9)
```
Witness 2, `tests/composables/sidebar/useScrollTracker.test.ts` (new describe, activeRootId at a
depth-2 active node). At HEAD it passes by the defect (parentId there IS the root), so its born-RED
run is against the stage the ruling guards: `useTreeIndex.ts` cured, `useScrollTracker.ts` not yet:
```
 FAIL  tests/composables/sidebar/useScrollTracker.test.ts > useScrollTracker — activeRootId names the root at any depth > resolves the root, not the direct parent, for a depth-2 active node
AssertionError: expected 'child-x1' to be 'root-x' // Object.is equality
 ❯ tests/composables/sidebar/useScrollTracker.test.ts:261:43
      Tests  1 failed | 8 passed (9)
```
GREEN (all four files cured, sidebar dir + the demo layout test):
```
 Test Files  6 passed (6)
      Tests  28 passed (28)
```

## L-6—tooltip leading + docblocks (CURED)

- `src/styles/glass/overlay-plate.css:119` (new) `line-height: var(--type-leading-caption);` beside
  `font-size: var(--tooltip-text);` in `.glass-overlay-plate[data-reveal="tooltip"]`; the arm's
  docblock `:98-101` gains a dated bracket naming the size+leading pairing. No token minted.
- `src/styles/tokens/offsets.css:63` before
  "EXISTING raw literals (`min-w-32` / `max-h-[60vh]` / tooltip `text-sm` /" → after
  "EXISTING raw literals (`min-w-32` / `max-h-[60vh]` /" (`:64` byte-identical). [2026-09-22 · adjudication: the :59-65 docblock carries the dated bracket the house law requires for the :63 deletion; the tooltip docblock below now sits at :95-100.]
- `src/styles/tokens/offsets.css:93-96` before "The tooltip type rung—the golden quiet caption
  register (√φ ladder), the token-backing of the bare `text-sm` on TooltipContent (the overlay share
  of class 3). …" → `:93-98` after "The tooltip type rung. Read as font-size by the tooltip arm of
  glass/overlay-plate.css, which pairs it with `--type-leading-caption`; defaults to `--type-caption`
  so the chip reads the house caption rung; a consumer retunes it from `:root`." + dated bracket
  (no `text-sm` since 7.0.0; the caption rung is not on the √φ ladder). Offsets below :98 shift +2;
  AC2's `:33-40` fence is above and untouched.
- Witness: `tests/styles/overlay-plate-available-height.test.ts` (new describe "the hint role's
  leading"). RED (HEAD source):
```
 FAIL  tests/styles/overlay-plate-available-height.test.ts > overlay plate — the hint role's leading > pairs the caption size with the caption leading
AssertionError: expected '\n        --radius-ctx: var(--radius-…' to match /line-height\s*:\s*var\(--type-leading…/
 ❯ tests/styles/overlay-plate-available-height.test.ts:88:25
      Tests  1 failed | 3 passed (4)
```
GREEN (cured):
```
 Test Files  1 passed (1)
      Tests  4 passed (4)
```
- Paint: per the ruling, the 2.4 px block change (12 px line box 18 → 15.6 px at the caption floor)
  rides the next live-π band; no separate probe run.

## A-2—the persistent arm (STOPPED → LANDED [2026-09-22 · re-ruled (a) at b13a792e])

`.dock-persistent` verified at HEAD: `GlassDock.vue:418` (`#persistent`) and `:525-526`
(`dock-persistent dock-persistent-end`). The cure was written as ruled (a `.closest(".dock-persistent")`
arm in `onClickCapture`, no listener, no `markMorphStart`, no prop) and its SFC witness went RED → GREEN:
```
RED (HEAD source)
     × passes a same-control press inside #persistent 103ms
     × passes a press on the glyph whose click lands on its #persistent button 60ms
     × passes a same-control press inside #persistent-end 57ms
AssertionError: expected "vi.fn()" to be called once, but got 0 times
 ❯ tests/components/custom/dock/GlassDock.click-integrity.test.ts:81:30
      Tests  3 failed | 2 passed (5)
GREEN (cured, whole dock dir)
 Test Files  14 passed (14)
      Tests  118 passed | 1 expected fail (119)
```
Then the ruled live check. Chromium (playwright 1.61.1, headless), a private `vite` dev server on
:5417 (no dist, no build lock needed), `/dock/overview`, the "Starts compact" dock
(`[data-testid="dock-horizontal-collapsed-first-paint"]`), viewport 1280×900. The pointer parks at
(2,2) for 1.2 s, moves ONCE onto the dock, then stays still; a rAF sampler records
`elementFromPoint` at the pointer and the `.dock-persistent` box each frame for 1.8 s.

Measured boxes (x, y, w, h):
- rest: root 384.19, 509.75, 56, 56; `.dock-persistent` 392.19, 517.75, 40, 40.
- during the morph (data-morphing, ~61 frames, t ≈ 76–600 ms): root box unchanged; `.dock-persistent`
  x drifts 392.19 → 396.19 (the collapsed→expanded pad, 8 → 12 px); the hovered Home button itself
  measures 394.19, w 44 (its hover lift).
- settled: root 298.69, 509.75, 227, 56; `.dock-persistent` 310.69, 517.75, 40, 40.

Hit sequence at a stationary pointer:
| pointer x (y 537.8) | at rest | during morph | persistent hits while morphing |
| --- | --- | --- | --- |
| 412.2 (on Home) | Home | Home | 61/61 (the legitimate case) |
| 434.2 (plate pad, 2 px inside the inline-end edge) | dock-plate | **Home from t = 164 ms** | **55/61** |
| 436.2 (on the edge) | dock-plate | dock-plate | 0/62 |

A real press at the 434.19 pointer (mouse down/up at 300 ms and 450 ms after the move, a click
listener on Home):
| guard | press at 300 ms | press at 450 ms |
| --- | --- | --- |
| cured (persistent arm) | hit Home, morphing, **Home click fired (1)** | hit Home, morphing, **fired (1)** |
| HEAD | hit Home, morphing, swallowed (0) | swallowed (0) |

So the precondition the ruling and the verifier set ("a persistent control does not slide under a
stationary pointer during the hover morph") is false in Chromium: the persistent region never swaps
layers, but it moves (a 4 px pad drift, plus the control's hover lift), and a pointer resting on the
plate's inline-end pad ends up over Home. The cured guard then activates Home for a press aimed at no
control—the race-(b) shape the guard exists to defer. The row is STOPPED as ruled; no workaround
substituted (a morph-start identity snapshot would be the investigator's rejected arm). Driver
re-rules: (a) land as is, accepting a 4 px unaimed-activation band on the inline-end pad; (b) pin the
persistent region's geometry through the morph (a dock styles cure, outside DA's fence) and then land
the banked arm; or (c) DECLINE the persistent half too, with the await-settle remedy for both of
fourier's cases.

[2026-09-22 · Re-ruled (a) LAND AS IS at b13a792e (RULINGS §A, A-2 bracket): the 4 px pad drift plus the hover lift is a bounded, identity-preserving case, not race (b)—no layer swaps, the control's identity is constant, and it shows its hover lift from t = 164 ms, 136 ms before the earliest measured press. Pinning the persistent geometry is DECLINED (liquid-weight); declining the persistent half is DECLINED (leaves fourier's defect). The banked cure and witness below are restored to the tree (two comment em dashes tightened to the new-file law; bytes otherwise verbatim). Known bound: a press within 4 px of a persistent control's inline edge during the morph activates the control it visibly hovers. The stationary-pointer live check above stands as measured, not as a pass. Restore re-run—RED (HEAD bytes): `× passes a same-control press inside #persistent` / `× passes a press on the glyph whose click lands on its #persistent button` / `× passes a same-control press inside #persistent-end`, `AssertionError: expected "vi.fn()" to be called once, but got 0 times` `❯ tests/components/custom/dock/GlassDock.click-integrity.test.ts:81:30`, `Tests  3 failed | 2 passed (5)`; GREEN (dock dir): `Test Files  14 passed (14)`, `Tests  118 passed | 1 expected fail (119)` (the witness file inside the 14, its five its ✓ under `--reporter=verbose`; the dispatch's "15 files, 123" counted the directory's `dockCrossfadeContext.readonly.test-d.ts`, which `vitest run` does not execute).]

The banked cure (`git apply`-ready against `e5ac97f2`): [2026-09-22 · applied to the tree at the re-ruling.]
```diff
diff --git a/src/components/dock/composables/useDockClickIntegrity.ts b/src/components/dock/composables/useDockClickIntegrity.ts
index ac3b5873..c41e8a3d 100644
--- a/src/components/dock/composables/useDockClickIntegrity.ts
+++ b/src/components/dock/composables/useDockClickIntegrity.ts
@@ -31,6 +31,14 @@
 // morph, or a settled click on a stable control) passes through untouched — the
 // pass-through is scoped to identity, NEVER to post-swap coordinates.
 //
+// THE PERSISTENT ARM [2026-09-22 · O-32 A-2]. The `#persistent` / `#persistent-end`
+// regions (`.dock-persistent`) are root flex siblings of the morph region: never a
+// crossfade pane, never swapped, never inert. A layer swap cannot put a different
+// control under the pointer there, so a press inside one whose click lands on the
+// same control passes even when it began mid-morph. Arriving-layer controls get no
+// such pass: from DOM events alone a press on a control that just arrived looks the
+// same as race (b), so those still defer until settle.
+//
 // This makes the consumer's interim arms (the `@touchend.prevent` +
 // 320ms capture-phase guard keyed off the exposed `expanded` ref) UNNECESSARY: the
 // guard lives inside GlassDock. The exposed `expanded` ref STAYS exposed (a
@@ -225,7 +233,12 @@ export function useDockClickIntegrity(
         // genuine activation even while the expand it triggered is still in flight.
         // The user aimed at a real, stationary control; the morph is the RESULT of
         // their tap, not a race that preceded it. Pass it through.
-        if (!pressedDuringMorphSnapshot && sameControlIdentity(event.target)) {
+        // THE PERSISTENT ARM: a press inside `.dock-persistent` has no layer swap to
+        // defend against, so the mid-morph deferral does not apply to it; identity
+        // still must match.
+        const inPersistent =
+            pressTarget instanceof Element && pressTarget.closest(".dock-persistent") !== null;
+        if ((!pressedDuringMorphSnapshot || inPersistent) && sameControlIdentity(event.target)) {
             pressTarget = null;
             return;
         }
```
The banked witness (`tests/components/custom/dock/GlassDock.click-integrity.test.ts`, removed from
the tree so `npm test` stays green; it is RED at HEAD in its three pass arms): [2026-09-22 · restored to the tree at the re-ruling, two comment em dashes tightened.]
```ts
// O-32 A-2 — the click-integrity guard's persistent arm. A press that begins mid-morph
// is deferred because the layer swap may have put a different control under a
// stationary pointer. The #persistent / #persistent-end regions never swap and are
// never a crossfade pane, so a press there that lands its click on the same control
// passes. A full-layer press mid-morph is still swallowed.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

function mountDock() {
    const onFull = vi.fn();
    const onPersistent = vi.fn();
    const onPersistentEnd = vi.fn();
    const Host = defineComponent({
        setup() {
            return () =>
                h(
                    GlassDock,
                    { collapse: "open" },
                    {
                        default: () => [
                            h("button", { "data-testid": "full", onClick: onFull }, "Full"),
                        ],
                        persistent: () =>
                            h(
                                "button",
                                { "data-testid": "persistent", onClick: onPersistent },
                                [h("span", { "data-testid": "persistent-glyph" }, "S")],
                            ),
                        "persistent-end": () =>
                            h(
                                "button",
                                { "data-testid": "persistent-end", onClick: onPersistentEnd },
                                "E",
                            ),
                    },
                );
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    return { wrapper, onFull, onPersistent, onPersistentEnd };
}

describe("GlassDock click integrity — a press begun mid-morph", () => {
    let priorMotionTempo = "";

    beforeEach(() => {
        priorMotionTempo = document.documentElement.style.getPropertyValue("--motion-tempo");
        document.documentElement.style.setProperty("--motion-tempo", "0.01");
    });

    afterEach(() => {
        if (priorMotionTempo) {
            document.documentElement.style.setProperty("--motion-tempo", priorMotionTempo);
        } else {
            document.documentElement.style.removeProperty("--motion-tempo");
        }
        document.body.innerHTML = "";
    });

    async function settledDockMidMorph() {
        const mounted = mountDock();
        await new Promise((resolve) => setTimeout(resolve, 50));
        await mounted.wrapper.vm.$nextTick();
        const root = mounted.wrapper.get<HTMLElement>(".glass-dock").element;
        expect(root.hasAttribute("data-morphing")).toBe(false);
        // The morph-in-flight state the guard reads — the hover-expand FLIP's marker.
        root.setAttribute("data-morphing", "");
        return mounted;
    }

    it("passes a same-control press inside #persistent", async () => {
        const { wrapper, onPersistent } = await settledDockMidMorph();
        const control = wrapper.get<HTMLElement>("[data-testid='persistent']");
        expect(control.element.closest(".dock-persistent")).not.toBeNull();
        await control.trigger("pointerdown", { button: 0 });
        await control.trigger("click");
        expect(onPersistent).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("passes a press on the glyph whose click lands on its #persistent button", async () => {
        const { wrapper, onPersistent } = await settledDockMidMorph();
        await wrapper.get("[data-testid='persistent-glyph']").trigger("pointerdown", { button: 0 });
        await wrapper.get("[data-testid='persistent']").trigger("click");
        expect(onPersistent).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("passes a same-control press inside #persistent-end", async () => {
        const { wrapper, onPersistentEnd } = await settledDockMidMorph();
        const control = wrapper.get<HTMLElement>("[data-testid='persistent-end']");
        await control.trigger("pointerdown", { button: 0 });
        await control.trigger("click");
        expect(onPersistentEnd).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("still swallows a same-control press on the full layer (the swap race)", async () => {
        const { wrapper, onFull } = await settledDockMidMorph();
        const control = wrapper.get<HTMLElement>("[data-testid='full']");
        await control.trigger("pointerdown", { button: 0 });
        await control.trigger("click");
        expect(onFull).not.toHaveBeenCalled();
        wrapper.unmount();
    });

    it("still swallows a #persistent press whose click lands on a different control", async () => {
        const { wrapper, onPersistent, onFull } = await settledDockMidMorph();
        await wrapper.get("[data-testid='persistent']").trigger("pointerdown", { button: 0 });
        await wrapper.get("[data-testid='full']").trigger("click");
        expect(onFull).not.toHaveBeenCalled();
        expect(onPersistent).not.toHaveBeenCalled();
        wrapper.unmount();
    });
});
```

## Typecheck and runs

- `npx vue-tsc --noEmit` → exit 0; `npx vue-tsc --noEmit -p tsconfig.test.json` → exit 0 (both the
  `typecheck` script's halves; the tree carries lane CT's concurrent edits too).
- `vitest run tests/components/dialog tests/components/sheet tests/composables/sidebar
  tests/components/custom/dock tests/styles/overlay-plate-available-height.test.ts
  tests/styles/typography.test.ts tests/demo/virtual-section-layout.test.ts tests/components/command`
  → `Test Files 36 passed (36)`, `Tests 249 passed | 1 expected fail (250)`.
- Gates reading touched files: `tests/gates/{token-hygiene,trap-gates,orphan-css-partial}` +
  `tests/public-surface.spec.ts` green; `tests/gates/comment-ratio.test.ts` timed out once at 5 s under
  sibling load (its revision derivation), green on rerun with `--testTimeout=60000` (14 passed, 1
  expected fail).
- [2026-09-22 · post-restore] vue-tsc --noEmit → exit 0; vue-tsc --noEmit -p tsconfig.test.json → exit 0; vitest tests/components/custom/dock → `Test Files  14 passed (14)`, `Tests  118 passed | 1 expected fail (119)`.

## Path corrections

None—every ruled path exists at HEAD. Sheet witness: the ruling's "the Sheet pair" has no existing
attrs file under `tests/components/sheet/`, so it lands as the new `sheet-attrs.test.ts` in the fenced
directory.

## FOR THE DRIVER

- Roster: no delta from DA. Ratchet: DialogContent/SheetContent/sidebar/overlay-plate bytes grew by a
  few dozen; rebind at the close with the rest (§B-3).
- MIGRATION rows for R2, under `## 10.0.0`:
  - **`useSidebarFollow` (`./sidebar`)—the exemption is an attribute.** "`useSidebarFollow` no
    longer matches `.sidebar-top-btn`. A pointerdown inside `[data-toc-id]` or
    `[data-sidebar-follow-exempt]` leaves following live; any other pointerdown in the nav suspends it.
    Mark a back-to-top or similar nav control `data-sidebar-follow-exempt`."
  - **`SectionHierarchy.parentId` (`./sidebar`)—the direct parent.** "`buildTreeIndex` /
    `useTreeIndex` entries carry `parentId` = the direct parent's id, and `null` for root nodes (it was
    the root's id at every depth, and a root's own id). `rootId` is unchanged. Read `rootId` where you
    read `parentId` as the root; `useScrollTracker`'s `activeRootId` now reads `rootId`."
  - **Dialog / Sheet—`aria-modal` is stamped** (additive, CHANGELOG line rather than a break):
    "`DialogContent` and `SheetContent` stamp `aria-modal="true"` on the `role="dialog"` node while the
    root is modal, and omit it for `:modal="false"`. Drop a consumer-passed `aria-modal`."
  - **Tooltip leading** (paint, CHANGELOG line): "The tooltip chip pairs `--tooltip-text` with
    `--type-leading-caption` (1.3); it inherited body's 1.5 before, so a one-line hint is about 2.4 px
    shorter at the 12 px caption floor."
- A-2: no MIGRATION or CHANGELOG row until re-ruled (see §A-2 above; the reply letter's A-2 line must
  not promise the persistent pass while this row is STOPPED). [2026-09-22 · withdrawn at the re-ruling. CHANGELOG line for R2: "GlassDock's click-integrity guard passes a same-control press inside `#persistent`/`#persistent-end` that begins mid-morph; arriving-layer presses still defer until settle. Known bound: a press within 4 px of a persistent control's inline edge during the hover morph activates the control it visibly hovers." The reply letter's A-2 CURE-NOW line stands and carries that bound in one sentence (AUTHOR).]

## Adjudication round 1 [2026-09-22]

Adjudicator: claude-fable-5-1 (Fable). Read in full: RULINGS.md (§A/§B/§C, incl. the A-2 bracket
landed at `b13a792e`), `seats/investigate__dom-a11y.json` + `seats/verify__dom-a11y.json`, the two
inbound letters' DA rows, this RECORD, the live diff of every DA-fenced path. Own checks, read-only:
`git apply --check` of the banked A-2 diff at HEAD → rc 0; `useDockClickIntegrity.ts` at HEAD bytes
(sha `ad1ecc4c`); the lane's vitest files (dialog, sheet, sidebar, overlay-plate, virtual-section
layout) → 20 files, 120 passed; `git grep` at HEAD → 126 test files carry spaced em dashes in
describe/it titles; no gate governs dash spacing.

| finding | verdict | reason |
| --- | --- | --- |
| DA-A-1 (§3.2 bytes + mutants) | DISMISS | confirmation; the binding is the ruled shape after the spread, both mutants caught |
| DA-A-2 (§3.3 selector + dual-selector mutant) | DISMISS | confirmation; no dual selector, class match gone, bracket present |
| DA-A-3 (§3.4 parentId/rootId + staged mutant) | DISMISS | confirmation; the staged RED is the ruling's own guard shape ("guards the rootId switch") |
| DA-A-4 (L-6 arm + regex witness) | DISMISS | confirmation; the ruling names the source-text witness in this file, paint rides live-π |
| DA-A-5 (A-2 STOP lawful) | DISMISS | true at the implement datum; superseded by the re-ruling at `b13a792e` (see DA-B-1) |
| DA-A-6 (letter promises A-2) | DISMISS | superseded: the re-ruling makes the letter's CURE-NOW correct; the residual (the bound sentence) is DA-B-2's DRIVER item |
| DA-A-7 (fence, gates 60, attribution) | DISMISS | confirmation |
| DA-A-8 (typecheck + tests green) | DISMISS | confirmation |
| DA-B-1 (A-2 re-ruled LAND AS IS, not on disk) | **CURE** | RULINGS §A A-2 bracket is the ruling of record and dictates the restore verbatim with a recorded RED→GREEN and the bound in RECORD; the diff applies at HEAD (rc 0); cures 1–3 below |
| DA-B-2 (LEDGER + letter lack the bound) | **DRIVER** | the bracket says both carry the bound in one sentence; both are AUTHOR's fence (§C), not DA's |
| DA-B-3 (offsets.css:63 deletion unbracketed) | **CURE** | house law: prose amending existing prose carries a dated bracket; the :59-65 docblock is the :63 site; cure 4 |
| DA-B-4 (spaced em dashes in test titles) | DISMISS for titles; comments folded into cure 1 | describe/it titles are identifiers on the repo's convention (126 HEAD files) that the RED/GREEN lines quote; the two banked comment lines are prose in a new file and are tightened on restore |
| DA-B-5 (sub-clause census) | DISMISS | confirmation |
| DA-B-6 (fence/tree/gates; MIGRATION pending R2) | DISMISS | confirmation; R2 runs last by §C order |

Dictated cures (an Opus seat applies these in order; no judgement needed):

1. **A-2 witness first, RED.** Write `tests/components/custom/dock/GlassDock.click-integrity.test.ts`
   from the banked block above (RECORD :239-357) verbatim, with exactly two comment changes: line 1
   `// O-32 A-2 — the click-integrity guard's persistent arm.` → `// O-32 A-2—the click-integrity
   guard's persistent arm.`; the line `// The morph-in-flight state the guard reads — the hover-expand
   FLIP's marker.` → `// The morph-in-flight state the guard reads—the hover-expand FLIP's marker.`
   Titles unchanged. With `useDockClickIntegrity.ts` still at HEAD bytes run
   `timeout 600 npx vitest run tests/components/custom/dock/GlassDock.click-integrity.test.ts` and
   paste the RED (expected: 3 failed | 2 passed, `expected "vi.fn()" to be called once, but got 0
   times` at `:81:30`).
2. **A-2 cure.** Apply the banked diff (RECORD :202-235) to
   `src/components/dock/composables/useDockClickIntegrity.ts` (`sed -n '202,235p' RECORD.md >
   a2.diff; git apply a2.diff`—`git apply` writes the working tree only, no index): the eight-line
   `THE PERSISTENT ARM [2026-09-22 · O-32 A-2]` docblock paragraph after the "pass-through is scoped
   to identity" line, and in `onClickCapture`
   `if (!pressedDuringMorphSnapshot && sameControlIdentity(event.target)) {` →
   the three-line `THE PERSISTENT ARM` comment + `const inPersistent = pressTarget instanceof Element
   && pressTarget.closest(".dock-persistent") !== null;` +
   `if ((!pressedDuringMorphSnapshot || inPersistent) && sameControlIdentity(event.target)) {`.
   Then `timeout 600 npx vitest run tests/components/custom/dock` and paste the GREEN (expected: 15
   files, 123 passed | 1 expected fail).
3. **RECORD.md, A-2 prose (dated brackets, nothing deleted).**
   (a) Status line, after "§3.1 and L-7 are ANSWER rows (untouched).": append
   `[2026-09-22 · A-2 re-ruled (a) LAND AS IS at b13a792e: the banked arm and witness are restored to
   the tree, RED→GREEN re-run recorded under A-2; the measured geometry stays as the known bound—a
   press within 4 px of a persistent control's inline edge during the morph activates the control it
   visibly hovers.]`
   (b) Heading `## A-2—the persistent arm (STOPPED)` → `## A-2—the persistent arm (STOPPED → LANDED
   [2026-09-22 · re-ruled (a) at b13a792e])`.
   (c) After the paragraph ending "…with the await-settle remedy for both of fourier's cases." insert:
   `[2026-09-22 · Re-ruled (a) LAND AS IS at b13a792e (RULINGS §A, A-2 bracket): the 4 px pad drift
   plus the hover lift is a bounded, identity-preserving case, not race (b)—no layer swaps, the
   control's identity is constant, and it shows its hover lift from t = 164 ms, 136 ms before the
   earliest measured press. Pinning the persistent geometry is DECLINED (liquid-weight); declining the
   persistent half is DECLINED (leaves fourier's defect). The banked cure and witness below are
   restored to the tree (two comment em dashes tightened to the new-file law; bytes otherwise
   verbatim). Known bound: a press within 4 px of a persistent control's inline edge during the
   morph activates the control it visibly hovers. The stationary-pointer live check above stands as
   measured, not as a pass. Restore re-run—RED (HEAD bytes): <paste cure 1's lines>; GREEN (dock
   dir): <paste cure 2's lines>.]`
   (d) `The banked cure (\`git apply\`-ready against \`e5ac97f2\`):` → append ` [2026-09-22 ·
   applied to the tree at the re-ruling.]`; `The banked witness (…, removed from the tree so \`npm
   test\` stays green; it is RED at HEAD in its three pass arms):` → append ` [2026-09-22 · restored
   to the tree at the re-ruling, two comment em dashes tightened.]`
   (e) FOR THE DRIVER, the last bullet (`- A-2: no MIGRATION or CHANGELOG row until re-ruled …`):
   append ` [2026-09-22 · withdrawn at the re-ruling. CHANGELOG line for R2: "GlassDock's
   click-integrity guard passes a same-control press inside \`#persistent\`/\`#persistent-end\` that
   begins mid-morph; arriving-layer presses still defer until settle. Known bound: a press within
   4 px of a persistent control's inline edge during the hover morph activates the control it
   visibly hovers." The reply letter's A-2 CURE-NOW line stands and carries that bound in one
   sentence (AUTHOR).]`
   (f) "Typecheck and runs": append a bullet with the post-restore `vue-tsc --noEmit` (both halves)
   exit codes and the dock-dir run line.
4. **offsets.css :59-65 docblock bracket (DA-B-3).** In `src/styles/tokens/offsets.css`, the line
   `       + the φ \`--overlay-pad-*\` ladder are THREADED, not re-minted). */` →
   `       + the φ \`--overlay-pad-*\` ladder are THREADED, not re-minted).` newline
   `       [2026-09-22 · O-23 L-6: tooltip \`text-sm\` dropped from the list—TooltipContent has` newline
   `       carried none since 7.0.0; \`--tooltip-text\` names its reader in its own docblock.] */`.
   Then `timeout 600 npx vitest run tests/styles/overlay-plate-available-height.test.ts
   tests/gates/token-hygiene.test.ts tests/gates/comment-ratio.test.ts --testTimeout=60000` green.
5. **RECORD.md, L-6 bullet.** After the `:63` bullet's "(\`:64\` byte-identical)." append
   ` [2026-09-22 · adjudication: the :59-65 docblock carries the dated bracket the house law requires
   for the :63 deletion; the tooltip docblock below now sits at :95-100.]`
6. After 1–5: `timeout 600 npx vue-tsc --noEmit` and `timeout 600 npx vue-tsc --noEmit -p
   tsconfig.test.json` (both exit 0 expected); `git status --porcelain` and list every touched path
   (adds: `useDockClickIntegrity.ts`, `GlassDock.click-integrity.test.ts`; no git add/commit).

Driver items (outside DA's fence): the LEDGER §O-32 A-2 (`LEDGER.md:795-828`) and the reply letter
(`:348-353`, `:392-393`) carry the 4 px bound in one sentence and record the Chromium check as
measured, not passed (AUTHOR's post-R2 bracket pass); the ratchet rebind absorbs the dock bytes (§B-3).

## Cure [2026-09-22]

Applied the adjudication round 1 dictated cures (Opus seat, claude-opus-5-5[1m]), in order:

1. Witness restored to `tests/components/custom/dock/GlassDock.click-integrity.test.ts` from the
   banked block, two comment em dashes tightened, titles unchanged. RED against HEAD bytes
   (`useDockClickIntegrity.ts` sha1 `ad1ecc4c`):
```
     × passes a same-control press inside #persistent 121ms
     × passes a press on the glyph whose click lands on its #persistent button 58ms
     × passes a same-control press inside #persistent-end 57ms
AssertionError: expected "vi.fn()" to be called once, but got 0 times
 ❯ tests/components/custom/dock/GlassDock.click-integrity.test.ts:81:30
      Tests  3 failed | 2 passed (5)
```
2. Banked diff (this file's A-2 block) applied with `git apply` to
   `src/components/dock/composables/useDockClickIntegrity.ts` (working tree only). GREEN, dock dir:
```
 Test Files  14 passed (14)
      Tests  118 passed | 1 expected fail (119)
```
   The dispatch expected 15 files / 123 passed; the directory holds 15 entries, but one is
   `dockCrossfadeContext.readonly.test-d.ts`, which `vitest run` does not execute. The witness's five
   its run inside the 14 (all ✓ under `--reporter=verbose`), the same totals as the implement-datum
   GREEN above.
3. A-2 prose brackets (a)–(f): status line, heading, the re-ruling paragraph, the banked-cure and
   banked-witness lines, the FOR THE DRIVER A-2 bullet, the post-restore typecheck bullet.
4. `src/styles/tokens/offsets.css` :59-67 docblock gains the dated L-6 bracket for the :63 deletion
   (DA-B-3); `vitest run tests/styles/overlay-plate-available-height.test.ts
   tests/gates/token-hygiene.test.ts tests/gates/comment-ratio.test.ts --testTimeout=60000` →
   `Test Files  3 passed (3)`, `Tests  22 passed | 1 expected fail (23)`.
5. L-6 `:63` bullet gains the adjudication bracket.
6. `vue-tsc --noEmit` → exit 0; `vue-tsc --noEmit -p tsconfig.test.json` → exit 0. Gates stay 60; no
   roster, ratchet, MIGRATION or CHANGELOG touch; no build.

## Adjudication round 2 [2026-09-22]

Adjudicator: claude-fable-5-1 (Fable). Datum: master `f3011618` (RULINGS.md carries the A-2
re-ruling bracket from `b13a792e` and the driver-items section from `f3011618`). Read in full:
RULINGS.md (§A/§B/§C), `seats/investigate__dom-a11y.json` + `seats/verify__dom-a11y.json`, the two
inbound letters' DA rows, this RECORD (the round-1 dictation and the Cure section), the live diff of
every DA-fenced path, the restored witness. Own checks, read-only: the live
`git diff src/components/dock/composables/useDockClickIntegrity.ts` is byte-identical to the banked
diff block above (`diff` of the two → no output); the restored witness carries the two tightened
comment em dashes (:1, :70) and unchanged titles; vitest over dock + dialog + sheet + sidebar +
overlay-plate + virtual-section layout → 34 files, 238 passed | 1 expected fail;
`tests/gates/gate-register.test.ts` → 21/21 (the 60-seat sum pinned); `vue-tsc --noEmit` exit 0 and
`-p tsconfig.test.json` exit 0; porcelain on `tests/gates`, `.published-roster`, `.bundle-ratchet`,
`package.json`, MIGRATION/CHANGELOG/DESIGN/README → empty; `grep -rn sidebar-top-btn src demo tests`
→ only the witness's negative case. LEDGER.md and the reply letter still carry no A-2 bound sentence
(`grep '4 px\|inline edge'` → only the L-6 and A-3 figures), so that driver item stands.

| finding | verdict | reason |
| --- | --- | --- |
| DA-A-1 (§3.2 bytes + mutants) | DISMISS | confirmation; unchanged since round 1 |
| DA-A-2 (§3.3 selector) | DISMISS | confirmation; unchanged since round 1 |
| DA-A-3 (§3.4 parentId/rootId) | DISMISS | confirmation; unchanged since round 1 |
| DA-A-4 (L-6 arm + regex witness) | DISMISS | confirmation; paint rides live-π per the ruling |
| DA-A-5 (A-2 STOP lawful at e5ac97f2) | DISMISS | superseded by the re-ruling; the arm now lands as ruled |
| DA-A-6 (letter promises A-2) | DISMISS | superseded: the CURE-NOW line is correct under the re-ruling; the residual bound sentence is DA-B-2's driver item |
| DA-A-7 (fence, gates 60, attribution) | DISMISS | confirmation; re-verified at this datum |
| DA-A-8 (typecheck + lane tests) | DISMISS | confirmation; re-verified (34/238, exit 0 ×2) |
| DA-B-1 (A-2 not on disk after the re-ruling) | DISMISS | CURED by cure 1: the arm is on disk byte-identical to the banked diff, the witness restored, RED (3 failed \| 2 passed at HEAD bytes, `:81:30`) and GREEN (dock dir 14/118 \| 1 expected fail) pasted under A-2, the bound sentence in the status line, the A-2 bracket and FOR THE DRIVER; the live check recorded as measured, not passed |
| DA-B-2 (LEDGER + letter lack the bound) | DRIVER | still true at this datum; AUTHOR's fence (§C), the post-R2 bracket pass; RULINGS `f3011618` already lists it |
| DA-B-3 (offsets.css:63 unbracketed) | DISMISS | CURED by cure 4: the :59-67 docblock carries the dated L-6 bracket (tight em dash), inside the ruled :63 site; overlay-plate + token-hygiene + comment-ratio green (3 files, 22 \| 1 expected fail) |
| DA-B-4 (spaced em dashes in titles) | DISMISS | as round 1: titles are identifiers on the repo's convention; the two banked comment dashes were tightened on restore |
| DA-B-5 (sub-clause census) | DISMISS | confirmation |
| DA-B-6 (fence/tree/gates; MIGRATION pending R2) | DISMISS | confirmation; R2 runs last by §C order and FOR THE DRIVER now carries the A-2 CHANGELOG line too |
| Cure-seat note: dock dir reads 14 files / 118, not the dictated 15 / 123 | DISMISS | the dictation's count was an estimate; the seat measured and explained it (`dockCrossfadeContext.readonly.test-d.ts` is a type test `vitest run` skips) and the witness's five its run inside the 14; my own run agrees |
| Cure-seat note: the RECORD edit script's first run aborted on a non-unique anchor, rerun with a specific anchor | DISMISS | every dictated bracket (3a–3f, 5) is present exactly once; verified by reading the sections |

No CURE items. clean=true. Driver items: (1) AUTHOR post-R2 bracket pass—LEDGER §O-32 A-2 and the
reply letter (:348-353, :392-393) carry the 4 px bound in one sentence and record the Chromium
stationary-pointer check as measured, not passed; (2) R2 takes the A-2 CHANGELOG line from FOR THE
DRIVER under `## 10.0.0` beside §3.2/§3.3/§3.4/L-6; (3) the driver's ratchet rebind at the close
absorbs the restored `useDockClickIntegrity.ts` bytes (§B-3); no roster delta from DA.

Footprint of this seat: this section appended to DA/RECORD.md only; no other path touched, no git
write commands, no build.
