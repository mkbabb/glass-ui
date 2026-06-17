# BA.W-DOCK-GEOMETRY — DELTA: the dock control plate clipped flat, killed at the geometry root

<!-- surface-paths: src/styles/dock/density.css, src/styles/dock-controls/icon-button.css, src/styles/dock-controls/tab-button.css, src/styles/dock-controls/triggers.css, src/styles/dock/overflow.css, src/styles/dock/shell.css, demo/layout/BottomDock.vue, demo/layout/SidebarDock.vue, scripts/proof-dock-plate-clearance.mjs, tests-visual/dock-plate-clearance.spec.ts -->
<!-- surface-hash: 59bce91613e4026357a78bc1ec3d1dbdc3ea77a7db0713e9cf16e70bab4b5f55 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the ten surface-paths' bytes are
     byte-identical to capture time (sha256 of the concatenated bytes, "\n"-joined,
     surfaceHash convention — scripts/proof-live-verified-ledger.mjs). Stamped at the
     own-surface SHELL capture against the live demo on :5199 (the /dock/overview host
     route, BOTH shell docks, light + dark, hover + press), with the
     --dock-control-safe-inset plate inset + the scroll-port cross-axis un-clip + the F6
     opt-in carve in place. -->

**Wave**: BA.W-DOCK-GEOMETRY — the control-plate clearance inset + the scroll-port cross-axis un-clip
**Status**: COMPLETE (mechanism greens + the binding π) — the whole-dock gestalt PASS is W-REFLECT2's `proof:ba-gestalt` (BA inv-4), this is one input.
**Nature**: VISUAL wave. The device-free `proof:dock-plate-clearance` (W1/W2/W3) is the CI half; the π SHELL readback (`tests-visual/dock-plate-clearance.spec.ts`) is the binding visual truth.

## §0 RE-GROUND drift notes (every cite re-grepped at HEAD)

The three stacked clip mechanisms HOLD at HEAD. Line-number drift recorded; mechanisms re-located, NOT re-diagnosed.

| §0 cite (spec) | HEAD status |
|---|---|
| `dock-controls/icon-button.css:21-22,27` control box+circle | INTACT (width/height :21-22, radius :27) |
| `icon-button.css:76` hover scale | DRIFTED → `:77` (`scale: var(--scale-hover-dock)`); the rule structure unchanged |
| `icon-button.css:85` press scale | INTACT (`:85`) |
| `dock/density.css:76-89` control-size == layer-height (`2.5rem` base, comfortable) | INTACT — both read the SAME `2.5rem` base → 0px slack confirmed |
| `dock/layers.css:223` `.dock-layer` `min-height` lock | INTACT — now a FLOOR (`min-height: var(--dock-layer-height)`, AY.W-DOCK-NAV B6 turned the fixed height into a floor); the lock token unchanged |
| `dock/overflow.css:33-42` `.dock-scroll-x .dock-layer--full` `overflow-x:auto` | INTACT (`:33-42`) |
| `dock/overflow.css:53-59` `.vertical.dock-scroll-y` `overflow-y:auto` | INTACT (`:53-59`) |
| `dock/shell.css:83` `contain: paint` | INTACT (`:83`) |
| `dock/shell.css:188-194` F6 at-rest vertical port | INTACT (`:188-194` pre-edit; pinned `overflow-x: visible` — but see the LIVE FINDING below) |
| `dock/shell.css:172-175` at-rest-expanded morph-axis un-clip precedent | INTACT (`:172-175`, now `.expanded/.always-expanded:not([data-morphing]) { overflow: visible }` `:185-188`) |
| `dock/shell.css:146-167` morph aperture clip-reveal | INTACT — NOT touched (the W2 clip-reveal stays) |
| `demo/layout/BottomDock.vue:118` `overflow="scroll"` | DRIFTED → `:130` |
| `demo/layout/SidebarDock.vue:174` `overflow="scroll"` | DRIFTED → `:186` |
| `fleet/dock-clipping/probe-bottomdock-*.png` baselines | PATH DRIFT — the captures live at `docs/tranches/BA/audit/fleet/probe-bottomdock-{active-DARK,active-light,nocontain,rest-light}.png` (NO `dock-clipping/` subdir; the `dock-clipping.md` lane report names them flattened in the fleet root) |

## The three root causes (each confirmed at HEAD by the born-RED gate)

The born-RED `proof:dock-plate-clearance` run at HEAD (pre-edit) — every witness RED with the resolved numbers:

```
W1 plate clears cell  : insetFraction=n/a consumed(padding/bg-clip)=false/false allRungsClear=false RED
    compact     : cell=32px plate=32px hover=35.2px slack/side=-1.6px SLICES
    comfortable : cell=40px plate=40px hover=44px   slack/side=-2px   SLICES
    spacious    : cell=44px plate=44px hover=48.4px slack/side=-2.2px SLICES
    audacious   : cell=64px plate=64px hover=70.4px slack/side=-3.2px SLICES
W2 cross-axis visible : x-port(cross-y)=false y-port(cross-x)=false f6(cross-x)=true shellScroll(bottom/side)=true/true RED
W3 contain:paint audit: verdict(a)=false verdict(b)=false RED
  status: FAIL
```

The plate EXACTLY filled its cell on every rung (negative slack), neither scroll port pinned the cross axis, both shell docks passed `overflow="scroll"`, and no contain:paint verdict was recorded.

## The fix (three scopes + a live-found fourth carve)

**Scope 1 — the `--dock-control-safe-inset` painted-plate inset (DC-2).** Minted in the density cascade per rung (`calc(var(--dock-control-size) * 0.1)` — a 10%-per-side inset, an 80%-of-cell painted plate, the iOS-26 register; it scales with EVERY rung AND rides `--dock-scale` transitively through `--dock-control-size`). Routed through the icon-button as `padding: var(--dock-icon-padding, var(--dock-control-safe-inset, 0))` + `background-clip: content-box`, and through the tab-button / triggers as `background-clip: content-box` over their existing padding. The HIT BOX stays the full `--dock-control-size` (the WCAG 2.5.5 44px floor stays on the CELL); only the PAINTED plate insets within it.

**Scope 2 — the scroll-port cross-axis pin (DC-1).** `.dock-scroll-x .dock-layer--full` now pins `overflow-y: visible`; `.vertical.dock-scroll-y` now pins `overflow-x: visible`. The MDN single-axis-clip caveat: a single-axis scroll value forces the cross axis to compute to `auto` unless explicitly held.

**Scope 3 — the shell-dock overflow flip (DC-1 consumer half).** Both shell docks dropped `overflow="scroll"` → the `"grow"` default (grow-to-fit). The port is engaged only on real over-cap content (the explicit `overflow="scroll"` opt-in). ONE attribute per file.

**Scope 4 — the contain:paint audit → verdict (a), recorded.** The maximal hover plate stays INSIDE the dock padding box; `contain: paint` (`shell.css:83`) is the non-proximate second clip box and is UNEDITED. Marker recorded in shell.css. The live margin: ≥9.4px (see π below).

**The live-found F6 carve (the spec's "confirm it survives" was a latent defect).** The π readback measured the grow-to-fit SidebarDock's clip ancestor computing `overflow-x: auto` — the F6 `overflow-y: auto` (a scroll value) FORCES the sibling `overflow-x: visible` to compute to `auto` per CSS Overflow §3, so the F6 `visible` pin NEVER survived, and every at-rest vertical dock paid the inline cross clip. The carve: F6's `overflow-y: auto` is now GATED behind the `dock-scroll-y` opt-in (`.glass-dock.vertical.dock-scroll-y.always-expanded/.expanded:not([data-morphing])`); a grow-to-fit vertical shell stays `overflow: visible` (the line-186 at-rest-expanded rule) on BOTH axes. A vertical dock that genuinely needs cap+scroll opts in via `overflow="scroll"` (the SAME `.dock-scroll-y` plumbing the F6 comment names). The morph aperture (`shell.css:146-167`) is untouched. **Consumer note**: a consumer relying on F6's prior UNCONDITIONAL at-rest scroll (the bbnf-buddy ToolsLayer the comment names) now passes `overflow="scroll"` to keep it — a clean break, the wave's grow-to-fit + opt-in-scroll model.

## The π SHELL readback (the binding visual truth) — `tests-visual/dock-plate-clearance.spec.ts`

`4 passed` against :5199 (`/dock/overview`, both shell docks, light + dark). The per-control numbers (`readback.json`):

| dock / mode / state | painted plate | cell | minSlack | clip x / y | min plate-inside-padding |
|---|---|---|---|---|---|
| sidebar-vertical / light / hover | 35.2×35.2 | 40 | **11.4px** | visible / visible | 11.4px |
| sidebar-vertical / light / press | 30.72×30.72 | 40 | 13.64px | visible / visible | 13.64px |
| sidebar-vertical / dark / hover | 35.2×35.2 | 40 | **11.4px** | visible / visible | 11.4px |
| bottom-horizontal / light / hover | 35.2×35.2 | 40 | **9.4px** | visible / visible | 9.4px |
| bottom-horizontal / light / press | 30.72×30.72 | 40 | 11.64px | visible / visible | 11.64px |
| bottom-horizontal / dark / hover | 35.2×35.2 | 40 | **9.4px** | visible / visible | 9.4px |

- **G1 (the lozenge dies)** — the painted icon-button plate is 35.2px (the 32px content box × 1.1 hover) inside the 40px cell, with ≥9.4px slack on EVERY axis. No perimeter on the clip edge; a clean inset circle, never a flat-topped lozenge.
- **G2 (the cross axis un-clip held)** — the clip ancestor computes `overflow: visible` on BOTH axes on the fit-content shell (the DC-1 companion-clip is gone; the SidebarDock's `overflow-x: auto` → `visible` is the F6 carve's effect).
- **G3 (contain:paint verdict-a, live)** — the hover plate sits ≥9.4px inside the dock padding box; `contain: paint` is non-proximate and unedited.

The press state shrinks the plate (the iOS darken-plus-shrink) → clearance only improves (13.64px / 11.64px). The shell docks at `/dock/overview` use icon buttons; the tab-button / trigger plate fix (the `background-clip: content-box` inset over their existing padding) is gate-asserted in W1 source + compiles.

After frames: `dock-plate-clearance/{sidebar-vertical,bottom-horizontal}-{light,dark}.png` — resolved (this dir): `dock-plate-clearance/sidebar-vertical-light.png`, `dock-plate-clearance/sidebar-vertical-dark.png`, `dock-plate-clearance/bottom-horizontal-light.png`, `dock-plate-clearance/bottom-horizontal-dark.png`.
Before baseline (the sliced lozenge): `../fleet/probe-bottomdock-active-DARK.png`; the ownership proof: `../fleet/probe-bottomdock-nocontain.png` (both relative to this `visual/` dir).

## The GREEN gate

```
proof:dock-plate-clearance
  W1 plate clears cell  : insetFraction=0.1 consumed(padding/bg-clip)=true/true allRungsClear=true OK
      compact     : cell=32px plate=25.6px hover=28.16px slack/side=1.92px clears
      comfortable : cell=40px plate=32px   hover=35.2px  slack/side=2.4px  clears
      spacious    : cell=44px plate=35.2px hover=38.72px slack/side=2.64px clears
      audacious   : cell=64px plate=51.2px hover=56.32px slack/side=3.84px clears
  W2 cross-axis visible : x-port(cross-y)=true y-port(cross-x)=true f6(cross-x)=true shellScroll(bottom/side)=false/false OK
  W3 contain:paint audit: verdict(a)=true verdict(b)=false OK
  status: PASS
```

No Batch-1 regression: `proof:dark-material` + `proof:no-gray` GREEN; the dock fleet (`dock-controls-split`, `dock-css-carve`, `dock-no-scale-pop`, `dock-opacity-lockstep`, `dock-perfection`, `dock-rail-hairline`, `dock-region-model`, `dock-unify`, `dock-vocabulary`, `dock-wrap-content-driven`) GREEN; `ui-scale`, `glass-level`, `glass-cohesion`, `adaptive-glass` GREEN. typecheck + build green.
