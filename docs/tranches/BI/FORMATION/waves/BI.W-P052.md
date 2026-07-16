# BI.W-P052 — Procedural configuration schema

**Status:** DECLINED
**Topological stratum:** BI.S18
**Terminal owner:** glass-ui

## Disposition

The proposed 179-file schema/control-generation migration is not proportionate to the
product problem. It would add a metadata language, generator, persistence coupling, and
cross-scene abstraction over scene concepts that are intentionally different.

## Live product truth

- Procedural scenes already expose typed configuration at their component boundaries.
- The demo has a useful generic `useConfiguratorState` for preset selection, reset,
  and editable clones.
- Scene controls are explicit live writers, which keeps their meaning close to the
  scene and makes dead or misleading controls visible during ordinary review.
- A single-renderer scene does not need an engine-support schema.

## Retained policy

- Keep typed scene configs and direct control bindings.
- Remove or repair a dead control when it is found in the product surface.
- Reuse `useConfiguratorState` where its preset/reset semantics reduce code.
- Extract a small helper only after at least two real controls share behavior, units,
  bounds, and accessibility semantics.
- Preserve labels, keyboard entry, reset, invalid-input handling, and exact scene
  behavior in the component that owns them.

## Explicit non-work

- No shared procedural schema metadata.
- No generated Configurator controls.
- No global control roundtrip matrix, engine-support registry, persistence generator,
  mutation suite, evidence root, or transaction machinery.
- No changes to scene configs are authorized by this declined wave.

## Reopening condition

Open a new product wave only when a demonstrated multi-scene control defect cannot be
solved by a small shared helper. The new request must name the repeated behavior and
the components that consume it; file count or theoretical uniformity is insufficient.
