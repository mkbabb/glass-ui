// glass-ui 10.1.5 — critic round 2 probes (docs/release-10.1.5/critique-2.md). Reads layout
// and computed style on `release-10-1-5/critic-2.html` and banks every row to
// `docs/release-10.1.5/critic-2/<project>/<cell>.json`. Probes never fail on a finding:
// each cell asserts only that it read something, and the verdict is in the rows.
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-2/${ARM ? ARM + "/" : ""}`, import.meta.url).pathname;

function bank(name: string, rows: unknown): void {
    const dir = `${OUT}${test.info().project.name}`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-2${ARM ? "-" + ARM : ""}.html?${q}`);
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
