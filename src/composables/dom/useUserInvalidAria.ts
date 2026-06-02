// useUserInvalidAria — the `:user-invalid` → `aria-invalid` bridge (AQ.W4 §W4.4).
//
// Native `:user-invalid`/`:user-valid` are VISUAL states only — they do NOT
// sync ARIA. A screen reader announces nothing when a field paints invalid.
// This composable is the single canonical bridge: it keeps `aria-invalid` in
// step with native validity, mirroring the native "after first interaction"
// timing so a pristine required-empty field is NOT flagged on mount, and — in
// fallback mode (engines without `:user-invalid`) — ALSO toggles the
// `.user-invalid-fallback` / `.user-valid-fallback` classes the W4.1 CSS rungs
// key off.
//
// vueuse-free by construction: native `addEventListener`/`removeEventListener`
// only (no `@vueuse/core`), so it is root-barrel safe per the L.W1 SCC-trap
// closure.
//
// Cross-repo coupling (the AQ ↔ muster J seam): J.W6/J.W7 import this from
// `@mkbabb/glass-ui` and call `bind(formRoot)` once per form. J's regression
// suite asserts the REAL `aria-invalid` attribute on the rendered DOM (the
// honest-gate principle), on this timeline: absent on mount, `"true"` after a
// blur on an invalid field, `"false"` once corrected, synced for all controls
// on submit.

export interface UseUserInvalidAriaOptions {
    /**
     * Also toggle the `.user-invalid-fallback` / `.user-valid-fallback`
     * classes the W4.1 CSS rungs key off (for engines without `:user-invalid`
     * support).
     *
     * Default: auto — `true` only when `CSS.supports('selector(:user-invalid)')`
     * resolves `false`. Pass an explicit boolean to force the path (e.g. for a
     * test that stubs feature detection).
     */
    fallbackClasses?: boolean;
}

export interface UseUserInvalidAriaReturn {
    /**
     * Attach the bridge to a scope root (a `<form>`, `<fieldset>`, or field
     * wrapper). Wires capture-phase `blur` + `input` + `submit` listeners that
     * sync `aria-invalid` (and, in fallback mode, the validity classes) on the
     * scope's form controls. Idempotent per call; returns a stop fn that
     * removes the listeners and clears the per-control interaction tracking.
     */
    bind: (root: HTMLElement) => () => void;
}

/** A control whose native validity we mirror onto `aria-invalid`. */
type ValidatableControl = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) & {
    checkValidity: () => boolean;
};

function supportsUserInvalid(): boolean {
    return (
        typeof CSS !== "undefined" &&
        typeof CSS.supports === "function" &&
        CSS.supports("selector(:user-invalid)")
    );
}

/**
 * The `:user-invalid` → `aria-invalid` bridge. Wired on `blur` (capture —
 * show error on field-exit), `input` (clear error on correction), and
 * `submit` (sync all controls; submission counts as interaction). The setting
 * of `aria-invalid="true"` is gated on first interaction per control (a
 * `WeakSet`) so a pristine required-empty field is never flagged on mount;
 * the `input` handler only CLEARS — never sets — so a programmatic `v-model`
 * write can at worst clear a stale error, never mint a false one.
 */
export function useUserInvalidAria(
    opts: UseUserInvalidAriaOptions = {},
): UseUserInvalidAriaReturn {
    const fallback = opts.fallbackClasses ?? !supportsUserInvalid();

    const bind = (root: HTMLElement): (() => void) => {
        // Per-control first-interaction set — `aria-invalid="true"` only after
        // the user has blurred/submitted, mirroring native `:user-invalid`.
        const interacted = new WeakSet<ValidatableControl>();

        const sync = (el: EventTarget | null): void => {
            const c = el as ValidatableControl | null;
            if (!c?.checkValidity) return;
            const ok = c.checkValidity();
            c.setAttribute("aria-invalid", ok ? "false" : "true");
            if (fallback) {
                c.classList.toggle("user-invalid-fallback", !ok);
                c.classList.toggle("user-valid-fallback", ok);
            }
        };

        const onBlur = (e: Event): void => {
            const c = e.target as ValidatableControl | null;
            if (!c?.checkValidity) return;
            interacted.add(c);
            sync(c);
        };

        // `input` only CLEARS (never mints) — and only on a control the user
        // has already interacted with, so a correction lifts the error live
        // while a programmatic pre-blur write cannot flag a pristine field.
        const onInput = (e: Event): void => {
            const c = e.target as ValidatableControl | null;
            if (!c?.checkValidity || !interacted.has(c)) return;
            if (c.checkValidity()) sync(c);
        };

        // Submit counts as interaction for EVERY control — the browser focuses
        // the first invalid field, so the announced state must be in step.
        const onSubmit = (): void => {
            const controls = root.querySelectorAll<ValidatableControl>(
                "input, textarea, select",
            );
            for (const c of controls) {
                if (!c.checkValidity) continue;
                interacted.add(c);
                sync(c);
            }
        };

        root.addEventListener("blur", onBlur, true);
        root.addEventListener("input", onInput, true);
        root.addEventListener("submit", onSubmit, true);

        return () => {
            root.removeEventListener("blur", onBlur, true);
            root.removeEventListener("input", onInput, true);
            root.removeEventListener("submit", onSubmit, true);
        };
    };

    return { bind };
}
