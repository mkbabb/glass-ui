// g7.mjs <port> [--engine chromium|webkit]: W-I.8 G-7's browser cells (PROTOTYPE-3) on cell
// w-g7 at 1440, with the outlets after the dock and (&order=outlet-first) before it, and on
// w-ctlout (an outlet into a ControlsDock). One browser, a new context per cell.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const port = a[0];
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = {};
let browser;
async function cell(url, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&${url}`);
        await page.waitForTimeout(700);
        return await fn(page);
    } catch (e) {
        return { error: String(e).slice(0, 300) };
    } finally {
        await ctx.close();
    }
}
const facts = (page) =>
    page.evaluate(() => {
        const d = document.querySelector("[data-testid=w-g7]");
        if (!d) return { dock: false, markInDom: !!document.querySelector("[data-testid=w-g7-mark]") };
        const run = d.querySelector(".dock-run");
        const kids = [...run.children].map((c) => c.getAttribute("data-testid") || c.tagName.toLowerCase());
        const mark = document.querySelector("[data-testid=w-g7-mark]");
        const ctx = document.querySelector("[data-testid=w-g7-ctx]");
        const pend = d.querySelector(".dock-persistent-end");
        const pr = pend?.getBoundingClientRect();
        return {
            dock: true,
            runChildren: kids,
            markParentIsRun: mark?.parentElement === run,
            contextIsThisDock: !!ctx && `${ctx.getAttribute("data-dock-id")}-full` === run.id,
            markRoved: mark?.hasAttribute("tabindex") ?? false,
            runIsToolbar: run.getAttribute("role") === "toolbar",
            play: !!document.querySelector("[data-testid=w-g7-play]"),
            pendWidth: pr ? +pr.width.toFixed(2) : 0,
        };
    });
async function openDock(page, sel) {
    const b = await page.locator(sel).boundingBox();
    await page.mouse.move(b.x - 30, b.y + b.height / 2);
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
    await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
    await page.waitForTimeout(700);
}
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const order of ["dock-first", "outlet-first"]) {
        out[order] = await cell(`cell=w-g7${order === "outlet-first" ? "&order=outlet-first" : ""}`, async (page) => {
            await openDock(page, "[data-testid=w-g7]");
            const atMount = await facts(page);
            await page.locator("[data-testid=w-g7-toggle-route]").click();
            await page.waitForTimeout(700);
            const routeB = await facts(page);
            await page.locator("[data-testid=w-g7-toggle-route]").click();
            await page.waitForTimeout(700);
            const routeA = await facts(page);
            await page.locator("[data-testid=w-g7-toggle-dock]").click();
            await page.waitForTimeout(500);
            const unmounted = await facts(page);
            await page.locator("[data-testid=w-g7-toggle-dock]").click();
            await page.waitForTimeout(700);
            const remounted = await facts(page);
            return { atMount, routeB, routeA, unmounted, remounted };
        });
    }
    out["into-controls"] = await cell("cell=w-ctlout", async (page) =>
        page.evaluate(() => {
            const run = document.querySelector("[data-testid=w-ctlout] .dock-run");
            return { runChildren: [...run.children].map((c) => c.getAttribute("data-testid") || c.getAttribute("aria-label") || c.tagName.toLowerCase()), toolbar: run.getAttribute("role") === "toolbar", name: run.getAttribute("aria-label") };
        }),
    );
    // No DOM lookup: the registry and the outlet name no query.
    try {
        out.lookup = execFileSync("git", ["-C", "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8", "grep", "-nE", "querySelector|getElementById|getElementsBy|closest\\(", "--", "src/components/dock/DockOutlet.vue", "src/components/dock/composables/dockRegistry.ts"], { encoding: "utf8" }).trim();
    } catch {
        out.lookup = "";
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../logs/g7-${process.env.LOG_TAG ?? "p3"}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify(out));
}
