// Critic 14, readings only (after critic 13's typed.probe.ts): the demo's Command page in a
// dialog, a query typed, then a tap on the first row, Enter, or Escape. Per animation frame
// from just before the input to the plate's last mounted frame: the rows the plate holds,
// the text the search field shows (its value), and the plate's opacity and layout box.
// Whether the field's own text changes while the plate fades.
import { expect, test, type Page } from "@playwright/test";
import { gotoReady, markFilm, pressOn, startFilm, stopFilm } from "../release-11-1-1/film";

const content = '.command-dialog__content[data-state="open"]';

async function openPalette(page: Page, project: string): Promise<void> {
    await pressOn(page, project, "button:has-text('In a dialog')");
    await page.locator("button:has-text('Search commands')").waitFor();
    await page.waitForTimeout(600);
    await pressOn(page, project, "button:has-text('Search commands')");
}

for (const route of ["tap", "enter", "escape"] as const) {
    test(`text palette · "se" then ${route}: the plate keeps its box through the exit`, async ({ page }, info) => {
        const project = info.project.name;
        await gotoReady(page, "/containers/command");
        await openPalette(page, project);
        await page.locator(content).waitFor();
        await page.waitForTimeout(900);
        await page.locator(`${content} [data-slot=command-input]`).pressSequentially("se", { delay: 80 });
        await page.waitForTimeout(600);
        const labels = await page.locator(`${content} [data-slot=command-item]`).allInnerTexts();
        // rows per frame: a counter the page keeps on every animation frame
        await page.evaluate(() => {
            const w = window as unknown as { __rows: [number, number][] };
            w.__rows = [];
            const tick = () => {
                const el = document.querySelector(".command-dialog__content");
                const inp = el ? (el.querySelector("[data-slot=command-input]") as HTMLInputElement | null) : null;
                w.__rows.push([performance.now(), el ? el.querySelectorAll("[data-slot=command-item]").length : -1, inp ? inp.value : null, el ? getComputedStyle(el).opacity : null] as unknown as [number, number]);
                if (w.__rows.length < 400) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        await startFilm(page, ".command-dialog__content", ".command-dialog__content [data-slot=command-list]");
        await markFilm(page);
        const mark = await page.evaluate(() => performance.now());
        if (route === "tap") await pressOn(page, project, `${content} [data-slot=command-item]:not([data-disabled])`);
        else await page.keyboard.press(route === "enter" ? "Enter" : "Escape");
        const film = await stopFilm(page, 900);
        const rows = await page.evaluate((m) => (window as unknown as { __rows: [number, number][] }).__rows.filter((r) => r[0] >= m - 20).map((r) => [Math.round(r[0] - m), ...r.slice(1)]), mark);
        const held = film.frames.filter((f) => f.t >= film.mark && f.present);
        const rest = film.frames.filter((f) => f.t < film.mark && f.present).at(-1)!;
        const box = held.map((f) => [Math.round(f.t - film.mark), f.lw, f.lh, f.op === undefined ? null : Math.round(f.op * 1000) / 1000]);
        const drift = Math.max(0, ...held.map((f) => Math.max(Math.abs(f.lw! - rest.lw!), Math.abs(f.lh! - rest.lh!))));
        const seen = held.filter((f) => (f.op ?? 0) > 0.01);
        const seenDrift = Math.max(0, ...seen.map((f) => Math.abs(f.lh! - rest.lh!)));
        const reading = { route, labels, rest: [rest.lw, rest.lh], drift, seenDrift, box, rows };
        await info.attach("reading", { body: JSON.stringify(reading), contentType: "application/json" });
        console.log("READING", JSON.stringify(reading));
        expect(drift, `the plate keeps its box through its exit`).toBeLessThanOrEqual(1);
    });
}
