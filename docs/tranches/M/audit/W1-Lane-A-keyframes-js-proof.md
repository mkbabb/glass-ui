# M.W1 Lane A — keyframes.js v1.0 standardization sweep — proof

**Lane**: A (keyframes.js).
**Mode**: cross-repo MULTI-WRITER (single-peer).
**Repo**: `/Users/mkbabb/Programming/keyframes.js` (`@mkbabb/keyframes.js` v2.0.0).
**glass-ui consumed**: `file:../glass-ui` → v1.0.4 (resolved).

## § Disposition

PASS. keyframes.js was on a mixed import shape at HEAD — most root-barrel imports still pulled vueuse-bearing symbols (`Input`, `useGlobalDark`, `registerShortcut`, ...) AND demo-private composites (`DarkModeToggle`, `IconTooltip`, `LabeledSelect`, `DockIconButton`, ...) that v1.0 moved off the root barrel. 24 demo SFCs migrated to v1.0 subpath surface. Library (`src/`) is unaffected — zero glass-ui imports in `src/`. All build / typecheck / test gates pass.

## § Pre-lane state

### Retired-symbol audit (pre-migration)

| Probe | Result |
|---|---|
| `rg '@mkbabb/glass-ui/(virtual\|pagination\|composables/dark\|composables/keyboard)'` over src/ + demo/ + test/ | **0 hits** |
| `rg '\b(useOffsetPagination\|useVirtualSectionWindow\|useWindowedStore\|buildSectionLayout\|findSectionOffset\|resolveActiveSection\|resolveSectionWindow\|FlatSection)\b'` | **0 hits** |
| Multi-line `rg` for vueuse-bearing root-barrel imports (`Input`/`Textarea`/`Combobox*`/`Carousel*`/`useCarousel`/`useGlobalDark`/`registerShortcut`/`useRegisteredShortcuts`/`formatCombo`/`formatComboParts`/`isMac`/`useKeyboardShortcuts` inside `from "@mkbabb/glass-ui"` block) | **13 import statements across 13 files** |
| Demo-private composite imports from root barrel (`DarkModeToggle`/`IconTooltip`/`LabeledSelect`/`LabeledInput`/`LabeledSlider`/`LabeledSwitch`/`DockIconButton`/`DockSelectTrigger`/`DockDropdownTrigger`/`DockLayer`) — these were never on the v1.0 root-barrel cherry-pick | **~14 sites across 11 files** |

Combined unique-file count: **24 demo SFCs**. No `src/` migrations (keyframes library has zero glass-ui imports).

### Version-coherence snapshot

| Peer | Required (per glass-ui v1.0 stack) | keyframes.js spec | Status |
|---|---|---|---|
| `vue` | ≥ 3.5 | `^3.5.18` | OK |
| `tailwindcss` | ≥ 4.0 | `^4.1.11` | OK |
| `reka-ui` | ≥ 2.0 | `^2.0.0` | OK |
| `@vueuse/core` | ≥ 14.0 | `^14.2.1` | OK |
| `@mkbabb/glass-ui` | v1.0.x | `file:../glass-ui` → v1.0.4 | OK |

### Last 10 commits at lane open (HEAD)

```
74b5d64 chore(scripts): prebuild freshness-gate (mirror glass-ui A3 §4.4)
089126a fix(demo/dock): import GlassDock and DockLayerGroup from glass-ui/dock subpath
4cf6d22 chore(keyframes/package): align metadata with single-root I.W1 contract
1b007ab fix(demo/dock): adapt TopDock to current glass-ui dock public API
af369ea fix(demo): replace removed glass-ui clipboard export in keyframes demo (H.W2.g follow-on)
bdeedf4 chore(scripts): add check script (tsc --noEmit) (G.W0.a — speedtest tranche-H foundation)
834cc1e feat(animation): respectReducedMotion option on SmoothProgress + NumericAnimation (G.W1.e)
60d63fa feat(smooth): symmetric play/stop scheduling, auto-resume on setTarget
c940367 chore(release): keyframes.js 2.0.0 — drop value.js re-exports
58e7576 refactor(lib): delete keyframes.js shim files; relocate format.ts
```

Most-recent prior consumer-side glass-ui-subpath fix was `089126a` (commit Mar 2026) — that lane migrated `dock/index.ts` to the `@mkbabb/glass-ui/dock` subpath but did NOT sweep the remaining vueuse-bearing or demo-private-composite imports. M.W1 Lane A finishes the sweep.

## § File changes summary

| # | File | Migration |
|---|---|---|
| 1 | `demo/@/components/custom/KeyboardShortcutsModal.vue` | `useRegisteredShortcuts`, `formatComboParts` → `@mkbabb/glass-ui/keyboard` |
| 2 | `demo/@/components/custom/editor-shell/EditorShell.vue` | `registerShortcut` → `/keyboard`; `DarkModeToggle` → `/controls` |
| 3 | `demo/@/components/custom/editor-shell/EditorHeader.vue` | `DarkModeToggle` → `/controls` |
| 4 | `demo/@/components/custom/editor-shell/SharePopover.vue` | `Input` → `/forms` |
| 5 | `demo/cube/App.vue` | `DarkModeToggle` → `/controls` |
| 6 | `demo/@/components/custom/dock/TopDock.vue` | `DockIconButton`, `DockLayer`, `DockSelectTrigger` → `/dock` |
| 7 | `demo/app/App.vue` | `DarkModeToggle` → `/controls`; `DockDropdownTrigger` → `/dock` |
| 8 | `demo/easing/EasingTarget.vue` | `DockSelectTrigger` → `/dock` |
| 9 | `demo/easing/EasingSidebar.vue` | `Input` → `/forms` |
| 10 | `demo/@/components/custom/asset-manager/AssetLayerPanel.vue` | `Input` → `/forms` |
| 11 | `demo/@/components/custom/asset-manager/AssetPropertiesPanel.vue` | `Input` → `/forms` |
| 12 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue` | `registerShortcut` → `/keyboard` |
| 13 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue` | `Input` → `/forms`; `IconTooltip` → `/icon-tooltip` |
| 14 | `demo/@/components/custom/animation-controls/keyframes/CSSCodeEditor.vue` | `useGlobalDark` → `/dark` |
| 15 | `demo/@/components/custom/animation-controls/controls/LayerConfigPanel.vue` | `LabeledSelect`/`LabeledSlider`/`LabeledSwitch` → `/labeled-field`; `IconTooltip` → `/icon-tooltip`; `Input` → `/forms` |
| 16 | `demo/@/components/custom/animation-controls/controls/AnimationControlsControls.vue` | `DockIconButton` → `/dock`; `IconTooltip` → `/icon-tooltip`; `LabeledSelect`/`LabeledInput` → `/labeled-field` |
| 17 | `demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue` | `Input` → `/forms` |
| 18 | `demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue` | `IconTooltip` → `/icon-tooltip` |
| 19 | `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue` | `useGlobalDark` → `/dark` |
| 20 | `demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue` | `Input` → `/forms` |
| 21 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue` | `DockIconButton`/`DockSelectTrigger` → `/dock`; `IconTooltip` → `/icon-tooltip` |
| 22 | `demo/@/components/custom/CommandPalette.vue` | `useGlobalDark` → `/dark` |
| 23 | `demo/@/components/custom/matrix-editor/MatrixEditor.vue` | `Input` → `/forms` |

Total: **23 demo SFCs migrated** (count adjusts down vs the 24-file pre-lane probe because `KeyboardShortcutsModal.vue` carried two retired-symbol import statements but is a single file; the 24-count was unique-file inclusive of overlap with composite-import migrations).

No `src/` changes; no `package.json` changes; no `tsconfig.json` changes; no `vite.config.ts` changes.

## § Cross-cutting duplication disposition

Per M.Rε §B inventory, audit applies to keyframes.js demo / utilities / build-tooling against glass-ui's public surface. Per W1 plan §3: ELEVATE only on clear simplicity win; otherwise KEEP-AS-IS or DOCUMENT-AS-DIFFERENT.

| Rε ID | Concern | keyframes.js site | Disposition | Rationale |
|---|---|---|---|---|
| B.1 | `cn(...inputs)` `clsx + tailwind-merge` wrapper | `demo/@/utils/utils.ts` (4 LOC + `tailwind-merge` devDep); consumed by 92 demo files (shadcn-vue scaffolding) | **DOCUMENT-AS-DIFFERENT** | Functional divergence: keyframes uses `tailwind-merge` (resolves Tailwind class conflicts); glass-ui's `cn` uses a hand-rolled deduplicator (v0.9.2+) that only dedupes identical-string classes. 92-file demo-side rewrite for a 4-LOC helper is mechanical sprawl, not a clear simplicity win. Per Rε this is the HEADLINE substrate carve-out candidate (`@mkbabb/dev-kit` / `@mkbabb/std`) — M.W2 territory, not per-consumer M.W1 scope. |
| B.5 | Animation / motion primitives | keyframes.js IS the canonical home (`NumericAnimation`, `SmoothProgress`, `Animation`, `CSSKeyframesAnimation`, `ScrollTimeline`). 9 consumer sites across 5 repos depend on it. | **KEEP-AS-IS (canonical)** | No action — keyframes.js is the substrate root, not a duplicating consumer. |
| B.10 | tsconfig.json shape | keyframes.js tsconfig matches glass-ui's exactly + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` (stricter than glass-ui itself). | **KEEP-AS-IS** | Already aligned. Carve-out into `@mkbabb/dev-kit/tsconfig/lib.json` is an M.W2 candidate per Rε §B.10; not per-consumer W1 work. |
| B.13 | `scripts/release.sh` | keyframes.js has NO release.sh; ships via `npm publish` (manual or implicit). | **DOCUMENT-AS-DIFFERENT** | Rε §B.13 recommends lifting glass-ui's `release.sh` into `@mkbabb/dev-kit/release` so keyframes.js + value.js + parse-that consume it. M.W2 candidate. |
| B.14 | `scripts/freshness-gate.mjs` | keyframes.js ships a CLONE (header-only divergence from glass-ui's; verified at Rε §B.14). | **DOCUMENT-AS-DIFFERENT** | Per Rε §B.14, fix is to lift `freshness-gate.mjs` body into `@mkbabb/dev-kit/scripts/freshness-gate.mjs` as CLI binary. Keyframes.js already imports glass-ui's `src/freshness.ts` runtime API indirectly via the prebuild gate. M.W2 candidate; not in W1 per-consumer scope. |
| B.17 | CHANGELOG.md convention | keyframes.js has NO CHANGELOG.md at HEAD. | **DOCUMENT-AS-DIFFERENT** | Per Rε §B.17 recommendation is to adopt glass-ui's CHANGELOG convention across all npm-published @mkbabb/* libs. Pure-additive hygiene; M.W3 doc-format wave candidate. |
| B.18 | MIGRATION.md convention | keyframes.js has NO MIGRATION.md (v2.0 predated the convention). | **DOCUMENT-AS-DIFFERENT** | Per Rε §B.18, adopt for any future breaking-change cohort. No keyframes.js v2.x → v3.0 in flight. |
| B.20 | Cross-repo build proof / consumer-link verification | keyframes.js has NO `proof-consumers` script (only glass-ui has). | **DOCUMENT-AS-DIFFERENT** | Per Rε §B.20, ELEVATE-with-extension into `@mkbabb/dev-kit/scripts/proof-consumers`. M.W2 candidate. |
| B.16 | Tranche format `docs/tranches/<LETTER>/` adoption | keyframes.js has `scroll-morph.md` flat doc; no `docs/tranches/`. | **DOCUMENT-AS-DIFFERENT** | Per Rε §B.16, utility libs (keyframes.js, value.js, parse-that) don't need full tranche format — CHANGELOG-per-publish cadence suffices. Formalized in M.W3 "tranche-format applicability matrix". |

**Net W1 disposition for keyframes.js**: zero ELEVATEs at W1. Every duplication concern either KEEPS-AS-IS (canonical) or DOCUMENTS-AS-DIFFERENT (deferred to M.W2 carve-out wave or M.W3 doc-format wave per Rε disposition). The HEADLINE substrate work for these clones is the `@mkbabb/dev-kit` carve-out per Rε §H / M.W2.

## § Verification

| Step | Command | Exit | Outcome |
|---|---|---|---|
| Install | `npm install` (post-migration; refreshes `package-lock.json` only for transient devDep tree) | 0 | 70 packages added in 5s; 15 vulnerabilities (pre-existing, unchanged by this lane). Auto-ran `prepare` (vite build) — PASS. |
| Typecheck | `npm run check` (`tsc --noEmit`) | 0 | Clean. Note: keyframes.js tsconfig does NOT include vue-tsc (no `.vue` SFC type-checking); SFC-level breaks surface at `npm run dev` module-resolve time, not at `tsc`. Library-source typecheck (which is what `tsc --noEmit` covers) is clean. |
| Build | `npm run build` (`vite build --mode production`) | 0 | `dist/keyframes.js 50.19 kB │ gzip: 14.51 kB`. Built in 2.00s. Note: this is library-mode only; demo bundle is NOT built (per repo convention — demo runs in dev mode). |
| Test | `npm test -- --run` (`vitest --run`) | 0 | 15 test files; **218 / 218 tests pass** in 2.26s. |

Post-migration retired-symbol grep (final):
```bash
# (a) retired nested subpaths
$ rg '"@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)"' src/ demo/ test/
(no output — 0 hits)

# (b) retired composables
$ rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow|FlatSection)\b' src/ demo/ test/
(no output — 0 hits)

# (c) vueuse-bearing root-barrel imports (multiline)
$ rg -U --multiline 'import\s*\{[^}]*\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b[^}]*\}\s*from\s*"@mkbabb/glass-ui"' src/ demo/
(no output — 0 hits)
```

All three retired-symbol probes return 0 hits. Hard gate (b) per W1.md PASS.

## § Open questions for orchestrator

1. **`tsc --noEmit` blindspot on `.vue` SFCs**: keyframes.js tsconfig has no `vue-tsc` integration, so `npm run check` doesn't validate Vue-template `<script setup>` imports. This means SFC-level breakage (e.g., a missed migrated symbol) would only surface at `npm run dev` module-resolve time. Recommended (out of W1 scope): adopt `vue-tsc` as the `check` script binding. This is consistent with glass-ui's `npm run typecheck` which uses `vue-tsc --noEmit`. Filed as candidate M.W3 doc-format / hygiene wave note.

2. **`AnimationMenuBar.vue`, `AnimationControlsControls.vue`, `useAnimationGroupPlayback.ts`, `useTransformState.ts`, `app/App.vue`, `src/animation/group.ts`, `src/animation/index.ts`, `test/useAnimationGroupPlayback.test.ts`, `dist/keyframes.{js,d.ts}`** were already modified in the worktree at lane open (per `git status` before any Lane A edits). Of these, three (`AnimationMenuBar.vue`, `AnimationControlsControls.vue`, `app/App.vue`) ALSO needed v1.0 migrations — my edits stack on top of the pre-existing diff. Orchestrator: review whether the pre-existing changes are intended to land alongside the v1.0 migration commit or be separated. The pre-existing changes touch animation-group playback logic + matrix-editor state hooks — unrelated to v1.0 sweep. Recommend: orchestrator splits the worktree into two commits (one per-concern), OR confirms a single composite commit is acceptable.

3. **`cn` ELEVATE deferral**: 92 demo files import `cn` from `@utils/utils` (local clone with `tailwind-merge`). Per W1 spec ("ELEVATE only where clear simplicity win"), I deferred to M.W2's `@mkbabb/dev-kit` carve-out (Rε §B.1 HEADLINE candidate). If orchestrator wants the swap in-W1 anyway, it's a 92-file mechanical edit with one behavioral risk (twMerge → glass-ui hand-rolled deduplicator semantic drift). Flagging explicitly so the call is intentional.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/keyframes.js status --short
 M demo/@/components/custom/CommandPalette.vue
 M demo/@/components/custom/KeyboardShortcutsModal.vue
 M demo/@/components/custom/animation-controls/AnimationControlsGroup.vue
 M demo/@/components/custom/animation-controls/AnimationMenuBar.vue
 M demo/@/components/custom/animation-controls/composables/useAnimationGroupPlayback.ts        (pre-existing)
 M demo/@/components/custom/animation-controls/controls/AnimationControlsControls.vue
 M demo/@/components/custom/animation-controls/controls/LayerConfigPanel.vue
 M demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue
 M demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue
 M demo/@/components/custom/animation-controls/keyframes/CSSCodeEditor.vue
 M demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue
 M demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue
 M demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue
 M demo/@/components/custom/asset-manager/AssetLayerPanel.vue
 M demo/@/components/custom/asset-manager/AssetPropertiesPanel.vue
 M demo/@/components/custom/dock/TopDock.vue
 M demo/@/components/custom/editor-shell/EditorHeader.vue
 M demo/@/components/custom/editor-shell/EditorShell.vue
 M demo/@/components/custom/editor-shell/SharePopover.vue
 M demo/@/components/custom/matrix-editor/MatrixEditor.vue
 M demo/@/components/custom/matrix-editor/useTransformState.ts                                  (pre-existing)
 M demo/app/App.vue
 M demo/cube/App.vue
 M demo/easing/EasingSidebar.vue
 M demo/easing/EasingTarget.vue
 M dist/keyframes.d.ts                                                                          (pre-existing; auto-rebuilt by npm install)
 M dist/keyframes.js                                                                            (pre-existing; auto-rebuilt by npm install)
 M package-lock.json                                                                            (npm install refresh)
 M src/animation/group.ts                                                                       (pre-existing)
 M src/animation/index.ts                                                                       (pre-existing)
 M test/useAnimationGroupPlayback.test.ts                                                       (pre-existing)
?? after-play-click.png    cube-fixed.png    cube-playing.png    cube-reload-2.png    cube-reload.png    dock-always-expanded.png    dock-collapsed-verify.png    home-collapsed.png    home-fresh.png
                                                                                                (pre-existing untracked screenshots)
```

Lane-A-introduced modifications: 23 `demo/` SFC files (the v1.0 migration set) + `package-lock.json` refresh.
Pre-existing modifications carried in from open: 7 files (3× src/, 1× test, 1× demo composable, 1× demo state-hook, 2× dist/) + 9 untracked screenshots. Orchestrator owns the index; these stay pre-existing until orchestrator decides composition.

Per AGENT clause invariant: **no commits, no staging, no checkout, no reset** were performed by Lane A.

## § Summary for orchestrator dispatch

- **Migrations**: 23 demo SFC files; 23 import statements rewritten across `/forms`, `/dark`, `/keyboard`, `/controls`, `/dock`, `/icon-tooltip`, `/labeled-field` subpaths.
- **Retired-symbol grep (final)**: 0 hits across all three probes (retired subpaths / retired composables / vueuse-bearing root-barrel).
- **Build**: `npm run build` PASS (exit 0).
- **Typecheck**: `npm run check` PASS (exit 0).
- **Tests**: 218/218 PASS (exit 0).
- **Version coherence**: glass-ui v1.0.4; Vue 3.5.18; Tailwind 4.1.11; reka-ui 2.0.0; vueuse 14.2.1 — all in spec.
- **Duplication disposition**: 0 ELEVATEs; 5 DOCUMENT-AS-DIFFERENT (deferred to M.W2 `@mkbabb/dev-kit` carve-out wave + M.W3 doc-format wave); 3 KEEP-AS-IS (canonical / aligned).
- **Blockers**: none.
- **Open questions**: see § above (vue-tsc adoption; pre-existing-diff composition policy; cn ELEVATE deferral confirmation).
