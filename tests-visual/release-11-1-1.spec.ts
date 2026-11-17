// glass-ui 11.1.1 witnesses: how surfaces leave. Four projects in
// `release-11-1-1.config.ts`: Chromium and Playwright WebKit 2287, each at 390 × 844 with
// touch and at 1440 × 900 with the mouse (the WebKit pair under `guarded --exclusive
// webkit`). Every cell films the surface frame by frame from just before the closing
// input until it is gone.
//
//   form   a Select seated in a GlassDock, closed by a pick of another item, a press
//          outside, Escape, a press on its trigger and a press on the item already
//          chosen, leaves in the form it opened in: on the phone the sheet keeps its full
//          width, its side, its material (attribute, backdrop and fill) and its place on
//          every frame of the exit, and moves only downward, no further in one frame than
//          its own height; a DropdownMenu seated in the dock, closed by the same paths but
//          the chosen item, keeps its material on every frame of its exit
//   glass  on the phone a Select's sheet and a dock's DropdownMenu are glass (a backdrop
//          blur, a fill that lets the ground through, no blur nested inside), and the
//          highlighted row and a plain row read at 4.5:1 against every painted pixel
//          behind their text over a busy ground, light and dark; under reduced
//          transparency the plate is solid with no backdrop (Chromium, through CDP).
//          Playwright WebKit paints no backdrop blur, so there the material is read from
//          computed style and the contrast is recorded, not judged
import { expect, test, type Page } from "@playwright/test";
import { exitOf, gotoReady, isPhone, markFilm, markTurn, press, pressOn, startFilm, stopFilm, worstFrameShare, type Film, type Frame } from "./release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";

async function openHarness(page: Page, query = ""): Promise<void> {
    await gotoReady(page, `${HARNESS}${query}`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
}

// A pick is a tap on another item; "current" a tap on the item already chosen.
type Route = "pick" | "outside" | "escape" | "trigger" | "current";

type Popup = { trigger: string; content: string; pick: string; current?: string };

async function closeBy(page: Page, project: string, route: Route, popup: Popup, trigger: { x: number; y: number }): Promise<void> {
    if (route === "pick") await pressOn(page, project, popup.pick);
    else if (route === "current") await pressOn(page, project, popup.current!);
    else if (route === "trigger") await press(page, project, trigger.x, trigger.y);
    else if (route === "outside") await press(page, project, 195, 300);
    else await page.keyboard.press("Escape");
}

async function filmClose(page: Page, project: string, popup: Popup, route: Route): Promise<Film> {
    // The trigger's centre, read at rest before it opens: the second tap lands there.
    const box = (await page.locator(popup.trigger).boundingBox())!;
    await pressOn(page, project, popup.trigger);
    await page.locator(`${popup.content}[data-state="open"]`).waitFor();
    await page.waitForTimeout(700);
    await startFilm(page, popup.content);
    await markFilm(page);
    await closeBy(page, project, route, popup, { x: box.x + box.width / 2, y: box.y + box.height / 2 });
    return stopFilm(page, 900);
}

const routes: Route[] = ["pick", "outside", "escape", "trigger", "current"];

const dockSelect: Popup = {
    trigger: '[data-testid="x-select"]',
    content: '[data-testid="x-select-content"]',
    pick: '[data-testid="x-opt-Gradient"]',
    current: '[data-testid="x-opt-Picker"]',
};
const dockMenu: Popup = { trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]', pick: '[data-testid="x-item-Share"]' };

for (const route of routes) {
    test(`form · a dock Select leaves in the form it opened in · ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(
            project === "webkit-phone" && (route === "outside" || route === "trigger"),
            "Playwright WebKit's touchscreen.tap reaches no outside-press listener, and a Select's trigger is outside its content; the route is read at 1440",
        );
        await openHarness(page);
        const film = await filmClose(page, project, dockSelect, route);
        const { rest, exit, gone } = exitOf(film);
        expect(rest, "the surface was open before the close").toBeTruthy();
        expect(gone, "the surface unmounts after its exit").toBe(true);
        if (isPhone(project)) expect(rest.form, "the phone Select opens as a sheet").toBe("sheet");
        const report = exit.map((f) => ({ t: Math.round(f.t - film.mark), x: f.x, y: f.y, w: f.w, op: f.op, form: f.form, bf: f.bf, bg: f.bg }));
        await info.attach("film", { body: JSON.stringify(report), contentType: "application/json" });
        let prevY = rest.y!;
        for (const f of exit) {
            expect(f.form, `form on every exit frame ${JSON.stringify(report)}`).toBe(rest.form);
            expect(f.surface, `material attribute on every exit frame`).toBe(rest.surface);
            expect(f.bf, `backdrop on every exit frame ${JSON.stringify(report)}`).toBe(rest.bf);
            expect(f.bg, `fill on every exit frame ${JSON.stringify(report)}`).toBe(rest.bg);
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
        test.skip(route === "current", "a menu has no chosen item");
        test.skip(
            project === "webkit-phone" && route === "outside",
            "Playwright WebKit's touchscreen.tap reaches no outside-press listener; the route is read at 1440",
        );
        await openHarness(page);
        const film = await filmClose(page, project, dockMenu, route);
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
        // A Dialog or a Sheet leaves on one script tween whose progress is the curve
        // itself, so it is held close to it (the old ease-out sheet strays 0.09 to
        // 0.11); a floating surface's fade rides with a hold, a clip or a slide.
        const scripted = c.name === "Dialog" || c.name.startsWith("Sheet");
        expect(read.stray, `the exit follows the exit curve ${at}`).toBeLessThanOrEqual(scripted ? 0.06 : 0.12);
    });
}

// The overlay register moves on opacity and a few pixels of travel: no scale, no squish
// and no blur on the way in or out, read from the computed style on every frame of a
// Popover's entrance and exit. A Tooltip keeps a slight scale on the way in, so only its
// exit is read.
type Sampled = { t: number; scale: string; filter: string };

/** Samples the computed scale and filter of `sel` every frame while it is mounted, for
 *  up to `ms`, starting with `act` run in the page. */
async function sampleStyle(page: Page, sel: string, ms: number, act: "escape" | "none"): Promise<Sampled[]> {
    return page.evaluate(
        ({ sel, ms, act }) =>
            new Promise<Sampled[]>((done) => {
                const out: Sampled[] = [];
                const t0 = performance.now();
                const tick = (t: number) => {
                    const el = document.querySelector(sel);
                    if (el) {
                        const cs = getComputedStyle(el);
                        out.push({ t: Math.round(t - t0), scale: cs.scale, filter: cs.filter });
                    }
                    if ((el || out.length === 0) && t - t0 < ms) requestAnimationFrame(tick);
                    else done(out);
                };
                if (act === "escape") document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
                requestAnimationFrame(tick);
            }),
        { sel, ms, act },
    );
}

function expectPlain(frames: Sampled[], leg: string): void {
    expect(frames.length, `the ${leg} is filmed`).toBeGreaterThan(2);
    for (const f of frames) {
        const at = `${leg} +${f.t} ms ${JSON.stringify(frames.slice(0, 12))}`;
        expect(f.scale === "none" || f.scale === "1" || f.scale === "1 1", `no scale ${at}`).toBe(true);
        expect(f.filter === "none" || f.filter === "blur(0px)", `no blur ${at}`).toBe(true);
    }
}

for (const c of [
    { name: "Popover", trigger: '[data-testid="x-popover"]', content: '[data-testid="x-popover-content"]', entrance: true },
    { name: "Tooltip", trigger: '[data-testid="x-tooltip"]', content: '[data-testid="x-tooltip-content"]', hover: true },
]) {
    test(`exit · a ${c.name} ${c.entrance ? "enters and leaves" : "leaves"} on opacity and its slide alone`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(Boolean(c.hover) && isPhone(project), "a Tooltip does not open on touch");
        await openHarness(page);
        const sampling = c.entrance ? sampleStyle(page, c.content, 500, "none") : null;
        if (c.hover) await page.locator(c.trigger).hover();
        else await pressOn(page, project, c.trigger);
        const entrance = sampling ? await sampling : null;
        await page.locator(`${c.content}[data-state$="open"]`).waitFor();
        await page.waitForTimeout(900);
        const exit = await sampleStyle(page, c.content, 1200, "escape");
        await info.attach("style", { body: JSON.stringify({ entrance, exit }), contentType: "application/json" });
        if (entrance) expectPlain(entrance, "entrance");
        expectPlain(exit, "exit");
    });
}

// ── routes ─────────────────────────────────────────────────────────────────────────
/** The area of a frame's box inside the viewport. */
function areaOnScreen(f: Frame, vw: { width: number; height: number }): number {
    if (!f.present || !f.w || !f.h) return 0;
    const w = Math.max(0, Math.min(f.x! + f.w, vw.width) - Math.max(f.x!, 0));
    const h = Math.max(0, Math.min(f.y! + f.h, vw.height) - Math.max(f.y!, 0));
    return w * h;
}

/** Opacity times the share of the box on screen. */
function seenIn(vw: { width: number; height: number }) {
    return (f: Frame) => (f.present && f.w && f.h ? (f.op ?? 0) * (areaOnScreen(f, vw) / (f.w * f.h)) : 0);
}

/** What is seen of a leaving surface: its opacity times its area on screen, as a share of
 *  its area on screen at rest. A surface that shrinks before it slides off is read by the
 *  area it gives up, not by the share of its own smaller box. */
function seenFrom(vw: { width: number; height: number }, rest: Frame) {
    const full = Math.max(1, areaOnScreen(rest, vw));
    return (f: Frame) => (f.present ? ((f.op ?? 0) * areaOnScreen(f, vw)) / full : 0);
}

function judgeLeave(film: Film, vw: { width: number; height: number }) {
    const { rest } = exitOf(film);
    const seen = seenFrom(vw, rest);
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

// A detented Sheet dragged down by its grip and let go below its first rung is closed by
// the drag. From the release on, what is seen of the plate (its opacity times the share
// of its resting height on screen) never rises above what the drag left, never rises
// from one frame to the next, and is nearly gone by its last painted frame. A thrown
// sheet carries on at the finger's speed, so no bound is set on how much one frame takes.
test("routes · a detented Sheet dragged off leaves from where the drag left it", async ({ page }, info) => {
    const project = info.project.name;
    test.skip(project === "webkit-phone", "Playwright WebKit's touchscreen can tap but not drag");
    await openHarness(page);
    await pressOn(page, project, '[data-testid="x-detent"]');
    const content = '[data-testid="x-detent-content"]';
    await page.locator(`${content}[data-state="open"]`).waitFor();
    await page.waitForTimeout(1200);
    const vw = page.viewportSize()!;
    const shownPx = (f: Frame) => (f.present && f.h ? (f.op ?? 0) * Math.max(0, Math.min(f.y! + f.h, vw.height) - Math.max(f.y!, 0)) : 0);
    const grip = (await page.locator(`${content} [data-slot="sheet-detent-handle"]`).boundingBox())!;
    const x = grip.x + grip.width / 2;
    const y0 = grip.y + grip.height / 2;
    await startFilm(page, content);
    // A finger on the phone form (Chromium's touch input through CDP), the mouse on the
    // desktop form: twelve steps of 30 px, one a frame.
    const cdp = isPhone(project) ? await page.context().newCDPSession(page) : null;
    const touch = (type: string, y?: number) =>
        cdp!.send("Input.dispatchTouchEvent", { type, touchPoints: y === undefined ? [] : [{ x, y, id: 1 }] } as never);
    if (cdp) await touch("touchStart", y0);
    else {
        await page.mouse.move(x, y0);
        await page.mouse.down();
    }
    for (let i = 1; i <= 12; i++) {
        if (cdp) await touch("touchMove", y0 + i * 30);
        else await page.mouse.move(x, y0 + i * 30);
        await page.waitForTimeout(16);
    }
    await markFilm(page);
    if (cdp) await touch("touchEnd");
    else await page.mouse.up();
    const film = await stopFilm(page, 1600);
    const rest = film.frames.find((f) => f.present)!;
    const seen = (f: Frame) => shownPx(f) / shownPx(rest);
    const before = film.frames.filter((f) => f.t < film.mark);
    const left = seen(before[before.length - 1]);
    const after = film.frames.filter((f) => f.t >= film.mark);
    const goneIdx = after.findIndex((f) => seen(f) <= 0.01);
    const leaving = after.slice(0, goneIdx < 0 ? after.length : goneIdx);
    let rise = 0;
    let prev = left;
    for (const f of leaving) {
        rise = Math.max(rise, seen(f) - prev);
        prev = seen(f);
    }
    const read = {
        left: +left.toFixed(3),
        highest: +Math.max(left, ...leaving.map(seen)).toFixed(3),
        rise: +rise.toFixed(3),
        lastSeen: leaving.length ? +seen(leaving[leaving.length - 1]).toFixed(3) : null,
        gone: goneIdx >= 0,
        frames: [...before.slice(-4), ...after.slice(0, 24)].map((f) => [Math.round(f.t - film.mark), +seen(f).toFixed(3)]),
    };
    const at = JSON.stringify(read);
    await info.attach("routes", { body: at, contentType: "application/json" });
    expect(read.left, `the drag carried the sheet down ${at}`).toBeLessThan(0.6);
    expect(read.gone, `the sheet leaves ${at}`).toBe(true);
    expect(read.highest - read.left, `no frame shows more than the drag left ${at}`).toBeLessThanOrEqual(0.02);
    expect(read.rise, `no frame rises from the one before ${at}`).toBeLessThanOrEqual(0.02);
    expect(read.lastSeen ?? 0, `nearly gone by its last painted frame ${at}`).toBeLessThanOrEqual(0.05);
});

for (const route of ["pick", "escape", "outside"] as const) {
    test(`routes · a CommandDialog keeps its list through its exit by ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(project === "webkit-phone" && route === "outside", "Playwright WebKit's touchscreen.tap reaches no outside-press listener");
        // The demo's own palette story: its list of groups is the case that cut.
        await gotoReady(page, "/containers/command");
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

// ── sheet ──────────────────────────────────────────────────────────────────────────
//   sheet  a detented bottom Sheet on the phone, by touch. It rises into place at its
//          rung's size: opened to its 0.9 rung at 430 × 932, its block size reads one
//          value on every frame of the rise; its head's top moves from the screen's edge
//          to where it rests with no frame carrying more than a fifth of that travel, the
//          first and the last frame included; and 120, 190, 250 and 400 ms after its
//          state reads open, a tap at its close button's centre, where the frame then
//          draws it, hits the button and closes the sheet, twenty times in twenty at
//          each: the button is the element at the tap's point in the frame it is read
//          from and the target of the tap's press and of its click (how far the button
//          stands from its rest then, and where the press lands, are recorded). A drag
//          from its 0.5 rung up past the midpoint, let go at speed or at rest, springs
//          on from where the finger left it: from the release no frame carries more than
//          a fifth of the travel left, and the sheet settles on the 0.9 rung. The sheet
//          reaches the 0.5 rung by a first drag down from 0.9, so a spring has already
//          settled on a rung.

const SHEET_HARNESS = "/tests-visual/release-11-1-1/sheet-harness.html";
const SHEET = '[data-testid="s-content"]';
const SHEET_CLOSE = `${SHEET} [data-slot="dialog-close"]`;

async function openSheetHarness(page: Page, query = ""): Promise<void> {
    await gotoReady(page, `${SHEET_HARNESS}${query}`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
}

type SheetSample = { t: number; present: boolean; y?: number; h?: number; head?: number };

/** Samples the sheet's box and its head's top every frame from now until `stop`. */
async function startSheetFilm(page: Page): Promise<void> {
    await page.evaluate(
        ({ sheet }) => {
            const w = window as unknown as { __sheet: { t0: number; mark: number; stop: boolean; frames: SheetSample[] } };
            const film = { t0: performance.now(), mark: -1, stop: false, frames: [] as SheetSample[] };
            w.__sheet = film;
            const tick = (frameTime: number) => {
                const el = document.querySelector(sheet);
                const t = frameTime - film.t0;
                if (!el) film.frames.push({ t, present: false });
                else {
                    const r = el.getBoundingClientRect();
                    const head = el.querySelector('[data-slot="dialog-header"]')?.getBoundingClientRect();
                    film.frames.push({ t, present: true, y: r.top, h: r.height, head: head?.top });
                }
                if (!film.stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        },
        { sheet: SHEET },
    );
    await page.waitForTimeout(80);
}

const markSheetFilm = (page: Page) =>
    page.evaluate(() => {
        const f = (window as unknown as { __sheet: { t0: number; mark: number } }).__sheet;
        f.mark = performance.now() - f.t0;
    });

async function stopSheetFilm(page: Page, ms: number): Promise<{ mark: number; frames: SheetSample[] }> {
    await page.waitForTimeout(ms);
    return page.evaluate(() => {
        const f = (window as unknown as { __sheet: { mark: number; stop: boolean; frames: SheetSample[] } }).__sheet;
        f.stop = true;
        return { mark: f.mark, frames: f.frames };
    });
}

const sheetGone = (page: Page) =>
    page.waitForFunction((sel) => !document.querySelector(sel), SHEET, { timeout: 3000 });

test("sheet · a detented Sheet rises into place at its rung's size", async ({ page }, info) => {
    const project = info.project.name;
    test.skip(!isPhone(project), "the phone form's, by touch");
    test.setTimeout(300_000);
    await page.setViewportSize({ width: 430, height: 932 });
    await openSheetHarness(page);
    const vh = 932;
    const trigger = (await page.locator('[data-testid="s-open"]').boundingBox())!;
    const tapTrigger = () => press(page, project, trigger.x + trigger.width / 2, trigger.y + trigger.height / 2);

    // The rise, filmed from the tap.
    await startSheetFilm(page);
    await markSheetFilm(page);
    await tapTrigger();
    const film = await stopSheetFilm(page, 1400);
    const rest = (await page.locator(SHEET_CLOSE).boundingBox())!;
    const shown = film.frames.filter((f) => f.t >= film.mark && f.present && f.head !== undefined);
    const restHead = shown[shown.length - 1].head!;
    let last = shown.length - 1;
    while (last > 0 && Math.abs(shown[last - 1].head! - restHead) <= 0.5) last--;
    const rising = shown.slice(0, last + 1);
    const heights = rising.map((f) => f.h!);
    // The head starts at the screen's edge, one frame before the first it is painted in.
    const series: [number, number][] = [[rising[0].t - 1000 / 60, vh], ...rising.map((f): [number, number] => [f.t, f.head!])];
    const travel = vh - restHead;
    const rise = {
        heightSpread: +(Math.max(...heights) - Math.min(...heights)).toFixed(2),
        firstHead: Math.round(rising[0].head!),
        restHead: Math.round(restHead),
        share: +worstFrameShare(series, travel).toFixed(3),
        frames: series.map(([t, y], i) => [Math.round(t - film.mark), Math.round(y), i ? Math.round(rising[i - 1].h!) : null]),
    };
    await page.keyboard.press("Escape");
    await sheetGone(page);
    await page.waitForTimeout(500);

    // atlas's sequence, read as the tap's outcome: at open plus each delay, the close
    // button's centre where the next frame draws it, and a tap there. The tap hits when
    // the button is the element at that point in that frame and the target of the tap's
    // press and of its click. A finger's pointer is held by what it pressed, so its click
    // goes there however the sheet has moved by then. Headless Chromium delivers the press
    // a frame after the read, when the button has risen by that frame's travel, so the
    // element at the press's own point, the frames between and the point's distance from
    // the button are recorded with each tap.
    type Heard = { type: string; target: boolean; point: boolean; frames: number; off: number };
    type Tap = { openAt: number; frames: number; events: Heard[]; off: () => void };
    const taps: { after: number; at: number; dy: number; events: string; hit: boolean; closed: boolean }[] = [];
    for (const after of [120, 190, 250, 400])
        for (let i = 0; i < 20; i++) {
            await page.evaluate(
                ({ sheet, close }) => {
                    const tap: Tap = { openAt: 0, frames: -1, events: [], off: () => {} };
                    (window as unknown as { __tap: Tap }).__tap = tap;
                    const watch = new MutationObserver(() => {
                        if (tap.openAt || !document.querySelector(`${sheet}[data-state="open"]`)) return;
                        tap.openAt = performance.now();
                        watch.disconnect();
                    });
                    watch.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-state"] });
                    const onButton = (n: unknown) => n instanceof Element && !!n.closest(close);
                    const on = (e: Event) => {
                        if (!tap.openAt) return;
                        const { clientX, clientY } = e as MouseEvent;
                        const b = document.querySelector(close)!.getBoundingClientRect();
                        const off = Math.hypot(
                            Math.max(0, b.left - clientX, clientX - b.right),
                            Math.max(0, b.top - clientY, clientY - b.bottom),
                        );
                        tap.events.push({
                            type: e.type,
                            target: onButton(e.target),
                            point: onButton(document.elementFromPoint(clientX, clientY)),
                            frames: tap.frames,
                            off: Math.round(off),
                        });
                    };
                    for (const type of ["pointerdown", "click"]) addEventListener(type, on, { capture: true });
                    tap.off = () => {
                        for (const type of ["pointerdown", "click"]) removeEventListener(type, on, { capture: true });
                    };
                },
                { sheet: SHEET, close: SHEET_CLOSE },
            );
            await tapTrigger();
            const drawn = await page.evaluate(
                async ({ close, after }) => {
                    const tap = (window as unknown as { __tap: Tap }).__tap;
                    while (!tap.openAt) await new Promise((r) => setTimeout(r, 2));
                    await new Promise((r) => setTimeout(r, Math.max(0, tap.openAt + after - performance.now())));
                    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
                    const b = document.querySelector(close)!.getBoundingClientRect();
                    const cx = b.left + b.width / 2;
                    const cy = b.top + b.height / 2;
                    const shown = !!document.elementFromPoint(cx, cy)?.closest(close);
                    // The frames drawn from this read until the tap lands.
                    tap.frames = 0;
                    const count = () => {
                        if (tap.events.length) return;
                        tap.frames++;
                        requestAnimationFrame(count);
                    };
                    requestAnimationFrame(count);
                    return { at: Math.round(performance.now() - tap.openAt), y: b.top, cx, cy, shown };
                },
                { close: SHEET_CLOSE, after },
            );
            await press(page, project, drawn.cx, drawn.cy);
            const closed = await page
                .waitForFunction((sel) => document.querySelector(sel)?.getAttribute("data-state") !== "open", SHEET, { timeout: 800 })
                .then(() => true)
                .catch(() => false);
            const heard = await page.evaluate(() => {
                const tap = (window as unknown as { __tap: Tap }).__tap;
                tap.off();
                return tap.events;
            });
            if (!closed) await page.keyboard.press("Escape");
            await sheetGone(page);
            await page.waitForTimeout(400);
            taps.push({
                after,
                at: drawn.at,
                dy: +(drawn.y - rest.y).toFixed(1),
                // Each event: its type, the button its target and at its point (1 or 0),
                // the frames drawn since the read, the point's distance from the button.
                events: heard.map((e) => `${e.type}:${+e.target}${+e.point}:f${e.frames}:${e.off}px`).join(" "),
                hit: drawn.shown && heard.some((e) => e.type === "click") && heard.every((e) => e.target),
                closed,
            });
        }
    const read = { rise, taps };
    await info.attach("sheet", { body: JSON.stringify(read), contentType: "application/json" });
    const at = JSON.stringify({ ...rise, frames: rise.frames.slice(0, 50) });
    expect(rise.heightSpread, `its block size reads one value on every frame of the rise ${at}`).toBeLessThanOrEqual(1);
    expect(rise.share, `no frame carries more than a fifth of the head's travel, first and last included ${at}`).toBeLessThanOrEqual(0.2);
    for (const after of [120, 190, 250, 400]) {
        const these = taps.filter((r) => r.after === after);
        const said = JSON.stringify(these.filter((r) => !r.hit || !r.closed));
        expect(these.filter((r) => r.hit).length, `at open plus ${after} ms the tap hits the button, twenty in twenty ${said}`).toBe(20);
        expect(these.filter((r) => r.closed).length, `and closes the sheet, twenty in twenty ${said}`).toBe(20);
    }
});

/** Drags the sheet's grip by touch (Chromium's CDP touch input): `steps` moves of `px`
 *  (up when negative), one a frame, then, at rest, six still moves 20 ms apart. The
 *  release is marked on the sheet film when one is running. */
async function dragGrip(page: Page, steps: number, px: number, atRest: boolean, mark = false): Promise<void> {
    const grip = (await page.locator(`${SHEET} [data-slot="sheet-detent-handle"]`).boundingBox())!;
    const x = grip.x + grip.width / 2;
    const y0 = grip.y + grip.height / 2;
    const cdp = await page.context().newCDPSession(page);
    const touch = (type: string, y?: number) =>
        cdp.send("Input.dispatchTouchEvent", { type, touchPoints: y === undefined ? [] : [{ x, y, id: 1 }] } as never);
    await touch("touchStart", y0);
    for (let i = 1; i <= steps; i++) {
        await touch("touchMove", y0 + i * px);
        await page.waitForTimeout(16);
    }
    if (atRest)
        for (let i = 0; i < 6; i++) {
            await touch("touchMove", y0 + steps * px);
            await page.waitForTimeout(20);
        }
    if (mark) await markSheetFilm(page);
    await touch("touchEnd");
    await cdp.detach();
}

for (const release of ["at speed", "at rest"] as const) {
    test(`sheet · a detented Sheet dragged up and let go ${release} springs on from where the finger left it`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(!isPhone(project), "the phone form's, by touch");
        test.skip(project === "webkit-phone", "Playwright WebKit's touchscreen can tap but not drag");
        await openSheetHarness(page);
        await pressOn(page, project, '[data-testid="s-open"]');
        await page.locator(`${SHEET}[data-state="open"]`).waitFor();
        await page.waitForTimeout(1200);
        const vh = page.viewportSize()!.height;
        // Down from 0.9 past the midpoint, let go at rest: it settles on the 0.5 rung.
        await dragGrip(page, 12, 22, true);
        await page.waitForTimeout(1200);
        const half = (vh - (await page.locator(SHEET).boundingBox())!.y) / vh;
        // Then up from 0.5 by twelve steps of 15 px, past the midpoint and short of 0.9.
        await startSheetFilm(page);
        await dragGrip(page, 12, -15, release === "at rest", true);
        const film = await stopSheetFilm(page, 1400);
        const before = film.frames.filter((f) => f.t < film.mark && f.present);
        const after = film.frames.filter((f) => f.t >= film.mark && f.present);
        const from = before[before.length - 1].y!;
        const end = after[after.length - 1].y!;
        const series: [number, number][] = [before[before.length - 1], ...after].map((f) => [f.t, f.y!]);
        const read = {
            half: +half.toFixed(3),
            from: Math.round(from),
            end: Math.round(end),
            fromRung: +((vh - from) / vh).toFixed(3),
            endRung: +((vh - end) / vh).toFixed(3),
            share: +worstFrameShare(series, Math.abs(from - end)).toFixed(3),
            frames: series.map(([t, y]) => [Math.round(t - film.mark), Math.round(y)]).slice(0, 40),
        };
        const at = JSON.stringify(read);
        await info.attach("sheet", { body: at, contentType: "application/json" });
        expect(Math.abs(read.half - 0.5), `the first drag left the sheet on its 0.5 rung ${at}`).toBeLessThanOrEqual(0.01);
        expect(read.fromRung, `the drag carried the sheet past the midpoint ${at}`).toBeGreaterThan(0.7);
        expect(read.fromRung, `and short of the 0.9 rung ${at}`).toBeLessThan(0.88);
        expect(read.share, `from the release no frame carries more than a fifth of the travel left ${at}`).toBeLessThanOrEqual(0.2);
        expect(Math.abs(read.endRung - 0.9), `it settles on the 0.9 rung ${at}`).toBeLessThanOrEqual(0.01);
    });
}

// ── reverse ────────────────────────────────────────────────────────────────────────
//   reverse  a surface closed while it opens, or reopened while it closes, turns from
//            where it stands: what is seen of it (its opacity, times the share of its
//            box its clip uncovers and the share on screen) moves no more than a fifth in
//            one frame after the turn, and it ends where the second input sent it. A
//            trigger pressed while a Dialog, a Sheet or a Select leaves reopens it, and a
//            press on the page while a sheet leaves reaches the page. A turn is read on
//            the frame clock, from the last frame painted before the page took the second
//            input; a film with a hole of more than two frames before the surface comes
//            to rest is not read either way, and the cell films it once more. An
//            Accordion or a Collapsible reversed mid-motion runs to its far end before it
//            turns, as on 11.1.0 (its turn moved to 11.1.2); one cell guards its reopen.

/** Evaluates one computed inset() length against the box side it is a share of. */
function insetPx(expr: string, ref: number): number {
    const js = expr
        .replace(/calc\(/g, "(")
        .replace(/(-?[\d.]+)%/g, (_, n) => `(${n}*${ref}/100)`)
        .replace(/(-?[\d.]+)px/g, "($1)");
    // eslint-disable-next-line no-new-func
    return Number(new Function(`return ${js}`)());
}

/** The share of the box's height a clip-path inset() leaves uncovered (1 with no clip). */
function clipShare(clip: string | undefined, h: number): number {
    if (!clip || !clip.startsWith("inset(") || !h) return 1;
    const body = clip.slice(6, clip.lastIndexOf(")")).split(" round ")[0];
    const parts: string[] = [];
    let depth = 0;
    let cur = "";
    for (const ch of body) {
        if (ch === "(") depth++;
        if (ch === ")") depth--;
        if (ch === " " && depth === 0) {
            if (cur) parts.push(cur);
            cur = "";
        } else cur += ch;
    }
    if (cur) parts.push(cur);
    const [top, , bottom = top] = parts.length === 1 ? [parts[0], parts[0], parts[0]] : parts;
    const visible = h - Math.max(0, insetPx(top, h)) - Math.max(0, insetPx(bottom, h));
    return Math.min(1, Math.max(0, visible / h));
}

type Channel = (f: Frame) => number;

function seenChannel(vw: { width: number; height: number }): Channel {
    const onScreen = seenIn(vw);
    return (f) => (f.present ? onScreen(f) * clipShare(f.clip, f.h ?? 0) : 0);
}

type Turn = {
    name: string;
    content: string;
    /** What is filmed, when it is not the content itself (the Toast's ink). */
    film?: string;
    open: (page: Page, project: string) => Promise<void>;
    close: (page: Page, project: string) => Promise<void>;
    /** ms after the first input at which the second lands, mid-motion. */
    at: number;
    /** A disclosure is read by its height. */
    height?: boolean;
    desktopOnly?: boolean;
    /** Only one of the two turns is read (a dismissed Toast is not reopened). */
    only?: "close" | "reopen";
};

const tap = (sel: string) => (page: Page, project: string) => pressOn(page, project, sel);
/** A press on an element that is still moving, where it stands now: `pressOn` scrolls it
 *  into view first, which waits for it to stop. */
const tapNow = (sel: string) => async (page: Page, project: string) => {
    const box = (await page.locator(sel).first().boundingBox())!;
    await press(page, project, box.x + box.width / 2, box.y + box.height / 2);
};
const escape = async (page: Page) => page.keyboard.press("Escape");
const hover = (sel: string) => async (page: Page) => page.locator(sel).hover();
const away = async (page: Page) => page.mouse.move(8, 880);

type Attach = { attach: (n: string, o: { body: string; contentType: string }) => Promise<void> };

/** More than two frames at 60 Hz without a sample. Across a hole that long a film does
 *  not show where the surface stood when the second input landed, nor whether it then
 *  stepped, so the film is not read either way. */
const HOLE = 2 * (1000 / 60);

type TurnRead = { atTurn: number; turnedAt: number; share: number; end: number; hole: number; frames: number[][] };

/** A turn film read on the frame clock, from the last frame painted before the page took
 *  the second input (`turnFrame`) to the end of the film; the frames are ms from that
 *  frame. `hole` is the longest wait between two samples from the last frame before the
 *  first input until the surface reaches the end the second input sent it to. */
function readTurn(film: Film, channel: Channel, ends: "gone" | "open"): TurnRead {
    const at = film.turnFrame ?? -1;
    if (at < 1) throw new Error(`the film saw no second input (turnFrame ${at}, ${film.frames.length} frames)`);
    const series: [number, number][] = film.frames.slice(at - 1).map((f) => [f.t, channel(f)]);
    // Where it turned: the furthest it went toward the end it was heading for before
    // the second input took hold. A surface that turns from where it is turns short of
    // that end; one that restarts from its far end, or empties, touches the end first,
    // for however brief a frame.
    const values = series.map(([, v]) => v);
    const turnedAt = ends === "gone" ? Math.max(...values) : Math.min(...values);
    const arrived = values.findIndex((v) => (ends === "gone" ? v < 0.02 : v > 0.95));
    const from = Math.max(0, film.frames.findIndex((f) => f.t >= film.mark) - 1);
    const until = arrived < 0 ? film.frames.length : at - 1 + arrived + 1;
    let hole = 0;
    for (let i = from + 1; i < until; i++) hole = Math.max(hole, film.frames[i].t - film.frames[i - 1].t);
    return {
        atTurn: +values[0].toFixed(3),
        turnedAt: +turnedAt.toFixed(3),
        share: +worstFrameShare(series, 1).toFixed(3),
        end: +values[values.length - 1].toFixed(3),
        hole: Math.round(hole),
        frames: series.map(([t, v]) => [Math.round(t - series[0][0]), +v.toFixed(3)]),
    };
}

type Shoot = (page: Page) => Promise<{ film: Film; channel: Channel }>;

/** Films a turn and reads it. A film with a hole is not read: it is attached as unread
 *  and the cell films once more from a freshly loaded page, and a second film with a
 *  hole fails the cell as unread rather than red or green. */
async function filmAndReadTurn(page: Page, info: Attach, shoot: Shoot, ends: "gone" | "open"): Promise<TurnRead> {
    let shot = await shoot(page);
    let read = readTurn(shot.film, shot.channel, ends);
    if (read.hole > HOLE) {
        await info.attach("unread", { body: JSON.stringify(read), contentType: "application/json" });
        shot = await shoot(page);
        read = readTurn(shot.film, shot.channel, ends);
    }
    await info.attach("turn", { body: JSON.stringify(read), contentType: "application/json" });
    expect(read.hole, `the film is read: no hole of more than two frames before it comes to rest, in either of two films ${JSON.stringify(read)}`).toBeLessThanOrEqual(HOLE);
    return read;
}

function turnChannel(page: Page, c: { height?: boolean }, full: number): Channel {
    return c.height ? (f) => (f.present ? (f.h ?? 0) / full : 0) : seenChannel(page.viewportSize()!);
}

function expectTurn(read: TurnRead, ends: "gone" | "open"): void {
    const at = JSON.stringify({ ...read, frames: read.frames.slice(0, 45) });
    expect(read.atTurn, `the second input lands mid-motion ${at}`).toBeGreaterThan(0.04);
    expect(read.atTurn, `the second input lands mid-motion ${at}`).toBeLessThan(0.96);
    expect(read.share, `no frame after the turn moves more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
    expect(read.turnedAt, `it turns short of the end it was heading for ${at}`).toBeGreaterThan(0.02);
    expect(read.turnedAt, `it turns short of the end it was heading for ${at}`).toBeLessThan(0.98);
    if (ends === "gone") expect(read.end, `it ends closed ${at}`).toBeLessThan(0.02);
    else expect(read.end, `it ends open ${at}`).toBeGreaterThan(0.95);
}

const turns: Turn[] = [
    { name: "Select", content: '[data-testid="x-select-content"]', open: tap('[data-testid="x-select"]'), close: escape, at: 70 },
    { name: "DropdownMenu", content: '[data-testid="x-menu-content"]', open: tap('[data-testid="x-menu"]'), close: escape, at: 70 },
    { name: "Popover", content: '[data-testid="x-popover-content"]', open: tap('[data-testid="x-popover"]'), close: escape, at: 110 },
    {
        name: "Toast",
        content: '[data-slot="toast"]',
        film: '[data-slot="toast"] > div',
        open: tap('[data-testid="x-toast"]'),
        close: tapNow('[data-slot="toast"] button[aria-label="Dismiss"]'),
        at: 110,
        only: "close",
    },
    { name: "Tooltip", content: '[data-testid="x-tooltip-content"]', open: hover('[data-testid="x-tooltip"]'), close: away, at: 60, desktopOnly: true },
];

const accordion: Turn = {
    name: "Accordion",
    content: '[data-testid="x-accordion-content"]',
    open: tap('[data-testid="x-accordion"]'),
    close: tap('[data-testid="x-accordion"]'),
    at: 60,
    height: true,
};

async function filmTurn(page: Page, project: string, c: Turn, first: "open" | "close", wait: number): Promise<Film> {
    await startFilm(page, c.film ?? c.content);
    await markFilm(page);
    await (first === "open" ? c.open : c.close)(page, project);
    await page.waitForTimeout(wait);
    await markTurn(page);
    await (first === "open" ? c.close : c.open)(page, project);
    return stopFilm(page, 1400);
}

/** A disclosure's open height, read at rest before the film (then closed again). */
async function openHeight(page: Page, project: string, c: Turn): Promise<number> {
    if (!c.height) return 1;
    await c.open(page, project);
    await page.waitForTimeout(900);
    const h = (await page.locator(c.content).boundingBox())!.height;
    await c.close(page, project);
    await page.waitForTimeout(900);
    return h;
}

for (const c of turns) {
    if (c.only !== "reopen")
        test(`reverse · a ${c.name} closed while it opens turns from where it is`, async ({ page }, info) => {
            const project = info.project.name;
            test.skip(Boolean(c.desktopOnly) && isPhone(project), "it does not open on touch");
            const read = await filmAndReadTurn(page, info, async (page) => {
                await openHarness(page);
                const full = await openHeight(page, project, c);
                return { film: await filmTurn(page, project, c, "open", c.at), channel: turnChannel(page, c, full) };
            }, "gone");
            expectTurn(read, "gone");
        });

    if (c.only !== "close")
        test(`reverse · a ${c.name} reopened while it closes turns from where it is`, async ({ page }, info) => {
            const project = info.project.name;
            test.skip(Boolean(c.desktopOnly) && isPhone(project), "it does not open on touch");
            const read = await filmAndReadTurn(page, info, async (page) => {
                await openHarness(page);
                const full = await openHeight(page, project, c);
                await c.open(page, project);
                await page.locator(`${c.content}[data-state$="open"]`).waitFor();
                await page.waitForTimeout(900);
                return { film: await filmTurn(page, project, c, "close", c.height ? 50 : 40), channel: turnChannel(page, c, full) };
            }, "open");
            expectTurn(read, "open");
        });
}

// The disclosure's guard: an Accordion reopened 50 ms into its close ends open, and its
// film is read whole: no hole of more than two frames from the frame before the first
// input until the region comes to rest. One film in a fresh context: in Playwright WebKit
// at 390 a second disclosure filmed after a reload in the same context is holed on
// 11.1.0 as on the branch, so it would read the engine, not the region.
test("reverse · a disclosure reopened while it closes finishes its reopen", async ({ page }, info) => {
    const project = info.project.name;
    const c = accordion;
    await openHarness(page);
    const full = await openHeight(page, project, c);
    await c.open(page, project);
    await page.locator(`${c.content}[data-state="open"]`).waitFor();
    await page.waitForTimeout(900);
    const film = await filmTurn(page, project, c, "close", 50);
    const values = film.frames.map(turnChannel(page, c, full));
    const from = Math.max(0, film.frames.findIndex((f) => f.t >= film.mark) - 1);
    const end = values[values.length - 1];
    let rest = values.length - 1;
    while (rest > from && Math.abs(values[rest - 1] - end) <= 0.01) rest--;
    let hole = 0;
    for (let i = from + 1; i <= rest; i++) hole = Math.max(hole, film.frames[i].t - film.frames[i - 1].t);
    const read = {
        hole: Math.round(hole),
        end: +end.toFixed(3),
        state: await page.locator(c.content).first().getAttribute("data-state"),
        frames: film.frames.slice(from).map((f, i) => [Math.round(f.t - film.frames[from].t), +values[from + i].toFixed(3)]),
    };
    await info.attach("reopen", { body: JSON.stringify(read), contentType: "application/json" });
    const at = JSON.stringify({ ...read, frames: read.frames.slice(0, 45) });
    expect(read.hole, `the film is read, with no hole of more than two frames before it rests ${at}`).toBeLessThanOrEqual(HOLE);
    expect(read.end, `it ends open ${at}`).toBeGreaterThan(0.95);
    expect(read.state, `it is open ${at}`).toBe("open");
});

const reopens = [
    { name: "Dialog", trigger: '[data-testid="x-dialog"]', content: '[data-testid="x-dialog-content"]' },
    { name: "Sheet", trigger: '[data-testid="x-sheet-right"]', content: '[data-testid="x-sheet-right-content"]' },
    { name: "Select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
];

for (const c of reopens) {
    test(`reverse · a press on a leaving ${c.name}'s trigger reopens it from where it is`, async ({ page }, info) => {
        const project = info.project.name;
        let state: string | null = null;
        const read = await filmAndReadTurn(page, info, async (page) => {
            await openHarness(page);
            const box = (await page.locator(c.trigger).boundingBox())!;
            await pressOn(page, project, c.trigger);
            await page.locator(`${c.content}[data-state="open"]`).waitFor();
            await page.waitForTimeout(1000);
            await startFilm(page, c.content);
            await markFilm(page);
            await page.keyboard.press("Escape");
            await page.waitForTimeout(50);
            await markTurn(page);
            await press(page, project, box.x + box.width / 2, box.y + box.height / 2);
            const film = await stopFilm(page, 1400);
            state = await page.locator(c.content).first().getAttribute("data-state", { timeout: 1000 }).catch(() => null);
            return { film, channel: turnChannel(page, {}, 1) };
        }, "open");
        expectTurn(read, "open");
        expect(state, "the surface is open again").toBe("open");
    });
}

test("reverse · a press on the page while a sheet leaves reaches the page", async ({ page }, info) => {
    const project = info.project.name;
    await openHarness(page);
    const count = page.locator('[data-testid="x-count"]');
    await count.scrollIntoViewIfNeeded();
    const box = (await count.boundingBox())!;
    await pressOn(page, project, '[data-testid="x-sheet-bottom"]');
    await page.locator('[data-testid="x-sheet-bottom-content"][data-state="open"]').waitFor();
    await page.waitForTimeout(1000);
    const sheet = (await page.locator('[data-testid="x-sheet-bottom-content"]').boundingBox())!;
    test.skip(box.y + box.height > sheet.y, "the sheet covers the counter");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(40);
    const during = await page.locator('[data-testid="x-sheet-bottom-content"]').count();
    await press(page, project, box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);
    expect(during, "the sheet was still leaving when the press landed").toBe(1);
    expect(await count.getAttribute("data-presses"), "the press reached the page").toBe("1");
});

// ── tooltip ────────────────────────────────────────────────────────────────────────
//   tooltip  a hint enters and leaves on a tween (more than two painted frames between
//            gone and whole, no frame carrying more than a fifth of it), and when the
//            pointer moves to a neighbour's trigger the outgoing hint fades out and the
//            incoming one fades in, neither appearing or vanishing in one frame. Reka's
//            Tooltip does not open on touch, so these are the desktop form's.

function judgeTween(film: Film, vw: { width: number; height: number }, from: number) {
    const seen = seenChannel(vw);
    const after = film.frames.filter((f) => f.t >= from);
    const series: [number, number][] = after.map((f) => [f.t, seen(f)]);
    return {
        between: series.filter(([, v]) => v > 0.02 && v < 0.98).length,
        share: +worstFrameShare(series, 1).toFixed(3),
        end: +(series[series.length - 1]?.[1] ?? 0).toFixed(3),
        frames: series.map(([t, v]) => [Math.round(t - from), +v.toFixed(3)]).slice(0, 40),
    };
}

test("tooltip · a Tooltip enters on a tween", async ({ page }, info) => {
    test.skip(isPhone(info.project.name), "a Tooltip does not open on touch");
    await openHarness(page);
    await startFilm(page, '[data-testid="x-tooltip-content"]');
    await markFilm(page);
    await page.locator('[data-testid="x-tooltip"]').hover();
    const film = await stopFilm(page, 900);
    const read = judgeTween(film, page.viewportSize()!, film.mark);
    await info.attach("enter", { body: JSON.stringify(read), contentType: "application/json" });
    expect(read.end, `it ends whole ${JSON.stringify(read)}`).toBeGreaterThan(0.95);
    expect(read.between, `more than two frames between gone and whole ${JSON.stringify(read)}`).toBeGreaterThan(2);
    expect(read.share, `no frame carries more than a fifth ${JSON.stringify(read)}`).toBeLessThanOrEqual(0.2);
});

for (const dir of ["incoming", "outgoing"] as const) {
    test(`tooltip · a hint handed to its neighbour fades, ${dir}`, async ({ page }, info) => {
        test.skip(isPhone(info.project.name), "a Tooltip does not open on touch");
        await openHarness(page);
        const [first, second] = dir === "incoming" ? ["x-tooltip", "x-tooltip2"] : ["x-tooltip2", "x-tooltip"];
        await page.locator(`[data-testid="${first}"]`).hover();
        await page.locator(`[data-testid="${first}-content"][data-state$="open"]`).waitFor();
        await page.waitForTimeout(500);
        const to = (await page.locator(`[data-testid="${second}"]`).boundingBox())!;
        await startFilm(page, '[data-testid="x-tooltip2-content"]');
        await markFilm(page);
        // A pointer slides across: reka's tooltips read the moves, not a jump.
        await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 8 });
        const film = await stopFilm(page, 900);
        const read = {
            ...judgeTween(film, page.viewportSize()!, film.mark),
            states: await page.evaluate(() =>
                [...document.querySelectorAll('[data-slot="tooltip-content"]')].map((e) => `${e.getAttribute("data-testid")}:${e.getAttribute("data-state")}`),
            ),
        };
        await info.attach("handover", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read);
        if (dir === "incoming") expect(read.end, `the neighbour's hint ends whole ${at}`).toBeGreaterThan(0.95);
        else expect(read.end, `the hint ends gone ${at}`).toBeLessThan(0.02);
        expect(read.between, `more than two frames between gone and whole ${at}`).toBeGreaterThan(2);
        expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
    });
}

// ── expand ─────────────────────────────────────────────────────────────────────────
//   expand  an ExpandableContainer's overlay (its panel, while the root holds the
//           fullscreen placement) enters and leaves on a tween, by its Exit button, by
//           Escape and by its open state; it turns from where it stands when reversed;
//           and Escape is live from the entrance's first frame. What is seen is the
//           panel's opacity times its share of the viewport, counted only while the
//           root is the fullscreen overlay, so the subtree's return to its place in the
//           page is not read as the overlay. The entrance and the first-frame Escape
//           already held on 11.1.0: those two cells keep them from regressing, and are
//           not witnesses of a change.

const EXPAND = '[data-testid="x-expand"]';
const PANEL = `${EXPAND}[data-state="expanded"] > [data-part="panel"]`;

function overlayChannel(vw: { width: number; height: number }): Channel {
    return (f) => {
        if (!f.present || !f.also || !f.w || !f.h) return 0;
        const w = Math.max(0, Math.min(f.x! + f.w, vw.width) - Math.max(f.x!, 0));
        const h = Math.max(0, Math.min(f.y! + f.h, vw.height) - Math.max(f.y!, 0));
        return (f.op ?? 0) * Math.min(1, (w * h) / (vw.width * vw.height));
    };
}

async function filmExpand(page: Page, act: () => Promise<void>, turn?: { wait: number; act: () => Promise<void> }): Promise<Film> {
    await startFilm(page, `${EXPAND} > [data-part="panel"]`, `${EXPAND}[data-state="expanded"]`);
    await markFilm(page);
    await act();
    if (turn) {
        await page.waitForTimeout(turn.wait);
        await markTurn(page);
        await turn.act();
    }
    return stopFilm(page, 1200);
}

/** What is seen of the overlay at rest, open: read by opening it, then closing it. */
async function overlayFull(page: Page, project: string): Promise<number> {
    await pressOn(page, project, `${EXPAND} [data-mode="expand"]`);
    await page.waitForTimeout(900);
    const vw = page.viewportSize()!;
    const box = (await page.locator(PANEL).boundingBox())!;
    await page.keyboard.press("Escape");
    await page.waitForTimeout(900);
    const w = Math.max(0, Math.min(box.x + box.width, vw.width) - Math.max(box.x, 0));
    const h = Math.max(0, Math.min(box.y + box.height, vw.height) - Math.max(box.y, 0));
    return (w * h) / (vw.width * vw.height);
}

function judgeOverlay(film: Film, vw: { width: number; height: number }, from: number, full: number) {
    const ch = overlayChannel(vw);
    const before = film.frames.filter((f) => f.t < from);
    const series: [number, number][] = [before[before.length - 1], ...film.frames.filter((f) => f.t >= from)].map((f) => [f.t, ch(f) / full]);
    const top = 1;
    return {
        top: +top.toFixed(3),
        atTurn: +series[0][1].toFixed(3),
        between: series.filter(([, v]) => v > 0.02 && v < 0.98).length,
        share: +worstFrameShare(series, 1).toFixed(3),
        end: +series[series.length - 1][1].toFixed(3),
        frames: series.map(([t, v]) => [Math.round(t - from), +v.toFixed(3)]).slice(0, 40),
    };
}

const toggle = (project: string) => (page: Page) => pressOn(page, project, '[data-testid="x-expand-toggle"]');

test("expand · an ExpandableContainer enters on a tween", async ({ page }, info) => {
    const project = info.project.name;
    await openHarness(page);
    await page.locator(EXPAND).scrollIntoViewIfNeeded();
    const full = await overlayFull(page, project);
    const film = await filmExpand(page, () => pressOn(page, project, `${EXPAND} [data-mode="expand"]`));
    const read = judgeOverlay(film, page.viewportSize()!, film.mark, full);
    await info.attach("enter", { body: JSON.stringify(read), contentType: "application/json" });
    const at = JSON.stringify(read);
    expect(read.end, `it ends whole ${at}`).toBeGreaterThan(0.95);
    expect(read.between, `more than two frames between gone and whole ${at}`).toBeGreaterThan(2);
    expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
});

for (const route of ["exit", "escape", "open"] as const) {
    test(`expand · an ExpandableContainer leaves on a tween by ${route}`, async ({ page }, info) => {
        const project = info.project.name;
        await openHarness(page);
        await page.locator(EXPAND).scrollIntoViewIfNeeded();
        const full = await overlayFull(page, project);
        await pressOn(page, project, `${EXPAND} [data-mode="expand"]`);
        await page.waitForTimeout(900);
        const act =
            route === "exit"
                ? () => pressOn(page, project, `${EXPAND} [data-mode="collapse"]`)
                : route === "escape"
                  ? () => page.keyboard.press("Escape")
                  : () => page.evaluate(() => (document.querySelector('[data-testid="x-expand-toggle"]') as HTMLElement).click());
        const film = await filmExpand(page, act);
        const read = judgeOverlay(film, page.viewportSize()!, film.mark, full);
        await info.attach("leave", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read);
        expect(read.end, `it ends gone ${at}`).toBeLessThan(0.02);
        expect(read.between, `more than two frames between whole and gone ${at}`).toBeGreaterThan(2);
        expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
    });
}

test("expand · an ExpandableContainer closed while it enters turns from where it is", async ({ page }, info) => {
    const project = info.project.name;
    await openHarness(page);
    await page.locator(EXPAND).scrollIntoViewIfNeeded();
    const full = await overlayFull(page, project);
    const film = await filmExpand(page, () => pressOn(page, project, `${EXPAND} [data-mode="expand"]`), {
        wait: 60,
        act: () => page.keyboard.press("Escape"),
    });
    const read = judgeOverlay(film, page.viewportSize()!, film.turn, full);
    await info.attach("turn", { body: JSON.stringify(read), contentType: "application/json" });
    const at = JSON.stringify(read);
    expect(read.atTurn, `the close lands mid-entrance ${at}`).toBeGreaterThan(0.02);
    expect(read.end, `it ends gone ${at}`).toBeLessThan(0.02);
    expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
});

test("expand · an ExpandableContainer reopened while it leaves turns from where it is", async ({ page }, info) => {
    const project = info.project.name;
    await openHarness(page);
    await page.locator(EXPAND).scrollIntoViewIfNeeded();
    const full = await overlayFull(page, project);
    await pressOn(page, project, `${EXPAND} [data-mode="expand"]`);
    await page.waitForTimeout(900);
    const film = await filmExpand(page, () => page.keyboard.press("Escape"), { wait: 50, act: () => toggle(project)(page) });
    const read = judgeOverlay(film, page.viewportSize()!, film.turn, full);
    await info.attach("turn", { body: JSON.stringify(read), contentType: "application/json" });
    const at = JSON.stringify(read);
    expect(read.atTurn, `the reopen lands mid-exit ${at}`).toBeGreaterThan(0.02);
    expect(read.end, `it ends whole ${at}`).toBeGreaterThan(0.95);
    expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
});

test("expand · Escape is live from the entrance's first frame", async ({ page }, info) => {
    const project = info.project.name;
    await openHarness(page);
    await page.locator(EXPAND).scrollIntoViewIfNeeded();
    // The press, then Escape in the first frame after it.
    await page.evaluate(
        () =>
            new Promise<void>((done) => {
                (document.querySelector('[data-testid="x-expand"] [data-mode="expand"]') as HTMLElement).click();
                requestAnimationFrame(() => {
                    (document.activeElement ?? document.body).dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
                    done();
                });
            }),
    );
    void project;
    await page.waitForTimeout(800);
    expect(await page.locator(`${EXPAND}[data-state="collapsed"]`).count(), "Escape in the entrance's first frame closes it").toBe(1);
});

// ── leave ──────────────────────────────────────────────────────────────────────────
//   leave  every surface that opens says when its leave has finished: one bubbling,
//          composed `leave-finished` event from its content element, with its kind in
//          `detail`, stamped at or after the last frame in which the surface is still
//          seen, and the same-named Vue emit once with it; a close reversed by a reopen
//          says nothing.

const leaves = [
    { name: "Dialog", kind: "dialog", trigger: '[data-testid="x-dialog"]', content: '[data-testid="x-dialog-content"]' },
    { name: "Sheet", kind: "sheet", trigger: '[data-testid="x-sheet-right"]', content: '[data-testid="x-sheet-right-content"]' },
    { name: "Popover", kind: "popover", trigger: '[data-testid="x-popover"]', content: '[data-testid="x-popover-content"]' },
    { name: "DropdownMenu", kind: "menu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]' },
    { name: "Select", kind: "select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
    { name: "Tooltip", kind: "tooltip", trigger: '[data-testid="x-tooltip"]', content: '[data-testid="x-tooltip-content"]', hover: true },
    { name: "Toast", kind: "toast", trigger: '[data-testid="x-toast"]', content: '[data-slot="toast"]', dismiss: '[data-slot="toast"] button[aria-label="Dismiss"]' },
];

async function listenLeaves(page: Page): Promise<void> {
    await page.evaluate(() => {
        const w = window as unknown as { __leaves: { at: number; kind: string; bubbles: boolean; composed: boolean }[] };
        w.__leaves = [];
        window.addEventListener("leave-finished", (e) => {
            const ce = e as CustomEvent<{ kind: string }>;
            w.__leaves.push({ at: performance.now(), kind: ce.detail?.kind, bubbles: ce.bubbles, composed: ce.composed });
        });
    });
}

const readLeaves = (page: Page) =>
    page.evaluate(() => ({
        events: (window as unknown as { __leaves: { at: number; kind: string; bubbles: boolean; composed: boolean }[] }).__leaves,
        emitted: (window as unknown as { __emitted?: Record<string, number> }).__emitted ?? {},
    }));

for (const c of leaves) {
    const open = async (page: Page, project: string) => (c.hover ? page.locator(c.trigger).hover() : pressOn(page, project, c.trigger));
    const close = async (page: Page, project: string) =>
        c.dismiss ? pressOn(page, project, c.dismiss) : c.hover ? page.mouse.move(8, 880) : page.keyboard.press("Escape");

    test(`leave · a ${c.name} says once that its leave has finished, after its last seen frame`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(Boolean(c.hover) && isPhone(project), "a Tooltip does not open on touch");
        await openHarness(page);
        await listenLeaves(page);
        await open(page, project);
        await page.locator(`${c.content}[data-state$="open"]`).first().waitFor();
        await page.waitForTimeout(900);
        await startFilm(page, c.content);
        await markFilm(page);
        await close(page, project);
        const film = await stopFilm(page, 1200);
        const { events, emitted } = await readLeaves(page);
        const seen = seenChannel(page.viewportSize()!);
        const lastSeen = Math.max(...film.frames.filter((f) => f.t >= film.mark && seen(f) > 0.001).map((f) => f.t), film.mark);
        const read = {
            events: events.map((e) => ({ ...e, at: Math.round(e.at - film.t0 - film.mark) })),
            lastSeen: Math.round(lastSeen - film.mark),
            emitted: emitted[c.content.match(/"(x-[^"]+)"/)?.[1] ?? ""] ?? null,
        };
        await info.attach("leave", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read);
        expect(events.length, `one event ${at}`).toBe(1);
        expect(events[0].kind, `its kind ${at}`).toBe(c.kind);
        expect(events[0].bubbles && events[0].composed, `it bubbles and is composed ${at}`).toBe(true);
        expect(events[0].at - film.t0, `it comes at or after the last seen frame ${at}`).toBeGreaterThanOrEqual(lastSeen);
        if (c.kind !== "toast") expect(read.emitted, `the Vue emit fires once with it ${at}`).toBe(1);
    });

    test(`leave · a ${c.name} closed and reopened mid-exit says nothing`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(Boolean(c.hover) && isPhone(project), "a Tooltip does not open on touch");
        test.skip(c.kind === "toast", "a dismissed toast is not reopened");
        await openHarness(page);
        await listenLeaves(page);
        await open(page, project);
        await page.locator(`${c.content}[data-state$="open"]`).first().waitFor();
        await page.waitForTimeout(900);
        await close(page, project);
        await page.waitForTimeout(40);
        await open(page, project);
        await page.waitForTimeout(900);
        const { events, emitted } = await readLeaves(page);
        expect(await page.locator(`${c.content}[data-state$="open"]`).count(), "it is open again").toBe(1);
        expect(events, "no leave-finished event").toEqual([]);
        expect(Object.values(emitted).reduce((a, b) => a + b, 0), "no emit").toBe(0);
    });
}

// The surfaces the exits harness does not hold, on their own page: a ContextMenu, a
// hover card, a Dialog unmounted mid-exit, and an in-place Popover inside an open
// shadow root, heard on its host.
const LEAVE_HARNESS = "/tests-visual/release-11-1-1/leave-harness.html";
type Heard = { at: number; kind: string; bubbles: boolean; composed: boolean };
type HeardLog = { window: Heard[]; host: Heard[]; emits: Record<string, number> };

async function openLeaveHarness(page: Page): Promise<void> {
    await gotoReady(page, LEAVE_HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
}

const heardLog = (page: Page) => page.evaluate(() => JSON.parse(JSON.stringify((window as unknown as { __heard: HeardLog }).__heard)) as HeardLog);

/** Samples, every frame, the last time the element `find` returns was still seen. */
async function watchLastSeen(page: Page, find: string): Promise<void> {
    await page.evaluate((find) => {
        const w = window as unknown as { __lastSeen: number; __watchStop: boolean };
        const get = new Function(`return (${find})`) as () => Element | null;
        w.__lastSeen = 0;
        w.__watchStop = false;
        const seen = (el: Element) => {
            let o = 1;
            for (let n: Node | null = el; n; n = n instanceof ShadowRoot ? n.host : (n as Element).parentNode) {
                if (!(n instanceof Element)) continue;
                const cs = getComputedStyle(n);
                if (cs.display === "none" || cs.visibility === "hidden") return 0;
                o *= parseFloat(cs.opacity);
            }
            return o;
        };
        const tick = (t: number) => {
            const el = get();
            if (el && seen(el) > 0.001) w.__lastSeen = t;
            if (!w.__watchStop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, find);
}
const lastSeen = (page: Page) =>
    page.evaluate(() => {
        const w = window as unknown as { __lastSeen: number; __watchStop: boolean };
        w.__watchStop = true;
        return w.__lastSeen;
    });

function expectOnce(log: Heard[], kind: string, seenAt: number, emits: number | undefined, at: string): void {
    expect(log.length, `one event ${at}`).toBe(1);
    expect(log[0].kind, `its kind ${at}`).toBe(kind);
    expect(log[0].bubbles && log[0].composed, `it bubbles and is composed ${at}`).toBe(true);
    expect(log[0].at, `it comes at or after the last seen frame ${at}`).toBeGreaterThanOrEqual(seenAt);
    expect(emits, `the Vue emit fires once with it ${at}`).toBe(1);
}

test("leave · a Popover inside a shadow root says so to its host", async ({ page }, info) => {
    await openLeaveHarness(page);
    const content = "document.getElementById('host').shadowRoot.querySelector('[data-testid=\"l-shadow-content\"]')";
    const trigger = await page.evaluate(() => {
        const el = document.getElementById("host")!.shadowRoot!.querySelector('[data-testid="l-shadow-trigger"]')!;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await press(page, info.project.name, trigger.x, trigger.y);
    await page.waitForFunction((c) => (new Function(`return (${c})`)() as Element | null)?.getAttribute("data-state") === "open", content);
    await page.waitForTimeout(900);
    await watchLastSeen(page, content);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1200);
    const seenAt = await lastSeen(page);
    const log = await heardLog(page);
    const mounted = await page.evaluate((c) => Boolean(new Function(`return (${c})`)()), content);
    const at = JSON.stringify({ ...log, seenAt, mounted });
    await info.attach("leave", { body: at, contentType: "application/json" });
    expect(mounted, `the popover has left ${at}`).toBe(false);
    expectOnce(log.host, "popover", seenAt, log.emits["l-shadow"], at);
});

for (const route of ["escape", "pick"] as const) {
    test(`leave · a ContextMenu says once that its leave has finished, by ${route}`, async ({ page }, info) => {
        test.skip(isPhone(info.project.name), "a ContextMenu opens on a long press, which Playwright's touchscreen cannot hold");
        await openLeaveHarness(page);
        await page.locator('[data-testid="l-ctx"]').click({ button: "right" });
        await page.locator('[data-testid="l-ctx-content"][data-state="open"]').waitFor();
        await page.waitForTimeout(800);
        await watchLastSeen(page, "document.querySelector('[data-testid=\"l-ctx-content\"]')");
        if (route === "escape") await page.keyboard.press("Escape");
        else await page.locator('[data-testid="l-ctx-Share"]').click();
        await page.waitForTimeout(1000);
        const seenAt = await lastSeen(page);
        const log = await heardLog(page);
        const at = JSON.stringify({ ...log, seenAt });
        await info.attach("leave", { body: at, contentType: "application/json" });
        expectOnce(log.window, "menu", seenAt, log.emits.ctx, at);
    });
}

test("leave · a hover card says once that its leave has finished", async ({ page }, info) => {
    test.skip(isPhone(info.project.name), "a hover card does not open on touch");
    await openLeaveHarness(page);
    await page.mouse.move(700, 700);
    await page.locator('[data-testid="l-hover"]').hover();
    await page.locator('[data-testid="l-hover-content"][data-state="open"]').waitFor();
    await page.waitForTimeout(800);
    await watchLastSeen(page, "document.querySelector('[data-testid=\"l-hover-content\"]')");
    await page.mouse.move(700, 700, { steps: 6 });
    await page.waitForTimeout(1200);
    const seenAt = await lastSeen(page);
    const log = await heardLog(page);
    const at = JSON.stringify({ ...log, seenAt });
    await info.attach("leave", { body: at, contentType: "application/json" });
    expect(await page.locator('[data-testid="l-hover-content"]').count(), "the card has left").toBe(0);
    expectOnce(log.window, "hover-card", seenAt, log.emits.hover, at);
});

test("leave · a Dialog unmounted mid-exit says so once, at the unmount", async ({ page }, info) => {
    await openLeaveHarness(page);
    await pressOn(page, info.project.name, '[data-testid="l-dialog"]');
    await page.locator('[data-testid="l-dialog-content"][data-state="open"]').waitFor();
    await page.waitForTimeout(900);
    const cut = await page.evaluate(
        () =>
            new Promise<number>((done) => {
                const d = (window as unknown as { __dialog: { open: { value: boolean }; mounted: { value: boolean } } }).__dialog;
                d.open.value = false;
                setTimeout(() => {
                    d.mounted.value = false;
                    done(performance.now());
                }, 40);
            }),
    );
    await page.waitForTimeout(800);
    const log = await heardLog(page);
    const at = JSON.stringify({ ...log, cut });
    await info.attach("leave", { body: at, contentType: "application/json" });
    expect(await page.locator('[data-testid="l-dialog-content"]').count(), "the dialog is gone").toBe(0);
    expect(log.window.length, `one event ${at}`).toBe(1);
    expect(log.window[0].kind, `its kind ${at}`).toBe("dialog");
    // The exit had about 140 ms left at the cut; the event comes with the unmount.
    expect(log.window[0].at - cut, `it comes with the unmount ${at}`).toBeLessThanOrEqual(50);
    expect(log.emits.dialog, `the Vue emit fires once with it ${at}`).toBe(1);
});

// ── standing ───────────────────────────────────────────────────────────────────────
//   standing  every surface in the exits table, by every route it has: the exit is
//             painted for more than two frames, and no frame carries more than a fifth
//             of what is seen of it (its opacity, times its area on screen and the share
//             of its box its clip uncovers, against its area on screen at rest), nor
//             (where it moves 16 px or more) of its travel.
//             A route Playwright cannot drive in a form is skipped with its reason:
//             WebKit's touchscreen.tap reaches no outside-press listener (so the outside
//             route, and a trigger press that closes through that listener), and a
//             Tooltip does not open on touch.

type StandingRoute = "pick" | "outside" | "escape" | "trigger" | "close" | "away" | "focus" | "timeout";
type StandingCase = {
    name: string;
    content: string;
    open: (page: Page, project: string) => Promise<void>;
    routes: Partial<Record<StandingRoute, (page: Page, project: string) => Promise<void>>>;
    height?: boolean;
    desktopOnly?: boolean;
    path?: string;
    /** What is filmed, when it is not the content itself: a Toast leaves by releasing
     *  its paint with its root at full opacity, so its ink is what is seen. */
    film?: string;
};

const outsidePress = (page: Page, project: string) => press(page, project, 4, 4);
const standing: StandingCase[] = [
    {
        name: "Select",
        content: '[data-testid="x-select-content"]',
        open: tap('[data-testid="x-select"]'),
        routes: { pick: tap('[data-testid="x-opt-Gradient"]'), outside: outsidePress, escape, trigger: tap('[data-testid="x-select"]') },
    },
    {
        name: "DropdownMenu",
        content: '[data-testid="x-menu-content"]',
        open: tap('[data-testid="x-menu"]'),
        routes: { pick: tap('[data-testid="x-item-Share"]'), outside: outsidePress, escape, trigger: tap('[data-testid="x-menu"]') },
    },
    {
        name: "plain Select",
        content: '[data-testid="x-plain-select-content"]',
        open: tap('[data-testid="x-plain-select"]'),
        routes: { pick: tap('[data-testid="x-plain-Mix"]'), outside: outsidePress, escape },
    },
    {
        name: "Popover",
        content: '[data-testid="x-popover-content"]',
        open: tap('[data-testid="x-popover"]'),
        // Focus leaving: the panel takes focus as it opens, and Tab carries it out.
        routes: { outside: outsidePress, escape, trigger: tap('[data-testid="x-popover"]'), focus: async (page) => page.keyboard.press("Tab") },
    },
    {
        name: "Tooltip",
        content: '[data-testid="x-tooltip-content"]',
        open: hover('[data-testid="x-tooltip"]'),
        routes: { escape, away, trigger: async (page) => page.locator('[data-testid="x-tooltip"]').click() },
        desktopOnly: true,
    },
    {
        name: "brief Toast",
        content: '[data-slot="toast"]',
        film: '[data-slot="toast"] > div',
        open: tap('[data-testid="x-toast-brief"]'),
        routes: { timeout: async () => {} },
    },
    ...(["dialog", "sheet-right", "sheet-bottom", "sheet-top", "sheet-left"] as const).map((id) => ({
        name: id === "dialog" ? "Dialog" : `Sheet ${id.slice(6)}`,
        content: `[data-testid="x-${id}-content"]`,
        open: tap(`[data-testid="x-${id}"]`),
        routes: {
            close: tap(`[data-testid="x-${id}-content"] [data-slot="dialog-close"], [data-testid="x-${id}-content"] button[aria-label="Close"]`),
            outside: outsidePress,
            escape,
        },
    })),
    {
        name: "detented Sheet",
        content: '[data-testid="x-detent-content"]',
        open: tap('[data-testid="x-detent"]'),
        routes: { outside: outsidePress, escape },
    },
    {
        name: "Toast",
        content: '[data-slot="toast"]',
        film: '[data-slot="toast"] > div',
        open: tap('[data-testid="x-toast"]'),
        routes: { close: tap('[data-slot="toast"] button[aria-label="Dismiss"]') },
    },
    {
        name: "Collapsible",
        content: '[data-testid="x-collapsible-content"]',
        open: tap('[data-testid="x-collapsible"]'),
        routes: { trigger: tap('[data-testid="x-collapsible"]') },
        height: true,
    },
    {
        name: "Accordion",
        content: '[data-testid="x-accordion-content"]',
        open: tap('[data-testid="x-accordion"]'),
        routes: { trigger: tap('[data-testid="x-accordion"]') },
        height: true,
    },
    {
        name: "ExpandableContainer",
        content: PANEL,
        open: tap(`${EXPAND} [data-mode="expand"]`),
        routes: { close: tap(`${EXPAND} [data-mode="collapse"]`), escape },
    },
    {
        name: "CommandDialog",
        content: ".command-dialog__content",
        path: "/containers/command",
        open: tap("button:has-text('Open palette')"),
        routes: {
            pick: tap(".command-dialog__content [data-slot=command-item]:not([data-disabled])"),
            outside: (page, project) => press(page, project, 10, 10),
            escape,
        },
    },
];

for (const c of standing) {
    for (const [route, act] of Object.entries(c.routes) as [StandingRoute, (page: Page, project: string) => Promise<void>][]) {
        test(`standing · ${c.name} by ${route}: no exit in under two frames, no frame over a fifth`, async ({ page }, info) => {
            const project = info.project.name;
            test.skip(Boolean(c.desktopOnly) && isPhone(project), "a Tooltip does not open on touch");
            test.skip(
                project === "webkit-phone" && (route === "outside" || (route === "trigger" && !c.height)),
                "Playwright WebKit's touchscreen.tap reaches no outside-press listener",
            );
            if (c.path) await gotoReady(page, c.path);
            else await openHarness(page);
            await c.open(page, project);
            await page.locator(`${c.content}[data-state$="open"], ${c.content}`).first().waitFor();
            await page.waitForTimeout(1000);
            const rest = (await page.locator(c.content).first().boundingBox())!;
            await startFilm(page, c.film ?? c.content);
            await markFilm(page);
            await act(page, project);
            const film = await stopFilm(page, 1400);
            const vw = page.viewportSize()!;
            const before = film.frames.filter((f) => f.t < film.mark);
            const start = before[before.length - 1];
            const fromRest = seenFrom(vw, start);
            const channel: Channel = c.height
                ? (f) => (f.present ? (f.h ?? 0) / rest.height : 0)
                : (f) => fromRest(f) * clipShare(f.clip, f.h ?? 0);
            const after = film.frames.filter((f) => f.t >= film.mark);
            const goneIdx = after.findIndex((f) => channel(f) <= 0.01);
            const leaving = [start, ...after.slice(0, goneIdx < 0 ? after.length : goneIdx + 1)];
            const series: [number, number][] = leaving.map((f) => [f.t, channel(f)]);
            const moving = leaving.filter((f) => f.present && f.x !== undefined);
            const dx = Math.max(...moving.map((f) => Math.abs(f.x! - start.x!)), 0);
            const dy = Math.max(...moving.map((f) => Math.abs(f.y! - start.y!)), 0);
            const axis = dx >= dy ? "x" : "y";
            const travel = c.height ? 0 : Math.max(dx, dy);
            const geometry: [number, number][] = moving.map((f) => [f.t, axis === "x" ? f.x! : f.y!]);
            const read = {
                painted: after.slice(0, goneIdx < 0 ? after.length : goneIdx).filter((f) => channel(f) > 0.01).length,
                share: +worstFrameShare(series, Math.max(channel(start), 0.01)).toFixed(3),
                travel: Math.round(travel),
                travelShare: travel >= 16 ? +worstFrameShare(geometry, travel).toFixed(3) : null,
                gone: goneIdx >= 0,
                frames: series.map(([t, v]) => [Math.round(t - film.mark), +v.toFixed(3)]).slice(0, 40),
            };
            await info.attach("standing", { body: JSON.stringify(read), contentType: "application/json" });
            const at = JSON.stringify(read);
            expect(read.gone, `it leaves ${at}`).toBe(true);
            expect(read.painted, `painted for more than two frames ${at}`).toBeGreaterThan(2);
            expect(read.share, `no frame carries more than a fifth of what is seen ${at}`).toBeLessThanOrEqual(0.2);
            if (read.travelShare !== null) expect(read.travelShare, `no frame carries more than a fifth of the travel ${at}`).toBeLessThanOrEqual(0.2);
        });
    }
}
