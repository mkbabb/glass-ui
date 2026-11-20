// Lane L6 witness probe: the dock follow-through.
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> [items]
//
//   O-194  the persistent seat(s) are the whole collapsed face; a press on one never
//          expands the dock (fine and coarse pointers, leading, trailing and both)
//   O-197  the trailing persistent region keeps the region gap (both orientations)
//   O-198  under reduced motion only opacity animates on the dock, at 144 ms or less
//   O-199  the dock rests as a capsule in every posture and morph frame; a host's
//          `--radius-dock: 1rem` restores the bar
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Chromium is Playwright's headless shell; WebKit is build 2287 (the build the
// dock renders in, as lanes L1 to L5 pin it). Readings go to <out-dir>/<label>-<engine>.json,
// cropped paint to <out-dir>/png/.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label, itemArg] = process.argv.slice(2);
const ITEMS = new Set((itemArg ?? "O-194,O-197,O-198,O-199").split(","));
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });

const PATH = "/docs/release-11.1.0/lane-L6/harness/index.html";
const results = { engine: engineName, label, base, cells: [] };
const verdicts = [];
const verdict = (item, cell, pass, detail) => verdicts.push({ item, cell, pass, detail });

async function open(browser, { width, theme = "light", scene, query = "", reduce = false, touch = false }) {
    const context = await browser.newContext({
        viewport: { width, height: 800 },
        reducedMotion: reduce ? "reduce" : "no-preference",
        colorScheme: theme,
        hasTouch: touch,
        isMobile: touch,
    });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    return { context, page };
}

async function crop(page, selector, name, pad = 6) {
    const box = await page.locator(selector).first().boundingBox();
    if (!box) return;
    await page.screenshot({
        path: join(pngDir, `${label}-${engineName}-${name}.png`),
        clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + 2 * pad, height: box.height + 2 * pad },
    });
}

// ── O-194 ────────────────────────────────────────────────────────────────────────
const SEATS = { lead: ["theme"], trail: ["theme"], both: ["theme", "pin"] };

async function faceRead(page) {
    return page.evaluate(() => {
        const dock = document.querySelector('[data-probe="face"] .glass-dock');
        const d = dock.getBoundingClientRect();
        const cs = getComputedStyle(dock);
        const seats = [...dock.querySelectorAll("[data-seat]")]
            .filter((el) => !el.closest("[inert]"))
            .map((el) => {
                const r = el.getBoundingClientRect();
                return { seat: el.dataset.seat, left: r.left, right: r.right, top: r.top, bottom: r.bottom, pressed: el.getAttribute("aria-pressed") };
            });
        const summary = dock.querySelector(".dock-layer--summary");
        return {
            expanded: dock.classList.contains("expanded"),
            dark: document.documentElement.classList.contains("dark"),
            presses: window.__presses(),
            dock: { left: d.left, right: d.right, top: d.top, bottom: d.bottom, w: d.width, h: d.height },
            pad: { l: parseFloat(cs.paddingLeft), r: parseFloat(cs.paddingRight), t: parseFloat(cs.paddingTop), b: parseFloat(cs.paddingBottom) },
            seats,
            summaryRole: summary?.getAttribute("role") ?? null,
            summaryTabindex: summary?.getAttribute("tabindex") ?? null,
        };
    });
}

/** Watch `.expanded` on the dock from now: did it ever expand, and when did it last leave. */
async function watchExpanded(page) {
    await page.evaluate(() => {
        const dock = document.querySelector('[data-probe="face"] .glass-dock');
        window.__ever = dock.classList.contains("expanded");
        new MutationObserver(() => {
            if (dock.classList.contains("expanded")) window.__ever = true;
        }).observe(dock, { attributes: true, attributeFilter: ["class"] });
    });
}

async function face(browser, width, kase, pointer) {
    const touch = pointer === "coarse";
    const cell = `${kase} ${width} ${pointer}`;
    // (1) the collapsed accessibility tree, and the paint fitting the seat(s)
    {
        const { context, page } = await open(browser, { width, scene: "face", query: `&case=${kase}`, touch });
        try {
            const tree = await page.locator('[data-probe="face"] .glass-dock').ariaSnapshot();
            const read = await faceRead(page);
            await crop(page, '[data-probe="face"] .glass-dock', `o194-${kase}-${width}-${pointer}-rest`);
            const controls = tree.split("\n").filter((l) => /^\s*- (button|link|switch|checkbox|tab)\b/.test(l));
            const want = SEATS[kase].length;
            const toggleLine = controls.find((l) => l.includes('"Dark theme"'));
            const toggle = read.seats.find((s) => s.seat === "theme");
            const treeOk =
                !read.expanded && controls.length === want && !!toggleLine && toggle?.pressed === "false" && !tree.includes("Expand dock");
            // The plate fits the seat(s): the dock's content box is the seats' union.
            const minL = Math.min(...read.seats.map((s) => s.left));
            const maxR = Math.max(...read.seats.map((s) => s.right));
            const inner = { left: read.dock.left + read.pad.l, right: read.dock.right - read.pad.r };
            const fits = Math.abs(inner.left - minL) <= 1 && Math.abs(inner.right - maxR) <= 1;
            verdict("O-194", `${cell} tree`, treeOk, { controls, summaryRole: read.summaryRole });
            verdict("O-194", `${cell} fit`, fits, { inner, seats: read.seats, dock: read.dock });
            results.cells.push({ item: "O-194", cell: `${cell} rest`, tree, read });
        } finally {
            await context.close();
        }
    }
    // (2) a press on the persistent seat toggles and never expands the dock
    const presses = touch ? ["tap"] : ["click", "dwell"];
    for (const how of presses) {
        const { context, page } = await open(browser, { width, scene: "face", query: `&case=${kase}`, touch });
        try {
            await watchExpanded(page);
            const seat = page.locator('[data-probe="face"] [data-seat="theme"]');
            if (how === "tap") await seat.tap();
            else if (how === "click") await seat.click();
            else {
                // Dwell on the seat until the hover has had its say, then press it.
                const b = await seat.boundingBox();
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
                await page.waitForTimeout(700);
                await seat.click();
            }
            if (!touch) await page.mouse.move(4, 796, { steps: 4 });
            await page.waitForTimeout(1500);
            const read = await faceRead(page);
            const ever = await page.evaluate(() => window.__ever);
            const pass = !read.expanded && read.dark === true && read.presses === 1;
            verdict("O-194", `${cell} press:${how}`, pass, { expandedAt1500: read.expanded, everExpanded: ever, dark: read.dark, presses: read.presses });
        } finally {
            await context.close();
        }
    }
    // (3) the expand path: fine = hover; coarse = a long press on the seat (held 700 ms,
    //     then released, a click following the release as an engine may send one);
    //     keyboard = Tab onto the seat, then into the full face and on out of the dock.
    const paths = touch ? (engineName === "chromium" ? ["long-press", "long-press-cdp"] : ["long-press"]) : ["hover"];
    for (const path of paths) {
        const { context, page } = await open(browser, { width, scene: "face", query: `&case=${kase}`, touch });
        try {
            const read = await faceRead(page);
            const s = read.seats[0];
            const x = (s.left + s.right) / 2;
            const y = (s.top + s.bottom) / 2;
            if (path === "hover") {
                await page.mouse.move(x, y, { steps: 4 });
            } else if (path === "long-press-cdp") {
                // Chromium's own touch pipeline: a held touch, recognised by its gesture
                // detector, released without moving.
                const cdp = await context.newCDPSession(page);
                await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
                await page.waitForTimeout(700);
                await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            } else {
                // The press sequence a touch engine dispatches, worst case: the release
                // still sends a click to the seat.
                await page.evaluate(async ({ x, y }) => {
                    const seat = document.elementFromPoint(x, y);
                    const init = { bubbles: true, cancelable: true, composed: true, pointerId: 7, pointerType: "touch", isPrimary: true, clientX: x, clientY: y };
                    seat.dispatchEvent(new PointerEvent("pointerdown", init));
                    await new Promise((r) => setTimeout(r, 700));
                    seat.dispatchEvent(new PointerEvent("pointerup", init));
                    seat.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y }));
                }, { x, y });
            }
            await page.waitForTimeout(900);
            const opened = await faceRead(page);
            await crop(page, '[data-probe="face"] .glass-dock', `o194-${kase}-${width}-${pointer}-${path}-open`);
            verdict("O-194", `${cell} expand:${path}`, opened.expanded === true && opened.presses === 0 && opened.dark === false, {
                expanded: opened.expanded,
                presses: opened.presses,
                dark: opened.dark,
            });
        } finally {
            await context.close();
        }
    }
    if (!touch) {
        const { context, page } = await open(browser, { width, scene: "face", query: `&case=${kase}` });
        try {
            const trail = [];
            let back = false;
            for (let i = 0; i < 12; i++) {
                // A trailing seat sits after the run in focus order: from it, Shift+Tab
                // enters the full face, then Tab walks on out of the dock.
                const prev = trail.at(-1);
                const shift = kase === "trail" && prev?.where === "theme" && !back;
                if (shift) back = true;
                // WebKit on macOS tabs to buttons only with Option held (Safari's
                // "Press Tab to highlight each item" default), so its walk holds Alt.
                const tab = engineName === "webkit" ? "Alt+Tab" : "Tab";
                await page.keyboard.press(shift ? `Shift+${tab}` : tab);
                await page.waitForTimeout(450);
                trail.push(
                    await page.evaluate(() => {
                        const a = document.activeElement;
                        const dock = document.querySelector('[data-probe="face"] .glass-dock');
                        return {
                            where: a?.dataset?.seat ?? a?.dataset?.probe ?? a?.tagName,
                            inFull: !!a?.closest(".dock-layer--full"),
                            inDock: dock.contains(a),
                            expanded: dock.classList.contains("expanded"),
                        };
                    }),
                );
                if (trail.at(-1).where === "after") break;
            }
            const onSeat = trail.find((t) => t.where === "theme");
            const reachedFull = trail.some((t) => t.inFull && t.expanded);
            const left = trail.at(-1).where === "after";
            verdict("O-194", `${cell} keyboard`, !!onSeat?.expanded && reachedFull && left, { trail });
        } finally {
            await context.close();
        }
    }
}

// ── O-197 ────────────────────────────────────────────────────────────────────────
async function gap(browser, width, orient) {
    const { context, page } = await open(browser, { width, scene: "gap", query: `&orient=${orient}` });
    try {
        const read = await page.evaluate((orient) => {
            const out = {};
            const v = orient === "v";
            const s = (r) => (v ? r.top : r.left);
            const e = (r) => (v ? r.bottom : r.right);
            for (const key of ["lead", "trail", "both"]) {
                const dock = document.querySelector(`[data-probe="${key}"] .glass-dock`);
                const layers = dock.querySelector(".dock-layers").getBoundingClientRect();
                const regions = [...dock.querySelectorAll(".dock-persistent")];
                const leadEl = regions.find((r) => !r.classList.contains("dock-persistent-end"));
                const trailEl = dock.querySelector(".dock-persistent-end");
                const rects = [...dock.querySelectorAll("button")]
                    .filter((b) => !b.closest("[inert]"))
                    .map((b) => {
                        const r = b.getBoundingClientRect();
                        return { name: b.getAttribute("aria-label"), left: r.left, right: r.right, top: r.top, bottom: r.bottom };
                    });
                const overlaps = [];
                for (let i = 0; i < rects.length; i++)
                    for (let j = i + 1; j < rects.length; j++) {
                        const a = rects[i], b = rects[j];
                        const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                        const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                        if (w > 0.5 && h > 0.5) overlaps.push([a.name, b.name, +w.toFixed(2), +h.toFixed(2)]);
                    }
                out[key] = {
                    leadGap: leadEl ? +(s(layers) - e(leadEl.getBoundingClientRect())).toFixed(2) : null,
                    trailGap: trailEl ? +(s(trailEl.getBoundingClientRect()) - e(layers)).toFixed(2) : null,
                    overlaps,
                };
            }
            return out;
        }, orient);
        await crop(page, '[data-probe="trail"] .glass-dock', `o197-trail-${orient}-${width}`, 8);
        const ref = read.lead.leadGap;
        const pass =
            ref > 0 &&
            Math.abs(read.trail.trailGap - ref) <= 0.5 &&
            Math.abs(read.both.leadGap - ref) <= 0.5 &&
            Math.abs(read.both.trailGap - ref) <= 0.5 &&
            read.lead.overlaps.length + read.trail.overlaps.length + read.both.overlaps.length === 0;
        verdict("O-197", `${orient} ${width}`, pass, read);
    } finally {
        await context.close();
    }
}

// ── O-198 ────────────────────────────────────────────────────────────────────────
const PLANT = `@layer components { .glass-dock.glass-dock.glass-dock { transition: border-radius 300ms linear !important; }
  .glass-dock.glass-dock.glass-dock.expanded { border-radius: 2px !important; } }`;

async function prm(browser, width, plant) {
    const { context, page } = await open(browser, { width, scene: "prm", reduce: true });
    try {
        if (plant) await page.addStyleTag({ content: PLANT });
        await page.evaluate(() => {
            const dock = document.querySelector('[data-probe="prm"] .glass-dock');
            const seen = new Map();
            const transitions = new Map();
            const keyframeProps = (a) => {
                const props = new Set();
                for (const k of a.effect?.getKeyframes?.() ?? [])
                    for (const p of Object.keys(k)) if (!["offset", "computedOffset", "easing", "composite"].includes(p)) props.add(p);
                if (a.transitionProperty) props.add(a.transitionProperty);
                return [...props];
            };
            const describe = (el) =>
                `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")}`;
            let phase = "rest";
            window.__phase = (p) => (phase = p);
            const sample = () => {
                for (const a of dock.getAnimations({ subtree: true })) {
                    const timing = a.effect?.getComputedTiming?.() ?? {};
                    const timeline = a.timeline?.constructor?.name ?? "none";
                    const entry = {
                        phase,
                        kind: a.constructor.name,
                        name: a.animationName ?? a.transitionProperty ?? a.id ?? "",
                        props: keyframeProps(a),
                        duration: typeof timing.duration === "number" ? timing.duration : String(timing.duration),
                        timeline,
                        playState: a.playState,
                        target: a.effect?.target ? describe(a.effect.target) + (a.effect.pseudoElement ?? "") : "",
                    };
                    const key = `${entry.phase}|${entry.kind}|${entry.name}|${entry.target}|${entry.props.join(",")}`;
                    if (!seen.has(key)) seen.set(key, entry);
                }
                for (const el of [dock, ...dock.querySelectorAll("*")])
                    for (const pseudo of [null, "::before", "::after"]) {
                        const cs = getComputedStyle(el, pseudo);
                        const props = cs.transitionProperty.split(",").map((s) => s.trim());
                        const durs = cs.transitionDuration.split(",").map((s) => parseFloat(s) * (s.trim().endsWith("ms") ? 1 : 1000));
                        props.forEach((p, i) => {
                            const d = durs[i % durs.length];
                            if (d > 0 && p !== "none") {
                                const key = `${phase}|${describe(el)}${pseudo ?? ""}|${p}`;
                                if (!transitions.has(key)) transitions.set(key, { phase, target: describe(el) + (pseudo ?? ""), prop: p, ms: d });
                            }
                        });
                    }
            };
            window.__sampled = () => ({ animations: [...seen.values()], transitions: [...transitions.values()] });
            const loop = () => {
                sample();
                window.__raf = requestAnimationFrame(loop);
            };
            loop();
        });
        const dock = page.locator('[data-probe="prm"] .glass-dock');
        const box = await dock.boundingBox();
        const states = [];
        const state = (phase) =>
            page.evaluate((phase) => {
                const d = document.querySelector('[data-probe="prm"] .glass-dock');
                const shown = (b) => {
                    for (let el = b; el && el !== d; el = el.parentElement) {
                        const cs = getComputedStyle(el);
                        if (cs.visibility === "hidden" || cs.opacity === "0" || el.inert) return false;
                    }
                    return true;
                };
                return {
                    phase,
                    expanded: d.classList.contains("expanded"),
                    face: [...d.querySelectorAll(".dock-layer--full [data-seat]")].filter(shown).length,
                };
            }, phase);
        await page.evaluate(() => window.__phase("hover-expand"));
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
        await page.waitForTimeout(900);
        states.push(await state("hover-expand"));
        await page.evaluate(() => window.__phase("face-swap"));
        await page.evaluate(() => window.__face("two"));
        await page.waitForTimeout(700);
        states.push(await state("face-swap"));
        await page.evaluate(() => window.__phase("press"));
        const ctl = page.locator('[data-probe="prm"] .dock-layer--full [data-seat="run-1"]').first();
        const cb = await ctl.boundingBox();
        if (cb) {
            await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(150);
            await page.mouse.up();
        }
        await page.waitForTimeout(500);
        await page.evaluate(() => window.__phase("collapse"));
        await page.mouse.move(4, 796, { steps: 3 });
        await page.evaluate(() => window.__docks.prm.collapse());
        await page.waitForTimeout(900);
        states.push(await state("collapse"));
        const sampled = await page.evaluate(() => {
            cancelAnimationFrame(window.__raf);
            return window.__sampled();
        });
        const expanded = await page.evaluate(() => document.querySelector('[data-probe="prm"] .glass-dock').className);
        // Every animation counts, scroll-driven ones too (the run's cut cap animates the
        // plate's radius as the run's overflow changes on an expand). The scroll-linked
        // ones are also listed apart for the record.
        const scrollLinked = sampled.animations.filter((a) => a.timeline === "ScrollTimeline" || a.timeline === "ViewTimeline");
        const badAnim = sampled.animations.filter(
            (a) => a.playState !== "idle" && !(a.props.length > 0 && a.props.every((p) => p === "opacity") && typeof a.duration === "number" && a.duration <= 144),
        );
        const badTrans = sampled.transitions.filter((t) => !(t.prop === "opacity" && t.ms <= 144));
        // The states really changed: open on hover, five seats after the swap, closed.
        const moved = states[0].expanded && states[1].face === 5 && !states[2].expanded;
        const clean = moved && badAnim.length === 0 && badTrans.length === 0;
        const cell = `${width}${plant ? " planted radius transition" : ""}`;
        // The planted cell passes when the gate catches the plant.
        verdict("O-198", cell, plant ? !clean && badAnim.some((a) => a.props.some((p) => /radius/i.test(p))) : clean, {
            badAnim,
            badTrans,
            scrollLinked,
            counts: { animations: sampled.animations.length, transitions: sampled.transitions.length },
            states,
            endClass: expanded,
        });
        results.cells.push({ item: "O-198", cell, sampled });
    } finally {
        await context.close();
    }
}

// ── O-199 ────────────────────────────────────────────────────────────────────────
const POSTURES = ["open-h", "open-h-persist", "col-square", "col-two", "col-wide", "col-persist", "col-persist-both", "morph", "open-v", "col-v", "col-v-persist"];

const readShape = (key) => {
    const host = document.querySelector(`[data-probe="${key}"]`);
    const dock = host.querySelector(".glass-dock");
    const plate = dock.querySelector(".dock-plate");
    const vertical = dock.classList.contains("vertical");
    const cross = vertical ? dock.offsetWidth : dock.offsetHeight;
    const corners = (el) => {
        const cs = getComputedStyle(el);
        return [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
    };
    // The used corner (CSS Backgrounds 3, "Overlapping Curves"): every radius scales by
    // f = min(side / sum of the two radii on it), when f < 1. That is what paints.
    const used = (el) => {
        const w = el.offsetWidth, h = el.offsetHeight;
        const rs = corners(el).map((v) => {
            const [a, b = a] = v.split(/\s+/);
            const px = (s, side) => (s.endsWith("%") ? (parseFloat(s) / 100) * side : parseFloat(s));
            return [px(a, w), px(b, h)];
        });
        const [tl, tr, br, bl] = rs;
        const f = Math.min(1, w / (tl[0] + tr[0]), w / (bl[0] + br[0]), h / (tl[1] + bl[1]), h / (tr[1] + br[1]));
        return rs.map(([x, y]) => [+(x * f).toFixed(2), +(y * f).toFixed(2)]);
    };
    return {
        key,
        vertical,
        collapsed: dock.classList.contains("collapsed"),
        morphing: dock.hasAttribute("data-morphing"),
        w: dock.offsetWidth,
        h: dock.offsetHeight,
        cross,
        dock: corners(dock),
        plate: corners(plate),
        usedDock: used(dock),
        usedPlate: used(plate),
        // The paint: the morph scales the box on its axis, so the visible corner is the
        // used corner times the scale on each axis.
        scale: (() => {
            const r = dock.getBoundingClientRect();
            return [+(r.width / dock.offsetWidth).toFixed(4), +(r.height / dock.offsetHeight).toFixed(4)];
        })(),
    };
};

/** The visible plate corners (px on screen) and the visible half cross extent. */
function visible(s) {
    const [sx, sy] = s.scale;
    const half = (s.vertical ? s.w * sx : s.h * sy) / 2;
    return { half: +half.toFixed(2), corners: s.usedPlate.map(([x, y]) => [+(x * sx).toFixed(2), +(y * sy).toFixed(2)]) };
}

function judgeShape(s, want) {
    // Computed corners are px (never `%`); every used corner, both axes, on the dock and
    // its plate, sits at the wanted radius.
    const noPct = [...s.dock, ...s.plate].every((v) => !v.includes("%"));
    const ok = [...s.usedDock, ...s.usedPlate].every(([x, y]) => Math.abs(x - want) <= 0.5 && Math.abs(y - want) <= 0.5);
    return noPct && ok;
}

async function capsule(browser, width, theme, hostBar) {
    const { context, page } = await open(browser, { width, theme, scene: "capsule", query: hostBar ? "&host=bar" : "" });
    try {
        await page.evaluate(`window.__readShape = ${readShape.toString()}`);
        const rest = await page.evaluate((keys) => keys.map((k) => window.__readShape(k)), POSTURES);
        for (const s of rest) {
            const want = hostBar ? Math.min(16, s.cross / 2) : s.cross / 2;
            verdict("O-199", `${hostBar ? "host-bar " : ""}${s.key} ${width} ${theme}`, judgeShape(s, want), s);
            if (!hostBar || s.key === "open-h") await crop(page, `[data-probe="${s.key}"] .glass-dock`, `o199-${hostBar ? "bar-" : ""}${s.key}-${width}-${theme}`, 6);
        }
        if (!hostBar) {
            // Five frames sampled through each morph, expand then collapse.
            for (const dir of ["expand", "collapse"]) {
                const frames = await page.evaluate(async (dir) => {
                    const dock = document.querySelector('[data-probe="morph"] .glass-dock');
                    const out = [];
                    window.__docks.morph[dir]();
                    const t0 = performance.now();
                    await new Promise((resolve) => {
                        const tick = () => {
                            if (dock.hasAttribute("data-morphing")) out.push(window.__readShape("morph"));
                            if (performance.now() - t0 > 1600) return resolve();
                            requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                    });
                    return out;
                }, dir);
                // Mid-morph the box is scaled on its axis, so a frame is judged by what it
                // paints: no `%` in the computed corners, and the visible corner (used
                // corner times the scale) at half the visible cross extent on both axes.
                const noPct = (s) => [...s.dock, ...s.plate].every((v) => !v.includes("%"));
                const round = (v) => v.corners.every(([x, y]) => Math.abs(x - v.half) <= 0.5 && Math.abs(y - v.half) <= 0.5);
                const picks = frames.length >= 5 ? [0, 1, 2, 3, 4].map((i) => frames[Math.round((i * (frames.length - 1)) / 4)]) : frames;
                const ok = picks.length === 5 && picks.every((s) => noPct(s) && round(visible(s)));
                verdict("O-199", `morph-${dir} ${width} ${theme}`, ok, {
                    sampled: frames.length,
                    picks: picks.map((s) => ({ scale: s.scale, cross: s.cross, dock: s.dock, visible: visible(s) })),
                });
                // Every frame, not only the five.
                const seen = frames.map(visible);
                verdict("O-199", `morph-${dir}-every-frame ${width} ${theme}`, frames.length >= 5 && seen.every(round), {
                    worst: seen.reduce((w, v) => {
                        const d = Math.max(...v.corners.flat().map((c) => Math.abs(c - v.half)));
                        return d > w.d ? { d: +d.toFixed(2), v } : w;
                    }, { d: 0, v: null }),
                });
                await page.waitForTimeout(600);
            }
        }
    } finally {
        await context.close();
    }
}

const WEBKIT_2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const browser = await engine.launch(
    engineName === "webkit" && existsSync(WEBKIT_2287) ? { headless: true, executablePath: WEBKIT_2287 } : { headless: true },
);
try {
    if (ITEMS.has("O-194"))
        for (const width of [390, 1440])
            for (const kase of ["lead", "trail", "both"])
                for (const pointer of ["fine", "coarse"]) await face(browser, width, kase, pointer);
    if (ITEMS.has("O-197"))
        for (const orient of ["h", "v"]) for (const width of [360, 390, 430, 820, 1440]) await gap(browser, width, orient);
    if (ITEMS.has("O-198")) {
        for (const width of [390, 1440]) await prm(browser, width, false);
        await prm(browser, 1440, true);
    }
    if (ITEMS.has("O-199"))
        for (const width of [390, 1440]) {
            for (const theme of ["light", "dark"]) await capsule(browser, width, theme, false);
            await capsule(browser, width, "light", true);
        }
} finally {
    await browser.close();
}
results.verdicts = verdicts;
const summary = {};
for (const v of verdicts) {
    summary[v.item] ??= { pass: 0, fail: 0 };
    summary[v.item][v.pass ? "pass" : "fail"]++;
}
results.summary = summary;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 1));
console.log(JSON.stringify(summary));
for (const v of verdicts.filter((v) => !v.pass)) console.log("FAIL", v.item, v.cell, JSON.stringify(v.detail).slice(0, 600));
process.exit(verdicts.every((v) => v.pass) ? 0 : 1);
