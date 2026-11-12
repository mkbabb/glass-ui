// glass-ui 11.0.1, critic round 1 — the owner's two dock cases read in PAINT (the release
// spec `release-11-0-1.spec.ts` reads computed corners). Light and dark, 1440 fine and 390
// coarse, on `release-11-0-1/harness.html`. Each cell banks captures at 3x under CRITIC_OUT
// and prints a `c1 ` JSON row.
//   a  the wide label seat's plate (hover on a fine pointer, press, the active seat): the
//      plate's ink is isolated by a diff against the same seat with its plate removed, and
//      the row 2 px under its top edge is measured against a stadium and against an ellipse
//   b  the dock's ends at rest open, collapsed, open on the narrow face: captures, and every
//      painted box of the dock (root, plate, their pseudo-elements) read for its corners
//   c  screenshots through the expand and the collapse
//   d  per animation frame of the expand and the collapse: the box's morph-axis scale (its
//      painted width over its layout width), so the corner each frame PAINTS is the
//      computed corner times that scale on the morph axis
//   e  the cascade before the dock's script has published `--dock-plate-cross-px` (a
//      server-rendered page before hydration: the property is written only by a mounted
//      hook): the inline property is removed and the box and plate corners read again
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { PNG } from "pngjs";

const OUT = process.env.CRITIC_OUT ?? "docs/release-11.0.1/critic-1/shots";
const DSF = 3;

async function open(page: Page, query: string, dark: boolean): Promise<void> {
    await page.addInitScript((dark) => {
        document.documentElement.classList.toggle("dark", dark);
    }, dark);
    await page.goto(`/tests-visual/release-11-0-1/harness.html?${query}`);
    await page.locator(".witness-dock").waitFor();
    await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), dark);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
}

async function clipOf(page: Page, sel: string, pad: number) {
    const b = (await page.locator(sel).first().boundingBox())!;
    return { x: Math.max(0, Math.floor(b.x - pad)), y: Math.max(0, Math.floor(b.y - pad)), width: Math.ceil(b.width + 2 * pad), height: Math.ceil(b.height + 2 * pad) };
}

async function snap(page: Page, clip: { x: number; y: number; width: number; height: number }, name: string): Promise<PNG> {
    mkdirSync(OUT, { recursive: true });
    const buf = await page.screenshot({ clip, scale: "device" });
    writeFileSync(join(OUT, `${name}.png`), buf);
    return PNG.sync.read(buf);
}

/** The ink that differs between two captures: per row, the first and last differing column. */
function plateOf(a: PNG, b: PNG, threshold = 2) {
    const rows: Array<[number, number] | null> = [];
    for (let y = 0; y < a.height; y++) {
        let lo = -1, hi = -1;
        for (let x = 0; x < a.width; x++) {
            const i = (y * a.width + x) * 4;
            const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
            if (d > threshold) { if (lo < 0) lo = x; hi = x; }
        }
        rows.push(lo < 0 ? null : [lo, hi]);
    }
    const ys = rows.map((r, y) => (r ? y : -1)).filter((y) => y >= 0);
    if (!ys.length) return null;
    const top = ys[0], bottom = ys[ys.length - 1];
    const H = bottom - top + 1;
    const mid = rows[Math.round((top + bottom) / 2)]!;
    const W = mid[1] - mid[0] + 1;
    const d = Math.round(H * 0.08) || 1; // a row a little under the top edge
    const at = rows[top + d]!;
    const w = at[1] - at[0] + 1;
    const r = H / 2;
    const stadium = W - 2 * (r - Math.sqrt(r * r - (r - d) * (r - d)));
    const ellipse = W * Math.sqrt(1 - ((r - d) / r) ** 2);
    return { W, H, d, w, stadium: Math.round(stadium), ellipse: Math.round(ellipse), css: { W: W / DSF, H: H / DSF } };
}

const STRIP = "[data-witness='wide'],[data-witness='wide']::before,[data-witness='wide']::after{background:none!important;box-shadow:none!important;border-color:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}";

/** The seat as painted, against the seat with its plate stripped (label and glyph stay). */
async function plateInk(page: Page, name: string) {
    const clip = await clipOf(page, "[data-witness='wide']", 10);
    const withPlate = await snap(page, clip, name);
    const tag = await page.addStyleTag({ content: STRIP });
    await page.waitForTimeout(350);
    const without = await snap(page, clip, `${name}-stripped`);
    await tag.evaluate((el) => el.remove());
    await page.waitForTimeout(350);
    return plateOf(withPlate, without);
}

function judge(name: string, m: ReturnType<typeof plateOf>): void {
    console.log(`c1 ${JSON.stringify({ cell: name, ...m })}`);
    expect(m, `${name}: a plate is painted`).not.toBeNull();
    expect(m!.W, `${name}: the plate is wider than tall`).toBeGreaterThan(m!.H + 4 * DSF);
    expect(Math.abs(m!.w - m!.stadium), `${name}: the row under the top edge is a stadium's (${JSON.stringify(m)})`).toBeLessThanOrEqual(3 * DSF);
    expect(Math.abs(m!.w - m!.ellipse), `${name}: and not an ellipse's`).toBeGreaterThan(6 * DSF);
}

/** Every painted box of the dock that spans its end: the corners each computes. */
async function boxes(page: Page) {
    return page.evaluate(() => {
        const root = document.querySelector<HTMLElement>(".witness-dock")!;
        const out: Array<Record<string, unknown>> = [];
        const read = (el: Element, pseudo: string | null, label: string) => {
            const cs = getComputedStyle(el, pseudo);
            if (pseudo && (cs.content === "none" || cs.display === "none")) return;
            const painted = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none" || cs.boxShadow !== "none" || cs.borderTopWidth !== "0px" || cs.backdropFilter !== "none" || cs.clipPath !== "none" || cs.maskImage !== "none";
            if (!painted) return;
            out.push({ label, r: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(" "), clip: cs.clipPath, mask: cs.maskImage === "none" ? "none" : "mask", overflow: cs.overflow });
        };
        const walk = (el: Element, label: string) => { read(el, null, label); read(el, "::before", `${label}::before`); read(el, "::after", `${label}::after`); };
        walk(root, "root");
        for (const child of Array.from(root.children)) {
            const name = `.${Array.from(child.classList).join(".")}`;
            walk(child, name);
            for (const g of Array.from(child.children)) walk(g, `${name} > .${Array.from(g.classList).join(".")}`);
        }
        const r = root.getBoundingClientRect();
        return { w: r.width, h: r.height, classes: root.className, out };
    });
}

test.describe("critic 1 e", () => {
    test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DSF });
    for (const state of ["open", "closed"] as const) {
        test(`e the stadium dock's corner before the script publishes its cross extent, ${state}`, async ({ page }, info) => {
            const eng = info.project.name === "webkit" ? "wk" : "ch";
            await open(page, `scene=figure&collapse=${state}`, false);
            const read = () =>
                page.evaluate(() => {
                    const root = document.querySelector<HTMLElement>(".witness-dock")!;
                    const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
                    return {
                        inline: root.style.getPropertyValue("--dock-plate-cross-px"),
                        root: getComputedStyle(root).borderTopLeftRadius,
                        plate: getComputedStyle(plate).borderTopLeftRadius,
                        h: root.offsetHeight,
                    };
                });
            const published = await read();
            await page.evaluate(() => document.querySelector<HTMLElement>(".witness-dock")!.style.removeProperty("--dock-plate-cross-px"));
            await page.waitForTimeout(300);
            const unpublished = await read();
            await snap(page, await clipOf(page, ".witness-dock", 14), `e-${eng}-${state}-unpublished`);
            console.log(`c1 ${JSON.stringify({ cell: `${eng} unpublished ${state}`, published, unpublished })}`);
            // Tightened at fix 2: with no published cross extent the corner is the one the
            // measure gives, not merely some corner.
            expect.soft(unpublished.root, "the box's corner with no published cross extent").toBe(published.root);
            expect.soft(unpublished.plate, "the plate's corner with no published cross extent").toBe(published.plate);
            expect.soft(published.root, "the published corner is half the height").toBe(`${published.h / 2}px`);
        });
    }
});

for (const dark of [false, true]) {
    for (const coarse of [false, true]) {
        const tag = `${dark ? "dark" : "light"}-${coarse ? "390c" : "1440f"}`;
        test.describe(`critic 1 ${tag}`, () => {
            test.use(
                coarse
                    ? { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 }, deviceScaleFactor: DSF }
                    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: DSF },
            );

            test(`a ${tag}: the wide label seat's plate is a capsule in paint`, async ({ page }, info) => {
                const e = info.project.name === "webkit" ? "wk" : "ch";
                expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(coarse);
                // The active "Name ›" seat, at rest.
                await open(page, "scene=figure&collapse=open", dark);
                judge(`${tag} ${e} name-active-rest`, await plateInk(page, `a-${tag}-${e}-name-active`));
                const seat = page.locator("[data-witness='wide']");
                const b = (await seat.boundingBox())!;
                if (!coarse) {
                    await seat.hover();
                    await page.waitForTimeout(350);
                    judge(`${tag} ${e} name-active-hover`, await plateInk(page, `a-${tag}-${e}-name-hover`));
                }
                // The "Focus" seat: hover (fine), then the press plate.
                await open(page, "scene=focus", dark);
                const f = page.locator("[data-witness='wide']");
                const fb = (await f.boundingBox())!;
                if (!coarse) {
                    await f.hover();
                    await page.waitForTimeout(350);
                    judge(`${tag} ${e} focus-hover`, await plateInk(page, `a-${tag}-${e}-focus-hover`));
                }
                await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2);
                await page.mouse.down();
                await page.waitForTimeout(350);
                const pressed = await plateInk(page, `a-${tag}-${e}-focus-press`);
                await page.mouse.up();
                console.log(`c1 ${JSON.stringify({ cell: `${tag} ${e} focus-press`, ...pressed })}`);
                if (pressed) judge(`${tag} ${e} focus-press`, pressed);
                void b;
            });

            for (const radius of ["", "1.875rem"]) {
                const rt = radius ? "rd" : "house";
                const rq = radius ? `&radius-dock=${radius}` : "";
                test(`b ${tag} ${rt}: the dock's ends at rest, collapsed, and open on the narrow face`, async ({ page }, info) => {
                    const e = info.project.name === "webkit" ? "wk" : "ch";
                    for (const [name, q] of [
                        ["open", `scene=figure&collapse=open${rq}`],
                        ["open-end", `scene=figure&collapse=open&end=1${rq}`],
                        ["collapsed", `scene=figure&collapse=closed${rq}`],
                        ["collapsed-end", `scene=figure&collapse=closed&end=1${rq}`],
                        ["narrow", `scene=figure&collapse=open&active=page&end=1${rq}`],
                        ["narrow-noend", `scene=figure&collapse=open&active=page${rq}`],
                    ] as const) {
                        await open(page, q, dark);
                        await snap(page, await clipOf(page, ".witness-dock", 14), `b-${tag}-${e}-${rt}-${name}`);
                        const read = await boxes(page);
                        const half = `${read.h / 2}px`;
                        const odd = read.out.filter((o) => String(o.r).split(" ").some((x) => x !== half) || o.clip !== "none");
                        console.log(`c1 ${JSON.stringify({ cell: `${tag} ${e} ${rt} ${name}`, w: read.w, h: read.h, half, classes: read.classes, painted: read.out.length, odd })}`);
                    }
                });
            }

            test(`d ${tag}: the painted corner per frame of the expand and the collapse`, async ({ page }, info) => {
                const e = info.project.name === "webkit" ? "wk" : "ch";
                await open(page, "scene=figure&collapse=closed&end=1", dark);
                const sample = (ms: number) =>
                    page.evaluate(
                        (ms) =>
                            new Promise<{ frames: number; morphing: number; morphMs: number; minScale: number; minPaintedX: number; squashed: number; squashedMs: number; first: string; last: string }>((resolve) => {
                                const root = document.querySelector<HTMLElement>(".witness-dock")!;
                                const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
                                let frames = 0, morphing = 0, squashed = 0, minScale = 1, minPaintedX = 1e9;
                                let firstMorph = -1, lastMorph = -1, firstSq = -1, lastSq = -1, first = "", last = "";
                                const t0 = performance.now();
                                const tick = () => {
                                    const t = performance.now() - t0;
                                    frames += 1;
                                    const scale = plate.getBoundingClientRect().width / plate.offsetWidth;
                                    const r = Number.parseFloat(getComputedStyle(plate).borderTopLeftRadius);
                                    const paintedX = r * scale;
                                    const half = plate.getBoundingClientRect().height / 2;
                                    if (root.hasAttribute("data-morphing")) {
                                        morphing += 1;
                                        if (firstMorph < 0) firstMorph = t;
                                        lastMorph = t;
                                    }
                                    minScale = Math.min(minScale, scale);
                                    minPaintedX = Math.min(minPaintedX, paintedX);
                                    if (Math.abs(paintedX - half) > 1) {
                                        squashed += 1;
                                        const row = `${Math.round(t)}ms ${paintedX.toFixed(1)}x${r} half=${half}`;
                                        if (firstSq < 0) { firstSq = t; first = row; }
                                        lastSq = t; last = row;
                                    }
                                    if (t < ms) requestAnimationFrame(tick);
                                    else resolve({ frames, morphing, morphMs: Math.round(lastMorph - firstMorph), minScale: Number(minScale.toFixed(3)), minPaintedX: Number(minPaintedX.toFixed(1)), squashed, squashedMs: Math.round(lastSq - firstSq), first, last });
                                };
                                requestAnimationFrame(tick);
                            }),
                        ms,
                    );
                const summary = page.locator(".witness-dock .dock-layer--summary");
                const ex = sample(1600);
                if (coarse) await summary.tap();
                else await summary.click();
                const expand = await ex;
                const co = sample(1600);
                if (coarse) await page.touchscreen.tap(5, 5);
                else await page.mouse.click(5, 5);
                const collapse = await co;
                console.log(`c1 ${JSON.stringify({ cell: `${tag} ${e} painted-corner expand`, ...expand })}`);
                console.log(`c1 ${JSON.stringify({ cell: `${tag} ${e} painted-corner collapse`, ...collapse })}`);
                expect.soft(expand.squashed, `expand: frames whose painted end is not half the height (${JSON.stringify(expand)})`).toBe(0);
                expect.soft(collapse.squashed, `collapse: frames whose painted end is not half the height (${JSON.stringify(collapse)})`).toBe(0);
            });

            test(`c ${tag}: frames through the expand and the collapse`, async ({ page }, info) => {
                const e = info.project.name === "webkit" ? "wk" : "ch";
                await open(page, "scene=figure&collapse=closed&end=1&radius-dock=1.875rem", dark);
                // The expanded footprint, read once so the clip holds every frame.
                const vp = page.viewportSize()!;
                const closed = (await page.locator(".witness-dock").boundingBox())!;
                const clip = { x: 0, y: Math.max(0, Math.floor(closed.y - 16)), width: Math.min(vp.width, 480), height: Math.ceil(closed.height + 32) };
                clip.x = Math.max(0, Math.floor(vp.width / 2 - clip.width / 2));
                const frames = async (phase: string) => {
                    const t0 = Date.now();
                    const rows: string[] = [];
                    for (let i = 0; i < 9; i++) {
                        const state = await page.evaluate(() => {
                            const r = document.querySelector<HTMLElement>(".witness-dock")!;
                            const p = r.querySelector<HTMLElement>(":scope > .dock-plate")!;
                            const cs = getComputedStyle(p);
                            const b = p.getBoundingClientRect();
                            return `${r.hasAttribute("data-morphing") ? "morph" : "rest"} ${Math.round(b.width)}x${Math.round(b.height)} ${cs.borderTopLeftRadius} ${cs.borderTopRightRadius} ${cs.borderBottomRightRadius} ${cs.borderBottomLeftRadius}`;
                        });
                        await snap(page, clip, `c-${tag}-${e}-${phase}-${i}`);
                        rows.push(`${i}@${Date.now() - t0}ms ${state}`);
                    }
                    console.log(`c1 ${JSON.stringify({ cell: `${tag} ${e} morph ${phase}`, rows })}`);
                };
                const summary = page.locator(".witness-dock .dock-layer--summary");
                if (coarse) await summary.tap();
                else await summary.click();
                await frames("expand");
                await page.waitForTimeout(600);
                if (coarse) await page.touchscreen.tap(5, 5);
                else await page.mouse.click(5, 5);
                await frames("collapse");
            });
        });
    }
}
