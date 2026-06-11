# AZ.W-RAIL-EXTEND — the net-new hairline-rail facility (a context control beyond the dock edge) · DELTA

<!-- surface-paths: src/components/custom/dock/DockRail.vue, src/styles/dock/rail-extend.css, src/components/custom/dock/GlassDock.vue, src/components/custom/dock/index.ts, src/styles/dock.css, demo/stories/dock/rail.vue, demo/layout/SidebarDock.vue -->
<!-- surface-hash: 53746078d4546cdd9c5a382a98a3a0957adbcbe228afc5703dc29c8dad221202 -->
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

## The chrome-slot persistence mechanism (G2 — superseded by R4-1 below)

> **R4-1 supersedes this section.** The original `#rail`-as-dock-child render (absolute
> relative to the dock root) was CLIPPED on the shell by `contain: paint` +
> `backdrop-filter` (the black-blob). The rail now renders as a SIBLING of `.glass-dock`
> inside a `.glass-dock-frame` escape context — see **R4-1 RE-OPEN** below.

`GlassDock` gains a `#rail` slot. It renders only when authored (`hasRail` =
`useSlots().rail`), so a dock with no rail is byte-identical to before. The
`.dock-hairline-slot` wrapper is `position: absolute` and escapes the dock's
containment/clip via the `.glass-dock-frame` (the R4-1 architecture).

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

---

# R4-1 RE-OPEN (USER-AUDIT 2026-06-11 R4) — the SHELL was broken; the dock-frame escape + the glass end-icon

The R4 audit RE-OPENED this row: on the live shell the rail showed **NO visible
beyond-dock hairline** — instead a **black-blob artifact clipped at the dock's bottom
edge**. The prior DELTA captured the `dock/rail` STORY (which "passed"); the user audits
the **SHELL** (`SidebarDock` in `<aside class="demo-sidebar-rail">`), where the rail was
broken. R4-1 fixes it at the root + re-grounds the gate on the shell.

## Root cause (instrumented on :5199's shell, Playwright readback)

The `.glass-dock` root carries **`contain: paint`** (`shell.css:83`) **+ `backdrop-filter`**
(`shell.css:117`) **+ (on the always-expanded vertical shell rail) `overflow-y: auto`**
(`shell.css:191`). ALL THREE hard-clip every descendant to the dock's border box,
independent of overflow. The prior architecture rendered the `#rail` as a dock CHILD
(`.dock-hairline-slot` absolute-positioned relative to the dock root) — so the hairline +
icon hanging below the dock were **swallowed at the edge**. The `.dock-icon-button` end-icon
is `background: transparent` at rest (it reads the dock substrate beneath); clipped at the
edge with no plate, it painted as a **dark half-circle — the "black blob."** The
beyond-dock readback before the fix: the icon sat at the dock bottom edge, fully clipped.

## The fix — render the rail OUTSIDE the dock's containment (the dock-frame)

A dock CHILD can never escape `contain: paint`/`backdrop-filter`. So `GlassDock` now wraps
itself in a thin **`.glass-dock-frame`** — `display: contents` (layout-transparent,
byte-identical) by default, lifting to a NON-clipping `position: relative` context only
when `data-has-rail`. The `<DockRail>` renders as a **SIBLING of `.glass-dock`** inside the
frame, so the `.dock-hairline-slot` anchors to the dock box yet **escapes the dock's
containment**. No `contain`, no `backdrop-filter`, no `overflow` on the frame → nothing
clips it. (The class is named `*-frame`, NOT `*-rail*`, so it stays off the de-overloaded
`proof:dock-taxonomy` rail-noun allowlist.)

The end-icon now carries its **OWN floating glass register** (it is chrome outside the dock
substrate): `--dock-control-active-bg` (`= --glass-bg-floating`) fill + `--glass-blur-floating`
backdrop-filter + `--glass-edge-light`/`--glass-specular` rim + a soft drop — reading the
SAME dock tokens so it re-tints under `.dark` for free, NOT the transparent in-dock recipe.

## SHELL captures (the truth surface, light + dark)

`R4-RAIL-shell-{light,dark}-full.png` + `R4-RAIL-shell-{light,dark}-dockbottom.png`
(readback in `R4-RAIL-shell-{light,dark}.json`), shot on :5199's `SidebarDock`:

- **The hairline VISIBLY overruns the dock edge.** The icon sits **92px below the dock
  bottom** (`iconBelowDock: true`, `overrunPx: 92`), the `::before` hairline a 1px × **40px**
  vertical whisper (`= --dock-rail-extend-length`) connecting the dock edge to the icon. The
  `box-shadow` is the `--border-hairline` token pair (no hard rule — R1 holds).
- **The end-icon is a proper glass control, not a blob.** Light: `bg srgb(0.982,0.981,0.978/0.8)`
  + `backdrop-filter: blur(16px) saturate(1.18)` + the edge-light rim. Dark: `bg
  srgb(0.108,0.098,0.092/0.88)` + the dark edge-light — it re-tints with the dock.
- **The context-switch works live.** Clicking the rail end-icon advanced the dock layer
  `assets → layers → libraries` on the `dock/rail` story (`dock-rail-readout` flipped each
  click; `advanced: true`) — the ONE-registry binding (R2) verified on real input.

## R4-1 part 2 — the jank (§6 easing doctrine)

Instrumented the rail icon's computed `transition` on the shell: the inherited dock-control
recipe leaked **`--spring-smooth`** onto `background-color` (a SURFACE prop wobbling on a
spring — the §6 violation "a colour cross-fade reads as a wobble on a spring"). Pinned the
icon's surface channel (bg/box-shadow/border/color) to **`--ease-standard`** (the §6
surface ease, no overshoot); the scale/transform stay on the dock-control spring. Post-fix
readback: `transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` (the standard bezier).

## R4-1 part 4 — `proof:rail-extend` re-grounded on the SHELL

R4 (the slot-escape clause) now witnesses the **dock-frame** escape context (the `*-frame`
wrapper + the `[data-has-rail]` non-clipping rule) instead of the old sibling-of-dock-layers
check, and a NEW **R6 shell-mount witness** binds the rail to the truth surface:
`demo/layout/SidebarDock.vue` MUST mount a live `<DockRail>` — a story-only census can no
longer mask a broken shell rail (the R4-1 re-open cause). GREEN stdout:

```
proof:rail-extend — the hairline-rail-beyond-dock facility gate (AZ.W-RAIL-EXTEND)
  R1 hairline token, no hard rule : composes=true hardBorder=false OK
  R2 sanctioned seam, no shadow   : contextModel=true injectsGroup=false internalShadow=false OK
  R3 beyond-edge overrun          : token=true overrun=true default=true OK
  R4 slot escapes containment     : slot=true railshell=true sibling=true escapes=true OK
  R5 ≥2 live consumers            : files=[demo/layout/SidebarDock.vue, demo/stories/dock/rail.vue] mounts=2 OK
  R6 shell-mount witness          : shell=demo/layout/SidebarDock.vue mounted=true OK
  status: PASS
```

Born-RED bite additions: remove the `.glass-dock-frame` escape context → R4 RED; drop the
rail from `SidebarDock.vue` → R6 RED.

## R4-2 — the demo-IA noise prune (KISS)

Walked `/dock/*` + the shell facet groups as a first-time auditor:

- **Dock-story headings** carrying internal tranche/defect-id jargon are renamed to plain
  language: `Collapsed-tap + hover-approach click integrity (R5-3)` → *Tap and click land
  where you aimed*; `Dock as a portal host — the navigation-layer / no-glass-on-glass
  contract` → *Menus inside a dock teleport out*; `Overflow wrap … (W04)` → *… content
  reflows to multiple rows*; `Big dock … (W3b)` → drop `(W3b)`; `Collapse-while-switching
  (one orchestrator)` → *Collapse while switching layers*; `Vertical overflow (re-adoption
  proof)` → *… a tall pane scrolls cleanly*; the `bbnf-buddy` external-consumer name dropped
  from prose.
- **`dock/rail.vue`'s trailing "One dock taxonomy"** meta-commentary section (design
  discourse: "the ONLY 'rail' left in the band… the noun is otherwise free") — PRUNED (noise
  to a first-time auditor).
- **The shell SidebarDock contextual facet group** painted EVERY story of a facet with the
  SAME facet glyph (`<component :is="layer.icon">` per entry) — an indistinguishable
  identical-icon stack (the "wtf are these options" surface; `R4-RAIL-shell-facet-group.png`
  before showed 4 identical palette icons under "Tokens"). The labeled per-story navigation
  already lives in the BottomDock (`{{ entry.label }}` tabs). The SidebarDock facet group now
  surfaces ONLY the facet switcher (3 DISTINCT facet icons) + a clean facet name in the
  active pane (`.demo-sidebar-context-label`) — the redundant icon column removed.
  `proof:dock-contextual-layers` W2 stays GREEN (the DockLayerGroup + DockLayer v-for
  render is intact).

## R4-1 verification

- `npm run typecheck` — GREEN (vue-tsc `--noEmit` both projects).
- `proof:rail-extend` — GREEN (R1-R6, the shell witness).
- `proof:dock-taxonomy` — GREEN (`glass-dock-frame` avoids the rail-noun allowlist;
  `unlisted=0`).
- `proof:dock-contextual-layers`, `proof:dock-unify`, `proof:dock-perfection`,
  `proof:dock-region-model`, `proof:colocation` — GREEN.
- The dock unit fleet — `tests/components/custom/dock/` 92/93. The DockRail a11y suite 9/9
  GREEN. The ONE failure (`GlassDock.touch-gate`) is the R5-TAP sibling lane's
  click-integrity guard swallowing the touch-only test's synthetic compat-click (the test
  fires touch without a pointerdown, so the guard's `pressTarget` is null) — ISOLATED to the
  sibling lane: HEAD `GlassDock` + ONLY this lane's `.glass-dock-frame` wrapper (no R5-TAP
  guard) passes the touch-gate test 5/5. Not an R4-RAIL regression.
