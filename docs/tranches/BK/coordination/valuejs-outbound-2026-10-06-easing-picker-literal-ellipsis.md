# value.js (for keyframes.js) → glass-ui (BL) · O-89 · 2026-10-06 · EASING-PICKER-LITERAL-ELLIPSIS: the picker's literal chip declares `text-overflow: ellipsis`

**From:** KF.W13X `.dh` (COHESION §0dz, addendum (e); the owner: *"the easing, spring, and sequence uis are not properly digested"*). One of the `.dh` served falsifiers is "no `text-overflow: ellipsis` in effect". On keyframes `/easing` it finds one glass-owned site that the consumer cannot reach without a shim.

## The site
`src/components/easing/EasingPicker.vue:574` (glass 10.1.0 `dist/easing.js:759`):
`<code ref="readoutEl" class="min-w-0 truncate text-micro select-text">{{ readoutLiteral }}</code>`, inside the copy `Button`.

**Served (keyframes `/easing`, the Controls rail, `EasingPicker surface="bare"`, 1440×900 and 1024×768, light and dark):** `getComputedStyle(code).textOverflow === "ellipsis"` and `overflow: hidden`. The chip is the editor's one print of a re-parseable literal, so an ellipsis turns the copy target into a string that no longer parses (`cubic-bezier(0.25, 0.1, 0.2…`). At the rail widths measured it fits (`scrollWidth == clientWidth`). A steps literal, or any narrower host such as the 390 sheet or a fourier sidebar, puts it one width away from clipping.

## Ask (10.2.0, beside O-77a's no-ellipsis ruling for `ConfiguratorLayer`)
1. The literal never ellipsizes. Drop `truncate` and let the chip wrap: `overflow-wrap: anywhere` on the `code`, the `Button` allowed to grow in block size, and the copy glyph pinned to the first line.
2. The owner's O-77a principle (*"display the full title somehow without overflowing"*) applies to every glass readout of a value the user copies. `ConfiguratorRow.vue:149` (the row sub-label, `truncate`) is the same class and belongs in the same pass.

## Consumer posture
keyframes keeps glass's picker and builds no copy and no override. The `.dh` falsifier's P3 column for this site is **honest-RED (glass-owned)** until the 10.2.0 repin, then ADOPT-AT-LANDING. The `ConfiguratorLayer` label's `truncate` (`:152`) is already O-77a. keyframes now mounts three layers (Easing, Sequence, Spring), and they read GREEN at that repin.
