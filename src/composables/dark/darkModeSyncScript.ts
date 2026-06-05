// @mkbabb/glass-ui/composables/dark — the FOUC parse-time primitive (AU.W9.B #22)
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
// beside `useGlobalDark` + `installDarkModeSync` (the dark-mode-sync family),
// per the AP.W3 relocation precedent.
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
    // The emitted body is an IIFE so it leaks no globals. It mirrors the
    // useGlobalDark runtime contract: storage key → mode string → dark boolean
    // (auto/null/unknown ↦ prefers-color-scheme), then classList + colorScheme.
    return `(function(){try{var m=localStorage.getItem(${JSON.stringify(
        key,
    )});var d=m==="${DARK_CLASS}"||((m===null||m==="auto")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("${DARK_CLASS}",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;
}
