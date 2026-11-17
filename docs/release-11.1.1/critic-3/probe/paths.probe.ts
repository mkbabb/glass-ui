// Critic 3 probe, readings only (no cell here fails on what it reads).
//
//   paths  the dock Select and the dock DropdownMenu closed by every path a person has:
//          a tap outside, Escape, a tap on the trigger, a tap on the current item and a
//          tap on another item. Every exit frame's form, material attribute, backdrop
//          filter, fill, place and width are read against the open surface at rest.
//   press  under reduced motion, what a held press does to the size of a dock trigger,
//          a dock seat and a Button: the computed scale on every frame of the hold.
import { test, type Page } from "@playwright/test";
import { exitOf, gotoReady, isPhone, markFilm, press, pressOn, startFilm, stopFilm } from "../../../../tests-visual/release-11-1-1/film";

const EXITS = "/tests-visual/release-11-1-1/exits-harness.html";
const REDUCE = "/tests-visual/release-11-1-1/reduce-harness.html";

async function ready(page: Page, url: string): Promise<void> {
    await gotoReady(page, url);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
}

const surfaces = [
    {
        name: "Select",
        trigger: '[data-testid="x-select"]',
        content: '[data-testid="x-select-content"]',
        current: '[data-testid="x-opt-Picker"]',
        other: '[data-testid="x-opt-Gradient"]',
    },
    {
        name: "DropdownMenu",
        trigger: '[data-testid="x-menu"]',
        content: '[data-testid="x-menu-content"]',
        current: "",
        other: '[data-testid="x-item-Share"]',
    },
];

for (const s of surfaces) {
    for (const path of ["outside", "escape", "trigger", "current", "other"] as const) {
        test(`paths · ${s.name} · ${path}`, async ({ page }, info) => {
            const project = info.project.name;
            test.skip(path === "current" && !s.current, "a menu has no current item");
            test.skip(project === "webkit-phone" && (path === "outside" || path === "trigger"), "Playwright WebKit's tap reaches no outside-press listener");
            await ready(page, EXITS);
            const tb = (await page.locator(s.trigger).boundingBox())!;
            await pressOn(page, project, s.trigger);
            await page.locator(`${s.content}[data-state="open"]`).waitFor();
            await page.waitForTimeout(700);
            const plate = await page.locator(s.content).getAttribute("data-plate");
            await startFilm(page, s.content);
            await markFilm(page);
            if (path === "outside") await press(page, project, 195, 300);
            else if (path === "escape") await page.keyboard.press("Escape");
            else if (path === "trigger") await press(page, project, tb.x + tb.width / 2, tb.y + tb.height / 2);
            else await pressOn(page, project, path === "current" ? s.current : s.other);
            const film = await stopFilm(page, 1000);
            const { rest, exit, gone } = exitOf(film);
            const vh = page.viewportSize()!.height;
            const differs = exit.filter((f) => f.form !== rest.form || f.surface !== rest.surface || f.bf !== rest.bf || f.bg !== rest.bg);
            let rise = 0;
            let jump = 0;
            let prev = rest.y!;
            for (const f of exit) {
                rise = Math.max(rise, rest.y! - f.y!);
                jump = Math.max(jump, Math.abs(f.y! - prev));
                prev = f.y!;
            }
            const read = {
                project,
                surface: s.name,
                path,
                rest: { form: rest.form, surface: rest.surface, plate, bf: rest.bf, bg: rest.bg, x: Math.round(rest.x!), y: Math.round(rest.y!), w: Math.round(rest.w!), h: Math.round(rest.h!) },
                gone,
                frames: exit.length,
                lastMs: exit.length ? Math.round(exit[exit.length - 1].t - film.mark) : 0,
                differs: differs.length,
                firstDiffer: differs[0] ? { t: Math.round(differs[0].t - film.mark), form: differs[0].form, surface: differs[0].surface, bf: differs[0].bf, bg: differs[0].bg, x: Math.round(differs[0].x!), y: Math.round(differs[0].y!), w: Math.round(differs[0].w!) } : null,
                rise: Math.round(rise),
                largestStep: Math.round(jump),
                xShift: Math.round(Math.max(0, ...exit.map((f) => Math.abs(f.x! - rest.x!)))),
                wShift: Math.round(Math.max(0, ...exit.map((f) => Math.abs(f.w! - rest.w!)))),
                table: exit.map((f) => [Math.round(f.t - film.mark), +(f.op ?? 0).toFixed(3), Math.round(f.y!), +(((f.op ?? 0) * Math.max(0, Math.min(f.y! + f.h!, vh) - f.y!)) / rest.h!).toFixed(3)]),
            };
            console.log("PATHS " + JSON.stringify(read));
            await info.attach("paths", { body: JSON.stringify(read), contentType: "application/json" });
        });
    }
}

const holds = [
    { name: "dock trigger (Select)", url: EXITS, sel: '[data-testid="x-select"]' },
    { name: "dock trigger (menu)", url: EXITS, sel: '[data-testid="x-menu"]' },
    { name: "dock seat", url: REDUCE, sel: '[data-testid="r-seat-2"]' },
    { name: "Button", url: "/containers/command", sel: "button:has-text('Open palette')" },
];

for (const motion of ["reduce", "no-preference"] as const) {
    for (const h of holds) {
        test(`press · ${h.name} held · ${motion}`, async ({ page }, info) => {
            const project = info.project.name;
            test.skip(project === "webkit-phone", "Playwright WebKit's touchscreen cannot hold a press");
            await page.emulateMedia({ reducedMotion: motion });
            if (h.url.startsWith("/tests-visual")) await ready(page, h.url);
            else {
                await gotoReady(page, h.url);
                await page.waitForTimeout(800);
            }
            await page.locator(h.sel).first().scrollIntoViewIfNeeded();
            const box = (await page.locator(h.sel).first().boundingBox())!;
            const x = box.x + box.width / 2;
            const y = box.y + box.height / 2;
            await page.evaluate((sel) => {
                const w = window as unknown as { __hold: { frames: [number, string, number][]; stop: boolean; down: number } };
                const el = document.querySelector(sel) ?? [...document.querySelectorAll("button")].find((b) => b.textContent?.includes("Open palette"))!;
                const hold = { frames: [] as [number, string, number][], stop: false, down: -1 };
                w.__hold = hold;
                const t0 = performance.now();
                const tick = (now: number) => {
                    hold.frames.push([Math.round(now - t0), getComputedStyle(el).scale, +el.getBoundingClientRect().width.toFixed(2)]);
                    if (!hold.stop) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                (window as unknown as { __holdMark: () => void }).__holdMark = () => (hold.down = Math.round(performance.now() - t0));
            }, h.sel.startsWith("button:has-text") ? "button.__none__" : h.sel);
            await page.waitForTimeout(100);
            await page.evaluate(() => (window as unknown as { __holdMark: () => void }).__holdMark());
            const cdp = isPhone(project) ? await page.context().newCDPSession(page) : null;
            if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y, id: 1 }] } as never);
            else {
                await page.mouse.move(x, y);
                await page.mouse.down();
            }
            await page.waitForTimeout(350);
            const hold = await page.evaluate(() => {
                const w = window as unknown as { __hold: { frames: [number, string, number][]; stop: boolean; down: number } };
                w.__hold.stop = true;
                return w.__hold;
            });
            // Let go away from the control so no surface opens on the release.
            if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] } as never);
            else {
                await page.mouse.move(4, 880);
                await page.mouse.up();
            }
            const held = hold.frames.filter(([t]) => t >= hold.down);
            const before = hold.frames.filter(([t]) => t < hold.down);
            const read = {
                project,
                control: h.name,
                motion,
                rest: before[before.length - 1]?.slice(1),
                scales: [...new Set(held.map(([, s]) => s))],
                widths: [Math.min(...held.map((f) => f[2])), Math.max(...held.map((f) => f[2]))],
                first: held.slice(0, 6),
                last: held[held.length - 1],
            };
            console.log("PRESS " + JSON.stringify(read));
            await info.attach("press", { body: JSON.stringify(read), contentType: "application/json" });
        });
    }
}
