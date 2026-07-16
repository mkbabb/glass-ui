import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it, vi } from "vitest";

const roots: string[] = [];

async function profileCapabilities(specifiers: readonly string[]) {
    const root = mkdtempSync(join(tmpdir(), "glass-profile-value-"));
    roots.push(root);
    mkdirSync(join(root, "src"), { recursive: true });
    mkdirSync(join(root, "dist"), { recursive: true });
    writeFileSync(join(root, "src/index.ts"), `export * from "./leaf";\n`);
    writeFileSync(
        join(root, "src/leaf.ts"),
        specifiers.map((specifier) => `import "${specifier}";`).join("\n"),
    );
    writeFileSync(join(root, "dist/glass-ui.js"), "export {};\n");
    writeFileSync(
        join(root, "package.json"),
        JSON.stringify({ exports: { ".": { import: "./dist/glass-ui.js" } } }),
    );

    const artifact = join(root, "profile.json");
    process.env.GLASS_UI_BUDGET_SKIP_BUILD = "1";
    process.env.GLASS_UI_PROFILE_ROOT = root;
    process.env.GLASS_UI_BUNDLE_ARTIFACT = artifact;
    process.env.GLASS_UI_SUBPATH_TABLE = join(root, "subpaths.md");
    process.env.GLASS_UI_BUNDLE_BASELINE = join(root, "baseline.json");

    vi.resetModules();
    await import("../../scripts/profile-bundle.mjs");

    const profile = JSON.parse(readFileSync(artifact, "utf8"));
    return profile.valueCapabilities.facts;
}

afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.GLASS_UI_BUDGET_SKIP_BUILD;
    delete process.env.GLASS_UI_PROFILE_ROOT;
    delete process.env.GLASS_UI_BUNDLE_ARTIFACT;
    delete process.env.GLASS_UI_SUBPATH_TABLE;
    delete process.env.GLASS_UI_BUNDLE_BASELINE;
    for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("profile:bundle value.js capability census", () => {
    it("accepts only the three Value capabilities Glass owns", async () => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        const accepted = [
            "@mkbabb/value.js/color",
            "@mkbabb/value.js/css",
            "@mkbabb/value.js/easing",
        ];
        const rejected = [
            "@mkbabb/value.js",
            "@mkbabb/value.js/value",
            "@mkbabb/value.js/math",
            "@mkbabb/value.js/transform",
            "@mkbabb/value.js/parsing",
            "@mkbabb/value.js/units",
            "@mkbabb/value.js/quantize",
            "@mkbabb/value.js/browser",
            "@mkbabb/value.js/color/private",
            "@mkbabb/value.js/css/private",
            "@mkbabb/value.js/easing/private",
        ];
        const facts = await profileCapabilities([
            ...accepted,
            ...rejected,
            "@mkbabb/value.jsx/color",
        ]);

        expect(facts.accepted).toEqual(Object.fromEntries(
            accepted.map((specifier) => [specifier, 1]),
        ));
        expect(facts.rejected.map(({ specifier }: { specifier: string }) => specifier))
            .toEqual(rejected);
    });
});
