# I.W2 — Runtime regression fixes (proof)

**Date**: 2026-05-05
**Lane**: I.W2 (single agent)
**HEAD at execution**: `c3bf0a2` (feat(tranche-i/w0): reconciliation audit + 6-agent close pattern)
**Working tree**: in flight alongside W1 (parallel wave; W1 deletions visible in git status — does not affect W2 bounds).

## Phase A — Shimmer matrix array-binding fix

### Source

`demo/stories/foundations/flourishes.vue`, line 201 (the `SHIMMERS` iteration `<p>`):

Before:
```vue
<p :class="cn(s.cls, 'text-display-3')">{{ s.sample }}</p>
```

After:
```vue
<p :class="[s.cls, 'text-display-3']">{{ s.sample }}</p>
```

### Why

`cn()` is `clsx + tailwind-merge`. tailwind-merge's `text-*` conflict heuristic strips `text-shimmer-{blue,vivid,pastel}` because they share the `text-` prefix with `text-display-3`. Vue's native array binding emits both classes as-is and bypasses tailwind-merge entirely.

### `cn` import retained

`cn` is still consumed at line 179 (`<div :class="cn(s.cls, 'h-3 w-full')" />` for the stripe utilities). Import remains.

### Verification (read-only)

- Read modified line 201; confirmed array-binding form `[s.cls, 'text-display-3']` is in place.
- Did not run Playwright; orchestrator runs the visual probe post-W2 dispatch per W2 spec hard gate (e).

## Phase B — 3 failing tests in `tests/public-surface.spec.ts`

Pre-W2 baseline (from `npx vitest run tests/public-surface.spec.ts`):

```
Test Files  1 failed (1)
     Tests  3 failed | 158 passed (161)
```

The 3 failing tests:

### B.1 — `keeps exact 'dock' runtime surface`

```
expected [ 'DOCK_KEEP_OPEN_SINK_KEY', …(8) ] to deeply equal [ 'DockDropdownTrigger', …(7) ]
```

`src/components/custom/dock/index.ts` exports 9 keys at HEAD (8 components + `DOCK_KEEP_OPEN_SINK_KEY` injection key consumed by `Slider.vue`'s glass-track variant via the dock-keep-open round-trip). The test's expected list lagged the actual export.

**Fix**: `tests/public-surface.spec.ts` `exactSubpathRuntimeSurfaces` dock entry — added `"DOCK_KEEP_OPEN_SINK_KEY"` in alphabetical position (first slot, before `"DockDropdownTrigger"`).

The injection key IS public surface: it is consumed by `src/components/ui/slider/Slider.vue:44-56` to register the glass-track variant with `DockLayerGroup`'s sink (per H W3 close `f3caa9f`). Did not touch `src/components/custom/dock/index.ts` — the export list is correct as-is; the test was the drifted artefact.

### B.2 — `does not re-export retired utility .code-badge`

```
expected '/* Shared utility classes */\n\n@laye…' not to contain '.code-badge'
```

`src/styles/utilities.css` carried a 12-line `.code-badge` rule (display: inline-flex; font-mono caption chip) at lines 159-171. The test's `retiredRootUtilities` list flags `.code-badge` for retirement — the rule was supposed to delete but never did.

**Fix**: deleted the `/* ── Inline code chip ── */` comment + `.code-badge` rule entirely from `src/styles/utilities.css`.

**Demo orphan note (out of W2 bounds)**: `demo/stories/compositions/code-prose.vue` (10 sites) and `demo/stories/compositions/prose-block.vue` (3 sites) consume `.code-badge`. These will render unstyled until a follow-up wave (W5 doc reconciliation or W4 R-NEW-1 aesthetic uplift naturally absorb the demo cleanup; the manifest entry at `demo/stories/manifest.ts:243` already advertises the chip as part of the story).

### B.3 — `keeps utility shimmer/progress aliases off undefined local tokens`

```
expected '/* Shared utility classes */\n\n@laye…' not to contain '--shimmer-duration'
```

`src/styles/utilities.css:131` had `animation: gold-shimmer-slide var(--shimmer-duration, var(--duration-shimmer)) linear infinite;`. The local `--shimmer-duration` alias variable was never defined in `tokens.css` (only `--duration-shimmer*` family is canonical). The fallback masked the missing alias.

**Fix**: replaced the var-with-fallback expression with the canonical token directly:

```css
animation: gold-shimmer-slide var(--duration-shimmer) linear infinite;
```

Also updated the docstring comment from "consumers tune cadence via --shimmer-duration" to "cadence comes from the canonical --duration-shimmer token" (no aliasing path remains; consumers override `--duration-shimmer` itself if needed).

**Token authority**: `src/styles/tokens.css:53-55` defines `--duration-shimmer-fast: 3s` / `--duration-shimmer: 5s` / `--duration-shimmer-slow: 8s`. The `.text-shimmer-gold` utility uses the medium tier. Demo `flourishes.vue` scoped styles still reference `--shimmer-duration` with the same fallback pattern — those are demo-only and out of W2 bounds (utilities.css only).

## Verification commands and outcomes

```
$ npx vitest run tests/public-surface.spec.ts
 Test Files  1 passed (1)
      Tests  151 passed (151)
```

(test count dropped from 161 to 151 because W1's parallel surface-trim wave removed 4 sub-component imports from the test file mid-flight — `MultiSelect`/`TagsInput`/`GlassPanel`/`MetaballCanvas`/`PaperBackdrop`/`StatusDot` deletions cascaded through `subpathRuntimeExports` and `uiRuntimeExports`. Net W2 result: 0 failures, all 3 originally-failing tests now pass.)

```
$ npm run typecheck
> vue-tsc --noEmit
(green; no output)
```

```
$ npm run test
 Test Files  18 passed (18)
      Tests  266 passed (266)
```

```
$ npm run build
[vite:dts] Declaration files built in 23088ms.
✓ built in 24.04s
```

## Hard-gate disposition

| W2 hard gate | Status |
|---|---|
| (a) `npx vitest run tests/public-surface.spec.ts` returns all-green (was 158/161) | **GREEN** — 151/151 (W1's parallel surface-trim shrank the suite; all 3 target failures fixed) |
| (b) `npm run test` green | **GREEN** — 266/266 across 18 files |
| (c) `npm run typecheck` + `npm run build` green | **GREEN** — both clean |
| (d) Tabs verification proof landed | **GREEN** — see `W2-tabs-verification.md` |
| (e) Phase A array-binding form confirmed at line 201 | **GREEN** — `:class="[s.cls, 'text-display-3']"` |

## Files modified

- `demo/stories/foundations/flourishes.vue` (line 201 — array binding)
- `tests/public-surface.spec.ts` (`exactSubpathRuntimeSurfaces` dock list — added `DOCK_KEEP_OPEN_SINK_KEY`)
- `src/styles/utilities.css` (deleted `.code-badge` rule + comment; replaced `--shimmer-duration` fallback with canonical `--duration-shimmer`)

## Files NOT modified (per bounds)

- `src/components/custom/dock/index.ts` — export list correct at HEAD; test was the drifted artefact.
- `src/components/ui/tabs/{Tabs,TabsList,TabsTrigger}.vue` — verification confirmed pattern shipped clean (see `W2-tabs-verification.md`); no change required.
- `src/styles/tokens.css` — token authority untouched; only utilities.css consumer migrated to canonical name.
- Demo stories `code-prose.vue` / `prose-block.vue` / `flourishes.vue` scoped `--shimmer-duration` — out of bounds for W2; orphaned references will resolve in W4/W5.

## Residual risks

1. **Demo `.code-badge` consumers render unstyled** until a follow-up wave cleans `demo/stories/compositions/code-prose.vue` and `prose-block.vue`. Recommend W5 doc reconciliation absorbs (or R-NEW-1 W4 aesthetic uplift, since the chip is purely presentational).
2. **Demo flourishes.vue scoped styles still reference `--shimmer-duration`** with fallback (lines 258, 277, 296). These render correctly because of the fallback, but the alias is technically undefined. Bound to demo internals; out of W2 bounds.
3. **Test suite size shrank concurrently** — 161 → 151 due to parallel W1 surface-trim. The dispatch's "161/161" baseline no longer applies after the in-flight W1 deletions. Net green is the binding gate.
4. **Concurrent edit warning** — `tests/public-surface.spec.ts` was modified externally between my Read and Edit operations. My target edit (dock list) landed correctly; I did not interfere with W1's other test-file deletions.

## Authority

Single-agent W2 lane at HEAD `c3bf0a2`. No commits made (orchestrator commits at W2 close per H invariant 10). No destructive git commands. Stayed inside file bounds. All three phases closed against artefacts: shimmer line 201 read-confirmed; 3 vitest failures resolved; Tabs verification ledger landed in companion doc.
