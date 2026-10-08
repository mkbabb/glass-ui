# BL — formation fix, seat 18

| field | value |
|---|---|
| seat | formation fix seat 18, before audit pass 18. Answers `formation-audit/pass-17.md` (FQ-01 to FQ-04) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `3fbaa0e7` (pass 17 banked). `git diff --stat 8bf8d7f8 3fbaa0e7 -- src tests tests-visual demo docs/tranches/BL/waves docs/tranches/BL/PLAN.md docs/tranches/BL/LEDGER.md` is empty, so `src` and the plan are the tree pass 17 read |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-18/wt` at `3fbaa0e7`, `node_modules` symlinked. No build, no browser, no dev server. Every sweep plant was undone: `git status --short` in the worktree read 0 lines after the last run. The worktree is removed (`git worktree list \| grep -c fix-18` → 0). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-H.1.md`, `W-E.8.md`, `W-I.7.md`, `W-E.11.md` (one §5 row each); under `formation-audit/sweeps/`: `hold-line-claim.py` (three new SIBLING kinds and their plants) and a `# ===== fix-18` section on every `.out`; this file. `PLAN.md` and `LEDGER.md` need no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written. No git write in the checkout. No sibling repo touched. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FQ-01 to FQ-04 | a static gate passes a spelling of its subject that `src` writes, in a form fix-17's sixteen kinds do not read: a mix share on the other operand, a declaration in an SFC `<style>` block, a declaration in another stylesheet of the same directory | `hold-line-claim.py`, SIBLING arm extended | **exit 1**: 10 SIBLING in 7 gates (enumeration alone); 14 NARROW in 4 gates once the plants are in (plan at `3fbaa0e7`) | **exit 0**, open 0, plants 679 |

Pass 17 named three gates. The sweep found the class in four more: **E11-G6** (a second fallback face in another typography stylesheet or in `fonts.css`), **E3-G9**, **I7-G3** (each an SFC `<style>` block in a directory the span already reads whole; a plant settles it, no gate change) and **H6-G3** (another glass or utilities stylesheet; a plant settles it as outside the claim, below).

The other twelve sweeps exit 0 on the plan fix-18 leaves, with the summary lines pass 17 recorded: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), `migration-values.py <worktree>` (candidates 52), `pi-surface.py <worktree>` (manifest routes 80). `gates.py` and `plan_dag.py` exit 0. Every §5 row in the four edited specs has 4 cells (script over `gates.split_cells`).

**The four rewritten gates at HEAD**, run in the worktree from their rendered spans, each exit **1** on the live defect, on the same lines as before:

| gate | file:line | HEAD hits |
|---|---|---|
| W-H.1 G15 | `waves/W-H.1.md:162` | `dialog/styles.css:144`, `:243` |
| E8-G4 | `waves/W-E.8.md:68` | `metric/styles.css:123`, `:142` |
| I7-G1 | `waves/W-I.7.md:42` | the four seat transitions at `run.css:357,366,376,384`; no other dock file (`rg -oU … \| grep -c transition` → 4; `rg -lU` lists `run.css` only) |
| E11-G6 | `waves/W-E.11.md:67` | the four `scale.css` faces sharing one name (`uniq -d` prints it) |

E3-G9 (`styles.css:531`) and I7-G3 (`run.css:251`, `:310`) re-run unchanged: exit 1. H6-G3, a hold line, exits 0 on all three spans, as before. None of the touched gates is GREEN where its row says RED, so none is removed.

## The class and the sweep

**Why fix-17's arm missed it.** Fix-17's kinds read forms of the declaration inside the file set the span names. Pass 17's instances move it: onto the other operand of the mix, into an SFC `<style>` block beside the stylesheet, or into a sibling stylesheet.

**The arm** (`hold-line-claim.py`: docstring `:103-117`; `_src` reads `mixother`, `sfcprops`, `sheets` at `:1472-1476`; the three kinds in `siblings` from `:1699`; `mixother`'s shape in `SHAPED` at `:1735`; `_sheetdir` and `_filed` at `:1740-1758`, which check the two file kinds by a plant's file, not its text):

| kind | enumerated when | carried by |
|---|---|---|
| mixother | the span reads a literal share after a token, and `src` writes a share on the second operand (`styles/glass/surface-axis.css:87`, `styles/utilities/base-misc.css:266`) | a plant with `var(--t), <colour> n%` |
| sfcstyle | the span reads a component directory that holds `.vue` files, its property family is touched, and `src` declares a property of that family in an SFC `<style>` block | a plant in a `.vue` file of that directory that opens a `<style` block |
| sibsheet | the span names one `.css` file of a directory (a component's root, else the file's folder) that holds other stylesheets, and a property family is touched | a plant in another `.css` file of that directory, red where the spec holds the claim beyond the named file, green where it does not |

**Before (1), enumeration alone** (`hold-line-claim.out`, `# ===== fix-18`): exit 1, 10 SIBLING lines: E11-G6 (sibsheet), E3-G9 (sfcstyle), E8-G4 (sfcstyle), G15 (mixother, sfcstyle), H6-G3 (sibsheet ×2), I7-G1 (sfcstyle, sibsheet), I7-G3 (sfcstyle).

**Before (2), the fix-18 plants on the HEAD plan** (`BL_ROOT` = `git archive HEAD` of the plan folder): **exit 1**, open 14, all NARROW: E11-G6 3, E8-G4 2, G15 4, I7-G1 5.

**After:** **exit 0**, open 0, in-scope static gates 137 (S 65, L 67, H 5), plants 679.

## Per finding

**FQ-01 · cured.** `waves/W-H.1.md:162`, G15.
- Both declaration arms' share alternation gains two forms: `var(--foreground), <colour> n%` (the other operand as a keyword, a hex or a `var()`), and `n%, var(--foreground)` (a share on the first operand with `--foreground` second). The utility arm already fails any arbitrary utility naming `--foreground`.
- Plants (`hold-line-claim.py:690-695`): red, `color-mix(in oklab, var(--foreground), transparent 52%)` on `outline`; the same carried on `--r` and read back; `color-mix(in oklab, transparent 52%, var(--foreground))` on `box-shadow`; `var(--foreground),#fff0 52%` unspaced; an `outline` mix in a `<style>` block of `DialogContent.vue`. Cure form, green: `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), transparent)`, the form pass 17 used for its cured base.

**FQ-02 · cured.** `waves/W-E.8.md:68`, E8-G4.
- The corner arm and the `--radius-ctx` declaration arm read `src/components/metric -g '*.css' -g '*.vue'` rather than `styles.css` alone, so every SFC `<style>` block and any second stylesheet in the directory is read.
- Plants (`:595-597`): red, pass 17's `.metric[data-posture="cell"] { border-radius: var(--radius-card); }` in a `<style>` block of `Metric.vue`, and `--radius-ctx: var(--radius-card)` in one of `MetricRow.vue`. Green, `border-radius: var(--radius-ctx)` in one of `MetricStack.vue`.

**FQ-03 · cured.** `waves/W-I.7.md:42`, I7-G1.
- Both CSS arms read `src/components/dock -g '*.css' -g '*.vue'`. §3 item 3 holds the invariant on whatever rules carry the seats once D2's carrier lands, and W-I.1 §4 writes twelve dock stylesheets plus W-0.8's `styles/scroll-rungs.css`.
- The declaration arm now reads a rule whole, from the selector to the declaration (`(?:^|[{};])(?![^{}]*dock-layer-tab-indicator)[^{};]*\{[^{}]*?transition…`). The one size transition the dock keeps, the switcher indicator's glide (`layer-group.css:341-358`), is a rule whose selector names `.dock-layer-tab-indicator`, and passes. That is pass 17's second suggested cure shape. Reading by the indicator's name, not by the seat's `.dock-run`, keeps the gate live if D2's carrier renames the run.
- The cured base is the spec's cure, not a strip: four `subre` cure ops rewrite `run.css:357,366,376,384` to §3 item 1's appended form (the base pass 17 used).
- Plants (`:821-826`): red, a seat transition in `styles/layers.css`, in `styles/layer-group.css` in the indicator's own split form, in a new `styles/scroll-rungs.css`, in a `<style>` block of `GlassDock.vue`, and the carried form in `layers.css`. Green, the vertical group's indicator rule (`layer-group.css:364`'s selector) with a `height` transition.

**FQ-04 · cured.** See "The class and the sweep". The four gates pass 17 did not name:
- **E11-G6** (`waves/W-E.11.md:67`). Was `grep -oiE … src/styles/typography/scale.css`. The last face of a family name wins whichever file declares it, and §4 writes `fonts.css` beside `scale.css`. The span is now `grep -rhoiE … src --include='*.css' --include='*.vue'`. At HEAD only `scale.css` declares a fallback face (`rg -n Fallback src -g '*.css'`: `scale.css:23,32,39,46,65`, and two comments), so the HEAD reading is unchanged. Plants (`:424-426`), all red: a second `"Plus Jakarta Sans Fallback"` face in `typography/semantic.css`, in `fonts.css`, and in a `<style>` block of `Card.vue`.
- **E3-G9** (`:474`). The span already reads `src/components/sheet` whole. Red plant: `min-block-size: 40vh` in a `<style>` block of `SheetContent.vue` exits 1. No gate change.
- **I7-G3** (`:848`). The span already reads `src/components/dock` whole. Red plant: `padding-block: var(--dock-ring-reserve)` in a `<style>` block of `GlassDock.vue` exits 1. No gate change.
- **H6-G3** (`:724-725`). Refuted as a gap, carried by two green plants. §3 item 4 and §4 bound the seat to six named files ("H6-G3 reads all six"), and `hold-line-scope.py` holds that file axis. Widening the three spans to `src/styles/glass src/styles/utilities` turns the hold line red on declarations that are not the claim's subject: `dissolve.css:220-242`'s corner-affordance insets, `deep.css:44-156`'s `--glass-blur-tier-radius` reads, and `--glass-level` in `a11y-fallback.css`, `surface-axis.css` and `ladder-undershadow.css` (run in the worktree: span 1 exit 1, span 3 exit 1). The green plants are those HEAD forms, placed in `dissolve.css` and `base-misc.css`.

**What the arm still cannot see.**
- **I7-G1's exception is by name.** A seat rule whose selector segment (or a comment in it) names `dock-layer-tab-indicator` passes.
- **The ring token outside the directory** (fix-17's open item): G15 still does not resolve a token declared outside `src/components/dialog`.
- **A measured gate's subject.** The arm reads static S entries only, as before.

## Sources that disagreed

None found. Each widened gate owns its file set. E8-G4's HEAD cell now names the file of its green plant (`MetricStack.vue`), so the cell and the CLAIMS entry say the same thing.

## Ledger and PLAN

No row changed. The cures widen gates that rows already point at: UIA-F-149 → E8-G4, C-8 → W-I.7. G15 and E11-G6 widen inside their own waves' scope (W-H.1's Close ring, W-E.11's F-35). No family moved and no wave was added. `ledger-terminal.py` and `chronic-decided.py` exit 0. Row 6: the edits widen §5 static gates of loop waves W-H.1 (D3) and W-I.7 (D2); no §3 cure or loop-owned design line changed.

## Open

- Real Safari: UNMEASURED (OW-3).
- `hold-line-scope.py` still does not cover born-RED gates (fix-13's reason).
- W-0.12's per-frame strip has no formation reading.
- The ROUTE arm does not check fixture scenes.
- G15 does not resolve a ring token declared outside `src/components/dialog`.
- I7-G1's indicator exception is by selector name (above).
- G-L7-6's upper-case placeholder (exit 2) and the three `v10.2.0`/`v11.0.0`-tag gates (exit 128) stand, as passes 13 to 17 read them.
