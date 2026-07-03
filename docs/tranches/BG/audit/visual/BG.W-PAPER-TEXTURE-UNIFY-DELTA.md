# BG.W-PAPER-TEXTURE-UNIFY — paint DELTA (non-authoring W-REFLECT judge)

**Verdict: PASS** (dual-engine, both modes, all 4 routes) — flip `14.1` PAINT-PENDING → DONE.

- **Judge role:** non-authoring paint judge (did NOT build the wave). Verified the PAINTED truth against the Row-14.1 F4 verbatim paint criteria — *"no-double-warm CEILING + no-squint std floor + no-metallic gestalt, cross-engine side-by-side"* — plus the `proof:paper` 6-arm contract and the computed-DOM criteria.
- **Method (proven C18 pipeline over BUILT bytes):** `npm run demo:dist:build` (fresh from HEAD `880326cf`, 911ms) → `vite preview :5200`. Chrome via CDP (headed real Chrome 149, `chromium.connectOverCDP`, 1440×900 @2x, `?capture=<route>&mode=<m>`, poll `data-capture-ready`). Safari/WebKit via off-screen `/tmp/wkshot-live` WKWebView (system WebKit.framework / Metal, polls `data-capture-ready`). Engine badge decoded top-left for provenance on every PNG.
- **Provenance (badge-decoded, matches filenames):** Chrome = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` · Safari = `WEBKIT / Apple GPU`. Both real-GPU (Metal), not SwiftShader.
- **`proof:paper` re-run on the integrated tree: GREEN** — A tooth-single+cards-migrated YES · B warm floor at SOURCE mean **C 0.0474** ≥ 0.02 YES · C feTurbulence/feDiffuseLighting demoted YES · D multiply/screen blend law YES · E anti-pop relief layering YES · F `--glass-grain-opacity` byte-untouched YES. Self-test: all arms have teeth (PASSED).

## Routes × engines × modes (16 captures, all resolve on disk, 2880×1800)

| Route | Chrome light | Chrome dark | Safari light | Safari dark |
|---|---|---|---|---|
| `/foundations/paper-glass` | PASS | PASS | PASS | PASS |
| `/foundations/paper-texture` | PASS | PASS | PASS | PASS |
| `/substrates/paper-grid` | PASS | PASS | PASS | PASS |
| `/compositions/math-paper` | PASS | PASS | PASS | PASS |

PNGs: `docs/tranches/BG/audit/visual/BG.W-PAPER-TEXTURE-UNIFY-paint/{chrome,safari}-<route>-<mode>.png`.

## The BINDING painted-truth numbers (OKLab, `pixel-analysis.py` → `pixel-analysis.json`)

**No-metallic gestalt (the load-bearing criterion — the "disgusting metallic" defect rejected 3×).**
A metallic sheen would NEUTRALIZE the dark tooth fibers to gray (C→0). They do NOT — on the `paper-texture` CLEAN specimen the DARK (umber) fibers stay warm in every engine/mode:

| Capture | dark-fiber H | dark-fiber C | light-gap H | light-gap C | warm? |
|---|---|---|---|---|---|
| chrome-light | 74.1° | 0.0178 | 77.1° | 0.0181 | ✅ |
| chrome-dark  | 66.8° | 0.0190 | 68.3° | 0.0184 | ✅ |
| safari-light | 68.0° | 0.0208 | 74.2° | 0.0210 | ✅ |
| safari-dark  | 64.9° | 0.0227 | 66.5° | 0.0217 | ✅ |

Both the pit (umber) and the fiber (ecru) poles resolve in the warm OKLab band (H 65–77°) — the tooth reads as warm paper, never brushed metal, in BOTH the light `multiply` and dark `screen` arms.

**Warm floor at PAINT:** composite CLEAN-tooth mean C 0.0180–0.0220 at warm hue H 70.2–75.8° (light) / 64.8–67.7° (dark) — well clear of the perceptual gray floor; the SOURCE C 0.0474 dilutes through the low-α overlay to a warm ~0.02 composite, still unambiguously warm.

**No-double-warm CEILING (LX.2, owned here):** the WARM cascade-retint card (default tooth at full retint) reads C 0.0257–0.0342 — a calm ecru, NOT an oversaturated orange cast. The tooth + warm card/page do not stack into a double-warm slab.

**No-squint std floor:** the tooth produces a real luminance modulation (OKLab L std 0.0040–0.0065 on the boosted-α specimen), visually a clear diagonal fiber weave in every capture — perceptible without squinting, calm without a harsh metal ridge.

**Cross-engine parity (engine-invariant raster):** CLEAN-tooth mean RGB Chrome-vs-Safari maxΔ = **2.7 (light) / 2.2 (dark)** — ~1%, essentially identical (the deterministic `repeating-linear-gradient` raster has no procedural-noise engine divergence).

**Cascade-retint demo confirmed working:** the COOL card is an INTENTIONAL `--paper-*` hue override (H 205–248°, cool blue) — demonstrating the cascade retint, not a library-default tooth reading cold.

## Computed-DOM criteria

- **Tooth painted correctly:** `mix-blend-mode: multiply` (light) / `screen` (dark), a **3-layer** warm weave (`repeating-linear-gradient` × 3), relief layer engaged on the capable (backdrop-filter) engine per the `@supports` demotion. `--glass-grain-opacity` resolves `.025`/`.045` untouched.
- **Recessive field / one-GL budget:** paper-glass & math-paper `glLive=1` (recessive shell aurora); math-paper's engineering graph-grid renders via `.paper-grid` screen/multiply, calm. No conic banding, no oversaturation in any capture.
- **`paper-grid` dual-context is BY DESIGN:** `glLive=2 [webgpu,webgpu]` — the story mounts TWO `<PaperGrid>` instances (the focal AA-grid studio + the near-invisible suffusion-preset field behind content, per the manifest). Not a leaked shell aurora.
- **Heroes fit envelopes:** "Paper & Glass" / "Paper Grid" / "Math Paper" display titles all contained, both modes.

## OPEN — non-blocking, does NOT gate this paint verdict

**The `.paper-grid-breathe` SPEEDTEST clause (ASK-GU-PAPER-GRID-BREATHE / SPEEDTEST-AX-INBOUND #3) is NOT in `src`.**
- Verified: ABSENT from `src/styles/**`; `breatheRuleDefined=false` on all 16 computed-DOM probes (no `.paper-grid-breathe` rule in any stylesheet, no element carries it).
- It is **ungated** — neither `proof:paper` (the wave's own gate, GREEN) nor `proof:paper-grid` references it.
- The source **books it to a future wave**: `flow.glsl.ts` / `flow.wgsl.ts` mark it as the "**B5** paper-grid-breathe" curlFBM consumer #2 (`<Card grid animated>`), and `proof:aurora-curl-warp` treats it as a *booking* evidence line, not a shipped feature.
- It is **non-painting** — an opt-in animated register applied on NO route, so it appears in zero captures and cannot alter the painted gestalt this wave is judged on.

Because the wave's OWN gate is GREEN, every painted surface reads correct in both engines and both modes, and the breathe register is a source-booked (B5), ungated, non-painting opt-in, its absence does **not** constitute a paint defect and does not route this wave to a build-fix agent. **Flagged for the tranche owner** to confirm the register is owned by the B5 curlFBM-consumer wave (per the source markers) rather than owed as a 14.1 follow-up.

## Conclusion

The paper register lands as a warm raster tooth — warm at both fiber poles, no metallic sheen, no double-warm, perceptible-not-squint, engine-invariant — across paper-glass, paper-texture, paper-grid, and math-paper, in Chrome Metal and Safari WebKit, both light and dark. **PASS.**
