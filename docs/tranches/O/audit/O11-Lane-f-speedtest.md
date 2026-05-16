# O11/f—speedtest deep consumer audit (round-2)

**Agent**: O11/f (consumer-audit round-2; speedtest)
**Target**: `/Users/mkbabb/Programming/speedtest` (READ-ONLY)
**Glass-ui reference**: worktree `agent-a5a0b2a1551518fe0` @ `37288e0` (N.W4 close, v1.1.4)
**Speedtest tip**: master `57497a1b` (ahead 4 of origin/master `b7173fb7`; AC.r3 audit cohort + AC.r3 synthesis still local)
**Audit date**: 2026-05-14
**Baseline**: `docs/tranches/N/audit/N11-Lane-f-speedtest-N4-rerun.md` (CLEAN + 1 motion drift + 6 dock reverse-overfitting candidates)
**Cap**: 25 min

---

## TL;DR

**CLEAN at the consumer-import surface—but two new substrate signals.**

- **Dock-DI refactor (O.Rδ §3.1 / §4.2): ZERO consumer-side migration cost for speedtest.** Speedtest reaches into NONE of the 7 raw-string inject keys (`glassDockContext`, `glassDockId`, `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`, `dockLayerGroup`). The refactor is library-internal; speedtest's 5-component dock composition at `src/components/dock/Dock.vue` rides the public component API only.
- **AB.W3 substrate (Pulse aura + Progress sectioned) consumption RE-CONFIRMED CANONICAL.** Pulse `variant="aura"` lives at 4 surfaces (ResultStack, PhaseTimeline, SpeedtestResults x2) + 1 dots-variant idle indicator. Progress `variant="gradient"` lives at 1 surface (MeterColumn under-bar). All five sites are CSS-side gated, not orchestrator-fired—the AB.W3 contract holds.
- **F1 Aurora-throw dispatch claim is STALE.** Speedtest IS an Aurora consumer (App.vue line 5—`<Aurora :ref="auroraRef" :config="auroraConfig" />`; auroraConfig.ts uses `useGlobalDark` light/dark fork). The dispatch line "speedtest doesn't currently use Aurora" is incorrect.
- **6 dock-family components remain speedtest-only externally.** WATCH carried forward—AC tranche did not introduce a second external consumer; AC.W3/W8 will *deepen* speedtest's dock-cohort dependency (Pulse, IconTooltip, Transition flips), not broaden the substrate's consumer base.
- **AC tranche is deeply load-bearing on glass-ui v1.2.0 (W6 cohort): Fira Code self-host + WCAG `--chart-{phase}-label` companion tokens + dark-mode `--meter-track-stroke` fix + IconTooltip 44px hit-area expansion + media-query touch-target lift.** These are glass-ui-side asks AC currently OWNS in its W6 wave—they overlap O's tranche-development surface.

---

## 1. Cross-Repo State

### 1.1 Speedtest git posture

```
master = 57497a1b (local, ahead 4 of origin)
57497a1b  docs(AC/r3): 6-agent audit cohort + A7 synthesis + plan amendments (revision-3)
cb5854b4  docs(audit AC-r3): GU-FONT—speedtest fonts + glass-ui canon (READ-ONLY)
63753260  docs(audits/AC-r3): B2 engine + worker + composables audit
19940554  docs(AC/r3.B1): read-only server-side audit
origin/master = b7173fb7  build(vite/freshness): wire glass-ui assertDistFresh (N.W0 A5)
```

All four ahead-of-origin commits are user-authored AC.r3 audit docs. No src/ mutations. No orchestrator action needed. Untracked: `docs/audits/2026-05-14-pre-AC-r3-hardening/` + `workers/speedtest-edge/tmp/` (consumer-owned).

### 1.2 A5 wire verification

**INTACT.** `vite.config.ts:2 + line~14`—`import { assertDistFresh } from "@mkbabb/glass-ui/freshness"` invoked against `path.resolve(__dirname, "..", "glass-ui")`. No drift from the N rerun audit.

---

## 2. Subpath consumption tally (post-AC.r3 audit cohort)

17 distinct glass-ui subpaths consumed across 61 distinct files (was: 17 subpaths / 82 sites under the prior import-statement count metric). Subpath set unchanged from N11/f rerun:

```
@mkbabb/glass-ui            (root barrel)        13 import statements
@mkbabb/glass-ui/forms                            11
@mkbabb/glass-ui/tabs                              7
@mkbabb/glass-ui/pulse                             3
@mkbabb/glass-ui/aurora                            2  (+ test mocks 3)
@mkbabb/glass-ui/dark                              2
@mkbabb/glass-ui/dock                              2
@mkbabb/glass-ui/expandable-container              2
@mkbabb/glass-ui/icon-tooltip                      2
@mkbabb/glass-ui/infinite-scroll                   2
@mkbabb/glass-ui/api                               1
@mkbabb/glass-ui/controls                          1
@mkbabb/glass-ui/freshness                         1  (vite.config.ts A5 wire)
@mkbabb/glass-ui/keyboard                          1
@mkbabb/glass-ui/timeline                          1
@mkbabb/glass-ui/toggle-chip                       1
@mkbabb/glass-ui/tokens                            1
```

No deep-path imports. No retired v0.9.x paths. No drift since N.

---

## 3. Dock-DI cleanup blast-radius assessment (O.Rδ §3.1 / §4.2)

This is the headline angle for round-2.

### 3.1 The proposal (recap)

Per O.Rδ §3.1 + §4.2, glass-ui's dock subsystem provides 6 keys to descendants (`glassDockContext`, `glassDockId`, `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) + `dockLayerGroup` from `<DockLayerGroup>`. The consolidation:

1. One typed `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` carrying `{ id, orientation, keepOpen, release, held, expanded? }`.
2. Paired `useDockContext()` (strict—throws) + `useOptionalDockContext()` (optional—for primitives like Popover/Select/Dropdown that may be used outside a dock).
3. Migrate the 5 in-library consumer sites (Slider, HoverPopover, PopoverContent, SelectContent, DropdownMenuContent).
4. Remove duplicate `glassDockId` provide.
5. Wire-or-retire dead `dockExpanded`.

### 3.2 Speedtest's exposure

**Speedtest reaches into NONE of the 6 dock injects.** Verified by:

```bash
rg -n 'glassDockContext|glassDockId|dockKeepOpen|dockRelease|dockHeld|dockExpanded|dockLayerGroup' src/ vite.config.ts
# → zero matches
rg -n 'useDockContext|useOptionalDockContext|provideDockContext' src/
# → zero matches
```

Speedtest's only dock-cohort touchpoint is the public component API at `src/components/dock/Dock.vue` lines 13-19:

```ts
import {
    GlassDock,
    DockIconButton,
    DockTabButton,
    DockLayerGroup,
    DockLayer,
} from "@mkbabb/glass-ui/dock";
```

Plus `IconTooltip` from `@mkbabb/glass-ui/icon-tooltip` (lines 20). The composition uses `<GlassDock>` + `<DockLayerGroup>` + `<DockLayer>` + `<DockIconButton>` + `<DockTabButton>`—pure-component-API. No `inject()` against any dock substrate key anywhere in speedtest src/.

**Verdict**: Dock-DI refactor is binary-transparent to speedtest. If glass-ui ships the consolidated `DOCK_CONTEXT_KEY` + strict/optional helper pair at O-implementation, speedtest needs zero migration. The 5 consumer-site migrations are all library-internal.

### 3.3 Slider-keepDockOpen / HoverPopover contract impact

Speedtest's single `<Slider>` consumer (`src/components/dashboard/DashboardMapControls.vue:38`—a `ScrollPane` map-controls panel sub-tree) is NOT inside a `<GlassDock>`. The `keepDockOpen` contract is irrelevant for that site; the slider runs in its standalone mode. Refactor risk: zero.

Speedtest has zero `<HoverPopover>` consumers (`rg -n 'HoverPopover|hover-popover' src/` returns nothing). The `dockKeepOpen`/`dockRelease` callers in HoverPopover are also irrelevant to speedtest.

### 3.4 Dead-provide `dockExpanded` disposition

Per Rδ §3.1 / §4.2, `dockExpanded` is currently provided at `useDockState.ts:232` but never injected. Speedtest has no consumer that would benefit from `dockExpanded` either:

- The speedtest dock at `src/components/dock/Dock.vue:181` sets `:always-expanded="true"`—the expanded state is a constant by App-level decree, not a reactive signal.
- No speedtest descendant reads `inject('dockExpanded', ...)`.

**Verdict**: speedtest signals RETIRE-FRIENDLY for `dockExpanded`. The wire-before-retire posture defaults to WIRE, but for this key the orchestrator should poll round-2's other consumer audits (`O11/a..e`) before deciding. Speedtest is not a counter-evidence consumer.

---

## 4. Reverse-overfitting WATCH (6 dock-family components)

| Component         | External consumers           | Demo-private consumers | Status |
|-------------------|------------------------------|------------------------|--------|
| `GlassDock`       | speedtest only (1 site)      | demo/stories/navigation/dock.vue, demo/stories/compositions/dock-with-slider.vue | single-external-consumer |
| `DockLayer`       | speedtest only (5 sites)     | demo (same)            | single-external-consumer |
| `DockLayerGroup`  | speedtest only (1 site)      | demo (same)            | single-external-consumer |
| `DockIconButton`  | speedtest only (3 sites)     | demo (same)            | single-external-consumer |
| `DockTabButton`   | speedtest only (4 sites)     | demo (same)            | single-external-consumer |
| `DockSelectTrigger` | 0 external consumers       | demo (same)            | demo-only—`rg DockSelectTrigger` returns zero hits in speedtest src/ |

The N11/f baseline counted 6 dock-family components as speedtest-only. **At HEAD, `DockSelectTrigger` has ZERO speedtest consumers**—it's demo-only, even worse than baseline.

**Per V tranche verdict** (V.W3 cohort doc canonicalisation), single-external-consumer dock-cohort is ACCEPTED as canonical given the substrate's coherent design language. The dock subsystem is a holistic primitive—fragmenting it for multi-consumer arbitrarily would damage internal coherence.

**Verdict**: WATCH carried forward to O+. Disposition unchanged from N. `DockSelectTrigger` is a candidate for O wire-or-retire review if no consumer surfaces in round-2's other agents.

---

## 5. AB.W3 substrate consumption verification

The dispatch flags speedtest as the canonical cross-constellation consumer per β audit. Re-verified at HEAD:

### 5.1 Pulse aura adoption (5 surfaces)

```
src/components/speedtest/ResultStack.vue:47       <Pulse variant="aura"  …>  active result-row value pulse
src/components/speedtest/PhaseTimeline.vue:29     <Pulse variant="aura"  …>  current-stage marker pulse
src/components/speedtest/SpeedtestResults.vue:47  <Pulse :count="3" variant="dots" />        idle ready-to-start
src/components/speedtest/SpeedtestResults.vue:102 <Pulse variant="aura"  …>  metric-display aura site 1
src/components/speedtest/SpeedtestResults.vue:132 <Pulse variant="aura"  …>  metric-display aura site 2
```

All 5 import the same surface: `import { Pulse } from "@mkbabb/glass-ui/pulse"`. Comments cite "AB.W3.T6 (n/5)"—4 aura surfaces + 1 dots-variant idle indicator. The CSS-side gate at `SpeedtestResults.vue:625` (`.pulse-aura` visibility) drives a `once` prop iteration on the Complete-headline site.

**Verdict**: AB.W3 Pulse aura substrate is canonically and broadly consumed by speedtest—exactly as the β audit cited. No drift.

### 5.2 Progress gradient adoption (1 surface)

```
src/components/speedtest/MeterColumn.vue:44       <Progress variant="gradient" :model-value=… />  phase under-bar
```

The Progress gradient variant carries `transition-all` (per SpeedtestResults.vue:525 comment)—the consumption matches AB.W3 substrate intent.

**Verdict**: AB.W3 Progress gradient substrate is consumed correctly. Single-consumer, but it's `<Progress>` which is multi-consumer across glass-ui's own demo + downstream (not single-consumer like dock). No reverse-overfitting concern.

### 5.3 Cross-constellation β-audit canonical confirmed

The β audit's claim that speedtest is the canonical AB.W3 substrate consumer holds at HEAD. The 5 Pulse + 1 Progress surfaces match the audit citation set 1:1.

---

## 6. F1 Aurora-throw verification (DISPATCH CORRECTION)

The dispatch states "F1 Aurora-throw—speedtest doesn't currently use Aurora; verify." **This is incorrect.**

```
src/App.vue:5            <Aurora :ref="auroraRef" :config="auroraConfig" />
src/App.vue:127          import { Aurora } from "@mkbabb/glass-ui/aurora";
src/config/auroraConfig.ts:3   import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";
src/config/auroraConfig.ts:125 export const SPEEDTEST_AURORA_CONFIG: AuroraConfig = {…};
src/composables/useAuroraPolicy.ts:2    // reduced-motion + intersection-pause policy for Aurora
src/composables/useAuroraPolicy.ts:21   export function useAuroraPolicy(auroraRef: Ref<AuroraApi | null>)
```

Speedtest is a deep Aurora consumer:

1. **Mount site**: `App.vue:5`—`<Aurora :alpha="…" :config="auroraConfig" />` at the App root.
2. **Config surface**: `src/config/auroraConfig.ts` defines `SPEEDTEST_AURORA_CONFIG` (6-hue palette + 6 nuclei) AND a `useSpeedtestAuroraConfig(): ComputedRef<AuroraConfig>` that forks alpha by `useGlobalDark()` light/dark state.
3. **Policy composable**: `useAuroraPolicy(auroraRef)` wraps reduced-motion + intersection-pause.
4. **Test mocks**: 3 test files mock `@mkbabb/glass-ui/aurora` with `{ Aurora: { render: () => null }, SPEEDTEST_AURORA_CONFIG: {} }` (jsdom doesn't run WebGL).

**Hypothesis**: the dispatch's "F1 Aurora-throw" refers to a *different* F1 audit (perhaps a glass-ui-side F1 from a prior tranche). Speedtest's auroraConfig is well-canonicalised and consumed. **No action.**

---

## 7. Pre-AC speedtest patterns flagged for canonicalisation

Per the dispatch ask to "surface any pre-AC speedtest patterns that should canonicalise," I cross-walked AC.r3 PROGRESS.md W6 + W8 + W5 lane expectations against HEAD:

### 7.1 AC.W6 expects glass-ui v1.2.0 (overlapping O scope)

The AC.W6 plan (PROGRESS.md / AC.md revision-3) requires glass-ui v1.2.0 with:

- **Fira Code self-host** (`glass-ui/src/assets/fonts/` per OFL) with Capsize-calibrated overrides + DESIGN.md self-host policy.
- **F1.V-04 `--chart-{phase}-label` companion tokens** at darkened L≈0.40 (preserves canvas hue; WCAG contrast fix for `--chart-upload` 2.69:1, `--chart-ping` 3.78:1, `--muted-foreground` 4.30:1).
- **F1.V-02 dark-mode `--meter-track-stroke` fix** (bg-on-bg renders rings invisible in dark mode).
- **F2.I-04 IconTooltip `::before` 44×44 hit-area expansion** (bottom timeline marker hit-target 14×14 px, ~10× under WCAG 2.5.5).
- **F2.AA-03 `@media (pointer: coarse)` dock-control-size lift**.
- **F3.T-01 source-of-truth collapse**: glass-ui owns `--font-brand-sans` (consumer activates via preset; resolves the `--font-brand-sans` double-declaration with diverging stacks).
- **`.text-hero` hoist (Path B per F3 dissent)**—currently consumer-owned at `styles/tokens.css:253-380` (~30 LOC dead `.text-hero[data-*]` block + 35-line defending comment); F3 prefers wholesale retire (-67 LOC consumer-side) by hoisting to glass-ui under the brand-uniform-sans preset.

**This overlaps O scope.** O is "tranche development only"—but several of these AC.W6 items intersect directly with O architectural mandates:

- `.text-hero` hoist → token-tier work; preserves Tailwind-first invariant.
- `--chart-{phase}-label` companion tokens → token-tier addition (J invariant 1: token-first).
- Fira Code self-host → glass-ui-side font preset (matches the J/K precedent for asset packaging).

**Recommendation**: O.W* should COORDINATE with AC.W6—either O ships the glass-ui v1.2.0 substrate AC.W6 needs, or O explicitly defers and AC.W6 ships it. NO duplicated effort (O directive O5: DRY/KISS). Suggest folding into the "doc-tier + token-tier" wave or a dedicated "AC.W6 dependency" wave.

### 7.2 Duplicated `wait()` (AC.W8 T_lib-* slated for upstream)

```
src/speedtest/upload.ts:158       function wait(ms: number): Promise<void> { … }
src/speedtest/download.ts:134     function wait(ms: number): Promise<void> { … }
```

AC.W8 plan: "duplicated `wait()` to glass-ui." This is a consumer-side cleanup that AC owns. Glass-ui-side action: evaluate whether `wait(ms)` is a useful library primitive (likely yes—it's used by `useStaggerReveal`, motion composables, etc.). If glass-ui already has a canonical sleep primitive, the AC.W8 plan should retarget to that.

**Spot-check**: `rg -n 'export function wait' src/` in glass-ui returns no public `wait` symbol. AC.W8's plan implies a glass-ui-side substrate add—orchestrator decides whether O folds this in.

### 7.3 `easeOutCubic` adoption + `currentSegmentKey` lift (AC.W8 T_lib-*)

```
src/components/speedtest/composables/useMeterCompletion.ts:31     function easeOutCubic(t: number): number { … }
```

AC.W8 plan: "easeOutCubic adoption"—upstream candidate. Glass-ui already exposes `@mkbabb/keyframes.js` ease functions (per CLAUDE.md peer dep). Whether `easeOutCubic` lives at keyframes.js or glass-ui's local utilities is a coordination question.

```
src/components/speedtest/MeterColumn.vue:126     const currentSegmentKey = computed<string | undefined>(() => …);
src/components/speedtest/PhaseTimeline.vue:146   const currentSegmentKey = computed<string | undefined>(() => …);
```

AC.W8 plan: "`currentSegmentKey` lift"—speedtest-internal hoist (both sites are in `src/components/speedtest/`). Not a glass-ui-side concern.

---

## 8. Risks and unknowns

- **R1—AC.r3 plan amendments are NOT yet pushed.** Origin/master is at `b7173fb7` (N.W0 A5 wire). Local master is ahead 4 with AC.r3 audit cohort + synthesis. The cross-tranche dependency (AC.W6 needs glass-ui v1.2.0) is documented locally only. If orchestrator dispatches O implementation lanes that touch glass-ui substrate AC.W6 plans to consume, coordinate via the user. **No orchestrator action—speedtest's local-only state is benign and user-owned.**
- **R2—`DockSelectTrigger` has ZERO speedtest consumers (was: speedtest-only in N baseline).** Either N11/f rerun overcounted, or the AC tranche removed the consumer. Spot-check needed at O round-2 synthesis. Disposition default: WATCH → if no consumer surfaces at round-2 synthesis, candidate for wire-or-retire review.
- **R3—Aurora consumption is stable BUT `Aurora` is per-app singleton mounted at App root.** The reverse-overfitting concern (single-external-consumer) DOES apply to `Aurora` for speedtest—but Aurora is also consumed by glass-ui's own `demo/stories` and is a self-contained primitive. Per V verdict pattern, this is canonical single-consumer external + demo-private. No action.
- **R4—Speedtest's `useAuroraPolicy` composable could canonicalise upstream.** It composes `useReducedMotion` + intersection-pause + auroraRef lifecycle. If a second Aurora consumer materialises, this composable is the canonical hoist target. Not in scope for O.

---

## 9. Proposed plan implications (which O.W* wave absorbs)

| Finding | Disposition | Suggested wave |
|---|---|---|
| Dock-DI consolidation (Rδ §3.1) | Library-internal; consumer-transparent; speedtest signals GO | O DI-standardisation wave |
| `dockExpanded` retire | Speedtest is not counter-evidence; await round-2 verdicts | Same wave |
| `glassDockId` collapse | No speedtest consumer; clean | Same wave |
| `DockSelectTrigger` zero-consumer | Spot-verify at synthesis; WATCH→wire-or-retire | O round-2 synthesis |
| AC.W6 glass-ui v1.2.0 deps | Coordinate or defer; NO duplicate effort | O coordination decision |
| `wait()` upstream | AC.W8 owns; glass-ui-side: substrate add evaluation | Cross-tranche coordination |
| Aurora-throw F1 dispatch correction | Already verified; no action | n/a |
| AB.W3 substrate canonical | Re-confirmed; no action | n/a |

---

## Verification

- Read commands cited: `rg -c '@mkbabb/glass-ui' src/ vite.config.ts`, `rg "from \"@mkbabb/glass-ui[^\"]*\"" --no-filename src/ vite.config.ts | sort | uniq -c`, `rg -n 'glassDockContext|dockKeepOpen|dockRelease|dockHeld|dockExpanded|dockLayerGroup' src/ vite.config.ts`, `rg -n 'useDockContext|provideDockContext' src/`, `rg -n 'DockIconButton|DockTabButton|DockSelectTrigger|DockLayer|DockLayerGroup|GlassDock' src/ -g '*.vue' -g '*.ts'`, `rg -n 'variant="aura"|variant="dots"|variant="gradient"|<Progress' src/ -g '*.vue'`, `rg -n 'Aurora|useAurora' src/`, `rg -n 'instrument-chassis|glyph-face|InstrumentChassis|GlyphFace' src/`, `rg -n 'function wait\(|easeOutCubic|currentSegmentKey' src/`.
- Spot-verified files: `src/components/dock/Dock.vue`, `src/App.vue`, `src/config/auroraConfig.ts`, `src/composables/useAuroraPolicy.ts`, `src/components/speedtest/{ResultStack,PhaseTimeline,SpeedtestResults,MeterColumn}.vue`, `src/components/dashboard/DashboardMapControls.vue`, `src/views/SurveyView.vue`, `vite.config.ts`, `styles/tokens.css`, `docs/tranches/AC/PROGRESS.md`, `docs/tranches/AC/AC.md` (AC.r3 amendments).
- Worktree diff: this lane is read-only—no diff.

## Open questions for orchestrator

1. **AC.W6 ↔ O coordination**—does O ship the glass-ui v1.2.0 substrate AC.W6 needs (`.text-hero` hoist, Fira Code self-host, WCAG companion tokens, dark-mode track-stroke fix, IconTooltip hit-area, dock-control-size media-query lift) OR defer to AC ownership? Both paths violate DRY/KISS if mis-coordinated.
2. **`DockSelectTrigger` zero-consumer disposition**—wire-or-retire decision at O round-2 synthesis. Speedtest signals retire-friendly; need round-2 cross-check.
3. **`useAuroraPolicy` canonicalisation candidacy**—single-consumer; defer until a second Aurora consumer materialises (matches V verdict pattern).
4. **`wait()` substrate add**—if AC.W8 plans to lift speedtest's two `wait()` instances upstream, glass-ui needs a canonical home. Consider: motion composables, utilities, or no-op (let AC.W8 retarget to existing keyframes.js timing primitives if they exist).

---

**Audit completed by:** O11/f consumer audit (round-2, READ-ONLY, 25-min cap)
**Method:** Subpath enumeration + 6-key inject sweep + dock-family consumer tally + AB.W3 substrate spot-verify + AC.r3 plan cross-walk + dispatch-claim verification
