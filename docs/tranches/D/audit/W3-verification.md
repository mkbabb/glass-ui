# D.W3 Verification

Close artefact for D.W3 — Current Consumer Evidence.

## Commits

| Sub-phase | Commit | Result |
|---|---:|---|
| W3.B index + prompt binding | `52194f2` | Added `docs/consumer-evidence/README.md` and bound `docs/audits/overfitting-audit.md` to fresh consumer-evidence grep proof. |
| W3.A per-artefact docs | `fad212a` | Added 24 per-artefact current-consumer evidence docs. |

## Evidence Set

The W3 evidence set contains the 20 W0 `keep-current` rows that survived W2 plus 4 W2.A scope-reveal restorations:

```text
ExpandableContainer
createGlassFilter
destroyGlassFilter
GlassFilterState
GlassTier
useGlassRenderer
useScrollProgress
SpringSnapshot
useStaggerReveal
useSortable
UseSortableReturn
isMac
useWindowedStore
buildSectionLayout
findSectionOffset
ForcedSectionWindowRange
resolveActiveSection
resolveSectionWindow
SectionLayout
SectionWindowRange
useAnimatedNumber
AnimatedNumber
UseAnimatedNumberOptions
useDarkModeSync
```

`useLeaveTimer` did not carry forward because W2 deleted its only consumer cascade.

## Verification

Commands and results:

```text
evidence docs excluding README: 24
README rows: 24
README links: 24
missing README links: 0
per-doc Proof command failures: 0
overfitting prompt references docs/consumer-evidence/: yes
overfitting prompt requires stale-proof fallback: yes
```

Boundary checks:

```text
npm run typecheck: exit 0
npm run build: exit 0
dist/glass-ui.js 370.04 kB
dist/glass-ui.css 39.81 kB
```

## Scope Notes

- W3 normalized the stale W0 `isMac` external-consumer claim. The current proof is source-consumer evidence in `src/composables/useKeyboardShortcuts.ts`.
- `AnimatedNumber` and `UseAnimatedNumberOptions` are retained as the public return/options contracts for the externally used `useAnimatedNumber` composable.

## Gate Result

W3 hard gate closed:

- `docs/consumer-evidence/*.md` count is 25 including README.
- Every one of the 24 artefact docs records an exact `rg` proof command and a current source/demo/external path.
- Every proof command passes.
- README row count equals artefact doc count.
- `docs/audits/overfitting-audit.md` now requires fresh `docs/consumer-evidence/` grep proof before assigning `keep-current`.
