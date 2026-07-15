import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { verifyBootstrapStructure } from "../../scripts/verify.mjs";

const root = resolve(import.meta.dirname, "../..");
const plan = JSON.parse(
    readFileSync(
        resolve(root, "docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json"),
        "utf8",
    ),
);

function commandSurfaceView() {
    const files = new Map<string, Buffer>();
    for (const { path } of plan.activeCommandSurfaces) {
        files.set(path, readFileSync(resolve(root, path)));
    }
    files.set("scripts/verify.mjs", readFileSync(resolve(root, "scripts/verify.mjs")));
    return {
        files,
        view: {
            paths: new Set(files.keys()),
            has: (path: string) => files.has(path),
            oid: (path: string) => files.has(path) ? "f".repeat(40) : null,
            mode: (path: string) => [
                ".githooks/commit-msg",
                "scripts/release.sh",
                "scripts/verify.mjs",
            ].includes(path) ? "100755" : "100644",
            read: (path: string) => files.get(path) ?? Buffer.alloc(0),
        },
    };
}

describe("fresh-checkout command ownership", () => {
    it("accepts the current formation-defined surfaces", () => {
        expect(verifyBootstrapStructure(plan, commandSurfaceView().view).ok).toBe(true);
    });

    it("rejects owner argv that is absent or out of order", () => {
        const surfaces = plan.activeCommandSurfaces.filter(
            ({ path }: { path: string }) => path !== "package.json" && path !== "scripts/install-hooks.mjs",
        );
        expect(surfaces.length).toBeGreaterThan(0);
        for (const surface of surfaces) {
            const { files, view } = commandSurfaceView();
            files.set(
                surface.path,
                Buffer.from(`${surface.requiredOwner}\n--profile before --state\n`),
            );
            expect(verifyBootstrapStructure(plan, view).ok).toBe(false);
        }
    });
});
