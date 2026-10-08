# BL — formation audit, pass 17

| field | value |
|---|---|
| seat | formation critic, pass 17. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-16, fixes 2-17 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8bf8d7f8` (fix 17, committed while this seat read; it opened at `a115850c` with fix-17's files modified in the tree). `git diff a115850c 8bf8d7f8 -- src tests tests-visual demo` is 0 lines, so every probe reading below holds at `8bf8d7f8` |
| inputs read | `formation-audit/pass-16.md`; `formation-audit/fix-17.md` (last, as told); the eight rewritten gate rows (W-H.1 G15, E7-G9, E8-G4, E9-G7, E3-G9, W-I.1 G18, I7-G1, I7-G3) rendered through `gates.py`; W-I.7 §1-§4; W-H.1 §2 and §3 item 3; `hold-line-claim.py`'s docstring and the CLAIMS entries of E8-G4, I7-G1, I7-G3; PLAN §3 and §5 by script; `audit/REGISTRY.md` by family-header count; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-17/wt` at `a115850c`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real-Safari cells are UNMEASURED (OW-3) |
| fences | no source edit in the checkout, no git write in the checkout, nothing under `design/` read, run or written, no sibling repo touched. Every plant was undone by writing the file's original text back (a created file was deleted); `git status --short` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-17` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FQ-01 to FQ-04) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Four findings, all on row 3. Pass 16's FP-01 to FP-04 are cured on their own plants; FP-05's class is still open (FQ-04). Every sweep exits 0. The new findings:

- **FQ-01.** W-H.1 G15 passes a Close ring whose literal share is written on the `transparent` side of the mix, `color-mix(in oklab, var(--foreground), transparent 52%)`, the form of `styles/utilities/base-misc.css:266`.
- **FQ-02.** E8-G4 passes a corner written in a `<style>` block of a Metric SFC, the form of `pager-dots/PagerDots.vue:493`. The corner arm reads `metric/styles.css` only; the utility arm reads `rounded*` classes only.
- **FQ-03.** I7-G1's CSS arm reads `run.css` only, so a seat-size transition in another dock stylesheet passes. W-I.7 §3 item 3 says the invariant must hold on the converged carrier's own rules, and `src` writes a size transition in another dock stylesheet (`dock/styles/layer-group.css:354-355`).
- **FQ-04.** `hold-line-claim.py`'s SIBLING arm is still narrower than its class. FQ-01 to FQ-03 are its missed instances.

## Sweeps, re-run

The plan read is the checkout's (fix-17's, identical to `8bf8d7f8`). Sweeps that take a tree read the crit-17 worktree.

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 658, open 0` (79 s) |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FQ-04).** Fix-17's five kinds hold for what they enumerate (the pass-16 plants below all exit 1). The arm still does not enumerate a share written on the other operand of the mix, a declaration in an SFC `<style>` block beside the stylesheet a span reads, or the same declaration in another stylesheet of the directory when the spec names rules outside the one file. FQ-01 to FQ-03 are three instances.
- **The other twelve:** no missed instance found.

## Pass 16, re-verified

Each cure was read on a cured base built in the worktree (the gate's HEAD hits rewritten to the spec's §3 form, gate exit 0), then pass 16's own plants appended one at a time, with a control plant each time.

| id | verdict | reading here |
|---|---|---|
| FP-01 | cured | G15. Base: `dialog/styles.css:144,243` as `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), transparent)` (exit 0). Control (mix 40 %) **1**; `oklch(from var(--foreground) l c h / 0.48)` on `outline` **1**; `/ 48%` on `box-shadow` **1**; the mix carried on `--dialog-close-ring` and read back **1**. The cure form appended exits 0. HEAD: exit 1 (`styles.css:144`, `:243`). See FQ-01 for another spelling |
| FP-02 | cured | E7-G9. Base: the five `@media` width lines of the four files as `@container` (exit 0). Control `matchMedia` **1**; `window.innerWidth < 768` in `Progress.vue` **1**. E9-G7 on its base (`LabeledField.vue:127` as `@container field`, `useTabResponsive.ts`'s viewport lines stripped; exit 0): `innerWidth` in `LabeledField.vue` **1**, `innerHeight` **1**. HEAD: both exit 1 |
| FP-03 | cured | G18. Base: `touch-floor.css:24`, `density.css:378` as `(hover: hover)`, the `index.css:141` comment reworded (exit 0). Control `matchMedia("(pointer: coarse)")` **1**; `"ontouchstart" in window` in `useDockHold.ts` **1**; `navigator.maxTouchPoints > 0` **1**. HEAD: exit 1 |
| FP-04 | cured | E8-G4. Base: `metric/styles.css:123,142` as `var(--radius-ctx)` (exit 0). Control `border-radius: var(--radius-sm)` **1**; `cn('metric rounded-card', $props.class)` in `Metric.vue` **1**. HEAD: exit 1. See FQ-02 for another spelling |
| FP-05 | cured for its four instances and the four fix-17 found (E3-G9, E9-G7, I7-G1, I7-G3); the class is open (FQ-04) | the sweep's 658 plants hold (exit 0). E3-G9 on its base (the `min-block-size: calc(…)` at `sheet/styles.css:531` removed, `use.ts:85` read through `visualViewport`; exit 0): `window.innerHeight` in `SheetContent.vue` **1**, `--sheet-span: max(12rem, 30dvh)` read back **1** |

## Gates re-run at HEAD

**Static gates.** A runner in this seat's scratchpad read every non-struck §5 span through `gates.py` and ran each that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names no `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…` or lower-case `<…>` placeholder; 4 at a time, 60 s cap, stdin closed, in the worktree.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 18/23 | 0 |
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

**Every band reads RED.** The exit-0 spans are the set pass 16 read: the labelled hold lines (W-0.1 G5, W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, D2-G5, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a printed value (C4-G7); state-dependent by its own cell (A1-G11); a prose fragment (E6-G8's `perl`). No new exit-0 span. Band 0 runs one span more than pass 16's runner (23 against 22); its 18 nonzero cover pass 16's 17.

**The filtered BLOCKER spans, run alone:** W-0.12 G1 (awk with `<style`) exits **1**; W-0.7 G8, W-L.7 G-L7-1 and G-L7-4 (outbox loops) each exit **1**.

**BLOCKER families.**
- **F-01 (W-A.2).** A2-G3, A2-G6, A2-G7 and A2-G11 exit 1 (A2-G6's two prose spans exit 2 and 128).
- **F-68.** W-0.7 G2, G5 and G8 exit 1; G6 and G9 exit 128 (no `v10.2.0` tag). W-L.7 G-L7-1 and G-L7-4 exit 1. W-L.8 G-L8-2, G-L8-14 and G-L8-15 exit 1; G-L8-12 exits 128.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1.

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix-17's eight rewritten gates at HEAD:** E3-G9 1 (`sheet/styles.css:531`), E7-G9 1 (5 lines), E8-G4 1 (`:123`, `:142`), E9-G7 1, W-H.1 G15 1 (`:144`, `:243`), G18 1 (3 lines), I7-G1 1 (`run.css:357,366,376,384`), I7-G3 1 (`run.css:251`, `:310`). Each matches fix-17's table.

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers. A script over PLAN §3's 102 wave rows (struck text removed) finds 84 by id and F-30 as its two sub-families (F-30a in W-E.8, F-30b in W-J.1, both in the band table at PLAN `:52`, `:57`); none extra; no family placed whole in two waves. Fix 17 changed no PLAN line.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band reads RED (table above); every BLOCKER gate that runs statically exits nonzero for its defect; all eight rewritten gates exit 1.

## Row 3 · vacuous gates

Each plant below was appended to (or substituted into) a file in the worktree on the gate's cured base, the gate's span run, and the file restored. A control plant (the defect in a spelling the gate already names) was run with each to show the base is live.

### FQ-01 · W-H.1 G15 passes a share written on the transparent operand

- **Where.** `waves/W-H.1.md:162`, G15 ("the Close ring is the rung"). §2 (`:40`): the Close ring is a hand literal, `color-mix(in oklab, var(--foreground) 48%, transparent)`, outside `--ink-perimeter`. §3 item 3 (`:87`): "no hand literal remains."
- **Defect.** Every mix arm of the span reads the share as a percentage after `var(--foreground)` (`var\(--foreground\)[\s_]*[0-9.]+%`). CSS lets the same share be written on the other operand: `color-mix(in oklab, var(--foreground), transparent 52%)` paints the same 48 % ring. `src` writes the share on the transparent operand at `styles/utilities/base-misc.css:266` (`color-mix(in oklab, var(--glass-plate-wash), transparent 40%)`) and `styles/glass/surface-axis.css:87`.
- **Evidence.** Cured base as in the FP-01 row (exit 0). Plants appended to `dialog/styles.css`:

  | plant | exit |
  |---|---:|
  | `.x { outline: 2px solid color-mix(in oklab, var(--foreground) 40%, transparent); }` (control) | 1 |
  | `.x:focus-visible { outline: 2px solid color-mix(in oklab, var(--foreground), transparent 52%); }` | **0** |
  | `.x { --r: color-mix(in oklab, var(--foreground), transparent 52%); outline: 2px solid var(--r); }` | **0** |

  The CLAIMS entry carries no plant in this form.
- **Shape of a cure.** Also fail `var(--foreground)\s*,\s*transparent\s+[0-9.]+%` (and `transparent\s+[0-9.]+%\s*,\s*var(--foreground)`) in all three arms. Add the two plants.

### FQ-02 · E8-G4 passes a corner in a Metric SFC `<style>` block

- **Where.** `waves/W-E.8.md:68`, E8-G4 ("Metric reads the context radius"). The ledger row is UIA-F-149, "Metric cell radius ignores `--radius-ctx`".
- **Defect.** The corner arm reads `metric/styles.css`; the utility arm reads `rounded*` classes in the directory's `.vue` and `.ts` files. A `border-radius` declaration in a `<style>` block of `Metric.vue`, `MetricRow.vue` or `MetricStack.vue` reaches neither. `src` writes component corners in SFC `<style>` blocks: `pager-dots/PagerDots.vue:493,543,554`, `timeline/Timeline.vue:493,576,584`, `blob/Blob.vue:390`, `progress/Progress.vue:180` (8 `.vue` files hold `border-radius`, `rg -c 'border-radius' -g '*.vue' src \| wc -l`).
- **Evidence.** Cured base as in the FP-04 row (exit 0).

  | plant | exit |
  |---|---:|
  | `.x { border-radius: var(--radius-sm); }` in `styles.css` (control) | 1 |
  | `<style>.metric[data-posture="cell"] { border-radius: var(--radius-card); }</style>` appended to `Metric.vue` | **0** |

- **Shape of a cure.** Run the corner arm over `src/components/metric` (`styles.css` and the SFCs) rather than the one stylesheet, or fail any `<style` block in the directory's `.vue` files. Add the plant.

### FQ-03 · I7-G1 reads one dock stylesheet while its spec names rules outside it

- **Where.** `waves/W-I.7.md:42`, I7-G1 ("seat transition"). §3 item 3 (`:32`): "if D2's carrier replaces the run's rules, the same three invariants hold on the new rules", and the loop field: "W-I.1's converged carrier keeps I7-G1..G3 true on its own rules". W-I.1 §4 (`W-I.1.md:181`) lands on twelve dock stylesheets plus W-0.8's new `styles/scroll-rungs.css`.
- **Defect.** I7-G1's CSS arm reads `src/components/dock/styles/run.css` only (its utility arm reads the whole directory's `.vue` and `.ts`). A seat-size transition written in another dock stylesheet passes, though §3 item 3 holds the invariant there. `src` writes a size transition in another dock stylesheet at HEAD: `dock/styles/layer-group.css:354-355` (`transition:` / `width var(--spring-dock-duration) var(--spring-dock)`). Fix 17 widened I7-G3, the sibling gate of the same wave, from `run.css` to all of `src/components/dock` for this reason (its `layers.css` plant); I7-G1's CSS arm was left on the one file.
- **Evidence.** Base: `run.css:357,366,376,384` as `transition: var(--icon-button-transition), <axis> var(--spring-dock-duration) var(--spring-dock);` (exit 0).

  | plant | exit |
  |---|---:|
  | `.x { transition: inline-size 200ms; }` in `run.css` (control) | 1 |
  | `.glass-dock .dock-run > .dock-icon-button { transition: inline-size var(--spring-dock-duration) var(--spring-dock); }` in `styles/layers.css` | **0** |
  | the same rule in a new `styles/scroll-rungs.css` (W-0.8's carrier file) | **0** |

- **Shape of a cure.** Read every stylesheet under `src/components/dock/styles/` (and SFC `<style>` blocks) for a size transition on a rule whose selector reaches a run seat, or read the whole directory and name the switcher indicator (`layer-group.css:354`) as the one allowed size transition. Add the plants.

### FQ-04 · `hold-line-claim.py`'s SIBLING arm is still narrower than its class

- **Where.** `formation-audit/sweeps/hold-line-claim.py:57-102` (docstring), `siblings` and `sibling_arm`.
- **Defect.** The class (fix-15 to fix-17): a static gate must fail every spelling of its subject that `src` itself uses. The arm enumerates sixteen kinds. It does not enumerate:
  - a `color-mix` share written on the other operand (`var(--t), transparent N%`), where the span reads a share after the token; `relalpha` reads relative colors only (FQ-01);
  - a declaration of a gated property in an SFC `<style>` block in a directory whose stylesheet the span reads; `utility` reads Tailwind class lists only (FQ-02);
  - the gated declaration in another stylesheet of the same component directory, where the span reads one file and the spec holds the invariant beyond it; `split` reads a value on the next line, not another file (FQ-03).
- **Missed instances.** FQ-01 to FQ-03.
- **Shape of a cure.** Add the three as kinds read from `src`: the transparent-operand share for every mix share a span reads; an SFC `<style>` declaration for every property a span reads over a directory holding `.vue` files; and a sibling-stylesheet declaration wherever a span names one stylesheet of a directory that holds others. The three instances become plants.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 17 changed gate rows only; no §3 or §6 visual claim was added.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. Fix 17 changed no LEDGER row; its cures widen gates rows already point at (UIA-F-149 → E8-G4, A2-FO-L3-7 → E9-G7, C-8 → W-I.7, O-81 (3) → G18).

## Row 6 · loop pre-emption

No finding. Fix 17 edited §5 rows of three loop waves (W-H.1 and W-I.1 under D3 and D2, W-I.7 under D2). Each widens a static gate on a defect the wave already names; no §3 cure or loop-owned design line changed.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here: 102 §5 rows for 102 specs; a topological order of 102 (no cycle); 0 dangling ids; 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 17 adds no break.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

These spellings are this seat's. No spec of the gate names them, no CLAIMS entry lists them, and `src` has no instance in this role.

- **G15** passes a ring at a scaled rung, `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 45%), transparent)` (exit 0 on the cured base). `src` writes that form once, at `_shared/field/control.css:277`, as a disabled field's ink, not a ring; it reads the rung, so it is not the hand literal §2 names.
- **G15** passes `ring-(--foreground)/48`. `src` writes the parenthesised token utility (`shadow-(--invalid-ring)`, `select/SelectTrigger.vue:59`) but never with an opacity modifier.
- **G15** reads `var(--foreground)` only; `--color-foreground` (`theme/bridges.css:106`) is never read through `var()` in `src`.
- **G15**, as fix-17 records, does not resolve a ring token declared outside `src/components/dialog`.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as passes 14 to 16 read.
- **W-0.7 G6, G9 and G-L8-12** exit 128 (no `v10.2.0` or `v11.0.0` tag), as passes 13 to 16 read.
- **Fix-17's open items stand:** real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the SIBLING arm reads static S entries only; the ROUTE arm does not check fixture scenes.
