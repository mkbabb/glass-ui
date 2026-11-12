// L2-dock falsifier probe. One Chromium per run, a context per cell, all closed in finally.
// usage: node probe.mjs <baseURL> <tag> [legs=icons,collapsed,ellipse,overlap,axe,prm]
import { chromium } from "/Users/mkbabb/.dev-logs/owner-1109/L2-dock/wt/node_modules/playwright/index.mjs";
import AxeBuilder from "/Users/mkbabb/.dev-logs/owner-1109/L2-dock/wt/node_modules/@axe-core/playwright/dist/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";

const base = process.argv[2] ?? "https://daraksha.babb.dev";
const tag = process.argv[3] ?? "run";
const legs = new Set((process.argv[4] ?? "one,icons,collapsed,rounded,layers,animated,side,ellipse,overlap,axe,prm").split(","));
const out = `/Users/mkbabb/.dev-logs/owner-1109/L2-dock/runs/${tag}`;
mkdirSync(out, { recursive: true });
const WIDTHS = [360, 390, 430, 820, 1440];
const SCHEMES = ["light", "dark"];
const res = { base, tag, legs: {} };
const put = (leg, key, v) => ((res.legs[leg] ??= {})[key] = v);

const browser = await chromium.launch();
async function cell(w, scheme, fn, extra = {}) {
    const touch = w < 800;
    const ctx = await browser.newContext({
        viewport: { width: w, height: w > 800 ? 900 : 844 },
        colorScheme: scheme,
        hasTouch: touch,
        isMobile: touch,
        deviceScaleFactor: 1,
        ...extra,
    });
    try {
        const page = await ctx.newPage();
        return await fn(page, touch);
    } catch (e) {
        return { error: String(e).slice(0, 300), pass: false };
    } finally {
        await ctx.close();
    }
}
const D = ".site-dock .glass-dock";
const go = async (page, path = "/") => {
    await page.goto(base + path, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1200);
};
/** Open a plate as a hand does: hover its leading padding (fine pointer) or tap its collapsed face (touch). */
const expandDock = async (page, sel, touch = false) => {
    const d = page.locator(sel).first();
    if (await d.evaluate((e) => !e.classList.contains("collapsed"))) {
        if (!touch) { const b = await d.boundingBox(); await page.mouse.move(b.x + 3, b.y + b.height / 2); }
        await page.waitForTimeout(300);
        return;
    }
    if (touch) await d.locator(".dock-layer--summary").tap();
    else { const b = await d.boundingBox(); await page.mouse.move(b.x + 3, b.y + b.height / 2, { steps: 4 }); }
    await page.waitForTimeout(900);
};

try {
    // ---- icons: each page seat is an icon with a name; only the active one shows a word.
    if (legs.has("icons")) {
        for (const w of [390, 1440]) {
            const r = await cell(w, "light", async (page) => {
                await go(page, "/colour");
                await expandDock(page, D, w < 800);
                const seats = await page.evaluate(() =>
                    [...document.querySelectorAll(".site-dock .pages button")].map((b) => ({
                        name: b.getAttribute("aria-label") ?? b.textContent.trim(),
                        svg: !!b.querySelector("svg"),
                        text: [...b.childNodes].map((n) => (n.nodeType === 3 ? n.textContent : n.matches?.(".sr-only") ? "" : n.textContent)).join("").trim(),
                        pressed: b.getAttribute("aria-pressed"),
                        w: Math.round(b.getBoundingClientRect().width),
                    })),
                );
                let tip = null;
                if (w >= 820) {
                    await page.locator(".site-dock .pages button").nth(2).hover();
                    await page.waitForTimeout(1200);
                    tip = await page.evaluate(() => document.querySelector("[role=tooltip]")?.textContent?.trim() ?? null);
                }
                await page.screenshot({ path: `${out}/icons-${w}.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                const named = seats.length === 4 && seats.every((s) => s.name);
                const iconed = seats.every((s) => s.svg);
                const inactiveWordless = seats.filter((s) => s.pressed !== "true").every((s) => s.text === "");
                const activeWord = seats.find((s) => s.pressed === "true")?.text === "Colour";
                const tipOk = w < 820 || tip === "Motion";
                return { seats, tip, pass: named && iconed && inactiveWordless && activeWord && tipOk };
            });
            put("icons", w, r);
        }
        res.legs.icons.pass = Object.values(res.legs.icons).every((r) => r.pass);
    }

    // ---- collapsed: at rest the dock is collapsed and its face is the pressable khatam in the scheme's pose.
    if (legs.has("collapsed")) {
        for (const w of WIDTHS)
            for (const scheme of SCHEMES) {
                const r = await cell(w, scheme, async (page, touch) => {
                    await go(page, "/");
                    if (!touch) await page.mouse.move(2, 2);
                    await page.waitForTimeout(4000);
                    const s = await page.evaluate(() => {
                        const dark = document.documentElement.classList.contains("dark");
                        const btn = [...document.querySelectorAll(".site-dock button[aria-label='Dark mode']")].find((b) => b.getClientRects().length && !b.closest("[inert]"));
                        const dock = btn?.closest(".glass-dock");
                        const night = btn?.querySelector(".night");
                        const m = night ? getComputedStyle(night).transform : null;
                        const docks = [...document.querySelectorAll(".site-dock .glass-dock")].map((d) => ({
                            cls: d.className,
                            collapsed: d.classList.contains("collapsed"),
                            w: Math.round(d.getBoundingClientRect().width),
                        }));
                        return {
                            dark,
                            docks,
                            visible: !!btn,
                            inCollapsed: !!dock?.classList.contains("collapsed"),
                            pressed: btn?.getAttribute("aria-pressed"),
                            nightTransform: m,
                            seat: btn ? Math.round(btn.getBoundingClientRect().width) : 0,
                            dockW: dock ? Math.round(dock.getBoundingClientRect().width) : 0,
                        };
                    });
                    await page.screenshot({ path: `${out}/collapsed-${w}-${scheme}.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                    // Pose: light = night off the frame (translate 9,-9); dark = none.
                    const poseOk = s.nightTransform != null && (s.dark ? s.nightTransform === "none" || /matrix\(1, 0, 0, 1, 0, 0\)/.test(s.nightTransform) : /9, -9\)$/.test(s.nightTransform));
                    let toggled = null;
                    if (s.visible && s.inCollapsed) {
                        const loc = page.locator(".site-dock button[aria-label='Dark mode']").first();
                        touch ? await loc.tap() : await loc.click();
                        await page.waitForTimeout(900);
                        if (!touch) await page.mouse.move(2, 2);
                        await page.waitForTimeout(1500);
                        toggled = await page.evaluate(() => {
                            const b = [...document.querySelectorAll(".site-dock button[aria-label='Dark mode']")].find((b) => b.getClientRects().length && !b.closest("[inert]"));
                            return { dark: document.documentElement.classList.contains("dark"), pressed: b?.getAttribute("aria-pressed"), stillCollapsed: !!b?.closest(".glass-dock")?.classList.contains("collapsed") };
                        });
                    }
                    const allCollapsed = s.docks.length > 0 && s.docks.every((d) => d.collapsed);
                    const narrow = s.docks.every((d) => d.w <= 2 * s.seat + 24);
                    const pass =
                        s.visible && s.inCollapsed && allCollapsed && narrow && s.pressed === String(s.dark) && poseOk &&
                        !!toggled && toggled.dark !== s.dark && toggled.pressed === String(toggled.dark);
                    // G2 (glass 11.1.0): the press toggles WITHOUT opening the plate.
                    const g2 = !!toggled?.stillCollapsed;
                    return { ...s, poseOk, allCollapsed, narrow, toggled, g2, pass };
                });
                put("collapsed", `${w}-${scheme}`, r);
            }
        res.legs.collapsed.pass = Object.values(res.legs.collapsed).every((r) => r.pass);
        res.legs["collapsed-g2"] = { pass: Object.entries(res.legs.collapsed).filter(([k]) => k !== "pass").every(([, r]) => r.g2) };
    }

    // ---- one: every page carries exactly ONE glass dock (pages and page controls are its layers).
    if (legs.has("one")) {
        for (const w of [360, 1440])
            for (const path of ["/", "/colour", "/motion", "/scripture/93"]) {
                const r = await cell(w, "light", async (page) => {
                    await go(page, path);
                    const n = await page.evaluate(() => document.querySelectorAll(".site-dock .glass-dock, main .glass-dock").length);
                    return { n, pass: n === 1 };
                });
                put("one", `${w}${path}`, r);
            }
        res.legs.one.pass = Object.values(res.legs.one).every((r) => r.pass);
    }

    // ---- rounded: the dock's corner is a stadium (radius >= half its height - 1), collapsed and open.
    if (legs.has("rounded")) {
        for (const w of WIDTHS)
            for (const scheme of SCHEMES) {
                const r = await cell(w, scheme, async (page, touch) => {
                    await go(page, "/scripture/93");
                    if (!touch) await page.mouse.move(2, 2);
                    await page.waitForTimeout(2500);
                    const m = () => page.evaluate(() => [...document.querySelectorAll(".site-dock .glass-dock")].map((d) => {
                        const cs = getComputedStyle(d); const h = d.getBoundingClientRect().height;
                        const rad = Math.min(parseFloat(cs.borderTopLeftRadius), h / 2);
                        // The painted surface is the plate: its four corners, which glass's cut cap may drop.
                        const pl = getComputedStyle(d.querySelector(".dock-plate"));
                        const corners = [pl.borderTopLeftRadius, pl.borderTopRightRadius, pl.borderBottomRightRadius, pl.borderBottomLeftRadius].map((v) => Math.min(parseFloat(v), h / 2));
                        const run = d.querySelector(".dock-run");
                        return { h: Math.round(h), r: Math.round(rad), ok: rad >= h / 2 - 1, plate: corners.map(Math.round), plateOk: corners.every((c) => c >= h / 2 - 1), collapsed: d.classList.contains("collapsed"), runOverflow: run ? run.scrollWidth - run.clientWidth : null };
                    }));
                    const rest = await m();
                    await expandDock(page, D, touch);
                    const open = await m();
                    if (w === 390 || w === 1440) await page.screenshot({ path: `${out}/rounded-${w}-${scheme}.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                    return { rest, open, pass: [...rest, ...open].length > 0 && [...rest, ...open].every((x) => x.ok), plateRest: rest.every((x) => x.plateOk) };
                });
                put("rounded", `${w}-${scheme}`, r);
            }
        res.legs.rounded.pass = Object.values(res.legs.rounded).every((r) => r.pass);
        // The collapsed plate a stadium on all four corners (glass's cut cap must not fire on a collapsed run).
        res.legs["plate-rest"] = { pass: Object.entries(res.legs.rounded).filter(([k]) => k !== "pass").every(([, r]) => r.plateRest) };
    }

    // ---- layers: the reader opens on its controls; a switcher names Pages and the controls; Pages shows the 4 icons; Colour has no switcher.
    if (legs.has("layers")) {
        for (const w of [390, 1440]) {
            const r = await cell(w, "dark", async (page, touch) => {
                await go(page, "/scripture/93");
                await expandDock(page, D, touch);
                const read = () => page.evaluate(() => {
                    const act = document.querySelector(".site-dock .dock-face.is-active");
                    return {
                        back: !!act?.querySelector("button[aria-label=Pages]"),
                        surah: !!act?.querySelector("[data-testid=surah-button]"),
                        pages: act ? act.querySelectorAll(".pages button").length : 0,
                    };
                });
                const reader = await read();
                await page.screenshot({ path: `${out}/layers-${w}-reader.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                await page.locator(".site-dock .dock-face.is-active button[aria-label=Pages]").click();
                await page.waitForTimeout(800);
                const pagesL = await read();
                await page.screenshot({ path: `${out}/layers-${w}-pages.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                await page.locator(".site-dock .pages button[aria-label=Colour]").click();
                await page.waitForTimeout(1200);
                const colour = await read();
                // ...and the open page's seat turns it back to its controls.
                await page.goto(base + "/scripture/93", { waitUntil: "networkidle" }); await page.waitForTimeout(1200);
                await expandDock(page, D, touch);
                await page.locator(".site-dock .dock-face.is-active button[aria-label=Pages]").click();
                await page.waitForTimeout(800);
                await page.locator(".site-dock .dock-face.is-active .pages button[aria-pressed=true]").click();
                await page.waitForTimeout(800);
                const again = await read();
                const pass = reader.back && reader.surah && pagesL.pages === 4 && !pagesL.surah && colour.pages === 4 && !colour.back && again.surah;
                return { reader, pagesL, colour, again, pass };
            });
            put("layers", w, r);
        }
        res.legs.layers.pass = Object.values(res.legs.layers).every((r) => r.pass);
    }

    // ---- animated: opening morphs (data-morphing seen, width passes through intermediates) and a layer turn crossfades (data-crossfading seen, intermediate opacity).
    if (legs.has("animated")) {
        const r = await cell(1440, "light", async (page) => {
            await go(page, "/scripture/93");
            await page.mouse.move(2, 2);
            await page.waitForTimeout(2500);
            await page.evaluate(() => {
                const d = document.querySelector(".site-dock .glass-dock");
                window.__a = { morph: 0, cross: 0, widths: new Set(), ops: new Set() };
                const tick = () => {
                    if (d.hasAttribute("data-morphing")) window.__a.morph++;
                    window.__a.widths.add(Math.round(d.getBoundingClientRect().width));
                    const cf = d.querySelector(".dock-crossfade");
                    if (cf?.hasAttribute("data-crossfading")) {
                        window.__a.cross++;
                        for (const f of cf.querySelectorAll(".dock-face")) window.__a.ops.add(+getComputedStyle(f).opacity.slice(0, 4));
                    }
                    if (!window.__stop) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            await expandDock(page, D);
            await page.locator(".site-dock .dock-face.is-active button[aria-label=Pages]").click();
            await page.waitForTimeout(900);
            const a = await page.evaluate(() => { window.__stop = 1; return { morph: window.__a.morph, cross: window.__a.cross, widths: window.__a.widths.size, mids: [...window.__a.ops].filter((o) => o > 0.05 && o < 0.95).length }; });
            return { ...a, pass: a.morph > 3 && a.widths > 4 && a.cross > 3 && a.mids > 2 };
        });
        put("animated", "1440", r);
        res.legs.animated.pass = r.pass;
    }

    // ---- side: the khatam sits at the dock's trailing side, outside the layer faces, open and collapsed.
    if (legs.has("side")) {
        for (const w of [360, 1440])
            for (const path of ["/", "/scripture/93"]) {
                const r = await cell(w, "light", async (page, touch) => {
                    await go(page, path);
                    if (!touch) await page.mouse.move(2, 2);
                    await page.waitForTimeout(2500);
                    const m = () => page.evaluate(() => {
                        const d = document.querySelector(".site-dock .glass-dock");
                        const k = d?.querySelector("button[aria-label='Dark mode']");
                        if (!k) return null;
                        const dr = d.getBoundingClientRect(), kr = k.getBoundingClientRect();
                        const others = [...d.querySelectorAll("button, [role=button]")].filter((b) => b !== k && !b.closest("[inert]") && b.getClientRects().length && b.getBoundingClientRect().width > 0);
                        const maxRight = Math.max(...others.map((b) => b.getBoundingClientRect().right), -1);
                        return { inFace: !!k.closest(".dock-face, .dock-layers"), side: kr.right <= Math.min(...others.map((b) => b.getBoundingClientRect().left), 1e9) + 1, gapStart: Math.round(kr.left - dr.left) };
                    });
                    const rest = await m();
                    await expandDock(page, D, touch);
                    const open = await m();
                    const ok = (x) => x && !x.inFace && x.side && x.gapStart < 24;
                    return { rest, open, pass: ok(rest) && ok(open) };
                });
                put("side", `${w}${path}`, r);
            }
        res.legs.side.pass = Object.values(res.legs.side).every((r) => r.pass);
    }

    // ---- ellipse: hover seat 2; the widest thing whose paint changed must be no wider than that seat (+2px).
    if (legs.has("ellipse")) {
        for (const w of [820, 1440])
            for (const scheme of SCHEMES) {
                const r = await cell(w, scheme, async (page) => {
                    await go(page, "/colour");
                    await page.mouse.move(2, 2);
                    await expandDock(page, D);
                    const snap = () =>
                        page.evaluate(() => {
                            const P = ["background-color", "background-image", "box-shadow", "opacity", "transform", "border-color", "scale"];
                            const out = {};
                            const els = [...document.querySelectorAll(".site-dock .glass-dock, .site-dock .glass-dock *")];
                            els.forEach((e, i) => {
                                for (const pseudo of [null, "::before", "::after"]) {
                                    const cs = getComputedStyle(e, pseudo);
                                    if (pseudo && (cs.content === "none" || cs.content === "normal")) continue;
                                    const r = e.getBoundingClientRect();
                                    // Untransformed widths: a seat's own press/hover scale is not a wider paint.
                                    let wpx = e.offsetWidth ?? r.width;
                                    const seatEl = e.closest("button");
                                    const seatW = seatEl ? seatEl.offsetWidth : null;
                                    if (pseudo) {
                                        const cw = parseFloat(cs.width);
                                        if (Number.isFinite(cw)) wpx = cw;
                                    }
                                    out[`${i}${pseudo ?? ""}`] = { v: P.map((p) => cs.getPropertyValue(p)).join("|"), w: wpx, vis: cs.visibility !== "hidden" && cs.display !== "none" && r.width > 0, d: `${e.tagName.toLowerCase()}.${[...e.classList].join(".")}${pseudo ?? ""}`, seatW };
                                }
                            });
                            return out;
                        });
                    const a = await snap();
                    const seatLoc = page.locator(".site-dock .pages button").nth(2);
                    const seatBox = await seatLoc.boundingBox();
                    await seatLoc.hover();
                    await page.waitForTimeout(700);
                    const b = await snap();
                    await page.screenshot({ path: `${out}/ellipse-${w}-${scheme}.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                    const changed = Object.keys(b)
                        .filter((k) => b[k].vis && (!a[k] || a[k].v !== b[k].v))
                        .map((k) => ({ d: b[k].d, w: Math.round(b[k].w), own: b[k].seatW }))
                        .sort((x, y) => y.w - x.w);
                    const seat = Math.round(seatBox.width);
                    // A paint inside a seat may be as wide as that seat; a paint outside every seat no wider than the hovered one.
                    const over = changed.filter((c) => c.w > (c.own ?? seat) + 2);
                    const widest = changed.filter((c) => c.own == null)[0]?.w ?? 0;
                    return { seat, widest, ratio: +(widest / seat).toFixed(2), over: over.slice(0, 4), top: changed.slice(0, 4), pass: over.length === 0 };
                });
                put("ellipse", `${w}-${scheme}`, r);
            }
        res.legs.ellipse.pass = Object.values(res.legs.ellipse).every((r) => r.pass);
    }

    // ---- overlap + no url() filters, collapsed and expanded, every width x scheme.
    if (legs.has("overlap")) {
        for (const w of WIDTHS)
            for (const scheme of SCHEMES) {
                const r = await cell(w, scheme, async (page, touch) => {
                    await go(page, "/scripture/93");
                    if (!touch) await page.mouse.move(2, 2);
                    const measure = () =>
                        page.evaluate(() => {
                            const bs = [...document.querySelectorAll(".site-dock button")].filter((b) => !b.closest("[inert]") && b.getClientRects().length && getComputedStyle(b).visibility !== "hidden");
                            const rs = bs.map((b) => b.getBoundingClientRect());
                            const hits = [];
                            for (let i = 0; i < rs.length; i++)
                                for (let j = i + 1; j < rs.length; j++) {
                                    const x = Math.min(rs[i].right, rs[j].right) - Math.max(rs[i].left, rs[j].left);
                                    const y = Math.min(rs[i].bottom, rs[j].bottom) - Math.max(rs[i].top, rs[j].top);
                                    if (x > 1 && y > 1) hits.push([bs[i].getAttribute("aria-label") ?? bs[i].textContent.trim(), bs[j].getAttribute("aria-label") ?? bs[j].textContent.trim()]);
                                }
                            const urlFilters = [...document.querySelectorAll(".site-dock, .site-dock *")].filter((e) => /url\(/.test(getComputedStyle(e).filter)).length;
                            const plates = [...document.querySelectorAll(".site-dock .glass-dock")].map((d) => getComputedStyle(d).backdropFilter || getComputedStyle(d).webkitBackdropFilter);
                            const offscreen = [...document.querySelectorAll(".site-dock .glass-dock")].some((d) => { const r = d.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth; });
                            return { n: bs.length, hits, urlFilters, plates, offscreen };
                        });
                    await page.waitForTimeout(2500);
                    const rest = await measure();
                    // Open both plates in turn and measure each open (a hand opens one at a time).
                    await expandDock(page, D, touch);
                    const openC = await measure();
                    await page.locator(".site-dock .dock-face.is-active button[aria-label=Pages]").click();
                    await page.waitForTimeout(700);
                    const openP = await measure();
                    const open = { hits: [...openP.hits, ...openC.hits], urlFilters: openP.urlFilters + openC.urlFilters, offscreen: openP.offscreen || openC.offscreen, n: [openP.n, openC.n] };
                    await page.screenshot({ path: `${out}/overlap-${w}-${scheme}.png`, clip: await page.locator(".site-dock").first().boundingBox() });
                    const ok = (m) => m.hits.length === 0 && m.urlFilters === 0 && !m.offscreen;
                    return { rest, open, pass: ok(rest) && ok(open) };
                });
                put("overlap", `${w}-${scheme}`, r);
            }
        res.legs.overlap.pass = Object.values(res.legs.overlap).every((r) => r.pass);
    }

    // ---- axe on the dock, rest and expanded, both schemes.
    if (legs.has("axe")) {
        for (const scheme of SCHEMES)
            for (const w of [390, 1440]) {
                const r = await cell(w, scheme, async (page) => {
                    await go(page, "/");
                    const rest = await new AxeBuilder({ page }).include(".site-dock").analyze();
                    await expandDock(page, D, w < 800);
                    const open = await new AxeBuilder({ page }).include(".site-dock").analyze();
                    const v = [...rest.violations, ...open.violations].map((x) => `${x.id}:${x.nodes.length}`);
                    return { violations: v, pass: v.length === 0 };
                });
                put("axe", `${w}-${scheme}`, r);
            }
        res.legs.axe.pass = Object.values(res.legs.axe).every((r) => r.pass);
    }

    // ---- reduced motion: the dock's animations while expanding are opacity-only and <= 144 ms.
    if (legs.has("prm")) {
        const r = await cell(1440, "light", async (page) => {
            await go(page, "/");
            await page.mouse.move(2, 2);
            await page.waitForTimeout(1500);
            await page.evaluate(() => {
                window.__anims = [];
                const seen = new Set();
                const tick = () => {
                    for (const a of document.getAnimations()) {
                        const t = a.effect?.target;
                        if (!t?.closest?.(".site-dock") || seen.has(a)) continue;
                        seen.add(a);
                        const kf = a.effect.getKeyframes?.() ?? [];
                        const props = a.transitionProperty ? [a.transitionProperty] : [...new Set(kf.flatMap((k) => Object.keys(k).filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p))))];
                        window.__anims.push({ props, dur: Number(a.effect.getComputedTiming().duration) });
                    }
                    if (window.__anims.length < 400) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            await page.locator(".site-dock .glass-dock").first().hover();
            await page.waitForTimeout(1200);
            const anims = await page.evaluate(() => window.__anims);
            const bad = anims.filter((a) => a.dur > 144 || a.props.some((p) => p !== "opacity"));
            return { n: anims.length, bad: bad.slice(0, 8), pass: bad.length === 0 };
        }, { reducedMotion: "reduce" });
        put("prm", "1440", r);
        res.legs.prm.pass = r.pass;
    }
} finally {
    await browser.close();
}
writeFileSync(`${out}/result.json`, JSON.stringify(res, null, 1));
const summary = Object.fromEntries(Object.entries(res.legs).map(([k, v]) => [k, v.pass ? "GREEN" : "RED"]));
console.log(JSON.stringify({ tag, base, summary }));
for (const [k, v] of Object.entries(res.legs)) if (!v.pass) console.log(k, JSON.stringify(Object.fromEntries(Object.entries(v).filter(([, x]) => x && x.pass === false)).valueOf()).slice(0, 1500));
