# BG — the real-paint protocol (the binding WAVE-DONE gate)

**Status: BINDING on the build phase. Every paint-gated wave closes against THIS document.** It defines
the WAVE-DONE bar, the dual-engine capture protocol, the non-authoring-judge discipline, and the
`proof:ba-gestalt` verdict-flip. It is the operational form of the FINAL.md §8 real-paint frontier — the
disease cure for the headless-green/visually-broken gap that shipped broken 3× (BB green-lie · BC
never-built-cure · BD 77-gates-re-pointed-but-live-π-never-blocks-the-tag).

The cardinal lesson, stated once: a device-free proof reads SOURCE; it cannot read PAINT. A
per-mechanism π reads a pixel ΔL or an `h1Overlap:false`; it cannot read the GESTALT a user reads
("totally mis-aligned" is a placement judgement, not a contrast delta). Neither closes a wave. The
binding close is the fresh dual-engine whole-page capture, judged by an agent that did not build the wave.

---

## 1 · The WAVE-DONE bar (the AND, no shortcut)

A wave is DONE when ALL THREE hold — not two, not "source-green so it must paint":

1. **Device-free proof GREEN.** The wave's `proof:*` gate(s) pass under `--run ci` in a siblings-absent
   clean checkout (the source/structure axis: tokens declared, selectors present, no-fork bites, ratchet
   drained). This is NECESSARY, NEVER SUFFICIENT.
2. **Real-paint π captured-on-disk.** The wave's `tests-visual/<wave>.spec.ts` readback RUNS on a REAL GPU
   (`--run pi`, the visual-runner) AND the fresh whole-page capture set lands under
   `docs/tranches/BG/audit/reflect/` — both engines, both modes (the §2 set). A π that "would pass" but
   left no PNG on disk is not captured (the anti-evasion floor — `isRealPng` + dimension read).
3. **Non-authoring gestalt verdict PASS.** A FRESH agent (not the building agent) captures the surface,
   pixel-reads it through `proof:ba-gestalt`, and the surface's roster row flips FAIL→PASS with the
   pixel-read inside the warm-glass band (§4). The building agent NEVER flips its own row.

Any one of the three RED = the wave is NOT done. There is no "WS-converged so the paint follows" — the
spec frontier caps at the MECHANISM by design; the paint is the build phase, and the build phase is THIS
protocol.

---

## 2 · The dual-engine capture set (the binding 4-PNG floor)

Every paint-gated surface owes, per wave close, a **fresh whole-page LIVE-motion :5199 capture set** —
FOUR PNGs minimum, the engine axis × the mode axis (the viewport axis derives the mobile twins):

```
{Chrome.app, Safari.app/WebKit 26} × {light, dark} × {desktop, mobile}
```

- **DUAL-ENGINE — real Chrome.app AND real macOS Safari.app/WebKit 26.** NOT headless Chromium-SwiftShader,
  NOT Playwright-bundled WebKit (which is NOT real Metal Safari — `playwright.config.ts` `devices["Desktop
  Safari"]` → browserType `"webkit"`, a different GPU backend). The bundled `webkit` Playwright project
  CORROBORATES a wiring assertion; it NEVER discharges the Safari paint (§5). Chrome runs on a real GPU
  (`GL_RENDERER` recorded, NOT `SwiftShader`/`llvmpipe`/`ANGLE Software`); Safari runs Metal on the M5 Max.
- **BOTH modes — light AND dark.** The dark register is a distinct luminous-transmissive material
  (W-DARK-MATERIAL); a light-only capture certifies half the surface. Dark is where the AA-over-bright-ridge
  open risks live (§4) — never skipped.
- **REAL GPU, NOT headless.** A capture against SwiftShader certifies the wrong floor (the aurora
  software-raster fall paints a different field; a SwiftShader Chrome shot is not the user's paint). The
  capture box is a real, on-screen, GPU-composited window.
- **LIVE-motion, NEVER `reducedMotion:reduce`.** The capture is the moving surface at a deterministic frame,
  not the PRM still (the PRM path is its OWN separate assertion). The reflect set is the live read.
- **Whole-page, over the real backdrop.** Not a cropped specimen tile — the surface composited over its
  ACTUAL route field (a dock over the live shell aurora, a card over the page substrate). The gestalt is
  the COMPOSITED read; a specimen on a flat `bg-card` plate is a different question.

**On-disk shape (the resolves-on-disk anti-evasion floor):**
```
docs/tranches/BG/audit/reflect/<surface>-light-desktop-full.png
docs/tranches/BG/audit/reflect/<surface>-dark-desktop-full.png
docs/tranches/BG/audit/reflect/<surface>-light-mobile-full.png      (viewport-derived twin)
docs/tranches/BG/audit/reflect/<surface>-dark-mobile-full.png
```
The Safari leg lands beside it engine-tagged (`<surface>-safari-light-desktop-full.png`, …). Every path a
roster row DECLARES must RESOLVE ON DISK for an operative PASS — a PASS with a missing/zero-byte/wrong-
dimension capture is the close-class lie, mechanically forbidden (`proof:ba-gestalt` G1 + `isRealPng` +
`pngDimensions` ≥ `MIN_CAPTURE_WIDTH/HEIGHT`).

---

## 3 · The non-authoring-judge discipline (the structural anti-self-deception)

**The agent that BUILDS a wave NEVER judges its own paint.** This is not advisory — it is the structural
root cause the disease has. A building agent is incentivised to read its own output as correct; "I made it
warm-cream" reads green on the eye that wrote it.

- **The builder PRODUCES** — lands the slice on `tranche/BG`, rebuilds dist, runs the device-free proof,
  and takes a SELF-capture for its own iteration loop (not binding).
- **A FRESH agent CAPTURES + VERDICTS** — a separate agent (the orchestrator spawns it, model: opus) that
  did NOT author the slice navigates the served `:5199` build, takes the dual-engine set per §2, pixel-reads
  it through `proof:ba-gestalt`, and records the verdict. The roster row flips ONLY on the fresh agent's
  read.
- **No single terminal flipper.** There is NO W-REFLECT funnel wave that flips all verdicts at the end (the
  write-locked-verdict deadlock that destroyed BB). Each painting wave's row is flipped at ITS OWN close by
  the non-authoring judge, against ITS OWN fresh capture. `proof:ba-gestalt` G8 reds on any wave that DEFERS
  its π/verdict to a future terminal-reflect wave.
- **The provenance is in-pixel, not in-prose.** The capture carries the engine badge IN ITS PIXELS (§6);
  the judge does not take the builder's word for which engine produced which PNG. The gate decodes the badge.

The orchestrator owns the live-π cadence: it does not let a building agent self-attest. The
captures+verdicts come from a sibling agent, every visual wave.

---

## 4 · `proof:ba-gestalt` — the verdict-flip mechanism

`proof:ba-gestalt` (`scripts/proof-ba-gestalt.mjs`, `["local","ci","release"]`) is the single close oracle
for PAINT, mechanically derived from the captured pixels. Its roster is
`docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (the 10 BG-dated acceptance surfaces, DERIVED
surface-paths per `BG.W-GESTALT-ROSTER-RE-POINT`).

**Born-RED → operative-PASS.** The gate is born-RED by construction (every roster verdict FAIL, anchored to
a real 4.2.0 Metal reproduction the agent did NOT author). The OPERATIVE gate result is the **AND of every
per-surface verdict**, and it is PASS ONLY when, for EVERY surface:

1. Every declared capture path RESOLVES ON DISK (`existsSync` + `isRealPng` + `pngDimensions` floor) — both
   modes, both viewports (G1 + G2 the mobile-twin viewport-derivation + the symmetric `-desktop-`-below-floor
   verdict).
2. The pixel-read at the row's declared probe region falls inside the row's EXPECT band — the warm-
   translucent-glass floor `meanChroma >= 0.02` (NOT the grey `oklab(0.695)` slab — grey separates from warm
   by chroma, not L) and the translucency floor `meanAlpha < 0.70` where the row declares it (G5, via
   `pngRegionStats` — the ONE PNG decoder leaf, `reflect-capture-verify.mjs`). A hand-typed "PASS" is not
   sufficient; the gate reads the PNG.
3. The per-surface `surface-hash` is FRESH against its DERIVED paint-closure bytes (G7 auto-revoke — the
   DEFAULT, not a `--strict-freshness` opt-in). ANY wave editing a painting source revokes that surface's
   PASS; the surface must be re-captured + re-pixel-read. A re-shot-then-edited surface cannot ride a stale
   green.

**The chroma-gate + defect-localization (`BG.W-PAINT-IS-THE-GATE`).** The decoder extends to per-surface
field-probe regions + a DEFECT-LOCALIZATION-MAP (topDelta for the D5 top-bar, field-probe for the D2
metallic-vs-aurora) so a RED names the failing region, not just "broke." The all-PASS-re-shot-broken
regression bite still REDs (a green capture replaced by a broken one auto-reverts).

**The per-band cadence.** Capture is not deferred to one terminal sweep. Each band's surfaces are captured
+ verdicted AT that band's close: WS1 routing/field → WS3 glass → WS2 dock → WS5 viz → WS4 components → the
deep-morphism WS8 glass / WS9 paper → WS10 de-shadcn → WS11 storybook → WS12 the coherence capstone (the
480-capture dual-engine both-modes verdict, STRUCTURALLY post-integration). `proof:ba-gestalt` runs in
`--run ci` so the mid-tranche battery carries gestalt signal continuously; the `--run pi` visual-runner over
the webkit-testMatch-enrolled spec set is the binding paint at each close.

---

## 5 · C-SAFARI — the ★★★ 3-wave chronic (non-skippable)

**WS8's `BG.W-GLASS-SUFFUSE-UNIVERSAL` Metal-Safari.app capture is the single likeliest item to miss a 4th
time, and is scheduled as an explicit, non-skippable close precondition.** Nothing else discharges the
chronic.

- **The chronic.** "MUST work on Safari, no fallbacks" specced a real-WebKit pixel decode at BE.W-LENS-SAFARI
  · BE.W-SAFARI-CAPTURE · BF.W-SAFARI-CAPTURE — and NONE landed (three consecutive misses). The root, one
  engine deeper than "run the webkit project": a per-pixel π that greens on bundled-WebKit-headless does NOT
  prove real-Metal-Safari (the headless-green trap at the GPU backend).
- **The binding π is a COMMITTED real-Metal-Safari.app capture by a non-authoring agent** on Safari.app 26.x /
  macOS-Tahoe DEFAULT on the M5 Max — NOT a re-runnable Playwright `webkit`-project arm. The bundled-WebKit
  arm CORROBORATES wiring; it NEVER retires the committed capture.
- **The Safari-fidelity DELTA is OWED FIRST.** Run the SAME refraction fixture on (a) Playwright bundled
  WebKit AND (b) real Safari 26 on the M5 Max and MEASURE the per-pixel divergence at FULL-RES per-pixel ΔE
  (NOT the 64-cell mean-RGB — that is necessary, not sufficient; the readback FNV-hash is engine-blind).
  `scripts/safari-fidelity-delta.mjs` reuses `reflect-capture-verify`'s `pngRegionStats`/`inflateSync`/
  `oklabFromRgb` decoder (NOT pngjs — the single-decoder discipline). The result gates whether the
  webkit-project spec corroborates; it never retires the committed capture.
- **The C16 navigator.gpu reconcile.** Before pinning the capture, MEASURE `navigator.gpu` (defined? a
  `requestAdapter()` returns non-null?) on default Safari.app / AS-Tahoe and RECORD the verdict in
  `safari-fidelity-delta.md`. State explicitly whether the Safari.app capture renders Tier-2 (WGSL native)
  or Tier-1 (WebGL2 floor). EITHER is a PASS — the Tier-1 WebGL2 floor is the universal artifact + the
  load-bearing C-SAFARI path (Tier-2 reaches ~0 default-Safari users; the `_WKFeature WebGPUEnabled` flag
  path is the `wkdriver.swift`/`wkshot.m` WKWebView scope, NOT default Safari.app).
- **The open dark-mode risk (R6).** The committed evidence FAILS 4.5 dark over the worst-case BRIGHT ridge;
  the resolution is the two-fidelity-rungs + the content-tier OPAQUE-FALL (the plate falls opaque where dark
  cannot clear 4.5) — specced, UNRATIFIED. The dark-mode AA-live ratify is a binding close item, not
  deferrable.
- **The tooling EXISTS, the capture is OWED.** `wkdriver.swift` + `wkshot.m` (the WKWebView snapshot, the
  on-screen composite path) + `webkit-report.json` are promoted to `docs/tranches/BG/audit/`. The C18 harness
  (§6) is the UNBUILT load-bearing instrument. No harness = no binding capture = the chronic stays open.

The close runs the real-Safari `webkit.glass/goo == pass` over the served BG roster (`BG.W-CUT`); the tag
fires ONLY after it passes.

---

## 6 · The capture harness (`BG.W-GLASS-SUFFUSE-UNIVERSAL` C18 — the load-bearing instrument)

The harness makes a capture DETERMINISTIC, ENGINE-PROVENANCED, and OCCLUSION-AGNOSTIC. It is the unbuilt
piece without which the chronic cannot close.

**The `?capture=` demo route.** `demo/main.ts` resolves a capture mode off the URL:
```
?capture=<surface>&surface=<name>&mode=<light|dark>&badge=<engine>&fiducial=1&state=<rest|hover>
```
- A **deterministic fixed-512² per-surface render** — the surface mounted at a pinned 512×512 box over its
  real backdrop, no scroll, no random seed, frame-pinned (`renderAt` for an animating field, a static frame
  for the at-rest suffuse surfaces — DE-CONFLATE the field-INDEPENDENT at-rest surfaces from the WS1-gated
  animating refract-field).
- A **4px `#ff00ff` fiducial frame** — the magenta border the gate uses to locate + crop the surface
  deterministically (occlusion/scale-agnostic; survives a Retina double-scale + the notch).
- The **`&state=hover`** param forces `--specular-angle` for the M9 hover-frame capture (screencapture has no
  pointer injection — the URL param is the only way to capture the awakened conic glint; rim-grazing, NOT a
  rotating center-wedge).

**`demo/capture/engine-badge.ts` — the in-pixel engine badge (the SOLE provenance source).** The badge
encodes the rendering engine + mode + surface as a deterministic pixel pattern painted INTO the capture
(decodable by the gate). The provenance is ONE honest channel — the gate decodes the badge PIXELS; the JSON
sidecar is DROPPED (a JSON file is forgeable beyond a re-stamp; the in-pixel badge proves which engine
produced the bytes the eye saw). `proof:ba-gestalt` folds the badge/engine-discrimination assertion onto the
EXISTING resolves-on-disk + `isRealPng` manifest mechanism — NOT a parallel `proof:safari-metal-capture`.

**`screencapture -o -l <windowID>` window-mode (the macOS capture path).** Window-mode by window ID is
occlusion/geometry-agnostic — it captures the REAL composited window content (the on-screen path: AA rim +
DOM-over-GL stack + colorspace). NEVER `-R0,0,…` region-mode (it clips under the notch + double-scales on
Retina). The fiducial frame + the fixed-512² render make the crop deterministic regardless of where the
window sits.

**`scripts/safari-fidelity-delta.mjs` — the divergence measure.** Reuses the single `reflect-capture-verify`
decoder (`pngRegionStats`/`inflateSync`/`oklabFromRgb`) at FULL-RES per-pixel ΔE over equal-resolution/
equal-crop captures. Writes `docs/tranches/BG/audit/visual/safari-fidelity-delta.{json,md}` (the per-pixel
ΔE re-run + the C16 navigator.gpu verdict).

---

## 7 · The release axis re-coupled (the tag-push bypass-closer)

The verification axis and the release axis shipped DECOUPLED 3× (the gate measured source; the tag fired
without measuring paint). BG re-couples them:

- **`proof:ship-attestation` `["ci","release"]`** is the tag-push bypass-closer. The per-region pixel digest
  of the dual-engine capture set is embedded in `docs/tranches/BG/SHIP-ATTESTATION.json` (`surfaceHash` bound
  to REAL source bytes via `surface-closure.mjs`, the SAME §A.6 self-reference guard `proof:ba-gestalt`
  imports — the attestation's own commit never G7-revokes a surface it certifies). `runShip()` is fail-CLOSED;
  `--run full` REDs in CI-shape on an absent/stale `SHIP-ATTESTATION.json`. The GREEN ceremony runs end-to-end
  in a fresh in-repo `.claude/worktrees/` checkout — NEVER `/tmp`, NEVER a moved sibling (the foreign-tree
  fence + the park-not-restored law).
- **The close runs the FULL battery siblings-absent** (`gates.mjs --run ship` / `--run full` — the deduped
  union of `local`+`ci`+`release`), NOT `--run local` alone. `BG.W-CUT` fires the tag ONLY after `--run ship`
  passes over the served BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari
  `webkit.glass/goo == pass` + the user gate.
- **`scripts/verify-siblings-intact.mjs`** runs BEFORE and AFTER any close-battery (the standing tripwire).

---

## 8 · The two close oracles, restated

| Oracle | What it reads | When | Tag-blocking |
|---|---|---|---|
| `proof:ba-gestalt` | the captured PNG pixels (per-surface gestalt verdict, warm-glass band) | every band close + `--run ci` continuous | yes (operative-PASS = AND of all rows) |
| `--run pi` visual-runner | the live surface on a real GPU (webkit-testMatch-enrolled specs) | every band close, `--run pi` | the binding paint at each close |

Plus the C-SAFARI committed real-Metal-Safari.app capture (§5) — the single non-skippable item — and
`proof:ship-attestation` (§7) re-coupling the release axis. NOTHING on committed `tranche/BG` disk at HEAD
(`git diff master..HEAD -- src/` is empty) — the literal frontier the build phase opens against, one PROVEN
slice at a time, each closed against the §1 AND.
