import { describe, expect, it } from "vitest";
import {
    DARK_MODE_STORAGE_KEY,
    darkModeSyncScript,
} from "@glass/composables/dark/darkModeSyncScript";

describe("darkModeSyncScript", () => {
    it("is a pure string emitter (no DOM side-effect at call)", () => {
        const out = darkModeSyncScript();
        expect(typeof out).toBe("string");
        expect(out.length).toBeGreaterThan(0);
    });

    it("reads the SAME storage key useDark/useGlobalDark uses", () => {
        expect(DARK_MODE_STORAGE_KEY).toBe("vueuse-color-scheme");
        const out = darkModeSyncScript();
        expect(out).toContain("vueuse-color-scheme");
        expect(out).toContain("localStorage.getItem");
    });

    it("falls back to prefers-color-scheme on auto/missing", () => {
        const out = darkModeSyncScript();
        expect(out).toContain("(prefers-color-scheme: dark)");
        expect(out).toContain("matchMedia");
        expect(out).toContain('m==="dark"');
        expect(out).toContain('m==="auto"');
    });

    it("toggles the documentElement 'dark' classList — mirrors the runtime contract", () => {
        const out = darkModeSyncScript();
        expect(out).toContain("document.documentElement");
        expect(out).toContain('classList.toggle("dark"');
    });

    it("sets style.colorScheme — mirrors useGlobalDark's Safari recalc watch", () => {
        const out = darkModeSyncScript();
        expect(out).toContain("style.colorScheme");
        expect(out).toContain('d?"dark":"light"');
    });

    it("parses as a valid script via new Function(...)", () => {
        const out = darkModeSyncScript();
        // Throws SyntaxError if the emitted body is not parseable.
        expect(() => new Function(out)).not.toThrow();
    });

    it("honors a custom storageKey override", () => {
        const out = darkModeSyncScript({ storageKey: "my-theme" });
        expect(out).toContain('"my-theme"');
        expect(out).not.toContain("vueuse-color-scheme");
    });

    // The emitted IIFE runs in a `<head>`-script context where `window` is the
    // global. Node's experimental localStorage is disabled in this env, so we
    // run the script against a controlled scope (a stand-in storage + matchMedia
    // + a fresh root) via `with(scope)` — proving the script's resolution logic
    // mirrors the runtime contract on every branch.
    function runScript(opts: {
        stored: string | null;
        prefersDark: boolean;
        startDark: boolean;
    }) {
        const root = { classList: new Set<string>(), style: { colorScheme: "" } };
        if (opts.startDark) root.classList.add("dark");
        const documentElement = {
            classList: {
                toggle: (c: string, on: boolean) =>
                    on ? root.classList.add(c) : root.classList.delete(c),
            },
            style: root.style,
        };
        const matchMedia = (q: string) => ({
            matches: q.includes("dark") && opts.prefersDark,
        });
        const scope = {
            localStorage: { getItem: () => opts.stored },
            // The script reads `window.matchMedia`; provide a self-referential
            // `window` so the `with(scope)` resolution finds it on `window`.
            window: { matchMedia },
            document: { documentElement },
        };
        new Function("scope", `with(scope){${darkModeSyncScript()}}`)(scope);
        return root;
    }

    it("emitted script resolves dark when storage says 'dark'", () => {
        const root = runScript({ stored: "dark", prefersDark: false, startDark: false });
        expect(root.classList.has("dark")).toBe(true);
        expect(root.style.colorScheme).toBe("dark");
    });

    it("emitted script resolves light when storage says 'light'", () => {
        const root = runScript({ stored: "light", prefersDark: true, startDark: true });
        expect(root.classList.has("dark")).toBe(false);
        expect(root.style.colorScheme).toBe("light");
    });

    it("emitted script falls back to prefers-color-scheme when storage is null/auto", () => {
        const dark = runScript({ stored: null, prefersDark: true, startDark: false });
        expect(dark.classList.has("dark")).toBe(true);
        expect(dark.style.colorScheme).toBe("dark");

        const light = runScript({ stored: "auto", prefersDark: false, startDark: true });
        expect(light.classList.has("dark")).toBe(false);
        expect(light.style.colorScheme).toBe("light");
    });
});
