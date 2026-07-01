# BH PASS-1 RESEARCH — FRICTION-HISTORY MINING (lens: friction-history)

**Date:** 2026-06-30 · **Branch:** `tranche/BG` (BH shares the branch) · **HEAD (verified):** `e550f1b0` (the BG coherence audit fully folded at `e550f1b0`; BH is the second monolithic pass) · **pkg:** 4.2.0 parked → cut jointly with BG as 5.0.0
**Scope:** the FIRST BH coherence pass — establish the friction-history baseline AGAINST the amended BG (not the pre-coherence-audit BG). Mine the BH-specific friction list + the BG friction taxonomy (`BG/audit/RESPEC-COHERENCE/COHERENCE.md`), verify the named incidents on disk, taxonomize, verdict repeat-risk.
**Method:** read SEED-CONTEXT + BH PLAN.md + BG COHERENCE.md + BG pass-1/pass-2-research-friction-history + BH research synthesis (PASS1/2/3) + lane reports. Every load-bearing claim INDEPENDENTLY VERIFIED on disk this pass (git log, `package.json`, `useDragMorph.ts`, the gate set's `readFileSync` sites + tags, the god-module census, the api-migration map, `proof:no-god-module`/`proof:peer-conformance` source).

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (run at open AND close; siblings intact; fence honored — zero writes outside `/Users/mkbabb/Programming/glass-ui`, this file the only write).

---

## 0. ONE-SENTENCE BASELINE

BH is INFRASTRUCTURE (export surface, docs, gates), so the visual/token traps (CLASS K/M/N) bind it less than BG — but BH carries the SAME deferral-CLOSURE disease in one specific, LIVE, cross-tranche shape: **the kf-peer↔snap-binding incomplete pairing**, where BH landed the consumer-side adaptation (B1-W3 snap-excise) WITHOUT the surface declaration it requires (the kf peer floor bump), and the fix was correctly found-and-routed by BG's coherence audit — but ONTO BG's build-map ONLY, leaving BH's OWN plan docs (PLAN.md + bh-interleave-map.md) unupdated. The repeat-risk verdict is concentrated in THREE places: (1) the kf-peer one-sided fold (the inverse incomplete-pairing, the seed's "first concrete cross-tranche coherence test"), (2) the 2 ENOENT-crashers — correctly IDENTIFIED + sequenced but NOT YET FIXED (PENDING [WS12], gated last-act), (3) the 4.2.0-snapshot drift in BH's three census counts (god-module split, /api 203-row map, subpath enumeration) — all post-WS12 re-baseline residuals the plan acknowledges but which the live tree has begun to move under.

---

## 1. THE SEED'S THREE NAMED FRICTION TESTS — VERDICTS ON DISK

### 1.1 ★ THE CLAUDE.md ENOENT-CRASHER CLAIM — IDENTIFIED + SEQUENCED, NOT YET FIXED (correct-by-design)

**Seed claim:** "BH's own Pass-1 research found 2 ENOENT-crashers in the gate set that would break on a naive CLAUDE.md delete. Were these actually fixed, or just named? Re-verify against current gates."

**Finding: the "2 ENOENT-crashers" framing is a precise sub-claim of a LARGER set, and they are NAMED + SEQUENCED but DELIBERATELY NOT YET FIXED.** Verified on disk:

- **The larger set:** 56 `readFileSync` references to `CLAUDE.md` across `scripts/proof-*.mjs` (`grep -rln` count). BH research refines this to the LIVE-contract subset: SYNTHESIS-PASS1 says **18 gates**, PASS-2 says **15 HARD-ASSERT gates**, PASS-3/EXECUTION-PROGRESS settles on **16 CLAUDE-readers** (the de-blinded count; `EXECUTION-PROGRESS.md:312` "16 CLAUDE-readers, not 12").
- **The 2 ENOENT-CRASHERS** are named EXACTLY at `EXECUTION-PROGRESS.md:312`: **`proof:claude-structure-sync:74` + `proof:doc-consistency:197`** ("the 2 ENOENT-crashers (structure-sync:74 / doc-consistency:197) guarded first"). VERIFIED on disk:
  - `proof-claude-structure-sync.mjs:74` — `readFileSync(CLAUDE_MD, "utf8").split("\n")` UNGUARDED (no `existsSync`); gate tags `["local","ci"]`.
  - `proof-doc-consistency.mjs:197` — `readFileSync(CLAUDE_MD, "utf8")` UNGUARDED; gate tags `["local","ci","release"]`. **This one is RELEASE-tagged** → a naive CLAUDE.md delete crashes the cut battery (`--run full`).
  - (A 3rd reader, `proof:readme-meta-clean:20`, IS already `existsSync`-guarded — `existsSync(p) ? readFileSync(p) : null` — so it would NOT crash; it would silently skip its CLAUDE.md arm. It is in the 16-reader re-home set but is NOT one of the 2 crashers.)
- **FIXED or named?** NAMED + SEQUENCED, NOT FIXED. Both gates are PENDING:
  - `B5c-gate-rehome` (EXECUTION-PROGRESS phase 18.10, `[WS12]` PENDING) re-points the 16 CLAUDE-readers via `canon-doc.mjs`; the row text says "the 2 ENOENT-crashers (structure-sync:74 / doc-consistency:197) guarded first."
  - `B4f-claude-delete` (phase 19.2, `[WS12]` PENDING, ABSOLUTE LAST) gates the delete on `rg -l 'CLAUDE\.md' scripts/proof-*.mjs == 0` + `proof:claude-deletable` born-RED→GREEN-at-delete + a `--run full` /tmp siblings-absent dry-run.

**VERDICT: the plan is CORRECT-BY-DESIGN, not deficient.** The strict order is `redistribute (B4b) → re-home gates (B5c) → delete (B4f, absolute last)`; the delete is GATED on `rg-count==0`, so a naive premature delete is structurally impossible if the plan executes in order. The residual risk is NOT the design — it is that B5c/B4f are BOTH `[WS12]` PENDING (un-run, deep in the post-close tail), and the 2 crashers crash LIVE TODAY if anyone touches CLAUDE.md before B5c lands (the `--run full` battery would crash via `doc-consistency:197`). This is a process-ordering exposure, not a missing fix. **Repeat-risk: LOW (sequenced + gated) provided the B5c→B4f edge holds; the gate `proof:claude-deletable` is the born-RED forcing function.**

### 1.2 ★★★ THE kf-PEER BUMP INCOMPLETE-PAIRING — A LIVE DEFECT + A ONE-SIDED FOLD (the central finding)

**Seed claim:** "Check the kf-peer bump (B1-W2/B1-W3, already landed at 0d6b9f8a/ba23c086) for the incomplete-pairing shape BG's coherence audit found (a surface change landed without its dependent consumer-side fix — useDragMorph.ts:26's missing retarget re-roll). Does BH's plan have a follow-up wave for this, or is it an orphaned defect BH created and never closes?"

**Finding: the seed's framing is INVERTED by the current tree, and the answer is subtle. The pairing IS incomplete, but in the OTHER direction — and BG's audit found it, but folded the fix ONE-SIDED.**

VERIFIED on disk, three facts:

1. **B1-W3 (`ba23c086`, the snap-excise) ALREADY LANDED the consumer-side adaptation.** `useDragMorph.ts:325` now ships `snap: targetsOf().map((t) => t.center)` inside the `new Draggable({...})` construction (2 `snap:` references; the header comment lines 20-31 declare "the BB-era published-surface interim is EXCISED — glass-ui owns NO `decayRest` + nearest-center + `spring.target` re-roll"). So the retarget re-roll the seed worried was *missing* is the opposite: it was EXCISED, and the code now DEPENDS on kf-5.1.0's native `DragOptions.snap`. `proof:drag-morph.mjs:295` asserts the native-snap form is present AND the dual-path re-roll (`decayRest(`/`spring.target =`/`commitSnapOnRelease`) is GONE — gate GREEN.

2. **The PEER FLOOR was NOT bumped — `package.json:1078` peer `@mkbabb/keyframes.js: "^5.0.0"` STILL.** `DragOptions.snap` first ships in kf 5.1.0. The dev-dep IS `^5.1.0` (line 1116), so the cut env resolves 5.1.0 and the in-tree gate sees the snap option — but **a CONSUMER resolving exactly `5.0.x` against the `^5.0.0` peer gets a `Draggable` with NO `snap` option → the drag silently never snaps to a detent** (the CLASS-L reka/peer binding-no-op shape, one rung up: a kf-API binding, not a reka one). No device-free gate catches it (the installed dist the cut resolves IS 5.1.0). `git log -S '"@mkbabb/keyframes.js": "^5.1.0"' -- package.json` finds ZERO commit bumping the peer floor.

   **This is the inverse incomplete-pairing: the consumer-side adaptation (B1-W3 snap-excise) landed WITHOUT the surface declaration (the peer floor bump) it REQUIRES.** Same disease class as G2's near-miss (a wave lands one half of a dependent pair), but here the missing half is the floor, not the consumer code.

3. **BG's coherence audit FOUND it AND routed the fix — but ONE-SIDED.** BG `COHERENCE.md §2.C1` (88% conv) records "kf peer `^5.0.0` vs the shipped 5.1.0 `DragOptions.snap` — a LIVE broken-gesture defect"; the `AMENDED-COHERENCE-PLAN.md §5` (G4) folds the fix: "**Re-home the kf peer bump `^5.0.0 → ^5.1.0` onto `BH-B2.1-swap`** (the FINAL pre-cut package.json single-writer, after WS5/WS6/WS12 before BG.W-CUT — B1-W2 is CLOSED, cannot be the owner) + the floor-vs-API gate-hardening into `proof:peer-conformance`" (MR-4 fold: **`BG.W-GATE-FIELD-AURORA` owns the floor-vs-API clause**). The obligation IS recorded in BG's build-map (`bg-build-map.md:720,1184,1292` — "the kf peer BUMP `^5.0.0 → ^5.1.0` itself is the `BH-B2.1-swap` deliverable per §G4").

**THE COHERENCE DEFECT (this lens's #1 finding):** BG's build-map carries the kf-peer obligation on `BH-B2.1-swap`, but **BH's OWN plan docs do NOT.** Verified by grep:
- `BH/PLAN.md` B2.1-swap spec (§4 B2, line 68 `W-regen-swap`): names "glob-swap + delete src/subpaths/ + regen package.json exports + flatten-subpath-types.mjs + public-surface.spec" — ZERO mention of the kf peer bump.
- `BG/execution/bh-interleave-map.md:40` (the BH-side interleave row for B2.1-swap): same — "re-baseline checkpoint (captures WS6 +2 siri, WS5 viz deletes/renames)" — ZERO mention of the kf peer bump.
- `proof:peer-conformance.mjs` today asserts ONLY the **value.js singleton identity** (kf's value dep ⊆ glass-ui's value peer); it does NOT carry the **kf floor-vs-API** clause (kf peer floor ≥ 5.1.0 when `useDragMorph.ts` references `snap:`). That clause is NOT YET LANDED (it is folded onto `BG.W-GATE-FIELD-AURORA`, which has not built).

**VERDICT: this is NOT an orphaned defect BH never closes — BG's audit owns the fix. BUT it is a ONE-SIDED FOLD that violates the seed's explicit "BOTH sides of the interleave must agree post-fold" rule.** The BH PASS-1 amendment MUST (a) APPEND the kf-peer `^5.0.0 → ^5.1.0` bump + the `proof:peer-conformance` floor-vs-API clause to BH PLAN.md's B2.1-swap (W-regen-swap) spec AND to `bh-interleave-map.md:40` (the interleave-agreement obligation), and (b) record the cross-ownership note (the bump is a BH deliverable; the floor-vs-API gate-hardening is owned by `BG.W-GATE-FIELD-AURORA`) so a resumed BH execution does not drop the bump (the §2.4 "easy to drop one" risk). **Repeat-risk: MODERATE-HIGH until the BH plan docs carry it — the live defect persists on disk (peer `^5.0.0` + a snap-requiring consumer), the fix is gated on an UN-run [WS12] wave, and the two plan sides DISAGREE about who owns it.**

### 1.3 THE "16 god-modules, BG owns 8, BH owns 3" SPLIT — STILL HOLDS, but the BH-3 are no longer god-module-driven (a drift, not a defect)

**Seed claim:** "Does this split still hold given BG's coherence audit ALSO touched carve ownership (G7's post-WS9 re-carve owner for ladder.css/shell.css, G6's canon-home carve)? Any double-claimed or now-orphaned carve target?"

**Finding: NO double-claim, NO orphan — but the BH-3 carve justification has DRIFTED from "god-module split" to "cohesion relocation" (the targets are all <500L today).** Verified by the live census (`find src ... | wc -l`, shaders excluded):

- **Current >500L non-shader files (10):** `GlassDock.vue 711` (BG-WS2), `createCanvasLifecycle 695` (BG-WS4), `useWebGPUCanvas 606` (BG-WS4), `useDockFission 604` (BG-WS2, the carve OUTPUT), `useDockContextSilhouette 551` (BG-WS2 DELETES it), `useGlassBackdropLuminance 534` (BG-WS4), `useBlobSatellites 533` (BG-WS5 leaf), `SegmentedTabs.vue 512` (BG-WS4 TABS-KEYBOARD), `useGooDotMatrix 508` (ratchet-grandfathered), `api/index.ts 505` (BH B2.2 fold-DELETES it).
- **`proof:no-god-module` RUNS RED TODAY** on `ladder.css 527` + `shell.css 510` (BG-WS3/G4's 9-site carve clears them — BG `COHERENCE.md §2.M1` owns the "no post-WS9 re-carve owner" + the GLASS-vs-PAPER grain DISJOINT split + the WS12-CENSUS re-carve owner). **These are BG-owned, NOT BH.**
- **The BH B2.4a carve targets are ALL UNDER 500 today:** `CarouselContent.vue 375`, `PagerDots.vue 433`, `useBloomUp.ts 449`. None is in the violation set; none is ratchet-grandfathered. SYNTHESIS-PASS3 describes them as ~180L/~170L worm-extractions + a single-consumer relocate.

**VERDICT: the split holds (no double-claimed target, no orphan), BUT the BH-3 are COHESION relocations, not god-module splits** — the 4.2.0-snapshot "16 god-modules" census that assigned "BH owns 3" counted files that either (a) are now <500 (the worm SFCs were carved/shrunk en route) or (b) were never the BH-3 (the live >500 set is entirely BG-WS2/WS4/WS5 + the 2 CSS roots + 2 ratchet-grandfathered leaves). This is a CENSUS DRIFT the plan should reconcile: B2.4a's `proof:no-god-module` gate is GREEN-by-construction for its OWN targets (they don't violate 500), so the gate cannot FORCE the carve — the carve is justified by COLOCATION (`proof:colocation` + the worm-binding assert), not the god-module bound. **No re-carve-owner conflict with BG's G7** (G7's re-carve owner is for ladder.css/shell.css, which are BG-WS3 leaves; BH never touches them). **Repeat-risk: LOW** — the only action is a one-line reconcile in the B2.4a wave doc (justify by cohesion, not by the stale 500-census; note the `proof:no-god-module` GREEN is by-construction not by-clear).

---

## 2. THE COMPLETE BH-SCOPED FRICTION TAXONOMY (the BG A-U classes, BH-vector verdict)

BH inherits the full BG taxonomy (`BG/COHERENCE.md §2`). For each class: does a BH wave carry the vector, and what is the repeat-risk?

| Class | Name | BH recurs? | BH-specific vector + verdict |
|---|---|---|---|
| **A** | headless-green / cardinal | NO (infra) | BH ships ZERO new paint surfaces; its waves are export/docs/gates. The ONE paint-bound BH act is B2.4a's worm carve "byte-identical render π" — BG owns the worm paint at WS11/WS12 (§2.5). BH-vector ≈ none. |
| **B** | orphaned-wave-claim | **LOW-MOD** | BH PLAN.md declares "200 of 203 /api are pure path-swaps" + "exactly 2 by-name asks" + "79 subpaths" — ALL 4.2.0 snapshots that the post-WS12 surface moves under (WS5 viz-deletes, WS6 +2 siri). The plan ACKNOWLEDGES this (§5-1 re-baseline residual) but the doc-says-203/tree-says-N gap GROWS as BG builds. **Watch: the 203-row map + subpath count must re-derive post-WS12, not assert report faith.** |
| **C** | clean-break-rename-misses-consumer | **MOD** | BH's export reshape is the densest clean break in the tranche: subpaths-delete (79) + /api-fold (drop `./api` key) + 3 orphan re-homes + 11 flat-barrel relocates. The 2 by-name asks (muster→/aurora, speedtest→/timeline) are the foreign-consumer surface. `proof:crossrepo-asks` + the 203-row map arm are the catchers. **Watch: B5c MUST cross-reference the gate re-home table against the B2 DELETION set — `accent-tone` reads `src/subpaths/selectable-chip.ts` (deleted by B2.1-swap) AND CLAUDE.md; re-point BOTH arms or ENOENT-break on the half the table ignored** (SYNTHESIS-PASS3 C3). |
| **D** | budget-rebaseline ratchet | **LOW-MOD** | B1-W1 (lucide payload fix) already landed a DOWNWARD rebaseline (the negative-drift externalization). The L15 net-lift-as-ONE-number is folded onto `BH-B2.1-swap` (BG G4 MR — every dist viz/GL chunk in BUDGETS re-pinned as one number, `criticalPath.violations==[]`). **Watch: this is a BH deliverable per BG's G4 fold — confirm it is in BH's plan, same one-sided-fold risk as the kf-peer bump (§1.2).** |
| **E** | ci.yml↔manifest drift | **LOW** | `gates:emit-ci` codegen makes drift impossible-not-detected. B5c re-emits ci.yml + asserts `proof:gen-ci-fresh` GREEN; B2.2/B5b register new gate rows (`proof:subpath-classify`, `proof:consumer-evidence-live`, gate-manifest extract) — each forces a re-emit, caught at the cut. |
| **F** | BOOK/ARCHIVE re-label | **LOW** | BH's B4d evidence-prune (~25-30 of 44 dead `consumer-evidence/` files) + `proof:consumer-evidence-live` (every file gate-referenced OR deleted) is the no-silent-drop forcing function. Well-defended. |
| **G** | structural / god-module | **LOW (for BH)** | BH B2.4a's 3 targets are <500 today (§1.3) — the carve is cohesion-driven, not god-module-driven. `proof:no-god-module` RED on ladder/shell is BG-owned. No BH double-claim. |
| **H** | close-never-runs / provenance | **LOW** | BH's B4f (CLAUDE.md delete) is the ABSOLUTE LAST act, gated on `rg-count==0` + `proof:claude-deletable` + a `--run full` siblings-absent dry-run. The joint 5.0.0 cut rides BG's `BG.W-CUT` machinery (most-hardened). |
| **I** | user-directive-vs-spec | **LOW** | BH is infra; the goo-morph worm directive ("remember this always") is RESOLVED — it ships (`usePagerWorm`/`useCarouselWorm`), BH only CARVES it (B2.4a). The carve's paint re-verify is deferred to BG WS11/WS12 (§2.5). |
| **J** | capability-without-adoption | **LOW** | BH MINTS no primitives; it removes indirection. B6's 3 reusable prompts are doc deliverables, not src capability. |
| **K** | substitution / dead-knob | **NONE (BH)** | BH touches NO token cascade. This is BG's WS3/WS6/WS8/WS9 exposure (MOD-HIGH there). |
| **L** | reka/kf binding silent no-op | **★ MOD-HIGH (the kf-peer crossover, §1.2)** | BH's B1-W3 snap-excise IS the live instance — the consumer adaptation landed, the peer floor did NOT. The fix (the kf peer bump + the `proof:peer-conformance` floor-vs-API clause) is one-sided-folded onto BG's build-map only. **The #1 BH friction vector.** |
| **M** | live-π oklab / grey-by-L | **NONE (BH)** | No BH paint. |
| **N** | light-dark/hsl/scoped-global/slotted | **NONE (BH)** | No BH SFC-CSS. BG's WS8/WS9/WS11 exposure. |
| **P** | rate wall | **LOW** | The BH bands ride `bg-bh-execute.wf.js` (build batch ≤3). Clean. |
| **Q** | session-limit null-crash | **MOD (inherited)** | BH rides the SAME `bg-paint.wf.js` 4-un-guarded-agent-deref exposure (BG §2.A2/§2.2). The 4 null-guards are folded into BG G1/G3, co-applied at execution — a BG fix BH inherits. Not BH-specific, but the BH [WS12] tail is the longest-running stretch (the most session-wall-exposed), so the paint-engine hardening matters to BH's close too. |
| **R** | foreign-tree catastrophe | **LOW-MOD** | BH's B0 scratch-sweep (`git rm --cached`, `git clean`, `rm -rf .playwright .tmp`, `git mv`) is the BH wave with the most filesystem-mutation verbs — ALL scoped under-repo. The deny-backstop is gitignored + literal-prefix-narrow (BG §2.3); the durable fences are the prose + `verify-siblings-intact.mjs` tripwire. **Watch: B0's `git clean -ndX` MUST preview-then-force (never `-x` over-broad), and `git mv BD-CONTINUATION-PROMPT.md docs/tranches/BD/` stays under-repo.** |
| **S** | dependency-floor miscalc | **★ LIVE (the kf peer, §1.2)** | The kf peer `^5.0.0` is BELOW the snap-requiring 5.1.0 floor — the EXACT shape of S (a floor that excludes the required version), inverted (the floor is too LOW for the consumer code, vs value.js `^1.2.0` being too HIGH for npm-latest). The value.js de-straddle (B1-W2, `0d6b9f8a`) is CLEAN (`^0.13.0||^1.0.0 → ^1.0.0`, executed GREEN). |
| **T** | submodule canon-home | **LOW** | BH's B4c precept-extract draws the 4 design docs OUT of the `docs/precepts` submodule into repo-local `docs/design/` (repo-local draft + by-name ask, §2-#5). The `docs/precepts` submodule is NEVER written. Well-defended by the §2-#5 decision. |
| **U** | wrong-uniform / wrong-anchor | **NONE (BH)** | No BH shaders. BG's WS6/WS8 exposure. |

**Concentration for BH:** (1) CLASS L/S — the kf-peer one-sided fold (the live defect + the plan-disagreement), (2) CLASS C — the dense clean-break export reshape + the B5c gate-rehome-vs-deletion-set cross-reference, (3) CLASS B — the three 4.2.0-snapshot census counts (god-module split, /api 203-row, 79 subpaths) that the post-WS12 surface moves under.

---

## 3. OTHER NAMED-BUT-UNRESOLVED FRICTION ITEMS MINED FROM BH RESEARCH

Each VERIFIED on disk; status = is it owned + closed in the plan, or a residual?

1. **The stale ControlSize prose (`search/index.ts:5` + `api/index.ts:500`).** SYNTHESIS-PASS3:25 + lane reports: both files claim ControlSize is "already published" through `/search`, but `/search` forwards ONLY `searchFieldVariants/SearchVariant(s)` — the prose is STALE (critic-verified). The mechanical orphan classification (ControlSize→/forms) is correct; the PROSE is wrong. **Owned:** B2.2 (W-api-fold) explicitly "fix the stale search/index.ts:5 + api/index.ts:500 ControlSize prose" in the same edit. CLOSED-in-plan. Repeat-risk: LOW (named + bounded).

2. **The 3 orphan re-home targets need a wave-author FIAT.** SYNTHESIS-PASS3:154 [FIAT, authoring-time]: Surface→/card, MenuItemVariants→/command, ControlSize→/forms are RECOMMENDATIONS, not mechanical derivations (Surface has a heavier ALT — a new `/surface-axis` subpath). **Owned:** B2.2 records the fiat in the wave doc. Residual: a human judgement at B2.2 authoring, named + bounded. Repeat-risk: LOW.

3. **The post-WS12 re-baseline (the dominant residual).** BH PLAN §5-1 + SYNTHESIS-PASS3:136: the 203-row /api map + the fail-closed classification + `proof:subpath-enumeration` baseline are 4.2.0 snapshots; the binding 5.0.0 versions can only be derived post-WS12 against the landed surface (WS6 +2 siri, WS5 viz deletes/renames). The fail-closed gate FORCES classification of each BG-added dir but cannot pre-judge PUBLISH-vs-INTERNAL for a NOVEL dir (e.g. a siri-waveform subpath) — a human call. **Owned + gate-FORCED:** the mechanical re-run procedure is specced (re-run `regen-exports-failclosed.mjs` + `regen-api-migration.mjs` post-WS12, classify, regen, re-pin, re-emit ci.yml). Residual, named, gate-forced. Repeat-risk: LOW-MOD (the human PUBLISH/INTERNAL call is the one un-mechanizable step).

4. **`flatten-subpath-types.mjs` re-author owed at B2.1, specced not built.** BH PLAN §5-3. The dts-flattener must re-author for the new colocated-barrel emit shape. Residual, owned at B2.1-swap. Repeat-risk: LOW.

5. **The regen still hard-codes `CSS_FONT_EXPORTS` + the `./api` `TYPES_OVERRIDE` verbatim.** BH PLAN §5-4: the B2.2 `./api` drop needs MANUAL removal of that override entry from the generator. Residual, named, B2.2-owned. Repeat-risk: LOW-MOD (a manual edit in a generated-config — the exact "easy to drop one" shape; the fail-closed gate's EXACT_REPRODUCTION assert catches a stale override that no longer reproduces).

6. **speedtest's `vite.config.mjs:1033` build-config string is distinct from the source import.** BH PLAN §5-5 + §B7: folded into the speedtest B7 ask so the migration is complete (drop the dead optimizeDeps string in the SAME ask). Owned. Repeat-risk: LOW.

7. **`words/frontend/glass-ui/` vendored d6 fork — NOT a registry consumer.** BH PLAN §5-6 (inv-11 lineage): owes NO 5.0.0 ask. Disposition note, not a B7 row. Closed-in-plan.

8. **B2 wave-count overflow (9 sub-moves + 4 amendments → 9-10 waves).** BH PLAN §5-7: authored with the amendments as named sub-moves so the band splits cleanly. Accepted residual, structural. Repeat-risk: LOW.

9. **The goo-morph worm carve LIVE near-miss (BG §2.5).** The B2.4a integrator REPAIR dropped stray `centerOf/restSize/tokenPrefix/neckGap` props the patch left on the `useCarouselWorm()` call — a human caught it, NO gate did (the PagerDots hunk did it right, the carousel hunk did not; the CLASS-C/L silent-no-op shape). The carve's paint is DEFERRED to BG WS11/WS12. **Status: REPAIRED on disk** (phase 1.7 DONE), but the paint re-verify is deferred. **Watch (BH-relevant):** BH B2.4a is the same worm-carve family; confirm the B2.4a "byte-identical render π" actually exercises the goo-morph BETWEEN-states worm (not just the dots' static render), so a subtler carve break (a worm parameter silently defaulting) paint-fails at WS11/WS12 rather than shipping. Repeat-risk: MOD (deferred paint + a gate-blind prop-drop class).

---

## 4. REPEAT-RISK VERDICT (the taxonomy + the one-line bottom line)

**The friction taxonomy is INHERITED from BG (A-U); BH's live vectors concentrate in CLASS L/S (the kf-peer one-sided fold), CLASS C (the dense export clean-break + the B5c deletion-set cross-reference), and CLASS B (the three 4.2.0-snapshot census counts that drift under the post-WS12 surface).**

The three seed tests resolve:
1. **ENOENT-crashers:** NAMED EXACTLY (`structure-sync:74` ci-tagged, `doc-consistency:197` RELEASE-tagged), correct-by-design SEQUENCED (B5c re-homes → B4f deletes last, gated on `rg-count==0` + `proof:claude-deletable`), NOT YET FIXED (both PENDING [WS12]). LOW repeat-risk given the order holds.
2. **kf-peer bump:** the LIVE defect persists (peer `^5.0.0` + a snap-requiring consumer at `useDragMorph.ts:325`); BG's audit FOUND it and routed the fix onto `BH-B2.1-swap` + `BG.W-GATE-FIELD-AURORA` — but ONE-SIDED (BH's own PLAN.md + bh-interleave-map.md DO NOT carry it). **MODERATE-HIGH repeat-risk until BH's plan docs are amended to agree.**
3. **god-module split:** holds (no double-claim, no orphan), but the BH-3 are cohesion relocations not god-module splits (all <500 today) — a CENSUS DRIFT to reconcile in the B2.4a wave doc. LOW repeat-risk.

**THE BH PASS-1 AMENDMENT THIS LENS DEMANDS:**
- **[BLOCKING-ish] Fold the kf-peer bump + the `proof:peer-conformance` floor-vs-API clause into BH PLAN.md's B2.1-swap (W-regen-swap) spec AND `bh-interleave-map.md:40`** — both sides of the interleave must agree (the seed's explicit rule). Record the cross-ownership: the `^5.0.0 → ^5.1.0` bump is a BH deliverable; the gate-hardening is `BG.W-GATE-FIELD-AURORA`'s. Mirror the L15 net-budget-rebaseline fold the same way (BG G4 routed it to BH-B2.1-swap too — same one-sided risk).
- **[MED] Add a B5c cross-reference clause:** the 16-CLAUDE-reader re-home table MUST be intersected with the B2 deletion set (`accent-tone` reads BOTH CLAUDE.md AND `src/subpaths/selectable-chip.ts` — re-point both arms or ENOENT-break on the deleted-wiring half).
- **[LOW] Reconcile the B2.4a carve justification** from "god-module split" (4.2.0 census) to "cohesion relocation" (the targets are <500 today; `proof:no-god-module` is GREEN-by-construction, the carve is justified by `proof:colocation`, not the 500 bound).
- **[LOW] Add the post-WS12 re-baseline a CLASS-B no-stale-claim note:** the 203-row /api map + 79-subpath count + the god-module split are 4.2.0 snapshots; re-derive (never re-assert) post-WS12.

**Bottom line:** BH is the most friction-aware INFRASTRUCTURE tranche in the corpus (its 5 convergent facts ARE de-indirection wins, not bug-hunts), and the ENOENT-crasher / kf-peer / god-module tests all RESOLVE FAVORABLY in DIRECTION — the design is sound. The single load-bearing coherence defect is the kf-peer one-sided fold (BG's audit owns the fix, BH's plan doesn't echo it), which is a documentation-agreement defect, not a feasibility blocker. Fix the two-plan-sides-disagree shape and BH's friction surface is clean.
