# D5 pass 4 · P-A4 · route A on F5″ (§P3-8.1), as two builds for Q-5

| field | value |
|---|---|
| seat | D5 pass 4, **P-A4 PROTOTYPE** (route A, the declared register), per `../REGISTRY.md` §P3-8.1 and §P3-8.3 wave 2 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD + `F5pp.patch`, with `../pass-3/P-A3-light.patch`'s delta over F5′ merged onto it (`git merge-tree`, base tree HEAD+F5′, sides HEAD+A3-light and HEAD+F5″: a clean three-way merge; the two overlapping files, `Skeleton.vue` and `StatusDot.vue`, carry both hunks). Cut at `8f4d7a98e`. HEAD is now `a4a951090`; `git diff --stat 8f4d7a98e HEAD -- src tests package.json demo vite.config.ts` is empty, so both patches are cut against today's source |
| patches | **`P-A4-light.patch`** sha1 **`ec2cb04176ccccc5f7889a19c13333f526bd1ec7`** (Q-5 (a), arm iii, the default; **P-E4 builds on it**). **`P-A4-geom.patch`** sha1 **`5f9dd12f01f8c06ef8724f83151fc251a3bbd17c`** (arm ii, the geometric pop, with a reduce light leg). Both sha1s were read by `shasum` at return. Each contains F5″ (and so F5′) and applies on its own at HEAD: `git apply --check` passes for both on the checkout at `a4a951090` |
| worktrees | `.claude/worktrees/bl/D5/p4/A4/wt` (light) and `…/A4/wt-geom` (geom), detached at HEAD, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`, so there was nothing to link). Both were removed with `git worktree remove --force`, the build outputs deleted, and `…/A4/` removed. Nothing is left there |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU arguments, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H4's, read from the checkout, unedited. Every battery ran on the harness's own app (`scenes/App.vue`, scene app sha `3c135d6264f8` in every build log) |
| INBOUND | `../../../audit/INBOUND.md` was re-read at the seat's start: mtime 2026-10-16 06:40, no ruling on Q-1..Q-5, the safaridriver checkbox or O-74c G-1. The defaults stand: Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds |
| dates | 2026-10-18, 17:51 to 20:45 |
| records | `A4/run-a4.sh` (stages), `A4/logs/` (every battery, probe and gate log, each with its load), `A4/json/{light,geom,geom-arms,plant-fc,light-r2,light-r3}/`, `A4/probe/` (the four probes below and `pxdiff.mjs`), `A4/glance/` (sheets and 864 frames), `A4/numstat-*.txt`, `A4/ck22-greps.sh` with `A4/logs/ck22-greps.txt`, `A4/plant-fc.diff.txt` |

## 0 · In brief

1. **CK-06 is cured at its cause, and it was not the wash's sustain.** I filmed the held touch every 25 ms (`A4/probe/pressfilm.mjs`). On the base build (A3-light on F5″), Chromium's long-tap gesture sets `:active` **175-200 ms after touch-down**. The wash then attacks on its 55 ms clock. It sits flat at `/ 0.12` from +250 ms to +1250 ms on 12 of 12 holds (`logs/pressfilm-base-chromium.log`, load 17.0-18.4). E-5's +200 ms reference therefore lands inside the attack. Its canvas round-trip then reads the colour's RGB through an 8-bit premultiply, and at alpha 0.006-0.03 that reads farther from rest than the landed wash. The result is a ×0.73 or ×0.89 "sag" on one hold in three (`logs/diag-base-chromium-E-5.log`: accordion light 0.286 → 0.209, dark 1.732 → 1.549).

   The real defect is the latency: the press acknowledges at about +250 ms, past `ACKNOWLEDGE_WINDOW_MS` (150). **The cure:** every light-pressing committing member keys its press on the door's press mark (`data-press`, written on `pointerdown` by `engage/press.ts`) and no longer on `:active`. `useEngage` now marks the press for any `commit` door without a press spring, and a strip names the tab it landed on (`organ`). The wash now starts at +25-50 ms and lands by +100 ms in Chromium (`logs/pressfilm-light-chromium.log`). **E-5 reads 56/56 on three batteries in Chromium** (load 12.9, 33.9, 19.3 at start) and **56/56 on two in WebKit** (37.1, 29.9). Each battery takes three holds per cell. The accordion's press-only property is present: E-5 `accordion press` names `background-color` as press-only in both themes and both engines.
2. **CK-14 / CK-27 close by construction and by plant.** The forced-colours arm now names the seat exactly as the seat selectors do, with the dock triggers excluded. E-12 reads **63/63 in Chromium** (17.6) and **62 P / 1 U in WebKit** (46.8; the U is the layout counter WebKit lacks). The plant `plant-fc` (the light build with only that exclusion removed; `A4/plant-fc.diff.txt` is the planted `engage.css` against HEAD, whose forced-colours `::after` line has no exclusion) fails `fcslop dt-dropdown` in both themes and `fc-reach coarse docktrig`, 3 FAIL per engine (Chromium 60/3, load 35.2; WebKit 59/3/1 U, load 45.6). The slop goes from 44×44 to 0×0, and the tap lands on `div`.
3. **CK-10:**
   - **SegmentedTabs gains a light seat under reduce.** Each tab carries a `[data-engage-light]` span keyed on its own `data-active`. It paints only under reduced motion, where the indicator's travel retires. E-9's tabs cells pass in both themes and both engines.
   - **The geom build gains a reduce light leg.** The light arm's seat plays the commit under reduce only. Geom E-9 reads **75/3 in Chromium and 74/4 in WebKit**, against pass 3's 60/18 in both, so arm ii is complete: every member keeps a light leg under reduce except the three near-white faces the light build also loses.
   - Light-build E-9 reads **74/4 Chromium, 75/3 WebKit**, against pass 3's 72/6.
4. **CK-02/CK-10 Radio dark: the envelope was read against the fill's clock, and the light was moved after the fill.** The face's fill rides `press-drain` release (120 ms) and the seat peaked at +30-45 ms, when the fill was 32-47 % in (`logs/radioread-base-chromium.log`). The light now waits for the fill: `transition-delay: var(--engage-press-drain-release)` on the control bit's light layer, at a rank above the seat's shorthand.

   **In paint** (`A4/probe/facefilm.mjs`, the committed face's screenshot luminance, its peak after the fill lands, above its rest at +900 ms):

   | face | base, Chromium | base, WebKit | light, Chromium | light, WebKit |
   |---|---|---|---|---|
   | Radio dark | 0.0001 | 0.0019 | **0.0258** | **0.0190** |
   | Radio light | 0.0000 | 0.0008 | **0.0199** | **0.0140** |
   | Checkbox dark | 0.0000 | 0.0024 | **0.0290** | **0.0235** |
   | Checkbox light | 0.0000 | 0.0000 | **0.0240** | **0.0178** |
   | Switch dark | 0.0000 | 0.0000 | **0.0238** | **0.0185** |
   | Switch light | 0.0033 | 0.0064 | **0.0178** | **0.0189** |

   **E-2: the Radio dark closes on every path in both engines.** E-2 reads light 147/17 in Chromium and 146/18 in WebKit (pass 3: 144/20 and 141/23). **The near-white ceilings are not ceilings in paint:** the Switch and Radio light faces clear 0.01 in pixels in both engines. E-2's arm iii and E-9's `commit-light` still fail them at 0.0006-0.0064. Their computed composite stacks every descendant's background as a whole-face layer: the Switch's white thumb, and the Radio's 8 px dot, read as covering the 20 px face. That composite then sits at 0.92-0.96 whatever the light does (§5 item 1).
5. **CK-25:**
   - **The disclosed press is a wash, not a slab.** It is the fill ladder's `--fill-hover` rung (the "transient pointer answer"; `--fill-selected` is persistent state). In the coarse held frame the row is a pale tint where pass 3 painted an opaque `#dfdedc` bar (`A4/glance/frames/light-chromium-coarse-light-accordion-held.png` against `../pass-3/C-A3/glance/frames/ca3-light-chromium-coarse-light-accordion-held.png`).
   - **The coarse Switch press is visible.** Its pressed frame at +120 ms differs from rest by 676 px, max Δ 27 (Chromium), and 664 px, max Δ 26 (WebKit). Pass 3's Chromium pressed frame was pixel-identical to rest (0 px, `../pass-3/C-A3/glance/frames/ca3-light-chromium-coarse-light-switch-*`).
   - The grade is the critic's.
6. **Gates green on both builds:** build, typecheck, `demo:dist:build` exit 0; vitest **244 files, 2371 passed, 10 expected fail, 1 skipped** (`logs/gates-light-b.log`, `logs/gates-geom-b.log`). The new `tests/components/engage-light-press.test.ts` (12 cells) fails 7 of 12 with the three cures removed (`logs/unit-redcheck.log`). The other 5 are the sheet-text cells for the `[data-press]` keys, which the cures do not touch.

## 1 · What was built

### 1.1 · The light build (`P-A4-light.patch`)

| item | CK | what |
|---|---|---|
| the light press is the door's mark | CK-06, CK-17, CK-25 | `useEngage.ts`: a door with `commit` and no `press` spring calls `usePressMark(host, { organ })`. The new option `organ` names the element a press marks (a tab in a strip). The header states why `:active` is refused: the 175-200 ms touch latency, and iOS Safari's `touchstart`-listener rule (X-8). `press.ts` is still the one writer of `data-press` (E-7 `writers data-press` passes in both engines) |
| the press recipes read the mark | CK-06, CK-25 | `control-bit.css`, `toggle-group/styles.css` (both press rules), `tabs/styles/segmented.css`, `glass-chip.css` and `engage-disclosed` (press and its forced-colours ring) key on `[data-press]`, not `:active`. Nothing else in them changes |
| the disclosed press is a wash | CK-25 | `engage-disclosed`'s press is `color-mix(--foreground × --fill-hover, transparent)`, the ladder's transient rung. No figure is minted |
| the control bit's light waits for its fill | CK-02, CK-10 | `control-bit.css`: `.control-bit .control-bit__face > .control-bit__light { transition-delay: var(--engage-press-drain-release) }`, the face's own fill clock, at (0,3,0) over the seat's (0,2,0) shorthand. Both edges |
| the tab's reduce light seat | CK-10 | `SegmentedTabs.vue`: each tab carries `data-engage-face` and a `.segmented-tab__light[data-engage-light]` span. `engage.css`'s committed rule and AUTH-4's committed row add `:where(.engage-chosen) [data-active] > [data-engage-light]`. `segmented.css` hides the span outside reduce (it never sets `display` under reduce, so the forced-colours arm still removes it) and keeps it under the label (`z-index: -1` in the tab's own stacking context). The strip, now face-ful, no longer carries a face-less `::after` seat |
| the forced-colours arm's reach | CK-14, CK-27 | `engage.css`: the arm's `::after` adds `:where(:not(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger))`, as the three seat selectors do |
| AUTH-4 | CK-10 | the block's committed row gains the tab's `[data-active]`. New digest `e4cd4240dafdc45fe2cfd59e0f918fd5c7c4145d04ccc317e76e3a68077fbdec`, lines 265-298. The BJ row and a dated amendment are in the patch (`docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md`); `tests/styles/engage-floor.test.ts` arms it and passes |

Tests: `tests/components/engage-light-press.test.ts` (new). It checks:
- four members marked on the primary `pointerdown` and cleared on `pointerup`;
- the tab strip marks the tab, not the strip, and every tab carries its light seat;
- the five sheets key on `[data-press]`, and the disclosed press is the hover rung with no `:active`;
- the forced-colours exclusion;
- the fill-clock delay.

`binary-triad.test.ts` now asserts one `[data-press]` press rule and zero `:active` rules.

### 1.2 · The geom build (`P-A4-geom.patch`)

It is the light build plus 9 files, +140/−74 (`A4/numstat-geom-over-light.txt`). It re-applies pass 3's pop (`--rung-commit` on `panel`, crest `--scale-commit-pop` 1.02 / `--scale-commit-pop-bit` 1.05 on the scale paper, the leg in the button, chip, toggle and disclosure lists, the `springPresets.ts` note). **Unlike pass 3, it keeps the light seat and the face spans**, wrapped in `@media (prefers-reduced-motion: reduce)`: the pop is the commit, and under reduce the light is. AUTH-4's bytes are unchanged (the same digest, lines 307-340). `engage-ladder.test.ts`'s PRM cell is restated for this build: two reduce blocks name the seat, the leg (content, opacity) and AUTH-4 (durations only), and no seat paints outside reduce.

## 2 · Cost (CK-23)

| measure | files | + | − | record |
|---|---:|---:|---:|---|
| light vs HEAD | 168 | 2951 | 1284 | `A4/numstat-light.txt` (src 134 +2053/−1083, tests 22 +854/−182) |
| geom vs HEAD | 169 | 3018 | 1285 | `A4/numstat-geom.txt` |
| light over F5″ | 130 | 1158 | 672 | `A4/numstat-light-over-F5pp.txt` (src 107 +819/−539) |
| **P-A4's own, over A3-light + F5″** | **11** | **224** | **25** | `A4/numstat-light-over-A3light.txt` less F5″'s six floor files: src 8 files +93/−23, tests 2 +124/−1, docs 1 +7/−1 |
| geom over light | 9 | 140 | 74 | `A4/numstat-geom-over-light.txt` |
| pass 3: A3-light vs HEAD | 165 | 2542 | 1280 | `../pass-3/P-A3.md` §2 |

Per member, the light press costs nothing in a component, because the door does it. The tab strip costs one `organ` line and one span.

## 3 · Per row (CK-01..CK-27)

Counts are pass / fail / unmeasured from the run line of each `A4/logs/<build>-<engine>-E-n.log`. Load is the 1/5/15-minute average at the witness's start. Status words: **CLOSED** means green in both engines on this build, or by a source reading for a row with no engine cell. **OPEN** means a counterexample stands. **OWNER** means open under a standing default. The grade of every row belongs to C-A4; these are the seat's readings.

| row | Chromium (load) | WebKit (load) | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/2/2 U (17.8) | E-1 92/4 (33.5) | The latch reads 54/55: `dock` is unproven (D2's fence). The Sheet PRM press has no target (O-74c G-1). The Aurora is UNMEASURED "ENGINE LIMIT" in Chromium and graded FAIL in WebKit (H4 §1.2). The geom build reads the same (16.9 / 52.0) | OPEN (D2, O-74c, ambient) |
| CK-02 | E-2 147/17 (19.4) | E-2 146/18 (27.7) | **Radio dark closes on every path in both engines.** Still failing: the Switch light (5 cells), the Radio light (5) and the accordion (light 4, dark 3), at a rise of 0.0006-0.0068 (light) and 0.0094-0.0100 (accordion dark). In paint the Switch and Radio light clear 0.01 in both engines (§0 item 4); the composite's whole-face descendants hold them at 0.92-0.96 (§5 item 1). The accordion's white light over a near-white row is a true ceiling in paint (0.0000 excess, both engines). **Geom with arms i,ii,iii: 164/164 in both engines** (22.7 / 42.5); under the default arms 88/76 (arm ii not admitted) | **OWNER** (Q-5); the Switch and Radio light are a harness read gap (§5) |
| CK-03 | E-2 mount and arrival cells pass | same | The quiet cells pass: no CK-03 cell is among the E-2 fails. The `arrival·late` fails are CK-02's arm (Switch, Radio, accordion) | CLOSED |
| CK-04 | E-3 20/2 (13.5) | E-3 20/2 (27.3) | The phone touch-held reads ×1.000 (A alone has no phone arm under Q-3 (c); E's composition carries it) | OPEN on A (E's) |
| CK-05 | E-4 13/1/4 U (14.0); **re-read 14/0/4 U twice** (18.5, 12.5) | E-4 11/0/8 U (26.9) | The one fail is `slider fling carries velocity` (difference 0.00 / −7.56 px). It was NOT-REPRODUCED on two re-runs (`logs/light-r{2,3}-chromium-E-4.log`) and P-A4 does not touch the slider's door. The Sheet and the WebKit Carousel are UNMEASURED | OPEN (UNMEASURED cells) |
| CK-06 | E-5 **56/56 on three batteries** (12.9, 33.9, 19.3) | E-5 **56/56 on two** (37.1, 29.9) | §0 item 1. The toggle's and accordion's `sustain` pass three reads per cell on every battery. The accordion's press-only property is `background-color`. Geom 56/56 in both (20.4 / 34.1) | **CLOSED** |
| CK-07 | E-6 4/2/8 U (21.4) | E-6 2/2/8 U (26.2) | No idle animation (`s6 present` FAILs as Q-2 (b) wants) | OWNER |
| CK-08 | E-7 6/1 (23.4) | E-7 6/1 (25.8) | `data-held` has two writers, `useEngage.ts` and D2's `GlassDock.vue`, named (F-4). `data-press` has one writer, `press.ts`; the new light press goes through it | CLOSED by the named clause |
| CK-09 | E-8 19/0 (25.3) | E-8 19/0 (28.3) | The new delay is a row token (`--engage-press-drain-release`); no literal | CLOSED |
| CK-10 | E-9 74/4 (20.1); geom 75/3 (27.3) | E-9 75/3 (26.7); geom 74/4 (33.1) | The tabs now keep a light leg under reduce in both themes and both engines. The Radio dark passes. Remaining: Switch light, Radio light and accordion light in both builds and engines, and accordion dark at 0.0099 (Chromium light build) and 0.0097 (WebKit geom), under the 0.01 bound. **Under reduce in paint** (`logs/facefilm-{light,geom}-prm-*.log`) every control-bit face clears 0.01 in both engines and both builds (0.0096-0.0329), except the Switch light on the light build in Chromium, at 0.0096. The tabs light peaks at +33-38 ms, 0.0401 (Chromium) and 0.0348 (WebKit) above rest. The tabs dark shows 0.0004-0.0016 in paint: its light peaks before the indicator lands under the tab (§5 item 3) | OPEN (the near-white faces under Q-5; the accordion dark by 0.0001-0.0003) |
| CK-11 | — | — | Source: no `.tap-squish` or `.interactive-item` rule; nothing P-A4 adds sets `scale: none` | CLOSED (source) |
| CK-12 | — | — | The delay is the fill's own clock token, and the disclosed wash is a ladder rung: nothing is minted. On A alone, `--scale-engage` is still off the ladder's engaged row (E carries it, `../REGISTRY.md` §P3-4) | OPEN on A alone (E's) |
| CK-13 | E-12 `fc-reach` 63/63 | `fc-reach` 62/62 | The forced-colours arm now reaches only seats. The disclosed press's `Highlight` ring now keys on `[data-press]`. P-A3's recipe-by-recipe probe (`../pass-3/A3/probe/a3-probe.mjs`) was not re-run here (§6) | CLOSED on the reach; the recipe read is the critic's |
| CK-14 | E-12 `fcslop` 6/6 (17.6); plant 0/2 on dropdown | same (46.8); plant 0/2 | §0 item 2 | **CLOSED** |
| CK-15 | E-10 6/0 (16.1) | E-10 6/0 (35.8) | `hand-off singleton fwd|rev` pass in both engines (H4's count) | CLOSED |
| CK-16 | E-12 `rest-running off-screen` and `rest layouts` pass | off-screen passes; layouts UNMEASURED | F5″'s F-10, carried | CLOSED in Chromium; the WebKit layout cell is the engine's limit |
| CK-17 | — | — | **UNMEASURED (owner's safaridriver checkbox).** The light press no longer relies on `:active`, so X-8's `touchstart` clause no longer applies to the five recipes (§1.1) | OWNER |
| CK-18 | E-4 slider, sortable and tabs cells pass | same | The Sheet is UNMEASURED (O-74c G-1) | OPEN (Sheet) |
| CK-19 | E-1 ambient UNMEASURED (engine limit) | graded FAIL | H4 §1.2. Not route A's | OPEN |
| CK-20 | E-10 6/0 | 6/0 | Escape, hand-off and re-render continuity pass | CLOSED on A's paths |
| CK-21 | E-11 2/0/2 U (15.8) | 2/0/2 U (40.3) | The commit's loud read is unchanged (the door's `readCommit`). P-A3's 33-cell probe was not re-run (§6) | CLOSED by E-11; the probe is the critic's |
| CK-22 | — | — | §4: three new MIGRATION rows, greps re-run at this seat | rows written; the critic's read |
| CK-23 | — | — | §2 | CLOSED |
| CK-24 | E-1 static cells pass | pass | unchanged | CLOSED |
| CK-25 | CAP 12/0 | CAP 12/0 | §5 | for C-A4 |
| CK-26 | — | — | No lighting layer is added. The disclosed press gets lighter (O-87: flatter, de-slop). The delay moves an existing layer in time. The tab's light is the existing seat, under reduce only. The geom build keeps its seat under reduce only | CLOSED (source) |
| CK-27 | plant-fc 3 FAIL | 3 FAIL | Every new cell has a plant that fails: the slop cell (`plant-fc`); the unit cells with their cures removed (7 FAIL); E-5's reads on the base (2 FAIL, Chromium). No alias, no fallback: `:active` is not kept beside the mark | CLOSED for P-A4's cells |

## 4 · CK-22 · MIGRATION rows

These are consumer greps over the eight siblings, read only (`A4/ck22-greps.sh`, `A4/logs/ck22-greps.txt`, 18:28). Main trees only; node_modules, dist, worktrees, `.claude`, docs and bench are excluded. value.js was read by grep only.

| # | consumer-visible path | what changes | sites in the eight siblings | MIGRATION row |
|---|---|---|---|---|
| M-8 | a committing member's press (Switch, Checkbox, Radio, ToggleGroupItem, SegmentedTabs tab, selectable or action Chip, accordion, collapsible, select, menu and popover triggers) | The press paints on the door's `data-press`, set on the primary `pointerdown` or an Enter/Space keydown, and cleared on up, cancel, leave or focus-out, not on `:active`. Enter now presses a disclosure trigger as Space did. The host carries `data-press` while pressed | `:active` on a light-press member: **0**. `data-press` readers: **0** | "A committing control's press keys on `data-press`, which the engage door writes on `pointerdown`; style a press with `[data-press]`, not `:active`. The attribute is the door's; do not write it." |
| M-9 | `SegmentedTabs` tab buttons | Each tab gains `data-engage-face` and a last child `<span class="segmented-tab__light" aria-hidden>` (it paints under reduced motion only) | SegmentedTabs sites: bbnf-buddy 1, chicago 1, keyframes.js 1, speedtest 9, value.js 2, fourier-analysis 3. The `#option` slot: fourier 1 (`EquationModeToggle.vue:66`, its accessible name unaffected: the span is aria-hidden and empty). Tab child or `::after` selectors: **0** | "A SegmentedTabs tab ends in an aria-hidden light span; `:last-child`/`> *` rules on a tab's content target the slot's own element." |
| M-10 | the disclosure triggers' press | The press is `--fill-hover` ink (lighter) | `disclosure-trigger` class: value.js 1, a comment (`GradientEasingEditor.vue:310`) | "The disclosure press is the hover rung's ink; a consumer re-paint of the press reads `[data-press]`." |
| M-11 | the control bit's commit light | It starts after the face's fill lands (+120 ms) | no consumer surface (`useEngage` is not exported) | none needed; stated for the critic |

## 5 · CK-25 · the owner-glance set

Captured by the harness's `capture.mjs` on each build's app: 9 class exemplars × 6 states (rest, pressed, held, engaged, committed, released) × light and dark × fine and coarse × both engines × both builds = **864 frames** under `A4/glance/frames/`. Each frame is named `{build}-{engine}-{pointer}-{theme}-{scene}-{state}.png`. The sheets are `A4/glance/{light,geom}-{chromium,webkit}-{fine,coarse}.png`. CAP reads 12/0 for each of the four runs (Chromium load 35.0, WebKit 15.5-13.3). `A4/glance/{light,geom}-index.json` holds the last (WebKit) run's index; Chromium's rows are in `A4/logs/cap-*-chromium.log`.

What the frames show, as pixel reads (`A4/probe/pxdiff.mjs`, against rest):
- **The coarse Switch press:** pressed differs from rest by 676 px, max Δ 27 (Chromium light theme), 670 px, max 20 (dark), and 664 / 661 px in WebKit. Pass 3's Chromium pressed frame was identical to rest.
- **The disclosed press:** the accordion pressed and held frames differ from rest by a mean Δ of 3.30 (light) and 3.01 (dark) over the row, against the pass-3 slab (compare `light-chromium-coarse-light-accordion-held.png` with `../pass-3/C-A3/glance/frames/ca3-light-chromium-coarse-light-accordion-held.png`).
- **The commit bloom after the fill:** §0 item 4's table, from the probe, not the capture (the capture's committed frame is +90 ms, before the bloom).

## 6 · Open gaps

1. **A harness read gap (next-pass class, for H5).** E-2's arm (iii) and E-9's `commit-light` composite every one of a face's first 12 descendants as a whole-face layer. The Switch's thumb and the Radio's 8 px dot therefore read as covering the face, and the composite sits at 0.92-0.96. In paint the same faces rise 0.014-0.020 (light theme) above rest after the fill, in both engines (§0 item 4). The Switch light and Radio light CK-02/CK-10 fails are this read, not the channel. The accordion's light-theme light is a true near-white ceiling in paint. **No ceiling is ruled here; Q-5 stays the owner's.**
2. **A harness read gap (next-pass class, for H5).** E-5's `sustain` reference at +200 ms sits inside the attack whenever a press starts late, and `__rgba`'s canvas round-trip is noisy at alpha < 0.03. The route no longer depends on it, but a recipe still on `:active` would read the same false sag.
3. **The tabs dark light under reduce is absorbed by the indicator's arrival** (0.0004-0.0016 in paint). E-9 passes it on the composite. It is the §P3-7 item 2 class on the tabs; the cure would hold the tab's light until the indicator lands, which needs the indicator's reduce clock read first.
4. **The toggle's commit light is absorbed by its own on-fill** in paint (toggle dark, 0.0000 post-fill excess in both engines; `logs/facefilm-light-*.log`). E-2 passes it on the composite. It is the same class as the Radio; the face-less seat has no delay.
5. **The accordion dark** misses 0.01 by 0.0001-0.0006 on E-2 and E-9.
6. **Not re-run at this seat:** P-A3's `a3-probe` (CK-13 recipe arms, CK-21's 33 cells, CK-14's slop position) and C-A3's `radiopix`. E-12, E-11 and `facefilm` cover their rows, and the critic may replay them.
7. **CK-01 `dock`, CK-07, CK-17, and the Sheet halves of CK-05/CK-18** are blocked on D2, Q-2, the safaridriver checkbox and O-74c G-1.
8. **Real Safari:** every cell is UNMEASURED (owner's safaridriver checkbox).

## 7 · Fences and the machine

- No tracked source in the checkout changed, and no git write ran there. Builds, gates and source edits ran only in the two seat worktrees. Temporary index files (`GIT_INDEX_FILE`) and `git merge-tree` were used to cut the base; they wrote objects but no refs. `git add -N` ran only in the worktrees' own indexes. Writes in the checkout: `pass-4/P-A4.md`, `P-A4-light.patch`, `P-A4-geom.patch`, `pass-4/A4/`.
- Siblings were read by grep only. value.js was not built or run. No `~/.claude` read.
- Every build, test and browser run went through `guarded`. Chromium took one `guarded --timeout 90` per witness. Typecheck and the single unit files ran `--light`, with no browser. **WebKit took one `guarded --exclusive webkit --timeout 90` admission:** queued 19:23:04, admitted 19:44:49 after a 22-minute wait (a load-headroom wait in it), released 20:34:13, `guarded exit 0` (`A4/logs/queue-main.txt`, `A4/logs/wk-admission.log`). It covered every WebKit stage, and none was skipped. No WebKit page close occurred. Each witness or probe is its own process, well under the 60-navigation restart. No zone refusal.
- Headless shell, no GPU arguments, one browser per run, a page or context per cell, closed in `finally` (the harness's wrapper and each probe's). One heavy run at a time; vitest `--maxWorkers=2`.
- **Process slip, mine.** The battery's two Chromium `facefilm` runs (normal and `--prm`) wrote the same log name, so the first was overwritten. I renamed the survivor to `facefilm-light-prm-chromium.log` and re-ran the normal one after the WebKit release (20:37, load 16.9-19.5). WebKit's ran under distinct names. The diagnostic `facefilm-*-chromium` reads taken before the battery were overwritten too; every figure above is from the battery's or the re-run's logs.
- Nothing is left running. Both worktrees are removed (`git worktree list` has no `p4/A4` row) and `.claude/worktrees/bl/D5/p4/A4/` is gone.
