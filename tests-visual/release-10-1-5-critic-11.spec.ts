// glass-ui 10.1.5 — critic round 11's own cells (docs/release-10.1.5/critique-11.md). Harness
// `release-10-1-5/critic-11{,-v1014}.html` (`CRITIC_ARM=v1014` reads v10.1.4's tree). Rows bank to
// `docs/release-10.1.5/critic-11/probe/<arm>/<project>/<cell>.json`; probes never fail on a finding.
//   c11a O-205 a collapsed dock (layer group, plain run): plate corners, every run's scroll extents
//   c11b O-205 second trigger: an open dock whose inactive face is wider; then mid-crossfade both ways
//   c11c O-201 value's Home ⌃ select trigger at the run's start and end: focus, open, after Escape;
//        an end seat focused across the fit edge; a scrolled run's end seats focused
//   c11d O-207 G3 every focusable atom in the focus scene under keyboard focus: ring and contrast
//   c11e O-207 G1 the default scrubber fill on a saturated card, light and dark
//   c11f O-207 G10 fourier's dock box from mount
import { test, type Browser, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-11/probe/${ARM || "branch"}/`, import.meta.url).pathname;

function dir(): string {
    const d = `${OUT}${test.info().project.name}`;
    mkdirSync(d, { recursive: true });
    return d;
}
function bank(name: string, rows: unknown): void {
    writeFileSync(`${dir()}/${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, q: string, wait = 700): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-11${ARM ? "-" + ARM : ""}.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(wait);
}

async function frames(page: Page, n = 2): Promise<void> {
    await page.evaluate((n) => new Promise<void>((r) => { let i = 0; const f = () => (++i >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
}

/** A context per cell, closed in finally. Coarse = touch + isMobile. */
async function cell<T>(browser: Browser, width: number, coarse: boolean, dark: boolean, fn: (p: Page) => Promise<T>): Promise<T> {
    const ctx = await browser.newContext({
        baseURL: test.info().project.use.baseURL ?? `http://localhost:${process.env.GLASS_UI_DEMO_PORT ?? 5199}`,
        viewport: { width, height: width > 800 ? 900 : 844 },
        hasTouch: coarse,
        isMobile: coarse,
        colorScheme: dark ? "dark" : "light",
        reducedMotion: "no-preference",
    });
    try {
        return await fn(await ctx.newPage());
    } finally {
        await ctx.close();
    }
}

/** The dock's plate, its half cross extent, and every run's scroll extents (active or not). */
function plate(page: Page) {
    return page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const r = plate.getBoundingClientRect();
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        const half = Math.min(r.width, r.height) / 2;
        return {
            collapsed: dock.classList.contains("collapsed"),
            fits: dock.hasAttribute("data-run-fits"),
            w: +r.width.toFixed(2), h: +r.height.toFixed(2), half: +half.toFixed(2), radii,
            uniform: radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - half) <= 0.5),
            anims: plate.getAnimations().map((a) => (a as CSSAnimation).animationName),
            runs: [...dock.querySelectorAll<HTMLElement>(".dock-run")].map((run) => ({
                cls: run.className, sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight,
                sl: Math.round(run.scrollLeft), overflowX: getComputedStyle(run).overflowX, timeline: getComputedStyle(run).scrollTimelineName,
            })),
            faces: [...dock.querySelectorAll<HTMLElement>(".dock-face")].map((f) => ({
                cls: f.className, w: +f.getBoundingClientRect().width.toFixed(1), sw: f.scrollWidth,
                overflow: getComputedStyle(f).overflow, contain: getComputedStyle(f).contain, clip: getComputedStyle(f).clipPath, opacity: getComputedStyle(f).opacity,
            })),
        };
    });
}

const WIDTHS = [360, 390, 430, 820, 1440];

/* ── c11a · O-205 collapsed ─────────────────────────────────────────────────────────── */
test("c11a O-205 a collapsed dock: rest corner and no scrolling run", async ({ browser }) => {
    test.setTimeout(600_000);
    const rows: unknown[] = [];
    for (const width of WIDTHS)
        for (const dark of [false, true])
            for (const layers of [1, 0]) {
                const row = await cell(browser, width, width < 800, dark, async (page) => {
                    await open(page, `scene=o205&collapse=closed&layers=${layers}&dark=${+dark}`, 1500);
                    await frames(page);
                    const p = await plate(page);
                    const full = p.runs.find((r) => r.cls.includes("dock-layer--full"));
                    const shot = `${dir()}/c11a-${width}-${dark ? "dark" : "light"}-l${layers}.png`;
                    await page.locator(".glass-dock").screenshot({ path: shot });
                    return { width, dark, layers, ...p, fullScroll: full ? full.sw - full.cw : null, pass: p.collapsed && p.uniform && (full ? full.sw <= full.cw : true) };
                });
                rows.push(row);
            }
    bank("c11a", rows);
});

/* ── c11b · O-205 second trigger and the crossfade ─────────────────────────────────── */
test("c11b O-205 an open dock with a wider inactive face; mid-crossfade", async ({ browser }) => {
    test.setTimeout(900_000);
    const rows: unknown[] = [];
    for (const width of WIDTHS)
        for (const dark of [false, true]) {
            const row = await cell(browser, width, width < 800, dark, async (page) => {
                await open(page, `scene=o205&collapse=false&layers=1&active=read&dark=${+dark}`, 1200);
                await frames(page);
                const rest = await plate(page);
                // The active face's own extent against the port: does it truly overflow?
                const activeFits = await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-layer--full.dock-run")!;
                    const face = run.querySelector<HTMLElement>(".dock-face.is-active > .dock-face-content") ?? run.querySelector<HTMLElement>(".dock-face.is-active")!;
                    const cs = getComputedStyle(run);
                    const port = run.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
                    return { faceW: +face.getBoundingClientRect().width.toFixed(1), port: +port.toFixed(1), fits: face.getBoundingClientRect().width <= port + 0.5 };
                });
                await page.locator(".glass-dock").screenshot({ path: `${dir()}/c11b-${width}-${dark ? "dark" : "light"}-rest.png` });
                // Mid-crossfade, both ways: every frame for 900 ms.
                const swaps: unknown[] = [];
                for (const to of ["pages", "read"]) {
                    const trace = await page.evaluate(async (to) => {
                        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                        const run = dock.querySelector<HTMLElement>(".dock-layer--full.dock-run")!;
                        (window as unknown as { __setActive: (v: string) => void }).__setActive(to);
                        const out: unknown[] = [];
                        const t0 = performance.now();
                        await new Promise<void>((r) => {
                            const f = () => {
                                const cs = getComputedStyle(plate);
                                const leaving = run.querySelector<HTMLElement>(".dock-face.is-leaving");
                                const lcs = leaving ? getComputedStyle(leaving) : null;
                                out.push({
                                    t: Math.round(performance.now() - t0),
                                    radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(" "),
                                    h: +plate.getBoundingClientRect().height.toFixed(2),
                                    sw: run.scrollWidth, cw: run.clientWidth, fits: dock.hasAttribute("data-run-fits"),
                                    leaving: lcs ? { overflow: lcs.overflow, clip: lcs.clipPath, contain: lcs.contain, op: lcs.opacity } : null,
                                });
                                if (performance.now() - t0 < 900) requestAnimationFrame(f);
                                else r();
                            };
                            requestAnimationFrame(f);
                        });
                        return out;
                    }, to);
                    await page.waitForTimeout(400);
                    swaps.push({ to, trace, after: await plate(page) });
                }
                return { width, dark, rest, activeFits, swaps };
            });
            rows.push(row);
        }
    bank("c11b", rows);
});

/** The focused element's ring box (outline + offset, or box-shadow spread) against every clipping ancestor. */
function ringClip(page: Page, sel: string) {
    return page.evaluate((sel) => {
        const el = document.querySelector<HTMLElement>(sel)!;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const ow = cs.outlineStyle !== "none" ? parseFloat(cs.outlineWidth) : 0;
        const reach = ow > 0 ? ow + parseFloat(cs.outlineOffset) : 0;
        const spread = [...cs.boxShadow.matchAll(/(-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px/g)].reduce((m, x) => Math.max(m, parseFloat(x[4]!)), 0);
        const ext = Math.max(reach, cs.boxShadow.includes("inset") ? 0 : spread);
        const ring = { l: r.left - ext, t: r.top - ext, r: r.right + ext, b: r.bottom + ext };
        const cuts: unknown[] = [];
        let worst = 0;
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
            const acs = getComputedStyle(a);
            const clips = acs.overflowX !== "visible" || acs.overflowY !== "visible" || acs.clipPath !== "none" || /paint|strict|content/.test(acs.contain);
            if (!clips) continue;
            const ar = a.getBoundingClientRect();
            const box = { l: ar.left + a.clientLeft, t: ar.top + a.clientTop, r: ar.left + a.clientLeft + a.clientWidth, b: ar.top + a.clientTop + a.clientHeight };
            const c = { l: box.l - ring.l, t: box.t - ring.t, r: ring.r - box.r, b: ring.b - box.b };
            const m = Math.max(c.l, c.t, c.r, c.b);
            if (m > 0.5) cuts.push({ cls: a.className.toString().slice(0, 60), cut: Object.fromEntries(Object.entries(c).map(([k, v]) => [k, +v.toFixed(2)])) });
            worst = Math.max(worst, m);
        }
        return {
            focused: document.activeElement === el, fv: el.matches(":focus-visible"), state: el.getAttribute("data-state"),
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off ${cs.outlineOffset}`, ext: +ext.toFixed(2),
            worst: +worst.toFixed(2), cuts,
        };
    }, sel);
}

async function tabTo(page: Page, sel: string, max = 20): Promise<boolean> {
    for (let i = 0; i < max; i++) {
        await page.keyboard.press("Tab");
        if (await page.evaluate((sel) => document.activeElement?.matches(sel) ?? false, sel)) return true;
    }
    return false;
}

/* ── c11c · O-201 ring clip ──────────────────────────────────────────────────────────── */
test("c11c O-201 the Home trigger's ring and end seats' rings are never clipped", async ({ browser }) => {
    test.setTimeout(1_200_000);
    const rows: unknown[] = [];
    for (const width of [390, 1440])
        for (const coarse of [false, true])
            for (const dark of [false, true])
                for (const at of ["start", "end"]) {
                    const row = await cell(browser, width, coarse, dark, async (page) => {
                        await open(page, `scene=o201&at=${at}&dark=${+dark}`, 1000);
                        const sel = '[data-witness="home"]';
                        const out: Record<string, unknown> = { width, coarse, dark, at, plate: await plate(page) };
                        await page.mouse.move(2, 2);
                        out.found = await tabTo(page, sel);
                        await frames(page, 3);
                        await page.waitForTimeout(250);
                        out.focus = await ringClip(page, sel);
                        await page.locator(".glass-dock").screenshot({ path: `${dir()}/c11c-${width}-${coarse ? "c" : "f"}-${dark ? "dark" : "light"}-${at}-focus.png` });
                        const hb = await page.locator(sel).boundingBox();
                        if (hb) await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
                        await page.waitForTimeout(300);
                        out.focusHover = await ringClip(page, sel);
                        await page.keyboard.press("Enter");
                        await page.waitForTimeout(500);
                        out.open = await ringClip(page, sel);
                        await page.keyboard.press("Escape");
                        await page.waitForTimeout(500);
                        out.afterEscape = await ringClip(page, sel);
                        await page.locator(".glass-dock").screenshot({ path: `${dir()}/c11c-${width}-${coarse ? "c" : "f"}-${dark ? "dark" : "light"}-${at}-escape.png` });
                        return out;
                    });
                    rows.push(row);
                }
    // The end seat at the fit edge (fix 8's N3 case), a cap swept in 1 px steps, and a run scrolled to each end.
    for (const coarse of [false, true])
        for (const width of [390, 1440]) {
            const row = await cell(browser, width, coarse, false, async (page) => {
                await open(page, `scene=o201&at=end`, 1000);
                const natural = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width);
                const sweep: unknown[] = [];
                let edge: number | null = null;
                for (let cap = Math.ceil(natural) + 2; cap >= Math.ceil(natural) - 60; cap--) {
                    await page.evaluate((cap) => (document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = `${cap}px`), cap);
                    await frames(page, 3);
                    const fits = await page.evaluate(() => document.querySelector(".glass-dock")!.hasAttribute("data-run-fits"));
                    if (!fits && edge === null) edge = cap + 1;
                    if (edge !== null && cap < edge - 1) break;
                }
                for (let cap = (edge ?? Math.ceil(natural)) - 1; cap <= (edge ?? Math.ceil(natural)) + 10; cap++) {
                    await page.evaluate((cap) => (document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = `${cap}px`), cap);
                    await frames(page, 3);
                    await page.waitForTimeout(120);
                    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
                    const sel = '[data-witness="home"]';
                    const first = '[data-witness="S1"]';
                    const f = await tabTo(page, first);
                    const firstRing = f ? await ringClip(page, first) : null;
                    const e = await tabTo(page, sel);
                    await page.waitForTimeout(250);
                    const endRing = e ? await ringClip(page, sel) : null;
                    if (cap === edge || cap === (edge ?? 0) + 1) {
                        const b = await page.locator(".glass-dock").boundingBox();
                        if (b) await page.screenshot({ path: `${dir()}/c11c-edge-${width}-${coarse ? "c" : "f"}-cap${cap}-end.png`, clip: { x: b.x - 12, y: b.y - 12, width: b.width + 24, height: b.height + 24 } });
                    }
                    sweep.push({ cap, fits: await page.evaluate(() => document.querySelector(".glass-dock")!.hasAttribute("data-run-fits")), firstRing, endRing });
                }
                return { width, coarse, natural, edge, sweep };
            });
            rows.push({ kind: "fit-edge", ...(row as object) });
        }
    bank("c11c", rows);
});

/* ── c11d · O-207 G3 every focusable atom's ring ─────────────────────────────────────── */
test("c11d O-207 G3 keyboard focus paints a ring on every atom", async ({ browser }) => {
    test.setTimeout(600_000);
    const rows: unknown[] = [];
    for (const dark of [false, true]) {
        const row = await cell(browser, 1280, false, dark, async (page) => {
            await open(page, `scene=focus&dark=${+dark}`, 800);
            await page.mouse.move(2, 2);
            const out: unknown[] = [];
            for (let i = 0; i < 14; i++) {
                await page.keyboard.press("Tab");
                await page.waitForTimeout(250);
                const info = await page.evaluate(() => {
                    const el = document.activeElement as HTMLElement | null;
                    if (!el || el === document.body) return null;
                    const cs = getComputedStyle(el);
                    const r = el.getBoundingClientRect();
                    return {
                        tag: el.tagName, cls: el.className.toString().slice(0, 80), witness: el.closest("[data-witness]")?.getAttribute("data-witness"),
                        fv: el.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off ${cs.outlineOffset}`, shadow: cs.boxShadow,
                        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
                    };
                });
                if (!info) continue;
                // Paint: the ring band (6 px outside the box) focused against the same band blurred.
                const pad = 8;
                const clip = { x: Math.max(0, info.rect.x - pad), y: Math.max(0, info.rect.y - pad), width: info.rect.w + 2 * pad, height: info.rect.h + 2 * pad };
                const on = await page.screenshot({ clip });
                await page.evaluate(() => (document.activeElement as HTMLElement).blur());
                await page.waitForTimeout(250);
                const off = await page.screenshot({ clip });
                // re-focus by keyboard order: shift-tab then tab returns to the same element
                await page.keyboard.press("Shift+Tab");
                await page.keyboard.press("Tab");
                await page.waitForTimeout(150);
                const contrast = await page.evaluate(async ([a, b, w, hgt, ex, ey]) => {
                    const load = (s: string) => new Promise<ImageData>((res) => {
                        const im = new Image();
                        im.onload = () => { const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const g = c.getContext("2d")!; g.drawImage(im, 0, 0); res(g.getImageData(0, 0, im.width, im.height)); };
                        im.src = "data:image/png;base64," + s;
                    });
                    const A = await load(a as string), B = await load(b as string);
                    const lin = (v: number) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
                    const L = (d: Uint8ClampedArray, i: number) => 0.2126 * lin(d[i]!) + 0.7152 * lin(d[i + 1]!) + 0.0722 * lin(d[i + 2]!);
                    const sx = A.width / (w as number), sy = A.height / (hgt as number);
                    let best = 1, changed = 0;
                    for (let y = 0; y < A.height; y++)
                        for (let x = 0; x < A.width; x++) {
                            const px = x / sx, py = y / sy;
                            const inside = px > (ex as number) && px < (w as number) - (ex as number) && py > (ey as number) && py < (hgt as number) - (ey as number);
                            if (inside) continue; // the ring band only: outside the element's own box
                            const i = (y * A.width + x) * 4;
                            const la = L(A.data, i), lb = L(B.data, i);
                            const c = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
                            if (c > 1.05) changed++;
                            best = Math.max(best, c);
                        }
                    return { best: +best.toFixed(2), changed };
                }, [on.toString("base64"), off.toString("base64"), clip.width, clip.height, info.rect.x - clip.x, info.rect.y - clip.y]);
                out.push({ ...info, contrast });
            }
            return { dark, atoms: out };
        });
        rows.push(row);
    }
    bank("c11d", rows);
});

/* ── c11e · O-207 G1 the scrubber fill on a saturated card ───────────────────────────── */
test("c11e O-207 G1 the default scrubber fill on a coloured card", async ({ browser }) => {
    test.setTimeout(300_000);
    const rows: unknown[] = [];
    for (const dark of [false, true])
        for (const ink of ["", "fg"])
            for (const bg of ["oklch(0.62 0.2 25)", "oklch(0.75 0.15 150)", "oklch(0.55 0.18 260)"]) {
                const row = await cell(browser, 900, false, dark, async (page) => {
                    await open(page, `scene=card&dark=${+dark}&ink=${ink}&bg=${encodeURIComponent(bg)}`, 600);
                    const read = await page.evaluate(() => {
                        const range = document.querySelector<HTMLElement>(".slider-range")!;
                        const cs = getComputedStyle(range);
                        return { bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0, 120), cls: range.className };
                    });
                    await page.locator('[data-witness="card"]').screenshot({ path: `${dir()}/c11e-${dark ? "dark" : "light"}-${ink || "default"}-${bg.replace(/[^0-9a-z.]+/gi, "_")}.png` });
                    return { dark, ink, bg, ...read };
                });
                rows.push(row);
            }
    bank("c11e", rows);
});

/* ── c11f · O-207 G10 the dock box from mount ────────────────────────────────────────── */
test("c11f O-207 G10 fourier's dock box takes no first-frame step", async ({ browser }) => {
    test.setTimeout(300_000);
    const rows: unknown[] = [];
    for (const width of [390, 1440])
        for (const coarse of [false, true])
            for (const rep of [0, 1, 2]) {
                const row = await cell(browser, width, coarse && width < 800, false, async (page) => {
                    await open(page, `scene=fourier`, 1700);
                    const trace = (await page.evaluate(() => (window as unknown as { __trace: [number, string][] }).__trace)) as [number, string][];
                    const boxes = trace.filter(([, s]) => s !== "none").map(([t, s]) => { const [l, wh] = s.split(","); const [w] = wh!.split("x"); return { t, l: +l!, w: +w! }; });
                    let step = 0;
                    for (let i = 1; i < boxes.length; i++) step = Math.max(step, Math.abs(boxes[i]!.l - boxes[i - 1]!.l), Math.abs(boxes[i]!.w - boxes[i - 1]!.w));
                    return { width, coarse, rep, trace, maxStep: +step.toFixed(2), pass: step <= 1 };
                });
                rows.push(row);
            }
    bank("c11f", rows);
});

/* ── c11g · fix 10's Q2 arm on an undeclared wrapper around a current anchor ────────── */
test("c11g an undeclared wrapper around the current anchor", async ({ page }) => {
    const rows: unknown[] = [];
    for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 800 });
        await open(page, "scene=wrap", 900);
        rows.push({
            width,
            read: await page.evaluate(() => {
                const w = document.querySelector<HTMLElement>('[data-witness="wrap"]')!;
                const cs = getComputedStyle(w);
                return { w: +w.getBoundingClientRect().width.toFixed(2), inlineSize: cs.inlineSize, openSeat: getComputedStyle(document.querySelector(".glass-dock")!).getPropertyValue("--dock-open-seat") };
            }),
        });
        await page.locator(".glass-dock").screenshot({ path: `${dir()}/c11g-${width}.png` });
    }
    bank("c11g", rows);
});

/* ── c11h · fix 10's Q1 key: a host that moves the parent's PADDING (its content box) mid-expand ──
   `constraintOf` reads the parent's clientWidth/clientHeight, the padding box, so a host padding change
   that narrows the dock's room across the fit edge moves nothing it reads. The vertical six-seat dock of
   critic 10's c10b, its stage's block padding moved 0.5-1 px a side mid-expand, on critic 10's harness. */
type VFrame = { t: number; m: boolean; fits: boolean; s1: number; ph: number; pad: string; sh: number; ch: number; r: string };
function vtrace(page: Page, ms: number, plan: [number, string][]): Promise<VFrame[]> {
    return page.evaluate(
        ({ ms, plan }) =>
            new Promise<VFrame[]>((res) => {
                const out: VFrame[] = [];
                const t0 = performance.now();
                const todo = [...plan];
                const stage = document.querySelector<HTMLElement>('[data-witness="stage"]')!;
                const act = (a: string) => {
                    const w = window as unknown as { __dock: { expand(): void } };
                    if (a === "expand") w.__dock.expand();
                    else if (a.startsWith("pad:")) stage.style.paddingBlock = a.slice(4) + "px";
                    else if (a.startsWith("stage:")) stage.style.blockSize = a.slice(6) + "px";
                };
                const tick = () => {
                    const t = performance.now() - t0;
                    while (todo.length && todo[0]![0] <= t) act(todo.shift()![1]);
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                    const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run")!;
                    const a = document.querySelector<HTMLElement>('[data-witness="S1"]')!.getBoundingClientRect();
                    const pcs = getComputedStyle(plate);
                    out.push({
                        t: Math.round(t), m: dock.hasAttribute("data-morphing"), fits: dock.hasAttribute("data-run-fits"),
                        s1: +(a.top + run.scrollTop).toFixed(2), ph: plate.offsetHeight, pad: getComputedStyle(run).padding,
                        sh: run.scrollHeight, ch: run.clientHeight,
                        r: [pcs.borderTopLeftRadius, pcs.borderTopRightRadius, pcs.borderBottomRightRadius, pcs.borderBottomLeftRadius].join(" "),
                    });
                    if (t < ms) requestAnimationFrame(tick);
                    else res(out);
                };
                requestAnimationFrame(tick);
            }),
        { ms, plan },
    );
}
test("c11h a host padding change across the fit edge mid-expand (vertical)", async ({ page }) => {
    test.setTimeout(600_000);
    await page.setViewportSize({ width: 1440, height: 800 });
    const H10 = (h: number) => `/tests-visual/release-10-1-5/critic-10${ARM ? "-" + ARM : ""}.html?scene=seats&collapse=closed&orientation=vertical&stageH=${h}&kinds=icon,icon,icon,icon,icon,icon`;
    const go = async (h: number) => {
        await page.goto(H10(h));
        await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
        await page.waitForTimeout(700);
        await page.mouse.move(1430, 790);
    };
    const rows: unknown[] = [];
    await go(600);
    await vtrace(page, 1300, [[30, "expand"]]);
    const vs = await page.evaluate(async () => {
        const stage = document.querySelector<HTMLElement>('[data-witness="stage"]')!;
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const out: [number, boolean][] = [];
        for (let s = 380; s >= 290; s -= 1) {
            stage.style.blockSize = s + "px";
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            await new Promise((r) => setTimeout(r, 60));
            out.push([s, dock.hasAttribute("data-run-fits")]);
        }
        return out;
    });
    // v10.1.4 has no `data-run-fits`; its arm runs at the branch's fit edge (314, critique 10's c10b).
    const Ev = vs.some(([, f]) => f) ? Math.min(...vs.filter(([, f]) => f).map(([s]) => s)) : 314;
    rows.push({ Ev });
    // stage at Ev, padding 16 → 16.5 / 17 (the content box 1 / 2 px shorter); stage at Ev-1, padding 16 → 15 (2 px taller).
    for (const [stageH, pad] of [[Ev, "16.5"], [Ev, "17"], [Ev - 1, "15"], [Ev - 2, "15"]] as const)
        for (const at of [110, 300]) {
            await go(stageH);
            const fr = await vtrace(page, 1700, [[30, "expand"], [at, `pad:${pad}`]]);
            const i = fr.findIndex((f, k) => k > 0 && fr[k - 1]!.m && !f.m);
            const p = i > 0 ? fr[i - 1]! : null, c = i > 0 ? fr[i]! : null;
            const end = fr.at(-1)!;
            rows.push({
                stageH, pad, at, settleAt: i, dS1: p && c ? +Math.abs(c.s1 - p.s1).toFixed(2) : null, dPlate: p && c ? c.ph - p.ph : null,
                around: fr.slice(Math.max(0, i - 2), i + 2),
                end: { fits: end.fits, over: end.sh > end.ch, pad: end.pad, r: end.r },
                flags: fr.reduce<[number, boolean, boolean][]>((acc, f) => { if (!acc.length || acc.at(-1)![1] !== f.fits) acc.push([f.t, f.fits, f.m]); return acc; }, []),
            });
            // the same change by stage block size, the case fix 10 cured, as the control
            if (pad === "17" || pad === "15") {
                await go(stageH);
                const fr2 = await vtrace(page, 1700, [[30, "expand"], [at, `stage:${pad === "17" ? stageH - 2 : stageH + 2}`]]);
                const j = fr2.findIndex((f, k) => k > 0 && fr2[k - 1]!.m && !f.m);
                rows.push({ control: true, stageH, to: pad === "17" ? stageH - 2 : stageH + 2, at, dS1: j > 0 ? +Math.abs(fr2[j]!.s1 - fr2[j - 1]!.s1).toFixed(2) : null });
            }
        }
    bank("c11h", rows);
});

/* ── c11i · O-205's second trigger in use: a wheel over an open dock whose active face fits ── */
test("c11i O-205 a wheel over a fitting run with a wider inactive face", async ({ page }) => {
    const rows: unknown[] = [];
    for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 800 });
        await open(page, "scene=o205&collapse=false&layers=1&active=read", 1200);
        const read = () =>
            page.evaluate(() => {
                const run = document.querySelector<HTMLElement>(".dock-layer--full.dock-run")!;
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!.getBoundingClientRect();
                const seats = [...run.querySelectorAll<HTMLElement>(".dock-face.is-active [data-glass-dock-seat]")].map((s) => {
                    const r = s.getBoundingClientRect();
                    return { l: +r.left.toFixed(1), r: +r.right.toFixed(1), shown: r.right > plate.left && r.left < plate.right };
                });
                return { fits: dock.hasAttribute("data-run-fits"), sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, plate: [+plate.left.toFixed(1), +plate.right.toFixed(1)], seats };
            });
        const before = await read();
        const b = await page.locator(".dock-layer--full.dock-run").boundingBox();
        await page.mouse.move(b!.x + b!.width / 2, b!.y + b!.height / 2);
        await page.mouse.wheel(400, 0);
        await page.waitForTimeout(900);
        const after = await read();
        await page.locator(".glass-dock").screenshot({ path: `${dir()}/c11i-${width}-after-wheel.png` });
        rows.push({ width, before, after });
    }
    bank("c11i", rows);
});
