# C-2 — chicago · the dock's default live mode: a near-clear plate when sampling is unavailable, and a hover lens

**From**: the chicago consumer session `lot-assay-e0`, by live cross-session message, 2026-09-23 (chicago.babb.dev on glass-ui 10.0.1, Chrome 153, macOS). glass-ui filed this record from the message.
**Consumer site**: `~/Programming/chicago/src/TempApp.vue` (`.page-dock`), read-only.

## Setup (as reported)
A horizontal `<GlassDock orientation="horizontal" fit-content :collapse="false">` in a `position: fixed` bottom bar over a scrolling page of photo cards, holding three `DockControl shape="tab"` (one `:active`), a `DockSeparator`, a `Popover keep-dock-open` whose trigger is a `shape="tab"` DockControl, another separator, and one icon DockControl. Default `backdropMode="live"`.

## Rows
1. **Live-mode plate too transparent.** Dark mode, `.dock-plate` computes `background-color: color(srgb .093 .050 .009 / 0.14)` with `backdrop-filter: blur(16px) saturate(1.3) brightness(1.14)`; `--glass-veil-tier` resolves through `calc(.18 - 2*.04) + …` at `--dock-expand-t: 1`, `--dock-morph-t: 0`. Text behind the dock reads straight through it over photos. The dock stamps `data-backdrop-sample-state="unavailable"`, `data-backdrop-sample-reason="source-unavailable"`, `data-backdrop-sample-source="canvas"`, re-stamped about every 270 ms while idle. Ask: live mode has a legible minimum plate, and the fallback when sampling is unavailable is opaque enough to read.
2. **Hover distorts the plate into a pointed lens.** On a real GPU, hovering a control renders the lit plate as a lens spanning nearly the dock's width, inset from the pill's round ends. Not reproduced headless: `data-morphing` never appears, width stays 558 px, `--dock-size-scale` stays unset, the per-button `::before` specular stays button-sized; headless the hovered tab grows 150×38 → 165×42. The reporter suspects the live material/refraction layer or the `[data-morphing]` non-uniform scale. Ask: hover never distorts the plate; an always-expanded fit-content dock never size-morphs by a non-uniform scale.
3. **Workaround in place**: `backdrop-mode="static"` renders a clean opaque pill with correct hover capsules and no lens.

## glass-ui intake note (2026-09-23)
- Row 2 matches REGISTRY F-18's measured mechanism, which the owner witnessed the same day on the demo SidebarDock: `.dock-run` is `overflow-x: auto` (`run.css:163`), so the plate's cut-cap scroll timeline activates whenever the run's content exceeds its box, and the cap's rest keyframe is `--dock-cap-rest: 50%` (`run.css:468`), which resolves per axis and paints a lens. Seats transition `inline-size` on hover (REGISTRY R2-02-04, `run.css:353-367`), so a hovered seat widening 150 → 165 px can overflow a fit-content run for the length of the transition; the headless miss fits a timing-dependent overflow. HYPOTHESIS until measured on the reporter's composition; BL's born-RED for F-18 plants a sub-pitch overflow on a horizontal fit-content dock and hovers a seat.
- Row 1 joins F-23 (ink calibrated to the token ground, not the painted composite) with a new limb: the live fallback when sampling is `unavailable` resolves to the thinnest veil rather than a legible floor. The 270 ms idle re-stamp joins F-50 (idle loops and the sampler).
- Row 3 is the consumer's honest workaround and is retired when the cure lands.
