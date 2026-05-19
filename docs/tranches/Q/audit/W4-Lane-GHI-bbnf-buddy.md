# Q.W4 — Lanes G + H + I: bbnf-buddy cosmetic cohesive close

**Tranche / Wave**: Q.W4, Lanes G + H + I.
**Repo modified**: `bbnf-buddy` (sibling consumer of glass-ui). One cohesive consumer commit covering all three lanes.
**Date**: 2026-05-18.
**Mode**: consumer cross-repo write. Read-only git in every repo — orchestrator owns the commit.

---

## Charter

bbnf-buddy carries pre-glass-ui-v1.0 stale-API debt that the prior Q waves (W1 resolver sweep, W2 6-site Card-pane migration) did not close. Per the Qι cosmetic-regression sweep, three lanes land together as one bbnf-buddy commit:

- **Lane G** — `preset.css` glass-ladder rewrite (Q-cos-8 / F-1) + the `SelectionInfo` border-token fix (Q-cos-9 / F-2) + the 7th / last `<Card variant=>` site migrated to the W3 `surface` prop (Q-cos-10 / F-3).
- **Lane H** — the three-site `:deep()` retreat batch (Q-cos-12 / F-5 + F-6 + F-7). Migrate where the custom-prop / token exists; file a substrate referral where it does not.
- **Lane I** — the `--shadow-cartoon` lift-scale fix (Q-cos-11 / F-4): restore the `-md` / `-lg` rungs the `cartoon-surface` utility consumes.

Hard gates: `npm run build` GREEN, `npm run typecheck` GREEN, `grep '<Card[^>]*variant='` → ZERO, `grep 'glass-{subtle,medium,default,elevated}'` in `preset.css` → ZERO.

---

## Lane G — preset.css rewrite + the 7th Card site

### Q-cos-8 (F-1) — `preset.css` glass-ladder rewrite

`bbnf-buddy/src/styles/preset.css` overrode 12 retired token names — `--glass-{opacity,bg,blur}-{subtle,default,medium,elevated}` — across the `:root` and `.dark` blocks. glass-ui retired those names at the v0.8.0 R3-spec rename; the canonical ladder is `wash/quiet/resting/floating/overlay`. Every override was a silent no-op: glass-ui's `glass.css` reads `--glass-bg-wash` etc., so bbnf-buddy's bespoke translucent-nesting scale never reached a single nested glass surface — the editor's `<Card>` panes rendered against glass-ui's stock opacity defaults.

**Token mapping** (per Qι F-1; the four old rungs map onto the lower four of the five canonical rungs, plus a new `overlay` top rung):

| Retired token | Canonical token | Light value | Dark value |
|---|---|---|---|
| `--glass-opacity-subtle`   | `--glass-opacity-wash`     | `0.12` | `0.14` |
| `--glass-opacity-default`  | `--glass-opacity-quiet`    | `0.38` | `0.42` |
| `--glass-opacity-medium`   | `--glass-opacity-resting`  | `0.52` | `0.56` |
| `--glass-opacity-elevated` | `--glass-opacity-floating` | `0.66` | `0.70` |
| *(new — no old equivalent)* | `--glass-opacity-overlay` | `0.82` | `0.86` |
| `--glass-blur-subtle`   | `--glass-blur-wash`     | `blur(14px) saturate(1.3)` | — |
| `--glass-blur-default`  | `--glass-blur-quiet`    | `blur(16px) saturate(1.4)` | — |
| `--glass-blur-medium`   | `--glass-blur-resting`  | `blur(18px) saturate(1.5)` | — |
| `--glass-blur-elevated` | `--glass-blur-floating` | `blur(22px) saturate(1.6)` | — |
| *(new)* | `--glass-blur-overlay` | `blur(26px) saturate(1.7)` | — |
| `--glass-bg-{subtle,default,medium,elevated}` | `--glass-bg-{wash,quiet,resting,floating}` + new `--glass-bg-overlay` | `color-mix` recompute | `color-mix` recompute |

Values are preserved 1:1 from the old rungs — the rewrite restores the consumer's intended visual rhythm. The new `overlay` rung (modal-on-modal) is the highest-density step, monotone-extended above `floating`. The composed `--glass-bg-*` backgrounds are recomputed after the opacity overrides exactly as before.

**Consumer follow-on**: `OffsetEditor.vue:243,246` consumed `--glass-opacity-subtle` / `-default` directly for its `.offset-group` accent-tint backgrounds. Those two references were retargeted to `--glass-opacity-wash` / `-quiet` so the offset-group surface tracks the same canonical ladder (otherwise the rename would have left two more silent no-ops).

### Q-cos-9 (F-2) — SelectionInfo border token

`SelectionInfo.vue:238` — `border-color: var(--intent-color, var(--glass-border-subtle))`. `--glass-border-subtle` is a retired name; the fallback resolved `unset`, so the selection pane rendered with no visible border whenever no `.intent-*` modifier class applied (cursor mode etc.). Migrated the fallback to the canonical `--glass-border-quiet` (the rung the old `subtle` border mapped to).

### Q-cos-10 (F-3) — the 7th / last `<Card variant=>` site

`AnimationWorkspace.vue:157` carried `<Card :variant="props.inline ? 'default' : 'cartoon'">` — the last stale `<Card variant=>` site fleet-wide and the only `cartoon`-valued member. glass-ui's `<Card>` has no `variant` prop; both values fell through as inert DOM attrs. Migrated against the W3-extended Card API (`tier` / `surface` / `shadow` / `grain`):

```vue
<Card
    :tier="props.inline ? 'wash' : 'resting'"
    :surface="props.inline ? 'glass' : 'cartoon'"
    :shadow="!props.inline"
    :grain="false"
    ...
>
```

- **standalone** (`!inline`) → `tier="resting" surface="cartoon"` — the Memphis-sticker cartoon decoration (2px border, offset-stamp shadow, hover-lift) layered on the resting glass tier, which is the author's original intent.
- **inline** → `tier="wash" surface="glass" :shadow="false"` — the flush, chrome-less card the panel uses inside `EditorPanel`.

Co-folded **F-12**: the `.animation-workspace.is-inline` scoped reset previously zeroed `background` / `border` / `box-shadow` / `backdrop-filter`. With `tier="wash" :shadow="false"` the border + shadow are already gone, so the reset was trimmed to the two declarations still load-bearing (`background: transparent` + `backdrop-filter: none`) to fully defeat the faint wash-tier fill.

**Gate**: `grep -rn '<Card[^>]*variant=' src/` → ZERO. The bbnf-buddy fleet is `variant=`-free.

---

## Lane H — `:deep()` retreat batch

### F-5 — EmotionStateSelect ToggleChip active-label — REFERRAL FILED (Q.Rh-1)

`EmotionStateSelect.vue:215` — `:deep([data-state="on"]) .emotion-cell-label` retints the slotted cell label when the chip is selected.

**Substrate check**: glass-ui's `<ToggleChip>` (`src/components/custom/toggle-chip/`) `cell` variant CVA sets `data-[state=on]:bg` + `data-[state=on]:border` on the chip ROOT only. It exposes **no** custom-prop / CSS-var cohort, and **no** descendant rule, for tinting slotted label content on the active state. There is no `--toggle-chip-active-*` token family (unlike the dock's `--dock-active-*` cohort).

**Disposition**: the custom-prop is MISSING → **substrate referral Q.Rh-1 filed** (spec below). The `:deep()` reach is retained as the documented interim (it is functional today); a tracking comment at the call site points at this referral. Per the W4 spec, the consumer is NOT migrated when the substrate prop is absent — the referral is the deliverable.

### F-6 — EditorPanel pane-viewport `:deep()` — MIGRATED (no referral)

`EditorPanel.vue:234-235` — `:deep([data-slot="scroll-area-viewport"]), :deep([data-radix-scroll-area-viewport])` sized the scroll viewport of two `<ScrollPane>` instances.

**Substrate finding**: `ScrollPane` does not exist in glass-ui at HEAD — it was removed at C.W5 (`304ac78`, "remove ScrollArea, ScrollPane, .cartoon-card, ..."). bbnf-buddy's `EditorPanel.vue:9 import { ScrollPane }` has been a latent broken import since `e06d629` (the v1.0 subpath migration) — `npm run typecheck` flagged it as `TS2305: Module has no exported member 'ScrollPane'`. The Qι finding F-6 mis-described the target as a still-live "ScrollPane viewport"; the scan corrects that.

**Disposition**: the idiomatic gestalt fix — there is no scroll primitive to retreat-via-prop because the primitive is gone. Both `<ScrollPane class="tab-scroll ...">` sites became plain scroll bodies: `<div class="tab-scroll ... scrollbar-hidden">` with `overflow-y: auto` added to `.tab-scroll`. The body element IS the scroll viewport now, so the two `:deep()` viewport selectors are deleted outright — there is no nested viewport to reach into. `scrollbar-hidden` is glass-ui's canonical scrollbar-suppression utility. The `ScrollPane` import was dropped. This both retires the `:deep()` (Lane H) and repairs the pre-existing broken import. No substrate referral needed.

### F-7 — ToolsLayer dock-icon-button size + disabled `:deep()` — MIGRATED (no referral)

`ToolsLayer.vue:301-317, 348-365` carried four `:deep()` reaches into the dock subtree. Qι speculated a missing `--dock-icon-button-size` token (candidate Q.Rh-2).

**Substrate check**: glass-ui's `dock.css` `.dock-icon-button` already sources its geometry from a token cohort — `width`/`height: var(--dock-control-size, var(--size-icon-btn))`, `border-radius: var(--dock-control-radius, var(--radius-pill))`. The token Qι named speculatively (`--dock-icon-button-size`) exists under the canonical name **`--dock-control-size`**. So there is NO substrate gap — **Q.Rh-2 is NOT filed** (investigated and resolved: the token exists).

**Disposition — fully migrated**:
- `:deep(.dock-icon-button)` size block — `width`/`height` set `var(--size-icon-btn)`, which is literally the substrate default; `transform-origin: center center` is the CSS default; both redundant. The only real delta was `border-radius: var(--radius-lg)` (vs the pill default). Migrated by setting `--dock-control-radius: var(--radius-lg)` on `.tools-layer` — a plain parent custom-prop that cascades into every `.dock-icon-button` with no `:deep()`. The custom `transition` was dropped: the substrate's own `.dock-icon-button` transition already animates `transform`, so the `--dock-active-scale` bump still animates. The entire `:deep(.dock-icon-button)` block is retired.
- `:deep(.dock-icon-button .size-4)` icon-glyph sizing — `.size-4` is a Tailwind utility on ToolsLayer's OWN slotted `<svg>` elements. The idiomatic fix is to size the consumer's own element directly: the five `<svg class="size-4">` inside dock-icon-buttons became `class="size-5"` (1.25rem). No `:deep()`.
- `:deep(.magnet-btn svg)` + `:deep(.magnet-btn.is-active svg)` — `.magnet-btn` is authored inside the child SFC `MagnetToolButton.vue`. The cross-component `:deep()` was relocated INTO `MagnetToolButton.vue`'s own scoped `<style>` (the `.magnet-btn` button + its slotted `<svg>` are that component's own tree, so a plain scoped selector matches). Its `<svg>` was also bumped `size-4` → `size-5` to preserve the icon size that the deleted ToolsLayer rule used to supply.
- `:deep(.dock-icon-button.is-disabled)` + `:hover` — `.is-disabled` is authored inside the child SFC `AlignDerivativesButton.vue`. The styling was relocated INTO `AlignDerivativesButton.vue`'s own scoped `<style>`. Its `<svg>` was bumped `size-4` → `size-5` for the same reason.

After the migration ToolsLayer holds **zero** `:deep()` rules; the `.dock-icon-button.is-tool-btn` active-paint block (already on the canonical `--dock-active-*` cohort since P.W5) is untouched.

---

## Lane I — `--shadow-cartoon` lift-scale

### Q-cos-11 (F-4)

`preset.css` overrode `--shadow-cartoon` (the base rung) with a warm 3-layer `var(--foreground)`-tinted recipe, but did NOT override the `-md` / `-lg` siblings.

**Substrate verification**: glass-ui's `@utility cartoon-surface` (`src/styles/cards.css:33-44`, the W3 Lane B re-model of the former `.glass-cartoon`) reads `box-shadow: var(--shadow-cartoon-md)` at rest and `var(--shadow-cartoon-lg)` on `:hover:not(:disabled)`. It does **not** read the base `--shadow-cartoon` token at all. So with only the base rung overridden, every `<Card surface="cartoon">` in bbnf-buddy (the editor's cartoon-themed panels) painted glass-ui's stock neutral `-md`/`-lg` shadows at rest and on hover — the warm cartoon override and the lift scale were incoherent.

**Fix**: added `--shadow-cartoon-md` and `--shadow-cartoon-lg` to `preset.css` `:root`, deriving from the same warm 3-layer recipe. `-md` matches the base rung (the resting cartoon shadow); `-lg` steps the hard offset up `4px → 6px` and the ambient glow up `8px 24px → 14px 36px` so the hover-lift reads as a genuine rise off the warm surface. A coherent three-rung cohort (`base` / `-md` / `-lg`) instead of one.

---

## Q.Rh substrate referrals

### Q.Rh-1 — `<ToggleChip>` active-state slot-content token cohort (FILED)

**Trigger**: Lane H / F-5. `EmotionStateSelect.vue` must `:deep()`-reach `[data-state="on"] .emotion-cell-label` to retint a selected `cell`-variant chip's slotted label, because the substrate provides no contract for it.

**Gap**: `toggleChipVariants` (`src/components/custom/toggle-chip/index.ts`) `cell` variant applies `data-[state=on]:bg` + `data-[state=on]:border` to the chip ROOT only. Slotted content (the consumer's icon + label) receives no active-state cascade and no custom-prop hook. The `chip` variant additionally has `data-[state=on]:text-foreground` + `data-[state=on]:font-medium` — but those style the ROOT's own text, not a nested label element, and the `cell` variant has neither.

**Proposed substrate spec** (glass-ui follow-on; this agent cannot write glass-ui):
Add a `--toggle-chip-active-*` token cohort consumed by `toggleChipVariants`, mirroring the dock's `--dock-active-*` pattern. Minimum surface:
- `--toggle-chip-active-color` — the active-state foreground color the chip cascades to its content. Default: `var(--foreground)`.
- `--toggle-chip-active-label-weight` — font-weight for an active label. Default: `500` (matching the `chip` variant's `data-[state=on]:font-medium`).
The `cell` variant should, on `data-[state=on]`, set `color: var(--toggle-chip-active-color)` on the root (so `currentColor`-driven slot content inherits it) and expose the weight token for an opt-in label class. Consumers then retint a selected cell by overriding the two tokens on a parent — no `:deep()`. This closes the F-5 retreat-via-custom-prop contract.

**Status**: FILED. Interim: the `EmotionStateSelect.vue:215` `:deep()` is retained with a tracking comment pointing here. To be folded into a later Q wave or W5 substrate close.

### Q.Rh-2 — dock-icon-button size token gap — NOT FILED (investigated, resolved)

Qι F-7 flagged a *possible* missing `--dock-icon-button-size` token. The scan resolves it: glass-ui already ships the token under the canonical name **`--dock-control-size`** (with `--dock-control-radius` for the corner), consumed by `.dock-icon-button` in `dock.css`. No gap exists; ToolsLayer's geometry migrated cleanly onto the existing cohort. **Q.Rh-2 is not filed** — the candidate dissolves on inspection.

---

## Verification

| Gate | Result |
|---|---|
| `grep -rn '<Card[^>]*variant=' src/` | ZERO matches |
| `grep -rn 'glass-\(subtle\|medium\|default\|elevated\)' src/styles/preset.css` | ZERO matches |
| `grep -rn 'glass-\(opacity\|bg\|blur\|border\)-\(subtle\|default\|medium\|elevated\)' src/` | ZERO matches (fleet-wide; `preset.css` rewritten + `SelectionInfo` + `OffsetEditor` follow-ons) |
| `npm run typecheck` | GREEN for all Q.W4 Lane GHI scope. One pre-existing UNRELATED error remains: `src/composables/wasm/morph.ts:177` — a `SegmentId`/`number` mismatch in WASM-morph code, present in the baseline before this wave, in no file this wave touched, and outside Lane GHI scope. The `EditorPanel ScrollPane` `TS2305` error and the 51 `TS7016` "no declaration file" errors all RESOLVED (the latter required a fresh `glass-ui` build to populate `dist/*.d.ts`). |
| `npm run build` | GREEN (`vite build` — the only warning is the pre-existing Monaco chunk-size notice). |

**Note on the typecheck baseline**: the wave brief stated bbnf-buddy "currently typechecks GREEN". A fresh run showed 52 errors — 51 `TS7016` because glass-ui's `dist/` lacked the W3-era `.d.ts` files, plus the broken `ScrollPane` import. Building glass-ui (`npm run build`, read-only to git) repopulated `dist/` and cleared all 51; the `ScrollPane` `TS2305` was cleared by the F-6 migration. The lone residual (`morph.ts`) is genuinely pre-existing and unrelated.

## Files modified (bbnf-buddy — one cohesive commit)

- `src/styles/preset.css` — glass-ladder rewrite (12 retired tokens → canonical 5-rung, both themes); `--shadow-cartoon-{md,lg}` rungs added.
- `src/editor/components/SelectionInfo.vue` — border fallback → `--glass-border-quiet`.
- `src/editor/components/animation/AnimationWorkspace.vue` — `<Card variant=>` → `<Card :tier :surface :shadow :grain>`; `.is-inline` reset trimmed.
- `src/editor/components/OffsetEditor/OffsetEditor.vue` — `--glass-opacity-{subtle,default}` → `-{wash,quiet}`.
- `src/editor/components/EditorPanel.vue` — `<ScrollPane>` → scrolling `<div>` ×2; `ScrollPane` import dropped; `:deep()` viewport selectors deleted; `.tab-scroll` gains `overflow-y: auto`.
- `src/editor/components/dock/tools/ToolsLayer.vue` — `:deep(.dock-icon-button)` size block retired → `--dock-control-radius` parent token; `:deep()` magnet/disabled blocks removed; 5× `size-4`→`size-5`.
- `src/editor/components/dock/tools/MagnetToolButton.vue` — magnet icon tint relocated from ToolsLayer `:deep()` into own scoped style; `size-4`→`size-5`.
- `src/editor/components/dock/tools/AlignDerivativesButton.vue` — `.is-disabled` styling relocated from ToolsLayer `:deep()` into own scoped style; `size-4`→`size-5`.
- `src/components/EmotionStateSelect.vue` — Q.Rh-1 tracking comment added at the retained `:deep()`.

---

## Verdict

**PASS.** Lanes G + H + I land as one cohesive bbnf-buddy consumer commit.

- Lane G — `preset.css` 12-token glass-ladder rewrite complete + 2 follow-on consumers (`OffsetEditor`); `SelectionInfo` border restored; the 7th / last `<Card variant=>` site migrated to the W3 `surface` API. Fleet `<Card variant=>` corpus = ZERO.
- Lane H — F-6 (EditorPanel) and F-7 (ToolsLayer) fully migrated, zero `:deep()` reaches into glass-ui primitives remain in those SFCs. F-5 (EmotionStateSelect) → substrate referral **Q.Rh-1** filed with a precise spec; the `:deep()` is retained as documented interim. Q.Rh-2 investigated and dissolved — the token exists.
- Lane I — `--shadow-cartoon-{md,lg}` rungs restored; the `cartoon-surface` hover-lift scale is coherent.

All grep gates ZERO; `build` GREEN; `typecheck` GREEN for all Lane GHI scope (one pre-existing unrelated `morph.ts` error documented, out of scope).
