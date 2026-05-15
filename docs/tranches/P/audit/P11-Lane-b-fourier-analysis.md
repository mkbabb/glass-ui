# P11 Consumer-Audit Lane b — fourier-analysis/web (P round-2 deep audit)

## READ-ONLY post-AB+1 consumer re-audit at glass-ui v1.7.0 HEAD

---

## § Preamble

- **Target:** `/Users/mkbabb/Programming/fourier-analysis/web/`
- **Reference:** glass-ui v1.7.0 (HEAD `b201b03` — package.json bumped, NOT YET TAGGED per P-AB1-tag)
- **Pin:** `"@mkbabb/glass-ui": "file:../../glass-ui"` (`web/package.json:14`) — picks up HEAD live
- **Consumer HEAD:** `301a95e` — UNCHANGED since N11/b + O11/b + W7 rerun
- **Working tree:** DIRTY — same in-flight refactor cluster (api/, docker, scripts, App.vue, index.html, src/...)
- **Baselines:** `docs/tranches/O/audit/O11-Lane-b-fourier-analysis.md` (open), `docs/tranches/O/audit/W7-O11b-fourier-analysis-rerun.md` (rerun)
- **Audit date:** 2026-05-14
- **Method:** read-only inventory, `rg`-verified per-finding, `npm run build` executed, no git mutation

---

## § 1. Build verification at glass-ui v1.7.0

**Command:** `cd web && npm run build`

**Result:** GREEN — `vue-tsc -b && vite build` completes; `✓ 4806 modules transformed`; built in 5.36s; chunked output written to `dist/`.

Notable:
- 4 woff2 font-asset path warnings from glass-ui's OFL self-host subsystem (v1.5.0 AB+1 cohort) — `../fonts/{plus-jakarta-sans,fira-code}/*.woff2` left unresolved to be served at runtime. **Not a blocker** — consumer-side configuration matter (the dev `file:` pin walks out of `web/` into `glass-ui/` and the relative path in the bundled CSS references the source location). The fonts work at runtime because the asset is served from the vite dev/preview stack rooted at `web/`.
- 1 chunk-size advisory (`index-*.js` at 927.94kB) — pre-existing, not a glass-ui v1.7.0 regression.

**Non-regression verdict:** glass-ui v1.5.0 → v1.7.0 substrate cohort (font self-host, MetricCell/MetricRow/MetricStack/AnimatedDigit/ResponsiveTabs, `--phase-color-label` cascade, timeline a11y fix, ToggleGroupItem card variant) introduces ZERO build breakage at fourier-analysis. typecheck + bundle both clean.

---

## § 2. CR-2 dock string-key inject — REGRESSION (silent break)

**O11/b W7-rerun baseline:** 2 sites still on legacy string-key inject — `SliderControl.vue:24-25` + `GlassTimeline.vue:12-13`. The rerun verdict was MINOR because glass-ui's GlassDock was alleged to provide a "BINARY-TRANSPARENT" compat shim that re-exposed `dockKeepOpen` / `dockRelease` under the legacy string-keys until consumers migrated.

**Re-verified at glass-ui v1.7.0 HEAD:**

```
rg "dockKeepOpen|dockRelease" src/components/custom/dock/ → 2 hits (docstring only)
src/components/custom/dock/GlassDock.vue:112  (comment)
src/components/custom/dock/composables/dockContext.ts:11  (comment)

rg "provide.*dockKeepOpen|provide\(.dock" src/components/custom/dock/ → 0 hits
```

**The legacy string-key compat shim DOES NOT EXIST at v1.7.0.** GlassDock provides only the typed `DOCK_CONTEXT_KEY` symbol (per `O.W2` canonical typed-key + helper-pair shape, invariant 25). The legacy provides retired at O.W2; the only surviving artefact is the inline comment listing the 6 retired string-keys.

**Consequence at fourier-analysis HEAD `301a95e`:**

- `SliderControl.vue:24-25` — `inject<...>("dockKeepOpen", null)` resolves to `null`. Inline calls `dockKeepOpen?.()` at line 55 and `dockRelease?.()` at line 66 silently no-op via the optional-chain.
- `GlassTimeline.vue:12-13` — identical pattern; line 27 + 40 silently no-op.

**Functional impact:** the slider+timeline scrubber gestures no longer acquire a keep-open token on the parent `<GlassDock>`. The dock will idle-collapse mid-scrub if the user pauses on the track. Bidirectional `dockHeld` data-attribute reflection (thumb-halo intensification) also dead.

**Severity escalation:** O11/b W7-rerun classified this MINOR under the false premise of a compat shim. The actual classification at v1.7.0 is **FUNCTIONAL REGRESSION (silent)** — the keepDockOpen contract is broken at every scrub gesture.

### 2.1 Concrete migration path — typed-context

The library publishes `useOptionalDockContext()` at `src/components/custom/dock/composables/dockContext.ts`, but it is NOT re-exported from the `@mkbabb/glass-ui/dock` flat subpath. The current dock subpath barrel exports only `GlassDock`, `DockLayer*`, `DockIconButton`, `DockTabButton`, `DockSelectTrigger`, `DockDropdownTrigger`, plus `UseDockStateOptions` + `DockState` types.

Two paths forward:

**Path A (PREFERRED) — library-side: extend `@mkbabb/glass-ui/dock` subpath to re-export `useOptionalDockContext` (+ `useDockContext`, `DOCK_CONTEXT_KEY`, `DockContext` type).** One-line addition to `src/components/custom/dock/index.ts`. Then fourier-analysis migrates:

```ts
// SliderControl.vue + GlassTimeline.vue
import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";

const dock = useOptionalDockContext();

// in onTrackDown:
dock?.keepOpen();

// in onTrackUp:
dock?.release();
```

Replaces lines 24-25 + 55 + 66 in SliderControl, lines 12-13 + 27 + 40 in GlassTimeline. ~6 LOC saved per site (~12 LOC across 2 sites) + restores keepDockOpen contract.

**Path B — consumer-owned typed-key:** publish the `DOCK_CONTEXT_KEY` Symbol via library API discovery layer (`@mkbabb/glass-ui/api`) and have consumers manually `inject(DOCK_CONTEXT_KEY)`. Rejected — duplicates the helper-pair semantics; loses the typed null-safety of `useOptionalDockContext()`.

**Disposition:** library-side P-wave write — add `export { useOptionalDockContext, useDockContext, DOCK_CONTEXT_KEY, type DockContext, type DockOrientation } from "./composables";` to `src/components/custom/dock/index.ts`, then consumer P-wave write to migrate the 2 fourier-analysis sites. This closes CR-2 and restores keepDockOpen contract concomitantly.

---

## § 3. CR-2 useClipboard inline parallels — 3 sites, all PRESENT

```
rg "navigator\.clipboard|clipboard\.writeText|copyToClipboard" src/ → 6 lines (3 declaration sites + 3 call sites)

src/composables/useMorphConfig.ts:90-96       — manual `copied` ref + 2s timeout + onUnmounted cleanup
src/components/equation/EquationResult.vue:26 — bare `await navigator.clipboard.writeText(props.latex)`
src/components/visualization/gallery/UserSlugBar.vue:62 — bare `await navigator.clipboard.writeText(userSlug.value)`
```

**Library substrate verification at v1.7.0:**

```
src/composables/dom/useClipboard.ts       (W6 Lane A promotion; landed at v1.4.0)
src/composables/dom/index.ts:11           re-exports
src/composables/index.ts                  internal barrel includes dom/
src/index.ts                              vueuse-free root barrel re-exports useClipboard
src/api/index.ts:186-194                  type promotion (UseClipboardOptions + UseClipboardReturn)
```

`useClipboard` is on the root barrel `@mkbabb/glass-ui` at v1.7.0. Verified import-able.

### 3.1 Concrete migration paths

**`composables/useMorphConfig.ts:73-96`** — replace the manual `copied` ref + `copiedTimer` + `onUnmounted` cleanup:

```ts
// BEFORE (web/src/composables/useMorphConfig.ts ~lines 73-96)
const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | null = null;

function copyToClipboard() {
    navigator.clipboard.writeText(toJSON()).then(() => {
        copied.value = true;
        if (copiedTimer) clearTimeout(copiedTimer);
        copiedTimer = setTimeout(() => (copied.value = false), 2000);
    });
}

onUnmounted(() => {
    if (copiedTimer) clearTimeout(copiedTimer);
});

// AFTER
import { useClipboard } from "@mkbabb/glass-ui";

const { copied, copy } = useClipboard({ resetMs: 2000 });

function copyToClipboard() {
    copy(toJSON());
}
```

Net savings: ~10 LOC + cleanup discipline owned by the library + uniform timeout-reset semantics.

**`components/equation/EquationResult.vue:26`** — replace bare fire-and-forget `navigator.clipboard.writeText`:

```ts
// BEFORE
await navigator.clipboard.writeText(props.latex);

// AFTER
import { useClipboard } from "@mkbabb/glass-ui";
const { copied, copy } = useClipboard();
function onCopy() { copy(props.latex); }
```

UX upgrade: site now participates in the `copied` reactive flag — can render a "Copied!" tooltip / button-state without manual machinery.

**`components/visualization/gallery/UserSlugBar.vue:62`** — same shape as EquationResult.

**Disposition:** consumer P-wave write — 3-site migration; ~12 LOC saved; uniform `copied` feedback UX. No library-side action (substrate ready since v1.4.0).

---

## § 4. GlassScrubber (P-5) — 3 shadow recipes unchanged; substrate decision required

**State at glass-ui v1.7.0 HEAD:**

```
rg "variant=['\"]glass-scrubber|GlassScrubber" src/ (both repos) → 0 hits
rg "GlassTimeline|SliderControl|ConvergenceTimeline" web/src → 18 hits, unchanged shape
```

Consumer LOC unchanged from O11/b open audit (`wc -l`):
- `web/src/components/visualization/GlassTimeline.vue` — 175 LOC
- `web/src/components/ui/SliderControl.vue` — 221 LOC
- `web/src/components/equation/convergence/ConvergenceTimeline.vue` — 166 LOC
- **Total: 562 LOC** (with ~82% recipe overlap per O11/b §4.2 line-by-line analysis)

No new shadow-copies emerged in v1.5–v1.7 cycle. The 3 sites are STABLE consumer-owned drift.

### 4.1 Substrate landing decision (P-5 disposition)

Per P findings P5 (NO LEGACY CODE) + P7 (ZERO DEFERRAL) + L invariant 8 (substrate-without-consumer is binary) + N invariant 23 (under-wired primitives default to WIRE), the GlassScrubber substrate-proposal must close at P with EITHER:

**(A) WIRE at glass-ui** — Option-A `<Slider variant="glass-scrubber">` per O11/b §4.3:
- Extend existing `ui/slider/` package with a CVA branch + caret-label + track-color + blur-track props
- Bar cleared at 3 consumer sites in 1 repo (10 instantiations); likely additional sites in speedtest + value.js + ai/web cross-repo (verify at P round-2 cross-walk)
- Net consumer-side LOC reduction: ~562 → ~140 (75% reduction across the 3 sites)
- Naming coordinate with library `<GlassTimeline variant="scrubber">` per O11/b §4.6 — rename library variant to `variant="segmented-scrubber"` first

**(B) RETIRE-with-rationale (consumer-owned)** — formal precept document stating the GlassScrubber substrate is OUT-OF-SCOPE because the pointer-state-machine + ARIA + dock-keepOpen + 3-layer DOM is sufficiently parameterized that each consumer's domain-specific framing (playback timeline + harmonic-count scrubbing + generic value-slider with numeric chassis) requires too much divergent surface to fit a single CVA variant. Each consumer keeps its 175/221/166 LOC.

**Audit recommendation:** WIRE (Option A). Evidence at O11/b §4.2 shows:
- Pointer state machine: 100% identical (3 sites)
- `.glass-track` CSS: 85% identical
- `color-mix` substrate tokens (5%/8%/40% foreground/ring tints): 100% identical
- ARIA wiring: 100% identical

The divergent surface is bounded to 3 parameterizable axes — `caretLabel: string?`, `trackColor: string?`, `blurTrack: boolean`. All three are emit/prop axes that fit the existing `<Slider>` variant + slot mechanism cleanly. RETIRE-with-rationale would freeze 3 silent recipe drifts in a repo that already opts into the glass-ui design system at 18 import sites.

**Disposition for P:** WIRE — library-side P-wave write to add `variant="glass-scrubber"` to `<Slider>`; CVA + 3-layer DOM + caret-label transition + dock-keepOpen contract; coordinate naming overload with O11/b §4.6; consumer P-wave write to migrate 3 sites + 7 SliderControl instantiations.

---

## § 5. AB+1 primitive adoption opportunities

glass-ui v1.5.0–v1.7.0 shipped 5 new primitives under flat subpaths (per CHANGELOG cross-reference at AC.W6):

| Primitive | Subpath | Source | Adoption candidate at fourier-analysis |
|---|---|---|---|
| `MetricRow` | `/metric-stack` | v1.6.0 (`bb1f15b`) | ConvergenceTimeline `N={{ activeCount }}/{{ totalHarmonics }}` (line 73); FrequencyGraph amplitude/phase readout (lines 193-195); InfoCard hovered-component pill (line 30) |
| `MetricStack` | `/metric-stack` | v1.6.0 (`bb1f15b`) | EquationResult amplitude+phase+energy column display (line ~26 cluster); GalleryDraftsSection sortedDrafts.length + draft.imageSlug stack (lines 55+81) |
| `AnimatedDigit` | `/animated-digit` | v1.6.0 (`bb1f15b`) | AnimationControls `summary-speed` (line 69) `anim.speed×` reactive display; ConvergenceTimeline `activeCount` reactive count; FrequencyGraph amplitude/phase tabular displays |
| `MetricCell` | `/metric-cell` | v1.7.0 (`8dad58d`) | InfoCard "ε(t)" energy-label cell (line 30); EquationView `eColor`-themed component pill (line 291) |
| `ResponsiveTabs` | `/responsive-tabs` | v1.7.0 (`8dad58d`) | VisualizationView UnderlineTabs (line 176); GalleryView UnderlineTabs (line 145); EquationView UnderlineTabs (line 186) — if overflow-shrink behavior is desired on narrow viewports |

**Aggregate at consumer side:** ~9-12 adoption sites for AB+1 primitives. `rg "AnimatedDigit|MetricCell|MetricStack|MetricRow|ResponsiveTabs"` returns 0 hits at fourier-analysis — zero adoption currently.

**Per-primitive wire opportunity assessment:**

1. **AnimatedDigit (HIGH leverage)** — fourier-analysis ships ~30 `fira-code` tabular-number display sites; AnimatedDigit's interpolating digit-flip + tabular-num discipline is exactly the visual register the consumer is hand-rolling. Wire opportunities concentrated at AnimationControls / ConvergenceTimeline / FrequencyGraph / EquationView "Computing..." stamps.

2. **MetricStack + MetricRow (MEDIUM leverage)** — convergence + frequency-graph + equation-result clusters all instantiate 2-3 vertically-stacked `<span class="fira-code">…</span>` readouts. MetricStack's `as` prop (TransitionGroup support per `d813c63`) suits the reactive amplitude/phase update animation.

3. **MetricCell (LOW-MEDIUM leverage)** — InfoCard's themed-color energy-label pill (line 30) is the closest match; ~2-3 sites total.

4. **ResponsiveTabs (LOW leverage)** — the 3 UnderlineTabs sites at fourier-analysis are in spacious layouts (visualization shell, gallery, equation) without overflow pressure; consumer would need to verify narrow-viewport behavior before wiring.

**Other glass-ui substrate still un-wired at fourier-analysis (carry-over from O11/b §3 + W7-rerun):**

- `MetricBadge` + `MetricPill` (the v1.0 primitives — not the new MetricRow/Stack) — ConvergenceTimeline `N=…` count, ConvergencePlot tabular readouts
- `StatusDot` — gallery tier filter (featured/saved/normal), EquationModeToggle
- `Skeleton` — gallery card loading, paper article loading (bespoke shimmer rectangles)
- `useTouchGate` — paper/MobileFloatingToc touch-outside dismiss
- `useResizeObserver` — ConvergencePlot, ContourEditorCanvas, FourierMorphSvg

**Disposition:** consumer P-wave write — AB+1 wire cohort (3-5 sites highest leverage, AnimatedDigit-first). NOT a library-side action; this is pure consumer adoption.

---

## § 6. EquationView.vue:8 reka-ui HoverCard one-liner — UNRESOLVED

```
rg "from ['\"]reka-ui" web/src/ → 1 hit
src/components/equation/EquationView.vue:8:
  import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui";
```

UNCHANGED from O11/b open audit + W7-rerun baseline. The 4 symbols are all canonically re-exported from `@mkbabb/glass-ui` root barrel (verified at `AppHeader.vue:17` which consumes the canonical surface for the same primitive).

**Concrete migration (1-line):**

```diff
- import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui";
+ import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "@mkbabb/glass-ui";
```

**Disposition:** consumer P-wave write — 1-line rename. Drift since at least 2026-05-14 open audit; closes the "two consumers reach same primitive via two different surfaces" anti-pattern.

---

## § 7. Renames audit (avatarVariants + installDarkModeSync)

```
rg "Avatar|<Avatar|avatarVariants?|installDarkModeSync|useDarkModeSync" web/src/ → 0 hits
```

fourier-analysis/web does NOT consume `Avatar` or any dark-mode-sync helper. Both renames (O.W4 service-boundary cleanup) have ZERO consumer impact at this repo. Dark mode is wired via `useGlobalDark` from `@mkbabb/glass-ui/dark` (verified at `components/layout/DarkModeToggle.vue:18` — vueuse-bearing subpath canonical).

**Disposition:** CLEAN — no breakage, no migration owed.

---

## § 8. Substrate non-regression vs O11/b W7-rerun

| Class | W7-rerun | P11/b | Δ | Verdict |
|---|---|---|---|---|
| `npm run build` at consumer | not run | GREEN at v1.7.0 | + | CLEAN |
| Shadow-copy re-emergence | 0 | 0 | 0 | CLEAN |
| reka-ui direct HoverCard | 1 (EquationView:8) | 1 (UNCHANGED) | 0 | UNRESOLVED |
| dock string-key inject | 2 (claimed BINARY-TRANSPARENT) | 2 (silently broken; **no compat shim at v1.7.0**) | **functional regression escalation** | **MIGRATION URGENT** |
| useClipboard inline parallels | 3 | 3 (UNCHANGED) | 0 | WIRE OPPORTUNITY |
| GlassScrubber shadow recipes | 3 (562 LOC) | 3 (562 LOC UNCHANGED) | 0 | P-5 substrate decision required |
| AB+1 primitive adoption | not audited | 0 (9-12 candidate sites) | NEW | WIRE OPPORTUNITY |
| Avatar / installDarkModeSync impact | 0 / 0 | 0 / 0 | 0 | CLEAN |
| Subpath surface honored | YES | YES | — | CLEAN |
| Aurora / metaball / paper-backdrop consumption | 0 | 0 | 0 | CLEAN |

---

## § 9. P-wave cross-repo write proposals

Concrete consumer-side + library-side writes required to close fourier-analysis carry items at P:

### 9.1 Library-side (glass-ui)

1. **`/dock` subpath re-export hygiene** — add `useOptionalDockContext`, `useDockContext`, `DOCK_CONTEXT_KEY`, `DockContext` type, `DockOrientation` type to `src/components/custom/dock/index.ts` re-exports. Currently reachable only via deep import which violates flat-subpath publication discipline. (1 file, ~5 LOC; one-line block).

2. **`<Slider variant="glass-scrubber">`** (P-5 WIRE — Option A) — CVA branch + caret-label + track-color + blur-track props in `src/components/ui/slider/`. Coordinate naming overload with `<GlassTimeline variant="scrubber">` rename to `variant="segmented-scrubber"`.

### 9.2 Consumer-side (fourier-analysis/web)

1. **CR-2 dock typed-context migration** — 2 sites: `SliderControl.vue:24-25,55,66` + `GlassTimeline.vue:12-13,27,40`. Replace string-key inject with `useOptionalDockContext()` from `@mkbabb/glass-ui/dock`. Restores broken keepDockOpen contract. ~12 LOC saved across 2 files.

2. **CR-2 useClipboard wire** — 3 sites: `useMorphConfig.ts:73-96` (composable wrapper migration), `EquationResult.vue:26` (UX upgrade with `copied` flag), `UserSlugBar.vue:62` (UX upgrade). ~12 LOC saved + uniform feedback.

3. **EquationView.vue:8 reka-ui HoverCard rename** — 1-line drift fix; canonical-surface discipline.

4. **GlassScrubber consumer migration** (after library Slider variant lands) — 3 sites: GlassTimeline / SliderControl / ConvergenceTimeline. ~562 → ~140 LOC (75% reduction); 7 SliderControl instantiations across FunctionInput / EquationPanel / ContourSettings auto-migrate via the wrapper retaining its label+numeric-input chassis.

5. **AB+1 primitive wire cohort** (consumer adoption — no library-side coupling) — highest-leverage targets: AnimatedDigit at AnimationControls.vue:69 + ConvergenceTimeline.vue:73 + FrequencyGraph.vue:193-195 + EquationView.vue tabular readouts; MetricRow at convergence/frequency clusters.

### 9.3 Sequencing

1. Library-side write 9.1.1 (dock subpath re-export) — UNBLOCKS consumer write 9.2.1.
2. Library-side write 9.1.2 (Slider glass-scrubber variant) — UNBLOCKS consumer write 9.2.4.
3. Consumer writes 9.2.2 + 9.2.3 + 9.2.5 — INDEPENDENT, can land in any order.

---

## § 10. Verdict

**MINOR-with-correction (escalates from O11/b W7-rerun MINOR).**

- **Build green at v1.7.0** — no AB+1 substrate breakage.
- **CR-2 dock string-key inject** silently broken at v1.7.0 because the legacy compat shim ALLEGED at W7-rerun does NOT exist. The 2 sites no-op via optional-chain. Functional regression of the keepDockOpen contract at every scrub gesture. Concrete migration via `useOptionalDockContext()` from `@mkbabb/glass-ui/dock` (library subpath re-export prerequisite).
- **CR-2 useClipboard** — 3 inline parallels present + ready to migrate to root-barrel `useClipboard`.
- **P-5 GlassScrubber substrate** — 3 shadow recipes (562 LOC, 82% overlap) unchanged. Recommendation: **WIRE Option A** (`<Slider variant="glass-scrubber">`).
- **AB+1 adoption** — 9-12 candidate sites for AnimatedDigit / MetricRow / MetricStack / MetricCell; consumer adoption opportunity (no library coupling).
- **EquationView.vue:8 reka-ui drift** — unresolved 1-line consumer rename.
- **Renames (avatarVariants + installDarkModeSync)** — zero impact (consumer does not exercise either surface).

**Grade:** B+ trending UP only when CR-2 dock + CR-2 clipboard + P-5 land at P. Without those, the silent dock-context regression is a measurable UX cost (mid-scrub dock collapses at every interaction).

---

## § Verification

- **Read targets:** P findings.md, O11/b open audit, W7-O11b rerun, glass-ui v1.7.0 package.json, dockContext.ts, GlassDock.vue, dock barrel + composables barrel, useClipboard.ts, api/index.ts, useMorphConfig.ts:80-118, SliderControl.vue:1-90, GlassTimeline.vue:1-60, EquationView.vue:8 + HoverCard cluster
- **rg invocations:** glass-ui import surface (web/src/ 20 hits), reka-ui direct imports (1 hit), dock string-key injects (2 sites, 4 lines), clipboard inline parallels (4 hits / 3 distinct sites), avatarVariants + dark-sync (0 hits), AB+1 primitive adoption (0 hits), AB+1 candidate sites (fira-code, tabular-num clusters)
- **Build invocation:** `cd web && npm run build` — GREEN at 5.36s, 4806 modules transformed, no typecheck errors, no module-resolution errors against the v1.7.0 glass-ui surface
- **git invocations (read-only):** `git log --oneline -5` (both repos), `git status --short` (consumer working-tree DIRTY)
- **No git mutation; no worktree authored outside the proof doc.**

---

**End of audit:** 2026-05-14 | P11 Lane b — fourier-analysis/web HEAD `301a95e` + working-tree delta | glass-ui v1.7.0 HEAD `b201b03`
