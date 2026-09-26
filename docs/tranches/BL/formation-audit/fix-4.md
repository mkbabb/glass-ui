# BL — formation fix, seat 4

| field | value |
|---|---|
| seat | formation fix seat 4, before audit pass 4. Answers `formation-audit/pass-3.md` (FC-01 to FC-11, and FA-17 still open) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `715912fa` for every probe (the pass-3 commit). A scratch worktree at `HEAD` (`scratchpad/formation/fix-4/wt`, `node_modules` and `tests-visual/node_modules` symlinked, `npm run build` exit 0), removed before return. `src` is the published 10.1.0. Load average 35-39 |
| engines | none run. Every gate re-run here is static (grep, git grep, node over a JSON file). Playwright WebKit is not Safari; real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`, `LEDGER.md`, `waves/W-0.7.md`, `W-0.8.md`, `W-B.2.md`, `W-B.9.md`, `W-B.12.md`, `W-C.2.md`, `W-D.1.md`, `W-E.7.md`, `W-G.1.md`, `W-H.2.md`, `W-H.5.md`, `W-I.1.md`, and this file. Nothing under `design/`, no tracked source, no git write in the checkout. The plan has no `MIGRATION.md` of its own |
| fixtures | three small bite fixtures in this seat's scratchpad (`fix-4/bite/`), outside the checkout: a clean and a planted tree for C2-G5, a filter-free copy of `control.css` for H5-G2, and two `roster.json` files for B12-G2 |

## Result

All 11 FC findings are cured in the plan folder. None is refuted. FA-17 stays open: its cure writes under `design/`, which this seat is fenced from. PLAN §6 now records the run the driver launched and that nothing from it is on disk yet.

How the cures are shaped:

- **Two gates that could not work are fixed at their form.** C2-G5 now carries the cure fix-3 described but never wrote (FC-01). B2-G2 is struck, because B2-G6's join is the one source of record for sender keys (FC-02).
- **Gate paths follow W-D.1's moves.** PLAN §1 gains one rule and W-D.1 gains one step. The move ledger is the one path map, and every wave re-runs its gates at its own base before it builds (FC-03).
- **Loop gates stop deciding the loop.** W-I.1's G27 and G29 are now conditional on D2's Q-10 ruling, and O-84's terminal is FOLD (FC-05). W-H.5's G2 now enacts D3's floor row FL-11 instead of contradicting it (FC-06).
- **Breaks get their rows.** W-B.9 retires the `drawOverlay` prop and gives it a MIGRATION row and a born-RED gate (FC-08). W-I.1 removes `--dock-plate-cross-px` in 11.0.0, with `--dock-cross` as its successor (FC-09).
- **#64b enacts itself.** W-B.12 writes the ruling into the three holders' `law` fields, and its gate reads that edit, not W-A.2's (FC-04).

After the edits the DAG was re-walked: 99 waves, 0 cycles, 0 dangling ids, 0 edges into a later band. A column-count check over every table in `PLAN.md`, `LEDGER.md` and `waves/*.md` finds 0 mismatches.

## Findings

### FC-01 · C2-G5 unchanged and green under the rendered form

**Cured.**
- **The gate.** `waves/W-C.2.md:66` now reads `npm run build && ! grep -rq -e DISSOLVE_DIALECTS -e dissolveDialect src dist`. It uses two `-e` patterns and no alternation pipe, so the raw and rendered forms are the same command. The build runs first, because grep exits 2 on a missing `dist` and the `!` would turn that into a pass.
- **Readings** in the worktree with `dist` built:
  - the new form exits 1, with hits in `src/composables/motion/dissolve/dissolveGrammar.ts`, `dist/motion-core.js` and `dist/composables/motion/dissolve/dissolveGrammar.d.ts`;
  - the old rendered form (`"DISSOLVE_DIALECTS|dissolveDialect"`) exits 0, as pass 3 read it.
- **Bite.** On a clean fixture the grep half exits 0. With one planted `DISSOLVE_DIALECTS` line it exits 1.
- **Why fix-3's cure was missing.** Fix-3's report described it, but `1f2d48fc` did not write it (pass 3's reading). This seat edited the row and checked the line on disk after the edit.

### FC-02 · B2-G2 cannot pass in the rendered form

**Cured by striking it** (`waves/W-B.2.md:107`, with the note at `:116`).
- **Why strike rather than rewrite.** B2-G2 counts `value.js:O-n` sender-refs, and that count is derived data of B2-G6's join. B2-G6 (`verify-inbound.mjs`) already requires every glass-addressed sender row to have an INBOUND row with its `sender-ref`. It stays the one gate on sender keys.
- **Evidence.** The rendered form `grep -cE '| *value\.js:O-[0-9]+'` prints `grep: empty (sub)expression` and exits 2 under `/usr/bin/grep`, measured in the worktree.
- **Other citations.** `grep -rn B2-G2 PLAN.md LEDGER.md waves audit` finds only the struck row and the note.

### FC-03 · Path-pinned negated gates fail open when W-D.1 moves their file

**Cured at the cause: the move is now what re-points the gates.**
- **PLAN §1 rule** (`PLAN.md:29`, "Gate paths and the base re-run"). A gate's paths are HEAD paths, and W-D.1's move ledger is the one path map. Every wave's first act is to run its §5 gates at its own base and record that reading. A gate that reads green at its base while its defect stands (a moved file, an empty pathspec, an absent file under a `!`) is re-pointed through the move ledger before any build. No gate enters a wave green unless it is a labelled hold line with its bite.
- **PLAN §2.** The D bullet (`PLAN.md:67`) adds that later waves' gates follow the moves either way. W-D.1 can land after bands E onward when D1 converges late, and the rule covers that order too.
- **W-D.1 §3 step 11** (`waves/W-D.1.md:78`). In the commit that lands the moves, the wave re-points every moved path that a §5 gate of an unlanded wave names. §4 lists those gate paths among the files it touches. A path whose deletion is its own wave's cure stays as written.
- **Count.** `` grep -nE '`! (git )?grep[^`]*src/[A-Za-z_/.-]+\.(ts|vue|css|mjs)' waves/W-[E-L]*.md | grep -v '~~' ``, finds 22 negated single-file gates in bands E to L. Pass 3's wider script also counts directory pathspecs and finds 29. Both counts are recorded in the step.
- **Why not rewrite each gate.** Rewriting the 29 gates one by one would fix today's paths but not the mechanism. The next move would open them again.

### FC-04 · #64b's only gate goes green on W-A.2's act

**Cured.** W-B.12 now has an act of its own in the tree.
- **The act** (`waves/W-B.12.md:30`, §3 item 2). The ruling is written where the holders enforce it: the `law` field of roster entries G-13, G-42 and G-01 gains `#64b`, one clause each. `law` is already in W-A.2's schema (`W-A.2.md` §3 item 1), so no field is added. W-A.2 names none of these entries with `#64b`. The wave runs `scripts/bites.mjs` after the edit, as W-A.2 requires of any wave that edits an entry. §4 (`:35`) now lists `tests/gates/roster.json`.
- **The gate** (`:41`). B12-G2 requires each of the three entries to exist and to carry `#64b` in `law`. The command contains no pipe character.
- **Readings:**
  - exit 1 at `715912fa` (`roster.json` absent);
  - still exit 1 at W-B.12's base, where W-A.2 has landed but no entry names `#64b`;
  - on a fixture roster with `#64b` in all three `law` fields, exit 0;
  - with it removed from G-13 alone, exit 1.
- **Ledger.** `LEDGER.md:163` names the act.

### FC-05 · W-I.1 G29 and G27 decide D2's Q-10

**Cured.** No gate now picks between Q-10 (a) and (b).
- **G27** (`waves/W-I.1.md:229`) and **G29** (`:231`) are written for Q-10 (b), O-84's ask. Under Q-10 (a), D2's standing default, each is recorded "retired with D2's ruling" with D2's words, in the same form as G24. G29's floor half stays as a hold line under either ruling.
- **§3.1 item 2** (`:128`) now says so and ends "No gate here picks between (a) and (b)".
- **O-84's terminal** (`LEDGER.md:482`) is now FOLD W-I.1. Under (b) the row is BUILD through G27 and G29. Under (a) it is DECLINE with D2's words.
- **Counts.** LEDGER §9 is recounted: §7 is BUILD 12, FOLD 6; the totals are BUILD 492, FOLD 127 (`LEDGER.md:531`, the total row, and the recount note). A script over §7 reads BUILD 12, FOLD 6, RETIRE 1.
- **HEAD readings are unchanged.** G27 reads `overrunPx 28` with `aspect "1 / 1"`, and G29 exits 1.

### FC-06 · H5-G2 requires the well filter D3's floor removes

**Cured.** G2 now enacts FL-11 instead of contradicting it.
- **The gate** (`waves/W-H.5.md:48`). H5-G2 is now "the well has no filter of its own", `! grep -nE 'backdrop-filter' src/components/_shared/field/control.css`.
- **HEAD reading.** Exit 1, with hits at `:76` (the "currently inert" comment), `:104` (`backdrop-filter: var(--control-surface-blur);`) and `:138` (the transition leg). A copy of the file with those lines removed exits 0.
- **The probe row.** The band-H probe's `H2/WELL-INERT` row reads `{ missing: true }` when the well has no filtered element and passes on `kw.inert !== true` (`W-H.1.md:408-410`). So after the cure the probe agrees with the gate.
- **The cure text.** §3 item 1 (`:36`) states FL-11 and names the two lines that go. §1's #82 G-F2 row names the same cure. §5's can-pass note and the §6 π column are updated. The note also says that if D3's converged spec overturns FL-11, the wave's entry re-writes G2 from that spec. That is the loop-wave rule, not a second path.
- **The same fact elsewhere:** `W-H.2.md:119`, `LEDGER.md:148` (#56d), `:196` (#82a) and the PLAN §3 row (`PLAN.md:190`) now say the same thing.
- **H5-G1** (transmission) and **H5-G3** (`--input-on-glass` gone) are unchanged; they already agreed with FL-11.

### FC-07 · W-0.2's fallback edge closes a cycle

**Cured in §5, the one record of edges.**
- **The edges.** W-0.5 and W-0.7 now wait on "W-0.2's band-0 terminal" (`PLAN.md:274`, `:276`).
- **The note** (`PLAN.md:373`). That terminal has two states, both reached inside band 0 (`W-0.2.md` §8): landed in 10.2.0, or recorded "rides W-H.1 at 11.0.0". Under the rider, W-H.1 carries O-76's build as its own row (`W-H.1.md` §1) with W-0.2's gates, and W-0.5's G2 is re-run on W-0.1 alone. No edge runs from band 0 to W-H.1.
- **W-0.7's entry rule** (`waves/W-0.7.md:55`) now cites §5 instead of restating the condition.
- **The walk.** A topological walk over §5 finds 99 waves, 0 dangling ids, 0 later-band edges and 0 cycles.

### FC-08 · `drawOverlay` hands consumers a Canvas2D context W-B.9 deletes

**Cured: the prop retires, with a MIGRATION row and a born-RED gate.**
- **The ruling** (`waves/W-B.9.md:26`, §3 item 1). After the port the host canvas holds a WebGPU context, so there is no 2D context to hand over. A 2D overlay canvas made by the library would be a second engine, and it would fail B9-G2 and W-G.1's G1-G3.
- **The successor already ships.** `useConstellation` exposes `field` (`:463`, which the README calls "the low-level imperative seam for a custom overlay") and `isFrozen` (`:464`). A consumer stacks its own layer and reads them.
- **§3 item 2.** The slides label-text item now points at that layer.
- **§4** adds `constellationTypes.ts`, `PROCEDURAL-SUITE.md`, the demo story, `manifest.ts` and the palette-lifecycle test.
- **B9-G3** (`:42`), `! git grep -n drawOverlay -- src demo tests`, exits 1 at `715912fa`: 42 lines in 8 files, counted per file with `git grep -c`. The same command over a pathspec without the seam exits 0.
- **§6** adds the story's focal-skin pair, before and after.
- **§7** (`:54`) has the MIGRATION row.
- **Consumers.** No sibling calls the prop. `grep -rln drawOverlay ~/Programming/slides/src` prints nothing. atlas names it only in comments (`Constellation.host.vue:11,15`, `Atmosphere.vue:47`), because its host already paints on its own 2D layer. Both were read, not written.
- **Ledger.** `LEDGER.md:111` (#45b) names the retirement.

### FC-09 · `--dock-plate-cross-px` has no 11.0.0 disposition

**Cured.**
- **The MIGRATION row** (`waves/W-I.1.md:261`). `--dock-plate-cross-px` is removed, and `--dock-cross` (`seat + 2·pad`, §3.2 item 1) is its successor. It is removed whatever Q-1 rules, because its only reader is the cap rest and `--dock-cross` gives the same size under one published name.
- **G11** (`:218`) gains a `dock-plate-cross-px` arm, so the removal has a gate. G11 still exits 1 at `715912fa` with 38 lines. The property itself is absent at HEAD (`git grep -n dock-plate-cross-px -- src` → 0 lines); W-0.8 adds it in 10.2.0.
- **W-0.8 §7** (`waves/W-0.8.md:87`) says the property lives for the 10.x line only, and cites W-I.1 §7 as its one record.

### FC-10 · The micro floor has no paired capture

**Cured** (`waves/W-E.7.md:117`, `:120`).
- **The scene.** §6 Surfaces now names fix-3's appendix Q1 scene, which moves into the wired spec.
- **The pair.** The paired capture gains the micro floor's own pair: the `.text-micro` span at coarse 390 and fine 1440, light and dark, Chromium and Playwright WebKit, before and after, cropped to the span.
- **Its π.** E7-G17's computed `font-size` (11 → 12 at coarse; 11 → 11 at fine) and the glyph-box height from the capture.
- **E7-G18.** The strip's `::after` hit area paints nothing, so §6 says it has no capture.

### FC-11 · W-G.1's header still places the constellation's port

**Cured.** W-G.1 no longer claims any of the constellation's port.
- **The families field** (`waves/W-G.1.md:9`) no longer lists "W-B.9's BUILD". It states that #45 and R2-06-10's constellation half are W-B.9's, citing PLAN §3 and `LEDGER.md:110-111`.
- **The MIGRATION row** (`:116`) covers Aurora, Blob and FourierField only. It notes that the constellation never rendered on WebGL2: its engine was `useCanvas2D`, `useConstellation.ts:287`.
- **The `ConstellationField` "gains `pinned` and `drift`" row is deleted.** W-B.9 §3 item 2 records `pinned`, `pinnedDrift` and `accentEdges` as CURED at HEAD.
- **The feature pass** (`:139`) names the constellation as W-B.9's.
- **The appendix** (`:194`) no longer describes the struck G1-G10.
- **Check.** After the edits, `grep -n -i constellation waves/W-G.1.md` finds only lines that route the subject to W-B.9, or that measure the route's context tally, which G1-G4 keeps for the aurora ground's `webgl2`.

### FA-17 · D5 has no portfolio

**Still open, owed outside this seat's fence.**
- **The record.** `FORMATION-PROGRESS.md:87` records D5 opened as run `wf_4193b8cb-4a4`.
- **Nothing on disk yet.** At `715912fa`, `ls docs/tranches/BL/design` prints `dock material structure tile`.
- **PLAN §6** (`PLAN.md:383`) now records both facts. W-J.2's executable gates stand, and the act is still owed before W-J.2's turn.

## Open

- **FA-17.** It needs the D5 run's portfolio, registry and battery on disk under `design/engagement/`. That is a driver act, and this seat is fenced from `design/`.
- **Pass 3's notes outside the checklist were not acted on.** One of them, INBOUND's O-84 and O-84a "RE-RULED … band 0" dispositions, sits in `audit/INBOUND.md`, which is outside this task's writable files.
