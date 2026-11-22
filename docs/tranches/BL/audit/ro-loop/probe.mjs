#!/usr/bin/env node
// Which ResizeObserver callback leaves WebKit's "ResizeObserver loop completed with
// undelivered notifications." on the demo's `/`.
//
//   node probe.mjs [--base https://glass.babb.dev] [--route /] [--cells 1440:light,390:dark]
//                  [--remove "<css selector>"]... [--reps 1] [--wait 6000] [--sizes]
//                  [--browser webkit|chromium] [--label name] [--out file.json]
//
// The init script wraps ResizeObserver before any page script runs. Each observer gets an
// id and its creation stack; each delivery logs the frame (an rAF counter), the targets,
// their DOM depth and border box, and the attribute writes (style, class, data-*) that
// land while the callback runs and in its microtask checkpoint (Vue's flush). With
// --sizes it also reads every observed target's layout size before the callback and after
// its microtasks, and logs which observed boxes the callback changed. A window `error`
// event logs the frame it fired in; the deliveries of the next frame name the
// notifications that were left undelivered.
//
// --remove detaches every element matching the selector as soon as it is inserted (a
// MutationObserver in the init script), so the component never lays out. One browser per
// run, one context per cell, both closed in `finally`.
// PW=<path to another install's playwright/index.mjs> runs another WebKit build (read-only).
import { writeFileSync } from "node:fs";
const { chromium, webkit } = await import(process.env.PW ?? "playwright");

const argv = process.argv.slice(2);
const opt = (name, dflt) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : dflt);
const all = (name) => argv.flatMap((a, i) => (a === name ? [argv[i + 1]] : []));
const base = opt("--base", "https://glass.babb.dev").replace(/\/$/, "");
const route = opt("--route", "/");
const cells = opt("--cells", "1440:light,390:dark").split(",").map((c) => {
    const [w, scheme] = c.split(":");
    return { width: Number(w), scheme };
});
const remove = all("--remove");
// --defer <regex> (repeatable): an observer whose creation stack matches runs its callback
// at the next animation frame instead of inside the delivery (the same entries, read then).
const defer = all("--defer");
// --swap <regex>:<mode> (repeatable): an observer whose creation stack matches has its
// callback replaced. Modes:
//   read   getBoundingClientRect() of each entry's target, nothing written
//   noop   nothing
//   entry  useBarShape's test from the entry: borderBoxSize, plus getComputedStyle
//          (min-block-size, the root font size), no layout read
//   skip0  the real callback, except a delivery whose box is 0x0 returns at once
const swap = all("--swap");
// --hold-css <regex>:<ms>: a stylesheet whose URL matches is answered <ms> late, so it is
// still loading while the cards' stages mount.
const hold = opt("--hold-css") ?? null;
// --skip <category id>: the landing's card loop is rewritten in flight so that card is
// never rendered (no detached subtree, no observer).
const skip = all("--skip");
const reps = Number(opt("--reps", "1"));
const wait = Number(opt("--wait", "6000"));
const sizes = argv.includes("--sizes");
const engine = opt("--browser", "webkit");
const label = opt(
    "--label",
    [
        skip.length && `skip ${skip.join(" + ")}`,
        remove.length && `remove ${remove.join(" + ")}`,
        defer.length && `defer ${defer.join(" + ")}`,
        swap.length && `swap ${swap.join(" + ")}`,
    ]
        .filter(Boolean)
        .join("; ") || "baseline",
) + (hold ? ` (hold ${hold})` : "");
const out = opt("--out");

function init(cfg) {
    const R = (window.__ro = { obs: [], log: [], errs: [], writes: [], changes: [], links: [], removed: 0, frame: 0 });
    const deferRes = cfg.defer.map((d) => new RegExp(d));
    const swaps = cfg.swap.map((s) => {
        const i = s.lastIndexOf(":");
        return [new RegExp(s.slice(0, i)), s.slice(i + 1)];
    });
    window.__skipCards = cfg.skip;
    const pendingSheets = () => [...document.querySelectorAll('link[rel="stylesheet"]')].filter((l) => !l.sheet).length;
    const tick = () => {
        R.frame++;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const desc = (el) => {
        if (!el || !el.tagName) return String(el);
        let s = el.tagName.toLowerCase();
        if (el.id) s += `#${el.id}`;
        const cls = typeof el.className === "string" ? el.className : el.className?.baseVal ?? "";
        if (cls) s += "." + cls.trim().split(/\s+/).slice(0, 4).join(".");
        for (const a of el.attributes ?? []) {
            if (a.name.startsWith("data-") && !a.name.startsWith("data-v-")) s += `[${a.name}${a.value ? `=${a.value.slice(0, 30)}` : ""}]`;
        }
        const card = el.closest?.("[data-story-card]");
        if (card) s += ` @card(${card.getAttribute("data-route-window")})`;
        return s.slice(0, 240);
    };
    const depth = (el) => {
        let d = 0;
        for (let n = el; n; n = n.parentNode ?? n.host) d++;
        return d;
    };
    const size = (el) => {
        if (!el.isConnected) return "detached";
        const cs = getComputedStyle(el);
        return `${el.offsetWidth}x${el.offsetHeight}|${cs.width}x${cs.height}`;
    };

    // Detach any element matching a removal selector as soon as it is inserted.
    if (cfg.remove.length) {
        const sel = cfg.remove.join(",");
        new MutationObserver((recs) => {
            for (const r of recs)
                for (const n of r.addedNodes) {
                    if (n.nodeType !== 1) continue;
                    const hits = n.matches(sel) ? [n] : [...n.querySelectorAll(sel)];
                    for (const h of hits) {
                        h.remove();
                        R.removed++;
                    }
                }
        }).observe(document, { childList: true, subtree: true });
    }

    // Stylesheet links: when each is inserted and when it loads, by frame.
    new MutationObserver((recs) => {
        for (const r of recs)
            for (const n of r.addedNodes) {
                if (n.nodeType !== 1 || n.tagName !== "LINK" || !/stylesheet/.test(n.rel)) continue;
                const row = { href: n.href.replace(location.origin, ""), insFrame: R.frame, insT: +performance.now().toFixed(1), loadFrame: null, loadT: null };
                R.links.push(row);
                n.addEventListener("load", () => {
                    row.loadFrame = R.frame;
                    row.loadT = +performance.now().toFixed(1);
                });
            }
    }).observe(document, { childList: true, subtree: true });

    // Attribute writes, attributed to the delivery that was running when they landed.
    const mo = new MutationObserver(() => {});
    mo.observe(document, { attributes: true, attributeOldValue: true, subtree: true });
    const absorb = (who, frame) => {
        for (const r of mo.takeRecords()) {
            if (who === null) continue;
            const now = r.target.getAttribute?.(r.attributeName) ?? null;
            if (now === r.oldValue) continue;
            R.writes.push({
                who,
                frame,
                el: desc(r.target),
                attr: r.attributeName,
                old: r.oldValue?.slice(0, 220) ?? null,
                now: now?.slice(0, 220) ?? null,
            });
            if (R.writes.length > 3000) R.writes.shift();
        }
    };

    const Orig = window.ResizeObserver;
    let nextId = 0;
    window.ResizeObserver = class extends Orig {
        constructor(cb) {
            const id = ++nextId;
            const meta = {
                id,
                frame: R.frame,
                t: +performance.now().toFixed(1),
                stack: (new Error().stack ?? "").split("\n").slice(1, 8).map((l) => l.trim().slice(0, 200)),
                targets: [],
            };
            const stackText = meta.stack.join("\n");
            meta.deferred = deferRes.some((re) => re.test(stackText));
            meta.swapped = swaps.find(([re]) => re.test(stackText))?.[1] ?? null;
            const els = new Set();
            R.obs.push(meta);
            const modes = {
                read: (self, entries) => {
                    for (const e of entries) e.target.getBoundingClientRect();
                },
                noop: () => {},
                entry: (self, entries) => {
                    for (const e of entries) {
                        const box = e.borderBoxSize?.[0];
                        if (!box) continue;
                        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
                        const rung = parseFloat(getComputedStyle(e.target).minBlockSize);
                        void (box.inlineSize > 20 * rem + 0.5 || (rung > 0 && box.blockSize > rung + 0.5));
                    }
                },
                skip0: (self, entries, obs) => {
                    const box = entries[0]?.borderBoxSize?.[0];
                    if (box && box.inlineSize === 0 && box.blockSize === 0) return;
                    cb.call(self, entries, obs);
                },
            };
            const run = meta.deferred
                ? (self, entries, obs) => requestAnimationFrame(() => cb.call(self, entries, obs))
                : meta.swapped
                  ? modes[meta.swapped]
                  : (self, entries, obs) => cb.call(self, entries, obs);
            super(function (entries, obs) {
                absorb(null, R.frame);
                const frame = R.frame;
                const before = cfg.sizes ? [...els].map((el) => [el, size(el)]) : null;
                R.log.push({
                    id,
                    frame,
                    t: +performance.now().toFixed(1),
                    pending: pendingSheets(),
                    n: entries.length,
                    entries: entries.slice(0, 8).map((e) => ({
                        el: desc(e.target),
                        depth: depth(e.target),
                        bb: [+(e.borderBoxSize?.[0]?.inlineSize ?? NaN).toFixed(2), +(e.borderBoxSize?.[0]?.blockSize ?? NaN).toFixed(2)],
                    })),
                });
                if (R.log.length > 6000) R.log.shift();
                const t0 = performance.now();
                try {
                    return run(this, entries, obs);
                } finally {
                    R.log.at(-1).ms = +(performance.now() - t0).toFixed(2);
                    absorb(id, frame);
                    // Vue's flush was queued during the callback, so it runs before these.
                    Promise.resolve()
                        .then(() => Promise.resolve())
                        .then(() => {
                            absorb(`${id}μ`, frame);
                            if (before) {
                                for (const [el, s] of before) {
                                    const after = size(el);
                                    if (after !== s) R.changes.push({ who: id, frame, el: desc(el), depth: depth(el), before: s, after });
                                }
                            }
                        });
                }
            });
            this.__meta = meta;
            this.__els = els;
        }
        observe(target, options) {
            this.__els.add(target);
            this.__meta.targets.push(`${desc(target)} (depth ${depth(target)})`);
            return super.observe(target, options);
        }
    };

    window.addEventListener(
        "error",
        (e) => {
            if (/ResizeObserver/.test(e.message ?? "")) R.errs.push({ frame: R.frame, t: +performance.now().toFixed(1), msg: e.message });
        },
        true,
    );
}

const results = [];
const browser = await { webkit, chromium }[engine].launch();
try {
    for (let rep = 1; rep <= reps; rep++) {
        for (const { width, scheme } of cells) {
            const cell = `${engine} ${width} ${scheme} rep${rep}`;
            const context = await browser.newContext({ colorScheme: scheme, viewport: { width, height: 900 } });
            try {
                await context.addInitScript(init, { remove, sizes, defer, swap, skip });
                if (hold) {
                    const i = hold.lastIndexOf(":");
                    const re = new RegExp(hold.slice(0, i));
                    const ms = Number(hold.slice(i + 1));
                    await context.route(
                        (u) => /\.css$/.test(u.pathname) && re.test(u.pathname),
                        async (r) => {
                            await new Promise((done) => setTimeout(done, ms));
                            await r.continue().catch(() => {});
                        },
                    );
                }
                if (skip.length) {
                    // The landing's one card loop: renderList(CATEGORIES, …) → renderList(CATEGORIES minus the skipped, …).
                    await context.route(/\/assets\/CatalogLanding-[^/]*\.js$/, async (r) => {
                        const response = await r.fetch().catch(() => null);
                        if (!response) return; // the context closed under the request
                        const body = await response.text();
                        const loop = /([A-Za-z_$][\w$]*)\(([A-Za-z_$][\w$]*)\(([A-Za-z_$][\w$]*)\),([A-Za-z_$][\w$]*)=>/g;
                        const hits = [...body.matchAll(loop)];
                        if (hits.length !== 1) throw new Error(`card loop: ${hits.length} matches in the landing chunk`);
                        const [whole, list, unref, src, param] = hits[0];
                        const patched = body.replace(whole, `${list}(${unref}(${src}).filter((c)=>!window.__skipCards.includes(c.id)),${param}=>`);
                        await r.fulfill({ response, body: patched });
                    });
                }
                const page = await context.newPage();
                const pageerrors = [];
                page.on("pageerror", (e) => pageerrors.push(String(e).slice(0, 200)));
                const nav = await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 60000 }).catch((e) => e);
                if (nav instanceof Error) {
                    console.log(`${cell} [${label}]: NO READING (${nav.message.split("\n")[0]})`);
                    results.push({ cell, label, noReading: nav.message.split("\n")[0] });
                    continue;
                }
                await page.waitForTimeout(wait);
                const R = await page.evaluate(() => {
                    const R = window.__ro;
                    return { obs: R.obs, log: R.log, errs: R.errs, writes: R.writes, changes: R.changes, links: R.links, removed: R.removed, frame: R.frame };
                });
                const cards = await page.locator("[data-story-card]").count();
                const roErrors = pageerrors.filter((e) => /ResizeObserver/.test(e)).length;
                // The deliveries of the error frame and the next frame.
                const around = R.errs.map((e) => ({
                    err: e,
                    errFrame: R.log.filter((l) => l.frame === e.frame),
                    nextFrame: R.log.filter((l) => l.frame === e.frame + 1),
                    writes: R.writes.filter((w) => w.frame === e.frame || w.frame === e.frame + 1),
                    changes: R.changes.filter((c) => c.frame === e.frame),
                }));
                const deferred = R.obs.filter((o) => o.deferred || o.swapped).length;
                results.push({ cell, label, cards, removed: R.removed, deferred, roErrors, pageerrors, observers: R.obs.length, around, links: R.links, obs: R.obs, changes: R.changes, writesTotal: R.writes.length, log: R.log, writes: R.writes });
                console.log(`${cell} [${label}]: cards ${cards}, removed ${R.removed}, deferred ${deferred}, observers ${R.obs.length}, RO loop errors ${roErrors} (window ${R.errs.length})${R.errs.length ? ` at frame(s) ${R.errs.map((e) => `${e.frame} t=${e.t}`).join(", ")}` : ""}`);
            } finally {
                await context.unrouteAll({ behavior: "ignoreErrors" });
                await context.close();
            }
        }
    }
} finally {
    await browser.close();
}
if (out) writeFileSync(out, JSON.stringify(results, null, 1));
