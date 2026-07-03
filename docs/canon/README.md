# docs/canon — the live-contract index

The discoverable home for glass-ui's live design + build contracts. Authored at
BH.B4b-skeleton (the BG+BH 5.0.0 restructure) as the SKELETON: the topic files are
present-but-thin; the contract prose redistributes here from CLAUDE.md at
BH.B4b-content ([WS12], per owning wave), and the ~16 CLAUDE-reading gates re-point
through `scripts/lib/canon-doc.mjs` at BH.B5c — BEFORE CLAUDE.md is deleted (B4f, the
absolute-last act). The redistribute → re-home → delete order is the silent-loss
fence: no live contract vanishes without a live gate asserting it at its new home.

Future sessions boot from `docs/precepts` (submodule, auto-present) + the memory
system + THIS index — there is no auto-loaded project manual after B4f.

## The seams

- `scripts/lib/canon-doc.mjs` — the canon-home resolver (`CANON_HOMES` map +
  `canonDoc`/`readCanon`/`auditCanonHomes`). Re-homing a contract = ONE map edit.
- `scripts/lib/design-docs.mjs` — the design-doc resolver (`DESIGN_HOMES` map +
  `designDoc`/`readDesign`/`auditDesignHomes`) over the in-repo `docs/design/`
  extraction (the precept readers re-point through it at B5c).
- `scripts/regen-structure.mjs` — generates `structure.md` from disk via the SAME
  colocated-barrel glob the export regen feeds, so the package enumeration cannot
  drift (`--write` emits, `--check` REDs on drift).

## The cross-cutting topic homes

| topic | home | CLAUDE.md source (redistributed at B4b-content) |
|-------|------|--------------------------------------------------|
| structure | `structure.md` (GENERATED) | §Structure |
| dependencies | `dependencies.md` | §Dependencies |
| deps-currency | `deps-currency.md` | BH.B5a — dep-currency + shadcn-vue verdict (`proof:deps-currency`) |
| build-and-gates | `build-and-gates.md` | §Build / Gate hygiene |
| conventions | `conventions.md` | §Conventions |
| design-axes | `design-axes.md` | §Design Axes |
| glass-system | `glass-system.md` | glass-first canon · adaptive-glass · dark-material · surface-axis · on-glass-fg |
| motion-system | `motion-system.md` | motion-canon · per-spring clock · press-unify · DOCK_SPRING |
| consumer-wiring | `consumer-wiring.md` | §Consumer wiring |
| exports-subpaths | `exports-and-subpaths.md` | §Subpath surface · §Entry point |

Per-component contracts live in the colocated `src/components/custom/<dir>/README.md`
(DRY beside the code; `canon-doc.mjs` names each `component:<name>` home).

## The design-doc homes

The 4 glass-ui design docs are extracted in-repo at `docs/design/`: `design-idioms.md`,
`motion-canon.md`, `tunable-anim.md`, `affordance-map.md`.
