# D5 pass 4 · C-E4 · critique of route E (the engaged stage on F5″ + P-A4-light)

| field | value |
|---|---|
| seat | D5 pass 4, **C-E4**, the fresh adversarial critic of route E (`../REGISTRY.md` §P3-8.3 wave 3). I authored no D5 seat in passes 2, 3 or 4 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | Checkout HEAD `1cd1a1b73` (P-E4's commit). `git diff --stat bdd0a12ba HEAD -- src tests package.json demo vite.config.ts` prints nothing, so this is P-E4's source. Worktree `.claude/worktrees/bl/D5/p4/C-E4/wt` = HEAD + `P-E4-noveil-coarse.patch`, which `git apply --check` accepts. The other three arms are the two constants in `stage.ts`: `diff` of the four patches shows they differ only in the `KEYBOARD_VEIL` / `POINTER_STAGE` lines and the blob index line (§1). Removed with `git worktree remove --force`, and `…/C-E4/` is gone |
| patch hashes | `shasum` at this seat: noveil-coarse `f567b5cd…`, veil-coarse `4530d54a…`, veil-every `76d76ffc…`, noveil-every `25065a38…`, P-A4-light `ec2cb041…`. All match P-E4 §2 |
| engines | Chromium 149 and Playwright WebKit 26.5, headless shell, no GPU arguments, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H4's, read from the checkout, unedited. Every scoring battery ran on the harness's own app (scene app sha `3c135d6264f8` in every build log). P-E4's probe (`E4/probe/`) and my probe (`C-E4/probe/`) are probes, not witness reads |
| INBOUND | `../../../audit/INBOUND.md` re-read at the seat's start (00:20): mtime 2026-10-16 06:40, no ruling on Q-1..Q-5, the safaridriver checkbox or O-74c G-1. Defaults stand: Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds |
| run | 2026-10-19 00:20 → 04:40. Chromium battery 00:33-02:21 (it shared the D5 harness lock with C-A4, so witnesses waited), E-4 re-reads 02:21-02:30. **WebKit: one `guarded --exclusive webkit --timeout 90` admission**: queued 02:31:06, admitted 03:53:19 (an 82 min wait, load 21.8), released 04:35:36 (load 21.6), `guarded exit 0` (`C-E4/logs/wk-admission.log`). Every WebKit stage ran inside it; none was skipped and no cell is UNMEASURED for want of the lock. No page close, no `ENGINE CLOSED`, no zone refusal |
| records | `C-E4/run-ce4.sh` (stages and plants), `C-E4/chain-ce4.sh` (order), `C-E4/probe/{ce4-App.vue,ce4-probe.mjs}` (my adversarial cells), `C-E4/logs/` (every build, witness, plant, probe and capture log with its load; `stage-*.txt` the summaries), `C-E4/json/<arm>[-r2,-r3]/`, `C-E4/glance/` (4 sheets, 864 frames, my composite `ce4-gestalt-set.png`) |

## 0 · In brief

**Score: 16 of 27 rows closed by my own replay in both engines (59 %).** Closed: CK-03, 04, 06, 08, 09, 11, 12, 13, 14, 15, 21, 22, 23, 24, 26, 27. Open: CK-01, 02, 05, 07, 10, 16, 17, 18, 19, **20**, 25. Five of the open rows cannot close by building (CK-02 under Q-5 (a), CK-07, CK-17, the Sheet cells of CK-05/CK-18). This is **not a clean pass**. **The gestalt is not iOS-27 grade** (§3).

1. **CK-20 is reopened by a new counterexample in route E's own code: the stage glides a control that did not move.** `stage.ts` `onMutation` glides each holder by `h.at − now`, where `h.at` is the place the stage **last read**. The stage only re-reads on a `childList` mutation or a scroll. If layout moves the engaged control by any other means (a style write, a CSS-driven height change, a viewport resize), `h.at` goes stale. The next unrelated `childList` mutation anywhere in `<body>` then plays a glide from the old place: the control jumps back the whole distance in one frame and slides home. My probe (`ce4-probe` `stale place`): with A engaged, a spacer above the sliders grows by 120 px through `style.height`, then 400 ms later a node is appended **below** the sliders.
   - Chromium: **largest one-frame move 127.2 px** (dy −127.2) on both the promoted keyboard path and the coarse arm's **in-place** pointer path.
   - WebKit: **127.2 px** keyboard and **124.7 px** pointer.
   - A plain viewport resize from 700 to 380 px moves A by 21.3 px and gives **25.0 px** (Chromium) and **21.9 px** (WebKit).
   - Bound: 4 px per 16.7 ms. All four arms fail in both engines; the control cell (the same append with no spacer write) reads 0.0 px everywhere.
   - The promoted half is pass 3's code (`P-E3-noveil.patch` line 4257: the same `const was = h.at`), and C-E3 did not drive it. Pass 4's item 6 extended it to the in-place arm. H4's E-10 `re-render landing` and P-E4's `between landing` both pass, because they insert a node that itself moves the control, so `h.at` is fresh. Neither can fail for this cause.
2. **CK-22 closes in both engines on all four arms, including the paths P-E4 claimed but did not drive.**
   - E-12 `wheel over engaged control` and `consumer anchor · escape|blur` PASS on every arm in both engines.
   - My plants `pl-anchorlost` (the write-back removed) and `pl-wheelchain` (the wheel listener removed) fail them in both engines: `(removed)`; box +0, page +30.
   - My extended wheel cells equal the rest read in both engines: the box at its end under `overscroll-behavior: contain` reads box +0, page +0; the box at its end under `auto` chains to the page (+30), as at rest.
   - An `!important` consumer anchor comes back with its priority (gap 0.0 px while promoted).
   - E-M7's stated clip is true in paint in both engines. On the coarse arm a fine hold grows 10.8 px past a fitting `overflow: hidden` box, and the point 1 px inside the grown edge hits `MAIN` (clipped). On the every arm the same point hits the control (promoted, escapes).
3. **CK-04 closes again.** E-3 reads 22/0 on all four arms in both engines. The four plants the row names each fail exactly their cells in both engines: `p-char`, `p-script` and `p-tabhand` 20/2, `p-mod` 18/4. Q-3's pointer arm holds: P-E4's probe reads 23/0 in Chromium and 21/0 +1U in WebKit on every arm. My plant `pl-arm` (the arm ignored, so every pointer promotes) fails 7 cells in Chromium and 5 in WebKit.
4. **CK-05: P-E4's bimodal slider carry did not reproduce.** I made 12 Chromium reads (three per arm, load 12.0-30.3): carry **4.32-6.83 px**, all ≥ 4. The 4.32 px read (noveil-every r2) sits 0.32 px over the bound. All four WebKit reads pass (6.71-7.26 px). Under the load rule, P-E4's four sub-bound reads are NOT-REPRODUCED here. CK-05 stays open on the Sheet (UNMEASURED, O-74c G-1) and on the WebKit Carousel (UNMEASURED, no touch scrolling).
5. **CK-06 closes on the composition.** E-5's three-read rule reads 56/56 in Chromium (load 19.9) and 56/56 in WebKit (18.4).
6. **CK-16 stays open on WebKit's layout half (engine's limit).** `rest-running off-screen` passes in both engines (both loops `paused`). `rest layouts` reads 0.0 layouts/s in Chromium and is UNMEASURED in WebKit (no counter). Both keyframes animate only `opacity` and `scale` (`Skeleton.vue:116`, `StatusDot.vue:290`), so zero layouts in WebKit is the source's reading, but it is not a measurement. Unlike CK-13, the row's text does not exempt that engine, so I hold it open.

## 1 · What I ran

Loads are the 1-minute averages each run printed at its start, unless marked. One heavy run at a time; every Chromium run went through `guarded --timeout 90|15`. Builds used `guarded --timeout 20`. The WebKit stages ran inside the one exclusive admission.

| run | Chromium (load) | WebKit (load) | record |
|---|---|---|---|
| builds: 4 arms × (harness app, P-E4 probe app, my probe app); plants `p-anchor`, `p-char`, `p-script`, `p-tabhand`, `p-mod`, `pl-anchorlost`, `pl-wheelchain`, `probe-pl-arm` | all exit 0; every plant applied, verified by grep, and restored byte-identical (`shasum`) | — | `logs/stage-builds*.txt`, `logs/build-*.log` |
| noveil-coarse E-1..E-12 | 92/2/2U (16.4) · 148/16 (23.0) · 22/0 (14.6) · 14/0/4U (18.8) · 56/0 (19.9) · 4/2/8U (16.4) · 6/1 (14.9) · 19/0 (16.6) · 75/3 (12.2) · 6/0 (14.0) · 3/0/1U (13.9) · 63/0 (16.1) | 92/4 (21.8) · 146/18 (21.1) · 22/0 (22.1) · 11/0/8U (20.9) · 56/0 (18.4) · 2/2/8U (14.5) · 6/1 (14.5) · 19/0 (17.6) · 74/4 (14.8) · 6/0 (17.1) · 3/0/1U (22.2) · 62/0/1U (23.4) | `logs/noveil-coarse-<engine>-E-n.log` |
| veil-coarse E-1, 3, 4, 7, 8, 9, 10, 11, 12 | 92/2/2U · 22/0 · 14/0/4U · 6/1 · 19/0 · 74/4 · 7/0 · 3/0/1U · 63/0 (12.0-23.0) | 92/4 · 22/0 · 11/0/8U · 6/1 · 19/0 · 74/4 · 7/0 · 3/0/1U · 62/0/1U (15.5-19.9) | `logs/veil-coarse-*` |
| veil-every, noveil-every E-3, 4, 10, 11, 12 | every cell as noveil-coarse; E-10 7/0 (veil) and 6/0 (noveil) (16.4-31.1) | the same (15.7-21.9) | `logs/{veil,noveil}-every-*` |
| E-4 re-reads r2, r3 per arm | 8 × 14/0/4U (14.1-24.7) | — | `logs/*-r{2,3}-chromium-E-4.log` |
| plants on E-10 / E-3 / E-12 | p-anchor 4/2 (centre move **68.0 px** fwd and rev); p-char 20/2; p-script 20/2; p-tabhand 20/2; p-mod 18/4; pl-anchorlost 61/2; pl-wheelchain 62/1 | p-anchor 4/2; p-char 20/2; p-script 20/2; p-tabhand 20/2; p-mod 18/4; pl-anchorlost 60/2/1U; pl-wheelchain 61/1/1U | `logs/p*-<engine>-E-n.log` |
| P-E4's `e4-probe` on the four arms; on `probe-pl-arm` | 23/0 each; pl-arm **16/7** (end 17.8-21.9) | 21/0 +1U each (the forced-colours/PRT cell, engine limit); pl-arm **16/5** (end 17.7-24.9) | `logs/e4probe-*` |
| my `ce4-probe` on the four arms | 6/3 +2R each (end 15.4-23.9) | 6/3 +2R each (end 22.4-29.3) | `logs/ce4probe-*` |
| P-A3's `a3-probe --only ck13,ck21` on noveil-coarse | CK-13 22/22; CK-21 33/34 (end 22.8) | CK-13 forced 11/11, PRT 11 UNMEASURED; CK-21 33/34 (end 20.4) | `logs/a3probe-*` |
| capture CK-25, noveil-coarse and veil-coarse | CAP 12/0 each | CAP 12/0 each (22.5, 21.3) | `glance/` (4 sheets, 864 frames) |
| unit `engage-stage.test.ts` (`--maxWorkers=2`) | 21/21 | — | `logs/unit.log` |
| CK-22 consumer greps, nine siblings, read only (P-E4's script) | 2026-10-19 00:25; every count identical to P-E4's | — | `logs/ck22-greps.txt` |
| cost | `git add -N` in the worktree: **178 files, +4273/−1464**, as P-E4 §2 | — | session command |

## 2 · Per CK row

**CLOSED** means closed by my own replay in both engines, or by source reading (and unit or harness plant) for a row with no browser leg. Counts are pass/fail(/unmeasured).

| row | Chromium | WebKit | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/2/2U on both coarse arms | 92/4 | latch 54/55 (`dock`, D2's fence); the Sheet's PRM press-light finds no target (O-74c G-1); Aurora: UNMEASURED ENGINE LIMIT in Chromium (`data-aurora-substrate="css"`), graded **FAIL 1.22 against 1.13** in WebKit | OPEN (inherited: D2, O-74c, ambient) |
| CK-02 | E-2 148/16 | 146/18 | Switch light, Radio light and accordion light fail arm iii on every path and on `arrival·late`, plus accordion dark coarse tap. WebKit adds accordion dark keyboard and programmatic at rises of 0.0093 and 0.0098 (bound 0.01). This is the WebKit pair P-E4 saw at load 34.6, now seen at 21.1. It is A's, Q-5 | OPEN (OWNER, Q-5) |
| CK-03 | E-2 mount and `arrival·pre|own|ownflush` pass; no mount or in-task-arrival cell is among the fails | the same | `arrival·late` fails only on CK-02's light bound | **CLOSED** |
| CK-04 | E-3 22/0 on all four arms; the four row plants fail 2, 2, 2 and 4 cells; probe `pointer arm fine hold` (coarse: in place, ×1.060, no top layer, no footprint, no veil; every: promoted) and `touch hold` (promoted on both) PASS; `pl-arm` fails 7 | the same on all four arms; `pl-arm` fails 5 | keyboard engagement ×1.060 on both keyboard arms; `[data-held] 0` on Tab | **CLOSED** |
| CK-05 | E-4 14/0/4U × 12 reads; slider carry 4.32-6.83 px | 11/0/8U × 4; carry 6.71-7.26 px | §0 item 4. Sheet UNMEASURED (in flow); WebKit Carousel UNMEASURED (no touch scrolling) | OPEN (Sheet, O-74c; WebKit Carousel) |
| CK-06 | E-5 56/56, three reads per hold | 56/56 | P-A4's `data-press` cure holds on the composition | **CLOSED** |
| CK-07 | E-6 4/2/8U | 2/2/8U | no idle animation (Q-2 (b)) | OPEN (OWNER, Q-2) |
| CK-08 | E-7 6/1 | 6/1 | the one FAIL is `data-held`'s second writer `GlassDock.vue` (D2's), named in the row's clause. `data-engaged` is written only in `stage.ts`, the in-place arm included | **CLOSED** (named clause) |
| CK-09 | E-8 19/0 | 19/0 | the in-place glide rides `rowClockMs("dock")`; no literal | **CLOSED** |
| CK-10 | E-9 75/3 (noveil-coarse), 74/4 (veil-coarse) | 74/4 | under reduce: Switch light 0.0060/0.0047, Radio light 0.0030/0.0003, accordion light 0.0034/0.0003, accordion dark 0.0099/0.0096 | OPEN (A's, Q-5) |
| CK-11 | — | — | `.tap-squish`/`.interactive-item` appear only in retirement comments (`base.css:163`, `engage.css:15`, `menu.css:13`, `useLiquidPress.ts:20`); no selector or alias | **CLOSED** (source) |
| CK-12 | — | — | P-E4 mints no engagement figure. The wheel forwards the event's own `deltaX/deltaY`; the in-place reach is the same `--stage-reach` formula; `--scale-engage` is the ladder's row. `scrollerFor`'s `0.5` is a sub-pixel tolerance on a fractional `scrollTop`, not a motion or engagement figure; I rule it admissible | **CLOSED** (source) |
| CK-13 | a3 CK-13 22/22 (forced colours 11, reduced transparency 11); e4-probe `forced-colors held` and `reduced-transparency held` PASS on all arms (veil `display: none`; coarse arm in place) | forced colours 11/11; PRT 11 UNMEASURED (Playwright WebKit applies neither query; the row marks this as the engine's limit) | E-12 `fc-reach` passes on every scene in both engines | **CLOSED** |
| CK-14 | E-12 63/63 incl. `fcslop` on the three real dock triggers | 62/0/1U (the U is CK-16's layout counter) | probe `numfield coarse` PASS on all arms in both engines; the 44 px floor holds under grow and promotion | **CLOSED** |
| CK-15 | E-10 `hand-off singleton fwd|rev`: at most 1 engaged root per frame over 109 frames, on all arms | the same over 55-56 frames | | **CLOSED** |
| CK-16 | off-screen PASS (both `paused`); `rest layouts` 0.0/s | off-screen PASS; layouts **UNMEASURED** (no counter in this engine) | §0 item 6 | OPEN (WebKit layout half: the engine's limit; source reads 0 by construction) |
| CK-17 | — | — | **UNMEASURED (owner's safaridriver checkbox)**: the wheel forwarding, the in-place grow and its clip, the stale-place glide, VoiceOver on a promoted control | OPEN (OWNER) |
| CK-18 | slider, sortable and tabs consume the release rule (E-4) | the same | Sheet UNMEASURED | OPEN (O-74c) |
| CK-19 | E-1 ambient UNMEASURED (engine limit) | FAIL 1.22 vs 1.13 | the ambient frames are identical across all six states in my capture (`glance/noveil-coarse-chromium-fine.png`, ambient rows) | OPEN |
| **CK-20** | E-10 PASS on every arm: centre moves 0.0 px; drop 0.0070-0.0076 within own release 0.0073 + 0.002; `re-render landing` 1.3 px against 1.3. Probe hand-off cells PASS (no mid-film screenshot). **`ce4-probe stale place`: FAIL on all four arms, 127.2 px (keyboard and pointer) and 25.0 px (viewport resize); the control 0.0 px** | E-10 PASS (drop 0.0135 within 0.0138 + 0.002); **stale place FAIL on all four arms: 127.2 px keyboard, 124.7 px pointer, 21.9 px resize; the control 0.0 px** | §0 item 1. The `p-anchor` plant fails E-10 at 68.0 px in both engines, so E-10's position grade still bites; it just does not drive this cause | **OPEN** (E's own) |
| CK-21 | E-11 3/0/1U on all arms; a3 CK-21 33/34 | the same | the a3 FAIL is the tabs clock: one `console.error`, naming the resolved `translate` clock rather than the token. Both pass-3 critics held that the row asks for one error and gets it, and I hold the same. `readBack` reads the in-place host too | **CLOSED** |
| CK-22 | E-12 wheel and both anchor cells PASS on all arms; the plants fail; `ce4-probe` wheel ×3, `important anchor` PASS; clip REPORT as E-M7 states | the same | §0 item 2. The greps reproduce P-E4's counts exactly. **One source reading P-E4 left open:** `speedtest/src/components/dashboard/DashboardMapControls.vue:97` is a `Card` with `overflow-hidden` that **is an ancestor** of the H3 slider at `:134`. Under the coarse arm, a fine hold on that slider grows in place inside the clip, which is the consequence E-M7 names. `bbnf-buddy/EditableSlider.vue:178`'s `overflow: hidden` is on `.compact-label`, not an ancestor. E-M1, E-M6 and E-M7 are true as written | **CLOSED** |
| CK-23 | — | — | 178 files +4273/−1464, as P-E4 §2 | **CLOSED** |
| CK-24 | E-1 `static` cells pass | pass | `static` stamped and read at runtime under Q-1 (c) | **CLOSED** |
| CK-25 | CAP 12/0 both coarse arms | CAP 12/0 | §3: **not iOS-27 grade** | OPEN |
| CK-26 | — | — | the patch adds no `plus-lighter`, radial gradient or new shadow layer (grep of the patch's `+` lines); the Chip's flood is gone (`glass-chip.css:42`); the veil reads `blur(var(--glass-focus-veil-blur))` → `--glass-blur-floating-radius` (`tokens/glass.css:112`), a token. The dark Button halo is HEAD's (§3) | **CLOSED** (source) |
| CK-27 | every plant I planted fails its cell in both engines (p-anchor, p-char, p-script, p-tabhand, p-mod, pl-anchorlost, pl-wheelchain, pl-arm); P-E4's consumer-anchor cell drives the release to its end (polled off the stage, then +300 ms); no film takes a mid-film screenshot; no alias or masked fallback found in `stage.ts`, `hold.ts` or `useEngage.ts` | the same | the landing cells' blind spot is scored where it breaks, at CK-20, and recorded as a class (§4) | **CLOSED** |

## 3 · CK-25 · the gestalt, read from my frames

**Not iOS-27 grade.** The coarse pointer arm makes route E's own frames deft. The composition still carries four non-deft frames, and the stale-place glide is a visible jump.

- **Deft, and Q-3 (c) earns it.** On the coarse arm the fine-pointer hold grows ×1.060 in flow, with the world crisp and no veil (`glance/frames/noveil-coarse-chromium-fine-light-slider-held.png`; WebKit `noveil-coarse-webkit-fine-light-slider-held.png`). The noveil keyboard engagement is a ringed ×1.060 track with the world crisp (`noveil-coarse-chromium-fine-dark-slider-engaged.png`). These are the best frames in the set, and O-87's objection to the veil no longer falls on a desk pointer.
- **The touch hold under the veil still fails O-87's "slightly less blur".** In light the world goes to a milky grey around the control (`veil-coarse-chromium-coarse-light-slider-held.png`). In dark the "before"/"after" labels sink into a muddy brown (`veil-coarse-chromium-coarse-dark-slider-held.png`). The veil still computes the 20 px floating-radius blur until the 10.2.0 token wave lands.
- **The held slider's loupe reads as a split block, not glass.** A capsule twice the track's height, half fill-orange and half grey, with a hard 1 px vertical seam where the value meets the track, sits on top of the track (`noveil-coarse-chromium-fine-light-slider-held.png`, the same in WebKit and on the touch hold). It has no refraction or edge light, and it is the frame a person sees most while dragging.
- **The disclosed commit is an opaque slab.** The accordion's committed frame is a #d9d6d3 pill across the full 320 px row, with the chevron caught mid-rotation as a broken "⌐" glyph (`noveil-coarse-chromium-fine-light-accordion-committed.png`; the dark twin is a charcoal slab). The coarse *press* is now a faint wash: max 12 levels over the row (pixel diff against rest), so the press half of pass 3's slab is cured. This is A's recipe.
- **The coarse Switch press now shows itself, faintly.** The track darkens by up to 27 levels (light) and 20 levels (dark) over 629/606 px against rest (pixel diff `noveil-coarse-chromium-coarse-{light,dark}-switch-pressed.png`). Pass 3 read pixel-identical, so D-2 is met, if quietly.
- **The dark Button keeps its warm halo** (`noveil-coarse-chromium-fine-dark-button-rest.png`), and the presented rows' dark glow does too. This is HEAD's (pass-3 reading), not E's, but O-87 strips it.
- **The ambient exemplar does not change across rest, pressed, held, engaged, committed or released** (sheet ambient rows), and CK-19's WebKit grade fails.
- **The stale-place jump is visible:** a 127 px one-frame snap back, then a slide, on a control the person is holding (§0 item 1). It is filmed, not captured: films take no screenshot.
- Composite of the frames above: `glance/ce4-gestalt-set.png`. Playwright WebKit paints no `backdrop-filter`, so its veil frames show the dim without the blur (`veil-coarse-webkit-coarse-light-slider-held.png`). Real Safari is UNMEASURED.

## 4 · Next-pass defect classes (recorded; no CK row added, score unchanged)

1. **A stage that re-reads place only on the events it listens for.** `h.at` refreshes on `childList` mutation and scroll, never on layout (a resize, a style or CSS-driven move, a font load). Any later glide computed from it is a phantom. It is scored at CK-20 (§0 item 1). The class is wider than the glide: `writeGeometry`'s `--stage-room` / `--stage-w` (the reach) and the veil centre are stale under the same causes. A `ResizeObserver` on the footprint or host, or a layout read at glide time, is the natural cure; I propose none.
2. **Landing cells that drive only the cause they were written for.** E-10 `re-render landing` and P-E4's `between landing` insert a node that itself moves the control, so the stage's read is fresh, and neither can fail for a stale read. P-E4 §1 item 6 states the cure generally ("a moved place is travelled"). This is the §P3-7 item 6 class (a cell that cannot fail for its own claim) on CK-20's path.
3. **The coarse arm's consumer cost is real in one sibling.** `speedtest` `DashboardMapControls.vue`: the H3 slider sits inside an `overflow-hidden` Card, so a fine hold grows in place under the clip. E-M7 states the class, and my clip cell measures it in both engines (10.8 px clipped). Whether the Card's padding absorbs the ×1.06 block grow there is unmeasured in paint. It is Q-3's trade for the owner.
4. **Process, mine.** `run-ce4.sh unit` printed `# typecheck exit 0` after a pipe, so that is `tail`'s exit code. The typecheck output shows `TS2307 '@mkbabb/glass-ui/fourier-math'` because the worktree has no built `dist` for the package's self-import (P-E4 built first). Typecheck is not a CK row, and I claim no gate from it. My first shakedown of `ce4-probe` misread the at-end wheel cases (the slider was scrolled out of the box, so the wheel hit the page). I fixed the scene, and no number above comes from that run.

## 5 · What P-E4 claimed that I reproduced differently

- §0 item 6 / §3 CK-05 (bimodal carry, 4 of 12 Chromium reads under 4 px): **NOT-REPRODUCED** in 12 Chromium reads at load 12-30. The lowest was 4.32 px.
- §3 CK-20 "CLOSED": **open** on the stale-place counterexample (§0 item 1). Every cell P-E4 ran does pass in my replay.
- §3 CK-16 "CLOSED in Chromium": I hold the row open on WebKit's unmeasured layout half (§0 item 6).
- §6 item 2 (WebKit toggle/accordion rise 0.0099, seen once at load 34.6): seen again at load 21.1 (accordion dark keyboard 0.0093, programmatic 0.0098), so it is not a load artefact. It is A's, CK-02.
- §4 "whether the clip is an ancestor … unmeasured": by source, speedtest's Card is an ancestor and bbnf-buddy's rule is not (CK-22 row).
- Everything else P-E4 reports for CK-04, 08, 09, 12, 13, 14, 15, 21, 22, 23 and 27 reproduced in both engines.

## 6 · Fences kept

- No tracked source changed in the checkout and no git write ran there (`git status` shows no modified tracked file). `git apply`, `git add -N` and the plants ran only in my worktree. The worktree was removed with `git worktree remove --force`; `git worktree list` has no C-E4 row and `.claude/worktrees/bl/D5/p4/C-E4/` is gone.
- Writes in the checkout: `docs/tranches/BL/design/engagement/pass-4/C-E4.md` and `pass-4/C-E4/` only.
- Sibling repos were read by grep and `sed` only; value.js was not built or run. No `~/.claude` file was read; the guard ran as a binary.
- Every build, test and browser run went through `guarded`, never `--light` for a browser run. WebKit ran inside one `guarded --exclusive webkit` admission, queued 82 min and never skipped. Headless shell, no GPU arguments, one browser per run, a context per cell, closed in `finally` (the harness's `Engine`/`openPage`), with the WebKit relaunch every 60 navigations. vitest ran with `--maxWorkers=2`. No zone refusal. Nothing is left running.
