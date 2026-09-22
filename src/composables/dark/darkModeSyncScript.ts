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
//   - on `"auto"` / missing, falls back to `prefers-color-scheme` (vueuse's
//     `system` resolution for the `auto` mode). [2026-09-17 · O-20 CUT-6..8 — the
//     line read "`auto` / missing / ~~unknown~~" and the third term was never
//     true: an unrecognised stored value (`"garbage"`, `"system"`, `""`) resolves
//     LIGHT, measured on the published 9.0.0 emission. Struck, not cured: the
//     resolution is unchanged by this pass and the ledger's CUT-6..8 cure list
//     does not carry it.];
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
     *
     * The scalar forms answer BOTH cases at once. The object form answers them
     * SEPARATELY, which is the only way to say "a first visit is a deliberate
     * light document, but a reader who chose `auto` gets their platform":
     *
     * ```ts
     * darkModeSyncScript({ defaultDark: { absent: false, auto: "os" } });
     * ```
     *
     * No scalar reproduces that pair — `false` makes `auto` mean light and `"os"`
     * makes a first visit follow the OS — which is why a consumer with the split
     * policy hand-rolls the whole `<head>` block instead of calling this.
     *
     * [2026-09-22 · register-wave N-3 — an UNREADABLE store (a throwing
     * `localStorage` accessor or `getItem`) counts as ABSENT: the scalar forms
     * fall to their one arm, the object form to `absent`.]
     */
    defaultDark?: boolean | "os" | { absent: boolean | "os"; auto: boolean | "os" };
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
     *
     * The write is emitted AFTER the stamp, so a storage that throws on write
     * (quota, privacy mode, a sandboxed origin) costs the write-back and nothing
     * else — the page is already themed when it fails.
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
    // One fallback arm, as the expression the emitted IIFE evaluates. `"os"` asks the
    // platform; a boolean answers deterministically and asks nothing.
    //
    // NO WRAPPING PARENS on the `"os"` arm, deliberately. It substitutes into an `&&`
    // chain of the same precedence and associativity, so the parens would be inert —
    // and they would change the DEFAULT emission's bytes, which is not an inert thing
    // to do: an inline `<head>` script is exactly what a `script-src 'sha256-…'` CSP
    // pins, and a re-hashed default would be blocked at first paint, silently, in the
    // one place this module exists to keep correct. The default emission is therefore
    // BYTE-IDENTICAL across this addition; only an opt-in arm moves bytes, and a
    // consumer opting in is editing its head script anyway. [2026-09-22 · register-wave
    // N-3 — true of that addition, and of the scalar sentence below. The 10.0.0 read
    // hardening moves every emission once, by ruling: a major is where a pinned hash
    // lawfully moves, and the old→new pair is in MIGRATION.md §10.0.0.]
    const arm = (value: boolean | "os") =>
        value === "os"
            ? `window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches`
            : String(value);
    // A scalar answers the absent and `"auto"` cases with ONE arm, welded — that is
    // the pre-widening emission, kept to the byte for the CSP reason above. The object
    // form emits the two cases as two tests, which is the whole point of it: absent
    // and `"auto"` are different questions ("no one has chosen" vs "the reader chose
    // the platform") and a policy may answer them differently.
    const fallback =
        typeof defaultDark === "object"
            ? `(m==null&&${arm(defaultDark.absent)})||(m==="auto"&&${arm(defaultDark.auto)})`
            : `(m==null||m==="auto")&&${arm(defaultDark)}`;
    // The capture-forcing seam: a query parameter outranks storage entirely.
    const queryArm = options.queryOverride
        ? `var q=new URLSearchParams(location.search);if(q.has("dark")){d=true;}else if(q.has("light")){d=false;}`
        : "";
    // Resolve `auto`/absent into a concrete stored mode so the runtime composable
    // and this stamp cannot disagree about what `auto` meant. Emitted LAST, after the
    // stamp: `setItem` is the one call in this body that a real browser throws from
    // (quota, privacy mode, a sandboxed origin), and the `catch(_){}` below swallows
    // whatever throws — so anything emitted after the write is skipped when it throws.
    // With the write ordered first, `{normalize:true}` bought a failed write at the
    // price of the whole stamp and the page painted unthemed: the exact flash this
    // module exists to remove, in the arm that asked for MORE determinism.
    const normalizeArm = options.normalize
        ? `localStorage.setItem(${JSON.stringify(key)},d?"dark":"light");`
        : "";
    // The emitted body is an IIFE so it leaks no globals. It mirrors the
    // useGlobalDark runtime contract: storage key → mode string → dark boolean
    // (auto/null ↦ the fallback arm), then classList + colorScheme.
    // fail-explicit: befitting — the EMITTED inline `<head>` script's `catch(_){}`
    // must swallow (e.g. localStorage throws in privacy mode) so a storage failure
    // never breaks first paint; ~~the page degrades to prefers-color-scheme~~. This
    // is a runtime-emitted string, not source control flow. [2026-09-17 · O-20
    // CUT-6..8 — false: the read is the first statement inside the one try, so a
    // `getItem`/`localStorage` accessor throw (privacy mode, sandboxed origin) skips
    // the WHOLE body and the page is unstamped, measured on the published 9.0.0 and
    // the cured emission (dark=false, colorScheme=""). Only the WRITE side is
    // fail-open after this pass; an inner try around the read would move the 300 B
    // default and re-pin its CSP hash, which the ledger forbids. Struck, not cured.]
    // [2026-09-22 · register-wave N-3 — cured at 10.0.0, where the hash may move. The
    // read has its own inner `try`: a throwing accessor leaves `m` undefined, `m==null`
    // takes it as absent, and the fallback arm stamps — so for the default the struck
    // sentence is true again. The outer `try` stays for the write-back.]
    return `(function(){try{try{var m=localStorage.getItem(${JSON.stringify(
        key,
    )})}catch(_){}var d=m==="${DARK_CLASS}"||(${fallback});${queryArm}var e=document.documentElement;e.classList.toggle("${DARK_CLASS}",d);e.style.colorScheme=d?"dark":"light";${normalizeArm}}catch(_){}})();`;
}
