# BG audit — D · dock persistent-brand removal + V↔H morph-in-place

Audit of two gestalt dock directives: (1) remove the persistent ℱ brand section from
both shell docks; (2) retire the modal V↔H morph demo + its View-Transition crossfade
variant and make the morph a **button IN the dock** that flips the dock's OWN orientation
in place via the liquid teardrop.

Verified against HEAD (4.2.0 branch). Default-broken skepticism applied — the source
confirms both defects are real and the modal carries a DEAD crossfade path the sibling
story already condemned.

---

## FINDINGS (what is true at HEAD)

### Part 1 — the persistent brand section

**F1.1 — SidebarDock: the `#persistent` slot is the ℱ wordmark + an anchored divider.**
`demo/layout/SidebarDock.vue:269-313`. The `<template #persistent>` renders a
`<DockIconButton as-child>` wrapping a `<RouterLink to="/">` whose only child is an
`aria-hidden` `<span>` painting the italic script-ℱ (`&#x2131;`,
`text-viz-fourier`, L285-294), followed by `<DockSeparator :anchor="true" />` (L312).
The ℱ carries: the long-press/dbl-click Fourier-redraw egg (`wordmarkPress` handlers
L280-283, `fireRedraw`/`onWordmarkClick` L177-190), an optical-center transform
(`.demo-sidebar-home > span { transform: translate(-2.63px, -3.75px) }`,
`dock-nav.css:138-146`), and a 2rem font-size (`dock-nav.css:140`). The whole section's
documented rationale (L77-85, "the ℱ IS the single Foundations affordance") is a
**dedup workaround**: Foundations is filtered OUT of the category nav loop
(`primaryCategories = CATEGORIES.filter(c => … c.id !== "foundations")`, L83-85) ONLY so
the ℱ can stand in for it. Remove the ℱ and that filter is dead weight too.

**F1.2 — BottomDock: the `#persistent` slot is the category Sheet trigger (NOT a brand
mark).** `demo/layout/BottomDock.vue:210-246`. This `#persistent` is a `<Sheet>` whose
trigger is a `PanelLeft` `<DockIconButton>` ("Open category navigation") hosting the
off-canvas `<SidebarDock>` on mobile. **This is load-bearing navigation, not a brand
section** — on mobile (`@media (max-width: 767px)` hides `.demo-sidebar-rail`,
`dock-nav.css:179-183`) it is the ONLY category-nav entry point. The user's directive
("the persistent ℱ brand section atop BOTH … docks") is about the BRAND mark; the
BottomDock has **no ℱ** — its persistent slot is the mobile category trigger. The ℱ
appears in the BottomDock only transitively, because the mobile Sheet hosts the
SidebarDock body which contains the ℱ.

**F1.3 — the ℱ is wired to a Fourier-redraw easter egg (E1).** The wordmark's
long-press/dbl-click dispatches `glass-ui-demo:f-redraw`
(`SidebarDock.vue:177-179`); AppShell listens (`onFRedraw` L64-66, listener L347) and
mounts `<FRedrawOverlay v-if="showFRedraw">` (`AppShell.vue:45,488`). Removing the ℱ
must also retire the egg coupling — `useLongPress` import (`SidebarDock.vue:38`), the
`wordmarkPress`/`redrawFired`/`fireRedraw`/`onWordmarkClick` block (L177-190), the
window-event listener + `FRedrawOverlay` mount + `showFRedraw`/`onFRedraw` in AppShell
(L62-66, 347, 488), and `demo/eggs/{FRedrawOverlay.vue,useLongPress.ts}` if no other
consumer survives (grep confirms only SidebarDock + AppShell + the two egg files
reference `f-redraw`/`FRedrawOverlay`/`useLongPress`).

**F1.4 — the ℱ-anchored divider IS the rail's anchor seam.**
`SidebarDock.vue:312` `<DockSeparator :anchor="true" />` is documented (L299-311) as the
"ONLY anchored separator in the dock" — the `[data-rail-anchor]` the `<DockSection>`
below explicitly nulls (`anchor-id="__none__"`, L326). Removing the ℱ section removes
this anchor; the `<DockSection>`'s own anchor (currently `__none__`) must reclaim the
seam, OR the anchor mechanism is no longer needed (the BC.W-DOCK-STACK-RAIL comment at
L128-130 already says "the stack clears `<main>` by topology at EVERY y… the `anchor-id`
is no longer load-bearing"). So the anchor seam is, by the source's own admission,
vestigial — clean removal.

**F1.5 — the `#persistent` slot is a LIBRARY facility with other consumers.** The slot
itself (`GlassDock.vue:585-610`, the iOS Now-Playing idiom — a stable always-present
control beside the morph region) is used by `overview.vue:129`, `rail.vue:94+`,
`sections.vue` (`rail-core` kind). **The directive is demo-IA, not a library retirement**
— `#persistent` stays in the library; only the SHELL docks' use of it changes (the ℱ
goes; the BottomDock's mobile category trigger has nowhere else to live and must be
reconciled, see W-DOCK-PERSISTENT-CUT).

### Part 2 — the V↔H morph

**F2.1 — the morph is a hand-rolled modal `<div>`, not a real dialog.**
`AppShell.vue:497-720`. The morph stage is a `<Transition name="morph-stage-fade">`
wrapping a `<div class="demo-dock-morph-overlay" role="dialog" aria-modal="true"
@keydown.esc="closeMorphStage">` (L498-505). It is NOT a reka `Dialog`/`DialogContent`
(those are imported at L5-11 but used only for the keyboard-help dialog at L730). The
overlay div has **no `tabindex`, no autofocus, no focus trap** — so `@keydown.esc` is
bound to a non-focusable element and **only fires if a descendant happens to hold
focus**. This is defect #13's "esc doesn't work" — root-caused: keydown never reaches
the handler because nothing in the overlay is focused on open. (Contrast the real
`<Dialog>` at L730 which reka focus-traps and handles Escape natively.)

**F2.2 — the modal ships the DEAD View-Transition crossfade as the DEFAULT; the working
teardrop is gated OFF.** `AppShell.vue:104-136`. `vtOrientation` (L108) +
`liquidPreview = ref(false)` (L112). `toggleShellMorph()` (L127-136): if `liquidPreview`
is OFF (the default), it runs `startViewTransition(() => vtOrientation = …)` — the
crossfade. The teardrop (`morph.toggle()`) runs ONLY when the user flips the "Liquid
teardrop (preview)" `<Switch>` (L551-557). **The sibling story already proved the
crossfade is broken**: `morph-showcase.vue:1-27` (BD.W-MORPH-FIELD-WELD M3) documents
verbatim — *"HEAD shipped the V↔H as a `startViewTransition` crossfade DEFAULT — pressing
the button flipped …→`-horizontal` in ONE frame while `--dock-morph-t` stayed 0.000 the
whole transition (the topology dodge) … The ONLY thing that worked was the opt-in Liquid
teardrop preview"* — and DELETED the crossfade arm from the story. **AppShell never got
that fix** — it still carries the two-arm `v-if="!liquidPreview"` VT-vertical/VT-horizontal
block (L573-611) AND the teardrop block (L615-709). The shell is a stale fork of the
story.

**F2.3 — the modal renders a synthetic 5-icon dock pair, not the real shell docks.**
`AppShell.vue:86-92` (`morphEntries`: foundations/primitives/containers/data/feedback) +
the morph stage (L568-710) renders TWO throwaway `<GlassDock>`s with placeholder
`<DockIconButton>`s. The documented reason (L72-85): *"physically morphing the SidebarDock
into the BottomDock would break navigation on every route — so the in-situ demonstration
is a focused morph stage that OPENS over the live shell."* This is the contrivance the
directive kills: the user does NOT want a demonstration-of-a-morph in a modal; they want
the **actual dock** to morph in place.

**F2.4 — the driver itself is sound and supports in-place use.**
`useDockOrientationMorph.ts` is a clean single-`SpringProgress` driver on the ONE
`--dock-morph-t` scalar (L86-307): `toggle()`/`morphTo()`/`pin()`, interruptible
re-base (L198-227), PRM-snap (L193-195), the teardrop squish off the scalar derivative
(L277-281). It exposes `verticalStyle`/`horizontalStyle`/`verticalOpacity`/
`horizontalOpacity`/`stretch`/`t`/`orientation`. It is a PUBLISHED library export
(`dock/index.ts:84-88`). **The morph mechanism is the two-real-DOM-docks-crossfade-under-
goo pattern** — it inherently needs two physical docks; it is NOT a single-dock
re-orientation. This is the key reconciliation tension (see ROOT CAUSE R2).

**F2.5 — `GlassDock`'s `orientation` IS a live-reactive prop.**
`useDockShellProps.ts:278` `orientation = computed(() => props.orientation ?? "horizontal")`.
The SFC binds it into the root classes (`GlassDock.vue:531,552,557`), the morph
orchestrator's axis (`outerLayerAxis = orientation`, L186), the expanded-size measure
(L228), and item-drag axis (L455) — **all reactive**. Precedent exists:
`liquid-playground.vue:92` holds `const orientation = ref<"horizontal"|"vertical">` and
binds it live to a `<GlassDock :orientation>`. So **a single dock CAN flip orientation
live** by toggling a ref — the layout re-classes and the CSS column↔row re-flows. What it
does NOT get for free is the continuous liquid SIZE morph (that is the two-dock teardrop
driver's job).

**F2.6 — the morph is wired through a window-event triple-hop.** Both shell controls
(`SidebarDock.vue:215-217` morph button, `BottomDock.vue:167-169` morph button) dispatch
`glass-ui-demo:toggle-dock-morph`; AppShell listens (`onToggleMorphStage` L144-146,
listener L185) and toggles `morphStageOpen`. Three indirections (button → window event →
AppShell ref → modal) for what should be a direct orientation toggle on the dock.

**F2.7 — the gate `proof-dock-morph-insitu.mjs` ENSHRINES the broken dual-path.** Its M4
clause (header L29-33) reads: *"the teardrop-vs-crossfade ship decision rides the recorded
perf number … the shipped register is the VT crossfade UNLESS the teardrop clears
in-situ."* This gate machine-LOCKS the crossfade default the story already killed. It +
`tests-visual/dock-morph-insitu.spec.ts` + the shell testid asserts in
`tests-visual/storybook-meta.spec.ts` must be retired/re-pointed by the wave (they target
`shell-dock-morph-overlay`, `shell-morph-toggle`, `shell-liquid-preview-toggle`,
`shell-dock-morph-vt-*` — all of which the cut deletes). `proof-morph-showcase.mjs`
already reflects the weld-only story and STAYS.

---

## ROOT CAUSES (gestalt, first-principles)

**R1 — the ℱ brand section is a self-justifying contrivance.** It exists to be the
"single Foundations affordance" — but Foundations is a category like any other; excluding
it from the nav loop (F1.1) purely to make room for a decorative wordmark is the tail
wagging the dog. The brand identity belongs in the page/landing chrome, not as a dock
control that steals a category slot, owns a 30-line optical-centering rationale, an
anchored divider, and a Fourier easter egg. **Simpler thing:** Foundations is a normal
category in the nav loop; the dock has no brand control; the brand reads on the landing
hero. The BottomDock's mobile category trigger is genuine nav and must survive (it is NOT
brand) — but it can move out of `#persistent` into the in-flow nav run if the slot is no
longer needed for a stable anchor.

**R2 — the morph is staged in a modal because the shell topology (two fixed docks, one
per orientation) was treated as immutable.** The whole modal exists to dodge "morphing the
SidebarDock into the BottomDock would break navigation." But that framing is the error:
the shell does NOT need to morph one dock into the other. **The first-principles
reframe — orientation is a live DOCK STATE, not a two-dock topology.** A SINGLE shell nav
dock whose `orientation` is a user-toggleable ref (F2.5, the liquid-playground precedent)
flips column↔row in place. The continuous liquid teardrop is the TRANSITION skin over that
flip — driven by the existing `useDockOrientationMorph` scalar reading the dock's live
`from`/`to` footprint, with the SVG-goo `#dock-morph-goo` bridge (one `<GooFilter>` mount,
already at the shell root, `AppShell.vue:368`) occluding the column→row reflow at the
midpoint. No modal, no synthetic docks, no esc to fix (there is no modal), no crossfade
fork (it dies with the story). The morph button lives ON the dock and toggles ITS OWN
orientation.

**R3 — the crossfade variant is dead code the shell never pruned.** The story killed it
(F2.2); the shell forked it and rotted. The dual-path (`liquidPreview` switch, the
`v-if="!liquidPreview"` VT arm) violates NO-legacy/NO-dual-path. One driver, one scalar,
one teardrop skin — clean break.

---

## PROPOSED WAVES

### BG.W-DOCK-PERSISTENT-CUT
**Intent:** remove the ℱ brand section + the Fourier-redraw egg from the shell docks;
Foundations rejoins the category nav; the BottomDock mobile category trigger survives in
the in-flow nav run.
**Approach (idiomatic, gestalt):**
- SidebarDock: delete the entire `<template #persistent>` (the ℱ `DockIconButton`/
  `RouterLink`/`span` + the anchored `<DockSeparator>`, L269-313). Drop the
  `c.id !== "foundations"` filter so Foundations is a normal `primaryCategory`
  (L83-85 → `CATEGORIES.filter(c => !c.reference)`). Delete the egg block
  (`useLongPress` import L38, `fireRedraw`/`wordmarkPress`/`redrawFired`/`onWordmarkClick`
  L177-190). The home/brand identity (if any) moves to the landing hero, NOT the dock.
- BottomDock: the `#persistent` Sheet trigger is NAV, not brand — KEEP it, but if the
  `#persistent` slot's "stable anchor" purpose is gone elsewhere, fold the category
  trigger into the leading nav run (it is already followed by a `<DockSeparator>`, L250).
  No brand mark exists here to remove.
- AppShell: delete `onFRedraw`/`showFRedraw` (L62-66), the `glass-ui-demo:f-redraw`
  listener (L347, removeListener L351), the `<FRedrawOverlay>` mount (L488).
- Retire `demo/eggs/{FRedrawOverlay.vue,useLongPress.ts}` (no surviving consumer — grep-
  confirmed). Retire the `.demo-sidebar-home` CSS (`dock-nav.css:117-146`).
- Reclaim the rail anchor: the `<DockSeparator :anchor>` is gone; the `<DockSection>`
  anchor (`anchor-id="__none__"`, L326) is already nulled and the stack-rail clears
  `<main>` by topology (BC.W-DOCK-STACK-RAIL, F1.4) — confirm the rail still seats; if the
  anchor mechanism is truly vestigial, retire `[data-rail-anchor]` end-to-end.
**Files:** `demo/layout/SidebarDock.vue`, `demo/layout/BottomDock.vue`,
`demo/layout/AppShell.vue`, `demo/layout/dock-nav.css`, `demo/eggs/FRedrawOverlay.vue`,
`demo/eggs/useLongPress.ts` (retire), the `f-redraw` proof/spec arms if any.
**Acceptance / π:** no `&#x2131;`/`.demo-sidebar-home`/`f-redraw` in the demo source;
Foundations is a clickable category control in the SidebarDock nav loop; the BottomDock
mobile Sheet category trigger still opens the off-canvas nav; the SidebarDock has no brand
control and the rail seats correctly (π capture both viewports). Folds defect #8.

### BG.W-DOCK-MORPH-IN-PLACE
**Intent:** retire the modal morph demo + the VT-crossfade variant (clean break); the
shell nav dock carries a morph button that flips its OWN orientation in place via the ONE
`useDockOrientationMorph` driver + the liquid teardrop, no modal, no esc.
**Approach (idiomatic, gestalt, first-principles per R2):**
- **The shell nav dock's `orientation` becomes a live `ref` (user-toggleable state).** The
  in-dock morph button (`SidebarDock.vue:445-467` / `BottomDock.vue:431-445`) toggles
  `dockOrientation.value` directly (NOT a window event). Bind `<GlassDock :orientation>`
  to the ref (F2.5 precedent — `liquid-playground.vue:92`). The dock re-classes column↔row
  in place; nav controls reflow on the live axis.
- **The transition skin is the existing teardrop.** Drive `useDockOrientationMorph` on the
  REAL dock root (not a synthetic stage): the scalar reads the dock's live collapsed/
  expanded footprint as the `from`/`to` span; the SVG-goo `#dock-morph-goo` bridge (the
  shell-root `<GooFilter>`, `AppShell.vue:368`, already mounted) occludes the reflow at the
  midpoint; the squish rides the scalar derivative. PRM snaps (driver L193). One scalar,
  bidirectional, interruptible — the BD.W-MORPH-FIELD-WELD weld, now in-situ.
- **Reconcile the topology (R2):** the shell needs ONE morphable nav dock, not two fixed
  ones. Options to spec: (a) the SidebarDock becomes the single shell nav dock whose
  orientation toggles between the left-vertical-rail position and a bottom-horizontal-bar
  position (position + orientation co-morph), retiring the separate BottomDock as a fixed
  second dock; OR (b) keep two docks but make the morph an explicit orientation flip on the
  ACTIVE one (the visible dock at the viewport) so the user sees IT re-flow. Recommend (a)
  for KISS — one dock, one orientation state, the morph is the literal V↔H the user asked
  for, and the two-dock-per-orientation duplication (the very thing the modal worked around)
  dissolves.
- **Delete:** the modal stage (`AppShell.vue:490-720` + the `.demo-dock-morph-*` CSS
  L757-859), `vtOrientation`/`liquidPreview`/`toggleShellMorph`/`morphFacing`/`morphGooFilter`/
  `openMorphStage`/`closeMorphStage`/`onToggleMorphStage`/`morphStageOpen`/`morphStageEl`/
  `morphEntries`/`V_FULL_H`/`H_FULL_W`/`__shellDockMorph` (L80-186), the
  `glass-ui-demo:toggle-dock-morph` window-event triple-hop (the SidebarDock/BottomDock
  dispatchers L215-217/L167-169 collapse to a direct ref toggle). Delete the inline
  `#shell-dock-morph-goo` `<filter>` (L616-639 — it dups the shell-root `<GooFilter>`'s
  `#dock-morph-goo`).
- **Retire/re-point the gates:** `proof-dock-morph-insitu.mjs` (esp. M4 — the
  crossfade-default lock, F2.7) is retired or re-pointed to the in-place morph;
  `tests-visual/dock-morph-insitu.spec.ts` re-pointed; the `shell-dock-morph-*`/
  `shell-morph-toggle`/`shell-liquid-preview-toggle` asserts in `storybook-meta.spec.ts`
  dropped. `proof-morph-showcase.mjs` (the weld-only story) STAYS green.
- **Fence:** the published `useDockOrientationMorph` driver is UNCHANGED (it stays the
  two-DOM-dock teardrop primitive the `/dock/morph-showcase` story consumes). The shell's
  in-place use either composes it on a single dock (reading the live footprint) or, if the
  single-dock footprint morph is cleaner as a direct scalar read, the driver's `pin`/`t`/
  `stretch` surface is reused without forking a second engine. NO second morph clock.
**Files:** `demo/layout/AppShell.vue` (delete modal + state), `demo/layout/SidebarDock.vue`,
`demo/layout/BottomDock.vue`, `demo/layout/dock-nav.css`, `src/styles/dock/morph-bridge.css`
(reused as the in-place skin — no edit if the bridge reads the live scalar), the
insitu proof/spec arms.
**Acceptance / π:** clicking the in-dock morph button flips the shell nav dock V↔H IN PLACE
(no modal opens) with a continuous liquid-teardrop transition (`--dock-morph-t` drives a
real field 0→1, the goo bridge occludes the reflow midpoint); pressing again flips back;
the morph is interruptible + PRM-snaps; NO `startViewTransition` crossfade arm exists; NO
`role="dialog"` morph overlay exists; esc is moot (no modal). π frame-series both
directions, both modes. Folds defect #13.

---

## Chronic/deferred folded

- **Defect #8** (persistent ℱ brand useless → remove): BG.W-DOCK-PERSISTENT-CUT.
- **Defect #13** (V↔H morph is a modal, esc broken, only teardrop works → button in dock,
  in place): BG.W-DOCK-MORPH-IN-PLACE. Folds the BD.W-MORPH-FIELD-WELD M3 lesson
  (crossfade dies) that the story landed but the shell never inherited.
- The five-tranche "rail anchor seam whack-a-mole" (SidebarDock.vue:301-311) ends with the
  ℱ-divider removal: the anchor was already vestigial (BC.W-DOCK-STACK-RAIL topology), so
  retiring it closes that chronic.
