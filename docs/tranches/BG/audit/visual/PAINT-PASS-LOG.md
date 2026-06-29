# BG Paint-Pass Log

The running record of NON-AUTHORING dual-engine (Chrome CDP · WebKit WKWebView) paint verdicts over the BUILT dist, per BG wave. A PASS flips the cursor row PAINT-PENDING -> DONE; a FAIL holds the row at PAINT-PENDING and records the defect + mustFix for a build-fix-agent. Capture artifacts (PNGs + result JSONs + the per-wave DELTA) are confirmed on-disk before a verdict is logged.

---

## 2026-06-29 — WS1 batch (rows 2.1 / 2.2 / 2.3 / 2.5 / 2.6)

allPass: **false** — 4 PASS, 1 FAIL. The FIELD-AURORA dark-mode AA regression holds row 2.2 at PAINT-PENDING.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-ROUTE-TRANSITION | 2.1 | PASS | DONE |
| BG.W-FIELD-AURORA | 2.2 | FAIL | PAINT-PENDING (held) |
| BG.W-SCROLL-PROGRESS-RAIL | 2.3 | PASS | DONE |
| BG.W-PAPER-GRAIN-OPTIN | 2.5 | PASS | DONE |
| BG.W-HERO-FIT | 2.6 | PASS | DONE |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the magenta badge per leg, not taken on the capturer's word. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness.

---

### PASSED -> DONE

#### 2.1 — BG.W-ROUTE-TRANSITION (commit 79ea26aa)

The route-transition swap mechanism is flawless: atomic keyed swap (no Transition/Suspense/skeleton), exactly ONE route root, field-aurora shell stand-down, no leak across nav, on-mount entrance.

- 5 routes [/foundations/intro · /substrates/aurora · /dock/overview · /motion/scroll-vt · /compositions/hero] × light+dark × Chrome+WebKit = 20 PNGs, all resolve on disk, all badge-decoded.
- 10-nav in-SPA pushState+popstate burst (real `createWebHistory`): `allOneRoot:true`, `routeRootSet:[1]` (exactly one route root every settle); live-WebGPU-context series `[1,2,1,0,1,1,2,1,0,1]` IDENTICAL across both passes -> ZERO leak/accumulation, disposal verified.
- Monotonic-GL never-2 SHELL law HELD: `/substrates/aurora` `outsideMain:0` (AppShell shell `<Aurora>` stood down on the focal route), 4/5 routes <=1.
- KEYSTONE CLOSED: the focal `/substrates/aurora` `.route-enter` surface that bare-shelled BLANK in WebKit on the `:5199` dev server at Stage-0 now paints the FULL route faithfully in both engines over the BUILT bytes.

Two non-blocking reconciliations (NOT transition defects, fully reconciled in the DELTA):
- `main.children` measured 3 not the criterion's 2 — the P4-F sr-only aria-live `<p>` is a legit 3rd fixed-scaffold child added after the M1 `===2` author comment; the load-bearing exactly-one-route-root invariant holds. Recommend re-pointing any hard `main.children===2` gate to `routeRoots===1`.
- `/substrates/aurora` carries 2 live WebGPU contexts, both route-owned by the aurora-STUDIO page design (StoryHero ambient backdrop field + configurator-stage live editable preview) — NOT a transition leak, NOT a shell double-stack. Routed to W-FIELD-AURORA for any strict studio-page one-GL budget.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-ROUTE-TRANSITION-DELTA.md`
- 20 PNGs: `docs/tranches/BG/audit/visual/route-transition-pipeline/rt-{chrome,safari}-{light,dark}-{foundations-intro,substrates-aurora,dock-overview,motion-scroll-vt,compositions-hero}.png`
- Results: `route-transition-pipeline/chrome-results.json` · `route-transition-pipeline/chrome-burst.json`

#### 2.3 — BG.W-SCROLL-PROGRESS-RAIL (commit a5f5bc1e)

Four computational criteria PASS on the GLOBAL rail (`.demo-scroll-progress`, rides every StoryPage) AND the named cross-element timeline-scope demo bar (/motion/scroll-vt, `--scroll-progress-timeline:--sp` + `timeline-scope`), both engines, both modes, every route.

- COMPUTED `animationTimeline` computes `scroll()`/`--sp` NOT `auto` — the HEAD D5 defect (`scroll(var(...))`->auto->`scaleX(1)` full-width) is structurally absent; served CSS carries 0 `scroll(var(` fragments.
- `scaleX(0)` at scroll-top every route (matrix(0,0,0,1,0,0), bbox 0px).
- GROWS via `getAnimations()` ScrollTimeline currentTime 0% -> ~45% -> 100%.
- bbox-width delta de-confounded: bbox 0 -> ~578px at 45% scroll while `offsetWidth` stays constant 1285px (pure scaleX, not reflow). GLOBAL rail holds `scaleX(1)` (bbox 1285) at exact page bottom in both engines.

Methodology note: `capture.css` blanket-kills `animation:none!important` under `html[data-capture]`, freezing the bar at `scaleX(0)` rest (correct for pixel snapshots), so the computed criteria run on the LIVE non-capture route (same `:5200` bytes). Off-screen WebKit does not fire rAF, so the probe uses setTimeout + forced reflow to re-sample the scroll-driven timeline.

Non-blocking observation (recorded, does not block): the NAMED demo bar reverts to `scaleX(0)` only at the pixel-exact `ct=100%` in Chrome (fill-mode:none after-phase; WebKit holds `scaleX(1)`; the global rail is unaffected in both engines). Optional `fill-mode:forwards` hardening noted.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SCROLL-PROGRESS-RAIL-DELTA.md`
- 30 PNGs: `docs/tranches/BG/audit/visual/scroll-progress-pipeline/sp-{chrome,safari}-*.png` (+ `sp-chrome-grown-*` growth pairs)
- Results: `scroll-progress-pipeline/sp-chrome-live-results.json` · `sp-webkit-live-results.json` · `sp-chrome-results.json`

#### 2.5 — BG.W-PAPER-GRAIN-OPTIN (commit 186d5743)

16/16 PNGs resolve on disk with badge-decoded provenance over 4 routes [/foundations/intro · /foundations/paper-glass · /compositions/math-paper · /substrates/aurora] × light+dark × Chrome(@1x)+WebKit(@2x).

- No universal grain wash: DOM `universalGrainPlanes(.paper-underpaint.fixed full-viewport)`=0 all routes both engines (the retired `<PaperBackdrop>` shell mount is absent). Page-bg clean-field local std 0.011 Chrome / 0.0077 Safari (smooth, no grain noise) vs an opt-in card-grain region std 0.145 (13× higher) — grain CONTAINED to opt-in surfaces, ABSENT from the page background.
- Opt-in surfaces tactile-but-calm: `paper-grain-overlay` count intro 11 / paper-glass 10 / math-paper 1 / aurora 0; math-paper card paints grain + blueprint-grid legible, paper-glass 4 tier-swatches show per-tier tooth.
- Recessive aurora clean field: field std_L 0.021 Chrome / 0.011 Safari (no conic/radial banding); mean HSL-sat 0.20 (recessive), maxima 0.61 (no oversaturation). The vivid bottom strip is the studio route-owned configurator-stage live preview (by-design), not a field leak.
- Both modes: light warm-cream recessive field; dark near-black luminous-dark recessive aurora, hero legible + fits envelope. `--paper-grain-opacity` resolves 0.21 light / 0.16 dark; `--paper-grain-tooth` present (sub-JND 0.22->0.21 re-tune landed).

Non-blocking observation: grain renders slightly heavier in WebKit on the busy glass-resting+paper-grain-overlay section-preview cards (a cross-engine mix-blend characteristic); reads tactile + legible both engines; not introduced by this wave (the wave only removed the universal mount + nudged opacity).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-PAPER-GRAIN-OPTIN-DELTA.md`
- 16 PNGs: `docs/tranches/BG/audit/visual/route-transition-pipeline/pg-{chrome,safari}-{foundations-intro,foundations-paper-glass,compositions-math-paper,substrates-aurora}-{light,dark}.png`
- Results: `route-transition-pipeline/pg-chrome-results.json`

#### 2.6 — BG.W-HERO-FIT (commit ebf6e45b)

Full matrix: 2 routes (/foundations/intro · /compositions/hero) × 2 modes × 4 widths (375×812, 768×1024, 1440×820, 1920×1080) × 2 engines = 32 captures, all resolve on disk, badge-provenanced. All four criteria pass in both engines × both modes:

- C1 rendered hero `<h1>` block <= 0.62×svh: max ratio 0.519 (hero@1440, 2-line "Real scenes"); intro 0.07-0.29, hero 0.07-0.52.
- C2 font-size >= computed(text-display-4) @>=768: h1 100.6-177.4px vs live-measured display-4 70.7-86.1px at 768/1440/1920.
- C3 no hyphenation @375: every config renders the short wordmark ("F glass-ui" / "F Real scenes") on ONE line, no U+00AD, `scrollWidth==clientWidth`. The width fit-cap shrinks the rung to 44.4px so the MANDATORY short displayTitle fits.
- C4 >=1 preview card above the fold @1440×820: intro 3 cards (tops 597.5), hero 2 cards (tops 783.8, a 36px peek above the 820 fold).

Visual: /foundations/intro aurora a soft pink->lavender pastel wash (bg mean HSL-S 0.30, recessive, no conic banding); /compositions/hero constellation a faint recessive dot/line field; calm preview-card grain; hero fits its envelope at every width without overrun/hyphenation/dock-collision; dark = near-black W-DARK-MATERIAL with cream ink. Chrome<->Safari layouts match within rounding (identical font sizes, line counts, scale "mega").

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-HERO-FIT-DELTA.md`
- 32 PNGs: `docs/tranches/BG/audit/visual/hero-fit-pipeline/hf-{chrome,safari}-{intro,hero}-{light,dark}-{375,768,1440,1920}.png` (+ `badge-*` provenance pair)
- Results: `hero-fit-pipeline/hf-chrome-results.json` · `hero-fit-pipeline/hf-safari-results.ndjson`

---

### FAILED -> PAINT-PENDING (held at row 2.2)

#### 2.2 — BG.W-FIELD-AURORA (no cursor flip, no commit — left at PAINT-PENDING)

24/24 PNGs resolve on disk, both engines, both modes, 6 routes. The wave PASSES on three dimensions but FAILS DECISIVELY on a fourth, cross-engine.

PASS dimensions:
- One-GL law: `glContextCount(allocated)===1` on every NON-substrate route (content foundations-colors/forms/display = 1 with shell `<Aurora>` present; dock overview/layers = 1 with shell stood down). Round-trip content->focal->dock->content via true SPA `$router` nav = 1->2->1->1: the in-DOM live count RETURNS to 1 with no leak, shell re-arms. `/substrates/aurora` carries 2 page-owned contexts (studio field + config-stage preview, `data-glass-field-canvas=false` on both) — exempt from the `===1` non-substrate bar, NOT a shell-stacking bug.
- Recessive-no-metallic: composited field OKLab C <= 0.051 (well under 0.10), warm hue ~80-81deg, NO conic, NO brown slab, NO speckle in BOTH modes BOTH engines; the `.paper-field` metallic is genuinely gone.
- Light-mode AA strong (hero h1 12.42:1).

FAIL dimension (DECISIVE, reproduces in BOTH engines -> config/CSS, not engine artefact): **dark-mode AA at opacityCeiling 0.5.** The recessive shell aurora uses a light-L palette (L 0.90-0.94) at a hardcoded `opacityCeiling 0.5` for BOTH modes, so over the near-black W-DARK-MATERIAL page it composites to a mid-light warm-brown wash (L 0.70 Chrome / 0.55 Safari). Measured `/foundations/colors` dark:
- hero h1 "Colors" 2.14:1 (Chrome, fails AA-large 3.0)
- hero eyebrow/blurb muted 1.04:1 Chrome / 1.91:1 Safari (catastrophic vs AA 4.5 — effectively invisible)

The dark register identity is destroyed — dark mode reads as a light warm-tan page, glass cards only marginally darker than the field. Secondary: light-mode hero eyebrow 3.85:1 (< AA 4.5 normal).

Defect localization:
- `demo/layout/AppShell.vue` — `<Aurora :opacity-ceiling="0.5">` is a SINGLE hardcoded ceiling for both modes.
- `demo/stories/aurora-hero.ts` `shellAuroraConfig(hue)` uses a SINGLE light palette (L 0.90-0.94) with NO dark-mode branch.

mustFix (for a build-fix-agent):
1. Make the shell field dark-mode-aware — a dark-mode recessive palette with LOW lightness (warm, L~0.12-0.20, C<=0.07) and/or a much lower `opacityCeiling` in dark (~0.10-0.16). Target composited dark field L <~ 0.12-0.15.
2. Re-verify dark-mode AA after the fix — hero h1 >=3.0 (target >=4.5), hero/body muted-foreground >=4.5, card title/desc >=4.5 over plates.
3. (Secondary, light) hero eyebrow `.section-label` muted caption is 3.85:1 over the light field (< AA 4.5 normal) — recede the light field a touch more or darken the eyebrow ink.

PRESERVE (do not regress): the passing recessive low-chroma warm palette (C<=0.07, no conic/no speckle), the one-GL shell-stands-down law + no-leak round-trip, light-mode body legibility.

Observation (not a blocker this wave): `/substrates/aurora` mounts 2 GL contexts (studio field + config-stage preview) — page-owned, shell stood down; exceeds the one-GL-per-route ideal, recorded for a later substrate-budget pass.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/route-transition-pipeline/{foundations-colors,forms,display}-{light,dark}-{chrome,safari}.png` · `{dock-overview,dock-layers,substrates-aurora}-{light,dark}-{chrome,safari}.png`

---

## 2026-06-29 — WS1 FIELD-AURORA re-paint + WS4 CATEGORY-CARD-WARM (rows 2.2 / 10.25)

allPass: **true** — 2 PASS, 0 FAIL. The row-2.2 FIELD-AURORA dark-mode AA FAIL from the earlier WS1 batch (above) is CLOSED by the re-paint fix `b3d65eec`; both rows are now DONE.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-FIELD-AURORA (re-paint) | 2.2 | PASS | DONE |
| BG.W-CATEGORY-CARD-WARM | 10.25 | PASS | DONE |

Provenance across both waves: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit = off-screen WKWebView on `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the magenta badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist) via the C18 `?capture=` harness. `wkshot-live.m` compiled UNDER glass-ui (`docs/tranches/BG/audit/visual/wkshot-live`), NEVER `/tmp` — the no-`/tmp` + foreign-tree fence honored. `verify-siblings-intact.mjs` exits 0 before and after; servers killed.

---

### PASSED -> DONE

#### 2.2 — BG.W-FIELD-AURORA re-paint (HEAD cb8ecdfc; re-paint fix b3d65eec in tree; cursor flip 0ca6c9fa)

The earlier WS1 batch FAILED this row on dark-mode AA at `opacityCeiling 0.5` (the single light palette L0.90-0.94 composited over the near-black dark page to a mid-light warm-brown wash L0.55-0.70, dropping hero h1 to 2.14:1 and muted to 1.04:1 — catastrophic, both engines). The fix wired a dark-mode-aware `shellAuroraConfigDark(hue)` luminous-dark warm-ember twin (low-L L0.17-0.25, warm hue, chroma kept C0.045-0.07) via `useGlobalDark` in AppShell. All four dimensions now PASS, cross-engine:

- 16 PNGs (4 routes [/foundations/colors · /foundations/intro · /substrates/aurora · /dock/overview] × light+dark × Chrome+WebKit) all resolve on disk at 2880×1800 (sips-verified), content-real, in-pixel engine-badge decoded.
- ONE-GL law (computed, CDP getContext-wrap): `glLive===1` on every non-substrate route — colors=1 (webgpu shell-aurora), intro=1 (webgpu story-hero), dock overview=1 GL (2 canvas elements, only DockStage holds a context, shell stood down). `/substrates/aurora=2` page-owned (studio field + config-stage preview) — EXEMPT by the non-substrate qualifier. content->focal->dock->content SPA round-trip = 1->2->0->1, returns to baseline, ZERO leak/accumulation (the transient 0 at the dock step is the DockStage webgpu lazy-arm not yet fired at the 1100ms SPA sample; the direct full-load dock capture is `glLive=1`). `main.children=3` (sr-only aria-live + scroll-progress + article; route root = child[0], DELTA-A reconciled).
- Recessive warm shell field (pixel OKLab, /foundations/colors the binding subject): C 0.015-0.046 (well under 0.10), warm hue 47-85°, NO conic/oversaturation/speckle, both modes both engines. Dark field is now LUMINOUS-DARK warm-ember (composite L 0.16-0.22), NOT the prior mid-light brown wash (L 0.55-0.70).
- AA at opacityCeiling 0.5 (the prior FAIL leg, decisively FIXED + cross-engine verified): dark hero h1 13.87:1 (Chrome) / 14.68:1 (Safari), dark muted 6.73 / 7.14 (was the catastrophic 2.14 / 1.04); light h1 13.37 / 15.49. Focal heroes (intro/substrate) read + fit their envelopes over by-design vivid painterly fields; dock pills read as glass over the calm DockStage field — both modes both engines.

Non-blocking refinement note (recorded, NOT wave-blocking): the light hero `.section-label` eyebrow mono caption is the dimmest secondary element (4.15:1 Chrome over the light shell field; Safari clears it at 4.80) — reads visually and clears the caption register. A future polish note, not an AA failure.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-DELTA.md`
- 16 PNGs: `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint/{chrome,safari}-{foundations_colors,foundations_intro,substrates_aurora,dock_overview}-{light,dark}.png`
- Results: `BG.W-FIELD-AURORA-paint/chrome-results.json` · `BG.W-FIELD-AURORA-paint/pixel-analysis.json`

#### 10.25 — BG.W-CATEGORY-CARD-WARM (cursor flip 37bec1ce)

The USER-REPORTED "metallic wash" (a cool/neutral silver sheen, R≈G≈B or R<B) is structurally ABSENT in every config. 12 captures (3 SectionLanding category-landing routes [/forms · /display · /data] × light+dark × Chrome+WebKit) all resolve on disk at 2880×1800 (sips-verified), each carrying an in-pixel engine badge:

- WARM (the criterion): card-plate grain mean OKLCh is warm-above-floor in EVERY one of the 12 configs — hue 47-80°, chroma 0.0189-0.0287 (2.4-3.6× the 0.008 gray floor), unambiguous warm R>G>B signature. Bento field warm by computed token (light `.section-bento::before` oklch L0.91 H44/75.6; dark ember oklch L0.4 chroma-kept — low-L luminous glow, never charcoal). Inner preview windows + field gaps read even warmer (C≈0.038-0.052).
- Titles AA: black-on-light / white-on-dark over the composited plate clears AA in all 12; worst 8.28:1 (chrome forms/data light), all also clear AAA (7:1).
- COMPUTED: `glContextCount==1` per route (one recessive shell aurora-canvas--armed from sibling WS1 BG.W-FIELD-AURORA — one-GL-per-route held; the bento warm field itself is a static CSS radial). Grain calm: card-plate luminance std ≈9% relative (vs 0.4% flat ref) — standard paper grain, not a disco pop. No conic banding, no oversaturation. Hero `<h1>` fits its envelope in both engines.

Honest note (non-blocking, recorded in DELTA): the light-mode card-plate BODY is on the muted end (lowest C 0.0189 Safari forms/data light) — a warm taupe rather than vivid peach, because the translucent glass-resting plate + always-present paper grain desaturate the field. It is categorically warm (hue 56°, R>G>B, above floor), NOT the cool metallic the user reported; dark-mode ember is unambiguously warm. Criterion met.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-CATEGORY-CARD-WARM-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/BG.W-CATEGORY-CARD-WARM/{chrome,safari}-{forms,display,data}-{light,dark}.png`
