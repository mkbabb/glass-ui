// plate8.mjs <port> <tag> [--engine chromium|webkit] [--pages a,b] [--grounds grid,field] [--rungs 1,0.85,0.7,0.55,0.4|today]
//            [--schemes dark,light] [--label name] [--shots dir] [--shotpages nav,pill] [--neck match]:
// MEASURE-8 H6 (RU-67 as amended for C7-M1, C7-M8, C7-M9) and H7's Q10 frames (RU-83 as amended for R7-2, R7-9), and H8's
// fission (RU-85, C7-4) and the wash row (RU-83, C7-2). On m8/dock-comp.vue's grounds, at 1440 by 900, a fine pointer:
//   - each rung is the build with `.glass-dock { --glass-level: <rung> }` injected (unlayered, so it wins), `today` injects
//     nothing (on v11.0.2's own build, RU-69's row);
//   - every dock of the page, in each posture it has: folded when its `collapsed` class says so at the shot, then open
//     (a hover on its centre, then a press on its folded face if the hover did not open it); a dock that rests open is
//     read open only;
//   - each posture read three times, each read a shot with the docks and one with them hidden (visibility): the plate's
//     median colour, the field's median colour under the same box, plate against field (WCAG ratio); on the grid
//     ground the show-through: the grid's luminance amplitude inside the plate (the median relative luminance of the
//     grid's line pixels less that of its gap pixels, the plate's box inset by half its block size inline and 4 px
//     block, rows of the card text excluded) over the same amplitude in a box of the plate's size above it (or below
//     where there is no room), on the same shot. Beside it, the amplitude under the plate with the docks hidden
//     (ampUnder): a dock whose composition seats it on a card (figure-tools, canvas-tools) has no grid under its plate,
//     and m8/rule67.py leaves it out of the rule (ampUnder under half of ampBeside), naming it. The median of the three reads is the reading, the spread printed;
//   - --shots: for --shotpages, each posture's frame cropped to the plate with 80 px around it, clamped to the stage's
//     box, and a JSON line with the posture and scheme read at the shot (for strips8.py's checks);
//   - the fission page: the neck's own pixels (inside its box, outside both plates' stadia, and painted: the shot with the
//     docks differs there from the shot without) against the site plate and the theme plate, each median colour against
//     the field under it; `--neck match` sets the neck's --glass-level to the docks'.
// One browser per run, a context per cell, closed in finally. Log: logs/m8-plate-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const PAGES = val("--pages", "nav,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools").split(",");
const GROUNDS = val("--grounds", "grid,field").split(",");
const RUNGS = val("--rungs", "1,0.85,0.7,0.55,0.4").split(",");
const SCHEMES = val("--schemes", "dark,light").split(",");
const LABEL = val("--label", "build");
const SHOTS = val("--shots", null);
const SHOTPAGES = val("--shotpages", "").split(",").filter(Boolean);
const NECK = val("--neck", "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, label: LABEL, tag, cells: [] };
// in-page: from two shots (docks shown, docks hidden) the plate, the field and the show-through for each box
const READ = async ({ shown, hidden, boxes, grid }) => {
    const load = async (b64) => { const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)); const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" })); const c2 = new OffscreenCanvas(bmp.width, bmp.height); const x2 = c2.getContext("2d", { willReadFrequently: true }); x2.drawImage(bmp, 0, 0); return x2.getImageData(0, 0, bmp.width, bmp.height); };
    const A = await load(shown), B = await load(hidden);
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (p, q) => { const x = L(p), y = L(q); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const px = (img, x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
    const med = (xs) => { if (!xs.length) return null; const s = [...xs].sort((p, q) => p - q); return s[s.length >> 1]; };
    const medianColour = (img, r) => { const ch = [[], [], []]; for (let y = Math.ceil(r[1]); y < Math.floor(r[3]); y++) for (let x = Math.ceil(r[0]); x < Math.floor(r[2]); x++) { if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue; const p = px(img, x, y); ch[0].push(p[0]); ch[1].push(p[1]); ch[2].push(p[2]); } return ch[0].length ? ch.map(med) : null; };
    const amp = (img, r, excl) => {
        if (!grid) return null;
        const ln = [], gp = [];
        for (let y = Math.ceil(r[1]); y < Math.floor(r[3]); y++) {
            if (excl.some((e) => y >= e[1] - 2 && y < e[3] + 2)) continue;
            for (let x = Math.ceil(r[0]); x < Math.floor(r[2]); x++) {
                if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue;
                const gx = (((x - grid.x) % 32) + 32) % 32, gy = (((y - grid.y) % 32) + 32) % 32;
                const l = L(px(img, x, y));
                if (gx < 2 || gy < 2) ln.push(l); else if (gx >= 8 && gx < 24 && gy >= 8 && gy < 24) gp.push(l);
            }
        }
        return ln.length > 20 && gp.length > 20 ? Math.abs(med(ln) - med(gp)) : null;
    };
    const inStadium = (x, y, r) => { const h = (r[3] - r[1]) / 2, cy = (r[1] + r[3]) / 2; if (y < r[1] || y > r[3]) return false; const cx = Math.min(Math.max(x, r[0] + h), r[2] - h); return (x - cx) ** 2 + (y - cy) ** 2 <= h * h; };
    const neckColours = (b) => {
        const chA = [[], [], []], chB = [[], [], []];
        for (let y = Math.ceil(b.inner[1]); y < Math.floor(b.inner[3]); y++) for (let x = Math.ceil(b.inner[0]); x < Math.floor(b.inner[2]); x++) {
            if (x < 0 || y < 0 || x >= A.width || y >= A.height) continue;
            if (b.stadia.some((r) => inStadium(x + 0.5, y + 0.5, r))) continue;
            const p = px(A, x, y), q = px(B, x, y);
            if (Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1]), Math.abs(p[2] - q[2])) < 3) continue;
            for (let i = 0; i < 3; i++) { chA[i].push(p[i]); chB[i].push(q[i]); }
        }
        return { n: chA[0].length, plate: chA[0].length ? chA.map(med) : null, field: chB[0].length ? chB.map(med) : null };
    };
    return boxes.map((b) => {
        if (b.stadia) { const nc = neckColours(b); return { key: b.key, plate: nc.plate, field: nc.field, plateVsField: nc.plate && nc.field ? +CR(nc.plate, nc.field).toFixed(3) : null, pixels: nc.n, show: null, ampIn: null, ampBeside: null, ampUnder: null }; }
        const plate = medianColour(A, b.inner), field = medianColour(B, b.inner);
        let show = null, ain = null, abe = null, aun = null;
        if (grid) { ain = amp(A, b.inner, b.excl); abe = amp(A, b.beside, b.excl); aun = amp(B, b.inner, b.excl); show = ain != null && abe ? +(ain / abe).toFixed(3) : null; }
        return { key: b.key, plate, field, plateVsField: plate && field ? +CR(plate, field).toFixed(3) : null, show, ampIn: ain == null ? null : +ain.toFixed(5), ampBeside: abe == null ? null : +abe.toFixed(5), ampUnder: aun == null ? null : +aun.toFixed(5) };
    });
};
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    for (const page of PAGES) for (const ground of GROUNDS) for (const scheme of SCHEMES) for (const rung of RUNGS) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        const css = rung === "today" ? "" : `.glass-dock { --glass-level: ${rung}; }`;
        if (css) await ctx.addInitScript((css) => { addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.setAttribute("data-m8-rung", ""); st.textContent = css; document.head.appendChild(st); }); }, css);
        const cell = { page, ground, scheme, rung, docks: [] };
        try {
            const p = await ctx.newPage();
            const errors = [];
            p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 160)));
            await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${page}&ground=${ground}${scheme === "dark" ? "&scheme=dark" : ""}${NECK ? `&neck=${NECK}` : ""}`);
            await p.waitForFunction(() => window.__animReady === true, null, { timeout: 60000 }).catch(() => {});
            await p.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
            await sleep(2500);
            await p.mouse.move(2, 2);
            cell.schemeRead = await p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
            cell.levelRead = await p.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock")].map((d) => getComputedStyle(d).getPropertyValue("--glass-level").trim()));
            if (page === "fission" && NECK === "match") await p.evaluate(() => { const lv = getComputedStyle(document.querySelector("[data-story-stage] .glass-dock")).getPropertyValue("--glass-level").trim(); document.querySelector(".fx-row").style.setProperty("--fx-dock-level", lv || "1"); });
            const settle = () => p.evaluate(async () => { const t0 = performance.now(); while (performance.now() - t0 < 3000) { const busy = [...document.querySelectorAll("[data-story-stage] .glass-dock")].some((d) => d.hasAttribute("data-morphing")); if (!busy) return; await new Promise((r) => setTimeout(r, 50)); } });
            const geom = (k) => p.evaluate(({ k, page }) => {
                const st = document.querySelector("[data-testid=comp-stage]").getBoundingClientRect();
                const grid = document.querySelector("[data-testid=comp-stage]").getAttribute("data-ground") === "grid" ? { x: Math.round(st.left), y: Math.round(st.top) } : null;
                const txt = document.querySelector("[data-testid=comp-card-text]")?.getBoundingClientRect();
                const excl = txt ? [[txt.left, txt.top, txt.right, txt.bottom]] : [];
                const docks = [...document.querySelectorAll("[data-story-stage] .glass-dock")];
                const box = (e) => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; };
                const others = docks.filter((_, i) => i !== k).map((d) => box(d.querySelector(".dock-plate") ?? d));
                if (page === "fission") {
                    // the neck's own pixels: inside its box, outside both plates' stadia (the docks paint over the rest of
                    // it at t 0.62), and painted (the shot with the docks and neck differs there from the one without)
                    const n = document.querySelector("[data-testid=fx-neck]").getBoundingClientRect();
                    const stadia = docks.map((d) => { const r = (d.querySelector(".dock-plate") ?? d).getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; });
                    const ni = [n.left, n.top, n.right, n.bottom];
                    const pl = docks.map((d) => { const r = (d.querySelector(".dock-plate") ?? d).getBoundingClientRect(); const ins = r.height / 2; return { key: d.getAttribute("aria-label"), inner: [r.left + ins, r.top + 4, r.right - ins, r.bottom - 4], beside: [0, 0, 0, 0], excl: [] }; });
                    return { stage: [st.left, st.top, st.right, st.bottom], grid: null, boxes: [{ key: "neck", inner: ni, beside: [0, 0, 0, 0], excl: [], stadia }, ...pl] };
                }
                const d = docks[k]; const pe = d.querySelector(".dock-plate") ?? d; const r = pe.getBoundingClientRect();
                const ins = Math.min(r.height / 2, r.width / 4);
                const inner = [r.left + ins, r.top + 4, r.right - ins, r.bottom - 4];
                const h = r.height;
                const above = [inner[0], r.top - 12 - h + 4, inner[2], r.top - 12 - 4];
                const below = [inner[0], r.bottom + 12 + 4, inner[2], r.bottom + 12 + h - 4];
                const fits = (b) => b[1] >= st.top + 2 && b[3] <= st.bottom - 2 && !others.some((o) => o[0] < b[2] && o[2] > b[0] && o[1] < b[3] && o[3] > b[1]);
                const beside = fits(above) ? above : below;
                return { stage: [st.left, st.top, st.right, st.bottom], grid, boxes: [{ key: d.getAttribute("aria-label"), inner, beside, excl }], plate: [r.left, r.top, r.right, r.bottom], posture: d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest" };
            }, { k, page });
            const readPosture = async (k, posture) => {
                const reads = [];
                let g;
                for (let n = 0; n < 3; n++) {
                    await settle();
                    g = await geom(k);
                    const shown = (await p.screenshot({ type: "png" })).toString("base64");
                    await p.evaluate(() => { for (const d of document.querySelectorAll("[data-story-stage] .glass-dock, [data-testid=fx-neck]")) d.style.visibility = "hidden"; });
                    await sleep(120);
                    const hidden = (await p.screenshot({ type: "png" })).toString("base64");
                    await p.evaluate(() => { for (const d of document.querySelectorAll("[data-story-stage] .glass-dock, [data-testid=fx-neck]")) d.style.removeProperty("visibility"); });
                    await sleep(80);
                    reads.push(await p.evaluate(READ, { shown, hidden, boxes: g.boxes, grid: g.grid }));
                    if (n < 2) await sleep(200);
                }
                const res = reads[0].map((b0, i) => {
                    const pick = (f) => { const xs = reads.map((r) => r[i][f]).filter((x) => x != null).sort((p2, q2) => p2 - q2); return xs.length ? { med: xs[xs.length >> 1], spread: +(xs[xs.length - 1] - xs[0]).toFixed(3), all: xs } : null; };
                    const pv = pick("plateVsField"), sh = pick("show");
                    const mid = reads[1]?.[i] ?? b0;
                    return { key: b0.key, pixels: mid.pixels, posture: page === "fission" ? "fission" : g.posture, postureAsked: posture, plate: mid.plate, field: mid.field, plateVsField: pv?.med ?? null, pvSpread: pv?.spread ?? null, pvReads: pv?.all ?? [], show: sh?.med ?? null, showSpread: sh?.spread ?? null, showReads: sh?.all ?? [], ampIn: mid.ampIn, ampBeside: mid.ampBeside, ampUnder: mid.ampUnder };
                });
                if (SHOTS && SHOTPAGES.includes(page) && g.plate) {
                    mkdirSync(SHOTS, { recursive: true });
                    const [sl, stp, sr, sb] = g.stage;
                    const x0 = Math.max(sl, g.plate[0] - 80), y0 = Math.max(stp, g.plate[1] - 80), x1 = Math.min(sr, g.plate[2] + 80), y1 = Math.min(sb, g.plate[3] + 80);
                    const name = `${LABEL}-${engine}-${page}-${ground}-${scheme}-${rung}-${posture}`;
                    await p.screenshot({ path: `${SHOTS}/${name}.png`, clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
                    const sch = await p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
                    res.forEach((r) => (r.frame = { file: `${name}.png`, postureAtShot: g.posture, schemeAtShot: sch }));
                } else if (SHOTS && SHOTPAGES.includes(page) && page === "fission") {
                    mkdirSync(SHOTS, { recursive: true });
                    const name = `${LABEL}-${engine}-${page}${NECK ? "-" + NECK : ""}-${ground}-${scheme}-${rung}`;
                    const [sl, stp, sr, sb] = g.stage;
                    await p.screenshot({ path: `${SHOTS}/${name}.png`, clip: { x: sl, y: Math.max(stp, sb - 220), width: sr - sl, height: Math.min(220, sb - stp) } });
                    res.forEach((r) => (r.frame = { file: `${name}.png`, postureAtShot: "fission", schemeAtShot: cell.schemeRead }));
                }
                return res;
            };
            const n = await p.evaluate(() => document.querySelectorAll("[data-story-stage] .glass-dock").length);
            if (page === "fission") { cell.docks.push(...(await readPosture(0, "fission"))); }
            else for (let k = 0; k < n; k++) {
                const g0 = await geom(k);
                if (g0.posture === "folded") cell.docks.push(...(await readPosture(k, "folded")));
                if (g0.posture !== "open") {
                    const c = [(g0.plate[0] + g0.plate[2]) / 2, (g0.plate[1] + g0.plate[3]) / 2];
                    await p.mouse.move(c[0] - 6, c[1]); await p.mouse.move(c[0], c[1], { steps: 3 }); await sleep(1000);
                    let open = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                    if (!open) { const fb = await p.evaluate((k) => { const f = document.querySelectorAll("[data-story-stage] .glass-dock")[k].querySelector(".dock-layer--summary"); const r = f?.getBoundingClientRect(); return r && r.width > 2 ? [r.x + r.width / 2, r.y + r.height / 2] : null; }, k); if (fb) { await p.mouse.click(fb[0], fb[1]); await sleep(1000); } open = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k); }
                    if (!open) { cell.docks.push({ key: g0.boxes[0].key, posture: "did not open", postureAsked: "open" }); continue; }
                }
                cell.docks.push(...(await readPosture(k, "open")));
                await p.mouse.click(4, 890); await p.mouse.move(2, 2); await sleep(600);
            }
            if (errors.length) cell.errors = errors;
        } catch (e) {
            cell.error = String(e).slice(0, 300);
        } finally {
            await ctx.close();
        }
        out.cells.push(cell);
        console.log(`${page} ${ground} ${scheme} ${rung}: ${cell.error ?? cell.docks.map((d) => `${d.key} ${d.posture} pvf ${d.plateVsField}${d.show != null ? ` show ${d.show}` : ""}`).join("; ")}`);
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m8-plate-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
