// glass-ui 11.1.1 witnesses: reduced motion is a fade. Every cell runs with
// `prefers-reduced-motion: reduce`, in the four projects of `release-11-1-1.config.ts`.
//
//   site     a site's own `transition: opacity 144ms`, unlayered and without
//            `!important`, keeps its clock and fades over more than two frames
//   fade     every surface in the exits table appears and leaves on an opacity fade:
//            the fade spans at least two painted frames, its opacity only rises on the
//            way in and only falls on the way out, its box (place and size) never takes
//            a step between its two ends, and the fade is over within 200 ms (one
//            frame of slack for the sampling); a surface that says when its leave has
//            finished says so once, at or after the fade's last seen frame
//   fold     a collapsible dock unfolds and folds by cross-fading its two faces, the
//            box landing at once
//   mark     a navigation run's selected plate moves to a new seat by a cross-fade:
//            no painted plate travels, and the new seat's plate fades in
//   still    a Slider holds still: its root, track, fill and thumb change on a zero
//            clock, and with the mouse its fill's press and release land at once,
//            taking no transform between the two
import { expect, test, type Page } from "@playwright/test";
import { gotoReady, isPhone, markFilm, press, pressOn, startFilm, stopFilm, type Film, type Frame } from "./release-11-1-1/film";

const EXITS = "/tests-visual/release-11-1-1/exits-harness.html";
const REDUCE = "/tests-visual/release-11-1-1/reduce-harness.html";
const CLOCK = 200;
const SLACK = 1000 / 60 + 4;

async function open(page: Page, path: string): Promise<void> {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoReady(page, path);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
}

type Leg = {
    fading: number;
    rises: boolean;
    falls: boolean;
    span: number;
    boxSteps: number;
    /** The frames that held a box between the ends: [ms from the mark, opacity, x, y, w, h]. */
    stepped: number[][];
    from: number;
    to: number;
};

/** One leg of a fade, from the film's mark: how many frames sit between its two ends,
 *  whether its opacity is monotone, how long it ran and how many painted frames hold a
 *  box that is neither end's. */
function judgeLeg(film: Film, dir: "in" | "out", channel: (f: Frame) => number, box: (f: Frame) => number[] | null): Leg {
    const before = film.frames.filter((f) => f.t < film.mark);
    const after = film.frames.filter((f) => f.t >= film.mark);
    const start = before[before.length - 1];
    const values = after.map((f) => channel(f));
    const from = channel(start);
    const to = values[values.length - 1];
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);
    // A frame counts as between the ends when it is 2 % of the way from either; the
    // span runs from the first frame that has left the start to the first that has
    // reached the end, each read at half a percent, so an eased tail is counted whole.
    const band = (hi - lo) * 0.02;
    const near = (hi - lo) * 0.005;
    const moving = after.filter((f) => channel(f) > lo + band && channel(f) < hi - band);
    const changed = after.findIndex((f) => Math.abs(channel(f) - from) > near);
    const settled = values.findIndex((v, i) => i >= changed && Math.abs(v - to) <= near);
    const span = changed < 0 ? 0 : (after[settled < 0 ? after.length - 1 : settled].t - after[changed].t);
    let rises = true;
    let falls = true;
    for (let i = 1; i < values.length; i++) {
        if (values[i] < values[i - 1] - 0.02) rises = false;
        if (values[i] > values[i - 1] + 0.02) falls = false;
    }
    // The box at each end: the rest box for the exit, the final box for the entrance.
    const ends = [box(start), box(after[after.length - 1])].filter((b): b is number[] => b !== null);
    const same = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]) <= 1.5);
    const stepped = after.filter((f) => channel(f) > 0.01 && box(f) && !ends.some((e) => same(box(f)!, e)));
    return {
        fading: moving.length,
        rises: dir === "in" ? rises : true,
        falls: dir === "out" ? falls : true,
        span: Math.round(span),
        boxSteps: stepped.length,
        stepped: stepped.slice(0, 4).map((f) => [Math.round(f.t - film.mark), +channel(f).toFixed(3), ...box(f)!.map((v) => Math.round(v))]),
        from: +from.toFixed(3),
        to: +to.toFixed(3),
    };
}

function expectFade(leg: Leg, dir: "in" | "out", at: string): void {
    expect(leg.fading, `${dir}: the fade spans at least two frames ${at}`).toBeGreaterThanOrEqual(2);
    expect(dir === "in" ? leg.rises : leg.falls, `${dir}: its opacity is monotone ${at}`).toBe(true);
    expect(leg.boxSteps, `${dir}: no painted frame holds a box between its two ends ${at}`).toBe(0);
    expect(leg.span, `${dir}: the fade is over within ${CLOCK} ms ${at}`).toBeLessThanOrEqual(CLOCK + SLACK);
}

const opacity = (f: Frame) => (f.present ? (f.op ?? 0) : 0);
const boxOf = (f: Frame) => (f.present && f.x !== undefined ? [f.x!, f.y!, f.w!, f.h!] : null);

test("site · a site's own opacity fade keeps its clock under reduced motion", async ({ page }, info) => {
    const project = info.project.name;
    await open(page, REDUCE);
    const duration = await page.locator('[data-testid="r-site"]').evaluate((el) => getComputedStyle(el).transitionDuration);
    await startFilm(page, '[data-testid="r-site"]');
    await markFilm(page);
    await pressOn(page, project, '[data-testid="r-site-toggle"]');
    const film = await stopFilm(page, 600);
    const leg = judgeLeg(film, "out", opacity, boxOf);
    const at = JSON.stringify({ duration, ...leg });
    await info.attach("site", { body: at, contentType: "application/json" });
    expect(duration, `its computed clock ${at}`).toBe("0.144s");
    expect(leg.fading, `it fades over more than two frames ${at}`).toBeGreaterThan(2);
});

type Surface = {
    name: string;
    content: string;
    film?: string;
    enter: (page: Page, project: string) => Promise<void>;
    leave: (page: Page, project: string) => Promise<void>;
    desktopOnly?: boolean;
    /** The surface says when its leave has finished (README, "leave-finished"). */
    says?: boolean;
};

const tap = (sel: string) => (page: Page, project: string) => pressOn(page, project, sel);
const escape = async (page: Page) => page.keyboard.press("Escape");

const surfaces: Surface[] = [
    { name: "Popover", says: true, content: '[data-testid="x-popover-content"]', enter: tap('[data-testid="x-popover"]'), leave: escape },
    { name: "DropdownMenu", says: true, content: '[data-testid="x-menu-content"]', enter: tap('[data-testid="x-menu"]'), leave: escape },
    { name: "dock Select", says: true, content: '[data-testid="x-select-content"]', enter: tap('[data-testid="x-select"]'), leave: escape },
    { name: "plain Select", says: true, content: '[data-testid="x-plain-select-content"]', enter: tap('[data-testid="x-plain-select"]'), leave: escape },
    {
        name: "Tooltip",
        content: '[data-testid="x-tooltip-content"]',
        enter: async (page) => page.locator('[data-testid="x-tooltip"]').hover(),
        leave: async (page) => page.mouse.move(8, 880),
        desktopOnly: true,
        says: true,
    },
    { name: "Dialog", says: true, content: '[data-testid="x-dialog-content"]', enter: tap('[data-testid="x-dialog"]'), leave: escape },
    { name: "Sheet right", says: true, content: '[data-testid="x-sheet-right-content"]', enter: tap('[data-testid="x-sheet-right"]'), leave: escape },
    { name: "Sheet bottom", says: true, content: '[data-testid="x-sheet-bottom-content"]', enter: tap('[data-testid="x-sheet-bottom"]'), leave: escape },
    {
        name: "Toast",
        content: '[data-slot="toast"]',
        film: '[data-slot="toast"] > div',
        enter: tap('[data-testid="x-toast"]'),
        leave: tap('[data-slot="toast"] button[aria-label="Dismiss"]'),
        says: true,
    },
    { name: "Collapsible", content: '[data-testid="x-collapsible-content"]', enter: tap('[data-testid="x-collapsible"]'), leave: tap('[data-testid="x-collapsible"]') },
    { name: "Accordion", content: '[data-testid="x-accordion-content"]', enter: tap('[data-testid="x-accordion"]'), leave: tap('[data-testid="x-accordion"]') },
    {
        name: "ExpandableContainer",
        content: '[data-testid="x-expand"][data-state="expanded"] > [data-part="panel"]',
        enter: tap('[data-testid="x-expand"] [data-mode="expand"]'),
        leave: escape,
    },
];

for (const s of surfaces) {
    test(`fade · a ${s.name} appears and leaves on a fade`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(Boolean(s.desktopOnly) && isPhone(project), "a Tooltip does not open on touch");
        await open(page, EXITS);
        const sel = s.film ?? s.content;
        await startFilm(page, sel);
        await markFilm(page);
        await s.enter(page, project);
        const inFilm = await stopFilm(page, 700);
        await page.locator(s.content).first().waitFor();
        await page.waitForTimeout(300);
        await page.evaluate(() => {
            const w = window as unknown as { __said: number[] };
            w.__said = [];
            window.addEventListener("leave-finished", () => w.__said.push(performance.now()));
        });
        await startFilm(page, sel);
        await markFilm(page);
        await s.leave(page, project);
        const outFilm = await stopFilm(page, 900);
        const said = await page.evaluate(() => (window as unknown as { __said: number[] }).__said);
        const legIn = judgeLeg(inFilm, "in", opacity, boxOf);
        const legOut = judgeLeg(outFilm, "out", opacity, boxOf);
        const lastSeen = Math.max(...outFilm.frames.filter((f) => f.t >= outFilm.mark && opacity(f) > 0.01).map((f) => f.t), outFilm.mark);
        const leave = said.map((t) => Math.round(t - outFilm.t0 - lastSeen));
        const at = JSON.stringify({ in: legIn, out: legOut, leave });
        await info.attach("fade", { body: at, contentType: "application/json" });
        expectFade(legIn, "in", at);
        expectFade(legOut, "out", at);
        if (s.says) {
            expect(leave.length, `one leave-finished event ${at}`).toBe(1);
            expect(leave[0], `it comes at or after the last seen frame ${at}`).toBeGreaterThanOrEqual(0);
        }
    });
}

/** Films the two faces of the fold dock and the dock's own box, frame by frame. */
async function filmFold(page: Page, act: () => Promise<void>): Promise<{ mark: number; frames: { t: number; full: number; summary: number; box: number[] }[] }> {
    await page.evaluate(() => {
        const w = window as unknown as { __fold: { mark: number; frames: unknown[]; stop: boolean } };
        const dock = document.querySelector<HTMLElement>(".r-fold")!;
        const face = (cls: string) => dock.querySelector<HTMLElement>(`.dock-layer--${cls}`)!;
        const seen = (el: HTMLElement) => {
            const cs = getComputedStyle(el);
            return cs.visibility === "hidden" || cs.display === "none" ? 0 : parseFloat(cs.opacity);
        };
        const fold = { mark: -1, frames: [] as unknown[], stop: false };
        w.__fold = fold;
        const t0 = performance.now();
        const tick = (now: number) => {
            const r = dock.getBoundingClientRect();
            fold.frames.push({ t: now - t0, full: seen(face("full")), summary: seen(face("summary")), box: [r.left, r.top, r.width, r.height] });
            if (!fold.stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        (window as unknown as { __foldMark: () => void }).__foldMark = () => (fold.mark = performance.now() - t0);
    });
    await page.waitForTimeout(80);
    await page.evaluate(() => (window as unknown as { __foldMark: () => void }).__foldMark());
    await act();
    await page.waitForTimeout(800);
    return page.evaluate(() => {
        const f = (window as unknown as { __fold: { mark: number; frames: { t: number; full: number; summary: number; box: number[] }[]; stop: boolean } }).__fold;
        f.stop = true;
        return { mark: f.mark, frames: f.frames };
    });
}

function foldLegs(film: Awaited<ReturnType<typeof filmFold>>, entering: "full" | "summary") {
    const leaving = entering === "full" ? "summary" : "full";
    const frames: Frame[] = film.frames.map((f) => ({ t: f.t, present: true, op: f[entering], x: f.box[0], y: f.box[1], w: f.box[2], h: f.box[3] }));
    const gone: Frame[] = film.frames.map((f) => ({ t: f.t, present: true, op: f[leaving], x: f.box[0], y: f.box[1], w: f.box[2], h: f.box[3] }));
    const asFilm = (fr: Frame[]): Film => ({ mark: film.mark, turn: -1, t0: 0, frames: fr });
    return { in: judgeLeg(asFilm(frames), "in", opacity, boxOf), out: judgeLeg(asFilm(gone), "out", opacity, () => null) };
}

test("fold · a dock unfolds and folds by cross-fading its faces, its box landing at once", async ({ page }, info) => {
    const project = info.project.name;
    await open(page, REDUCE);
    const unfold = await filmFold(page, () => pressOn(page, project, ".r-fold .dock-layer--summary"));
    await page.waitForTimeout(300);
    await page.locator(".r-fold .dock-layer--full.is-active").waitFor();
    // A press outside folds a dock that a press unfolded.
    const fold = await filmFold(page, () => press(page, project, 4, 4));
    const legs = { unfold: foldLegs(unfold, "full"), fold: foldLegs(fold, "summary") };
    const at = JSON.stringify(legs);
    await info.attach("fold", { body: at, contentType: "application/json" });
    expect(legs.unfold.in.to, `it unfolded ${at}`).toBeGreaterThan(0.99);
    expect(legs.fold.in.to, `it folded ${at}`).toBeGreaterThan(0.99);
    for (const [name, leg] of Object.entries(legs)) {
        expectFade(leg.in, "in", `${name} ${at}`);
        expectFade(leg.out, "out", `${name} ${at}`);
    }
});

test("mark · a run's selected plate moves to a new seat by a cross-fade", async ({ page }, info) => {
    const project = info.project.name;
    await open(page, REDUCE);
    await page.locator(".r-run .dock-run-mark").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        const w = window as unknown as { __run: { mark: number; frames: unknown[]; stop: boolean } };
        const run = document.querySelector<HTMLElement>(".r-run .dock-run")!;
        // A computed colour's alpha, in any of the forms an engine returns: rgb(a), or a
        // colour function (oklab, color()) with a slash alpha.
        const alpha = (c: string) => {
            if (c === "transparent") return 0;
            const slash = /\/\s*([\d.]+)(%?)\s*\)$/.exec(c);
            if (slash) return parseFloat(slash[1]) / (slash[2] ? 100 : 1);
            const m = /^rgba\(([^)]+)\)$/.exec(c);
            return m ? parseFloat(m[1].split(",")[3]) : 1;
        };
        const seat = (i: number) => document.querySelector<HTMLElement>(`[data-testid="r-seat-${i}"]`)!;
        const film = { mark: -1, frames: [] as unknown[], stop: false };
        w.__run = film;
        const t0 = performance.now();
        const tick = (now: number) => {
            const mark = run.querySelector<HTMLElement>(".dock-run-mark");
            const cs = mark ? getComputedStyle(mark) : null;
            const r = mark?.getBoundingClientRect();
            film.frames.push({
                t: now - t0,
                mark: mark && cs!.display !== "none" && cs!.visibility !== "hidden" ? parseFloat(cs!.opacity) * alpha(cs!.backgroundColor) : 0,
                x: r ? r.left : 0,
                old: alpha(getComputedStyle(seat(0)).backgroundColor),
                next: alpha(getComputedStyle(seat(3)).backgroundColor),
            });
            if (!film.stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        (window as unknown as { __runMark: () => void }).__runMark = () => (film.mark = performance.now() - t0);
    });
    await page.waitForTimeout(80);
    await page.evaluate(() => (window as unknown as { __runMark: () => void }).__runMark());
    await pressOn(page, project, '[data-testid="r-seat-3"]');
    await page.waitForTimeout(800);
    const film = await page.evaluate(() => {
        const f = (window as unknown as { __run: { mark: number; frames: { t: number; mark: number; x: number; old: number; next: number }[]; stop: boolean } }).__run;
        f.stop = true;
        return { mark: f.mark, frames: f.frames };
    });
    // A painted plate that travels: the mark, seen, at a place more than 2 px from where
    // it stood the frame before.
    let travel = 0;
    for (let i = 1; i < film.frames.length; i++) {
        const [a, b] = [film.frames[i - 1], film.frames[i]];
        if (a.mark > 0.05 && b.mark > 0.05 && Math.abs(b.x - a.x) > 2) travel = Math.max(travel, Math.abs(b.x - a.x));
    }
    // The plate on each seat: the seat's own fill (the mark, while it is drawn, paints
    // over seats that then fill nothing, and it is judged by its travel above).
    const seatFilm = (key: "old" | "next"): Film => ({ mark: film.mark, turn: -1, t0: 0, frames: film.frames.map((f) => ({ t: f.t, present: true, op: f[key] })) });
    const legs = { in: judgeLeg(seatFilm("next"), "in", opacity, () => null), out: judgeLeg(seatFilm("old"), "out", opacity, () => null), travel: Math.round(travel) };
    const at = JSON.stringify(legs);
    await info.attach("mark", { body: at, contentType: "application/json" });
    expect(legs.travel, `no painted plate travels ${at}`).toBe(0);
    expectFade(legs.in, "in", `new seat ${at}`);
    expectFade(legs.out, "out", `old seat ${at}`);
});

test("still · a Slider holds still under reduced motion", async ({ page }, info) => {
    const project = info.project.name;
    await open(page, REDUCE);
    const root = '[data-testid="r-slider"] .glass-slider';
    const clocks = await page.locator(root).evaluate((el) => {
        const read = (part: Element | null) => (part ? getComputedStyle(part).transitionDuration : "absent");
        return { root: read(el), track: read(el.querySelector(".slider-track")), fill: read(el.querySelector(".slider-range")), thumb: read(el.querySelector(".slider-thumb")) };
    });
    const zero = (d: string) => d.split(",").every((v) => parseFloat(v) === 0);
    // A held press and its release, filmed on the fill: the transform before the input,
    // the one the leg ends on, how many values it took and how many frames held a value
    // other than those two. A held press needs a mouse; at the phone form the clocks are
    // the read.
    type Leg = { from: string; to: string; values: number; between: number };
    let pressLeg: Leg | null = null;
    let releaseLeg: Leg | null = null;
    if (!isPhone(project)) {
        await page.evaluate(() => {
            const w = window as unknown as { __fill: { frames: [number, string][]; stop: boolean; down: number; up: number } };
            const fill = document.querySelector('[data-testid="r-slider"] .slider-range')!;
            const film = { frames: [] as [number, string][], stop: false, down: -1, up: -1 };
            w.__fill = film;
            const t0 = performance.now();
            const tick = (now: number) => {
                film.frames.push([now - t0, getComputedStyle(fill).transform]);
                if (!film.stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            (window as unknown as { __fillMark: (k: "down" | "up") => void }).__fillMark = (k) => (film[k] = performance.now() - t0);
        });
        const box = (await page.locator(root).boundingBox())!;
        await page.mouse.move(box.x + box.width * 0.4, box.y + box.height / 2);
        await page.waitForTimeout(80);
        await page.evaluate(() => (window as unknown as { __fillMark: (k: string) => void }).__fillMark("down"));
        await page.mouse.down();
        await page.waitForTimeout(500);
        await page.evaluate(() => (window as unknown as { __fillMark: (k: string) => void }).__fillMark("up"));
        await page.mouse.up();
        await page.waitForTimeout(600);
        const film = await page.evaluate(() => {
            const f = (window as unknown as { __fill: { frames: [number, string][]; stop: boolean; down: number; up: number } }).__fill;
            f.stop = true;
            return f;
        });
        const leg = (from: number, to: number) => {
            const before = film.frames.filter(([t]) => t < from);
            const start = before[before.length - 1][1];
            const values = film.frames.filter(([t]) => t >= from && t < to).map(([, v]) => v);
            const end = values[values.length - 1];
            return { from: start, to: end, values: new Set(values).size, between: values.filter((v) => v !== start && v !== end).length };
        };
        pressLeg = leg(film.down, film.up);
        releaseLeg = leg(film.up, Infinity);
    }
    const at = JSON.stringify({ clocks, press: pressLeg, release: releaseLeg });
    await info.attach("still", { body: at, contentType: "application/json" });
    for (const [part, d] of Object.entries(clocks)) expect(zero(d), `the ${part} changes on a zero clock ${at}`).toBe(true);
    if (pressLeg && releaseLeg) {
        expect(pressLeg.to, `the press reached the fill ${at}`).not.toBe(pressLeg.from);
        expect(releaseLeg.to, `the release returned the fill to rest ${at}`).toBe(pressLeg.from);
        expect(pressLeg.between, `the press takes no transform between rest and pressed ${at}`).toBe(0);
        expect(releaseLeg.between, `the release takes no transform between pressed and rest ${at}`).toBe(0);
    }
});
