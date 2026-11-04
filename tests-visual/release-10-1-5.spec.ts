// glass-ui 10.1.5 — the engine witnesses for value.js's served-app review of 10.1.4
// (INBOUND O-129 rows 1, 2, 5, 6 and 7). Each drives `release-10-1-5/harness.html?scene=…`
// (the real components from `src/` under the demo's own cascade) and reads layout and
// computed style, never pixels. Engines: the `chromium-headless-new` project, and the
// `webkit` project on Playwright WebKit 2287 (`webkit-2287.config.ts`, under `guarded
// --exclusive webkit`). The coarse cells emulate a touch phone (`hasTouch`, `isMobile`)
// in both engines and assert `(pointer: coarse)` matches before reading anything. RED on
// a v10.1.4 tree carrying this spec and harness, GREEN on 10.1.5.
//
//   g1  rest dock: one uniform corner = half the block extent; run scrollWidth = clientWidth,
//       pointer off and resting on the trailing seat (390, 844 coarse; desktop)
//   g2  collapsed plate: a circle; expanded (collapsible), each layer and input mode hold g1
//   g3  Slider thumb visible and one size at min, mid and max, inside the fill
//   g4  390 coarse: field type ≤ 16px, field ÷ pane subtitle ≤ 1.25
//   g5  DropdownMenuItem icon-to-label gap = `--icon-label-gap` = the dock trigger's gap
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/harness.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await settle(page);
}

/** Let the mount, its first ResizeObserver deliveries and any spring settle. */
async function settle(page: Page, ms = 700): Promise<void> {
    await page.evaluate(
        () =>
            new Promise<void>((r) =>
                requestAnimationFrame(() => requestAnimationFrame(() => r())),
            ),
    );
    await page.waitForTimeout(ms);
}

interface PlateRead {
    cls: string;
    w: number;
    h: number;
    radii: string[];
    runs: { sw: number; cw: number; sh: number; ch: number; active: boolean }[];
}

function readPlate(page: Page): Promise<PlateRead> {
    return page.evaluate(() => {
        const dock = document.querySelector(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        return {
            cls: dock.className,
            // Layout border box: the morph's `scale` never reaches it.
            w: plate.getBoundingClientRect().width,
            h: plate.getBoundingClientRect().height,
            radii: [
                cs.borderTopLeftRadius,
                cs.borderTopRightRadius,
                cs.borderBottomRightRadius,
                cs.borderBottomLeftRadius,
            ],
            runs: [...dock.querySelectorAll<HTMLElement>(".dock-run")].map((run) => ({
                sw: run.scrollWidth,
                cw: run.clientWidth,
                sh: run.scrollHeight,
                ch: run.clientHeight,
                active: run.classList.contains("is-active"),
            })),
        };
    });
}

/**
 * Every corner is ONE length (a single `<length>`, never a percentage or an elliptical
 * pair) equal to half the plate's block extent: a circle of the plate's own height.
 */
function expectRestCorner(read: PlateRead, cell: string): void {
    const half = read.h / 2;
    for (const r of read.radii) {
        expect(r, `${cell}: corner ${r} is one length (${JSON.stringify(read)})`).toMatch(
            /^-?[\d.]+px$/,
        );
        expect(
            Math.abs(Number.parseFloat(r) - half),
            `${cell}: corner ${r} = half the block extent ${half} (${JSON.stringify(read)})`,
        ).toBeLessThanOrEqual(0.5);
    }
}

/** The run that paints hides nothing: nothing to scroll on either axis. */
function expectNoReach(read: PlateRead, cell: string): void {
    const run = read.runs.find((r) => r.active)!;
    expect(run, `${cell}: an active run`).toBeTruthy();
    expect(run.sw, `${cell}: run scrollWidth = clientWidth (${JSON.stringify(run)})`).toBe(
        run.cw,
    );
    expect(run.sh, `${cell}: run scrollHeight = clientHeight (${JSON.stringify(run)})`).toBe(
        run.ch,
    );
}

async function pointerOff(page: Page): Promise<void> {
    await page.mouse.move(2, 2);
}

async function expectCoarse(page: Page): Promise<void> {
    expect(
        await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
        "the engine emulates a coarse pointer",
    ).toBe(true);
}

/* ── g1 · the rest corner and the 2 px reach ─────────────────────────────────── */

function g1(width: number): void {
    test(`g1 rest dock at ${width}: one corner = half its height, nothing to scroll, pointer off and on the trailing seat`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 844 });
        await open(page, "scene=dock");
        if (test.info().project.use.isMobile) await expectCoarse(page);
        await pointerOff(page);
        await settle(page, 200);
        const rest = await readPlate(page);

        await page.locator('[data-witness="Seat 3"]').hover();
        await settle(page, 600);
        const hovered = await readPlate(page);
        // Reach first: the 2 px of hover ink is the trigger, the corner its symptom.
        expectNoReach(rest, `${width} rest`);
        expectNoReach(hovered, `${width} hover on the trailing seat`);
        expectRestCorner(rest, `${width} rest`);
        expect(
            await page
                .locator('[data-witness="Seat 3"]')
                .evaluate((el) => getComputedStyle(el).scale),
            "the trailing seat is hover-scaled",
        ).not.toBe("1");
        expectRestCorner(hovered, `${width} hover on the trailing seat`);
    });
}

test.describe("coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    g1(390);
    g1(844);

    /* ── g4 · the coarse field type ──────────────────────────────────────────── */
    test("g4 at 390 coarse the field type is at most 16px and at most 1.25x the pane subtitle", async ({
        page,
    }) => {
        await open(page, "scene=type");
        await expectCoarse(page);
        const read = await page.evaluate(() => {
            const px = (sel: string) =>
                Number.parseFloat(getComputedStyle(document.querySelector(sel)!).fontSize);
            return {
                subtitle: px('[data-witness="subtitle"]'),
                bar: px('[data-witness="bar"] input'),
                pill: px('input[data-witness="pill"]'),
                // The picker family's row and trigger rung (Select, DropdownMenu).
                picker: (() => {
                    const el = document.createElement("span");
                    el.style.fontSize = "var(--dropdown-text)";
                    document.body.append(el);
                    const v = Number.parseFloat(getComputedStyle(el).fontSize);
                    el.remove();
                    return v;
                })(),
                barH: document.querySelector('[data-witness="bar"]')!.getBoundingClientRect()
                    .height,
            };
        });
        // The `.input-bar` seat and the picker rung keep the 16px no-zoom floor.
        expect(read.bar, `bar keeps the no-zoom floor (${JSON.stringify(read)})`).toBeGreaterThanOrEqual(16);
        expect(read.picker, `picker keeps the no-zoom floor (${JSON.stringify(read)})`).toBeGreaterThanOrEqual(16);
        for (const field of ["bar", "pill", "picker"] as const) {
            expect(read[field], `${field} type (${JSON.stringify(read)})`).toBeLessThanOrEqual(16);
            expect(
                read[field] / read.subtitle,
                `${field} ÷ subtitle (${JSON.stringify(read)})`,
            ).toBeLessThanOrEqual(1.25);
        }
        // The touch BOX keeps its comfort height: the floor moves type, not targets.
        expect(read.barH, "the bar keeps its coarse height").toBeGreaterThanOrEqual(44);
    });
});

g1(1280);

test("g1 an overflowing run at scroll 0: the leading cap rests at half the block extent, a length; the trailing cap is cut", async ({
    page,
}) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, "scene=dock&seats=12");
    await pointerOff(page);
    await settle(page, 200);
    const read = await readPlate(page);
    const run = read.runs.find((r) => r.active)!;
    expect(run.sw, `the run overflows (${JSON.stringify(read)})`).toBeGreaterThan(run.cw);
    const [tl, tr, br, bl] = read.radii;
    for (const r of [tl, bl]) {
        expect(r, `leading corner ${r} is one length (${JSON.stringify(read)})`).toMatch(/^[\d.]+px$/);
        expect(Math.abs(Number.parseFloat(r) - read.h / 2), `leading ${r} = h/2`).toBeLessThanOrEqual(0.5);
    }
    for (const r of [tr, br]) {
        expect(Number.parseFloat(r), `trailing corner ${r} is cut below h/2`).toBeLessThan(read.h / 2 - 4);
    }
});

/* ── g2 · the collapsed seal, and every other posture ────────────────────────── */

test("g2 collapsed: the plate is a circle, half its extent on both axes", async ({ page }) => {
    await open(page, "scene=dock&collapse=closed");
    await pointerOff(page);
    await settle(page, 400);
    const read = await readPlate(page);
    expect(read.cls, "collapsed").toContain("collapsed");
    expect(Math.abs(read.w - read.h), `a square box (${JSON.stringify(read)})`).toBeLessThanOrEqual(
        0.5,
    );
    expectRestCorner(read, "collapsed");
    for (const r of read.radii) {
        expect(
            Math.abs(Number.parseFloat(r) - read.w / 2),
            `collapsed: corner ${r} = half the inline extent ${read.w / 2}`,
        ).toBeLessThanOrEqual(0.5);
    }
});

test("g2 expanded (collapsible), each layer and input mode hold g1", async ({ page }) => {
    await open(page, "scene=dock&collapse=open");
    await pointerOff(page);
    const expanded = await readPlate(page);
    expect(expanded.cls, "expanded").toContain("expanded");
    expectRestCorner(expanded, "expanded");
    expectNoReach(expanded, "expanded");

    for (const layer of ["actions", "input"]) {
        await open(page, `scene=layers&layer=${layer}`);
        await pointerOff(page);
        await settle(page, 200);
        const read = await readPlate(page);
        expectRestCorner(read, `layer ${layer}`);
        expectNoReach(read, `layer ${layer}`);
    }
    // Input mode with the field focused and the caret in it.
    await page.locator('input[aria-label="Colour"]').focus();
    await settle(page, 400);
    const input = await readPlate(page);
    expectRestCorner(input, "input mode, field focused");
    expectNoReach(input, "input mode, field focused");
});

/* ── g3 · the Slider thumb at the extremes ───────────────────────────────────── */

test("g3 the Slider thumb is visible and one size at min, mid and max, inside the fill", async ({
    page,
}) => {
    await open(page, "scene=slider");
    const rows = await page.evaluate(() =>
        ["min", "mid", "max", "inv-min", "inv-max"].map((id) => {
            const row = document.querySelector(`[data-witness="${id}"]`)!;
            const box = (sel: string) => {
                const r = row.querySelector(sel)!.getBoundingClientRect();
                return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height };
            };
            const thumb = row.querySelector(".slider-thumb")!;
            const cs = getComputedStyle(thumb);
            return {
                id,
                thumb: box(".slider-thumb"),
                range: box(".slider-range"),
                track: box(".slider-track"),
                opacity: Number(cs.opacity),
                visibility: cs.visibility,
                paint: cs.backgroundColor,
            };
        }),
    );
    const [first] = rows;
    for (const row of rows) {
        const cell = `${row.id} (${JSON.stringify(row)})`;
        expect(row.thumb.w, `${cell}: thumb has a box`).toBeGreaterThan(4);
        expect(row.opacity, `${cell}: thumb opaque`).toBe(1);
        expect(row.visibility, `${cell}: thumb visible`).toBe("visible");
        expect(row.paint, `${cell}: thumb painted`).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
        expect(Math.abs(row.thumb.w - first.thumb.w), `${cell}: same width`).toBeLessThanOrEqual(0.5);
        expect(Math.abs(row.thumb.h - first.thumb.h), `${cell}: same height`).toBeLessThanOrEqual(0.5);
        // Inscribed: inside the track on both axes, and inside the fill.
        expect(row.thumb.l, `${cell}: inside the track`).toBeGreaterThanOrEqual(row.track.l - 0.5);
        expect(row.thumb.r, `${cell}: inside the track`).toBeLessThanOrEqual(row.track.r + 0.5);
        expect(row.thumb.h, `${cell}: thumb ≤ track`).toBeLessThanOrEqual(row.track.h + 0.5);
        expect(row.range.w, `${cell}: the fill is at least one thumb`).toBeGreaterThanOrEqual(
            row.thumb.w - 0.5,
        );
        expect(row.thumb.l, `${cell}: inside the fill`).toBeGreaterThanOrEqual(row.range.l - 0.5);
        expect(row.thumb.r, `${cell}: inside the fill`).toBeLessThanOrEqual(row.range.r + 0.5);
    }
});

/* ── g5 · the menu item's icon slot ──────────────────────────────────────────── */

test("g5 the DropdownMenuItem icon-to-label gap is the icon-slot token, the dock trigger's own", async ({
    page,
}) => {
    await open(page, "scene=menu");
    const menu = await page.evaluate(() => {
        const probe = document.createElement("div");
        probe.style.cssText = "position:absolute;inline-size:var(--icon-label-gap, 0px)";
        document.body.append(probe);
        const token = probe.getBoundingClientRect().width;
        probe.remove();
        const icon = document.querySelector('[data-witness="icon"]')!.getBoundingClientRect();
        const label = document.querySelector('[data-witness="label"]')!.getBoundingClientRect();
        return { token, gap: label.left - icon.right };
    });
    expect(menu.token, `the token resolves (${JSON.stringify(menu)})`).toBeGreaterThan(0);
    expect(Math.abs(menu.gap - menu.token), `menu gap = token (${JSON.stringify(menu)})`).toBeLessThanOrEqual(0.5);

    await open(page, "scene=dock");
    const trigger = await page.evaluate(() => {
        const t = document.querySelector('.glass-dock [aria-label="Menu"]')!;
        const [icon, label] = [t.querySelector("svg")!, t.querySelector("span")!].map((e) =>
            e.getBoundingClientRect(),
        );
        return label.left - icon.right;
    });
    expect(Math.abs(trigger - menu.gap), `dock trigger gap ${trigger} = menu gap`).toBeLessThanOrEqual(0.5);
});
