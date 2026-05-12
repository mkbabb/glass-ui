# M.W1 Lane D — words/frontend v1.0 standardization sweep

Lane: M.W1 Lane D (cross-repo multi-writer, single-peer).
Scope: `/Users/mkbabb/Programming/words/frontend/`.
glass-ui consumed: `file:../../glass-ui` → v1.0.4.

## § Disposition

**Entry state** (HEAD of dirty worktree, pre-Lane):
- M.W0 Lane III had already migrated 3 `/virtual` imports + 6 root-barrel vueuse-bearing imports + package.json pin fix.
- Pre-existing user in-flight work covered the v1.0 subpath fan-out broadly (AnimatedTitle→/typewriter, ImageCarousel→/carousel, ProgressiveSidebar/useSidebarState→/sidebar, App.vue/useStateSync→/dark, etc.).
- 17 `glass-subtle` callsites (4 button-variant props + 13 CSS utility-class sites) and 1 `danger-subtle` button-variant site remained against canonical v1.0 vocab.

**Final state**:
- 0 retired glass-ui subpath imports (`/virtual`, `/pagination`, `/composables/*`).
- 0 retired symbols from glass-ui surface in src/.
- 0 vueuse-bearing root-barrel imports remain.
- 0 `glass-subtle` references (CSS class OR button variant).
- 0 `danger-subtle` references.
- 0 `useLeaveTimer` references (never existed on glass-ui surface; phantom-import scenario didn't manifest).
- type-check: EXIT=0.
- build: EXIT=0 (`vue-tsc --noEmit && vite build` succeeded in 4.63s).

## § Pre-Lane state

### Root-barrel imports audit (vueuse-bearing names)

```bash
$ rg -n "from\s+['\"]@mkbabb/glass-ui['\"]" src/ \
    | rg "\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts|CarouselApi)\b"
# (empty)
```

All vueuse-bearing imports already on subpaths (`/forms`, `/dark`, `/keyboard`, `/carousel`) via prior in-flight work. No further migration needed.

### Retired-subpath audit

```bash
$ rg -n "@mkbabb/glass-ui/(virtual|pagination|composables)" src/
# (empty)
```

Zero retired glass-ui subpath imports. The local `@/composables/virtual/*` path is a project-local transposition (per `src/composables/virtual/index.ts` header: "transposed from glass-ui v0.9.4 — retired at v1.0; see MIGRATION.md §§3.2-3.4 and docs/tranches/M/audit/W0-Lane-III-*.md").

### `glass-subtle` audit

17 sites — 4 button-variant props + 13 CSS utility-class sites:

| File | Line(s) | Form |
|------|---------|------|
| `src/views/Signup.vue` | 12 | CSS class |
| `src/views/Login.vue` | 12 | CSS class |
| `src/components/custom/Sidebar.vue` | 38 | CSS class |
| `src/components/custom/wordlist/views/WordlistDashboard.vue` | 13, 71, 82, 93 | CSS class (×4) |
| `src/components/custom/wordlist/modals/WordListUploadModal.vue` | 62 | CSS class |
| `src/components/custom/wordlist/UploadDropZone.vue` | 17 | CSS class |
| `src/components/custom/navigation/WordlistProgressiveSidebar.vue` | 10 | CSS class |
| `src/components/custom/definition/components/versioning/TimeMachineOverlay.vue` | 22, 76, 100 | CSS class (×3) |
| `src/components/custom/search/components/SearchInputActions.vue` | 42 | button variant prop |
| `src/components/custom/search/components/controls/SearchControls.vue` | 71 | button variant prop |
| `src/components/custom/search/components/ActionButton.vue` | 36, 37 | button variant prop (×2 in variantMap) |

`glass-subtle` is NOT defined in glass-ui's `src/styles/glass.css` (the canonical 5-rung ladder is `glass-wash | glass-quiet | glass-resting | glass-floating | glass-overlay`). It is NOT in v1.0 `buttonVariants` CVA (`default | primary-audacious | destructive | outline | secondary | accent | ghost | glass | glass-wash | ai | link`). No local override in words/frontend (`src/styles/ios-pwa.css` doesn't define it; `src/assets/index.css` doesn't define it). Pre-Lane status: **phantom class — silently no-op in DOM and TS-permitted because `ButtonVariants['variant']` was widened by `class-variance-authority` in 0.7.x types**.

### `danger-subtle` audit

1 site:

| File | Line | Form |
|------|------|------|
| `src/components/custom/search/components/ActionButton.vue` | 38 | button variant prop (in variantMap) |

Same status: phantom variant — silently no-op.

### `useLeaveTimer` audit

```bash
$ rg -n "useLeaveTimer|LeaveTimer|leaveTimer" src/
# (empty)
$ rg -n "useLeaveTimer|leaveTimer" /Users/mkbabb/Programming/glass-ui/src/
# (empty)
```

Never on glass-ui's surface (now or v0.9.x). Never consumed by words/frontend. Phantom-import scenario described by orchestrator did not manifest. **Resolution: no-op (nothing to migrate)**.

### Version coherence

| Dep | words/frontend pin | Resolves to | Status |
|-----|-------------------|-------------|--------|
| `@mkbabb/glass-ui` | `file:../../glass-ui` | v1.0.4 (via symlink at `words/node_modules/@mkbabb/glass-ui → ../../../glass-ui`) | OK (hoisted workspace) |
| `vue` | `^3.5.29` | 3.5.29+ | OK (≥ 3.5) |
| `tailwindcss` | `^4.2.1` | 4.2.1+ | OK (≥ 4) |
| `reka-ui` | `^2.8.2` | 2.8.2+ | OK (≥ 2.0) |
| `@vueuse/core` | `^14.2.1` | 14.2.1+ | OK (≥ 14.0) |
| `@mkbabb/keyframes.js` | `^2.0.0` | 2.0.0+ | OK (≥ 2.0) |

words/frontend `package.json` declares a workspace under the words root (`words/package.json` declares `"workspaces": ["frontend"]`); node_modules hoist to `words/node_modules/`. Symlink resolution verified — `cat /Users/mkbabb/Programming/words/node_modules/@mkbabb/glass-ui/package.json` returns `"version": "1.0.4"`.

## § File changes summary

| File | Sites | Disposition |
|------|-------|-------------|
| `src/views/Signup.vue` | 1 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/views/Login.vue` | 1 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/Sidebar.vue` | 1 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/wordlist/views/WordlistDashboard.vue` | 4 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/wordlist/modals/WordListUploadModal.vue` | 1 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/wordlist/UploadDropZone.vue` | 1 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/navigation/WordlistProgressiveSidebar.vue` | 1 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/definition/components/versioning/TimeMachineOverlay.vue` | 3 | `glass-subtle` → `glass-wash` (CSS class) |
| `src/components/custom/search/components/SearchInputActions.vue` | 1 | `glass-subtle` → `glass-wash` (button variant) |
| `src/components/custom/search/components/controls/SearchControls.vue` | 1 | `glass-subtle` → `glass-wash` (button variant) |
| `src/components/custom/search/components/ActionButton.vue` | 3 | `glass-subtle` → `glass-wash` (×2); `danger-subtle` → `destructive` (×1) — all in `variantMap` |

**Total**: 11 files, 18 sites (17 `glass-subtle` + 1 `danger-subtle`).

## § Cross-cutting duplication disposition table

Per M.Rε §B (cross-cutting duplication audit):

| Pattern | Sites | Disposition | Rationale |
|---------|-------|-------------|-----------|
| `glass-subtle` CSS class | 13 | **ADOPT-CANONICAL** (`glass-wash`) | The canonical 5-rung ladder lives in `glass-ui` `glass.css`. The lightest rung (`glass-wash`) is the closest semantic match. Per `feedback_no_backwards_compat.md` + `feedback_architectural_approach.md`: no local override / no phantom name. |
| `glass-subtle` button variant | 4 | **ADOPT-CANONICAL** (`glass-wash`) | Same rationale — v1.0 `buttonVariants` exposes `glass-wash` for the equivalent semantic. |
| `danger-subtle` button variant | 1 | **ADOPT-CANONICAL** (`destructive`) | v1.0 `buttonVariants` exposes `destructive` as the canonical destructive variant. No `*-subtle` shadow exists. |
| `useVirtualSectionWindow`, `useWindowedStore`, `virtualSectionLayout` helpers | 1 substrate (`src/composables/virtual/`) | **TRANSPOSED-LOCAL** (already done at M.W0 Lane III) | Retired from glass-ui v1.0 per L.W3 (substrate-without-consumer-binary, MIGRATION.md §§3.2-3.4). words/frontend genuinely consumes (`DefinitionContentView.vue` + `wordlist.ts`). Transposed to project-local `src/composables/virtual/`. |
| `TypewriterText` on glass-ui | 1 site (`AnimatedTitle.vue`) | **KEEP** (correctly on `/typewriter` subpath) | v1.0 keeps the substrate (≥ 1 consumer via words; ≥ 1 internal demo). Migration already done at HEAD. |
| `useSidebarFollow`, `useScrollTracker`, `useTreeIndex` on glass-ui | 2 sites (`ProgressiveSidebar.vue`, `useSidebarState.ts`) | **KEEP** (correctly on `/sidebar` subpath) | Substrate present in `composables/sidebar/`; words/frontend consumes. Migration already done at HEAD. |
| Local custom-component `variant` props (`TabsList variant="underline"`, `LoadingProgress variant="thin"`, `ActionButton variant="danger"`) | 3 sites | **KEEP-AS-IS** | Out of M.W1 Lane D scope. `TabsList variant="underline"` is a phantom prop on glass-ui's `TabsList` (silently passed through to reka-ui as a `data-*`) — flagged in Open Questions. The other two are project-local custom-component APIs. |

## § Verification

### Build / typecheck exit codes

```bash
$ npm install               # in words/frontend
# added 117 packages, audited 523 packages — EXIT=0

$ npm run type-check
> vue-tsc --noEmit
# EXIT=0

$ npm run build
> vue-tsc --noEmit && vite build
# ✓ built in 4.63s
# EXIT=0
```

Build emits two non-blocking warnings (pre-existing, unrelated to this lane):
- `Browserslist: browsers data (caniuse-lite) is 11 months old.` — recommend `npx update-browserslist-db@latest` at consumer's convenience.
- `src/api/entries.ts is dynamically imported by ... DefinitionDisplay.vue ... but also statically imported by ... src/api/index.ts` — dynamic-vs-static import mixing in `entries.ts`; non-blocking.

### Comprehensive retired-symbol final grep

```bash
$ rg -n "@mkbabb/glass-ui/(virtual|pagination|composables)" src/
# (empty)

$ rg -n "from\s+['\"]@mkbabb/glass-ui['\"]" src/ \
    | rg "\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts|CarouselApi)\b"
# (empty)

$ rg -n "useVirtualSectionWindow|useWindowedStore|useOffsetPagination|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow" src/ \
    | rg "@mkbabb/glass-ui"
# (empty — all transposed-local references resolve via @/composables/virtual)

$ rg -n "glass-subtle|danger-subtle" src/
# (empty)

$ rg -n "useLeaveTimer" src/
# (empty)
```

All four invariant checks pass: zero retired subpath imports; zero retired symbols imported from glass-ui; zero `glass-subtle`/`danger-subtle`; zero `useLeaveTimer`.

### `glass-subtle` resolution path

Per CLAUDE.md (glass-ui) — "5-rung ladder: `glass-wash`, `glass-quiet`, `glass-resting`, `glass-floating`, `glass-overlay`". `glass-subtle` was a phantom (no definition anywhere in glass-ui src/ nor in words/frontend src/). The canonical lightest rung is `glass-wash` — it is both a CSS utility class (`src/styles/glass.css:20`) and a `buttonVariants` value (`src/components/ui/button/index.ts:29-30`). Per `feedback_architectural_approach.md` (gestalt redesigns over workarounds), **adopt canonical**.

Visual delta: previously zero (`glass-subtle` was no-op). Now: each call site renders the canonical lightest glass-rung — adds backdrop blur, surface tint, border, soft shadow per glass-ui's wash tokens. Consumer-visible change is **gain visual fidelity**; no regression (the previous "no styling" was a bug, not a feature).

### `useLeaveTimer` resolution path

No-op. Phantom-import scenario didn't manifest in words/frontend src/. glass-ui exports nothing by that name; words/frontend imports nothing by that name.

## § Open questions for orchestrator

1. **Phantom `variant="underline"` on glass-ui `TabsList`** (`src/components/custom/search/components/controls/SearchControls.vue:29`). glass-ui's `TabsList.vue` does not accept a `variant` prop — it forwards to reka-ui's `TabsListProps`. The prop is silently dropped (or surfaces as `data-variant` via vue's attribute fall-through). Disposition options:
   - (A) Remove the prop locally (drop visual variant; falls back to default styling).
   - (B) Elevate `TabsList variant` to glass-ui as a new variant axis (would need an underline-tab CVA). Glass-ui already has a `UnderlineTabs` custom component (`src/components/custom/tabs/`); the right migration is probably to swap `TabsList` for `<UnderlineTabs>` here.

   **Out of M.W1 Lane D scope** (the scope memo lists `glass-subtle` as the only button-variant baseline drift). Flagged for orchestrator follow-up.

2. **`primary-audacious` adoption**. v1.0's headline button variant `primary-audacious` is not used in words/frontend. Variant currently used: `default`, `ai`, `danger`→`destructive`, `default`, `destructive`, `ghost`, `glass-wash`, `link`, `outline`, `secondary`. No `primary-audacious` callsites — possibly intentional (search/wordlist UI prefers subtler tiers). Not a defect; just an inventory note.

3. **`@vueuse/core` ^14.2.1 vs glass-ui peer ^14.0**. words/frontend pins `^14.2.1`; glass-ui peer-requires `^14.0` — fully compatible. No action.

4. **Workspace hoisting** — words/frontend's `node_modules/@mkbabb/glass-ui` is empty (only `parse-that` sits in that scope); the symlink lives at `words/node_modules/@mkbabb/glass-ui → ../../../glass-ui`. Resolution chain is correct under npm-workspace hoisting. No fragility expected, but documented here so future consumers know the workspace topology.

## § Worktree diff verification

`git -C /Users/mkbabb/Programming/words/frontend status --short` (Lane D net delta — only frontend/ files relevant to this lane shown; pre-existing dirty state from earlier in-flight work + backend/ + docs/ is unchanged and out of scope per the bounds):

```
M  src/App.vue                                                                    (pre-existing v1.0 migration: /dark)
M  src/components/custom/Sidebar.vue                                              (Lane D: glass-subtle → glass-wash)
M  src/components/custom/definition/components/AnimatedTitle.vue                   (pre-existing: /typewriter)
M  src/components/custom/definition/components/ThemeSelector.vue                   (pre-existing)
M  src/components/custom/definition/components/WordHeader.vue                      (pre-existing)
M  src/components/custom/definition/components/content/DefinitionContentView.vue  (pre-existing)
M  src/components/custom/definition/components/media/ImageCarousel.vue             (pre-existing: /carousel)
M  src/components/custom/definition/components/metadata/ProviderIcons.vue          (pre-existing)
M  src/components/custom/definition/components/versioning/TimeMachineOverlay.vue   (Lane D: 3× glass-subtle → glass-wash)
M  src/components/custom/definition/composables/flattenDefinitions.ts              (pre-existing: local virtual import path)
M  src/components/custom/navigation/ProgressiveSidebar.vue                         (pre-existing: /sidebar)
M  src/components/custom/navigation/WordlistProgressiveSidebar.vue                 (Lane D: glass-subtle → glass-wash)
M  src/components/custom/navigation/composables/useSidebarState.ts                 (pre-existing: /sidebar)
M  src/components/custom/search/SearchBar.vue                                      (pre-existing)
M  src/components/custom/search/components/ActionButton.vue                         (Lane D: glass-subtle ×2 → glass-wash, danger-subtle → destructive)
M  src/components/custom/search/components/ExpandModal.vue                          (pre-existing)
M  src/components/custom/search/components/SearchInputActions.vue                  (Lane D: glass-subtle → glass-wash)
M  src/components/custom/search/components/controls/LookupControlsPanel.vue        (pre-existing)
M  src/components/custom/search/components/controls/SearchControls.vue              (Lane D: glass-subtle → glass-wash)
M  src/components/custom/search/components/controls/WordlistControlsPanel.vue      (pre-existing)
M  src/components/custom/search/composables/useSearchBarScroll.ts                  (pre-existing)
M  src/components/custom/search/utils/scroll.ts                                    (pre-existing)
M  src/components/custom/sidebar/SidebarContent.vue                                (pre-existing)
M  src/components/custom/sidebar/SidebarHeader.vue                                 (pre-existing)
M  src/components/custom/sidebar/SidebarWordListItem.vue                           (pre-existing)
M  src/components/custom/sidebar/SidebarWordListView.vue                           (pre-existing)
M  src/components/custom/wordlist/UploadDropZone.vue                                (Lane D: glass-subtle → glass-wash)
M  src/components/custom/wordlist/WordlistTargetForm.vue                            (pre-existing)
M  src/components/custom/wordlist/modals/CreateWordListModal.vue                    (pre-existing)
M  src/components/custom/wordlist/modals/EditWordNotesModal.vue                     (pre-existing)
M  src/components/custom/wordlist/modals/EditWordlistModal.vue                      (pre-existing)
M  src/components/custom/wordlist/modals/WordListUploadModal.vue                    (Lane D: glass-subtle → glass-wash)
M  src/components/custom/wordlist/views/WordListView.vue                            (pre-existing)
M  src/components/custom/wordlist/views/WordlistDashboard.vue                       (Lane D: 4× glass-subtle → glass-wash)
M  src/composables/useStateSync.ts                                                  (pre-existing: /dark)
M  src/composables/virtual/index.ts                                                  (pre-existing: M.W0 Lane III local transposition)
M  src/stores/search/modes/wordlist.ts                                              (pre-existing)
M  src/styles/ios-pwa.css                                                            (pre-existing)
M  src/views/Login.vue                                                                (Lane D: glass-subtle → glass-wash)
M  src/views/Signup.vue                                                                (Lane D: glass-subtle → glass-wash)
M  package.json                                                                       (pre-existing: M.W0 Lane III pin fix file:../../glass-ui)
?? src/composables/virtual/useVirtualSectionWindow.ts                                (pre-existing: M.W0 Lane III local transposition)
?? src/composables/virtual/useWindowedStore.ts                                       (pre-existing: M.W0 Lane III local transposition)
?? src/composables/virtual/virtualSectionLayout.ts                                   (pre-existing: M.W0 Lane III local transposition)
```

Lane D's contribution: 11 modified files.

---

## Summary for orchestrator return

- **Migration count**: 18 sites across 11 files (17 `glass-subtle` + 1 `danger-subtle` → canonical `glass-wash` / `destructive`).
- **Retired-symbol grep**: 0 (all four invariants pass).
- **type-check**: PASS (EXIT=0).
- **build**: PASS (EXIT=0, 4.63s).
- **Duplication disposition**: 3 ADOPT-CANONICAL + 1 TRANSPOSED-LOCAL (already done at W0 Lane III) + 2 KEEP (on correct subpaths) + 1 KEEP-AS-IS (out-of-scope local APIs).
- **`glass-subtle` resolution path**: phantom name → canonical `glass-wash` (lightest 5-rung tier; works as both CSS utility class and button variant).
- **`useLeaveTimer` resolution**: no-op (never on glass-ui surface, never consumed by frontend).
- **Blockers**: none. M.W1 Lane D is closed.
- **Open question for orchestrator**: `variant="underline"` phantom prop on glass-ui's `TabsList` at `SearchControls.vue:29` — out-of-Lane-D-scope; flagged for follow-up.
