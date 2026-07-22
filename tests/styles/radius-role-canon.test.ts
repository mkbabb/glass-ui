import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// BJ.W-RADIUS-ROLE regression guard — pins the role-canon reconcile + the
// coherent-nesting state (F12) against re-drift. happy-dom runs no cascade, so the
// geometry OUTCOME is read from source (the radius-dialog-bind.test.ts idiom), which
// also covers F45 (the dialog-nested field rung) + F48 (dialog↔card bind).

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const radius = read("src/styles/theme/radius.css");
const decl = (css: string, token: string): string | undefined => {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const m = stripped.match(new RegExp(`${token}\\s*:\\s*([^;]+);`));
    return m ? m[1].replace(/\s+/g, " ").trim() : undefined;
};

describe("radius-input misnomer reconcile — the media-tile rename", () => {
    it("renames the tile rung to --radius-media (clean break, no legacy alias)", () => {
        expect(decl(radius, "--radius-media")).toBe("var(--radius)");
        // The misnamed token is GONE — no alias shim survives.
        expect(radius.replace(/\/\*[\s\S]*?\*\//g, "")).not.toContain("--radius-input");
    });

    it("points the three media/tile consumers at --radius-media, none at the old name", () => {
        for (const rel of [
            "src/components/skeleton/Skeleton.vue",
            "src/components/avatar/styles.css",
            "src/components/command/styles.css",
        ]) {
            const css = read(rel);
            expect(css).toContain("var(--radius-media)");
            expect(css).not.toContain("--radius-input");
        }
    });

    it("keeps the real Input on the stadium pill, never on the tile rung", () => {
        const field = read("src/components/_shared/field/field-control.css").replace(
            /\/\*[\s\S]*?\*\//g,
            "",
        );
        expect(field).toMatch(
            /\.field-control\[data-kind="input"\]\s*\{[^}]*border-radius:\s*var\(--radius-pill\)/,
        );
        expect(field).not.toContain("--radius-media");
    });

    it("carries --radius-media (not --radius-input) in the token manifest", () => {
        const manifest = read("src/styles/tokens/manifest.ts");
        expect(manifest).toContain("--radius-media");
        expect(manifest).not.toContain("--radius-input");
    });
});

describe("dead k-token reconcile — the squircle vocabulary stands alone", () => {
    it("keeps the ONE consumed squircle rung", () => {
        expect(decl(radius, "--corner-k-squircle")).toBe("2");
    });

    it("deletes --corner-k-soft / --corner-k-sharp (zero var() consumers)", () => {
        const stripped = radius.replace(/\/\*[\s\S]*?\*\//g, "");
        expect(stripped).not.toContain("--corner-k-soft");
        expect(stripped).not.toContain("--corner-k-sharp");
        // And they are consumed nowhere in src/.
        for (const dead of ["--corner-k-soft", "--corner-k-sharp"]) {
            expect(read("src/styles/glass/squircle.css")).not.toContain(dead);
        }
    });
});

describe("raw-radius repoint — the drop-indicator bar", () => {
    it("routes SortableList's drop indicator through --radius-pill, not 999px", () => {
        const sortable = read("src/components/sortable-list/SortableList.vue");
        expect(sortable).toContain("border-radius: var(--radius-pill)");
        expect(sortable).not.toContain("border-radius: 999px");
    });
});

describe("F12 regression guard — a pill never nests in a near-rect", () => {
    it("keeps the tags-input CONTAINER on the soft field rung (near-rect, not a pill)", () => {
        const tags = read("src/components/tags-input/styles.css").replace(
            /\/\*[\s\S]*?\*\//g,
            "",
        );
        expect(tags).toMatch(/\.tags-input\s*\{[^}]*border-radius:\s*var\(--radius-field\)/);
    });

    it("draws the CHIP stadium from <Chip>, not a hand-rolled pill on the container", () => {
        const item = read("src/components/tags-input/TagsInputItem.vue");
        expect(item).toContain('import { Chip }');
        expect(item).toContain("<Chip");
    });
});
