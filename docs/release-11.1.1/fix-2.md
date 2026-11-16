# 11.1.1 fix seat 2 (before critic 2)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`a301f2e0c` (critique 1). Every orchestrator note in this directory was read and followed where
this seat built; where it did not build, it says so below. Runs: `fix-2/run.sh <branch|red>
<project> <log> [grep] [spec]` (a red run copies the 11.1.1 specs, config and harnesses into
seat A's v11.1.0 tree at `.cache/red-v11.1.0/tree`), chained by `fix-2/chain{1..6}.sh`;
per-cell verdicts by `fix-2/summ.py`. Every run went through `guarded`, WebKit under
`--exclusive webkit`. **The guard refused nothing**; no WebKit lock wait passed a minute.

Cells: chromium-phone (390 × 844, touch), chromium-desktop (1440 × 900), webkit-phone and
webkit-desktop (Playwright WebKit 2287). R/G = RED on v11.1.0 and GREEN on the branch.

## Commits

| defect | commit | what |
|---|---|---|
| 1, row 10 (b) | b202364c9 | `scale-on-hover` lifts only under `(hover: hover)` (`utilities/btn.css`) |
| 1, row 10 (a) | cc13da049 | `ToggleGroupItem` keeps weight 500 when selected (`toggle-group/styles.css`) |
| 1, row 12 | 2d663038d | the bar-shaped SegmentedTabs strip takes `max(--radius-bar, --control-floor / 2)` |
| 3, row 11 | 51db58901 | `leave-finished` finds its content in the component's own root, then the document, and listens for reka's `after-leave` on the root the content lives in |
| 8 | d233aa400 | the reveal's closed state is `scale: 1 1; filter: blur(0)`: the exit is opacity and the side's slide |
| 4 | f3b39b602 | the reversal judge asserts where the surface turned is short of the end it was heading for; the Toast's dismiss is pressed where it stands |
| 5 | 9ffcdb016 | a Dialog's or Sheet's exit is held within 0.06 of the exit curve (floating surfaces stay at 0.12) |
| 7 | e407e72d8 | the two row-9 cells that held on v11.1.0 are named no-regression reads |
| 6 | 751347606 | standing routes added: plain Select (pick, outside, Escape), Popover by focus leaving, Tooltip by its trigger, a Toast by its timeout, top and left Sheets (close, outside, Escape) |
| 9 | 6e5db70d8 | `gate:exits` is `release-11-1-1/gate.sh`: each project in three parts, one Playwright process each, WebKit under `guarded --exclusive webkit` when the guard is present |
| 10 | 28cb3819e | CHANGELOG 11.1.1 rewritten where critique 1 found it untrue or short; README's shadow-root sentence made exact |
| 2 | 3eea4ae8d | `.bundle-ratchet` 3035791 to 3051880 (made before the after-critique note was read) |
| note 1 | 13573d28b | the overlay register's scale, squish and blur knobs are neutral, so a Popover and a hover card enter and leave on opacity and the 8 px slide; the tooltip register keeps its own entrance squish |
| note 3 | 700a7179c | every cell's navigation goes through `gotoReady`: a timeout is retried once after the server answers `/`, and a server that does not answer fails the cell by name |
| note 1 | 05d45d5df, fd4927abe | the dissolve recipe's comment and the CHANGELOG clause follow the entrance change |
| 2, note 6 | 64e3813ea | `.bundle-ratchet` 3051880 to 3051822, after the last source commit (superseded: row 8 followed) |
| 1, row 8 (1) | faf12109d | the reduced-motion fallback is a normal rule in a last layer, `reduced-motion` (`a11y-overrides.css`, `index.css`); the reveal's and ExpandableContainer's reduced-motion clocks are restated `!important`; the reduce spec, its harness and the gate's fourth part |
| 1, row 8 (2) | 5d1467b77 | every carve at most `--duration-fast` on `--exit-curve` (`min()` with the register's exit clock); a closing side-anchored reveal keeps its place; the Toast's dissolve held to 200 ms; the disclosure fades at full size; the authorized-set register's AUTH-3 digest and three new rows |
| 1, row 8 (3) | 9f9719c76 | `useSpringMount` tweens the position in and out under reduced motion (the clock held to 200 ms); DialogContent keeps scale 1, SheetContent keeps its place and binds opacity, except while dragging |
| 1, row 8 (4) | 6231b371e | the dock's faces cross-fade under reduced motion (`dock/styles/layers.css`), the box landing at once |
| 1, row 13 (a) | 7627fd4da | under reduced motion the run's mark is not drawn and the current seat paints the plate, cross-fading on a change (`dock/styles/run.css`); no dock script changed |
| row 11 under reduce | 56c7214a4 | the reduce fade cells read the leave event: once, at or after the fade's last seen frame |
| — | dc296a2d4, d85c637d0 | an anchor-relative box reading, tried and reverted (it excused nothing, below); the judge attaches its stepped frames |
| 2, note 6 | c95d154dd | `.bundle-ratchet` 3051822 to 3054190 (+2,368 B), once, after the last source commit (7627fd4da) |
| 10 | cdf47939b | CHANGELOG: "Reduced motion is a fade" (with the `reduced-motion` layer and what it lets a site do), the run's plate under Fixed, the dialog's size |

**The after-critique note** (`orchestrator-note-after-critique-1.md`, 02:45) reached this seat after
its first eleven commits and its first record. Its rulings are met as follows: 1, ruled and built
(13573d28b), the witness reads entrance and exit; 2, the CHANGELOG states only the exit and the
reversal as new for ExpandableContainer; 3, each project and part is its own process with its own
server start (`gate.sh`) and a navigation retries once after a health check (700a7179c); 4, the
disclosure and Sheet witnesses bite (below), but the Sheet's exit is **not** honestly green on
v11.1.0: it strays 0.093 to 0.112 from the exit curve, so the cell is a witness, not a
no-regression read, and the CHANGELOG keeps its clause; 5, rows 10 and 12 built, row 13 (b) read
and left, **row 8 and row 13 (a) not built**; 6, the ratchet was rebound twice, because ruling 1
added a source commit after the first rebind: the second rebind (64e3813ea) is the one after the
last source commit; 7, the lookup starts at the surface's own root node (`getRootNode()` of the
component's mounted node) and falls back to the document only for content its portal sent to the
document's body, which a shadow root's query cannot see; the shadow witness is green.

## Witnesses

### Row 12, row 10 (`release-11-1-1-controls.spec.ts`, `controls-harness`)

| cell | chromium-phone | chromium-desktop | webkit-phone | webkit-desktop |
|---|---|---|---|---|
| round · compact strip | G/G (no regression) | skip (touch claim) | G/G | skip |
| round · wide strip | **R/G** | skip | **R/G** | skip |
| weight · word-labelled ToggleGroupItem | **R/G** | **R/G** | **R/G** | **R/G** |
| lift · scale-on-hover after a tap | **R/G** | skip | **R/G** | skip |

- Row 12's cause: the strip is a bar past 20rem (`useBarShape`), and the bar rule set the corner
  to `--radius-bar` (12 px) without the touch floor's half that the stadium arm takes. v11.1.0 at
  390 touch: strip 50 px with 15 px corners, tabs and plate 44 px with 12 px. Branch: 25 and 22.
  The compact strip already kept round ends, which is why fourier's tabs did. **50 px is
  intended**: the 44 px floor binds the tab (the target) and the strip carries its 3 px trim on
  each side.
- The weight cell first passed on v11.1.0 in Chromium (an item at its 44/60 px minimum width does
  not widen, and the harness font drew 500 and 600 alike); it now selects a content-width item in
  `system-ui` and asserts the item is `on` before it reads (logs `weight-{red,green}-*`).

### Row 11 in a shadow root and on its other surfaces (`leave-harness`)

| cell | ch-phone | ch-desktop | wk-phone | wk-desktop |
|---|---|---|---|---|
| a Popover inside a shadow root says so to its host | R/G | R/G | R/G | R/G |
| a ContextMenu says once, by Escape / by pick | skip (long press) | R/G, R/G | skip | R/G, R/G |
| a hover card says once | skip | R/G | skip | R/G |
| a Dialog unmounted mid-exit says so once, at the unmount | R/G | R/G | R/G | R/G |

Each asserts one event of its kind, bubbling and composed, at or after the last frame the
surface was seen (the unmount: within 50 ms of the cut, against about 140 ms of exit left), and
the Vue emit once. Logs `leave-{red,green}-*`. v11.1.0 has no event, so every cell is RED there;
the shadow cell's failure on the pre-fix tip is critique 1's probe (`critic-1/logs/probe-shadow.log`).

### The spec on the branch, by gate part, and v11.1.0's exit and reversal cells

Branch, every project, each part its own process (logs `tip{A,B,C}-*`; chromium-phone re-read as
`tip{A,B}2` after the reversal and curve witnesses changed mid-chain): **every cell GREEN in every
project**, skips as stated in the spec. Part C (standing, 32 to 47 cells a project) ran in WebKit in
its own process in both forms with no `page.goto` hang.

v11.1.0 (`red{A,B}-*`, chromium-phone as `red{A,B}2`):

| cell | ch-phone | ch-desktop | wk-phone | wk-desktop |
|---|---|---|---|---|
| exit · Sheet right / Sheet bottom (defect 5) | R/G, R/G | R/G, R/G | R/G, R/G | R/G, R/G |
| exit · a Popover enters and leaves on opacity and its slide alone (defect 8, note 1; `plain-*`) | R/G | R/G | R/G | R/G |
| exit · a Tooltip leaves on opacity and its slide alone | skip | R/G | skip | R/G |
| reverse · Collapsible both ways, Accordion both ways (defect 4) | R/G ×4 | R/G ×4 | R/G ×4 | R/G ×4 |
| reverse · DropdownMenu reopened while it closes | G/G | G/G | G/G | G/G |
| reverse · Toast closed while it opens | R/G | R/G | R/G | G/G |
| every other exit and reverse cell | R/G | R/G | R/G | R/G |

- Defect 4: WebKit's disclosure cells now bite in all eight (critique 1: five of eight passed on
  v11.1.0). The judge reads where the surface turned (its furthest point toward the end it was
  heading for); v11.1.0's Collapsible touches 1.000 or 0 there, the branch turns short of it (0.36 to 0.47 on the reopen at 390 in Chromium).
  A first form (no sample strays back past the turn by more than 0.06) failed on the branch: touch
  input lands two to four frames after the mark, and the surface rightly keeps moving until then.
- **Not cured, recorded:** `reverse · a DropdownMenu reopened while it closes` stays green on
  v11.1.0 in all four cells. v11.1.0's film there turns short of its end (0.351, 0.227, 0.235, 0.254
  … at 1440 in Chromium) with one 0.12 step in 10 ms; it does not jump to an end, so the cell
  cannot call it a jump, and this seat found no bound that splits the trees without inventing one.
  The Toast's closed-while-opening reads green on v11.1.0 at 1440 in WebKit for the same reason.
- Defect 5: v11.1.0's Sheets stray 0.093 to 0.112 from the exit curve (ease-out); the branch's
  Dialog and Sheets 0.006 to 0.046. A single bound of 0.07 for every surface broke the phone
  Select (0.073 to 0.079, its fade rides a 40 ms hold and a slide) and WebKit's tooltip (0.074),
  so the script-driven pair has its own bound.
- Defect 7: the two cells remain, named in the spec as no-regression reads; the CHANGELOG no
  longer presents Escape from the first frame as a change.

### Standing routes added (defect 6)

GREEN on the branch in every project where they run (`tipC-*`): plain Select by pick, outside and
Escape; Popover by focus leaving (Tab); Tooltip by a press on its trigger (desktop); a brief Toast
by its timeout; Sheet top and Sheet left by close, outside and Escape. WebKit at 390 skips the
outside routes as before. Standing gates hold a bound on the branch; they owe no RED.

**Still not driven** (open for critic 2): a route change or unmount with the close; the
DropdownMenu submenu; ContextMenu and hover card in the standing cell (the leave cells now open
them); the Select in a collapsible dock and a Popover in a dock; the detented Sheet's close button
and drag; the Toast's swipe; the dock's own fold.

### Row 13 (b): does not reproduce on glass's demo

`fix-2/ro-probe.spec.ts` (kept out of the suite): WebKit 2287 at 1440 light, `/` and
`/dock/overview`, load, wait 5 s, scroll the page in 700 px steps, listen for a ResizeObserver
loop error. Two readings per tree, both trees: no error (`logs/ro-{red,green}-webkit-desktop-*`).
Per the scope, it is left for 11.1.2 with Gregg's `p44s-ro-probe.mjs` as the witness; no code was
changed for it.

### Row 8 and row 13 (a): reduced motion is a fade (`release-11-1-1-reduce.spec.ts`, `reduce-harness`)

Resumed 2026-11-16 14:00 after a usage-limit stop; the record above is the earlier attempt's,
kept. Every cell emulates `prefers-reduced-motion: reduce`. A fade leg passes when it spans at
least two frames between its ends (2 % from each), its opacity is monotone, no painted frame
holds a box (x, y, w, h within 1.5 px) other than an end's, and it runs within 200 ms plus one
frame from the first frame that leaves its start (0.5 %) to the first that reaches its end. A
surface with a leave event says it once, at or after the fade's last seen frame.

| cell | ch-phone | ch-desktop | wk-phone | wk-desktop |
|---|---|---|---|---|
| site · a site's own `transition: opacity 144ms`, unlayered, keeps its clock | R/G | R/G | R/G | R/G |
| fade · Popover, DropdownMenu, dock Select, plain Select | R/G ×4 | R/G ×4 | R/G ×4 | R/G, R/G, **R/R**, R/G |
| fade · Tooltip | skip | R/G | skip | R/G |
| fade · Dialog, Sheet right, Sheet bottom | R/G ×3 | R/G ×3 | R/G ×3 | R/G ×3 |
| fade · Toast, Collapsible, Accordion, ExpandableContainer | R/G ×4 | R/G ×4 | R/G ×4 | R/G ×4 |
| fold · a dock unfolds (press) and folds (press outside), faces cross-fading | R/G | R/G | R/G | R/G |
| mark · a run's plate moves to a new seat by a cross-fade (row 13 a) | R/G | R/G | R/G | R/G |

Logs `reduce-red-*` (v11.1.0) and `reduce-green-*` (the tip at 56c7214a4), re-read on the tip
as `reduce2-green-*`. Every RED fails on the row's own claim, not on the leave event: the site's
clock reads `0s`; each surface's entrance spans no frame between its ends (it appears in one
frame); the fold's faces swap in one frame; the run's mark travels 140 to 156 px between two
frames. On the branch the fades run 158 to 204 ms; the run's two seat plates cross-fade over
about 192 ms and the mark is not drawn.

**Open, not cured: the dock Select's first frame in WebKit at 1440.** In 8 of 8 readings
(`reduce-green-webkit-desktop`, `dsel-green-{1,2,3}`, `dsel2-green-{1,2,3}`,
`reduce2-green-webkit-desktop`) the entrance's first one or two painted frames (opacity 0.03 to
0.17, 60 to 80 ms after the press) sit at (681, 65), then the plate rests at (679, 66), the
same size. Chromium, WebKit at 390 and every other anchored surface do not show it.
`fix-2/dselprobe.spec.ts` (kept out of the suite) reads it after a mouse press and not when the
Select is opened by keyboard (`logs/dselprobe2-webkit-desktop.log`); without reduced motion the
first painted frame is already at rest. The likeliest cause, unproven: reka's Select opens on
pointerdown and its popper places the plate against the trigger's pressed box, which under
reduced motion takes its press scale at once, then re-places it a frame later. An
anchor-relative reading (dc296a2d4) did not excuse it, since by those frames the trigger's box
is at rest, and was reverted (d85c637d0). The witness is left strict and RED in that one cell,
for critic 2: the gate's fourth part fails there until it is cured or ruled.

**Not covered under reduced motion:** a drag-dismissed Sheet (its release still snaps, as on
11.1.0, and now its place returns to rest as it vanishes), the detented Sheet (its own engine),
ContextMenu and the hover card (the Popover's reveal carve, read by no reduce cell), and
`DockCrossfade`'s face swaps (`crossfade.css`, still a snap).

## Open gap A: the DPR 3 phone plate on the GPU lane

`fix-2/gpu-clipcheck.mjs` (critic 1's clipcheck with Chromium launched `--headless=new
--use-angle=metal --enable-gpu --ignore-gpu-blocklist`, the shipped plate only): renderer
**`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`**, Chromium
149.0.7827.55. At DPR 3 and DPR 1, light and dark, the dock Select's sheet and the dock menu read
0 % hard stripe edges in all nine cells of each plate (`logs/gpu-clipcheck.json`, `shots/`). The
partial blur is a software-rasteriser artefact, not a defect of row 2.

## Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 (and again after note 1) |
| `npm run build` | 0 |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped (both times) |
| `npm run verify:package` | 1 before the rebind (3051880 > 3035791), 0 after 3eea4ae8d; after note 1's source commits 1 (3051822 < 3051880, a shrink), 0 after 64e3813ea |

After row 8 and row 13 (a), on the committed tree (logs `*-3`, `build-4`, `verify-package-5/6`):
`npm run typecheck` 0; `npm run build` 0; `npm run verify:package` 1 before the rebind
(3054190 > 3051822), 0 after c95d154dd; `npm run demo:dist:build` 0; `CI=true npx vitest run
--maxWorkers=2` 0, 285 files, 2,600 passed, 10 expected fail, 1 skipped. The guard refused
nothing; no WebKit lock wait passed a minute.

`scripts/release.sh` is unchanged; it runs `gate:exits`, now `gate.sh`. This seat ran the gate's
three parts through `run.sh` with the same greps, not `gate.sh` whole (about an hour of WebKit).

## Sizes (the dock-size note)

`critic-1/closure.mjs` (an entry's static import closure, gzip level 9) on `dist` built from
`git archive` trees (v11.0.2 with v11.1.0's install; the dependency manifests are equal):

| entry | v11.0.2 | v11.1.0 | branch |
|---|---|---|---|
| dock | 38,673 | 40,541 | 40,541 |
| dialog | | 12,508 | 14,395 |
| select | | 8,453 | 9,517 |
| popover | | 8,663 | 9,385 |
| tooltip | | 5,897 | 6,607 |
| menu | | 11,865 | 12,555 |

The dock's closure is byte-for-byte unchanged: Select and DropdownMenu content are not in it. The
CHANGELOG states both lines. Logs `sizes-*.txt`.

Re-measured after row 8 and row 13 (a) (`sizes-tip-3.txt`, the tip's `dist`; `sizes-v11.0.2-2.txt`,
`sizes-v11.1.0-2.txt`): **dock 38,673 (v11.0.2), 40,541 (v11.1.0), 40,541 (tip)**, unchanged,
since the run mark and the fold cures are stylesheet rules and no dock script changed; dialog
14,395 to 14,494 (the reduced-motion fade in `useSpringMount` and its two hosts); the other four
entries unchanged. The CHANGELOG's dialog figure follows. The v11.0.2 comparison tree
(`.cache/v11.0.2`, 6.3 GB) was deleted once its number was re-read (logged in `runs.out`).

## Not done here

- Row 8 and row 13 (a) are built (above), with one cell RED on the branch: the dock Select's
  first frame in WebKit at 1440 under reduced motion. The gate's fourth part, `(site|fade|fold|mark)`,
  was run through `run.sh` per project, not through `gate.sh` whole.
- The `reduced-motion` layer leaves glass's own motion stilled as before, since every glass rule
  is layered (stylesheets and SFC blocks alike, read by grep); what it newly lets through is a
  site's unlayered or `!important` rule and an inline style. The only inline transitions glass
  writes are `transition: none` (DialogContent, SheetContent).
- After note 1, the overlay register's cells were re-read on the branch in every project
  (`plain-green-*`: exit, reverse, leave and standing for the Popover, the hover card and the
  Toast, all green); the whole gate was then run as `release.sh` runs it (`logs/gate.log`).
- The 11.0.x and 11.1.0 release specs were not re-run by this seat (critique 1 ran them on
  `64be9e776`). This seat's source changes since then are the reveal's closed state, the leave
  event's lookup, the tabs' bar corner, the toggle weight and the hover lift; critic 2 should
  re-run them.
- No frame-cost claim is made, so no GPU-lane renderer string is recorded.
- No tag, no push, no publish.
