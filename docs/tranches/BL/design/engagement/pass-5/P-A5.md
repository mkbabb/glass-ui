# P-A5 — route A's part, D5 pass 5

- **Seat:** P-A5 PROTOTYPE, D5 pass 5 (REGISTRY §P4-8.1).
- **Model:** claude-opus-5-5.
- **Base:** the light build is on 8348264cd. The geom build is on 1e3912e13. HEAD at return is c8ffc41a7, and `src/` and `tests/` have not changed since 8348264cd (`git diff --stat 8348264cd HEAD -- src tests` is empty).
- **Engines:** headless Chromium (shell) and Playwright WebKit, both on the harness's own app.
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox; O-103 says it was not granted).
- **INBOUND:** read at mtime 2026-10-20 14:43, along with FORMATION-PROGRESS. Neither has a D5 ruling. Q-5, Q-2, Q-3, the engine-limit clauses and O-74c G-1 are all OPEN ON THEIR DEFAULT.
- **Date:** 2026-10-20. The Chromium chain ran 19:48–21:11 and the WebKit chain 21:11–21:53 (one `guarded --exclusive webkit` acquisition).

## Patches

| patch | sha1 (shasum at return) | files | lines | `git apply --check` at c8ffc41a7 |
|---|---|---|---|---|
| `P-A5-light.patch` | `b1e972b92297b85426c9c9e63f1d53756683c4bb` | 171 | +3090/−1291 | OK |
| `P-A5-geom.patch` | `181caeaf94c4cb24f1d70df5b10a30e7270eb635` | 172 | +3153/−1292 | OK |

Both patches contain F5″ in full: every file F5″ touches is present.

| delta | files | lines |
|---|---|---|
| A5's own work over A4-light | 15 | +184/−52 |
| └ of which `src/` | 9 | +103/−38 |
| geom over light | 9 | +144/−82 |

The split per file is in `A5/numstat/` (`light.txt`, `geom.txt`, `own-over-A4light.txt` with its `.diff.txt`, and `geom-over-light.txt`).

## What was built

**CK-20 and CK-12: the commit light becomes its own envelope row.**

- `ENGAGE_ENVELOPES` gets a new row `commit-light`: attack 60 ms, release 480 ms. The release is four times press-drain's 120 ms. The interface gains a `retarget: "from-current"` field, and every row declares it.
- The tokens are `--engage-commit-light-attack` and `--engage-commit-light-release`, in `motion-registers.css`.
- The seat transitions are gate × charge:
  - the attack legs use `--ease-decelerate`, which is first-order, so a reversed commit retargets from its current value without an overshoot;
  - the release legs use `--ease-standard`.
- The fill-clock `transition-delay` on `.control-bit__light` is deleted. The light's onset now falls inside ACKNOWLEDGE_WINDOW_MS (150).
- The same row now answers the toggle dark's absorption.
- `useEngage` `COMMIT_CLOCKS` names the new clocks.
- In engage.css, AUTH-4 (the PRM authorization block) names the commit-light clocks. Its digest is `140508ec…f771762`. It sits at lines 290–324 in the light build and 327–361 in the geom build, and the BAND-FEEDBACK-MOTION row is amended to match.

**CK-25: the disclosed press.**

- On every disclosed trigger, the press is now the summed ink `calc(var(--fill-hover) * 200%)`, laid over the hover wash `--fill-hover`.
- The control-surface (select) arm inks over `--control-surface-bg-hover` instead.
- The disclosure group-trigger hover becomes a foreground wash.
- On a fine pointer, every press now deepens its hover, and nothing jumps as a slab at the commit instant.

**CK-17: presses move from `:active` to the data-press mark.**

- The selectable Card now uses `usePressMark` on its Surface, plus `.card[role="option"][data-press]` scale.
- The Button's quiet and text emphases use `[data-press]`.
- The Button's gleam stays on `:active`, because the material's `:active` drives its opacity. Moving it to the mark (tried in r1) regressed, so that change was reverted.

**CK-10 (reduce).** The tabs' dark light is held until the indicator lands. The geom build merges A5's rows into its reduce-only light leg.

**Tests.** I added or changed cells in five files: `engage-light-press`, `engageEnvelopes`, `engage-ladder`, `engage-floor` and `engage-door`.

## Gates (both builds, under guarded)

| gate | light | geom |
|---|---|---|
| `npm run build` | exit 0 | exit 0 |
| typecheck | exit 0 | exit 0 |
| `demo:dist:build` | exit 0 | exit 0 |
| vitest `--maxWorkers=2` | 244 files: 2382 passed, 10 expected-fail, 1 skipped | same |

The typecheck has to run after the build, because of the `@mkbabb/glass-ui/fourier-math` self-reference. `A5/gates.sh` runs them in that order.

## H5 battery — totals per engine (pass/fail/unmeasured; load = 1-minute load at the witness start)

The **Chromium** column is the r2 run, 19:48–21:11. The **WebKit** column is the 21:11–21:53 run.

| witness | Chromium light | load | WebKit light | load |
|---|---|---|---|---|
| E-1 | 92/2/2U | 21.2 | 92/4 | 33.2 |
| E-2 | 130/34 (23 DISAGREES) | 17.6 | 140/24 (11 DISAGREES) | 30.2 |
| E-3 | 20/2 | 16.6 | 20/2 | 34.2 |
| E-4 | 14/0/4U | 14.1 | 11/0/8U | 38.6 |
| E-5 | 54/2 | 12.3 | 54/2 | 34.8 |
| E-6 | 4/2/8U | 8.7 | 2/2/8U | 32.5 |
| E-7 | 6/1 | 8.0 | 6/1 | 31.2 |
| E-8 | 19/0 | 7.5 | 19/0 | 30.6 |
| E-9 | 75/3 | 9.0 | 77/1 | 30.3 |
| E-10 | 25/3 | 12.1 | 28/0 | 26.8 |
| E-11 | 2/0/2U | 29.4 | 2/0/2U | 23.1 |
| E-12 | 65/0 | 28.4 | 64/0/1U | 22.1 |

| witness | Chromium geom | load | WebKit geom | load |
|---|---|---|---|---|
| E-1 | 92/2/2U | 21.5 | — (light only) | — |
| E-2 default | 99/65 | 13.2 | 89/75 | 21.3 |
| E-2 arms i,ii,iii | 164/0 | 14.4 | 164/0 | 18.6 |
| E-5 | 54/2 | 16.0 | — | — |
| E-9 | 74/4 | 21.1 | 77/1 | 23.5 |
| E-10 | 12/0/16U | 31.9 | 12/0/16U | 24.8 |
| E-12 | 65/0 | 31.7 | — | — |

The witness logs are in `A5/logs/` and the JSON is in `A5/json/{light,geom,geom-arms}`. The r1 Chromium run is archived in `A5/logs/superseded-r1/`. It was superseded because of the accordion press and the Button gleam regressions, both cured before r2.

## Per CK row

Rows not in this table are not route A's in this pass. They are carried below unchanged.

| CK | reading — Chromium (load) | reading — WebKit (load) | verdict |
|---|---|---|---|
| CK-20 rebound (a commit reversed within the window freezes 0 ms and pulses twice) | E-10 light 25/3 (12.1). Onset +9..+22 ms, peak +46..+68, frozen ≤ 25 ms. The +60 reverse merges into 1 pulse on switch, checkbox and accordion-dark. The dev4 run read 16/16 at load 32. | E-10 light 28/0 (26.8). +60 gives 2 pulses on all 8. Onset +2..+6, peak +50..+53, frozen ≤ 12. ca4-probe rebound PASS (25.2). | WebKit PASS. Chromium FAIL 3/8, not load-attributed (it reproduced at 12.1). See the open gaps. |
| CK-12 onset inside ACKNOWLEDGE_WINDOW_MS | every onset ≤ +22 ms (12.1) | every onset ≤ +6 ms (26.8) | PASS, both engines |
| CK-12 Radio dark keeps its paint | E-2 Radio dark rise 0.026–0.032 (17.6) | E-2 Radio dark PASS (30.2) | PASS |
| CK-12 toggle dark absorption | E-2 toggle dark 0.013–0.0175. E-9 toggle 0.0116–0.0117 (9.0). | E-9 PASS (30.3) | PASS |
| CK-02 light-theme paint rise (Q-5) | E-2 light fails on switch, checkbox, toggle, chip and accordion. Radio light ~0.008, chipaction dark 0.007–0.0099. E-9: switch light 0.0089, chipaction dark 0.0076, accordion light 0.0000. | E-2 11 DISAGREES. E-9: accordion light 0.0000 only. | FAIL. OPEN ON DEFAULT, Q-5 (the trade-off is below). |
| CK-10 tabs' dark light under reduce held until the indicator lands | E-9 tabs 0.0147 in both themes (9.0). Geom E-9 74/4 (21.1). | E-9 77/1, tabs PASS (30.3). Geom 77/1 (23.5). | PASS, read in paint |
| CK-25 disclosed press deepens its hover (ca4-ladder 4/4) | a5-ladder PASS in both builds and both themes for accordion, select (mark) and configurator (mark) (34.9 / 30.7). The accordion deepens by 0.0874 light and 0.0064 dark. CAP 14/0 on each build (ladder cell PASS), 32.3 / 32.8. | a5-ladder PASS in both builds (26.2 / 26.2). Accordion +0.0814 light, +0.0073 dark. CAP 14/0 on each build (27.6 / 32.3). | PASS for the measured triggers. Collapsible and menu are UNMEASURED: the hit test misses. |
| CK-25 no slab at the commit instant | ca4-probe cardpress: first visible press at +50–75 ms on 3/3, where it was +200 (29.4) | cardpress +25 ms on 3/3 (25.2) | PASS |
| CK-17 Card, Button quiet and text on data-press | Units green. E-5 54/2 (12.3): the 2 fails are the Button gleam's sustain (CK-06). | E-5 54/2 (34.8), same cells | The moved members PASS. The gleam is not moved (open gap). |
| CK-06 Button sustain | gleam `::before` opacity NOT LANDED by +200, under H5's new onset rule | same | FAIL, both engines. The Button was not re-read on an a4light build. |
| CK-01 dock latch | E-1 2 fails (21.2) | E-1 (33.2) | D2's row, carried |
| CK-19 Aurora | E-1 ambient engine limit (U) | E-1 1.17 vs 1.13 on 2 cells (33.2) | carried. FAIL on hardware is WebKit's. |
| Sheet PRM press (O-74c G-1) | E-1 fail | E-1 fail | OPEN ON DEFAULT |
| CK-07 (Q-2) | E-6 4/2/8U | E-6 2/2/8U | OPEN ON DEFAULT |
| CK-16 WebKit layout counter | — | carried | carried |
| E-7 GlassDock | 6/1 | 6/1 | D2's, carried |
| Real Safari, every row | — | — | UNMEASURED (owner's safaridriver checkbox) |

## The ruled trade-off (CK-02 vs CK-20)

An early-onset light cannot rise from below over a fill that darkens underneath it. That is the case for the light-theme faces of the switch, checkbox, toggle and chip.

The A4-light after-fill delay passed the Switch and Radio light. It did so by waiting out the fill, and that same wait is why it froze the rebound.

A5 takes the rebound, the onset and the dark absorption, and gives up the light-theme rise on darkening faces. Q-5 is the owner's call on that exchange.

## Owner-glance set (CK-25)

- `A5/glance/frames/`: 864 frames (432 Chromium + 432 WebKit, both builds, fine and coarse pointers).
- Sheets:
  - `A5/glance/light-chromium-fine.png`
  - `A5/glance/light-chromium-coarse.png`
  - `A5/glance/light-webkit-fine.png`
  - `A5/glance/light-webkit-coarse.png`
  - `A5/glance/geom-chromium-fine.png`
  - `A5/glance/geom-chromium-coarse.png`
  - `A5/glance/geom-webkit-fine.png`
  - `A5/glance/geom-webkit-coarse.png`
- Indexes: `A5/glance/light-index.json` and `A5/glance/geom-index.json`.
- CAP was 14/0 on all four (build × engine) captures.

## MIGRATION rows

1. The disclosure group-trigger hover becomes a foreground wash (`--fill-hover`, in place of `--control-surface-bg-hover`). The select arm keeps the control-surface hover.
2. A disclosed press is now `--fill-hover × 200%`: it deepens the hover rather than equalling it.
3. The selectable Card and the Button's quiet and text emphases press on `data-press` (the `usePressMark` door), not `:active`. A consumer that styles `:active` on them must move to `[data-press]`.
4. The commit light runs on `--engage-commit-light-attack` (60 ms) and `--engage-commit-light-release` (480 ms). The fill-clock transition-delay is gone.

## Cost

- Wall time: the Chromium chain took 83 min, the WebKit chain 42 min, and the gates plus dev tuning ran before that (dev-rebound, dev3 and dev4 phases).
- All runs went through `guarded`: one heavy run at a time, and every WebKit run under `--exclusive webkit`.
- Load ranged from 7.5 to 41.9.

## Open gaps

1. **CK-02 (OWNER, Q-5).** The light-theme darkening faces fail the paint rise (the trade-off above). The accordion light reads 0.0000 in both engines.
2. **CK-20 Chromium.** The +60 reverse merges into one pulse on 3 of 8 cells. The run was at load 12.1, so this is not a load artifact. Two notes:
   - Some passing pulse counts include sub-quantum wobble.
   - A candidate cure is first-order release legs, but simulating it lowers the toggle-dark excess to about 0.008, below the floor.
3. **CK-06.** The Button's gleam sustain is NOT LANDED by +200 in both engines. It rides the `--press-t` spring plus the material's `:active`.
4. **CK-17 remainder.** These presses still sit on `:active` and are named here but not moved:
   - the gleam and `material.css`;
   - the sortable-list and dialog-close presses.

   The slider belongs to route E, and the dock triggers to D2.
5. **CK-25.** The collapsible and menu ladders are UNMEASURED, because the probe's hit test misses them.
6. **Carried rows:**
   - CK-01 dock latch (D2);
   - CK-19 Aurora (WebKit, hardware);
   - Sheet (O-74c G-1);
   - CK-16 WebKit layout counter;
   - CK-07 (Q-2);
   - CK-17 on Safari;
   - the phone hold on A alone (route E).
7. **Real Safari:** every row is UNMEASURED (owner's safaridriver checkbox).

## Fences and machine notes

- No tracked source was edited in the checkout. The only writes are under `docs/tranches/BL/design/engagement/`.
- I ran no git operations on the checkout beyond reads and the worktree add/remove.
- The worktrees `.claude/worktrees/bl/D5/p5/A5/{wt,wt-geom}` were removed with `git worktree remove --force` before return. `merge/` and `out/` were deleted, and nothing remains under `.claude/worktrees/bl/D5/p5/A5/`.
- I accidentally launched a second heavy run alongside the first. It was stopped (TaskStop) to keep one heavy run per seat.
- The r1 Chromium battery is archived under `A5/logs/superseded-r1/`. Every reading above is from r2.
- I left no browsers, servers or waiters running. The seat's background waiters were stopped at return.
- I did not read or run anything in value.js or the other siblings.
