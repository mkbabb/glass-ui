# Round 2B (confirmation pass) — Adversarial on-disk verification of the 8 remaining round-1 BJ headline claims (glass-ui @ codex/bi-p-q-execution)

## Summary

All 8 round-1 headline claims survive adversarial re-verification: every one is CONFIRMED with fresh file:line and dist evidence; none refuted. The only corrections are locational, not substantive — the demo lives at top-level demo/ (not src/demo/), so StoryPage.vue (claim 3), SectionLanding/CatalogLanding.vue (claim 4), and AppShell.vue (claim 6) are all real files under demo/; and 3 of the 5 named literal-mirror gates (claim 2) sit under tests/demo and tests/components/ui/dialog rather than tests/styles (charter gave bare filenames). Most severe: the chip/atom CSS orphan (claim 1) is provably shipped-broken — dist/glass-ui.css and dist/styles/* contain 0 occurrences of .glass-chip/.glass-atom, the partials are @imported by no closure, so chip-specific rules (remove button, cell/icon layout, selectable checkmark, interactive states) are dead in the published bundle even though Chip.vue/chipVariants.ts/badge emit those classes. Independent gate census: 180 test files, 1055 it/test blocks, 248 describe blocks; the cited --story-article-w token (claim 3), proof:squircle-language gate (claim 8), and scheme-spring dock/transient mirror (claim 5) all verified.

## Findings (8)

### [critical] orphaned-css-import-closure

**Claim:** chip-CSS orphan: glass-chip.css + glass-atom.css exist but are @import-ed by NO closure, so their rules never ship — shipped dist confirms zero .glass-chip/.glass-atom rules.

**Evidence:** src/styles/glass/glass-chip.css and src/styles/glass/glass-atom.css exist. src/styles/glass.css @imports 19 partials (material, ladder, ladder-undershadow, grain-overlay, accent-tone, rim, surfaces, surfaces-pager, control-surfaces, glass-capsule, liquid-fill, surface-axis, material-roles, reveal, liquid-enter, deep, defined, squircle) — NONE is glass-chip.css or glass-atom.css. src/styles/index.css @import list (lines 174-252) likewise omits them. `grep -rn '@import' src/ | grep -i chip|atom` = empty. Emitters: chipVariants.ts:4 base='glass-chip glass-capsule accent-tone…', :6 'glass-chip--interactive', :14 'glass-chip--cell', :15 'glass-chip--icon'; Chip.vue:122 'glass-chip__content', :125 'glass-chip__remove'; badge/index.ts:27 glass variant='… glass-atom'. dist proof: `grep -c glass-chip dist/glass-ui.css`=0, dist/styles/components.css=0, dist/styles/index.css=0, dist/styles/glass.css=0. Standalone dist/styles/glass/glass-chip.css + glass-atom.css are copied but never @imported. Chips still inherit .glass-capsule (which IS imported), but all chip-specific rules (--remove button, --cell/--icon layout, selectable ::after checkmark, interactive states in glass-chip.css:27-134) are dead.

**Proposed:** CONFIRMED with fresh dist evidence. The claim is exact — both partials are absent from every @import closure and produce zero rules in the shipped bundle.

### [major] undefined-custom-property-reference

**Claim:** --story-article-w has zero definitions repo-wide yet StoryPage.vue references it for the page-variant article width.

**Evidence:** demo/chassis/page/StoryPage.vue:51 sets maxInlineSize to 'var(--story-article-w)' when variant==='page' (else var(--story-page-max-inline), line 52). `grep -rn -- '--story-article-w\s*:' demo/ src/` = empty (zero declarations). The token is only authored in proposal docs: docs/tranches/BD/greenfield/story-page-standard/GOLDEN.md:195 and golden/spike.html:26 — never shipped into a token file. Result: page-variant story articles resolve max-inline-size against an undefined custom property (guaranteed-invalid → property drops to its initial `none`), so the intended φ-derived wide article width never applies. NOTE: charter looked in src/ where no StoryPage exists; the file lives at demo/chassis/page/ (top-level demo/, not src/demo/).

**Proposed:** CONFIRMED. Reference exists (StoryPage.vue:51), definition does not — the dangling-token bug is real; only the file path in the round-1 claim (src vs demo/) needed correction.

### [major] unset-prop-default-no-consumer-override

**Claim:** Card defaults metal:'gold' + grain:true and no consumer ever overrides them, so every Card ships gold-metal + grained.

**Evidence:** Card.vue withDefaults block (lines 28-40): line 29 material:'elevated', line 33 grain:true, line 39 metal:'gold'. (Charter cited 31-39; metal is exactly line 39, grain line 33 — within the block.) 88 `<Card` usages across demo/; `grep '<Card' demo/ | grep -i 'metal|grain'` = empty and `grep 'metal=|:metal=|grain=|:grain='` in demo/ only hits data-metal on <span> elements in demo/stories/substrates/glass-material.vue:371-377, never a Card prop. So no consumer sets metal or grain — every rendered Card inherits the gold+grain defaults.

**Proposed:** CONFIRMED. Defaults and zero-consumer-override both verified on disk.

### [major] stale-source-of-truth-mirror-comment

**Claim:** scheme-spring.css dock mirror comment still says (0.68s, ζ=0.64) while springPresets.ts (the declared source of truth) says response 0.30 / dampingFraction 0.82; the transient row is missing from the mirror table.

**Evidence:** src/styles/tokens/scheme-spring.css:31 comment: 'dock: (0.68s, ζ=0.64) — the WEIGHTY iOS-27 gooey morph…'. springPresets.ts:95-99 dock row: response:0.3, dampingFraction:0.82. The comment at scheme-spring.css:25-26 explicitly claims the table is 'mirrored by these numbers' / 'single source' — so it is a stale mirror. The comment table (lines 28-33) lists smooth/snappy/bouncy/gentle/dock/press — NO transient row — yet springPresets.ts:109-113 defines transient (response 0.62, dampingFraction 0.9) and --spring-transient IS generated at scheme-spring.css:101. Both halves of the claim hold.

**Proposed:** CONFIRMED. Dock numbers diverge (0.68/0.64 comment vs 0.30/0.82 source) and the transient preset is absent from the mirror table despite being a live preset+token.

### [major] hardcoded-value-ignores-manifest

**Claim:** SectionLanding.vue and CatalogLanding.vue hardcode hero-scale='4' instead of reading the manifest's heroScale (which the manifest/router intend as 'hero').

**Evidence:** demo/chassis/landing/SectionLanding.vue:28 `hero-scale="4"`; demo/chassis/landing/CatalogLanding.vue:18 `hero-scale="4"` — both literal. demo/router.ts:34 comment: '// heroScale: "hero", depth: "D1" (no new component — SectionLanding composes…'. demo/stories/manifest.ts:76,134 define heroScale field; demo/chassis/page/StoryPage.vue:30 reads `current.value?.story.heroScale ?? "4"` (the correct pattern) and StoryHero.vue:24 accepts 'hero' as a valid value — but the two landing components bypass the manifest and pin '4'.

**Proposed:** CONFIRMED. Both landing files hardcode hero-scale='4'; the manifest/router intend 'hero', and the sibling StoryPage reads it dynamically — the landing components diverge.

### [minor] eager-static-import-boot-graph

**Claim:** AppShell.vue static-imports PresetEditor, Aurora, and both docks (eager boot graph); the built demo entry preloads a large chunk graph.

**Evidence:** demo/shell/AppShell.vue static imports: line 11 `import { Aurora } from '@glass/components/aurora'`, line 26 `import { PresetEditor } from './configurator'`, line 27 `import SidebarDock`, line 28 `import BottomDock` — all top-level (eager), not `() => import()`. dist-demo/index.html contains 73 `modulepreload` links; dist-demo/assets has 285 JS chunks totaling 3.3M; largest chunks: aurora-hero 284KB, index 105KB, Blob 94KB, StoryHero 63KB, aurora 59KB. (Routes themselves are lazy per AppShell.vue:105 comment, but the shell pulls Aurora+PresetEditor+docks into the eager graph.)

**Proposed:** CONFIRMED. Static imports verified; dist-demo ballpark measured (73 modulepreloads / 285 chunks / 3.3M).

### [minor] dead-token-referencing-removed-gate

**Claim:** --corner-k-soft/-sharp have zero var() consumers and the proof:squircle-language gate the comment cites no longer exists in the shipped tree.

**Evidence:** src/styles/theme/radius.css:118 `--corner-k-soft:1.7;` and :119 `--corner-k-sharp:2.4;`. `grep -rn 'var(--corner-k-soft|var(--corner-k-sharp' src/` = empty (zero consumers). radius.css:113 comment claims they 'ARE pinned by proof:squircle-language'. But: main-tree scripts/ has NO proof-squircle-language.mjs and NO gates.mjs (both exist ONLY under .claude/worktrees/*); package.json has 19 scripts, none proof:*/squircle, and `grep -c squircle package.json`=0. The gate was abrogated — the comment references a proof that is absent from the shipped repo, so the tokens are unpinned dead code.

**Proposed:** CONFIRMED. Zero var() consumers and the cited gate is absent from scripts/ and package.json (survives only in worktrees).

### [note] literal-mirror-test-census

**Claim:** Gate census: independent vitest count and the 5 named literal-mirror gates exist as described.

**Evidence:** Independent count: 180 *.test.ts files under tests/; 1055 it/test blocks; 248 describe blocks. All 5 named literal-mirror gates confirmed (3 at dirs other than a naive tests/styles/, but charter gave bare filenames): (1) tests/styles/glass-subtlety.test.ts:63-66 asserts blurRadius(...).toBe(7/7/11/11); (2) tests/components/ui/dialog/graded-backdrop.test.ts:126-141 matches /--glass-halo-blur:\s*20px;/ + blur(calc(34px…)); (3) tests/demo/aurora-stage-affordance.test.ts:100-103 asserts preset.interactivity.swirl===true, amplitude===0.45; (4) tests/demo/springs-story.test.ts:58-64 asserts style contains '--preview-start: 1.5rem' etc.; (5) tests/styles/typography.test.ts:14-16 matches /--type-proportional-ratio:\s*0\.7861513777574233;/. Each mirrors an exact source literal.

**Proposed:** CONFIRMED. Census counted independently (180 files / 1055 it|test / 248 describe); all 5 spot-checked gates exist and are literal-mirror asserts — none refuted.

