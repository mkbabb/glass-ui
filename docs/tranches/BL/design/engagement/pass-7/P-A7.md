# D5 · pass 7 · P-A7: route A's part on arm (ii) (REGISTRY §P6-8.1)

| field | value |
|---|---|
| seat | P-A7, the prototype seat of D5 pass 7 (`§P6-8.3` wave 2), after H7's self-test |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | `master`. Seat start `39f6266cb`; at the patch's last check `35035e57a`; at write time `d9710b763`. Every commit between them is docs-only (`git diff --stat 39f6266cb HEAD -- src tests` is empty). `release/10.1.x` is not merged, so the floor carries unchanged (§P6-8.2), and H7 found the Sheet does not split at equal velocity (H7 §3.1): no F5⁗ |
| rulings | INBOUND re-read at seat start (mtime 2026-10-27 22:58; last D5 row O-103d; O-108, O-109, O-103e, O-110 are not D5's). FORMATION-PROGRESS read to its 2026-10-28 D2 p8 H8 line. Nothing newer than O-103d binds D5. No ruling arrived mid-pass |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** and is read against this seat's guarded WebKit run (O-103d (3)) |
| worktree | `.claude/worktrees/bl/D5/p7/A7/wt`, detached at the seat-start HEAD, `node_modules` symlinked; removed with `git worktree remove --force` at return |
| records | `A7/` holds the runners (`run.sh`, `gates.sh`, `builds.sh`, `plants.py`, `all.sh`, `chain-chromium.sh`, `chain-webkit.sh`, `phase-webkit.sh`, `mkpatch.sh`), the CK-22 greps (`ck22-greps.sh`, `ck22-material.py`), the CK-25 frame probe (`probe/a7-glance.py`), `logs/` (every log opens and closes with the 1/5/15-minute load), `json/`, `glance/` (the owner-glance set), `plants/glance/` (the plants' frames), `numstat-a7-*.txt`. Superseded logs: `logs/superseded-r1/` (the first battery, stopped after E-5 for the census defect in §4) and `logs/superseded-r2/` (the second gate run) |

## 1 · The patch

| file | sha1 (`shasum`) | applies |
|---|---|---|
| `pass-7/P-A7.patch` | `e6e42ba3cf37c47a67811aa7dec1fc1216448816` | `git apply --check` clean on archived HEAD trees `35035e57a` and `d9710b763` (the HEAD at return; docs-only past the seat base); applied, its `src` and `tests` are byte-equal to the worktree the battery built (`diff -rq`) |
| contains `pass-6/F5ppp.patch` | `24cec509c4af4426cbb9af439ef31e7242ed951d` | the floor, in full and unchanged |
| contains `pass-6/P-A6.patch` | `2464bf183429c7d9d37e5e0b7fe08435ec04f731` | arm (ii), in full; A7 edits on top of it |

One patch, one build. It carries no E bytes: P-E7 builds on it (§P6-8.3).

**Cost (CK-23).** The whole patch is **187 files, +3497/−1366 (src 146 files, +2398/−1157)** (`A7/numstat-a7-whole.txt`). A7's own share over P-A6 is **16 files, +298/−59 (src 12 files, +197/−54)** (`A7/numstat-a7-over-a6.txt`): Aurora.vue +27/−5, Configurator.vue +4/−22, ConfiguratorPresetChip.vue +47 (new), configurator/styles.css +51, configurator/index.ts +4, src/index.ts +1, switch/styles.css +9/−5, motion/core/index.ts +6, engageClasses.ts +3/−2, press.ts +12, scale-paper.css +10/−5, engage.css +24/−15; tests +100/−5 over four files.

### What A7 changes on top of P-A6

1. **CK-12 · the crest carries a reason (`tokens/scale-paper.css`, `utilities/engage.css`).**
   - `--scale-commit-pop: calc(2 - var(--scale-press))` = 1.04: the canonical press mirrored about rest. A face rises above rest by the depth the press takes below it, so press and commit are one figure on two sides of rest, and a consumer who deepens the press deepens the pop. It is the crest of a face whose committed state shows the commit (selectable chip, toggle item, an open disclosure).
   - `:where(.engage-pressed, .engage-chosen.control-bit) { --rung-crest: var(--scale-engage) }` = 1.06: the ladder's engaged row. It is the crest of a stateless command, whose pop is the whole of its commit with no state left to read it by, and of the 20 px control bit, the size of the held thumb that rung grows.
   - `--scale-commit-pop-bit` is deleted (clean break, E-1). No crest literal is left (unit cell, §3).
   - `--rung-crest` is registered `<number>`, initial 1, so the door's loud read parses a derived row and an unresolvable crest computes 1 and is said aloud (CK-21).
2. **P-1 · one reduce mechanism for the pop.** `engage.css`'s reduce `transform: none` arm is deleted. The library's instant fallback (`a11y-overrides.css`: under reduce, `transition-duration: 0s` on `*`) is the one mechanism: `c` lands on its endpoint in the frame the state changes, so sin(π·c) = 0. The plant (§3) removes that one mechanism and the PRM cells fail. Before, either mechanism alone kept them green (C-E6 §0.4).
3. **CK-27, CK-25 · the Configurator preset chip answers through a declared class.**
   - The chip is `ConfiguratorPresetChip.vue`, exported from `configurator/` and the root barrel. It is a `chosen` member: `engage-chosen`, `data-state="on|off"` beside `aria-pressed`, and its own engage door (`useEngage({ commit: "state" })`: the mount frame, the loud read, the press mark).
   - Its hover and press are a wash of the foreground over whatever fill the capsule paints, at a fill-ladder rung: `--fill-hover` under `(hover: hover)`, and `--fill-hover + --fill-selected` on `[data-press]`. The amount is the registered number `--preset-chip-ink`, so the wash rides the press envelope (`--engage-press-drain-*`).
   - The wash's endpoints are the ink and `transparent`, never the capsule's own mix. A capsule-wide ink knob was tried first and failed the G-WK-COLORMIX-BUDGET gate (a nested color-mix endpoint drops the declaration in Safari 18), so it was withdrawn: `glass-capsule.css` is untouched.
   - Under forced colours the press is a Highlight ring. The commit pops on the wide crest when a preset is chosen. No geometry rides the hover or the press (the capsule's lift and snap stay the dock's).
   - The configurator's `modes` row gains `chosen`.
4. **CK-25 · the coarse Switch press in dark.** The thumb's press ink is the fill ladder's "both" rung, `--fill-hover + --fill-selected` (`color-radius.css` §1.3 names it as a derivation), in place of `--fill-selected` alone, as the disclosed press sums its hover rung. It is one rule in both themes, with no dark arm.
5. **CK-22 · a public way back, and one cursor writer.**
   - `usePressMark` (and `UsePressMarkOptions`) is exported on `@mkbabb/glass-ui/motion-core`. It is keyframes-free (it imports `vue` only), and documented with an example. Its in-library sites: the engage door, Card, the dialog and sheet close buttons, the sortable row and handle, and the pager rail.
   - **The Aurora's cursor has one writer.** The root's presence leg writes the cursor until a consumer calls the exposed `setCursor`/`clearCursor`; that first call takes the cursor for the mount's life and the root leg stands down. This is neither of §P6-8.1's two forms (opt-in, or the consumers' writers retired), for a measured reason. Both consumers listen on the **window** (`keyframes.js/demo/app/hero/HeroAurora.vue:223`, `value.js/demo/app/composables/boot/useAtmosphere.ts:315`), a pointer space the root's own events cannot reach when page content covers the field, so their writers cannot be retired without losing the function. An opt-in leg would leave the harness's `<Aurora />` exemplar with no engagement (D-2) and take its ambient cell from 1.80 levels to 0. The handoff gives one writer by default in both cases.
   - The MIGRATION rows are in §5.
6. **Tests.** `engage-ladder.test.ts`: the PRM cell now asserts one mechanism (no reduce arm for the pop in the recipe; the global fallback's zero clock present), and a new crest-reason cell. `Aurora.cursor-writer.test.ts` (new): the root leg writes while no consumer drives, and stands down after a consumer write. `Configurator.material.test.ts`: the chip is `engage-chosen`, `data-state="on"`, and carries the press mark on a primary pointer down. `public-surface.spec.ts`: `usePressMark` on `/motion-core`, `ConfiguratorPresetChip` on the root.

## 2 · Gates (worktree, through `guarded`, one heavy run at a time)

The run of record is the third gate chain (`A7/gates.sh`, logs `A7/logs/gate-*.log`), on the bytes of `P-A7.patch`.

| gate | result | load at end |
|---|---|---|
| build (`gate-build.log`) | exit 0 | 32.2 |
| typecheck, vue-tsc ×2 (`gate-typecheck.log`, `--light`) | exit 0 | 37.6 |
| harness scene app `a7` (`build-a7.log`) | exit 0 · 55 directories · scene app `9e68012e9522` | 31.4 |
| demo dist (`gate-demo-dist.log`) | exit 0 | 30.0 |
| vitest `--maxWorkers=2` (`gate-vitest.log`) | **246 files; 2395 passed, 10 expected fail, 1 skipped; exit 0** | 36.1 |

The second chain's vitest failed one cell, `keeps the exact root runtime surface`, because the chip was not yet on the root barrel. It is cured in `src/index.ts`, and the third chain is green (`superseded-r2/`).

## 3 · Battery on the harness's own app (H7 harness `7bf3ce6f`, build `a7`), both engines

Chromium ran stage by stage, one `guarded` call each. **WebKit ran in one `guarded --exclusive webkit --timeout 90` acquisition**: queued 14:20:41, admitted 14:31:27 (a 10.8-minute wait), released 15:11:39, guarded exit 0 (`A7/logs/all.log`). No WebKit stage was skipped. No page closed outside the harness's NAV_CAP relaunch. Loads are the 1-minute load at stage start. Other seats kept the machine at 17-48 throughout.

| witness | Chromium P/F/U · load | WebKit P/F/U · load | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 32.8 | 93/3/0 · 24.8 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED, engine limit (`css` substrate). WebKit FAIL 1.80 levels against 1.23 at rest (not ≥ 2×, D3's amplitude), and the PRM cell 0.00 (§4 CK-01/19) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 32.2 | **164/0/0** · 33.8 | — |
| E-3 | 20/2/0 · 34.5 | 20/2/0 · 38.2 | phone touch-held ×1.000: E's promotion, not in this patch (P-A6 the same) |
| E-4 | 17/1/0 · 34.9 | 15/0/4 · 32.2 | Chromium slider carry (§4 CK-05: reproduces on P-A6's bytes too); WebKit's 4 UNMEASURED are the Carousel's engine fact (O-103d (4)) |
| E-5 | **56/0/0** · 36.0 | **56/0/0** · 23.1 | — |
| E-6 | 4/2/8 · 34.3 | 2/2/8 · 27.5 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 · 38.7 | 6/1/0 · 30.3 | `data-held` in `GlassDock.vue` (D2's named clause) |
| E-8 | **19/0/0** · 35.8 | **19/0/0** · 30.0 | — |
| E-9 | **85/0/0** · 35.1 | **85/0/0** · 32.9 | — (21 `commit-instant` cells pass per engine) |
| E-9 `--prm-plant` | 40/32 · 36.4 (a plant read: `PLANT reach` 14 stateful faces fail, tabs included) | 40/32 · 29.4 (the same 14) | H7's plant; red as it must be |
| E-10 | **45/0/0** · 30.9 | **45/0/0** · 25.0 | — (no promotion in this patch, so clip-vanish has nothing to promote; it is E's, §P6-8.1) |
| E-11 | 6/0/2 · 35.7 | 6/0/2 · 29.2 | UNMEASURED: `--scale-commit-pop=1` is not read on the Switch path (the bit takes `--scale-engage`), and `--space-section` is not read on the slider path |
| E-12 | **102/0/0** · 34.3 | **101/0/1** · 27.9 | WebKit UNMEASURED: `rest layouts`, the engine fact (O-103d (4)) |
| CAP | 18/0 · 31.7 | 18/0 · 30.5 | sheets `A7/glance/a7-{chromium,webkit}-{fine,coarse}.png`, 432 frames |

### Plants, each red in both engines (each is the counterexample it cures)

Builds: `A7/logs/build-plant-*.log`. Each plant was applied, built and reverted, and the tree hash read back as the candidate's (`a7927bb5fe62`) after every revert (`A7/logs/builds.log`). The plant builds were cut before the chip's export lines (§4 CK-01) and differ from the candidate only by the plant and those two `index.ts` lines, neither on a plant's path.

| plant | row | witness | Chromium · load | WebKit · load |
|---|---|---|---|---|
| `chipmute`: the chip's hover and press ink removed (pass 6's reduction) | CK-27, CK-25 | E-12 `capsule preset chip answers` | **FAIL** light and dark, "NO ANSWER" on hover and press · 34.4 | **FAIL** light and dark · 23.4 |
| `prmY`: the one reduce mechanism removed | P-1, CK-02, CK-10 | E-9 | **28 FAIL** (commit-instant and commit-spatial on switch, checkbox, radio, chip, toggle, accordion ×4 each; button, chipaction ×2), e.g. switch scale excursion 0.0600 with 48 frames in flight · 35.5 | **28 FAIL**, the same faces · 32.5 |
| `crest`: the pass-6 figures (1.02 wide with the command on it, 1.05 bit) | CK-12, CK-25 | `a7-glance` button committed still | **FAIL 4/4**, ×1.0200-1.0207 · 33.0 | **FAIL 4/4**, ×1.0199-1.0206 · 33.7 |
| `thumb`: the thumb's press on `--fill-selected` alone | CK-25 | `a7-glance` switch coarse press dark | **FAIL**, mean \|ΔL\| 0.0774 against 0.0782 · 34.3 | **FAIL**, 0.0763 against 0.0773 · 37.9 |
| `writer`: the cursor handoff removed | CK-22 | vitest `Aurora.cursor-writer` | **FAIL** 1 of 2 (`plant-writer-vitest.log`); the control passes 2/2 (`unit-writer-vitest.log`) | — (a unit cell) |
| `crest` (unit) | CK-12 | vitest `the crest carries a reason` | **FAIL** (`plant-crest-vitest.log`) | — |

The `thumb` plant's margin is thin (0.0008 L in Chromium, 0.0010 in WebKit): the pass-6 dark press is nearly the size of the pass-6 light press in OKLab L. §4 CK-25 says why the bound is still the right one.

## 4 · Per CK row, this part (each engine, with load)

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| **01** | latch 54/55 (`dock`), load 32.8; ambient UNMEASURED (engine limit) | latch 54/55, 24.8; ambient 1.80 vs 1.23, PRM 0.00 | **Open, not D5's to close by building**: `dock` is D2's. The ambient reduce leg is not built here (open gap 1), and the amplitude is D3's. **A census defect found and cured in this seat:** in the first battery the chip, rendered inside FadingScroll's slot as a private component, was counted to `fading-scroll` ("computes [dragged, chosen]"), and the latch fell to 53/55 (`superseded-r1/bat-a7-chromium-E-1.log`). Exporting the chip lets the member walk count it to `configurator`, and the latch is back to 54/55 in both engines |
| **02** | E-2 164/0 (crest ii: chip 1.040 → 1.63 px, toggle 1.040 → 2.29 px, accordion 1.040 → 12.75 px, checkbox 1.060 → 1.20 px, button 1.061 → 4.57 px, chipaction 1.060 → 2.44 px; bound > 0.8 px), load 32.2; E-9 21/21 commit-instant | E-2 164/0, 33.8; E-9 21/21 | holds on the new crests; the narrowest margin is now the checkbox's 0.40 px (was the chip's 0.016 px) |
| **10** | E-9 85/0, 35.1 | 85/0, 32.9 | holds |
| **12** | unit cell green; the crest plant red | same | **Built.** Each crest is a ladder or scale-register row with a design reason: the press mirrored (1.04), and the engaged rung (1.06) for a command and the bit. Neither figure is sized to the witness: 1.04 on a 20 px bit would sit exactly on the 0.8 px floor (`control-bit.css:284-293` states that floor as 4 % of 20 px), which is why the bit takes the next row, not a fitted literal. The critic rules whether that clause still reads the floor (§6 item 3) |
| **19** | ambient UNMEASURED | 1.80 vs 1.23, PRM 0.00 | open (D3's amplitude; the reduce leg, open gap 1) |
| **21** | E-11 6/0/2, 35.7 | 6/0/2, 29.2 | holds; the crest is now a computed number, read loudly (unit `engage-door`) |
| **22** | static (§5); writer plant red | — | **Built**: a MIGRATION row for every consumer-visible change of pass 6 and pass 7, the greps re-run at this HEAD, `usePressMark` public, one cursor writer, and P-A5 row 4 and P-A4 M-9 retired |
| **25** | `a7-glance` 6/6 (button committed ×1.0590-1.0606; dark coarse press 0.0873 against 0.0782), load 31.7 at capture | 6/6 (×1.0558-1.0606; dark 0.0862 against 0.0773), 30.5 | **Built for A's items.** The committed Button now reads larger than its own pressed frame (×1.03) in a still. The dark thumb visibly lightens on press. Frames: `glance/frames/a7-chromium-fine-light-button-{rest,committed}.png`, `…-coarse-dark-switch-{rest,pressed}.png`. The bound for the dark press is the pass-6 light press read as cured (C-A6 §4, `§P6-4`). The two pass-6 presses measure almost the same in OKLab L (0.076-0.078), so the critics' "not seen in dark" came from the dark frame's low surround contrast, not from a smaller ΔL. The cure moves the dark thumb further than the cured light frame moved: 0.087 vs 0.078. **The gestalt is the critics'** (CK-25: "read by a seat that did not build the route"); the loupe, the clip overpaint and the static ambient are E's and D3's |
| **27** | E-12 `preset chip answers` PASS light/dark (hover paints `background-image`; press-only paint, 46.5-48.0 % of the chip's pixels ≥ 16 levels; `engage-chosen`), 34.3; the chipmute plant red | PASS, 27.9; plant red | **Built.** The hover answers at the hover rung, 5 % ink: 0.0 % of pixels move ≥ 16 levels, the same as every other `--fill-hover` in the library. The tabs plant reach is H7's and red on 14 faces. The duplicate reduce guarantee (C-E6's P3/Y) is gone (P-1) |
| **05** (not A's; read because it moved) | slider carry FAIL: 0.00-3.25 px at 34.9; re-reads 2/5 at 30.3, 1/5 at 20.0 | slider 7.36-12.82 px, 5/5, 32.2 | **Not A7's.** An alternating A/B against a **P-A6 control build** (P-A6's `src` on archived HEAD, the same harness) reads the same: a6ctl 2/5 (17.1), a7 1/5 (17.5), a6ctl 2/5 (20.1), a7 1/5 (23.9) (`logs/ab{1..4}-*`). None of A7's files is on the slider's path. P-A6 read 18/0 under H6's E-4 at load 17-21, so the change is H7's E-4 or the load, and it is handed to P-E7 and H8 (§6 item 2) |
| others (03, 04, 06-09, 11, 13-18, 20, 23, 24, 26) | unchanged from P-A6's readings (E-2, E-3 apart from E's arm, E-5, E-7's D2 clause, E-8, E-10, E-12, CAP) | same | no regression in either engine |

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 5 · CK-22 · MIGRATION rows (consumer greps re-run at this HEAD)

Greps are read-only over the nine siblings (`A7/ck22-greps.sh` → `logs/ck22-greps.txt`; `A7/ck22-material.py` → `logs/ck22-material.txt`; sibling HEADs printed in the log). Main source trees only. Built output that the exclude list missed is noted in the log and counted as 0: `sci-report/dist-ob11`, and the CSS under value.js `bench/paired/sheets` and its `.worktrees` copies. Nothing was built or run in any sibling.

| # | consumer-visible change | pass | consumer sites at this HEAD | MIGRATION row |
|---|---|---|---|---|
| M-12 | The material classes' press (`.glass-wash`, `-quiet`, `-resting`, `-floating`, `-overlay`, `-card`, `.glass-specular-track`) keys on `[data-press]::before`, not `:active::before`. The dock controls stay on `:active` (D2) | 6 | Material-class elements, read back to their opening tag: slides 43 (11 in style blocks, 31 inert, **1 pressable**: `slides/src/deck/DeckSettings.vue:149` `<button class="deck-settings__lock glass-quiet">`), fourier-analysis 16 (11 inert, 5 style), speedtest 5, value.js 2, atlas 1, keyframes.js 1 (style); inert means no handler and no button role. `:active` rules on a material class in consumer source: 0 | "A material class's press gleam reads the engage door's press mark. An element of yours that composes `.glass-wash`/`-quiet`/`-resting`/`-floating`/`-overlay` and is pressable gets its press back with `usePressMark(() => el.value)` from `@mkbabb/glass-ui/motion-core`. `:active` no longer lights it." One site needs it: slides `DeckSettings.vue:149` |
| M-13 | `--glass-btn-press-t` is renamed `--press-t` (the floor, F5‴) | 6 | 0 in source | "The press drive is `--press-t`; a consumer reading `--glass-btn-press-t` reads it under the new name." |
| M-14 | The commit pop on eight members (Switch, Checkbox, Radio, Chip both modes, Button, accordion trigger, SegmentedTabs, ToggleGroupItem) plays on the member root's `transform` (`--rung-commit`, `--rung-crest`) | 6 | `transform`/`scale` overrides on those members' classes: 0; commit tokens read: 0 | "A committing control pops on its root's `transform` when its state commits (a command: on each activation). A consumer `transform` on that root replaces the pop; under reduced motion there is no pop and the state changes at once." |
| M-15 | The crest rows: `--scale-commit-pop` is `calc(2 - var(--scale-press))` (1.04); `--scale-commit-pop-bit` is **deleted**; a command and the control bit pop on `--scale-engage` (1.06) | 7 | 0 | "Re-pointing `--scale-press` moves the commit crest with it; the bit's crest is the engaged rung. `--scale-commit-pop-bit` is gone, with no alias." |
| M-16 | The commit light is retired: `--engage-commit-light-*`, `--rung-light`, `data-engage-face`, `data-engage-light`, the `.segmented-tab__light` span | 6 | 0 | "Nothing replaces the commit light; the commit is the pop, and under reduce the face's own state." **Retires P-A5's row 4** (the commit light's 60/480 ms clock) and **P-A4's M-9** (the tab's light span): both describe bytes that no longer exist |
| M-17 | The Configurator preset chip lost the capsule's hover lift and press snap (pass 6) and now answers as a `chosen` member: hover and press ink, `data-state`, the press mark, and a pop when chosen. The new export is `ConfiguratorPresetChip` | 6 → 7 | `<Configurator>`: fourier-analysis 2 (`VisualizationView.vue:459`, `EquationView.vue:495`), both on the default gallery; `#presets` slot overrides 0; chip CSS 0 | "The default preset chip is `ConfiguratorPresetChip`: it answers hover and press in light and pops when chosen, with no lift or snap. A custom `#presets` gallery can compose it." |
| M-18 | DialogContent's presented plate fades under reduced motion (opacity only; its spatial leg is `scale: 1`) | 6 | Dialog/Sheet sites: atlas 7, chicago 2, keyframes.js 12, slides 2, speedtest 13, value.js 23, fourier-analysis 14 | "Under reduced motion a dialog fades in and out and does not scale." |
| M-19 | The sortable row and handle and the dialog and sheet close buttons press on `[data-press]`, not `:active` | 6 | `:active` on them in consumer source: 0 | as M-12 |
| M-20 | The Aurora root writes the cursor from the pointer over it, until a consumer calls `setCursor` or `clearCursor`; that consumer then owns the cursor for the mount's life | 6 → 7 | callers: keyframes.js `HeroAurora.vue:223,227`; value.js `useAtmosphere.ts:315,320`. Both call before or with the root's first move, so each owns the cursor and nothing changes for them | "An Aurora answers the pointer over it by itself. Calling `setCursor`/`clearCursor` takes the cursor over, and the root stops writing it." No consumer change is owed; the two-writer case C-E6 §0.5 found is gone |
| M-21 | `usePressMark` and `UsePressMarkOptions` are new exports on `/motion-core` | 7 | — | additive |
| M-22 | The Switch thumb's press ink is the both rung (0.17), not 0.12 | 7 | `.switch__thumb` restyles in consumer source: 0 | "The pressed thumb takes a little more ink." |

Outside D5's bytes, and placed in their owners' tranches as before: `tap-squish` in chicago ×3 and speedtest ×4, and `keyframes.js/.../EasingField.vue:40`'s `glass-capsule-hover` (D2 owes its row when it retires the class).

## 6 · Open gaps

1. **CK-01/CK-19 · the ambient reduce leg is not built.** A light-only answer under reduce cannot be built in A's bytes. One uniform, `uCursorStrength`, drives both the cursor swirl (geometry: `aurora.frag.ts:298-312`, `aurora.wgsl.ts:198-209`, and the image path's copy) and the luminance lean (light: `aurora.frag.ts:436-439`, `aurora.wgsl.ts:379-`). So any reduce cursor write that lights the field also swirls it, and reduce retires spatial legs (CK-10). **D3 is told**: the reduce leg needs the lean on its own scalar, written under reduce while the swirl's stays 0. The WGSL struct has two free lanes (`ints1.zw`, `uniformBridgeWGPU.ts:17`). With that lane, A's half is a runtime write: under reduce, `setCursor` snaps the lean to the pointer with no dynamics and wakes one frame. D3 is also told the amplitude again (1.80 vs 1.23 here; radius and amplitude 0.25, ceiling 0.8). Both cells stay FAIL in WebKit and engine-limit UNMEASURED in headless Chromium.
2. **CK-05 · the Chromium slider carry under H7's E-4** reads 0.00-9.94 px with 1-2 of 5 passing, on P-A7 and on a P-A6 control alike, at loads 17-36. WebKit reads 7.36-12.82 px, 5/5. It is not A's change. Owed: P-E7 (the carry is E's row this pass) and H8 (whether H7's E-4 edit or the load moved the Chromium read; P-A6 read 18/0 under H6).
3. **CK-12 · one clause for the critic.** The bit's reason ("the press mirror on a 20 px bit is the floor `control-bit.css` states, so the bit takes the next row") cites the 0.8 px floor as a design statement of the register. The figure is a ladder row, not a fitted literal. The owner's optional CK-12 question (§P6-6) still stands if the critic reads the clause as the witness's.
4. **CK-25 · gestalt items this part does not own:** the accordion's pop is now 12.75 px across its 320 px row (6.4 px before), a larger full-width answer that the critics should read in the frames; the loupe, the clip overpaint and the promoted control are E's; the static ambient is D3's.
5. **The chip's hover is faint**: 5 % ink, 0.0 % of its pixels by ≥ 16 levels. That is the library's hover rung, not a figure of this seat's.
6. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 7 · Process

- **Machine law.**
  - Every build, test and browser run went through `~/.claude/guard/guarded`, never `--light` for a browser. `--light` was used only on typecheck and single unit files.
  - WebKit ran only under `--exclusive webkit`, in one acquisition. One heavy run at a time; vitest at `--maxWorkers=2`; one browser per witness with a context per cell (the harness's own).
  - The kernel zone never gated a run. The guard queued several stages for 10-25 minutes at loads 36-65.
- **Fences.**
  - No edit to tracked source in the checkout. No git write in the checkout: `git worktree add` and `remove` only. Patch checks and cost reads ran on archived HEAD trees in the scratch directory, since removed.
  - Checkout writes are only `pass-7/P-A7.patch`, `pass-7/P-A7.md` and `pass-7/A7/`.
  - Siblings were read by grep and one Python walk, with nothing built or run. Nothing under `~/.claude` was read beyond executing `guarded`.
- **Slips, mine.**
  - The first battery was stopped after E-5 when E-1 showed the census defect (§4 CK-01). Its logs are in `superseded-r1/`, and its one E-5 process was killed by hand with its guarded parent.
  - `mkpatch.sh` once resolved a relative output path inside the worktree and wrote a stray `P-A7.patch` beside `wt/`. It was deleted and the patch re-cut with an absolute path; the sha1 above is the re-cut.
  - One grep appended minified bench CSS to `ck22-greps.txt`. The log was regenerated from the script, and the M-11 grep re-run with `bench` excluded and annotated.
- **Cleanup.** `git worktree remove --force .claude/worktrees/bl/D5/p7/A7/wt`; `.claude/worktrees/bl/D5/p7/A7/` removed (`git worktree list` shows none). No P-A7 process is left running. The worktree's `.a7out` harness builds went with it, so a re-read rebuilds from the patch
