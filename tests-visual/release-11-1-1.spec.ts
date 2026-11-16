// glass-ui 11.1.1 witnesses: how surfaces leave. Four projects in
// `release-11-1-1.config.ts`: Chromium and Playwright WebKit 2287, each at 390 × 844 with
// touch and at 1440 × 900 with the mouse (the WebKit pair under `guarded --exclusive
// webkit`). Every cell films the surface frame by frame from just before the closing
// input until it is gone.
//
//   form   a Select seated in a GlassDock, closed by a pick, a press outside and Escape,
//          leaves in the form it opened in: on the phone the sheet keeps its full width,
//          its side, its material and its place on every frame of the exit, and moves
//          only downward, no further in one frame than its own height; a DropdownMenu
//          seated in the dock keeps its material on every frame of its exit
//   glass  on the phone a Select's sheet and a dock's DropdownMenu are glass (a backdrop
//          blur, a fill that lets the ground through, no blur nested inside), and the
//          highlighted row and a plain row read at 4.5:1 against every painted pixel
//          behind their text over a busy ground, light and dark; under reduced
//          transparency the plate is solid with no backdrop (Chromium, through CDP).
//          Playwright WebKit paints no backdrop blur, so there the material is read from
//          computed style and the contrast is recorded, not judged
import { expect, test, type Page } from "@playwright/test";
import { exitOf, isPhone, markFilm, press, pressOn, startFilm, stopFilm, type Film } from "./release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";

async function openHarness(page: Page, query = ""): Promise<void> {
    await page.goto(`${HARNESS}${query}`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
}

type Route = "pick" | "outside" | "escape";

async function closeBy(page: Page, project: string, route: Route, pickSelector: string): Promise<void> {
    if (route === "pick") await pressOn(page, project, pickSelector);
    else if (route === "outside") await press(page, project, 195, 300);
    else await page.keyboard.press("Escape");
}

async function filmClose(
    page: Page,
    project: string,
    trigger: string,
    content: string,
    route: Route,
    pick: string,
): Promise<Film> {
    await pressOn(page, project, trigger);
    await page.locator(`${content}[data-state="open"]`).waitFor();
    await page.waitForTimeout(700);
    await startFilm(page, content);
    await markFilm(page);
    await closeBy(page, project, route, pick);
    return stopFilm(page, 900);
}

const routes: Route[] = ["pick", "outside", "escape"];

for (const route of routes) {
    test(`form · a dock Select leaves in the form it opened in · ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(
            project === "webkit-phone" && route === "outside",
            "Playwright WebKit's touchscreen.tap reaches no outside-press listener; the route is read at 1440",
        );
        await openHarness(page);
        const film = await filmClose(
            page,
            project,
            '[data-testid="x-select"]',
            '[data-testid="x-select-content"]',
            route,
            '[data-testid="x-opt-Gradient"]',
        );
        const { rest, exit, gone } = exitOf(film);
        expect(rest, "the surface was open before the close").toBeTruthy();
        expect(gone, "the surface unmounts after its exit").toBe(true);
        if (isPhone(project)) expect(rest.form, "the phone Select opens as a sheet").toBe("sheet");
        const report = exit.map((f) => ({ t: Math.round(f.t - film.mark), x: f.x, y: f.y, w: f.w, op: f.op, form: f.form, bf: f.bf }));
        await info.attach("film", { body: JSON.stringify(report), contentType: "application/json" });
        let prevY = rest.y!;
        for (const f of exit) {
            expect(f.form, `form on every exit frame ${JSON.stringify(report)}`).toBe(rest.form);
            expect(f.surface, `material attribute on every exit frame`).toBe(rest.surface);
            expect(f.bf, `backdrop on every exit frame`).toBe(rest.bf);
            // The anchored form follows its trigger, whose label a pick rewrites; the sheet
            // holds the screen's edge.
            expect(Math.abs(f.x! - rest.x!), `x holds ${JSON.stringify(report)}`).toBeLessThanOrEqual(isPhone(project) ? 1 : 12);
            expect(Math.abs(f.w! - rest.w!), `width holds ${JSON.stringify(report)}`).toBeLessThanOrEqual(1);
            if (isPhone(project)) {
                expect(f.y!, `the sheet never rises ${JSON.stringify(report)}`).toBeGreaterThanOrEqual(rest.y! - 1);
                expect(f.y! - prevY, `one frame moves the sheet no further than its height ${JSON.stringify(report)}`).toBeLessThanOrEqual(rest.h!);
            } else {
                expect(Math.abs(f.y! - rest.y!), `the anchored plate stays at its trigger ${JSON.stringify(report)}`).toBeLessThanOrEqual(12);
            }
            prevY = f.y!;
        }
    });

    test(`form · a dock DropdownMenu keeps its material through the exit · ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(
            project === "webkit-phone" && route === "outside",
            "Playwright WebKit's touchscreen.tap reaches no outside-press listener; the route is read at 1440",
        );
        await openHarness(page);
        const film = await filmClose(
            page,
            project,
            '[data-testid="x-menu"]',
            '[data-testid="x-menu-content"]',
            route,
            '[data-testid="x-item-Share"]',
        );
        const { rest, exit, gone } = exitOf(film);
        expect(rest).toBeTruthy();
        expect(gone).toBe(true);
        await info.attach("film", {
            body: JSON.stringify(exit.map((f) => ({ t: Math.round(f.t - film.mark), op: f.op, surface: f.surface, bf: f.bf }))),
            contentType: "application/json",
        });
        for (const f of exit) {
            const at = `+${Math.round(f.t - film.mark)} ms`;
            expect(f.surface, `material attribute ${at}`).toBe(rest.surface);
            expect(f.bf, `backdrop ${at}`).toBe(rest.bf);
            expect(f.bg, `fill ${at}`).toBe(rest.bg);
        }
    });
}

// ── glass ──────────────────────────────────────────────────────────────────────────
async function cdpReducedTransparency(page: Page): Promise<void> {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
    });
}

type Plate = { bf: string; alpha: number; nested: string[] };

async function readPlate(page: Page, content: string): Promise<Plate> {
    return page.evaluate((content) => {
        const el = document.querySelector(content)!;
        const rgba = (c: string) => {
            const cv = document.createElement("canvas");
            cv.width = cv.height = 1;
            const g = cv.getContext("2d")!;
            g.clearRect(0, 0, 1, 1);
            g.fillStyle = c;
            g.fillRect(0, 0, 1, 1);
            return g.getImageData(0, 0, 1, 1).data;
        };
        const cs = getComputedStyle(el);
        const bf = cs.backdropFilter || (cs as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter;
        const nested: string[] = [];
        for (const n of el.querySelectorAll("*")) {
            for (const pseudo of [null, "::before", "::after"]) {
                const s = getComputedStyle(n, pseudo);
                const b = s.backdropFilter || (s as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter;
                if (b && b !== "none") nested.push(`${n.tagName.toLowerCase()}${pseudo ?? ""} ${b}`);
            }
        }
        return { bf, alpha: rgba(cs.backgroundColor)[3] / 255, nested };
    }, content);
}

/** The least contrast between a row's text colour and any painted pixel behind its
 *  text, read with the text hidden. */
async function rowContrast(page: Page, row: string): Promise<{ ratio: number; ink: number[] }> {
    const { PNG } = await import("pngjs");
    const ink = await page.evaluate((row) => {
        const el = document.querySelector(row)!;
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const g = cv.getContext("2d")!;
        g.fillStyle = getComputedStyle(el).color;
        g.fillRect(0, 0, 1, 1);
        return Array.from(g.getImageData(0, 0, 1, 1).data);
    }, row);
    await page.addStyleTag({ content: `${row}, ${row} * { color: transparent !important; } ${row} svg { visibility: hidden !important; }` });
    await page.waitForTimeout(100);
    const box = (await page.locator(row).boundingBox())!;
    const shot = PNG.sync.read(
        await page.screenshot({ clip: { x: box.x + 4, y: box.y + 4, width: box.width - 8, height: box.height - 8 } }),
    );
    const lum = (r: number, g: number, b: number) => {
        const f = (v: number) => {
            const c = v / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const li = lum(ink[0], ink[1], ink[2]);
    let ratio = Infinity;
    for (let i = 0; i < shot.data.length; i += 4) {
        const lp = lum(shot.data[i], shot.data[i + 1], shot.data[i + 2]);
        const r = (Math.max(li, lp) + 0.05) / (Math.min(li, lp) + 0.05);
        if (r < ratio) ratio = r;
    }
    return { ratio, ink };
}

const glassCases = [
    { name: "Select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]', row: "x-opt" },
    { name: "dock DropdownMenu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]', row: "x-item" },
];

for (const c of glassCases) {
    for (const scheme of ["light", "dark"]) {
        test(`glass · a phone ${c.name} is glass with its rows at 4.5:1 over a busy ground · ${scheme}`, async ({ page }, info) => {
            const project = info.project.name;
            test.skip(!isPhone(project), "the firm plate is the phone form's");
            await openHarness(page, `?scheme=${scheme}`);
            await pressOn(page, project, c.trigger);
            await page.locator(`${c.content}[data-state="open"]`).waitFor();
            await page.waitForTimeout(700);
            await page.keyboard.press("ArrowDown");
            await page.waitForTimeout(250);
            if (!(await page.locator(`${c.content} [data-highlighted]`).count())) {
                await page.locator(`${c.content} [data-testid^="${c.row}-"]`).nth(1).focus();
                await page.waitForTimeout(250);
            }
            const plate = await readPlate(page, c.content);
            const rows = page.locator(`${c.content} [data-testid^="${c.row}-"]`);
            const ids = await rows.evaluateAll((els) =>
                els.map((e) => ({ id: e.getAttribute("data-testid")!, hi: e.hasAttribute("data-highlighted") })),
            );
            const highlighted = ids.find((r) => r.hi);
            const plain = ids.find((r) => !r.hi)!;
            const reads = [];
            for (const r of [highlighted, plain].filter(Boolean)) {
                reads.push({ ...r, ...(await rowContrast(page, `[data-testid="${r!.id}"]`)) });
            }
            await info.attach("glass", { body: JSON.stringify({ plate, reads }), contentType: "application/json" });
            expect(plate.bf, "the plate blurs its backdrop").toMatch(/blur\((?!0px)/);
            expect(plate.alpha, "the plate lets its backdrop through").toBeLessThan(1);
            expect(plate.nested, "no blur inside the plate's blur").toEqual([]);
            expect(highlighted, "a highlighted row to read").toBeTruthy();
            // Playwright's WebKit build computes the backdrop blur but paints the ground
            // behind it unblurred, so its pixels are not the plate a reader sees; the
            // contrast is read from Chromium's paint and recorded here.
            if (project.startsWith("webkit")) return;
            for (const r of reads) expect(r.ratio, `${r.id} text contrast`).toBeGreaterThanOrEqual(4.5);
        });
    }

    test(`glass · a phone ${c.name} is solid under reduced transparency`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(project !== "chromium-phone", "reduced transparency is emulated through Chromium's CDP");
        await cdpReducedTransparency(page);
        await openHarness(page);
        await pressOn(page, project, c.trigger);
        await page.locator(`${c.content}[data-state="open"]`).waitFor();
        await page.waitForTimeout(700);
        const plate = await readPlate(page, c.content);
        expect(plate.bf).toBe("none");
        expect(plate.alpha).toBe(1);
    });
}
