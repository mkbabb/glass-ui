SERVED MODEL: claude-opus-5-5

# O-74d — AUDIT-2 addendum from X.W12U `.k` (value.js component cogency, 2026-10-06)

Beside O-74 (`X-ALL-BK-AUDIT-2.md`), O-74a (the erratum) and O-74c (`…-ADDENDUM-2026-09-25-W12U-X.md`); none is rewritten (E-3). Source: X.W12U `.k`, Lens 1 (A2-VA-L1-1..24) and the cross-app adoption rows. value.js is on glass **10.1.0** (exact pin, `package.json:89`). Every "absent" below is a reading of the installed package: ⟨`grep -rl -- <name> node_modules/@mkbabb/glass-ui/dist | grep '\.d\.ts$' | wc -l`⟩.

## 1 · Adoption rows, read at 10.1.0

value.js builds no local copy of any of these. Each stays an ADOPT row on the consumer until the primitive ships; the value sites that retire are named.

| glass ask (row) | 10.1.0 reading | value sites that retire on landing |
|---|---|---|
| **ConfirmDialog** composite (A2-VA-L1-6) | 0 `.d.ts` files name `ConfirmDialog` | the six destructive confirms: `PalettesPane.vue`, `BrowsePane.vue`, `AdminUsersPanel.vue`, `AdminFlaggedPanel.vue`, `AdminNamesPanel.vue`, `AdminTagsPanel.vue` (`Dialog` + `DialogContent dismiss="deliberate"` + text Cancel + `tone="destructive"` commit, re-typed six times) |
| **Dock attribution menu** (A2-VA-L1-7) | 0 files name `Attribution` | `demo/shell/dock/menus/ProfileSection.vue` (the `@mbabb` `DockTrigger for="dropdown"`) and its phone twin in `MobileMenuDropdown.vue` |
| **CopyButton** (A2-KE-L1-29) | 0 files | the three the row names — `MixResultDisplay.vue`, `GradientVisualizer.vue`, `GradientEasingEditor.vue` (a per-row copy with its own Check/Copy swap) — out of 13 demo files that call `writeClipboard`/`useClipboard` (⟨`grep -rln 'writeClipboard\|useClipboard\|clipboard.writeText' demo`⟩, tests excluded) |
| **Aurora `followPointer`** (A2-KE-L1-26) | 0 files | `demo/color-picker/composables/boot/useAtmosphere.ts` (the `pointermove` → `aurora.setCursor` / `pointerleave` → `clearCursor` pair) |
| **TocTree** (A2-FO-L1-2) | 0 files | `demo/scenes/about/markdown/Markdown.vue` `.toc` rules (styling of the rendered markdown TOC) |
| **Pagination** (A2-FO-L1-27) | 0 files (`pager-dots` is a different job) | `demo/palettes/browser/admin/PaginationBar.vue` — now ONE bar over ONE pager for all five admin lists (X.W12U.k, A2-VA-X-12), so one file retires |
| **compact Tooltip** (A2-FO-L1-14) | `components/tooltip/*.d.ts` carries no `compact`/size prop | the dock `ActionButton.vue` hint (a `Popover trigger="hover"` standing in for a tooltip; A2-VA-L1-16) |
| **`.ios` no-zoom installer** (A2-KE-L1-28) | 0 files | value's coarse-pointer input sizing (X-W12U `.m`) |
| **Easing preset strip + EasingCurve marker API** (O-74a E-3) | `components/easing/` ships `EasingCurve`, `EasingPicker`, `usePicker` only; no preset strip, no marker prop | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` and `easingCatalogue.ts` (a copy of keyframes' EasingTarget gallery; fourier has its own) |
| **PaneHeader scroll veil** (A2-VA-L1-2, veil limb) | `CardHeader` slots are `default` only; no veil seat | `demo/shared/ui/PaneHeader.vue` (the veil plus the title-scale scrub) |

## 2 · New asks from `.k`

### K-1 · CHIP-LIVE-REGION (LOW) · `Chip` drops `role`, so a status chip cannot be a `Chip`
- **Measured:** `dist/chip.js` filters `role` (with `aria-pressed`, `data-state`, `name`, `required`) out of the attrs it forwards in every mode, including `static`. value's two API-status marks (the dock lamp and the per-surface offline chip, A2-VA-L1-9) are live regions: `role="alert"` for a dev misconfiguration, `role="status"` for a degraded backend. The role is what the consumer's oracle asserts (`e2e/smoke/oracles/o22-status-lamp.spec.ts:97`).
- **Ask:** let a `static` chip carry `role="status" | "alert"`, or ship a status chip composite (`StatusDot` + label) that owns the live region.
- **Consumer:** A2-VA-L1-9 stays open on value until this is ruled or the row's files are free (see the X.W12U `.k` receipt): the cure composes the published `chipVariants()` recipe and `StatusDot` on a consumer host element that carries the role; it does not copy the chip's CSS.

### K-2 · SAFE-STORAGE (INFO) · two apps each own the same storage guard
- **Measured:** value `demo/platform/storage/useSafeStorage.ts` and fourier `web/src/composables/useSafeStorage.ts` are the same four functions. fourier added the UIA-F-120 guard (reading `window.localStorage` itself throws with site data blocked); value carried the same defect and adopted the same cure in `.k`.
- **Ask (a ruling, not a build):** does this belong in glass (`@mkbabb/glass-ui/dom`), or stay one owner per app? Until glass rules, each app keeps its one owner and the files cross-cite each other.

## 3 · Cited, not re-asked
- **AdminFlaggedPanel** exists in value and fourier for one job. It is a consumer panel over each app's own moderation API; the shared parts are the ConfirmDialog (§1) and the Pagination (§1). No separate glass ask.
- **Admin search inputs:** value's are the `input-bar search-seated` recipe on a native `<input>`; they ride the SearchBar/Input idiom already asked in O-74.

Reply requested: the release each §1 primitive rides, and rulings on K-1 and K-2.
