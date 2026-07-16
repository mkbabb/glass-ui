# Canon

This directory is the discoverable home for Glass UI's live design, build, and
consumer contracts. Component-specific contracts stay beside their owners under
`src/components/<family>/README.md`.

## The seams

- `scripts/lib/canon-doc.mjs` resolves the named homes used by the primitives
  generator. Re-homing a contract is one map edit.

## The cross-cutting topic homes

| topic | home |
| --- | --- |
| structure | `structure.md` |
| dependencies | `dependencies.md` |
| dependency currency | `deps-currency.md` |
| build and validation | `build-and-gates.md` |
| conventions | `conventions.md` |
| design axes | `design-axes.md` |
| glass system | `glass-system.md` |
| motion system | `motion-system.md` |
| consumer wiring | `consumer-wiring.md` |
| exports and subpaths | `exports-and-subpaths.md` |

## The design-doc homes

The design references live under `docs/design/`: `design-idioms.md`,
`motion-canon.md`, `tunable-anim.md`, and `affordance-map.md`.

## Review language

- `aristotelian-proportion.md` defines the three design-language axes used during
  native visual review. It is guidance for judging the rendered whole, not a reason to
  mint mechanical gates.
