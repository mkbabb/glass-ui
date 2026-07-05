# BG.W-DOCK-GLYPH-RIGID — PAINT JUDGE DELTA

**Verdict: PASS** (dual-engine, both modes) — the F3.R1 rigid-content contract now
PAINTS. The `@property --dock-punch-stretch` `inherits: false → true` fix landed and the
+48.84% mid-morph glyph stretch is GONE: per-frame glyph aspect is **1.0 on EVERY frame
including the `[data-punching]` overshoot**, both engines, both modes.
**Judge:** non-authoring paint judge (did not build the wave) — re-verification #3 of the
integrated F3.R1 paint-repair, against the CURRENT `inherits: true` source.
**Route:** `/dock/overview` — the GlassDock collapse↔expand rigid-glyph series.
**Engines:** Chrome ANGLE-Metal (Apple M5 Max, Chrome 149.0.7827.201, CDP :9222) + WebKit
26.4 (Playwright, the Safari engine) + Safari system-WebKit off-screen keystone (Apple GPU,
Metal, no Screen-Recording TCC).
**Modes:** light + dark. **Viewport:** 1440×900 @2x (2880×1800 px).
**Build:** `npm run demo:dist:build` fresh bytes — served CSS
`dist-demo/assets/index-BONjF1-O.css` carries
`@property --dock-punch-stretch{syntax:"<number>";inherits:true;initial-value:1}` — served
`vite preview :5200` (BUILT bytes, not the `:5199` dev shell).
**Date:** 2026-07-04.

---

## 0. Headline — the fix is REAL in paint (contrast with the prior FAIL)

The prior re-verification (#2, DELTA git-history / EXECUTION-PROGRESS PRIOR-FAIL context)
found the F3.R1 "full-inverse" rule INERT because `--dock-punch-stretch` was registered
`@property { inherits:false }`: the content child `.dock-persistent` read the initial `1`,
never the root's `1.22` overshoot, so the counter-scale silently degraded to identity and
the glyph carried the whole `(--dock-punch-stretch)² = 1.4884` residual (+48.84%).

The landed fix flips that ONE flag to `inherits: true` (`src/styles/dock/shape.css:53-57`).
Now the punch value declared on the dock root cascades to the rigid content children, the
existing full-inverse rule reads the SAME live value the plate reads, and the two cancel
EXACTLY. **Measured live smoking gun (`liveprobe-inherit.mjs`, punch peak t=3605 ms):**

```json
{
  "morphing": "", "punching": "",
  "rootScale":  "1.22 0.819672",     // plate: X=1.22 punch, Y=1/1.22 reciprocal squish
  "childScale": "0.819672 1.22",     // content INVERSE: X=1/1.22, Y=1.22 — the cancel
  "root_punch":  "1.22",             // --dock-punch-stretch at .glass-dock
  "child_punch": "1.22",             // --dock-punch-stretch at .dock-persistent ← NOW READS IT
  "glyphAsp": 1                      // rigid glyph
}
```

`rootScale × childScale = (1.22·0.8197, 0.8197·1.22) = (1.0, 1.0)`. The plate keeps the
liquid punch; the glyph reads its intrinsic 1:1 aspect. The prior FAIL's `child_punch: 1`
(the inheritance gap) is CLOSED.

---

## 1. Per-frame glyph-bbox witness — the wave's own acceptance bar

The authoritative geometry witness: an in-page rAF loop samples the `.dock-persistent`
`<svg>` glyph `getBoundingClientRect()` aspect through a real hover→collapse AND
hover→expand morph on the "Collapsible (hover to expand)" demo dock, both engines both
modes. **Bar: glyph aspect ∈ [0.95, 1.05] on EVERY frame including the punch overshoot.**

| Surface | GL renderer / engine | glyph frames | worst glyphAspect | out-of-band (±5%) | plate deformed? | punch active (Y≈1/1.22)? |
|---|---|---|---|---|---|---|
| **Chrome light** | ANGLE Metal (Apple M5 Max) | 130 | **1.0** | **0** | yes (rootScale X 1.11→0.32) | yes |
| **Chrome dark** | ANGLE Metal (Apple M5 Max) | 130 | **1.0** | **0** | yes | yes |
| **WebKit light** | WebKit 26.4 (Playwright) | 129 | **1.0** | **0** | yes (pillW 46→257) | yes |
| **WebKit dark** | WebKit 26.4 (Playwright) | 129 | **1.0** | **0** | yes | yes |

The morph genuinely fired every run (24-30 `[data-morphing]` frames per direction, pillW
sweeping 45→257 px), the plate genuinely deformed (rootScale X far from 1), and the punch
overshoot was genuinely present (plate cross-axis Y pinned at `0.819672 = 1/1.22`) — yet
the glyph never leaves 1.0. This is the rigid-content-over-morphing-plate contract, not a
morph that failed to fire.

---

## 2. Criterion-by-criterion verdict

| Clause | Requirement | Measured (both engines, both modes) | Verdict |
|---|---|---|---|
| **(b) collapsed REST = 1:1 circle + undistorted glyph** | `scale:none` over the TRUE box, aspect 1.0 | Chrome + WebKit + Safari-keystone: **59×59**, pill aspect **1.0**, glyph aspect **1.0**, `border-radius 9999px`, `morphing=null`, `scale=1` (`childScale=none`). | **PASS** |
| **(b) settle drops residual** | residual only under `[data-morphing]`; clears at settle | At rest `data-morphing=null`, root+content `scale` drop to identity; expanded rest + after-expand glyph aspect 1.0. | **PASS** |
| **(a) rigid content over morphing plate — per-frame glyph aspect ±5% (the wave's bar)** | glyph aspect ∈ [0.95, 1.05] EVERY frame incl. overshoot | **worst = 1.0, 0/518 frames out of band** across the 4 surfaces, WHILE the plate deforms (rootScale X→0.32) AND the punch overshoots (root_punch=child_punch=1.22). The `child_punch` now reads the root's live 1.22. | **PASS (primary)** |
| **(a) full-inverse cancels the FULL morph-axis scale** | content carries `1/(size×stretch×punch)` reading the SAME punch | `childScale × rootScale = (1.0, 1.0)` at every sampled morph frame; at the punch peak `childScale="0.819672 1.22"` exactly inverts `rootScale="1.22 0.819672"`. | **PASS** |
| **(c) outgoing glyph fade coupled to box-travel** | no frame >30% travel with empty pill | Glyph PRESENT and undistorted throughout; no empty-pill frame observed. | PASS (n/a-gating) |
| **(d) hover→first-morph-paint ≤100 ms** | expand onset fast | Morph onset reached on the first hover dwell in every run; not the gating finding. | PASS (n/a-gating) |

---

## 3. Route gestalt (Safari system-WebKit keystones, badge-provenanced)

Both keystones decode the in-pixel top-left provenance badge:
`ENGINE WEBKIT / GPU Apple GPU / VIEW 1440×900 @2x (2880×1800px) / MODE {LIGHT|DARK}`.

- **Route correct** — the `/dock/overview` "Overview" page: Collapsible dock, media-transport
  dock, select/dropdown triggers, the nav dock.
- **Collapsed dock reads a clean 1:1 CIRCLE + undistorted home glyph** in the "Collapsible"
  frame (the AY.W-DOCK-NAV B4 register), both modes — the pixel witness matching the computed
  rest measure.
- **Recessive aurora** — the DockStage backdrop is a calm warm-cream wash (light) / luminous
  near-black transmissive material (dark); NO conic banding, NO oversaturation, grain calm.
- **Hero fits its envelope** — the display "Overview" `<h1>` + blurb sit in the chrome header
  without overflow.

---

## Artefacts on disk (all `isRealPng` header + dimensions verified, JSON valid — 2026-07-04)

| Path (under `docs/tranches/BG/audit/visual/glyph-rigid/`) | What |
|---|---|
| `glyph-rigid-safari-light-desktop.png` (2880×1800) | Safari system-WebKit full-route, LIGHT, badge-provenanced, collapsed circle + undistorted glyph |
| `glyph-rigid-safari-dark-desktop.png` (2880×1800) | Safari system-WebKit full-route, DARK, badge-provenanced |
| `punch-light-01-collapsed-rest.png` (299×179) | Chrome — collapsed REST = clean 1:1 circle + undistorted glyph (aspect 1.0) |
| `punch-light-02-midmorph-rigid-glyph.png` (311×168) | Chrome — **mid-morph PUNCH frame: plate deforming (rootScale X=0.32, Y=1/1.22), glyph UNDISTORTED (aspect 1.0)** |
| `punch-dark-01-collapsed-rest.png` (299×179) | Chrome — collapsed rest, dark, circle |
| `punch-dark-02-midmorph-rigid-glyph.png` (311×168) | Chrome — mid-morph punch, dark, rigid glyph (aspect 1.0) |
| `frameseries-chrome-{light,dark}.json` | Chrome rAF glyph-bbox frame-series (worst 1.0, 0 out-of-band) |
| `frameseries-webkit-{light,dark}.json` | WebKit rAF glyph-bbox frame-series (worst 1.0, 0 out-of-band) |
| `liveprobe-inherit.mjs` (+ live output above) | root-vs-child `--dock-punch-stretch` probe — child now reads 1.22 |
| `capture-frameseries.mjs` / `capture-webkit.mjs` / `capture-punchframe-rigid.mjs` | the re-run capture tooling |
| `punch-{light,dark}-02-midmorph-glyph-stretched.png` | **PRIOR-FAIL artifacts (superseded)** — the +48.84% stretch from re-verification #2, kept for the before/after contrast; NOT this verdict's witness |

---

## 4. Verdict

**PASS — dual-engine (Chrome ANGLE-Metal + WebKit 26.4 + Safari system-WebKit keystone),
both modes.** The born-RED root-vs-child computed-value differential is CLOSED
(`child --dock-punch-stretch == root --dock-punch-stretch == 1.22` at the punch peak); the
per-frame glyph-bbox aspect is 1.0 on all 518 sampled morph frames (0 out of the ±5% band)
while the plate legitimately deforms and punches; the collapsed/expanded REST is the clean
59×59 1:1 circle with an undistorted glyph on all three engines; the `/dock/overview` route
reads correct with a recessive aurora and a fitted hero. Every capture PNG resolves on disk
as a valid PNG.
