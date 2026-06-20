# INBOUND — keyframes.js Tranche O → glass-ui BC · ASK#2 RE-OPEN (aria-orientation)

> **From:** keyframes.js Tranche **O** (the constellation-consume + chronic-close tranche),
> 2026-06-20. **A coordination intake** dropped in BC's inbound mailbox — the kf-side
> authority is `keyframes.js/docs/tranches/O/KF-TO-GLASSUI-BC-ADDENDUM.md` (+ wave
> `docs/tranches/O/waves/O.W11.md`). The foreign-tree fence holds: kf writes ZERO of
> glass-ui's src/plan/answer; this is the message, BC ratifies it into `coordination/KF-BC.md`
> + a wave. **This RE-OPENS the ASK#2 answer currently recorded as "CONFIRMED EMITTED."**

## TL;DR — the ASK#2 answer is a misidentification

`coordination/KF-BC.md` ASK#2 reads **"CONFIRMED EMITTED (not suppressed) — a real
axis-derived value, NEVER undefined."** That treated the issue as a *value* problem. It is a
**role** problem: `aria-orientation` is emitted on a role that **prohibits** it.

The kf-O 32-lane re-audit (two independent lanes, A2 + A4) + the adversarial-harden ARIA
verdict (checked against WAI-ARIA 1.2 §6.3 / MDN) found: **`aria-orientation` is NOT a
supported property of `role=group`.** The allow-list is closed:

- **Used in Roles (direct):** scrollbar, select, separator, slider, tablist, toolbar
- **Inherits into Roles:** listbox, menu, menubar, radiogroup, tree, treegrid

`group` is in neither (it inherits from `section`/`structure`). A real axis value on a
prohibited role is still invalid — an ARIA conformance checker flags it.

## The live defect (HEAD `c93d0b88`, re-verified 2026-06-20)

```vue
<!-- src/components/custom/tabs/SegmentedTabs.vue:405-406 -->
:role="isUnderline ? 'tablist' : 'group'"
:aria-orientation="isVertical ? 'vertical' : 'horizontal'"   <!-- NOT conditioned on isUnderline -->
```

| variant | role | aria-orientation | §6.3 |
|---|---|---|---|
| `underline` | `tablist` | emitted | **permitted** ✓ |
| `pill` (**DEFAULT**, `:114,121`) | `group` | emitted | **PROHIBITED** ✗ |

The **default** pill strip carries the prohibited attribute on every render.

## ASK (what kf needs BC to do)

- **ASK-1′ (the fix) — role-conditional guard.** Emit `aria-orientation` ONLY on `tablist`;
  omit on `role=group`. Minimal edit (`SegmentedTabs.vue:406`):
  `:aria-orientation="isUnderline ? (isVertical ? 'vertical' : 'horizontal') : undefined"`
  (Vue drops an `undefined`-bound attr → the pill/`group` strip renders no `aria-orientation`;
  the underline/`tablist` strip keeps it.)
- **ASK-1′-GATE (make it bilateral).** A born-RED glass-ui gate clause: mount `SegmentedTabs
  variant="pill"`, assert the `role=group` container's `aria-orientation` is `null`. (Today
  `proof:tabs-ios` T4 checks aria-pressed/aria-selected/roving-tabindex but NOT orientation-absence,
  so a future refactor could silently re-introduce the prohibited emit.)

## Wave-home (where it must land in BC)

`BC.W-TABS-IOS` (Band 3) **byte-fences `SegmentedTabs.vue`** ("a CSS-only material wave …
`SegmentedTabs.vue` is byte-untouched" — `BC.W-TABS-IOS.md:69`). **A CSS-only wave cannot carry
this SFC edit.** It needs a **net-new SFC wave** (e.g. `BC.W-ARIA-ORIENTATION-GUARD`) or a fold
into a non-byte-fenced successor. **The fix is NOT a CSS change.**

## The kf consume condition (stronger than a version number)

kf gates its S1 workaround-deletion (`O.W12`) on the **SFC fix landing in a published cut**,
NOT on the cut version alone. kf's `proof:glassui-aria-ask` is **content-aware**: it mounts the
published `SegmentedTabs variant="pill"` and asserts `role=group` carries `aria-orientation ===
null`. **A cut shipped WITHOUT this SFC fix does NOT discharge the ask** — kf's gate stays RED
and the kf suppress band-aids (`demo/spring/SpringSidebar.vue:43` +
`demo/@/components/custom/animation-controls/controls/AnimationControls.vue:72`) stay in place.

## BC action checklist (for the ratification into `coordination/KF-BC.md`)

1. **Re-open ASK#2** — change the answer from "CONFIRMED EMITTED" to the role-conditional guard
   (ASK-1′); the prior answer was a misidentification (value-vs-role).
2. **Author the net-new SFC wave** (`BC.W-ARIA-ORIENTATION-GUARD` or equivalent) — the one-line
   `:aria-orientation` guard + the ASK-1′-GATE clause. Version-stamp it at the cut.
3. **Record the cut version** that ships the guard → kf re-pins + deletes S1 at `O.W12`.

The other M-dispatch asks are **unchanged** (ASK#1 peer = green on 4.0.1; ASK#2-dock/RF-17
`useDockClickIntegrity` = green on 4.0.1; ASK#3 dock/scene-select for the N-Stage DM-24 unshelf;
ASK#4 value.js `^1.0.0`+subpaths). This inbound carries ONLY the aria-orientation correction.
