# Pα—Legacy code audit (post-O.W7 substrate; v1.4.1 → v1.7.0)

**Lane**: Pα—round-1 backend legacy audit.
**Window**: `v1.4.1` (`8e741ba`, O.W7 close) → `HEAD` (`b201b03`, v1.7.0 untagged).
**Commits in window**: 12 source commits (8 implementation + 3 doc + 1 release-bump).
**Discipline**: READ-ONLY. No git mutations.

## § Angle summary

Post-O.W7 substrate audit at `v1.7.0` (NOT-YET-TAGGED) confirms **the AB+1 cohort introduced ZERO new legacy / @deprecated / fall-through-bail / silent-warn-and-return code in `src/`**. The O.W1 fail-explicit migrations (Aurora init, WebGL shaders, Configurator clone, typewriter unreachable) are intact at HEAD. All four new primitives (`<MetricCell>`, `<MetricRow>`, `<MetricStack>`, `<AnimatedDigit>`, `<ResponsiveTabs>`) ship as pure-Vue + cn() compositions with no try/catch, no `@deprecated`, no defensive null-bails masking invariant violations, no co-located test-file invariant-26 violations (tests live correctly at `__tests__/` per O.W1 Lane E's Option B canonicalization).

What surfaces post-O is NOT legacy debt—it's **doc-counter γ-drift** (3 stale counts in `CLAUDE.md`) + **a /api discovery gap** (4 new primitives, 0 `/api` promotions—analogous to the O.W4 Rγ closure but for the AB+1 cohort) + **the shadow-execution top-level cohort flag itself** (no `docs/tranches/AB+1/` plan folder; the third K-invariant-3 recurrence per P findings §2). Pre-existing O-residuals (KEEP-with-rationale) carry forward CLEAN.

**Quick disposition**: 0 EXCISE / 0 FAIL-EXPLICITLY / 3 γ-drift fixes / 1 /api-promotion cohort / 0 O-residual regressions.

## § Evidence

### rg invocations executed

```
rg -n 'deprecated|@deprecated|legacy|backcompat|back-compat|backward-compat|backwards-compat' src/
rg -n 'HACK|WORKAROUND|FIXME|XXX|TODO' src/ scripts/ demo/
rg -n 'try \{|catch \(|catch \{' src/
rg -n 'console\.(warn|error)' src/
rg -n 'return null\b|return undefined\b|return;\s*$' src/components/custom/{metric-cell,metric-stack,animated-digit,responsive-tabs}
rg -n 'Should not reach|impossible|unreachable' src/
rg -n '@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable' src/
find src/ -name '*.test.ts' -o -name '*.spec.ts'
git diff --stat v1.4.1..HEAD
git log --oneline v1.4.1..HEAD
```

### Window inventory

| Marker | Count `src/` at HEAD | Δ since v1.4.1 |
|---|---|---|
| `TODO`/`FIXME`/`HACK`/`XXX`/`WORKAROUND` | **0** | 0 |
| `@deprecated` | **0** | 0 |
| `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` / `eslint-disable` | **0** | 0 |
| `back-compat` / `backward-compat` / `backwards-compat` (live mentions) | **2** | 0 (closure-history string in `composables/index.ts` + `glass.css:14` `-webkit-` prefix rationale + 1 `glass-ui/styles/utilities.css:355` "single-slot back-compat" preserved-fallthrough; all O-classified KEEP) |
| `try {` blocks | **8** (runtime: 6, tests: 2) | 0 |
| `console.warn` / `console.error` (library-internal swallow paths) | **1** | 0 (the single survivor is `DataTable.vue:83`—befitting consumer-dev warn for consumer-misuse, not library-internal contract violation) |
| Co-located `*.test.ts` files in `src/` | **23** (canonical Option B) | +5 (2 AB+1 + 3 inherited W3 timeline splits absorbed at O.W3) |

### Cited window commits

```
b201b03 chore(release): v1.7.0—AB+1 substrate cohort (speedtest AC.W8e)
8dad58d feat(primitives): MetricCell + ResponsiveTabs + ToggleGroupItem card variant (AC.W8e)
7ddb260 docs(changelog): cross-reference AC.W6 cohort (v1.5.0 + v1.5.1 + v1.6.0)
e238862 chore(release): v1.6.0—primitive expansions cohort (speedtest AC.W6d)
d813c63 feat(metric-stack/as-prop): render-as TransitionGroup support
12e7f55 docs(design): custom-prop cascade pattern + new primitive catalog
bb1f15b feat(primitives): MetricRow + MetricStack + AnimatedDigit ship (AC.W6d)
8bf51c4 feat(timeline/hit-area): ::before inset -15px for 44x44 WCAG (AC.W6d F2.I-04)
099910d feat(chassis/phase-color-label): --phase-color-label cascade (AC.W6c)
8246e07 chore(release): v1.5.0—OFL font self-host subsystem (AC.W6b)
2474440 feat(typography): self-host Fira Code + Plus Jakarta Sans OFL—Path D
4660a0d docs(typography): self-host font policy subsection—AC.W6a Path-1
```

## § Findings

### Sub-section A—AB+1 cohort findings (NEW, post-O)

#### A1—`<AnimatedDigit>` (NEW; `src/components/custom/animated-digit/AnimatedDigit.vue`)

- 94 LOC; pure `<script setup>` + `useAnimatedNumber` composable consume + computed format + inline `--digit-count` style.
- ZERO try/catch, ZERO defensive bails, ZERO `console.*` calls.
- Empty-value handling: `if (props.value === null || props.value === undefined) return props.placeholder;`—befitting null-handling for a numeric display contract. NOT a fall-through bail; explicit empty-state surface.
- **Disposition**: CLEAN.

#### A2—`<MetricCell>` (NEW; `src/components/custom/metric-cell/MetricCell.vue`)

- 145 LOC; computed-class dispatch over 3 appearance variants (`dashboard` / `compact` / `bare`).
- `IconLike` permissive type alias (line 14)—documented rationale: workspace-link symlink resolution can duplicate `vue` / `@vue/runtime-core` boundaries. Type permissiveness is befitting; NOT a `@ts-ignore` workaround.
- Empty-value handling: `displayValue` computed returns placeholder for `null | undefined | ""`. Befitting null-rendering; NOT a silent bail.
- **Disposition**: CLEAN.

#### A3—`<MetricRow>` (NEW; `src/components/custom/metric-stack/MetricRow.vue`)

- 243 LOC; subgrid-row primitive with phase-color cascade origin. ZERO defensive code.
- **Disposition**: CLEAN.

#### A4—`<MetricStack>` (NEW; `src/components/custom/metric-stack/MetricStack.vue`)

- 128 LOC; layout shell with `as` prop (default `"div"`; consumers pass `TransitionGroup` for per-row enter/leave).
- The `as` prop accepts `string | Component`—Vue's `<component :is>` binding receives transparently. NOT a fall-through; explicit polymorphism.
- **Disposition**: CLEAN.

#### A5—`<ResponsiveTabs>` (NEW; `src/components/custom/responsive-tabs/ResponsiveTabs.vue`)

- 156 LOC; matchMedia-driven swap between `<Select>` (mobile) and `<UnderlineTabs>` (desktop).
- Line 90: `if (typeof window === "undefined" || !window.matchMedia) return;`—**SSR-fence early-return**. Per O invariant 24 distinction, this is befitting browser-API degradation (server-side, `window` is absent; the initial `isDesktop = true` provides desktop-first SSR shape; JSDoc documents this contract). NOT a silent-warn-and-return; explicit SSR contract.
- Line 112-118: `effectiveDesktopValue` computed falls back to `opts[0]?.value ?? props.modelValue` when the consumer's `modelValue` points at a mobile-only tab—befitting consumer-driven config-resolution. Not a fall-through-bail; mirrors the prior speedtest 3-site `activeTab === 'filters' ? 'results' : activeTab` ternary at the primitive level (documented in JSDoc + CHANGELOG v1.7.0).
- **Disposition**: CLEAN.

#### A6—`toggleVariants` CVA `card` register addition (`src/components/ui/toggle/index.ts`)

- 21 LOC delta; pure CVA-variant union extension. Zero runtime change; consumers omitting `variant=` see unchanged behaviour (CVA default-variant resolution preserves prior). No `@deprecated` on prior variants.
- **Disposition**: CLEAN.

#### A7—`<ContinuousTimeline>` + `<SegmentedTimeline>` `::before { inset: -15px }` hit-area (`src/components/custom/timeline/{ContinuousTimeline,SegmentedTimeline}.vue`)

- WCAG 2.5.5 (AAA) target-size compliance via invisible `::before` halo. `--timeline-dot-size-touch` + `--timeline-touch-target` tokens added to `tokens.css`. Coarse-pointer media query promotes visible dot.
- ZERO legacy markers; pure progressive-enhancement.
- **One comment audit**—`GlassTimeline.vue:88`: `"...the same #popoverContent slot name as the legacy monolith."` This is a HISTORICAL reference to the pre-O.W3-split single-file GlassTimeline.vue (1049 LOC at O.W3 open)—not LIVE legacy code. **Comment-rephrase candidate** (analogous to O.W0 Lane C E4 "scrubber-default-back-compat" cosmetic excise): replace "legacy monolith" with "pre-split monolith" or drop entirely. **EXCISE-class doc-only**.
- **Disposition**: CLEAN with 1 cosmetic comment rephrase (A7-x).

#### A8—`--phase-color-label` chassis cascade (`src/styles/instrument-chassis.css`)

- New `--phase-color-label` CSS custom property mirrors `--phase-color` 1:1 through the `data-phase` cascade. Fallback chain `var(--chart-{phase}-label, var(--chart-{phase}, <viz-default>))` is well-formed token-cascade—NOT fall-through bail. Idle default `var(--muted-foreground)` is befitting at-rest token shape.
- **Disposition**: CLEAN.

#### A9—OFL font subsystem (`src/styles/typography.css` + `src/fonts/`)

- 200+ LOC of `@font-face` declarations + Capsize-calibrated fallback metrics. ZERO legacy markers.
- **One comment audit**—`typography.css:194`: `"legacy `\"Fira Mono\"` + the generic `monospace` backstop"` is referring to the BROWSER FONT-NAME FALLBACK (a befitting browser-API degradation: if `Fira Code` AND `Fira Code Fallback` both fail, the chain falls through to `Fira Mono`—installed on Linux desktops with the old `fonts-firacode` package—then to the OS generic mono). **NOT live legacy code; befitting font-cascade backstop**. Same disposition class as the O `Pulse.vue:8` / `Progress.vue:48` K7 KEEP—comment wording could be improved ("legacy Fira Mono" → "historical Fira Mono" or "platform Fira Mono"), but the FALLBACK ITSELF is binding for the geometric-fidelity contract. **Doc-only rephrase candidate**.
- The `font-display: optional` on Plus Jakarta Sans + `font-display: swap` on Fira Code are documented register-aware choices (LCP-critical vs post-LCP). NOT silent degradation paths.
- **Disposition**: CLEAN with 1 cosmetic comment rephrase (A9-x).

#### A10—DESIGN.md custom-prop cascade pattern (NEW section)

- 65-line new subsection documenting the canonical `:deep`-retire pattern. ZERO legacy markers. The "When the cascade pattern fails" subsection explicitly REJECTS workaround paths and routes consumers back to substrate-fix. Aligned with P5 (no legacy code) + P4 (idiomatic-gestalt).
- **Disposition**: CLEAN. EXEMPLAR-class precept reinforcement.

### Sub-section B—AB+1 cohort doc-drift + /api-discovery findings

#### B1—`CLAUDE.md` doc-counter drift (γ-class—analog to O.W7 γ MINOR cohort)

Three stale counts at HEAD:

| Line | Cited | Actual at HEAD | Source |
|---|---|---|---|
| `CLAUDE.md:72` | "31 custom package dirs (every dir has a package barrel)" | **35** custom package dirs (31 + animated-digit + metric-cell + metric-stack + responsive-tabs = 35) | `ls -d src/components/custom/*/ \| wc -l` returns 35 |
| `CLAUDE.md:195` | "38 flat per-package subpaths" | **42** flat JS subpaths (38 + 4 AB+1) | `grep -E '^\s*"./[a-z]' package.json` returns 43 entries (42 JS + 1 CSS `./styles`) |
| `CLAUDE.md:243` | "v1.4.0 ships **38 flat JS subpaths** (33 component packages + /api + /forms + /dark + /keyboard + /carousel) plus the /styles CSS bundle (39 entries total..." | "v1.7.0 ships **42 flat JS subpaths** (37 component packages + /api + /forms + /dark + /keyboard + /carousel) plus /styles (43 entries total)" | Counted from `package.json` exports |

Disposition: **γ-class doc-fix**. Mirrors the W7 γ MINOR absorb pattern (γ-M1/M2/M3/M4 at O.W7 absorbed 4 CLAUDE.md counter drifts).

`src/index.ts:52` comment block also has "Of the 30 packages in `src/components/custom/`, this root barrel re-exports 7..."—should be "34 packages" (the 7 cherry-picked are unchanged; the count of OTHER packages—23—should be 27 now). **Same doc-fix class**.

#### B2—Zero `/api` discovery promotions for AB+1 cohort

`src/api/index.ts` exports ZERO of the AB+1 cohort's surface:

```
grep -nE 'AnimatedDigit|MetricCell|MetricRow|MetricStack|ResponsiveTabs' src/api/index.ts → 0 hits
```

The cohort introduces at least 6 type candidates for `/api` promotion:

| Type | Source | Promotion candidate? |
|---|---|---|
| `MetricCellAppearance` | `metric-cell/MetricCell.vue:52` (file-local) | YES—consumer fixtures + preset types pin against the appearance enum |
| `MetricCellProps` | `metric-cell/MetricCell.vue` (inline) | YES—sibling of `GlassPanelProps` (O.W4 Rγ closure) |
| `MetricRowProps` | `metric-stack/MetricRow.vue` (inline) | YES |
| `MetricStackProps` | `metric-stack/MetricStack.vue` (inline) | YES |
| `AnimatedDigitProps` | `animated-digit/AnimatedDigit.vue` (inline) | YES |
| `ResponsiveTabsProps` | `responsive-tabs/ResponsiveTabs.vue` (inline) | YES—but type-system has `TabOption` from `../tabs` already on /api? Verify |

Disposition: **O.W4-class /api discovery gap re-opened**. This is the SAME failure class O.W4 Lane A closed for the M.W2 + AB cohort (12 type promotions absorbing Rγ gaps). The AB+1 cohort shadow-shipped WITHOUT the corresponding /api sweep. Note: `MetricCellAppearance` is currently a file-local `type` alias (line 52)—promotion requires exporting it from the package barrel first, then re-exporting from `/api`. Same pattern as O.W4's `ConfiguratorCloneMode` promotion (M.W2 Lane B).

#### B3—Shadow-execution at the tranche-folder level (P findings §2 P-AB1 already flagged)

`find docs/tranches -maxdepth 1 -type d` returns NO `AB+1/` (or `AC/`) folder. Yet 8 source commits shipped across v1.5.0 → v1.7.0 under "AB+1 substrate cohort" / "AC.W6b/c/d/W8e" commit-message naming. This is the **third K-invariant-3 recurrence** (V → AB → AB+1)—already absorbed under P-AB1 retrospective in P findings §2. **NOT in scope for Pα re-flag**; routed to P.W0 HEADLINE per the P plan.

### Sub-section C—O-residual findings (carried over; CLEAN at HEAD)

All O.W1 fail-explicit migrations VERIFIED INTACT at HEAD:

| ID | O.W1 Lane | Status at HEAD | Evidence |
|---|---|---|---|
| F1 (Aurora init throw) | A | INTACT | `useAurora.ts:55-70`—`onInitError` callback opt-in; otherwise `throw error;` (lines 64-69) |
| F2 (Metaball shader compile/link throw) | B | INTACT | `useMetaballs.ts`—silent-swallow paths replaced; `isWebGLSupported` synchronous probe at lines 105-114 is befitting KEEP per O.W1 Lane B (browser-API degradation only) |
| F3 (Frost shader compile/link throw) | B | INTACT—assumed (not touched in window; spot-verify with `rg -n 'console\.error.*Shader' src/composables/glass/`) |
| F4 (Configurator clone Path A throw) | C | INTACT | `useConfiguratorState.ts:87-105`—`structuredClone` failure throws with consumer-actionable message + recommends `ConfiguratorStateOptions.clone` override |
| F5 (typewriter unreachable throw) | D | INTACT—assumed (not touched in window) |
| E1-E4 (cosmetic excise) | W0 Lane C | INTACT—comment count `back-compat` 9 → 2 at HEAD; the 2 survivors are befitting closure-history + CSS `-webkit-` rationale + `utilities.css:355` "single-slot back-compat" |
| Test relocation (invariant 26) | E | CANONICAL (Option B) | 23 `*.test.ts` files all under `__tests__/` subdirectories. Per O.W1 Lane E proof doc: Option B endorsed; no Option A migration required. AB+1 cohort added 2 new test files at canonical Option B paths (`metric-stack/__tests__/MetricStack.test.ts` + `animated-digit/__tests__/AnimatedDigit.test.ts`)—CORRECT placement |

ZERO O-residual REGRESSIONS at HEAD.

### Sub-section D—NO-FINDINGS classifications (CLEAN domains)

- **Silent-warn-and-return in library-internal subsystems**: ZERO new occurrences. Single survivor (`DataTable.vue:83` `console.warn`) is consumer-dev warn for consumer-misuse, NOT a library-internal contract violation—sits OUTSIDE invariant-24 scope per the precept's "browser-API degradation vs library-internal" distinction.
- **`@deprecated` JSDoc tags**: ZERO at HEAD.
- **`// LEGACY` / `// TODO-DEFER` / migration-scaffold markers**: ZERO at HEAD.
- **Defensive null-checks masking invariant violations**: ZERO. The 5 new primitives use befitting null-handling at explicit empty-state surfaces (`displayValue`, `formatted`, `effectiveDesktopValue`)—each documented in JSDoc.
- **Fall-through branches that should fail explicitly**: ZERO. `ResponsiveTabs.vue:90` SSR-fence is befitting browser-API degradation per invariant 24's distinction (not a library-internal contract violation; the runtime is intentionally outside-substrate).
- **NEW test files in src/ outside `__tests__/`**: ZERO. Both AB+1 test files are at canonical Option B paths.

## § Proposed plan implications (P-wave assignment; ZERO DEFERRAL)

Per user directive ("No more deferrals. No carry-forward. This will all be addressed herein."), every finding routes to a P-wave destination:

| ID | Finding | P-wave destination | Cost |
|---|---|---|---|
| A7-x | `GlassTimeline.vue:88` "legacy monolith" comment rephrase | **P doc-tier wave** (alongside P-7 CHANGELOG typo from O.FINAL §5) | 1-line comment edit |
| A9-x | `typography.css:194` "legacy Fira Mono" comment rephrase | **P doc-tier wave** (same as A7-x) | 1-line comment edit |
| B1 | CLAUDE.md doc-counter drift (3 stale counts) + `src/index.ts:52` count | **P doc-tier wave**—analog of O.W7 γ MINOR absorb (γ-M1/M2/M3/M4 pattern) | 4 string-replace edits |
| B2 | `/api` discovery gap (6 AB+1 type promotions: `MetricCellAppearance`, `MetricCellProps`, `MetricRowProps`, `MetricStackProps`, `AnimatedDigitProps`, `ResponsiveTabsProps`) | **P /api-discovery wave** (analog of O.W4 Lane A—12 type promotions absorbing Rγ gaps) | per-type: (a) export from package `index.ts` if file-local + (b) re-export from `src/api/index.ts`; cost ≈ 6 × (~2-3 LOC) + /api comment bump |
| B3 | Shadow-execution at tranche-folder level (AB+1 retrospective) | **P.W0 HEADLINE**—already routed per P findings §2 P-AB1 (NOT a Pα-specific destination; this lane confirms scope) | tranche-retrospective authoring |
| **D (no-findings)** | Confirms O.W1 invariants 24-27 hold; AB+1 substrate clean | NO-OP—Pα audit returns CLEAN-with-doc-fixes verdict to P round-1 synthesis | N/A |

### Recommended wave-spec sketch (P-wave: doc + /api)

A single P-wave can absorb A7-x + A9-x + B1 + B2 together—they are all hygiene-class, zero-runtime-change, single-commit-class. The wave would:

1. **Lane A—`/api` cohort promotion** (6 types):
   - Promote `MetricCellAppearance` from file-local → package barrel re-export → `/api` re-export.
   - Surface `MetricCellProps` / `MetricRowProps` / `MetricStackProps` / `AnimatedDigitProps` / `ResponsiveTabsProps` per O.W4 `GlassPanelProps` precedent.
   - Bump `/api` surface count comment: 53 → 59 (53 + 6) + update arithmetic preamble in `src/api/index.ts`.

2. **Lane B—Doc-counter drift fix** (γ-MINOR cohort):
   - `CLAUDE.md:72` "31" → "35".
   - `CLAUDE.md:195`/`:243` "38 flat" → "42 flat" + entry-count + component-package count.
   - `src/index.ts:52` "30 packages" → "34 packages" (the 7 cherry-pick stays the same; the 23 → 27 other-packages count adjusts).

3. **Lane C—Cosmetic comment rephrase**:
   - `GlassTimeline.vue:88` "legacy monolith" → "pre-split monolith" (or drop the qualifier).
   - `typography.css:194` "legacy `Fira Mono`" → "historical `Fira Mono`" or "platform `Fira Mono`".

Three lanes, single PR-equivalent commit. ZERO behaviour change. Verify via `npm run typecheck` + `npm run build` + `npm run verify-export-types` (the latter catches /api re-export wiring).

## § Risks and unknowns

1. **F3 + F5 not spot-verified by Read at HEAD** (O-residual carry). Marked "assumed INTACT" per (a) no commits in window touched `frostShader.ts` or `typewriter/utils/keyboard.ts`, and (b) `rg -n 'console\.error.*Shader' src/composables/glass/` would confirm. **Mitigation**: add to the P round-1 synthesis spot-verification cohort—2 grep invocations, ~30 seconds total. NOT a P-wave action; pre-wave gate item.

2. **B2 (/api promotion) requires `Component` / `FunctionalComponent` re-export decision**—`MetricCellProps` references the permissive `IconLike` type (file-local at `MetricCell.vue:14`). Promotion to `/api` means EITHER (a) inlining the structural shape in `MetricCellProps` (decoupling from Vue's `Component` type), OR (b) re-exporting `IconLike` itself. Mirrors the L.W1 SCC trap for `Component` types—needs synthesis-level decision before the P-wave dispatch authorizes the promotion. **Block on synthesis call**.

3. **B1 doc-counter has cascading version-string drift**—`CLAUDE.md:243` cites "v1.4.0" as the substrate version; HEAD is v1.7.0. The single-line bump cascades to: (a) `subpath count` (38 → 42), (b) `entry count` (39 → 43), (c) `component-package count inside the parenthetical` (33 → 37). Authoring the edit requires the full count refresh, not a partial. **Cost ≈ 1 lane (single commit), not 1 edit**.

4. **B3 (AB+1 retrospective) blocks on the AB+1 → P-wave handoff coordination** with the speedtest AC tranche (per P findings §2 CR-6: "speedtest AC.W6 cohort full consumer adoption"). The retrospective should reflect the CROSS-REPO cohort, not just the glass-ui-side commits. NOT a Pα-specific risk; flagged for the P.W0 HEADLINE wave-spec design.

5. **Test-file count grew 18 → 23 (+5 since O.W1 Lane E)** but ALL net-new files honor Option B canonical paths. Verified: 2 AB+1 files (animated-digit + metric-stack) + 3 timeline-W3-split files (aria-valuenow + continuous-structural-split + the audit count missed at W1 Lane E since the W3 split-out happened post-Lane-E close). NOT a regression; invariant 26 holds.

6. **Single non-window console.warn at `DataTable.vue:83`**—flagged as "befitting consumer-dev warn" but not re-audited by Read at HEAD. **Mitigation**: spot-verify via `Read src/components/ui/data-table/DataTable.vue:75-90` at synthesis if a P-wave touches the data-table subsystem.

## § Sanity check

All counts spot-verified via direct shell invocation against `/Users/mkbabb/Programming/glass-ui` HEAD `b201b03`:

- `find src/ -name '*.test.ts' | wc -l` → 23 (confirmed +5 since O baseline 18).
- `ls -d src/components/custom/*/ | wc -l` → 35 (confirmed +4 AB+1 cohort vs O baseline 31).
- `grep -E '^\s*"\./[a-z-]+":' package.json | wc -l` → 43 (confirmed +4 vs O.W7 baseline 39).
- `git diff --stat v1.4.1..HEAD` → 31 files changed; 1786+/12- (12 commits in window).
- `grep -nE 'AnimatedDigit|MetricCell|MetricRow|MetricStack|ResponsiveTabs' src/api/index.ts` → 0 hits.
- `rg -n 'TODO|FIXME|HACK|XXX|WORKAROUND' src/ scripts/ demo/` → 0 hits (matches O baseline).
- `rg -n '@deprecated|@ts-ignore|@ts-expect-error|@ts-nocheck' src/` → 0 hits.

## § Final disposition

**Pα verdict: CLEAN-with-doc-fixes.**

- 0 new EXCISE-class legacy
- 0 new FAIL-EXPLICITLY-class invariant-24 violations
- 0 O-residual regressions
- 2 cosmetic comment rephrases (A7-x + A9-x; absorbed in P doc-tier wave)
- 3 doc-counter γ-drift sites (B1; absorbed in P doc-tier wave; analog to O.W7 γ-M1..M4)
- 6 `/api` type promotions missed by AB+1 (B2; absorbed in P /api wave; analog to O.W4 Lane A 12-type promotion cohort)
- 0 net new substrate retired or added BEYOND the AB+1 cohort flagged at P findings §2 P-AB1
- All findings route to NAMED P-wave destinations per the user's ZERO-DEFERRAL directive

The AB+1 substrate cohort is **architecturally CLEAN at the code level**—the legacy-debt the cohort shipped is purely **hygiene-class** (doc-counter drift + missed /api promotions). The shadow-execution flag (no tranche folder; K invariant 3 third recurrence) is **process-level**, not code-level, and is already routed to P.W0 HEADLINE per P findings §2.
