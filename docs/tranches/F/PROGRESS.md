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
