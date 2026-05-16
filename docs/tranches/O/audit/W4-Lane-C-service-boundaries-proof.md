# O.W4 Lane C—service-boundary inconsistencies proof

**Lane**: O.W4 Lane C—service-boundary inconsistencies (3 fixes).
**Scope**: avatarVariant rename + useToast disposition + module-scope registries doc.
**Bounds**: avatar package, MIGRATION.md, DESIGN.md, 2 new audit docs.
**Status**: LANDED.

## Disposition

### Fix 1—`avatarVariant` → `avatarVariants` (consistency rename)

Renamed the singular CVA const to the plural form used by every other CVA
variants const in the library. Type alias `AvatarVariants` is unchanged
(it was already plural; the singular const was the outlier).

**Diff** (`src/components/ui/avatar/index.ts`):

```diff
- export const avatarVariant = cva(
+ export const avatarVariants = cva(
    'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden',
    ...
  )

- export type AvatarVariants = VariantProps<typeof avatarVariant>
+ export type AvatarVariants = VariantProps<typeof avatarVariants>
```

**Diff** (`src/components/ui/avatar/Avatar.vue`):

```diff
- import { type AvatarVariants, avatarVariant } from '.'
+ import { type AvatarVariants, avatarVariants } from '.'
...
- <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
+ <AvatarRoot :class="cn(avatarVariants({ size, shape }), props.class)">
```

**MIGRATION.md note**: added under `## v1.2.4—\`avatarVariant\` →
\`avatarVariants\` (O.W4 Lane C)`. One-line consumer migration documented.

### Fix 2—`useToast` disposition decision

Verdict: **KEEP-with-rationale** (shadcn-vue parity preserved; module-scope
queue is canonical for the process-singleton pattern). NO source change to
`src/components/ui/toast/use-toast.ts`. Decision rationale authored at
`docs/tranches/O/audit/W4-Lane-C-useToast-decision.md` weighing Path A
(KEEP, executed) vs Path B (REFACTOR to DI, flagged for orchestrator if a
multi-library-copy scenario emerges; semver-major cut required).

### Fix 3—Module-scope registries canonical documentation

Added new section `## Module-scope process-singleton registries (canonical
pattern)` to DESIGN.md after the Composables section (before Layout & Sizing
Tokens). Catalogues the four module-scope registries (`gateRegistry`,
sortable `instances`, typewriter `activeTimers`, useToast `toasts` +
`toastTimeouts`) and the one-library-copy-per-process assumption.
Cross-references the useToast decision doc.

## File changes summary

| Path | Type | Change |
|---|---|---|
| `src/components/ui/avatar/index.ts` | MODIFY | rename const `avatarVariant` → `avatarVariants` (+ type alias source) |
| `src/components/ui/avatar/Avatar.vue` | MODIFY | rename import + template usage |
| `MIGRATION.md` | MODIFY | add v1.2.4 section documenting the rename |
| `DESIGN.md` | MODIFY | add "Module-scope process-singleton registries (canonical pattern)" section |
| `docs/tranches/O/audit/W4-Lane-C-useToast-decision.md` | NEW | Path A vs Path B decision rationale |
| `docs/tranches/O/audit/W4-Lane-C-service-boundaries-proof.md` | NEW | this proof |

`use-toast.ts`: **UNCHANGED** (KEEP verdict, doc-only).

## Verification

### `npm run typecheck`—PASS

```
> @mkbabb/glass-ui@1.2.3 typecheck
> vue-tsc --noEmit
(exit 0, no diagnostics)
```

### `npm test`—PASS

```
> @mkbabb/glass-ui@1.2.3 test
> vitest run

 Test Files  30 passed (30)
      Tests  348 passed (348)
   Duration  2.69s
```

### `rg avatarVariant\b` confirmations

Library-internal (within glass-ui worktree):

- `src/components/ui/avatar/index.ts`—only `avatarVariants` (plural) present.
- `src/components/ui/avatar/Avatar.vue`—only `avatarVariants` (plural) present.
- Demo + tests—zero singular occurrences.

```
$ rg 'avatarVariant\b' src demo tests
(no matches)

$ rg 'avatarVariants\b' src demo
src/components/ui/avatar/Avatar.vue:4:import { type AvatarVariants, avatarVariants } from '.'
src/components/ui/avatar/Avatar.vue:18:  <AvatarRoot :class="cn(avatarVariants({ size, shape }), props.class)">
src/components/ui/avatar/index.ts:7:export const avatarVariants = cva(
src/components/ui/avatar/index.ts:28:export type AvatarVariants = VariantProps<typeof avatarVariants>
```

## Cross-repo audit results

Per W4.md hard gate (d), audited the 6 consumer repos for
`avatarVariant\b` usage:

| Repo | Matches | Notes |
|---|---|---|
| `words` | 0 | no avatar usage |
| `fourier-analysis` | 0 | no avatar usage |
| `bbnf-buddy` | 0 | no avatar usage |
| `keyframes.js` | 0 | no avatar usage |
| `value.js` | 1 | **re-export barrel only**—see below |
| `speedtest` | 0 | no avatar usage |

**Finding—`value.js` re-export barrel** (`value.js/demo/@/components/ui/avatar/index.ts:1`):

```ts
export { Avatar, AvatarImage, AvatarFallback, avatarVariant, type AvatarVariants } from "@mkbabb/glass-ui";
```

This is a passthrough barrel matching the canonical consumer wiring
pattern documented in CLAUDE.md (§Consumer wiring). No downstream call
site in `value.js` actually invokes `avatarVariant` directly (verified
via `rg avatarVariant value.js`—only this one line matches).

**Impact**: at v1.2.4 upgrade, the re-export line will fail to type-check
(`avatarVariant` no longer exists on `@mkbabb/glass-ui` root barrel).
One-line consumer migration:

```diff
- export { Avatar, AvatarImage, AvatarFallback, avatarVariant, type AvatarVariants } from "@mkbabb/glass-ui";
+ export { Avatar, AvatarImage, AvatarFallback, avatarVariants, type AvatarVariants } from "@mkbabb/glass-ui";
```

Coordinated at O.W6 (cross-repo cohort wave) per W4.md §brittleness-window.

The orchestrator's pre-check note ("ZERO consumer uses") is technically
accurate for *invocation* call sites but missed the re-export barrel.
Documented here for the orchestrator's record. No bounds violation —
the consumer-side fix lives at O.W6, not this lane.

## Open questions for orchestrator

1. **value.js avatar re-export barrel touch-up**: orchestrator pre-check
   reported zero consumer uses; the proof identified one re-export site.
   Confirmed within-scope for O.W6 cross-repo cohort wave; flagging here
   so the W6 worklist captures it. No action requested in this lane.
2. **Semver decision (v1.2.4 vs v1.3.0)**: the rename is semver-visible
   (one consumer re-export breaks). W4.md gate (g) flags either v1.2.4
   patch tag (additive `/api` promotions + consolidated rename with
   MIGRATION.md note) OR v1.3.0 minor (if `/api` expansion + rename
   warrant minor signal). MIGRATION.md note authored under "v1.2.4" tag;
   orchestrator may relabel to v1.3.0 if the W4-aggregate close warrants.
3. **Path B (`useToast` DI refactor)**: not authorized; not executed.
   Flagged in the decision doc as future work IF a multi-library-copy
   scenario is reported or shadcn-vue parity is formally retired. None
   apply at O.W4 close.

## Worktree diff verification

```
$ git -C <worktree> status --short
 M DESIGN.md
 M MIGRATION.md
 M src/components/ui/avatar/Avatar.vue
 M src/components/ui/avatar/index.ts
?? docs/tranches/O/audit/W4-Lane-C-useToast-decision.md
?? docs/tranches/O/audit/W4-Lane-C-service-boundaries-proof.md

$ git -C <worktree> diff --stat
 DESIGN.md                           | 24 ++++++++++++++++++++++++
 MIGRATION.md                        | 23 +++++++++++++++++++++++
 src/components/ui/avatar/Avatar.vue |  4 ++--
 src/components/ui/avatar/index.ts   |  4 ++--
 4 files changed, 51 insertions(+), 4 deletions(-)
```

Plus 2 new doc files (this proof + useToast decision).

Bounds respected: no edits to `src/api/index.ts` (Lane A), no edits to
aurora/dock/dark-mode-sync (Lane B), no edits to `use-toast.ts` source
(KEEP verdict).

**Hardened agent git clause**: no git mutations performed by this lane.
Read-only `git status` / `git diff --stat` used for verification only.
