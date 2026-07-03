# BG.W-VIZ-PREVIEW-LIVE — NON-AUTHORING dual-engine paint VERDICT

**Verdict: PASS** · 2026-07-03 · judge: non-authoring paint judge (did NOT build this wave)

Route judged: **`/substrates`** (the SectionLanding bento — the 11 per-story viz preview cards).
Method: **C18** dual-engine `?capture=` harness over the **BUILT** demo dist on **`:5200`**
(`vite preview`, NOT the `:5199` dev server). Chrome leg = real `Google Chrome.app` over CDP
(`:9466`, Metal GPU); Safari leg = off-screen `WKWebView` (`wkshot-live`, system
`WebKit.framework` = the Safari 26 engine, no Screen-Recording TCC). Both legs poll
`document.documentElement[data-capture-ready]` before snapshot; provenance decoded from the
in-pixel engine badge (top-left, magenta-bordered).

## Provenance (decoded IN-PIXEL from the engine badge)

| engine·mode | badge ENGINE | badge GPU | VIEW | PNG |
|---|---|---|---|---|
| Chrome·light | `CHROME` | `ANGLE Metal Renderer: Apple M5 Max` | 1440×900 @2x | `vpl-substrates-chrome-light.png` / `-badge.png` |
| Chrome·dark  | `CHROME` | `ANGLE Metal Renderer: Apple M5 Max` | 1440×900 @2x | `vpl-substrates-chrome-dark.png` / `-badge.png` |
| Safari·light | `WEBKIT` | `Apple GPU` | 1440×900 @2x | `vpl-substrates-safari-light.png` |
| Safari·dark  | `WEBKIT` | `Apple GPU` | 1440×900 @2x | `vpl-substrates-safari-dark.png` |

Real Metal GPU (Chrome) + real system-WebKit (Safari), both modes — no SwiftShader/software fall.

## Gate + selftest (device-free)

- `proof:viz` **GREEN** — `V1 one-sizer-gBCR · V2 no-self-measure · V3 no-self-size · V4 dprPolicy×9 · V5 leaf-routes · P1 registry≥11 · P2 pairwise-distinct · P3 card-dispatch · P4 device-free-memoized`.
- `proof:viz --selftest` — **every planted defect RED ✓** (the P2/P1/P3/P4 bites red on plant).

## Painted-truth — the 11-cards-11-hashes bar (the wave's operative criterion)

The primary defect this wave cures: the `/substrates` bento previously handed every card the
ONE shared category `fieldStill` (11 IDENTICAL frozen-aurora stills — the "not-live/all-the-same"
defect). The cure is a per-STORY dispatch off colocated `demo/stories/vizPreviewStill.ts` (11
DISTINCT `(pattern,hue,seed)` triples → 11 device-free Canvas2D-raster `data:` stills), read off
the route in `SectionPreviewCard.vue`.

**Per-card RENDERED-pixel hashes (Chrome, element-level screenshots — auto-scroll reaches the
below-fold cards):**

| mode | stills | distinct RENDERED-pixel hashes | distinct data-URI hashes |
|---|---|---|---|
| light | 11 | **11 / 11** | **11 / 11** |
| dark  | 11 | **11 / 11** | **11 / 11** |

The 11 data-URI payloads carry 11 distinct sha1s in BOTH modes
(`0:71ff3b38 1:bcceb114 2:764d25d1 3:00f507c3 4:d9785668 5:925d71ec 6:ff6121fa 7:c19774d4
8:d8f5597d 9:2d279140 10:2c2bc6d5`). The stills are mode-INVARIANT rasters (the still is keyed on
`(pattern,hue,seed)`; the card's own `.dark` field arm handles theming) — correct.

**Each still reads as its viz's SIGNATURE** (montage `vpl-stills-montage-{light,dark}.png`),
DISTINCT and recognizable:

| # | route | pattern | reads as |
|---|---|---|---|
| 0 | aurora | nuclei | soft warm nuclei-field blobs |
| 1 | blob | metaball | a merged metaball droplet + highlight |
| 2 | constellation | graph | nodes + connecting edges |
| 3 | fourier-field | epicycle | overlapping epicycle circles |
| 4 | glass-material | glass-plate | a glass plate silhouette + specular streak |
| 5 | glass-panel | glass-ladder | stacked rounded glass rungs |
| 6 | dot-flow-field | flow | curl-advected flow ribbons |
| 7 | concentric | rings | concentric ring interference |
| 8 | paper-grid | warp-grid | a domain-warped grid sheet |
| 9 | dot-matrix | phyllotaxis | a golden-angle dot-sphere |
| 10 | goo-dot | dot-halftone | the merged blob rendered as a dot-halftone |

All 11 hues sit in the warm-cream identity band (green/olive/tan/brown 25–95°) — **zero teal/navy**.

## Painted-truth — standing gestalt checks (both engines, both modes)

- **One-GL-per-route budget held.** Computed-DOM: `stillCount=11`, `glContextCount=1`. The single
  live context is the `story-hero` recessive background aurora (WebGPU, owner chain
  `aurora-canvas ← aurora-root ← story-hero`) — the one-GL-per-route budget (CLAUDE.md §BA.W-STAGE),
  NOT a context added by the preview cards. **The 11 preview cards add ZERO GL/GPU contexts** (every
  still is a `data:image/…` URI — confirmed `isDataUri:true` × 11). This is exactly the wave's
  one-GL claim ("a still is a parked frame, not a live context").
- **Recessive aurora, no conic/oversaturation.** The story-hero backdrop reads as a faint warm-cream
  (light) / warm-ember olive-amber (dark) wash — recessive, no conic banding, no oversaturation, in
  BOTH engines. (Independently corroborated by the composited-gestalt judge's 36/36 warm-fraction PASS.)
- **Grain calm.** The card-plate paper grain reads warm-taupe (light) / warm-ember (dark), calm and
  static (no disco-pop). The perceived "gray" at composite downscale is a measured-WARM low-chroma
  grain (hue ≈ 56°, `R>G>B`, chroma 0.019–0.029 = 2.4–3.6× the gray floor) already judged **PASS** by
  the dedicated `BG.W-CATEGORY-CARD-WARM` wave — a different wave's deliverable, confirmed warm, out
  of this wave's scope.
- **Hero fits its envelope.** The `text-display`-scale "Substrates" `<h1>` fits within the content
  column, no overflow, both modes both engines. `main.children.length=3`, `vueRoute=/substrates`.
- **Dark register warm.** The dark field is warm-ember (olive/amber/brown), NOT the flat-charcoal
  void — the class-A dark-void disease is absent.

## Anti-evasion floor

All **10** capture PNGs RESOLVE ON DISK under
`docs/tranches/BG/audit/visual/BG.W-VIZ-PREVIEW-LIVE-paint/`:
`vpl-substrates-{chrome,safari}-{light,dark}.png`, `vpl-substrates-chrome-{light,dark}-badge.png`,
`vpl-substrates-chrome-{light,dark}-full.png`, `vpl-stills-montage-{light,dark}.png`.
`node scripts/verify-siblings-intact.mjs --quiet` exits 0 (no park-not-restored).

Capture scripts (repo-local): `BG.W-VIZ-PREVIEW-LIVE-{chrome-capture,chrome-recapture,extract-stills}.mjs`.

**PASS — dual-engine (Chrome/Metal-M5-Max + Safari/WebKit), both modes: the 11 `/substrates`
preview cards render as 11 DISTINCT recognizable viz-signature stills (per-card pixel-hash differs
11/11), the preview cards add ZERO GL contexts (data-URI stills), the landing is recessive-warm with
no conic/oversaturation, grain calm, hero fits envelope, dark warm-ember. `proof:viz` GREEN + selftest.
Cursor row 6.5 → DONE.**
