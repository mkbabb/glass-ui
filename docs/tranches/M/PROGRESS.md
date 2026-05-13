# M — Progress Log

## 2026-05-12 — Tranche open

M opens against L close `3e4d472` (v1.0.0 published; precept submodule local `b51047d`, push deferred per L coordination/speedtest-Y.md §8).

The tranche opens on six load-bearing research inputs (`docs/tranches/M/research/R{α,β,γ,δ,ε,ζ}-*.md` — 27,000+ words combined; provide research substrate but do NOT bind the wave plan in totality — the plan synthesis below absorbs only KISS-aligned proposals).

## 2026-05-12 — Revision (drop dev-kit; KISS to 5 waves)

Initial open commit `64105c6` proposed a 9-wave plan with `@mkbabb/dev-kit` as the W1 HEADLINE (a new published package collecting cross-cutting build/lint/test/release tooling). Revision drops dev-kit:

**Rationale**: dev-kit was premature abstraction — Rε's own §H.4 anti-pattern explicitly warned "don't proactively create @mkbabb/std"; the duplication inventory is mostly trivial 5-line helpers + config files that don't need an npm package; the user's M-open directive ("consumer repos too — list them ALL") was constellation audit + migrate, not package invention. Per V3 (NO legacy code) + V4 (architectural transpositions for elegance) + KISS: the HEADLINE substrate of M is the constellation-wide consumer migration itself, not the meta-abstraction of glass-ui's tooling.

## Status

| Wave | Status | Notes |
|---|---|---|
| W0 | **CLOSED 2026-05-12** at `e385879` | 5 lanes executed (I recon + II precept reconcile + III words+bbnf-buddy + IV fourier-analysis + V CONSTELLATION ratify + v1.0.4 carousel patch); precept reconciled at `08a2e9c` on origin/main; retired-subpath drift = 0 across all 3 broken consumers; glass-ui v1.0.4 patches MIGRATION.md §1.2 carousel-subpath contract |
| W1 (HEADLINE) | **CLOSED 2026-05-12** at `0e0a9a9` | 6 per-consumer lanes executed (A keyframes.js / B value.js / C fourier-analysis / D words / E bbnf-buddy / F speedtest-post-Y); 5 per-consumer commits landed (keyframes + value local-only on WIP branches; fourier + words pushed to origin/master; bbnf-buddy local-only — no origin remote); speedtest handoff DONE (Y closed long ago — speedtest already past Z + AA tranches) |
| W2 | **CLOSED 2026-05-12** | 3 lanes (A F-ε-3 CLOSED via source fix + B api/ extensions: 5 types promoted to v1.0.5 surface + C 9/11 cosmetic residuals absorbed) |
| W3 | **CLOSED 2026-05-12** | 2 lanes (A 3 stale-repo dispositions: 2 FORMAL-RETIRE + 1 MOVE-OUT-OF-CONSTELLATION + B doc cohort: 11 glass-ui docs refreshed) |
| W4 | pending W2 + W3 | close ceremony — 7-agent strengthened audit + cross-constellation ι reflog scan + FINAL.md |

## 2026-05-12 — W0 close

5 lanes executed in parallel:
- **Lane I (Explore agent, read-only)**: `docs/tranches/M/audit/W0-reconciliation.md` — 42 findings CONFIRMED across Rα/β/γ/δ/ε/ζ; constellation snapshot per repo at HEAD.
- **Lane II (orchestrator-solo)**: precept submodule REAUDIT-stream reconciliation. Strategy (d) full re-baseline via cumulative-diff apply + 3-way merge resolution in 4 files (LESSONS-LEARNED.md / ORCHESTRATION.md / AGENT_DISPATCH_TEMPLATE.md / SPEC.md). M.Rδ P1 (`git checkout <path>` extension) + P3 (MULTI-WRITER mode) + P6 (dual ceiling) integrated inline at conflict-resolution. Result: precept submodule `08a2e9c` on origin/main; backup branch `m-w0-pre-rebaseline @ b51047d` retained.
- **Lane III (claude agent, cross-repo)**: `docs/tranches/M/audit/W0-Lane-III-retired-subpath-words-bbnf-proof.md` — words/frontend: 3 retired-subpath imports transposed to local `@/composables/virtual/` (v0.9.4 reference impls; pure, vueuse-free); package.json pin re-pointed `file:./glass-ui` → `file:../../glass-ui`; 6 root-barrel vueuse-bearing imports migrated to subpaths. bbnf-buddy: 0 retired-subpath imports (Rα §A.5 plan claim was incorrect); 2 root-barrel `useGlobalDark` migrated to `/dark`.
- **Lane IV (claude agent, cross-repo)**: `docs/tranches/M/audit/W0-Lane-IV-retired-subpath-fourier-proof.md` — fourier-analysis/web: 2 `useOffsetPagination` migrated via local 60-LOC fork of v0.9.3 reference (vueuse signature was a workaround, not a 1:1 swap); 1 `useGlobalDark` migrated to `/dark`.
- **Lane V (orchestrator-direct)**: surfaced glass-ui substrate defect at MIGRATION.md §1.2 (`/carousel` subpath only re-exported `useCarousel + CarouselApi`, not the full Carousel* component family); fixed in `src/carousel.ts`; CHANGELOG v1.0.4 entry; package.json bumped to 1.0.4. CONSTELLATION.md §1 + §9 updated with W0 close state.

Cross-repo writes (per CONSTELLATION.md §6 MULTI-WRITER mode + ORCHESTRATION.md cross-repo commit policy): all 3 peer repos (words/frontend, bbnf-buddy, fourier-analysis/web) were found to hold substantial pre-existing in-flight v1.0 migration work outside the strict M.W0 Lane III/IV scope. Peer-repo commits DEFERRED to M.W1 per-consumer lanes — each lane absorbs both the agent's M.W0 retired-subpath fix AND the user's in-flight migration work into one coherent per-consumer commit per consumer.

## 2026-05-12 — W1 close (HEADLINE)

6 lanes executed in 2 batches (4+2 per M.Rδ P6 dual-ceiling — 4 parallel impl in Batch I + 2 parallel in Batch II respecting the 6-impl ceiling).

**Batch I (4 parallel):**
- **Lane A — keyframes.js**: 23 demo SFCs migrated to v1.0 subpaths (`/forms`, `/dark`, `/keyboard`, `/controls`, `/dock`, `/icon-tooltip`, `/labeled-field`). Build + typecheck + tests (218/218) PASS. 5 cross-cutting duplications DOCUMENT-AS-DIFFERENT (KEEP-AS-IS per KISS — keyframes identity is animation primitive; tooling divergence acceptable). Commit `b788205` on user's WIP branch `w.w2.1-keyframes-prebuild` (no push — orchestrator does not push WIP branches).
- **Lane B — value.js**: 27 root-barrel imports rewritten to v1.0 subpaths; 3 retired-upstream composables forked locally (`copyToClipboard`, `usePopupMutex`, `useLayerTransition`); 3 dead-barrel re-export shims dropped. Library + demo builds PASS. 6 duplications all KEEP-AS-IS / DOCUMENT-AS-DIFFERENT. Commit on user's WIP branch `w.w2.1-value-js-prebuild`.
- **Lane C — fourier-analysis/web**: 4 DockPopover→HoverPopover swaps across 2 files (`CanvasControlsDock.vue`, `EditorControlsDock.vue`). Typecheck + build PASS. Commit `301a95e` on master; pushed to origin.
- **Lane D — words/frontend**: 17 `glass-subtle` (13 CSS + 4 button-variant) + 1 `danger-subtle` → canonical `glass-wash` / `destructive` across 11 frontend/ files. `useLeaveTimer` phantom resolved (no glass-ui export; never consumed). vue-tsc + build PASS. Commit `0f16925` on master; pushed to origin.

**Batch II (2 parallel):**
- **Lane E — bbnf-buddy**: 22 root-barrel imports migrated to v1.0 per-package subpaths (10× `/dock`, 3× `/sortable-list`, 2× `/toggle-chip`, 1× `/controls`, 1× `/tabs`, 3× `/dark`); `ScrollArea`→`ScrollPane` rename propagated; `useLeaveTimer` phantom resolved as local impl at `src/composables/useLeaveTimer.ts`. npm install / typecheck / build / test (163/164; 1 pre-existing WASM diagnostic) all exit 0. Commit `e06d629` on master; bbnf-buddy has NO origin remote — commit local only.
- **Lane F — speedtest post-Y handoff**: Y tranche closed long ago; speedtest at HEAD `4bffa90f` past Z + AA tranches. Glass-ui v1.0.4 consumption clean; zero retired-symbol imports; vue-tsc PASS. NO source changes (Y handoff DONE). Surfaced: CONSTELLATION.md §1 "speedtest active tranche" cell stale — updated at W1 close.

## Per-consumer commit ledger

| Consumer | Branch | Commit | Push? |
|---|---|---|---|
| keyframes.js | w.w2.1-keyframes-prebuild (user WIP) | `b788205` | NO (user owns push) |
| value.js | w.w2.1-value-js-prebuild (user WIP) | (commit landed) | NO (user owns push) |
| fourier-analysis | master | `301a95e` | YES |
| words | master | `0f16925` | YES |
| bbnf-buddy | master | `e06d629` | NO (no origin remote) |
| speedtest | (no changes) | n/a | n/a |

Total constellation migration counts:
- 5 consumers migrated to glass-ui v1.0 subpath surface
- ~93 import sites rewritten across all consumers
- 0 retired-subpath imports remain across the constellation (verified via cross-repo rg)
- 6 lane proof docs + 1 reconciliation audit at `docs/tranches/M/audit/`

## Cross-repo coordination

Per `docs/tranches/M/coordination/CONSTELLATION.md`:

- **speedtest Y tranche** in flight; reader-only on speedtest during M except cross-repo coordination + post-Y handoff at M.W1 Lane F.
- **bbnf-lang** owns its own tranche-stream (AA-BD); shared precept submodule; coordinate jointly on M.W0 reconciliation.
- **words/frontend** BROKEN against v1.0.0 (3 retired-subpath imports + broken symlink) — M.W0 Lane III must-fix.
- **fourier-analysis/web** BROKEN against v1.0.0 (2 retired-subpath imports) — M.W0 Lane IV must-fix.
- **bbnf-buddy** + **keyframes.js** + **value.js**: M.W1 per-consumer migration.
- **mkb-utils**: no glass-ui dep at HEAD; out of scope unless lane-audit at glass-ui consumer-graph surfaces relevance.
- **vite-plugin-shebang** + **mathanim** + **fourier-animate**: M.W3 retire-or-refresh (default per KISS: prefer FORMAL-RETIRE over REFRESH).

## 2026-05-12 — W2 + W3 close (parallel)

W2 + W3 ran in parallel per the M plan §3 wave schedule. 5 lanes total (3 W2 + 2 W3), all under the M.Rδ P6 6-implementation-agent ceiling. All worktree-isolated W2 lanes integrated cleanly into main; W3 Lane A applied direct.

**W2 Lane A — F-ε-3 Configurator recursion CLOSED via source fix**
Three causal layers diagnosed and repaired:
1. (primary) reka-ui `<CollapsibleContent>` + `<Presence>` height-measurement watcher graph race under Lighthouse cold-load — replaced with CSS-only `grid-template-rows: 0fr ↔ 1fr` reveal (no JS watchers, no DOM-measurement) in `src/components/custom/configurator/ConfiguratorLayer.vue`.
2. (secondary) Vue 3 Boolean prop coercion forced `open === false` instead of `undefined` — `withDefaults({ open: undefined })` fix.
3. (tertiary) `MetaballCanvas.isSupported` reactive ref flipped post-WebGL-init under `--disable-gpu` — `isSupported` is now synchronous via `isWebGLSupported()` probe; `defineExpose` drop closes the asymmetric mount/unmount cycle.

Vitest fixture at `tests/configurator-recursion.spec.ts`: 6/6 PASS. Full test suite: 29 files / 339 tests PASS. Lighthouse@12.8.2 against `/motion/metaballs` errors-in-console score 0 → 1; items 1 → 0; BP 0.96. Puppeteer cross-verification under 1.5Mbps/750Kbps + 4× CPU throttle: pageerror count 15+ → 0; `[Vue warn]` traces 14+ → 0. Proof at `docs/tranches/M/audit/W2-Lane-A-F-eps-3-proof.md`.

**W2 Lane B — src/api/ canonical-type extensions**
5 types promoted to the canonical discovery surface (`src/api/index.ts` 32 symbols → 37 symbols):
- `GlassPanelVariant` (closes W1-B Open Q1 path-a)
- `ConfiguratorCloneMode`
- `TimelineSegment` + `TimelineSegmentGradient` + `TimelineSegmentState`

Build + verify-export-types + synthetic-consumer positive+negative probes all PASS. CHANGELOG v1.0.5 stanza prepended (35 lines). Proof at `docs/tranches/M/audit/W2-Lane-B-api-extensions-proof.md`. Disclosed precept violation: 1 `git stash push` (orphan stash dropped by orchestrator at integration; documented in proof § Precept compliance).

**W2 Lane C — L cosmetic residuals absorb**
9 of 11 cataloged residuals absorbed (82% — meets the ≥80% target):
- F-π-1 chart-chassis-palette 375 overflow (demo/stories/TokenLadder.vue + substrate fix)
- F-π-2 dashboard 375+1024 overflow (demo/stories/compositions/dashboard.vue)
- F-π-3 aurora overflow + G13 (demo/stories/aurora.vue)
- G16 dock-group story (demo/stories/primitives/dock-group.vue)
- G17 use-story-demo (demo/stories/composables/use-story-demo.vue)
- G4 motion/index.ts barrel style (src/composables/motion/index.ts)
- G14 ModalOverlay layout="edge" comment wording (src/components/ui/_shared/ModalOverlay.vue)

1 NO-CHANGE-REQUIRED (forms.ts Textarea hypothesis disproven); 1 deferred to W2 Lane B coordination (GlassPanelVariant promotion). Typecheck + build green. Viewport fixes Playwright-verified at 3 viewports. Proof at `docs/tranches/M/audit/W2-Lane-C-cosmetic-residuals-proof.md`. Disclosed precept violations: 2 `git stash` self-corrections (DEGRADED-ACKNOWLEDGED, documented).

**W3 Lane A — stale-repo retire-or-refresh dispositions**
3 dispositions delivered:
- `vite-plugin-shebang` → **FORMAL-RETIRE (soft)** — Rα claim of zero consumers was incorrect; `mailtyphoon` pins `^0.1.6` as devDep (dormant since 2024-01); npm tombstone retained; no Vite-5 bump.
- `mathanim` → **FORMAL-RETIRE** — dormant 5y (since 2021-02); 0 consumers; demo site identity (not a library); TS 4.1; not npm-published.
- `fourier-animate` → **MOVE-OUT-OF-CONSTELLATION** — Python (Poetry; matplotlib/numpy/scipy/opencv); no package.json; structurally outside `@mkbabb/*` Node namespace.

CONSTELLATION.md §1 + §4 + §9 refreshed. 2 escalations deferred to orchestrator-for-user-authorization (physical repo relocation; optional `npm deprecate vite-plugin-shebang`). Proof at `docs/tranches/M/audit/W3-Lane-A-stale-repo-decisions-proof.md`.

**W3 Lane B — doc cohort across constellation**
14 docs refreshed:
- 4 top-level: CLAUDE.md (subpath counts, AA tranche timeline section, carousel substrate note), README.md, DESIGN.md, MIGRATION.md
- 5 wave specs: W0.md / W1.md / W2.md / W3.md / W4.md status lines bumped to CLOSED with commit hashes
- CONSTELLATION.md §1 + §9 non-stale-repo rows refreshed (coordinating with Lane A)
- PROGRESS.md status hashes + W3 entry

Per-consumer doc proposals escalated:
- `keyframes.js` — propose `CHANGELOG.md` creation (`@mkbabb/keyframes.js@2.0.0` published; should have one). Cross-repo + WIP-branch coordination needed; named-deferred to N.
- `value.js` — verify publish status; same; named-deferred to N.
- `fourier-analysis` / `words` / `bbnf-buddy` / `speedtest` — private apps OR non-SemVer; no per-consumer CHANGELOG warranted.

Proof at `docs/tranches/M/audit/W3-Lane-B-doc-cohort-proof.md`.

**Open questions surfaced (for M.W4 absorb):**
- 26 pre-existing typecheck errors in `demo/stories/data/timeline-{continuous,segmented}.vue` (AA.W1 commits) — surfaced for M.W4 ι integrity-sweep or fast-follow patch.
- Substrate-tier dock-layer regression flagged by W2 Lane C (NEW out-of-bounds finding) — needs M.W4 disposition.
- Demo metaballs story still uses legacy `v-if="isSupported"` + `?? true` fallback pattern (W2 Lane A Open Q #1; structurally safe, but could be cleaned up).

**Precept compliance: 3 `git stash` agent-side violations** (W2 Lane B + 2× W2 Lane C). All recoverable; orphan stash dropped. The 4th recurrence of the stash anti-pattern (per LESSONS-LEARNED 2026-05-09); M.W4 ι integrity-sweep flags this as a class.

## Brittleness window

- **W1 declares** `breaking_changes_during_wave: per-consumer yes/no`. Each consumer-migration may surface its own consumer-side issues. NO reserve wave (KISS) — residuals absorbed inline OR named-deferred to N.

## Provisional carry-forward to N

To be enumerated at M.W4 close.

## Awaiting dispatch authorization

Per M-open user directive M7 ("This is for a tranche development session, not an implementation one"), the open commits land the planning substrate only. Implementation dispatch awaits explicit user directive analogous to K + L pattern.
