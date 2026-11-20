// Runs `darkModeSyncScript` and then `useGlobalDark` with the key and seed named in
// the query (`?key=site-theme&initial=dark`), the way a host page pairs them, and
// exposes the result on `window.__dark` for the spec to read and drive.
import { darkModeSyncScript } from "../../src/composables/dark/darkModeSyncScript";
import { useGlobalDark, type GlobalColorSchema } from "../../src/composables/dark/useGlobalDark";

const params = new URLSearchParams(location.search);
const storageKey = params.get("key") ?? undefined;
const initialValue = (params.get("initial") ?? undefined) as GlobalColorSchema | undefined;
const defaultDark = initialValue === undefined || initialValue === "auto" ? "os" : initialValue === "dark";

new Function(darkModeSyncScript({ storageKey, defaultDark }))();
const stamped = document.documentElement.classList.contains("dark");

const { isDark, toggleDark } = useGlobalDark({ storageKey, initialValue });

(window as unknown as { __dark: unknown }).__dark = {
    stamped,
    isDark: () => isDark.value,
    toggle: () => toggleDark(),
};
document.body.dataset.ready = "1";
