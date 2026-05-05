# H.W1 Lane A — Custom Components Retirement Proof

**Agent**: H.W1 Lane A (custom components retire).
**Date**: 2026-05-05.
**Scope**: 4 G-shipped custom-component packages flagged library-orphan in `audit/W0-reconciliation.md` §3 — `<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`, `<SvgFilters>`/`<RainbowGradientDef>`.
**Method**: per-package verify → delete directory → remove `src/index.ts` export → confirm zero remaining references via `rg`.

---

## Per-package retirement ledger

### 1. `<KeyboardShortcutsModal>` — RETIRED

- **Pre-retire verification**: `rg -l '\bKeyboardShortcutsModal\b' src/ demo/ --type-add 'vue:*.vue'` → 2 hits, both internal:
  - `src/components/custom/keyboard-shortcuts-modal/index.ts`
  - `src/components/custom/keyboard-shortcuts-modal/KeyboardShortcutsModal.vue`
- **Directory deleted**: `rm -rf src/components/custom/keyboard-shortcuts-modal/` (via Bash `rm`, not `git rm`)
- **Export line removed**: `src/index.ts` line 25 — `export * from "./components/custom/keyboard-shortcuts-modal";`
- **Manifest entry removed**: N/A — `rg -n 'KeyboardShortcutsModal|keyboard-shortcuts-modal' demo/stories/manifest.ts` returned no matches.
- **Post-retire verification**: `rg -l '\bKeyboardShortcutsModal\b' src/ demo/ --type-add 'vue:*.vue'` → no matches. `rg -l 'keyboard-shortcuts-modal' src/ demo/` → no matches.

### 2. `<TierBadge>` — RETIRED

- **Pre-retire verification**: `rg -l '\bTierBadge\b' src/ demo/ --type-add 'vue:*.vue'` → 2 hits, both internal:
  - `src/components/custom/tier-badge/index.ts`
  - `src/components/custom/tier-badge/TierBadge.vue`
- **Directory deleted**: `rm -rf src/components/custom/tier-badge/`
- **Export line removed**: `src/index.ts` line 26 — `export * from "./components/custom/tier-badge";`
- **Manifest entry removed**: N/A — `rg -n 'TierBadge|tier-badge' demo/stories/manifest.ts` returned no matches.
- **Post-retire verification**: `rg -l '\bTierBadge\b' src/ demo/ --type-add 'vue:*.vue'` → no matches. `rg -l 'tier-badge' src/ demo/` → no matches.

### 3. `<LikeButton>` — RETIRED

- **Pre-retire verification**: `rg -l '\bLikeButton\b' src/ demo/ --type-add 'vue:*.vue'` → 2 hits, both internal:
  - `src/components/custom/like-button/LikeButton.vue`
  - `src/components/custom/like-button/index.ts`
- **Directory deleted**: `rm -rf src/components/custom/like-button/`
- **Export line removed**: `src/index.ts` line 27 — `export * from "./components/custom/like-button";`
- **Manifest entry removed**: N/A — `rg -n 'LikeButton|like-button' demo/stories/manifest.ts` returned no matches.
- **Post-retire verification**: `rg -l '\bLikeButton\b' src/ demo/ --type-add 'vue:*.vue'` → no matches. `rg -l 'like-button' src/ demo/` → no matches.

### 4. `<SvgFilters>` + `<RainbowGradientDef>` — HALT-AND-REPORT (NOT RETIRED)

**Scope reveal triggered**. Per dispatch prompt section "Critical: scope reveal protection", halt-and-report when `rg` shows >1 site for SvgFilters or RainbowGradientDef.

- **Pre-retire verification**:
  - `rg -l '\bSvgFilters\b' src/ demo/ --type-add 'vue:*.vue'` → 3 hits:
    - `src/components/custom/svg-filters/SvgFilters.vue` (def)
    - `src/components/custom/svg-filters/index.ts` (barrel)
    - `demo/stories/primitives/blob.vue` (DEMO CONSUMER)
  - `rg -l '\bRainbowGradientDef\b' src/ demo/ --type-add 'vue:*.vue'` → 3 hits:
    - `demo/stories/primitives/blob.vue` (DEMO CONSUMER)
    - `src/components/custom/svg-filters/RainbowGradientDef.vue` (def)
    - `src/components/custom/svg-filters/index.ts` (barrel)
- **Reference detail in `demo/stories/primitives/blob.vue`** (`rg -n '\b(SvgFilters|RainbowGradientDef)\b' demo/stories/primitives/blob.vue`):
  - Line 12 — `8. <SvgFilters> mount     — single-line consumer reminder` (file-header doc comment)
  - Line 20 — `import { RainbowGradientDef, SvgFilters } from "@/components/custom/svg-filters";`
  - Line 147 — `<SvgFilters />`
  - Line 148 — `<RainbowGradientDef />`
  - Line 620 — `<code class="fira-code">&lt;SvgFilters /&gt;</code> is mounted`
  - Line 623 — `<code class="fira-code">&lt;RainbowGradientDef /&gt;</code> is the`
- **Action taken**: STOP. Did not delete `src/components/custom/svg-filters/`. Did not remove the `export * from "./components/custom/svg-filters";` line at `src/index.ts:33`. Surfaced the reveal to the orchestrator per dispatch-prompt protocol.
- **Notes for orchestrator**:
  - The W0 reconciliation table §3 row 17 has these as RETIRE with verdict `inline-and-remove (β verdict)` and disposition `RETIRE (paired with <RainbowGradientDef>)`.
  - However, the H.W1.md "Lane A" critical-decisions section (line 37) lists these as: "Default: keep (in-repo evidence cleared via primitives/blob + foundations/flourishes)."
  - The dispatch prompt explicitly instructed halt-and-report when `rg` shows >1 site, which it does (3 sites for both). The two specs disagree about disposition; this is a scope reveal to be absorbed at orchestrator level, not by Lane A.
  - Possible orchestrator actions: (a) confirm RETIRE per W0 reconciliation, in which case `demo/stories/primitives/blob.vue` must be edited to inline the `<defs>` payload before deletion; (b) confirm KEEP per W1.md, in which case the export survives and the W0 reconciliation row needs amendment.

---

## Files modified

| Path | Change | Lines |
|---|---|---:|
| `src/components/custom/keyboard-shortcuts-modal/` | deleted (entire directory: `KeyboardShortcutsModal.vue` + `index.ts`) | -2 files |
| `src/components/custom/tier-badge/` | deleted (entire directory: `TierBadge.vue` + `index.ts`) | -2 files |
| `src/components/custom/like-button/` | deleted (entire directory: `LikeButton.vue` + `index.ts`) | -2 files |
| `src/index.ts` | 3 export lines removed (lines 25, 26, 27 in pre-edit numbering — `keyboard-shortcuts-modal`, `tier-badge`, `like-button`) | -3 lines |

Total Lane A diff: 6 file deletions + 3 line deletions in `src/index.ts`.

Note: Lane B (composables retire) also edited `src/index.ts` in parallel to remove `./composables/color` and `./composables/monaco` re-exports; those 2 line deletions belong to Lane B's scope, not Lane A's. The combined diff against HEAD shows 5 line deletions in `src/index.ts` from the union of both lanes.

## Verify-row: `npm run typecheck`

```
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit

(green; no output)
```

Run twice — once after the three retires + `src/index.ts` edit (transient errors from external Lane B/D in-flight edits to `composables/color` + `composables/monaco` resolved on second run as those lanes' edits stabilized), final run green.

## Scope reveal log

- **SvgFilters / RainbowGradientDef**: HALT-AND-REPORT per dispatch protocol. Demo consumer in `demo/stories/primitives/blob.vue` (4 template uses + 1 import + 2 doc comments). W0 reconciliation says RETIRE; W1.md says keep. Orchestrator must adjudicate.
- **External Lane edits visible in `git status --short`**: Lane B (composables retire — `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`, blob sub-composables → `_internal/`) and Lane D (slot-class retire — `dock/index.ts`, `dialog/DialogContent.vue`) edits were observed in the shared worktree during Lane A's run. Lane A did not touch them and they are outside Lane A's file bounds.

## Non-destructive-git confirmation

No `git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`, or any other destructive git command was run during this lane. Directory deletes used `rm -rf` per dispatch instruction. Surgical `Edit` was used for `src/index.ts`. No commits made (orchestrator commits at W1 close).
