# 11.1.1 fix seat 2 (before critic 2)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`a301f2e0c` (critique 1). Every orchestrator note in this directory was read and followed where
this seat built; where it did not build, it says so below. Runs: `fix-2/run.sh <branch|red>
<project> <log> [grep] [spec]` (a red run copies the 11.1.1 specs, config and harnesses into
seat A's v11.1.0 tree at `.cache/red-v11.1.0/tree`), chained by `fix-2/chain{1..5}.sh`;
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
| 2 | 3eea4ae8d | `.bundle-ratchet` 3035791 to 3051880, after the last source commit |

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
| exit · a Popover leaves on opacity and its slide alone (defect 8) | R/G | R/G | R/G | R/G |
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

## Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | 1 before the rebind (3051880 > 3035791), 0 after 3eea4ae8d |

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

## Not done here

- **Row 8 (reduced motion is a fade) and row 13 (a), the run mark under reduced motion: not
  built.** Defect 1 is cured for rows 10, 12 and the reachable half of 13, not for row 8. What the
  first of row 8's four commits needs, from this seat's reading: the blanket rule
  (`utilities/a11y-overrides.css`) becomes a zero-specificity normal declaration in a layer after
  `components`; glass's own `!important` carves in `components` still win over it, but every glass
  rule in the `utilities` layer (about 70 `@utility` blocks, `scale-on-hover`'s `transition` among
  them) and the Tailwind duration classes in eleven templates (Progress, Skeleton, PagerDots,
  Aurora, EasingCurve) would then run their motion under reduced motion, so each needs a carve or a
  reading before the rule moves. Commits 2 to 4 (`useSpringMount`'s fade, the dock fold's
  cross-fade, then the run mark) follow the note. When row 8 lands it changes `src`, so the
  bundle ratchet is rebound again after it.
- The 11.0.x and 11.1.0 release specs were not re-run by this seat (critique 1 ran them on
  `64be9e776`). This seat's source changes since then are the reveal's closed state, the leave
  event's lookup, the tabs' bar corner, the toggle weight and the hover lift; critic 2 should
  re-run them.
- No frame-cost claim is made, so no GPU-lane renderer string is recorded.
- No tag, no push, no publish.
