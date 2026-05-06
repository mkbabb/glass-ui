# J — Post-close Audit · Lane ε (performance + bundle)

**Authored**: 2026-05-06 (audit lane ε).
**Scope**: per W0 precept update + I.invariant 8 (bundle-budget non-negotiable). Read-only on src/ + demo/; ran `npm run profile:bundle`, `npm run build`, `npm run test`.
**HEAD**: `76525e1` (J.W6 close).
**Pre-J baseline commit**: `950d1f4` (I.W7 close).

## 1. Summary

Bundle audit at HEAD shows **net reduction across every measure** vs the pre-J baseline. Apples-to-apples (`.js` + `.css` only, since the in-tree `W1-bundle-profile.json` at I.W7 close included dts and the HEAD profile-bundle script does not): **−37 861 B raw / −6 199 B gzip** (−8.33% raw / −5.19% gzip). The headline drivers: `glass-ui.js` shed 41 369 B raw / 11 494 B gzip (W6.B FuzzySearch gestalt rewrite + W3.B DockPopover retire collapsing into the main barrel via re-exports), `glass-ui.css` shed 17 911 B raw / 2 750 B gzip (W2 vocab.α/β consolidation), `dock.js` shed 5 558 B raw (DockPopover removal), `timeline.js` shed 7 045 B raw (chunk re-grouping). The new subpath `@mkbabb/glass-ui/configurator` ships at **196 B raw / 140 B gzip** (façade entry; the actual logic lives in the shared `useConfiguratorState-*.js` chunk at 11 043 B raw / 3 317 B gzip, shared with `aurora.js` and `metaballs.js` consumers). Test suite is **269/269 green** (18 files; 1.74s). dts emission verified for every J-introduced public symbol (`Configurator`, `ConfiguratorLayer`, `ConfiguratorRow`, `useConfiguratorState`, `sliderVariants`, `SliderVariants`, `CarouselPager`, `CarouselDots`, `GlassCarouselPager`, `cssVar`) plus the three extension props (`HoverPopover.keepDockOpen`, `Slider.keepDockOpen`, `BouncyToggle.overflow`) and `useDockState.isHeld`. **One P1 finding**: I.W6's `profile:budget` script and stress harness were silently dropped from `package.json` somewhere in the J substrate (presumably the v0.8.0 consolidation at `5baceb5`); the **bundle-budget gate is no longer wired**, violating I invariant 8.

## 2. Bundle size — totals + per-subpath delta

### 2.1 Totals (`.js` + `.css` only — apples-to-apples)

| Metric | Pre-J (`950d1f4`) | HEAD (`76525e1`) | Δ raw | Δ gzip |
|---|---|---|---|---|
| Total raw | 454 472 B | **416 611 B** | **−37 861 B (−8.33%)** | — |
| Total gzip | 119 549 B | **113 350 B** | — | **−6 199 B (−5.19%)** |
| `.js` files | 47 | 53 | +6 | — |
| `.css` files | 1 | 1 | 0 | — |

Citation: `docs/tranches/F/audit/W1-bundle-profile.json` HEAD vs `git show 950d1f4:docs/tranches/F/audit/W1-bundle-profile.json`.

### 2.2 Per-subpath delta (sorted by raw delta)

| File | Pre-J raw | HEAD raw | Δ raw | Pre-J gzip | HEAD gzip | Δ gzip |
|---|---|---|---|---|---|---|
| `dist/glass-ui.js` | 184 335 | 142 966 | **−41 369** | 35 971 | 24 477 | **−11 494** |
| `dist/glass-ui.css` | 39 169 | 21 258 | **−17 911** | 6 909 | 4 159 | **−2 750** |
| `dist/timeline.js` | 9 414 | 2 369 | −7 045 | 2 750 | 983 | −1 767 |
| `dist/dock.js` | 22 442 | 16 884 | −5 558 | 6 722 | 5 122 | −1 600 |
| `dist/aurora.js` | 47 894 | 47 803 | −91 | 15 552 | 15 506 | −46 |
| `dist/toggle-chip.js` | 3 224 | 3 153 | −71 | 1 258 | 1 232 | −26 |
| `dist/tokens.js` | 538 | 316 | −222 | 320 | 209 | −111 |
| `dist/typewriter.js` | 20 517 | 20 517 | 0 | 5 812 | 5 812 | 0 |
| `dist/configurator.js` (NEW) | — | 196 | **+196** | — | 140 | **+140** |
| `dist/metaballs.js` | (chunk) | 8 464 | (n/a, was inlined) | (chunk) | 3 269 | (n/a) |
| `dist/status-dot.js` | (inlined) | 2 157 | +2 157 | (inlined) | 920 | +920 |
| `dist/glass-panel.js` | (inlined) | 1 629 | +1 629 | (inlined) | 774 | +774 |
| `dist/paper-backdrop.js` | (inlined) | 789 | +789 | (inlined) | 480 | +480 |
| `dist/search.js` | 14 843 | 16 465 | +1 622 | 4 282 | 4 690 | +408 |
| `dist/metric-badge.js` | 1 931 | 3 080 | +1 149 | 797 | 1 008 | +211 |
| `dist/tabs.js` | 8 230 | 8 957 | +727 | 2 391 | 2 617 | +226 |
| `dist/labeled-field.js` | 4 747 | 5 032 | +285 | 1 261 | 1 281 | +20 |
| `dist/virtual.js` | 6 366 | 6 578 | +212 | 2 158 | 2 201 | +43 |

Notable: `search.js` grew +1 622 B raw despite the W6.B "600 → 158 LOC gestalt rewrite". The subpath bundle includes both the gestalt FuzzySearch shell AND the `useFuzzySearch` composable (which moved logic out of the main barrel). The net effect is reflected in the −41 369 B drop on `glass-ui.js` (the rewrite is a strict win across the lib's gravitational center, just visible at a different subpath now).

## 3. New subpath — `@mkbabb/glass-ui/configurator`

| Aspect | Value |
|---|---|
| Subpath entry | `dist/configurator.js` (196 B raw / 140 B gzip) |
| Subpath dts | `dist/configurator.d.ts` (9 495 B) |
| Logic chunk | `dist/useConfiguratorState-DuQ2Akeh.js` (11 043 B raw / 3 317 B gzip) |
| Vite entry | `vite.library.ts:44` — `configurator: resolve(rootDir, "src/configurator.ts")` |
| package.json export | `package.json:225-228` — `./configurator → dist/configurator.js + dist/configurator.d.ts` |
| typesVersions entry | **MISSING from `typesVersions["*"]` in `package.json`** — see finding F-1 below |
| src entry | `src/configurator.ts` — `export * from "./components/custom/configurator";` |
| Re-export from main | `src/index.ts:13` — also re-exported via the main barrel |

The primitive's logic chunk (`useConfiguratorState`) is shared with both `aurora.js` and `metaballs.js` consumers (the W4.A→W4.B→W4.C convergence path), so the marginal cost of opening the subpath is dominated by the 196 B façade. Per CLAUDE.md "Per-package subpaths exist for high-traffic primitives", the configurator subpath is appropriately sized for its consumer pattern.

## 4. dts emission — every J-introduced public symbol

Cross-referenced against `dist/index.d.ts`:

| Symbol | Source | dts present | Citation |
|---|---|---|---|
| `Configurator` | W4.A | ✅ | `dist/index.d.ts` line containing `export declare const Configurator: <T>` |
| `ConfiguratorLayer` | W4.A | ✅ | `dist/index.d.ts` `export declare const ConfiguratorLayer:` |
| `ConfiguratorRow` | W4.A | ✅ | `dist/index.d.ts` `export declare const ConfiguratorRow:` |
| `useConfiguratorState<T>` | W4.A | ✅ | `dist/index.d.ts` `export declare function useConfiguratorState<T extends object>` |
| `ConfiguratorPreset<T>` | W4.A | ✅ (bonus type) | `dist/index.d.ts` `export declare interface ConfiguratorPreset<T>` |
| `ConfiguratorScrollMode` | W4.A | ✅ (bonus type) | `dist/index.d.ts` `export declare type ConfiguratorScrollMode` |
| `ConfiguratorState<T>` | W4.A | ✅ (bonus type) | `dist/index.d.ts` `export declare interface ConfiguratorState<T>` |
| `ConfiguratorStateOptions<T>` | W4.A | ✅ (bonus type) | `dist/index.d.ts` `export declare interface ConfiguratorStateOptions<T>` |
| `sliderVariants` | W5.A | ✅ | `dist/index.d.ts` `export declare const sliderVariants: (props?: ...)` |
| `SliderVariants` | W5.A | ✅ | `dist/index.d.ts` `export declare type SliderVariants = VariantProps<typeof sliderVariants>` |
| `CarouselPager` | W6.C.2 | ✅ | `dist/index.d.ts` `export declare const CarouselPager:` |
| `CarouselDots` | W6.C.2 | ✅ | `dist/index.d.ts` `export declare const CarouselDots: DefineComponent<WithClassAsProps,` |
| `GlassCarouselPager` | W6.C.2 | ✅ | `dist/index.d.ts` `export declare const GlassCarouselPager:` |
| `cssVar(name, root?)` | W1 | ✅ | `dist/index.d.ts` `export declare function cssVar(name: string, root?: HTMLElement \| null): string` |

Extension-prop dts:

| Prop | Component | dts present | Citation |
|---|---|---|---|
| `keepDockOpen?: boolean` | `<HoverPopover>` | ✅ | `dist/index.d.ts:1289` (1777 also = `<Slider>`) |
| `keepDockOpen?: boolean` | `<Slider>` | ✅ | `dist/index.d.ts:1777` |
| `overflow?: "none" \| "scroll" \| "auto"` | `<BouncyToggle>` | ✅ | `dist/tabs.d.ts:12` + `:31` + `:66` + `:88` (subpath) |
| `isHeld: ComputedRef<boolean>` | `useDockState()` | ✅ | `dist/dock.d.ts:16` (`isHeld: ComputedRef<boolean>`) |

All J-introduced public symbols are emitted to dts. Subpath dts also confirmed present for `dist/configurator.d.ts` (9 495 B).

## 5. Bundle-budget gate — RESULT

**The bundle-budget gate is not invocable at HEAD** (P1). The `profile:budget` script existed at I.W6 close (`63e29e4`) and was registered in `package.json` as:

```
"profile:budget": "GLASS_UI_BUDGET_MODE=1 GLASS_UI_BUDGET_SKIP_BUILD=1 node scripts/profile-bundle.mjs",
```

At HEAD, `package.json` carries only `profile:bundle` and `profile:aurora` (no `profile:budget`). The `scripts/profile-bundle.mjs` file at HEAD is the F.W1 version (no `BUDGETS` table, no `GLASS_UI_BUDGET_MODE` switch, no `budgetReport` output), reverted from the I.W6 implementation. See `git diff 63e29e4 HEAD -- scripts/profile-bundle.mjs package.json`.

What this looks like on the wire:
- I.W6 budgets: `dist/glass-ui.js: { raw: 200_000, gzip: 38_000 }`, `dist/glass-ui.css: { raw: 42_000, gzip: 7_500 }`.
- HEAD measured: `glass-ui.js` raw 142 966 / gzip 24 477; `glass-ui.css` raw 21 258 / gzip 4 159.
- **If the gate were still wired, HEAD would PASS with substantial headroom**: glass-ui.js raw 71.5% of budget (28.5% headroom); glass-ui.js gzip 64.4% of budget (35.6% headroom); glass-ui.css raw 50.6%; glass-ui.css gzip 55.5%. The W6.B + W3.B retires opened up large headroom against the budgets I.W6 set against the older glass-ui.js (184 335 raw / 35 971 gzip).

The gate would PASS — but the gate is not present. See finding P1-A.

## 6. Test suite

```
$ npm run test
 RUN  v4.1.5 /Users/mkbabb/Programming/glass-ui
 Test Files  18 passed (18)
      Tests  269 passed (269)
   Duration  1.74s
```

**269/269 PASS** — matches J-pre-close.md baseline. J opened with 270 (W3 dropped 1 DockPopover variant; W6.B updated 1 FuzzySearch highlight test). HEAD count: 269. Test suite is the same 18 files.

## 7. Build time

| Command | Pre-J (citation) | HEAD | Δ |
|---|---|---|---|
| `npm run build` (full incl. dts) | ~18 s (J-pre-close.md L25) | **17.59 s** | −0.4 s (~−2%) |
| `npm run iter-build` (no dts) | 998 ms (W1 commit `c6b7df0`) | **900 ms** | −98 ms (~−10%) |
| `[vite:dts]` phase | 14 089 ms (I.W6 finding) | **16 908 ms** | +2 819 ms (~+20%) |

The full-build delta is wash; iter-build improved 10% (smaller bundle). dts phase regressed 20% — reflects added Configurator + Carousel dts surfaces (the API Extractor warns about TS 5.9.3 vs bundled 5.8.2 — pre-existing issue, not J-introduced).

## 8. Stress baseline

**`npm run profile:stress` does not exist at HEAD**. I.W6 retired the `stress` script (`scripts/stress/blob-stress-capture.mjs`), and at HEAD the directory `scripts/stress/` is absent. The I.W5 stress runtime profile capture (R2) artefact in `docs/tranches/I/audit/` is the last comparable baseline; no rerun is possible at HEAD without re-introducing the harness. **Not a J regression** — was already the case at the I.W7 close.

## 9. Subpath cohort verification

`vite.library.ts:11-46` declares **34 entries** at HEAD (vs 33 at I.W7). The new entry `configurator: resolve(rootDir, "src/configurator.ts")` (line 44) is correctly registered.

`package.json:108-237` `exports` block carries **34 subpath entries**, including `./configurator` (lines 225-228). ✅

`package.json:8-103` `typesVersions["*"]` block carries **31 subpath entries** (lines 9-103). The configurator subpath dts entry is **MISSING from `typesVersions`** — see finding F-1 below.

Cross-repo speedtest verification: `/Users/mkbabb/Programming/speedtest/` exists; `package.json` declares `"@mkbabb/glass-ui": "file:../glass-ui"`; 62 import sites for `@mkbabb/glass-ui` across `src/`. **Zero import sites** for `@mkbabb/glass-ui/configurator` at HEAD — speedtest has not yet adopted the new primitive. Not a J regression (the configurator landed in J.W4 and adoption is downstream-paced).

## 10. Findings

### P0 — none

### P1

**P1-A · Bundle-budget gate disappeared between I.W6 and J.** I.W6 commit `63e29e4` shipped the soft-fail bundle-budget gate per I invariant 8 ("bundle-budget non-negotiable"). At HEAD the gate is no longer wired: `package.json` lost `profile:budget`, `scripts/profile-bundle.mjs` lost the `BUDGETS` table, and `.github/workflows/lint.yml` (which had `bundle-budget` job per I.W6 commit message) needs verification. Likely cause: the v0.8.0 consolidation at `5baceb5` (J planning baseline) reverted the I.W6 perf work along with everything else. **Recommendation**: J.W7 close commit re-lands the budget gate against current numbers (the W6.B + W3.B retires opened ~35% gzip headroom; budgets can stay at I.W6 levels and still pass with margin). Without the gate, ε lane cannot certify "non-negotiable" — there is nothing to fail against.

### P2

**F-1 · Configurator subpath missing from `package.json` typesVersions.** `package.json:8-103` `typesVersions["*"]` lists every subpath dts (dock, aurora, hover-popover, instrument-chassis, …) except configurator. The `exports` block at lines 225-228 correctly declares both `types` and `import`, so modern bundlers (vite, rollup, esbuild) resolve correctly via the conditional exports. typesVersions is the older fallback path (TS < 4.7 pre-conditional-exports support) — likely harmless for any J-era consumer but inconsistent with the cohort. Add: `"configurator": ["dist/configurator.d.ts"]` in W7 close.

**F-2 · I.W6 `stress` infrastructure not restored.** Same regression class as P1-A: the v0.8.0 consolidation dropped `scripts/stress/` and the `stress` package.json script. ε lane cannot rerun a stress baseline without it. Lower severity than the budget gate because I.W5 stress was a one-shot capture (R2), not a per-tranche gate.

**F-3 · `ay-close` script reappeared in `package.json`.** I.W6 retired `ay-close.sh`. At HEAD `scripts/ay-close.sh` exists (executable, F-tranche script) AND `"ay-close": "scripts/ay-close.sh"` is wired into `package.json:262`. Same v0.8.0-revert provenance. Not a perf concern but deserves a γ-lane cross-reference; flagging here because the regression-cohort is unified.

**F-4 · `dist/timeline.js` shed 7 045 B raw via chunk re-grouping, not a J-deliberate retire.** The `timeline.js` subpath dropped from 9 414 B to 2 369 B with no source change in the timeline package across J. Inspection: pre-J had `KeyframeTimeline` body inlined; HEAD splits it into a shared chunk (`dist/index-PYpMJK9t.js` 3 390 B raw — likely the timeline body). Net unchanged for full-app consumption; a partial-tree-shake consumer will see different numbers. Document in close ledger so future audits don't double-count.

## 11. Recommendation

**Absorb-then-clean**. The ε lane cannot certify "ε clean" against I invariant 8 with the budget gate missing. Recommended W7 absorption:

1. **Re-land the bundle-budget gate** (restore I.W6's `BUDGETS` table in `scripts/profile-bundle.mjs` + `profile:budget` npm script + GitHub workflow job, against current measurements: PASS with ~30%+ headroom).
2. **Add `configurator` to `typesVersions`** (P2 cohort consistency).
3. **Decide on stress harness restore** vs. formal retirement (document either way in W7 close + a future ε-relevant invariant in J.FINAL).
4. **Cross-reference `ay-close` reappearance** with γ lane.

If the orchestrator chooses to defer items 1 + 3 + 4 to a follow-up tranche, the deferral must be named in J.FINAL (cross-tranche debt) per the precept's substrate-without-consumer guard.

Bundle/dts/test substrate at HEAD is otherwise excellent: −8.33% raw / −5.19% gzip across the lib, every J public symbol emitted to dts, 269/269 tests green, full-build time stable, configurator subpath shape correct. The performance work landed; the gate that would automate "performance regression catches" was inadvertently removed.
