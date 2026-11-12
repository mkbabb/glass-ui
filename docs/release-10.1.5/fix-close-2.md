# 10.1.5 fix-close-2: E1, the CHANGELOG puts `data-run-fits` on the root

Seat: fix, round 2 after the close, claude-opus-5-5, 2026-11-12, branch `release/10.1.5`, base
`44f73f865`. The one guarded run (build and `verify:package`, heavy pool) waited in the queue and
was admitted. **None was refused.** No tag, push or publish.

| commit | what |
|---|---|
| `e376a9035` | **the cure**, `CHANGELOG.md` only (prose) |

## E1

`critique-close-1.md` gate (e): the 10.1.5 header said the dock publishes "a `data-run-fits`
attribute on the run". The attribute is on the dock root:

- `src/components/dock/composables/dockMorphMeasure.ts:345` `root.toggleAttribute("data-run-fits", fits)`;
- `src/components/dock/styles/run.css:414, 429, 828` select `.glass-dock[data-run-fits]`;
- `tests-visual/release-10-1-5.spec.ts` reads `dock.hasAttribute("data-run-fits")`.

The sentence now reads: "The dock publishes on its root four new measured properties, [...] and a
`data-run-fits` attribute (`.glass-dock[data-run-fits]`)." The selector is spelled out so a
consumer cannot read it as the run's. The body entry ("`data-run-fits` means only that the seats'
span fits the port") says what the flag means and names no element, so it stays as it is.

## Checks

| step | result |
|---|---|
| `npm run build` | exit 0 |
| `npm run verify:package` | exit 0, terminal CLEAN, ratchet PRESENT, datum 2955467 = unpacked 2955467 (equal, no rebind) |

No `src` or `tests-visual` file changed, so no visual or unit run was needed. The scope stays
frozen: nothing else changed.
