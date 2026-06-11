# AZ.W-RAIL-EXTEND — the net-new hairline-rail facility (a context control beyond the dock edge) · DELTA

<!-- surface-paths: src/components/custom/dock/DockRail.vue, src/styles/dock/rail-extend.css, src/components/custom/dock/GlassDock.vue, src/components/custom/dock/index.ts, src/styles/dock.css, demo/stories/dock/rail.vue, demo/layout/SidebarDock.vue -->
<!-- surface-hash: 2e9d9cfd9cec0436efa72db8687e130140ce93e9a648bdcd792a1c1785e4358e -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the seven surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface capture against the current AZ-tree bytes — the live dock was shot
     on :5199 with the wave's source edits in place (WebGL stubbed to null so the
     decorative Aurora backdrop does not crash headless swiftshader; the dock
     geometry — the capture subject — is unaffected). -->

The R3-2 net-new facility lands: a hairline that runs **BEYOND** the dock edge, carrying
a leading/trailing **end-icon that switches the dock's layer context**, rendered as a
`GlassDock` `#rail` **chrome slot** OUTSIDE the clipped morph aperture — so the hairline
+ its end-icon **PERSIST when the dock collapses** (the in-pane `.dock-layer-rail`
switcher vanishes on collapse; this one does not). It is born with **2 live consumers**
(the `dock/rail.vue` story advancing a `DockLayerGroup`'s active layer + the shell
`SidebarDock` cycling the contextual category/facet — the ≥2-consumer bar).

## The facility API

`<DockRail>` (`@mkbabb/glass-ui/dock`):

| axis | contract |
|---|---|
| `extent` | `"beyond"` (default) overruns the dock content box by `--dock-rail-extend-length`; `"inset"` keeps it flush at the edge |
| `position` | `"start" \| "end"` — which dock edge the rail anchors to |
| `icon` | `Component` — the end-icon glyph (default a chevron); also overridable via the `#icon` slot |
| `entries` | `readonly string[]` — the ordered context ids the end-icon cycles through (wrapping) |
| `v-model:context` | the consumer-owned layer-context model the end-icon writes |
| `@advance` | emitted with the resolved next id (for consumers that own the transition) |

The hairline composes the **`--border-hairline`** token pair (the 0.5px catch-light +
under-shadow the dock + instrument-chassis already speak) via `box-shadow` — a whisper,
**NEVER** a hard `1px solid` rule. The one new token is the dock-scoped
`--dock-rail-extend-length` extent knob (riding `--dock-scale`); no new color/shadow
tokens. The end-icon is a real `DockIconButton`. It EXTENDS the `<DockSeparator>` idiom
(the axis-aware perpendicular paint via `useOptionalDockContext()`) past the edge.

## The chrome-slot persistence mechanism (G2)

`GlassDock` gains a `#rail` slot rendered as a root sibling of `.dock-layers` (the W-GOD1
booked carve, landed here). The `.dock-hairline-slot` wrapper is `position: absolute`
relative to the dock root, so the root's morph-axis `overflow: clip` never reaches it —
the rail content escapes the clip and survives the collapse↔expand morph. The slot
renders only when authored (`v-if="$slots.rail"`), so a dock with no rail is byte-identical
to before.

## The layer-context binding — ONE registry (R2)

The end-icon writes through one of two **sanctioned** seams: (i) the injected
`DockLayerGroup` `active` model, OR (ii) a consumer-owned `v-model:context` — the SAME ref
the consumer binds to `<DockLayerGroup v-model:active>`. `<DockRail>` owns **NO** internal
`ref()`/`reactive()` shadow of the active state (the third, illegitimate path the gate
REDs). In `dock/rail.vue` the `railLayer` ref is bound to BOTH `<DockLayerGroup
v-model:active="railLayer">` AND `<DockRail v-model:context="railLayer">` — one source of
truth, two affordances.

## HG1 — the hairline-beyond-edge + the end-icon switching the layer (captured)

Captured on `:5199` `/dock/rail` (the "Hairline rail" section, `data-testid="dock-with-rail"`),
expanded state — `docs/tranches/AZ/audit/visual/W-RAIL-EXTEND-expanded-hairline.png`
(the dock shows the active "Libraries" layer; the rail overruns below) +
`W-RAIL-EXTEND-overrun-zoom.png` (the overrun region below the dock bottom edge):

- **The end-icon SWITCHES the layer.** Clicking the chevron cycled the active layer
  `assets → layers → libraries` (the `[data-testid="dock-rail-readout"]` readout flipped
  on each click; `switched: true`). The rendered layer content changed (the database icon
  + "Libraries" label visible in the expanded capture).
- **The hairline runs PAST the dock edge.** The `.dock-hairline-slot` overruns the dock's
  block edge by **39px** (`slotBottom 739` vs `dockBottom 700` in the expanded readback) —
  the `extent="beyond"` overrun visible. The hairline `::before` is a 1px × 40px vertical
  rule (= `--dock-rail-extend-length` at the resting `--dock-scale`).
- **It is the `--border-hairline` whisper, not a hard rule.** The `::before` computed
  `box-shadow` reads exactly `rgba(255,255,255,0.06) 0 0.5px 0 0 inset, rgba(0,0,0,0.04) 0
  0.5px 0 0` (the token pair) with `border: 0px solid` — no hard `1px solid`. R1 confirmed.

## HG2 — persistence on collapse (captured)

Captured collapsed state — `docs/tranches/AZ/audit/visual/W-RAIL-EXTEND-collapsed-persist.png`:

- The dock collapsed to a 58×104px circle (`expand()`/`collapse()` driven via the exposed
  API). The `.dock-hairline-slot` is **still visible** (`railVisible: true`,
  `iconVisible: true`) and **still overruns** the collapsed dock's edge by **39px**
  (`overrunBeyondEdgePx: 39`) — the rail persists as chrome outside the clip aperture.
- The end-icon was **interactive while collapsed** — the layer-switch (`assets → layers →
  libraries`) was triggered ON the collapsed dock before expanding, and the switch landed
  (the expanded capture then showed "Libraries"). The persistence is the facility's whole
  point: a context control that survives collapse because it is chrome, not in-pane content.

## HG3 — the ≥2-consumer census (captured stdout)

`proof:rail-extend` R5 (the consumer census):

```
  R5 ≥2 live consumers : files=[demo/layout/SidebarDock.vue, demo/stories/dock/rail.vue] mounts=2 OK
```

Two LIVE `<DockRail>` mounts. `SidebarDock` cycles the contextual category/facet
(`v-model:context="railContext"`, a writable computed over the navigation state — ONE
registry, no parallel store); `dock/rail.vue` advances a `DockLayerGroup`'s active layer.

## HG4 / the `proof:rail-extend` born-RED→GREEN gate

Device-free static src-scan (R1-R4 + the R5 census), `tags: ["local","ci","release"]`.
GREEN stdout:

```
proof:rail-extend — the hairline-rail-beyond-dock facility gate (AZ.W-RAIL-EXTEND)
  R1 hairline token, no hard rule : composes=true hardBorder=false OK
  R2 sanctioned seam, no shadow   : contextModel=true injectsGroup=false internalShadow=false OK
  R3 beyond-edge overrun          : token=true overrun=true default=true OK
  R4 chrome slot outside clip     : slot=true sibling=true escapes=true OK
  R5 ≥2 live consumers            : files=[demo/layout/SidebarDock.vue, demo/stories/dock/rail.vue] mounts=2 OK
  status: PASS
```

Born-RED bite (the falsifiability self-test over the exported `detectRailExtend`):

| mutation | clause | result |
|---|---|---|
| swap the hairline `box-shadow: var(--border-hairline)` → `border: 1px solid` | R1 | RED |
| add an internal `const activeLayer = ref(...)` shadow to `DockRail.vue` | R2 | RED |
| delete the `--dock-rail-extend-length` rule | R3 | RED |
| rename `.dock-hairline-slot` so it is no longer a sibling of `.dock-layers` | R4 | RED (2 clauses) |
| drop a demo consumer (1 mount) | R5 | RED |

Each clause is independently falsifiable; the baseline is GREEN.

## Verification

- `npm run typecheck` — GREEN (vue-tsc `--noEmit` both projects).
- `proof:rail-extend` — GREEN (R1-R5).
- `proof:dock-taxonomy` — GREEN (the `DockRail` component name is on the T2 arm-a
  rail-noun allowlist; the `.dock-hairline-slot`/`.dock-hairline-extend` CSS classes avoid
  the de-overloaded "rail" token, so T2 reads `css=[dock-layer-rail] unlisted=0`).
- The adjacent dock fleet — `proof:dock-unify` (the facility is chrome, not a nav item; the
  nav-pattern census stays GREEN with the rail present), `proof:dock-region-model`,
  `proof:dock-perfection`, `proof:dock-vocabulary` — all GREEN.

## Coordination notes (§6)

- **W-DOCK-TAXONOMY (predecessor, arm-a):** the `DockRail` noun reservation is consumed
  (the T2 allowlist already booked `DockRail`); the `#rail` chrome slot was carved here
  (it had not landed in the taxonomy work).
- **W-DOCK-CONTEXT (same-batch sibling, shared `SidebarDock.vue`):** W-DOCK-CONTEXT landed
  its contextual `<DockLayerGroup>` render FIRST; this wave added the `#rail` chrome slot
  against the post-context render (the two co-write `SidebarDock.vue` on non-overlapping
  ranges — the contextual layer group vs. the chrome slot). The rail binds the SAME
  navigation/facet registry, not a second one.
- **W-DOCK-NORMALIZE (sibling):** the facility is an additional chrome slot on the shell
  docks; `proof:dock-unify` stays GREEN (chrome, not a nav item).
