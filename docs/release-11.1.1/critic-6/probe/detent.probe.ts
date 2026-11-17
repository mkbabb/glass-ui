// Critic 6 probe, readings only: the standing cell for the detented Sheet (the exits
// harness, the sheet resting at its 0.5 rung, closed by a press at (4, 4) or by Escape),
// as the release spec films it, with every raw frame attached (time from the input, box,
// effective opacity) so the "seen" channel can be read against the box.
import { test } from "@playwright/test";
import { gotoReady, markFilm, press, pressOn, startFilm, stopFilm } from "../../../../tests-visual/release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";
const CONTENT = '[data-testid="x-detent-content"]';

for (const route of ["outside", "escape"] as const) {
    test(`detent raw · ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        await gotoReady(page, HARNESS);
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(300);
        await pressOn(page, project, '[data-testid="x-detent"]');
        await page.locator(CONTENT).first().waitFor();
        await page.waitForTimeout(1000);
        await startFilm(page, CONTENT);
        await markFilm(page);
        if (route === "outside") await press(page, project, 4, 4);
        else await page.keyboard.press("Escape");
        const film = await stopFilm(page, 1400);
        const vw = page.viewportSize()!;
        const rows = film.frames
            .filter((f) => f.t >= film.mark - 20)
            .map((f) => [
                Math.round(f.t - film.mark),
                f.present ? 1 : 0,
                +(f.y ?? 0).toFixed(1),
                +(f.h ?? 0).toFixed(1),
                +(f.op ?? 0).toFixed(3),
                f.present && f.h ? +((Math.max(0, Math.min((f.y ?? 0) + f.h, vw.height) - Math.max(f.y ?? 0, 0)) / f.h) * (f.op ?? 0)).toFixed(3) : 0,
            ]);
        await info.attach("raw", { body: JSON.stringify({ vw, cols: ["t", "present", "y", "h", "op", "seen"], rows }), contentType: "application/json" });
    });
}
