# D4 · pass 5 · FLOOR v4: the bounded pin and the one MIGRATION row

| field | value |
|---|---|
| seat | D4 pass 5, FLOOR-V4 seat. Builds REGISTRY §P4-6.2 FV4-1 and FV4-2 once, on `../pass-4/floor-v3.patch` (sha1 `f8f57677`), rebases both routes onto it, and measures HEAD + floor v4 and both rebased routes on H5's witnesses in both engines. No paint value, no primitive, no checklist row. Picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | built at `a75b708e9` (`.claude/worktrees/bl/D4/p5/floor4/wt`, detached). The checkout moved to `d3326e846` while the seat ran; `git diff --stat a75b708e9 d3326e846 -- src tests MIGRATION.md package.json demo vite.config.ts docs/tranches/BL/design/tile/harness` is empty, and `git apply --check floor-v4.patch` is clean on `d3326e846`. `src` is the source H5 measured (`H5.md` header) |
| owner | no ruling on Q-2, Q-3, Q-5, Q-10, Q-13 or Q-15 in `audit/INBOUND.md` or `FORMATION-PROGRESS.md`, so both routes were rebased and read at the P4-5 defaults |
| harness | **H5 `bfe1b6beddb0`**, unedited. All 100 witness lines in `floor-v4/logs/reads-*.log` print it |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Every WebKit number here is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | every stage went through `~/.claude/guard/guarded --rss-gb 8`. Browser runs never took `--light`; only the typechecks and three single-file vitest reads did. Every Playwright WebKit run sat inside ONE `--exclusive webkit` hold (`logs/webkit-all.log`). One heavy run at a time. Waits: the Chromium reads queued 19 min 30 s for a browser slot (19:24:07 → 19:43:37); the WebKit lock 33 min (19:59:51 → 20:33:02); the second chain's first build 13 min 33 s. 1-min load across every read: 5.1-18.0. No janky cell, no stall, no engine-closed re-run, no NOT-REPRODUCED line in any log |
| records | `floor-v4.patch`, `D4-Dp.patch`, `D4-F.patch` (this directory); `floor-v4/run-fv4.sh` (every stage), `floor-v4/chain.sh` and `floor-v4/chain2.sh` (the order run), `floor-v4/probes/scope-bound.mjs` (FV4-1's engine probe), `floor-v4/logs/` (every log cited; wall clock and load on the first and last line; `chain.log` has every stage's start and exit). Builds, run JSON and the worktree were scratch under `.claude/worktrees/bl/D4/p5/floor4/` |
| fences | no tracked source edited in the checkout. The only git writes were `git worktree add` / `remove` of `floor4/wt` (removed; `git worktree list` shows no `D4/p5`). `git apply` touched only that worktree. The only checkout writes are under `docs/tranches/BL/design/tile/pass-5/`. **Two slips, self-reported:** one `tail -3` of `~/.claude/guard/log/zone.log` at the start (a read under `~/.claude`; it showed the zone at 7,615-8,241, under the 13M stop), and reading the session's own persisted tool output under `~/.claude/projects/…/tool-results/` twice (the long `H5.md` and REGISTRY reads) |

Short citations as in REGISTRY §P4: `D′c`, `Fc`, `Fs`, `Fp`, `FV3`, `H5`.

---

## 0 · In brief

1. **FV4-1 is built as the registry wrote it**, in `@layer components` in `toggle-group/styles.css`: `@scope (.toggle-group__item) to (.toggle-group) { :scope, :scope * { --selection-tile: inherit !important } }`. **`@scope`'s lower boundary does bound a custom-property subject, in Chromium and in Playwright WebKit.** `probes/scope-bound.mjs` reads it 17/17 in both engines. F's unbounded pin fails it 12/17, the option-only pin 15/17 and no pin 11/17, in both engines. `Fc` §4's selector form also reads 17/17 in both, so both forms are reported (§1). The scoped form ships.
2. **FV4-2 is one MIGRATION row**, route-neutral. A value takes effect on the group element, or on an element between the group and its options, whose options follow it. On an ancestor it has no effect (the group resets it). On an option or its content it has no effect (the pin); only an inline `!important` outranks that. The false comment at `utilities/base.css:54-55` is struck and says what the pin does (§1).
3. **Floor v4 over floor v3: 4 files, +33 lines.** They are the pin, the MIGRATION row, the base.css comment and one assertion in floor v3's sheet case. The whole patch is 38 files, +1375 / −272, sha1 `2d56cc5a`. Typecheck is clean on both projects. The suite runs 2,349 cases and fails only HEAD's 3 `boot-graph` cases. The new assertion fails under each of 3 plants. The library builds (§2).
4. **Both routes rebase clean, and both read the H5 targets in both engines** (§3): FACT matrix **68/68** at `src` and `src-dev`; CANON clean **4/4**, every plant failing and both controls passing; ATTACK **5/5** with X-5 named before ready; CORNER **5/5**; T-2 **52/52**; T-3 migrated **40/43** (C1 ×3, Q-10's). F's struck pin leaves `pill-in-option` and `tile-in-option` passing. **Chromium and Playwright WebKit read the same tally on every gating cell.**
5. **The rebase was not code-free for D′, and the deviation is in test code.** D′'s `src` rebases unchanged. Two of its sheet-reading tests read the floor's `inherit` pin as a second fact writer, and both had to be amended (§3.1):
   - the R-10 writer list now collects only tile values;
   - the corroborating canon unit now reads `@scope` with its root and limit.

   F lost its pin, its pin assertion and its share of the MIGRATION row, as P4-6.1 planned.
6. **X-2 stays open on both routes:** REPORT `name-ink` FAIL, 1.00:1 in light and dark, both engines. Floor v4 adds no paint, so it does not move. F's mark reads 10.70:1 (Chromium) and 10.72:1 (Playwright WebKit) in dark (§3.3).

---

## 1 · The patch, row by row

Floor v4 over floor v3 touches four files. Line numbers are in the patched tree.

### FV4-1 · The bounded pin (M-13)

`src/components/toggle-group/styles.css:53-66`, directly after the group's rules and inside the sheet's one `@layer components`:

```css
@scope (.toggle-group__item) to (.toggle-group) {
    :scope,
    :scope * {
        --selection-tile: inherit !important;
    }
}
```

Its comment states the reason: the geometry reads the fact on the option's parent, and the one-row law, the clip and the names read it on the option. So an option and its content take the value above the option. The scope stops at a nested group, which resets the fact, and that group's options pin to it in turn. `tests/components/ui/toggle-group/ToggleGroup.test.ts` adds one assertion to floor v3's sheet case: the only `inherit` write of the fact is this rule, `@scope (.toggle-group__item) to (.toggle-group)`, `:scope, :scope *`, `!important`.

**The engine question, measured** (`probes/scope-bound.mjs`; Chromium `logs/probe-scope-bound-chromium.log`, load 10.27; Playwright WebKit `logs/probe-scope-bound-webkit.log`, load 11.96 → 12.68, inside the WebKit hold). It uses a hand-made page with floor v4's registration and its group reset. A tile writer stands in for a route's `flush`. There are 17 cells, read by computed value:

- three nesting shapes: a pill group in a tile option, a tile group in a pill option, a wrapper writing `none` inside a tile group;
- four writes the pin must refuse: a rule on the option, a rule on its content, an inline non-`!important` style, a rule writing `flush` on a pill option;
- the one write above the pin, an inline `!important`.

| form | Chromium | Playwright WebKit | cells that fail |
|---|---|---|---|
| **`scope`** (floor v4) | **17/17** | **17/17** | none: the nested pill group's options read `none`, the nested tile group's `flush` |
| `crit` (`Fc` §4's selector form: `:where(.toggle-group__item, .toggle-group__item *):not(.toggle-group__item .toggle-group, .toggle-group__item .toggle-group *)` plus a second rule for a nested group's options) | 17/17 | 17/17 | none |
| `unbounded` (F's pass-4 `:where(.toggle-group__item, .toggle-group__item *)`) | 12/17 | 12/17 | the nested pill group reads `flush` (group, option, content); the nested tile group's option and content read `none` |
| `option` (`D′c` §4's `.toggle-group__item`) | 15/17 | 15/17 | a rule on the option's content writes `none` (content and below) |
| `none` (no pin) | 11/17 | 11/17 | every refused write lands (option, content, inline, `flush` on a pill option) |

Both bounded forms pass in both engines, so FV4-1 ships the registry's form. It is one rule, and it bounds by structure, not by a nesting count. The selector form is bounded to one level of nesting by its second rule (`Fc` §4 states this). Real Safari: UNMEASURED (owner's safaridriver checkbox). This is the `@scope` row of P4-5 #5.

**Unit plants** (`logs/unit-plant-*.log`, each through H5's `unit.mjs`, restore checked against `git diff`):

| plant | the sheet case |
|---|---|
| clean | PASS (1 ran) |
| `pin-unbounded`: the scope loses its limit | FAIL |
| `pin-option-only`: `:scope *` struck | FAIL |
| `pin-gone`: the declaration struck | FAIL |

### FV4-2 · One `--selection-tile` MIGRATION row (M-15)

`MIGRATION.md`, the `--selection-tile` bullet under "Behaviour and paint" keeps "It is `none` on every `ToggleGroup`, and nothing in the library sets it yet" (the floor has no writer) and adds:

> A value takes effect on the group element, or on an element between the group and its options (a grid `div`, a `<section>` per family), whose options follow it. On an ancestor of the group it has no effect, because every group resets it to `none`. On an option or on content inside one it has no effect either: an option and its content inherit the value above the option, and only an inline `--selection-tile: … !important` outranks that.

H5-2 asked FV4-2 to state which way the wrapper cell goes. The matrix prints it: a wrapper write decides for its options. On both routes, both engines, light and dark, `wrapper none` reads "agree: a pill" and `wrapper flush`/`plated` read "agree: a tile" (16 px, 0.59×h/2, a column), in the tile group and the pill group alike (`logs/reads-dp-chromium.log` and the rest). The row says so.

`src/styles/utilities/base.css:51-63`, the comment on `@property --selection-tile`:
- **Struck:** "once, on the group (or any ancestor of its options)". An ancestor of a group never reaches its options.
- **Struck:** "Every reader derives from it … the value inherits from where it is set down to every option and its content". That held at the group, not at the item (`D′c`).
- **In their place:** every group resets the fact to `none`; an option and everything inside it inherit the value above the option and cannot write their own (the pin in `toggle-group/styles.css`); so each option has one value, and every reader reads it.

### Nothing else

There is no paint value (O-87), no primitive and no row. The X-2 name ink (§3.3) is not touched: it is a paint answer, and the task fixes floor v4 at FV4-1 and FV4-2.

---

## 2 · Build, typecheck, unit

The first chain (`chain.sh`) typechecked and ran the suite before each state's library build. Two kinds of failure followed from that:
- the test project's `@mkbabb/glass-ui/fourier-math` self-reference failed vue-tsc (`logs/tsc-fv4.log`, 2 TS2307);
- the dist-reading cases failed, 9 of them on floor v4 (`logs/unit-fv4.log`).

`chain2.sh` builds first and re-runs, as `FV3` did. Those runs are the record:

| state | library build | vue-tsc app · test | suite (H5 `unit.mjs`, maxWorkers 2) |
|---|---|---|---|
| HEAD + floor v4 | exit 0 (`libbuild-fv4-2.log`) | 0 · 0 (`tsc-fv4-2.log`) | **2,349 ran, 2,346 passed, 3 failed** (`unit-fv4-2.log`). The 3 are HEAD's `gate:boot-graph — build arm` cases, as under floor v3 |
| + D′ (`D4-Dp.patch`) | exit 0 | 0 · 0 | **2,352 ran, 2,349 passed, the same 3** (`unit-dp-2.log`) |
| + F (`D4-F.patch`) | exit 0 | 0 · 0 | **2,351 ran, 2,348 passed, the same 3** (`unit-f-2.log`) |

Floor v3 ran 2,349 cases (`FV3` §0). Floor v4 adds an assertion, not a case. `logs/unit-dp.log` (5 failed) is the run on D′'s first rebase, before §3.1's two test amendments, and is superseded.

Bundle: not measured. Floor v4 adds one rule (≈ 120 B of CSS before minification) to floor v3's +15,069 B over the datum. Q-14 is unchanged in kind.

---

## 3 · The rebased routes

### 3.1 · The patches

All three apply in order on HEAD (`git apply --check` clean), and each route patch reverse-applies clean from its own state (`logs/state-*.log`).

| patch | sha1 | numstat | pass-4 source | what changed in the rebase |
|---|---|---|---|---|
| `floor-v4.patch` | `2d56cc5a` | 38 files, +1375 / −272 | `floor-v3.patch` `f8f57677` (38 files, +1342 / −272) | FV4-1, FV4-2 (§1) |
| `D4-Dp.patch` | `b09d15e4` | 8 files, +291 / −9 | `D4-Dp-proto.patch` `2473107b` (+283 / −11) | **`src` unchanged.** Writer rule re-placed beside the pin (same text). MIGRATION: the writer line kept ("`flush` on a `<ToggleGroup shape="cell">`; a rule of yours on the group element itself writes over either"); the ancestor sentence struck (now the floor's). **Two test amendments, below** |
| `D4-F.patch` | `c7072d6e` | 5 files, +281 / −4 | `D4-F-proto.patch` `991415c3` (+300 / −4) | **The pin struck** (`:where(.toggle-group__item, .toggle-group__item *)` and its comment). The sheet case loses its pin assertion and the clause "and the option cannot rewrite it" from its title. MIGRATION: the writer line kept ("`flush` on one whose own options fill `#media` or `#meta`"); its share ("It is the group's: written on an option … has no effect") struck, now the floor's |

**D′'s two test amendments.** P4-6.1 said D′ needed no code change. The first rebase ran D′'s own cases and failed 2 of them on floor v4, in both cases because a test read the floor's pin as a fact write (`logs/unit-dp.log`; reproduced with vitest's own reporter):

- `ToggleGroup.test.ts`, "the declaration writes the tile fact and nothing else (R-10: one spelling)". It collected every `--selection-tile` value other than `none`, and the pin's `inherit` made a second entry. It now collects `flush` and `plated`, the tile values, which is what its comment says ("no other rule in the sheet writes a tile value").
- `radius-role-canon.test.ts`, "the tile corner is one declaration on the field rung". The case's fact reader made a scoped rule's selectors absolute as if unscoped. In happy-dom `:scope` matches the element tested, so the pin's `inherit` won on the pill twin's group (`expected Set{'flush/inherit'} to deeply equal Set{'flush/none'}`). It now reads `@scope (<root>) to (<limit>)`: `:scope` becomes the root, and a group at or under the limit is out of scope.

Both are D′'s sheet-reading test code. The second is the canon unit H5-1 demoted to corroboration (P-3). Neither touches `src`. After the amendments D′'s suite reads 2,352 with HEAD's 3 failures. **The registry's "no code change" held for `src` and not for D′'s tests.**

### 3.2 · HEAD + floor v4 and both routes on H5's witnesses

The builds:
- HEAD + floor v4 with no writer (`fv4-src`, attack `fv4-atk-src[-dev]`);
- each route with its H5 pass-5 route dir (`--route ../pass-5/H5/routes/D4-Dp` and `…/D4-F`), plus the attack set at `src` and `src-dev`.

Readings: Chromium `logs/reads-{fv4,dp,f}-chromium.log` (loads 16.7 → 18.0, 18.0 → 12.4, 12.4 → 10.0). Playwright WebKit `logs/reads-{fv4,dp,f}-webkit.log`, one hold (12.7 → 8.7, 8.7 → 11.1, 11.1 → 5.1). Cells are Chromium · Playwright WebKit.

| witness | HEAD + floor v4 (no writer) | D′ on floor v4 | F on floor v4 | H5's reading on floor v3 (`H5` §3) |
|---|---|---|---|---|
| **FACT** `src` | 47/68 · 47/68 | **68/68 · 68/68** | **68/68 · 68/68** | D′ 57/68, F 55/68 |
| **FACT** `src-dev` | 47/68 · 47/68 | **68/68 · 68/68** | **68/68 · 68/68** | D′ 57/68, F 55/68 |
| **CANON** clean | 2/4 · 2/4 | **4/4 · 4/4** | **4/4 · 4/4** | 4/4 both |
| CANON `a`, `s` | 2/4 · 2/4 | 3/4 · 3/4 | 3/4 · 3/4 | the same |
| CANON `h` | 1/4 · 1/4 | 3/4 · 3/4 | 2/4 · 2/4 (tile corner and pill winner, F's spelling) | the same |
| CANON `layer` | 2/4 · 2/4 | 2/4 · 2/4 | 2/4 · 2/4 | the same |
| CANON `foreign`, `unlayered`, `cq` | 1/4 each · 1/4 each | 3/4 each · 3/4 each | 3/4 each · 3/4 each | the same |
| CANON controls `lowlayer`, `cqoff` | 2/4, 2/4 · 2/4, 2/4 | **4/4, 4/4** · 4/4, 4/4 | **4/4, 4/4** · 4/4, 4/4 | 4/4 |
| **ATTACK** `src-dev` (with `x5`) | 5/5 · 5/5 | **5/5 · 5/5** | **5/5 · 5/5** | 5/5 |
| **CORNER** | 1/5 · 1/5 | **5/5 · 5/5** | **5/5 · 5/5** | 5/5 (pass 4) |
| **T-2** | 52/52 · 52/52 | **52/52 · 52/52** | **52/52 · 52/52** | 52/52 (pass 4) |
| **T-3** migrated | (no migrated arm) | **40/43 · 40/43** | **40/43 · 40/43** | 40/43 (pass 4) |
| T-3 library · unmigrated (not the routes' arm) | 2/39 · 2/39; 12/48 · 9/48 | 2/39 · 2/39; 12/48 · 9/48 | 2/39 · 2/39; 12/48 · 9/48 | — |

Reading the table:

- **The floor alone has no tile.** It ships no writer, so every cell that wants a tile fails. On FACT that is the `declared` pair, the matrix references, and every "unchanged" cell whose reference is a tile (21 cells). On CORNER it is "no tile to refuse". On CANON it is the tile corner and tile winner. That is FV3's shape (`FV3` §4), not a defect.
- **FACT 68/68 on both routes** is H5's target, the M-13 stub's reading (`H5` §3.2), now on the shipped floor under each route's real patch. These cells failed on floor v3 and pass now:
  - D′: `item-none-in-tile`, `item-flush-in-pill`, `content-writes-none`, nested-option ×3;
  - F: `pill-in-option`, `tile-in-option` (light and dark), `nested-group` ×3, `nested-option` ×6.
  - Wrapper cells: §1 FV4-2.
  - On `src-dev`, where the development names gate, every matrix cell passes in both engines, so no option carries a false name or a split.
- **CANON** reads exactly H5's per-plant table on both routes. Every plant fails, both controls pass, and the two engines are identical. **R-7's one instrument passes both routes on floor v4.** The clean read takes 48 twins, container facts `flush/none`.
- **ATTACK `x5`**, both routes, both engines: "console errors counted from navigation (3 in all) · option tc … named 1×, 1 before ready; option pc … named 1×, 1 before ready". The floor-only build counts 4: there the `declared` group is not a tile, and a pill also names its second row.
- **T-3 migrated** fails C1's three cells, on Q-10, on both routes in both engines, unchanged from pass 4:
  - light: 22.50 px² against the 224 bar, fill 1.19:1;
  - dark: 23.00 px², 1.24:1;
  - PRT: 22.50 px², 1.01:1.
- The unmigrated arm reads 12/48 in Chromium and 9/48 in Playwright WebKit on all three builds, so floor v4 does not move it.

### 3.3 · REPORT (route builds only; reported, not gating)

| cell | D′ Chromium · PW WebKit | F Chromium · PW WebKit |
|---|---|---|
| kick, 300 px tiles at a 4 px gap | 0.16 · 0.13 px push (want ≤ 0.05), peak 1.0278 · 1.0275 | 0.16 · 0.13 px, peak 1.0278 · 1.0275 |
| mark, V2 dark | UNMEASURED, no mark (Q-3) | **10.70 · 10.72:1** (#dedbd7 over #292825); light 13.12 · 13.16:1 |
| **name-ink**, K2 light | **FAIL**: name `rgb(112, 89, 66)`, item ink sRGB 28, 25, 23; 1.00:1 selected vs unselected | the same |
| **name-ink**, K2 dark | **FAIL**: name `rgb(195, 185, 172)`, item ink sRGB 233, 230, 226; 1.00:1 | the same |

These are H5's numbers to the hundredth, since floor v4 paints nothing. **X-2's open cell is unchanged.** The selected K2 name keeps the unselected ink because the item's own computed `color` stays the unselected ink, `rgb(112, 89, 66)`, while its `--selection-ink` turns to the edge. REPORT prints "item rgb(112, 89, 66)" beside the item's `--selection-ink` `oklch(0.216 …)`. So the name inherits the item's colour faithfully, and the item's `color` does not take the selected ink.

This seat read the source and ruled two suspects out:
- `text-mono-caption` sets no colour (`typography/utilities.css:44-49`);
- `[data-surface="opaque"]` sets none (`glass/surface-axis.css:81-89`).

The built scene CSS has no `[data-ink]` or `[data-line-slot]` rule. The rule that outranks `.toggle-group__item { color: var(--selection-ink) }` on a selected item is **not traced**. A computed-style trace in a browser is the next read. It is a paint question: the floor states it and does not answer it, because floor v4 adds no paint value.

---

## 4 · For the critics

- **Build on:** `floor-v4.patch` `2d56cc5a`, then `D4-Dp.patch` `b09d15e4` or `D4-F.patch` `c7072d6e`, with the route dirs `../pass-5/H5/routes/D4-Dp` and `…/D4-F` and the attack set `../harness/attack-route`, under H5 `bfe1b6beddb0`. The driver is `floor-v4/run-fv4.sh` (`state`, `build`, `reads`).
- **Rows the floor now closes on both routes** (critics score them, citing these cells):
  - **R-10** (FACT `item-*`, `content-*`, nested-option, both flavours, both engines);
  - **R-2 and E-3** (FACT `pill-in-option`, `tile-in-option`, `nested-group`; and F's MIGRATION sentence "and the other way round", now true);
  - **R-7** (CANON 4/4 with the nine plants);
  - **X-5** (ATTACK `x5`, before ready).
- **Open, not owner:** **X-2** (REPORT `name-ink`, 1.00:1, both routes, both engines; the rule that holds the item's `color` untraced, §3.3). T-7 outside K2 (D′'s `strip`/`f1` paint, XSCRIPT info, `H5` §3.4) is unchanged; this seat did not re-run XSCRIPT, since the route dirs did not change.
- **Owner rows, unchanged:**
  - Q-10 (T-3/E-2: C1 40/43);
  - Q-5 with Q-15 (R-1, R-8);
  - Q-2 with Q-3 (G; F's mark 10.70 · 10.72:1);
  - Q-13;
  - the safaridriver checkbox (E-4), with `@scope` and its lower boundary added to Safari's list.
- **D′'s rebase carries two test amendments** (§3.1). A critic may judge them. They change what D′'s sheet reads count, not what the route paints.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
