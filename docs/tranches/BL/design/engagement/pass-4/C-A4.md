# D5 pass 4 · C-A4 · the critic of route A (`P-A4-light.patch`, with `P-A4-geom.patch` beside it)

| field | value |
|---|---|
| seat | D5 pass 4, **C-A4 CRITIC** of route A, per `../REGISTRY.md` §P3-8.3 wave 3. I authored no D5 seat in passes 2, 3 or 4 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD `1cd1a1b73`. `git diff --stat a4a951090 HEAD -- src tests package.json demo vite.config.ts` is empty, so the source is the one P-A4 cut against. `P-A4-light.patch` sha1 `ec2cb041…`, `P-A4-geom.patch` sha1 `5f9dd12f…`, `F5pp.patch` sha1 `baa0f58d…`: the bytes P-A4 and F5″ name. Four worktrees under `.claude/worktrees/bl/D5/p4/C-A4/`, all detached at HEAD: `wt` (light), `wt-geom` (geom), `wt-plant` (light + `C-A4/plant.sh`), `wt-nodelay` (light with only the fill-clock delay removed, a control for §0 item 2). All four were removed with `git worktree remove --force`, along with the build outputs. Nothing of this seat's is left there |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). `../../../audit/INBOUND.md` was re-read at the seat's start (mtime 2026-10-16 06:40). It holds no ruling on Q-1..Q-5, the safaridriver checkbox or O-74c G-1. O-87 binds |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU arguments, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H4's, read from the checkout and not edited. Every battery ran on the harness's own app (`scenes/App.vue`, sha `3c135d6264f8` in every build log), built per worktree by `harness/build.mjs` |
| runs | `C-A4/run-ca4.sh`. Chromium ran 00:28-01:46, one `guarded --timeout 90` per witness or probe. **WebKit took one `guarded --exclusive webkit --timeout 90` admission:** queued 01:46:07, admitted 02:29:50 (a 44 min wait), released 03:19:13, `guarded exit 0` (`C-A4/logs/chain.txt`, `logs/wk-admission.log`). It covered every WebKit stage, and none was skipped. No page close and no zone refusal. One heavy run at a time |
| records | `C-A4/run-ca4.sh`, `plant.sh` and `plant-over-light.diff.txt` (the plants exactly), `probe/ca4-probe.mjs` (rebound, scrollflash, cardpress), `probe/ca4-ladder.mjs`, `logs/` (every battery, probe and capture log, with its load), `json/{light,light-r2,geom,geom-arms,plant,plant-n}/`, `glance/` (sheets and 432 frames, `ca4-light-<engine>-<pointer>-<theme>-<scene>-<state>.png`). P-A4's probes (`../A4/probe/facefilm.mjs`, `pressfilm.mjs`, `pxdiff.mjs`) and P-A3's `../../pass-3/A3/probe/a3-probe.mjs` were run from where they live, unedited |

## 0 · In brief

**Score: 13/27 rows closed on the light build (the default), 48 %.** Pass 3's C-A3 closed 11/27. Closed: CK-03, 06, 08, 09, 11, 13, 14, 15, 21, 22, 23, 24, 26. Open: CK-01, 02, 04, 05, 07, 10, 12, 16, 17, 18, 19, 20, 25, 27. **Route A has no clean pass. The gestalt is not iOS-27 grade** (§3).

Against pass 3 this pass closes CK-06, CK-14 and CK-15 and leaves CK-20 and CK-27 open. CK-20 is open on a new counterexample that P-A4's own cure introduces (item 2). CK-27 is open on a witness green that P-A4's report names and leaves green (item 4).

1. **What P-A4 claims and I reproduce, in both engines.**
   - **CK-14 closes.** The forced-colours arm no longer reaches the dock triggers. E-12 reads 63/63 in Chromium and 62 P / 1 U in WebKit. My plant P4 (the exclusion removed) fails `fcslop dt-dropdown` in both themes plus `fc-reach coarse docktrig`: 3 FAIL per engine, slop 44×44 → 0×0, the tap lands on `div`.
   - **CK-06's witness reads green.** E-5 is 56/56 on two batteries per engine (Chromium at load 16.3 and 17.7; WebKit at 12.1 and 10.4), three holds per cell.
   - **The Radio's dark commit light now paints.** E-2 is green on every Radio-dark path. My plant P9 removes only the fill-clock delay, and it returns the Radio dark to 0.0000-0.0001 on 5/5 paths in both engines. In paint (facefilm) it falls from 0.0265 to 0.0065 (Chromium) and from 0.0208 to 0.0062 (WebKit). The delay is what cures it.
   - **The tabs gain a light leg under reduce in the light theme.** My plant P8 removes the light span, and E-9's tabs cells fail 0.0000 in both engines.
   - **CK-23 reproduces to the line:** light 168 files, +2951/−1284; geom 169, +3018/−1285.
   - **The geom build** passes 164/164 E-2 cells in both engines under arms i, ii and iii.
2. **New counterexample, CK-20: the fill-clock delay stalls the commit light, and it is P-A4's.** `control-bit.css:330` delays the light layer's transition on both edges by `--engage-press-drain-release` (120 ms). I filmed a commit and its reverse 200 ms later on the Switch and Checkbox (`ca4-probe rebound`). On the reverse, the light **freezes mid-flight at 0.028-0.047 for 115-125 ms**, then blooms again to 0.100-0.108 on the face that has already gone back. That is 4/4 FAIL in Chromium (load 16-17) and 4/4 FAIL in WebKit (load 15-18). The control build (`wt-nodelay`, the same patch with the delay removed) reads **0 ms frozen on 8/8 in both engines**.
   - A reverse within 60 ms gets no light for either commit: **0 pulses over two commits** on 4/4 per engine. The control build gives 2 pulses.
   - The single commit's light now starts at **+128-146 ms** and peaks at **+153-168 ms** in both engines. Without the delay it starts at +6-12 ms and peaks at +29-45 ms. The peak lands past `ACKNOWLEDGE_WINDOW_MS` (150).
   - The cure for the Radio dark (CK-02, CK-10) is therefore bought with a D-1 stall and a late acknowledgement on every control-bit commit. The delay is also a figure no envelope row carries (CK-12).
3. **New counterexample, CK-25: on a fine pointer the disclosed press is lighter than the hover it should deepen** (`ca4-ladder`, both engines, both themes, 4/4 FAIL).
   - The accordion trigger's hover paints `--control-surface-bg-hover`: α 0.15 in the light theme, pixel (217,216,214); α 0.19 in dark, (52,51,50).
   - Pressing it drops the fill to the press wash: α 0.05, (239,238,236) in light; (22,21,20) in dark.
   - Releasing with the pointer still over it returns the heavier hover.
   - So the hand goes down and the row un-paints. The pass-3 slab did not go away. It moved from the press to the hover, and it shows at the commit instant: `ca4-light-chromium-fine-light-accordion-committed.png` at pixel (218,217,215), in WebKit (219,218,215), in dark (54,53,52) against the press's (22,21,20).
   - P-A4's "a wash, not a slab" holds only for a coarse pointer, or a fine one that never hovers.
4. **CK-27 stays open on lights that the witnesses pass and that do not paint.** P-A4's `facefilm` and mine agree on two cases, in both engines:
   - The toggle's dark commit light: post-fill excess **0.0000** in paint, while E-2 passes it on the composite.
   - The tabs' dark light under reduce: **0.0016** in Chromium and **0.0018** in WebKit in paint. Chromium E-9 passes it, and WebKit E-9 fails it at 0.0098 in my battery (P-A4 read it as a pass).

   P-A4 §6 items 3-4 name both as gaps and its §0/§3 still count them green ("the tabs now keep a light leg under reduce in both themes and both engines"). That is green over work not done.
5. **CK-06's witness cannot tell P-A4's cure from its absence.** My plant P7 puts the ToggleGroupItem's press back on `:active`, which is the pre-cure state. It reads **3/3 sustain in both themes and both engines** (Chromium ×1.05-×1.39 rising from a late attack; WebKit 8/8). E-5's text is met either way, so the row closes. But the evidence for "cured at its cause" is the press film (latency), not E-5.

   The same latency stands on a member no E-5 scene carries. The selectable Card still presses on `:active` (`card/styles.css:197`). A held coarse touch first moves its scale at **+200 ms in Chromium on 3/3 holds**, against the 150 ms window. WebKit moves it at +25-50 ms on 3/3. This is §4 item 3.
6. **Unchanged and open:** CK-01 (the `dock` latch 54/55, the Aurora, the Sheet's PRM press); CK-02 under Q-5 (a) (Switch light, Radio light, accordion); CK-04 (the phone hold ×1.000 on A alone); CK-05/18 (the Sheet, the WebKit Carousel); CK-10 (Switch, Radio and accordion in the light theme, and the WebKit tabs-dark cell); CK-12 (`--scale-engage` off the ladder on A alone); CK-16's WebKit layout cell (no counter); CK-19 (the ambient exemplar); CK-07 and CK-17 (the owner).

## 1 · What I ran

Load is the 1/5/15-minute average at the start of each run. Each cell's load is in its log.

### 1.1 · The light build (the default)

| witness | Chromium (load) | WebKit (load) | log |
|---|---|---|---|
| E-1 | 92 P / 2 F / 2 U (21.3) | 92 / 4 (19.2) | `light-{chromium,webkit}-E-1.log` |
| E-2 | 148 / 16 / 16 R (14.9) | 146 / 18 / 16 R (14.7) | `light-*-E-2.log` |
| E-3 | 20 / 2 (23.4) | 20 / 2 (12.0) | |
| E-4 | 14 / 0 / 4 U (22.8); r2 14 / 0 / 4 U (13.3) | 11 / 0 / 8 U (14.8); r2 11 / 0 / 8 U (13.6) | `light{,-r2}-*-E-4.log` |
| E-5 | 56 / 0 (16.3); r2 56 / 0 (17.7) | 56 / 0 (12.1); r2 56 / 0 (10.4) | `light{,-r2}-*-E-5.log` |
| E-6 | 4 / 2 / 8 U (20.2) | 2 / 2 / 8 U (11.3) | |
| E-7 | 6 / 1 (17.6) | 6 / 1 (10.9) | |
| E-8 | 19 / 0 (16.1) | 19 / 0 (10.5) | |
| E-9 | 75 / 3 / 2 R (16.9) | 74 / 4 / 2 R (14.8) | |
| E-10 | 6 / 0 / 2 R (27.9) | 6 / 0 / 2 R (14.8) | |
| E-11 | 2 / 0 / 2 U (27.8) | 2 / 0 / 2 U (16.0) | |
| E-12 | 63 / 0 (23.3) | 62 / 0 / 1 U (14.8) | |
| CAP | 12 / 0, 24 R (16.4) | 12 / 0, 24 R (18.5) | `cap-light-*.log` |

The E-2 fails are the same members in both engines:
- **Switch, light theme:** 5 paths. Chromium 0.0058-0.0063; WebKit 0.0003-0.0053.
- **Radio, light theme:** 5 paths. Chromium 0.0031-0.0032; WebKit 0.0024-0.0039.
- **Accordion, light theme:** 4. Chromium 0.0032-0.0034; WebKit 0.0007-0.0030.
- **Accordion, dark theme:** Chromium 2 cells at 0.0099-0.0100; WebKit 4 cells at 0.0072-0.0099.

The E-9 fails are the light-theme Switch (Chromium 0.0060, WebKit 0.0050), Radio (0.0032, 0.0027) and accordion (0.0032, 0.0034), plus **the tabs in the dark theme in WebKit, at 0.0098**. The E-1 fails are the `dock` latch and the Sheet's PRM press, plus the Aurora graded in WebKit (1.22 against 1.15 at rest, under 2×). In Chromium the Aurora is UNMEASURED: an engine limit, because SwiftShader leaves it on its `css` substrate. E-3's two fails are the phone touch-held at ×1.000 on both axes (358.0 × 24.0 px). E-7's fail is `data-held`'s second writer, `GlassDock.vue` (D2's, named).

### 1.2 · The geom build

| run | Chromium (load) | WebKit (load) |
|---|---|---|
| E-1 | 92 / 2 / 2 U (16.3) | 92 / 4 (14.9) |
| E-2, default arms | 88 / 76 (11.7) | 88 / 76 |
| E-2, arms i,ii,iii | **164 / 0** (17.6) | **164 / 0** (19.8) |
| E-5 | 56 / 0 (24.6) | 56 / 0 |
| E-9 | 75 / 3 (15.8) | 74 / 4 |
| E-12 | 63 / 0 (14.2) | 62 / 0 / 1 U |

### 1.3 · Plants (`plant.sh`, `wt-plant` only; exactly as in `plant-over-light.diff.txt`)

| plant | row | must fail | Chromium (load) | WebKit (load) |
|---|---|---|---|---|
| P1 Switch loses `engage-chosen` | CK-01 | E-1 adoption + latch | **FAIL**: NOT ADOPTED on 3 scenes; latch 53/55 (16.9) | **FAIL**, the same (16.7) |
| P2 every Card `role=option tabindex=0` under `engage-static` | CK-01, CK-24 | E-1 static-inert | **FAIL**: `static-inert card` and `surface` (16.9) | **FAIL**, the same |
| P3 Checkbox loses its door | CK-03 | `arrival·own`, `ownflush` | **FAIL** 4/4: 0.0255-0.0340 above rest (16.7) | **FAIL** 4/4: 0.0255-0.0319 (17.7) |
| P4 the forced-colours arm reaches the dock triggers again | CK-14, CK-27 | E-12 fcslop + fc-reach | **FAIL** 3: slop 44×44 → 0×0 (17.7) | **FAIL** 3 (26.3) |
| P6 Button `--rung-light: transparent` | CK-02 | Button arm iii | **FAIL** 8/8 at 0.0000 | **FAIL** 8/8 |
| P7 ToggleGroupItem press back on `:active` | CK-06 (P-A4's cause) | E-5 toggle, if E-5 can tell | **PASS** 8/8 (light-theme reads ×1.05/×1.17/×1.39 from a late attack; dark ×0.97/×1.00/×1.00) (19.8) | **PASS** 8/8 (21.2) |
| P8 the tabs' reduce light span never paints | CK-10 | E-9 tabs commit-light | **FAIL** 2/2 at 0.0000 (14.2) | **FAIL** 2/2 (17.9) |
| P9 the control bit's light waits for nothing (delay 0 s) | CK-02 | Radio dark arm iii | **FAIL** 5/5 at 0.0000 | **FAIL** 5/5 at 0.0000-0.0001 |
| P10 a second `data-press` writer outside `engage/` | CK-08 | E-7 static | **FAIL**: 2 writer files (15.7) | **FAIL** (27.4) |
| P11 a minted 77 ms transition on the Chip's press | CK-09 | E-8 literal | **FAIL**: chip and chipaction, `opacity@77ms` named (17.6) | **FAIL**: chip (15.6) |

Every plant fails its cell in both engines except P7, which is §0 item 5. In WebKit the plant battery was narrowed to the plant cells (E-1, E-7, E-12 whole; E-2 `--scenes checkbox,button,radio`; E-5 toggle; E-8 chip; E-9 tabs) to fit one admission under the 90 min clamp.

### 1.4 · Probes

| probe | Chromium (load) | WebKit (load) | reading |
|---|---|---|---|
| `a3-probe` (P-A3's) on light | 57 P / 1 F (17.1) | 46 P / 1 F / 11 U (15.8) | CK-21: 33 P per engine. The 1 FAIL is the tabs clock, whose single `console.error` names the resolved `translate` clock, as pass 3 ruled. CK-14 slop centred 2/2. CK-13 forced colours: 11/11 per engine. Reduced transparency: 11/11 in Chromium; 11 UNMEASURED in WebKit (the engine does not apply the query) |
| `facefilm` light, normal (P-A4's) | REPORT (≈17) | REPORT (≈16) | After the fill: Radio dark 0.0265 / 0.0208; Checkbox dark 0.0304 / 0.0223; Switch dark 0.0238 / 0.0192. **Accordion light 0.0000 / 0.0006. Toggle dark 0.0000 / 0.0000** |
| `facefilm` light, `--prm` | REPORT | REPORT | Radio light 0.0163 / 0.0159; Switch light 0.0175 / 0.0130; Checkbox light 0.0257 / 0.0204; **accordion light 0.0000 / 0.0000; tabs dark 0.0016 / 0.0018**; tabs light 0.0296 / 0.0358 |
| `facefilm` plant (P9), Radio | REPORT | REPORT | Radio dark 0.0065 / 0.0062: the pre-cure absorption |
| `pressfilm` light and plant | REPORT | REPORT | §0 item 5 |
| `ca4-probe rebound` on light | 4 P / 4 F + 4 R | 4 P / 4 F + 4 R | §0 item 2: frozen 117-125 ms (Chromium), 115-117 ms (WebKit); onset +128-143 / +129-146 ms |
| `ca4-probe rebound` on `wt-nodelay` | 8 P / 0 F | 8 P / 0 F | frozen 0 ms on every cell; onset +6-12 ms; 2 pulses at a 60 ms reverse |
| `ca4-probe scrollflash` | 6 P (page scrolled 88 px; the press mark on 2/7 reads, about +18 to +59 ms, then cleared; no commit) | 6 P (scroll UNMEASURED: macOS WebKit has no touch scrolling; the mark held 7/7; no commit) | §4 item 4 |
| `ca4-probe cardpress` | **3 F**: first visible press +200 ms | 3 P: +25-50 ms | §0 item 5, §4 item 3 |
| `ca4-ladder` | **2 F** | **2 F** | §0 item 3 |
| CK-22 greps (`../A4/ck22-greps.sh`, sibling main trees by grep only) | — | — | `logs/ck22-greps.txt`: every count identical to P-A4's `A4/logs/ck22-greps.txt` |

## 2 · Per row (CK-01..CK-27), the light build

**CLOSED** means green by my own replay in both engines, or by a source or record read for a row that has no engine cell. **OPEN** means a counterexample stands or a cell is unmeasured. **OWNER** means open under a standing default.

| row | Chromium | WebKit | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/2/2 U | 92/4 | Every rendered member computes its class, and P1 and P2 fail it. The latch reads 54/55 on `dock` (D2's fence). The Aurora cell is UNMEASURED as an engine limit in Chromium and FAILs in WebKit. The Sheet's PRM press has no target (O-74c G-1) | OPEN |
| CK-02 | E-2 148/16 | 146/18 | The Radio dark closes, and P9 shows the delay is the cure. Switch light, Radio light and the accordion fail arm iii. In paint under reduce, Switch and Radio light clear 0.01 (0.013-0.0175) and the accordion light does not (0.0000). The geom build passes 164/164 under arm ii, which Q-5 (a) does not admit. The toggle dark passes on a light that paints 0.0000 (CK-27) | **OWNER** (Q-5) |
| CK-03 | mount and arrival cells pass | same | P3 fails `own`/`ownflush` 4/4 per engine. The `late` fails are CK-02's arm | **CLOSED** |
| CK-04 | E-3 20/2 | 20/2 | The phone touch-held is ×1.000 on both axes. A alone has no phone arm under Q-3 (c); E's composition carries it | OPEN on A |
| CK-05 | E-4 14/0/4 U twice | 11/0/8 U twice | Every measured cell passes. P-A4's one slider-fling fail does not recur in four reads. The Sheet is UNMEASURED (O-74c), and so is the WebKit Carousel (no touch scrolling) | OPEN (UNMEASURED cells) |
| CK-06 | E-5 56/56 twice | 56/56 twice | The press-only property holds, also under PRM, and sustains on three reads per cell. The row's text is met. P7 shows E-5 cannot see the latency P-A4 cured (§0 item 5); the Card's +200 ms is §4 item 3 | **CLOSED** |
| CK-07 | E-6 4/2/8 U | 2/2/8 U | No idle animation, as Q-2 (b) wants. Only the owner's words close it | OWNER |
| CK-08 | E-7 6/1 | 6/1 | `data-held`: `GlassDock.vue` is D2's, named by the row's clause. `data-press`: one writer. P10 fails it in both engines | **CLOSED** (by the clause) |
| CK-09 | E-8 19/0 | 19/0 | P11 fails it in both engines | **CLOSED** |
| CK-10 | E-9 75/3 | 74/4 | Switch light, Radio light and accordion light lose the transient under reduce in both engines. The tabs in the dark theme fail in WebKit at 0.0098 and paint 0.0016-0.0018 in both engines. The Button does not squish under reduce. Geom: 75/3 and 74/4, so arm ii carries a reduce light on every member the light build does | OPEN |
| CK-11 | — | — | Source: no `.tap-squish` or `.interactive-item` rule in the patched `src`. The `scale: none` hits are reveal, dissolve and animation arms, plus engage.css's own reduce arm. `.glass-capsule-hover:not([data-press-armed]):active` (`glass-capsule.css:128`) is the dock-tab press, kept as D2's, as the row allows | **CLOSED** (source) |
| CK-12 | — | — | On A alone `--scale-engage` is still off the ladder's engaged row (E carries it). New: the control bit's commit light now starts at +128-146 ms and peaks at +153-168 ms because its transition is delayed by another envelope's release. Its effective attack is outside `ENGAGE_ATTACK_CLASS` (40-60 ms), and no `ENGAGE_ENVELOPES` row carries a delayed light. A token reused for a reason other than its row's is a figure the table does not hold | OPEN |
| CK-13 | forced 11/11, PRT 11/11 | forced 11/11, PRT 11 UNMEASURED (engine limit) | The row names WebKit's PRT cell as the engine's limit. The arm's reach is now seat-only (E-12 fc-reach on every scene, both engines) | **CLOSED** |
| CK-14 | fcslop 6/6, ck14 2/2 | the same | P4 fails 3 cells per engine. The coarse Button does not latch: released ×1.000 in both engines, both themes (capture) | **CLOSED** |
| CK-15 | E-10 singleton fwd/rev pass | pass | H4's count at every frame of the hand-off | **CLOSED** |
| CK-16 | off-screen PASS; 0.0 layouts/s | off-screen PASS; layouts UNMEASURED (no counter) | The row asks for 0 layouts/s. I could not read it in WebKit, and the row carries no engine-limit clause the way CK-13 does | OPEN (WebKit layout cell UNMEASURED, engine limit) |
| CK-17 | — | — | UNMEASURED (owner's safaridriver checkbox). The five light-press recipes no longer rely on `:active`. The Card, the Button's `quiet` and `text` emphases, the slider and the dock triggers still do (`card/styles.css:197`, `button/styles.css:205,213`, `slider/styles.css:48,190`, `triggers.css:86-88`), and none names its `touchstart` listener (X-8) | OWNER |
| CK-18 | slider, sortable and tabs consume the rule (E-4) | same | The Sheet is UNMEASURED (O-74c G-1) | OPEN (Sheet) |
| CK-19 | ambient UNMEASURED (engine limit) | ambient FAIL 1.22 vs 1.15 | The six ambient frames per theme are the same frame (`glance/frames/ca4-light-*-ambient-*.png`) | OPEN |
| CK-20 | E-10 6/0; rebound **FAIL** 4/4 | E-10 6/0; rebound **FAIL** 4/4 | §0 item 2. The Escape, hand-off and re-render paths hold. A reverse commit inside the light's delay freezes the light 115-125 ms, then re-blooms on the reverted face. The no-delay control reads 0 ms on 8/8 per engine | **OPEN** |
| CK-21 | E-11 2/0/2 U; a3-probe 33 P | same | One `console.error` per unreadable token, 0 on a clean commit. The tabs clock names its resolved clock, as ruled in pass 3 | **CLOSED** |
| CK-22 | — | — | M-8..M-11 reproduce count for count (`logs/ck22-greps.txt`). M-11 (the light starts after the fill) has no consumer surface. The fine-pointer ladder inversion (§0 item 3) is a paint defect, not a consumer path | **CLOSED** |
| CK-23 | — | — | `git apply --numstat`: light 168 / +2951 / −1284; geom 169 / +3018 / −1285, as P-A4 §2 says | **CLOSED** |
| CK-24 | E-1 static cells pass | pass | `static` stamped and read; P2 fails it | **CLOSED** |
| CK-25 | §3 | §3 | Not iOS-27 grade | OPEN |
| CK-26 | — | — | No lighting layer is added: the delay moves an existing layer in time, and the tab's span is the existing seat, under reduce only. The disclosed press got lighter. The dark Button's warm halo (`ca4-light-chromium-coarse-dark-button-rest.png`) is HEAD's, as pass 3 recorded | **CLOSED** for A |
| CK-27 | — | — | Each new P-A4 cell has a plant that fails it (P4, P8, P9), and there is no alias or fallback: `:active` is not kept beside the mark. But two witness greens pass a light that paints nothing, in both engines: the toggle's dark commit (E-2, paint 0.0000) and, in Chromium, the tabs' dark light under reduce (E-9 passes; paint 0.0016). P-A4 §6 names both and §0 item 3 / §3 CK-10 still count them ("in both themes and both engines"). WebKit E-9 fails that tabs cell in my run | **OPEN** (green over work not done) |

Closed **13/27 = 48 %** (C-A3: 11/27). The rows that cannot close by building are CK-02 (Q-5), CK-07 (Q-2), CK-17 (Safari), the Sheet halves of CK-05 and CK-18 (O-74c G-1), and CK-01's `dock` (D2). The rows that can close by building and are open are CK-10 (beyond Q-5's members: the tabs dark), CK-12, CK-16 (an engine counter), CK-19, CK-20, CK-25 and CK-27.

## 3 · CK-25 · the gestalt

These are my reads of my own frames. The sheets are `C-A4/glance/ca4-light-{chromium,webkit}-{fine,coarse}.png`. Chromium and WebKit read alike except where noted.

**Verdict: not iOS-27 grade.** The press register is better than pass 3's on a coarse pointer. The commit, the fine-pointer disclosure and the coarse hold are not there.

1. **The commit cannot be seen, and now it arrives late.** In `ca4-light-chromium-fine-light-switch-committed.png` the only change from `…-released.png` is the thumb's travel and the dark track. The light adds nothing visible at +90 ms, because it has not started: its onset is +128-146 ms (§0 item 2). The Button's committed frame is ×1.001 and cannot be told from rest. Under Q-5 (a) the near-white members still have no visible "it happened" beat.
2. **The fine-pointer disclosure inverts its ladder.** `ca4-light-chromium-fine-light-accordion-pressed.png` is a pale wash (239,238,236), which is deft. Hovering paints the heavier 15 % row (217,216,214), and the committed frame (218,217,215; dark (54,53,52)) is the pass-3 slab, now on hover. The hand goes down and the row lightens. iOS deepens on contact.
3. **The coarse Switch press is now visible but faint.** `ca4-light-chromium-coarse-light-switch-pressed.png` against `…-rest.png` differs by 676 px, max Δ 27, the track greying a little. WebKit is 664 px, max 26. In pass 3 the two frames were identical. It reads as a press, barely.
4. **The coarse hold still reads as a bug.** In `ca4-light-chromium-coarse-light-slider-held.png` the world frosts behind a slider that stays ×1.000 (Q-3 (c) on A alone, unchanged since pass 2). The fine hold grows ×1.060 and blurs the words beside it (`…-fine-light-slider-held.png`).
5. **What is right.** The Button presses ×1.029-1.032 and holds ×1.033 in both engines, weighted and quiet. The keyboard-engaged slider grows ×1.060 inside a crisp ring with no veil. The Switch thumb travels cleanly.
6. **O-87 residue.** The dark Button's warm halo is still in every dark Button frame. It is HEAD's.
7. **D-2 is not shown on `ambient`.** The Aurora's six states are the same frame in each theme.

## 4 · Next-pass defect classes (recorded; no row added, score unchanged)

1. **A cure that moves a light in time without a row.** The fill-clock delay fixes absorption (P9 proves it) and creates a stall and a late acknowledgement (CK-20, CK-12). The class is "a transition-delay on a retargetable transition": the delay holds the current value while the target changes. An envelope that starts after the fill needs its own row and a retarget rule, not a delay.
2. **The ladder's press rung below its hover rung.** `--control-surface-bg-hover` (veil-quiet + fill-hover over card, α 0.15-0.19) outweighs the press wash (`--fill-hover`, α 0.05), so every fine-pointer disclosure trigger lightens on press. No witness reads hover against press on the same element. It is scored at CK-25 here.
3. **The press-latency cure is per recipe, not per class.** The selectable Card (`engage-chosen`), the Button's `quiet`/`text` emphases and the dock triggers still press on `:active`. In Chromium the Card's coarse press first shows at +200 ms (3/3), and in WebKit at +25-50 ms. E-5 has no Card scene, and E-5's sustain rule cannot see latency at all (P7: the pre-cure toggle passes 3/3 in both engines).
4. **A press mark on a touch that becomes a scroll.** On a scrollable page in Chromium, the mark sits on the toggle for about 40 ms (2 of 7 reads) before the scroll's cancel clears it, with no commit. iOS scroll views delay a content highlight during a possible scroll; this route has no such delay. Measured, not scored. WebKit cannot scroll by touch.
5. **A witness green on a light that does not paint** (toggle dark commit; tabs dark under reduce). This is P-A4 §6 items 3-4 and is scored at CK-27. H5 should read the face in paint (facefilm's read) beside the composite.
6. **CK-16 has no WebKit layout counter.** The row needs an engine-limit clause like CK-13's, or a WebKit read, before it can close in both engines.

## 5 · Fences and the machine

- No tracked source in the checkout changed, and no git write ran in it (`git status --short` shows only untracked paths). The patches, the plants and the no-delay control were applied only in this seat's four worktrees. `git add -N` ran only in their own indexes, and the worktrees were then removed.
- Writes in the checkout are `pass-4/C-A4.md` and `pass-4/C-A4/`.
- Siblings were read by grep only (`../A4/ck22-greps.sh`). value.js was not built or run. No `~/.claude` file was read; `guarded` was executed.
- Every build, test and browser run went through `guarded`. Each Chromium witness or probe took one `guarded --timeout 90`. The builds took `guarded --timeout 30`, heavy. **WebKit took one `guarded --exclusive webkit --timeout 90` admission** for every WebKit stage: a 44 min queue, then 49 min admitted, exit 0.
- Headless shell, no GPU arguments. One browser per run with a fresh context or page per cell, closed in `finally`: the harness's wrapper and each probe's own. Each witness and probe is its own process, under WebKit's 60-navigation cap. No WebKit page close occurred.
- Loads ran 10.4-31.3 over the seat. No defect here was seen only under load. The rebound, ladder and plant FAILs reproduced in both engines at different loads.
- **Process slips, mine.**
  - While recording the plant diff I wrote one transient file to `/tmp` and deleted it in the same command. The durable record is `C-A4/plant-over-light.diff.txt`.
  - The first smoke runs of `ca4-probe` (rebound, scrollflash) went to the terminal before I changed the rebound criterion. Their log was deleted, and every figure above comes from the battery runs in `logs/`.
  - I added `cardpress` and `ca4-ladder` to the run script while the WebKit admission was still queued, before it began. The Chromium `ca4-ladder` run (`logs/ca4-ladder-light-chromium.log`) was a separate guarded run between the two engine phases, not concurrent with any other.
- Nothing is left running. `.claude/worktrees/bl/D5/p4/C-A4/` is gone, and `git worktree list` has no C-A4 row.
