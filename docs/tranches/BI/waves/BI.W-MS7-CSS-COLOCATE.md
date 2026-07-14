# BI.W-MS7-CSS-COLOCATE — colocate component-owned sheets via Mechanism-B copy-to-slot

Band B9 MOVE-STAGE, wave MS7. Realizes ADDENDA §2 `BI.W-S-CSS-COLOCATE` 1:1 (Mechanism-B, M3, PD-5).
Device-free (`H`); byte-stable CSS → paint-neutral.

## §Provenance

- STRUCTURE-ADDENDA §2 MOVE-STAGE `MS7 · BI.W-S-CSS-COLOCATE` (DP-C: styles/ thins to ownerless
  substrate; M3: the F4 generator applied to CSS as copy-to-slot; PD-5: NOT literal-inline) + §5
  supersession (BH S2 CSS colocation → MS7).
- Pass-3 convergence: registry-v3 §2 (P3C2 green-to-green; MS7 re-fit to the settled tree). mechB dist
  === control dist proven 109/109 byte-identical (PD-5).

## §Scope

Component-owned sheets COLOCATE to their component dir; ownerless substrate stays thinned `src/styles/`.
Realization = **copy-to-slot** (gather each sheet to `dist/styles/<name>.css` keeping the @import chain),
NOT literal-inline — inlining dock.css's bytes mid-index.css drops its 16 leading `@import "./dock/*"`
(PD-5). dock CSS is greenfield-owned (STRUCT-RESEQUENCE D5) → B2 re-scopes to the ~39 non-dock gates.

## §Repair manifest

- Extend `read-css-monoliths.mjs CSS_MONOLITHS` with a component/slot field.
- Repoint `proof:dist-css` DC3 / `proof:components-css` rungs / `proof:theme` probe on move.
- 163 `src/styles/*` substrate citers stay stable (DP-C keeps ONE root).
- Trap law: 0 real `:global(` / light-dark()-inset (Mechanism-B keeps plain `.css`, never SFC scoped
  blocks — structurally N/A).

## §Acceptance

Durable invariants:
- The 6 §2f cascade couplings preserved: theme-after-tokens, menu-after-utilities, feedback-after-cards,
  glass-specular/refract-after-glass, segmented-tabs-drag adjacency, components layer.
- dock scoped-block-free (`proof:theme`).

## §Edges

- `← W-WORKTREE-GC completion` (MS0, user-gated).
- MS4.
- QUIESCE-TREE.

## §π

**Byte-stable CSS → paint-neutral** (PD-5; mechB dist === control dist 109/109 byte-identical). The one
paint-adjacent risk — an SFC-block reorder — is backstopped by `W-BLOCK-DISJOINT` + `proof:ba-gestalt`.
No captured DELTA required (zero-byte-delta assertion is the evidence).
