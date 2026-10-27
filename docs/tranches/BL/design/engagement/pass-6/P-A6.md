# D5 · pass 6 · P-A6: route A's part on arm (ii) (REGISTRY §P5-8.1, O-103d)

Seat model: claude-opus-5-5. Base HEAD c875a262f. One build, one patch. The commit is the geometric pop, and under reduced motion it is an instant state change. The after-fill light is retired as the commit's form, with no alias.

## The patch

| file | sha1 (shasum) | applies |
|---|---|---|
| `pass-6/P-A6.patch` | `2464bf183429c7d9d37e5e0b7fe08435ec04f731` | `git apply --check` clean on an archived HEAD tree (c875a262f), re-checked at write time |
| contains `pass-6/F5ppp.patch` | `24cec509c4af4426cbb9af439ef31e7242ed951d` | F5‴ in full |
| commit form from `pass-5/P-A5-geom.patch` | `181caeaf94c4cb24f1d70df5b10a30e7270eb635` | the geometric pop |

**Cost.** The whole patch, F5‴ included, is 180 files, +3244/−1352 (src: 141 files, +2239/−1141). A6's own share, measured over the F5‴+geom tree (`A6/numstat-a6-over-geom.txt`), is 35 files, +439/−408. That splits into src 25 files, +280/−272, tests 9 files, +155/−108, and the BAND-FEEDBACK-MOTION AUTH-4 retirement, +4/−28. `engage.css` alone shrinks by 113 lines (+19/−132).

**What A6 changes on top of F5‴ + geom**
- **Commit light retired (O-103d (1)).** The `commit-light` envelope row and EngageRole member, `--engage-commit-light-*`, `--rung-light`, the seat, isolation and forced-colours seat block, and the reduce light leg are all gone. So are the light spans and `data-engage-face`/`data-engage-light` on Switch, Checkbox, RadioGroupItem and SegmentedTabs, and the segmented light rules. AUTH-4 in `docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md` is retired with one amendment note. The PRM leg is now `@media (prefers-reduced-motion: reduce) { :where(.engage-chosen, .engage-pressed, .engage-disclosed) { transform: none } }` on top of the a11y-overrides instant fallback. Each face shows the commit through its own state (thumb, mark, dot, tab, chip, region).
- **CK-21 one loud read.** `useEngage.readInputs` derives every clock it reads from `ENGAGE_ENVELOPES` (`--engage-<role>-{attack,release}`), with no hand-kept list. On popping doors it also reads `--rung-crest > 1`, `--spring-panel-duration` and `--spring-panel`. The read runs on the arming frame and on data-state edges. `commit:"call"` doors read on the first rAF after mount and on every `commit()`. Hold-only doors read nothing.
- **press.ts.** `listen()` binds through `watch(host, bind, { flush: "post" })`. The mark follows late or replaced hosts and unbinds on unmount.
- **CK-06/17: presses on the mark.** The Button gleam reads `.button.glass-specular-track[data-press]::before` (it replaces the `:active` press-t LERP). Non-dock `material.css` `:active::before` rules move to `[data-press]::before`. Sortable item and handle carry `usePressMark`, with `[data-press]` styles. The dialog and sheet close buttons carry `usePressMark`, with `:where([data-slot="dialog-close"])[data-press]::before`. The sheet grip shows full ink on `[data-dragging]`, because pointer capture lifted the handle's mark, so the handle mark was dropped. Dock `:active` lines in `material.css` stay (D2's fence).
- **CK-11/14/27.** The Configurator preset chip drops `glass-capsule-hover`. The capsule lift and snap stay. Their one composer is the dock's `DockControl`, which belongs to D2.
- **CK-10.** DialogContent mounts with `respectReducedMotion: false`, so the presented plate fades under reduce, while the spatial leg is `scale: 1` under reduce.
- **CK-25.** Under `[data-press]` the Switch thumb takes a `--fill-selected` foreground mix, on the `press-drain` clock.
- **CK-19 (engagement leg only).** Aurora's root forwards `pointermove` (normalized 0..1) to `api.setCursor` and calls `clearCursor` on `pointerleave`.
- **Tests updated.** engageEnvelopes, engage-door (table-derived clocks, crest), engage-floor (AUTH-4 retired), engage-ladder (PRM instant, no light), engage-light-press (the `[data-press]` rows; no `:active` outside the dock; no commit light), Configurator.material, dialog-close-contrast, dialog-room.

## Gates (worktree, through guarded)

| gate | result | load at end |
|---|---|---|
| build (`logs/gate-build.log`) | exit 0 | 23.6 |
| typecheck, vue-tsc ×2 (`gate-typecheck.log`) | exit 0 | 22.8 |
| demo dist (`gate-demo-dist.log`) | exit 0 | 23.0 |
| vitest, `--maxWorkers=2` (`gate-vitest.log`) | 245 files; 2391 pass, 10 expected-fail, 1 skip; exit 0 | 27.4 |

The battery ran against patch 2464bf18 (`logs/chain-chromium.log` header). No source changed after 16:13; the patch was cut at 16:16, and the chain started at 16:17.

## H6 battery, both engines (harness app, build `a6`)

Loads are 1/5/15-minute load averages at start → end. WebKit is Playwright WebKit, not Safari. Real-Safari cells: **UNMEASURED (owner's safaridriver checkbox)**, read against this WebKit run of record per O-103d (3). WebKit ran in one `--exclusive webkit` acquisition, admitted 17:11:58 after about 26 minutes queued and released 17:43:03. A second short acquisition (17:44–17:45) re-ran the PRM probe after a fix to the probe's own clip.

| witness | Chromium (pass/fail/unmeasured; load) | WebKit (load) |
|---|---|---|
| E-1 | 93/1/2 · 28.1→25.6 | 93/3/0 · 22.8→29.9 |
| E-2 | 164/0/0 · 24.6→14.2 | 164/0/0 · 29.9→29.8 |
| E-3 | 20/2/0 · 14.0→15.9 | 20/2/0 · 29.8→27.3 |
| E-4 | 18/0/0 · 17.5→21.1 | 15/0/4 · 27.3→25.0 |
| E-5 | 56/0/0 · 21.8→19.8 | 56/0/0 · 25.0→20.0 |
| E-6 | 4/2/8 · 18.6→18.5 | 2/2/8 · 20.0→19.3 |
| E-7 | 6/1/0 · 17.1→20.1 | 6/1/0 · 18.9→18.8 |
| E-8 | 19/0/0 · 20.6→22.1 | 19/0/0 · 18.8→31.0 |
| E-9 | 64/18/0 · 22.3→16.4 | 64/18/0 · 31.0→20.7 |
| E-10 | 22/0/17 · 16.0→13.8 | 22/0/17 · 22.1→22.3 |
| E-11 | 6/0/2 · 13.0→23.0 | 6/0/2 · 22.3→16.0 |
| E-12 | 100/2/0 · 22.4→23.9 | 99/2/1 · 16.0→16.6 |
| CAP | exit 0 · glance `a6-chromium-{fine,coarse}.png` | 18/0/0 · 20.7→28.1 · `a6-webkit-{fine,coarse}.png` |
| A6 probe PRM (r2) | 23/0/0, 4 stateless REPORT · 27.3→ | 23/0/0 · 23.3→29.2 |

**What each fail is (identical in both engines unless noted)**
- E-1 adoption latch (`dock` not rendered) → D2. E-1 runtime ambient → CK-19, below.
- E-3 slider phone touch-held (×1.000 against ×1.03) → E's coarse-arm fact; outside this seat's route.
- E-6 s6 present (0 infinite animations) → CK-07 S6 RETIRE (O-103d Q-2).
- E-7 `data-held` writers (`GlassDock.vue` + `useEngage.ts`) → D2.
- E-9: 18 `commit-light` cells. They test the retired form (a transient light under reduce). O-103d (1) supersedes them. H7 re-points them to the instant-state reading, which this seat's probe measures (below).
- E-12 `select press fine`:
  - Chromium ×0.9978/×0.9977 (bound 0.002). The select opens on pointerdown, so the read sees the pop's rebound, not a press rung.
  - WebKit: NOT DRIVEN. The trigger is neither `:active` nor marked by a door while held 250 ms.
  - This is a harness and agglomeration item: the select's press drive is not this route's.

## Per CK row

| CK | reading | Chromium | WebKit |
|---|---|---|---|
| CK-02 PRM per face kind | Under reduce: scale range 0.0000, 0 frames in flight. Legible through the face's own state: switch 50–70 %, checkbox 64 %, radio 72–78 %, tabs 26–89 %, toggle 80 % of face pixels changed ≥ 16 levels. Accordion region 0 → 37.8 px with 0 frames in flight. chip and button are stateless REPORT. Every Shift control reads not-legible. | PASS 23/0 (`probe-a6-chromium-prm.log`, load 27.3) | PASS 23/0 (`probe-a6-webkit-prm.log`, load 23.3→29.2) |
| CK-10 four faces + toggle under reduce; presented fade | E-5 toggle and press_switch press-light (PRM) PASS. E-9 presented fade (PRM) open and close fade on 16–23 frames (bound ≥ 2). The four faces' PRM legibility is in the CK-02 row. | PASS (load 22.3→16.4) | PASS (load 31.0→20.7) |
| CK-12 commit light | Retired, no release reason needed: no envelope row, seat or authorization carries a commit light (AUTH-4 amended out). E-11 enumerates 4 `--engage-*` clocks, none of them a commit light. | PASS | PASS |
| CK-21 one loud read | A table-derived read over every `--engage-*` clock, plus crest and panel spring. E-11 "nonsense on `<html>`" cells PASS for all four enumerated clocks; units in engage-door. | 6/0/2 | 6/0/2 |
| CK-11/14/27 capsule | E-12 "0 composer directories of `.glass-capsule-hover` outside dock/". The capsule button carries the door's mark (×1.0327); coarse tap at rest ×1.000. **D2 must:** retire or own `.glass-capsule-hover` lift/snap on `DockControl`. | PASS | PASS |
| CK-06/17 presses on the mark | E-12 button, sortable and chip fc-reach PASS; engage-light-press unit rows: no `:active` press outside the dock, Button gleam on `[data-press]`. **D2's remainder (CK-17 O-103 reading):** the dock `:active` lines in `material.css`, `GlassDock` `data-held`, and the dock latch. | PASS (fails are D2 rows) | PASS (same) |
| CK-20 reverse at +60 | Pops in 900 ms: **1** at +60 in every run, both engines (2 at +200, as expected). State returns and rests at ×1.0000. The seat's stricter read (no one-frame step more than 0.002 above the single pop's largest) failed on 2–3 of 16 Chromium reverse cells in each of three runs (loads 22.9, 39.5, 33.8): steps 0.0094–0.0134 against 0.0071–0.0084. WebKit: 0 of 16. **The step bound is a seat-added read with its cause not measured. It reproduces, so it is not a load-only artefact; it is recorded as open.** | 1 pop PASS; step read FAIL 2–3/16 (`probe-a6-chromium-r1.log`, `-reverse-r2`, `-reverse-r3`) | 1 pop PASS; step read 16/16 PASS (`probe-a6-webkit-r1.log`) |
| CK-19 ambient answers the pointer | Engagement leg wired (Aurora pointermove → setCursor). Measured only on a GPU substrate: under headless Chromium the Aurora resolves its `css` substrate, so the read is UNMEASURED there. Named witness `--gpu metal` (`gpu-a6-chromium-E-1.log`) and WebKit: moved 1.71 / 1.74 levels against 1.22 / 1.25 drift. That is above 0.5 but **not** ≥ 2× drift → FAIL. Under PRM, 0.00 → FAIL. **D3 must know:** the swirl response is too weak (amplitude/radius 0.25, ceiling 0.8) to read at 2× drift, and `setPointer` early-outs under PRM, so a PRM press-light needs its own leg. Real hardware in both engines: UNMEASURED. | FAIL (metal witness, load 20.0) · headless UNMEASURED | FAIL (load 29.9) |
| CK-25 coarse Switch press visible | The press darkens the thumb (glance row "chosen switch", pressed column). Rest → pressed: 4.3 % / 4.1 % of the frame's pixels changed ≥ 16 levels (light/dark), against pass-5's 2.7 % / 2.5 % (`logs/coarse-switch-press-pixels.log`). E-5 press_switch press and sustain PASS. | 4.3 / 4.1 % | 4.2 / 4.1 % |

Owner-glance set: `pass-6/A6/glance/a6-{chromium,webkit}-{fine,coarse}.png`, `a6-index.json`, `frames/` (358 frames).

## Notes for siblings
- **D2:** dock `.glass-capsule-hover` lift and snap; dock `:active` presses in `material.css`; `GlassDock` `data-held` writer; the dock adoption latch (E-1).
- **D3:** the ambient pointer leg exists. Amplitude and the PRM path are D3's (CK-19 row).
- **H7:** re-point the 18 E-9 `commit-light` cells to O-103d (1)'s instant-state form (the probe's PRM cell is a ready shape). The E-12 select press cell needs a drive that does not open the select (Chromium) and that drives at all (WebKit).

## Open gaps
1. CK-20 seat step bound: 2–3/16 Chromium reverse cells reproducibly exceed the single pop's largest step by more than 0.002. The cause is not measured. The pop count (1 at +60) passes.
2. CK-19: ambient response below 2× drift on both engines, 0 under PRM; real hardware UNMEASURED. D3's to finish.
3. Real Safari: UNMEASURED (owner's safaridriver checkbox) on every row.
4. E-9 commit-light cells and the E-12 select press cell await H7's re-point (above).
5. E-3 phone touch-held and E-6 s6 are outside this route (E's arm; CK-07 S6 RETIRE).

## Process record
- One early `npx tsc --noEmit` ran outside `guarded` (a fence slip, light). Every later build, test and browser run went through `guarded`; browsers ran headless; WebKit only under `--exclusive webkit`.
- A first battery against a stale build was stopped when source changed. Its logs are kept in `A6/logs/superseded-r1/`.
- The first probe round (`probe-a6-*-r1.log`) read the accordion legibility on the trigger and took the after-shot on its own box. WebKit printed NaN for toggle (box size changed) and read the dark accordion region late. The probe now takes both shots on one box and reads the region before the key and after the settle. The re-run is r2.
- An `rm -rf` of `glance/frames` was denied by permissions and not retried. Frames from the run of record overwrite by name.
- Worktree `.claude/worktrees/bl/D5/p6/A6/wt` removed with `git worktree remove --force` at return.
