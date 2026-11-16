// glass-ui 11.1.1 witnesses: small controls whose state change must not move or reshape
// a box. Same four projects as `release-11-1-1.spec.ts`.
//
//   round   on a touch screen every SegmentedTabs strip, its tabs and its selected plate
//           are round-ended, at a compact width and past 20rem where the strip is a bar
//   weight  selecting and deselecting a word-labelled ToggleGroupItem moves no item box
//   lift    after a tap on touch, a `scale-on-hover` element returns to its rest scale
import { expect, test, type Page } from "@playwright/test";
import { gotoReady, isPhone, pressOn } from "./release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/controls-harness.html";

async function openHarness(page: Page): Promise<void> {
    await gotoReady(page, HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
}

type Corner = { what: string; h: number; r: number };

for (const strip of ["compact", "wide"] as const) {
    test(`round · a ${strip} SegmentedTabs strip is round-ended on touch`, async ({ page }, info) => {
        test.skip(!isPhone(info.project.name), "the touch floor and its shape are a coarse-pointer claim");
        await openHarness(page);
        const corners = await page.evaluate((id) => {
            const root = document.querySelector(`[data-testid="c-tabs-${id}"]`) as HTMLElement;
            const read = (what: string, el: Element): Corner => {
                const cs = getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return { what, h: r.height, r: Math.min(parseFloat(cs.borderTopLeftRadius), parseFloat(cs.borderBottomRightRadius)) };
            };
            return [
                read("strip", root),
                read("plate", root.querySelector(".segmented-indicator")!),
                ...[...root.querySelectorAll(".segmented-tab")].map((el, i) => read(`tab ${i}`, el)),
            ];
        }, strip);
        await info.attach("corners", { body: JSON.stringify(corners), contentType: "application/json" });
        expect(corners[0].h, "the strip holds a 44 px tab and its trim").toBeGreaterThanOrEqual(44);
        for (const c of corners) {
            expect(c.r, `${c.what}: corner ${c.r} on a ${c.h} px box ${JSON.stringify(corners)}`).toBeGreaterThanOrEqual(c.h / 2 - 0.5);
        }
    });
}

test("weight · selecting a word-labelled ToggleGroupItem moves no item box", async ({ page }, info) => {
    const project = info.project.name;
    await openHarness(page);
    const boxes = () =>
        page.evaluate(() =>
            [...document.querySelectorAll('[data-testid^="c-toggle-"]')].map((el) => {
                const r = el.getBoundingClientRect();
                return [Math.round(r.left * 10) / 10, Math.round(r.width * 10) / 10];
            }),
        );
    const rest = await boxes();
    await pressOn(page, project, '[data-testid="c-toggle-Underline"]');
    await page.waitForTimeout(400);
    expect(await page.locator('[data-testid="c-toggle-Underline"]').getAttribute("data-state"), "the item is selected").toBe("on");
    const on = await boxes();
    await pressOn(page, project, '[data-testid="c-toggle-Underline"]');
    await page.waitForTimeout(400);
    const off = await boxes();
    await info.attach("boxes", { body: JSON.stringify({ rest, on, off }), contentType: "application/json" });
    expect(on, "selected: every item where it was").toEqual(rest);
    expect(off, "deselected: every item where it was").toEqual(rest);
});

test("lift · a scale-on-hover element returns to rest after a tap", async ({ page }, info) => {
    test.skip(!isPhone(info.project.name), "a tap is a touch claim");
    await openHarness(page);
    await pressOn(page, info.project.name, '[data-testid="c-lift"]');
    await page.waitForTimeout(800);
    const scale = await page.locator('[data-testid="c-lift"]').evaluate((el) => getComputedStyle(el).scale);
    expect(scale === "none" || scale === "1", `scale after the tap: ${scale}`).toBe(true);
});
