// authored/chip-readback.mjs — AUTHORED input to derive/edits.mjs (pass 5, FP4-3; S-34).
//
// FD-4 counts a spec as evidence for a reorder only when it reads the property the reorder
// can change (S-34: all 18 base-green tests of the five chip-paint specs passed on a rung
// that moved every Chip's band strength; only a computed-style readback refuted it). Pass 4's
// readback lived in `pass-4/plants/` and never entered the tree. R-3 puts a spec whose subject
// is one unit in that unit's slot, as `*.visual.ts`, so the readback lands in chip's slot and
// the Playwright program (tests-visual's program row: `src/**/__tests__/*.visual.ts`)
// collects it. It reads the chip's own recipe by a file-relative URL, so F-1 gives it chip as
// its subject (B16) and a move of the recipe rewrites the URL.

export const why = "FP4-3 / S-34: the chip accent-band readback enters the tree in chip's slot (R-3), so FD-4's evidence for any chip-band reorder is a committed spec that reads the property";

const SPEC = `// chip-accent-band.visual.ts — the computed-style readback of a Chip's accent band (S-34).
// Every Chip wears \`glass-chip … accent-tone\` (the recipe in chipVariants.ts, read below).
// In @layer components \`.glass-chip\` follows \`.accent-tone\` at the same specificity, so a
// Chip's --accent-band-strength is glass-chip's contrast-floored band, \`max(18%, …)\`, and
// not the register's flat 18%. A cascade reorder that swaps the two rungs changes the value,
// which no class-level assertion sees; FD-4 counts this spec as the property's reader.
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const RECIPE = readFileSync(new URL("../chipVariants.ts", import.meta.url), "utf8");

test("a Chip's --accent-band-strength is glass-chip's floored band, not the register's 18%", async ({ page }) => {
    expect(RECIPE, "every Chip wears glass-chip and accent-tone").toMatch(/"glass-chip\\b[^"]*\\baccent-tone\\b/);
    await page.goto("/foundations/icons", { waitUntil: "domcontentloaded" });
    const chip = page.locator(".glass-chip.accent-tone").first();
    await chip.waitFor({ state: "attached", timeout: 30_000 });
    const band = await chip.evaluate((el) => getComputedStyle(el).getPropertyValue("--accent-band-strength").trim());
    expect(band).toMatch(/^max\\(/);
});
`;

export const edits = [
    {
        file: "src/components/chip/__tests__/chip-accent-band.visual.ts",
        why: "R-3: the readback's subject is chip (it reads chip's recipe), so it lives in chip's slot as a visual spec",
        create: SPEC,
    },
];
