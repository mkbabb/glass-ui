// glass-ui 11.0.1 — the owner's two dock cases, read off the painted boxes. Each drives
// `release-11-0-1/harness.html` (the real components from `src/` under the demo's own
// cascade) and reads layout and computed style; each cell also banks a cropped capture
// under OWNER_OUT when it is set. Engines: `chromium-headless-new`, and `webkit` on
// Playwright WebKit 2287 (`release-10-1-5-fix-13.config.ts`, under `guarded --exclusive
// webkit`). RED on a v11.0.0 tree carrying this spec and harness, GREEN on 11.0.1.
//
//   o1  a wide label seat's hover and active plate is a capsule, never an ellipse: every
//       corner is one length (no `%`, no second radius) of at least half the seat's height
//   o2  the dock's end is round: at rest open, collapsed (one persistent seat beside the
//       summary), open on a narrow active face with a #persistent-end seat, with the
//       consumer's `--radius-dock` and without; the plate's four corners are one length,
//       half its cross extent, and the box's own corner (its inset rim) is the same
//   o3  ... and on every frame of the expand and of the collapse
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Locator, type Page } from "@playwright/test";

const OUT = process.env.OWNER_OUT;

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-11-0-1/harness.html?${query}`);
    await page.locator(".witness-dock").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
}

async function shoot(page: Page, el: Locator, name: string, pad = 12): Promise<void> {
    if (!OUT) return;
    const box = await el.boundingBox();
    if (!box) return;
    mkdirSync(OUT, { recursive: true });
    await page.screenshot({
        path: join(OUT, `${name}.png`),
        clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + 2 * pad, height: box.height + 2 * pad },
    });
}

type Corners = { radii: string[]; w: number; h: number };

/** The four computed corners and the layout box of the first element matching `sel`. */
async function corners(page: Page, sel: string): Promise<Corners> {
    return page.evaluate((s) => {
        const el = document.querySelector<HTMLElement>(s)!;
        const cs = getComputedStyle(el);
        return {
            radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
            w: el.offsetWidth,
            h: el.offsetHeight,
        };
    }, sel);
}

/** A stadium: one length per corner, at least half the shorter side (the engine clamps it there). */
function stadium(c: Corners): boolean {
    const half = Math.min(c.w, c.h) / 2;
    return c.radii.every((r) => /^[\d.]+px$/.test(r) && Number.parseFloat(r) >= half - 0.5);
}

/** Round: four equal lengths, each half the cross extent (the plate's height on a horizontal dock). */
function round(c: Corners): boolean {
    const half = c.h / 2;
    return c.radii.every((r) => /^[\d.]+px$/.test(r) && Math.abs(Number.parseFloat(r) - half) <= 0.5);
}

const PLATE = ".witness-dock > .dock-plate";
const ROOT = ".witness-dock";

test.describe("o1 the wide label seat", () => {
    test("o1 the hover plate of a compact 'Focus' label seat is a capsule, never an ellipse", async ({ page }, info) => {
        await open(page, "scene=focus");
        const seat = page.locator("[data-witness='wide']");
        await seat.hover();
        await page.waitForTimeout(300);
        const read = await corners(page, "[data-witness='wide']");
        await shoot(page, seat, `o1-focus-hover-${info.project.name}`);
        console.log(`o1 focus hover ${JSON.stringify(read)}`);
        expect(read.w).toBeGreaterThan(read.h + 4);
        expect(stadium(read), JSON.stringify(read)).toBe(true);
    });

    test("o1 the active 'Name ›' seat's plate, at rest and under hover, is a capsule", async ({ page }, info) => {
        await open(page, "scene=figure&collapse=open");
        const seat = page.locator("[data-witness='wide']");
        const rest = await corners(page, "[data-witness='wide']");
        await shoot(page, seat, `o1-name-rest-${info.project.name}`);
        await seat.hover();
        await page.waitForTimeout(300);
        const hover = await corners(page, "[data-witness='wide']");
        await shoot(page, seat, `o1-name-hover-${info.project.name}`);
        console.log(`o1 name rest ${JSON.stringify(rest)} hover ${JSON.stringify(hover)}`);
        expect(rest.w).toBeGreaterThan(rest.h + 4);
        expect(stadium(rest), JSON.stringify(rest)).toBe(true);
        expect(stadium(hover), JSON.stringify(hover)).toBe(true);
    });
});

for (const radius of ["", "1.875rem"]) {
    const tag = radius ? "radius-dock 1.875rem" : "house tokens";
    const rq = radius ? `&radius-dock=${radius}` : "";
    test.describe(`o2 the dock's end, ${tag}`, () => {
        test(`o2 ${tag}: open at rest, the plate and the box are round`, async ({ page }, info) => {
            await open(page, `scene=figure&collapse=open${rq}`);
            const plate = await corners(page, PLATE);
            const root = await corners(page, ROOT);
            await shoot(page, page.locator(ROOT), `o2-open-${radius ? "rd" : "house"}-${info.project.name}`);
            console.log(`o2 open ${tag} plate ${JSON.stringify(plate)} root ${JSON.stringify(root)}`);
            expect(round(plate), JSON.stringify(plate)).toBe(true);
            expect(root.radii).toEqual(plate.radii);
        });

        test(`o2 ${tag}: collapsed with a persistent seat beside the summary, the plate and the box are round`, async ({ page }, info) => {
            await open(page, `scene=figure&collapse=closed${rq}`);
            await expect(page.locator(ROOT)).toHaveClass(/collapsed/);
            const plate = await corners(page, PLATE);
            const root = await corners(page, ROOT);
            await shoot(page, page.locator(ROOT), `o2-collapsed-${radius ? "rd" : "house"}-${info.project.name}`);
            console.log(`o2 collapsed ${tag} plate ${JSON.stringify(plate)} root ${JSON.stringify(root)}`);
            expect(round(plate), JSON.stringify(plate)).toBe(true);
            expect(root.radii).toEqual(plate.radii);
        });

        test(`o2 ${tag}: open on the narrow face beside a wider one, with a #persistent-end seat, the plate is round`, async ({ page }, info) => {
            await open(page, `scene=figure&collapse=open&active=page&end=1${rq}`);
            const plate = await corners(page, PLATE);
            const root = await corners(page, ROOT);
            const run = await page.evaluate(() => {
                const r = document.querySelector<HTMLElement>(".witness-dock .dock-run.is-active")!;
                return { scroll: r.scrollWidth - r.clientWidth };
            });
            await shoot(page, page.locator(ROOT), `o2-narrow-${radius ? "rd" : "house"}-${info.project.name}`);
            console.log(`o2 narrow ${tag} plate ${JSON.stringify(plate)} root ${JSON.stringify(root)} run ${JSON.stringify(run)}`);
            expect(round(plate), JSON.stringify(plate)).toBe(true);
            expect(root.radii).toEqual(plate.radii);
        });
    });
}

test("o3 every frame of the expand and of the collapse paints a round end", async ({ page }, info) => {
    await open(page, "scene=figure&collapse=closed&end=1");
    const sample = (ms: number) =>
        page.evaluate(
            (ms) =>
                new Promise<{ frames: number; morphing: number; bad: string[] }>((resolve) => {
                    const root = document.querySelector<HTMLElement>(".witness-dock")!;
                    const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
                    const bad: string[] = [];
                    let frames = 0;
                    let morphing = 0;
                    const t0 = performance.now();
                    const tick = () => {
                        frames += 1;
                        if (root.hasAttribute("data-morphing")) morphing += 1;
                        const cs = getComputedStyle(plate);
                        const r = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
                        const half = plate.offsetHeight / 2;
                        const ok = r.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - half) <= 0.5);
                        if (!ok) bad.push(`${Math.round(performance.now() - t0)}ms ${r.join(" ")} half=${half}`);
                        if (performance.now() - t0 < ms) requestAnimationFrame(tick);
                        else resolve({ frames, morphing, bad });
                    };
                    requestAnimationFrame(tick);
                }),
            ms,
        );
    const expandRun = sample(1400);
    await page.locator(".witness-dock .dock-layer--summary").click();
    const expand = await expandRun;
    await shoot(page, page.locator(ROOT), `o3-expanded-${info.project.name}`);
    // A press outside folds the dock the summary press opened.
    const collapseRun = sample(1400);
    await page.mouse.click(5, 5);
    const collapse = await collapseRun;
    console.log(`o3 expand ${JSON.stringify({ ...expand, bad: expand.bad.slice(0, 6) })}`);
    console.log(`o3 collapse ${JSON.stringify({ ...collapse, bad: collapse.bad.slice(0, 6) })}`);
    expect(expand.morphing, "the expand morphed").toBeGreaterThan(2);
    expect(collapse.morphing, "the collapse morphed").toBeGreaterThan(2);
    expect(expand.bad).toEqual([]);
    expect(collapse.bad).toEqual([]);
});
