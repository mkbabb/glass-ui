// `_shared/` — sub-internal boundary inside `ui/`. The leading underscore
// signals private-to-ui/ at runtime (NOT re-exported by `ui/index.ts`).
//
// This barrel exists ONLY so `/api` can pin the canonical `MenuItemVariants`
// type union from a stable home (O.W4 Lane A promotion). Consumer-side
// imports of `menuItemVariants` (the CVA itself) still go through the
// component packages that compose it — `_shared/` is not on the runtime
// public surface.

export { menuItemVariants } from "./menuItemVariants";
export type { MenuItemVariants } from "./menuItemVariants";
