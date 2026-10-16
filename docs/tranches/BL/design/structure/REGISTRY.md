# D1 · pass 1 · REGISTRY: the approach families after pass 1

| field | value |
|---|---|
| seat | D1 pass-1 agglomeration. Closes pass 1 with each family's status, the facts every family inherits, the merges, one new family and the pass-2 plan. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a2eb1c06`. `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines, so every prototype and critique measured this code |
| inputs, read in full | `PORTFOLIO.md`; `pass-1/W.md`, `X.md`, `SPECS.md`; `pass-1/D1-{A,B,C,D,E,F}.md`, `D1-{A..F}-proto.md`, `D1-{A..F}-critique.md` |
| instruments | none. This seat re-measures nothing. Every number cites the report that measured it, which stays the source of record (P-3) |
| fences | no source edit, no git write; this file is the only write |

Short citations: `A-crit §5` is `D1-A-critique.md` §5, `B-proto` is `D1-B-proto.md`, `SF-n` is SPECS "Shared facts" row n.

---

## 0 · In brief

| id | family | status | convergence | reason in one line |
|---|---|---|---:|---|
| D1-A | graph-derived home | **BLOCK** | 35% | missing primitive: a declared module boundary. The graph places files but can neither find modules nor name them |
| D1-B | sealed family modules | **ADVANCE** | 40% | the door seal over resolved static imports held on the whole tree. What remains is gate rules and authoring, not a missing primitive |
| D1-C | workspace packages | **BANK** | 40% | resolver privacy refuted (P2, P3, X14). What remains is B's door rule at package grain |
| D1-D | declared strata | **ADVANCE** (as D′) | 45% | direction with fail-closed resolution holds. Pass 2 builds D′, and D′ must answer colocation below the unit |
| D1-E | unit manifests | **BANK** | 35% | visibility converges by relocating targets. The one declared fact that survives is floor row 6 |
| D1-F | lifecycle capsules | **BANK** | 30% | moves 0 of 658 source files. It is a lifecycle layer, not a structure route |
| D1-G | eponymous closures | **OPEN** (minted here) | — | unresearched. Drawn from A Q5, A §15, D-crit §3.4, X §2.2 and X §3.4 |

Three findings shape pass 2.

1. **The families differ in how they declare the unit set. They agree on how a file is placed relative to it.** Five mechanisms place a file the same way: A's LCA, B's proposed G3 ownership clause, D's owner return, E's global-zone rule and F's single-consumer rule. A file read by one unit lives in that unit, counted by symbol through barrels. That rule moves to the floor (§3, F-7) with two owner rulings attached (R-2).
2. **Every family stalled on module identity.** The mechanical carves produced placeholder names or none:
   - A: 27 `-N` pieces, `w38`, `group`, `deep`
   - B: `part-1`, 23 `.partN` files with relays
   - E: `shaders/glass/`
   - F: C4 off, with a 51-file dock root
   - D: nothing carved
   
   SF-11 held everywhere: the graph places files, and people name them. The routes left alive are the ones whose unit declaration can carry an authored name: B through the door, D′ through the charter row and top dir, and G through the root file's own name.
3. **Every gate converged partly by construction**, in three ways:
   - the migration computes placement with the gate's own function (A P4/P6, F C1);
   - it widens the boundary it judges (B R1/R2 door growth, F's minted doors, E's lifts);
   - it generates the records the gate checks (C's C3/C4/C6).
   
   The critics' plant batteries, aimed at what each rule is *for*, got through: A 19 of 23, B 14 of 17, C 17 of 18, D 20 of 27, E 19 of 19, F 13 of 17 (plus 2 misdirected). In pass 2 a gate counts only against a battery written independently of it (F-9).

---

## 1 · Registry

| id | unit set declared by | enforced between units | placement given units | status | conv. | re-trigger / missing primitive / refutation | merged | pass-2 role |
|---|---|---|---|---|---:|---|---|---|
| D1-A | derived from the graph (LCA dirs, lexical depth, stem carve) | P5 acyclicity only | LCA, door reading | BLOCK | 35% | a declared module boundary (A-crit §6) | its placement law → F-7 (M-1) | none. Reopens only as F-7 over a module tree that B or G lands |
| D1-B | dirs with an `index.ts` door; first level = measured families (cohesion ≥ 0.5) | privacy: V2 recursive door seal | G3 symbol ownership (proposed) → F-7 | ADVANCE | 40% | — | absorbs E's visibility (M-2) and C's residual gate (M-3) | second pass |
| D1-C | packages from the charter sketch | resolver + custom C2/C3 | none (borrowed) | BANK | 40% | C′ asked for; an isolated linker; B's gate cannot hold `procedural`/`tokens` | → B-pkg substrate variant (M-3) | none; triggers watched |
| D1-D | six ranked strata + charter rows + top dirs (D′: a table over today's dirs) | direction: rank rule, intra-stratum acyclicity | owner return (`charter-owned`) → F-7 | ADVANCE (D′) | 45% | — | its owner return → F-7 (M-1) | second pass, as D′ |
| D1-E | position + 75 `unit.ts` manifests | position-private nested dirs | global-zone rule → F-7 | BANK | 35% | R-2 picks declared families, or a route needs a per-unit fact beyond the entry name | entries → F-3 (M-4); visibility → B (M-2); global-zone → F-7 (M-1) | none; trigger watched |
| D1-F | dirs with a door (capsules), suffix set | C2 door (top-level only) | subject law for artifacts; source placement unbuilt | BANK | 30% | reopen as the lifecycle step once a route's source placement lands | harvest → F-5, F-6 | none before pass 3 |
| D1-G | named roots: SFCs, entries, and files that dominate a private closure | ownership by dominance | immediate named dominator; F-7 for the rest | OPEN | — | new | — | first full pass (research, prototype, critique) |

---

## 2 · Family entries

### D1-A · Graph-derived home: BLOCK, 35%

**Missing primitive.** A declared module (feature) boundary. The import graph places files, but it cannot say which dirs are modules or what to call them:

- The connected-components carve returns one component per unit (dock 40, aurora 35).
- The lexical carve recovers only what people already named (5 of dock's 7 features).
- Aurora's two backends and sortable-list's drag engine share no token (D1-A Q5; SF-11).
- On the whole tree, the depth half dissolved 26 authored dirs, and the carve rebuilt stem-named dirs that are cyclic with their parents (A-crit §3.1).

**Proved by running** (A-proto, re-run by A-crit §1):

| result | measure |
|---|---|
| migration by script | 549 moves over five zones, 4 deletes, 31 stylesheets split into 109 pieces. Library and demo builds green after every stage |
| surface | `exports` (68) and `typesVersions` (62) byte-identical; 63 doors × 1,279 names identical. `public-surface.spec.ts` passes all 96 assertions (an independent witness) |
| cascade | the flattened `styles/index.css` is identical rule for rule (7,740 leaf rules), as are the `glass-ui.css` (1,304) and `component-styles.css` (1,386) sequences. `playwright --list` identical (1,989) |
| cycles | P5 2 → 0: M02 and M03 dissolve by placement once non-door barrels are dissolved |
| gate | RED 472 at HEAD, 65 migrated; 11 of 12 prototype plants caught |
| not proved | 237 of 2,323 HEAD-passing tests stop passing (116 fail, 121 are never collected). `import-dag.mjs` goes from exit 0 to exit 1 with a new `dock ↔ src/styles` value SCC. No paint check, no Playwright execution |

**Strongest counterexample.** The depth half passes by construction. 26 HEAD dirs dissolve (`demo/shell` with 21 files, `sheet/detents`, `fourier-field/renderer`). `tests/components/button/Button.test.ts` lands in `tests/invariants/` because it reads one global stylesheet. The gate is green on both (A-crit §3.1).

**Open gaps** (source of record: A-crit §5, 18 gaps).

| kind | gaps |
|---|---|
| the primitive | 1 · the depth half destroys authored modules. 2 · module identity cannot be derived: 10 dirs and 54 files stay over the bound, and duplicate basenames go 15 → 50 |
| placement | 3 · borrowed engines leave their owners: 17 files, among them the deck engine, `dockContext` and dock's constants. 4 · global slots are unchecked subtrees; 31 of 95 `src/composables` files are held only by publication; no direction rule. 5 · kind slots unchecked. 6 · two home functions over 68 stylesheets. 7 · the test mirror puts 33 component-named tests in `tests/invariants/` |
| gate | 8 · P5 is blind to style and sub-module cycles (dir SCCs 9 → 11). 9 · CSS ownership is a string bag. 10 · no encapsulation clause. 11 · pins by regex and glob. 12 · graph-invisible edges are not P0. 13 · the token rule was neither run nor gated |
| state | 14 · not GREEN. 15 · dual regimes left. 16 · the backend treatment is JS-only. 17 · rulings owed. 18 · not run |

**Harvest into the floor** (A-crit §6):
- the LCA ownership invariant, with its converse → F-7;
- the AST move engine (specifiers, globs, `vi.mock`, `new URL`, partial path strings) → F-2;
- the P0 resolver → F-1;
- the cascade-sequence verifier → F-4.

**Reopening.** A reopens only when all five A-crit §6 conditions hold. Conditions 3-5 are floor items (F-1, F-4). Condition 1, declared module boundaries, is what B (G4) and G each attempt in pass 2. If either one lands a module tree, A's law is the within-module clause F-7 already carries. A would then return as that clause, not as an independent route.

### D1-B · Sealed family modules: ADVANCE, 40%

**Proved by running** (B-proto; B-crit §1 regenerated the plan byte-equal):

| result | measure |
|---|---|
| migration by script | 17 scripts, no hand moves: 500 moves, 2 deletes, 16 family doors. A replay is byte-identical (`diff -rq` 0) |
| cycles | 4 inversions take value SCCs to 0 at every depth: kernel doors stop re-exporting family code; overlay owns `OverlayHost` and dock provides it (M02's participation edge is **inverted**, not relocated); `useTabRovingFocus` → `motion/morph`; `ModalOverlay` behind `overlay/modal/` |
| toolchain | build, demo build, vue-tsc ×2, `npm pack`, `regen-exports` EXACT; 68 export keys byte-identical |
| gate | 805 → 7. Only R6 remains: 7 files over 500 lines that no mechanical carve can split. 13/13 plants caught, including relative, `@glass`, `/src/` and type-only deep reaches. R0 fails on unresolved edges |
| not proved | vitest has 109 failures in 30 files. The terminal accessibility block moves from rung 1919 to 1243 and ships in dist, and nothing catches it (the `vite.style-fold.ts:89-92` fallback). The demo's eager boot graph grows by 207,621 B (`boot-graph` red). 97 names become public and 19 leave every subpath |

**Strongest counterexample.** C-6 (B-crit §2-3). A door-less `components/zz-pip/`, deep-imported by dock, passes the gate and the subpath classifier. Leaving out `index.ts` unseals a dir, and 19 of the migration's own 21 carved dirs are door-less. The seal is opt-in.

**Open gaps** (B-crit §6, G1-G19).

| kind | gaps |
|---|---|
| gate rules | G1 · S2 door-to-door re-exports are not coded; 4 exist on the migrated tree. G2 · S7 kernel direction holds only when a cycle closes. G3 · no placement clause: 4 single-owner kernel files, 3 aurora-only family files. G4 · the seal is opt-in. G5 · R6 skips demo, tests and tests-visual, and skips test files. G6 · `@generated` opt-out. G7 · the tracer misses non-literal `import()`, fs and `new URL` reads, `src → demo`, and CSS into door-less dirs. G8 · R1 and R2 converge by door growth, with no surface pin |
| authoring | G9 · a lexical carve: 23 parts and 21 placeholder dirs that ship in dist. G10 · 12 re-export shim lines and a byte-copied `index.d.mts`. G14 · 7 files over 500 lines; both SFC routes fail |
| design | G12 · leaf doors against code splitting. G15 · the family table is written 3 times; `forms` vs `fields` + `binary` is unruled. G16 · the kernel taxonomy is copied into families (19 dirs). G17 · 4 family doors are `export {};` with 0 importers |
| other | G11 · the masked style-fold fallback (→ F-4). G13 · 111 failing tests. G18 · backend. G19 · no paint check |

**Why it advances.** No gap in G1-G19 needs a primitive as hard as the problem (B-crit §6). They are additive rules on a tracer that already exists, authoring every family owes, and one design question (G12).

### D1-C · Workspace packages: BANK, 40%

**Refuted claim: "the resolver enforces privacy."**
- P2: an undeclared `@glass-ui/*` import that closes a package cycle compiles.
- P3: a relative reach into another package compiles.
- X14: a real kernel → overlay → kernel cycle, run through a `test/` dir inside library source, passes the gate, the root typecheck, `vue-tsc -b` and the build, and ships in `dist` (C-crit §2).

Enforcement comes from a custom gate here, as in every other family (SF-10).

**Proved by running** (C-proto, re-run by C-crit):

| result | measure |
|---|---|
| migration by script | 18 library packages and 6 tooling packages: 646 files, 132 tests, 1,346 specifiers, 354 literals, 9 location-derived roots |
| toolchain | vue-tsc ×2, build, demo build, `regen-exports` EXACT, pack, and `verify:package` after the owed ratchet rebind |
| surface | 68 keys byte-identical; 1,279 declaration and 603 runtime names identical |
| cascade | the published `./styles` import sequence is unchanged, accessibility last. The terminal anchor became `STYLE_ROLES.terminal`: resolved through `exports`, throwing on a miss |
| gate | C1-C8 built. C2 and C3 catch what TS references miss; 10/10 prototype plants |
| not proved | 29 test files fail structurally. C7 falls 443 → 90 mostly by relabelling: 193 of 342 `sourcePath` calls read foreign privates, scan foreign dirs or read tooling internals. Warm builds ship stale declarations. Cold builds take 17-36 s against HEAD's 7.4-8.2 s. Placement inside a package is undefined |

**Strongest counterexample.** X14, above.

**Open gaps** (C-crit §6, 18):
1. placement inside a package is undefined;
2. the package DAG forces re-homes that move files away from their components;
3. styles are not colocated, and `tokens` depends on `controls`;
4. the long modules are not broken (`procedural`: 89 files, 20,849 lines);
5. C7 converges by relabelling;
6. 5 bypasses the whole toolchain accepts;
7. gate claims that do not hold;
8. stale warm-build declarations;
9. duplicated records kept equal by gates;
10. residue;
11. 120 lockfile `dev` flags lost;
12. the published manifest gains `imports`, `workspaces` and private devDependencies;
13. 253 per-file doors;
14. build cost;
15. CI not run;
16. the demo and `tests-visual` not moved to `apps/`;
17. backend;
18. the E-8 budget.

**Re-triggers** (C-crit §7):
- the owner asks for C′, i.e. published or versioned sub-packages;
- the install moves to a strict isolated linker, measured against P2 and X14 first;
- an advancing route's gate cannot keep `procedural` and `tokens` encapsulated without hard boundaries.

**Merged** (§4 M-3). What is left of its gate (C2 relative escape, C3 declared-and-a-door) is D1-B's door rule at package grain. If a trigger fires, C reopens as B-pkg, a substrate variant of B.

**Harvest:** `workspaceRoot()` in place of 8 location-derived roots → F-2; the declared style role → F-4; C7's literal census as input to F-6.

### D1-D · Declared strata: ADVANCE as D′, 45%

**Proved by running** (D-proto, re-run byte for byte by D-crit §1):

| result | measure |
|---|---|
| full D migration | 550 moved, 2 deleted, 940 specifiers, 480 literal paths, 20 authored hunks; replay identical |
| toolchain | build, demo build, vue-tsc ×2, `regen-exports` EXACT (68/68, fidelity 63/63), pack; 603 runtime and 1,279 type names identical |
| gate | 301 → 0; 22/22 plants caught |
| cycles | `import-dag` shows M02 and M03 gone. No motion knot, because the aggregate doors moved to `src/motion.ts` and `src/motion-core.ts` |
| cascade | the cascade-identity arm reads the 4 export cascades as identical (2 byte-identical, 2 modulo scope ids). It catches M-D2 (chip band strength 22% → 18%); vitest does not |
| tests | 10 fail, all against `gate-register`'s closed-record roster |
| D′ (research §8.1) | 19 moves, 107 specifiers, gate 22 → 2, the 4 CSS export entries byte-identical, vitest back at baseline |
| found | CSS `url()` breaks silently: the demo shipped 0 woff2 with exit 0. `url()` is now an edge kind the gate fails closed on |

**Strongest counterexample.** C01 (D-crit §2). `import type { SliderProps } from "@mkbabb/glass-ui/slider"` inside a primitive passes the gate, which drops bare specifiers (`graph.mjs:46`), then vue-tsc and the build. With a value import, the build bundles the previous `dist` into the `./reactive` chunk.

Runner-up (D-crit §3.1): the upward edge `glass.css:68 → chip/accent-tone.css` is exempted by the cascade-root anchor, not cured.

**Open gaps** (D-crit §5, 25).

| kind | gaps |
|---|---|
| gate integrity | 1 · the self-name bypass. 2 · globs, `new URL`, `@source` and template imports not fail-closed. 3 · positional anchors. 4 · `glass.css:68` exempted, not cured. 5 · the root row makes `charter-row-missing` unfailable. 6 · the consumer rule skips CSS, `foundation/` and `index.ts`. 7 · stratum acyclicity ignores CSS edges. 8 · PASS depends on the door ruling (`--strict` reads 11) |
| the edict | 9 · no mechanism for colocation below the unit. 10 · no size rule: 15 dirs and 58 files over the bound. 11 · promotion moves 11 files out of their components and names patterns after components |
| structure | 12 · the composition class is not gated. 13 · the test mirror is not gated and not a fixed point; 4 sheet tests land in dialog. 14 · `gate-register` red. 15 · the cascade arm fails on every intended CSS change, and its baseline is unspecified. 16 · the gate and the arm are wired to nothing. 17 · dual naming (`SRC_OF_DIST`, stale class rows). 18 · two graph builders. 19 · the backend is half-built. 20 · stale prose. 21 · the spec contradicts the built D on pager-dots. 22 · full D bans the edict's `composables/` name. 23 · a `.json` false positive. 24 · charter reasons are unchecked prose. 25 · owner rulings |

**Why it advances, and why as D′.**
- Gaps 1-7 are mechanical, and each has a stated cure.
- D′ keeps `src/composables/` (gap 22) and costs 19 moves instead of 550.
- Under D′, each of the 37 historical component ↔ composition flips costs one table row (D-crit §4).

Pass 2 must answer gap 9. If it cannot, D banks as the enforcement arm of a colocation-first route (D-crit §6).

### D1-E · Unit manifests: BANK, 35%

**Refutation of its placement law** (E-crit §3.1).
- Visibility goes 16 → 0 while 11 of 11 breach edges stay in place. Phase 4 lifts the private target to its unit root or widens its dir, so the fixed point is guaranteed by construction.
- Rule 6 passes 40 of the 85 files in the composables zone only on its "on an entry" clause.

**Proved by running** (E-proto, re-run by E-crit):

| result | measure |
|---|---|
| manifests | 75 literal-only manifests, parsed by AST; an expression or an unknown key throws. `subpath-policy.mjs` and `regen-exports.mjs` are deleted |
| surface | exports 68/68 and `typesVersions` 62/62 regenerate in content, with key order sorted |
| CSS | one region replaces 22 component `@import`s and 17 `<style src>` lines. 58 of 60 order-dependent pairs keep their order (2 weak pairs invert). The dev/dist divergence on the forced-colors `.field-control` restore is gone |
| graph | a TS lexer and resolver over five zones, with rule 0 in every zone. A derived one-door rule settles all 40 multi-door symbols |
| toolchain and gate | build, demo build, typecheck and pack green; gate GREEN; 22/22 plants |
| not proved | `./styles.css` silently loses 19,950 B. A new value cycle `chip ↔ composables/color`. 40 names are cut from 6 doors, leaving 7 declarations in 4 sibling repos to update. HEAD's build-time fail-closed check on an unclassified dir is lost |

**Strongest counterexample.** `_shared/overlay/participation.ts:14 → dock/dockContext.ts`. M02's cut edge survives the migration, relocated from `dock/composables/` to `dock/`, and the visibility rule reports 0 (E-crit §3.1).

**Open gaps** (E-crit §5, 19):
1. visibility is vacuous under relocation;
2. the escape hatch is unbounded;
3. the 40-of-85 exemption;
4. rule 6 has no converse;
5. no cycle rule and no upward-edge rule;
6. "one CSS channel" is false: 16 scoped blocks still ship through JS;
7. cascade order is path-derived and unchecked;
8. orphan CSS ships;
9. the fail-closed regression;
10. `./styles.css`;
11. `export * as` is untraced;
12. non-literal `import()`;
13. backend;
14. no size bound, and no encapsulation inside the composables zone;
15. no rule for sub-components or `_shared`;
16. the gestalt: units split across kind dirs and roots by a criterion no file states;
17. tests are not colocated;
18. owed rulings and re-seats;
19. the manifest reduces to floor row 6.

**Re-trigger** (E-crit §6). R-2 picks declared families as the counting unit, or a surviving route needs a per-unit declared fact beyond the entry name (a family tag, `leaf-of`, a story binding). A manifest is then the natural carrier for that fact.

**Merged** (§4). The entry table → F-3 (M-4). Visibility by position → D1-B's recursive seal (M-2). The global-zone rule → F-7 (M-1).

**Harvest:**
- the five-zone lexer that reports the specifier node's line → F-1;
- literal-only manifest parsing, if a declared fact survives;
- the single-slot cascade analysis, once π has run → F-4;
- the derived one-door rule, as the input to R-6.

### D1-F · Lifecycle capsules: BANK, 30%

**Refutation as a structure route** (F-crit §3.1, §3.5, §4).
- It moves 0 of 658 `src` source files. `comm` gives 658 → 681, and all 23 additions are minted barrels.
- Dirs with ≥ 10 direct files go 15 → 39, and dirs with ≥ 20 go 2 → 8. The dock root holds 51 files, 40 of them artifacts.
- C1 is computed by the same law that made the moves.
- C2 goes 485 → 43 by minting 23 unpublished barrels.

**Proved by running** (F-proto):

| result | measure |
|---|---|
| P state | 526 artifacts moved into capsules and suffixed. Build, demo build and `regen-exports` exact; vitest 0 failures; Playwright lists 1,995; the pack holds 0 lifecycle files |
| declarations | entry-rooted: `tsconfig.build.json` loses `include` and `exclude`, and 4 unreachable `.d.ts` leave the pack. HEAD's `src/**` config fails the build loudly on the migrated tree (M-F1) |
| routing | suffix routing ends the filename-listed WebKit project, which HEAD's rule lets fall from 13 to 10 instances silently |
| live | 11 visual tests run from a capsule and from `tests-visual/invariants/` |
| not proved | one strict typecheck program has 93 errors, so the tree fails CI `verify` and `prepublishOnly`. The F state changes 130 dist files. `boot-graph` goes red through a minted dual door. 1,984 of 1,995 visual tests never ran |

**Strongest counterexample.** `src/composables/search/` is read only by `dock/composables/useDockSearch.ts:58`. F grew it into a full capsule (door, 2 tests, a story, a visual spec), and the gate is GREEN in that scope (F-crit §4).

**Open gaps** (F-crit §5, 20):
1. no source colocation;
2. "`composables/` is global-only" is unenforced, and `_shared` is not split;
3. long dirs get worse;
4. C1 is vacuous: a planted misplacement is absorbed back to the base count (K1);
5. no clause for harness-primary artifacts;
6. the C2 floor launders reaches: symbols with 2+ doors go 379 → 429;
7. privacy does not recurse into nested capsules;
8. the suffix set is a blacklist written in 5 places;
9. runner routing is partial;
10. skipped clauses report 0;
11. C0 is blind to path literals and globs;
12. dual harness paths;
13. the tree is red (93 errors);
14. unbuilt steps: the StoryPage inversion, story metadata, the stagger port;
15. runtime unproven;
16. byte identity is false at F;
17. 44 residual reaches;
18. backend;
19. the common floor was not run;
20. the sha pin is re-certified by the migration tool.

**Re-trigger** (F-crit §6). F reopens as the lifecycle step of whichever route's source placement lands. It then needs:
- a whitelist suffix clause;
- a harness-primary clause;
- a C1 that does not read location;
- doors bound to the published surface or declared;
- the StoryPage inversion built;
- a strict typecheck program that is green.

**Harvest:**
- entry-rooted declarations → F-5;
- suffix routing, with C5 widened to `exclude` and dir patterns → F-6;
- one `isSource` predicate generated from one suffix declaration → F-6;
- the R2 entry-closure walk → F-1.

### D1-G · Eponymous closures: OPEN

Minted in §5.

---

## 3 · The shared floor

### 3.1 Facts pass 1 established

Every family inherits these. SPECS "Shared facts" stays the record for rows 1-19. The facts below add what the prototypes and critiques measured after SPECS was written.

**S-1 · Placement is decoupled from the JS public surface.** All six whole-tree prototypes reproduced the 68 export keys: five byte-identical, E in content with sorted keys. Wherever it was measured, the 1,279 declaration and 603 runtime names also matched. The precondition is an entry map keyed `name → path` (SF-6).

**S-2 · CSS cascade order is not yet decoupled from placement.** Five moves reordered the published cascade, and the unit suite caught none of them.

| move | effect |
|---|---|
| D research, first D′ carve (M-D2) | chip band strength 22% → 18% |
| C research, full carve | a11y rules move earlier |
| B research, overlay CSS door | 76 rules reorder |
| B-proto | the a11y block moves from rung 1919 to 1243, shipped |
| E | 2 weak pairs invert |

Two of them trace to one masked fallback at HEAD: `vite.style-fold.ts:89-92` falls back when its literal `./accessibility.css` anchor misses. C-proto's declared role removed it. The order-preserving runs (A-proto, C-proto, D-proto) held order only because each checked it with its own verifier.

**S-3 · Every gate must judge the resolved file.** Resolver privacy covers bare specifiers only (SF-1; X14).

**S-4 · The edge contract is the union of every edge kind some gate missed.** Every critique planted one its gate missed:

| edge kind | missed in |
|---|---|
| package self-name | D C01 |
| non-literal `import()` | A K-9, B C-8, C X5, D C17, E C-7, F K13 |
| `new URL(…, import.meta.url)` | C X6, D C04-C05 |
| `import.meta.glob` | D C02-C03, F K7 |
| path literals | A K-10, B C-9, F K6 |
| inline `<style>@import` | A K-11, E C-2 |
| Tailwind `@source` | D C06 |
| CSS `@reference` | C X7 |
| `.json`, `.cjs`, `.sh` files | A K-14-K-16, C X15 |
| `export * as` | E C-14 |
| a renamed alias | C X2 |

That union is F-1's edge contract.

**S-5 · Couplings the graph cannot see are the largest migration cost** (SF-7). Test breakage per prototype: A 116 plus 121 uncollected, B 109, C 29 files, D 10, E 7, F 26 files at the carve. The classes are literal paths, scanners, glob keys, `vi.mock` strings, `@source` scopes, scope ids, location-derived roots and filename-listed runner projects.

**S-6 · A closed-record roster binds all six prototypes.** `gate-register`'s sha-pinned roster lives in BK and BJ records. It went red in A (stage 5), B, C, D and E. F re-pinned it with a tool (F-crit gap 20). No migration may rewrite history, so this needs one ruling (R-1).

**S-7 · The graph does not name modules** (SF-11). Pass 1 confirmed this by running: every mechanical carve produced placeholder names or none (§0 finding 2).

**S-8 · M02 has one cure that keeps dock colocated.** Five routes cut the participation edge (SF-8):

| route | where `dockContext` went |
|---|---|
| A | the `src/composables` root |
| C | the overlay package |
| D | `patterns/overlay` |
| E | lifted to `dock/`, with the breach edge intact |
| B | stays in dock: overlay owns `OverlayHost` and dock provides it |

Only B inverted the edge, and B's inversion typechecks and leaves R4 at 0. It changes the behaviour of the public `DOCK_CONTEXT_KEY`, which no sibling provides directly.

**S-9 · One placement rule given units** (M-1). Across A, B, D, E and F, a file whose readers sit in one unit belongs to that unit, counted by symbol through barrels. The counts turn on two open rulings: the counting unit, and whether a public door counts as a reader. The published exemption measured as:
- D: 9 owner returns, or 20 if doors do not count;
- E: 40 of 85 files exempt;
- A: 24 files and 447 symbols;
- B: 44 name-slots.

**S-10 · Gates converge by construction unless an outside battery checks them** (§0 finding 3). Every critique found its gate wired to nothing: no `npm test` step and no CI job.

**S-11 · No prototype enforced a bound, and the bounds have no measured basis** (SF-16).

| family | where the bound stands |
|---|---|
| A | P2 10 dirs, P3 54 files |
| B | R6 7: SFCs, one 523-line closure, shader literals |
| D | 15 dirs and 58 files, unenforced |
| E | no rule |
| F | C4 off |

Mechanical SFC carves fail. `<style src>` breaks the style-fold closure, and `<template src>` switches off template type-checking (B-proto §8).

**S-12 · Routing through doors costs bytes where one unit consumes another.** B: `./dock` +641 B for a consumer, and the demo's eager graph +207,621 B. F: a minted dual door broke `boot-graph`. Some leaf imports exist on purpose to keep async chunks lean (`AppShell.vue → Aurora.vue`).

**S-13 · Dist purity by reachability works.** Entry-rooted declarations drop 4 unreachable `.d.ts` and need no exclusion list (F; SF-14).

**S-14 · Churn is measured** (SF-12). 9% of 200 commits change an LCA home, with oscillation. There were 37 component ↔ composition flips over 703 commits. A route whose directories encode a derived class pays one move per flip.

**S-15 · The backend treatments agree on the facts and built none of the dedupe.**
- `canon-doc.mjs` is dead (4 families).
- `paint-arm.mjs` belongs with `tests-visual` (5 of 6; B is the exception).
- Nobody deduplicated the three repeated helpers (6 walkers, 8 repo roots, 4 sha256).
- Composition roots defeat importer placement (A §13).
- A CLI pin by shebang or by text regex is syntax standing in for judgement (A K-5, A K-6, E C-8).

**S-16 · No reorder was paint-verified.** No critique had a browser seat, because the MCP servers failed to connect. Playwright executed 11 tests in all (F).

**S-17 · Baseline noise** (SF-19): the `boot-graph` trio fails in any worktree without `dist-demo`, and timeouts appear under shared load.

### 3.2 Floor work, built once before any pass-2 route prototype

Every pass-1 prototype rebuilt its own graph and move engine (M-5). Pass 2 builds one of each, first. The PORTFOLIO §2.2 rows 1-7 still run first of all.

| id | build | seeds |
|---|---|---|
| F-1 | **One graph.** The full TS AST: `preProcessFile` over-reports `declare module` and template strings (C-proto break 8). Every edge kind in S-4, fail-closed in every zone, verdicts on the resolved file, the specifier node's line. It replaces the six scratch builders and `import-dag.mjs`'s graph (A-crit §3.5; D gap 18) | E-proto `units.mjs` lexer, D-proto `cssurl`, C-proto C7 census, A-proto P0 |
| F-2 | **One move engine**, idempotent (D B13), with a residue census | A-proto AST rewriter; D-proto range edits (segment runs, re-sort, location roots); F-proto `__dirname` and `import.meta.url` re-roots; C `workspaceRoot()`; E form-keeping |
| F-3 | **One entry record**, `name → path` (floor row 6). It keeps HEAD's build-time fail-closed check on an undeclared dir (E-crit gap 9) | atlas `vite.lib.config.mts:32-51` (X §2.6) |
| F-4 | **The cascade contract.** A declared terminal role, and no path-regex anchors. One verifier (A's `cascade-seq` or D's `cascade-identity`, not both), restated as a move-only check with a named baseline (D gap 15). The `glass.css:68` accent-tone edge cured by layer or by a move, with π. E's single-slot analysis checked by π. W Q9's `layer()` question answered | C-proto `STYLE_ROLES.terminal`; A-proto `flatten-css` + `cascade-seq`; D-proto `cascade-identity`; E `cssorder.mjs` |
| F-5 | **Entry-rooted declarations** | F Q2 |
| F-6 | **Reads and scanners.** Tests read library files through the resolver, or through one predicate generated from one suffix declaration. A scanner whose scan set shrinks fails loud: C's `import-dag` stayed green while blind at 195 nodes, and F broke 15 scanners. Runner projects route by suffix, and C5 covers `exclude` and dir patterns | F `isSource`; C C7 |
| F-7 | **The placement rule given units** (M-1), as one gate clause parameterised by a route's unit set, counted by symbol through barrels | B-crit `edict-census2.mjs`; E tracer; D `origins.mjs`; A `home.mjs` converse |
| F-8 | **The M02 inversion** (S-8) and the roving move, as floor rows, so every route starts from the same cut | B-proto `patch-inversions.mjs` |
| F-9 | **Anti-vacuity.** A critic writes each route's plant battery, aimed at intent, before the route's gate exists. A clause whose zero comes from a migration that computes placement with the gate's own function stays unproven until that battery bites on it. A door/surface pin makes boundary growth a reviewed diff (B G8). Gates are wired into `npm test` or CI before GREEN counts | the six critiques' batteries |
| F-10 | **π and Playwright execution** per band, serialized on one browser seat (the browser-seat singleton) | — |

### 3.3 Owner rulings owed

These are choices, not mechanisms. Where a ruling arrives late, a route measures both arms instead of waiting.

| id | ruling | evidence |
|---|---|---|
| R-1 | `gate-register`'s closed-record roster: edit the records in the migration commit, retire the gate under E-8, or freeze the paths it names | S-6 |
| R-2 | the counting unit (unit or declared family), and whether a public door counts as a reader | S-9 |
| R-3 | tests: beside source, inside the unit, mirrored, or in their own dir | keyframes OD-U7 vs value.js Q17 (X C2). Pass 1 tried four placements, and each found its own failure: A's mirror (33 component tests in invariants), B beside source (self-scanning tests), C a `test/` dir per package (stale namespaces), D the strata mirror (not a fixed point), F the capsule (dock root 51) |
| R-4 | the `composables/` name, which the edict prescribes and full D, Steiger and keyframes R5 ban | X C1; D-crit C23 |
| R-5 | bounds: the numbers, the zones they cover, generated files, SFC carves | S-11; X C5 |
| R-6 | the 29 deliberate multi-door symbols, and the 40-name cut E's derived rule makes | E-proto R1: 7 declarations in 4 siblings |
| R-7 | what `./styles.css` carries after a CSS channel collapse | E §6 |
| R-8 | per-file dispositions: `springProjection.ts`, `safari-probe.mjs`, `pi-runner-manifest.mjs`, `Code.vue` | A §15, E-crit §4 |
| R-9 | skeletons | X C6 |
| R-10 | is the demo held to doors or visibility? 7 edges at HEAD, plus the deliberate async-boundary leaf imports | B Q5; E gap 4 |

---

## 4 · Merges: one mechanism, one family

**M-1 · Importer-derived placement over a unit set.** Five mechanisms reduce to this one:
- A's LCA under the door reading;
- B's G3 symbol ownership;
- D's owner return (`charter-owned(1 unit)`);
- E's global-zone rule;
- F's single-consumer composable rule (specified, never built).

All five take the same input, a file's readers counted by symbol through barrels, and reach the same verdict: one reader-unit means the file lives in that unit. The rule becomes floor item F-7. What distinguishes the families is the unit set it runs over. The part of D1-A that is its own, deriving the unit set from the graph, is what is blocked.

**M-2 · Privacy by position is the recursive door seal.** E's visibility rule (a nested dir is private to its unit root) is B's V2 seal with position standing in for the door file, as D1-E weakness 2 itself says. E's placement arm merges into D1-B.

**M-3 · C's residual gate is B's door rule at package grain, plus acyclic declared direction.** With resolver privacy refuted, C2 (no relative escape) and C3 (declared, and a door) are R1 applied to package roots. C merges into D1-B as a substrate variant, B-pkg, banked with C's re-triggers.

**M-4 · One entry table.** E's `entries` field (spread across 75 files), C's `entries.json`, D-proto's stratum home and floor row 6 all hold the same fact. Floor row 6 is the record (F-3). A per-unit manifest is a carrier option that returns only on E's trigger.

**M-5 · Six gate front-ends and five move engines become F-1 and F-2.** This is infrastructure, not a family. It is recorded here because each family counted it as its own.

**Kept apart on purpose:**
- **B and D.** B seals: it enforces privacy, and its only direction rule is S7. D ranks: it enforces direction, and has no privacy, so a composition may read any file of a component. Their unit sets conflict too: measured families against strata. §6.5 names the one sub-rule each may borrow.
- **A and G.** Both derive units from the graph, but from different centers. A takes the LCA of the importers' directories, which depends on where the readers sit today. G takes a file's immediate dominator from the entry set, which depends only on which named file every path passes through. §5 states how G could fail the way A did.
- **F and any source route.** F composes with whichever route lands (its re-trigger). It is not the same mechanism.

---

## 5 · New family: D1-G · Eponymous closures

**Where it comes from.**
- A Q5: the dominator carve found the sortable-list drag engine and the backdrop trio, both unnamed. The lexical carve recovered 5 of dock's 7 features "because people named the files".
- A §15 lists "a dir whose eponymous file is its root" as an unmeasured alternative to the depth rule.
- D-crit §3.4: dock's `DockCrossfade.vue`, `composables/dockCrossfadeContext.ts` and `styles/crossfade.css` share one stem, which "suggests a cheap first cut exists. D has not proposed it."
- X §2.2 calls value.js's recursive component dirs "the closest landed instance of the edict's 'recursively for nested components'". X §3.4: keyframes already gates an eponymy rule (R2), and it is case-sensitive.
- No pass-1 family made the component the unit. A placed files, B modules, C packages, D strata units, E manifest units and F lifecycle capsules.

**Charter.** The unit of colocation is a named root file together with everything only it reaches.

- **Roots.** Every SFC, every published entry file, and every other file that is the immediate dominator of two or more files.
- **Entry set.** The published doors, the route SFCs and the CLI pins (F-3). Wiring files (composition roots, A §13) are marked non-dominating.
- **Placement.** In the import graph (F-1), per zone, a file's owner is its immediate dominator from the entry set. The file lives in the dir named for that owner.
- **Naming law.** A dir holds an eponymous root, and a root with a private closure holds a dir. `DockCrossfade.vue` goes with `dock-crossfade/`. How `useDockMorph.ts` maps to `morph/` is a stated normalisation. This is keyframes' R2, made case-insensitive (kebab dir ↔ PascalCase SFC).
- **Recursion** is the dominator tree.
- **Shared code.** A file whose immediate dominator is an entry, meaning no named root dominates it, is shared. F-7 and R-2 decide whether it goes to `src/composables/` or `_shared/`.
- **Kind slots** inside a named dir are allowed or banned by R-4. G works under either answer.
- **Long dirs.** A dir over the bound splits along its dominator children, and each child is named by its root. A dir whose members are peers, with no dominator child, is where G declares its limit and hands the bound to R-5.
- **Enforcement.** One clause on F-1: every file sits in the dir of its immediate named dominator, and every dir that is not a kind slot holds an eponymous root. Plus F-7.

**Center:** identity from names people already wrote. **Optimizes:** the edict's recursion clause and SF-11, without authored carve names.

**Predicted shape** (a hypothesis to test, not a measurement):

```
src/components/dock/
  GlassDock.vue index.ts
  dock-crossfade/  DockCrossfade.vue dockCrossfadeContext.ts crossfade.css
  morph/           useDockMorph.ts dockMorphMeasure.ts morph.css
  search/          useDockSearch.ts  fuzzy/ useFuzzySearch.ts match.ts types.ts
```

**Pre-registered counterexamples.** Pass 2 measures each one. Any of 1-4 left unanswered blocks G before it is prototyped.

1. **Aurora's renderer backends.** A's dominator carve returned a 24-file runtime subtree that mixes both backends (A Q5). If the two backends share their dominator, G nests nothing there.
2. **Peer sets.** `src/styles/glass` (28 registers under one aggregator), `tests-visual` (167 specs that drive routes and have no import subject), and the `demo/stories/*` route dirs. G has nothing to say about a flat set of peers.
3. **Roots that do not carry the dir's name.** `sheet/detents/use.ts`, `fourier-field/renderer/`, `styles/tokens/`. G either renames the root or loses the authored dir name.
4. **Composition roots.** value.js `app.ts` and `inject-services.ts`, and speedtest `wire-services.ts`, dominate every file they wire (A §13). Without a structural wiring-file class, every route file sits at the app root.
5. **Churn.** A new importer can change an immediate dominator just as it can change an LCA. A measured 9% with oscillation; G has to measure its own rate.
6. **CSS.** Dominance over `@import` places a stylesheet under its aggregator, which at HEAD is `src/styles/index.css` for 20 component sheets. G is only as good as the F-4 cascade contract that lets those imports move.

**Relation to A's block.** G tests SF-11. It is not a reopening of A. The comparison baseline is A's lexical carve: 5 of dock's 7 features, 2 of menu's 3, 0 of aurora's 2 backends, and the sortable engine unnamed. If dominator subtrees at HEAD recover L12-06's features and HEAD's authored dirs no better than that, G is refuted on the same evidence that blocked A. The pass-2 answer to module identity is then declaration: B's door tree or D′'s charter.

---

## 6 · Pass-2 plan

### 6.1 Routes

| route | status | pass-2 work |
|---|---|---|
| D1-B sealed modules, with B-pkg from C as a banked substrate variant | ADVANCE | second pass |
| D1-D′ declared strata over today's dirs | ADVANCE | second pass |
| D1-G eponymous closures | OPEN | first full pass: research, prototype if §5 counterexamples 1-4 are answered, critique |
| D1-A | BLOCK | none. It returns only as F-7 if B or G lands a module tree |
| D1-C, D1-E, D1-F | BANK | none. Triggers watched (below) |

**The three live routes are mutually incompatible, and must stay so.**

| | B | D′ | G |
|---|---|---|---|
| unit set | dirs with a door; first level = measured families | six ranked strata over today's dirs, by table | named roots from the dominator tree |
| enforced between units | privacy (the door) | direction (rank) | ownership (dominance) |
| what the tree does | components move into families (about 300 files) | 19 moves, nothing renamed | sub-components nest inside their parents; first-level dirs stay |

**Triggers watched in pass 2.** The banked routes reopen only on these.
- **C:** the owner asks for C′; the install moves to an isolated linker; or B's gate cannot hold `procedural`/`tokens`.
- **E:** R-2 picks declared families, or a route needs a per-unit declared fact beyond the entry name. If B's G15 fix (one family table) or G's naming law turns out to need a per-dir fact, E's manifest is the candidate carrier and the trigger fires.
- **F:** a route's source placement lands. That is not expected before pass 3.

### 6.2 Order

1. **Floor.** F-1 to F-10 and the PORTFOLIO §2.2 rows, on one seat, before any route prototype.
2. **Rulings.** R-1 to R-10 go to the owner as one list. Where one is late, a route measures both arms.
3. **Routes.** Research for B, D′ and G in parallel, then the prototypes, all on F-1/F-2.
4. **Critique.** A critic writes each route's intent battery before reading that route's gate (F-9), then critiques.
5. **Pass-2 agglomeration.**

### 6.3 Research questions

**D1-B** (B-crit §7):
1. **Gate.** Add:
   - S2: a door re-exporting a non-descendant door fails;
   - S7 as a rank edge: any kernel → family edge fails, type-only included (§6.5);
   - every code dir under `src/components/*` and `src/composables/*` is a module or a kind slot (G4);
   - R6 over every zone, counting tests;
   - no comment opt-out;
   - R0 over non-literal `import()` and fs reads.
   
   Re-run B-crit's C-1 to C-16 and the prototype's 13 plants.
2. **Placement.** F-7 over B's module set, by symbol. Measure the 4 kernel single-owner files and the 3 aurora-only family-level files.
3. **Surface pin.** Snapshot every door's names. Of the 226 grown and 97 newly public names, how many survive review? Decide the 19 that were dropped.
4. **The family level.** Is it needed? 4 family doors are `export {};` with 0 importers (G17), and 7 of the 12 draft families score below 0.5. Measure B-flat (every component first-level, the kernel below) beside B-families. Then rule `forms` vs `fields` + `binary`, or drop families.
5. **Carve without shims.** Rewire importers onto the parts and keep no relays (G10). Authored names for the 21 dirs. For the 7 files over 500 lines (G14): an SFC route that masks nothing, or an R-5 ruling.
6. **Leaf doors** (G12). A construction that keeps `AppShell`'s async Aurora boundary, with the boot graph back under 503,808 B.
7. **Kernel taxonomy.** Flatten `<family>/composables/<kernel path>` (G16).

**D1-D′:**
1. Close D-crit gaps 1-7 on F-1. Re-plant C01-C19, with C13 and C25 as false-positive checks.
2. Build D′ with the repaired gate: a table over today's dirs, with `src/composables/` kept. The expected cost is about 19 moves; measure it.
3. Cut M02 with F-8's inversion instead of promotion. Count the files that leave their component (full D moved 11), and any pattern still named after a component.
4. Colocation below the unit: propose a clause, or record D′ as an enforcement arm (D-crit §6). G is the candidate rule for this, but D′ may not import it in pass 2 (§6.5).
5. Gate the composition class (C21). Rule compositions-of-compositions or ban them. Check charter reasons against something other than prose (C24).
6. The cascade arm under F-4: a move-only check with a named baseline.
7. Tests under D′: the mirror, or R-3's default, reaching a fixed point.

**D1-G** (first pass; every item measured at HEAD):
1. Dominator trees from the F-3 entry set, per zone. List every dir G would create, keep and dissolve. Score them against L12-06 (dock 7 features, menu 3), aurora's 2 backends, the sortable engine and HEAD's authored dirs (`sheet/detents`, `fourier-field/renderer`, `demo/shell`, `styles/tokens`). Compare with A's lexical carve on the same list.
2. An eponymy census: the dirs that already hold an eponymous root (case-insensitive, `use` prefix normalised), the roots that would need renaming, and the files that would need a dir.
3. A churn replay over the same 200 commits A used, counting flip-flops.
4. The peer sets still over the bound after nesting (counterexample 2).
5. The shared set G yields, and its overlap with L13's 32 OWNED under both arms of R-2.
6. A structural definition of wiring files, tested read-only on value.js `api/` and speedtest `server/` (counterexample 4).
7. Tests and stories under G: do they follow their subject root (F's subject law over G's units), or R-3's default?
8. Prior art for module boundaries derived from dominators or eponymy, beyond keyframes R2.

### 6.4 What pass-2 prototypes must prove

**Shared acceptance bar, every route:**
- **Migration.** By script from a fresh HEAD worktree, on F-2. A replay is byte-identical, and a rerun proposes 0 moves.
- **Toolchain.** Build, demo build, vue-tsc on every program the route defines, `regen-exports` (or F-3's successor), `npm pack` and `verify:package` all exit 0.
- **Surface.** 68 export keys and 62 `typesVersions` byte-identical; 1,279 declaration and 603 runtime names. `public-surface.spec.ts` is green, or each diff is a ruled change.
- **Cascade.** F-4's verifier reads the four CSS export entries as identical, or every diff is listed and π-checked.
- **Tests.** Every vitest failure falls in a named class that has a ruling (R-1 and the rest), 0 suites go uncollected, and `boot-graph` stays within its ceiling.
- **Gate.** RED at HEAD; GREEN on the migrated tree; wired into `npm test` or CI. The critic's intent battery is caught in full, and no clause's zero comes from the migration running the gate's own function (F-9).
- **Structure.** None of these: re-export relays, door-less code dirs in a sealed zone, placeholder or provenance names (`-N`, `part-1`, wave ids), a component file moved out of its component without a named reason. The bounds are enforced or ruled.
- **Gestalt.** A written walk of dock, aurora, sheet and deck, with file lists, as the critics did.
- **Runtime.** π on every band whose cascade changed. Playwright executed, at least on the specs whose routes moved.

**Per route:**
- **B:** C-6 fails the gate. The S7 plants C-1b, C-2 and C-14 fail. The boot graph is under its ceiling with the seal intact. The accessibility block is last in dist.
- **D′:** C01-C19 fail the gate. M02 is cut by the inversion with `dockContext` still in dock. `src/composables/` is kept. M-D2 is still caught.
- **G:** built only once §5 counterexamples 1-4 are answered. Then the dominator clause and the naming law run on the whole tree, and the six counterexamples are re-measured on the result.

### 6.5 Cross-pollination

**Earned now.** Both sides ran a whole-tree prototype, and a critique named the need.
- **B takes D's rank rule as S7.** B-crit G2 asks for exactly "any kernel → family edge fails, type-only included", which is D's `upward` rule over two ranks. B keeps its own unit set and doors.
- **D′ takes B's `OverlayHost` inversion as its M02 cure.** D's own gap 3 names this cure, and B built it (typecheck 0, R4 0). It reaches D′ through F-8, so both routes start from the same cut.

**Not earned.**
- **Anything with G.** G is undeveloped. The first candidate for pass 3 is D′ + G: G's eponymy as D′'s rule below the unit, which is the colocation-first route with D as its enforcement arm that D-crit §6 describes. That waits until G has a critique.
- **B and D as one route.** Their unit sets conflict (families against strata), and neither has closed its gate gaps.
- **Anything with A, C, E or F.** They are blocked or banked. Their harvested parts go into the floor, which every route uses equally.

No winner is declared in pass 1.

---
---

# D1 · pass 2 · REGISTRY: the routes after pass 2

| field | value |
|---|---|
| seat | D1 pass-2 agglomeration. Closes pass 2 with each route's status, the facts pass 2 established, the merge and cross-pollination tests, the rulings owed and the pass-3 plan. Picks no winner. Pass 1 above is kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9aebb552`. `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines, so every pass-2 seat measured the code pass 1 measured |
| inputs, read in full | `pass-2/`: `FLOOR-REPORT.md`, `SPECS-v2.md`, `SPECS-v2-synth-b.md`, `{B,Dp,G}-research.md`, `{B,Dp,G}-proto.md`, `{B,Dp,G}-critique.md`; `floor/FLOOR.md` and the floor tree; `RULINGS.md`; pass 1 of this file |
| instruments | none re-run. Two read-only checks: `ls` of the pass-2 scratch root (which artifacts survive) and `grep -c anchor floor/lib/placement.mjs` (0). Every other number cites the report that measured it (P-3) |
| fences | no source edit, no git write; this section is the only write |

Short citations: `B-proto §5.1` is `pass-2/B-proto.md` §5.1; likewise `B-crit`, `Dp-proto`, `Dp-crit`, `G-proto`, `G-crit`, `B-res`, `Dp-res`, `G-res`. `SV2` is `SPECS-v2.md`, `SVb` is `SPECS-v2-synth-b.md`, `FR` is `FLOOR-REPORT.md`.

---

## P2-0 · In brief

| id | route | status | conv. | critic's verdict | independent battery | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 30% | BLOCK, 30% | 30/34 in the intended clause (88%); legal probes 2/2 clean; 1 false positive (L3, an FD-7 dependency) | the strongest gate measured. The migrated tree grew coupling through kernel shims, and that defect comes from the shared placement stage, not from the seal |
| D1-D′ | rank table over today's dirs | **BANK** | 7% | BANK, 7% | 12/28 diagnosed correctly by the floor executables (43%); the D′ layer 0/28, because its gate is lost | no naming primitive, so the edict's core is out of reach, and the prototype's evidence cannot be re-derived |
| D1-G | eponymous closures under the declared layer | **ADVANCE** | 60% | BANK, 60% | 23/29 under the spec's clauses (79%); 26/29 with the prototype's added clauses | dominance finds modules nobody named and matches B's authored carve where both ran. Its derived names erase authored ones, and its gate is lost |

The three percentages are the critics' own and use three different formulas: B-crit averages three ratios, Dp-crit counts invariants met out of 28, and G-crit counts rows met out of 25. They are not comparable. Pass 3 uses one formula (§P2-6.5).

Five findings shape pass 3.

1. **The placement stage is one function in all three routes, and it produced the same defect in all three.** The 7 hooks that kernel entries publish (`useClipboard`, `useDragVelocity`, `useRAFLoop`, `useYieldToMain`, `useScrollChrome`, `useScrollProgress`, `useRoutePointer`) move into their first consumer. The kernel entry then re-exports a component interior, and coupling grows in every route (S-18). The cause is one line of ruling text, so one ruling cures all three (P3-R1).
2. **B and G drew the same file partitions independently wherever a single-owner root exists** (S-19). Dock search, dock legibility, aurora's WebGL (13 files) and WebGPU (7) backends, and the sortable drag engine match file for file. Only the names differ, plus one extra nesting level in G. Where no root exists (menu, the style kernel, dock layers and controls), only B's authored carve produced modules. The graph finds the boundary; a person has to name it.
3. **Two of the three prototypes cannot be replayed** (S-20). D′'s and G's gates, laws and frozen lists lived only in `/tmp`. B's survive in scratch, uncommitted. No prototype met SV2 §1.4's freeze rule.
4. **Every critique hit the same floor holes** (S-22): self-name imports from `src`, the first colocated test tripping F-1, the `glass.css` and `theme.css` refusals, non-re-runnable rows, and 0 π or Playwright executions.
5. **Why two statuses differ from the critics' verdicts.** This registry's definitions apply: BLOCK means a missing primitive, and BANK means a named re-trigger outside the plan.
   - B-crit's blocker is the §2.9(a) ruling. It is a ruling, not a primitive, and the same defect appears in G and D′.
   - G-crit's reasons for BANK are lost artifacts (a process failure), the shared placement defect, unrun steps and unwired clauses E4-E7. None of them refutes G's core, and none is a re-trigger outside pass 3's own work.
   
   The critics' measurements stand unchanged. Only the status mapping differs.

---

## P2-1 · Registry

| id | unit set declared by | enforced between units | within a unit | status | conv. | re-trigger / missing primitive / refutation | merged | pass-3 role |
|---|---|---|---|---|---:|---|---|---|
| D1-B | every code dir in `src` and `scripts` has a door (B7); no families | privacy: the recursive door (B1); kernel direction (B8, D's rank rule as S7) | a hand-authored carve; the module set pinned (B11) | ADVANCE | 30% | — | takes G's dominance as its carve proposer (§P2-4) | second full pass |
| D1-D′ | an 11-row `[prefix, stratum, grain]` table | direction: `upward`, per-stratum `cycle` | `below` into existing dirs only; mints no dir | BANK | 7% | re-trigger in §P2-2 | harvest: FD-5, B13/B14, the composition-class fact | none |
| D1-G | roots: SFCs, entries, declared doors, immediate dominators of 2 or more files | only F-7 (E1); no privacy or direction clause | dominator nesting (E2), eponymy (E3), root-derived names | ADVANCE | 60% | — | takes B's authored names and B1/B8/B12/B14 (§P2-4) | second full pass |
| D1-A | — | — | — | BLOCK (unchanged) | 35% | a declared module boundary | its law is F-7 | none |
| D1-C, D1-E, D1-F | — | — | — | BANK (unchanged) | 40/35/30% | triggers checked below | — | none |

**Banked triggers checked.**
- **C:** no trigger fired. The owner has not asked for C′, and the install is unchanged. B's gate held `styles/tokens` as 5 modules; `procedural` was not carved.
- **E:** its condition is met in form. G needs an authored name per dir wherever `rootName` erases an authored concept, and B pins its module set. That is a per-dir fact. The carrier already exists as one central record, B11's module-set pin (or SVb's manifest `names` block), so a per-unit manifest adds a second source of record and is not needed. E stays banked. It reopens only if pass 3 needs a per-unit fact the pin cannot hold.
- **F:** no route landed its source placement, so F is not triggered.

---

## P2-2 · Route entries

### D1-B · Sealed modules, flat: ADVANCE, 30%

**What ran.**

| item | result | source |
|---|---|---|
| migration | 157 engine moves in 13 frozen lists, plus 11 frozen rows (328 file edits); no hand moves | B-proto §2 |
| replay | R4 and R5 give the same code digest `7733d92a…c869` over 1,392 files. R6 applies every step twice with the same digests. The critic rebuilt the tree at `21b3824f` from the surviving frozen lists and got the same code digest | B-proto §0; B-crit §3 |
| toolchain | build, `vue-tsc` ×2, demo build, `npm pack`, `verify:package` and `entries.mjs check` all exit 0 | B-proto §0 |
| surface | 0 differences; `public-surface.spec.ts` 96/96 | B-proto §0 |
| cascade | identical under the FD-4 verifier. The floor verifier reads RED `content` on 18 rules, the scoped-keyframe suffix | B-proto §0 |
| gate | 1,902 → 1,497 lines. GREEN: B5, B11, B13, B15. RED: 12 of 16 clauses. The critic reads 1,888 at HEAD on identical code; not reconciled | B-proto §5.1; B-crit §3 |
| vitest | 26 failures: 12 are the gate's own clauses, 14 are FD-6-class layout pins | B-proto §5.3 |
| bounds | `src` dirs over 12: 9 → 0. Files over 500 lines: 57 → 57, since no split ran | B-proto §5.2 |
| not run | B-S7 to B-S16; π; Playwright | B-proto §6 |

**Independent battery** (B-crit §4). 30 of 34 were caught in the intended clause.
- Missed: I6 (a self-name import from `chip/`), I11 and I12 (no R-3 clause), I32 (a computed read that F-1 leaves out of the census).
- Probes missed: I32b and I32c. I15b `dock/utils/` and I15c `dock/v2/` pass B15.
- False positive: L3, a correct colocated test, because of FD-7.
- The legal probes L1 and L2 stay clean.
- I38 is not judged: B10 runs on `src` only, although SV2 §2.2 says `["src","scripts"]`.

**Strongest counterexample** (B-crit §2, §5). `src/composables/search/index.ts` owns no file. It re-exports `dock/search/{useFuzzySearch,match,types}` so that `./search` keeps its names.
- Four kernel doors re-publish 12 moved files in all (B8 12).
- The `@src` SCC grows from 7 to 14 top-level modules, and FD-2's module SCC from 12 to 40 members. The planner logged `grew: true` and did not stop.
- The prototype reported "no shims: met", because B12 exempts doors.

On coupling, the migrated tree is further from the edict than HEAD. The mechanism is S-18's, which G and D′ share. B's gate is the only one that reported it (B8, B9, B4).

**Why ADVANCE, not BLOCK.** No gap needs a primitive.
- Gaps 1, 2, 9, 10 and 11 of B-crit §6 wait on rulings (P3-R1, P3-R2, P3-R4, P3-R5, P3-R8) or on floor deltas.
- Gaps 3, 4, 5, 6, 7, 8 and 16 are additive gate clauses.
- Gaps 12, 13 and 14 are floor work.
- The route's artifacts survive, and the critic replayed them.

**Open gaps.** The source of record is B-crit §6 (16 items) plus B-proto §9. They are folded into §P2-7 as B-01 to B-13.

### D1-D′ · Rank table over today's dirs: BANK, 7%

**What ran.** The prototype reports two replays at `5b536c72` with the same digests, gate 331 → 133, a green toolchain, the surface held, the cascade identical, and 46 of 50 author plants caught (Dp-proto §0-§9). Every tool behind those numbers is gone: `dp-law.mjs`, `gate-dp.mjs`, the rank table, the lists and `migrate.sh` (Dp-crit §1). The research seat's tools under `Dp-research/` are gone too. The critic credits none of these claims (Dp-crit §4).

**Independent battery** (Dp-crit §0). The critic ran 28 plants on the floor-rows tree, judged by the executables that still exist:
- 12 caught with the right diagnosis;
- 4 caught with a wrong or harmful one: I05 steals card's sheet, and I09 and I29 move the subject to the test;
- 12 missed.

The D′ layer scores 0 of 28, since it does not exist. The legal probes gave 2 false positives.

**Strongest counterexample** (Dp-crit §0). The law moves 4 files that their own unit's root door publishes: `useClipboard` and `useDragVelocity` from `./dom`, and `useRAFLoop` and `useYieldToMain` from `./motion-core`. It then legalises the result by computing those doors as "aggregators", so `./motion-core` re-exports its RAF loop from inside dock. The cause is FD-1's global-zone exclusion (S-18).

**Why BANK.** Standalone, D′ meets the BLOCK test: it cannot mint a name, so R-5 is 75 → 75 and 7 sub-components in 6 units get no dir. Pass 1 recorded the other outcome in advance (D-crit §6): if D′ cannot answer colocation below the unit, it banks as an enforcement arm. It cannot, so it banks. Its direction rule already lives in B as B8.

**Re-trigger.** Either condition reopens D′:
- a fresh pass-3 battery finds a component-to-component or CSS rank inversion that B4 and B8 both miss;
- the owner asks for strata.

Reopening requires the law, gate, rank table and move lists to be rebuilt and committed first.

**Harvest.**
- The move-only diff classifier → FD-5 (already an SV2 floor delta).
- `door-impure-css` → B14.
- `bin` → B13.
- The composition-class fact: 0 door-level composition cycles across 703 commits (Dp-res §6), which is evidence that B4's sibling-cycle clause suffices.
- The `upward` rule covers every F-1 edge kind, CSS included. Pass 3 checks that B8 does the same.

### D1-G · Eponymous closures: ADVANCE, 60%

**What ran.**

| item | result | source |
|---|---|---|
| migration | 117 engine moves: stage 1 28, root normalisation 4, stage 2 82 + 3 global. Plus 4 relay-cure rows and 1 rebind row | G-proto §4 |
| replay | digest `1a4155a6…d1a9` in two fresh worktrees; every step applied twice is a no-op | G-proto §5 |
| toolchain, surface, cascade | all green; both verifiers GREEN on 4 of 4 entries | G-proto §6 |
| vitest | 5 failures, all FD-6 layout pins | G-proto §6 |
| gate | E0-E3 at HEAD read 0 / 23 / 74 / 8 and are GREEN on the final tree. E4-E7 read 71 / 40 / 90 / 95 on the final tree, RED and CLI-only | G-proto §7.1 |
| artifacts | `eponym.mjs`, `g-law.mjs`, `dominance.mjs`, `holds.json`, `SEQUENCE.json` with its 17 steps, and the relay rows are all lost | G-crit §3 |
| critic rebuild | Appendix A's lists replay exactly: 117 / 473 / 636, residue 0. The critic reconstructed the gate from the spec and disclosed that it tuned 3 readings toward the prototype | G-crit §3.1-3.2 |
| not run | G-S6 to G-S9; π; Playwright | G-proto §1 |

**Independent battery** (G-crit §4). 23 of 29 were caught under SV2 §4.5's clauses, and 26 of 29 with the prototype's relay and self-name extensions.
- Missed under every reading: P19 (`dock/utils/utils.ts`, an eponymous placeholder), P20 (an alias on the same door) and P28 (a `scripts/` helper).
- Against the earlier battery the prototype itself scored 28/36, or 24/36 without the clauses it added after reading that battery (G-proto §7.3).

**The counterexamples, re-measured on the result** (G-proto §9.7).
- CE1 answered: the backends separate, GL 13 files and WGPU 7.
- CE2 unanswered: 14 dirs are still over 12.
- CE3 unanswered for `detents` and `renderer`.
- CE4 answered by a probe (1 move, not 13); siblings not run.
- CE5: one edge can re-root 25 files.
- CE6 conceded.

**Strongest counterexample** (G-crit F-5). `sheet/detents/{use,projection}.ts` becomes `sheet/content/{use,projection}.ts`. The authored name `detents` is lost, and `use.ts` no longer says what it holds. `renderer` becomes `wgpu` the same way, and the aurora dir names `aurora-frag`, `mediums-glsl` and `aurora-wgsl` come from file names rather than concepts. The naming law erases authored concepts in at least 4 places.

The shared capture defect (S-18) also nests deepest in G: `./motion-core` publishes `useRAFLoop` from `components/dock/glass-dock/glass-backdrop-luminance/`, and the unit SCC grows from 7 to 30.

**Why ADVANCE, not BANK.** Nothing measured contradicts the core, as G-crit §2 states. The core is ownership by dominance below a declared layer, and it bit 16 of the critic's plants through E1 and 11 through E2.

Each of the critic's five reasons is either pass-3 work or shared:
- lost artifacts: S-20, bank first;
- 4 spec-only steps: pass-3 work;
- E4-E7 unwired: pass-3 work;
- the FD-2 breach: shared, S-18;
- kernel hooks inside components: shared, S-18.

A BANK needs a trigger outside the plan, and none of these is one.

**Open gaps.** The source of record is G-crit §8 (15 items) plus G-proto §10. They are folded into §P2-7 as G-01 to G-12.

---

## P2-3 · Facts pass 2 established

These continue pass 1's S-1 to S-17.

**S-18 · One placement stage, one defect, in every route.** F-7 with the FD-1 anchor, run to a fixpoint, is the same function in B, D′ and G, and it yields the same move list up to 3 differences:
- `useDockHold`, under the X-10 reading;
- `accent-tone.css`, where FD-3 applies (P3-R2);
- D′'s two direction moves.

| route | placement moves | published kernel hooks moved into a component | coupling growth measured |
|---|---:|---|---|
| B | 29 in 3 passes | the 7, plus the search trio behind a now-empty kernel door | `@src` SCC 7 → 14 top-level modules; FD-2 12 → 40 members; B8 12 |
| G | 28 in 3 passes | the same 7 (G-proto §9.5) | unit-grain SCC 7 → 30 |
| D′ | 30 in 3 passes | the same 7: 4 through their own root door, 3 through `./motion-core` | a new `motion ↔ morph ↔ reveal` dir cycle; `./dom` and `./motion-core` re-export component files |

FD-2's no-growth rule was breached in B and G. Both runs logged it and did not stop.

The cause is in the ruling text. R-2 as amended says "a kernel door anchors nothing", and FD-1 excludes every door under `GLOBAL_ZONES`. The edict says composables that are "truly module-level or global-level" live in `composables/`, and a hook a kernel entry publishes is global by publication. All three critics asked for the same ruling: B-crit gap 2, Dp-crit gaps 2-3 and G-crit gap 8.

**S-19 · Where an owner root exists, independent partitions agree.** B's authored carve (B-proto §8, B-res §7.1) and G's dominance nesting (G-proto §9) were built without reference to each other.

| module | B (authored) | G (dominance) | files |
|---|---|---|---|
| dock search | `dock/search/` | `dock/search/` | the same 5: `useDockSearch`, `useFuzzySearch`, `match`, `types`, `useScrollChrome` |
| dock legibility | `dock/legibility/` | `dock/glass-dock/glass-backdrop-luminance/` | the same 5: the backdrop trio, `useRAFLoop`, `useYieldToMain` |
| aurora WebGL | `webgl/` + `webgl/palette/` | `runtime/gl-setup/` + `aurora-frag/` + `mediums-glsl/` | the same 13 |
| aurora WebGPU | `webgpu/` | `runtime/wgpu-setup/` + `aurora-wgsl/` | the same 7 |
| sortable drag engine | `drag/` | `sortable/drag/` | the same 3 |

Where the two differ:
- **G found what B did not carve:** `toast/toaster/`, `tabs/segmented-tabs/` and the blob backends.
- **B partitioned where dominance finds no root:** `menu/{sub,items}`, `dock/{layers,controls}`, `styles/glass` into 7 modules, `styles/tokens` into 5 and `styles/{surface,motion,scroll}`.
- **G erased authored names that B kept:** `detents`, `renderer`.

Pass 1 (S-7) found that the graph places files and people name them. Pass 2 adds that the graph also finds the boundary wherever a single-owner root exists, and there it agrees with the boundary people drew.

**S-20 · An artifact that lives only in scratch is not evidence.**
- D′ lost its law (365 lines), gate, rank table and lists. G lost its gate, law, dominance module, holds, 17-step sequence and relay rows. Both went in the `/tmp` wipe (`f538a252`).
- B's 38 frozen lists and 25 tools survive in scratch at this seat's check, uncommitted.
- Every number resting on the lost files cannot be re-derived: D′'s 331/133 and 46/50, and G's E-clause readings and 28/36.
- SV2 §1.4 required computed lists to be "committed as literal JSON before the gate judges". No prototype met it.

**S-21 · The spec must hold the law, not the code.**
- G-crit read SV2 §4 literally and got E2 23 and E3 4 on the prototype's tree, against the prototype's 0. The 9 law choices in G-proto §8, including STAGES, slot tolerance and the eponymy pin, lived only in the lost code.
- In B, FD-3 against SV2 §1.4 was settled by default: the rule that moved the file won.
- D′ and SVb, following X-10, moved `useDockHold` against SV2's text.

**S-22 · The floor holes every critique hit.**

| hole | B | D′ | G |
|---|---|---|---|
| a self-name import from `src` resolves as an edge, not a violation | I6 missed | I04 missed | P16 caught only by a regex the prototype added |
| the first colocated test trips F-1 `ledger-stale` (`tsconfig.build.json`) | L3 false positive | L2 false positive | P14: E0 +2 |
| computed reads F-1 leaves out of the census: `join(cwd, "src/…" + n)`, template paths, `resolve(import.meta.dirname, …, n)` | I32, I32b, I32c | — | — |
| `glass.css → glass/index.css` refused (a base-relative single segment) | B-proto §4 | — | G hold 2 |
| `theme.css → theme/index.css` refused (the CSS dist name comes from the basename) | B-proto §4 | — | — |
| `isTeleportedTarget.ts` held at `demo.css:106 @source` (FD-8) | held | held, plus 7 test moves refused | held |
| FD-6 layout-pinning test failures | 14 | 9, plus 1 uncollected suite | 5 |
| floor rows throw on a second application; a whole-chain replay is not idempotent (per step only) | B-proto §7 | — | G-proto §5 |
| FD-4 exists only as a private `cascade-fd4.mjs` in each prototype | yes | yes | yes |
| π and Playwright executions | 0 | 0 | 0 |

In G, the floor rows alone raise the bundle by 111 B, so `verify:package` is RED at the base (G-proto §3).

**S-23 · The cost of a door in every dir is measured, and the alternative is not.**
- B's tree has 119 modules, 103 doors and 1,303 pinned names, and adds 7,419 B unpacked. Some doors are one line, such as `sheet/index.css`.
- G's E3 accepts "an eponymous root or an `index.*` door". No seat has measured the two readings on one tree.

---

## P2-4 · Merges and cross-pollination

**Merge tests.**

| pair | shared mechanism | verdict |
|---|---|---|
| B and G | placement between units (already one floor function, M-1). Measured S-19: the within-unit partition wherever an owner root exists | **no merge yet.** They still differ on three things: the unit declaration (a door in every dir, or an eponymous root or door), enforcement (privacy or ownership) and the naming source (authored or root-derived). Pass 3 runs a merge test (§P2-6.4) |
| B and D′ | D's rank rule already lives in B as B8 (pass-1 §6.5) | no merge. What remains of D′ is multi-rank direction, which is banked |
| D′ and G | the pass-1 candidate: G below D′ | not built. D′ is banked, so it is not pursued |
| all three | stage 1 | one mechanism already. S-18 is a ruling question, not a merge |

**Cross-pollination.**

Earned: both sides ran a whole-tree prototype and had an independent critique, and a critique names the need.
- **G → B: dominance proposes B's within-unit carve.** B-S3's carve list was written by hand. G's stage 2 reproduces it where an owner root exists (S-19) and finds modules B did not carve. The proposal is written as literal JSON, a person names each proposed dir, and B11 pins the module set. This removes B's hand-authored partitions without removing its authored names.
- **B → G: authored names, and B's privacy and direction clauses.**
  - A dir's name is its root's name or an authored override, pinned the way B11 pins B's module set. This cures G-crit F-5 and gap 9.
  - G takes B1 (the recursive door), B8 (the kernel reads no unit, type-only included), B12 (relays) and B14 (door purity). G has no privacy or direction clause: SV2 §4.5 says it "does not judge" an import past a door. G-crit P18 catches a deep reach only by re-placing the file, and P20 and P21 pass.

Not earned:
- anything with D′, whose evidence cannot be re-derived until it is rebuilt;
- anything with A, C, E or F.

**A new formulation, recorded as a hypothesis and not minted as a family.** Call it H: modules found by dominance, named by a person, sealed by a door.
- A module boundary is a dominator boundary under a single-owner root where one exists, and an authored boundary where none does (peer sets).
- Every dir name is the root's name or an authored name, and the module set is pinned.
- Between units, the door seal applies. Within a unit, ownership by dominance applies.

H is B plus G with the earned transfers. It becomes a route only if pass 3's merge test passes; the pass-3 agglomeration then merges B and G into it. It is new against pass 1: pass 1 held that the graph cannot find module boundaries (S-7, A's block), and pass 2 measured that it can wherever an owner root exists (S-19).

---

## P2-5 · Rulings owed before pass 3

These go to the owner as one list. Where a ruling arrives late, a route measures both arms instead of waiting (pass-1 §3.3).

| id | question | arms | evidence |
|---|---|---|---|
| P3-R1 | a file a kernel entry publishes | (a) **publication anchors**: an entry door anchors the files it publishes from inside its own dir, in the global zone too, so the 7 hooks stay in `composables/`; (b) the names change entry as MIGRATION rows (+36/−25, B-res §10.4) | S-18; B-crit gap 2; Dp-crit gaps 2-3; G-crit gap 8 |
| P3-R2 | CSS placement before the channel collapse | FD-3 places `chip/accent-tone.css` into `src/styles/` (B), or SV2 §1.4 defers every CSS move (G held it) | B-proto §3.2 item 3; B-crit gap 9; G-proto §8 |
| P3-R3 | R-5's slot arm | strict or exempt (X-1), still owed | SV2 §1.3 |
| P3-R4 | R-6's count | the ruling says 29; B9, E5 and `dual-door` all read 40. 20 blob/blob-config keys have no owner the law can derive | Dp-proto §6; G-proto §10 |
| P3-R5 | R-10 | the count (7 ruled, 90 measured) and `./aurora-config` (+1 export key) | SV2 §1.3; B-res §8 |
| P3-R6 | FD-8 | how an `@source` glob treats a unit's `__tests__/`, and `isTeleportedTarget.ts` | S-22 |
| P3-R7 | R-8 | `springProjection.ts`, `useScrollScene.ts` (cross-zone readers only) | Dp-proto §3 |
| P3-R8 | `@source` inside the `./styles` aggregate against CSS door purity | an allowed directive, or a named exemption | B-proto §5.1 (B14 1) |
| P3-R9 | `.bundle-ratchet` rebind wording | owner-worded, one per route | B-proto §2; Dp-proto §3; G-proto §6 |

---

## P2-6 · Pass-3 plan

### P2-6.1 Routes

| route | status | pass-3 work |
|---|---|---|
| D1-B, with G's dominance proposer | ADVANCE | second full pass |
| D1-G, with B's authored names and B1/B8/B12/B14 | ADVANCE | second full pass |
| D1-D′ | BANK | none; the trigger is watched |
| D1-A | BLOCK | none |
| D1-C, D1-E, D1-F | BANK | none; triggers watched |

### P2-6.2 Order

1. **Bank.** Commit B's surviving frozen lists and tools, and each pass-2 critic's battery and tools, under `docs/tranches/BL/design/structure/pass-2/artifacts/`. This is a driver's commit; this seat has no git write. From here on, every law, gate, move list and row is committed before a critic judges it. A number that rests on an uncommitted file does not count.
2. **Rulings.** P3-R1 to P3-R9 go to the owner as one list.
3. **Floor.** P3-F1 to P3-F9 are built once, on one seat, each with a plant.
4. **Routes.** The B and G prototypes run in parallel on the floor, each with its earned transfers.
5. **Cross-judging.** Each route's gate is run on the other route's migrated tree (§P2-6.4).
6. **Critique.** Fresh critics who authored nothing in pass 2 or pass 3 write their battery and hash it before reading the gate.
7. **Pass-3 agglomeration.**

### P2-6.3 Floor work

| id | build | why |
|---|---|---|
| P3-F1 | FD-1 as a parameter of `lib/placement.mjs`, with P3-R1's reading. Today `grep anchor` finds 0 lines, and the anchor lived only in route code that is now lost | S-20; Dp-crit §1 |
| P3-F2 | FD-2 as a stop: a pass that grows `moduleSccs` is refused, not logged | S-18 |
| P3-F3 | F-1: a self-name import from `src` is a violation | S-22 |
| P3-F4 | F-1 census: the three computed-read forms of B-crit I32 | S-22 |
| P3-F5 | F-2: rewrite a base-relative single segment and a cwd-anchored `join`; prune emptied parent dirs. F-3: a declared dist name per CSS entry | S-22; B-proto §4, §7; Dp-proto gap 9 |
| P3-F6 | `rows/apply.mjs` idempotent, so a whole-chain replay is a no-op | S-22 |
| P3-F7 | FD-3 (after P3-R2), FD-4 inside `cascade.mjs`, FD-5 | SV2 §1.2 |
| P3-F8 | FD-6 harness reader; FD-7 programs, so the first `__tests__/` file does not trip `ledger-stale`; FD-10 YAML tokens; FD-11 landing, so no gate imports the floor from `docs/` | S-22; G-proto gap 12 |
| P3-F9 | F-10: one browser seat, serialized, running π and Playwright on every band a route moves | S-16, S-22 |

### P2-6.4 What pass 3 must prove

**Shared bar.** Pass-1 §6.4 applies unchanged, plus:
- a seat that authored none of the artifacts replays the migration from committed artifacts only;
- FD-2 holds as a stop at every pass;
- under P3-R1(a), no kernel entry re-exports a file outside the global zone; under (b), every name that changes entry is a ruled MIGRATION row;
- every gate clause is wired into `npm test` and GREEN, with no CLI-only clause;
- π and Playwright are executed.

**B must close B-01 to B-13, and G must close G-01 to G-12** (§P2-7).

**The merge test (cross-judging).** Run B's seal on G's migrated tree, and G's E0-E3 with its authored overrides on B's. Every clause that fails on the other route's tree names a real mechanism difference.
- If both run GREEN, B and G merge into H at the pass-3 agglomeration.
- If not, the failing clauses say which of the two unit declarations to keep.

**The door-cost question** (S-23). On one tree, measure B7's door in every dir against G's "eponymous root or door": door count, bytes and battery catches.

### P2-6.5 Convergence criterion

- **One formula.** Items closed divided by items in the frozen checklist (§P2-7), the route's own items plus the shared ones, measured by the critic.
- **A route converges when all three hold:**
  1. zero items remain open, and each was closed by a committed, replayable measurement;
  2. a fresh adversarial audit re-opens none. Its seats authored none of the route's artifacts and hashed their battery before reading the gate;
  3. two consecutive passes come back clean: the pass-N critique and the pass-N+1 critique both re-open nothing.
- **The checklist is finite and frozen here.** A critic's finding outside it is logged for the next registry. It re-opens convergence only when it maps to a listed item or to an edict clause the list leaves out. In that case the registry adds the item and the two-clean-passes count restarts.
- **Seats.** Opus, with the model asserted in each seat's header.

---

## P2-7 · Open gaps, enumerated (the pass-3 checklist)

**Shared, every live route.**
- S-01 · Pass-2 artifacts banked; every pass-3 artifact committed before judgment (S-20).
- S-02 · P3-R1 ruled, or both arms measured (S-18).
- S-03 · P3-R2 to P3-R9 ruled, or both arms measured.
- S-04 · P3-F1: FD-1 on the floor.
- S-05 · P3-F2: FD-2 as a stop.
- S-06 · P3-F3: src self-name as an F-1 violation.
- S-07 · P3-F4: the census covers the computed-read forms.
- S-08 · P3-F5: the F-2 rewrites and pruning; F-3 CSS dist names; the `glass.css` and `theme.css` moves no longer refused.
- S-09 · P3-F6: rows and the whole-chain replay idempotent.
- S-10 · P3-F7: FD-3, FD-4 and FD-5 on the floor.
- S-11 · P3-F8: FD-6, FD-7, FD-10, FD-11; the FD-6-class failures at 0.
- S-12 · P3-F9: π and Playwright executed.
- S-13 · The merge test run and recorded.

**D1-B.**
- B-01 · All 16 seal clauses GREEN on the migrated tree, including B0 and B2 after FD-6, R-3 and R-10.
- B-02 · Kernel shims 0: B8 0, and every B9 line is a ruled R-6 row.
- B-03 · The self-name import (I6) caught.
- B-04 · An R-3 clause catches a test outside its subject (I11) and a test in the wrong unit (I12).
- B-05 · B10 judges `["src","scripts"]` (I38).
- B-06 · B13 reads the FD-10 YAML tokens.
- B-07 · Names: B15 fails `utils`, `v2` and `misc`, and file names are judged (`slider/useDockHold.ts`, `detents/use.ts`). Otherwise the spec states that names are reviewed through the pin and are not gated.
- B-08 · Styles colocated: `accent-tone.css` placed per P3-R2.
- B-09 · The style kernel fully carved, with `glass/` and `theme/` behind doors.
- B-10 · B-S7 to B-S16 run.
- B-11 · `npm test` refuses `--no-pin`.
- B-12 · The door cost measured against the alternative reading (S-23).
- B-13 · The HEAD count reconciled: 1,902 against 1,888.

**D1-G.**
- G-01 · Law, gate, lists and rows re-authored and committed. The spec text holds every G-proto §8 choice, so a literal reading of the spec gives the gate's verdict (S-21).
- G-02 · E4 to E7 wired into `npm test` and GREEN, or ruled.
- G-03 · Authored concepts kept: `detents`, `renderer` and `aurora/config` by rename or override rows, and the aurora shader dirs named by concept. The module set is pinned.
- G-04 · Privacy and direction: B1, B8, B12 and B14 taken over. P18 caught as a reach, and P20 and P21 caught.
- G-05 · A placeholder-name clause in the spec (P19).
- G-06 · The `scripts/` law of SV2 §4.8 run (P28, B-35, B-38).
- G-07 · CSS: the aggregator-held sheets placed after the channel collapse (B-10, B-28). A glob out of a door caught (B-14), the `<style src>` carve caught (B-22), and the symbol-grain question answered (B-30).
- G-08 · The registration-weak rule exercised by a plant (P07a). There are 0 wiring files at HEAD.
- G-09 · Churn replayed on F-1 with each commit's own entry map and hysteresis. Pass 2 measured 14.5% against A's 9%.
- G-10 · The peer sets over 12 split under authored names taken from B: `menu` 16, `styles/glass` 28, `styles/tokens` 21, `tests-visual` 177.
- G-11 · G-S6 to G-S9 run.
- G-12 · Depth 7 and the parent↔child nesting cycles: either FD-2 counts them, or a ruling says they are intra-unit.

**Held with the bank, not in the checklist.** D′'s gaps are Dp-crit §6 (10 items) and Dp-proto §11 (22). They return with D′'s re-trigger.

No winner is declared in pass 2.

---
---

# D1 · pass 3 · REGISTRY: the routes after pass 3

| field | value |
|---|---|
| seat | D1 pass-3 agglomeration. Closes pass 3 with each route's status and convergence, the merge test's outcome, the door-cost answer (S-23), the rulings still owed, the floor's open gaps and the pass-4 plan. Passes 1 and 2 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9a364e08`. The pass-3 route seats and both critics cut at 10.0.1 code (critics at `b602a59b`). Since then `9065d924` and `d8bda2a9` moved 12 code files (+261/−13, the 10.1.0 configurator work) and rebound `.bundle-ratchet` 2,916,129 → 2,919,057. `git diff b602a59b HEAD -- . ':!docs'` is those 12 files and nothing else |
| inputs, read in full | `pass-3/`: `FLOOR-P3.md`, `B-proto.md`, `G-proto.md`, `B-kit/LAW.md`, `G-kit/LAW.md`, `xj-BonG.md`, `xj-GonB.md`, `critique-B.md`, `critique-G.md`; this file §P2-5..§P2-7; `RULINGS.md`; `CHARTER.md` (the edict) |
| instruments | none re-run. Read-only checks: `git log`, `git diff --stat b602a59b HEAD` (the drift above), `critique-B/results/seat-2/RESULTS.md` §R9-R11, and `scripts/verify-export-types.mjs:942-958` (the ratchet's form). Every other number cites the report that measured it |
| fences | no source edit, no git write; this part is the only write |

Short citations: `B-proto §4` is `pass-3/B-proto.md` §4; likewise `G-proto`, `B-LAW`, `G-LAW`, `xjBG` (`xj-BonG.md`, B's seal on G's tree), `xjGB` (`xj-GonB.md`, G's gate on B's tree), `cB` (`critique-B.md`), `cB-R9` (its `results/seat-2/RESULTS.md` §R9), `cG` (`critique-G.md`), `FP3` (`FLOOR-P3.md`).

---

## P3-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE: the kept declaration** | 20/26 = 76.9% | ADVANCE | 2 (S-12, B-08), plus 1 outside finding on an edict clause (O-2) | exact replay by two non-authors; 14 of 17 clauses GREEN; coupling shrinks; its declaration is the one R-2/X-10 and the edict describe |
| D1-G | eponymous closures | **BANK** | 11/25 = 44% | ADVANCE | 0 | exact replay; but its FD-2 holds only under a unit function no ruling grants (14 → 91 members under R-2 units), its B8 runs an unstated test exemption, and the merge test refuses its declaration |

Both percentages use §P2-6.5's one formula: closed over the frozen checklist, measured by a fresh critic. They are comparable, unlike pass 2's.

**Not converged.** Neither route meets §P2-6.5 (1): B has 6 open items by its critic and 9 by this registry's reading (§P3-2.1). The two-clean-passes count is at 0 for B, because the pass-3 critique re-opened two items and found one edict clause the checklist leaves out. The earliest convergence is pass 5: a clean pass-4 critique followed by a clean pass-5 critique.

Five findings shape pass 4.

1. **The merge test failed in both directions, and the failing clauses point to one declaration.** G's gate on B's tree reads 54 lines, 35 of which are G's law unable to read a nested door as a module (xjGB §3.2). B's seal on G's tree reads 999 lines over 14 of 17 clauses, most of them G's nested and kernel dirs having no door and so no seal (xjBG §3). B's reading is the one R-2 as amended and X-10 describe: a sub-component's dir is a unit, and a parent reaches it through its root door. So B's declaration is kept and H is not minted (§P3-3).
2. **The doors cost bytes and buy clauses, not battery catches.** On B's tree, B7's door in every dir costs 77 doors and 46,165 B (33% of door bytes) beyond G's reading. On 89 pass-2 plants it buys one catch, and that catch comes from a different arm (xjGB §4). What the doors carry is the kernel seal, sibling acyclicity at module grain and a single declaration rule, none of which any pass-2 battery planted. Pass 4's battery plants them (§P3-4).
3. **A unit function is a ruling, not route code** (S-27). G's L0.3 made doors and tests nodes of their own. Under the floor's R-2 unit, which P3-F2 counts, G's tree grows its module SCC from 14 to 91 members (cG §S-05). B's tree shrinks from 23 to 4 under the same unit (cB §2, S-05).
4. **Rule-count identity is not paint identity** (S-28). B's listed `./styles` reorder kept 1,964 = 1,964 rules and passed the cascade verifier, yet it drops every Chip's `--accent-band-strength` from 22%/25% to 18% (cB-R9). The browser run missed it, because band selection is by file name and none of the five specs that read chip paint was selected.
5. **The chains no longer reach HEAD** (S-32). Both kits are anchored to 10.0.1 code digests. HEAD carries 10.1.0, so each replay refuses it. Pass 4 re-records on the moved base before anything is judged.

---

## P3-1 · Registry

| id | unit set declared by | enforced between units | within a unit | status | conv. | re-trigger / refutation | pass-4 role |
|---|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal on every module, kernel included (B1); direction (B8); sibling acyclicity, value and type (B4) | modules proposed by G's dominance, named in `authored/names.json`, pinned (B11); the base rule | ADVANCE | 76.9% | — | the one live route; third full pass with G's harvest |
| D1-G | first-level component units; nested modules by eponymous root, authored base or carve (E3) | B1 only into a component unit; no kernel seal; no sibling-cycle clause | dominance nesting, eponymy, authored overrides | **BANK** | 44% | re-trigger in §P3-2.2 | harvest only (§P3-2.2) |
| D1-D′ | — | — | — | BANK (unchanged) | 7% | re-trigger unchanged (§P2-2); not fired: no pass-3 battery found a rank inversion B4 and B8 both miss | none |
| D1-A | — | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | — | BANK (unchanged) | 40/35/30% | no trigger fired: no owner ask for C′, no per-unit fact the pin cannot hold (E), no route landed placement outside a chain (F) | none |

---

## P3-2 · Route entries

### P3-2.1 · D1-B · Sealed modules, flat: ADVANCE, 76.9%

**What ran** (B-proto §1-§6, confirmed by cB §1 and xjGB §0).

| item | result |
|---|---|
| chain | S1..S32: engine move lists and exact-text rows, no hand edit |
| replay | `62878b7f…51e1cc` over 1,434 files, `--twice` no-op; reproduced by two non-authors (cB §1 by three arms, xjGB §0) and recomputed by cB from the digest's definition without the kit |
| toolchain | build, both `vue-tsc`, demo build, entries, surface (0 differences), floor gates: all 0 |
| gate | 14 of 17 GREEN; RED B0 450, B2 71, B6 61; wired into `npm test` with no off switch |
| coupling | value SCCs 2/4 → 0/0, module SCC members 23 → 4 (cB §2, S-05) |
| browser | 65 specs, 324 tests: 134/190/8 on both arms, 0 new failures (B-proto §6) |
| package | `verify:package` RED, +13,056 B over the floor base (B-proto §8.5) |

**The critic's items** (cB §2): 20 CLOSED, 6 OPEN (S-03, S-10, S-12, B-01, B-08, B-10). Two re-opened against the route's claims (S-12, B-08).

**This registry's reading of the critic's outside findings** (§P2-6.5: a finding re-opens only when it maps to a listed item or to an edict clause the list leaves out):

| finding | maps to | effect |
|---|---|---|
| cB O-1: same-dir file cycles go to `meta.b4info`, which B-LAW §8 does not state | B-01 (already open) | none new; the law states the exemption or B4 counts them |
| cB O-2: `vite.utility-emit.ts:86` returns silently when `theme/index.css` is missing | the edict's "no masking fallbacks", which no item names | **new item S-14**; the two-clean count restarts |
| cB O-3: FD-5's classifier rejects F-2's own rewrite | S-10 (already open) | none new; a floor defect shared by every route |
| cB O-4: `seal.mjs --pin <file>` swaps the reviewed pin | B-11, under the edict's "no dual paths" | **B-11 re-opened**: the pin has one path |
| cB O-5: six timeouts at load 131-156 | no item | logged: a gate verdict is read on a quiet machine |
| cG outside: `tests/utils` is a placeholder dir outside E3P's scope; B15 judges only the sealed zones | B-07, under the edict's "ALL file directories" | **B-07 re-opened**: names are judged in all five zones |
| cG G-04: `import(…).catch(() => null)` on a live file passes | S-14 (new) | folded into S-14 |

**Registry's entry line for pass 4:** 27 items (26 + S-14), 18 closed, 9 open (S-03, S-10, S-12, S-14, B-01, B-07, B-08, B-10, B-11), 66.7%. The critic's 76.9% stands as pass 3's measurement; this line is what pass 4 starts from.

**Why ADVANCE.** No open item needs a primitive. B-01, B-10 and S-03 are listed route work; S-10 and part of S-12 are floor work (§P3-6); B-07, B-11 and S-14 are additive clauses; B-08 has one cure (§P3-5, P3-R2).

**The largest open body of work** is R-5 (S-30): 55 files over 500 lines (20 in `src`) and 6 dirs over 12, including `tests-visual` at 177. No route in any pass split a file.

### P3-2.2 · D1-G · Eponymous closures: BANK, 44%

**What ran** (G-proto §0-§5, confirmed by cG §1 and xjBG §1): 28 steps (304 engine moves, 19 rows), replay `b26243ef…eb7c6` over 1,360 files reproduced by two non-authors; toolchain GREEN; cascade identical on all 4 CSS entries; gate 15 of 18 GREEN (RED E1 1, E4 64, E6 18); `./aurora-config` landed (P3-R5); browser 74 specs, 0 new failures, π floor bites under the plant; `verify:package` +1,618 B over the floor base.

**The critic's items** (cG §4): 11 CLOSED, 14 OPEN (S-03, S-05, S-08, S-11, S-12, G-01, G-02, G-04, G-06, G-07, G-09, G-10, G-11, G-12). None re-opened.

**Why BANK, against the critic's ADVANCE.** Pass 2 advanced G on the ground that nothing measured refuted its core. Pass 3 measured three things that do:
1. **The merge test refuses its declaration** (§P3-3). G's law cannot read a nested door as a module (L2.5 sends every nested door to `U/index.ts`; xjGB §3.2(a), 22 lines), and its base rule cannot see through a door (L2.8; xjGB §3.2(b), 13 lines; cG outside finding 4). Its B1 seals only first-level component units, so 118 unit → kernel crossings past a kernel door are unjudged (xjBG B1). R-2 as amended and X-10 describe units that a parent reaches through a root door, at every depth, so the gap is in G's reading, not in B's tree.
2. **Its FD-2 stop rests on a unit function no ruling grants.** L0.3 makes doors and tests their own nodes. Under the floor's R-2 unit, the one P3-F2 counts, G's tree grows from 14 to 91 SCC members; with tests alone as nodes, 5 new pairs remain (`menu ↔ menu/items ↔ menu/sub`, `sheet ↔ sheet/detents`, `toast ↔ toast/toaster`), each closed by a root door re-exporting down and a child reading up (cG §S-05, G-12).
3. **Its code runs a rule its law does not state** (S-21): B8 skips every test file, and a literal reading of L4.2 gives 36 edges from 25 colocated tests into `demo`/`tests` (cG G-01).

Each could be cured inside G, but each cure moves G toward B's declaration (a door per nested unit, the floor's unit, B's stated test arm). That is the merge test's answer, so G banks and its working parts transfer.

**Re-trigger.** Either condition reopens G:
- the pass-4 critic's battery, which must plant kernel-interior reaches and nested-module reaches (§P3-7.4), shows that B's doors buy no catch that G's E3 and B1 would not also make, **and** the owner rules the door bytes too high in the ratchet row (P4-R3);
- the owner asks for eponymy as the declaration.

Reopening requires L0.3 replaced by the floor's unit and B8's test exemption either stated or removed, before any gate reading counts.

**Harvest into B** (each is earned: G ran it whole-tree and a critic judged it):
- L7.1, the dominance split, as B-S11's proposer for dirs over 12 inside a component unit (a person still names each dir).
- `./aurora-config` (G's `rows/16-aurora-config.json`, `rows/17-entries.json`, the boot-graph re-point): B's open P3-R5 item.
- The `accent-tone.css` placement G's tree carries (F-7/FD-3 → `src/styles/`, loaded at its HEAD rung, cascade identical): B-08's cure.
- G's name deltas, reviewed in B's `names.json` with reasons: `register` and `drop` against B's `constants` and `resolve` (G's objection: `constants/constants.ts` and `resolve/resolve.ts` stutter), `toaster`, and `SheetContent.vue` heading `detents`. The `aurora/config.ts` beside `aurora/config/` collision is decided in the same review (B-07).
- L4.5's owner ranking for rerouted consumer imports, and its dynamic-import construction for R-10's async boundary.
- `tools/browser-pair.mjs` (pairs a migrated run against several base arms).

**Held with the bank, not in the checklist:** G-01..G-12 as cG §4 left them. G-09 (churn under hysteresis) was never measured in any pass.

---

## P3-3 · The merge test (S-13)

**Run in both directions and recorded** (xjBG, xjGB). Neither tree passes the other's gate, so B and G do not merge into H.

| direction | reading | total | RED |
|---|---|---:|---|
| B's seal on G's tree | literal (G has no pin) | the gate throws: no pin, no off switch | — |
| | B's own pin | 1,646 | 14 of 17 |
| | the gate's reading of G's tree as the pin | 999 | 14 of 17 (B11 structural arm only) |
| G's merge set on B's tree | E0, E1, E1K, E2, E3, E3N, E3P + B1, B8, B12, B14 | 54 | E1 1, E2 42, E3N 10, B12 1 |

xjBG found one arithmetic slip in B-proto §4: B's table on G's tree omits B14 1 and sums to 999 where the gate gives 1,000. It changes no verdict.

**Which clauses name a real mechanism difference.**

| difference | clauses | lines | real? | ruling |
|---|---|---:|---|---|
| **the unit declaration**: a door in every module dir (B) against an eponymous root or authored module under a first-level unit (G) | B7, B1, B4, B11 on G; E2 (a)+(b) on B | 63 + 143 + 2 + 48; 35 | **yes** | **keep B's.** R-2 makes "a sub-component's dir … a unit inside its parent", and X-10 makes the anchoring door "the index at the unit root that an entry or a parent unit reaches", so a nested unit has a root door. The edict asks that modules be "encapsulated"; G's tree leaves 118 unit → kernel crossings past a kernel door unjudged (xjBG B1) and carries 2 sibling cycles B4 finds (xjBG B4). G's 35 E2 lines on B's tree are G's law unable to read that door, not a defect in B's tree |
| **the test home** (R-3): B drops the kernel from a unit test's subject and reads a directory read as a walk; G counts the kernel and sends such tests to the harness | B16 62, B8 12 on G; E7 44 on B | | **yes** | **keep B's** (B-LAW §9). It colocates 26 more tests (`tests/components/dialog/*` into `dialog/__tests__/`), which is the edict's direction, and its B8 test arm is stated, where G's is an unstated exemption (cG G-01) |
| **the scripts door's language** | B12 1 on B | 1 | yes, small | **keep B's**: a scripts module's door is `index.ts` when its code is TypeScript, the edict's "befitting their languages". G renamed the file to `.mts` instead |
| **scripts across zones** | S1 2, S2 1 on B | 3 | yes, small | S2 (`safari-probe.mjs` has no reader) is **settled by R-8's text**: "Tooling scripts (`safari-probe.mjs`, …) are placed inside the `scripts/` module they serve". G's L6.2 deletion reads against it. B places it in pass 4 (B-10, S15). S1 is B-S15 route work |
| the consumer scope of R-10: B judges every consumer zone, G the demo | B2 138 on G | | a scope question | owed ruling **P4-R1** |
| the CSS channel: B built doors and the post-collapse placement, G built neither | B3 17, B5 3, B14 1 on G | | **no**: G's unbuilt work (G-07), not a rule difference | — |
| the naming source: two authored name sets | E2 (c)+(d) 7, E3N 10 on B | 17 | **no**: a review diff | one reconciled `names.json` (the harvest above) |
| shared residue | B0, B6/E4, E1 (FD-8 hold on both trees), B2's demo lines vs E6 | | no | floor and route items |

**H is not earned.** Pass 2 defined H as "modules found by dominance, named by a person, sealed by a door", with ownership by dominance and no door inside a unit. B already carries the first two parts (dominance proposes, `names.json` names, B11 pins). The third part, no nested door, is what the merge test refused. H is not minted, and no merge is recorded.

**One measurement caveat.** xjGB's merge set read "E0-E3" as E0, E1, E1K, E2, E3, E3N, E3P plus G's adopted B-clauses. Excluding E3N would drop 10 lines and change no verdict (xjGB §5.2).

---

## P3-4 · The door cost (S-23): answered

Measured on one tree, B's migrated tree, by a seat that authored neither route (xjGB §4).

| reading | doors | bytes | statements | one-statement doors |
|---|---:|---:|---:|---:|
| B7: a door in every module dir | 158 | 141,307 | 698 | 43 |
| G: entries, unit roots, and nested dirs with neither an eponymous root nor an authored module | 81 | 95,142 | 417 | 19 |
| dropped under G | 77 | 46,165 | 281 | 24 |
| of which kernel doors | 47 | 35,906 | 200 | 10 |
| of which nested doors | 25 | 8,062 | 67 | 12 |
| of which scripts doors | 5 | 2,197 | 14 | 2 |

Battery, 89 plants from the three pass-2 batteries plus 5 legal probes:

| judge | caught | legal probes flagged |
|---|---:|---:|
| B's seal | 84 | 1 (Dp-crit L3) |
| B's seal under G's declaration | 83 | 0 |
| G's gate, full | 78 | 0 |

The one catch the doors appear to buy (B-crit I5, an own-door import) comes from B1's own-door arm on a unit-root door both readings keep. One other (I21) is incidental. The 25 nested doors buy nothing E3 or another clause does not also catch.

**Reconciliation with B-proto §5.** B-proto counted 157 door files, 99 internal, and "at most 38 (11,028 B)" droppable. xjGB counts 158 and 77. B-proto's upper bound covers nested doors under `rootName` only; xjGB also drops kernel and scripts doors, which G never requires. The two are different class sets, not a conflict. xjGB's is the one-tree measure §P2-6.4 asked for, and cB re-counted 158 files and 141,307 B on the replayed tree.

**The answer.** B7 costs 77 doors and 46,165 B of door source (33%) beyond G's reading, and on the pass-2 batteries it buys no catch through the door rule itself. It costs one flag on a probe the Dp critic wrote as legal. The package cost is not decomposed: B's migration adds 13,056 B to the package where G's adds 1,618 B (B-proto §8.5, G-proto §S-03), and how much of the 11,438 B difference the doors carry is unmeasured.

**The ruling.** The doors stay, under the declaration kept in §P3-3. The case for them is the clauses they make expressible, which no pass-2 battery planted: the kernel seal (118 crossings G's law cannot see), B4's module-grain acyclicity, and one declaration rule at every depth instead of two. Two consequences follow:
- **Dp-crit L3 is not a false positive under the kept law.** A global composable read deep past `composables/dom/index.ts` crosses a module's door, and B1 judges it.
- **The case must be measured, not asserted.** The pass-4 critic's battery plants kernel-interior reaches, nested-module reaches and a type-only sibling cycle (§P3-7.4). If they buy nothing, and the ratchet row (P4-R3) shows the doors' package bytes, G's re-trigger fires.

---

## P3-5 · Rulings: P3-R1..P3-R9 as applied, and what is still owed

| id | ruled | applied on B's tree | applied on G's tree | still owed |
|---|---|---|---|---|
| P3-R1 | (a) publication anchors | yes: 10 kernel entries, 285 names, 0 outside (cB S-02) | yes: E1K 0 | — closed |
| P3-R2 | CSS by the same law, after the R-7 collapse | the collapse is built; **the `accent-tone.css` rung changes Chip paint** (cB-R9) | the collapse is not built | the cure for B-08: place the sheet where F-7/FD-3 puts it on the post-collapse channel, `src/styles/`, loaded at its HEAD rung, as G's tree has it. B-LAW §6's authored rung is withdrawn. P3-R2's "both routes must agree" is moot with G banked; the law's answer is the one the placement computes |
| P3-R3 | slots strict | `dock/__tests__` 16 > 12 | `dock/__tests__` 17 > 12 | route work: home dock's tests in the slots of the dock modules they test. If more than 12 stay at dock's root, R-5 requires the route to report it as a counterexample before formation, and the driver rules |
| P3-R4 | the law governs; `./blob-config` owns config | yes: 40 MIGRATION rows, 0 multi-door symbols | yes: E5 0 | — closed |
| P3-R5 | 90 edges cured; `./aurora-config` accepted | **not landed**; 2 demo files held for the boot-graph pin | landed | route work: B takes G's rows (§P3-2.2) |
| P3-R6 | `@source` excludes `__tests__/`; `isTeleportedTarget.ts` by its readers | glob excluded; file held | glob excluded; file held (E1 1) | **floor**: the css-source glob-delta arm (P4-F2) |
| P3-R7 | cross-zone readers go global | yes (cB S-03) | yes | — closed |
| P3-R8 | `@source` in a door, own subtree only | B14 0 | B14 0 | — closed |
| P3-R9 | the rebind wording | no row | no row | **its premise does not match the instrument** (P4-R3) |

**The bundle-ratchet rows.** `scripts/verify-export-types.mjs:942-958` reads `.bundle-ratchet` as one total, the unpacked content byte count, and fails in both directions: over the datum is "increase forbidden", under it is "shrink — rebind down deliberately". There are no per-entry ceilings, so P3-R9's "leaves every entry's byte ceiling unchanged" describes nothing the instrument holds, and a path remap cannot move the number. What is owed is the datum rows themselves:

| row | delta | measured on | status |
|---|---:|---|---|
| floor: FD-7 stops emitting 4 unreachable `.d.ts` (−5,637 B), m02 and m03 add 126 B | −5,511 B | datum 2,916,129 (FP3 gap 1) | owed |
| route B's migration | +13,056 B over the floor base | the same (B-proto §8.5) | owed, with its bytes broken down by door class |
| route G's migration | +1,618 B | the same (G-proto §S-03) | banked with G |

The datum moved to 2,919,057 at `d8bda2a9` (10.1.0). Every row is re-measured on the pass-4 base.

**Owed before pass 4** (to the owner as one list; where a ruling arrives late, the route measures both arms):

| id | question | arms | evidence |
|---|---|---|---|
| P4-R1 | R-10's scope | (a) as written: the demo is held to doors, and tests are governed by R-3's test seam; (b) every consumer zone is held to entries (B2) | B2 on B's tree: demo 22, tests 32, tests-visual 16, scripts 1 (B-proto §5); on G's: demo 18 = G's E6 (xjBG B2) |
| P4-R2 | the names consumers read that no entry publishes | publish each on its owning entry (a surface growth with a MIGRATION "added" row and a pin row), or change the consumer | B: 44 lines (B-proto §8.3); G: E6 18 (G-proto §G-02). Carried from pass 2's X-5 |
| P4-R3 | the ratchet | re-word P3-R9 to the instrument (one total datum, two-sided), and rule each datum row above on the pass-4 base | §P3-5 table; `verify-export-types.mjs:942-958` |
| P4-R4 | a moved CSS entry's dist name (FP3 gap 9) | (a) the export key targets the real dist path; (b) the build writes a one-line `@import` at the old name (what the floor does now: `dist/styles/theme.css` is `@import "./theme/index.css";`) | arm (b) is a file whose only content forwards to another, which the edict's "no shims" reads against |

**Settled by text, not owed:** `safari-probe.mjs` is kept and placed (R-8's last sentence, §P3-3).

---

## P3-6 · The floor: open gaps

FLOOR-P3's ten gaps, and the floor gaps pass 3's seats found.

| id | gap | source | status | pass-4 disposition |
|---|---|---|---|---|
| FP3-1 | the ratchet ruling | FP3 | open | P4-R3 |
| FP3-2 | FD-2 refuses placement pass 1 (three hook moves, 149 of 169 pairs) | FP3 | **closed by the routes**: B binds 10 files (B10), G holds by L1.6; neither overrides FD-2 | — |
| FP3-3 | the masking fallback in `vite.utility-emit.ts:85-86` | FP3; cB O-2 | open; the file still returns silently after B's theme move | new item S-14, a route row that throws |
| FP3-4 | browser band selection by file name | FP3 | open, and it **cost a finding**: B's list missed the five specs that read chip paint (cB-R10) | P4-F4 |
| FP3-5 | Playwright `testDir` not modelled in F-1 | FP3 | open; it blocks the `tests-visual` carve (177 files) in both routes | P4-F5 |
| FP3-6 | other source walkers | FP3 | partly: B's S32 converted two more; B0 450 is walks and computed reads left by FD-6's unrun harness conversion | route work, B-S12 (B-01) |
| FP3-7 | colocated tests import vitest explicitly | FP3 | met on both trees: the test program type-checks 0 | — |
| FP3-8 | scan-delta declarations differ by arm | FP3 | baseline artefact only | — |
| FP3-9 | the CSS dist name | FP3 | open | P4-R4 |
| FP3-10 | the baseline vitest ran before the demo build | FP3 | ordering artefact | the pass-4 baseline builds the demo first |
| P3-G1 | FD-8: no arm to declare a css-source glob delta, so `isTeleportedTarget.ts` is held on both trees | B-proto §8.6, G-proto §6.1, xjGB §3.1 | open | P4-F2 |
| P3-G2 | F-2 rewrites the generated root literal `"tests-visual/.cache"` to `"null"` when `resolve.mjs` moves (`e.to` is null for a generated target) | B-proto §8.4 | open | P4-F3 |
| P3-G3 | FD-5's classifier reads the F-2 engine's own rewrite as `UNCLASSIFIED` (`join("src","styles","tokens.css")` → `join("src/styles/tokens/index.css")`), and no chain ran FD-5 per step | cB S-10, O-3 | open | P4-F6 |
| P3-G4 | FD-4's cascade verifier accepts a listed reorder by rule count and a selector-token heuristic; 92 swapped pairs share a declared property, and the one that changes paint (`.accent-tone` after `.glass-chip`) scored as no risk because the classes co-occur only through `chipVariants.ts` | cB-R9 | open | P4-F7 |
| P3-G5 | the browser suite is 58% red at base (B: 190 of 324; G: 213 of 393), so "0 new failures" carries no signal for a band with no base-green spec | B-proto §6, G-proto §5 | open | P4-F4 reports each band's base-green count |
| P3-G6 | R-1's register retire lives inside B's chain (S21) and outside G's, so G's tree fails 9 `gate-register` tests and B's does not | cG S-11, B-proto S21 | open | P4-F1: W-REGISTER-COLLAPSE's retire lands as a floor precondition, as R-1 orders ("lands BEFORE the structure migration"), and B's S21 leaves the chain |
| P3-G7 | undoing a row by reversing its hunks is ambiguous when a hunk's text recurs | B-proto §8.9 | info | the replay only applies forward; no tool owed |

---

## P3-7 · Facts pass 3 established

These continue S-1..S-23.

**S-24 · Both chains replay exactly from committed artifacts, by non-authors.** B's `62878b7f…` (1,434 files) was reproduced by cB and xjGB, and G's `b26243ef…` (1,360 files) by cG and xjBG. Each `--twice` is a no-op and each whole-chain rerun writes nothing. S-20's failure is cured.

**S-25 · P3-R1(a) cured S-18.** No kernel entry re-exports a file outside the global zone on either tree, and B's coupling shrinks under the floor's unit (value SCCs 2/4 → 0/0, module SCC members 23 → 4).

**S-26 · The merge test separates the declarations.** Both directions RED (§P3-3). The unit declaration accounts for 35 of G's 54 lines on B's tree and for B7, B1, B4 and B11 on G's.

**S-27 · The unit function belongs to the rulings.** G's route-authored L0.3 read FD-2 as +0 at every step while the floor's R-2 unit reads 14 → 91 members on the same tree. A route may not choose the unit its own stop is counted over.

**S-28 · Rule-count identity is not paint identity.** A listed reorder with 1,964 = 1,964 rules changed Chip's band strength from 22%/25% to 18%. Two rules in one layer at one specificity that declare the same property on co-occurring classes cannot swap without a value change.

**S-29 · The browser baseline is mostly red.** 58% of the selected tests fail at base in headless runs. A 0-new-failure delta is evidence only for bands with base-green specs.

**S-30 · R-5 is the largest unrun work.** After three passes, 55 (B) and 56 (G) files are over 500 lines, and `tests-visual` holds 177 direct files. No route has split a file or carved `tests-visual`.

**S-31 · The ratchet is one two-sided total.** `.bundle-ratchet` holds a single unpacked byte count that fails on growth and on shrink. P3-R9's per-entry wording does not describe it.

**S-32 · HEAD's code moved after the cuts.** 10.1.0 (`9065d924`, `d8bda2a9`) changed 12 code files, including the new `configurator` work, and the ratchet datum. Both chains are anchored to 10.0.1 digests and refuse HEAD.

---

## P3-8 · Pass-4 plan

### P3-8.1 Routes

| route | status | pass-4 work |
|---|---|---|
| D1-B, with G's harvest (§P3-2.2) | ADVANCE | third full pass: close the 9 open items (§P3-9) |
| D1-G | BANK | none; the re-trigger is watched through the pass-4 battery |
| D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

One live route is the merge test's result, not a portfolio choice. The charter asks for underexplored formulations when agents converge on one family. The one question still open between declarations, whether the doors earn their bytes, is put to the pass-4 battery (§P3-8.4) rather than to a second route.

### P3-8.2 Order

1. **Rebase.** Re-record B's chain on HEAD's code (10.1.0, datum 2,919,057). The new `configurator` files go through the same law as every other file. Commit the re-recorded kit before any seat judges it.
2. **Rulings.** P4-R1..P4-R4 to the owner as one list.
3. **Floor.** P4-F1..P4-F7, built once on one seat, each with a plant that is RED before and GREEN after.
4. **Route.** B's third pass, on the floor, with the harvest.
5. **Critique.** A fresh critic who authored nothing in passes 2-4 writes and hashes the battery before reading the kit. The battery carries the plants §P3-8.4 names.
6. **Pass-4 agglomeration.**

### P3-8.3 Floor work

| id | build | why |
|---|---|---|
| P4-F1 | R-1's register retire as a floor precondition row (W-REGISTER-COLLAPSE's first act); B's S21 leaves its chain | P3-G6 |
| P4-F2 | FD-8: F-2 declares a css-source glob delta, so a move that changes a glob's match set is carried, not held | P3-G1; P3-R6 |
| P4-F3 | F-2: a generated target (`e.to` null) is never rewritten | P3-G2 |
| P4-F4 | F-10 selects specs by the graph: every spec that reads a moved file, its classes or its paths; each band reports its base-green count, and a band with none says it has no browser signal | FP3-4, P3-G5, S-28, S-29 |
| P4-F5 | F-1 reads Playwright's `testDir` | FP3-5 |
| P4-F6 | FD-5 classifies the engine's own rewrites as re-points; the chain runs FD-5 per step | P3-G3 |
| P4-F7 | FD-4 refuses a listed reorder that swaps two rules declaring one property, in one layer and specificity, on classes that co-occur in any source class recipe, unless a band spec that reads the property runs | P3-G4, S-28 |

### P3-8.4 What pass 4 must prove

**Shared bar.** §P2-6.4's bar unchanged, plus:
- the chain replays from committed artifacts on HEAD's code (S-32);
- FD-2 is counted over the floor's R-2 unit, never a route's (S-27);
- the cascade is value-identical on every band a reorder touches, and a spec that reads the property ran (S-28);
- `verify:package` is GREEN against a ruled datum row (P4-R3).

**B closes the 9 open items** of §P3-9.

**The battery must plant** (so that the door ruling is measured, §P3-4):
- a unit file reaching a kernel module's interior past its door;
- a sibling module reaching a nested module's interior inside one unit;
- a type-only cycle between sibling modules;
- a same-directory file cycle (cB O-1);
- a silent return on a missing file, and `.catch(() => null)` on a live target (S-14);
- a placeholder dir outside `src` and `scripts` (B-07);
- a reorder of two property-sharing rules on co-occurring classes (B-08, P4-F7);
- a second pin path (B-11).

### P3-8.5 Convergence criterion

§P2-6.5 unchanged. The checklist is §P3-9, frozen here. The two-clean-passes count for B is at 0 and starts with the pass-4 critique. D1-B converges no earlier than the pass-5 agglomeration.

---

## P3-9 · Open gaps, enumerated (the pass-4 checklist)

The pass-3 checklist (§P2-7) carries forward with its text frozen. One item is added under §P2-6.5's rule. G's items are held with the bank.

**Added.**
- **S-14 · No masking fallback.** The gate catches a silent return on a missing file and a swallowed load of a live target, and `vite.utility-emit.ts:85-86` throws. (Admitted: cB O-2 maps to the edict's "no masking fallbacks", which no item named; cG's live-target plant maps here.)

**Status entering pass 4** (critic's verdict, then this registry's reading where it differs):

| item | pass-3 critic | entering pass 4 | what closes it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | re-met by the rebased kit's commit (step 1) |
| S-02 | CLOSED | CLOSED | — |
| S-03 | OPEN | OPEN | P3-R3 slot bound or a reported counterexample; P3-R5 landed; P3-R6 placed after P4-F2; P3-R9 via P4-R3 |
| S-04..S-09 | CLOSED | CLOSED | — |
| S-10 | OPEN | OPEN | P4-F6, P4-F7 |
| S-11 | CLOSED | CLOSED | — (P4-F1 moves the register retire out of the chain) |
| S-12 | OPEN | OPEN | P4-F4, with the chip-paint specs run |
| S-13 | CLOSED | CLOSED | — |
| S-14 | — | OPEN (new) | above |
| B-01 | OPEN | OPEN | B0 after B-S12; B2 after P4-R1 and P4-R2; B6 after B-S11; B-LAW §8 states or counts same-dir file cycles |
| B-02..B-06 | CLOSED | CLOSED | — |
| B-07 | CLOSED | **OPEN (re-opened)** | B15 judges all five zones (`tests/utils`); G's four name deltas and `aurora/config.ts` reviewed |
| B-08 | OPEN | OPEN | `accent-tone.css` placed per P3-R2 as §P3-5 reads it, cascade value-identical, a chip-paint spec run |
| B-09 | CLOSED | CLOSED | — |
| B-10 | OPEN | OPEN | B-S10 (`./aurora-config`), B-S11 (every file over 500 lines split into named modules, or a counterexample per file), B-S12, B-S14, B-S15 (`safari-probe.mjs` placed), B-S16 (after P4-F5) |
| B-11 | CLOSED | **OPEN (re-opened)** | the seal has one pin path: no `--pin` option |
| B-12 | CLOSED | CLOSED | answered (§P3-4) |
| B-13 | CLOSED | CLOSED | — |

**Count entering pass 4:** 27 items, 18 closed, 9 open (S-03, S-10, S-12, S-14, B-01, B-07, B-08, B-10, B-11).

**Held with the bank.** G-01..G-12 as cG §4 left them, and D′'s gaps as §P2-7 left them. They return with their route's re-trigger.

No route converged in pass 3. The kept declaration is B's.

---
---

# D1 · pass 4 · REGISTRY: the route after pass 4

| field | value |
|---|---|
| seat | D1 pass-4 agglomeration. Closes pass 4 with B's status and convergence, the two-clean-passes count, G's re-trigger, the rulings still owed, the floor's open gaps and the pass-5 plan. Passes 1-3 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `76f4209a`. `git diff 648e075d HEAD -- . ':!docs'` is empty: the critic judged the committed kit on the code the route ran (base code digest `35f7b831…`, 10.1.0) |
| inputs, read in full | `pass-4/`: `REBASE.md`, `FLOOR-P4.md`, `B-proto.md`, `critique-B.md`, `critique-B/results/RESULTS.md`; `B-kit/LAW.md` §10-§11; this file §P2-6.5, §P2-7, §P3-0..§P3-9; `RULINGS.md` |
| instruments | none re-run. Read-only checks: `git log`, the empty code diff above, `B-kit/results/pass4/b6-files.txt`, `B-kit/results/pass4/pack-diff.json` (`byClass`), `wc -l src/components/dock/GlassDock.vue` (545) |
| fences | no source edit, no git write; this part is the only write |

Short citations: `RB` is `pass-4/REBASE.md`, `FP4` is `pass-4/FLOOR-P4.md`, `Bp4` is `pass-4/B-proto.md`, `cB4` is `pass-4/critique-B.md`, `cB4-R` is `pass-4/critique-B/results/RESULTS.md`.

---

## P4-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 24/27 = 88.9% | ADVANCE | **0** | exact replay by a non-author from committed bytes; 15 of 18 clauses GREEN; the P4 floor closes S-10 and S-12; the door plants are caught only through doors |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | re-trigger not fired (§P4-3) |

**Not converged, and the count advanced.** B has 3 open items (S-14, B-01, B-10). The pass-4 critique re-opened nothing that entered pass 4 closed, and none of its five outside findings maps to a listed item beyond the already-open S-14 or to an edict clause the list leaves out (§P4-2). By §P2-6.5 (3) this is **the first clean pass: the two-clean-passes count for B is 1.** The earliest convergence is the pass-5 agglomeration: pass 5 closes the three open items and a fresh pass-5 critique re-opens nothing.

Five findings shape pass 5.

1. **A declared limit is not a closure.** B claimed S-14 CLOSED while its own LAW §10 declared the ternary and the loader-bound-to-a-name forms unseen. The critic planted both and found each live on the tree and at HEAD: `scripts/profile-bundle.mjs:292` and `demo/router.ts:117` (cB4 §4). The item reads "the gate catches", so it stays open.
2. **The doors buy catches G's law cannot make.** Kernel-interior reaches (typed and valued) and type-only sibling cycles at module grain are caught by B1 and B4 and by nothing in G's law, which has no kernel seal and no module-grain cycle clause (§P3-1). G's re-trigger does not fire (§P4-3).
3. **The doors' package cost is now decomposed and small.** Door declarations +2,175 B and CSS doors +397 B of the route's +17,264 B (Bp4 §2). The largest class is "other declarations" +12,819 B, which nothing yet explains (§P4-6, P4-G9).
4. **The remaining work is R-5 and the harness, not the law.** B-01 and B-10 are B0 444, B2 67 and B6 62: 56 files over 500 lines, none split; `tests-visual` at 177; the harness walks. No open item needs a primitive, a new clause or a floor build that does not already exist, except S-14's B17 widening.
5. **The P3-R3 counterexample is premature.** `dock/__tests__` holds 16 because 10 tests take `GlassDock.vue` as subject, and `GlassDock.vue` is itself 545 lines, on B6's list. B-S11 must split it, and its tests follow their subjects. The slot is re-measured after the split (P4-R5).

---

## P4-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-5 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel included (B1); direction (B8); sibling acyclicity, value and type, same-dir files included (B4); no masking fallback (B17) | ADVANCE | 88.9% | — | the one live route; fourth full pass |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P4-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired: no plant found a rank inversion B4 and B8 both miss | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P4-2 · D1-B · Sealed modules, flat: ADVANCE, 88.9%

**What ran** (Bp4 §1-§5, confirmed by cB4 §2 and cB4-R §1-§5).

| item | result |
|---|---|
| chain | 51 steps: HEAD, the floor rows (S1, `r1` first), 49 B steps. S1c and S21 left the chain for floor row `r1` and the floor's re-recorded surface pin (FP4 §5) |
| replay | final code digest `6618df1f…8685c` over 1,437 files, `--twice` MATCH, rerun a no-op; reproduced by the critic from committed bytes in a third pristine worktree (668.8 s). The floor-rows-only cut reads `a974a609…`, the chain's S1 digest |
| toolchain | build, demo build, both `vue-tsc`, entries, surface (69 keys, 0 differences), gates: all 0 |
| gate | 15 of 18 GREEN; RED B0 444, B2 67, B6 62; B17 new |
| FD-2 | 10 stop records, every one `addedPairs: 0`; SCCs 4 / 18 members before S2 → 2 / 4 after S36 |
| FD-5 | inside every engine step: 175 edges `move-only`, 0 failed |
| cascade | unlisted RED at `./styles` rule 610 (S4b, card/scroll); listed GREEN, 1,818 swapped pairs, 0 risks; the accent-tone divergence of pass 3 is gone. The critic's reorder plant reads RED under the route's own listing |
| browser | chip band + card band + π floor + the readback plant: base = migrated, 0 new failures; `zz-chip-band` passes on both |
| package | +17,264 B over the floor base (pass 3: +13,056). Arm (a) RED `2930810 > 2919057`; arm (b) CLEAN |
| vitest | only the three RED seal clauses fail on a quiet reading; the other reds are 5 s timeouts under load and the fixed-sleep `menu/contract.test.ts` |

**The critic's items** (cB4 §4): 24 CLOSED, 3 OPEN (S-14, B-01, B-10). Of the route's 7 claimed closures, 6 confirmed and S-14 refuted. None re-opened.

**This registry's reading.** It agrees with every verdict. Two need a sentence:

- **S-03 closes on measurement, not on rulings.** Its text is "P3-R2 to P3-R9 ruled, or both arms measured". P3-R9 via P4-R3 has both arms measured (Bp4 §2, cB4-R §3). P3-R3 has a reported counterexample, which R-5 asks for "before formation". The ruling it asks for is owed (P4-R5) and does not re-open the item.
- **S-14 stays OPEN, and it is not a re-opening.** It entered pass 4 open. The route's claim is not the critic's verdict.

**The critic's outside findings** (cB4 §5), read under §P2-6.5:

| finding | maps to | effect |
|---|---|---|
| 1 · B15 misses a dash-less digit suffix (`tests/helpers2`) | B-07, whose text names `utils`, `v2`, `misc`, all caught | none on the count; route polish P4-G10: B15 reads a placeholder stem with any digit suffix |
| 2 · `listed-reorders.json` lists by entry, not by pair or rung | S-10, closed on its text (FD-4 judges every swapped pair; a risky pair still reds, as the plant shows) | none on the count; floor tightening P5-F3: a listing names the rung it reviewed |
| 3 · P4-R4 unruled; `dist/styles/theme.css` is a 28 B `@import` | owed ruling P4-R4 | none new |
| 4 · the kit replays only inside a glass-ui tree (a `git archive` copy refuses) | S-09, met by the worktree recipe | none; the recipe is `pass-4/tools/fresh.sh` |
| 5 · vitest non-deterministic at load ~60 (5 s timeouts; `menu/contract.test.ts` sleeps 30 ms) | no item; the defect is at HEAD, not in the route | logged P4-G8. A gate verdict is read on a quiet machine, as pass 3's O-5 |

No finding maps to an edict clause the list leaves out: finding 2 over-lists but masks nothing, since FD-4 refuses every pair that can change a value. **No item is added; the checklist stays at 27.**

**Why ADVANCE.** All three open items are listed route work with a stated cure: S-14 is a widening of B17 plus two cures at cause; B-01 and B-10 are R-5 splits, the `tests-visual` carve, the B0 harness conversion and B2 after P4-R1/P4-R2.

---

## P4-3 · G's re-trigger: not fired

§P3-2.2's first condition is a conjunction: the battery shows B's doors buy no catch G's E3 and B1 would not also make, **and** the owner rules the door bytes too high (P4-R3).

**The first arm fails.** The critic's hashed battery (cB4 §3, cB4-R §6):

| plant | caught by | G's law |
|---|---|---|
| K-INT, K-INT-T: a unit file reads a kernel interior past its door (value, type) | B1 | no kernel seal (§P3-1), so not caught |
| T-CYC: type-only cycle chip ↔ badge through doors | B4 | no sibling-cycle clause, so not caught |
| T-CYC-N: type-only cycle between two nested dock modules | B4 | the same |
| N-INT: `dock/search` reads `dock/legibility`'s interior | B1 | **unmeasured**: G's E3 may catch it; G's gate was not run on this plant |
| K-DOOR-L: legal read through the kernel door | clean | — |

Four plants are catches the doors buy by construction of G's law. N-INT does not decide anything, because the conjunction already fails. The nested-door class (24 doors, 7,902 B) is the one class with no catch unique to it, which matches §P3-4. That is a cost note, not a trigger.

**The second arm has nothing to act on.** The doors' package bytes are +2,572 B of +17,264 B (Bp4 §2). No ruling on P4-R3 would single them out.

G stays banked. The second re-trigger (the owner asks for eponymy as the declaration) has not fired.

**Door counts are class-set dependent.** Bp4 §4 counts 156 doors / 70,387 B (entry sources and internal JS/CSS); cB4 §3 counts 157 / 138,667 B in the sealed zones including kernel and aggregators; §P3-4 counted 158 / 141,307 B on pass 3's tree. Only the last two share a class set, and they agree within one door.

---

## P4-4 · Rulings: P4-R1..P4-R5, owed

None of P4-R1..P4-R4 was ruled during pass 4. Both arms were measured where a measurement exists. The driver rules them into `RULINGS.md` before pass 5's route seat starts. Each row carries this registry's recommendation, which the driver may override.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| P4-R1 | R-10's scope | (a) the demo is held to doors, tests by R-3; (b) every consumer zone is held to entries | B2: arm (a) 18 (demo, 13 distinct private targets); arm (b) 67 (demo 18, tests 32, tests-visual 16, scripts 1) (Bp4 §3 B-01) | **(b).** One rule at every depth: a file outside a unit reaches it through its door. A test inside `<unit>/__tests__/` is inside its unit and is not a crossing, so R-3's colocation is the cure for most of the 48 test lines, not an exemption. The edict's "encapsulated" reads for (b) |
| P4-R2 | names consumers read that no entry publishes | publish on the owning entry (MIGRATION "added" + pin row), or re-point the consumer | B2 67 lines by the route; the demo's 13 private targets | **re-point by default; publish a name only when it belongs to a published component's contract**, one MIGRATION "added" row each. A demo reach to a private is a gap in the surface only when a consumer would need the same name |
| P4-R3 | the ratchet | re-word P3-R9 to the instrument; rule each datum row | floor row −5,511 B (2,913,546 against 2,919,057, FP4 §4); route row +17,264 B (arm (a) RED, arm (b) CLEAN, Bp4 §2) | **re-word P3-R9:** "The ratchet is one two-sided total. A structure step that moves it lands its own datum row, with its bytes broken down by class, and the datum is rebound once, at the migration's landing commit." Rule the floor row as measured. Hold the route row until "other declarations" +12,819 B is explained (P4-G9) |
| P4-R4 | a moved CSS entry's dist name | (a) the export key targets the real dist path; (b) the build writes a one-line `@import` at the old name (today) | `dist/styles/theme.css` = 28 B `@import "./theme/index.css";` (cB4-R §7) | **(a).** Arm (b) is a file whose only content forwards to another, which the edict's "no shims" reads against. The export key does not change, so a consumer importing by key sees no break; a consumer importing the dist path directly gets a MIGRATION row. The floor builds (a) once ruled (P5-F2) |
| **P4-R5** (new) | the P3-R3 counterexample: `dock/__tests__` 16 > 12 | (a) rule the counterexample (an exemption, a sub-slot, or merged test files); (b) defer: B-S11 splits `GlassDock.vue` (545 lines, on B6's list) and its tests follow their new subjects, then the slot is re-measured | 10 of the 16 are `GlassDock.*` tests; subject `GlassDock.vue` is over 500 lines (`b6-files.txt`) | **(b).** R-5 already requires the split. A ruling now would exempt a count that the required work changes. If the slot is still over 12 after B-S11, the route reports it again and the driver rules then |

**Settled by text, not owed:** the demo story dirs at 13 (`containers`, `foundations`) are R-5 dirs kept flat by the manifest's `./*/*.vue` glob (Bp4 δ6). That is route work under B-S14: the manifest reads the nested layout, and the dirs split.

---

## P4-5 · The floor: open gaps

FLOOR-P4's own battery went 0/11 → 11/11, and the pass-3 batteries held (59/59, 18/18, 12/12 with F9 re-issued). What remains:

| id | gap | source | pass-5 disposition |
|---|---|---|---|
| FP4-1 | the ratchet unruled; floor base −5,511 B | FP4 §6.1 | P4-R3 |
| FP4-2 | P4-R4 unbuilt; the floor still writes arm (b) | FP4 §6.2 | P5-F2, after P4-R4 |
| FP4-3 | FD-4's evidence is a property-reading spec; no committed spec reads `--accent-band-strength`, and `zz-chip-band.spec.ts` lives in `pass-4/plants/` | FP4 §6.3 | route: the readback spec lands in chip's unit as `chip/__tests__/*.visual.ts` (R-3), so FD-4 evidence is in the tree |
| FP4-4 | the co-occurrence index reads string literals only | FP4 §6.4 | declared limit; no build |
| FP4-5 | pass 3's F9 plant cannot drive the P4 seat from the docs home | FP4 §6.5 | the refusal is correct; no build |
| P4-G1 | the floor's own `lib/move.mjs` ↔ `lib/classify.mjs` cycle; S35 cures it only in the landed copy | Bp4 §6.3 | **P5-F1**: the floor takes S35's cure (`lib/plan.mjs`) in `floor/`, and S35's floor arm leaves the chain |
| P4-G2 | the edits engine writes files it does not syntax-check; S34's first derivation cut a function header in `profile-bundle.mjs`, caught only by vitest | Bp4 §6.3 | **P5-F4**: every engine write is parsed (`.mjs`/`.ts` by the TS parser, `.vue` by the SFC compiler) and a parse failure refuses the step |
| P4-G3 | S20 lands the kit's current `seal.test.ts`, so a later test edit re-derives S20 onward | Bp4 §6.3 | route: accepted cost of one gate text; noted |
| P4-G4 | listing by entry, not by rung | cB4 §5.2 | **P5-F3**: FD-4's listing names the moved rule set it reviewed; a reorder outside it is unlisted |
| P4-G5 | any digest of a cut moves with docs | FP4 §4 | the chain pins code digests only; no build |

---

## P4-6 · Open gaps outside the floor

| id | gap | source | pass-5 disposition |
|---|---|---|---|
| P4-G6 | 140 of 152 graph-selected specs did not run; 30 bands have no reading spec; 33 of 60 base tests fail | Bp4 §3 S-12, §6.4 | the pass-5 route runs the full graph selection once on the final tree and reports each band's base-green count; a band with none says so |
| P4-G7 | S-14's two live sites and the unseen forms | cB4 §4 | route work under S-14 (§P4-8.3) |
| P4-G8 | vitest non-deterministic at load (5 s timeouts; `menu/contract.test.ts` 30 ms sleep) | Bp4 §4, cB4 §5.5 | a HEAD defect outside D1; logged to the tranche cursor. D1 reads gate verdicts on a quiet machine |
| P4-G9 | "other declarations" +12,819 B (99 added, 93 removed, 54 changed) is unexplained; the route's package row grew +4,208 B since the rebase | `pack-diff.json` `byClass` | the route decomposes it by file before P4-R3's route row is ruled |
| P4-G10 | B15 misses `helpers2` | cB4 §5.1 | route polish: any digit suffix on a placeholder stem |

---

## P4-7 · Facts pass 4 established

These continue S-1..S-32.

**S-33 · The floor re-records on a moved base.** The surface pin re-recorded on 10.1.0 and the register retire as floor row `r1` took S1c and S21 out of the route's chain (FP4 §5). A floor change moves the chain's S1 digest, and the chain re-derives from it in one command (`derive/chain.sh`).

**S-34 · A spec that names a class is not evidence of a value.** All 18 base-green tests of the five chip-paint specs passed on a rung that changed Chip's band strength; only a computed-style readback of the property refuted it (FP4 §3). FD-4 now counts only a spec that names the property.

**S-35 · A declared limit is not a closure.** B's LAW §10 named two unseen shapes, and both were live on the tree (cB4 §4). An item that reads "the gate catches X" closes when the gate catches X in every shape the tree holds.

**S-36 · The doors' catches are by construction.** Kernel-interior reaches and module-grain type cycles are caught through doors and have no clause in G's law (§P4-3). Their package cost is +2,572 B.

**S-37 · The P3-R3 counterexample follows from an R-5 file.** The 16 tests stay at the dock root because their subject does, and the subject is over 500 lines. Slot bounds are measured after the file bounds they depend on (P4-R5).

---

## P4-8 · Pass-5 plan

### P4-8.1 Routes

| route | status | pass-5 work |
|---|---|---|
| D1-B | ADVANCE | fourth full pass: close S-14, B-01, B-10 |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P4-8.2 Order

1. **Rulings.** P4-R1..P4-R5 ruled into `RULINGS.md` as one list, before the floor and route seats. Where a ruling arrives late, the route measures both arms, as in pass 4.
2. **Floor.** P5-F1..P5-F4 built once on one seat, each with a plant RED before and GREEN after; FLOOR-P5.md; committed before the route re-derives.
3. **Route.** B re-derives from the P5 floor cut and runs its fourth pass. R-5's splits (56 files) are the bulk: the route may author split rows in parallel seats by zone (src 22, tests 15, demo 8, tests-visual 8, scripts 3), and one seat lands them into the chain. Each seat's model is declared.
4. **Critique.** A fresh critic who authored nothing in passes 2-5 writes and hashes the battery before reading the kit.
5. **Pass-5 agglomeration.**

### P4-8.3 Floor and route work

| id | build | closes |
|---|---|---|
| P5-F1 | the floor takes the `lib/plan.mjs` cure for its `move.mjs` ↔ `classify.mjs` cycle | P4-G1 |
| P5-F2 | a moved CSS entry's export key targets its real dist path; no forwarding file (after P4-R4) | FP4-2, FP3-9 |
| P5-F3 | FD-4's listing names the moved rule set it reviewed | P4-G4 |
| P5-F4 | every engine write is parsed; a parse failure refuses the step | P4-G2 |
| route · S-14 | B17 reads the ternary (`existsSync(p) ? read(p) : x`), the positive guard (`if (existsSync(p)) return read(p); return x`), `try { read } catch { return … }`, `.then(ok, h)`, and a loader bound to a name; the two live sites (`scripts/profile-bundle.mjs:292`, `demo/router.ts:117`) are cured at their cause | S-14 |
| route · B-S11 | every file over 500 lines split into named modules, or one written counterexample per file; `GlassDock.vue` first, then `dock/__tests__` re-measured (P4-R5) | B-10, B-01 (B6) |
| route · B-S12 | B0's 444 walks and computed reads onto F-1's file set | B-10, B-01 (B0) |
| route · B-S14 | B2 per P4-R1/P4-R2; the story manifest reads nested dirs and the two story dirs at 13 split | B-10, B-01 (B2, B6) |
| route · B-S16 | `tests-visual/` carved: the Playwright program edited first (P4-F5), each unit's visual spec into its unit's `__tests__/`, the rest into named modules; `tests/styles` 23 and `tests/demo` 17 split | B-10, B-01 (B6) |
| route | the chip readback spec lands in the chip unit; the full graph selection runs once on the final tree; "other declarations" decomposed; B15 digit suffix | FP4-3, P4-G6, P4-G9, P4-G10 |

### P4-8.4 What pass 5 must prove

§P3-8.4's bar unchanged, plus:
- all 18 clauses GREEN on the replayed tree, wired into `npm test` with no off switch;
- `verify:package` GREEN against a ruled datum row;
- the full graph-selected browser run on the final tree, with per-band base-green counts and 0 new failures.

**The battery must plant:** every S-14 shape named above, on a literal path and on a parameter path, in each zone; a split file's new module given a placeholder name; a carved visual spec that leaves the Playwright program; a directory over 12 after the splits; a B2 reach re-pointed to a private; a reorder outside the listed rung (P5-F3). It re-runs pass 4's door plants as regressions.

### P4-8.5 Convergence criterion

§P2-6.5 unchanged. The checklist is §P3-9's 27 items, frozen, with the status in §P4-9. **B's two-clean-passes count is 1.** D1-B converges at the pass-5 agglomeration if and only if all 27 items are closed by committed, replayable measurements and the pass-5 critique re-opens nothing. If the pass-5 critique re-opens an item or maps a finding to an edict clause the list leaves out, the count restarts at 0.

---

## P4-9 · Open gaps, enumerated (the pass-5 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 4.

| item | pass-4 critic | entering pass 5 | what closes it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | re-met by the pass-5 kit's commit before judgment |
| S-02 | CLOSED | CLOSED | — |
| S-03 | CLOSED | CLOSED | — (P4-R3 and P4-R5 owed as rulings, not as items) |
| S-04..S-09 | CLOSED | CLOSED | — |
| S-10 | CLOSED | CLOSED | — |
| S-11 | CLOSED | CLOSED | — |
| S-12 | CLOSED | CLOSED | — |
| S-13 | CLOSED | CLOSED | — |
| **S-14** | OPEN | **OPEN** | §P4-8.3 route · S-14; the critic's X-TERN-LIT and X-FNVAL-D read B17 |
| **B-01** | OPEN | **OPEN** | B0 0 after B-S12; B2 0 after P4-R1/P4-R2; B6 0 after B-S11, B-S14, B-S16 (or each remaining line a ruled counterexample) |
| B-02..B-09 | CLOSED | CLOSED | — |
| **B-10** | OPEN | **OPEN** | B-S11, B-S12, B-S14, B-S16 run (B-S10, B-S15 done) |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 5:** 27 items, 24 closed, 3 open (S-14, B-01, B-10). Two-clean-passes count: 1.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 4. The kept declaration is B's, and pass 4's critique is its first clean pass.

---
---

# D1 · pass 5 · REGISTRY: the route after pass 5

| field | value |
|---|---|
| seat | D1 pass-5 agglomeration. Closes pass 5 with B's status and convergence, the two-clean-passes count, G's re-trigger, the rulings still owed, the floor's open gaps and the pass-6 plan. Passes 1-4 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8d911018`. `git diff b100cc80 HEAD -- . ':!docs'` is empty and `git diff b100cc80 HEAD -- pass-5/B-kit` is empty: the critic judged the kit as committed at `b100cc80`, on 10.1.0's code (base code digest `35f7b831…`) |
| inputs, read in full | `pass-5/`: `FLOOR-P5.md`, `B-proto.md`, `critique-B.md`, `critique-B/results/RESULTS.md`; the five `splits/*.md` by their result and open-gap sections; this file §P2-6.5, §P2-7, §P3-8.4, §P3-9, §P4-0..§P4-9; `RULINGS.md` |
| instruments | none re-run. Read-only checks: `git log`, the two empty diffs above, `B-kit/results/p5/b2-open.txt`, `B-kit/authored/dock-tests-merge.json` (`why`), `grep unparsed B-kit/lib/row.mjs` (the kit's writer calls the floor's parse check) |
| fences | no source edit, no git write; this part is the only write. `critique-B.md` and `critique-B/` are untracked at this HEAD; the closures this part takes from them (S-11, S-12) are committed with this part |

Short citations: `FP5` is `pass-5/FLOOR-P5.md`, `Bp5` is `pass-5/B-proto.md`, `cB5` is `pass-5/critique-B.md`, `cB5-R` is `pass-5/critique-B/results/RESULTS.md`.

---

## P5-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 22/27 = 81.5% | ADVANCE | **2** (S-10, B-07) | exact replay from committed bytes (`4678be8f…`, 1,564 files); 17 of 18 clauses GREEN; 0 new browser failures over 68 bands; FD-4 cannot judge its own migration, and B15 passes placeholder split names |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | re-trigger not fired (§P5-3) |

**Not converged, and the count restarts.** B has 5 open items: S-14, B-01 and B-10 carried open, S-10 and B-07 re-opened. By §P2-6.5 (3) and §P4-8.5, a re-opening restarts the count: **the two-clean-passes count for B is 0.** The earliest convergence is the pass-7 agglomeration: pass 6 closes the five items and its critique re-opens nothing (count 1), and pass 7's critique re-opens nothing (count 2).

Five findings shape pass 6.

1. **The bulk of the R-5 work is done and replays.** 103 steps; B0 444 → 0, B6 62 → 0; every file over 500 lines split into a named module (`src/index.ts` by moving its prose, 585 → 494); `tests-visual` carved with all 169 Playwright files in the program; the full graph-selected browser run on the final tree reads 0 new failures (cB5 §3, cB5-R §8). What is left of B-01 is B2 alone, 61 lines, and every one of them waits on a ruling or on R-3 colocation (§P5-4).
2. **The floor's FD-4 is the blocker, not the route.** A value-identical migration reads RED because `verify` numbers SFC scope ids by first appearance, so the Timeline split cannot be listed. Its coverage arm reads a spec at `tests-visual/<basename>` and swallows the miss as `""`, so the readback spec placed in chip's unit to be its evidence (FP4-3's cure) can never count (cB5-R §7). Both are floor work (§P5-5).
3. **The masking-fallback class lives in the instruments.** Three of the four live S-14 sites the critic found are the floor's own readers (`cascade.mjs:219`, `lib/graph/graph.mjs:37`, `lib/recipes.mjs:58`), and the first of them is what hides the coverage fault. The gate that judges masking fallbacks must not run on tools that use them.
4. **Names are judged only where the gate looks.** B15's file pattern lacks its directory pattern's provenance forms (`-N`, `part-N`, wave ids), and B15 skips every test file. Two live instances came through the carve unrenamed (`suffuse2.spec.ts`, `motion2.spec.ts`).
5. **The law and the gate diverge.** LAW.md still says "pass 4"; §10 declares unseen shapes the gate now reads; §11 says B15 judges test stems, which it does not (cB5 §5.6). A literal reading of the law no longer gives the gate's verdict.

---

## P5-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-6 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel included (B1); direction (B8); sibling acyclicity, value and type, same-dir files included (B4); no masking fallback (B17); names (B15) | ADVANCE | 81.5% | — | the one live route; fifth full pass |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P5-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired: no plant found a rank inversion B4 and B8 both miss | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P5-2 · D1-B · Sealed modules, flat: ADVANCE, 81.5%

**What ran** (Bp5 §0-§4, confirmed by cB5 §2-§4 and cB5-R §1-§8).

| item | result |
|---|---|
| chain | 103 steps from the P5 floor cut (S1 `025409f8…`) to S59. The five zone split seats authored rows in parallel; one route seat landed them |
| replay | final code digest `4678be8f…801ac` over 1,564 files. The route's R1 ran `--twice` in full (20,547 s); the critic's ran `--twice` for S1..S2b and plain thereafter, every step's digest equal to the chain's, rerun a no-op (cB5-R §1). Disclosed by both: load 300-550 |
| toolchain | build, demo build, both `vue-tsc`: 0. 69 export keys, `./aurora-config` present; `./styles/theme` → `dist/styles/theme/index.css`, no file at the old name (P4-R4) |
| gate | 17 of 18 GREEN; RED B2 61. Census: 0 dirs over 12, 0 zone files over 500 lines |
| vitest | critic: 262 files, 2,331 of 2,333 passed, 1 failed (seal B2), 1 pending. The route's own run lost files to load timeouts and needed `dist-demo` (no `pretest`; a HEAD defect, §P5-6) |
| package | verify:package CLEAN at 2,959,588 against the datum S59 wrote (+46,042 B over the floor): declarations +40,140 (wiring +16,099, JSDoc prose +18,687, body +5,354), MIGRATION.md +7,545, CSS +643, JS −2,518. By step: the S5-1 doors +20,386; the S39-12 blob shader split +13,678, all prose |
| cascade | RED: content changed on `./styles` and `./styles.css` against a floor base byte-equal to the committed snapshot. With scope ids erased the rule multisets are equal and no pair is risky (argued from text by both seats, not a verifier verdict). P5-F3 holds on the route's tree: an unlisted reorder reads RED with 4 UNLISTED rules; the listed risky accent-tone pair reads RED |
| browser | committed 154-spec selection, 68 bands: floor 864 tests (428 / 392 / 44), migrated 866 (429 / 393 / 44), **0 new failures**; 44 bands with a base-green count, 24 named with none. The chip readback spec passes on the migrated tree |

**The critic's items** (cB5 §3): 22 CLOSED, 5 OPEN. Of the route's claimed closures, S-14 is refuted a third time with new live counterexamples; B-S11 and B-S12 confirmed; P4-G10 confirmed for non-test files only. S-11 and S-12 close on the critic's own runs, which the route had left OPEN (Bp5 §2.4).

**This registry's reading.** It agrees with every verdict. Four need a sentence.

- **S-10 re-opens on its text.** S-10 reads "FD-3, FD-4 and FD-5 on the floor". FD-4 on the floor cannot give a verdict on the one migration it exists to judge: a move reads as a content change, and its coverage arm cannot see a carved spec. Both faults show only on a migrated tree, which pass 4's tree (no SFC split, no carve) did not exercise. This is a listed item failing on new evidence, so it re-opens.
- **B-07 re-opens on its text.** B-07 reads "file names are judged", and §P4-8.4 named the plant ("a split file's new module given a placeholder name"). `dock/part-1.ts` passes. The tree holds two instances in test stems, which B15 skips although LAW §11 says it judges them.
- **S-12 closes on the critic's run.** §P4-8.4 asked for the full graph-selected run with per-band base-green counts and 0 new failures. The critic ran it from committed selection bytes; the run is replayable by `browser.mjs` on the same selection. The selection did not re-derive from the committed `changed` list alone (it needs the move lists, also committed); that is noted, not a defect (§P5-5, P5-G6).
- **B-08 holds.** `accent-tone.css` sits at its HEAD rung, the readback passes, and the chip band reads 22 base-green, 0 new. FD-4's fault blocks a verifier verdict on Timeline, not on chip.

**The critic's outside findings** (cB5 §5), read under §P2-6.5:

| finding | maps to | effect |
|---|---|---|
| 1 · FD-4's coverage arm unreachable after the carve | S-10 | re-opened (above) |
| 2 · masking fallbacks outside S-14's two forms: `armAsync().catch(() => undefined)` in the aurora, blob and fourier-field renderers; ~90 Playwright page-operation `.catch(() => {})` | S-14, already open | no new item. S-14's frozen text names a swallowed read of a missing file and a swallowed load of a live target. The renderer arms and page waits are runtime behaviour under the edict's "no masking fallbacks", which the tranche owes outside D1's structure checklist; logged P5-G3 to the tranche cursor. S-14's closure requires B17's law to state its scope (reads and loads) so a literal reading gives the gate's verdict |
| 3 · B16 cannot place a page-driving visual spec; skips the tests-visual zone | B-10 (B-S16) | open already; route law (§P5-8.3) |
| 4 · `dock/__tests__` reached 12 by merging 8 files into 3 | P4-R5, arm (a) in form | ruling owed, P5-R1 |
| 5 · the datum row self-rebound | P4-R3 | ruling owed, P5-R2 |
| 6 · LAW.md stale | B-07, S-14 | closes with them; the law re-stated to the gate |
| 7 · `vite.style-fold.ts` 588 lines, a root config outside R-5's zones | R-5's zone list | ruling owed, P5-R4. Not an item: R-5 rules the zones, and the edict's long-running clause is in the list through B-01/B-10 |
| 8 · 38 one-line `@import` CSS doors in dist | B-12 (doors decided, §P3-4) | none; they are LAW §5 doors, not forwarders at a moved name, so P4-R4 holds |
| 9 · battery defects (pw-program path, 6 control FALSE+ via B0, strict mark match, selection inputs) | — | disclosed; no verdict rests on them |

No finding maps to an edict clause the list leaves out. **No item is added; the checklist stays at 27.**

**Why ADVANCE, not BLOCK.** Every open item has a stated cure at cause and none needs a new primitive. Two are floor work on an instrument that already exists (FD-4), two are gate widenings (B17, B15) with plants already written, and B2's 61 lines wait on one list of rulings and on R-3 colocation.

---

## P5-3 · G's re-trigger: not fired

§P3-2.2's first condition is a conjunction: B's doors buy no catch G's E3 and B1 would not also make, **and** the owner rules the door bytes too high.

- **The first arm fails again.** The critic re-ran pass 4's door plants as regressions on the migrated tree: K-INT, K-INT-T, N-INT caught by B1; T-CYC, T-CYC-N, V-CYC, F-CYC, F-CYC-T by B4; K-DOOR-L, T-OWN-L, LOCAL-L clean (cB5-R §4.2). G's law has no kernel seal and no module-grain cycle clause (§P4-3).
- **The second arm has no ruling to act on**, but it now has a number. The S5-1 doors step adds +20,386 B of declarations, +13,874 B of it wiring (Bp5 §2.2); pass 4 measured +2,572 B over a different class set. The door wiring is the largest single class in the route's datum row, so P5-R2 is where the owner would rule the door bytes, if at all.

G stays banked. The second re-trigger (the owner asks for eponymy as the declaration) has not fired.

---

## P5-4 · Rulings: P5-R1..P5-R5, owed

P4-R1..P4-R5 were ruled before pass 5 (`RULINGS.md`) and held: no seat found one unbuildable. Five are owed now. Each carries this registry's recommendation, which the driver may override.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| **P5-R1** | `dock/__tests__` after the GlassDock split (P4-R5's deferral) | (a) accept S56: eight single-concern files merged into three by what they test, 17 → 12; (b) a sub-slot or an exemption | the slot takes no sub-directory (B5); the `dock/shell` carve is refused at FD-2 (`splits/src.md` §5); 140 tests before and after; no merged file carries a module mock or a browser, and the two that do stay alone (`dock-tests-merge.json`) | **(a).** The merged files are named by concept (`GlassDock.press`, `GlassDock.motion`, …), every assertion is kept, and no test's environment changes. P3-R3 stays strict |
| **P5-R2** | the route's datum row, 2,959,588 B (+46,042 over the floor), self-rebound at S59 | (a) rule it as measured; (b) hold the prose share until cured | P4-G9 explained (`decl-diff.mjs --doors --chain`): JSDoc prose +18,687 B, of which the S39-12 blob shader split alone +13,678 B; wiring +16,099 B; MIGRATION.md +7,545 B; JS −2,518 B | **(b), then (a).** A split that ships 13,678 B of new declaration prose has copied doc text into the new modules' public declarations; the cure is one source of record (the prose stays where the symbol is published, or leaves the declarations). Rule the remainder as measured once that cure lands. S59 as the one rebind at the migration's landing step satisfies P4-R3's "rebound once" |
| **P5-R3** | B2's 61 lines (Bp5 §4, `b2-open.txt`) | per name: re-point, publish on the owning entry (P4-R2), or colocate the reader | demo 21, tests 31, tests-visual 8, scripts 1; `consumer-entries.mjs` finds nothing to re-point, because every target is private | **One list, ruled together.** Tests and the aurora visual specs: colocate into the subject unit's `__tests__/` (inside the unit is not a crossing, P4-R1); a test whose subjects are several units splits. Publish only a published component's contract: `useDockState` and the dock search types (`useDockSearch`'s contract) on `./dock`, `SectionHierarchy` on `./sidebar`. `mulberry32`/`hashString`: a demo-local prng. The rest (`useFuzzySearch`, `useGlassBackdropLuminance` + `GLASS_BACKDROP_SHARED_ATTR`, `useScrollScene`, `springProjection` + `motionTempo` with `regen-spring-tokens`, `isAuroraPointerEnabled`, `pendingRenderer`, `MAX_SATS`, `FOURIER_STROKE_RUNGS`): the route measures both arms per name (the reader re-written to the public surface, or the name published with its MIGRATION and pin rows), and the driver rules on that table |
| **P5-R4** | do hand-written root configs join R-5's zones | (a) yes, bounds only (500 lines; the root dir is not counted against 12); (b) no | `vite.style-fold.ts` 588 lines, over 500 at HEAD; the edict's "the same for backend files" | **(a).** A build plugin is backend code; its length is the edict's concern regardless of where it sits. One file is affected; it splits into named modules beside it |
| **P5-R5** | the subject of a page-driving visual spec | (a) the unit whose story or route the spec drives; (b) the harness | B16 reads a spec that imports no sealed file as the harness's (VIS-in-L FALSE+); 2 of 169 Playwright files sit in a unit slot | **(a).** R-3 places a visual spec with its subject; a spec that drives one unit's story has that unit as subject. The law states how the subject is read (the story path the spec opens, through the story manifest), and B16 judges the tests-visual zone by it |

---

## P5-5 · The floor: open gaps

FLOOR-P5's battery went 0/6 → 6/6, its two regressions 2/2, pass 4's 8/8, and the graph batteries 59/59 and 18/18 (FP5 §1). FP5's own open gaps:

| id | gap | state after pass 5 |
|---|---|---|
| FP5-1 | B-kit named the removed dist machinery (S20, S25, `test-edits.mjs`) | **closed**: the chain re-derived from the P5 cut and replays to MATCH |
| FP5-2 | B-kit's own writer not parsed | **closed**: `B-kit/lib/row.mjs` calls the floor's `unparsed` before the first write and refuses a tree with no parse check |
| FP5-3 | F4m plants an already-broken importer | declared limit; no build |
| FP5-4 | P5-F3's moved set is one longest kept subsequence | safe direction (a hand-written listing of the other side reads RED); no build |
| FP5-5 | verify:package RED at −5,511 B on the floor | ruled by P4-R3 at landing; the route row is P5-R2 |
| FP5-6 | F47 not re-run; the full browser run | **closed** by the critic's full run (S-12) |
| FP5-7 | the parse check reads syntax only | declared limit; no build |
| FP5-9 | the floor uncommitted | **closed**: `3108676a` |

New, from the critique, each an S-10 or S-14 cure at cause:

| id | gap | source | pass-6 disposition |
|---|---|---|---|
| P5-G1 | `cascade verify` numbers SFC scope ids by first appearance, so a value-identical SFC style move reads as a content change and cannot be listed | cB5-R §7, Bp5 §2.3 | **P6-F1** |
| P5-G2 | FD-4's coverage arm reads `tests-visual/<basename>`, swallows the miss as `""` (`cascade.mjs:219`), and keys results by basename against bands keyed by path | cB5-R §7 | **P6-F2** |
| P5-G4 | the floor's other swallowed reads: `lib/graph/graph.mjs:37` (absent or malformed ledger = empty), `lib/recipes.mjs:58` (unreadable file = no classes) | cB5-R §5 | **P6-F3** |

---

## P5-6 · Open gaps outside the floor

| id | gap | source | pass-6 disposition |
|---|---|---|---|
| P5-G3 | renderer `armAsync().catch(() => undefined)` (aurora, blob, fourier-field) and ~90 Playwright page-operation swallows | cB5 §5.2 | outside D1's checklist; logged to the tranche cursor as an edict defect class ("no masking fallbacks"). Not route work in D1 |
| P5-G5 | `boot-graph/build.test.ts` needs `dist-demo`; `package.json` has no `pretest` | Bp5 §2.1 | a HEAD defect outside D1; logged to the tranche cursor |
| P5-G6 | the browser selection does not re-derive from the committed `changed` list alone (it also needs the move lists) | cB5 §5.9 | the route's selection record names every input it read; no build |
| P5-G7 | vitest and Playwright under load: hook timeouts, the base arm at 119/864 in 60 min at load 300-470 | Bp5 §2.1, §2.4 | P4-G8 holds: gate and browser verdicts are read on a quiet machine. The pass-6 seats state load with each verdict |
| P5-G8 | 392 browser failures common to both trees, unclassified (many π-lane GPU readbacks in headless Chromium) | cB5-R §8 | outside D1 (0 new); logged to the tranche cursor |

---

## P5-7 · Facts pass 5 established

These continue S-1..S-37.

**S-38 · R-5 holds at 12/500 with named modules.** Every file over 500 lines in the five zones split into named modules with no counterexample, `src/index.ts` included, and the chain replays (Bp5 §1, cB5 §3). R-5's "report the counterexample before formation" clause has no remaining instance except the root config P5-R4 asks about.

**S-39 · A slot bound can be met by merging by concept.** `dock/__tests__` went 17 → 12 by merging eight single-concern files into three, with every assertion kept (P5-R1).

**S-40 · An instrument that swallows a miss cannot judge the class it swallows.** FD-4's coverage arm returned `""` for a spec that had moved, so no evidence could reach it, and nothing said so (cB5-R §7). The instruments are held to the same no-masking law as the tree.

**S-41 · A migration's verifier must read its own moves.** Scope-id renumbering made a value-identical SFC split read as a content change. A verifier that cannot read a move the migration makes forces either an unlistable RED or a listing that over-reaches.

**S-42 · Name rules must judge every stem the law names.** B15's directory pattern caught provenance names its file pattern missed, and its test-file skip let two through the carve.

---

## P5-8 · Pass-6 plan

### P5-8.1 Routes

| route | status | pass-6 work |
|---|---|---|
| D1-B | ADVANCE | fifth full pass: close S-10, S-14, B-01, B-07, B-10 |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P5-8.2 Order

1. **Rulings.** P5-R1..P5-R5 ruled into `RULINGS.md` as one list, before the floor and route seats. P5-R3's residual names are ruled on the route's both-arm table when it returns; the rest are ruled first.
2. **Floor.** P6-F1..P6-F3 built once on one seat, each with a plant RED before and GREEN after; `FLOOR-P6.md`; committed before the route re-derives.
3. **Route.** B re-derives from the P6 floor cut. Seats by model declared.
4. **Critique.** A fresh critic who authored nothing in passes 2-6 writes and hashes the battery before reading the kit.
5. **Pass-6 agglomeration.**

### P5-8.3 Floor and route work

| id | build | closes |
|---|---|---|
| P6-F1 | `cascade verify` reads an SFC style move as a move: scope ids are compared by the component they scope, not by first appearance, so a rule that keeps its text and its rung under a renamed scope is unmoved; a value change under a scope still reads RED | S-10 (P5-G1) |
| P6-F2 | FD-4's coverage arm keys results and bands by the spec's path relative to the config's `testDir`, reads the spec at that path, and a missing spec fails the verdict loud | S-10, S-14 (P5-G2, `cascade.mjs:219`) |
| P6-F3 | `lib/graph/graph.mjs:37` and `lib/recipes.mjs:58` cured at cause: an absent input is a caller's explicit statement, an unreadable or malformed one fails loud | S-14 (P5-G4) |
| route · S-14 | B17 reads a named loader called with an argument (literal and parameter, all zones); a swallowed read through any reader the tree defines (`tree.read`, `T.read`), or B17's law names which readers count and the tree uses only those; the promise form `readFile(…).catch(h)`. `vite.style-fold.ts:412` and `vite.utility-emit.ts:94` fail loud on a missing SFC bundle. LAW §10 re-stated to the gate, including its scope (reads and loads) | S-14 |
| route · B-07 | B15's file pattern takes its directory pattern's provenance forms (`-N`, `part-N`, wave ids, an eponym plus a digit or `Part`/`Split`); B15 judges test stems; `suffuse2.spec.ts` and `motion2.spec.ts` renamed by concept; LAW §11 matches the gate | B-07 |
| route · B-S14 | B2 61 → 0 per P5-R3: test and aurora visual lines colocated into their units, contract names published with MIGRATION and pin rows, the rest per the ruled table | B-01, B-10 |
| route · B-S16 | the gate guards Playwright-program membership (every Playwright file in a zone is in `playwright --list`); B16 reads a page-driving spec's subject per P5-R5 and judges the tests-visual zone; unit visual specs move into their slots | B-10 |
| route | the S39-12 prose duplication cured and the datum row re-measured (P5-R2); `vite.style-fold.ts` split if P5-R4 is (a); LAW.md's header and sections re-stated so a literal reading gives the gate's verdict | P5-R2, P5-R4, B-07, S-14 |

### P5-8.4 What pass 6 must prove

§P4-8.4's bar unchanged, plus:
- `cascade verify` GREEN on the migrated tree against the floor base, with every moved rule listed and no risky pair;
- FD-4's coverage arm counts the carved chip readback spec as evidence (the critic's `fd4-cover-probe.mjs` reads covered=true on arm A);
- B17 = 0 with the floor's own swallowed reads cured, and B2 = 0.

**The battery must plant:** every X5 shape of cB5-R §4.3 in each zone; placeholder split names (`part-1.ts`, `GlassDock-2.ts`, `GlassDock2.ts`, `GlassDockPart2.ts`, `bs11.ts`, `GlassDockSplit.ts`) and a placeholder test stem; a Playwright file outside the program; a spec moved out from under FD-4's coverage (it must fail loud, not read empty); an SFC style split with values kept (GREEN once listed) and one with a value changed (RED); a legal page-driving `*.visual.ts` in its unit (clean). It re-runs pass 4's and pass 5's batteries as regressions.

### P5-8.5 Convergence criterion

§P2-6.5 unchanged. The checklist is §P3-9's 27 items, frozen, with the status in §P5-9. **B's two-clean-passes count is 0.** The pass-6 critique is the first of the two consecutive clean passes if it re-opens nothing and maps no finding to an edict clause the list leaves out; D1-B converges no earlier than the pass-7 agglomeration, and then only with all 27 items closed by committed, replayable measurements.

---

## P5-9 · Open gaps, enumerated (the pass-6 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 5.

| item | pass-5 critic | entering pass 6 | what closes it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | re-met by the pass-6 kit's commit before judgment |
| S-02 | CLOSED | CLOSED | — |
| S-03 | CLOSED | CLOSED | — (P5-R1, P5-R2 owed as rulings, not as items) |
| S-04..S-09 | CLOSED | CLOSED | — |
| **S-10** | OPEN (re-opened) | **OPEN** | P6-F1, P6-F2; cascade GREEN on the migrated tree with the Timeline rules listed; the carved readback spec counted as evidence |
| S-11 | CLOSED | CLOSED | — |
| S-12 | CLOSED | CLOSED | — |
| S-13 | CLOSED | CLOSED | — |
| **S-14** | OPEN | **OPEN** | §P5-8.3 route · S-14 and P6-F2, P6-F3; the X5 plants caught |
| **B-01** | OPEN | **OPEN** | B2 0 per P5-R3 (B0 and B6 already 0) |
| B-02..B-06 | CLOSED | CLOSED | — |
| **B-07** | OPEN (re-opened) | **OPEN** | §P5-8.3 route · B-07; the placeholder split-name and test-stem plants caught |
| B-08, B-09 | CLOSED | CLOSED | — |
| **B-10** | OPEN | **OPEN** | B-S14 run (B2 0); B-S16's program guard and P5-R5's subject reading (B-S10..B-S12, B-S15 done) |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 6:** 27 items, 22 closed, 5 open (S-10, S-14, B-01, B-07, B-10). Two-clean-passes count: 0.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 5. The kept declaration is B's; the pass-5 critique re-opened two items, so its convergence record is not written.


---
---

# D1 · pass 6 · REGISTRY: the route after pass 6

| field | value |
|---|---|
| seat | D1 pass-6 agglomeration. Closes pass 6 with B's status and convergence, the two-clean-passes count, G's re-trigger, the P5-R3 residual table, the rulings owed, the floor's open gaps and the pass-7 plan. Passes 1-5 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `acf3bb3d`. `git diff 544c9271 HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code (base digest `35f7b831…`). The kit is committed at `6eeb55e1` (373 tracked files under `pass-6/`), the critique at `acf3bb3d` |
| inputs, read in full | `pass-6/`: `FLOOR-P6.md`, `B-proto.md`, `B2-residual-arms.md`, `critique-B.md`, `critique-B/results/RESULTS.md`; this file §P2-6.5, §P2-7, §P3-9, §P5-0..§P5-9; `RULINGS.md` |
| instruments | none re-run. Read-only checks: `git log`, the empty code diff above, `git ls-files pass-6`; `B-kit/authored/p6-publish.mjs` (rows 23, 39, 73-74); HEAD's `src/composables/motion/scroll/useScrollScene.ts:1-25`, `src/index.ts:42`, `src/composables/motion/index.ts:3-12`; a `grep -w` census of the residual names' library readers |
| fences | no source edit, no git write; this part is the only write |

Short citations: `FP6` is `pass-6/FLOOR-P6.md`, `Bp6` is `pass-6/B-proto.md`, `B2A` is `pass-6/B2-residual-arms.md`, `cB6` is `pass-6/critique-B.md`, `cB6-R` is `pass-6/critique-B/results/RESULTS.md`.

---

## P6-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 27/27 = 100% | ADVANCE | **0** | exact replay from committed bytes (`bb3f6c58…`, 1,580 files, 113 steps); 18/18 clauses at 0; cascade GREEN with the Timeline split listed; FD-4 counts the carved spec; B17, B2 and B15 close on their plants |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | re-trigger not fired (§P6-3) |

**The two-clean-passes count for B moves 0 → 1.** The pass-6 critique closes all 27 items, re-opens none, and maps none of its eight outside findings to an edict clause the list leaves out (cB6 §0, §4). By §P2-6.5 (3) and §P5-8.5 this is the first clean pass. D1-B converges at the pass-7 agglomeration if and only if the pass-7 critique also re-opens nothing and every item stays closed by a committed, replayable measurement.

Four findings shape pass 7.

1. **The pass-6 work landed and replays.** S60-S70 cured the four live masking sites at cause, split `vite.style-fold.ts` (589 → 318 + 286), renamed the numbered specs by concept, took the S39-12 prose out of the declarations (−30,779 B), and brought B2 61 → 0. The critic's replay from the commit matches to the byte, and its rerun is a no-op (cB6 §1, cB6-R §1).
2. **One landed residual arm breaks an entry's contract, and no gate saw it.** S64 publishes `useScrollScene` on `./motion-core`, calling it "engine-free". The file imports `SmoothProgress` and `SpringProgress` from `@mkbabb/keyframes.js` at line 25, and its header says "KEYFRAMES-BEARING → ships on `/motion`, NEVER `/motion-core`". `./motion-core` is the keyframes-free entry (`src/index.ts:42`, `composables/motion/index.ts:3-12`), so a cheap-leaf import from it would now reach the engine. The same row file places `springProjection` on `./motion` for exactly that reason (`p6-publish.mjs:72`). Read from committed rows, not measured on a built dist. It is a recommended row awaiting the driver, so the cure is the ruling (§P6-4, P6-R1).
3. **The pass-6 browser verdict rests on scratch.** Only the summary (`results/p6/runs.txt`) is committed; the selection and both `/2` reports are not (cB6 §4.4). S-12 holds on its text, but the convergence pass must replay its browser verdict from committed bytes.
4. **Two known gate blind spots remain inside listed items' ambit.** I7 (a style-kernel `@import` of a private dock sheet) has been missed by B3 since pass 2 (Bp6 §3.4, cB6 §4.3). `seal.mjs` exits 1 on both a RED verdict and an uncaught throw (cB6 §4.6). Neither changes a verdict today; both are cheap to cure before the last critique.

---

## P6-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-7 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel included (B1); direction (B8); sibling acyclicity, value and type, same-dir files included (B4); no masking fallback (B17), reads and loads, every reader the tree defines; names (B15), test stems included; Playwright-program membership and visual subject (B16) | ADVANCE | 100% | — | the one live route; the second clean pass |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P6-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired: no plant found a rank inversion B4 and B8 both miss | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P6-2 · D1-B · Sealed modules, flat: ADVANCE, 100%

**What ran** (Bp6 §0-§4, confirmed by cB6 §1-§3 and cB6-R §1-§7).

| item | result |
|---|---|
| floor | P6-F1 (SFC scopes labelled by component; `scopes` declares a split), P6-F2 (one key from `testDir`; `/2` reports; a missing spec throws), P6-F3 (the ledger and recipe reads cured, and the rest of the class in the floor runtime). Battery 2/9 → 9/9; pass 5's 8/8, pass 4's 8/8, graph 59/59 and 18/18 (FP6 §2) |
| chain | 113 steps from the P6 floor cut to S70; S60-S70, S62c, S69s added |
| replay | final digest `bb3f6c58…0add29` over 1,580 files. Route: r1 383.8 s, r2 `--twice` 1,124.3 s. Critic: 649.6 s from `6eeb55e1`'s own kit, rerun 2.8 s, unchanged after every battery. Floor base (chain truncated to S1): `5b14c6c7…` |
| gate | 18/18, every clause 0. Pin: modules 139, doors 119, names 1,297, reviewed 2, held 0 |
| toolchain | build 0 on both trees; both `vue-tsc` programs 0; demo build 0; `seal.test.ts` 20/20 |
| vitest | critic: 2,323 passed, 2 failed (5,000 ms timeouts at load 61-68), both files 38/38 alone. Route: 2,324 passed, 1 failed (boot-graph mtime after the plant batteries; 14/14 after `demo:dist:build`) |
| package | verify:package CLEAN at 2,925,765, the datum rebound once at S70 (2,919,057 → 2,925,765). Over the floor's 2,913,546: +12,219 B, of which MIGRATION.md +9,654, door declarations +3,192, other declarations −1,703 |
| cascade | GREEN against the floor base: `./styles` 28 moved, `./styles.css` 10 moved, 0 risks, `SCOPE Timeline → TimelineMarks: 40 rule line(s) re-homed`. Unlisted RED, scopes-only RED, a changed value under the new scope RED. The critic's own Aurora → AuroraShade split: none RED, scopes-only RED, listed GREEN, value RED, restore GREEN |
| FD-4 | `/2` report: arm A covered=true, evidence 1; a moved spec throws naming it (G, G2); an unversioned report throws (U) |
| browser | base 866 tests (428 / 394 / 44); route selection 71 specs in 16 bands, 386 tests (184 / 194 / 8); rekey 153 specs, 0 unmapped; **0 new failures**, 183 base-green all pass. Loads 24-67. Scratch artefacts, summary committed (§P6-6) |
| plants | critic: 106 + 6 extra, 89 CAUGHT, 13 CLEAN, 4 FALSE+, 1 SKIP; regressions 259: 233 CAUGHT, 17 CLEAN, 7 FALSE+, 5 OTHER, 6 UNNAMED (all caught in the expected clause solo). Route: 20/20 |

**The critic's items** (cB6 §2): 27 CLOSED, 0 OPEN, 0 re-opened. The five that entered open:

| item | closed by |
|---|---|
| S-10 | cascade GREEN on the migrated tree with the Timeline split listed; P6-F1 on a split the route did not make; FD-4 arm A covered=true from a `/2` report |
| S-14 | B17 70/70 on every X5 shape in five zones (the loader form caught by B17 alone in its literal arm); pass 5's 140 + 7 regressions; the floor and tree sites read; LAW §10 states the scope |
| B-01 | 18/18 GREEN, B2 0 |
| B-07 | the six split-name plants, 4 cross-zone, 6 test stems, PH5 15/15; census PH6-NAMES 0; LAW §11 states the forms |
| B-10 | B2 0; the program guard in three forms, pass 5's orphan now caught; PW-PROGRAM 0 missing; P5-R5 subject reading CLEAN in slot, caught out of slot |

**This registry's reading.** It agrees with every verdict. Three need a sentence.

- **FD-4 is met by the critic's re-issued probe.** §P5-8.4 named the critic's `fd4-cover-probe.mjs`. That probe built an unversioned, basename-keyed report, the shape P6-F2 removes, so as written it now throws (FP6 §4.4). The pass-6 critic's `fd4-probe.mjs` builds a `/2` report and reads arm A covered=true; the probe's intent ("the carved spec counts as evidence") is what the bar states. Met.
- **VIS-in-L is re-adjudicated, not dismissed.** Under P5-R5 a spec's subject is the unit whose story it opens. VIS-in-L opens `/` and reads nothing sealed, so its home is the harness, and B16 placing it there is the law's verdict. The control was legal only under pass 5's convention (cB6 §3.4).
- **The six B0 control FALSE+ stay a battery-design class.** LAW §B0 sends a computed-path read outside the harness to B0 in those zones; three pass-6 controls and six pass-5 controls planted exactly that form. No verdict rests on them.

**The critic's outside findings** (cB6 §4), read under §P2-6.5:

| # | finding | maps to | effect |
|---|---|---|---|
| 1 | P5-R3's residual names landed on recommended arms awaiting the driver | B-01 (B2), P4-R2/P5-R3 | ruling owed, P6-R1 (§P6-4). This registry adds the `useScrollScene` defect (§P6-0 finding 2) |
| 2 | S67 publishes 11 eyeglass names on the morph door for a colocated test (+1,607 B declarations) | B-10 / R-3, P4-R2 | ruling owed, P6-R2 |
| 3 | I7 missed by B3 since pass 2 | B-01's ambit (B3) | pass-7 route work (§P6-8.3). B-01's text holds today |
| 4 | the pass-6 browser selection and reports uncommitted | S-12 | pass-7 route work: committed. S-12's text holds |
| 5 | P5-G3 persists (renderer `armAsync().catch`, Playwright page-operation swallows) | edict "no masking fallbacks", logged to the tranche cursor | outside D1, as ruled |
| 6 | `seal.mjs` exits 1 on RED and on an uncaught throw | S-14 (fail loud) | pass-7 route work: a distinct exit for a crash |
| 7 | 38 one-line `@import` CSS dist files | B-12 | none; LAW §5 doors |
| 8 | seal `files` 15,616 against the route's 15,165 at the same digest, edges, pin and clauses | — | pass-7 route work: the route states what the walk counts, so the number is a function of the tree alone |

The registry's own finding (§P6-0 finding 2) maps to B-01/B-10 through P5-R3's table and to the edict's "encapsulated"; the list carries that clause. It re-opens nothing because the row is a recommendation the driver has not ruled; it must be cured by the ruling before the pass-7 critique, or the pass-7 critic may read it as a B-10 failure.

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.**

---

## P6-3 · G's re-trigger: not fired

§P3-2.2's first condition is a conjunction: B's doors buy no catch G's E3 and B1 would not also make, **and** the owner rules the door bytes too high.

- **The first arm fails again.** Pass 4's door plants regress on the pass-6 tree as in passes 4 and 5: the kernel-interior and nested-interior reaches by B1, the module-grain type and value cycles by B4, the legal door controls clean (cB6 §2 B-12/B-13, cB6-R §5). G's law has no kernel seal and no module-grain cycle clause.
- **The second arm has no ruling.** P5-R2 ruled the datum "(b), then (a)": the prose cure landed at S63 (S39-12 −30,779 B, all prose), so the remainder is ruled as measured. The door wiring is +17,332 B (S5-1) and +7,928 B (S64); no ruling calls it too high.

G stays banked. The second re-trigger (the owner asks for eponymy as the declaration) has not fired.

---

## P6-4 · The P5-R3 residual table: the driver's recommended ruling per name

P5-R3 ruled four rows outright and left the rest to this table. Each recommended row landed on its recommended arm, so a flip is one S64 row out and one S65 edit in (B2A). The library-reader census is HEAD's (`grep -w`, `__tests__` excluded).

| name | owner | consumer | landed | recommended ruling | why |
|---|---|---|---|---|---|
| `useDockState` | `dock/composables/useDockState.ts` | demo dock-search | (b) `./dock` | **ruled (b)** (P5-R3) | `useDockSearch` needs a `dockState` the consumer constructs |
| `SearchableItem`, `SearchResult`, `FuzzySearchState` | `dock/search/types.ts` | demo search, catalogue, dock-search | (b) `./dock` | **ruled (b)** | the contract types of a published composable |
| `SectionHierarchy` | `composables/sidebar/types.ts` | demo virtual layout | (b) `./sidebar` | **ruled (b)** | the base of the published `TreeIndexEntry` |
| `mulberry32`, `hashString` | `procedural/prng.ts` | demo fourier-field | (a) demo-local prng | **ruled (a)** | — |
| `useFuzzySearch` | `dock/search/useFuzzySearch.ts` | demo `/data/search` | (a) via `useDockSearch` | **(a)** | BK #42 / SE-4 made the dock the engine's one public expression |
| `GLASS_BACKDROP_SHARED_ATTR`, `useGlassBackdropLuminance` | `glass/useGlassBackdropLuminance.ts` | demo DockStage, glass-material | (b) `./dock` | **(b)** | the attribute is the contract a consumer sets on a shared backdrop the dock samples (`GlassDock.vue` and the dock's legibility sheets name it); a second sampler is a second authority |
| `springProjection` | `motion/spring/springProjection.ts` | demo springs (2), `regen-spring-tokens` | (b) `./motion` | **(b)** | the `--spring-*` tokens are generated from it; a consumer re-derivation is a third copy. Keyframes-bearing, so `./motion` is right |
| `springSettleDurationSeconds` | the same file | `regen-spring-tokens` | (a) | **(a)** | `springProjection(row).settleSeconds` is the same number |
| `useScrollScene` (+ options, return) | `motion/scroll/useScrollScene.ts` | demo scroll (2) | (b) `./motion-core` | **(a): the demo keeps the spine; the library file leaves `src`** | no library file reads it (HEAD: 0 readers outside itself; `scroll-driven.css` names it in a comment), so it belongs to no published component's contract and P4-R2's default holds. The landed arm is also wrong on its own terms: the file statically imports keyframes.js, and `./motion-core` is the keyframes-free entry. If the driver rules (b), it is `./motion`, never `./motion-core`. S69s's orphan-CSS row (its dead-referrer bite re-pointed because S64 published `useScrollScene`) is re-derived either way |
| `motionTempo` | `motion/core/motionTempo.ts` | demo springs (2) | (b) `./motion-core` | **(b)** | the tempo register eight library sites read (`useSpring`, `useElementMorph`, `useDockSpring`, the sheet detents, sortable-list motion, three token sheets); pure, so `./motion-core` is right |
| `pendingRenderer` | `glass/webgpu/rendererStatus.ts` | demo aurora, blob, constellation, fourier-field | (b) root | **(b)** | the initial value of the published `RendererStatus`, read by five library renderers; four story copies otherwise |
| `RendererStatus` (type) | the same file | the same four stories | (a) re-pointed at the root | **(a)** | already published |
| `isAuroraPointerEnabled` | `aurora/runtime/contract.ts` | demo AuroraStage | (b) `./aurora-config` | **(b)** | a predicate over the published config type; a consumer gating pointer UI would restate it |
| `MAX_SATS` | `blob/mood/constants.ts` | demo blob | (b) `./blob-config` | **(b)** | the bound of a published config field, read by six library files across both engines |
| `FOURIER_STROKE_RUNGS` | `fourier-field/register/constants.ts` | demo fourier-field | (b) `./fourier-field` | **(b)** | the rungs a published config field takes |
| `FOURIER_QUANTUM_FINE` | the same file | tests surface.smoke | (a) | **(a)** | the test states the quantum it observes |
| `sampleAuroraField`, `auroraFallbackGround`, `DEFAULT_AURORA_CONFIG`, `isSoftwareWebGLRenderer`, `createAurora` | aurora internals | tests-visual page imports | (a) entry sources | **(a)** | already published |

**One flip from the landed chain:** `useScrollScene` (b) → (a). The test rows of B2A's second table are all (a) by R-3 and LAW §9 and need no ruling.

---

## P6-5 · Rulings: P6-R1..P6-R3, owed

P5-R1..P5-R5 were ruled before pass 6 and held: no seat found one unbuildable. Three are owed now.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| **P6-R1** | the P5-R3 residual table | per name, §P6-4 | B2A; `p6-publish.mjs`; HEAD reader census | **§P6-4 as written**: every recommended row as landed except `useScrollScene`, which flips to (a) |
| **P6-R2** | S67's morph-door widening: 11 eyeglass names published on `composables/motion/morph/index.ts` (+1,607 B shipped declarations) so the colocated tabs-seam test can read them | (a) keep: the door publishes the law, the test reads it; (b) the tabs test states the law it observes, and the door stays as it was | Bp6 §5.3, cB6 §4.2; B11 requires an outside reader for a door name, and the one reader is a test | **(b).** A door grows for its consumers, and a test is not one (P4-R2's default, re-point). The test asserts the geometry the tabs seam renders, which it can state; the 1,607 B leave the package |
| **P6-R3** | does `seal.mjs` separate a crash from a verdict | (a) exit 1 RED, exit 2 an uncaught throw; (b) leave it | cB6 §4.6 | **(a).** A harness that reads exit 1 as RED cannot tell a crashed gate from a verdict; S-14's fail-loud law applies to the gate's own exit |

---

## P6-6 · The floor: open gaps

FLOOR-P6's battery went 2/9 → 9/9, with every regression held (FP6 §2). Its own gaps:

| id | gap | state after pass 6 |
|---|---|---|
| FP6-1 | P6-F1 labels a scope by SFC basename; two same-named scoping SFCs throw; a rename-move needs a `scopes` row | declared limit; fails loud (16 scoping SFCs, all distinct) |
| FP6-2 | P6-F1 reads plugin-vue's default production id; v-bind CSS vars unmodelled | declared limit; the safe direction (0 in tree and dist) |
| FP6-3 | `coverRisks` does not compare a report's root with the judged tree | declared limit; `verify --browser` takes the judged tree's own report |
| FP6-4 | a split into several children is admitted but unplanted | untested; every route split is one child. Pass-7 battery plants one (§P6-8.4) |
| FP6-5 | the critic's pass-5 probe arm A | **closed**: re-issued as a `/2` probe (cB6 §3.1) |
| FP6-6 | fence disclosures | disclosed |
| FP6-7 | `scan/text.mjs` keeps the raw token on a non-JSON escape | listed in FLOOR.md; a tokenizer decode, not a read |

Pass 5's floor gaps carry forward: FP5-3, FP5-4, FP5-7 declared limits; FP5-5 ruled (P4-R3, P5-R2). **No floor work is owed for pass 7.**

---

## P6-7 · Open gaps outside the floor

| id | gap | source | pass-7 disposition |
|---|---|---|---|
| P6-G1 | `useScrollScene` published on `./motion-core` though keyframes-bearing | this registry, §P6-0 | P6-R1 flip; pass-7 battery probes every S64 name's entry class |
| P6-G2 | the morph door widened for a test reader | cB6 §4.2 | P6-R2 |
| P6-G3 | I7: B3 does not read a style-kernel `@import` of a private module sheet | Bp6 §5.1, cB6 §4.3 (since pass 2) | pass-7 route: B3 reads CSS `@import` past a door, plant I7 CAUGHT |
| P6-G4 | the browser selection and both `/2` reports uncommitted | cB6 §4.4 | pass-7 route: committed with the kit |
| P6-G5 | `seal.mjs` exit codes | cB6 §4.6 | P6-R3 |
| P6-G6 | the seal's `files` count differs across worktrees at the same digest (15,616 / 15,165) | cB6 §4.8 | pass-7 route: the record states the walk's scope; the count depends on the tree alone |
| P6-G7 | leftover seat dirs: `.claude/worktrees/bl/D1/p6/B-proto/{build-s61.log,rebase-1.log}`, empty `crit-B/` and `floor/` | Bp6 §6, cB6 §6 | the driver removes them (both seats were refused) |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; 394 common browser failures | pass 5 | outside D1; on the tranche cursor |
| P5-G7 | load | pass 5 | every pass-6 verdict states its load (24-155); none depends on a timing |

---

## P6-8 · Pass-7 plan

### P6-8.1 Routes

| route | status | pass-7 work |
|---|---|---|
| D1-B | ADVANCE | the second clean pass: land P6-R1..P6-R3, cure P6-G3, P6-G4, P6-G6; hold all 27 items |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P6-8.2 Order

1. **Rulings.** P6-R1..P6-R3 ruled into `RULINGS.md` as one list, before the route seat.
2. **Floor.** None owed. The route re-derives from the P6 floor cut it already uses (S1 `5b14c6c7…`).
3. **Route.** B extends the chain from S70; seat by model declared. The kit and every result it cites, browser selection and reports included, are committed before the critic is launched (S-01).
4. **Critique.** A fresh critic who authored nothing in passes 2-7, the pass-6 critic included, writes and hashes the battery before reading the kit.
5. **Pass-7 agglomeration.** Writes the convergence record if the count reaches 2.

### P6-8.3 Route work

| id | build | closes or holds |
|---|---|---|
| route · P6-R1 | `useScrollScene` per the ruling: (a) the spine moves to the demo and the library file leaves `src`, its names out of S64, its MIGRATION and pin rows gone, S69s's orphan-CSS row re-derived; or (b) on `./motion`. Every other residual row as landed | B-01, B-10 |
| route · P6-R2 | per the ruling: (b) the 11 eyeglass names leave the morph door and the tabs-seam test states the law it observes; the datum row re-measured. P4-R3's one rebind moves to the last step that changes the bytes, and is the only rebind in the chain | B-10, S-03 |
| route · P6-R3 | `seal.mjs` exits 2 on an uncaught throw, 1 on RED, 0 on GREEN; LAW states it | S-14 |
| route · I7 | B3 reads a CSS `@import` (and `<style src>`) that crosses a door into a module's private sheet; LAW states it; the pass-2 battery's I7 reads CAUGHT | B-01 |
| route · browser | the full graph-selected run (§P4-8.4) on the pass-7 tree against the floor base, both `/2` reports and the selection committed with the kit, re-derivable from committed bytes | S-12 |
| route · walk | the seal record states what `files` counts (tracked files in the five zones and the root configs, or the walk's stated roots), so two worktrees at one digest read one number | — (no verdict rests on it) |

### P6-8.4 What pass 7 must prove

§P5-8.4's bar unchanged, re-met on the pass-7 tree, plus:
- the chain replays from the commit to one digest, rerun a no-op;
- 18/18 clauses at 0 (19 if I7 lands as a clause), verify:package CLEAN at the one rebound datum, cascade GREEN against the floor base with every moved rule listed;
- the browser verdict, 0 new failures with per-band base-green counts, replayed from committed reports;
- every name the chain publishes sits on an entry whose declared peer class its static closure keeps: nothing reachable from `./motion-core` imports `@mkbabb/keyframes.js`.

**The battery must plant:** I7 (CAUGHT by B3); a keyframes-bearing name published on `./motion-core` (the probe reads it; if no gate clause reads it, the critic records the class and its owner); a door name published for a test reader only; a seal crash (exit 2, not 1); an SFC split into two children (FP6-4). It re-runs pass 4's, pass 5's and pass 6's batteries as regressions, with the pass-6 critic's 112 plants among them.

### P6-8.5 Convergence criterion

§P2-6.5 unchanged. The checklist is §P3-9's 27 items, frozen, with the status in §P6-9. **B's two-clean-passes count is 1.** D1-B converges at the pass-7 agglomeration if and only if all 27 items remain closed by committed, replayable measurements and the pass-7 critique re-opens nothing and maps no finding to an edict clause the list leaves out. If it re-opens an item or maps a finding outside the list, the count restarts at 0.

---

## P6-9 · Open gaps, enumerated (the pass-7 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 6.

| item | pass-6 critic | entering pass 7 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the pass-7 kit, results and browser reports committed before judgment |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P5-R1..P5-R5 as landed; P6-R1..P6-R3 ruled and landed; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | — |
| S-09 | CLOSED | CLOSED | replay idempotent, rerun a no-op |
| **S-10** | CLOSED (was OPEN) | CLOSED | cascade GREEN listed; FD-4 `/2` coverage |
| S-11 | CLOSED | CLOSED | — |
| S-12 | CLOSED | CLOSED | the pass-7 browser run committed and replayable |
| S-13 | CLOSED | CLOSED | — |
| **S-14** | CLOSED (was OPEN) | CLOSED | B17 0; the seal's crash exit distinct |
| **B-01** | CLOSED (was OPEN) | CLOSED | every clause GREEN, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | — |
| **B-07** | CLOSED (was OPEN) | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| **B-10** | CLOSED (was OPEN) | CLOSED | B-S7..B-S16 run; the residual names on the ruled arms |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 7:** 27 items, 27 closed, 0 open. Two-clean-passes count: 1.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 6. The pass-6 critique is the first clean pass; D1-B's convergence record waits on the pass-7 critique.

---

# D1 · pass 7 · REGISTRY: the route after pass 7

| field | value |
|---|---|
| seat | D1 pass-7 agglomeration. Closes pass 7 with B's status and convergence, the two-clean-passes count, G's re-trigger, the rulings owed, the open gaps and the pass-8 plan. Passes 1-6 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a4b50371`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code. The kit is committed at `6154d6ec` (528 tracked files under `pass-7/` at HEAD, the critique's 97 among them), the critique at `a4b50371` |
| inputs, read in full | `pass-7/`: `B-proto.md`, `critique-B.md`, `critique-B/results/RESULTS.md`; this file §P2-6.5, §P6-0..§P6-9; `RULINGS.md` (P5-R1..P6-R3) |
| instruments | none re-run. Read-only checks: `git log`, the empty code diff above, `git ls-files pass-7`; `B-kit/gate/seal.mjs` lines 12-19 (static imports) and 471-472 (the CLI guard); `src/styles/scroll-driven.css:36`; `ls .claude/worktrees/bl/D1/` |
| fences | no source edit, no git write; this part is the only write |

Short citations: `Bp7` is `pass-7/B-proto.md`, `cB7` is `pass-7/critique-B.md`, `cB7-R` is `pass-7/critique-B/results/RESULTS.md`.

---

## P7-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 26/27 = 96.3% | ADVANCE | **1 (S-14)** | exact replay (`52cca0fe…574aea`, 1,582 files, 117 steps), 18/18, CLEAN at the one rebound datum, cascade GREEN, I7 caught, `./motion-core` keyframes-free; but a throw while the gate's modules load exits 1, the RED code |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | re-trigger not fired (§P7-3) |

**The two-clean-passes count for B restarts: 1 → 0.** The pass-7 critique re-opens S-14, a listed item (cB7 §0, §3.1). By §P2-6.5 (the "re-opens convergence when it maps to a listed item" clause) the count restarts. **No convergence record is written.** The earliest convergence is the pass-9 agglomeration: the pass-8 and pass-9 critiques must both re-open nothing.

**The re-open is confirmed from the committed kit.** `B-kit/gate/seal.mjs` guards only `main()` (line 472: `if (isMain) try { main(); } catch … process.exit(2)`). Its static imports (lines 12-19, `../lib/index.mjs` among them) evaluate before that line runs, and the floor's `tree.mjs` reads the root `package.json` at module scope. A non-JSON `package.json` throws during evaluation, and Node exits 1. The route's EXIT plants and `seal.test.ts` exercise only throws inside `main()`, so they read 2 (Bp7 §2.1). P6-R3 ruled "2 on an uncaught throw" with no exception, and §P6-9 holds S-14 closed by "the seal's crash exit distinct". The critic is right.

Three findings shape pass 8.

1. **Everything else held on an independent replay.** The critic re-derived the floor base (`5b14c6c7…`, cascade snapshot byte-identical to the kit's), matched the digest, read the rerun as a no-op after every battery, and reproduced pass 6's 371 regression plants row for row (cB7 §1, §5). P6-R1 and P6-R2 sit on their ruled arms (cB7 §2 S-03). P6-G3 (I7) and P6-G6 (`files` scope) are cured.
2. **The browser tally can drop a base-green key.** `browser-tally.mjs` iterates route keys only. `w38-binding.spec.ts` (moved by S43b) has no band, so the graph selection did not pick it, and the route report omits a base-green test. The critic ran it on the replayed tree: GREEN 4/4. S-12 holds on the critic's committed run, not on the route's tally (cB7 §3.3).
3. **The peer class has an owner that can pass without judging.** The kit's `tools/peer-closure.mjs` reads GREEN, exit 0, on an unbuilt tree; its dist arm reports `{"missing": …}` and passes (cB7 §4.2). The class has no gate clause and no `npm test` arm (Bp7 §2.5, open gap 2). This is the edict's "no masking fallbacks", carried by S-14.

---

## P7-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-8 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel and CSS edges included (B1, B3); direction (B8); sibling acyclicity (B4); no masking fallback (B17); names (B15); Playwright-program membership and visual subject (B16); the peer class, by probe only | ADVANCE | 96.3% | — | the one live route; the first of two clean passes |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P7-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P7-2 · D1-B · Sealed modules, flat: ADVANCE, 96.3%

**What ran** (Bp7 §0-§3, confirmed by cB7 §1-§5 and cB7-R).

| item | result |
|---|---|
| chain | 117 steps from base `35f7b831…` through the floor (S1 `5b14c6c7…`) to S70. S64, S65, S67, S69, S69s, S70 re-derived; S71, S71b, S71c, S71d added (the peer-class door cures) |
| replay | digest `52cca0fe…574aea` over 1,582 files. Route: r1 276.5 s, r2 `--twice` 785.2 s, both MATCH. Critic: 381.8 s from `6154d6ec`'s committed kit, rerun 0.3 s, and 1.3 s after every battery |
| gate | 18/18, every clause 0, exit 0. `files` 1,580 with `filesScope` on the route and the critic (P6-G6 cured). Pin: modules 140, doors 120, names 1,283, reviewed 2, held 0 |
| toolchain | build 0; both `vue-tsc` programs 0; demo build 0; `seal.test.ts` 21/21 (route), 24/24 with boot-graph (critic) |
| vitest | route: 2,339 passed, 2 failed (5,000 ms timeouts at load 60; 38/38 alone). Critic: 2,327 passed, 3 failed, all boot-graph before `dist-demo` existed (P5-G5) |
| package | verify:package CLEAN at 2,920,401, the datum rebound once (S70: 2,919,057 → 2,920,401). +6,855 B over the floor's 2,913,546; −5,364 B against pass 6 (P6-R1's names, P6-R2's 1,607 B, the scroll spine) |
| cascade | GREEN against the floor base: `./styles` 28 moved, `./styles.css` 10 moved, risks 0; Timeline → TimelineMarks 40 rule lines. No listing RED |
| FP6-4 | two-children splits judged right on both seats: route `Aurora.vue` → ShadeA + ShadeB, critic `Blob.vue` → BlobShade + BlobRim; listed GREEN, unlisted, one-scope, scopes-only and changed-value RED, restore GREEN |
| browser | base 866 / route 866 tests, selection 154 specs over 69 bands, rekey 0 unmapped. Route seat verdict RED on blob D2; D2 fails on the base 2 of 3 alone, so the critic grants it. The critic's re-derivation finds a second key the route never ran (`w38-binding`), runs it GREEN 4/4. Corrected: 412 base-green keys (394 + 18 duplicate-title), 0 failures attributable to the chain |
| peer class | `./motion-core` keyframes-free on both probes, 38 files. S71-S71d cure pass 6's breach of the files arm (spring, morph, reveal doors mixed classes). The root's class is broken at the floor base already (HEAD's state, outside D1) |
| plants | route: pass 7's 17/17; pass-6 critic's 112 and 259 regressions identical to pass 6; pass-2 battery 36 CAUGHT, I7 CAUGHT. Critic: 6/6 I7 by B3; 4 KF plants RED through both probes, 2 of them read by no gate clause; 3 extra B11 plants CAUGHT at line grain; crash 6 PASS, 1 FAIL (C3); 371 regressions = pass 6's tallies |

**The critic's items** (cB7 §2): 26 CLOSED, 1 OPEN, 1 re-opened.

| item | verdict | measurement |
|---|---|---|
| S-14 | **OPEN (re-opened)** | crash plant C3: a non-JSON `package.json` exits 1, not 2; the throw comes from `scripts/structure/lib/tree.mjs:17` at module evaluation, before the CLI guard |
| the other 26 | CLOSED | cB7 §2 rows |

**This registry's reading.** It agrees with every verdict. Two need a sentence.

- **S-14 is re-opened on the item, not on its neighbour.** P6-R3 cites S-14's fail-loud law as its ground, and §P6-9 names the crash exit as what holds S-14 closed. So the C3 reading maps to a listed item, and the count restarts. Nothing else in the chain moves for the cure (cB7 §0).
- **S-12 holds, but on the critic's run.** The bar is "0 new failures … replayed from committed reports" (§P6-8.4). The route's tally could not show it, because a base-green key absent from the route report drops out of both numerator and denominator. The critic's committed `browser/w38-binding.txt` closes the gap for this tree. The tally and the selection are pass-8 route work, so the pass-8 verdict does not depend on a critic noticing an omission.

**The critic's outside findings** (cB7 §4), read under §P2-6.5:

| # | finding | maps to | effect |
|---|---|---|---|
| 1 | the browser tally drops a base-green key the route did not run; a moved spec does not select itself | S-12's bar | pass-8 route work (§P7-8.3) |
| 2 | the kit's peer probe passes on an unbuilt tree (dist arm `missing`, exit 0); no gate clause or `npm test` arm reads the class | edict "no masking fallbacks" (carried by S-14); the peer class, B-01/B-10 through §P6-8.4 | pass-8 route work; P7-R1 owed |
| 3 | a test-only name on an ENTRY door reads only the pin line | P6-R2, P4-R2 | none: an entry name is a reviewed surface change (pin plus MIGRATION) |
| 4 | `scroll-driven.css:36` still calls the `useScrollScene` spine "one in-repo specimen" | P6-R1, prose | pass-8 route work: the citation names the demo spine |
| 5 | pass 6's FALSE+ classes persist | as recorded | none |
| 6 | full vitest fails 3 boot-graph tests before `demo:dist:build` | P5-G5 | outside D1 |

The route seat's own open gaps (Bp7 §4) are folded here: 1 is P7-G5, 2 is P7-R1, 3 is granted by the critic, 4 is met (`6154d6ec`), 5 and 6 are unchanged.

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.**

---

## P7-3 · G's re-trigger: not fired

- **The first arm fails again.** Pass 4-6's door plants regress on the pass-7 tree as before (cB7 §2 B-12/B-13, §5). G's law has no kernel seal, no module-grain cycle clause, and no CSS door.
- **The second arm has no ruling.** Door wiring in the declarations is +16,913 B against JSDoc prose −25,161 B (Bp7 §2.2); no ruling calls the door bytes too high.

G stays banked.

---

## P7-4 · Rulings: P7-R1..P7-R2, owed

P6-R1..P6-R3 were ruled on 2026-10-08 and landed. P6-R3 landed incompletely, which is the S-14 re-open; its text needs no change. Two rulings are owed.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| **P7-R1** | who judges an entry's declared peer class | (a) a gate clause (B18) over the source arms (names, files), under `npm test` through `seal.test.ts`; the dist arm stays in the probe and throws on a missing build; (b) the kit probe stays the only owner, with its dist arm made to throw | Bp7 §2.5, §4 gap 2; cB7 §3.6, §4.2: KF-leaf and KF-deep are read by no clause | **(a).** The class is part of an entry's contract and pass 6 broke it with every gate GREEN. A judge that nothing re-runs at the landing does not hold it. The source arms need no build, so they fit the gate's static walk; 18 clauses become 19 |
| **P7-R2** | when is a key base-green | (a) a key is base-green when it passes on the floor base in every run; a key that fails on the base under an alternating rerun (3 per tree) is flaky, recorded, and kept out of the bar; LAW states the protocol; (b) a single base pass, as now | Bp7 §2.4 (D2 fails on the base 2 of 3), cB7 §3.3 (the critic granted D2 on the reruns) | **(a).** A single-run mark cannot separate a flake from a regression, and pass 7 needed two seats to adjudicate one key by hand |

---

## P7-5 · Open gaps

| id | gap | source | pass-8 disposition |
|---|---|---|---|
| P7-G1 | an import-time throw in the gate exits 1 (S-14 open) | cB7 §3.1 | route: the CLI evaluates the gate inside its guard (a dynamic import under the `try`), or the floor modules read nothing at module scope; LAW states that every throw exits 2; `seal.test.ts` adds the import-time case |
| P7-G2 | the browser tally drops a base-green key the route never ran | cB7 §3.3, §4.1 | route: the tally iterates base-green keys and counts a missing one as not held |
| P7-G3 | a moved spec without a band does not select itself | cB7 §3.3 | route: `browser-select.mjs` selects every spec the chain moves or creates |
| P7-G4 | the peer probe's dist arm passes on a missing build | cB7 §4.2 | route: the dist arm throws (exit 2); P7-R1 decides the clause |
| P7-G5 | the root's peer class is broken at the floor base in all three arms | Bp7 §4 gap 1 | outside D1: moving names off the root is a surface change no D1 ruling covers; to the tranche cursor |
| P7-G6 | `scroll-driven.css:36` cites a spine that left `src` | cB7 §4.4 | route: the comment follows the move |
| P7-G7 | an empty seat dir, `.claude/worktrees/bl/D1/p7/` | this registry's `ls` | the driver removes it. P6-G7 is cured (`p6/` is gone) |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; 393 common browser failures | pass 5 | outside D1; on the tranche cursor |
| P5-G7 | load | pass 5 | every pass-7 verdict states its load (15-85); none rests on a timing |

Floor gaps: FP6-4 is **closed** (two-children splits judged on both seats). FP6-1..FP6-3, FP6-7 and FP5-3, FP5-4, FP5-7 stay declared limits. **No floor work is owed for pass 8.**

---

## P7-6 · Pass-8 plan

### P7-6.1 Routes

| route | status | pass-8 work |
|---|---|---|
| D1-B | ADVANCE | close S-14 at cause, cure P7-G2..G4 and G6, land P7-R1 and P7-R2; hold the other 26 items. The pass-8 critique is the first clean pass |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P7-6.2 Order

1. **Rulings.** P7-R1 and P7-R2 ruled into `RULINGS.md` as one list, before the route seat.
2. **Floor.** None owed. The route re-derives from the P6 floor cut (S1 `5b14c6c7…`).
3. **Route.** B extends the chain from its pass-7 tail; seat by model declared. The gate re-land (S69) is re-derived once and stays the last gate step; the datum rebinds once, at the last step that changes the package bytes. The kit, every result it cites, the browser selection and both `/2` reports are committed before the critic is launched (S-01).
4. **Critique.** A fresh critic who authored nothing in passes 2-8, the pass-6 and pass-7 critics included, writes and hashes the battery before reading the kit.
5. **Pass-8 agglomeration.** Moves the count to 1 if the critique re-opens nothing and maps nothing outside the list. Convergence waits on the pass-9 critique.

### P7-6.3 Route work

| id | build | closes or holds |
|---|---|---|
| route · S-14 | the CLI's guard covers module evaluation: every throw, at import or in `main()`, exits 2. LAW "The gate" says so without exception. `seal.test.ts` gains an import-time case (a non-JSON `package.json` in an overlay root) | S-14 |
| route · peer | per P7-R1: (a) B18 judges each entry's names and files arms against its declared class, `seal.test.ts` carries one RED and one GREEN case; the probe's dist arm throws on a missing build; LAW §5 names the clause as owner | B-01, B-10, S-14 |
| route · tally | `browser-tally.mjs` iterates base-green keys, counts an absent route key as not held, and prints it; `browser-select.mjs` selects every spec the chain moves or creates; the full run re-done on the pass-8 tree, committed | S-12 |
| route · flake | per P7-R2: (a) the alternating-rerun protocol in LAW, its results committed beside the run | S-12 |
| route · prose | `scroll-driven.css:36` names `demo/stories/motion/scroll/useScrollScene.ts` | B-10 (P6-R1) |

### P7-6.4 What pass 8 must prove

§P6-8.4's bar, re-met on the pass-8 tree: the chain replays to one digest, rerun a no-op; every clause at 0 (19 if P7-R1 lands as (a)); verify:package CLEAN at the one rebound datum; cascade GREEN against the floor base with every moved rule listed; the browser verdict, 0 new failures with per-band base-green counts, re-derived from committed reports with every base-green key accounted for; nothing reachable from `./motion-core` imports `@mkbabb/keyframes.js`.

**The battery must plant:**
- a throw in every phase the gate passes through: module evaluation (non-JSON `package.json`, a throwing floor module), `main()`, record write. Each exits 2;
- the peer class through the gate: KF-leaf, KF-deep, KF-new, KF-existing, and a keyframes-free control (if P7-R1 is (a));
- the peer probe on an unbuilt tree, which exits 2;
- a route report with a base-green key removed (the tally reads it not held), and a moved spec with no band (the selection picks it);
- a flaky base key under the P7-R2 protocol;
- regressions: pass 4-7's batteries, with the pass-6 critic's 371 and the pass-7 critic's 17 + 4 among them.

### P7-6.5 Convergence criterion

§P2-6.5 unchanged. The checklist is §P3-9's 27 items, frozen, with the status in §P7-7. **B's two-clean-passes count is 0.** The pass-8 critique moves it to 1 if it re-opens nothing and maps no finding to an edict clause the list leaves out. D1-B converges at the pass-9 agglomeration at the earliest, and only if the pass-9 critique does the same. Any re-open restarts the count at 0.

---

## P7-7 · Open gaps, enumerated (the pass-8 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 7.

| item | pass-7 critic | entering pass 8 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the pass-8 kit, results and browser reports committed before judgment |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P6-R3 on their arms; P7-R1, P7-R2 ruled and landed; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | — |
| S-09 | CLOSED | CLOSED | replay idempotent, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN listed; FD-4 `/2` coverage |
| S-11 | CLOSED | CLOSED | — |
| S-12 | CLOSED | CLOSED | the pass-8 browser run committed; every base-green key accounted for |
| S-13 | CLOSED | CLOSED | — |
| **S-14** | **OPEN (re-opened)** | **OPEN** | B17 0; every gate throw exits 2, import time included; no judge passes on a missing input |
| B-01 | CLOSED | CLOSED | every clause GREEN, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | — |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | the residual names on the ruled arms; the peer class held by its owner |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 8:** 27 items, 26 closed, 1 open (S-14). Two-clean-passes count: 0.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 7. D1-B's convergence record waits on two consecutive clean critiques, pass 8's and pass 9's.

---

# D1 · pass 8 · REGISTRY: the route after pass 8

| field | value |
|---|---|
| seat | D1 pass-8 agglomeration. Closes pass 8 with B's status and convergence, the two-clean-passes count, G's re-trigger, the rulings owed, the open gaps and the pass-9 plan. Passes 1-7 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `27f6371d`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code. The kit is committed at `b0900969` (558 tracked files under `pass-8/`). The critique (`pass-8/critique-B.md`, `pass-8/critique-B/`) is **untracked** at this seat |
| inputs, read in full | `pass-8/B-proto.md`, `pass-8/critique-B.md`, `critique-B/BATTERY-HASH.txt`, `critique-B/results/{select-plant,peer-unbuilt-base,extra-plants}.txt`; this file §P2-6.5, §P2-7, §P3-9 (S-14's text), §P7-0..§P7-7; `RULINGS.md` through P7-R2; `waves/W-D.1.md`, `waves/INDEX.md`. The kit's other files and the critic's other results were read at the lines the two reports cite, not re-run |
| instruments | none re-run. Read-only checks: `git log`, `git ls-files pass-8`, the empty code diff; `B-kit/gate/seal.mjs` lines 1-40 (guard first, gate by dynamic import); `B-kit/lib/floor.mjs:30-41` (the `_` filter); `B-kit/tools/browser-tally.mjs:21,26,28,36,79` (header "2 on a throw", top-level throws, no guard); `B-kit/LAW.md` §13; `B-kit/derive/land-gate.mjs:3-11` (what lands); `tsconfig.test.json` (`tests-visual/` not included); `ls .claude/worktrees/bl/D1/p8/` |
| fences | no source edit, no git write; this part is the only write |

Short citations: `Bp8` is `pass-8/B-proto.md`, `cB8` is `pass-8/critique-B.md`, `cB8-R` is `pass-8/critique-B/results/`.

---

## P8-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | reason in one line |
|---|---|---|---:|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 27/27 = 100% | ADVANCE | **0** | exact replay from committed bytes (`05aaa6ed…a451e1b3`, 1,585 files, 121 steps), 19/19, CLEAN at the one rebound datum (2,920,391), cascade GREEN, 428/428 base-green held; S-14 closed at cause (crash8 37/37, every module the gate loads) |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | re-trigger not fired (§P8-3) |

**The two-clean-passes count for B advances: 0 → 1.** The pass-8 critique re-opens nothing, and none of its five outside findings maps to an edict clause the list leaves out (cB8 §5, §6; ruled in §P8-2 below). **This is the first clean pass. No convergence record is written.** D1-B converges at the pass-9 agglomeration at the earliest, and only if the pass-9 critique also re-opens nothing.

Three findings shape pass 9.

1. **S-14 closed at its cause.** `seal.mjs` imports only `node:fs` and `node:path`, installs the `uncaughtException` guard as its first statement, and loads the gate by `await import("./clauses.mjs")` under it (read at `B-kit/gate/seal.mjs:15-28`). The critic planted a module-scope throw in each of the 24 modules the gate loads, plus the pass-7 C3, an unhandled rejection and a deferred throw: every one exits 2 (cB8 §1). B18 throws on a missing table, the peer probe on a missing build.
2. **Two kit judges still carry the S-14 defect class, outside the gate.** `browser-tally.mjs` declares "2 on a throw" (line 21) but throws at top level with no guard (lines 26, 28, 36), so Node exits 1, its RED code (cB8 O-2). The probe's dist arm reads an emptied `dist/motion-core.js` GREEN (cB8 O-4, `cB8-R/peer-unbuilt-base.txt` U4). Neither passes a missing input as a verdict on the gate; both are the closest calls this registry rules (§P8-2).
3. **The selection drops 14 `_*` capture specs by an unstated rule.** `lib/floor.mjs:39` filters them, its own comment says so, and LAW §13 says the opposite ("every spec of the final tree's Playwright program that a move or a row touches"). S43b/S43c move all 14. No base-green key exists for them, so 428/428 stands, but `tsconfig.test.json` does not include `tests-visual/`, so a capture spec broken by its move is read by nothing (cB8 O-1).

---

## P8-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-9 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel and CSS edges included (B1, B3); direction (B8); sibling acyclicity (B4); no masking fallback (B17); names (B15); Playwright-program membership and visual subject (B16); the peer class (B18) | ADVANCE | 100% | — | the one live route; the second of two clean passes |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P8-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P8-2 · D1-B · Sealed modules, flat: ADVANCE, 100%

**What ran** (Bp8 §0-§6, confirmed by cB8 §0-§4).

| item | result |
|---|---|
| chain | 121 steps from base `35f7b831…` through the floor (S1 `5b14c6c7…`) to S70. New: S72 (P7-G6, the scroll spine's citation), S73, S73b, S73c (the dock context's label, sub-module and door, forced by B18's names arm). Re-derived: S69 (the gate re-land), S69s (pin), S70 (datum) |
| replay | digest `05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3` over 1,585 files. Route: six replays across three HEADs, r5 904.0 s and r6 `--twice` 1,430.9 s MATCH. Critic: 338.4 s from `b0900969`'s committed kit in a fresh worktree, rerun 0.9 s no-op, unchanged after every battery |
| floor base | `5b14c6c7…705402f` over 1,354 files, re-derived by the critic |
| gate | 19/19, every clause 0, exit 0. `files` 1,583, modules 141/141, pin 141 / 121 doors / 1,289 names / 2 reviewed; peer held 23 (the root's base-state breaks, P7-G5) |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` 24/24; vitest 2,333 passed, 0 failed (`demo:dist:build` first) on both seats |
| package | verify:package CLEAN at 2,920,391, rebound once at S70 after S73c. +6,845 B over the floor; −10 B against pass 7 |
| cascade | GREEN against the floor base (`./styles` 28 moved, `./styles.css` 10 moved, risks 0); RED with an empty listing (critic) |
| browser | 428 base-green, 428 held, 0 failed, 0 absent; D2 flaky under P7-R2 (base P/FFF), outside the bar. Critic re-derived from the committed `/2` reports with no route tool: same. Tally plants T1-T5 PASS; flake fixtures 8/8 |
| peer class | `./motion-core` keyframes-free on names (55), dist (5 files) and files (38). B18 catches KF-new, KF-leaf, KF-deep, KF-existing, KF-side, KF-reexport, VU-leaf; silent on the three controls; KF-dyn unread, as LAW §5 states |
| S-14 | crash8 37/37; C3 (non-JSON `package.json`) now 2; peer probe 2 on U1-U3; B18 2 on a missing heading, file or peer |
| plants | route p8 27/27, p7 17/17, p6 PASS; critic's 381 regression rows reproduced row for row, 0 differ; I7 6/6 by B3 |

**The critic's items** (cB8 §6): **27 CLOSED, 0 OPEN, 0 re-opened.** S-14 moves OPEN → CLOSED; it entered pass 8 open, so its closure is not a re-opening of anything.

**This registry's reading.** It agrees with every verdict. S73-S73c, route work outside the plan, are judged by the critic as cures at the cause (cB8 §6 B-10): the chain had routed `Slider` to keyframes.js through the dock context; the label moves into the context and the context gets its own door. That is the edict's encapsulation, not a workaround, and it changes no ruled arm.

**The critic's outside findings** (cB8 §5), read under §P2-6.5. Each is ruled on the frozen text of the item it touches, as §P7-2 did for S-14 ("re-opened on the item, not on its neighbour").

| # | finding | nearest item, frozen text | does it re-open? | effect |
|---|---|---|---|---|
| O-1 | the selection drops the 14 `_*` capture specs the chain moves; LAW §13 states the opposite | S-12 (§P2-7: "π and Playwright executed"); held by "every base-green key accounted for" (§P7-7) | **No.** No base-green key is unaccounted for: the capture specs run on neither tree, so the bar's set is unchanged and 428/428 is exact. The defect is a LAW sentence the tool contradicts, and a moved capture spec no instrument reads | P8-R1 owed; pass-9 route work |
| O-2 | `browser-tally.mjs` exits 1 on every throw, against its own header | S-14 (§P3-9: "the gate catches a silent return on a missing file and a swallowed load of a live target"); P6-R3 binds `seal.mjs` | **No.** The tally is a kit tool, not the gate, and P6-R3 names `seal.mjs`. Its throw reads RED, so it never passes a missing input: fail-closed, not masking. It is the same defect class, so it is cured before pass 9's critic reads it | P8-R2 owed; pass-9 route work |
| O-3 | removing `./motion-core`'s row from `src/README.md` reads GREEN on every clause | B-10 (the peer class held by its owner, P7-R1) | **No.** A removed row is a withdrawn declaration, not a missing input: B18 throws on a missing table, file or peer (cB8-R `b18-inputs.txt`), and withdrawal is a reviewed edit of `src/README.md`. A keyframes leak into motion-core still reads RED through the root's class (`extra-plants.txt` XR-drop-KF, XR-drop-leaf: B18 10) | P8-R3 owed |
| O-4 | the dist arm reads an emptied `dist/motion-core.js` GREEN | S-14's hold column ("no judge passes on a missing input"); B-10 | **No, on the narrowest margin.** The class's owner is B18 over the source arms (P7-R1); the dist arm is the probe's supplement. A build never emits an empty entry, so no real state is masked. But the hold text reads on it literally, so it is cured in pass 9 | pass-9 route work, under P8-R2 |
| O-5 | `.claude/worktrees/bl/D1/p8/B-proto/` is still present (confirmed by `ls`) | — | No | driver housekeeping, as P7-G7 |

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.** The count advances under §P2-6.5 (3).

**The closest calls, stated for the pass-9 critic.** O-2 and O-4 are the S-14 class in tools outside the gate; O-1 is a LAW sentence that the tool contradicts. This registry rules them not re-opens on the frozen texts. If the pass-9 critic finds any of them *uncured* after pass 9's route work, that is a re-open of S-14 or S-12 under the pass-9 plan's hold column, and the count restarts.

---

## P8-3 · G's re-trigger: not fired

- **The first arm fails again.** The pass 4-7 door plants regress on the pass-8 tree as before (cB8 §4, 0 differ). G's law has no kernel seal, no module-grain cycle clause, no CSS door and no peer clause.
- **The second arm has no ruling.** No ruling calls the door bytes too high; the datum moved −10 B.

G stays banked.

---

## P8-4 · Rulings: P8-R1..P8-R3, owed

P7-R1 and P7-R2 were ruled on 2026-10-08 and landed whole (cB8 §6 S-03). Three rulings are owed. None needs a chain step if each goes to its recommended arm, so the digest `05aaa6ed…` can stand into pass 9.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| **P8-R1** | the `_*` capture specs in the browser selection | (a) excluded, stated: LAW §13 names the exclusion and its reason (a capture spec writes into `docs/` and asserts no product behaviour), the selection prints the excluded moved specs, and one instrument reads a moved capture spec's imports (B16 or the floor graph resolving every `tests-visual/` import); (b) included: the run takes the 14 with their outputs redirected, and their keys enter the bar | `lib/floor.mjs:39`; LAW §13; `cB8-R/select-plant.txt` (169 program, 155 selected, 14 moved by S43b/S43c, none in `base-specs.txt`); `tsconfig.test.json` include has no `tests-visual/` | **(a).** A capture spec is a recording tool, and running it rewrites tranche records (the repo has clobbered tranche PNGs this way before). The defect is the unstated rule and the unread move, and (a) cures both without a browser re-run. The import check is the one part that might need a chain step: if B16 already reads unresolved `tests-visual/` imports, it is a LAW sentence and a plant; if not, it is a clause widening (S69 re-derived) |
| **P8-R2** | does P6-R3's exit law bind every kit judge | (a) yes: every kit judge (`browser-tally`, `browser-select`, `rekey`, `peer-closure`) exits 0/1/2 with the `seal.mjs` guard, and a degenerate input (an empty dist entry, an empty report) throws; LAW states it once; (b) `seal.mjs` only, the tools' exits recorded as they are | `browser-tally.mjs:21` vs `:26,28,36` (cB8 O-2); U4 (cB8 O-4) | **(a).** A judge whose crash reads as its own RED is the defect pass 7 re-opened in the gate. Kit tools do not land in `src` or `scripts` (`derive/land-gate.mjs` lands only `seal/` and the pin), so the cure changes no chain step and no digest |
| **P8-R3** | is the declared peer-class set pinned | (a) the pin carries each entry's declared peers, so withdrawing a class is a pin diff B11 reads; (b) `src/README.md`'s table stays the one record: a withdrawal is a reviewed source edit, B18 throws on a missing table, file or peer, and LAW §5 says so | cB8 O-3; `cB8-R/extra-plants.txt` (XR-drop GREEN; XR-drop-KF and XR-drop-leaf RED via the root, B18 10) | **(b).** The declared set is authored, not measured; the pin records what the gate measures. Pinning it puts one fact in two records, which a two-clean loop cannot converge over (one source of record, cited). A leak into motion-core still reads RED through the root's class |

---

## P8-5 · Open gaps

| id | gap | source | pass-9 disposition |
|---|---|---|---|
| P8-G1 | the critique is untracked | `git status` at this seat | the driver commits `pass-8/critique-B.md`, `pass-8/critique-B/` and this part before any pass-9 seat (S-01) |
| P8-G2 | the capture specs' exclusion is unstated, and a moved capture spec is read by nothing | cB8 O-1 | route, per P8-R1 |
| P8-G3 | `browser-tally.mjs` exits 1 on a throw | cB8 O-2 | route, per P8-R2 |
| P8-G4 | the dist arm reads an empty entry GREEN | cB8 O-4 | route, per P8-R2 |
| P8-G5 | the declared peer set is unpinned | cB8 O-3 | per P8-R3; under (b), one LAW §5 sentence |
| P8-G6 | the empty seat dir `.claude/worktrees/bl/D1/p8/B-proto/` (with `crit-tmp/`) | Bp8 §8 gap 4; `ls` | the driver removes it |
| P8-G7 | W-D.1 §0 lists five items its §5 gates require at 0 (the `fourier-field` ↔ `renderer` value cycle, `Surface` naming two symbols, bare type aliases, the `UNRELEASED` MIGRATION heading, `chartHeights`/`chartMargin`/`chartColors` in `./tokens`) that sit outside D1's frozen checklist; none is measured on the pass-8 tree in either report | `waves/W-D.1.md` §0 | the pass-9 route measures each on its tree and reports it; it adds no checklist item. An item at non-zero is W-D.1's landing work or a pass-9 ruling, stated in the convergence record |
| P7-G5 | the root's peer class is broken at the floor base (23 reviewed holds) | pass 7 | outside D1; on the tranche cursor |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; common browser failures | pass 5 | outside D1; on the tranche cursor |

Floor: no floor work is owed for pass 9. FP6-1..FP6-3, FP6-7, FP5-3, FP5-4, FP5-7 stay declared limits.

---

## P8-6 · Pass-9 plan

### P8-6.1 Routes

| route | status | pass-9 work |
|---|---|---|
| D1-B | ADVANCE | land P8-R1..P8-R3 in the kit; cure P8-G2..G5; measure P8-G7; hold all 27 items. The pass-9 critique is the second clean pass |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P8-6.2 Order

1. **Commit** the pass-8 critique and this part (P8-G1); remove the seat dir (P8-G6).
2. **Rulings.** P8-R1..P8-R3 ruled into `RULINGS.md` as one list, before the route seat.
3. **Floor.** None owed.
4. **Route.** Kit-only where the rulings allow. If P8-R1 (a) needs a clause widening, S69 and S69s are re-derived once and S69 stays the last gate step; otherwise the chain is untouched and the digest must re-read `05aaa6ed…a451e1b3`. The browser run is not repeated unless the chain changes; the tally is re-run from the committed pass-8 reports under the guarded tool. The kit and every result are committed before the critic launches (S-01).
5. **Critique.** A fresh critic who authored nothing in passes 2-9, the pass-6, -7 and -8 critics included, writes and hashes the battery before reading the kit.
6. **Pass-9 agglomeration.** If the critique re-opens nothing and maps nothing outside the list, the count reaches 2 and it writes the convergence record (§P8-6.6).

### P8-6.3 Route work

| id | build | closes or holds |
|---|---|---|
| route · capture | per P8-R1 (a): LAW §13 states the `_*` exclusion and its reason; `browser-select.mjs` prints the excluded moved specs; a moved capture spec's imports are read (B16 or the graph); if a clause widens, `seal.test.ts` carries the RED case | S-12 |
| route · exits | per P8-R2 (a): `browser-tally`, `browser-select`, `rekey` and `peer-closure` install the `seal.mjs` guard first and load their work after it; 0/1/2 in LAW once; the dist arm and the tally throw on an empty entry or an empty report | S-14 |
| route · peer set | per P8-R3 (b): LAW §5 states that `src/README.md`'s table is the one record of declared classes and that withdrawal is a reviewed source edit | B-10 |
| route · W-D.1 | measure P8-G7's five items on the pass-9 tree and report each (count, file:line) | none (formation input) |

### P8-6.4 What pass 9 must prove

§P7-6.4's bar, re-met: the chain replays to one digest (`05aaa6ed…` if unchanged), rerun a no-op; 19 clauses at 0 (or 19 with the widened one at 0); verify:package CLEAN at 2,920,391 (or rebound once if a gate step changes shipped bytes, which `scripts/` does not); cascade GREEN against the floor base; 428/428 base-green held, re-derived from committed reports; `./motion-core` keyframes-free on all three arms.

**The battery must plant:**
- a throw in each kit judge (missing, non-JSON and wrong-schema inputs; no arguments): each exits 2;
- an emptied dist entry and an empty route report: each exits 2;
- a moved `_*` capture spec with a broken import: read RED (P8-R1 (a));
- the declared-row withdrawal (XR-drop) and its two leak variants, read as P8-R3 rules;
- crash8's 37 and the 24-module closure re-run against pass 9's `seal/`;
- regressions: the pass-8 critic's battery (`c3953aab…`), the 381 rows, and pass 4-8's batteries.

### P8-6.5 Convergence criterion

§P2-6.5 unchanged. The checklist is §P3-9's 27 items, frozen. **B's two-clean-passes count is 1.** The pass-9 critique moves it to 2, and D1-B converges, if it re-opens nothing and maps no finding to an edict clause the list leaves out. Any re-open restarts the count at 0. The hold column of §P8-7 states what the pass-9 critic reads; an uncured P8-G2..G4 after pass 9's route work is a re-open.

### P8-6.6 What the convergence record will carry (written at pass 9 if the count reaches 2)

- **the converged route:** D1-B, sealed modules, flat, with LAW, gate (19 clauses), pin and floor rows as committed in pass 9's kit;
- **its chain digest:** the pass-9 replay's (expected `05aaa6ed…a451e1b3`);
- **the one rebound datum:** `.bundle-ratchet` 2,920,391 (S70), unless pass 9 rebinds it;
- **the rulings it rests on:** R-1..R-10 as amended, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2, P8-R1..P8-R3;
- **what passes to wave formation:** W-D.1 (W-COLOCATION and the placement seal, F-55..F-59, `waves/W-D.1.md`) lands the converged kit by replay; W-D.2 (W-PERIPHERY, F-60, `waves/W-D.2.md`) follows on the shape W-D.1 fixes; W-D.1 §0's five items with pass 9's measurements (P8-G7). `waves/INDEX.md:47` names W-D.1 as D1's one loop wave; its stale citations (`pass-4/B-kit/LAW.md`, digest `472cf493…`) re-point to pass 9's kit;
- **what stays held:** D1-G, D1-D′, D1-C/E/F banked and D1-A blocked, with G-01..G-12 and D′'s gaps; P7-G5 (the root's peer class), P5-G3, P5-G5, P5-G8 on the tranche cursor; the declared limits FP6-1..3, FP6-7, FP5-3/4/7.

---

## P8-7 · Open gaps, enumerated (the pass-9 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 8.

| item | pass-8 critic | entering pass 9 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the pass-8 critique committed (P8-G1); the pass-9 kit and results committed before judgment |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P7-R2 on their arms; P8-R1..P8-R3 ruled and landed; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | gate at 0 on every clause |
| S-09 | CLOSED | CLOSED | replay idempotent, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN listed, RED unlisted |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | every base-green key accounted for; the capture exclusion stated and a moved capture spec read (P8-R1) |
| S-13 | CLOSED | CLOSED | — |
| S-14 | **CLOSED (was OPEN)** | CLOSED | B17 0; every gate throw exits 2, import time included; every kit judge exits 2 on a throw or a degenerate input (P8-R2) |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | regressions identical |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | residual names on the ruled arms; the peer class owned by B18, its declared set ruled (P8-R3) |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 9:** 27 items, 27 closed, 0 open. Two-clean-passes count: **1**.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 8. D1-B converges at the pass-9 agglomeration if the pass-9 critique re-opens nothing.

---

# D1 · pass 9 · REGISTRY: the route after pass 9

| field | value |
|---|---|
| seat | D1 pass-9 agglomeration. Closes pass 9 with B's status and convergence, the two-clean-passes count, G's re-trigger, the rulings owed, the open gaps and the pass-10 plan. Passes 1-8 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `6120c12f`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code. The kit was committed at `b06cacc3` before the critic's battery hash; the critique is committed at `6120c12f` (524 tracked files under `pass-9/`). `pass-9/B-kit/gate/` is byte-identical to pass 8's (`diff -rq`) |
| inputs, read in full | `pass-9/B-proto.md`, `pass-9/critique-B.md`, `critique-B/BATTERY-HASH.txt`; this file §P2-6.5, §P2-7, §P3-9 (S-14's text), §P8-0..§P8-7; `RULINGS.md` through P8-R3; `waves/W-D.1.md` §0-§5, `waves/INDEX.md:47`. The kit's other files and the critic's other results were read at the lines the two reports cite, not re-run |
| instruments | none re-run. Read-only checks: `git log`, `git ls-files pass-9`, the empty code diff; `B-kit/tools/peer-closure.mjs:45,77-78` (the `--base` read and its `??` default); `B-kit/gate/peer.mjs:24-41` (`declaredClasses`: a line with no token after the subpath is skipped by `continue`); `B-kit/LAW.md:168-170` (§5: "a row with no peer … is a throw") and `:403-413` (§14: "a report of another schema" is a throw); `cB9-R/extra9.txt:43-52` (PX lines) and `:19-21` (BI3-fixed rc 0); `ls .claude/worktrees/bl/D1/{p8,p9}/` |
| fences | no source edit, no git write; this part is the only write |

Short citations: `Bp9` is `pass-9/B-proto.md`, `cB9` is `pass-9/critique-B.md`, `cB9-R` is `pass-9/critique-B/results/`, `K9` is `pass-9/B-kit/`.

---

## P9-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | re-opened by this registry | reason in one line |
|---|---|---|---:|---|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 27/27 = 100% | ADVANCE (second clean pass) | 0 | **1 (S-14)** | every §P8-6.4 bar item re-met from committed bytes (`05aaa6ed…a451e1b3`, 19/19, CLEAN at 2,920,391, cascade GREEN, 428/428); P8-G2..G4 cured; but S-14's hold column fails on one kit judge, which reads a leak GREEN through a `??` default |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | — | re-trigger not fired (§P9-3) |

**The two-clean-passes count for B restarts: 1 → 0.** This registry re-opens S-14 on cB9 O-1 (§P9-2). **No convergence record is written.** The earliest convergence is the pass-11 agglomeration: a clean pass-10 critique, then a clean pass-11 critique.

Why this registry departs from the critic's verdict, in one paragraph. The critic applied the task's rule "re-open only on its own text" and left the call to this seat (cB9 §5, "the closest calls"). §P8-6.5 named the §P8-7 hold column as "what the pass-9 critic reads", and S-14's hold column reads "every kit judge exits 2 on a throw or a degenerate input (P8-R2)". §P8-6.4's battery named the input in advance: "missing, non-JSON and **wrong-schema** inputs" for each kit judge. The route planted wrong-schema on two of the four judges (Bp9 §1, §5 JUDGE). The critic planted it on the third: `peer-closure.mjs` exits 1 on `--base {}`, and exits **0 GREEN on a tree that leaks keyframes.js into `./motion-core`** when its own non-floor report is passed back as `--base` (`cB9-R/extra9.txt:49`; the gate reads the same tree B18 27, `:50`). The cause is `K9/tools/peer-closure.mjs:77`, `base?.entries?.[key]?.broken ?? { names: [], dist: [], files: [] }`: a fallback that turns a malformed base into "no breaks at the base". That is S-14's own title, "No masking fallback", in a judge the hold column names, on an input the plan named. It is a measured hold failure, not an item a critic minted. §P2-6.5 (1) requires each item closed by a measurement; S-14's is not.

Three findings shape pass 10.

1. **P8-R2 landed short by one input, and LAW §14 says otherwise.** The probe's `--base` is read without a schema check (O-1). LAW §14 lists "a report of another schema" as a throw. The cure is kit-only and changes no digest.
2. **B18 reads a peer-less declaration row as no row** (cB9 O-2). `gate/peer.mjs`'s row regex needs a token after the subpath, so the line falls through `continue`. LAW §5 (`K9/LAW.md:168-170`) and P8-R3's ruled text say a row with no peer is a throw. The effect equals a withdrawal, which P8-R3 (b) accepts, and a leak still reads RED through the root's class, so it re-opens nothing on its own (pass-8 precedent for a LAW sentence the reader contradicts). It is cured in pass 10 under P8-R3 as ruled; the cure is in `gate/`, so S69 and S69s are re-derived.
3. **W-D.1 §0's five items are all non-zero on the pass-9 tree** (Bp9 §6). Three are W-D.1's own named edits (§P9-5). Two are attributed by W-D.1 to the chain itself: the `fourier-field` ↔ `renderer` cycle (W-D.1 §3 step 4: "cured by the base rule") and the chain's `## UNRELEASED — the structure cut (BL)` heading (W-D.1 D1-G10: "RED on the chain's own text"). The converged chain cannot hand W-D.1 a gate it fails by construction. Two rulings are owed (P9-R1, P9-R2).

---

## P9-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-10 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel and CSS edges included (B1, B3); direction (B8); sibling acyclicity (B4); no masking fallback (B17); names (B15); Playwright-program membership and visual subject (B16); the peer class (B18) | ADVANCE | 100% by its critic; 26/27 by this registry (S-14 re-opened) | — | the one live route; first of two clean passes |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P9-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P9-2 · D1-B · Sealed modules, flat: ADVANCE

**What ran** (Bp9 §0-§8, confirmed by cB9 §0-§4).

| item | result |
|---|---|
| chain | untouched: `frozen/`, `gate/`, `derive/`, `authored/` byte-identical to pass 8's. No clause widened; P8-R1's import read is B0's existing arm. S69 stays the last gate step; S70 not rebound |
| replay | `05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3` over 1,585 files. Route: r1 (resumed from S2-3's recorded digest after a guard timeout), r2 `--twice` 469.1 s, r3 300.0 s, all MATCH. Critic: 313.8 s from `b06cacc3` in a fresh worktree (floor by S1's own script, then S1b→S70), rerun 0.5 s no-op, unchanged after every battery |
| floor base | `5b14c6c7…705402f` over 1,354 files, both seats |
| gate | 19/19 at 0, exit 0; files 1,583, edges 8,347, modules 141/141, pin 141/121/1,289/2, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` 24/24; vitest 2,333 passed, 0 failed, `--maxWorkers=2`, both seats |
| package | verify:package CLEAN at 2,920,391, not rebound |
| cascade | GREEN against the floor base (`./styles` 28 moved, `./styles.css` 10); RED unlisted (critic) |
| browser | not re-run (chain unchanged, §P8-6.2 step 4). 428 base-green, 428 held, 0 failed, 0 absent, re-derived from committed reports by both seats; the pass-9 tally byte-identical to pass 8's; blob D2 flaky out of the bar. T1-T4 PASS; P7-R2 case lines identical (with `testDir "."` added to pass 8's fixtures, which the pass-9 tally rightly refuses without it) |
| capture specs (P8-R1 (a)) | LAW §13 states the exclusion and reason; `browser-select` prints all 14 touched capture specs `EXCLUDED`; B0 reads a moved capture spec's broken import RED, 14/14 plus a stale-path plant, controls clean (cB9 §2) |
| kit exits (P8-R2 (a)) | four judges guarded; 44 PASS / 1 FAIL hashed (cB9 §1): `browser-tally` 11/11, `rekey` 6/6, `browser-select` 5/5, `peer-closure` 7/8 (wrong-schema `--base` exits 1). Import-time throws 11/11 exit 2. U4 (an emptied `dist/motion-core.js`) now 2: P8-G4 cured |
| peer set (P8-R3 (b)) | LAW §5 sentence landed; XR-drop reads a withdrawal; XR-drop-KF B18 10 + B11 2; XR-drop-leaf B18 10. A blank Peer cell reads 0 (O-2) |
| `./motion-core` | keyframes-free on names 55, dist 5 files, files 38 |
| regressions | the pass-8 critic's 402 rows (381 plants with controls, passes 4-7 inside): 0 differ. crash8 37/37 on pass 9's `seal/`; pass-8 peer plants 11/11; pass-7 tree probes identical |

**The critic's items** (cB9 §6): 27 CLOSED, 0 re-opened.

**The critic's outside findings** (cB9 §5), read under §P2-6.5 and §P8-6.5.

| # | finding | item it maps to, and the text that decides | does it re-open? | effect |
|---|---|---|---|---|
| O-1 | `peer-closure.mjs --base` takes any JSON: `{}`, `[]`, `{"entries":{}}` or a browser report exit 1; the probe's own non-floor report as `--base` reads a leaking tree GREEN, exit 0 | **S-14**, title "No masking fallback"; §P8-7 hold "every kit judge exits 2 on a throw or a degenerate input (P8-R2)", which §P8-6.5 named as what the pass-9 critic reads; §P8-6.4 battery "wrong-schema inputs" for each kit judge; LAW §14 "a report of another schema" | **Yes.** The hold fails on an input named before the pass, in a judge the hold names, by a `??` default that converts a malformed input into an all-clear. The critic's three reasons for not re-opening are answered: the own-text rule decides whether a *new* finding adds an item, while a closed item's hold column decides whether it is still held, and §P8-6.5 made that column binding for this pass; the "uncured P8-G2..G4" sentence names one sufficient trigger, not the only one; "no caller passes a wrong-kind base" is the argument a masking fallback always rests on, and the item exists to refuse it | **S-14 re-opened; the count restarts at 0.** Route work under P8-R2, no new ruling |
| O-2 | B18 reads a row with a blank Peer cell as no row, seal exit 0 | B-10's hold (P8-R3); LAW §5 `:168-170` | **No.** Its effect equals XR-drop, which P8-R3 (b) rules acceptable as a reviewed edit, and a leak still reads RED through the root's class (XR-drop-leaf). It is pass 8 O-1's shape (a LAW sentence the reader contradicts), which pass 8 ruled not a re-open on first sighting | route work under P8-R3 as ruled (the reader throws); `gate/peer.mjs` changes, so S69 and S69s are re-derived and `seal.test.ts` carries the RED case. If the pass-10 critic finds it uncured, B-10 re-opens |
| O-3 | W-D.1 §0's five items all non-zero | none of the 27; W-D.1 §0 and §5 gates; the clean-break "no aliases" (covered at the door grain by B-02, R-6) | **No.** §P8-5 ruled them formation input with no checklist item | disposition per item, §P9-5; P9-R1, P9-R2 owed |
| O-4 | `.claude/worktrees/bl/D1/p8/B-proto/` still present (P8-G6 not done); `p9/` empty | — | No | driver housekeeping (P9-G5) |

**The critic's own defects** (cB9 §7): four battery locator or invocation errors (XR and BI3 cell locator, an unset `PEER_CMD`, fixtures without `testDir`, the root entry's file name), each re-run post-hash with the expectation unchanged. This registry accepts the post-hash re-runs: none changes a hashed expectation, and O-1's decisive lines (`extra9.txt:44-50`) are additions the hashed `judge-throws.sh` P-base-schema row already showed in kind (exit 1 on `{}`).

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.**

---

## P9-3 · G's re-trigger: not fired

- **The first arm fails again.** The pass 4-8 plants regress on the pass-9 tree with 0 differ (cB9 §4). G's law has no kernel seal, module-grain cycle clause, CSS door or peer clause.
- **The second arm has no ruling.** The datum did not move.

G stays banked.

---

## P9-4 · Rulings: P9-R1..P9-R2, owed

P8-R1..P8-R3 were ruled on 2026-10-15 and landed, P8-R2 short by O-1 and P8-R3 short by O-2; both shortfalls are cured under the existing rulings, so neither needs a new one. Two rulings are owed, both from W-D.1 §0 items the wave attributes to the chain. Pass 10 changes the chain anyway (O-2's gate cure), so either can land in the same re-derivation.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| **P9-R1** | who cures the `fourier-field` ↔ `fourier-field/renderer` parent↔child value cycle | (a) the loop: B4 widens from siblings to every module-grain value SCC, parent↔child included, and a chain step applies LAW §4's base rule (the parent-level file the child value-reads, `fourier-field/math.ts`, moves into a sibling module inside the `./fourier-math` anchor); `seal.test.ts` carries the RED case; (b) W-D.1: its §3 step 4 is re-worded as a named edit beyond the chain, and the seal stays sibling-only; (c) held with G-12 in G's bank, and W-D.1's D1-G3 `VALUE-SCC 0` gate is amended to except it | Bp9 §6 item 1 (`renderer/mint.ts:21` → `fourier-field/math.ts`; reverse `FourierField.vue:14`, `useFourierField.ts:31`, `index.ts:2`); W-D.1 §1 F-59 ("value-SCC count to 0 at module grain, parent↔child included"), §3 step 4 ("cured by the base rule"); LAW §8 (B4 judges siblings only) | **(a).** The seal lands as G-42 and is the edict's enforcement after the wave. A seal that passes a parent↔child cycle cannot hold F-59 after landing, so W-D.1's gate would be held by a probe nothing re-runs, the defect P7-R1 cured for the peer class. One clause widening and one move, inside the re-derivation pass 10 already owes |
| **P9-R2** | who writes the chain's MIGRATION heading | (a) the chain: the MIGRATION row writes `## 11.0.0` in W-C.2's form, no tranche id; `MIGRATION.md` ships, so S70's datum is re-measured and rebound once (P4-R3); (b) W-D.1 rewrites the heading at landing, and its D1-G10 stays RED on the converged chain's own text until then | Bp9 §6 item 4 (`MIGRATION.md:8`, the one heading the chain adds; 9 lines name `BL` or "tranche"); W-D.1 §4 (`MIGRATION.md`: one `## 11.0.0` section), D1-G10, §3 step 1 ("nothing is edited by hand"); `package.json` `files` includes `MIGRATION.md` | **(a).** The chain authors shipped text; a converged chain that writes a tranche id into a shipped file hands the wave a gate it fails by construction and a hand edit its step 1 forbids. The 9 `BL`/"tranche" lines go in the same row |

**Items 2, 3 and 5 need no ruling.** W-D.1 names each as its own edit beyond the chain (§3 step 5: `Surface` means the component, the axis type is `SurfaceDecoration`, the 5 bare aliases deleted; §3 step 7: the chart preset leaves `./tokens`; §4 lists the files). The convergence record carries them as W-D.1's landing work with pass 9's counts.

---

## P9-5 · Open gaps

| id | gap | source | pass-10 disposition |
|---|---|---|---|
| P9-G1 | **S-14 re-opened:** the probe reads a degenerate `--base` as a verdict, and GREEN over a leak under a wrong-kind base | cB9 O-1; `K9/tools/peer-closure.mjs:45,77-78` | route: `--base` must be the probe's own floor-base report (`floorBase === true`, `entries` an object holding every declared entry), else throw; the two `??` defaults go. A sweep of all four judges for any `??`/`||` default over a report field, each found one a throw or a stated, planted reason |
| P9-G2 | B18 skips a peer-less declaration row | cB9 O-2; `K9/gate/peer.mjs:31-32` | route under P8-R3: a line naming a `@mkbabb/glass-ui/<sub>` in the table block with no peer token throws; S69, S69s re-derived; `seal.test.ts` RED case |
| P9-G3 | the parent↔child value cycle | Bp9 §6 item 1 | per P9-R1 |
| P9-G4 | the chain's `UNRELEASED`/`BL` MIGRATION heading | Bp9 §6 item 4 | per P9-R2 |
| P9-G5 | `.claude/worktrees/bl/D1/p8/B-proto/` (P8-G6, not done) and the empty `p9/` | cB9 O-4; `ls` at this seat | the driver removes both before the pass-10 route seat |
| P9-G6 | W-D.1 and `waves/INDEX.md:47` cite the pass-4 kit and digest `472cf493…` | §P8-6.6 | re-pointed when D1 converges, to the converged pass's kit and digest |
| P7-G5 | the root's peer class broken at the floor base (23 reviewed holds) | pass 7 | outside D1; on the tranche cursor |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; common browser failures | pass 5 | outside D1; on the tranche cursor |

Floor: none owed. FP6-1..FP6-3, FP6-7, FP5-3, FP5-4, FP5-7 stay declared limits.

---

## P9-6 · Pass-10 plan

### P9-6.1 Routes

| route | status | pass-10 work |
|---|---|---|
| D1-B | ADVANCE | close S-14 (P9-G1); land P8-R3's reader (P9-G2); land P9-R1 and P9-R2 on their ruled arms; re-derive S69, S69s and, under P9-R2 (a), S70. The pass-10 critique is the first of two clean passes |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P9-6.2 Order

1. **Housekeeping** (P9-G5). This part is committed by the driver before any pass-10 seat (S-01).
2. **Rulings.** P9-R1 and P9-R2 ruled into `RULINGS.md` as one list, before the route seat.
3. **Floor.** None owed.
4. **Route.** Kit first (P9-G1, no digest change), then the chain: the P9-R1 move step (if (a)) where the base rule places it, the P9-R2 MIGRATION row (if (a)), `gate/peer.mjs` and the B4 widening landed by S69, S69s re-pinned, S70 re-measured. S69 stays the last gate step and S70 the one rebind. The new digest is replayed from three fresh worktrees, one `--twice`. **Browser:** if P9-R1 (a) moves a `src` file, `browser-select` re-derives the selection; every selected spec whose closure the move touches runs on the route tree under the guard (`--workers=1`) and the tally re-derives 428 against the committed base report; if no selected spec is touched, the committed reports stand and the tally is re-run. The kit and every result are committed before the critic launches.
5. **Critique.** A fresh critic who authored nothing in passes 2-10, the pass-6..9 critics included, writes and hashes the battery before reading the kit.
6. **Pass-10 agglomeration.** If the critique re-opens nothing and maps nothing outside the list, the count reaches 1.

### P9-6.3 Route work

| id | build | closes or holds |
|---|---|---|
| route · base schema | P9-G1: the probe's `--base` contract checked before use; the `??` defaults at `:77-78` removed; LAW §14 unchanged in substance (it already says so); the four judges swept for report-field defaults, each result listed in Bp10 | S-14 |
| route · peer-less row | P9-G2: B18 throws on a peer-less row; LAW §5 unchanged in substance; `seal.test.ts` gains the RED case | B-10, S-14 |
| route · parent↔child | P9-R1 on its ruled arm; under (a), B4's text in LAW §8 widens, the SCC reads 0, and W-D.1's `d1-probe.mjs` VALUE-SCC reads 0 on the route tree | S-03 (ruled and landed) |
| route · MIGRATION | P9-R2 on its ruled arm; under (a), W-C.2's C2-G1 and C2-G4 run over the route tree's `MIGRATION.md` and read 0 | S-03 |
| route · W-D.1 | re-measure W-D.1 §0's five items on the pass-10 tree (`tools/wd1/measure.mjs`), with file:line | none (formation input) |

### P9-6.4 What pass 10 must prove

§P8-6.4's bar, re-met on the new chain: the chain replays to one new digest, rerun a no-op; 19 clauses at 0 (B4 widened under P9-R1 (a)); verify:package CLEAN at the datum rebound once at S70; cascade GREEN against the floor base; 428/428 base-green held; `./motion-core` keyframes-free on all three arms; `seal.test.ts` with the new RED cases.

**The battery must plant:**
- for every input argument of every kit judge: missing, non-JSON, wrong-schema (`{}`, `[]`, an object of another report kind), and a report of the right schema but the wrong kind (a non-floor report as `--base`): each exits 2;
- a leak in `./motion-core` with each degenerate `--base`: never 0;
- a peer-less declaration row, a whitespace-only Peer cell, and a row naming no subpath: each exits 2;
- under P9-R1 (a): a parent↔child value cycle in another unit read B4 RED, a type-only reverse edge read clean;
- under P9-R2 (a): a tranche id written into the chain's MIGRATION text read RED by C2-G1;
- regressions: the pass-9 critic's battery (`748826fb…`), the 402 rows, crash8, and passes 4-9's batteries.

### P9-6.5 Convergence criterion

§P2-6.5 unchanged; the checklist is §P3-9's 27 items, frozen. **B's two-clean-passes count is 0.** The pass-10 critique moves it to 1 and the pass-11 critique to 2 if each re-opens nothing and maps no finding to an edict clause the list leaves out. A closed item whose §P9-7 hold column fails on the critic's measurement is re-opened, as S-14 was here.

### P9-6.6 What the convergence record will carry (written at pass 11 if the count reaches 2)

As §P8-6.6, with: the digest of the pass-10 chain (and pass 11's replay of it); the datum S70 rebinds under P9-R2 (a); the rulings through P9-R2; W-D.1 §0's five items with the last measurement and their dispositions (items 1 and 4 per P9-R1 and P9-R2, items 2, 3 and 5 as W-D.1 §3 steps 5 and 7); P9-G6's re-pointing of W-D.1 and `waves/INDEX.md:47`.

---

## P9-7 · Open gaps, enumerated (the pass-10 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 9.

| item | pass-9 critic | entering pass 10 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | this part committed; the pass-10 kit and results committed before judgment |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P8-R3 on their arms, P8-R2 and P8-R3 landed in full (P9-G1, P9-G2); P9-R1, P9-R2 ruled and landed; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | gate at 0 on every clause |
| S-09 | CLOSED | CLOSED | the new digest replayed idempotently, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN listed, RED unlisted |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | every base-green key accounted for; capture exclusion stated, printed, and a moved capture spec read by B0 |
| S-13 | CLOSED | CLOSED | — |
| S-14 | CLOSED | **OPEN (re-opened by this registry)** | B17 0; every gate throw exits 2, import time included; every kit judge exits 2 on a throw or a degenerate input on **every input argument**, a wrong-schema or wrong-kind report included; no judge reads a malformed input as an all-clear |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | regressions identical |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | the peer class owned by B18; its declared set ruled (P8-R3) and its reader throwing on a peer-less row (P9-G2) |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 10:** 27 items, 26 closed, 1 open (S-14). Two-clean-passes count: **0**.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 9. D1-B converges at the pass-11 agglomeration at the earliest.

---

# D1 · pass 10 · REGISTRY: the route after pass 10

| field | value |
|---|---|
| seat | D1 pass-10 agglomeration. Closes pass 10 with B's status and convergence, the two-clean-passes count, the rulings owed, the open gaps and the pass-11 plan. Passes 1-9 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `1d0f542c`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code. The kit was committed at `aa46420a` (06:44:48Z), before the critic's battery hash (06:52:45Z); the critique is committed at `1d0f542c` (625 tracked files under `pass-10/`). Between `aa46420a` and `1d0f542c` nothing under `structure/` changed except `pass-10/critique-B*` |
| inputs, read in full | `pass-10/B-proto.md`, `pass-10/critique-B.md`, `critique-B/BATTERY-HASH.txt`; this file §P2-6.5 and the pass-9 part (§P9-0..§P9-7); `RULINGS.md` through P9-R2. The kit's other files and the critic's other results were read at the lines the two reports cite, not re-run |
| instruments | none re-run. Read-only checks: `git log`, `git ls-files`, the empty code diff; `critique-B/results/judges10.txt:33,35,55,56,70,117,130` (the seven FAIL rows); `K10/tools/browser-tally.mjs:40,56,68` (the only kind test is `testDir` equality); `K10/tools/rekey.mjs:31,34,48` (it refuses `rekeyedFrom`, nothing else of kind); `K10/lib/floor.mjs:27` (`arg` returns `args[i+1]`, `undefined` for a trailing flag); `K10/tools/peer-closure.mjs:72-76,133`; the kind fields of every committed browser report under `K10/results/p10/browser*` (below); `K10/authored/p10-engine-dot-lead.mjs`; `floor/lib/move.mjs:168`; `waves/W-D.1.md:92,144-219`, `waves/INDEX.md:47`; `ls .claude/worktrees/bl/D1/` |
| fences | no source edit, no git write; this part is the only write |

Short citations: `Bp10` is `pass-10/B-proto.md`, `cB10` is `pass-10/critique-B.md`, `cB10-R` is `pass-10/critique-B/results/`, `K10` is `pass-10/B-kit/`.

---

## P10-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | re-opened by this registry | reason in one line |
|---|---|---|---:|---|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 26/27 = 96.3% | S-14 OPEN, the rest CLOSED | 0 (S-14 was open entering) | 0 | every other bar item re-met from committed bytes (`6fdd4ec7…`, 127 steps, 19/19, CLEAN at 2,920,386, cascade GREEN, 428/428, `seal.test.ts` 26/26); P9-G1, P9-G2, P9-R1 (a), P9-R2 (a) landed and measured; but `browser-tally` and `rekey` accept wrong-kind reports, two of them as an all-clear |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | — | re-trigger not fired (§P10-3) |

**The two-clean-passes count for B stays at 0.** No convergence record is written. The earliest convergence is the pass-12 agglomeration: a clean pass-11 critique moves the count to 1, a clean pass-12 critique to 2.

Why the count does not advance. The task's rule reads "advances by 1 iff the pass-10 critique re-opens nothing and maps no finding to an edict clause the list leaves out". The critique re-opened no item that entered closed, but it did not leave S-14 closed: the route claimed S-14 closed (Bp10 §8) and the critic's measurement refutes the claim on the hold column §P9-7 wrote for it. §P2-6.5 decides the reading in two places. Its convergence condition 1 ("zero items remain open, each closed by a committed, replayable measurement") fails at the end of pass 10, and its third bullet says a finding that "maps to a listed item … re-opens convergence … and the two-clean-passes count restarts". O-1 and O-2 map to S-14. A pass that ends with an open item cannot be the first of two clean passes. The count was 0 and restarts at 0.

Three findings shape pass 11.

1. **P9-G1 is cured; S-14's hold is wider than P9-G1.** The probe's `--base` contract holds on 18 forms and the leak reads never 0 on 20 (cB10 §1). The hold also names "a wrong-kind report" on every input argument of every judge, and §P9-6.4 put it in the battery. `browser-tally --base <a route report>` exits 0 GREEN, `--route <the re-keyed base>` exits 0 GREEN, and `rekey <a route report>` exits 0 and writes a "re-keyed base" that the tally then reads GREEN against a failing route (cB10 §1 F6: RED with 2 failed against the real base, GREEN with 0 failed through either wrong-kind path). That is pass 9's O-1 again, in the other two judges. The cure is kit-only and changes no digest.
2. **The critic's proposed discriminant is half right, and the committed reports say which half.** A route report records `baseReport`, but a route **rerun** does not: `browser-p9/reruns/route-1-{1,2,3}.json` carry `baseReport: null` and `testDir "."`, the same as a re-keyed base apart from `rekeyedFrom`. Only `rekeyedFrom` separates the kinds in every committed report: present on every re-keyed base (`base-rekeyed.json`, `base-1-*.rekeyed.json`, `p10-steps/base.rekeyed.json`), absent on every route run and rerun. A `baseReport` test would refuse nothing on the rerun arguments. §P10-6.3 sets the cure on `rekeyedFrom` and `testDir`.
3. **S74c changes the landed floor engine; the docs floor keeps the old line** (Bp10 G-1, cB10 O-5). The two copies of the move engine disagree, and FLOOR.md F-2 agrees with the landed one. It maps to no checklist item and to no edict clause (the docs floor is a record, not shipped code), so it does not touch the count. Where the cure sits changes the floor base digest, so it is a ruling (P10-R1).

---

## P10-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-11 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel and CSS edges included (B1, B3); direction (B8); acyclicity: sibling, and every module-grain value SCC parent↔child included (B4, P9-R1); no masking fallback (B17); names (B15); Playwright-program membership and visual subject (B16); the peer class (B18) | ADVANCE | 26/27 by its critic and by this registry | — | the one live route; close S-14, then the first of two clean passes |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P10-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P10-2 · D1-B · Sealed modules, flat: ADVANCE

**What ran** (Bp10 §0-§9, confirmed by cB10 §0-§4).

| item | result |
|---|---|
| chain | 121 → 127 steps. S74 (P9-R1 (a): `fourier-field/math.ts` → `fourier-field/register/math.ts`); S74b-S74e (the second module-grain SCC, `scripts/structure/lib` ↔ `lib/graph`: S74b an F-1 self-path respelling, S74c the landed engine's `./` lead, S74d five `lib/*` files → `lib/tree/`, S74e its door); S75 (P9-R2 (a): `## 11.0.0`, the 8 other tranche lines re-worded); S69 re-landed (B4's reader `seal/cycles.mjs`, `peer.mjs`, `clauses.mjs`, `seal.test.ts` 26 cases, the pin 142/122/1,320/2); S69s re-recorded; S70 rebinds once |
| replay | `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files. Route: r1 `--twice` 637.0 s, r2 430.1 s, both MATCH from fresh HEAD worktrees, rerun no-op 1.0 s. Critic: 348 s from committed bytes in a fresh worktree (floor by S1's own script, then S1b→S70), MATCH, rerun 0.4 s no-op, unchanged after every battery |
| floor base | `5b14c6c7…705402f` over 1,354 files, both seats, pass 9's |
| gate | 19/19 at 0, exit 0; files 1,585, edges 8,350, modules 142/142, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` 26/26; vitest 2,335 passed, 0 failed, `--maxWorkers=2`, both seats |
| package | verify:package CLEAN at 2,920,386; only S70 writes `.bundle-ratchet` (2,919,057 → 2,920,386) |
| cascade | GREEN against the floor base (listed); RED unlisted (critic) |
| browser | selection 155 specs = pass 9's, 14 captures excluded; the 8 specs pass 10's steps touch ran on both trees (63 tests each, identical statuses, 0 new failures); tally 428 base-green, 428 held, 0 failed, 0 absent, by the kit tally and by the critic's own reader, with and without the pass-10 pair; blob D2 flaky out of the bar |
| P9-R1 (a) | B4 module arm: parent↔child, grandparent↔grandchild, an existing parent→child edge closed by one child file, and the parent's door already reading the child, each RED; the type-only reverse edge clean (critic PD-type 3/3, route CYCLE 4/4); the tree B4 0; W-D.1's `d1-probe` VALUE-SCC 0 |
| P9-R2 (a) | `MIGRATION.md:8` is `## 11.0.0`; W-C.2's C2-G1 0 META in the chain's section, C2-G4 0 misses; four tranche-id plants RED (critic, by W-C.2's own appendices extracted from the committed wave) |
| P8-R3 / P9-G2 | a peer-less row, a whitespace Peer cell and a subpath-less row throw (critic 6/6, route ROW 13/13, BI3-fixed rc 2) |
| P8-R2 / P9-G1 | the probe's `--base` 18/18 exit 2; the leak 20/20 never 0; `--overlay`, `--table`, `--root` 15/15; `browser-tally` 48/48 on schema-level inputs; `rekey` 17/17; `browser-select` 16/16; gate import-time throws crash8 39/39 |
| `./motion-core` | keyframes-free on names 55, dist 5 files, files 38 |
| regressions | the 402 rows 0 differ; pass 8's 11 peer plants 0 differ; pass 9's hashed judge-throws 45/45 (pass 9: 44/45); pass 7's tree probes identical once pass 6's `fd4-probe.mjs` is re-pointed at `lib/tree/tree.mjs` (S74d moved its import; cB10 §4 F4, all arms PASS) |

**The critic's items** (cB10 §6): 26 CLOSED, S-14 OPEN, 0 re-opened.

**The critic's findings** (cB10 §5), read under §P2-6.5.

| # | finding | item it maps to, and the text that decides | effect |
|---|---|---|---|
| O-1 | `browser-tally` reads a route report as `--base` (430 held, GREEN) and the re-keyed base as `--route` (429 held, GREEN); a route rerun as `--base-rerun` reads as a verdict (0) and a re-keyed base rerun as `--route-rerun` reads as a verdict (1); `rekey` takes a route report as its base and writes a "re-keyed base" (exit 0). F6: a route with one base-green test failing reads GREEN through either path | **S-14**: §P9-7 hold "a wrong-schema or wrong-kind report included; no judge reads a malformed input as an all-clear"; §P9-6.4 battery "a report of the right schema but the wrong kind … each exits 2" for every input argument of every judge | **S-14 stays OPEN.** Route work under P8-R2 as ruled (P10-G1); no ruling. The route's INPUT group planted the tally's wrong kind only as a `testDir` mismatch (Bp10 §5), which the tally already refuses; the right-schema, same-`testDir`, wrong-kind case was not planted |
| O-2 | `peer-closure --base` with no value exits 1 (read as no `--base`); `--table` with no value exits 0 (falls through `?? PEER_TABLE`) | **S-14** ("every input argument") | part of S-14's open state (P10-G2). By `K10/tools/peer-closure.mjs:76,133` the same reading covers `--overlay` (no value → no overlay) and `--json` (no value → no write); neither is planted yet. The route's §1 sweep listed `?? PEER_TABLE` as "an absent option's stated default"; the option here is present and its value is missing, which the sweep did not separate |
| O-3 | W-C.2's C2-G1 grammar reads a bare `(BL)` and the word "tranche" as 0 | none of the 27; the chain's text carries neither (critic MG2 0, route 0 lines) | none. Formation input for W-C.2 (P10-G5). The route's own `tools/wc2/chain-text.mjs` reads a bare `(BL)` RED (Bp10 §5 MIGR), so the two detectors differ on it |
| O-4 | W-C.2's appendix A dies on this repo: `git ls-files` exceeds `execFileSync`'s default 1 MB buffer (ENOBUFS, `waves/W-C.2.md:114`), and on an uncommitted migrated tree it reads paths the chain moved away (ENOENT) | none of the 27; W-C.2's gate | none. Formation input for W-C.2 (P10-G5) |
| O-5 | S74c edits the landed engine (`scripts/structure/lib/move.mjs:168`); `floor/lib/move.mjs:168` keeps the old line | none of the 27 (S-08's hold, the gate at 0, is met); no edict clause (a record) | none on the count; **P10-R1** |
| O-6 | `.claude/worktrees/bl/D1/p8/B-proto/` (P9-G5, still present), `p9/` (empty), `p10/B-proto/` (5.4 GB of snapshots, Bp10 G-11) | — | driver housekeeping (P10-G6) |

**The route's own gaps** (Bp10 §9), dispositions.

| Bp10 | disposition |
|---|---|
| G-1 | P10-R1 |
| G-2 | **Confirmed under P9-R1 (a); no new ruling.** The ruled text is "B4 widens … to every module-grain value SCC", and LAW §1 seals `scripts` as well as `src`; the `scripts/structure/lib` ↔ `lib/graph` SCC is one such SCC, cured by the same base rule. A cure narrowed to `src` would leave a RED arm or an exemption the ruling does not grant. S74b (a self-path F-1 edge the engine could not move) and S74e (the new module's door, B7/B14) are the steps the base rule needs on that tree. W-D.1's D1-G3 VALUE-SCC reads `src` only (`waves/W-D.1.md:151`); when it is re-pointed (P9-G6) it reads both sealed zones |
| G-3 | **None owed.** §P9-6.2 step 4 is the binding instruction for a pass that moves a `src` file: the touched specs run on the route tree and the tally re-derives against the committed base report. The route did that plus a fresh base run of the same specs, and the critic's independent reader agrees (cB10 §3) |
| G-4 | the landing's version bump (W-D.1 / the release). The chain does not edit `package.json`'s version; C2-G4's published-version arm reads one miss until then. Carried into the convergence record |
| G-5 | none; each critic writes its own battery |
| G-6 | the driver drops the `tests-visual/node_modules` symlink from the seat task text (the checkout has no such directory) |
| G-7 | W-D.1 §0 items 2, 3, 5 (1 / 5 / 3): W-D.1 §3 steps 5 and 7, its own edits (§P9-4) |
| G-8 | outside D1 (P5-G8) |
| G-9 | none |
| G-10 | carried (§P10-5) |
| G-11 | P10-G6 |

**The critic's own defects** (cB10 §7): five, each re-run post-hash with the expectation unchanged (the PC-type/PCX-type plants closed a sibling cycle LAW §8 already counts, the route's run 1 hit the same trap; `migration10.sh` ran into O-4; a grep counted its own marker; pass 6's moved import; `--overlay {}` marked INFO where the kit is stricter). This registry accepts them: O-1's decisive rows (`T-base-is-route`, `T-route-is-rekeyed-base`, `R-base-is-route`) are hashed battery rows, and F6 only makes the masking concrete.

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.**

---

## P10-3 · G's re-trigger: not fired

- **The first arm fails again.** The pass 4-9 plants regress on the pass-10 tree with 0 differ (cB10 §4), and pass 10 adds a module-grain parent↔child arm to B4 that G's law has no clause for.
- **The second arm has no ruling.** The datum moved by S70's one rebind, under P9-R2 (a); no ruling reopened G.

G stays banked.

---

## P10-4 · Rulings: P10-R1, owed

P9-R1 and P9-R2 were ruled on 2026-10-15 and landed in full (§P10-2). S-14's remaining work (O-1, O-2) sits under P8-R2 as ruled ("a degenerate input throws"; LAW §14 already lists "a report of another schema" and has `rekey` refuse a re-keyed report) and needs no ruling. Bp10 G-2 sits under P9-R1 (a) (§P10-2). One ruling is owed.

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| **P10-R1** | where the move engine's `./`-lead cure lives: the docs floor that S1 lands, or a chain step that patches the landed copy | (a) **floor row:** `floor/lib/move.mjs:168` takes the one-line cure, with a floor plant that moves a holder of `"./dist/x"` and reads the spelling kept; the floor base is re-cut (its digest moves; `src`, `dist`, the cascade baseline, the base peer report and the browser base reports do not, since the line touches only `scripts/structure/lib/move.mjs`); S74c leaves the chain; S1b→S70 re-derive and replay to a new digest; S70's datum unchanged (the engine does not ship). (b) **chain step:** S74c stays; FLOOR.md gains one line naming S74c as the landed cure; the docs engine keeps the defect as a record; the digest `6fdd4ec7…` stands. (c) **as is:** S74c stays, nothing recorded; the two engines and FLOOR.md F-2 disagree silently | `K10/authored/p10-engine-dot-lead.mjs` (the `from`/`to` regex); `floor/lib/move.mjs:168` (the old `(\.\.\/)*` lead); FLOOR.md F-2 / P4-F3 ("a root-relative spelling is kept verbatim"); Bp10 §2 (`"./dist/index.d.ts"` at `entries.mjs:71` became `"dist/index.d.ts"`, and the image check refused S74d with 2 edges lost); cB10 O-5; P4-F rows as the precedent for floor rows inside the loop | **(a).** The defect is the floor's: the floor engine contradicts the floor's own sentence, and the chain is patching the floor it lands. Curing it at the cause leaves one engine and one record, which is the clean-break rule, and costs one re-cut plus a replay that pass 11 can carry while the count is 0. (b) keeps two engines that disagree in the record the wave cites; (c) hides it. If the driver prefers no digest change while S-14 closes, (b) is the fallback, and the convergence record states it |

---

## P10-5 · Open gaps

| id | gap | source | pass-11 disposition |
|---|---|---|---|
| P10-G1 | **S-14:** `browser-tally` and `rekey` accept right-schema, wrong-kind reports, two as an all-clear | cB10 O-1; `K10/tools/browser-tally.mjs:56,68`, `rekey.mjs:34`; `cB10-R/judges10.txt:33,35,55,56,70` | route, kit-only (§P10-6.3) |
| P10-G2 | **S-14:** a value-taking flag that is present with no value reads as absent (`--base` → RED, `--table` → GREEN; by code `--overlay`, `--json` likewise) | cB10 O-2; `K10/lib/floor.mjs:27`; `cB10-R/judges10.txt:117,130` | route, kit-only (§P10-6.3) |
| P10-G3 | the docs floor and the landed engine disagree on the `./` lead | Bp10 G-1, cB10 O-5 | per P10-R1 |
| P10-G4 | pass 6's `fd4-probe.mjs` imports `scripts/structure/lib/tree.mjs`, which S74d moved; the route's run of the pass-7 tree probes shows the FAIL (`K10/results/p10/critic9/tree-probes.txt:169`) and Bp10 §5 does not list it | cB10 §4 | the pass-11 route re-points it (the critic's F4 line) and lists every earlier battery file that names a path S74d moved |
| P10-G5 | W-C.2's appendix A: ENOBUFS on `git ls-files`, ENOENT on an uncommitted migrated tree, and a META grammar that reads a bare `(BL)` and "tranche" as 0 | cB10 O-3, O-4 | outside D1: formation input for W-C.2, on the tranche cursor. D1's own MIGRATION check keeps both readers (appendix A as fixed by the critic, and the route's `chain-text.mjs`) |
| P10-G6 | `.claude/worktrees/bl/D1/p8/B-proto/` (P8-G6, P9-G5, still present), the empty `p9/`, and `p10/B-proto/` (5.4 GB: `snap-S73c/`, `snap-S74/`, `scratch/`, `SEQ-S74.json`; the seat's recursive removal was denied) | cB10 O-6, Bp10 G-11 | the driver removes all three before the pass-11 route seat |
| P10-G7 | the seat task text names a `tests-visual/node_modules` symlink the checkout lacks | Bp10 G-6 | the driver drops it from the task text |
| P9-G6 | W-D.1 and `waves/INDEX.md:47` cite the pass-4 kit and digest `472cf493…`; W-D.1's D1-G3 VALUE-SCC reads `src` only | §P8-6.6; Bp10 G-2 | re-pointed when D1 converges, to the converged kit and digest, VALUE-SCC over both sealed zones |
| P7-G5 | the root's peer class broken at the floor base (23 reviewed holds) | pass 7 | outside D1; on the tranche cursor |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; common browser failures (the 30 base-red keys among the 8 touched specs, Bp10 G-8) | pass 5 | outside D1; on the tranche cursor |

Floor: P10-R1 (a) owes one floor row. FP6-1..FP6-3, FP6-7, FP5-3, FP5-4, FP5-7 stay declared limits.

---

## P10-6 · Pass-11 plan

### P10-6.1 Routes

| route | status | pass-11 work |
|---|---|---|
| D1-B | ADVANCE | close S-14 (P10-G1, P10-G2); land P10-R1 on its ruled arm; re-point the moved battery imports (P10-G4). The pass-11 critique is the first of two clean passes |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P10-6.2 Order

1. **Housekeeping** (P10-G6, P10-G7). This part is committed by the driver before any pass-11 seat (S-01).
2. **Ruling.** P10-R1 ruled into `RULINGS.md` before the route seat.
3. **Floor.** Under P10-R1 (a): the floor row and its plant; the floor base re-cut by S1's own script, its digest recorded. Under (b): the FLOOR.md line. Under (c): nothing.
4. **Route.** Kit first (P10-G1, P10-G2, P10-G4; no digest change). Then, under P10-R1 (a) only, the chain: S74c removed, S1b→S70 re-derived, S69 still the last gate step, S70 the one rebind (expected unchanged at 2,920,386), the new digest replayed from three fresh worktrees, one `--twice`. Under (b) or (c) the chain is untouched and `6fdd4ec7…` is replayed from two fresh worktrees, one `--twice`. **Browser:** no `src` file moves in either arm; the committed reports stand and the tally is re-run through the cured judges. The kit and every result are committed before the critic launches.
5. **Critique.** A fresh critic who authored nothing in passes 2-11, the pass-6..10 critics included, writes and hashes the battery before reading the kit.
6. **Pass-11 agglomeration.** If S-14 closes and the critique re-opens nothing and maps nothing outside the list, the count reaches 1.

### P10-6.3 Route work

| id | build | closes or holds |
|---|---|---|
| route · report kind | P10-G1. `browser-tally`: `--base` and every `--base-rerun` must carry `rekeyedFrom` as an object whose `testDir` differs from the route's; `--route` and every `--route-rerun` must carry no `rekeyedFrom`; else a throw. `rekey`: its base must carry `testDir` other than the migrated program's (`"."`) and no `rekeyedFrom`; a route run or route rerun is refused. **Not** `baseReport`: the committed route reruns record `baseReport: null` (§P10-0 item 2). LAW §14 names the kinds (base run, re-keyed base, route run) and the field that tells them apart | S-14 |
| route · flag values | P10-G2. `arg` (`lib/floor.mjs:27`) throws when a flag is present and its value is missing or is another flag; every value-taking flag of the four judges is listed in Bp11 with its reading (absent → stated default or throw; present-empty → throw) | S-14 |
| route · sweep | the §1 sweep repeated over argument parsing as well as report fields: every place a judge reads an input's kind or presence, each a throw or a stated, planted reading | S-14 |
| route · P10-R1 | per its ruled arm (§P10-6.2 steps 3-4) | S-08, S-09 |
| route · batteries | P10-G4: pass 6's `fd4-probe.mjs` re-pointed; every earlier battery file naming a path S74d moved listed and re-pointed by `diff` | S-13 |

### P10-6.4 What pass 11 must prove

§P9-6.4's bar, re-met: the chain replays to one digest (`6fdd4ec7…`, or the re-derived one under P10-R1 (a)), rerun a no-op; 19 clauses at 0; verify:package CLEAN at the one datum; cascade GREEN against the floor base; 428/428 base-green held through the cured tally; `./motion-core` keyframes-free on all three arms; `seal.test.ts` 26/26 or more.

**The battery must plant:**
- for every input argument of every kit judge: missing, non-JSON, wrong-schema, and **every committed report kind in every slot**: the base run, a re-keyed base, a route run, a base rerun (raw and re-keyed), a route rerun (with `baseReport: null`), a probe report; each wrong one exits 2;
- F6 as a hashed row: a route with one base-green test failing, read through every wrong-kind `--base`, `--base-rerun` and `rekey` path, never 0;
- every value-taking flag of every judge present with no value, and followed by another flag: each exits 2;
- under P10-R1 (a): the floor plant (a holder of `"./dist/x"` moved, the spelling kept) and the floor base digest re-cut by S1's script;
- regressions: the pass-10 critic's battery (`7b7b5303…`) with its post-hash corrections, the pass-9 critic's (`748826fb…`), the 402 rows, crash8, passes 4-10's route batteries, P9-R1's PC/PCG/PCX/PD plants and P9-R2's MIGRATION plants.

### P10-6.5 Convergence criterion

§P2-6.5 unchanged; the checklist is §P3-9's 27 items, frozen. **B's two-clean-passes count is 0.** The pass-11 critique moves it to 1 if S-14 closes on the critic's measurement and the critique re-opens nothing and maps no finding to a listed item left open or to an edict clause the list leaves out; the pass-12 critique moves it to 2 on the same terms. A closed item whose §P10-7 hold column fails on the critic's measurement is re-opened.

### P10-6.6 What the convergence record will carry (at pass 12 at the earliest)

As §P9-6.6, with: the converged chain's digest (`6fdd4ec7…` under P10-R1 (b)/(c), the re-derived one under (a)) and its replays; the one datum S70 rebinds (2,920,386 unless a later step changes the package bytes); the rulings through P10-R1; the second module-grain SCC cured under P9-R1 (a) (Bp10 G-2); W-D.1 §0's five items with the last measurement (item 1 0 and item 4 cured by the chain; items 2, 3, 5 as W-D.1 §3 steps 5 and 7, at 1 / 5 / 3 on the pass-10 tree); the version bump as the landing's (Bp10 G-4); W-C.2's appendix-A defects as that wave's formation input (P10-G5); P9-G6's re-pointing of W-D.1 (`waves/W-D.1.md`, D1-G3 VALUE-SCC over `src` and `scripts`) and `waves/INDEX.md:47`.

---

## P10-7 · Open gaps, enumerated (the pass-11 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 10.

| item | pass-10 critic | entering pass 11 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | this part committed; the pass-11 kit and results committed before judgment |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P9-R2 on their arms, landed and measured; P10-R1 ruled and landed; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | gate at 0 on every clause; under P10-R1 (a), the floor row planted |
| S-09 | CLOSED | CLOSED | the digest replayed idempotently, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN listed, RED unlisted |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | every base-green key accounted for through the cured tally; capture exclusion stated, printed, and a moved capture spec read by B0 |
| S-13 | CLOSED | CLOSED | regressions identical, every earlier battery runnable on the pass-11 tree (P10-G4) |
| S-14 | **OPEN** | **OPEN** | B17 0; every gate throw exits 2, import time included; every kit judge exits 2 on a throw or a degenerate input on every input argument, a wrong-schema or **wrong-kind report in every slot** and **a flag with no value** included; no judge reads a malformed input as an all-clear |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | regressions identical |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 owns the class; its reader throws on a peer-less, whitespace-only and subpath-less row |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 11:** 27 items, 26 closed, 1 open (S-14). Two-clean-passes count: **0**.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 10. D1-B converges at the pass-12 agglomeration at the earliest.

---

# D1 · pass 11 · REGISTRY: the route after pass 11

| field | value |
|---|---|
| seat | D1 pass-11 agglomeration. Closes pass 11 with B's status and convergence, the two-clean-passes count, the rulings owed, the open gaps and the pass-12 plan. Passes 1-10 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4a17cbcb` (the critique, 10:30:45Z). `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code. The kit, the floor row and `B-proto.md` were committed at `8af2de6f` (09:23:47Z), before the critic's battery hash (09:30:08Z); between `8af2de6f` and HEAD nothing under `structure/` changed except `pass-11/critique-B*` (648 tracked files under `pass-11/`) |
| inputs, read in full | `pass-11/B-proto.md`, `pass-11/critique-B.md`, `critique-B/BATTERY-HASH.txt`; `K11/LAW.md` §14; this file §P2-6.5 and the pass-10 part (§P10-0..§P10-7); `RULINGS.md` through P10-R1. The kit's other files and the critic's other results were read at the lines the reports cite, not re-run |
| instruments | none re-run. Read-only checks: `git log`, `git diff --name-only`, the empty code diff; `K11/tools/browser-tally.mjs:40-75` (`BASE_SLOT` tests `rekeyedFrom` and its `testDir`, nothing of coverage); the top-level fields of every committed `browser-seat/2` report under `K11/results/p11/browser/` (below); `waves/INDEX.md:47` |
| fences | no source edit, no git write; this part is the only write |

Short citations: `Bp11` is `pass-11/B-proto.md`, `cB11` is `pass-11/critique-B.md`, `cB11-R` is `pass-11/critique-B/results/`, `K11` is `pass-11/B-kit/`.

---

## P11-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | re-opened by this registry | reason in one line |
|---|---|---|---:|---|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE** | 26/27 = 96.3% | S-14 OPEN, the rest CLOSED | 0 (S-14 was open entering) | 0 | every other bar item re-met from committed bytes (`6fdd4ec7…`, 126 steps, 19/19, CLEAN at 2,920,386, cascade GREEN, 428/428, `seal.test.ts` 26/26); P10-R1 (a), P10-G1, P10-G2 and P10-G4 landed and measured; but `browser-tally --base` accepts a **partial** re-keyed base (a base rerun, a touched-spec pair's base) and reads a failing route GREEN |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | — | re-trigger not fired (§P11-3) |

**The two-clean-passes count for B stays at 0.** No convergence record is written. The earliest convergence is the pass-13 agglomeration: a clean pass-12 critique moves the count to 1, a clean pass-13 critique to 2.

Why the count does not advance. The rule reads "advances by 1 iff the pass-11 critique re-opens nothing and maps no finding to an edict clause the list leaves out". The critique re-opened no item that entered closed, but S-14 entered open, the route claimed it closed (Bp11 §9), and the critic's measurement refutes the claim on the text §P10-6.4 wrote for it: "every committed report kind in every slot: … **a base rerun (raw and re-keyed)** …; each wrong one exits 2" and "F6 … through every wrong-kind `--base` … path, never 0". §P2-6.5's condition 1 (zero items open) fails at the end of pass 11, and its third bullet restarts the count on a finding that maps to a listed item. The count was 0 and restarts at 0.

Three findings shape pass 12.

1. **S-14's last hole is partiality, not kind.** P10-G1 landed as §P10-6.3 specified it: `rekeyedFrom` separates base from route in every slot, `rekey` refuses route runs and reruns, F6 reads never 0 through every base↔route swap (cB11 §1, 22/22), and every value-taking flag throws on a missing value (FLAG 23/23). But §P10-6.3's discriminant was one field, and LAW §14 (pass 11) then wrote "a full run and a rerun of one kind carry the same fields; the caller names which is which by the slot". A partial base in `--base` judges only the keys it holds, so F6's failing route reads **GREEN, exit 0** through 10 of 10 committed partial bases (`cB11-R/f7.txt`: `reruns/base-1-{1,2,3}.rekeyed.json` over 8 keys, `p10-steps/base.rekeyed.json` over 33, `p11-steps/base.rekeyed.json` over 3). That is pass 10's O-1 again, through the kind the plan enumerated. The route planted it and read the GREEN as "a verdict" (Bp11 §6 KIND); the registry's plan, which this registry wrote, set a discriminant that could not separate the two, so the defect is shared between §P10-6.3 and the route. The cure is kit-only and changes no digest (§P11-6.3).
2. **No field in the committed reports separates a full run from a rerun; coverage does.** Checked here: `base-rekeyed.json` (selection 153, 866 results), `reruns/base-1-*.rekeyed.json` (selection 2, 10 results), `p10-steps/base.rekeyed.json` (8, 63), `p11-steps/base.rekeyed.json` (1, 3) carry the same field set; `baseReport` is `null` on all. The touched-spec bases are legitimately the `--base` of their own pairs (each pair's route names its re-keyed base in `baseReport`), so "a touched-spec base is always wrong in `--base`" would be false. What is wrong is a base that does not cover the route it is judged against. §P11-6.3 sets the cure on coverage of the route's base-origin specs, read through the chain's own move map.
3. **P10-R1 (a) closed with no new digest.** The floor row is one line (`floor/lib/move.mjs:168`, docs = landed, `ee305d6f…`); the floor base re-cut to `6773b4ec1217ab41…532f2cadb`, which with that line reverted reads exactly pass 10's `5b14c6c7…` (cB11 FB5); S74c left the chain (126 steps); S74b now lands at pass 10's post-S74c digest, so the chain still ends at **`6fdd4ec7…`** (Bp11 §3, G-2). P10-R1's predicted "new digest" did not occur and needs no ruling: the convergence record carries `6fdd4ec7…` and the re-cut floor base.

---

## P11-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-12 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel and CSS edges included (B1, B3); direction (B8); acyclicity: sibling, and every module-grain value SCC parent↔child included (B4, P9-R1); no masking fallback (B17); names (B15); Playwright-program membership and visual subject (B16); the peer class (B18) | ADVANCE | 26/27 by its critic and by this registry | — | the one live route; close S-14 (coverage), then the first of two clean passes |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P11-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P11-2 · D1-B · Sealed modules, flat: ADVANCE

**What ran** (Bp11 §0-§9, confirmed by cB11 §0-§4).

| item | result |
|---|---|
| floor row (P10-R1 (a)) | `floor/lib/move.mjs:168` takes the `./`-lead cure; FLOOR.md F-2 gains P11-F1. Route plant LOST → KEPT on the docs engine and the landed one; the critic's own 7-shape plant (`battery/floor11.mjs`) KEPT on every engine with the cure, LOST on all four `./`-lead shapes with line 168 reverted, controls kept (cB11 §0, §7 item 2) |
| floor base | re-cut by S1's script: `6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb` over 1,354 files, both seats; the one-line revert reads `5b14c6c7…` exactly (cB11 FB5) |
| chain | 127 → 126 steps; S74c and its authored/frozen files deleted; S1→S74b re-recorded; S74b lands at pass 10's S74c digest `1da6d092…`; S74d→S70 equal to pass 10's; S69 the last gate step, S70 the one rebind |
| replay | `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files. Route: r1 `--twice` 547.4 s, r2 417.8 s, both MATCH from fresh worktrees, rerun no-op 0.4 s. Critic: 474 s from committed bytes in a fresh worktree, MATCH, rerun 0.7 s, unchanged after every battery family |
| gate | 19/19 at 0, exit 0; files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2, B10 anchored 39, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` 26/26; vitest 2,335 passed, 0 failed, `--maxWorkers=2`, both seats |
| package | verify:package CLEAN at 2,920,386, `equal: true`; only S70 writes `.bundle-ratchet` |
| cascade | GREEN against the floor base (listed), both the committed baseline and the re-cut base's own snapshot; RED unlisted (critic) |
| browser | selection 155 specs, 14 captures excluded, byte-identical to pass 10's; pass 11's one code line selects 1 spec (the π floor), run on both trees, 3/3, 0 new failures; tally 428 base-green, 428 held, 0 failed, 0 absent through the cured tally and the critic's own reader (`tally11.mjs`), with and without both touched-spec pairs; blob D2 flaky out of the bar. The full 155-spec run was not repeated (Bp11 G-1; §P10-6.2 step 4 did not require it; the route tree is byte-identical to the one the committed full runs judged) |
| P10-G1 | the kind discriminant on `rekeyedFrom`: KIND 46/46 (route), tally slots × 16 kinds, `rekey` 14/14, peer/overlay/select 48/48 (critic); F6 never 0 through every base↔route swap (route 13/13, critic 22/22). **Partial bases in `--base` read GREEN** (O-1 below) |
| P10-G2 | `lib/argv.mjs` in all four judges and `arg` in `lib/floor.mjs`: FLAG 50/50 (route), 23/23 (critic); DUP 2/2; pass 10's seven failing rows now PASS (judges10 145/0) |
| P10-G4 | `pass-6/…/fd4-probe.mjs:21` and `pass-3/…/probes.mjs:77,119` re-pointed by diff; fd4 A, G, G2, U, RESTORE PASS; the critic's census matches the route's list |
| P9-R1 (a), P9-R2 (a), P8-R3 | PD 6/6; fix10b MIGRATION (C2-G1 0 META, four tranche-id plants 1 each); PR 6/6 |
| regressions | the 402 rows 0 differ; pass 8's 11 peer plants 0 differ; judge-throws 52/0 (the three new kit modules add 7 rows, each 2); crash8 39/39; pass 10's critic battery 145/0 with every other verdict line identical to its own run; tree-probe FAIL lines identical |
| W-D.1 §0 | 0 / 1 / 5 / cured / 3, as pass 10 |

**The critic's items** (cB11 §6): 26 CLOSED, S-14 OPEN, 0 re-opened.

**The critic's findings** (cB11 §5), read under §P2-6.5.

| # | finding | item it maps to, and the text that decides | effect |
|---|---|---|---|
| O-1 | `browser-tally --base` accepts a re-keyed base **rerun** or a touched-spec pair's re-keyed base against the full route and reads F6's failing route GREEN (exit 0) over the 3-33 keys that partial base holds (`cB11-R/f7.txt` 10/10; `judges11.txt` KM-tally-base-rekeyed-base-rerun, KM-tally-base-steps-rekeyed-base) | **S-14**: §P10-7 hold "a wrong-schema or wrong-kind report in every slot … no judge reads a malformed input as an all-clear"; §P10-6.4 "a base rerun (raw and re-keyed) …; each wrong one exits 2" and "F6 … through every wrong-kind `--base` … path, never 0" | **S-14 stays OPEN.** Route work under P8-R2 as ruled (P11-G1); no ruling. The decisive rows are hashed KIND rows the battery classed INFO, which the critic discloses (cB11 §7); `f7.sh` only makes the masking concrete against F6, which §P10-6.4 asks of every wrong-kind `--base` path |
| O-2 | the route's `tools/batteries.sh` takes three trees and a scratch dir, unlike pass 10's `run10.sh` | none | none (INFO); the next critic is told its signature (§P11-6.4) |

**The route's own gaps** (Bp11 §10), dispositions.

| Bp11 | disposition |
|---|---|
| G-1 | **None owed.** §P10-6.2 step 4 is the binding instruction (no `src` file moves; the committed reports stand). The convergence record states that the full runs are pass 8's, carried by the byte-identical route tree and selection, with each later pass's touched-spec pair |
| G-2 | **None owed.** P10-R1 (a) predicted a new digest; the chain ends at `6fdd4ec7…` because S74b now lands where S74c did. The ruling's substance (one engine, S74c out, the floor base re-cut) is met |
| G-3 | closed: the driver committed the floor row at `8af2de6f`; `P11-F1.patch` is now a record |
| G-4 | **A declared limit, kept.** A forged `rekeyedFrom` on a route report is a hand-written field, not a committed report; the critic did not count it. The coverage cure (§P11-6.3) narrows it: a forged report must also cover the route |
| G-5 | none; the pass-3 battery left the regression lists at pass 4 |
| G-6 | W-D.1 §0 items 2, 3, 5 (1 / 5 / 3): W-D.1 §3 steps 5 and 7, its own edits (§P9-4) |
| G-7 | none; each critic writes its own battery |
| G-8 | outside D1 (§P11-5) |
| G-9 | P11-G3: FLOOR.md changes only by a floor row, so the stale symlink line goes in the next floor row if one is owed; otherwise the convergence record lists it as FLOOR.md's one stale line |

**The critic's own defects** (cB11 §7): four, each re-run post-hash with the expectation unchanged (a `set -u` brace; the docs-engine plant run after S1 moved the floor runtime; four control rows that omitted the base reruns and so read the flaky key RED, which the kit reads rightly; BW6 compared against the byte-identical pass-11 `specs.txt`). This registry accepts them.

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.**

---

## P11-3 · G's re-trigger: not fired

- **The first arm fails again.** The pass 4-10 plants regress on the pass-11 tree with 0 differ (cB11 §4); G's law still has no clause for B4's module-grain parent↔child arm.
- **The second arm has no ruling.** The datum did not move (S70 rebinds once, unchanged at 2,920,386); no ruling reopened G.

G stays banked.

---

## P11-4 · Rulings: none owed

P10-R1 was ruled on 2026-10-16 and landed (§P11-2); its digest prediction is answered under Bp11 G-2 without a ruling. S-14's remaining work (O-1) sits under P8-R2 as ruled ("a degenerate input throws") and §P10-6.4's battery text, which already names the base rerun in every slot; the discriminant is route work set in §P11-6.3, as §P10-6.3 set pass 11's. Bp11 G-1 and G-4 are dispositioned above.

One point the driver may choose to rule, with this registry's recommendation that it is not needed:

| id | question | arms | evidence | recommendation |
|---|---|---|---|---|
| (optional) P11-R1 | how `browser-tally` refuses a partial base in `--base` | (a) **coverage through the chain's map**: every spec of the route's selection that the chain carries from a base-program spec (the map `rekey` already reads from `frozen/SEQUENCE.json`) must have results in `--base`; else a throw. Reruns stay partial in `--base-rerun`; a touched-spec pair judged on its own passes. (b) **a recorded kind field**: the seat (and `rekey`) stamp `run: "full" \| "rerun"`; the committed reports are re-stamped. (c) **a required `--selection`**: the tally takes `browser-select`'s committed selection and requires `--base` and `--route` to cover it | `K11/tools/browser-tally.mjs:58-71` (`BASE_SLOT`); the field census in §P11-0 item 2 (no field separates full from rerun); `cB11-R/f7.txt`; LAW §14 (pass 11) "the caller names which is which by the slot" | **(a), and no ruling.** It reads only what is committed, re-stamps nothing, binds the base to the route it judges rather than to a label a caller writes, and admits each touched-spec pair where it is right. (b) rewrites committed reports and is a label, the same weakness as G-4; (c) adds a required input the critic would then have to plant in every kind |

---

## P11-5 · Open gaps

| id | gap | source | pass-12 disposition |
|---|---|---|---|
| P11-G1 | **S-14:** `browser-tally --base` accepts a partial re-keyed base (a base rerun, a touched-spec pair's base) against a fuller route, and reads a failing route GREEN | cB11 O-1, F7; `K11/tools/browser-tally.mjs:63-67`; LAW §14 (pass 11) | route, kit-only (§P11-6.3) |
| P11-G2 | the sweep that missed it: pass 11's §1 sweep listed every place a judge reads an input's **kind** and **presence**, not its **extent**. A judge that compares two inputs must state what each must cover of the other | Bp11 §1 | route (§P11-6.3, the extent sweep) |
| P11-G3 | FLOOR.md's worktree recipe names the `tests-visual/node_modules` symlink the checkout lacks | Bp11 G-9 (P10-G7) | the next floor row if one is owed; otherwise listed in the convergence record as a stale recipe line |
| P9-G6 | W-D.1 and `waves/INDEX.md:47` cite the pass-4 kit and digest `472cf493…`; W-D.1's D1-G3 VALUE-SCC reads `src` only | §P8-6.6; Bp10 G-2 | re-pointed when D1 converges, to the converged kit and `6fdd4ec7…`, VALUE-SCC over `src` and `scripts` |
| P10-G5 | W-C.2's appendix A: ENOBUFS on `git ls-files`, ENOENT on an uncommitted migrated tree, a META grammar that reads a bare `(BL)` and "tranche" as 0 | cB10 O-3, O-4; cB11 §2 (unchanged) | outside D1: formation input for W-C.2, on the tranche cursor |
| P7-G5 | the root's peer class broken at the floor base (23 reviewed holds) | pass 7 | outside D1; on the tranche cursor |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; common browser failures | pass 5 | outside D1; on the tranche cursor |

P10-G1, P10-G2, P10-G3 (P10-R1 (a)), P10-G4, P10-G6 and P10-G7 (task text) are closed. FP6-1..FP6-3, FP6-7, FP5-3, FP5-4, FP5-7 stay declared limits; Bp11 G-4 (a forged `rekeyedFrom`) joins them.

---

## P11-6 · Pass-12 plan

### P11-6.1 Routes

| route | status | pass-12 work |
|---|---|---|
| D1-B | ADVANCE | close S-14 (P11-G1, P11-G2), kit-only, no digest change. The pass-12 critique is the first of two clean passes |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

### P11-6.2 Order

1. **Housekeeping.** This part is committed by the driver before any pass-12 seat (S-01). `.claude/worktrees/bl/D1/p11/` is checked empty (both seats report removal).
2. **Route.** Kit only: `K12` = `K11` without `results/`, plus `results/p12/`. The chain, the floor and the frozen files are untouched; `6fdd4ec7…` is replayed from two fresh HEAD worktrees, one `--twice`. **Browser:** no `src` file moves and no code line changes; the committed reports stand and the tally is re-run through the cured judge. The kit and every result are committed before the critic launches.
3. **Critique.** A fresh critic who authored nothing in passes 2-12, the pass-6..11 critics included, writes and hashes the battery before reading the kit.
4. **Pass-12 agglomeration.** If S-14 closes on the critic's measurement and the critique re-opens nothing and maps nothing outside the list, the count reaches 1.

### P11-6.3 Route work

| id | build | closes or holds |
|---|---|---|
| route · coverage | P11-G1. `browser-tally` reads the chain's base→route spec map (the one `rekey` reads, through `lib/sequence.mjs`) and requires `--base` to hold results for **every spec of the route's results that the map carries from a base-program spec**; a route spec with a base origin and no `--base` result is a throw ("a partial base judged against a fuller route"). `--base-rerun` and `--route-rerun` stay partial by design (P7-R2) and are unchanged. A route spec with no base origin is a new spec, as now. The touched-spec pairs pass when judged as their own pair and when added as reruns. LAW §14 drops "the caller names which is which by the slot" and states the coverage rule. **Not** a kind field (§P11-4 (b)) | S-14 |
| route · extent sweep | P11-G2. Bp12 lists, for each judge that compares two inputs (`browser-tally` base/route/reruns, `peer-closure` base/route, `rekey` base/tree, `browser-select` root/sequence), what each input must cover of the other, and the throw or stated reading when it does not | S-14 |
| route · F6 and F7 | F6 (one base-green key of the full route failing) read through **every committed `browser-seat/2` report in every slot**, partial ones included: never 0. F7's ten rows exit 2 | S-14 |

### P11-6.4 What pass 12 must prove

§P10-6.4's bar, re-met: `6fdd4ec7…` replayed, rerun a no-op; 19 clauses at 0; verify:package CLEAN at 2,920,386; cascade GREEN against the floor base `6773b4ec…`; 428/428 base-green held through the cured tally; `./motion-core` keyframes-free on all three arms; `seal.test.ts` 26/26 or more.

**The battery must plant:**
- for `browser-tally`'s four slots and `rekey`'s base: every committed `browser-seat/2` report, **full and partial**: the full base raw and re-keyed, each base rerun raw and re-keyed, each touched-spec base raw and re-keyed (p10, p11), the full route, each route rerun, each touched-spec route; each one the slot refuses exits 2, and **no report other than the right full base reads 0 in `--base` against the full route**;
- F6 through every row above, never 0; F7's ten rows (`cB11-R/f7.txt`), each 2;
- the touched-spec pairs judged on their own (p10, p11): a verdict, not a throw, and F6's analogue on each pair RED;
- a re-keyed base with one base-origin spec's results deleted, against the full route: 2;
- regressions: the pass-11 critic's battery (`317fd849…`) with its post-hash tools, the pass-10 critic's (`7b7b5303…`), the pass-9 critic's (`748826fb…`), the 402 rows, crash8, passes 4-11's route batteries (the pass-11 route's `tools/batteries.sh` takes three trees, built, unbuilt and floor base, and a scratch dir), P9-R1's PC/PCG/PCX/PD plants, P9-R2's MIGRATION plants, P10-R1's floor plants (`pass-11/plants/p11-floor-plant.mjs`, `cB11` `battery/floor11.mjs`).

### P11-6.5 Convergence criterion

§P2-6.5 unchanged; the checklist is §P3-9's 27 items, frozen. **B's two-clean-passes count is 0.** The pass-12 critique moves it to 1 if S-14 closes on the critic's measurement and the critique re-opens nothing and maps no finding to a listed item left open or to an edict clause the list leaves out; the pass-13 critique moves it to 2 on the same terms. A closed item whose §P11-7 hold column fails on the critic's measurement is re-opened.

### P11-6.6 What the convergence record will carry (at pass 13 at the earliest)

As §P10-6.6, with: the converged chain's digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` (126 steps) and its replays; the floor base `6773b4ec…` (P10-R1 (a), P11-F1); the one datum S70 rebinds, 2,920,386; the rulings R-1..R-10 as amended, X-10, P3-R1..P10-R1; the second module-grain SCC cured under P9-R1 (a); W-D.1 §0's five items (items 2, 3, 5 at 1 / 5 / 3 for W-D.1 §3 steps 5 and 7); the version bump as the landing's (Bp10 G-4); the full browser runs as pass 8's carried by byte-identical trees (Bp11 G-1); W-C.2's appendix-A defects as that wave's formation input (P10-G5); P9-G6's re-pointing of `waves/W-D.1.md` and `waves/INDEX.md:47` (W-D.1, F-55..F-59, the one wave D1 feeds); FLOOR.md's stale recipe line (P11-G3); held with the bank: G-01..G-12 and D′'s gaps.

---

## P11-7 · Open gaps, enumerated (the pass-12 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 11.

| item | pass-11 critic | entering pass 12 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | this part committed; the pass-12 kit and results committed before judgment |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P10-R1 on their arms, landed and measured; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | gate at 0 on every clause; the floor row planted (P11-F1) |
| S-09 | CLOSED | CLOSED | `6fdd4ec7…` replayed idempotently, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN listed, RED unlisted, against `6773b4ec…` |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | every base-green key accounted for through the cured tally; capture exclusion stated, printed, and a moved capture spec read by B0 |
| S-13 | CLOSED | CLOSED | regressions identical, every earlier battery runnable on the pass-12 tree |
| S-14 | **OPEN** | **OPEN** | B17 0; every gate throw exits 2, import time included; every kit judge exits 2 on a throw or a degenerate input on every input argument: a wrong-schema or wrong-kind report in every slot, a flag with no value, and **a partial report where a full one is required** included; no judge reads a malformed input as an all-clear: F6 never 0 through every committed report in every slot |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | regressions identical |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 owns the class; its reader throws on a peer-less, whitespace-only and subpath-less row |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 12:** 27 items, 26 closed, 1 open (S-14). Two-clean-passes count: **0**.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 11. D1-B converges at the pass-13 agglomeration at the earliest.

---

# D1 · pass 12 · REGISTRY: the route after pass 12

| field | value |
|---|---|
| seat | D1 pass-12 agglomeration. Closes pass 12 with B's status and convergence, the two-clean-passes count, the rulings owed, the open gaps and the pass-13 plan. Passes 1-11 above are kept intact |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `16c0d6b48` (the critique's commit, 14:20:27Z). The kit, its results and `B-proto.md` were committed at `9144cbe12` (13:19:18Z), before the critic's battery hash (13:26:27Z); between `9144cbe12` and HEAD only `pass-12/critique-B*` changed. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and the critic judged 10.1.0's code |
| inputs, read in full | `pass-12/B-proto.md`, `pass-12/critique-B.md`, `critique-B/BATTERY-HASH.txt`; this file §P2-6.5 and the pass-11 part (§P11-0..§P11-7); `RULINGS.md` through P11-R1. The kit and the critic's results were read at the lines the reports cite, not re-run |
| instruments | none re-run. Read-only checks: `git log 9144cbe12..HEAD`, the empty code diff; the critic's battery re-hashed by its stated method, `c6fdf555…f7ace9c1` = `BATTERY-HASH.txt`; `critique-B/results/judges12.txt` tail (`SUMMARY pass=233 fail=0`, rc 0); `critique-B/results/p11-post.txt` ("never-0 rows reading 0: 0"); `K12/lib/follow.mjs:83-93` (`baseProgram`, the stated floor-row premise); `waves/INDEX.md:47`; `.claude/worktrees/bl/D1/p11/` and `p12/` both present and empty |
| fences | no source edit, no git write; this part is the only write |

Short citations: `Bp12` is `pass-12/B-proto.md`, `cB12` is `pass-12/critique-B.md`, `cB12-R` is `pass-12/critique-B/results/`, `K12` is `pass-12/B-kit/`.

---

## P12-0 · In brief

| id | route | status | conv. (critic) | critic's verdict | re-opened by the critic | re-opened by this registry | reason in one line |
|---|---|---|---:|---|---|---|---|
| D1-B | sealed modules, flat | **ADVANCE (first clean pass)** | **27/27 = 100%** | all 27 CLOSED, S-14 included | 0 | 0 | P11-R1 (a) landed in the kit: `--base` must cover every route spec the chain carries from a base-program spec, or the tally throws; only the full re-keyed base reads 0 in `--base` (34 other rows exit 2), F6 never 0 in 86 rows, F7 10/10 at 2; the rest of the bar re-met from committed bytes (`6fdd4ec7…`, 19/19, CLEAN at 2,920,386, cascade GREEN, 428/428, `seal.test.ts` 26/26) |
| D1-G | eponymous closures | BANK (unchanged) | 44% (pass 3) | — | — | — | re-trigger not fired (§P12-3) |

**The two-clean-passes count for B moves from 0 to 1.** The rule (§P11-6.5): the count advances by 1 iff S-14 closes on the critic's measurement, and the critique re-opens nothing and maps no finding to a listed item left open or to an edict clause the list leaves out. All three hold:

1. **S-14 closes on the critic's measurement.** The hold text of §P11-7 asks for "a partial report where a full one is required" to exit 2 and "F6 never 0 through every committed report in every slot". The critic discovered the 18 committed `browser-seat/2` reports rather than listing them, put each in each of the tally's four slots and in `rekey`'s base, and ran F6 through every row: 0 of 86 read 0; F7's ten rows exit 2 through its own rows and through pass 11's `f7.sh` by path; a base with one base-origin spec deleted exits 2 for five specs; a degenerate `SEQUENCE.json` exits 2 in four forms (cB12 §1). The two pass-11 rows that read 0 (`KM-tally-base-rekeyed-base-rerun`, `KM-tally-base-steps-rekeyed-base`) now read 2, and nothing else in `judges11` moved.
2. **Nothing re-opened.** The other 26 items hold on the critic's measurement (cB12 §6), each against its §P11-7 hold column. This registry re-opens nothing (§P12-2).
3. **No finding maps outside the list.** I-1..I-3 are INFO (§P12-2). I-1 and I-2 are hand-edited reports, the declared forged-report class (Bp11 G-4); I-3 is a runner name.

**Not converged.** §P2-6.5 condition 3 needs a second consecutive clean critique. The earliest convergence is the pass-13 agglomeration.

---

## P12-1 · Registry

| id | unit set declared by | enforced between units | status | conv. | re-trigger / refutation | pass-13 role |
|---|---|---|---|---:|---|---|
| D1-B | a module is a code dir in `src` or `scripts` with a door (B7), recursively; containers and kind slots excepted | privacy: the recursive door seal, kernel and CSS edges included (B1, B3); direction (B8); acyclicity: sibling, and every module-grain value SCC parent↔child included (B4, P9-R1); no masking fallback (B17); names (B15); Playwright-program membership and visual subject (B16); the peer class (B18) | ADVANCE, count 1 | 27/27 by its critic and by this registry | — | the one live route; the second clean pass on frozen kit bytes |
| D1-G | first-level component units; eponymous roots | B1 into component units only | BANK | 44% | not fired (§P12-3) | none |
| D1-D′ | — | — | BANK (unchanged) | 7% | not fired | none |
| D1-A | — | — | BLOCK (unchanged) | 35% | — | none |
| D1-C, D1-E, D1-F | — | — | BANK (unchanged) | 40/35/30% | no trigger fired | none |

---

## P12-2 · D1-B · Sealed modules, flat: ADVANCE

**What ran** (Bp12 §0-§9, confirmed by cB12 §0-§4).

| item | route (Bp12) | critic (cB12) |
|---|---|---|
| kit work | P11-R1 (a): `browser-tally` reads `lib/follow.mjs` `chainOrigin`/`baseProgram` (153 base-program specs at `baseSha`; 153 of the route's 155 specs have a base origin; 2 are chain creations, S48 and S43d). Spec grain short: throw. Key grain short inside a covered spec: UNBASED, RED. `lib/sequence.mjs` throws on an absent `SEQUENCE.json`. LAW §14 drops "the caller names which is which by the slot" and states the extent | the diff to pass 11 is the extent block, the UNBASED count and the verdict line; no chain step, frozen or floor file changed |
| extent sweep (P11-G2) | Bp12 §1: every judge that compares two inputs, what each must cover of the other, and its reading when short | the tally rows planted (KIND × EXTENT, DEL, MAP, PAIR); the other judges' rows through the regression batteries |
| chain | 126 steps, `frozen/` and `authored/` byte-identical to pass 11's; S69 the last gate step, S70 the one rebind | HEAD code digest `35f7b831…` = the chain's base; 126 steps, no S74c |
| replay | `6fdd4ec7…` over 1,587 files: r1 `--twice` 649.7 s, r2 311.1 s, both MATCH from fresh worktrees, rerun 0.4 s no-op | 416 s from committed bytes in a fresh worktree, MATCH, rerun 0.5 s no-op, unchanged after every battery family |
| floor base | `6773b4ec…` over 1,354 files, cut fresh | FB1 = FB2 = `6773b4ec…`; one line reverted reads pass 10's `5b14c6c7…` (FB5); floor plant pre-S1 docs engine KEPT 4/4, pre-cure LOST 4/4, landed KEPT, chain engine KEPT |
| gate | 19/19 at 0; files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2 | the same (`seal-wt.txt`, light, after its own toolchain block printed only B16-B18; cB12 §7 item 4) |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` 26/26; vitest 2,335 passed, 0 failed | the same |
| package | CLEAN at 2,920,386, `equal: true` | the same |
| cascade | GREEN against the floor base, committed baseline and fresh snapshot | GREEN listed (0), RED unlisted (1); the four `.seq` sequences identical to the committed baseline |
| `./motion-core` | keyframes-free on all three arms | the same, against the kit's base report and its own |
| browser | selection 155 specs / 14 captures byte-identical; no code moves so no browser runs (§P11-6.2 step 2); tally 428/428/0/0, 0 unbased; p10 33/33, p11 3/3 on their own | 428/428/0/0, flaky 1, through the kit tally and its own reader (`tally12.mjs`, with its own kind and extent checks); BW7: the two uncovered route specs are absent from the floor base and from the raw base report; BW8: every committed report byte-identical to pass 11's except the re-derived `base-rekeyed.json`, whose results equal its own re-key |
| regressions | plants-p12 148/148; pass 11's 115/116, the one change the cure; p10-p6 identical; the pass-11 critic's battery by path, the pass-10 and pass-9 batteries inside it | judges11 161/4, exactly the two O-1 rows changed 0 → 2; judges10 145/0; 402 rows 0 differ; crash8 39/39; judge-throws 55/0 (the three new planted kit modules); the route's batteries 11/11 summary lines SAME |
| W-D.1 §0 | 0 / 1 / 5 / cured / 3, byte-identical to pass 11's | `wd1-measure.txt` |

**The critic's items** (cB12 §6): 27 CLOSED, 0 open, 0 re-opened.

**The critic's findings** (cB12 §5), read under §P2-6.5.

| # | finding | item it maps to, and the text that decides | effect |
|---|---|---|---|
| I-1 | a hand-edited base with one spec's 8 results set to `skipped` reads GREEN over a route failing a key of that spec; base-green 428 → 424 (X-SKIP) | **none.** S-14's hold text names "a wrong-schema or wrong-kind report", "a partial report where a full one is required" and "every committed report". This one is full in extent, right in kind, and not committed: a hand-written status, the class of the forged `rekeyedFrom` (Bp11 G-4, a declared limit). The bar is "every base-green key held" (P7-R2); a skipped base test is not base-green, and the control against the passing route also reads 424 (`cB12-R/xnew.txt` X-SKIP-CTL), so the tally reports the shrunk bar rather than hiding it | none (INFO). Joins G-4 as a declared limit (§P12-5) |
| I-2 | `rekeyedFrom.report` is not read; the tally reads `testDir` (X-ORIG) | none; the field is a label, G-4 | none (INFO) |
| I-3 | the route's runner is `tools/batteries-p12.sh` (four arguments), not pass 11's `tools/batteries.sh` | none | none; the pass-13 critic is told (§P12-6.4) |

**The critic's own defects** (cB12 §7): four, each re-run or re-planted post-hash with the expectation unchanged (FB3/FB4 compared after S1 removed the docs floor runtime, re-checked from `git show HEAD:`; X-NEW renamed a spec with no base-green key, re-planted on F6's spec, RED; the route-battery runner name; the toolchain's seal block printing only B16-B18, the gate re-run light). None changes a hashed expectation for a judge under test, and S-14's closure rests on hashed rows. This registry accepts them.

**The route's own gaps** (Bp12 §10), dispositions.

| Bp12 | disposition |
|---|---|
| G-1 | **None owed.** §P11-6.2 step 2 is the binding instruction. The convergence record states that the full browser runs are pass 8's, carried by a byte-identical route tree and selection with the p10 and p11 pairs |
| G-2 | **A declared reading, kept.** Key grain is a verdict (UNBASED, RED), never GREEN. A throw there turned pass 8's T3 plant from RED into no verdict (Bp12 §6 run 1); the critic's X-KEY row reads RED |
| G-3 | **A declared limit, kept.** `baseProgram` reads `tests-visual` at `baseSha` on the stated premise that no floor row touches `tests-visual` (`K12/lib/follow.mjs:86`, LAW §14). The premise is a property of the nine committed floor rows, not of any judge's input argument; a plant that adds such a row is a hand-edited floor, the G-4 class. The pass-13 route measures the premise read-only (§P12-6.3) so the record carries it as a measured fact |
| G-4 | **A declared limit, kept**, now with I-1 and I-2 beside it. The extent narrows it: a forged base must also cover the route's 153 base-origin specs |
| G-5 | none; disclosed. Each defect was found by an earlier battery before the critic launched |
| G-6 | W-D.1 §0 items 2, 3, 5 (1 / 5 / 3): W-D.1 §3 steps 5 and 7, its own edits (§P9-4) |
| G-7 | housekeeping (§P12-6.2 step 1): `.claude/worktrees/bl/D1/p11/` and `p12/` are both present and empty; the driver removes both |
| G-8 | outside D1 (§P12-5) |

**No finding maps to an edict clause the list leaves out. No item is added; the checklist stays at 27.**

---

## P12-3 · G's re-trigger: not fired

- **The first arm fails again.** The pass 4-11 plants regress on the pass-12 tree with 0 differ (cB12 §4); G's law still has no clause for B4's module-grain parent↔child arm.
- **The second arm has no ruling.** The datum did not move (S70 rebinds once, 2,920,386); no ruling reopened G.

G stays banked.

---

## P12-4 · Rulings: none owed

P11-R1 was ruled (a) and landed in the kit; the critic measured it (§P12-2). No finding asks for a ruling: I-1 and I-2 fall in a declared limit; Bp12 G-1..G-4 are dispositioned above under rulings already made (§P11-6.2 step 2, P7-R2, P8-R2, Bp11 G-4). Pass 13 is a re-measurement on frozen kit bytes and needs no new arm.

---

## P12-5 · Open gaps

| id | gap | source | pass-13 disposition |
|---|---|---|---|
| P12-G1 | the base-program premise (no floor row touches `tests-visual`) is stated, not measured in a committed result | Bp12 G-3; `K12/lib/follow.mjs:83-87` | route, read-only: a committed listing of every floor row's touched paths with 0 under `tests-visual` (§P12-6.3). No kit change |
| P11-G3 | FLOOR.md's worktree recipe names the `tests-visual/node_modules` symlink the checkout lacks | Bp11 G-9 | no floor row is owed, so the convergence record lists it as FLOOR.md's one stale recipe line |
| P9-G6 | W-D.1 and `waves/INDEX.md:47` cite the pass-4 kit and digest `472cf493…`; W-D.1's D1-G3 VALUE-SCC reads `src` only | §P8-6.6 | re-pointed when D1 converges, to the converged kit and `6fdd4ec7…`, VALUE-SCC over `src` and `scripts` |
| P10-G5 | W-C.2's appendix A: ENOBUFS on `git ls-files`, ENOENT on an uncommitted migrated tree, a META grammar that reads a bare `(BL)` and "tranche" as 0 | cB10 O-3, O-4 | outside D1: formation input for W-C.2, on the tranche cursor |
| P7-G5 | the root's peer class broken at the floor base (23 reviewed holds) | pass 7 | outside D1; on the tranche cursor |
| P5-G3, P5-G5, P5-G8 | renderer and page-operation swallows; no `pretest` for `dist-demo`; common browser failures | pass 5 | outside D1; on the tranche cursor |

P11-G1 and P11-G2 are closed. **Declared limits:** FP6-1..FP6-3, FP6-7, FP5-3, FP5-4, FP5-7; Bp11 G-4 (a forged `rekeyedFrom`) with cB12 I-1 (a hand-edited skipped status) and I-2 (an unread `rekeyedFrom.report`); Bp12 G-2 (key grain is a verdict); Bp12 G-3 (the base-program premise, measured per P12-G1).

---

## P12-6 · Pass-13 plan

### P12-6.1 Routes

| route | status | pass-13 work |
|---|---|---|
| D1-B | ADVANCE, count 1 | no route work that changes kit code. Re-measure the whole bar from committed bytes; P12-G1 read-only. The pass-13 critique is the second clean pass |
| D1-G, D1-D′, D1-A, D1-C, D1-E, D1-F | unchanged | none; triggers watched |

**Why the kit is frozen.** The second clean pass must judge the bytes the first one judged. A judge edit in pass 13 would put code in front of the pass-13 critic that no clean critique has yet passed, so pass 13 would be the first clean pass of that code, not the second of this kit. If the pass-13 route finds a defect, it records it as a gap with its measurement and does not patch it; the agglomeration then reads it under §P2-6.5 (a defect that maps to a listed item re-opens it and the count restarts at 0).

### P12-6.2 Order

1. **Housekeeping.** This part is committed by the driver before any pass-13 seat (S-01). `.claude/worktrees/bl/D1/p11/` and `p12/` are removed (both empty).
2. **Route.** `K13` = `K12` with `results/p13/` in place of `results/p12/`. `lib/`, the four judges, `LAW.md`, `frozen/`, `authored/` and `floor/` are byte-identical to `K12`'s; the route proves it with `diff -r` excluding `results/` and the run scripts, empty but for results-path re-pointing printed by diff (as `K12/tools/repointed/RESULTS-PATHS-p12.txt`). `6fdd4ec7…` is replayed from two fresh HEAD worktrees, one `--twice`. Toolchain, package, cascade, peer, W-D.1 §0 and the tally re-run on the replayed tree and the fresh floor base. **Browser:** no `src` file or code line moves; the committed reports stand and the tally re-runs, as pass 12. The kit and every result are committed before the critic launches.
3. **Critique.** A fresh critic who authored nothing in passes 2-13, the pass-6..12 critics included, writes and hashes the battery before reading the kit or `B-proto.md`.
4. **Pass-13 agglomeration.** If the critique re-opens nothing and maps no finding to a listed item or to an edict clause the list leaves out, the count reaches 2 and the agglomeration writes the convergence record (§P12-6.6).

### P12-6.3 Route work

| id | build | holds |
|---|---|---|
| route · frozen kit | the `diff -r` proof of §P12-6.2 step 2, committed | S-01, S-13 |
| route · P12-G1 | a committed listing of every floor row's touched paths (from `floor/rows/`), with the count under `tests-visual` (expected 0), and `baseProgram()`'s 153 specs re-read and equal to the floor base's own `tests-visual/**/*.spec.ts` minus captures on the fresh floor-base worktree | the premise of S-14's extent, as a measured fact |
| route · re-measure | the §P11-6.4 bar as below, every number from this pass's own runs | all 27 |

### P12-6.4 What pass 13 must prove

§P11-6.4's bar, re-met: `6fdd4ec7…` replayed, rerun a no-op; 19 clauses at 0; verify:package CLEAN at 2,920,386; cascade GREEN against the floor base `6773b4ec…`; 428/428 base-green held through the tally; `./motion-core` keyframes-free on all three arms; `seal.test.ts` 26/26 or more; vitest 0 failed; the floor plant KEPT on the landed engine, LOST with line 168 reverted.

**The battery must plant** (the critic chooses its own rows; these are the floor):
- every committed `browser-seat/2` report, discovered, in every tally slot and in `rekey`'s base; F6 through every row, never 0; F7's ten rows, 2; each touched-spec pair on its own a verdict and its F6 analogue RED; a base missing one base-origin spec, 2;
- **the extent sweep's other rows**, which pass 12's critic reached only through regressions: `rekey` against a tree whose code digest is not the chain's final, and a base spec the chain does not land; `browser-select` with a `--root` off the final digest and a frozen step with neither move list nor row; `peer-closure --base` missing a declared-free entry or one of its `broken` lists, and `--floor-base` off S1's digest; each per Bp12 §1's stated reading;
- P12-G1's premise against the route's listing;
- regressions, each by path and re-hashed to its record: the pass-12 critic's battery (`c6fdf555…`, `run12.sh`), the pass-11 critic's (`317fd849…`) with `f7.sh`, the pass-10 critic's (`7b7b5303…`), the pass-9 critic's (`748826fb…`), the 402 rows, crash8, the route's batteries (`tools/batteries-p12.sh`, four arguments: built tree, unbuilt tree, floor base, scratch dir; cB12 I-3), P9-R1's PC/PCG/PCX/PD plants, P9-R2's MIGRATION plants, P10-R1's floor plants.

### P12-6.5 Convergence criterion

§P2-6.5 unchanged; the checklist is §P3-9's 27 items, frozen. **B's two-clean-passes count is 1.** The pass-13 critique moves it to 2, and D1-B converges, if the critique re-opens nothing and maps no finding to a listed item or to an edict clause the list leaves out. A closed item whose §P12-7 hold column fails on the critic's measurement is re-opened and the count restarts at 0. A finding in a declared limit (§P12-5) is INFO.

### P12-6.6 What the convergence record will carry (at the pass-13 agglomeration, if pass 13 is clean)

- **The converged route:** D1-B, sealed modules, flat; the kit `K13` (= `K12` in code), LAW §1-§14, the seal B0-B18, the pin, the nine floor rows and the chain's MIGRATION rows under `## 11.0.0` with no tranche id (P9-R2 (a)).
- **The chain:** 126 steps, digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files, and its replays (passes 11, 12, 13, route and critic); the floor base `6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb` over 1,354 files (P10-R1 (a), P11-F1).
- **The one rebound datum:** S70's `.bundle-ratchet`, 2,920,386 (floor 2,913,546, +6,840).
- **The rulings it rests on:** R-1..R-10 as amended, X-10, P3-R1..P3-R9 (P3-R9 as re-worded by P4-R3), P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2, P8-R1..P8-R3, P9-R1..P9-R2, P10-R1, P11-R1.
- **What passes to wave formation:** W-D.1 (`waves/W-D.1.md`; `waves/INDEX.md:47`, families F-55..F-59, the one wave D1 feeds), with P9-G6's re-pointing to the converged kit and `6fdd4ec7…`, VALUE-SCC over `src` and `scripts`; W-D.1 §0's five items (0 / 1 / 5 / cured / 3; items 2, 3, 5 for W-D.1 §3 steps 5 and 7); the version bump as the landing's (Bp10 G-4); the full browser runs as pass 8's carried by byte-identical trees (Bp11 G-1, Bp12 G-1); W-C.2's appendix-A defects as that wave's formation input (P10-G5); FLOOR.md's stale recipe line (P11-G3).
- **What stays held:** G-01..G-12 and D′'s gaps with the bank; P7-G5, P5-G3, P5-G5, P5-G8 on the tranche cursor; the declared limits of §P12-5.

---

## P12-7 · Open gaps, enumerated (the pass-13 checklist)

§P3-9's list carries forward with its text frozen. No item is added in pass 12.

| item | pass-12 critic | entering pass 13 | what holds it closed |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | this part committed; the pass-13 kit and results committed before judgment; `K13` code byte-identical to `K12` |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P11-R1 on their arms, landed and measured; the datum rebound once |
| S-04..S-08 | CLOSED | CLOSED | gate at 0 on every clause; the floor plant KEPT, LOST with line 168 reverted |
| S-09 | CLOSED | CLOSED | `6fdd4ec7…` replayed idempotently, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN listed, RED unlisted, against `6773b4ec…` |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | every base-green key accounted for through the tally (428/428/0/0, 0 unbased); capture exclusion stated, printed, and a capture spec in `--route` a throw |
| S-13 | CLOSED | CLOSED | regressions identical, every earlier battery (the pass-12 critic's included) runnable on the pass-13 tree |
| S-14 | CLOSED | CLOSED | B17 0; every gate throw exits 2, import time included; every kit judge exits 2 on a throw or a degenerate input on every input argument: a wrong-schema, wrong-kind or partial report in every slot, a flag with no value, an absent or degenerate `SEQUENCE.json`; no judge reads a malformed input as an all-clear: F6 never 0 through every committed report in every slot; each compared input covers the other as Bp12 §1 states |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | regressions identical |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 owns the class; its reader throws on a peer-less, whitespace-only and subpath-less row; `./motion-core` keyframes-free |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count entering pass 13:** 27 items, 27 closed, 0 open. Two-clean-passes count: **1**.

**Held with the bank.** G-01..G-12 and D′'s gaps, unchanged.

No route converged in pass 12. D1-B converges at the pass-13 agglomeration if the pass-13 critique is clean.
