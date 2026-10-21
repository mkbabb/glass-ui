# value.js → glass-ui · O-102 · OWNER-PRIORITY · the owner's dock docket (2026-10-19), written up at the X-OD19 close

- **From:** value.js X (orchestrator lane X-OD19; close seat `claude-opus-5-5`, 2026-10-21), the owner's delegate per glass O-102b.
- **To:** glass-ui, BK coordination, and the live glass session. glass rows the live relay as `BL/audit/INBOUND.md` O-102 (`value-js-01`, 2026-10-19), with O-102a, O-102b and O-102c beside it.
- **Priority:** OWNER-PRIORITY.
- **This file:** the mirror letter that O-102 promised ("mirror letter to land in `BK/coordination/`"), with every glass-rooted row now measured by the three consumer lanes, and the consumer half of each row done.

## The owner's words (verbatim, 2026-10-19; `value.js/docs/tranches/X/waves/owner-2026-10-19/DOCKET.md`)

> the small docks and all docks, the animations and the like, are very janky and not smooth and do not animate in place, they shift around--they should animate and expand FROM the dock from the centre, or sometimes left and right (like the small dock thereof)--**this should all be fixed in the root glass-ui, too.**

> value.js still has this ellipse dock background issue--dock animations are still janky in every way, from expanded to collapsed to transitioning

> [12.56.09]--left side of the dock is not roudned? · [12.54.30]--hover state of the title item is not rounded · [12.55.09]--remove the check mark parsed, just have a dot, a bit bigger · the "loading the scene text should be removed in favor of a skeleton shimmer (glass-ui should have this?)

The owner frames are in `value.js/docs/tranches/X/waves/owner-2026-10-19/` (`frame-12.40.23.png` value ellipse, `12.45.13` fourier small docks, `12.50.11` fourier ellipse, `12.54.30` kf title hover, `12.55.09` kf status dot, `12.56.09` kf dock left side).

## Already delivered by glass 10.1.1 (thank you; adopted in all three apps)
- O-102 (3): dock collapse closes face overlays.
- O-102 (4): the `Skeleton` `shimmer` variant.
- O-102 (6) / O-102c: floats portalled by default, with the guard test.
- value `9ed00b5cd` + `f77db7842`, keyframes `8876e82e` + `f8d6077b`, fourier `e4c2e1d`. Every consumer `z-popover` lift was retired. Live: the shimmer `::after` is moving at 1440 and 390 in value and keyframes, and menus sit at z 130 with 5 of 5 hit points.

## Still open. Every row is glass-rooted and measured; the consumer half is done.
All reads were headless Chromium, run through the machine guard, light and dark, at 1440 and 390, on glass **10.1.0 or 10.1.1**. The §1 cause was re-read in the **10.1.1** dist on 2026-10-21: `run.css` still declares `.glass-dock{--dock-cap-rest: 50%}`.

### §1 The dock ellipse and the unrounded side (O-102 (1), (7); D2 C1–C7) — owner frames 12.40.23, 12.50.11, 12.56.09
- **V1-a** `dist/components/dock/styles/run.css` `.glass-dock{--dock-cap-rest: 50%}` feeds `gl-dock-cap-inline-*` on `.dock-plate`.
  - On a non-square plate a percentage radius is an ellipse. value tools@1440: plate 342×61, computed `border-radius: 50% calc(45.83% + 1.33px)`.
  - value rest@390: run 318/164, radius `50% / calc(0% + 16px)`.
  - fourier: the collapsed canvas dock, 96×56, reads `start-start 50% / end-end 16px` while its run overflows (274/96).
  - **Ask:** the rest value is `--radius-pill`, never a percentage.
- **V1-b** `crossfade.css` `.dock-crossfade > .dock-face{position:absolute; inset:0}`. An inactive face's nowrap content overflows the run while the active face fits: value tools@1440 sw 322 > cw 318, main@390 sw 318 > cw 164. That arms the cut-cap scroll timeline on a run that does not scroll. **Ask:** the cut cap reads only the active face's overflow.
- **K8** (keyframes `12.56.09`) is the same mechanism on a collapsed run. The plate is `50% 16px 16px 50%` (a D shape), with the run at 419/56 (1440) and 333/56 (390). The leading arm cuts the LEFT corners whenever run scrollLeft > 0. **Ask:** no cut cap on a collapsed dock.
- Frames:
  - value `docs/tranches/X/execution/OD19/value/before/v1-dock-tools-1440-{dark,light}.png`, `v1-band-rest-*-390.png`;
  - fourier `OD19/fourier/before/*-V1-appdock.png`, `*-F2-small-collapsed.png`;
  - keyframes `OD19/keyframes/before/K8-collapsed-puck-zoom-dark-1440.png`, `K8-spring-settled-*.png`.

### §2 Dock motion in place, from the centre or the side (O-102 (2); D2 R1–R8) — owner frames 12.45.13 + the general row
- **V2-a** (value) A layer swap (487→342 @1440; 188↔342 @390) and the idle collapse change the plate width in **2–3 distinct steps** across a 1.6 s trace: a snap, not a morph. Expand interpolates (26 steps, 56→487 over ~260 ms, cx drift ≤ 1 px).
- **V2-b** `crossfade.css` `.dock-face.is-active > .dock-face-content{clip-path: inset(0 calc((1 - var(--dock-morph-t))*100%) 0 0)}` reveals from the inline-start edge. The owner asks for a reveal FROM the centre.
- **K-ALL** (keyframes) The GlassDock **expand** is a one-frame snap (56→433; 2 distinct widths across every rAF trace), while collapse animates over 24–33 frames. This is the opposite axis to value's.
- **G-F2a** `dockMorphMeasure.ts:90-101`: the first expansion publishes `--dock-expanded-px` = the collapsed size (96 / 102 px). `--dock-morph-t` runs 0→1 for ~650 ms with no size change, then the box snaps 96→338 (x 883→641) in one frame. This sits beside O-101 (stale expanded endpoint, placed in 10.1.2).
- **G-F2b** `layers.css:104` `transform-origin: center` on an end-anchored dock (`right: .5rem`). The collapse shrinks to the reserved box's centre (x 762), then jumps **+121 px** to its anchor at settle. **Ask:** the side origin for a side-anchored dock.
- **G-F2c** `layers.css:98-102`: the 0.06 scale clamp with a poisoned 1806 px expanded endpoint undershoots to 57 px, then snaps to 102 px when `[data-morphing]` clears.
- **V2-p** (value) `DockCrossfade`'s monotonic peak (`max(face.scrollHeight)` → `--dock-crossfade-peak`) counts the hovered `.dock-icon-button`'s `scale: var(--scale-hover-dock)` (1.1; a 40 px button gives a 44 px box). After Tools → Back the run latches at 43 px for the session. **Ask:** read the layout box, not the overflow.
- Consumer half done:
  - value `006fd567a`: vj-settle arms only after `[data-morphing]` clears, on the trigger or seal, never the host; its falsifier is GREEN on 10.1.1.
  - value `7b437814e`: the field sits on `--dock-control-size`.
  - fourier `e928541`: the transport summary fits the 40 px square, and the full face has a definite inline size so glass morphs to a real endpoint.
  - keyframes `13762e6e`: docks centre on the viewport.
- Frames:
  - value `OD19/value/before/v2-strip-*`, `v2-collapsed-dark-1440.png`, `motion.json`;
  - fourier `OD19/fourier/before/*-F1-transport-*.png`, `*-F2-small-collapsed.png`;
  - keyframes `OD19/keyframes/critic1-kf/strip-dock1-{expand,collapse}-*.png`, `strip-top-expand-*.png`.

### §3 The collapsed summary pane hides overflow (new, G-F1)
`dock/styles/morph.css:180-198`: the summary pane's `aspect-ratio: 1` forces a 40 px square and silently overflows a wider `#collapsed`. The fourier summary measured 141 px of content in a 40 px pane: the Metric "1×" sat at the plate edge, with "×" outside the pill. The consumer is cured in `e928541`. **Ask:** a dev warning, or a clip, when `#collapsed` exceeds the square.

### §4 Configurator title hover is square (K5) — owner frame 12.54.30
`src/components/configurator/styles.css:255-261`: `.configurator-layer-trigger:hover` paints a 5 % fg wash at radius 0 inside a 16 px (390: 12 px) rounded `.configurator-layer` with `overflow: visible`. The consumer only hosts it. **Ask:** the trigger takes the layer's inner radius, or the layer clips. Frames: `OD19/keyframes/before/K5-title-hover-{dark,light}-{1440,390}.png`, `OD19/critic1-kf/K5-title-hover-*.png`.

### §5 A glyph-less, larger status dot (K7 glass half) — owner frame 12.55.09
`StatusDot` success always draws a check (`.feedback-mark[data-state=success]::after`). The owner asks for "just a dot, a bit bigger". The consumer moved the word into the dot's label at size md (10–11.6 px, was 7/6) and does not mask the glyph. **Ask:** a glyph-less state or prop. Frames: `OD19/keyframes/before/K7-editor-*.png`, `OD19/critic1-kf/K7-status-*.png`.

### §6 SelectTrigger chevron reads any open ancestor (C1-KF-09)
`SelectTrigger`'s chevron carries `in-data-[state=open]:rotate-180`, which compiles to `:where([data-state=open]) .x`. Inside glass's own open `.configurator-layer` and `-region`, a closed select's chevron points up (rotate 180deg measured in all four cells), while easing's points down. **Ask:** scope it to the trigger's own `data-state`.

### §7 EasingCurve has no caption-free glyph mode (G-F3)
At dock-glyph size (20 px), and in 24 px menu rows, the HTML "0"/"1" axis captions crowd the plot (fourier Easing trigger, `e928541`). **Ask:** a `bare` or glyph register.

### §8 A parked Blob repaints through a re-measure (V3-g)
On every colour frame, value's parked hero bead calls `resume()`, which always runs `resize()` → `createCanvasLifecycle` `getBoundingClientRect`: 228 ms inclusive per drag, 249 ms self, after the consumer moved it into the frame callback (`9ed00b5cd`; it was 455–613 ms forced layout outside a frame before). **Ask:** a repaint seam that skips the re-measure when the box is unchanged. This is the largest remaining glass-side share of OD19-V3 ("changing colors is VERY slow").

### §9 Card drops a consumer `role` (V6-b)
`Card` merges `role: selected ? 'option' : undefined` after `$attrs`, so `role="status"` on a non-selectable Card is dropped. Measured: the RED aria snapshot of value's loading plate had no `status` in the tree. The consumer moved the status to its own root (`bdd97b752`). **Ask:** emit `role` only when the Card is selectable.

## Consumer law kept
glass-ui was not edited, and no glass behaviour was copied or patched in value, keyframes or fourier. Each row stays honest-RED on the consumer side and is adopted at the glass landing (10.1.2 / 10.2.0). The X-OD19 close record is `value.js/docs/tranches/X/execution/OD19/CLOSE.md`.
