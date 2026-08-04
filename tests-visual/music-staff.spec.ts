import { expect, test } from "@playwright/test";

const ROUTE = "/display/music-staff";

test("MusicStaff folio paints real backdrop glass in both modes", async ({ page }) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1_500);

    const read = async () => page.locator('.music-staff[data-material="folio"]').first()
        .evaluate((staff) => {
            const window = staff.querySelector<HTMLElement>(".music-staff__window")!;
            const style = getComputedStyle(window);
            return {
                background: style.backgroundColor,
                backdrop: style.backdropFilter,
                // The grain is the ladder's ::after; the component paints no copy.
                image: style.backgroundImage,
                beams: staff.querySelectorAll(".music-staff__beam").length,
                heads: staff.querySelectorAll(".music-staff__head").length,
            };
        });

    const light = await read();
    // The cured paint bug: the rung's backdrop must survive as a real filter.
    expect(light.backdrop).not.toBe("none");
    expect(light.background).not.toBe("rgba(0, 0, 0, 0)");
    expect(light.image).toBe("none");
    expect(light.heads).toBeGreaterThan(0);
    expect(light.beams).toBeGreaterThan(0);

    await page.evaluate(() => document.documentElement.classList.add("dark"));
    const dark = await read();
    expect(dark.backdrop).not.toBe("none");
    expect(dark.background).not.toBe("rgba(0, 0, 0, 0)");
    expect(dark.image).toBe("none");
});

test("MusicStaff loading reel streams while the clef stays parked", async ({ page }) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    const state = await page.locator('.music-staff[data-mode="loading"]').first()
        .evaluate((staff) => {
            const reel = staff.querySelector<SVGGElement>(".music-staff__reel")!;
            const note = staff.querySelector<SVGGElement>(".music-staff__note")!;
            const clef = staff.querySelector<SVGGElement>(".music-staff__clef")!;
            const window = staff.querySelector<HTMLElement>(".music-staff__window")!;
            const furniture = staff.querySelector<HTMLElement>(".music-staff__furniture")!;
            return {
                reelAnimation: getComputedStyle(reel).animationName,
                reelTiming: getComputedStyle(reel).animationTimingFunction,
                strike: getComputedStyle(note).animationName,
                strikeDelay: getComputedStyle(note).animationDelay,
                clefInsideReel: reel.contains(clef),
                overflow: getComputedStyle(window).overflow,
                // The staff furniture is window space: the rules reach the far
                // edge of the folio, and the reel's ink reaches with them.
                ruled: furniture.getBoundingClientRect().width
                    >= window.getBoundingClientRect().width - 1,
                masked: getComputedStyle(
                    staff.querySelector<SVGGElement>(".music-staff__transport")!,
                ).mask,
            };
        });

    expect(state.reelAnimation).toContain("music-staff-reel");
    expect(state.reelTiming).toBe("linear");
    expect(state.strike).toContain("music-staff-strike");
    expect(state.strikeDelay.startsWith("-")).toBe(true);
    expect(state.clefInsideReel).toBe(false);
    expect(state.overflow).toBe("hidden");
    expect(state.ruled).toBe(true);
    expect(state.masked).toContain("url(");
});

test("MusicStaff score scale is constant and the engraving never squashes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    const state = await page.locator('.music-staff[data-mode="score"] .music-staff__window')
        .first()
        .evaluate((window) => {
            const svg = window.querySelector<SVGSVGElement>("svg")!;
            const box = svg.getBoundingClientRect();
            const view = svg.viewBox.baseVal;
            const space = parseFloat(
                getComputedStyle(window).getPropertyValue("--_music-staff-space") || "8",
            );
            return {
                scale: box.width / view.width,
                space,
                overflowX: getComputedStyle(window).overflowX,
                tabindex: window.getAttribute("tabindex"),
                scrolls: window.scrollWidth > window.clientWidth,
            };
        });

    expect(state.scale).toBeCloseTo(state.space, 1);
    expect(state.overflowX).toBe("auto");
    expect(state.tabindex).toBe("0");
    expect(state.scrolls).toBe(true);
});

test("MusicStaff reduced motion stops the reel but keeps the busy signal", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    const state = await page.locator('.music-staff[data-mode="loading"]').first()
        .evaluate((staff) => ({
            reel: getComputedStyle(staff.querySelector(".music-staff__reel")!).animationName,
            note: getComputedStyle(staff.querySelector(".music-staff__note")!).animationName,
            line: getComputedStyle(staff.querySelector(".music-staff__line")!).animationName,
        }));

    expect(state.reel).toBe("none");
    expect(state.note).toBe("none");
    expect(state.line).toContain("music-staff-breath");

    const score = await page.locator('.music-staff[data-mode="score"]').first()
        .evaluate((staff) => ({
            line: getComputedStyle(staff.querySelector(".music-staff__line")!).animationName,
            note: getComputedStyle(staff.querySelector(".music-staff__note")!).animationName,
        }));
    expect(score.line).toBe("none");
    expect(score.note).toBe("none");
    await context.close();
});
