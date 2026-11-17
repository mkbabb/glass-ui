// Fix seat 6, readings only: the Dialog close button's plate under reduced motion, hovered
// and then held with the mouse, as the press cell reads it: both crops saved, the fills,
// and how many pixels move by more than 12 of 765, plus the colour behind the plate.
import { test } from "@playwright/test";
import { PNG } from "pngjs";
import { writeFileSync } from "node:fs";

const OUT = new URL("../logs/", import.meta.url).pathname;

test("plate · the Dialog close plate hovered and held under reduced motion", async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/tests-visual/release-11-1-1/exits-harness.html");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
    await page.locator('[data-testid="x-dialog"]').click();
    await page.locator('[data-testid="x-dialog-content"][data-state="open"]').waitFor();
    await page.waitForTimeout(500);
    const sel = '[data-testid="x-dialog-content"] [data-slot="dialog-close"]';
    const box = (await page.locator(sel).boundingBox())!;
    const clip = { x: box.x - 2, y: box.y - 2, width: box.width + 4, height: box.height + 4 };
    const fill = () => page.locator(sel).evaluate((el) => getComputedStyle(el, "::before").backgroundColor);
    const out: Record<string, unknown> = {};
    out.restUnhovered = await page.screenshot({ clip }).then((b) => (writeFileSync(`${OUT}plate-${info.project.name}-0-away.png`, b), b));
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(300);
    const rest = await page.screenshot({ clip });
    writeFileSync(`${OUT}plate-${info.project.name}-1-hover.png`, rest);
    out.hoverFill = await fill();
    await page.mouse.down();
    await page.waitForTimeout(300);
    const held = await page.screenshot({ clip });
    writeFileSync(`${OUT}plate-${info.project.name}-2-held.png`, held);
    out.heldFill = await fill();
    await page.mouse.up();
    const [a, b] = [PNG.sync.read(rest), PNG.sync.read(held)];
    let moved = 0, maxd = 0;
    for (let i = 0; i < a.data.length; i += 4) {
        const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
        maxd = Math.max(maxd, d);
        if (d > 12) moved++;
    }
    const mid = ((a.height >> 1) * a.width + (a.width >> 1)) * 4;
    out.moved = +(moved / (a.width * a.height)).toFixed(3);
    out.maxDiff = maxd;
    out.centreRest = [...a.data.slice(mid, mid + 3)];
    out.centreHeld = [...b.data.slice(mid, mid + 3)];
    out.restUnhovered = undefined;
    writeFileSync(`${OUT}plate-${info.project.name}.json`, JSON.stringify(out, null, 1));
    console.log(JSON.stringify(out));
});
