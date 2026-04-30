# D.W0.E - File bounds audit

## Commands

```sh
sed -n '1,320p' docs/tranches/D/D.md
sed -n '1,260p' docs/tranches/D/waves/W1.md
sed -n '1,260p' docs/tranches/D/waves/W2.md
sed -n '1,260p' docs/tranches/D/waves/W4.md
rg --files demo/stories src/components/custom/sidebar src/composables docs/tranches/D/audit | sort
ls -la tsconfig.src.json vite.iter.config.ts vitest.config.ts scripts/validate-consumers.sh scripts/ay-close.sh 2>&1
```

## Critical-files path check

The D.md critical-files table mixes existing files, planned create files, delete globs, and dynamic allow-lists. Present/absent below means current filesystem state before W0.C/D/E writes.

| D.md entry | Access | Current state | Verdict |
|---|---|---|---|
| `docs/tranches/D/audit/W0-overfitting-{ui,custom,composables,styles}.md` | create | absent dynamic group | OK - owned by D.W0.A |
| `docs/tranches/D/audit/W0-overfitting.md` | create | absent | OK - owned by D.W0.A integration |
| `docs/tranches/D/audit/W0-triage.md` | create | absent | OK - owned by D.W0.B |
| `docs/tranches/D/audit/W0-already-resolved.md` | create | absent | OK - owned by D.W0.B |
| `docs/tranches/D/audit/W0-facade-list.md` | create | absent before this commit | OK - owned by D.W0.C |
| `docs/tranches/D/audit/W0-sidebar-plan.md` | create | absent before this commit | OK - owned by D.W0.D |
| `docs/tranches/D/audit/W0-file-bounds.md` | create | absent before this commit | OK - owned by D.W0.E |
| `demo/stories/data/search.vue` | create | absent | OK - W1.A create target |
| `demo/stories/containers/glass-carousel.vue` | create | absent | OK - W1.B create target |
| `demo/stories/data/sortable-list.vue` | modify | present | OK |
| `demo/stories/foundations/paper-glass.vue` | modify | present | OK - W1.C modify target |
| `demo/stories/motion/metaballs.vue` | create | absent | OK - W1.C create target |
| `demo/stories/navigation/{dock,dock-layers}.vue` | modify | both present | OK |
| existing `demo/stories/{feedback,containers,compositions,primitives}/*.vue` | modify | present category dirs | OK |
| `demo/stories/manifest.ts` | modify-disjoint-hunks | present | OK |
| `src/composables/<deleted>/**` + composable barrels | modify/delete | dynamic | OK - resolved by W0.B |
| `src/components/custom/<deleted>/**` | delete | none planned after W0.B | OK - fresh W2 preflight only |
| `src/components/ui/<facade-deletes>/**` | delete | dynamic | OK - resolved by W0.C |
| `src/composables/sidebar/**` | create+rename | absent | OK - W2.C target clear |
| `src/components/custom/sidebar/composables/` | delete | present | OK - W2.C source exists |
| `src/components/custom/sidebar/{index.ts,ProgressiveSidebar.vue,types.ts}` | modify | all present | OK |
| `src/composables/index.ts` | modify | present | OK |
| `src/styles/<files>` | modify | dynamic | OK - resolved by W0.B styles rows |
| `docs/consumer-evidence/<artefact>.md` | create | dynamic | OK - W3.A |
| `docs/consumer-evidence/README.md` | create | absent | OK - W3.B |
| `docs/audits/overfitting-audit.md` | modify | present | OK |
| `tsconfig.src.json` | create | absent | OK - no pre-existing conflict |
| `vite.iter.config.ts` | create | absent | OK - no pre-existing conflict |
| `vitest.config.ts` | create | absent | OK - no pre-existing conflict |
| `tests/<area>/<component>.spec.ts` | create | absent dynamic tree | OK - W4.C |
| `scripts/validate-consumers.sh` | create | absent | OK - no pre-existing conflict |
| `scripts/ay-close.sh` | create | absent | OK - no pre-existing conflict |
| `package.json` | modify-disjoint-hunks | present | OK |
| `docs/tranches/D/audit/W5-overfitting-*.md` | create | absent dynamic group | OK - W5.A |
| `docs/tranches/D/FINAL.md` | create | absent | OK - W5.C |
| `docs/tranches/D/audit/D-retro.md` | create | absent | OK - W5.D |

## W1 allow-list disjointness

W1 write set:

```text
demo/stories/data/search.vue
demo/stories/containers/glass-carousel.vue
demo/stories/data/sortable-list.vue
demo/stories/foundations/paper-glass.vue
demo/stories/motion/metaballs.vue
demo/stories/navigation/dock.vue
demo/stories/navigation/dock-layers.vue
demo/stories/primitives/toggle.vue
demo/stories/manifest.ts
```

Verdict: no W1 path is also in W2's source-tree delete/hoist allow-list. `demo/stories/manifest.ts` is shared only within W1 and is explicitly marked `modify-disjoint-hunks`.

## W2 allow-list disjointness

W2 write set:

```text
src/composables/<deleted-files>
src/composables/**/index.ts
src/components/custom/<deleted-packages>/** (fresh preflight only)
src/components/custom/index.ts
src/components/ui/<facade-deletes>/**
src/components/ui/index.ts
src/composables/sidebar/**
src/components/custom/sidebar/composables/
src/components/custom/sidebar/index.ts
src/components/custom/sidebar/ProgressiveSidebar.vue
src/composables/index.ts
src/styles/<files>
src/index.ts
CLAUDE.md
```

Verdict: W2 is disjoint from W1. Inside W2, `src/index.ts` and `CLAUDE.md` are sequenced orchestrator-consolidation files per W2.E, not concurrent sub-agent edit targets. W2.C owns sidebar hoist paths exclusively.

## W1/W2 intersection

| Check | Result |
|---|---:|
| W1 concrete/demo paths intersect W2 source/docs paths | 0 |
| W1 create targets intersect W2 delete targets | 0 |
| W1 manifest edits intersect W2 source edits | 0 |
| W1/W2 intersection verdict | pass |

## Close addendum after W0 triage

W0.B's binding ledger superseded several draft W1/W2 guesses:

- `demo/stories/navigation/progressive-sidebar.vue` is retired from W1 because the sidebar rows moved to `W0-already-resolved.md`; the existing `demo/stories/navigation/sidebar.vue` remains the current story proof.
- D.W1.C now owns `demo/stories/foundations/paper-glass.vue` and `demo/stories/motion/metaballs.vue` for `GlassPanel`, `MetaballCanvas`, and `useMetaballs`.
- D.W1.E now owns only `demo/stories/primitives/toggle.vue` for `ToggleChip`.
- D.W2.A now owns composable delete rows in `src/composables/**` plus related composable barrels; W0 closed with no planned custom-component package deletes.

Updated W1 paths remain under `demo/stories/**`; updated W2.A paths remain under `src/composables/**`. The W1/W2 intersection is still empty.

## W4 tooling conflict check

Current filesystem check:

```text
ls: scripts/ay-close.sh: No such file or directory
ls: scripts/validate-consumers.sh: No such file or directory
ls: tsconfig.src.json: No such file or directory
ls: vite.iter.config.ts: No such file or directory
ls: vitest.config.ts: No such file or directory
package.json present
```

Verdict: W4 create targets are absent and do not conflict with existing tooling files. `package.json` exists and is correctly marked `modify-disjoint-hunks` with orchestrator consolidation.

## Summary verdicts

| Gate item | Verdict |
|---|---|
| D.md critical files have valid owners and path states | pass |
| W1 allow-lists disjoint except declared W1 manifest shared-hunk file | pass |
| W2 allow-lists disjoint from W1 | pass |
| W1/W2 intersection | empty |
| W4 tooling files already present | no |
| W4 tooling create targets clear | pass |
