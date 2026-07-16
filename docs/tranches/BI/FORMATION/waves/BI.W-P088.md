# BI.W-P088 — Switch

**Status:** DONE
**Disposition:** retained public immediate-setting control

Switch is the binary immediate-setting control. The wrapper preserves Reka's switch
role, checked state, controlled value, disabled handling, label association, and native
form participation while using the shared Glass control-size and material contracts.

Current product evidence:

- `src/components/switch/Switch.vue` forwards the Reka root contract and derives track,
  thumb, and throw geometry from the shared control-size axis.
- `tests/components/ui/reka-binding-idiom.test.ts` verifies live checked-state binding.
- `tests-visual/touch-target.spec.ts`, `tests-visual/customizability.spec.ts`, and
  `tests-visual/no-shadcn-default.spec.ts` cover target, size, and material behavior.
- `demo/stories/forms/checks.vue` is the canonical state story; production compositions
  consume the same component directly.

No standalone Switch story or second eponymous contract family is required.
