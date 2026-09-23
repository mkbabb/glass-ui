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
