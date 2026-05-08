import { mkdirSync, mkdtempSync, rmSync, writeFileSync, utimesSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// @ts-expect-error — .mjs without types
import { checkFreshness } from "../freshness-gate.mjs";

/**
 * Sanity test for the freshness-gate algorithm. We don't shell out to
 * `node scripts/freshness-gate.mjs` here because the hard-gate transcript
 * exercises that path explicitly; instead we drive the pure
 * `checkFreshness({ root })` function over a synthetic root tree. That
 * isolates the algorithm + makes the failure path deterministic.
 */
describe("freshness-gate", () => {
    let root: string;

    beforeEach(() => {
        root = mkdtempSync(join(tmpdir(), "glass-ui-freshness-"));
        mkdirSync(join(root, "src"), { recursive: true });
        mkdirSync(join(root, "dist"), { recursive: true });
    });

    afterEach(() => {
        rmSync(root, { recursive: true, force: true });
    });

    it("reports OK when dist is newer than src", () => {
        const srcFile = join(root, "src", "index.ts");
        writeFileSync(srcFile, "export {}");
        const past = new Date(Date.now() - 60_000);
        utimesSync(srcFile, past, past);

        writeFileSync(join(root, "dist", "glass-ui.js"), "// built");
        writeFileSync(join(root, "dist", "index.d.ts"), "export {}");

        const result = checkFreshness({ root });
        expect(result.ok).toBe(true);
        expect(result.reasons).toHaveLength(0);
    });

    it("reports stale when src/index.ts is newer than dist/glass-ui.js", () => {
        const past = new Date(Date.now() - 60_000);
        writeFileSync(join(root, "dist", "glass-ui.js"), "// stale");
        utimesSync(join(root, "dist", "glass-ui.js"), past, past);
        writeFileSync(join(root, "dist", "index.d.ts"), "export {}");
        utimesSync(join(root, "dist", "index.d.ts"), past, past);

        const srcFile = join(root, "src", "index.ts");
        writeFileSync(srcFile, "export {}"); // mtime = now → newer than dist

        const result = checkFreshness({ root });
        expect(result.ok).toBe(false);
        expect(result.reasons.join("\n")).toMatch(/dist out of date/);
    });

    it("reports missing when dist/glass-ui.js does not exist", () => {
        writeFileSync(join(root, "src", "index.ts"), "export {}");
        const result = checkFreshness({ root });
        expect(result.ok).toBe(false);
        expect(result.reasons.join("\n")).toMatch(
            /missing dist artefact|does not exist/,
        );
    });
});
