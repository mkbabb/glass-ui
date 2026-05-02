# F - Progress Log

## 2026-05-02 - Tranche Planned From Eight-Lane Audit

The requested planning prelude completed against current `HEAD` with a clean worktree at start.

Read context:

- `docs/instructions/**`
- `docs/precepts/**`
- `docs/precepts/instructions/tranche/**`
- C, D, D-II, and E tranche plans, progress, final notes, audits, research, and selected waves
- Aurora design/spec lineage and current implementation notes

Eight audit lanes were used to synthesize F:

- plan/process lineage;
- frontend component/composable/store contracts;
- Tailwind/CSS/style authority;
- Aurora runtime/shader/studio;
- dock/navigation/layering/blur;
- public surface/dead code/consumer drift;
- velocity/proof/profiling substrate;
- story/demo substrate.

Accepted tranche shape:

- F is `Interaction, Style, And Rendering Contract Hardening`.
- Old plugin-first F is retired.
- W0 remains a formal current-state ledger wave before implementation.
- W1 starts with proof substrate and consumer enforcement to speed later work.
- Dock, component contracts, style/theme, and Aurora hardening proceed in separate waves with exact file ownership.
- W6 closes with runtime/profile/residual evidence.

No product/source/config/consumer implementation changes were made in this planning step.

Open:

- Begin F.W0 with read-only ledgers and challenge update.
- Amend W1-W5 file ownership from W0 before any implementation dispatch.

## 2026-05-02 - F.W0 Current-State Ledgers Closed

W0 ran the requested parallel audit as a read-only product/source pass and wrote the formal ledgers:

- `audit/W0-plan-lineage.md`
- `audit/W0-consumer-public-surface.md`
- `audit/W0-component-contracts.md`
- `audit/W0-style-theme-ledger.md`
- `audit/W0-dock-navigation-ledger.md`
- `audit/W0-aurora-ledger.md`
- `audit/W0-velocity-ledger.md`
- `audit/W0-story-ledger.md`

Fast proof observed during W0:

- `npm run iter-check`: pass
- `npm run iter-test`: pass, 13 files / 233 tests
- `npm run verify-export-types`: pass

W0 accepted one implementation path:

1. W1 builds durable proof substrate and fixes active consumer drift.
2. W2 repairs dock/navigation contracts.
3. W3 repairs component safety/state/lifecycle contracts.
4. W4 repairs Tailwind/theme/style authority.
5. W5 repairs Aurora runtime/shader/studio correctness.
6. W6 re-audits and closes with artifacts.

No source, style, script, test, package, or consumer implementation changes were made in W0. W1 is the next implementation wave.

## 2026-05-02 - F.W1 Proof Substrate And Consumer Contract Closed

W1 landed durable proof scripts and migrated the active consumer drift identified by W0.

Glass-ui changes:

- added `proof:package`, `proof:consumers:static`, `proof:consumers:build`, `proof:runtime`, and `profile:bundle`;
- updated `validate-consumers.sh` to call the split consumer gates;
- updated `ay-close.sh` to run typecheck, build, export proof, tests, package fixture, consumer static/build proof, runtime smoke, and bundle profile;
- refreshed README import examples so non-core components use explicit subpaths;
- documented the W1 proof and consumer contract artifacts.

Consumer changes:

- `../bbnf-lang/playground`: migrated dock/search/sidebar/controls imports to explicit subpaths;
- `../speedtest`: migrated Aurora/dock/control/tabs/metric/pulse/toggle/tooltip/expandable imports to explicit subpaths and removed `glass-ui/src` source references.

Evidence:

- `npm run iter-check`: pass
- `npm run iter-test`: pass, 13 files / 233 tests
- `npm run verify-export-types`: pass
- `npm run proof:consumers:static`: pass, artifact `audit/W1-consumers-static.json`
- `npm run proof:consumers:build`: pass, artifact `audit/W1-consumers-build.json`
- `npm run proof:package -- --build`: pass, artifact `audit/W1-package-proof.json`
- `npm run profile:bundle`: pass, artifact `audit/W1-bundle-profile.json`
- `npm run proof:runtime`: pass, 71 routes, artifact `audit/W1-runtime-smoke.json`

Notes:

- sibling consumer repositories had unrelated dirty work before W1; W1 preserved it and recorded the active contract proof in this repository;
- runtime screenshots were captured locally under `audit/screenshots/W1/runtime/` and remain git-ignored PNG files.

W2 is now unblocked.

## 2026-05-02 - F.W2 Dock, Rail, Layering, And Navigation Closed

W2 hardened the dock family as one substrate:

- added typed dock context for owner id, orientation, and scoped popover registry;
- made `DockLayerGroup` inherit orientation from `GlassDock` unless explicitly overridden;
- removed raw HTML icon rendering from `DockLayerGroup`;
- replaced hard-coded layer transition cleanup with CSS-derived duration/delay and transition cancel/end cleanup;
- made dock transition state real for click-away suppression;
- removed arithmetic popover z-index and scoped popover coordination per dock;
- marked dock-owned popovers, dropdowns, selects, and popovers with explicit `data-glass-dock-*` owner attributes;
- rewired category/rail stories to consume `DockIconButton`;
- added a rail-hosted layer stack route sample to prove vertical inheritance.

Evidence:

- `npm run iter-check`: pass
- `npm run iter-test`: pass, 13 files / 234 tests
- `npm run iter-build`: pass
- `proof:runtime` with W2 artifact env: pass, 71 routes, artifact `audit/W2-runtime-smoke.json`

Dock-specific runtime assertions passed for computed blur, owned portal markers, and vertical layer inheritance. W4 still owns dock CSS authority convergence.

W3 is now unblocked.

## 2026-05-02 - F.W3 Component Contracts And Vue Idioms Closed

W3 repaired the component safety, state, and lifecycle contracts identified by W0:

- `FuzzySearch` now renders highlight segments as Vue text/`mark` nodes instead of generated HTML;
- fuzzy search caches are scoped per index instance and debounce timers are cleaned on source changes, close, and owner disposal;
- `ProgressiveSidebar` renders transformed titles as text, not consumer-provided HTML;
- `MultiSelect` renders string icons as literal text and supports component icons without reactive component warnings;
- `DataTable` supports `getRowId`, nested `rowKey`, duplicate/missing identity warnings, and object-identity fallback;
- `TypewriterText`, `ExpandableContainer`, and `useGlassCarousel` clean owned timers, body locks, and viewport listeners;
- unused empty custom directories were removed.

Evidence:

- `npm run iter-check`: pass
- `npm run iter-test`: pass, 18 files / 249 tests
- `npm run iter-build`: pass
- `proof:runtime` with W3 artifact env: pass, 71 routes, artifact `audit/W3-runtime-smoke.json`
- `rg -n "v-html" src demo`: no matches
- `git diff --check`: pass

W4 is now unblocked.

## 2026-05-02 - F.W4 Tailwind Theme And Style Authority Closed

W4 corrected the style substrate and proved it at compile/runtime boundaries:

- Tailwind v4 theme namespaces now generate the expected text, font, leading, tracking, color, shadow, radius, z-index, easing, duration, blur, and animation utilities;
- runtime tokens remain the semantic design source, while `@theme` entries are explicit utility-generation bridges;
- dock styling now has one authority in `src/styles/dock.css`; dock SFC scoped style blocks were removed;
- retired orphan utilities and undefined shimmer/progress drift were removed;
- toast/notification z-indexes, glass transitions, and story/configurator shadow surfaces now use named tokens;
- W0-named brittle selectors were narrowed or removed, including broad `:deep(*)`, touched-surface `transition: all`, and raw z-index constants;
- runtime proof can now capture extra screenshot routes through environment variables, and bundle profiling can write wave-specific artifacts.

Evidence:

- `npm run proof:theme`: pass, artifact `audit/W4-tailwind-theme-proof.json`
- `npm run iter-check`: pass
- `npm run iter-test`: pass, 18 files / 259 tests
- `npm run iter-build`: pass
- `npm test -- tests/public-surface.spec.ts`: pass, 154 tests
- `proof:runtime` with W4 artifact/screenshot env: pass, 71 routes, artifact `audit/W4-runtime-smoke.json`
- `profile:bundle` with W4 artifact env: pass, artifact `audit/W4-bundle-profile.json`
- `git diff --check`: pass

Measurements:

- CSS changed from 44143 bytes / 7056 gzip at W1 to 26518 bytes / 4847 gzip at W4.
- Total bundle changed from 403503 bytes / 102634 gzip at W1 to 390524 bytes / 101781 gzip at W4.

No W4 residual remains. W5 is now unblocked.

## 2026-05-02 - F.W5 Aurora Runtime, Shader, And Studio Hardening Closed

W5 hardened Aurora without changing its one-component, single-pass WebGL2 thesis:

- live runtime contexts now default to `preserveDrawingBuffer: false`;
- capture/thumbnail runtimes opt into preservation through explicit runtime options;
- `renderAt()` is now a draw-only path and no longer mutates RAF, start time, cursor easing/decay, or running state;
- dead `uDpr` and `mediumSmooth` shader/runtime surface was removed;
- `uBrokenColor` now drives deterministic oil-stroke and crayon pigment jitter;
- `bestOil()` consumes caller-provided flow, so crosshatch and alternate layer flow are live;
- `AuroraConfigDock.vue` was split from 595 lines into a 106-line shell plus colocated layer components/composables;
- `profile:aurora` benchmarks live media and shared thumbnail capture, and `ay-close.sh` now runs it;
- runtime smoke now asserts `/aurora` has a live WebGL2 canvas with live-mode preservation disabled.

Evidence:

- `node --check scripts/profile-aurora.mjs && node --check scripts/proof-runtime.mjs`: pass
- `npm run iter-check`: pass
- `npm run iter-test`: pass, 18 files / 259 tests
- `npm run iter-build`: pass
- `npm run build`: pass, declaration generation completed with the existing API Extractor TypeScript-version warning
- `npm run verify-export-types`: pass
- `npm run profile:aurora`: pass, artifact `audit/W5-aurora-profile.json`
- `proof:runtime` with W5 artifact/screenshot env: pass, 71 routes, artifact `audit/W5-runtime-smoke.json`
- `profile:bundle` with W5 artifact env: pass, artifact `audit/W5-bundle-profile.json`
- `git diff --check`: pass

Measurements:

- `profile:aurora`: 16 live cases, 22 thumbnail cases, 0 failures, 0 page errors.
- smooth/pastel/watercolor DPR 2 P95 frame timing stays under 10 ms.
- oil gestural DPR 2 is the measured heavy path: median 25.5 ms, P95 33.6 ms, 87 over-budget frames.
- thumbnail capture through one shared context: DPR 1 P95 4.6 ms, DPR 2 P95 17.2 ms.
- `aurora.js` changed from 46748 bytes / 15190 gzip at W4 to 47958 bytes / 15590 gzip at W5.

No W5 correctness residual remains. W6 is now unblocked and should classify the measured oil DPR 2 cost as accepted heavy-mode behavior or a named follow-on.

## 2026-05-02 - F.W6 Runtime/Profile Close And Residual Audit Closed

W6 ran six audit lanes over public surface, active consumers, component contracts, style/theme, dock/stories, and Aurora/profile. The audit found several close blockers, which were resolved before the final gate:

- public root policy now derives from intended core roots instead of `src/index.ts`;
- dock internals were removed from the public dock subpath and exact dock export tests were added;
- Aurora oil `strokeAmount` now controls main stroke opacity, and dead `uRes` shader/runtime surface was removed;
- `/aurora` runtime smoke now proves nonblank sampled pixels with live `preserveDrawingBuffer: false`;
- Aurora profiler cleanup now waits for Chrome process exit and retries profile-directory removal;
- dock click-away listener installation cancels deferred `requestAnimationFrame` work on collapse/unmount;
- Tailwind `@theme` container drift, retired `--font-size-base`, unconsumed `.shadow-cartoon-sm-hover`, and rem-to-px dock popover offset parsing were corrected.

Final close evidence:

- `scripts/ay-close.sh`: pass
- full typecheck: pass
- full build: pass, with the existing API Extractor TypeScript-version warning
- `verify-export-types`: pass
- `iter-test`: pass, 18 files / 266 tests
- `proof:package`: pass, artifact `audit/W6-package-proof.json`
- `proof:consumers:static`: pass, artifact `audit/W6-consumers-static.json`
- `proof:consumers:build`: pass, artifact `audit/W6-consumers-build.json`
- `proof:theme`: pass, artifact `audit/W6-tailwind-theme-proof.json`
- `proof:runtime`: pass, 71 routes / 0 failures, artifact `audit/W6-runtime-smoke.json`
- `profile:bundle`: pass, artifact `audit/W6-bundle-profile.json`
- `profile:aurora`: pass, artifact `audit/W6-aurora-profile.json`

Measurements:

- W6 bundle: 392754 bytes / 102358 gzip.
- W6 CSS: 26518 bytes / 4847 gzip, unchanged from W4 after the style authority reduction.
- W6 Aurora profile: 16 live cases, 22 thumbnail cases, 0 failures, 0 page errors.
- Oil gestural DPR 2 remains the accepted heavy path: 25.2 ms median / 33.8 ms P95 with live preservation false.

Residuals:

- Five accepted P3 residuals are recorded in `audit/W6-residuals.md`.
- No named next tranche is opened.

F is complete. See `FINAL.md`, `audit/W6-close-proof.md`, and `audit/F-retro.md`.
