# BL — formation fix, seat 15

| field | value |
|---|---|
| seat | formation fix seat 15, before audit pass 15. Answers `formation-audit/pass-14.md` (FN-01 to FN-07) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `2967ce43` (pass 14 banked). `src` and `demo` are the commit pass 14 read |
| where probes ran | a worktree at `2967ce43` (`.claude/worktrees/bl/formation/fix-15/wt`, `node_modules` symlinked; `tests-visual/node_modules` symlinked, though the checkout has none). No build. One Vite dev server ran in the worktree on port 5491 for four Playwright Chromium reads (below), then was stopped. Every sweep plant was undone: `git status --short` in the worktree read 0 lines after every run. The worktree is removed (`git worktree list \| grep -c fix-15` → 0) |
| machine | load average 51-62 (`uptime`); no timing cell was read. The Playwright and chrome-devtools MCP servers failed to connect; the reads below used the `playwright` package from `node_modules` directly. Playwright WebKit is not Safari, and no WebKit cell was read here. Real Safari is UNMEASURED (OW-3) |
| writes | `PLAN.md` (two edits in the W-E.2 and W-I.7 rows); `waves/W-0.1`, `W-0.11`, `W-0.12`, `W-E.1`, `W-E.2`, `W-E.3`, `W-E.4`, `W-E.5`, `W-E.7`, `W-E.8`, `W-E.9`, `W-E.10`, `W-E.14`, `W-F.2`, `W-F.5`, `W-F.6`, `W-I.1`, `W-I.2`, `W-I.3`, `W-I.7`, `W-K.4`, `W-K.5`, `W-K.10`, `W-L.1`; under `formation-audit/sweeps/`: `hold-line-claim.py` (the SIBLING arm and the plants it requires), the new `pi-surface.py` and `migration-values.py` with their `.out` files, and a `# ===== fix-15` section on every other `.out`; this file. `LEDGER.md` needs no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written (`design/dock/harness/scenes.mjs` shows as modified in the checkout; another seat wrote it, not this one). No git write in the checkout. No sibling repo touched. Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`, and `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before (plan at `2967ce43`) | after |
|---|---|---|---|---|
| FN-01 to FN-05 | a static gate passes a spelling of its subject that `src` itself uses but the gate's text does not name | `hold-line-claim.py`, new SIBLING arm | **exit 1**, open 93 (all SIBLING, 12 gates) | **exit 0**, open 0, plants 589 |
| FN-06 | §3 changes a published value at rest and §7 does not name it | `migration-values.py` (new) | **exit 1**, open 7 (4 waves) | **exit 0**, open 0 |
| FN-07 | a visual change with no π surface that renders it, including surfaces that are not routes | `pi-surface.py` (new) | **exit 1**, open 31 (STYLE 16, ROUTE 15; 17 waves) | **exit 0**, open 0 |

The other ten sweeps exit 0 on the plan fix-15 leaves, each with the same summary line as pass 14: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), and `gates.py` and `plan_dag.py`. Every table in the 25 edited files has a constant column count (script).

**The nine rewritten gates at HEAD**, run in the worktree: W-0.12 G1, E3-G9, E4-G19, E7-G9, E8-G4, E9-G7, W-I.1 G18, W-I.2 G10 and I7-G1 each exit **1**. None is GREEN, so none is removed.

## The classes and the sweeps

### Class 1 (FN-01 to FN-05): a gate narrower than the spellings `src` uses

**Why fix-14's arms missed it.** NOUN drew plants only from the gate's own title, pass cell and spec quote. A spelling `src` writes for the same subject, but that no line of the gate names, passed both gate and sweep.

**The arm** (`hold-line-claim.py`, docstring `:57-72`; code `siblings` and `sibling_arm`, after `spec_arms`). For every S entry it reads `src` at run time and lists four kinds of sibling:
- **carrier.** A class `src` styles that sits in the same static class list as a class the gate names (in its cells' backticks or its span). FN-01's `.dock-run` is one.
- **wrapper.** An exported `src` function that passes one of its own parameters into an API the span names, outside the files the gate reads. FN-02's `useBreakpoint` is one.
- **family.** Every CSS property `src` declares from a family the span touches, or every viewport or pointer media feature `src` queries when the span reads `@media` or `pointer`. The two size axes count as one family, because the dock and the sheet rotate. FN-03's `block-size` is one.
- **token.** Every custom property `src` declares under a prefix the span forbids members of, or under the prefix of a token the span lets through in a `(?!…)` allow-list. FN-04's other `--radius-*` rungs are this kind.

Each sibling must be carried by a plant: red if it is the defect in another spelling, green if it is not. The plant then runs like any other plant, so a red sibling the gate passes is open NARROW.

**Instances.** The before run (`hold-line-claim.out`, `# ===== fix-15`, before (1)) lists 93, in 12 gates. Before (2) plants the classified siblings on the HEAD plan: **90 NARROW** in 9 gates, and 2 NOSPEC (the two §3 quotes fix-15 rewrote, E4-G19 and I7-G1). E4-G19 is among the 9 though not among the 12: its z-scale siblings appear once §3 names the rung its gate allows. E11-G6, G7-G4, H6-G3 and I7-G3 already fail every red sibling, so they needed plants only. After: open 0.

| gate | siblings `src` lists | verdict | cure |
|---|---|---|---|
| W-0.12 G1 (FN-01) | `.dock-run`; `min-inline-size`, `flex`, `height`, `min-block-size`, `max-height`, `max-block-size` | `.dock-run` NARROW (2 plants); the rest red and caught | subject test reads `\.dock-(run\|layer(s\|--…)?)` (`W-0.12.md:41`); HEAD's `.glass-dock.vertical .dock-run { min-block-size: 0 }` (`run.css:287-292`) is an orientation, not a state, and stays green |
| E9-G7 (FN-02) | `useBreakpoint`; media `min-width`, `max-height`, `max-aspect-ratio` | `useBreakpoint`, `max-height` and `orientation` NARROW | the span adds `useBreakpoints?`, `height`, `block-size` and `orientation` (`W-E.9.md:69`) |
| E3-G9 (FN-03) | `block-size`, `height`, `flex`, the inline axis (`width`, `inline-size`, `min-width`, `min-inline-size`, `max-*`) | 8 NARROW: `block-size: max(…)` and `clamp(…)` (pass 14's two), `height: max(…)`, `flex` reading the floor, a side sheet's `inline-size: max(…)`, `min-inline-size`, `min-width`, `documentElement.clientWidth` | the span fails a size whose value opens with `max(`/`clamp(` or reads `--sheet-floor`, and the inline floors of a side sheet, since §3 item 3's span is the height or the width (`W-E.3.md:69`). HEAD's `block-size: calc(clamp(…) * 100dvh)` (`styles.css:530`) opens with `calc(` and passes; `max-*` ceilings pass |
| E8-G4 (FN-04) | 20 other `--radius-*` rungs; the four logical corner longhands | 24 NARROW (each of the 20 rungs, a literal, two logical corners and a physical one) | the span fails any `border-radius` or `border-*-radius` in `metric/styles.css` that is not exactly `var(--radius-ctx)` (`W-E.8.md:68`); §3 item 5 says so (`:55`) |
| E4-G19 (pass 14 hardening note, cured with FN-06) | the 30 other `--z-*` rungs and bridges, once §3 names `var(--z-max)` | 32 NARROW on the old span (`170`, each of the 30 siblings planted in `scheme-motion.css`, and `--z-toast` re-declared in `bridges.css`) | the span fails any `--z-toggle` declaration in `src/styles` that is not `var(--z-max)`, and requires `--overlay-side-offset: 4px` (`W-E.4.md:95`) |
| E7-G9 | media `min-width`, `max-height`, `max-aspect-ratio` (`src` queries them at `deck/styles/stage.css:139`) | 3 NARROW (height, aspect, orientation) | the span reads every viewport feature, `(min\|max-)?` and range syntax (`W-E.7.md:78`); HEAD's count stays 5 |
| W-I.1 G18 | media `hover` | 2 NARROW: `(hover: none)`, `(any-hover:none)` | the span adds `(any-)?hover: *none` (`W-I.1.md:225`); `src/components/dock` has no hover query at HEAD; a `(hover: hover)` effect gate is green |
| W-I.2 G10 | `.dock-layer`, `.dock-layer--full`, `.dock-layer--summary` (the run element's other classes, `GlassDock.vue:464`) | 4 NARROW | the awk reads `\.dock-(run\|layer\|layer--full)` with a compound before `> *` (`W-I.2.md:93`); HEAD's rule is the same one |
| W-I.7 I7-G1 | the whole size family on both axes | 12 NARROW, among them the vertical dock's `transition: block-size …` at `run.css:376,384` | **a live instance no seat named**: the vertical seat transitions replace the control's list exactly as `:357,366` do. The span reads every size property on both axes (`W-I.7.md:42`); §2 (`:24`), §3 item 1 (`:30`), §4 (`:36`, now `:353-385`), §6 and the PLAN row (`PLAN.md:205`) carry the vertical arm. HEAD reads 4 lines |
| E11-G6, G7-G4, H6-G3, I7-G3 | `font`; `resolveAtoms`; 16 inset and margin longhands, `translate`, 10 `--glass-blur-*` tokens; 6 padding longhands | no NARROW: the spans already fail every red sibling | plants only. Green, with the reason in the plant: `font: inherit` (no face name), `resolveAtoms` (another symbol; publishing it is W-L.6's census), `translate` (it moves the pseudo-element and grows it past no edge), and the three other rung radii |

Each rewritten gate's pass cell and HEAD cell state the widening, the HEAD reading at `2967ce43`, and the reds and greens on the cured base. The spellings are the CLAIMS entries.

### Class 2 (FN-06): a value changed at rest with no §7 row

**The sweep** (`migration-values.py`) reads every §3 one sentence at a time and lists two kinds of candidate:
- a published token (one `src/styles` declares) in a sentence that changes something;
- a prop with a `withDefaults` default, in a sentence that changes something or names a default.

A candidate is closed when the wave's §7 names it, or when the sentence hands the change to another wave by id and that wave's §7 names it. The rest were read by hand. Twelve are readers, additive changes or owned rows, each listed in READS with its reason. A READS entry that matches no candidate is STALE.

**Instances, 7, all cured:**
- **W-E.4 `--z-toggle` and `sideOffset` (FN-06).**
  - §3 item 11 (`W-E.4.md:67`) names the rung, `var(--z-max)`. That keeps the toggle over every rung of the scale, as at HEAD, and the scale gains no number.
  - It also names the token, `--overlay-side-offset: 4px` in `tokens/offsets.css`. No component's `sideOffset` carries a default.
  - §7 gains two rows (`:136`, `:137`): `999` → `var(--z-max)` (9999), and the five per-component defaults (4, 4, 4, 0, 0) → the token.
  - §6 (`:123`) gains the offset pair: Select content and the submenu, 0 → 4 px.
  - §6 (`:120`) states that `--z-toggle` has no surface: `rg z-toggle src demo` finds two lines, the token and its bridge.
- **W-0.1 `--glass-veil-ink`.** §7 names the light-arm values that change.
- **W-0.11 `--shadow-modal`, `--shadow-dock` and `--shadow-dock-collapsed`.** §7 names the three tokens. Both waves stay minor-lawful (G5), and their CHANGELOG lines carry the names.
- **W-E.5 `duration`.** The §7 row for the queue now says a waiting toast's `duration` starts when the toast becomes visible.

### Class 3 (FN-07): a visual change with no π surface that renders it

**The sweep** (`pi-surface.py`) has two arms:
- **STYLE.** For a component stylesheet in §4, §6 must name the component or a route whose story renders it. §3 is not read, because it cites HEAD's stylesheets as evidence as often as it edits them.
- **ROUTE.** A `/<category>/<id>` path named anywhere in a spec must be a route of `demo/stories/manifest.ts`. A line that records the route as dead is exempt. W-A.1, W-A.6 and W-L.6 are also exempt, because the dead route is their subject.

**STYLE instances, 16, all cured.** Each §6 now names the component and a routed surface with its DELTA:
- **W-E.8 Metric (FN-07)** (`W-E.8.md:77`): `/data/metric`, the cell posture and the loading bar. The HEAD corners are 16 px and 4 px (read below).
- W-E.1: the deck stage on `/motion/deck`, and the `ec` scene named as ExpandableContainer.
- W-E.2: the dock shell label on `/dock/overview`.
- W-E.7: deck, compact dock seats and ToggleGroup labels.
- W-E.14 and W-F.6: the Configurator.
- W-I.3: DataTable, ExpandableContainer, Slider, Timeline and Blob, added to the coarse-latch row.
- W-K.4: DarkModeToggle on `/display/atoms`, `/data/data-table` and `/data/sortable-list`.
- W-L.1: the spectrum Slider.

**ROUTE instances, 15: the same hole a second way.** These surfaces and readings sat on the "Page not found" page:
- **W-E.4.** `/overlays/popover`, `/overlays/menu` and `/forms/select` become `/containers/popover`, `/containers/dropdown-menu` and `/forms/inputs` with its Select member chosen (`:120`).
- **W-F.2.** `/overlays/dropdown-menu` becomes `/containers/dropdown-menu` (`:99`).
- **W-K.5.** `/forms/select` becomes `/forms/inputs` (`:62`).
- **W-K.10.** `/display/typewriter` becomes `/motion/text-motion` (`:67`, `:89`).
- **W-E.10: the readings were the not-found page's.**
  - The route is now `/display/buttons` (`:45`, `:48`, `:97`, `:100`, `:104`, `:108`, `:159`, `:170`).
  - **G4:** the HEAD h1 was 23.67 px, the not-found heading. On `/display/buttons` it is 41.89 px, so the ceiling is 32.93 for all three routes.
  - **G7:** the "passing control" at 0.25 was the not-found page. `/display/buttons` reads 0.645, so all three routes fail at HEAD.
- **W-F.5 F5-G4: a vacuous cell.**
  - Its `select 0` was `/forms/select`, the not-found page.
  - The battery and probe now read `/forms/inputs` and click the `Select` tab (`:67`, `:150-152`).
  - Select carries 3 `[dir="ltr"]` nodes in an RTL document, so the HEAD total is **28**, not 25 (`:37`).

**The reads behind those numbers.** Chromium, the Vite dev server in the worktree at `2967ce43`, scripts in this seat's scratchpad:
- **h1 font size at 1440×900:**
  - `/forms/buttons`: 23.6694, text "Page not found";
  - `/display/buttons`: 41.888;
  - `/forms/chip` and `/display/badge`: 41.888 each, the recorded value.
- **G7, 320×256 after a 400 px scroll:** `/forms/buttons` 0.25 (not found), `/display/buttons` 0.645.
- **`dir="rtl"` on `<html>` before load, then counting `[dir="ltr"]`:**
  - `/forms/slider` 18, `/forms/checks` 3, `/dock/overview` 3 and `/containers/command` 1, each the recorded value;
  - `/forms/select` 0, the not-found page;
  - `/forms/inputs` 0 before the tab click and 3 after (three comboboxes).
- **`/data/metric`:** `.metric` 16px and `.metric__value` 4px, the corners W-E.8 §3 item 5 changes.

## Per finding

**FN-01 · cured.** See Class 1, row W-0.12 G1.
- Edit: `W-0.12.md:41`, the subject regex, the pass cell and the HEAD cell.
- Plants: `hold-line-claim.py`, the W-0.12 G1 entry. `.dock-run` as a descendant and as the subject; one green for HEAD's orientation rule.
- The class reached W-I.2 G10 too: the run element's other classes.

**FN-02 · cured.**
- Edit: `W-E.9.md:69`, which adds `useBreakpoints?` and the height, block-size and orientation features.
- The wrapper arm found no other wrapper of a named API outside its gate's files. Two (`sampleAnimated`, `createDragController`) sit inside their gates' own files, so the gate already reads their bodies. `resolveAtoms` is planted green.

**FN-03 · cured.**
- Edit: `W-E.3.md:69`.
- Both pass-14 plants now exit 1 on the cured base. So do the inline-axis floors of a side sheet, which the class sweep found.

**FN-04 · cured.**
- Edits: `W-E.8.md:68`, the gate on an allow-list of one value; `:55`, §3 item 5 stating it.
- Pass 14's `--radius-3xl`, `--radius-panel` and `0.75rem` plants exit 1, with the 18 other rungs and the longhands.

**FN-05 · cured.**
- The SIBLING arm reads `src` for each S entry, as above. Before: 93 open. After: 0.
- **What the arm still cannot see:**
  - a spelling `src` does not write yet (the critic's "invented spellings" stay hardening notes);
  - a sibling in a measured gate's subject (the arm reads static S entries only, as NOUN does).

**FN-06 · cured.**
- Edits: `W-E.4.md:67` (§3 item 11), `:95` (E4-G19), `:123` (§6), `:136-137` (§7).
- The critic's hardening note on E4-G19 (`--z-toggle: 170` passed) is cured with it: the gate now reads `var(--z-max)` only.
- Class sweep: `migration-values.py`, 3 more waves.

**FN-07 · cured.**
- Edits: `W-E.8.md:77` (the Metric surface) and `:55`.
- Class sweep: `pi-surface.py`. It found 15 more STYLE instances and 15 ROUTE instances in 9 more waves. Two of those changed recorded HEAD readings, W-E.10's G4 and G7 and W-F.5's G4, which are row-3 matters as well as π.

**Sources that disagreed.**
- `PLAN.md:149` (the W-E.2 row) said W-E.2 moves the seat's width transition. W-E.2 §3 item 9 hands the dock run to W-I.7, and W-I.7 §3 item 1 is the source of record.
- The PLAN copy is struck, and the row now cites W-I.7. `PLAN.md:205` now names both axes.

## Ledger

No row changed.
- The cures in W-E.4, W-E.8, W-E.3 and W-E.9 are those of rows that already point at their gates:
  - UIA-V-676 and UIA-F-219 → E4-G19 (`LEDGER.md:692-693`);
  - UIA-F-149 → E8-G4 (`:835`);
  - A2-FO-L3-7 → E9-G7.
- W-I.7's vertical arm is the same defect under C-8, the row W-I.7 already decides. The W-E.10, W-F.5, W-K.5, W-K.10, W-F.2 and W-E.4 route changes re-point surfaces; they decide nothing.
- `ledger-terminal.py` and `chronic-decided.py` exit 0.

## Open

- Real Safari: UNMEASURED (OW-3). No Playwright WebKit cell was read at this seat.
- `hold-line-scope.py` does not cover born-RED gates (fix-13's reason).
- W-0.12's per-frame strip still has no formation reading.
- The SIBLING arm reads static S entries only. A measured gate's sibling spellings need a browser.
- The ROUTE arm reads `/<category>/<id>` paths. A fixture scene (`k.html?s=…`, the band-E app) is not checked against the fixture source, which a wave lands.
