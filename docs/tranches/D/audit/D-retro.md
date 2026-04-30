# D — Retrospective

## What Worked

- Six-lane audit synthesis caught the real issue: the visible vertical rail was not a dock variant. Fixing the architecture first made the blur problem straightforward.
- Consumer validation was the right arbiter for aliases. `@utils` passed locally only because local configs knew it; adjacent repos proved it was package leakage.
- Root smoke tests turned W4 from a script collection into a usable velocity harness.
- Removing the unused dock composables simplified the public surface and stopped carrying compatibility shims without consumers.

## What Stretched

- W4 exceeded its declared tooling bounds before D-II was opened. The correction was to name D-II and close the revealed scope honestly.
- Type declaration proof had two layers: `vue-tsc` emits declarations, but package export targets still need explicit verification after clean builds.
- Public utility additions need immediate source consumers. `useTouchGate` survived because it became dock behavior; `useInterval` did not.

## Bindings For E

1. Open with the current package contract, not with speculative API cleanup.
2. Validate consumers as a hard gate, not an afterthought.
3. Prefer deleting unwired public substrate over documenting future intent.
4. Keep the tranche to one publication cutover path: no extra F ledger, no broad refactor spread.
