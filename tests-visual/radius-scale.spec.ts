// U/B7 G1 (4) — radius scales with size (PLAN §5.7, O-17: "this pill is too rounded to
// be that large"). `--radius-pill` is 1rem: a box up to 32 px tall still renders a full
// stadium (the engine clamps a radius to half the shorter side), a 44 px bar renders
// 16 px corners, and every circle is `--radius-circle` (50%). Light and dark.
//
// On the v10.1.1 tag the pill is 9999px and the circles ride it, so the 44 px bar and the
// field are stadiums and no circle computes 50%: every cell below fails there.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, theme: string): Promise<void> {
    await page.goto(`/tests-visual/b7-shape/harness.html?scene=radius&theme=${theme}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(500);
}

/** The computed `border-top-left-radius` of `sel` (or its pseudo) and its box. */
async function corner(page: Page, sel: string, pseudo?: string) {
    return page.evaluate(
        ([sel, pseudo]) => {
            const el = document.querySelector<HTMLElement>(sel!);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                radius: getComputedStyle(el, pseudo || null).borderTopLeftRadius,
                w: r.width,
                h: r.height,
            };
        },
        [sel, pseudo ?? ""] as const,
    );
}

const CIRCLES: Array<[string, string, string?]> = [
    ["avatar", '[data-witness="avatar"] .avatar__identity'],
    ["status dot", '[data-witness="status-dot"] .feedback-mark', "::before"],
    ["switch thumb", '[data-witness="switch"] .switch__thumb'],
    ["radio dot", '[data-witness="radio"] .radio-group__dot'],
    ["dark-mode toggle", ".dark-mode-toggle-button"],
    ["pager dot", '[data-witness="pager"] .goo-dot', "::before"],
    ["dock icon button", '[data-witness="dock-icon"]'],
    ["collapsed dock", ".glass-dock.collapsed"],
];

for (const theme of ["light", "dark"]) {
    test.describe(theme, () => {
        for (const [name, sel, pseudo] of CIRCLES) {
            test(`${name} is a circle`, async ({ page }) => {
                await open(page, theme);
                const c = await corner(page, sel, pseudo);
                expect(c, `${sel} not found`).not.toBeNull();
                expect(c!.radius).toBe("50%");
            });
        }

        test("a 24 px chip is a full stadium", async ({ page }) => {
            await open(page, theme);
            const c = (await corner(page, '[data-witness="chip"]'))!;
            expect(c.h).toBeLessThanOrEqual(32);
            expect(parseFloat(c.radius)).toBe(16);
            expect(parseFloat(c.radius)).toBeGreaterThanOrEqual(c.h / 2);
        });

        test("a 44 px bar on the pill rung shows 16 px corners", async ({ page }) => {
            await open(page, theme);
            const c = (await corner(page, '[data-witness="bar44"]'))!;
            expect(c.h).toBe(44);
            expect(c.radius).toBe("16px");
        });

        test("a single-line field above 32 px takes the 16 px corner", async ({ page }) => {
            await open(page, theme);
            const c = (await corner(page, '[data-witness="input"] input, input[data-witness="input"]'))!;
            expect(c.h).toBeGreaterThan(32);
            expect(c.radius).toBe("16px");
        });
    });
}

// U/B7 G1 (7) — past its rung a control is a bar. Button, ToggleGroupItem and
// SegmentedTabs carry `data-shape="bar"` and take `--radius-bar` (12 px) when the label
// wraps, the box is taller than its rung, or it is wider than 20rem; on the rung they
// stay stadiums. On the v10.1.1 tag no control carries the attribute and every bar cell
// below fails there.
async function shape(page: Page, sel: string) {
    return page.evaluate((sel) => {
        const el = document.querySelector<HTMLElement>(sel)!;
        const r = el.getBoundingClientRect();
        return {
            shape: el.getAttribute("data-shape"),
            radius: getComputedStyle(el).borderTopLeftRadius,
            h: r.height,
            w: r.width,
            rung: parseFloat(getComputedStyle(el).minBlockSize),
        };
    }, sel);
}

for (const theme of ["light", "dark"]) {
    test.describe(`${theme} bar`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`/tests-visual/b7-shape/harness.html?scene=bar&theme=${theme}`);
            await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
            await page.waitForTimeout(300);
        });

        test("a single-line Button on its rung is a stadium", async ({ page }) => {
            const c = await shape(page, '[data-witness="btn-line"]');
            expect(c.shape).toBeNull();
            expect(c.h).toBeCloseTo(c.rung, 0);
            expect(parseFloat(c.radius)).toBeGreaterThanOrEqual(c.h / 2 - 0.5);
        });

        test("a Button whose label wraps is a bar", async ({ page }) => {
            const c = await shape(page, '[data-witness="btn-wrap"]');
            expect(c.h).toBeGreaterThan(c.rung + 1);
            expect(c.shape).toBe("bar");
            expect(c.radius).toBe("12px");
        });

        test("a Button wider than 20rem is a bar", async ({ page }) => {
            const c = await shape(page, '[data-witness="btn-wide"]');
            expect(c.w).toBeGreaterThan(320);
            expect(c.shape).toBe("bar");
            expect(c.radius).toBe("12px");
        });

        test("a ToggleGroupItem on its rung is a stadium, a wrapped one a bar", async ({ page }) => {
            const line = await shape(page, '[data-witness="toggle-line"]');
            expect(line.shape).toBeNull();
            expect(parseFloat(line.radius)).toBeGreaterThanOrEqual(line.h / 2 - 0.5);
            const wrap = await shape(page, '[data-witness="toggle-wrap"]');
            expect(wrap.h).toBeGreaterThan(wrap.rung + 1);
            expect(wrap.shape).toBe("bar");
            expect(wrap.radius).toBe("12px");
        });

        test("a SegmentedTabs strip wider than 20rem is a bar; a short one a stadium", async ({ page }) => {
            const wide = await shape(page, '[data-witness="strip-wide"]');
            expect(wide.w).toBeGreaterThan(320);
            expect(wide.shape).toBe("bar");
            const wideTab = await shape(page, '[data-witness="strip-wide"] .segmented-tab');
            expect(wideTab.radius).toBe("12px");
            const short = await shape(page, '[data-witness="strip-short"]');
            expect(short.shape).toBeNull();
            const shortTab = await shape(page, '[data-witness="strip-short"] .segmented-tab');
            // The tab reads `--radius-tab` (1rem); a caption tab is about 33 px tall, so
            // its corner sits within 1 px of a full stadium.
            expect(shortTab.radius).toBe("16px");
            expect(parseFloat(shortTab.radius)).toBeGreaterThanOrEqual(shortTab.h / 2 - 1);
        });
    });
}
