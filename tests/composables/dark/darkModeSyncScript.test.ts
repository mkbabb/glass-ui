import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import {
    DARK_MODE_STORAGE_KEY,
    darkModeSyncScript,
    type DarkModeSyncScriptOptions,
} from "@glass/composables/dark/darkModeSyncScript";

// The emitted IIFE runs in a `<head>`-script context where `window` is the
// global. Node's experimental localStorage is disabled in this env, so both
// runners below drive the script against the SAME stand-in host (a recording
// storage + matchMedia + a fresh root), built once here.
interface RunOptions {
    stored: string | null;
    prefersDark: boolean;
    startDark: boolean;
    search?: string;
    options?: DarkModeSyncScriptOptions;
}

function makeHost(opts: RunOptions) {
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
    // Every RECORDED `localStorage.setItem`, so the write-back arm reads a
    // measurement rather than an inspection of the source string.
    const writes: Array<[string, string]> = [];
    const host = {
        localStorage: {
            getItem: () => opts.stored,
            setItem: (k: string, v: string) => writes.push([k, v]),
        },
        // The script reads `window.matchMedia`, so `window` carries it; the host
        // object stands in for the page's global either way.
        window: { matchMedia },
        document: { documentElement },
        location: { search: opts.search ?? "" },
        // Absent from a bare `node:vm` context, so it is seeded like the DOM
        // stand-ins rather than assumed.
        URLSearchParams,
    };
    return { root, writes, host };
}

// `search` and `options` are the seams the G-NO-FLASH arms below drive. This
// runner resolves the script's branches through `with(host)` — enough to prove
// the resolution logic mirrors the runtime contract on every branch.
//
// It is NOT a globals-leak detector, and must never be read as one: under
// `with(host)` a non-strict unqualified assignment (`q=…`) bypasses the scope
// object entirely and lands on THIS function's global, leaving `host` clean while
// the name leaks. That measurement belongs to `runInPageGlobal` below.
function runScript(opts: RunOptions) {
    const { root, writes, host } = makeHost(opts);
    new Function("host", `with(host){${darkModeSyncScript(opts.options)}}`)(host);
    return { ...root, writes };
}

// The no-globals surface, measured where a leak can actually land: `node:vm` runs
// the emitted string with the seeded host AS the run's global object, exactly as
// an inline `<head>` script runs with `window` as its global. An unqualified
// assignment therefore shows up as a NEW own key of `host` — the true detector.
function runInPageGlobal(opts: RunOptions) {
    const { root, writes, host } = makeHost(opts);
    const seeded = new Set(Object.keys(host));
    runInNewContext(darkModeSyncScript(opts.options), host);
    return {
        ...root,
        writes,
        leaked: Object.keys(host).filter((k) => !seeded.has(k)),
    };
}

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

// BK Lane β unit β0 — the close-battery arms for the seated MOTION gate G-NO-FLASH,
// on its parse-time half. `route-motion.test.ts` holds the same seat's route-grammar
// arms; these are the FIRST-PAINT arms, and they govern the three seams the
// `DarkModeSyncScriptOptions` addition opens.
//
// SEATS +0 — `G-NO-FLASH` is an already-seated MOTION name (§B.5) and these file as
// close-battery rows under it, exactly as #29's 27 arms did. No seat is minted, no
// `SEAT-BINDING.json` row moves, and the register receipt is byte-identical.
//
// TWO BEHAVIOURS ARE **RATIFIED HERE, NOT INHERITED SILENTLY**, and each has its own
// arm so a later reader cannot mistake them for accidents:
//   1. `normalize` runs AFTER `queryOverride`, so a `?dark` visit PERSISTS into the
//      visitor's own storage. That order is what makes a forced capture survive
//      hydration (the runtime composable re-reads storage and would otherwise flip the
//      page back); it also means the pair is for capture profiles, never for a shared
//      user-facing origin. MIGRATION §8.1.0 states the consequence.
//   2. The query flags are PRESENCE flags — `q.has("dark")`, value-blind — so
//      `?dark=false` resolves DARK. A value grammar would be a second, weaker way to
//      say what `?light` already says.
describe("G-NO-FLASH — the parse-time stamp: precedence, determinism, write-back", () => {
    it("G-NO-FLASH · precedence is query > storage > default, in both directions", () => {
        const options = { queryOverride: true };
        // `?dark` over a stored `light`, under a light platform: nothing but the query
        // can produce dark here.
        const forcedDark = runScript({
            stored: "light",
            prefersDark: false,
            startDark: false,
            search: "?dark",
            options,
        });
        expect(forcedDark.classList.has("dark")).toBe(true);
        expect(forcedDark.style.colorScheme).toBe("dark");

        // `?light` over a stored `dark`, under a dark platform: the mirror.
        const forcedLight = runScript({
            stored: "dark",
            prefersDark: true,
            startDark: true,
            search: "?light",
            options,
        });
        expect(forcedLight.classList.has("dark")).toBe(false);
        expect(forcedLight.style.colorScheme).toBe("light");

        // storage still outranks the default when no query asks
        const stored = runScript({
            stored: "dark",
            prefersDark: false,
            startDark: false,
            search: "",
            options,
        });
        expect(stored.classList.has("dark")).toBe(true);
    });

    it("G-NO-FLASH · a boolean defaultDark is DETERMINISTIC — the platform is not asked", () => {
        // The byte-level half: a boolean answers, so the emitted script carries no
        // media query at all. This is the arm a document that must not flip with the
        // projector's OS theme depends on.
        expect(darkModeSyncScript({ defaultDark: false })).not.toContain("matchMedia");
        expect(darkModeSyncScript({ defaultDark: true })).not.toContain("matchMedia");
        expect(darkModeSyncScript()).toContain("(prefers-color-scheme: dark)");

        // The behavioural half: absent storage under a DARK platform still resolves
        // light when the default says so, and the converse.
        const light = runScript({
            stored: null,
            prefersDark: true,
            startDark: true,
            options: { defaultDark: false },
        });
        expect(light.classList.has("dark")).toBe(false);

        const dark = runScript({
            stored: "auto",
            prefersDark: false,
            startDark: false,
            options: { defaultDark: true },
        });
        expect(dark.classList.has("dark")).toBe(true);
    });

    it("G-NO-FLASH · normalize writes the RESOLVED mode back, so `auto` cannot mean two things", () => {
        const resolved = runScript({
            stored: "auto",
            prefersDark: true,
            startDark: false,
            options: { normalize: true },
        });
        expect(resolved.classList.has("dark")).toBe(true);
        expect(resolved.writes).toEqual([[DARK_MODE_STORAGE_KEY, "dark"]]);

        // the custom key travels into the write-back, not just the read
        const custom = runScript({
            stored: null,
            prefersDark: false,
            startDark: true,
            options: { normalize: true, storageKey: "my-theme" },
        });
        expect(custom.writes).toEqual([["my-theme", "light"]]);
    });

    it("G-NO-FLASH · RATIFIED — normalize runs AFTER the query, so a forced visit PERSISTS", () => {
        // The decision, executable: `?dark` + `normalize` writes "dark" over a stored
        // "light". Reversing the two arms would leave storage saying "light" while the
        // stamp says dark, and the runtime composable would flip the page at hydration
        // — the exact flash this seat exists to forbid. Enable the pair on a capture
        // profile, never on a shared user-facing origin.
        const visit = runScript({
            stored: "light",
            prefersDark: false,
            startDark: false,
            search: "?dark",
            options: { queryOverride: true, normalize: true },
        });
        expect(visit.classList.has("dark")).toBe(true);
        expect(visit.writes).toEqual([[DARK_MODE_STORAGE_KEY, "dark"]]);
    });

    it("G-NO-FLASH · RATIFIED — the query flags are PRESENCE flags, so `?dark=false` reads DARK", () => {
        const options = { queryOverride: true };
        // value-blind by construction: `q.has("dark")` asks whether the key is there.
        for (const search of ["?dark", "?dark=false", "?dark=0", "?dark=light"]) {
            expect(runScript({
                stored: "light",
                prefersDark: false,
                startDark: false,
                search,
                options,
            }).classList.has("dark")).toBe(true);
        }
        // and when both flags are present, `dark` is read first and wins
        expect(runScript({
            stored: "light",
            prefersDark: false,
            startDark: false,
            search: "?light&dark",
            options,
        }).classList.has("dark")).toBe(true);
    });

    it("G-NO-FLASH · the three seams are OPT-IN — the default emission reads no query and writes nothing", () => {
        const out = darkModeSyncScript();
        expect(out).not.toContain("URLSearchParams");
        expect(out).not.toContain("setItem");

        const plain = runScript({
            stored: "auto",
            prefersDark: true,
            startDark: false,
            search: "?light",
        });
        // the query is not read, so the platform still decides
        expect(plain.classList.has("dark")).toBe(true);
        expect(plain.writes).toEqual([]);
    });

    it("G-NO-FLASH · the DEFAULT emission is byte-identical — a CSP hash does not silently re-pin", () => {
        // An inline `<head>` script is what `script-src 'sha256-…'` pins. If the
        // default emission's bytes move, every such consumer's stamp is BLOCKED at
        // first paint — no type error, no runtime error, just the flash this module
        // exists to remove. So the default is pinned to the byte, and both figures
        // below are DERIVED from this function rather than typed: they reproduce the
        // pre-addition emission exactly.
        const out = darkModeSyncScript();
        expect(Buffer.byteLength(out)).toBe(300);
        expect(createHash("sha256").update(out).digest("base64")).toBe(
            "VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=",
        );
    });

    it("G-NO-FLASH · no-globals — the emitted body is ONE IIFE and leaks no name", () => {
        // All three seams on, so every emitted arm's declarations are in the run.
        const options: DarkModeSyncScriptOptions = {
            queryOverride: true,
            normalize: true,
            defaultDark: false,
        };
        const out = darkModeSyncScript(options);
        expect(out.startsWith("(function(){")).toBe(true);
        expect(out.endsWith("})();")).toBe(true);

        // MEASURED on the surface a leak can actually reach: `runInPageGlobal`
        // makes the seeded host the run's OWN global, so an unqualified assignment
        // inside the emitted script is a new own key. (A `with(scope)` run cannot
        // see this — a sloppy assignment skips the scope object and lands on the
        // caller's global, which is why that runner does not measure leakage.)
        const run = runInPageGlobal({
            stored: null,
            prefersDark: false,
            startDark: false,
            search: "?dark",
            options,
        });
        // …and the run is not vacuous: `defaultDark:false` + no stored value means
        // ONLY the query arm can produce dark, and the normalize arm then writes it.
        expect(run.classList.has("dark")).toBe(true);
        expect(run.writes).toEqual([[DARK_MODE_STORAGE_KEY, "dark"]]);

        expect(run.leaked).toEqual([]);
    });
});
