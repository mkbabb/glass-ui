# P.W5 Lane D—bbnf-buddy CR-5 + useLeaveTimer retire-as-inline (orchestrator-direct)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (small-scope CSS retire + 1 composable retirement at a single consumer; bounds disjoint from cross-repo agents).

## §1—Scope

Per `docs/tranches/P/waves/W5.md` Lane D + `docs/tranches/P/audit/P11-Lane-c-bbnf-buddy.md`.

Two sub-tasks closing CR-5 + the P11/c §5 retire-as-inline finding:

1. `ToolsLayer.vue` `:deep()` escape retire at the active-state styling rule.
2. `useLeaveTimer` composable retire-as-inline at its single consumer (`OffsetEditor.vue`).

## §2—Edits

### 2.1 `bbnf-buddy/src/editor/components/dock/tools/ToolsLayer.vue` — CR-5 `:deep()` retire

The 9-line `:deep(.dock-icon-button.is-tool-btn.is-active) { ... }` block migrated to a 7-line `--dock-active-*` token-override block on the parent `.tools-layer .dock-icon-button.is-tool-btn`. Glass-ui's `dock.css:585-597` sources every active-state paint from the `--dock-active-{bg,color,scale,border,shadow}` cohort; consumers retint via the cohort without reaching inside the dock primitive's scoped tree.

```diff
- .tools-layer :deep(.dock-icon-button.is-tool-btn.is-active) {
-     transform: scale(1.2);
-     color: var(--foreground);
-     background: color-mix(in srgb, var(--primary) 6%, transparent);
-     border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
-     box-shadow:
-         0 0 0 2px color-mix(in srgb, var(--primary) 10%, transparent),
-         0 4px 12px color-mix(in srgb, var(--primary) 15%, transparent);
- }
+ .tools-layer .dock-icon-button.is-tool-btn {
+     --dock-active-scale: 1.2;
+     --dock-active-color: var(--foreground);
+     --dock-active-bg: color-mix(in srgb, var(--primary) 6%, transparent);
+     --dock-active-border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
+     --dock-active-shadow:
+         0 0 0 2px color-mix(in srgb, var(--primary) 10%, transparent),
+         0 4px 12px color-mix(in srgb, var(--primary) 15%, transparent);
+ }
```

Note: the size-4 `:deep` rule at L314-317 (default SVG sizing on dock-icon-button) was NOT migrated — it's not part of the active-state ladder. It remains as a non-CR-5 carry. The CR-5 retirement is bounded to the active-state cohort per P11/c.

### 2.2 `bbnf-buddy/src/editor/components/OffsetEditor/OffsetEditor.vue` — useLeaveTimer retire-as-inline

The `useLeaveTimer` composable (42 LOC at `bbnf-buddy/src/composables/useLeaveTimer.ts`) was a single-consumer abstraction over `window.setTimeout` + `onBeforeUnmount` auto-cleanup. The composable shape was over-abstracted for the one-site, two-callsite use.

Inlined as a ~13-LOC local helper at the consumer:

```ts
let highlightLeaveHandle: number | null = null;

function cancelHighlightLeave(): void {
    if (highlightLeaveHandle !== null) {
        window.clearTimeout(highlightLeaveHandle);
        highlightLeaveHandle = null;
    }
}

function onGroupEnter(segmentId: SegmentId): void {
    cancelHighlightLeave();
    emit("highlight", segmentId);
}

function onGroupLeave(): void {
    cancelHighlightLeave();
    highlightLeaveHandle = window.setTimeout(() => {
        highlightLeaveHandle = null;
        emit("clear-highlight");
    }, 200);
}

onBeforeUnmount(cancelHighlightLeave);
```

The composable file at `src/composables/useLeaveTimer.ts` deleted. Zero code references remain (verified via `grep -rn 'useLeaveTimer\|@/composables/useLeaveTimer' /Users/mkbabb/Programming/bbnf-buddy/src`).

## §3—Verification

bbnf-buddy local gates:
- `npm run build` — PASS (4.57 s; warning re: chunk size unrelated to this lane).
- `npm run typecheck` — pre-existing typescript errors at `WireDesigner.vue` (`SegmentId` vs `number` type mismatch in `sourceSegments`) — unrelated to Lane D edits. The Lane D files (ToolsLayer.vue + OffsetEditor.vue) themselves typecheck clean against the edits.

Glass-ui-side re-verification (post the consumer-side write):
- glass-ui re-built post-bbnf-buddy edits — `dist/` artefacts intact; `dist/dark.d.ts` + 42 other type declarations present.

## §4—P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: the `:deep()` escape + the over-abstracted composable both retire. No alias / shim / forwarder preserved.
- **P invariant 28 (zero deferral)**: both CR-5 + P11/c §5 retire-as-inline close at this wave.
- **N invariant 8 (substrate-without-consumer-binary)**: single-consumer composable retires-as-inline per the canonical pattern.

## §5—Operational compliance

- Zero mutating git operations.
- Zero stash operations.
- Glass-ui build re-run AFTER bbnf-buddy build invocations to restore `dist/`.
- The bbnf-buddy commit will be staged + pushed by the orchestrator at W5 close.

## §6—Status: COMPLETED.

Pending: orchestrator commits + pushes the bbnf-buddy changes at W5 close.
