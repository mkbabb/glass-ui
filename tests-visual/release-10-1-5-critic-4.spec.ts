// glass-ui 10.1.5 — critic round 4 probes (docs/release-10.1.5/critique-4.md; critic-2's cells re-run on the tip plus round 4's). Reads layout
// and computed style on `release-10-1-5/critic-2.html` and banks every row to
// `docs/release-10.1.5/critic-4/<project>/<cell>.json`. Probes never fail on a finding:
// each cell asserts only that it read something, and the verdict is in the rows.
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-4/${ARM ? ARM + "/" : ""}`, import.meta.url).pathname;

function bank(name: string, rows: unknown): void {
    const dir = `${OUT}${test.info().project.name}`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-4${ARM ? "-" + ARM : ""}.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}

/** Plate corners, the active run's reach, and every focused/hovered seat's ring box
 *  against every clipping ancestor up to the dock root. */
function read(page: Page, tag: string) {
    return page.evaluate((tag) => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const pr = plate.getBoundingClientRect();
        const run = dock.querySelector<HTMLElement>(".dock-run.is-active") ?? dock.querySelector<HTMLElement>(".dock-run");
        const seats = [...dock.querySelectorAll<HTMLElement>("[data-witness]")].map((el) => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            const focus = el.matches(":focus-visible");
            const ringW = focus ? Number.parseFloat(s.outlineWidth) + Number.parseFloat(s.outlineOffset) : 0;
            // the seat's own scale (its rect is already scaled); the ring scales with it
            const k = el.offsetWidth ? r.width / el.offsetWidth : 1;
            const ink = { l: r.left - ringW * k, t: r.top - ringW * k, r: r.right + ringW * k, b: r.bottom + ringW * k };
            const clips: Record<string, number>[] = [];
            for (let a = el.parentElement; a && a !== dock.parentElement; a = a.parentElement) {
                const as = getComputedStyle(a);
                if (as.overflowX === "visible" && as.overflowY === "visible" && as.clipPath === "none") continue;
                const ar = a.getBoundingClientRect();
                const bl = Number.parseFloat(as.borderLeftWidth), bt = Number.parseFloat(as.borderTopWidth);
                const box = { l: ar.left + bl, t: ar.top + bt, r: ar.left + bl + a.clientWidth, b: ar.top + bt + a.clientHeight };
                clips.push({
                    cls: a.className as unknown as number,
                    ox: as.overflowX as unknown as number,
                    oy: as.overflowY as unknown as number,
                    l: +(box.l - ink.l).toFixed(2),
                    t: +(box.t - ink.t).toFixed(2),
                    r: +(ink.r - box.r).toFixed(2),
                    b: +(ink.b - box.b).toFixed(2),
                });
            }
            // clip > 0 = ink past that edge of a clipping box (only for clipping axes)
            const clipped = clips.some(
                (c) =>
                    (c.ox !== ("visible" as unknown as number) && (c.l > 0.25 || c.r > 0.25)) ||
                    (c.oy !== ("visible" as unknown as number) && (c.t > 0.25 || c.b > 0.25)),
            );
            return {
                id: el.dataset.witness,
                w: +r.width.toFixed(2),
                k: +k.toFixed(3),
                focus,
                hover: el.matches(":hover"),
                ringW,
                clipped: focus ? clipped : undefined,
                clips: focus ? clips : undefined,
            };
        });
        return {
            tag,
            cls: dock.className,
            morphing: dock.hasAttribute("data-morphing"),
            scale: getComputedStyle(dock).scale,
            plate: { w: +pr.width.toFixed(2), h: +pr.height.toFixed(2), lw: plate.offsetWidth, lh: plate.offsetHeight },
            radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
            cross: dock.style.getPropertyValue("--dock-plate-cross-px"),
            run: run && { sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight, sl: run.scrollLeft, active: run.classList.contains("is-active") },
            seats,
        };
    }, tag);
}

type Row = Awaited<ReturnType<typeof read>>;
function verdict(r: Row) {
    const h = Math.min(r.plate.lw, r.plate.lh) / 2;
    const uniform = r.radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - h) <= 0.5);
    const reach = r.run ? r.run.sw !== r.run.cw || r.run.sh !== r.run.ch : false;
    const ringClip = r.seats.filter((s) => s.clipped).map((s) => s.id);
    return { uniform, reach, ringClip };
}

const COARSE = { hasTouch: true, isMobile: true };

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(pointer, () => {
        if (pointer === "coarse") test.use(COARSE);

        /* R1 · every seat kind, rest / hover / focus / focus+hover, widths. */
        for (const width of [320, 390, 430, 844, 1440]) test(`dock postures ${pointer} ${width}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            {
                await page.setViewportSize({ width, height: 800 });
                for (const kinds of ["menu,sep,icon,icon,icon", "tab:Home,icon,icon,tab:Settings", "icon,tab:A much longer label"]) {
                    await open(page, `scene=dock&kinds=${encodeURIComponent(kinds)}`);
                    await page.mouse.move(2, 2);
                    await page.waitForTimeout(150);
                    const rest = await read(page, `${width} ${kinds} rest`);
                    rows.push({ ...rest, v: verdict(rest) });
                    const ids = rest.seats.map((s) => s.id!).filter((id) => id.startsWith("S"));
                    // keyboard focus walks the run (Tab from the body)
                    await page.locator("body").focus();
                    for (const id of ids) {
                        const loc = page.locator(`[data-witness="${id}"]`);
                        await loc.hover();
                        await page.waitForTimeout(350);
                        const hv = await read(page, `${width} ${kinds} hover ${id}`);
                        rows.push({ ...hv, v: verdict(hv) });
                        await loc.focus();
                        await page.evaluate((id) => {
                            const el = document.querySelector<HTMLElement>(`[data-witness="${id}"]`)!;
                            el.blur();
                        }, id);
                        await page.keyboard.press("Shift+Tab");
                        await page.keyboard.press("Tab");
                        await page.waitForTimeout(350);
                        const fh = await read(page, `${width} ${kinds} focus+hover ${id}`);
                        rows.push({ ...fh, v: verdict(fh) });
                        await page.mouse.move(2, 2);
                        await page.waitForTimeout(350);
                        const f = await read(page, `${width} ${kinds} focus ${id}`);
                        rows.push({ ...f, v: verdict(f) });
                    }
                }
            }
            bank(`dock-postures-${pointer}-${width}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* R1 · a vertical dock: rest, hover and focus+hover on each seat. */
        test(`dock vertical ${pointer}`, async ({ page }) => {
            test.setTimeout(120_000);
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 1280, height: 800 });
            for (const kinds of ["icon,icon,icon", "tab:Home,icon,tab:Settings"]) {
                await open(page, `scene=dock&orientation=vertical&kinds=${encodeURIComponent(kinds)}`);
                await page.mouse.move(600, 600);
                await page.waitForTimeout(200);
                const rest = await read(page, `vertical ${kinds} rest`);
                rows.push({ ...rest, v: verdict(rest) });
                for (const id of rest.seats.map((x) => x.id!).filter((x) => x.startsWith("S"))) {
                    const loc = page.locator(`[data-witness="${id}"]`);
                    await loc.hover();
                    await page.waitForTimeout(350);
                    const hv = await read(page, `vertical ${kinds} hover ${id}`);
                    rows.push({ ...hv, v: verdict(hv) });
                    await page.keyboard.press("Shift+Tab");
                    await page.keyboard.press("Tab");
                    await loc.focus();
                    await page.keyboard.press("Shift+Tab");
                    await page.keyboard.press("Tab");
                    await page.waitForTimeout(350);
                    const fh = await read(page, `vertical ${kinds} focus+hover ${id}`);
                    rows.push({ ...fh, v: verdict(fh) });
                }
            }
            bank(`dock-vertical-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* OD-18 · every frame of a layer (view) switch: the plate's corner uniform. */
        test(`dock layer switch frames ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 800 });
            await open(page, "scene=layers");
            const frames = await page.evaluate(async () => {
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                const layer = (window as unknown as { __layer: { value: string } }).__layer;
                const out: unknown[] = [];
                const t0 = performance.now();
                let flips = 0;
                await new Promise<void>((done) => {
                    const tick = () => {
                        const t = performance.now() - t0;
                        if (flips === 0 && t > 50) { layer.value = "input"; flips = 1; }
                        if (flips === 1 && t > 900) { layer.value = "actions"; flips = 2; }
                        const cs = getComputedStyle(plate);
                        const run = dock.querySelector<HTMLElement>(".dock-run.is-active")!;
                        out.push({ t: Math.round(t), layer: layer.value, lw: plate.offsetWidth, lh: plate.offsetHeight, scale: getComputedStyle(dock).scale,
                            radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
                            sw: run.scrollWidth, cw: run.clientWidth });
                        if (t < 1800) requestAnimationFrame(tick); else done();
                    };
                    requestAnimationFrame(tick);
                });
                return out;
            });
            bank(`dock-layer-switch-${pointer}`, frames);
            expect(frames.length).toBeGreaterThan(0);
        });

        /* OD-17 · keyboard modality without Tab (WebKit's Tab skips buttons): a key
           press, then programmatic focus, then the pointer on the seat. */
        test(`dock tab ring kbd ${pointer}`, async ({ page }) => {
            const rows: unknown[] = [];
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                for (const q of ["scene=dock&kinds=tab:Home,icon,icon,tab:Settings", "scene=layers"]) {
                    await open(page, q);
                    for (const id of q.includes("layers") ? ["L1"] : ["S1", "S4"]) {
                        await page.mouse.move(2, 2);
                        await page.keyboard.press("Shift");
                        await page.locator(`[data-witness="${id}"]`).focus();
                        await page.waitForTimeout(250);
                        const f = await read(page, `${width} ${q} focus ${id}`);
                        rows.push({ ...f, v: verdict(f) });
                        await page.locator(`[data-witness="${id}"]`).hover();
                        await page.waitForTimeout(400);
                        const fh = await read(page, `${width} ${q} focus+hover ${id}`);
                        rows.push({ ...fh, v: verdict(fh) });
                    }
                }
            }
            bank(`dock-tab-ring-kbd-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* R1 · overflow with persistent regions; the cut, then flush. */
        test(`dock overflow ${pointer}`, async ({ page }) => {
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 390, height: 800 });
            const kinds = Array.from({ length: 12 }, () => "icon").join(",");
            for (const q of [`kinds=${kinds}&maxw=360`, `kinds=${kinds}&maxw=360&persistent=1`, `kinds=${kinds}&maxw=360&dir=rtl`]) {
                await open(page, `scene=dock&${q}`);
                for (const frac of [0, 0.5, 1, 0]) {
                    await page.evaluate((frac) => {
                        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                        const max = run.scrollWidth - run.clientWidth;
                        run.scrollLeft = (document.documentElement.dir === "rtl" ? -1 : 1) * max * frac;
                    }, frac);
                    await page.waitForTimeout(400);
                    const r = await read(page, `${q} scroll ${frac}`);
                    // overlap of the run's border box onto its siblings and the plate
                    const geo = await page.evaluate(() => {
                        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                        const rr = run.getBoundingClientRect();
                        const plate = document.querySelector<HTMLElement>(".dock-plate")!.getBoundingClientRect();
                        const out: Record<string, unknown> = {
                            run: [rr.left, rr.top, rr.right, rr.bottom].map((x) => +x.toFixed(2)),
                            plate: [plate.left, plate.top, plate.right, plate.bottom].map((x) => +x.toFixed(2)),
                        };
                        for (const id of ["lead", "tail"]) {
                            const el = document.querySelector<HTMLElement>(`[data-witness="${id}"]`);
                            if (!el) continue;
                            const b = el.getBoundingClientRect();
                            const y = b.top + b.height / 2;
                            const edge = id === "lead" ? b.right - 0.5 : b.left + 0.5;
                            const hit = document.elementFromPoint(edge, y) as HTMLElement | null;
                            out[id] = {
                                box: [b.left, b.right].map((x) => +x.toFixed(2)),
                                overlapPx: +(id === "lead" ? b.right - rr.left : rr.right - b.left).toFixed(2),
                                edgeHit: hit?.closest("[data-witness]")?.getAttribute("data-witness") ?? hit?.className,
                            };
                        }
                        return out;
                    });
                    rows.push({ ...r, v: verdict(r), geo });
                }
            }
            bank(`dock-overflow-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* R2 + OD-16 · collapse frames: computed corner, the root's morph scale, and
           every painted dock layer's box against the circle. */
        test(`dock collapse frames ${pointer}`, async ({ page }) => {
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 390, height: 800 });
            for (const q of ["kinds=menu,sep,icon,icon,icon&collapse=open", "kinds=tab:Home,icon,icon&collapse=open&summary=tab"]) {
                await open(page, `scene=dock&${q}`);
                const frames = await page.evaluate(async () => {
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    const api = (window as unknown as { __dock: { collapse?: () => void; setExpanded?: (v: boolean) => void } }).__dock;
                    const out: unknown[] = [];
                    const sample = (t: number) => {
                        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                        const cs = getComputedStyle(plate);
                        const pr = plate.getBoundingClientRect();
                        const painted = [...dock.querySelectorAll<HTMLElement>("*"), dock]
                            .filter((el) => {
                                const s = getComputedStyle(el);
                                return (
                                    s.visibility !== "hidden" &&
                                    Number(s.opacity) > 0.02 &&
                                    ((s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent") ||
                                        s.boxShadow !== "none" ||
                                        (s.backdropFilter && s.backdropFilter !== "none"))
                                );
                            })
                            .map((el) => {
                                const b = el.getBoundingClientRect();
                                return {
                                    el: el.className.toString().slice(0, 60),
                                    w: +b.width.toFixed(1),
                                    h: +b.height.toFixed(1),
                                    r: getComputedStyle(el).borderTopLeftRadius,
                                    past: +(Math.max(b.width - pr.width, b.height - pr.height)).toFixed(1),
                                };
                            });
                        out.push({
                            t,
                            morphing: dock.hasAttribute("data-morphing"),
                            cls: dock.className.includes("collapsed") ? "collapsed" : "expanded",
                            scale: getComputedStyle(dock).scale,
                            layout: [plate.offsetWidth, plate.offsetHeight],
                            painted: [+pr.width.toFixed(1), +pr.height.toFixed(1)],
                            radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
                            // painted corner: radius × the morph's scale on each axis
                            ghosts: painted.filter((p) => p.past > 0.5),
                        });
                    };
                    const t0 = performance.now();
                    // collapse: the mouse leaves an `open` collapsible dock
                    dock.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false, relatedTarget: document.body }));
                    if (api?.collapse) api.collapse();
                    await new Promise<void>((done) => {
                        const tick = () => {
                            sample(performance.now() - t0);
                            if (performance.now() - t0 < 1600) requestAnimationFrame(tick);
                            else done();
                        };
                        requestAnimationFrame(tick);
                    });
                    return out;
                });
                rows.push({ q, frames });
            }
            bank(`dock-collapse-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* OD-17 · the leading seat's ring, collapsed / expanded / input, ± hover. */
        test(`dock ring postures ${pointer}`, async ({ page }) => {
            test.setTimeout(120_000);
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 390, height: 800 });
            // collapsed summary
            for (const q of ["scene=dock&kinds=menu,sep,icon,icon&collapse=closed", "scene=dock&kinds=menu,sep,icon,icon&collapse=closed&summary=tab"]) {
                await open(page, q);
                await page.locator("body").focus();
                await page.keyboard.press("Tab");
                await page.waitForTimeout(350);
                const ring = await page.evaluate(() => {
                    const a = document.activeElement as HTMLElement;
                    const s = getComputedStyle(a);
                    const r = a.getBoundingClientRect();
                    const clips: unknown[] = [];
                    const ow = Number.parseFloat(s.outlineWidth) + Number.parseFloat(s.outlineOffset);
                    for (let p = a.parentElement; p && p !== document.body; p = p.parentElement) {
                        const ps = getComputedStyle(p);
                        if (ps.overflowX === "visible" && ps.overflowY === "visible" && ps.clipPath === "none") continue;
                        const pr = p.getBoundingClientRect();
                        clips.push({ cls: p.className.toString().slice(0, 50), ox: ps.overflowX, oy: ps.overflowY, clip: ps.clipPath, l: +(pr.left - (r.left - ow)).toFixed(2), t: +(pr.top - (r.top - ow)).toFixed(2) });
                    }
                    return { focused: a.className.toString().slice(0, 60), fv: a.matches(":focus-visible"), outline: s.outlineStyle + " " + s.outlineWidth + " " + s.outlineOffset, boxShadow: s.boxShadow.slice(0, 80), clips };
                });
                const r = await read(page, `${q} summary focus`);
                rows.push({ ...r, v: verdict(r), ring });
                await page.locator('[data-witness="summary"]').hover({ force: true });
                await page.waitForTimeout(400);
                const rh = await read(page, `${q} summary focus+hover`);
                rows.push({ ...rh, v: verdict(rh) });
            }
            // the layers scene: leading tab seat, then the input layer's leading seat
            for (const layer of ["actions", "input"]) {
                await open(page, `scene=layers&layer=${layer}`);
                const lead = layer === "actions" ? "L1" : "I1";
                await page.locator("body").focus();
                await page.keyboard.press("Tab");
                await page.waitForTimeout(300);
                const f = await read(page, `layers ${layer} focus first`);
                rows.push({ ...f, v: verdict(f), active: await page.evaluate(() => (document.activeElement as HTMLElement).dataset.witness) });
                await page.locator(`[data-witness="${lead}"]`).hover();
                await page.waitForTimeout(400);
                const fh = await read(page, `layers ${layer} focus+hover first`);
                rows.push({ ...fh, v: verdict(fh) });
            }
            bank(`dock-ring-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* R5 · drag to each end, two thumbs, size rungs, an off-step max. */
        test(`slider ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 430, height: 1400 });
            await open(page, "scene=slider");
            const thumbRead = (id: string, tag: string) =>
                page.evaluate(
                    ({ id, tag }) => {
                        const root = document.querySelector<HTMLElement>(`[data-witness="${id}"] .glass-slider`)!;
                        const track = root.querySelector<HTMLElement>(".slider-track")!.getBoundingClientRect();
                        const range = root.querySelector<HTMLElement>(".slider-range")!.getBoundingClientRect();
                        const thumbs = [...root.querySelectorAll<HTMLElement>(".slider-thumb")].map((t) => {
                            const b = t.getBoundingClientRect();
                            const s = getComputedStyle(t);
                            return { l: +b.left.toFixed(2), r: +b.right.toFixed(2), t: +b.top.toFixed(2), b: +b.bottom.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), op: s.opacity, bg: s.backgroundColor, vis: s.visibility, val: t.getAttribute("aria-valuenow") };
                        });
                        const r2 = (x: DOMRect) => [x.left, x.top, x.right, x.bottom].map((v) => +v.toFixed(2));
                        return { id, tag, track: r2(track), range: r2(range), thumbs, inside: thumbs.every((t) => t.l >= track.left - 0.5 && t.r <= track.right + 0.5 && t.t >= track.top - 0.5 && t.b <= track.bottom + 0.5) };
                    },
                    { id, tag },
                );
            const rows: unknown[] = [];
            const tr = await page.locator('[data-witness="drag"] .slider-track').boundingBox();
            await page.mouse.move(tr!.x + tr!.width / 2, tr!.y + tr!.height / 2);
            await page.mouse.down();
            await page.mouse.move(tr!.x + tr!.width + 60, tr!.y + tr!.height / 2, { steps: 12 });
            await page.waitForTimeout(250);
            rows.push(await thumbRead("drag", "held at max"));
            await page.mouse.move(tr!.x - 60, tr!.y + tr!.height / 2, { steps: 20 });
            await page.waitForTimeout(250);
            rows.push(await thumbRead("drag", "held at min"));
            await page.mouse.up();
            await page.waitForTimeout(500);
            rows.push(await thumbRead("drag", "released at min"));
            for (const id of ["drag-v", "two", "sm-0", "sm-100", "md-0", "md-100", "lg-0", "lg-100", "step-odd"]) rows.push(await thumbRead(id, "rest"));
            // keyboard: End then Home on the two-thumb's second thumb
            await page.locator('[data-witness="two"] .slider-thumb').nth(1).focus();
            await page.keyboard.press("End");
            await page.waitForTimeout(300);
            rows.push(await thumbRead("two", "end"));
            bank(`slider-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* R6 · every field recipe at 390 and desktop. */
        test(`fields ${pointer}`, async ({ page }) => {
            const rows: unknown[] = [];
            for (const width of [390, 1280]) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=fields");
                rows.push(
                    await page.evaluate((width) => {
                        const px = (sel: string) => {
                            const el = document.querySelector<HTMLElement>(sel);
                            return el ? Number.parseFloat(getComputedStyle(el).fontSize) : null;
                        };
                        const sub = px('[data-witness="subtitle"]')!;
                        const out: Record<string, unknown> = { width, coarse: matchMedia("(pointer: coarse)").matches, subtitle: sub };
                        for (const [k, sel] of Object.entries({ bar: ".input-bar-field", input: '[data-witness="input"]', textarea: '[data-witness="textarea"]', pill: '[data-witness="pill"]' })) {
                            const v = px(sel);
                            out[k] = { px: v, ratio: v && +(v / sub).toFixed(3) };
                        }
                        out.barH = document.querySelector<HTMLElement>(".input-bar")!.getBoundingClientRect().height;
                        return out;
                    }, width),
                );
            }
            bank(`fields-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });
    });
}


/* ══ ROUND 4 ══════════════════════════════════════════════════════════════════ */

const geo = (page: Page) =>
    page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const pr = plate.getBoundingClientRect();
        const run = dock.querySelector<HTMLElement>(".dock-run.is-active")!;
        const rr = run.getBoundingClientRect();
        const seats = [...dock.querySelectorAll<HTMLElement>("[data-witness]")].map((el) => {
            const b = el.getBoundingClientRect();
            return { id: el.dataset.witness, x: +b.left.toFixed(2), r: +b.right.toFixed(2), lw: el.offsetWidth };
        });
        const st = getComputedStyle(dock);
        return {
            dockW: +dock.getBoundingClientRect().width.toFixed(2),
            plate: [pr.left, pr.right].map((v) => +v.toFixed(2)),
            run: [rr.left, rr.right].map((v) => +v.toFixed(2)),
            reserveInline: st.getPropertyValue("--dock-run-reserve-inline"),
            seatMax: dock.style.getPropertyValue("--dock-seat-max-inline-px"),
            seats,
        };
    });

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`r4 ${pointer}`, () => {
        if (pointer === "coarse") test.use(COARSE);

        /* critique-3 S1: a labelled trigger, and a seat that opens, widen the dock? */
        test(`r4 s1 reserve basis ${pointer}`, async ({ page }) => {
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 844, height: 800 });
            for (const q of ["kinds=icon,icon,icon", "kinds=wmenu:A long labelled menu trigger,icon,icon", "kinds=icon,cur,icon,icon", "kinds=icon,cur,icon,icon&persistent=1"]) {
                await open(page, `scene=dock&${q}`);
                await page.mouse.move(2, 2);
                rows.push({ q, state: "rest", ...(await geo(page)) });
                if (q.includes("cur")) {
                    await page.evaluate(() => ((window as unknown as { __cur: { value: number } }).__cur.value = 2));
                    await page.waitForTimeout(900);
                    rows.push({ q, state: "open S2", ...(await geo(page)) });
                    await page.evaluate(() => ((window as unknown as { __cur: { value: number } }).__cur.value = -1));
                    await page.waitForTimeout(900);
                    rows.push({ q, state: "closed", ...(await geo(page)) });
                }
            }
            bank(`r4-s1-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* critique-3 S2: a live label rebuilds the seat observer every tick. */
        test(`r4 s2 live label ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 800 });
            const logs: string[] = [];
            page.on("console", (m) => logs.push(m.text()));
            page.on("pageerror", (e) => logs.push("pageerror " + e.message));
            await open(page, "scene=dock&kinds=icon,live,icon");
            const r = await page.evaluate(async () => {
                const ww = window as unknown as { __roMade: () => number; __tick: { value: number }; __errs: string[] };
                const before = ww.__roMade();
                for (let i = 0; i < 60; i++) {
                    ww.__tick.value += 1;
                    await new Promise((d) => setTimeout(d, 50));
                }
                return { before, after: ww.__roMade(), errs: ww.__errs.slice() };
            });
            const row = await read(page, "live after");
            bank(`r4-s2-${pointer}`, { ...r, logs: logs.filter((l) => /ResizeObserver/i.test(l)), v: verdict(row) });
            expect(r).toBeTruthy();
        });

        /* critique-3 S3: no ResizeObserver: what the plate paints. */
        test(`r4 s3 no RO ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 800 });
            await open(page, "scene=dock&noro=1");
            const r = await read(page, "noro");
            bank(`r4-s3-${pointer}`, { ...r, v: verdict(r) });
            expect(r).toBeTruthy();
        });

        /* the dock's edge room: a cockpit dock that overflows, with and without persistent
           regions, its end seats focused and hovered at both scroll ends. */
        test(`r4 cockpit overflow ${pointer}`, async ({ page }) => {
            test.setTimeout(180_000);
            const rows: unknown[] = [];
            for (const width of [320, 390]) {
                await page.setViewportSize({ width, height: 800 });
                const kinds = ["tab:Home", ...Array.from({ length: 10 }, () => "icon"), "tab:Settings"].join(",");
                for (const q of [`kinds=${kinds}&preset=cockpit`, `kinds=${kinds}&preset=cockpit&persistent=1`, `kinds=${kinds}`, `kinds=${kinds}&persistent=1`, `kinds=${kinds}&preset=cockpit&dir=rtl`]) {
                    await open(page, `scene=dock&${q}&maxw=${width - 30}`);
                    for (const [frac, id] of [[0, "S1"], [1, "S12"]] as const) {
                        await page.evaluate((frac) => {
                            const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                            run.scrollLeft = (document.documentElement.dir === "rtl" ? -1 : 1) * (run.scrollWidth - run.clientWidth) * frac;
                        }, frac);
                        await page.waitForTimeout(450);
                        const rest = await read(page, `${width} ${q} scroll ${frac} rest`);
                        await page.mouse.move(2, 2);
                        await page.keyboard.press("Shift");
                        await page.locator(`[data-witness="${id}"]`).focus();
                        await page.locator(`[data-witness="${id}"]`).hover();
                        await page.waitForTimeout(500);
                        const fh = await read(page, `${width} ${q} scroll ${frac} focus+hover ${id}`);
                        const g = await geo(page);
                        // the end seat's ink against the plate's own box (the dock's edge room)
                        const s = fh.seats.find((x) => x.id === id)!;
                        rows.push({ rest: { radii: rest.radii, run: rest.run, v: verdict(rest) }, fh: { ...fh, v: verdict(fh) }, geo: g, seat: s });
                        await page.locator("body").focus();
                    }
                }
            }
            bank(`r4-cockpit-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* press posture on each seat, every width, and RTL rest/hover. */
        test(`r4 press and rtl ${pointer}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            for (const width of [320, 390, 430, 844, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                for (const q of ["kinds=tab:Home,icon,icon,tab:Settings", "kinds=menu,sep,icon,icon,icon&dir=rtl", "kinds=tab:Home,icon,icon,tab:Settings&dir=rtl"]) {
                    await open(page, `scene=dock&${q}`);
                    await page.mouse.move(2, 2);
                    const rest = await read(page, `${width} ${q} rest`);
                    rows.push({ ...rest, v: verdict(rest) });
                    for (const id of rest.seats.map((s) => s.id!).filter((x) => x.startsWith("S"))) {
                        if (q.includes("menu") && id === "S1") continue;
                        const loc = page.locator(`[data-witness="${id}"]`);
                        const b = await loc.boundingBox();
                        if (!b) continue;
                        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                        await page.waitForTimeout(300);
                        const hv = await read(page, `${width} ${q} hover ${id}`);
                        rows.push({ ...hv, v: verdict(hv) });
                        await page.mouse.down();
                        await page.waitForTimeout(300);
                        const pr = await read(page, `${width} ${q} press ${id}`);
                        rows.push({ ...pr, v: verdict(pr) });
                        await page.mouse.up();
                        await page.mouse.move(2, 2);
                        await page.waitForTimeout(250);
                    }
                }
            }
            bank(`r4-press-rtl-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r5: every edge cell at rest. */
        test(`r4 slider ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 430, height: 1600 });
            await open(page, "scene=slider4");
            const rows = await page.evaluate(() =>
                [...document.querySelectorAll<HTMLElement>("[data-witness]")].map((cell) => {
                    const root = cell.querySelector<HTMLElement>(".glass-slider")!;
                    const tr = root.querySelector<HTMLElement>(".slider-track")!.getBoundingClientRect();
                    const rg = root.querySelector<HTMLElement>(".slider-range")!.getBoundingClientRect();
                    const th = root.querySelector<HTMLElement>(".slider-thumb")!;
                    const tb = th.getBoundingClientRect();
                    const s = getComputedStyle(th);
                    const r2 = (x: DOMRect) => [x.left, x.top, x.right, x.bottom].map((v) => +v.toFixed(2));
                    const inFill = tb.left >= rg.left - 0.5 && tb.right <= rg.right + 0.5 && tb.top >= rg.top - 0.5 && tb.bottom <= rg.bottom + 0.5;
                    const inTrack = tb.left >= tr.left - 0.5 && tb.right <= tr.right + 0.5 && tb.top >= tr.top - 0.5 && tb.bottom <= tr.bottom + 0.5;
                    const vert = root.getAttribute("data-orientation") === "vertical";
                    // the thumb sits at the fill's leading (value) end
                    const atEnd = vert
                        ? Math.min(Math.abs(tb.top - rg.top), Math.abs(tb.bottom - rg.bottom)) <= 0.6
                        : Math.min(Math.abs(tb.left - rg.left), Math.abs(tb.right - rg.right)) <= 0.6;
                    const op = Number(s.opacity) * Number(getComputedStyle(root.querySelector(".slider-range")!).opacity);
                    return { id: cell.dataset.witness, val: th.getAttribute("aria-valuenow"), track: r2(tr), range: r2(rg), thumb: { w: +tb.width.toFixed(2), h: +tb.height.toFixed(2), op: s.opacity, bg: s.backgroundColor, disp: s.display, vis: s.visibility }, inFill, inTrack, atEnd, fillW: +(vert ? rg.height : rg.width).toFixed(2), op };
                }),
            );
            bank(`r4-slider-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r6: every control on the recipe, 390 and desktop. */
        test(`r4 fields ${pointer}`, async ({ page }) => {
            const rows: unknown[] = [];
            for (const width of [390, 1280]) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=fields4");
                rows.push(
                    await page.evaluate((width) => {
                        const fs = (el: Element | null) => (el ? Number.parseFloat(getComputedStyle(el).fontSize) : null);
                        const sub = fs(document.querySelector('[data-witness="subtitle"]'))!;
                        const out: Record<string, unknown> = { width, coarse: matchMedia("(pointer: coarse)").matches, subtitle: sub };
                        for (const el of document.querySelectorAll<HTMLElement>("[data-witness]")) {
                            const t = el.querySelector("input,textarea") ?? el;
                            const v = fs(t);
                            out[el.dataset.witness!] = { px: v, ratio: v && +(v / sub).toFixed(3), h: +el.getBoundingClientRect().height.toFixed(1) };
                        }
                        return out;
                    }, width),
                );
                await open(page, "scene=layers&layer=input");
                rows.push({ width, dockSearch: await page.evaluate(() => Number.parseFloat(getComputedStyle(document.querySelector(".input-bar-field")!).fontSize)) });
            }
            bank(`r4-fields-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7: icon-to-label gap on every item kind. */
        test(`r4 menu ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 800 });
            await open(page, "scene=menu4");
            await page.waitForSelector('[data-witness="icon"]');
            const rows = await page.evaluate(() =>
                [...document.querySelectorAll<HTMLElement>('[role^="menuitem"][data-witness]')].map((el) => {
                    const svg = el.querySelector("svg[data-icon]");
                    const kids = [...el.childNodes];
                    const textNode = [...kids].reverse().find((n) => (n.nodeType === 3 && n.textContent!.trim()) || (n.nodeType === 1 && (n as Element).tagName === "SPAN" && (n as Element).textContent!.trim()));
                    let gap: number | null = null;
                    let textL: number | null = null;
                    if (textNode) {
                        const rg = document.createRange();
                        rg.selectNodeContents(textNode);
                        textL = rg.getBoundingClientRect().left;
                        if (svg) gap = +(textL - svg.getBoundingClientRect().right).toFixed(2);
                    }
                    const s = getComputedStyle(el);
                    return {
                        id: el.dataset.witness,
                        role: el.getAttribute("role"),
                        gapPx: gap,
                        token: s.getPropertyValue("--icon-label-gap").trim(),
                        colGap: s.columnGap,
                        display: s.display,
                        children: kids.filter((n) => n.nodeType === 1).map((n) => { const b = (n as Element).getBoundingClientRect(); return [(n as Element).tagName, +b.left.toFixed(1), +b.right.toFixed(1)]; }),
                        textL: textL && +(textL - el.getBoundingClientRect().left).toFixed(2),
                    };
                }),
            );
            bank(`r4-menu-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* O-133: a fixed z:1 header over a SegmentedTabs in an unpositioned host. */
        test(`r4 segtabs ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 800 });
            const outs: unknown[] = [];
            for (const variant of ["pill", "underline"]) {
                await open(page, `scene=segtabs&variant=${variant}`);
                outs.push(await page.evaluate(async (variant) => {
                    const raf2 = () => new Promise((d) => requestAnimationFrame(() => requestAnimationFrame(d)));
                    const tabs = [...document.querySelectorAll<HTMLElement>(".segmented-tab")];
                    const strip = tabs[0].parentElement!;
                    const rs = getComputedStyle(strip);
                    const sc = { position: rs.position, z: rs.zIndex, isolation: rs.isolation, backdrop: rs.backdropFilter || (rs as unknown as Record<string, string>).webkitBackdropFilter, filter: rs.filter, transform: rs.transform, contain: rs.contain, willChange: rs.willChange, opacity: rs.opacity, mix: rs.mixBlendMode, clip: rs.clipPath, mask: (rs as unknown as Record<string, string>).maskImage };
                    const b0 = tabs[1].getBoundingClientRect();
                    window.scrollTo(0, b0.top + window.scrollY - 40);
                    await raf2();
                    const b = tabs[1].getBoundingClientRect();
                    const stack = document.elementsFromPoint(b.left + b.width / 2, b.top + b.height / 2).map((e) => (e as HTMLElement).dataset?.witness || e.className.toString().slice(0, 30) || e.tagName);
                    window.scrollTo(0, 0);
                    await raf2();
                    const act = tabs.find((t) => t.getAttribute("aria-selected") === "true") ?? tabs[0];
                    const ab = act.getBoundingClientRect();
                    const inner = document.elementsFromPoint(ab.left + ab.width / 2, ab.top + ab.height / 2).map((e) => e.className.toString().slice(0, 30) || e.tagName);
                    const ind = document.querySelector<HTMLElement>(".segmented-indicator");
                    return { variant, strip: strip.className.toString().slice(0, 80), stackingProps: sc, overlapTop: +b.top.toFixed(1), stackAtTab: stack.slice(0, 5), headerOverTab: stack[0] === "header", innerStack: inner.slice(0, 4), indicatorPE: ind && getComputedStyle(ind).pointerEvents, tabZ: getComputedStyle(tabs[0]).zIndex };
                }, variant));
            }
            bank(`r4-segtabs-${pointer}`, outs);
            expect(outs.length).toBe(2);
        });

        /* The run's clip at the plate's edge, in paint: element shots of an overflowing
           dock at mid-scroll (every corner cut), house and cockpit, a tab seat hovered at
           the trailing clip. */
        test(`r4 edge shots ${pointer}`, async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 800 });
            const rows: unknown[] = [];
            const kinds = ["tab:Home", ...Array.from({ length: 10 }, () => "icon"), "tab:Settings"].join(",");
            for (const [name, q] of [["house", `kinds=${kinds}&maxw=360`], ["cockpit", `kinds=${kinds}&maxw=360&preset=cockpit`]] as const) {
                await open(page, `scene=dock&${q}`);
                await page.mouse.move(2, 2);
                const g = await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                    run.scrollLeft = (run.scrollWidth - run.clientWidth) / 2 + 13;
                    const plate = document.querySelector<HTMLElement>(".dock-plate")!.getBoundingClientRect();
                    const rr = run.getBoundingClientRect();
                    const cs = getComputedStyle(run);
                    return { plate: [plate.left, plate.right], runBox: [rr.left, rr.right], clipInsetL: +(rr.left + Number.parseFloat(cs.borderLeftWidth) - plate.left).toFixed(2), clipInsetR: +(plate.right - rr.right).toFixed(2) };
                });
                await page.waitForTimeout(500);
                const dir = `${OUT}${test.info().project.name}`;
                mkdirSync(dir, { recursive: true });
                await page.locator(".glass-dock").screenshot({ path: `${dir}/edge-${name}-${pointer}.png`, animations: "disabled" });
                // which seat straddles the trailing clip, and its box vs the plate's cut corner
                const straddle = await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                    const rr = run.getBoundingClientRect();
                    const plateEl = document.querySelector<HTMLElement>(".dock-plate")!;
                    const pr = plateEl.getBoundingClientRect();
                    const rad = Number.parseFloat(getComputedStyle(plateEl).borderTopRightRadius);
                    const out: unknown[] = [];
                    for (const el of run.querySelectorAll<HTMLElement>("[data-witness]")) {
                        const b = el.getBoundingClientRect();
                        if (b.right > rr.right && b.left < rr.right) {
                            // the clipped seat's visible top-right corner (x = clip edge, y = seat top)
                            const x = rr.right, y = b.top;
                            const cx = pr.right - rad, cy = pr.top + rad;
                            const outside = x > cx && y < cy && Math.hypot(x - cx, y - cy) > rad;
                            out.push({ id: el.dataset.witness, seat: [b.left, b.top, b.right, b.bottom].map((v) => +v.toFixed(1)), plateR: pr.right, rad, cornerOutsidePlate: outside, by: +(Math.hypot(x - cx, y - cy) - rad).toFixed(2), bg: getComputedStyle(el).backgroundColor });
                        }
                    }
                    return out;
                });
                rows.push({ name, ...g, straddle });
            }
            bank(`r4-edge-${pointer}`, rows);
            expect(rows.length).toBe(2);
        });

        /* O-150: table rules take --border, light and dark. */
        test(`r4 table ${pointer}`, async ({ page }) => {
            await open(page, "scene=table");
            const rows: unknown[] = [];
            for (const dark of [false, true]) {
                rows.push(
                    await page.evaluate((dark) => {
                        document.documentElement.classList.toggle("dark", dark);
                        const border = getComputedStyle(document.querySelector('[data-witness="probe-border"]')!).borderTopColor;
                        return {
                            dark,
                            border,
                            rules: [...document.querySelectorAll<HTMLElement>("tr[data-witness], thead[data-witness]")].map((el) => {
                                const s = getComputedStyle(el);
                                return { id: el.dataset.witness, bw: s.borderBottomWidth, bc: s.borderBottomColor, color: s.color, ok: s.borderBottomColor === border };
                            }),
                        };
                    }, dark),
                );
            }
            bank(`r4-table-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });
    });
}

/* The run's clip at the plate's cut corner, in paint, at 3x: an overflowing dock scrolled
   to mid-run (every corner cut, scroll-driven animations LIVE), the trailing tab hovered
   and a seat straddling the trailing clip. */
test.describe("r4 edge zoom", () => {
    test.use({ deviceScaleFactor: 3 });
    for (const preset of ["house", "cockpit"]) test(`r4 edge zoom ${preset}`, async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 400 });
        const kinds = ["tab:Home", ...Array.from({ length: 6 }, () => "icon"), "tab:Settings", "tab:Library", "icon", "icon", "tab:Profile"].join(",");
        await open(page, `scene=dock&kinds=${encodeURIComponent(kinds)}&maxw=360${preset === "cockpit" ? "&preset=cockpit" : ""}`);
        const rows: unknown[] = [];
        for (const target of ["S8", "S9"]) {
            // scroll so the target tab straddles the trailing clip by half its width
            await page.evaluate((target) => {
                const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                run.style.scrollSnapType = "none";
                const el = document.querySelector<HTMLElement>(`[data-witness="${target}"]`)!;
                const rr = run.getBoundingClientRect();
                const b = el.getBoundingClientRect();
                run.scrollLeft += b.left + b.width / 2 - rr.right;
            }, target);
            await page.waitForTimeout(400);
            const loc = page.locator(`[data-witness="${target}"]`);
            const b = (await loc.boundingBox())!;
            const run = await page.locator(".dock-run.is-active").boundingBox();
            await page.mouse.move(Math.min(b.x + 6, run!.x + run!.width - 6), b.y + b.height / 2);
            await page.waitForTimeout(450);
            const r = await page.evaluate((target) => {
                const plate = document.querySelector<HTMLElement>(".dock-plate")!;
                const pr = plate.getBoundingClientRect();
                const cs = getComputedStyle(plate);
                const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                const rr = run.getBoundingClientRect();
                const el = document.querySelector<HTMLElement>(`[data-witness="${target}"]`)!;
                const b = el.getBoundingClientRect();
                const s = getComputedStyle(el);
                const rad = Number.parseFloat(cs.borderTopRightRadius);
                const cx = pr.right - rad, cy = pr.top + rad;
                // the seat's own painted top edge at the clip line: its straight top runs
                // from left+R to right-R (R = its own corner radius, clamped to h/2)
                const R = Math.min(Number.parseFloat(s.borderTopRightRadius) || 0, b.height / 2);
                const x = rr.right;
                const straight = x >= b.left + R && x <= b.right - R;
                const y = straight ? b.top : b.top + R - Math.sqrt(Math.max(0, R * R - (x - (x < b.left + R ? b.left + R : b.right - R)) ** 2));
                const past = x > cx && y < cy ? Math.hypot(x - cx, y - cy) - rad : 0;
                return { target, hover: el.matches(":hover"), bg: s.backgroundColor, sl: run.scrollLeft, plate: [pr.left, pr.top, pr.right, pr.bottom].map((v) => +v.toFixed(1)), radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius], clipR: +rr.right.toFixed(2), seat: [b.left, b.top, b.right, b.bottom].map((v) => +v.toFixed(1)), seatR: R, inkPastPlateArc: +past.toFixed(2) };
            }, target);
            const dir = `${OUT}${test.info().project.name}`;
            mkdirSync(dir, { recursive: true });
            const p = r.plate;
            await page.screenshot({ path: `${dir}/edgezoom-${preset}-${target}.png`, clip: { x: p[2] - 70, y: p[1] - 8, width: 80, height: p[3] - p[1] + 16 } });
            rows.push(r);
        }
        bank(`r4-edgezoom-${preset}`, rows);
        expect(rows.length).toBe(2);
    });
});

/* O-155: a two-seat dock at rest, both themes, 390 and 1440 (and coarse 390): the plate's
   corners, the run's reach, and every layer painted behind the plate against its outline.
   The behind-plate layer is the root `.glass-dock` (its rim insets and drop shadow, on
   `--radius-dock`); the plate is its `z-index: -1` child. Then the same against an
   overflowing run at mid-scroll, where the cut fires. 3x frames of each. */
const o155 = (page: Page) =>
    page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const run = dock.querySelector<HTMLElement>(".dock-run.is-active")!;
        const ds = getComputedStyle(dock), ps = getComputedStyle(plate);
        const r = (e: Element) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom].map((v) => +v.toFixed(2)); };
        const used = (v: string, w: number, h: number) => (v.endsWith("%") ? NaN : Math.min(Number.parseFloat(v), h / 2, w / 2));
        const corners = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"] as const;
        const pb = plate.getBoundingClientRect(), db = dock.getBoundingClientRect();
        return {
            plateBox: r(plate), rootBox: r(dock),
            plateRadii: corners.map((c) => ps[c]), rootRadii: corners.map((c) => ds[c]),
            plateUsed: corners.map((c) => +used(ps[c], pb.width, pb.height).toFixed(2)),
            rootUsed: corners.map((c) => +used(ds[c], db.width, db.height).toFixed(2)),
            rootShadow: ds.boxShadow.slice(0, 160),
            run: { sw: run.scrollWidth, cw: run.clientWidth },
            dark: document.documentElement.classList.contains("dark"),
        };
    });

test.describe("r4 o155", () => {
    test.use({ deviceScaleFactor: 3 });
    for (const pointer of ["fine", "coarse"] as const) test(`r4 o155 ${pointer}`, async ({ page, browser }) => {
        test.setTimeout(120_000);
        const rows: unknown[] = [];
        const dir = `${OUT}${test.info().project.name}`;
        mkdirSync(dir, { recursive: true });
        let pg = page;
        let ctx: Awaited<ReturnType<typeof browser.newContext>> | null = null;
        if (pointer === "coarse") {
            ctx = await browser.newContext({ hasTouch: true, isMobile: true, deviceScaleFactor: 3, viewport: { width: 390, height: 844 } });
            pg = await ctx.newPage();
        }
        try {
            for (const width of pointer === "coarse" ? [390] : [390, 1440]) {
                await pg.setViewportSize({ width, height: 600 });
                for (const dark of [false, true]) {
                    for (const [name, q] of [["two-seat", "kinds=icon,icon"], ["overflow-mid", `kinds=${Array.from({ length: 12 }, () => "icon").join(",")}&maxw=330`]] as const) {
                        await pg.goto(`/tests-visual/release-10-1-5/critic-4${ARM ? "-" + ARM : ""}.html?scene=dock&${q}`);
                        await pg.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
                        await pg.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), dark);
                        await pg.mouse.move(2, 2);
                        await pg.waitForTimeout(700);
                        if (name === "overflow-mid")
                            await pg.evaluate(() => {
                                const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                                run.scrollLeft = (run.scrollWidth - run.clientWidth) / 2;
                            });
                        await pg.waitForTimeout(500);
                        const row = await o155(pg);
                        const box = row.rootBox;
                        await pg.screenshot({ path: `${dir}/o155-${name}-${pointer}-${width}-${dark ? "dark" : "light"}.png`, clip: { x: box[0] - 12, y: box[1] - 12, width: Math.min(box[2] - box[0], 200) + 24, height: box[3] - box[1] + 24 } });
                        rows.push({ name, pointer, width, ...row });
                    }
                }
            }
        } finally {
            if (ctx) await ctx.close();
        }
        bank(`r4-o155-${pointer}`, rows);
        expect(rows.length).toBeGreaterThan(0);
    });
});
