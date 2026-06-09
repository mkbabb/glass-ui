# AX inventory — C-speedtest (Constellation: speedtest as glass-ui consumer)

Read-only inventory (inv-16: speedtest WRITES nothing in glass-ui; all needs are
ASKS). glass-ui HEAD c72d2ac (3.8.0 + convergence-1 W44-W52 + convergence-2 W53-W59).
speedtest `/Users/mkbabb/Programming/speedtest` master **0751905**, pinned
`@mkbabb/glass-ui ^3.7.0`, installed **3.7.0** (NOT 3.8.0 — the R-CONSUME bump has
NOT happened).

## Coordination-state correction (the doc drift)

The routed-asks doc (`from-speedtest-AV-routed-asks.md`) says the bump is "3.6.0 →
3.8.0". The speedtest AV coordination ledger (`docs/tranches/AV/coordination/
glass-ui.md`) was written at 3.6.0; speedtest has SINCE adopted **3.7.0**
(`3ade5889 chore(deps): adopt glass-ui 3.7.0`). So the live R-CONSUME bump is
**3.7.0 → 3.8.0** (and onward to the convergence-published cut). This matters
because the breakage surface differs by version (see `--ease-apple-spring` below).

## DONE / SATISFIED (closed by 3.7.0 + AX)

- **ASK-GU-GOLD** (gold "→ Next" CTA) — CLOSED. speedtest CONSUMES the library
  `btn-audacious-gold` via a class binding (`src/components/Dock.vue:302`,
  `:class="{ 'btn-audacious-gold': surveyState?.canAdvance }"`), NO local
  redefinition (`grep '@utility btn-audacious-gold' src/` → empty). inv-16 clean.
  glass-ui canonicalized it (root utility + `gold-audacious` Button variant +
  CLAUDE.md enumeration + `proof:affordance-contrast`). No glass-ui work owed.
- **ASK-GU-CARDRADIUS / ASK-GU-TOOLTIPFONT** — RESOLVED-BY-3.7.0 (AV-confirmed via
  empirical probe). No ask.
- **W22 font-register watch (BRAND-CRITICAL)** — SATISFIED. speedtest src declares
  ONLY `Plus Jakarta Sans` in live `font-family` rules (`MapSkeleton.vue:175,183`).
  The 2 "Fraunces"/"General Sans" hits (`MapSkeleton.vue:26`, `ThankYou.vue:46`)
  are COMMENTS, not declarations — zero regression risk on the bump. 3.8.0 ships
  Plus Jakarta Sans (text/display) + Fira Code (mono) only; W22 excised Fraunces.

## AT-RISK on the bump (the R-CONSUME forcing functions)

### `--ease-apple-spring` census — 4 reads, ALL break at 3.8.0 (NOT at 3.7.0)

speedtest reads `var(--ease-apple-spring)` at 4 sites (none define a local
fallback; the token comes from glass-ui's CSS bundle):
- `src/components/speedtest/SpeedtestResults.vue:842`
- `src/components/speedtest/MeterColumn.vue:291,292` (+ `:281` is the AO-C4 NOTE
  comment documenting it as the "DEPARTURE spring" — the dial-out leave register)

**Version-truth:** the installed **3.7.0** dist STILL ships `--ease-apple-spring`
(3 occurrences in `dist/glass-ui.css`), so these 4 reads PAINT TODAY. glass-ui
**HEAD (3.8.0, W05)** EXCISED the token (`grep src/styles → empty`). So the bump
to 3.8.0 silently zeroes the easing on these 3 surfaces (invalid `var()` with no
fallback → the transition falls to the initial `ease`). This is the W05/W34
publish-gated re-point: speedtest must re-point the 4 reads onto a governed
`--spring-*` linear() value. The MeterColumn AO-C4 NOTE distinguishes a "departure
spring" (leave-the-stage, single-cycle settle, no overshoot) from the iOS
arrival/snap register — the re-point must preserve that intent (a leave transition
must not overshoot a position it is leaving), so the correct target is likely
`--ease-out`/`--ease-standard` (bezier, no overshoot per the glass-ui §6 easing
doctrine: exit → no overshoot), NOT a bouncy `--spring-*`. This is a DESIGN choice
the speedtest-side wave must make, not a mechanical sed.

### W53 tabs-unify clean break — 5 BROKEN consumer sites + ledger + a11y carve-out

This is the LARGEST surface. W53 (`live-verified DEVELOPED`) collapsed
BouncyToggle/BouncyTabs/UnderlineTabs/ResponsiveTabs onto ONE `<SegmentedTabs>`
with NO alias (clean break per no-backwards-compat). glass-ui HEAD exports ONLY
`SegmentedTabs` from `/tabs`; `BouncyTabs`/`ResponsiveTabs`/`UnderlineTabs`/
`BouncyToggle` are GONE and the `/responsive-tabs` subpath is RETIRED (not in
`package.json#exports`). speedtest consumes ALL of the retired names:

| speedtest site | retired import | migration target |
|---|---|---|
| `dashboard/MetricSelector.vue:7` | `BouncyTabs` from `/tabs` | `SegmentedTabs` (default `variant="segmented"`) |
| `dashboard/ResultsFilters.vue:159` | `BouncyTabs` from `/tabs` | `SegmentedTabs` default |
| `views/ChartsView.vue:132` | `UnderlineTabs` from `/tabs` | `SegmentedTabs variant="underline"` |
| `layouts/PublicDashboardLayout.vue:127` | `ResponsiveTabs` from `/responsive-tabs` | `SegmentedTabs :responsive` |
| `layouts/AdminDashboardLayout.vue:119` | `ResponsiveTabs` from `/responsive-tabs` | `SegmentedTabs :responsive` |
| `views/AdminDataView.vue:93` | `ResponsiveTabs` from `/responsive-tabs` | `SegmentedTabs :responsive` |
| `views/__tests__/AdminDataView.append.test.ts:125` | `UnderlineTabs` stub | re-stub `SegmentedTabs` |
| `views/AdminSettingsView.vue:7` (comment) | `UnderlineTabs` mention | comment update |

The usages map CLEANLY onto the new API (`SegmentedTabsProps`: `options`,
`variant`, `multiSelect`, `responsive`, `ariaLabel`): every speedtest call passes
`options` + `model-value`/`v-model`, which the unified component accepts. The
`ResponsiveTabs` calls (`:model-value` + `:options` + `@update:model-value`) become
`:responsive` (or `:responsive="{ breakpoint, ariaLabel }"`). This is a
glass-ui-binding-verification surface (the memory feedback): the reka-ui prop/emit
shapes silently no-op if mis-bound — vue-tsc + units MISS it, only e2e catches it.
A live audit of every migrated tab strip is mandatory at the consumer close.

**Two coupled artefacts must update in the same bump:**
1. `scripts/check-glass-ui-boundary.mjs` `SUBPATH_OWNED` ledger lists
   `UnderlineTabs`/`BouncyTabs`/`BouncyToggle`/`BouncyToggleProps` (lines 104-109) —
   all retired. Replace with `SegmentedTabs`/`SegmentedTabsProps`/etc. (`ResponsiveTabs`
   is NOT in this ledger — it rode `/responsive-tabs`, a separate subpath.)
2. The a11y carve-out (`tests-e2e/a11y-axe.spec.ts:48`) excludes
   `.responsive-tabs__mobile` because the retired `ResponsiveTabs` mobile `<Select>`
   had no accessible name. SegmentedTabs takes `ariaLabel`/`responsive.ariaLabel`
   → bind it and UN-EXCLUDE the carve-out (closes routed a11y ask #3).

## DEFERRED / FUTURE asks (P1-P2 — speedtest FUTURE needs, not current breakage)

speedtest does NOT currently consume these (no broken sites); they're named-forward
substrate for speedtest's own AV W8/W15/W16 consumer halves:

- **`vt.ready` `.ready` swallow [P0 in AV's W19 gate]** — `useViewTransition`
  returns `{finished, transitioned}` but NO `.ready`. speedtest does not currently
  import `useViewTransition` (its `.ready` refs are all `document.fonts.ready` in
  `useAutoStart.ts`, unrelated). The ask is REAL (W19's morph-helper consumer needs
  `startViewTransition().ready`), but it is a glass-ui API gap to fill BEFORE
  speedtest's W19 can adopt — route to a glass-ui motion-surface micro-wave / W34
  consumer-adoption leg. Held with a `.ready.catch` stopgap on speedtest's side.
- **`demandPark` on `useRAFLoop` [P1]** — speedtest consumes `useRAFLoop` (TODAY) in
  `useMeterRenderer.ts:174` but uses ONLY `start()`/`stop()` — no `demandPark`. The
  ask is a FUTURE need (W8 consumer half). UNSHIPPED substrate; route to the
  glass-ui motion/raf substrate.
- **`CompletionSeal` family [P1]** — UNSHIPPED (glass-ui dist grep = 0); speedtest
  has ZERO consumer code referencing it (the `grep` hits are historical AUDIT-DOC
  references to a design concept, not imports). W15/W16 consumer need; route to the
  glass-ui blob/seal substrate or W34.
- **2 remaining a11y asks [P2]** (the 3rd, ResponsiveTabs, closes via W53 above):
  Toaster/ToastClose accessible name + reka FocusScope sentinel `aria-hidden-focus`
  — both glass-ui PRIMITIVE-INTERNAL (no consumer prop to fix), carved out in
  `tests-e2e/a11y-axe.spec.ts:46-47`. Fold into glass-ui W39 (lighthouse a11y route
  matrix) + W21 (primitive recategorize). Un-exclude on the consumer side once fixed.

## GAPS / divergences

- **R-CONSUME has not happened.** speedtest is at 3.7.0, glass-ui at 3.8.0+
  (unpublished convergence). The bump is publish-gated. Until it lands, the 4
  ease-apple reads + 5 tab sites are LATENT-broken (green on 3.7.0, broken on the
  next published cut). The bump is a `npm run check`-guarded operation
  (`check:client` vue-tsc + `check:boundary` inv-16 ledger + 6 more).
- **Non-canonical deep import** (NOT inv-16-blocking but worth noting):
  `src/__tests__/phase-color-parity.test.ts:41` reads
  `node_modules/@mkbabb/glass-ui/src/styles/tokens.css` (a deep path into the
  published tarball's `src/`). This is a TEST fixture (token-parity check), not a
  runtime import, and works because the tarball ships `src/`. Stable but brittle to
  a glass-ui token-file reorg (e.g. the W25b CSS monolith carves). Watch on bump.
- **Last e2e run = FAILED** (`test-results/.last-run.json`: 2 failed tests, from a
  3.7.0 D1/D6/D9 verify pass). Pre-bump baseline; not a glass-ui-owned failure.

## Gestalt PATH FORWARD (planning, not code)

speedtest's glass-ui-consumer work is a SINGLE publish-gated R-CONSUME wave (owned
on the speedtest side, after the convergence cut publishes — likely AX.W28
"speedtest native-first receive" coordinates the timing). The wave is mechanical
in scope but has a DESIGN seam:

1. **Bump `@mkbabb/glass-ui` to the convergence-published version** (guarded
   `npm run check`).
2. **W53 tabs migration** (5 SFC sites + 1 test stub + 1 comment): rewrite the
   imports to `SegmentedTabs` with the right `variant`/`responsive`/`ariaLabel`.
   Update the `check-glass-ui-boundary.mjs` `SUBPATH_OWNED` ledger
   (`UnderlineTabs`/`BouncyTabs`/`BouncyToggle`/`BouncyToggleProps` →
   `SegmentedTabs`/`SegmentedTabsProps`). Bind `ariaLabel` on the responsive sites
   and UN-EXCLUDE `.responsive-tabs__mobile` from the a11y gate (closes a11y ask #3).
   This is a glass-ui-binding-verification surface — LIVE-audit every migrated tab
   strip (reka prop mis-binds no-op silently; only e2e catches them).
3. **`--ease-apple-spring` re-point** (4 reads, 3 surfaces): re-point onto a
   governed glass-ui easing. PRESERVE the AO-C4 "departure spring / no-overshoot"
   intent (per glass-ui §6 doctrine: exit transitions read `--ease-out`/
   `--ease-standard`, NEVER a `--spring-*` overshoot). This is a design call, not
   a sed.
4. **The 2 residual a11y asks + the 3 substrate asks** (`vt.ready`/`demandPark`/
   `CompletionSeal`) are NOT speedtest-side work for THIS bump — they're glass-ui
   API gaps. speedtest carries its `.ready.catch` stopgap until glass-ui ships
   `.ready` on `useViewTransition`; the demandPark/CompletionSeal halves wait on
   speedtest's own W8/W15/W16 (those consumer waves haven't begun — AV is still in
   tranche-development, Gate-1 pending).
5. **Close on LIVE audit** (the cardinal lesson): the migrated tab strips,
   re-pointed easings, gold CTA, and font register must be verified GREEN on the
   real speedtest dev product via chrome-devtools-mcp — not on vue-tsc green.

No glass-ui SOURCE work is owed BY speedtest (inv-16). The glass-ui-side
obligations that this lane surfaces — `.ready` swallow, `demandPark`,
`CompletionSeal`, the 2 primitive-internal a11y gaps — must FOLD INTO the AX motion/
a11y waves (W34 consumer-adoption leg, W39 lighthouse a11y, W21 recategorize) so
speedtest's eventual consumer adoption has a shipped substrate to bind.
