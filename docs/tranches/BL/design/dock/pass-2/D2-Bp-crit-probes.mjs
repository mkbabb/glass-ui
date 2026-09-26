// D2-Bp-crit-probes.mjs: the D2-B′ critic's own arms (D2 pass 2). They read DOM, layout,
// timing and pixels only; they never edit source. Run on a build through the floor adapter.
//
//   node D2-Bp-crit-probes.mjs --build <build> --adapter adapter-floor.mjs \
//        --arm blank|lattice|infanim|popdetail|film|all --engine chromium|webkit|all --out <json> [--film <dir>]
//
// Arms
//   blank      per frame over a transition: the plate's painted main extent, and the highest
//              visible opacity of any seat whose painted rect lies inside the plate. A frame
//              in which the plate moves and no seat paints above 0.05 is "blank glass".
//              Also the seats' visible opacity at rest before the trigger. Transitions:
//              swap-long / swap-short (swap scene), first-expand, warm-collapse, warm-expand
//              (morph scene, scene hooks), content-add. The gestalt row (REGISTRY §7.3 "Both")
//   lattice    run.css's open-seat exchange (`inline-size` transition on aria-current cells,
//              the library's own CSS): aria-current moved from "One" to "Two" on an expanded
//              morph dock. Per frame the two cells' painted widths; the console errors the
//              page logs. A size change carried by the library's own transition paints
//              intermediate widths; one finished at `transitionrun` paints none
//   infanim    a seat carrying an infinite, alternating CSS `width` animation (a level meter,
//              a pulsing indicator) on an expanded morph dock: page errors, frames with
//              [data-morphing] up, distinct extents over 2 s
//   popdetail  the compact rung: per frame, the visible opacity of each leaving seat and the
//              plate's trailing edge (item 7's weight, the proto's `pop` arm's raw rows)
//   swapdetail the swap to the long face: per frame, each seat's visible opacity and painted
//              centre against the plate's painted edges (what the blank frames are made of)
//   film       filmstrips of the warm pair through the scene hooks (collapse(), expand()),
//              which the prototype's filmstrip tool could not show (its hover-out trigger waits
//              less than DOCK_COLLAPSE_DELAY_MS), plus the swap and first expand, in the
//              engine given (screencast, 40 ms per tile)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, scrollSource, screencast } from "../harness/lib.mjs";

const args = parseArgs();
const arms = (args.arm ?? "all") === "all" ? ["blank", "lattice", "infanim", "popdetail"] : String(args.arm).split(",");
const engs = (args.engine ?? "all") === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
const target = await openTarget(args);
const out = { probe: "D2-Bp-crit-probes", started: new Date().toISOString(), build: target?.label ?? null, cells: [] };
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
const add = (c) => { c.load = loadAvg(); out.cells.push(c); console.log(JSON.stringify(c)); };

// in-page frame logger: extent main span + best inside-plate seat opacity + per-seat opacity
const LOG = `(() => {
  const P = window.__dockProbe, hp = window.__hp;
  window.__crit = { log: [], stop: false };
  const x = P.axis() === "x";
  const tick = (now) => {
    const e = P.extent();
    const seats = P.seats({ all: true });
    let best = 0; const per = {};
    for (const s of seats) {
      const o = s.getClientRects().length ? hp.visibleOpacity(s) : 0;
      const r = hp.paintedRect(s);
      const name = s.getAttribute("aria-label") || s.textContent.trim().slice(0, 12);
      per[name] = +o.toFixed(3);
      const inside = x ? (r.l >= e.l - 0.5 && r.r <= e.r + 0.5 && r.r - r.l > 0.5) : (r.t >= e.t - 0.5 && r.b <= e.b + 0.5 && r.b - r.t > 0.5);
      if (inside) best = Math.max(best, o);
    }
    window.__crit.log.push({ t: +now.toFixed(1), l: +e.l.toFixed(2), r: +e.r.toFixed(2), t0: +e.t.toFixed(2), b: +e.b.toFixed(2), best: +best.toFixed(3), m: P.morphing(), per });
    if (!window.__crit.stop) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})()`;

function blankStats(log) {
    const main = (f) => (f.r - f.l) + (f.b - f.t);
    let moving = 0, blank = 0, run = 0, longest = 0;
    for (let i = 1; i < log.length; i++) {
        const mv = Math.abs(main(log[i]) - main(log[i - 1])) > 0.25 || Math.abs(log[i].l - log[i - 1].l) > 0.25;
        if (!mv) { run = 0; continue; }
        moving++;
        if (log[i].best < 0.05) { blank++; run++; longest = Math.max(longest, run); } else run = 0;
    }
    return { frames: log.length, movingFrames: moving, blankMovingFrames: blank, longestBlankRun: longest };
}

async function blank(browser, engine) {
    const cases = [
        ["swap-long", "swap", {}, async () => {}, (p) => p.evaluate(() => window.__scene.setFace("long"))],
        ["swap-short", "swap", {}, async (p) => { await p.evaluate(() => window.__scene.setFace("long")); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.setFace("short"))],
        ["first-expand", "morph", {}, async () => {}, (p) => p.evaluate(() => window.__scene.expand())],
        ["warm-collapse", "morph", {}, async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.collapse())],
        ["warm-expand", "morph", {}, async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 500 }); await p.evaluate(() => window.__scene.collapse()); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.expand())],
        ["content-add", "morph", {}, async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.setExtra(true))],
    ];
    for (const [name, scene, query, setup, trigger] of cases) {
        const s = await openScene(browser, target, scene, { query });
        await waitRest(s.page, { quiet: 400 });
        await setup(s.page);
        await s.page.waitForTimeout(200);
        const rest = await s.page.evaluate(() => {
            const P = window.__dockProbe, hp = window.__hp;
            return Object.fromEntries(P.seats({ all: true }).map((el) => [el.getAttribute("aria-label") || el.textContent.trim().slice(0, 12), +(el.getClientRects().length ? hp.visibleOpacity(el) : 0).toFixed(3)]));
        });
        await s.page.evaluate(LOG);
        await s.page.waitForTimeout(50);
        await trigger(s.page);
        await s.page.waitForTimeout(700);
        const log = await s.page.evaluate(() => { window.__crit.stop = true; return window.__crit.log; });
        const st = blankStats(log);
        const firstContent = log.findIndex((f, i) => i > 2 && f.best >= 0.5);
        add({ arm: "blank", engine: LABEL[engine], cell: name, restSeatOpacity: rest, ...st, firstFrameBest50: firstContent, bestTrace: log.slice(0, 24).map((f) => f.best), widthTrace: log.slice(0, 24).map((f) => +((f.r - f.l)).toFixed(1)) });
        await s.close();
    }
}

// swapdetail: the swap's per-seat visible opacity and painted main-axis centre against the
// plate, per frame, for the first 36 frames after setFace("long")
async function swapdetail(browser, engine) {
    const s = await openScene(browser, target, "swap");
    await waitRest(s.page, { quiet: 400 });
    const r = await s.page.evaluate(async () => {
        const P = window.__dockProbe, hp = window.__hp;
        const seats = P.seats({ all: true });
        const names = seats.map((el) => el.getAttribute("aria-label") || el.textContent.trim().slice(0, 8));
        const log = []; let stop = false;
        const tick = (now) => {
            const e = P.extent();
            // the nearest ancestor of "Brushes" that hides it (opacity 0 or visibility not visible)
            const br = seats.find((el) => el.textContent.trim() === "Brushes");
            let hider = "-";
            for (let a = br; a && a !== document.documentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.opacity === "0" || cs.visibility !== "visible") { hider = `${hp.label(a)} op=${cs.opacity} vis=${cs.visibility} inl=${a.style.opacity || "-"}`; break; } }
            const faces = "hider:" + hider + " | " + [...P.root().querySelectorAll(".dock-crossfade > .dock-face")].map((f) => `${f.className.split(" ").filter((c) => c !== "dock-face").join(".")}=${getComputedStyle(f).opacity}/inl:${f.style.opacity || "-"}`).join(" ");
            log.push({ t: +now.toFixed(1), l: +e.l.toFixed(1), r: +e.r.toFixed(1), faces, s: seats.map((el) => { const o = el.getClientRects().length ? hp.visibleOpacity(el) : 0; const b = el.getBoundingClientRect(); return [+o.toFixed(2), +((b.left + b.right) / 2).toFixed(1), el.style.opacity || "-"]; }) });
            if (!stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        await new Promise((f) => setTimeout(f, 60));
        const k0 = log.length;
        window.__scene.setFace("long");
        await new Promise((f) => setTimeout(f, 600)); stop = true;
        return { names, k0, rows: log.slice(Math.max(0, k0 - 1), k0 + 36) };
    });
    add({ arm: "swapdetail", engine: LABEL[engine], names: r.names, rows: r.rows.map((f) => `${f.t} plate[${f.l},${f.r}] {${f.faces}} ` + f.s.map((x, i) => `${r.names[i]}:${x[0]}@${x[1]}(inl ${x[2]})`).join(" ")) });
    await s.close();
}

async function lattice(browser, engine) {
    const s = await openScene(browser, target, "morph");
    const errs = [];
    s.page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
    await waitRest(s.page, { quiet: 400 });
    await s.page.evaluate(() => window.__scene.expand());
    await waitRest(s.page, { quiet: 500 });
    await s.page.evaluate(() => { const r = window.__dockProbe.root(); r.querySelector("[aria-label=One]").setAttribute("aria-current", "page"); });
    await waitRest(s.page, { quiet: 600 });
    await s.page.waitForTimeout(400);
    const r = await s.page.evaluate(async () => {
        const root = window.__dockProbe.root();
        const one = root.querySelector("[aria-label=One]"), two = root.querySelector("[aria-label=Two]");
        const cellOf = (el) => { let c = el; while (c.parentElement && !c.parentElement.classList.contains("dock-run")) c = c.parentElement; return c; };
        const c1 = cellOf(one), c2 = cellOf(two);
        const log = []; let stop = false;
        const tick = (now) => { log.push({ t: now, w1: +c1.getBoundingClientRect().width.toFixed(2), w2: +c2.getBoundingClientRect().width.toFixed(2), m: root.hasAttribute("data-morphing") }); if (!stop) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        await new Promise((f) => setTimeout(f, 60));
        const cssTransition = getComputedStyle(c2).transitionProperty + " " + getComputedStyle(c2).transitionDuration;
        one.removeAttribute("aria-current"); two.setAttribute("aria-current", "page");
        await new Promise((f) => setTimeout(f, 700)); stop = true;
        const distinct = (k) => [...new Set(log.map((f) => f[k]))];
        const maxStep = (k) => Math.max(0, ...log.slice(1).map((f, i) => Math.abs(f[k] - log[i][k])));
        return { cssTransition, w1: distinct("w1"), w2: distinct("w2"), maxStep1: +maxStep("w1").toFixed(2), maxStep2: +maxStep("w2").toFixed(2), morphFrames: log.filter((f) => f.m).length, frames: log.length };
    });
    add({ arm: "lattice", engine: LABEL[engine], ...r, intermediateWidths1: Math.max(0, r.w1.length - 2), intermediateWidths2: Math.max(0, r.w2.length - 2), consoleErrors: errs, pageErrors: s.errors });
    await s.close();
}

async function infanim(browser, engine) {
    const s = await openScene(browser, target, "morph");
    await waitRest(s.page, { quiet: 400 });
    await s.page.evaluate(() => window.__scene.expand());
    await waitRest(s.page, { quiet: 500 });
    const r = await s.page.evaluate(async () => {
        const root = window.__dockProbe.root(), P = window.__dockProbe;
        const st = document.createElement("style");
        st.textContent = "@keyframes critmeter { from { width: 6px } to { width: 30px } } .crit-meter { display: inline-block; height: 6px; background: currentColor; animation: critmeter 0.6s ease-in-out infinite alternate; }";
        document.head.appendChild(st);
        const errs = []; const onErr = (e) => errs.push(String(e.message || e.error).slice(0, 200));
        window.addEventListener("error", onErr);
        const seat = root.querySelector("[data-testid=play]");
        const m = document.createElement("span"); m.className = "crit-meter";
        seat.appendChild(m);
        const log = []; let stop = false;
        const tick = () => { const e = P.extent(); log.push({ w: +(e.r - e.l).toFixed(2), m: P.morphing() }); if (!stop) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        await new Promise((f) => setTimeout(f, 2000)); stop = true;
        window.removeEventListener("error", onErr);
        const running = m.getAnimations().map((a) => a.playState);
        return { windowErrors: errs.slice(0, 5), windowErrorCount: errs.length, frames: log.length, morphFrames: log.filter((f) => f.m).length, distinctExtents: new Set(log.map((f) => f.w)).size, extentSpan: +(Math.max(...log.map((f) => f.w)) - Math.min(...log.map((f) => f.w))).toFixed(2), meterAnimations: running };
    });
    add({ arm: "infanim", engine: LABEL[engine], ...r, pageErrors: s.errors.slice(0, 5), pageErrorCount: s.errors.length });
    await s.close();
}

async function popdetail(browser, engine) {
    const s = await openScene(browser, target, "compact", { query: { active: "b" } });
    await scrollSource(s.page, 0); await s.page.waitForTimeout(80); await waitRest(s.page, { quiet: 400 });
    const r = await s.page.evaluate(async () => {
        const hp = window.__hp, P = window.__dockProbe, run = P.root().querySelector(".dock-run");
        const seats = [...run.querySelectorAll("[data-dock-seat], .dock-separator")].filter((el) => !el.parentElement.closest("[data-dock-seat]"));
        const op = (el) => (el.getClientRects().length ? hp.visibleOpacity(el) : 0);
        const log = []; let stop = false;
        const tick = (now) => { const e = P.extent(); log.push({ t: +now.toFixed(1), l: +e.l.toFixed(1), r: +e.r.toFixed(1), o: seats.map((el) => +op(el).toFixed(3)) }); if (!stop) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        await new Promise((f) => setTimeout(f, 60));
        window.__scene?.scrollTo ? window.__scene.scrollTo(900) : window.scrollTo(0, 900);
        await new Promise((f) => setTimeout(f, 900)); stop = true;
        const who = seats.map((el) => el.getAttribute("aria-label") ?? (el.classList.contains("dock-separator") ? "sep" : el.textContent.trim().slice(0, 10)));
        const t0 = log.findIndex((f, i) => i > 0 && (Math.abs(f.r - log[i - 1].r) > 0.25 || Math.abs(f.l - log[i - 1].l) > 0.25));
        const leaving = who.map((w, i) => ({ who: w, i })).filter(({ i }) => log[0].o[i] >= 0.95 && log.at(-1).o[i] <= 0.05);
        const rows = leaving.map(({ who, i }) => {
            const k0 = log.findIndex((f) => f.o[i] < 0.95), k1 = log.findIndex((f) => f.o[i] <= 0.05);
            return { who, fromFrame: k0 - t0, toFrame: k1 - t0, ms: +(log[k1].t - log[Math.max(0, k0 - 1)].t).toFixed(1), path: log.slice(Math.max(0, k0 - 1), k1 + 1).map((f) => f.o[i]) };
        });
        const plateFrames = (() => { let a = t0, b = t0; for (let i = t0 + 1; i < log.length; i++) if (Math.abs(log[i].r - log[i - 1].r) > 0.25 || Math.abs(log[i].l - log[i - 1].l) > 0.25) b = i; return { frames: b - a, ms: +(log[b].t - log[a].t).toFixed(1) }; })();
        return { leaving: rows, plateMorph: plateFrames };
    });
    add({ arm: "popdetail", engine: LABEL[engine], ...r });
    await s.close();
}

async function film(browser, engine) {
    const dir0 = path.resolve(args.film ?? "film");
    fs.mkdirSync(dir0, { recursive: true });
    const crop = (vp) => ({ x: vp.width / 2 - 360, y: vp.height - 24 - 56 - 24, width: 720, height: 104 });
    const cases = [
        ["warm-collapse", "morph", async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.collapse())],
        ["warm-expand", "morph", async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 500 }); await p.evaluate(() => window.__scene.collapse()); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.expand())],
        ["first-expand", "morph", async () => {}, (p) => p.evaluate(() => window.__scene.expand())],
        ["swap-long", "swap", async () => {}, (p) => p.evaluate(() => window.__scene.setFace("long"))],
        ["content-add", "morph", async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 500 }); }, (p) => p.evaluate(() => window.__scene.setExtra(true))],
    ];
    for (const [name, scene, setup, trigger] of cases) {
        const dir = path.join(dir0, `.film-${engine}-${name}`);
        const { frames, marks } = await screencast(browser, target, scene, { crop, dir }, async (page, mark) => {
            await waitRest(page, { quiet: 400 });
            await setup(page);
            await page.waitForTimeout(400);
            mark("trigger");
            await trigger(page);
            await page.waitForTimeout(900);
        });
        const i0 = Math.max(0, Math.floor(marks.trigger / 40) - 2);
        const pick = frames.slice(i0, i0 + 12).map((f) => f.file);
        const file = path.join(dir0, `crit-${engine}-${name}.png`);
        execFileSync("ffmpeg", ["-v", "error", "-y", ...pick.flatMap((f) => ["-i", f]), "-filter_complex", `vstack=inputs=${pick.length}`, file]);
        fs.rmSync(dir, { recursive: true, force: true });
        add({ arm: "film", engine: LABEL[engine], cell: name, file: path.basename(file), tiles: pick.length, fromFrame: i0 });
    }
}

for (const engine of engs) {
    const browser = await launch(engine);
    for (const arm of arms) {
        try {
            if (arm === "blank") await blank(browser, engine);
            else if (arm === "lattice") await lattice(browser, engine);
            else if (arm === "infanim") await infanim(browser, engine);
            else if (arm === "popdetail") await popdetail(browser, engine);
            else if (arm === "film") await film(browser, engine);
            else if (arm === "swapdetail") await swapdetail(browser, engine);
        } catch (e) { add({ arm, engine: LABEL[engine], error: String(e).slice(0, 400) }); }
    }
    await browser.close();
}
out.finished = new Date().toISOString();
if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 1)); }
await target?.close?.();
process.exit(0);
