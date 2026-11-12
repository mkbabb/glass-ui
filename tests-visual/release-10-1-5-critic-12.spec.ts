// glass-ui 10.1.5 — critic round 12's own cells (docs/release-10.1.5/critique-12.md). Harnesses
// `release-10-1-5/critic-1{0,1,2}{,-v1014}.html` (`CRITIC_ARM=v1014` reads v10.1.4's tree). Rows bank to
// `docs/release-10.1.5/critic-12/probe/<arm>/<project>/<cell>.json`; probes never fail on a finding.
//   c12a O-201 a vertical run across its fit edge: the first and last seats' keyboard rings
//   c12b O-201 / r1 a horizontal run across the ring-room band at rest: flag, scroll range, corners, hidden seats, trailing hover
//   c12c r1 a run that truly overflows: rest cut, end, flush restore; scroll kept across collapse and expand; RTL
//   c12d r2 every frame of a collapse and an expand: corner uniformity
//   c12e O-207 G3/K4 the Slider (default and spectrum), the SortableList handle and the Sheet's detent handle
import { test, type Browser, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-12/probe/${ARM || "branch"}/`, import.meta.url).pathname;
const H = (n: 10 | 11 | 12, q: string) => `/tests-visual/release-10-1-5/critic-${n}${ARM ? "-" + ARM : ""}.html?${q}`;

function dir(): string {
    const d = `${OUT}${test.info().project.name}`;
    mkdirSync(d, { recursive: true });
    return d;
}
function bank(name: string, rows: unknown): void {
    writeFileSync(`${dir()}/${name}.json`, JSON.stringify(rows, null, 1));
}
async function open(page: Page, url: string, wait = 800): Promise<void> {
    await page.goto(url);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(wait);
}
async function frames(page: Page, n = 2): Promise<void> {
    await page.evaluate((n) => new Promise<void>((r) => { let i = 0; const f = () => (++i >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
}
async function cell<T>(browser: Browser, width: number, coarse: boolean, dark: boolean, fn: (p: Page) => Promise<T>, height?: number): Promise<T> {
    const ctx = await browser.newContext({
        baseURL: test.info().project.use.baseURL ?? `http://localhost:${process.env.GLASS_UI_DEMO_PORT ?? 5199}`,
        viewport: { width, height: height ?? (width > 800 ? 900 : 844) },
        hasTouch: coarse, isMobile: coarse, colorScheme: dark ? "dark" : "light", reducedMotion: "no-preference",
    });
    try {
        return await fn(await ctx.newPage());
    } finally {
        await ctx.close();
    }
}
const tabKey = (page: Page, shift = false) =>
    `${page.context().browser()?.browserType().name() === "webkit" ? "Alt+" : ""}${shift ? "Shift+" : ""}Tab`;
async function tabTo(page: Page, sel: string, max = 24): Promise<boolean> {
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    for (let i = 0; i < max; i++) {
        await page.keyboard.press(tabKey(page));
        if (await page.evaluate((sel) => document.activeElement?.matches(sel) ?? false, sel)) return true;
    }
    return false;
}
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
        return { focused: document.activeElement === el, fv: el.matches(":focus-visible"), ext: +ext.toFixed(2), worst: +worst.toFixed(2), cuts };
    }, sel);
}
/** Plate corners and the active run's extents. */
function plate(page: Page) {
    return page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const pl = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(pl);
        const r = pl.getBoundingClientRect();
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        const half = Math.min(r.width, r.height) / 2;
        const run = dock.querySelector<HTMLElement>(":where(.dock-layers) > .dock-run.is-active") ?? dock.querySelector<HTMLElement>(".dock-run");
        const rr = run?.getBoundingClientRect();
        const seats = run ? [...run.querySelectorAll<HTMLElement>("[data-glass-dock-seat]")].filter((s) => !s.closest(".dock-face:not(.is-active)")) : [];
        const hidden = rr ? seats.filter((s) => { const b = s.getBoundingClientRect(); return b.left < rr.left - 0.5 || b.right > rr.right + 0.5 || b.top < rr.top - 0.5 || b.bottom > rr.bottom + 0.5; }).length : -1;
        return {
            collapsed: dock.classList.contains("collapsed"), fits: dock.hasAttribute("data-run-fits"),
            w: +r.width.toFixed(2), h: +r.height.toFixed(2), half: +half.toFixed(2), radii,
            uniform: radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - half) <= 0.5),
            pct: radii.some((x) => x.includes("%")),
            run: run ? { sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight, sl: +run.scrollLeft.toFixed(1), st: +run.scrollTop.toFixed(1), seats: seats.length, hidden } : null,
        };
    });
}

/* ── c12a · O-201 a vertical run across its fit edge ─────────────────────────────────────── */
test("c12a O-201 vertical: end seats' rings across the fit edge", async ({ browser }) => {
    test.setTimeout(1_500_000);
    const rows: unknown[] = [];
    for (const [width, coarse] of [[1440, false], [390, true]] as const)
        for (const dark of [false, true]) {
            const row = await cell(browser, width, coarse, dark, async (page) => {
                await open(page, H(10, `scene=seats&collapse=false&orientation=vertical&stageH=420&kinds=icon,icon,icon,icon,icon,icon&dark=${+dark}`), 1000);
                await page.mouse.move(width - 5, 5);
                const sweep: unknown[] = [];
                for (let s = 360; s >= 296; s -= 2) {
                    await page.evaluate((s) => (document.querySelector<HTMLElement>('[data-witness="stage"]')!.style.blockSize = `${s}px`), s);
                    await frames(page, 3);
                    await page.waitForTimeout(150);
                    // keyboard modality, then the first seat by focus() (k2's form; WebKit's Option+Tab misses this dock)
                    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
                    await page.keyboard.press("Shift");
                    await page.locator('[data-witness="S1"]').focus();
                    const f = await page.evaluate(() => document.activeElement?.matches('[data-witness="S1"]') ?? false);
                    await page.waitForTimeout(250);
                    const first = f ? await ringClip(page, '[data-witness="S1"]') : null;
                    // the seats are one roving tab stop: End from the first seat lands the last
                    if (f) await page.keyboard.press("End");
                    await page.waitForTimeout(350);
                    const e = await page.evaluate(() => document.activeElement?.matches('[data-witness="S6"]') ?? false);
                    const last = e ? await ringClip(page, '[data-witness="S6"]') : null;
                    const p = await plate(page);
                    sweep.push({ stage: s, fits: p.fits, run: p.run, first: first && { worst: first.worst, fv: first.fv, cuts: first.cuts }, last: last && { worst: last.worst, fv: last.fv, cuts: last.cuts } });
                    if ((last?.worst ?? 0) > 0.5 || (first?.worst ?? 0) > 0.5) {
                        const b = await page.locator(".glass-dock").boundingBox();
                        if (b && sweep.filter((x) => ((x as { last: { worst: number } | null }).last?.worst ?? 0) > 0.5).length <= 2)
                            await page.screenshot({ path: `${dir()}/c12a-${width}-${dark ? "dark" : "light"}-stage${s}-last.png`, clip: { x: Math.max(0, b.x - 12), y: Math.max(0, b.y - 12), width: b.width + 24, height: b.height + 24 } });
                    }
                }
                return { width, coarse, dark, sweep };
            });
            rows.push(row);
        }
    bank("c12a", rows);
});

/* ── c12b · O-201 / r1 the ring-room band on a horizontal run, at rest and with the pointer resting on the end seat ── */
test("c12b horizontal ring-room band at rest", async ({ browser }) => {
    test.setTimeout(1_200_000);
    const rows: unknown[] = [];
    for (const [width, coarse] of [[390, true], [1440, false], [390, false]] as const)
        for (const dir_ of ["ltr", "rtl"]) {
            const row = await cell(browser, width, coarse, false, async (page) => {
                await open(page, H(11, `scene=o201&at=end&dir=${dir_}`), 1000);
                await page.mouse.move(2, 2);
                const natural = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width);
                const sweep: unknown[] = [];
                for (let cap = Math.ceil(natural) + 1; cap >= Math.ceil(natural) - 40; cap -= (cap > Math.ceil(natural) - 20 ? 1 : 4)) {
                    await page.evaluate((cap) => (document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = `${cap}px`), cap);
                    await frames(page, 3);
                    await page.waitForTimeout(250);
                    const rest = await plate(page);
                    let hover = null;
                    if (!coarse) {
                        const hb = await page.locator('[data-witness="home"]').boundingBox();
                        if (hb) {
                            await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
                            await page.waitForTimeout(400);
                            hover = await plate(page);
                            await page.mouse.move(2, 2);
                            await page.waitForTimeout(300);
                        }
                    }
                    // keyboard focus on the end seat (the Home trigger) and the first seat, and the run's scroll then
                    const e = await tabTo(page, '[data-witness="home"]');
                    await page.waitForTimeout(450);
                    const endRing = e ? await ringClip(page, '[data-witness="home"]') : null;
                    const endRun = (await plate(page)).run;
                    const f = await tabTo(page, '[data-witness="S1"]');
                    await page.waitForTimeout(450);
                    const firstRing = f ? await ringClip(page, '[data-witness="S1"]') : null;
                    const firstRun = (await plate(page)).run;
                    // End from the first seat (the roving machine's own reach)
                    let endKey = null;
                    if (f) {
                        await page.keyboard.press("End");
                        await page.waitForTimeout(450);
                        endKey = { at: await page.evaluate(() => document.activeElement?.closest("[data-witness]")?.getAttribute("data-witness") ?? document.activeElement?.tagName), ring: await ringClip(page, ":focus"), run: (await plate(page)).run };
                    }
                    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
                    if (endRing && endRing.worst > 0.5 && !sweep.some((x) => ((x as { endRing: { worst: number } | null }).endRing?.worst ?? 0) > 0.5)) {
                        await tabTo(page, '[data-witness="home"]');
                        await page.waitForTimeout(450);
                        const b = await page.locator(".glass-dock").boundingBox();
                        if (b) await page.screenshot({ path: `${dir()}/c12b-${width}-${coarse ? "c" : "f"}-${dir_}-cap${cap}-endfocus.png`, clip: { x: Math.max(0, b.x - 12), y: Math.max(0, b.y - 12), width: b.width + 24, height: b.height + 24 } });
                        await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
                    }
                    await page.evaluate(() => { const r = document.querySelector<HTMLElement>(".dock-layers > .dock-run.is-active"); if (r) r.scrollLeft = 0; });
                    sweep.push({ cap, rest, hover, endRing, endRun, firstRing, firstRun, endKey });
                }
                const shots = sweep.filter((x) => { const r = (x as { rest: { run: { hidden: number }; uniform: boolean } }).rest; return r.run.hidden === 0 && !r.uniform; });
                if (shots.length) {
                    const cap = (shots[0] as { cap: number }).cap;
                    await page.evaluate((cap) => (document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = `${cap}px`), cap);
                    await page.waitForTimeout(400);
                    const b = await page.locator(".glass-dock").boundingBox();
                    if (b) await page.screenshot({ path: `${dir()}/c12b-${width}-${coarse ? "c" : "f"}-${dir_}-cap${cap}.png`, clip: { x: Math.max(0, b.x - 12), y: Math.max(0, b.y - 12), width: b.width + 24, height: b.height + 24 } });
                }
                return { width, coarse, dir: dir_, natural, sweep };
            });
            rows.push(row);
        }
    bank("c12b", rows);
});

/* ── c12c · r1 a run that truly overflows; the scroll kept across collapse/expand ─────────── */
test("c12c a truly overflowing run: rest cut, end, flush; collapse and expand while scrolled", async ({ browser }) => {
    test.setTimeout(900_000);
    const rows: unknown[] = [];
    const kinds = "tab:Overview,tab:Methods,tab:Results,tab:Discussion,icon,icon,icon";
    for (const [width, coarse] of [[390, true], [1440, false]] as const)
        for (const dir_ of ["ltr", "rtl"]) {
            const row = await cell(browser, width, coarse, false, async (page) => {
                await open(page, H(10, `scene=seats&collapse=closed&maxw=260&kinds=${kinds}&dir=${dir_}`), 900);
                await page.mouse.move(2, 2);
                const ex = () => page.evaluate(() => (window as unknown as { __dock: { expand(): void } }).__dock.expand());
                const co = () => page.evaluate(() => (window as unknown as { __dock: { collapse(): void } }).__dock.collapse());
                const setSl = (v: number | "max") => page.evaluate((v) => { const r = document.querySelector<HTMLElement>(".dock-layers > .dock-run")!; const m = r.scrollWidth - r.clientWidth; r.scrollLeft = v === "max" ? (document.dir === "rtl" ? -m : m) : document.dir === "rtl" ? -v : v; }, v);
                const out: Record<string, unknown> = { width, coarse, dir: dir_ };
                out.collapsed0 = await plate(page);
                await ex();
                await page.waitForTimeout(1300);
                out.rest = await plate(page);
                await setSl("max");
                await page.waitForTimeout(600);
                out.end = await plate(page);
                await setSl(0);
                await page.waitForTimeout(600);
                out.flush = await plate(page);
                await setSl(90);
                await page.waitForTimeout(600);
                out.mid = await plate(page);
                await co();
                await page.waitForTimeout(1300);
                out.collapsedScrolled = await plate(page);
                await ex();
                await page.waitForTimeout(1300);
                out.reExpanded = await plate(page);
                await page.locator(".glass-dock").screenshot({ path: `${dir()}/c12c-${width}-${dir_}-reexpanded.png` });
                return out;
            });
            rows.push(row);
        }
    bank("c12c", rows);
});

/* ── c12d · r2 every frame of a collapse and an expand ───────────────────────────────────── */
test("c12d collapse and expand frames: corner uniformity", async ({ browser }) => {
    test.setTimeout(600_000);
    const rows: unknown[] = [];
    for (const [width, coarse] of [[390, true], [1440, false]] as const)
        for (const layers of ["0", "1"]) {
            const row = await cell(browser, width, coarse, false, async (page) => {
                await open(page, H(11, `scene=o205&collapse=closed&layers=${layers}&active=read`), 1000);
                await page.mouse.move(2, 2);
                const trace = (act: "expand" | "collapse") =>
                    page.evaluate((act) => new Promise<unknown[]>((res) => {
                        const out: unknown[] = [];
                        const t0 = performance.now();
                        (window as unknown as { __dock: Record<string, () => void> }).__dock[act]!();
                        const tick = () => {
                            const t = performance.now() - t0;
                            const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                            const pl = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                            const cs = getComputedStyle(pl);
                            const r = pl.getBoundingClientRect();
                            const rad = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
                            const n = rad.map((x) => parseFloat(x));
                            out.push({ t: Math.round(t), m: dock.hasAttribute("data-morphing"), c: dock.classList.contains("collapsed"), w: +r.width.toFixed(1), h: +r.height.toFixed(1), rad: rad.join(" "), spread: +(Math.max(...n) - Math.min(...n)).toFixed(2), pct: rad.some((x) => x.includes("%")) });
                            if (t < 1400) requestAnimationFrame(tick); else res(out);
                        };
                        requestAnimationFrame(tick);
                    }), act);
                const e = await trace("expand");
                await page.waitForTimeout(400);
                const c = await trace("collapse");
                const sum = (fr: unknown[]) => { const f = fr as { spread: number; pct: boolean; h: number }[]; return { frames: f.length, maxSpread: Math.max(...f.map((x) => x.spread)), pct: f.some((x) => x.pct), uneven: f.filter((x) => x.spread > 0.5) }; };
                return { width, coarse, layers, expand: sum(e), collapse: sum(c) };
            });
            rows.push(row);
        }
    bank("c12d", rows);
});

/* ── c12e · O-207 G3/K4 the atoms critique 11 did not walk ────────────────────────────────── */
async function contrast(page: Page, ringSel: string, focusSel: string): Promise<unknown> {
    const box = await page.evaluate((s) => { const r = document.querySelector<HTMLElement>(s)?.getBoundingClientRect(); return r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null; }, ringSel);
    if (!box) return { found: false };
    const pad = 8;
    const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.w + 2 * pad, height: box.h + 2 * pad };
    const info = await page.evaluate(([fs, rs]) => {
        const el = document.activeElement as HTMLElement;
        const ring = document.querySelector<HTMLElement>(rs)!;
        const a = getComputedStyle(el), b = getComputedStyle(ring);
        return { active: el?.matches(fs) ?? false, fv: el?.matches(":focus-visible") ?? false, focusOutline: `${a.outlineStyle} ${a.outlineWidth} ${a.outlineColor}`, focusShadow: a.boxShadow, ringOutline: `${b.outlineStyle} ${b.outlineWidth} ${b.outlineColor}`, ringShadow: b.boxShadow };
    }, [focusSel, ringSel]);
    const on = await page.screenshot({ clip });
    await page.evaluate(() => (document.activeElement as HTMLElement).blur());
    await page.waitForTimeout(300);
    const off = await page.screenshot({ clip });
    const c = await page.evaluate(async ([a, b, w, hgt, ex, ey, bw, bh]) => {
        const load = (s: string) => new Promise<ImageData>((res) => {
            const im = new Image();
            im.onload = () => { const cv = document.createElement("canvas"); cv.width = im.width; cv.height = im.height; const g = cv.getContext("2d")!; g.drawImage(im, 0, 0); res(g.getImageData(0, 0, im.width, im.height)); };
            im.src = "data:image/png;base64," + s;
        });
        const A = await load(a as string), B = await load(b as string);
        const lin = (v: number) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = (d: Uint8ClampedArray, i: number) => 0.2126 * lin(d[i]!) + 0.7152 * lin(d[i + 1]!) + 0.0722 * lin(d[i + 2]!);
        const sx = A.width / (w as number), sy = A.height / (hgt as number);
        let best = 1, changed = 0, all = 1;
        for (let y = 0; y < A.height; y++)
            for (let x = 0; x < A.width; x++) {
                const px = x / sx, py = y / sy;
                const inside = px > (ex as number) && px < (ex as number) + (bw as number) && py > (ey as number) && py < (ey as number) + (bh as number);
                const i = (y * A.width + x) * 4;
                const la = L(A.data, i), lb = L(B.data, i);
                const k = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
                all = Math.max(all, k);
                if (inside) continue;
                if (k > 1.05) changed++;
                best = Math.max(best, k);
            }
        // best: the band outside the ring-bearing box; all: the whole clip, inside included (a ring painted on a child)
        return { best: +best.toFixed(2), changed, all: +all.toFixed(2) };
    }, [on.toString("base64"), off.toString("base64"), clip.width, clip.height, box.x - clip.x, box.y - clip.y, box.w, box.h]);
    return { found: true, ...info, contrast: c };
}
test("c12e O-207 G3/K4 slider, sortable handle and sheet handle rings", async ({ browser }) => {
    test.setTimeout(600_000);
    const rows: unknown[] = [];
    for (const dark of [false, true]) {
        const row = await cell(browser, 1280, false, dark, async (page) => {
            await open(page, H(12, `scene=atoms&dark=${+dark}`), 900);
            await page.mouse.move(2, 2);
            const out: Record<string, unknown> = { dark };
            const atoms: [string, string, string][] = [
                ["slider", '[data-witness="slider"] [role="slider"]', '[data-witness="slider"] .slider-track'],
                ["spectrum", '[data-witness="spectrum"] [role="slider"]', '[data-witness="spectrum"] [role="slider"]'],
                ["sortable", '[data-witness="sortable"] .sortable-handle', '[data-witness="sortable"] .sortable-handle'],
            ];
            for (const [name, focusSel, ringSel] of atoms) {
                const ok = await tabTo(page, focusSel, 12);
                await page.waitForTimeout(300);
                out[name] = ok ? await contrast(page, ringSel, focusSel) : { found: false };
            }
            await open(page, H(12, `scene=sheet&dark=${+dark}`), 1400);
            const hs = '[data-slot="sheet-detent-handle"]';
            const ok = await tabTo(page, hs, 12);
            await page.waitForTimeout(300);
            out.sheetHandle = ok ? await contrast(page, '[data-slot="sheet-detent-grip"]', hs) : { found: false };
            return out;
        });
        rows.push(row);
    }
    bank("c12e", rows);
});
