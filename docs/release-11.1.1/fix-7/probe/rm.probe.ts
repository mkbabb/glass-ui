// Fix seat 7 probe, readings only: the sheet harness's detented Sheet under reduced
// motion, opened by touch and closed by Escape, every frame's box and effective opacity
// from the input.
import { test } from "@playwright/test";
import { gotoReady, markFilm, pressOn, startFilm, stopFilm } from "../../../../tests-visual/release-11-1-1/film";

const CONTENT = '[data-testid="s-content"]';

test("rm · a detented Sheet under reduced motion", async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoReady(page, "/tests-visual/release-11-1-1/sheet-harness.html");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const legs: Record<string, unknown> = {};
    for (const leg of ["open", "close"] as const) {
        await startFilm(page, CONTENT);
        await markFilm(page);
        if (leg === "open") await pressOn(page, info.project.name, '[data-testid="s-open"]');
        else await page.keyboard.press("Escape");
        const film = await stopFilm(page, 900);
        legs[leg] = film.frames
            .filter((f) => f.t >= film.mark - 20)
            .map((f) => [Math.round(f.t - film.mark), f.present ? 1 : 0, Math.round(f.y ?? 0), Math.round(f.h ?? 0), +(f.op ?? 0).toFixed(3)])
            .slice(0, 30);
        await page.waitForTimeout(600);
    }
    await info.attach("rm", { body: JSON.stringify(legs), contentType: "application/json" });
});
