# gaggle report dock: the dock-frames film (O-420 inbound)

**Site** studentsafety report, route R (`dashboard/src/report/page/PageDock.vue`), gaggle-site `898cea9` (R-W3, not deployed). **glass-ui** 11.1.0 (`GlassDock`, `DarkModeToggle`). **Engines** Chromium 149 headless shell and WebKit 2311, Playwright 1.61.1. **Widths** 1440, 768, 390. **Schemes** light and dark. **Lens** team at every width; Gaggle at 390 light. **Reduced motion** at every team cell. Filmed Mon 2026-11-23, 11:00–12:20 ET, from fixtures (`npm run report:serve`, scene `nov23`).

## The short read

- The dock's outer box and its plate never moved: 0.00 px on left, right, centre, top and width. That covers 368 recorded motions (loads included) and 60,246 sampled frames across 26 cells.
- This dock never collapses. `PageDock.vue:81` sets `:collapse="false"`, which is glass's always-expanded pole. It has no collapse control, and scroll does not fold it. Escape, an outside tap and hover in or out move nothing in the dock.
- On load the dock arrives whole in its first frame, at opacity 1, with no entrance motion, and then holds still.
- The theme toggle never moves under hover. Under press its centre holds within 0.01 px, but it shrinks 3 % (40 → 38.8 px). In WebKit it springs back in one frame after the theme flip stalls the page.
- **The one sideways shift is ours.** At 390 px the dock's row overflows its run by 7 px. Every seat jumps 7 px sideways in one frame when Find or the section menu is pressed.
- The seat words fade through near-invisible contrast for about 110 ms after a theme flip (Chromium measure; WebKit frames show it too). We can switch that off with a prop glass already ships.

## How it was filmed

`probe/film.mjs` drives each cell in its own browser context; `probe/lib.mjs` is the in-page sampler and the analysis. Every `requestAnimationFrame`, the sampler reads `getBoundingClientRect` of:

- the dock (`.glass-dock`) and its plate (`.dock-plate`);
- every seat (`[data-seat]`, the lamp, both separators) and the gliding mark (`.dock-run-mark`);
- each theme toggle and its moon glyph (`.toggle-circle`);
- every reka popper (tooltips, the section menu, Find);
- the run's `scrollLeft` and overflow.

Rest is the last frame before the trigger. The trigger is the first input event the page saw. When a motion faulted, it was run again under a screenshot loop that takes a frame every few animation frames. The strips in `strips/` come from that second run, with the rest edges drawn and 4× insets.

Motions per cell:

- (a) load;
- (b) hover into and out of the dock, Escape with focus in the dock, an outside tap, a wheel scroll, Find open and Find close, and the section switch. At 1440 the switch is a seat press. At 768 and 390 it goes through the menu: open it, close it with Escape, close it with an outside tap, or pick a section;
- (c) hover in and out on the theme toggle;
- (d) press-and-toggle the theme, both ways.

Reduced-motion cells ran (a), (b) and (d). At 768 and 390 the team dock is compact (below 1180 px; Gaggle's is compact below 1024). In compact docks the theme toggle lives in the section menu, so (c) and (d) run there.

Caveats:

- The 1-minute load was 16–46 during the runs, so settle times and long frames are load-sensitive. Box drifts are not.
- Every width used a fine pointer (no touch emulation), so hover is measured at 390 too.
- Device scale factor was 1.
- A strip's time label is when the screenshot was asked for. The image lands later, often by 30–120 ms or more. So frames labelled −6 and −4 ms already show the 7 px jump, and WebKit's frame labelled 2 ms is already dark. Read the order of the frames, not their labels.
- In WebKit at 390, the probe's reset of the run's scroll did not hold. The filmed WebKit motions started from the already-scrolled end, so they show no jump. `probe/diag/run7.mjs` confirms that WebKit's run scroll changes the same way (0 → 7 on Find, 7 → 0 on the menu).

## Numbers, per cell

`node probe/table.mjs .` prints these from `runs/<engine>/<cell>.json`. The reading notes come first:

- "rm" means reduced motion.
- "dw" is the change in box width, in px.
- In the press column, "spring" means the shrink eases in and out; "one-frame" means it arrives and leaves in a single frame (glass's reduced-motion press).
- "Section switch" applies at 1440 only; at 768 and 390 the menu carries it and no mark glides.
- "Theme flip: longest frame" is the longest gap between animation frames in the two toggle motions.

| engine | cell | load: dock first frame / opacity / moves | outer box max drift l / c / r px (all motions) | seats moved (motion: px) | run overflow; scroll travel | theme hover: toggle box dcx / dw | theme press (both toggles): toggle dw, centre dcx; shrink | section switch: dock settle ms; mark overshoot | theme flip: longest frame ms |
|---|---|---|---|---|---|---|---|---|---|
| chromium | team-1440-dark | 255.4 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1, 0; spring | 562.3; 1.3 px | 71.5, 98.6 |
| chromium | team-1440-dark-rm | 211.2 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | 155.2; none | 129, 133.6 |
| chromium | team-1440-light | 245.1 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.1, 0 / -1.2, 0; spring | 573.2; 1.3 px | 103.5, 60.2 |
| chromium | team-1440-light-rm | 203.7 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | 195.5; none | 196, 141.9 |
| chromium | team-390-dark | 123.1 ms / 1 / none | 0 / 0 / 0 | b-find-open: 7 px sideways | 7 px; 7 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 58.8, 40.4 |
| chromium | team-390-dark-rm | 136.2 ms / 1 / none | 0 / 0 / 0 | b-find-open: 7 px sideways; b-menu-open: 7 px sideways | 7 px; 7 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 101.5, 79 |
| chromium | team-390-light | 166 ms / 1 / none | 0 / 0 / 0 | b-find-open: 7 px sideways; b-menu-open: 7 px sideways | 7 px; 7 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 44.7, 38 |
| chromium | team-390-light-rm | 157.1 ms / 1 / none | 0 / 0 / 0 | b-find-open: 7 px sideways; b-menu-open: 7 px sideways | 7 px; 7 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 74, 117.5 |
| chromium | team-768-dark | 152.1 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 41.3, 43.8 |
| chromium | team-768-dark-rm | 158.5 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 118.1, 108.1 |
| chromium | team-768-light | 238.2 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 55.3, 76.6 |
| chromium | team-768-light-rm | 138.3 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 124, 101.7 |
| chromium | gaggle-390-light | 118.2 ms / 1 / none | 0 / 0 / 0 | b-find-open: 7 px sideways; b-menu-open: 7 px sideways | 7 px; 7 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 23.6, 34.7 |
| webkit | team-1440-dark | 587 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | 817; 1.3 px | 285, 243 |
| webkit | team-1440-dark-rm | 765 ms / 1 / none | 0 / 0 / 0 | b-section-switch: press size -3.2 px, centre fixed | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | 1247; none | 2283, 1283 |
| webkit | team-1440-light | 549 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | 854; 1.3 px | 190, 174 |
| webkit | team-1440-light-rm | 783 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | 746; none | 2386, 1255 |
| webkit | team-390-dark | 253 ms / 1 / none | 0 / 0 / 0 | none (see caveat) | 7 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 107, 113 |
| webkit | team-390-dark-rm | 225 ms / 1 / none | 0 / 0 / 0 | none (see caveat) | 7 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 789, 1429 |
| webkit | team-390-light | 539 ms / 1 / none | 0 / 0 / 0 | none (see caveat) | 7 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 227, 312 |
| webkit | team-390-light-rm | 602 ms / 1 / none | 0 / 0 / 0 | none (see caveat) | 7 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 649, 789 |
| webkit | team-768-dark | 597 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 152, 263 |
| webkit | team-768-dark-rm | 845 ms / 1 / none | 0 / 0 / 0 | b-find-open: press size -2.7 px, centre fixed; b-menu-open: press size -3.7 px, centre fixed | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 1343, 1799 |
| webkit | team-768-light | 377 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 222, 266 |
| webkit | team-768-light-rm | 1103 ms / 1 / none | 0 / 0 / 0 | none | 0 px; 0 px | (not run) | -1.2, 0 / -1.2, 0; one-frame | — | 1600, 1708 |
| webkit | gaggle-390-light | 335 ms / 1 / none | 0 / 0 / 0 | none (see caveat) | 7 px; 0 px | 0 / 0 | -1.2, 0 / -1.2, 0; spring | — | 166, 175 |

### Settle times (milliseconds from the trigger to the last frame in which any tracked box moved by more than 0.25 px)

| motion | Chromium | WebKit | Chromium, reduced motion | WebKit, reduced motion |
|---|---|---|---|---|
| dock hover in or out, Escape, outside tap | 0 in the dock (a section tooltip may appear) | 0 | 0 | 0 |
| wheel scroll | 0 at 768 and 390; up to 488 at 1440, where the mark glides to the new section | 0; up to 309 at 1440 | 0; up to 9 | 0; up to 26 |
| Find open / close (the popover) | 292 / 273 | 342 / 387 | 22 / 19 | 1162 / 1244 |
| menu open / Escape / outside tap (768, 390) | 295 / 261 / 261 | 458 / 374 / 274 | 14 / 18 / 17 | 733 / 874 / 41 |
| section switch, 1440: the mark's glide | 562–573 | 817–854 | 155–196 (one frame) | 746–1247 (one frame, late) |
| theme hover in, 1440: the tooltip | 709–713 (reka's 700 ms delay) | 807 | not run | not run |
| theme toggle (the press release) | 164–184 | 427–434 | 233–242 | 1470–1596 |

These are medians over cells, except where a range is given. Under reduced motion, nothing in WebKit animates. The 1.0–1.6 s figures are the page stalling before its next frame (fault G5).

## Faults, traced to source

glass-ui line numbers are its source at tag `v11.1.0`. The installed `dist` CSS is minified to one line, so its numbers do not match.

| # | what the frames show | cells | source | owner |
|---|---|---|---|---|
| G1 | **Seats jump 7 px sideways in one frame.** At rest the row (sections, lamp, Find) is 365 px wide but the run's port is 358 px. The run scrolls on focus, so pressing Find slides every seat 7 px left in one frame. Opening the section menu slides them back. Find's right edge is cut 2.6 px when the run rests at 0. The outer box does not move. | every 390 cell, both lenses, both schemes, with and without reduced motion. Chromium filmed it in each 390 cell; team-390-dark's menu jump showed in the first pass only, since its re-runs started at scroll 0. WebKit's scroll changes the same way (`diag/run7.mjs`). | **Ours.** The 390 seat budget: `PageDock.vue:256-264` (`.kit-lamp-seat` `inline-size: var(--lamp-short, 9rem)`; the comment at :258 says 14 px type took it from 8.375rem to 9rem); `PageDock.vue:273-284` (seat padding 0.5rem, separator margins); the band's side gutter, `.r-dock-seat` `padding-inline: 0.5rem` (`PageDock.vue:169`), which caps the dock at 374 px. Glass makes any overflow a snap scroller (`run.css:255,260,267`). Pointer focus then scrolls it natively in one frame. `useDockRun.ts:248-258` `reach` gives way to that native focus scroll, so its spring glide never runs. | **gaggle** (take 7 px or more off the 390 row). Glass may note that a run a few px over its port hops in one frame instead of gliding. |
| G2 | **The theme toggle shrinks under press; in WebKit the release lands in one step.** The centre stays within 0.01 px; the box goes 40 → 38.8 px (scale 0.97). The release cannot animate while the theme flip blocks the main thread. Chromium springs back over 2–3 frames after a 60–100 ms frame. WebKit holds the shrink through the flip's stall, then returns 0.45–0.6 px a side in one frame. The hold was 230–530 ms at load 16–46 and 90–140 ms in the check at load 13–16. | every cell, both toggles (dock at 1440, menu at 768 and 390) | **glass** `DarkModeToggle.vue:23` `useLiquidPress({ el: button, squish: false })` writes inline `scale`, with a default 0.03 depth (`useLiquidPress.ts:148`). It is a JavaScript spring on rAF, so it stalls with the page. **Ours:** the flip's long frame. The whole report restyles on `:root.dark` (`tokens.css:56`), and `Field.vue:49-50` re-reads its tones on the class change. | **glass** for the press (is a shrink wanted on a theme seat, and should its release run off the main thread?). **gaggle** for the flip's cost. |
| G2b | **Under reduced motion the press is one frame in and one frame out.** The toggle and the pressed dock seats show it (WebKit seats: −2.7 to −3.7 px wide for one frame, centre fixed). | every reduced-motion cell | **glass** `useLiquidPress` is "PRM-instant": the scale arrives with no in-between frames. The seats' `:active` `scale: var(--scale-press-dock)` (`tab-button.css:89`, `triggers.css:90`) snaps because the reduced-motion block zeroes transitions. | **glass** (whether reduced motion should drop the press scale outright) |
| G3 | **Seat words fade through low contrast after a theme flip.** The plate's paper swaps at once, while the words' colour eases over 0.2 s. Chromium 1440, light → dark: contrast is 1.46:1 at the flip. It falls as low as 1.08:1 while the ink crosses the plate's lightness. It reaches about 4.5:1 110–150 ms after the flip and 14.4:1 at 0.2–0.26 s. The 1440 strips show it both ways in Chromium and in WebKit's frames. The word "Theme" sits in no dock control and holds full contrast. | every non-reduced-motion cell | **glass** `tab-button.css:63-64` and `triggers.css:63-64,117-118` `color var(--dock-motion-fast)`, against the instant `--paper` swap. **Ours:** `PageDock.vue:117,138` render `<DarkModeToggle size="dock" />` without `disable-transitions`. That prop adds glass's `html.no-transition` (`a11y-overrides.css:72`) for exactly this flip. | **gaggle** (pass `disable-transitions` on both toggles). Glass may consider making it the dock toggle's default. |
| G4 | **The section mark overshoots 1.3 px, then creeps back over about 150 ms.** It moves in sub-0.25 px steps, with no jump in the last frames (below). The outer box holds at 0.00. | 1440, both engines and schemes | **glass** `useDockRunMark.ts:165,213` (`DOCK_SPRING`, the dock preset, ζ 0.88) | **glass** (a designed spring; listed, not judged a defect here) |
| G5 | **Long frames, worst under reduced motion in WebKit.** The theme flip's longest frame is 24–104 ms in Chromium and 107–312 ms in WebKit. Under reduced motion it is 74–196 ms in Chromium and 649–2386 ms in WebKit. WebKit with reduced motion also stalls 1.1–1.6 s after Find or the menu closes. A quiet re-measure in Chromium at 768 gave 36–50 ms normally and 102–121 ms with reduced motion (`diag/gaps.mjs`). Not every stall is the flip: in WebKit team-1440-light-rm, toggle 1's 2,386 ms gap starts 27 ms after the press. The page saw the release only at 1,180 ms. | every cell | Not proven. Suspect glass's reduced-motion block `*, *::before, *::after { animation-duration: 0.01ms !important; … }` (`a11y-overrides.css:46-52`), which gives every element pseudo-element rules on each full restyle, plus our page's restyle size. A CPU profile would settle it. | **open** (glass and gaggle) |

Checked and clean:

- The outer box and the plate show 0.00 px drift in every motion, cell and engine.
- No vertical move and no width change at load.
- The theme toggle's box holds 0.00 px under hover in and out, in both places it lives.
- The theme tooltip centres on the theme seat (−0.06 px from the seat's centre; the seat is the toggle plus the word "Theme"). It sits 28.5 px right of the toggle's own centre and is not at the screen's left edge.
- The section menu holds 0.00 px while its toggle is hovered, pressed and flipped.
- The moon glyph's 3 px move inside the toggle (`.toggle-circle` `translateX(-15%)`, `dark-mode-toggle.css`) is the designed sun-to-moon morph.

## The last 6 frames

The dock never collapses, so these are the last 6 frames of each motion that moves anything in it.

- **Section switch, 1440 (Chromium, team light), the mark:** steps of −0.15, −0.19, −0.23, −0.14, −0.06, −0.05 px. They fall at 500–573 ms, 8–19 ms apart, after a +1.28 px overshoot. There is no jump. WebKit's tail looks the same (1.3 px overshoot, settles 817–854 ms).
- **Menu open after Find, 390 (Chromium):** the whole motion is one frame. All five seats step +7 px, 22 ms after the press. Find open is the mirror: −7 px, 47 ms after the press.
- **Theme toggle press and release, 1440 (Chromium, light → dark), each edge per frame:** inward 0.20, 0.06, 0.13 and 0.07 px, then outward 0.09 and 0.46 px. The press keeps deepening through the flip: the 0.07 px inward step is the first frame after the 103 ms stall. The release follows 12 and 18 ms later. In WebKit the release is a single step of 0.45–0.60 px a side, after 228–532 ms with no change (73–105 ms in the quieter check).

## Who owns what

| owner | items |
|---|---|
| gaggle (`PageDock.vue`, `tokens.css`, `Field.vue`) | G1: the 390 row overflows by 7 px. G3: opt into `disable-transitions`. G2 and G5: our share of the flip's long frame. |
| glass-ui 11.1.0 | G2 and G2b: the press scale on the theme toggle, its release timed on the main thread, and the one-frame press under reduced motion. G1: the native one-frame hop of a run that barely overflows. G3: the colour ease against an instant plate. G4: the mark's 1.3 px overshoot (by design). G5: the suspected cost of the reduced-motion block. |

## Files

- `probe/film.mjs`, `probe/lib.mjs`: the film and its sampler and analysis. `probe/table.mjs`: these tables.
- `probe/diag/run7.mjs`: the run's scroll per step. `probe/diag/flip.mjs`: word ink and plate paint per frame during the flip. `probe/diag/gaps.mjs`: the rAF gaps per action.
- `runs/<engine>/<cell>.json`: per motion, the drift, seats, toggles, tail, settle, run scroll, popovers and faults.
- `runs/<engine>/raw/`: the raw frames behind the kept strips and the G5 stalls.
- `runs/run-*.log`: the run logs.
- `check/`: the non-author re-run of four cells (cell JSONs, raw frames of faulted motions, chain scripts and logs, `compare.mjs`). See "Checked".
- `strips/` (one PNG per motion, a few frames each):
  - G1: `chromium-gaggle-390-light-b-find-open.png`, `chromium-team-390-light-b-menu-open.png`, `chromium-gaggle-390-light-b-menu-open.png`
  - G2 and G3: `chromium-team-1440-light-d-theme-toggle-1.png` (light → dark), `chromium-team-1440-dark-d-theme-toggle-1.png` (dark → light), `webkit-team-1440-light-d-theme-toggle-1.png`, `chromium-team-390-light-d-theme-toggle-1.png` (the menu toggle; G2 only, as its frames skip the colour ease)
  - G2b and G5: `chromium-team-1440-light-rm-d-theme-toggle-1.png`, `webkit-team-1440-light-rm-d-theme-toggle-1.png` (3 frames, none between 3 ms and 2,088 ms: the stall)
  - G4 and the anchored edges: `chromium-team-1440-light-b-section-switch.png`

Rerun it from a dashboard checkout at `898cea9`, with the server started as `PORT=5437 ~/.claude/guard/guarded --timeout 60 -- npm run report:serve`:

```sh
PW_MODULE=<dashboard>/node_modules/playwright/index.mjs ~/.claude/guard/guarded --timeout 60 -- node probe/film.mjs --engine chromium --base http://127.0.0.1:5437 --out .
PW_MODULE=... ~/.claude/guard/guarded --exclusive webkit --timeout 75 -- node probe/film.mjs --engine webkit --base http://127.0.0.1:5437 --out .
# --cells <regex> picks cells; --motions <regex> re-runs motions and merges them into the cell JSON
```

The diag scripts read the same server at port 5437. The scratch worktree that served the fixtures was removed after the film; its removal is logged in `~/.dev-logs/disk-reclaim/DELETED.tsv`.

## Checked

**Verdict: CONFIRMED, with the corrections listed below.** A non-author check ran Mon 2026-11-23, 12:46–13:10 ET. It filmed nothing new.

Setup: a fresh detached worktree at gaggle-site `898cea9`, with glass-ui 11.1.0 and Playwright 1.61.1 (Chromium 149 headless shell, WebKit 2311). The fixtures were served on port 5437. `probe/film.mjs --film 0` re-ran four cells. `diag/run7.mjs` re-ran in both engines at 390, and `diag/flip.mjs` in Chromium light. The 1-minute load was 29.5 for Chromium and 13–16 for WebKit. No source was edited. The worktree was removed afterwards and logged in `~/.dev-logs/disk-reclaim/DELETED.tsv`. Outputs are in `check/`; `node check/compare.mjs . check <engine>:<cell>` prints both runs motion by motion.

### The four cells, film → check

| engine | cell | load: dock first frame | outer box and plate drift, every motion | seats moved | run overflow; scroll travel | theme press: toggle dw; centre dcx | section switch: settle; mark overshoot | theme flip: longest frame |
|---|---|---|---|---|---|---|---|---|
| Chromium | team-1440-light | 245 → 217 ms; opacity 1; no move | 0 → 0 px | none → none | 0; 0 → same | −1.1, −1.2 → −1.2, −1.2 px; 0.01 → 0.01 | 573 → 564 ms; 1.3 → 1.3 px | 104, 60 → 57, 61 ms |
| Chromium | team-390-light-rm | 157 → 177 ms; opacity 1; no move | 0 → 0 px | Find −7, menu +7, one frame → same | 7; 7 → same | −1.2, −1.2; 0, held 15 frames → same | — | 74, 118 → 198, 195 ms |
| WebKit | team-390-dark | 253 → 184 ms; opacity 1; no move | 0 → 0 px | none → none (Find again started at scroll 7) | 7; 0 → same | −1.2, −1.2; ≤0.01 → same | — | 107, 113 → 105, 98 ms |
| WebKit | team-768-light | 377 → 265 ms; opacity 1; no move | 0 → 0 px | none → none | 0; 0 → same | −1.2, −1.2; 0.01 → same | — | 222, 266 → 105, 73 ms |

- Every box number reproduces. The fault lists match motion for motion in all four cells.
- Hover in and out on the theme toggle moved it 0 / 0 px in all four cells.
- The theme tooltip again sits 28.51 px right of the toggle and −0.06 px from the theme seat. The moon glyph again moves 3 px.
- Times and long frames move with load, as the caveat says. Three fall outside the README's ranges: Chromium reduced-motion flip frames of 195–198 ms (README 74–196), a WebKit flip frame of 73 ms (README 107–312), and a WebKit first paint at 184 ms (README 225–1103).
- The counts hold: 26 cells, 368 motions with loads, 60,246 frames, 0.00 px outer and plate drift.
- The README's per-cell table is what `probe/table.mjs` prints from `runs/`. The settle table's medians match the data too.

### G1 geometry, re-measured (`diag/run7.mjs`, 390, both engines)

- The run's port is 358 px and its row's scroll width is 365 px: 7 px over.
- Find's right edge is 376.64 px against the port's 374 px, so 2.64 px is cut.
- A Find press scrolls the run 0 → 7 and moves every seat −7 px. Escape and an outside tap keep it at 7. A menu press scrolls it back to 0.
- WebKit gives the same numbers at every step.

### The strips

- **G1:** visible in all three 390 strips. The words sit 7 px off the cyan rest box, and the 4x inset shows the jump.
- **G2:** the 1.2 px shrink is too small to see at 1x. The frame labels (dw −0.84, −1.16) and the inline scale list carry it.
- **G2b:** labels only: dw −1.20 in one frame, then 0.
- **G3:** plain to see in the three 1440 toggle strips. The section words, the lamp line and Find go dim after the flip; "Theme" does not. The 390 menu-toggle strip does not catch it.
- **G4:** the glide shows: at 228 ms the mark sits between Scoring and Records. The 1.3 px overshoot is in the labels only. The outer edges hold in both insets.
- **G5:** the WebKit reduced-motion strip has no frame between 3 ms and 2,088 ms.

### The sources, read at gaggle-site `898cea9` and glass-ui `v11.1.0`

- Right as cited: `PageDock.vue:81` (`:collapse="false"`), `:117` and `:138` (no `disable-transitions`), `:169`, `:258`; `tokens.css:56` (`:root.dark`); `Field.vue:49-50` (a MutationObserver on the html class).
- Right as cited in glass: `run.css:255,260,267`; `useDockRun.ts:248-258`; `DarkModeToggle.vue:23`; `useLiquidPress.ts:148` (depth 0.03); `tab-button.css:63-64,89`; `triggers.css:63-64,90,117-118`; `a11y-overrides.css:46-52,72`; `useDockRunMark.ts:165,213`.
- Also confirmed: `useGlobalDark.ts:125-141` adds `html.no-transition` for the flip and removes it a frame later. `--dock-motion-fast` is 0.2 s (`dock/styles/index.css:217`, `scheme-motion.css:101`). The dock preset is ζ 0.88 (`springPresets.ts`). `--scale-press-dock` is 0.96 (`scale-paper.css:10,25`), which fits the WebKit seats' 2.7–3.7 px press.
- The lamp's words fade too. At 1440 the lamp sits in a `DockTrigger` (`Lamp.vue:45-46`), so `triggers.css:63-64` covers it.

### Corrected in this README

- G1 lines: `PageDock.vue:248-262` became `:256-264`, and `:273-285` became `:273-284`. `:169` is the band's side gutter, not seat padding.
- G3: contrast falls to 1.08:1, not 1.28:1, as the ink crosses the plate. It reaches about 4.5:1 at 110–150 ms and 14.4:1 at 0.2–0.26 s.
- G2 and "The last 6 frames": WebKit's hold follows the stall, so it is load-dependent. Its one-frame return is 0.45–0.6 px a side.
- "The last 6 frames": the six theme steps are press then release, not release alone.
- G5: one WebKit stall begins at the press, before the click.
- Caveats: a strip's time label leads its image.
- Files: the 390 toggle strip shows G2 only. The WebKit reduced-motion strip is described by its frames.
- Faults: glass line numbers are its source at `v11.1.0`.

### Also found

- In the 1440 section switch, the mark starts 167–179 ms after the press. It follows `aria-current`, which the page sets from its scroll position (`Page.vue:377-386`). Its overshoot peaks at 445–468 ms and is within 0.25 px by 573–580 ms.
