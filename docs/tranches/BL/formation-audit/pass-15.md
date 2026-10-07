# BL — formation audit, pass 15

| field | value |
|---|---|
| seat | formation critic, pass 15. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-14, fixes 2-15 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `1ce5202d` (fix 15 banked). The seat opened at `70d2c10d` with fix-15's files modified in the tree; fix 15 was committed while it read. `git diff --stat 70d2c10d 1ce5202d -- src tests tests-visual demo` is empty, so no probe reading differs between the two |
| inputs read | `PLAN.md` (§3, §4 and §5 by script; the W-E.2, W-I.7 rows); `LEDGER.md` and `audit/REGISTRY.md` by sweep and by family-header count; `audit/INBOUND-MAP.md:458`; §2, §3, §5, §6 and §7 of W-E.4, W-E.8, W-I.7; the rewritten gate rows of W-0.12, W-E.3, W-E.7, W-E.9, W-I.1, W-I.2; §3 and §6 of W-B.7 and W-I.5; `formation-audit/pass-14.md`; `formation-audit/fix-15.md` last; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-15/wt` at `70d2c10d` (`src` identical to `1ce5202d`), `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Real-Safari cells are UNMEASURED (OW-3). Load average 57-68 (`uptime`); no timing cell was read |
| fences | no source edit in the checkout, no git write in the checkout, nothing under `design/` read, run or written, no sibling repo touched. Every plant was undone by copy-back or `git checkout-index` inside the worktree; one stray plant file (`src/components/select/styles.css`, created by a failed copy) was deleted. `git status --short` in the worktree read 0 lines before `git worktree remove --force`. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FO-01 to FO-06) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Six findings, all on row 3. Pass 14's seven are cured as named (FN-05 cured for its four instances; the class is still open, FO-06). Every sweep exits 0. The new findings:

- **FO-01.** I7-G1 passes a seat transition written across lines (`transition:` then the size on the next line), the form `dock/styles/layer-group.css:354-355` uses, and a list that opens on another property.
- **FO-02.** E8-G4 passes Metric re-declaring `--radius-ctx` to a fixed rung, the form `styles/glass/overlay-plate.css:64` uses.
- **FO-03.** E4-G19 passes a `sideOffset` default written as `props.sideOffset ?? 4`, the default idiom of `progress/Progress.vue:40`.
- **FO-04.** E9-G7 and E7-G9 pass a Tailwind viewport variant (`max-sm:`) in LabeledField's template. W-E.9's own spec names `sm:`/`md:`/`lg:` variants as viewport keys, and `toast/Toaster.vue:84` writes them.
- **FO-05.** W-I.1 G18 passes the dock keying on `matchMedia("(pointer: fine)")`, the form `deck/composables/useEdgeZones.ts:40` uses.
- **FO-06.** `hold-line-claim.py`'s SIBLING arm is too narrow for its class. FO-01 to FO-05 are its missed instances.

## Sweeps, re-run

The plan read is fix-15's (in the tree at `70d2c10d`, committed as `1ce5202d`). Sweeps that take a tree read the crit-15 worktree.

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 -B reshape-order.py` | **0** | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | `python3 -B borrowed-red.py` | **0** | `rows 1, open 0, stale 0` |
| `inbound-fold.py` | `python3 -B inbound-fold.py` | **0** | `ids 37, open 0, stale 0` |
| `release-gates.py` | `python3 -B release-gates.py` | **0** | `waves 102, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | `python3 -B chronic-decided.py` | **0** | `members 51, ledger rows 825, L04 master rows 45, open 0` |
| `ledger-terminal.py` | `python3 -B ledger-terminal.py` | **0** | `ledger rows 825, open 0` |
| `hold-line-scope.py` | `python3 -B hold-line-scope.py` | **0** | `static hold lines with paths 2, open 0` |
| `fl6-plate-reads.py` | `python3 -B fl6-plate-reads.py <checkout>` | **0** | `reads 27, open 0` |
| `fail-open-gates.py` | `python3 -B fail-open-gates.py <worktree>` | **0** | `gate rows 730, fail-open rows run 124, docket rows 20, open 0` |
| `migration-values.py` | `python3 -B migration-values.py <worktree>` | **0** | `published tokens 902, props with defaults 109, candidates 52, open 0` |
| `pi-surface.py` | `python3 -B pi-surface.py <worktree>` | **0** | `component stylesheets 55, demo route mentions 487, manifest routes 80, open 0` |
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 589, open 0` (95 s) |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FO-06).** The SIBLING arm's four kinds (carrier, wrapper, family, token) are sound for what they enumerate. It does not enumerate: a declaration's layout (value on the next line) or its position in a list; the re-declaration of the one token the span allows; a default written in a script idiom other than `withDefaults`; a class-name variant that compiles to a media query; and a pointer query read through `matchMedia` or inverted. FO-01 to FO-05 are five instances. The sweep itself already knows the Tailwind case: its E5-G14 entry (`hold-line-claim.py:847`) names `sm:flex-col` as a viewport override.
- **The other twelve:** no missed instance found. `pi-surface.py` was spot-checked by listing every wave whose §4 touches a stylesheet and whose §6 is short or says "none": W-B.7 (comments only, §3 confirms) and W-I.5 (option (a) paints nothing, (b) carries D2's filmstrip). Both hold.

## Pass 14, re-verified

| id | verdict | reading here |
|---|---|---|
| FN-01 | cured | `layers.css:348` gated `:not([data-morphing])` is the cured base (W-0.12 G1 exit 0). `.glass-dock.collapsed .dock-layers .dock-run { width: 0 }` appended exits **1**. At HEAD G1 exits **1** (`layers.css:349`) |
| FN-02 | cured | Cured base: `LabeledField.vue:127` as `@container field (max-width: 36rem)`, `useTabResponsive.ts`'s hit lines stripped (E9-G7 exit 0). `const { matches } = useBreakpoint("(min-width: 640px)");` appended exits **1**. See FO-04 for another spelling |
| FN-03 | cured | Cured base: `styles.css:531`'s `min-block-size: calc(…)` deleted, `use.ts:85` reading `visualViewport` (E3-G9 exit 0). `block-size: max(var(--sheet-floor), calc(clamp(…) * 100dvh))` exits **1**; so does `calc(max(var(--sheet-floor), …))` |
| FN-04 | cured | Cured base: `metric/styles.css:123,142` read `var(--radius-ctx)` (E8-G4 exit 0). `.x { border-radius: var(--radius-panel); }` exits **1**. See FO-02 for another spelling |
| FN-05 | cured for its four instances; the class is open (FO-06) | the SIBLING arm runs and its 589 plants hold (exit 0). Five more instances below |
| FN-06 | cured | W-E.4 §3 item 11 names `var(--z-max)` and `--overlay-side-offset: 4px`; §7 rows at `W-E.4.md` (the `--z-toggle` row and the per-component `sideOffset` row, 4, 4, 4, 0, 0 → the token). `migration-values.py` exit 0 |
| FN-07 | cured | W-E.8 §6 carries `/data/metric`, both postures, light and dark, Chromium and Playwright WebKit, real Safari UNMEASURED, with the DELTA stated per corner. `pi-surface.py` exit 0 |

## Gates re-run at HEAD

**Static gates.** `gates.py` reads 730 gate rows. A runner in this seat's scratchpad ran every non-struck span that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names no `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…` or lower-case `<…>` placeholder; 4 at a time, 60 s cap, stdin closed, in the worktree.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 17/22 | 0 |
| A | 27/28 | 0 |
| B | 19/20 | 0 |
| C | 16/17 | 0 |
| D | 1/2 | 0 |
| E | 27/28 | 0 |
| F | 2/2 | 0 |
| G | 16/17 | 0 |
| H | 9/12 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 11/11 | 0 |
| L | 14/16 | 0 |

**Every band reads RED.** The exit-0 spans are the set pass 14 read, each one read again:
- labelled hold lines: W-0.1 G5, W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, D2-G5's second span, H6-G3's three spans, G-L3-9's two spans;
- the floor half of a born-RED row: W-0.8 G14;
- a printed value: C4-G7;
- state-dependent by its own cell: A1-G11;
- a prose fragment: E6-G8's `perl` span.

The runner's placeholder filter skips W-0.12 G1 (its awk contains `<style`); run alone it exits **1** (`layers.css:349`).

**BLOCKER families.**
- **F-01 (W-A.2).** A2-G3, A2-G6, A2-G7 and A2-G11 exit 1 (A2-G6's two prose spans exit 2 and 128).
- **F-68.** W-0.7 G2, G5 (its `dock-cap-rest` span) and G8 exit 1; G6 and G9 exit 128 (no `v10.2.0` tag). W-L.7 G-L7-1 and G-L7-4 exit 1. W-L.8 G-L8-2, G-L8-14 and G-L8-15 exit 1; G-L8-12 exits 128.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1.

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix-15's nine rewritten gates at HEAD:** W-0.12 G1 1, E9-G7 1, E3-G9 1, E8-G4 1, E4-G19 1, I7-G1 1, W-I.2 G10 1, W-I.1 G18 1, E7-G9 1.

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers. PLAN §3 has 102 wave rows; a script over their family cells (struck text removed) finds all 85, none missing, none extra. Every family with more than one holder has exactly one unqualified holder plus named splits (F-16, F-21, F-22, F-24, F-28, F-29, F-31, F-33, F-40, F-50, F-54, F-63, F-65, F-68), or splits only. Fix-15's two PLAN edits (the W-E.2 and W-I.7 rows) moved no family.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band reads RED (table above). Every BLOCKER gate that runs statically exits nonzero for its defect, and all nine rewritten gates exit 1. W-F.5's seven rows still sit in a two-column table `gates.py` skips; they are measured rows whose HEAD cell reads FAIL (`W-F.5.md`, §5), as pass 14 recorded.

## Row 3 · vacuous gates

Each plant below was appended to (or substituted into) a file in the worktree, the gate run, and the file restored.

### FO-01 · I7-G1 passes a seat transition the line-based grep cannot see

- **Where.** `waves/W-I.7.md:42`, I7-G1. The span is `grep -qnE 'transition(-property)?: *((min-|max-)?(inline-size|width|block-size|height)|flex(-basis)?)([^a-z-]|$)' run.css`. §3 item 1: "The seat's size transition appends to the control's own list (`transition: var(--icon-button-transition), inline-size …`)". The defect is a seat rule whose `transition` replaces the control's list.
- **Defect.** The grep matches only a size property on the same line as `transition:` and first in the list. Two spellings `src` writes in the same directory pass:
  - the value on the next line: `dock/styles/layer-group.css:354-355` (`transition:` then `width var(--spring-dock-duration) var(--spring-dock),`), and `shell.css:401-404`;
  - a list that opens on another property: `layer-group.css:259-261` (`transition: background …, color …`).
- **Evidence.** Cured base: `run.css:357,366,376,384` rewritten to `transition: var(--icon-button-transition), <axis> …` (I7-G1 exit 0). Plants appended to `run.css`:

  | plant | exit |
  |---|---:|
  | `.glass-dock .dock-run > .x { transition: inline-size 1s; }` (control) | 1 |
  | `.glass-dock .dock-run > .x { transition:` newline `inline-size var(--spring-dock-duration) var(--spring-dock); }` | **0** |
  | `.glass-dock .dock-run > .x { transition: background var(--dock-motion-fast), inline-size var(--spring-dock-duration) var(--spring-dock); }` | **0** |

  Both replace the control's list. Neither is in the CLAIMS entry (`hold-line-claim.py:673`).
- **Shape of a cure.** Read declarations, not lines (as W-0.12 G1's awk does), and fail any seat-rule `transition` or `transition-property` whose list names a size property and does not open with `var(--icon-button-transition)`. Add both plants to the CLAIMS entry.

### FO-02 · E8-G4 passes Metric re-declaring `--radius-ctx` to a fixed rung

- **Where.** `waves/W-E.8.md:68`, E8-G4. §3 item 5 (`:55`): "Every corner in that file reads `var(--radius-ctx)` and nothing else: no other rung, literal or fallback." The ledger row is "Metric cell radius ignores `--radius-ctx`" (`INBOUND-MAP.md:458`).
- **Defect.** The span checks only the right-hand side of each corner. A rule in `metric/styles.css` that sets `--radius-ctx` itself makes `var(--radius-ctx)` read a fixed rung, so the cell ignores its context again. `src` writes that declaration: `styles/glass/overlay-plate.css:64` (`--radius-ctx: var(--radius-card);`), `:115`, and `theme/radius.css:203`.
- **Evidence.** Cured base: `:123` and `:142` read `var(--radius-ctx)` (E8-G4 exit 0). Plants appended:

  | plant | exit |
  |---|---:|
  | `.x { border-radius: var(--radius-sm); }` (control) | 1 |
  | `.metric[data-posture="cell"] { --radius-ctx: var(--radius-card); }` | **0** |
  | `.metric { --radius-ctx: 16px; }` | **0** |

  The SIBLING token arm plants the other `--radius-*` rungs as corner values, not a re-declaration of the allowed token (`hold-line-claim.py:486`).
- **Shape of a cure.** Also fail any `--radius-ctx` declaration in `metric/styles.css`. Add the two plants.

### FO-03 · E4-G19 passes a `sideOffset` default written with `??`

- **Where.** `waves/W-E.4.md:95`, E4-G19. §3 item 11 (`:67`): "No component's `sideOffset` prop carries a default." The third arm is `! grep -rqE '(sideOffset|side-offset)["']? *[:=] *["']?[0-9]' src/components`.
- **Defect.** The arm fails only a digit right after `:` or `=`. `src` writes prop defaults in script as `props.x ?? N`: `progress/Progress.vue:40` (`props.max ?? 100`), `slider/Slider.vue:158-159`, `constellation/composables/useConstellation.ts:97-98`. The five popper components already pass `sideOffset: props.sideOffset` into reka (`SelectContent.vue:52`, `PopoverContent.vue:58`, …), so `?? 4` there is a one-token edit.
- **Evidence.** Cured base: `scheme-motion.css:215` as `var(--z-max)`, `--overlay-side-offset: 4px` declared in `tokens/offsets.css`, the five `sideOffset: N,` default lines deleted (E4-G19 exit 0). Plant in `SelectContent.vue`, `sideOffset: props.sideOffset,` → `sideOffset: props.sideOffset ?? 4,`: exit **0**. The control, `:root { --z-toggle: 999; }` appended to `scheme-motion.css`, exits 1. The CLAIMS entry (`hold-line-claim.py:420`) has no `??` plant.
- **Shape of a cure.** Fail `sideOffset` followed by `??` or `||` and a number, or require each popper's `sideOffset` to read the seam's one value. Add the plant.

### FO-04 · E9-G7 and E7-G9 pass a Tailwind viewport variant

- **Where.** `waves/W-E.9.md:69`, E9-G7 ("no viewport keys in the fold"), and `waves/W-E.7.md:78`, E7-G9 ("one width query"), both over `LabeledField.vue`.
- **Defect.** Both spans read `@media` text and script reads. A Tailwind breakpoint variant in a template class is a viewport media query that neither span reads.
  - W-E.9's own spec names this spelling as a viewport key: `W-E.9.md:17` ("32 story files carry `sm:`/`md:`/`lg:` variants"), `:31`, and `:49` (they "become Tailwind container variants on the cel").
  - `src` writes it: `toast/Toaster.vue:84` (`sm:bottom-0 …`), `:74` (`md:max-w-[420px]`); `configurator/Configurator.vue:351` calls `lg:border-l` "VIEWPORT utilities".
- **Evidence.** Cured base: the `@media (min-width|max-width:` lines of the four E7-G9 files rewritten as `@container field (…)`, `useTabResponsive.ts`'s hit lines stripped (E9-G7 exit 0, E7-G9 exit 0). Plant: `LabeledField.vue:35` `class="labeled-field"` → `class="labeled-field max-sm:grid-cols-1"`. E9-G7 exit **0**, E7-G9 exit **0**. Neither CLAIMS entry (`hold-line-claim.py:517`, `:475`) carries a class variant; the sweep's E5-G14 entry (`:847`) does, for another gate.
- **Shape of a cure.** Add `\b(max-)?(sm|md|lg|xl|2xl):` (the viewport variants, not the `@sm:` container ones) to both spans over the template, and plant it.

### FO-05 · W-I.1 G18 passes the dock reading `(pointer: fine)`

- **Where.** `waves/W-I.1.md:225`, G18 ("one pointer model"). §3 item 3 (`W-I.1.md`, §3): the dock's `(pointer: coarse)` re-declares "are replaced by the tokens W-E.7's coarse-pointer type model publishes". The span is `! git grep -nE '(any-)?pointer: *coarse|(any-)?hover: *none' -- src/components/dock`.
- **Defect.** The dock can key its own pointer model on the other value of the same feature. `src` writes it: `deck/composables/useEdgeZones.ts:40` (`window.matchMedia("(pointer: fine)").matches`), with `popover/Popover.vue:84` reading `(pointer: coarse)` through `matchMedia` the same way.
- **Evidence.** Cured base: the three hits (`touch-floor.css:24`, `density.css:378`, `index.css:141`) rewritten away from `pointer: coarse` (G18 exit 0). Plants:

  | plant | exit |
  |---|---:|
  | `export const coarse = () => !window.matchMedia("(pointer: fine)").matches;` in `dock/composables/useDockHold.ts` | **0** |
  | `@media not (pointer: fine) { .glass-dock { --x: 1; } }` in `density.css` | **0** |

  The CLAIMS entry (`hold-line-claim.py:648`) plants `pointer:coarse`, `any-pointer`, `hover: none` and `any-hover`, and no `fine`.
- **Shape of a cure.** Fail any pointer or hover query in `src/components/dock` that keys a size or density model (`pointer: *(coarse|fine)`, `hover: *none`, in CSS and in `matchMedia`), keeping the `(hover: hover)` effect gate green. Add both plants.

### FO-06 · `hold-line-claim.py`'s SIBLING arm is still narrower than its class

- **Where.** `formation-audit/sweeps/hold-line-claim.py:57-72` (docstring), `siblings` (`:1344`) and `sibling_arm` (`:1406`).
- **Defect.** The class (fix-15): a static gate must fail every spelling of its subject that `src` itself uses. The arm enumerates four kinds (carrier, wrapper, family, token). It does not enumerate:
  - a declaration split across lines, or a size that is not first in a `transition` list (FO-01);
  - a re-declaration of the one token the span allows (FO-02);
  - a default written as `props.x ?? N` (FO-03);
  - a class-name variant that compiles to a media query (FO-04), though the sweep names `sm:` at `:847`;
  - a pointer feature's other value, or a media feature read through `matchMedia` (FO-05).
- **Missed instances.** FO-01 to FO-05.
- **Shape of a cure.** Add the five as sibling kinds read from `src` (multi-line and list-position forms of every declaration a span greps by line; a declaration of each allowed token; `?? <number>` defaults on a named prop; `(max-)?(sm|md|lg|xl):` variants wherever a span reads `@media`; every value of a pointer or hover feature and its `matchMedia` form). The five instances become plants.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix-15's added visual claims each carry a surface: W-E.8 Metric (`W-E.8.md:77`), W-E.4's offset pair (`W-E.4.md:123`), W-I.7's vertical-dock hover (W-I.7 §6). W-E.4 states that `--z-toggle` has no surface in `src` or `demo` (`rg z-toggle src demo`: two lines, the token and the bridge), and §7 carries it.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. Fix-15 changed no LEDGER row; its §3 cures belong to rows already pointing at their gates (UIA-F-149 → E8-G4, `LEDGER.md:835`; UIA-V-676 and UIA-F-219 → E4-G19).

## Row 6 · loop pre-emption

No finding. W-I.7 stays a D2 loop wave (PLAN §4) and depends on `D2 gate, W-C.1, W-E.2` (PLAN §5); its §3 item 3 still lands in the converged run's patch, and fix-15's vertical arm is the same invariant on the other axis. Fix-15 edited no other loop wave's §3.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here: 102 §5 rows for 102 specs, none missing either way; a topological order of 102 (no cycle); 0 dangling ids; 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. W-E.4 §7 now rows `--z-toggle` and the five `sideOffset` defaults; W-0.1 and W-0.11 §7 row their token values. No alias was added.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave; W-I.7's vertical arm is C-8, the row W-I.7 already decides.

## Hardening notes (invented spellings; never make a pass unclean)

These spellings are this seat's. No spec names them, no CLAIMS entry lists them, and `src` has no instance.

- **E4-G19** passes `--z-index-toggle: 999` in `theme/bridges.css` (the bridge's name is in `src`, the literal on it is not), and `--z-toggle: 999` declared in a component stylesheet (`src` declares no `--z-*` outside `src/styles`).
- **E4-G19** passes a seam that never reads `--overlay-side-offset` once the defaults are gone (every popper at reka's 0). §6's offset pair would see it in paint.
- **E3-G9** passes `block-size: calc(max(12rem, clamp(0, var(--detent-t), 1) * 100dvh))`, a floor that neither opens with `max(` nor reads `--sheet-floor`. `rg 'calc\(\s*max\(' src` finds no such size.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as pass 14 read.
- **W-0.7 G6, G9 and G-L8-12** exit 128 (no `v10.2.0` tag), as passes 13 and 14 read.
- **Fix-15's open items stand:** real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the SIBLING arm reads static S entries only; the ROUTE arm does not check fixture scenes.
