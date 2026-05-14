# O.W4 Lane B — Leaky abstraction fixes proof

**Wave:** O.W4 (Lane B)
**Scope:** Rγ §"top 3 leaky abstractions" — three discrete fixes, all mechanical, all bounds-scoped.
**Status:** LANDED in worktree `agent-aac7d6bb19d1289b2`; awaiting orchestrator commit.
**Branch:** `master` (worktree).

---

## § Disposition

Three fixes from Rγ §3.1 landed; verification clean.

### Fix 1 — Re-export `UseDockStateOptions` + `DockState` from the dock package barrel (Rγ L1)

**Before:** `src/components/custom/dock/composables/index.ts` exported `UseDockStateOptions` + `DockState`, but the dock package barrel `src/components/custom/dock/index.ts` did NOT re-export them. The `@mkbabb/glass-ui/dock` subpath resolves through the package barrel, so consumers building wrappers around `useDockState` could not annotate the options arg or return shape without `ReturnType<typeof useDockState>` or reaching into the sub-barrel via a non-published path.

**After:** Package barrel now re-exports both types:

```ts
// src/components/custom/dock/index.ts (tail)
export type { UseDockStateOptions, DockState } from "./composables";
```

Discovery surface (`/api`) is NOT touched per the /api preamble — these are composable option/return types, which change with implementation and are intentionally per-package.

---

### Fix 2 — `UseAuroraReturn` named return interface (Rγ L2)

**Before:** `useAurora` returned an inline-typed object literal `{ setCursor, clearCursor, setCursorRadius, renderAt, pause, resume }`. Sibling composables (`useConfiguratorState` → `ConfiguratorState<T>`, `useSidebarState` → `SidebarState`, `useSortable` → `UseSortableReturn`) all ship named return interfaces; aurora was the outlier.

**After:** Authored `UseAuroraReturn` interface in `src/components/custom/aurora/composables/useAurora.ts`, exported from the same module + re-exported from `src/components/custom/aurora/index.ts`:

```ts
export interface UseAuroraReturn {
    setCursor: (x: number, y: number, strength?: number) => void;
    clearCursor: () => void;
    setCursorRadius: (r: number) => void;
    renderAt: (t: number) => void;
    pause: () => void;
    resume: () => void;
}

export function useAurora(...): UseAuroraReturn { ... }
```

NOT promoted to `/api` per the /api preamble ("composable option/return types change with implementation"). Reachable from `@mkbabb/glass-ui/aurora` only.

---

### Fix 3 — `useDarkModeSync` → `installDarkModeSync` rename (Rγ L3, Path A)

**Before:** `useDarkModeSync(onSync: () => void): void` — a watch-installer dressed as a composable. Returns void; the `use*` prefix implied a controlled facade contract (reactive return + cleanup token) that the implementation does not honour.

**After:** Renamed to `installDarkModeSync` per Rγ §4.3 ("rename to signal it's a side-effect installer"). File `src/composables/motion/useDarkModeSync.ts` → `src/composables/motion/installDarkModeSync.ts` (filename-matches-function convention per sibling composables). All in-repo references updated:

| Site                                                        | Update                                                                                              |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `src/composables/motion/installDarkModeSync.ts`             | function rename + doc clarifying semver-visible disposition                                         |
| `src/composables/motion/index.ts`                           | `export * from "./useDarkModeSync"` → `export * from "./installDarkModeSync"`                       |
| `demo/stories/composables/use-dark-mode-sync.vue`           | import path + call-site rename (kebab-case story slug PRESERVED for stable URL)                     |
| `demo/stories/manifest.ts`                                  | manifest display name `useDarkModeSync` → `installDarkModeSync`                                     |
| `tests/public-surface.spec.ts`                              | `composableRuntimeExports` fixture entry rename                                                     |

SEMVER-VISIBLE: speedtest is the one external consumer (cross-repo audit below). Path A chosen per dispatch default (clarity over disguise; refactor-to-facade not warranted absent consumer-blocker).

---

## § File changes summary

```
demo/stories/composables/use-dark-mode-sync.vue                |  6 ++---
demo/stories/manifest.ts                                       |  2 +-
src/components/custom/aurora/composables/useAurora.ts          | 31 ++++++++++++++++------
src/components/custom/aurora/index.ts                          |  2 ++
src/components/custom/dock/index.ts                            |  6 +++++
src/composables/motion/index.ts                                |  2 +-
src/composables/motion/useDarkModeSync.ts                      | 23 ----------------     (DELETED)
src/composables/motion/installDarkModeSync.ts                  | 32 ++++++++++++++++++  (RENAMED+EDITED)
tests/public-surface.spec.ts                                   |  2 +-
8 files changed, 37 insertions(+), 37 deletions(-)
```

Git rename detection on commit should pair `useDarkModeSync.ts → installDarkModeSync.ts` (>50% content unchanged; verified by reading both versions).

---

## § Verification

```bash
$ npm run typecheck
> @mkbabb/glass-ui@1.2.3 typecheck
> vue-tsc --noEmit
# clean exit

$ npm test
Test Files  30 passed (30)
     Tests  348 passed (348)
  Duration  2.65s
```

Initial `npm test` failed one assertion (`tests/public-surface.spec.ts > exports composable or utility useDarkModeSync`) because the fixture pinned the old name; fixture updated, all 348 tests green.

No `npm run profile:budget` or `npm run verify-export-types` runs included in this lane — the public-surface dts probe is unaffected (subpath count unchanged; `installDarkModeSync` still exits via the root barrel via `composables/motion`). Recommend orchestrator run `verify-export-types` at W4 close before tagging.

---

## § Cross-repo audit (`useDarkModeSync`)

Ran:

```bash
for repo in speedtest words fourier-analysis bbnf-buddy keyframes.js value.js; do
  grep -rn "useDarkModeSync" /Users/mkbabb/Programming/$repo --include="*.ts" --include="*.vue"
done
```

Results:

| Repo                  | Matches | Disposition                                                                   |
|-----------------------|---------|-------------------------------------------------------------------------------|
| `speedtest`           | 2 files | **MIGRATION REQUIRED** (see below)                                            |
| `words`               | 0       | no impact                                                                     |
| `fourier-analysis`    | 0       | no impact                                                                     |
| `bbnf-buddy`          | 0       | no impact                                                                     |
| `keyframes.js`        | 0       | no impact                                                                     |
| `value.js`            | 0       | no impact                                                                     |

**Speedtest consumer call-sites** (from `/Users/mkbabb/Programming/speedtest/`):

```
src/components/speedtest/MeterColumn.vue:61:    useDarkModeSync,                            // import
src/components/speedtest/MeterColumn.vue:110:useDarkModeSync(() => {                        // call-site
src/components/dashboard/composables/useEChartsTheme.ts:3:import { useDarkModeSync } from "@mkbabb/glass-ui";
src/components/dashboard/composables/useEChartsTheme.ts:68:    useDarkModeSync(() => {     // call-site
```

Two files, three references (one import-list entry in `MeterColumn.vue` plus one call; one full import statement in `useEChartsTheme.ts` plus one call). Mechanical sed-replace; no behaviour change. The proof of this fix's correctness in the consumer would be a one-line rename per call site:

```diff
-import { useDarkModeSync } from "@mkbabb/glass-ui";
+import { installDarkModeSync } from "@mkbabb/glass-ui";
-useDarkModeSync(() => { ... });
+installDarkModeSync(() => { ... });
```

---

## § Open questions for orchestrator

1. **MIGRATION.md update** — `MIGRATION.md` currently references `useDarkModeSync` on line 305 (the v0.9.x → v1.0 migration matrix marks it as WIRED in speedtest) and line 381 (composables sub-tree directory header). Lane B treated these as orchestrator-coordination concerns (parallels avatarVariant MIGRATION.md note in Lane C; consolidated under a single hard-gate deliverable). Recommend orchestrator add a §1.x entry at next pass:

   ```
   ## v1.2.4 (or v1.3.0) — `useDarkModeSync` → `installDarkModeSync` rename

   Rename signals the function's true shape (one-shot watch installer; no
   reactive return). One affected consumer in production: `speedtest` —
   two files, three references. Migration is a mechanical name swap.
   ```

2. **CHANGELOG.md / DESIGN.md / README.md / CLAUDE.md** also reference `useDarkModeSync` in historical contexts (CHANGELOG entries for v0.9.x; DESIGN.md sub-tree map; README/CLAUDE structure block comments). Lane B did not touch these per bounds discipline; orchestrator decides whether to backfill the structure-block comments or leave as historical.

3. **Speedtest consumer coordination** — the rename is mechanical but not coordinated in this lane (read-only on consumer repos per the agent git clause). Orchestrator should pair the v1.2.4/v1.3.0 tag with a speedtest PR.

4. **`UseDockStateOptions` exposure to `/api`** — Rγ §3.1 L1 suggested "expose on /dock barrel + /api, or formally pin as internal". Lane B chose the package-barrel-only path per the /api preamble ("composable option/return types change with implementation"). If orchestrator disagrees, add to Lane A's /api promotion cohort (12 → 14 types).

5. **`UseAuroraReturn` semantic alias** — `useAurora`'s previous return-shape inline literal is exactly equal to a subset of `AuroraCursorApi` + a couple of lifecycle methods. The `UseAuroraReturn` interface authored here is intentionally orthogonal (not extending `AuroraCursorApi`) to keep the lifecycle methods (`renderAt`, `pause`, `resume`) — which are not part of the cursor API — co-located with the cursor methods on the composable surface. If the runtime API gains more methods, this interface should mirror them; document at L invariant 16 review.

---

## § Worktree diff verification

```
$ git status --short
 M demo/stories/composables/use-dark-mode-sync.vue
 M demo/stories/manifest.ts
 M src/components/custom/aurora/composables/useAurora.ts
 M src/components/custom/aurora/index.ts
 M src/components/custom/dock/index.ts
 M src/composables/motion/index.ts
 D src/composables/motion/useDarkModeSync.ts
 M tests/public-surface.spec.ts
?? src/composables/motion/installDarkModeSync.ts

$ git diff --stat
 demo/stories/composables/use-dark-mode-sync.vue    |  6 ++---
 demo/stories/manifest.ts                           |  2 +-
 .../custom/aurora/composables/useAurora.ts         | 31 ++++++++++++++++------
 src/components/custom/aurora/index.ts              |  2 ++
 src/components/custom/dock/index.ts                |  6 +++++
 src/composables/motion/index.ts                    |  2 +-
 src/composables/motion/useDarkModeSync.ts          | 23 ----------------
 tests/public-surface.spec.ts                       |  2 +-
 8 files changed, 37 insertions(+), 37 deletions(-)
```

All mutations within the dispatched bounds. No Lane A (`src/api/index.ts`) or Lane C (`src/components/ui/avatar/index.ts`) bounds touched. No git index mutation; orchestrator owns the commit per the hardened agent git clause.
