// level8.mjs <port> <tag> [--engine chromium|webkit]: S4's token witness (RU-67 as amended for C7-M10, C7-3). On
// dock-comp's nav page (flat ground, 1440 by 900), the computed `--glass-level` and `--glass-blur-resting` of the
// stage's dock in each cell: light; dark; prefers-reduced-transparency in both schemes (Chromium only: CDP's emulated
// media feature; WebKit has no switch for it); prefers-contrast: more; `data-backdrop-mode="static"` set on the root;
// and `.dark` set on the dock's root in a light document (slides's case, C7-3), where the dark blur arm must reach it.
// Expected: 1, 1 (H6's dark default), 0, 0, 0.3, 0, and 1 with the dark arm's `saturate(1.3) brightness(1.14)`.
// One browser, a context per cell, closed in finally. Output: logs/s8-level-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const CELLS = [
    { id: "light", scheme: "light", want: "1", blur: "saturate(1.2)" },
    { id: "dark", scheme: "dark", want: "1", blur: "saturate(1.3) brightness(1.14)" },
    { id: "rt-light", scheme: "light", rt: true, want: "0" },
    { id: "rt-dark", scheme: "dark", rt: true, want: "0" },
    { id: "contrast-more", scheme: "light", contrast: "more", want: "0.3" },
    { id: "static", scheme: "light", attr: ["data-backdrop-mode", "static"], want: "0" },
    { id: "dock-dark-in-light", scheme: "light", cls: "dark", want: "1", blur: "saturate(1.3) brightness(1.14)" },
];
const out = { engine, rows: [] };
let browser;
try {
    browser = engine === "webkit"
        ? await pw.webkit.launch({ headless: true, executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await pw.chromium.launch({ headless: true });
    for (const c of CELLS) {
        if (c.rt && engine !== "chromium") { out.rows.push({ ...c, read: null, note: "no emulation of prefers-reduced-transparency in WebKit" }); continue; }
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: c.scheme, ...(c.contrast ? { contrast: c.contrast } : {}) });
        try {
            const page = await ctx.newPage();
            if (c.rt) {
                const cdp = await ctx.newCDPSession(page);
                await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] });
            }
            await page.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=nav&ground=flat${c.scheme === "dark" ? "&scheme=dark" : ""}`, { waitUntil: "load" });
            await page.waitForSelector("[data-story-stage] .glass-dock", { timeout: 30000 });
            const r = await page.evaluate(([attr, cls]) => {
                const d = document.querySelector("[data-story-stage] .glass-dock");
                if (attr) d.setAttribute(attr[0], attr[1]);
                if (cls) d.classList.add(cls);
                const s = getComputedStyle(d);
                return {
                    level: s.getPropertyValue("--glass-level").trim(),
                    blur: s.getPropertyValue("--glass-blur-resting").trim().replace(/\s+/g, " "),
                    docDark: document.documentElement.classList.contains("dark"),
                    rt: matchMedia("(prefers-reduced-transparency: reduce)").matches,
                    more: matchMedia("(prefers-contrast: more)").matches,
                };
            }, [c.attr ?? null, c.cls ?? null]);
            const okLevel = +r.level === +c.want;
            const okBlur = c.blur ? r.blur.includes(c.blur) : true;
            out.rows.push({ id: c.id, want: c.want, wantBlur: c.blur ?? null, ...r, ok: okLevel && okBlur });
        } catch (e) {
            out.rows.push({ id: c.id, error: String(e).slice(0, 200), ok: false });
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser?.close();
}
const judged = out.rows.filter((r) => r.ok !== undefined);
out.summary = { cells: judged.length, ok: judged.filter((r) => r.ok).length, fail: judged.filter((r) => !r.ok).map((r) => r.id) };
console.log(JSON.stringify(out));
writeFileSync(new URL(`../../logs/s8-level-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
