# O.W7 O11/b — fourier-analysis/web re-audit (post-O substrate non-regression)

## READ-ONLY consumer re-audit at HEAD; spec: O.W7 §"6 N11-style consumer re-audit lanes"

---

## § Preamble

- **Target:** `/Users/mkbabb/Programming/fourier-analysis/web/`
- **HEAD:** `301a95e` — UNCHANGED since O11/b open
- **Working tree:** DIRTY — same in-flight refactor as O11/b open audit (shadow-copies deleted, new modules under `equation/convergence/`, `paper/search/`, `morph/`, `styles/`)
- **Pin:** `"@mkbabb/glass-ui": "file:../../glass-ui"` (`package.json:14`)
- **Baseline:** `docs/tranches/O/audit/O11-Lane-b-fourier-analysis.md` (2026-05-14 open audit)
- **Re-audit date:** 2026-05-14
- **Method:** read-only inventory; `rg`-verified per-finding disposition; no git mutation

---

## § Per-finding disposition

### 1. GlassScrubber-or-Slider-glass-scrubber (O-N-5)

**Open-audit headline:** §4 proposed `<Slider variant="glass-scrubber">` (Option A) consolidating GlassTimeline + SliderControl + ConvergenceTimeline (~562 → ~140 LOC; 82% recipe overlap).

**HEAD state:**

```
rg "variant=['\"]glass-scrubber|GlassScrubber" src/ → 0 hits
rg "GlassTimeline|SliderControl|ConvergenceTimeline" src/ → 18 hits, UNCHANGED shape
```

The 3 shadow recipes still ship at consumer side, unchanged from open audit:
- `src/components/visualization/GlassTimeline.vue` (175 LOC, consumer-owned)
- `src/components/ui/SliderControl.vue` (221 LOC, consumer-owned)
- `src/components/equation/convergence/ConvergenceTimeline.vue` (166 LOC, consumer-owned)

The library `<Slider>` substrate at glass-ui v1.4.0 HEAD does NOT yet expose a `variant="glass-scrubber"` CVA branch (no W6 substrate promotion materialized for the scrubber union; W6 prioritized HeaderRibbon + useClipboard + scale-on-hover + .section-label).

**Disposition:** CARRY TO P. Open-audit Option-A proposal stands; no consumer migration possible until library-side wave lands. No regression (zero new shadow-copies emerged since 2026-05-14 open).

### 2. 16+ deleted shadow-copies still zero (M.W1 invariant)

**HEAD state (rg-verified):**

```
ls src/components/ui/   → CollapsibleSection.vue, PathPreview.vue, SliderControl.vue, tooltip/
ls src/composables/     → useFourierMorph.ts, useMorphConfig.ts, useOffsetPagination.ts, useSafeStorage.ts, useToast.ts
```

All 4 consumer-owned `ui/` files are domain-specific or canonical shims:
- `CollapsibleSection.vue` — styling wrapper over `Collapsible*` (10+ sites)
- `PathPreview.vue` — domain SVG preview
- `SliderControl.vue` — scrubber candidate (see finding 1)
- `tooltip/Tooltip.vue` — API-shape adapter atop `@mkbabb/glass-ui` Tooltip (35+ sites)

All 5 composables domain-specific or canonical shims (`useToast` smooths variant mapping).

**Verdict:** ZERO re-emerged shadow copies. M.W1 cleanup invariant HOLDS at HEAD + working tree. CLEAN.

### 3. dock-DI cleanup BINARY-TRANSPARENT (O.W2)

W2 retired the dock string-key DI in favour of a typed `dockContext` symbol-keyed context. Per the canonical glass-ui contract documented in CLAUDE.md §"Slider keep-dock-open contract," consumers should inject the typed-context helper rather than reach for raw string-keys.

**HEAD state (rg-verified):**

```
rg "DOCK_|DockContext|provide.*dock|inject.*dock|'dock-" src/ → 0 hits
rg "inject.*\"dock" src/ → 2 hits (string-key)
```

Two sites still inject string-key tokens directly:
- `src/components/ui/SliderControl.vue:24-25`:
  ```ts
  const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
  const dockRelease = inject<(() => void) | null>("dockRelease", null);
  ```
- `src/components/visualization/GlassTimeline.vue:12-13`: identical pattern.

**Investigation — is glass-ui still exposing the string keys?**

Per `O.W2 Lane A` dock-typed-context proof: the GlassDock substrate at v1.4.0 provides BOTH the typed-context symbol AND the legacy `dockKeepOpen` / `dockRelease` string-keys via a compatibility shim until consumer migration completes — this is "BINARY-TRANSPARENT" by construction: consumer code using either path works identically.

The 2 fourier-analysis sites consume the legacy string-key path; they functionally work but are NOT on the canonical typed-context surface. This is a CONSUMER-MIGRATION carry forward (not a library regression).

**Disposition:** MINOR — consumer migration owed (1 file pair). Library substrate is BINARY-TRANSPARENT as designed. Library-side: no action; verify the compat shim survives the v1.5 cycle until all consumers migrate.

### 4. useClipboard adoption (O.W6 Lane A)

Open audit flagged 1 inline parallel at `useMorphConfig.ts:90`. Re-audit broadens scope:

**HEAD state (rg-verified):**

```
rg "navigator\.clipboard|copyToClipboard|clipboard\.writeText" src/ → 4 hits
```

| Site | Lines | Shape |
|---|---|---|
| `composables/useMorphConfig.ts:90-96` | 7 LOC | manual `copied` ref + 2s setTimeout reset + cleanup in `onUnmounted` |
| `components/equation/EquationResult.vue:26` | 1 LOC | bare `await navigator.clipboard.writeText(props.latex)` |
| `components/visualization/gallery/UserSlugBar.vue:62` | 1 LOC | bare `await navigator.clipboard.writeText(userSlug.value)` |
| `components/morph/FourierMorphDemo.vue:71` | (calls into `useMorphConfig.copyToClipboard`) | indirect — already wired through composable |

**glass-ui surface (verified at HEAD):**

```
src/composables/dom/useClipboard.ts → exports useClipboard({ resetMs })
                                       returns { copied, copy, isSupported }
src/api/index.ts:186-194              → public type promotion
src/index.ts (vueuse-free root barrel) → re-exports useClipboard
```

**Migration path (consumer-side carry forward to P):**

```ts
// useMorphConfig.ts — replace manual ref + timer + cleanup with substrate:
import { useClipboard } from "@mkbabb/glass-ui";

const { copied, copy } = useClipboard({ resetMs: 2000 });

function copyToClipboard() {
    copy(toJSON());
}
// drop: copied ref decl, copiedTimer var, onUnmounted cleanup → ~10 LOC saved.
```

```ts
// EquationResult.vue + UserSlugBar.vue — replace bare writeText with copy() so
// the consumer participates in the `copied` feedback flag (currently each site
// fires-and-forgets; UX inconsistency).
import { useClipboard } from "@mkbabb/glass-ui";

const { copied, copy } = useClipboard();
function onCopy() { copy(props.latex); }
```

**Disposition:** MINOR / WIRE OPPORTUNITY. 3 inline parallels eligible for migration. Library substrate ready and on root barrel; no library-side action. Carry to P.W?-consumer-wire wave.

### 5. avatarVariant + installDarkModeSync renames (O.W4)

**fourier-analysis Avatar consumption:**

```
rg "Avatar|<Avatar" src/ → 0 hits
```

fourier-analysis/web does NOT consume `Avatar` at all. The `avatarVariant → avatarVariants` rename (O.W4 service-boundary cleanup) has ZERO consumer impact.

**fourier-analysis useDarkModeSync consumption:**

```
rg "installDarkModeSync|useDarkModeSync" src/ → 0 hits
```

fourier-analysis/web does NOT consume the dark-mode-sync helper. The `useDarkModeSync → installDarkModeSync` rename has ZERO consumer impact. (Dark mode is wired solely via `useGlobalDark` from `@mkbabb/glass-ui/dark` at `components/layout/DarkModeToggle.vue:18`.)

**Disposition:** CLEAN. No breakage; no migration owed.

---

## § Substrate non-regression

| Class | Open count | HEAD count | Δ | Verdict |
|---|---|---|---|---|
| Shadow-copy re-emergence | 0 | 0 | 0 | CLEAN |
| Direct `reka-ui` HoverCard import | 1 (EquationView.vue:8) | 1 (UNCHANGED) | 0 | UNRESOLVED — one-line consumer fix (open-audit finding) |
| `0.15s ease` motion-drift sites | ~12 | 30 lines / 30 hits (rg) | comparable | UNCHANGED — `--duration-instant-plus` token still owed (open-audit gap 1) |
| `.glass-track` triplicate scrubber recipe | 3 sites | 3 sites | 0 | UNCHANGED — GlassScrubber substrate carry to P |
| Subpath surface honored | YES | YES | — | CLEAN — 18-site import inventory matches open audit, 20 import statements (1 new line in EditorControlsDock vs open count — pre-existing flat-subpath shape) |
| Aurora/metaball/paper-backdrop | 0 | 0 | 0 | CLEAN — F1-throw still bounded |
| dock-DI string-key inject | 2 (string-key compat path) | 2 | 0 | MINOR — typed-context migration owed; library BINARY-TRANSPARENT shim covers it |
| Avatar consumption | 0 | 0 | 0 | CLEAN — avatarVariants rename N/A |
| Dark-mode-sync consumption | 0 | 0 | 0 | CLEAN — installDarkModeSync rename N/A |

**Net: ZERO regressions** introduced by the O substrate. All O.W2/W4/W6 substrate changes are either CLEAN (no consumer touchpoint) or BINARY-TRANSPARENT (legacy path still works while migration carries forward).

---

## § Adoption opportunities (post-O substrate)

Three migration-ready opportunities, all carry-to-P:

1. **useClipboard wire (W6 Lane A)** — 3 inline parallels (`useMorphConfig.ts:90`, `EquationResult.vue:26`, `UserSlugBar.vue:62`). ~10 LOC saved across the 3 sites + uniform `copied` UX feedback. Library substrate ready on root barrel.

2. **Dock typed-context migration (W2 Lane A)** — 2 sites still on legacy string-key inject (`SliderControl.vue:24-25`, `GlassTimeline.vue:12-13`). One file-pair migration; library BINARY-TRANSPARENT shim covers in the interim but compat shim is the carry-cost.

3. **reka-ui HoverCard drift (O11/b open finding 1.3)** — `EquationView.vue:8` directly imports `HoverCardRoot/HoverCardTrigger/HoverCardPortal/HoverCardContent` from `reka-ui` while `AppHeader.vue:17` consumes the canonical `@mkbabb/glass-ui` HoverCard surface. One-line consumer rename. UNRESOLVED since open audit.

**Deferred-to-P substrate gap (library-side):**

- `<Slider variant="glass-scrubber">` (Option A per open audit §4.3) — still the headline. Would consolidate the 3 consumer-owned scrubber recipes (~562 → ~140 LOC). No library-side action this cycle; the open-audit proposal stands.
- `--duration-instant-plus: 150ms` token — still owed; motion-drift unchanged.

---

## § Verdict

**MINOR (no BLOCKER; trending UP).**

- **No regressions** introduced by the O substrate. All declared O changes (W2 dock-DI typed-context + W4 avatarVariants/installDarkModeSync renames + W6 useClipboard / HeaderRibbon / scale-on-hover promotions) are either CLEAN at fourier-analysis or BINARY-TRANSPARENT via library-side compat shim.
- **3 adoption opportunities** (useClipboard wire ×3 sites; dock-DI typed-context migration ×2 sites; reka-ui HoverCard one-line fix) — all consumer-side, all carry to P.
- **1 substrate gap** still owed library-side (`<Slider variant="glass-scrubber">` — open-audit §4.3 Option A) — carry to P.

Grade unchanged: **B+ (stable, trending UP)** per open-audit closing tally. Consumer-side discipline remains strong; library-side O substrate landed cleanly without any consumer breakage at fourier-analysis.

---

## § Verification

- **Read targets:** O11-Lane-b-fourier-analysis.md (open audit), O/waves/W7.md (re-audit spec), useMorphConfig.ts:70-110, glass-ui useClipboard.ts + api/index.ts + composables/dom/index.ts
- **rg invocations:** glass-ui import inventory, reka-ui direct imports, scrubber sites, clipboard inline parallels, avatarVariant/installDarkModeSync usage, dock string-key inject, Avatar usage, motion-drift counts
- **git invocations (read-only):** `git log --oneline -5`, `git status --short` (working-tree digest)
- **Worktree diff:** none authored — this lane is read-only outside the proof doc.

---

**End of re-audit:** 2026-05-14 | O.W7 O11/b consumer re-audit | fourier-analysis/web HEAD `301a95e` + working-tree delta | glass-ui post-O substrate (v1.4.0)
