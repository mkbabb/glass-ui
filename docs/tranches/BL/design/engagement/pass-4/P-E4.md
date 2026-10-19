# D5 pass 4 · P-E4 · route E on F5″ + P-A4-light, four arm builds (§P3-8.1)

| field | value |
|---|---|
| seat | D5 pass 4, **P-E4 PROTOTYPE** (route E, the engaged stage), per `../REGISTRY.md` §P3-8.1 and §P3-8.3 wave 2→ |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD + `P-A4-light.patch` (sha1 `ec2cb041…`, which contains F5″ and F5′). E3's delta was carried by a three-way tree merge: base tree HEAD + `../pass-3/P-A3-light.patch` (`8a72af34…`), sides HEAD + `P-A4-light.patch` (`08f8a086…`) and HEAD + `../pass-3/P-E3-veil.patch` (`b9a83dc5…`), `git merge-tree --write-tree` → `c9ec75cd…`, **clean, no conflict**. Its delta over A4-light is the same 21 files as E3's over A3-light. Cut at HEAD `f29be73b7`; HEAD at return is `bdd0a12ba` and `git diff --stat a4a951090 HEAD -- src tests package.json demo vite.config.ts` prints nothing, so every patch is cut against today's source |
| patches | four, one per arm combination; each is the whole tree against HEAD (F5″ + A4-light + E3 + E4) and they differ only in the two constants of `src/composables/motion/engage/stage.ts`. sha1 by `shasum` at return (§2) |
| worktree | `.claude/worktrees/bl/D5/p4/E4/wt` (detached at HEAD, `node_modules` symlinked; the checkout has no `tests-visual/node_modules`, so nothing to link). Builds under `…/E4/out`. Both removed with `git worktree remove --force` and `rm -rf …/E4` before return; `git worktree list` has no `p4/E4` row |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU arguments, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H4's, read from the checkout, unedited. Every battery ran on the harness's own app (`scenes/App.vue`). The probe app (`E4/probe/App.vue`) is P-E3's fork, unchanged; its cells are probes, not witness reads |
| INBOUND | `../../../audit/INBOUND.md` re-read at the seat's start: mtime 2026-10-16 06:40, no ruling on Q-1..Q-5, the safaridriver checkbox or O-74c G-1. Defaults stand: Q-1 (c), Q-2 (b), **Q-3 (c)**, Q-4 (b), Q-5 (a). O-87 binds |
| dates | 2026-10-18 20:40 to 2026-10-19 00:20 |
| records | `E4/run-e4.sh` (stages), `E4/unit-plants.sh`, `E4/ck22-greps.sh`, `E4/probe/{App.vue,e4-probe.mjs,handoff-film.mjs}`, `E4/logs/` (every gate, build, witness, probe, film and capture log with its load; `stage-*.txt` the stage summaries; `wk-admission.log`), `E4/json/<arm>[-r2,-r3]/`, `E4/glance/` (sheets and 1728 frames), `E4/shots/` (probe frames), `E4/numstat-*.txt` |

## 0 · In brief

1. **CK-22, the consumer's anchor: restored on release, driven to the end, both engines, all four arms.** `promote` sets the host's own inline `position-anchor` (value and priority) aside and `hide` writes it back. H4's E-12 `consumer anchor · escape|blur` reads PASS on every build in both engines: off the stage at 159-184 ms, then +300 ms `--consumer-own`. The probe's new cell reads the same (Chromium 4/4 arms, WebKit 4/4 arms). With the write-back removed (plant `anchor-lost`), the probe cell FAILs both paths with `(removed)` (`logs/probe-plant-anchorlost-chromium.log`), and so does the unit case (`logs/unit-plants.log`). **E-M1 is restated** (§4).
2. **CK-22, the wheel: a wheel over a promoted control now scrolls its scroller, both engines, all four arms.** A promoted host listens for `wheel` and hands a pixel delta to the first scroller up from its footprint that can take it (it honours `overscroll-behavior: contain|none`; a scroller at its end chains on; a pinch or a line/page-mode delta is left to the platform). E-12 `slider wheel over engaged control`, keyboard-engaged at ×1.060 in the top layer: **box +30, page +0** on every build in both engines (pass 3: box +0, page +30). No `--migration wheel` was passed: the cell PASSes outright. Unit plant `wheel-chain` fails its case.
3. **Q-3 (c) exists as a build: `POINTER_STAGE`, one constant beside `KEYBOARD_VEIL`.** `"every"` promotes on every pointer (pass 3's E). `"coarse"` promotes a touch's hold and grows a fine pointer's hold **in place**: the same holder, grow, reach, singleton and exit clock, no top layer, no footprint, no veil. The keyboard promotes on both. Probe `pointer arm fine hold`: coarse arm, a mouse hold at +450 ms is engaged, on the stage, ×1.060 both axes, top layer false, footprint false, veil not engaged; every arm, promoted with its footprint and veil. `pointer arm touch hold` is promoted on both arms. All PASS in both engines. The promoting build read under the coarse arm's expectations fails 7 cells (`logs/probe-plant-armlabel-chromium.log`).
4. **CK-27: the probe's consumer-anchor cell drives the release to its end, and the films take no mid-film screenshot.** The `handoff pin fwd/rev` mid-film `page.screenshot` is gone. All four handoff cells pass in both engines; WebKit's largest one-frame move is 1.4 px. `handoff-film` reads only grow steps in WebKit, at most 2.8 px of left edge with the centre unmoved (`logs/handoff-film-noveil-coarse-webkit-*.log`).
5. **Gates green on the final source:** build, typecheck, `demo:dist:build` exit 0; vitest **245 files, 2392 passed, 10 expected fail, 1 skipped** (`logs/gates.log`, noveil-coarse arm). The stage, focus-veil and slider files pass 57/57 on each of the four arms (`logs/unit-arms.log`). The first gates run went red on two `focus-veil.test.ts` cases that drove a fine pointer and expected a promotion. They now drive a touch (`logs/gates-r1-focusveil-red.log`).
6. **One counterexample stays open, and it is not the arm's: CK-05's slider carry is bimodal near its bound.** Over 12 Chromium reads (3 per arm) the carry reads either 4.16-6.53 px or 1.37-2.93 px. Four reads fail the 4 px bound: noveil-coarse 2/3, veil-coarse 1/3, noveil-every 1/3, veil-every 0/3, at loads 23.9-32.8. The promoting arms fail too, so it is not the in-place path. P-A4-light read 0.00 px once. WebKit passes on every build. This is F-5's margin (§5 item 1).

## 1 · What was built

| item | CK | what | where |
|---|---|---|---|
| 1 · the consumer's anchor given back | CK-22 | `Holder.own` = the host's inline `position-anchor` value and priority, read in `promote` before the stage's pin is written; `hide` writes it back (or removes the property when there was none) | `engage/stage.ts` |
| 2 · the wheel over a promoted control | CK-22 | `onWheel` on a promoted host (added in `promote`, removed in `hide`): `scrollerFor(footprint, dx, dy)` walks up from the footprint to the first `overflow: auto|scroll|overlay` box that can move along the delta. A box that contains its overscroll ends the chain. The page's own scroller is never taken: with no scroller in the chain the wheel goes where it would anyway. `preventDefault` only when a scroller takes it. Pixel-mode deltas only (both target engines send pixels); no figure is minted | `engage/stage.ts` |
| 3 · Q-3's pointer arm | CK-04, CK-25 | `export const POINTER_STAGE: "every" \| "coarse"`. `useEngageStage` gains `promoteWanted`; `engageStage(host, veil, promoted)` creates a promoted holder or an **in-place** one (`inPlace`: `data-engage-stage`, the reach written from the host's own layout box about its painted centre, no popover, no footprint, no wheel listener). A holder keeps its mode until it leaves, so a mode never changes under a held control. The veil rises only under a promoted holder | `engage/stage.ts`, `useEngage.ts` |
| 4 · which hand | CK-04 | `useHold` returns `byTouch` (a `touchstart`, or a `pointerdown` whose `pointerType` is `"touch"`), set before the hold is acquired, so the stage reads the kind with the hold. The scrub reads its own press's `pointerType` | `engage/hold.ts`, `useEngage.ts` |
| 5 · the reach for an in-place host | CK-04, CK-12 | `--stage-reach` computes on `[data-engage-stage]` (was `[popover][data-engage-stage]`); the pin stays popover-only | `glass/engage-stage.css` |
| 6 · an in-place host's re-render landing | CK-20 | `onMutation` also reads in-place holders: their place in flow (the offset chain, free of the grow and of a glide in flight) is compared before and after, and a moved place is travelled on the `dock` row (`glide`), as a footprint's is | `engage/stage.ts` |
| 7 · comments | — | `engage-held` and `Slider.vue` name the in-place arm; `stage.ts` header gains "PROMOTED OR IN PLACE" and "WHAT A PROMOTION BORROWS, IT GIVES BACK" | `utilities/engage.css`, `slider/Slider.vue` |

**Unit cases** (`tests/composables/motion/engage-stage.test.ts`, +6 cases; the scrub case now expects `:popover-open` only on `"every"`), and the plants that fail them (`E4/unit-plants.sh`, each cure removed, the file run, the source restored byte-identical; `logs/unit-plants.log`, 20:47, load 12.0):

| plant | the case that fails |
|---|---|
| anchor-lost (the write-back removed) | "a consumer's own inline position-anchor is set aside while promoted and written back on release" |
| wheel-chain (no wheel listener) | "a wheel over a promoted control scrolls the scroller its footprint sits in, not the page" |
| promote-every-pointer (the arm ignored) | the fine-pointer hold case and the scrub case (2 failed) |
| veil-in-place (an in-place hold raises the veil) | the fine-pointer hold case |

A sixth case ("plant: a scroller already at its end does not take the wheel") passes, and it is what the first draft of item 2 failed. Its overscroll test read happy-dom's empty `overscroll-behavior` as containment.

## 2 · Patches and cost

Each patch passes `git apply --check` on the checkout at `bdd0a12ba` (and at `f29be73b7` when it was cut). 9152 lines each. `P-E4-noveil-coarse.patch` equals the worktree's final `git diff --binary HEAD` byte for byte (same sha1).

| patch | `KEYBOARD_VEIL` | `POINTER_STAGE` | sha1 |
|---|---|---|---|
| **`P-E4-noveil-coarse.patch`** | `false` | `"coarse"` (Q-3 (c)) | **`f567b5cd2e88721a059a8db3f428f206ff8e85ef`** |
| **`P-E4-veil-coarse.patch`** | `true` | `"coarse"` (Q-3 (c)) | **`4530d54af5f8e9307548be9ae3bda385a0216c74`** |
| **`P-E4-veil-every.patch`** | `true` | `"every"` (pass 3's E) | **`76d76ffc40d0ca1970620d3287ef0e9214bed120`** |
| **`P-E4-noveil-every.patch`** | `false` | `"every"` | **`25065a3898415af8e0e69f8949d1c98079e31d51`** |

Q-3 (c) is the coarse pair; the keyboard arm is still open, so both keyboard arms are built for it.

| measure | files | + | − | record |
|---|---:|---:|---:|---|
| vs HEAD | 178 | 4273 | 1464 | `E4/numstat-vs-HEAD.txt` |
| over P-A4-light | 21 | 1431 | 289 | `E4/numstat-over-A4light.txt` (src 16 files +880/−239) |
| **P-E4's own, over the carried E3 (merge tree `c9ec75cd`)** | **8** | **309** | **46** | `E4/numstat-E4-own.txt`: `stage.ts` +137/−27, `useEngage.ts` +15/−7, `hold.ts` +8/−2, `engage-stage.css` +4/−2, `engage.css` +2/−1, `Slider.vue` +2/−1, tests +141/−6. Read on the noveil-every arm, so one constant line is in it |
| pass 3: P-E3 vs HEAD | 175 | 3599 | 1458 | `../pass-3/P-E3.md` §2 |

Fixed cost of E now: `stage.ts` 426 lines (316 at pass 3). Per client: nothing; the Slider and the NumberField compose the door as before. Each arm is one line.

## 3 · Per CK row

**Builds and runs.** Full H4 battery E-1..E-12 on **noveil-coarse**, both engines. On **veil-every**, every witness that reads the slider, the stage or its veil (E-1, E-3, E-4, E-7, E-8, E-9, E-10, E-11, E-12). On **veil-coarse** and **noveil-every**, the cells the two constants can move (E-3, E-4, E-10, E-11, E-12). E-2, E-5 and E-6 read no stage path. The probe (23 cells) runs on all four builds in both engines, then the CK-25 capture on all four builds in both engines.

**Counts** are pass/fail/unmeasured from each witness's verdict line in `E4/logs/<arm>-<engine>-E-n.log`, with the 1-minute load at the witness's start. **Status** (the seat's reading; the grade is C-E4's): **CLOSED** green in both engines on every arm read, or by source and unit plant for a row with no engine leg; **OPEN** a counterexample stands; **OWNER** open under a standing default; **INHERITED** the open cells are another part's (A's, F5″'s, D2's, the owner's).

**Load.** Chromium battery 14.7-33.9 (21:39-22:16 and the re-reads 00:04-00:12); WebKit 18.2-35.2 inside the one admission (23:19-00:02).

| row | Chromium (load) | WebKit (load) | reading | status |
|---|---|---|---|---|
| CK-01 | noveil-coarse E-1 92/2/2U (28.8); veil-every 92/2/2U (17.0) | 92/4 (32.3); 92/4 (31.5) | latch 54/55, `dock` unproven (D2); Sheet PRM press no target (O-74c G-1); Aurora UNMEASURED engine limit (Chromium), graded FAIL 1.23 vs 1.15 (WebKit). Identical to P-A4: the stage does not disturb the census | INHERITED |
| CK-02 | E-2 147/17 (29.5) | E-2 144/20 (34.6) | Switch, Radio and accordion cells as P-A4 reads them. WebKit adds `toggle commit·programmatic light` and `arrival·late light` at a rise of **0.0099** against 0.01, a cell P-A4's WebKit run passed. E does not touch the toggle. Seen once at load 34.6, not re-run (it needs a second WebKit admission) | OWNER (Q-5), A's |
| CK-03 | E-2 mount and quiet arrivals pass (in the counts) | same | A's door, unchanged | INHERITED, closed on A |
| **CK-04** | E-3 **22/0** on all four arms (21.7-31.6) | **22/0** on all four (20.8-32.9) | desk pointer-held ≥ ×1.03 on both pointer arms (in place reads ×1.060 inline and block, probe); keyboard engagement ×1.060 on both keyboard arms; Tab register, modifier, character and script-focus cells as pass 3; phone (touch) promoted on both arms | **CLOSED** (all four arms, both engines) |
| CK-05 | noveil-coarse E-4 13/1/4U (23.9), r2 14/0 (30.3), r3 13/1 (24.5); veil-coarse 13/1 (27.7), 14/0, 14/0; noveil-every 13/1 (32.8), 14/0, 14/0; veil-every 14/0 ×3 | 11/0/8U on all four (20.8-28.3) | §0 item 6: the slider carry is bimodal, 4 of 12 Chromium reads under the bound, on promoting and in-place arms alike. Sheet UNMEASURED (O-74c G-1); WebKit Carousel UNMEASURED (no touch scrolling) | OPEN (F-5's margin; the Sheet's owner) |
| CK-06 | E-5 56/56 (26.7) | 56/56 (24.7) | P-A4's cure carried; E touches no press | CLOSED on A's cure |
| CK-07 | E-6 4/2/8U (22.5) | 2/2/8U (29.5) | no idle rung (Q-2 (b)) | OWNER |
| CK-08 | E-7 6/1 (22.9; veil-every 16.0) | 6/1 (30.0; 27.5) | `data-engaged`: `stage.ts` only, the in-place arm included; `data-press` `press.ts`; `data-held` `useEngage.ts` and D2's `GlassDock.vue`, named. `useHold`'s `byTouch` writes no attribute | CLOSED (named clause) |
| CK-09 | E-8 19/0 (22.0; 16.0) | 19/0 (30.1; 27.0) | the in-place glide rides the `dock` row like the footprint's; no new literal | CLOSED |
| CK-10 | E-9 75/3 (19.9; veil-every 75/3) | 75/3 (26.0); veil-every 74/4 (28.3; accordion dark 0.0100) | Switch, Radio and accordion light under reduce, A's (P-A4 §3) | INHERITED (A, Q-5) |
| CK-11 | — | — | E adds no press recipe | CLOSED (A's) |
| CK-12 | — | — | no figure minted: the wheel forwards the event's own delta; the in-place reach is the same `--stage-reach` formula; `--scale-engage` stays the ladder's row; `--scrub-pitch` as pass 3 | CLOSED (source + unit) |
| CK-13 | probe forced colours / reduced transparency PASS on all four arms (veil `display: none`; coarse arm: in place, ×1.060, no veil raised) | UNMEASURED (Playwright WebKit applies neither query: the engine's limit) | E-12 `fc-reach` 63/63 | Chromium closed; WebKit the engine's limit |
| CK-14 | E-12 63/63 incl. `fcslop` (21.2) | 62/1U (28.1) | the 44 px floor holds under grow and promotion; probe `numfield coarse` PASS both engines | CLOSED |
| CK-15 | E-10 `hand-off singleton fwd|rev` PASS all arms: max 1 engaged root per frame over 107-120 frames | same over 56 frames | | CLOSED |
| CK-16 | E-12 `rest-running off-screen`, `rest layouts` PASS | off-screen PASS; layouts UNMEASURED (no counter) | F5″'s F-10 carried | CLOSED in Chromium; WebKit layout cell the engine's limit |
| CK-17 | — | — | **UNMEASURED (owner's safaridriver checkbox)**: includes the wheel forwarding and the in-place grow in real Safari | OWNER |
| CK-18 | E-4 slider, sortable and tabs consume the one rule | same | Sheet UNMEASURED | INHERITED (O-74c) |
| CK-19 | E-1 ambient UNMEASURED engine limit | graded FAIL | H4 §1.2 | INHERITED |
| **CK-20** | E-10 PASS all arms: outgoing and incoming centre moves 0.0 px; drop 0.0068-0.0089 within own release + 0.002; veil arms 1.00 throughout. Probe pin cells 0.0 px gap, largest move 0.8-1.4 px; `between landing` PASS on both pointer arms (coarse: in place, the 40 px insert travelled, largest hold move 2.8 px; release 1.1 px against 1.1) | E-10 PASS all arms (drop 0.0125-0.0139 within own release + 0.002); probe pin cells PASS with no mid-film screenshot; `between landing` largest hold move 5.6-6.1 px | the in-place re-render glide (item 6) carries D-1 to the coarse arm | **CLOSED** |
| CK-21 | E-11 3/0/1U all arms | 3/0/1U all arms | the stage's read-back reads the in-place host too (the reach on `[data-engage-stage]`) | CLOSED for E's inputs |
| **CK-22** | E-12 wheel and both anchor cells PASS on all four arms; probe anchor-restored PASS | same | E-M1 restated; the wheel stated as cured (E-M6); the in-place arm's consumer-visible paths written (E-M7); greps re-run (§4) | **CLOSED** for E's surfaces |
| CK-23 | — | — | §2 | CLOSED |
| CK-24 | E-1 static cells pass | pass | | CLOSED (A's) |
| CK-25 | CAP 12/0 on all four arms (14.1-16.4) | CAP 12/0 on all four (17.7-21.9) | §5. The grade is C-E4's | for C-E4 |
| CK-26 | — | — | no lighting layer; the coarse arm removes the veil from every fine-pointer hold. The veil still computes `blur(20px) saturate(1.5)` until the 10.2.0 token wave lands (probe `keyboard veil` line) | CLOSED (source) |
| **CK-27** | probe plants: `anchor-lost` 2 FAIL; the promoting build under the coarse expectations 7 FAIL; unit plants 4/4 bite | the H4 harness plants `e12-anchorlost` and `e12-wheelchain` stand on H4's WebKit self-test | the consumer-anchor probe cell drives the release to its end; no film screenshots mid-film. No alias: `:active`, the shared anchor and the old wheel chain are gone, not kept beside | **CLOSED** for E's cells |

E's own rows in §P3-8.1 (CK-22, CK-27, the films, the Q-3 pointer arm) are closed in both engines on all four arms. The open rows are A's, the owner's, D2's or O-74c's, plus CK-05's carry margin.

## 4 · CK-22 · MIGRATION rows

Consumer greps were re-run over nine siblings, main trees only, read only (`E4/ck22-greps.sh`, `E4/logs/ck22-greps.txt`, 2026-10-18 20:51; node_modules, dist*, worktrees, `.claude`, docs, bench excluded; value.js by grep only).

| sibling | `<Slider>` | `<NumberField>` | `position-anchor` |
|---|---:|---:|---|
| atlas | 2 | 0 | 2, both comments |
| bbnf-buddy | 1 | 0 | 0 |
| keyframes.js | 5 | 1 | 2, its own `--stage` in `demo/styles/layout.css`, not on a slider |
| speedtest | 2 | 6 | 0 |
| value.js | 6 | 1 | 0 |
| fourier-analysis | 5 | 1 | 0 |
| sci-report | 5 | 0 | 0 |
| chicago, slides | 0 | 0 | 0 |

No sibling selects `data-engaged` or `data-engage-stage`, or binds a wheel handler in a file that renders a Slider or a NumberField. Three files render a Slider and carry an `overflow: hidden` class or rule: `bbnf-buddy/src/components/EditableSlider.vue:178`, `speedtest/src/components/dashboard/DashboardMapControls.vue:97` (the panel around the slider at :134), and `value.js/demo/workbenches/extract/ExtractControls.vue:45` (a sibling bar, likely not an ancestor). Whether the clip is an ancestor of the slider is a source reading only; it is unmeasured in paint.

| # | consumer-visible path | MIGRATION row (for `MIGRATION.md` at the cut) |
|---|---|---|
| **E-M1 (restated)** | the stage's anchor names | "An engaged control that the stage promotes is pinned to its footprint by an anchor name the stage generates, `--engage-footprint-<page>-<n>`, written inline on the footprint and the control. The `--engage-footprint-` prefix is the library's; a consumer anchor under it is unsupported. A consumer's own inline `position-anchor` on a Slider or NumberField host is set aside while the control is promoted and **written back, with its priority, when it leaves the stage**. A value the consumer writes while the control is promoted is overwritten by that write-back." |
| E-M6 | the wheel over a promoted control | "A wheel over a promoted control scrolls the nearest scroller its footprint sits in, as it would at rest, and honours that scroller's `overscroll-behavior`. A pinch-zoom wheel and a line- or page-mode delta are left to the platform." |
| E-M7 | Q-3's pointer arm (`POINTER_STAGE`), for the arm the owner rules | on `"coarse"`: "A fine pointer's hold on a Slider, or its scrub of a NumberField, grows the control where it stands, in its own stacking context. It does not enter the top layer and raises no veil, so an `overflow: hidden` ancestor clips the grow and the Slider's loupe, and a later positioned sibling can paint over it. A touch's hold and a keyboard engagement promote it, as before." On `"every"`: E-M1 as written, for every pointer |
| E-M2..E-M5 | `../pass-3/P-E3.md` §4 | stand. E-M4 now reads "a scrubbing NumberField grows on the engaged stage (in place for a fine pointer on `"coarse"`)" |
| P-E2 rows 1-9, A's M-1..M-11 | `../pass-2/P-E2.md` §4, `../pass-3/P-A3.md` §4, `P-A4.md` §4 | stand under the composition |

`useHold`, `useEngage` and `stage.ts` are not exported, so `byTouch` and `POINTER_STAGE` have no consumer surface.

## 5 · CK-25 · the owner-glance set

Captured by the harness's `capture.mjs` on each build's app: 9 class exemplars × rest, pressed, held, engaged, committed, released × light and dark × fine and coarse × both engines × **four arms** = **1728 frames** under `E4/glance/frames/`, named `{arm}-{engine}-{pointer}-{theme}-{scene}-{state}.png`. Sheets are `E4/glance/{arm}-{engine}-{fine,coarse}.png`, and indexes are `E4/glance/{arm}-index.json` (the WebKit run's). CAP is 12/0 on every run. The `--scenes slider` argument for the two partial arms was not honoured by `capture.mjs`, so those runs captured every scene. The scrub, keyboard and pointer-hold viewport frames from the probe are under `E4/shots/`.

The frames that answer Q-3, as this seat reads them (the grade is a non-author's):

| pair | coarse arm (Q-3 (c)) | every arm |
|---|---|---|
| fine pointer held, light | `glance/frames/noveil-coarse-chromium-fine-light-slider-held.png`: the slider grown ×1.06 in flow, the world crisp, no veil | `glance/frames/veil-every-chromium-fine-light-slider-held.png`: promoted, the world under the milky veil |
| coarse touch held | `glance/frames/noveil-coarse-{chromium,webkit}-coarse-light-slider-held.png`: promoted, the veil up (WebKit shows the dim without the blur: Playwright WebKit paints no `backdrop-filter`) | same |
| keyboard engaged, the two keyboard arms | `glance/frames/noveil-coarse-chromium-fine-dark-slider-engaged.png` (no veil, ringed, crisp) · `glance/frames/veil-coarse-chromium-fine-dark-slider-engaged.png` | `glance/frames/{noveil,veil}-every-chromium-fine-*-slider-engaged.png` |

The O-87 objection pass 3 raised against the veil (C-E3 §3) now falls only on a touch's hold and, on the veil arm, on the keyboard. A fine pointer's hold on the coarse arm keeps the world crisp. The coarse Switch press and the disclosed wash are A's (P-A4 §5).

## 6 · Open gaps

1. **CK-05, the slider carry (F-5's margin).** It is bimodal: 4.16-6.53 px or 1.37-2.93 px against the 4 px bound. It failed 4 of 12 Chromium reads across three arms, including a promoting one, and passed every WebKit read. P-A4-light read 0.00 once. The release-rule seed reads low on some drives. Below the bound, the "settles past release" figure grows from −6.3..−7.5 px to −10.0..−11.9 px, so the fling does arrive late or weak. Not cured here: it is F5″'s release rule, and F-5's ruling is still owed (REGISTRY §P3-6).
2. **CK-02 toggle (WebKit, A's):** a rise of 0.0099 against 0.01, seen once at load 34.6 and not re-run.
3. **The in-place arm's paint limits (E-M7).** An `overflow: hidden` ancestor clips the grow and the loupe, and a later positioned sibling can cover it. Three consumer files may carry such an ancestor (§4); none was measured in paint.
4. **A touch pan over a promoted control** is not forwarded to its scroller the way the wheel now is. The slider takes horizontal touches (`touch-action: none`), and a vertical pan that starts on a promoted slider has no reading. Not driven: macOS WebKit has no touch scrolling, and no Chromium cell was written.
5. **The clip escape is still engine-split** (§P3-7 item 4). Chromium's `position-visibility` hides a promoted control whose footprint scrolled out of its scroller; Playwright WebKit leaves it hit-testable. On the coarse arm this applies only to touch and keyboard engagements. Not re-measured.
6. **Probe plants in WebKit.** The probe's two plants ran in Chromium only. WebKit's anchor and wheel plants are H4's harness plants, which stand on H4's WebKit self-test.
7. **Inherited, not E's:** the `dock` latch and `GlassDock.vue`'s `data-held` (D2); Q-5's near-white commits (CK-02, CK-10); the Sheet (O-74c G-1); the Aurora headless cell (CK-19); Q-2 (CK-07).
8. **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox), including VoiceOver on a promoted control, the wheel forwarding, and iOS's touch pan over a promoted control.

## 7 · Fences and the machine

- No tracked source in the checkout changed, and no git write ran there. The merge used `git merge-tree` and three temporary index files (`GIT_INDEX_FILE`) in the worktree; `git read-tree -u --reset` ran on the worktree's own index. `git apply --check` was the only command run against the checkout's tree. Writes in the checkout: `pass-4/P-E4.md`, the four `P-E4-*.patch`, and `pass-4/E4/`. Two backup copies used by the plant scripts lived under the seat's worktree directory and were removed with it.
- Siblings were read by grep only; value.js was not built or run. No `~/.claude` read: the guard ran as a binary.
- **Every build, test and browser run went through `guarded`.** Chromium took one `guarded --timeout 90` per witness and `--timeout 30` per probe, film or capture. Builds were `--timeout 20`. Typecheck and single-file vitest ran `--light` (no browser); the full vitest ran heavy, `--maxWorkers=2`. **WebKit took one `guarded --exclusive webkit --timeout 90` admission** for every WebKit stage: queued 22:16:25, admitted 23:19:36 (a 63-minute wait, load 32.3), released 00:02:53 (load 24.7), `guarded exit 0` (`E4/logs/wk-admission.log`). No WebKit stage was skipped or left UNMEASURED for want of the lock. No page close and no `ENGINE CLOSED` occurred. Each witness and probe is its own process, under the 60-navigation restart. No zone refusal.
- Headless shell, no GPU arguments, one browser per run, a context per cell, closed in `finally` (the harness's wrapper and the probe's). One heavy run at a time: the Chromium phase, then the WebKit admission, then the Chromium re-reads and plants, in sequence.
- **Process slips, mine.** (a) While waiting on the first vitest I started several `until grep` shell waiters and later killed them with `pkill -f`, which also ended my own monitor. They only read a log file, and no run was affected. (b) The first arm-label plant used a label containing "every", so the probe read the every arm and passed. It is kept as `logs/probe-plant-armlabel-chromium-mislabelled.log`; the plant re-ran with a clean label. (c) The two "slider only" captures captured every scene (§5).
- Nothing is left running. The worktree and `…/E4/out` are removed, and `.claude/worktrees/bl/D5/p4/E4/` is gone.
