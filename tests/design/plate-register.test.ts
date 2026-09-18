import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// O-20 B-2 — the glass register's utilities are documented where the tiers are.
//
// 9.0.0 minted `@utility glass-plate` and documented it in no doc that ships and no
// doc that does not: DESIGN.md, MIGRATION.md and README.md all returned zero. A public
// utility a consumer can compose but cannot read about is the thing that makes a
// consumer re-derive the plate contract by hand, which is what B-2 was filed as.
//
// SCOPE, measured before it was written. The whole-roster form — every `@utility` in
// `src/styles` named in DESIGN.md — is RED on 21 of 46 names today, so it would assert
// far past what this lane cures. The scope here is the GLASS register, the register
// DESIGN.md's "## Glass Surfaces" section governs: every `@utility` declared under
// `src/styles/glass/`. It is self-maintaining (a new glass utility joins the assertion
// by existing) and it was RED on exactly one name, `glass-plate`. The other 20
// undocumented utilities are recorded in the lane record.
// ─────────────────────────────────────────────────────────────────────────────

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const GLASS_DIR = "src/styles/glass";

/** `@utility <name>` declarations (line-initial — a mention inside a comment is prose). */
const utilitiesIn = (dir: string): { name: string; where: string }[] =>
    readdirSync(join(process.cwd(), dir), { recursive: true, withFileTypes: true })
        .filter((e) => e.isFile() && e.name.endsWith(".css"))
        .flatMap((e) => {
            const path = join(e.parentPath, e.name);
            return readFileSync(path, "utf8")
                .split("\n")
                .flatMap((line, i) => {
                    const m = line.match(/^@utility\s+([A-Za-z0-9_*-]+)/);
                    return m ? [{ name: m[1], where: `${e.name}:${i + 1}` }] : [];
                });
        });

describe("the glass register mirrors into DESIGN.md", () => {
    const utilities = utilitiesIn(GLASS_DIR);
    const design = read("DESIGN.md");

    it("declares at least one utility under src/styles/glass/", () => {
        expect(utilities.length).toBeGreaterThan(0);
    });

    it("names every glass @utility in DESIGN.md", () => {
        const missing = utilities
            // Boundary-anchored: a longer token spelling that merely CONTAINS the
            // utility name (`--glass-plate-floating`) must not satisfy the assertion.
            .filter(({ name }) => !new RegExp(`\`${name}\``).test(design))
            .map(({ name, where }) => `${name} (${where})`);
        expect(missing, "glass utilities absent from DESIGN.md").toEqual([]);
    });

    it("documents what glass-plate does NOT supply — the stacking half B-2 re-derived", () => {
        const register =
            design.split("### Plate register")[1]?.split("\n### ")[0] ?? "";
        expect(register).toContain("glass-plate");
        // The three omissions a consumer must supply, and the z rung that orders them.
        expect(register).toContain("--z-content");
        expect(register).toMatch(/position/);
    });
});
