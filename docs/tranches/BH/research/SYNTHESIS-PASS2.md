# BH TRANCHE — SYNTHESIS PASS 2 (integrated, de-risked plan basis)

Repo: `/Users/mkbabb/Programming/glass-ui` @ `tranche/BG`, version **4.2.0** → BH target **5.0.0**.
Pass-2 folds 5 RAN prototypes (P1-P5) + 4 adversarial critiques (C1 sequencing 62% · C2 export-reshape 79% · C3 claude-deletion 63% · C4 completeness 76%) onto the Pass-1 basis. Every blocking critic claim below was **re-verified against the live repo** before adoption — citations are PATH:LINE or a re-run command.

Framing locks carried from Pass 1: **clean-break 5.0.0 export reshape**, **interleave with the live BG tranche**. The third lock — "**CLAUDE.md is DELETED**" — is **RE-OPENED as a user decision** by C3's verified session-manual finding (§5.1); it is the one framing change Pass 2 surfaces.

---

## 1. WHAT PASS 2 RESOLVED

### 1.1 The export reshape — MECHANICALLY PROVEN (P1, C2 79%)
- **Authoritative count: 96 export keys = 1 root + 89 JS subpaths + 6 CSS/font; 89 typesVersions.** `proof:subpath-enumeration` reports `exportSubpathCount=89`, `libraryEntries()`=90 (89+index). The "72-76" was STALE PROSE; gate and package.json AGREE. The "~90-96 vs 72-76" open-Q is CLOSED.
- **`regen-exports.mjs` RAN and reproduces package.json EXACTLY** — 96/96 keys, 89/89 typesVersions, `drops:[] adds:[] collisions:[] targetMismatchCount:0` (`proto/regen-diff.json`). A silent subpath vanish is mechanically impossible: any miss surfaces as an ADD or DROP, both 0.
- **The RENAME_MAP is 3 true name≠dir cases**, not the Pass-1 list: `./canvas←composables/glass/canvas2d`, `./motion-curves←composables/motion/curves.ts`, `./fourier-math←components/custom/fourier-field/math.ts`. **`/pager←pager-dots` is DEBUNKED** — the live key is `./pager-dots` (matches its dir); CLAUDE.md prose "subpath /pager" is contradicted by package.json. Evidence over prose.
- **Three policy maps drive the glob:** CURATED(11: index→root, api, tokens, forms, dark, keyboard, carousel, motion, motion-core, sidebar, infinite-scroll — SCC-trap, cannot glob) + COMPOSABLE_SUBPATHS(7: canvas, motion-curves, fourier-math, color, dom, reactive, virtual) + INTERNAL deny-list(ui 18 + custom 3) proven EXACT by the zero-add/zero-drop diff. ui/custom `tabs` collision resolves custom→`./tabs`.
- **`sideEffects:["*.css"]` is CORRECT and complete** — ZERO JS/TS `.css` imports in src/ (re-grepped, count 0). η's tree-shaking concern is NOT live. Do not change the field. No main/module (exports-only — correct).

### 1.2 The /api fold is NOT a one-liner — it is a 164-symbol migration with a named sibling consumer (C2, VERIFIED)
This is the single largest Pass-1 understatement, now corrected and verified:
- **The "1 demo consumer" was a STRING MATCH on display text.** `demo/stories/foundations/paper-texture.vue:95` is `<code class="fira-code">@mkbabb/glass-ui/api</code>` — template prose, NOT an import. Re-grep of demo/ script-context `/api` imports = **0**. There is no real demo consumer.
- **The real consumer is a SIBLING: muster.** This repo's own audit (`docs/tranches/AW/audit/constellation/aurora-blob-consumer-demand.md:39`) records muster importing `DEFAULT_AURORA_CONFIG`/`AuroraConfig` from `@mkbabb/glass-ui/api` (`useAuroraConfig.ts:47`). A second surface (`AW/.../metric-stack.md:3`) publishes `MetricStackProps`/`MetricRowProps` through `/api`. Folding `/api` strands muster unless its by-name migration ask lands first — the exact silent-strand the framing forbids.
- **Scope is ~164 symbols across TWO files** (`api/index.ts` 505L + `types-extra.ts` 349L = 854L; `34+39=73` export statements re-exporting ~164 symbols from 28 sources). `surfaceClass` is NOT on the /api surface (only in comments) — the Pass-1 "re-export Surface/surfaceClass from /card" cited a phantom.
- **3 no-home orphans:** `Surface`, `MenuItemVariants`, `ControlSize` re-export from `ui/_shared` (INTERNAL, NOT on root barrel — re-grep returned nothing). Folding /api leaves these reachable from NOWHERE unless explicitly re-homed.
- **VERDICT:** the /api fold owes a **164-row symbol→owning-subpath migration table** (auto-derivable — every /api symbol is a re-export) + a cross-repo by-name grep (muster confirmed, plus speedtest/slides/value.js-demo/fourier) + the 3 orphan re-homes BEFORE the break. This is a Pass-3 prototype (`regen-api-migration.mjs`), not wave-authoring guesswork.

### 1.3 The gate-disposition table — CONCRETE, 16 readers, canon-doc.mjs seam RAN (P2, C3 63%)
- **Count reconciled: 26 reference / 18 code-touch / 16 content-readers (15 HARD_ASSERT + 1 WARN) / 13 byte-parse subset.** The must-re-home set is the **16 content-readers**; the FENCE (crossrepo-asks) + DEAD_VAR (expandable-part) are 2-line edits; 8 are MENTION-only.
- **The 15 HARD-ASSERT gates** (RED/ENOENT on delete): claude-structure-sync (L74 ENOENT-unguarded), doc-consistency (CI+local), doc-override-idiom, dock-unify, dock-rail-realize, dropdown-fix, easing-primitive, on-glass-fg, phase-palette, readme-meta-clean (CI+local canary), spa-view, split-chars, surface-axis, close-battery-parity, handmark. +1 WARN: accent-tone (DROP the read, structure-sync owns the hard arm).
- **`canon-doc.mjs` resolver RAN** — frozen `CANON_HOMES` map, `canonDoc(key)` THROW-on-unknown, `readCanon(key,'strict')` THROW-ENOENT, `auditCanonHomes()` standing check. Worked re-points executed: handmark.W6→RED (README lacks contract text), on-glass-fg/close-battery→THROW (homes absent). DRY: re-home a contract = edit ONE map entry.
- **Doc-home gap (auditCanonHomes RAN):** docs/canon/ ENTIRELY ABSENT (9 files, 6 gate-load-bearing: structure/dependencies/build-and-gates/glass-system/motion-system/consumer-wiring); instrument-chassis/README.md ABSENT; dock/easing/handmark/spa-view READMEs exist but LACK contract text. **Order is HARD-LOCKED:** author homes → re-point 16 gates → delete-or-thin CLAUDE.md.
- **NEW (C3, verified): a SECOND resolver seam.** 10 gates `readFileSync` the precept design-docs (design-idioms/motion-canon/tunable-anim/affordance-map — re-grep count 10). B4c needs its own `design-docs.mjs` resolver + `auditDesignHomes()`, batching into the SAME post-BG gates pass. Total doc-dimension gate-rehome ≈ 16 canon + 10 design = **~26 gates across two seams**.

### 1.4 The 3 CONSUME interims — ZERO upstream asks (P3, VERIFIED)
- **value.js de-straddle floor = `^1.2.0`** (keyframes 5.1.0 transitively deps value `^1.2.0`; installed singleton 1.2.0). Replace the `^0.13.0 || ^1.0.0` straddle at `package.json:1058` (deps) + `:1096` (peerDeps).
- **#1 useDragMorph kf `DragOptions.snap` = EXCISE-NOW.** `keyframes.d.ts:1073` exposes `snap?:number[]`+bounds+rubberBand at the pinned 5.1.0. Pass `snap:targets.map(t=>t.center)`, delete the ~12-line `commitSnapOnRelease` re-roll. KEEP `nearestTarget`/`nearestValue` (the center→V mapping for `onSnap(value)` — kf's snap is value-domain-number-only). No ask.
- **#2 value.js `oklchSpectrum` = ALREADY DISCHARGED in code.** `spectrum-walk.ts:62,98` consumes published `mixColors`/`sampleColorRamp` with `{space:'oklch',hueMethod:'shorter'}`, present in value.js 1.2.0. `interimStops` is the legitimate value.js-free sync-shell (BC.W-AX-BP-LAZY), not an interim. No action, no ask.
- **#3 useVizChoreography kf `Oscillator` = STALE-COMMENT-FIX.** Oscillator LANDED at 5.1.0; the "ABSENT" comment is false but the idle loop is the viz's own `uTime` (deliberate KEEP). Not load-bearing, not an excise. Fix the comment; optional future Oscillator adopt. No ask.
- **Net B1c: ONE excise-now, ZERO migrate-via-ask.** The B7 relay carries no kf/value CONSUME asks.

### 1.5 Styles colocation — byte-equivalent via GATHER (P3, C4)
- **The /styles publish is `cpSync(src/styles→dist/styles)` VERBATIM** (`vite.style-assets.ts:413`), NOT a bundler. dist/styles/index.css ships live `@import "./X.css"` lines + flat partials.
- **lightningcss `bundle()` is the WRONG mechanism** — it flattens index.css byte-different + breaks the critical/deferred bare-name `@import` split (critical-partition.mjs `CRITICAL_PARTIALS`/`DEFERRED_PARTIALS` = bare names). Pass-1's "lightningcss bundle over index.css" is CORRECTED.
- **CORRECT mechanism = GATHER + @import-path-rewrite**, PROVEN byte-equivalent: source @imports reach colocated paths; publish copies colocated sheets→dist/styles flat + rewrites dist index.css @imports back to `./flat`. `critical-partition.mjs` UNCHANGED. The reverse-rewrite of the colocated source index.css == original `src/styles/index.css` byte-for-byte (Python equality True). Hard gate: `diff -r dist/styles_before dist/styles_after` EMPTY + a built-consumer smoke import.
- **SAFE-to-colocate (9, all DEFERRED bucket):** border-progress, completion-seal, configurator, instrument-chassis, hover-popover, drawer, segmented-tabs, select, icon-chip. **MUST-stay-GLOBAL:** tokens/theme/typography/glass roots+subdirs (CRITICAL), glass-specular-track (5 readers), glass-refract, menu, feedback-tone, dock-controls, cards, paper, floating-panel, transitions/animations/scroll-*/view-transition, motion/morph-field, utilities, fonts. dock.css+dock/** = B2.5.
- **Hidden blast radius: ~30 gate path-literal re-points** (segmented-tabs←7, instrument-chassis←6, drawer←5, configurator←4, icon-chip←3, completion-seal←2, others←1) + proof:colocation + proof:css-critical read index.css. Folds into the post-BG gates pass.

### 1.6 Demo codemod — SAFE+SUFFICIENT (P4, VERIFIED)
- **492 import rewrites across 166 files, 0 regex-unsafe hits** (dry-run RAN, `proto/codemod-dryrun-report.json`). The naive `rg '../../src/'=492` double-counts (substring of `../../../src/`); anchored match = 68(d2)+384(d3)+40(d4)=492. No template-literal/concat/dynamic src paths, no ?raw/?url, 0 comment false-positives.
- **NO @glass alias exists today** (re-confirmed: vite.config.ts no resolve.alias, tsconfig.json no paths, `@/` retired=0 usages). B2.0 ADDS both: tsconfig `paths{"@glass/*":["./src/*"]}` + vite `resolve.alias{"@glass":src}`. moduleResolution already "bundler".
- **10 CSS src refs (demo.css @font-face/@import/@source) are a SEPARATE class** — NOT JS-alias targets, leave relative.
- **Manifest glob contract (MANDATORY same-wave): L118 `./*/*.vue`→`./*/*/index.vue`, L121 key `./${cat}/${id}/index.vue`.** Without it the per-story-dir move silently renders every story blank via `MissingStory render:()=>null`. Evidence = runtime route-walk, NOT grep.
- **manifest.ts (1236L) carves cleanly** by PATH:LINE into `chassis/manifest/{types,lazy[glob-site],backgrounds,subpaths,factory,landing,rows/<category>×11,categories,index}`. DAG acyclic.

### 1.7 God-modules — BG owns 8 of 12 src carves; BH owns 3 (P5, C1, VERIFIED)
- **Shader-exemption glob `src/**/*.{wgsl,glsl,frag,vert}.ts` RAN clean** — 44 shader-literal files, EXACTLY 3 >500L (metaball.wgsl 530, flow-field.glsl 518, metaball.frag 511), zero non-shader false-exemptions; waveField.{glsl,wgsl}.ts correctly caught (genuine single-string, <500). Residual-after-exemption == the 13 non-shader god-modules exactly. The gate patch + self-test bite (synthetic 600L `.frag.ts` exempt / 600L `.ts` flagged) is concurrent-safe but lands IN the post-WS12 gates pass (the RATCHET is BG-touched in WS2/WS7/WS10/WS12 — C1).
- **BG-WS4 SPEC already carves 8 of 12** (createCanvasLifecycle post-WS5, useWebGPUCanvas, useGlassBackdropLuminance→ambientHueHistogram/wcagLuminance, SegmentedTabs→useTabRovingFocus/useTabResponsive; useBlobSatellites+useGooDotMatrix via WS5; GlassDock+useDockFission via WS2), **DELETES a 9th** (useDockContextSilhouette = BG.W-DEAD-COMPOSABLE-CUT, DEFINITION-ABSENT, zero live imports confirmed), and **api/index.ts is a fold-DELETE** not a carve.
- **BH genuinely owns 3 carves:** CarouselContent.vue→`useCarouselWorm.ts`, PagerDots.vue→`usePagerWorm.ts`, useBloomUp.ts→audit-then-relocate (AppSwitcher-only signal → likely single-consumer relocate, blocked on overfitting-audit count). All 7 demo god-modules are BG-owned — BH consumes, never re-splits.

### 1.8 The BG-close handshake — "full close = WS12", NOT WS7 (C1, VERIFIED — the dominant Pass-1 error)
`docs/tranches/BG/FINAL.md` build order (verified): core **WS1→WS3→WS2→WS5→WS6→WS4→WS7**, then deep-morphism **WS8→WS9→WS10→WS11**, then the **WS12 coherence capstone LAST**. ~110 waves. Every Pass-1 "after full BG close" anchor (B2.6, B4f, B5b, B5c) was wrongly pinned at WS7 — they re-anchor to **after WS12**. This shifts the entire sequenced back-half and the single gates.mjs pass. Authoring against WS7 would fire BH's irreversible CLAUDE.md change + export reshape before WS8-WS12 append gates, mutate CLAUDE prose, add/delete subpaths (WS6 +2 siri, WS5 viz subpath deletes/renames), and rewrite styles.

---

## 2. FINAL BAND STRUCTURE (B0-B7, refined + WS12-anchored)

Sequencing legend: **CONCURRENT** (no BG-owned path) · **after BG.WS{n}** · **after WS12** (= full close). The dependency DAG governs; band numbers are reference labels.

### B0 — REPO HYGIENE / SCRATCH-SWEEP — CONCURRENT, FIRST · 1 wave
- Moves (unchanged from Pass 1): `git rm --cached test-results/`; `git clean -ndX`-preview then force the 99 root images; `rm -rf .playwright .tmp`; delete `.browserslistrc` (DEAD); `git mv BD-CONTINUATION-PROMPT.md docs/tranches/BD/`; append `.gitignore` block; re-target `.githooks/commit-msg` off `--tranche=BB` to env-driven.
- **Hard gate:** `git status` scratch-clean + `git ls-files | rg 'test-results/|\.browserslistrc' =0` + a dry-run-preview artefact.
- **Order:** truly concurrent (do NOT touch BG's `D .retired-classes.txt`).

### B1 — LEGACY EXCISION + PAYLOAD FIX — mostly CONCURRENT · 2 waves
- **B1a (CONCURRENT):** `vite.library.ts:60-74` libraryExternal — drop dead `lucide-vue-next`+`vaul-vue` (verified L13-14), ADD `@lucide/vue`, +perfect-freehand if it leaks; re-baseline `profile:budget` downward. NOTE: vite.library.ts is WS6-touched (siri glob-add, different lines, low risk) — coordinate the file, not the lines.
- **B1b (CONCURRENT):** value.js straddle → `^1.2.0` at `package.json:1058,1096`. Typecheck the 9 import sites against 1.x first. BG touches value.js nowhere (WS9 drops perfect-freehand, a different line).
- **B1c (CONCURRENT):** EXCISE-NOW the useDragMorph snap re-roll (kf 5.1.0 `DragOptions.snap` confirmed); preserve the center→V `onSnap` mapping (verify with drag-morph unit/π). Fix the useVizChoreography stale-comment. (Border-progress interim already discharged — no move.)
- **Hard gate:** dist-grep NO `createLucideIcon-*`/lucide-in-vendor; `proof:peer-conformance`/`proof:constellation-spine` non-vacuously GREEN on the de-straddled manifest; the snap excise has green build + green drag-morph tests.
- **Order:** all concurrent NOW.

### B2 — SRC RESTRUCTURE → 5.0.0 export surface — split concurrent / after-WS{n} · ~8 waves
- **B2.0 (CONCURRENT, FIRST):** add `@glass` tsconfig+vite alias + run the proven 492-rewrite codemod. **+NEW: add the SAME @glass alias to `vitest.config.ts`** (it has none — verified) so the tests tree can use it (see C4 fork §3.1). Mechanical, BG-untouched.
- **B2.1 (MECHANISM concurrent / SWAP after WS12):** author `regen-exports.mjs` + the 3 policy maps + the shared map module feeding both `libraryEntries()` and the generator (concurrent NOW — proven). The GLOB-SWAP + `src/subpaths/` delete (79 files) + package.json-exports regen runs **after WS12** (must capture WS6's +2 siri subpaths and WS5's viz-subpath deletes/renames — the LANDED surface, not the 4.2.0 surface P1 reproduced). **+NEW (C4): re-author `flatten-subpath-types.mjs`** to map the NEW colocated dts emit (`dist/components/{ui,custom}/<x>/index.d.ts`, `dist/composables/<subtree>/index.d.ts`) → flat `dist/<name>.d.ts`; gate with `verify-export-types` post-build (deleting src/subpaths/ no-ops the current flattener — verified it maps `dist/subpaths/`). **+NEW (C4): rewrite `tests/public-surface.spec.ts`** (hard-imports `../src/api`+~30 `../src/subpaths/*`, verified) as the export-reshape's BINDING test against the new colocated surface — it IS the no-silent-vanish proof, not a casualty.
- **B2.2 (after WS12):** FOLD `src/api/` — but NOT as a one-liner. **Owes the 164-row migration map (B7 prototype) + the muster cross-repo ask + the 3 orphan re-homes (Surface/MenuItemVariants/ControlSize) BEFORE the break.** Drop `./api` key; the only nested-dts (`dist/api/index.d.ts`) dies with it. **+NEW (C4): the ~9 source-importing gates** (deck-progress-rail, control-tokens, storybook-complete, glass-prune, completion-seal, instrument-scope, config-chassis, viz-papergrid, spa-view) re-point their `src/subpaths/*`/`src/api` fixture imports to the colocated barrel — a distinct set from the 16 CLAUDE-readers.
- **B2.3 (after WS12):** relocate `src/types/html-attributes.d.ts`→`src/`; move the 11 curated flat barrels `src/*.ts`→`src/entries/` (keys+chunk names UNCHANGED — source-only). These are NOT export breaks (C2 — drop the noise from the B7 ask list; the ONLY key-break is `./api`).
- **B2.4 SPLIT into three (C1):**
  - **B2.4a (CONCURRENT):** the 3 BH-OWNED carves — CarouselContent→`useCarouselWorm`, PagerDots→`usePagerWorm`, useBloomUp→audit-then-relocate. Optional 2nd-order `motion/gooBarbellGeometry.ts` fold (PagerDots+CarouselContent share centerOf/restSize). Coordinate goo-barbell with WS4's BG.W-GOO-BARBELL-CSS if it exists.
  - **B2.4b (after WS4):** CONSUME/VERIFY createCanvasLifecycle/useWebGPUCanvas/useGlassBackdropLuminance/SegmentedTabs match BG's leaf shapes (the carve plans in P5 §2 are the target shapes BH asserts; if BG diverges, re-point BH's reader-gate expectations to BG's actual leaves).
  - **B2.4c (after WS5):** consume/verify useBlobSatellites/useGooDotMatrix.
- **B2.5 (after WS2) — relabeled CONSUME/VERIFY:** GlassDock+useDockFission carved BY WS2; useDockContextSilhouette DELETED by WS2. BH asserts BG's leaf shapes + verifies useDockContextSilhouette DEFINITION-ABSENT + reconciles the stale `AppSwitcher.vue:3` comment. ZERO BH carve.
- **B2.6 (after WS12) — styles colocation:** the 9 SAFE sheets via the PROVEN GATHER mechanism (NOT lightningcss bundle); critical-partition.mjs UNCHANGED. **+NEW (C4): package.json files[] audit** (files=[dist,src/styles,src/fonts] verified — colocating sheets OUT of src/styles leaves the raw src/styles ship incomplete; evidence = `npm pack --dry-run` listing every @import resolves, or drop src/styles from files[] as vestigial). The ~30 gate path-literal re-points fold into the post-WS12 gates pass.
- **Hard gate:** `verify-export-types` + `dist/<name>.js` set diff (5.0.0 renames folded into the new `proof:subpath-enumeration` baseline); `proof:no-god-module` GREEN with the shader exemption; `diff -r dist/styles_before dist/styles_after` EMPTY; demo route-walk GREEN; **tests `npm run test`+`npm run typecheck` GREEN** (C4 — the tests-tree fold, §3.1).
- **Order:** B2.0/B2.1-mechanism/B2.4a concurrent; B2.4b after WS4; B2.4c+B2.5 after WS5/WS2; B2.1-swap/B2.2/B2.3/B2.6 after WS12.

### B3 — DEMO RESTRUCTURE — mostly after-WS4 · ~6 waves
- **δ1 (after WS4) — RECLASSIFIED from "concurrent island":** BG WS4 BG.W-DEMO-CHASSIS-CONSOLIDATE OWNS the DemoFrame/StorySectionHeader deletes + the Code fold. **ADOPT BG's fold direction (CodeBlock→Code); do NOT re-fold Code→CodeBlock** (the synthesis δ1 had it backwards). Consume/verify after WS4.
- **δ2/δ3/δ4 (default after WS4, verify-against-WS2/WS4):** δ2's useContextualDockLayers→shell move overlaps WS2 BG.W-SHELL-DOCK-DRY; δ3/δ4 chassis-colocation overlaps WS4 chassis-consolidate. Default to after-WS4 unless a per-file grep proves the exact paths BG-untouched.
- **δ5/δ6 (after WS4):** split manifest.ts → `chassis/manifest/` (the P4 carve) AND the glob `./*/*.vue`→`./*/*/index.vue` in the SAME wave as the first per-story-dir move. **DIVERGENCE (P5): BG.W-MANIFEST-COLOCATE KEEPS manifest.ts** (folds the 4 parallel maps onto the s() row, no rows/<category> split). BH-δ5 reconciles by consuming BG's folded manifest — decide row-split vs accept on the post-WS4 line count. BH owns the per-story-DIR glob-migration (BG does NOT do it). **+NEW (C4 KISS guard): a story stays FLAT `<cat>/<id>.vue` unless it has colocated parts/composables/constants** — record the decision (mixed `./*/*/index.vue`+`./*/*.vue` glob with dir-form winning, OR accept uniform-dir cost) so ~80 trivial stories don't get contrivance-dirs.
- **Hard gate:** runtime route-walk (non-null component per manifest row — grep insufficient); 82-script/292-literal Class-A `/index.vue` edits + 10 Class-B manifest re-points + Class-C `**`-walker re-baseline all GREEN; **tests/stories.smoke.spec.ts** (imports CATEGORIES from manifest, asserts every row resolves) re-pointed + GREEN (C4).
- **Order:** all after WS4 (WS4 is build-last among the demo-god-module owners, so "after WS4" covers WS1/WS2/WS5's demo splits too — C1).

### B4 — DOCS: CLAUDE.md transformation + redistribution + precepts extraction — mixed · ~7 waves
- **B4a (CONCURRENT — pure docs):** archive `docs/constellation/`, `docs/audits/runs/2026-06-03-glass-ui-self/`; refresh `docs/instructions/README.md`; dedup `style-audit.md`; refresh `overfitting-audit.md`.
- **B4b SPLIT (C3):**
  - **B4b-skeleton (CONCURRENT):** author the docs/canon + docs/design file SCAFFOLDS + the two resolver seams + gate-target homes as EMPTY-but-present so `auditCanonHomes()`/`auditDesignHomes()` can run. **+NEW: GENERATE `structure.md` from disk** (the same colocated-barrel glob P1's regen-exports uses — fold into the regen sibling) so the 5-reader hot file (structure-sync, doc-consistency-DIRS, split-chars, spa-view, accent-tone) cannot drift, the exact reason proof:claude-structure-sync exists.
  - **B4b-content (after WS12):** the actual contract-prose copy — the redistribute SOURCE is a MOVING TARGET (verified: live CLAUDE.md carries 12 un-applied Append/INSERT blocks + 75 BB/BC/BD/BE wave tokens; BG's WS2/WS9/WS10/WS12 rewrite DOCK_SPRING/handmark/de-shadcn/RATCHET prose). Author the per-component contracts AFTER the owning wave: motion-system DOCK_SPRING after WS2, glass-system + dock/glass READMEs after WS3/WS8, handmark README after WS9, de-shadcn after WS10. `auditCanonHomes()` asserts content-complete (non-empty + the asserted contract TOKEN present), not skeleton-present.
- **B4c (files CONCURRENT / gate re-points after WS12):** extract the 4 glass-ui design docs (design-idioms, motion-canon, tunable-anim, affordance-map) from the precepts SUBMODULE → `docs/design/` as NEW repo files; re-point the 10 precept-reading gates via `design-docs.mjs`; cross-repo by-name ask to mkbabb/precepts for the upstream delete (NEVER an in-place submodule mutation). **The precept EXTRACTION must be AFTER WS2** (which rewrites DOCK_SPRING 0.32/0.7→0.68/0.64 in motion-canon.md+tunable-anim.md — else BH extracts the stale value). EXCLUDE the 2 cross-repo-dev-resolution.md readers (lineage-probe, resolution-contract) — they stay in the BASE submodule. NOTE: `infra/`+`glossary/` are fourier/feedback-coder content — STAY in the submodule.
- **B4d (files CONCURRENT / registration after WS12):** prune ~25-30 of 44 dead consumer-evidence files; add `proof:consumer-evidence-live` forcing gate (every file gate-referenced OR deleted). Register in the post-WS12 gates pass.
- **B4e (after WS12):** slim CHANGELOG(267KB)/DESIGN(163KB)/MIGRATION(97KB); reshape MIGRATION for the 5.0.0 by-name-ask map; refresh README import examples. **+NEW (C4) dual-doc coordination:** proof:on-glass-fg + proof:surface-axis read BOTH CLAUDE.md AND MIGRATION.md — sequence their two parse-target moves TOGETHER with B5c, not in separate passes. proof:ay/az/ba-final CHANGELOG-section parse targets follow the archive split.
- **B4f (after WS12 + after B5c) — RE-FRAMED from hard-delete to THIN ROUTER (C3, framing-lock-level — see §5.1):** REPLACE the 941L monolith with a ~40-60L CLAUDE.md ROUTER that PRESERVES the auto-injection boot seam (verified: NO AGENTS.md/.cursorrules/CLAUDE.local.md — CLAUDE.md is the SOLE auto-injected operating manual). The router: (a) states the contract-archive is decomposed, (b) indexes docs/canon/*.md + docs/design/*.md + the precepts submodule + per-component READMEs, (c) carries the ~6 hardest session-operating rules verbatim (read-only git, fail-explicit-not-silent, no-backwards-compat, the gates.mjs --run commands, the visual-π/gestalt bar, the foreign-tree fence). **Hard-gate becomes: CLAUDE.md ≤N lines AND zero wave-token refs AND every docs/canon home it indexes resolves** (replaces the "file gone + rg=0" gate). The monolith's GATE-PARSE identity dies; the boot seam survives.
- **Hard gate:** every redistributed contract has a live gate asserting against its NEW home; `auditCanonHomes()`+`auditDesignHomes()` GREEN; `proof:consumer-evidence-live` GREEN; the router resolves every index entry.
- **Order:** B4a/B4b-skeleton/B4c-files/B4d-files concurrent; B4c-extraction after WS2; B4b-content/B4e/B4f after WS12; B4f the absolute LAST act after B5c.

### B5 — BACKBONE + BUILD-MECHANISM + GATE/SCRIPT CONSOLIDATION — mostly after-WS{n} · ~4 waves
- **B5a (after WS3, safe after WS12):** record dependency-currency + shadcn-vue verdict in docs/canon (keep components.json for `add`, fix `baseColor:slate`); split `vite.style-assets.ts` (566L). **MOVED off concurrent — vite.style-assets.ts is WS3-touched** (verified: the `-webkit-backdrop-filter` injection at L497-501) AND WS9 paper-suffuse touches the SFC-fold. After WS3 minimum.
- **B5b (after WS12):** extract the gates.mjs table+prose → `scripts/gates.manifest.mjs`; gates.mjs→~300L runner; `--list local|ci|release|full` byte-identical. Design the manifest as the append-merge surface for all the post-BG row work.
- **B5c (after WS12) — the gate re-home:** the 16 CLAUDE-readers via `canon-doc.mjs` + the 10 precept-readers via `design-docs.mjs`. proof:claude-structure-sync→generated structure.md (the png-arm splits to proof:visual-png-tracked); proof:doc-override-idiom→README.md; accent-tone DROPS the read. **+NEW (C3): cross-reference the 16-row table against the B2 deletion set** — gates that ALSO read deleted wiring (accent-tone reads src/subpaths/selectable-chip.ts; verify spa-view/split-chars subpath arms) re-point BOTH arms in the same edit or ENOENT-break on the half the table ignored. **+NEW (C4): re-emit ci.yml (`npm run gates:emit-ci`) + assert `proof:gen-ci-fresh` GREEN** in this same pass (verified: ci.yml is GENERATED + byte-matched in the RELEASE set — a drifted ci.yml refuses to publish). Single-home rule per migrated contract (the gate's readFileSync target IS the one canonical home; others LINK).
- **B5d (DEFER past BH):** the 164-script detector-kit refactor. Recommend defer (large blast radius); do the census subset only.
- **Hard gate:** `--list` byte-identical (B5b); `proof:gate-manifest-sound` GREEN + no gate readFileSyncs a deleted doc (B5c); `proof:gen-ci-fresh` GREEN (ci re-emit); `auditCanonHomes`+`auditDesignHomes` GREEN.
- **Order:** B5a after WS3; B5b/B5c into the SINGLE post-WS12 gates pass.

### B6 — THREE REUSABLE CORE PROMPTS — CONCURRENT · 1 wave
- Moves (unchanged): author `docs/precepts/instructions/prompts/{LEGACY-EXCISION,RESTRUCTURE-BACKEND,RESTRUCTURE-FRONTEND}.md` + the README pointer. Carry the live anti-pattern catalog by name; obey STYLE.md.
- **Hard gate:** prompts exist, cross-linked, cite binding edicts; self-consistency read (no STYLE.md banned words).
- **Order:** concurrent. Caveat: prompts/ lives in the precepts SUBMODULE — author via its own commit/PR or stage repo-local + cross-repo ask (§5.6, same foreign-tree consideration as B4c).

### B7 — CONSUMER-MIGRATION CROSS-REPO ASKS — after WS12 · 1-2 waves
- **Moves:** the map in `docs/tranches/BH/coordination/asks-and-consumes.md`. **The 5.0.0 export-surface break is EXACTLY ONE dropped key (`./api`) + its 164-symbol re-home** (C2 — drop the flat-barrel-move/subpaths-delete noise; those are key-preserving). **Owes a `regen-api-migration.mjs` prototype** parsing api/index.ts+types-extra.ts from-clauses → the 164-row symbol→owning-subpath table, gated against the export diff for completeness. **The cross-repo by-name grep MUST run** against muster (CONFIRMED /api consumer) + speedtest/value.js-demo/slides/fourier before the break; muster re-points /api→/aurora (its 2 symbols both have /aurora homes). The B1c CONSUME interims carry NO asks (all met).
- **Hard gate:** `proof:crossrepo-asks` GREEN (every public-surface deletion names a consumer disposition); the migration map byte-complete against the export diff.
- **Order:** map authored concurrently; asks issue at the 5.0.0 cut after the B2.2 fold lands + the export diff is final.

---

## 3. COMPLETENESS AMENDMENTS (C4 — folded into bands)

### 3.1 THE tests/ MIRROR TREE (C4 blocking, VERIFIED) — folds into B2 + B3
- **Verified: tests/ = 120 spec files, 219 `../src` relative imports, 0 @glass alias, vitest.config.ts has no alias.** tsconfig.test.json folds tests/ into typecheck → a broken test import REDs BOTH `npm run test` AND `npm run typecheck` in CI. Every B2 src-move/carve + every B3 demo-move breaks these.
- **DECISION FORK (user, §5.2):** (a) move tests/ in LOCKSTEP with src/ (mirror every move in the same wave), OR (b) add `@glass` to vitest.config.ts (B2.0) + a tests codemod mirroring P4's 492-rewrite over the 219 imports. The demo @glass alias does NOT cover vitest. Recommend (b) — the alias decouples the mirror from src depth, the same de-risk B2.0 buys the demo.
- **Folds into:** B2 (every src move re-points its tests/<P>/ mirror, evidence = test+typecheck GREEN), B3 (stories.smoke re-point).

### 3.2 tests/public-surface.spec.ts (C4 blocking, VERIFIED) — folds into B2.1/B2.2
- Verified hard-imports `../src/api` (L4) + ~30 `../src/subpaths/*` (L5-16+) + 7 flat barrels = the literal PRE-5.0.0 export enumeration. Plus components.smoke + composables.smoke reference subpaths/api. Rewrite ALL as the export-reshape's binding test against the new colocated surface, in the SAME wave as the reshape — frame as the no-silent-vanish asset, not a casualty.

### 3.3 ci.yml re-emit (C4 blocking, VERIFIED) — folds into B5c
- Verified: ci.yml generated by `gates:emit-ci`, byte-matched by `proof:gen-ci-fresh` in the RELEASE set ("a drifted ci.yml refuses to publish", gates.mjs:1530). Every BH gate add/drop/re-home (16+10 re-homes, B4d registration, B2.2 api-gate drops, B5b extract) MUST re-emit ci.yml in the post-WS12 pass + assert GREEN. Named hard-gate line.

### 3.4 dts-emit/flatten re-author (C4 blocking, VERIFIED) — folds into B2.1
- Verified: `flatten-subpath-types.mjs:26` maps `dist/subpaths/<name>.d.ts`→flat. Deleting src/subpaths/ makes vue-tsc emit dts at the colocated source-tree locations → the flattener no-ops → the flat `dist/<name>.d.ts` that exports.types/typesVersions resolve never gets produced → verify-export-types REDs. Re-author the flattener for the new colocated emit map + gate with verify-export-types post-build.

### 3.5 ~9 source-importing gates (C4) — folds into B2.1/B2.2
- deck-progress-rail, control-tokens, storybook-complete, glass-prune, completion-seal, instrument-scope, config-chassis, viz-papergrid, spa-view import src/subpaths/* or src/api as FIXTURES — a distinct re-point set from the 16 CLAUDE-readers + the export-enumeration gate. Swap each to the colocated barrel.

### 3.6 package.json files[] audit (C4) — folds into B2.6
- Verified files=[dist,src/styles,src/fonts]. Colocating ~9 sheets OUT of src/styles leaves the raw src/styles ship incomplete. Audit via `npm pack --dry-run`; either extend files[] to colocated CSS homes or drop src/styles as vestigial (dist is complete).

### 3.7 The minors census (C4 confirmed accurate, already in lanes α/ε)
.changeset (KEEP), .githooks/commit-msg (B0 re-target), .browserslistrc (B0 delete DEAD), components.json baseColor:slate (B5a fix), src/fonts (shipped, keep). ci.yml carries ZERO literal src/demo/CLAUDE/docs paths (only npm-script names) — restructure breaks it ONLY via the gen-fresh byte-match (§3.3), a contained concern.

---

## 4. REMAINING OPEN ITEMS + HONEST CONVERGENCE

### 4.1 OPEN (owed to Pass-3 prototype or wave-authoring)
1. **The /api 164-row symbol→subpath migration map is UNBUILT** (C2 blocking). Owes `regen-api-migration.mjs` + the 3 orphan re-homes (Surface/MenuItemVariants/ControlSize) + the muster cross-repo grep result. Without it B7+B2.2 cannot be authored concretely. **Highest-leverage Pass-3 de-risker.**
2. **The regen gate is fail-OPEN** (C2 blocking) — the INTERNAL deny-list publishes any unclassified ui/custom dir onto the 5.0.0 semver surface. Must become fail-CLOSED (explicit classify-or-error per dir) before B2.1 + re-baseline AFTER WS12 (a BG-added dir during the interleave else silently auto-publishes). P1 residual #2 stated the failure direction BACKWARDS (it's silent PUBLICATION, not silent internal).
3. **The tests-tree migration mechanism** (C4 blocking, §3.1) — lockstep-move vs vitest-alias+codemod. A decision, not more reading. Recommend alias+codemod.
4. **Symbol-fidelity proof is owed** (C2) — P1 proved export KEYS + chunk TARGETS, not that each colocated index.ts re-exports the identical symbol set the deleted mirror did. verify-export-types post-build BUILD is the binding proof; the regen gate must existence-check ALL 18 hand-mapped sources (curated+composable), not only the 72 globbed dirs.
5. **useBloomUp disposition** (P5) — carve vs relocate, blocked on the overfitting-audit live-consumer count (AppSwitcher-only signal → likely relocate). Resolved at the B2.4a audit, not now.
6. **manifest.ts post-WS4 line count** (P5 divergence) — BG KEEPS manifest.ts (folds maps, no row-split); BH-δ5 decides row-split vs accept on the actual post-fold count. Settles at WS4 close.
7. **The single-home rule operationalization** (C3) — surface-axis examples → glass-system.md ONLY (Toast/Button READMEs link); card-tier-alpha → glass-system.md. Resolve each both-natured contract by fiat in the disposition table at B5c author time; optional no-restate bite.

### 4.2 overallConvergence = 82 / 100
**Rationale (min/weighted across the critics):** the critic %s were C1 62 · C2 79 · C3 63 · C4 76 — assessments of the synthesis AS-WAS. Pass 2 has now RESOLVED the mechanism layer (every prototype RAN and proved its mechanism: regen-diff 0-delta, codemod 0-unsafe, GATHER byte-equal, shader-glob clean, gate-resolver fail-explicit) AND verified+folded the 4 blocking corrections (WS12 anchor, /api-as-164-fold, thin-router, tests-tree). That lifts the basis well above C1's 62 and C3's 63 — those scores were dominated by the WS7-anchor error and the missing session-manual seam, both now corrected. It does NOT reach ≥90 because three items are genuinely unresolved-by-synthesis: (a) the /api 164-row map is an unbuilt prototype (§4.1.1), (b) the thin-router-vs-delete decision re-opens a framing lock and needs the user (§5.1), (c) the tests-tree mechanism is an open fork (§5.2). These are Pass-3 / decision concerns, not "more reading." Weighting the four lanes after correction (C1→~85 anchor fixed, C2→~80 fold scoped but map unbuilt, C3→~80 router reframed but single-home/source-mutation pending, C4→~85 gaps enumerated) and taking the conservative blend lands at **82**.

---

## 5. USER DECISIONS TO CONFIRM (distinct from the already-defaulted minors)

1. **[FRAMING-LOCK RE-OPENED] CLAUDE.md: thin ROUTER vs hard DELETE.** The Pass-1 lock said "DELETED". C3 verified CLAUDE.md is the SOLE auto-injected session operating-manual (no AGENTS.md/.cursorrules/CLAUDE.local.md). A hard delete orphans every future session's boot context. **Recommend: thin ~40-60L ROUTER** that preserves the boot seam + indexes the decomposed archive + carries the ~6 hardest operating rules. The monolith's gate-parse identity still dies; only the boot stub survives. This is the #1 decision — it changes B4f's hard-gate definition.
2. **[FORK] tests/ mirror migration mechanism** — lockstep-move (mirror every src move in-wave) vs vitest @glass alias + a 219-import tests codemod. Recommend the alias+codemod (decouples the mirror from src depth). 120 specs / 0 current alias.
3. **[§5.1 carried] Export strategy: curated-GENERATED (recommend) + make the regen gate fail-CLOSED.** The glob is the single source of truth; an internal file is NOT a breaking-change surface. Confirm + adopt the fail-closed classify-or-error (§4.1.2).
4. **[§5.2 carried] ui→base / custom→glass dir rename: STAY (recommend).** Huge demo+tests relative-import churn for cosmetic gain; the @glass alias makes it a one-line alias-target change later if wanted. The ui/custom split itself STAYS (the upstream-update service boundary).
5. **[§5.3 carried] detector-kit scope: DEFER past BH (recommend).** 164-script blast radius. Do the gate-manifest-extract (B5b) + CLAUDE/precept re-home (B5c) + the closed-wave census; defer the comment-strip detector-kit.
6. **[§5.5 carried] Two-major sequencing: does BG ship its own bump (4.3.0?) before BH's 5.0.0, or do BG+BH cut together as 5.0.0?** Affects the CHANGELOG/MIGRATION reshape (B4e) + the B7 ask timing. Given BH's back-half is all after-WS12, the natural cut is BG+BH together as 5.0.0 — confirm.
7. **[§5.6 carried] precepts-submodule writes (B4c design-doc extract + B6 prompts):** author in the submodule via its own commit/PR, vs stage repo-local + cross-repo ask. Foreign-tree fence is LITERAL.
8. **[§5.8 carried] consumer-evidence forcing gate (B4d):** confirm the `proof:consumer-evidence-live` forcing-function is wanted (kills the write-once-never-read class, adds a gate).

Already-defaulted minors (no confirm needed): .changeset keep · components.json keep+fix-baseColor · src/fonts keep · .browserslistrc delete · commit-msg env-retarget.

---

## 6. READY-TO-AUTHOR + NEXT-PASS FOCUS

**readyToAuthorPlan: FALSE.** Convergence 82 is below the ≈90 bar. The mechanism layer is proven and the band structure is now correctly WS12-anchored, but three items block durable plan authoring: the unbuilt /api 164-row map (concrete B7+B2.2 cannot be written without it), the thin-router framing decision (changes B4f's hard gate), and the tests-tree mechanism fork (changes B2/B3 hard gates + wave count).

**A Pass 3 must close:**
1. **PROTOTYPE `regen-api-migration.mjs`** — parse api/index.ts+types-extra.ts from-clauses → the 164-row symbol→owning-subpath table; confirm every symbol re-homes (incl. the 3 _shared orphans + the ~100 types-extra composable-return types); diff against the export delta for completeness. The highest-leverage de-risker.
2. **Run the cross-repo by-name grep** (or issue the ask) for `/api` + the renamed-subpath consumers across muster/speedtest/slides/value.js-demo/fourier — muster is CONFIRMED, the rest are unverified. Decides the B7 ask roster.
3. **Make the regen gate fail-CLOSED** (classify-or-error per ui/custom dir) + add the symbol-fidelity existence-check over all 18 hand-mapped sources; spec the verify-export-types post-build binding proof.
4. **Settle the 2 new user decisions** (thin-router, tests-tree mechanism) + the 5 carried §5 framing-Qs — these gate the final wave count and the B4f hard-gate definition.
5. **Spec the tests-tree codemod** (mirror P4's structure over the 219 tests imports) + the public-surface.spec/smoke-spec rewrites as the export-reshape binding tests, if mechanism (b) is chosen.
6. **Author the WS12-anchored band table** with the 4 newly-folded sub-moves (tests-tree, ci.yml re-emit, flatten-dts re-author, files[] audit) wired into B2/B3/B5 with their per-move evidence.

With those six closed, the durable BH PLAN + per-wave docs are authorable. The Pass-2 basis is the seed: mechanism-proven, sequencing-corrected, completeness-swept — pending the /api map + the two framing decisions.
