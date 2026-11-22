// P12 probe: crops of each compositions page, and the use of every variant with the
// console watched and the swap and code disclosure sampled per frame.
// Machine law: run through `guarded` as a browser run; headless shell with the
// checker's GPU flags; one browser, a new context per route and cell, all closed in
// `finally`. Pixels come from page.screenshot only.
//
// usage: node probe.mjs --base http://127.0.0.1:5472 --out <dir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base;
const OUT = args.out;
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};
const ROUTES = ["/compositions", "/compositions/auth-shell", "/compositions/settings", "/compositions/empty-states"];

// Sample a value per animation frame for `ms` after an action, in the page.
const SAMPLE = ({ sel, prop, ms }) =>
    new Promise((resolve) => {
        const out = [];
        const t0 = performance.now();
        const tick = () => {
            const el = document.querySelector(sel);
            if (el) {
                const v = prop === "height" ? el.getBoundingClientRect().height : Number(getComputedStyle(el).opacity);
                out.push(v);
            }
            if (performance.now() - t0 < ms) requestAnimationFrame(tick);
            else resolve(out);
        };
        requestAnimationFrame(tick);
    });

function legs(samples) {
    // the largest one-frame step as a share of the sampled range
    const lo = Math.min(...samples), hi = Math.max(...samples);
    const range = hi - lo;
    let max = 0;
    for (let i = 1; i < samples.length; i++) max = Math.max(max, Math.abs(samples[i] - samples[i - 1]));
    return { frames: samples.length, range: +range.toFixed(3), maxStepShare: range ? +(max / range).toFixed(3) : 0 };
}

const report = [];
const browser = await chromium.launch({
    headless: true,
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
});
try {
    for (const [cellId, C] of Object.entries(CELLS)) {
        for (const route of ROUTES) {
            const ctx = await browser.newContext({
                viewport: C.viewport,
                colorScheme: C.scheme,
                hasTouch: C.touch,
                isMobile: C.touch,
            });
            try {
                await ctx.addInitScript(`try { localStorage.setItem("vueuse-color-scheme", ${JSON.stringify(C.scheme)}); } catch {}`);
                const page = await ctx.newPage();
                const msgs = [];
                page.on("console", (m) => {
                    if (m.type() === "error" || m.type() === "warning") msgs.push(`${m.type()}: ${m.text()}`);
                });
                page.on("pageerror", (e) => msgs.push(`pageerror: ${e.message}`));
                await page.goto(BASE + route, { waitUntil: "networkidle" });
                await sleep(1500);
                const slug = route.replace(/^\//, "").replace(/\//g, "_");
                await page.screenshot({ path: path.join(OUT, `${slug}-${cellId}.png`) });
                const row = { cell: cellId, route, actions: [] };

                const press = async (loc) => (C.touch ? loc.tap() : loc.click());

                if (route.endsWith("empty-states")) {
                    for (const label of ["Loading", "Error", "No results", "Empty"]) {
                        const btn = page.locator("[data-story-variants]").getByRole("button", { name: label, exact: true })
                            .or(page.locator("[data-story-variants]").getByRole("tab", { name: label, exact: true })).first();
                        const sampling = page.evaluate(SAMPLE, { sel: "[data-story-stage] .stage-swap-pane", prop: "opacity", ms: 700 });
                        await press(btn);
                        const s = await sampling;
                        row.actions.push({ action: `state ${label}`, ...legs(s) });
                        await sleep(300);
                        if (cellId === "d1440") await page.screenshot({ path: path.join(OUT, `${slug}-${cellId}-${label.toLowerCase().replace(" ", "-")}.png`) });
                    }
                }
                if (route.endsWith("settings")) {
                    for (const label of ["Display", "Alerts", "Account"]) {
                        const tab = page.locator("[data-story-stage]").getByRole("tab", { name: label, exact: true }).first();
                        const sampling = page.evaluate(SAMPLE, { sel: "[data-story-stage] .stage-swap", prop: "height", ms: 700 });
                        const fading = page.evaluate(SAMPLE, { sel: "[data-story-stage] .stage-swap-pane", prop: "opacity", ms: 700 });
                        await press(tab);
                        row.actions.push({ action: `tab ${label} height`, ...legs(await sampling) });
                        row.actions.push({ action: `tab ${label} opacity`, ...legs(await fading) });
                        await sleep(300);
                        if (cellId === "d1440" || cellId === "m390") await page.screenshot({ path: path.join(OUT, `${slug}-${cellId}-${label.toLowerCase()}.png`) });
                    }
                    // a switch in the panel: the library's own thumb travel
                    await press(page.locator("[data-story-stage]").getByRole("tab", { name: "Alerts", exact: true }).first());
                    await sleep(600);
                    await press(page.locator("[data-story-stage]").getByRole("switch").nth(1));
                    await sleep(400);
                }
                if (route.endsWith("auth-shell")) {
                    const email = page.locator("[data-story-stage] input[type=email]");
                    await press(email);
                    await email.fill("ada@example.com");
                    await press(page.locator("[data-story-stage]").getByRole("button", { name: "Sign in" }));
                    await sleep(300);
                }
                if (route !== "/compositions") {
                    const trig = page.locator("[data-story-code] button").first();
                    if (await trig.count()) {
                        const sampling = page.evaluate(SAMPLE, { sel: "[data-story-code]", prop: "height", ms: 900 });
                        await press(trig);
                        row.actions.push({ action: "code open", ...legs(await sampling) });
                        await sleep(200);
                        const closing = page.evaluate(SAMPLE, { sel: "[data-story-code]", prop: "height", ms: 900 });
                        await press(trig);
                        row.actions.push({ action: "code close", ...legs(await closing) });
                    }
                }
                row.console = msgs;
                report.push(row);
                console.log(JSON.stringify(row));
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "probe.json"), JSON.stringify(report, null, 2));
