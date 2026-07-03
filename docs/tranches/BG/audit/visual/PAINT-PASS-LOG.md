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
