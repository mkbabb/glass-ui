# BL — formation audit, pass 16

| field | value |
|---|---|
| seat | formation critic, pass 16. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-15, fixes 2-16 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fe3f8cfe`. The seat opened at `85fe6200` with fix-16's files modified in the tree; fix 16 was committed as `dda08a85` while it read, and two design-loop commits followed. `git diff 85fe6200 HEAD -- src tests tests-visual demo` is 0 lines, so no probe reading differs. `git diff -U0 b58c5357 HEAD -- docs/tranches/BL/waves` has 10 hunks, all on the gate rows and §3 lines fix-16 names |
| inputs read | `PLAN.md` §3 and §5 by script; `audit/REGISTRY.md` by family-header count; the fix-16 gate rows of W-I.7, W-E.8, W-E.4, W-E.3, W-E.9, W-E.7, W-H.1, W-I.1; W-E.4 §3 item 11, W-E.8 §3 item 5, W-H.1 §2 and §3 item 3, W-E.7 §2, W-I.1 §2 and §3 item 3; `hold-line-claim.py`'s docstring and the CLAIMS entries of the eight gates; `formation-audit/pass-15.md`; `formation-audit/fix-16.md` last; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-16/wt` at `85fe6200`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Real-Safari cells are UNMEASURED (OW-3). No timing cell was read |
| fences | no source edit in the checkout, no git write in the checkout, nothing under `design/` read, run or written, no sibling repo touched. Every plant was restored by writing the file's original text back; `git status --short` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-16` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FP-01 to FP-05) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Five findings, all on row 3. Pass 15's six are cured as named (FO-06 cured for its instances; the class is still open, FP-05). Every sweep exits 0. The new findings:

- **FP-01.** W-H.1 G15 passes a Close ring written as a relative color with a literal alpha (`oklch(from var(--foreground) l c h / 0.48)`, the form of `card/styles.css:161`) and a ring carried through a custom property holding the literal mix (the form of `tokens/sizing.css:249`).
- **FP-02.** E7-G9 passes `window.innerWidth` in Progress.vue, the viewport read `src` writes at `sheet/detents/use.ts:85`. E9-G7 already fails the same read on the same file (LabeledField.vue is in both spans).
- **FP-03.** W-I.1 G18 passes the dock keying its pointer model on `"ontouchstart" in window`, the form of `composables/dom/useTouchGate.ts:63`.
- **FP-04.** E8-G4 passes a Tailwind corner class on Metric's root (`rounded-card`, the form of `select/SelectContent.vue:84`).
- **FP-05.** `hold-line-claim.py`'s SIBLING arm is still narrower than its class. FP-01 to FP-04 are its missed instances.

## Sweeps, re-run

The plan read is fix-16's (in the tree at `85fe6200`, committed as `dda08a85`). Sweeps that take a tree read the crit-16 worktree.

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 617, open 0` (68 s) |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FP-05).** Fix-16's seven form kinds are sound for what they enumerate. The arm still does not enumerate: a color share written as a relative color's alpha instead of a `color-mix` percentage; a custom property that carries the defect value and is then read (the `carrier` kind reads co-written classes, not custom properties); script reads of the viewport other than `matchMedia` and its wrapper (`innerWidth`); touch-capability tests that stand in for a pointer query; and a Tailwind utility that writes the gated property (the `variant` kind reads breakpoint prefixes only). FP-01 to FP-04 are four instances.
- **The other twelve:** no missed instance found.

## Pass 15, re-verified

Each cure was read on a cured base built in the worktree (the gate's HEAD hits rewritten to the spec's §3 form, gate exit 0), then pass 15's own plants appended one at a time.

| id | verdict | reading here |
|---|---|---|
| FO-01 | cured | I7-G1. Base: `run.css:357,366,376,384` as `transition: var(--icon-button-transition), <axis> …` (exit 0). The value-on-next-line plant exits **1**; the list opening on `background` exits **1**. HEAD: exit 1 |
| FO-02 | cured | E8-G4. Base: `metric/styles.css:123,142` as `var(--radius-ctx)` (exit 0). `--radius-ctx: var(--radius-card)` under the cell posture exits **1**; `--radius-ctx: 16px` exits **1**. HEAD: exit 1. See FP-04 for another spelling |
| FO-03 | cured | E4-G19. Base: `--z-toggle: var(--z-max)`, `--overlay-side-offset: 4px` in `tokens/offsets.css`, the five `sideOffset: N,` lines deleted (exit 0). `sideOffset: props.sideOffset ?? 4` in `SelectContent.vue` exits **1**. HEAD: exit 1 |
| FO-04 | cured | E9-G7 base: `LabeledField.vue:127` as `@container field (…)`, `useTabResponsive.ts`'s viewport lines stripped (exit 0). E7-G9 base: the five `@media` width lines as `@container` (exit 0). `class="labeled-field max-sm:grid-cols-1"` exits **1** on both. See FP-02 for another spelling on E7-G9 |
| FO-05 | cured | G18. Base: `touch-floor.css:24` and `density.css:378` as `(hover: hover)`, the `index.css:141` comment reworded (exit 0). `!window.matchMedia("(pointer: fine)").matches` in `useDockHold.ts` exits **1**; `@media not (pointer: fine)` in `density.css` exits **1**. See FP-03 for another spelling |
| FO-06 | cured for its five instances and the two fix-16 found (E3-G9, W-H.1 G15); the class is open (FP-05) | the sweep's 617 plants hold (exit 0). Four more instances below |

## Gates re-run at HEAD

**Static gates.** A runner in this seat's scratchpad read every non-struck §5 span through `gates.py` (spans come back rendered) and ran each that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names no `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…` or lower-case `<…>` placeholder; 4 at a time, 60 s cap, stdin closed, in the worktree.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 17/22 | 0 |
| A | 30/31 | 0 |
| B | 20/21 | 0 |
| C | 19/20 | 0 |
| D | 4/5 | 0 |
| E | 28/29 | 0 |
| F | 2/2 | 0 |
| G | 16/17 | 0 |
| H | 9/12 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 13/13 | 0 |
| L | 16/18 | 0 |

**Every band reads RED.** The exit-0 spans are the set passes 14 and 15 read, each one read again: the labelled hold lines (W-0.1 G5, W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, D2-G5, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a printed value (C4-G7); state-dependent by its own cell (A1-G11); a prose fragment (E6-G8's `perl`). No new exit-0 span.

**The filtered BLOCKER spans, run alone:** W-0.12 G1 (awk with `<style`) exits **1**; W-0.7 G8, W-L.7 G-L7-1 and G-L7-4 (outbox loops) each exit **1**.

**BLOCKER families.**
- **F-01 (W-A.2).** A2-G3, A2-G6, A2-G7 and A2-G11 exit 1 (A2-G6's two prose spans exit 2 and 128).
- **F-68.** W-0.7 G2, G5 and G8 exit 1; G6 and G9 exit 128 (no `v10.2.0` tag). W-L.7 G-L7-1 and G-L7-4 exit 1. W-L.8 G-L8-2, G-L8-14 and G-L8-15 exit 1; G-L8-12 exits 128.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1.

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix-16's eight rewritten gates at HEAD:** I7-G1 1, E8-G4 1, E4-G19 1, E3-G9 1, E9-G7 1, E7-G9 1, W-H.1 G15 1, G18 1.

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers. A script over PLAN §3's 102 wave rows (struck text removed) finds all 85, none missing, none extra. Fix 16 changed no PLAN line.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band reads RED (table above); every BLOCKER gate that runs statically exits nonzero for its defect; all eight rewritten gates exit 1.

## Row 3 · vacuous gates

Each plant below was appended to (or substituted into) a file in the worktree on the gate's cured base, the gate's span run, and the file restored. A control plant (the defect in a spelling the gate already names) was run with each to show the base is live.

### FP-01 · W-H.1 G15 passes a relative-color share and a carried share

- **Where.** `waves/W-H.1.md:162`, G15 ("the Close ring is the rung"). §2 (`:40`): "The Dialog Close ring is a hand literal, `color-mix(in oklab, var(--foreground) 48%, transparent)` … outside `--ink-perimeter`." §3 item 3 (`:87`): "read the ring token; no hand literal remains." The span is `! rg -nU --pcre2 '(?<![\w-])(?:outline|box-shadow)[a-z-]*\s*:[^;{}]*var\(--foreground\)\s*[0-9.]+%' src/components/dialog`.
- **Defect.** The span reads one spelling of a literal foreground share: a `color-mix` percentage written on the `outline` or `box-shadow` declaration itself. `src` writes the same hand literal two other ways:
  - a relative color with a literal alpha, in a `box-shadow`: `card/styles.css:161` (`box-shadow: var(--card-cast), 0 0 8px oklch(from var(--foreground) l c h / 0.15);`), and `styles/glass/material.css:217`;
  - the literal mix on a custom property that a rule then reads: `tokens/sizing.css:249` (`--dock-selected-accent: color-mix(in oklab, var(--foreground) 14%, transparent);`), `tokens/glass-fx.css:122`, `tokens/glass.css:218`.
- **Evidence.** Cured base: both `color-mix(in oklab, var(--foreground) 48%, transparent)` occurrences in `dialog/styles.css` as `var(--ink-perimeter)` (G15 exit 0). Plants appended to `dialog/styles.css`:

  | plant | exit |
  |---|---:|
  | `.x { outline: 2px solid color-mix(in oklab, var(--foreground) 40%, transparent); }` (control) | 1 |
  | `.x { outline: 2px solid oklch(from var(--foreground) l c h / 0.48); }` | **0** |
  | `.x { box-shadow: 0 0 0 2px oklch(from var(--foreground) l c h / 48%); }` | **0** |
  | `.x { --dialog-close-ring: color-mix(in oklab, var(--foreground) 48%, transparent); outline: 2px solid var(--dialog-close-ring); }` | **0** |

  Each is the same 48 % hand literal outside `--ink-perimeter`. The CLAIMS entry (`hold-line-claim.py:614-620`) plants only `color-mix` forms on the declaration.
- **Shape of a cure.** Fail a literal alpha in a relative color of `--foreground` (`from var(--foreground) … / <number>`) as the percentage is failed, and fail any custom property declared in `src/components/dialog` whose value mixes `--foreground` by a literal; or invert the gate to require the Close ring's `outline*` and `box-shadow` values to read `--ink-perimeter`. Add the three plants.

### FP-02 · E7-G9 passes a `window.innerWidth` read

- **Where.** `waves/W-E.7.md:78`, E7-G9 ("one width query"). Its pass cell: "no viewport key in the four files in any spelling `src` writes … a script read through `matchMedia` or the library's wrapper … fail as `@media` does." §2 (`:44`): "Local width queries that key density on the viewport, not the seat."
- **Defect.** The script arm reads `matchMedia`, `useMediaQuery` and `useBreakpoints?` only. `src` reads the viewport width directly: `sheet/detents/use.ts:85` (`window.innerWidth : window.innerHeight`), `constellation/composables/useConstellation.ts:357`. E9-G7, over the same `LabeledField.vue`, already fails `innerWidth`, so one file answers two gates differently.
- **Evidence.** Cured base: the five `@media` width lines of the four files as `@container field (…)` (E7-G9 exit 0). Plants in `Progress.vue`'s `<script setup>`:

  | plant | exit |
  |---|---:|
  | `const narrow = window.matchMedia("(max-width: 768px)").matches;` (control) | 1 |
  | `const narrow = window.innerWidth < 768;` | **0** |

  For comparison, E9-G7 on its own cured base with `const n = window.innerWidth < 576;` in `LabeledField.vue` exits 1. The CLAIMS entry (`hold-line-claim.py:497`) carries no `innerWidth` plant.
- **Shape of a cure.** Give E7-G9 E9-G7's script arm (`innerWidth`, `visualViewport`, `screen.width`, `documentElement.clientWidth`, `useWindowSize`, and the reads it already has). Add the plant.

### FP-03 · W-I.1 G18 passes a dock keyed on `"ontouchstart" in window`

- **Where.** `waves/W-I.1.md:225`, G18 ("one pointer model"). §2 (`:45`): "Two engines, two pointer models … the mobile scale is re-declared only under `@media (pointer: coarse)`." §3 item 3 (`:174`): the dock's re-declares "are replaced by the tokens W-E.7's coarse-pointer type model publishes."
- **Defect.** The span reads `pointer` and `hover` queries only. `src` writes a second way to key a touch model: `composables/dom/useTouchGate.ts:63` (`const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;`), exported from `src/index.ts:449`. A dock composable that reads it, or writes the same test, keeps its own pointer model.
- **Evidence.** Cured base: `touch-floor.css:24` and `density.css:378` as `@media (hover: hover)`, the `index.css:141` comment reworded (G18 exit 0). Plants appended to `dock/composables/useDockHold.ts`:

  | plant | exit |
  |---|---:|
  | `export const coarse = () => window.matchMedia("(pointer: coarse)").matches;` (control) | 1 |
  | `export const coarse = () => typeof window !== "undefined" && "ontouchstart" in window;` | **0** |

  The CLAIMS entry (`hold-line-claim.py:686`) has no touch-capability plant.
- **Shape of a cure.** Also fail `ontouchstart`, `maxTouchPoints` and `useTouchGate`/`isTouchDevice` in `src/components/dock`. Add the plant.

### FP-04 · E8-G4 passes a Tailwind corner class on Metric

- **Where.** `waves/W-E.8.md:68`, E8-G4. The ledger row is "Metric cell radius ignores `--radius-ctx`" (UIA-F-149). §3 item 5 (`:55`) states the cure for `metric/styles.css`.
- **Defect.** The span reads `metric/styles.css` only. Metric's root takes its class list in `Metric.vue:51` (`cn('metric', $props.class)`), and `src` writes component corners as theme-token utilities in exactly that place: `select/SelectContent.vue:84` (`… overflow-hidden rounded-card …`), with `rounded*` classes in nine more component templates (`rg -c 'rounded' src/components --glob '*.vue'`). A corner class on the root pins the cell to a fixed rung, so the cell ignores `--radius-ctx` again.
- **Evidence.** Cured base: `metric/styles.css:123,142` as `var(--radius-ctx)` (E8-G4 exit 0).

  | plant | exit |
  |---|---:|
  | `.x { border-radius: var(--radius-sm); }` in `styles.css` (control) | 1 |
  | `cn('metric', $props.class)` → `cn('metric rounded-card', $props.class)` in `Metric.vue` | **0** |

- **Shape of a cure.** Extend the span to `src/components/metric/*.vue` and fail a `rounded` utility (`(?<![\w-])rounded(?:-[\w\[\]()-]+)?`) there. Add the plant.

### FP-05 · `hold-line-claim.py`'s SIBLING arm is still narrower than its class

- **Where.** `formation-audit/sweeps/hold-line-claim.py:57-88` (docstring), `siblings` and `sibling_arm`.
- **Defect.** The class (fix-15, fix-16): a static gate must fail every spelling of its subject that `src` itself uses. The arm now enumerates eleven kinds. It does not enumerate:
  - a share written as a relative color's alpha where the span reads a `color-mix` percentage (FP-01);
  - a custom property that carries the defect value and is read by the gated property; the `carrier` kind reads co-written classes only (FP-01);
  - viewport reads in script other than `matchMedia` and its wrapper; the `wrapper` and `matchmedia` kinds stop there (FP-02);
  - a touch-capability test standing in for a pointer query; the `value` kind reads query values only (FP-03);
  - a Tailwind utility that writes the gated property in a template beside the stylesheet the span reads; the `variant` kind reads breakpoint prefixes only (FP-04).
- **Missed instances.** FP-01 to FP-04.
- **Shape of a cure.** Add the five as kinds read from `src`: relative-color alpha forms of every mix a span reads; custom properties whose declared value matches the span's defect regex; `innerWidth`/`visualViewport`/`screen.width`/`clientWidth` wherever a span reads `matchMedia`; `ontouchstart`/`maxTouchPoints` wherever a span reads `pointer`; and the Tailwind utility family of each gated property (`rounded*` for radius) over the component's templates. The four instances become plants.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 16's §3 edits (W-E.4 item 11, W-E.8 item 5) add no visual claim: both state that a token is declared once.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. Fix 16 changed no LEDGER row; its cures widen gates rows already point at (UIA-F-149 → E8-G4, UIA-V-676 and UIA-F-219 → E4-G19, A2-FO-L3-7 → E9-G7, C-8 → I7-G1, O-81 (3) → G18).

## Row 6 · loop pre-emption

No finding. Fix 16 edited gate rows and two §3 sentences outside any loop wave's scope; no loop wave's §3 changed.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here: 102 §5 rows for 102 specs; a topological order of 102 (no cycle); 0 dangling ids; 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 16 adds no break: `--z-max` keeps its value and its one declaration; the `sideOffset` change was already rowed in W-E.4 §7.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

These spellings are this seat's. No spec of the gate names them, no CLAIMS entry lists them, and `src` has no instance.

- **E7-G9** passes `const { width } = useWindowSize();` in `Progress.vue` (exit 0 on the cured base). `rg useWindowSize src` finds nothing; W-E.9 and W-E.3 name it, W-E.7 does not. FP-02's cure covers it.
- **E4-G19** still passes a seam that never reads `--overlay-side-offset` once the defaults are gone, as pass 15 noted; §6's offset pair reads it in paint.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as passes 14 and 15 read.
- **W-0.7 G6, G9 and G-L8-12** exit 128 (no `v10.2.0` tag), as passes 13 to 15 read.
- **Fix-16's open items stand:** real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the SIBLING arm reads static S entries only; the ROUTE arm does not check fixture scenes.
