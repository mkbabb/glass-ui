# P11/e — value.js consumer re-audit at glass-ui v1.7.0

Read-only audit of `/Users/mkbabb/Programming/value.js/` at HEAD, P round-2 consumer audit lane. Verifies the O.W7 baseline (CR-1 surgical fix pair still un-applied; CR-4 fork retirements still pending), characterizes the useClipboard Path A vs Path B trade against the actual 19 call sites, dispositions PD-3 (M.W1 WIP branch sync), and scans for AB+1 primitive adoption opportunities.

## § State delta vs O.W7 baseline

- HEAD: `c0cc349 chore(demo): adopt glass-ui v1.0 subpath surface + retire local barrels (constellation M.W1 Lane B)`.
- Branch: `w.w2.1-value-js-prebuild`.
- **0 commits since O.W7 baseline** (`git log c0cc349..HEAD` empty). The WIP branch remains frozen.
- Working tree: 4 modified library-internal files (`plugins/vite-source-export.ts`, `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts` — +347/-72) + 5 untracked `src/parsing` / `src/units` modules + 2 untracked docs submodule paths (`.gitmodules`, `docs/instructions/`, `docs/precepts/`). All drift is library-side; zero demo-surface touches.
- glass-ui dep: `"@mkbabb/glass-ui": "file:../glass-ui"` — live filesystem link picks up HEAD `b201b03` (v1.7.0 untagged). `node_modules/@mkbabb/glass-ui/package.json` confirms `"version": "1.7.0"`.

## § Build verification at v1.7.0

Per O.W7 baseline prediction: BLOCKER expected at v1.4.0 adoption. **Actual result at v1.7.0: both build modes green.**

| Build mode | Entry | Touches `demo/` ? | Result |
|---|---|---|---|
| `npm run build` (production) | `src/index.ts` library entry | No | GREEN (3.09s; 33 modules) |
| `npx vite build --mode gh-pages` (demo) | `demo/` page entries | Yes | GREEN (5.97s; full demo bundle) |

The avatar typo at `demo/@/components/ui/avatar/index.ts:1` does NOT block the build for two reasons:

1. **Tree-shaking masks the error**: the 2 consumer files that import the barrel (`MobileMenuDropdown.vue:12`, `ProfileSection.vue:11`) destructure only `{ Avatar, AvatarImage }` — never `avatarVariant`. Vite/Rollup elides the unused (and non-existent) named import without raising.
2. **No typecheck gate**: `package.json` has no `typecheck` script; `vue-tsc` is not installed; `tsc` is present but not wired into `build`. The bad import would surface only under strict typecheck.

**Disposition**: The O.W7 baseline's "BLOCKER" prediction was technically wrong at v1.4.0+ because Vite's lenient tree-shaking absorbs the bad import. The typo IS still a defect — any future strict-typecheck wiring (recommended) surfaces it immediately, and a third callsite consuming `avatarVariant` from this barrel would hard-fail at build. **CR-1 (avatar) remains a latent BLOCKER**, not a hot one.

The ActionButton silent runtime regression (CR-1 dock keys) is also still present and **silent by design** — TypeScript accepts `inject<T>("dockKeepOpen", null)` because string-key inject has no type discriminant against the canonical symbol-keyed `DOCK_CONTEXT_KEY`. The injects return `null`, `dockKeepOpen?.()` no-ops, and the dock idle-collapse timer is no longer suppressed when an ActionButton HoverCard opens. **Observable to runtime UX, invisible to build.**

## § CR-1 (avatar + dock-DI) — concrete migration paths

### CR-1a: `demo/@/components/ui/avatar/index.ts` — 1-character fix

Current (broken — references non-existent named export):

```ts
export { Avatar, AvatarImage, AvatarFallback, avatarVariant, type AvatarVariants } from "@mkbabb/glass-ui";
```

Canonical:

```ts
export { Avatar, AvatarImage, AvatarFallback, avatarVariants, type AvatarVariants } from "@mkbabb/glass-ui";
```

Verified zero non-barrel callsites for `avatarVariant` in value.js (`rg -n '\bavatarVariant\b' demo/ src/` returns 1 line — the barrel itself). Single-file 1-character fix; zero downstream callsite impact.

### CR-1b: `demo/@/components/custom/color-picker/controls/ActionButton.vue` — typed-context migration

Current (lines 44-45 + 72-74):

```ts
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);
// ...
if (v) {
    dockKeepOpen?.();
} else {
    dockRelease?.();
}
```

Canonical (glass-ui v1.4.0+):

```ts
import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";
const dock = useOptionalDockContext();
// ...
if (v) {
    dock?.keepOpen();
} else {
    dock?.release();
}
```

Verified canonical surface at `src/components/custom/dock/composables/dockContext.ts:38`:

- `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` — the only key now provided.
- `useDockContext()` (strict throws) / `useOptionalDockContext()` (silent null) — the canonical helper pair.

Single-file ~6-line surgical fix. **This is the load-bearing CR-1 finding** — the avatar typo is cosmetic-latent; this is a live UX regression.

## § CR-4 — concrete migration paths

### CR-4a: HeaderRibbon local-fork retirement (155 LOC)

- Local fork: `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (155 LOC) + `index.ts` (1-line re-export).
- **Zero in-repo consumers**: `rg -ln 'HeaderRibbon|from.*header-ribbon' demo/ src/` returns empty (besides the fork dir itself). The `<HeaderRibbon>` component is registered nowhere.
- Canonical at glass-ui: `src/components/custom/header-ribbon/HeaderRibbon.vue` + flat subpath `@mkbabb/glass-ui/header-ribbon` (verified in `package.json` exports). Side-by-side diff against the local fork shows the canonical shape carries the same props, slots (`anchor` / `items` / `left`), and position semantics — the fork is upstream-aligned.

**Migration**: delete the 2-file local fork. No call-site rewrites. If a future value.js page needs HeaderRibbon, it imports from `@mkbabb/glass-ui/header-ribbon` directly.

**Diff size**: ~160 LOC deletion, 0 LOC consumer-side replacement.

### CR-4b: useClipboard adoption — surface mismatch characterized

19 callsite files + 1 definition file = 20 total (matches O.W7 baseline).

The local fork at `demo/@/composables/useClipboard.ts` (28 LOC) exports a bare async function `copyToClipboard(text: string): Promise<boolean>` with execCommand fallback. Glass-ui canonical at `src/composables/dom/useClipboard.ts` ships a Vue-reactive composable `useClipboard({ resetMs? }): { copied: Ref<boolean>, copy: (text) => Promise<boolean> }`.

**Site-pattern audit** (3-sample read across 19 callsites):

| Site | Pattern | Path A fit | Path B fit |
|---|---|---|---|
| `MixResultDisplay.vue:18,25-27` | `copied = ref(false); await copyToClipboard(text); copied.value = true; setTimeout(...1500)` — exact `useClipboard` reproduction | NATURAL | wasteful (already has copied flag) |
| `GradientCodeEditor.vue:126-130` | Same hand-rolled `copied + setTimeout 1500` shape | NATURAL | wasteful |
| `ColorPicker.vue:117,226` | Fire-and-forget: `copyToClipboard(color)` with no `copied` flag | wasteful (unused reactive ref) | NATURAL |
| `PaletteCard.vue:150,324,364` | Fire-and-forget across 3 callsites | wasteful | NATURAL |

**Path-fit distribution (estimate from sample)**: roughly half the 19 sites carry a hand-rolled `copied + setTimeout` reproduction (Path A natural fit — net code reduction); the other half are fire-and-forget (Path B natural fit — preserves call shape).

### useClipboard Path A vs Path B — recommendation

Both paths are legitimate. The synthesis is **Path B as primary (additive co-export upstream) + Path A opportunistic** at the natural-fit sites.

**Path B (recommended primary)**: add a bare `copyToClipboard(text: string): Promise<boolean>` named export alongside the composable in `src/composables/dom/useClipboard.ts`. Re-export from `src/composables/dom/index.ts` and `src/api/index.ts`. value.js retires the local fork in one cross-repo PR — 20-file bulk import rewrite, zero call-site refactors. **Lowest friction; preserves user intent for fire-and-forget sites.**

Justification for the co-export, not viewed as legacy alias:
- `useClipboard()` carries Vue-reactive state and onScopeDispose — has overhead a fire-and-forget callsite does not want.
- Several glass-ui consumers (fourier-analysis as second-consumer documented in `useClipboard.ts:5-11`) also use the bare-function call site shape inline.
- The composable is the GENERAL form; the bare function is the SPECIAL form. Both are first-class.

**Path A (opportunistic refactor)**: at the ~half of sites that already hand-roll `copied + setTimeout`, switch to the composable in a follow-up — net code reduction (~6 lines/site × ~10 sites = ~60 LOC dead weight removed). Not in critical path; can ship in a P+1 wave.

**Path A pure (rejected)**: refactoring all 19 sites to the composable shape inserts unused reactive state at ~half of them. Violates the conservation invariant — substrate without consumer benefit.

## § usePopupMutex disposition (ZERO-DEFERRAL gate)

- Local: `demo/@/components/custom/dock/composables/usePopupMutex.ts` (85 LOC).
- Sole consumer: `demo/@/components/custom/dock/Dock.vue`.
- Cross-walked at O11/e against `keyframes.js`, `fourier-analysis`, `bbnf-buddy`, `words/frontend`, `speedtest` — zero matches.
- P round-2 re-walk: no second consumer surfaced.

**Disposition under P ZERO-DEFERRAL**: this fails the L invariant 8 ≥ 2-consumer bar AND has 1 stable consumer at HEAD. Two valid P-close paths:

1. **Formal RETIRE under value.js-internal classification** — keep the local composable, document it as a value.js-private dock primitive (not a substrate candidate), close the loop. The 85 LOC stays in value.js demo/ and never enters glass-ui. **Recommended** — `usePopupMutex` is genuinely value-add for the value.js color-picker but does not generalize.
2. **WIRE into ≥ 2** — survey whether any P-cohort consumer (e.g. keyframes.js EditorShell popovers, bbnf-buddy ToolsLayer) has a popup-mutex use case. If yes, promote to glass-ui. If no, fall back to (1).

Both paths satisfy ZERO-DEFERRAL: (1) is "formal RETIRE", (2) is "land".

## § AB+1 primitive adoption opportunities

Search for adoption candidates: `MetricBadge | MetricPill | MetricStack | MetricCell | MetricRow | AnimatedDigit | ResponsiveTabs | AnimatedNumber | useAnimatedNumber` → **zero hits in value.js demo/ + src/**.

Targeted scan for retro-fittable surfaces:

- **MixResultDisplay.vue palette grid**: `<TransitionGroup name="swatch-item">` over `WatercolorDot` items. Not a Metric* candidate — it's a visual swatch, not a numeric display.
- **No numeric KPI displays** at value.js demo surface. The app is color/gradient/palette focused, not metric-card focused.
- **No tabbed nav of the "switch between metric views" shape** — value.js uses dock layers + panes, which already have canonical primitives.

**Disposition**: value.js has no natural AB+1 adoption surface. The MetricCell/MetricStack/AnimatedDigit primitives are designed for KPI/numeric dashboard layouts (speedtest, fourier-analysis) — value.js's surface area does not include those. **No P-wave AB+1 adoption proposed for value.js.**

## § PD-3 disposition tree — M.W1 WIP branch sync

The `w.w2.1-value-js-prebuild` branch has been frozen at `c0cc349` since 2026-05-12 (≥ 2 days at audit time; carried through M, N, O, AB+1, into P). Branch content: M.W1 Lane B glass-ui v1.0 subpath surface adoption + local barrel retirement. The branch has never been merged to `master` because of the live working-tree drift (parsing/units library work in progress + missing docs submodule init).

Decision tree under P ZERO-DEFERRAL:

| Option | Action | Pre-condition | Trade |
|---|---|---|---|
| **(a) LAND on master** | rebase + merge `w.w2.1-value-js-prebuild` into `master`; commit or stash the parsing/units drift separately | user authorization + drift triage (the +347/-72 lines need to be either committed or formally shelved) | clears the WIP branch; clears M.W1 carry; CR-1 + CR-4 fixes still pending as separate PR |
| **(b) FORMAL ABANDON** | document why the M.W1 Lane B work is being walked back; reset master surface; close the branch | user decision that the subpath migration was premature | reverts months of demo barrel cleanup |
| **(c) INDEFINITE FREEZE (status quo)** | leave the WIP branch frozen; treat the M.W1 work as "done in value.js workspace, not in shared git history" | accepts ZERO-DEFERRAL violation | retains the chronic deferral pattern P explicitly retired |

**Recommendation: (a) LAND**. The substrate work in the WIP branch is good (it's the M.W1 outcome — subpath adoption + local barrel retirement); it just never got tidied to master. The blocker is operational, not architectural:

1. Triage the working-tree drift: the parsing/units changes are a separate concern from the demo barrel cleanup; they belong on a different branch or as a follow-on commit. Decide whether to land them alongside or split.
2. Tidy `.gitmodules` + the untracked `docs/precepts/` + `docs/instructions/` submodule paths (uninitialized submodule references; either init or remove).
3. Rebase the WIP branch onto master (it has 5 commits ahead of master, all from M.W1 cohort).
4. Merge.
5. After landing, ship the P-wave CR-1 + CR-4 fixes as the next PR.

**Option (c) is the ZERO-DEFERRAL violation P explicitly retired** — must be ruled out at P close.

**Requires user authorization** — this lane is READ-ONLY and cannot mutate the WIP branch.

## § P-wave cross-repo write proposals (user-authorization required)

Concrete writes to dispatch under P-wave cross-repo cohort (sized for one PR per consumer, or one mega-PR cohorted across consumers):

| # | Target | Files | LOC | Severity | Notes |
|---|---|---|---|---|---|
| **CR-1a** | value.js | `demo/@/components/ui/avatar/index.ts` | -1/+1 (1 char) | LATENT BLOCKER | typo fix; tree-shaking currently masks |
| **CR-1b** | value.js | `demo/@/components/custom/color-picker/controls/ActionButton.vue` | -3/+4 (~6 lines) | LIVE RUNTIME REGRESSION | dock idle-collapse no longer suppressed during ActionButton HoverCard hover |
| **CR-4a** | value.js | `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` + `index.ts` | -156 | CLEANUP | zero callsites; dormant fork |
| **CR-4b-1** | **glass-ui** | `src/composables/dom/useClipboard.ts` + `src/composables/dom/index.ts` + `src/api/index.ts` | +5/+1/+1 | UPSTREAM (Path B prep) | add bare `copyToClipboard` named export |
| **CR-4b-2** | value.js | `demo/@/composables/useClipboard.ts` + 19 callsite import rewrites | -28 + 19 import-line edits | CLEANUP (post-CR-4b-1) | retire local fork; bulk import flip |
| **CR-4b-3** | value.js (P+1 opportunistic) | ~10 sites with hand-rolled `copied + setTimeout` patterns | ~-60 net | OPTIMIZATION | swap hand-rolled flag for `useClipboard().copied` |
| **PD-3** | value.js | rebase + merge `w.w2.1-value-js-prebuild` → `master` | operational | CHRONIC DEFERRAL CLOSE | requires drift triage decision |
| **usePopupMutex** | docs/glass-ui | document value.js-internal classification | doc-only | FORMAL RETIRE | OR survey for 2nd consumer |

**Authorization flags**:

- CR-1a + CR-1b + CR-4a: low-risk surgical fixes, all on the `w.w2.1-value-js-prebuild` WIP branch — should land alongside PD-3 (the WIP-merge moment) OR as a separate PR after PD-3 lands.
- CR-4b-1: UPSTREAM glass-ui change (add bare-function co-export). Must land in glass-ui BEFORE CR-4b-2.
- CR-4b-2: depends on CR-4b-1 landing + glass-ui republish.
- CR-4b-3: post-everything optimization; safe to defer to P+1.
- PD-3: requires user decision on the parsing/units working-tree drift first.

## § Verdict

**BLOCKER (carried; identical to O.W7 baseline + new insight)**:

| Severity | Finding | Path |
|---|---|---|
| LATENT BLOCKER | `avatarVariant` typo — currently masked by tree-shaking, would surface under strict typecheck or 3rd callsite | CR-1a (1-char fix) |
| LIVE UX REGRESSION | `dockKeepOpen` / `dockRelease` string-key injects no-op silently against v1.4.0+ symbol-keyed dock context | CR-1b (~6-line typed-context migration) |
| CHRONIC DEFERRAL | M.W1 WIP branch frozen 2+ days (PD-3) — violates P ZERO-DEFERRAL gate | LAND (recommended) OR formal-abandon |
| CLEANUP | HeaderRibbon local fork (155 LOC; zero consumers) | CR-4a (deletion only) |
| CLEANUP (after upstream) | useClipboard surface mismatch | CR-4b Path B + opportunistic Path A |
| FORMAL RETIRE | `usePopupMutex` single-consumer | document as value.js-private |
| N/A | AB+1 primitive adoption (MetricCell / MetricStack / AnimatedDigit) | zero natural fit at value.js surface |

**Build status at v1.7.0 (unexpected from O.W7 prediction)**: both `npm run build` (library) and `vite build --mode gh-pages` (demo) GREEN. The avatar typo is tree-shaken; the ActionButton regression is runtime-only. This **does not invalidate the CR-1 fixes** — both are real defects that current toolchain leniency masks.

**Cross-repo write authorization**: required for ALL 7 dispatched items per the hardened-agent git clause. This lane DOES NOT mutate value.js. No commits authored; the WIP branch state at `c0cc349` is unchanged.

**P-tranche close path for value.js**: PD-3 LAND (a) + CR-1a + CR-1b + CR-4a + CR-4b-1 (upstream) + CR-4b-2 → all on the merged-back master, in one cross-repo cohort. The 3 ZERO-DEFERRAL items (CR-1, CR-4, PD-3) close together.

## § Evidence

- `cd /Users/mkbabb/Programming/value.js && git log --oneline -5` → `c0cc349` HEAD; no commits since baseline.
- `git branch --show-current` → `w.w2.1-value-js-prebuild`.
- `git status --short` → 4 modified library-internal + 5 untracked parsing/units + 3 untracked docs/.gitmodules paths.
- `git diff --stat` → +347/-72 across 4 files (all library-side, not demo-side).
- `npm run build` → 3.09s, 33 modules transformed, GREEN.
- `npx vite build --mode gh-pages` → 5.97s, full demo bundle, GREEN.
- `cat demo/@/components/ui/avatar/index.ts:1` → `export { ..., avatarVariant, ... }` (singular — non-existent upstream).
- `rg -n '\bavatarVariant\b' demo/ src/` → 1 line (the barrel itself; zero call sites).
- `rg -n 'from.*ui/avatar\b' demo/ src/` → 2 callsites, neither destructures `avatarVariant`.
- `cat demo/@/components/custom/color-picker/controls/ActionButton.vue:44-45,72-74` → confirmed string-key injects.
- glass-ui `src/components/custom/dock/composables/dockContext.ts:38` → `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` (only key provided).
- `rg -l 'HeaderRibbon' demo/ src/` → empty (no in-repo consumers besides the fork).
- `wc -l demo/@/components/custom/header-ribbon/HeaderRibbon.vue` → 155.
- `rg -ln 'copyToClipboard\b' demo/ src/` → 19 callsite files + 1 definition.
- `rg -ln 'usePopupMutex' demo/ src/` → 2 files (definition + sole consumer Dock.vue).
- `rg -ln 'MetricCell|MetricStack|MetricRow|AnimatedDigit|ResponsiveTabs|MetricBadge|MetricPill|AnimatedNumber|useAnimatedNumber' demo/ src/` → 0 hits.
- glass-ui `src/composables/dom/useClipboard.ts:48` → `useClipboard(options = {}): UseClipboardReturn` (composable; no bare-function co-export).
- glass-ui HEAD: `b201b03 chore(release): v1.7.0 — AB+1 substrate cohort (speedtest AC.W8e)`. `package.json` `"version": "1.7.0"`. `node_modules/@mkbabb/glass-ui/package.json` confirms symlink picks up v1.7.0.

Read-only lane — no diff.
