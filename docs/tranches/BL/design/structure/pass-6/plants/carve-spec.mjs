#!/usr/bin/env node
// carve-spec.mjs <linked worktree> carve|gone — pass 6 · P6-F2's plant tree.
//   carve  the route's own Playwright program row (pass-5 frozen S43a, its two
//          tests-visual/playwright.config.ts hunks: testDir ".." and the
//          `src/**/__tests__/*.visual.ts` slot pattern) and the chip readback spec in chip's
//          slot (frozen S48, verbatim): src/components/chip/__tests__/chip-accent-band.visual.ts
//   gone   the carved spec moved out from under the report that named it: renamed in place to
//          chip-accent-band-2.visual.ts, so the program still holds a spec but not at the path
//          the report keyed (a move after the seat ran)
// Every hunk must match exactly once. Refuses the main checkout.
import { execFileSync } from "node:child_process";
import { readFileSync, renameSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [wtArg, mode] = process.argv.slice(2);
if (!wtArg || !["carve", "gone"].includes(mode)) { console.error("usage: carve-spec.mjs <wt> carve|gone"); process.exit(2); }
const wt = resolve(wtArg);
const git = (...a) => execFileSync("git", ["-C", wt, ...a], { encoding: "utf8" }).trim();
if (resolve(wt, git("rev-parse", "--git-dir")) === resolve(wt, git("rev-parse", "--git-common-dir"))) { console.error("carve-spec.mjs refuses the main checkout"); process.exit(2); }

const FROZEN = join(dirname(fileURLToPath(import.meta.url)), "../../pass-5/B-kit/frozen");
export const SPEC = "src/components/chip/__tests__/chip-accent-band.visual.ts";
if (mode === "carve") {
    const CONFIG = "tests-visual/playwright.config.ts";
    const program = JSON.parse(readFileSync(join(FROZEN, "S43a-tv-program.json"), "utf8"));
    let text = readFileSync(join(wt, CONFIG), "utf8");
    for (const [from, to] of program.files[CONFIG].hunks) {
        const n = text.split(from).length - 1;
        if (n !== 1) throw new Error(`carve-spec: ${CONFIG}: expected 1 match, found ${n} for ${JSON.stringify(from.slice(0, 80))}`);
        text = text.replace(from, () => to);
    }
    writeFileSync(join(wt, CONFIG), text);
    const spec = JSON.parse(readFileSync(join(FROZEN, "S48-chip-readback.json"), "utf8")).files[SPEC].create;
    mkdirSync(join(wt, dirname(SPEC)), { recursive: true });
    writeFileSync(join(wt, SPEC), spec);
    console.log(`carve-spec carve: ${CONFIG} program row (testDir "..", slot pattern); ${SPEC} (${spec.length} B)`);
} else {
    const to = SPEC.replace("chip-accent-band.visual.ts", "chip-accent-band-2.visual.ts");
    renameSync(join(wt, SPEC), join(wt, to));
    console.log(`carve-spec gone: ${SPEC} → ${to}`);
}
