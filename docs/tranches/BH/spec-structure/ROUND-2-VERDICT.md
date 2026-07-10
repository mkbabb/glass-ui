# Round-2 Verdict — the Constellation Structure Standard

**Role:** agglomerating synthesis closing round 2. **Min convergence gate:** 68%.
**Cut HEAD verified:** `c3621f08` (post BH.B2.0 alias-codemod `ca988a76`).
**Disposition:** the spec's SPINE is sound and proven; it is **not shippable verbatim**. Eleven blockers folded into the now-canonical `STRUCTURE-SPEC.md`; eight genuinely-contested / needs-execution-proof items become round-3 directives.

---

## Scores

| Lens | Convergence | One-line |
|---|---|---|
| aristotelian-proportion | **70%** | Spine sound; the divining-rod *unity* claim is refuted by a live DI-context case; backend length ungated; worst god-file class undrainable. |
| performance-mechanics | **69%** | Flatten is +0-gzip clean (independently confirmed at `vite.library.ts`); §2.6 breaks the SOURCE @import graph for HMR (measured DIST-only); 28-reach PROMOTE chunk delta unmeasured. |
| migration-enforcement | **68%** | Design sound + mostly proven; the NAMED instrument mis-groups the tests tree and would half-migrate; numbers are pre-B2.0; `proof:no-tier-literal` unprototyped. |
| dx-readability | **78%** | Atomic unit is SOTA-convergent and praised; flat-namespace legibility bar left as a vibe; HYBRID instrument correct but must be pinned against stale prototypes. |
| **Aggregate** | **~71%** | Above the 68% floor. Close after the folded edits + the eight round-3 proofs. |

---

## The decisive blockers (all four lenses grounded in the live tree, not the prototype reports)

### FOLDED IN (judged correct — resolved in the canonical spec)

**B-1 — the DI-context split-brain refutes §1.5's unity claim (ALL FOUR lenses converge).**
`dock/composables/dockContext.ts` is a `createStrictContext` provide/inject module read cross-component by **5 non-dock components** (verified live: `ui/slider`, `ui/select`, `ui/popover`, `ui/dropdown-menu`, `custom/hover-popover`). The two ends of the rod give OPPOSITE verdicts: T3's `EXCLUDE-DI` count (§1.3) → single-family, do-not-promote; G4's guts-RED (§6) → illegal cross-component reach, promote-or-barrel. Every "legal" resolution was broken: barrel-route drags `GlassDock.vue` + all dock SFCs into 5 foreign chunks (the exact B4 heavy-drag the spec forbids); promotion had no earned home (DI-excluded from the count that would justify it); leave-buried keeps G4 RED. **Resolution folded:** a THIRD rod case — a context *provided by one component and read by ≥2 FOREIGN components* is a genuine shared context primitive → PROMOTE to a lightweight shared context leaf (`composables/context/`), carrying only the `InjectionKey` + types + helper pair, no SFC. This is chunk-clean (the provider and all readers import it UP, an `components→shared` legal edge; G4 greens, T3 satisfied). The `EXCLUDE-DI` carve is narrowed: exclude DI wired WITHIN one family; a cross-family-read context is a shared leaf. `dockContext.ts` — which ALREADY imports `createStrictContext` from `src/composables/context` — moves there. §1.5's "single decidable rule, not two" softened to "one census machinery, three placement cases."

**B-2 — the migration instrument mis-groups the tests tree (three lenses + verified live).**
The spec groups `{src, tests}` as both-relative/`@glass` 0×. FALSE at HEAD: tests carry **123 `@glass/components/(ui|custom)` specifiers, only 2 relative-into-src**. The `resolve-and-recompute-over-relative` pass finds nothing in tests and SKIPS the mirror — the broken half-migration the spec itself names fatal. **Resolution folded:** the correct instrument is `{src → resolve-and-recompute (relative)} + {demo, tests → segment-drop via @glass (zero depth arithmetic)}`. §3/§7 re-grouped; every migration NUMBER re-tagged a pre-B2.0 snapshot to be re-run at cut HEAD (the "settled by evidence" claim is invalid for the migration lane until re-measured).

**B-3 — backend file-length is UNGATED; edict-6 enforcement literally unmet (two lenses + proto4).**
§6 G2 unifies the 500 ceiling across `.ts/.vue/.css` ONLY; §5.2 tabulates a Python `~300–500` ceiling with NO gate-arm (ruff's `C901/PLR0915` measure FUNCTION complexity, not file length). 41 floridify Python god-modules (`wiktionary_parser` 1199, `search/engine` 1187, `caching/manager` 833) go uncaught. proto4 BUILT the missing gate (`proof-backend-structure.mjs`, born-RED 41 god-modules). **Resolution folded:** §6 gains G9 `proof:backend-structure` — a per-language `wc -l` line-ceiling arm (hard 500 raw / soft 300) + the §5.1 grammar arms + a per-language import-direction resolver, with the same born-RED + self-test discipline.

**B-4 — inline SFC `<style scoped>` has no proportionate carve (two lenses + proto3 GAP-6).**
G2 correctly counts a `.vue`'s RAW lines including `<style>`; §2.6 addresses only `src/styles/*.css` FILES. So the worst god-files are undrainable by-the-book: speedtest `SpeedtestResults.vue` 2265L (~1350 style); glass-ui `Slider.vue` 475/278, `ContinuousTimeline.vue` 351/315. **Resolution folded:** §2.6 canonizes `<style src="./styles/<Name>.css">` extraction into the colocated `styles/` dir AND exempts the extracted CSS from the SFC line count (the shader-literal single-artifact precedent). Byte-neutral for glass-ui — SFC scoped CSS already folds to `/styles` at build (AN.W1); the mechanism exists, the spec just never named it as the carve.

**B-5 — §2.6 breaks the SOURCE @import graph; "pure source-tree reorganization" is false (performance lens).**
The byte-clean proof was `diff dist/styles exit 0` — **DIST-only**, via `copyStyleAssets` which never runs in dev. But `demo/demo.css` `@import`s `../src/styles/index.css` for HMR, and `index.css` uses source-relative `@import "./dock.css"`. Physically moving `dock.css` while keeping that `@import` UNCHANGED dangles the SOURCE @import (Vite resolves it relative to `src/styles/` at dev-transform), killing the live demo for every clean family. **Resolution folded:** §2.6's "pure source reorganization / byte-clean" overclaim retracted → "DIST-byte-clean; the SOURCE @import graph requires a named dev-time resolution." The CSS physical-colocation ruling STANDS but its execution is gated on a dev-time resolver (rewrite `index.css` source @imports to the colocated paths + build-transform back to flat, OR a Vite dev alias) proven to survive HMR — a round-3 directive.

**B-6 — §4P.5 graduation predicate double-counts `views/` + fold-set omits config/types (aristotelian + proto3 GAP-2/3).**
The predicate counts `views/` as a ≥3-dimension fold trigger, but §4P.2 rules `views/` NEVER folds — a domain graduates on a signal that includes the one dimension the fold cannot touch. The fold-set `{ui,state,api,composables,index}` omits `config/`, `constants.ts`, `types/`, leaving `config/survey.ts` unresolved (survey-owned per colocation, app-global per §4P.8). **Resolution folded:** `views/` removed from the trigger set (it triggers-but-stays-thin, stated explicitly); the fold-set extended to `{ui,state,api,composables,lib,config,constants,types,index}` with per-leaf T3 deciding config/type placement.

**B-7 — §5.1 infra-ring carve is unenforceable; constants unspecified (aristotelian + proto4 GAP-3).**
The infra-ring SET is given as open EXAMPLES and the scatter threshold is never stated — proto4 had to hardcode a ~20-name allowlist + a "≥2 distinct domain stems" threshold; a different auditor gets a different verdict, breaking edict-1's ONE reproducible standard. **Resolution folded:** §5.1 fixes both constants — the scatter threshold is **≥2 distinct domain stems in a type-dir = layer-by-type scatter**, and the infra-ring is defined by CRITERIA (cross-cutting, runs on every domain, carries no single domain's rules) with proto4's seed allowlist named.

**B-8 — no shared-domain-TYPES carve; mechanical T3 shreds a schema registry (aristotelian + proto4 GAP-4).**
floridify `models/` has 126 importers; blind dissolution shreds it into 8 domains behind 126 rewrites — the "shredded not beautiful" failure. A Pydantic/dataclass schema registry read by ≥2 domains is the TYPE-analogue of the infra-ring. **Resolution folded:** §5.1 adds a shared-types carve distinguishing "a domain's OWN types severed from its logic" (fold into the domain) from "a schema registry ≥2 domains genuinely share" (stays shared, like the infra-ring).

**B-9 — `proof:no-tier-literal` (G7) is unprototyped + scan-recursion unspecified (migration lens).**
It is the STANDING anti-recouple witness that makes the clean break permanent, and the ONLY new gate with no script in `proto-gates/`. 14 tier literals hide in `scripts/` subdirs (aurora-profile, lib/, fixtures/) a top-level-only scan greens past. **Resolution folded:** §6 G7 tightened — RECURSE `scripts/` subdirs, born-RED at ~830–838, mandate the anti-evasion self-test bite; the script ships in round-3 with the other four.

**B-10 — orchestration/use-case tier has no home; main.ts invariant contradicted (proto3 GAP-1, proto4 GAP-2).**
floridify `lookup_pipeline.py` composes 5 domains — neither a single domain (can't colocate) nor layer-by-type scatter. speedtest has NO `main.ts` (bootstrap is inline in `index.html` for LCP) — the spec's own exemplar violates the stated `main.ts` invariant. **Resolution folded:** §5.1 names a `pipelines/` (backend) / app-service composition tier that imports domain barrels DOWNWARD; §4P.11 names the bootstrap CONCERN, not the `main.ts` FILE.

**B-11 — non-component peers + demo-taxonomy ceremony (aristotelian openQ + dx blocker 3).**
After flatten, `components/_shared/` (a util dir) and `PROCEDURAL-SUITE.md` (a doc) become non-component peers the machine-locked "every `components/*` in the README domain-map" gate demands rows for. And §4S.4's closed 5-member subtype taxonomy dir is proportionate for glass-ui's rich demo but imposed ceremony for a small sibling. **Resolution folded:** §3 classifies non-component `components/*` entries as domain-map-EXEMPT; §4S.4's mandated taxonomy dir is scoped above a story-count/complexity floor.

### DEFERRED to round-3 directives (genuinely contested OR needs execution proof)

- The FLATTEN sub-grouping (flat-92 vs a light domain sub-grouping) — folded a DECIDABLE legibility trigger into §3 (default flat + gated README unless the metric trips), but the final flat-vs-grouped call is an execution-census outcome, not a vibe.
- src→`@glass` whole-tree migration re-open (retire resolve-and-recompute entirely) — the migration lens's strongest open question; BH.B2.0 is the proven 279-file whole-tree precedent.
- The dev-time CSS resolver + HMR-survives proof (B-5's execution half).
- The 28-reach PROMOTE class per-route chunk-graph measurement (§7's overclaim: +29 gzip covers the two FOLDS only).
- proto1/proto2 re-seed post-B2.0 + re-measure all migration numbers at cut HEAD.

---

## What the prototypes proved (and the stale-base caveat round-3 must not miss)

**PROVEN (load-bearing, survives independent scrutiny):**
- **The FLATTEN is +0-gzip clean and executable.** proto2 ran the whole-tree flatten over all 92 families: typecheck exit 0 on src+demo AND the tests project, 0 TS2307, 0 package.json export keys changed, gates re-rooting and passing. Independently confirmed at `vite.library.ts:58-59` — dist chunks key on the subpath ENTRY NAME (`src/subpaths/*.ts` basename), fully decoupled from source path, so the tier elision cannot change the emitted chunk set. The reka-77-flat SOTA precedent + 6 measured `ui→custom` UPWARD import edges (a "base" tier importing the "composite" tier) prove the two-tier encodes no layering invariant — pure provenance sediment. **This is the edict's headline question and it is settled.**
- **The CSS DIST cascade byte-identity holds.** `diff dist/styles` exit 0 across 106 files, aggregate sorted-hash parity, `dist/*.js` deterministically invariant. The published mechanism is sound; the flaw is purely SOURCE-side (B-5).
- **G7's atomicity is real.** proto1 verified the concrete false-green: as-shipped `proof:colocation` silently drops `dock` from its target list the moment dock leaves `custom/` while staying exit-0. The re-root MUST land in the same wave.
- **The born-RED + self-test-bite discipline works** — 4 of 5 new gates prototyped with self-tests (colocation-globality 6/6, depth 5/5, import-boundaries 9/9 FAIL-on-HEAD-by-design, css-ownership 5/5). proto4's meta-finding (a structural gate ships false-green silently without a negative control) validates the discipline.
- **§4-PRODUCT is ~85% a DESCRIPTION of speedtest's live tree** (proto3) — the spec was reverse-engineered from a real app, so it fits; its value concentrates in the 7% it changes + the 8% it self-contradicts (all folded above).
- **The backend grammar is language-neutral** (proto4) — one infra-ring/scatter heuristic works identically across Python, TS, Rust; a clean 20-file Rust service green by construction; two real upward-import leaks caught matching the hand-census.

**THE STALE-BASE CAVEAT (round-3 must reject, not fold):** proto1 and proto2 seeded worktrees BEFORE BH.B2.0 landed (proto2's base predates codemod `ca988a76`) and both report "`@glass` does not exist, 0 occurrences, collapse the HYBRID to ONE uniform resolve-and-recompute pass." **This is the documented stale-worktree trap.** At live HEAD `@glass` EXISTS (tsconfig.json:18, vite.config.ts:22, vitest.config.ts:22, all labeled BH.B2.0; 170 demo + 109 tests files ride it). The prototypes' headline "the @glass premise is false, re-measure everything" recommendation is **stale in the opposite direction** and acting on it would BREAK the instrument. The spec's HYBRID is CLOSER to correct; it needed only the tests-regrouping fix (B-2). Round-3 prototypes MUST re-seed at cut HEAD before their migration measurements are trusted.
