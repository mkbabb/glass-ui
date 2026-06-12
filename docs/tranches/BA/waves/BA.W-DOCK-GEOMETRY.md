# BA.W-DOCK-GEOMETRY — the dock control plate clipped flat, killed at the geometry root

**Name**: W-DOCK-GEOMETRY - the control-plate clearance + the scroll-port cross-axis un-clip
**Opens after**: BA Batch 1 (W-DARK-MATERIAL — the dark-register prerequisite, inv-5); runs ‖ W-CONFIG-CHASSIS ‖ W-GOO-REDRESS ‖ W-FADING-SCROLL (Batch 2 — disjoint file bounds)
**Agents**: 2 parallel
**Hard gate**: `proof:dock-plate-clearance` (born-RED) — three falsifiable source witnesses + a π readback DELTA: the hover/active control circle clears the inner clip edge on BOTH axes (the lozenge dies), the scroll-port companion-clip engages only on real over-cap content (the cross axis stays `visible` at fit-content), and the `contain: paint` root box is shown NOT to be the proximate clip for the in-pill plate. Plus the BA gestalt bar (inv-4): the W-REFLECT2 `proof:ba-gestalt` dock verdict, both modes, whole-dock capture.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's three stacked clipping mechanisms, not a blind
re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the
impl agent re-greps each anchor below at HEAD and confirms the three mechanisms still
hold; if any cite has drifted, the agent records the drift in PROGRESS and re-locates the
mechanism before proceeding — it does NOT re-invent the diagnosis. The lane already
proved the clip OWNER live (the `contain:none` + `overflow:visible` forced-root probe left
the plate STILL clipped — the inner scroll-port box wins, not the root); the re-ground
re-confirms that ownership, it does not re-litigate it.

Grounding findings (`audit/fleet/*.md`): **DC-1** (dock-clipping — the zero-slack
scroll-port clip box), **DC-2** (dock-clipping — the control-circle-equals-track-cell
fragility), **BA-RAILSEAT-3** (dock-rail-seat §5 — the `contain: paint` R8-6 sub-defect),
**WVR-6** (waves-vs-reality — the `contain:paint` clips in-pill hover plates; the
R4-RAIL patch covered only the rail sibling-escape, never the in-pill plate). Captures:
`docs/tranches/BA/audit/fleet/dock-clipping/{probe-bottomdock-active-light.png,
probe-bottomdock-active-DARK.png, probe-bottomdock-nocontain.png}` (the `nocontain` shot
is the load-bearing ownership proof) + `audit/ground/R8-06-dock-buttons-cutoff-rail-fanout.png`.

The three stacked root causes (each independently confirmed at HEAD this authoring):

1. **The control circle EXACTLY fills its track cell — 0px slack before the scale even
   applies (DC-2).** `--dock-control-size` (the icon-button square + `border-radius:
   var(--dock-control-radius, var(--radius-pill))` circle, `dock-controls/icon-button.css:21-22,27`)
   and `--dock-layer-height` (the track floor the layer box height-locks to,
   `dock/layers.css:223` → `min-height: var(--dock-layer-height)`) resolve to the SAME
   density literal — comfortable `2.5rem`/40px (`dock/density.css:76-89`: both read the
   `2.5rem` base × `--dock-scale`). A plate that is the full control circle therefore
   ALWAYS exactly fills the track with 0px to spare. Under `--scale-hover-dock` the
   hover circle grows to ~44px (`dock-controls/icon-button.css:76`) and overflows the
   40px clip box by ~2px each side; the `:active` darkened fill (`icon-button.css:85`) is
   the full 40px circle whose perimeter sits ON the clip edge → sliced even at rest
   scale. The block budget between control and pill exists ONLY on the dock ROOT padding
   (`--dock-padding-block` 6px, `dock/shell.css:103`), which the inner height-locked
   scroll-port box does NOT inherit.

2. **The scroll port arms the cross-axis clip UNCONDITIONALLY on fit-content shells (DC-1).**
   Both shell docks pass `overflow="scroll"` (`demo/layout/BottomDock.vue:118`,
   `demo/layout/SidebarDock.vue:174`) on short, `fit-content` rows that NEVER overflow.
   The CSS overflow-companion rule (a single-axis `auto`/`hidden`/`scroll` forces the
   OTHER axis to compute from `visible` to `auto`) then clips the cross axis:
   - **Horizontal** — `dock/overflow.css:33-42`: `.glass-dock.dock-scroll-x
     .dock-layer--full { min-width:0; overflow-x:auto }`. The companion makes
     `overflow-y` compute to `auto` → the 40px-tall block axis clips the 44px hover / full
     active circle top+bottom. Live clip ancestor: `.dock-layer.dock-layer--full.is-active`,
     `overflow-x:auto overflow-y:auto`, height 40px.
   - **Vertical** — TWO unconditional-at-rest sources: `dock/overflow.css:53-59`
     (`.glass-dock.vertical.dock-scroll-y { overflow-y:auto }`, the SidebarDock path) AND
     `dock/shell.css:188-194` (`.glass-dock.vertical.always-expanded:not([data-morphing])
     { overflow-x:visible; overflow-y:auto }`, the AX.W04 F6 at-rest cap+scroll port that
     fires on EVERY vertical always-expanded dock). The companion makes `overflow-x`
     compute to `auto` → the inline axis clips a vertical control's plate left/right.
   The fit-content shell pays the full cross-axis clip cost for ZERO scroll benefit. The
   horizontal NON-scroll story docks (root `overflow:visible`) do NOT clip — confirming
   the scroll/vertical port is the discriminator, not a universal dock trait. The
   shell.css F6 block ALREADY states the correct discipline for its own case ("the scroll
   port only engages on real over-cap content", `shell.css:184-187`) but does not honor it
   for the plate's cross axis.

3. **The root `contain: paint` is a SECOND clip box, NOT the proximate cause — but it
   re-bites if the inner box is widened (BA-RAILSEAT-3 / WVR-6).** `.glass-dock { contain:
   paint }` (`dock/shell.css:83`) establishes a clip at the dock border-box. The lane's
   forced-root probe (`probe-bottomdock-nocontain.png`: `contain:none` +
   `overflow:visible` on the root, plate STILL clipped) proves the inner scroll-port box
   is the proximate owner. BUT `contain: paint` is the R4-RAIL containment class
   (`contain:paint` clips ANY dock child) and was patched only for the rail sibling-escape
   (`.glass-dock-frame`, the W-RAIL-EXTEND escape), never for the in-pill hover plate — so
   once root cause 2 frees the inner cross axis, the plate's grow must be audited against
   THIS box (the dock padding is ~6px, the hover circle overruns the 55px-tall box edge).
   The audit decides whether the plate's grow stays inside the dock padding (no
   `contain:paint` edit needed) or the containment lifts for the control-plate band on the
   morph-settled axis (the `shell.css:172-175` at-rest-expanded `overflow:visible`
   precedent already lifts the morph-axis clip; the block axis for the horizontal dock
   stays clipped).

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '76,95p'   src/styles/dock/density.css                 # control-size == layer-height == 2.5rem base
sed -n '218,224p' src/styles/dock/layers.css                  # the .dock-layer min-height lock
sed -n '18,28p;70,90p' src/styles/dock-controls/icon-button.css  # control box + hover/active scale
sed -n '29,63p'   src/styles/dock/overflow.css                # the dock-scroll-x / dock-scroll-y ports
sed -n '83,84p;176,200p' src/styles/dock/shell.css            # contain:paint + the F6 vertical at-rest port
grep -n 'overflow="scroll"' demo/layout/BottomDock.vue demo/layout/SidebarDock.vue  # the fit-content shell props
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | DC-2 zero-slack plate==cell [fleet] | `dock-controls/icon-button.css:21-22,27` (control box+circle), `:76` (hover scale), `:85` (press scale); `dock/density.css:76-89` (`--dock-control-size`/`--dock-layer-height` SAME `2.5rem` base); `dock/layers.css:223` (`min-height` lock) | the plate circle exactly fills the track cell → 0px slack → the 1.1× hover / full active circle slices on the clip edge |
| 2 | DC-1 horizontal scroll-port cross-clip [fleet] | `dock/overflow.css:33-42` (`.dock-scroll-x .dock-layer--full` `overflow-x:auto`); `demo/layout/BottomDock.vue:118` (`overflow="scroll"`) | companion-rule forces `overflow-y:auto` on the 40px block axis → top+bottom slice |
| 3 | DC-1 vertical port cross-clip [fleet] | `dock/overflow.css:53-59` (`.vertical.dock-scroll-y` `overflow-y:auto`); `dock/shell.css:188-194` (F6 at-rest vertical port); `demo/layout/SidebarDock.vue:174` (`overflow="scroll"`) | two unconditional-at-rest sources force `overflow-x:auto` on the inline axis → left/right slice |
| 4 | BA-RAILSEAT-3 / WVR-6 contain:paint second box [fleet] | `dock/shell.css:83` (`contain: paint`); the `probe-bottomdock-nocontain.png` ownership proof; `dock/shell.css:172-175` (the at-rest-expanded morph-axis un-clip precedent) | the root containment is NOT proximate today but re-bites once the inner box frees; the plate's grow axis must be audited against it |

## Goal criterion

A dock control's hover/active/press round plate reads as a CLEAN CIRCLE — never a
flat-topped lozenge — on BOTH shell docks (horizontal bottom + vertical sidebar) in BOTH
modes, because the interaction plate has px of bleed room inside its containing box at
rest AND under the 1.1× hover scale, and because the scroll-port cross-axis clip no longer
fires on a fit-content shell that never scrolls. The R8-6 "round buttons partially cut
off" defect is dead at the geometry root, not papered over per control.

## Scope

1. **Decouple the plate diameter from the track cell — mint `--dock-control-safe-inset`
   (root cause 1).** The control circle must floor a notch BELOW its track cell so the
   maximal hover/active silhouette stays inside the clip box with margin. The token-first
   fix: `--dock-control-safe-inset` (a density-scaled px budget riding `--dock-scale`)
   guarantees the hover-scaled circle clears the containment edge — either the control
   plate diameter floors below `--dock-layer-height` by the inset, or the track cell
   floors a notch ABOVE the plate. The WCAG 2.5.5 44px floor stays on the CELL
   (`--dock-control-floor` clamp, `dock/density.css`), not the inset plate — the touch
   target is the cell, the painted plate is inset within it (the iOS-26 dock register: the
   selected plate drawn INSET in a larger touch cell). No per-control literal; the inset is
   one token the density cascade reads.

2. **Engage the scroll-port + cross-axis clip companions ONLY on real over-cap content
   (root cause 2).** Hold the CROSS axis genuinely `visible` so a control's plate paints
   past the track on the non-scroll axis, while keeping the scroll clip on the SCROLL
   (morph) axis only. The CSS overflow-companion trap (cross axis silently computing to
   `auto`) is the mechanical enemy: the horizontal `.dock-scroll-x .dock-layer--full`
   (`overflow.css:33-42`) and the vertical ports (`overflow.css:53-59` +
   `shell.css:188-194`) must pin the cross axis to `visible` explicitly (the MDN
   single-axis-clip-degrades-to-`hidden` caveat applies — pin it, do not leave it to
   compute). The fit-content shells then pay no cross-axis clip cost. This mirrors the
   discipline `shell.css:184-187` already states for its own at-rest case but never honored
   for the plate.

3. **Flip both shell docks off the unconditional `overflow="scroll"` (root cause 2,
   consumer half).** BottomDock.vue:118 + SidebarDock.vue:174 pass `overflow="scroll"` on
   `fit-content` rows that never overflow — arming the port for zero benefit. The shell
   docks drop to the grow-to-fit default (or the wave's chosen non-clipping overflow mode)
   so the scroll port is not engaged on every route. ONE attribute per file (the
   coordination-declared bound — see §Disjointness); the geometry fix (scope 1+2) holds
   even if a future dock genuinely needs `overflow="scroll"`, so this is the
   correctness-floor flip, not the load-bearing fix.

4. **Audit the `.glass-dock { contain: paint }` escape for the hover-grow axis (root cause
   3).** With the inner cross axis freed (scope 2), measure whether the hover/active circle
   stays inside the dock padding box or overruns the `contain: paint` border-box edge.
   Record the verdict: (a) the plate's grow stays inside the dock padding → no
   `shell.css:83` edit (the inset of scope 1 + the freed cross axis suffice); OR (b) the
   plate overruns → lift the containment for the control-plate band on the morph-settled
   axis, reusing the `shell.css:172-175` at-rest-expanded un-clip precedent. The
   `proof:dock-plate-clearance` W3 witness records WHICH verdict held with the live
   measurement, so a future agent cannot silently regress the box. The morph aperture's
   single-axis `overflow: clip` (`shell.css:146-167`) is NOT touched — the W2 clip-reveal
   morph stays intact (the forbidden `overflow:visible` on the morph axis would break it).

5. **Verify on BOTH orientations + ALL control families.** The fix lands for
   `.dock-icon-button`, `.dock-tab-button`, and the select/dropdown triggers — they all
   ride the same `.dock-layer--full` / vertical-port clip box (`dock-clipping` lane:
   "their pill plates clip identically when their intrinsic height equals the track
   floor"). The π readback captures the bottom (horizontal) AND sidebar (vertical) shell
   docks, hover + active + press states, both modes.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if decoupling the plate from the
  cell (scope 1) cannot be done with `--dock-control-safe-inset` in `dock/density.css` +
  `dock-controls/icon-button.css` WITHOUT re-tuning the shared `--dock-control-size`/
  `--dock-layer-height` density literals in a way that shifts the dock's resting silhouette
  (a cross-wave geometry the W-DOCK-SECTIONS Batch-3 rebuild inherits) — that is a
  scope-reveal; triumvirate (research the inset-vs-resize options + plan-augment the bound
  + redress), do NOT widen the density base unilaterally.
- **Hard-gate failures not local-edit-recoverable**: if after the inset + cross-axis
  un-clip the π readback STILL shows a sliced plate on one orientation (the companion-rule
  cross axis re-computing to `auto` despite the explicit `visible` pin, or a fourth clip
  box not in the lane's ancestor walk), that is a clip-ownership miss — triumvirate, do not
  loop on px-inset values.
- **Diagnostic loop halt**: if the plate still clips after the cross-axis pin and three
  iterations have not isolated which box owns the clip (the overflow-companion vs
  `contain:paint` vs a `--dock-layer--full` descendant), halt and triumvirate — re-run the
  lane's `contain:none`-forced ownership probe to re-establish the proximate box before any
  fourth edit.

## File Bounds

| File | Access |
|---|---|
| `src/styles/dock/density.css` | modify (mint `--dock-control-safe-inset` in the density cascade) |
| `src/styles/dock-controls/icon-button.css` | modify (apply the inset to the control plate diameter; clamp the hover/active grow inside the cell) |
| `src/styles/dock-controls/tab-button.css` | modify (the same inset on the tab plate) |
| `src/styles/dock-controls/triggers.css` | modify (the same inset on the select/dropdown trigger pill) |
| `src/styles/dock/overflow.css` | modify (pin the cross axis `visible` on `.dock-scroll-x`/`.dock-scroll-y` ports) |
| `src/styles/dock/shell.css` | modify-carve (pin the F6 vertical at-rest port's cross axis `visible`; the `contain:paint` audit verdict — edit ONLY if scope-4 verdict (b)) |
| `demo/layout/BottomDock.vue` | modify (the `overflow` attribute ONLY) |
| `demo/layout/SidebarDock.vue` | modify (the `overflow` attribute ONLY) |
| `scripts/proof-dock-plate-clearance.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:dock-plate-clearance` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `CLAUDE.md` | modify (record the control-plate clearance contract in the dock geometry section) |

Do NOT touch:

- `src/styles/dock/morph.css` / `useDockState` / `GlassDock.vue` structural morph — the
  W2 clip-reveal aperture (`shell.css:146-167`) and the morph machinery are out of scope;
  the cross-axis pin touches only the SCROLL ports + the F6 at-rest vertical port, never
  the `[data-morphing]` aperture rules.
- `src/styles/dock/rail-extend.css` / `DockRail.vue` / the rail seat geometry — the rail
  re-seat is **W-DOCK-SECTIONS** (Batch 3, hinge H3); BA-RAILSEAT-1/2 (the seat) is its
  defect, not this wave's. This wave owns ONLY the BA-RAILSEAT-3 `contain:paint`
  sub-defect (the plate clip), declared in the dock-rail-seat lane §5 as the mechanical
  half on the same band.
- `src/styles/dock-controls/dark-mode-toggle.css` / `touch-floor.css` — the touch floor
  (`--dock-control-floor` WCAG clamp) is READ by the inset (the floor stays on the cell),
  never redefined here; the toggle control rides the icon-button plate fix transitively.
- The shell docks' `railContext` writable-computed — **W-SHELL-HOLD** (Batch 0) owns the
  guard; this wave touches ONLY the `overflow` attribute (one attribute per file), never
  the railContext logic.
- The dark-register token files (`tokens.css`, `glass.css`, the `--glass-tint-*` seam) —
  **W-DARK-MATERIAL** (Batch 1, the prerequisite) owns them; this wave reads the resolved
  dark plate, never re-tunes it.
- Standing fences: the GL shader internals (aurora.frag, metaball.frag) unless a wave
  names them (none here); ppmycota purple never enters library tokens; the slides
  `docs/tranches/M/` docs are foreign.

### Disjointness

Two agent units, path-disjoint by construction:
- **BA.W-DOCK-GEOMETRY.1** (the plate-inset clearance) writes `dock/density.css`,
  `dock-controls/{icon-button,tab-button,triggers}.css`.
- **BA.W-DOCK-GEOMETRY.2** (the scroll-port cross-axis un-clip + the `contain:paint`
  audit) writes `dock/overflow.css`, `dock/shell.css` (modify-carve), `demo/layout/
  {BottomDock,SidebarDock}.vue`.

No file is written by both units. The gate (`scripts/proof-dock-plate-clearance.mjs`,
`package.json`, `scripts/gates.mjs`) + `CLAUDE.md` are orchestrator-integrated after both
units land — not a parallel write surface.

Across Batch 2 (declared coordination seams, not raced): W-CONFIG-CHASSIS writes the
configurator/labeled-field files (this wave does not); W-GOO-REDRESS writes goo-blob +
blob.vue (this wave does not); W-FADING-SCROLL writes `fading-scroll/*` +
`utilities/base.css` + the preset/segmented-tabs masks (this wave does not). The shell
docks are touched ONLY for the `overflow` attribute here — W-SHELL-HOLD already landed the
railContext guard (Batch 0), and the Batch-3 W-DOCK-SECTIONS rebuild supersedes both shell
surfaces (the EXECUTION-DAG §3 declares this acceptable: Batch 2's geometry fix is a
correctness floor the rebuild inherits, not throwaway styling).

## Agent Units

### BA.W-DOCK-GEOMETRY.1 the control-plate clearance inset

- Goal: a dock control's hover/active/press plate floors a notch below its track cell so
  the maximal circle stays inside the containing box with bleed margin — the lozenge dies
  at the plate diameter, not at the clip box.
- Mechanism: mint `--dock-control-safe-inset` in the density cascade (`dock/density.css`,
  one density-scaled px budget riding `--dock-scale`, in lockstep with the existing
  per-density geometry). Apply it so the control plate diameter resolves below
  `--dock-layer-height` by the inset (the plate inset within the cell), OR the cell floors
  a notch above the plate — the impl agent picks the form that keeps the WCAG 2.5.5 floor
  on the CELL (`--dock-control-floor` clamp untouched) and the painted plate inset. The
  `:hover` `--scale-hover-dock` and `:active` `--scale-press-dock` plates
  (`icon-button.css:76,85`; the same on `tab-button.css`/`triggers.css`) then grow within
  the inset budget. The control families share the same `--dock-control-size` token, so the
  inset reaches all three (icon-button, tab-button, trigger).
- Files: `dock/density.css`, `dock-controls/{icon-button,tab-button,triggers}.css`.
- Sub-gate: the gate's W1 witness — `--dock-control-safe-inset` is declared in the density
  cascade and consumed so the resolved control-plate diameter + the 1.1× hover scale is
  STRICTLY LESS than `--dock-layer-height` (source assert: the plate has a positive inset
  budget), AND the π readback measures the hover/active circle's top/bottom (horizontal)
  and left/right (vertical) slack ≥1px inside the track cell — no perimeter on the clip
  edge.

### BA.W-DOCK-GEOMETRY.2 the scroll-port cross-axis un-clip + the contain:paint audit

- Goal: the scroll-port companion-clip engages only on the scroll (morph) axis; the cross
  axis stays genuinely `visible` so a control plate paints past the track on the
  non-scroll axis on a fit-content shell, and the root `contain:paint` is audited as
  non-proximate (or lifted on the control-plate band per verdict (b)).
- Mechanism: (a) pin the cross axis explicitly `visible` on the scroll ports —
  `.dock-scroll-x .dock-layer--full` keeps `overflow-x:auto` but pins `overflow-y:visible`
  (`overflow.css:33-42`); `.vertical.dock-scroll-y` keeps `overflow-y:auto` but pins
  `overflow-x:visible` (`overflow.css:53-59`); the F6 at-rest vertical port already pins
  `overflow-x:visible` (`shell.css:188-194`) — confirm it survives + does not regress. The
  MDN single-axis-clip-degrades-to-`hidden` caveat means the cross axis MUST be pinned, not
  left to compute. (b) flip both shell docks off `overflow="scroll"` (one attribute each,
  `BottomDock.vue:118` / `SidebarDock.vue:174`) so the fit-content shells use grow-to-fit.
  (c) audit `contain:paint` (`shell.css:83`) against the freed plate: measure live whether
  the hover circle stays inside the dock padding box; record verdict (a) no edit or (b)
  lift the containment on the control-plate band reusing the `shell.css:172-175` precedent.
- Files: `dock/overflow.css`, `dock/shell.css` (modify-carve), `demo/layout/
  {BottomDock,SidebarDock}.vue`.
- Sub-gate: the gate's W2 + W3 witnesses — W2: the scroll ports pin the cross axis
  `visible` (source assert: no `.dock-scroll-x`/`.dock-scroll-y` rule leaves the cross axis
  to the companion `auto`; the shell docks pass no `overflow="scroll"`), AND the π readback
  on the fit-content shell measures the cross-axis clip ancestor as `overflow:visible` (not
  `auto`). W3: the `contain:paint` audit verdict is recorded with the live measurement (the
  plate-inside-padding number), so the proximate-box ownership is a gate fact, not prose.

## Hard Gate

`proof:dock-plate-clearance` (born-RED at HEAD, driven GREEN by the wave) — three
falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring
`proof-dock-no-scale-pop.mjs` / `proof-dock-rail-hairline.mjs`), each red at HEAD pre-wave:

1. **W1 — the plate clears the cell (the inset budget exists).** `--dock-control-safe-inset`
   is declared in the density cascade AND consumed so the resolved control-plate diameter
   + the `--scale-hover-dock` grow is STRICTLY LESS than `--dock-layer-height` — the plate
   has a POSITIVE inset budget on every density rung. **Bite-tightening (anti-evasion)**:
   the source half asserts the POSITIVE inequality (plate × hover-scale < cell) per
   density rung, NOT merely "the token name exists" (a declared-but-unconsumed
   `--dock-control-safe-inset: 0px` passes a name-grep while the plate==cell defect lives —
   a `0px` inset is the dead-knob evasion the AX.W55 substitution class warns of). RED at
   HEAD: `dock/density.css:76-89` resolves `--dock-control-size` == `--dock-layer-height`
   (both `2.5rem` base) → zero slack; no `--dock-control-safe-inset` exists (grep returns 0).
2. **W2 — the scroll-port cross axis stays visible (no companion-clip on fit-content).**
   No `.dock-scroll-x .dock-layer--full` / `.glass-dock.vertical.dock-scroll-y` rule leaves
   the CROSS axis to the overflow-companion `auto` — the cross axis is POSITIVELY pinned
   `visible` (not merely "some overflow value other than auto"; a `hidden` pin still clips
   the plate, so the bite requires `visible` specifically on the cross axis), AND both shell
   docks pass NO `overflow="scroll"` (`BottomDock.vue` / `SidebarDock.vue` source assert).
   RED at HEAD: `overflow.css:33-42` sets only `overflow-x:auto` (cross-y computes to
   `auto`); `overflow.css:53-59` sets only `overflow-y:auto` (cross-x computes to `auto`);
   both shell docks pass `overflow="scroll"`.
3. **W3 — the contain:paint audit is a recorded gate fact, not prose.** The
   `proof:dock-plate-clearance` artefact records the scope-4 verdict — (a) the plate stays
   inside the dock padding box (the live `getBoundingClientRect` margin number) so
   `shell.css:83` is unedited, OR (b) the containment is lifted on the control-plate band
   on the morph-settled axis (the source assert that the lift is `[data-morphing]`-guarded
   so the W2 clip-reveal aperture is intact). RED at HEAD: no such verdict is recorded; the
   `probe-bottomdock-nocontain.png` ownership proof is the only evidence and it lives only
   in the lane report.
4. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface): a live
   capture of BOTH shell docks at `:5199` (the bottom horizontal + the sidebar vertical),
   hover + active + press states, BOTH modes, with a paired π readback proving (a) the
   hover/active circle's slack inside the track cell is ≥1px on EVERY axis (no perimeter on
   the clip edge — the lozenge is a clean circle), (b) the cross-axis clip ancestor on a
   fit-content shell computes `overflow:visible` (not the companion `auto`), and (c) the
   plate's painted silhouette is a full circle against the dock backdrop (no flat top/bottom
   or left/right edge). Captured to `docs/tranches/BA/audit/visual/W-DOCK-GEOMETRY-DELTA.md`
   with before/after frames against the `fleet/dock-clipping/probe-bottomdock-active-DARK.png`
   baseline. **The π half is the binding visual truth — if the source half passes but the
   live shell-dock render still shows a sliced lozenge, the wave does NOT close (the
   WVR-6/A1-1 source-green/visually-broken gap is exactly the AZ close-class failure BA
   inv-4 forbids).**
5. **The BA gestalt bar (inv-4 — the P-1 close-class fix).** Per-mechanism W1-W3 greens +
   the π readback do NOT alone close this visual wave. The dock surface carries a HOLISTIC
   verdict at W-REFLECT2 via `proof:ba-gestalt` (minted in W-GESTALT-GATE): the whole dock
   captured both modes over its real backdrop, judged as a gestalt ("does the dock read as
   a designed whole — clean circular plates, no clipped silhouette, on a real route?").
   This wave's redress is one input to that verdict; the gestalt PASS is binding at the
   batch's reflection, not at this wave's mechanism greens.

W1-W3 are the device-free CI half (`proof:dock-plate-clearance`); the π readback + the
`proof:ba-gestalt` dock verdict are the binding visual truth. All must hold for a clean
close.

## Format And Lint Cadence

`npm run build` after the CSS partial edits to confirm `dock/{density,overflow,shell}.css`
+ the `dock-controls/*` partials compile; `npm run typecheck` after the shell-dock
attribute edits (the Vue SFC props); `node scripts/proof-dock-plate-clearance.mjs`
born-RED before the source edits (proof it fails at HEAD), GREEN at close;
`npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration;
`git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-DOCK-GEOMETRY-DELTA.md` — before/after shell-dock frames
  (bottom + sidebar, hover/active/press, both modes) + the paired π readback (plate slack
  per axis, cross-axis clip-ancestor `overflow` value, the `contain:paint` audit number).
- The `proof:dock-plate-clearance` JSON artefact (born-RED log + GREEN-at-close log, with
  the recorded scope-4 verdict).
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit (unit 1): `fix(dock): control-plate clearance inset — plate floors below the track cell (BA.W-DOCK-GEOMETRY)` — names `--dock-control-safe-inset` + the three control families in the body.
- impl commit (unit 2): `fix(dock): scroll-port cross-axis un-clip + shell-dock overflow flip + contain:paint audit (BA.W-DOCK-GEOMETRY)` — names the cross-axis pin, the shell-dock attribute flip, and the recorded contain:paint verdict.
- gate commit: `test(dock): proof:dock-plate-clearance born-RED→GREEN + parity registration`.
- doc/status commit: the CLAUDE.md control-plate-clearance record + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1, the prerequisite — the dark plate the π
  readback captures over must be the rebuilt dark register, not the flat near-black, or the
  capture stales at the dark fix; inv-5). W-SHELL-HOLD (Batch 0, already landed) — the
  shell docks must hold their page for the live π capture to land on a stable route. No
  structural code dependency on the parallel Batch-2 siblings (disjoint bounds).
- **Blocks**: W-DOCK-SECTIONS (Batch 3) inherits this clearance floor when it rebuilds the
  shell docks' section model + re-seats the rail (the rebuilt section chassis composes the
  same control plates; the clip-free geometry is a correctness floor the rebuild keeps).
  W-DOCK-MORPH-INSITU (Batch 3) demonstrates the morph in-situ on the same shell docks.
  W-REFLECT2 (Batch 7) reads the dock gestalt verdict this wave's redress feeds.

## Archaeology

Prior attempt: R4-RAIL (AX) root-caused the original black-blob as `.glass-dock { contain:
paint }` clipping ANY dock child and patched it with the `.glass-dock-frame` SIBLING ESCAPE
for the RAIL — but never for the in-pill hover plate (WVR-6: "the R4-RAIL root cause was
patched only for the RAIL, never for the in-pill hover plate"). W-RAIL-EXTEND / R4-RAIL
shipped `live-verified` while the in-pill plate stayed clipped (waves-vs-reality: ERODED,
R8-1/R8-6). The new guardrail: this wave's gate asserts the RENDERED plate clearance (the
plate clears the cell on both axes, the cross axis stays visible, the contain:paint verdict
is recorded) with a π readback on BOTH shell docks — not the rail-escape the prior close
proved — and the gestalt bar (inv-4) holds the whole-dock verdict above the per-mechanism
green, closing exactly the source-green/visually-broken gap that re-opened R8-6.
