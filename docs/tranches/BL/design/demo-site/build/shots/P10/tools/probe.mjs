// P10 probe: what the checker does not see, plus the crops. Per cell: console while
// using each page (every Tones option, every toast button and the action toast, Code);
// the Tones cross-fade and the Code disclosure per frame; the toasts that appear (count,
// rect, inside the viewport); the progress loop's per-frame step. Crops of each page,
// each Tones option at d1440, and a raised toast at d1440 and m390.
// One headless-shell browser, a context per route and cell, all closed in finally.
// usage: node probe.mjs <base> <outdir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2];
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });
const CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};
const ROUTES = ["/feedback", "/feedback/alert", "/feedback/toast", "/feedback/progress", "/feedback/skeleton"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = {};

const SAMPLE = ([sel, prop, ms]) => new Promise((res) => {
    const s = []; const t0 = performance.now();
    const f = () => {
        const els = [...document.querySelectorAll(sel)];
        s.push(els.map((e) => prop === "height" ? Math.round(e.getBoundingClientRect().height)
            : prop === "value" ? +(+e.getAttribute("aria-valuenow")).toFixed(2)
            : +(+getComputedStyle(e)[prop]).toFixed(3)).join("/"));
        if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(s);
    };
    requestAnimationFrame(f);
});

const maxStep = (series) => {
    const v = series.map((x) => Math.min(...String(x).split("/").filter(Boolean).map(Number))).filter((x) => !Number.isNaN(x));
    let m = 0;
    for (let i = 1; i < v.length; i++) m = Math.max(m, Math.abs(v[i] - v[i - 1]));
    const travel = v.length ? Math.max(...v) - Math.min(...v) : 0;
    return { frames: v.length, travel: +travel.toFixed(3), maxStep: +m.toFixed(3), share: travel ? +(m / travel).toFixed(3) : 0 };
};

const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    for (const [cid, C] of Object.entries(CELLS)) {
        for (const route of ROUTES) {
            const ctx = await browser.newContext({ viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1 });
            const errors = [];
            const R = (out[`${cid} ${route}`] = {});
            const slug = route.slice(1).replace(/\//g, "_");
            try {
                await ctx.addInitScript(`try{localStorage.setItem("vueuse-color-scheme",${JSON.stringify(C.scheme)})}catch{}`);
                const p = await ctx.newPage();
                p.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.text().slice(0, 160)));
                p.on("pageerror", (e) => errors.push("pageerror " + e.message.slice(0, 160)));
                await p.goto(BASE + route, { waitUntil: "load" });
                await p.waitForSelector("#demo-main");
                await sleep(1800);
                await p.screenshot({ path: path.join(OUT, `${slug}-${cid}.png`) });
                if (route === "/feedback") { await sleep(500); R.errors = errors; continue; }

                const stage = await p.$eval("[data-story-stage]", (e) => {
                    const r = e.getBoundingClientRect();
                    return { top: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
                });
                R.stage = stage;

                // the Code disclosure
                const trigger = p.locator("[data-story-code] button").first();
                const sampling = p.evaluate(SAMPLE, ["[data-story-code] [data-slot=collapsible-content], [data-story-code] [data-state]:not(button)", "height", 900]);
                await trigger.click();
                R.code = maxStep(await sampling);
                await sleep(300);
                const closing = p.evaluate(SAMPLE, ["[data-story-code] [data-slot=collapsible-content], [data-story-code] [data-state]:not(button)", "height", 900]);
                await trigger.click();
                R.codeClose = maxStep(await closing);

                if (route === "/feedback/alert") {
                    R.tones = {};
                    for (const tone of ["Neutral", "Info", "Success", "Destructive", "Warning"]) {
                        const tab = p.locator("[data-story-variants]").getByText(tone, { exact: true });
                        const sampling = p.evaluate(SAMPLE, [".stage-swap-pane", "opacity", 700]);
                        await tab.click();
                        const series = await sampling;
                        await sleep(300);
                        const tone2 = await p.$eval("[data-story-stage] [data-slot=alert], [data-story-stage] [role]", (e) => e.getAttribute("data-tone")).catch(() => null);
                        R.tones[tone] = { ...maxStep(series), dataTone: tone2 };
                        if (cid === "d1440") await p.screenshot({ path: path.join(OUT, `${slug}-${cid}-${tone.toLowerCase()}.png`) });
                    }
                }

                if (route === "/feedback/toast") {
                    const btns = await p.$$("[data-story-stage] button");
                    R.stageButtons = btns.length;
                    R.countAfterEach = [];
                    for (const b of btns) { await b.click(); await sleep(250); R.countAfterEach.push(await p.$$eval("[data-slot=toast]", (e) => e.length)); }
                    await p.getByRole("button", { name: "Archive" }).click();
                    await sleep(900);
                    R.toasts = await p.$$eval("[data-slot=toast]", (els) => els.map((e) => {
                        const r = e.getBoundingClientRect();
                        return { tone: e.getAttribute("data-tone"), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
                            inside: r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight, text: e.textContent.trim().slice(0, 40) };
                    }));
                    R.undo = await p.getByRole("button", { name: /Undo/ }).count();
                    if (cid !== "l1440") await p.screenshot({ path: path.join(OUT, `${slug}-${cid}-raised.png`) });
                }

                if (route === "/feedback/progress") {
                    const series = await p.evaluate(SAMPLE, ["[data-story-stage] [role=progressbar]", "value", 1500]);
                    R.loop = maxStep(series);
                    R.indeterminate = await p.$$eval("[data-indeterminate]", (els) => els.length);
                }

                R.errors = errors;
            } catch (e) {
                R.fail = String(e).slice(0, 200);
                R.errors = errors;
            } finally {
                await ctx.close();
            }
            console.log(cid, route, JSON.stringify(R));
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "probe.json"), JSON.stringify(out, null, 1));
