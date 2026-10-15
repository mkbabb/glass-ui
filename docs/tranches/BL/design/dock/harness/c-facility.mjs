// CF · the O-88 collapse facility (H4-10, pass-4/H4.md). Owner ruling O-88: the collapse facility ships in
// 10.2.0; the collapsed form is content-sized, never a square tile; one continuous morph; the triggers;
// #persistent; keyboard with focus kept; menus from a collapsed dock; side, vertical, 390 px and coarse.
// Born RED: it runs in glass's own demo app, on the docks the demo ships, not on a scene written for it.
//
//   node c-facility.mjs --build <dir> [--adapter <a>] [--engine …] [--out <dir>] [--cells <re>]
//   node c-facility.mjs --fixture pass|<fault> [--engine …]       (the fixture's scene=facility)
//
// Targets. A build: the demo routes, the probe rooted at the demo dock (HEAD's testids; a route that renames
// them supplies `facility` in its adapter: { h: [route, sel], v: [route, sel] }). The fixture: scene=facility
// (&v=1 vertical, &menu=1 a menu trigger in the collapsible run).
// Reads, without adapter help: the DISCLOSURE is the first [aria-expanded] in the dock without aria-haspopup;
// PERSISTENT elements are P.persistent() when the probe has it, else the focusables under .dock-persistent and
// .dock-persistent-end; a MENU trigger is an [aria-haspopup] in the dock; an open menu is a [role=menu] that
// paints.
//
// Cells and rows (C1-C7; a row is green only when every cell under it is):
//   c1·shape·h      C1  collapsed at rest: not a square tile (main extent ≥ cross + 8 px), a stadium (corner
//                       radius ≥ cross/2 − 1 px), hugs its content (main extent ≤ the painting seats' span + 24
//                       px), a disclosure that paints with a name, the plate paints in both postures
//   c2·morph·h      C2  the first hover expand, the pointer-leave collapse and a warm expand, each sampled per rAF
//                       in the page: continuous (no
//                       one-frame step of the main extent > 45 % of the travel; ≥ 3 frames strictly between the
//                       rests), no flash (the plate paints on every frame, some seat paints on every frame), no
//                       layout pop (the root's cross size holds within 1 px); frames: PNGs at the morph's steps
//   c2·prm          C2  under prefers-reduced-motion the expand lands within 3 frames of its first change
//   c2·rapid        C2  five keyboard toggles 70 ms apart (Enter, Escape, …, Enter): the dock rests expanded,
//                       at the expanded rest extent (± 1.5 px), its disclosure state agrees
//   c3·hover        C3  hover expands within 1.5 s; leaving collapses within 6 s
//   c3·focus        C3  Tab into the dock: it expands, or focus sits on the disclosure (the keyboard path, C5)
//   c3·scroll       C3  an expanded dock nothing holds collapses on a page scroll within 1.5 s (before the dwell)
//   c4·persistent   C4  persistent elements paint, take a press and take focus in both postures
//   c5·keyboard     C5  Tab (Option-Tab in WebKit, Safari's key for buttons) reaches the dock; collapsed, it offers a
//                       named disclosure with aria-expanded=false; Enter expands and Escape collapses, focus kept in
//                       the dock both ways (on the disclosure when there is one), aria-expanded agreeing
//   c6·menu         C6  a menu opens from the dock that started collapsed; it holds the dock open past the
//                       dwell; Escape closes it with focus back on its trigger. No menu trigger in a
//                       collapsible dock: FAIL (absent)
//   c1·shape·v      C7  c1 on the vertical dock
//   c2·morph·v      C7  c2 on the vertical dock
//   c7·narrow       C7  at 390 × 844 the expanded dock lies inside the viewport and the page does not scroll
//                       sideways
//   c7·coarse-tap   C3, C7  touch at 390 px: a tap on the collapsed dock (its disclosure when that paints) expands it
//                       and activates nothing but a persistent element (C4's) or the disclosure
import fs from "node:fs";
import path from "node:path";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, r2 } from "./lib.mjs";

export const ROWS = {
    C1: ["c1·shape·h"], C2: ["c2·morph·h", "c2·prm", "c2·rapid"], C3: ["c3·hover", "c3·focus", "c3·scroll", "c7·coarse-tap"],
    C4: ["c4·persistent"], C5: ["c5·keyboard"], C6: ["c6·menu"], C7: ["c1·shape·v", "c2·morph·v", "c7·narrow", "c7·coarse-tap"],
};
const DEMO = { h: ["/dock/overview", "[data-testid=dock-horizontal-collapsed-first-paint]"], v: ["/dock/vertical", "[data-testid=dock-vertical-collapsed-first-paint]"] };
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "CF");
const rep = makeReport("CF", target);
const MAP = target.adapter?.facility ?? DEMO;

/** Open the facility dock: the fixture's scene, or the demo route with the probe rooted at its dock. */
async function open(browser, variant = "h", ctx = {}) {
    if (target.kind === "fixture") {
        const s = await openScene(browser, target, "facility", { query: { v: variant === "v" ? "1" : "0", menu: "1" }, ctx });
        await s.page.evaluate(() => { document.body.style.minHeight = "300vh"; });
        return s;
    }
    const [route, sel] = MAP[variant];
    const t = { ...target, url: () => target.demoUrl(route), adapter: { ...target.adapter, rootSel: () => sel, sidebarRootSel: sel } };
    const s = await openScene(browser, t, "sidebar", { ctx, settle: 1500 });
    await s.page.evaluate(() => window.__dockProbe.root().scrollIntoView({ block: "center" }));
    await s.page.waitForTimeout(300);
    return s;
}

// in-page reads
const READ = `() => {
  const P = window.__dockProbe, hp = window.__hp, root = P.root(), x = P.axis() === "x";
  const e = P.extent(), rb = root.getBoundingClientRect();
  const disc = [...root.querySelectorAll("[aria-expanded]")].find((el) => !el.hasAttribute("aria-haspopup")) ?? null;
  const pers = P.persistent ? P.persistent() : [...root.querySelectorAll(".dock-persistent, .dock-persistent-end")].flatMap((g) => [...g.querySelectorAll("a[href], button, [tabindex]")]);
  const paint = P.paintingSeats().filter((s) => { const c = (s.rect.l + s.rect.r) / 2, m = (s.rect.t + s.rect.b) / 2; return c > e.l && c < e.r && m > e.t && m < e.b; });
  const span = paint.length ? (x ? Math.max(...paint.map((s) => s.rect.r)) - Math.min(...paint.map((s) => s.rect.l)) : Math.max(...paint.map((s) => s.rect.b)) - Math.min(...paint.map((s) => s.rect.t))) : 0;
  const plate = P.plate(), pcs = plate ? getComputedStyle(plate) : null, pq = plate?.getBoundingClientRect();
  const rad = (el) => { if (!el) return 0; const cs = getComputedStyle(el); const r0 = cs.borderTopLeftRadius || "0"; const q = el.getBoundingClientRect(); let r = r0.endsWith("%") ? parseFloat(r0) / 100 * Math.min(q.width, q.height) : parseFloat(r0) || 0; const m = /round\\s+([\\d.]+)px/.exec(cs.clipPath || ""); if (m) r = Math.max(r, parseFloat(m[1])); return r; };
  const R = Math.max(rad(plate), ...(P.hit?.() ?? []).map(rad), ...(P.edge?.() ?? []).map(rad));
  const main = x ? e.r - e.l : e.b - e.t, cross = x ? e.b - e.t : e.r - e.l;
  const dq = disc?.getBoundingClientRect();
  return { t: performance.now(), m: !!P.morphing(), posture: P.posture(), main: +main.toFixed(2), cross: +cross.toFixed(2), e: [e.l, e.t, e.r, e.b].map((v) => +v.toFixed(1)),
    rootCross: +(x ? rb.height : rb.width).toFixed(2), R: +R.toFixed(2), span: +span.toFixed(2), nPaint: paint.length,
    plateO: plate ? hp.visibleOpacity(plate) : 0, plateW: pq ? pq.width : 0,
    disc: disc ? { name: (disc.getAttribute("aria-label") || disc.textContent || "").trim().slice(0, 40), exp: disc.getAttribute("aria-expanded"), paints: hp.visibleOpacity(disc) > 0.05 && dq.width >= 4 && dq.height >= 4, c: [(dq.left + dq.right) / 2, (dq.top + dq.bottom) / 2], label: hp.label(disc) } : null,
    pers: pers.map((p) => { const q = p.getBoundingClientRect(), cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2; let h = null; for (const el of document.elementsFromPoint(cx, cy)) if (!el.closest("[inert]")) { h = el; break; } return { label: hp.label(p), o: hp.visibleOpacity(p), w: q.width, h: q.height, inert: !!p.closest("[inert]"), tab: p.tabIndex, press: !!h && p.contains(h), got: h ? hp.label(h) : "null" }; }),
    active: document.activeElement ? hp.label(document.activeElement) : "null", activeIn: root.contains(document.activeElement), activeIsDisc: !!disc && document.activeElement === disc,
    triggers: [...root.querySelectorAll("[aria-haspopup]")].length,
    menuOpen: [...document.querySelectorAll("[role=menu]")].some((m) => { const q = m.getBoundingClientRect(); return !m.hidden && q.width > 4 && q.height > 4 && getComputedStyle(m).visibility !== "hidden"; }),
    vw: innerWidth, sw: document.documentElement.scrollWidth, sy: (() => { for (let a = root.parentElement; a; a = a.parentElement) { const cs = getComputedStyle(a); if (/(auto|scroll)/.test(cs.overflowY) && a.scrollHeight > a.clientHeight + 1) return a.scrollTop; } return scrollY; })(),
    persC: pers.map((p) => { const q = p.getBoundingClientRect(); return [q.left, q.top, q.right, q.bottom]; }) };
}`;
const read = (page) => page.evaluate(`(${READ})()`);
/** Sample READ on every rAF in the page until `stop()` is called or `max` frames. */
const startSample = (page, max = 150) => page.evaluate(([src, max]) => { const f = new Function(`return (${src})`)(); const rows = [f()], run = (window.__cfRun ?? 0) + 1; window.__cfRun = run; window.__cfRows = rows; let n = 0; const tick = () => { if (window.__cfRun !== run || n++ > max) return; rows.push(f()); requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [READ, max]);
const stopSample = async (page) => page.evaluate(() => { window.__cfRun = (window.__cfRun ?? 0) + 1; return window.__cfRows; });
async function until(page, pred, cap) { const t0 = Date.now(); let r = await read(page); while (!pred(r) && Date.now() - t0 < cap) { await page.waitForTimeout(80); r = await read(page); } return { r, ms: Date.now() - t0, ok: pred(r) }; }
const centre = (r) => [(r.e[0] + r.e[2]) / 2, (r.e[1] + r.e[3]) / 2];
const away = async (page) => page.mouse.move(2, 2);
/** Tab from the top of the document until focus is inside the dock (≤ 60 presses). WebKit, like Safari by
 *  default, Tabs only to fields and links; Option-Tab is the key a Safari keyboard user presses for buttons. */
let TAB = "Tab";
async function tabIn(page, pred = (r) => r.activeIn) {
    await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, window.scrollY); });
    for (let i = 0; i < 60; i++) { await page.keyboard.press(TAB); const r = await read(page); if (pred(r)) return { r, presses: i + 1 }; }
    return { r: await read(page), presses: 60 };
}
const done = (engine, cell, checks, summary, extra = {}) => {
    const unj = Object.entries(checks).filter(([, v]) => v === null).map(([k]) => k);
    const failed = Object.entries(checks).filter(([, v]) => v === false).map(([k]) => k);
    rep.add({ engine, cell: cell + engineTag(target, engine), pass: !failed.length && !unj.length, unmeasured: !failed.length && unj.length ? true : undefined, failed, unjudged: unj, ...extra,
        summary: `${!failed.length && unj.length ? "UNMEASURED " + unj.join(", ") + ": " : ""}${summary}${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
};

/** Frames at the morph's steps: screenshots from the trigger at the times they land (recorded beside each). */
async function frames(page, engine, cell, trigger) {
    const dir = path.join(out, "frames", `${engine}-${cell.replace(/[^\w-]+/g, "_")}`); fs.mkdirSync(dir, { recursive: true });
    const r0 = await read(page); const [cx, cy] = centre(r0);
    const clip = (r) => { const pad = 40; const l = Math.max(0, Math.min(r0.e[0], r.e[0]) - pad - 160), t = Math.max(0, Math.min(r0.e[1], r.e[1]) - pad - (r0.e[3] - r0.e[1] > 200 ? 160 : 40)); return { x: l, y: t, width: Math.min(r.vw - l, Math.max(r0.e[2], r.e[2]) - l + pad + 160), height: Math.max(r0.e[3], r.e[3]) - t + pad + 160 }; };
    const shots = [];
    const t0 = Date.now();
    await trigger(cx, cy);
    // each file is named by the window its capture fell in (the request and the return, ms after the trigger)
    for (let k = 0; k < 8 && Date.now() - t0 < 1400; k++) { const r = await read(page); const a = Date.now() - t0; const tmp = path.join(dir, `.step-${k}.png`); await page.screenshot({ path: tmp, clip: clip(r) }); const f = path.join(dir, `step-${String(k).padStart(2, "0")}-${a}-${Date.now() - t0}ms.png`); fs.renameSync(tmp, f); shots.push(path.basename(f)); }
    return { dir, shots };
}

function judgeMorph(rows) {
    const a = rows[0], z = rows.at(-1); const travel = Math.abs(z.main - a.main);
    let step = 0, between = 0;
    const lo = Math.min(a.main, z.main) + 0.5, hi = Math.max(a.main, z.main) - 0.5;
    for (let i = 1; i < rows.length; i++) { step = Math.max(step, Math.abs(rows[i].main - rows[i - 1].main)); if (rows[i].main > lo && rows[i].main < hi) between++; }
    const flash = rows.filter((r) => r.plateO < 0.5 || r.nPaint === 0).length;
    const pop = Math.max(...rows.map((r) => r.rootCross)) - Math.min(...rows.map((r) => r.rootCross));
    return { travel: r2(travel), step: r2(step), between, flash, pop: r2(pop), checks: { moved: travel >= 8, continuous: travel >= 8 && step <= 0.45 * travel && between >= 3, flash: flash === 0, pop: pop <= 1 } };
}

for (const engine of engines(args)) {
    const browser = await launch(engine);   // lib.launch retires Playwright WebKit every NAV_CAP page loads
    TAB = engine === "webkit" ? "Alt+Tab" : "Tab";
    try {
        for (const variant of ["h", "v"]) {
            // C1 / C7 · the collapsed form
            await rep.guard(engine, [`c1·shape·${variant}` + engineTag(target, engine)], async () => {
                const s = await open(browser, variant);
                try {
                    await away(s.page); await s.page.waitForTimeout(400);
                    const c = await read(s.page);
                    const f = path.join(out, "frames", `${engine}-c1-${variant}-collapsed.png`); fs.mkdirSync(path.dirname(f), { recursive: true });
                    await s.page.screenshot({ path: f, clip: { x: Math.max(0, c.e[0] - 40), y: Math.max(0, c.e[1] - 40), width: c.e[2] - c.e[0] + 80, height: c.e[3] - c.e[1] + 80 } });
                    const [cx, cy] = centre(c); await s.page.mouse.move(cx, cy);
                    const x = await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000);
                    await away(s.page);
                    const checks = { square: c.main >= c.cross + 8, stadium: c.R >= c.cross / 2 - 1, hugs: c.span > 0 && c.main <= c.span + 24, summary: !!c.disc && c.disc.paints && c.disc.name.length > 0, material: c.plateO >= 0.5 && x.r.plateO >= 0.5 };
                    done(engine, `c1·shape·${variant}`, checks, `collapsed ${c.main}×${c.cross} px (main×cross), corner R ${c.R} px (stadium ≥ ${r2(c.cross / 2 - 1)}), painting seats' span ${c.span} px (hug bound ${r2(c.span + 24)}); disclosure ${c.disc ? `${c.disc.label} "${c.disc.name}" aria-expanded=${c.disc.exp}${c.disc.paints ? "" : " (does not paint)"}` : "NONE"}; plate opacity ${r2(c.plateO)} collapsed, ${r2(x.r.plateO)} expanded (${x.r.posture}); frame ${path.basename(f)}`, { collapsed: c, frame: f });
                } finally { await s.close(); }
            });
            // C2 / C7 · the morph
            await rep.guard(engine, [`c2·morph·${variant}` + engineTag(target, engine)], async () => {
                const s = await open(browser, variant);
                try {
                    await away(s.page); await s.page.waitForTimeout(400);
                    const r0 = await read(s.page); const [cx, cy] = centre(r0);
                    await startSample(s.page); await s.page.mouse.move(cx, cy);
                    await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000); await s.page.waitForTimeout(250);
                    const up = await stopSample(s.page);
                    await startSample(s.page, 900); await away(s.page);
                    await until(s.page, (r) => r.posture === "collapsed" && !r.m, 7000); await s.page.waitForTimeout(250);
                    const down = await stopSample(s.page);
                    // the collapse waits out the dwell: judge from the last frame before the extent first moves
                    const k0 = Math.max(0, down.findIndex((r) => Math.abs(r.main - down[0].main) > 0.5) - 1);
                    // the warm expand: a second hover after the collapse (the first is the cold one a page shows first)
                    await startSample(s.page); await s.page.mouse.move(cx, cy);
                    await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000); await s.page.waitForTimeout(250);
                    const warm = await stopSample(s.page);
                    await away(s.page); await until(s.page, (r) => r.posture === "collapsed" && !r.m, 7000); await s.page.waitForTimeout(300);
                    const U = judgeMorph(up), D = judgeMorph(down.slice(k0)), W = judgeMorph(warm);
                    const firstMove = up.findIndex((r) => Math.abs(r.main - up[0].main) > 0.5), stall = firstMove > 0 ? Math.round(up[firstMove].t - up[0].t) : null;
                    // frames: a separate replay, so the screenshots do not perturb the sampled one
                    const fr = await frames(s.page, engine, `c2·morph·${variant}-expand`, (x, y) => s.page.mouse.move(x, y));
                    const checks = {}; for (const k of Object.keys(U.checks)) checks[k] = U.checks[k] && D.checks[k] && W.checks[k];
                    const say = (n, X) => `${n}: travel ${X.travel} px, largest one-frame step ${X.step} px (bound ${r2(0.45 * X.travel)}), ${X.between} frame(s) between the rests, flash ${X.flash}, root cross drift ${X.pop} px`;
                    done(engine, `c2·morph·${variant}`, checks, `${say("first expand", U)}, the extent first moves ${stall ?? "—"} ms after the hover; ${say("collapse", D)}; ${say("warm expand", W)}; frames ${fr.shots.length} (${path.relative(out, fr.dir)}, warm)`, { up: U, down: D, warm: W, stallMs: stall, frames: fr });
                } finally { await s.close(); }
            });
        }
        await rep.guard(engine, ["c2·prm" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h", { reducedMotion: "reduce" });
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const r0 = await read(s.page); const [cx, cy] = centre(r0);
                await startSample(s.page); await s.page.mouse.move(cx, cy);
                await until(s.page, (r) => r.posture !== "collapsed", 3000); await s.page.waitForTimeout(600);
                const rows = await stopSample(s.page);
                const z = rows.at(-1).main, i0 = rows.findIndex((r) => Math.abs(r.main - r0.main) > 0.5), i1 = rows.findIndex((r) => Math.abs(r.main - z) <= 1);
                const n = i0 < 0 ? null : i1 - i0;
                done(engine, "c2·prm", { moved: Math.abs(z - r0.main) >= 8, instant: n !== null && n <= 3 }, `reduced motion: ${r0.main} → ${z} px; the extent lands ${n === null ? "(never moved)" : n + " frame(s)"} after its first change (bound ≤ 3)`);
            } finally { await s.close(); }
        });
        await rep.guard(engine, ["c2·rapid" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const k = await tabIn(s.page);
                if (!k.r.activeIn) { done(engine, "c2·rapid", { reached: false }, `${TAB} never reached the dock in ${k.presses} presses (focus on ${k.r.active})`); return; }
                if (k.r.posture !== "collapsed") { await s.page.keyboard.press("Escape"); await until(s.page, (r) => r.posture === "collapsed" && !r.m, 3000); await s.page.waitForTimeout(300); }
                await s.page.keyboard.press("Enter"); const ex = await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000);
                await s.page.waitForTimeout(400); const restMain = (await read(s.page)).main;
                await s.page.keyboard.press("Escape"); await until(s.page, (r) => r.posture === "collapsed" && !r.m, 3000);
                for (const key of ["Enter", "Escape", "Enter", "Escape", "Enter"]) { await s.page.keyboard.press(key); await s.page.waitForTimeout(70); }
                const z = await until(s.page, (r) => !r.m, 4000); await s.page.waitForTimeout(500); const r = await read(s.page);
                done(engine, "c2·rapid", { opened: ex.ok, rests: r.posture !== "collapsed" && Math.abs(r.main - restMain) <= 1.5, state: !r.disc || r.disc.exp !== "false" }, `five toggles 70 ms apart ending on Enter: rests ${r.posture} at ${r.main} px (expanded rest ${restMain} px); disclosure aria-expanded ${r.disc ? r.disc.exp : "(none)"}; focus ${r.active}`);
            } finally { await s.close(); }
        });
        // C3 · the triggers
        await rep.guard(engine, ["c3·hover" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const [cx, cy] = centre(await read(s.page)); await s.page.mouse.move(cx, cy);
                const a = await until(s.page, (r) => r.posture !== "collapsed", 1500);
                await s.page.waitForTimeout(400); await away(s.page);
                const b = await until(s.page, (r) => r.posture === "collapsed", 6000);
                done(engine, "c3·hover", { enter: a.ok, leave: b.ok }, `hover: ${a.ok ? `expanded after ${a.ms} ms` : "did NOT expand in 1.5 s"}; leave: ${b.ok ? `collapsed after ${b.ms} ms` : "did NOT collapse in 6 s"}`);
            } finally { await s.close(); }
        });
        await rep.guard(engine, ["c3·focus" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const k = await tabIn(s.page); await s.page.waitForTimeout(1200); const r = await read(s.page);
                done(engine, "c3·focus", { reached: r.activeIn, opens: r.activeIn && (r.posture !== "collapsed" || r.activeIsDisc) }, `${TAB} ×${k.presses}: focus on ${r.active}${r.activeIn ? " (in the dock)" : " (NOT in the dock)"}; after 1.2 s the dock is ${r.posture}${r.activeIsDisc ? " with focus on the disclosure" : ""}`);
            } finally { await s.close(); }
        });
        await rep.guard(engine, ["c3·scroll" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const r0 = await read(s.page); const [cx, cy] = centre(r0); await s.page.mouse.move(cx, cy);
                const a = await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000);
                const wx = cx, wy = Math.max(20, r0.e[1] - 120);
                await s.page.mouse.move(wx, wy); await s.page.waitForTimeout(150);
                const y0 = (await read(s.page)).sy;   // the dock's own scroller (the demo scrolls a pane, not the window)
                await s.page.mouse.wheel(0, 240);
                const b = await until(s.page, (r) => r.posture === "collapsed", 1500);
                const y1 = (await read(s.page)).sy;
                done(engine, "c3·scroll", { opened: a.ok, scrolled: Math.abs(y1 - y0) > 20 ? true : null, collapses: Math.abs(y1 - y0) > 20 ? b.ok : null }, `expanded ${a.ok ? "yes" : "NO"}; wheel 240 px scrolled the page ${r2(y1 - y0)} px; ${b.ok ? `collapsed after ${b.ms} ms` : "did NOT collapse within 1.5 s (the dwell is 3.6 s)"}`);
            } finally { await s.close(); }
        });
        // C4 · #persistent
        await rep.guard(engine, ["c4·persistent" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const c = await read(s.page); const [cx, cy] = centre(c); await s.page.mouse.move(cx, cy);
                await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000); await s.page.waitForTimeout(300);
                const x = await read(s.page);
                const ok = (p) => p.o > 0.5 && p.w >= 8 && p.h >= 8 && !p.inert && p.press && p.tab >= 0;
                const bad = [...c.pers.filter((p) => !ok(p)).map((p) => ({ ...p, at: "collapsed" })), ...x.pers.filter((p) => !ok(p)).map((p) => ({ ...p, at: "expanded" }))];
                done(engine, "c4·persistent", { present: c.pers.length > 0, live: c.pers.length > 0 && bad.length === 0 }, `${c.pers.length} persistent element(s) collapsed, ${x.pers.length} expanded; failing: ${bad.length ? bad.slice(0, 3).map((p) => `${p.label} ${p.at} (opacity ${r2(p.o)}, ${r2(p.w)}×${r2(p.h)}, inert ${p.inert}, tabIndex ${p.tab}, press → ${p.got})`).join("; ") : "none"}`);
            } finally { await s.close(); }
        });
        // C5 · keyboard
        await rep.guard(engine, ["c5·keyboard" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const k = await tabIn(s.page);
                if (!k.r.activeIn) { done(engine, "c5·keyboard", { reached: false }, `${TAB} never reached the dock in ${k.presses} presses (focus on ${k.r.active})`); return; }
                // focus on the way in may already have opened the dock (C3): then Escape first, Enter second.
                // Collapsed, the dock must offer a named disclosure saying aria-expanded=false; focus never leaves the dock
                const openFirst = k.r.posture === "collapsed";
                const named = (r) => !!r.disc && r.disc.name.length > 0 && r.disc.exp === "false";
                const agrees = (r) => !r.disc || (r.posture === "collapsed" ? r.disc.exp === "false" : r.disc.exp !== "false");
                const enter = async () => { await s.page.keyboard.press("Enter"); const a = await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000); await s.page.waitForTimeout(300); return { a, r: await read(s.page) }; };
                const escape = async () => { await s.page.keyboard.press("Escape"); const b = await until(s.page, (r) => r.posture === "collapsed" && !r.m, 3000); await s.page.waitForTimeout(300); return { b, r: await read(s.page) }; };
                let E, X;
                if (openFirst) { E = await enter(); X = await escape(); } else { X = await escape(); E = await enter(); }
                const coll = openFirst ? k.r : X.r;
                done(engine, "c5·keyboard", { reached: true, disclosure: named(coll), enter: E.a.ok && E.r.activeIn && agrees(E.r), escape: X.b.ok && X.r.activeIn && agrees(X.r) && (!X.r.disc || X.r.activeIsDisc || X.r.active !== "null") },
                    `${TAB} ×${k.presses} → ${k.r.active} with the dock ${k.r.posture}; ${openFirst ? "Enter then Escape" : "Escape then Enter"}. Collapsed disclosure: ${coll.disc ? `${coll.disc.label} "${coll.disc.name}" aria-expanded=${coll.disc.exp}` : "NONE"}. Enter: ${E.a.ok ? "expanded" : "did NOT expand"}, focus ${E.r.active}${E.r.activeIn ? "" : " (LEFT the dock)"}; Escape: ${X.b.ok ? "collapsed" : "did NOT collapse"}, focus ${X.r.active}${X.r.activeIn ? (X.r.activeIsDisc ? " (the disclosure)" : " (in the dock)") : " (LEFT the dock)"}`);
            } finally { await s.close(); }
        });
        // C6 · menus from a collapsed dock
        await rep.guard(engine, ["c6·menu" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h");
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const c = await read(s.page);
                if (!c.triggers) { done(engine, "c6·menu", { menu: false }, `absent: the collapsible dock carries no menu trigger ([aria-haspopup]) in either posture; O-88's menu-from-a-collapsed-dock has nothing to open`); return; }
                const [cx, cy] = centre(c); await s.page.mouse.move(cx, cy);
                await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000); await s.page.waitForTimeout(300);
                const trig = await s.page.evaluate(() => { const t = window.__dockProbe.root().querySelector("[aria-haspopup]"); const q = t.getBoundingClientRect(); return { x: (q.left + q.right) / 2, y: (q.top + q.bottom) / 2, label: window.__hp.label(t) }; });
                await s.page.mouse.click(trig.x, trig.y);
                const o = await until(s.page, (r) => r.menuOpen, 1500);
                const mq = await s.page.evaluate(() => { const m = [...document.querySelectorAll("[role=menu]")].find((m) => !m.hidden && m.getBoundingClientRect().width > 4); if (!m) return null; const q = m.getBoundingClientRect(); return { x: (q.left + q.right) / 2, y: (q.top + q.bottom) / 2 }; });
                if (mq) await s.page.mouse.move(mq.x, mq.y);
                await s.page.waitForTimeout(4500);
                const held = await read(s.page);
                await s.page.keyboard.press("Escape"); await s.page.waitForTimeout(500);
                const esc = await read(s.page);
                const back = await s.page.evaluate((l) => window.__hp.label(document.activeElement) === l, trig.label);
                done(engine, "c6·menu", { menu: true, opens: o.ok, holds: o.ok && held.menuOpen && held.posture !== "collapsed", escape: o.ok && !esc.menuOpen && back }, `trigger ${trig.label}: menu ${o.ok ? `open after ${o.ms} ms` : "did NOT open"}; 4.5 s later (past the dwell, pointer on the menu) menu ${held.menuOpen ? "open" : "CLOSED"}, dock ${held.posture}; Escape: menu ${esc.menuOpen ? "STILL open" : "closed"}, focus ${esc.active}${back ? " (the trigger)" : " (NOT the trigger)"}`);
            } finally { await s.close(); }
        });
        // C7 · 390 px, coarse
        await rep.guard(engine, ["c7·narrow" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h", { viewport: { width: 390, height: 844 } });
            try {
                await away(s.page); await s.page.waitForTimeout(400);
                const [cx, cy] = centre(await read(s.page)); await s.page.mouse.move(cx, cy);
                const a = await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000); await s.page.waitForTimeout(300);
                const r = await read(s.page);
                const f = path.join(out, "frames", `${engine}-c7-narrow-expanded.png`); fs.mkdirSync(path.dirname(f), { recursive: true }); await s.page.screenshot({ path: f });
                done(engine, "c7·narrow", { opened: a.ok, inside: r.e[0] >= -0.5 && r.e[2] <= r.vw + 0.5, noscroll: r.sw <= r.vw + 1 }, `390 px: expanded extent ${r.e[0]}..${r.e[2]} px in a ${r.vw} px viewport; document scrollWidth ${r.sw}; frame ${path.basename(f)}`);
            } finally { await s.close(); }
        });
        await rep.guard(engine, ["c7·coarse-tap" + engineTag(target, engine)], async () => {
            const s = await open(browser, "h", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: engine !== "webkit" ? true : undefined });
            try {
                await s.page.waitForTimeout(400);
                const c = await read(s.page);
                await s.page.evaluate(() => { window.__cfActs = []; window.__dockProbe.root().addEventListener("click", (e) => { if (!e.defaultPrevented) window.__cfActs.push(window.__hp.label(e.target.closest("a, button, [role=button], [role=tab]") ?? e.target)); }); });
                // the tap lands on the disclosure when it paints, else on the extent's centre; a persistent element's own
                // activation is C4's (it stays live while collapsed) and is not a tap-through
                const [cx, cy] = c.disc?.paints ? c.disc.c : centre(c); await s.page.touchscreen.tap(cx, cy);
                const a = await until(s.page, (r) => r.posture !== "collapsed" && !r.m, 3000);
                const acts = await s.page.evaluate(() => window.__cfActs);
                const disc = c.disc?.label;
                const persL = new Set(c.pers.map((p) => p.label));
                const through = acts.filter((l) => l !== disc && !persL.has(l));
                done(engine, "c7·coarse-tap", { opens: a.ok, swallowed: through.length === 0 }, `tap at the collapsed dock's ${c.disc?.paints ? "disclosure" : "centre"} (coarse, 390 px): ${a.ok ? `expanded after ${a.ms} ms` : "did NOT expand"}; elements activated ${through.length ? through.join(", ") : "none"}${acts.length > through.length ? ` (not counted: ${acts.filter((l) => !through.includes(l)).join(", ")}, the disclosure's or a persistent element's own)` : ""}`);
            } finally { await s.close(); }
        });
    } finally {
        await browser.close();
    }
}
await target.close();
// the row roll-up
const byCell = new Map(rep.cells.map((c) => [c.cell.replace(/(\+shim|-unshimmed)$/, "") + "|" + c.engine, c]));
for (const engine of engines(args)) for (const [row, cells] of Object.entries(ROWS)) {
    const got = cells.map((c) => byCell.get(c + "|" + engine)).filter(Boolean);
    if (!got.length) continue;
    const st = got.some((c) => !c.pass && !c.unmeasured && !c.ownerBlocked && !c.record) ? "FAIL" : got.some((c) => c.unmeasured) ? "UNMEASURED" : "PASS";
    console.log(`ROW  CF  ${engine}  ${row}  ${st}  (${got.map((c) => `${c.cell} ${c.pass ? "pass" : c.unmeasured ? "unmeasured" : "FAIL"}`).join(", ")})`);
}
rep.finish(out);
