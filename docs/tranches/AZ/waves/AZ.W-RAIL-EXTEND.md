# AZ.W-RAIL-EXTEND — the net-new hairline-rail facility: an extended dividing line BEYOND the dock with an end icon controlling the dock's layer context

**Tranche** AZ (glass-ui) · **Batch** 2 (runs AFTER W-DOCK-TAXONOMY — it consumes the renamed surface AND the reserved "rail" noun) · **Type** net-new structural primitive · **Status** SPEC · **Depends** W-DOCK-TAXONOMY (the noun reservation + the renamed dock surface) ‖ W-DOCK-CONTEXT (the layer-context seam the end icon drives — coordinate per §6) · **Repo** glass-ui · **Base** tranche/AY @ v3.10.1 · **HEAD** tranche/AZ

This wave builds the WHOLLY NET-NEW facility R3-2 names beyond the dock-disambiguation: *"a hairline-RAIL facility — an extended dividing line that goes BEYOND the dock, with a left/right-most icon controlling the dock's context."* The fleet confirmed it does not exist (E3G-1 GAP S1): the only "rail" today is the IN-dock switcher (`.dock-layer-rail`), which lives inside the clipped pane and disappears on collapse; `DockSeparator` is an INTERNAL divider between item groups that does not extend past the dock edge nor carry an end-icon context control. This is a new primitive — a hairline that runs beyond the dock with a leading/trailing icon that switches the dock's layer context — rendered as a GlassDock chrome slot OUTSIDE the clipped pane so it survives collapse. It is born with ≥2 demo consumers (the ≥2-consumer bar — invariant on every primitive birth).

---

## §0 — RE-GROUND (step-0 re-grep mandate)

Before any edit, re-grep EVERY cite at HEAD and confirm it reads as recorded. Grounding finding ids: **E3G-1** (FLEET-DIGEST.md:802-803 — the net-new GAP S1, the API sketch, the closest substrates), **C1-R3-2-hairline-rail-netnew** (FLEET-DIGEST.md:436-437). User item: **R3-2** (USER-AUDIT-2026-06-10-R3.md:23 — "an extended dividing line that goes BEYOND the dock, with a left/right-most icon controlling the dock's context").

Re-grounded at authoring:

- **The facility does not exist.** E3G-1 (FLEET-DIGEST.md:802): "the 'extended dividing line that goes BEYOND the dock with a left/right-most icon controlling context' does NOT exist. The only rail today is the IN-dock switcher rail (DockLayerGroup's reka Tabs `<TabsList class='dock-layer-rail'>`), which lives INSIDE the clipped --full pane and disappears on collapse. A PERSISTENT rail rendered OUTSIDE the pane is explicitly BOOKED (not built) to AY.W-GOD1."
- **`DockSeparator` is the closest substrate but is internal.** `src/components/custom/dock/DockSeparator.vue:30-43` — an orientation-aware 1px divider that paints PERPENDICULAR to the dock's layout axis (vertical hairline in a row dock; horizontal rule in a column dock; full-row section break in a grid dock), reading `useOptionalDockContext()`. It is a flex-gap divider BETWEEN item groups; it does NOT extend past the dock edge and carries no end-icon. The new facility EXTENDS this idiom (the perpendicular-paint + axis-awareness) past the edge with a context control.
- **The hairline tokens are minted.** `src/styles/tokens/glass.css:159-161` — `--hairline-catch-light` (`inset 0 0.5px 0 0 rgb(255 255 255 / 0.06)`) + `--hairline-under-shadow` (`0 0.5px 0 0 rgb(0 0 0 / 0.04)`) compose `--border-hairline`; the `--border-border-soft` whisper rung is at `color-radius.css:89`. The facility composes these (the 0.5px catch-light + under-shadow pair the dock + instrument-chassis already speak) — no new tokens.
- **The end-icon drives the layer context.** The dock's layer system is `DockLayerGroup` + `DockLayer` + `provideDockLayerGroupContext` (the layer registry; `v-model:active`). The end-icon advances/selects the active layer — it is a SECOND control on the same `active` model the switcher rail drives, but persistent (outside the clip). W-DOCK-CONTEXT adds the page/route → layer-set seam; this wave's end-icon is the manual context control over the same registry (§6 coordination).
- **The persistence requires a chrome slot.** The in-dock rail vanishes on collapse because it is inside the `--full` clip. This facility renders OUTSIDE the clipped pane — the "GlassDock chrome slot" the W-GOD1 carve booked. RE-GROUND must confirm whether the chrome slot landed in W-DOCK-TAXONOMY (arm-dependent) or whether this wave carves it; if absent, this wave adds the slot (the persistence is the facility's whole point).

If any cite has shifted, STOP and reconcile §3 before editing — do not re-derive the GAP (invariant 3).

---

## Goal criterion

A consumer can compose a hairline divider that runs BEYOND the dock's edge, carrying a leading/trailing icon that switches the dock's layer context, and the hairline + its end-icon PERSIST when the dock collapses (they are dock chrome, not in-pane content). The facility reads as a finished iOS-26 whisper hairline (the `--border-hairline` register), not a hard rule, and binds the SAME layer registry the in-dock switcher drives — one context model, two affordances.

## Completion criterion

The hard-gate set (§4) verifies on captured artefacts: **HG1** — the `<DockRail>` (or the reserved name per W-DOCK-TAXONOMY §6) primitive exists, extends a hairline beyond the dock edge, and binds a leading/trailing end-icon to the dock's `active`-layer model (a captured DELTA showing the hairline-beyond-edge + the end-icon switching layers). **HG2** — the facility PERSISTS on dock collapse (a captured before/after: the dock collapses, the hairline + end-icon remain visible and interactive). **HG3** — ≥2 live consumers at birth (the demo shell `SidebarDock` + a `dock/` story, OR `BottomDock` + a story — the ≥2-consumer bar), proven by `proof:rail-extend-consumers` (born-RED if <2). **HG4** — `proof:rail-extend` asserts the facility composes the `--border-hairline` tokens (no hard rule, no new tokens) + binds the layer registry (not a parallel state path).

---

## §1 — The verified defects / gaps (file:line, source-grounded)

**G1 — the hairline-rail-beyond-dock facility is wholly absent.** E3G-1 (FLEET-DIGEST.md:802) + C1-R3-2-hairline-rail-netnew (FLEET-DIGEST.md:436): the R3-2 "extended dividing line beyond the dock with an end-icon controlling context" is NET-NEW. The closest substrates — `DockSeparator` (internal, no extent, no icon — `DockSeparator.vue:10-34`), the hairline tokens (`glass.css:159-161`), the CSS-only `instrument-rail.css` bezel grammar (no Vue host) — are pieces, not the facility. A `RailController`/`DockRail` primitive (a `DockSeparator` that extends past the dock edge + binds a leading/trailing context-switch icon, rendered as a GlassDock chrome slot so it survives collapse) does not exist.

**G2 — the in-dock switcher vanishes on collapse; there is no persistent layer-context control.** The only layer-switch affordance is `.dock-layer-rail` inside the clipped `--full` pane (E3G-1). On collapse the pane clips away and the user has no way to switch the dock's layer context. The new facility's whole reason is persistence — the end-icon is a context control that survives collapse because it is chrome, not in-pane content.

**G3 — `DockSeparator` cannot carry an icon or extend past the edge.** `DockSeparator.vue:46-52` renders a bare `<div class="dock-separator">` — a flex-gap divider with no slot for an icon and no mechanism to extend its painted length past the dock's content box. The facility EXTENDS the perpendicular-paint idiom but adds (a) an icon slot/prop and (b) a beyond-edge extent.

---

## §2 — Objective

Build the net-new hairline-rail facility with ≥2 consumers at birth. Five moves:

1. **Author the `<DockRail>` (reserved name) primitive.** A new SFC in `src/components/custom/dock/` that renders a hairline running beyond the dock edge (`extent="beyond"` per the E3G-1 API sketch) with a `position: "start" | "end"` (which edge it anchors) and a leading/trailing icon slot. It reads `useOptionalDockContext()` for orientation (the `DockSeparator` idiom — perpendicular paint, axis-aware) and EXTENDS the painted hairline past the dock's content box (the beyond-edge geometry). It composes `--border-hairline` (the 0.5px catch-light + under-shadow pair — no new tokens). The name is the one W-DOCK-TAXONOMY §6 reserved (if arm-b took `DockRail` for the vertical dock, this facility takes `<DockHairline>`/`<DockContextRail>` — the orchestrator's H2 pick decides; the §6 reservation is binding).

2. **Bind the end-icon to the dock's layer context.** The icon is a `DockIconButton` that advances/selects the dock's active layer — it writes the SAME `v-model:active` the `DockLayerGroup` switcher drives (one registry, not a parallel state path). For a dock without a `DockLayerGroup`, the icon is a `v-model:context` the consumer wires (the E3G-1 sketch `v-model:context`). The binding is to the layer registry (`provideDockLayerGroupContext` / the `active` ref), reached via inject — NOT a new context store.

3. **Render it as a GlassDock chrome slot (the persistence — G2).** The facility renders OUTSIDE the clipped `--full` pane (a `#rail` / chrome slot on `GlassDock`, the W-GOD1-booked carve). If the chrome slot did not land in W-DOCK-TAXONOMY (arm-dependent — re-ground confirms), this wave carves the minimal slot: a named slot on `GlassDock` rendered outside the clip aperture, so its content survives collapse. The hairline + end-icon stay visible + interactive when the dock collapses (HG2).

4. **Wire ≥2 demo consumers at birth (the ≥2-consumer bar).** The demo shell `SidebarDock` (vertical) gains the facility (a hairline beyond its bottom edge with a context end-icon) AND a `dock/` story (`dock/rail.vue` or a new `dock/hairline-rail.vue`) demonstrates it — OR `BottomDock` + a story. Two LIVE consumers, not one consumer + a re-export (invariant: a primitive ships only when ≥2 consumers).

5. **Author `proof:rail-extend` + `proof:rail-extend-consumers`.** The structural + consumer-count gates (§3): the facility composes `--border-hairline` (no hard `border: 1px solid`), binds the layer registry (not a parallel state), extends beyond the edge, persists on collapse; and has ≥2 live consumers.

This honors gestalt (EXTENDS the `DockSeparator` axis-aware idiom + the hairline-token register rather than a parallel divider), no-workaround (binds the existing layer registry, not a new state store), the ≥2-consumer bar (two live consumers at birth), and the cardinal DELTA (a captured hairline-beyond-edge + persistence-on-collapse frame-series).

---

## §3 — Files + exact edit-sites (re-grep at HEAD before editing)

| file | edit |
|---|---|
| NEW `src/components/custom/dock/DockRail.vue` (reserved name per W-DOCK-TAXONOMY §6) | the facility SFC: props `extent: "beyond" \| "inset"` (default `"beyond"`), `position: "start" \| "end"`, `icon?: Component`, `v-model:context?` (or binds the injected `DockLayerGroup` `active`). Reads `useOptionalDockContext()` for orientation (the `DockSeparator` idiom). Composes `--border-hairline` for the 0.5px hairline; extends the painted line past the dock content box. Renders the end-icon as a `DockIconButton`. |
| NEW `src/styles/dock/rail-extend.css` (or fold into `dock/layers.css`) | the beyond-edge hairline geometry: the hairline composes `box-shadow: var(--border-hairline)` (NOT a hard `1px solid`); the perpendicular-paint axis rule (row dock → vertical hairline extending past the inline edge; column dock → horizontal rule extending past the block edge); the `extent="beyond"` length rule (the hairline overruns the dock content box by `--dock-rail-extend-length`, a new dock-scoped token defaulting to a proportioned overrun). The end-icon sits at the `position` end of the overrun. |
| `src/components/custom/dock/GlassDock.vue` | add the chrome slot (`#rail` or a named slot) rendered OUTSIDE the clip aperture so the facility survives collapse (G2 — the persistence). Re-ground: confirm whether the W-GOD1-booked chrome slot already landed in W-DOCK-TAXONOMY; if so, consume it; if not, carve the minimal outside-the-clip slot here. |
| `src/components/custom/dock/index.ts` | export the new `<DockRail>`/`<DockHairline>` + its props type on the `/dock` barrel. |
| `demo/layout/SidebarDock.vue` | consumer #1: add the facility (a hairline beyond the vertical dock's edge + a context end-icon driving the dock's active layer). Re-grep the current `<GlassDock>` invocation (it carries the `#persistent` home + nav + `#collapsed` dark-toggle — the facility joins as the new chrome slot, not displacing the nav-pattern). |
| `demo/stories/dock/rail.vue` (or NEW `demo/stories/dock/hairline-rail.vue`) | consumer #2: the story demonstrating the facility — the hairline-beyond-edge + the end-icon switching layers + the persistence-on-collapse. (If `rail.vue` is re-used, it is the post-W-DOCK-TAXONOMY rail.vue, not the retired "three rails" one.) |
| NEW `scripts/proof-rail-extend.mjs` | the structural gate: clause R1 — the facility composes `box-shadow: var(--border-hairline)` (no hard `border: 1px solid` on the hairline); R2 — it binds the layer registry (`inject` of the `DockLayerGroup` active model / a `v-model:context`, NOT a new `ref` store); R3 — `extent="beyond"` overruns the dock content box (the `--dock-rail-extend-length` rule present); R4 — it renders outside the clip aperture (the chrome-slot, persistence). |
| NEW `scripts/proof-rail-extend-consumers.mjs` (or a clause in `proof:rail-extend`) | the ≥2-consumer bar: assert ≥2 LIVE `<DockRail>`/`<DockHairline>` mounts in `demo/` (born-RED if <2). |
| `package.json` | add `"proof:rail-extend": "node scripts/proof-rail-extend.mjs"` (+ the consumers clause); `proof:gen-ci-fresh` re-lock if it joins CI. |
| `CLAUDE.md` (dock section) | document the new facility (the hairline-rail-beyond-dock, its `extent`/`position`/end-icon contract, the persistence-via-chrome-slot, the ≥2-consumer note). |
| NEW `docs/tranches/AZ/audit/visual/W-RAIL-EXTEND-DELTA.md` | the write-up: the facility API, the hairline-beyond-edge + end-icon-switching capture (HG1), the persistence-on-collapse before/after (HG2), the ≥2-consumer proof (HG3), the `proof:rail-extend` born-RED/GREEN stdout. |

---

## §4 — HARD GATE (evidence-backed, born-RED)

The named born-RED gate is **`proof:rail-extend`** (+ the `proof:rail-extend-consumers` clause). A SET of structural + captured conditions backed by artefacts — the runtime claim (the hairline extends + the end-icon switches + persistence) is backed by a CAPTURED DELTA, never a grep-only "the SFC exists" check.

**HG1 — the facility extends a hairline beyond the dock + binds the end-icon to the layer context.** A captured DELTA shows: (a) the hairline runs PAST the dock's content box (`extent="beyond"` — the overrun visible), composed from `--border-hairline` (a whisper, not a hard rule); (b) clicking/advancing the end-icon SWITCHES the dock's active layer (the rendered layer content changes). Born-RED side: `proof:rail-extend` REDs if the hairline uses a hard `border: 1px solid` (not the token) or if the end-icon writes a parallel state instead of the layer registry. Captured: the hairline-beyond-edge + end-icon-switching frame-series in the DELTA.

**HG2 — the facility PERSISTS on dock collapse.** A captured before/after: the dock collapses (the `--full` pane clips away), and the hairline + end-icon REMAIN visible and interactive (they are chrome, outside the clip). Born-RED side: if the facility renders inside the clip aperture, it vanishes on collapse and the persistence assertion REDs. Captured: the collapse before/after (dock expanded → collapsed, the rail still present) in the DELTA.

**HG3 — ≥2 live consumers at birth.** `proof:rail-extend-consumers` asserts ≥2 LIVE `<DockRail>`/`<DockHairline>` mounts in `demo/` (the shell dock + a story). Born-RED: with only 1 consumer the gate exits 1. Captured: the consumer census stdout in the DELTA (the ≥2-consumer bar — invariant on primitive birth).

**HG4 — the facility composes the hairline tokens + binds the registry (no parallel state, no new tokens).** `proof:rail-extend` clauses R1 (`--border-hairline`, no hard rule) + R2 (the layer registry binding, not a `ref` store) GREEN. Born-RED: a hand-edit to a hard `1px solid` border or a `ref()`-based parallel active model REDs the gate. Captured: the born-RED diff + the GREEN stdout.

**The single binding condition:** the hairline-rail facility extends beyond the dock edge with a layer-context end-icon (HG1, captured), persists on collapse (HG2, captured), has ≥2 live consumers (HG3), and composes the hairline tokens + the existing layer registry rather than a hard rule + a parallel state (HG4). `proof:rail-extend` REDs on any regression of the four.

---

## §5 — Scope fence

- ONLY the net-new hairline-rail facility + its ≥2 consumers + its gate. The dock taxonomy rename (W-DOCK-TAXONOMY), the in-dock switcher rail visuals (W-DOCK-RAIL), and the page/route → layer-set seam (W-DOCK-CONTEXT) are NOT owned here.
- The facility binds the EXISTING layer registry; it does NOT add a new context store or a parallel `active` model (the no-workaround discipline).
- It composes the EXISTING `--border-hairline` tokens — no new color/shadow tokens beyond the one dock-scoped `--dock-rail-extend-length` extent token (a geometry knob, consumer-overridable).
- The GlassDock chrome slot, if it must be carved here, is the MINIMAL outside-the-clip slot — not a re-architecture of the clip aperture (the AY single-scalar clip morph is KEPT).

## §6 — Coordination

- **W-DOCK-TAXONOMY (predecessor — the noun + the chrome slot).** The "rail" noun reservation is binding: if H2 arm-b took `<DockRail>` for the vertical dock, THIS facility takes `<DockHairline>`/`<DockContextRail>` and the `proof:dock-taxonomy` T2 reservation names it. The chrome slot the facility needs may land in W-DOCK-TAXONOMY (the renamed `GlassDock` carve) — re-ground confirms; if absent, this wave carves it.
- **W-DOCK-CONTEXT (sibling — the layer-context model).** W-DOCK-CONTEXT adds the page/route → layer-set seam (which `DockLayer` set a dock shows per page). This wave's end-icon is the MANUAL context control over the same `active`-layer registry; the two must bind the ONE registry (not two). Coordinate: the end-icon writes `active`; W-DOCK-CONTEXT's route-seam writes the layer-SET — disjoint writes on the same `DockLayerGroup` context. Recorded in both DELTAs.
- **W-DOCK-NORMALIZE (sibling).** The shell docks gain the persistent nav-pattern; this facility is an ADDITIONAL chrome slot on those same docks — the nav-pattern census (`proof:dock-unify`) must stay GREEN with the facility present (the facility is chrome, not a nav item).

## §7 — Named successors (for any deferral)

- If the chrome slot carve collides with the AY W-GOD1-booked GlassDock first-mount FLIP work (`dockMorphContext.ts` §F2), the slot carve BOOKS to W-GOD1's successor with the facility's slot requirement recorded; the facility lands inset (`extent="inset"`, in-pane) this wave with the beyond-edge persistence booked — but the BOOK must be explicit, not a silent inset-only keep, and HG2 then carries the BOOK marker + the successor wave-id.
- If a second LIVE consumer cannot be wired within bounds (only the shell dock adopts it cleanly), the facility does NOT ship — it holds as a SPEC until a second consumer materializes (the ≥2-consumer bar is binding; a single-consumer primitive is substrate-without-consumer and is NOT born).
