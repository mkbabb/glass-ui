# BI.W-P060 — Executable examples and honest copy feedback

**Status:** SOURCE COMPLETE — native review pending
**Product slice:** E · source-fidelity examples and concrete copy outcomes

The three multi-line demo examples now execute the same Vue modules displayed by
`CodeBlock`. Each story imports its example normally for the live specimen and with
`?raw` for source display; no hand-maintained snippet mirror or generated example
framework remains.

## Executable sources

- `demo/examples/CardExample.vue` teaches Card anatomy through the repository's
  Card and Button source barrels.
- `demo/examples/ConfiguratorExample.vue` executes `useConfiguratorState` from
  the Configurator source barrel and exposes live preset/dirty-state readback.
- `demo/examples/ToasterExample.vue` mounts Toaster and executes `useToast` through
  the Toast source barrel.

The live/raw pairs are owned by `demo/stories/display/card.vue`,
`demo/stories/containers/configurator.vue`, and `demo/stories/feedback/toaster.vue`.
Editing an example therefore changes both the rendered specimen and displayed source.

## Copy contract

`demo/chassis/code/CodeBlock.vue` owns explicit `idle`, `success`, and `failure` copy
states. Success displays and politely announces `Code copied.` Failure displays and
announces manual-copy guidance, changes the action to a retry label, and reports the
underlying Clipboard error rather than swallowing it. The existing horizontal
`FadingScroll` edge cue remains the long-line overflow owner.

## Evidence

`tests/demo/code-block.test.ts` verifies all three runtime/raw source pairs and drives
the actual copy button through Clipboard success, denial, and unavailability,
asserting visible live status, retry labeling, copied text, and failure reporting.
The focused file passes 6/6 tests, full source/test typecheck passes, and the demo
production build resolves all three runtime/raw pairs. Native review of the live
examples and copy outcomes remains pending. No Playwright or separate example-
verification script is part of this product contract.
