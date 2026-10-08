// extra-plants.mjs · critique-B pass 6 · written AFTER the battery hash and after the hashed run, not part of the hash.
// The hashed plants.mjs looked for a page.goto whose literal names "chip" and found none (the chip readback opens
// "/foundations/icons"), so its three P5-R5 subject plants SKIPPED. These re-issue them with the story routes read off
// the tree: demo/stories/forms/chip.vue -> "/forms/chip" (it imports only @glass/components/chip from the library), and
// sortable-list's own ROUTE "/data/sortable-list" as a second unit. Same contract as battery/plants.mjs.
const pw = (n, goto) => `import { test, expect } from "@playwright/test";\ntest("${n}", async ({ page }) => {\n    await page.goto(${goto});\n    await expect(page.locator("body")).toBeVisible();\n});\n`;
export function plants(ctx) {
    const { find } = ctx;
    const dir = (b) => find(b).replace(/\/[^/]+$/, "");
    const CHIP = dir("Chip.vue"), SLIDER = dir("Slider.vue"), SL = dir("SortableList.vue");
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });
    for (const [u, D, route] of [["chip", CHIP, '"/forms/chip"'], ["sortable", SL, '"/data/sortable-list"']]) {
        add(`PW6x-legal-${u}`, "B-10 legal", null, `zq6x${u}Page`, `legal: a page-driving ${u} visual spec in its unit's slot (${route})`,
            { [`${D}/__tests__/zq6x${u}Page.visual.ts`]: pw(`zq6x${u}Page`, route) });
        add(`PW6x-wrong-${u}`, "B-10 (P5-R5)", "*", `zq6x${u}Wrong`, `a visual spec driving ${u}'s story in slider's slot`,
            { [`${SLIDER}/__tests__/zq6x${u}Wrong.visual.ts`]: pw(`zq6x${u}Wrong`, route) });
        add(`PW6x-tv-${u}`, "B-10 (P5-R5)", "*", `zq6x${u}Tv`, `a tests-visual spec whose one subject is ${u}`,
            { [`tests-visual/zq6x${u}Tv.spec.ts`]: pw(`zq6x${u}Tv`, route) });
    }
    return P;
}
