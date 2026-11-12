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
//   fold   the idle fold of an untouched `collapse="open"` dock on a scrolling page lays
//          out once per frame of its morph (Chromium, which counts layouts)
//   fill   in dark a hovered, pressed or selected dock seat paints lighter than the
//          plate, on a static and a live dock; the light scheme's fills are the plate
//          rungs
//   blob   from 100 ms after a sweep and release over the hero blob the body stays a
//          bead: in every sampled frame its centre is painted and the canvas box's four
//          corners show the page ground
//   cutcap an open dock whose active layer is narrower than an inactive one, with a
//          #persistent-end seat and `--radius-dock: 1.875rem`, paints four equal plate
//          corners (daraksha's glass-only repro `dock-cutcap`, ported to `src/`)
//   slider a scrubber Slider at its minimum still draws its value: the fill is at least
//          the thumb wide and the thumb is painted, so the well's leading end differs
//          from its empty trailing end; the thumb paints `--card` with
//          `--slider-thumb-bg` unset, and the token when it is set
//   pager  a PagerDots neighbour hop paints a neck no wider than the pitch plus one dot
//   wheel  a vertical wheel over a horizontal dock's overflowing run scrolls the page; each
//          run contains overscroll on its own scroll axis only
//   rail   a start-anchored vertical dock whose consumer yields its open content on the
//          collapsed face: the close holds its top edge and crest and ends on the disc;
//          the open holds the crest from its first frame and keeps the foot in the plate
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

test("slider · the thumb paints --card by default and --slider-thumb-bg when set", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/slider-harness.html");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
        const row = document.querySelector<HTMLElement>('[data-row="md"]')!;
        const thumb = row.querySelector(".slider-thumb")!;
        // `--card` as this row resolves it, the thumb's paint before the hook.
        const ref = document.createElement("span");
        ref.style.background = "var(--card)";
        row.append(ref);
        const card = getComputedStyle(ref).backgroundColor;
        ref.remove();
        const unset = getComputedStyle(thumb).backgroundColor;
        row.style.setProperty("--slider-thumb-bg", "rgb(200, 30, 60)");
        const set = getComputedStyle(thumb).backgroundColor;
        return { card, unset, set };
    });
    info.annotations.push({ type: "slider", description: JSON.stringify(r) });
    expect(r.unset).toBe(r.card);
    expect(r.set).toBe("rgb(200, 30, 60)");
});

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

// The mean relative luminance of a PNG crop, decoded in the page.
async function meanLum(page: Page, png: Buffer): Promise<number> {
    return page.evaluate(async (b64) => {
        const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
        const c = new OffscreenCanvas(bmp.width, bmp.height);
        const g = c.getContext("2d")!;
        g.drawImage(bmp, 0, 0);
        const d = g.getImageData(0, 0, bmp.width, bmp.height).data;
        const lin = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        let sum = 0;
        for (let i = 0; i < d.length; i += 4) sum += 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
        return sum / (d.length / 4);
    }, png.toString("base64"));
}

// A seat's state fill against the plate it sits on, over one flat ground so the live
// plate is the same everywhere. Each read is a band across the middle of the seat just
// under its top edge, clear of the glyph; the plate is the same band of Search at rest.
for (const mode of ["static", "live"]) {
    test(`fill · in dark a hovered, pressed or selected seat lifts the plate (${mode})`, async ({ page }, info) => {
        const touch = info.project.name === "coarse-touch";
        await page.goto(`/tests-visual/release-11-0-2/static-harness.html?theme=dark&mode=${mode}&ground=plain`);
        await page.locator("body[data-ready='1'] .static-dock").waitFor();
        await page.mouse.move(2, 2);
        await page.waitForTimeout(900);
        const band = async (label: string) => {
            const b = (await page.locator(`.static-dock [aria-label="${label}"]`).boundingBox())!;
            const clip = { x: b.x + b.width * 0.3, y: b.y + 4, width: b.width * 0.4, height: 4 };
            return meanLum(page, await page.screenshot({ clip, animations: "disabled" }));
        };
        const r: Record<string, number> = {
            plate: await band("Search"),
            selected: await band("Home"),
            selectedTab: await band("Day"),
            restingTab: await band("Week"),
        };
        const b = (await page.locator('.static-dock [aria-label="Search"]').boundingBox())!;
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(400);
        if (!touch) r.hover = await band("Search");
        await page.mouse.down();
        await page.waitForTimeout(400);
        r.press = await band("Search");
        await page.mouse.up();
        info.annotations.push({ type: "fill", description: JSON.stringify(r) });
        // A lift of at least 0.006 in relative luminance, a quarter of the dark plate's own.
        const lift = 0.006;
        expect(Math.abs(r.restingTab - r.plate), "a resting tab is the plate").toBeLessThan(0.002);
        if (!touch) expect(r.hover - r.plate, "hover").toBeGreaterThan(lift);
        expect(r.press - r.plate, "press").toBeGreaterThan(lift);
        expect(r.selected - r.plate, "selected").toBeGreaterThan(lift);
        expect(r.selectedTab - r.plate, "selected tab").toBeGreaterThan(lift);
    });
}

test("fill · the light scheme's seat fills are the plate rungs", async ({ page }, info) => {
    test.skip(info.project.name === "coarse-touch", "hover is a fine-pointer read");
    await page.goto("/tests-visual/release-11-0-2/static-harness.html?theme=light");
    await page.locator("body[data-ready='1'] .static-dock").waitFor();
    await page.waitForTimeout(900);
    const b = (await page.locator('.static-dock [aria-label="Search"]').boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".static-dock")!;
        const ref = (value: string) => {
            const span = document.createElement("span");
            span.style.background = value;
            dock.append(span);
            const c = getComputedStyle(span).backgroundColor;
            span.remove();
            return c;
        };
        const bg = (label: string) => getComputedStyle(dock.querySelector(`[aria-label="${label}"]`)!).backgroundColor;
        return {
            hover: bg("Search"),
            resting: ref("var(--glass-plate-resting)"),
            selectedTab: bg("Day"),
            floating: ref("var(--glass-plate-floating)"),
        };
    });
    info.annotations.push({ type: "fill", description: JSON.stringify(r) });
    expect(r.hover).toBe(r.resting);
    expect(r.selectedTab).toBe(r.floating);
});

// The layouts the page runs from 3 s to 5.5 s after mount, across the idle fold of an
// untouched `collapse="open"` dock (it folds 3.6 s after mount) while the page scrolls
// every frame, and the frames in which the fold's morph scalar moved. Chromium counts
// layouts (CDP `LayoutCount`); WebKit has no counter.
test("fold · an idle fold lays out once per morph frame on a scrolling page", async ({ page }, info) => {
    test.skip(info.project.name.startsWith("webkit"), "layouts are counted over CDP");
    await page.setViewportSize({ width: 1440, height: 900 });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Performance.enable");
    const layouts = async () =>
        (await cdp.send("Performance.getMetrics")).metrics.find((m) => m.name === "LayoutCount")!.value;
    await page.goto("/tests-visual/release-11-0-2/fold-harness.html");
    await page.locator("body[data-ready='1'] .fold-dock").waitFor();
    await page.waitForTimeout(3000);
    const before = await layouts();
    const r = await page.evaluate(async () => {
        const root = document.querySelector<HTMLElement>(".glass-dock")!;
        let frames = 0;
        let morphFrames = 0;
        let last = root.style.getPropertyValue("--dock-morph-t");
        const end = performance.now() + 2500;
        await new Promise<void>((done) => {
            const tick = () => {
                frames++;
                scrollBy(0, 3);
                const t = root.style.getPropertyValue("--dock-morph-t");
                if (t !== last) morphFrames++;
                last = t;
                if (performance.now() < end) requestAnimationFrame(tick);
                else done();
            };
            requestAnimationFrame(tick);
        });
        return { frames, morphFrames, collapsed: root.classList.contains("collapsed") };
    });
    const count = (await layouts()) - before;
    info.annotations.push({ type: "fold", description: JSON.stringify({ ...r, layouts: count }) });
    expect(r.collapsed).toBe(true);
    expect(r.morphFrames).toBeGreaterThan(10);
    // One layout per morph frame, and a few for the fold's arm and settle.
    expect(count).toBeLessThanOrEqual(r.morphFrames + 12);
});

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

for (const width of [1440, 390]) {
    test(`cutcap · the open narrow face with an end seat has four equal plate corners at ${width}`, async ({ page }, info) => {
        const touch = info.project.name === "coarse-touch";
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/tests-visual/release-11-0-2/cutcap-harness.html?radius-dock=1.875rem&active=page&end=1");
        await page.locator(".repro-dock .dock-plate").waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(800);
        const summary = page.locator('[aria-label$="open the dock"]').first();
        if (touch) await summary.tap();
        else await summary.hover();
        await page.waitForTimeout(1200);
        const r = await page.evaluate(() => {
            const dock = document.querySelector<HTMLElement>(".repro-dock")!;
            const plate = dock.querySelector<HTMLElement>(".dock-plate")!;
            const cs = getComputedStyle(plate);
            const run = dock.querySelector<HTMLElement>(".dock-run");
            return {
                collapsed: dock.classList.contains("collapsed"),
                corners: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map((v) => parseFloat(v)),
                clip: cs.clipPath,
                box: [plate.offsetWidth, plate.offsetHeight],
                runOverflow: run ? run.scrollWidth - run.clientWidth : null,
            };
        });
        info.annotations.push({ type: "cutcap", description: JSON.stringify(r) });
        expect(r.collapsed).toBe(false);
        expect(Math.min(...r.corners)).toBeGreaterThan(0);
        expect(Math.max(...r.corners) - Math.min(...r.corners)).toBeLessThanOrEqual(0.5);
        // A cut cap is drawn by the clip: its rounded inset, if any, is equal on all four.
        const round = /round\s+([^)]*)/.exec(r.clip)?.[1]?.split(/\s+/).map(parseFloat) ?? [];
        if (round.length) expect(Math.max(...round) - Math.min(...round)).toBeLessThanOrEqual(0.5);
    });
}

test("pager · a neighbour hop paints a neck no wider than the pitch plus a dot", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/pager-harness.html");
    await page.locator("body[data-ready='1'] [data-witness='pager'] .goo-body").first().waitFor();
    await page.waitForTimeout(400);
    const geo = await page.evaluate(() => {
        const dots = [...document.querySelectorAll<HTMLElement>("[data-witness='pager'] .goo-dot")];
        const body = document.querySelector<HTMLElement>("[data-witness='pager'] .goo-body")!;
        const a = dots[0]!.getBoundingClientRect();
        const b = dots[1]!.getBoundingClientRect();
        return { pitch: b.left - a.left, dot: body.offsetWidth, token: getComputedStyle(body).getPropertyValue("--pager-dot-size").trim() };
    });
    expect(geo.dot).toBeGreaterThan(4);
    const hops: { to: number; frames: number; widest: number }[] = [];
    for (const to of [1, 2, 1, 0]) {
        const widths = await page.evaluate(
            (to) =>
                new Promise<number[]>((resolve) => {
                    const neck = document.querySelector<HTMLElement>("[data-witness='pager'] .goo-neck")!;
                    const out: number[] = [];
                    const t0 = performance.now();
                    const tick = () => {
                        if (getComputedStyle(neck).opacity !== "0") out.push(neck.getBoundingClientRect().width);
                        if (performance.now() - t0 < 700) requestAnimationFrame(tick);
                        else resolve(out);
                    };
                    (window as unknown as { __go: (i: number) => void }).__go(to);
                    requestAnimationFrame(tick);
                }),
            to,
        );
        hops.push({ to, frames: widths.length, widest: widths.length ? Math.max(...widths) : 0 });
    }
    info.annotations.push({ type: "pager", description: JSON.stringify({ geo, hops }) });
    for (const hop of hops) {
        expect(hop.frames, `the neck bridged the hop to ${hop.to}`).toBeGreaterThan(0);
        expect(hop.widest, `token ${geo.token}`).toBeLessThanOrEqual(geo.pitch + geo.dot + 0.5);
    }
});

test("wheel · a vertical wheel over a horizontal dock's run scrolls the page", async ({ page }, info) => {
    test.skip(info.project.name === "coarse-touch", "a wheel is a fine-pointer gesture");
    await page.goto("/tests-visual/release-11-0-2/wheel-harness.html");
    const run = page.locator("body[data-ready='1'] [data-witness='dock'] .dock-run");
    await run.waitFor();
    await page.waitForTimeout(400);
    const css = await run.evaluate((e) => {
        const cs = getComputedStyle(e);
        return { overflow: e.scrollWidth - e.clientWidth, x: cs.overscrollBehaviorX, y: cs.overscrollBehaviorY };
    });
    await run.scrollIntoViewIfNeeded();
    const box = (await run.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const y0 = await page.evaluate(() => scrollY);
    for (let i = 0; i < 3; i++) {
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(80);
    }
    await page.waitForTimeout(250);
    const moved = (await page.evaluate(() => scrollY)) - y0;
    info.annotations.push({ type: "wheel", description: JSON.stringify({ css, moved }) });
    expect(css.overflow, "the run is a real scroller").toBeGreaterThan(0);
    expect(moved, "the page moved under the dock").toBeGreaterThan(150);
    expect(css).toMatchObject({ x: "contain", y: "auto" });
});

test("wheel · a vertical dock's run contains its own axis and passes the other", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/wheel-harness.html?orientation=vertical");
    const run = page.locator("body[data-ready='1'] [data-witness='dock'] .dock-run");
    await run.waitFor();
    const css = await run.evaluate((e) => {
        const cs = getComputedStyle(e);
        return { x: cs.overscrollBehaviorX, y: cs.overscrollBehaviorY };
    });
    info.annotations.push({ type: "wheel", description: JSON.stringify(css) });
    expect(css).toEqual({ x: "auto", y: "contain" });
});

type Box = [number, number, number, number];
type RailFrame = { morphing: boolean; root: Box; crest: Box; foot: Box | null };

async function openRail(page: Page): Promise<void> {
    await page.goto("/tests-visual/release-11-0-2/rail-harness.html?theme=dark");
    await page.locator("body[data-ready='1'] [data-witness='rail']").waitFor();
    await page.waitForTimeout(400);
}

/** One record per rAF for `ms` after `act` runs. */
function railFrames(page: Page, act: "__expand" | "__collapse", ms: number): Promise<RailFrame[]> {
    return page.evaluate(
        ({ act, ms }) =>
            new Promise<RailFrame[]>((resolve) => {
                const q = (s: string) => document.querySelector<HTMLElement>(`[data-witness="${s}"]`);
                const box = (e: HTMLElement | null): Box | null => {
                    if (!e || !e.getClientRects().length) return null;
                    const r = e.getBoundingClientRect();
                    return [r.left, r.top, r.width, r.height];
                };
                const out: RailFrame[] = [];
                const t0 = performance.now();
                const tick = () => {
                    const root = q("rail")!;
                    out.push({ morphing: root.hasAttribute("data-morphing"), root: box(root)!, crest: box(q("crest"))!, foot: box(q("foot")) });
                    if (performance.now() - t0 < ms) requestAnimationFrame(tick);
                    else resolve(out);
                };
                (window as unknown as Record<string, () => void>)[act]!();
                requestAnimationFrame(tick);
            }),
        { act, ms },
    );
}

test("rail · a start-anchored rail's close holds its top edge and crest, and ends on the disc", async ({ page }, info) => {
    await openRail(page);
    await page.evaluate(() => (window as unknown as Record<string, () => void>).__expand());
    await page.waitForTimeout(900);
    const rest = await page.evaluate(() => {
        const r = document.querySelector('[data-witness="rail"]')!.getBoundingClientRect();
        return [r.left, r.top, r.width, r.height];
    });
    const frames = await railFrames(page, "__collapse", 900);
    const moving = frames.filter((f) => f.morphing);
    info.annotations.push({ type: "rail", description: JSON.stringify({ rest, frames: frames.map((f) => [f.morphing ? 1 : 0, ...f.root.map(Math.round), Math.round(f.crest[1])]) }) });
    expect(moving.length, "the close is a morph").toBeGreaterThan(6);
    for (const f of frames) {
        expect(Math.abs(f.root[1] - rest[1]!), `root top ${f.root[1]}`).toBeLessThan(1.5);
        expect(f.crest[1] - f.root[1], `crest offset ${f.crest[1]}`).toBeLessThan(20);
        expect(f.crest[1]).toBeGreaterThanOrEqual(f.root[1] - 1.5);
    }
    const bottoms = moving.map((f) => f.root[1] + f.root[3]);
    for (let i = 1; i < bottoms.length; i++) expect(bottoms[i]!).toBeLessThanOrEqual(bottoms[i - 1]! + 1);
    const last = moving.at(-1)!;
    const settled = frames.at(-1)!;
    expect(settled.morphing).toBe(false);
    expect(Math.abs(last.root[3] - settled.root[3])).toBeLessThan(2);
    expect(Math.abs(last.root[1] - settled.root[1])).toBeLessThan(1.5);
});

test("rail · a start-anchored rail's open holds the crest from its first frame, the foot inside the plate", async ({ page }, info) => {
    await openRail(page);
    const disc = await page.evaluate(() => {
        const r = document.querySelector('[data-witness="crest"]')!.getBoundingClientRect();
        return [r.left, r.top];
    });
    const frames = await railFrames(page, "__expand", 900);
    const moving = frames.filter((f) => f.morphing);
    info.annotations.push({ type: "rail", description: JSON.stringify({ disc, frames: moving.map((f) => [...f.root.map(Math.round), Math.round(f.crest[1]), f.foot ? f.foot.map(Math.round) : null]) }) });
    expect(moving.length, "the open is a morph").toBeGreaterThan(6);
    expect(Math.abs(moving[0]!.crest[1] - disc[1]!)).toBeLessThan(2);
    for (const f of moving) {
        expect(f.crest[1], "crest never above the plate").toBeGreaterThanOrEqual(f.root[1] - 1.5);
        if (f.foot) {
            expect(f.foot[0], "foot never left of the plate").toBeGreaterThanOrEqual(f.root[0] - 1.5);
            expect(f.foot[1], "foot never above the plate").toBeGreaterThanOrEqual(f.root[1] - 1.5);
        }
    }
});
