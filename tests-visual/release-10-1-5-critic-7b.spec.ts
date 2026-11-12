// glass-ui 10.1.5 — critic round 7's own cells (docs/release-10.1.5/critique-7.md): the fix-6 attacks (r7a
// collapse from a scrolled overflow, r7b layer switch across fit/overflow, r7c the vertical yield and the
// horizontal fit edge) and the round-7 inbound rows (r7d O-156/O-165 hover paint, r7e O-157 static veil ink,
// r7f O-161 toggle tap, r7g O-162 summary ring and O-177 Tab, r7h O-176 open idle, r7i O-177 press mid-expand,
// r7j O-166 the Slider-hosting dock, r7k O-167 the dock Slider). Harness `release-10-1-5/critic-7{,-v1014}.html`.
// Rows bank to `docs/release-10.1.5/critic-7/<arm>/<project>/<cell>.json`; probes never fail on a finding.
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-7/${ARM || "branch"}/`, import.meta.url).pathname;

function dir(): string {
    const d = `${OUT}${test.info().project.name}`;
    mkdirSync(d, { recursive: true });
    return d;
}
function bank(name: string, rows: unknown): void {
    writeFileSync(`${dir()}/${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-7${ARM ? "-" + ARM : ""}.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}

/** The dock's state: plate corners and box, the active run, data-run-fits, collapsed. */
function read(page: Page, tag: string) {
    return page.evaluate((tag) => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const pr = plate.getBoundingClientRect();
        const run = dock.querySelector<HTMLElement>(".dock-run");
        const rcs = run && getComputedStyle(run);
        let span = 0;
        if (run) {
            const vert = dock.classList.contains("vertical");
            let a = Infinity, b = -Infinity;
            for (const s of run.children) {
                if (!(s instanceof HTMLElement) || s.offsetParent !== run) continue;
                const o = vert ? s.offsetTop : s.offsetLeft;
                a = Math.min(a, o);
                b = Math.max(b, o + (vert ? s.offsetHeight : s.offsetWidth));
            }
            span = b - a;
        }
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        const h = Math.min(plate.offsetWidth, plate.offsetHeight) / 2;
        const uniform = radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - h) <= 0.5);
        return {
            tag,
            collapsed: dock.classList.contains("collapsed"),
            morphing: dock.hasAttribute("data-morphing"),
            fits: dock.hasAttribute("data-run-fits"),
            plate: { w: +pr.width.toFixed(2), h: +pr.height.toFixed(2), lw: plate.offsetWidth, lh: plate.offsetHeight },
            radii,
            half: h,
            uniform,
            anims: plate.getAnimations().map((a) => (a as CSSAnimation).animationName),
            run: run && {
                active: run.classList.contains("is-active"),
                sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight,
                sl: Math.round(run.scrollLeft), st: Math.round(run.scrollTop), span,
                clip: [rcs!.borderTopLeftRadius, rcs!.borderTopRightRadius, rcs!.borderBottomRightRadius, rcs!.borderBottomLeftRadius],
            },
        };
    }, tag);
}

/** Record plate radii/box every frame for `ms`. */
function frames(page: Page, ms: number) {
    return page.evaluate(
        (ms) =>
            new Promise<unknown[]>((res) => {
                const out: unknown[] = [];
                const t0 = performance.now();
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                const thumb = dock.querySelector<HTMLElement>(".slider-thumb");
                const step = () => {
                    const t = performance.now() - t0;
                    const cs = getComputedStyle(plate);
                    const r = plate.getBoundingClientRect();
                    const th = thumb?.getBoundingClientRect();
                    out.push({
                        t: Math.round(t),
                        collapsed: dock.classList.contains("collapsed"),
                        w: +r.width.toFixed(2), h: +r.height.toFixed(2), x: +r.left.toFixed(2),
                        lw: plate.offsetWidth, lh: plate.offsetHeight,
                        radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(" "),
                        thumbX: th ? +(th.left + th.width / 2).toFixed(2) : undefined,
                        thumbW: th ? +th.width.toFixed(2) : undefined,
                    });
                    if (t < ms) requestAnimationFrame(step);
                    else res(out);
                };
                requestAnimationFrame(step);
            }),
        ms,
    );
}

const COARSE = { hasTouch: true, isMobile: true };

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`r7 ${pointer}`, () => {
        if (pointer === "coarse") test.use(COARSE);

        /* r7a · a collapse from a scrolled overflowing run: the inactive timeline (fix 6's L1 mechanism) must
           not hold a cut on the collapsed circle; expanding again restores the run's honest cap. */
        test(`r7a collapse from scrolled ${pointer}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                for (const pos of ["mid", "end"]) {
                    await open(page, "scene=dock&collapse=closed&maxw=220&kinds=" + encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,icon,tab:Settings"));
                    await page.mouse.move(2, 2);
                    rows.push(await read(page, `${width} ${pos} collapsed at mount`));
                    await page.evaluate(() => (window as any).__dock.expand());
                    await page.waitForTimeout(1500);
                    rows.push(await read(page, `${width} ${pos} expanded rest`));
                    await page.evaluate((pos) => {
                        const run = document.querySelector<HTMLElement>(".dock-run")!;
                        run.scrollLeft = pos === "end" ? run.scrollWidth : (run.scrollWidth - run.clientWidth) / 2;
                    }, pos);
                    await page.waitForTimeout(500);
                    rows.push(await read(page, `${width} ${pos} expanded scrolled`));
                    const fr = frames(page, 1600);
                    await page.evaluate(() => (window as any).__dock.collapse());
                    const f = await fr;
                    await page.waitForTimeout(400);
                    rows.push({ ...(await read(page, `${width} ${pos} collapsed after scrolled`)), frames: f.slice(-12) });
                    await page.waitForTimeout(1200);
                    rows.push(await read(page, `${width} ${pos} collapsed +1.2s`));
                    await page.evaluate(() => (window as any).__dock.expand());
                    await page.waitForTimeout(1500);
                    rows.push(await read(page, `${width} ${pos} re-expanded`));
                }
            }
            bank(`r7a-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7b · a layer switch between a layer that overflows and one that fits. */
        test(`r7b layer switch ${pointer}`, async ({ page }) => {
            test.setTimeout(180_000);
            const rows: unknown[] = [];
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=layers&maxw=260");
                await page.mouse.move(2, 2);
                rows.push(await read(page, `${width} wide rest`));
                await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-run")!;
                    run.scrollLeft = run.scrollWidth;
                });
                await page.waitForTimeout(500);
                rows.push(await read(page, `${width} wide end`));
                await page.evaluate(() => ((window as any).__layer.value = "narrow"));
                await page.waitForTimeout(400);
                rows.push(await read(page, `${width} narrow +0.4s`));
                await page.waitForTimeout(1200);
                rows.push(await read(page, `${width} narrow +1.6s`));
                await page.evaluate(() => ((window as any).__layer.value = "wide"));
                await page.waitForTimeout(400);
                rows.push(await read(page, `${width} wide again +0.4s`));
                await page.waitForTimeout(1200);
                rows.push(await read(page, `${width} wide again +1.6s`));
                await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-run")!;
                    run.scrollLeft = (run.scrollWidth - run.clientWidth) / 2;
                });
                await page.waitForTimeout(500);
                rows.push(await read(page, `${width} wide again mid`));
            }
            bank(`r7b-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7c · the vertical yield (round-6 ruling 1) and the horizontal fit edge, 1 px steps. */
        test(`r7c fit edge ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 600, height: 900 });
            for (let stageH = 300; stageH <= 420; stageH += 4) {
                await open(page, `scene=dock&orientation=vertical&stageH=${stageH}&kinds=icon,icon,icon,icon,icon,icon`);
                await page.mouse.move(590, 890);
                rows.push(await read(page, `v stage ${stageH}`));
            }
            await page.setViewportSize({ width: 1000, height: 600 });
            await open(page, "scene=dock&kinds=" + encodeURIComponent("tab:Home,icon,icon,icon,icon,tab:Settings"));
            const natural = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width);
            rows.push({ tag: "h natural", natural });
            for (let d = -16; d <= 6; d += 1) {
                const maxw = Math.round(natural) + d;
                await open(page, `scene=dock&maxw=${maxw}&kinds=` + encodeURIComponent("tab:Home,icon,icon,icon,icon,tab:Settings"));
                await page.mouse.move(2, 590);
                rows.push(await read(page, `h maxw ${maxw} (d ${d}) rest`));
                await page.evaluate(() => {
                    const run = document.querySelector<HTMLElement>(".dock-run")!;
                    run.scrollLeft = run.scrollWidth;
                });
                await page.waitForTimeout(400);
                rows.push(await read(page, `h maxw ${maxw} (d ${d}) end`));
            }
            bank(`r7c-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7f · O-161: a tap on the dock's DarkModeToggle (and a DockControl beside it) leaves no hover paint. */
        test(`r7f toggle tap ${pointer}`, async ({ page }) => {
            test.skip(pointer === "fine", "touch only");
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 390, height: 844 });
            await open(page, "scene=dock&kinds=icon,icon,dmt");
            const bg = (id: string) =>
                page.evaluate((id) => {
                    const el = document.querySelector<HTMLElement>(`[data-witness="${id}"]`)!;
                    const s = getComputedStyle(el);
                    return { id, hover: el.matches(":hover"), bg: s.backgroundColor, opacity: s.opacity, scale: s.scale, dark: document.documentElement.classList.contains("dark") };
                }, id);
            for (const id of ["S3", "S1"]) {
                const before = await bg(id);
                await page.locator(`[data-witness="${id}"]`).tap();
                await page.waitForTimeout(800);
                const after = await bg(id);
                rows.push({ id, before, after, stuck: before.bg !== after.bg || before.opacity !== after.opacity || before.scale !== after.scale });
            }
            bank(`r7f-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7g · O-162 the folded summary's focus ring, and O-177 Tab onto the folded face. */
        test(`r7g summary ring ${pointer}`, async ({ page }) => {
            test.setTimeout(120_000);
            const rows: unknown[] = [];
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=dock&collapse=closed&kinds=icon,icon,icon");
                await page.mouse.move(2, 2);
                const ring = (tag: string) =>
                    page.evaluate((tag) => {
                        const el = document.activeElement as HTMLElement;
                        const s = getComputedStyle(el);
                        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                        const r = el.getBoundingClientRect();
                        return {
                            tag,
                            active: el.className || el.tagName,
                            focusVisible: el.matches(":focus-visible"),
                            collapsed: dock.classList.contains("collapsed"),
                            expandedAttr: el.getAttribute("aria-expanded"),
                            outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} off ${s.outlineOffset}`,
                            boxShadow: s.boxShadow,
                            radius: s.borderTopLeftRadius,
                            box: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
                            plateRadius: getComputedStyle(plate).borderTopLeftRadius,
                            plateBox: { w: plate.offsetWidth, h: plate.offsetHeight },
                        };
                    }, tag);
                await page.locator("body").focus();
                for (let i = 0; i < 4; i += 1) {
                    await page.keyboard.press("Tab");
                    const on = await page.evaluate(() => !!document.activeElement?.closest(".glass-dock"));
                    if (on) break;
                }
                rows.push(await ring(`${width} Tab onto folded +0`));
                await page.waitForTimeout(1500);
                rows.push(await ring(`${width} Tab onto folded +1.5s`));
                const box = await page.locator(".glass-dock").boundingBox();
                if (box) await page.screenshot({ path: `${dir()}/r7g-${pointer}-${width}-tab.png`, clip: { x: box.x - 16, y: box.y - 16, width: box.width + 32, height: box.height + 32 } });
                // expand, focus a seat by keyboard, Escape folds
                await page.evaluate(() => (window as any).__dock.expand());
                await page.waitForTimeout(1300);
                await page.locator('[data-witness="S1"]').focus();
                await page.keyboard.press("Escape");
                await page.waitForTimeout(1600);
                rows.push(await ring(`${width} after Escape +1.6s`));
                const box2 = await page.locator(".glass-dock").boundingBox();
                if (box2) await page.screenshot({ path: `${dir()}/r7g-${pointer}-${width}-esc.png`, clip: { x: box2.x - 16, y: box2.y - 16, width: box2.width + 32, height: box2.height + 32 } });
            }
            bank(`r7g-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7h · O-176: a collapse="open" dock left untouched idles shut; again after a remount. */
        test(`r7h open idle ${pointer}`, async ({ page }) => {
            test.setTimeout(120_000);
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 1440, height: 800 });
            await open(page, "scene=dock&collapse=open&kinds=tab:Home,icon,icon");
            await page.mouse.move(2, 790);
            const st = (tag: string) => page.evaluate((tag) => ({ tag, collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed") }), tag);
            let prev = 700; // open() already waited 700 ms after mount
            for (const t of [1000, 3000, 5500, 8000]) {
                await page.waitForTimeout(t - prev);
                prev = t;
                rows.push(await st(`mount +${t}ms`));
            }
            await page.evaluate(() => ((window as any).__key.value += 1));
            await page.waitForTimeout(5500);
            rows.push(await st("remount +5.5s"));
            await page.waitForTimeout(2500);
            rows.push(await st("remount +8s"));
            bank(`r7h-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7i · O-177: a press on a seat during the expand activates it exactly once. */
        test(`r7i press mid-expand ${pointer}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 1440, height: 800 });
            for (const delay of [0, 50, 100, 160, 240, 340, 480, 700, 1200]) {
                await open(page, "scene=dock&collapse=closed&kinds=tab:Home,icon,icon,icon");
                await page.mouse.move(2, 790);
                const sum = await page.locator(".dock-layer--summary").boundingBox();
                if (pointer === "coarse") await page.touchscreen.tap(sum!.x + sum!.width / 2, sum!.y + sum!.height / 2);
                else await page.mouse.click(sum!.x + sum!.width / 2, sum!.y + sum!.height / 2);
                await page.waitForTimeout(delay);
                const at = await page.evaluate(() => {
                    const el = document.querySelector<HTMLElement>('[data-witness="S2"]')!;
                    const r = el.getBoundingClientRect();
                    const x = r.left + r.width / 2, y = r.top + r.height / 2;
                    const hit = document.elementFromPoint(x, y);
                    return { x, y, hitIsSeat: !!hit && el.contains(hit), inert: !!el.closest("[inert]"), morphing: document.querySelector(".glass-dock")!.hasAttribute("data-morphing") };
                });
                if (pointer === "coarse") await page.touchscreen.tap(at.x, at.y);
                else await page.mouse.click(at.x, at.y);
                await page.waitForTimeout(1500);
                const n = await page.evaluate(() => ((window as any).__clicks.S2 ?? 0) as number);
                rows.push({ delay, ...at, clicks: n, once: n === 1 });
            }
            bank(`r7i-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7j · O-166: the Slider-hosting dock (parkway composition) expanded and at rest, both themes, and its
           collapse/expand frames. */
        test(`r7j slider dock ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            const rows: unknown[] = [];
            const kinds = encodeURIComponent("tab:Home,ctl:Near,ctl:Far,sep,slider,ctl:Passport,ctl:About,dmt");
            for (const width of pointer === "fine" ? [1440, 844] : [390, 844]) {
                await page.setViewportSize({ width, height: 800 });
                for (const dark of ["0", "1"]) {
                    for (const collapse of ["false", "open"]) {
                        await open(page, `scene=dock&backdrop=static&collapse=${collapse}&dark=${dark}&kinds=${kinds}`);
                        await page.mouse.move(2, 790);
                        rows.push(await read(page, `${width} dark ${dark} collapse ${collapse} rest`));
                        await page.locator('[data-witness="S8"]').hover();
                        await page.waitForTimeout(400);
                        rows.push(await read(page, `${width} dark ${dark} collapse ${collapse} hover trailing`));
                        await page.mouse.move(2, 790);
                        if (collapse === "open") {
                            const fc = frames(page, 1500);
                            await page.evaluate(() => (window as any).__dock.collapse());
                            const c = await fc;
                            const fe = frames(page, 1500);
                            await page.evaluate(() => (window as any).__dock.expand());
                            const e = await fe;
                            await page.waitForTimeout(300);
                            rows.push({ ...(await read(page, `${width} dark ${dark} re-expanded`)), collapseFrames: c, expandFrames: e });
                        }
                    }
                }
            }
            bank(`r7j-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });

        /* r7k · O-167: the dock Slider's fill ink in both themes, and drag tracking. */
        test(`r7k dock slider ${pointer}`, async ({ page }) => {
            test.setTimeout(180_000);
            const rows: unknown[] = [];
            await page.setViewportSize({ width: 1440, height: 800 });
            for (const dark of ["0", "1"]) {
                await open(page, `scene=dock&backdrop=static&collapse=false&dark=${dark}&step=1&kinds=` + encodeURIComponent("tab:Home,sep,slider,icon,dmt"));
                await page.mouse.move(2, 790);
                const ink = await page.evaluate(() => {
                    const rg = document.querySelector<HTMLElement>(".slider-range")!;
                    const s = getComputedStyle(rg);
                    const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                    const th = document.querySelector<HTMLElement>(".slider-thumb")!;
                    return {
                        rangeBg: s.backgroundColor, rangeImg: s.backgroundImage.slice(0, 200), tint: s.getPropertyValue("--liquid-fill-tint").trim(),
                        rangeTransition: `${s.transitionProperty} / ${s.transitionDuration}`,
                        thumbTransition: `${getComputedStyle(th).transitionProperty} / ${getComputedStyle(th).transitionDuration}`,
                        plateBg: getComputedStyle(plate).backgroundColor,
                    };
                });
                const box = await page.locator('[data-witness="S3"]').boundingBox();
                await page.screenshot({ path: `${dir()}/r7k-${pointer}-dark${dark}.png`, clip: { x: box!.x - 20, y: box!.y - 10, width: box!.width + 40, height: box!.height + 20 } });
                // drag: pointer down on the thumb, then 24 moves of 4 px, one per frame; read the thumb each frame
                const th = await page.locator(".slider-thumb").boundingBox();
                const tr = await page.locator(".slider-track").boundingBox();
                const lag: unknown[] = [];
                let x = th!.x + th!.width / 2;
                const y = th!.y + th!.height / 2;
                if (pointer === "fine") {
                    await page.mouse.move(x, y);
                    await page.mouse.down();
                    for (let i = 0; i < 24; i += 1) {
                        x = Math.min(x + 4, tr!.x + tr!.width - 2);
                        await page.mouse.move(x, y);
                        const r = await page.evaluate(
                            () =>
                                new Promise<{ thumb: number; rangeEnd: number }>((res) =>
                                    requestAnimationFrame(() => {
                                        const t = document.querySelector<HTMLElement>(".slider-thumb")!.getBoundingClientRect();
                                        const g = document.querySelector<HTMLElement>(".slider-range")!.getBoundingClientRect();
                                        res({ thumb: t.left + t.width / 2, rangeEnd: g.right });
                                    }),
                                ),
                        );
                        lag.push({ px: +x.toFixed(2), thumb: +r.thumb.toFixed(2), d: +(x - r.thumb).toFixed(2), rangeEnd: +r.rangeEnd.toFixed(2) });
                    }
                    await page.mouse.up();
                }
                rows.push({ dark, ink, lag });
            }
            bank(`r7k-${pointer}`, rows);
            expect(rows.length).toBeGreaterThan(0);
        });
    });
}

/* r7d · O-156/O-165: hovering a seat in a wide fit-content dock paints nothing past the plate, and (O-165)
   nothing across the dock beyond the hovered control's own pill. Pixel delta hover vs rest. */
function decode(buf: Buffer) {
    return PNG.sync.read(buf);
}
for (const dark of ["0", "1"]) test(`r7d hover paint dark ${dark}`, async ({ page }) => {
    test.setTimeout(300_000);
    const rows: unknown[] = [];
    for (const width of [430, 1440, 1800]) {
        await page.setViewportSize({ width, height: 700 });
        for (const [name, kinds] of [
            ["parkway", "ctl:Dark mode,sep,seg,sep,seg,icon,dmt"],
            ["daraksha", "ctl:Dark mode,icon"],
            ["daraksha3", "ctl:Play,ctl:Dark mode,icon"],
        ] as const) {
            await open(page, `scene=dock&collapse=false&dark=${dark}&kinds=${encodeURIComponent(kinds)}`);
            await page.mouse.move(2, 690);
            await page.waitForTimeout(300);
            const pb = await page.evaluate(() => {
                const p = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!.getBoundingClientRect();
                return { x: p.left, y: p.top, w: p.width, h: p.height };
            });
            const M = 40;
            const clip = { x: Math.max(0, pb.x - M), y: Math.max(0, pb.y - M), width: pb.w + 2 * M, height: pb.h + 2 * M };
            const rest = decode(await page.screenshot({ clip }));
            const ids = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>(".glass-dock [data-witness]")].map((e) => e.dataset.witness!).filter((x) => x.startsWith("S")));
            for (const id of ids) {
                const loc = page.locator(`[data-witness="${id}"]`).first();
                const sb = await loc.boundingBox();
                if (!sb) continue;
                await page.mouse.move(sb.x + sb.width * 0.5, sb.y + sb.height * 0.5, { steps: 4 });
                await page.waitForTimeout(500);
                const meta = await page.evaluate((id) => {
                    const el = document.querySelector<HTMLElement>(`[data-witness="${id}"]`)!;
                    const btn = (el.matches("button") ? el : el.querySelector("button")) as HTMLElement;
                    const b = getComputedStyle(btn, "::before");
                    const hovered = [...document.querySelectorAll<HTMLElement>(".glass-dock *, .glass-dock")].filter((e) => e.matches(":hover"));
                    const lit = hovered
                        .map((e) => ({ e, s: getComputedStyle(e, "::before") }))
                        .filter(({ s }) => s.content !== "none" && Number.parseFloat(s.opacity) > 0.001 && s.backgroundImage !== "none")
                        .map(({ e, s }) => {
                            const r = e.getBoundingClientRect();
                            return { cls: String(e.className).slice(0, 80), pos: getComputedStyle(e).position, op: s.opacity, w: +r.width.toFixed(1), h: +r.height.toFixed(1), radius: s.borderTopLeftRadius };
                        });
                    return { pos: getComputedStyle(btn).position, beforeOpacity: b.opacity, beforeImg: b.backgroundImage.slice(0, 60), lit };
                }, id);
                const shot = decode(await page.screenshot({ clip }));
                // changed pixels by band: outside the plate bbox, inside the plate but > 6 px from the seat, near the seat
                let outside = 0, farInside = 0, near = 0, maxOut = 0;
                const sx0 = sb.x - clip.x - 6, sx1 = sb.x + sb.width - clip.x + 6, sy0 = sb.y - clip.y - 6, sy1 = sb.y + sb.height - clip.y + 6;
                const px0 = pb.x - clip.x, px1 = pb.x + pb.w - clip.x, py0 = pb.y - clip.y, py1 = pb.y + pb.h - clip.y;
                for (let yy = 0; yy < shot.height; yy += 1)
                    for (let xx = 0; xx < shot.width; xx += 1) {
                        const i = (yy * shot.width + xx) * 4;
                        const d = Math.max(Math.abs(shot.data[i] - rest.data[i]), Math.abs(shot.data[i + 1] - rest.data[i + 1]), Math.abs(shot.data[i + 2] - rest.data[i + 2]));
                        if (d < 12) continue;
                        const inSeat = xx >= sx0 && xx <= sx1 && yy >= sy0 && yy <= sy1;
                        const inPlate = xx >= px0 - 1 && xx <= px1 + 1 && yy >= py0 - 1 && yy <= py1 + 1;
                        if (!inPlate) { outside += 1; maxOut = Math.max(maxOut, d); }
                        else if (inSeat) near += 1;
                        else farInside += 1;
                    }
                writeFileSync(`${dir()}/r7d-${name}-${width}-dark${dark}-${id}.png`, PNG.sync.write(shot));
                rows.push({ width, name, id, seat: sb, plate: pb, outside, maxOut, farInside, near, ...meta });
            }
            writeFileSync(`${dir()}/r7d-${name}-${width}-dark${dark}-rest.png`, PNG.sync.write(rest));
        }
    }
    bank(`r7d-dark${dark}`, rows);
    expect(rows.length).toBeGreaterThan(0);
});

/* r7e · O-157: a static-backdrop dock's plate under an ancestor `--glass-veil-ink`, beside the live arm. */
test(`r7e static veil ink`, async ({ page }) => {
    const rows: unknown[] = [];
    await page.setViewportSize({ width: 1440, height: 600 });
    for (const dark of ["0", "1"])
        for (const backdrop of ["static", "live"])
            for (const ink of ["", "oklch(55% 0.2 145)", "oklch(55% 0.2 25)"]) {
                await open(page, `scene=dock&collapse=false&backdrop=${backdrop}&dark=${dark}&kinds=icon,icon,icon${ink ? "&ink=" + encodeURIComponent(ink) : ""}`);
                rows.push(
                    await page.evaluate(
                        ({ dark, backdrop, ink }) => {
                            const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                            const s = getComputedStyle(plate);
                            return { dark, backdrop, ink, bg: s.backgroundColor, level: s.getPropertyValue("--glass-level").trim(), veilInk: s.getPropertyValue("--glass-veil-ink").trim() };
                        },
                        { dark, backdrop, ink },
                    ),
                );
            }
    bank("r7e", rows);
    expect(rows.length).toBeGreaterThan(0);
});

/* r7l · a run whose only child is a DockLayerGroup wider than the port: where it rests, and the first seat. */
for (const pointer of ["fine", "coarse"] as const) test.describe(`r7l ${pointer}`, () => {
    if (pointer === "coarse") test.use(COARSE);
    test(`r7l layered rest ${pointer}`, async ({ page }) => {
        const rows: unknown[] = [];
        for (const width of [390, 1440]) {
            await page.setViewportSize({ width, height: 800 });
            await open(page, "scene=layers&maxw=260");
            await page.mouse.move(2, 2);
            await page.waitForTimeout(600);
            const look = (tag: string) =>
                page.evaluate((tag) => {
                    const run = document.querySelector<HTMLElement>(".dock-run")!;
                    const rr = run.getBoundingClientRect();
                    const rs = getComputedStyle(run);
                    const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]')!.getBoundingClientRect();
                    const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                    const kids = [...run.children].map((c) => `${(c as HTMLElement).className}`.slice(0, 40) + ` snap=${getComputedStyle(c).scrollSnapAlign} w=${(c as HTMLElement).offsetWidth} x=${(c as HTMLElement).offsetLeft}`);
                    return {
                        tag, sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, snap: rs.scrollSnapType, pad: rs.padding,
                        s1Left: +(s1.left - rr.left).toFixed(2), radii: getComputedStyle(plate).borderRadius, kids,
                        before: getComputedStyle(run, "::before").width + " m " + getComputedStyle(run, "::before").marginInlineStart,
                    };
                }, tag);
            rows.push(await look(`${width} rest`));
            await page.evaluate(() => (document.querySelector<HTMLElement>(".dock-run")!.scrollLeft = 0));
            await page.waitForTimeout(600);
            rows.push(await look(`${width} after scrollLeft=0`));
            await page.evaluate(() => {
                const r = document.querySelector<HTMLElement>(".dock-run")!;
                r.scrollLeft = r.scrollWidth;
            });
            await page.waitForTimeout(600);
            rows.push(await look(`${width} after scrollLeft=max`));
            // Mobile WebKit has no wheel (Playwright throws): the wheel row is fine-pointer or Chromium only.
            if (pointer === "fine" || test.info().project.name !== "webkit") {
                await page.mouse.move(2, 2);
                const box = await page.locator(".dock-run").boundingBox();
                await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
                await page.mouse.wheel(400, 0);
                await page.waitForTimeout(900);
                rows.push(await look(`${width} after wheel +400`));
            }
        }
        bank(`r7l-${pointer}`, rows);
        expect(rows.length).toBeGreaterThan(0);
    });
});
