// glass-ui 10.1.5 — critic round 10's own cells (docs/release-10.1.5/critique-10.md). Harness
// `release-10-1-5/critic-10{,-v1014}.html` (`CRITIC_ARM=v1014` reads v10.1.4's tree). Rows bank to
// `docs/release-10.1.5/critic-10/probe/<arm>/<project>/<cell>.json`; probes never fail on a finding.
//   c10a O-193: daraksha's prod geometry (a fit-content collapse=false dock of four seats, text tabs or
//        shape="icon", beside a second plate), hovered seat by seat, light and dark, 390 and 1440
//   c10b fix 9's endpoint band: a host change of 1-3 px mid-expand that crosses the fit edge, on both axes,
//        and a host that narrows the dock 1 px per frame through the expand
//   c10c O-187's cure on other shapes: a nested group holding the current seat, a nested group in a
//        vertical dock, in RTL, at 320
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-10/probe/${ARM || "branch"}/`, import.meta.url).pathname;

function bank(name: string, rows: unknown): void {
    const d = `${OUT}${test.info().project.name}`;
    mkdirSync(d, { recursive: true });
    writeFileSync(`${d}/${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-10${ARM ? "-" + ARM : ""}.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}

async function settle(page: Page, ms = 300): Promise<void> {
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))));
    await page.waitForTimeout(ms);
}

/** Every dock's plate corners, its half cross extent, and its active run's scroll extents. */
function plates(page: Page) {
    return page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>(".glass-dock")].map((dock) => {
            const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
            const cs = getComputedStyle(plate);
            const run = dock.querySelector<HTMLElement>(":scope .dock-layers > .dock-run.is-active");
            const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
            const half = Math.min(plate.offsetWidth, plate.offsetHeight) / 2;
            return {
                dock: dock.dataset.witness ?? "",
                w: plate.offsetWidth, h: plate.offsetHeight, half, radii,
                uniform: radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - half) <= 0.5),
                pct: radii.some((x) => x.includes("%")),
                fits: dock.hasAttribute("data-run-fits"),
                sw: run?.scrollWidth, cw: run?.clientWidth, sl: run ? Math.round(run.scrollLeft) : null,
                anims: plate.getAnimations().map((a) => (a as CSSAnimation).animationName),
            };
        }),
    );
}

/* ── c10a · O-193 daraksha ──────────────────────────────────────────────────────────── */
test("c10a O-193 daraksha hover, light and dark, text and icon seats", async ({ page }) => {
    test.setTimeout(600_000);
    const rows: unknown[] = [];
    for (const width of [1440, 390])
        for (const dark of [0, 1])
            for (const shape of ["tab", "icon"])
                for (const backdrop of ["", "static"]) {
                    await page.setViewportSize({ width, height: 800 });
                    await open(page, `scene=daraksha&dark=${dark}&shape=${shape}${backdrop ? "&backdrop=static" : ""}`);
                    await page.mouse.move(2, 790);
                    await settle(page, 300);
                    const cell = { width, dark, shape, backdrop };
                    rows.push({ ...cell, at: "rest", plates: await plates(page) });
                    for (const id of ["S1", "S2", "S3", "S4", "C1", "C2", "C3"]) {
                        const b = await page.locator(`[data-witness="${id}"]`).boundingBox();
                        if (!b) continue;
                        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
                        for (const ms of [150, 700]) {
                            await page.waitForTimeout(ms === 150 ? 150 : 550);
                            rows.push({ ...cell, at: `hover ${id} +${ms}`, plates: await plates(page) });
                        }
                    }
                }
    bank("c10a", rows);
});

/* ── c10b · fix 9's endpoint band at the fit edge ───────────────────────────────────── */
type Frame = { t: number; m: boolean; fits: boolean; s1: number; pw: number; ph: number; pad: string; sl: number; st: number; sw: number; cw: number; sh: number; ch: number; r: string };

function trace(page: Page, ms: number, plan: [number, string][]): Promise<Frame[]> {
    return page.evaluate(
        ({ ms, plan }) =>
            new Promise<Frame[]>((res) => {
                const out: Frame[] = [];
                const t0 = performance.now();
                const todo = [...plan];
                const act = (a: string) => {
                    const w = window as unknown as { __dock: { expand(): void; collapse(): void } };
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    if (a === "expand") w.__dock.expand();
                    else if (a === "collapse") w.__dock.collapse();
                    else if (a.startsWith("stage:"))
                        document.querySelector<HTMLElement>('[data-witness="stage"]')!.style.blockSize = a.slice(6) + "px";
                    else if (a.startsWith("maxw:")) dock.style.maxInlineSize = a.slice(5) === "none" ? "" : a.slice(5) + "px";
                };
                const tick = () => {
                    const t = performance.now() - t0;
                    while (todo.length && todo[0]![0] <= t) act(todo.shift()![1]);
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                    const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run")!;
                    const v = dock.classList.contains("vertical");
                    const a = document.querySelector<HTMLElement>('[data-witness="S1"]')!.getBoundingClientRect();
                    const pcs = getComputedStyle(plate);
                    out.push({
                        t: Math.round(t), m: dock.hasAttribute("data-morphing"), fits: dock.hasAttribute("data-run-fits"),
                        // S1 net of the run's scroll, so WebKit's re-snap (P3) does not enter.
                        s1: +((v ? a.top + run.scrollTop : a.left + run.scrollLeft)).toFixed(2),
                        pw: plate.offsetWidth, ph: plate.offsetHeight, pad: getComputedStyle(run).padding,
                        sl: Math.round(run.scrollLeft), st: Math.round(run.scrollTop),
                        sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight,
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

/** The step of S1 and of the plate between the last morph frame and the settle, and the rest truth. */
function settleStep(fr: Frame[], vertical: boolean) {
    const i = fr.findIndex((f, k) => k > 0 && fr[k - 1]!.m && !f.m);
    const p = i > 0 ? fr[i - 1]! : null;
    const c = i > 0 ? fr[i]! : null;
    const end = fr.at(-1)!;
    return {
        settleAt: i,
        dS1: p && c ? +Math.abs(c.s1 - p.s1).toFixed(2) : null,
        dPlate: p && c ? (vertical ? c.ph - p.ph : c.pw - p.pw) : null,
        around: fr.slice(Math.max(0, i - 3), i + 3).map((f) => ({ t: f.t, m: f.m, fits: f.fits, s1: f.s1, pw: f.pw, ph: f.ph, pad: f.pad, sw: f.sw, cw: f.cw, sh: f.sh, ch: f.ch, r: f.r })),
        end: { fits: end.fits, over: vertical ? end.sh > end.ch : end.sw > end.cw, pad: end.pad, r: end.r, pw: end.pw, ph: end.ph },
        flags: fr.reduce<[number, boolean, boolean][]>((acc, f) => {
            if (!acc.length || acc.at(-1)![1] !== f.fits) acc.push([f.t, f.fits, f.m]);
            return acc;
        }, []),
    };
}

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`c10b ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
        test(`c10b endpoint band at the fit edge ${pointer}`, async ({ page }) => {
            test.setTimeout(600_000);
            if (pointer === "fine") await page.setViewportSize({ width: 1440, height: 800 });
            const park = async () => {
                if (pointer === "fine") await page.mouse.move(2, 790);
            };
            const rows: unknown[] = [];
            const H = `scene=seats&collapse=closed&kinds=${encodeURIComponent("tab:Home,icon,icon,icon")}`;
            // Horizontal: find the fit edge E at rest expanded (the smallest max-inline-size with fits).
            await open(page, H);
            await park();
            await trace(page, 1300, [[30, "expand"]]);
            const sweep = await page.evaluate(async () => {
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                dock.style.maxInlineSize = "";
                await new Promise((r) => setTimeout(r, 200));
                const W = plate.offsetWidth;
                const out: [number, boolean][] = [];
                for (let m = W; m >= W - 40; m -= 1) {
                    dock.style.maxInlineSize = m + "px";
                    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    await new Promise((r) => setTimeout(r, 60));
                    out.push([m, dock.hasAttribute("data-run-fits")]);
                }
                dock.style.maxInlineSize = "";
                return { W, out };
            });
            const fitsAt = sweep.out.filter(([, f]) => f).map(([m]) => m);
            const E = Math.min(...fitsAt);
            rows.push({ axis: "horizontal", W: sweep.W, E, sweep: sweep.out });
            for (const [from, to] of [[E, E - 1], [E, E - 2], [E, E - 3], [E + 1, E - 1], [E - 1, E + 1], [E - 2, E], [E + 2, E - 2]] as const)
                for (const at of [110, 300]) {
                    await open(page, H);
                    await park();
                    await trace(page, 60, [[0, `maxw:${from}`]]);
                    const fr = await trace(page, 1700, [[30, "expand"], [at, `maxw:${to}`]]);
                    rows.push({ axis: "horizontal", from, to, at, ...settleStep(fr, false) });
                }
            // The host narrows the dock 1 px a frame through the expand (W to W-24 from 110 ms).
            {
                await open(page, H);
                await park();
                const plan: [number, string][] = [[30, "expand"]];
                for (let k = 1; k <= 24; k += 1) plan.push([110 + 16 * k, `maxw:${sweep.W - k}`]);
                const fr = await trace(page, 1800, plan);
                rows.push({ axis: "horizontal", ramp: `${sweep.W}->${sweep.W - 24}`, ...settleStep(fr, false) });
            }
            // Vertical: six icon seats; find the stage block size where the run stops fitting.
            const V = (h: number) => `scene=seats&collapse=closed&orientation=vertical&stageH=${h}&kinds=icon,icon,icon,icon,icon,icon`;
            await open(page, V(600));
            await park();
            await trace(page, 1300, [[30, "expand"]]);
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
            const Ev = Math.min(...vs.filter(([, f]) => f).map(([s]) => s));
            rows.push({ axis: "vertical", Ev, sweep: vs });
            for (const [from, to] of [[Ev, Ev - 1], [Ev, Ev - 2], [Ev - 1, Ev + 1], [Ev + 6, Ev + 4]] as const)
                for (const at of [110, 300]) {
                    await open(page, V(from));
                    await park();
                    const fr = await trace(page, 1700, [[30, "expand"], [at, `stage:${to}`]]);
                    rows.push({ axis: "vertical", from, to, at, ...settleStep(fr, true) });
                }
            bank(`c10b-${pointer}`, rows);
        });
    });
}

/* ── c10c · a consumer's nested .dock-run on other shapes ───────────────────────────── */
function nestRead(page: Page) {
    return page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const pcs = getComputedStyle(plate);
        const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run.is-active")!;
        const nest = dock.querySelector<HTMLElement>('[data-witness="nest"]');
        const v = dock.classList.contains("vertical");
        const box = (el: Element) => {
            const r = el.getBoundingClientRect();
            return [+r.left.toFixed(1), +r.top.toFixed(1), +r.right.toFixed(1), +r.bottom.toFixed(1)];
        };
        const seats = [...dock.querySelectorAll<HTMLElement>('[data-witness^="S"]')].map((s) => ({ id: s.dataset.witness, box: box(s), inNest: !!nest?.contains(s), scale: getComputedStyle(s).scale }));
        // Seats that paint over one another (layout boxes intersecting by more than 1 px on the main axis).
        const overlaps: string[] = [];
        for (let i = 0; i < seats.length; i += 1)
            for (let j = i + 1; j < seats.length; j += 1) {
                const a = seats[i]!.box, b = seats[j]!.box;
                const ov = v ? Math.min(a[3]!, b[3]!) - Math.max(a[1]!, b[1]!) : Math.min(a[2]!, b[2]!) - Math.max(a[0]!, b[0]!);
                const cross = v ? Math.min(a[2]!, b[2]!) - Math.max(a[0]!, b[0]!) : Math.min(a[3]!, b[3]!) - Math.max(a[1]!, b[1]!);
                if (ov > 1 && cross > 1) overlaps.push(`${seats[i]!.id}/${seats[j]!.id} ${ov.toFixed(1)}`);
            }
        const ncs = nest ? getComputedStyle(nest) : null;
        return {
            radii: [pcs.borderTopLeftRadius, pcs.borderTopRightRadius, pcs.borderBottomRightRadius, pcs.borderBottomLeftRadius],
            half: Math.min(plate.offsetWidth, plate.offsetHeight) / 2,
            plate: [plate.offsetWidth, plate.offsetHeight],
            fits: dock.hasAttribute("data-run-fits"),
            run: { sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight, box: box(run) },
            nest: nest && ncs ? { box: box(nest), overflow: `${ncs.overflowX}/${ncs.overflowY}`, inline: ncs.inlineSize, sw: nest.scrollWidth, cw: nest.clientWidth, tl: ncs.scrollTimelineName, pad: ncs.padding } : null,
            timelines: [...dock.querySelectorAll<HTMLElement>("*")].filter((el) => /--dock-run\b/.test(getComputedStyle(el).scrollTimelineName)).map((el) => el.className),
            seats, overlaps,
        };
    });
}

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`c10c ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
        test(`c10c nested run shapes ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            const rows: unknown[] = [];
            const tabs = encodeURIComponent("tab:Overview,tab:Methods,tab:Results,icon,icon");
            const small = encodeURIComponent("tab:Data,tab:Notes,icon,icon");
            const cells: [number, string][] = pointer === "fine"
                ? [
                      [1440, `scene=seats&nest=1&current=1&kinds=${tabs}`],
                      [1440, `scene=seats&nest=1&current=2&kinds=${tabs}`],
                      [1440, `scene=seats&nest=1&current=4&kinds=${tabs}`],
                      [1440, `scene=seats&nest=1&kinds=${tabs}&dir=rtl`],
                      [1440, `scene=seats&nest=1&current=1&kinds=${tabs}&dir=rtl`],
                      [1440, `scene=seats&nest=1&orientation=vertical&kinds=${small}`],
                      [1440, `scene=seats&nest=1&orientation=vertical&current=1&kinds=${small}`],
                      [1440, `scene=seats&nest=1&nestonly=1&kinds=${tabs}&backdrop=static`],
                  ]
                : [
                      [390, `scene=seats&nest=1&current=1&kinds=${small}`],
                      [390, `scene=seats&nest=1&kinds=${small}`],
                      [320, `scene=seats&nest=1&kinds=${tabs}`],
                      [320, `scene=seats&nest=1&kinds=${tabs}&dir=rtl`],
                  ];
            for (const [width, q] of cells) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, q);
                if (pointer === "fine") await page.mouse.move(2, 790);
                await settle(page, 300);
                const restRead = await nestRead(page);
                const hovers: unknown[] = [];
                if (pointer === "fine") {
                    const n = await page.locator('[data-witness^="S"]').count();
                    for (let i = 1; i <= n; i += 1) {
                        const b = await page.locator(`[data-witness="S${i}"]`).boundingBox();
                        if (!b) continue;
                        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 });
                        await page.waitForTimeout(650);
                        const r = await nestRead(page);
                        hovers.push({ S: i, radii: r.radii, half: r.half, run: r.run, overlaps: r.overlaps, seat: r.seats[i - 1] });
                    }
                }
                rows.push({ width, q, rest: restRead, hovers });
            }
            bank(`c10c-${pointer}`, rows);
        });
    });
}

/* ── c10d · a nested group holding the current seat: what paints, and what a press hits ─────────── */
test("c10d nested group with the current seat: paint and hit", async ({ page }) => {
    test.setTimeout(120_000);
    const rows: unknown[] = [];
    for (const [width, kinds] of [[1440, "tab:Overview,tab:Methods,tab:Results,icon,icon"], [390, "tab:Data,tab:Notes,icon,icon"]] as const) {
        await page.setViewportSize({ width, height: 400 });
        await open(page, `scene=seats&nest=1&current=1&kinds=${encodeURIComponent(kinds)}`);
        await page.mouse.move(2, 390);
        await settle(page, 400);
        const d = `${OUT}${test.info().project.name}`;
        mkdirSync(d, { recursive: true });
        await page.locator(".glass-dock").screenshot({ path: `${d}/c10d-${width}.png` });
        rows.push({
            width,
            ...(await page.evaluate(() => {
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const nest = dock.querySelector<HTMLElement>('[data-witness="nest"]')!;
                const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run")!;
                const nb = nest.getBoundingClientRect();
                const hits = [...dock.querySelectorAll<HTMLElement>('[data-witness^="S"]')].map((s) => {
                    const r = s.getBoundingClientRect();
                    const x = r.left + r.width / 2, y = r.top + r.height / 2;
                    const hit = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-witness^="S"]');
                    return { id: s.dataset.witness, inNest: nest.contains(s), box: [Math.round(r.left), Math.round(r.right)], centreHits: hit?.dataset.witness ?? null };
                });
                const cs = getComputedStyle(nest);
                return { nest: [Math.round(nb.left), Math.round(nb.right)], overflow: cs.overflowX, run: { sw: run.scrollWidth, cw: run.clientWidth }, fits: dock.hasAttribute("data-run-fits"), hits };
            })),
        });
    }
    bank("c10d", rows);
});
