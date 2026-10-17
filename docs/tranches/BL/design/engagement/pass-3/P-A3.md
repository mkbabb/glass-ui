# D5 pass 3 · P-A3 · the declared register on F5′ (§P2-8.1)

| field | value |
|---|---|
| seat | D5 pass 3, **P-A3 PROTOTYPE** (route A, the declared register), per `../REGISTRY.md` §P2-8.1 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD + `pass-3/F5p.patch`. Cut at `91728a094`; HEAD is now `89aab527f`. Every commit from F5′'s `eb98de1b0` to `89aab527f` touches `docs/` only (`git diff --stat 91728a094 HEAD -- src tests package.json demo vite.config.ts` is empty), so F5′ and both patches are cut against the same source |
| patches | **`pass-3/P-A3-light.patch`** (Q-5 (a), arm iii, the default; sha1 `e980347c`) and **`pass-3/P-A3-geom.patch`** (arm ii, the geometric pop; sha1 `5a4d0353`). Each **contains F5′** and applies on its own at HEAD. `git apply --check` passes for both on the main checkout at `89aab527f` (re-run 2026-10-17 14:46) |
| resumption | The seat was cut off by the 2026-10-17 kernel-zone stop and reboot (`89aab527f`) after the light Chromium battery, the light WebKit E-1..E-6 and the Chromium probes. It resumed at 14:46 after the reboot (zone count 1,882): the worktree was re-created, both harness apps rebuilt (`A3/logs/build-{light,geom}.log`), and the rest run by `A3/resume.sh` (Chromium) and `A3/wk-batch.sh` (every remaining WebKit stage inside **one** `guarded --exclusive webkit` acquisition, admitted 16:32:06 after a 25 min wait). Per-stage queueing lost the lock to other seats between stages: E-7 alone waited 58 min (14:54 → 15:52). No WebKit cell was skipped |
| P-E3 builds on | **`P-A3-light.patch`**. It holds the default (Q-5 (a)); the geom build exists for the owner's Q-5 glance only |
| worktree | `.claude/worktrees/bl/D5/p3/A3/wt` (detached at HEAD, `node_modules` symlinked; `tests-visual/node_modules` does not exist in the checkout). Removed with `git worktree remove --force` before return; nothing is left under `…/A3/` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU args, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H3's, unchanged, read from the checkout (`../harness/`). This seat edited no harness file. Every battery ran on the harness's own app, built against each patch (`run-a3.sh build`) |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds: P-A3 adds no lighting layer (§3 CK-26) |
| records | `A3/run-a3.sh` (build, battery, gates), `A3/queue.sh` (the one queue; every WebKit run through `guarded --exclusive webkit`, queued, never skipped), `A3/tab.mjs` (tabulator), `A3/probe/a3-probe.mjs` (CK-21, CK-14, CK-13, CK-20 cells), `A3/probe/tabs-arrival.mjs`, `A3/probe/tokread.mjs`, `A3/ck22-greps.sh`, `A3/resume.sh` and `A3/wk-batch.sh` (the post-reboot resumption), `A3/logs/` (`queue-main.txt`, `queue-resume.txt`, `wk-batch.txt`), `A3/json/{light,geom,geom-arms}/`, `A3/glance/`; superseded reads (taken before the last two source edits) under `A3/superseded/` |

## 0 · In brief

1. **CK-01 latch: 54/55 in both engines on the harness's app** (pass 2: 25/55 on this app). The one unproven member is `dock`, which no H3 scene renders and which is D2's. Timeline now computes `static` (root) and `pressed` (marks); `PopoverTrigger` stamps `engage-disclosed` on both its paths, `as-child` included.
2. **CK-02 under the default: 5 of 8 members pass on every path, both themes, both engines** (Checkbox, Chip in both modes, Button, ToggleGroupItem by arm iii; SegmentedTabs by arm i, overshoot 1.65-1.93 px). Three fail:
   - **Switch, light theme:** rise 0.0060-0.0062 (Chromium) and 0.0009-0.0063 (WebKit). Pass 2's finding 1, the near-white ceiling.
   - **Radio:** light theme 0.0024-0.0027. In the dark theme the rise reads **0.0000** on the keyboard, programmatic and pointer paths in both engines (the coarse tap reads 0.0476 in Chromium and 0.0001 in WebKit). That is not the ceiling: in the dark theme Radio's commit seat paints nothing measurable.
   - **Accordion trigger:** keyboard, programmatic and coarse fail. Light theme 0.0005-0.0032; dark theme 0.0097-0.0099, just under the 0.01 bound. The pointer path passes (0.0195-0.0242).

   CK-02 stays open on the owner under Q-5 (a), as §P2-8.1 allows; the Radio dark zero is a defect of this build, not of the channel. **The geom build passes all 164 cells in both engines once arm ii is admitted** (`--commit-arms i,ii,iii`). The face excursion on the painted face against the 0.8 px bound: Switch 2.19-2.20 px, Checkbox and Radio 1.00, ToggleGroupItem 1.15-1.51, both Chip modes **0.81-0.88**, accordion 6.36-6.40, Button 1.49-2.44; SegmentedTabs passes by arm i. Under the default arms (i, iii) it reads 92/72 (Chromium) and 88/76 (WebKit).
3. **CK-03 closes on the CSS path.** Mounted committed: 18/18 quiet per engine. The async arrival before paint, in the mount's own task, and in the mount's own task after a style read (`ownflush`): 14/14 pass per engine, SegmentedTabs included (the 4 others are the stateless Button and action Chip, REPORT by H3's ruling). Two cures made the `ownflush` cell pass: the door's arming now covers ten members, not one, and the lift flushes the host's **whole subtree**, because Chromium's style read is scoped to the element read (the tabs' indicator stayed in flight for 26 frames when only the host was read).
4. **CK-14 closes.** Dock triggers carry no seat: the coarse slop sits centred at −6, −10 px and paints nothing at 60 ms after opening, in both themes, in both engines, on both builds (Chromium load 12.2, WebKit 19.1).
5. **CK-21 closes on the light clocks, with one caveat.** Each of the eight members raises 1-2 `console.error` naming the planted token (`--engage-control-engage-{attack,release}`, `--rung-light`) and 0 on a clean commit: 33 probe cells pass in each engine (Chromium load 14.0, WebKit 19.1). The probe also found a masked fallback HEAD ships: SegmentedTabs' glide clock parsed `--tab-indicator-duration` with `parseFloat`, which reads `calc(.21s * 1)` as NaN, so the 220 ms literal answered every time. The clock now reads the indicator's resolved `translate` duration and fails loud when it cannot. The probe line for that plant reads FAIL only because the message names "the indicator's translate clock", not the token.
6. **CK-10 holds only in part** (E-9 72/6 in both engines). Under reduce, Checkbox, Chip, Button and ToggleGroupItem keep a visible light transient in both themes, and Switch and Radio keep one in the dark theme. Four fail: Switch in the light theme (0.0060 Chromium, 0.0003 WebKit), Radio in the light theme (0.0031, 0.0027), the accordion (light 0.0031-0.0032, dark 0.0098-0.0099), and SegmentedTabs (0.0000 in both themes; it commits by travel and has no light seat). The geom build keeps **no** light transient on any member under reduce (0.0000 on all 18 cells per engine, E-9 60/18): a CK-10 failure of that build, and a cost of choosing arm ii.
7. **CK-13 arms are stated and read**: forced colours 11/11 in both engines; reduced transparency 11/11 in Chromium, and 11 UNMEASURED in WebKit (the engine does not apply the query: the engine's limit, not a pass). Forced colours: the seat is removed on all eight members; the disclosed press gains a 2 px `Highlight` outline (new arm); the held grow (×1.060) and the pager pip's press (scale 0.97) are kept as geometry. Reduced transparency: every arm is kept.
8. **CK-20 on the geom build:** the selectable Card keeps `[--card-fill, box-shadow, border-color, scale]` and the tabs strip keeps `[background]`, identical to the light build. Chip, Button, ToggleGroupItem and the accordion trigger keep their own lists and gain one `--rung-commit` leg (0.45 s). The lists are identical in both engines. The Switch host's list becomes `[--rung-commit]` (light: `[all] 0s`).
9. **Cost:** light **165 files, +2542/−1280** vs HEAD; **128 files, +953/−666** over F5′. Geom over light: **11 files, +70/−98**.
10. **Gates green on both builds:** build, typecheck, `demo:dist:build`, vitest (242 files, 2353 passed, 10 expected-fail, 1 skipped).

## 1 · What was built

### 1.1 · The base

F5′ first (`F5p.patch`). Then A2-light's delta over F5, re-cut onto F5′ through scratch-index trees. Ten files overlap; they were merged with `git merge-file`. Two conflicts were resolved by hand: `utilities.css` (F5′'s comment kept) and `utilities/engage.css` (A2's recipes first, then F5′'s mount-frame block and the AUTH-4 block last). A2's merged code called `loud("--scale-engage")` with the one-argument signature F5′ had retired; fixed to `loud(token, el)`.

### 1.2 · The light build (`P-A3-light.patch`)

| item | CK | what |
|---|---|---|
| Timeline's class | CK-01 | `Timeline.vue`: the root is `engage-static`, each mark `engage-pressed`. `engageClasses.ts`: `timeline: "static"` with `modes.timeline: ["static", "pressed"]`. The gallery's Timeline renders no marks, so the root's stamp is what the census reads |
| `PopoverTrigger` as-child | CK-01 | stamps `['engage-disclosed', props.class]` on both paths; reka merges it onto the child |
| one engagement class per element | CK-01 | `cn` (`class-names.ts`) gains a first rule, the `engage-class` group: `engage-(pressed|chosen|disclosed|held|dragged|presented|field|ambient|static)`. The last write wins, so an `as-child` trigger over a library Button carries `engage-disclosed`, not both |
| the door on every state member | CK-03 | `useEngage(…, { commit: "state" })` now arms Checkbox, RadioGroupItem, Chip (a second door through its `selectableRef` Toggle), ToggleGroupItem, AccordionTrigger, SegmentedTabs, CollapsibleTrigger, SelectTrigger, DropdownMenuTrigger and PopoverTrigger. F5′ armed the Switch only |
| the arming lift | CK-03 | `useEngage.ts`: the rAF that lifts `data-engage-arming` reads `getComputedStyle(e).transitionProperty` on the host **and every descendant** before removing the attribute, so the arrived state becomes every held element's before-change style. The rAF id is kept and cancelled on unmount |
| the tabs' mount frame | CK-03 | `useSelectionIndicator.ts`: a model change before the first frame re-seeds `lastIdx` rather than squishing; the frame is cancelled in `onUnmounted` |
| the tabs' clock | CK-21, CK-27 | `clockMs` reads the resolved duration of the indicator's `translate` leg. Unreadable: one `console.error`, then 0 (the deform releases at once). HEAD's `parseFloat(var)` read `calc(.21s * 1)` as NaN and fell to a 220 ms literal on every call: a masked fallback |
| dock triggers carry no seat | CK-14 | `utilities/engage.css`: the seat selectors (rest, committed, `[data-commit="b"]`) add `:where(:not(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger))`. The coarse floor's `::after` hit-slop (`touch-floor.css`) is the dock trigger's, and the seat no longer claims it. A comment states why |
| the disclosed press under forced colours | CK-13 | `engage-disclosed`: `@media (forced-colors: active) { &:active { outline: 2px solid Highlight; outline-offset: -2px } }` |
| the held grow under forced colours | CK-13 | `engage-held`: comment stating the arm (the grow is geometry and is kept) |
| the fill's clock | CK-02, CK-09 | `control-bit.css`: the face's `background-color` leg runs on `--engage-press-drain-release`; `:active` runs it on `--engage-press-drain-attack`. Pass 2's 200 ms fill clock had no envelope row (C-A2 CK-02 second finding) |
| AUTH-4 | CK-10 | the committed rows add `[data-state="on"]` (ToggleGroupItem). New digest `f567b1019a7f33e4ee2e82b69df61d319af597745c58b72c7be5ab7f6e15be11`, block lines 239-270 (light) and 216-247 (geom). The BJ row and a dated amendment paragraph are in the patch (`docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md`); `tests/styles/engage-floor.test.ts` checks it |

Tests: `engage-ladder.test.ts` (Timeline in `modes`; the PRM test now asserts that exactly one reduced-motion block names the seat, AUTH-4, that it holds durations only and that they are envelope tokens); `easing.contract.test.ts` (mount frames drained or counted, each with a comment); new `tests/components/engage-adoption.test.ts` (eleven members armed at mount and lifted after one frame; `PopoverTrigger`'s class on both paths, `as-child` over a Button included); `classNames.test.ts` (the engage group). Each new adoption test was run against the source with its cure removed and failed.

### 1.3 · The geom build (`P-A3-geom.patch`)

Light plus 11 files, +70/−98. `@property --rung-commit` (`<number>`, `inherits: false`, initial 0). In `@layer components`, at zero specificity:

```css
:where(.engage-chosen, .engage-pressed, .engage-disclosed) {
    --rung-crest: var(--scale-commit-pop);
    transform: scale(calc(1 + (var(--rung-crest) - 1) * sin(var(--rung-commit) * 180deg)));
    transform-origin: center;
    transition: --rung-commit var(--spring-panel-duration) var(--spring-panel);
}
```

with `--rung-commit: 1` on `[data-state="checked" | "on" | "open"]` and `[data-commit="b"]`, the bit's crest `--scale-commit-pop-bit`, and `transform: none` under reduce. The `--rung-commit` leg is appended to the members' own lists (`.glass-chip`, `.toggle-group__item` and its `:active` durations, `.button`, `engage-disclosed`'s list). The light seat block and the Switch/Checkbox/Radio light spans are removed. The crest tokens are `--scale-commit-pop: 1.02` and `--scale-commit-pop-bit: 1.05` on the scale paper (CK-12, §3).

## 2 · Cost (CK-23)

| measure | files | + | − | record |
|---|---|---|---|---|
| light vs HEAD | 165 | 2542 | 1280 | `A3/numstat-light.txt` |
| — src | 133 | 1913 | 1080 | |
| — tests | 20 | 591 | 181 | |
| — other (demo, docs, roster) | 12 | 38 | 19 | |
| geom vs HEAD | 166 | 2515 | 1281 | `A3/numstat-geom.txt` |
| **light over F5′** | **128** | **953** | **666** | `A3/numstat-light-over-F5p.txt` |
| — src | 106 | 744 | 534 | |
| — tests | 12 | 182 | 114 | |
| geom over light | 11 | 70 | 98 | `A3/numstat-geom-over-light.txt` |
| F5′ vs HEAD (for reference) | 55 | 1603 | 628 | |
| pass 2: A2-light over F5 | 125 | 652 | 631 | `../pass-2/P-A2.md` |

Per member, the door's adoption costs one ref and one `useEngage` line (3-4 lines with the import) on each of the ten newly armed members. Most of the over-F5′ cost is A2's own (adoption, retirement of `.tap-squish` and `.interactive-item`, recipes). P-A3's own additions over A2 are about +300 lines, half of them tests.

## 3 · Per row (CK-01..CK-27)

Loads are the 1/5/15-minute averages at the start of each run; the per-cell loads are in the logs. Every Real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**.

Status words: **CLOSED** (green in both engines on this build), **OPEN** (a counterexample stands), **OWNER** (open under a standing default), **OUT** (the row is not on route A's §P2-8.1 list; the reading is recorded, not claimed). Witness counts are pass / fail / unmeasured / report from `A3/json/<build>/E-n-<engine>.json` (`node A3/tab.mjs <build> <engine> --fails`). Probe counts are from `A3/logs/probe-<build>-<engine>.log`.

### 3.1 · Route A's rows (§P2-8.1)

| row | build | Chromium (load at start) | WebKit (load at start) | reading | status |
|---|---|---|---|---|---|
| CK-01 | light | E-1 92/4/0/0 (22.1) | E-1 92/4/0/0 (14.8) | latch **54/55**: `dock` unproven (no H3 scene renders it; D2's fence). Timeline computes `static` (root) and `pressed` (marks); the `PopoverTrigger` stamp holds on both paths (unit test, `engage-adoption.test.ts`). The other three fails are scene cells outside A: `presented (sheet) PRM press-light` "no target while pressed" (the in-flow Sheet, O-74c G-1, F-6) and two `ambient (aurora)` cells (Chromium 0.00 levels against 0.00 at rest; WebKit 1.18 against 1.13 drift, under the ≥ 2× bound) | OPEN on `dock` (D2) only |
| CK-01 | geom | 92/4/0/0 (12.1) | 92/4/0/0 (20.0) | the same four cells | as light |
| CK-02 | light, arms i,iii | E-2 144/20/0/16 (20.5) | E-2 142/22/0/16 (19.8) | 5 of 8 members green on every path and theme. Switch (light theme), Radio (both; dark reads 0.0000 on three paths), accordion (keyboard, programmatic, coarse) fail. Per-cell rises in §0 item 2 | **OWNER** (Q-5 (a)); Radio's dark zero is OPEN on this build |
| CK-02 | geom, arms i,ii,iii | E-2 **164/0/0/16** (28.5/90.0/58.4) | E-2 **164/0/0/16** (6.9) | every member, every path, both themes: arm ii, excursion 0.81-6.40 px; tabs by arm i. The Chip's margin is 0.01 px over the bound | green if the owner rules Q-5 toward arm ii |
| CK-02 | geom, arms i,iii | 92/72/0/16 (9.6) | 88/76/0/16 (21.9) | arm ii not admitted under the default; arm iii removed by design | n/a under the default |
| CK-03 | light | mount 18/18; quiet arrival `pre` 14/14, `own` 14/14, `ownflush` 14/14 (4 REPORT each: Button and action Chip, stateless) (20.5) | identical counts (19.8) | the in-task arrival after a style read is quiet on every state member, SegmentedTabs included. A late arrival commits once; its arm fails on the CK-02 members (5 cells per engine), which is CK-02's | **CLOSED** |
| CK-03 | geom | identical quiet counts (9.6) | identical (21.9) | late arrivals: 12 arm failures per engine under arms i,iii | quiet half CLOSED |
| CK-10 | light | E-9 72/6/0/2 (16.2) | E-9 72/6/0/2 (14.6) | kept: Checkbox, Chip (both modes), Button, ToggleGroupItem in both themes; Switch and Radio in the dark theme. Fails: Switch light (0.0060 / 0.0003), Radio light (0.0031 / 0.0027), SegmentedTabs both themes (0.0000: it commits by travel and has no light seat), accordion light (0.0031 / 0.0032) and dark (0.0099 / 0.0098). The Button does not squish under reduce and the tabs indicator follows the finger (F-3): both among the passes | OPEN (4 members) |
| CK-10 | geom | E-9 60/18/0/2 (6.7) | E-9 60/18/0/2 (8.4) | **no light transient on any member, either theme** (rise 0.0000 on all 18 cells). Arm ii's `transform: none` under reduce leaves nothing | OPEN: a cost of arm ii |
| CK-13 | light | probe forced 11/11, transparency 11/11 (11.4) | forced 11/11; transparency **11 UNMEASURED** (engine limit) (19.8) | forced colours: the seat removed on 8 members; the disclosed press's 2 px `Highlight` ring (Chromium `rgba(5,0,73,.8)`, WebKit `rgba(128,188,254,.6)`); held grow ×1.060 and pager press 0.97 kept as geometry. Reduced transparency: every arm kept (Chromium) | CLOSED in Chromium; the WebKit PRT cell is the engine's limit, not a pass |
| CK-14 | light | 2/2 (12.2) | 2/2 (19.1) | the dock trigger's 44×44 slop at −6, −10 (centred), clear 60 ms after open, both themes | **CLOSED** |
| CK-14 | geom | 2/2 (11.8) | 2/2 (19.2) | face 32.5-32.6 × 24.4 px (the pop at rest is ×1.000; the slop stays centred within 0.3 px) | CLOSED |
| CK-20 | geom | probe 9 REPORT (11.8) | 9 REPORT (19.2) | lists identical in both engines: Card `[--card-fill, box-shadow, border-color, scale]`, tabs strip `[background]` (both as light); Chip, action Chip, Button, ToggleGroupItem and the accordion trigger append one `--rung-commit` 0.45 s leg; the Switch host is `[--rung-commit]`. No list loses a leg the light build has | CLOSED on the geom lists |
| CK-20 | light | E-10 4/0/0/2 (13.7) | E-10 4/0/0/2 (17.2) | continuity, H3's position plant included. The graded hand-off is E's (§P2-8.1) | CLOSED for A's paths |
| CK-21 | light | probe 33 PASS, 1 FAIL (14.0) | 33 PASS, 1 FAIL (19.1) | every planted envelope token and `--rung-light` raises 1-2 `console.error` naming it on all 8 members; 0 on a clean commit. The one FAIL: `--tab-indicator-duration: nonsense` raises **one** `console.error`, but it names "the indicator's translate clock", not the token, because the clock now reads the resolved `translate` duration (§1.2). E-11: 2/0/2U both engines (the two U are plants not read on that path) | CLOSED by the row's rule (one `console.error`); the probe's naming match is stricter than the row |
| CK-22 | — | — | — | §4 | CLOSED for C-A2's three gaps and P-A3's own surfaces; sibling edits wait on their sessions |

### 3.2 · The other rows, read on the light build

| row | Chromium | WebKit | reading | status |
|---|---|---|---|---|
| CK-04 | E-3 20/2 (19.2) | 20/2 (19.4) | phone touch-held 358.0 × 24.0 → ×1.000 on both axes, both themes. E's row (§P2-8.1) | OUT (E) |
| CK-05 | E-4 14/0/4U (19.1) | 11/0/8U (8.3) | the Sheet UNMEASURED (in flow, O-74c G-1); the WebKit carousel cannot be touch-scrolled (H-4) | OUT |
| CK-06 | E-5 55/1 (15.8) | 56/0 (8.7) | Chromium `tabs sustain light` ×0.73 against ≥ ×0.95, read once. WebKit passes. Not re-run: **NOT-REPRODUCED** under the load rule until two re-runs | OUT |
| CK-07 | E-6 4/2/8U (16.6) | 2/2/8U (17.1) | no idle animation, as Q-2 (b) requires; closed only by the owner's words | OWNER |
| CK-08 | E-7 6/1 (18.1) | 6/1 (15.7) | `data-held` has two writers: `useEngage.ts` and `GlassDock.vue`. The dock's is D2's attribute, named as such (F-4; CK-08 permits a named attribute the route does not own) | admissible by the named clause |
| CK-09 | E-8 19/0 (17.1; geom 7.8) | 19/0 (9.9; geom 9.8) | one clock, no rung literal, on both builds | CLOSED |
| CK-11 | — | — | `.tap-squish` and `.interactive-item` retired (A2's portion, carried); the capsule's dock-tab press stays D2's (P-A2 §5) | source reading |
| CK-12 | — | — | the crest tokens `--scale-commit-pop` 1.02 and `--scale-commit-pop-bit` 1.05 are on the scale paper; `--rung-commit` runs on `--spring-panel-duration` (0.45 s) | source reading |
| CK-17 | UNMEASURED (owner's safaridriver checkbox) | — | every visual claim above is Playwright WebKit, not Safari | OPEN on the owner |
| CK-23 | — | — | §2 | CLOSED |
| CK-24 | E-1 static cells pass | pass | Timeline's root stamps and computes `static` | CLOSED |
| CK-25 | §5 | §5 | the set is captured; the grade belongs to a seat that did not build the route | for C-A3 |
| CK-26 | — | — | P-A3 adds no lighting layer; the light seat is the arm-iii seat A2 carried, and the geom build removes it. The selectable Chip's `plus-lighter` flood was not re-read at this seat | for C-A3 |
| CK-27 | — | — | the masked fallback in the tabs clock is cured (§1.2); every new adoption test was run red against the source with its cure removed | source reading |

CK-15, CK-16, CK-18 and CK-19 are not on route A's list and were read only through the witnesses above. The gates are green on both builds (`A3/logs/gates-{light,geom}.log`: build, typecheck and `demo:dist:build` exit 0; vitest 242 files, 2353 passed, 10 expected-fail, 1 skipped). They ran at 05:14 and 05:16, after the patches' 05:12 cut, and the patches are byte-identical since (sha1 in the header).

## 4 · CK-22 · MIGRATION rows

Consumer greps re-run at this seat (2026-10-17 04:46) over the eight siblings: `A3/logs/ck22-greps.txt`, script `A3/ck22-greps.sh`.

Sibling trees are read only. The counts come from `A3/ck22-greps.sh` (main trees; node_modules, dist, worktrees, `.claude` and docs excluded). The `--glass-btn-press-t` read was taken by hand at 14:50 the same day.

| # | consumer-visible path | what changes | sites in the eight siblings | MIGRATION row (for `MIGRATION.md` at the cut) |
|---|---|---|---|---|
| M-1 | an element that composes `engage-chosen`, `engage-pressed` or `engage-disclosed` (C-A2's first gap) | the root gains `position: relative` and `isolation: isolate`, and its `::after` is the seat's (rest, committed, `[data-commit="b"]`). Dock triggers are excluded | `::after` on a member host: **0 live sites**. The 43 value.js hits are two compiled bench sheets (`bench/paired/sheets/wpt-bulma-0.7.5.css` ×42, `keyframes-js-index.css` ×1). Dock trigger classes: atlas 3, keyframes.js 1, slides 1, speedtest 4, value.js 5, fourier 3 (the seat no longer claims their slop: CK-14) | "Engagement-class roots own `::after` and form a stacking context (`isolation: isolate`). A consumer `::after` on Button, Chip, ToggleGroupItem, a disclosure trigger, SegmentedTabs or SelectTrigger moves to a child element. A consumer `z-index` on a descendant now stacks inside the root." |
| M-2 | `engage-held` and `engage-disclosed` replace a host's `transition` list (C-A2's second gap) | the recipe's list is the element's list; a consumer `transition-*` utility on the same element is overwritten by the recipe or overwrites it, by order | engage-class used directly by consumers: **0** in all eight | "The engagement recipes own `transition` on their root. Transition a child, or name the extra property in a wrapper; do not add `transition-*` utilities to an engaged root." |
| M-3 | `--glass-btn-press-t` (C-A2's third gap) | retired in F5 with no alias (F5′ renamed the last two prose mentions) | value.js: two compiled bench sheets (`bench/paired/sheets/{keyframes-js,value-js}-index.css`) and audit evidence under `docs/`; no live source. speedtest: one AW note under `docs/` | its own row, not F5's general rename line: "`--glass-btn-press-t` is retired without a successor; the Button's press is the `engage-pressed` envelope (`--engage-press-drain-{attack,release}`). Bench sheets that capture compiled CSS are regenerated." |
| M-4 | `as-child` on `PopoverTrigger` | the child receives `engage-disclosed`. Over a library Button, `cn`'s new `engage-class` group keeps the last engagement class, so the Button carries `engage-disclosed`, not `engage-pressed` | `PopoverTrigger as-child`: atlas 2, bbnf-buddy 7, chicago 1, keyframes.js 1, slides 1, speedtest 3, value.js 7, fourier 4. Over a `<Button>` (all three triggers): bbnf-buddy 1, chicago 6, keyframes.js 2, speedtest 3, value.js 2, fourier 9 | "An `as-child` disclosure trigger stamps `engage-disclosed` on its child. A Button under it presses as a disclosure (light wash, no squish). `cn` keeps one `engage-*` class per element, the last written." |
| M-5 | `DropdownMenuTrigger`, `CollapsibleTrigger`, `SelectTrigger` and the seven other state members armed by the door | `data-engage-arming` is present for one frame after mount; transitions are held until it lifts | `as-child` DropdownMenuTrigger 16, CollapsibleTrigger 14 across the siblings; no consumer selects `data-engage-arming` | "State members mount at their committed state without a transition. A consumer selector on `[data-engage-arming]` is unsupported." |
| M-6 | `<Timeline>` | the root is `engage-static`, each mark `engage-pressed` (a mark presses as a button) | speedtest 2 (`PhaseTimeline`); 0 elsewhere | "Timeline marks press with the `pressed` register; the root is `static` and carries no handler." |
| M-7 | Escape inside a Dialog; keyboard and script-focus engagement; top-layer promotion | unchanged by P-A3 (E's surfaces) | — | carried by P-E3's rows |

value.js has a live session and was not touched. Each row lands in `MIGRATION.md` at the cut; P-A3 writes no tracked file outside its patches.

## 5 · CK-25 · the owner-glance set

Captured by the harness's `capture.mjs` on each build's app: 9 exemplars (button `pressed`, switch `chosen`, slider `held`, sortable `dragged`, accordion `disclosed`, `presented`, `field`, `ambient`, `static`) × 6 states (rest, pressed, held, engaged, committed, released) × light and dark × fine and coarse × both engines × both builds = **864 frames** under `pass-3/A3/glance/frames/`. Each `{build}-{engine}-{pointer}-{theme}-{scene}-{state}.png` carries the scale the harness read under it.

| build | engine | sheets | capture witness (load at start) |
|---|---|---|---|
| light | Chromium | `A3/glance/light-chromium-{fine,coarse}.png` | CAP 12/0/0 (5.3) |
| light | WebKit | `A3/glance/light-webkit-{fine,coarse}.png` | CAP 12/0/0 (18.1) |
| geom | Chromium | `A3/glance/geom-chromium-{fine,coarse}.png` | CAP 12/0/0 (21.8) |
| geom | WebKit | `A3/glance/geom-webkit-{fine,coarse}.png` | CAP 12/0/0 (12.6) |

Indexes: `A3/glance/{light,geom}-index.json`. For the Q-5 glance, set each light sheet beside the matching geom sheet: the committed column is where the two builds differ. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. This seat built the route and does not grade the set; that read is C-A3's.

## 6 · Open gaps

1. **CK-02 under the default (OWNER, Q-5):** Switch (light theme) and the accordion's keyboard, programmatic and coarse paths stay under the 0.01 bound in both engines. The accordion's dark theme misses by 0.0001-0.0003.
2. **Radio's dark commit seat paints nothing measurable** (0.0000 on three paths, both engines). This is a defect of this build, not of the channel. The next pass should read the seat's computed paint on the Radio indicator in the dark theme before ruling it the ceiling.
3. **CK-10:** SegmentedTabs has no light seat under reduce, and Switch, Radio and the accordion fall under the bound in the light theme. The geom build keeps no light transient under reduce on any member: if the owner rules Q-5 toward arm ii, a light leg under reduce must be added to it.
4. **The geom Chip clears the 0.8 px bound by 0.01 px** (0.81 on the keyboard, programmatic and pointer paths, both engines). It is legible only at the floor.
5. **CK-01 latch:** `dock` stays unproven until a scene renders it or D2 adopts. It is D2's fence.
6. **CK-21 probe naming:** the tabs clock's error names the clock, not `--tab-indicator-duration`. The row holds (one `console.error`); C-A3 rules whether the message must name the token.
7. **CK-06 (out of route):** the Chromium tabs sustain ×0.73, read once at load 15.8 and passing in WebKit, is NOT-REPRODUCED until re-run twice.
8. **Real Safari:** every cell is UNMEASURED (owner's safaridriver checkbox).
9. **CK-25 and CK-26** are for C-A3: the glance grade, and the selectable Chip's `plus-lighter` flood.
10. **MIGRATION rows M-1..M-6** are written here; they enter `MIGRATION.md` at the cut. Sibling edits (value.js bench sheets, the speedtest Timeline) wait on their own sessions.
11. **Housekeeping:** the worktree was removed (`git worktree remove --force`). The empty directory `.claude/worktrees/bl/D5/p3/A3/` remains: the `rmdir` was refused by the permission system. Nothing else is left there, and nothing of this seat's is left running.
