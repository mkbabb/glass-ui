import { expect, test } from "@playwright/test";

const ROUTE = "/display/music-staff";

test("MusicStaff paints a cream folio with settled SVG engraving in both modes", async ({
    page,
}) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1_500);

    const read = async () => page.locator('.music-staff[data-material="folio"]').first()
        .evaluate((staff) => {
            const viewport = staff.querySelector<HTMLElement>(".music-staff__viewport");
            const head = staff.querySelector<SVGPathElement>(".music-staff__head:not(.music-staff__head--open)");
            return {
                background: viewport ? getComputedStyle(viewport).backgroundColor : "",
                headFill: head ? getComputedStyle(head).fill : "",
                headFillOpacity: head ? getComputedStyle(head).fillOpacity : "",
                headAnimation: head ? getComputedStyle(head).animationName : "",
                noteCount: staff.querySelectorAll("[data-note-id]").length,
                role: viewport?.getAttribute("role"),
                shortcuts: viewport?.getAttribute("aria-keyshortcuts"),
            };
        });

    const folios = page.locator('.music-staff[data-material="folio"]');
    expect(await folios.count()).toBeGreaterThanOrEqual(2);
    const light = await read();
    expect(light.background).toContain("255");
    expect(light.noteCount).toBeGreaterThan(0);
    expect(light.headFillOpacity).toBe("1");
    expect(light.headAnimation).toContain("music-staff-head-in");
    expect(light.role).toBe("img");
    expect(light.shortcuts).toBe("ArrowLeft ArrowRight Home End");

    await page.evaluate(() => document.documentElement.classList.add("dark"));
    const dark = await read();
    expect(dark.background).toContain("255");
    expect(dark.headFillOpacity).toBe("1");
});

test("MusicStaff mobile viewport preserves horizontal score navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    const state = await page.locator('.music-staff[data-material="folio"] .music-staff__viewport')
        .first()
        .evaluate((viewport) => ({
            clientWidth: viewport.clientWidth,
            scrollWidth: viewport.scrollWidth,
            overflowX: getComputedStyle(viewport).overflowX,
            tabindex: viewport.getAttribute("tabindex"),
        }));

    expect(state.scrollWidth).toBeGreaterThan(state.clientWidth);
    expect(state.overflowX).toBe("auto");
    expect(state.tabindex).toBe("0");
});

test("MusicStaff reduced motion seats a complete static frame", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    const state = await page.locator('.music-staff[data-phase="enter"]')
        .first()
        .evaluate((staff) => {
            const line = staff.querySelector<SVGPathElement>(".music-staff__line");
            const head = staff.querySelector<SVGPathElement>(".music-staff__head");
            return {
                lineAnimation: line ? getComputedStyle(line).animationName : "",
                headAnimation: head ? getComputedStyle(head).animationName : "",
                headFillOpacity: head ? getComputedStyle(head).fillOpacity : "",
            };
        });

    expect(state.lineAnimation).toBe("none");
    expect(state.headAnimation).toBe("none");
    expect(state.headFillOpacity).toBe("1");
    await context.close();
});
