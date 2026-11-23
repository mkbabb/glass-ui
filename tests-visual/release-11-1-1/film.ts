// A per-frame film of one surface. Every animation frame records whether the surface
// is mounted, its box (as painted, and its layout size), its effective opacity (the product up the ancestor chain), its
// scale, transform and filter, its state attributes and its material, from just before an
// action until `ms` after it.
import type { Page } from "@playwright/test";

export type Frame = {
    t: number;
    present: boolean;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    /** The layout box, which a transform does not change. */
    lw?: number;
    lh?: number;
    op?: number;
    state?: string | null;
    form?: string | null;
    surface?: string | null;
    bf?: string;
    bg?: string;
    /** A CSS animation or transition is running on the surface. */
    anim?: boolean;
    clip?: string;
    /** Computed `scale`, `transform` and `filter`. */
    scale?: string;
    transform?: string;
    filter?: string;
    /** The companion selector is mounted. */
    also?: boolean;
    /** The companion's effective opacity, on every frame it is mounted, the surface's or not. */
    alsoOp?: number;
};

export type Film = {
    mark: number;
    turn: number;
    /** On the frame clock: how many frames were filmed before the page took the first
     *  input after `markTurn`, so `frames[turnFrame - 1]` is the last one painted before
     *  the turn's input and the frames from `turnFrame` on are painted after it. */
    turnFrame?: number;
    t0: number;
    frames: Frame[];
};

/** What a page did while its film ran: its main-frame navigations and its console, each
 *  stamped in ms from the film's start. A film lives on the page's window, so a page that
 *  navigates or reloads loses it, and this log names why. */
type PageLog = { since: number; navigations: string[]; console: string[] };
const pageLogs = new WeakMap<Page, PageLog>();

function logPage(page: Page): void {
    let log = pageLogs.get(page);
    if (!log) {
        const fresh: PageLog = { since: 0, navigations: [], console: [] };
        const at = () => `+${Date.now() - fresh.since} ms`;
        page.on("framenavigated", (frame) => {
            if (frame === page.mainFrame()) fresh.navigations.push(`${at()} ${frame.url()}`);
        });
        page.on("console", (message) => fresh.console.push(`${at()} ${message.type()}: ${message.text()}`));
        pageLogs.set(page, fresh);
        log = fresh;
    }
    log.since = Date.now();
    log.navigations.length = 0;
    log.console.length = 0;
}

function lostFilm(page: Page): Error {
    const log = pageLogs.get(page);
    const read = { navigations: log?.navigations ?? [], console: log?.console.slice(-12) ?? [] };
    return new Error(`the page lost its film: it navigated or reloaded ${JSON.stringify(read)}`);
}

export async function startFilm(page: Page, selector: string, also = ""): Promise<void> {
    logPage(page);
    await page.evaluate(({ selector, also }) => {
        const w = window as unknown as { __film: { mark: number; frames: unknown[]; stop: boolean } };
        const film = { mark: -1, turn: -1, turnFrame: -1, armed: false, frames: [] as unknown[], stop: false };
        w.__film = film;
        const t0 = performance.now();
        (film as unknown as { t0: number }).t0 = t0;
        const effective = (el: Element) => {
            let o = 1;
            for (let n: Element | null = el; n; n = n.parentElement) {
                const cs = getComputedStyle(n);
                if (cs.display === "none" || cs.visibility === "hidden") return 0;
                o *= parseFloat(cs.opacity);
            }
            return o;
        };
        // Each sample is stamped with its frame's own time, the time the engine paints it
        // for, so a late callback does not stretch or squeeze the frame it reads.
        const tick = (frameTime: number) => {
            const t = frameTime - t0;
            const el = document.querySelector(selector);
            const companion = also ? document.querySelector(also) : null;
            const alsoOp = companion ? effective(companion) : undefined;
            if (!el) film.frames.push({ t, present: false, alsoOp });
            else {
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                film.frames.push({
                    t,
                    present: true,
                    x: r.left,
                    y: r.top,
                    w: r.width,
                    h: r.height,
                    lw: (el as HTMLElement).offsetWidth,
                    lh: (el as HTMLElement).offsetHeight,
                    op: effective(el),
                    state: el.getAttribute("data-state"),
                    form: el.getAttribute("data-form"),
                    surface: el.getAttribute("data-surface"),
                    bf: cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || "",
                    bg: cs.backgroundColor,
                    anim: el.getAnimations().some((a) => a.playState === "running"),
                    clip: cs.clipPath,
                    scale: cs.scale,
                    transform: cs.transform,
                    filter: cs.filter,
                    also: also ? !!companion : undefined,
                    alsoOp,
                });
            }
            if (!film.stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        (window as unknown as { __mark: () => void }).__mark = () => {
            film.mark = performance.now() - t0;
        };
        (window as unknown as { __turn: () => void }).__turn = () => {
            film.turn = performance.now() - t0;
            film.armed = true;
        };
        // The turn's input on the frame clock: the first input event the page takes
        // after `__turn` stamps how many frames were filmed before it.
        const onInput = () => {
            if (!film.armed) return;
            film.armed = false;
            film.turnFrame = film.frames.length;
        };
        for (const type of ["pointerdown", "pointermove", "mousedown", "mousemove", "touchstart", "keydown", "click"])
            addEventListener(type, onInput, { capture: true });
    }, { selector, also });
    await firstFrame(page, "__film");
}

/** Resolves once the page's film at `window[key]` holds its first frame and the page's
 *  clock has passed that frame's stamp, so the mark or the input that follows is stamped
 *  strictly after a filmed frame however late the page draws and however coarse its
 *  clock. The film keeps its start in `t0` and stamps each frame's `t` from it. */
export async function firstFrame(page: Page, key: string): Promise<void> {
    await page.waitForFunction((key) => {
        const film = (window as unknown as Record<string, { t0: number; frames: { t: number }[] }>)[key];
        return film.frames.length > 0 && performance.now() - film.t0 > film.frames[0].t;
    }, key);
}

export async function markFilm(page: Page): Promise<void> {
    const held = await page.evaluate(() => {
        const mark = (window as unknown as { __mark?: () => void }).__mark;
        mark?.();
        return Boolean(mark);
    });
    if (!held) throw lostFilm(page);
}

/** Marks the second input of a film that reverses a surface mid-motion. */
export async function markTurn(page: Page): Promise<void> {
    const held = await page.evaluate(() => {
        const turn = (window as unknown as { __turn?: () => void }).__turn;
        turn?.();
        return Boolean(turn);
    });
    if (!held) throw lostFilm(page);
}

/** Stops the film `ms` from now and returns it. A page that no longer holds its film
 *  fails by name, with what the page did since the film began. */
export async function stopFilm(page: Page, ms: number): Promise<Film> {
    await page.waitForTimeout(ms);
    const film = await page.evaluate(() => {
        const f = (window as unknown as { __film?: { mark: number; turn: number; turnFrame: number; t0: number; frames: Frame[]; stop: boolean } }).__film;
        if (!f) return null;
        f.stop = true;
        return { mark: f.mark, turn: f.turn, turnFrame: f.turnFrame, t0: f.t0, frames: f.frames };
    });
    if (!film) throw lostFilm(page);
    return film;
}

/** The last frame filmed before the mark; with `present`, the last that holds the
 *  surface. A film with none fails by name. */
export function lastBefore(film: Film, present = false): Frame {
    const before = film.frames.filter((f) => f.t < film.mark && (!present || f.present));
    const last = before[before.length - 1];
    if (!last) {
        const first = film.frames.slice(0, 4).map((f) => [Math.round(f.t), f.present]);
        throw new Error(`the film holds no frame ${present ? "of the surface " : ""}before its mark ${JSON.stringify({ mark: Math.round(film.mark), first })}`);
    }
    return last;
}

/** The last open frame before the action, and every frame after it while the surface
 *  is mounted and still painted. A film with no frame of the surface before its mark
 *  fails by name. */
export function exitOf(film: Film): { rest: Frame; exit: Frame[]; gone: boolean } {
    const rest = lastBefore(film, true);
    const after = film.frames.filter((f) => f.t >= film.mark);
    const exit = after.filter((f) => f.present && (f.op ?? 0) > 0.01);
    const gone = after.length > 0 && !after[after.length - 1].present;
    return { rest, exit, gone };
}

/** The largest share of a channel's travel that one frame at 60 Hz carries, over a list
 *  of [ms, value] samples (a sample after the surface is gone reads 0). A change between
 *  two consecutive samples no more than a frame apart is read whole: it was painted in
 *  one frame. A change that spans more than a frame is scaled to one frame: between two
 *  consecutive samples across a late callback, and from each sample to the first one at
 *  least a frame later, so an engine's uneven callback times do not read as steps and
 *  several small steps inside one frame add up; a removal still reads whole, since it
 *  lands within a frame or two of the last painted value. */
export function worstFrameShare(samples: [number, number][], travel: number): number {
    if (travel <= 0) return 0;
    const frame = 1000 / 60;
    let worst = 0;
    for (let i = 0; i < samples.length - 1; i++) {
        const step = Math.abs(samples[i + 1][1] - samples[i][1]) / travel;
        const gap = samples[i + 1][0] - samples[i][0];
        worst = Math.max(worst, gap <= frame ? step : step * (frame / gap));
        let j = i + 1;
        while (j + 1 < samples.length && samples[j][0] - samples[i][0] < frame) j++;
        const dt = Math.max(frame, samples[j][0] - samples[i][0]);
        worst = Math.max(worst, (Math.abs(samples[j][1] - samples[i][1]) / travel) * (frame / dt));
    }
    return worst;
}

export const isPhone = (project: string) => project.endsWith("-phone");

/** A tap with a finger on the phone form, a click with the mouse on the desktop form. */
export async function press(page: Page, project: string, x: number, y: number): Promise<void> {
    if (isPhone(project)) await page.touchscreen.tap(x, y);
    else await page.mouse.click(x, y);
}

export async function pressOn(page: Page, project: string, selector: string): Promise<void> {
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    const box = await page.locator(selector).first().boundingBox();
    if (!box) throw new Error(`no box for ${selector}`);
    await press(page, project, box.x + box.width / 2, box.y + box.height / 2);
}

/** Opens `url`. A WebKit process that has opened many pages can hang on a navigation with
 *  the server alive, so a navigation that times out is retried once, after the server has
 *  answered; a server that does not answer fails the cell by name. */
export async function gotoReady(page: Page, url: string): Promise<void> {
    try {
        await page.goto(url, { timeout: 20_000 });
    } catch (first) {
        const status = await page.request
            .get("/", { timeout: 10_000 })
            .then((r) => r.status())
            .catch(() => 0);
        if (status !== 200) throw new Error(`the server did not answer (${status}) after ${String(first)}`);
        await page.goto(url, { timeout: 20_000 });
    }
}
