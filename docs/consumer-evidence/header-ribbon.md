# HeaderRibbon

## Artefact path

`src/components/custom/header-ribbon/` (the published subpath `@mkbabb/glass-ui/header-ribbon`).

## Verdict

`keep-current` — **RESTORED at AZ.W-PRUNE2 on the live keyframes.js binary consumer.** The
AY/AZ prune census (W-PRUNE/W-SB1) wrongly counted HeaderRibbon as a 0-consumer orphan and retired
it (component dir + types + `/header-ribbon` subpath + the `HeaderRibbonPosition`/`HeaderRibbonProps`
api seats + demo story, deleted at `c90f4aee`). The census missed keyframes.js: it is a live
external binary consumer of `@mkbabb/glass-ui/header-ribbon`. Consumer-truth wins — the surface
un-prunes. `HeaderRibbon` is the hover-tracking ribbon — an anchor button reveals a control row then
auto-collapses; the anchor slot exposes pinned / toggled state.

## Consumer proof (re-runnable; re-grounded AZ.W-PRUNE2 2026-06-11)

**External consumers — 1 (keyframes.js, the binary consumer at the committed HEAD).**

```bash
# committed keyframes HEAD — the census record the RESTORE ruling rests on:
git -C ~/Programming/keyframes.js show HEAD:demo/@/components/custom/editor-shell/EditorShell.vue \
  | grep -n 'HeaderRibbon\|header-ribbon'
#  10:        <HeaderRibbon ref="headerRibbonRef" position="right">
#  44:        </HeaderRibbon>
# 101:import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
# 151:const headerRibbonRef = useTemplateRef<InstanceType<typeof HeaderRibbon>>("headerRibbonRef");
```

`keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue` imports `HeaderRibbon` from
`@mkbabb/glass-ui/header-ribbon`, mounts it `position="right"` as the editor header chrome, and binds
a template ref to its exposed instance (the pin/toggle/collapse anchor contract).

**Internal consumers — 1 demo (the showcase story, NOT counted).**

```bash
grep -rln 'HeaderRibbon' demo/   # → demo/stories/navigation/header-ribbon.vue (own-route showcase — own-story exclusion)
```

## In-flight migration — the re-audit trigger

There is an UNCOMMITTED working-tree migration in keyframes.js (a sibling lane, edits NOT yet
committed at this wave's HEAD) that re-expresses the editor header chrome with a local
`EditorHeader.vue` (a faithful re-expression of the ribbon's `#left`/`#items`/`#anchor` slots + the
pin/toggle/collapse behaviour) instead of `<HeaderRibbon>`. Until that migration COMMITS, the
committed keyframes HEAD is the binding record and the binary consumer is live. The named re-audit
signal: when the keyframes.js migration COMMITS (the local `EditorHeader.vue` replaces the
`<HeaderRibbon>` mount in the keyframes HEAD), re-grade this artefact — if no second external
consumer has arrived, RETIRE the `/header-ribbon` subpath + the api seats + the component dir again
(a clean re-prune, honest this time).

## The named ≥2-consumer TRIGGER

The binding close-criterion is a SECOND real consumer composing `<HeaderRibbon>` (a sibling repo, a
domain-themed header strip, a library surface). When the second ships, record it here; the component
clears the ≥2-consumer bar on its own.

## Re-audit proof

This document satisfies `proof:component-orphan` `keep-current` for `HeaderRibbon` while the
committed keyframes-HEAD grep finds the consumer. If both (a) the keyframes migration commits AND
(b) no second consumer has arrived, the verdict re-grades to `library-orphan` — formally re-retire
the subpath + export + the component dir.

**Re-audit date: 2026-09-01.**

## Cross-references

- `keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue` (the external binary consumer at HEAD).
- `src/components/custom/header-ribbon/HeaderRibbon.vue` (the hover-tracking anchor-reveal ribbon).
- `demo/stories/navigation/header-ribbon.vue` (the showcase story — own-route, NOT a counted consumer).
