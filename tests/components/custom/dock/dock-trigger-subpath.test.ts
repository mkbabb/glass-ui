import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import * as Dock from "@glass/components/dock";
import * as DockTriggerDoor from "@glass/components/dock/trigger";
import { libraryEntryMap } from "../../../../scripts/lib/subpath-policy.mjs";

/* U/B8 PF, G-M1-3b. RED before: `./dock` exported DockTrigger, so `dist/dock.js` imported
   reka's SelectTrigger, SelectIcon and PopoverTrigger (and the DropdownMenuTrigger chunk), and
   every consumer entry that renders a GlassDock carried 14,488 B raw of reka (B7D-PERF §4).
   Mutation: re-export DockTrigger from the dock barrel, and the barrel and dist arms red. */
describe("DockTrigger on its own door", () => {
    it("the dock barrel does not carry DockTrigger; ./dock-trigger does", () => {
        expect(Dock).not.toHaveProperty("DockTrigger");
        expect(DockTriggerDoor).toHaveProperty("DockTrigger");
        expect(Object.keys(libraryEntryMap())).toContain("dock-trigger");
        const pkg = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf8"));
        expect(pkg.exports["./dock-trigger"]).toEqual({
            types: "./dist/dock-trigger.d.ts",
            import: "./dist/dock-trigger.js",
        });
    });

    it("no module the dock barrel reaches imports DockTrigger.vue", () => {
        const dir = resolve(process.cwd(), "src/components/dock");
        const barrel = readFileSync(resolve(dir, "index.ts"), "utf8").replace(/\/\/.*$/gm, "");
        expect(barrel).not.toMatch(/DockTrigger\.vue/);
    });

    // Build acceptance: with no dist on disk there is nothing to accept, so the arm skips.
    const dock = resolve(process.cwd(), "dist/dock.js");
    it.skipIf(!existsSync(dock))("dist/dock.js imports no reka trigger", () => {
        const js = readFileSync(dock, "utf8");
        const reka = js.match(/import\s*\{([^}]*)\}\s*from\s*"reka-ui"/)?.[1] ?? "";
        for (const name of ["SelectTrigger", "SelectIcon", "PopoverTrigger"]) {
            expect(reka, name).not.toMatch(new RegExp(`\\b${name}\\b`));
        }
        expect(js).not.toMatch(/DropdownMenuTrigger-/);
    });
});
