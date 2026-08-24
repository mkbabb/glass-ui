import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { router } from "../../demo/router";
import { CATEGORIES } from "../../demo/stories/manifest";

const SHELL = resolve(__dirname, "../../demo/shell");

describe("demo route field ownership", () => {
    afterEach(async () => {
        await router.push("/");
    });

    it("keeps one story-owned field across DockStage route navigation", async () => {
        await router.push("/dock/overview");
        expect(router.currentRoute.value.meta.suppressesShellField).toBe(true);

        await router.push("/dock/layers");
        expect(router.currentRoute.value.meta.suppressesShellField).toBe(true);
    });

    it("lets the Aurora studio exclusively own its route field", async () => {
        const aurora = CATEGORIES.find(({ id }) => id === "substrates")?.stories.find(
            ({ id }) => id === "aurora",
        );
        expect(aurora?.background).toBe("paper");

        await router.push("/substrates/aurora");
        expect(router.currentRoute.value.meta.focal).toBe(true);
        expect(router.currentRoute.value.meta.suppressesShellField).toBe(true);
    });

    // BK #21 W-DAG-REDUCE. The shell field used to be a `shellFieldActive` computed
    // EXPORTED FROM `demo/router.ts` and imported back down into `AppShell.vue` — the
    // one back edge holding the `demo` ↔ `demo/shell` module cycle (M03) together. It
    // was a pure negation of the `meta.suppressesShellField` the cases above assert, so
    // severing it cost the suite nothing and cost the graph a cycle: `AppShell` already
    // holds `useRoute()`, which IS `router.currentRoute`, and now computes the
    // projection where it is consumed.
    //
    // THIS ARM IS A TRIPWIRE, NOT THE LOCK. [2026-08-10 · BK #21 — cure C1.] It reads
    // TEXT, so it can only ever catch the specifier shapes it was taught; the RESOLVING
    // lock is `scripts/import-dag.mjs`, which resolves every specifier on disk and
    // fail-closes on a re-formed `demo` ↔ `demo/shell` cycle whatever the shape (its M03
    // owner rows are struck for exactly this reason). Keep the tripwire because it names
    // the defect at the point of edit and costs nothing; do not mistake it for the proof.
    // The pattern below is widened past its original `../router`-only form to the
    // alternate-climb, `.ts`-suffixed, and dynamic-`import()` shapes.
    it("no file under demo/shell/ imports from demo/router — M03 stays dissolved", () => {
        const offenders: string[] = [];
        const walk = (dir: string): void => {
            for (const entry of readdirSync(dir, { withFileTypes: true })) {
                const path = join(dir, entry.name);
                if (entry.isDirectory()) {
                    walk(path);
                    continue;
                }
                if (!/\.(ts|vue)$/.test(entry.name)) continue;
                // Matches `"../router"`, `"../../router"`, the alternate climb
                // `"../../demo/router"`, an explicit `".ts"` suffix, and the dynamic
                // `import("../router")` form as well as `from`; a same-directory
                // `./router` would be a different file and is deliberately not matched.
                const text = readFileSync(path, "utf8");
                for (const m of text.matchAll(
                    /\b(?:from|import)\s*\(?\s*["']((?:\.\.\/)+(?:demo\/)?router(?:\.ts)?)["']/g,
                )) {
                    offenders.push(`${path.slice(SHELL.length + 1)} → ${m[1]}`);
                }
            }
        };
        walk(SHELL);
        expect(offenders, `demo/shell → demo/router edges: ${offenders.join(", ")}`).toEqual(
            [],
        );
    });
});
