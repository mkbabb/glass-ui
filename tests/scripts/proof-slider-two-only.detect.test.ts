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

function repositoryView() {
    const files = new Map<string, Buffer>();
    for (const { path } of plan.activeCommandSurfaces) {
        files.set(path, readFileSync(resolve(root, path)));
    }
    files.set("scripts/verify.mjs", readFileSync(resolve(root, "scripts/verify.mjs")));
    const view = {
        paths: new Set(files.keys()),
        has: (path: string) => files.has(path),
        oid: (path: string) => files.has(path) ? "e".repeat(40) : null,
        mode: (path: string) => [
            ".githooks/commit-msg",
            "scripts/release.sh",
            "scripts/verify.mjs",
        ].includes(path) ? "100755" : "100644",
        read: (path: string) => files.get(path) ?? Buffer.alloc(0),
    };
    return { files, view };
}

describe("executable identity clean break", () => {
    it("rejects restored implementations, aliases, and family tables", () => {
        const restoredPath = repositoryView();
        restoredPath.files.set("scripts/proof-restored.mjs", Buffer.from("export {};\n"));
        restoredPath.view.paths.add("scripts/proof-restored.mjs");
        expect(verifyBootstrapStructure(plan, restoredPath.view).ok).toBe(false);

        const restoredAlias = repositoryView();
        const pkg = JSON.parse(restoredAlias.files.get("package.json")!.toString("utf8"));
        pkg.scripts["proof:restored"] = "node scripts/verify.mjs";
        restoredAlias.files.set("package.json", Buffer.from(JSON.stringify(pkg)));
        expect(verifyBootstrapStructure(plan, restoredAlias.view).ok).toBe(false);

        const restoredTable = repositoryView();
        const tablePath = "scripts/verification/families/restored.mjs";
        restoredTable.files.set(tablePath, Buffer.from("export {};\n"));
        restoredTable.view.paths.add(tablePath);
        expect(verifyBootstrapStructure(plan, restoredTable.view).ok).toBe(false);
    });
});
