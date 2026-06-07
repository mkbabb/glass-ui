# AW.W15 - Colocation + naming hygiene

## State

**Name**: W15 - Colocation + naming hygiene
**Opens after**: AW tranche open (independent of W12/W13/W14; disjoint file bounds)
**Agents**: 1 serial
**Hard gate**: every public composable that returns a state object exports a named `Use<Name>Return` interface (or returns a documented primitive); the `twin-line-divider` idiom is a single `@utility` with ≥2 consumers; `useTokenColor` accepts an optional injected resolver proven by a unit; the three cleared god-modules carry a one-line DO-NOT-SPLIT rationale; `vue-tsc --noEmit` green with zero import-site breakage.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if the modest, conservative hygiene the code-quality assay surfaced is closed without churn: the composable return types are discoverable by name, the one real CSS DRY violation (the catch-light-top + under-shadow-bottom divider duplicated across two files) is a single utility, `useTokenColor` gains a test/SSR injection seam, and the three cohesive-at-boundary god-modules carry their DO-NOT-SPLIT rationale. The assay graded glass-ui A-/B+ — this is refinement, not rescue; nothing is renamed loudly, no import site breaks (existing names stay as aliases).

## 3. Scope

1. **Return-type interface standardization** — add named `Use<Name>Return` interfaces to the public composables that currently fall back to `ReturnType<typeof x>` or an inline shape, keeping the current export names as aliases so no import site breaks:
   - `useCountup` → `UseCountupReturn` (alias `export type Countup = UseCountupReturn`).
   - `useAnimatedNumber` → `UseAnimatedNumberReturn` (alias `AnimatedNumber`).
   - `useNumericTransition`, `useGlobalDark`, `useGlassRenderer` → add explicit named Return interfaces.
   - `useScrollProgress` stays `Ref<number>` (idiomatic primitive; wrapping is over-engineering — explicitly rejected, recorded).
   - The `dom/*Controls` suffix (`UseResizeObserverControls`, `UseTokenColorControls`, `UseIntervalControls`, `UseTimerControls`, `UseTextHighlightControls`) is INTENTIONAL ("Controls" = imperative handles vs "Return" = state). Do NOT rename; document the convention in a one-line header comment on the `dom/` barrel.
2. **`twin-line-divider` DRY extraction** — the catch-light-top + under-shadow-bottom divider idiom is duplicated in `src/styles/instrument-chassis.css` and `src/styles/instrument-rail.css`. Extract it to a single `@utility twin-line-divider` in `src/styles/utilities.css`; the two sites consume the utility. Real DRY violation, two consumers — clears the ≥2-consumer bar.
3. **`useTokenColor` injection seam** — `src/composables/dom/useTokenColor.ts:69` reads `document.documentElement` directly with no injection point, breaking DI closure for SSR/test. Add an optional `resolver?: (prop: string, el?: HTMLElement) => string` last parameter defaulting to the current behavior. Non-breaking (optional arg); one unit proves the injected resolver overrides the default.
4. **Configurator density colocation verify** — `src/components/custom/configurator/density.ts` (56 lines) is reported colocated already. Verify it sits as a sibling in the component dir (not hoisted); if already correct, close the item with no code change and record the verification. No move unless misplaced.
5. **DO-NOT-SPLIT rationale comments** — add a one-line `<script>`-top rationale comment to `BouncyToggle.vue` (475), `GlassDock.vue` (421), and `ContinuousMarkers.vue` (432) citing the AW assay's cohesive-at-boundary verdict, so a later pass does not re-litigate the split. Documentation only; no structural change.

## 3a. Triumvirate Dispatch

Trigger a triumvirate when:

- adding a Return interface forces a change to a composable's actual return SHAPE (the inferred shape and the documented shape diverge) — the interface is not a pure annotation and file bounds expand into runtime logic;
- the `twin-line-divider` extraction changes the resolved cascade order such that the instrument-chassis or instrument-rail divider renders differently (the `@utility` lands at a different layer than the inline rules) — a non-local-recoverable visual regression;
- a third iteration on `vue-tsc` fails after the Return-interface aliases land (an alias collides with an existing exported name).

## 4. File Bounds

| File | Access |
|---|---|
| `src/composables/motion/useCountup.ts` | modify-carve (Return interface + alias) |
| `src/composables/motion/useAnimatedNumber.ts` | modify-carve (Return interface + alias) |
| `src/composables/motion/useNumericTransition.ts` | modify-carve (Return interface) |
| `src/composables/dark/useGlobalDark.ts` | modify-carve (Return interface) |
| `src/composables/glass/useGlassRenderer.ts` | modify-carve (Return interface) |
| `src/composables/dom/index.ts` | modify-carve (the Controls-convention header comment) |
| `src/composables/dom/useTokenColor.ts` | modify-carve (the optional `resolver` param) |
| `src/styles/utilities.css` | modify (the `@utility twin-line-divider` add) |
| `src/styles/instrument-chassis.css` | modify-carve (consume the utility) |
| `src/styles/instrument-rail.css` | modify-carve (consume the utility) |
| `src/components/custom/tabs/BouncyToggle.vue` | modify-carve (rationale comment only) |
| `src/components/custom/dock/GlassDock.vue` | modify-carve (rationale comment only) |
| `src/components/custom/timeline/ContinuousMarkers.vue` | modify-carve (rationale comment only) |
| `tests/composables/dom/useTokenColor.test.ts` | modify-or-create (the injected-resolver unit) |

Do NOT touch: `src/styles/tokens.css` (W12 owns the §8 carve), `src/components/ui/data-table/` (W14 owns the split), `src/styles/glass.css` + `src/components/ui/slider/Slider.vue` + `src/components/ui/button/index.ts` (W13 owns them), `src/index.ts` / `src/api/index.ts` (the Return aliases preserve the existing public names; no barrel edit needed).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W15's `GlassDock.vue` touch is a comment-only carve and does NOT overlap any dock-motion band (W12-W14 do not write `GlassDock.vue`). W15 shares NO `modify` path with W12 (`GlassPanel.vue`, `tokens.css §8`, glass-panel/card stories), W13 (`button/index.ts`, `glass.css`, `Slider.vue`, button story), or W14 (`data-table/`). The `utilities.css` write here is the `twin-line-divider` add; W13 does NOT write `utilities.css` (its `btn-audacious-gold` substrate stays untouched — only the Button variant's text token changes, which lives in `button/index.ts`).

## 5. Agent Units

### AW.W15.a Composable + CSS + DI hygiene

- Goal: discoverable named return types, one `twin-line-divider` utility, a `useTokenColor` injection seam, and DO-NOT-SPLIT rationale on the three cleared god-modules — all conservative, zero import-site breakage.
- Mechanism: add `Use<Name>Return` interfaces + aliases on the named composables; extract `twin-line-divider` to `utilities.css` and consume it at the two instrument sites; add the optional `resolver` arg to `useTokenColor` + a unit; verify configurator density colocation; add the three rationale comments; document the Controls-vs-Return convention on the `dom/` barrel.
- Files: the composable files, the three CSS files, the three SFC rationale comments, the `useTokenColor` test.
- Sub-gate: `vue-tsc --noEmit` green; every listed composable exports a named Return interface (or the documented primitive); `grep -c twin-line-divider src/styles/utilities.css == 1` with two consumer references; the `useTokenColor` injected-resolver unit passes; `npm run build` emits a byte-identical `/styles` bundle modulo the divider relocation.

## 6. Hard Gate

1. **Named return types.** `grep` confirms `UseCountupReturn`, `UseAnimatedNumberReturn`, `UseNumericTransitionReturn`, `UseGlobalDarkReturn`, `UseGlassRendererReturn` each exist; the old names (`Countup`, `AnimatedNumber`) resolve as aliases (`grep` for `export type Countup = UseCountupReturn`). `vue-tsc --noEmit` green proves no import site broke.
2. **DRY divider.** `grep -c 'twin-line-divider' src/styles/utilities.css` returns the single `@utility` definition; `grep` confirms `instrument-chassis.css` and `instrument-rail.css` each reference it (≥2 consumers); the inline divider rules are removed from both files.
3. **Injection seam proven.** A unit at `tests/composables/dom/useTokenColor.test.ts` passes the default-behavior path AND a path where an injected `resolver` overrides the `document.documentElement` read; `vitest run` green; `proof:no-test-in-src` clean.
4. **Density colocation verified.** `ls src/components/custom/configurator/density.ts` confirms the sibling location; the verification is recorded (no move if already correct).
5. **DO-NOT-SPLIT rationale present.** `grep` confirms a one-line rationale comment at the `<script>` top of `BouncyToggle.vue`, `GlassDock.vue`, `ContinuousMarkers.vue`.
6. **Build + types green; bundle stable.** `npm run build` + `npm run typecheck` pass; the `/styles` bundle differs only by the divider relocation (byte-diff attributable to reordering, not a value change).

## 7. Format And Lint Cadence

- `npm run typecheck` after the Return-interface batch and again before close.
- `npm run proof:no-test-in-src` after the `useTokenColor` unit lands.
- `npm run build` before close (confirms the `twin-line-divider` cascade order and the `/styles` bundle).
- `git diff --check` for whitespace.
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W15-hygiene.md` — the Return-interface ledger (composable → new interface → alias), the `twin-line-divider` consumer list, the `useTokenColor` injected-resolver unit output, the density-colocation verification note, the three rationale-comment line refs.
- The integration commit hash.

## 9. Commit Plan

- `refactor(composables): named Use<Name>Return interfaces + aliases` — the five Return interfaces; body lists each composable and its alias, notes `useScrollProgress` stays a primitive and the `dom/*Controls` convention is documented not renamed.
- `refactor(styles): twin-line-divider @utility (DRY, 2 consumers)` — the extraction; body cites the instrument-chassis + instrument-rail duplication.
- `feat(dom): useTokenColor optional resolver injection seam` — the optional arg + unit.
- `docs(components): DO-NOT-SPLIT rationale on BouncyToggle/GlassDock/ContinuousMarkers` — the three comments.
- `docs(AW): W15 close — hygiene ledger` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: AW tranche open. No dependency on other AW waves; may run in parallel once main is clean (its `GlassDock.vue` touch is comment-only and disjoint from any dock-motion band).
- **Blocks**: nothing. The DO-NOT-SPLIT rationale records the assay verdict that W14's split honored (DataTable was the only over-threshold file).

## 11. Archaeology

The code-quality assay graded glass-ui A-/B+ with strong split + colocation discipline; this wave closes the few real gaps it surfaced (return-type naming, the one CSS DRY violation, the `useTokenColor` reference-by-side-effect outlier) and explicitly REJECTS the over-engineering the assay flagged: no `useScrollProgress` wrapper, no `dom/*Controls`→`Return` rename, no monolith CSS split beyond the single `twin-line-divider` idiom, no configurator density move if already colocated. The guardrail against re-litigating the cleared god-modules is the recorded DO-NOT-SPLIT rationale comments (scope item 5).
