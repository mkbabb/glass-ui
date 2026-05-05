# H.W1 Lane C — CVA Branch Retire Proof

**Agent**: H.W1 Lane C.
**Scope**: retire 6 unused CVA variant branches per W0 reconciliation §5.
**Method**: confirm zero usage with precise grep, edit CVA definition / runtime branch, run typecheck after each component.

---

## Scope reveal

**`Badge variant="color"` was NOT retired.** The dispatch cited W0 grep finding 0 sites, but the W0 invocation `rg -l "<Badge[^>]*variant=\"color\"" src/ demo/` only matched template-attribute usage on `<Badge>`. A precise re-grep with `rg -n "badgeVariants\(\{ variant: 'color' \}\)" src/ demo/` finds **5 active in-repo consumer sites** in `demo/stories/primitives/color-pill.vue` (lines 72, 93, 112, 118, 127) using direct CVA invocation:

```
:class="cn(badgeVariants({ variant: 'color' }))"
:style="{ '--badge-color': '...' }"
```

Per dispatch protocol ("If the site exists, **STOP and report** — that's a real consumer; the variant must keep, not retire."), `Badge variant="color"` is **kept**. Reporting as scope reveal — orchestrator should reconcile W0 §5 (the W0 grep family was too narrow; CVA branches consumed via `xxxVariants({ variant: 'X' })` on a `:class` binding count as real consumers).

The remaining 5 retirements proceeded as planned.

---

## 1. `Tabs variant="underline"`

**File**: `src/components/ui/tabs/index.ts`
**Zero-usage proof**:
```
$ rg -n 'variant="underline"' src/ demo/
(no output)
```
Direct CVA invocations also checked — `tabsListVariants` and `tabsTriggerVariants` are only invoked with the `resolvedVariant` ref (typed value, never literal `'underline'`). The "Underline" section in `demo/stories/navigation/tabs.vue` uses inline `class="rounded-none border-b-2 ..."` overrides rather than the CVA branch.

**Diff**:
- removed `underline` from `tabsListVariants` `variants.variant` map (5 lines)
- removed `underline` from `tabsTriggerVariants` `variants.variant` map (3 lines)
- removed both inline comments

## 2. `Button variant="transport"` (1-site refactor)

**File**: `src/components/ui/button/index.ts` + `demo/stories/motion/timeline.vue`
**Initial usage**: 1 site at `demo/stories/motion/timeline.vue:117` (verified via `rg -n 'variant="transport"' src/ demo/`).

**Refactor**: `demo/stories/motion/timeline.vue:117` `variant="transport"` → `variant="glass"`. Rationale: the playback button sits inside a `<CreamSurface tone="cool">` container; `glass` reads as natural elevated playback prominence on that substrate. No size or icon change needed.

**Post-retire proof**:
```
$ rg -n 'variant="transport"' src/ demo/
(no output)
```

**Diff** (button/index.ts):
- removed `transport: 'bg-rainbow text-white border border-white/20 shadow-[var(--glass-specular),var(--shadow-cartoon-sm)] ...'` row from `buttonVariants.variants.variant`
- removed inline comment

**Diff** (timeline.vue):
- single attribute change `variant="transport"` → `variant="glass"`

No `[data-variant="transport"]` block found in `src/styles/glass.css` (verified via `rg -n 'transport|data-variant' src/styles/glass.css`).

## 3. `MetricBadge size="xl"`

**File**: `src/components/custom/metric-badge/MetricBadge.vue`
**Zero-usage proof**: `rg -n 'size="xl"' src/ demo/` returns only the def-side scoped CSS rule on `MetricBadge.vue:79` (now removed) plus unrelated rows in `icon-stamp.vue`, `blob.vue` (different components). No `<MetricBadge size="xl">` template site at HEAD.

**Diff**:
- `type MetricBadgeSize = 'sm' | 'md' | 'lg' | 'xl'` → `'sm' | 'md' | 'lg'`
- removed `case 'xl':` branches from both `amountClass` and `unitClass` computeds
- removed entire `<style scoped>` block (`.metric-badge[data-size="xl"]` rule + `.metric-badge-amount-xl` rule)
- removed `xl` mention from JSDoc comment

## 4. `StatusDot variant="progress"`

**File**: `src/components/custom/status-dot/StatusDot.vue`
**Zero-usage proof**:
```
$ rg -n 'variant="progress"' src/ demo/
src/components/custom/status-dot/StatusDot.vue:57:        /** Progress value in [0, 1]; consumed when `variant="progress"`. */
```
Only the JSDoc comment in StatusDot.vue itself referenced `progress` (not a template-site use). The story `demo/stories/primitives/status-dot.vue` does not reference `progress` (verified via `rg -n "progress" demo/stories/primitives/status-dot.vue` returning empty).

**Diff**:
- `Variant` union: `"active" | "paused" | "idle" | "error" | "custom" | "progress"` → `"active" | "paused" | "idle" | "error" | "custom"`
- removed `modelValue` prop + `modelValue: 0` default
- removed JSDoc `/** Progress value in [0, 1]; consumed when variant="progress". */`
- removed `<span v-if="variant === 'progress'">` template branch + simplified the `<span v-else>` to unconditional dot
- removed `if (props.variant === "progress")` branch in `resolvedColor`
- `Exclude<Variant, "custom" | "progress">` → `Exclude<Variant, "custom">`
- removed `progressClamped`, `progressStyle` computed refs
- simplified `outerStyle` to always return `{ backgroundColor: resolvedColor.value }` (the `progress`-specific glow/conic-gradient logic was only reachable when `variant === 'progress'`)

**Post-retire proof**:
```
$ rg -n 'variant="progress"' src/ demo/
(no output)
```

## 5. `GlassDock position="fixed"`

**File**: `src/components/custom/dock/GlassDock.vue`
**Zero-usage proof**: `rg -n 'position="fixed"' src/ demo/` returns only the def-side scoped CSS rule on `GlassDock.vue:267` (now removed). No `<GlassDock position="fixed">` site at HEAD.

**Diff**:
- prop type: `position?: "fixed" | "inline" | "sticky"` → `position?: "inline" | "sticky"`
- removed `position === 'fixed' ? 'fixed bottom-[var(--dock-pos)] left-1/2 -translate-x-1/2'` branch from class binding (2 lines), simplified to `position === 'sticky' ? 'dock-sticky' : 'dock-inline'`
- removed `<style>` block containing `.glass-dock[data-position="fixed"] { padding-bottom: env(safe-area-inset-bottom); }`

**Post-retire proof**:
```
$ rg -n 'position="fixed"' src/ demo/
(no output)
```

---

## Final verification

### Typecheck
```
$ npm run typecheck

> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
```
Green.

### Build
The `npm run build` JS bundle phase emits `dist/glass-ui.js  190.75 kB │ gzip: 36.60 kB` successfully, but the post-bundle `vite-plugin-dts` rollup phase fails with `Internal Error: Unable to follow symbol for "nextTick"` / `getSourceFile() failed to locate ".../dropdown-menu/index.d.ts"`. **The failure is in the dts rollup integration phase, references files unrelated to my Lane C edits (dropdown-menu, blob), and persists across `rm -rf dist` reruns. It correlates with the cross-lane working-tree state (Lane B mass-deleted `src/composables/blob/{useBlobMood,useBlobPointer,useBlobSatellites,useMetaballRenderer}.ts`, Lane B deleted `src/composables/{color,monaco}/`, and Lane B moved files to `src/composables/blob/_internal/` while `src/composables/blob/index.ts` and `src/composables/blob/useBlob.ts` are still mid-edit).** Reporting this as integration scope reveal — Lane C's CVA edits are not in the failing path.

Typecheck (the cleaner test of CVA semantics) is green.

### git status (Lane C bounds only)
Files I modified or wrote, all within declared bounds:
```
M  demo/stories/motion/timeline.vue
M  src/components/custom/dock/GlassDock.vue
M  src/components/custom/metric-badge/MetricBadge.vue
M  src/components/custom/status-dot/StatusDot.vue
M  src/components/ui/button/index.ts
M  src/components/ui/tabs/index.ts
?? docs/tranches/H/audit/W1-C-proof.md
```
No file outside Lane C's may-modify list was touched.

---

## Summary

| Branch | File | Sites pre | Sites post | Notes |
|---|---|---:|---:|---|
| `Tabs variant="underline"` | `src/components/ui/tabs/index.ts` | 0 | 0 | retired both `tabsListVariants` + `tabsTriggerVariants` rows |
| `Badge variant="color"` | `src/components/ui/badge/index.ts` | 5 (color-pill.vue) | 5 | **kept — scope reveal** |
| `MetricBadge size="xl"` | `src/components/custom/metric-badge/MetricBadge.vue` | 0 | 0 | retired type union + 2 switch cases + scoped style block |
| `StatusDot variant="progress"` | `src/components/custom/status-dot/StatusDot.vue` | 0 | 0 | retired union member + modelValue prop + 2 computeds + template branch |
| `Button variant="transport"` | `src/components/ui/button/index.ts` | 1 (timeline.vue:117) | 0 | refactored 1 site to `variant="glass"`; removed CVA row |
| `GlassDock position="fixed"` | `src/components/custom/dock/GlassDock.vue` | 0 | 0 | retired union member + class branch + scoped style block |

**No destructive git commands executed** (no `git stash`, no `git reset`, no `git checkout HEAD --`).
**No commits created** (per dispatch).
**5 of 6 branches retired cleanly; 1 kept on real-consumer evidence (Badge color).**
