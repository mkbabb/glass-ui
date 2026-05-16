# P.W1 Lane B—Dock barrel re-export (P11/b CR-2 prerequisite)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (per AGENT.md "befitting direct edit"—7-line additive re-export; bounds disjoint from Lane A + Lane C).

## §1—Scope

Per `docs/tranches/P/waves/W1.md` Lane B + `docs/tranches/P/audit/P11-Lane-b-fourier-analysis.md` (P11/b CR-2 ESCALATION).

The fourier-analysis consumer at v1.7.0 has 2 silent `inject<...>("dockKeepOpen", null)` sites (`SliderControl.vue:24-25` + `GlassTimeline.vue:12-13`) that no-op since O.W2 retired the legacy string keys and replaced them with the typed `DOCK_CONTEXT_KEY`. The migration target—`useOptionalDockContext()`—was reachable only via deep import at HEAD (`src/components/custom/dock/composables/dockContext`), which the `@mkbabb/glass-ui/dock` subpath did NOT publish.

Lane B closes the gap by re-exporting the dock-context canonical DI primitives from `src/components/custom/dock/index.ts`, unblocking the P.W5 Lane B fourier-analysis migration.

## §2—Edit

`src/components/custom/dock/index.ts` gains an additive re-export block:

```ts
// P.W1 Lane B—Fix 2 (P11/b CR-2 prerequisite): re-export the dock-context
// canonical DI primitives so consumers can migrate from the retired
// pre-O.W2 string keys (`"dockKeepOpen"` / `"dockRelease"`) to the typed-key
// helpers without reaching for the deep-import path.
export {
    DOCK_CONTEXT_KEY,
    useDockContext,
    useOptionalDockContext,
    provideDockContext,
    type DockContext,
    type DockOrientation,
} from "./composables/dockContext";
```

The 4 runtime symbols + 2 types reach the consumer surface at the `@mkbabb/glass-ui/dock` subpath. The deep-import path remains functional (no break); consumers may flip via the `from "./composables/dockContext"` literal rewrite in a single line per call site.

## §3—Source verification

`src/components/custom/dock/composables/dockContext.ts` exports (grep'd):

```
export type DockOrientation = "horizontal" | "vertical";
export interface DockContext { ... }
export const DOCK_CONTEXT_KEY: InjectionKey<DockContext> = Symbol("glass-ui:dock-context");
export function provideDockContext(context: DockContext): void { ... }
export function useDockContext(): DockContext { ... }
export function useOptionalDockContext(): DockContext | null { ... }
```

All 6 symbols on the source-side; all 6 re-exported. Zero net rename or API-shape change at the source.

## §4—Verification

Run inline at the W1 close gate matrix (orchestrator owns):

- `npm run typecheck`—expected PASS.
- `npm run build`—expected PASS.
- `npm run verify-export-types`—expected PASS (the `@mkbabb/glass-ui/dock` subpath now publishes `useOptionalDockContext` + the DI primitives).

## §5—Lane scope of impact

Library-side: 12 net new lines at `src/components/custom/dock/index.ts` (additive re-export block + rationale comment). Zero existing-export breaks.

Consumer-side (P.W5 Lane B):
- fourier-analysis migrates 2 sites at SliderControl.vue + GlassTimeline.vue from `inject<...>("dockKeepOpen", null)` + `inject<...>("dockRelease", null)` → `const dock = useOptionalDockContext();` + callsite `dock?.keepOpen()` / `dock?.release()`.

The fix-the-functional-regression-at-W5 path is unblocked once W1 lands.

## §6—P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: re-export is forward-only; no legacy string-key alias preserved. The pre-O.W2 keys remain retired.
- **P invariant 28 (zero deferral)**: the substrate prerequisite lands at W1; the consumer migration lands at W5—within P, no carry-forward.
- **P invariant 6 (vueuse-FREE root barrel)**: not applicable directly; the `@mkbabb/glass-ui/dock` subpath has always been a flat subpath (not root-barrel), and `dockContext.ts` carries no vueuse imports.

## §7—Status: COMPLETED.
