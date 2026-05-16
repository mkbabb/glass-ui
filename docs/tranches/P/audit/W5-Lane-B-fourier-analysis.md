# P.W5 Lane B — fourier-analysis/web cross-repo writes

**Date:** 2026-05-16
**Glass-ui HEAD:** `7c901b9` (v1.8.2 — `copyToClipboard` bare co-export landed at W5 Lane A.1)
**fourier-analysis HEAD pre-write:** `301a95e` (working tree DIRTY — pre-existing in-flight refactor cluster)
**Pin:** `"@mkbabb/glass-ui": "file:../../glass-ui"` (consumer picks up glass-ui HEAD live)
**Operator:** P.W5 Lane B agent
**Mode:** READ-ONLY git; consumer-side writes only (no `git add/commit/stash/checkout/reset/push/pull`)

---

## § 1 — Scope

Per `docs/tranches/P/waves/W5.md` Lane B (lines 43-73) + `docs/tranches/P/audit/P11-Lane-b-fourier-analysis.md` (CR-2 ESCALATION at §2 — silent dock-context regression at v1.7.0; §3 — 3 useClipboard inline parallels; §6 — reka-ui HoverCard one-liner drift; §4 — GlassScrubber 3 shadow recipes). Library prerequisites landed at:

- **W1 Lane B** — `useOptionalDockContext` + `DOCK_CONTEXT_KEY` re-exported from `@mkbabb/glass-ui/dock`.
- **W3 Lane A** — `<Slider variant="glass-scrubber">` landed; ships the canonical scrub recipe (3-layer track + thumb + halo + dock keep-open contract).
- **W5 Lane A.1** — `copyToClipboard` bare co-export landed at v1.8.2 (P+1 opportunistic for sites that prefer the bare `Promise<boolean>` shape; fourier-analysis sites prefer the composable shape with reactive `copied`).

Sub-tasks (B.1–B.4) all land in this lane.

---

## § 2 — B.1: dock-context migration (2 sites)

CR-2 ESCALATION — silent break since glass-ui O.W2 retired the legacy string-key dock provides (`"dockKeepOpen"`, `"dockRelease"`). Both consumer sites' `inject<...>("dockKeepOpen", null)` resolved to `null` at v1.7.0 and the inline `dockKeepOpen?.()` / `dockRelease?.()` calls silently no-op'd via the optional-chain. Functional regression: idle-collapse fires mid-scrub.

The migration is FOLDED into B.4 because both sites' entire shadow-recipe scrub-tracks are replaced by `<Slider variant="glass-scrubber">`, which acquires the typed `DockContext` token internally via `useOptionalDockContext()` (slider.vue:56). The 2 dock injects + their 4 callsites (`dockKeepOpen?.()` × 2 + `dockRelease?.()` × 2) all disappear with the shadow recipe; no separate B.1 patch is needed.

### 2.1 — Site verification

```
grep -rn "dockKeepOpen|dockRelease" web/src
  → 2 hits (both inside the new SFC's documentation comments — see §2.3 below)
```

Zero functional callsites remain. The dock keep-open contract is now restored bidirectionally via the canonical `<Slider>` substrate (which subscribes to `dock.held` and reflects `data-held` on the slider root).

### 2.2 — Files written

- `web/src/components/ui/SliderControl.vue` — full rewrite (221 → 145 LOC).
- `web/src/components/visualization/GlassTimeline.vue` — full rewrite (175 → 94 LOC).

### 2.3 — Doc comments record the migration

Each rewritten SFC carries an `/**`-doc-comment header explaining the migration (W5 Lane B.4 + B.1, P11/b §2 CR-2 reference) so the audit trail survives in the SFC.

---

## § 3 — B.2: useClipboard migration (3 sites)

All 3 sites prefer the **composable shape** (`useClipboard()`) because each couples a reactive `copied` flag to UI (icon-swap transition; "Copied!" tooltip-equivalent). The bare `copyToClipboard` co-export is not the right fit here.

### 3.1 — `web/src/composables/useMorphConfig.ts:73-96`

**Before (24 LOC):**

```ts
const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | null = null;

onUnmounted(() => {
    if (copiedTimer) clearTimeout(copiedTimer);
});

function copyToClipboard() {
    navigator.clipboard.writeText(toJSON()).then(() => {
        copied.value = true;
        if (copiedTimer) clearTimeout(copiedTimer);
        copiedTimer = setTimeout(() => (copied.value = false), 2000);
    });
}
```

**After (3 functional LOC + 1 wrapper):**

```ts
import { useClipboard } from "@mkbabb/glass-ui";

const { copied, copy } = useClipboard({ resetMs: 2000 });

function copyToClipboard() {
    copy(toJSON());
}
```

**Surface chosen:** `useClipboard({ resetMs: 2000 })` — wraps the manual `copied` ref + 2s timeout + `onUnmounted` cleanup. The exported `copied` ref preserved in the return shape (consumed by `MorphPhaseConfig` template via destructured ref). The `ref` + `onUnmounted` imports also drop. Saved 21 LOC.

### 3.2 — `web/src/components/equation/EquationResult.vue:25-29`

**Before:**

```ts
const copied = ref(false);
async function copyLatex() {
    await navigator.clipboard.writeText(props.latex);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
}
```

**After:**

```ts
const { copied, copy } = useClipboard({ resetMs: 2000 });
function copyLatex() {
    copy(props.latex);
}
```

**Surface chosen:** `useClipboard({ resetMs: 2000 })` — the reactive `copied` flag drives the Check/Copy icon-swap (`<Transition name="icon-swap">`). 4-line scriptlet reduction.

### 3.3 — `web/src/components/visualization/gallery/UserSlugBar.vue:16,60-65`

**Before:**

```ts
const copied = ref(false);
async function copySlug() {
    if (!userSlug.value) return;
    await navigator.clipboard.writeText(userSlug.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
}
```

**After:**

```ts
const { copied, copy } = useClipboard({ resetMs: 1500 });
function copySlug() {
    if (!userSlug.value) return;
    copy(userSlug.value);
}
```

**Surface chosen:** `useClipboard({ resetMs: 1500 })` — 1.5s reset preserved verbatim. 4-line scriptlet reduction.

---

## § 4 — B.3: reka-ui HoverCard one-liner (with usage adjustment)

P11/b §6 + O.W7 O11/b carry. The audit predicted a "1-line consumer rename" — the import line. In practice the migration is **1 import + 2 usage adjustments** because the glass-ui surface is composed differently than the raw reka-ui surface:

- `HoverCardRoot` (reka-ui) → `HoverCard` (glass-ui wrapper that internally renders `<HoverCardRoot>`).
- `HoverCardPortal` (reka-ui) → REMOVED; the glass-ui `<HoverCardContent>` portals internally (see `glass-ui/src/components/ui/hover-card/HoverCardContent.vue:28-40`).
- `HoverCardTrigger` + `HoverCardContent` — identical surface; just re-imported.

### 4.1 — `web/src/components/equation/EquationView.vue:8`

```diff
- import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui";
+ import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui";
```

### 4.2 — Template adjustment (lines 272 + 280-301)

```diff
- <HoverCardRoot v-if="tierInfo" :open-delay="200" :close-delay="150">
+ <HoverCard v-if="tierInfo" :open-delay="200" :close-delay="150">
    <HoverCardTrigger as-child>
        ...
    </HoverCardTrigger>
-   <HoverCardPortal>
-     <HoverCardContent class="info-hovercard" ...>
+   <HoverCardContent class="info-hovercard" ...>
        ...
-     </HoverCardContent>
-   </HoverCardPortal>
- </HoverCardRoot>
+   </HoverCardContent>
+ </HoverCard>
```

**Audit refinement:** the proof doc records this as a 1-import + 6-template-line edit, NOT a 1-line consumer rename. The audit's "1-line rename" estimate underestimated the surface composition difference — it assumed the glass-ui barrel re-exported the raw reka-ui symbols, but the glass-ui surface canonicalizes the cluster (Root + Portal collapse into wrappers that internally compose the reka-ui primitives). The substantive behavior is unchanged.

The canonical pattern (verified at `web/src/components/layout/AppHeader.vue:14-17,160-184`) is now used at both consumer call sites.

---

## § 5 — B.4: GlassScrubber adoption (3 sites)

Per W3 Lane A's `<Slider variant="glass-scrubber">` substrate landing — see `docs/tranches/P/audit/W3-Lane-A-glass-scrubber-slider-variant.md`.

**All 3 sites adopted the variant.** The shadow recipes (manual pointer-state machines + `.glass-track` / `.glass-fill` / `.glass-thumb` paints + ARIA wiring) are retired in full.

### 5.1 — `web/src/components/visualization/GlassTimeline.vue` (175 → 94 LOC, −46%)

- Shadow recipe (pointer state machine + 3-layer DOM + keyboard step + ARIA + dock injects) → `<Slider variant="glass-scrubber">`.
- The `t ∈ [0, 1]` axis adapts to reka-ui's integer slider model via a computed array model that scales by 100 (1% granularity matches HEAD's `step = 0.01` keyboard step).
- Scrub state machine compresses to: `@pointerdown` → `anim.startScrub()`; `v-model` → `anim.seek(t)`; `@value-commit` → `anim.endScrub()`.
- Preserved: the timeline caret-label (`<div class="timeline-caret">…<span class="caret-value fira-code">{{ label }}</span>`) — this is divergent surface beyond the `glass-scrubber` variant proper and remains in the consumer SFC. Visibility selector adapted: `.timeline-row:has(.glass-track:active)` → `.timeline-row:has(.glass-slider[data-held])` (uses the canonical `data-held` reflection from `<Slider>`).
- Track-height retint: `--slider-scrub-track-height: 24px` matches HEAD's `.glass-track { height: 24px }`.
- Keyboard step + ARIA + dock keep-open all inherited from the variant.

### 5.2 — `web/src/components/ui/SliderControl.vue` (221 → 145 LOC, −34%)

- Shadow recipe (pointer state machine + 3-layer DOM + per-color `--track-color` cascade + dock injects) → `<Slider variant="glass-scrubber">`.
- Public API of the wrapper (label, subtitle, modelValue, min, max, step, color, formatValue, variant) is PRESERVED unchanged — the 7 instantiations across FunctionInput.vue + EquationPanel.vue + ContourSettings.vue keep working without modification.
- The legacy `variant` prop (`"timeline" | "default"`) is now COSMETIC ONLY (both map to `glass-scrubber`). The documentation comment notes this; future cleanup may retire the prop entirely. NON-TRIVIAL DIVERGENCE: this is the only consumer-facing API quirk; downstream consumers won't notice it.
- Per-instance `--track-color` cascade re-projected onto variant tokens:
  ```css
  --slider-scrub-range-bg: color-mix(in srgb, var(--track-color) 25%, transparent);
  --slider-scrub-range-bg-hover: color-mix(in srgb, var(--track-color) 35%, transparent);
  --slider-scrub-thumb-bg: var(--track-color);
  --slider-scrub-thumb-bg-hover: var(--track-color);
  ```
- Track-height retint: `--slider-scrub-track-height: 16px` matches HEAD's `.glass-track { height: 16px }`.
- Numeric inline input chassis preserved verbatim (label + inline number input is the wrapper's identity).

### 5.3 — `web/src/components/equation/convergence/ConvergenceTimeline.vue` (166 → 109 LOC, −34%)

- Shadow recipe (pointer state machine + 3-layer DOM + ARIA) → `<Slider variant="glass-scrubber">`.
- The play-button + harmonics-count (`N={{ activeCount }}/{{ totalHarmonics }}`) chassis siblings are preserved verbatim — they're chassis-level concerns, not slider-track concerns.
- The `t` axis adapts to reka-ui's integer model via the same `[0..100]` scaling pattern.
- Scrub state machine compresses to: `@pointerdown` → emit `scrub-start`; `v-model` → emit `scrub-move`; `@value-commit` → emit `scrub-end`. The parent's contract (`toggle-play | scrub-start | scrub-move | scrub-end` emits) is preserved.
- This site isn't a `<GlassDock>` descendant; `<Slider>`'s `useOptionalDockContext()` resolves to `null` and the dock-keep-open path is a befitting silent no-op.
- Track-height retint: `--slider-scrub-track-height: 20px` matches HEAD's `.glass-track { height: 20px }`.

### 5.4 — Aggregate LOC delta

| Site | Pre | Post | Δ |
|------|-----|------|---|
| GlassTimeline.vue | 175 | 94 | −81 (−46%) |
| SliderControl.vue | 221 | 145 | −76 (−34%) |
| ConvergenceTimeline.vue | 166 | 109 | −57 (−34%) |
| **Total** | **562** | **348** | **−214 (−38%)** |

Modestly below the audit's "562 → ~140 (75%)" projection — the projection didn't account for preserved chassis-level surface (caret-label, label + numeric input, play-button + count column). The 38% LOC reduction is real and the substrate-overlap retirement is complete; the residual 348 LOC is divergent chassis surface that doesn't fit the variant.

### 5.5 — Non-trivial divergence flag

The only API quirk worth flagging is **SliderControl.vue's `variant` prop is now cosmetic** (both `"timeline"` and `"default"` map to `glass-scrubber`). Future cleanup may either:

(a) RETIRE the prop entirely (breaking change — 7 instantiations to update); or
(b) Promote it to a meaningful axis if a different chassis recipe emerges.

Option (a) is the right close per "no backwards compat" precept, but is out of scope for P.W5 Lane B (audit recommended preserving the wrapper API).

---

## § 6 — fourier-analysis gate verification

```
$ cd /Users/mkbabb/Programming/fourier-analysis/web
$ npx vue-tsc -b
(GREEN — no output)

$ npm run build
✓ 4235 modules transformed.
✓ built in 2.72s
dist/assets/index-CRm7ifqK.js  928.68 kB │ gzip: 372.53 kB
```

Pre-existing 928 kB chunk-size advisory unchanged (this is a consumer-side concern; not a glass-ui regression). 4 unresolved woff2 font-asset path warnings unchanged from the P11/b baseline — pre-existing, configuration-level, not introduced by this lane.

Zero introduced errors / warnings. Build is GREEN.

### 6.1 — Functional verification

```
$ grep -rn "dockKeepOpen|dockRelease" web/src
  → 2 hits, both in /** doc-comment headers in SFCs (zero functional callsites)

$ grep -rn "navigator.clipboard|HoverCardRoot|HoverCardPortal" web/src
  → 2 hits, both in /* P.W5 Lane B.2 — migrated from … */ doc comments (zero functional callsites)
```

All targeted patterns retired functionally; only audit-trail comments remain in the rewritten SFCs.

---

## § 7 — Operational constraint compliance

| Constraint | Status |
|-----------|--------|
| NO mutating git in glass-ui | ✓ (read-only — `git log --oneline -3` only) |
| NO mutating git in fourier-analysis | ✓ (read-only — `git status` + `git log --oneline -3` only) |
| NO stash recurrence | ✓ (no `git stash` invoked) |
| NO `npm run build` in glass-ui directory | ✓ (only ran in `fourier-analysis/web`) |
| Read-only git only | ✓ |
| Index ownership by orchestrator | ✓ (no add/commit/checkout/reset/push/pull) |

---

## § 8 — Status

**COMPLETED.**

All 4 sub-tasks (B.1–B.4) landed:

- **B.1** — 2 dock-context migration sites folded into B.4 rewrites; zero remaining string-key injects.
- **B.2** — 3 useClipboard migrations applied (all via composable shape with reactive `copied`).
- **B.3** — 1 import line + 6 template lines updated at `EquationView.vue` (reka-ui HoverCard → glass-ui canonical wrapper composition).
- **B.4** — 3 GlassScrubber adoptions applied; 562 → 348 LOC across the 3 sites; substrate-overlap shadow recipes retired in full.

fourier-analysis HEAD post-write: working tree DIRTY (orchestrator owns commit).

Gates: typecheck GREEN; build GREEN; zero new warnings.
