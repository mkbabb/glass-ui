# BI-ADDENDA R2 — Structure Residue Verification

Adversarial read-only verification against the live working tree at
`/Users/mkbabb/Programming/glass-ui` (uncommitted transaction of another agent).
Every verdict is grounded in a grep / find / file read performed this session.

Legend: CONFIRMED = claim holds as stated · CORRECTED = core true, wording/count off ·
REFUTED = claim false · UNVERIFIED = could not determine.

---

## Claim 1 [modal-overlay-single] — CONFIRMED

`src/components/_shared/ModalOverlay.vue` has exactly ONE consumer *family*: **dialog**.

- Only src import: `src/components/dialog/DialogContent.vue:15` (`import ModalOverlay from '../_shared/ModalOverlay.vue'`), used at line 369.
- No drawer / popover / toast (or any other family) imports it — grep across `src/ demo/ tests/` returned only dialog.
- Non-consumer hits: `demo/stories/manifest.ts:410` is a prose string ("… + ModalOverlay + …"), not an import; `tests/components/ui/_shared/ModalOverlay.test.ts` is a dedicated unit test that imports it directly.

Wave note: a colocation move of ModalOverlay into `dialog/` must also relocate the standalone test at `tests/components/ui/_shared/ModalOverlay.test.ts`.

## Claim 2 [stale-prop-dead] — CONFIRMED

`src/components/_shared/useStalePropWarning.ts` has ZERO external references.

- Grep of `src/ demo/ tests/ scripts/` for `useStalePropWarning` / `StalePropWarning` returned only the file's own definition (`:1` comment, `:58` `export function`). Excluding self → ZERO.
- It is an exported-but-unconsumed dead symbol (a `_shared` husk). Safe to delete.

## Claim 3 [virtual-orphan] — CORRECTED

Core is true; "demo-only" is inaccurate — there is ALSO a test consumer.

- **Zero src/ runtime consumers**: TRUE. The only `src/` mention is a doc comment at `src/composables/sidebar/types.ts:12` ("… the virtual-windowing `FlatSection` (`composables/virtual`) extend this …") — prose, not an import.
- **Demo consumers = 3 stories**: TRUE — `demo/stories/navigation/toc-tracking.vue:26-27`, `demo/stories/dock/dock-search.vue:21,24`, `demo/stories/data/virtual-section.vue:8`.
- **Test consumer (claim's "also check tests/")**: `tests/composables/virtual/virtualSectionLayout.test.ts:9-10` imports `@glass/composables/virtual/virtualSectionLayout` + `useWindowedStore`. So it is demo + test, not demo-only. (The constellationField.test.ts:135 hit is unrelated — a "virtual node" cursor comment.)
- **Not a published subpath**: TRUE — no `virtual` key in `package.json` exports, and `scripts/lib/subpath-policy.mjs:102` classifies `virtual: "INTERNAL"` ("/virtual RETIRED terminal; the engine stays internal").

Wave note: retirement must also delete `tests/composables/virtual/virtualSectionLayout.test.ts`.

## Claim 4 [motion-43] — CORRECTED

Count is **42** direct `.ts` files (excluding `core/`), not ~43. The proposed 6-way split
(spring / scroll / number / reveal / pointer + core) does NOT absorb every file cleanly.

Clean fits:
- **spring**: springPresets, springProjection, useSpring, useSpringMount, useSpringPress
- **scroll**: scrollReader, useScrollChrome, useScrollPin, useScrollProgress, useScrollScene, useScrollTrigger, supportsCssTimeline
- **number**: useAnimatedNumber, useAnimatedNumberMap, useCountup, useNumericTransition
- **reveal**: useLiquidReveal, useStaggerReveal, useStagger, useBloomUp, bloomUpField, vReveal, useLeadTrail
- **pointer**: pointerFieldMappings, usePointerVelocityField, useRoutePointer
- **core**: constants, motionTempo, useRAFLoop, useReducedMotion, useYieldToMain, index (barrel)

Files that do NOT fit any of the five named non-core buckets without a judgment call:
- `useSelectionGroup.ts`, `useSelectionIndicator.ts` — a distinct **selection** concept (no bucket).
- `useElementMorph.ts`, `useDragMorph.ts`, `useDockCtaReceive.ts` — a **morph** family (compositor spine + gesture morph + CTA-into-dock); straddles reveal/pointer, no home bucket.
- `useLiquidPress.ts`, `useLiquidFlex.ts` — press/squish physics; straddle spring vs interaction.
- `useTextHighlight.ts`, `useViewTransition.ts` — reveal-adjacent but not obviously "reveal".
- `useIntersectionPause.ts` — intersection-observer; scroll-adjacent or core.

Verdict: the 6-way split needs a 7th "morph"/"selection" bucket (or explicit rulings folding these into reveal/spring/pointer) to be clean.

## Claim 5 [ms9-dropped] — CONFIRMED

No live structure-differential guard (P013/MS9) exists in the working tree.

- No `tests/structure*` file exists (glob returned no match).
- `P013` / `MS9` / `structure-diff` grep over `*.mjs/*.ts/*.js/*.yml/*.json` (excluding node_modules/dist) hits ONLY `docs/tranches/**` ledgers + `docs/tranches/K|AY/**` audit reports — no live test or script.
- `tests/public-surface.spec.ts` covers only the **export surface** (runtime symbol presence, retired-subpath absence in `package.json.exports`/`typesVersions`: focus-scope, spa-view, icon-tooltip, icon-chip, metric-badge/cell/stack, notification, color-swatch). It does NOT assert flat-component structure, colocated CSS, or absence of a `src/subpaths/` mirror.
- Partial build-time census guard (not a test, not the P013 contract): `scripts/lib/subpath-policy.mjs` runs fail-closed classification via `libraryEntryMap()` / `buildEntrySet()`, wired into the build through `libraryEntries()` (`vite.config.ts:53`, `vite.iter.config.ts:25`) and `scripts/flatten-subpath-types.mjs:9`. This throws if a `src/components/<dir>` or `src/composables/<dir>` is unclassified — so it catches a stray classified/unclassified dir at build, but it does NOT assert "flat components / colocated css / no subpath mirrors."
- CI (`.github/workflows/ci.yml`) runs only `npm ci` → `typecheck` → `test` → `build`; no structure-guard step. `scripts/regen-exports.mjs` is invoked by nothing automated (no `--check` gate).
- `src/subpaths/` directory is ABSENT (the mirror is already retired) — but nothing FAILS if it reappears.

## Claim 6 [shared-pairs] — CONFIRMED

All six `_shared` members have exactly 2 consumer families each:

- `FeedbackMark.vue` → status-dot (`StatusDot.vue`) + pulse (`Pulse.vue`) = 2.
- `feedback.ts` → status-dot (`StatusDot.vue`, `status-dot/index.ts`) + pulse (`Pulse.vue`, `pulse/index.ts`) = 2.
- `disclosure-context.ts` → accordion (Trigger/Item/Content) + collapsible (Trigger/Content/Collapsible) = 2 families.
- `disclosure.css` → accordion (`Accordion.vue`) + collapsible (`Collapsible.vue`) = 2 families.
- `menuRowClass.ts` → combobox (`ComboboxItem.vue`) + select (`SelectItem.vue`) = 2.
- `valueDomain.ts` → progress (`Progress.vue`) + slider (`Slider.vue`) = 2.

## Claim 7 [empty-husks] — CORRECTED

`find -type d -empty` over `src/ demo/` returns **15** empty dirs (claim said ~14), with two wording issues:

Confirmed empty exactly as named (13):
- `src/components/`: controls, focus-scope, goo-filter, icon-chip, icon-tooltip, metric-badge, metric-cell, metric-stack, section, spa-view (10)
- `src/components/constellation/shaders` (claim's "constellation/shaders" — lives under `src/components/`, NOT `src/constellation/`)
- `src/styles/tabs`
- `demo/configurator/presets`
- `demo/stories/motion/curve-gallery`

Correction:
- The claim named `src/components/border-progress` as an empty husk. It is NOT empty — it holds one child. The empty dir is its nested `src/components/border-progress/composables` (the 15th empty dir, unnamed by the claim). A retirement wave must target `border-progress/composables`, not `border-progress`.

## Claim 8 [scripts-one-offs] — CORRECTED

`audit-stash-list.mjs` and `worktree-gc.mjs` are orphans; `reflect-capture-verify.mjs` is NOT.

- **`scripts/audit-stash-list.mjs`** — orphan CONFIRMED. Only self-references + `docs/**`/`CHANGELOG.md` prose. No `package.json`/CI/hook/other-script reference. Note `.githooks/` is now EMPTY (the `commit-msg` hook that likely invoked it is deleted — git status shows `D .githooks/commit-msg`; no husky dir).
- **`scripts/worktree-gc.mjs`** — orphan CONFIRMED. Only self-references + `docs/tranches/**` ledger/plan prose. No live wiring after harness deletion.
- **`scripts/reflect-capture-verify.mjs`** — REFUTED as an orphan. It is a LIVE dependency:
  - `scripts/lib/paint-arm.mjs:26,28,41` imports `oklabFromRgb` + the OKLab/hue-family exports from it.
  - `scripts/lib/gesture-frame-recorder.mjs:31` imports `pngRegionStats` from it.
  - Referenced across `tests-visual/*.spec.ts` (selection-card, glass-legibility, adaptive-glass-live, radio-fix, glass-identity, no-shadcn-default).
  Its inclusion in "referenced by nothing" is false.

Wave note: `reflect-capture-verify.mjs` cannot be pruned as a one-off; it is the shared PNG/OKLab colour-math home for the paint-arm live-π pipeline.
