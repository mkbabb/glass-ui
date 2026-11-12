// glass-ui 11.0.2 witnesses. Engines: `chromium-headless-new`, `coarse-touch`, and
// `webkit` on Playwright WebKit 2287 (`release-11-0-2.config.ts`, under `guarded
// --exclusive webkit`).
//
//   dark   `useGlobalDark({ storageKey })` reads and writes the key the `<head>` script
//          reads, and with an `initialValue` a toggle stores the concrete mode
//   press  under `prefers-reduced-motion: reduce`, a quick press on a seat of an open
//          dock's active layer lands its click on that seat, by mouse and by touch
//          (daraksha's glass-only repro `dock-press-scroll`, ported to `src/`)
//   edge   a GlassDock page opens and stays alive in unshimmed Playwright WebKit (the
//          `webkit-2311` project, the build Playwright resolves), and in Chromium the
//          plate edge computes 11.0.0's colour at t = 0, 0.5 and 1
//   static every control inside a `backdrop-mode="static"` dock, and everything it
//          draws, computes no backdrop-filter at rest, hover, press and active
//   blob   from 100 ms after a sweep and release over the hero blob the body stays a
//          bead: in every sampled frame its centre is painted and the canvas box's four
//          corners show the page ground
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

test("edge · a GlassDock page opens and stays alive", async ({ page }, info) => {
    let crashed = false;
    page.on("crash", () => (crashed = true));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(600);
    const summary = page.locator('[aria-label$="open the dock"]').first();
    if (info.project.name === "coarse-touch") await summary.tap();
    else await summary.hover();
    await page.waitForTimeout(1200);
    const border = await page.evaluate(
        () => getComputedStyle(document.querySelector(".press-dock .dock-plate")!).borderTopColor,
    );
    info.annotations.push({ type: "edge", description: JSON.stringify({ crashed, border }) });
    expect(crashed).toBe(false);
    expect(border).toMatch(/\/ 0\.0[5-8]/);
});

test("edge · the plate edge computes 11.0.0's colour at t = 0, 0.5 and 1", async ({ page }, info) => {
    test.skip(info.project.name.startsWith("webkit"), "the 11.0.0 reference form is the one WebKit cannot compute");
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(400);
    const rows = await page.evaluate(() => {
        const plate = document.querySelector<HTMLElement>(".press-dock .dock-plate")!;
        // 11.0.0's edge: the dock hairline mixed into the floating one by t, each a
        // translucent mix of the plate's own foreground.
        const ref = document.createElement("span");
        ref.style.cssText =
            "position:absolute;border:1.5px solid color-mix(in srgb, color-mix(in srgb, var(--foreground) 8%, transparent) calc(var(--dock-expand-t) * 100%), color-mix(in srgb, var(--foreground) 5%, transparent))";
        plate.append(ref);
        const nums = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
        const out = [];
        for (const t of [0, 0.5, 1]) {
            plate.style.setProperty("--dock-expand-t", String(t));
            out.push({ t, plate: getComputedStyle(plate).borderTopColor, ref: getComputedStyle(ref).borderTopColor });
        }
        ref.remove();
        plate.style.removeProperty("--dock-expand-t");
        return out.map((r) => ({ ...r, delta: Math.max(...nums(r.plate).map((v, i) => Math.abs(v - (nums(r.ref)[i] ?? NaN)))) }));
    });
    info.annotations.push({ type: "edge", description: JSON.stringify(rows) });
    for (const r of rows) expect(r.delta, `t = ${r.t}: ${r.plate} against ${r.ref}`).toBeLessThan(0.002);
});

// Every box a static dock's control paints (the control, its descendants and their
// pseudo-elements) with a backdrop-filter other than `none`.
const filtered = (page: Page, label: string) =>
    page.evaluate((label) => {
        const control = document.querySelector(`.static-dock [aria-label="${label}"]`)!;
        const hits: string[] = [];
        for (const el of [control, ...control.querySelectorAll("*")]) {
            for (const pseudo of [null, "::before", "::after"]) {
                const cs = getComputedStyle(el, pseudo);
                const f = cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || "none";
                if (f !== "none") hits.push(`${el.className || el.tagName}${pseudo ?? ""}: ${f}`);
            }
        }
        return hits;
    }, label);

for (const theme of ["light", "dark"]) {
    test(`static · a static dock's controls draw no backdrop-filter (${theme})`, async ({ page }, info) => {
        const touch = info.project.name === "coarse-touch";
        await page.goto(`/tests-visual/release-11-0-2/static-harness.html?theme=${theme}`);
        await page.locator("body[data-ready='1'] .static-dock").waitFor();
        await page.waitForTimeout(900);
        const read: Record<string, string[]> = {};
        for (const label of ["Home", "Search", "Motion", "Day", "Week"]) {
            const control = page.locator(`.static-dock [aria-label="${label}"]`);
            read[`${label} rest`] = await filtered(page, label);
            const b = (await control.boundingBox())!;
            if (!touch) {
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                await page.waitForTimeout(250);
                read[`${label} hover`] = await filtered(page, label);
            }
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(150);
            read[`${label} press`] = await filtered(page, label);
            await page.mouse.up();
            await page.mouse.move(2, 2);
            await page.waitForTimeout(250);
        }
        const mode = await page.evaluate(() => document.querySelector(".static-dock")!.getAttribute("data-backdrop-mode"));
        const hits = Object.entries(read).filter(([, v]) => v.length);
        info.annotations.push({ type: "static", description: JSON.stringify({ mode, hits }) });
        expect(mode).toBe("static");
        expect(hits).toEqual([]);
    });
}

test("static · a live dock's active control keeps its capsule lens", async ({ page }) => {
    await page.goto("/tests-visual/release-11-0-2/static-harness.html?mode=live");
    await page.locator("body[data-ready='1'] .static-dock").waitFor();
    await page.waitForTimeout(600);
    expect(await filtered(page, "Home")).toHaveLength(1);
});

test("blob · from 100 ms after a sweep and release the body stays a bead, not a filled box", async ({ page }, info) => {
    test.skip(info.project.name !== "chromium-headless-new", "one Chromium cell, as the row asks");
    await page.setViewportSize({ width: 800, height: 700 });
    await page.goto("/tests-visual/release-11-0-2/blob-harness.html");
    await page.locator("body[data-ready='1'] .goo-blob-hit").waitFor();
    await page.waitForTimeout(1500);
    const box = (await page.locator(".goo-blob-canvas").boundingBox())!;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    // A sweep across the canvas box, as fast as the pointer moves, then a press and
    // release on the body.
    await page.mouse.move(cx - box.width, cy);
    await page.waitForTimeout(800);
    for (let i = 0; i <= 12; i++) {
        await page.mouse.move(cx - box.width * 0.7 + i * box.width * 0.12, cy + Math.sin(i / 2) * box.height * 0.15);
    }
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(100);
    // Painted share of the centre square and of each corner square (a fifth of the
    // side) against the page ground, in frames from 100 ms to about 500 ms.
    const frames = [];
    for (let i = 0; i < 8; i++) {
        const png = await page.screenshot({ clip: box });
        frames.push(
            await page.evaluate(async (b64) => {
                const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
                const c = new OffscreenCanvas(bmp.width, bmp.height);
                const g = c.getContext("2d")!;
                g.drawImage(bmp, 0, 0);
                const d = g.getImageData(0, 0, bmp.width, bmp.height).data;
                const ground = [d[0]!, d[1]!, d[2]!];
                const k = Math.round(bmp.width / 5);
                const share = (x0: number, y0: number) => {
                    let n = 0;
                    for (let y = y0; y < y0 + k; y++)
                        for (let x = x0; x < x0 + k; x++) {
                            const i = (y * bmp.width + x) * 4;
                            if (Math.abs(d[i]! - ground[0]) + Math.abs(d[i + 1]! - ground[1]) + Math.abs(d[i + 2]! - ground[2]) > 45) n++;
                        }
                    return +(n / (k * k)).toFixed(3);
                };
                const mid = Math.round(bmp.width / 2 - k / 2);
                const far = bmp.width - k - 1;
                return { centre: share(mid, mid), corners: [share(1, 1), share(far, 1), share(1, far), share(far, far)] };
            }, png.toString("base64")),
        );
        await page.waitForTimeout(30);
    }
    info.annotations.push({ type: "blob", description: JSON.stringify(frames) });
    for (const f of frames) {
        expect(f.centre).toBeGreaterThan(0.5);
        for (const c of f.corners) expect(c).toBeLessThan(0.05);
    }
});
