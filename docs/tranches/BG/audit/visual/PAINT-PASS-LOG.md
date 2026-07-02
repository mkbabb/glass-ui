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
