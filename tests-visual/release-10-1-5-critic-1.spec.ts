// glass-ui 10.1.5 — critic round 1's probes (adversarial). Each test READS layout and
// computed style over `release-10-1-5/critic-1.html` and writes its rows to
// docs/release-10.1.5/critic-1/<project>/<test>.json; the critique reads those rows. Few
// hard assertions: a probe that throws loses its rows.
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../docs/release-10.1.5/critic-1/", import.meta.url).pathname;

function bank(name: string, rows: unknown): void {
    const dir = `${OUT}${test.info().project.name}/`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-1.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await settle(page, 600);
}

async function settle(page: Page, ms = 400): Promise<void> {
    await page.evaluate(
        () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))),
    );
    await page.waitForTimeout(ms);
}

/** The plate, the runs, and every seat's ring against the active run's clip. */
function readDock(page: Page, tag: string) {
    return page.evaluate((tag) => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const pr = plate.getBoundingClientRect();
        const run = dock.querySelector<HTMLElement>(".dock-run.is-active") ?? dock.querySelector<HTMLElement>(".dock-run");
        const rr = run?.getBoundingClientRect();
        const rcs = run ? getComputedStyle(run) : null;
        const probe = document.createElement("div");
        probe.style.cssText = "position:absolute;inline-size:var(--dock-ring-reserve,0px)";
        (run ?? dock).append(probe);
        const ring = probe.getBoundingClientRect().width;
        probe.remove();
        const seats = [...dock.querySelectorAll<HTMLElement>(".dock-run.is-active button, .dock-run.is-active [role=button]")].map((el) => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            const sc = s.scale === "none" ? 1 : Number.parseFloat(s.scale);
            const ink = ring * sc;
            return {
                label: el.getAttribute("aria-label"),
                scale: s.scale,
                focus: el.matches(":focus-visible"),
                shadow: s.boxShadow.slice(0, 80),
                // ring ink clearance against the run's clip box (negative = clipped)
                clearL: rr ? r.left - ink - rr.left : null,
                clearR: rr ? rr.right - (r.right + ink) : null,
                clearT: rr ? r.top - ink - rr.top : null,
                clearB: rr ? rr.bottom - (r.bottom + ink) : null,
            };
        });
        return {
            tag,
            cls: dock.className,
            morphing: dock.hasAttribute("data-morphing"),
            cross: dock.style.getPropertyValue("--dock-plate-cross-px"),
            w: pr.width,
            h: pr.height,
            plateW: plate.offsetWidth,
            plateH: plate.offsetHeight,
            radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
            anims: plate.getAnimations().map((a) => (a as CSSAnimation).animationName + ":" + a.playState),
            ring,
            run: run
                ? {
                      sw: run.scrollWidth,
                      cw: run.clientWidth,
                      sh: run.scrollHeight,
                      ch: run.clientHeight,
                      sl: run.scrollLeft,
                      st: run.scrollTop,
                      pad: rcs!.padding,
                      margin: rcs!.margin,
                      rect: [rr!.left, rr!.top, rr!.width, rr!.height],
                  }
                : null,
            runs: [...dock.querySelectorAll<HTMLElement>(".dock-run")].map((r) => ({
                active: r.classList.contains("is-active"),
                sw: r.scrollWidth,
                cw: r.clientWidth,
                tl: getComputedStyle(r).scrollTimelineName,
            })),
            seats,
        };
    }, tag);
}

const WIDTHS = [320, 390, 430, 844, 1440];

for (const coarse of [false, true]) {
    test.describe(coarse ? "coarse" : "fine", () => {
        if (coarse) test.use({ hasTouch: true, isMobile: true });
        test(`dock postures ${coarse ? "coarse" : "fine"}`, async ({ page }) => {
            test.setTimeout(600_000);
            const rows: unknown[] = [];
            for (const width of WIDTHS) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=dock");
                rows.push({ width, coarseMatch: await page.evaluate(() => matchMedia("(pointer: coarse)").matches), ...(await readDock(page, "rest")) });
                for (const label of ["Menu", "Seat 1", "Seat 2", "Seat 3"]) {
                    await page.locator(`.glass-dock [aria-label="${label}"]`).first().hover();
                    await settle(page, 500);
                    rows.push({ width, ...(await readDock(page, `hover ${label}`)) });
                }
                // press and hold on the trailing seat
                const box = (await page.locator('.glass-dock [aria-label="Seat 3"]').boundingBox())!;
                await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                await page.mouse.down();
                await settle(page, 350);
                rows.push({ width, ...(await readDock(page, "press Seat 3")) });
                await page.mouse.up();
                await page.mouse.move(2, 2);
                await settle(page, 500);
                // keyboard focus ring on each seat (pointer off)
                await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
                for (let i = 0; i < 5; i++) {
                    await page.keyboard.press("Tab");
                    await settle(page, 300);
                    rows.push({ width, ...(await readDock(page, `tab ${i + 1}`)) });
                }
                // focus ring AND hover on the trailing seat
                await page.locator('.glass-dock [aria-label="Seat 3"]').focus();
                await page.keyboard.press("Shift+Tab");
                await page.keyboard.press("Tab");
                await page.locator('.glass-dock [aria-label="Seat 3"]').hover();
                await settle(page, 500);
                rows.push({ width, ...(await readDock(page, "focus+hover Seat 3")) });
                await page.mouse.move(2, 2);
                // flex (non fit-content) dock
                await open(page, "scene=dock&fit=0");
                rows.push({ width, ...(await readDock(page, "rest fit=0")) });
                bank(`dock-postures-${coarse ? "coarse" : "fine"}`, rows);
            }
            bank(`dock-postures-${coarse ? "coarse" : "fine"}`, rows);
        });

        test(`dock overflow, collapse, vertical, shapes ${coarse ? "coarse" : "fine"}`, async ({ page }) => {
            test.setTimeout(240_000);
            const rows: unknown[] = [];
            for (const width of [320, 390, 844]) {
                for (const dir of ["ltr", "rtl"]) {
                    await page.setViewportSize({ width, height: 800 });
                    await open(page, `scene=dock&seats=14&dir=${dir}`);
                    rows.push({ width, dir, ...(await readDock(page, "overflow scroll start")) });
                    const sgn = dir === "rtl" ? -1 : 1;
                    await page.evaluate((sgn) => {
                        const r = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                        r.scrollTo({ left: (sgn * (r.scrollWidth - r.clientWidth)) / 2, behavior: "instant" });
                    }, sgn);
                    await settle(page, 600);
                    rows.push({ width, dir, ...(await readDock(page, "overflow scroll mid")) });
                    await page.evaluate((sgn) => {
                        const r = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                        r.scrollTo({ left: sgn * (r.scrollWidth - r.clientWidth), behavior: "instant" });
                    }, sgn);
                    await settle(page, 600);
                    rows.push({ width, dir, ...(await readDock(page, "overflow scroll end")) });
                    await page.evaluate(() => {
                        const r = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                        r.scrollTo({ left: 0, behavior: "instant" });
                    });
                    await settle(page, 600);
                    rows.push({ width, dir, ...(await readDock(page, "overflow back to start")) });
                }
                // RTL rest, no overflow
                await open(page, "scene=dock&dir=rtl");
                rows.push({ width, dir: "rtl", ...(await readDock(page, "rtl rest")) });
                // collapsed and the morph both ways, sampled per frame
                await open(page, "scene=dock&collapse=closed");
                rows.push({ width, ...(await readDock(page, "collapsed rest")) });
                await open(page, "scene=dock&collapse=open");
                rows.push({ width, ...(await readDock(page, "expanded rest")) });
                const frames = await page.evaluate(async () => {
                    const dock = (window as unknown as { __dock: { collapse(): void; expand(): void } }).__dock;
                    const el = document.querySelector<HTMLElement>(".glass-dock")!;
                    const plate = el.querySelector<HTMLElement>(":scope > .dock-plate")!;
                    const out: unknown[] = [];
                    const sample = async (phase: string, n: number) => {
                        for (let i = 0; i < n; i++) {
                            await new Promise((r) => requestAnimationFrame(r));
                            const cs = getComputedStyle(plate);
                            const r = plate.getBoundingClientRect();
                            out.push({
                                phase,
                                i,
                                morphing: el.hasAttribute("data-morphing"),
                                cls: el.className.includes("collapsed") ? "C" : "E",
                                w: Math.round(r.width * 10) / 10,
                                h: Math.round(r.height * 10) / 10,
                                ow: plate.offsetWidth,
                                oh: plate.offsetHeight,
                                cross: el.style.getPropertyValue("--dock-plate-cross-px"),
                                radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(" | "),
                            });
                        }
                    };
                    dock.collapse();
                    await sample("collapse", 70);
                    dock.expand();
                    await sample("expand", 70);
                    return out;
                });
                rows.push({ width, tag: "morph frames", frames });
                for (const shape of ["rounded", "card"]) {
                    await open(page, `scene=dock&shape=${shape}`);
                    rows.push({ width, shape, ...(await readDock(page, `rest shape ${shape}`)) });
                    await open(page, `scene=dock&shape=${shape}&seats=14`);
                    rows.push({ width, shape, ...(await readDock(page, `overflow shape ${shape}`)) });
                }
            }
            // vertical: rest, overflow start/end
            await page.setViewportSize({ width: 1280, height: 800 });
            await open(page, "scene=dock&orientation=vertical");
            rows.push({ vertical: true, ...(await readDock(page, "vertical rest")) });
            await page.locator('.glass-dock [aria-label="Seat 3"]').hover();
            await settle(page, 500);
            rows.push({ vertical: true, ...(await readDock(page, "vertical hover trailing")) });
            await open(page, "scene=dock&orientation=vertical&seats=20&stageH=420");
            rows.push({ vertical: true, ...(await readDock(page, "vertical overflow start")) });
            await page.evaluate(() => {
                const r = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                r.scrollTo({ top: r.scrollHeight, behavior: "instant" });
            });
            await settle(page, 600);
            rows.push({ vertical: true, ...(await readDock(page, "vertical overflow end")) });
            bank(`dock-overflow-${coarse ? "coarse" : "fine"}`, rows);
        });

        test(`type and menu ${coarse ? "coarse" : "fine"}`, async ({ page }) => {
            const rows: unknown[] = [];
            for (const width of [390, 1280]) {
                await page.setViewportSize({ width, height: 800 });
                await open(page, "scene=type");
                rows.push({
                    width,
                    coarse: await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
                    ...(await page.evaluate(() => {
                        const px = (sel: string) => {
                            const el = document.querySelector(sel);
                            return el ? Number.parseFloat(getComputedStyle(el).fontSize) : null;
                        };
                        const hgt = (sel: string) => document.querySelector(sel)?.getBoundingClientRect().height ?? null;
                        return {
                            subtitle: px('[data-witness="subtitle"]'),
                            bar: px('[data-witness="bar"] input'),
                            barH: hgt('[data-witness="bar"]'),
                            pill: px('input[data-witness="pill"]'),
                            btnMd: px('[data-witness="btn-md"]'),
                            btnSm: px('[data-witness="btn-sm"]'),
                            btnMdH: hgt('[data-witness="btn-md"]'),
                            btnSmH: hgt('[data-witness="btn-sm"]'),
                            menuLabel: px('[data-witness="mlabel"]'),
                            menuItem: px('[data-witness="mitem"]'),
                            menuShortcut: px('[data-witness="mshort"]'),
                        };
                    })),
                });
            }
            bank(`type-${coarse ? "coarse" : "fine"}`, rows);

            const menu: unknown[] = [];
            await page.setViewportSize({ width: 390, height: 800 });
            await open(page, "scene=menu");
            await page.locator('[data-witness="sub-trigger"]').hover();
            await settle(page, 400);
            menu.push(
                await page.evaluate(() => {
                    const probe = document.createElement("div");
                    probe.style.cssText = "position:absolute;inline-size:var(--icon-label-gap, 0px)";
                    document.body.append(probe);
                    const token = probe.getBoundingClientRect().width;
                    probe.remove();
                    const rows = [...document.querySelectorAll<HTMLElement>("[data-witness$=item], [data-witness=sub-trigger]")].map((it) => {
                        const icon = it.querySelector("[data-part=icon]")?.getBoundingClientRect();
                        const label = it.querySelector("[data-part=label]")?.getBoundingClientRect();
                        const ind = it.querySelector(".menu__indicator")?.getBoundingClientRect();
                        const chev = it.querySelector(".menu__sub-chevron")?.getBoundingClientRect();
                        const strong = it.querySelector("[data-part=strong]")?.getBoundingClientRect();
                        let textRight: number | null = null;
                        const tn = [...it.childNodes].find((n) => n.nodeType === 3 && n.textContent!.trim());
                        if (tn) {
                            const rg = document.createRange();
                            rg.selectNodeContents(tn);
                            textRight = rg.getBoundingClientRect().right;
                        }
                        return {
                            id: it.dataset.witness,
                            gapCss: getComputedStyle(it).columnGap,
                            iconToLabel: icon && label ? label.left - icon.right : null,
                            indicatorToIcon: ind && icon ? icon.left - ind.right : null,
                            labelToChevron: label && chev ? chev.left - label.right : null,
                            textToStrong: strong && textRight !== null ? strong.left - textRight : null,
                            itemH: it.getBoundingClientRect().height,
                        };
                    });
                    return { token, rows };
                }),
            );
            bank(`menu-${coarse ? "coarse" : "fine"}`, menu);
        });
    });
}

test("slider rungs and edges", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1400 });
    await open(page, "scene=slider");
    const read = () =>
        page.evaluate(() =>
            [...document.querySelectorAll<HTMLElement>("[data-witness]")].flatMap((row) => {
                const thumbEl = row.querySelector<HTMLElement>(".slider-thumb");
                if (!thumbEl) return [];
                const b = (el: Element | null) => {
                    if (!el) return null;
                    const r = el.getBoundingClientRect();
                    return { l: +r.left.toFixed(2), r: +r.right.toFixed(2), t: +r.top.toFixed(2), b: +r.bottom.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
                };
                const cs = getComputedStyle(thumbEl);
                const range = row.querySelector(".slider-range");
                const track = row.querySelector(".slider-track");
                const rcs = range ? getComputedStyle(range) : null;
                return [
                    {
                        id: row.dataset.witness,
                        value: thumbEl.getAttribute("aria-valuenow"),
                        thumb: b(thumbEl),
                        range: b(range),
                        track: b(track),
                        lane: b(row.querySelector(".slider-lane")),
                        opacity: cs.opacity,
                        bg: cs.backgroundColor,
                        shadow: cs.boxShadow.slice(0, 60),
                        rangeBg: rcs?.backgroundColor,
                        rangeOpacity: rcs?.opacity,
                        trackOverflow: track ? getComputedStyle(track).overflow : null,
                        rootOpacity: getComputedStyle(row.querySelector(".glass-slider")!).opacity,
                        trackOpacity: track ? getComputedStyle(track).opacity : null,
                        thumbFilter: cs.filter,
                    },
                ];
            }),
        );
    const rows: unknown[] = [{ tag: "static", rows: await read() }];
    // drag to each end and beyond
    const track = (await page.locator('[data-witness="drag"] .slider-track').boundingBox())!;
    const y = track.y + track.height / 2;
    await page.mouse.move(track.x + track.width / 2, y);
    await page.mouse.down();
    await page.mouse.move(track.x - 60, y, { steps: 8 });
    await settle(page, 300);
    rows.push({ tag: "drag held at min", rows: (await read()).filter((r) => r.id === "drag") });
    await page.mouse.move(track.x + track.width + 60, y, { steps: 12 });
    await settle(page, 300);
    rows.push({ tag: "drag held at max", rows: (await read()).filter((r) => r.id === "drag") });
    await page.mouse.up();
    await settle(page, 600);
    rows.push({ tag: "drag released at max", rows: (await read()).filter((r) => r.id === "drag") });
    // keyboard to min
    await page.locator('[data-witness="drag"] .slider-thumb').focus();
    await page.keyboard.press("Home");
    await settle(page, 600);
    rows.push({ tag: "Home", rows: (await read()).filter((r) => r.id === "drag") });
    bank("slider", rows);
    await open(page, "scene=slider&dark=1");
    bank("slider-dark", await read());
});
