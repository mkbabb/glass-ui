// Critic 13, readings only: the exits harness's Dialog closed by Escape and its trigger
// pressed 40 ms later, as the cell "leave · a Dialog closed and reopened mid-exit says
// nothing" drives it, with every moment stamped on the page's clock: the Escape's keydown,
// the trigger's pointerdown and click as the page receives them, each change of the
// content's data-state, the content's removal, and any leave-finished event. An event
// after the content left and before the press arrived is a whole exit the press came too
// late to turn; an event after the press arrived is a reversed close that spoke.
import { test } from "@playwright/test";
import { pressOn } from "../release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";
const content = '[data-testid="x-dialog-content"]';
const trigger = '[data-testid="x-dialog"]';

test("leave · a Dialog closed and pressed again 40 ms later, stamped", async ({ page }, info) => {
    const project = info.project.name;
    await page.goto(HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    await pressOn(page, project, trigger);
    await page.locator(`${content}[data-state$="open"]`).first().waitFor();
    await page.waitForTimeout(900);
    await page.evaluate(({ content, trigger }) => {
        const log: [number, string][] = [];
        (window as unknown as { __log: typeof log }).__log = log;
        const now = () => Math.round(performance.now() * 10) / 10;
        window.addEventListener("leave-finished", (e) => log.push([now(), `leave ${(e as CustomEvent).detail?.kind}`]));
        window.addEventListener("keydown", (e) => log.push([now(), `keydown ${e.key}`]), true);
        const t = document.querySelector(trigger)!;
        t.addEventListener("pointerdown", () => log.push([now(), "trigger pointerdown"]), true);
        t.addEventListener("click", () => log.push([now(), "trigger click"]), true);
        let last = document.querySelector(content)?.getAttribute("data-state") ?? "absent";
        let present = !!document.querySelector(content);
        const tick = () => {
            const el = document.querySelector(content);
            const s = el?.getAttribute("data-state") ?? "absent";
            if (!!el !== present || s !== last) log.push([now(), `content ${s}`]);
            present = !!el; last = s;
            if (log.length < 200) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, { content, trigger });
    const t0 = await page.evaluate(() => performance.now());
    await page.keyboard.press("Escape");
    await page.waitForTimeout(40);
    const t1 = await page.evaluate(() => performance.now());
    await pressOn(page, project, trigger);
    await page.waitForTimeout(900);
    const log = await page.evaluate(() => (window as unknown as { __log: [number, string][] }).__log);
    const open = await page.locator(`${content}[data-state$="open"]`).count();
    const rel = log.map(([t, s]) => [Math.round(t - t0), s]);
    const reading = { project, pressSentAt: Math.round(t1 - t0), openAfter: open, log: rel };
    console.log("READING", JSON.stringify(reading));
    await info.attach("reading", { body: JSON.stringify(reading), contentType: "application/json" });
});
