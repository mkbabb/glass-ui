// Critic 13 (copied by critic 14), readings only: what a CommandDialog's query does through a close and at the
// next open, for a dialog on its defaults ("a") and one with unmountOnHide: false ("b").
// The 11.1.1 ruling for the palette: the query holds through the exit, then clears, so the
// next open starts empty as it does on 11.1.0. The pick is Enter on the highlighted row.
// The next open is filmed per frame: the plate's layout height and its opacity.
import { expect, test, type Page } from "@playwright/test";
import { gotoReady, markFilm, startFilm, stopFilm } from "../release-11-1-1/film";

const HARNESS = "/tests-visual/critic14-cmd/cmd-harness.html";
const content = '.command-dialog__content[data-state="open"]';

async function read(page: Page, id: string) {
    return page.evaluate((id) => {
        const p = (window as unknown as { __p: Record<string, { query: { value: string }; log: unknown[] }> }).__p[id];
        return { query: p.query.value, log: [...p.log] };
    }, id);
}

for (const id of ["a", "b"]) {
    for (const route of ["pick", "escape"] as const) {
        test(`palette ${id} · typed "se", closed by ${route}: the next open starts empty`, async ({ page }, info) => {
            await gotoReady(page, HARNESS);
            await page.locator("body[data-ready='1']").waitFor();
            await page.locator(`[data-testid="${id}-open"]`).click();
            await page.locator(content).waitFor();
            await page.waitForTimeout(500);
            await page.locator(`${content} [data-slot=command-input]`).pressSequentially("se", { delay: 60 });
            await page.waitForTimeout(300);
            const typed = await read(page, id);
            const typedRows = await page.locator(`${content} [data-slot=command-item]`).count();
            const t0 = await page.evaluate(() => Math.round(performance.now()));
            await page.keyboard.press(route === "pick" ? "Enter" : "Escape");
            await page.waitForTimeout(1500);
            const afterExit = await read(page, id);
            const mountedAfter = await page.locator(".command-dialog__content").count();
            await startFilm(page, ".command-dialog__content");
            await markFilm(page);
            const t1 = await page.evaluate(() => Math.round(performance.now()));
            await page.locator(`[data-testid="${id}-open"]`).click();
            const film = await stopFilm(page, 800);
            await page.locator(content).waitFor();
            await page.waitForTimeout(300);
            const nextValue = await page.locator(`${content} [data-slot=command-input]`).inputValue();
            const nextRows = await page.locator(`${content} [data-slot=command-item]`).count();
            const afterOpen = await read(page, id);
            const frames = film.frames
                .filter((f) => f.t >= film.mark)
                .map((f) => [Math.round(f.t - film.mark), f.present ? 1 : 0, f.lh ?? null, f.op === undefined ? null : Math.round(f.op * 1000) / 1000]);
            const shown = frames.filter((f) => f[1] && (f[3] as number) > 0);
            const heights = [...new Set(shown.map((f) => f[2]))];
            const reading = { id, route, typed: typed.query, typedRows, closeAt: t0, afterExit, mountedAfter, reopenAt: t1, nextValue, nextRows, afterOpen, heightsWhileShown: heights, frames };
            await info.attach("reading", { body: JSON.stringify(reading), contentType: "application/json" });
            console.log("READING", JSON.stringify(reading));
            expect(nextValue, `the next open's query is empty`).toBe("");
            expect(nextRows, `the next open shows every row`).toBe(9);
            expect(heights.length, `the next open's plate holds one height while it is seen ${JSON.stringify(heights)}`).toBe(1);
        });
    }
}
