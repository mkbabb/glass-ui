// glass-ui 11.0.2 witnesses. Engines: `chromium-headless-new`, `coarse-touch`, and
// `webkit` on Playwright WebKit 2287 (`release-11-0-2.config.ts`, under `guarded
// --exclusive webkit`).
//
//   dark   `useGlobalDark({ storageKey })` reads and writes the key the `<head>` script
//          reads, and with an `initialValue` a toggle stores the concrete mode
//   press  under `prefers-reduced-motion: reduce`, a quick press on a seat of an open
//          dock's active layer lands its click on that seat, by mouse and by touch
//          (daraksha's glass-only repro `dock-press-scroll`, ported to `src/`)
//   slider a scrubber Slider at its minimum still draws its value: the fill is at least
//          the thumb wide and the thumb is painted, so the well's leading end differs
//          from its empty trailing end
import { expect, test, type Page } from "@playwright/test";

type DarkHandle = { stamped: boolean; isDark: () => boolean; toggle: () => void };

async function openDark(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-11-0-2/dark-harness.html?${query}`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
}

const dark = (page: Page) =>
    page.evaluate(() => {
        const d = (window as unknown as { __dark: DarkHandle }).__dark;
        return {
            stamped: d.stamped,
            isDark: d.isDark(),
            htmlDark: document.documentElement.classList.contains("dark"),
            site: localStorage.getItem("site-theme"),
            fallback: localStorage.getItem("vueuse-color-scheme"),
        };
    });

test.describe("dark · useGlobalDark", () => {
    test("dark · a fresh key opens on initialValue while the default key holds auto", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "light" });
        await page.goto("/tests-visual/release-11-0-2/dark-harness.html");
        await page.evaluate(() => {
            localStorage.clear();
            localStorage.setItem("vueuse-color-scheme", "auto");
        });
        await openDark(page, "key=site-theme&initial=dark");
        await page.waitForTimeout(50);
        const r = await dark(page);
        expect(r.stamped).toBe(true);
        expect(r.isDark).toBe(true);
        expect(r.htmlDark).toBe(true);
        expect(r.site).toBe("dark");
        expect(r.fallback).toBe("auto");
    });

    test("dark · night chosen twice on a dark system stays night when the system turns light", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "dark" });
        await page.goto("/tests-visual/release-11-0-2/dark-harness.html");
        await page.evaluate(() => localStorage.clear());
        await openDark(page, "initial=dark");
        await page.evaluate(() => (window as unknown as { __dark: DarkHandle }).__dark.toggle());
        await page.waitForTimeout(50);
        expect((await dark(page)).htmlDark).toBe(false);
        await page.evaluate(() => (window as unknown as { __dark: DarkHandle }).__dark.toggle());
        await page.waitForTimeout(50);
        expect((await dark(page)).fallback).toBe("dark");
        await page.emulateMedia({ colorScheme: "light" });
        await openDark(page, "initial=dark");
        await page.waitForTimeout(50);
        const r = await dark(page);
        expect(r.stamped).toBe(true);
        expect(r.isDark).toBe(true);
        expect(r.htmlDark).toBe(true);
    });
});

type PressHandle = {
    presses: () => Record<string, number>;
    scroller: () => { scrollLeft: number; scrollWidth: number; clientWidth: number } | null;
};

async function openPressDock(page: Page, width: number, touch: boolean): Promise<void> {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const summary = page.locator('[aria-label$="open the dock"]').first();
    if (touch) await summary.tap();
    else await summary.hover();
    await page.waitForTimeout(900);
    await page.evaluate(() => {
        const log: string[] = [];
        const scrolls: number[] = [];
        Object.assign(window, { __ev: log, __scrolls: scrolls });
        for (const t of ["pointerdown", "pointerup", "click"]) {
            document.addEventListener(
                t,
                (e) => {
                    const el = e.target as Element;
                    log.push(`${t}:${el.closest("[aria-label]")?.getAttribute("aria-label") ?? el.className}`);
                    scrolls.push(document.querySelector<HTMLElement>(".press-dock .dock-layer--full")?.scrollLeft ?? 0);
                },
                true,
            );
        }
    });
}

for (const width of [1440, 390]) {
    test(`press · a quick press on Again lands under reduced motion at ${width}`, async ({ page }, info) => {
        const touch = info.project.name === "coarse-touch";
        await openPressDock(page, width, touch);
        const rest = await page.evaluate(() => (window as unknown as { __press: PressHandle }).__press.scroller());
        const seat = page.locator('[aria-label="Again"]');
        if (touch) await seat.tap();
        else await seat.click();
        await page.waitForTimeout(300);
        const after = await page.evaluate(() => {
            const w = window as unknown as { __press: PressHandle; __ev: string[]; __scrolls: number[] };
            return { presses: w.__press.presses(), events: w.__ev, scrolls: w.__scrolls };
        });
        info.annotations.push({ type: "press", description: JSON.stringify({ rest, ...after }) });
        // The seat receives the whole press and its click.
        expect(after.events).toEqual(["pointerdown:Again", "pointerup:Again", "click:Again"]);
        expect(after.presses.Again ?? 0).toBe(1);
        // The active layer fits, so it has no scroll range, rests at 0 and nothing
        // scrolls it during the press.
        expect(rest).not.toBeNull();
        expect(rest!.scrollWidth - rest!.clientWidth).toBeLessThanOrEqual(0);
        expect(rest!.scrollLeft).toBe(0);
        expect(after.scrolls).toEqual([0, 0, 0]);
    });
}

// The mean per-channel difference of two same-size PNG crops, decoded in the page.
async function meanDiff(page: Page, a: Buffer, b: Buffer): Promise<number> {
    return page.evaluate(
        async ([a64, b64]) => {
            const read = async (b64: string) => {
                const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
                const c = new OffscreenCanvas(bmp.width, bmp.height);
                const g = c.getContext("2d")!;
                g.drawImage(bmp, 0, 0);
                return g.getImageData(0, 0, bmp.width, bmp.height).data;
            };
            const [x, y] = [await read(a64), await read(b64)];
            let sum = 0;
            for (let i = 0; i < x.length; i += 4) for (let k = 0; k < 3; k++) sum += Math.abs(x[i + k] - y[i + k]);
            return sum / ((x.length / 4) * 3);
        },
        [a.toString("base64"), b.toString("base64")],
    );
}

for (const size of ["sm", "md", "lg"]) {
    test(`slider · a scrubber at its minimum draws its value (${size})`, async ({ page }, info) => {
        await page.goto("/tests-visual/release-11-0-2/slider-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        const row = `[data-row="${size}"]`;
        const r = await page.evaluate((row) => {
            const box = (sel: string) => document.querySelector(`${row} ${sel}`)!.getBoundingClientRect();
            const thumb = document.querySelector(`${row} .slider-thumb`)!;
            const t = box(".slider-thumb");
            const range = box(".slider-range");
            const track = box(".slider-track");
            return {
                value: thumb.getAttribute("aria-valuenow"),
                thumb: { w: t.width, h: t.height, opacity: +getComputedStyle(thumb).opacity },
                range: { left: range.left - track.left, w: range.width },
                track: { x: track.x, y: track.y, w: track.width, h: track.height },
            };
        }, row);
        const side = r.track.h;
        const crop = (x: number) => page.screenshot({ clip: { x, y: r.track.y, width: side, height: side }, animations: "disabled" });
        const diff = await meanDiff(page, await crop(r.track.x), await crop(r.track.x + r.track.w - side));
        info.annotations.push({ type: "slider", description: JSON.stringify({ ...r, diff }) });
        expect(r.value).toBe("50");
        expect(r.thumb.w).toBeGreaterThan(0);
        expect(r.thumb.opacity).toBeGreaterThan(0);
        expect(r.range.w).toBeGreaterThanOrEqual(r.thumb.w - 0.5);
        expect(diff).toBeGreaterThan(8);
    });
}
