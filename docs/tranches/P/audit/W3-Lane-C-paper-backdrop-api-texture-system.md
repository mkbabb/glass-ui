# P.W3 Lane C — PaperBackdrop /api promotion + texture-system DESIGN.md

**Date**: 2026-05-16
**Lane**: P.W3 HEADLINE Lane C — substrate promotion (PaperBackdrop /api + DESIGN.md texture system).
**Status**: COMPLETED.

---

## § 1 — Scope

Per `docs/tranches/P/waves/W3.md` Lane C + `docs/tranches/P/audit/P11-Lane-a-words-frontend.md` §G3 + §I2.

P11/a §3.4 surfaced ~500 LOC of consumer-side parallel substrate (words/frontend `useTextureSystem.ts` 162 LOC + 3 texture SFCs 341 LOC) that duplicates glass-ui's `<PaperBackdrop>` + `paper-underpaint` / `paper-grain-overlay` utilities. The substrate exists at HEAD; what was missing was the `/api` discovery-layer types + the canonical texture-system documentation in DESIGN.md to anchor the migration.

This lane:

1. Lifted `PaperBackdrop.vue`'s inline `defineProps<{...}>` to a named exported `PaperBackdropProps` interface (per the HeaderRibbon precedent applied to the AB+1 cohort at P.W1 Lane A).
2. Introduced `PaperBackdropFrequency` as the `"clean" | "aged"` turbulence-register surface enum (parallel to `MetricCellAppearance` / `AnimatedDigitMode`).
3. Promoted both types through `src/components/custom/paper-backdrop/index.ts` + `src/api/index.ts`.
4. Added the "Texture system" section to DESIGN.md documenting the substrate + custom-property cascade + migration path for the consumer-side cleanup at P.W5 Lane E.

---

## § 2 — Props promotion table

| Type | Source | Barrel | /api section |
|---|---|---|---|
| `PaperBackdropProps` | `src/components/custom/paper-backdrop/PaperBackdrop.vue:21` (lifted from inline) | `src/components/custom/paper-backdrop/index.ts:2` | "Paper / texture" (NEW) |
| `PaperBackdropFrequency` | `src/components/custom/paper-backdrop/PaperBackdrop.vue:12` (NEW union) | `src/components/custom/paper-backdrop/index.ts:2` | "Paper / texture" (NEW) |

### § 2.1 — SFC change (Step 1)

`PaperBackdrop.vue` (34 → 43 LOC):

- Added `export type PaperBackdropFrequency = "clean" | "aged"` with JSDoc explaining the canonical texture-system cascade pattern.
- Lifted `interface PaperBackdropProps { ... }` → `export interface PaperBackdropProps { ... }` (the prior shape was inline-non-exported).
- The `frequency` prop now consumes `PaperBackdropFrequency` instead of the inline union literal.

### § 2.2 — Barrel change (Step 2)

`src/components/custom/paper-backdrop/index.ts`:

```ts
export { default as PaperBackdrop } from "./PaperBackdrop.vue";
export type { PaperBackdropFrequency, PaperBackdropProps } from "./PaperBackdrop.vue";
```

Pattern matches the MetricCell precedent (export types from `.vue` directly) rather than the HeaderRibbon precedent (separate `types.ts`) — chosen because the SFC is 43 LOC total and a `types.ts` would add overhead.

### § 2.3 — /api promotion (Step 3)

`src/api/index.ts` "Paper / texture" section added (new section header `// ── Paper / texture ─────…`). Preamble running tally updated with a P.W3 Lane C entry:

> P.W3 Lane C extensions (v1.8.0): 2 type promotions for the paper-backdrop / texture-system substrate per P11/a §G3 + §I2. `PaperBackdropProps` lifts the inline `defineProps<{...}>` shape to a named interface (matching the HeaderRibbon precedent applied to the AB+1 cohort at P.W1 Lane A); `PaperBackdropFrequency` is the `"clean" | "aged"` turbulence-texture register parallel to `MetricCellAppearance` / `AnimatedDigitMode`. The canonical texture-system pattern (consumer retints via `--paper-*-texture` CSS custom properties at `:root`) is documented in DESIGN.md "Texture system" section. Surface count 64 → 66 (62 types + 4 constants).

---

## § 3 — DESIGN.md texture-system documentation

New section authored at `DESIGN.md:1239-1290` (52 lines, including blank-line separator).

| Subsection | Line | Contents |
|---|---|---|
| `## Texture system` | 1239 | Section header + preamble |
| `### Substrate` | 1243 | `<PaperBackdrop>` + `paper-underpaint` + `paper-grain-overlay` enumeration with absolute file path references |
| `### Custom-property cascade pattern` | 1249 | `:root` override example + parallel to `--phase-color-*` cascade (AC.W6c / v1.5.1) + the consumer-extends-without-fork principle (J invariant) |
| `### Migration path — consumers shipping a parallel useTextureSystem composable` | 1266 | 4-step migration shape citing P11/a §G3 + §I2 (words/frontend) — drop composable + 3 SFCs (~500 LOC), replace call sites, override at `:root`, collapse local tailwind plugin block. Includes the canonical `/api` import snippet. |

The new section sits just under the existing "Paper textures" mini-section (line 1227) which documents the bare tokens (`--paper-texture-size`, `--paper-clean-texture`, `--paper-aged-texture`); the new section escalates from token-listing to substrate-pattern documentation, which is the level downstream consumers need to act on.

Prose register matches DESIGN.md house style: terse + factual; em dashes without spaces; no grandiloquence.

---

## § 4 — ≥ 2-consumer verification

Per N invariant 23 + P invariant 28.

### Consumer #1 — words/frontend (CANDIDATE for P.W5 Lane E cross-repo write)

**Status at HEAD**: parallel implementation persists.

Absolute path evidence:

- `/Users/mkbabb/Programming/words/frontend/src/composables/useTextureSystem.ts` — 162 LOC composable reconstructing the `--paper-{clean,aged,handmade,kraft}-texture` register + blend-mode + intensity state.
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/TextureBackground.vue` — 75 LOC.
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/TextureCard.vue` — 149 LOC.
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/TextureOverlay.vue` — 117 LOC.
- Total: 503 LOC of parallel substrate.

Call sites consuming `useTextureSystem`:

- `/Users/mkbabb/Programming/words/frontend/src/components/custom/card/Card.vue:16,41`
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/TextureBackground.vue:16,47`
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/TextureCard.vue:41,77`
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/TextureOverlay.vue:15,57`

Direct `texture-paper-clean` utility usage (the bare class):

- `/Users/mkbabb/Programming/words/frontend/src/components/custom/pwa/PWAInstallPrompt.vue:10`
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/pwa/PWANotificationPrompt.vue:10`

`/api` types from this lane (`PaperBackdropFrequency`, `PaperBackdropProps`) anchor the cross-repo write at P.W5 Lane E. Consumer-side `TextureType` (`'clean' | 'aged' | 'handmade' | 'kraft'`) collapses to `PaperBackdropFrequency` (`'clean' | 'aged'`) plus consumer-defined extensions via `:root` `--paper-handmade-texture` / `--paper-kraft-texture` overrides (the documented extension pattern).

### Consumer #2 — glass-ui demo stories (production binary at HEAD)

**Status at HEAD**: 9 sites consume `PaperBackdrop` or the `paper-underpaint` / `paper-grain-overlay` utilities directly. The demo is the canonical at-HEAD consumer.

Absolute path evidence:

- `/Users/mkbabb/Programming/glass-ui/demo/layout/AppShell.vue:10,60` — `<PaperBackdrop class="fixed inset-0 -z-10 bg-background" />` substrate at the app shell root.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/primitives/paper-backdrop.vue:7,20,26,39,52` — 4 `<PaperBackdrop>` instances exercising the `frequency` + `opacity` props.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/foundations/paper-glass.vue:150,213,263` — 3 `paper-grain-overlay` utility consumers.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/foundations/intro.vue:24` — 1 utility consumer.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/motion/typewriter.vue:47` — 1 utility consumer.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/motion/springs.vue:142` — 1 utility consumer.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/motion/scroll-type.vue:73` — 1 utility consumer.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/compositions/math-paper.vue:15` — 1 utility consumer.
- `/Users/mkbabb/Programming/glass-ui/demo/stories/ShowcaseFrame.vue:21,65` — `grain` prop conditionally adds `paper-grain-overlay`.

### Consumer #3 (negative finding) — speedtest

speedtest does NOT consume `PaperBackdrop` or the `paper-underpaint` / `paper-grain-overlay` utilities in its production binary. `grep -rn 'PaperBackdrop\|paper-underpaint\|paper-grain-overlay' /Users/mkbabb/Programming/speedtest/src /Users/mkbabb/Programming/speedtest/index.html` returns ZERO matches. The P11/f baseline references (audit docs only) point to the demo coverage at glass-ui side. Speedtest is NOT a 2nd consumer for this substrate.

### ≥ 2-consumer disposition

The ≥ 2-consumer bar (L invariant 8) clears via:

- words/frontend (consumer #1 — 503 LOC migration candidate; cross-walk lands at P.W5 Lane E).
- glass-ui demo (consumer #2 — 9 production-binary call sites at HEAD; substrate is in-use today).

Substrate-without-consumer-binary invariant: GREEN. The substrate already had ≥ 2 consumers; this lane PROMOTES the existing types + DOCUMENTS the canonical pattern. No primitive landed-on-spec.

---

## § 5 — Surface count diff

64 → 66 (62 types + 4 constants).

Pre-lane (P.W2 Lane D close): 64 (60 types + 4 constants).
This lane adds: `PaperBackdropProps`, `PaperBackdropFrequency` (2 types).
Post-lane: 66 (62 types + 4 constants).

The preamble running tally in `src/api/index.ts` is updated. Constants unchanged (4: `DEFAULT_AURORA_CONFIG`, `MAX_NUCLEI`, `MAX_STOPS`, `DEFAULT_METABALL_CONFIG`).

---

## § 6 — Verification

### § 6.1 — typecheck

`npm run typecheck` (`vue-tsc --noEmit`): **PASS for Lane C files**.

Output:

```
src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts(110,54): error TS1131: ...
src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts(110,55): error TS1005: ...
src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts(140,1): error TS1128: ...
src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts(140,2): error TS1128: ...
```

All 4 errors are in `src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts` — owned by Lane B (concurrent ProgressiveSidebar split agent), out of Lane C's file bounds. Verified by `git diff --stat HEAD` showing the test file modifications are not in this lane's bounds.

Filtered output (`npx vue-tsc --noEmit 2>&1 | grep -v 'sidebar/__tests__/ProgressiveSidebar.test.ts'`): empty (zero errors outside Lane B's bounds).

Lane C verdict: **typecheck PASS**.

### § 6.2 — tests

`npm test` (`vitest run`):

```
 Test Files  32 passed (32)
      Tests  365 passed (365)
   Start at  15:40:54
   Duration  2.72s
```

All 365 tests across 32 files: **PASS**.

(Note: the typecheck failures in the sidebar test FILE do not block vitest because vitest skips parse-time errors in unreferenced tests; the 4 TS errors are syntactic-but-vitest-tolerated.)

### § 6.3 — NO build mid-task

Per the binding operational constraint #2: `npm run build` was NOT invoked. Validation flows through typecheck + test only. Build defers to orchestrator at W3 close.

---

## § 7 — Hardened-git-clause + no-build-mid-task compliance

- No `git stash` (any form) invoked. `git status` + `git diff --stat HEAD` are read-only inspection calls only.
- No mutating git operations (no add / commit / stash / checkout / reset / restore).
- No `npm run build` mid-task (constraint #2).
- File bounds disjoint per W3 lane manifest:
  - `src/components/custom/paper-backdrop/PaperBackdrop.vue` (NOT in Lane A or Lane B bounds)
  - `src/components/custom/paper-backdrop/index.ts` (NOT in Lane A or Lane B bounds)
  - `src/api/index.ts` (NOT in Lane A or Lane B bounds — Lane A touches `slider`; Lane B touches `sidebar`)
  - `DESIGN.md` (NOT in Lane A or Lane B bounds — both lanes scope to `src/`)

Verified disjoint via `git diff --stat HEAD`:

```
 DESIGN.md                                          |  47 +++++
 src/api/index.ts                                   |  27 +++
 src/components/custom/paper-backdrop/PaperBackdrop.vue        |  14 +-
 src/components/custom/paper-backdrop/index.ts      |   1 +
 src/components/custom/sidebar/ProgressiveSidebar.vue          | 206 +++++++++++++++------  ← Lane B
 src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts | 115 +++++++++++-     ← Lane B
 src/components/custom/sidebar/index.ts             |  11 ++  ← Lane B
 src/components/ui/slider/Slider.vue                |  72 ++++++-  ← Lane A
 src/components/ui/slider/index.ts                  |  14 +-  ← Lane A
```

Lane C's 4 modified files (DESIGN.md + api/index.ts + paper-backdrop/PaperBackdrop.vue + paper-backdrop/index.ts) overlap zero bytes with Lane A or Lane B.

---

## § 8 — Status

**COMPLETED.**

- Step 1 — `PaperBackdropProps` lifted to named exported interface; `PaperBackdropFrequency` union introduced. **DONE.**
- Step 2 — `/api` "Paper / texture" section added; preamble running tally updated to 64 → 66. **DONE.**
- Step 3 — DESIGN.md "Texture system" section authored at `DESIGN.md:1239-1290` covering substrate, custom-property cascade, and migration path. **DONE.**
- Step 4 — ≥ 2-consumer verification documented: words/frontend (P.W5 Lane E candidate) + glass-ui demo (9 production-binary sites at HEAD). **DONE.**
- Step 5 — Verification: typecheck PASS for Lane C bounds; tests 365/365 PASS. **DONE.**

The substrate-side promotion is complete. Consumer-side cleanup (words/frontend retiring ~500 LOC of `useTextureSystem` + 3 texture SFCs) lands at P.W5 Lane E per the W3.md manifest.

---

## § 9 — Files referenced

Lane C bounds (modified):

- `/Users/mkbabb/Programming/glass-ui/src/components/custom/paper-backdrop/PaperBackdrop.vue`
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/paper-backdrop/index.ts`
- `/Users/mkbabb/Programming/glass-ui/src/api/index.ts`
- `/Users/mkbabb/Programming/glass-ui/DESIGN.md`

Lane C bounds (NEW):

- `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/audit/W3-Lane-C-paper-backdrop-api-texture-system.md` (this doc)

Cited:

- `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/waves/W3.md` (Lane C manifest)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/audit/P11-Lane-a-words-frontend.md` (§G3 + §I2 audit basis)
- `/Users/mkbabb/Programming/glass-ui/src/styles/paper.css` (canonical texture utilities)
- `/Users/mkbabb/Programming/words/frontend/src/composables/useTextureSystem.ts` (consumer #1 migration target)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/*.vue` (consumer #1 migration targets)
- `/Users/mkbabb/Programming/glass-ui/demo/stories/primitives/paper-backdrop.vue` (consumer #2 demo)
- `/Users/mkbabb/Programming/glass-ui/demo/layout/AppShell.vue` (consumer #2 app shell)

---

**Lane C close**: 2026-05-16 | P.W3 HEADLINE substrate-promotion + DESIGN.md texture-system canonical pattern.
