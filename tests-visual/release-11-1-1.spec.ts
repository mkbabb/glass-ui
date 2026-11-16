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
import { exitOf, isPhone, markFilm, press, pressOn, startFilm, stopFilm, worstFrameShare, type Film, type Frame } from "./release-11-1-1/film";

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

// ── exit ───────────────────────────────────────────────────────────────────────────
const exitCases = [
    { name: "Select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
    { name: "DropdownMenu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]' },
    { name: "Popover", trigger: '[data-testid="x-popover"]', content: '[data-testid="x-popover-content"]' },
    { name: "Tooltip", trigger: '[data-testid="x-tooltip"]', content: '[data-testid="x-tooltip-content"]', hover: true },
    { name: "Dialog", trigger: '[data-testid="x-dialog"]', content: '[data-testid="x-dialog-content"]' },
    { name: "Sheet right", trigger: '[data-testid="x-sheet-right"]', content: '[data-testid="x-sheet-right-content"]' },
    { name: "Sheet bottom", trigger: '[data-testid="x-sheet-bottom"]', content: '[data-testid="x-sheet-bottom-content"]' },
];

/** The one exit curve, `cubic-bezier(0.3, 0.2, 0.7, 0.8)`, as a function of progress. */
const CURVE = (k: number): number => {
    const at = (a: number, b: number, t: number) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t ** 3;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (at(0.3, 0.7, mid) < k) lo = mid;
        else hi = mid;
    }
    return at(0.2, 0.8, (lo + hi) / 2);
};

function curveStray(samples: [number, number][], from: number, exitMs: number, ease: (k: number) => number): number {
    const t0 = samples[0][0];
    let best = Infinity;
    for (let o = 0; o <= 40; o += 2) {
        let worst = 0;
        for (const [t, v] of samples) {
            const k = Math.min(1, Math.max(0, (t - t0 - o) / Math.max(1, exitMs - o)));
            worst = Math.max(worst, Math.abs(1 - v / from - ease(k)));
        }
        best = Math.min(best, worst);
    }
    return best;
}

const settledAt = (frames: Frame[], mark: number): number => {
    const live = frames.filter((f) => f.t >= mark && f.present);
    const last = live[live.length - 1];
    let end = mark;
    for (const f of live) {
        const moved =
            Math.abs((f.op ?? 0) - (last.op ?? 0)) > 0.01 ||
            Math.abs(f.x! - last.x!) > 0.5 ||
            Math.abs(f.y! - last.y!) > 0.5 ||
            Math.abs(f.w! - last.w!) > 0.5 ||
            f.anim;
        if (moved) end = f.t;
    }
    return end - mark;
};

for (const c of exitCases) {
    test(`exit · ${c.name} leaves on the exit curve, shorter than it entered`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(Boolean(c.hover) && isPhone(project), "a Tooltip does not open on touch");
        await openHarness(page);
        await startFilm(page, c.content);
        await markFilm(page);
        if (c.hover) await page.locator(c.trigger).hover();
        else await pressOn(page, project, c.trigger);
        const enter = await stopFilm(page, 1400);
        // The entrance is what the surface paints, or for a surface that paints none
        // yet (the Tooltip appears whole), the clock its open state declares.
        const declared = await page.evaluate((sel) => {
            const cs = getComputedStyle(document.querySelector(sel)!);
            const sec = (v: string) => Math.max(...v.split(",").map((d) => (d.trim().endsWith("ms") ? parseFloat(d) : parseFloat(d) * 1000)));
            return Math.max(sec(cs.transitionDuration), sec(cs.animationDuration));
        }, c.content);
        const entrance = Math.max(settledAt(enter.frames, enter.mark), declared);

        await startFilm(page, c.content);
        await markFilm(page);
        await page.keyboard.press("Escape");
        const film = await stopFilm(page, 1200);
        const { rest } = exitOf(film);
        const vw = page.viewportSize()!;
        const after = film.frames.filter((f) => f.t >= film.mark);
        // What the reader sees of the surface: its opacity times the share of its box on
        // screen, so a fade and a slide off the edge read on one scale.
        const seen = (f: Frame) => {
            if (!f.present || !f.w || !f.h) return 0;
            const w = Math.max(0, Math.min(f.x! + f.w, vw.width) - Math.max(f.x!, 0));
            const h = Math.max(0, Math.min(f.y! + f.h, vw.height) - Math.max(f.y!, 0));
            return (f.op ?? 0) * ((w * h) / (f.w * f.h));
        };
        const goneIdx = after.findIndex((f) => seen(f) <= 0.01);
        expect(goneIdx, "the surface leaves inside the film").toBeGreaterThan(-1);
        const leaving = [{ ...rest, t: film.mark }, ...after.slice(0, goneIdx + 1)];
        const exitMs = after[goneIdx].t - film.mark;
        const visible: [number, number][] = leaving.map((f) => [f.t, seen(f)]);
        const dx = Math.abs(leaving[leaving.length - 2].x! - rest.x!);
        const dy = Math.abs(leaving[leaving.length - 2].y! - rest.y!);
        const axis = dx >= dy ? "x" : "y";
        const travel = Math.max(dx, dy);
        const geometry: [number, number][] = leaving
            .filter((f) => f.present)
            .map((f) => [f.t, axis === "x" ? f.x! : f.y!]);
        const painted = after.slice(0, goneIdx).filter((f) => seen(f) > 0.01).length;
        // How far the exit's progress strays from the exit curve, at the best start
        // within 40 ms of the key press (the input's own latency).
        const curve = await page.evaluate(() => {
            const probe = document.createElement("div");
            probe.style.transitionTimingFunction = "var(--exit-curve)";
            document.body.appendChild(probe);
            const v = getComputedStyle(probe).transitionTimingFunction;
            probe.remove();
            return v;
        });
        // A surface that fades is read by its opacity, one that only slides by what is
        // left of it on screen.
        const fades = (rest.op ?? 0) - Math.min(...leaving.filter((f) => f.present).map((f) => f.op ?? 0)) > 0.5;
        const channel: [number, number][] = fades ? leaving.map((f) => [f.t, f.present ? (f.op ?? 0) : 0]) : visible;
        const stray = curveStray(channel, fades ? (rest.op ?? 1) : seen(rest), exitMs, CURVE);
        const read = {
            entrance: Math.round(entrance),
            exit: Math.round(exitMs),
            painted,
            seenShare: +worstFrameShare(visible, seen(rest)).toFixed(3),
            curve,
            stray: +stray.toFixed(3),
            travel: Math.round(travel),
            travelShare: travel >= 16 ? +worstFrameShare(geometry, travel).toFixed(3) : null,
            frames: leaving.map((f) => [Math.round(f.t - film.mark), +seen(f).toFixed(3), f.present ? Math.round(axis === "x" ? f.x! : f.y!) : null]),
        };
        await info.attach("exit", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify({ ...read, frames: read.frames.slice(0, 40) });
        expect(read.painted, `painted for more than two frames ${at}`).toBeGreaterThan(2);
        expect(read.seenShare, `no frame takes more than a fifth of what is seen ${at}`).toBeLessThanOrEqual(0.2);
        if (read.travelShare !== null) expect(read.travelShare, `no frame takes more than a fifth of the travel ${at}`).toBeLessThanOrEqual(0.2);
        expect(read.exit, `the exit is shorter than the entrance ${at}`).toBeLessThan(read.entrance);
        expect(read.stray, `the exit follows the exit curve ${at}`).toBeLessThanOrEqual(0.12);
    });
}

// ── routes ─────────────────────────────────────────────────────────────────────────
/** Opacity times the share of the box on screen. */
function seenIn(vw: { width: number; height: number }) {
    return (f: Frame) => {
        if (!f.present || !f.w || !f.h) return 0;
        const w = Math.max(0, Math.min(f.x! + f.w, vw.width) - Math.max(f.x!, 0));
        const h = Math.max(0, Math.min(f.y! + f.h, vw.height) - Math.max(f.y!, 0));
        return (f.op ?? 0) * ((w * h) / (f.w * f.h));
    };
}

function judgeLeave(film: Film, vw: { width: number; height: number }) {
    const seen = seenIn(vw);
    const { rest } = exitOf(film);
    const after = film.frames.filter((f) => f.t >= film.mark);
    const goneIdx = after.findIndex((f) => seen(f) <= 0.01);
    const leaving = [{ ...rest, t: film.mark }, ...after.slice(0, goneIdx < 0 ? after.length : goneIdx + 1)];
    const series: [number, number][] = leaving.map((f) => [f.t, seen(f)]);
    return {
        rest,
        after,
        goneIdx,
        painted: after.slice(0, goneIdx < 0 ? after.length : goneIdx).filter((f) => seen(f) > 0.01).length,
        reopened: goneIdx >= 0 && (after.slice(goneIdx).some((f) => seen(f) > 0.05) || after[after.length - 1].present),
        share: +worstFrameShare(series, seen(rest)).toFixed(3),
        frames: leaving.map((f) => [Math.round(f.t - film.mark), +seen(f).toFixed(3), f.present ? Math.round(f.h!) : null]),
    };
}

for (const route of ["escape", "outside"] as const) {
    test(`routes · a detented Sheet leaves whole by ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(project === "webkit-phone" && route === "outside", "Playwright WebKit's touchscreen.tap reaches no outside-press listener");
        await openHarness(page);
        await pressOn(page, project, '[data-testid="x-detent"]');
        await page.locator('[data-testid="x-detent-content"][data-state="open"]').waitFor();
        await page.waitForTimeout(1200);
        await startFilm(page, '[data-testid="x-detent-content"]');
        await markFilm(page);
        if (route === "escape") await page.keyboard.press("Escape");
        else await press(page, project, 20, 20);
        const film = await stopFilm(page, 1600);
        const read = judgeLeave(film, page.viewportSize()!);
        await info.attach("routes", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read.frames);
        expect(read.goneIdx, `the sheet leaves ${at}`).toBeGreaterThan(-1);
        expect(read.painted, `painted for more than two frames ${at}`).toBeGreaterThan(2);
        expect(read.share, `no frame takes more than a fifth of what is seen ${at}`).toBeLessThanOrEqual(0.2);
    });
}

for (const route of ["pick", "escape", "outside"] as const) {
    test(`routes · a CommandDialog keeps its list through its exit by ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(project === "webkit-phone" && route === "outside", "Playwright WebKit's touchscreen.tap reaches no outside-press listener");
        // The demo's own palette story: its list of groups is the case that cut.
        await page.goto("/containers/command");
        await pressOn(page, project, "button:has-text('Open palette')");
        await page.locator('.command-dialog__content[data-state="open"]').waitFor();
        await page.waitForTimeout(900);
        await startFilm(page, ".command-dialog__content", ".command-dialog__content [data-slot=command-list]");
        await markFilm(page);
        if (route === "pick") await pressOn(page, project, ".command-dialog__content [data-slot=command-item]:not([data-disabled])");
        else if (route === "escape") await page.keyboard.press("Escape");
        else await press(page, project, 10, 10);
        const film = await stopFilm(page, 1000);
        const read = judgeLeave(film, page.viewportSize()!);
        await info.attach("routes", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read.frames);
        expect(read.goneIdx, `the palette leaves ${at}`).toBeGreaterThan(-1);
        for (const f of read.after.slice(0, read.goneIdx)) {
            if (!f.present) continue;
            expect(f.also, `the list is mounted while the plate is seen ${at}`).toBe(true);
            expect(f.h!, `the plate keeps its height ${at}`).toBeGreaterThanOrEqual(read.rest.h! * 0.9);
        }
        expect(read.share, `no frame takes more than a fifth of what is seen ${at}`).toBeLessThanOrEqual(0.2);
    });
}

const triggerCases = [
    { name: "Select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
    { name: "DropdownMenu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]' },
    { name: "Popover", trigger: '[data-testid="x-popover"]', content: '[data-testid="x-popover-content"]' },
];

for (const c of triggerCases) {
    test(`routes · a press on an open ${c.name}'s trigger closes it once`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(
            project === "webkit-phone",
            "a touch press closes these surfaces through the outside-press listener, which Playwright WebKit's touchscreen.tap does not reach",
        );
        await openHarness(page);
        await pressOn(page, project, c.trigger);
        await page.locator(`${c.content}[data-state="open"]`).waitFor();
        await page.waitForTimeout(800);
        const box = (await page.locator(c.trigger).boundingBox())!;
        const covered = await page.evaluate(
            ({ x, y, content }) => !!document.elementFromPoint(x, y)?.closest(content),
            { x: box.x + box.width / 2, y: box.y + box.height / 2, content: c.content },
        );
        test.skip(covered, "the open surface covers its trigger");
        await startFilm(page, c.content);
        await markFilm(page);
        await press(page, project, box.x + box.width / 2, box.y + box.height / 2);
        const film = await stopFilm(page, 900);
        const read = judgeLeave(film, page.viewportSize()!);
        await info.attach("routes", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read.frames);
        expect(read.goneIdx, `the surface leaves ${at}`).toBeGreaterThan(-1);
        expect(read.reopened, `and stays closed ${at}`).toBe(false);
        expect(read.painted, `painted for more than two frames ${at}`).toBeGreaterThan(2);
        expect(read.share, `no frame takes more than a fifth of what is seen ${at}`).toBeLessThanOrEqual(0.2);
    });
}
