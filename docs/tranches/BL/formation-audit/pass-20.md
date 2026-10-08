# BL — formation audit, pass 20

| field | value |
|---|---|
| seat | formation critic, pass 20. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-19, fixes 2-20 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `27243e4a` (fix 20 banked). Since pass 19 (`a4ea8339`), the plan changed in two `§5` rows only: `W-I.2.md:93` (G10) and `W-I.7.md:44` (I7-G3), plus `hold-line-claim.py` and the `.out` files. `git diff a4ea8339 HEAD -- docs/tranches/BL/PLAN.md docs/tranches/BL/LEDGER.md docs/tranches/BL/audit` is empty. The two commits between (`94283869`, `1a791c10`) touch `design/` and `FORMATION-PROGRESS.md` only |
| inputs read | `formation-audit/pass-19.md`; `formation-audit/fix-20.md` (last); the two rewritten rows, as diffed and as rendered through `gates.py`; `hold-line-claim.py`'s docstring (`:120-150`) and its new plants (`:826-833`, `:912-930`); PLAN §3 and §5 by script; `audit/REGISTRY.md` by family-header count; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-20/wt` at `27243e4a`, `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| fences | no source edit and no git write in the checkout; nothing under `design/` read, run or written; no sibling repo touched. Every plant was undone by copying back the file's original. `git status --short` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-20` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FT-01 to FT-03) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Three findings, all on row 3. Pass 19's FS-01 to FS-03 are cured on their own plants. Every sweep exits 0. The new findings:

- **FT-01.** G10 drops the parent selector of a nested snap rule when the parent block has a declaration (or an earlier nested rule) before it. `.glass-dock .dock-run { flex: 0 0 auto; & > * { scroll-snap-align: start; } }` passes, though it is HEAD's own defect (`> *`) in the `&` nesting the gate cell says it reads. `src` writes nesting in exactly that shape on a dock rule: `.dock-icon-button {` at `dock/styles/controls/icon-button.css:26`, declarations to `:44` and beyond, then `&:hover` at `:112` and the sibling `&:active` rules at `:122`, `:126`; likewise `controls/tab-button.css:12`, `:27-28`, `:69`.
- **FT-02.** I7-G3's carrier arm reads one hop, and `src` writes a two-hop chain to a seat's padding: `--dark-mode-toggle-padding: var(--control-icon-padding, 0.375rem)` at `dark-mode-toggle/dark-mode-toggle.css:54`, read by `padding` at `:11`. `--control-icon-padding` is not in the arm's list of padding-read properties, so setting it to the reserve on the docked toggle passes. Fix 20 recorded the one-hop limit as "`src` writes no such chain to a padding carrier today"; `:54` is one.
- **FT-03.** `hold-line-claim.py` is too narrow for the class it was widened for. `readvia` lists properties read one level deep only (it does not list `--control-icon-padding`), and `compound` carries the `&` form only as a bare nested rule (`:831`), never after a declaration or a sibling nested rule. FT-01 and FT-02 are its missed instances.

## Sweeps, re-run

The plan read is the checkout's (`27243e4a`, no uncommitted change outside `design/`). Sweeps that take a tree read the crit-20 worktree, except `fl6-plate-reads.py`, which reads the checkout (as passes 17 to 19 did).

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 732, open 0` |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FT-03).** Missed instances: FT-01 (the nesting shape at `icon-button.css:26-126`) and FT-02 (the chain at `dark-mode-toggle.css:54`).
- **The other twelve:** no missed instance found. Their inputs (PLAN, LEDGER, REGISTRY, INBOUND, every wave other than W-I.2 and W-I.7) are byte-equal to pass 19's, and each summary line matches pass 19's.

## Pass 19, re-verified

Each cure was read on a cured base built in the worktree, with pass 19's plants appended one at a time and the file restored after each.

| id | verdict | reading here |
|---|---|---|
| FS-01 | cured | I7-G3. Base: `run.css:251` and `:310` deleted (exit 0). `--dock-icon-padding: var(--dock-ring-reserve)` on `.dock-icon-button` in `glass-capsule.css` **1**; on `.dock-run > [data-dock-seat]` in `run.css` **1**; `--dark-mode-toggle-padding: var(--dock-ring-reserve)` in `dark-mode-toggle.css` **1**; `padding-block: calc(var(--dock-ring-width) + var(--dock-ring-offset))` **1**; `--dock-control-safe-inset:` with the reserve on the next line **1**; `padding: var(--dock-icon-padding, var(--dock-ring-reserve))` **1**. Controls: `padding-block: var(--dock-ring-reserve)` **1**, `padding: var(--dock-ring-reserve)` on the seat **1**. Green: `outline-offset: var(--dock-ring-reserve)` on `.dock-run > *` **0**. HEAD: exit 1 (`run.css:251`, `:310`) |
| FS-02 | cured on its plants; the `&` form is open (FT-01) | G10. Base: `run.css:270` rewritten to `.glass-dock .dock-run [data-dock-seat] {` (exit 0). `> :not([aria-current]:not([aria-current="false"]))` **1**; `> [aria-current]` **1**; the three-line vertical form with `> :not([aria-current])` **1**; `> :has([aria-current])` **1**. Controls: `.dock-run > *` in `run.css` **1** and in `glass-capsule.css` **1**. Green: `.carousel-item { scroll-snap-align: start; }` in `run.css` **0**; `.dock-run [data-dock-seat]` **0**. HEAD: exit 1 (`run.css`) |
| FS-03 | cured for the two named instances; the class is open (FT-03) | the 732 plants hold (exit 0). The plants at `:912-930` carry FS-01's routes, and `:826-833` carry FS-02's compounds |

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

**Every band reads RED.** The 16 exit-0 spans are pass 19's set, unchanged: the labelled hold lines (W-0.1 G5, W-0.10 G3, W-0.11 G5, W-0.2 G3, B15-G3, D2-G5, G2-G4, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a gate that depends on state by its own cell (A1-G11); a printed value (C4-G7); and a prose fragment (E6-G8).

**Filtered BLOCKER spans, run alone:** W-0.12 G1 **1** (`dock/styles/layers.css:349`); W-0.7 G8 **1**; W-L.7 G-L7-1 **1** and G-L7-4 **1**.

**BLOCKER families.** F-01 (W-A.2): A2-G3, A2-G7, A2-G11 exit 1. F-68: W-0.7 G2 and G5 exit 1; W-L.7 G-L7-1 and G-L7-4 exit 1; W-L.8 G-L8-2 exits 1. F-21 (W-E.2): E2-G9, E2-G11, E2-G12 exit 1.

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix 20's two rewritten gates at HEAD:** G10 **1** (`run.css`); I7-G3 **1** (`run.css:251`, `:310`). The carrier arm's list of padding-read properties has 50 entries at HEAD (fix 20 reads 50).

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers, no duplicate. A script over PLAN §3's 102 wave rows (struck text removed) finds all 85 and no extra id; no family is placed unqualified in more than one row (others are `split`/`remainder`). PLAN is unchanged since pass 19.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band reads RED, every BLOCKER gate that runs statically exits 1, and both rewritten gates exit 1.

## Row 3 · vacuous gates

Each plant was appended to a file in the worktree on the gate's cured base, the span run, and the file restored. Each run had a control.

### FT-01 · G10 passes a nested snap rule that follows a declaration

- **Where.** `waves/W-I.2.md:93`, G10. The pass cell says the span reads a selector that reaches past the run "through `>` or a descendant space, on one line or several, through `&` nesting", and the defect is HEAD's `.glass-dock .dock-run > * { scroll-snap-align: start; }` (`run.css:270-271`).
- **Defect.** The awk takes the record up to the snap rule's `}`, cuts the last `{` and what follows, then `sub(/^.*[;}]/, "", s)` deletes everything up to the last `;` or `}`. When the parent rule has any declaration before the nested rule, that deletes the parent's selector too, and the nested selector (`& > *`, with `&` removed) is read alone; it names no `.dock-run`, so `seen` stays 0. The same happens when a sibling nested rule closes before it. `src` writes this shape on dock rules: `controls/icon-button.css` opens `.dock-icon-button {` at `:26`, declares `padding` at `:44` and more, then nests `&:hover` at `:112` and `&:active` at `:122`, `:126`; `controls/tab-button.css` opens at `:12`, declares at `:27-28`, nests at `:69`, `:76`.
- **Evidence.** Base: `run.css:270` rewritten to `.glass-dock .dock-run [data-dock-seat] {` (exit 0).

  | plant (appended to `run.css`) | exit |
  |---|---:|
  | `.glass-dock .dock-run { & > :not([aria-current]) { scroll-snap-align: start; } }` (control) | 1 |
  | `.glass-dock .dock-run { /* c */ & > * { scroll-snap-align: start; } }` (control) | 1 |
  | `.glass-dock .dock-run { flex: 0 0 auto; & > :not([aria-current]) { scroll-snap-align: start; } }` | **0** |
  | `.glass-dock .dock-run { gap: var(--dock-run-gap);` / `& > * {` / `scroll-snap-align: start;` / `}` / `}` (multi-line, as `icon-button.css` writes nesting) | **0** |
  | `.glass-dock .dock-run { &:hover { color: red; } & > * { scroll-snap-align: start; } }` | **0** |
  | `.glass-dock .dock-run [data-dock-seat] { scroll-snap-align: start; }` (green, the cure) | 0 |

- **Shape of a cure.** Resolve a nested rule's selector against its enclosing rules, not against the text after the last `;`: track brace depth over the whole file and keep a stack of selectors, so a rule's full chain is the stack joined. Add the three plants.

### FT-02 · I7-G3 passes the reserve two hops from a seat's padding

- **Where.** `waves/W-I.7.md:44`, I7-G3. The pass cell: "no custom property that a `padding*` declaration or padding utility in `src` reads is set to a value naming one", naming `--dark-mode-toggle-padding` (read at `:11`) as a route. It also says: "The carrier arm reads one hop". Fix 20's open item says "`src` writes no such chain to a padding carrier today".
- **Defect.** `src` writes such a chain on that very carrier: `dark-mode-toggle.css:54`, `.dark-mode-toggle-button[data-size="control"] { --dark-mode-toggle-padding: var(--control-icon-padding, 0.375rem); }`, read by `padding: var(--dark-mode-toggle-padding)` at `:11`. The docked override at `:57-69` excludes `[data-size="control"]`, so a docked control-size toggle is padded by `--control-icon-padding`. That property is read by no `padding` declaration directly, so the arm's list (50 properties at HEAD) does not hold it. Of the 50, `--dark-mode-toggle-padding` is the only dock-seat carrier set from another property (`rg` over each listed property for `\s*:\s*var(--…)`: the rest are `--button-size`, `--card-*`, `--dock-expand-t`, `--field-control-height`, `--ui-scale`, none a dock seat's padding).
- **Evidence.** Base: `run.css:251` and `:310` deleted (exit 0).

  | plant | exit |
  |---|---:|
  | `.glass-dock .dark-mode-toggle-button { --dark-mode-toggle-padding: var(--dock-ring-reserve); }` in `dark-mode-toggle.css` (control) | 1 |
  | `.glass-dock .dark-mode-toggle-button[data-size="control"] { --control-icon-padding: var(--dock-ring-reserve); }` in `dark-mode-toggle.css` | **0** |
  | `.glass-dock { --control-icon-padding: var(--dock-ring-reserve); }` in `glass/glass-capsule.css` | **0** |
  | `.glass-dock .dock-icon-button { outline-offset: var(--dock-ring-reserve); }` in `run.css` (green) | 0 |

- **Shape of a cure.** Close the carrier list over `src`'s own chains: start from the properties padding reads, add every property any of them is set to through `var(--x …)` (as `:54` sets `--dark-mode-toggle-padding` from `--control-icon-padding`), and repeat until the list stops growing; then fail any listed property set to a ring token. Add the two plants.

### FT-03 · `hold-line-claim.py` lists neither form

- **Where.** `formation-audit/sweeps/hold-line-claim.py`, kinds `readvia` (docstring `:129-136`, `_readvia`) and `compound` (`:142-145`, plant `:831`).
- **Defect.** The class fix 20 named: a static gate must fail its subject when `src` spells it through a custom property the gated property reads, or after the selector path the gate reads.
  - (a) `readvia` lists only properties read as a whole value member of the gated property. It does not follow a listed property to the property it is set from, so `--control-icon-padding` (`dark-mode-toggle.css:54`) is never listed and FT-02 has no plant.
  - (b) `compound` carries `&` nesting by one plant, a nested rule that is the parent's first content (`:831`). It lists no plant for the nesting shape `src` writes (declarations, then nested rules, `icon-button.css:26-126`), so FT-01 has no plant.
- **Missed instances.** FT-01 and FT-02.
- **Shape of a cure.** (a) Make `readvia` transitive over `src`'s `--a: var(--b …)` declarations, as FT-02's cure does. (b) When a span reads `&` nesting, add a plant for each nesting shape `src` writes under the gated class's directory: nested rule after a declaration, after a sibling nested rule, and first.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 20 changed two gate rows and added no §3 or §6 visual claim.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. LEDGER is unchanged since pass 19; `LEDGER.md:231` (C-8) cites I7-G1 to I7-G4 by id only.

## Row 6 · loop pre-emption

No finding. Fix 20 edited one §5 row in each of two D2 loop waves (W-I.2, W-I.7). Each widens what a gate reads for a defect the wave already names and cites §3 item 2's existing cure form; no §3 cure or loop-owned design line changed (`git diff a4ea8339 HEAD -- docs/tranches/BL/waves` touches those two rows only).

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here: 102 edge rows for 102 specs, a topological order of 102 (no cycle), 0 dangling ids, 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}. PLAN §5 is the one record of edges.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 20 adds no break.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

No spec names these spellings, no CLAIMS entry lists them, and `src` has no instance of them in this role.

- **G10, the marker inside a negation.** The test is "the last compound contains `[data-dock-seat]`", so `.dock-run > :not([data-dock-seat]) { scroll-snap-align: start; }` passes, though it picks exactly the non-seat children. `src` has no `data-dock-seat` at HEAD (`rg data-dock-seat src` → 0 lines); the wave introduces it. Fix 20 recorded the related `:is([data-dock-seat], .x)` case.
- **I7-G3, a literal reserve.** `padding-block: 4px` or `calc(2px + 2px)` on a seat passes; the reserve's terms bottom out at a literal (`--focus-ring-width: 2px`, `tokens/scale-paper.css:59`). `src` writes no padding as a literal ring sum.
- **I7-G3, the reserve inside a glyph term.** `--dock-control-glyph-size: calc(var(--dock-control-size) - 2 * var(--dock-ring-reserve))` makes the docked toggle's padding (`dark-mode-toggle.css:62-68`) equal the reserve. FT-02's transitive cure would read it only if it followed members inside `calc()`; `src` writes no ring token in a glyph size.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as passes 14 to 19 read.
- **W-0.7 G6, G9 and G-L8-12** read tags that do not exist (`v10.2.0`, `v11.0.0`), as passes 13 to 19 read.
- **Fix 20's observation stands:** W-I.7 §3 item 1's cure form reads `var(--icon-button-transition)`, which `src` does not declare at HEAD; the wave must publish that token or write the list out.
- **Fix 19's open items stand:** I7-G1 finds dock rules by the word `dock` and its indicator exception works by selector name; real Safari is unmeasured (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
