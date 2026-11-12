// glass-ui 11.0.1 — daraksha's two glass-only repro pages (copied, read-only source, into
// docs/release-11.0.1/daraksha-repro/ and pointed at this tree's source), read from the
// pages' own #readout. A reading, not a gate: each cell logs what the page measures and
// banks a crop under OWNER_OUT; only "the page mounted" is asserted.
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

const BASE = "/docs/release-11.0.1/daraksha-repro";
const OUT = process.env.OWNER_OUT;

async function readout(page: Page): Promise<string> {
    await page.waitForTimeout(700);
    return (await page.locator("#readout").textContent()) ?? "";
}

async function crop(page: Page, name: string): Promise<void> {
    if (!OUT) return;
    const box = await page.locator(".repro-dock").boundingBox();
    if (!box) return;
    mkdirSync(OUT, { recursive: true });
    await page.screenshot({ path: join(OUT, `${name}.png`), clip: { x: box.x - 12, y: box.y - 12, width: box.width + 24, height: box.height + 24 } });
}

test("daraksha dock-cutcap ?radius-dock=1.875rem&active=page&end=1: collapsed, then open", async ({ page }, info) => {
    await page.goto(`${BASE}/dock-cutcap.html?radius-dock=1.875rem&active=page&end=1`);
    await page.locator(".repro-dock").waitFor();
    const collapsed = await readout(page);
    await crop(page, `daraksha-cutcap-collapsed-${info.project.name}`);
    await page.locator(".repro-dock .dock-layer--summary").click();
    await page.waitForTimeout(1200);
    const open = await readout(page);
    await crop(page, `daraksha-cutcap-open-${info.project.name}`);
    console.log(`cutcap collapsed ${collapsed.replace(/\s+/g, " ")}`);
    console.log(`cutcap open ${open.replace(/\s+/g, " ")}`);
    expect(collapsed).toContain("plateCorners");
});

test("daraksha dock-press-scroll under reduced motion: open, then a quick press on Again", async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE}/dock-press-scroll.html`);
    await page.locator(".repro-dock").waitFor();
    await page.locator(".repro-dock .dock-layer--summary").click();
    await page.waitForTimeout(1200);
    const before = await readout(page);
    const again = page.getByRole("button", { name: "Again" });
    const box = await again.boundingBox();
    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.up();
    }
    const after = await readout(page);
    await crop(page, `daraksha-press-scroll-${info.project.name}`);
    console.log(`press-scroll before ${before.replace(/\s+/g, " ")}`);
    console.log(`press-scroll after ${after.replace(/\s+/g, " ")}`);
    expect(before).toContain("presses");
});
