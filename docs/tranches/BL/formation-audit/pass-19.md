# BL — formation audit, pass 19

| field | value |
|---|---|
| seat | formation critic, pass 19. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-18, fixes 2-19 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `d948b29b` (fix 19 banked). Under the plan, fix 19 changed one §5 row in `W-I.2.md` (G10) and two in `W-I.7.md` (I7-G1, I7-G3), plus `hold-line-claim.py` and the `.out` files. `git diff b0111693 d948b29b -- docs/tranches/BL/waves` touches those three `\|` gate rows only |
| inputs read | `formation-audit/pass-18.md`; `formation-audit/fix-19.md` (last, as told); W-I.7 §1-§9; W-I.2 §1-§3 and every §5 row; the three rewritten gates rendered through `gates.py`; `hold-line-claim.py`'s docstring, `siblings`, `_outsheets`, `_filed`, `sibling_arm` and `main`; PLAN §3 and §5 by script; `audit/REGISTRY.md` by family-header count; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-19/wt` at `d948b29b`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| fences | no source edit and no git write in the checkout; nothing under `design/` read, run or written; no sibling repo touched. Every plant was undone by a harness that writes back each file's original text. `git status --short` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-19` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FS-01 to FS-03) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Three findings, all on row 3. Pass 18's FR-01 to FR-03 are cured on their own plants. Every sweep exits 0. The new findings:

- **FS-01.** I7-G3 passes the ring reserve put into a seat's padding through a custom property. `src` sets dock-seat padding that way: `padding: var(--dock-icon-padding, …)` at `styles/glass/glass-capsule.css:168` and `dock/styles/controls/icon-button.css:44`, and `--dark-mode-toggle-padding: calc(…)` for the docked toggle at `dark-mode-toggle/dark-mode-toggle.css:62`, read by `padding` at `:11`. The span also passes the reserve written as its own definition, `calc(var(--dock-ring-width) + var(--dock-ring-offset))` (`dock/styles/index.css:240`).
- **FS-02.** G10 reads only `> *` after the run's class. A snap rule on the run's children written as `.dock-run > :not(…)` or `.dock-run > [aria-current]` passes. `run.css:358-364` and `:374-383` write those forms on the same element.
- **FS-03.** `hold-line-claim.py` has no kind for either form. `carried` fires only when a `src` carrier already holds a value the span fails. No kind lists the selector forms `src` writes after the combinator a span reads. FS-01 and FS-02 are its missed instances.

## Sweeps, re-run

The plan read is the checkout's (`d948b29b`). Sweeps that take a tree read the crit-19 worktree, except `fl6-plate-reads.py`, which reads the checkout (as passes 17 and 18 did).

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 704, open 0` |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FS-03).** The new `outsheet` kind holds for what it lists. I re-ran its enumeration with the name filter replaced by a wider one (a class the directory styles and writes, and no other component directory writes). It adds one file for one gate: `configurator/styles.css` for I7-G1, through `.is-active`, which styles configurator rows, not a dock seat. So the name filter misses no instance at HEAD. The narrowness is in two other places: `carried` and selector compounds (FS-03).
- **The other twelve:** no missed instance found.

## Pass 18, re-verified

Each cure was read on a cured base built in the worktree: the gate's HEAD hits rewritten to the spec's §3 form, and the gate exits 0 on it. Pass 18's plants were then appended one at a time, each with a control plant.

| id | verdict | reading here |
|---|---|---|
| FR-01 | cured | I7-G3. Base: `run.css:251` and `:310` (`padding-block`/`padding-inline: var(--dock-ring-reserve)`) removed (exit 0). Control in `run.css` **1**. `.glass-dock .dock-run { padding-block: var(--dock-ring-reserve); }` in `glass-capsule.css` **1**. `.glass-dock .dock-icon-button { padding: var(--dock-ring-reserve); }` in `glass-capsule.css` **1**. `outline-offset: var(--dock-ring-reserve)` **0** (green). HEAD: exit 1 |
| FR-02 | cured | I7-G1. Base: `run.css:357,366,376,384` as `transition: var(--icon-button-transition), <axis> …` (exit 0). Control in `glass-capsule.css` **1**. Pass 18's two plants (seat `inline-size` transition in `glass-capsule.css` and in `material.css`) **1** each. A seat transition inside `@layer components { @media (forced-colors: active) { .dock-icon-button:focus-visible { … } } }` in `a11y-overrides.css` (that file's own nesting) **1**. HEAD: exit 1 |
| FR-03 | cured for its kind; the class is open (FS-03) | the sweep's 704 plants hold (exit 0). The `outsheet` enumeration, imported and run alone, lists the six global files for I7-G1. G10 and I7-G3 now read `src` whole, so they leave the arm's scope |

## Gates re-run at HEAD

**Static gates.** A runner in this seat's scratchpad read every non-struck §5 span through `gates.py` and ran each one that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names none of `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…`, or a lower-case `<…>` placeholder. It ran 4 at a time, with a 60 s cap, stdin closed, in the worktree. 210 spans ran.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 17/22 | 0 |
| A | 30/31 | 0 |
| B | 20/21 | 0 |
| C | 18/19 | 0 |
| D | 4/5 | 0 |
| E | 28/29 | 0 |
| F | 2/2 | 0 |
| G | 16/17 | 0 |
| H | 9/12 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 13/13 | 0 |
| L | 16/18 | 0 |

**Every band reads RED.** The exit-0 spans are the set pass 18 read: the labelled hold lines (W-0.1 G5, W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, D2-G5, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a printed value (C4-G7); a gate that depends on state by its own cell (A1-G11); and a prose fragment (E6-G8). There is no new exit-0 span. Band C ran one span fewer than pass 18's runner under this seat's filter; its exit-0 set (C4-G7) is unchanged.

**Filtered BLOCKER spans, run alone:** W-0.12 G1 **1** (`dock/styles/layers.css:349`); W-0.7 G8 **1**; W-L.7 G-L7-1 **1** and G-L7-4 **1**.

**BLOCKER families.**
- **F-01 (W-A.2).** A2-G3, A2-G7 and A2-G11 exit 1.
- **F-68.** W-0.7 G2, G5 and G8 exit 1. W-L.7 G-L7-1 and G-L7-4 exit 1. W-L.8 G-L8-2 exits 1.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1.

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix 19's three rewritten gates at HEAD:** I7-G1 **1** (`run.css`); I7-G3 **1** (`run.css:251`, `:310`); W-I.2 G10 **1** (`run.css`).

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers and no duplicate. A script over PLAN §3's 102 wave rows (struck text removed) finds all 85, with no extra id. F-30 is named bare in two rows, but as its two sub-ids, `F-30a` (W-E.8) and `F-30b` (W-J.1), each placed once. Every other family in more than one row is `split` or `remainder` in all but at most one row. Fix 19 changed no PLAN line.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band reads RED (table above), every BLOCKER gate that runs statically exits nonzero, and the three rewritten gates exit 1.

## Row 3 · vacuous gates

Each plant below was appended to a file in the worktree on the gate's cured base. The gate's span was run, and the file was restored. Each run had a control plant: the defect, in a spelling the gate already names.

### FS-01 · I7-G3 passes the reserve as a seat's padding through a custom property

- **Where.** `waves/W-I.7.md:44`, I7-G3 ("ring reserve"): `! rg -nU --pcre2 '(?<![\w-])padding[a-z-]*\s*:[^;{}]*--dock-ring-reserve|…' src`. §3 item 2 (`:31`): "the ring reserve moves out of padding into `outline-offset` on the seats". The pass cell: "no `padding*` declaration anywhere in `src` reads `--dock-ring-reserve`". Fix 19 made `.glass-dock .dock-icon-button { padding: var(--dock-ring-reserve); }` a red plant, so a seat padded with the reserve is the defect under this gate.
- **Defect.** The span matches a `padding*` property that names the reserve in its own value. `src` sets dock-seat padding through custom properties:
  - `styles/glass/glass-capsule.css:168`: `.glass-dock .dock-icon-button { padding: var(--dock-icon-padding, var(--dock-control-safe-inset, 0)); }`
  - `components/dock/styles/controls/icon-button.css:44`: `padding: var(--dock-icon-padding, 0);`
  - `components/dark-mode-toggle/dark-mode-toggle.css:56-69`: under `.glass-dock`, `--dark-mode-toggle-padding: calc(…)`, read by `padding: var(--dark-mode-toggle-padding)` at `:11`

  So setting the custom property to the reserve pads the seat with the reserve. The `(?<![\w-])` before `padding` skips `--dock-icon-padding:`, and the span does not follow the read back. The reserve is also spelled out in `src` as its definition, `calc(var(--dock-ring-width) + var(--dock-ring-offset))` (`dock/styles/index.css:240`). Written as a padding value, that spelling passes too.
- **Evidence.** Base: `run.css:251` and `:310` removed (exit 0).

  | plant | exit |
  |---|---:|
  | `.glass-dock .dock-run { padding-block: var(--dock-ring-reserve); }` in `run.css` (control) | 1 |
  | `.glass-dock .dock-icon-button { padding: var(--dock-ring-reserve); }` in `glass-capsule.css` (control, fix 19's red plant) | 1 |
  | `.glass-dock .dock-icon-button { --dock-icon-padding: var(--dock-ring-reserve); }` in `glass-capsule.css` | **0** |
  | `.glass-dock .dock-run > [data-dock-seat] { --dock-icon-padding: var(--dock-ring-reserve); }` in `run.css` | **0** |
  | `.glass-dock .dark-mode-toggle-button { --dark-mode-toggle-padding: var(--dock-ring-reserve); }` in `dark-mode-toggle.css` | **0** |
  | `.glass-dock .dock-run { padding-block: calc(var(--dock-ring-width) + var(--dock-ring-offset)); }` in `run.css` | **0** |
  | `outline-offset: var(--dock-ring-reserve)` on the seats in `run.css` (green) | 0 |

- **Shape of a cure.** Also fail any custom property whose value names the reserve, or its two terms, when `src` reads that property in a `padding*` declaration (`--dock-icon-padding`, `--dark-mode-toggle-padding`). Also fail a `padding*` value that sums `--dock-ring-width` and `--dock-ring-offset`. Add the four plants. The reserve token is dock-only, so a rule against any custom property set to the reserve would also stay clean at HEAD (`rg dock-ring-reserve src` → `run.css:251,252,310,311`, `index.css:240`).

### FS-02 · G10 passes a snap rule on the run's children that does not use `> *`

- **Where.** `waves/W-I.2.md:93`, G10 ("snap targets are declared"): `awk 'BEGIN { RS = "}" } /\.dock-(run|layer|layer--full)[^ {>,]* *> *\*/ && /scroll-snap-align/ …' $(find src -name '*.css')`. The pass cell: "no snap rule in any `src` stylesheet targets the run's children". §2 / R3-01-15 (`:26`): "the run's snap targets are its direct children". §3 item 2 (`:60`): "the snap rule is `.dock-run [data-dock-seat]`". The defect is a snap target picked by child position, not by the marker.
- **Defect.** The awk matches only the universal compound after `>`. `src` reaches the run's children through `>` with other compounds on the same element: `run.css:358-359` (`.glass-dock .dock-run > [aria-current]:not([aria-current="false"])`, `> :has(…)`), `:362-364` (`.glass-dock .dock-run > :not([aria-current]…):not(:has(…))`), and the vertical pair at `:374-383`, which spans three lines. A snap rule on either form makes unmarked children snap targets, so a non-seat child is a member again. The gate passes it.
- **Evidence.** Base: `run.css:270` rewritten to §3 item 2's `.glass-dock .dock-run [data-dock-seat]` (exit 0).

  | plant | exit |
  |---|---:|
  | `.glass-dock .dock-run > * { scroll-snap-align: start; }` (control) | 1 |
  | the same as a three-line selector, as `run.css:380-382` writes it (control) | 1 |
  | `.glass-dock .dock-run > :not([aria-current]:not([aria-current="false"])) { scroll-snap-align: start; }` | **0** |
  | `.glass-dock .dock-run > [aria-current] { scroll-snap-align: start; }` | **0** |
  | `.glass-dock.vertical` / `.dock-run` / `> :not([aria-current]) {` on three lines, with `scroll-snap-align: start` | **0** |
  | `.glass-dock .dock-run [data-dock-seat] { scroll-snap-align: start; }` (green, the cure) | 0 |

- **Shape of a cure.** Fail any rule with `scroll-snap-align` whose selector reaches a child of `.dock-run`, `.dock-layer` or `.dock-layer--full` through `>`, whatever the compound, unless that compound carries `[data-dock-seat]`. Add the three plants.

### FS-03 · `hold-line-claim.py` lists neither form

- **Where.** `formation-audit/sweeps/hold-line-claim.py`, `siblings` (the `carried` enumeration at `:1707-1712`) and the docstring's list of kinds.
- **Defect.** The class (fix 15 to fix 19): a static gate must fail every spelling of its subject that `src` uses.
  - (a) `carried` fires only when `src` declares a custom property whose value the span already fails (`src["carriers"]`). It does not fire when `src` reads the gated property of the gated subject from a custom property, which is the case for dock-seat padding (FS-01). I7-G3's CLAIMS entry therefore has no carried plant.
  - (b) No kind lists the selector compounds `src` writes after a combinator the span reads. G10 matches `> *`, while `run.css` writes `> :not(…)`, `> [aria-current]…` and `> :has(…)` on the same run (FS-02).
- **Missed instances.** FS-01 and FS-02.
- **Shape of a cure.** (a) Extend `carried` so that, for a touched property `p`, each custom property `src` reads in a `p` declaration (`padding: var(--x, …)`) produces a plant that sets `--x` to the gate's red value. (b) Add a kind that, when a span names a combinator after a class, lists each compound `src` writes after that class and combinator, each carried by a red plant.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 19 changed gate rows only, and added no §3 or §6 visual claim.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. Fix 19 changed no LEDGER row. `LEDGER.md:231` (C-8) cites I7-G1 to I7-G4 by id only, so no ledger cell repeats a rewritten span.

## Row 6 · loop pre-emption

No finding. Fix 19 edited §5 rows in two D2 loop waves, W-I.7 and W-I.2. Each change widens the files a gate reads, for a defect the wave already names. No §3 cure and no loop-owned design line changed: `git diff b0111693 d948b29b -- docs/tranches/BL/waves` touches three gate rows.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here, gives 102 §5 rows for 102 specs, a topological order of 102 (so no cycle), 0 dangling ids, and 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}. PLAN §5 is the one record of edges, and every spec's `depends on` field cites it.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 19 adds no break.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

No spec names these spellings, no CLAIMS entry lists them, and `src` has no instance of them in this role.

- **I7-G1, all three CSS arms.** A seat size transition written after a nested rule in the same block passes. Examples: `.glass-dock .dock-icon-button { &:hover { color: red; } transition: inline-size 200ms ease; }` in `material.css`, and the same in `run.css` (both exit 0 on the cured base). Every arm needs the declaration between the rule's `{` and the first nested `{`. A multi-line search of `src` for a declaration that follows a nested rule's `}` finds one hit, inside a comment (`dock/styles/shell.css:324`). `src` writes no such declaration.
- **I7-G1, third arm.** A rule nested two levels below the selector that names the dock passes: `.glass-dock { & .run { & > button { transition: width 200ms ease; } } }` in `material.css` exits 0. Fix 19 recorded this. `src` writes no such nesting in a global sheet.
- **I7-G1, utility arm.** It reads templates in `src/components/dock` only. No template outside that directory writes a `dock-` class (`rg 'class[^>]*\bdock-' src -g '*.vue' -g '*.ts' -g '!src/components/dock/**'` returns 0 lines).
- **G10.** A Tailwind `snap-start` in a template, or a snap rule in an SFC `<style>` block, is not read. `src` writes `scroll-snap-align` in three `.css` files only (`run.css:271`, `carousel/styles.css:39`, `deck/styles/stage.css:115`) and in no template.
- **I7-G2.** It does not read `box-sizing: initial`, `unset` or `revert`, which resolve to `content-box` here. `src` writes no `box-sizing` value except `border-box` and the one `content-box` at `run.css:250`.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as passes 14 to 18 read.
- **W-0.7 G6, G9 and G-L8-12** exit 128 (no `v10.2.0` or `v11.0.0` tag), as passes 13 to 18 read.
- **A2-G6** renders three spans. The second and third are prose in the gate cell (`grep -E`, `git grep -E`), and they exit 2 and 128. The first span is the gate, and it exits 1.
- **Fix 19's open items stand:** I7-G1 finds dock rules by the word `dock` in the selector; the indicator exception works by selector name; real Safari is unmeasured (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
