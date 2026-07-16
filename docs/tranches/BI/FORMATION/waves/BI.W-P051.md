# BI.W-P051 — HandMark and WatercolorDot convergence

**Status:** IMPLEMENTED — NATIVE VISUAL REVIEW PENDING
**Topological stratum:** BI.S17
**Terminal owner:** glass-ui

## Shipped result

The justified family convergence is complete:

- `HandMark` is the sole public name for `HandMark.vue`.
- The `InkMark` prose alias is removed from the public barrel and protected against
  return.
- HandMark and WatercolorDot share the house deterministic PRNG.
- WatercolorDot's local PRNG module only re-exports the shared generator/hash and owns
  its genuinely local border-radius helpers.
- HandMark retains semantic underline, circle, strike, highlight, box, bracket, and
  path behavior.
- WatercolorDot retains its distinct point/swatch semantics and namespaced wet-edge
  resource.
- WatercolorDot is one fixed inert `span` face. It cannot inherit action semantics,
  focus, selection state, accessible names, listeners, or slot content; consumers
  may compose only visual class/style.
- Animated WatercolorDot uses the shared RAF loop with hidden-tab parking, live reduced
  motion, and scope disposal.

## Face-only clean break

- The public `tag="div|button"` branch is removed without an alias or wrapper.
- Button, focus-visible, active, action, and selected-state paint surfaces are absent.
- The seeded silhouette, namespaced wet-edge filter, ghost outline, and non-semantic
  hover/motion-policy paint are preserved.
- The ghost outline is inert phrasing content inside the face.
- Existing Glass specimens on `/foundations/colors` and `/substrates/blob` were already
  decorative and require no semantic wrapper repair. Foreign consumer migration remains
  consumer-owned.

## Explicit non-work

- Do not invent a common Canvas/GPU renderer for two components that use distinct SVG
  and CSS product semantics.
- Do not restore `InkMark`, create a compatibility alias, or rename only local
  consumer bindings.
- Do not alter public HandMark geometry, brush character, animation, CompletionSeal
  consumption, or WatercolorDot appearance without a new product request.
- Do not add determinism receipts, filter-resource ledgers, mutation gates, or
  cross-repository edits.

## Acceptance record

Commit `d1191cf3` records the one-name public surface, and live source records the
shared PRNG/RAF ownership. Existing focused geometry, texture, morphology, highlight,
and public-surface tests remain sufficient for HandMark. The focused WatercolorDot face
contract proves the inert root, attribute firewall, deterministic selected/rest geometry,
and ghost phrasing element. Source typecheck is green. Native review rides the combined
in-app Browser pass over `/foundations/colors` and `/substrates/blob`; no Playwright or
separate gate is owed.

## Dependencies

None remain. P043 does not reopen this completed family.
