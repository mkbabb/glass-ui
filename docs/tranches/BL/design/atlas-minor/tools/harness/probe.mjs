// probe.mjs: the witnesses for the DataTable and Dialog minor, on one tree, in one engine.
//
//   node probe.mjs <chromium|webkit> <port> <out.json> [cell,cell,...]
//
// Cells (desktop contexts, mouse and wheel input; one browser per run, a new context per
// cell, each context and the browser closed in finally):
//   sticky-1440, sticky-390  a 2,897 px DataTable in a host region (1,202 px at 1440, 344 at
//                            390, 480 tall). The wheel scrolls 1,500 down and 800 across over
//                            it; then the header, the corner and a body row's first cell are
//                            read against the region's edges, which part paints on top at a
//                            point under the header and under the first column, and the
//                            grounds of the stuck cells.
//   fit-1440                 the same table with `fit`: the header's column count, sideways
//                            overflow, and the folded keys the page received.
//   cards-table-390,         the card projection in a 344 px host, read from the accessibility
//   cards-grid-390           tree: Chromium's own (CDP Accessibility.getFullAXTree); WebKit's
//                            is not reachable from Playwright, so there the cell reads
//                            Element.computedRole where the engine has it, and Playwright's
//                            ARIA snapshot otherwise, and says which.
//   dialog-1440, dialog-390  a Dialog opened from a button: the plate's rect and opacity on
//                            every animation frame from the click to its removal. GREEN
//                            needs the first frame on the opener, the last within a tenth
//                            of the travel of it, a close that never overshoots, and no
//                            step of more than 0.3 of the travel between frames of 34 ms or
//                            less. A step beside a longer frame is listed, not judged: the
//                            spring advances on frame time and catches up across it.
//   dialog-rm-1440           the same under prefers-reduced-motion.
//
// Run under the guard: guarded [--exclusive webkit] --timeout 30 -- node probe.mjs ...
import { chromium, webkit } from "playwright";
import { writeFileSync } from "node:fs";

const [engine, port, out, cellArg] = process.argv.slice(2);
if (!engine || !port || !out) {
    console.error("usage: node probe.mjs <chromium|webkit> <port> <out.json> [cells]");
    process.exit(2);
}
const ALL = [
    "sticky-1440",
    "sticky-390",
    "fit-1440",
    "cards-table-390",
    "cards-grid-390",
    "dialog-1440",
    "dialog-390",
    "dialog-rm-1440",
];
const cells = cellArg ? cellArg.split(",") : ALL;
const base = `http://127.0.0.1:${port}/`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ready(page, query) {
    await page.goto(`${base}?${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__amReady === true || !!window.__amError, null, {
        timeout: 20000,
    });
    const error = await page.evaluate(() => window.__amError ?? null);
    if (error) throw new Error(`page error: ${error}`);
}

// ── sticky ────────────────────────────────────────────────────────────────────────────
async function sticky(page, width) {
    const hostW = width === 1440 ? 1202 : 344;
    await ready(page, `am=sticky&w=${hostW}&h=480`);
    const rest = await page.evaluate(() => {
        const th = document.querySelector("thead th:nth-child(2)");
        return { headGround: getComputedStyle(th).backgroundColor };
    });
    const host = await page.evaluate(() => {
        const r = document.getElementById("host").getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    await page.mouse.move(host.x + host.w / 2, host.y + host.h / 2);
    await page.mouse.wheel(0, 1500);
    await sleep(700);
    await page.mouse.wheel(800, 0);
    await sleep(700);
    const read = await page.evaluate(
        ({ hostW }) => {
            const alpha = (c) => {
                const m = /rgba?\(([^)]+)\)/.exec(c);
                if (!m) return c === "transparent" ? 0 : null;
                const parts = m[1].split(/[\s,/]+/).filter(Boolean);
                return parts.length > 3 ? Number(parts[3]) : 1;
            };
            const hostEl = document.getElementById("host");
            const region = hostEl.getBoundingClientRect();
            const viewport = document.querySelector('[data-slot="table-container"]');
            const head = document.querySelector("thead th:nth-child(2)").getBoundingClientRect();
            const cornerEl = document.querySelector("thead th:first-child");
            const corner = cornerEl.getBoundingClientRect();
            const bodyRow = Array.from(document.querySelectorAll("tbody tr")).find(
                (tr) => tr.getBoundingClientRect().top >= region.top + 60,
            );
            const bodyFirst = bodyRow?.firstElementChild;
            const bodyFirstRect = bodyFirst?.getBoundingClientRect();
            const headPoint = document.elementFromPoint(
                region.left + Math.min(hostW - 30, 300),
                region.top + 8,
            );
            const colPoint = document.elementFromPoint(region.left + 20, region.top + 240);
            const colCell = colPoint?.closest("th, td");
            return {
                region: { x: region.x, y: region.y, w: region.width, h: region.height },
                table: document.querySelector("table").getBoundingClientRect().width,
                viewport: {
                    scrollTop: viewport.scrollTop,
                    scrollLeft: viewport.scrollLeft,
                    clientHeight: viewport.clientHeight,
                    scrollHeight: viewport.scrollHeight,
                    clientWidth: viewport.clientWidth,
                    scrollWidth: viewport.scrollWidth,
                    scrolledBlock: viewport.hasAttribute("data-scrolled-block"),
                    scrolledInline: viewport.hasAttribute("data-scrolled-inline"),
                },
                host: { scrollTop: hostEl.scrollTop, scrollLeft: hostEl.scrollLeft },
                page: { scrollX: window.scrollX, scrollY: window.scrollY },
                headTop: head.top - region.top,
                cornerTop: corner.top - region.top,
                cornerLeft: corner.left - region.left,
                bodyFirstLeft: bodyFirstRect ? bodyFirstRect.left - region.left : null,
                bodyFirstText: bodyFirst?.textContent?.trim() ?? null,
                headOnTop: !!headPoint?.closest("thead"),
                firstColumnOnTop:
                    !!colCell && colCell === colCell.parentElement?.firstElementChild,
                headGround: getComputedStyle(document.querySelector("thead th:nth-child(2)"))
                    .backgroundColor,
                headGroundAlpha: alpha(
                    getComputedStyle(document.querySelector("thead th:nth-child(2)"))
                        .backgroundColor,
                ),
                columnGroundAlpha: bodyFirst ? alpha(getComputedStyle(bodyFirst).backgroundColor) : null,
            };
        },
        { hostW },
    );
    const near = (v) => v !== null && Math.abs(v) <= 1;
    const verdict =
        read.viewport.scrollTop > 0 &&
        read.viewport.scrollLeft > 0 &&
        read.host.scrollTop === 0 &&
        read.page.scrollY === 0 &&
        near(read.headTop) &&
        near(read.cornerTop) &&
        near(read.cornerLeft) &&
        near(read.bodyFirstLeft) &&
        read.headOnTop &&
        read.firstColumnOnTop &&
        read.headGroundAlpha === 1 &&
        read.columnGroundAlpha === 1 &&
        alphaOf(rest.headGround) === 0
            ? "GREEN"
            : "RED";
    return { rest, ...read, verdict };
}

function alphaOf(c) {
    const m = /rgba?\(([^)]+)\)/.exec(c);
    if (!m) return c === "transparent" ? 0 : null;
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    return parts.length > 3 ? Number(parts[3]) : 1;
}

// ── fit ───────────────────────────────────────────────────────────────────────────────
async function fit(page) {
    await ready(page, "am=fit&w=1202&h=480");
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const read = await page.evaluate(() => {
        const viewport = document.querySelector('[data-slot="table-container"]');
        return {
            columns: document.querySelectorAll("thead th").length,
            heads: Array.from(document.querySelectorAll("thead th")).map((th) => th.textContent.trim()),
            clientWidth: viewport.clientWidth,
            scrollWidth: viewport.scrollWidth,
            fold: window.__amFold ?? null,
        };
    });
    const leadPx = 256;
    const expected = 1 + Math.floor((read.clientWidth - leadPx) / 139);
    const verdict =
        read.columns === expected &&
        read.scrollWidth <= read.clientWidth + 1 &&
        Array.isArray(read.fold) &&
        read.fold.length === 20 - expected
            ? "GREEN"
            : "RED";
    return { ...read, expected, verdict };
}

// ── cards ─────────────────────────────────────────────────────────────────────────────
async function cards(page, context, role) {
    await ready(page, `am=cards&w=344&h=640${role === "grid" ? "&role=grid" : ""}`);
    await page.waitForSelector(".data-table-cards", { timeout: 5000 });
    const dom = await page.evaluate(() => {
        const list = document.querySelector(".data-table-cards");
        const q = (sel) => Array.from(list.querySelectorAll(sel));
        const computed = (el) => (el && "computedRole" in el ? el.computedRole : undefined);
        return {
            role: list.getAttribute("role"),
            labelledby: list.getAttribute("aria-labelledby"),
            computedRole: computed(list),
            firstCardComputedRole: computed(q(".data-table-card")[0]),
        };
    });
    let tree;
    if (engine === "chromium") {
        const cdp = await context.newCDPSession(page);
        await cdp.send("DOM.enable");
        await cdp.send("Accessibility.enable");
        const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
        const { nodeId } = await cdp.send("DOM.querySelector", {
            nodeId: root.nodeId,
            selector: ".data-table-cards",
        });
        const { node } = await cdp.send("DOM.describeNode", { nodeId });
        const { nodes } = await cdp.send("Accessibility.getFullAXTree");
        const byId = new Map(nodes.map((n) => [n.nodeId, n]));
        const start = nodes.find((n) => n.backendDOMNodeId === node.backendNodeId);
        // Walk the container's subtree, passing through ignored and generic nodes, and keep
        // the table structure: rows with their cells' roles and names.
        const rows = [];
        const walk = (n, row) => {
            const role = n.role?.value;
            const name = n.name?.value ?? "";
            if (!n.ignored && role === "row") {
                const r = { cells: [] };
                rows.push(r);
                for (const c of n.childIds ?? []) walk(byId.get(c), r);
                return;
            }
            if (
                !n.ignored &&
                row &&
                ["cell", "gridcell", "rowheader", "columnheader"].includes(role)
            ) {
                row.cells.push({ role, name });
                return;
            }
            for (const c of n.childIds ?? []) {
                const child = byId.get(c);
                if (child) walk(child, row);
            }
        };
        if (start) for (const c of start.childIds ?? []) walk(byId.get(c), null);
        tree = {
            source: "chromium AX tree (CDP Accessibility.getFullAXTree)",
            role: start?.role?.value ?? null,
            name: start?.name?.value ?? null,
            ignored: start?.ignored ?? null,
            rows: rows.length,
            headerRow: rows[0]?.cells ?? [],
            firstRow: rows[1]?.cells ?? [],
        };
        await cdp.detach();
    } else {
        const snapshot = await page.locator(".data-table-cards").ariaSnapshot();
        tree = {
            source:
                dom.computedRole !== undefined
                    ? "WebKit Element.computedRole plus Playwright ARIA snapshot"
                    : "Playwright ARIA snapshot (WebKit's own tree is not reachable from Playwright)",
            computedRole: dom.computedRole ?? null,
            firstCardComputedRole: dom.firstCardComputedRole ?? null,
            snapshot,
        };
    }
    const want = role === "grid" ? "grid" : "table";
    let verdict;
    if (engine === "chromium") {
        verdict =
            tree.role === want &&
            tree.name === "Schools by district" &&
            tree.rows === 7 &&
            tree.headerRow.length === 5 &&
            tree.headerRow.every((c) => c.role === "columnheader") &&
            tree.firstRow[0]?.role === "rowheader" &&
            tree.firstRow.slice(1).every((c) => c.role === (want === "grid" ? "gridcell" : "cell"))
                ? "GREEN"
                : "RED";
    } else {
        const s = tree.snapshot;
        const rowCount = (s.match(/^\s*- row\b/gm) ?? []).length;
        verdict =
            s.trimStart().startsWith(`- ${want} "Schools by district"`) &&
            rowCount === 7 &&
            /- rowheader "District 1"/.test(s) &&
            (dom.computedRole === undefined || dom.computedRole === want)
                ? "GREEN"
                : "RED";
    }
    return { dom, tree, verdict };
}

// ── dialog ────────────────────────────────────────────────────────────────────────────
async function dialog(page, width, reduced) {
    const at = width === 1440 ? { ox: 40, oy: 60 } : { ox: 24, oy: 120 };
    await ready(page, `am=dialog&ox=${at.ox}&oy=${at.oy}`);
    const opener = await page.evaluate(() => {
        const r = document.getElementById("opener").getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    await page.evaluate(() => {
        window.__amSamples = [];
        window.__amSampling = true;
        // `ft` is the frame's own timestamp, the clock the spring advances on; `t` is when
        // this callback ran, which a long frame can leave close to the next one.
        const loop = (ft) => {
            const el = document.querySelector('[data-slot="dialog-content"]');
            if (el) {
                const r = el.getBoundingClientRect();
                window.__amSamples.push({
                    ft,
                    t: performance.now(),
                    x: r.x,
                    y: r.y,
                    w: r.width,
                    h: r.height,
                    o: Number(getComputedStyle(el).opacity),
                });
            } else window.__amSamples.push({ ft, t: performance.now(), gone: true });
            if (window.__amSampling) requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    });
    await page.click("#opener");
    await sleep(1400);
    const openedAt = await page.evaluate(() => window.__amSamples.length);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector('[data-slot="dialog-content"]'), null, {
        timeout: 5000,
    });
    await sleep(200);
    const samples = await page.evaluate(() => {
        window.__amSampling = false;
        return window.__amSamples;
    });
    const firstPresent = samples.findIndex((s) => !s.gone);
    const open = samples.slice(firstPresent, openedAt).filter((s) => !s.gone);
    const closeAll = samples.slice(openedAt);
    const close = closeAll.slice(0, closeAll.findIndex((s) => s.gone)).filter((s) => !s.gone);
    const rest = open.at(-1);
    const cx = (s) => s.x + s.w / 2;
    const cy = (s) => s.y + s.h / 2;
    const travel = Math.hypot(cx(rest) - cx(opener), cy(rest) - cy(opener));
    const at_ = (s) => ({
        center: Math.hypot(cx(s) - cx(opener), cy(s) - cy(opener)),
        centerOfTravel: Math.hypot(cx(s) - cx(opener), cy(s) - cy(opener)) / travel,
        widthOfChange: (s.w - opener.w) / (rest.w - opener.w),
        heightOfChange: (s.h - opener.h) / (rest.h - opener.h),
        rect: { x: s.x, y: s.y, w: s.w, h: s.h },
        opacity: s.o,
    });
    // The largest centre step between two samples, judged only where the frames on both
    // sides of it are no more than two 60 Hz frames long. The sampler's callback runs before
    // the spring's in each frame, so a sample shows the spring one tick late: the step
    // between samples i and i+1 is the spring's tick across the frame before sample i.
    // A step next to a longer frame is the spring catching up on frame time, and is listed
    // in `longFrames` instead of judged.
    const LONG_FRAME = 34;
    const step = (a, b) => Math.hypot(cx(b) - cx(a), cy(b) - cy(a));
    const gap = (list, i) => (i > 0 && i < list.length ? list[i].ft - list[i - 1].ft : 0);
    const maxStep = (list) => {
        let m = 0;
        for (let i = 1; i < list.length; i++)
            if (gap(list, i) <= LONG_FRAME && gap(list, i - 1) <= LONG_FRAME)
                m = Math.max(m, step(list[i - 1], list[i]));
        return m;
    };
    // Each frame longer than LONG_FRAME, with the step the next sample shows across it.
    const longFrames = (list) =>
        list.slice(1).flatMap((s, i) =>
            s.ft - list[i].ft > LONG_FRAME
                ? [{
                      frame: i + 1,
                      ms: +(s.ft - list[i].ft).toFixed(1),
                      stepOfTravel: list[i + 2] ? +(step(s, list[i + 2]) / travel).toFixed(3) : null,
                  }]
                : [],
        );
    const maxGap = (list) => {
        let m = 0;
        for (let i = 1; i < list.length; i++) m = Math.max(m, list[i].ft - list[i - 1].ft);
        return +m.toFixed(1);
    };
    const maxOpacityStep = (list) => {
        let m = 0;
        for (let i = 1; i < list.length; i++) m = Math.max(m, Math.abs(list[i].o - list[i - 1].o));
        return m;
    };
    const result = {
        opener,
        rest: { x: rest.x, y: rest.y, w: rest.w, h: rest.h, o: rest.o },
        travel,
        openFrames: open.length,
        closeFrames: close.length,
        mount: at_(open[0]),
        firstPainted: open[1] ? at_(open[1]) : null,
        lastPainted: close.length ? at_(close.at(-1)) : null,
        maxCenterStepOpen: maxStep(open) / travel,
        maxCenterStepClose: maxStep(close) / travel,
        maxOpacityStepOpen: maxOpacityStep(open),
        maxOpacityStepClose: maxOpacityStep(close),
        opacities: { open: open.map((s) => +s.o.toFixed(3)), close: close.map((s) => +s.o.toFixed(3)) },
        // Each frame: centre x, centre y, width, height, and its frame time in ms after the list's first.
        centers: {
            open: open.map((s) => [+cx(s).toFixed(1), +cy(s).toFixed(1), +s.w.toFixed(1), +s.h.toFixed(1), +(s.ft - open[0].ft).toFixed(1)]),
            close: close.map((s) => [+cx(s).toFixed(1), +cy(s).toFixed(1), +s.w.toFixed(1), +s.h.toFixed(1), +(s.ft - close[0].ft).toFixed(1)]),
        },
        maxFrameGapOpen: maxGap(open),
        maxFrameGapClose: maxGap(close),
        longFramesOpen: longFrames(open),
        longFramesClose: longFrames(close),
    };
    // The close never overshoots: frame by frame the plate only nears its opener, shrinks
    // and fades. The open's rebound past its resting size is read, not judged.
    const toOpener = (s) => Math.hypot(cx(s) - cx(opener), cy(s) - cy(opener));
    let closeMonotone = true;
    for (let i = 1; i < close.length; i++) {
        const a = close[i - 1];
        const b = close[i];
        if (toOpener(b) > toOpener(a) + 0.01 || b.w > a.w + 0.01 || b.h > a.h + 0.01 || b.o > a.o + 1e-6)
            closeMonotone = false;
    }
    result.closeMonotone = closeMonotone;
    result.openReboundW = Math.max(...open.map((s) => s.w)) - rest.w;
    result.openReboundH = Math.max(...open.map((s) => s.h)) - rest.h;
    const near = (m, tol) =>
        m && m.centerOfTravel <= tol && Math.abs(m.widthOfChange) <= tol && Math.abs(m.heightOfChange) <= tol;
    if (reduced) {
        const still = [...open, ...close].every(
            (s) => Math.abs(cx(s) - cx(rest)) <= 1 && Math.abs(cy(s) - cy(rest)) <= 1 && Math.abs(s.w - rest.w) <= 1 && Math.abs(s.h - rest.h) <= 1,
        );
        const fadesIn = open.length >= 3 && open[0].o < 0.3 && result.maxOpacityStepOpen <= 0.6;
        const fadesOut = close.length >= 3 && close.at(-1).o < 0.3 && result.maxOpacityStepClose <= 0.6;
        result.still = still;
        result.verdict = still && fadesIn && fadesOut ? "GREEN" : "RED";
    } else {
        result.verdict =
            near(result.mount, 0.02) &&
            near(result.firstPainted, 0.1) &&
            near(result.lastPainted, 0.1) &&
            closeMonotone &&
            result.maxCenterStepOpen <= 0.3 &&
            result.maxCenterStepClose <= 0.3
                ? "GREEN"
                : "RED";
    }
    return result;
}

const launcher = engine === "webkit" ? webkit : chromium;
const results = { engine, port, base, cells: {} };
let browser;
try {
    browser = await launcher.launch({ headless: true });
    results.version = browser.version();
    for (const cell of cells) {
        const width = cell.endsWith("-390") ? 390 : 1440;
        const reduced = cell.startsWith("dialog-rm");
        const context = await browser.newContext({
            viewport: { width, height: width === 390 ? 844 : 900 },
            reducedMotion: reduced ? "reduce" : "no-preference",
        });
        try {
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (e) => errors.push(String(e)));
            let r;
            if (cell.startsWith("sticky")) r = await sticky(page, width);
            else if (cell === "fit-1440") r = await fit(page);
            else if (cell.startsWith("cards-")) r = await cards(page, context, cell.includes("grid") ? "grid" : "table");
            else if (cell.startsWith("dialog")) r = await dialog(page, width, reduced);
            r.pageErrors = errors;
            results.cells[cell] = r;
            console.log(cell, r.verdict);
        } catch (err) {
            results.cells[cell] = { error: String(err?.stack ?? err) };
            console.log(cell, "ERROR", String(err));
        } finally {
            await context.close();
        }
    }
} finally {
    await browser?.close();
    writeFileSync(out, JSON.stringify(results, null, 2));
}
