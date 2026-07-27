# ROUND-1 FINDINGS — the evidence base

12 independent audit lenses over BJ and the 20-tranche archive, run with the success narrative withheld.
**136 findings: 30 blocker · 72 major · 22 minor · 12 observation.**

This file is the SINGLE SOURCE OF RECORD for these findings. `REGISTRY.md` groups them by mechanism and
cites them by id; it does not restate them. Nothing here may be re-raised in a later round without new
evidence — a finding already recorded is not a fresh finding.

Each row carries the mechanism (why the class exists), the evidence (path + command + output), and the wave shape.

---

## PLAN-VS-LANDED DIFF — every BJ.W-* wave id in docs/tranches/BJ/waves/*.md verified against source at HEAD (0371836d) via git log -S, direct file reads, and re-running each wave's own born-RED probe.

_claude-opus-5[1m]_

### BJ-1 — `npm test` is RED at HEAD: BJ.W-REFRACT-LATCH widened the package root and nobody owns the surface pin

**BLOCKER**

**Mechanism.** Every BJ wave closes against gates its own band authored. `tests/public-surface.spec.ts` is a cross-cutting pin owned by NO wave in the tranche, so any wave that adds a root-barrel export lands, self-certifies GREEN against its band gate, and leaves the surface pin RED. The band's §CLOSE stamps 'LANDED' because the band gate passed; the release path runs the suite that actually fails.

**Evidence.** `npx vitest run` at HEAD+worktree: `Test Files 4 failed | 395 passed`, `Tests 4 failed | 2610 passed`. Unique failure: `tests/public-surface.spec.ts:481` (HEAD line) `keeps the exact root runtime surface` — Received adds `armGlassRefract` and `supportsBackdropRefract`. Chain: `src/composables/glass/index.ts:38` `export { armGlassRefract, supportsBackdropRefract } from "./supportsBackdropRefract";` (added by 44621bb4, BJ.W-REFRACT-LATCH) → `src/index.ts:163` `export * from "./composables/glass";`. `git show HEAD:tests/public-surface.spec.ts | grep -n 'armGlassRefract'` → 0 hits; the pinned `rootRuntimeExports` (HEAD line 108, 273 names) never grew. The uncommitted diff to that spec only wraps `it(` in `governedInvariant(` — the assertion body and roster are byte-identical to HEAD, so this is RED at clean HEAD. `.github/workflows/release.yml:47-48` runs `npm test` immediately before `npm publish --provenance`.

**Wave shape.** One wave that adds the two symbols to `rootRuntimeExports` (or removes them from the root barrel per the intended root-bootstrap contract), plus an explicit owner-of-record for `tests/public-surface.spec.ts` so surface-widening waves must touch it.

### BJ-2 — BJ.W-GATE-COLLAPSE — the tranche's user-mandated headline — is ABSENT, and its acceptance instrument was swapped for one that reports success without deleting anything

**BLOCKER**

**Mechanism.** The wave's own §Acceptance names a falsifiable census (line-anchored `^\s*(it|test)\(` over `tests/`, 1032 → 45-55 keeps). No deletion happened. Instead an untracked JSON roster was authored that counts a hand-curated set of 48 'semantic gates' and declares `"ordinaryTestsConsumeBudget": false`. Two instruments now coexist for the same wave, disagreeing by ~1077, and the one that reports success is the one that cannot fail because its denominator is hand-written.

**Evidence.** Census by rev: `git grep -E '^[[:space:]]*(it|test)\(' <rev> -- 'tests/*' | wc -l` → b2293849 (BJ FORMATION CLOSED, the pinned base): **1032**; e7c918f8 (phase 0 close): 1064; **HEAD: 1125** — +93, the wrong direction. Every named kill survives: `scripts/lib/canon-doc.mjs` PRESENT (wave: 'RULED: retire'); `tests/scripts/profile-bundle-value-js.test.ts` PRESENT; `grep -rln 'Object.keys' tests/components/*.contract.test.ts | wc -l` → **8** (wave: strip all 8); 7 zero-assert `tests-visual/*.spec.ts` still inside the `testMatch: "*.spec.ts"` glob (`_capture_css`, `_cohere-capture`, `_cohere-debug`, `_cohere-shadow-debug`, `_fix-glassui-dark-capture`, `_prim-polish-capture`, `_wdelta0-capture`). Counter-instrument: `node scripts/verify-governed-invariants.mjs` → `{"active":48,"reserved":5,"worstCase":53,...}`; roster `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json` carries `ordinaryTestLaw.ordinaryTestsConsumeBudget: false`.

**Wave shape.** Execute the enumerated deletions against the pinned 1032 base and land the light count-guard the wave's OPEN-4 already ruled (one test asserting the line-anchored census ≤ 60, base stated in the test) — then retire the JSON roster, or strike the census clause from the wave and admit the roster is the only instrument.

### BJ-3 — The tranche's enforcement machinery and the sole artifacts of two waves exist only as untracked working-tree files

**BLOCKER**

**Mechanism.** Work is being 'landed' into the working tree and recorded in prose, without being committed. A clean checkout of HEAD has none of it. Because the receipts that cite these files ARE committed, the doc record asserts a state that the git object store cannot produce.

**Evidence.** `git status --porcelain`: `?? scripts/verify-governed-invariants.mjs`, `?? vitest.governed-setup.mjs`, `?? tests/governance/`, `?? tests/styles/tokenGraphDetector.ts`, `?? tests/composables/glass/supportsBackdropRefract.test.ts`, `?? docs/tranches/BJ/addenda/` (206 files, 35MB). `git diff package.json` shows `"test": "npm run verify:governed && vitest run"` — also uncommitted, so at HEAD `npm test` is bare vitest and the governance never runs. `verify-governed-invariants.mjs:13-16` hard-pins `C19_ROSTER_PATH = "docs/tranches/BJ/addenda/.../GATE-SEMANTIC-ROSTER-C19.json"` with `C19_ROSTER_SHA256 = dc05df91…` — an untracked script hashing an untracked doc. `git diff src/composables/glass/supportsBackdropRefract.ts` shows the W8 I-2/I-3 fail-closed + collision-proof-probe-id redress fully written and uncommitted — which commit 4b5bc369's own message already concedes ('mark I-2/I-3 detector redress SOURCE-UNCOMMITTED'). MATERIAL W3's and W5's only deliverables are `addenda/.../W3-GRADED-BACKDROP-ADJUDICATION-C2.md` and `W5-ARISTOTLE-PROPORTION-ADJUDICATION-C2.md` — both untracked.

**Wave shape.** One commit-or-discard sweep: commit the governance system + roster + the W8 redress + the addenda corpus as a single cut, or delete them and strike every committed receipt that cites them.

### BJ-4 — 21 of 50 chartered waves are wholly ABSENT — every born-RED probe still reds at the exact line the wave documents

**MAJOR**

**Mechanism.** The band files record a wave's disposition as a prose Status ('UNION — execution-ready', '§BUILD LANDED', 'PARKED') that is never reconciled against a probe run. Waves whose specs enumerate exact file:line born-RED probes were never re-run, so 'formation-complete' silently reads as progress. Whole bands (PERF W2-W4, STORY W1/W4/W5/W7) have zero source commits.

**Evidence.** Each probe re-run at HEAD, output = the wave's stated born-RED value. STORY W1: `grep -c pageType demo/stories/manifest.ts` → **0** (G-TAX-1); `grep -n 'computed<"hero"' demo/chassis/page/StoryPage.vue` → **:32** (G-TAX-2). STORY W4: `grep -rn story-article-w src/ demo/` → exactly 1 hit, `StoryPage.vue:51`, 0 definitions (G-WID-1); `hero-scale="4"` at `CatalogLanding.vue:18` + `SectionLanding.vue:28` (G-WID-2); `aurora.vue:122 heading="Aurora"` (G-WID-3); `DockStage.vue:194 gap: 2.5rem` (G-WID-4). STORY W5: `find demo/stories -name '*.tile.vue' | wc -l` → **4** (G-PRV-2); `SectionPreviewCard.vue:63 content-visibility: auto` unconditional (G-PRV-3); `grid-cols-1 … lg:grid-cols-3` on both landings (G-PRV-1). STORY W7: `routeTransition.ts:12 { types: ["route"] }` single type; 0 `view-transition-name` in `demo/chassis/landing/`. PERF W2: `tests/gates/shell-field-governance.test.ts` absent; `usePagerWorm.ts:133-134` still `readPx`→`getComputedStyle` inside the rAF `paintWorm`; `useBlobPointer.ts:106,116` unbatched gBCR. PERF W3: `tests/gates/deferred-paint.test.ts` absent. PERF W4: no route-pending affordance, no gate. REDUCTION W2: `Card.vue:33 grain: true` + `:39 metal: "gold"` — the exact pins. REDUCTION W5: 4 timeline SFCs intact. REDUCTION W7: `DrawerTitle.vue`+`DrawerDescription.vue` present; `drawer/index.ts:7` still 4-way `DrawerDirection`. REDUCTION W9: `useScrollProgress.ts:94` + `useFadingScroll.ts:158` still hand-roll `addEventListener("scroll")` (G-ONE-READER); `useLiquidReveal` still in `reveal/`; `/motion/reveal.vue` unfolded. FM W4: `alert/index.ts:7 rounded-lg` + every tone arm on `[backdrop-filter:var(--glass-blur-wash)]`. FM W7: `DialogContent.vue:313-318` still captures `springPreset` once at setup; `useSpringMount.ts:110` reads `options.preset` non-reactively. A11Y W5-B: `HeaderRibbon.vue:24 role="toolbar"` with no roving tabindex. COLO-2: `src/composables/sidebar/` present + `"./sidebar"` at `package.json:256`.

**Wave shape.** A reconciliation cut that re-runs each wave's own born-RED probes and rewrites its §Status from the probe output, so no band file can carry 'execution-ready' next to a probe that still reds.

### BJ-5 — Commit 35a30fbb is labelled one wave but discharges arms of three — crediting BJ.W-A11Y-CONTRAST as GREEN while its MAJOR arm is untouched, and leaving BJ.W-A11Y-LIVE-REGIONS landed-but-unrecorded

**MAJOR**

**Mechanism.** Commits are titled by band-wave, not by the roster rows they actually discharge. A commit that touches three waves' rows gets one wave's name; readers of the log credit the whole named wave and lose the neighbours. The band file then inherits the commit's framing.

**Evidence.** `35a30fbb feat(a11y): land BJ.W-A11Y-STATE — state/landmark/contrast remainder (born-RED→GREEN)`. `git log -S 'aria-live="polite"' -- src/components/infinite-scroll/InfiniteScroll.vue` → 35a30fbb: that is A11Y **W4**-A (`InfiniteScroll.vue:72` sr-only role=status), which has no §CLOSE and no evidence dir. `git log -- tests/components/ui/dialog/dialog-close-contrast.test.ts` → 35a30fbb: that is A11Y **W3**-B; `DialogContent.vue:496` now reads `data-[state=open]:text-accent-foreground`. But W3-A, the wave's declared MAJOR, is untouched: `dark-arm.css:157 --success: oklch(0.805 0.186 151.6)` with `:166 --success-foreground: hsl(48 10% 96%)`; `color-radius.css:282/:290` light success on `--neutral-0`. I recomputed WCAG from the on-disk oklch: dark success **1.58**, dark info **2.36**, light success **2.30**, light info **3.63**, dark delete **2.90** — matching the wave's own stated 1.58/2.36 and failing the 4.5 floor. W3-C (the ONE table-driven tone/ink contrast gate) does not exist: `find tests -iname '*contrast*'` returns only `placeholder-contrast.test.ts` and `dialog-close-contrast.test.ts`, neither of which iterates the tone/ink table.

**Wave shape.** Split the credit: land the status-tone re-ink + the one table-driven tone/ink contrast gate under BJ.W-A11Y-CONTRAST, and stamp BJ.W-A11Y-LIVE-REGIONS §CLOSE with 35a30fbb so the record matches the bytes.

### BJ-6 — Three wave ids exist outside the wave roster: two landed in source with no charter, one is charter-less but cited as a seated row

**MAJOR**

**Mechanism.** The tranche mints wave ids in commit messages and in the cursor's prose without a corresponding section in any `waves/BAND-*.md`. Because PLAN.md declares each band file IS its wave's spec (SUPERSESSION LAW), an id with no section has no spec, no scope, and no acceptance gates — it can never be shown done or not-done.

**Evidence.** `grep -rn 'TYPEDSEAM|W-ORPHAN-GATE' docs/tranches/BJ/waves/ docs/tranches/BJ/PLAN.md` → **0 hits**, yet both landed: `abb1eba2 refactor(track): land BJ.W4-TYPEDSEAM producer cut` and `0169e935 test(orphan-css): close BJ.W-ORPHAN-GATE`. Conversely `BJ.W-IMMERSIVE-SCRIM` appears at 6 sites (`BAND-MATERIAL.md:547,563,621,1318,1392`, `APOTHEOSIS.md:175`) and `EXECUTION-PROGRESS.md:261` calls it seated ('ASK-26 is resolved DECLINE … and row 93 is seated'), but a heading scan over all 10 wave files finds **0** defining sections for it (all other 49 ids have exactly 1) and `grep 'IMMERSIVE-SCRIM' PLAN.md` → 0. Compounding: `EXECUTION-PROGRESS.md` credits `0169e935` to COLO-3 ('committed COLO-3 gate/test source partial'), but COLO-3's Form-A acceptance is two clauses added to `docs/audits/overfitting-audit.md` — `grep -n 'Colocation clause|CSS-closure clause' docs/audits/overfitting-audit.md` → 0 hits; only the CSS-closure half exists, as a test.

**Wave shape.** Charter or strike: give BJ.W-IMMERSIVE-SCRIM, BJ.W4-TYPEDSEAM, and BJ.W-ORPHAN-GATE real sections with scope + acceptance gates in their owning band files, or delete the ids and re-attribute their commits to the chartered waves they actually served.

### BJ-7 — BJ.W-GRADED-BACKDROP-JUDGE recorded a DECLINE verdict without executing the DECLINE branch, and dropped its UNCONDITIONAL deliverable entirely

**MAJOR**

**Mechanism.** The wave's acceptance is satisfiable by producing a document ('a recorded ADOPT/DECLINE ruling with the π artefact'), while the consequence of that ruling lives in a §Work bullet with its own explicit teeth. A judgment wave whose GREEN is a written verdict will always close before the code moves — and the second, unconditional deliverable rides in the same wave and dies with it.

**Evidence.** Verdict recorded: `EXECUTION-PROGRESS.md` — 'MATERIAL W3's three passes converge on ASK-26 DECLINE (882c824f…)'. The wave's own teeth (`BAND-MATERIAL.md` §Acceptance): 'if DECLINE, `grep -rn 'glass-halo\|data-backdrop.*graded' src/` must be **empty**'. Actual: `grep -rn 'glass-halo' src/ | wc -l` → **25**, including the live cohort `src/styles/tokens/glass.css:237-239` (`--glass-halo-blur: 20px; --glass-halo-core: 13rem; --glass-halo-bloom: 7rem`) and the FORM-2 mask at `src/components/dialog/placement.css:161,166`. Deliverable (b), marked 'UNCONDITIONAL on the halo adopt/decline': `grep -c 'resolveStage|provideStageRoots|useStageAnchor' -r src` → **0**. Both `graded-backdrop.test.ts` and `dialog-graded-edge.test.ts` still pin the literals the ADOPT branch was supposed to collapse.

**Wave shape.** Execute the DECLINE branch as a source cut — strip `--glass-halo-*`, FORM-2, the `isGraded` axis and both tests until the wave's own grep is empty — and land the scene-staging extraction that REDUCTION W7's G-SEAM-SEQUENCE waits on.

### BJ-8 — Gates authored by BAND-GATES W2/W3 are not enrolled in any automated runner, and ci.yml cites a release job that does not exist

**MAJOR**

**Mechanism.** The wave that wires gates into CI treats 'the spec file exists and the config lists it' as enrollment. Nothing checks that a gate has a machine edge. A gate reachable only by a human typing `playwright test` is indistinguishable from an absent gate at ship time — the exact class the pixel-floor wave was minted to end.

**Evidence.** `refract-lens-never-sharper.spec.ts` (355 lines, added by 26868000 as W3's one Playwright exception): `grep -rn 'refract-lens-never-sharper' package.json tests-visual/package.json .github/ scripts/` → **0 hits**. The tranche's own roster concedes it: `GATE-SEMANTIC-ROSTER-C19.json` → `"refractScenarioStatus": "browser acceptance debt; present in Playwright configuration but absent from a machine CI/release enrollment edge"`. Separately, `.github/workflows/ci.yml:55` reads '# It runs pre-tag on real hardware — see release.yml `pixel-floor-gpu`', but `grep -E '^    [a-zA-Z0-9_-]+:$' .github/workflows/release.yml` yields exactly one job: `publish`. The aurora floor lives only in `scripts/release.sh:44-46`, a locally-invoked script — so the CI comment points at nothing, and the aurora half of `8c05f925`'s 'blob gates CI, aurora gates the tag' split has no tag-time machine edge.

**Wave shape.** Add an enrollment assertion — every gate spec file must be reachable from a CI or release job — then either wire refract + the aurora GPU floor into release.yml or delete them and correct the ci.yml cross-reference.

### BJ-9 — BJ.W-REDUCE-DELETE landed its deletions but not its relocations, leaving a CSS register citing a module it deleted

**MAJOR**

**Mechanism.** Multi-part reduction waves are closed on the delete half because deletes are the part a grep can confirm. The move/re-home half — which is what keeps the remaining tree honest — is invisible to the same grep, so the wave closes with rot it explicitly named as its own failure mode.

**Evidence.** Deletes verified GONE: `fourier-field/presets.ts`, `src/components/liquid-grid/`, `src/components/combobox/`, `useBloomUp.ts`, `useStaggerReveal.ts`, `useTextHighlight` (0 src hits), `useNumericTransition` (0), `FuzzySearch.vue`, and the `./combobox`/`./liquid-grid` subpaths. But the wave also ruled '`useScrollPin` (sole consumer: ScrollChoreographyBody) moves demo-local; the `.scroll-pin`/`.scroll-pin-phase-*` register in `scroll-choreography.css` moves WITH its writers — never ship the CSS register writer-less (the 7.0.0 RED-BY-ROT class)'. At HEAD `src/composables/motion/scroll/useScrollPin.ts:74` still exports it and its only importer is `demo/stories/motion/scroll/ScrollChoreographyBody.vue:18`. And the rot the wave named is live: `src/styles/scroll-driven.css:21` still reads 'of `useScrollProgress.ts` / `useStaggerReveal.ts`' and `:13`/`:63` still cite `useStaggerReveal` — a file this same wave deleted.

**Wave shape.** Finish the relocation half: move `useScrollPin` + its `.scroll-pin*` register demo-local, and sweep every src comment that names a symbol this wave deleted.

### BJ-10 — The gate-abrogation tranche grew the gate tree by 4,712 lines and 93 test seats while shrinking the product tree by 4,789

**OBSERVATION**

**Mechanism.** Because acceptance for every wave is a gate the wave itself authors, the cheapest path to GREEN is to write a new gate rather than to change product code. With BJ.W-GATE-COLLAPSE (the only wave that subtracts gates) unexecuted, the loop has no drain — the tranche mandated to collapse gates is the tranche that produced the most.

**Evidence.** `git diff --shortstat b2293849..HEAD` per dir: src `211 files, +1996/-5825` (net −3829); demo `115 files, +1124/-2084` (net −960); tests `60 files, +3650/-1598` (net **+2052**); tests-visual `19 files, +2986/-326` (net **+2660**); docs `194 files, +23215/-218` (net **+22,997**). Commit split since formation close: 60 total, 32 touch `src`, 50 touch `docs`. Test-seat census 1032 → 1125 (+93). Last commit touching `src` is `abb1eba2` at 2026-07-22 07:13; today is 2026-07-24 — two days of doc-only and untracked-doc activity (newest addendum `FRESH-OPUS-EYES-DEVELOPMENT-HANDOFF-C67.md`, mtime Jul 24 13:23).

**Wave shape.** Land the collapse first and gate every subsequent wave's new-test budget against the post-collapse count, so a wave cannot buy GREEN by minting a gate.

### BJ-11 — The execution cursor's close criterion is unfalsifiable — it declares that landing bytes can never mark a row done

**OBSERVATION**

**Mechanism.** The cursor states 'no row receives DONE from landing', while the band files independently stamp §CLOSE — LANDED with SHAs. Two records with opposite polarity govern the same rows: the band file can only say landed, the cursor can only say not-done. Neither is derived from source, so no evidence can move either.

**Evidence.** `EXECUTION-PROGRESS.md:~160`: 'C6 reconciles committed COLO-3 gate/test source partial `0169e935` at current HEAD `0371836d`, so the live cursor is 30 source-touched + 62 other + IOS W-0 banked; **no row receives DONE from landing**' and '…cannot close before the 48-hour minimum, regardless of interim green source commits.' Against this: `BAND-MATERIAL.md:1057` '§CLOSE — LANDED (`4442b451`, 2026-07-21)', `:1187` '§CLOSE — LANDED (`44621bb4`, 2026-07-22)', `:216`/`:404`/`:724` '§BUILD LANDED', `:933` '§CLOSE — LANDED'. The P-EX1 phase row simultaneously reads 'REOPENED ACCEPTANCE-RED 2026-07-22' for gates whose source commits (`26868000`, `260c66fc`, `e374b3ad`, `5b34bb12`, `6bcd4c61`, `8c05f925`) it lists as 'historical progress, not a 5-of-5 close'.

**Wave shape.** Replace both records with one machine-derived table: wave id → probe command → last output → verdict, regenerated from source rather than asserted in prose.

---

## GATE SOUNDNESS — can each gate actually fail? Adversarial read of tests/gates/, the governed-invariant roster machinery, and the broader tests/ tree, with executed proofs.

_claude-opus-5[1m]_

### G-1 — The entire governed-gate apparatus exists only in the working tree — HEAD has no battery at all

**BLOCKER**

**Mechanism.** The enforcement layer was built as untracked files while the gates that consume it were committed. `git ls-files` reports scripts/verify-governed-invariants.mjs, vitest.governed-setup.mjs and tests/governance/ as UNTRACKED, and the SHA-pinned roster of record lives at docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json — also untracked. Worse, a product test imports that untracked doc at module scope. The result: the audited battery is a property of one developer's disk, not of the repository. Any fresh clone, worktree, CI checkout, or `git clean -fd` yields a tree where (a) `npm test` is the ungoverned `vitest run`, (b) the governed roster does not exist, and (c) tests/styles/token-graph.test.ts cannot even load.

**Evidence.** `git ls-files --error-unmatch scripts/verify-governed-invariants.mjs` → UNTRACKED (same for vitest.governed-setup.mjs, tests/governance/governedInvariant.ts); tests/gates/*.test.ts → TRACKED. `git archive HEAD | tar -x` into the scratchpad produces a tree with no scripts/verify-governed-invariants.mjs (`Error: Cannot find module .../scripts/verify-governed-invariants.mjs`), no tests/governance/, and no docs/tranches/BJ/addenda/. Committed HEAD package.json:512,518 = `"iter-test": "vitest run --reporter=verbose"`, `"test": "vitest run"` — no verify:governed. tests/styles/token-graph.test.ts:36-44 readFileSync's the untracked roster JSON at module scope. Working tree only: `node scripts/verify-governed-invariants.mjs` → {"active":48,"reserved":5,"worstCase":53,"remaining":7,"external":11}.

**Wave shape.** Commit the verifier, the binding module, the global setup and the roster into the repo (roster out of docs/tranches/ and into a tracked machine-data path the SHA pin can address), then re-run the preflight from a clean `git archive HEAD` checkout as the acceptance.

### G-2 — `caseIdentity` — the roster's anti-erosion device — is a static-vs-static string compare with zero runtime binding

**BLOCKER**

**Mechanism.** The roster freezes each seat's case set as a `caseIdentity` literal ({count, keys, orderedKeysSha256}) and the verifier confirms the literal in the test source equals the literal in the roster JSON (scripts/verify-governed-invariants.mjs:513-520 `sameJson(registration.caseIdentity, expectedCase)`). Both sides are text parsed out of files; nothing ever computes the actual number of cases the test runs or the actual membership of the array the gate scans. The device that exists to prevent a gate silently narrowing its own subject set is structurally incapable of observing the subject set.

**Evidence.** PROOF 1 (scratchpad/prove-caseidentity.mjs, run via the verifier's own `overrides` hook): delete 6 of the 7 rows of `exactSubpathRuntimeSurfaces` (tests/public-surface.spec.ts:355-455) while leaving `caseIdentity: {"count":48,"orderedKeysSha256":"118e0914…"}` at line 494 untouched → `VERIFIER RESULT: {..."active":48...}` — preflight PASSES with 6/7 cases deleted; `governedInvariant.each` then runs 1 case instead of 7 and vitest is green. Note the frozen count (48) never matched the 7 rows in the first place. PROOF 2 (scratchpad/prove-bootgraph.mjs): narrow tests/gates/boot-graph.test.ts:58 `DEFERRED_SHELL_COMPONENTS` from ["Aurora","PresetEditor"] to ["Aurora"], leaving line 406's `caseIdentity: {"keys":["Aurora","PresetEditor"]}` intact → preflight PASSES; the boot gate silently stops guarding PresetEditor.

**Wave shape.** Make caseIdentity a runtime assertion — the governedInvariant binding should receive the live case array/subject set, hash it, and compare against the declared identity at execution time, so deleting a case reds the seat itself rather than passing a text diff.

### G-3 — Raw-regex-over-source gates cannot distinguish a live CSS rule from a commented-out one — including a governed seat

**MAJOR**

**Mechanism.** The repo runs two incompatible detector idioms side by side. Rigorous gates parse (TypeScript AST in boot-graph, postcss in token-hygiene/type-hygiene) or strip comments first (glass-subtlety, prm-no-resurrection, radius-dialog-bind's declMap). The rest regex the raw file text. A regex over raw text matches text inside `/* … */` identically to a live declaration, so the assertion 'this rule/declaration exists' is satisfied by dead bytes. This is precisely the failure class the repo says burned it — orphan-css-partial.test.ts:7-8: 'That is how the chip register shipped with zero rules while every device-free oracle passed' — reproduced one layer up, in the content gates rather than the reachability gate. Census: 19 of the 26 source-reading test files neither strip comments nor use postcss/compiler-sfc.

**Evidence.** tests/styles/typography.test.ts (governed seat `type.headline-kicker-ratio`) reads scale.css raw and never strips comments. Replay: comment out all three proportional declarations in scale.css in memory → `ratio parsed from DEAD css: 0.7861513777574233`, `toMatch ratio literal: true`, `toMatch headline: true`, `toMatch leading: true` — every assertion green over a dead register. tests/styles/radius-dialog-bind.test.ts:92 `expect(/\.glass-floating\.sheet-animate\s*\{/.test(squircle)).toBe(true)` → commenting the rule out still yields `true`. tests/styles/typed-track-seam.test.ts:50-54 (`src(rel)` raw, no strip): wrapping ALL of src/styles/glass/value-marks.css in `/* … */` keeps `.glass-value-marks present: true`, `.glass-value-mark present: true`, `no --track-bg: true` — the W4 typed-seam CSS gates stay GREEN over a stylesheet that ships zero rules.

**Wave shape.** Route every CSS/SFC content gate through the postcss/compiler-sfc path the token-hygiene and type-hygiene gates already use, and delete the raw-`toMatch`-on-file-text idiom repo-wide; a comment-out mutation bite becomes the standing acceptance for each.

### G-4 — The orphan-CSS reach walker counts commented-out imports as live graph edges, defeating its own reach gate

**MAJOR**

**Mechanism.** orphan-css-partial.test.ts exists to refuse rescuing a CSS partial whose only referrer is an unreachable SFC — the COLO-3/W3 repair described at length in its header (lines 32-40). The reach set is built by `publicJsReach` (line 151) which calls `jsImportSpecs` (lines 133-143), a bare regex over `readFileSync(file,'utf8')` with no comment stripping. A commented-out `import` inside any reachable module therefore widens the reach set, which is exactly the condition the gate's own anchor at lines 234-235 (`reach.size < allModules.length`) is meant to detect but only detects in aggregate.

**Evidence.** Replay of the exact regex from orphan-css-partial.test.ts:135-137 against a file whose only reference to the dead module is commented out returns `['./composables/motion/scroll/useScrollScene', './another-dead-module', './live']` — the commented specs are harvested as edges. `useScrollScene` is the very module the gate's own dead-SFC bite at lines 296-302 asserts is OUTSIDE reach.

**Wave shape.** Strip comments (or parse with the TS AST, as boot-graph already does) before harvesting import specifiers in publicJsReach, and add a bite that plants a commented-out import and requires the reach set to be unchanged.

### G-5 — Both vitest projects run the entire 200-file suite; the chip-listener project's `include` is inert, so every test executes twice with EventTarget monkeypatched

**MAJOR**

**Mechanism.** vitest.config.ts declares two projects with `extends: true`. The `chip-listener` project sets `include: ["tests/components/chip.contract.test.ts"]` (line 44) intending to give one file a special setup with `isolate: true, fileParallelism: false`. The root-level `test.include` glob wins, so the narrow include never restricts anything: the chip-listener project collects all ~200 files. Consequence: every test in the repo runs a second time under tests/governance/chipListener.setup.ts, which replaces `addEventListener`/`removeEventListener` on the live prototype owner globally (chipListener.setup.ts:114-137) and accumulates a strong-reference `registrations[]` array for every listener registered anywhere in the worker. A one-file instrument is applied to the whole battery, and the whole battery pays for `fileParallelism: false`.

**Evidence.** `npx vitest run tests/styles/typography.test.ts --reporter=verbose` → `✓ |unit| tests/styles/typography.test.ts …` AND `✓ |chip-listener| tests/styles/typography.test.ts …`, `Test Files 2 passed (2)`. Full run: `Test Files 4 failed | 395 passed (399)` against 200 test/spec files on disk — every file counted twice. Failures are reported under `|chip-listener|` for tests/public-surface.spec.ts and tests/gates/boot-graph.test.ts, files the project claims not to include.

**Wave shape.** Give the chip-listener project a real narrowing (project-level include that actually wins, or a separate config), and add an assertion that the two projects' collected file sets are disjoint-and-complete so a silently-widened project reds.

### G-6 — The suite is RED right now, and one of the failures is a governed seat whose roster row is stale

**MAJOR**

**Mechanism.** The governed roster freezes each seat's title and identity but nothing keeps the seat's DATA in step with the source it guards. `surface.root.exact` hardcodes the expected root export list in the test body; two symbols were added to the root barrel without updating it. Separately the boot-graph build arm's freshness check fails because `npm test` has no dist-demo precondition — the build is a separate CI step (ci.yml line 27) and `iter-test`/`npx vitest run` never build it, so the arm is red-by-default in any local loop, which trains the operator to ignore it.

**Evidence.** `npx vitest run` → `Test Files 4 failed | 395 passed (399); Tests 4 failed | 2610 passed (2614)`. (1) tests/public-surface.spec.ts:483 `surface.root.exact` — `+ "armGlassRefract"`, `+ "supportsBackdropRefract"` present in `Object.keys(Glass)`, absent from `rootRuntimeExports`; corresponding untracked test tests/composables/glass/supportsBackdropRefract.test.ts and modified src/composables/glass/supportsBackdropRefract.ts. (2) tests/gates/boot-graph.test.ts:538 — `dist-demo/index.html is STALE (built 2026-07-22T07:16:17Z, newest source 2026-07-22T11:10:48Z)`. Each ×2 because of G-5.

**Wave shape.** Land the two new root exports into the roster/expected surface, and give the boot-graph build arm a runner-independent precondition (a pretest build hook or an explicit CI-only project) so it is green-or-meaningfully-red in every lane rather than red-by-construction locally.

### G-7 — Tautological assertions sit inside governed seats — including assertions on constants the helper hardcodes

**MAJOR**

**Mechanism.** The 60-seat ceiling plus `ordinaryTestsConsumeBudget: false` pushes work into a small number of very large `it` bodies (token.graph.published-names-backed: 263 lines / 19 expects; behavior.chip: 71 lines / 25 expects). Inside bodies that size, assertions that test JavaScript or the test harness rather than the product are invisible, and several are present. A tautology inside a governed seat is worse than one in an ordinary test, because the roster presents the seat as the predicate of record.

**Evidence.** tests/styles/token-graph.test.ts:412-413 — `const duplicatePublished = [...publicTokens, publicTokens[0]!]; expect(new Set(duplicatePublished).size).not.toBe(duplicatePublished.length)` (asserts Set dedupes an array it just duplicated). :340-342 — `expect(carrierCensus.slice(1).map(…)).not.toEqual(carrierCensus.map(…))` (an array minus its head differs from itself). :286 — `expect(classOwns(null, …)).toBe(false)` where classOwns line 79 is `if (!owner?.isConnected) return false`. tests/components/chip.contract.test.ts:217-222 — `expect(wrongOwner).toEqual({decoyTraversals:[0,0], activeTrace:[0,0,0], positivePredicate:false, chainsUnchanged:true})` where tests/governance/chipListener.setup.ts:208-209 literally returns `positivePredicate: false as const, chainsUnchanged: true as const`. tests/components/ui/reka-binding-idiom.test.ts:119 — `expect(wrapper.get("[data-slot=tags-input]")).toBeTruthy()` (`get` throws on miss and returns an always-truthy DOMWrapper).

**Wave shape.** Strip harness-self-assertions and JS-identity assertions out of the governed bodies, split the two mega-seats into localizable seats, and raise the ceiling if the split needs it rather than stuffing.

### G-8 — A governed seat's frozen title claims an assertion the body never makes

**MAJOR**

**Mechanism.** The roster stores `currentRegistration` (the title string) as the seat's human-readable predicate and the verifier enforces that the source title matches it byte-for-byte — but nothing relates the title to the assertions. So a seat can be registered, frozen, verified and green while asserting something entirely different from what the roster says it guards.

**Evidence.** tests/components/ui/reka-binding-idiom.test.ts:95 registers `reka.tags-input.value-binding` with the title "TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)". `grep -n "data-state" tests/components/ui/reka-binding-idiom.test.ts` shows no `data-state` assertion anywhere in that seat. Line 115 computes `const items = wrapper.findAll(…)` and the variable is never referenced again (only occurrence of `items` in the file). The seat's three expects are two `toContain` text checks and the tautological `toBeTruthy` of G-7.

**Wave shape.** Assert the rendered `data-[state=active]` the seat is named for (or rename the seat and its roster row to what it actually proves), and add a review rule that a seat's title names an attribute/value appearing in its own assertions.

### G-9 — `placeholder-contrast.test.ts` is an accessibility contrast gate that computes no contrast

**MAJOR**

**Mechanism.** The gate encodes the WCAG 4.5:1 floor as a token NAME check — 'resolves onto bare var(--muted-foreground)' — and never resolves that token to a colour or computes a ratio against any background. The numeric property it claims to floor is therefore unguarded: retune `--muted-foreground` to any value and the gate stays green. The roster corroborates the hole by still carrying `reserve.a11y.contrast-floors` as a HARD reservation with `expectedSourcePath: null` — the real gate is acknowledged as unlanded while this one occupies the name.

**Evidence.** tests/styles/placeholder-contrast.test.ts:38-42 — the only assertions are `toMatch(/color:\s*var\(--muted-foreground\)\s*;/)` plus three `not.toMatch` on `surface-tint|opacity|color-mix`; header lines 1-8 claim 'the ONE ≥4.5:1 token … documented 5.21:1'. `grep -rln "contrastRatio\|relativeLuminance\|APCA\|WCAG" tests/` returns 3 files, none of them this one. `--muted-foreground` is re-declared 4× in src/styles/glass/ladder.css (lines 210, 283, 351, 375) — the gate reads none of them. Roster: `{"id":"reserve.a11y.contrast-floors","expectedSourcePath":null,"reservation":"hard"}`. Also `ruleBlock` (lines 24-31) slices from the first textual `indexOf(selector)` to the first `}` — comment-blind and nesting-blind, the G-3 class.

**Wave shape.** Land the reserved contrast-floor gate: resolve the authored token pairs to concrete colours and assert measured ratios, then let the name-check test retire or become its self-test.

### G-10 — A MEMORY-recorded recurring product defect (inset shadow inside light-dark()) is guarded by prose in 7 source files and by no detector

**MAJOR**

**Mechanism.** When a hazard recurs, the repo's response has been to write a warning comment at each site rather than to encode one detector. Prose does not gate. The `light-dark()` inset-shadow trap — an inset fragment inside `light-dark()` computes the WHOLE box-shadow to `none` — is documented in 7 src files and enforced nowhere; the one test that mentions it checks a single hand-scoped region of one component. Same shape for the Vue scoped `:global()` drop (recorded as a 3rd recurrence): zero live instances, zero detectors, so recurrence #4 lands silently.

**Evidence.** `grep -rl "inset-shadow trap|light-dark() round an inset|inset-shadow leg inside light-dark" src/` → 7 files: src/styles/glass/{surfaces-pager,glass-capsule}.css, src/styles/tokens/{dark-arm,on-glass-fg,light-dark,glass-fx}.css, src/components/_shared/field/field-surfaces.css. A repo-wide scan for the actual trap (any `box-shadow`/`--*shadow*` declaration containing both `light-dark(` and `inset`) finds 0 live instances — i.e. the invariant currently holds and nothing would notice if it stopped. The only test-side mention is tests/components/ui/dialog/graded-backdrop.test.ts:113 `expect(form2Region).not.toContain("light-dark(")`, scoped to one extracted region of one file. No test file matches `:global`.

**Wave shape.** Add one postcss detector over all src CSS + SFC style blocks that reds on any shadow-valued declaration containing both `light-dark(` and `inset`, plus a sibling that reds on `:global(` inside a scoped `<style>`; delete the seven prose warnings in favour of the one gate.

### G-11 — The '≤60 gates' collapse is a labeling change: 48 governed seats / 201 assertions sit inside a 2614-assertion battery that fails CI identically

**MAJOR**

**Mechanism.** The roster declares `ordinaryTestLaw.ordinaryTestsConsumeBudget: false`, so the seat ceiling is enforced against a hand-picked 48 while every other test in the tree still runs in `npm test` and still reds the build. Nothing was collapsed — a subset was relabeled. The ceiling then acts as a perverse incentive in the other direction: seats merge unrelated assertions to stay under it (two seats hold 44 of the 201 assertions), which destroys failure localization and is exactly where the G-7 tautologies hide. Meanwhile the roster's chosen seat is sometimes the weakest assertion in its file.

**Evidence.** Roster counts: `{activeVitest:48, hardReservedVitest:4, conditionalReservedVitest:1, worstCaseCountedSeats:53, remainingSeats:7}` against `maximumCountedSeats: 60`; `ordinaryTestsConsumeBudget: false`. Measured: 48 governed seats carrying 201 `expect(` calls total, inside a suite that reports `Tests 4 failed | 2610 passed (2614)`. Density: token.graph.published-names-backed 263 lines/19 expects; behavior.chip.mode-transition-clears-semantics 71/25; at the other end 8 seats carry exactly 1 expect. Weak-seat example: tests/styles/glass-subtlety.test.ts:95 governs only `floating > quiet` (11 > 7) while the ungoverned `it` at line 63 pins the exact 7/7/11/11 ladder.

**Wave shape.** Decide whether the roster is the battery or an index of it: either bring the whole executed suite under the counting law (and actually delete/merge to reach 40-60), or stop calling 48 seats 'the battery' while 2566 other assertions gate the build.

### G-12 — The only gate on the published `./styles.css` manifest returns green when the artifact it measures is absent — the exact trap its sibling gate refuses

**MINOR**

**Mechanism.** Two gates face the same 'artifact may not be built' condition and resolve it opposite ways. boot-graph makes absence LOUD (a dedicated `it` asserting existence plus a freshness assertion, with a header explicitly ruling that 'a skip is a measurement that silently did not run'). typed-track-seam takes the other branch and `return`s. `npm test` has no `dist/` precondition — dist exists only as a side effect of npm's `prepare` lifecycle — so any lane that skips scripts, or any `rm -rf dist`, converts the sole ordering gate on the published component-styles manifest into a no-op.

**Evidence.** tests/styles/typed-track-seam.test.ts:110-125 — `const manifest = resolve(ROOT, "dist/component-styles.css"); if (!existsSync(manifest)) { … return; }` guarding the only `expect(order).toEqual(["./styles/glass/track-well.css", "./styles/glass/value-marks.css", "./glass-ui.css"])`. Contrast tests/gates/boot-graph.test.ts:522-539 (`it("the built demo has a dist-demo to measure")` + the STALE assertion). package.json:518 `"test": "npm run verify:governed && vitest run"` — no dist build; ci.yml orders `npm test` BEFORE `npm run build`. orphan-css-partial.test.ts:15-17 independently declares this same output-omission class out of scope: 'NOT COVERED here: package-OUTPUT omission — the I-12 ./styles.css→./dist/glass-ui.css class where the shared selectors ship with ZERO rules'.

**Wave shape.** Make the manifest arm fail loud on an absent dist with the build command in the message (boot-graph's idiom), and add the dist-byte read that closes the self-declared I-12 output-omission hole.

### G-13 — 176 Playwright specs exist; exactly one is reachable from any workflow or release script

**OBSERVATION**

**Mechanism.** The browser-side battery grew as ad-hoc capture/debug specs (many prefixed `_`) that no lane invokes, so there is no signal about whether they still pass, still compile, or still describe the product. The roster is honest about this — it lists only two external browser seats — but the effect is 175 spec files that read as coverage and enforce nothing. The one wired gate is by contrast the best-built instrument in the repo.

**Evidence.** `ls tests-visual/*.spec.ts | wc -l` → 176. The only enrolled spec is substrate-paints-color.spec.ts, named explicitly in tests-visual/package.json `gate:pixel-floor*` scripts, which are invoked by .github/workflows/ci.yml (pixel-floor job) and scripts/release.sh:45-46. `grep -rn "playwright test|spec.ts" .github/workflows/*.yml scripts/release.sh` returns no other spec. tests-visual/pi-gate-verify.mjs is genuinely sound — it reads the JSON machine report not the exit code, treats skip/absent/zero-results as RED (lines 118-140), and requires the planted-defect arm to fail on its own assertion text via FLOOR_BITE (lines 94-100).

**Wave shape.** Delete or archive the unrun `_`-prefixed capture specs, and either wire the remaining real ones into a lane or move them under a clearly-marked non-gating directory so the tree stops implying coverage it does not provide.

---

## PROMPT-RECAP COMPLETENESS — independent per-row verification of FEEDBACK-LEDGER.md F01–F50, A01–A17, CFR-01 against the source tree at HEAD (0371836d), using the pre-corpus base commit 2a949abe (2026-07-17, the last commit before the feedback) as the "unchanged since the complaint" oracle.

_claude-opus-5[1m]_

### M1-REDUCTION-BAND-UNEXECUTED — Every ledger row whose remedy is a DELETION is unexecuted; only mechanically-gateable token/a11y refactors landed

**BLOCKER**

**Mechanism.** The BJ execution selected for waves that a headless gate can prove (radius tokens, blur tokens, type codemod, aria linkage, track-well DRY). Every row that requires a judgment call about what to remove was left for a "BAND-REDUCTION" that never ran, so the pruning rows are collectively 0% executed while the ledger reads as broadly worked. The reduction is 66→63 component dirs and 74→72 exports — 4.5%, against asks that use the words "REMOVED", "dramatically", "pruned", "purge to the core".

**Evidence.** HEAD present, all named-for-removal: `src/components/instrument-chassis/InstrumentChassis.vue` + `demo/stories/data/instrument-chassis.vue` + `package.json` `"./instrument-chassis": {types: ./dist/instrument-chassis.d.ts, import: ./dist/instrument-chassis.js}` (F18); `src/components/metric/{Metric,MetricCell,MetricRow,MetricStack}.vue` + `./metric` export (F18); `src/components/completion-seal/` + `./completion-seal` export (F26); `demo/stories/manifest.ts:922-1001` still lists motion/tempo (F30), motion/reveal (F32), motion/scroll (F42); `manifest.ts:1002-1095` compositions still carries 6 stories incl. settings (F44) and gate-pattern (F45); `src/components/deck/` AND `src/components/carousel/` both exist with both exports and both stories (F33 "likely collapse"); `demo/stories/feedback/confirm-dialog.vue` present, its only change since the corpus is the text-sm→text-small codemod (F25). Counts: `git ls-tree -d --name-only 2a949abe src/components/ | wc -l` = 66 vs `ls -d src/components/*/ | wc -l` = 63; exports 74 → 72.

**Wave shape.** A single reduction wave that executes the ten deletion rows atomically — delete instrument-chassis, metric, completion-seal from src + demo + package.json exports + manifest; collapse deck into carousel; collapse reveal/scroll into one scroll register; delete or fold tempo, settings, gate-pattern and the compositions category — and records a per-row KEEP rationale for anything spared.

### M2-GREENFIELD-ROWS-BYTE-UNCHANGED — Every named greenfield target is byte-identical to the pre-feedback commit

**BLOCKER**

**Mechanism.** Five rows/asks (F16 timeline, F34–F39 handmark, F47 dock, A12 blob, A13 aurora modes) demand ground-up redesign. Redesign has no gate to green, so 32 src commits since the corpus produced zero bytes in any of these directories except incidental type-codemod churn in their demo stories. The tranche's throughput is real but orthogonal to the rows that name the worst-rated artifacts.

**Evidence.** `git diff --stat 2a949abe HEAD -- src/components/handmark` → EMPTY (F34–F39 "looks awful / doesn't even work / broken and disjointed / should be greenfielded / wrong layering, awful smoothing"). `git log --oneline --since=2026-07-17 -- src/components/timeline demo/stories/data/timeline` → only 75c19ead (story copy) and 6bcd4c61 (prose truth-up); ContinuousTimeline/SegmentedTimeline/ScrubberTimeline/GlassTimeline all intact (F16 "redesign from the ground up"). `git log --since=2026-07-17 -- src/components/blob` → only ddc20dc4, the type codemod (A12). `src/components/aurora/composables/uniformBridge.ts:69-74` still maps pastel/oil/crayon/vangogh/oil-pastel exactly as at base (A13 "extant is awful… proper van-Gogh mode, proper oil-pastel brush mode, proper crayon mode"). `git diff --stat 2a949abe HEAD -- src/components/dock/styles/overflow.css` → 3 insertions/2 deletions, all comment text (F47 "the dock likely needs to be greenfielded, again").

**Wave shape.** Five separately-owned greenfield waves, each starting from a written visual spec and closing on a paired before/after capture rather than a unit gate, because none of these rows can be discharged by a passing test.

### M3-AURORA-PRESET-COUNT-IDENTICAL — F08 "reduce the preset set dramatically" — preset count is 17 before and 17 after

**MAJOR**

**Mechanism.** The row was read as a design opinion rather than a countable invariant, so nothing enforced a reduction. The duplicative pairs the user named are still all present side by side.

**Evidence.** `git show 2a949abe:demo/stories/substrates/aurora/presets.ts | grep -c '^const .* = cfg('` → 17; `grep -c '^const .* = cfg(' demo/stories/substrates/aurora/presets.ts` → 17. The named-duplicative cluster survives intact at HEAD: OIL_IMPASTO (l.197), OIL_GESTURAL (l.237), VANGOGH (l.278), OILPASTEL_SUNSET (l.320), OILPASTEL_RAINBOW (l.360), OILPASTEL_OCEAN (l.462), CRAYON (l.504) — seven near-identical painterly variants against the user's ask to "focus on the best-designed auroras (sky, sunset, dusk…)".

**Wave shape.** Cut PRESETS to the ~6 the user named plus one painterly exemplar per medium, delete the rest, and pin the surviving count in a gate so the set cannot silently regrow.

### M4-LANDING-TILE-IDENTITY-FLOOR — F01/F02/F46 are one defect: 77 of 87 story routes render a title-only blank card as their landing tile

**MAJOR**

**Mechanism.** `resolveStoryTile` is a three-rung ladder whose terminal rung paints a bare glass panel with the story title and nothing else. Only 4 authored `.tile.vue` files and 6 GL stills exist, so the ladder falls through for 77 routes — including 12 of 13 foundations rows, which is exactly the "most of the cards are blank white" verdict. Nothing in the landing chassis changed since the corpus.

**Evidence.** `demo/chassis/landing/storyTile.ts:44-49` (rung 3 = `{kind:"identity", title}`); `demo/chassis/landing/SectionPreviewCard.vue:49-54` renders `<div class="…-identity">{{ tile.title }}</div>` over `background: color-mix(in srgb, var(--card) 68%, transparent)` (l.90); `find demo/stories -name '*.tile.vue'` → exactly 4 files; `VIZ_PREVIEW_STILLS` (vizPreviewStill.ts:37-43) → exactly 6 routes. Parsed manifest: 87 stories, 77 hit the identity floor {foundations 12, containers 14, data 10, motion 8, dock 7, forms 6, feedback 6, compositions 6, navigation 5, display 3}. F01's masonry ask: `SectionLanding.vue:33` is a uniform `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6` — no size variance. `git diff --stat 2a949abe HEAD -- demo/chassis/landing/SectionPreviewCard.vue demo/chassis/landing/SectionLanding.vue demo/stories/foundations/intro.vue` → only intro.vue, 2 lines, typography codemod.

**Wave shape.** Retire the identity floor entirely: every story either ships a real `.tile.vue` vignette or is not on the landing, and the grid gains a span axis so tiles vary in size.

### M5-F48-BLUR-SHIPPED-AS-PROSE — F48's headline clause — "glass blur for ALL glass components slightly more subtle" — shipped as documentation with zero value change

**MAJOR**

**Mechanism.** BJ MATERIAL W2 authored a blur-ladder precept into the token file, ruled two radius collisions "intentional", and repointed one private scrim. The six blur radii the ask targets are byte-identical to the pre-feedback commit. A wave that documents a value is indistinguishable in the ledger from one that changes it, so the row reads as worked.

**Evidence.** BASE `git show 2a949abe:src/styles/tokens/glass.css` lines 86-97: wash 1px, quiet 7px, resting 7px, floating 11px, overlay 11px. HEAD `src/styles/tokens/glass.css` lines 149-160: wash 1px, quiet 7px, resting 7px, floating 11px, overlay 11px. Identical. The only subtlety delta in the whole band is 20e064f1 killing the `@media(min-resolution:2dppx)` overlay→17px arm; that same commit states "Saturation 1.4/1.6/1.8 LEFT PROVISIONAL (not repainted) — W2 stays RED". F48's other clause IS fixed: `src/styles/theme/radius.css` `--radius-dialog: var(--radius-card)` binds dialog to card rounding.

**Wave shape.** Actually lower the five blur radii against a paired light/dark capture at 390 and 1440, and rule the saturation triple that W2 left provisional.

### M6-DOCK-VERTICAL-SCROLL-COERCION — F27 — the horizontal dock is still a vertical scroll container, by a CSS coercion the source comment acknowledges and does not fix

**MAJOR**

**Mechanism.** On the overflow branch the dock scroll port sets `overflow-x: auto` with `overflow-y: visible`. Per CSS Overflow, a `visible` cross axis beside a non-`visible` inline axis computes to `auto` — so the block axis is a live scroll port. The file states this in prose and then reserves ring-room with all-side padding rather than choosing `overflow-y: clip` (which is NOT coerced and would have closed the row). The user's screenshot is the horizontal bottom dock, i.e. exactly this branch.

**Evidence.** `src/components/dock/styles/overflow.css:59-75`: `overflow-x: auto;` … comment "Per CSS Overflow's computed-value coercion a `visible` cross axis beside a non-`visible` inline axis computes to `auto` — a scroll container either way" … `overflow-y: visible; padding: var(--dock-scroll-safe-inset); margin: calc(-1 * var(--dock-scroll-safe-inset));`. `git diff --stat 2a949abe HEAD -- src/components/dock/styles/overflow.css` → 3 insertions/2 deletions, comment-only. F27 screenshot (`docs/tranches/BJ/feedback/F27-dock-vertical-scroll.png`) is the horizontal category dock (Alert/Toast/Progress/Skeleton/Confirm Dialog/Completion Seal).

**Wave shape.** Swap the cross axis to `overflow-y: clip` with `overflow-clip-margin` sized to the hover plate, then pin a test that the dock's `scrollTop` cannot leave 0.

### M7-ROUTE-TRANSITIONS-UNTOUCHED — F06 and F07 — story-page and dock-page transitions are byte-identical to the complaint state

**MAJOR**

**Mechanism.** The demo's only route-transition mechanism is a bare `startViewTransition` wrapper with no per-route choreography, no named view-transition groups, and no motion register. Nothing in the tranche touched it, so "broken, slow, flash the screen" and "should be better defined, more expressive and animated" are both unaddressed.

**Evidence.** `demo/chassis/routeTransition.ts` is 13 lines, whole file: `startViewTransition(async () => { await router.push(to); }, { types: ["route"] }).finished`. `git log --oneline --since=2026-07-17 -- demo/chassis/routeTransition.ts` → no commits. `git diff --stat 2a949abe HEAD -- src/styles/view-transition.css` → EMPTY.

**Wave shape.** Author a route-transition register (named ::view-transition groups for hero/dock/body, per-type curves off the spring canon) and prove it on the /dock/* set the user flagged.

### M9-A01-ENGAGEMENT-VARIANTS-ABSENT — A01/A11 — the two slider engagement variants the user specified do not exist in the type surface

**MAJOR**

**Mechanism.** The engagement edict was verified against the pre-existing `:active` squash rather than against the two NEW stacked variants the ask names (mobile modal-expansion; grow-on-engage that pops out of its shell). No prop, no type member, no CSS hook for either.

**Evidence.** `src/components/slider/types.ts:5` — `export type SliderVariant = "standard" | "spectrum";` — the complete variant union at HEAD. `grep -n 'modal|expansion' src/components/slider/` → no matches. What exists is only the pre-corpus press affordance: `Slider.vue:412` `.glass-slider:active .slider-range { transform: scale(1.02, 0.94); }`, present at 2a949abe.

**Wave shape.** Add the two stacked slider variants as real props with their own registers, then run the same engage audit across every interactive component as A01 asks.

### M10-F19-ALERT-BYTE-UNCHANGED — F19 — Alert is byte-identical to the complaint state and still rounds at 10px against the 16px card canon

**MAJOR**

**Mechanism.** The radius canon wave (MATERIAL W1) reconciled Command/Skeleton/Segmented/Search but never enumerated Alert, so the one component the user called out by name for rounding kept a raw `rounded-lg`. The row was verified against the glass classes that were already there when the user rated them insufficient.

**Evidence.** `git diff --stat 2a949abe HEAD -- src/components/alert/index.ts src/components/alert/Alert.vue` → EMPTY (only AlertDescription.vue changed, 2 lines, type codemod). `src/components/alert/index.ts:8` BASE constant: `"relative w-full rounded-lg border px-4 py-3 …"`; `src/styles/theme/radius.css` gives `--radius-lg: var(--radius)` = 0.625rem = 10px, against `--radius-card: var(--radius-2xl)` = 16px. The `--glass-bg-wash` / `--glass-blur-wash` tone classes the row calls "not properly glassy" are the same ones present at 2a949abe.

**Wave shape.** Re-point Alert onto the card radius and a real glass rung, and extend the radius-role-canon gate to enumerate every component so a named-but-unlisted surface cannot pass again.

### M11-F43-F45-F46-TYPOGRAPHY-ONLY — F43, F45, F46 received only the global text-sm→text-small codemod and read as touched

**MAJOR**

**Mechanism.** The type codemod (ddc20dc4) rewrote nearly every story file. Any row anchored to one of those files now shows a diff since the corpus even though none of its substance moved — which is the exact failure mode that lets a recap call a row worked.

**Evidence.** F45: `git diff 2a949abe HEAD -- demo/stories/compositions/gate-pattern.vue` → ONE hunk, `text-sm`→`text-small` on the error paragraph; the "improper rounding" is untouched and the compositions category is still 6 stories. F46: `git diff --stat … demo/stories/foundations/intro.vue` → 2 lines, codemod; the double card wrap and blank content stand. F43: the only substantive hunk replaces fabricated trust badges (`SOC 2 Type II`, `Trusted by 12k teams`) with honest highlights — an unrelated honesty fix; the "putrid colors" are unchanged and auth-shell still owns its own compositions category.

**Wave shape.** Re-run the recap with the type codemod commit excluded from the diff base, so a row's disposition cannot be satisfied by codemod churn in its file.

### AMB1-F18-VS-CFR01-CONTRADICTION — AMBIGUOUS — F18 orders metric REMOVED; CFR-01 (later, same ledger) prescribes a metric API that does not exist at HEAD

**MAJOR**

**Mechanism.** The ledger contains two terminal instructions for the same family pointing opposite ways, and the newer one cites an API from a version that is not this tree. Two readers will disagree about whether "fixed" means the metric family is gone or the metric family is reshaped, and neither reading can be executed from the text as written.

**Evidence.** Ledger l.30 (F18): "`/data/instrument-chassis`, `/data/metric` — To be REMOVED". Ledger l.93 (CFR-01): "The correct member is `MetricCell appearance=\"dashboard\"` (card, `rounded-lg`, `p-3`, stacked)". At HEAD: `grep -rn 'MetricBadge' src/ demo/` → no matches (it does not exist); `grep -n 'appearance' src/components/metric/MetricCell.vue src/components/metric/types.ts` → no matches (no such prop). The live family is Metric/MetricCell/MetricRow/MetricStack with `--radius-sm` and `--radius-card` in styles.css:83,97.

**Wave shape.** Rule F18-vs-CFR-01 explicitly in the ledger (delete the family, or keep it and strike F18's removal clause), and re-anchor CFR-01 to an API that exists in this tree.

### M8-F05-DOCK-CATEGORY-HAS-NO-FIELD — F05 "why does this section not have a background aurora" — the dock category still declares no background on any story or landing

**MINOR**

**Mechanism.** `background` is an opt-in key on each manifest story row; the dock category declares it nowhere, so the whole band falls to the recessive shell wash. No wave revisited the field assignment, so the row's literal question is answered the same way it was when asked.

**Evidence.** `demo/stories/manifest.ts:729-798` — the dock category has no `landing` key and none of its 8 story rows (`overview`, `layers`, `rail`, `sections`, `controls`, `overflow`, `cta-receive`, `dock-search`) passes a `background` option, while sibling categories do (e.g. motion/springs `{ background: "constellation" }` l.933, data/table `{ background: "grid" }` l.816). F05's screenshot is a dock story ("STARTS COMPACT / STARTS OPEN" dual-dock stage) on a flat black field.

**Wave shape.** Assign the dock band a field in the manifest (or rule in writing that it stays fieldless) and settle the layout-shift half of the row with a CLS measurement on the dock stage.

### AMB2-F09-CONTAINER-REFERENT — AMBIGUOUS — F09's "container should not be so rounded" was discharged against a container the user probably did not mean, and the radius canon codified the opposite for the one they did

**MINOR**

**Mechanism.** The screenshot shows a 12px-rounded panel holding four full-stadium pills. "Container" can read as the panel (already card grammar, so nothing to do) or as the pills (fully rounded, so the row bites). The configurator wave chose the first reading and recorded a regression-guard; the radius canon then ruled the second reading's shape a deliberate default. Both halves cannot be right.

**Evidence.** F09 screenshot = the aurora "Derive from color" block. The panel: `demo/stories/substrates/aurora/sections/AuroraColorSection.vue:163` `class="… rounded-panel border border-border/40 bg-card/40 p-2.5"` — BYTE-IDENTICAL at `git show 2a949abe:…` l.163. The pills: `src/components/toggle-group/styles.css:42` `border-radius: var(--radius-pill);`, and `src/styles/theme/radius.css` now rules `--radius-control: var(--radius-pill)` with the rationale "the small-inline-control corner rung is a STADIUM, not a fixed small px". Commit 34681df9 records "G-CFG-4 (F09 regression-guard, not born-RED): container radius stays card grammar" — i.e. no change was made. Only the roominess half moved: aside 280/360→300/400px, `--configurator-pad-inline` 16→20px.

**Wave shape.** Get the user to point at the exact element in F09's screenshot, then either soften the toggle-group pills or amend the canon's small-control stadium rule — one of the two must give.

### AMB3-UNFALSIFIABLE-ROWS — AMBIGUOUS — F03, F04, F10, F14, F28, F31, F33, F50 have no definition of done that two readers would agree on

**MINOR**

**Mechanism.** These rows are either bare verdicts ("most of this is worthless", "what even is"), scope-unbounded ("each section", "ALL pages", "app AND framework wide"), or already-satisfied-at-time-of-complaint (F50's graded halo shipped before the corpus). Each was closed by a partial or by a ruling, which is defensible — but the ledger text cannot adjudicate whether the partial suffices.

**Evidence.** F03: the jargon block IS gone — `grep -n 'Mechanics' demo/stories/dock/layers.vue` → no match, vs the screenshot's numbered `--dock-t`/`useDockSpring`/`.dock-face-content` list; but "most of this is worthless" names no removal target. F10: `StorySection` gained a `level` axis, used in 3 of 87 story files (`grep -rln 'level=' demo/stories/` → curve-gallery, springs, containers/configurator) — "each section" is unmet if read literally. F33: the dot half was closed by RATIFICATION (01310c9c, "ALREADY-AT-BAR", a green-on-arrival characterization pin); the deck↔carousel collapse half is untouched. F50: `src/components/dialog/placement.css` FORM 2 graded halo already had 4 `data-backdrop` references at 2a949abe — it predates the feedback; the Dialog default is still `scrim` and `src/components/popover/` has none. F31: the void is cured (`items-start`) but "redesign the page" is not attempted.

**Wave shape.** Rewrite these eight rows as falsifiable acceptance criteria (a named file, a named property, a target value) before any wave claims them, and mark F50 PRE-EXISTING rather than delivered.

### M12-A05-A07-A17-PARTIAL — A05 ruthless-reduction, A07 colocation, and A17 perf each landed one slice and are recorded at the same weight as the whole ask

**MINOR**

**Mechanism.** Umbrella asks were discharged by their most tractable sub-slice. There is no per-ask completion measure, so a 4.5% reduction, a `_shared` carve, and a boot-graph diet each read as the ask being handled.

**Evidence.** A05: dirs 66→63, exports 74→72 (above); real deletes were combobox, liquid-grid, pulse, FuzzySearch, DeckPager, fourier presets — none of them a row the user named. A07: 7d0c77ac carved `_shared` into disclosure/feedback/field/menu subdirs, but `find src/composables -name '*.ts' | wc -l` → 102 files still in 9 top-level global dirs (color, context, dark, dom, glass, keyboard, motion, reactive, sidebar) against "only truly module/global-level composables in `composables/`". A17: 5b34bb12 cut the boot graph 74+1 modulepreloads / 791,615 B → 56+1 / 483,862 B, but F01's "partially load, then stutter" class is structural — 77 landing cards each carry `content-visibility: auto; contain: content; contain-intrinsic-size: auto 19rem` (SectionPreviewCard.vue:62-64), which is itself a paint-on-scroll stutter source and was never measured.

**Wave shape.** Give each umbrella ask a numeric target (component count, composables-outside-colocation count, LCP/CLS on the landing) and close on the number, not on the first slice.

---

## DEAD CODE, DUAL PATHS, AND OVERFIT CENSUS — enumerate every exported symbol under src/components + src/composables, count real usage sites, and name the duplicate pairs.

_claude-opus-5[1m]_

### F1 — Aurora's WebGPU PRIMARY paints a strictly poorer picture than its WebGL2 FALLBACK — four distinct mediums collapse to one, silently

**BLOCKER**

**Mechanism.** The GLSL and WGSL arms of each viz are hand-authored twins with no equivalence gate and no runtime signal, so the two arms drift and the drift is invisible. `createGpuSubstrate` prefers WebGPU whenever `navigator.gpu` exists (src/composables/glass/webgpu/useGpuSubstrate.ts:1-9), and Aurora always supplies `setupWGPU` (runtime.ts:310-330), so Chrome/Edge take the WGSL arm. That arm's medium dispatch routes oil(3), vangogh(5), oil-pastel(6) and kuwahara(7) into a single `mediumKuwahara()` body, while the GLSL arm authors each separately (vangogh-medium.glsl.ts 258 lines, oil-modes.glsl.ts 112, brush.glsl.ts 385, mediums.glsl.ts 496). `RendererStatus.phase` reports `"ready"` for the degraded render (rendererStatus.ts:1-14) — there is no error, no warning, no attribute. This is the 'masking fallback' edict inverted: the fallback is the honest path.

**Evidence.** src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:396-401 —
```
// oil(3), vangogh(5), oil-pastel(6), kuwahara(7) all render the painterly
// anisotropic-Kuwahara finish on the WGSL primary (the WebGL2 fallback carries the
// full per-dab stroke cascade for oil/vangogh/oil-pastel).
if (medium == 3 || medium == 5 || medium == 6 || medium == 7) {
  return mediumKuwahara(col, p, t);
}
```
and :385-386 — "the full per-dab Starry-Night stroke WGSL remains a separate full-fidelity port". MEDIUM_ID map confirming the ids: src/components/aurora/composables/uniformBridge.ts:67-75. Magnitude of the twinning, measured: `find src/components/aurora -name '*.glsl.ts' -o -name '*.frag.ts' -o -name '*.vert.ts' | xargs wc -l` → 2305; `find src/components/aurora -name '*.wgsl.ts' | xargs wc -l` → 1093. Repo-wide dual-engine surface: 5648 shader lines (aurora 2305/1093, blob 923/684, fourier 242/401) + 2725 bridge/setup lines (glSetup 224 vs wgpuSetup 446; uniformBridge 360 vs uniformBridgeWGPU 237 + uniformBridgeWGPUImage 141; fourierFieldGLSetup 403 vs fourierFieldWGPUSetup 369) = 8373 lines, ~10% of the 86,899-line src.

**Wave shape.** Either port the three stroke mediums to WGSL so the two arms are provably equivalent, or delete `medium: oil|vangogh|oil-pastel` from AuroraConfig on both arms — and add a gate that reds when a `MEDIUM_ID` member has no dedicated body in BOTH shaders.

### F2 — There is no export-reachability gate for TS/JS — only for CSS — so 118 runtime exports have zero internal consumers and 5 are 100% dead

**MAJOR**

**Mechanism.** The repo has `tests/gates/orphan-css-partial.test.ts` enforcing that every `.css` partial is reachable from a published entry, but no symmetric gate for `.ts`/`.vue`. The `>= 2 sites OR exported` edict is therefore satisfied by simply typing `export`, and `export` is free. The result is a surface that reads alive and ships nothing. Compounding it, `vue-tsc --emitDeclarationOnly` mirrors ALL 600 src files into `dist/**/*.d.ts`, so any 'is it in dist?' check returns true for everything — the real public surface is only the 446 runtime symbols in the 67 entry chunks named by `package.json` exports.

**Evidence.** Method (scripts in /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/): symbols.mjs extracted 1355 exported declarations from 429 src modules; count.mjs ripgrep-counted each across src/ + demo/; pubsurface.mjs derived the 446-symbol true public runtime surface from the `export {}` statements of the 67 dist entry chunks; refine.mjs cross-classified. Result: 118 runtime exports have zero consumer file outside their own declaration file. Split — (A) 7 with zero references anywhere in the repo, verified individually: `rg -c -w AV_MAX_BLOBS -g '!docs/**' -g '!dist/**' .` → `./src/components/aurora/constants/budget.ts:1` and `rg -l -w AV_MAX_BLOBS dist/*.js` → empty. Same for `COMPLETION_SEAL_SETTLE_SPRING` + `COMPLETION_SEAL_DRAW_SPRING` (src/components/completion-seal/constants.ts:80,81), `DOCK_MORPH_MAX_STRETCH` (src/components/dock/constants.ts:20), `TOGGLE_GROUP_KEY` (src/components/toggle-group/toggleGroupContext.ts:13), `oklchColor` (src/composables/color/value.ts:53), `useOptionalDockCrossfadeContext` (src/components/dock/composables/dockCrossfadeContext.ts:74 — its only other reference is the barrel line that re-exports it). (B) 34 exported but used only inside their own file (e.g. `getSize` src/components/dock/composables/dockMorphMeasure.ts:3, `flagsFor` src/components/sortable-list/composables/transitionTiming.ts:33, `segmentWeight` src/components/timeline/geometry.ts:44). (C) 18 exported solely so a test can import them (e.g. `__resetSharedGpuDeviceForTest` src/composables/glass/webgpu/useWebGPUCanvas.ts:114, `FIELD_ALPHA_FLOOR` src/composables/glass/backdropLuminanceSample.ts:63). Gate inventory confirming the asymmetry: `ls tests/gates/` → boot-graph, orphan-css-partial, token-hygiene, type-hygiene — no export-reachability gate; `npm run verify:governed` = verify-governed-invariants.mjs, `verify:package` = verify-export-types.mjs (symbol-set fidelity, not reachability).

**Wave shape.** Add the TS twin of orphan-css-partial: walk the 67 entry chunks' export sets plus the src import graph, and red on any exported runtime symbol reachable by neither — then delete the 7 dead symbols and downgrade the 34 intra-file ones to module-private.

### F3 — `useCanvasLifecycle` is a literal alias-of-record, shipped on two public subpaths, with zero consumers — declared inside a barrel whose comment says 'CLEAN BREAK: no alias'

**MAJOR**

**Mechanism.** An alias was minted to give a second framing of one factory ('reach for this name when the lifecycle is the emphasis'), which is precisely the aliasing the standing edict forbids. Nothing enforces the edict, so the alias survived and the barrel comment contradicting it survived alongside it.

**Evidence.** src/composables/glass/canvas2d/useCanvas2D.ts:267 — `export const useCanvasLifecycle = useCanvas2D;` (jsdoc above it: "Alias-of-record for {@link useCanvas2D}"). Re-exported at src/composables/glass/canvas2d/index.ts:9 and src/composables/glass/index.ts:39. That same canvas2d/index.ts:7-8 reads "CLEAN BREAK: no `create*` factory alias — `useCanvas2D` is the sole factory name." Shipped: `rg -l -w useCanvasLifecycle dist/*.js` → `dist/canvas.js dist/glass-ui.js`. Consumers: `rg -n "useCanvasLifecycle" src demo --glob '!*.md'` returns only the three declaration/barrel lines — every real call site uses `useCanvas2D` (src/components/constellation/composables/useConstellation.ts:11,149,283). It is the only value alias in src: `rg -n '^export (const|function) (\w+)\s*=\s*(\w+);?$' src --glob '*.ts'` returns exactly this one line.

**Wave shape.** Delete the alias and its two barrel re-exports; regen exports so `/canvas` publishes one factory name.

### F4 — `floatingContentAttrs` is a 30-entry retired-prop deny-list applied at runtime on 6 components — a silent migration shim that swallows `asChild`

**MAJOR**

**Mechanism.** Rather than letting removed props fail loud (reka would warn, or the prop would simply not exist), a runtime filter strips them from `$attrs` before forwarding. Consumer markup carrying any of the 30 names produces no error, no warning, and no effect. The list includes reka's polymorphism props `as`, `as-child`, `asChild`, so a consumer's `<PopoverContent as-child>` renders as a plain forwarded div with no signal.

**Evidence.** src/components/_shared/floating.ts:17-55 declares `RETIRED_FLOATING_ATTRS` (30 entries: align-flip, arrow-padding, as, as-child, asChild, avoid-collisions, collision-boundary, collision-padding, dir, disable-outside-pointer-events, force-mount, hide-when-detached, memo-dependencies, position-strategy, prioritize-position, reference, side-flip, sticky, trap-focus, update-position-strategy, and their camelCase twins). :57-64 `floatingContentAttrs()` filters them out with no diagnostic. Applied in 6 SFCs: src/components/tooltip/TooltipContent.vue:37, src/components/popover/PopoverContent.vue, src/components/dropdown-menu/DropdownMenuContent.vue, src/components/dropdown-menu/DropdownMenuSubContent.vue:34, src/components/command/CommandList.vue:15, src/components/select/SelectContent.vue.

**Wave shape.** Delete the deny-list and the filter; forward `$attrs` untouched so a retired prop either errors in reka or lands visibly as a DOM attribute.

### F5 — `createCanvasLifecycle`'s `dprPolicy` 'migration seam' is a dead branch — every consumer supplies it, yet its absence-arm forces an optional `resize(s?)` signature and `?? canvas.width` defensive code across every viz

**MAJOR**

**Mechanism.** A dual path was left open for a hypothetical legacy caller, self-documented as "the migration seam". Because the seam is a type-level optional, its cost propagates: every viz's `resize` callback must declare `s?: BackingSize` and defensively fall back to a self-measure that can never execute.

**Evidence.** src/composables/glass/webgl/createCanvasLifecycle.ts:84-90 — "When ABSENT the leaf falls back to the legacy behaviour (the consumer's `resize()` self-measures) — the migration seam. ... The absent branch remains for direct legacy WebGL/WebGPU callers." The live branch at :213-219 (`if (dprPolicy !== undefined) { ... } else { options.resize(); }`). Consumer census: `rg -n "dprPolicy" src` shows all four consumers supply it — blob (useMetaballRenderer.ts:160), aurora (runtime.ts:315), fourier (useFourierField.ts:301), canvas2d (useCanvas2D.ts:132-133 defaults it unconditionally). Propagated cost: `src/components/fourier-field/composables/fourierFieldGLSetup.ts:160-162` → `function resize(s?: BackingSize): void { gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height); }`. Same optional signature at src/components/blob/composables/wgpuSetup.ts:145, src/components/blob/composables/useMetaballRenderer.ts:198, src/components/aurora/composables/wgpuSetup.ts:194,378, src/components/fourier-field/composables/fourierFieldWGPUSetup.ts:249.

**Wave shape.** Make `dprPolicy` required and `resize(s: BackingSize)` non-optional; delete the else-branch and every `s?.w ??` fallback.

### F6 — Three independent module-load `NATIVE_SCROLL_TIMELINE` feature-detect ladders, and the flagship one (`useScrollProgress`) has its gate exercised by nobody

**MAJOR**

**Mechanism.** Each scroll consumer re-derived its own 'CSS is primary, JS is the fallback' gate at module scope instead of sharing one. The gate's failure mode is silent inertness: on any engine that supports `scroll()`, `useScrollProgress` attaches no listener and its returned ref is frozen at the mount value. Its single in-repo consumer sidesteps the whole design by passing `reactive: true`, so the dual path has zero test coverage in either direction — while a sibling module's header records that the analogous CSS timeline (`.scroll-pin`) was already found dead on every engine.

**Evidence.** Three module-scope probes: src/composables/motion/scroll/useScrollProgress.ts:37, src/composables/motion/scroll/useScrollTrigger.ts:109, src/components/fading-scroll/constants.ts:14 — all `= supportsScrollTimeline()`. The gate: useScrollProgress.ts:57 `const needsReader = options.reactive === true || !NATIVE_SCROLL_TIMELINE;` and :117 `if (needsReader) start(); else if (isEnabled()) computeProgress();` — one shot, then frozen. Its ONLY call site is src/components/aurora/composables/useAurora.ts:169-173, which passes `reactive: true` (verified: `rg -n "useScrollProgress\s*\(|import.*useScrollProgress" src demo tests` returns only the declaration and this one site). Corroborating deadness of the CSS 'primary': src/composables/motion/scroll/useScrollPin.ts:3-7 — "Replaces the DEAD `.scroll-pin` named-`scroll-timeline` (which resolved `currentTime: null` on EVERY engine ... the bound reveal parked at its `from` keyframe forever)".

**Wave shape.** Collapse to one shared timeline-capability module and delete `useScrollProgress`'s inert arm — either the JS reader always runs, or the composable is deleted and Aurora reads `useScrollTrigger`'s progress.

### F7 — Selection-engine trifurcation: `useSelectionGroup` documents itself as the ONE engine for dock + SegmentedTabs + ToggleGroup, but SegmentedTabs bypasses it and ToggleGroup uses reka's roving focus instead

**MAJOR**

**Mechanism.** A unification wave landed the engine and the prose, but only re-pointed one of the three named consumers. The other two kept their prior assemblies, and the doc comment now asserts a consolidation that the import graph contradicts — so the next reader trusts the comment and does not look.

**Evidence.** Claim: src/composables/motion/morph/useSelectionIndicator.ts:19-23 — "the indicator that glides under the active selection is factored ONCE here ... and consumed by every selection surface (SegmentedTabs pill, the dock control run, the ToggleGroup single-select arm) — never re-forked"; src/composables/motion/morph/useSelectionGroup.ts:16-19 — "the library's single headless selection engine. The dock control run, `<SegmentedTabs>`, and `<ToggleGroup type=\"single\">` are the SAME thing". Reality — path A: src/components/dock/DockLayerGroup.vue:13,102 imports and calls `useSelectionGroup`. Path B: src/components/tabs/SegmentedTabs.vue imports `useSelectionIndicator` (:20, called :214) and `useTabRovingFocus` (:24-26, called :295) DIRECTLY — it never imports `useSelectionGroup`. Path C: src/components/toggle-group/ToggleGroup.vue imports `ToggleGroupRoot as RekaToggleGroupRoot` from reka-ui (:3) and binds `:roving-focus="rovingFocus"` (:114); `rg -n "useSelection|Indicator|roving" src/components/toggle-group/*.vue *.ts` shows zero references to either house composable and zero indicator. Two divergent indicator CSS recipes back paths A and B: `rg -c indicator src/components/tabs/styles/segmented.css src/components/dock/styles/layer-group.css` → 33 and 17; ToggleGroup's styles.css has none.

**Wave shape.** Re-point SegmentedTabs onto `useSelectionGroup` and either give ToggleGroup the same engine or strike it from the doc claim — then unify the two indicator CSS recipes onto one.

### F8 — `_shared/axes.ts` keeps three dead meta-arrays alive with `void` statements, and they ship as runtime bytes on a subpath documented as types-only

**MAJOR**

**Mechanism.** `void x;` is a real use to both TypeScript's unused check and the bundler's DCE, so it is a suppression that converts dead code into shipped code. The comment justifying them names a gate ('proof:encapsulation reads these') that does not exist at HEAD — the classic self-referential-derived-data pattern: a manifest of a module's own export names, maintained by hand, read by nobody.

**Evidence.** src/components/_shared/axes.ts:73-101 declares `AXIS_TUPLES`, `AXIS_TYPE_NAMES`, `ALLOWED_EXPORTS` (all `const`, none exported) then :99-101 `void AXIS_TUPLES; void AXIS_TYPE_NAMES; void ALLOWED_EXPORTS;`. `rg -n "AXIS_TUPLE_NAMES|AXIS_TYPE_NAMES" src demo tests scripts` → only the declarations and the void lines; no gate reads them. Proof they ship — `cat dist/axes.js` (878 bytes total) contains `l = ["SIZES","ORIENTATIONS","MOTIONS","SURFACES","SURFACE_TIERS","TONES","PLACEMENTS","TRIGGERS","BACKDROPS"], u = ["Size","Orientation",...]` and the evaluated dead expression `[...l, ...u];`. Contradicting doc: src/index.ts:258-259 — "Types-only re-export — no runtime import". Separately, 6 of the 9 exported tuples (`SURFACE_TIERS`:26, `SIZES`:30, `ORIENTATIONS`:34, `PLACEMENTS`:55, `TRIGGERS`:59, `BACKDROPS`:63) have zero consumers in src/ or demo/.

**Wave shape.** Delete the three void'd arrays and the six unconsumed tuples; make `/axes` genuinely types-only so `dist/axes.js` is empty or gone.

### F9 — `engageEnvelopes.ts` is a 117-line published register that governs nothing — its only reader is a test asserting the table against constants declared in the same file

**MINOR**

**Mechanism.** The 'no constant may be minted outside this table' authority pattern was copied from `springPresets.ts` without its consumers or its generator. `springPresets` has 11 consumers and feeds scripts/regen-spring-tokens.mjs; `engageEnvelopes` has neither, so the register is a value object nobody reads and its test is a tautology (a convergence gate over duplicated derived data).

**Evidence.** src/composables/motion/engage/engageEnvelopes.ts:53-56 — "No envelope constant may be minted outside this table: a new engagement earns a new ROW here, never a literal at a call site." Full reference set — `rg -n "ENGAGE_ENVELOPES|engageEnvelope|ACKNOWLEDGE_WINDOW|ENGAGE_ATTACK" -g '!node_modules' -g '!docs/**' .` returns exactly the declaration file, the barrel (src/composables/motion/index.ts:74-81), and tests/composables/motion/engageEnvelopes.test.ts, whose assertions are `expect(engageEnvelope(row.role)).toBe(row)` (:13) and `expect(row.attackMs).toBeGreaterThanOrEqual(ENGAGE_ATTACK_CLASS.minMs)` (:22) — both comparing the module to itself. Zero CSS uptake: `rg -n "press-drain|medium-exit|control-engage|signal-decay|--engage" src/styles src/components --glob '*.css'` → no matches. It nonetheless ships: `rg -l -w ENGAGE_ENVELOPES dist/*.js` → `dist/motion.js`. Contrast `springPresets.ts` — 11 consumers, read by scripts/regen-spring-tokens.mjs.

**Wave shape.** Either wire the envelopes into a CSS token generator the way springPresets is, or delete the module, its 5 public exports and its tautological test.

### F10 — Four published motion composables (627 lines) have no src or demo consumer; the scroll-scene chain's only consumer is a demo story

**MINOR**

**Mechanism.** Composables land as public surface on the strength of a wave spec rather than a call site, and nothing measures uptake afterward. Every one of these is exported, so the `>= 2 sites OR exported` edict is nominally satisfied and the census never runs.

**Evidence.** Real import sites (`rg -n "from .*<name>|import.*<name>" src demo tests --glob '!*.md'`, barrel lines excluded): `useStagger` (src/composables/motion/reveal/useStagger.ts, 151 lines) — only tests/composables/motion/useStagger.test.ts:4; ships on `/motion-core` (`rg -l -w useStagger dist/*.js` → dist/motion-core.js). `useAnimatedNumberMap` (src/composables/motion/number/useAnimatedNumberMap.ts) — zero importers anywhere including tests; ships on dist/motion.js AND the root barrel (src/index.ts is documented as re-exporting it at :40). `useScrollScene` (228 lines) — one internal importer, useScrollPin.ts:23. `useScrollPin` (127 lines) — one importer, demo/stories/motion/scroll/ScrollChoreographyBody.vue:18. `useDeck`+`useDeckKeyboard` (src/components/deck/, 202 lines, its own `/deck` subpath) — one importer, demo/stories/motion/deck.vue:15. Directory-level census (scratchpad/dircensus.mjs) found 13 PUBLISH packages with zero src consumers and exactly one demo consumer: animated-digit, carousel, completion-seal, deck, drawer, easing, expandable-container, handmark, header-ribbon, instrument-chassis, paper-backdrop, scroll-progress-rim, typewriter.

**Wave shape.** Set an uptake bar for the public surface (>= 1 non-demo consumer or a named external consumer) and retire what misses it, starting with useAnimatedNumberMap which has literally no reader.

### F11 — Eight re-export shims exist purely to hold a symbol on a barrel path after its implementation moved — one says so in the comment

**MINOR**

**Mechanism.** When a leaf is relocated to satisfy an SCC/bundle fence, the old module keeps a bare `export { X }` so the published symbol name does not change. That is a compat shim by construction; the edict forbids it and the consumer-updates ruling says the consumer adapts instead.

**Evidence.** `node -e` over the symbol census found 18 names declared/exported from >1 file; 8 are pure re-export shims: src/composables/motion/morph/useElementMorph.ts:80-81 — "Imported for local use and re-exported so the public `/motion` symbol is unchanged." `import { asElement } from "../core/asElement"; export { asElement };`. Others: src/components/search/searchVariants.ts:42 `export { controlSizeClass }` (declared _shared/control-size.ts:9); src/components/constellation/constellationInteraction.ts:32 re-exports 5 constants declared in constants.ts:48,49,58,73,74 (comment at :27 — "re-exported here for the package barrel path"); src/components/handmark/geometry.ts:50 `export { VB_W, VB_H, UNDERLINE_GAP }` (declared constants.ts:9,11,20); src/components/sortable-list/composables/useSortable.ts:156 `export { isNonZeroRadius }` (declared ghostRenderer.ts:26); src/composables/glass/webgl/createCanvasLifecycle.ts:44 re-exports `sizeBacking` (declared backingSize.ts:43); src/composables/glass/webgpu/useGpuSubstrate.ts:35 `export { supportsWebGPU }` (declared useWebGPUCanvas.ts:80); src/components/blob/composables/useBlobPointer.ts:6 re-exports `TRAIL_N` (declared constants.ts:16).

**Wave shape.** Delete each shim and re-point the barrel at the real owning module; where a published subpath name would change, change it (clean break).

### F12 — Stale prose points at modules and substrates that no longer exist, so the docs actively misdirect the next reader

**OBSERVATION**

**Mechanism.** Retirement waves delete the code but not the sentences describing it. Prose is not gated by anything, so a phantom name survives indefinitely and is indistinguishable from a live one at review time.

**Evidence.** `useStaggerReveal` — named as the live composable half of a dual path in 4 places (src/styles/scroll-driven.css:13, :21 "See the gate at the top of `useScrollProgress.ts` / `useStaggerReveal.ts`", :63, src/styles/tokens/scroll-tokens.css:15) but `rg -n "useStaggerReveal" src demo tests` finds no such module at HEAD — the actual composable is `useStagger`, which itself has zero consumers (F10). "the reka TabsIndicator" — src/components/dock/styles/layer-group.css:166 describes `.dock-layer-tab-indicator` as the reka TabsIndicator, but src/index.ts:120-128 records the reka tabs substrate as retired and `rg -n "TabsIndicator|TabsRoot|TabsList" src` returns zero hits; the class is actually written by hand at src/components/dock/DockLayerGroup.vue:268.

**Wave shape.** Grep every prose-named symbol in src comments against the symbol table and strike the ones that resolve to nothing.

---

## CONSUMER TRUTH — export map, public surface, and the package as actually built

_claude-opus-5[1m]_

### CT-1 — Root barrel `@mkbabb/glass-ui` hard-requires the peer it declares optional — a README-conformant install produces a package whose main entry throws

**BLOCKER**

**Mechanism.** `peerDependenciesMeta` optionality is asserted in package.json but never enforced against the built module graph. `Button.vue` (a root-barrel export) pulls `useLiquidPress → useSpringPress → useSpring → SpringProgress` from `@mkbabb/keyframes.js` as a TOP-LEVEL static import, and vite externalizes it, so the static specifier survives into `dist/glass-ui.js`'s chunk graph. npm does not auto-install peers marked optional, so the documented one-line install yields a broken main entry. The gate that should catch this (`scripts/verify-export-types.mjs`) never executes any module: `validateStrictConsumer` emits only `import "<spec>";` side-effect statements into a TS program, so it proves files exist and declarations parse and is structurally incapable of observing a runtime resolution failure. Same mechanism, 19 subpaths.

**Evidence.** package.json:528 declares `"@mkbabb/keyframes.js": "^6.0.0"` as a peer; package.json:549-551 marks it `"optional": true`. src/index.ts:21 asserts the opposite: `// This root barrel is **vueuse-free** AND **keyframes.js-free**: it does` `// NOT re-export any symbol whose implementation imports @vueuse/core OR @mkbabb/keyframes.js`. src/components/button/Button.vue:13 `import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress"`; src/composables/motion/spring/useSpring.ts:15 `import { SpringProgress } from "@mkbabb/keyframes.js"` — and useLiquidPress.ts:23 even records `It ships on /motion only because the spring is keyframes-backed`. Built chunk path (BFS over dist static imports): `glass-ui.js -> button-DQBVoEP4.js -> useLiquidPress-CUt4FO3u.js -> useSpring-9u2_shxV.js -> @mkbabb/keyframes.js`. REPRO — Node ESM resolver hook that hides only the three @mkbabb optional peers (vueuse/embla left installed, since reka-ui hard-depends on @vueuse/core anyway), then `import()` every subpath: `ok: 48  HARD-FAIL: 19 of 67` — `@mkbabb/glass-ui  Cannot find package '@mkbabb/keyframes.js'`, plus /carousel /motion /animated-digit /button /command /dark-mode-toggle /dialog /dock /drawer /easing /number-field /tabs /timeline (keyframes.js), /color /aurora /blob /fourier-field (@mkbabb/value.js/color), /handmark (@mkbabb/pencil-boil). README.md:8 documents the install as exactly `npm install @mkbabb/glass-ui`, with no peer line.

**Wave shape.** Make declared optionality true or delete it: either move keyframes.js/value.js/pencil-boil to required peers (and say so in README), or push the three behind guarded dynamic boundaries so the static graph of every entry is peer-clean — then add the missing gate arm that actually `import()`s all 67 subpaths under a resolver with the optional peers hidden, so the claim is proven per build rather than asserted in a comment.

### CT-2 — The entire published type surface is empty under `moduleResolution: node16`/`nodenext` — `import { Button } from "@mkbabb/glass-ui"` reports "has no exported member"

**BLOCKER**

**Mechanism.** `flatten-subpath-types.mjs` mints every one of the 67 flat declaration entries as `export * from "./components/<dir>"` — an extensionless DIRECTORY specifier. That form is legal only under classic/bundler resolution; under Node16/NodeNext ESM resolution (the mode TypeScript prescribes for a `"type": "module"` package, and the default under `--module nodenext`) extensionless and directory-index specifiers do not resolve, so every `export *` contributes nothing and the barrels evaluate to empty modules. It is invisible because the only consumer probe in the repo pins one resolution mode: `verify-export-types.mjs:266` sets `moduleResolution: ts.ModuleResolutionKind.Bundler`, and its probe source is side-effect imports only (`import "<spec>";`), so it never asks whether a single NAME resolves. Bundler-mode consumers (Vite/webpack) are fine, which is why the dev loop and the demo never see it.

**Evidence.** scripts/flatten-subpath-types.mjs:24 — `writeFileSync(target, \`export * from ${JSON.stringify(specifier)};\n\`)`; resulting `dist/dock.d.ts` is literally `export * from "./components/dock";` and `dist/index.d.ts` is 31 such lines. scripts/verify-export-types.mjs:266 — `moduleResolution: ts.ModuleResolutionKind.Bundler`. REPRO, external consumer package (scratchpad/consumer/package.json = `{"type":"module"}`, glass-ui copied as a real dir into its node_modules), source `import { Button, Card } from "@mkbabb/glass-ui"; import { GlassDock } from "@mkbabb/glass-ui/dock";`, skipLibCheck:true — `moduleResolution: bundler -> diagnostics: 0`; `moduleResolution: node16 -> diagnostics: 3` : `TS2305 Module '"@mkbabb/glass-ui"' has no exported member 'Button'` / `'Card'` / `TS2305 Module '"@mkbabb/glass-ui/dock"' has no exported member 'GlassDock'`. With skipLibCheck:false the same probe over all 67 specifiers yields 110 diagnostics, 109 of them `TS2834 Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'` anchored at dist/<name>.d.ts:1.

**Wave shape.** Emit the flat declaration entries with explicit resolvable specifiers (`export * from "./components/dock/index.js"`) so the published types resolve identically under bundler and node16/nodenext, and widen the verify probe to type-check NAMED imports under all three resolution modes instead of side-effect imports under one.

### CT-3 — `@mkbabb/glass-ui/styles` silently overrides the consumer's Tailwind `@theme` — `--spacing`, `--radius*`, `--text-base`, `--container-lg`, `--font-weight-*`, `--leading-snug` are re-declared at a HIGHER cascade layer

**MAJOR**

**Mechanism.** The utility emitter's R3 self-sufficiency patch backfills Tailwind's own built-in theme defaults as bare literals in a `:root{}` block so glass-ui's emitted utilities paint for a bare consumer. But the delivery path wraps that file in `layer(components)`, and index.css declares the order `theme, base, components, utilities`. A consumer's `@theme` compiles into `@layer theme`; a later layer beats an earlier one at equal specificity, so the backfill is not a fallback — it is an unconditional override of the consumer's design tokens for their whole document. The emitter already knew the hazard (it special-cases `--default-transition-duration` through `var(--duration-fast, 150ms)` precisely so "the dist never CLOBBERS a consumer's own @theme with a bare literal") but applied the guard to one property out of fourteen; the layer placement, not the property list, is the actual defect.

**Evidence.** vite.utility-emit.ts:158-224 computes `baseProps = referenced ∩ themeOwned − glassDefined` and emits them as literals; the guard comment `so the dist never CLOBBERS a consumer's own @theme with a bare literal` sits at the `houseAlias` map, which contains exactly one entry. Built output — `dist/styles/components.css` opens with `:root { --animate-spin: spin 1s linear infinite; --container-lg: 32rem; --default-transition-duration: var(--duration-fast, 150ms); --default-transition-timing-function: cubic-bezier(0.4,0,0.2,1); --font-weight-medium: 500; --font-weight-normal: 400; --font-weight-semibold: 600; --leading-snug: 1.375; --radius: 0.25rem; --radius-lg: 0.5rem; --radius-sm: 0.25rem; --spacing: 0.25rem; --text-base: 1rem; --text-base--line-height: calc(1.5/1); }` and `grep -c '@layer' dist/styles/components.css` = 0 (nothing re-layers it internally). Delivery: `dist/styles/index.css` line 1 `@layer theme, base, components, utilities;` and `@import "./components.css" layer(components);`. Every one of those props is a Tailwind-owned theme key — `grep -E '(--spacing|--radius|--radius-lg|--radius-sm|--text-base|--container-lg|--font-weight-medium|--leading-snug|--animate-spin):' node_modules/tailwindcss/theme.css` matches all nine. `--spacing` is the root of every `p-*`/`gap-*`/`m-*` utility (`calc(var(--spacing) * N)`), so a consumer who retunes it loses the retune on import.

**Wave shape.** Emit the Tailwind-default backfill somewhere it can only lose to the consumer — inside `@layer theme` (or unlayered ahead of the layer block) — so it fills a gap for a bare consumer without outranking anyone's `@theme`.

### CT-4 — The `./styles.css` export ships components whose paint is structurally undefined — 143 of its 172 no-fallback custom properties resolve to nothing

**MAJOR**

**Mechanism.** `./styles.css` is published as a peer of `./styles` ("a transparent SFC-only entry ... for a cascade-free consumer"), but the SFC rules are written against the token cascade and the entry deliberately excludes it. The BJ.W4-TYPEDSEAM repair generalized from two missing partials (track-well, value-marks) rather than from the class — a component-only stylesheet cannot be honest while its rules read tokens that only the full cascade mints. Every unresolved `var()` in a non-custom property makes the whole declaration invalid-at-computed-value-time, so the affected properties fall back to `unset`, not to a sane default. The name is also the most guessable specifier in the package, so this is the entry a consumer reaches for first.

**Evidence.** Transitive @import closure of `dist/component-styles.css` (4 files: track-well.css, value-marks.css, glass-ui.css): 172 distinct no-fallback `var(--x)` references, 47 custom properties defined, 143 undefined after excluding `--reka-*`/`--tw-*` — including `--foreground --radius-control --radius-pill --radius-field --control-h-md --control-h-sm --control-h-lg --control-text --muted-foreground --destructive --focus-ring-color --glass-rim-top --glass-rim-bottom --ui-scale --duration-slow --ease-standard --opacity-disabled`. The same closure for `./styles` (112 files) has 729 no-fallback refs and only 19 undefined, all of which I verified are runtime-written or Tailwind-owned (e.g. PagerDots.vue:286 writes `--pager-goo-filter`, Progress.vue:91 writes `--value-mark-position`, `--leading-normal` is a Tailwind theme default). Concrete broken rules under `./styles.css`: `.checkbox{border:1px solid var(--control-ring);border-radius:var(--radius-control);…}` → border-radius:0; `.field-control{--field-control-height:var(--control-h-md);…color:var(--foreground);font-size:var(--field-control-font);…}` → no height, no font-size, inherited color. `grep -c -- '--radius-control:' ` over the three closure files = 0/0/0, over the full ./styles cascade = 1.

**Wave shape.** Either fold the token prerequisites into `dist/component-styles.css` so the entry is genuinely self-sufficient, or delete `./styles.css` outright (clean break) and leave `./styles` as the one honest style entry — the current middle state publishes a stylesheet that cannot paint.

### CT-5 — The one dynamic-import optionality boundary in the library has no rejection handler — a missing `@mkbabb/value.js` becomes an unhandled promise rejection, which is a process kill under Node's default

**MAJOR**

**Mechanism.** `useAccentTone` is the designed lazy boundary that keeps value.js off the eager graph for Chip/Dock, but the boundary is written as `void import(...).then(...)` with no `.catch`. Dynamic import is being used as the optionality MECHANISM while the failure mode of an absent optional peer — rejection — is unhandled, so "optional" degrades into an unhandled rejection instead of a no-op. Node ≥15 defaults to `--unhandled-rejections=throw`, so an SSR/prerender render that mounts a Chip with a concrete tone crashes the process; in the browser it is a permanent console error and the ink never resolves.

**Evidence.** src/composables/color/useAccentTone.ts:97 — `void import("./accent-tone-solve").then(({ solveAccentInk }) => {` … no `.catch` anywhere in the file (`grep -n 'catch' src/composables/color/useAccentTone.ts` → no match). REPRO: `node --import <hook hiding @mkbabb/value.js> -e 'const m = await import("…/dist/useAccentTone-DyInfHXE.js"); const r = Object.values(m)[0]("#ff0055"); r.ink.value; await sleep(300)'` → prints `ink initial: ""` then `UNHANDLED REJECTION: Cannot find package '@mkbabb/value.js/color'` and exits non-zero. Built path: `glass-ui.js -> chip-DFZQr6rV.js -> useAccentTone-DyInfHXE.js -> accent-tone-solve-Cw7WkRD9.js -> @mkbabb/value.js/color` (dynamic edge only, which is why /chip and /dock survive the static probe in CT-1 and fail only on mount).

**Wave shape.** Give the lazy boundary a `.catch` that caches the empty ink and leaves the CSS `var(--accent-ink-resolved, var(--foreground))` fallback in charge, so an absent optional peer degrades silently exactly as the composable's own comment promises.

### CT-6 — README and the root barrel's own API table document two symbols that do not exist on the published surface: `useKeyboardShortcuts` and `Combobox`

**MINOR**

**Mechanism.** Public-API prose is maintained by hand in three places (README usage block, src/index.ts heavy-peer table, the file name `useKeyboardShortcuts.ts`) with no gate binding any of them to the emitted export set. `verify-export-types.mjs` proves declarations parse and files exist but asserts nothing about names, so a rename/retirement leaves the documentation — and even the source file name — pointing at a symbol that was never re-added. `Combobox` compounds it: src/index.ts names `<Combobox multiple>` as the successor API for the retired MultiSelect, so the documented migration target is unreachable.

**Evidence.** Runtime check of every README import statement against the built modules: `MISSING @mkbabb/glass-ui/keyboard -> useKeyboardShortcuts` and `MISSING @mkbabb/glass-ui/forms -> Combobox`; the other eight claims pass. README.md:19 `import { useKeyboardShortcuts, registerShortcut } from "@mkbabb/glass-ui/keyboard";` (repeated at README.md:120) and README.md:21 `import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";` (repeated at :122). src/index.ts:30 lists `useKeyboardShortcuts` in the heavy-peer subpath table; src/index.ts:148 says it was "intentionally removed from the root barrel", implying it lives on /keyboard. But `grep -n '^export' src/composables/keyboard/useKeyboardShortcuts.ts` yields only `isMac, formatComboParts, formatCombo, registerShortcut, useRegisteredShortcuts` (+4 types) — no symbol of that name exists in the file that bears it. `grep -rn 'Combobox' src` finds only the reka substrate types in `_shared/selection.ts` and prose; no component. src/index.ts:104-105 names `<Combobox multiple>` as the MultiSelect successor.

**Wave shape.** Bind the documented names to the emitted export set — a gate that extracts every identifier from README's import statements and asserts it is a runtime export of the specifier it is imported from — then fix or delete the two dead names (and rename `useKeyboardShortcuts.ts` to what it actually exports).

### CT-7 — 26.6 KB of component CSS ships in the tarball unreachable from any export entry

**OBSERVATION**

**Mechanism.** `copyStyleAssets` mirrors EVERY `src/components/**/*.css` into `dist/components/` with a blanket `.css` filter, but only the 26 partials that `src/styles/index.css` names are reachable from a published entry. The 13 partials consumed exclusively through SFC `<style src="…">` already ship inside `dist/glass-ui.css` via the SFC fold, so their mirrored copies are pure dead payload. The existing gate cannot see it by design — tests/gates/orphan-css-partial.test.ts:10-17 states "SCOPE — SOURCE REACH, NOT A dist/ BYTE READ" and explicitly excludes package-OUTPUT concerns — so nothing measures the shipped side.

**Evidence.** vite.style-fold.ts `copyStyleAssets` — `cpSync(srcComponents, distComponents, { recursive: true, filter: (path) => statSync(path).isDirectory() || path.endsWith(".css") })`. Transitive @import closure of the four published CSS entries (./styles, ./styles/fonts, ./styles/theme, ./styles.css) over the 127 .css files in dist: reachable 114, ORPHAN 13, 26640 bytes — dist/components/{_shared/disclosure/disclosure.css, _shared/field/field-control.css, avatar, checkbox, command, data-table, dropdown-menu, expandable-container, number-field, radio-group, switch, tags-input, toggle-group}/styles.css. Their rules are not missing, only duplicated: e.g. `.glass-avatar`, `.checkbox`, `.toggle-group`, `.data-table` each appear exactly once in dist/glass-ui.css. (For the record, the src-side invariant is clean: I cross-checked all 124 src .css files' selectors/@property/@utility/attribute-selectors against the 330 KB flattened dist cascade — zero orphans, and all 139 export targets resolve to real files after build.)

**Wave shape.** Narrow the component-CSS mirror to the partials the dist cascade actually @imports, so the tarball carries each rule once.

---

## CORPUS PROCESS PATHOLOGY — the tranche documentation apparatus audited as a defect surface in its own right

_claude-opus-5[1m]_

### P-1 — Convergence gates hash their own provenance, so "two consecutive clean" is mathematically unreachable

**BLOCKER**

**Mechanism.** The convergence artifact embeds cryptographic hashes of its own predecessor and of the critic documents that judged it (`supersedesRosterSha256`, `parentFormationSha256`, `criticSha256.{A,B}`, an incrementing `schemaVersion`). Every round therefore produces a byte-different artifact even when zero content changed — and a byte-different artifact is, to the loop, a delta. The gate cannot terminate by construction. The loop instead terminates by exhaustion, and the critics, needing something to say, iterate one prose clause into ever-longer baroque restatements.

**Evidence.** docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C{8..19}.{json,md} — 13 full re-issues growing 529→1360 lines, plus 24 CRITIC/CANDIDATE/ADJUDICATION docs, 19,484 lines total, all produced 09:02–12:23 on 2026-07-22 (3h21m). `diff GATE-SEMANTIC-ROSTER-C17.json GATE-SEMANTIC-ROSTER-C18.json` → 24 lines, of which 23 are schemaVersion 9→10, supersedesRosterSha256, parentFormation + its sha, and criticSha256 A/B. Exactly ONE content line differs (line 936): a mutation-spec string that grows from `"patch only globalThis.EventTarget.prototype…"` to `"replace the dynamically discovered add/remove owner…"` to (C19) a 90-word paragraph. C17/C18/C19 are all 1360 lines.

**Wave shape.** Strip provenance from the artifact — hashes and parentage live in git or a sidecar, never inside the thing being compared — and define the convergence predicate over the content-only projection so an empty content diff terminates the loop automatically.

### P-2 — Critic seats may raise findings against documents, so the loop's own cures manufacture the next round's findings

**BLOCKER**

**Mechanism.** Nothing in the process restricts an admissible finding to a source artifact. A critic can therefore file against the corpus itself, and because derived data (counts, rosters, phase lists, SHAs) is duplicated across PLAN.md, APOTHEOSIS.md, the cursor and the band files, every cure that charters a wave invalidates three or four copies — which the next round's critics correctly report. Finding volume plateaus rather than decays, and yield collapses. The corpus diagnosed this itself and applied the cure to *counts* only; the identical mechanism then recurred for *hashes* (P-1) and for *SHAs* (P-7), because the cure was a one-time sweep and not a standing admissibility rule.

**Evidence.** Commit c9207a00 body, verbatim: "round 12 exposes the loop's own mechanism: earlier rounds CHARTERED new waves … and every count ledger, phase list and roster that duplicates those figures then reads stale — the cures manufacture the next round's findings"; per-round material r9=13 · r10=9 · r11=12 · r12=13 (plateau). docs/tranches/BJ/formation/stability/DEDUP-LEDGER.md:14-18: "An unbounded adversarial loop over duplicated derived data cannot converge by construction." ESCALATION-LEDGER.md tally: of 22 escalated legs from six rounds — 3 FOLDED, 12 DISCHARGED-AS-REDUNDANT, 4 ROUTED, 3 pre-discharged. 13.6% yield; zero changed src. Six stability rounds cost 30 files / 7,054 lines.

**Wave shape.** Make a finding inadmissible unless it names a path under src/ or tests/ and a command that fails; findings whose subject is another document are out of scope by construction, so the loop can only be fed by the product.

### P-3 — A live 6-line defect is held open behind a routing target that has never authored a commit in repository history

**BLOCKER**

**Mechanism.** The process introduced a model-caste gate: bounded product/test edits are reserved for a "Luna x-high" seat. That seat has produced zero commits, ever. Routing to it is therefore an absorbing sink — an obligation enters, a document is emitted explaining that the fix was NOT made, and the defect stays live. Because the sink is cheap and lawful, seats prefer it: writing the routing document is in-caste, writing the fix is not. The output of a defect-finding pass becomes prose about the defect rather than the defect's removal.

**Evidence.** `git log --all --format='%B' | grep -ci 'model: *luna'` → 0. `grep -ril 'NEEDS-LUNA\|Luna x-high' docs/tranches/BJ | wc -l` → 103. Three defects verified LIVE by me at HEAD in src/composables/glass/supportsBackdropRefract.ts: (a) :130-133 `armed = true; if (supportsBackdropRefract()) { document.documentElement.setAttribute(REFRACT_ATTR, "on") }` — no `removeAttribute` on any negative arm, so a stale root `data-glass-refract="on"` survives an honest rejection; (b) same lines — `armed = true` is set BEFORE the throwing probe with no try/catch around it, so a throw half-arms the module and latches the stale `on`; (c) :52 `let armed = false;` is a plain module-global with `:126 if (armed || …) return`, so a second Document (iframe / multi-root SPA / test host) never arms and its `.glass-lens` stays blur-only forever. The fix is ~6 lines. docs/tranches/BJ/waves/BAND-MATERIAL.md §CLOSE HARDENING III (commit 4b5bc369, +50 lines) documents all three and routes them onward.

**Wave shape.** Delete the caste gate for bounded fixes — the seat that reproduces a ≤10-line defect lands it — and make a route to a seat with no landed commits a hard failure rather than a valid disposition.

### P-4 — 82% of the tranche's execution-week commits change no source; the week's process output is 43x its product output

**BLOCKER**

**Mechanism.** No invariant relates process output to product output, so the ratio is free to grow monotonically and has. There is no cap, no close-time reconciliation, and no cost attached to emitting a document — while every document is a new surface that a later round can find stale (feeding P-2). The corpus is not documenting the work; it is the work.

**Evidence.** BJ execution window 2026-07-17..07-23: `git log --numstat` → docs±=191,172 src±=8,427 tests±=8,968; 181 commits, 149 of which (82.3%) touch zero files under src/. On top of that, 172,112 lines of UNTRACKED addenda were produced in a single ~20-hour span (docs/tranches/BJ/addenda/2026-07-21-convergent-hardening, 206 files, mtimes 2026-07-21 23:00 → 07-22 18:00, ~10 files/hour sustained). Combined process:product for the week ≈ 363,000 : 8,427 = 43:1. Monthly doc:src churn trend: 2026-04 = 0.6, 05 = 16.3, 06 = 4.6, 07 = 20.8. All-time: docs/tranches± = 4,262,020 vs src± = 391,855 = 10.9:1. Standing corpus: 4,612 tranche .md files vs 694 src files = 6.6 markdown files per source file.

**Wave shape.** Impose a hard per-tranche budget invariant checked at close — tranche doc lines must not exceed a fixed multiple of the src lines the tranche actually changed — with over-budget documents deleted, not archived.

### P-5 — 58% of BJ documents never name a source file; the coordination layer is 87% and the binding steer stream is 94%

**BLOCKER**

**Mechanism.** There is no admissibility rule tying a document to a source artifact. The cheapest way for a seat to discharge an obligation is therefore to write a document whose only referents are other documents — it costs nothing, it cannot fail a test, and it is indistinguishable at review time from work. This is the supply side of P-2: it manufactures the surface that critics then find stale.

**Evidence.** Scripted census over docs/tranches/BJ: 280 of 484 .md files (57.8%) contain no match for `src/…\.(ts|vue|css|js|mts)`; 214 of those 280 cite other .md files. Per subdir: coordination 36/41 (87%), formation/stability 22/30 (73%), addenda 109/193 (56%), formation 124/227 (54%). Of the 34 SOL-TO-CLAUDE-LIVE-STEER files (1,730 lines of binding instruction), 32 contain zero `src/` references — STEER-33 (27 lines, 0 src refs, 0 md refs) rules on which thread owns a coordination inbox; STEER-23 (37 lines) rules that a closer must "make no product, test, gate, package, band-note, receipt, staging, or commit change" and "return NEEDS-LUNA". Filename genre census: 201/484 BJ files (41.5%) carry ADJUDICAT/RECONCIL/RECEIPT/CORRECT/CRITIC/STEER/ROSTER/CENSUS/LEDGER in the name; in the addenda specifically, 140/192 (73%).

**Wave shape.** Require every tranche document to declare at least one src/ or tests/ path in a machine-checked header, and delete at close any document that never named one.

### P-9 — The executable quality surface is RED at HEAD while the doc corpus reports closure, because status is authored rather than emitted

**BLOCKER**

**Mechanism.** Wave close is a prose stamp a seat writes into a band file. Nothing forces a runner's exit code into that stamp, so the doc corpus can only be as fresh as the last seat that chose to run something and write it down — and it is being written far faster than the suite is being run. Additionally, 1,119 lines of test changes and the entire supportsBackdropRefract test sit uncommitted, so the corpus's freshest 'GREEN' claims describe bytes that are not in the repository.

**Evidence.** `npx vitest run tests/gates` at working HEAD → "Test Files 2 failed | 6 passed (8) / Tests 2 failed | 60 passed (62)". tests/gates/boot-graph.test.ts:538 — "dist-demo/index.html is STALE (built 2026-07-22T07:16:17.634Z, newest source 2026-07-22T11:10:48.007Z) … a stale build greens a regressed graph". `git status --porcelain --untracked-files=all src/ tests/ tests-visual/` → 34 entries; `git diff --stat src/ tests/` → 29 files, 1,119 insertions, 231 deletions, all uncommitted. The untracked tests/composables/glass/supportsBackdropRefract.test.ts is itself flagged in 4b5bc369 as carrying a non-hermetic `readFileSync('dist/.../supportsBackdropRefract.d.ts')` arm that "ENOENT-errors on a clean checkout … laundered GREEN only because a stray local npm run build left dist behind".

**Wave shape.** Make the §CLOSE stamp a machine-appended block containing a runner exit code and the SHA it ran against — a wave with no emitted stamp is not closed, and no seat may hand-write one.

### P-6 — The receipt ledger is a hand-maintained mirror of git, so it drifts, and each drift costs a correction document plus a receipt for the correction

**MAJOR**

**Mechanism.** Wave→SHA mapping and wave status are data git already holds, but they are re-authored by hand into BAND-*.md §CLOSE stamps and into CLAUDE-SOL-IMPL-RECEIPTS.md. The mirror drifts from the source it mirrors — sometimes claiming work that was never committed. The repair is another document, and the repair is then itself receipted. This is exactly the duplicated-derived-data class the DEDUP-LEDGER already outlawed for counts; the same law was never extended to SHAs and statuses.

**Evidence.** Terminal five commits, all 2026-07-22: b5e70155 (src±=17) → 010bd33b (src±=0, doc±=44, "I-5 W8 mount-arm receipt redress — correct row 42 to b5e70155 REVERT") → 4b5bc369 (src±=0, doc±=51, "strike false Luna seat … prior 'now CURED, 16 tests GREEN' was false (uncommitted+untracked bytes)") → 5a8da780 (src±=0, doc±=14, a receipt OF the correction) → 0371836d (src±=0, doc±=41, "reconcile batch-2 against steers 21/22/23"). Seventeen source lines produced 220 doc lines across five commits, four of them pure meta. Separately: abb1eba2 (W4-TYPEDSEAM, src±=114) → 57c98214 (src±=0, 74-line receipt). CLAUDE-SOL-IMPL-RECEIPTS.md: 509 lines, 12 amending commits, 67 lines (13%) carrying redress/correct/supersede/strike/revert/false/stale language.

**Wave shape.** Derive the receipt — a script emits wave→SHA→status from commit trailers and gate exit codes — and forbid hand-authored restatement of anything git already knows, extending the existing SUPERSESSION/dedup law from counts to SHAs and statuses.

### P-7 — One representative chain: 43 documents and 13,264 doc lines govern a 174-line source file, and end with the defects still live

**MAJOR**

**Mechanism.** Each pass over the refract latch produced a critic pair, an adjudication of the critic pair, a band-file §CLOSE stamp, a coordination receipt for the stamp, and a steer superseding the previous prompt — none of which is a code change. The chain's throughput is bounded by document production, not by defect count, so a 6-line fix and a 200-line redesign cost roughly the same number of documents. The chain closes on a routing (P-3), not a fix.

**Evidence.** `grep -rl 'REFRACT-LATCH\|armGlassRefract\|glass-refract' docs/tranches/BJ --include='*.md'` → 43 files, 13,264 lines. Source churn across the entire chain: 44621bb4 src±=188, f0d32d69 src±=28 (subsequently REVERTED), b5e70155 src±=17 → 233 lines total against a 174-line file. Ratio: 57 doc lines per src line changed. Terminal state: three defects verified live at HEAD (see P-3), one landed cure reverted as rejected, one "CURED, 16 tests GREEN" claim retracted as false. docs/tranches/BJ/waves/BAND-MATERIAL.md is 1,430 lines across 27 commits — larger than most of src/components.

**Wave shape.** Cap the artifact count per wave ex ante (one spec, one evidence dir, one machine-emitted close stamp) so a chain cannot grow documents faster than it closes defects.

### P-8 — The governing instruction stream is untracked — 240 uncommitted documents that commits nevertheless cite as binding authority

**MAJOR**

**Mechanism.** Authority is asserted by files that live outside version control. They cannot be diffed, blamed, reverted, or reviewed; a later reader cannot reconstruct what a seat was told. Commits cite them by number as if they were durable. Meanwhile the process spends effort adjudicating whether uncommitted bytes count as landed — a question that would not exist if the instruction stream were committed.

**Evidence.** `git ls-files docs/tranches/BJ/coordination | wc -l` → 7, against 41 files on disk: 34 steers untracked, including every one of STEER-10..34. `git status --porcelain --untracked-files=all docs/tranches/BJ/addenda` → 206 untracked files. Untracked .md under docs/ totals 46,907 lines. Commit 0371836d cites "steers 21/22/23" as the binding authority for a HALT; STEER-23 declares "That instruction is superseded by the prospective model stop at the top of addenda/2026-07-21-convergent-hardening/IMPLEMENTATION-ASKS-C2.md" — a superseding authority that is itself untracked. Commit 4b5bc369 exists solely to retract a status claim that "described uncommitted + untracked bytes as landed".

**Wave shape.** Forbid a commit from citing any document not already committed, enforced by a commit-msg hook, so the instruction stream is versioned or it is not authority.

### P-10 — 67 numbered convergence rounds in ~24 hours, exiting into handoff documents rather than a merge

**MAJOR**

**Mechanism.** The loop has no ex-ante round cap and no exit artifact other than another document. When the seat exhausts, it writes a handoff, which seeds the next loop with the previous loop's unfinished obligations. Round count is therefore bounded by session capacity, not by convergence.

**Evidence.** docs/tranches/BJ/addenda/2026-07-21-convergent-hardening: round-suffix census over filenames yields C1 through C67 (plus a distinct DC566 target id), 192 .md files, 42,633 lines, all dated 2026-07-21/22. The tail of the sequence is not a close: RESTART-SAFE-EXECUTION-HANDOFF-C66.md and FRESH-OPUS-EYES-DEVELOPMENT-HANDOFF-C67.md. 140/192 (73%) of the directory is CRITIC/ADJUDICATION/CANDIDATE/RECONCILIATION/CRIT. docs/tranches/BJ/ has no FINAL.md — only ASK.md, ASK-REDUCTION.md, EXECUTION-PROGRESS.md, FEEDBACK-LEDGER.md, PLAN.md.

**Wave shape.** Fix the round count at 2 or 3 before the loop starts and require the exit artifact to be a merged commit — a handoff document is a failure result, not a termination.

### P-11 — The model-declaration law is 0.5% enforced, and the corpus spends prose adjudicating violations of it

**MINOR**

**Mechanism.** A governance rule that is not machine-enforced generates adjudication documents in proportion to how often someone happens to check, not in proportion to compliance. The 99.5% of commits that silently omit the trailer cost nothing; the 0.5% that carry it become adjudicable surface.

**Evidence.** `git log --since='2026-07-01' --format='%H' | wc -l` → 836 commits. `git log --since='2026-07-01' --format='%B' | grep -ciE '^model: '` → 4 (2 "model: Opus", 1 "model: claude-opus-4-8", 1 "Model: Opus"). Commit 4b5bc369 spends a five-line paragraph on "[MODEL-LAW FLAG, I-8] The landed commit b5e70155 carries the trailer model: claude-opus-4-8 (an Opus seat); no Luna commit exists … flagged as a prospective-model-law violation … The false phrase ', Luna x-high seat' is struck."

**Wave shape.** Enforce the trailer in a commit-msg hook that rejects the commit, or delete the law — never leave it advisory, because advisory rules are pure adjudication surface.

---

## TRANCHE ARCHAEOLOGY I — the early archive (C, D, D-II, E, F, H, I, J, K, L, M, N, O, P, Q, V, AB, AB+1, AB+2, AM, AN, AO, AP, AQ, AR, AS). Extract durable lessons, chronic recurrences, deferral pickup, and tranche shape — then verify each against master's actual history and HEAD source rather than against the close documents.

_claude-opus-5[1m]_

### ARCH-1 — H and I closed on a branch that never merged: their FINAL docs are on master, their work is not

**BLOCKER**

**Mechanism.** The close ceremony treats a FINAL.md as the artefact of record and merges it independently of the commits it cites. Once the document lands, every downstream tranche reads it as ground truth about master and never re-derives the claim from the tree. The result is an unfalsifiable baseline: J opens "against this baseline", K reconciles against it, and the AX/BI chronic registries still cite "G/H→I.W0 CI guard" as landed history 40 tranches later.

**Evidence.** `git merge-base --is-ancestor` over every commit H/FINAL.md and I/FINAL.md cite as close evidence returns NOT-ancestor: H `97c825e`, `68e4097`, `13ca1c3`; I `c3bf0a2`, `35773c4`, `987fc41`, `864e882`, `63e29e4`; plus the G honest-close `c7ff69f` (H/FINAL.md:425) and the H-open baseline `c5f196c` (I/FINAL.md:4). Every C/E/F hash (`1d7faff`, `304ac78`, `6ce14e5`, `ac8d9e2`) and every J-onward hash (`d8239f2`, `f5cdd53`, `d1de94b`, `e385879`, `d327a45`, `1bfe8d0`, `21e2656`) IS an ancestor — the discontinuity is exactly the G/H/I band. The docs entered master at `5baceb56 chore(docs/tranches): consolidate H + I + J planning onto master` — 94 files, 15212 insertions, `git show --name-only 5baceb56 | grep -c '^src/'` = **0**. I/FINAL.md:15 claims "6 packages retired (MultiSelect, TagsInput, GlassPanel, MetaballCanvas+Metaballs, PaperBackdrop, StatusDot)" and I/FINAL.md:95 claims "0 runtime library-orphans"; `git ls-tree 5baceb56 src/components/custom/` still lists `glass-panel`, `metaballs`, `paper-backdrop`, `status-dot`, and `src/components/ui/` still lists `multi-select`, `tags-input`. GlassPanel was actually retired ~40 tranches later at BI `2bfcf2b9`. H/FINAL.md:392 claims custom/ went "44 dirs to 40"; the count at `5baceb56` is 28. I's claimed CI guard `.github/workflows/lint.yml` was re-added on the master line at K.W4 `8a04a2bf`.

**Wave shape.** A wave that makes a close document unmergeable unless every commit hash it cites is an ancestor of the branch it is landing on — a born-RED gate that walks FINAL.md/PROGRESS.md for SHAs and fails closed on any non-ancestor — and that re-audits the H/I claims still cited as history in the BI/AX chronic registries.

### ARCH-2 — Gate-minting is the standard close remedy; the gate mesh then drifts into false witness and is deleted wholesale, taking every remedy with it

**BLOCKER**

**Mechanism.** Each tranche's response to a defect class is to mint a proof gate rather than remove the defect's cause. Gates accumulate against the developer's local sibling layout, drift from the thing they claim to prove, become false witnesses, get point-fixed, and are finally abrogated in one commit — at which point every chronic they were minted for is unguarded again, but the chronic ledger still records the gate as the terminal disposition.

**Evidence.** Mint chain: I.W1 lint.yml `recovery-diary-scrub`; K.W4 `profile:budget`; P.W2 `scripts/audit-stash-list.mjs` (invariant 27, the only structural remedy for the 5-recurrence stash chronic); Q.W0 `proof-resolution-contract.mjs` + Q.W6 `proof-phantom-classes.mjs` (invariants 32/33); AR.W2 `proof-vt-names.mjs` (inv-η, its headline); AS.W2 `constellation.mjs` + `gates.mjs` (inv-θ, its headline). Drift chain: AO/FINAL.md §6 — `proof-consumers-static`'s `rootContractFiles` "predated the L.W2 restructure ... a false-witness that would fail CI on first push"; AO finding 1 — the budget gate measured the SFC-only fragment, "blind to the ~75 KiB cascade arm", for its entire life; AP/FINAL.md W4 — `proof:consumers:static` honest "212→0 via ignoredDirs + comment-strip"; AR/FINAL.md — "`collectExports` matched an `export *` inside a comment — **the AP.W4 class recurring**". Terminal: `git log --diff-filter=D` shows `proof-vt-names.mjs`, `gates.mjs`, `proof-phantom-classes.mjs`, `proof-package.mjs`, `proof-consumers-static.mjs` deleted at `1c2cda3a feat(bi-p000): replace the legacy gate mesh with one fail-closed verifier`; `audit-stash-list.mjs` and `constellation.mjs` at `d17153ec chore(tooling): delete the receipt and gate farm and restore ordinary CI`. `ls scripts/` at HEAD = 10 files; package.json has 20 scripts and **zero** `proof:*` entries. `useStalePropWarning.ts` — Q's codified invariant-31 enforcement substrate, explicitly "retained by design" at Q/FINAL.md §4.6 — deleted at BI `490cc46e`; 0 hits in src/ at HEAD.

**Wave shape.** A wave that requires every proposed gate to ship with a planted-defect self-test proving it bites, caps the gate roster at a fixed budget so a new gate must retire an old one, and re-adjudicates each abrogated gate's founding chronic as either genuinely dead or newly unguarded.

### ARCH-3 — The bundle budget is a gate whose only failure mode is to raise its own ceiling — 24x growth across 12 self-declared one-time lifts

**MAJOR**

**Mechanism.** The budget is derived from the measured draw plus headroom at each close, so it can never fail: an overrun is resolved by re-deriving the ceiling from the overrun. Every lift is authored with language asserting it is the exception ("a ONE-TIME conscious lift ... NOT open-ended per-wave creep"), which is precisely the sentence that recurs.

**Evidence.** `grep -c 're-base|rebase' scripts/profile-bundle.mjs` = 38; `grep -c 'conscious lift'` = 12, with explicit ordinals "the FIFTH / SEVENTH / EIGHTH / NINTH conscious lift" (lines 146/173/182/204). CSS gzip ceiling by tranche: K.W4 5_750 → N.W0 6_700 (AB/FINAL.md §3: "AB did NOT re-run `npm run profile:budget` at any wave close ... the gate was silently exceeded") → P.W0 42_000 raw → P.W3 46_000 → Q.W4 rebaseline → AO.W4 82_500 → AQ.W8 96_800 → AS 100_000 → 103_000 → ... → HEAD `BUDGETS["dist/styles/index.css"] = { raw: 548_000, gzip: 140_000 }` (scripts/profile-bundle.mjs:257) — **24x** the K baseline, never once ratcheted down. The gate was also measuring the wrong artifact for its whole life until AO (AO/FINAL.md finding 1). AX/audit/hardening/GOLDEN-chronic-fold.md D1 records the terminal shape: CI RED on `gates→profile:budget` (144852/140000 = 103.5%), and "3.8.0 itself was MANUALLY unblocked (`f2fc614 \"unblock the 3.8.0 publish\"`)". By contrast `dist/glass-ui.js` has held 190_000/33_700 unchanged since K.W4 — the ratchet is not physics, it is the re-derivation rule.

**Wave shape.** A wave that replaces measure-then-set with a fixed committed ceiling plus a mandatory down-ratchet obligation after every prune wave, and proves the gate can bite by tightening it once against HEAD.

### ARCH-4 — The one audit lane that inspects pixels is the one lane with an external dependency, so it is the lane that is always waived — including via a 'PERMANENT' archive that was later reversed

**MAJOR**

**Mechanism.** The close-honesty checklist accepts a documented fallback floor as satisfying a gate. Because the visual lane is the only one whose evidence cannot be produced by static analysis, it is the only lane that ever hits its fallback — so visual-shipping tranches close green on grep and build output. The disposition vocabulary then launders the gap: TOOLING-DEFERRED becomes ARCHIVED-PERMANENT becomes resurrected.

**Evidence.** N/FINAL.md §3: π "TOOLING-DEFERRED — Playwright/Chrome-MCP disconnected; static path CLEAN". O/FINAL.md §3: "MCP Chrome bridge not connected. **Second consecutive deferral** (N + O); P escalation if unavailable". P/FINAL.md §3: "**ATTEMPTED + ARCHIVED-permanent** (3rd consecutive tooling-unavailable; `archive/visual-runtime-tooling.md`)" and §7 lists it PERMANENT. Q/FINAL.md §4.3: ran at "the build-verification floor ... **Honest caveat: nothing was confirmed by pixel inspection; no screenshots exist** (`research/screenshots/` was created empty)"; Q §7 confirms "the `q-w6-*` set is empty". AB+1/FINAL.md §5 and AB+2/FINAL.md §8: π "NOT-RUN". The PERMANENT archive was then reversed — `AX/PROGRESS.md:79` resurrects the lane, and BI/TAIL-EXCAVATION.md reg#14 records the chain "N→O.W7→P.W6 archive→Q→**AX.W00 resurrect**", hop 5+, still OWNED-LIVE at BI. Six tranches in this set shipped visual substrate with zero pixel evidence.

**Wave shape.** A wave that makes a captured, content-hashed BEFORE/AFTER PNG the only accepted evidence for any wave touching paint — no fallback floor, no archive disposition — so a tranche that cannot shoot pixels cannot close a visual wave at all.

### ARCH-5 — Audit verdicts are structurally indistinguishable from evidence, so hallucinated and stale findings drive real retirements

**MAJOR**

**Mechanism.** Read-only agents and gates emit verdicts in the same register as measurements. Nothing between the verdict and the decision re-derives the claim at HEAD, so a wrong verdict spends exactly as much authority as a right one — and the errors bias toward deletion, because 'no consumer found' is the cheapest grep to get wrong.

**Evidence.** C/FINAL.md:109 — "Agent 4's narrative cited 7 delete-unused items. Re-running `rg` against current master showed only 4 truly orphaned (.glass-btn / .btn-pill / .input-pill all had real consumers)". H/FINAL.md:462 — "**23 recovery-diary leaks claimed; 4 actually verified**". I/FINAL.md:460 — "**Tabs provide/inject NOT delivered**: δ audit was incorrect. Verified at HEAD ... the refactor was delivered in G pass-2". K/FINAL.md:314 — "F-ε-3 (false-positive): re-probed at HEAD ... Lighthouse's earlier hit was stale dev-server cache". N/FINAL.md §1 and §9 — the pruning plan was reversed wholesale after "3 audit failures (1 hallucination, 2 false positives, 1 missed consumer)"; N harvested six close-relevant false positives "each of which would have led to either a misguided retirement OR scope-creep at a prior tranche". Gate-side, the same class: AO `rootContractFiles` false-witness, AP `proof:consumers:static` 212→0, AR "the AP.W4 class recurring". The remedy minted at N (SPEC.md §"Audit-verdict spot-verification gate") is prose in a submodule; nothing enforces it.

**Wave shape.** A wave that requires every retire/delete verdict to carry a machine-reproducible negative-evidence command and its output in the wave doc, and that re-runs those commands at close so a stale or hallucinated verdict cannot survive to the commit.

### ARCH-6 — Shadow execution recurred four documented times (five actual) and the remedy each time was to write a retrospective, never to change the mechanism

**MAJOR**

**Mechanism.** When a cohort of work ships without a plan folder, the close ceremony's response is to reverse-engineer the plan folder afterwards. That closes the paperwork loop and leaves the causal mechanism — nothing prevents commits landing on master outside a wave — completely untouched. The recurrence ledger built to justify escalation is itself incomplete, which understates the problem it was built to measure.

**Evidence.** AB+2/FINAL.md §5 tabulates the recurrence ledger: V (68 commits / 5 releases → K.WV retrospective), AB (→ O.W0 Lane A), AB+1 (12 commits / 3+1 tags → P.W0 Lane A), AB+2 (7 commits / 0 tags → Q.W0 Lane A) — and the headline: "**recurrence 4 landed 1–2 calendar days AFTER invariant 29 was codified** (P.W6 `3310a8c`) ... Prose-only enforcement did not hold". AB/FINAL.md §6 makes the same admission one recurrence earlier: "AB executed AFTER K W0 codification — but the clause's enforcement mechanism ... was not invoked". The ledger omits G: `docs/tranches/G/` has no folder on master and no retrospective, yet H/FINAL.md treats G as a closed tranche with four promoted lessons. `git rev-list --all --objects | grep -c 'docs/tranches/G/'` = 61 objects, added at `c7ff69f5`, which `git merge-base --is-ancestor` reports NOT an ancestor of HEAD and `git branch -a --contains` reports on no branch. AS/FINAL.md adds a fifth shape: "the 3.2.0 commit/push/tag/`npm publish` ... were executed by a concurrent driver during this session's read-only audit phase".

**Wave shape.** A wave that installs a pre-commit or CI check binding every non-docs commit on master to a wave id that resolves to a committed wave spec, so shadow execution is blocked at the write rather than reconstructed at the close.

### ARCH-7 — Destructive-git precept: five recurrences, each close declaring the loophole closed, and the one tooling remedy has since been deleted

**MAJOR**

**Mechanism.** The precept was tightened five times in prose (never as recovery → never for state-probe → explicit `checkout` enumeration → orchestrator-side `git stash list` walk) and recurred after each tightening, because a prose non-negotiable in a dispatch template is read once by an agent that is already improvising. It only stopped when P.W2 shipped a script — and that script was deleted with the gate farm.

**Evidence.** J/FINAL.md §Process incidents: "Two `git stash` violations during J despite LESSONS-LEARNED 2026-05-04 binding rule" and "**Pattern recurrence** suggests the dispatch-template precept needs sharper teeth". K/FINAL.md:344: "7 caught the K W3 Lane A stash recurrence (precept evolution at LESSONS-LEARNED 2026-05-09 #2)" — i.e. the third. L/FINAL.md §7: "W1 Lane B self-disclosed `git checkout` — extend explicit-forbidden subset to include `checkout`". M/FINAL.md §4.6: "`git stash` anti-pattern **4th-recurrence** enforcement". N/FINAL.md §2: "Lane C agent self-disclosed `git stash + git stash pop`; **5th recurrence**". Remedy: P/FINAL.md §6 ships `scripts/audit-stash-list.mjs` + `"audit:stash"`; BI/TAIL-EXCAVATION.md reg#21 records it as the terminal OWNED-LIVE disposition. `git log --diff-filter=D -- scripts/audit-stash-list.mjs` → `d17153ec chore(tooling): delete the receipt and gate farm and restore ordinary CI`. The chronic's only structural remedy no longer exists.

**Wave shape.** A wave that moves the constraint out of prose entirely — dispatch agents run under a git wrapper or sandbox that cannot execute stash/checkout/reset on the main index — and re-lands a minimal orphan-stash check in the surviving CI.

### ARCH-8 — Zero-deferral and permanent-archive are close-time inventions that the next close reverses

**MAJOR**

**Mechanism.** Invariants are minted at a close, by the ceremony they govern, and ratified by that same ceremony. There is no independent adjudicator, so the strongest-sounding disposition words (ZERO-RESIDUAL, PERMANENT-DEFER, ARCHIVED-PERMANENT, ARCHIVED-TERMINAL) carry no more force than the tranche that coined them and are routinely reversed one or two closes later.

**Evidence.** P/FINAL.md §8 codifies invariant 28: "'Deferral with named-destination' — the canonical close-path at K → L → M → N → O — is RETIRED at P. The PERMANENT-DEFER classification (codified at L; carried at M / N / O) RETIRES at P ... **zero items exit P-close as P-residuals**" and archives 9 items, 3 as PERMANENT. The very next close, Q/FINAL.md header: "Q did **NOT** achieve a literal 'zero-residual' close", with §4 enumerating 6 named residuals. P's ARCHIVED-PERMANENT π lane is resurrected at AX.W00. AP/FINAL.md retires its own invariant ζ mid-tranche because "the DELTA ... premise was **refuted by direct measurement**" — the only case in the set where an invariant was killed by evidence rather than by ceremony. AM/FINAL.md closes `complete_with_misses`; AN/FINAL.md closes with three gates marked "MET-pending-orchestrator-build" — a gate marked MET conditional on a run that had not happened.

**Wave shape.** A wave that forbids a close from minting its own invariants — new invariants land only in a separate adjudication pass against the following tranche's evidence — and that strips the permanence vocabulary in favour of a dated re-review trigger.

### ARCH-9 — Consumer breakage is detectable only by a hand-dispatched per-consumer audit lane; the retirement policy plus silent-null DI plus sibling-less CI guarantees it ships first and is found later

**MAJOR**

**Mechanism.** Three policies compose into a blind spot: clean-break retirement (no aliases, no shims), optional-inject DI that returns `null` instead of throwing, and a CI runner with no sibling repos. A retired export therefore produces no compile error in the library, no runtime error at the consumer's injection site, and no CI signal — the only detector is a human-scheduled consumer re-audit lane at close, which scopes what it was told to scope.

**Evidence.** Q/FINAL.md §2.1: "the W6 consumer re-audit found speedtest's 5 dashboard SFCs still imported `<ScrollPane>` ... W3 Lane H retired that component, so speedtest's production build was RED (`\"ScrollPane\" is not exported by glass-ui`). **Earlier Q speedtest audits (Qν/Qυ) scoped only `<Card variant=>` and missed the standalone component.**" O/FINAL.md §3 O11/b + O11/e: "2 silent dock-string-key injects at HEAD (**silent null-fallback** after W2 dock-DI retirement)" — found only by reading consumer source. Q §2.1 item 2: words/frontend carried 8 phantom classes from the v0.8.0 ladder rename that "W4 Lane F's cluster-C2 scope ... never covered". AM/FINAL.md §2 gate 9 and AO/FINAL.md §Cross-repo residuals: `proof:consumers:static` RED is normalised as sibling debt and CI is explicitly noted to run "on a fresh checkout with no sibling repos, so only the now-green root-surface arm executes". At HEAD the mechanism is intact: `src/composables/context/createContext.ts:70` — `useOptional: (): T | null => inject(KEY, null)`.

**Wave shape.** A wave that makes every public-surface removal emit a build-time hard failure in a pinned consumer smoke-compile inside glass-ui's own CI, and that makes optional-inject helpers dev-throw on a key that was removed rather than resolving to null.

### ARCH-10 — Doc-drift numerals were re-found by the γ lane at every single close for sixteen tranches and were only ever absorbed inline — the chronic ended by deleting the document

**MINOR**

**Mechanism.** Hand-maintained counts in prose (component-dir counts, /api symbol counts, subpath counts, matrix sizes) are derived data with no generator and no gate. Each close re-discovers the drift, absorbs it inline as MINOR, and re-creates the drift by shipping. Sixteen absorptions later the terminal fix was to delete the file that carried the counts — which resolves the symptom by removing the surface, not the mechanism.

**Evidence.** Chain in the assigned set: H/FINAL.md §γ (CLAUDE.md list "4 retirees + 2 phantoms removed; 14 missing packages added; count corrected to 40") → I.W5 ("24 γ doc-fix items absorbed") → J §Cross-tranche debt ("CLAUDE.md major refresh — 11 drift items per γ"; "README.md drift — 7 items") → K §Findings absorbed (γ D1/D2/D5) → L.W5 doc cohort → M §9 → N O-3 → O/FINAL.md §3 (γ BLOCKER + "doc-counter drifts (32 → 53 /api symbols; 30 → 31 custom dirs; 37 → 38 subpaths)") → P §3 ("CLAUDE.md /api count stale") → Q §2 ("`CLAUDE.md:172` (`40` → `37`) and `CLAUDE.md:14` (`44-entry matrix` → `42-entry`)") → AB+1 §5 (γ "MINOR — CARRIED"). BI/TAIL-EXCAVATION.md reg#1 scores it hop **16+**, disposition DEAD, evidence "CLAUDE.md deleted BH `8b0f9acc`". Verified: `ls CLAUDE.md` → No such file at HEAD.

**Wave shape.** A wave that deletes every hand-maintained count from prose and replaces it with a generated block, so the number cannot drift because no human writes it.

### ARCH-11 — The 2-consumer bar has no expiry, so rejected substrate becomes an immortal watched-conditions ledger copied forward for ten closes

**MINOR**

**Mechanism.** An idea that fails the >=2-consumer gate is not killed — it is recorded as a watched condition with a realisation trigger and copied into the next close's ledger. Because no clock runs on the trigger, the row costs one line per close forever and is never adjudicated; it accumulates until an excavation wave kills it in bulk, which is the only mechanism that has ever retired one.

**Evidence.** AN/FINAL.md §Notes introduces "Two ARCHIVED items carry named realisation conditions" (interruptible reorder recipe; dock panel-host). AO/FINAL.md §Watched-conditions ledger carries both plus inline-edit and LabeledSlider, with "**No condition cleared during AO.**" AP/FINAL.md §Watched-conditions ledger carries all four plus shadcn-parity, with the header "AP promoted nothing". AS/FINAL.md §Named-forward carries them again "convergence-gated". `grep -rli 'panel-host' docs/tranches/` returns AN AO AP AR AS AT AU AX AY AZ BA BB BC BD BE BG BI BJ — **18 tranche directories**. Terminal disposition only at BI: `BI/TAIL-EXCAVATION.md:41` — "panel-host-primitive | AN (FINAL) | AN→…→BI (n:2 never MET) | **~10** | **DEAD** | BI §5 ARCHIVED-TERMINAL", same row for interruptible-reorder; inline-edit is still hop ~10 OWNED-LIVE with "User ruling owed".

**Wave shape.** A wave that gives every watched condition an expiry close-count at which it is auto-RETIRED unless a consumer has materialised, so the ledger drains itself instead of requiring an excavation.

### ARCH-12 — 'USER-DOMAIN' classification let the only real integration check go unrun for whole tranches, hiding a lockfile defect that made every gate untested on a clean runner

**MINOR**

**Mechanism.** Any step requiring push/publish authority is classified out of tranche scope and recorded rather than executed. Because CI on a clean runner is downstream of push, the entire proof-gate fleet went unvalidated in the only environment that resembles a consumer — so gates that assumed the developer's sibling layout passed locally at every close and were structurally incapable of passing anywhere else.

**Evidence.** AO/FINAL.md §Cross-repo user-domain perimeter: "Push glass-ui's held commits to `origin` — the provenance gap (npm 2.1.0 is live and consumed, but its source is single-copy local)" and "Seed the `NPM_TOKEN` repo secret — activates the **never-run** `release.yml`". AP/FINAL.md §Cross-repo perimeter: "the AP arc adds 10 commits atop the **~99 already unpushed**. npm carries only 2.1.0; the source tree is single-copy local until pushed." AR/FINAL.md: "**CI #177 repaired — the real blocker was the lockfile, not the node pin.** `package-lock.json` recorded `@mkbabb/*` as `file:` links to dev siblings ... so `npm ci` failed on a clean runner", and "Fixing `npm ci` surfaced three gates that assumed the local sibling layout — `proof:package` ... `proof:resolution` ... and the latent `proof:consumers:static` false-witness". AS/FINAL.md finally records the first end-to-end green: "the 3.2.0 tag's `release.yml` run on the clean runner (siblings absent) is the binding green — release run `26964913257`". Between AO and AS that is three closes declaring full green gate matrices that had never executed in CI.

**Wave shape.** A wave that makes a clean-runner CI green a hard precondition of any tranche close — no USER-DOMAIN exemption for the check itself — with a lockfile-purity guard so a sibling re-link cannot silently re-poison it.

### ARCH-13 — Tranche shape: closes are uniformly declared clean, and the dispositions that are honest are the outliers

**OBSERVATION**

**Mechanism.** Across 26 closes the verdict vocabulary is almost invariant — CLEAN, closes clean, complete — regardless of whether waves were dropped, gates were unrun, or the successor immediately reopened the work. The three honest closes (Q's residuals declaration, AP's refuted premise, AM's complete_with_misses) are the exceptions that show the register was available and not used.

**Evidence.** Shape census (wave dirs vs FINAL claims): C 6 waves W0-W5, no waves/ dir, tag `c-close`, pre-publish. D W0-W5 plus a D-II reopen that has PROGRESS.md but **no FINAL of its own** — the only tranche in the set closed inside a sibling's document. E W0-W4, tag `e-close`. F W0-W6, closes with 5 accepted P3 residuals and "No named next tranche is opened" — G opened immediately. H 7 / I 8 / J 8 waves, all "closes clean". K 12 wave docs including retro W-V/W-P/W-S; W2 RETIRED; WS "CLOSED **DEGRADED**"; v0.9.3. L 9 waves, v1.0.0. M 5 waves, v1.0.4/v1.0.5. **N ships 4 wave docs — W0, W1, W2, W4; there is no W3** and FINAL.md never accounts for it. O 8 waves / 9 tags in one calendar day. P 7 waves, v1.7.0-v1.8.4, zero-residual declaration. Q 7 waves, v1.8.5-v1.9.1, honest-residual declaration. V 3 waves (W2-W4 only), 68 commits, retro. AB 4 / AB+1 5 / AB+2 3, all retro, AB+2 with 0 tags. AM 4 waves, `complete_with_misses`, no version bump. AN 8 waves, 2.1.0, three gates "MET-pending-orchestrator-build". AO 6 waves, 3.0.0 staged-not-published. AP 6 waves, headline premise refuted, folds into the still-unpublished 3.0.0. AQ and AR and AS have **no waves/ directory at all**; AR closed at W2 of 6 with W3-W6 re-homed to AS; AS is the first CI-published cut (3.2.0, run 26964913257).

**Wave shape.** A wave that replaces the free-text verdict with a computed close-state derived from wave-doc presence, gate-run receipts, and tag placement, so 'clean' is a result rather than an authorial choice.

---

## TRANCHE ARCHAEOLOGY II — the middle archive (AT, AU, AV, AW, AX, AY, AZ, BA, BB, BC). Derived from the tranche corpus, git history, CHANGELOG/tags, CI workflow config, and the live gate surface at HEAD. Every finding is a MECHANISM traced across ≥2 tranche letters, and — where it survives — verified live at HEAD (v7.0.0).

_claude-opus-5[1m]_

### TA2-1 — The terminal-reflect funnel: binding paint-truth deferred to a close wave that never runs — AW, AX, BA, BB, and LIVE at HEAD

**BLOCKER**

**Mechanism.** Visual waves are allowed to close on device-free/source gates while their binding pixel verification is booked into a single downstream wave. The funnel wave is by construction the LAST thing scheduled, so any halt, rate-wall, or scope insert cuts it — and 100% of the tranche's paint verification is cut with it. This is not a discipline failure: the SEQUENCING makes it structurally certain. It recurs because each tranche re-authors the correct doctrine ('per-mechanism greens do NOT close a visual wave') while re-adopting the fatal sequencing.

**Evidence.** AW: `docs/tranches/AX/AX.md:3-6` — "AW shipped 3.4.0→3.6.0 + the batch-1 merges ... WITHOUT a formal close — the close wave (renumbered W18→W21→W27→W33) never reached ... a fleet of green HEADLESS gates shipped over a visually-broken live product." BB: `grep -c 'rides W-REFLECT3' docs/tranches/BB/PROGRESS.md` → **24** (62 occurrences tranche-wide); `docs/tranches/BC/research/postmortem/SYNTHESIS.md:8` — "BUILT ≈ 33/33 ... CLAIMED complete ≈ 33/33 ... PAINTED-verified ≈ 0/33." BA: SYNTHESIS.md:70 — "BA.md inv-4 DEFERS the gestalt verdict by PLAN to one Batch-7 W-REFLECT2 wave; 28 mid-tranche waves close live-verified with the gestalt 'staged'." AX admitted the recurrence INSIDE itself: `AX.md:35-40` — "not one of 32 lanes returned SOUND ... the founding chronic (headless-green over a live-broken product) is recurring INSIDE AX." **LIVE AT HEAD**: `.github/workflows/ci.yml:55` — "It runs pre-tag on real hardware — see release.yml `pixel-floor-gpu`." `grep -rn 'pixel-floor-gpu' .github/` returns ONLY that comment; `.github/workflows/release.yml` has exactly one job (`publish`, line 18). The aurora paint floor — the surface that rendered BLACK at AX.W07 and dark at BB — is deferred to a runner that does not exist.

**Wave shape.** Delete the ci.yml:55 forward-reference and either add the real `pixel-floor-gpu` job to release.yml or move the aurora floor onto a self-hosted/real-GPU lane, so no paint floor in the repo points at a nonexistent runner.

### TA2-2 — Paint-gate scope narrowed 16 surfaces → 1 in CI; BC's keystone paint probe is now an unimported orphan

**BLOCKER**

**Mechanism.** The anti-regression instrument gets narrowed toward whatever currently passes. BC diagnosed this exact class in AZ/BA ('canary-retired-to-green', 'gate-rebaselined-to-broken-paint') and built a 16-surface pixel roster as the cure — then the cure itself was narrowed by the same mechanism one tranche generation later. The narrowing is always locally justified (runner has no GPU / the mesh is overfit), and each step is individually defensible; the aggregate is that the disease's detector no longer covers the disease.

**Evidence.** BC's cure: `docs/tranches/BC/EXECUTION-PROGRESS.md` — "proof:ba-gestalt 16/16 PASS (warm-cream pixels, real Metal)"; roster spanned glass-base, dark-register, motion-fourier, dock-engine, tabs-segmented, controls-custom, dock-cta-seat, completion-seal, viz-procedural, glass-adaptive, cross-repo. At HEAD: `tests-visual/pi-gate-verify.mjs:32-35` — `const FLOORS = { aurora, blob }` — TWO floors total; `tests-visual/package.json` `gate:pixel-floor:ci` runs `-g 'blob paints' ... --floors=blob` — **ONE**. `scripts/lib/paint-arm.mjs` (586 lines, BC.W-PAINT-GATE's 'ONE-color-math shared probe') has ZERO importers in any runnable lane: `grep -rn 'paint-arm' --include='*.mjs' --include='*.ts' .` excluding docs/worktrees returns only its own header and a back-reference comment in `scripts/reflect-capture-verify.mjs:126`; the only real importers are per-wave analysis scripts under `docs/tranches/BG/audit/visual/*/analyze.mjs`. `scripts/reflect-capture-verify.mjs` is referenced from neither package.json nor .github/.

**Wave shape.** Re-wire paint-arm.mjs into the fail-closed verifier as a real multi-surface floor (or delete it as dead code and say so), and make any reduction in the floor roster a loud, recorded decision rather than a flag default.

### TA2-3 — Close-wave-last + renumber churn: the close is the most-moved and least-executed row, and it orphans authored specs

**MAJOR**

**Mechanism.** Bands get inserted ahead of the close, so the close's number is re-anchored each time. Every re-anchor (a) pushes the only integrity-reconciling wave further from execution and (b) frees its old slot for reuse, orphaning whatever spec was authored there. The close is where FINAL.md, the CHANGELOG entry, the gate-fleet registration, and the overfitting audit live — so a never-reached close silently drops all four at once. AX named the exact cure ('a close-gate that lands last can only post-hoc discover the inflation it was built to prevent') and hoisted it to Batch −1; the lesson did not survive to BB.

**Evidence.** `docs/tranches/AW/AW.md:172` — "The prior W18 close slot was content-swapped to the gate-pattern wave; this was first restored as W21, re-anchored to W27 when the glass-atoms band inserted ahead, then to W33 when band G inserted ahead (W21 retired in the renumber)." Four positions, zero executions. The orphan it produced: `docs/tranches/AW/waves/AW.W27-peer-conformance.md` is a fully authored wave with a hard gate (`proof:peer-conformance`, born-RED, keyframes ^4 + value ^0.11) — and W27 appears in NO row of the AW.md §2 wave table (`grep -oE '^\| \*\*AW\.W[0-9]+\*\*' docs/tranches/AW/AW.md` → W0..W20, W22..W26, W28..W33; W21 and W27 absent). AX's cure: `docs/tranches/AX/PROGRESS.md:36-39` — "Batch −1 lands FIRST: W62, the soundness gate battery — nothing else dispatches until those five forcing functions are GREEN (a close-gate that lands last can only post-hoc discover the inflation it was built to prevent)." Recurrence at BB: SYNTHESIS.md:8 — "the close batch (5/6/7) NEVER executed ... No FINAL.md; ... package.json still 4.0.1 not the planned 4.1.0."

**Wave shape.** Hoist every close-obligation (FINAL, CHANGELOG row, gate registration, overfit audit) to a Batch −1 forcing function per BJ's own pattern, and add a cheap wave-file↔charter-row bijection check so an orphaned spec like AW.W27 is loud.

### TA2-4 — Five published versions have zero CHANGELOG record — the halt propagates into the public release history

**MAJOR**

**Mechanism.** The CHANGELOG entry is a close-wave artifact. When a tranche publishes mid-flight but never reaches its close (AW, AX), the tag ships and the record does not. Nothing in the release path enforces the pairing, so the gap is invisible until someone reads the file. The result is that the exact five releases that carried the headless-green/visually-broken defects are the five with no written record of what they contained.

**Evidence.** Tags present: `git tag | grep '^v3'` → v3.4.0, v3.5.0, v3.5.1, v3.6.0, v3.8.0 (among others). CHANGELOG rows absent: `grep -c '^## 3.4.0' CHANGELOG.md` → 0; same for 3.5.0, 3.5.1, 3.6.0, 3.8.0 (and 3.7.0, 3.11.0, 3.12.0 have neither tag nor row). `grep -nE '^#{1,3} ' CHANGELOG.md` jumps `## 3.9.0` (line 438) → `## 3.3.0` (line 449). These five are exactly the AW-halt (3.4.0→3.6.0, per AX.md:3) and AX-mid-execution (3.8.0, per AX/PROGRESS.md:216) publishes. `.github/workflows/release.yml` verifies tag↔package.json version but nothing else.

**Wave shape.** Backfill the five missing CHANGELOG headings from their tranche records and add a release.yml step asserting the tag's version has a `## <version>` heading in CHANGELOG.md.

### TA2-5 — The gate mesh accretes per-wave with no retirement discipline, then gets abrogated wholesale — taking the load-bearing gates with the overfit ones

**MAJOR**

**Mechanism.** Every wave mints its own born-RED `proof:*`. Nothing retires them, so the mesh grows monotonically (AX ~92 CI gates → BC 345) until the mass is intolerable and gets collapsed in a single stroke. The collapse is scoped by 'is this gate overfit?', not by 'is this gate the enforcement of a cross-tranche chronic?' — so the four gates that existed specifically to make the AZ/BA/BB disease structurally impossible were deleted alongside the genuinely contrived ones. AX predicted the accretion side ('30+ gates/round generate cross-wave drift faster than per-round close reconciles'); nobody predicted the abrogation side.

**Evidence.** Accretion: `docs/tranches/AX/PROGRESS.md:210` — "14+ AX-band gates are ci-tagged in gates.mjs but absent from ci.yml"; SYNTHESIS.md:143 — "18 ci-tagged reds rode along ... 30+ gates/round generate cross-wave drift faster than per-round close reconciles"; BC/EXECUTION-PROGRESS.md — "the full 345-gate CI-accurate close battery." Abrogation: `git log --diff-filter=D -- scripts/gates.mjs` → `1c2cda3a feat(bi-p000): replace the legacy gate mesh with one fail-closed verifier`. At HEAD: `scripts/gates.mjs` ABSENT; `scripts/proof-ba-gestalt.mjs` ABSENT; `scripts/proof-live-verified-ledger.mjs` ABSENT; `scripts/proof-disposition-live.mjs` ABSENT. `node -e "...Object.keys(require('./package.json').scripts)"` → 20 scripts total, **0** starting with `proof:`. The three deleted proof scripts are precisely AY/BC's anti-inflation enforcement: the pixel-reading gestalt gate, the DELTA-owed ledger gate, and the phantom-owner disposition gate.

**Wave shape.** Audit the ~4 deleted enforcement gates against verify-governed-invariants.mjs (581 lines) and re-express the ones covering live chronics — paint-roster, capture-freshness, disposition phantom-owner — as invariants inside the single verifier.

### TA2-6 — Author-assertable status vocabulary is the vehicle of ledger inflation — AX minted it, retired it, BB re-invented it

**MAJOR**

**Mechanism.** Any status word a wave author can type without a gate deriving it will drift to mean 'the expensive half is owed'. AX minted `live-verified (DEVELOPED)` — literally 'developed AND verified' meaning 'developed; the live arm is owed' — and 7 waves carried it. The hardening pass retired the vocabulary and built a gate to reject the string. One tranche later BB used `complete (born-RED → GREEN)` for the same purpose over 0/33 painted waves. The mechanism is not the specific word; it is that status is prose until a gate derives it from an artifact.

**Evidence.** `docs/tranches/AX/PROGRESS.md:13-14` — "the reconciled vocabulary — `(DEVELOPED)` RETIRED, gate-rejected by `proof:live-verified-ledger`"; :244-247 — "`live-verified (DEVELOPED)` is RETIRED (the linguistic vehicle of the inflation — 'developed AND verified' meaning 'developed; the live arm is owed'). The 7 carriers (W19/W45/W52/W53/W56/W57/W59) read `dev-landed · live-pending (DELTA owed)`." :28-30 — "`live-verified` — GATE-DEFINED (a fresh on-disk capture exists), never author-asserted." The AX hand-challenge verdict: :237-238 — "returned the tranche sound in PLAN, **inflated in LEDGER**." Recurrence: `docs/tranches/BB/PROGRESS.md` rows read `**complete** (born-RED → GREEN)` for waves SYNTHESIS.md:8 scores as PAINTED-verified 0/33. And the enforcing gate is gone at HEAD (see TA2-5: `scripts/proof-live-verified-ledger.mjs` ABSENT).

**Wave shape.** Make every completion status in the active cursor derive from a named on-disk artifact (capture path, report json) and re-add the string-rejection arm so a hand-typed completion claim cannot enter the ledger.

### TA2-7 — `min-consumers` book rows are immortal: three AY deferrals ride 10-11 tranches; 28 such rows are re-stamped un-MET at BI

**MINOR**

**Mechanism.** The ≥2-consumer bar is a correct anti-overfit rule, but a book row created under it has a trigger and no expiry. If the second consumer never appears, the row is never resolvable and never disposable — deleting it is 'silently dropping', resolving it is 'minting overfit substrate'. So it re-stamps forward at every close. The ledger's completeness clause (which REDs on a dropped item) actively enforces the immortality. The result is monotonic ledger weight that every subsequent tranche must re-read, re-verify, and re-stamp.

**Evidence.** AY booked three at `docs/tranches/AY/audit/W-TRIAGE.md:31,37,43` (`speedtest-native-first-receive`, `keyframes-prune-migration-dag`, `deck-subpath`). Tranche spread: `grep -rl <id> docs/tranches/` → speedtest-native-first-receive in AX AY AZ BB BC BD BE BG BI (9); keyframes-prune-migration-dag in AX AY AZ BB BC BD BE BG BI **BJ** (10); deck-subpath in AX AY AZ BA BB BC BD BE BG BI (10). BI's own record enumerates **28** such rows all re-stamped un-MET (`docs/tranches/BI/FORMATION/open-row-routing.json:81983`): raf-loop-demand-park n:1, drawer-content-spring n:0, deck-subpath n:1, directional-view-transition n:0, … keyframes-prune-migration-dag — "each STAYS `book` with a RECORDED re-stamp ... recorded, never silently re-booked." Counter-example that the mechanism CAN terminate: deck-subpath finally discharged at BC.W-DECK when speedtest+slides made two repos (`docs/tranches/BI/FORMATION/legacy-gate-dispositions.json:6416` — "Discharges the three-tranche deck-subpath disposition book").

**Wave shape.** Give book rows a sunset: after N tranches un-MET, force an explicit RETIRE-with-rationale rather than another re-stamp, so the ledger can shrink.

### TA2-9 — BC's own execution cursor contradicts itself on the terminal tiers — the close-record drift class, in the tranche that cured it

**MINOR**

**Mechanism.** The tier table and the append-only log are two derived views of the same state with no reconciliation step, so the summary table goes stale the moment the log advances. This is the duplicated-derived-data convergence trap: a reader taking the table at face value concludes the cut is pending. It matters here because tier 28 (the cross-repo adopt sweep) is genuinely unresolved and is indistinguishable from tier 27's merely-stale 'pending'.

**Evidence.** `docs/tranches/BC/EXECUTION-PROGRESS.md` tier table: `| 27 | 10 | **CUT** (terminal, user-gated 4.x publish + slides redeploy) | pending |` and `| 28 | 10 | SPEEDTEST-ADOPT/FOURIER-ASK/ATLAS-ASK (post-cut adopt sweep) | pending |`. Same file, final line: "## CUT COMPLETE (2026-06-20) glass-ui 4.1.0 LIVE on npm (provenance, release.yml run 27873146903 SUCCESS; tag v4.1.0 -> 9c0e06e2)." Tier 27 is stale; tier 28 is real — `git log --all --grep='ATLAS-ASK\|SPEEDTEST-ADOPT\|FOURIER-ASK'` returns one commit (`08aa1902 BC Band 1 fan — specimens + atlas-fold + cross-repo`), no dedicated adopt-sweep landing. FINAL.md compounds it: §2 tabulates 70 waves while a milestone note at :34 states the binding roster is 96.

**Wave shape.** Collapse the tier table and the append-only log to one source of record in any active cursor (BJ's included), citing the log rather than mirroring it.

### TA2-8 — Planned vs closed: the discriminator between shipped and halted tranches is an executable close + a live progress cursor, not wave count

**OBSERVATION**

**Mechanism.** Wave count does not predict outcome — BC shipped 96 waves and AT halted at 10. The three halted tranches (AT, AW, BB) each lack BOTH a FINAL.md and (AT/AW) an executed close; AT additionally never left DEV. The six that shipped a published version all carry either a FINAL.md or an explicit successor-absorption record. AX is the informative middle case: it shipped 3.8.0, never wrote a FINAL, and had its close formally absorbed by AY/AZ with a machine-checked disposition of every residual — which WORKED. So the recoverable failure mode is 'no close, but a successor with a disposition gate'; the unrecoverable one is 'no close, no cursor, no successor mapping'.

**Evidence.** FINAL.md presence (`find docs/tranches/<T> -maxdepth 1 -iname '*FINAL*'`): AT NONE · AU AU.FINAL.md · AV NONE · AW NONE · AX NONE · AY FINAL.md · AZ FINAL.md · BA FINAL.md · BB NONE · BC FINAL.md. Published cut per tranche (git/CHANGELOG/tags): AU+AV→3.3.0 (`e9c4ffc8 chore(release): glass-ui 3.3.0 — the AU+AV cut`); AX→3.8.0; AY→3.10.0 (`a8cfd644 AY CLOSE ... 3.10.0 staged`); AZ→3.13.0; BA→4.0.0 (`aaa1e973`); BC→4.1.0 (`02f5a1f8 BC.W-CUT — the honest 4.1.0 cut`). Halted with no cut: AT (`docs/tranches/AT/PROGRESS.md` wave table — W2..W8 all `PLANNED`, its IMPL later executed under AU numbering per `AU.md:75-77` citing AT.W6/AT.W7 commits), AW (no PROGRESS.md at all — `find docs/tranches/AW -name 'PROGRESS*'` empty — 34 wave specs on disk), BB (63 wave files vs "BB now: 71 wave specs" claimed in PROGRESS.md; version never left 4.0.1). AX residual pickup that worked: `docs/tranches/AY/audit/W-TRIAGE.md:45-50` — 14 residual `planned` AX waves + W-DECK, tally ADDRESSED=11 / DEFERS=3 / RETIRES=1, `residuals.length === 15`, enforced by `proof:disposition-live`'s phantom-owner clause with a witnessed born-RED (:111-114).

**Wave shape.** Preserve the AY.W-TRIAGE pattern as the standing successor-obligation — a machine-mirrored disposition of every residual row with a phantom-owner check — since it is the one mechanism in the archive that provably recovered a closeless tranche.

---

## TRANCHE ARCHAEOLOGY III — the recent archive (BD/BE/BF/BG/BH/BI/IOS27-MICRO) and the BI lesson: durable lessons, recurrences, banked-item pickup, planned-vs-closed, and whether the machinery is converting documents into shipped source at an improving rate.

_claude-opus-5[1m]_

### TA3-01 — THE BI MISFIRE: the "USER-GATED" row is the drop mechanism — a directive becomes a recommendation, the gate never fires, the tag cuts anyway

**BLOCKER**

**Mechanism.** A user directive is not executed; it is transcribed into a row with a *recommendation* and a *user gate*. The tranche then treats the gate as satisfying the no-drop rule ("nothing dropped, it's user-gated"), the close proceeds without the gate firing, and the directive re-enters the next tranche's ledger as a fresh row with a fresh recommendation. Because the row is never marked DROPPED it never trips any silent-drop detector, so the machinery cannot see its own largest leak. This is structurally different from ordinary deferral: the gate *inverts* the directive (BI's PLAN-FRAME re-ruled the user's removal order into "STAY library surface"), and the inversion ships.

**Evidence.** docs/tranches/BI/PLAN-FRAME.md:92-99 — user order UF-K1 (remove /data/metrics, instrument-chassis) is re-ruled: "NEW recommendation: the metric family + instrument-chassis + pulse STAY library surface; the UF-K1 overfit instinct lands on (a) the /data/metrics DEMO page redesign…". · docs/tranches/BI/addenda/JUDGMENT-ROSTER.md — 16 live rows, every one still `**DECISION: ____**` on disk today (grep -n 'DECISION:' → 16 blanks + 1 retracted), i.e. blank at 2026-07-22, five days AFTER v7.0.0 was tagged 2026-07-17 (`git log -1 v7.0.0` = 4ab12128 2026-07-17). · docs/tranches/BJ/formation/BI-STOCKTAKE-CARRIER.md:183-188 confirms "16 live rows, every `DECISION:____` blank" as a TAG BLOCKER — the tag cut regardless. · On disk at HEAD: src/components/metric, src/components/instrument-chassis, src/components/completion-seal all present. · docs/tranches/BJ/ASK.md:20 — "ASK-1 · metric-family + instrument-chassis (F18, **third-asked**)". · docs/tranches/BJ/formation/CHRONIC-ADJUDICATION.md:52-56 — "the user has asked 3×, the census refuses with a costed break … no fourth silent re-book." The user's own A16 names it: FEEDBACK-LEDGER.md:83 "NOTHING from the misfiring of BI or previous dropped."

**Wave shape.** A wave that makes a user-gated row *block the tag by construction* — the release script reads the roster and refuses to tag while any DECISION line is blank — and that forbids a tranche from re-ruling a user directive into its opposite without the directive itself being presented back as a single yes/no.

### TA3-02 — No plan in BD/BG/BH/BI/BJ carries a per-wave status column; wave state is reconstructed inferentially from git, which is why BI produced 14 register contradictions

**BLOCKER**

**Mechanism.** The plan is written as a roster of names and the cursor as prose narrative. Neither carries a per-wave state field. Disposition therefore has to be *reconstructed* at close time by correlating git log, exec-state prose, and sweep reports — three registers that drift independently. Every reconciliation attempt produces contradictions rather than a status, and the contradictions are then themselves documented, generating a fourth register. The defect is not sloppiness; it is that the artifact which should hold state was designed without a state field.

**Evidence.** docs/tranches/BI/PLAN.md is 250 lines listing 97 waves and contains ZERO occurrences of "Status"/"STATUS" (`grep -n 'Status\|STATUS' → no matches`). · BI-STOCKTAKE-CARRIER.md:87 — "the named-wave §1/§2 split is **inferential** — PLAN §2 is a pure silent roster with no status column, so per-wave disposition is reconstructed from git + visual sweeps." · :233 — "**All 97 PLAN named waves are status-silent in PLAN itself** … that reconstruction's imprecision is the standing residue." · :216-229 enumerates C1–C14, fourteen register-vs-register contradictions (git-map says 44 commits / live says 48; PLAN §1 says 93 waves / §12 says 97; exec-state says Q041 "FULLY CLOSED" / the confirm reports are FAULTED with no clean successor). · BJ repeats the shape: docs/tranches/BJ/EXECUTION-PROGRESS.md:234-245 is a 7-row "Phase ledger" of prose paragraphs covering a 50-wave roster; the whole 534-line cursor contains 5 status cells (`grep -oE '\| (QUEUED|DONE|…)[^|]*\|'` → 4×QUEUED + 1).

**Wave shape.** A wave that gives every roster row exactly one machine-checked state field whose only writer is the landing commit, so "what is the status of wave X" is a lookup and never a reconciliation.

### TA3-03 — Omnibus landing commits destroy per-wave provenance: BI landed 5% of its 134 P-waves attributably; one commit (490cc46e) touched 926 files

**BLOCKER**

**Mechanism.** When N waves land in one commit, the commit message can name at most a few of them, so N−k waves acquire no independent evidence of having landed, been verified, or been correct. The tranche then cannot audit itself and must fall back on self-report. This is the concrete generator of TA3-02's contradictions and of the "DONE-UNVERIFIED" bucket that became BI's dominant class.

**Evidence.** `git show --numstat 490cc46e` → 926 files, +35,952 / −45,970, subject "feat(BI): land the Glass 7 component, motion, material, and public-surface cut". · BI-STOCKTAKE-CARRIER.md:138-149 §2 "DONE-UNVERIFIED or PARTIAL — **the dominant bucket**": 52 P-waves "DONE in omnibus 490cc46e, no per-wave verdict", ≈77 named waves "landed in omnibus, PLAN status-silent". · Measured directly: of the 134 P-wave specs in docs/tranches/BI/FORMATION/waves/, exactly **7** are named in any commit on any ref (5%); of the 111 named-wave specs in docs/tranches/BI/waves/, 97 are (87%). · Per-commit src file counts for BI-tagged commits: mean 13.1, median 4, **max 555**. BJ by contrast: 23 of 50 roster waves (46%) have a commit that actually touches src/demo/tests; mean 9.3 files, max 64.

**Wave shape.** A wave that makes one wave = one commit an enforced law (the close refuses a landing commit whose message does not name exactly one roster ID), so provenance is a byproduct of landing rather than an audit performed afterwards.

### TA3-04 — `npm test` is RED at HEAD and has been for 31 commits, under a wave whose §CLOSE was stamped with a landing SHA

**MAJOR**

**Mechanism.** A wave's close ceremony is a document edit that records a SHA; it is not gated on the repo's own governed invariants passing after that SHA. So a wave can add public surface, stamp itself closed twelve minutes later, and 31 subsequent commits can land on top of the red. The close ritual and the verification are decoupled artifacts — exactly the class BJ's own commit 4b5bc369 names ("prior 'now CURED, 16 tests GREEN' was false (uncommitted+untracked bytes)").

**Evidence.** `npx vitest run` (run 2026-07-24, 134s) → `Test Files 2 failed | 397 passed (399)`, `Tests 2 failed | 2612 passed (2614)`, exit 1. Both failures are `public runtime surface > keeps the exact root runtime surface` at tests/public-surface.spec.ts:483 (projects `unit` and `chip-listener`); the diff adds `+ "armGlassRefract"` and `+ "supportsBackdropRefract"`. · `git show HEAD:src/composables/glass/index.ts:38` exports both; `git show HEAD:tests/public-surface.spec.ts | grep supportsBackdropRefract` → zero hits, so the failure is at clean HEAD, not a working-tree artifact. · 44621bb4 (07-22 00:12) "land BJ.W-REFRACT-LATCH"; bb33810c (07-22 00:12) "stamp BJ.W-REFRACT-LATCH §CLOSE with the landing SHA"; `git rev-list --count bb33810c..HEAD` = 31, none touching tests/public-surface.spec.ts. · package.json `prepublishOnly` runs `npm test`, so a publish attempt would block.

**Wave shape.** A wave that makes §CLOSE a computed stamp — the close command runs the governed suite at the landing SHA and refuses to write the stamp on red — rather than a hand-authored line.

### TA3-05 — The durable-lessons ledger has been unwritable from the tranche workflow since 2026-06-12; 1,276 commits and four majors have produced zero entries

**MAJOR**

**Mechanism.** LESSONS-LEARNED.md — the repo's designated cross-tranche memory — lives in the `docs/precepts` submodule, and the tranche charters explicitly forbid writing to it from this repo. Lessons are therefore written into per-tranche documents that the next tranche has no obligation to read, while the one file whose entire purpose is to survive the tranche boundary has been frozen for six weeks. This is the root generator of every recurrence in this report: the archive grew 1.4M lines while the memory grew 0 lines.

**Evidence.** `git -C docs/precepts log -3 -- instructions/LESSONS-LEARNED.md` → most recent commit **2026-06-12** (0c03de8, "glass-ui BA.W-HYGIENE P-3"); latest dated entry inside the file is `## 2026-06-10 - Glass-First backdrop-filter Captures fixed-Position Descendants (glass-ui AY.W-ANIM1)`. · `git log --oneline --since=2026-06-12 | wc -l` → **1,276** commits; v4.1.0, v4.2.0, v5.0.0, v6.0.0, v7.0.0 all tagged in that window. · docs/tranches/BJ/waves/BAND-DOC-TRUTH.md:31-33 — "`docs/precepts/**` is a SUBMODULE (gitlink at b0f6134) — **never edited from this repo**". · The file itself is the proof of the disease: it contains `## 2026-05-12 - \`git stash\` Anti-Pattern — Fourth Recurrence` and `## 2026-05-16 - Stash Anti-Pattern 6th + 7th Recurrence Triggered Audit Script` — one lesson counted to seven recurrences before a mechanism was built.

**Wave shape.** A wave that relocates the durable-lessons ledger into this repo (or makes the submodule bump a mandatory close step), so a tranche cannot close without appending its lessons to the one file the next tranche is required to read.

### TA3-06 — BI's formation apparatus cost 1.12M tracked lines and produced one bit: 8,506 of 8,509 routed rows got the identical disposition

**MAJOR**

**Mechanism.** The no-silent-drop mandate was answered by mechanising *enumeration* rather than *decision*. A router extracted every DEFER/OPEN-QUESTION row from 42 tranche directories, then assigned 99.96% of them the same disposition to the same custodian, with acceptance predicates naming P-waves. Since the P-wave lane is only 5% attributable (TA3-03), none of the 8,506 folded rows can be shown discharged — the apparatus converted a legible backlog into an illegible one and charged 248k lines for it. The user's own convergence-gates lesson ("strike the duplicates, gate on a finite invariant checklist") predicts exactly this failure.

**Evidence.** docs/tranches/BI/FORMATION/open-row-routing.json: `rowCount` 8509, `dispositionCounts` {FOLD: 8506, BANK: 3}; every FOLD row carries `custodian: "custodian:glass-ui-perfect-bi"`; 8,509 distinct per-row `acceptancePredicate` strings; 2.79 MB of the 16.0 MB file (17.4%) is verbatim `sourceText` copied out of prior tranche docs; 247,998 lines. · Sibling: FORMATION/path-collision-ledger.json = 289,572 lines; waves.json 91,176; repair-ledger.json 73,083. · Tracked md+json for docs/tranches/BI totals **1,121,728 lines** across 453 text files. · Source rows by origin tranche: BG 1,517 · BD 1,338 · BC 1,103 · AX 662 · AZ 488 · AY 459.

**Wave shape.** A wave that replaces mass row-routing with a bounded decision register — every carried row gets a named owner, a firing trigger, and a one-line disposition, capped at a count a human can read in one sitting — and deletes the generated mega-ledgers rather than carrying them.

### TA3-07 — BD: 957 documents / 159,041 lines / 158 wave specs produced ZERO landing commits for its own waves; the build ran a different work-breakdown entirely

**MAJOR**

**Mechanism.** BD's documentation corpus and BD's implementation were never the same object. The corpus specified 158 named waves (42 `BD.W-*` + 116 union waves) with a FOLD-LEDGER promising terminal dispositions; the build was 13 commits labelled "BD impl P1…P10" that name no BD wave. The documents were therefore not a build manifest but a research corpus that happened to be filed under a tranche letter — and once filed that way, the no-drop machinery treats all 158 phantom waves as live obligations to be carried forward forever (they are 1,338 of BI's 8,509 routed rows).

**Evidence.** Doc side: 957 .md files, 1,047 tracked files, 159,041 tracked md+json lines; sub-corpora `viz/` 417 docs (incl. `viz/page-deep` **341 docs**), `greenfield/` 355, `union/` 127, `waves/` 42. · Wave side: for all 158 wave-spec basenames, `git log --all -F --grep=<name>` returns a BD landing commit for **none**; the only 4 hits are incidental cross-references from BG/BF/BI commits (e.g. 42fc375d "BG WS5 … shared with BD.W-DOT-IMAGE"). · Build side: the 27 BD-exclusive commits contain 13 src-touching ones, all titled "BD impl P1+P2 / P3 / … / P10b" (a5f184cd, cf149cff, b30e7989, b494e526, 80c21e29, 03d8857d, 2fe31f9a, 43b68c33, 369be40f, b8aa7033, 6b4d9abd, bd6aae64, 7ba68387), total src +17,894 / −5,403 over 06-24→06-25. Ratio: **6.8 doc lines per src line changed; ∞ doc lines per own-wave landed.** · Downstream reach of the biggest sub-corpus: `viz/page-deep` (341 docs) contributes 110 routed rows to BI and is cited by 5 downstream files, all of them other audit documents.

**Wave shape.** A wave that separates research corpora from tranche letters — a research corpus gets a `docs/research/<topic>/` home with an explicit consumption contract and no wave IDs, so it cannot mint 158 permanent phantom obligations.

### TA3-08 — The headless-green / visually-broken gap is on its fourth-plus recurrence; BG banked 20 captures per wave, BI banked 0.20 and shipped three majors

**MAJOR**

**Mechanism.** Paint verification is a *wave-optional* artifact rather than a close precondition, so it collapses first under schedule pressure. BG diagnosed the class explicitly, counted three prior shipments, and minted two waves to prevent a fourth — then BI ran the tag on a paint lane that its own stocktake records as never having run to green, and the fourth recurrence duly arrived as 63 rows of user-visible defects three days after the tag.

**Evidence.** docs/tranches/BG/FINAL.md:15-19 — "The headless-green / visually-broken gap shipped broken 3× (BB green-lie · BC never-built-cure · BD 77-gates-re-pointed-but-live-π-never-blocks-the-tag); WS7's `BG.W-PAINT-IS-THE-GATE` + `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` exist to kill it a 4th time." · Tracked captures per tranche (`git ls-files docs/tranches/<T> | grep -cE '\.(png|jpe?g)$'`): BG **2,395** for ~119 waves (20.1/wave) · BI **49** for 245 wave specs (0.20/wave) · BJ **128** for 50 (2.56/wave) · BH **0** for 20. · BI-STOCKTAKE-CARRIER.md:140 — "its missing step has one name: the native paint lane (Q002 pre-tag sweep + Q003 heal batch), **which has never run to green**"; :182 "publish-gate RED"; :253 "the tag cannot cut until a human runs Q003 in-app on :5199". v5.0.0 and v6.0.0 were both tagged 2026-07-15 and v7.0.0 on 2026-07-17 — three majors in three days.

**Wave shape.** A wave that makes a per-wave capture pair (before/after, both engines) a structural precondition of the close stamp, so a wave with zero captures cannot be counted and a tranche's capture count cannot fall below its wave count.

### TA3-09 — The same user complaint families recur verbatim across the BI→BJ boundary, on components BI landed and gated GREEN in between

**MAJOR**

**Mechanism.** Waves are accepted against self-authored structural gates that measure the mechanism the wave installed, not the appearance the user objected to. `proof:geometry-grammar` proves a concentric relay exists; it cannot prove a container looks right. So a wave lands, passes, closes — and the identical screenshot comes back. The acceptance criterion and the complaint are in different ontologies, which is why the recurrence rate is near 1.0 for aesthetic findings.

**Evidence.** BI's user corpus (docs/tranches/BI/audit/user-findings-2026-07-11/, 26 screenshots, 2026-07-11) vs BJ's (docs/tranches/BJ/feedback/, 2026-07-17, six days after): rounding — ss-04-super-rounded, ss-05-section-rounding-wrong, ss-19-container-rounding-wrong, ss-23-drawer-not-rounded, ss-24-section-not-rounded → F09-overround-cramped-configurator, F12-tags-input-unrounded, F15-reset-button-unrounded, F17-search-inputs-unrounded, F45-gate-pattern-rounding; dock — ss-16-scrolled-dock-ux, ss-17/21-dock-hover-clip → F27-dock-vertical-scroll, F47-dock-ux ("The dock likely needs to be greenfielded, **again**"); blur — ss-09/13-button-glass-blur → F28-blur-inconsistency, F48-hierarchy-blur-rounding; progress — ss-02/22-progressbar-awful → F21-scroll-progress-rim, F22-progress-loop-jitter; meta text — ss-18-not-draggable-meta-text → F40 ("Remove ALL reference to meta text"). · In between, BI landed 92e00ff7 "BI B1 (BI.W-RADIUS-GRAMMAR): proof:geometry-grammar LANDED (4 laws)" and eight dedicated dock waves (DOCK-SPINE ae71daa0, CROSSFADE/SPINE f1e88fe2, ESCAPE, CONTROLS, OVERFLOW, SPRING-UNIFY, FOLD, RETIRES — each with its own commit), recorded in BI-STOCKTAKE-CARRIER.md:115-125 as "V8a PASS monotonic", "V5-dock PASS".

**Wave shape.** A wave that binds every aesthetic finding to the *user's own screenshot* as its acceptance artifact — the close requires the same viewport re-shot and adjudicated against the original, not a structural proof that a mechanism exists.

### TA3-10 — Rework tax is rising: 53% of BJ-era commits exist to correct the tranche's own record, up from 30% in BI; the first band closed and reopened in 48 hours

**MINOR**

**Mechanism.** Because state lives in prose across several registers (TA3-02) and landings are not one-to-one with waves (TA3-03), every substantive commit generates downstream commits that reconcile the record to it. The correction stream is self-sustaining: corrections are themselves prose in the same registers and are themselves later corrected. BJ's adversarial hardening is genuinely catching real defects — but half its commit budget is now spent on the record rather than the product.

**Evidence.** `git log --oneline --since=2026-07-17 | wc -l` = 181; the same range filtered `-i -E --grep='correct|redress|truth-up|false|over-claim|strike|reconcile|phantom|stale'` = **96 (53%)**. BI window 2026-07-10..07-18: 435 commits, 130 matches (30%). BC 06-17..06-23: 190/73 (38%). · docs/tranches/BJ/EXECUTION-PROGRESS.md:240 — P-EX1 declared "COMPLETE 2026-07-20 … BJ FORMATION IS CLOSED" then "**REOPENED ACCEPTANCE-RED 2026-07-22.** The 2026-07-20 source ledger … remains historical progress, not a 5-of-5 close." · Live example of the SOURCE-UNCOMMITTED class: 4b5bc369 body — "§CLOSE HARDENING III: prior 'now CURED, 16 tests GREEN' was false (uncommitted+untracked bytes); defects (a) stale-on, (b) throw-escape … verified LIVE at HEAD". · Working tree right now: 79 porcelain entries, 37 modified files (+1,732/−324), 42 untracked.

**Wave shape.** A wave that collapses the registers to one — a single machine-written cursor derived from git plus the roster state field — so there is nothing left to reconcile and the correction stream loses its source.

### TA3-11 — The one unambiguous durable win: the gates-abrogation mandate was executed completely and is verifiable by running it

**OBSERVATION**

**Mechanism.** This is the counter-example that shows the machinery CAN convert documents to shipped source when the target is structural, countable, and has a hard cap. BI's PACKAGE-SCRIPT-ABROGATION.md (112 KB) and LEGACY-GATE-ABROGATION.md (153 KB) specified the collapse; it landed, and it holds today under a self-enforcing numeric ceiling. Every property missing from the aesthetic waves (a number, a cap, a machine check) is present here.

**Evidence.** `git show v4.2.0:package.json` → 384 scripts, **361 `proof:*`**; `git ls-tree -r --name-only v4.2.0 scripts | wc -l` → 437. `git show v5.0.0:package.json` → 21 scripts, **0 proofs**. HEAD → 19 scripts, 0 proofs, 12 files in scripts/. · `node scripts/verify-governed-invariants.mjs` (run 2026-07-24, exit 0) → `{"active":48,"reserved":5,"worstCase":53,"remaining":7,"external":11,"registrations":48}` — inside the user-mandated 40–60 band with the headroom stated. · Replacement coverage grew rather than shrank: test files 276 (v4.2.0) → 289 (v5.0.0) → 320 (v6.0.0) → 355 (v7.0.0) → **375** (HEAD, 2,614 tests) while src files fell 895 → 694 and src lines 115,140 → 90,055; export subpaths 96 → 72.

**Wave shape.** A wave that generalises this pattern — give each remaining chronic (paint coverage, wave attributability, ASK backlog) a single integer, a hard cap, and a script that prints it — because the one mandate shaped this way is the one mandate that shipped.

### TA3-12 — Verdict on the trend: the machinery is getting better at document economy and per-wave attribution, and no better at closing the user loop

**OBSERVATION**

**Mechanism.** BJ has structurally corrected BI's two most expensive pathologies (mega-artifact generation and unattributable omnibus landings) but has not touched the mechanism that produced the user's complaint (TA3-01/TA3-02): the roster still has no state field, the user-gated backlog is larger than BI's, and none of the thrice-asked removals has executed. Improvement is real on the axes the machinery can measure about itself, and absent on the axis the user measures.

**Evidence.** IMPROVING — total tracked doc lines per tranche: BI 1,121,728 → BJ 104,073 (10.8× reduction); largest single tracked artifact: BI 289,572 lines (path-collision-ledger.json) → BJ 43,774 (component-graph.json, 6.6× smaller and genuinely derived); waves with an own code-touching commit: BI P-lane 7/134 (5%) → BJ 23/50 (46%); captures per wave spec: BI 0.20 → BJ 2.56; doc lines per attributable landed wave: BG 9,438 · BI 10,786 · BJ 4,525. NOT IMPROVING — per-wave status column: absent in BD, BG, BH, BI and BJ alike; user-gated backlog: BI 16 blank DECISION rows → BJ **33** ASK rows (ASK.md), two of them third-asked; the 2026-07-11 removal order is unexecuted at 2026-07-22 (metric/, instrument-chassis/, completion-seal/ all on disk); correction-commit share 30% → 53%; suite red at HEAD for 31 commits. Doc-lines-per-src-line by tranche: BC 1.15 · BD 6.83 · BI 12.8 · BH 14.4 · BG 18.1 — i.e. the ratio worsened 16× from BC to BG and has not returned to BC's level in any tranche since.

**Wave shape.** A wave that adds the two missing measurements to the close battery — blank-ASK count and unexecuted-user-directive age — so the tranche is scored on the user's axis and not only on its own.

---

## PERFORMANCE — measured. Built demo (`npm run demo:dist:build` → `vite preview`) and dev server (`npm run demo:serve`) driven by a private Playwright Chromium (headless=new, ANGLE/Metal, plus a SwiftShader weak-GPU arm), with CDP CPU/network throttling, `Performance.getMetrics`, PerformanceObserver (longtask / LCP / layout-shift), a patched `requestAnimationFrame` counter, and chunk-blocking A/B.

_claude-opus-5[1m]_

### P1 — Three seconds of literally empty DOM: app mount is gated on the deepest lazy route chunk, and index.html ships no fallback shell

**BLOCKER**

**Mechanism.** The demo never renders anything until the *route* chunk resolves. `demo/main.ts:79` does `router.isReady().then(() => app.mount("#app"))`, and `demo/router.ts` `beforeResolve` additionally `await Promise.all(...)`s every matched route component before the navigation commits. `dist-demo/index.html` contains only `<div id="app"></div>` — no static shell, no skeleton, no server render. So the entire static chrome (sidebar rail, bottom dock, header) — none of which depends on the route — is held hostage by a second network round of chunk discovery: entry executes → router created → dynamic import of the route component → its own deps → only then mount. This is a structural serialization, not a byte problem.

**Evidence.** Filmstrip on the BUILT demo at 4x CPU / 1.6 Mbps / 150 ms RTT, route `/display` (scratchpad/filmstrip.mjs, polling `#app.innerHTML.length` every 200 ms): t=377…2777 ms → `{"app":0,"canvas":0,"h1":false,"cards":0}` at every sample; first non-empty DOM at t=3247 ms `{"app":21587,"h1":true,"cards":5}`. Paint timings same run: first-paint 1156 ms (CSS background only), first-contentful-paint 3136–3300 ms. Landing route `/`: first-paint 1160 ms, FCP 3176 ms. Waterfall (scratchpad/waterfall.mjs): entry `index-B5HKHTUu.js` lands at 823 ms, its 55 preloaded deps run to 2267 ms, `CatalogLanding-DMeOMdI0.js` is only *requested* at 2474 ms, its deps to 2812 ms, mount → FCP.

**Wave shape.** Mount the shell immediately (static markup in index.html or `app.mount()` before `router.isReady()`), let `<RouterView>` render a real skeleton while the route chunk streams, and drop the `beforeResolve` pre-resolve await from the user-facing path (keep it behind the `?capture=` harness flag that actually needs it).

### P2 — Chunk shrapnel: 287 JS chunks with a 1,091-byte median, 104 requests on one route — 1.67 s of FCP is pure round-trip serialization, not bytes

**MAJOR**

**Mechanism.** The demo build declares no `output.manualChunks`. `demo/vite.demo-dist.config.ts` sets only `{ cssTarget, outDir, emptyOutDir }`; the `manualChunks` recipe that exists in the root `vite.config.ts` is scoped to the library `build.lib` arm and its own comment says it is inert there. Rolldown therefore emits one chunk per reka-ui / lucide / composable leaf module, and Vite writes a `<link rel=modulepreload>` for each one in the entry graph. Cost is per-request (connection scheduling + RTT + parse setup), so it scales with *count*, and count is what is unbounded.

**Evidence.** `dist-demo/assets`: 287 JS chunks, 1.88 MB raw / 0.68 MB gzip, median chunk 1,091 B gzip, 137 chunks <1 KB gzip and 214/287 (75%) <2 KB. `dist-demo/index.html` carries 56 `<link rel=modulepreload>` + the entry (470.4 KiB raw / 167.0 KiB gzip before any route chunk). Measured landing route: 104 requests, 91 of them scripts, 70 of those 91 under 2 KB. Bandwidth-vs-RTT isolation on `/display` at 4x CPU (scratchpad/net2.mjs): 1.6 Mbps/150 ms → FCP 3300 ms; 1.6 Mbps/20 ms → FCP 2296 ms (−1004 ms from RTT alone at identical bandwidth); 10 Mbps/150 ms → FCP 2436 ms; 10 Mbps/20 ms → FCP 764 ms. At 10 Mbps the RTT term is 1,672 ms of the 2,436 ms FCP.

**Wave shape.** Give the demo build a real `manualChunks` policy that coalesces the reka-ui primitive leaves, the lucide icons, and the shared composables into a handful of route-shared vendor chunks, so the landing route costs ~10 requests instead of ~91.

### P3 — The decorative shell WebGL field is on the critical render path and has no error boundary — one failed chunk yields a permanently blank app

**MAJOR**

**Mechanism.** `demo/shell/AppShell.vue:203` renders `<Aurora v-if="shellFieldActive">` as the FIRST node of the shell, resolved through `defineAsyncComponent({ loader, delay: 0, loadingComponent })` at AppShell.vue:66–79 — a `loadingComponent` is supplied but NO `errorComponent`. Vue's async wrapper re-throws on loader failure, so a transient failure of a purely decorative background chunk propagates out of the shell render and blanks `#app`. Compounding it, that chunk is the single largest asset in the app and 78% of it is shader source for BOTH backends, shipped on every non-focal route including pure-typography specimen pages.

**Evidence.** Chunk composition: `dist-demo/assets/Aurora-cJg3k3TU.js` = 205,085 B raw / 67 KB gzip, of which 20 template literals >2000 chars total 159,012 B (77.5%) — the GLSL+WGSL corpus (`src/components/aurora/constants/shaders/*.ts` = 169,600 B on disk, both WebGL and WebGPU variants). `npm run profile:bundle` prints `[W3 AURORA] medium tail : eager (compile-time spliced …) (103 eager hits)`. A/B with the chunk blocked (scratchpad/ab.mjs, `/`): baseline `{reqs:104, kb:381, fcp:3296, canvases:1}` vs Aurora blocked `{reqs:70, kb:244, fcp:0, canvases:0}` — no contentful paint within 6 s. Confirmed blank (scratchpad/blank.mjs): `{"appHTMLLen":0,"bodyText":"","h1":null,"nodes":80}` with `PAGEERROR Error: Unable to preload CSS for http://localhost:5301/assets/Aurora-CQxAlwrk.css`. And it mounts on static pages: `/display/buttons` reports `canvases: 1`.

**Wave shape.** Give the shell field an `errorComponent` that falls through to the already-eager `auroraFallbackGround` wash, and split the shader corpus so a route loads only the backend + mediums it will actually compile instead of all 103 eager splices.

### P4 — Per-frame Vue-reactive inline custom-property write, unregistered (so inheriting), on a filtered element that also has a CSS transition on the same property — 33% of the main thread burned while idle

**MAJOR**

**Mechanism.** Four defects stack into one frame cost. (1) `src/components/watercolor-dot/useWatercolorBlob.ts:150` sets `transform.value = composeTransform()` on EVERY rAF frame; that ref feeds a `:style` binding `'--watercolor-wobble': transform` at `WatercolorDot.vue:118`, so each frame is a Vue component patch, not a raw style write. (2) `--watercolor-wobble` is never registered with `@property { inherits: false }` — the repo has 116 `@property` blocks and 34 `inherits: false`, but not this one — so the per-frame write invalidates computed style for the element AND every descendant. (3) `WatercolorDot.vue:292-296` declares `transition: transform var(--duration-fast) var(--ease-standard)` on `.watercolor-swatch.watercolor-animated` while `transform: var(--watercolor-wobble)` (line 213) is rewritten every ~8 ms, so a 200 ms transform transition is retargeted every frame. (4) the same element carries `filter: var(--watercolor-filter)` referencing an SVG filter, so the transform is not compositable and the filter graph re-rasters. The source comments assert this is 'a COMPOSITOR transform wobble … never re-rasters the cached filter graph'; the measurement says otherwise.

**Evidence.** `/foundations/colors` (13 `.watercolor-swatch.watercolor-animated`, 78 elements resolving a non-empty `--watercolor-wobble` via inheritance). CDP `Performance.getMetrics` delta over a 5,000 ms IDLE window at 4x CPU, no input (scratchpad/idle.mjs): `RecalcStyleCount 601, RecalcStyleDuration 860.1 ms, ScriptDuration 97.1 ms, TaskDuration 1651.7 ms` — 17.2% of wall clock in style recalc, 33% of the main thread busy doing nothing. Identical window with `prefers-reduced-motion: reduce`: `RecalcStyleCount 0, RecalcStyleDuration 0, TaskDuration 0.1 ms`. Frame sampling at 4x CPU: p95 25.4 ms, 40 dropped frames (>20 ms) out of 240 — the only route in an 87-route sweep with sustained drops. Computed style confirms the live retarget: `transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), …'` with `transform: 'matrix(1.01205, 0.00734226, -0.0125601, 1.01934, 0, 0)'`.

**Wave shape.** Drive the wobble by writing the element's `style.transform` directly outside Vue reactivity (or register `--watercolor-wobble` with `@property { inherits: false; syntax: '<transform-list>' }`), and delete the `transition: transform` leg from the animated variant so the per-frame value is not also a transition target.

### P5 — The 'one GL context per route' budget is a doc comment, not an invariant — /substrates/constellation mounts 9 canvases and runs at 27 fps on a weak GPU

**MAJOR**

**Mechanism.** The budget is asserted in prose in the components that could violate it (`demo/stories/dock/_frame/DockStage.vue` header: 'ONE GL context per page (the one-GL-per-route budget): the chassis renders the shared <Aurora> ONCE'; `demo/stories/manifest.ts` §dock: 'the one-GL-per-route budget is binding'). Nothing enforces it at the route level, so a story that composes N stage components mounts N contexts, and a substrate story that instantiates N `<Constellation>` specimens mounts N canvases on top of the always-on shell Aurora. There is no route-level context registry and no gate asserting the count. The violation is invisible on an Apple-silicon dev box because a discrete GPU absorbs it.

**Evidence.** Canvas census (scratchpad/canv.mjs): `/substrates/constellation` = 9 canvases (1 × `aurora-canvas` 1440×900 + 8 × `constellation-canvas`, four at 1078×420, two at 532×300, one 1440×900); `/dock/controls` = 4 `aurora-canvas`, three armed at 1288×900 (≈13.9 MB of backing store) because the story composes 4 `<DockStage>`; `/substrates/blob` = 3; `/motion` = 2. Frame pacing A/B, same page, same build (scratchpad/swguard.mjs): ANGLE/Metal `/substrates/constellation` = `{"fps":120,"p50":8.3,"p95":9.1,"over33":0}`; ANGLE/SwiftShader (weak-GPU proxy) = `{"fps":27,"p50":33.5,"p95":49.8,"max":58,"over33":99}` out of 107 frames. Secondary, deterministic across 3 runs (scratchpad/stuck.mjs): the 4th DockStage canvas backs at 300×150 while its CSS box is 1288×900 until scrolled into view — the born-skipped case that `src/composables/glass/webgl/visibility.ts:93` documents as cured.

**Wave shape.** Make the GL budget a runtime-enforced route-scoped registry (a provide/inject context counter that refuses or parks the Nth context) plus a gate that walks every route and asserts the canvas count, so a story cannot silently mount four full-viewport fields.

### P6 — Dev server ships 16.8 MB across 303 modules per page because reka-ui and @lucide/vue are consumed through their root barrels with no optimizeDeps entries

**MAJOR**

**Mechanism.** `vite.config.ts` declares no `optimizeDeps` block. src imports the package roots — 81 `from "reka-ui"` and 21 `from "@lucide/vue"` sites in `src/`, plus 44 lucide sites in `demo/` — so Vite's dep optimizer pre-bundles each dependency into ONE monolithic file and serves the whole library on any page that touches a single primitive. Production tree-shakes this; dev does not, and dev is where 'pages slow to load' is felt during authoring.

**Evidence.** Dev server (`npm run demo:serve`, route `/`), unthrottled (scratchpad/dev.mjs, devtop.mjs): 303 requests, 301 scripts, 16.77 MB total. Top modules: `.vite/deps/reka-ui.js` 5,272 KB, `.vite/deps/@lucide_vue.js` 4,010 KB, `vue.runtime.esm-bundler` 1,156 KB, `@vueuse_core.js` 1,044 KB, `demo/demo.css` 365 KB, `vue-router.js` 335 KB — 9.3 MB of the 16.8 MB is two barrel pre-bundles. Every route pays it: `/display` 303 reqs, `/forms/inputs` 310, `/substrates/aurora` 353. Under 4x CPU / Fast 3G the same page took 80 s to settle.

**Wave shape.** Add an `optimizeDeps` policy that splits the reka-ui and lucide pre-bundles per entry point (or switch the call sites to deep specifiers), so a dev page load pulls the primitives it uses instead of 9.3 MB of barrel.

### P7 — The configurator sheet mounts on every route despite never being visible — a 12-chunk tail that lands after FCP

**MINOR**

**Mechanism.** `demo/shell/AppShell.vue:283` renders `<PresetEditor />` unconditionally at the shell root. It is a `defineAsyncComponent` (AppShell.vue:51), and `defineAsyncComponent` starts loading when the component RENDERS, not when it becomes visible — the `open` ref (`useConfiguratorOpen.ts`) only gates the `<Dialog>` INSIDE it. So the whole reka Slider/Switch/Select/SegmentedTabs/ConfiguratorLayer/ConfiguratorRow/DarkModeToggle stack downloads and mounts on every page view for a sheet the user has not opened. The AppShell comment claims this boundary keeps 'its reka dropdown/select/tooltip/floating stack … out of the boot graph' — it defers the chunk but not the fetch.

**Evidence.** Landing-route waterfall (scratchpad/waterfall.mjs, 4x CPU / Fast 3G): FCP at 3176 ms, then `PresetEditor-Dx25C3LZ.js` 3319 ms, `SelectItem-BBucRvm5.js` 3348, `Slider-erDADlmQ.js` 3669, `Label` 3749, `Switch` 3770, `SegmentedTabs` 3862, `useTabRovingFocus` 3912, `useDragMorph` 3934, `keyframes` 3948, `useElementMorph` 3971, `ConfiguratorLayer` 4026, `ConfiguratorRow` 4070, `DarkModeToggle` 4105 — 30 chunks arriving 130–930 ms AFTER content is on screen. A/B (scratchpad/ab.mjs): blocking that subtree removes 12 requests / 29 KB and moves the last request from 4120 ms to 3832 ms.

**Wave shape.** Wrap `<PresetEditor />` in `v-if="open"` (or an idle-callback prefetch) so the configurator's reka stack is fetched on first open rather than on every page view.

### P8 — Brand woff2 arrives at 3.7 s — past its font-display:optional window — and index.html deliberately ships no font preload

**MINOR**

**Mechanism.** `dist-demo/index.html` carries an explicit comment declining any preconnect/preload wiring ('No external font-host preconnect/stylesheet wiring is needed'), so the face is discoverable only from the 318 KB stylesheet, which itself is one of 100+ resources. `src/styles/fonts.css:84,100` sets `font-display: optional` for Plus Jakarta Sans — optional means: if the face is not ready within the ~100 ms block period, the FALLBACK is used for the lifetime of the page, no swap. `fonts.css:122,137` sets `swap` for Fira Code, which instead reflows when it lands late.

**Evidence.** Fast 3G / 4x CPU, built demo (scratchpad/font.mjs, waterfall.mjs): the stylesheet `index-C74h3Jp8.css` completes at 1144 ms; `plus-jakarta-sans-latin-eXO_dkmS.woff2` completes at **3735 ms**, dead last behind 90 script requests. Unthrottled the same font completes at 122 ms. Filmstrip corroborates the late transition: `document.fonts.status` reads `"loading"` at t=3247/3381/3578 ms and only flips to `"loaded"` at t=3778 ms — i.e. after content has already painted.

**Wave shape.** Emit `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two latin faces in the demo HTML so the font request starts with the document rather than after the stylesheet and 90 scripts.

### P9 — The bundle-drift gate is structurally blind to relative regressions: an absolute 1024-byte floor skips a 37x size increase

**OBSERVATION**

**Mechanism.** `scripts/profile-bundle.mjs` compares each dist entry's gzip size against a committed baseline but suppresses the comparison whenever the value is under an ABSOLUTE 1024-byte floor. Because the library's subpath entries are re-export shims of 80–120 bytes, essentially every one of them lives permanently under the floor, so no proportional growth on a subpath entry can ever fire the gate — the gate can only see regressions on entries that are already large.

**Evidence.** `npm run profile:bundle` output verbatim: `[SKIP] dist/pager-dots.js — gzip 3652 vs baseline 99 (below 1024-byte floor)` (36.9x), `[SKIP] dist/instrument-chassis.js — gzip 868 vs baseline 107 (below 1024-byte floor)` (8.1x), `[SKIP] dist/paper-backdrop.js — gzip 358 vs baseline 87`, `[SKIP] dist/reactive.js — gzip 357 vs baseline 110`. Plus five entries the gate reports as gone rather than failing on: `[MISSING] dist/scrolling-text.js`, `dist/notification.js`, `dist/icon-tooltip.js`, `dist/metric-badge.js`, `dist/icon-chip.js`.

**Wave shape.** Make the drift check fire on max(absolute delta, relative ratio) so a 99 B → 3652 B entry reds, and make `[MISSING]` a failure rather than a note.

### P10 — No route ever reaches a quiescent frame: every page schedules rAF at display rate forever, including static specimen pages

**OBSERVATION**

**Mechanism.** `src/composables/motion/core/useRAFLoop.ts` has park gates (visibility, reduced-motion, IntersectionObserver via consumers) but no TICK-RATE concept — a consumer that only needs 4 Hz still schedules a callback every frame and early-returns. `src/composables/glass/useGlassBackdropLuminance.ts:350` does exactly that (`if (now - lastSampleAt < sampleIntervalMs) return;` inside a full-rate loop), and each consumer instantiates its OWN loop plus its OWN `visibilitychange` listener (`useDocumentVisibility` is per-call by explicit design, documented at its line 11). So N glass surfaces = N rAF chains + N document listeners, and the shell Aurora keeps the GPU drawing a full-viewport fragment shader on pages with no animation at all.

**Evidence.** Patched-`requestAnimationFrame` census over a 4 s steady-state window at 4x CPU (scratchpad/rafcount.mjs), callbacks per frame: `/foundations/colors` 16, `/substrates/blob` 11, `/dock/controls` 8, `/substrates/constellation` 5, `/display/buttons` 3, `/` 3, `/motion/springs` 3, `/substrates/aurora` 2 — never 0. Idle-window CDP metrics: `/` no-preference → `ScriptDuration 70 ms, TaskDuration 178.1 ms` per 5 s; the SAME route under `prefers-reduced-motion: reduce` → `ScriptDuration 0, TaskDuration 0.1 ms`. `/display/buttons` idle: `RecalcStyleCount 600, RecalcStyleDuration 25.1 ms, ScriptDuration 73.5 ms` for a page of static buttons. Idle `JSHeapUsedSize` growth per 5 s: `/dock/controls` +4.67 MB, `/substrates/constellation` +3.62 MB (allocation churn — see openGaps, not confirmed as a leak).

**Wave shape.** Add a `hz` / `minFrameInterval` option to `useRAFLoop` so sub-display-rate consumers schedule at their real cadence, and give the shell field a settle-and-stop policy on routes that declare no live substrate.

---

## ACCESSIBILITY — component-level, from source (keyboard operability, focus management, ARIA truthfulness, reduced motion, target size, computed contrast)

_claude-opus-5[1m]_

### A11Y-1 — SortableList steals Space/Enter from every focusable descendant (nested inputs cannot type a space)

**BLOCKER**

**Mechanism.** The drag scope is enforced on the POINTER path only. `useSortable.registerItem` guards `onPointerdown` with `targetIsHandle(event.target, handleSelector)` but `onKeydown` has NO target/handle test at all, and `dragController.onKeydown` unconditionally `preventDefault()`s Space/Enter and calls `begin()`. Because the listener is bound on the `<li>` (SortableItem.vue:38), every key event bubbling from ANY descendant is treated as a row-level drag command. This is the general class: row-level delegated key handlers in this library are written without the `event.target === event.currentTarget` / handle test that their pointer twins have — DataTable's `onRowKeydown` DOES have it (DataTable.vue:170), sortable does not, so the discipline is per-author rather than structural.

**Evidence.** src/components/sortable-list/composables/useSortable.ts:116-123 (onPointerdown guards with targetIsHandle; onKeydown does not) + dragController.ts:228-236. REPRODUCED with vitest + @vue/test-utils: mounting SortableList/SortableItem/SortableHandle with a nested `<input type="text">` and dispatching `new KeyboardEvent('keydown',{key:' ',bubbles:true,cancelable:true})` on the input printed `defaultPrevented: true` and the live region read `Lifted a, position 1 of 2.` — the space never reaches the input and the row silently enters keyboard-drag mode.

**Wave shape.** Gate the keyboard path with the same handle/target predicate the pointer path already uses (only act when `event.target` is the row itself or matches `handleSelector`), and sweep every other row/container-level `@keydown` in src/components for the missing target test.

### A11Y-2 — DropdownMenuTrigger ships with no visible focus indicator at all

**MAJOR**

**Mechanism.** Focus visibility in this library is an OPT-IN class (`.focus-ring`) rather than a floor — there is no global `:focus-visible` fallback anywhere in src/styles. So any component that authors `outline: none` without also opting into `.focus-ring` silently ships a focus-invisible control, and nothing detects it. The dropdown trigger's rule is also UNLAYERED, so it outranks every `@layer components`/`@layer utilities` rule a consumer might add.

**Evidence.** src/components/dropdown-menu/styles.css:104-106 — `.dropdown-menu__trigger { outline: none; }` is the ONLY rule for that class in the entire tree (`grep -rn dropdown-menu__trigger src/` returns exactly two hits: this rule and the class application). src/components/dropdown-menu/DropdownMenuTrigger.vue:72 applies `cn('dropdown-menu__trigger', props.class)` — no `focus-ring`. src/styles/utilities/base.css:113 shows the only focus rule is the opt-in `.focus-ring:focus-visible`. The forced-colors restore list at src/styles/utilities/a11y-overrides.css:96-108 enumerates `.dock-dropdown-trigger` but NOT `.dropdown-menu__trigger`, so even Windows High Contrast gets nothing.

**Wave shape.** Make focus visibility a floor rather than an opt-in — a base `:focus-visible` rule for interactive elements that per-component rings override, so `outline:none` can never leave a control unringed, and add the missing selector to the forced-colors block.

### A11Y-3 — Carousel: off-screen slides stay in the tab order and in the a11y tree; slide changes announce nothing

**MAJOR**

**Mechanism.** CarouselItem is a 24-line pass-through that stamps `role="group" aria-roledescription="slide"` and never manages state. There is no active-slide plumbing at all: no per-slide accessible name, no `inert`/`aria-hidden` on non-active slides, no live region for the position. The visual affordances (roledescription, pager chevrons, "3 / 7" counter) were shipped; the state that makes them mean anything was not. The classic consequence is concrete: Tab reaches a focusable inside an off-screen slide, the browser scrolls the nearest scroll container — the `overflow-hidden` embla viewport — and embla's transform-based positioning permanently desyncs from the container scrollLeft.

**Evidence.** src/components/carousel/CarouselItem.vue:11-23 (entire template; no inert, no aria-hidden, no aria-label). src/components/carousel/CarouselContent.vue:113-117 wraps the track in `class="carousel-viewport overflow-hidden"`. src/components/carousel/CarouselPager.vue:80-86 renders `{{ selectedIndex + 1 }} / {{ slideCount }}` in a plain `<span class="glass-pager-ring …">` — no `aria-live`, no `role="status"`. src/components/carousel/Carousel.vue:89 `:tabindex="accessibleName ? 0 : undefined"` — the arrow-key handler at :64-79 is unreachable unless the consumer happens to pass `ariaLabel`.

**Wave shape.** Drive per-slide state off the embla selected snap: label each item "N of M", mark non-selected items `inert`, and surface the position through one polite live region; make the root focusable unconditionally rather than as a side effect of `ariaLabel`.

### A11Y-4 — An unchecked Checkbox / RadioGroupItem is drawn at 1.28:1 against its own surface — effectively invisible

**MAJOR**

**Mechanism.** `--control-ring` is a 12%-alpha foreground tint and it is the ENTIRE visual definition of an unchecked control (no fill that separates from the page). Contrast in this repo is governed by token-IDENTITY gates, not computed ratios — tests/styles/placeholder-contrast.test.ts asserts a placeholder block matches `/color:\s*var\(--muted-foreground\)/` and never computes anything — so a token whose VALUE is a sub-threshold alpha tint can never be caught. The `prefers-contrast: more` remediation compounds it by matching only the checked state.

**Evidence.** src/styles/tokens/scale-paper.css:104 `--control-ring: color-mix(in srgb, var(--foreground) 12%, transparent)`; consumed at src/components/checkbox/styles.css:10 and src/components/radio-group/styles.css:39. Computed (sRGB relative luminance, WCAG 2.x): 1.276:1 light `--control-ring` over `--background`; 1.395:1 dark over `--card`. The composed alternative is worse — `--control-surface-border: var(--glass-border-floating)` (src/styles/tokens/glass.css:470, :425) is foreground@5% → 1.104:1, and its fill `--glass-bg-quiet` derives from `--card`, which is 1.04:1 against the light page. WCAG 1.4.11 requires 3:1. src/styles/accessibility.css:10-21 raises borders only for `[data-state="checked"]`/`aria-checked="true"` — the unchecked state is excluded from the one remediation that exists.

**Wave shape.** Give the unchecked control rung a real ≥3:1 boundary token (opaque, not a 5–12% alpha tint), and replace the identity-matching contrast gates with a gate that resolves token values and computes the ratio.

### A11Y-5 — Dark-mode form error text computes 3.67:1 while the token comment asserts 4.60:1

**MAJOR**

**Mechanism.** Contrast ratios in this token cascade live as prose assertions next to the declaration and are never recomputed when the PAIRED token moves. `--card` was lifted and re-chroma'd (L16 grey → hsl(26 22% 17%)) and the destructive-ink claim rode along untouched — and the asserted figure does not match the pre-lift card either, so it was never derived from any shipped value. Every 'AA holds' comment in tokens/ is therefore unverified by construction.

**Evidence.** src/components/labeled-field/LabeledField.vue:105-107 `.labeled-field-error { color: var(--destructive) }` at `font-size: var(--type-small)`. Dark `--destructive: hsl(0 80% 60%)` (src/styles/tokens/light-dark.css:124, mirrored src/styles/tokens/dark-arm.css:110) over dark `--card: hsl(26 22% 17%)` (src/styles/tokens/light-dark.css:109). Computed 3.67:1 — fails the 4.5:1 body floor. src/styles/tokens/light-dark.css:117-121 claims "4.60:1 as text over --card". Against the pre-lift `hsl(24 8% 16%)` it computes 3.83:1. My contrast implementation reproduces the repo's own other published figures (5.21 vs claimed 5.21, 7.89 vs 7.88, 10.25 vs 10.29) and sanity-checks at 21.00 black/white and 4.54 for #767676 on white.

**Wave shape.** Machine-derive every contrast figure from the resolved token graph in a gate that fails on the ratio (not the token name), and re-derive the destructive ink against the lifted card.

### A11Y-6 — ScrubberTimeline's value readout appears on hover/active only — a keyboard scrubber shows no value

**MAJOR**

**Mechanism.** Reveal-on-interaction is authored against pointer pseudo-classes with no focus arm. The component otherwise implements the keyboard contract fully (role=slider, tabindex=0, arrows/Home/End with preventDefault), so the gap is purely the CSS reveal selector — the same shape as any `:hover`-gated affordance in the library.

**Evidence.** src/components/timeline/ScrubberTimeline.vue:245-254 sets `.timeline-caret { opacity: 0 }`; :257-259 is the only reveal — `.timeline-row:hover .timeline-caret, .timeline-row:has(.glass-track:active) .timeline-caret { opacity: 1 }`. No `:focus-visible` / `:focus-within` arm exists (grep of `:focus` in the file returns only :293 `.glass-track:focus-visible`, the ring). The keyboard handler is at :155-170 and the track is `role="slider" tabindex="0"` at :218-224.

**Wave shape.** Add the focus arm to every hover-gated reveal (`:focus-within`/`:focus-visible` beside `:hover`) and sweep src/ for `:hover`-only opacity/visibility reveals on containers holding focusable elements.

### A11Y-7 — The 44px `touch-hit-area` utility receives no pointer events, has zero consumers, and its comment records satisfying the readback rather than the user

**MINOR**

**Mechanism.** a11y here is verified by computed-style readback rather than by hit-testing, so a 'fix' that satisfies the reader while receiving no pointer events passes — the comment says so in as many words. Because nothing tests that the class is APPLIED, the utility then rots: the six atoms it claims to serve each hand-roll their own floor instead, and a Slider override the comment describes was never written.

**Evidence.** src/styles/utilities/a11y-overrides.css:150-183 declares `@utility touch-hit-area` with `pointer-events: none` on the 44px `::before` (:180); the rationale at :172-179 states the geometry "still satisfies the WCAG-2.5.5 readback (getComputedStyle reads min-width/height, not pointer-events)". `grep -rn "touch-hit-area" src --include="*.vue"` returns ONLY two comment lines (src/components/slider/Slider.vue:357 and :372) — no template applies the class. The claim at :126-129 that six atoms "compose this ONE shared utility" is false: checkbox uses `.checkbox__seat` (checkbox/styles.css:23-31), switch uses host `min-inline/block-size` (switch/styles.css:12-13), tags-input uses its own `@media (pointer: coarse)` block (tags-input/styles.css:75-94). The `.slider-thumb.touch-hit-area::before` override the Slider comment describes does not exist in Slider.vue.

**Wave shape.** Delete the dead utility (the real floors are `data-control-target` in utilities/responsive.css plus the per-atom rules) and replace the computed-style target-size gate with one that hit-tests `elementFromPoint` at the rect corners.

### A11Y-8 — The dock's pinned (latched-open) state has no keyboard path

**MINOR**

**Mechanism.** The state machine's only interactive transition into `pinned` is bound to `@click` on a bare `<div>` with no role, no tabindex and no keydown; the focus path deliberately reaches only the transient `hover` state, which the focusout handler schedules to collapse. So pointer users get a latch and keyboard users get a state that closes the moment they tab away — and if the consumer's `#collapsed` slot holds no focusable child, `focusin` never fires and there is no keyboard route into the dock at all.

**Evidence.** src/components/dock/composables/useDockState.ts:309-318 `onClickCollapsed()` is the sole collapsed→pinned transition; :287-294 `onFocusIn()` sets only `state.value = "hover"`; :296-305 `onFocusOut()` calls `scheduleCollapse()`. The returned API (:438-452) exposes no `pin`. Wiring: src/components/dock/GlassDock.vue:381-383 `<div … @click="onClickCollapsed">` — no role, no tabindex, no @keydown.

**Wave shape.** Give the collapsed pane a real activatable element (button semantics or Enter/Space handling) so the pin is reachable by keyboard, or expose pin/unpin on the public dock API for the consumer to bind.

### A11Y-9 — reka-ui 2.10.1 `VisuallyHidden` always emits aria-hidden="true", silencing ToastAnnounce — glass-ui's compensating live region will become a double-announce on upgrade

**OBSERVATION**

**Mechanism.** A library-local a11y patch was written against an assumption about the vendor primitive that was never verified against vendor source. The Toaster comment asserts reka's viewport "carries role=region but NOT aria-live, so a screen reader gets… no announce-on-toast" — but reka DOES ship a per-toast `role="alert"` announcer; it is merely broken today because VisuallyHidden hard-codes aria-hidden. glass-ui's viewport aria-live is therefore load-bearing by accident, and the day reka fixes VisuallyHidden every toast announces twice.

**Evidence.** node_modules/reka-ui/src/VisuallyHidden/VisuallyHidden.vue:19 — `:aria-hidden="feature === 'focusable' || feature === 'fully-hidden' ? 'true' : undefined"` (both branches yield 'true'); confirmed in the shipped build at node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js. node_modules/reka-ui/src/Toast/ToastRootImpl.vue:181-184 renders `<ToastAnnounce role="alert" :aria-live="…">`, and ToastAnnounce.vue:30 wraps it in `<VisuallyHidden feature="fully-hidden">`. glass-ui's compensation: src/components/toast/Toaster.vue:121-135 (comment + `aria-live="polite" aria-atomic="false"` on ToastViewport). reka version 2.10.1.

**Wave shape.** Pin the assumption to a test that reads the rendered announcer's aria-hidden, so a reka bump that restores the vendor announcer trips the gate instead of shipping a double-announce.

---

## DOC AND CANON DRIFT — where shipped documentation lies about the code at HEAD (0371836d)

_claude-opus-5[1m]_

### DOC-1 — README's primary usage example imports two symbols that do not exist anywhere in the library

**BLOCKER**

**Mechanism.** The README is the only consumer-facing doc most people read, and nothing in the repo resolves its import specifiers against the export map. The library's own test suite already records both symbols as retired (tests/public-surface.spec.ts:59 "MultiSelect + the Combobox wrapper family retired"), and the keyboard registry's public function was renamed to useRegisteredShortcuts — but README, src/index.ts's header comment, and the test file's own prose all still carry the dead names. The class: renames land in code + gates, never in the README, because no gate parses the README.

**Evidence.** README.md:19 `import { useKeyboardShortcuts, registerShortcut } from "@mkbabb/glass-ui/keyboard";` — the `/keyboard` subpath exports exactly {RegisteredShortcut, ShortcutCombo, ShortcutEventType, ShortcutOptions, formatCombo, formatComboParts, isMac, registerShortcut, useRegisteredShortcuts}. Actual symbol: src/composables/keyboard/useKeyboardShortcuts.ts:285 `export function useRegisteredShortcuts()`. `useKeyboardShortcuts` appears in ZERO export statements repo-wide. README.md:21 `import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";` — `/forms` exports {ControlSize, Input, InputProps, Textarea, TextareaProps, TextareaResize, UseUserInvalidAriaOptions, UseUserInvalidAriaReturn, useUserInvalidAria}; `Combobox` is not a component anywhere (`ls src/components | grep -i combo` → empty). Both lies repeat verbatim at README.md:120 and README.md:122, and again at DESIGN.md:1521. src/index.ts:30 repeats `useKeyboardShortcuts, registerShortcut, @mkbabb/glass-ui/keyboard`. Harness output: `SYM-MISS README.md:19 "useKeyboardShortcuts" not exported by "@mkbabb/glass-ui/keyboard" (NOWHERE)`.

**Wave shape.** A wave that adds a doc-example gate: extract every `import {...} from "@mkbabb/glass-ui..."` from README.md/DESIGN.md/MIGRATION.md/docs/**, resolve the specifier through package.json exports and each name through the emitted .d.ts, fail the build on any miss — then fix the four README lines it reds.

### DOC-2 — DESIGN.md's z-index table is wrong on the six highest rungs — a consumer stacking against it lands under the modal, not over it

**BLOCKER**

**Mechanism.** The z-scale was re-based (top rungs lifted from the 60–100 band to the 120–160 band) and DESIGN.md's mirror table was never re-derived. There is no gate reading it. This is the most directly consumer-breaking number drift in the repo because the whole point of publishing a z table is so consumers can place their own layers between the library's.

**Evidence.** DESIGN.md:346-351 claims `--z-hovercard` 60, `--z-tooltip` 60, `--z-popover` 70, `--z-modal` 80, `--z-fullscreen` 90, `--z-toast` 100. src/styles/tokens/scheme-motion.css:221-226 declares `--z-hovercard: 120; --z-tooltip: 120; --z-popover: 130; --z-modal: 140; --z-fullscreen: 150; --z-toast: 160;`. Six of sixteen documented rows are wrong. DESIGN.md:353 documents `--z-debug: 99999` — `grep -rn "z-debug" src/` returns nothing. Two real tokens are undocumented: `--z-behind: -10` (scheme-motion.css:212) and `--z-toggle: 999` (:227). Concrete failure: a consumer reads "modal = 80" and puts a custom takeover at `z-index: 90`; the real DialogContent sits at 140 and covers it.

**Wave shape.** A wave that generates the DESIGN.md z-index table from tokens/scheme-motion.css at build time (or asserts equality in a test the way tests/styles/radius-role-canon.test.ts already does for radius), and re-emits the six wrong rows plus the two missing ones.

### DOC-3 — DESIGN.md's glass-tier table lies about every blur radius and every saturate factor, and MIGRATION.md at HEAD states the opposite

**BLOCKER**

**Mechanism.** The blur ladder was collapsed to three magnitudes (1/7/11px) and the saturate register renamed to `--glass-saturate-{tier}` with new values; MIGRATION.md's freshest section (§8.0.0) records the new ontology correctly because migration notes are written at cut time, but DESIGN.md — the doc that presents itself as the design language of record — still ships the pre-collapse table. Two documents the repo ships now assert mutually exclusive facts about the same five tokens, with no arbiter.

**Evidence.** DESIGN.md:511-515 claims wash `blur(1px) saturate(1.05)`, quiet `blur(3px)`, resting `blur(12px) saturate(1.05)`, floating `blur(16px) saturate(1.4)`, overlay `blur(24px) saturate(1.5)`. src/styles/tokens/glass.css:149-160 declares wash 1px, quiet 7px, resting 7px, floating 11px, overlay 11px; :188-192 declares saturate wash 1.4, quiet 1.4, resting 1.4, floating 1.6, overlay 1.6. MIGRATION.md:76-80 states the correct current ontology verbatim: "FIVE calm role recipes ... across THREE distinct standard magnitudes (`1`/`7`/`11px`)" and "the per-role saturate values (`1.4`/`1.6`)". DESIGN.md repeats the stale numbers twice more: :533 ("`1` / `3` / `12` / `16` / `24` px") and :546 ("<Surface> ... 65% background opacity + 12 px backdrop-blur + 1.05 saturation"). Separately DESIGN.md:524/532/535 documents `--glass-blur-dock` as a live consumer-overridable token; src/styles/tokens/glass.css:161-162 and :220 declare the whole `--glass-blur-dock` / `--glass-saturate-dock` chain RETIRED, and DESIGN.md:524/535's "`--glass-bg-dock` (32 % card opacity)" contradicts glass.css:249 `--glass-opacity-dock: 0.50`.

**Wave shape.** A wave that deletes DESIGN.md's duplicated glass numbers and re-points §Glass Surfaces at tokens/glass.css as the single source (or asserts the table against it), removing the DESIGN-vs-MIGRATION contradiction in one direction.

### DOC-4 — DESIGN.md's canonical spring table is wrong on all four damping ratios, all three overshoot figures, and quotes linear() payloads that no longer exist

**BLOCKER**

**Mechanism.** scheme-spring.css is GENERATED — scripts/regen-spring-tokens.mjs derives every `linear()` curve and settle clock from springPresets.ts. DESIGN.md holds a hand-copied snapshot of that generated output with no regen hook, so every retune since the generator landed has silently orphaned the doc. The generator's header even says "edit the PRESETS table, re-run, commit" — the doc is simply not on that list. §L2 also contradicts itself: the table claims bouncy ~20% overshoot while line 82 asserts the invariant caps overshoot at ≤10%.

**Evidence.** DESIGN.md:76-80 claims `--spring-smooth` ζ=1.0 / 0% overshoot, `--spring-snappy` ζ=0.65 / ~7%, `--spring-bouncy` ζ=0.45 / ~20%, `--spring-gentle` ζ=0.85. src/composables/motion/spring/springPresets.ts:73-101 declares smooth {response 0.58, dampingFraction 0.8}, snappy {0.48, 0.74}, bouncy {0.6, 0.6}, gentle {0.82, 1.0} — and :71 states "gentle ζ stays exactly 1.0". Measured from the emitted curves in src/styles/tokens/scheme-spring.css: snappy peaks at 1.03153 (3.2%, not ~7%), bouncy peaks at 1.09474 (9.5%, not ~20%). DESIGN.md:282-311 quotes 25-stop percentage-free `linear(0, 0.0974, 0.2816, …)` strings; scheme-spring.css:104-107 emits 49-stop percentage-bearing `linear(0, 0.00287 2.041%, 0.01102 4.082%, …)` — no overlap. docs/canon/motion-system.md:17 independently states smooth is "ζ=0.80", directly contradicting DESIGN.md:279 "ζ=1.0, critically damped". DESIGN.md:66's response figures (tap 0.35s, sheet 0.5s) match no row (press is 0.2, panel 0.4).

**Wave shape.** A wave that makes scripts/regen-spring-tokens.mjs also emit the DESIGN.md §L2 + §Easing spring blocks (or a test that parses them against SPRING_PRESETS), so a preset retune can never again leave the doc behind.

### DOC-5 — DESIGN.md documents ten retired components and composables as the current API, including a whole Dock components table whose every trigger row was folded away at 5.0.0

**BLOCKER**

**Mechanism.** Retirements are recorded meticulously in MIGRATION.md and CHANGELOG.md (which are release artefacts) and enforced in tests/public-surface.spec.ts, but DESIGN.md is treated as prose and never swept. The result: the repo simultaneously ships an accurate removal ledger and an inaccurate API reference, and the API reference is the one that reads like documentation.

**Evidence.** DESIGN.md:992-994 documents `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger` as the dock's components. `/dock` exports {DockControl, DockTrigger, DockSeparator, DockLayer, DockLayerGroup, GlassDock, DockCrossfade, DockBackgroundToggle, …} — none of the three. src/components/dock/index.ts:18-19 records the fold, and CHANGELOG.md:223-230 carries a dated CORRECTION naming exactly these symbols as a 5.0.0 member break. DESIGN.md:1421-1422 documents `Sheet`/`SheetContent` and `HoverCard`/`HoverCardContent` — src/index.ts:112 "`ui/sheet` retired", src/index.ts:99-101 "`ui/hover-card` retired … fold onto ONE `Popover`"; neither name resolves on any subpath. DESIGN.md:1489/1492/1500/1503 list `useKeyboardShortcuts`, `useStaggerReveal`, `useGlassRenderer`, `useSortable` in the composables registry: the first three are absent from the public surface (`useStaggerReveal` was replaced by a view()-timeline CSS mechanism per src/styles/scroll-driven.css:63; `useGlassRenderer` is marked retired at src/composables/glass/index.ts:1) and `useSortable` is private to src/components/sortable-list/composables/. DESIGN.md:70 and :107 name `useSpringOrchestrator` as the composable carrying press release — that identifier appears nowhere in src. DESIGN.md:1021 documents a `density="compact|comfortable|spacious"` GlassDock prop; the actual prop is `size?: DockSize` = "sm"|"md"|"lg"|"xl" (src/components/dock/composables/useDockShellProps.ts:9,70), and DESIGN.md:1019's `wrap` prop is really `overflow="wrap"` (:78).

**Wave shape.** A wave that sweeps DESIGN.md against the generated export map — every backticked PascalCase component and `use*` composable must resolve on some subpath or be marked retired — and deletes/rewrites the Dock components table, the Overlays table, and the Composables registry.

### DOC-6 — ~40 CSS custom properties documented in DESIGN.md as consumer-tunable knobs are never declared anywhere in src

**MAJOR**

**Mechanism.** DESIGN.md's token tables are hand-maintained mirrors of tokens that get renamed, excised, or never landed. A consumer following the doc writes an override for a property nothing reads — silent no-op, no error, no warning. The scale (~40) shows this is not a stale row here and there but an unmaintained surface.

**Evidence.** Strict scan (declarations only, comments stripped, 1064 declared properties in src): 40+ backticked tokens in DESIGN.md are undeclared. Named exemplars with source proof: `--duration-linger` (DESIGN.md:265, in a table headed "Eight timings" — grep across src returns nothing; the real block at tokens/scheme-motion.css:82-113 has 7 base rungs plus `--duration-control: 0.12s` and `--duration-metal: 6s`, neither documented). `--duration-shimmer-slow` (DESIGN.md:267) — src/styles/theme/literals.css:34 says verbatim "`--duration-shimmer-slow` (8s) was excised." `--duration-popup-swap` (DESIGN.md:269) — absent. `--shadow-xs` (DESIGN.md:444) and the entire "Uniform-cast shadow" subsection's `--shadow-uniform` (DESIGN.md:455-458, including a `--shadow-dock-override: var(--shadow-uniform)` recipe) — both absent from tokens/shadow.css. `--popover-offset` (6px) and `--popover-viewport-pad` (8px) at DESIGN.md:1426 — absent. Six of the fifteen rows in the §16 TIMELINE table are fictional: `--timeline-scrubber-height`, `--timeline-segmented-height`, `--timeline-segment-gradient-{ping,download,upload,jitter}` (DESIGN.md:1352-1365) — while the six real tokens `--timeline-dot-{fill,blur,ring,tint-current,tint-completed,check-color}` (tokens/scale-paper.css:313-318) appear nowhere in the doc, and DESIGN.md:248 promises `--timeline-dot-stroke` which shipped as `--timeline-dot-ring`. All four `--dock-density-*` names (DESIGN.md:1057-1060) are read-with-fallback only, never declared. `--track-bg` (DESIGN.md:1195) was cut at HEAD (commit abb1eba2 "typed track seam, no generic --track-bg").

**Wave shape.** A wave that adds a token-existence gate over DESIGN.md (every backticked `--x` must be declared in src or sit in an explicit REMOVED ledger row like the §8.0 radius block already does), then strikes the ~40 phantom rows.

### DOC-7 — The repo's doc-canon enforcement seam is dead code — zero importers — and exactly one of 200 test files reads any root doc

**MAJOR**

**Mechanism.** This is the root mechanism behind DOC-1 through DOC-6. scripts/lib/canon-doc.mjs was built as the single registry of canon homes with a fail-closed `auditCanonHomes("content")` floor whose stated purpose is to stop "the C5 close-class lie: strip the marker, leave a stub". Nothing imports it. The single doc-coupled test in the suite covers one section of one doc — and that section (radius) is measurably the most accurate large table in DESIGN.md. The control proves the causation: gated doc = correct, ungated doc = rotted.

**Evidence.** `grep -rn "canon-doc|canonDoc|CANON_HOMES|auditCanonHomes" --include=*.{ts,mjs,js,json} . --exclude-dir={node_modules,dist,docs}` returns only scripts/lib/canon-doc.mjs's own lines — zero importers, despite its header at :3 claiming "ONE seam naming every canon-doc home, so the ~16 CLAUDE-reading gates re-point THROUGH it". `grep -rln "DESIGN.md" tests/` → tests/styles/radius-role-canon.test.ts only (1 of 200 test files). `grep -rln "README.md|MIGRATION.md|CHANGELOG.md" tests/` → nothing. That one gate passes (`npx vitest run tests/styles/radius-role-canon.test.ts` → 40 passed) and its scope is stated at its :16 — "CANON TRUTH — the executable inventory and the DESIGN.md human table agree" — for radius only. Every DESIGN.md table outside that scope (springs, glass tiers, z-index, durations, timeline tokens, dock components, overlays, composables) is wrong per DOC-2 through DOC-6.

**Wave shape.** A wave that either wires canon-doc.mjs into verify:governed (or deletes it as dead weight) and generalises the radius test's table-vs-source pattern to the other DESIGN.md tables — one gate per table, the shape already proven.

### DOC-8 — MIGRATION.md's newest section omits the two export removals actually made since v7.0.0, while an older section still hands consumers a now-dead import

**MAJOR**

**Mechanism.** MIGRATION sections are written per cut, so an unreleased in-flight cut (§8.0.0, against package.json still at 7.0.0) captures whatever the author remembered rather than a diff of the export map. Nothing computes the actual `package.json exports` delta and asserts each removed key has a migration row — so removals made after the section was drafted leave no trace, and the superseded instruction in the older section is never revoked.

**Evidence.** HEAD package.json exports has 72 keys; v7.0.0 has 74. Diff: `removed since v7.0.0: [ './liquid-grid', './pulse' ]`, added: none. MIGRATION.md's `## 8.0.0` (lines 8-83, covering the track seam, the DPR overlay-blur arm, the immersive scrim, CommandDialog, and the blur ontology) mentions neither. Meanwhile MIGRATION.md:797 still instructs `→ import { LiquidGrid, DEFAULT_LIQUID_GRID_CONFIG } from "@mkbabb/glass-ui/liquid-grid"` and :676 calls liquid-grid "the KEEPER born-WebGPU grid viz — NOT in the delete set"; `grep -rn "LiquidGrid" src/` returns nothing and `./liquid-grid` is not an exports key. CHANGELOG.md has no 8.0.0 section at all, so the two docs disagree about whether an 8.0.0 exists. (Contrast: the §5.0.0 and §7.0.0 ledgers ARE exact — CHANGELOG.md:195 "20 removed, 7 added" reproduces the v4.2.0→v5.0.0 tag diff key-for-key, and MIGRATION.md:87 "82 to 74 export keys" matches v6.0.0=82 / v7.0.0=74 exactly.)

**Wave shape.** A wave that generates the per-version export delta from the tag history and asserts every removed key has a MIGRATION row, so a cut cannot ship with an unrecorded removal or a live instruction pointing at a deleted subpath.

### DOC-9 — docs/canon — the set README names as "the authoritative canon" — carries wrong constants, a retired-component example, and a superseded formula

**MAJOR**

**Mechanism.** The canon docs were written as a redistribution of prose from a deleted CLAUDE.md and inherited its snapshot values; the redistribution had a presence/content gate (canon-doc.mjs's auditCanonHomes) that was never wired up (DOC-7), so "content-real" was never checked against source. These are shorter and mostly right, which makes the specific wrong numbers more dangerous — the doc reads authoritative.

**Evidence.** docs/canon/glass-system.md:26 states `--glass-opacity-dock` is "(0.42, mode-INVARIANT)"; src/styles/tokens/glass.css:249 declares `--glass-opacity-dock: 0.50` (mode-invariance is correct — it is absent from dark-arm.css). docs/canon/glass-system.md:90 illustrates the surface axis with `<Sheet surface="opaque">` — Sheet is retired (src/index.ts:112) — and the very next sentence reads "Each example must name a prop the component actually declares." docs/canon/motion-system.md:27 documents the per-spring clock as generated by `t_s = -ln(0.02) / (ζ·ωₙ)`; src/styles/tokens/scheme-spring.css:131-135 states that formula was superseded by a numeric 2%-band settle because it "UNDER-estimates near-critical/critical ζ: … gentle ζ=1.0 analytic 0.51s vs numeric 0.76s." docs/canon/motion-system.md:69 names DOCK_SPRING's readers as "`dockMorphContext.ts` + `useLayerTransition`" — neither exists (`ls src/components/dock/composables/` has dockMorphMeasure.ts, no dockMorphContext.ts; `useLayerTransition` appears nowhere in src); the actual reader is src/components/dock/DockCrossfade.vue:6. DESIGN.md:1775 claims docs/canon/structure.md is a component catalog "generated from disk" — it is a hand-written 19-line tree with no catalog. DESIGN.md:1779 sends consumers to the canon for "the critical/deferred CSS split", which docs/canon/exports-and-subpaths.md:30 says is retired and which was removed from exports at 5.0.0.

**Wave shape.** A wave that wires auditCanonHomes into verify:governed with a value-level arm (every backticked token/identifier/path in docs/canon must resolve in src) and corrects the four cited claims.

### DOC-10 — docs/consumer-evidence/ — the corpus that justifies each public API's existence — cites the pre-restructure source tree wholesale: 29 dead paths and 4 dead subpath imports across 25 files

**MAJOR**

**Mechanism.** The BI/BH restructure flattened `src/components/custom/*` → `src/components/*` and deleted `src/subpaths/*.ts`; the evidence corpus records the paths it audited at the time and was never re-pointed. Because these files are the recorded justification for keeping public API, a reader cannot verify any of them — and three of them hand out import statements for subpaths that were removed from package.json at 7.0.0.

**Evidence.** Path checker over docs/consumer-evidence: 29 missing path references across the 25 files. Exemplars: docs/consumer-evidence/glass-panel.md:5 `src/subpaths/glass-panel.ts`, :6 `src/composables/glass/useGlassRenderer.ts`, :101 `src/components/custom/glass-panel/GlassPanel.vue`; handmark.md:16-17 `src/subpaths/underline.ts` / `src/subpaths/handmark.ts`; labeled-field-action-slot.md:5 `src/components/custom/labeled-field/LabeledField.vue`; use-glass-backdrop-luminance.md:18 `src/components/custom/dock/GlassDock.vue`; curl-fbm.md:40-41 `src/components/liquid-grid/shaders/*`. Import checker: docs/consumer-evidence/metrics.md:90-94 emits `SPEC-MISS` for `@mkbabb/glass-ui/metric-cell`, `/metric-stack`, `/metric-badge` and `/pulse` (none are exports keys; the first three were removed at 7.0.0 per MIGRATION.md:88-90, `./pulse` after v7.0.0) plus `SYM-MISS ChassisDivider` (removed at 7.0.0 per MIGRATION.md:102).

**Wave shape.** A wave that runs the path+import checker over docs/** as a gate and either re-points or retires docs/consumer-evidence, so an evidence file can never outlive the code it points at.

### DOC-11 — README points at a DESIGN.md anchor and a DESIGN.md role that do not exist, and cites a retired component twice

**MAJOR**

**Mechanism.** README's cross-references were written when DESIGN.md had a storybook index; the index moved to demo/stories/manifest.ts and DESIGN.md became a pure design-language document, but the two README pointers were never updated. Same rename-without-doc-sweep class as DOC-1.

**Evidence.** README.md:79 lists "[`DESIGN.md`](./DESIGN.md) — the storybook category index" and README.md:92 says "See `DESIGN.md#storybook-demo` for the full category index." DESIGN.md has no storybook heading — the full `^#{1,4} ` heading list runs Philosophy → Liquid Glass → Token Architecture → … → Reference, and `grep -in storybook DESIGN.md` yields only two incidental prose hits (:1387, :1781); the `#storybook-demo` fragment resolves to nothing. DESIGN.md:1781 itself says the storybook lives at `demo/stories/` + `demo/stories/manifest.ts`. README.md:92 also describes the configurator as "A dismissible right-side `Sheet`" and README.md:189 lists "Dialog / Sheet / Popover / DropdownMenu" as the tw-animate-css consumers — Sheet is retired (src/index.ts:112); docs/canon/dependencies.md:31 states the same list correctly without Sheet.

**Wave shape.** A wave that link-checks README's intra-repo anchors and cross-references (heading fragments must resolve in the target file) and drops the two Sheet mentions.

### DOC-12 — The root barrel is a wildcard re-export, so two undocumented symbols joined the public API and the only gate that would notice is RED at HEAD

**MAJOR**

**Mechanism.** src/index.ts:163 does `export * from "./composables/glass"`, so anything a sub-barrel adds silently becomes semver-bearing public API. The sole guard is a hand-maintained literal list in tests/public-surface.spec.ts, and it is currently failing — meaning the public surface has drifted past both its gate and every doc, and the drift is invisible to `npm run build`.

**Evidence.** `npx vitest run` (399 files, 109s) → `Test Files 2 failed | 397 passed`, `Tests 2 failed | 2612 passed`. Both failures are tests/public-surface.spec.ts:483 `expected [ 'AURORA_CURSOR_RADIUS', …(157) ] to deeply equal [ …(155) ]`, diff shows `+ "supportsBackdropRefract"`. src/composables/glass/index.ts:38 `export { armGlassRefract, supportsBackdropRefract } from "./supportsBackdropRefract";` reaches the root via src/index.ts:163 `export * from "./composables/glass";`. Neither symbol appears in README.md, DESIGN.md, MIGRATION.md, CHANGELOG.md, or docs/canon. The working-tree diff to tests/public-surface.spec.ts is a mechanical `it` → `governedInvariant` conversion that does not touch the expected list, so the RED is at committed HEAD.

**Wave shape.** A wave that replaces the root barrel's `export *` with explicit named re-exports (so a sub-barrel addition cannot auto-publish), reconciles the surface list, and gets public-surface.spec green.

### DOC-13 — Two forked copies of the same canon ship side by side (docs/design vs the docs/precepts submodule) and have diverged on live glass-ui constants

**MINOR**

**Mechanism.** docs/precepts is a git submodule of a shared cross-repo precepts repo; docs/design is an in-repo fork of the same four files. Both are on disk, both are reachable, README links into the submodule copy. Neither is marked as the authority, and the submodule copy has fallen behind on glass-ui-specific numbers that the in-repo copy updated.

**Evidence.** `.gitmodules` maps docs/precepts → git@github.com:mkbabb/precepts.git. Four filename pairs exist in both trees with different content: tunable-anim.md (162 vs 147 ln), motion-canon.md (262 vs 254), design-idioms.md (509 vs 491), affordance-map.md (159 vs 159, different md5). `diff docs/precepts/motion-canon.md docs/design/motion-canon.md`: the submodule copy at :196 says `DOCK_SPRING (0.32, 0.7)` and :199 `DRAWER_SNAP (0.4, 0.82)`; docs/design/motion-canon.md says (0.35, 0.82) and (0.32, 0.8). Source: src/components/dock/constants.ts:11-14 derives DOCK_SPRING from `springPreset("dock")` = {response 0.35, dampingFraction 0.82} (springPresets.ts:109-111); src/components/drawer/constants.ts:11 `DRAWER_SNAP = { response: 0.32, dampingFraction: 0.8 }`. The in-repo fork is right; the submodule README links from CONTRIBUTING.md:47 and README.md:194 is wrong. docs/precepts also carries 12 broken src/script path references (e.g. instructions/LESSONS-LEARNED.md:473 `src/styles/dock.css`, motion-canon.md:246 `src/composables/motion/useLiquidFlex.ts` — the file is at motion/spring/useLiquidFlex.ts).

**Wave shape.** A wave that picks one home for the four duplicated canon files — repo-local for glass-ui-specific constants, submodule for cross-repo precepts — and deletes the loser so no reader can land on the stale fork.

### DOC-14 — In-source comments assert numeric identities with registers that have since drifted — 94 backticked token references in src comments name properties that are neither declared nor read

**MINOR**

**Mechanism.** Comments here carry load-bearing rationale ("this literal IS that register"), and the retune touches the register while the literal and its comment stay frozen. Because the comment asserts the relationship rather than the code deriving it, the drift is invisible to every gate. The 94-count shows the comment layer has the same rot profile as DESIGN.md — many are honest retirement notes, but the value-asserting ones are actively wrong.

**Evidence.** src/composables/motion/pointer/usePointerVelocityField.ts:115 documents `attractorResponse` as "default 0.32 — the DOCK_SPRING register"; the literal at :243 is `?? 0.32` while DOCK_SPRING.response is `springPreset("dock").response` = 0.35 (src/components/dock/constants.ts:12, springPresets.ts:110) — the value stopped tracking the register it claims to be. src/styles/tokens/scheme-spring.css:98 states "the hover lift is the restrained `--scale-hover-btn` = 1.05, not the 1.08 `--scale-hover`" — `grep -rn scale-hover-btn src/` returns only that comment line; the token has no declaration and no reader, so no button hover resolves to 1.05. Comment scan (declaration-and-var-read set, comments stripped): 94 distinct file+token pairs where a src comment backticks a `--property` that is never declared and never read, spanning 40 files. Related: DESIGN.md:99 and :622 document `--scale-press-dock` as "(0.92) — deeper press"; src/styles/tokens/scale-paper.css:24 declares `--scale-press-dock: var(--scale-press)` (0.96) and :19-21 explicitly says "NOT a deeper 0.92 (a second magic press value with no documented rationale)" — the source comment argues against the number the design doc still publishes.

**Wave shape.** A wave that derives the asserted constants instead of restating them (usePointerVelocityField reads DOCK_SPRING.response; delete the phantom --scale-hover-btn claim) and adds a lint pass flagging src comments that backtick an undeclared custom property.
