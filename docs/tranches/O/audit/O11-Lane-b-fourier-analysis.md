# O11 Consumer-Audit Lane b—fourier-analysis/web (O round 2 deep audit)
## DEEP—Idiomatic use + gap candidates + GlassScrubber API proposal + round-1 cross-walk

---

## § Preamble

- **Target:** `/Users/mkbabb/Programming/fourier-analysis/web/`
- **Reference:** glass-ui post-N substrate (v1.1.4 at `37288e0`) + O round-1 audits (Rα–Rζ)
- **Pin:** `"@mkbabb/glass-ui": "file:../../glass-ui"` (`package.json:14`)
- **Prior:** `docs/tranches/N/audit/N11-Lane-b-fourier-analysis-N4-rerun.md` (2026-05-12; grade B+ stable trending UP)
- **HEAD:** `301a95e`—UNCHANGED since N11/b
- **Working tree:** **DIRTY**—same in-flight refactor as N11/b re-run (shadow-copies deleted, new modules under `equation/convergence/`, `paper/search/`, `morph/`, `styles/`)
- **Audit date:** 2026-05-14
- **Method:** read-only inventory; `rg`-verified evidence on every count; per-site idiomatic-vs-workaround verdict

---

## § 1. Inventory cross-walk vs N11/b

### 1.1 Import surface (18 sites, 19 import statements)

```
rg "from ['\"]@mkbabb/glass-ui" src/ → 19 lines
```

| Subpath | Sites | Symbols consumed |
|---|---|---|
| root barrel | 9 | `TooltipProvider`, `Toaster`, `Tooltip`/`TooltipTrigger`/`TooltipContent`, `Toast*` types, `Collapsible*`, `Select*`, `HoverCard*` (AppHeader) |
| `/dark` | 1 | `useGlobalDark` |
| `/dock` | 3 | `GlassDock`, `DockIconButton` (AnimationControls + EditorControlsDock + CanvasControlsDock) |
| `/hover-popover` | 2 | `HoverPopover` (EditorControlsDock + CanvasControlsDock) |
| `/tabs` | 3 | `UnderlineTabs` (EquationView + VisualizationView + GalleryView) |
| `/infinite-scroll` | 1 | `InfiniteScroll` (GalleryInfiniteGrid—NEW vs N11/b) |

**Verdict:** All vueuse-bearing surfaces correctly reached via flat subpath; root barrel restricted to vueuse-free symbols. **L.W1 SCC-carve-out fully honored.** No `@mkbabb/glass-ui/composables/dark` / `composables/keyboard` legacy paths anywhere.

### 1.2 Shadow-copy zero-state—VERIFIED ZERO RE-EMERGENCE

`ls src/components/ui/`:

```
CollapsibleSection.vue   ← consumer-owned wrapper (10+ sites)
PathPreview.vue          ← consumer-owned SVG preview
SliderControl.vue        ← consumer-owned (scrubber candidate)
tooltip/Tooltip.vue      ← thin API-shape adapter atop @mkbabb/glass-ui Tooltip
tooltip/index.ts
```

`ls src/composables/`:

```
useFourierMorph.ts, useMorphConfig.ts, useOffsetPagination.ts, useSafeStorage.ts, useToast.ts
```

All 5 are domain-specific or canonical shims (`useToast` smooths over the glass-ui Toast factory). **No re-emerged shadow copies. M.W1 cleanup invariant holds at HEAD + working-tree.**

### 1.3 reka-ui leak—1 residual site (REGRESSION)

```
rg "from ['\"]reka-ui['\"]" src/ → 1 hit
src/components/equation/EquationView.vue:8:
  import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui";
```

**Verdict:** N11/b reported "Tooltip shim collapsed onto glass-ui canonical" but didn't audit HoverCard. AppHeader at line 17 imports `HoverCardRoot, HoverCardContent` from `@mkbabb/glass-ui`; EquationView at line 8 imports them directly from `reka-ui`. **Drift:** two consumers of the same primitive reach it via two different surfaces.

**Disposition:** consumer-side fix (one-line rename)—glass-ui HoverCard root barrel exports the canonical primitives.

### 1.4 Aurora—ZERO consumption (F1-throw impact: NONE)

```
rg -i "aurora|metaball|paper-backdrop" src/ → 0 hits
```

fourier-analysis/web does NOT import `Aurora`, `useAurora`, `Metaballs`, `useMetaballs`, or `PaperBackdrop`. The math-paper + fourier-viz dashboards do their own canvas/WebGL drawing (`FourierMorphSvg`, `ConvergencePlot`, `ContourEditorCanvas`—domain-specific renderers, not background substrate). **F1 Aurora-throw is bounded: no consumer impact in this repo.** Aurora's idiomatic-use opportunity at fourier-analysis would be the **app-shell background** behind `/visualize` and `/morph`—but consumer has explicitly opted out of background ornamentation in favor of the paper-aesthetic substrate (see `styles/fourier-overrides.css`).

---

## § 2. Per-site idiomatic-vs-workaround verdict

### 2.1 IDIOMATIC

- `App.vue` mounts `TooltipProvider` + `Toaster` at app root.
- `composables/useToast.ts`—domain (error/info/success) → glass-ui variant mapping; API smoothing.
- `components/ui/tooltip/Tooltip.vue`—thin `text` prop adapter; 35+ downstream sites.
- `components/ui/CollapsibleSection.vue`—styling wrapper; 10+ sites.
- `components/layout/DarkModeToggle.vue`—`useGlobalDark` from `/dark` (vueuse-bearing subpath canonical).
- `components/visualization/{AnimationControls, EditorControlsDock, CanvasControlsDock}.vue`—`GlassDock` + `DockIconButton` + `HoverPopover` substrate composed canonically.
- `components/visualization/{EquationView, VisualizationView, GalleryView}.vue`—`UnderlineTabs` from `/tabs`.
- `components/visualization/gallery/GalleryInfiniteGrid.vue`—`InfiniteScroll` from `/infinite-scroll` (NEW fresh consumer).
- `components/visualization/gallery/GallerySearchBar.vue`—`Button` + `Input` + `Select*`.
- `components/morph/MorphPhaseConfig.vue`—`Select*` (NEW consumer; post-N11/b).

### 2.2 WORKAROUND / DRIFT

| Site | Issue | Disposition |
|---|---|---|
| `equation/EquationView.vue:8` | Direct `reka-ui` import for `HoverCard*` | CONSUMER FIX—one-line rename |
| `visualization/AnimationControls.vue:130-174` | Inline rainbow `play-btn` (45 LOC ornament) | Domain decoration; NOT a affordance gap |
| 3 scrubber sites | `.glass-track` recipe × 3 (see §4) | **GlassScrubber substrate proposal** |
| All scrubbers + ~20 other sites | `transition: all 0.15s ease`; no token | `--duration-instant-plus` PROPOSAL |
| `ConvergenceTimeline.vue:100`, `GlassTimeline.vue:128` | `backdrop-filter: blur(12px)` hardcode | Absorb into GlassScrubber `blur-track` prop |

---

## § 3. Idiomatic use opportunities (substrate-already-present)

These primitives ALREADY ship from glass-ui and would reduce consumer LOC if wired:

All confirmed via `rg "<Symbol>" src/` → 0 hits.

| Primitive | Candidate sites |
|---|---|
| `MetricBadge` / `MetricPill` | `ConvergenceTimeline.vue:73` (`N=…/…` tabular-num count); `ConvergencePlot.vue:377`; likely `EquationResult.vue` |
| `StatusDot` | gallery `tierFilter` (featured/saved/normal inline dots); `EquationModeToggle` |
| `Skeleton` | gallery cards + paper article loading (bespoke shimmer rectangles) |
| `useTouchGate` | `paper/MobileFloatingToc.vue` touch-outside dismiss |
| `useResizeObserver` | `ConvergencePlot.vue`, `ContourEditorCanvas.vue`, `FourierMorphSvg.vue` |

**Aggregate:** 5 wire candidates at consumer side. Per N invariant 23 these are WIRE, not GAP.

---

## § 4. GlassScrubber union candidate—concrete API proposal (HEADLINE)

### 4.1 Three sites—rg-verified evidence

```
rg "GlassTimeline|SliderControl|ConvergenceTimeline" src/ (filtered)
```

| Site | Consumer of | Use case |
|---|---|---|
| `components/visualization/AnimationControls.vue:85` | `GlassTimeline` | Playback timeline `t ∈ [0, 1]` with floating caret label, dock-integrated |
| `components/equation/ConvergencePlot.vue:14, :353` | `ConvergenceTimeline` | Harmonic-count scrubbing `N ∈ [0, totalHarmonics]` with play button + count badge |
| `components/equation/FunctionInput.vue:174, :207`, `equation/EquationPanel.vue:87`, `visualization/ContourSettings.vue:223, :236, :262, :275, :288` (7 instantiations across 3 host components) | `SliderControl` | Generic value-slider with inline numeric input + colored fill |

**SliderControl is the most-instantiated** (7 instances across 3 hosts; v1.0 the variant `timeline` is the default—see L4 in §4.2).

### 4.2 Recipe overlap—line-by-line

| Concern | GlassTimeline | SliderControl | ConvergenceTimeline | Overlap |
|---|---|---|---|---|
| Pointer-capture scrub state machine (`onTrackDown/Move/Up`, `setPointerCapture`, `scrubbing` ref) | L19–41 | L42–67 | L21–41 | **IDENTICAL** modulo emit-vs-store wiring |
| `tFromPointer` / `valueFromPointer` ratio calc | L19–22 | L44–50 (with step-snap) | L21–24 | IDENTICAL geometry; SliderControl adds `Math.round(raw/step)*step` |
| `.glass-track` CSS (track + fill + thumb three-layer) | L122–174 | L166–220 | L119–157 | ~85%—heights differ (24/16/20px), border-radius differs (12/8/12px) |
| `color-mix(in srgb, var(--foreground) 5%, transparent)` track base | L127 | L171 | L122 | IDENTICAL |
| `color-mix(... 8%, transparent)` hover state | L139 | L181 | L130 | IDENTICAL |
| `box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 40%, transparent)` focus-visible | L143 | L185 | L133 | IDENTICAL |
| `backdrop-filter: blur(12px)` | L128 | NONE | L123 | 2 of 3 |
| Thumb `opacity 0 → 1` on hover | L164, L170 | L211, L217 | L149, L153 | IDENTICAL pattern |
| `transition: all 0.15s ease` thumb props | L166 | L213 | L150 | IDENTICAL |
| Dock-keepOpen inject | L12–13, L27, L40 | L24–25, L55, L66 | NONE (uses emit-driven seek) | 2 of 3 |
| Keyboard arrow-keys nav | L43–52 | L69–77 | NONE | 2 of 3 |
| `role="slider"` + ARIA value bindings | L63–67 | L100–105 | L57–62 | IDENTICAL |

**Recipe overlap calculation:**
- Pointer state machine: 100% (3 sites)
- `.glass-track` track/fill/thumb CSS: ~85% (3 sites)
- `color-mix` substrate tokens (5%, 7%, 8%, 25%, 40% foreground tints; 40% ring): 100% identical (3 sites)
- ARIA wiring: 100% (3 sites)
- Differentiators: thumb size constants (4px/6px), track height (16/20/24px), track border-radius (8/12px), thumb color (foreground tint vs `--track-color`), backdrop-blur presence, dock-keepOpen presence, keyboard nav presence

**Weighted overlap (LOC-weighted):** **~82% of script + style identical across the 3 sites.** N11/b's "~80%" estimate confirmed.

### 4.3 Proposed API SHAPE

**Option A (PREFERRED)—`Slider variant="glass-scrubber"` on the existing `<Slider>` substrate**

Rationale: library already ships `<Slider>` (`ui/slider/` wrapping reka-ui `SliderRoot`); CVA variant is the canonical extension pattern; `keepDockOpen` contract ALREADY documented (CLAUDE.md §"Slider keep-dock-open contract"); no new subpath / no new symbol.

Proposed signature:

```ts
// src/components/ui/slider/Slider.vue

interface SliderProps {
    modelValue: number | [number, number];      // existing
    min?: number;
    max?: number;
    step?: number;
    keepDockOpen?: boolean;                       // existing (default true)
    variant?: "default" | "glass-scrubber";       // NEW
    /** Track color override; defaults to `--primary` */
    trackColor?: string;                          // NEW (glass-scrubber only)
    /** Render a floating caret label above thumb during hover/scrub */
    caretLabel?: string;                          // NEW (glass-scrubber only)
    /** Apply backdrop-filter blur to track (heavier glass) */
    blurTrack?: boolean;                          // NEW (glass-scrubber only; default false)
}

// CVA:
const sliderVariants = cva("slider-root", {
    variants: {
        variant: {
            default: "...",          // existing recipes
            "glass-scrubber": [
                "relative w-full rounded-full cursor-pointer outline-none touch-none overflow-hidden",
                "bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)]",
                "hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]",
                "transition-[background] duration-instant-plus",
                "focus-visible:shadow-[0_0_0_2px_color-mix(in_srgb,var(--ring)_40%,transparent)]",
                "data-[blur-track=true]:backdrop-blur-[var(--glass-blur-resting)]",
            ].join(" "),
        },
    },
});
```

Internal three-layer DOM (matches all 3 candidate sites):

```vue
<div class="slider-glass-scrubber" :data-blur-track="blurTrack">
    <div class="glass-fill" :style="{ width: progress + '%', '--track-color': trackColor }" />
    <div class="glass-thumb" :style="{ left: progress + '%', '--track-color': trackColor }" />
    <transition name="caret">
        <span v-if="(scrubbing || hovered) && caretLabel" class="glass-caret">{{ caretLabel }}</span>
    </transition>
</div>
```

**Option B (REJECTED)**—new `<GlassScrubber>` primitive under `/glass-scrubber` subpath: adds new top-level surface; duplicates ~50% of `<Slider>` machinery (pointer state machine, keyboard nav, ARIA); violates DRY (O5). Justified only if divergence is structural—but the §4.2 evidence is purely visual.

**Option C (REJECTED)**—pure CVA recipe class: pointer-capture + ARIA + dock-keepOpen can't live in CSS.

### 4.4 Consumer migration shape (Option A)

```vue
<!-- GlassTimeline.vue (175 → ~30 LOC) -->
<Slider variant="glass-scrubber" :model-value="anim.t" :min="0" :max="1" :step="0.001"
        :caret-label="label" blur-track
        @update:model-value="anim.seek($event)"
        @scrub-start="anim.startScrub()" @scrub-end="anim.endScrub()" />

<!-- SliderControl.vue (221 → ~50 LOC; keeps label + numeric input chassis) -->
<Slider variant="glass-scrubber" :model-value="modelValue"
        :min="min" :max="max" :step="step" :track-color="color"
        @update:model-value="emit('update:modelValue', $event)" />

<!-- ConvergenceTimeline.vue (166 → ~60 LOC; keeps play-btn + count chassis) -->
<Slider variant="glass-scrubber" :model-value="t" :min="0" :max="1" :step="0.001" blur-track
        @scrub-start="emit('scrub-start')"
        @update:model-value="emit('scrub-move', $event)"
        @scrub-end="emit('scrub-end')" />
```

**Net LOC reduction:** ~562 → ~140 across the 3 consumer files (**~75% reduction**).

### 4.5 ≥ 2-consumer bar verification (L invariant 8 + N invariant 23)

| Consumer | Site | Notes |
|---|---|---|
| 1. fourier-analysis/web—playback timeline | `AnimationControls.vue:85` | confirmed |
| 2. fourier-analysis/web—convergence-rate scrubbing | `ConvergencePlot.vue:353` | confirmed |
| 3. fourier-analysis/web—generic value slider (7 instantiations) | `FunctionInput.vue:174, 207`, `EquationPanel.vue:87`, `ContourSettings.vue:223, 236, 262, 275, 288` | confirmed |

**3 distinct use-cases in 1 consumer repo; 10 total instantiations.** Bar cleared at fourier-analysis alone. Speedtest + ai/web likely have additional scrubber-shaped sites (TBD—needs cross-repo audit; folded into O.W?-scrubber wave spec).

**Wire-or-defer disposition:** **WIRE.** Per N invariant 23, under-wired primitives default to WIRE. Per O round-1 Rβ (`GlassTimeline.vue` 1049-line SPLIT-CANDIDATE), the timeline package is already on the decompose roadmap—adding a `glass-scrubber` variant to `<Slider>` is the orthogonal substrate addition that closes the GlassScrubber gap without bloating GlassTimeline.

### 4.6 Naming overload—coordinate with Rβ

Rβ §3.1 decomposes library `GlassTimeline.vue` into `ScrubberTimeline + SegmentedTimeline + ContinuousTimeline + dispatcher`. The library `<GlassTimeline variant="scrubber">` is a SEGMENTED-TIMELINE-PKG primitive (HoverPopover-portal caret + segment markers + multi-stop gradient; seek-domain semantics).

The proposed `<Slider variant="glass-scrubber">` is a DIFFERENT, atomic value-slider (track/fill/thumb + optional caret + dock-keepOpen; value-domain).

The 3 fourier-analysis sites are VALUE-DOMAIN—they map to `Slider glass-scrubber`, NOT to `GlassTimeline scrubber`.

**Naming proposal to resolve overload:**
- Library `<GlassTimeline variant="scrubber">` → rename to `variant="timeline-scrubber"` (or `"segmented-scrubber"`) at the Rβ decompose wave.
- New `<Slider variant="glass-scrubber">`—atomic slider recipe.

---

## § 5. Motion-drift propagation check (`transition: all 0.15s ease`)

```
rg "transition: all" src/ → 29 lines
rg "0\.15s ease" src/ → 30 lines
```

**At N11/b:** 4 sites with `0.15s ease` (SliderControl × 3, GlassTimeline × 1; expanded `+2` to ConvergenceTimeline + UserSlugBar).

**HEAD + working tree** (key sites):
- `styles/buttons.css:142`, `paper/PaperSidebar.vue:192`, `paper/MobileFloatingToc.vue:224, 325`, `visualization/FullscreenViewer.vue:133`, `equation/FunctionInput.vue:240`, `equation/convergence/ConvergenceTimeline.vue:102, 150`, `equation/EquationModeToggle.vue:46`, `visualization/gallery/UserSlugBar.vue:146`, `visualization/EasingPicker.vue:61`, `equation/EquationView.vue:441-447` (Vue transition block), `visualization/AnimationControls.vue:215`.

**`0.15s ease` count grew 4 → ~12 sites; `0.15s`-anything count grew to ~20.** Motion-drift is PROPAGATING faster than N11/b predicted. Urgency for `--duration-instant-plus` token is now CRITICAL.

**Gap proposal—REAFFIRMED + URGENT:**

```css
/* src/styles/tokens.css §1 */
--duration-instant-plus: 150ms;        /* between --duration-instant (100ms) and --duration-fast (200ms) */
```

Documentation: "use for tight pointer-feedback transitions (hover-fill, focus-glow, micro-state); equivalent to the consumer-pattern `0.15s ease`."

---

## § 6. Round-1 cross-walk

- **Rα (legacy)** E4 stale "scrubber-default-back-compat" comment at `custom/timeline/GlassTimeline.vue:52,547`: library-internal cleanup; **no consumer impact** (consumer never reads library SFC directly).
- **Rβ (god-modules)** GlassTimeline 1049-line SPLIT-CANDIDATE → `ScrubberTimeline + SegmentedTimeline + ContinuousTimeline + dispatcher`: the proposed `<Slider variant="glass-scrubber">` at §4.3 is DIFFERENT substrate (atomic value-slider, not segmented timeline pkg). Both can ship at O—**naming overload at §4.6 must resolve at spec wave**.
- **Rγ (encapsulation)** `useAurora` missing `UseAuroraReturn`; `useDarkModeSync` returns void. Zero Aurora consumers + zero `useDarkModeSync` consumers in fourier-analysis. **No impact.**
- **Rδ (DI patterns)** module-level singletons (`gateRegistry`, sortable `instances`, typewriter timers, `toasts` ref): only `toasts` exercised here via `useToast`. Acceptable for global-toast pattern. **No action.**
- **Rε (pipeline orchestration)** library-internal scripts; fourier-analysis runs own `vue-tsc -b && vite build`. **No impact.**
- **Rζ (chronic deferrals)** entry **O-5** `<GlassScrubber>` WIRE-OR-DEFER-AT-O per spot-verification gate: **this audit IS the spot-verification.** 3 sites confirmed (§4.1); 82% recipe overlap quantified (§4.2); Option A proposed (§4.3). **Disposition: WIRE** at an O.W? substrate wave.

---

## § 7. Bidirectional drift summary (updated from N11/b)

| Drift class | N11/b count | O11/b count | Δ | Disposition |
|---|---|---|---|---|
| `0.15s ease` motion | 4 sites | ~12 sites | +8 | URGENT—tokenize `--duration-instant-plus` |
| `backdrop-filter: blur(12px)` hardcoded | 2 sites | 2 sites | 0 | Absorb into GlassScrubber `blur-track` prop |
| `rgba(0,0,0,0.1)` shadow | 1 site (GlassTimeline:118) | 1 site (unchanged) | 0 | UNCHANGED; `--shadow-xs-dark` token candidate |
| `.fira-code` utility | 2 sites | 6 sites (now in convergence + ConvergencePlot + EquationModeToggle + SpeedSelect + paper-overrides) | +4 | `.text-mono-sm` semantic class candidate URGENT |
| Direct `reka-ui` imports | 0 (claimed) | 1 (`EquationView.vue:8` HoverCard*) | +1 | CONSUMER FIX—one-line rename |
| `.glass-track` triplicate | 3 sites (80% overlap) | 3 sites (82% overlap rg-verified) | 0 | **HEADLINE—GlassScrubber Option A** |
| Shadow-copy re-emergence | 0 | 0 | 0 | CLEAN (M.W1 invariant holds) |
| Aurora/metaball/paper-backdrop consumption | 0 | 0 | 0 | F1-throw: no impact |
| Unwired substrate (MetricBadge, StatusDot, Skeleton, useTouchGate, useResizeObserver) | unaudited | 5 zero-consumption opportunities | NEW | Consumer-side WIRE candidates |

---

## § 8. Glass-ui gap proposals (updated)

| # | Gap | Urgency | Evidence |
|---|---|---|---|
| 1 | `--duration-instant-plus: 150ms` token | **CRITICAL** | ~12 sites; +8 since N11/b |
| 2 | `<Slider variant="glass-scrubber">` (Option A at §4.3) | **CRITICAL** | 3 sites, 10 instantiations, 82% recipe overlap |
| 3 | `.text-mono-sm` / `.code-badge` semantic class for tabular-num value display | HIGH | 6 sites (was 2) |
| 4 | `dockHeld` integration guide formalizing the dock-slider intensification contract | MEDIUM | 2 sites still missing feedback-side propagation |
| 5 | `--focus-ring-width` + `--focus-ring-color` token pair | LOW | 1 site (SliderControl:184–186) |
| 6 | `--shadow-xs-dark` / prefers-contrast shadow | LOW | 1 site (GlassTimeline.vue:121 caret-tooltip) |

---

## § 9. Closing tally

### Grade: **B+ (Stable, trending UP)**

Same grade as N11/b. Substrate-consumption discipline strong (subpath surface fully adopted, shadow-copies zeroed, Tooltip shim canonical). One regression (`reka-ui` HoverCard direct import at `EquationView.vue:8`) is consumer-side one-liner.

### Top 3 idiomatic opportunities

1. **Wire `<Slider variant="glass-scrubber">`**—consolidate GlassTimeline + SliderControl + ConvergenceTimeline (~562 → ~140 LOC; 82% recipe overlap; bar cleared at 3 sites alone).
2. **Tokenize `--duration-instant-plus: 150ms`**—motion-drift now at ~12 sites and accelerating.
3. **Fix `EquationView.vue:8` reka-ui drift**—one-line consumer rename to `@mkbabb/glass-ui` HoverCard.

### Glass-ui-side O.W? wave inputs

- **O.W?-glass-scrubber-variant**—add `variant="glass-scrubber"` to `<Slider>`; co-export `caretLabel` + `trackColor` + `blurTrack` props; document the dock-keepOpen contract on the glass-scrubber path.
- **O.W?-tokens-duration-instant-plus**—add `--duration-instant-plus: 150ms` to `tokens.css §1`; document utility recipes in `utilities.css`.
- **Coordinate naming overload with Rβ GlassTimeline decompose**—`<GlassTimeline variant="scrubber">` renamed to `variant="timeline-scrubber"` or `variant="segmented-scrubber"` before the new `<Slider variant="glass-scrubber">` ships.

### Consumer-side fix list (independent O.W? consumer wave)

1. `EquationView.vue:8` reka-ui → @mkbabb/glass-ui HoverCard
2. Migrate 3 scrubber sites to `<Slider variant="glass-scrubber">` (after library-side wave lands)
3. Wire `MetricBadge`, `StatusDot`, `Skeleton`, `useTouchGate`, `useResizeObserver` at the 4-5 identified opportunities

---

## § Verification

- **Read commands used:** Read for GlassTimeline / SliderControl / ConvergenceTimeline / AnimationControls / MorphPhaseConfig + research-deliverable Rγ + N11/b prior audit + O findings/dispatch
- **rg invocations:** import-surface inventory, scrubber-consumer enumeration, motion-drift count, reka-ui leak check, shadow-copy zero-state, Aurora/metaball/paper-backdrop usage, custom-primitive zero-consumption check, fira-code count
- **git invocations (read-only):** `git log --oneline -20`, `git status --short` (working-tree digest)
- **Worktree diff verification:** this lane is read-only—no diff

---

## § Open questions for orchestrator

1. **Naming overload resolution**—when Rβ GlassTimeline decompose lands, does `<GlassTimeline variant="scrubber">` rename to `variant="timeline-scrubber"` first, or does the new `<Slider variant="glass-scrubber">` ship under a different name? Recommend orchestrator authority decides at wave-spec author.
2. **`blurTrack` prop default**—Option A proposes `blur-track` as opt-in (default false). The cheaper-default matches dock blur policy. Confirm.
3. **F1 Aurora throw at fourier-analysis**—Aurora is unused here; should F1 (Aurora throw / cost-tier reduction) audit re-scope to repos that DO consume Aurora (speedtest, ai/web TBD)? Recommend cross-repo audit at O round-2 consumer wave.

---

**End of audit:** 2026-05-14 | O11 Lane b—fourier-analysis/web HEAD `301a95e` + working-tree delta | glass-ui post-N substrate (v1.1.4 at `37288e0`)
