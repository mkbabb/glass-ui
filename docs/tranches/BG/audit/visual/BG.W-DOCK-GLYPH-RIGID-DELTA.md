# BG.W-DOCK-GLYPH-RIGID — PAINT JUDGE DELTA

**Verdict: FAIL** (dual-engine, both modes) — the F3.R1 "full-inverse" repair does NOT
paint. The +48.84% mid-morph glyph stretch the wave exists to remove is STILL present.
**Judge:** non-authoring paint judge (did not build the wave), re-verification #2 of the
integrated F3.R1 paint-repair.
**Route:** `/dock/overview` — the GlassDock collapse↔expand rigid-glyph series.
**Engines:** Chrome ANGLE-Metal (Apple M5 Max, Chrome 149.0.7827.201) + WebKit 26.4
(Playwright, the Safari engine) + Safari system-WebKit keystone (Apple GPU, Metal).
**Modes:** light + dark. **Viewport:** 1440×900 @2x (2880×1800 px).
**Build:** `npm run demo:dist:build` fresh bytes (`dist-demo/assets/index-DoZc2I_S.css`
carries the F3.R1 FULL-inverse rule text), served `vite preview :5200`.
**Date:** 2026-07-04.

---

## 0. Headline — the integrated fix is INERT in paint

The F3.R1 repair upgraded the content counter-scale from a size-only inverse to a claimed
FULL morph-axis inverse (`shape.css`: content morph-axis `scale: 1/(max(size,0.06) ×
--stretch × --dock-punch-stretch)`, cross-axis `--stretch × --dock-punch-stretch`). The
rule text IS in the built CSS. **But the painted glyph aspect still reaches 1.4884
(+48.84%)** — byte-for-byte the same residual the F3.R1 FAIL measured — on Chrome AND
WebKit, light AND dark, collapse AND expand. The fix changed the CSS string but changed
NOTHING in the composited pixels.

**Root cause (proven live):** `--dock-punch-stretch` is registered
`@property { syntax:"<number>"; inherits:false; initial-value:1 }` (`shape.css:41-45`,
verified in the built CSS: `@property --dock-punch-stretch{syntax:"<number>";inherits:false;initial-value:1}`).
Because it does **not inherit**, the content child `.dock-persistent` cannot read the
root's live punch value — its `var(--dock-punch-stretch, 1)` resolves to the `@property`
**initial-value 1**, never the root's overshoot 1.22. The "full inverse" therefore never
compensates the punch factor: it silently collapses back to the size-only inverse the
F3.R1 FAIL already condemned.

---

## 1. What was captured (all fresh, against the F3.R1-integrated build)

- **Dual-engine provenance confirmed.** Chrome leg over CDP — `GL_RENDERER = ANGLE
  (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. WebKit leg on
  Playwright WebKit 26.4 (engine string recorded in each frame-series JSON). Safari
  system-WebKit off-screen keystone snapshots (`glyph-rigid-safari-{light,dark}-desktop.png`,
  2880×1800, in-pixel badge decoded: `ENGINE WEBKIT / GPU Apple GPU / VIEW 1440×900 @2x
  (2880×1800px) / MODE {LIGHT|DARK}`).
- **Per-frame glyph-bbox aspect** rAF-sampled on the `.dock-persistent` `<svg>` glyph
  `getBoundingClientRect()` through a real hover→collapse and hover→expand morph on the
  "Collapsible (hover to expand)" demo dock — the authoritative geometry witness the ±5%
  clause demands.
- **Live root-vs-child computed-value probe** (`liveprobe-inherit.mjs`) capturing the
  smoking gun: at the punch peak `root --dock-punch-stretch = 1.22` while
  `child --dock-punch-stretch = 1`.

### Artefacts on disk (all `isRealPng` / valid-JSON verified, re-captured 2026-07-04)

| Path (under `docs/tranches/BG/audit/visual/glyph-rigid/`) | What |
|---|---|
| `glyph-rigid-safari-light-desktop.png` (2880×1800) | Safari system-WebKit full-route, LIGHT, badge-provenanced |
| `glyph-rigid-safari-dark-desktop.png` (2880×1800) | Safari system-WebKit full-route, DARK, badge-provenanced |
| `punch-light-01-collapsed-rest.png` (299×179) | Chrome — collapsed REST = clean 1:1 circle + undistorted glyph (aspect 1.0) |
| `punch-light-02-midmorph-glyph-stretched.png` (311×168) | Chrome — **mid-morph PUNCH frame: home glyph stretched wide, glyphW 26.8px, aspect 1.488** |
| `punch-dark-01-collapsed-rest.png` (299×179) | Chrome — collapsed rest, dark |
| `punch-dark-02-midmorph-glyph-stretched.png` (314×168) | Chrome — mid-morph punch glyph stretch, dark (glyphW 24.4px, aspect 1.488) |
| `frameseries-chrome-{light,dark}.json` | Chrome rAF glyph-bbox frame-series (worst 1.4884 both) |
| `frameseries-webkit-{light,dark}.json` | WebKit rAF glyph-bbox frame-series (worst 1.4884 both) |
| `liveprobe-inherit.mjs` | Live root-vs-child computed `--dock-punch-stretch` probe (capture tooling) |

---

## 2. Criterion-by-criterion verdict

| Clause | Requirement | Measured (both engines, both modes) | Verdict |
|---|---|---|---|
| **(b) collapsed REST = 1:1 circle + undistorted glyph** | `scale:none` over the TRUE box, aspect 1.0 | Chrome + WebKit: 58–59×58–59, pill aspect **1.0**, glyph 20×20 aspect **1.0**, `border-radius 9999px`, `morphing=null`, `scale=1`. | **PASS** |
| **(b) settle drops residual (G3 arrival-settle)** | residual only under `[data-morphing]`; clears promptly at settle | The F3.R1 G3 arrival-drop DID help: WebKit `restCollapsed` at +600 ms reads the clean 59×59 circle, `morphing=null`, no lingering aspect-0.75 sliver (the prior ~800–1000 ms WebKit sliver-at-rest tail is not reproduced). | **PASS (improved)** |
| **(b)/gate — per-frame glyph-bbox aspect ±5% (mid-morph AND rest)** — the wave's own acceptance bar | glyph aspect ∈ [0.95, 1.05] **every** frame | **glyph aspect reaches 1.4884 (+48.84%)** for the entire `[data-punching]` overshoot window, **Chrome AND WebKit, light AND dark, collapse AND expand.** ≈10× the ±5% bar. Chrome collapse worst t≈4 ms; WebKit collapse worst t≈4–5 ms; expand worst t≈4–17 ms. | **FAIL (primary)** |
| **(a) rigid content over morphing plate** | content carries the per-frame inverse of the FULL morph-axis scale | The content counter-scale's `var(--dock-punch-stretch,1)` reads **1** at the child (the `inherits:false` initial), not the root's **1.22**, so the punch factor is uncompensated. Effective residual glyph aspect = `(--dock-punch-stretch)²` (= `1.22² = 1.4884`) exactly. | **FAIL** |
| **(c) outgoing glyph fade coupled to box-travel** | no frame >30% travel with empty pill | Not the gating finding; the glyph is PRESENT (and distorted) throughout — no empty-pill frame observed. | n/a |
| **(d) hover→first-morph-paint ≤100 ms** | expand onset fast | Not the gating finding; decided by the glyph distortion. | n/a |

---

## 3. Root-cause proof (why 1.4884 exactly — the live smoking gun)

`liveprobe-inherit.mjs`, run over the morph on the F3.R1-integrated build, captured the
worst frame (t=3604 ms, punch peak):

```json
{
  "morphing": "", "punching": "",
  "rootScale": "1.22 0.819672",      // root box: X=1.22, Y=1/1.22
  "childScale": "1",                  // content counter-scale = IDENTITY (no compensation)
  "root_punch": "1.22",               // --dock-punch-stretch at .glass-dock
  "child_punch": "1",                 // --dock-punch-stretch at .dock-persistent  ← the bug
  "glyphAsp": 1.4884
}
```

The root box-scale (`shape.css`, horizontal `[data-morphing]`/`[data-punching]`) is:

```
root X = --dock-size-scale × --stretch × --dock-punch-stretch
root Y = 1 / (--stretch × --dock-punch-stretch)
```

The F3.R1 content counter-scale (`shape.css`, `> .dock-persistent, > .dock-layers`) is
TEXTUALLY the full inverse:

```
content X = 1 / (max(--dock-size-scale,0.06) × --stretch × --dock-punch-stretch)
content Y = --stretch × --dock-punch-stretch
```

but because `--dock-punch-stretch` is `inherits:false`, the child evaluates
`--dock-punch-stretch → 1` (initial) and `--stretch` (unset → 1), so at the punch peak
(size≈1) the child's computed `scale` is `1/(1×1×1)  1×1` = **`scale: 1`** — identity. The
glyph then inherits the full root box-scale unmodified:

```
glyph X = root X × content X = 1.22 × 1 = 1.22
glyph Y = root Y × content Y = 0.8197 × 1 = 0.8197
glyph aspect = 1.22 / 0.8197 = 1.4884   ← exact match to the painted measure
```

`.dock-persistent` IS a direct child of `.glass-dock` (probe `directChild:true`; chain
`svg → button.dock-icon-button → div.dock-persistent → div.glass-dock`), so the `>`
combinator matches and the rule fires — it simply reads the wrong (non-inheriting) value.
This is NOT a size-only-inverse authoring slip (as the F3.R1 FAIL diagnosed); it is a
**custom-property inheritance defect** the CSS-string fix could not reach.

---

## 4. Why the gate is GREEN while the paint FAILS (unchanged)

`proof:dock` G1 is a pure **CSS source-string** check: it now confirms the rule *text*
declares BOTH scale components on the content children — but it CANNOT see that the child's
`var(--dock-punch-stretch,1)` resolves to the `inherits:false` initial `1` rather than the
root's live value. So the gate greens on both-components-present-in-text while the
composited glyph carries the full `(--dock-punch-stretch)²` residual. This DELTA's live
`liveprobe-inherit.mjs` (root vs child computed value) + the per-frame frame-series are the
binding painted witness the gate lacks.

---

## defectLocalization

- **PRIMARY — the `@property` inheritance boundary, `src/styles/dock/shape.css:41-45`.**
  `--dock-punch-stretch` is registered `inherits:false`, so the content counter-scale rule
  (`shape.css`, `.glass-dock[data-morphing]:not(.vertical) > .dock-persistent, …` + the
  `.vertical` twin) reads the initial `1` at the child, not the root's overshoot value. The
  full-inverse math is CORRECT only if the child sees the same punch value the root does —
  which it does not. Same class for `--stretch` (unset here, so not the active contributor,
  but it would fail the same way if it too is non-inheriting when a fission stretch is
  live).
- **The root box-scale itself is right** (`shape.css:154-171`): `root X = size × stretch ×
  punch`, `root Y = 1/(stretch×punch)`. The plate SHOULD carry the liquid punch. The bug is
  purely that the RIGID CONTENT cannot cancel the punch because it can't read it.
- **SECONDARY (now PASS) — WebKit settle-latency.** The F3.R1 G3 arrival-drop
  (`dockMorphContext.onFrame` `settleAll()` at `tValue>=1`) resolved the prior ~1 s WebKit
  sliver-at-rest: `restCollapsed` reads the clean 59×59 circle at +600 ms on WebKit. Keep
  this; it is not the gating finding.

## mustFix

1. **Make the punch (and stretch) factor READABLE by the rigid content, then invert it.**
   Options, any of which the per-frame bbox measure will accept:
   - (i) Register `--dock-punch-stretch` (and any live `--stretch`) as
     `@property { inherits:true }` so the content child reads the root's live value and the
     existing full-inverse rule actually cancels the punch. (Verify no OTHER consumer relies
     on the per-element non-inheritance — the `property-regs.css:82-85` note explains the
     indicator-blob non-inheritance rationale; the DOCK punch may need its OWN inheriting
     twin token rather than flipping the shared one.)
   - (ii) Drive the content inverse off a SEPARATE, inheriting scalar the dock writes on
     BOTH the plate and the content scope (a `--dock-content-punch-inverse` the JS/transition
     sets alongside the plate punch), so the child never has to inherit the plate's own var.
   - (iii) Re-express the plate morph as a clip-aperture over the reserved footprint with the
     content untransformed (spec vocab (a) alternative) — no counter-scale needed.
   **The bar: per-frame glyph-bbox aspect ∈ [0.95, 1.05] in EVERY frame including the
   `[data-punching]` overshoot, both engines, both modes.**
2. **Upgrade the gate to the painted / computed-value measure.** `proof:dock` G1 checks
   rule TEXT and cannot see the `inherits:false` resolution. Bind this DELTA's
   `liveprobe-inherit.mjs` differential (root vs child computed `--dock-punch-stretch`)
   OR the per-frame glyph-bbox frame-series as the born-RED local-π so a re-introduction of
   the inheritance gap REDs on the number, not on a present-but-inert CSS string.

## re-capture recipe (for the fix agent)

```
node scripts/verify-siblings-intact.mjs --quiet          # exit 0
npm run demo:dist:build && npm run demo:dist:serve        # BUILT bytes on :5200
# Chrome real, CDP :9222:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-cap-profile --no-first-run --no-default-browser-check \
  "--remote-allow-origins=*" about:blank &
node docs/tranches/BG/audit/visual/glyph-rigid/capture-frameseries.mjs {light|dark}   # Chrome
node docs/tranches/BG/audit/visual/glyph-rigid/capture-webkit.mjs      {light|dark}   # WebKit
node docs/tranches/BG/audit/visual/glyph-rigid/capture-punchframe.mjs  {light|dark}   # PNG
node docs/tranches/BG/audit/visual/glyph-rigid/liveprobe-inherit.mjs                  # root-vs-child value
```
PASS iff every frame-series `glyphAspect ∈ [0.95, 1.05]` (incl. the punch overshoot) AND
`liveprobe-inherit.mjs` shows `child --dock-punch-stretch == root --dock-punch-stretch`
mid-morph AND collapsed rest = aspect 1.0 with `morphing=null` on BOTH engines BOTH modes.
