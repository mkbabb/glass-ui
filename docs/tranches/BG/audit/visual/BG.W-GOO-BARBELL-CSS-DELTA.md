# BG.W-GOO-BARBELL-CSS — PAINT DELTA (dual-engine, both modes)

**Wave:** BG.W-GOO-BARBELL-CSS (10.15) · band F6 · paintClass **P** (byte-identical paint, Safari floors)
**Route:** `/navigation/carousel` (carousel/pager goo-morph worm)
**Verdict:** **PASS** — Chrome + Safari, LIGHT + DARK, all four captures read correct; every capture PNG resolves on disk.
**Judge:** non-authoring paint judge (did not build; verified painted truth).

---

## Method (proven C18 pipeline, used verbatim)

- BUILT bytes: `npm run demo:dist:build` → `dist-demo/`, then `npm run demo:dist:serve` (vite preview :5200; polled `curl :5200` → 200). NOT :5199 dev.
- **Chrome leg:** real Chrome 150 (`--remote-debugging-port=9467`), playwright `chromium.connectOverCDP`, `newContext({viewport 1440×900, deviceScaleFactor 2, colorScheme <mode>})`, `?capture=/navigation/carousel&mode=<m>` (waitUntil load → poll `data-capture-ready`), full-page `page.screenshot` → 2880×1800. GL_RENDERER probed off a throwaway webgl2 `UNMASKED_RENDERER_WEBGL`.
- **Safari/WebKit leg:** off-screen WKWebView (`wkshot-live.m` → clang), system `WebKit.framework`/Metal, `wkshot-live "http://localhost:5200/?capture=/navigation/carousel&mode=<m>" out.png <m> 15000` (polls `data-capture-ready` before `takeSnapshotWithConfiguration`) → 2880×1800.
- Teardown: killed vite preview + CDP Chrome.

---

## Provenance (top-left engine badge, decoded)

| Capture | ENGINE | GPU | VIEW | MODE |
|---|---|---|---|---|
| `chrome_navigation_carousel_light.png` | CHROME | ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) | 1440×900 @2x (2880×1800) | LIGHT |
| `chrome_navigation_carousel_dark.png` | CHROME | ANGLE Metal Apple M5 Max | 1440×900 @2x (2880×1800) | DARK |
| `safari_navigation_carousel_light.png` | WEBKIT | Apple GPU | 1440×900 @2x (2880×1800) | LIGHT |
| `safari_navigation_carousel_dark.png` | WEBKIT | Apple GPU | 1440×900 @2x (2880×1800) | DARK |

All four PNGs resolve on disk (2880×1800; 2.10–4.16 MB). Chrome badge crops also saved (`*_badge.png`); Safari badge is embedded top-left of the full capture.

---

## Gate — `proof:encapsulation` goo-barbell arm (computational)

`node scripts/proof-encapsulation.mjs` on the INTEGRATED tree:

```
BG.W-GOO-BARBELL-CSS (GB1 colocation · GB2 stateless-leaf · GB3 single-definition):
  goo-barbell geometry : GREEN (leaf=true, exports=true, engine-imports=true, stateless=true, engine-redefs=0)
self-test (bite proof) : OK — 64 synthetic sabotages handled (incl. goo-barbell GB1×2+GB2×4+GB3+GB3-fence+GB-fence)
```

- **GB1 colocation** GREEN — `src/composables/motion/gooBarbellGeometry.ts` mints the pure barbell-projection geometry; `useGooMorph.ts` imports the consumed set back.
- **GB2 stateless-leaf** GREEN — no SpringProgress/keyframes fork, no vue, no rAF, no DOM read/write, no rng, no module-mutable.
- **GB3 single-definition** GREEN — `engine-redefs=0`: the in-engine geometry fns are DEFINITION-ABSENT; the engine composes the leaf's `projectBarbell` + the three transform-string composers. No dual-path copy.

**Aggregate `proof:encapsulation` exits FAIL — solely on the PRE-EXISTING UNRELATED arm** `C1 [useGlassBackdropLuminance] host is 554 lines` (an owed W-COLOCATE 10.13 carve, file UNTOUCHED by this wave, RED at HEAD before the patch). **NOT this wave's regression** — the goo-barbell arm is GREEN, self-test OK.

---

## Painted truth — the goo-morph worm barbell

### Computed DOM (Chrome CDP probe, both modes)

- `glContextCount = 0` (navigation route — no live WebGL viz; correct).
- `main.children = 2`; `data-capture-ready` set; `.dark` present iff dark mode.
- Shared GooFilter mount present: `gooFilters = [glass-goo, dock-fission-goo, pager-goo, dock-morph-goo, morph-goo]` — the ONE Safari-safe `<defs>` mount.
- `pagerRings = 20` — the `.glass-pager-ring` / `pager-dots` / `pager-goo-layer` register.

**Barbell transform strings (paint-class P — byte-preserved):**

| element | light | dark |
|---|---|---|
| `carousel-goo-body` (bell 1) | `matrix(1.0103, 0, 0, 0.9898, 78.185, -134.245)` | `matrix(1.0103, 0, 0, 0.9898, 78.195, -134.245)` |
| `carousel-goo-neck` (thin neck) | `matrix(1.5875, 0, 0, 0.0252, 289.125, 0)` | `matrix(1.5874, 0, 0, 0.0252, 289.125, 0)` |
| `carousel-goo-body` (bell 2) | `matrix(1.0103, 0, 0, 0.9898, 500.065, -134.245)` | `matrix(1.0103, 0, 0, 0.9898, 500.055, -134.245)` |

The barbell reads as designed: two volume-preserving bells (scale 1.0103×0.9898≈1.0) at x=78 / x=500 joined by an ultra-thin neck (y-scale **0.0252**) at the midpoint x=289 — `composeBodyTransform` + `composeNeckTransform` off the carved leaf. Light↔dark are structurally byte-identical (only sub-pixel spring-sample drift: 78.185↔78.195, 1.5875↔1.5874), the expected reading for a live spring frame-series over the SAME geometry math. The dark `carousel-goo-layer` carries the dark-arm `filter: url(#glass-goo) saturate(1.3) brightness…` luminosity lift.

### Pixel reads (all four PNGs)

- **Goo-morph worm** paints as ONE coherent merged liquid barbell behind the carousel card — no detached bell, no broken neck, no gray. Light: recessive pale-cream blob over the warm page; dark: warm peach-cream barbell over the deep canvas (warm-cream identity held, no oversaturation).
- **Safari floors the goo:** the regular `filter: url(#glass-goo)` / `#pager-goo` merge renders on system WebKit+Metal in BOTH modes (the criterion's binding point — the worm merges, it does not fall to detached discs).
- **Pager reads as ONE encapsulated glass control:** the `2 / 5` glass pill chassis + the `.glass-pager-ring` dot pill (active dot elongating to a pip) — no opaque slab, no bare floating dot row.
- **Hero fits its envelope:** the carousel card sits within the story frame; the bottom dock nav strip reads clean. (Slide content differs Chrome↔Safari — incidental live embla snap position, not a wave concern.)

---

## Conclusion

Every surface reads correct in BOTH engines + BOTH modes; the barbell geometry is byte-preserved (paint-class P); the `proof:encapsulation` goo-barbell arm is GREEN with the aggregate FAIL isolated to the pre-existing unrelated `C1` arm. Every declared capture PNG resolves on disk. **PASS.**
