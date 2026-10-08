# BL — formation audit, pass 18

| field | value |
|---|---|
| seat | formation critic, pass 18. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-17, fixes 2-18 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a59d0909` (fix 18 banked). `git diff --stat 3fbaa0e7 a59d0909 -- src tests tests-visual demo` is empty; under the plan, fix 18 changed one §5 row in each of `W-E.11.md`, `W-E.8.md`, `W-H.1.md` and `W-I.7.md`, plus the sweeps and their `.out` files |
| inputs read | `formation-audit/pass-17.md`; `formation-audit/fix-18.md` (last, as told); the four rewritten rows and every W-I.7 gate, rendered through `gates.py`; W-I.7 §1-§5 and its loop field; W-I.1 §3 items 2-3 and §4; W-E.11 §2-§4; PLAN §2, §3 and §5 by script; `audit/REGISTRY.md` by family-header count; `hold-line-claim.py`'s docstring; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-18/wt` at `a59d0909`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| fences | no source edit and no git write in the checkout; nothing under `design/` read, run or written; no sibling repo touched. Every plant was undone by a harness that writes back each file's original text and deletes any file it created. `git status --short` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-18` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FR-01 to FR-03) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Three findings, all on row 3. Pass 17's FQ-01 to FQ-03 are cured on their own plants. FQ-04's class (a static gate passes a spelling `src` uses) is open again in a fourth form (FR-03). Every sweep exits 0. The new findings:

- **FR-01.** I7-G3 reads `src/components/dock` only. A ring-reserve padding on the dock run or a seat, written in a global stylesheet, passes. `src` writes padding on the dock seat from a global stylesheet: `styles/glass/glass-capsule.css:167-169`, `.glass-dock .dock-icon-button { padding: … }`. W-I.1 §4 edits that range as part of the carrier, and W-I.7 §3 item 3 holds the invariant on the carrier's rules.
- **FR-02.** I7-G1 reads `src/components/dock` only. A seat size transition in a global stylesheet passes. `src` writes dock-seat rules in global sheets at `glass-capsule.css:167`, `glass/rim.css:63`, `glass/material.css:331` and `utilities/a11y-overrides.css:116`. W-I.1 §4 edits `glass-capsule.css:140-171` and `material.css:334`.
- **FR-03.** `hold-line-claim.py`'s SIBLING arm still does not enumerate a declaration in a stylesheet outside the component directory that styles that component's classes. `sibsheet` reads other stylesheets of the same directory only. FR-01 and FR-02 are its missed instances.

## Sweeps, re-run

The plan read is the checkout's (`a59d0909`). Sweeps that take a tree read the crit-18 worktree, except `fl6-plate-reads.py`, which reads the checkout (as pass 17 did).

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 679, open 0` |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

Note on invocation: run with `python3 -I` (isolated mode), every sweep exits 1 on `ModuleNotFoundError: plan_dag`, because isolated mode drops the script's directory from `sys.path`. The four tree-taking sweeps exit 2 (usage) with no argument. Neither is a finding; the readings above use `python3 -B` with the root argument, as fix 18 and pass 17 did.

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FR-03).** Fix 18's three kinds hold for what they enumerate: pass 17's plants all exit 1 below. The arm does not read a declaration on a component's class written in a stylesheet outside the component's directory. FR-01 and FR-02 are two instances.
- **The other twelve:** no missed instance found.

## Pass 17, re-verified

Each cure was read on a cured base built in the worktree (the gate's HEAD hits rewritten to the spec's §3 form; gate exit 0). Pass 17's plants were then appended one at a time, each with a control plant.

| id | verdict | reading here |
|---|---|---|
| FQ-01 | cured | G15. Base: `dialog/styles.css:144,243` as `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), transparent)` (exit 0). Control (mix 40 %) **1**; `color-mix(in oklab, var(--foreground), transparent 52%)` on `outline` **1**; the same carried on `--r` and read back **1**; the same in `oklch` **1**; `rgb(from var(--foreground) r g b / 0.48)` **1**. The cure form appended exits 0. HEAD: exit 1 (`styles.css:144`, `:243`) |
| FQ-02 | cured | E8-G4. Base: `metric/styles.css:123,142` as `var(--radius-ctx)` (exit 0). Control `border-radius: var(--radius-sm)` in `styles.css` **1**; `<style>.metric[data-posture="cell"] { border-radius: var(--radius-card); }</style>` in `Metric.vue` **1**; `border-start-start-radius: var(--radius-card)` **1**. HEAD: exit 1 (`:123`, `:142`) |
| FQ-03 | cured for the dock directory; see FR-02 for a global sheet | I7-G1. Base: `run.css:357,366,376,384` as `transition: var(--icon-button-transition), <axis> …` (exit 0). Control in `run.css` **1**; pass 17's seat rule in `styles/layers.css` **1** and in a new `styles/scroll-rungs.css` **1**; the same as a multi-line list after `opacity` **1**; nested under `.glass-dock { … }` **1**; under `@layer components` with `:where(.glass-dock)` and `width` **1**. HEAD: exit 1 (`run.css`, 63 output lines from the rule-wide match) |
| FQ-04 | cured for its three kinds; the class is open (FR-03) | the sweep's 679 plants hold (exit 0) |

E11-G6, widened by fix 18 under FQ-04, also holds. Base: the four `scale.css` faces renamed `… Fallback SF`, `Segoe`, `Roboto`, `Arial` (exit 0). A second `"Plus Jakarta Sans Fallback SF"` face in `typography/semantic.css` **1**, and a second `… Arial` face in `fonts.css` **1**.

## Gates re-run at HEAD

**Static gates.** A runner in this seat's scratchpad read every non-struck §5 span through `gates.py` and ran each one that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names none of `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…`, or a lower-case `<…>` placeholder. It ran 4 at a time, with a 60 s cap, stdin closed, in the worktree. 211 spans ran.

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

**Every band reads RED.** The exit-0 spans are the set pass 17 read: the labelled hold lines (W-0.1 G5, W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, D2-G5, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a printed value (C4-G7); a gate that depends on state by its own cell (A1-G11); and a prose fragment (E6-G8). There is no new exit-0 span. Band 0 runs one span fewer than pass 17's runner (22 against 23) under this filter; its exit-0 set is pass 17's.

**Filtered BLOCKER spans, run alone:** W-0.12 G1 **1**; W-0.7 G8 **1**; W-L.7 G-L7-1 **1** and G-L7-4 **1**.

**BLOCKER families.**
- **F-01 (W-A.2).** A2-G3, A2-G7 and A2-G11 exit 1.
- **F-68.** W-0.7 G2, G5 and G8 exit 1. W-L.7 G-L7-1 and G-L7-4 exit 1. W-L.8 G-L8-2 exits 1.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1.

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix 18's four rewritten gates, and the two it read unchanged, at HEAD:** W-H.1 G15 1 (`dialog/styles.css:144`, `:243`); E8-G4 1 (`metric/styles.css:123`, `:142`); I7-G1 1 (`run.css`); E11-G6 1 (`uniq -d` non-empty); I7-G3 1 (`run.css:251`, `:310`); E3-G9 1 (`sheet/styles.css:531`).

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers and no duplicate. A script over PLAN §3's 102 wave rows (struck text removed) finds all 85, with no extra id. Every family named in more than one row is written as `split (…)` or `remainder` in all but at most one row, its home row. F-21 (home W-E.2; splits W-H.1, W-I.7) and F-33 (home W-E.9; split W-E.14) are the two with a bare home row, as pass 17 read them. Fix 18 changed no PLAN line.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band reads RED (table above), every BLOCKER gate that runs statically exits nonzero, and the four rewritten gates exit 1.

## Row 3 · vacuous gates

Each plant below was appended to a file in the worktree on the gate's cured base, the gate's span was run, and the file was restored. Each run had a control plant: the defect, in a spelling the gate already names, in the directory the gate reads.

### FR-01 · I7-G3 passes a ring-reserve padding in a global stylesheet

- **Where.** `waves/W-I.7.md:44`, I7-G3 ("ring reserve"): `! rg -nU --pcre2 '…padding[a-z-]*\s*:[^;{}]*--dock-ring-reserve|…' src/components/dock`. §3 item 2 (`:31`) moves the reserve out of padding. §3 item 3 (`:32`): "if D2's carrier replaces the run's rules, the same three invariants hold on the new rules". The loop field (`:9`): "W-I.1's converged carrier keeps I7-G1..G3 true on its own rules".
- **Defect.** The span reads `src/components/dock` only. The carrier's rules are not all inside that directory. W-I.1 §4 (`W-I.1.md:182`) edits `src/styles/glass/glass-capsule.css:122,140-171` and `src/styles/glass/material.css:334`. At HEAD, `glass-capsule.css:167-169` declares padding on the dock seat from that global sheet: `.glass-dock .dock-icon-button { padding: var(--dock-icon-padding, var(--dock-control-safe-inset, 0)); }`. That is the gated property, on the gated subject, outside the gated directory, in `src`.
- **Evidence.** Base: the `padding-block: var(--dock-ring-reserve);` line at `run.css:251` and the `padding-inline` line at `:310` removed (exit 0).

  | plant | exit |
  |---|---:|
  | `.glass-dock .dock-run { padding-block: var(--dock-ring-reserve); }` in `dock/styles/layers.css` (control) | 1 |
  | the same rule in `src/styles/glass/glass-capsule.css` | **0** |
  | `.glass-dock .dock-icon-button { padding: var(--dock-ring-reserve); }` in `glass-capsule.css` | **0** |

- **Shape of a cure.** Read every `src` stylesheet and SFC for a padding with the reserve (the reserve token is dock-only, so `src` whole costs no false red), or read `src/components/dock` plus each global sheet W-I.1 §4 edits. Add the two plants.

### FR-02 · I7-G1 passes a seat size transition in a global stylesheet

- **Where.** `waves/W-I.7.md:42`, I7-G1 ("seat transition"). It answers to the same §3 item 3 and loop field as FR-01.
- **Defect.** Both CSS arms read `src/components/dock -g '*.css' -g '*.vue'`. `src` writes dock-seat rules in global stylesheets: `styles/glass/glass-capsule.css:167` (`.glass-dock .dock-icon-button`), `styles/glass/rim.css:63` (`.dock-icon-button` in the rim list), `styles/glass/material.css:331` (`.dock-icon-button:hover::before`), and `styles/utilities/a11y-overrides.css:116` (`.dock-icon-button:focus-visible`). W-I.1 §4, the carrier whose rules §3 item 3 holds, edits `glass-capsule.css:140-171` and `material.css:334`. A seat rule that replaces the control's transition list with a size transition, written in one of those sheets, is the defect, and the gate does not read it. Fix 18 widened I7-G1 from `run.css` to the dock directory for this reason (W-I.1 §4's twelve dock stylesheets) but stopped at the directory boundary.
- **Evidence.** Base as FQ-03 above (exit 0).

  | plant | exit |
  |---|---:|
  | `.glass-dock .dock-run > .dock-icon-button { transition: inline-size var(--spring-dock-duration) var(--spring-dock); }` in `dock/styles/layers.css` (control) | 1 |
  | the same rule in `src/styles/glass/glass-capsule.css` | **0** |
  | `.glass-dock .dock-icon-button { transition: inline-size …; }` in `src/styles/glass/material.css` | **0** |

- **Shape of a cure.** Run the declaration arm over `src` for rules whose selector names a dock seat class (`.dock-icon-button`, `.dock-tab-button`, the run's children), or over `src/components/dock` plus `src/styles`, keeping the indicator exception. Add the two plants.

### FR-03 · `hold-line-claim.py`'s SIBLING arm does not read global sheets

- **Where.** `formation-audit/sweeps/hold-line-claim.py`, docstring (the `sibsheet` kind) and `siblings` / `_sheetdir`.
- **Defect.** The class (fix 15 to fix 18): a static gate must fail every spelling of its subject that `src` itself uses. `sibsheet` reads "another stylesheet of the directory (a component's root, else the file's folder)". It does not read a stylesheet outside the component's directory that styles the component's classes, a form `src` uses for the dock (`glass-capsule.css:167`, `rim.css:63`, `material.css:331`, `a11y-overrides.css:116`). It also does not read the global sheets a wave's own §4 lists as edited.
- **Missed instances.** FR-01 and FR-02. The same exposure stands for every gate the census below shows scoped to `src/components/dock` and its sub-paths (W-I.1 G11, G18; W-I.5 I5-G1; W-I.2 G10; W-0.8 G4, G14). No `src` instance of their subjects sits outside the directory today, so they are not findings here (the hardening notes and the notes outside the checklist record what was read).
- **Shape of a cure.** Add a kind, enumerated from `src`: for a span that reads one component directory, every `src/styles` (or other non-directory) stylesheet whose selectors name a class the directory's templates write, plus every path the wave's §4 lists outside the directory. Its plant is the gate's red plant written in that sheet. FR-01 and FR-02 become plants.

**Census behind FR-03.** Of the static first spans that read a path under `src/components/` and not `src` whole, 51 gates are scoped to component directories or files (script over `gates.py`). Fourteen of those read a path under `src/components/dock`.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 18 changed gate rows only; no §3 or §6 visual claim was added.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. Fix 18 changed no LEDGER row. The widened gates sit on rows that already point at them: UIA-F-149 → E8-G4, C-8 → W-I.7.

## Row 6 · loop pre-emption

No finding. Fix 18 edited one §5 row in each of two loop waves, W-H.1 (D3) and W-I.7 (D2). Each widens a static gate on a defect the wave already names. No §3 cure and no loop-owned design line changed (`git diff 3fbaa0e7 a59d0909 -- docs/tranches/BL/waves` touches four `|` gate rows only).

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here, gives 102 §5 rows for 102 specs, a topological order of 102 (so no cycle), 0 dangling ids, and 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}. PLAN §5 states it is the one record of edges. Every wave spec's `depends on` field cites "PLAN §5, the one record of edges", and `waves/INDEX.md` says it carries no edges.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 18 adds no break.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

No spec names these spellings, no CLAIMS entry lists them, and `src` has no instance of them in this role.

- **E8-G4** passes a Metric corner set as an inline style object, `:style="{ borderRadius: 'var(--radius-card)' }"` in `Metric.vue` (exit 0 on the cured base). `rg 'borderRadius' src` returns 0 lines.
- **E8-G4** would pass `@apply rounded-card` in `metric/styles.css`: the corner arm reads declarations and the utility arm reads `.vue`/`.ts` only. `src` writes `@apply` in stylesheets (`dock/styles/layer-group.css:40`, `dock/styles/search.css:51`, `dock/styles/dock.css:124`), but `rg '@apply[^;]*rounded' src` returns 0 lines.
- **E11-G6** passes an unquoted family name, `font-family: Plus Jakarta Sans Fallback Arial;`, in an `@font-face` (exit 0 on the cured base). Every `@font-face` family in `src` is quoted.
- **G15** passes a Close ring drawn as `border: 2px solid color-mix(in oklab, var(--foreground) 48%, transparent)` on `:focus-visible` (exit 0). §2 names an `outline`, and `src` draws the Close ring on `outline` only.
- **I7-G1**: `src` writes no `transition: all` (`rg 'transition(-property)?\s*:\s*all\b' src` returns 0 lines) and no script-written transition on a dock seat (`rg 'style\.transition' src` returns 0 lines), so neither is read here.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as passes 14 to 17 read.
- **W-0.7 G6, G9 and G-L8-12** exit 128 (no `v10.2.0` or `v11.0.0` tag), as passes 13 to 17 read.
- **`src/composables/motion/morph/useDockCtaReceive.ts:259`** reads `matchMedia("(pointer: coarse)")` for a dock CTA's receive path, outside `src/components/dock`, which is the only path W-I.1 G18 reads. G18's claim (W-I.1 §3 item 3) is the dock's density re-declares, and this read chooses an animation path rather than re-declaring density. So it is not a spelling of G18's defect, and no wave's §4 that this seat read names the file. Recorded so the owner of O-81 (3) can decide whether "one pointer model" covers it.
- **Fix 18's open items stand:** real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`; I7-G1's indicator exception works by selector name.
