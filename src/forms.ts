// @mkbabb/glass-ui/forms — vueuse-bearing form primitives
//
// This subpath isolates the components that import from `@vueuse/core`
// (Input, Textarea, the Combobox* family) so consumers can opt into them
// without dragging the vueuse → Vue runtime SCC into their entry chunk.
//
// Root-barrel re-exports of these symbols remain in place during Phase 1
// (additive subpath split, v0.9.3). Phase 2 (root-barrel removal) is
// scheduled with v1.0. See `docs/tranches/K/waves/W-S.md`.
//
// AQ.W4 — the form-validity bridge ships here too. `useUserInvalidAria` is
// vueuse-free (native listeners only), so it is ALSO reachable on the root
// barrel; co-locating it on `/forms` lets a consumer pull the validation
// vocabulary (Input/Textarea + the `aria-invalid` bridge) from one subpath.
export * from "./components/ui/input";
export * from "./components/ui/textarea";
export * from "./components/ui/combobox";
export {
    useUserInvalidAria,
    type UseUserInvalidAriaOptions,
    type UseUserInvalidAriaReturn,
} from "./composables/dom/useUserInvalidAria";
