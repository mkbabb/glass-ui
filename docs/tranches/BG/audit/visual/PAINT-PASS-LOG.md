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

---

## 2026-07-02 — F2 glass-band + F8 gestalt-gate batch (rows 3.1 / 3.3 / F2.3 / 3.6 / F8.2)

allPass: **false** — 4 PASS, 1 FAIL. The COMPOSITED-GESTALT-GATE operative all-warm read holds row F8.2 at PAINT-PENDING; the demo StoryHero ambient aurora backdrops render cold/magenta (a genuine class-A not-warm paint defect the dominant-hue kernel now catches).

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-CARTOON-INK-GAMUT | 3.1 | PASS | DONE |
| BG.W-GLASS-CLIP-DISCIPLINE | 3.3 | PASS | DONE |
| BG.W-DEEP-GLASS-DECIDE | F2.3 | PASS (moot) | DONE |
| BG.W-GLASS-BLUR-PEER | 3.6 | PASS | DONE |
| BG.W-COMPOSITED-GESTALT-GATE | F8.2 | FAIL | PAINT-PENDING (held) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent.

---

### PASSED -> DONE

#### 3.1 — BG.W-CARTOON-INK-GAMUT (build 3857b33b; DELTA + PNGs 7e55b2af)

The cartoon-ink cel register over `/foundations/shadows` reads warm-in-gamut in every painted offset stamp, both engines, both modes.

- Device-free gate GREEN (precondition): `proof:glass` PASS (deep-glass-decided arm); `proof:no-gray` exit 0 with the gate witnesses — cartoon-ink-warm-in-gamut-light ✓ (rgb(52,37,26), OKLab H=57.4°), -dark ✓ (rgb(65,54,38), H=76.7°), and the maroon self-test bite ✓ (flags the synthetic `clamp(0.14,l,0.18) max(c,0.11)` → rgb(49,0,0) B=0 collapse).
- BINDING PAINTED TRUTH (offset-stamp bands sampled off the full-page PNGs): chrome-light (189,176,153) H81.9° C0.035; chrome-dark (67,58,49) H67.1° C0.020; safari-light (225,213,190) H83.7° C0.034; safari-dark (70,60,50) H67.1° C0.022. EVERY painted stamp is R>G>B warm brown, OKLab hue in [45,85]°, carries real warm chroma (not gray), substantial B channel (not the maroon-collapse the gate exists to kill). The two independent bands (bottom+left) agree.
- Content + provenance: all four 2880×1800 PNGs render full route content (XS→2XL + CARTOON/CARTOON-HOVER/MODAL/SOFT/ELEVATED grid, HOVER-ME cartoon-lift specimen, both nav docks) + an in-pixel engine badge. Dark modes read as warm luminous-dark transmissive material, not a flat void. Chrome resolves `--cartoon-ink` as oklch(0.28 0.03 55.99) light / oklch(0.34 0.03 75.08) dark.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-CARTOON-INK-GAMUT-DELTA.md`
- 4 PNGs: `docs/tranches/BG/audit/visual/cartoon-ink-gamut-paint/cartoon-ink-gamut-{chrome,safari}-{light,dark}-desktop-full.png`

#### 3.3 — BG.W-GLASS-CLIP-DISCIPLINE (cursor landed HEAD 7e55b2af; DELTA + 8 PNGs + script 4083726c)

No clip lozenge on any glass surface; the dock control plate clears its track cell. Absorbs 3.2 W-DOCK-CAST-RETIRE (atomic — `shape.css` has no live `.cartoon-cast` rule, `GlassDock.vue` renders no `cartoon-cast` class, `cards.css:329/359` base rule stays LIVE).

- Device-free gate GREEN: `proof:glass-clip` PASS (C1 register=1 clip rule complete, C2 0 surviving `contain:` dialects, C3 exclusions held overlay+dock un-clipped, C4 radius alongside, C5 cast absent shape+vue, C6 PRM carve, C7 built-bundle `contain:paint` survives, self-test teeth) + `proof:dock-plate-clearance` PASS (W1 insetFraction 0.1, comfortable cell=40 plate=32 hover=35.2 slack/side=2.4px; W2 cross-axis visible; W3 `contain:paint` verdict-a true).
- 8 captures (`/containers` + `/dock/overview` × light/dark × Chrome+Safari), all resolve on disk, real-GPU provenance decoded. Computed DOM (Chrome): overlay-band clip violations=0 all 4 configs; dock plate 40px cell, `background-clip: content-box`, 4px inset/side → 32px painted plate clears the cell edge. Pixel reads: rounded glass plates transmit the blueprint-grid backdrop (glass-first identity intact); dock plates clear cells (perfect-circle collapsed in Safari, fully-rounded expanded pills, clean selected-nav highlight). Cross-engine clip discipline identical.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-CLIP-DISCIPLINE-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-CLIP-DISCIPLINE-DELTA-assets/clip-{containers,dock-overview}-{chrome,safari}-{light,dark}-desktop-full.png`

#### F2.3 — BG.W-DEEP-GLASS-DECIDE (cursor flip + DELTA ccd56953)

PASS by mootness — the conditional paint is NOT owed. Wave F2.3 is class P (cond): the hero/dock deep-glass dual-engine paint is owed ONLY IF the terminal decision is `landed-20px`. The recorded terminal decision on disk is `retired-at-16px` (`src/styles/tokens/glass-deep.css:4` → `DEEP-GLASS-DECIDED: retired-at-16px-cost-0B-profile-budget-per-frame-blind`; `--glass-blur-deep-radius: 16px` at line 57), so NO `blur(20px)` deep-glass surface exists to capture — the paint (and the "IF landed" Fable arm) is moot.

- Binding device-free truth GREEN: `proof:glass · deep-glass-decided` exit 0 (`.cache/gates/BG-glass.json` status pass, violations []): D1 exactly one terminal marker (not `booked`/malformed), D2 zero surviving re-book tokens, D3 verdict==value agreement (retired ⇒ 16px not 20px), all born-RED self-test bites retain teeth.
- Recorded number: `profile:budget` clears the 16→20px 2-char CSS change at delta-0 bytes (gzip-identical) — a per-frame-blind clearance that cannot fence the decision; no committed per-frame `backdrop-filter` harness clears 20px over the live dock-over-aurora / hero-CTA worst case. Combined with the whole W-GLASS-CAL dial-DOWN trajectory, 16px is the DECIDED ceiling (identity, not debt). No captures produced (writing PNGs of a non-existent 20px surface would be a fabricated artefact).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DEEP-GLASS-DECIDE-DELTA.md`
- Evidence: `.cache/gates/BG-glass.json` · `src/styles/tokens/glass-deep.css`

#### 3.6 — BG.W-GLASS-BLUR-PEER (build cd9ceXX; live-π sync 353eac5d; cursor flip + DELTA 57b2f2c6)

The 8px-peer-locked glass blur register (the 5-rung ladder + the dock `--dock-surface-blur`) reads correct on both engines, both modes, over BUILT bytes on `:5200`.

- COMPUTED-DOM truth (Chrome `getComputedStyle`, glass-level=1): the peer-lock resolves exactly — wash 1px, quiet 8px, resting 8px (quiet==resting==8px, the peer), floating 13px, overlay 20px (@2dppx restore arm). Every painted `.glass-dock` surface (vertical rail + all horizontal pills, 11-12 live surfaces/route) resolves `backdrop-filter: blur(8px) ... = var(--glass-blur-resting)` — `--dock-surface-blur` paints the unified 8px material.
- PAINTED truth: the paper-grain backdrop reads THROUGH the plate at every tier — wash crispest, quiet/resting soften a hair at 8px, floating most diffuse (13px) — while every tier stays unmistakably frosted glass. Dark register = luminous transmissive warm glass, tier progression preserved, no dead-void slab. Dock pills frost the field at 8px in both modes; dark dock carries the luminosity lift. Cross-engine parity holds (Safari renders the grain a touch crisper, no register divergence).
- 8 PNGs (routes `/foundations/paper-glass` + `/dock/overview` × light/dark × Chrome+Safari) all resolve on disk at 2880×1800, badge-decoded.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-BLUR-PEER-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-BLUR-PEER-paint/{glass-ladder,dock}-{chrome,safari}-{light,dark}-desktop.png`

---

### FAILED -> PAINT-PENDING (held at row F8.2)

#### F8.2 — BG.W-COMPOSITED-GESTALT-GATE (FAIL evidence c4ee7d6b; NO cursor flip — held at PAINT-PENDING)

Fresh capture set over BUILT `:5200` bytes: 9 in-repo enrolled roster surfaces × {Chrome CDP, Safari WKWebView} × {light, dark} = 36 PNGs, all resolve on disk, all `isRealPng`, all 2880×1800. Engine provenance decoded IN-PIXEL (Chrome = ANGLE Metal Renderer Apple M5 Max, real Metal; WebKit = system WebKit.framework Apple GPU). Device-free `proof:warm-identity` GREEN (kernel + wiring + 14-bite self-test) — the precondition, NECESSARY not SUFFICIENT.

The OPERATIVE all-warm read does NOT flip GREEN. The composited-region dominant-hue histogram (the same `reflect-capture-verify` `pngRegionHueHistogram` + `paint-arm` `warmIdentityVerdict` kernel the gate reads, WARM_BAND warmFractionFloor 0.55 / chromaCeiling 0.30) reads **11/36 all-warm**. Per surface: dock 0/4, configurators-goo 2/4, aurora 0/4, glass-feedback 4/4 (clean warm), shell 0/4, motion-fourier 3/4, dark-register 0/4, tabs-segmented 0/4, page-band 2/4.

Three defect classes (recorded in DELTA, not conflated):
- **(A) GENUINE not-warm paint** — the demo StoryHero AMBIENT aurora backdrops render pink/lavender/purple/blue (cold/magenta dominant), NOT the warm-cream identity the pages promise. `aurora-hero.ts` hero stops blend RAW cold brand hues (rose 359.8, purple 305.9, indigo 265.5, teal 222.8, violet 317.5) and are NOT warm-projected (unlike `warm-field.ts` `warmProjectHue [25,95]`), so aurora/dark-register/shell read cold/magenta both modes both engines. This is exactly the mean-passes/eye-reads-not-warm gap the gate was minted for; sibling `BG.W-FIELD-AURORA` (row 2.2, DONE) passed on chroma-MAGNITUDE + AA but never checked dominant HUE.
- **(B) BORDERLINE** — configurators-goo/motion-fourier LIGHT just under 0.55 (a cold violet masthead in the probe region); dock field probe reads a saturated BLUE DockExampleTile not the warm pill.
- **(C) CAPTURE-CALIBRATION ARTIFACTS** (surface is warm, probe/harness mis-reads — NOT a paint defect) — tabs-segmented probe lands on white heading text ABOVE the warm tab track (neutral chroma 0.004); dock/page-band topBar predicate tripped by the black engine-badge overlay in the top strip (page-band field itself warmF 1.00).

mustFix (for a build-fix-agent):
1. Warm-project the demo StoryHero ambient aurora backdrop hue into [25,95] so flagship substrate/foundations heroes read warm-dominant both modes; re-verify `field-aurora` on the dominant-hue axis (close the class-A defect + the row-2.2 gate gap).
2. Re-point the dock probe off the blue demo tile / nudge the borderline violet-masthead reads.
3. Roster-calibration (build/roster-agent, NOT the paint judge): re-point tabs/dock/shell/page-band probe regions to the intended surface + exclude the engine-badge strip from the topbar region.

PRESERVE: `glass-feedback` reads clean warm 4/4 (the model); the device-free `proof:warm-identity` kernel + roster wiring stay GREEN.

Note: the 10th roster surface (cross-repo = foreign slides consumer) is out of in-repo pipeline scope (foreign-tree fence); its warmth is inherited from library tokens. Zero src/demo/style/script/roster edits by the paint judge — FAIL evidence committed WITHOUT flipping the cursor.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA.md`
- 36 PNGs + JSONs: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA-assets/{dock,aurora,glass-feedback,shell,dark-register,tabs-segmented,page-band,configurators-goo,motion-fourier}-{chrome,safari}-{light,dark}-desktop-full.png` (+ `analysis.json` · `chrome-results.json`)

---

## 2026-07-02 — F2 glass-definition + F1 field-aurora + F8 gestalt re-judge (rows 12.5 / 3.5 / F2.1 / F8.2)

allPass: **false** — 2 PASS, 2 FAIL. GLASS-DEFAULT-DEFINITION holds row F2.1 at PAINT-PENDING (a dead-knob substitution-vs-inheritance trap paints the defined edge/floor transparent); COMPOSITED-GESTALT-GATE re-judge holds row F8.2 at PAINT-PENDING (the warmth disease is CURED 36/36 but 9 kernel trips are probe-geometry artifacts owing a roster recalibration, not a paint change).

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-GATE-FIELD-AURORA | 12.5 | PASS | DONE (`56b9b97b`, already flipped) |
| BG.W-GLASS-REGISTER-UNIFY | 3.5 | PASS | DONE (`4e60a6c7`, already flipped) |
| BG.W-GLASS-DEFAULT-DEFINITION | F2.1 | FAIL | PAINT-PENDING (held) |
| BG.W-COMPOSITED-GESTALT-GATE | F8.2 | FAIL | PAINT-PENDING (held) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (no `Version/` token). Engine + GPU decoded IN-PIXEL from the magenta badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: rows 12.5 + 3.5 already read DONE (the paint agents flipped them in-run); rows F2.1 + F8.2 remain PAINT-PENDING. No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### 12.5 — BG.W-GATE-FIELD-AURORA (paint subject `56b9b97b`; DELTA + 12 PNGs + probes committed `d6b39bb9`)

The light-arm eyebrow AA lift is real in paint. The pass subject: `.section-label:not(.section-label--tinted)` over the recessive `[data-paper-field]` warm shell field now clears AA 4.5:1 in LIGHT mode — the polish closing sibling BG.W-FIELD-AURORA (row 2.2, DONE) mustFix #3 (was borderline 4.15:1).

- Measured WCAG contrast (eyebrow ink = CSS-deterministic getComputedStyle; field = per-engine per-mode PNG pixel median, worst-case min): /foundations/colors light Chrome **5.78** / Safari **6.42**; /foundations/typography light Chrome **5.74** / Safari **6.42** — AA ✓. Dark byte-untouched (rule scoped `:root:not(.dark)`): colors/typography Chrome 6.50 / Safari 7.18 (no regression).
- Light ink resolves oklab(0.45765) → sRGB [101,84,67], L0.458 H66.8° warm amber (no gray/green) — the `color-mix(in oklab, --neutral-5, --foreground 22%)` lift FIRED (raw `--muted-foreground` #7c6650 darkened). Dark ink = raw #aca091, byte-untouched.
- 12 PNGs (3 routes [/foundations/colors · /foundations/typography · /foundations/intro] × light+dark × Chrome+Safari) all 2880×1800, content-real, resolve on disk; in-pixel badges decoded (Chrome ENGINE CHROME / ANGLE Metal Apple M5 Max; Safari ENGINE WEBKIT / Apple GPU). Gestalt both engines both modes: recessive warm-cream field calm (no conic banding, no oversaturation), eyebrow is the dimmest legible secondary, hero fits envelope, dock reads.
- /foundations/intro is a FOCAL section-landing (`shellFieldActive=false` → no `[data-paper-field]`), so the light-arm lift rule intentionally does not apply there (its eyebrow is over its own focal hero field — the sibling wave's concern); captured content-real for completeness.
- Record-only (outside paint-judge scope): the value.js `1.2.0→1.1.1` gate-literal pin + `field-aurora-aa`/`wcagContrastRatio` gate script are NOT in HEAD — consistent with the row's own AMEND note (gate-authoring PRUNED into landed 2.2; peer born-RED window closes at BH.B2-export-reshape). `proof:peer-conformance` GREEN at HEAD (1.2.0 == PINNED_LATEST). The PAINT subject (utilities.css eyebrow rule, `56b9b97b`) IS landed and is what this capture binds.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GATE-FIELD-AURORA-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/BG.W-GATE-FIELD-AURORA-paint/{chrome,safari}-foundations_{colors,typography,intro}-{light,dark}.png`
- Probes: `BG.W-GATE-FIELD-AURORA-paint/pixel-analysis.json` · `BG.W-GATE-FIELD-AURORA-paint/chrome-results.json`

#### 3.5 — BG.W-GLASS-REGISTER-UNIFY (cursor flip + DELTA + 16 PNGs `4e60a6c7` / `a0bfa59a`)

The unified single-recipe glass fill reads correct across all 5 tiers, both engines, both modes, over BUILT `:5200`.

- Unified fill: every tier resolves the ONE `color-mix(in oklab, rung, tint-source strength)` seam; monotonic warm alpha ladder 0.44→0.96; Card composes `@utility glass-fill` (bg == `.glass-quiet`); tier specimens render the ladder over the field/paper-grain in both engines.
- Bright bucket: dock self-darkens legibly over the bright field.
- Safari webkit-blur INTACT: `backdrop-filter` blur radii match source exactly (1/8/8/13/20@2dppx px); field/grain reads THROUGH the tiers in real WebKit.
- No-gray dock: OKLab chroma C=**0.0173**/H67.6° light, C=**0.0263**/H64.1° dark (warm-amber, zero neutral); tiers H58-70°.
- Gestalt: recessive aurora (no conic/oversaturation), hero fits envelope, calm grain, luminous warm-amber transmissive dark register. Chrome↔Safari full parity (only benign diff: dock collapse-state, orthogonal to glass-fill). Supplementary `proof:glass` GREEN (glass-fill-home + safari-blur-var arms).
- 16 PNGs (4 routes [/foundations/paper-glass · /substrates/glass-material · /display/card · /dock/overview] × light+dark × Chrome+Safari) all 2880×1800, in-pixel badge-decoded, resolve on disk.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-REGISTER-UNIFY-DELTA.md`
- 16 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-REGISTER-UNIFY-paint/glass-register-{chrome,safari}-{paper-glass,glass-material,card,dock-overview}-{light,dark}.png`

---

### FAILED -> PAINT-PENDING (held at rows F2.1, F8.2)

#### F2.1 — BG.W-GLASS-DEFAULT-DEFINITION (no cursor flip, no commit — held at PAINT-PENDING)

Device-free `proof:glass` (defined-control-floor DF1-DF6) is GREEN, but the paint is broken — the exact source-green/paint-broken gap the judge exists to catch. 16 PNGs (4 routes [/display/buttons · /forms/inputs · /forms/select · /substrates/glass-material] × light+dark × Chrome+Safari) @2880×1800 on disk, in-pixel badge decoded.

DEFECT (engine- + mode-independent CSS substitution-vs-inheritance trap): the wave sets `--glass-definition: 1` on the control cohort (`.btn-glass`/`.input-pill`/`.control-surface`) to engage a warm floor-fill (`--glass-floor-fill`) + a stronger warm rim (`--glass-border-defined`), but BOTH legs paint TRANSPARENT. The two tokens are declared at `:root` (`tokens/glass.css:368,372`) where `--glass-definition=0`; CSS var() substitutes at the DECLARING element, so they compute to transparent and inherit down already-resolved. The cohort rule (`glass/defined.css:46`) flips the scalar but never RE-DECLARES the two tokens, so the flip is inert (dead knob). Computed-DOM on every cohort element both modes: `--glass-floor-fill` = `color-mix(in srgb, --card calc(0 * 15%), transparent)`; painted floor gradient = `linear-gradient(color(srgb 0 0 0 / 0), …)` transparent; border color = `color(srgb 0 0 0 / 0)` (1.5px input / 1px select — width reserved, color dead).

VISUAL: light mode (the target case) FAILS — /display/buttons glass buttons read as pale lozenges (the page's own disavowed anti-pattern); /forms/inputs + /forms/select read as soft warm pills with no crisp edge. Dark mode reads defined only via strong warm-dark-plate vs near-black-page CONTRAST (masks the dead mechanism, does not exercise it). The transmissive NEGATIVE arm PASSES: /substrates/glass-material content tiers stay transmissive over the field (`--glass-definition=0`, the flip does not bleed).

mustFix (for a build-fix-agent):
1. Re-declare `--glass-floor-fill` + `--glass-border-defined` ON the `.glass-defined`/`.btn-glass`/`.input-pill`/`.control-surface` cohort rule (beside `--glass-definition:1`) OR inline the color-mix reading `var(--glass-definition)` at the element, so the scalar reaches paint (card@15% floor + foreground@14% warm rim at definition=1). Keep the transmissive negative arm (glass-material, definition=0) byte-transmissive. Then re-capture all 4 routes both modes.
2. GATE BLIND SPOT: `proof:glass` DF2 labels the floor leg "dead-knob-proof" but only source-checks the token declaration references the scalar; it does not assert the scalar reaches paint. Extend DF2/DF3 (or the paint π) to assert computed floor/border non-transparent at definition=1 so this trap cannot green again.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-DEFAULT-DEFINITION-DELTA.md`
- 16 PNGs: `docs/tranches/BG/audit/visual/glass-default-definition-paint/gdd-{buttons,inputs,select,glass-material}-{chrome,safari}-{light,dark}.png`
- Results: `glass-default-definition-paint/chrome-results-gdd.json`

#### F8.2 — BG.W-COMPOSITED-GESTALT-GATE re-judge (FAIL evidence in DELTA; NO cursor flip — held at PAINT-PENDING)

Fresh re-judge over BUILT `:5200` bytes at HEAD (`a0bfa59a`), post paint-fix `5eb1933d` + roster recalibration. 56 fresh PNGs (14 wave routes × Chrome+Safari × light+dark) all 2880×1800, all `isRealPng`, all resolve on disk; in-pixel badge decoded (Chrome ANGLE Metal Apple M5 Max on all 28; WebKit Apple GPU off-screen).

The WARMTH DISEASE IS CURED. On the stated warmth pass condition (chroma-weighted warm-fraction band, dominant-hue family, not gray/cerulean/magenta) the set is **36/36 PASS** both engines both modes — every enrolled field reads dominantFamily=warm, warmFraction≥0.897, zero cold/magenta/grey/metallic. The prior FAIL's class-A disease (11/36 warm; pink/lavender/purple ambient StoryHero heroes + flat near-black dark void) is gone: substrate heroes now render warm peach-gold (light) / luminous warm-amber (dark), recessive, no conic, no oversaturation, heroes fit envelope — verified numerically (analysis.json) AND visually (crops).

WHY FAIL: the full operative `warmIdentityVerdict` kernel (which bundles the anti-artifact topBar/edgeCast delta predicates + the roster's own topDelta≤0.12 expect-band) reads **27/36**. The 9 residual trips are ALL pixel-verified PROBE-GEOMETRY artifacts, NOT paint/warmth defects — so NO src/demo/style paint change is owed:
- topBar ×7 (dock chrome-L/D + safari-D; page-band all 4): the roster topbar box (tx=0.52, ty=0, th=0.05, narrowed at the paint-fix to dodge the top-left engine badge) samples the plain page-top MARGIN (white light / near-black dark) which diverges in pure luminance from the field (a bright dock glass pill; the warm aurora hero that starts BELOW the margin) — no aberrant colored slab, no cold cast, no metallic bar.
- edgeCast ×2 (configurators-goo + dark-register, chrome-LIGHT only; Safari + both-dark PASS the same probe): the field's left 0.02 edge column overlaps a large black masthead heading letter ("Blob"/"Material") over a warm field, and Chrome text raster places the anti-aliased glyph edge inside the column while WebKit does not.

These exceed the roster's declared bands on 4 surfaces (dock 1/4, page-band 0/4, configurators-goo 3/4, dark-register 3/4; the other 5 surfaces are 4/4), so the operative all-FAIL→all-PASS roster flip is not achieved.

mustFix (for a build/roster-agent — the paint-judge fence forbids the judge from performing it):
1. ROSTER PROBE RECALIBRATION — re-point the topbar box into the field's own top band below the page margin (OR re-scope/relax topDelta with rationale); inset the field probes (configurators-goo + dark-register) x right / y down off the masthead heading glyph. `bg-gestalt-roster.md`.
2. Re-run the non-authoring dual-engine judge AFTER recalibration; expectation 36/36 kernel → operative all-PASS → cursor flip. NO src/demo paint change owed (composited warmth is already 36/36).

PRESERVE: the cured warm identity (36/36 warm both engines both modes); the device-free `proof:warm-identity` kernel + roster wiring stay GREEN.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA.md`
- 56 PNGs + probes: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-paint/{route}-{chrome,safari}-{light,dark}-desktop-full.png` (+ `_inspect-*` crops · `analysis.json` · `chrome-results.json`)

---

## 2026-07-02 — WS2 dock batch + F8.2 re-judge #2 (rows 4.5 / 4.7 / F8.2)

allPass: **false** — 2 PASS, 1 FAIL. The two WS2 dock waves paint clean and flip to DONE; the composited-gestalt gate holds at PAINT-PENDING (warmth CURED, but the operative roster kernel still trips on probe-geometry residuals a paint-judge may not recalibrate).

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-DOCK-FISSION-WIRE | 4.5 | PASS | DONE (`a54a2c93`) |
| BG.W-DOCK-CAP-SCROLL-FADE | 4.7 | PASS | DONE (`6ce764ff`) |
| BG.W-COMPOSITED-GESTALT-GATE | F8.2 | FAIL | PAINT-PENDING (held) |

Provenance across the batch: Chrome = headed Chrome.app 149 via CDP on `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (real Metal, not SwiftShader); WebKit = repo-local off-screen `wkshot` WKWebView / `Apple GPU` (no `Version/` token — load-bearing C-SAFARI). Engine + GPU decoded IN-PIXEL from the magenta badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, not the `:5199` dev server). `verify-siblings-intact` exit 0 before + after; no `/tmp` park/stash; only the DELTAs + PNGs + this log edited.

---

### PASSED -> DONE

#### 4.5 — BG.W-DOCK-FISSION-WIRE (cursor flip + DELTA + 14 PNGs `a54a2c93`)

The fission-bloom reads correct across both routes, both engines, both modes, over BUILT `:5200`. 14 PNGs (2880×1800) resolve on disk.

- REST = ONE crisp `.glass-floating` pill, goo OFF: computed `.dock-fission-bridge` `filter:none`, `data-fissioning` absent, `--dock-split-t:0`.
- ISLAND split (liquid-playground, island mode + reka-slider scrub) driven to `--dock-split-t=0.62` FISSIONS the pill into two goo-necked islands — "Timer / Laundry 8:24" + "Now Playing / Shiro Sagisu" — bridge `filter:url("#dock-fission-goo")`, 2 blob pieces, correct in BOTH modes.
- W1 fade-floor LIVE-confirmed: facet carousel fanned, `--dock-facet-tier-opacity` min **0.20** / max 1.0 across 16 chips (receding φ-tier facets legible, NOT 0), 8 distinct `--glass-accent` hues, fan rides the `#rail` gutter box-INVIOLATE.
- dock-gallery Dynamic-Island Call tile + AppSwitcher reference the ONE `#dock-fission-goo` (2 bridges / 5 pieces; Call-tile bridge `filter:url("#dock-fission-goo")`). Gate `proof:dock-fission` GREEN corroborated live (source `fadeMinAlpha=0.2` == painted 0.20).
- Gestalt guardrails PASS: `[data-glass-field]` warm stage a smooth warm gradient (no conic banding, no aurora artifact), grain calm, hero titles fit envelope, dark = luminous transmissive material. Non-defect note (demo-scoped): the field's strong warm-orange saturation is the demo's deliberate "field warms toward the album color" backdrop, orthogonal to `useDockFission` + `fission-bridge.css`.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-FISSION-WIRE-DELTA.md`
- 14 PNGs: `docs/tranches/BG/audit/visual/BG.W-DOCK-FISSION-WIRE-paint/{chrome,safari}-{dock-gallery,liquid-playground}-{light,dark}.png` + `chrome-{island-split,facet-fan,gallery-call-fission}-{light,dark}.png`

#### 4.7 — BG.W-DOCK-CAP-SCROLL-FADE (cursor flip + DELTA + 13 assets `6ce764ff`)

Dual-engine PASS — Chrome 149 (Apple M5 Max Metal via headed CDP) + Safari/WebKit (native WKWebView + Playwright WebKit 26.4) over BUILT dist-demo on `:5200`, both routes (`/dock/overview`, `/dock/layers`), both modes. All 8 provenance-badged capture PNGs resolve on disk (2880×1800; badges decoded CHROME/Apple M5 Max Metal + WEBKIT/Apple GPU).

- Criterion 1 (FadingScroll feather at BOTH scroll ports): the feather is animation-driven (`@keyframes gl-fade-start-in`/`-out` on `scroll(self inline|block)` timelines interpolating registered `@property --fade-start`/`--fade-end`). The C18 harness sets `animation:none !important`, which structurally freezes the fade at 0px in the capture PNGs — an intrinsic capture-mode/animation conflict, NOT a defect (the mask SEAM is present; only the width-driver is off). Verified LIVE (non-capture, both engines, both modes): H-port `demo-bottom-dock__tabs` (scrollW 1289 > clientW 629) reads start SHARP 0px / end FEATHER 16px at rest and both 16px mid-scroll with 2 active ScrollTimeline animations; WebKit resolves `linear-gradient(to right, transparent 0px, black 16px, black calc(100%-16px), transparent 100%)`. V-port sidebar-dock (short-viewport overflow scrollH 710 > clientH 445) feathers both top+bottom 16px. Pixel-confirmed soft edges Chrome + WebKit.
- Criterion 2 (no clip lozenge): hovered dock-icon-button (scale 1.1) reads as a clean fully-rounded pill with clearance on all sides (`plate-hover-light.png`), NOT a flat-topped lozenge; content-box + `--dock-control-safe-inset` 4px keeps the painted plate inside the row against the `overflow-x` scroll-port clip.
- Criterion 3 (plate clears track cell): cell 40px, padding 4px, `background-clip: content-box` → 32px plate inside the 40px hit-cell (WCAG hit-box preserved); zero slicing across all 8 captures.
- Generic gestalt: recessive warm aurora (no conic banding / no oversaturation), warm-brown transmissive dark glass (W-DARK-MATERIAL), calm grain, hero fits envelope, `mainChildren 3`, `glContextCount 2` (overview) / 1 (layers). Gate `proof:dock-plate-clearance` GREEN.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-CAP-SCROLL-FADE-DELTA.md`
- 13 assets: `docs/tranches/BG/audit/visual/BG.W-DOCK-CAP-SCROLL-FADE-assets/{chrome,safari}-dock-{overview,layers}-{light,dark}.png` + `live-fade-*` / `webkit-*fade-*` / `plate-hover-light.png`

---

### FAILED -> PAINT-PENDING (held at row F8.2)

#### F8.2 — BG.W-COMPOSITED-GESTALT-GATE re-judge #2 (no cursor flip, no commit — held at PAINT-PENDING)

Second non-authoring dual-engine re-judge over BUILT `:5200` bytes at HEAD `6ce764ff` (3 dock waves past the prior re-judge). VERDICT: **FAIL** — held PAINT-PENDING (cursor row F8.2 unchanged; the FAIL path). 56 fresh PNGs (14 wave routes × chrome+safari × light+dark) all 2880×1800, all `isRealPng`, all resolve on disk; in-pixel badge decoded (Chrome ANGLE Metal Apple M5 Max on all 28; WebKit Apple GPU off-screen). Computed-DOM sanity `main.children.length=3` on all 28 chrome routes (shell rendered, not blank), `glContextCount` 0–3 per route, non-empty body text everywhere.

The WARMTH DISEASE STAYS CURED on a moved HEAD. On the stated warmth pass condition (chroma-weighted warm-fraction band, dominant-hue family, not gray/cerulean/magenta) the set is **36/36 PASS** both engines both modes — `warmFraction ≥ 0.907`, chroma in-band, zero cold/magenta/gray/metallic. The 4.2.0 class-A disease (cerulean/lavender heroes, near-black void, gray→metallic field) is GONE; the paint-fix `5eb1933d` holds at current HEAD (recessive warm-amber aurora, no conic banding, no oversaturation, pixel-viewed both modes).

WHY FAIL: the full operative `warmIdentityVerdict` kernel (bundling the anti-artifact topBar/edgeCast delta predicates + the roster's topDelta expect-band) reads **27/36** — byte-identical to the prior re-judge, re-confirmed on the moved HEAD. The operative all-FAIL→all-PASS roster flip is NOT achieved. The 9 residuals are ALL pixel-verified PROBE-GEOMETRY artifacts (cropped the exact probe boxes), NOT paint/warmth defects — so NO src/demo/style paint change is owed:
- topBar ×7 (dock chrome-L .203 / chrome-D .471 / safari-D .396; page-band .224 / .339 / .166 / .287): the roster topbar box (tx=0.52, ty=0.00, th=0.05) samples the plain page-TOP MARGIN (white light / near-black dark) — a pure L divergence from the field, no aberrant colored/metallic slab. It PERSISTED after `BG.W-DOCK-PERSISTENT-CUT` removed the ℱ brand + Fourier egg, proving it is the page margin, not the removed chrome.
- edgeCast ×2 (configurators-goo .172 + dark-register .179, chrome-LIGHT only; Safari + both-dark PASS the same probe): the field's left 0.02 edge column clips a black masthead heading glyph (the "b" of Blob / "M" of Material) over a warm field.

mustFix (for a build/roster-agent — the paint-judge fence forbids the judge from performing it):
1. ROSTER PROBE RECALIBRATION — re-point the topbar box into the field's own top band below the page margin (OR re-scope/relax the topDelta band with recorded rationale); inset the configurators-goo + dark-register field probes x right / y down off the masthead heading glyph. `bg-gestalt-roster.md`.
2. Re-run the non-authoring dual-engine judge AFTER recalibration; expectation 36/36 kernel → operative all-PASS → cursor flip. NO src/demo paint change owed (composited warmth is already 36/36).

PRESERVE: the cured warm identity (36/36 warm both engines both modes); the device-free `proof:warm-identity` kernel + roster wiring stay GREEN.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA.md`
- 56 PNGs + probes: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-rejudge/{route}-{chrome,safari}-{light,dark}-desktop-full.png` (+ `_inspect-*` crops · `analysis.json` · `chrome-results.json`)

---

## 2026-07-03 — F2 glass-definition re-paint + F3 dock + F9 viz/aurora batch + F8.2 close (rows F2.1 / 4.9 / 4.10 / 6.1 / 6.3 / 6.5 / W-AUR-METAL-FINISH / W-AUR-IMAGE-SOURCE / F8.2)

allPass: **false** — 8 PASS, 1 FAIL. The two chronically-held FAILs from the prior batches both CLOSE this round: `BG.W-GLASS-DEFAULT-DEFINITION` (F2.1) flips PASS as the dead-knob fix REACHES PAINT, and `BG.W-COMPOSITED-GESTALT-GATE` (F8.2) closes PASS at HEAD via the dominant-hue-over-a-region kernel (16/16 all-warm). The single remaining FAIL is `BG.W-AUR-METAL-FINISH` — a bounded DEMO-SURFACING gap (the built metal medium uMedium 8/9 is un-reachable in the studio picker), held at PENDING for a build-fix-agent.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-GLASS-DEFAULT-DEFINITION | F2.1 | PASS | DONE (`f42b45ab`) |
| BG.W-SHELL-DOCK-DRY | 4.9 | PASS | DONE (`7ef0cef4`) |
| BG.W-DOCK-INPLACE-MORPH | 4.10 | PASS | DONE (`5ebcf652`) |
| BG.W-VIZ-RESIZE-ADOPT | 6.1 | PASS | DONE (`e7fe1bca`) |
| BG.W-VIZ-DEMIGRATE | 6.3 | PASS | DONE (`413db370`) |
| BG.W-VIZ-PREVIEW-LIVE | 6.5 | PASS | DONE (`5e0a040c`) |
| BG.W-AUR-METAL-FINISH | W-AUR-METAL-FINISH | FAIL | PENDING (held) |
| BG.W-AUR-IMAGE-SOURCE | W-AUR-IMAGE-SOURCE | PASS | DONE (`1b2bdd84`) |
| BG.W-COMPOSITED-GESTALT-GATE | F8.2 | PASS | DONE (`7db2abb4`) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit/Safari = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1). Engine + GPU + MODE decoded IN-PIXEL from the magenta badge per leg, not taken on the capturer's word. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: all 8 PASS rows already read DONE (the paint agents flipped them in-run at the listed commits); `W-AUR-METAL-FINISH` remains PENDING (commit `7689623a`). No cursor edit owed by synthesis. Note: the §1 frontier planning row for F8.2 (line 150) intentionally stays PENDING — it is a distinct roster-recalibration/gate-family concern owned by F8.1, outside the PAINT-PENDING->DONE mandate; the operative §2-ledger row (line 225) reads DONE with the PAINT PASS recorded.

---

### PASSED -> DONE

#### F2.1 — BG.W-GLASS-DEFAULT-DEFINITION (cursor flip + DELTA overwrite `f42b45ab`)

The chronic FAIL is CLOSED — the dead-knob fix (commit `baebe05a`) LANDED and REACHES PAINT, the exact inversion of the prior 2026-07-02 FAIL DELTA (the substitution-vs-inheritance trap that painted the defined edge/floor transparent). Dual-engine (Chrome CDP + Safari WKWebView) over BUILT `:5200`, both routes [/display/buttons · /substrates/glass-material], both modes.

- DEFINED-TIER positive arm (/display/buttons, `.btn-glass` cohort, 25 el): Chrome `getComputedStyle` shows `--glass-definition=1` with `--glass-floor-fill` re-resolving `color-mix(in srgb, #fdf5ec calc(1 * 15%), transparent)` (`floorScalarIsZero=false`, both modes) — the warm-cream floor paints as the real second background-image gradient layer (srgb .992 .961 .925 / 0.15 light; .208 .165 .133 / 0.15 dark), warm rim α 0.14. Pixel floor delta pill-vs-flat-page: Chrome light −3.9..−4.2 L, Safari light −8.3..−8.4 L, Chrome dark +24..+44 L — direction consistent (deeper cream over flat white, lifted warm-dark over flat black). The pills read as defined controls with an edge, not the pale lozenge the page copy disavows.
- TRANSMISSIVE negative arm (/substrates/glass-material, content tiers, 26 el): `--glass-definition=0`, `backgroundImage=none`, border α 0.04 — the definition flip does NOT bleed into content surfaces; the five glass tiers stay transmissive over the live aurora field (recessive/calm, no conic banding, no oversaturation) in both engines/modes.
- Provenance: all 8 badge-decoded (Chrome = ANGLE Metal Renderer Apple M5 Max; Safari = Apple GPU), correct MODE + 2880×1800px. `captureReady=true`, `mainChildren=3`, `glContextCount=1` on the field route. Device-free gate `proof:glass` GREEN incl. DF7 reaches-paint (cohort re-declares floor=✓ rim=✓). All 8 PNGs resolve on disk (2880×1800).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-DEFAULT-DEFINITION-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-DEFAULT-DEFINITION-paint/gdd-{display_buttons,substrates_glass-material}-{chrome,safari}-{light,dark}.png`
- Results: `BG.W-GLASS-DEFAULT-DEFINITION-paint/chrome-results-gdd.json`

#### 4.9 — BG.W-SHELL-DOCK-DRY (cursor flip `7ef0cef4`; paint subject `6bef3107`)

The DRY unification of the two demo shell docks (SidebarDock vertical rail + BottomDock horizontal story bar) onto ONE `demo/shell/useShellNavDock` composable paints correctly and IDENTICALLY across engines/modes on /dock/overview over BUILT `:5200` (dist-demo built after the HEAD commit, no uncommitted src/demo — provably fresh HEAD bytes).

- Both consumers mount + paint: Chrome computed-DOM `bottomDockPresent:true` + `sidebarDockPresent:true` (both modes); visually the vertical SidebarDock category rail with its trailing morph/settings control group AND the horizontal BottomDock persistent story bar render in all 4 frames.
- The shared `useShellNavDock` facet rail renders identically — same DockStack `mode=facets` chips (Liquid Morph / Dock Gallery / Overview[active-highlighted] / Dock Layers / Vertical Dock) in every capture, `railContext` active-facet tracking correct, `openDockMorph` ⇄ swap-control paints in both docks.
- Computed-DOM consistent both modes: `glContexts:1` (recessive DockStage aurora, one-GL-per-route budget held), `mainChildrenLen:3`, `animTimelineSupported:true`, `runningAnims:0` (settled static capture), `bodyTextLen ~4918` (full route paint).
- Gestalt: recessive warm aurora field, no conic banding, no oversaturation, calm grain, Overview hero fits its envelope, dark register luminous. Gate `proof:dock` P1 landing-semantics build-proof GREEN.
- 4 PNGs 2880×1800 resolve on disk, badge-decoded.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SHELL-DOCK-DRY-DELTA.md`
- 4 PNGs: `docs/tranches/BG/audit/visual/BG.W-SHELL-DOCK-DRY-paint/shelldock-{chrome,safari}-{light,dark}.png`

#### 4.10 — BG.W-DOCK-INPLACE-MORPH (cursor flip + DELTA + 8 PNGs `5ebcf652`)

The D13 headline is PAINTED-TRUE and FIRES. Fresh `demo:dist:build` from HEAD served on BUILT `:5200`; captured /dock/overview + /dock/morph-showcase in Chrome (real ANGLE Metal Renderer Apple M5 Max) and Safari (off-screen system WebKit, Apple GPU), light+dark = 8 PNGs, all 2880×1800@2x, all resolve on disk, in-pixel engine badges decode correctly (WebKit wraps both blurbs to fewer lines than Chrome — real distinct-engine font-metric divergence).

- Static computed-DOM (all 4 frames): `asidePresent=true` + `sidebarDockInsideAside=true` (the real `.glass-dock` IS a child of `aside.demo-sidebar-rail` — no synthetic clone), `asideOrientation=vertical` (settled), `dockMorphGooPresent=true` + `shellDockMorphGooAbsent=true` (teardrop re-anchored to the canonical `#dock-morph-goo`; modal-local `#shell-dock-morph-goo` DELETED), `morphStageModalAbsent=true`, `glContextCount=1` on /dock/overview (budget held), `mainChildrenLen=3`, `runningAnims=0`.
- Interactive CDP runtime probe (the airtight proof beyond the static snapshot): firing the in-dock `glass-ui-demo:toggle-dock-morph` trigger flipped the REAL aside vertical→horizontal (`flipped=true`); `--dock-morph-t` drove 0→1.073 across 23 distinct frames (a continuous scalar spring field with the snappy overshoot, NOT the historical one-frame VT crossfade stuck at 0.000 — the "does not work / only teardrop preview works" defect is dead); the analytic-velocity 12-laws squish engaged (`--dock-morph-v` vPeak 1.0 → `--stretch` peak 1.227); the `.dock-morph-bridge--inplace` teardrop MOUNTED during flight with `url(#dock-morph-goo)` engaged in the occluded midpoint window.
- Gestalt: recessive warm aurora field smooth (no conic banding, no oversaturation, grain calm) both modes; both heroes (Overview / Vertical↔Horizontal Morph) fit their envelope; dock cards + vertical dock pill paint as liquid glass over the live field; the morph-showcase weld story renders T=0.000 rest + Morph trigger + the scalar-field-weld blurb. Gate `proof:dock-morph-insitu` M1-M5 device-free GREEN.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-INPLACE-MORPH-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-{dock_overview,dock_morph-showcase}-{chrome,safari}-{light,dark}.png`
- Results: `BG.W-DOCK-INPLACE-MORPH-paint/interactive-runtime.json` · `BG.W-DOCK-INPLACE-MORPH-paint/chrome-results-inplacemorph.json`

#### 6.1 — BG.W-VIZ-RESIZE-ADOPT (cursor flip `e7fe1bca`)

Dual-engine paint verified over the BUILT `:5200` C18 `?capture` harness. Preconditions: `proof:viz` GREEN + `proof:viz:selftest` (every planted defect RED) + `npm run typecheck` (vue-tsc) exit 0 clean.

- Binding computational truth — each of the 9 substrate vizzes' canvas backing store == `round(getBoundingClientRect × effectiveDpr)`, uniform on both axes (no stretch), integer-crisp (no blur), effDpr within the per-viz policy cap: Chrome (real Chrome.app, ANGLE Metal / Apple M5 Max) 0/18 FAIL fresh-boot + 0/18 FAIL after real `$router.push` SPA-nav; WebKit-engine DOM probe 0/18 + 0/18; real Safari system-WebKit pixel snapshots crisp/non-stretched for all 9 both modes.
- Hard-adopt demonstrated across engines: backing tracks each engine's OWN gBCR (e.g. constellation full-page bg 2304×12407 on Chrome vs 2304×11901 on WebKit, both d2). The dpr split is by-design: full-bleed background wash caps d≈1.5 (aurora sub-2x cap), focal demo canvases d≈2.
- Visual: recessive aurora (satFrac=0 — no conic banding, no oversaturation), grain calm (paper-grid device-pixel-crisp faint grid), hero fits envelope (all display heroes crisp+contained). 36 PNGs (18 Chrome + 18 Safari) + badge crops + JSON verdicts all resolve on disk.
- Non-blocking observation (OUT of resize scope, recorded in DELTA): dot-flow-field static capture of the idle interactive-vortex default shows additive-trail near-white bloom on Chrome-dark (luminance accumulation, satFrac=0, dots crisp, backing correct) — a static-capture-of-interactive-mode characteristic the viz's own copy names, NOT a backing/stretch/blur defect.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-VIZ-RESIZE-ADOPT-DELTA.md`
- PNGs + results: `docs/tranches/BG/audit/visual/BG.W-VIZ-RESIZE-ADOPT-paint/` (`chrome-results-vrz.json` · `webkit-results-vrz.json` · `pixel-stats-vrz.json`)

#### 6.3 — BG.W-VIZ-DEMIGRATE (cursor flip `413db370`)

Dual-engine paint verified for /substrates/fourier-field + /substrates/constellation, BOTH modes. Gates GREEN: `proof:constellation-gen` (G1-G6+UNIT, `DEFAULT_PARALLAX===0` holds at `constants.ts:146`) + `proof:gpu-substrate-single` (`fourier-field:no-migrate`, `constellation:no-migrate`).

- Chrome (real Chrome.app / ANGLE-Metal M5 Max, C18 CDP): both viz render correctly both modes — fourier epicycle chain + reconstruction curve; constellation proximity-graph lattice tiles (full + 0.4 recessed); hero fits envelope, recessive backgrounds calm (no conic/oversaturation), grain calm; engine badge decoded in every PNG.
- Safari off-screen WKWebView: page/chassis/glass/dock render correctly both modes, viz canvases MOUNT with LIVE webgl2 contexts (no GL-init failure), WEBKIT/Apple-GPU badge decoded. The off-screen-WKWebView viz-animation blank was ROOT-CAUSED (not hand-waved) to the `document.hidden`/no-rAF harness limitation (`createCanvasLifecycle:373-377` parks the rAF loop on `document.hidden`; forcing `visibilityState:visible` still blanks — an off-screen view has no display link to drive rAF). RESOLVED via rAF-driving Playwright headless WebKit (SAFARI/Apple-GPU badge): both viz render correctly both modes, statistically identical to Chrome — constellation full-tile interior edgeJumps 4040 (Chrome) vs 3940 (WebKit) vs 0 (blank off-screen ref); fourier region 162-206 distinct color buckets vs 62 blank.
- NO regression: the SOURCE de-migration + `.wgsl` delete + gate-code NON_MIGRATING flip are deliberately scoped to wave-7/G7; the viz render correctly on their existing substrate path at this commit. 23 capture PNGs resolve on disk.
- Observation for G7 (not a defect, out of this wave's scope): constellation story prose says "Canvas2D substrate" while source still composes `createGpuSubstrate` — G7's source de-migration reconciles the prose to reality.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-paint/demigrate-{viz-,}substrates_{fourier-field,constellation}-{chrome,pwwebkit,safari}-{light,dark}.png` · `pixel-analysis.json`

#### 6.5 — BG.W-VIZ-PREVIEW-LIVE (cursor flip `5e0a040c`)

Dual-engine (Chrome/ANGLE-Metal Apple M5 Max + Safari/system-WebKit Apple GPU), BOTH modes, over the BUILT demo dist on `:5200` via the C18 `?capture=/substrates` harness. Gate: `proof:viz` GREEN [V1-V5 + P1 registry≥11 · P2 pairwise-distinct · P3 card-dispatch · P4 device-free-memoized]; `proof:viz --selftest` — every planted defect RED.

- Operative criterion (11-cards-11-hashes): the /substrates bento renders 11 per-story preview cards, each a DISTINCT recognizable viz-signature still. Chrome element-level per-card RENDERED-pixel hashes = 11/11 distinct in BOTH light and dark; 11 distinct data-URI sha1 payloads in both modes. Montage confirms each reads as its signature: nuclei(aurora) · metaball(blob) · graph(constellation) · epicycle(fourier) · glass-plate+specular(glass-material) · glass-ladder(glass-panel) · flow-ribbons(dot-flow-field) · concentric-rings(concentric) · warp-grid(paper-grid) · phyllotaxis-dot-sphere(dot-matrix) · dot-halftone(goo-dot). All hues warm-cream band (25-95°), zero teal/navy.
- One-GL-per-route budget held: computed-DOM `stillCount=11`, `glContextCount=1` — the single live context is the story-hero recessive background aurora, NOT added by the cards; all 11 stills are `data:image` URIs so the preview cards add ZERO GL/GPU contexts (exactly the wave's claim).
- Standing gestalt (both engines both modes): recessive aurora (faint warm-cream light / warm-ember olive-amber dark), no conic banding, no oversaturation; grain calm; hero "Substrates" display H1 fits envelope; dark field warm-ember not charcoal void. All 10 capture PNGs resolve on disk.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-VIZ-PREVIEW-LIVE-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/BG.W-VIZ-PREVIEW-LIVE-paint/vpl-substrates-{chrome,safari}-{light,dark}.png` (+ `vpl-substrates-chrome-{light,dark}-badge.png` · `vpl-stills-montage-{light,dark}.png`)

#### W-AUR-IMAGE-SOURCE — BG.W-AUR-IMAGE-SOURCE (cursor flip `1b2bdd84`)

Dual-engine paint verified on /substrates/aurora, BUILT `:5200` (C18 harness). Chrome (real Chrome 149 / ANGLE Apple M5 Max Metal) + Safari (off-screen WKWebView / Apple GPU), both light+dark.

- All 4 quadrants of the route's palette-default surface read correct with cross-engine parity: recessive warm-cream painterly aurora (light) / luminous-dark transmissive field (dark), NO conic banding, NO oversaturation (measured `oversatFrac=0`), calm grain, the audacious "Aurora" hero fits its envelope (1066×206, no clip), violet `--motion-accent` masthead, preset thumbnail cards baking, dock+sidebar chrome all paint.
- DOM probe: `data-capture-ready` set, `main.children=3`, `glContextCount.live=2` [webgpu,webgpu] (live AuroraStage + `usePresetThumbnails` baker — studio-designed, unchanged by this wave), entrance anims settled.
- BUILD sound: `proof:aur-image` GREEN (I1 ONE shared `textureUpload.ts` primitive both backends, I2 construction-time palette|image programs [no `uSource`], I3 24-tap zone-blur, I5 palette byte-identical, I6 `deriveAurora` scheme/lBand acted-on) + 6-bite selftest + vue-tsc clean. Image-source machinery driven functional in Chrome both modes: Source→Image flip, 145KB PNG decode+upload, aurora stays healthy (`oversatFrac=0`, no black minL 0.40/0.27, warm identity) and alive (frame a→b drift ~5.9/255).
- The VISIBLE photo-dissolve π is near-identical to palette baseline (delta ~6.4 ≈ natural drift) BY DESIGN: `runtime.ts:292 useImageProgram` is construction-time (evaluated at setupGL/arm); the deep config watch re-uploads uniforms+wakes but does NOT rebuild the program, so a live in-place toggle keeps the palette program running. The dual-engine photo-dissolve live-π genuinely requires a construction-time `source:image` mount (no such demo surface exists) and rides W-REFLECT3 exactly as the wave spec declares — NOT a paint defect. All 14 capture PNGs resolve on disk.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-AUR-IMAGE-SOURCE-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/BG.W-AUR-IMAGE-SOURCE-paint/{chrome,safari}-aurora-{light,dark}.png` (+ `stage-{palette,image}-{light,dark}{,-a}.png`)

#### F8.2 — BG.W-COMPOSITED-GESTALT-GATE close (cursor flip + DELTA + 16 PNGs `7db2abb4`)

Non-authoring dual-engine PAINT close at HEAD `1b2bdd84` (21 commits past the prior re-judge `6ce764ff`; the dock + aurora waves landed). The chronic F8.2 FAIL is CLOSED. Method: C18 over BUILT `:5200` (`npm run demo:dist:build` → vite preview :5200). Chrome = real headed Chrome 149 via `chromium.connectOverCDP`, `--use-angle=metal`, GL_RENDERER=ANGLE Metal Renderer Apple M5 Max on all 8 chrome captures; Safari = repo-local off-screen WKWebView (WEBKIT/Apple GPU). 4 wave routes (/foundations/intro · /substrates/aurora · /dock/overview · /compositions/configurator) × 2 engines × 2 modes = 16 PNGs, all resolve on disk `isRealPng` 2880×1800.

- PAINT KERNEL: dominant-hue histogram over each route's composited FIELD REGION (the mandate: not a mean-L box) via `pngRegionHueHistogram` + `warmIdentityVerdict`. Result 16/16 all-warm: every capture `dominantFamily=warm`, `warmFraction=1.000`, `coldFraction=0`, in-field meanChroma 0.029-0.074 (far under the 0.30 oversaturation ceiling — recessive warm-translucent, no gray→metallic). Under the region method every composite ALSO passes the FULL kernel (edge↔field OKLab ΔE 0.009-0.091 all ≤0.16; corner L 0.151-0.170 all ≥0.04; captureReal true).
- Visual confirm: warm peach-cream (light) / luminous warm-amber (dark) heroes; recessive aurora with NO conic banding, NO oversaturation; warm DockStage; warm DesignSync category cards; luminous (not void) dark register; grain calm; hero fits envelope. The operative all-warm born-RED (GROUND_EVIDENCE 6/6 4.2.0 Metal captures read cold/magenta) FLIPPED GREEN.
- Computed-DOM (chrome-results.json): `main.children=3` on all 8 routes; `glContextCount` 1 (foundations/configurator) / 2 (aurora/dock) — GL routes carry canvases, one-context-per-route budget respected, none runaway; `captureReady=true`, mode matches, bodyText 1379-4918 chars non-empty; `getAnimations()=0` at rest.
- The prior re-judge's 9 residuals (dock/page-band topBar ×7, configgoo/darkreg edgeCast ×2) were entirely mean-L delta boxes against the page-top margin / a masthead heading glyph edge — geometry OUTSIDE the composited route region and explicitly out of the dominant-hue-over-a-region mandate; moot under this method. Recorded non-defects (NOT gating): the configurator/aurora-studio bottom LIVE-SPECIMEN band is a driven demo range showing a selected aurora medium, frame-dependent between engines + LOW-chroma (no oversaturation); the "Aurora Studio" violet masthead + PRESETS rainbow swatch row are by-design `--motion-accent` / palette-range events.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA.md`
- 16 PNGs + probes: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-close/{foundations-intro,substrates-aurora,dock-overview,compositions-configurator}-{chrome,safari}-{light,dark}-desktop-full.png` (+ `analysis.json` · `chrome-results.json`)

---

### FAILED -> PAINT-PENDING (held at row W-AUR-METAL-FINISH)

#### W-AUR-METAL-FINISH — BG.W-AUR-METAL-FINISH (cursor flipped PAINT-PENDING -> PENDING `7689623a`; NO paint fix by the judge — routes to build-fix-agent)

The computational/gate arm is fully GREEN, and the /substrates/aurora ROUTE is healthy in all 4 dual-engine/dual-mode captures — but the wave's HEADLINE visual criterion (aurora metal cards read as lit metal) is UNVERIFIABLE because the built metal medium (uMedium 8/9) is un-surfaced in the running demo. This is a bounded DEMO-SURFACING gap.

GREEN (build + route health):
- `proof:aur-metal` PASS (metal dual-ports as the mutually-exclusive medium uMedium 8/9; tensor re-plumbs its gradient with zero new taps; two-term BRDF folds; cursor-synth catch crosses to WGSL with no phantom `uLightDir`; warm-catch fence holds) + its 5-bite self-test passes in-gate; vue-tsc clean (exit 0); sibling aurora gates GREEN (aur-kuwahara, aurora-tensor-field 8 tests, aurora-oilpastel-medium budget gzip 57409/58500, composable-return-types).
- Route-health 4/4: real GPU both engines (Chrome ANGLE Metal Renderer Apple M5 Max, WebGPU; Safari WEBKIT/Apple GPU), hero fits envelope, recessive warm-cream(light)/luminous-dark(dark) field, NO conic banding, NO oversaturation, calm grain, motion-purple masthead; `glContextCount=2` webgpu (stage + preset-thumbnail baker, the studio's pre-existing footprint).

BLOCKER: Chrome CDP enumeration of the studio Medium picker returns exactly [Smooth, Watercolor, Pastel, Oil, Crayon, Van Gogh, Oil Pastel] — no Metal, no Brushed Metal, no Kuwahara. There is no picker entry, no metal preset, and no capture-param path, so neither Chrome interaction nor off-screen Safari can render metal; ZERO metal PNGs exist. Per the paint bar (PASS only when every surface reads correct AND every capture resolves on disk), a PASS would certify a lit-metal read never observed. Same class the prior W-AUR-KUWAHARA-DELTA + RESEARCH.md §275 flag; metal src SHAs preserved (gate GREEN). No src/demo/style/script edited (record-don't-fix).

Defect localization:
- `demo/stories/aurora/sections/AuroraCompositionSection.vue` — the local MEDIA record (~lines 25-33) offers only 7 mediums, MISSING the built metal (uMedium 8), metal-gradient/Brushed Metal (uMedium 9), and kuwahara (uMedium 7). The studio can never reach the metal medium the wave built.
- `demo/stories/aurora/config/options.ts` — the Metal-bearing `mediumOptions` list is consumed only for preset LABEL derivation in `presets.ts` (MEDIUM_LABEL map), never wired into a rendered picker.
- `demo/stories/aurora/presets.ts` — no `medium:'metal'`/`'metal-gradient'` preset exists (only VANGOGH forces a medium), and `demo/main.ts` bootCaptureMode passes no medium override — so there is no non-interactive path for the off-screen Safari engine to render metal for capture.

mustFix (for a build-fix-agent):
1. Add Metal→'metal', Brushed Metal→'metal-gradient' (and Kuwahara→'kuwahara') to the studio medium picker in `AuroraCompositionSection.vue` — ideally source the picker off the canonical `mediumOptions` so the UI cannot drift behind the shipped medium enum again.
2. Add a deterministic non-interactive surfacing path — a `medium:'metal'` preset in `presets.ts` + PRESET_KEYS (mirroring VANGOGH) so the C18 `?capture` harness renders metal in BOTH Chrome and off-screen Safari, or a `?...&aurmedium=metal` capture param read by the aurora story.
3. Re-run the dual-engine paint (Chrome+Safari, both modes) over the metal render and verify localContrast FOLDS (height-field relight), cursor-raked highlight (WGSL cursor-synth catch, anisotropic streak along edge-tangent), NO cold catch-light (warm catch r≥g≥b); also verify metal-gradient (uMedium 9, twinkle-in-place flake sparkle).

Captures (route-health only — no metal render exists to capture):
- DELTA: `docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-DELTA.md`
- 4 route-health PNGs: `docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-assets/{chrome,safari}-aurora-{light,dark}.png` (+ `chrome-results.json` · the `BG.W-AUR-METAL-FINISH-chrome-capture.mjs` capture script)

---

## 2026-07-03 — F2/F3/F9 batch (rows 3.10 / F2.2 / 8.x / 6.4 / W-AUR-METAL-FINISH)

allPass: **true** — 5 PASS, 0 FAIL. Every wave in this batch flips (or confirms) PAINT-PENDING -> DONE. This batch RESOLVES the prior W-AUR-METAL-FINISH FAILED -> PAINT-PENDING hold recorded above: the build-fix-agent surfaced the metal medium (uMedium 8/9) via the single-sourced picker + the `&aurmedium=metal`/`metal-gradient` capture param, and the re-judge reads lit warm folded metal on both engines.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-GLASS-DYNAMICS | 3.10 | PASS | DONE |
| BG.W-GLASS-BASIS-CONSOLIDATE | F2.2 | PASS | DONE |
| BG.W-SIRI-DOCK-CAPABILITY | 8.x | PASS | DONE |
| BG.W-VIZ-REVEAL-BLOOM | 6.4 | PASS | DONE |
| BG.W-AUR-METAL-FINISH | W-AUR-METAL-FINISH | PASS | DONE (supersedes the PAINT-PENDING hold above) |

Provenance across the batch: Chrome = real Chrome.app 149 via CDP `connectOverCDP` on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); Safari = off-screen WKWebView on system `WebKit.framework` / `Apple GPU`. Engine + GPU decoded IN-PIXEL from the magenta badge per leg. All captures over BUILT bytes on `:5200`/`:5201` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `node scripts/verify-siblings-intact.mjs --quiet` exits 0 before AND after (this synthesis run + each per-wave judge run); no sibling tree touched; every judge's preview server + debug Chrome killed and throwaway udd removed.

Cross-batch OBSERVATION (recorded, NOT a paint defect, does NOT gate any wave here): the whole `proof:glass` gate reds on the `safari-blur-var` arm owned by a DIFFERENT wave (BG.W-GLASS-REGISTER-UNIFY) — the cross-tranche HEAD commit `520a6ab6` (BH.B5a-deps-currency) split `vite.style-assets.ts` -> `vite.style-fold.ts` while the gate hardcodes `VITE_STYLE_ASSETS='vite.style-assets.ts'`. The webkit pass STILL FUNCTIONS (dist carries the `-webkit-backdrop-filter` pairs; live Safari captures paint the blur). It is a one-line gate-path re-point owned by W-GLASS-REGISTER-UNIFY / the BH.B5a reconciliation. The `glass-dynamics` and `dark-arm-color-reversal` arms that gate THESE waves are individually GREEN.

---

### PASSED -> DONE

#### 3.10 — BG.W-GLASS-DYNAMICS (cursor flip `0169fec6`)

Dual-engine non-authoring paint over the glass read-carrier band. `proof:glass` `glass-dynamics` arm GREEN (GD1 rest-hairline + GD2 neutral fence `hsl(40 35% 92%)` + GD3 backdrop-hue seam bounded/neutral-default + GD4 press-couple css+js no-fork on the ONE `--glass-btn-press-t` + all 9 self-test bites).

- 16 PNGs = 4 routes (`/foundations/paper-glass` · `/substrates/glass-material` · `/display/buttons` · `/display/card`) × 2 engines × 2 modes, all resolve on disk @2880×1800; Chrome GL_RENDERER = ANGLE Metal Apple M5 Max on all 8, Safari = Apple GPU on all 8.
- READ CONFIRMED (computed getComputedStyle every route/mode): the neutral specular hairline lights at rest — `::before` opacity `0.07` + a `0.75px` neutral warm-cream `box-shadow …inset` (`color(srgb 0.949 0.929 0.890 / 0.7)`); `--specular-intensity=0` confirms it lights via the opacity-floor, not the interaction channel. Press-couple `--glass-btn-press-t` defaults `0` (rest byte-identical no-op, soft-gated, no fork). `:pressable` Card / Button glass variants auto-arm; the blanket tier-root pointermove delegation is DECLINED (static-plate fence deliberate; ASK-GU-LIQUIDHOVER PARTIAL).
- Standing gestalt: recessive aurora (localGradient `<5` no conic banding, maxSat `≤0.61` no oversaturation, warm R>G>B every sample), grain calm, hero fits envelope, dark register luminous-transmissive (not a dead void), WebKit `-webkit-backdrop-filter` blur paints (built demo CSS webkit=53).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-DYNAMICS-DELTA.md`
- 16 PNGs + probe: `docs/tranches/BG/audit/visual/BG.W-GLASS-DYNAMICS-paint/gd-{chrome,safari}-{paper-glass,glass-material,buttons,card}-{light,dark}.png` (+ `chrome-facts.json`)

#### F2.2 — BG.W-GLASS-BASIS-CONSOLIDATE (cursor flip `0c6ce56b`, src `d437cf52`)

The zero-pixel elegance transposition. Dual-engine paint over 5 glass-band routes = 20 PNGs @2880×1800, all resolving on disk with in-pixel engine-badge provenance (no SwiftShader on either leg). Zero-pixel PROVEN: the 3-touched-file diff (`glass/surfaces.css`, `tokens/dark-arm.css`, `tokens/light-dark.css`) is COMMENT-ONLY (`git show d437cf52`) — CSS values byte-unchanged; the deliverable is the recorded idiom (colors -> `light-dark()` canonical, shadows/insets -> `.dark{}` plain arms per the inset-shadow-trap) + the new `proof:glass` `dark-arm-color-reversal` arm.

- `dark-arm-color-reversal` arm GREEN: DA1 lockstep 60 dual-arm color witnesses 0-divergence, DA2 no shadow-valued `light-dark()`, DA3 canon in both files, DA4 shadows -> `.dark` survives.
- PAINT READ (both engines, both modes): paper-glass 4-tier ladder frosts the grain progressively; glass-material 5-rung ladder over recessive warm aurora (dark = luminous warm-brown, not charcoal); glass-panel rimless `0.30->0.95` ladder over live aurora; dialog overlay-band glass with the dark card LIFTING via its `.dark{}` box-shadow rim (inset-trap fence confirmed IN PAINT); dock/overview plates transmit the live aurora. Corroboration: all 20 non-blank (sd 12-59), light-mean > dark-mean in every one of 10 route/engine pairs. Safari backdrop-filter blur PAINTS (dist carries the `-webkit-backdrop-filter` pairs incl. the `.glass-top-layer` `blur(var())` subject at `dist/styles/animations.css:385`).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-BASIS-CONSOLIDATE-DELTA.md`
- 20 PNGs + probe: `docs/tranches/BG/audit/visual/BG.W-GLASS-BASIS-CONSOLIDATE-paint/gbc-{glass-material,paper-glass,glass-panel,dialog,dock-overview}-{chrome,safari}-{light,dark}.png` (+ `chrome-results.json`)

#### 8.x — BG.W-SIRI-DOCK-CAPABILITY (cursor flip `f9cd6f49`)

The ONE endorsed ADD. Dual-engine (Chrome/real-Metal M5 Max + Safari/WebKit Apple GPU), both modes, rest+engaged. `proof:siri` GREEN re-run (E/S/W/D + fences). All 16 capture PNGs + probe JSON resolve on disk.

- **S** — the island morphs on ONE `--siri-island-t` (rest t=0 dormant -> engaged t=0.33 listening; clip-aperture opens; box-INVIOLATE, rect w=294 unchanged = zero reflow; `role=status`), reads as a `.glass-floating` plate (dark = luminous-dark, light = warm-cream) both engines both modes.
- **W** — the demo-private WebGL2 waveform is 100% WARM / 0% teal-navy (mean hue ≈21°) across all 4 engaged samples; wave-bed opacity ramps 0 -> 0.48 on engage.
- **D** — the island lives in the `#rail` slot (`railSlotPresent=true`) beside the dock, composes `useDockSearch` ("Ask…" field + "Search or ask" pill), box-inviolate. **E** — `filter:blur()` scrim (Safari-safe, not backdrop-filter) coupled to the scalar.
- DockStage aurora warm/recessive (no conic banding, no oversaturation), grain calm, "Siri Island" hero fits envelope, dark luminous. `/dock/overview` is a clean regression host — no Siri island by design (scoped to `/dock/siri-island` via the `#rail` escape).
- Accepted capture limitation (NOT a wave defect): off-screen WKWebView throttles the dock-spring rAF, so the Safari engaged capture forces `--siri-island-t` (windowed Chrome is the authoritative engaged evidence); the Chrome `-responding` captures stalled at the listening scalar (a scripting artifact — listening is the binding bloom evidence).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SIRI-DOCK-CAPABILITY-DELTA.md`
- 16 PNGs + probe: `docs/tranches/BG/audit/visual/BG.W-SIRI-DOCK-CAPABILITY-paint/{chrome,safari}-dock-siri-island-{light,dark}-{rest,listening,forced}.png` · `{chrome,safari}-dock-overview-{light,dark}-rest.png` (+ `chrome-probe.json`)

#### 6.4 — BG.W-VIZ-REVEAL-BLOOM (cursor flip `ac1bd92d`)

Dual-engine (Chrome/ANGLE-Metal M5 Max + Safari/WebKit Apple GPU), both modes. `proof:viz` GREEN incl. R1-R8 (R8 = `useVizChoreography` DEFINITION-ABSENT: 0 refs, no file — the orphan-delete is 10.5's; the reveal BUILD stays intact). 20/20 PNGs resolve on disk @2880×1800; provenance decoded CHROME/ANGLE-Metal + WEBKIT/Apple-GPU.

- REVEAL-BLOOM PAINT (Chrome, LIVE non-capture on real Metal — capture mode neutralizes CSS anim by design, so the overshoot is a computed-DOM check on the live path): all 10 route×mode blooms fire — `data-substrate-reveal` attr fired + `getAnimations()` carries `substrate-reveal-bloom`; brightness OVERSHOOTS +13.02% to +13.17% (above the ≥12% bar) then monotone-settles to exactly 1.0 (`filter:none` rest); FIELD `scale(1)` held every frame (`scaleViolation=false` ×10 — no box-zoom gutter); one-shot guard holds (scroll-off-and-back -> `SECOND_BLOOM_FIRED:false`).
- Settled-surface gestalt (both engines, both modes): recessive aurora (no conic, no oversaturation), grain calm, hero fits envelope, dark warm-ember (not a void), constellation lattice neutral (NOT the slides red anomaly).
- Accepted harness limitation (NOT a wave defect): off-screen WKWebView throttles rAF (`document.hidden`), so rAF-driven Canvas2D vizzes (constellation) show a blank canvas off-screen while surface/chrome/hero/type paint — the KNOWN 6.3-accepted no-rAF limit, NOT a WebKit regression. The reveal-bloom is engine-agnostic by construction (baseline CSS `@keyframes` in the built `/styles` bytes both engines run + engine-agnostic IO/attr JS).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-VIZ-REVEAL-BLOOM-DELTA.md`
- 20 PNGs: `docs/tranches/BG/audit/visual/BG.W-VIZ-REVEAL-BLOOM-paint/{chrome,safari}-{substrates,aurora,blob,constellation,fourier-field}-{light,dark}.png`

#### W-AUR-METAL-FINISH — BG.W-AUR-METAL-FINISH (cursor flip `076a5dbc`) — SUPERSEDES the prior PAINT-PENDING hold

The metal MEDIUM (uMedium 8/9) is now SURFACED and REACHABLE — the prior blocker (un-surfaced, zero metal PNGs) is fully resolved by the build-fix-agent (picker single-sourced off `mediumOptions`; `&aurmedium=metal`/`metal-gradient` capture param forces it). Dual-engine over BUILT bytes on `:5200`, C18 `?capture` harness: Chrome (ANGLE Metal Apple M5 Max, WGSL path) + Safari (system WebKit Apple GPU, WebGL2 path — proven via documentStart getContext hook `["webgl2"×7]`). `proof:aur-metal` GREEN (re-run independently).

- PAINT (both engines, both modes): the `&aurmedium=metal` param forces the medium (DOM trigger reads "Medium Metal"/"Medium Brushed Metal" both engines) and the studio stage renders as WARM FOLDED METAL — copper->gold->amber relief, folds catch the cursor-synth rake light, warm catch r≥g≥b (`[251,250,248]` light / `[233,230,227]` dark), NO cold catch-light, no oversaturation (field satP99 0.29-0.62). Distinct from the smooth pink/peach Dawn. metal DUAL-PORTS load-bearing (Chrome WGSL `aurora-mediums.wgsl.ts:393`, Safari GLSL `aurora.frag.ts:447`) and BOTH engines engage (pixel-diff of metal vs FRESH same-run smooth localizes the effect to the Canvas-2 studio stage on both engines). metal-gradient (uMedium 9) reachable + engages (Chrome +308px flake sparkle; Safari byte-identical — the twinkle is a temporal effect a frozen frame cannot show; acceptable).
- Documented CAVEAT (recorded in the DELTA, does NOT gate the wave): in the 1440×900 top-framed `?aurmedium=` capture the metal-bearing studio stage (Canvas 2 @y846) sits ~94% below the fold behind the nav dock, so the full-viewport PNGs predominantly frame the recessive smooth-Dawn hero (Canvas 1, a fixed decorative background). The lit-metal read is therefore verified on the studio-stage crops (`stagecrop-metal-{light,dark}.png` + Safari sliver `strip-safari-metal-*`). A future capture-framing refinement could frame Canvas 2 in the deterministic capture.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-assets/{chrome,safari}-metal{,-gradient}-{light,dark}.png` · `stagecrop-metal-{light,dark}.png` · `strip-safari-metal-{light,dark}.png` · `fresh-{chrome,safari}-smooth-{light,dark}.png` (+ `chrome-metal-results.json` · `chrome-results.json`)

---

## 2026-07-03 — F4/F5/F6/F9 batch (rows 14.1 / F5.1 / 10.1 / 10.2 / W-DESHADCN / F6.7 / 6.6)

allPass: **false** — 6 PASS, 1 FAIL. The DotFlowField showcase white-out (Chrome/Metal) + dead-black (Safari/WebKit) holds row 6.6 at PAINT-PENDING; the other six waves flip (or confirm) PAINT-PENDING -> DONE.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-PAPER-TEXTURE-UNIFY | 14.1 | PASS | DONE |
| BG.W-MOTION-SPINE | F5.1 | PASS | DONE |
| BG.W-SCROLL-SHRINK-UNIFY | 10.1 | PASS | DONE |
| BG.W-SHEET-INSET-ROOT | 10.2 | PASS | DONE |
| BG.W-DESHADCN | W-DESHADCN | PASS | DONE |
| BG.W-SEAL-DISC | F6.7 | PASS | DONE |
| BG.W-DOTFLOW-REBUILD | 6.6 | FAIL | PAINT-PENDING (held) |

Provenance across the batch: Chrome = real Chrome via CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); Safari = off-screen WKWebView on system `WebKit.framework` / `Apple GPU`. Engine + GPU decoded IN-PIXEL from the magenta badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `node scripts/verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis run (and each per-wave judge run); no sibling tree touched.

---

### PASSED -> DONE

#### 14.1 — BG.W-PAPER-TEXTURE-UNIFY (cursor flip `6db21b08`)

Dual-engine non-authoring paint over all 4 paper routes (`/foundations/paper-glass`, `/foundations/paper-texture`, `/substrates/paper-grid`, `/compositions/math-paper`) × Chrome + Safari × light + dark, over BUILT `:5200` (fresh `demo:dist:build` from HEAD `880326cf`). All 16 PNGs (2880×1800) resolve on disk; engine badges decoded for provenance. `proof:paper` GREEN (6 arms A–F, mean tooth C 0.0474) + self-test.

- **NO-METALLIC:** on paper-texture the DARK (umber) AND light (ecru) tooth fibers BOTH resolve warm in OKLab (H 65–77°, C 0.018–0.023) in every engine/mode — a metallic sheen would neutralize the dark fibers to gray (C→0); they don't. Warm in both `multiply`(light) and `screen`(dark) arms.
- **WARM FLOOR at PAINT:** composite tooth C 0.018–0.022 at warm hue (SOURCE C 0.0474 dilutes through the low-alpha overlay to a warm ~0.02 composite, not gray).
- **NO-DOUBLE-WARM CEILING (LX.2):** WARM cascade-retint card C ≤ 0.034, a calm ecru, not an oversaturated slab.
- **NO-SQUINT:** a clear diagonal fiber weave (OKLab L std 0.004–0.0065), perceptible + calm.
- **CROSS-ENGINE PARITY:** CLEAN-tooth mean-RGB Chrome vs Safari maxΔ 2.7 (light) / 2.2 (dark) — ~1%, engine-invariant raster.
- Computed-DOM: tooth `mix-blend-mode` multiply(light)/screen(dark), 3-layer warm weave, `feTurbulence` relief `@supports`-demoted, `--glass-grain-opacity` .025/.045 untouched. Recessive shell aurora no-conic/no-oversaturation, grain calm (opt-in only), heroes fit envelopes. `paper-grid` `glLive=2` is BY DESIGN (focal AA-grid studio + suffusion-preset instance, per manifest), not a leaked context. The COOL retint card is an intentional `--paper-*` hue override demo (H 205–248°).

OPEN (non-blocking, does NOT gate the paint — flagged for tranche-owner routing): the `.paper-grid-breathe` SPEEDTEST clause (ASK-GU-PAPER-GRID-BREATHE / SPEEDTEST-AX-INBOUND #3) is ABSENT from `src/styles` — ungated by `proof:paper`/`proof:paper-grid`, source-booked to the B5 curlFBM-consumer wave (per `flow.glsl.ts`/`flow.wgsl.ts` markers), and a non-painting opt-in register applied on no route (`breatheRuleDefined=false` across all 16 computed-DOM probes). It exhibits on zero painted surfaces, so its absence is a source/feature-completeness deferral, not a paint defect.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-PAPER-TEXTURE-UNIFY-DELTA.md`
- 16 PNGs + analysis: `docs/tranches/BG/audit/visual/BG.W-PAPER-TEXTURE-UNIFY-paint/{chrome,safari}-{foundations_paper-glass,foundations_paper-texture,substrates_paper-grid,compositions_math-paper}-{light,dark}.png` (+ `pixel-analysis.json`)

#### F5.1 — BG.W-MOTION-SPINE (cursor flip `e70bf4f2`)

Dual-engine (Chrome real-Metal M5 Max + Safari WebKit/Apple GPU), both modes, non-authoring paint judge over BUILT `:5200`. Gate `proof:motion` GREEN (0 violations; S1 single-runner `useElementMorph`, S2 press-tower). All 52 PNGs resolve on disk.

- **SURFACE 1 `/motion/reveal`** — `useLiquidReveal` FLIP inversion (direction "in", 1→0). Chrome CDP frame-series on `.glass-reveal` (identical light+dark): scale 0.708→1, opacity 0.6119→1, blur 1.55px→0, transform-origin 0px −56px (anchored at trigger), `transition-property:none` (lockSpatialTransition driver-lock engaged). Snappy arrives ~340ms. Pixel-confirmed in-frame (trigger flips to "Conceal", "Materialized" surface blooms). v-reveal stagger rows render both engines/modes.
- **SURFACE 2 `/motion/springs`** — full motion card set renders both engines/modes (Springs title in violet `--motion-accent`, register controls, animated demo card, TRANSLATEX/ROTATE/LIGHTNESS metric cards). `useNumericTransition` drives demoX 315→360.02 (spring overshoot)→360 settle. `glContextCount:0` (one-GL-per-route fence).
- **SURFACE 3 `/dock/cta-receive`** — seat armed from mount (`data-cta-pending`, "SEAT ARMED"). `useDockCtaReceive` FORWARD play (direction "out", 0→1). Chrome CDP frame-series on `.cta-receive-vehicle` (identical light+dark): scale 0.586→0.276 + translate toward dock (69,88→121,153), opacity 0.4285→0, blur 2.29→4px, then hand-off at 1500ms (CTA ABSENT, `received=true`, `targetLit=true`). Pixel-confirmed: mid-flight CTA ghost shrinks+fades toward star seat; received frame shows CTA gone (→Replay), seat lit with `--dock-selected-accent` ring. Recessive aurora (soft warm peach light / copper dark, no conic banding, no oversaturation) both Chrome real-GL + Safari. `canvasCount:1` (one offscreen-paused aurora).
- Compositor-only (transform/opacity/filter only). `animationTimeline` supported.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-MOTION-SPINE-DELTA.md`
- 52 PNGs + probe: `docs/tranches/BG/audit/visual/BG.W-MOTION-SPINE-assets/` (reveal-bloom / springs-cards / cta-flight frame-series both engines both modes + `chrome-probe.json`)

#### 10.1 — BG.W-SCROLL-SHRINK-UNIFY (cursor flip `2a26eee9`)

Dual-engine (Chrome ANGLE-Metal Apple M5 Max + Safari/WebKit Apple GPU), both modes, all 3 routes (`/display/card`, `/motion/scroll-choreography`, `/compositions/hero`). Engine badges decode correctly on every capture. 12 binding PNGs (+ growth variants) resolve on disk.

- **BINDING PAINT (LIVE, non-`?capture` route):** ScrollCard header shrink PAINTS compositor-only — title scale animates 1→0.695 on scroll (width 1235→858.3, exactly the 0.695 `--card-title-shrink-ratio`), `animName=title-collapse`, `animTimeline=--card-scroll`, in BOTH ScrollCard examples. The shared `@keyframes title-collapse` DRY-fold holds (card supplies 0.695, page/hero supply 0.82 per built CSS `.story-hero-shrink{--title-collapse-scale:.82}`).
- **COMPOSITOR-ONLY / CLS~0 / no-reflow — MEASURED on live `getAnimations()`:** `/motion/scroll-choreography` = 11 scroll-bound anims, 0 layout-prop violations; `/compositions/hero` = 11 scroll-bound anims, 0 violations. page-hero shrink-lift (`title-collapse` scale + `story-hero-shrink-lift` translate) + column cascade (`gl-cascade-build` ViewTimeline, opacity+transform) all wired scale/translate/opacity only.
- **CAPTURE-HARNESS NOTE (recorded, NOT a defect):** the `?capture` harness sets `html[data-capture]` and applies a global `animation:none!important` freeze (confirmed via CDP `CSS.getMatchedStylesForNode` on the marked card-title) so static `?capture` screenshots correctly show the terminal REST state; the choreography rule DOES match (`transform-origin:0px 0px` applies). Paint therefore verified on the LIVE route where the freeze is absent.
- Visual rest (both engines/modes): card tiers render (calm grain, luminous warm-dark in dark, no oversaturation); scroll-choreography shows SCROLL()/VIEW()/TIMELINE-SCOPE SUPPORTED chips all GREEN in BOTH engines (native substrate runs in WebKit 26) + Cascade 1..4 blocks with motion-violet accent + recessive calm backdrop; hero ℱ Real scenes fits its envelope (ordered eyebrow→title→blurb cluster, faint recessive constellation dots). Gates GREEN: `proof:no-layout-animation` LOCKED (56 keyframes + 261 transition legs, 0 off-allowlist), `proof:encapsulation`, `proof:page-chassis` (no-lenis-gsap-fence green).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SCROLL-SHRINK-UNIFY-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/BG.W-SCROLL-SHRINK-UNIFY-paint/sss-{display_card,motion_scroll-choreography,compositions_hero}-{chrome,safari}-{light,dark}-rest.png`

#### 10.2 — BG.W-SHEET-INSET-ROOT (cursor flip `0d68aba5`)

Dual-engine non-authoring judge. 12 captures over BUILT `:5200` bytes: 3 routes (`/containers/sheet`, `/compositions/configurator`, `/containers/drawer`) × 2 modes × 2 engines — Chrome (real ANGLE-Metal M5 Max via CDP) + Safari (system WebKit/Apple GPU via off-screen WKWebView). Because the paint IS the OPEN overlay (Sheet is trigger-controlled; no route auto-opens), each capture CLICKED the trigger by accessible name; under `html[data-capture]` all animations are killed (`capture.css`) so the clicked overlay JUMPS to its settled edge-pinned frame. Engine badges decoded on every PNG (both real Metal, not SwiftShader).

- **Sheet gestalt:** Right Sheet (Open Right) edge-pinned to the right edge, full-height, `top===0`, `inset:0 0 0 1056px`, translucent glass (bg α0.808 light / 0.894 dark, backdrop blur(13px) saturate(1.6) light / +brightness(1.1) dark W-DARK-MATERIAL companion), teleported to `<body>`, `role=dialog`, NO fixed-breaking (transform/filter/contain/will-change) ancestor over the portaled content, scrim dims the page behind.
- **Configurator gear→Sheet drawer:** the dock GEAR ("Open the glass-ui demo configurator") opens the PresetEditor as the SAME right-edge `[data-slot=sheet-content][data-side=right]` (Appearance section w/ DarkModeToggle sun/moon + Glass-level/UI-scale sliders + Reduce-motion; Preset section; footer) — confirms the exact "gear→Sheet drawer" gestalt; same `inset 0 0 0 1056px`, `top===0`.
- **Drawer:** `.glass-drawer` inset:0 (full-vp container), content rides `translateY(calc((1 - var(--glass-drawer-t,1))*100%))` whose CSS fallback 1 keeps it OPEN even where the off-screen WKWebView throttles the rAF spring (Safari captures render open), grip handle + Close footer pinned bottom.
- **SHIPPED-CSS + GATE CORROBORATION (the emission-inverse):** the precompiled rule SHIPS in the built bundle — `:where([data-slot=sheet-content][data-side=right]){width:75%;height:100%;top:0;bottom:0;right:0}` (all four sides + base `position:fixed;z-index:var(--z-modal)`); `sheetVariants` CVA geometry STRIPPED (0 fixed/inset-x/z-modal in `sheet/*.ts`); `proof:emission` GREEN 16/16 re-run, incl. sheet-cva-geometry-stripped, sheet-positioning-in-built-css, sheet-content-mints-data-slot-side, overlay-content-forwards-portal-attrs (SheetContent + DrawerContent — W7 `inheritAttrs:false` + `...$attrs`), sheet-inset-self-test-bites, sheet-inset-pi-spec-exists.
- All 12 capture PNGs resolve on disk at 2880×1800. Cross-engine parity confirmed (WebKit plate reads a hair more solid — the classic backdrop-filter compositing difference — but inset + glass gestalt faithful).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SHEET-INSET-ROOT-DELTA.md`
- 12 PNGs + probe: `docs/tranches/BG/audit/visual/BG.W-SHEET-INSET-ROOT-paint/{chrome,safari}-{sheet,configurator,drawer}-{light,dark}.png` (+ `chrome-results.json`)

#### W-DESHADCN — BG.W-DESHADCN (cursor flip `6dddda04`)

Dual-engine, both modes, 13 routes (`/forms/{inputs,textarea,checks,slider,number-field,select,combobox,multi-select,toggle,toggle-chip,selectable-chip,label}` + `/feedback/toast`), 52 captures all resolving on disk (2880×1800, valid PNG sig, ≥1.7MB). Provenance decoded: Chrome badge `ANGLE Metal Renderer: Apple M5 Max` (real Metal not SwiftShader); Safari badge WEBKIT / Apple GPU (real WebKit).

- **DECISIVE COMPUTATIONAL CRITERION MET:** the focus ring resolves `--focus-ring-color` — in all 26 Chrome captures the focused control's box-shadow color numerically equals `--focus-ring-color` (light `#1c1917`→srgb 0.1098,0.0980,0.0902; dark `#bab7ab`→srgb 0.7294,0.7176,0.6706; Δ<0.002/channel), and the legacy shadcn `--ring` resolves to EMPTY in both modes (the `--ring`→`--focus-ring-color` clean break is real; zero `var(--ring)` in src).
- **PAINTED six-state matrix verified per route:** inputs (rest + invalid destructive ring+red label+error text, both engines both modes, dark ring survives luminous-dark plate); checks (rest/checked/indeterminate/disabled across checkbox+radio+switch, dark selection = chromatic legendre-violet `--primary`); slider (track/amber-fill/iOS-knob/range/OKLCH-spectrum/disabled); select (control-surface trigger pills+chevron over dark page); toggle-chip (chip multi + cell exclusive, selected/rest); selectable-chip (per-tone idle-legible, selected bold); toast (glass trigger pills + destructive red variant, ruby feedback identity). Hover/active are pointer-only interaction states not statically capturable; the `.control-surface:hover/:active` + press rules present in source and material-coherent at rest across all routes.
- **SPEEDTEST clause confirmed on disk:** `ToastClose.vue` ships default `aria-label` "Dismiss" via `()=>(attrs['aria-label'])??'Dismiss'`, overridable.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DESHADCN-DELTA.md`
- 52 PNGs + probe: `docs/tranches/BG/audit/visual/BG.W-DESHADCN-assets/{route}-{chrome,safari}-{light,dark}.png` (+ `chrome-results.json`)

#### F6.7 — BG.W-SEAL-DISC (cursor flip `41bc5b87`)

Dual-engine (Chrome real-Metal M5 Max + Safari WebKit/Apple GPU), both modes, non-authoring paint judge. Route `/feedback/completion-seal` built-bytes on `:5200` via the C18 `?capture=` harness (poll `data-capture-ready`). Gate `proof:completion-seal` GREEN (CS1–CS7 + CS6 self-test bites RED).

- Engine badges decoded in-pixel on all 4 PNGs (CHROME/ANGLE-Metal-M5-Max + WEBKIT/Apple-GPU) — real Metal, not SwiftShader.
- 7 `.completion-seal` nodes, all `data-drawn`+`data-play`, `role=status`, 96×96. `stroke-dashoffset` computes to 0 (`--seal-draw:100%`) → the draw REACHED 0→full and holds static (both fill); `getAnimations()=0` post-settle (one-shot, no loop).
- `shape="disc"` reads as the composed earned-coin: translucent gold FACE + drawn gold RING around + gold CHECK inside (disc→ring→check sequencing, all layers fully drawn), in both engines+modes.
- Earned-gold ink resolved oklch(0.751 0.147 84.2) light / oklch(0.784 0.143 86) dark (gold hue ~84–86°).
- `personalBest` garnish is a distinct brighter+more-saturated LIFT within the gold family: oklch(0.89 0.183 96.1) light / oklch(0.898 0.182 97.4) dark (ΔL +0.14, ΔC +0.036) — visibly brighter coin in-pixel, never a new hue (Q2).
- Re-inked completion register (`--phase-complete-color` → `--section-color-8`) resolves ruby oklch(0.52 0.176 8.4)/oklch(0.709 0.142 2.3) — token-first lockstep confirmed.
- Backdrop recessive (warm paper/dark-material, no conic, no oversaturation, 1 calm canvas); hero heading+blurb fit envelope; cross-engine gestalt parity.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SEAL-DISC-DELTA.md`
- 4 PNGs + probe: `docs/tranches/BG/audit/visual/completion-seal-{chrome,safari}-{light,dark}-desktop-full.png` (+ `completion-seal-chrome-results.json`)

---

### FAILED -> PAINT-PENDING (held)

#### 6.6 — BG.W-DOTFLOW-REBUILD (cursor held PAINT-PENDING, src SHAs `7b82c7fc` preserved; recorded `cc12a6c5`)

Dual-engine, both modes FAIL. Route `/substrates/dot-flow-field` renders `FLOW_PRESET_AURORA_CURRENT` (the `mode:flow` default; "calm halftone" toggle OFF at capture). The DotFlowField showcase does NOT read as the reference warm-fire flowing dot-wave:

- **Chrome/Metal** (real Apple M5 Max ANGLE-Metal, badge decoded in-pixel — NOT SwiftShader) paints a blown-out flat WHITE field (showcase-canvas-region census: meanLuma 253.9 dark / 254.1 light, stdLuma 2–5 ≈flat, ~0.6–1.5% chromatic; motes render white, spilling past the rounded-card clip; white from t≈800ms and stable).
- **Safari/WebKit** paints a dead near-BLACK field (meanLuma 4.5, 0% chromatic, no structure).
- Reference intent is a deep warm-near-black floor (background L:0.11 ≈ luma 28/255) with warm-fire ribbons advecting through — a mid-luma high-structure warm-chromatic field; neither capture is that.
- **Root cause localized:** `FLOW_PRESENT_KNEE=0.6` (BG.W-DOTFLOW-REBUILD F7c faint-at-rest fix, `uniformBridgeWGPU.ts`, spliced into `flow-field.glsl.ts` + `flow-field.render.wgsl.ts` present passes) over-corrected into a real-GPU additive white-out on Chrome (particleCount 12000 + speedGlow 1.35 saturates `trail/(trail+0.6)`→1); the WebGL2 float-trail/state-texture pipeline (`flowSetupGLFlow.ts` two-FBO + state ping-pong, RGBA16F half-res trail) paints black on WebKit (likely missing/undetected `EXT_color_buffer_float` / `EXT_float_blend` for additive blend into a float target).
- **Isolated to the viz:** the route's Aurora HERO backdrop rendered correctly warm+structured on BOTH engines (hero census chrome-dark meanLuma 62.5/stdLuma 50.0/13.8% warm; safari-dark 59.5/47.9), proving the capture pipeline, WKWebView-WebGL compositing, and the warm-fire fence (zero teal-navy anywhere, warm ≈100% of chromatic) all sound.
- Gate `proof:viz-dotflow` is GREEN (F1–F7 structural: `cs_flow` present, WARM_FIRE_RAMP no-teal, knee named ≤0.7 + spliced) — a headless-green/visually-broken gap; the gate checks source, not the composited pixels.

**mustFix (for a build-fix-agent — NOT this synthesis agent, NOT this judge):**
1. **Chrome/Metal white-out** — re-balance `FLOW_PRESENT_KNEE` vs actual trail magnitude (raise knee and/or scale additive deposit/`speedGlow`/trail gain and/or clamp pre-tonemap trail) so ribbons pop off the deep warm floor without clipping to white; target mid-range mean luma, high stdLuma, warm hue surviving. Files: `src/components/custom/dot-flow-field/composables/uniformBridgeWGPU.ts` (`FLOW_PRESENT_KNEE`), `shaders/flow-field.glsl.ts`, `shaders/flow-field.render.wgsl.ts`.
2. **Safari/WebKit dead-black** — audit `flowSetupGLFlow.ts` two-FBO trail + state-texture ping-pong RGBA16F targets for WebKit color-renderable+blendable float support (`EXT_color_buffer_float` + `EXT_float_blend` detection; a missing ext silently no-ops additive accumulation) and provide a detected-degrade fallback rather than a black frame.
3. **Re-verify BOTH engines BOTH modes** paint the reference flowing warm-fire dot-wave (mid-luma warm-chromatic field with visible advected streamline structure, zero teal-navy) before re-flipping to PAINT-PENDING for re-judge; diagnostic = showcase-canvas-region census (device box x498 y480 2066×920 at y=240 scroll): PASS wants mid meanLuma, stdLuma ≫ flat-plate ~2–5 floor, warm ~100% of chromatic, teal ~0, on all four engine×mode captures.

Captures:
- DELTA (carries `defectLocalization` + `mustFix`): `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-DELTA.md`
- 8 route PNGs + 2 evidence crops: `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint/dotflow-{showcase-,}{chrome,safari}-{light,dark}.png` · `EVIDENCE-showcase-chrome-dark-white.png` · `EVIDENCE-showcase-safari-dark-black.png`

---

## 2026-07-03 — batch (rows F2.4 / 13.2 / F6.8 / F7.2 / 16.1)

allPass: **false** — 4 PASS, 1 FAIL. The `/substrates/aurora` DOUBLE-HEADER identity inversion holds row F7.2 (BG.W-CHASSIS-ADOPT-OR-RETIRE) at PENDING; the other four flip DONE.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-CORNER-ALIAS-KILL | F2.4 | PASS | DONE |
| BG.W-GLASS-REFRACT-WEBGL | 13.2 | PASS | DONE |
| BG.W-LIQUID-FILL | F6.8 | PASS | DONE |
| BG.W-CHASSIS-ADOPT-OR-RETIRE | F7.2 | FAIL | PENDING (held — DELTA on disk routes to build-fix-agent) |
| BG.W-DOCK-SCROLL-PROGRESS | 16.1 | PASS | DONE |

Provenance across the batch: Chrome = CDP on `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (real Metal, not SwiftShader); WebKit = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server). Every declared capture path resolves on disk (40 CORNER + 12 REFRACT + 10 LIQUID + 20 CHASSIS + 34 DOCK-SCROLL). `verify-siblings-intact --quiet` exit 0 across the batch; each judge killed its `demo:dist:serve` + throwaway Chrome.

---

### PASSED -> DONE

#### F2.4 — BG.W-CORNER-ALIAS-KILL (cursor flip `3fcad1a0`; USER defect 2026-07-03 — the aliasing chronic)

The white square-corner backplate wedge behind rounded card/glass corners is killed at the CLASS level — every backplate/`::before` inherits the host radius; verified cross-engine over a saturated field, all 3 wave routes [/display/card · /substrates/glass-material · /display/buttons], both modes.

- Corner-triangle pixel forensics (the square-corner region behind the radius): **white-wedge px = 0** in EVERY corner clip across buttons (blue field) + card (orange field), both modes. Corner-triangle pixels are warm-CHROMATIC (R>G>B) field/page color right up to the curve — card orange field `(211,122,53)` light / `(213,125,59)` dark; buttons cream page `(243,228,203)` light / near-black `(39,28,18)` dark. Never a neutral near-white square backplate.
- Computed DOM `::before` audit across all 6 route×mode captures: the ONLY opaque-`::before` surfaces are pill dock-icon-button capsules where `hostBR == beforeBR == 9999px` (radius INHERITED). No rounded host carries a `0px` square-corner `::before` behind its radius — the class-level discipline holds.
- Full-page reads: rounded top corners reveal the field/page through the curve with no light box artifact, in Chrome Metal AND Safari WebKit, both modes.
- 40 PNGs on disk (@2880×1800 WebKit / 1440×900 Chrome full + corner close-ups).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-CORNER-ALIAS-KILL-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/BG.W-CORNER-ALIAS-KILL-paint/` (`{card,glass-material,buttons}-{chrome,webkit}-{light,dark}-full.png` + `*-cornerTR.png` close-ups)

#### 13.2 — BG.W-GLASS-REFRACT-WEBGL (cursor flip `4f258b53`; C-SAFARI Tier-1 WebGL2 FLOOR — PRIMARY)

The refraction floor paints FULL on capable (Chromium `.glass-lens` resolves `url(#glass-refract)`) with a graceful flat-blur fall on the WebKit tail — the "full on capable, graceful flat-blur fall on the tail" ladder the criteria requires. 3 routes [/substrates/glass-material · /display/buttons · /dock/overview], both modes, both engines = 12 PNGs.

- Hero CTA fits its envelope (`btn-glass` 200×44, `overflowsViewport=false`, lit glass transmitting the staged blue live field — not a pale lozenge).
- Dock plate translucent glass (bg alpha 0.52 light / 0.56 dark) both engines both modes.
- Aurora recessive (pixel means warm-cream R>G>B, no conic banding, no oversaturation) — light gm ~(0.89–0.95, 0.75–0.85, 0.59–0.71); dark gm warm-amber luminous-dark ~(0.45–0.58, 0.36–0.44, 0.22–0.28). Grain calm.
- LOAD-BEARING (recorded in DELTA): the WebGL2 fragment module `glass-refract.glsl.ts` is SOURCE-integrated with ZERO live importers at this commit — the FBO `uBackdrop` bind + `--glass-chromatic-strength` @property reg are explicitly DEFERRED to BG.W-GLASS-BACKDROP-SAMPLE (13.3 booked). Today's LIVE floor is the Tier-0 CSS-SVG `#glass-refract` lens + the graceful flat-blur fall; the WebGL2 primary becomes the universal floor when the FBO keystone lands (a distinct wave's verdict, not this wave's regression).
- Observed-benign (recorded, non-blocking): `glContextCount=2` on /display/buttons + /dock/overview is the demo-page double live-field composition (page aurora + staged/DockStage field), a story composition not a library one-GL-per-route violation; both fields render calm/recessive. `proof:glass` GREEN incl. refract-webgl RW1–RW5 + self-test teeth.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-REFRACT-WEBGL-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-REFRACT-WEBGL-assets/{chrome_,safari_}*.png` (+ `chrome-probes.json`)

#### F6.8 — BG.W-LIQUID-FILL (cursor flip `98b76451`; SPEEDTEST-AX-INBOUND #5)

The ONE shared `.glass-liquid-fill` glass-cylinder register paints over the track on BOTH the Slider `.slider-range` and `<Progress variant="liquid">`, both engines, both modes = 10 PNGs. The extracted register is COMPOSED, dual path dead.

- SLIDER /forms/slider: `.slider-range` className resolves to `slider-range glass-liquid-fill`; 11/11 slider ranges carry `.glass-liquid-fill` (`glassLiquidFillCount === sliderRangeCount === 11`, no fork). Warm-cream amber oklab tint `oklab(0.88 0.0258 0.0965 / 0.88)`, `--glass-material-rim` + `--glass-under-shadow-quiet`, pill radius 9999px. Rim tint re-resolves warm-dark→warm-light between modes. The `spectrum` variant opts out of blur by design (not a defect).
- PROGRESS /feedback/progress variant="liquid": `.progress-liquid-fill` className composes the shared register; 2 liquid bars, both carry the glass mechanics. Phase-colour composable (zero glass knowledge): tint rides `--liquid-fill-tint` seeded off `--progress-fill` (default dark-ink light / legendre-violet dark; a demo bar overrides to `--viz-legendre` → violet cylinder both modes). Same rim + under-shadow + pill radius as the Slider (the ONE register).
- Backdrop-filter emission note (investigated, NOT a fix owed): `getComputedStyle().backdropFilter` reports `none` on Chrome because the built lightningcss CSS emits only `-webkit-backdrop-filter` (drops the unprefixed alias); WebKit consumes it natively and Chromium honors it for rendering. The criterion's load-bearing deliverables (warm oklab tint, rim, under-shadow, pill radius) are visibly painted in every engine/mode. `proof:liquid-fill` GREEN (W1–W4 + self-test).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-LIQUID-FILL-DELTA.md`
- 10 PNGs: `docs/tranches/BG/audit/visual/BG.W-LIQUID-FILL-paint/{chrome,safari}-{forms-slider,feedback-progress}-{light,dark}.png` (+ `safari-feedback-progress-{light,dark}-tall.png`)

#### 16.1 — BG.W-DOCK-SCROLL-PROGRESS (cursor flip `8412deab`; USER RE-SPEC 2026-07-03)

The page-scroll progress IS the leftside SidebarDock's BORDER (`<BorderProgress>` consumer #3); the standalone storybook scroll bar is RETIRED. Verified at scroll 0 AND scroll ~45% (the fill is scroll-coupled — a scroll-0-only capture paints nothing), 3 routes [/dock/overview · /substrates/aurora · /foundations/intro], both modes, both engines.

- COMPUTED (both engines, all 6 route×mode agree): standalone `.demo-scroll-progress` absent · `.demo-dock-scroll-ring` present, `aria-hidden` · `ringRect ≡ dockRect` exactly (12,16 67×713/720) · coverage inline-end-edge · radius 9999px (pill-following) · width 11px (10–14 envelope) · mask-composite `intersect, exclude, add` (band ∩ ring, corrected order) · fill 0% → ~45% scroll-coupled · `ringAnimCount 0` even under `prefers-reduced-motion:reduce` (PRM-static; fill 45% preserved, 0 autonomous animations).
- PIXEL: the warm-ink band paints band-ONLY on the content-facing (inner-right) dock edge, filling top → ~45% front then stopping, no interior slab bleed — confirmed on SYSTEM WebKit (resolves the booked WebKit mask concern for the shipped inline-end-edge coverage). Mode flip for free: light = dark warm-ink band, dark = light-cream band. Aurora/foundations backdrops recessive/calm; hero display type fits envelope. Collapsed full-ring arm dormant-but-wired (shell dock always-expanded by design — matches spec, not a defect). `proof:border-progress` PASS incl. W7; `proof:demo` PASS.
- 32 capture PNGs + 2 probe JSONs on disk.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-SCROLL-PROGRESS-DELTA.md` (§NON-AUTHORING VERDICT)
- PNGs + probes: `docs/tranches/BG/audit/visual/BG.W-DOCK-SCROLL-PROGRESS-judge/` (`{chrome,webkit,webkit-pw}-*-scroll45.png` + `{chrome,webkit-pw}-probe.json`)

---

### FAILED -> PENDING (held)

#### F7.2 — BG.W-CHASSIS-ADOPT-OR-RETIRE (cursor held PENDING with DELTA, src SHAs preserved; recorded `3d836372`)

Source disposition PASS, PAINT FAIL on the ONE adopted-VizStudio route. 5 routes, both engines, both modes = 20/20 PNGs on disk.

- SOURCE DISPOSITION (PASS): RETIRE realized — `_chassis/` dir, `DemoFrame.vue`, `StorySectionHeader.vue`, `demo-frame.css` all DEFINITION-ABSENT; no `demo-frame` `@import`. ADOPT realized — `StoryHeader.vue` live-imported by StoryPage/StoryHero; `VizStudio.vue` live-imported by aurora.vue. `proof:demo` GREEN (D1/D2/D3/D4 + 5 self-test bites). Surviving DemoFrame/StorySectionHeader mentions are comment-only provenance.
- COMPUTED-DOM: StoryHeader unified cluster renders exactly ONCE on all 5 routes (`cluster=1`, `eyebrow=1`, `subpath=1`, `blurb=1`, `h1=1`, `dupEyebrow=false`). foundations/intro, glass-material, paper-grid, dot-flow-field all read CLEAN (`inlineHdr=0`) in BOTH engines + BOTH modes.
- PAINT DEFECT (engine+mode invariant, 4/4 aurora captures): `/substrates/aurora` — the ONLY adopted-VizStudio route — paints a DOUBLE-HEADER identity inversion, violating the verbatim criterion "rendered ONCE, 0 inline `<header>`". Two competing display-scale titles stack: (1) StoryHeader cluster [eyebrow SUBSTRATES·AURORA → subpath chip → display `<h1>` "Aurora" → blurb], then (2) a SECOND inline `<header>` (`aurora.vue:143-153`, VizStudio `#masthead` slot) restating "SUBSTRATES · AURORA STUDIO" + a purple `text-display-3` "Aurora Studio". `inlineHdr=1` on aurora vs `0` on the 4 clean routes.

**mustFix (for a build-fix-agent — NOT this synthesis agent):**
1. Drop or reconcile the aurora `#masthead` inline header so one display-scale identity paints ONCE on `/substrates/aurora`. This is a `demo/stories/substrates/aurora.vue` change (`:143-153`), NOT a `src/` change.
2. Re-verify BOTH engines BOTH modes read one designed page identity (`inlineHdr=0`) before re-flipping the row for re-judge.

Captures:
- DELTA (carries `defectLocalization` + `mustFix`): `docs/tranches/BG/audit/visual/BG.W-CHASSIS-ADOPT-OR-RETIRE-DELTA.md`
- 20 PNGs: `docs/tranches/BG/audit/visual/BG.W-CHASSIS-ADOPT-OR-RETIRE-paint/{chrome__,safari_}*_{light,dark}.png`

---

## 2026-07-03 — F2 glass-consumer-band + dock-legibility + signal-truth + F6 motion-axis batch (rows 3.8 / 3.9 / NF.3 / F6.3)

allPass: **false** — 3 PASS, 1 FAIL. The unified fill-tint plate/rim fold (3.8), the dock AA re-anchor at the calm saturate floor (3.9), and the BH Motion-axis gesture sweep (F6.3) all flip PASS to DONE. The single FAIL is `BG.W-GLASS-SIGNAL-TRUTH` (NF.3) — its own ST3 writer-witness exposes the dock sampled-luminance observer DEAD on the whole dock band (the dead-observer≡calm-backdrop mask the witness was built to catch), held at PENDING with `defectLocalization` + `mustFix[]` for a build-fix-agent.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-GLASS-CONSUMER-BAND | 3.8 | PASS | DONE (`9eb5dee9`) |
| BG.W-DOCK-LEGIBILITY-RECAL | 3.9 | PASS | DONE (`4940a712`) |
| BG.W-GLASS-SIGNAL-TRUTH | NF.3 | FAIL | PENDING (held, `5ecfc7c2`) |
| BH.W-MOTION-AXIS | F6.3 | PASS | DONE (`f2683796`) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit/Safari = off-screen WKWebView on system `WebKit.framework` / `Apple GPU`. Engine + GPU + MODE decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: all 3 PASS rows already read DONE (the paint agents flipped them in-run at the listed commits); NF.3 remains PENDING (paint FAIL recorded, `5ecfc7c2`, src SHAs preserved). No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### 3.8 — BG.W-GLASS-CONSUMER-BAND (cursor flip `9eb5dee9`)

The fill-tint consumer fold onto the shared `--glass-fill-tinted` plate/rim pair is REAL in the served bytes. Dual-engine non-authoring judge over BUILT demo dist on `:5200`, routes /display/badge · /forms/selectable-chip · /foundations/icons, both modes, Chrome (ANGLE-Metal Apple M5 Max, CDP 9477, `deviceScaleFactor:2`) + Safari (WebKit Apple GPU, `/tmp/wkshot-live` off-screen harness). 12/12 PNGs resolve on disk `isRealPng` 2880×1800; provenance decoded off the top-left engine badge on every PNG; `data-capture-ready` polled per route.

- THE FOLD IS REAL IN THE SERVED BYTES: `--glass-fill-tinted` declared exactly once (`tokens/glass.css:345` + built `index-CL6y4Gsr.css`), read 4× (`.glass-atom[data-surface=glass]` ×2 + `.glass-chip` ×2); ZERO forked `--glass-atom-tinted`/`--glass-chip-tinted` tokens (DEFINITION-ABSENT, comment-only survivor).
- PER-INSTANCE DATA HUE OVER THE SHARED PLATE (computational + pixel-read): SelectableChip glass instances carry distinct `--glass-fill-tint` at 12% strength — React violet `oklch(0.532 0.18 317.5)`, Svelte rose `oklch(0.579 0.201 30.4)`, Qwik green `oklch(0.556 0.103 128.8)`. Dark-mode peak-chroma plate scan shows three distinct hues rose≠violet≠olive with engine parity (Svelte-rose plate near-byte-identical Safari [128,81,67] / Chrome [128,86,71]), NO WebKit desaturation-to-gray (the `oklch(L C H / 0)` 0-alpha discipline held).
- Byte-identical no-op at the `@property` defaults (transparent + 0%): `:root --glass-fill-tinted` resolves `color-mix(in oklab, rgba(0,0,0,0) 0%, oklch(90% .05 75/0))`; IconChip default POP is its own section-hue srgb backplate with the glass-fill plate at the 0% no-op (correct-by-design opt-in `icon-chip-glass` register); loud opaque Badge variants are the W54-allowlisted saturated-pill register.
- Recessive backdrop / calm gestalt on every route: `main.children==2`, 1 canvas, no conic banding, no oversaturation, hero fits envelope, body ink untinted, chip labels contrast-legible both modes.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-CONSUMER-BAND-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-CONSUMER-BAND-pngs/{chrome,safari}-{badge,selectable-chip,icons}-{light,dark}.png`

#### 3.9 — BG.W-DOCK-LEGIBILITY-RECAL (cursor flip `4940a712`)

The dock AA re-anchor at the calm `saturate(1.2)` floor — once the unified plate tint carries the anti-gray load — paints calm-not-metallic. Dual-engine non-authoring judge over BUILT `:5200` (C18 pipeline: demo:dist built + served; Chrome CDP :9477, Safari `/tmp/wkshot-live` WKWebView), both routes [/dock/overview · /dock/layers], both modes. 8/8 PNGs resolve on disk `isRealPng` 2880×1800, PNG magic verified, ≥1.68MB (non-blank); engine badges decoded (Chrome=ANGLE Metal M5 Max, Safari=WebKit/Apple GPU).

- COMPUTED (getComputedStyle over every `.glass-dock` plate, both routes both modes): light plates compose `blur(8px) saturate(1.2)` — saturate 1.2 ∈ [1.15,1.25], the calm floor OFF the metallic ≥1.4 ceiling; dark plates compose `saturate(1.3) brightness(1.14)` — saturate 1.3 ≥ 1.2 luminous-dark read; `--glass-tint-source → --glass-tint-ink-dock` (warm oklch ink) with `--glass-tint-strength` clamping toward the AA ceiling (20% light bright-bucket / 12% dark) — the unified plate tint is the PRIMARY anti-gray darken-over-light device, which is why saturate could drop to the calm secondary floor. Blur radius byte-locked 8px. `glContextCount` 1-2 (one-GL-per-route), `mainChildren=2`.
- VISUAL: dock plates read as calm-not-metallic translucent glass over the recessive warm aurora field in every capture — field transmits through, warm-ink rims silhouette the plates, all glyphs+labels legible, NO metallic sheen/oversaturated specular. Field pixel sample: warm hue 19-21° (uniform → no conic banding), HSV saturation 34% light / 44% dark (moderate, not neon). Chrome and Safari consistent (WebKit a hair softer, expected engine diff; no engine-specific defect). Hero fits envelope.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-LEGIBILITY-RECAL-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/BG.W-DOCK-LEGIBILITY-RECAL-paint/{chrome,safari}-{overview,layers}-{light,dark}.png`

#### F6.3 — BH.W-MOTION-AXIS (cursor flip `f2683796`)

The 7-boolean motion scatter collapses onto the ONE `Motion` axis, paint-verified across Card/Tab/Slider/Dialog. Device-free `proof:encapsulation` motion-axis GREEN (bool-props=0, motion-typed-missing=0, data-motion-missing=0, weight-off=true, PRM-clamp=true, kept-missing=0; 55 self-test bites; exit 0). Dual-engine capture Chrome (ANGLE Metal Apple M5 Max) + Safari (WebKit Apple GPU), both modes, all 4 surfaces; engine badges decoded per-PNG. 20 PNGs resolve on disk with valid PNG magic.

- 12/12 CDP computed checks PASS both modes verifying the three-rung Motion sweep: full (tab `.segmented-indicator` drag-armed via `.glass-drag-grabbable`; slider `--motion-weight=0.618` live not 0; 19 static cards with 0 spurious `data-pressable` — press derives from interactivity; dialog `main.children=2`, horizontal overflow=0), reduced (tab drag unbinds under PRM, PRM=true, strip still operable; slider functional), off (`--motion-weight:0` off-write is the M4 source fact).
- Gestalt correct: recessive warm-cream / near-black aurora with no conic banding or oversaturation, calm grain, hero fits envelope, dark register luminous-transmissive, destructive-red intact.
- One traced non-defect: an initial dark-reduced grabbable flicker was a capture-harness artifact (the `.dark` post-mount toggle does not re-run the resolver's non-reactive `matchMedia` snapshot); setting PRM+mode on the context BEFORE navigation is deterministic 3/3 both modes — the built mount-under-PRM behavior is correct.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BH.W-MOTION-AXIS-DELTA.md`
- 20 PNGs: `docs/tranches/BG/audit/visual/BH.W-MOTION-AXIS-assets/{chrome,safari}-{card,tabs,slider,dialog}-{light,dark}.png` (+ `chrome-{tabs,slider}-reduced-{light,dark}.png`)

---

### FAILED -> PENDING (held at row NF.3)

#### NF.3 — BG.W-GLASS-SIGNAL-TRUTH (cursor held PENDING with DELTA, src SHAs preserved; recorded `5ecfc7c2`)

Dual-engine non-authoring paint judge: FAIL. 12 PNGs (Chrome ANGLE-Metal M5 Max + Safari WebKit Apple GPU, both modes, all 3 routes [/dock/overview · /substrates/glass-material · /display/buttons]) resolve on disk at 2880×1800; engine badges decoded (CHROME/ANGLE + WEBKIT/Apple GPU) — real engines, no masked fallback.

Scorecard:
- ST2 (one hue channel one writer) **PASS** — dead `--glass-backdrop-hue` ABSENT across all routes/modes/engines; only the real-writer `--glass-ambient-hue`/`--glass-ambient-strength` remain.
- ST3 (observer `data-backdrop-sampled` witness fires) **FAIL** — the crux: across 12 GlassDocks on the flagship /dock/overview (both modes, both engines) the observer NEVER stamps `data-backdrop-sampled`, NEVER writes `--glass-backdrop-luma`, NEVER writes `--glass-ambient-hue`; docks 0,1,2,3,11 are onScreen with real dims, the DockStage aurora canvas is 1928×4809 live, PRM off, zero console errors — yet inline luma reads (none) on every dock. Only the glass-material demo card (explicit `live:true`) fires. This is precisely the dead-observer≡calm-backdrop mask the ST3 witness was engineered to expose, and it exposed it: the wave's own promise ("the ambient-hue catch-light WHERE the dock observer fires") is unfulfilled on its own flagship dock route.
- ST1 (clear-scrim floor) source-green but no `.glass-clear` plate renders on any wave route (not pixel-exercised — non-blocking gap recorded).
- ST4 (bucket-drives-band) **PARTIAL** — declarative floor paints, luma-clamp refinement dead since no writer fires.

**defectLocalization (for a build-fix-agent — NOT this synthesis agent):** `GlassDock.vue:86-89` wires `useGlassBackdropLuminance(dockEl, {backgroundCanvas})` with NO live flag and no `data-glass-sample=live` on the dock root, so `isLive()` (`useGlassBackdropLuminance.ts:218-221`) is false; even the mount `sampleStatic` fallback (`:369-372`, `:418-426`) produces zero writes on the built dock band. Contrast `glass-material.vue:63-65` (`live:true`) which fires.

**mustFix:**
1. BLOCKING (ST3): revive the GlassDock sampled-luminance observer on the dock band so docks stamp `data-backdrop-sampled` + write `--glass-backdrop-luma`/`--glass-ambient-hue`, both modes both engines. Localize `GlassDock.vue:86-89` (no live/`data-glass-sample`) + `useGlassBackdropLuminance.ts:218-221` (`isLive` false) + `:369-372`/`:418-426` (mount `sampleStatic` write not landing on dock targets).
2. NON-BLOCKING gap (ST1): no `.glass-clear` / `[data-surface=clear]` plate renders on any of the 3 wave routes, so the static clear-scrim floor `calc(12%+luma*28%)` is source-correct + gate-green but never pixel-verified — record as source-only or add a clear specimen to a captured route.
3. Re-verify BOTH engines BOTH modes read the observer firing (`data-backdrop-sampled` set, `--glass-ambient-hue` written) before re-flipping the row for re-judge.

Captures:
- DELTA (carries `defectLocalization` + `mustFix`): `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-paint/BG.W-GLASS-SIGNAL-TRUTH-{chrome,safari}-{dock-overview,glass-material,display-buttons}-{light,dark}.png`

---

## 2026-07-04 — F1 route-entrance + F3 dock-morph-truth batch (rows F1.R1 / F3.R1 / F3.R2)

allPass: **false** — 1 PASS, 2 FAIL. The route-entrance repair (F1.R1) flips PASS to DONE; both F3 dock-morph-truth waves FAIL and are held PENDING with `defectLocalization` + `mustFix[]` for a build-fix-agent. The two FAILs are the exact headless-green/visually-broken gap this dual-engine screencast pass was owed — both waves carry a GREEN `proof:dock` gate over paint that breaks on the number the gate cannot see (the CSS-rule-TEXT-only blind spot).

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-ROUTE-ENTER-VISIBLE | F1.R1 | PASS | DONE (`a25d719d`) |
| BG.W-DOCK-GLYPH-RIGID | F3.R1 | FAIL | PENDING (held, `e45a3056`) |
| BG.W-DOCK-PANE-OVERLAP | F3.R2 | FAIL | PENDING (held, `9347b945`) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader), Chrome 149; WebKit/Safari = off-screen WKWebView on system `WebKit.framework` 26.4 / Apple GPU. Engine + GPU + MODE decoded IN-PIXEL from the badge per leg. All 3 DELTAs + every referenced capture resolve on disk (route-enter: 12 PNGs; glyph-rigid: 4 punch PNGs + 2 Safari 2880×1800 + 4 frame-series JSON; pane-overlap: 6 PNGs + 2 JSON). `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; each paint agent tore down its `demo:dist:serve` + throwaway Chrome; operated only under glass-ui; zero `src`/`demo`/`styles`/`scripts` edits.

Cursor state confirmed at synthesis: F1.R1 already reads `P | DONE` (PAINT DONE note, `a25d719d`); F3.R1 reads `P | PENDING — paint FAIL` (`e45a3056`, src SHAs preserved); F3.R2 reads `P | PENDING — paint FAIL` (`9347b945`, src SHAs preserved). No cursor edit owed by synthesis — the paint agents flipped each row in-run.

---

### PASSED -> DONE

#### F1.R1 — BG.W-ROUTE-ENTER-VISIBLE (cursor flip `a25d719d`)

The 2.1 `gl-route-enter` beat that was EATEN in paint (route-chunk stalls landing inside snappy's half-clock → the page arrived fully-placed in one frame) is REPAIRED in the served bytes. Dual-engine non-authoring judge (Chrome ANGLE-Metal Apple M5 Max + Safari off-screen WKWebView/Metal), both modes. Entrance BEATS verified via the computed-DOM path the criteria name (`getAnimations()`/`animationName`/computed transform) driving real SPA navs through the Vue router on the LIVE non-capture demo (the `?capture=` harness de-promotes `.route-enter` to settled pixels, so the static PNGs carry the SETTLED gestalt; the beats ride the computed-DOM path).

- **R1 (chunk pre-resolved every nav):** first painted frame after swap = `{translateY:20px, opacity:0}` — the FROM state, NOT settled layout. `router.beforeResolve` awaits `Promise.all(comps.map(c=>c()))` with NO `firstResolved` one-shot (SUPERSEDED). `proof:route-enter-visible` R1=true.
- **R2 (perceptible rise on snappy, PRM fade-only):** `gl-route-enter` from `translateY(1.25rem)`=20px (in the 16–24px band, on `--spring-snappy`+`backwards`); live rise decelerates 20→12→−0.26 (overshoot)→0 = a real spring curve. Under PRM (`emulateMedia reduce`): `wrapperAnims=["gl-route-fade"]`, `maxWrapperTranslateY:0` (rise DROPPED), `fadeStillHappens:true` (fade KEPT) — P6 holds.
- **R3 (StoryHeader bands, real translateY leg, reading-order stagger):** all 4 bands fire `story-hero-cluster-rise`/`title-rise` with 24px translateY legs; opacity-0.5 cross eyebrow(62ms)→subpath(176ms)→title(247ms), `ordered:true`. The subpath chip — the dead-class the wave closed — fires `story-hero-cluster-rise` across all 3 route pairs (foundations/intro↔colors, substrates/aurora↔dock/overview, compositions/configurator↔display/buttons). Present + rising all 3 pairs.
- **π (≥8 painted rise frames + first-frame≠settled):** `paintedRiseFrames=55` over a 65-frame series (wrapper 8, eyebrow 34, subpath 35, title 48, blurb 35); `firstFrameWrapTY=20`. Structural: `mainChildren=2` (clean mount), `glContextCount=1` (one-GL-per-route budget), `runningAnims=0` after settle.
- **Gestalt (static PNGs both engines both modes):** aurora DockStage field recessive warm-peach(light)/warm-terracotta(dark), NO conic banding, NO oversaturation, warm-cream identity holds; dark register luminous-transmissive; hero fits envelope; StoryHeader cluster reads eyebrow→subpath(DISPLAY·BUTTONS)→title→blurb top-to-bottom; grain calm; engine badge decodes in-pixel. 12 captures `real=true`, body σ(L) 0.034–0.187, mode-differentiated meanL (light 0.85–0.92 vs dark 0.27–0.54), warm chroma 0.032–0.068.

`proof:route-enter-visible` GREEN (R1/R2/R3 true, 7/7 self-test bites).

CAPTURE-TOOLING NOTE (not a wave defect): Chrome foundations/colors-dark + display/buttons-dark captured at 1440×900 via the Playwright screenshot path because CDP `Page.captureScreenshot` reproducibly stalled on those two heavy dark WebGL routes (a Chrome-CDP limitation, not a route defect); Safari captured both cleanly at 2880×1800, DOM probe confirmed both settled+correct, and their entrance rode the live computed-DOM path (pair 3 →display/buttons `ordered:true`). All 12 captures real content, correct mode, decodable.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-ROUTE-ENTER-VISIBLE-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/route-enter/{chrome,safari}-{colors,overview,buttons}-{light,dark}.png`

---

### FAILED -> PENDING

#### F3.R1 — BG.W-DOCK-GLYPH-RIGID (cursor held PENDING with DELTA, src SHAs preserved; recorded `e45a3056`)

Dual-engine paint judge of the dock collapse/expand morph on `/dock/overview` (Chrome ANGLE-Metal Apple M5 Max, Chrome 149 + WebKit 26.4), both modes. FAIL. The collapsed-REST clause PASSES on Chrome (58–59px square, aspect 1.0, `border-radius:9999px`, undistorted 20×20 glyph, `morphing=null`, `scale=1` — the standing sliver-at-rest bug IS fixed on Chrome), but the mid-morph glyph-rigidity clause and the WebKit settle-latency both FAIL. 6 punch PNGs + 2 Safari 2880×1800 + 4 frame-series JSON resolve on disk; Safari statics badge-provenanced (ENGINE WEBKIT).

Scorecard:
- **(b) collapsed REST — PASS on Chrome:** 58–59px square, aspect 1.0, `border-radius:9999px`, undistorted glyph, `scale=1`. Evidence: `punch-{light,dark}-01-collapsed-rest.png`.
- **PRIMARY FAIL — the ±5% mid-morph glyph-rigidity clause** (IOS27-MOTION-TRUTH §"in ANY frame, mid-morph AND rest"): per-frame glyph-bbox aspect reaches **1.4884 (+48.8%, ≈10× the ±5% bar)** for the ENTIRE `[data-punching]` window (~t0→107ms, first 6–9 morph frames) on BOTH engines, BOTH modes, BOTH directions (collapse+expand). Root cause (math airtight, measured==derived): the `.dock-persistent`/`.dock-layers` counter-scale in `shape.css` inverts ONLY `--dock-size-scale`, leaving `--stretch × --dock-punch-stretch` uncompensated → effective glyph aspect `(stretch×punch)² = 1.22² = 1.4884`. The author comment deliberately excluded punch/stretch calling it "sub-perceptual" — +48.8% is not. Painted evidence: `punch-{light,dark}-02-midmorph-glyph-stretched.png` show a visibly wide/squashed home glyph.
- **SECONDARY FAIL — WebKit settle-latency:** `[data-morphing]` + `scale:0.196 1` (a 44×59 aspect-0.75 sliver-at-rest) persists ~800–1000ms past collapse before seating the 59×59 circle; Chrome settles cleanly.
- **Gate blind spot:** `proof:dock` G1 checks the CSS rule TEXT only (asserts the inverse decl exists) and cannot see the `(stretch×punch)²` residual — GREEN gate over broken paint, the exact headless-green/visually-broken gap this non-local screencast witness was owed.

**mustFix (for a build-fix-agent — NOT this synthesis agent):**
1. Neutralize the punch/stretch residual on the rigid content (invert the FULL morph-axis factor `1/(size×stretch×punch)` with Y=stretch×punch, OR clip-aperture the plate over the reserved footprint) so `glyphAspect ∈ [0.95,1.05]` every frame incl `[data-punching]`, both engines/modes. Source: `src/styles/dock/shape.css` (content counter-scale rules ~line 205; root box-scale 156–164).
2. Drop the morph residual promptly on WebKit so collapsed rest is the 59×59 circle within one settle beat. Source: `src/components/custom/dock/composables/dockMorphContext.ts` (`maybeSettleRoot`, WebKit settle timing).
3. Upgrade `proof:dock` G1 to the painted-measure (born-RED per-frame glyph-bbox screencast) so the residual REDs on the number.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-GLYPH-RIGID-DELTA.md`
- 6 PNGs: `docs/tranches/BG/audit/visual/glyph-rigid/punch-{light,dark}-0{1,2}-*.png` + `glyph-rigid-safari-{light,dark}-desktop.png` (2880×1800)
- 4 JSON: `docs/tranches/BG/audit/visual/glyph-rigid/frameseries-{chrome,webkit}-{light,dark}.json`

#### F3.R2 — BG.W-DOCK-PANE-OVERLAP (cursor held PENDING with DELTA, src SHAs preserved; recorded `9347b945`)

Dual-engine paint judge of the DockLayerGroup pane-swap on `/dock/layers` (Chrome CDP real Metal M5 Max + Safari off-screen WKWebView), both modes. FAIL. The OVERLAPPED OPACITY CROSSFADE is CORRECT and PASSES (P1 entering engages t≈0.15 · P2 leaving persists t≈0.6 · CO 3 co-present >0.3-alpha frames · DZ no dead-zone · SWAP overlapped handoff — all green both modes; the sequential-out→blank→in dead-zone + double-exposure ghost §2.2 named are closed on the opacity axis). But the BOX FLIP criterion FAILS in both modes on both nested cases. 6 PNGs + 2 JSON resolve on disk.

Scorecard:
- **Opacity crossfade — PASS both modes:** P1/P2/CO/DZ/SWAP all green.
- **STRUCTURAL FACT:** on `/dock/layers` EVERY DockLayerGroup is nested-in-a-`<GlassDock>` (`standaloneGroupCount=0`), so `useLayerTransition`'s `--dock-stack-morph-reserve`/clip-reveal (the P3 claim's standalone path) never engages on this route; the box is the orchestrator `--dock-live` convex blend.
- **P3 box FLIP — FAIL:** a pure LAYER SWAP on an already-expanded dock (`--dock-expand-t`=1 at rest) makes the VISIBLE plate box COLLAPSE to the 53.68px collapsed-pill then re-expand — `restPlateW 269.12→minPlateW 53.68` (`dipRatioOfRest 0.199`, 31 dip frames), the §2.2 "box dips below both endpoints" defect MORE extreme (full collapse). Reproduces in NON-capture mode (not a `?capture` artifact). Root cause: `dockMorphContext.onSwap`→`ensureSpringRunning` seats `--dock-morph-t:0` (the collapsed endpoint) + springs 0→1, so `--dock-expand-t` (morph.css `= --dock-morph-t`) cycles 0→1 → the layers.css `--dock-live` convex blend plays a spurious collapse→expand on a pane swap.
- **SCOPE gap:** the builder's P3 standalone-reserve/clip-reveal box-FLIP claim is never exercised on `/dock/layers` (`standaloneGroupCount=0`), so `proof:dock`'s P3 arm greened on a path this route does not paint; the actual painted box is the orchestrator convex blend carrying the collapse defect.

Engine note: WebKit frame-series unmeasurable (off-screen WKWebView throttles rAF → the `SpringProgress` `--dock-morph-t` glide freezes at 0), so the binding computational box-FLIP truth is the Chrome CDP on-screen Metal measure (engine-agnostic CSS/spring cascade); the WebKit leg supplies settled-paint provenance + engine badge.

**mustFix (for a build-fix-agent — NOT this synthesis agent):**
1. Decouple the layer-swap crossfade scalar from the collapse/expand box scalar (OR gate the `--dock-morph-t:0` seat to genuine collapse/expand transitions only) so a pure layer swap does NOT cycle `--dock-expand-t` 0→1 on an already-expanded nested dock. Source: `dockMorphContext.onSwap`→`ensureSpringRunning` + morph.css `--dock-expand-t` derivation + layers.css `--dock-live` convex blend.
2. Ensure the box FLIP interpolates MONOTONICALLY between the pane endpoints (~212–269px) — no dip below both endpoints, no full collapse to the 53.68px pill.
3. Verify on the all-nested `/dock/layers` route (the P3 standalone path is not exercised here) — the fix must land on the orchestrator convex-blend path this route actually paints.

Captures:
- DELTA (carries `defectLocalization` + `mustFix`): `docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-DELTA.md`
- 6 PNGs: `docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-paint/paneloverlap-{layers,midswap}-{chrome,safari}-{light,dark}.png`
- 2 JSON: `docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-paint/{chrome-frameseries,verdict}.json`

---

## 2026-07-04 — NO-MASKING-FALLBACK + IOS27-MOTION-TRUTH overlay/drawer batch (rows NF.1 / F5.R1 / F5.R2)

allPass: **false** — 2 PASS, 1 FAIL. The overlay EXIT-does-not-paint defect holds row F5.R1 at PENDING (paint FAIL, fix owed); the Dialog/Popover `.glass-reveal` close is a CSS transition reka `usePresence` tears down before it can paint.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-FALLBACK-EXCISE | NF.1 | PASS | DONE |
| BG.W-OVERLAY-ENTER-PAINT | F5.R1 | FAIL | PENDING (paint FAIL, fix owed) |
| BG.W-DRAWER-PAINT-BIND | F5.R2 | PASS | DONE |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader) on FALLBACK-EXCISE / `ANGLE-SwiftShader` on the two LIVE-rAF motion judges (headless frame-series harness); WebKit = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server). `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: row NF.1 reads DONE (paint agent flipped PAINT-PENDING -> DONE, `71f6d19b`); row F5.R2 reads DONE (flipped PAINT-PENDING -> DONE, `c0176542`); row F5.R1 reads PENDING (flipped PAINT-PENDING -> PENDING, paint FAIL, src SHAs preserved, `dba0ddb4`). No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### NF.1 — BG.W-FALLBACK-EXCISE (commit `71f6d19b`)

The NO-MASKING-FALLBACK zero-delta dock purge is fail-VISIBLE in paint: every dock reads a plausibly-expanded/collapsed REAL glass state, NEVER unset chrome — a broken class binding can no longer be masked away. Dual-engine (Chrome ANGLE-Metal M5 Max via CDP + Safari/WebKit off-screen WKWebView system Metal), BOTH modes, over the BUILT demo dist on `:5200`.

- 16/16 PNGs `isRealPng=true`, dims correct: 3 routes (/dock/overview · /dock/morph-showcase · /dock/layers) desktop 2880×1800 + coarse-pointer mobile 402×874@3x for the C3 tap-floor leg.
- COMPUTED-DOM fail-VISIBLE purge: `--dock-expand-t` resolves to `"1"` on 46/46 docks across all 3 routes × 2 modes (never empty/unset — the masking-away read is structurally impossible post-purge); `--dock-morph-t=0.000` real scalar painted on the morph route; every dock plate paints a real translucent glass bg (srgb .../0.52 light, .../0.56 dark), non-degenerate box, 0 transparent/sliver/flagged; the collapse<->expand frame-series (17 samples ×2 modes) stays plausibly-painted at every frame.
- C3 tap-floor (forced `pointer:coarse` via CDP, mobile 402×874@3x): `matchMedia coarse=true`, `--dock-touch-target=2.75rem`(44px); in-dock `.dock-icon-button` visible min box 46.8×46.8px (density clamp); `.dock-select/dropdown-trigger` (visible box 25.3px tall — the census 32×24 defect) gets a transparent centered `::after` hit-slop H=44/W>=75.7 -> effective tap >=44px both axes, both modes.
- Visual: recessive warm aurora (soft gradient, no conic banding/oversaturation), calm grain, docks read as liquid glass over a live field, dark register luminous-transmissive, hero fits envelope. Provenance badges decoded: CHROME/ANGLE Metal M5 Max, WEBKIT/Apple GPU. Sibling+minted gates GREEN on the integrated tree: `proof:no-masking-fallback` (exit 0, 6 self-test bites flagged), `proof:dock-engine-unify` (exit 0, U3 busy-single set/read/clear=true, no bool shadow), `proof:dock-morph-family` (exit 0, F6 OK).
- Non-blocking observation (NOT a defect, out of scope for the zero-delta purge): /dock/overview's collapsible feature dock rendered expanded (4-icon pill) in Chrome but collapsed (perfect-circle home glyph) in WebKit — a benign cross-engine capture-timing difference of the hover-to-expand default; both are valid real glass states, neither unset chrome — precisely the fail-VISIBLE property this wave guarantees.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-FALLBACK-EXCISE-DELTA.md`
- 16 PNGs: `docs/tranches/BG/audit/visual/BG.W-FALLBACK-EXCISE-paint/fallback-excise-{dock_overview,dock_morph-showcase,dock_layers}-{chrome,safari}-{light,dark}.png` (+ `fallback-excise-{dock_overview,dock_layers}-coarse-{light,dark}.png`)
- Probes: `BG.W-FALLBACK-EXCISE-paint/chrome-probe.json` · `BG.W-FALLBACK-EXCISE-paint/coarse-probe.json`

#### F5.R2 — BG.W-DRAWER-PAINT-BIND (commit `c0176542`)

The drawer model<->paint SEVER is repaired in paint: `--glass-drawer-t` is WRITTEN across the whole gesture (the born-RED dead-writer CLEARED). DUAL-ENGINE PASS (Chrome/Blink ANGLE-SwiftShader + system Safari/WebKit.framework Metal, BOTH modes), LIVE-GESTURE rAF frame-series over BUILT `:5200` on /compositions/drawer-live-behind — NEVER a settled capture.

- All 3 π criteria clear both engines/modes: (1) open-at-half -> `translateY(50%)` EXACT (scalar 0.5, ty 450/900, 0% err vs ±2%); (2) 1:1 drag ratio 1.000 (Δty 160px for a 160px finger; WebKit perfect 13.33px steps); (3) release-snap animates >=6 frames no-overshoot-past-viewport (Chrome 40/36 distinct, WebKit ~9/10, smooth settle 0.678->0.500, min ~0.494 = the SANCTIONED ~3% DRAWER_SNAP{0.5,0.74} BD-retune liquid give [spec-cited {0.4,0.82} superseded], max 0.678<1.0 so no shoot past full).
- NO-MASKING-FALLBACK verified in source: `@property --glass-drawer-t` `initial-value:0` + `transform var(--glass-drawer-t,0)`.
- Visual (all 4 engine×mode PNGs, 2880×1800, isRealPng): sheet seated at 50% with the page LIVE + visible through the translucent glass (refutes BOTH the offscreen dead-writer AND a full-open masking-fallback), warm-cream/luminous-dark identity, recessive backdrop no conic/oversaturation, hero fits envelope.
- OBSERVATION (out of this wave's 3 criteria — routed to W-ANIMATION-CONGRUENCE 17.4 + W-OVERLAY-ENTER-PAINT F5.R1): the open-settle + button-driven external re-snap POP instantly (0 intermediate frames at 120fps, PRM off) — ONLY the manual drag-RELEASE animates. Asymmetry is code-path (`onPointerUp` calls `ensureSpring().reset(live,0)` which re-seats the spring timeline; the open-watch `ensureSpring(0)+settleTo` and the `activeSnapPoint` watch set `.target` without a re-seat). NOT a defect of this wave (open-at-half is a SEAT/position check — met; the animation check is the drag-release snap — met).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DRAWER-PAINT-BIND-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/drawer-chrome-{light,dark}-{seated-half,drag-peak,post-snap}.png` · `docs/tranches/BG/audit/visual/drawer-safari-{light,dark}-open.png`

---

### FAILED -> PENDING (row F5.R1, paint FAIL, fix owed)

#### F5.R1 — BG.W-OVERLAY-ENTER-PAINT (cursor flipped PAINT-PENDING -> PENDING, paint FAIL; src SHAs preserved; recorded `dba0ddb4`)

Non-authoring dual-engine paint judge, LIVE rAF frame-series (Chrome/Blink ANGLE-SwiftShader + real Safari/WebKit Apple-GPU-Metal, BOTH modes, /containers dialog+sheet+popover). ENTER passes decisively; EXIT does not paint for Dialog + Popover — the exit criterion is UNMET, so the wave FAILS.

- **ENTER — PASS all 3 surfaces both engines both modes.** Dialog+Popover paint a real coupled bloom: scale 0.93/0.83->1, filter blur(4px)->blur(0), opacity 0->1 on the snappy `linear()` spring (1.03 overshoot interior = iOS arrival), >=6 intermediate frames (Blink 6-18, WebKit 27-31). Sheet slides via `sheet-animate` (translate). `@starting-style` interpolates in BOTH Blink and WebKit. The born-RED one-frame ~44ms pop is genuinely fixed; the ~85ms mid-bloom capture shows the panel mid-materialize with the scrim only partially dimmed — a true in-flight bloom, not settled.
- **EXIT — FAIL for Dialog + Popover** (0 painted frames, both engines both modes); Sheet PASS (4-20 frames). Root cause (mechanically confirmed via MutationObserver + reka source): reka-ui `usePresence` (`node_modules/reka-ui/dist/Presence/usePresence.js:44`) dispatches UNMOUNT immediately when `getComputedStyle(node).animationName === "none"`. The `.glass-reveal[data-state=closed]` exit is a CSS TRANSITION (animationName none), so the Dialog/Popover content is removed ~11ms after `data-state->closed` — the exit transition never paints. The pass condition explicitly requires "exit paints >=4 frames >=... <=150ms no-overshoot, Dialog+Sheet+Popover" — UNMET. Sheet is immune because `sheet-animate` is a `@keyframes` animation reka awaits.
- **SECONDARY (scrim):** the demo scrim is the reka DialogOverlay div (`sheet-animate` 0.55s), coupled/concurrent with the panel from launch (NOT the trailing-400ms HEAD defect) but reaches 80% dim at ~257-392ms not ~100ms. The wave's O4 `dialog.glass-top-layer[open]::backdrop` fast-clock targets a native `<dialog>` the /containers routes never mount, so the <=100ms fast-dim is unobservable in the painted demo.

Gate blind spot: `proof:motion` overlay-enter-paint arm is a SOURCE check (verifies the `@starting-style` block exists) and cannot see reka unmounting the transition-exit — the source-green/paint-broken gap this judge caught.

**mustFix (for a build-fix-agent — NOT this synthesis agent):**
1. Give the `.glass-reveal` EXIT a `@keyframes glass-reveal-out` (scale/opacity/filter on `--ease-out` <=150ms) applied on `[data-state=closed]` so `animationName != none` and reka `usePresence` awaits `animationend` (the Sheet precedent) — the ENTER `@starting-style` stays as-is. Re-verify Dialog+Popover exit paints >=4 frames <=150ms no-overshoot both engines both modes.
2. (Secondary, optional) surface the scrim fast-dim on the actual /containers Dialog path — the O4 native-`<dialog>::backdrop` clock is unobservable there; couple the reka DialogOverlay div dim to reach >=80% within ~100ms of launch if the fast-dim is to be witnessed in the painted demo.

PRESERVE (do not regress): the passing ENTER coupled-bloom (scale/blur/opacity on the snappy clock, `@starting-style` interpolating both engines), the working Sheet exit (`sheet-animate` keyframe).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-OVERLAY-ENTER-PAINT-DELTA.md`
- PNGs: `docs/tranches/BG/audit/visual/overlay-enter-paint/chromium-light-dialog-midbloom.png` · `overlay-enter-paint/webkit-dark-popover-settled.png` (+ the full 34-file series under `overlay-enter-paint/`)
- Frame series: `overlay-enter-paint/chromium-light-dialog.frames.json` · `overlay-enter-paint/webkit-light-dialog.frames.json`
- Harness: `BG.W-OVERLAY-ENTER-PAINT-frameseries.mjs` · `BG.W-OVERLAY-ENTER-PAINT-analyze.mjs`

---

## 2026-07-04 — NO-MASKING-FALLBACK ladder + IOS27-MOTION-TRUTH re-judge batch (rows NF.2 / NF.3 / F3.R1 / F5.R1)

allPass: **false** — 2 PASS, 2 FAIL. LEGACY-LADDER-COLLAPSE (the zero-delta legacy-fallback purge) and OVERLAY-ENTER-PAINT (re-judge, exit repair landed) both PASS -> DONE. GLASS-SIGNAL-TRUTH re-judge #2 (the dead dock observer STILL dead in paint) holds row NF.3 at PENDING; DOCK-GLYPH-RIGID re-verification #2 (the full-inverse repair inert against a `@property{inherits:false}` boundary) holds row F3.R1 at PENDING. Both FAILs carry a `defectLocalization` + `mustFix[]` in their DELTA for a build-fix-agent.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-LEGACY-LADDER-COLLAPSE | NF.2 | PASS | DONE |
| BG.W-GLASS-SIGNAL-TRUTH (re-judge #2) | NF.3 | FAIL | PENDING (paint FAIL, fix owed) |
| BG.W-DOCK-GLYPH-RIGID (re-verification #2) | F3.R1 | FAIL | PENDING (paint FAIL, fix owed) |
| BG.W-OVERLAY-ENTER-PAINT (re-judge) | F5.R1 | PASS | DONE |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader) on the LEGACY-LADDER / SIGNAL-TRUTH / DOCK-GLYPH settled-capture legs, and `ANGLE-SwiftShader` on the OVERLAY-ENTER LIVE-rAF frame-series harness (the motion judge that cannot use a settled PNG); WebKit = off-screen WKWebView on system `WebKit.framework` / `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1) + real Safari 26.4 (`AppleWebKit/605.1.15 Version/26.4`) on the DOCK-GLYPH keystones + the OVERLAY-ENTER re-judge. Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200`/`:5199-dist` (vite preview of the demo dist, NOT the `:5199` dev server); the LIVE-rAF motion legs run on the LIVE non-capture route because `capture.css` freezes animation. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: row NF.2 reads DONE (paint agent flipped PAINT-PENDING -> DONE, `f1dadea8`); row F5.R1 reads DONE (flipped PAINT-PENDING -> DONE, `675c98b7`); row NF.3 reads PENDING (flipped PAINT-PENDING -> PENDING, paint FAIL, src SHAs preserved, `e4e7c787`); row F3.R1 reads PENDING (flipped PAINT-PENDING -> PENDING, paint FAIL, src SHAs preserved, `86ed68bc`). No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### NF.2 — BG.W-LEGACY-LADDER-COLLAPSE (commit `f1dadea8`)

The NO-MASKING-FALLBACK legacy-ladder purge is verified zero-delta / no-regression: every one of the 9 collapsed fallback ladders is a PRE-target fallback whose feature is NATIVELY supported on the target engines, so the deleted arms are provably dead and the modern survivors are the sole painters. Dual-engine (Chrome 149 / Metal M5 Max + Safari 26.4 / WebKit-26 Apple GPU), BOTH modes, 4 surfaces.

- 16 captures @2880×1800 [/containers (overlay liquid-enter) · /compositions/form-validation (invalid/valid ring) · /dock/overview (dock scroll-fade) · /motion/scroll-choreography (motion register)] × light+dark × Chrome+Safari, all resolve on disk, in-pixel engine badge (ENGINE/GPU/VIEW/MODE) decoded on every one.
- The deleted arms are provably dead: live `CSS.supports` on Chrome = `:user-invalid`/`:has()`/`animation-timeline:scroll()`/`linear()`/`field-sizing` all TRUE, and BOTH engines paint the in-page feature-detect chips SCROLL()/VIEW()/TIMELINE-SCOPE SUPPORTED green.
- The modern survivors are LIVE + painting (non-capture live probe): 6 live `scroll()` timelines + 10 running anims on /motion/scroll-choreography; dock scroll-fade `--fade-start`/`--fade-end` 0px/16px on `scroll(self inline)`.
- The collapsed signatures (`.user-invalid-fallback`/`.user-valid-fallback`/`.is-focus-within`/`@supports not selector(:has)`) = 0 across all 3586 loaded CSS rules; the modern invalid ring reads `var(--invalid-ring)` (destructive red, both modes) and the `aria-invalid` bridge (a11y KEEP) fires on blur.
- Visual: recessive warm aurora calm (no conic/oversaturation), grain calm, audacious hero fits its envelope, glass translucent (light) / luminous-transmissive (dark) on both engines. `runningAnims:0`/`scrollTimelineCount:0` in the capture-mode probe are intended `capture.css` settle-to-endstate artifacts (confirmed via the live probe), not defects; the collapsible-dock 1-vs-4-glyph rest variance is an unrelated demo hover state.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-LEGACY-LADDER-COLLAPSE-DELTA.md`
- 16 PNGs: `docs/tranches/BG/audit/visual/BG.W-LEGACY-LADDER-COLLAPSE-paint/BG.W-LEGACY-LADDER-COLLAPSE-{chrome,safari}-{containers,form-validation,dock-overview,scroll-choreography}-{light,dark}.png`

#### F5.R1 — BG.W-OVERLAY-ENTER-PAINT re-judge (commit `675c98b7`)

The OWED EXIT verify is MET. After the F5.R1 repair (`.glass-reveal[data-state="closed"]` now rides `@keyframes glass-reveal-out`, shipped in the built dist-demo CSS), the Dialog+Popover EXIT paints ≥4 no-overshoot frames in BOTH engines BOTH modes on `/containers` — closing the born-RED 0-exit-frame FAIL the prior judge found (reka `usePresence` unmounting a transition-only exit before it painted; see the 2026-07-04 overlay/drawer batch above where this same row logged FAIL).

- METHOD: LIVE rAF computed-style frame-series on the LIVE (non-capture) `/containers/{dialog,sheet,popover}` routes over a fresh `demo:dist:build` served on :5200 — the correct instrument for a motion wave (the settled-PNG pipeline cannot witness an exit animation; the criteria demand LIVE rAF frame-series, NEVER a settled capture). Two genuinely distinct engines: Chrome/Blink (HeadlessChrome-148, ANGLE-SwiftShader) and real Safari/WebKit (AppleWebKit/605.1.15 Version/26.4, Apple GPU/Metal); `@starting-style` supported in both.
- EXIT (12/12 series PASS): opacity descends monotonically 1->0, scaleX shrinks to ~0.933 (= `--glass-reveal-enter-scale` 0.88 × `--lq-stretch-x` 1.06, exactly the keyframe `to`), filter blur grows 0->4px (= `--glass-reveal-blur`), no overshoot. Frame counts: Blink dialog 6f / popover 13-14f / sheet 5-7f; WebKit dialog+popover+sheet 19-20f — all ≥4. Sheet exits via its translate slide-out (scaleX 1 / blur 0 expected).
- ENTER un-regressed (12/12 PASS): coupled bloom scale 0.933->1 + blur 4->0 + opacity 0->1, ≥6 intermediate frames both engines both modes (Blink 6-18, WebKit 25-31). Settled PNG spot-checks confirm real overlay content renders (warm-cream glass Dialog on Blink/light; Dimensions glass Popover on WebKit/dark).
- SECONDARY (non-blocking, NOT part of this EXIT pass condition): the modal scrim is coupled/concurrent from launch (not the trailing-400ms HEAD defect) but reaches 80% dim at ~247-342ms, not ~100ms — the wave's O4 fast-dim targets a native `<dialog class=glass-top-layer>::backdrop` the `/containers` routes never mount, so it is off-surface for the demo. Recorded for a future wave.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-OVERLAY-ENTER-PAINT-DELTA.md`
- 12 frame-series JSON + 12 settled PNGs (real 326KB-2.65MB): `docs/tranches/BG/audit/visual/overlay-enter-paint-rejudge/{chromium,webkit}-{light,dark}-{dialog,sheet,popover}.frames.json` · `…-settled.png`

---

### FAILED -> PENDING (rows NF.3, F3.R1 — paint FAIL, fix owed)

#### NF.3 — BG.W-GLASS-SIGNAL-TRUTH re-judge #2 (cursor flipped PAINT-PENDING -> PENDING, paint FAIL; src SHAs preserved; recorded `e4e7c787`)

The M8/ST5 runtime fix (reactive `backgroundCanvas` getter + `isLive`-considers-canvas + `normalizeToRgb` static floor) landed in source and `proof:glass` is GREEN device-free, but it did NOT change the PAINTED outcome — the born-RED FAIL this wave was built to close STILL reproduces in paint. Dual-engine (Chrome ANGLE-Metal M5 Max + Safari WebKit Apple GPU, no SwiftShader), both modes.

- **CENTRAL FAIL (ST3):** on `/dock/overview` (the flagship route the criteria name), 0 of 12 GlassDocks fire the writer-fired witness — both modes, both engines. Every dock: `data-glass-sample=null`, `isLive()=false`, inline `--glass-backdrop-luma=(none)` [computed 0 = the `@property` initial, not a real write], `--glass-ambient-hue=rgba(0,0,0,0)`, `--glass-ambient-strength=0%`, `data-backdrop-sampled` absent. Polled at `data-capture-ready` AND +3s (identical); PRM false; zero console errors — not a timing artifact. The "ambient-hue catch-light where the dock observer fires" is unfulfilled on its own flagship route.
- **CONTROL (proves the composable works):** on `/substrates/glass-material` the demo glass-card wired with explicit `live:true` + a handed `backgroundCanvas` DOES stamp the witness (`--glass-backdrop-sampled:1`, `data-backdrop-sampled` present) both modes both engines — so the write path is intact; the failure is dock-specific.
- Other criteria: ST2 PASS (dead `--glass-backdrop-hue` resolves empty/absent at `:root` all routes/modes/engines — one hue channel, one writer). ST1 N/A (no `.glass-clear` plate renders on either wave route; source-green + gate-green but not pixel-exercised). ST4 PARTIAL (the declarative `@container` bucket FLOOR paints — docks read as translucent glass over the warm DockStage aurora, no conic/oversaturation, grain calm, hero fits envelope — but the observer refinement never engages because ST3 is dead).

Root-cause localization (for the build-fix-agent, recorded in the DELTA): (1) primary — `isLive()` is evaluated ONLY at mount (`useGlassBackdropLuminance.ts:459-467`); DockStage's `backgroundCanvas=computed(()=>auroraRef.value?.canvasRef??null)` (`DockStage.vue:53-55`) is null when the dock's setup runs (the Aurora child mounts AFTER), so `isLive()=false`, `loop.start()` never fires, and no watcher re-arms when `canvasRef` flips null->canvas post-mount. (2) secondary — even the static mount write (`sampleStatic` -> bodyBg `rgba(0,0,0,0)` -> `normalizeToRgb [0,0,0,0]` -> luma 0 -> write) never lands the witness on any of the 12 docks. (3) contributing — auto-discovery can't rescue (SHELL_FIELD_CANVAS_SELECTOR resolves nothing in capture mode; neither DockStage aurora canvas carries `data-glass-field-canvas`). (4) even the working control card writes luma 0 / hue transparent (`drawImage` of a WebGL canvas without `preserveDrawingBuffer` reads black) — so when the dock observer IS made to fire, the animated readback must ALSO be verified to yield a real nonzero warm luma+hue.

mustFix (for a build-fix-agent — NOT this synthesis agent): (1) re-arm the observer when the reactive `backgroundCanvas` getter resolves null->canvas post-mount (a watcher on the getter that starts the live loop), so `sampleAnimated` becomes reachable for docks; (2) verify the animated readback yields a real nonzero warm field luma+hue (address the `preserveDrawingBuffer`/black-drawImage floor); (3) bind the live root-vs-witness differential as the born-RED π (the device-free `proof:glass` arm greens while the paint stays dead). PRESERVE: ST2 (one hue channel, one writer), the ST4 declarative-bucket floor, the working control-card write path.

Captures:
- DELTA (carries `defectLocalization` + `mustFix[]`): `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-DELTA.md`
- 12 PNGs (2 wave routes /dock/overview + /substrates/glass-material + the /display/buttons context, × light+dark × Chrome+Safari @2880×1800, git-tracked): `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-paint/BG.W-GLASS-SIGNAL-TRUTH-{chrome,safari}-{dock-overview,glass-material,display-buttons}-{light,dark}.png`

#### F3.R1 — BG.W-DOCK-GLYPH-RIGID re-verification #2 (cursor flipped PAINT-PENDING -> PENDING, paint FAIL; src SHAs preserved; recorded `86ed68bc`)

The integrated F3.R1 full-inverse repair is INERT in paint: the composited dock glyph aspect STILL reaches **1.4884 (+48.84%)** through the `[data-punching]` overshoot on Chrome 149 ANGLE-Metal AND WebKit 26.4, light AND dark, collapse AND expand — byte-identical to the prior FAIL, ~10× the wave's own ±5% per-frame bar.

- **ROOT CAUSE (proven live via `liveprobe-inherit.mjs`):** `--dock-punch-stretch` is registered `@property {inherits:false; initial-value:1}` (`src/styles/dock/shape.css:41-45`, confirmed in built CSS). The F3.R1 content counter-scale rule on `.dock-persistent`/`.dock-layers` reads `var(--dock-punch-stretch,1)` at the CHILD, which resolves to the initial `1` (measured `child_punch=1`) not the root's overshoot (measured `root_punch=1.22`). At the punch peak the child's computed scale is identity (`childScale="1"`), so the punch factor is never compensated and the glyph inherits the full root box-scale 1.22/0.8197 = 1.4884. The CSS-string "full inverse" silently degrades to the size-only inverse it was meant to replace; the fix cannot reach the `@property` inheritance boundary. `.dock-persistent` IS a direct child of `.glass-dock` (combinator matches), so this is an inheritance defect, not a selector/authoring slip.
- **PASSING sub-clauses:** collapsed/expanded REST on BOTH engines = clean 1:1 circle (58-59×58-59, aspect 1.0), undistorted 20×20 glyph, border-radius 9999px, `morphing=null`. The SECONDARY G3 arrival-settle DID land — WebKit collapsed rest reads the clean 59×59 circle `morphing=null` at +600ms, the prior ~1s sliver-at-rest tail gone. But the PRIMARY per-frame ±5% clause fails decisively, so overall FAIL.
- **GATE-GAP:** `proof:dock` G1 checks the CSS rule TEXT (both scale components present) and cannot see the `inherits:false` resolution, so it greens while the composited glyph distorts.

mustFix (for a build-fix-agent): make the punch/stretch factor readable by the rigid content (an `inherits:true` twin OR a separate dock-WRITTEN inheriting inverse scalar OR a clip-aperture plate morph over the reserved footprint) so per-frame glyph aspect ∈ [0.95,1.05] EVERY frame incl. the overshoot, both engines both modes; + bind the live root-vs-child computed `--dock-punch-stretch` differential (or the per-frame glyph-bbox frame-series) as the born-RED π (the gate's G1 checks rule TEXT only and cannot see the `inherits:false` resolution). PRESERVE: the passing collapsed/expanded REST 1:1 circle + the landed G3 arrival-settle.

Captures:
- DELTA (carries `defectLocalization` + `mustFix`): `docs/tranches/BG/audit/visual/BG.W-DOCK-GLYPH-RIGID-DELTA.md`
- PNGs + witnesses under `docs/tranches/BG/audit/visual/glyph-rigid/`: `glyph-rigid-safari-{light,dark}-desktop.png` · `punch-{light,dark}-02-midmorph-glyph-stretched.png` · `punch-{light,dark}-01-collapsed-rest.png`
- Frame series (worst=1.4884): `glyph-rigid/frameseries-{chrome,webkit}-{light,dark}.json`
- Live probe: `glyph-rigid/liveprobe-inherit.mjs` (root_punch=1.22 vs child_punch=1, childScale=1)

---

## 2026-07-04 — IOS27-MOTION-TRUTH dock-morph re-judge #2 batch (rows F3.R1 / F3.R2 / NF.3)

allPass: **false** — 2 PASS, 1 FAIL. The two dock-morph repairs PASS dual-engine and flip to DONE — glyph-rigid closed by the `@property --dock-punch-stretch` `inherits:false→true` flip, pane-overlap closed by the `--dock-expand-t` `:not([data-pane-swap])` decouple. The GLASS-SIGNAL-TRUTH ST3 dead-observer holds row NF.3 at PENDING: the M8-runtime part-2 loop-arm fix (`wantsLiveLoop` + `preserveDrawingBuffer`) did NOT change the paint — 0 of 12 docks fire the writer-witness.

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-DOCK-GLYPH-RIGID | F3.R1 | PASS | DONE |
| BG.W-DOCK-PANE-OVERLAP | F3.R2 | PASS | DONE |
| BG.W-GLASS-SIGNAL-TRUTH | NF.3 | FAIL | PENDING (held) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader) + WebKit 26.4 (Playwright) + Safari system-WebKit keystone on `Apple GPU`/Metal (no `Version/` token → load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server); the glyph-rigid + pane-overlap passes ride LIVE rAF frame-series / trusted-click screencast (the correct instrument for a motion wave — a settled PNG cannot witness a per-frame morph). `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: rows F3.R1 + F3.R2 already read DONE (the paint agents flipped them in-run — commits `b666939b` / `f5c3ff4b`); row NF.3 remains PENDING (paint FAIL, commit `34a04a94`). No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### F3.R1 — BG.W-DOCK-GLYPH-RIGID re-verification #3 (commit `b666939b`)

The F3.R1 INHERITANCE-gap root cause is CLOSED in paint: `shape.css` `@property --dock-punch-stretch` flipped `inherits:false → true`, so the rigid-content inverse rule reads the dock ROOT's live punch overshoot at the child `.dock-persistent`/`.dock-layers` and CANCELS it — the full-inverse restored, the `(--dock-punch-stretch)²` = 1.4884 (+48.84%) residual gone. Dual-engine (Chrome 149 ANGLE-Metal Apple M5 Max + WebKit 26.4 Playwright + Safari system-WebKit keystone), both modes, fresh `npm run demo:dist:build` on `:5200` (built CSS confirmed carrying `@property --dock-punch-stretch{…inherits:true…}` — the landed fix vs the prior FAIL's `inherits:false`).

- Per-frame glyph-bbox rAF π across all 4 surfaces: worst glyphAspect = **1.0**, **0/518** morph frames out of the ±5% band — WHILE the morph genuinely fired (24–30 `[data-morphing]` frames/direction, pillW sweeping 45→257px), the plate genuinely deformed (rootScale X 1.11→0.32), and the punch overshoot was genuinely present (plate cross-axis Y pinned at 0.819672 = 1/1.22).
- Born-RED root-vs-child differential CLOSED (`liveprobe-inherit.mjs`, punch peak t=3605ms, `[data-punching]` present): root_punch = 1.22 AND child_punch = 1.22 (the child now inherits the root's live overshoot — was 1 in the FAIL); rootScale "1.22 0.819672" × childScale "0.819672 1.22" = (1.0, 1.0) exact cancel, glyphAsp 1.0. The prior FAIL's +48.84% residual is gone.
- Collapsed REST all engines: 59×59, pillAspect 1.0, glyphAspect 1.0, border-radius 9999px, morphing=null (the AY.W-DOCK-NAV B4 circle). Expanded rest + after-expand glyphAspect 1.0.
- Safari system-WebKit keystones both modes: in-pixel badge decoded (ENGINE WEBKIT / GPU Apple GPU / VIEW 1440×900 @2x); route correct; collapsed dock = clean circle + undistorted glyph; recessive DockStage aurora (warm-cream light / luminous near-black dark, no conic, no oversaturation, grain calm); hero fits its envelope.
- Chrome mid-morph pixel witnesses both modes: plate deforming (rootScale X=0.32, Y=1/1.22) with the home glyph UNDISTORTED (aspect 1.0) — the rigid-content-over-morphing-plate contract in pixels.
- Gate HARDENED with the new G4 arm binding the `@property` inheritance flag the G1 text-check could not see (born-RED on `inherits:false`); `proof:dock` GREEN — G4 inherits=true, 28 self-test bites, vue-tsc clean.

Anti-evasion: every capture PNG resolves on disk as a valid PNG (2× 2880×1800 Safari keystones + 4× Chrome punch PNGs); all 4 frameseries JSON valid.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-GLYPH-RIGID-DELTA.md` (FAIL→PASS)
- 6 PNGs: `docs/tranches/BG/audit/visual/glyph-rigid/{glyph-rigid-safari-{light,dark}-desktop.png, punch-{light,dark}-{01-collapsed-rest,02-midmorph-rigid-glyph}.png}`
- 4 frameseries JSON: `docs/tranches/BG/audit/visual/glyph-rigid/frameseries-{chrome,webkit}-{light,dark}.json`

#### F3.R2 — BG.W-DOCK-PANE-OVERLAP re-judge (commit `f5c3ff4b`)

The §2.2 box-collapse-on-a-nested-pane-swap root cause is CLOSED: `--dock-expand-t` is DECOUPLED from the pane-swap crossfade (the three `[data-morphing]` derivation arms scoped `:not([data-pane-swap])`; `dockMorphContext` distinguishes the OUTER collapse↔expand target `isOuter:true` from a NESTED `<DockLayerGroup>` pane-swap, arming `data-pane-swap` only on the nested swap). Fresh non-authoring dual-engine re-judge (Chrome CDP real Metal + Safari WKWebView), both modes, both nested cases.

- BINDING box-flip-monotonic π (Chrome CDP on-screen ANGLE Metal Renderer Apple M5 Max, trusted-click rAF frame-series): the visible `.glass-dock` plate box HOLDS the expanded 269.12px footprint across all 31 morph frames — `min==max==269.12`, **0 dip frames**, `--dock-expand-t` pinned at 1. The prior FAIL (same day) had min 53.68px / 31 dip frames / dipRatioOfRest 0.199 / expand-t cycling to 0 — the §2.2 box-collapse defect is CLOSED. Verified in BOTH light+dark on BOTH cases (dock-layer-rail-group always-expanded + dock-nested-collapsible-group). `verdict.json overallPass:true`.
- Overlapped opacity crossfade stays green (the part that already passed): P1 entering engages t≈0.15 → ramps to 1.0; P2 leaving persists to t≈0.5; CO 3 co-present >0.3-alpha frames; DZ 0 dead-zone frames; SWAP enter≥0.5@t≈0.41 while leave 0.32.
- Computed structure both modes: 5 DockLayerGroups all nested (standaloneGroupCount=0 — the orchestrator convex-blend box path the fix guards), glCount=0 (recessive CSS/2D aurora field, no conic/oversaturation), mainChildren=2, three CSS rules (overlap/enter/reserve) resolve true.
- Settled paint verified correct both engines both modes (hero fits envelope, blurb, recessive DockStage field, left nav dock, bottom nav dock, all 5 DockLayerGroup expanded plates); provenance decoded from the top-left engine badge (CHROME · ANGLE Metal Renderer Apple M5 Max + WEBKIT · Apple GPU, LIGHT+DARK).
- Gate HARDENED with the new P4 arm binding the CSS-guard + the orchestrator's isOuter/data-pane-swap seam the P3 box-flip check could not see (born-RED on HEAD's unguarded derivation); `proof:dock` GREEN — P4 cssGuarded/isOuter/swapFlag/paneSwapAttr all true, 32 self-test bites, vue-tsc clean.

Anti-evasion: all 4 settled PNGs `isRealPng:true` (89504e47 sig), 2880×1800, mode-differentiated, resolve on disk; `chrome-frameseries.json` + `verdict.json` valid.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-DELTA.md` (rewritten to PASS)
- 4 PNGs: `docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-paint/paneloverlap-layers-{chrome,safari}-{light,dark}.png`
- Witnesses: `BG.W-DOCK-PANE-OVERLAP-paint/chrome-frameseries.json` · `BG.W-DOCK-PANE-OVERLAP-paint/verdict.json`

---

### FAILED -> PENDING (row NF.3 — paint FAIL, fix owed)

#### NF.3 — BG.W-GLASS-SIGNAL-TRUTH re-judge #2 (cursor held PENDING; paint FAIL; src SHAs preserved; recorded `34a04a94`)

The M8-runtime part-2 loop-arm fix (`wantsLiveLoop` + `preserveDrawingBuffer`) landed on `tranche/BG` at HEAD `22af965b` (fix `d785cba2` integrated) and `proof:glass` is GREEN device-free, but it did NOT change the PAINTED outcome — the born-RED FAIL STILL reproduces. Dual-engine (Chrome ANGLE-Metal M5 Max + Safari WebKit Apple GPU, no SwiftShader), both modes.

- **CENTRAL FAIL (ST3):** on `/dock/overview` (the flagship route the criteria name), **0 of 12** GlassDocks fire the writer-witness — both modes both engines. Every dock: no `data-backdrop-sampled`, inline `--glass-backdrop-luma=(none)` [computed 0 = the `@property` initial, not a real write], `--glass-ambient-hue=rgba(0,0,0,0)`. Measured at `data-capture-ready`, +6s (24 loop ticks), AND after a viewport resize — the `wantsLiveLoop` + `preserveDrawingBuffer` fix did not move the paint.
- **ISOLATION (4 in-page probes):** (1) observer code shipped+wired (`wantsLiveLoop` in built bytes; autoLuminance guard passes; ref=dockEl is on the `.glass-dock` written to); (2) the write path works GLOBALLY — the `/substrates/glass-material` control card (explicit `live:true`) DOES stamp the witness in this build; (3) BOTH sample fns return non-null when replicated on a dock (sampleStatic→0.981 opaque near-white, sampleAnimated→1.0), so if `sampleNow` ran it WOULD write; (4) therefore the dock observer `sampleNow()` is inert across mount+loop+resize — the gap is UPSTREAM of the loop-arm predicate.
- **SECONDARY (degenerate readback):** even the control write is DEGENERATE (luma 0 / hue transparent) — the DockStage field WebGL canvas (armed 1928×4809, carries `data-glass-field-canvas`) reads `{r:0,g:0,b:0,a:0}` on `drawImage` despite `preserveDrawingBuffer:true`, so the control card writes luma 0 / hue transparent. Even once the dock observer fires, the ambient-hue catch-light would be degenerate.
- Other criteria: ST1 N/A (no `.glass-clear` plate on the wave route — clear-scrim floor is source-correct + gate-green but never pixel-verified). ST2 PASS (dead `--glass-backdrop-hue` absent). ST4 PARTIAL (declarative-bucket FLOOR paints — docks read as translucent glass over the warm recessive aurora, no conic/oversaturation, grain calm, hero fits envelope — observer refinement dead).
- Pixel gestalt clean (no conic/oversaturation, grain calm, hero fits envelope, both modes both engines). Provenance decoded from PNGs: Chrome badge ANGLE Metal Renderer Apple M5 Max; Safari badge WEBKIT Apple GPU (real GPUs, no SwiftShader). 4 PNGs all 2880×1800, all resolve on disk.

mustFix (for a build-fix-agent — NOT this synthesis agent):
1. Localize why `sampleNow()` is inert for docks — GlassDock.vue:86–104 + useGlassBackdropLuminance.ts:434–443 (sampleNow) / 488–496 (mount watch) / 400–429 (write). The observer is instantiated + the write path works globally + both sample fns return non-null when replicated, yet no dock fires `data-backdrop-sampled`/`--glass-backdrop-luma`/`--glass-ambient-hue` across mount+loop+resize; the gap is upstream of the loop-arm predicate (the `wantsLiveLoop` fix did not reach it).
2. Fix the degenerate animated readback — verify `preserveDrawingBuffer` reaches the WebGL ctx init in the BUILT preview (the field canvas reads `{0,0,0,0}` on `drawImage` despite the M8 `preserveDrawingBuffer:true` handoff) OR adopt a compositing-safe readback, so the ambient-hue catch-light yields a real nonzero warm luma+hue.
3. Bind the live root-vs-witness differential as the born-RED π (the device-free `proof:glass` signal-truth arm greens while the paint stays dead).

PRESERVE (do not regress): ST2 (one hue channel, one writer), the ST4 declarative-bucket floor (docks translucent glass over the warm recessive aurora), the working control-card write path.

Captures:
- DELTA (carries `defectLocalization` + `mustFix[]`): `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-DELTA.md`
- 4 PNGs: `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-paint2/BG.W-GLASS-SIGNAL-TRUTH-{chrome,safari}-dock-overview-{light,dark}.png`
- Deep probe: `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-deepprobe.mjs`

---

## 2026-07-05 — F7 typewriter + F9 blob (PASS) + F3 shell-morph + F5 liquid-weight + F9 dotflow (FAIL) batch (rows 16.2 / F9.R1 / F3.R3 / F5.2 / 6.6)

allPass: **false** — 2 PASS, 3 FAIL. The section-typewriter fade-up register (per-glyph heading × body view()-cascade congruence) and the blob satellite-shade seam both PASS dual-engine and flip to DONE. Three FAILs hold: SHELL-MORPH-PAINT-REPAIR (F3.R3) — the travel-frame repair landed but the settled "horizontal" endpoint is BROKEN and the content re-margin fires NAKED at settle; LIQUID-WEIGHT-DEFAULT (F5.2) — the PRM re-alias is defeated by source-order cascade (vestibular floor broken) + the dock-hover-press is unwired; DOTFLOW-REBUILD (6.6) — the paint-fix targeted the WebGL2 path but both judged engines run the WGSL path, so it is a no-op (Chrome white-out / Safari dead-black persist).

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-SECTION-TYPEWRITER-FADEUP | 16.2 | PASS | DONE |
| BG.W-BLOB-SATELLITE-SHADE | F9.R1 | PASS | DONE |
| BG.W-SHELL-MORPH-PAINT-REPAIR | F3.R3 | FAIL | PENDING (held) |
| BG.W-LIQUID-WEIGHT-DEFAULT | F5.2 | FAIL | PENDING (held) |
| BG.W-DOTFLOW-REBUILD | 6.6 | FAIL | PENDING (held) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit = off-screen WKWebView `.wkshot-bin` and/or Playwright WebKit 26.4 on system `WebKit.framework` / `Apple GPU` (no `Version/` token → load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server); the motion waves (typewriter/shell-morph/liquid-weight) ride LIVE `getAnimations()` / CDP `Page.startScreencast` frame-series — a settled PNG cannot witness a per-frame morph. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; servers + throwaway Chrome torn down by each paint agent; operated only under glass-ui.

Cursor state confirmed at synthesis: rows 16.2 + F9.R1 already read DONE (the paint agents flipped them in-run — commits `fc67f7e8` / `5df908ae`); rows F3.R3 (`a3a9b58b`), F5.2 (`da6e0cf4`), 6.6 (`24c9b072`) remain PENDING (paint FAIL, fix owed, src SHAs preserved). No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### 16.2 — BG.W-SECTION-TYPEWRITER-FADEUP (commit `fc67f7e8`)

The per-glyph heading reveal × body `view()`-cascade CONGRUENCE is PROVEN LIVE, both engines both modes. Non-authoring dual-engine judge (Chrome ANGLE-Metal Apple M5 Max + Safari system-WebKit/Apple GPU).

- π (`getAnimations()`-per-node congruence): neither NAMED route carries a `<StorySection heading>`, so the per-glyph register was measured on the real storybook consuming routes. Live `getAnimations()` on fresh mount: `/containers/accordion` Chrome 14 `gl-char-rise` (heading, per-glyph) + 6 `gl-cascade-build` on a native `view()` ViewTimeline (body) = 81 congruent beats (light+dark); `/containers/dialog` Chrome 27+4 = 102 beats; `/containers/accordion` WebKit (Playwright, supportsView:true) 14+6 = 37 beats. firstCongruent t≈110ms — both registers at the same beat, both engines.
- Structural computed-DOM identical Chrome+WebKit both modes: armed=2/revealed=2 (page-singleton provide-key wired), charAnimName=`gl-char-rise`, charDisplay=inline-block (`:stagger=false` drop, no double `.char-stagger`), `--char-stagger-step`=30ms with idx2 delay 0.06s (DRY off *30ms), bodyAnimName=`gl-cascade-build` on animationTimeline=`view()` (two-register, single anim per node — no double-cascade). T1/T2/T3/T4 all confirmed in paint.
- FOUC-clean: on `/compositions/form-validation` an armed-but-not-revealed below-fold heading resolves glyph opacity:0 + translateY(8.14px) (inverted pre-reveal floor, armed synchronously) — no visible-then-hidden flash; system-WebKit accordion captures show Single/Multiple per-glyph headings fully visible (no stranded opacity:0); mount re-sweep reveals above-fold.
- Named-route gestalt CLEAN both engines both modes: `/display/section` (Section hero + eyebrow labels + tone matrix legible, 5 scroll-cascade `view()` bodies, glContextCount 1) · `/motion/typewriter` (`--motion-accent` violet masthead + TypewriterText typing live, glContextCount 0). Recessive backdrop no conic/no oversaturation, grain calm, hero fits envelope, warm-cream (light) / warm-ember luminous-dark (dark).
- All 10 capture PNGs resolve on disk, real dims (Chrome 1440×900, Safari 2880×1800), non-blank, engine badge decoded in-pixel (4 CHROME/ANGLE-Metal + 6 WEBKIT/Apple-GPU).

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SECTION-TYPEWRITER-FADEUP-DELTA.md`
- 10 PNGs: `docs/tranches/BG/audit/visual/BG.W-SECTION-TYPEWRITER-FADEUP-paint/{section,typewriter}-{chrome,safari}-{light,dark}-desktop-full.png` + `accordion-safari-{light,dark}-desktop-full.png`

#### F9.R1 — BG.W-BLOB-SATELLITE-SHADE (commit `5df908ae`)

The byte-identical default paint renders the canonical warm-cream lit coherent metaball bead; the satellite-shade-over-a-keyed-body-hue derivation reads HUE-FOLLOWING. Dual-engine (real-Metal Chrome M5 Max + real-WebKit Apple GPU + system-Safari-26 provenance), both modes, route `/substrates/blob`.

- Default paint (Chrome light/dark + WebKit light/dark): the canonical warm-cream lit coherent metaball bead — satellites metaballed-in, lit glint + soft shadow, no black slab / no oversaturation.
- Satellite-shade-over-a-keyed-body-hue derivation reads HUE-FOLLOWING across Calm-cream → Excited-red → Shy-teal presets, both modes — one coherent family that tracks the keyed hue, never a clashing floater.
- Seam widen confirmed: `uSatColor[]`/`uSatColorAmt`/`uSatColorActive` uniforms + `blendSatColor()` frag present in dist (goo-blob + goo-dot-matrix mirror), default-OFF early-return → byte-identical; gate `proof:blob-color-equivalence` GREEN 19/19 (born-RED 12a-12e blendSatColor + 13a-13c deriveBlobPalette).
- All 10 capture PNGs resolve on disk.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-BLOB-SATELLITE-SHADE-DELTA.md`
- 10 PNGs: `docs/tranches/BG/audit/visual/blob-satellite-shade/blob-{chrome,webkit,safari}-{light,dark}.png` + `blob-keyed-{excited,shy}-chrome-{light,dark}.png`

---

### FAILED -> PENDING (rows F3.R3, F5.2, 6.6 — paint FAIL, fix owed)

#### F3.R3 — BG.W-SHELL-MORPH-PAINT-REPAIR (cursor held PENDING; paint FAIL; src SHAs preserved; recorded `a3a9b58b`)

The travel-frame repair genuinely LANDED, but the wave's "content re-margin hidden at the occluded midpoint" criterion is NOT met AND the settled "horizontal" endpoint is visually BROKEN — a conjunction failure. Dual-engine (Chrome CDP `connectOverCDP:9477` ANGLE Metal Apple M5 Max + off-screen WKWebView Apple GPU), both modes, routes `/foundations/colors` (content) + `/dock/overview` (dock), both directions. The binding motion π = CDP `Page.startScreencast` frame-series with each painted frame tagged to live `--dock-morph-t` + `--dock-bridge-opacity` (D10 fence honored — no scalar stand-in).

Scorecard: (1) ≥12 painted travel frames/leg → PASS (leg1 V→H 20 distinct / leg2 H→V 18 distinct, all distinct SHA — not a hard swap). (2) teardrop legible 0.18<t<0.82 → PASS (bo ramps 0.03→0.55→1.00 plateau→0.06, 11/12 teardrop-window frames bridge-visible). (3) content re-margin hidden at occluded midpoint → **FAIL** (the 91px full-column re-margin, main left 91↔0, fires AT SETTLE — leg1 t=1 bo=0, leg2 t=0 bo=0, morphing=false — NAKED, teardrop already gone). (4) no in-gesture stall >100ms → PASS (max gap leg1 29ms / leg2 33ms, measure-storm excised). NO-MASKING rider → PASS (bridge dormant 0/92 rest samples, absent v-if at rest).

- **BROKEN ENDPOINT (defect):** the settled "horizontal" dock never becomes horizontal — it stays `.glass-dock.vertical` (computed 67×654, aside 91×686 `position:fixed`) while main re-margins to `left:0` with only a TOP-gutter reserve, so the fixed vertical rail OCCLUDES the content's left ~50–90px (measured+screenshot: "Colors"→"ors", "FOUNDATIONS"→"TIONS", swatch 0 hidden; "Overview"→"erview"). Reproduces identically on colors+overview, light+dark.
- Localization: `SidebarDock.vue:193` hardcodes `orientation="vertical"`; nothing re-points GlassDock's own orientation on the shell morph (only `[data-shell-dock-orientation]` flips, `AppShell.vue:357/401`); the compensating `AppShell.vue:528` `:deep(.demo-sidebar-dock){flex-direction:row}` reaches the glass-dock root but cannot re-lay the inner vertical grid; `AppShell.vue:86-92` flips `settledOrientation` only on morphing→false (settle), driving the naked re-margin.
- Safari settled-vertical REST reads correct both modes (provenance + rest confirmed); the defect is engine-independent CSS/layout, only reachable in the morph endpoint the WKWebView snapshot can't fire.

mustFix (for a build-fix-agent — NOT this synthesis agent):
1. Make the settled horizontal dock actually horizontal (re-point GlassDock's orientation prop / reshape the inner layout to a top bar) so the re-margin to `left:0` no longer slides under a rail.
2. Land the discrete re-margin INSIDE the occluded midpoint (drive off `boundOrientation`'s 0.5-crossing, not morphing→false) — only viable once #1 removes the left occlusion.
3. Re-verify via screencast frame-series both routes/legs/modes.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-SHELL-MORPH-PAINT-REPAIR-DELTA.md`
- Travel series + report: `docs/tranches/BG/audit/visual/shell-morph-paint-repair/chrome-travel/f{005,009,013}_*.jpg` · `f157_t0.27_bo0.78_leg2.jpg` · `screencast-report.json`
- BROKEN endpoint captures: `shell-morph-paint-repair/chrome-endpoint/{colors,overview}-{light,dark}-B-settled-horizontal-BROKEN.png` (+ `colors-light-A-rest-vertical.png`)
- Safari rest: `shell-morph-paint-repair/safari-rest/safari-{colors,overview}-{light,dark}.png`

#### F5.2 — BG.W-LIQUID-WEIGHT-DEFAULT (cursor held PENDING; paint FAIL; src SHAs preserved; recorded `da6e0cf4`)

Dual-engine paint judge FAIL (Chrome 149 ANGLE-Metal M5 Max + Safari WebKit/Apple-GPU, both modes, BUILT `:5200`). TWO decisive defects.

- **(A) THE PRM RE-ALIAS IS DEFEATED BY SOURCE-ORDER CASCADE (primary):** under `prefers-reduced-motion: reduce`, `--transition-liquid-spatial` on `:root` STILL resolves the `--spring-smooth` `linear()` overshoot NOT `--ease-standard` `cubic-bezier()` (vestibular floor broken). The named π spec `tests-visual/liquid-weight-default.spec.ts` FAILS its PRM light+dark tests (2 failed / 8 passed on chromium; webkit fails identically per direct root-token probe, matchMedia matches=true). Root cause: the base default `:root{--transition-liquid-spatial:var(--spring-smooth)}` at `scheme-spring.css:152` is imported AFTER the PRM `@media(reduce)` re-alias at `scheme-motion.css:397` (`tokens.css:28→34`), winning at equal `:root` specificity even when reduce matches — the exact "PRM keeps the overshoot" source-green/render-broken class the spec header names.
- **(B) ROW 2 dock-hover-press UNWIRED:** `useLiquidPress`/`springPreset('press')`/`--dock-press-t` binding on `DockIconButton`/the dock control families is ABSENT (`DockIconButton.vue` composes `dock-icon-button glass-specular-track glass-capsule-hover`, no useLiquidPress; `--dock-press-t` only a comment in `useLiquidPress.ts:73`); the dock press stays the CSS `:active` no-overshoot floor (the §2.8 ROUGH state), the ROUGH→MATCHES pass bar UNMET.
- **PASSES:** the default inversion + calm opt-out PAINT — `.tap-squish`/`.interactive-item` default scale leg resolves the spring `linear()` AND `.motion-calm` resolves `cubic-bezier()`, both engines both modes; settled visual correct dual-engine (recessive aurora no conic/oversaturation, grain calm, hero fits envelope, dark register luminous transmissive glass, provenance badges decoded from pixels); prerequisites W-DOCK-GLYPH-RIGID / W-OVERLAY-ENTER-PAINT / W-DOCK-PANE-OVERLAP / W-MOTION-SPINE all DONE+paint-verified. All 12 capture PNGs resolve on disk (6 Chrome @1440×900 + 6 Safari @2880×1800).

mustFix (for a build-fix-agent):
1. Relocate the PRM `@media(reduce)` re-alias of `--transition-liquid-spatial` into `scheme-spring.css` after line 152 (or otherwise raise its cascade precedence) so it wins under reduce.
2. Wire `useLiquidPress` `springPreset('press')` on `DockIconButton` writing `--dock-press-t` (DOCK_SPRING {0.68,0.64} untouched).
3. Re-run the F5.2 live-gesture sweep + the π spec incl. PRM→bezier both engines both modes.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-LIQUID-WEIGHT-DEFAULT-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/liquid-weight/liqweight-{tabs,dock,dialog}-{chrome,safari}-{light,dark}-desktop.png`
- Probes: `liquid-weight/pi-readback.json` · `liquid-weight/chrome-settled-pi.json`

#### 6.6 — BG.W-DOTFLOW-REBUILD (cursor held PENDING; paint FAIL; src SHAs `6dce9b5b`/`7b82c7fc` preserved; recorded `24c9b072`)

Dual-engine paint re-judge of the paint-fix commit `6dce9b5b` — VERDICT FAIL, both engines both modes. Route `/substrates/dot-flow-field`, built bytes on `:5200`, `?capture=` + `data-capture-ready` poll, engine badges decoded in-pixel.

- **Chrome 149 / real Metal (ANGLE Metal Apple M5 Max — NOT SwiftShader):** the showcase canvas paints a FLAT BRIGHT WHITE-OUT plate. Census meanLuma 207.3, stdLuma 2.9, 0% chromatic, both modes. Faint white motes clump ONLY at the card right margin; no warm-fire flow, no deep warm floor, warm-fire hue does not survive the tone-map.
- **Safari 26 / WKWebView (Apple GPU):** the showcase canvas paints a DEAD NEAR-BLACK plate. Census meanLuma 4.7, stdLuma 0.0, 0% chromatic, both modes. Effectively identical to the prior dead-black FAIL.
- The reference warm-fire advected dot-wave (mid-luma, high-stdLuma warm-chromatic streamline field over a deep warm-near-black floor, zero teal) is ABSENT in all four captures. The paint-fix reduced Chrome blow-out slightly (253→207) but did NOT resolve the defect.
- **DECISIVE NEW FINDING (defectLocalization):** probed live — BOTH judged engines run the WebGPU/WGSL path (`{gpu:true, gl2:false, wgpu:true}`) on Chrome 149/M5-Max AND Safari 26 WKWebView. So the RGBA8-trail Safari-fix in `flowSetupGLFlow.ts` (WebGL2 GLSL path) is a NO-OP on both — it never executes. The WGSL trail is still `flowSetupWGPU.ts:147 rgba16float`. `proof:viz-dotflow` is GREEN (structural, not the arbiter — headless-green/visually-broken gap). The StoryHero Aurora backdrop rendered correctly warm+structured on both engines (the working control), isolating the defect to the DotFlowField WGSL composite.

mustFix (for a build-fix-agent):
1. Land the fix on the WGSL path — `flowSetupWGPU.ts` trail format + `shaders/flow-field.render.wgsl.ts` present tone-map/deposit — NOT the WebGL2 GLSL path.
2. Kill the Chrome white-out (the warm-fire hue must survive the tone-map, not blow to a flat bright plate).
3. Fix the Safari WKWebView dead-black (WGSL compute-advect + RGBA16F trail ping-pong + present yields no visible output on WebKit-WebGPU while the Aurora hero renders fine).
4. Re-verify the reference-flowing-dot-wave read on the WGSL path, both engines both modes.

Captures:
- DELTA (carries `defectLocalization` + 4-item mustFix): `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-DELTA.md`
- 10 PNGs + census: `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint/refetch-{chrome,safari}-{showcase-,canvas-,}{light,dark}.png` · `refetch-chrome-census.json`

---

## 2026-07-05 — F2/F3/F9 glass-depth + signal-truth + dock-rail + dotflow re-judge batch (rows F2.5 / NF.3 / F3.R4 / 6.6)

allPass: **false** — 1 PASS, 3 FAIL. Only BG.W-GLASS-SIGNAL-TRUTH (NF.3) flips to DONE; the depth-tier dead-knob (F2.5), the shell-absent dock rail (F3.R4), and the un-rebuilt dotflow field (6.6) hold at PENDING (fix owed).

| Wave | Row | Verdict | Cursor |
|------|-----|---------|--------|
| BG.W-GLASS-DEPTH-TIER | F2.5 | FAIL | PENDING (held) |
| BG.W-GLASS-SIGNAL-TRUTH | NF.3 | PASS | DONE |
| BG.W-DOCK-RAIL-REINVENT | F3.R4 | FAIL | PENDING (held) |
| BG.W-DOTFLOW-REBUILD | 6.6 | FAIL | PENDING (held) |

Provenance across the batch: Chrome = CDP on `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader); WebKit = off-screen WKWebView / playwright-webkit on system `WebKit.framework` / `Apple GPU` (no `Version/` token -> load-bearing C-SAFARI Tier-1). Engine + GPU decoded IN-PIXEL from the badge per leg. All captures over BUILT bytes on `:5200` (vite preview of the demo dist, NOT the `:5199` dev server) via the C18 `?capture=` harness. `verify-siblings-intact.mjs --quiet` exits 0 before AND after this synthesis; no `/tmp/sibling-park|stash`; each paint agent tore down its demo serve (`:5200`) + throwaway Chrome (`:9477`); operated only under glass-ui.

Cursor state confirmed at synthesis: the paint agents flipped all four rows in-run — F2.5 (`e6bdd0f8`) PAINT-PENDING -> PENDING (JUDGED-FAIL note on disk), NF.3 (`51dcfd84`) PAINT-PENDING -> DONE, F3.R4 (`1d5d29f9`) PAINT-PENDING -> PENDING, 6.6 (`7573f907`) PAINT-PENDING -> PENDING. The one PASS row (NF.3) reads DONE. No cursor edit owed by synthesis.

---

### PASSED -> DONE

#### NF.3 — BG.W-GLASS-SIGNAL-TRUTH (re-judge; cursor flip + DELTA `51dcfd84`)

The born-RED FAIL is CLEARED. Dual-engine non-authoring paint judge (Chrome ANGLE-Metal M5 Max + Safari/WebKit Apple GPU), both modes, over BUILT `:5200` bytes.

- ST3 (the writer-witness): 0/12 -> **12/12 docks** on `/dock/overview` fire the `data-backdrop-sampled` writer-witness in BOTH modes at `data-capture-ready`, +6s (24 loop ticks), AND after a viewport resize (was 0/12). The `withDefaults(..., { autoLuminance: true })` fix closed the Vue boolean-cast-false dead-guard root cause (an absent `boolean` prop cast to `false` so `props.autoLuminance !== false` never wired the observer).
- On-screen docks over the DockStage aurora write NON-DEGENERATE real values — light: luma 0.957 + warm hue `oklch(0.72 0.06 84.6)` + `--glass-ambient-strength: 8%` + `light` bucket; dark: luma 0.003 + warm hue 67.3° + 8% + `dark` bucket. The `FIELD_ALPHA_FLOOR` rejects the empty field readback and falls to the static stack-walk over the real warm field, resolving the prior luma≈1.0/transparent field-black degeneracy (mustFix #2).
- ST2 PASS (dead `--glass-backdrop-hue` absent at runtime; one hue channel one writer). ST4 PASS (declarative `@container` bucket floor + observer refinement both engage). ST1 source-green + non-blocking (static floor `calc(12% + luma*28%)`; no `.glass-clear` element renders on either wave route, out of paint-judge pixel reach).
- Pixel gestalt both engines both modes: warm recessive aurora (no conic banding/oversaturation), glass reads as glass (docks transmit the warm field, not gray slabs — FD-DOCK-1), grain calm, Overview/Glass Material hero fits its envelope. All 8 PNGs @2880×1800 resolve on disk, real, with decoded provenance badges.
- NON-BLOCKING NOTE (recorded): off-screen/below-fold-center docks fall to a transparent-body static null (luma 0) at mount — a `sampleStatic` center-point edge; not a visible defect, still fires the witness, self-corrects on scroll-in.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-DELTA.md`
- 8 PNGs: `docs/tranches/BG/audit/visual/signal-truth-repaint/BG.W-GLASS-SIGNAL-TRUTH-{chrome,safari}-{dock-overview,glass-material}-{light,dark}.png`

---

### FAILED -> PENDING (rows F2.5, F3.R4, 6.6 — paint FAIL, fix owed)

#### F2.5 — BG.W-GLASS-DEPTH-TIER (cursor held PENDING; paint FAIL; src SHAs `glass-deep.css` 8bf3c4a2 / `glass/deep.css` ec048808 preserved; landed `841f3768`; recorded `e6bdd0f8`)

Dual-engine (Chrome/Metal + WebKit/Metal), both modes. The tier-depth grade SCALAR resolves correctly per tier (overlay/menu 1 · floating/popover 0.7 · content 0.35; grade tokens monotone + in-range `0.35 < 0.7 < 1`), BUT the scalar is a DEAD KNOB on the painted material — every deep surface paints FLAT 16px blur / saturate 1.8 regardless of its tier grade. The wave's central claim ("content~14px < popover~15px < menu 16px, menu > popover > button thickness BY CONSTRUCTION") does NOT paint: **menu = popover = button.** The exact "a deep button reads as thick as a deep menu" defect the wave claims to fix is STILL present.

- **ROOT CAUSE (registered-@property eager-substitution freeze):** in `src/styles/tokens/glass-deep.css` the LERP intermediates `--glass-blur-deep-active-radius` and `--glass-saturate-deep-active` are declared at `:root` and reference `var(--glass-depth)`. `--glass-depth` is a REGISTERED `@property <number>` (property-regs.css §18, `inherits:true` `initial-value:1`). Per the CSS Properties & Values API, a `var()` to a registered custom property inside another custom property is substituted with that property's computed value AT THE DECLARING ELEMENT — here `:root`, where `--glass-depth` = its initial 1 — so the calc bakes `* 1` and inherits frozen; descendants that set `--glass-depth` to 0.35/0.7 inherit the frozen calc and never re-drive it. Resolved on EVERY element (Chrome AND WebKit, both modes): `--glass-blur-deep-active-radius = calc(( 13px + (16px - 13px) * 1 ) * 1)`. Confirmed via in-page computed-DOM probe on real Chrome/Metal (CDP) and cross-checked via playwright-webkit — identical flat-16px at forced depth 0/0.35/0.7/1.
- **LIVE:** the one deep surface on `/display/buttons` (primary-audacious CTA, `glass-wash btn-glass glass-deep`) resolves `--glass-depth` 0.35 (correct) yet paints `backdrop-filter blur 16px`, not ~14px. The `glass/deep.css` tier map (`:where` rules) is CORRECT (sets `--glass-depth` per tier) but inert because the consuming LERP is frozen upstream. `proof:glass` DT4 is GREEN OVER BROKEN — it text-checks the calc mentions `var(--glass-depth)` but never evaluates the freeze.
- FENCES THAT HELD (recorded): calm content default BYTE-UNCHANGED (non-deep floating 13px / overlay 20px / card 8px / wash 1px — the tier map sets only the scalar, never a `--glass-blur-*` token; `proof:glass-cal` green by construction); one-deep-refractive-per-route budget held (buttons 1 · popover 0 · dropdown 0; 0 lens/refract); no `--glass-blur-*` re-pointed by the tier map. Routes render fully both engines/modes (recessive field, calm grain, hero fits envelope, warm-cream light + luminous-dark identities honored).
- CAPTURES: 12 route PNGs on disk, all 2880×1800, `isRealPng`, per-engine badge (Chrome magenta 10424 / WebKit 6432), real content (σ 11.4–57.3), mode-honored.

mustFix (for a build-fix-agent):
1. Relocate the deep LERP composition (`--glass-blur-deep-active-radius` / `--glass-saturate-deep-active` / `--glass-blur-deep`) OUT of `:root` and INTO the `.glass-deep` rule (`glass/deep.css`) so it re-evaluates `var(--glass-depth)` at the element where the tier grade is in scope — do NOT un-register `--glass-depth` (keeps the @property animation).
2. Re-verify both engines paint a strict monotone ladder: content ~14px/~1.67 < popover ~15px/~1.74 < menu 16px/1.8; the live CTA must paint ~14px.
3. Harden `proof:glass` DT4 to assert the RESOLVED per-grade blur DIFFERS (evaluate the LERP at the three grades, fail on flat), not just that the source mentions `var(--glass-depth)`.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-GLASS-DEPTH-TIER-DELTA.md`
- 12 PNGs: `docs/tranches/BG/audit/visual/pipeline-depth-tier/depth-tier-{chrome,safari}-{buttons,popover,dropdown}-{light,dark}.png`

#### F3.R4 — BG.W-DOCK-RAIL-REINVENT (cursor held PENDING; paint FAIL; src SHAs preserved; recorded `1d5d29f9`)

Dual-engine both-modes (Chrome/ANGLE-Metal M5 Max + Safari/WebKit Apple GPU, demo:dist BUILT bytes on `:5200`; siblings intact exit 0 before+after). The reinvented rail MECHANICS are correct and dual-engine-clean wherever the rail is rendered (the 2 demo story routes) — 5 of 7 pass-bar criteria PASS: (1) COLLAPSED containment (rest members `opacity:0` + tucked, only the 1.5px warm-ink `--dock-rail-hairline` shows), (2) HOVER fan-out crossing the edge with φ² asymmetric overhang (fan-port ratio 2.93-3.05, inside 2.6±0.5; token calc provably 2.618), (3) BOX-INVIOLATE dW=dH=0 on every stack/mode/engine, (5) compositor-only fan on `--spring-dock` + per-member stagger + PRM snap (no width/height/inset animated, no animation-timeline leak, hover-intent+focus fan), (6) Safari-26 dual-engine paints the fan in both modes.

TWO CRITERIA UNMET -> FAIL:
- **Criterion 7 (primary):** the user-named shell consumers `SidebarDock.vue` (~L386) + `BottomDock.vue` (~L374) render NO `<DockStack>` (the tag survives only in BD.W-DOCK-CORE removal comments; the rail lives ONLY on `rail.vue:250` + `liquid-playground.vue:820/867`, both below the default fold). `useShellNavDock.ts` computes `railItems` but no shell template consumes it into `<DockStack mode=facets :items=railItems>`. The "two shell docks / shell chrome on any route" the fold explicitly requires (`fold-dock.md:69,106-107`) is UNDELIVERED — the C-DOCK-chronic close is not literal in the shell.
- **Criterion 4 (secondary):** the `wrap` display-option exists in CSS (`stack-rail.css:312`) + prop (`DockStack.vue:84`) but no demo exercises it (only `visibleCount=4` is painted).
- The one-border-grammar coherence is unverifiable/subsumed: the 16.1 scroll-progress hairline (shell docks) and the rail hairline (story docks) never co-occur because the rail is absent from the shell, so the "sibling whispers / one voice" read (`fold-dock.md:114,163`) cannot be judged.

All 32 capture PNGs resolve on disk.

mustFix (for a build-fix-agent): wire `<DockStack>` into the shell `#rail` slots (the contained topology won't re-introduce the BD collision) + demo the `wrap` axis + re-earn the shell box-equality/containment π and the one-border-grammar read.

Captures:
- DELTA: `docs/tranches/BG/audit/visual/BG.W-DOCK-RAIL-REINVENT-DELTA.md`
- Paint PNGs + probes: `docs/tranches/BG/audit/visual/BG.W-DOCK-RAIL-REINVENT-paint/rail-{chrome,safari}-{rail,liquid-playground,lp}-{light,dark}-*.png` · `scroll-cap.json` · `interaction-probe.json`

#### 6.6 — BG.W-DOTFLOW-REBUILD (re-judge of HEAD `e6bdd0f8`, the WGSL rgba8unorm paint-fix; cursor held PENDING; paint FAIL; src SHAs `6dce9b5b`/`7b82c7fc` preserved; recorded `7573f907`)

Non-authoring dual-engine re-judge over BUILT `:5200`, route `/substrates/dot-flow-field`, both modes — Chrome via CDP (real Chrome.app 149, ANGLE Metal M5 Max, canvas context probe `wgpu:true`/`gl2:false`) + Safari via off-screen system-WebKit WKWebView (badge WEBKIT/Apple GPU). VERDICT: FAIL both engines both modes — the reference IMG_1836 flowing-dot-wave is absent. The rgba8unorm fix did NOT close the gap (a constant-tune on the forbidden architecture).

- **Chrome/Metal-WebGPU:** the trail-format flip helped (structure + warm-fire chroma now survive on the LEFT half; warm 99-100%, teal 0-1% so the teal-navy purge holds) BUT the frame reads as a smeared marbled warm-fire trail-CLOUD, NOT discrete beaded dots on evenly-spaced streamlines, AND the right ~40% washes to a flat bright ~200-luma plate (col-luma L->R 144->201 light / 126->196 dark, p99 204-207, mean 161-178 over-bright).
- **Safari/WebKit-WebGPU:** DEAD BLACK in BOTH modes (canvas OKLab L 0.11, chroma 0.01, zero structure) while the Aurora hero renders fine on the same WKWebView — DotFlowField-WGSL-specific.
- PASS-BAR unmet: cannot trace ≥8 distinct smooth evenly-spaced beaded streamlines in either engine; p99 near white-out (Chrome) and mean at dead-black (Safari) both fail the luminance-band requirement.
- **ROOT (structural):** the first-principles rebuild the RE-OPENED criteria demand was never built — src still ships `FLOW_PRESET_AURORA_CURRENT` `mode:"flow"` (free-advected motes + additive-trail feedback buffer), the exact architecture the bar forbids; no Jobard-Lefer evenly-spaced streamline placement, no arc-length-beaded dot chains, no retirement of the additive-trail flood machinery. `proof:viz-dotflow` is GREEN (verifies SOURCE constants, not the composite) — the headless-green/visually-broken gap.

mustFix (for a build-fix-agent — a first-principles rebuild, NOT another constant-tune):
1. Kill the Chrome/Metal right-half white-out — `shaders/flow-field.render.wgsl.ts` `fs_present` + the dense `particleCount:12000`/`speedGlow:1.35` deposit accumulate a flat bright plate.
2. Land Jobard-Lefer evenly-spaced streamline placement (dSep-separated, arc-length-beaded dot chains) over `curlFBM` — retire the free-advected-mote + additive-trail architecture (`demo/stories/substrates/presets.ts` `FLOW_PRESET_AURORA_CURRENT` + `src/components/custom/dot-flow-field/`).
3. Fix the Safari/WebKit-WebGPU dead-black — `flowSetupWGPU.ts` + `shaders/flow-field.*.wgsl.ts` (storage-buffer usage flags / additive-blend on rgba8unorm target / two-pass ping-pong / present alphaMode).
4. Warm-fire hue must survive the tone-map (no flat bright plate; deep warm floor).
5. Re-verify the reference-flowing-dot-wave read (≥8 traceable beaded streamlines, p99 below white-out AND mean above dead-black) on the WGSL path, both engines both modes.

Captures:
- DELTA (carries `defectLocalization` + 5-item mustFix): `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-DELTA.md`
- Re-judge PNGs + census: `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint/rejudge-{chrome,safari}-{,canvas-,showcase-}{light,dark}.png` · `refetch-chrome-census.json`
