// Apply each swept site's fully resolved colour-mix values, as literals, to
// one-element divs in WebKit: one page per site, one browser per run, a new
// context per site, all closed in finally.
// usage: node literal.mjs <sweep-full.json> <out.json> [class-regex]
import { webkit } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const [SWEEP, OUT, CLS = "."] = process.argv.slice(2);
const sites = JSON.parse(readFileSync(SWEEP, "utf8")).sites.filter((s) => new RegExp(CLS).test(s.cls));
const fill = (t) =>
    t.replace(/⟨registered ([^ ⟩]+) (--[\w-]+)⟩/g, (_, syn) =>
        syn.includes("number") ? "1" : syn.includes("percentage") ? "50%" : syn.includes("length") ? "0px" : syn.includes("color") ? "transparent" : "0");
// the outermost color-mix() calls in a value
function outerMixes(s) {
    const out = [];
    for (let i = 0; i < s.length; i++) {
        if (!s.startsWith("color-mix(", i)) continue;
        let d = 0, j = i + 9;
        for (; j < s.length; j++) { if (s[j] === "(") d++; else if (s[j] === ")" && --d === 0) break; }
        out.push(s.slice(i, j + 1));
        i = j;
    }
    return out;
}
const rows = [];
let browser;
try {
    browser = await webkit.launch({ headless: true });
    for (const site of sites) {
        const values = [...new Set(site.examples.filter((e) => !/⟲|⟨undefined/.test(e.expanded)).flatMap((e) => outerMixes(fill(e.expanded))))];
        const context = await browser.newContext();
        const row = { site: `${site.file}:${site.line} ${site.prop}`, cls: site.cls, values: values.length, parsed: 0, crashed: false, sample: null };
        try {
            const page = await context.newPage();
            let crashed = false;
            page.on("crash", () => (crashed = true));
            await page.setContent("<!doctype html><body></body>");
            try {
                const res = await page.evaluate((vals) => {
                    let parsed = 0, sample = null;
                    for (const v of vals) {
                        const el = document.createElement("div");
                        el.style.width = "40px"; el.style.height = "20px";
                        el.style.backgroundColor = v;
                        if (el.style.backgroundColor) parsed++;
                        document.body.append(el);
                    }
                    for (const el of document.body.children) sample = getComputedStyle(el).backgroundColor;
                    return { parsed, sample };
                }, values);
                await new Promise((r) => setTimeout(r, 300));
                Object.assign(row, res);
            } catch (e) {
                row.error = String(e.message || e).split("\n")[0];
            }
            row.crashed = crashed;
        } finally {
            await context.close().catch(() => {});
        }
        rows.push(row);
        console.log(`${row.crashed ? "CRASH" : "ok   "} ${row.cls.padEnd(13)} ${row.site.padEnd(70)} values ${row.values} parsed ${row.parsed} ${row.sample ?? row.error ?? ""}`);
    }
    writeFileSync(OUT, JSON.stringify({ engine: "webkit", version: browser.version(), rows }, null, 1));
} finally {
    if (browser) await browser.close().catch(() => {});
}
