// Fix seat 5 probe, readings only: the reopen cell's sequence on a Collapsible, filmed
// with the release film (`startFilm`, computed style up the ancestor chain and the
// running animations on every frame) instead of a height-only sampler, with the release
// cell's own setup (`gotoReady`, the open height read, the wait on the open state).
import { test } from "@playwright/test";
import { gotoReady, markFilm, markTurn, pressOn, startFilm, stopFilm } from "../../../../tests-visual/release-11-1-1/film";

const TRIGGER = '[data-testid="x-collapsible"]';
const CONTENT = '[data-testid="x-collapsible-content"]';

for (const setup of ["cell", "bare"] as const) {
    test(`heavy · ${setup}`, async ({ page }, info) => {
        const project = info.project.name;
        await gotoReady(page, "/tests-visual/release-11-1-1/exits-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(300);
        if (setup === "cell") {
            await pressOn(page, project, TRIGGER);
            await page.waitForTimeout(900);
            await pressOn(page, project, TRIGGER);
            await page.waitForTimeout(900);
        }
        await pressOn(page, project, TRIGGER);
        await page.locator(`${CONTENT}[data-state$="open"]`).waitFor();
        await page.waitForTimeout(900);
        await startFilm(page, CONTENT);
        await markFilm(page);
        await pressOn(page, project, TRIGGER);
        await page.waitForTimeout(50);
        await markTurn(page);
        await pressOn(page, project, TRIGGER);
        const film = await stopFilm(page, 1400);
        const fr = film.frames;
        const gaps = fr.slice(1).map((f, i) => [Math.round(fr[i].t - film.mark), Math.round(f.t - fr[i].t)]).filter(([, g]) => g > 33);
        const full = Math.max(...fr.map((f) => f.h ?? 0)) || 1;
        const k = film.turnFrame ?? -1;
        await info.attach("heavy", { body: JSON.stringify({ setup, turnAt: k > 0 ? +((fr[k - 1].h ?? 0) / full).toFixed(3) : null, holes: gaps }), contentType: "application/json" });
    });
}
