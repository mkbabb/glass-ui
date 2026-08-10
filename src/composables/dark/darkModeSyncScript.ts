// @mkbabb/glass-ui/composables/dark — the FOUC parse-time primitive
//
// `darkModeSyncScript()` is a PURE function returning the inline `<head>` script
// STRING that resolves the dark/light theme and stamps `document.documentElement`
// BEFORE first paint — the flash-of-unstyled-theme (FOUC) eliminator. A
// `light-dark()`-consuming app that defers theme resolution to a runtime composable
// flashes the wrong theme on the first frame; injecting this string as a blocking
// `<head>` script (or into an SSR head) sets the `.dark` class + `color-scheme`
// at parse time so the very first paint is correct.
//
// vueuse-FREE by construction — this module emits a string and touches no
// `@vueuse/core` symbol, so it can ride the root barrel; but it homes on `/dark`
// beside `useGlobalDark` + `installDarkModeSync` (the dark-mode-sync family).
//
// The emitted script MIRRORS the `useGlobalDark` runtime contract EXACTLY so the
// parse-time and runtime paths agree:
//   - reads the SAME storage key vueuse's `useDark`/`useColorMode` uses
//     (`vueuse-color-scheme`; the `useStorage` `string` serializer stores the raw
//     mode string `"dark"` / `"light"` / `"auto"`, no JSON quoting);
//   - on `"auto"` / missing / unknown, falls back to `prefers-color-scheme`
//     (vueuse's `system` resolution for the `auto` mode);
//   - toggles `document.documentElement.classList` with the `"dark"` class
//     (vueuse `valueDark = "dark"`, selector `html`, attribute `class`);
//   - sets `document.documentElement.style.colorScheme` (`useGlobalDark.ts`'s
//     Safari recalc watch — `dark ? "dark" : "light"`).

/** The localStorage key vueuse `useColorMode`/`useDark` defaults to. The
 * `useGlobalDark` factory passes no `storageKey`, so this default is canonical. */
export const DARK_MODE_STORAGE_KEY = "vueuse-color-scheme";

/** The class vueuse adds to `<html>` for the dark mode (`valueDark = "dark"`). */
const DARK_CLASS = "dark";

export interface DarkModeSyncScriptOptions {
    /**
     * Override the localStorage key the emitted script reads. Defaults to
     * `vueuse-color-scheme` — the key `useGlobalDark`'s underlying `useDark`
     * uses. Override ONLY if a consumer reconfigured the vueuse storage key.
     */
    storageKey?: string;
    /**
     * What an ABSENT or `"auto"` stored mode resolves to. `"os"` (the default)
     * follows `prefers-color-scheme`, which is right for an app. `false`/`true`
     * resolve DETERMINISTICALLY, which is right for a document that must not flip
     * with the projector's OS theme — a briefing, a print target, a capture.
     */
    defaultDark?: boolean | "os";
    /**
     * Honour `?light` / `?dark` in the query string, above storage and above the
     * default. This is the capture-forcing seam: a screenshot pipeline asks for a
     * mode in the URL rather than driving a toggle and hoping.
     */
    queryOverride?: boolean;
    /**
     * Write the RESOLVED mode back to storage, so an absent or `"auto"` value
     * becomes a concrete `"dark"`/`"light"` at first paint and the runtime
     * composable and the stamp cannot disagree about what `auto` meant.
     */
    normalize?: boolean;
}

/**
 * Return the inline `<head>` script STRING that resolves dark/light at parse
 * time and stamps `<html>` before first paint. Inject it as the FIRST blocking
 * script in `<head>` (or into an SSR head):
 *
 * ```html
 * <script>${darkModeSyncScript()}</script>
 * ```
 *
 * The function has no DOM side-effect itself — it only builds a string.
 */
export function darkModeSyncScript(options: DarkModeSyncScriptOptions = {}): string {
    const key = options.storageKey ?? DARK_MODE_STORAGE_KEY;
    const defaultDark = options.defaultDark ?? "os";
    // The absent/auto fallback, as one expression the emitted IIFE evaluates. `"os"`
    // asks the platform; a boolean answers deterministically and asks nothing.
    //
    // NO WRAPPING PARENS on the `"os"` arm, deliberately. It substitutes into an `&&`
    // chain of the same precedence and associativity, so the parens would be inert —
    // and they would change the DEFAULT emission's bytes, which is not an inert thing
    // to do: an inline `<head>` script is exactly what a `script-src 'sha256-…'` CSP
    // pins, and a re-hashed default would be blocked at first paint, silently, in the
    // one place this module exists to keep correct. The default emission is therefore
    // BYTE-IDENTICAL across this addition; only an opt-in arm moves bytes, and a
    // consumer opting in is editing its head script anyway.
    const fallback =
        defaultDark === "os"
            ? `window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches`
            : String(defaultDark);
    // The capture-forcing seam: a query parameter outranks storage entirely.
    const queryArm = options.queryOverride
        ? `var q=new URLSearchParams(location.search);if(q.has("dark")){d=true;}else if(q.has("light")){d=false;}`
        : "";
    // Resolve `auto`/absent into a concrete stored mode so the runtime composable
    // and this stamp cannot disagree about what `auto` meant.
    const normalizeArm = options.normalize
        ? `localStorage.setItem(${JSON.stringify(key)},d?"dark":"light");`
        : "";
    // The emitted body is an IIFE so it leaks no globals. It mirrors the
    // useGlobalDark runtime contract: storage key → mode string → dark boolean
    // (auto/null/unknown ↦ prefers-color-scheme), then classList + colorScheme.
    // fail-explicit: befitting — the EMITTED inline `<head>` script's `catch(_){}`
    // must swallow (e.g. localStorage throws in privacy mode) so a storage failure
    // never breaks first paint; the page degrades to prefers-color-scheme. This is
    // a runtime-emitted string, not source control flow.
    return `(function(){try{var m=localStorage.getItem(${JSON.stringify(
        key,
    )});var d=m==="${DARK_CLASS}"||((m===null||m==="auto")&&${fallback});${queryArm}${normalizeArm}var e=document.documentElement;e.classList.toggle("${DARK_CLASS}",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;
}
