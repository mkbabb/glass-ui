# BL — formation fix, seat 17

| field | value |
|---|---|
| seat | formation fix seat 17, before audit pass 17. Answers `formation-audit/pass-16.md` (FP-01 to FP-05) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a115850c`. `git diff --stat 0dd061c1 a115850c -- src docs/tranches/BL/waves docs/tranches/BL/PLAN.md docs/tranches/BL/LEDGER.md docs/tranches/BL/formation-audit` is empty, so `src` and the plan are the tree pass 16 banked |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-17/wt` at `a115850c`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). No build, no browser, no dev server. Every sweep plant was undone: `git status --short` in the worktree read 0 lines after every run. The worktree is removed (`git worktree list \| grep -c fix-17` → 0). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-E.3`, `W-E.7`, `W-E.8`, `W-E.9`, `W-H.1`, `W-I.1`, `W-I.7` (one §5 row each; two in W-I.7); under `formation-audit/sweeps/`: `hold-line-claim.py` (five new SIBLING kinds and their plants) and a `# ===== fix-17` section on every `.out`; this file. `PLAN.md` and `LEDGER.md` need no change (below). The plan has no `MIGRATION.md` |
| inherited work | the session limit cut an earlier fix-17 seat short. It left `hold-line-claim.py` modified in the checkout (the five kinds, `span_regexes`, `UTILITY`, `VIEWREAD`, `TOUCH`, and the pass-16 plants) and no wave edit. This seat read that diff in full, kept it, added 7 plants, cured the gates, and ran every number below itself |
| fences | nothing under `design/` read, run or written. No git write in the checkout. No sibling repo touched. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FP-01 to FP-05 | a static gate passes a spelling of its subject that `src` writes, where the spelling is a form the eleven fix-16 kinds do not read: a relative-color alpha, a value carried on a custom property, a script viewport read other than `matchMedia`, a touch-capability test, a Tailwind utility of the gated property | `hold-line-claim.py`, SIBLING arm extended | **exit 1**: 21 SIBLING in 8 gates (enumeration alone); 30 NARROW in 8 gates once the plants are in (plan at `a115850c`) | **exit 0**, open 0, plants 658 |

Pass 16 named four gates. The sweep found the same class in four more: **E3-G9** (a viewport read in a sheet file other than `use.ts`; a floor carried on a custom property), **E9-G7** (`innerHeight`, though its `@media` arm reads `height`), **I7-G1** (a seat transition carried on a custom property; `transition-all` and `transition-[inline-size]` in a dock template) and **I7-G3** (a Tailwind padding utility carrying the reserve; a `padding*` declaration in another dock stylesheet, value on the next line).

The other twelve sweeps exit 0 on the plan fix-17 leaves, with the summary lines pass 16 recorded: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), `migration-values.py <worktree>` (candidates 52), `pi-surface.py <worktree>` (manifest routes 80). `gates.py` and `plan_dag.py` exit 0. Every table in the 7 edited specs has a constant column count (script).

**The eight rewritten gates at HEAD**, run in the worktree from their rendered spans, each exit **1** on the live defect, on the same lines as before the widening:

| gate | file:line | HEAD hits |
|---|---|---|
| W-H.1 G15 | `waves/W-H.1.md:162` | `dialog/styles.css:144`, `:243` |
| E7-G9 | `waves/W-E.7.md:78` | `LabeledField.vue:127`, `sheet/styles.css:483`, `segmented.css:115,308`, `Progress.vue:149` |
| E9-G7 | `waves/W-E.9.md:69` | `LabeledField.vue:127`, `useTabResponsive.ts:13,34,62,100,105` |
| E8-G4 | `waves/W-E.8.md:68` | `metric/styles.css:123`, `:142` (the utility arm passes at HEAD) |
| E3-G9 | `waves/W-E.3.md:69` | `sheet/styles.css:531` (and `use.ts:85` in the viewport arm) |
| W-I.1 G18 | `waves/W-I.1.md:225` | `touch-floor.css:24`, `density.css:378`, `index.css:141` |
| I7-G1 | `waves/W-I.7.md:42` | `run.css:357,366,376,384` |
| I7-G3 | `waves/W-I.7.md:44` | `run.css:251`, `:310` |

None is GREEN, so none is removed.

## The class and the sweep

**Why fix-16's arm missed it.** Fix-16's kinds read forms of one declaration on the gated property: its layout, its list position, a re-declared token, a default, a class variant, a `matchMedia` string. Each pass-16 instance moves the defect off that declaration: into a relative color, onto a custom property read back later, into a script read that is not a media query, into a capability test, or into a class list.

**The arm** (`hold-line-claim.py`: docstring `:85-102`; `UTILITY`, `VIEWREAD`, `TOUCH` `:1371-1380`; `_src` reads `relalpha`, `carriers`, `viewreads`, `touch`; `span_regexes` `:1477`; the five kinds in `siblings` from `:1616`; their shapes in `SHAPED` from `:1668`). Five new kinds, each enumerated from `src` at run time:

| kind | enumerated when | carried by |
|---|---|---|
| relalpha | the span reads a literal share of a token and `src` writes a share as `from var(--t) … / n` | a red or green plant with `from var(--t) … / n` |
| carried | `src` declares a custom property whose value the span's own regex fails on a property the span reads | a plant that declares a custom property and reads it back |
| viewread | the span reads the viewport over a script file, or names one script viewport read | a plant with each of `innerWidth`, `innerHeight`, `visualViewport`, `screen.*`, `documentElement.client*`, `useWindowSize` that `src` writes |
| touch | the span reads `pointer` or `hover` over a script file | a plant with `ontouchstart`, `maxTouchPoints` or `useTouchGate` |
| utility | the span reads a property family and a component directory it reads holds a template | a plant with that family's Tailwind utility (`rounded*`, `ring*`/`shadow*`, `transition*`, `p*-`, `w-`/`h-`) |

**Before (1), enumeration alone** (`hold-line-claim.out`, `# ===== fix-17`): 21 SIBLING lines in E3-G9 (2), E7-G9 (2), E8-G4 (2), E9-G7 (1), H1 G15 (7), G18 (2), I7-G1 (4), I7-G3 (1).

**Before (2), the plants on the HEAD plan** (`BL_ROOT` = `git archive HEAD` of the plan folder): **exit 1**, open 30, all NARROW, in the eight gates.

**After:** **exit 0**, open 0, in-scope static gates 137, plants 658.

The first after-run listed 4 NOUN lines: the pass cells this seat wrote name `screen.width` and `documentElement.clientWidth` (E7-G9), `screen.height` and `documentElement.clientHeight` (E9-G7), and no plant carried them. The seat added a red plant for each (and `visualViewport` and `outerWidth`), and a green `rounded-(--radius-ctx)` for E8-G4's allowance. Then the sweep exited 0.

## Per finding

**FP-01 · cured.** `waves/W-H.1.md:162`, G15.
- Three arms over `src/components/dialog`. First, an `outline*` or `box-shadow` declaration with a literal `--foreground` share, written either as a `color-mix` percentage or as a relative color's alpha (`from var(--foreground) … / n`). Second, any custom property whose value carries either form. Third, a `ring-`, `shadow-` or `outline-` utility that names `--foreground`.
- HEAD's two `background` mixes (`styles.css:131,137`) are not hit: they are not ring properties, and they sit on no custom property.
- Plants (`hold-line-claim.py:652` entry), all red: `oklch(from var(--foreground) l c h / 0.48)` on `outline`, `/ 48%` on `box-shadow`, the mix and the relative alpha each carried on `--dialog-close-ring`, `outline-color` with the mix, `ring-foreground/48`, and an arbitrary `shadow-[…var(--foreground)_48%…]`. Green: `ring-(--ink-perimeter)` and `outline-offset: 2px`.

**FP-02 · cured.** `waves/W-E.7.md:78`, E7-G9.
- The script arm now reads the set E9-G7 reads: `useWindowSize`, `inner`/`outer` width and height, `visualViewport`, `screen.(avail)width`/`height`, `documentElement.clientWidth`/`clientHeight`. The span keeps `-i`.
- Plants (`:521` entry), all red: `window.innerWidth < 768`, `innerHeight`, `useWindowSize()`, `screen.width`, `documentElement.clientWidth` and `visualViewport.width` in `Progress.vue`.
- E9-G7 (`waves/W-E.9.md:69`) gets the height half of the same set (the sweep's `viewread` instance). Plants (`:582` entry): `innerHeight`, `screen.height`, `documentElement.clientHeight` and `outerWidth` in `useTabResponsive.ts`, all red. LabeledField.vue now answers both gates the same way.

**FP-03 · cured.** `waves/W-I.1.md:225`, G18.
- The span adds `ontouchstart`, `maxTouchPoints`, `useTouchGate` and `isTouchDevice` over `src/components/dock`. `src/components/dock` has none of them at HEAD (`rg` read 0 hits), so HEAD's hits are unchanged.
- Plants (`:734` entry), all red, in `useDockHold.ts`: `"ontouchstart" in window`, `navigator.maxTouchPoints > 0`, and an import of `useTouchGate`. Green: `(hover: hover)`.

**FP-04 · cured.** `waves/W-E.8.md:68`, E8-G4.
- A third clause fails any `rounded` utility in a `.vue` or `.ts` file of `src/components/metric`, with or without a variant prefix, except `rounded-(--radius-ctx)`. `src/components/metric` has no `rounded` at HEAD.
- Plants (`:545` entry): `cn('metric rounded-card', $props.class)` in `Metric.vue` and `rounded-(--radius-sm)` in `MetricRow.vue` are red. `rounded-(--radius-ctx)` is green. The carried form (`--cell-r: var(--radius-card); border-radius: var(--cell-r)`) was already red through the corner arm, which allows only `var(--radius-ctx)`.

**FP-05 · cured.** See "The class and the sweep". The four instances pass 16 did not name are cured the same way:
- **E3-G9** (`waves/W-E.3.md:69`). The floor arm adds any custom property whose value opens with `max(`/`clamp(` or reads `--sheet-floor`. The viewport arm moves from `use.ts` to all of `src/components/sheet` and adds `outer*`. Red: `window.innerHeight` in `SheetContent.vue`, `min-w-[40vw]`, `--sheet-span: max(12rem, 30dvh)` read back, `--x: var(--sheet-floor)` read back. Green: HEAD's `--sheet-seam-width: 1px`, and §3 item 3's cure (`visualViewport` span plus `setProperty("--sheet-floor", …)`).
- **I7-G1** (`waves/W-I.7.md:42`). In `run.css`, a custom property whose value is a seat-size transition (a size followed by a duration or `var(`) now fails. A second clause fails `transition-all` and a `transition-[…]` that names a size in the `.vue` and `.ts` files of `src/components/dock`. Red: `--seat-transition: inline-size …` read by `transition`, `transition-[inline-size]`, `transition-all`. Green: `w-8 h-8 transition-colors`, and §3 item 1's appended form.
- **I7-G3** (`waves/W-I.7.md:44`). Was `grep -qE` over `run.css`, line-based. It is now `rg -nU --pcre2` over all of `src/components/dock`: a `padding*` declaration that reads `--dock-ring-reserve`, read as a declaration, or a `p*-` utility that carries it. Red: `px-(--dock-ring-reserve)`, `py-[var(--dock-ring-reserve)]`, `padding-block:` with the reserve on the next line in `layers.css`. Green: `outline-offset: var(--dock-ring-reserve)`, HEAD's `margin-block: calc(-1 * var(--dock-ring-reserve))`. The pass cell was a bare `exit 0`; it now states the claim.

**What the arm still cannot see.**
- **The carried form in one direction only.** The `carried` kind reads a custom property declared in the gated scope. A ring that reads a token declared elsewhere in `src` and carrying a foreground share (for example `outline: var(--dock-selected-accent)` in a dialog rule) passes G15. Catching it would need the gate to resolve tokens across `src`, so it is left open, not guessed at.
- **A measured gate's subject.** The arm reads static S entries only, as before.

## Sources that disagreed

E7-G9 and E9-G7 read `LabeledField.vue` with different script arms (pass 16 FP-02). Both are now the same set. There is no duplicate copy to strike: each gate owns a different file set, and E7-G9's pass cell says it is "the same set as E9-G7". No other disagreement was found.

## Ledger and PLAN

No row changed. The cures widen gates that rows already point at: UIA-F-149 → E8-G4, A2-FO-L3-7 → E9-G7, C-8 → W-I.7, O-81 (3) → G18. E3-G9, E7-G9 and W-H.1 G15 widen inside their own waves' scope. No family moved and no wave was added. `ledger-terminal.py` and `chronic-decided.py` exit 0.

## Open

- Real Safari: UNMEASURED (OW-3).
- `hold-line-scope.py` still does not cover born-RED gates (fix-13's reason).
- W-0.12's per-frame strip has no formation reading.
- The ROUTE arm does not check fixture scenes.
- G15 does not resolve a ring token declared outside `src/components/dialog` (above).
- G-L7-6's upper-case placeholder (exit 2) and the three `v10.2.0`-tag gates (exit 128) stand, as passes 13 to 16 read them.
