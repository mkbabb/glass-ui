import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

// `useGlobalDark` is a module-level singleton, so every case imports a fresh copy
// of the module. The system scheme is a stubbed `prefers-color-scheme` query.
async function freshUseGlobalDark() {
    vi.resetModules();
    const mod = await import("@glass/composables/dark/useGlobalDark");
    return mod.useGlobalDark;
}

// A Map-backed store: Node's own localStorage is disabled in this environment.
function memoryStorage(): Storage {
    const items = new Map<string, string>();
    return {
        get length() {
            return items.size;
        },
        clear: () => items.clear(),
        getItem: (k) => items.get(k) ?? null,
        key: (i) => [...items.keys()][i] ?? null,
        removeItem: (k) => void items.delete(k),
        setItem: (k, v) => void items.set(k, String(v)),
    };
}

let systemDark = false;
const originalMatchMedia = window.matchMedia;
let localStorage: Storage;

beforeEach(() => {
    localStorage = memoryStorage();
    Object.defineProperty(window, "localStorage", { value: localStorage, configurable: true });
    document.documentElement.className = "";
    systemDark = false;
    window.matchMedia = ((query: string) => ({
        matches: query.includes("prefers-color-scheme: dark") ? systemDark : false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as typeof window.matchMedia;
});

afterEach(() => {
    window.matchMedia = originalMatchMedia;
});

describe("useGlobalDark({ storageKey })", () => {
    it("reads and writes the given key, not the default one", async () => {
        // A browser that holds `auto` under the default key, on a light system.
        localStorage.setItem("vueuse-color-scheme", "auto");
        const useGlobalDark = await freshUseGlobalDark();
        const { isDark } = useGlobalDark({ storageKey: "site-theme", initialValue: "dark" });
        await nextTick();
        expect(isDark.value).toBe(true);
        expect(localStorage.getItem("site-theme")).toBe("dark");
        expect(localStorage.getItem("vueuse-color-scheme")).toBe("auto");
    });

    it("throws on a conflicting second key and accepts a matching one", async () => {
        const useGlobalDark = await freshUseGlobalDark();
        useGlobalDark({ storageKey: "site-theme" });
        expect(() => useGlobalDark({ storageKey: "site-theme" })).not.toThrow();
        expect(() => useGlobalDark({ storageKey: "other-theme" })).toThrow(/storageKey/);
    });

    it("keeps the default key when none is given", async () => {
        localStorage.setItem("vueuse-color-scheme", "dark");
        const useGlobalDark = await freshUseGlobalDark();
        const { isDark } = useGlobalDark();
        expect(isDark.value).toBe(true);
    });
});

describe("useGlobalDark toggles with an initialValue", () => {
    it("stores the concrete mode when a toggle lands on the system scheme", async () => {
        systemDark = true;
        const useGlobalDark = await freshUseGlobalDark();
        const { isDark, toggleDark } = useGlobalDark({ initialValue: "dark" });
        expect(isDark.value).toBe(true);
        toggleDark();
        await nextTick();
        expect(localStorage.getItem("vueuse-color-scheme")).toBe("light");
        toggleDark();
        await nextTick();
        expect(isDark.value).toBe(true);
        expect(localStorage.getItem("vueuse-color-scheme")).toBe("dark");
    });

    it("resolves a stored auto to the system scheme", async () => {
        systemDark = true;
        localStorage.setItem("vueuse-color-scheme", "auto");
        const useGlobalDark = await freshUseGlobalDark();
        const { isDark } = useGlobalDark({ initialValue: "light" });
        expect(isDark.value).toBe(true);
    });

    it("stores auto without an initialValue when a toggle lands on the system scheme", async () => {
        systemDark = true;
        const useGlobalDark = await freshUseGlobalDark();
        const { isDark, toggleDark } = useGlobalDark();
        expect(isDark.value).toBe(true);
        toggleDark();
        toggleDark();
        await nextTick();
        expect(isDark.value).toBe(true);
        expect(localStorage.getItem("vueuse-color-scheme")).toBe("auto");
    });
});
