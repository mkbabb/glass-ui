<!-- surface-paths: demo/stories/substrates/aurora.vue -->
<!-- surface-hash: d6599042963cf09cb2723a27f0d944acae452916486c09a4c2d5a3e9b0fc652d -->

# BA.W-REFLECT2 — aurora surface reflection record

**Surface:** aurora (the painterly aurora stage on the GPU · the preset previews · the aurora studio on the library Configurator · the breathing register — live on `/substrates/aurora`, both modes, 2 viewports)
**Auditor:** W-REFLECT2 reflection conductor · **Date:** 2026-06-15 · **Branch:** tranche/BA @ HEAD
**Routes:** `/substrates/aurora`; the aurora preset previews
**Ground-anchor (the FAIL baseline this flip clears):** R8-4 (`R8-04-aurora-configurator-occlusion-b.png`); R8-5 (`R8-05-speedtest-preview-dim.png`)

## 1 — RECAPITULATE (the R8 reads × the discharging BA waves × evidence)

| R8 read | discharging wave | discharging evidence |
|---|---|---|
| R8-4 aurora configurator occlusion | W-CONFIG-CHASSIS (aurora overflow contract + the color-swatch register + preset-alpha clamp) | `W-CONFIG-CHASSIS-DELTA.md` (the aurora overflow contract; the live dark preset row) |
| R8-5 preview dim | W-CONFIG-CHASSIS (color-swatch register) + W-STAGE (the staged field) + the aurora breathing register made honest | `W-STAGE-DELTA.md` (arm e the breathing field non-zero drift; `W-STAGE-e-aurora-breathing-field.png`) |
| the aurora breathing register DEAD (all drift zero) | W-STAGE (BA-VJS-2 — non-zero nucleiDrift/paletteDrift/warpDrift, aurora.frag fence held) | `W-STAGE-DELTA.md` arm e (drift 0.005/0.006/0.003, perceptible-not-dead) |

The aurora.frag GL fence held across BA (the fix is the JS motion TABLE, never the shader — verified in W-STAGE's DELTA).

## 2 — RE-VERIFY LIVE (fresh whole-page captures, both modes × 2 viewports)

Captured live on `:5199` (Playwright, `reducedMotion:reduce` — the aurora paints ONE static frame then parks; the painterly field is captured at a representative frame). Whole-page.

- `aurora-light-desktop-full.png` / `aurora-dark-desktop-full.png` (1440×900)
- `aurora-light-mobile-full.png` / `aurora-dark-mobile-full.png` (390×844)

π/observational readback (both modes):
- The preset preview row (Sky · Dawn · Meadow · Deliberative · Day 9 · Oil Impasto) renders distinct painterly gradients — NOT dim (R8-5 cleared). Each preview is a legible, saturated thumbnail.
- The main aurora stage paints a soft painterly blue field with the nuclei controls visible over it — NOT occluded (R8-4 cleared). In dark the field reads as a luminous blue aurora over the dark page (not a black void).
- The Aurora studio Configurator below reads finished: Color / Seed (`#147988` swatch) / Harmony (Analogous) rows, the `4 stops · 4 nuclei` summary, the Reset control.

## 3 — THE PERFECTION QUESTION (first-time-auditor, cold)

Walking `/substrates/aurora` fresh, both modes: a coherent aurora studio — bright distinct presets, a painterly stage, a legible configurator. No "wtf." This is a SUBSTRATE/hero route: the page title sits in the top band as a small breadcrumb (`SUBSTRATES · AURORA`); the preset row occupies the top, so the SidebarDock facet chips graze the preset-row left edge minimally (the previews remain fully legible) — not a title occlusion. The aurora surface reads finished.

## 4 — VERDICT

**VERDICT: PASS.** The aurora surface reads as a designed whole in BOTH modes on a real render: bright distinct preset previews (R8-5 dim cleared), a painterly non-occluded stage (R8-4 cleared), a legible studio Configurator, the breathing register honest, the GL fence held. The captures resolve on disk. The row flips FAIL→PASS.
