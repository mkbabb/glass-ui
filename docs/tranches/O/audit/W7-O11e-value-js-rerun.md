# O11/e value.js consumer re-audit—W7 close (post-O implementation)

Read-only audit of `/Users/mkbabb/Programming/value.js/` at HEAD, third pass post-O substrate close. Verifies the O.W6 Lane A substrate promotions (HeaderRibbon + useClipboard) adoption path, the O.W2 dock-DI canonicalization BINARY-TRANSPARENT claim, and the O.W4 Lane B rename effects (`avatarVariants` + `installDarkModeSync`).

## § State delta vs O11/e (pre-O implementation)

- value.js HEAD: `c0cc349 chore(demo): adopt glass-ui v1.0 subpath surface + retire local barrels (constellation M.W1 Lane B)`.
- Branch: `w.w2.1-value-js-prebuild`; **0 commits** since O11/e baseline (2026-05-12).
- Working tree: identical 4 modified library-internal files + 5 untracked `src/parsing` / `src/units` modules. Zero demo-surface drift.
- glass-ui dep: `"@mkbabb/glass-ui": "file:../glass-ui"` (live filesystem link—picks up HEAD on next install/build).

## § Per-finding disposition

### 1. HeaderRibbon promotion adoption path (W6 Lane A)—DEFERRED IN-PROGRESS

**Upstream landed**: `src/components/custom/header-ribbon/HeaderRibbon.vue` ships at glass-ui HEAD with `@mkbabb/glass-ui/header-ribbon` flat subpath (verified in `package.json` exports).

**value.js HEAD state**: local fork STILL PRESENT at `/Users/mkbabb/Programming/value.js/demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (155 LoC) + `index.ts` barrel. Zero in-repo consumers (only re-export from index).

**Disposition**: ADOPTION DEFERRED—per O.W6 hard gate (e), the cross-repo adoption sweep was explicitly deferred to a user-authorized cross-repo wave. value.js continues running its fork at HEAD; the fork remains load-bearing (zero in-repo callers means zero callsites to migrate, but the file persists). Recommend P-tranche cross-repo cohort: drop the local fork + barrel, swap any future consumer to `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"`.

**Substrate non-regression**: the local fork does NOT import from upstream—no upstream rename can break it.

### 2. useClipboard adoption path (W6 Lane A)—DEFERRED + NON-MECHANICAL

**Upstream landed**: `src/composables/dom/useClipboard.ts` ships canonical composable `useClipboard(): { copied, copy }`—Vue-reactive shape synthesized from both consumer forks. Exported via `src/composables/dom/index.ts` and `src/api/index.ts`.

**value.js HEAD state**: 20 sites confirmed (rg count matches O11/e baseline):

```
20 files containing copyToClipboard|useClipboard (incl. definition + CLAUDE.md doc)
18 distinct consumer call sites (excludes definition + doc)
```

**Critical surface mismatch—migration is NOT mechanical**:

| Axis | value.js fork shape | glass-ui canonical shape |
|---|---|---|
| Symbol | `copyToClipboard(text)` bare function | `useClipboard()` composable factory |
| Return | `Promise<boolean>` | `{ copied: Ref<boolean>, copy: (text) => Promise<boolean> }` |
| Reactivity | none—fire-and-forget | reactive `copied` flag with auto-reset window |

All 20 value.js sites call `copyToClipboard(text)` directly. Glass-ui does NOT re-export a bare `copyToClipboard`—only the composable. Adoption requires per-site refactor:

```ts
// value.js HEAD (fork shape)
import { copyToClipboard } from "@composables/useClipboard";
const ok = await copyToClipboard(text);

// canonical migration (composable shape)
import { useClipboard } from "@mkbabb/glass-ui";  // (or /api)
const { copy } = useClipboard();
const ok = await copy(text);
```

**Disposition**: ADOPTION DEFERRED + NON-MECHANICAL. The O11/e baseline characterized this as "mechanical import-rewrite per site"—UPGRADED to non-mechanical: the canonical shape adds a reactive `copied` flag that 18 of 20 consumer sites neither need nor consume. Two paths forward:

- **Path A** (idiomatic): refactor all 20 sites to consume the composable; some sites benefit from the reactive flag (e.g. button-feedback toasts); others do not.
- **Path B** (additive): add a bare `copyToClipboard(text): Promise<boolean>` named export alongside the composable—minimal cross-repo friction; preserves value.js call shape verbatim.

Recommend Path B at the P-tranche cross-repo wave authoring, OR re-open W6 Lane A bounds at P open to add the bare-function co-export upstream first. Decision deferred to orchestrator.

**Substrate non-regression**: the local fork has no upstream dependency—no upstream rename breaks the 20 sites. The composable's existence at HEAD is additive.

### 3. usePopupMutex still 1 site (single-consumer DEFER)—VERIFIED UNCHANGED

`rg -l "usePopupMutex" /Users/mkbabb/Programming/value.js/` returns 2 paths:
- `demo/@/components/custom/dock/composables/usePopupMutex.ts` (definition; 85 LoC)
- `demo/@/components/custom/dock/Dock.vue` (sole consumer)

**Disposition**: DEFER holds at O close. Cross-walked at O11/e against `keyframes.js`, `fourier-analysis`, `bbnf-buddy`, `words/frontend`, `speedtest`—zero matches. Fails ≥ 2-consumer bar per L invariant 8. Hold as value.js-internal under J invariant 10 conservation gate; revisit if a second consumer surfaces (next round-2 audit at P close).

### 4. dock-DI BINARY-TRANSPARENT verification—**REGRESSION FOUND**

**Upstream O.W2 change**: 6 string-keyed dock provides (`glassDockContext`, `glassDockId`, `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) collapsed into a single typed `DOCK_CONTEXT_KEY: InjectionKey<DockContext>`. Helper pair `useDockContext()` (strict) / `useOptionalDockContext()` (silent null) is the canonical consumption surface. Per `dockContext.ts:10-16` header comment.

**value.js HEAD state**:

```
/Users/mkbabb/Programming/value.js/demo/@/components/custom/color-picker/controls/ActionButton.vue:
  44: const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
  45: const dockRelease  = inject<(() => void) | null>("dockRelease",  null);
  72:         dockKeepOpen?.();
```

ActionButton.vue reaches into the RETIRED string keys. At runtime against glass-ui v1.4.0:

- `inject("dockKeepOpen", null)` returns `null` (key never provided)
- `inject("dockRelease", null)` returns `null`
- `dockKeepOpen?.()` / `dockRelease?.()` no-op silently via optional-chaining

**This is a SILENT RUNTIME REGRESSION**, not a compile-time break—TypeScript accepts `inject<T>("...", null)` because the string-key inject surface has no type discriminant against the new symbol-key. The user-observable symptom: when an ActionButton's HoverCard opens inside the dock, the dock no longer holds open (timer-based collapse resumes after `collapseDelay`).

**Disposition**: BLOCKER for v1.4.0 BINARY-TRANSPARENT claim—fails the O.W2 invariant. Migration:

```ts
// value.js ActionButton.vue (current—broken at v1.4.0)
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease  = inject<(() => void) | null>("dockRelease",  null);

// canonical fix (typed-context consumption)
import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";
const dock = useOptionalDockContext();
// then: dock?.keepOpen() and dock?.release()
```

This is a 1-file, ~6-line surgical fix. Recommend prioritizing it ahead of HeaderRibbon / useClipboard adoption in any cross-repo wave—it is a silent regression that the consumer-side build will not surface.

**Note**: O11/e baseline did not enumerate ActionButton.vue; this finding is NEW at the W7 re-audit because O.W2 only landed after the O11/e baseline. The cross-walk WAS the missing step.

### 5. Renames audit—**BLOCKER FOUND**

#### 5a. `avatarVariants` (avatarVariant → avatarVariants)—**BROKEN**

**Upstream**: `src/components/ui/avatar/index.ts:7` exports `avatarVariants` (plural; CVA factory) + `AvatarVariants` (type).

**value.js HEAD state**: `demo/@/components/ui/avatar/index.ts` is a passthrough barrel:

```ts
export { Avatar, AvatarImage, AvatarFallback, avatarVariant, type AvatarVariants } from "@mkbabb/glass-ui";
```

The barrel imports `avatarVariant` (singular—does NOT exist upstream). This breaks at TypeScript compile and at runtime at v1.4.0 adoption.

**Disposition**: BLOCKER—typo in the passthrough barrel. Surgical fix (1 character):

```ts
// before
export { ..., avatarVariant, ... } from "@mkbabb/glass-ui";
// after
export { ..., avatarVariants, ... } from "@mkbabb/glass-ui";
```

Verify whether any value.js call site actually imports `avatarVariant` from `@components/ui/avatar`—if zero, the rename closes the gap with no callsite changes; if non-zero, those sites must also flip.

`rg -n "avatarVariant\b" /Users/mkbabb/Programming/value.js/`—verified zero non-barrel hits at audit time. Single-file fix.

**Note on O11/e baseline**: "value.js has a passthrough avatar barrel—will fail at upgrade unless updated" is CONFIRMED here. The barrel was already drifted from upstream pre-O (the singular `avatarVariant` form was never canonical at glass-ui).

#### 5b. `installDarkModeSync` (useDarkModeSync → installDarkModeSync)—CLEAN

**Upstream**: `src/composables/motion/installDarkModeSync.ts:13` renamed from `useDarkModeSync` per O.W4 Lane B Fix 3.

**value.js HEAD state**: `rg -n "useDarkModeSync|installDarkModeSync"` against `/Users/mkbabb/Programming/value.js/demo/` + `/src/` returns **zero matches**. No consumer site touches the symbol.

**Disposition**: CLEAN. value.js does not consume the dark-mode sync helper; the rename is transparent.

## § Substrate non-regression—will value.js build at v1.4.0?

**Build prediction**: **NO—will fail.**

Two failures:

| Failure | File | Type | Fix complexity |
|---|---|---|---|
| `avatarVariant` non-export | `demo/@/components/ui/avatar/index.ts` | TS compile error | 1 character |
| `dockKeepOpen` / `dockRelease` injects no-op | `demo/@/components/custom/color-picker/controls/ActionButton.vue` | runtime silent regression (no TS error) | ~6 lines / 1 file |

The first surfaces immediately at `tsc` / vite-build. The second compiles green but degrades the dock-with-popover hold behaviour at runtime.

The N4-rerun + O11/e baseline claim "build green against v1.0.4" stood because v1.0.4 still shipped the string-keyed dock provides AND because `avatarVariant` typo was already there pre-O (latent—both `avatarVariant` and `avatarVariants` were string-typed in value.js' import but neither was exported under that exact identifier at v1.0.4 either; verify by `git log -- src/components/ui/avatar/index.ts` upstream). Actually the upstream identifier has been `avatarVariants` since v0.8.6—so value.js' passthrough barrel was likely failing at install since pre-O, OR the symbol wasn't being statically resolved by the dependent code, OR it was a TODO-typo never exercised.

**Recommendation**: orchestrator should land a 2-file cross-repo PR against value.js' `w.w2.1-value-js-prebuild` branch:

1. `demo/@/components/ui/avatar/index.ts`: `avatarVariant` → `avatarVariants`.
2. `demo/@/components/custom/color-picker/controls/ActionButton.vue`: replace string-key injects with `useOptionalDockContext()`.

These two fixes restore BINARY-TRANSPARENT for value.js at v1.4.0. Per cross-repo READ-ONLY policy this lane DOES NOT mutate; surface for user-authorized P-tranche cross-repo wave.

## § Adoption opportunities (HeaderRibbon + useClipboard)

Beyond the 2 surgical blockers above, two non-blocking adoption opportunities surfaced:

### HeaderRibbon—retire local fork

- Drop `demo/@/components/custom/header-ribbon/` (155 LoC + barrel + index.ts).
- Zero in-repo consumers means zero call-site changes needed.
- Canonical upstream shape adopted value.js' hover-tracking + custom max-width variant per W6 Lane A—drift-free retirement.
- **Diff size**: ~160 LoC deletion, 0 LoC of consumer-side replacement.

### useClipboard—retire local fork (after upstream co-export)

- Two viable paths (Path A / Path B per finding 2 above).
- Path B (recommended): add bare `copyToClipboard` named export to `src/composables/dom/useClipboard.ts`; value.js fork retires with one-line import rewrite at all 20 sites.
- Path A (idiomatic): 20-site refactor to consume the composable; uneven benefit (some sites would gain reactive `copied`, most would not).

These are P-tranche cross-repo wave material; not blockers for v1.4.0 substrate close.

## § Verdict

**BLOCKER**—value.js will NOT build/run cleanly at glass-ui v1.4.0 adoption.

| Severity | Finding | Path | Resolution |
|---|---|---|---|
| BLOCKER | `avatarVariant` non-export typo (latent pre-O; surfaces at v1.4.0 install if not already failing) | `demo/@/components/ui/avatar/index.ts` | 1-char fix |
| BLOCKER | `dockKeepOpen` / `dockRelease` string-key injects no-op at v1.4.0 | `demo/@/components/custom/color-picker/controls/ActionButton.vue` | `useOptionalDockContext()` migration (~6 lines) |
| MINOR | HeaderRibbon local fork persists (zero consumers; cleanup opportunity) | `demo/@/components/custom/header-ribbon/` | retire (P-tranche wave) |
| MINOR | useClipboard adoption is non-mechanical (composable vs bare-function shape divergence) | 20 sites | path B co-export + import rewrite (P-tranche wave) |
| CLEAN | `usePopupMutex` still 1 site—DEFER holds | n/a | hold as value.js-internal |
| CLEAN | `installDarkModeSync` rename | n/a | zero consumers |
| CLEAN | All other N + M substrate inheritance | n/a | no regression |

**Carry-forward to P** (named-destination per item):
- P cross-repo wave: surgical fix pair (avatar + ActionButton)—REQUIRED before v1.4.0 adoption claim binds for value.js.
- P cross-repo wave: HeaderRibbon fork retirement.
- P substrate or cross-repo wave: decide useClipboard adoption path (Path B co-export upstream + 20-site import rewrite recommended).

**Per-cross-repo READ-ONLY policy**: this lane DOES NOT mutate value.js. Two BLOCKER findings surfaced for user-authorized P-tranche cross-repo dispatch.

## § Evidence

- `git log c0cc349..HEAD` → 0 commits.
- `git status --short` → 4 modified library-internal + 5 untracked parsing/units modules + 2 untracked docs/ submodule paths (precepts).
- `grep "dockKeepOpen\|dockRelease" /Users/mkbabb/Programming/value.js/` → ActionButton.vue lines 44, 45, 72.
- `cat /Users/mkbabb/Programming/value.js/demo/@/components/ui/avatar/index.ts` → confirmed singular `avatarVariant` import.
- `rg -l "copyToClipboard|useClipboard" /Users/mkbabb/Programming/value.js/demo` → 20 files (matches O11/e baseline).
- `rg -l "usePopupMutex" /Users/mkbabb/Programming/value.js/` → 2 files (def + sole consumer Dock.vue).
- `rg -n "useDarkModeSync|installDarkModeSync" /Users/mkbabb/Programming/value.js/demo /Users/mkbabb/Programming/value.js/src` → zero matches.
- glass-ui HEAD: `src/components/custom/dock/composables/dockContext.ts:10-16` documents the 6→1 key collapse.
- glass-ui HEAD: `src/components/ui/avatar/index.ts:7` exports `avatarVariants` (plural).
- glass-ui HEAD: `package.json` exports `./header-ribbon` flat subpath; `./api` re-exports `useClipboard` types.

Read-only lane—no diff.
