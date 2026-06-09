# DOCK-layers-rail — adversarial red-team of the dock LAYERS + RAIL to perfection

**Lane** DOCK-layers-rail (hardening challenge) · **HEAD** `89edffc` (3.8.0 + conv-1/2 + W45
DEVELOPED + pass-3 ledger) · **Mode** read-only PLANNING (no code) · **Date** 2026-06-09 ·
**Verdict** WEAK

Scope: the `<DockLayerGroup>` + `<DockLayer>` pane stack, `useLayerTransition` / the W02
orchestrator, the layer crossfade (DK7 one-clock), the switcher rail (`.dock-layer-rail`, DK8),
the rail-identity differentiation (DK9/DK10 vertical-vs-rail), and the rail's first-class
animation. This goes WHERE `CH-dock.md` did NOT: CH-dock red-teamed the whole band breadth
(glyph adoption, tile-pad, hover register, specular cohesion, W54, unify-root, vertical body,
DK3, the DELTA). It barely touched the layers/rail INTERNALS. The findings below are net-new and
source-grounded at file:line.

---

## CHALLENGES THAT FOUND A WEAKNESS (falsifiable, source-grounded)

### L1 — The switcher rail renders TWO indicators. The local `TabsList` default `indicator:true` paints a PHANTOM `bg-secondary/80` pill UNDER the dock indicator. BROKEN cohesion.
The headline finding. `DockLayerGroup.vue:4` imports `TabsList` from `../../ui/tabs` — the LOCAL
wrapper, not raw reka. `TabsList.vue:30` defaults `indicator: true` and `:38` unconditionally
renders its OWN `<TabsIndicator />` (a `rounded-pill bg-secondary/80
translate-x-(--reka-tabs-indicator-position) ease-spring-snappy` pill — `TabsIndicator.vue:18`)
as the FIRST child of the tablist. `DockLayerGroup.vue:224` then adds a SECOND
`<TabsIndicator class="dock-layer-tab-indicator" />`. **`DockLayerGroup` never passes
`:indicator="false"`** (verified: `grep ':indicator' DockLayerGroup.vue` → 0). So the rail mounts
TWO reka `TabsIndicator` primitives, both reading the SAME `--reka-tabs-indicator-position` /
`-size` vars.

The phantom default pill is `translate-x`-ONLY (`TabsIndicator.vue:18`). On the DEFAULT (column)
rail — where DK8 made the position var a Y-axis offset (`--reka-tabs-indicator-position` =
`offsetTop`, since `railOrientation="vertical"`) — the phantom pill applies that Y-offset value as
an X `translate-x`, so it lands at `translateX(offsetTop_of_active_tab)` with `top:1px bottom:1px`
— a stray `bg-secondary/80` rounded pill floating to the RIGHT of the rail by the active tab's
vertical offset, full rail height. This is a visible second highlight the DK8 axis-fix did NOT
address (DK8 only touched the `.dock-layer-tab-indicator` rule, never the phantom). It also
inherits the local TabsList base classes (`h-10`, `rounded-input`, `p-1` —
`TabsList.vue:33`) which `cn()`-merge alongside `.dock-layer-rail` and can fight the rail's own
`gap`/`padding`. **Falsifiable:** `findAllComponents({ name: "TabsIndicator" })` in
`DockLayerRail.a11y.test.ts:179` returns TWO; the test `.find(...)`s the dock-classed one and
asserts only `toBeTruthy()` (`:183`) — it never asserts count === 1, so the double-indicator
sails through GREEN. **HARDENING:** pass `:indicator="false"` on the rail's `<TabsList>` (one-line),
OR have `DockLayerGroup` compose raw reka `TabsList` directly rather than the indicator-bearing
local wrapper. Add a count-=== 1 assertion to the a11y test so the regression bites.

### L2 — The rail's traveling indicator is on a DIFFERENT clock from the pane-swap. DK7 killed the second clock for the PANE but left it ALIVE for the RAIL HIGHLIGHT — the same desync, one layer up.
DK7's whole thesis (`dock.css:957-969`, W45 JSON `DK7_layerLag`): "the crossfade is now on the ONE
`--dock-morph-t` scalar … the prior `opacity var(--dock-motion-resize)` was a SECOND clock … ONE
clock, every axis." **But the rail indicator that signals WHICH pane is active is STILL on the
second clock.** `.dock-layer-tab-indicator` transitions `width/height/transform` on
`var(--dock-motion-resize)` (`dock.css:1524-1527`) = `--spring-dock` linear() over
`--duration-normal` (`:1531`, `:49`). The pane content morphs on the live `SpringProgress`
`--dock-morph-t` scalar (velocity-dependent, settles its meaningful travel in ~0.18s). So when you
switch layers: the rail highlight glides on a FIXED ~0.3s linear-sampled curve while the pane box
+ crossfade ride a velocity-continuous spring that re-bases mid-flight on a re-toggle. The two read
out of step — exactly the "laggy/delayed" desync DK7 claimed to finish, just relocated from the
pane opacity to the rail highlight. Worse: reka's `TabsIndicator` recomputes its position via
`useResizeObserver` + a `flush:"post"` watch on `modelValue` (`node_modules/reka-ui/.../TabsIndicator.js`)
— NOT off the morph scalar. During a SIMULTANEOUS collapse + layer-switch (the
`dock-nested-collapsible` showcase), the tabs' `offsetTop`/`offsetLeft` change AS the box morphs,
so the ResizeObserver fires repeatedly and the indicator chases a moving target on its own clock
while the box morphs on the spring — a guaranteed multi-clock jitter the DK7 single-scalar
discipline was supposed to eliminate. **HARDENING:** drive the rail indicator's travel off
`--dock-morph-t` (or a sibling rail scalar the orchestrator owns) so the highlight, the pane
crossfade, and the box morph are ONE clock; OR accept the rail highlight as a discrete reka-owned
affordance and DOCUMENT that the rail indicator is deliberately NOT on the morph clock (currently
it's a silent second clock that contradicts DK7's stated invariant).

### L3 — The rail is INSIDE the morph-clip aperture + the `.dock-layer--full` `:inert` pane. On a collapsing dock the whole switcher rail vanishes — there is no persistent way to switch layers while collapsed.
`DockLayerGroup` renders the rail as a child of the group, and a group nested in a collapsible
`<GlassDock>` sits inside `<div class="dock-layer dock-layer--full" :inert="!expanded">`
(`GlassDock.vue:515-520`). When the dock collapses, `--full` goes `:inert` +
`opacity:0 visibility:hidden pointer-events:none` (`dock.css:975-980`) AND the morph-axis
`overflow:clip` (`dock.css:176-179`) hides anything past the collapsed aperture. So the switcher
rail — the ONLY way to change the active layer — is unreachable while collapsed. The
`dock-nested-collapsible` showcase (`dock-layers.vue:177-205`) pairs a `show-rail` group (rail
DEFAULT true) with a collapsible dock, so this is a SHIPPED configuration. W45 minted the
`#persistent` region EXACTLY for "keep a control visible while collapsed," but the rail is NOT in
it. The result: to switch layers you must first hover-expand, find the rail, click — the rail can
never be a persistent navigation affordance. **HARDENING:** either (a) document that a switcher
rail is incompatible with a collapsible dock and the demo should pin `always-expanded` (the
`dock-nested-collapsible` story uses a bare collapsible dock — a contradiction), or (b) give the
rail a `#persistent`-region rendering option so it survives collapse (the iOS-segmented-control-in-
the-mini-bar idiom). Currently it's an un-flagged dead-end.

### L4 — Standalone `useLayerTransition` (`:382`) and the nested orchestrator (`dockMorphContext.ts`) are TWO near-identical 260/408-line FLIP engines that have already DRIFTED. One owner, duplicated.
`DockLayerGroup` self-orchestrates via `useLayerTransition` when standalone (`:101-114`) and DEFERS
to `useDockMorphOrchestrator` when nested (`:92-99`). The two engines re-implement the SAME measured-
once FLIP: `getSize` / pin `from=to=from` / 1-rAF deferral / `max-content` force-measure /
`armSpring`-vs-`armTarget`. **They have already diverged in a load-bearing way:** the orchestrator
re-bases SIBLING targets' `from` to their current painted px before resetting the shared scalar
(`dockMorphContext.ts:296-303`) so a swap-while-morphing carries every active target. The standalone
`useLayerTransition` has NO sibling logic (it's single-target) — fine in isolation, but it means a
standalone `DockLayerGroup` and a nested one have DIFFERENT mid-flight retarget behaviour from the
same author intent. The comment at `useLayerTransition.ts:226-244` and
`dockMorphContext.ts:324-340` are near-verbatim copies of the same 18-line measurement dance — a
copy-paste maintenance hazard the W26 TS-god-module wave does not name (it targets line-count >500,
and `dockMorphContext.ts` at 408 is under the threshold while being the worse duplication smell).
**Falsifiable:** the same `max-content` force-measure comment block appears at BOTH
`useLayerTransition.ts:233-242` and `dockMorphContext.ts:331-338`. **HARDENING:** extract the
measured-once FLIP-pin-measure-arm primitive into ONE helper both engines call (the standalone path
is a single-target instance of the multi-target orchestrator). The W42 liquid-morph-substrate wave
is the natural home — it already claims to "generalize the `provideMorphGroup` two-part seam"
(`dockMorphContext.ts:30-33`); fold the standalone path onto the same primitive so there is truly
ONE FLIP engine, not two that drift.

### L5 — The leaving-pane crossfade is `opacity: calc(1 - --dock-morph-t)` but the morph EARLY-RETURNS on a same-size swap — so a same-width layer switch shows NO crossfade at all (hard cut).
`armSpring`/`armTarget` early-return `settle()` when `Math.abs(toSize - fromSize) < 0.5`
(`useLayerTransition.ts:141-144`, `dockMorphContext.ts:254-257`) — no `[data-morphing]`, no scalar
write. But the leaving-pane fade is GATED on `[data-morphing]`:
`.glass-dock[data-morphing] .is-leaving { opacity: calc(1 - var(--dock-morph-t)) }`
(`dock.css:1011-1014`). So when two layers have the SAME width (common for icon+label panes of
equal length, or any rail-switched panes designed to a fixed width), the swap takes the early-return
path → `[data-morphing]` never arms → the leaving pane gets the base rule (no opacity transition,
`dock.css:970-973`) and the `:not(.is-active):not(.is-leaving)` rule snaps it to `opacity:0
visibility:hidden` the instant the class flips. Result: a HARD CUT between same-width layers, no
crossfade. The DK7 "smooth, no ghost/lag" claim only holds when the panes DIFFER in size. A
deliberately uniform-width layer set (the cleanest design) gets the worst transition. **HARDENING:**
decouple the crossfade clock from the size-morph early-return — run a minimal opacity ramp even on
a zero-span swap (a short crossfade scalar that always arms), OR document that same-size layers cut
rather than fade. Currently the smoothness silently depends on panes having different widths.

### L6 — DK9 (vertical-dock vs rail differentiation) is UNRATIFIED and UNBUILT. The user named `/navigation/rail` explicitly; the rail still force-couples orientation and the contrast section does not exist.
Pass-2/DK9 + `convergence2/A-dock-rail.md §2`: differentiate the VERTICAL dock vs the `variant="rail"`
whole-dock. W06 §A.3 frames an Option-A-vs-B RATIFY gate (keep `variant="rail"` as a distinct
refined variant vs retire it for `orientation="vertical" + chrome`) and explicitly marks it
"surface to user, do not self-decide" (`W06:604-611`). **Falsifiable status:** the RATIFY is still
open (no decision recorded in PROGRESS or the JSONs), the vertical-vs-rail CONTRAST section
(DK10) does not exist in any demo (`dock-layers.vue` has a "Rail-hosted layer stack" + "Vertical
overflow" section but NO side-by-side `orientation="vertical"` vs `variant="rail"` contrast), and
`GlassDock.vue:171-175` STILL force-couples `variant === "rail"` → `orientation = "vertical"`
(the leaky alias A-dock-rail flagged). So the user's DK9 ask ("the rail should BE a distinct
recognizable thing") is neither decided nor demonstrated. W06 — which owns it — has been `planned`
since W00. **HARDENING:** surface the DK9 Option-A-vs-B decision to the user NOW (recommend Option
A per the audit), then build the DK10 side-by-side contrast section so the differentiation is
teachable. Do not let W06 close "honest rail" without the contrast section that is its whole DK9
point.

### L7 — The three "rail" surfaces still collide as one noun. `variant="rail"` whole-dock, `.dock-layer-rail` switcher, and `<InstrumentRail>` share the word with no in-product disambiguation.
`A-dock-rail.md §0` enumerates the collision (layer-switcher rail vs `variant="rail"` whole-dock
vs `<InstrumentRail>` cockpit chassis vs W45's `#persistent` strip). W06 promises to SIGNPOST the
disambiguation in the manifest descriptions (`W06:626-630`) — but W06 is unbuilt, and the demo
currently has a "Switcher rail" section AND a "Rail-hosted layer stack" section AND a `variant="rail"`
dock all on the SAME `/navigation/dock-layers` page (`dock-layers.vue:106,140`) with no
clarification that "rail" means three different things. A consumer reading the demo cannot tell the
layer-switcher rail (a `Tabs` strip) from the `variant="rail"` whole-dock from the InstrumentRail.
**HARDENING:** the disambiguation is a NAMING decision that should land BEFORE W06's IA carve — at
minimum rename the layer-switcher's user-facing label (e.g. "layer switcher" not "rail") so the
noun-collision does not propagate into the W18 IA category names. This is cheap and unblocks the
W06/W18 IA clarity.

### L8 — The active-layer focus re-home (`DockLayer.vue:54-67`) only fires when focus is ORPHANED — a deliberate switcher-rail click LEAVES focus on the rail tab, but the just-revealed pane gets NO focus, so keyboard users land nowhere useful.
The W45/AW.W3 post-swap focus routing (`DockLayer.vue:54-67`) re-homes focus to the revealed pane
ONLY when the previously-focused element is orphaned (`document.activeElement` is body/null or
inside an `[inert]` ancestor — `:58-63`). When you click a RAIL TAB to switch layers, focus stays
on the rail `[role=tab]` (which is NOT inside the inert pane — it's in the rail, a sibling), so the
orphan guard `return`s early (`:64`) and focus stays on the tab. That is APG-correct for a tablist
(focus stays on the tab; the panel is reached via Tab). BUT the panes here are NOT
`role="tabpanel"` with `tabindex` — they're `.dock-layer-item-host` divs with `tabindex="-1"`
only when inactive (`DockLayer.vue:77`). So the APG tab→panel relationship is BROKEN: the rail is
`role=tablist`/`role=tab` (`DockLayerGroup.vue:196-223`) but the panes it controls carry NO
`role="tabpanel"`, NO `aria-labelledby` back to the tab, and the active host's `tabindex` is
`undefined` (not `0`) so it is not in the tab order. A screen-reader user activating a rail tab is
told "tab, selected" but the revealed content has no programmatic relationship to the tab and no
focus lands on it. **HARDENING:** complete the APG tabs pattern — give the active
`.dock-layer-item-host` `role="tabpanel"` + `aria-labelledby` the corresponding tab id +
`tabindex="0"`, OR if the rail is conceptually a ToggleGroup (the CLAUDE.md Tabs-vs-ToggleGroup
contract), reconcile the role. Currently the rail is half-APG-tabs (the tablist half) with no panel
half — an incomplete contract the `proof:dock-a11y-contract` test does not catch because it only
asserts the tablist side.

### L9 — `DockLayer` registration order is render order, but the rail + the `directionTypes` layer-back/forward both key off `layers.value.findIndex` — a `v-for` with a changing key set silently reorders the rail and flips the swipe direction.
`DockLayer` registers on `onMounted` (`DockLayer.vue:29-35`) and the group pushes in mount order
(`DockLayerGroup.vue:46-50`). The rail renders `v-for="layer in layers"` in that registration order
(`:208`), and the standalone `directionTypes` computes `layer-back`/`layer-forward` from
`layers.value.findIndex` (`:109-113`). **Mount order ≠ author order** when layers are conditionally
rendered or `v-for`-generated (the demo's `<DockLayer v-for="l in layers">` at `dock-layers.vue:74`
PLUS a separate `<DockLayer id="root">` at `:71` — the root registers first only because it's
authored first, but a re-order of the source array would silently reorder the rail and invert every
swipe-direction hint). There is no stable `order` prop; the descriptor list is purely insertion-
ordered with no re-sort on the authored sequence. A layer unmount/remount (e.g. a `v-if` layer)
re-pushes at the END (`:48`), permanently reordering the rail. **HARDENING:** either give `DockLayer`
an explicit `order?: number` and sort descriptors by it, or document that rail order === mount order
and a stable layer set is required (no conditional layers). Currently the rail order is an emergent
property of mount timing — fragile and undocumented.

---

## CHRONIC DEFERRALS / MISSES (slip-history)

- **CHRONIC-L1 — DK8 fixed the indicator AXIS but missed the indicator COUNT.** The DK8 fold
  (W45) re-authored `.dock-layer-tab-indicator` to be axis-aware (the headline "indicator never
  reached the active tab" bug) — a real fix — but never noticed the rail mounts a SECOND phantom
  indicator from the local `TabsList` default (L1). The same class of miss as the broader
  "headless-green over a wrong magnitude": the a11y test was UPDATED for DK8 (`DockLayerRail.a11y.test.ts`
  comment `:118` "AX.W45 DK8") yet the test asserts `toBeTruthy()` on the dock-classed indicator
  and is structurally blind to the phantom. Slip: DK8 touched this exact file and exact test and
  still missed the double-render. This is the AU.W8.4 → W45 DK8 rail lane slipping on its own
  surface across two waves.

- **CHRONIC-L2 — W06 (the rail's honest-variant + DK9/DK10 contrast + the css carve) deferred
  since W00.** `dock.css` has grown 1227 → 1639 lines (W06:648) with no carve; the
  `dock/layer-group.css` partial that would house the rail rules is unwritten; the vertical-vs-rail
  contrast section (the DK9 point) does not exist; the rail type-narrow is unbuilt; the
  three-rail noun disambiguation (L7) is unsignposted. W06 is the rail lane's VISIBILITY surface and
  it keeps slipping (planned since W00, now sequenced DEAD LAST `W45→W54→W61→W06`). Every wave that
  touches `dock.css` (W45, W54, W56, W61) widens the carve W06 owes. Slip count: the entire AX
  tranche.

- **CHRONIC-L3 — capability-without-adoption, rail edition.** The switcher rail is a built reka-Tabs
  capability, but the demo's ONLY rail usages are showcase contrivances: the "Switcher rail" section
  uses `show-rail` default-true but the panes are trivial label rows (`dock-layers.vue:118-135`);
  the `dock-nested-collapsible` pairs a rail with a collapsible dock (L3 — the rail vanishes on
  collapse); the `dock-rail-layer-host` section uses `:show-rail="false"` and HAND-ROLLS its own
  `DockIconButton` switcher (`:152-166`) — i.e. the showcase that should demonstrate the rail
  instead BYPASSES it with `aria-pressed` buttons. So the rail's own demo opts OUT of the rail.
  Mirror of CH-dock's CHRONIC-3 (the persistent region adopted on 1/N docks) — the rail capability
  has ≥2 paper sites but the canonical usage is sidestepped.

- **CHRONIC-L4 — PROGRESS↔JSON inflation, layers/rail edition.** PROGRESS:63 marks W45
  `live-verified (DEVELOPED)`; the W45 JSON `liveArmOwed.headlineChecks` lists DK7 (layer-switch
  smooth) + DK8 (indicator reaches active tab, rail has a plate) as OWED live checks the orchestrator
  must run (`W45-dock-region-model.json:73,77`). No `W45-DELTA.md`, no `audit/visual/` capture of a
  layer switch or the rail. So the layer-switch smoothness (which L2/L5 show is conditional) and the
  rail correctness (which L1 shows is double-painted) are marked live-verified with zero captured
  proof — the cardinal-lesson inflation, recurring on the exact surfaces with new defects.

---

## HARDENING ACTIONS (to PERFECT the dock layers + rail — PLANNING, no code)

1. **Kill the phantom rail indicator (L1).** Pass `:indicator="false"` on the rail's `<TabsList>`
   in `DockLayerGroup.vue` (or compose raw reka `TabsList`), and add a `findAllComponents({name:
   "TabsIndicator"}).length === 1` assertion to `DockLayerRail.a11y.test.ts` so the double-render
   bites RED. Owned by W45-TUNE or W06 (whichever lands first on the rail surface).

2. **Put the rail highlight on the ONE clock (L2).** Drive `.dock-layer-tab-indicator` travel off
   `--dock-morph-t` (or a rail scalar the orchestrator owns) so the highlight + pane crossfade + box
   morph are one clock — finishing the DK7 single-scalar thesis the rail violates. If kept on reka's
   ResizeObserver clock by design, DOCUMENT it explicitly (currently a silent second clock).

3. **Resolve the rail-on-collapse dead-end (L3).** Either flag a switcher rail as
   `always-expanded`-only (and fix the `dock-nested-collapsible` showcase, which contradicts this),
   or give the rail a `#persistent`-region render option so it survives collapse. A wave fold
   (W45-TUNE or W61) owns the decision.

4. **Unify the two FLIP engines (L4).** Fold the standalone `useLayerTransition` path onto the
   multi-target orchestrator primitive (W42 liquid-morph-substrate is the natural home — it already
   claims to generalize the morph-group seam). One measured-once FLIP, not two that have already
   drifted on sibling-retarget behaviour.

5. **Fix the same-size-swap hard cut (L5).** Decouple the crossfade scalar from the size-morph
   early-return so a uniform-width layer set still fades. Re-verify on a deliberately equal-width
   pane set (the cleanest design currently gets the worst transition).

6. **Complete the APG tabs contract OR reconcile the role (L8).** Give the active
   `.dock-layer-item-host` `role="tabpanel"` + `aria-labelledby` + `tabindex="0"`, or reconcile the
   rail as a ToggleGroup per the CLAUDE.md Tabs-vs-ToggleGroup contract. Extend
   `proof:dock-a11y-contract` to assert the panel half, not just the tablist half.

7. **Surface the DK9 Option-A-vs-B RATIFY to the user + build the DK10 contrast (L6/L7).** Decide
   `variant="rail"` (recommend Option A — a distinct refined variant), then build the side-by-side
   `orientation="vertical"` vs `variant="rail"` contrast section, and signpost the three-rail noun
   collision (rename the layer-switcher's user-facing label so it does not collide). Land the naming
   BEFORE the W18 IA category carve.

8. **Stabilize rail order (L9).** Add `DockLayer order?: number` (sort descriptors), or document
   mount-order === rail-order and forbid conditional layers. Currently rail order is an emergent
   property of mount timing.

9. **Capture the binding paired-π DELTA for the layers/rail (CHRONIC-L4).** A real layer switch
   (different-size AND same-size panes), a rail-tab activation, and a collapse-while-switching, at
   ≥2 viewports × light/dark, to `audit/visual/`. Re-check L1 (one indicator), L2 (one clock), L5
   (fade not cut), L8 (focus/role) on the captured render. Re-mark W45 `live-pending` for the
   layers/rail surface until it lands.

---

## dockPerfection (gap-to-PERFECTION, layers + rail)

The layer engine has SOTA bones — one spring, FLIP, velocity-continuity, the W02 single-orchestrator
fold, the DK7 scalar-driven pane crossfade — and the W45 DK8 axis-aware indicator fix is real. But
the LAYERS + RAIL are NOT perfect, falling short on NINE concrete axes: (1) the rail renders TWO
indicators — a phantom `bg-secondary` pill from the local `TabsList` default that DK8 never noticed
(L1, BROKEN); (2) the rail highlight is on `--dock-motion-resize` while the pane is on
`--dock-morph-t` — DK7's killed second clock, alive one layer up (L2); (3) the switcher rail lives
inside the `:inert`/clipped `--full` pane so it VANISHES on collapse, with no persistent way to
switch layers (L3); (4) two near-identical 260/408-line FLIP engines (standalone vs orchestrator)
that have already drifted on sibling-retarget logic (L4); (5) a same-width layer swap takes the
size-morph early-return so the crossfade NEVER arms — a hard cut, the cleanest design getting the
worst transition (L5); (6) the rail is half-APG-tabs — a `role=tablist` with NO `role=tabpanel`
panes, so a rail-tab activation lands focus nowhere and has no programmatic panel relationship (L8);
(7) DK9 (vertical-vs-rail) is unratified and the DK10 contrast section unbuilt — the user's explicit
`/navigation/rail` ask undemonstrated (L6); (8) the three "rail" surfaces still collide as one noun
with no disambiguation (L7); (9) rail order is an emergent property of mount timing with no stable
ordering contract (L9). To PERFECT: kill the phantom indicator, unify the rail onto the one morph
clock, resolve the rail-on-collapse dead-end, merge the two FLIP engines, fix the same-size hard
cut, complete the APG panel contract, ratify + demonstrate DK9/DK10, disambiguate the rail noun,
stabilize layer order — and capture the binding paired-π DELTA the W45 JSON itself records as owed
for the layer switch + the rail.
