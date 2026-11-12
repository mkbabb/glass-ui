// glass-ui 10.1.5 — critic round 8's own cells (docs/release-10.1.5/critique-8.md): attacks on fix round 8
// (M1-M4 of critique 7, the round-7 inbound cures, O-182). Harness `release-10-1-5/critic-7{,-v1014}.html`.
// Rows bank to `docs/release-10.1.5/critic-8/probe/<arm>/<project>/<cell>.json`; probes never fail on a finding.
//   c8a O-182 the dark halo band (horizontal, vertical, collapsed, collapsed-hover, overflowing, static) at 390/1440,
//       the lighter pixels located; the light arm's computed dock shadow vs v10.1.4; every shadow token's colour in dark
//   c8b M1 a collapse from a scrolled run: RTL, vertical, a layered run; the re-expand restores the cut
//   c8c M2 the vertical yield: the seats' frame trace through an expand that ends in the yield; the end seat's ring at
//       the fit edge
//   c8d M4 a layered run: rest, Tab to the last seat and back, scroll to the end
//   c8e O-177 a hover-dwell expand and a press at the stationary pointer; Escape's hand-off stays folded
//   c8f O-161 a fine pointer's hover still paints every seat kind
//   c8g O-167 a press on the thumb off its centre with no move keeps the value
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-8/probe/${ARM || "branch"}/`, import.meta.url).pathname;

function dir(): string {
    const d = `${OUT}${test.info().project.name}`;
    mkdirSync(d, { recursive: true });
    return d;
}
function bank(name: string, rows: unknown): void {
    writeFileSync(`${dir()}/${name}.json`, JSON.stringify(rows, null, 1));
}
function bankPng(name: string, buf: Buffer): void {
    writeFileSync(`${dir()}/${name}.png`, buf);
}

async function open(page: Page, q: string, arm = ARM): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-7${arm ? "-" + arm : ""}.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}

async function frame(page: Page, ms = 0): Promise<void> {
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))));
    if (ms) await page.waitForTimeout(ms);
}

function read(page: Page, tag: string) {
    return page.evaluate((tag) => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const run = dock.querySelector<HTMLElement>(".dock-run.is-active") ?? dock.querySelector<HTMLElement>(".dock-run");
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        const h = Math.min(plate.offsetWidth, plate.offsetHeight) / 2;
        const uniform = radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - h) <= 0.5);
        return {
            tag,
            collapsed: dock.classList.contains("collapsed"),
            morphing: dock.hasAttribute("data-morphing"),
            fits: dock.hasAttribute("data-run-fits"),
            plate: { w: plate.offsetWidth, h: plate.offsetHeight },
            radii,
            half: h,
            uniform,
            anims: plate.getAnimations().map((a) => (a as CSSAnimation).animationName),
            run: run && {
                sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight,
                sl: Math.round(run.scrollLeft), st: Math.round(run.scrollTop),
                pad: getComputedStyle(run).padding,
            },
        };
    }, tag);
}

const coarseOf = () => !!test.info().project.use.isMobile;

/* ── c8a · O-182 ─────────────────────────────────────────────────────────────── */

const HALO: [string, string][] = [
    ["horizontal", "collapse=false&kinds=tab:Home,icon,icon,icon"],
    ["vertical", "collapse=false&orientation=vertical&stageH=420&kinds=icon,icon,icon,icon"],
    ["collapsed", "collapse=closed&kinds=icon,icon,icon"],
    ["overflow", "collapse=false&maxw=220&kinds=" + encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,icon,tab:Settings")],
    ["static", "collapse=false&backdrop=static&kinds=tab:Home,icon,icon,icon"],
];

async function haloBand(page: Page, B = 24) {
    const pb = await page.evaluate(() => {
        const r = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
    });
    const clip = { x: pb.x - B, y: pb.y - B, width: pb.w + 2 * B, height: pb.h + 2 * B };
    const buf = await page.screenshot({ clip, scale: "css" });
    const png = PNG.sync.read(buf);
    const lum = (i: number) => 0.2126 * png.data[i]! + 0.7152 * png.data[i + 1]! + 0.0722 * png.data[i + 2]!;
    const ground = lum(0);
    let lighter = 0;
    let worst = 0;
    const where: unknown[] = [];
    // Distance bands outside the plate's box: 1 px ring (antialias), 2-4, 5-24.
    const byBand = { d1: 0, d2to4: 0, d5plus: 0 };
    for (let y = 0; y < png.height; y += 1)
        for (let x = 0; x < png.width; x += 1) {
            const dx = Math.max(B - x, x - (png.width - B - 1), 0);
            const dy = Math.max(B - y, y - (png.height - B - 1), 0);
            const d = Math.max(dx, dy);
            if (d === 0) continue;
            const v = lum((y * png.width + x) * 4) - ground;
            worst = Math.max(worst, v);
            if (v > 1.5) {
                lighter += 1;
                if (d <= 1) byBand.d1 += 1;
                else if (d <= 4) byBand.d2to4 += 1;
                else byBand.d5plus += 1;
                if (where.length < 24) where.push({ x: x - B, y: y - B, d, v: +v.toFixed(1) });
            }
        }
    return { buf, pb, ground: +ground.toFixed(2), lighter, worst: +worst.toFixed(2), byBand, where };
}

function shadowColours(page: Page) {
    return page.evaluate(() => {
        const toLum = (c: string) => {
            const cv = document.createElement("canvas");
            cv.width = cv.height = 1;
            const g = cv.getContext("2d")!;
            g.fillStyle = "#000";
            g.fillStyle = c;
            g.fillRect(0, 0, 1, 1);
            const [r, gg, b, a] = g.getImageData(0, 0, 1, 1).data;
            return { lum: +(0.2126 * r! + 0.7152 * gg! + 0.0722 * b!).toFixed(1), a: a! };
        };
        const span = document.createElement("span");
        document.body.append(span);
        const out: Record<string, unknown> = {};
        for (const t of ["--shadow-color", "--background", "--foreground"]) {
            span.style.background = `var(${t})`;
            out[t] = { css: getComputedStyle(span).backgroundColor, ...toLum(getComputedStyle(span).backgroundColor) };
        }
        // Every box/text shadow token: the colours in its computed value.
        for (const t of ["--shadow-sm", "--shadow-md", "--shadow-lg", "--shadow-xl", "--shadow-2xl", "--shadow-dock", "--shadow-dock-collapsed", "--text-shadow-sm", "--text-shadow-lg", "--blob-shadow-color"]) {
            const v = getComputedStyle(document.documentElement).getPropertyValue(t).trim();
            span.style.boxShadow = "";
            span.style.background = "";
            let cols: string[] = [];
            if (t === "--blob-shadow-color") {
                span.style.background = `var(${t})`;
                cols = [getComputedStyle(span).backgroundColor];
            } else if (t.startsWith("--text")) {
                span.style.textShadow = `var(${t})`;
                cols = getComputedStyle(span).textShadow.match(/(rgba?|color|oklab|oklch)\([^)]*\)/g) ?? [];
            } else {
                span.style.boxShadow = `var(${t})`;
                cols = getComputedStyle(span).boxShadow.match(/(rgba?|color|oklab|oklch)\([^)]*\)/g) ?? [];
            }
            // Opaque read of each colour: its own ink, alpha dropped.
            out[t] = { raw: v.slice(0, 120), cols: cols.map((c) => ({ c, lum: toLum(c.replace(/\/\s*[\d.]+\)/, ")").replace(/,\s*[\d.]+\)$/, ")").replace(/^rgba/, "rgb")).lum })) };
        }
        span.remove();
        const dock = document.querySelector<HTMLElement>(".glass-dock");
        out.dockShadow = dock && getComputedStyle(dock).boxShadow;
        return out;
    });
}

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`c8 ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

        test(`c8a halo dark ${pointer}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            for (const [name, q] of HALO)
                for (const width of [390, 1440]) {
                    for (const hover of pointer === "fine" && name === "collapsed" ? [false, true] : [false]) {
                        await page.setViewportSize({ width, height: 800 });
                        await open(page, `scene=dock&${q}&dark=1&bg=${encodeURIComponent("var(--background)")}`);
                        if (!coarseOf()) await page.mouse.move(2, 790);
                        await page.evaluate(() => {
                            const stage = document.querySelector<HTMLElement>(".glass-dock")!.parentElement!;
                            stage.style.padding = "40px";
                            stage.style.background = "var(--background)";
                        });
                        await frame(page, 500);
                        if (hover) {
                            // The collapsed dock's hover read: hold the pointer on the pill's very edge, then read
                            // the band before the dwell has expanded it (the collapsed:hover shadow).
                            const pb = (await page.locator(".glass-dock > .dock-plate").boundingBox())!;
                            await page.mouse.move(pb.x + pb.width / 2, pb.y + pb.height / 2);
                            await page.waitForTimeout(30);
                        }
                        const band = await haloBand(page);
                        const tag = `${name}-${width}${hover ? "-hover" : ""}`;
                        bankPng(`c8a-${tag}`, band.buf);
                        const st = await read(page, tag);
                        rows.push({ tag, ground: band.ground, lighter: band.lighter, worst: band.worst, byBand: band.byBand, where: band.where, plate: band.pb, collapsed: st.collapsed, radii: st.radii });
                    }
                }
            await open(page, `scene=dock&collapse=false&kinds=icon,icon&dark=1`);
            rows.push({ tag: "tokens-dark", ...(await shadowColours(page)) });
            await open(page, `scene=dock&collapse=false&kinds=icon,icon&dark=0`);
            rows.push({ tag: "tokens-light", ...(await shadowColours(page)) });
            bank(`c8a-${pointer}`, rows);
        });

        /* ── c8b · M1 ───────────────────────────────────────────────────────────── */
        test(`c8b collapse from scroll ${pointer}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            const cases: [string, string, string][] = [
                ["rtl", "dir=rtl&scene=dock&collapse=closed&maxw=220&kinds=" + encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,icon,tab:Settings"), "x"],
                ["vertical", "scene=dock&collapse=closed&orientation=vertical&stageH=300&kinds=" + encodeURIComponent("icon,icon,icon,icon,icon,icon,icon,icon,icon"), "y"],
                ["layers", "scene=layers&collapse=closed&maxw=260", "x"],
            ];
            for (const [name, q, axis] of cases)
                for (const width of [390, 1440])
                    for (const where of ["mid", "end"] as const) {
                        await page.setViewportSize({ width, height: 800 });
                        await open(page, q);
                        if (!coarseOf()) await page.mouse.move(2, 790);
                        await page.evaluate(() => (window as unknown as { __dock: { expand(): void } }).__dock.expand());
                        await page.waitForTimeout(1400);
                        const scrolled = await page.evaluate(
                            ({ axis, where }) => {
                                const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                                if (axis === "x") {
                                    const max = run.scrollWidth - run.clientWidth;
                                    // RTL scrollLeft runs negative.
                                    const sign = getComputedStyle(run).direction === "rtl" ? -1 : 1;
                                    run.scrollLeft = sign * (where === "end" ? max : Math.round(max / 2));
                                } else {
                                    const max = run.scrollHeight - run.clientHeight;
                                    run.scrollTop = where === "end" ? max : Math.round(max / 2);
                                }
                                return { sl: run.scrollLeft, st: run.scrollTop, maxX: run.scrollWidth - run.clientWidth, maxY: run.scrollHeight - run.clientHeight };
                            },
                            { axis, where },
                        );
                        await frame(page, 300);
                        const expandedScrolled = await read(page, `${name}-${width}-${where}-scrolled`);
                        // Frames through the collapse.
                        const fr = page.evaluate(
                            () =>
                                new Promise<unknown[]>((res) => {
                                    const out: unknown[] = [];
                                    const t0 = performance.now();
                                    const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                                    const tick = () => {
                                        const cs = getComputedStyle(plate);
                                        const h = Math.min(plate.offsetWidth, plate.offsetHeight) / 2;
                                        const r = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
                                        out.push({ t: Math.round(performance.now() - t0), w: plate.offsetWidth, h: plate.offsetHeight, r, uni: r.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - h) <= 0.5), collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed") });
                                        if (performance.now() - t0 < 1500) requestAnimationFrame(tick);
                                        else res(out);
                                    };
                                    requestAnimationFrame(tick);
                                }),
                        );
                        await page.evaluate(() => (window as unknown as { __dock: { collapse(): void } }).__dock.collapse());
                        const frames = (await fr) as { uni: boolean; collapsed: boolean; r: string[]; t: number }[];
                        await page.waitForTimeout(400);
                        const collapsed = await read(page, `${name}-${width}-${where}-collapsed`);
                        // Re-expand: the cut follows the scroll position again.
                        await page.evaluate(() => (window as unknown as { __dock: { expand(): void } }).__dock.expand());
                        await page.waitForTimeout(1400);
                        const reexpanded = await read(page, `${name}-${width}-${where}-reexpanded`);
                        const collapsedFrames = frames.filter((f) => f.collapsed);
                        rows.push({
                            name, width, where, scrolled, expandedScrolled, collapsed, reexpanded,
                            framesCollapsed: collapsedFrames.length,
                            nonUniformCollapsedFrames: collapsedFrames.filter((f) => !f.uni).map((f) => ({ t: f.t, r: f.r })).slice(0, 12),
                        });
                    }
            bank(`c8b-${pointer}`, rows);
        });

        /* ── c8c · M2 ───────────────────────────────────────────────────────────── */
        test(`c8c vertical yield ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            // (1) An expand that ends in a fitting vertical run: the seats' frame trace across the settle.
            for (const stageH of [340, 420, 600]) {
                await open(page, `scene=dock&collapse=closed&orientation=vertical&stageH=${stageH}&kinds=icon,icon,icon,icon,icon,icon`);
                if (!coarseOf()) await page.mouse.move(2, 790);
                const fr = page.evaluate(
                    () =>
                        new Promise<unknown[]>((res) => {
                            const out: unknown[] = [];
                            const t0 = performance.now();
                            const tick = () => {
                                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                                const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]');
                                const s6 = document.querySelector<HTMLElement>('[data-witness="S6"]');
                                const run = dock.querySelector<HTMLElement>(".dock-run.is-active");
                                const a = s1?.getBoundingClientRect();
                                const b = s6?.getBoundingClientRect();
                                out.push({
                                    t: Math.round(performance.now() - t0),
                                    morphing: dock.hasAttribute("data-morphing"),
                                    fits: dock.hasAttribute("data-run-fits"),
                                    s1: a && +a.top.toFixed(2),
                                    s6: b && +b.bottom.toFixed(2),
                                    pad: run && getComputedStyle(run).paddingTop,
                                    st: run && run.scrollTop,
                                });
                                if (performance.now() - t0 < 2200) requestAnimationFrame(tick);
                                else res(out);
                            };
                            requestAnimationFrame(tick);
                        }),
                );
                await page.evaluate(() => (window as unknown as { __dock: { expand(): void } }).__dock.expand());
                const frames = (await fr) as { t: number; morphing: boolean; s1?: number; pad?: string }[];
                // The largest step of S1 between consecutive frames after the morph ended.
                let settleStep = 0;
                let at = -1;
                for (let i = 1; i < frames.length; i += 1) {
                    if (frames[i]!.morphing || frames[i - 1]!.morphing) continue;
                    const d = Math.abs((frames[i]!.s1 ?? 0) - (frames[i - 1]!.s1 ?? 0));
                    if (d > settleStep) {
                        settleStep = d;
                        at = frames[i]!.t;
                    }
                }
                // The step across the morph's last frame.
                const lastM = frames.findLastIndex((f) => f.morphing);
                const edge = lastM >= 0 && lastM + 1 < frames.length ? { before: frames[lastM], after: frames[lastM + 1] } : null;
                rows.push({ cell: "expand-trace", stageH, settleStep: +settleStep.toFixed(2), at, edge, end: frames.at(-1) });
            }
            // (2) The end seat's ring at the fit edge: the last seat keyboard-focused, its outline vs the run's clip.
            for (let stageH = 300; stageH <= 372; stageH += 4) {
                await open(page, `scene=dock&orientation=vertical&stageH=${stageH}&kinds=icon,icon,icon,icon,icon,icon`);
                if (!coarseOf()) await page.mouse.move(2, 790);
                await page.keyboard.press("Tab");
                await page.evaluate(() => document.querySelector<HTMLElement>('[data-witness="S6"]')!.focus());
                await frame(page, 300);
                const r = await page.evaluate(() => {
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    const run = dock.querySelector<HTMLElement>(".dock-run.is-active")!;
                    const s = document.querySelector<HTMLElement>('[data-witness="S6"]')!;
                    const cs = getComputedStyle(s);
                    const ow = Number.parseFloat(cs.outlineWidth) || 0;
                    const oo = Number.parseFloat(cs.outlineOffset) || 0;
                    const sr = s.getBoundingClientRect();
                    const rr = run.getBoundingClientRect();
                    const rcs = getComputedStyle(run);
                    const clipBottom = rr.bottom - Number.parseFloat(rcs.borderBottomWidth);
                    const ringBottom = sr.bottom + oo + ow;
                    return {
                        fits: dock.hasAttribute("data-run-fits"),
                        sh: run.scrollHeight, ch: run.clientHeight, st: run.scrollTop,
                        pad: rcs.paddingBottom,
                        focusVisible: s.matches(":focus-visible"),
                        ringBottom: +ringBottom.toFixed(2), clipBottom: +clipBottom.toFixed(2),
                        ringCut: +Math.max(0, ringBottom - clipBottom).toFixed(2),
                    };
                });
                rows.push({ cell: "end-ring", stageH, ...r });
            }
            bank(`c8c-${pointer}`, rows);
        });

        /* ── c8d · M4 ───────────────────────────────────────────────────────────── */
        test(`c8d layered run ${pointer}`, async ({ page }) => {
            test.setTimeout(180_000);
            const rows: unknown[] = [];
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=layers&collapse=false&maxw=260");
                if (!coarseOf()) await page.mouse.move(2, 790);
                rows.push(await read(page, `${width}-rest`));
                // Keyboard: Tab to the first seat, then on to the last.
                await page.keyboard.press("Tab");
                await frame(page, 300);
                rows.push({ ...(await read(page, `${width}-tab1`)), focus: await page.evaluate(() => (document.activeElement as HTMLElement)?.dataset?.witness) });
                for (let i = 0; i < 8; i += 1) await page.keyboard.press("Tab");
                await frame(page, 500);
                const last = await page.evaluate(() => {
                    const a = document.activeElement as HTMLElement;
                    const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                    const ar = a.getBoundingClientRect();
                    const rr = run.getBoundingClientRect();
                    const cs = getComputedStyle(a);
                    const ring = (Number.parseFloat(cs.outlineWidth) || 0) + (Number.parseFloat(cs.outlineOffset) || 0);
                    return { focus: a.dataset.witness, cutRight: +Math.max(0, ar.right + ring - rr.right).toFixed(2), cutLeft: +Math.max(0, rr.left - (ar.left - ring)).toFixed(2) };
                });
                rows.push({ ...(await read(page, `${width}-tablast`)), last });
                for (let i = 0; i < 8; i += 1) await page.keyboard.press("Shift+Tab");
                await frame(page, 500);
                rows.push({ ...(await read(page, `${width}-tabback`)), focus: await page.evaluate(() => (document.activeElement as HTMLElement)?.dataset?.witness) });
                // Programmatic end.
                await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                    run.scrollLeft = run.scrollWidth;
                });
                await frame(page, 600);
                rows.push(await read(page, `${width}-end`));
            }
            bank(`c8d-${pointer}`, rows);
        });

        /* ── c8e · O-177 ────────────────────────────────────────────────────────── */
        test(`c8e press after a hover-dwell expand ${pointer}`, async ({ page }) => {
            test.setTimeout(180_000);
            await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            if (!coarseOf()) {
                // The hover dwell expands the dock under a pointer that rests on the pill; the press lands where the
                // pointer now stands (over whatever seat slid under it), at 0..480 ms into the expand.
                for (const delay of [0, 100, 240, 480, 900]) {
                    await open(page, "scene=dock&collapse=closed&kinds=icon,icon,icon,icon");
                    await page.mouse.move(2, 790);
                    const sum = (await page.locator(".dock-layer--summary").boundingBox())!;
                    await page.mouse.move(sum.x + sum.width / 2, sum.y + sum.height / 2, { steps: 4 });
                    // Wait for the flip.
                    await page.waitForFunction(() => document.querySelector(".glass-dock")!.classList.contains("expanded"), null, { timeout: 3000 }).catch(() => {});
                    await page.waitForTimeout(delay);
                    const st = await page.evaluate(({ x, y }) => {
                        const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-witness]");
                        return { under: el?.dataset.witness ?? null, morphing: document.querySelector(".glass-dock")!.hasAttribute("data-morphing") };
                    }, { x: sum.x + sum.width / 2, y: sum.y + sum.height / 2 });
                    await page.mouse.down();
                    await page.mouse.up();
                    await page.waitForTimeout(1500);
                    const clicks = await page.evaluate(() => ({ ...(window as unknown as { __clicks: Record<string, number> }).__clicks }));
                    rows.push({ cell: "dwell-stationary", delay, ...st, clicks });
                }
                // The same, with the pointer moved 10 px between the flip and the press (a re-aim).
                for (const delay of [0, 100, 240]) {
                    await open(page, "scene=dock&collapse=closed&kinds=icon,icon,icon,icon");
                    await page.mouse.move(2, 790);
                    const sum = (await page.locator(".dock-layer--summary").boundingBox())!;
                    await page.mouse.move(sum.x + sum.width / 2, sum.y + sum.height / 2, { steps: 4 });
                    await page.waitForFunction(() => document.querySelector(".glass-dock")!.classList.contains("expanded"), null, { timeout: 3000 }).catch(() => {});
                    await page.waitForTimeout(delay);
                    const to = await page.evaluate(() => {
                        const r = document.querySelector<HTMLElement>('[data-witness="S2"]')!.getBoundingClientRect();
                        return { x: r.left + r.width / 2, y: r.top + r.height / 2, morphing: document.querySelector(".glass-dock")!.hasAttribute("data-morphing") };
                    });
                    await page.mouse.move(to.x, to.y);
                    await page.mouse.down();
                    await page.mouse.up();
                    await page.waitForTimeout(1500);
                    const clicks = await page.evaluate(() => ({ ...(window as unknown as { __clicks: Record<string, number> }).__clicks }));
                    rows.push({ cell: "dwell-reaim-S2", delay, morphing: to.morphing, clicks });
                }
            }
            // Keyboard: Enter expands, Escape folds and hands focus to the summary: the dock stays folded.
            await open(page, "scene=dock&collapse=closed&kinds=icon,icon,icon,icon");
            if (!coarseOf()) await page.mouse.move(2, 790);
            await page.keyboard.press("Tab");
            await page.waitForTimeout(1500);
            const afterTab = await page.evaluate(() => ({ collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed"), focus: (document.activeElement as HTMLElement)?.dataset?.witness ?? document.activeElement?.className }));
            await page.keyboard.press("Escape");
            await page.waitForTimeout(400);
            const afterEsc = await page.evaluate(() => ({ collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed"), summaryFocused: document.activeElement?.classList.contains("dock-layer--summary") ?? false }));
            await page.waitForTimeout(1500);
            const afterEsc15 = await page.evaluate(() => ({ collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed"), summaryFocused: document.activeElement?.classList.contains("dock-layer--summary") ?? false }));
            // Shift+Tab away and Tab back: the reach reopens it.
            await page.keyboard.press("Shift+Tab");
            await page.waitForTimeout(300);
            await page.keyboard.press("Tab");
            await page.waitForTimeout(1500);
            const tabBack = await page.evaluate(() => ({ collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed"), focus: (document.activeElement as HTMLElement)?.dataset?.witness ?? document.activeElement?.className }));
            rows.push({ cell: "kbd", afterTab, afterEsc, afterEsc15, tabBack });
            bank(`c8e-${pointer}`, rows);
        });

        /* ── c8f · O-161 ────────────────────────────────────────────────────────── */
        test(`c8f hover paints ${pointer}`, async ({ page }) => {
            test.setTimeout(120_000);
            if (coarseOf()) test.skip();
            await page.setViewportSize({ width: 1440, height: 800 });
            await open(page, `scene=dock&collapse=false&kinds=${encodeURIComponent("tab:Home,icon,ctl:Search,dmt")}`);
            await page.mouse.move(2, 790);
            await frame(page, 400);
            const paint = (id: string) =>
                page.evaluate((id) => {
                    const el = document.querySelector<HTMLElement>(`[data-witness="${id}"]`)!;
                    const cs = getComputedStyle(el);
                    return { scale: cs.scale, transform: cs.transform, bg: cs.backgroundColor, opacity: cs.opacity, hover: el.matches(":hover") };
                }, id);
            const rows: unknown[] = [];
            for (const id of ["S1", "S2", "S3", "S4"]) {
                const rest = await paint(id);
                const b = (await page.locator(`[data-witness="${id}"]`).boundingBox())!;
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                await page.waitForTimeout(500);
                const hov = await paint(id);
                await page.mouse.move(2, 790);
                await page.waitForTimeout(500);
                rows.push({ id, rest, hov, changed: JSON.stringify(rest) !== JSON.stringify({ ...hov, hover: false }) });
            }
            bank(`c8f-${pointer}`, rows);
        });

        /* ── c8g · O-167 ────────────────────────────────────────────────────────── */
        test(`c8g thumb press off centre ${pointer}`, async ({ page }) => {
            test.setTimeout(120_000);
            await page.setViewportSize({ width: 1440, height: 800 });
            const kinds = encodeURIComponent("tab:Home,sep,slider,icon,dmt");
            const rows: unknown[] = [];
            for (const off of [-6, -3, 3, 6]) {
                await open(page, `scene=dock&backdrop=static&collapse=false&dark=0&step=1&kinds=${kinds}`);
                if (!coarseOf()) await page.mouse.move(2, 790);
                const th = (await page.locator(".slider-thumb").boundingBox())!;
                const before = await page.evaluate(() => (window as unknown as { __time: { value: number[] } }).__time.value[0]);
                const x = th.x + th.width / 2 + off;
                const y = th.y + th.height / 2;
                if (coarseOf()) await page.touchscreen.tap(x, y);
                else {
                    await page.mouse.move(x, y);
                    await page.mouse.down();
                    await page.waitForTimeout(80);
                    await page.mouse.up();
                }
                await page.waitForTimeout(400);
                const after = await page.evaluate(() => (window as unknown as { __time: { value: number[] } }).__time.value[0]);
                const th2 = (await page.locator(".slider-thumb").boundingBox())!;
                rows.push({ off, before, after, thumbMoved: +(th2.x - th.x).toFixed(2), thumbW: +th.width.toFixed(2) });
            }
            bank(`c8g-${pointer}`, rows);
        });

        /* ── c8h · the horizontal fit edge: the end seats' keyboard ring as the reserve yields ── */
        test(`c8h horizontal fit-edge ring ${pointer}`, async ({ page }) => {
            test.setTimeout(240_000);
            await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            await open(page, `scene=dock&collapse=false&kinds=${encodeURIComponent("tab:Home,icon,icon,icon,icon")}`);
            await page.mouse.move(2, 790);
            const W = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width);
            await page.keyboard.press("Tab");
            for (let cap = Math.floor(W) - 16; cap <= Math.ceil(W) + 4; cap += 1)
                for (const id of ["S1", "S5"]) {
                    const r = await page.evaluate(
                        async ({ cap, id }) => {
                            const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                            dock.style.maxInlineSize = `${cap}px`;
                            const s = document.querySelector<HTMLElement>(`[data-witness="${id}"]`)!;
                            s.focus();
                            await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 250))));
                            const run = dock.querySelector<HTMLElement>(".dock-run.is-active")!;
                            const cs = getComputedStyle(s);
                            const ring = (Number.parseFloat(cs.outlineWidth) || 0) + (Number.parseFloat(cs.outlineOffset) || 0);
                            const sr = s.getBoundingClientRect();
                            const rr = run.getBoundingClientRect();
                            return {
                                cap, id, fits: dock.hasAttribute("data-run-fits"), sw: run.scrollWidth, cw: run.clientWidth, sl: Math.round(run.scrollLeft),
                                fv: s.matches(":focus-visible"), pad: getComputedStyle(run).paddingInline,
                                cutL: +Math.max(0, rr.left - (sr.left - ring)).toFixed(2), cutR: +Math.max(0, sr.right + ring - rr.right).toFixed(2),
                            };
                        },
                        { cap, id },
                    );
                    rows.push(r);
                }
            bank(`c8h-${pointer}`, rows);
        });
    });
}

/* The light arm vs v10.1.4: the dock's computed shadow stack and every shadow token, light mode (a patch moves no
   light value). Runs both harnesses in one page. */
test("c8a light vs v10.1.4", async ({ page }) => {
    test.setTimeout(120_000);
    const rows: unknown[] = [];
    for (const arm of ["", "v1014"]) {
        for (const q of ["scene=dock&collapse=false&kinds=icon,icon&dark=0", "scene=dock&collapse=closed&kinds=icon,icon&dark=0"]) {
            await open(page, q, arm);
            await page.mouse.move(2, 790);
            await frame(page, 400);
            rows.push({ arm: arm || "branch", q, ...(await shadowColours(page)) });
        }
    }
    bank("c8a-light-vs-v1014", rows);
});
