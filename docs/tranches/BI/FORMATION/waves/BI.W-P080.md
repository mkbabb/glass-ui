# BI.W-P080 — Typewriter

**Status:** DONE
**Disposition:** retained grapheme-safe progressive visual reveal with stable text semantics

Typewriter preserves its existing public props, word metadata, exposed controls, and
single cancellable discrete timing engine. Grapheme segmentation, typo correction,
pause/resume/reset, rapid interruption, teardown, and reduced-motion immediate
completion are unchanged.

The rendering boundary now owns two explicit contracts:

- assistive technology receives exactly one complete current target through an
  `sr-only` node; partial glyphs and the cursor are visual-only and `aria-hidden`;
- no `aria-live` region announces per-frame typing or deletion;
- hidden `aria-hidden` settled text reserves inline and block geometry before typing;
- rotation mode reserves every candidate phrase in one grid cell, so deletion and the
  next visual phrase cannot push adjacent layout;
- the visual frame is absolutely overlaid on that reserved geometry and cannot size it.

No locale, direction, per-frame announcement, glyph editing, or replacement animation
engine is added.

Evidence:

- `src/components/typewriter/TypewriterText.vue` owns the AT, reserve, and visual layers.
- `src/components/typewriter/composables/useTypewriter.ts` remains the unchanged timing
  and cancellation authority.
- `tests/components/typewriter.contract.test.ts` verifies full-text AT exposure and the
  geometry-reservation structure.
- `tests/components/custom/typewriter/TypewriterText.contract.test.ts` keeps grapheme,
  interruption, pause/reset, and PRM behavior covered.
- `tests/lifecycle-cleanup.spec.ts` keeps delayed-start teardown covered.
- `demo/stories/motion/typewriter.vue` explains the complete-text and stable-footprint
  behavior without adding controls or a second engine.
