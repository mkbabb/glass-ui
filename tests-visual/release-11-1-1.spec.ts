// glass-ui 11.1.1 witnesses: how surfaces leave. Four projects in
// `release-11-1-1.config.ts`: Chromium and Playwright WebKit 2287, each at 390 × 844 with
// touch and at 1440 × 900 with the mouse (the WebKit pair under `guarded --exclusive
// webkit`). Every cell films the surface frame by frame from just before the closing
// input until it is gone.
//
//   form   a Select seated in a GlassDock, closed by a pick, a press outside and Escape,
//          leaves in the form it opened in: on the phone the sheet keeps its full width,
//          its side, its material and its place on every frame of the exit, and moves
//          only downward, no further in one frame than its own height; a DropdownMenu
//          seated in the dock keeps its material on every frame of its exit
import { expect, test, type Page } from "@playwright/test";
import { exitOf, isPhone, markFilm, press, pressOn, startFilm, stopFilm, type Film } from "./release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";

async function openHarness(page: Page, query = ""): Promise<void> {
    await page.goto(`${HARNESS}${query}`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
}

type Route = "pick" | "outside" | "escape";

async function closeBy(page: Page, project: string, route: Route, pickSelector: string): Promise<void> {
    if (route === "pick") await pressOn(page, project, pickSelector);
    else if (route === "outside") await press(page, project, 195, 300);
    else await page.keyboard.press("Escape");
}

async function filmClose(
    page: Page,
    project: string,
    trigger: string,
    content: string,
    route: Route,
    pick: string,
): Promise<Film> {
    await pressOn(page, project, trigger);
    await page.locator(`${content}[data-state="open"]`).waitFor();
    await page.waitForTimeout(700);
    await startFilm(page, content);
    await markFilm(page);
    await closeBy(page, project, route, pick);
    return stopFilm(page, 900);
}

const routes: Route[] = ["pick", "outside", "escape"];

for (const route of routes) {
    test(`form · a dock Select leaves in the form it opened in · ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(
            project === "webkit-phone" && route === "outside",
            "Playwright WebKit's touchscreen.tap reaches no outside-press listener; the route is read at 1440",
        );
        await openHarness(page);
        const film = await filmClose(
            page,
            project,
            '[data-testid="x-select"]',
            '[data-testid="x-select-content"]',
            route,
            '[data-testid="x-opt-Gradient"]',
        );
        const { rest, exit, gone } = exitOf(film);
        expect(rest, "the surface was open before the close").toBeTruthy();
        expect(gone, "the surface unmounts after its exit").toBe(true);
        if (isPhone(project)) expect(rest.form, "the phone Select opens as a sheet").toBe("sheet");
        const report = exit.map((f) => ({ t: Math.round(f.t - film.mark), x: f.x, y: f.y, w: f.w, op: f.op, form: f.form, bf: f.bf }));
        await info.attach("film", { body: JSON.stringify(report), contentType: "application/json" });
        let prevY = rest.y!;
        for (const f of exit) {
            expect(f.form, `form on every exit frame ${JSON.stringify(report)}`).toBe(rest.form);
            expect(f.surface, `material attribute on every exit frame`).toBe(rest.surface);
            expect(f.bf, `backdrop on every exit frame`).toBe(rest.bf);
            // The anchored form follows its trigger, whose label a pick rewrites; the sheet
            // holds the screen's edge.
            expect(Math.abs(f.x! - rest.x!), `x holds ${JSON.stringify(report)}`).toBeLessThanOrEqual(isPhone(project) ? 1 : 12);
            expect(Math.abs(f.w! - rest.w!), `width holds ${JSON.stringify(report)}`).toBeLessThanOrEqual(1);
            if (isPhone(project)) {
                expect(f.y!, `the sheet never rises ${JSON.stringify(report)}`).toBeGreaterThanOrEqual(rest.y! - 1);
                expect(f.y! - prevY, `one frame moves the sheet no further than its height ${JSON.stringify(report)}`).toBeLessThanOrEqual(rest.h!);
            } else {
                expect(Math.abs(f.y! - rest.y!), `the anchored plate stays at its trigger ${JSON.stringify(report)}`).toBeLessThanOrEqual(12);
            }
            prevY = f.y!;
        }
    });

    test(`form · a dock DropdownMenu keeps its material through the exit · ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(
            project === "webkit-phone" && route === "outside",
            "Playwright WebKit's touchscreen.tap reaches no outside-press listener; the route is read at 1440",
        );
        await openHarness(page);
        const film = await filmClose(
            page,
            project,
            '[data-testid="x-menu"]',
            '[data-testid="x-menu-content"]',
            route,
            '[data-testid="x-item-Share"]',
        );
        const { rest, exit, gone } = exitOf(film);
        expect(rest).toBeTruthy();
        expect(gone).toBe(true);
        await info.attach("film", {
            body: JSON.stringify(exit.map((f) => ({ t: Math.round(f.t - film.mark), op: f.op, surface: f.surface, bf: f.bf }))),
            contentType: "application/json",
        });
        for (const f of exit) {
            const at = `+${Math.round(f.t - film.mark)} ms`;
            expect(f.surface, `material attribute ${at}`).toBe(rest.surface);
            expect(f.bf, `backdrop ${at}`).toBe(rest.bf);
            expect(f.bg, `fill ${at}`).toBe(rest.bg);
        }
    });
}
