// Fix seat 2 probe, kept out of the suite: the dock Select's first frames, with and without reduced motion.
import { test } from "@playwright/test";
import { gotoReady, markFilm, pressOn, startFilm, stopFilm } from "./release-11-1-1/film";
for (const [reduce, key] of [[true, false], [true, true]] as const) {
    test(`dselprobe · reduce ${reduce} key ${key}`, async ({ page }, info) => {
        await page.emulateMedia({ reducedMotion: reduce ? "reduce" : "no-preference" });
        await gotoReady(page, "/tests-visual/release-11-1-1/exits-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(400);
        if (key) await page.locator('[data-testid="x-select"]').focus();
        await startFilm(page, '[data-testid="x-select-content"]');
        await markFilm(page);
        if (key) await page.keyboard.press("Enter");
        else await pressOn(page, info.project.name, '[data-testid="x-select"]');
        const film = await stopFilm(page, 700);
        const rows = film.frames.filter((f) => f.t >= film.mark && f.present).slice(0, 10).map((f) => [Math.round(f.t - film.mark), +(f.op ?? 0).toFixed(3), Math.round(f.x!), Math.round(f.y!), Math.round(f.w!), Math.round(f.h!)]);
        const last = film.frames[film.frames.length - 1];
        console.log(`REDUCE=${reduce} KEY=${key}`, JSON.stringify(rows), "final", Math.round(last.x!), Math.round(last.y!), Math.round(last.w!), Math.round(last.h!));
    });
}
