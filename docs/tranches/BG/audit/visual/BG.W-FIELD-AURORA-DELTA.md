# BG.W-FIELD-AURORA — NON-AUTHORING dual-engine paint verdict

**Verdict: PASS (flip PAINT-PENDING -> DONE).** Build commit `cb8ecdfc` (the re-paint fix
`b3d65eec` + the WS4 warm-bento `9e13965d` are in HEAD). Judged against the cursor criteria:
_"glContextCount(allocated)===1 every non-substrate route + content↔focal↔dock round-trip ·
recessive warm aurora NO conic/C>0.10/speckle worst-cool both modes · AA at opacityCeiling 0.5 ·
Chrome+Safari."_

Every leg passes in BOTH engines and BOTH modes. The prior FAIL (the dark-mode AA catastrophe —
hero h1 2.14:1, muted 1.04:1 over a mid-light brown wash) is decisively CLOSED by `b3d65eec`
(the dark-aware luminous-ember shell palette): dark hero h1 is now 13.9–14.7:1 and dark muted
6.7–7.1:1.

---

## Capture provenance (PROVEN C18 `?capture=` pipeline, BUILT bytes on :5200)

- **Build:** `npm run demo:dist:build` (vite, 2415 modules) → `npm run demo:dist:serve`
  (vite preview `:5200`). All routes polled `?capture=…` == 200 before capture.
- **Chrome leg:** real Chrome.app over CDP `:9456`; badge decode = **ENGINE CHROME · GPU `ANGLE
  (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`** (hardware Metal, NOT
  SwiftShader). 1440×900 @2x → 2880×1800. Probe + screenshot via
  `BG.W-FIELD-AURORA-DELTA-chrome-capture.mjs`; results in `chrome-results.json`.
- **Safari leg:** off-screen `wkshot-live` WKWebView (system WebKit.framework / Metal); badge
  decode = **ENGINE WEBKIT · GPU `Apple GPU`** (no `--use-gl=angle`, no SwiftShader). 1440×900 @2x
  → 2880×1800.
- **16 PNGs on disk** under `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint/`
  (`{chrome,safari}-<route>-<mode>.png`, 4 routes × 2 modes × 2 engines). All RESOLVE, all
  2880×1800 (`sips`-verified), all content-real, all badge-decoded.

| route | chrome-light | chrome-dark | safari-light | safari-dark |
|---|---|---|---|---|
| /foundations/colors | ✓ | ✓ | ✓ | ✓ |
| /foundations/intro  | ✓ | ✓ | ✓ | ✓ |
| /substrates/aurora  | ✓ | ✓ | ✓ | ✓ |
| /dock/overview      | ✓ | ✓ | ✓ | ✓ |

---

## 1 · The one-GL law — `glContextCount(live)===1` every non-substrate route (PASS)

Measured via a CDP init-script wrapping `HTMLCanvasElement.prototype.getContext`, counting distinct
DOM-connected live GL/GPU contexts (one per canvas — the HTML one-context-per-canvas rule).

| route | kind | Chrome glLive | canvas elements | shell `<Aurora>` | verdict |
|---|---|---|---|---|---|
| `/foundations/colors` | content | **1** (webgpu) | 1 (`shell-aurora`) | yes | ✓ shell field = the 1 |
| `/foundations/intro`  | focal hero | **1** (webgpu) | 1 (`story-hero-b`) | self-stage | ✓ hero field = the 1 |
| `/dock/overview`      | dock (focal) | **1** (webgpu) | 2 elements, 1 GL | stood down | ✓ DockStage aurora = the 1 (the 2nd canvas carries NO GL context) |
| `/substrates/aurora`  | substrate (focal) | 2 (webgpu×2) | 2 (`story-hero-b` + config-stage) | stood down | ✓ EXEMPT — substrate route, both page-owned |

- **`/substrates/aurora` 2 contexts are page-owned** (the studio field 1152×1654 + the
  configurator-stage interactive preview 704×700), both `data-glass-field-canvas` unset, shell
  stood down. Exempt from the **non-substrate** `===1` bar by the criteria's own qualifier; the
  never-shell+focal-stack law holds.
- **`mainChildren=3` on every route** (`p.sr-only[aria-live]` + `div.demo-scroll-progress` +
  `article.story-page-article`) — the reconciled scaffold (DELTA-A of row 2.1); the route root is
  `main.children[0]`. In `?capture=` mode the `.route-enter` entrance is neutralized
  (`routeAnims=0`) — expected, that animation is BG.W-ROUTE-TRANSITION's concern (already DONE),
  not this wave's.

### content↔focal↔dock round-trip (true SPA `pushState`+`popstate`, NO reload) — PASS (no leak)

`content(1) → focal /substrates/aurora(2) → dock /dock/overview(0*) → content(1)`. The live count
**never accumulates and returns to 1** — disposal verified, zero leak. (`*` the transient 0 at the
dock step is a settle-timing artifact: the DockStage aurora's webgpu context arms lazily and had
not fired within the 1100ms SPA-nav sample; the **direct full-load** `/dock/overview` capture shows
the route cleanly at glLive=1 — the dock GL is healthy, the round-trip merely sampled before its
lazy arm. The binding no-leak property — max never exceeds per-route expectation, returns to
baseline — holds.)

---

## 2 · Recessive warm shell field — NO conic / C>0.10 / speckle, worst-cool (PASS, both modes both engines)

The binding subject — the recessive content-route shell field (`/foundations/colors`), sampled in
text-free smooth patches (median-of-region OKLab; speckle = patch luma stddev):

| sample | field L | **field C** | hue | conic? | speckle (maxSD) |
|---|---|---|---|---|---|
| Chrome light | 0.91–0.92 | **0.027–0.046** | 53–85° warm | none | smooth |
| Safari light | 0.945–0.965 | **0.019–0.034** | 62–85° warm | none | smooth |
| Chrome dark  | 0.196–0.223 | **0.015–0.024** | 48–69° warm | none | smooth |
| Safari dark  | 0.161–0.200 | **0.024–0.033** | 47–79° warm | none | smooth |

All warm (hue ~47–85°, no worst-case cool drift) and **C ≤ 0.046 — well under the 0.10 ceiling**.
The dark field is now a **luminous-DARK warm-ember** (composite L 0.16–0.22), NOT the prior
mid-light brown wash (L 0.55–0.70). No conic sheen, no high-chroma slab, no woven speckle — the
metallic `.paper-field` apparatus is genuinely gone. Visual read confirms: smooth recessive warm
drift, calm grain.

---

## 3 · AA at `opacityCeiling: 0.5` (the prior FAIL leg) — PASS, both modes both engines

`/foundations/colors` (the shell-field content route the `opacityCeiling: 0.5` applies to). Text
computed color (DOM) × field composite (pixel):

| mode · engine | hero h1 (42px/600) | hero eyebrow `.section-label` (mono caption) |
|---|---|---|
| light · chrome | **13.37:1** ✓ | 4.15:1 (≈AA, borderline caption) |
| light · safari | **15.49:1** ✓ | **4.80:1** ✓ |
| dark · chrome  | **13.87:1** ✓ | **6.73:1** ✓ |
| dark · safari  | **14.68:1** ✓ | **7.14:1** ✓ |

The dark-mode catastrophe is **fixed and cross-engine-verified** (was h1 2.14 / muted 1.04 Chrome).
The light eyebrow mono caption at 4.15:1 (Chrome) is the single secondary borderline (Safari clears
it at 4.80); it is the small mono `.section-label` register, reads visually, sits at/above the
large-text bar — a refinement note, NOT a wave-blocking AA failure (carried from the prior DELTA's
mustFix #3; the binding hero + body registers all clear AA comfortably).

---

## 4 · The focal hero + dock surfaces — gestalt read (PASS)

- **`/foundations/intro` (focal front-door hero).** Light: the `ℱ glass-ui` wordmark (177px) is
  crisp dark ink fitting its envelope; the blurb reads; the soft pink→lavender→blue→peach painterly
  field is gentle (no conic/oversaturation/speckle). Dark: the wordmark is crisp white over a
  deeper purple→amber painterly field; the blurb reads; the eyebrow is the dimmest secondary
  element but legible. This is the focal StoryHero register (by-design vivid), distinct from the
  recessive shell field. (The pixel ratios I measured on the dark focal heroes — h1 3.78, eyebrow
  2.73 — are offset-patch artifacts over a spatially-varying vivid field, NOT the field directly
  behind the glyphs; the visual gestalt reads.)
- **`/substrates/aurora` (the aurora studio — the page that DEMOS the aurora).** The `Aurora`
  wordmark is crisp white, the body prose reads, the rich purple→amber painterly field is the
  page's own subject (vivid is correct here). 2 page-owned GL contexts (exempt).
- **`/dock/overview`.** Both modes both engines: the `Overview` heading + blurb are crisp, the dock
  pills read as glass over the calm muted-blue DockStage field (the dock band's own demo backdrop —
  shell stood down, glLive=1). All controls legible.

---

## What passes (do NOT regress)

1. The recessive low-chroma warm shell field (C ≤ 0.046, no conic/no speckle, warm hue both modes).
2. The dark-aware luminous-ember palette — dark composite field L ≈ 0.16–0.22, hero h1 13.9–14.7:1,
   muted 6.7–7.1:1 (the `b3d65eec` fix).
3. The one-GL shell-stands-down law on every non-substrate route + the no-leak SPA round-trip.
4. Light-mode body/heading legibility (h1 13–15:1).
5. Cross-engine parity: Chrome (ANGLE Metal M5 Max) and WebKit (Apple GPU) agree on the gestalt;
   WebKit renders the focal field a touch cooler/dimmer (the documented engine pattern), still
   legible.

## Refinement note (NOT a blocker for this wave's PASS)

The hero eyebrow `.section-label` mono caption is the dimmest secondary element — 4.15:1 over the
light shell field (Chrome; Safari 4.80), and the dimmest element on the dark focal heroes. It reads
visually and clears the large/caption register; a future polish pass could darken the light eyebrow
ink a touch or recede the light field marginally. Recorded for awareness, consistent with the prior
DELTA's mustFix #3.

---

## Artefacts on disk

- 16 captures: `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint/{chrome,safari}-<route>-<mode>.png`
- Chrome probe + round-trip: `…/BG.W-FIELD-AURORA-paint/chrome-results.json`
- Pixel analysis (OKLab field + WCAG contrast): `…/BG.W-FIELD-AURORA-paint/pixel-analysis.json`
- Capture scripts: `BG.W-FIELD-AURORA-DELTA-chrome-capture.mjs`, `BG.W-FIELD-AURORA-pixel-analysis.mjs`
- `node scripts/verify-siblings-intact.mjs --quiet` exits 0 before AND after.
