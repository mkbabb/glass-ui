# BL — formation fix, seat 16

| field | value |
|---|---|
| seat | formation fix seat 16, before audit pass 16. Answers `formation-audit/pass-15.md` (FO-01 to FO-06) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b58c5357` (pass 15 banked). `git diff --stat 1ce5202d b58c5357 -- src tests tests-visual demo` is empty, so `src` is the tree pass 15 read |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-16/wt` at `b58c5357`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). No build, no browser, no dev server. Every sweep plant was undone: `git status --short` in the worktree read 0 lines after every run. The worktree is removed (`git worktree list \| grep -c fix-16` → 0). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-E.3`, `W-E.4`, `W-E.7`, `W-E.8`, `W-E.9`, `W-H.1`, `W-I.1`, `W-I.7`; under `formation-audit/sweeps/`: `hold-line-claim.py` (seven new SIBLING kinds and the plants they require) and a `# ===== fix-16` section on every `.out`; this file. `PLAN.md` and `LEDGER.md` need no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written (`design/dock/harness/scenes.mjs` shows as modified in the checkout; another seat wrote it). No git write in the checkout. No sibling repo touched. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FO-01 to FO-06 | a static gate passes a spelling of its subject that `src` writes, where the spelling is a **form** (layout, list position, token re-declaration, script default, class variant, `matchMedia` read, a feature's other value), not a name | `hold-line-claim.py`, SIBLING arm extended | **exit 1**: 18 SIBLING in 8 gates (enumeration alone); 23 NARROW in 8 gates once plants were added (plan at `b58c5357`) | **exit 0**, open 0, plants 617 |

Pass 15 named five gates. The sweep found the same class in two more: **E3-G9** (the floor arm allows `var(--touch-target)`, and nothing stops the sheet re-declaring it) and **W-H.1 G15** (a line-based `git grep` over `box-shadow`, which `src` writes with its value on the next line 23 times). E7-G9 also had two more instances beyond the variant pass 15 named: a `matchMedia` width read and the `useBreakpoint` wrapper.

The other eleven sweeps exit 0 on the plan fix-16 leaves, with the same summary lines pass 15 recorded: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), `migration-values.py <worktree>` (candidates 52), `pi-surface.py <worktree>` (manifest routes 80). `gates.py` and `plan_dag.py` exit 0. Every table in the 8 edited specs has a constant column count (script).

**The eight rewritten gates at HEAD**, run in the worktree from their rendered spans: W-I.7 I7-G1, W-E.8 E8-G4, W-E.4 E4-G19, W-E.3 E3-G9, W-E.9 E9-G7, W-E.7 E7-G9, W-H.1 G15 and W-I.1 G18 each exit **1** on the live defect. None is GREEN, so none is removed.

## The class and the sweep

**Why fix-15's arm missed it.** The SIBLING arm enumerated *names* `src` uses for a subject (a co-class, a wrapper, a property, a token). Each of pass 15's five instances is a *form*: the same name, written in a shape the gate's regex does not read. NOUN and the name kinds cannot see a form.

**The arm** (`hold-line-claim.py`, docstring `:57-88`; `_src` `:1347-1356`; `siblings` `:1442-1489`; `SHAPED` before `sibling_arm`). `_src` now also reads, from `src` at run time: properties declared with the value on the next line; comma-list declarations; every `(pointer|hover: value)` in CSS and script; features read through `matchMedia`; Tailwind viewport variants in script and template; and `props.x ?? n` defaults. Seven new kinds:

| kind | enumerated when | carried by |
|---|---|---|
| split | a touched-family property `src` writes as `prop:` then newline | a red or green plant with `prop:` then newline |
| listpos | a touched-family comma-list property (`transition`, `box-shadow`, …) `src` writes as a list | a plant whose list opens on something other than `var(` and has a top-level comma |
| redeclare | a token inside a `(?!…)` allow-list that `src` declares | a plant declaring `--t:` |
| default | a camelCase prop the span forbids a numeric default on, while `src` writes `props.x ?? n` | a plant with `name ?? n` or `name \|\| n` |
| variant | the span reads the viewport over a file that holds script or template | a plant with that `bp:` class |
| matchmedia | the span reads a feature in CSS, does not name `matchMedia`, and `src` reads that feature through `matchMedia` | a plant with `matchMedia("(feature…` |
| value | the span reads `pointer` or `hover` | a plant with each `(feature: value)` `src` uses |

These kinds are matched against red and green plants only, never the C plant, so the spec's own cure form cannot carry a defect form by accident.

**Before (1), the enumeration alone** (`hold-line-claim.out`, `# ===== fix-16`): 18 SIBLING lines.
- I7-G1: `transition` split, `transition` listpos, `transition-property` listpos.
- E8-G4: `--radius-ctx` redeclare.
- E4-G19: `--z-max` redeclare, `sideOffset` default.
- E3-G9: `--touch-target` redeclare.
- E9-G7: `sm:`, `md:`, `lg:` variants.
- E7-G9: `sm:`, `md:`, `lg:` variants; `min-width` matchmedia.
- H1 G15: `box-shadow` split and listpos.
- G18: `pointer` matchmedia, `pointer: fine` value.

Once the plants were added, the `useBreakpoint` wrapper also listed for E7-G9, because its widened span names `matchMedia`; it got a plant too.

**Before (2), the plants on the HEAD plan** (`BL_ROOT` = a copy of the worktree's plan folder at `b58c5357`): **exit 1**, open 23, all NARROW, in the eight gates. H1 G15's list plant was already caught by the old `[^;]*`. Its split plant was not.

**After:** **exit 0**, open 0, in-scope static gates 137, plants 617.

## Per finding

**FO-01 · cured.** `waves/W-I.7.md:42`, I7-G1.
- The span is now `rg -niU --pcre2`. It reads a `transition` or `transition-property` declaration across lines, and fails any whose list names a seat size and does not open with `var(--icon-button-transition)`.
- HEAD: exit 1, `run.css:357,366,376,384`.
- Plants (`hold-line-claim.py:732-734`): the split form and the list that opens on `background`, as pass 15 planted, and `transition-property: opacity, inline-size`. All three exit 1. Both appended forms exit 0.

**FO-02 · cured.** `waves/W-E.8.md:68`, E8-G4, and §3 item 5 at `:55`.
- The span adds `&& ! rg -q -- '--radius-ctx\s*:' src/components/metric/styles.css`.
- §3 states that the file never declares the token; the context sets it.
- HEAD: exit 1 (`:123`, `:142`).
- Plants (`:545-546`): both of pass 15's spellings exit 1.

**FO-03 · cured.** `waves/W-E.4.md:95`, E4-G19, and §3 item 11 at `:67`.
- The default arm reads `(:|=|\?\?|[|][|])` before the digit.
- The class sweep also listed `--z-max`, the rung the allow-list names. A `--z-max` declaration outside `tokens/scheme-motion.css` now fails.
- The `--z-toggle` arm reads `src`, not `src/styles` only. That cures pass 15's hardening note on a component-stylesheet declaration.
- HEAD: exit 1 (`scheme-motion.css:215`, the token undeclared, the five defaults).
- Plants (`:445-449`): `sideOffset: props.sideOffset ?? 4`, `props.sideOffset || 4`, `--z-max: 170` in `bridges.css` and `--z-toggle: 999` in a component stylesheet each exit 1. HEAD's pass-through `sideOffset: props.sideOffset,` exits 0.
- `migration-values.py` exits 0: §7 already rows the `sideOffset` change, and `--z-max` keeps its value.

**FO-04 · cured.** `waves/W-E.9.md:69` (E9-G7) and `waves/W-E.7.md:78` (E7-G9).
- Both spans read `(?<![\w@:\[-])(?:max-)?(?:sm|md|lg|xl|2xl):[a-z\[!]`, so `@sm:` container variants pass.
- E7-G9 was a `test "$(rg -c …)" -eq 0` count. It is now `! rg -ni --pcre2`, which also reads `matchMedia`, `useMediaQuery` and `useBreakpoints?`. The sweep listed `useTabResponsive.ts:105` (`matchMedia("(min-width: …)")`) as a form `src` writes. It reads `-ni`, not `-niU`, because `src` writes no `@media` across lines (`rg -n '@media[^{]*$' src` hits comments only), and `-U` would let `[^{]*` run from a comment into a `@container` query.
- HEAD: E9-G7 exits 1 (`LabeledField.vue:127`, `useTabResponsive.ts`). E7-G9 exits 1 on the same 5 lines as before (`sheet/styles.css:483`, `segmented.css:115,308`, `LabeledField.vue:127`, `Progress.vue:149`). No variant sits in those files at HEAD.
- Plants (`:504-510`, `:566-569`): `max-sm:`, `sm:`, `md:` and `lg:` in each gate's files, a `matchMedia` width read and `useBreakpoint` in `Progress.vue`, all red. `@sm:` is green.

**FO-05 · cured.** `waves/W-I.1.md:225`, G18.
- The span is `(any-)?pointer: *(coarse|fine)|(any-)?hover: *none`. Because it greps text, a `matchMedia("(pointer: fine)")` string fails too.
- HEAD: exit 1 (the same 3 lines). `src/components/dock` has no `pointer: fine` at HEAD, so the widening adds no hit.
- Plants (`:692-694`): pass 15's two spellings exit 1, and so does `matchMedia("(pointer: coarse)")`. `(hover: hover)` exits 0.

**FO-06 · cured.** See "The class and the sweep". The two instances pass 15 did not name are cured the same way:
- **E3-G9** (`waves/W-E.3.md:69`). The span adds `&& ! rg -q -- '--touch-target\s*:' src/components/sheet`. Plant `:433`, the token re-declared to `50vh` under `[data-slot="sheet-content"]`, exits 1. HEAD: exit 1 (`styles.css:531`, `use.ts:85`).
- **W-H.1 G15** (`waves/W-H.1.md:162`). The span is now `rg -nU --pcre2` over declarations in `src/components/dialog`. Plants `:618-619`: the split `box-shadow` and the mix second in a shadow list each exit 1. HEAD: exit 1 (`styles.css:144`, `:243`).

**What the arm still cannot see.**
- A form `src` does not write yet. The `listpos` kind is limited to comma-list properties. The `split` kind covers declarations, not `@media` preludes, because `src` writes none across lines.
- A measured gate's subject. The arm reads static S entries only, as before.

## Sources that disagreed

None found in this pass. Every rewritten gate's pass cell keeps its fix-15 claim as "As before, …" and adds the fix-16 widening. Each HEAD cell opens on the fix-16 reading and keeps the earlier readings after it as history.

## Ledger and PLAN

No row changed. The cures widen gates that rows already point at:
- UIA-F-149 → E8-G4;
- UIA-V-676 and UIA-F-219 → E4-G19;
- A2-FO-L3-7 → E9-G7;
- C-8 → I7-G1 (W-I.7);
- O-81 (3) → G18.

E3-G9 and W-H.1 G15 widen inside their own waves' scope. No family moved and no wave was added. `ledger-terminal.py` and `chronic-decided.py` exit 0.

## Open

- Real Safari: UNMEASURED (OW-3).
- `hold-line-scope.py` still does not cover born-RED gates (fix-13's reason).
- W-0.12's per-frame strip has no formation reading.
- The ROUTE arm does not check fixture scenes.
- G-L7-6's upper-case placeholder (exit 2) and the three `v10.2.0`-tag gates (exit 128) stand, as passes 13 to 15 read them.
