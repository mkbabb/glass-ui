// @mkbabb/glass-ui/forms — curated form primitives
//
// Input and Textarea remain isolated from the root because they import
// `@vueuse/core`.
//
// Root-barrel re-exports of these symbols remain in place alongside the
// additive subpath split.
//
// The form-validity bridge ships here too. `useUserInvalidAria` is
// vueuse-free (native listeners only), so it is ALSO reachable on the root
// barrel; co-locating it on `/forms` lets a consumer pull the validation
// vocabulary (Input/Textarea + the `aria-invalid` bridge) from one subpath.
export * from "./components/input";
export * from "./components/textarea";
export {
    useUserInvalidAria,
    type UseUserInvalidAriaOptions,
    type UseUserInvalidAriaReturn,
} from "./composables/dom/useUserInvalidAria";
// The shared control-size union the form register (Input/Switch/Textarea/
// NumberFieldInput) threads as `size?` — the published home for the type the dropped
// `/api` discovery layer pinned (MIGRATION.md 5.0.0 /api-fold: `ControlSize` → `/forms`).
// Type-only re-export of the `_shared` source (the form-family shared home).
export type { ControlSize } from "./components/_shared";
