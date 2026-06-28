# BH TRANCHE — SYNTHESIS PASS 1 (integrated plan basis)

Repo: `/Users/mkbabb/Programming/glass-ui` @ branch `tranche/BG`, version **4.2.0** → BH target **5.0.0**.
Synthesizes the 7 research lanes (α junk · β legacy · γ src · δ demo · ε docs · ζ backbone · η web-SOTA · θ prompts).
Framing locks (NOT re-litigated): **CLAUDE.md is DELETED** (after redistribution), **clean-break 5.0.0** export reshape, **interleave with the live BG tranche**.

---

## 1. EXECUTIVE SUMMARY — the gestalt of the cleanup

The repo is **disciplined, not dirty**. Lane β confirms the legacy-excision discipline genuinely held: every clean-break / RETIRED / DEFINITION-ABSENT claim spot-verifies TRUE on disk, the 565 `fallback`/132 `shim` hits are ~99% befitting substrate/`@supports`/PRM/SSR paths, and `TODO`/`FIXME`/`@deprecated` in `src/` is **0**. The cleanup is therefore not a bug-hunt; it is a **structural de-indirection + de-monolithing** pass plus one **doc-architecture migration**.

The work concentrates in five convergent findings every lane independently surfaced:

1. **Three stacked redundancy layers in the export surface** (η + γ + ζ + ε + θ): `src/subpaths/` = **79 one-line mirror barrels**, `src/api/` = **854L** discovery aggregator with **1 demo consumer**, plus **7 trivial flat `src/*.ts` barrels**. All exist only to feed the build entry map. The 5.0.0 clean break collapses them to ONE entry-set source of truth (a glob over the real colocated `*/index.ts` barrels), regenerating `package.json` exports from that glob.
2. **16 god-modules >500L** (γ + η + θ), of which **3 are single shader strings** (`metaball.wgsl/frag`, `flow-field.glsl`) that must be **EXEMPTED, not split** — the no-god-module ratchet needs a `*.{wgsl,glsl,frag,vert}.ts` exemption. The non-shader leaders (GlassDock 711, createCanvasLifecycle 695, useWebGPUCanvas 606, useDockFission 604, CarouselContent 577 unlisted) carve by cohesion.
3. **CLAUDE.md (941L) is a live-contract map fused to a wave-note archive** (α + β + γ + ε + ζ + θ). ~**18 `proof:*` gates `readFileSync` it and assert on its content** — they ENOENT-break on deletion unless re-homed first. Deletion is safe ONLY after redistributing live contracts to `docs/canon/` + per-component READMEs + the precepts submodule, AND re-homing the 18 gates. This is the load-bearing sequencing constraint of the whole tranche.
4. **One real payload bug** (ζ): `@lucide/vue` is **BUNDLED into dist** because `libraryExternal` lists the dead `lucide-vue-next` + `vaul-vue` instead of the live `@lucide/vue`. 1-line fix; every consumer currently double-loads lucide. Plus the **value.js `^0.13.0 || ^1.0.0` straddle** (β + ζ) that directly contradicts CLAUDE.md's own "the `^0.13.0` leg retired, no legacy straddle" claim.
5. **BG is the gating reality** (ε + δ + all): BG is a LOCKED ~110-wave tranche whose write-set spans the **entire** `src/` + `demo/` + `scripts/gates.mjs` + `src/index.ts`, and **15 BG specs APPEND to CLAUDE.md**. BH's file-moving / export / gate / CLAUDE-delete bands MUST sequence after the specific BG waves close; only pure-docs / prompt-authoring / new-file bands run truly concurrently.

Backbone currency is a non-issue (ζ + η): reka 2.10, tailwind 4.3.1, vite 8/Rolldown 1.0, ts 6.0, vitest 4.1.9, vueuse 14 are all live-latest. shadcn-vue `update` is correctly NOT a maintenance path (our glass diff is ~100% drift); the real upstream-track is reka's semver. The SOTA literature (η) validates the house idioms to KEEP: `createStrictContext` DI, hand-rolled `cn()` deduplicator, feature-dir colocation, token-first global Tailwind cascade.

---

## 2. PROPOSED BAND STRUCTURE

Eight bands. Each: **goal · concrete moves · evidence-backed hard gate · ~wave count · dependency ordering.** Bands are numbered for reference, not strict execution order (the dependency DAG in §4 governs sequencing).

### B0 — REPO HYGIENE / SCRATCH-SWEEP (concurrent-with-BG; FIRST; zero src/demo/scripts write)
- **Goal:** close the gitignore gaps + sweep scratch; zero junk leakage.
- **Moves** (lane α §10–11): `git rm --cached test-results/` (untrack the 3 accidentally-tracked Playwright artefacts: `.last-run.json` + 2 `error-context.md`); `git clean -fdX` the 99 root images (28MB, gitignored, safe — DRY-RUN `-ndX` first, keep force-track carve-outs lines 7–18 ahead of any `*.png` rule); `rm -rf .playwright .tmp` (4.2MB + 12K scratch); delete `.browserslistrc` (DEAD — no browserslist/autoprefixer dep, Tailwind v4 ignores it); `git mv BD-CONTINUATION-PROMPT.md docs/tranches/BD/`; append `.gitignore` block (`.tmp/`, `.playwright/`, `test-results/`); re-target `.githooks/commit-msg` off the stale hardcoded `--tranche=BB` to env-driven.
- **Hard gate:** `git status` clean of scratch + `git ls-files | rg 'test-results/|\.browserslistrc' = 0` + a dry-run-preview artefact for the `clean -fdX`.
- **Waves:** 1.
- **Order:** truly concurrent with BG (touches nothing BG writes; BG's `D .retired-classes.txt` is BG's call — do NOT touch).

### B1 — LEGACY / FALLBACK EXCISION + PAYLOAD FIX (mostly concurrent; build-config + deps)
- **Goal:** excise the genuinely-illegitimate legacy; fix the lucide payload bug.
- **Moves:**
  - **B1a (run FIRST, concurrent, high-ROI):** `vite.library.ts:60-74` `libraryExternal` — drop dead `lucide-vue-next` + `vaul-vue`, **add `@lucide/vue`** (+ `perfect-freehand` if it leaks); re-baseline `profile:budget` downward (ζ §3.3).
  - **B1b (deps de-straddle):** `package.json:1058,1096` value.js `^0.13.0 || ^1.0.0` → the single 5.0.0 floor (`^1.0.0` or `^1.2.0` — pin to whatever keyframes-5.x transitively wants; OPEN-Q §5). Typecheck the 9 import sites against the 1.x types before committing (β risk).
  - **B1c (CONSUME interims, consume-and-delete pending upstream):** `useDragMorph.ts:281` snap-resolution interim — **verify published kf 5.x `DragOptions.snap` exists** (the "past 4.3.0" wait is likely already met at the pinned `^5.x`); if so EXCISE-NOW, else fold into the B7 by-name map. `useBorderSpectrum.ts:44` `interimStops` + `spectrum-walk.ts` value.js-0.13 CONSUME marker — dies with B1b's de-straddle + the value.js `oklchSpectrum` republish. `useVizChoreography.ts:78` republish-gated idle loop — track in B7.
- **Hard gate:** `dist`-grep shows NO `createLucideIcon-*`/lucide-in-vendor (B1a); `proof:peer-conformance` / `proof:constellation-spine` re-run NON-vacuously GREEN on the de-straddled manifest (B1b); each excised interim has green build + green affected tests (β COMPLETION criterion: deletion-proof, not grep).
- **Waves:** 2–3.
- **Order:** B1a + B1b concurrent NOW (BG touches no build config or deps). B1c CONSUME excisions gate on upstream-published-surface confirmation (§5 open-Q).

### B2 — SRC RESTRUCTURE → the 5.0.0 export surface (mostly sequence-after-BG)
- **Goal:** delete the four indirection layers, colocate, split god-modules, design the typed per-subpath 5.0.0 surface.
- **Moves** (γ + ζ + η):
  - **B2.0 (FIRST, concurrent):** demo `@glass` tsconfig+vite alias + one-shot codemod rewriting `../../../src/...` → `@glass/...`. Decouples the demo's hundreds of deep-relative-src imports (icon-chip ×40, button ×38, cn ×41) from src depth so later moves don't break them (γ §0 — the dominant restructure cost).
  - **B2.1 (concurrent):** DELETE `src/subpaths/` (79 files); rewrite `vite.library.ts` `libraryEntries` to glob the colocated `src/components/{ui,custom}/*/index.ts` + published composable-subtree barrels, with an explicit `EXPORT_NAME` override map for the name≠dir cases (`/pager`←`pager-dots`, `motion-core`, `canvas`, `dom`/`reactive`/`color`/`virtual`, `fourier-math`, …). **Harvest the full 79 subpath→sourceDir map from the one-liners BEFORE deleting.** Add `scripts/regen-exports.mjs` generating `package.json` exports + `typesVersions` from the glob (kills the hand-maintained ~90-key block).
  - **B2.2 (concurrent):** FOLD `src/api/` — delete both files (854L), migrate the 1 demo consumer (`foundations/paper-texture.vue`) onto owning subpaths, re-export `Surface`/`surfaceClass` from `/card` (the `ui/_shared` orphan home), drop the `./api` export key, ship the type→subpath migration map.
  - **B2.3 (concurrent):** relocate `src/types/html-attributes.d.ts` → `src/html-attributes.d.ts`; delete the 7 trivial flat barrels (entry map points at colocated `index.ts` directly); move `index`/`forms`/`tokens` (the genuine curation) → `src/entries/`.
  - **B2.4 (concurrent — non-dock, non-shader god-modules):** carve `createCanvasLifecycle.ts` (→ `lifecycle/scheduler.ts` + `visibility.ts`), `useWebGPUCanvas.ts` (→ `deviceAcquire.ts`), `useGlassBackdropLuminance.ts` (→ `backdropSample.ts`), `useBlobSatellites.ts`, `useGooDotMatrix.ts`, `SegmentedTabs.vue`, `PagerDots.vue`, `CarouselContent.vue` (UNLISTED 16th), `useBloomUp.ts` (overfitting-audit first). **Add the `*.{wgsl,glsl,frag,vert}.ts` shader-literal EXEMPTION to `proof:no-god-module`** (3 files are single cohesive shader strings).
  - **B2.5 (after BG dock waves WS2):** carve the dock god-modules — GlassDock.vue 711, useDockFission.ts 604, useDockContextSilhouette.ts 551.
  - **B2.6 (LAST — after full BG close):** colocate the ~11 component-EXCLUSIVE stylesheets + `dock/**` into their component dirs; KEEP `tokens/theme/typography/glass/utilities/menu/feedback-tone/dock-controls` GLOBAL; replace the wholesale `cpSync(src/styles)` with a lightningcss `bundle()` over an `index.css` whose `@import`s reach the colocated paths (preserves ordered cascade); re-point the ~8 `index.css`-path gates + the critical-partition manifest.
- **Hard gate:** `verify-export-types` + the `dist/<name>.js` set diff (intentional 5.0.0 renames folded into the new `proof:subpath-enumeration` baseline, NOT flagged as regression); `proof:no-god-module` GREEN with the shader exemption; the styles-colocation emits a **byte-equivalent `/styles` bundle** (the empty compiled-cascade diff is the no-delta proof); demo route-walk GREEN post-codemod.
- **Waves:** ~7 (B2.0–B2.6).
- **Order:** B2.0/B2.1/B2.2/B2.3/B2.4 concurrent-safe (BG touches none of subpaths/api/types/flat-barrels and = dock/styles/scroll for components); B2.5 after WS2; B2.6 LAST after BG closes; the export-map reshape (B2.1/B2.2) also waits behind the `src/index.ts` collision (WS4/WS7/WS10/WS12) — see §4.

### B3 — DEMO RESTRUCTURE (sequence-after BG WS4)
- **Goal:** per-component/per-story/per-category dirs; `_chassis` extirpation; manifest split; demo god-module splits; NO top-level `composables/`.
- **Moves** (lane δ):
  - **δ1 (BG-safe):** delete `_chassis/DemoFrame.vue` (DEAD, 0 real importers) + the dead `.demo-frame*`/`.story-cel` CSS (migrate the LIVE `.story-cels` rules into a colocated `chassis/page/` style); delete `StorySectionHeader.vue` (0 importers); fold `Code.vue` → `CodeBlock.vue` (both only `card.vue`).
  - **δ2 (BG-safe):** dissolve `demo/composables/` — `useStoryNavigation` → `chassis/`, `useContextualDockLayers` + `dock-layer-contexts.ts` → `shell/`.
  - **δ3/δ4 (BG-safe islands):** chassis-kit colocation (`stories/` flat root → `chassis/{page,hero,section,landing,showcase,code,play}/`, `story-hero.css` split); `layout/`→`shell/` dirize + carve `dock-nav.css`; fold `presets/` → `configurator/presets/`; fold orphaned `stories/aurora/` → `stories/substrates/aurora/`; eggs sub-dir colocation.
  - **δ5/δ6 (AFTER WS4):** split `manifest.ts` (1236L) → `chassis/manifest/{rows/<category>.ts, types, lazy, categories, landing, index}` AND change the glob `import.meta.glob("./*/*.vue")` → `./*/*/index.vue` **in the SAME wave as the first per-story-dir move** (the #1 gotcha — a per-story-DIR restructure silently renders `MissingStory`→null otherwise); per-story-dir moves; consume (do NOT re-split) BG WS4's god-module splits (liquid-playground, blob, AppShell, constellation, overview, card).
- **Hard gate:** a **runtime route-walk** (grep is insufficient — `MissingStory`→null is invisible to grep); every in-scope `scripts/proof-*.mjs` demo-path literal updated (`rg <oldpath> scripts/ = 0` + gate stays GREEN).
- **Waves:** ~6 (δ1–δ6).
- **Order:** δ1–δ4 concurrent NOW (BG-untouched islands); δ5/δ6 STRICTLY after BG WS4 (which itself owns "demo chassis consolidate · >500 splits · colocation-gate" — Lane δ is a RE-SHAPE of the post-WS4 tree, never a parallel fork).

### B4 — DOCS: CLAUDE.md deletion + redistribution + precepts extraction + slim (mixed)
- **Goal:** delete CLAUDE.md without silent contract loss; extract glass-ui design docs from the precepts submodule; prune consumer-evidence; slim CHANGELOG/DESIGN/MIGRATION.
- **Moves** (ε + α + γ + ζ):
  - **B4a (concurrent — pure docs):** archive `docs/constellation/` (stale, no gate reads) → `docs/archive/constellation/`; archive `docs/audits/runs/2026-06-03-glass-ui-self/`; refresh stale `docs/instructions/README.md` (claims only typecheck/build as proof cmds) → fold into `docs/canon/conventions.md` or `docs/README.md`; dedup the two `style-audit.md`; refresh `overfitting-audit.md`.
  - **B4b (concurrent — new-file writes):** author `docs/canon/` set (`structure.md`, `build-and-gates.md`, `conventions.md`, `dependencies.md`, `exports-and-subpaths.md` [BH REWRITES for 5.0.0], `consumer-wiring.md`, `design-axes.md`, `glass-system.md`, `motion-system.md`) from CLAUDE.md's LIVE cross-cutting contracts; author the **28 missing per-component READMEs** (`src/components/custom/<name>/README.md`, canonical-readme-shape; 22 exist) absorbing the per-component contracts — DRY: contract lives once beside the code. Author dock README **after WS2**.
  - **B4c (concurrent new files + sequenced gate re-points):** extract the 4 glass-ui-specific design docs (`design-idioms.md`, `motion-canon.md`, `tunable-anim.md`, `affordance-map.md`) from the **precepts SUBMODULE** into `docs/design/` as NEW repo-proper files; re-point the 12 precept-reading gates; issue a **cross-repo by-name ask to `mkbabb/precepts`** to delete the extracted docs upstream (NEVER an in-place submodule mutation — the inv-26 foreign-tree fence). Note: the task's premise "infra/ is glass-ui-specific" is **INVERTED** — `infra/` + `glossary/` are fourier/feedback-coder content, BASE-but-irrelevant; they STAY in the submodule, no extraction.
  - **B4d (concurrent — consumer-evidence policy):** prune ~25–30 of the 44 dead-to-gates evidence files (retired surfaces like `underline.md`, trivial like `is-mac.md`); add a `proof:consumer-evidence-live` forcing gate (every file referenced by a registered gate OR deleted). Register the gate in the single post-BG `gates.mjs` pass.
  - **B4e (sequenced):** slim CHANGELOG (267KB)/DESIGN (163KB)/MIGRATION (97KB) — per-version/per-topic split, archive pre-4.0 history, re-home `proof:design-md-current` + `proof:*-final` readers; reshape MIGRATION for the 5.0.0 by-name-ask map. Refresh public README (17KB, npm-facing + 6 gates) import examples for the 5.0.0 typed subpath surface.
  - **B4f (LAST BH act):** DELETE CLAUDE.md — after full BG close (15 specs append to it) AND after the 18 gates re-home (B5).
- **Hard gate:** post-delete, `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` (readFileSync sites) = 0; every redistributed contract has a live gate asserting against its NEW home (no contract un-gated); `proof:consumer-evidence-live` GREEN.
- **Waves:** ~6.
- **Order:** B4a/B4b/B4c-files/B4d concurrent NOW; B4c gate re-points + B4d gate registration batch into the post-BG `gates.mjs` pass; B4e sequenced with the export reshape (MIGRATION); B4f is the absolute LAST act.

### B5 — BACKBONE + BUILD-MECHANISM + GATE/SCRIPT CONSOLIDATION (mostly sequence-after-BG)
- **Goal:** verify currency (no bump); split the build god-modules; re-home the 18 CLAUDE-parsing gates; the high-ROI gate/script de-duplication.
- **Moves** (ζ + η):
  - **B5a (concurrent):** record the dependency-currency + shadcn-vue verdict ONCE in `docs/canon` (don't run `shadcn-vue update` — too-deep glass diff; keep `components.json` for `add`; fix `baseColor: "slate"` → warm or document as scaffold-only); split `vite.style-assets.ts` (566L god-module) → `style-fold` / `utility-emit` / `critical-split` sub-plugins.
  - **B5b (after BG gate-rows stabilize / append-safe data-file):** extract the 349-row table + prose notes out of `gates.mjs` (2489L) → `scripts/gates.manifest.mjs`; `gates.mjs` → ~300L runner. Behavior-preserving (`--list local|ci|release|full` byte-identical pre/post). PRESERVE the 3-aggregates-over-one-manifest orchestration (the correct pipeline shape).
  - **B5c (the gate re-home — after WS1/WS7/WS10/WS12 close gates.mjs):** re-home the ~18 CLAUDE-reading gates via a shared `scripts/lib/canon-doc.mjs` resolver (one seam names the canon homes; 18 gates re-point through it). 2 pure-parsers RETIRE/re-home whole: `proof:claude-structure-sync` (re-point §Structure parse → `docs/canon/structure.md`; split the untracked-png arm into `proof:visual-png-tracked`), `proof:doc-override-idiom` (re-home onto README.md alone). The ~16 doc-presence clauses re-point onto per-component READMEs / `docs/canon`.
  - **B5d (deferrable — large, optional):** the detector-kit (`scripts/lib/detect/`) factoring out the 164× duplicated comment-strip — migrate incrementally, each bite-gated; the gate-census band (retire closed-wave guards under a ≥2-live-contract bar). **Candidate to DEFER past BH** (§5 open-Q — 164-script blast radius vs BH scope).
- **Hard gate:** B5a — `dist`-grep clean (folded into B1a); B5b — `--list` byte-identical; B5c — `proof:gate-manifest-sound` GREEN + no gate `readFileSync`s a deleted doc; B5d — each migrated gate's own bite-test proves the swap preserved detection.
- **Waves:** ~4 (B5d optional).
- **Order:** B5a concurrent; B5b/B5c into the SINGLE post-BG `gates.mjs` pass (5-way contention point: BG-WS1/7/10/12 + BH-B5 + BH-B4d); B5d deferrable.

### B6 — THREE REUSABLE CORE PROMPTS (concurrent — docs only)
- **Goal:** land the reusable cleanup prompts as shared constellation tooling.
- **Moves** (lane θ Part C — full text drafted): `docs/precepts/instructions/prompts/{LEGACY-EXCISION,RESTRUCTURE-BACKEND,RESTRUCTURE-FRONTEND}.md` + a one-line pointer from `docs/precepts/instructions/README.md`. Each is a drop-in *Scope + Non-negotiables* payload for `AGENT_DISPATCH_TEMPLATE.md`, composing WITH (not duplicating) the existing edicts/overfitting-audit/STYLE corpus, carrying the live anti-pattern catalog by name (god-modules, `:deep()`→`:slotted`, `:global(.dark)` footgun, fail-explicit-vs-befitting, wave-archaeology comments). The prompts THEMSELVES obey STYLE.md.
- **Hard gate:** the prompts exist + are cross-linked; they cite the binding edicts by name; a self-consistency read (no STYLE.md banned-word violations).
- **Waves:** 1.
- **Order:** truly concurrent NOW (docs only). **Caveat:** `prompts/` lives in the precepts SUBMODULE (shared cross-repo) — same foreign-tree consideration as B4c; either author in the submodule via its own commit/PR or stage as a repo-local draft + cross-repo ask (§5 open-Q).

### B7 — CONSUMER-MIGRATION CROSS-REPO ASKS (the 5.0.0 break relay)
- **Goal:** the 5.0.0 clean break never silently strands a sibling (slides/speedtest); the foreign-tree fence is LITERAL — glass-ui edits ZERO sibling files, the by-name ask is the only channel.
- **Moves** (γ + ζ + ε + β): build the migration map in `docs/tranches/BH/coordination/asks-and-consumes.md` — every dropped/renamed export (`./api` types→owning subpaths, any renamed subpath, the flat-barrel removals) → its new home + a by-name ask. The CONSUME-and-delete interims (B1c: kf `DragOptions.snap`, value.js `oklchSpectrum`, the viz-choreography republish) → by-name asks to keyframes/value siblings. The precepts upstream-delete (B4c) → ask to `mkbabb/precepts`. **First, a cross-repo grep (via by-name ask) of whether any sibling imports `@mkbabb/glass-ui/api` or the flat `/motion-core` etc.** before the clean break (γ open-Q — the foreign-tree fence forbids reading sibling trees here).
- **Hard gate:** `proof:crossrepo-asks` GREEN (every public-surface deletion names a consumer disposition; the no-silent-drop completeness law); the migration map is byte-complete against the export diff.
- **Waves:** 1–2.
- **Order:** the map is authored concurrently; the asks issue at the 5.0.0 cut (after B2 export reshape lands). Whether BG ships its own version bump before BH's 5.0.0 is a sequencing question (§5 open-Q).

---

## 3. CROSS-CUTTING RISKS

1. **BG COLLISION (the dominant risk).** BG's write-set spans the ENTIRE `src/` + `demo/` + `scripts/gates.mjs` + `src/index.ts`, and 15 BG specs APPEND to CLAUDE.md. Any BH file-move/export/gate/CLAUDE-delete band that runs before the owning BG wave closes either fights BG's edits or orphans them. Mitigation: the §4 interleave protocol — pure-docs/prompt/new-file bands concurrent; everything that writes a BG-owned path sequences after the named WS.
2. **SILENT-LOSS on CLAUDE.md deletion (forbidden by fail-explicit).** Deleting the monolith before redistributing live contracts + re-homing the 18 gates = silent contract loss + an ENOENT-broken close battery (`proof:readme-meta-clean`/`proof:doc-consistency` are in CI/local sets — they RED the instant the file vanishes). Strict order: **redistribute → re-home gates → delete.** The 18 gates' doc-presence clauses are the canary: each names a live contract that must land in a new home before its gate re-points.
3. **5.0.0 export-surface blast radius.** The intentional rename/drop of exports (`./api`, subpath renames) will trip `proof:subpath-enumeration` / `verify-export-types` unless the gate adopts the new baseline (NOT flags it as regression). The `sideEffects` field must be verified (η — wrong/missing field silently negates the entire subpath-split tree-shaking effort). The subpath-name↔dir-name RENAME_MAP must be enumerated EXACTLY before the glob swap or a subpath silently vanishes. A sibling importing `/api` or a flat barrel must be caught by a by-name grep before the break (silent-strand = forbidden).
4. **PRECEPTS-SUBMODULE foreign-tree edit.** `docs/precepts` is a TRUE submodule (`git@github.com:mkbabb/precepts.git`). The design-doc extraction (B4c) and the reusable prompts (B6) must NOT silently mutate it in-place — they ship as NEW glass-ui-tree files + a cross-repo by-name ask for the upstream delete. Until that ask lands, the submodule pin carries duplication (harmless, flagged). MEMORY: a subagent once parked sibling repos in `/tmp` — the fence is LITERAL.
5. **`gates.mjs` is a 5-way contention point** (BG-WS1/7/10/12 + BH-B5 gate-rehome + BH-B4d evidence-policy registration). Mandate a SINGLE batched post-BG `gates.mjs` pass; design the extracted manifest as an append-safe data-file so BG's new rows merge cleanly.
6. **Shader-string false-positive in the god-module count.** 3 of 16 >500L files are single cohesive GLSL/WGSL strings; "splitting" them fragments a shader. The ratchet MUST gain the `*.{wgsl,glsl,frag,vert}.ts` exemption, or B2.4 produces incoherent fragments.
7. **Demo deep-relative-src coupling.** Hundreds of `../../../src/...` demo imports break on ANY src dir move. The `@glass` alias + codemod (B2.0) MUST land first; otherwise every B2/B3 move is a multi-hundred-import rewrite.
8. **CONSUME-interim load-bearing-ness.** `useDragMorph`/`border-progress`/`viz-choreography` interims may be load-bearing if the upstream helper is NOT yet published. Confirm published dist surfaces (kf 5.x `DragOptions.snap`, value.js `oklchSpectrum`) before EXCISE-vs-MIGRATE (out of the read-only research scope).

---

## 4. BG-INTERLEAVE PROTOCOL (from lane ε's BG-write-set map)

BG convergence order: WS1(routing)→WS3(glass)→WS2(dock)→WS5(viz)→WS6(siri)→**WS4(components/demo)**→WS7(close), plus WS8(glass-deep)/WS9(paper-deep)/WS10(de-shadcn ui/ rewrite)/WS11(storybook)/WS12(coherence, bare `src/`).

**HARD-COLLISION files** (BH + BG both write): `src/index.ts` (WS4/WS7), `scripts/gates.mjs` (WS1/7/10/12), `src/components/ui/**` (WS10/WS12), `CLAUDE.md` (15 specs append), the dock god-modules (WS2), the viz/glass substrate god-modules (WS3/WS5/WS8).

### Truly CONCURRENT with BG (NOW — no src/demo/gates.mjs/index.ts write):
- **B0** scratch sweep (touches nothing BG writes).
- **B1a/B1b** lucide-external fix + value.js de-straddle (BG touches no build config or deps).
- **B6** reusable prompts (docs/precepts only — modulo the submodule caveat).
- **B4a** docs archive (constellation, audit-runs), **B4d** consumer-evidence prune (gate registration deferred to the post-BG pass), **B4c-files** precepts design-doc extraction (NEW `docs/design/` files only — gate re-points sequenced), **B4b** `docs/canon` authoring + the 28 per-component READMEs (NEW `.md` siblings; LOW collision — BG edits `.vue`/`.ts`, BH adds `.md`; EXCEPT dock README, after WS2).
- **B2.0** demo `@glass` alias + codemod (additive alias; mechanical codemod).
- **B2.1/B2.2/B2.3/B2.4** — subpaths-delete + entry-glob + api-fold + types-relocate + flat-barrel-delete + non-dock/non-shader god-module carves + the shader exemption. **CAVEAT:** B2.1/B2.2 reshape the entry map but the EXPORT SURFACE lives in `src/index.ts` (WS4/WS7/WS10/WS12 collision) — the manifest/glob machinery (vite.library.ts, src/subpaths, package.json exports) is BG-untouched and concurrent, but the `src/index.ts` re-curation waits behind WS4/WS7/WS10/WS12. Verify first that no BG WS READS `src/subpaths/` or `src/api/` wiring (WS4/WS10/WS12 plausibly touch barrel wiring — §5 open-Q).
- **B5a** style-assets god-module split + the currency/shadcn verdict doc.
- **δ1–δ4** demo dead-code + composables-dissolution + chassis/shell/configurator colocation (BG-untouched islands).

### MUST SEQUENCE AFTER the named BG wave:
- **B2.5** dock god-module carves (GlassDock, useDockFission, useDockContextSilhouette) — **after WS2**.
- **B2.6** styles colocation of component-exclusive + `dock/**` sheets + build re-assembly — **LAST, after full BG close** (paper/scroll/cards/glass/dock all in BG's live defect set).
- **B3 δ5/δ6** demo manifest-split + glob-migration + per-story-dir moves — **after WS4** (WS4 IS the demo-chassis-consolidate job; consume its splits, don't re-split).
- **B5b** gate-manifest extract — **after BG's gate-row additions stabilize** (append-safe data-file).
- **B5c + B4c-gate-repoints + B4d-gate-registration** — **after WS1/WS7/WS10/WS12** close `gates.mjs`; batch into ONE post-BG `gates.mjs` pass (the 5-way contention rule).
- **B4f** CLAUDE.md DELETE — **the absolute LAST act**, after full BG close (appends land) AND after B5c re-homes the 18 gates.
- **B7** asks issue at the 5.0.0 cut (after B2 export reshape lands + the export diff is final).

---

## 5. OPEN FRAMING QUESTIONS (genuinely the user's call — the 3 majors are LOCKED, not re-asked)

1. **Export-surface strategy: curated-but-GENERATED keys vs scoped `./*` wildcard.** η + γ + ζ all recommend curated-generated (the glob is the single source of truth, `regen-exports.mjs` emits `package.json` exports, `proof:subpath-enumeration` re-baselines) — it keeps a hard semver boundary so an internal file isn't a breaking-change surface. A `./*` wildcard is less maintenance but makes every internal file public. **Recommend curated-generated; needs confirmation.**
2. **`ui/`→`base/` + `custom/`→`glass/` directory rename: do it or stay?** γ recommends STAY (the rename is huge demo-relative-import churn for cosmetic gain) UNLESS the `@glass` alias (B2.0) lands first, after which it's a one-line alias-target change. The `ui/custom` split itself STAYS (it's the upstream-update service boundary — η + γ).
3. **Scope of gate/script consolidation IN BH (B5d).** The full detector-kit refactor touches 164 scripts (large blast radius). The high-ROI subset (manifest-extract B5b + CLAUDE-gate-rehome B5c + the closed-wave gate-census) is clearly in-scope. **Is the 164-script detector-kit a BH band or a deferred future tranche?** (ζ flags it as large; recommend defer the detector-kit, do the census.)
4. **`docs/canon/` home placement** — a repo-local `docs/canon/` set vs folding the design-axes into `docs/design/` (precepts-adjacent). Affects the gate re-point seam naming (`scripts/lib/canon-doc.mjs`). Minor; ε leans `docs/canon` for the per-component-README + cross-cutting split.
5. **Two-major sequencing** — does BG ship its own published version bump (4.3.0?) BEFORE BH's 5.0.0, or do BG+BH cut together as 5.0.0? Affects the CHANGELOG/MIGRATION reshape (B4e) and the B7 ask timing.
6. **`.changeset` vs `scripts/release.sh`** — keep the changeset infra or consolidate onto release.sh (the gated provenance path)? (α open-Q; low-stakes, keep-both is cheap.)
7. **`components.json` keep vs delete** — keep for `shadcn-vue add` scaffolding (+ fix `baseColor: slate`→warm) vs delete if no add-workflow remains. ζ recommends keep+fix+document; needs a team confirm that the scaffold workflow is live.
8. **consumer-evidence aggressiveness** — the proposed `proof:consumer-evidence-live` forcing gate + ~30-file prune (B4d) is a policy choice; confirm the forcing-function is wanted (it kills the write-once-never-read class permanently but adds a gate).

---

## 6. CONVERGENCE ESTIMATE & NEXT-PASS FOCUS

**Convergence: 74 / 100** after Pass 1.

The basis is strong: the 7 lanes converge tightly on the major facts (subpaths-die, api-folds, 18-CLAUDE-gates, lucide-bug, value-straddle, BG-collision, shader-exemption, demo-glob-contract), the framing is locked, and the band structure + interleave protocol fall out cleanly from lane ε's BG-write-set map. Disagreements are reconcilable count-discrepancies (13 vs 18 vs 26 CLAUDE-gates = parse-bytes vs readFileSync-assert vs reference-total), not conflicting plans.

It is NOT higher because four things are unresolved-by-research (they need a prototype/decision, not more reading):

**What the next prototype/critique pass MUST resolve:**
1. **The exact 79 subpath→dir RENAME_MAP + the published-export count reconciliation** — `package.json` has ~90–96 export keys but `proof:subpath-enumeration` claims 72–76 JS subpaths; the authoritative number + every name≠dir case must be enumerated from the one-liners before the glob swap (a silent subpath drop is the failure mode). PROTOTYPE the `regen-exports.mjs` glob against the current export map and diff.
2. **The per-gate disposition table for the 18 CLAUDE-readers** — which RETIRE (structure-sync, doc-override-idiom), which re-point to a per-component README, which to `docs/canon/<topic>` — a concrete row-per-gate table with the new `readFileSync` target, blocked on the doc-home design existing first (order matters).
3. **Verify the upstream-published surfaces for the CONSUME interims** — kf 5.x `DragOptions.snap` + value.js `oklchSpectrum` (decides EXCISE-NOW vs MIGRATE-via-ask for B1c). Plus the cross-repo grep (by-name ask) of whether any sibling imports `/api` or the flat barrels (decides B2.2/B2.3 silent-strand risk).
4. **The precise BG-close handshake** — BH cannot finalize B2.5/B2.6/B3-δ5/B5c/B4f without knowing when WS2/WS4/WS7/WS10/WS12 actually close; Pass 2 needs the concrete `after: BG.WS{n}` declarations wired into the BH PLAN, and confirmation of whether BG's close gates read CLAUDE.md (they must not, or BG's own close ENOENT-breaks post-delete).
5. **Settle the 5 framing open-Qs in §5** that are genuinely the user's call (export strategy, dir-rename, detector-kit scope, two-major sequencing, consumer-evidence policy) — these gate the wave-count and the band boundaries.

The Pass 2 prototype should lock the export-reshape mechanism (RENAME_MAP + regen-exports diff) and the gate-disposition table as the two highest-leverage de-riskers, since they unblock the two largest bands (B2 export + B4/B5 gate-rehome).
